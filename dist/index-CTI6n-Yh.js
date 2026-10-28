"use client";
var Nw = Object.defineProperty;
var Ow = (t, e, n) => e in t ? Nw(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Je = (t, e, n) => Ow(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as _, jsxs as ge, Fragment as Ln } from "react/jsx-runtime";
import * as w from "react";
import Mt, { createContext as ti, useContext as ni, useState as Ye, useEffect as Ge, useRef as Q, useCallback as ze, useLayoutEffect as $n, useMemo as dn, useId as zw, useImperativeHandle as qy, forwardRef as np, createElement as rp } from "react";
import * as gn from "@radix-ui/react-dropdown-menu";
import { Minus as Lw, Check as zs, Search as Io, X as eo, Pencil as $w, CopyPlus as Wy, Trash2 as za, RotateCcw as jy, Plus as ol, ChevronRight as La, ChevronLeft as Fw, ArrowUp as Hw, ArrowDown as Bw, ChevronDown as ci, Underline as qw, Strikethrough as Ww, RemoveFormatting as jw, Link as Kw, ChevronUp as Uw, Anchor as Gw, Copy as Yw, ClipboardPaste as Xw, Scissors as Vw } from "lucide-react";
import { computePosition as Jw, offset as Ky, flip as Uy, shift as Gy, size as Zw, useFloating as Qw, autoUpdate as ex } from "@floating-ui/react-dom";
import * as Si from "@radix-ui/react-dialog";
import { createPortal as sl } from "react-dom";
import { mergeAttributes as tx, ReactNodeViewRenderer as nx, NodeViewWrapper as rx, useEditor as ix, EditorContent as ox } from "@tiptap/react";
import { PluginKey as Kr, Plugin as pi, Selection as No, TextSelection as Ar, NodeSelection as $o, AllSelection as sx } from "@tiptap/pm/state";
import { DecorationSet as sa, Decoration as ax } from "@tiptap/pm/view";
import lx from "@tiptap/starter-kit";
import cx from "@tiptap/extension-placeholder";
import { TextStyle as ux, FontFamily as dx, FontSize as fx } from "@tiptap/extension-text-style";
import hx from "@tiptap/extension-color";
import px from "@tiptap/extension-link";
import gx from "@tiptap/extension-underline";
import mx from "@tiptap/suggestion";
import { Mention as yx } from "@tiptap/extension-mention";
import { createRoot as bx } from "react-dom/client";
const vx = ti(null);
function Df() {
  return ni(vx);
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
const Fs = typeof window < "u", zn = Fs && window.matchMedia("(pointer: coarse)").matches, wx = Fs && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let al = 0.5;
const Ts = /* @__PURE__ */ new Set();
function HP(t) {
  al = Math.max(0, Math.min(1, t)), Ts.forEach((e) => e());
}
function Yy() {
  return al;
}
function BP() {
  const [, t] = Ye(0);
  return Ge(() => {
    const e = () => t((n) => n + 1);
    return Ts.add(e), () => {
      Ts.delete(e);
    };
  }, []), zn && al > 0;
}
function yn() {
  const [, t] = Ye(0);
  return Ge(() => {
    const e = () => t((n) => n + 1);
    return Ts.add(e), () => {
      Ts.delete(e);
    };
  }, []), al;
}
function Me(t, e, n) {
  return zn ? Math.round(t + (e - t) * n) : t;
}
function _i(t, e) {
  const n = yn();
  return zn && n > 0 ? {
    padding: `${Me(t.py, e.py, n)}px ${Me(t.px, e.px, n)}px`,
    fontSize: `${Me(t.fs, e.fs, n)}px`
  } : { padding: `${t.py}px ${t.px}px`, fontSize: `${t.fs}px` };
}
function Xy() {
  const t = yn(), e = zn && t > 0;
  return {
    box: e ? Me(28, 36, t) : 20,
    icon: e ? Me(16, 20, t) : 14
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
function xx() {
  const [, t] = Ye(0), e = Q(Ao);
  return Ge(() => {
    const n = () => {
      e.current !== Ao && (e.current = Ao, t((r) => r + 1));
    };
    return ff.add(n), () => {
      ff.delete(n);
    };
  }, []), Ao;
}
const Vy = ["(any-hover: hover)", "(any-pointer: fine)"];
function Jy() {
  return Fs ? Vy.some((t) => window.matchMedia(t).matches) : !1;
}
let $a = Jy();
const hf = /* @__PURE__ */ new Set();
function ip(t) {
  $a !== t && ($a = t, hf.forEach((e) => e()));
}
var By;
if (Fs) {
  const t = () => ip(Jy());
  for (const s of Vy) {
    const a = window.matchMedia(s);
    (By = a.addEventListener) == null || By.call(a, "change", t);
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
function Zy(t, e) {
  const n = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: n < t.left ? 0 : n > t.left + t.width ? 1 : 0.5,
    y: r < t.top ? 0 : r > t.top + t.height ? 1 : 0.5
  };
}
function Qy(t, e) {
  const n = (e == null ? void 0 : e()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = t.getBoundingClientRect();
  return Zy({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function kx(t, e, n, r) {
  const i = ++t.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${zf})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    t.current === i && requestAnimationFrame(() => {
      if (t.current !== i) return;
      const s = Qy(e, n);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Pi}ms ${Nf}, opacity ${Of}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        t.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Pi + 60);
    });
  });
}
function Sx(t, e, n, r) {
  const i = ++t.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Qy(e, n);
  e.style.transition = `transform ${Pi}ms ${Nf}, opacity ${Of}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${zf})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    t.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      t.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Pi + 60);
}
function Cx(t, e, n) {
  const r = t.cloneNode(!0), i = t.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : n ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, a = s ? Zy({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Pi}ms ${Nf}, opacity ${Of}ms ease`, r.style.transform = `scale(${zf})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Pi + 60));
    });
  });
}
function ll(t) {
  const e = Q(null), [n, r] = Ye(!1), i = Q(null), o = Q(0), s = ze((p) => {
    if (t.ref && (t.ref.current = p), p) {
      o.current = 0, e.current = p;
      const y = p.getBoundingClientRect();
      (y.width > 0 || y.height > 0) && (i.current = { left: y.left, top: y.top, width: y.width, height: y.height }), r(!0);
      return;
    }
    const g = e.current, m = ++o.current;
    queueMicrotask(() => {
      m === o.current && e.current === g && (e.current = null, r(!1), !(!g || !t.cloneOnUnmount || !l.current) && g.style.visibility !== "hidden" && jl(f.current) && Cx(g, u.current, i.current));
    });
  }, []), a = ze(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), l = Q(t.visible);
  l.current = t.visible;
  const c = Q(t.visible), u = Q(t.anchor ?? null);
  u.current = t.anchor ?? null;
  const d = Q(t.onClosed);
  d.current = t.onClosed;
  const f = Q(t.morph !== !1);
  f.current = t.morph !== !1;
  const h = Q(0);
  return $n(() => {
    if (!n || !l.current || !jl(f.current)) return;
    const p = e.current;
    p && kx(h, p, u.current);
  }, [n, t.visible]), Ge(() => {
    if (!n || !l.current) return;
    let p = 0;
    const g = () => {
      p = 0, a(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, a]), $n(() => {
    var m;
    const p = c.current;
    if (c.current = t.visible, t.visible || !p) return;
    const g = e.current;
    if (!g || !jl(f.current)) {
      (m = d.current) == null || m.call(d);
      return;
    }
    Sx(h, g, u.current, () => {
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
const eb = 384;
function Rx(t) {
  const e = t.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: t.innerWidth, height: t.innerHeight };
}
function tb({
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
  const u = $s(), d = Q(u);
  d.current = u;
  const f = Q(c);
  f.current = c, $n(() => {
    if (!n) return;
    let h = 0, p = !1;
    const g = () => {
      h || (h = requestAnimationFrame(m));
    }, m = () => {
      if (h = 0, p) return;
      const M = d.current, O = t.current, P = e.current;
      if (!M || !O || !P || !P.isConnected) return;
      const k = (r == null ? void 0 : r.current) ?? P, z = Rx(M), C = a ?? eb, x = Math.min(l, C), I = Math.max(0, P.offsetHeight - k.offsetHeight), R = Math.max(x, Math.ceil(k.scrollHeight + I)), S = Math.min(R, C);
      P.style.maxHeight = `${S}px`;
      let D = S;
      const $ = i == null ? void 0 : i.current;
      Jw($ ? {
        getBoundingClientRect: () => ({
          left: $.left,
          top: $.top,
          width: $.width,
          height: $.height,
          right: $.left + $.width,
          bottom: $.top + $.height,
          x: $.left,
          y: $.top,
          toJSON: () => {
          }
        })
      } : O, P, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Ky(o),
          Uy({ boundary: z, padding: s, fallbackStrategy: "bestFit" }),
          Gy({ boundary: z, padding: s, mainAxis: !1 }),
          Zw({
            boundary: z,
            padding: s,
            apply({ availableHeight: Z }) {
              D = Math.max(x, Math.floor(Math.min(C, Z))), P.style.maxHeight = `${D}px`;
            }
          })
        ]
      }).then(({ x: Z, y: L, placement: N }) => {
        p || !Number.isFinite(Z) || !Number.isFinite(L) || f.current({
          top: Math.round(L),
          left: Math.round(Z),
          maxH: D,
          side: N.startsWith("top") ? "top" : "bottom",
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
function nb(t) {
  return ko == null || ko(), ko = t, () => {
    ko === t && (ko = null);
  };
}
const rb = ti(null);
function Lf(t, e) {
  const n = t.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = t.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = t.context ?? (e == null ? void 0 : e.context) ?? "surface", o = t.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = t.accent !== void 0 && t.surface === void 0 && t.context === void 0;
  return { mode: n, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function $f({ theme: t, children: e }) {
  return /* @__PURE__ */ _(rb.Provider, { value: t, children: e });
}
function KP({ mode: t, accent: e, surface: n, context: r, children: i }) {
  const o = wr();
  return /* @__PURE__ */ _($f, { theme: Lf({ mode: t, accent: e, surface: n, context: r }, o), children: i });
}
function UP({ mode: t, accent: e, surface: n, context: r, children: i, className: o, style: s }) {
  const a = wr(), l = Lf({ mode: t, accent: e, surface: n, context: r }, a);
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
function wr() {
  return ni(rb);
}
function Tx(t, e = "dark") {
  return t ? t.context === "surface" ? t.mode : t.mode === "light" ? "light" : t.accent === "emerald" ? "emerald" : t.accent === "blue" ? "blue" : "dark" : e;
}
function ib(t, e) {
  if (t)
    return (t === "light" || t === "dark") && e ? {
      theme: t,
      attrs: { "data-theme": t, "data-mode": t, "data-accent": e.accent }
    } : { theme: t, attrs: { "data-theme": t } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const n = Tx(e);
    return { theme: n, attrs: { "data-theme": n } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Ex(t, e = "light") {
  return (t == null ? void 0 : t.mode) ?? e;
}
function Mx(t) {
  return !t || t.context !== "chrome" && t.surface !== "accent" ? !1 : t.accent === "emerald" ? "emerald" : t.accent === "blue";
}
function Ix(t) {
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
  const r = n ?? Ix(t);
  if (!r || !r.contains(t)) return;
  const i = t.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(t), a = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, l = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - a < o.top ? r.scrollTop -= o.top - (i.top - a) : i.bottom + l > o.bottom && (r.scrollTop += i.bottom + l - o.bottom);
}
function ob({
  open: t,
  row: e,
  block: n = "nearest",
  scroller: r,
  ready: i
}) {
  const o = Q(!1), s = Q(!1), a = Q(!1), l = Q({ row: e, scroller: r, block: n });
  l.current = { row: e, scroller: r, block: n };
  const c = ze(() => {
    o.current = !0;
  }, []);
  return $n(() => {
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
const Ax = [];
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
function _x(t, e, n, r = {}) {
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
function Px(t, e, n) {
  if (!n) return 0;
  const r = new Set(e), i = new Set(n);
  return t.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function sb(t) {
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
  } = t, [f, h] = Ye(() => Mr(n, r)), p = dn(() => new Set(s ?? []), [s]), g = dn(() => new Set(f), [f]), m = o !== void 0 && f.length >= o, y = !Gi(f, n), b = ze((z) => {
    if (p.has(z)) return;
    const C = g.has(z), x = _x(f, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x), u == null || u(z, !C));
  }, [f, g, p, r, o, s, u, d]), T = ze((z) => {
    const C = z.filter((R) => !p.has(R)), x = sp(f, C), I = op(f, C, x !== "all", r, { max: o, disabledIds: s });
    Gi(I, f) || (h(I), d == null || d(I));
  }, [f, p, r, o, s, d]), A = ze((z, C = i ?? r) => {
    const x = op(f, C, z, r, { max: o, disabledIds: s });
    Gi(x, f) || (h(x), d == null || d(x));
  }, [f, i, r, o, s, d]), v = ze(() => {
    f.length !== 0 && (h([]), d == null || d([]));
  }, [f, d]), M = ze((z) => {
    h(Mr(z ?? n, r));
  }, [n, r]), O = ze(() => !c || Gi(f, n) ? !1 : (c(Mr(f, r)), !0), [c, f, n, r]), P = ze(() => !l || Gi(f, n) ? !1 : (l(Mr(f, r)), !0), [l, f, n, r]), k = ze((z) => sp(f, z), [f]);
  return {
    mode: e,
    indicator: a,
    draft: f,
    count: f.length,
    max: o,
    atMax: m,
    dirty: y,
    hiddenCount: Px(f, r, i),
    isSelected: (z) => g.has(z),
    isDisabled: (z) => p.has(z),
    canToggle: (z) => !p.has(z) && (g.has(z) || !m),
    toggle: b,
    toggleGroup: T,
    setAll: A,
    clear: v,
    reset: M,
    commit: O,
    flush: P,
    cancel: M,
    groupState: k
  };
}
const ab = ti(null), Dx = () => ni(ab), lb = Ax;
function Ff({ checked: t, size: e, tone: n = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ _(
    "span",
    {
      className: `ui-check-indicator ${t || r ? "ui-check-indicator-checked" : ""} ${n === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ ge("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ _("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ _("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : t ? /* @__PURE__ */ ge("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ _("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ _("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ _("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ _("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Nx({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: a, variant: l = "pill", tone: c = "accent", block: u = !1 }) {
  const d = l !== "plain", f = yn(), h = Me(16, 20, f), p = Me(12, 14, f), g = Me(12, 14, f), m = Me(12, 16, f), y = Me(10, 12, f), b = Me(8, 10, f);
  return /* @__PURE__ */ ge(
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
const ap = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Ox = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", zx = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Lx = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function $x(t) {
  if (!Mt.isValidElement(t)) return String(t ?? "");
  const e = t.type, n = typeof e == "string" ? e : e.displayName || e.name || "icon", r = t.props;
  return `${n}|${r.className ?? ""}|${r.size ?? ""}`;
}
function cb({ icon: t, collapse: e = !1, iconWithLabel: n = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: a }) {
  const l = !!e && !!t, c = l && !n, u = !!t && (n || l), d = $x(t), [f, h] = Ye({ sig: d, node: t }), [p, g] = Ye(null);
  d !== f.sig && (h({ sig: d, node: t }), g(f.node)), Ge(() => {
    if (p == null) return;
    const y = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(y);
  }, [p]);
  const m = p == null ? t : /* @__PURE__ */ ge("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ _("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: p }, `out:${f.sig}`),
    /* @__PURE__ */ _("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: t }, `in:${d}`)
  ] });
  return l ? /* @__PURE__ */ ge(Ln, { children: [
    u && (c ? /* @__PURE__ */ _("span", { "data-kit-icon": !0, className: `grid min-w-0 ${ap} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${zx}`}`, children: /* @__PURE__ */ _("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: m }) }) : /* @__PURE__ */ _("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: m })),
    /* @__PURE__ */ _("span", { "data-kit-label": !0, className: `grid min-w-0 ${ap} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Ox}`}`, children: /* @__PURE__ */ _("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ _(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Lx}`} ${c ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: c ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ ge("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ _("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ _("span", { className: "col-start-1 row-start-1", children: a })
        ] }) : a
      }
    ) }) })
  ] }) : /* @__PURE__ */ ge(Ln, { children: [
    u && /* @__PURE__ */ _("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: t }),
    a
  ] });
}
const GP = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function dr({
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
  const b = wr(), T = e ?? (b == null ? void 0 : b.mode) ?? "light", A = n ?? Mx(b), v = _i({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), M = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), O = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), P = "", k = "", z = `${a ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, C = "rounded", x = "rounded-[var(--ui-radius-btn)]", I = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, R = {
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
  }, S = {
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
  }, $ = {
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
  }, B = {
    blue: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, Z = y["data-state"] === "open", L = $[T][t], N = t === "primary" ? M : t.startsWith("tab") ? O : v, J = zn ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, U = Me(6, 8, yn()), K = Me(28, 40, yn()), V = A === "emerald" ? "emerald" : A ? "blue" : null, q = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", G = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let ne;
  if (t === "tab") {
    const ce = I[T];
    ne = `${C} ${r ? V ? R[V].active : ce.active : V ? R[V][T === "light" ? "inactiveLight" : "inactiveDark"] : ce.inactive}`;
  } else if (t === "tab-header") {
    const ce = V ? r ? D[V].active : D[V].inactive : r ? S.active : S.inactive;
    ne = `${C} ${ce} ${Z ? V ? D[V].open : S.open : ""}`;
  } else {
    if (ne = `${x} ${L.base} ${Z ? L.open : ""}`, t === "primary" && V) {
      const ce = B[V];
      ne = `${x} ${Z ? `${ce.base} ${ce.open}` : ce.base}`;
    }
    r && (ne = `${ne} ${i === "neutral" ? q : G[i]}`);
  }
  const te = !!f && !!d && !o, Y = o ? { width: K, height: K, padding: 0, gap: 0 } : s === "minimal" ? { ...J, gap: te ? 0 : U } : { ...N, gap: te ? 0 : U };
  return /* @__PURE__ */ _(
    "button",
    {
      type: g,
      "data-mode": T,
      "data-accent": b == null ? void 0 : b.accent,
      className: `${z} ${o ? "justify-center" : ""} ${te ? "group" : ""} ${ne} ${p}`,
      "aria-pressed": r && !t.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: Y,
      ...y,
      children: o ? m : /* @__PURE__ */ _(
        cb,
        {
          icon: d,
          collapse: f,
          iconWithLabel: h,
          active: r && (t.startsWith("tab") || l),
          gap: U,
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
  const s = yn(), a = i ?? Me(14, 18, s);
  return r === "check" ? /* @__PURE__ */ _(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${n ? "opacity-40" : ""} ${o}`,
      style: { width: a, height: a },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ _(Lw, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : t ? /* @__PURE__ */ _(zs, { size: a, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
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
function ub({
  count: t,
  max: e,
  hiddenCount: n = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: a = ""
}) {
  const l = yn(), c = Me(10, 14, l), u = Me(6, 9, l), d = Me(11, 13, l), f = s === "light" ? "light" : "dark", h = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, p = e !== void 0 ? `${t} of ${e} selected` : `${t} selected`;
  return /* @__PURE__ */ ge(
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
        /* @__PURE__ */ ge(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              p,
              n > 0 && /* @__PURE__ */ ge("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                n,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ _(
          dr,
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
          dr,
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
const Hf = ti("dark"), db = () => ni(Hf), Bf = ti({ "data-theme": "dark" }), Fx = () => ni(Bf);
function qf() {
  const t = yn();
  return {
    padding: `${Me(8, 12, t)}px ${Me(12, 16, t)}px`,
    fontSize: `${Me(12, 14, t)}px`,
    lineHeight: `${Me(18, 22, t)}px`
  };
}
function fb() {
  const t = yn();
  return {
    padding: `${Me(6, 9, t)}px ${Me(12, 16, t)}px ${Me(2, 3, t)}px`,
    fontSize: `${Me(10, 11, t)}px`,
    lineHeight: `${Me(14, 16, t)}px`
  };
}
const Hx = (t) => t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", lp = (t) => t ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Bx = (t) => t ? "text-xs" : "text-[10px]";
function cl(t) {
  const e = zn && Yy() > 0;
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
    headerText: `${lp(e)} font-semibold uppercase tracking-wider ${Bx(e)} ui-label`,
    // Item padding
    itemPad: Hx(e),
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
function hb(t) {
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
} }), Hs = ti(null), jf = () => ni(Hs), pb = ti({ query: "", setQuery: () => {
} }), qx = () => ni(pb), gb = ti(null), Wx = () => ni(gb), jx = () => !0;
function ul(t) {
  const e = Q([]), [n, r] = Ye(-1), [i, o] = Ye(!1), [s, a] = Ye(0), l = ze((f) => (e.current = [...e.current, f], a((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), a((h) => h + 1);
  }), []), c = ze((f, h) => {
    r(f), o(h === "pointer");
  }, []), u = ze(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return dn(() => ({
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
function mb(t) {
  const e = jf(), n = Q(e);
  n.current = e;
  const r = Q(null);
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
  const i = Q(-1);
  i.current = e.highlightedIndex;
  const o = Q(e);
  o.current = e;
  const s = Q(t);
  s.current = t;
  const a = Q(r);
  a.current = r;
  const l = Q({ text: "", time: 0 }), c = Q(!1);
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
        const v = u.key === "ArrowDown" ? 1 : -1, M = (i.current + v + p.length) % p.length;
        o.current.setHighlighted(M, "keyboard");
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
        const v = Date.now(), M = (v - l.current.time > 500 ? "" : l.current.text) + u.key.toLowerCase();
        if (l.current = { text: M, time: v }, !M) return;
        const O = i.current + 1;
        for (let P = 0; P < p.length; P++) {
          const k = (O + P) % p.length;
          if (p[k].label.toLowerCase().startsWith(M)) {
            o.current.setHighlighted(k, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Uf(t, e, n, r, i, o, s) {
  const a = Q(e);
  a.current = e;
  const l = Q(t);
  l.current = t;
  const c = Q(i);
  c.current = i;
  const u = Q(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = Q(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = Q(!1);
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
  const n = Q(t);
  n.current = t;
  const r = Q(!1);
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
  const b = wr(), T = ib(s, b), A = T.theme, [v, M] = Ye([]), [O, P] = Ye(null), k = oo(), z = Ls(), C = Q(null), x = Q(null), I = Q(t);
  I.current = t;
  const [R, S] = Ye(t), [D, $] = Ye(""), B = f && g !== void 0, Z = B ? g : D, L = B ? m ?? (() => {
  }) : $, N = Q(g ?? "");
  Ge(() => {
    t || (N.current = g ?? "");
  }, [t, g]);
  const J = B && Z === N.current ? "" : Z, U = zw(), K = Q(null), V = yn(), q = {
    padding: `${Me(8, 12, V)}px ${Me(12, 16, V)}px`,
    fontSize: `${Me(12, 14, V)}px`
  }, [G, ne] = Ye(0), te = f && !B;
  Ge(() => {
    var Ke;
    if (!te || !t) return;
    const me = (Ke = x.current) == null ? void 0 : Ke.querySelector("[data-menu-items]");
    if (!me) return;
    const xe = () => ne(me.offsetWidth - me.clientWidth);
    xe();
    const qe = new ResizeObserver(xe);
    return qe.observe(me), () => qe.disconnect();
  }, [t, te, Z]);
  const Y = dn(() => {
    if (!f) return;
    const me = J.trim().toLowerCase();
    return me ? (xe) => {
      var qe;
      return p ? p(me, xe.label, xe.group) : xe.label.toLowerCase().includes(me) || (((qe = xe.group) == null ? void 0 : qe.toLowerCase().includes(me)) ?? !1);
    } : jx;
  }, [J, f, p]), ce = ul(Y), fe = f && J.trim() !== "" && ce.items.length === 0, Ee = !!y, Ce = ce.allItems.map((me) => me.itemId).filter((me) => !!me), Be = ce.items.map((me) => me.itemId).filter((me) => !!me), it = sb({
    mode: "draft",
    selectedIds: (y == null ? void 0 : y.selectedIds) ?? lb,
    itemIds: Ce,
    visibleIds: Be,
    max: y == null ? void 0 : y.max,
    disabledIds: y == null ? void 0 : y.disabledIds,
    indicator: y == null ? void 0 : y.indicator,
    onCommit: y == null ? void 0 : y.onCommit
  }), mt = Q(it.reset);
  mt.current = it.reset;
  const ot = typeof (y == null ? void 0 : y.commitLabel) == "function" ? y.commitLabel(it.count) : (y == null ? void 0 : y.commitLabel) ?? `Select ${it.count}`;
  Ge(() => {
    if (t)
      return S(!0), B || $(""), ce.setHighlighted(d ?? -1, "keyboard"), mt.current(), nb(() => {
        n == null || n(!1), e == null || e();
      });
    M([]);
  }, [t, d, n, e]), Ge(() => {
    if (!t || !z) return;
    const me = (xe) => {
      if (xe.pointerType !== "touch") return;
      const qe = xe.target;
      qe && (x.current && x.current.contains(qe) || C.current && C.current.contains(qe) || qe instanceof Element && qe.closest("[data-radix-menu-content]") || (n == null || n(!1), e == null || e()));
    };
    return z.addEventListener("pointerdown", me, { capture: !0 }), () => z.removeEventListener("pointerdown", me, { capture: !0 });
  }, [t, z, n, e]);
  const re = ze(() => {
    const me = C.current;
    if (!me) return null;
    const xe = me.getBoundingClientRect();
    return { left: xe.left, top: xe.top, width: xe.width, height: xe.height };
  }, []), _e = ll({
    visible: t,
    morph: l,
    anchor: re,
    onClosed: () => S(!1)
  }), Ie = Q(() => {
  }), $e = Q(() => {
  }), De = Q(() => {
  }), Oe = ze((me) => {
    if (me.key === "Enter") {
      const xe = ce.highlightedIndex, qe = ce.items[xe >= 0 ? xe : 0];
      return qe == null || qe.activate(), !0;
    }
    return me.key === "Escape" ? (n == null || n(!1), e == null || e(), !0) : !1;
  }, [ce, n, e]);
  Kf(t && v.length === 0, ce, Ie, {
    onFieldKey: Oe,
    onSelectAll: Ee ? () => it.setAll(!0) : void 0
  }), Gf(t, $e), Uf(t, ce, Ie, x, v.length > 0, De, {
    ignoreFields: B,
    selectAll: Ee
  });
  const Xe = Q(null), pt = ze((me) => {
    var xe;
    if (me) {
      me.addEventListener("keydown", Ie.current, { capture: !0 }), me.addEventListener("wheel", $e.current, { passive: !1 });
      const qe = me.ownerDocument;
      Xe.current = qe, qe.addEventListener("keydown", De.current, { capture: !0 }), Rt(!0);
    } else
      (xe = Xe.current) == null || xe.removeEventListener("keydown", De.current, { capture: !0 }), Xe.current = null, Rt(!1);
    x.current = me, _e(me);
  }, [_e]), [Se, Ze] = Ye({ top: 0, left: 0, maxH: eb, side: "bottom", ready: !1 }), [Ct, ft] = Ye(0), [Qe, Rt] = Ye(!1);
  Ge(() => {
    t && C.current && ft(C.current.getBoundingClientRect().width);
  }, [t]), tb({
    anchorRef: C,
    panelRef: x,
    open: t && Qe,
    maxHeight: u,
    onPosition: Ze
  }), Ge(() => {
    var me;
    if (Se.ready && t) {
      if (f) {
        (me = K.current ?? C.current) == null || me.focus();
        return;
      }
      const xe = x.current;
      xe && xe.ownerDocument.activeElement !== xe && !xe.contains(xe.ownerDocument.activeElement) && xe.focus();
    }
  }, [Se.ready, t, f]), Ge(() => {
    if (!t || !f) return;
    if (ce.items.length === 0) {
      ce.highlightedIndex !== -1 && ce.setHighlighted(-1, "keyboard");
      return;
    }
    const me = ce.highlightedIndex;
    (me < 0 || me >= ce.items.length) && ce.setHighlighted(0, "keyboard");
  }, [t, Z, f, ce.items.length]), $n(() => {
    var xe;
    if (!t || ce.highlightedIndex < 0 || ce.pointerDriven) return;
    const me = (xe = x.current) == null ? void 0 : xe.querySelector(`[data-ei="${ce.highlightedIndex}"]`);
    hi(me, "nearest");
  }, [t, ce.highlightedIndex, ce.pointerDriven]);
  const Ve = ze((me) => {
    if (!(!me && !I.current)) {
      if (!me && Pt.current) {
        if (B) return;
        Lt.current = !0;
      }
      n ? n(me) : me || e == null || e();
    }
  }, [n, e]), tt = Q(R);
  tt.current = R;
  const Pt = Q(!1), Lt = Q(!1), Qt = ze(() => {
    if (!I.current && tt.current) {
      if (Lt.current) {
        Lt.current = !1, Pt.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), yt = Mt.isValidElement(r) ? r : null, Ft = Q(!1), Ot = ze(() => {
    const me = C.current;
    me && (Ft.current = !0, me.focus(), setTimeout(() => {
      Ft.current = !1;
    }, 0));
  }, []), hn = yt ? Mt.cloneElement(yt, {
    ref: (me) => {
      C.current = me;
      const xe = yt.props.ref;
      typeof xe == "function" ? xe(me) : xe && (xe.current = me);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...B ? { type: yt.props.type ?? "text" } : {},
    ...B ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": t ? `${U}-content` : void 0,
      "aria-activedescendant": t && ce.highlightedIndex >= 0 ? `${U}-opt-${ce.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (me) => {
      var xe, qe;
      (qe = (xe = yt.props).onPointerDownCapture) == null || qe.call(xe, me), Pt.current = !0, Lt.current = !1, setTimeout(() => {
        Pt.current = !1;
      }, 0);
    },
    onPointerDown: (me) => {
      var xe, qe;
      if ((qe = (xe = yt.props).onPointerDown) == null || qe.call(xe, me), B) {
        me.preventDefault();
        const Ke = I.current;
        Ke || n == null || n(!0);
        const ue = C.current;
        ue == null || ue.focus(), !Ke && ue instanceof HTMLInputElement && ue.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (me) => {
      var xe, qe;
      (qe = (xe = yt.props).onKeyDownCapture) == null || qe.call(xe, me), B && me.key === " " && me.stopPropagation();
    },
    onClick: (me) => {
      var xe, qe;
      (qe = (xe = yt.props).onClick) == null || qe.call(xe, me), Qt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (me) => {
      var xe, qe;
      if (Ft.current) {
        Ft.current = !1;
        return;
      }
      (qe = (xe = yt.props).onFocus) == null || qe.call(xe, me);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (me) => {
      var qe, Ke, ue, ke;
      if ((Ke = (qe = yt.props).onBlur) == null || Ke.call(qe, me), !B || !I.current) return;
      const xe = me.relatedTarget;
      xe && ((ue = x.current) != null && ue.contains(xe) || (ke = C.current) != null && ke.contains(xe)) || setTimeout(() => {
        var oe;
        const se = C.current;
        if (!se || !I.current) return;
        const F = se.ownerDocument.activeElement;
        F && (se.contains(F) || (oe = x.current) != null && oe.contains(F)) || (n == null || n(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (me) => {
      var xe, qe;
      if ((qe = (xe = yt.props).onKeyDown) == null || qe.call(xe, me), !(!B || !I.current)) {
        if (me.key === "ArrowDown" || me.key === "ArrowUp") {
          me.preventDefault();
          const Ke = ce.items;
          if (Ke.length === 0) return;
          const ue = me.key === "ArrowDown" ? 1 : -1, ke = (ce.highlightedIndex + ue + Ke.length) % Ke.length;
          ce.setHighlighted(ke, "keyboard");
        } else if (me.key === "Enter") {
          me.preventDefault();
          const Ke = ce.highlightedIndex, ue = ce.items[Ke >= 0 ? Ke : 0];
          ue == null || ue.activate();
        }
      }
    }
  }) : r, rn = /* @__PURE__ */ ge("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ ge("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      J.trim(),
      "”"
    ] }),
    /* @__PURE__ */ _("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), bt = te || Ee, Sn = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${bt ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ ge(gn.Root, { open: t || R, onOpenChange: Ve, modal: !1, children: [
    /* @__PURE__ */ _(gn.Trigger, { asChild: !0, children: hn }),
    /* @__PURE__ */ _(gn.Portal, { container: k ?? void 0, children: /* @__PURE__ */ _(Hf.Provider, { value: A, children: /* @__PURE__ */ _(Bf.Provider, { value: T.attrs, children: /* @__PURE__ */ _(Wf.Provider, { value: { chain: v, setChain: M, morph: l, keyboardOpened: O, setKeyboardOpened: P }, children: /* @__PURE__ */ _(Hs.Provider, { value: ce, children: /* @__PURE__ */ _(pb.Provider, { value: { query: Z, setQuery: L }, children: /* @__PURE__ */ _(ab.Provider, { value: Ee ? it : null, children: /* @__PURE__ */ _(gb.Provider, { value: U, children: /* @__PURE__ */ ge(
      gn.Content,
      {
        id: `${U}-content`,
        ref: pt,
        tabIndex: B ? void 0 : -1,
        ...T.attrs,
        "data-ui-fixed": !0,
        className: `${Sn} ${o || ""} ${c || ""}`,
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
        onPointerLeave: ce.pointerLeave,
        onFocusCapture: B ? (me) => {
          me.target === me.currentTarget && (me.stopPropagation(), Ot());
        } : void 0,
        onFocusOutside: B ? (me) => {
          var qe;
          const xe = me.target;
          xe && (xe === C.current || (qe = C.current) != null && qe.contains(xe)) && me.preventDefault();
        } : void 0,
        onCloseAutoFocus: B ? (me) => {
          me.preventDefault(), Ot();
        } : void 0,
        children: [
          te && /* @__PURE__ */ _("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: G }, children: /* @__PURE__ */ ge("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: q, children: [
            /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ _(
              "input",
              {
                ref: K,
                value: Z,
                onChange: (me) => L(me.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            Z ? /* @__PURE__ */ _(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (me) => me.stopPropagation(),
                onClick: () => {
                  var me;
                  L(""), (me = K.current) == null || me.focus();
                },
                children: /* @__PURE__ */ _(eo, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ _("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          bt ? /* @__PURE__ */ ge("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            a,
            fe && rn
          ] }) : /* @__PURE__ */ ge(Ln, { children: [
            a,
            fe && rn
          ] }),
          Ee && (y == null ? void 0 : y.footer) !== !1 && /* @__PURE__ */ _(
            ub,
            {
              count: it.count,
              max: y == null ? void 0 : y.max,
              hiddenCount: (y == null ? void 0 : y.hiddenNote) === !1 ? 0 : it.hiddenCount,
              clear: (y == null ? void 0 : y.clear) !== !1,
              theme: A,
              onClear: it.clear,
              hero: {
                label: ot,
                onClick: () => {
                  it.commit(), Ve(!1);
                },
                disabled: it.count === 0
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
  itemRender: M,
  morph: O = !0,
  contentClassName: P
}) {
  const k = cl(), z = qf(), [C, x] = Ye(null), [I, R] = Ye(""), S = Q(I);
  S.current = I;
  const D = Q(null), $ = Q(null), [B, Z] = Ye(null), L = ze((q) => {
    $.current = q, Z(q);
  }, []), N = ob({
    open: t,
    scroller: () => $.current,
    row: () => {
      var q;
      return ((q = $.current) == null ? void 0 : q.querySelector('[data-active="1"]')) ?? null;
    }
  });
  Ge(() => {
    if (!t) return;
    const q = (ne) => {
      var Be, it;
      const te = ne.target;
      if (te && te.closest("input, textarea, [contenteditable]")) {
        C && te === D.current && (ne.key === "Enter" ? (ne.preventDefault(), ne.stopImmediatePropagation(), U()) : ne.key === "Escape" && (ne.preventDefault(), ne.stopImmediatePropagation(), K()));
        return;
      }
      const Y = (Be = $.current) == null ? void 0 : Be.closest(".ui-menu");
      if (!Y || !Y.contains(ne.target)) return;
      const ce = Y.ownerDocument, fe = [...Y.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ee = [...Y.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], Ce = [...fe, ...Ee];
      if (ne.key === "ArrowDown" || ne.key === "ArrowUp") {
        ne.preventDefault(), ne.stopImmediatePropagation();
        const mt = ce.activeElement;
        let ot = mt ? Ce.indexOf(mt) : -1;
        if (ot < 0 && mt) {
          const $e = mt.closest("[data-im-row]"), De = $e == null ? void 0 : $e.querySelector('[role="menuitem"]:first-child');
          De && (ot = fe.indexOf(De));
        }
        const re = ne.key === "ArrowDown" ? 1 : -1, _e = ot < 0 ? re === 1 ? 0 : Ce.length - 1 : (ot + re + Ce.length) % Ce.length, Ie = Ce[_e];
        Ie == null || Ie.focus({ preventScroll: !0 }), hi((Ie == null ? void 0 : Ie.closest("[data-im-row]")) ?? Ie, "nearest", $.current);
        return;
      }
      if (ne.key === "ArrowLeft" || ne.key === "ArrowRight") {
        const mt = ce.activeElement, ot = mt == null ? void 0 : mt.closest("[data-im-row]");
        if (!ot) return;
        ne.preventDefault(), ne.stopImmediatePropagation();
        const re = [...ot.querySelectorAll('[role="menuitem"]')].slice(1);
        if (re.length === 0) return;
        const _e = mt && ot.contains(mt) ? re.indexOf(mt) : -1, Ie = ne.key === "ArrowRight" ? 1 : -1, $e = _e < 0 ? 0 : (_e + Ie + re.length) % re.length;
        (it = re[$e]) == null || it.focus({ preventScroll: !0 });
        return;
      }
    }, G = (B == null ? void 0 : B.ownerDocument) ?? null;
    return G == null || G.addEventListener("keydown", q, { capture: !0 }), () => G == null ? void 0 : G.removeEventListener("keydown", q, { capture: !0 });
  }, [t, C, B]), Ge(() => {
    if (!C) return;
    const q = n.find((Y) => Y.id === C);
    q && !I && R(q.name);
    const G = requestAnimationFrame(() => {
      const Y = D.current;
      Y && (Y.focus(), Y.select());
    });
    let ne = 0;
    const te = window.setInterval(() => {
      const Y = D.current;
      if (ne++, !Y || ne > 12) {
        clearInterval(te);
        return;
      }
      Y.ownerDocument.activeElement !== Y && (Y.focus(), Y.select());
    }, 50);
    return () => {
      cancelAnimationFrame(G), clearInterval(te);
    };
  }, [C]), Ge(() => {
    if (C) {
      const q = n.find((G) => G.id === C);
      q && !I && R(q.name);
    }
  }, [C, n]);
  const J = (q, G) => {
    x(q), R(G);
  }, U = () => {
    C && S.current.trim() && o(C, S.current.trim()), x(null);
  }, K = () => {
    x(null);
  }, V = T || b.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ ge(dl, { open: t, onOpenChange: (q) => {
    q ? (x(null), R("")) : (C && I.trim() && o(C, I.trim()), x(null), R("")), (!q || !p) && e(q);
  }, width: "w-80", theme: g, align: m, trigger: A, morph: O, contentClassName: P, children: [
    /* @__PURE__ */ _("div", { className: `shrink-0 ${k.headerText}`, children: b }),
    /* @__PURE__ */ _("div", { ref: L, "data-im-list": !0, onPointerEnter: N.engage, onPointerDown: N.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((q) => {
      const G = q.id === r, ne = C === q.id;
      return /* @__PURE__ */ _("div", { "data-im-row": q.id, "data-active": G ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${G || ne ? k.rowActiveBg : k.rowHoverBg} ${C && !ne ? "opacity-40 pointer-events-none" : ""}`, children: ne ? /* @__PURE__ */ ge(Ln, { children: [
        /* @__PURE__ */ _("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ _(
          "input",
          {
            ref: D,
            autoFocus: !0,
            value: I,
            onChange: (te) => R(te.target.value),
            onKeyDown: (te) => {
              te.key === "Enter" && (te.preventDefault(), te.stopPropagation(), U()), te.key === "Escape" && (te.preventDefault(), te.stopPropagation(), K());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: z
          }
        ) }),
        /* @__PURE__ */ _(
          gn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${k.editConfirm}`,
            onSelect: (te) => {
              te.preventDefault(), U();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ _(zs, { className: k.btnIcon })
          }
        ),
        /* @__PURE__ */ _(
          gn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${k.editCancel}`,
            onSelect: (te) => {
              te.preventDefault(), K();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ _(eo, { className: k.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ ge(Ln, { children: [
        /* @__PURE__ */ _(
          gn.Item,
          {
            style: z,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${k.rowText} ${G ? "" : k.rowTextHover}`,
            onSelect: h ? () => {
              i(q.id);
            } : (te) => {
              te.preventDefault(), i(q.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ _("span", { className: `truncate ${G ? k.rowActiveText : ""}`, children: M ? M(q) : q.name })
          }
        ),
        /* @__PURE__ */ _(
          gn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${G ? k.btnActive : k.btnBase}`,
            onSelect: (te) => {
              te.preventDefault(), J(q.id, q.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ _($w, { className: k.btnIcon })
          }
        ),
        /* @__PURE__ */ _(
          gn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${G ? k.btnActive : k.btnBase}`,
            onSelect: (te) => {
              te.preventDefault();
              const Y = s(q.id);
              Y && J(Y, `${q.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ _(Wy, { className: k.btnIcon })
          }
        ),
        /* @__PURE__ */ _(
          gn.Item,
          {
            className: `shrink-0 ${k.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= v ? k.btnDisabled : G ? k.btnDangerActive : k.btnDanger}`,
            onSelect: (te) => {
              te.preventDefault(), a(q.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= v,
            children: /* @__PURE__ */ _(za, { className: k.btnIcon })
          }
        )
      ] }) }, q.id);
    }) }),
    /* @__PURE__ */ ge("div", { className: `shrink-0 ${C ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ ge(Ln, { children: [
        /* @__PURE__ */ _(gn.Separator, { className: k.separator }),
        /* @__PURE__ */ ge(
          gn.Item,
          {
            className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
            onSelect: (q) => {
              q.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ _(jy, { className: `${k.btnIcon} ${k.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || c || u || f) && /* @__PURE__ */ _(gn.Separator, { className: k.separator }),
      l && /* @__PURE__ */ ge(
        gn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault();
            const G = l();
            G && J(G, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ _(ol, { className: `${k.btnIcon} ${k.icon}` }),
            "New ",
            V
          ]
        }
      ),
      c && /* @__PURE__ */ ge(
        gn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ ge("svg", { className: `${k.btnIcon} ${k.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ _("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ _("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ _("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ ge(
        gn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ ge("svg", { className: `${k.btnIcon} ${k.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ _("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ _("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ _("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ ge(
        gn.Item,
        {
          className: `w-full text-left ${k.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${k.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ _(za, { className: `${k.btnIcon} ${k.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Kx({
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
  var $;
  db();
  const f = cl(), h = qf(), p = fb(), g = Q(!1), m = Q(null), y = Dx(), b = !!y && d !== void 0, T = y && d !== void 0 ? y.isSelected(d) : a, A = n || (y && d !== void 0 ? !y.canToggle(d) : !1), { myIndex: v, highlighted: M, setPointer: O, api: P } = mb({
    label: () => hb(o),
    activate: () => {
      A || (y && d !== void 0 ? y.toggle(d) : t());
    },
    disabled: A,
    group: u,
    itemId: d
  }), { query: k } = qx(), z = k.trim() !== "" && v < 0, C = Wx(), x = u == null ? void 0 : u.trim(), I = !!x && v >= 0 && (v === 0 || (($ = P == null ? void 0 : P.items[v - 1]) == null ? void 0 : $.group) !== x), R = x && y ? ((P == null ? void 0 : P.items) ?? []).filter((B) => B.group === x && B.itemId).map((B) => B.itemId).filter((B) => !y.isDisabled(B)) : [], S = y && R.length > 0 ? y.groupState(R) : "none", D = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ ge(Ln, { children: [
    I && /* @__PURE__ */ _(
      "div",
      {
        "data-menu-group": x,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${y && R.length > 0 ? "" : "pointer-events-none"}`,
        style: p,
        children: y && R.length > 0 ? /* @__PURE__ */ ge("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${x}`,
              onMouseDown: (B) => B.preventDefault(),
              onClick: () => y.toggleGroup(R),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ _(
                Fa,
                {
                  checked: S === "all",
                  indeterminate: S === "some",
                  indicator: y.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: x })
        ] }) : x
      }
    ),
    /* @__PURE__ */ ge(
      gn.Item,
      {
        ref: m,
        id: C && v >= 0 ? `${C}-opt-${v}` : void 0,
        "data-ei": v >= 0 ? v : void 0,
        ...b ? { role: "menuitemcheckbox", "aria-checked": T } : {},
        style: { ...h, display: z ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${D} ${b ? "" : a ? "ui-item-selected" : ""} ${M ? "ui-item-highlighted" : ""} ${A ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (B) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (b) {
            B.preventDefault(), y && d !== void 0 && y.toggle(d);
            return;
          }
          s && B.preventDefault(), t();
        },
        onPointerEnter: () => {
          O(v);
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
              onPointerDown: (B) => {
                B.stopPropagation(), B.preventDefault(), g.current = !0, l.onClick();
              },
              onClick: (B) => {
                B.stopPropagation(), B.preventDefault();
              },
              children: l.icon
            }
          )
        ]
      }
    )
  ] });
}
function Ux({ id: t, label: e, icon: n, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: a, setChain: l, morph: c, keyboardOpened: u, setKeyboardOpened: d } = ni(Wf), f = a.includes(t), h = a[a.length - 1] === t;
  db();
  const p = Fx(), g = oo(), m = Q(null), y = Q(null), [b, T] = Ye(f), A = !f && b;
  Ge(() => {
    f && T(!0);
  }, [f]);
  const v = () => l((K) => {
    const V = K.indexOf(t);
    return V >= 0 ? K.slice(0, V) : K;
  }), M = ul(), O = jf(), P = Q(O);
  P.current = O;
  const k = Q(null);
  Ge(() => {
    var V;
    const K = {
      label: e,
      activate: () => {
        d(t), l((q) => q.includes(t) ? q : [...q, t]);
      },
      submenu: !0
    };
    return k.current = K, (V = P.current) == null ? void 0 : V.register(K);
  }, []);
  const z = O && k.current ? O.items.indexOf(k.current) : -1, C = z >= 0 && z === O.highlightedIndex, x = ze(() => {
    const K = m.current;
    if (!K) return null;
    const V = K.getBoundingClientRect();
    return { left: V.left, top: V.top, width: V.width, height: V.height };
  }, []), I = ll({
    visible: f,
    morph: c,
    anchor: x,
    onClosed: () => T(!1)
  }), R = Q(() => {
  }), S = Q(() => {
  }), D = Q(() => {
  });
  Kf(f && h, M, R, {
    onCloseSub: () => {
      v(), O && z >= 0 && O.setHighlighted(z, "keyboard");
    }
  });
  const $ = Q(u);
  $.current = u, Ge(() => {
    f && ($.current === t ? (M.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var K;
      return (K = y.current) == null ? void 0 : K.focus();
    }), d(null)) : M.setHighlighted(-1, "keyboard"));
  }, [f]), Gf(f, S), Uf(f, M, R, y, !h, D), Mt.useLayoutEffect(() => {
    var V;
    if (!f || M.highlightedIndex < 0 || M.pointerDriven) return;
    const K = (V = y.current) == null ? void 0 : V.querySelector(`[data-ei="${M.highlightedIndex}"]`);
    hi(K, "nearest", y.current);
  }, [f, M.highlightedIndex, M.pointerDriven]);
  const B = Q(null), Z = ze((K) => {
    var V;
    if (K) {
      K.addEventListener("keydown", R.current, { capture: !0 }), K.addEventListener("wheel", S.current, { passive: !1 });
      const q = K.ownerDocument;
      B.current = q, q.addEventListener("keydown", D.current, { capture: !0 });
    } else
      (V = B.current) == null || V.removeEventListener("keydown", D.current, { capture: !0 }), B.current = null;
    y.current = K, I(K);
  }, [I]), L = yn(), N = { padding: `${Me(8, 12, L)}px ${Me(12, 16, L)}px`, fontSize: Me(12, 14, L) }, J = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${C ? " ui-item-highlighted" : ""}${A ? " ui-sub-closing" : ""}`, U = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ ge(gn.Sub, { open: f || b, onOpenChange: (K) => l((V) => {
    if (!K) {
      const q = V.indexOf(t);
      return q >= 0 ? V.slice(0, q) : V;
    }
    return V.includes(t) ? V : [...V, t];
  }), children: [
    /* @__PURE__ */ ge(
      gn.SubTrigger,
      {
        ref: m,
        "data-ei": z >= 0 ? z : void 0,
        style: N,
        className: J,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          O && z >= 0 && O.setHighlighted(z, "pointer");
        },
        onPointerDown: (K) => {
          K.pointerType === "pen" && (K.preventDefault(), l((V) => f ? V.slice(0, V.indexOf(t)) : [...V, t]));
        },
        children: [
          i === "left" && /* @__PURE__ */ _(La, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ ge("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ _("span", { className: "ui-icon shrink-0", children: n }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ _(La, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ _(gn.Portal, { container: g ?? void 0, children: /* @__PURE__ */ _(
      gn.SubContent,
      {
        ref: Z,
        ...p,
        className: U,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: M.pointerLeave,
        children: /* @__PURE__ */ _(Hs.Provider, { value: M, children: o })
      }
    ) })
  ] });
}
const Qo = 8, Gx = ({ open: t, x: e, y: n, onClose: r, children: i, containerRef: o, theme: s, morph: a = !0 }) => {
  const l = wr(), c = s ? { theme: s, attrs: { "data-theme": s } } : l ? ib(void 0, l) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, d = yn(), f = Me(12, 14, d), h = Q(null), p = $s(), [g, m] = Ye(!1), [y, b] = Ye([]), [T, A] = Ye(null), v = ul();
  Ge(() => {
    if (t)
      return v.setHighlighted(-1, "keyboard"), nb(r);
  }, [t, r]);
  const M = Q({ left: e, top: n });
  t && (M.current = { left: e, top: n });
  const O = ze(() => ({ left: M.current.left, top: M.current.top, width: 0, height: 0 }), []), P = ll({
    visible: !0,
    morph: a,
    anchor: O,
    cloneOnUnmount: !0
  }), k = Q(() => {
  }), z = Q(() => {
  }), C = Q(() => {
  });
  Kf(t, v, k), $n(() => {
    if (!t || v.highlightedIndex < 0 || v.pointerDriven) return;
    const D = h.current;
    hi(
      D == null ? void 0 : D.querySelector(`[data-ei="${v.highlightedIndex}"]`),
      "nearest",
      D
    );
  }, [t, v.highlightedIndex, v.pointerDriven]), Gf(t, z), Uf(t, v, k, h, y.length > 0, C);
  const x = Q(null), I = ze((D) => {
    var $;
    if (D) {
      D.addEventListener("keydown", k.current, { capture: !0 }), D.addEventListener("wheel", z.current, { passive: !1 });
      const B = D.ownerDocument;
      x.current = B, B.addEventListener("keydown", C.current, { capture: !0 });
    } else
      ($ = x.current) == null || $.removeEventListener("keydown", C.current, { capture: !0 }), x.current = null;
    h.current = D, m(!!D), P(D);
  }, [P]), [R, S] = Ye(null);
  return $n(() => {
    var q;
    if (!t || !g || !h.current) return;
    const D = h.current, $ = D.offsetWidth, B = D.offsetHeight, Z = (q = o == null ? void 0 : o.current) == null ? void 0 : q.getBoundingClientRect(), L = Z ? Z.right : (p == null ? void 0 : p.innerWidth) ?? 0, N = Z ? Z.bottom : (p == null ? void 0 : p.innerHeight) ?? 0, J = Z ? Z.left : 0, U = Z ? Z.top : 0;
    let K = Math.max(U + Qo, M.current.top), V = Math.max(J + Qo, M.current.left);
    V + $ > L && (V = L - $ - Qo), K + B > N && (K = Math.max(U + Qo, N - B - Qo)), S({ left: V, top: K });
  }, [t, g, e, n, o]), t ? /* @__PURE__ */ ge(gn.Root, { open: t, onOpenChange: (D) => {
    D || r();
  }, modal: !1, children: [
    /* @__PURE__ */ _(gn.Trigger, { asChild: !0, children: /* @__PURE__ */ _("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ _(gn.Portal, { children: /* @__PURE__ */ _(Hf.Provider, { value: u, children: /* @__PURE__ */ _(Bf.Provider, { value: c.attrs, children: /* @__PURE__ */ _(Wf.Provider, { value: { chain: y, setChain: b, morph: a, keyboardOpened: T, setKeyboardOpened: A }, children: /* @__PURE__ */ _(Hs.Provider, { value: v, children: /* @__PURE__ */ _(
      gn.Content,
      {
        ref: I,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (R == null ? void 0 : R.left) ?? M.current.left, top: (R == null ? void 0 : R.top) ?? M.current.top, touchAction: "manipulation" },
        onPointerLeave: v.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, aa = ({ onClick: t, variant: e = "default", icon: n, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const a = yn(), l = { padding: `${Me(8, 12, a)}px ${Me(12, 16, a)}px`, fontSize: Me(12, 14, a) }, c = jf(), u = Q(c);
  u.current = c;
  const d = Q(null);
  Ge(() => {
    var g;
    const p = { label: hb(s), activate: () => {
      r || t();
    } };
    return d.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const f = c && d.current ? c.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === c.highlightedIndex;
  return /* @__PURE__ */ ge(
    gn.Item,
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
}, Yx = () => /* @__PURE__ */ _(gn.Separator, { className: "ui-sep my-1" }), XP = (t) => /* @__PURE__ */ _(Ux, { ...t, width: t.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), sn = 8, yb = "[data-modal-stack]", ui = 220, Es = "cubic-bezier(0.32, 0.72, 0, 1)", _a = 0.94;
function So() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ci(t) {
  if (!t) return { top: 0, height: 0, bottom: 0 };
  const e = t.visualViewport, n = e ? e.offsetTop : 0, r = e ? e.height : t.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function bb(t, e) {
  return `translate(${e.left - t.left}px, ${e.top - t.top}px) scale(${e.width / t.width}, ${e.height / t.height})`;
}
function cp(t, e, n, r) {
  const i = ++t.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = bb(o, n), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === i && (e.style.transition = `transform ${ui}ms ${Es}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        t.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, ui + 80));
    });
  });
}
function Xx(t, e, n) {
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
  e.style.transition = `transform ${ui}ms ${Es}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = bb(i, s), e.style.opacity = "0", window.setTimeout(() => {
    t.current === r && (e.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      t.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, ui + 60);
}
function Kl(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(yb) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function la(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(yb) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Vx({
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
  const g = wr(), m = Lf(
    { mode: f, accent: p, surface: h, context: "surface" },
    g
  ), y = m.mode, b = m.surface, T = m.accent, A = Q(null), v = Q(null), M = Q(null), O = yn(), P = Me(20, 24, O), k = Me(10, 12, O), z = Me(12, 14, O), C = Me(14, 16, O), x = Me(20, 24, O), I = Me(20, 24, O), R = Me(20, 24, O), S = Me(14, 16, O), D = Me(16, 20, O), $ = Me(10, 12, O), B = Me(12, 14, O), Z = Me(8, 10, O), L = Me(4, 6, O), N = { padding: `${k}px ${P}px` }, J = { fontSize: z }, U = { padding: `${I}px ${x}px 16px ${x}px` }, K = { fontSize: C }, V = { padding: `0 ${x}px 16px` }, q = { padding: `${R}px ${x}px` }, G = { fontSize: $, padding: `${L}px ${Z}px` }, [ne, te] = Ye(!1), Y = ze((F) => {
    A.current = F, te(F !== null);
  }, []), ce = oo(), fe = $s(), Ee = Q(fe);
  Ee.current = fe;
  const [Ce, Be] = Ye(null), it = Q(null), mt = Q(!1), ot = Q(!1), re = Q(0), _e = Q({ w: 0, h: 0 }), Ie = Q(!1), [$e, De] = Ye(!1), [Oe, Xe] = Ye(!1), pt = Q(0), Se = Q(!1), [Ze, Ct] = Ye(!1), ft = Q(l);
  ft.current = l;
  const Qe = Q(!1), Rt = Q(!1), Ve = () => {
    Rt.current = !0, De(!0);
  }, tt = () => {
    Rt.current = !1, De(!1);
  };
  Ge(() => {
    t || (Be(null), Ie.current = !1, mt.current = !1, Xe(!1));
  }, [t]), $n(() => {
    if (!t || Ie.current || !ne || !A.current) return;
    Ie.current = !0;
    const F = A.current.getBoundingClientRect(), oe = Ee.current ?? null, he = (oe == null ? void 0 : oe.innerWidth) ?? 0, Pe = Ci(oe);
    Be({
      left: Math.max(sn, Math.min((he - F.width) / 2, he - F.width - sn)),
      top: Math.max(Pe.top + sn, Math.min(Pe.top + (Pe.height - F.height) / 2, Pe.bottom - F.height - sn))
    });
  }, [t, ne]), $n(() => {
    if (!t || !ne || !l || So() || !A.current) return;
    const F = A.current, oe = Kl(F), he = oe[oe.length - 1];
    Ve(), he ? cp(pt, F, he.getBoundingClientRect(), tt) : Xx(pt, F, tt);
  }, [t, ne]);
  const Pt = ze(() => {
    if (!u || Se.current) return;
    const F = A.current, oe = !!F && Kl(F).length > 0;
    if (!F || !l || So() || oe) {
      e();
      return;
    }
    Se.current = !0, Ct(!0), Qe.current = !0, Ve(), up(pt, F, () => {
      Se.current = !1, Ct(!1), tt(), e();
    });
  }, [l, e, u]), Lt = ze(() => {
    const F = A.current;
    if (!F || Qe.current || !ft.current || So() || Kl(F).length > 0) return;
    const oe = F.ownerDocument, he = F.cloneNode(!0);
    he.removeAttribute("data-modal-stack"), he.removeAttribute("data-state"), he.removeAttribute("role"), he.removeAttribute("data-aria-hidden"), he.removeAttribute("tabindex"), he.setAttribute("aria-hidden", "true"), he.style.pointerEvents = "none", oe.body.appendChild(he), up({ current: 0 }, he, () => {
      he.isConnected && he.remove();
    });
  }, []);
  $n(() => () => Lt(), [Lt]);
  const Qt = Q(t);
  $n(() => {
    const F = Qt.current;
    Qt.current = t, F && !t && Lt();
  }, [t, ne, Lt]), Ge(() => {
    if (!t || !ne || !l || !A.current) return;
    const F = A.current, oe = F.parentNode;
    if (!oe) return;
    let he = 0, Pe = null, nt = !1;
    const It = () => {
      he = 0;
      const gt = la(F);
      if (gt.length > 0)
        F.style.opacity = "", F.style.pointerEvents = "", Pe = gt[gt.length - 1].getBoundingClientRect(), nt = !0, he = requestAnimationFrame(It);
      else if (nt) {
        nt = !1, Pe && !So() && (Ve(), cp(pt, F, Pe, tt)), Pe = null;
        const kt = Ee.current ?? null;
        kt == null || kt.setTimeout(() => {
          !F || !F.isConnected || getComputedStyle(F).opacity !== "1" && (F.style.opacity = "1", F.style.pointerEvents = "");
        }, 240);
      }
    }, lt = new MutationObserver(() => {
      !he && la(F).length > 0 && (he = requestAnimationFrame(It));
    });
    return lt.observe(oe, { childList: !0 }), () => {
      lt.disconnect(), he && cancelAnimationFrame(he);
    };
  }, [t, ne]), Ge(() => {
    if (!ne || !l || So() || !A.current) return;
    const F = A.current;
    let oe = Math.round(F.getBoundingClientRect().height), he = !1;
    const Pe = new ResizeObserver(() => {
      if (!F.isConnected) return;
      const nt = Math.round(F.getBoundingClientRect().height);
      if (!he) {
        he = !0, oe = nt;
        return;
      }
      if (Math.abs(nt - oe) < 1) return;
      if (it.current || Se.current || la(F).length > 0) {
        oe = nt;
        return;
      }
      if (Rt.current) return;
      const It = oe;
      oe = nt, Ve();
      const lt = F.getBoundingClientRect(), gt = Ci(Ee.current ?? null), kt = !mt.current && !ot.current, vt = kt ? gt.top + (gt.height - It) / 2 : lt.top, Ut = kt ? gt.top + (gt.height - nt) / 2 : lt.top;
      F.style.transition = "none", F.style.height = `${It}px`, kt && (F.style.top = `${vt}px`), v.current && (v.current.style.overflow = "hidden"), F.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          F.style.height === `${It}px` && (F.style.transition = `height ${ui}ms ${Es}${kt ? `, top ${ui}ms ${Es}` : ""}`, F.style.height = `${nt}px`, kt && (F.style.top = `${Ut}px`), window.setTimeout(() => {
            F.style.height === `${nt}px` && (F.style.transition = "", F.style.height = "", v.current && (v.current.style.overflow = ""), kt && Be({ left: lt.left, top: Ut }), tt());
          }, ui + 60));
        });
      });
    });
    return Pe.observe(F), () => Pe.disconnect();
  }, [ne]), Ge(() => {
    if (!ne || !A.current || l && !So()) return;
    const F = A.current, oe = new ResizeObserver(() => {
      if (!F.isConnected || it.current || Se.current || ot.current || la(F).length > 0) return;
      const he = Ee.current ?? null, Pe = Ci(he), nt = (he == null ? void 0 : he.innerWidth) ?? 0, It = F.getBoundingClientRect(), lt = Math.max(Pe.top + sn, Math.min(It.top, Pe.bottom - It.height - sn)), gt = Math.max(sn, Math.min(It.left, nt - It.width - sn));
      (Math.abs(lt - It.top) > 0.5 || Math.abs(gt - It.left) > 0.5) && Be({ left: gt, top: lt });
    });
    return oe.observe(F), () => oe.disconnect();
  }, [ne, l]);
  const yt = ze(() => {
    const F = A.current;
    if (!F) return null;
    const oe = F.getBoundingClientRect();
    return { left: oe.left, top: oe.top, width: oe.width, height: oe.height };
  }, []), Ft = ze((F, oe) => {
    const he = Ee.current ?? null, Pe = (he == null ? void 0 : he.innerWidth) ?? 0, nt = Ci(he), It = yt(), lt = It ? It.width : Math.min(Pe - sn * 2, 576), gt = It ? It.height : Math.min(nt.height - sn * 2, 400);
    return {
      left: Math.max(sn, Math.min(F, Pe - lt - sn)),
      top: Math.max(nt.top + sn, Math.min(oe, nt.bottom - gt - sn))
    };
  }, [yt]);
  Ge(() => {
    if (!t) return;
    const F = Ee.current ?? null, oe = (F == null ? void 0 : F.visualViewport) ?? null;
    if (!F || !oe) return;
    const he = 120;
    ot.current = !1, _e.current = { w: F.innerWidth, h: F.innerHeight };
    let Pe = 0;
    const nt = () => {
      if (Se.current || it.current) return;
      const lt = (F == null ? void 0 : F.innerHeight) ?? 0, gt = (F == null ? void 0 : F.innerWidth) ?? 0, vt = Ci(F).height < lt - he, Ut = lt < _e.current.h - he && gt === _e.current.w;
      vt || Ut ? (ot.current = !0, re.current && (clearTimeout(re.current), re.current = 0)) : re.current || (re.current = (F == null ? void 0 : F.setTimeout(() => {
        ot.current = !1, re.current = 0, Xe(!1);
      }, 600)) ?? 0), Xe(ot.current), !Pe && (Pe = requestAnimationFrame(() => {
        var bn;
        Pe = 0;
        const An = A.current;
        if (!An) return;
        const zt = Ci(Ee.current ?? null), cn = An.getBoundingClientRect(), _n = ((bn = Ee.current) == null ? void 0 : bn.innerWidth) ?? 0, Pn = (F == null ? void 0 : F.innerHeight) ?? 0, Ht = zt.height < Pn - he || Pn < _e.current.h - he && (F == null ? void 0 : F.innerWidth) === _e.current.w;
        _e.current = { w: (F == null ? void 0 : F.innerWidth) ?? 0, h: Pn };
        const mn = cn.top >= zt.top + sn && cn.bottom <= zt.bottom - sn, Yn = () => {
          Be({
            left: Math.max(sn, Math.min((_n - cn.width) / 2, _n - cn.width - sn)),
            top: Math.max(zt.top + sn, Math.min(zt.top + (zt.height - cn.height) / 2, zt.bottom - cn.height - sn))
          });
        };
        if (Ht && !zn) {
          if (mt.current) {
            mn || Be(Ft(cn.left, cn.top));
            return;
          }
          if (mn) return;
          Yn();
          return;
        }
        if (!ot.current) {
          if (mt.current) {
            mn || Be(Ft(cn.left, cn.top));
            return;
          }
          mn || Yn();
        }
      }));
    };
    oe.addEventListener("resize", nt), oe.addEventListener("scroll", nt);
    const It = () => {
      Se.current || it.current || Pe || (Pe = requestAnimationFrame(() => {
        Pe = 0;
        const lt = A.current;
        if (!lt) return;
        const gt = Ee.current ?? null, kt = Ci(gt), vt = (gt == null ? void 0 : gt.innerWidth) ?? 0, Ut = lt.getBoundingClientRect();
        if (mt.current) {
          Be(Ft(Ut.left, Ut.top));
          return;
        }
        Be({
          left: Math.max(sn, Math.min((vt - Ut.width) / 2, vt - Ut.width - sn)),
          top: Math.max(kt.top + sn, Math.min(kt.top + (kt.height - Ut.height) / 2, kt.bottom - Ut.height - sn))
        });
      }));
    };
    return F.addEventListener("orientationchange", It), () => {
      oe.removeEventListener("resize", nt), oe.removeEventListener("scroll", nt), F.removeEventListener("orientationchange", It), Pe && cancelAnimationFrame(Pe), re.current && clearTimeout(re.current);
    };
  }, [t, Ft]);
  const Ot = ze((F) => {
    if (F.target.closest("button")) return;
    mt.current = !0;
    const oe = yt();
    oe && (Be(Ft(oe.left, oe.top)), it.current = { startX: F.clientX, startY: F.clientY, posX: oe.left, posY: oe.top }, F.target.setPointerCapture(F.pointerId));
  }, [yt, Ft]), hn = ze((F) => {
    const oe = it.current;
    oe && (F.preventDefault(), Be(Ft(oe.posX + F.clientX - oe.startX, oe.posY + F.clientY - oe.startY)));
  }, [Ft]), rn = ze(() => {
    it.current = null;
  }, []), bt = it.current !== null, Sn = ze(() => {
    mt.current = !1;
    const F = Ee.current ?? null, oe = Ci(F), he = (F == null ? void 0 : F.innerWidth) ?? 0, Pe = A.current, nt = Pe ? Pe.getBoundingClientRect() : { width: 0, height: 0 };
    Be({
      left: Math.max(sn, Math.min((he - nt.width) / 2, he - nt.width - sn)),
      top: Math.max(oe.top + sn, Math.min(oe.top + (oe.height - nt.height) / 2, oe.bottom - nt.height - sn))
    });
  }, []), me = Q(0), xe = ze(() => {
    const F = Date.now();
    F - me.current < 300 ? (me.current = 0, Sn()) : me.current = F;
  }, [Sn]), qe = Ce !== null, Ke = qe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ue = `${i ? `${i} w-full` : "max-w-xl w-full"}`, ke = {
    ...qe ? { left: Ce.left, top: Ce.top } : {},
    width: `min(100%, calc(100dvw - ${sn * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Oe ? {} : { maxHeight: `calc(100dvh - ${sn * 2}px)` }
  }, se = ze((F) => {
    if (F.key !== "Enter" || F.shiftKey || F.metaKey || F.ctrlKey || F.altKey) return;
    const oe = F.target, he = M.current;
    if (!(!!oe.closest("[data-modal-close]") || !!he && he.contains(oe) && !!oe.closest('button, a, [role="button"]')) && oe.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !he) return;
    const nt = Array.from(he.querySelectorAll("button[data-modal-confirm]")), It = nt.length > 0 ? nt : Array.from(he.querySelectorAll("button")), lt = It[It.length - 1];
    !lt || lt.disabled || (F.preventDefault(), lt.click());
  }, []);
  return /* @__PURE__ */ _($f, { theme: m, children: /* @__PURE__ */ _(Si.Root, { open: t, onOpenChange: (F) => {
    F || Pt();
  }, children: /* @__PURE__ */ ge(Si.Portal, { container: ce ?? void 0, children: [
    /* @__PURE__ */ _(
      Si.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Ze ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (F) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (F.preventDefault(), d && Pt());
        }
      }
    ),
    /* @__PURE__ */ ge(
      Si.Content,
      {
        ref: Y,
        onKeyDown: se,
        onInteractOutside: (F) => {
          d || F.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": y,
        "data-accent": T,
        "data-surface": b,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ke} ${ue}`,
        style: { touchAction: "manipulation", colorScheme: y, ...Object.keys(ke).length > 0 ? ke : {} },
        children: [
          c ? /* @__PURE__ */ ge(
            "div",
            {
              style: U,
              className: `flex items-center justify-between ${bt ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (F) => {
                $e || Ot(F);
              },
              onPointerMove: hn,
              onPointerUp: rn,
              onClick: xe,
              children: [
                /* @__PURE__ */ _(Si.Title, { style: K, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n }),
                u && /* @__PURE__ */ _(Si.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ _(eo, { style: { width: D, height: D } }) })
              ]
            }
          ) : /* @__PURE__ */ ge(
            "div",
            {
              style: N,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${bt ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (F) => {
                $e || Ot(F);
              },
              onPointerMove: hn,
              onPointerUp: rn,
              onClick: xe,
              children: [
                /* @__PURE__ */ ge("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ _("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ _(Si.Title, { style: J, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: n })
                ] }),
                /* @__PURE__ */ ge("div", { className: "flex items-center gap-2", children: [
                  a && /* @__PURE__ */ ge("button", { onClick: a, style: G, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ _(jy, { style: { width: B, height: B } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ _(Si.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ _(eo, { style: { width: S, height: S } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ _("div", { ref: v, "data-testid": "modal-body", style: c ? V : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ _("div", { ref: M, style: c ? q : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ _("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function VP({ children: t }) {
  const e = yn(), n = Me(20, 24, e), r = Me(8, 12, e);
  return /* @__PURE__ */ _("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${n}px` }, children: t });
}
const Jx = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Zx = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Qx = {
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
      className: `${Jx} ${t === "hero" ? Zx[e] : Qx[t]} ${n}`,
      ...i
    }
  );
}
function Ha(t = "md") {
  const e = zn && Yy() > 0;
  return t === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function vb(t = "md") {
  return t === "sm" ? _i({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : _i({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const wb = ti(null);
function JP() {
  const t = ni(wb);
  if (!t) throw new Error("useDialog must be used within DialogProvider");
  return t;
}
function ZP({ children: t, theme: e, accent: n, surface: r }) {
  const [i, o] = Ye(null), [s, a] = Ye(!1), l = Q(null), c = yn(), u = Me(16, 20, c), d = Me(12, 14, c), f = vb(), h = Q(i);
  h.current = i;
  const p = ze(() => {
    const v = h.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), g = ze((v) => {
    if (v.suppressKey) {
      const M = localStorage.getItem(v.suppressKey);
      if (M && Date.now() < parseInt(M, 10))
        return Promise.resolve(!0);
    }
    return new Promise((M) => {
      p(), a(!1), o({ kind: "confirm", options: v, resolve: M });
    });
  }, [p]), m = ze((v) => new Promise((M) => {
    p(), o({ kind: "prompt", options: v, resolve: M });
  }), [p]), y = ze((v) => new Promise((M) => {
    p(), o({ kind: "alert", options: v, resolve: M });
  }), [p]);
  Ge(() => {
    if (i) {
      const v = setTimeout(() => {
        var M;
        return (M = l.current) == null ? void 0 : M.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [i]);
  const b = ze(() => {
    var v, M;
    if (i) {
      if (i.kind === "confirm") {
        const O = i.options;
        O.suppressKey && s && localStorage.setItem(O.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((M = (v = l.current) == null ? void 0 : v.value) == null ? void 0 : M.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), T = i !== null;
  Ge(() => {
    if (!T) return;
    const v = (M) => {
      M.key !== "Enter" || M.shiftKey || M.metaKey || M.ctrlKey || M.altKey || M.isComposing || (M.preventDefault(), M.stopImmediatePropagation(), b());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [T, b]);
  const A = ze(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ ge(wb.Provider, { value: { confirm: g, prompt: m, alert: y }, children: [
    t,
    T && /* @__PURE__ */ _(
      Vx,
      {
        open: !0,
        onClose: A,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ ge(Ln, { children: [
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
        children: /* @__PURE__ */ ge("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ _("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ _(
            Nx,
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
const ek = 500, tk = 250, nk = 5, Tr = 88, dp = 4;
function rk(t, e) {
  const n = t.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const a = s - i, l = Math.min(a / e, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function ik({ x: t, y: e, ms: n }) {
  const r = Q(null), i = oo();
  return Ge(() => {
    r.current && rk(r.current, n);
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
        children: /* @__PURE__ */ ge("svg", { ref: r, width: Tr, height: Tr, viewBox: `0 0 ${Tr} ${Tr}`, children: [
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
function ok(t) {
  const e = t.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || t.isContentEditable || t.closest("[data-no-longpress]") || t.closest("button, input, select, textarea"));
}
function e3({
  children: t,
  showRing: e = !0,
  longPressMs: n = ek,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, a] = Ye(null), l = Ls(), c = Q(null), u = Q(null), d = Q({ x: 0, y: 0, target: null }), f = Q(!1), h = Math.min(tk, n * 0.5), p = Q(i);
  p.current = i;
  const g = Q(o);
  return g.current = o, Ge(() => {
    if (!zn || !l) return;
    const m = (A) => {
      if (!df(A.pointerType) || A.button !== 0) return;
      const v = A.target;
      if (!v.closest(r) || (p.current ? !p.current(v) : ok(v))) return;
      const M = A.clientX, O = A.clientY;
      d.current = { x: M, y: O, target: A.target }, f.current = !0, e && (u.current = setTimeout(() => a({ x: M, y: O }), h)), c.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), a(null);
        const P = d.current.target;
        if (!P) return;
        const k = g.current;
        if (k) {
          k(P, M, O);
          return;
        }
        const z = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: M,
          clientY: O,
          button: 2,
          view: window
        });
        P.dispatchEvent(z);
      }, n);
    }, y = (A) => {
      if (!f.current || c.current === null) return;
      const v = A.clientX - d.current.x, M = A.clientY - d.current.y;
      Math.sqrt(v * v + M * M) > nk && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    }, b = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null);
    }, T = (A) => {
      df(A.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, a(null));
    };
    return l == null || l.addEventListener("pointerdown", m), l.addEventListener("pointermove", y), l.addEventListener("pointerup", b), l.addEventListener("pointercancel", b), l.addEventListener("pointerleave", T), () => {
      l.removeEventListener("pointerdown", m), l.removeEventListener("pointermove", y), l.removeEventListener("pointerup", b), l == null || l.removeEventListener("pointercancel", b), l == null || l.removeEventListener("pointerleave", T), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, n, h, r]), /* @__PURE__ */ ge(Ln, { children: [
    t,
    e && s && /* @__PURE__ */ _(ik, { x: s.x, y: s.y, ms: n - h })
  ] });
}
function t3() {
  const t = xx();
  return wx ? t === null || df(t) : !1;
}
const sk = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, ak = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, lk = {
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
        ...e ? lk : t ? ak : sk,
        ...n
      },
      ...s,
      children: o
    }
  );
}
const ck = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], uk = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ul = 1900, Gl = 2100;
function dk(t, e) {
  return new Date(t, e + 1, 0).getDate();
}
function fk(t, e, n) {
  return `${t}-${String(e + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function r3({ selected: t, onChange: e, theme: n, showChips: r = !0, className: i = "", initialView: o }) {
  const s = wr(), a = n ?? (s == null ? void 0 : s.mode) ?? "light", l = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return l;
    const Y = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(Y.getTime()) ? l : Y;
  })(), [u, d] = Ye(c.getFullYear()), [f, h] = Ye(c.getMonth()), [p, g] = Ye("days"), [m, y] = Ye(null), b = dn(() => new Set(t), [t]), T = (Y) => {
    b.has(Y) ? e(t.filter((ce) => ce !== Y)) : e([...t, Y]);
  }, A = dn(() => {
    const Y = dk(u, f), ce = new Date(u, f, 1).getDay(), fe = [];
    for (let Ee = 0; Ee < ce; Ee++) fe.push({ key: `pad-${Ee}`, day: 0, empty: !0 });
    for (let Ee = 1; Ee <= Y; Ee++) fe.push({ key: fk(u, f, Ee), day: Ee, empty: !1 });
    return fe;
  }, [u, f]), v = (Y) => d((ce) => Math.max(Ul, Math.min(Gl, ce + Y))), M = (Y) => {
    f + Y < 0 ? (d((ce) => Math.max(Ul, ce - 1)), h(11)) : f + Y > 11 ? (d((ce) => Math.min(Gl, ce + 1)), h(0)) : h((ce) => ce + Y);
  }, O = () => {
    if (m === null) return;
    const Y = parseInt(m, 10);
    !isNaN(Y) && Y >= Ul && Y <= Gl && d(Y), y(null);
  }, P = (Y) => t.some((ce) => ce.startsWith(`${u}-${String(Y + 1).padStart(2, "0")}`)), k = yn(), z = Me(4, 8, k), C = Me(16, 20, k), x = Me(10, 11, k), I = Me(6, 8, k), R = Me(12, 14, k), S = Me(6, 10, k), D = Me(12, 14, k), $ = Me(8, 12, k), B = Me(10, 12, k), Z = Me(6, 10, k), L = Me(2, 6, k), N = Me(64, 80, k), J = { padding: z }, U = { width: C, height: C }, K = { fontSize: x, paddingTop: I, paddingBottom: I }, V = { fontSize: R, paddingTop: S, paddingBottom: S }, q = { fontSize: D, paddingTop: $, paddingBottom: $ }, G = { fontSize: B, padding: `${L}px ${Z}px` }, ne = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", te = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ ge("div", { "data-mode": a, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ ge("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? v(-1) : M(-1),
          style: J,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ _(Fw, { style: U })
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
          onBlur: O,
          onKeyDown: (Y) => {
            Y.key === "Enter" && (Y.preventDefault(), O()), Y.key === "Escape" && y(null);
          },
          style: { width: N },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? v(1) : M(1),
          style: J,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ _(La, { style: U })
        }
      )
    ] }),
    p === "months" ? /* @__PURE__ */ ge("div", { children: [
      /* @__PURE__ */ _("div", { className: "grid grid-cols-3 text-center", children: uk.map((Y, ce) => /* @__PURE__ */ ge(
        "button",
        {
          type: "button",
          onClick: () => {
            h(ce), g("days");
          },
          style: q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${ce === f ? ne : te}`,
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
          style: { paddingTop: S, paddingBottom: S, fontSize: R },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ ge("div", { className: "grid grid-cols-7 text-center", children: [
      ck.map((Y) => /* @__PURE__ */ _("div", { style: K, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: Y }, Y)),
      A.map((Y) => Y.empty ? /* @__PURE__ */ _("div", {}, Y.key) : /* @__PURE__ */ _(
        "button",
        {
          type: "button",
          onClick: () => T(Y.key),
          style: V,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${b.has(Y.key) ? ne : te}`,
          children: Y.day
        },
        Y.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ ge("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ ge("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ _("div", { className: "flex flex-wrap gap-1", children: t.map((Y) => {
        const ce = /* @__PURE__ */ new Date(Y + "T00:00:00"), fe = ce.getFullYear() === l.getFullYear() ? ce.toLocaleString("default", { month: "short", day: "numeric" }) : ce.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ ge(
          "button",
          {
            type: "button",
            onClick: () => T(Y),
            "aria-label": `Remove ${fe}`,
            style: G,
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
  const h = (A) => e instanceof Set ? e.has(A) : e.includes(A), p = yn(), g = Me(12, 16, p), m = Me(8, 12, p), y = Me(12, 14, p), b = Me(16, 20, p), T = r != null || i != null;
  return /* @__PURE__ */ ge("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    T && /* @__PURE__ */ ge("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ _("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ _("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ ge(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          t.map((A) => {
            const v = h(A.id), M = /* @__PURE__ */ _(Ff, { checked: v, size: b });
            return /* @__PURE__ */ ge(
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
                  u === "leading" && M,
                  A.leading != null && /* @__PURE__ */ _("span", { className: "ui-checklist-leading", children: A.leading }),
                  /* @__PURE__ */ _("span", { className: "ui-checklist-label", children: A.label }),
                  A.secondary != null && /* @__PURE__ */ _("span", { className: "ui-checklist-secondary", children: A.secondary }),
                  u === "trailing" && /* @__PURE__ */ _("span", { className: "ml-auto flex shrink-0", children: M })
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
  const u = yn(), d = s ? 10 : Me(12, 16, u), f = s ? 6 : Me(8, 12, u), h = s ? 12 : Me(12, 14, u), p = s ? 14 : Me(16, 20, u);
  return /* @__PURE__ */ ge("div", { className: c, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ _("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ _("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ ge(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          t.map((g) => {
            const m = e === g.id;
            return /* @__PURE__ */ ge(
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
  const s = $s(), { refs: a, floatingStyles: l } = Qw({
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
      Ky(o),
      Uy({ padding: 8 }),
      Gy({ padding: 8 }),
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
    whileElementsMounted: ex
  });
  return $n(() => {
    n && a.setReference(n);
  }, [n, a]), /* @__PURE__ */ ge(Ln, { children: [
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
function hk(t, e) {
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
  const n = wr(), r = yn(), i = Me(10, 12, r), o = Me(6, 6, r), s = Me(10, 12, r), a = { padding: `${o}px ${i}px`, fontSize: s }, l = oo(), c = $s(), [u, d] = Ye(!1), [f, h] = Ye({ x: 0, y: 0 }), p = Q(null), g = Q(null), m = () => {
    if (!p.current) return;
    const T = p.current.getBoundingClientRect();
    h({ x: T.left + T.width / 2, y: T.top });
  };
  Ge(() => () => {
    g.current && clearTimeout(g.current);
  }, []), Ge(() => (u && c && (m(), c.addEventListener("scroll", m, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", m, !0)), [u]);
  const y = hk(e, t), b = Object.keys(y).length > 0 ? Mt.cloneElement(e, y) : e;
  return /* @__PURE__ */ ge(
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
          /* @__PURE__ */ ge(
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
}, pk = 250;
function gk(t, e, n) {
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
      s(!0), a.current && clearTimeout(a.current), a.current = setTimeout(() => s(!1), pk), c();
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
  const t = yn(), e = zn, n = e ? Me(28, 40, t) : 28, r = e ? Me(28, 40, t) : 28, i = e ? Me(10, 14, t) : 10, o = e ? Me(10, 14, t) : 10, s = e ? Me(8, 10, t) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const a3 = zn ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", mk = zn ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ua = zn ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", yk = "hover:bg-red-950/50", l3 = zn ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", c3 = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", u3 = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", bk = zn ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", d3 = zn ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", xb = zn ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", vk = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", wk = zn ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", da = ({ onClick: t, disabled: e, title: n, className: r = mk, children: i }) => {
  const o = fl();
  return /* @__PURE__ */ _(Co, { content: n, children: /* @__PURE__ */ _("button", { onClick: t, disabled: e, "aria-label": n, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, fa = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, f3 = ({ value: t, options: e, onChange: n, disabled: r, active: i, stretch: o, dense: s, variant: a = "chrome", theme: l, tablist: c, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const h = wr(), p = l ?? Ex(h), g = l === "blue" || l === "emerald" ? l : (h == null ? void 0 : h.accent) ?? "zinc", m = { "data-mode": p === "dark" ? "dark" : "light", "data-accent": g }, y = fl(), b = yn(), T = s && !zn ? 24 : y.control.height, A = _i({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), v = zn ? A : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, M = (C) => i ? i(C) : t === C, O = Mt.useRef(null), P = Mt.useRef([]), k = Math.max(0, e.findIndex((C) => M(C.v))), z = gk(O, P, k);
  return a === "track" ? /* @__PURE__ */ ge(
    "div",
    {
      ref: O,
      role: c ? "tablist" : "group",
      "aria-label": f,
      ...m,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${zn ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${fa.wrap}`,
      children: [
        z.style && /* @__PURE__ */ _(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${fa.pill} ${z.motionClass}`,
            style: { ...z.style, top: 2, bottom: 2 }
          }
        ),
        e.map((C, x) => {
          const I = M(C.v), R = u && !!C.icon;
          return /* @__PURE__ */ _(
            "button",
            {
              ref: (S) => {
                P.current[x] = S;
              },
              ...C.dataProps,
              type: "button",
              disabled: r,
              onClick: () => n(C.v),
              title: C.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? I : void 0,
              "aria-pressed": c ? void 0 : I,
              "aria-label": C.ariaLabel ?? (C.l ? void 0 : C.title),
              style: v,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${R ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${I ? fa.active : fa.idle}`,
              children: /* @__PURE__ */ _(
                cb,
                {
                  icon: C.icon,
                  collapse: R,
                  iconWithLabel: d,
                  active: I,
                  gap: Me(6, 8, b),
                  children: C.l
                }
              )
            },
            C.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ ge("div", { ref: O, className: `relative ${vk} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    z.style && /* @__PURE__ */ _(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${z.motionClass}`,
        style: { ...z.style, top: 0, bottom: 0 }
      }
    ),
    e.map((C, x) => {
      const I = M(C.v);
      return /* @__PURE__ */ ge(
        "button",
        {
          ref: (R) => {
            P.current[x] = R;
          },
          ...C.dataProps,
          disabled: r,
          onClick: () => n(C.v),
          title: C.title,
          style: { ...y.control, height: T },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${I ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${C.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            C.icon,
            C.l
          ]
        },
        C.v
      );
    })
  ] });
}, h3 = ({ children: t }) => /* @__PURE__ */ ge("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ _("span", { className: zn ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ _("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), xk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", kk = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", p3 = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ ge("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ _("span", { className: n ? xk : kk, children: t }),
  e
] }), g3 = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ ge("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${n}`, children: [
  t,
  e && /* @__PURE__ */ _("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), m3 = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ ge("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ _(da, { onClick: () => r(-1), disabled: t, title: "Move up", className: ua, children: /* @__PURE__ */ _(Hw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ _(da, { onClick: () => r(1), disabled: t, title: "Move down", className: ua, children: /* @__PURE__ */ _(Bw, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ _(da, { onClick: e, disabled: t, title: "Duplicate", className: ua, children: /* @__PURE__ */ _(Wy, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ _("div", { className: xb }),
    /* @__PURE__ */ _(da, { onClick: n, disabled: t, title: "Delete", className: `${ua} ${yk}`, children: /* @__PURE__ */ _(za, { className: "w-2.5 h-2.5" }) })
  ] })
);
var fp = Object.defineProperty, Sk = (t, e) => {
  let n = {};
  for (var r in t) fp(n, r, {
    get: t[r],
    enumerable: !0
  });
  return fp(n, Symbol.toStringTag, { value: "Module" }), n;
};
function Xn(t) {
  this.content = t;
}
Xn.prototype = {
  constructor: Xn,
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
    return i == -1 ? o.push(n || t, e) : (o[i + 1] = e, n && (o[i] = n)), new Xn(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(t) {
    var e = this.find(t);
    if (e == -1) return this;
    var n = this.content.slice();
    return n.splice(e, 2), new Xn(n);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(t, e) {
    return new Xn([t, e].concat(this.remove(t).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(t, e) {
    var n = this.remove(t).content.slice();
    return n.push(t, e), new Xn(n);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(t, e, n) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(t);
    return i.splice(o == -1 ? i.length : o, 0, e, n), new Xn(i);
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
    return t = Xn.from(t), t.size ? new Xn(t.content.concat(this.subtract(t).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(t) {
    return t = Xn.from(t), t.size ? new Xn(this.subtract(t).content.concat(t.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(t) {
    var e = this;
    t = Xn.from(t);
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
Xn.from = function(t) {
  if (t instanceof Xn) return t;
  var e = [];
  if (t) for (var n in t) e.push(n, t[n]);
  return new Xn(e);
};
function kb(t, e, n) {
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
      return l && l < s.length && l < a.length && Rb(s.charCodeAt(l - 1)) && Cb(s.charCodeAt(l)) && n--, n;
    }
    if (i.content.size || o.content.size) {
      let s = kb(i.content, o.content, n + 1);
      if (s != null)
        return s;
    }
    n += i.nodeSize;
  }
}
function Sb(t, e, n, r) {
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
      return d && f && d < c.length && Rb(c.charCodeAt(d - 1)) && Cb(c.charCodeAt(d)) && (n++, r++), { a: n, b: r };
    }
    if (s.content.size || a.content.size) {
      let c = Sb(s.content, a.content, n - 1, r - 1);
      if (c)
        return c;
    }
    n -= l, r -= l;
  }
}
function Cb(t) {
  return t >= 56320 && t < 57344;
}
function Rb(t) {
  return t >= 55296 && t < 56320;
}
class Ne {
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
    return new Ne(i, this.size + e.size);
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
    return new Ne(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, n) {
    return e == n ? Ne.empty : e == 0 && n == this.content.length ? this : new Ne(this.content.slice(e, n));
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
    return i[e] = n, new Ne(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new Ne([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new Ne(this.content.concat(e), this.size + e.nodeSize);
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
    return kb(this, e, n);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, n = this.size, r = e.size) {
    return Sb(this, e, n, r);
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
      return Ne.empty;
    if (!Array.isArray(n))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return Ne.fromArray(n.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return Ne.empty;
    let n, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (n || (n = e.slice(0, i)), n[n.length - 1] = o.withText(n[n.length - 1].text + o.text)) : n && n.push(o);
    }
    return new Ne(n || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return Ne.empty;
    if (e instanceof Ne)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new Ne([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
Ne.empty = new Ne([], 0);
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
let Tn = class pf {
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
Tn.none = [];
class Ms extends Error {
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
    let r = Eb(this.content, e + this.openStart, n, this.openStart + 1, this.openEnd + 1);
    return r && new dt(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, n) {
    return new dt(Tb(this.content, e + this.openStart, n + this.openStart), this.openStart, this.openEnd);
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
    return new dt(Ne.fromJSON(e, n.content), r, i);
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
dt.empty = new dt(Ne.empty, 0, 0);
function Tb(t, e, n) {
  let { index: r, offset: i } = t.findIndex(e), o = t.maybeChild(r), { index: s, offset: a } = t.findIndex(n);
  if (i == e || o.isText) {
    if (a != n && !t.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return t.cut(0, e).append(t.cut(n));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return t.replaceChild(r, o.copy(Tb(o.content, e - i - 1, n - i - 1)));
}
function Eb(t, e, n, r, i, o) {
  let { index: s, offset: a } = t.findIndex(e), l = t.maybeChild(s);
  if (a == e || l.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, n) ? null : t.cut(0, e).append(n).append(t.cut(e));
  let c = Eb(l.content, e - a - 1, n, s == 0 ? r - 1 : 0, s == t.childCount - 1 ? i - 1 : 0, l);
  return c && t.replaceChild(s, l.copy(c));
}
function Ck(t, e, n) {
  if (n.openStart > t.depth)
    throw new Ms("Inserted content deeper than insertion position");
  if (t.depth - n.openStart != e.depth - n.openEnd)
    throw new Ms("Inconsistent open depths");
  return Mb(t, e, n, 0);
}
function Mb(t, e, n, r) {
  let i = t.index(r), o = t.node(r);
  if (i == e.index(r) && r < t.depth - n.openStart) {
    let s = Mb(t, e, n, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (n.content.size)
    if (!n.openStart && !n.openEnd && t.depth == r && e.depth == r) {
      let s = t.parent, a = s.content;
      return Ji(s, a.cut(0, t.parentOffset).append(n.content).append(a.cut(e.parentOffset)));
    } else {
      let { start: s, end: a } = Rk(n, t);
      return Ji(o, Ab(t, s, a, e, r));
    }
  else return Ji(o, qa(t, e, r));
}
function Ib(t, e) {
  if (!e.type.compatibleContent(t.type))
    throw new Ms("Cannot join " + e.type.name + " onto " + t.type.name);
}
function gf(t, e, n) {
  let r = t.node(n);
  return Ib(r, e.node(n)), r;
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
function Ab(t, e, n, r, i) {
  let o = t.depth > i && gf(t, e, i + 1), s = r.depth > i && gf(n, r, i + 1), a = [];
  return vs(null, t, i, a), o && s && e.index(i) == n.index(i) ? (Ib(o, s), Vi(Ji(o, Ab(t, e, n, r, i + 1)), a)) : (o && Vi(Ji(o, qa(t, e, i + 1)), a), vs(e, n, i, a), s && Vi(Ji(s, qa(n, r, i + 1)), a)), vs(r, null, i, a), new Ne(a);
}
function qa(t, e, n) {
  let r = [];
  if (vs(null, t, n, r), t.depth > n) {
    let i = gf(t, e, n + 1);
    Vi(Ji(i, qa(t, e, n + 1)), r);
  }
  return vs(e, null, n, r), new Ne(r);
}
function Rk(t, e) {
  let n = e.depth - t.openStart, i = e.node(n).copy(t.content);
  for (let o = n - 1; o >= 0; o--)
    i = e.node(o).copy(Ne.from(i));
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
      return Tn.none;
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
      hp.set(e, r = new Tk());
    let i = r.elts[r.i] = Is.resolve(e, n);
    return r.i = (r.i + 1) % Ek, i;
  }
}
class Tk {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Ek = 12, hp = /* @__PURE__ */ new WeakMap();
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
const Mk = /* @__PURE__ */ Object.create(null);
let Oo = class mf {
  /**
  @internal
  */
  constructor(e, n, r, i = Tn.none) {
    this.type = e, this.attrs = n, this.marks = i, this.content = r || Ne.empty;
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
    return this.type == e && Ba(this.attrs, n || e.defaultAttrs || Mk) && Tn.sameSet(this.marks, r || Tn.none);
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
    return Ck(this.resolve(e), this.resolve(n), r);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), _b(this.marks, e);
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
  canReplace(e, n, r = Ne.empty, i = 0, o = r.childCount) {
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
    let e = Tn.none;
    for (let n = 0; n < this.marks.length; n++) {
      let r = this.marks[n];
      pp(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Tn.sameSet(e, this.marks))
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
    let i = Ne.fromJSON(e, n.content);
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
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : _b(this.marks, JSON.stringify(this.text));
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
function _b(t, e) {
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
    let r = new Ik(e, n);
    if (r.next == null)
      return to.empty;
    let i = Pb(r);
    r.next && r.err("Unexpected trailing text");
    let o = zk(Ok(i));
    return Lk(o, r), o;
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
        return Ne.from(a.map((c) => c.createAndFill()));
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
class Ik {
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
function Pb(t) {
  let e = [];
  do
    e.push(Ak(t));
  while (t.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Ak(t) {
  let e = [];
  do
    e.push(_k(t));
  while (t.next && t.next != ")" && t.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function _k(t) {
  let e = Nk(t);
  for (; ; )
    if (t.eat("+"))
      e = { type: "plus", expr: e };
    else if (t.eat("*"))
      e = { type: "star", expr: e };
    else if (t.eat("?"))
      e = { type: "opt", expr: e };
    else if (t.eat("{"))
      e = Pk(t, e);
    else
      break;
  return e;
}
function gp(t) {
  /\D/.test(t.next) && t.err("Expected number, got '" + t.next + "'");
  let e = Number(t.next);
  return t.pos++, e;
}
function Pk(t, e) {
  let n = gp(t), r = n;
  return t.eat(",") && (t.next != "}" ? r = gp(t) : r = -1), t.eat("}") || t.err("Unclosed braced range"), { type: "range", min: n, max: r, expr: e };
}
function Dk(t, e) {
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
function Nk(t) {
  if (t.eat("(")) {
    let e = Pb(t);
    return t.eat(")") || t.err("Missing closing paren"), e;
  } else if (/\W/.test(t.next))
    t.err("Unexpected token '" + t.next + "'");
  else {
    let e = Dk(t, t.next).map((n) => (t.inline == null ? t.inline = n.isInline : t.inline != n.isInline && t.err("Mixing inline and block content"), { type: "name", value: n }));
    return t.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ok(t) {
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
function Db(t, e) {
  return e - t;
}
function mp(t, e) {
  let n = [];
  return r(e), n.sort(Db);
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
function zk(t) {
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
      let a = i[s][1].sort(Db);
      o.next.push({ type: i[s][0], next: e[a.join(",")] || n(a) });
    }
    return o;
  }
}
function Lk(t, e) {
  for (let n = 0, r = [t]; n < r.length; n++) {
    let i = r[n], o = !i.validEnd, s = [];
    for (let a = 0; a < i.next.length; a++) {
      let { type: l, next: c } = i.next[a];
      s.push(l.name), o && !(l.isText || l.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Nb(t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let n in t) {
    let r = t[n];
    if (!r.hasDefault)
      return null;
    e[n] = r.default;
  }
  return e;
}
function Ob(t, e) {
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
function zb(t, e) {
  let n = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      n[r] = new Fk(t, r, e[r]);
  return n;
}
class Ka {
  /**
  @internal
  */
  constructor(e, n, r) {
    this.name = e, this.schema = n, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = zb(e, r.attrs), this.defaultAttrs = Nb(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Ob(this.attrs, e);
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
    return new Oo(this, this.computeAttrs(e), Ne.from(n), Tn.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, n, r) {
    return n = Ne.from(n), this.checkContent(n), new Oo(this, this.computeAttrs(e), n, Tn.setFrom(r));
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
    if (e = this.computeAttrs(e), n = Ne.from(n), n.size) {
      let s = this.contentMatch.fillBefore(n);
      if (!s)
        return null;
      n = s.append(n);
    }
    let i = this.contentMatch.matchFragment(n), o = i && i.fillBefore(Ne.empty, !0);
    return o ? new Oo(this, e, n.append(o), Tn.setFrom(r)) : null;
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
    return n ? n.length ? n : Tn.none : e;
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
function $k(t, e, n) {
  let r = n.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${t}, got ${o}`);
  };
}
class Fk {
  constructor(e, n, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? $k(e, n, r.validate) : r.validate;
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
    this.name = e, this.rank = n, this.schema = r, this.spec = i, this.attrs = zb(e, i.attrs), this.excluded = null;
    let o = Nb(this.attrs);
    this.instance = o ? new Tn(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Tn(this, Ob(this.attrs, e));
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
class Hk {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let n = this.spec = {};
    for (let i in e)
      n[i] = e[i];
    n.nodes = Xn.from(e.nodes), n.marks = Xn.from(e.marks || {}), this.nodes = Ka.compile(this.spec.nodes, this), this.marks = hl.compile(this.spec.marks, this);
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
    this.nodeFromJSON = (i) => Oo.fromJSON(this, i), this.markFromJSON = (i) => Tn.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    return new ja(r, r.defaultAttrs, e, Tn.setFrom(n));
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
function Bk(t) {
  return t.tag != null;
}
function qk(t) {
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
      if (Bk(i))
        this.tags.push(i);
      else if (qk(i)) {
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
    return r.addAll(e, Tn.none, n.from, n.to), r.finish();
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
    return r.addAll(e, Tn.none, n.from, n.to), dt.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, n, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Kk(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || n.matchesContext(o.context))) {
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
const Lb = {
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
}, Wk = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, $b = { ol: !0, ul: !0 }, As = 1, yf = 2, ws = 4;
function bp(t, e, n) {
  return e != null ? (e ? As : 0) | (e === "full" ? yf : 0) : t && t.whitespace == "pre" ? As | yf : n & ~ws;
}
class pa {
  constructor(e, n, r, i, o, s) {
    this.type = e, this.attrs = n, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Tn.none, this.match = o || (s & ws ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let n = this.type.contentMatch.fillBefore(Ne.from(e));
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
    let n = Ne.from(this.content);
    return !e && this.match && (n = n.append(this.match.fillBefore(Ne.empty, !0))), this.type ? this.type.create(this.attrs, n, this.marks) : n;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Lb.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class vp {
  constructor(e, n, r) {
    this.parser = e, this.options = n, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = n.topNode, o, s = bp(null, n.preserveWhitespace, 0) | (r ? ws : 0);
    i ? o = new pa(i.type, i.attrs, Tn.none, !0, n.topMatch || i.type.contentMatch, s) : r ? o = new pa(null, null, Tn.none, !0, null, s) : o = new pa(e.schema.topNodeType, null, Tn.none, !0, null, s), this.nodes = [o], this.find = n.findPositions, this.needsBlock = !1;
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
    $b.hasOwnProperty(s) && this.parser.normalizeLists && jk(e);
    let l = this.options.ruleFromNode && this.options.ruleFromNode(e) || (a = this.parser.matchTag(e, this, r));
    e: if (l ? l.ignore : Wk.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, n);
    else if (!l || l.skip || l.closeParent) {
      l && l.closeParent ? this.open = Math.max(0, this.open - 1) : l && l.skip.nodeType && (e = l.skip);
      let c, u = this.needsBlock;
      if (Lb.hasOwnProperty(s))
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
      let s = Tn.none;
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
    let l = Tn.none;
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
function jk(t) {
  for (let e = t.firstChild, n = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && $b.hasOwnProperty(r) && n ? (n.appendChild(e), e = n) : r == "li" ? n = e : r && (n = null);
  }
}
function Kk(t, e) {
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
const Fb = 65535, Hb = Math.pow(2, 16);
function Uk(t, e) {
  return t + e * Hb;
}
function kp(t) {
  return t & Fb;
}
function Gk(t) {
  return (t - (t & Fb)) / Hb;
}
const Bb = 1, qb = 2, Pa = 4, Wb = 8;
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
    return (this.delInfo & Wb) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Bb | Pa)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (qb | Pa)) > 0;
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
class vr {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, n = !1) {
    if (this.ranges = e, this.inverted = n, !e.length && vr.empty)
      return vr.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let n = 0, r = kp(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        n += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + n + Gk(e);
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
        let p = e == (n < 0 ? l : d) ? null : Uk(a / 3, e - l), g = e == l ? qb : e == d ? Bb : Pa;
        return (n < 0 ? e != l : e != d) && (g |= Wb), new bf(h, g, p);
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
    return new vr(this.ranges, !this.inverted);
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
    return e == 0 ? vr.empty : new vr(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
vr.empty = new vr([]);
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
class er {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return vr.empty;
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
class Wn {
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
    return new Wn(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Wn(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, n, r, i) {
    try {
      return Wn.ok(e.replace(n, r, i));
    } catch (o) {
      if (o instanceof Ms)
        return Wn.fail(o.message);
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
  return Ne.fromArray(r);
}
class Ii extends er {
  /**
  Create a mark step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new dt(Yf(n.content, (s, a) => !s.isAtom || !a.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), n.openStart, n.openEnd);
    return Wn.fromReplace(e, this.from, this.to, o);
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
er.jsonID("addMark", Ii);
class Wr extends er {
  /**
  Create a mark-removing step.
  */
  constructor(e, n, r) {
    super(), this.from = e, this.to = n, this.mark = r;
  }
  apply(e) {
    let n = e.slice(this.from, this.to), r = new dt(Yf(n.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), n.openStart, n.openEnd);
    return Wn.fromReplace(e, this.from, this.to, r);
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
er.jsonID("removeMark", Wr);
class Ai extends er {
  /**
  Create a node mark step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Wn.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.addToSet(n.marks));
    return Wn.fromReplace(e, this.pos, this.pos + 1, new dt(Ne.from(r), 0, n.isLeaf ? 0 : 1));
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
er.jsonID("addNodeMark", Ai);
class no extends er {
  /**
  Create a mark-removing step.
  */
  constructor(e, n) {
    super(), this.pos = e, this.mark = n;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Wn.fail("No node at mark step's position");
    let r = n.type.create(n.attrs, null, this.mark.removeFromSet(n.marks));
    return Wn.fromReplace(e, this.pos, this.pos + 1, new dt(Ne.from(r), 0, n.isLeaf ? 0 : 1));
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
er.jsonID("removeNodeMark", no);
class qn extends er {
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
    return this.structure && vf(e, this.from, this.to) ? Wn.fail("Structure replace would overwrite content") : Wn.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new vr([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new qn(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let n = e.mapResult(this.to, -1), r = this.from == this.to && qn.MAP_BIAS < 0 ? n : e.mapResult(this.from, 1);
    return r.deletedAcross && n.deletedAcross ? null : new qn(r.pos, Math.max(r.pos, n.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof qn) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let n = this.slice.size + e.slice.size == 0 ? dt.empty : new dt(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new qn(this.from, this.to + (e.to - e.from), n, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let n = this.slice.size + e.slice.size == 0 ? dt.empty : new dt(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new qn(e.from, this.to, n, this.structure);
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
    return new qn(n.from, n.to, dt.fromJSON(e, n.slice), !!n.structure);
  }
}
qn.MAP_BIAS = 1;
er.jsonID("replace", qn);
class Gn extends er {
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
      return Wn.fail("Structure gap-replace would overwrite content");
    let n = e.slice(this.gapFrom, this.gapTo);
    if (n.openStart || n.openEnd)
      return Wn.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, n.content);
    return r ? Wn.fromReplace(e, this.from, this.to, r) : Wn.fail("Content does not fit in gap");
  }
  getMap() {
    return new vr([
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
    return new Gn(this.from, this.from + this.slice.size + n, this.from + this.insert, this.from + this.insert + n, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let n = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? n.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return n.deletedAcross && r.deletedAcross || i < n.pos || o > r.pos ? null : new Gn(n.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new Gn(n.from, n.to, n.gapFrom, n.gapTo, dt.fromJSON(e, n.slice), n.insert, !!n.structure);
  }
}
er.jsonID("replaceAround", Gn);
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
function Yk(t, e, n, r) {
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
function Xk(t, e, n, r) {
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
      s.push(new qn(a, u, dt.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        n.allowsMarkType(c.marks[f].type) || t.step(new Wr(a, u, c.marks[f]));
      if (i && c.isText && n.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new dt(Ne.from(n.schema.text(" ", n.allowedMarks(c.marks))), 0, 0)), s.push(new qn(a + f.index, a + f.index + f[0].length, p));
      }
    }
    a = u;
  }
  if (!r.validEnd) {
    let l = r.fillBefore(Ne.empty, !0);
    t.replace(a, a, new dt(l, 0, 0));
  }
  for (let l = s.length - 1; l >= 0; l--)
    t.step(s[l]);
}
function Vk(t, e, n) {
  return (e == 0 || t.canReplace(e, t.childCount)) && (n == t.childCount || t.canReplace(0, n));
}
function jo(t) {
  let n = t.parent.content.cutByIndex(t.startIndex, t.endIndex);
  for (let r = t.depth, i = 0, o = 0; ; --r) {
    let s = t.$from.node(r), a = t.$from.index(r) + i, l = t.$to.indexAfter(r) - o;
    if (r < t.depth && s.canReplace(a, l, n))
      return r;
    if (r == 0 || s.type.spec.isolating || !Vk(s, a, l))
      break;
    a && (i = 1), l < s.childCount && (o = 1);
  }
  return null;
}
function Jk(t, e, n) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), a = i.after(o + 1), l = s, c = a, u = Ne.empty, d = 0;
  for (let p = o, g = !1; p > n; p--)
    g || r.index(p) > 0 ? (g = !0, u = Ne.from(r.node(p).copy(u)), d++) : l--;
  let f = Ne.empty, h = 0;
  for (let p = o, g = !1; p > n; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, f = Ne.from(i.node(p).copy(f)), h++) : c++;
  t.step(new Gn(l, c, s, a, new dt(u.append(f), d, h), u.size - d, !0));
}
function jb(t, e, n = null, r = t) {
  let i = Zk(t, e), o = i && Qk(r, e);
  return o ? i.map(Sp).concat({ type: e, attrs: n }).concat(o.map(Sp)) : null;
}
function Sp(t) {
  return { type: t, attrs: null };
}
function Zk(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return n.canReplaceWith(r, i, s) ? o : null;
}
function Qk(t, e) {
  let { parent: n, startIndex: r, endIndex: i } = t, o = n.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let l = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; l && c < i; c++)
    l = l.matchType(n.child(c).type);
  return !l || !l.validEnd ? null : s;
}
function eS(t, e, n) {
  let r = Ne.empty;
  for (let s = n.length - 1; s >= 0; s--) {
    if (r.size) {
      let a = n[s].type.contentMatch.matchFragment(r);
      if (!a || !a.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = Ne.from(n[s].type.create(n[s].attrs, r));
  }
  let i = e.start, o = e.end;
  t.step(new Gn(i, o, i, o, new dt(r, 0, 0), n.length, !0));
}
function tS(t, e, n, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = t.steps.length;
  t.doc.nodesBetween(e, n, (s, a) => {
    let l = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, l) && nS(t.doc, t.mapping.slice(o).map(a), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Ub(t, s, a, o), Xf(t, t.mapping.slice(o).map(a, 1), r, void 0, c === null);
      let u = t.mapping.slice(o), d = u.map(a, 1), f = u.map(a + s.nodeSize, 1);
      return t.step(new Gn(d, f, d + 1, f - 1, new dt(Ne.from(r.create(l, null, s.marks)), 0, 0), 1, !0)), c === !0 && Kb(t, s, a, o), !1;
    }
  });
}
function Kb(t, e, n, r) {
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
function Ub(t, e, n, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = t.mapping.slice(r).map(n + 1 + o);
      t.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function nS(t, e, n) {
  let r = t.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, n);
}
function rS(t, e, n, r, i) {
  let o = t.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  n || (n = o.type);
  let s = n.create(r, null, i || o.marks);
  if (o.isLeaf)
    return t.replaceWith(e, e + o.nodeSize, s);
  if (!n.validContent(o.content))
    throw new RangeError("Invalid content for node type " + n.name);
  t.step(new Gn(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new dt(Ne.from(s), 0, 0), 1, !0));
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
function iS(t, e, n = 1, r) {
  let i = t.doc.resolve(e), o = Ne.empty, s = Ne.empty;
  for (let a = i.depth, l = i.depth - n, c = n - 1; a > l; a--, c--) {
    o = Ne.from(i.node(a).copy(o));
    let u = r && r[c];
    s = Ne.from(u ? u.type.create(u.attrs, s) : i.node(a).copy(s));
  }
  t.step(new qn(e, e, new dt(o.append(s), n, n), !0));
}
function so(t, e) {
  let n = t.resolve(e), r = n.index();
  return Gb(n.nodeBefore, n.nodeAfter) && n.parent.canReplace(r, r + 1);
}
function oS(t, e) {
  e.content.size || t.type.compatibleContent(e.type);
  let n = t.contentMatchAt(t.childCount), { linebreakReplacement: r } = t.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? t.type.schema.nodes.text : o.type;
    if (n = n.matchType(s), !n || !t.type.allowsMarks(o.marks))
      return !1;
  }
  return n.validEnd;
}
function Gb(t, e) {
  return !!(t && e && !t.isLeaf && oS(t, e));
}
function pl(t, e, n = -1) {
  let r = t.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, a = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : n > 0 ? (o = r.node(i + 1), a++, s = r.node(i).maybeChild(a)) : (o = r.node(i).maybeChild(a - 1), s = r.node(i + 1)), o && !o.isTextblock && Gb(o, s) && r.node(i).canReplace(a, a + 1))
      return e;
    if (i == 0)
      break;
    e = n < 0 ? r.before(i) : r.after(i);
  }
}
function sS(t, e, n) {
  let r = null, { linebreakReplacement: i } = t.doc.type.schema, o = t.doc.resolve(e - n), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let a = t.steps.length;
  if (r === !1) {
    let u = t.doc.resolve(e + n);
    Ub(t, u.node(), u.before(), a);
  }
  s.inlineContent && Xf(t, e + n - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let l = t.mapping.slice(a), c = l.map(e - n);
  if (t.step(new qn(c, l.map(e + n, -1), dt.empty, !0)), r === !0) {
    let u = t.doc.resolve(c);
    Kb(t, u.node(), u.before(), t.steps.length);
  }
  return t;
}
function aS(t, e, n) {
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
  return Yb(i, o, r) ? new qn(e, n, r) : new lS(i, o, r).fit();
}
function Yb(t, e, n) {
  return !n.openStart && !n.openEnd && t.start() == e.start() && t.parent.canReplace(t.index(), e.index(), n.content);
}
class lS {
  constructor(e, n, r) {
    this.$from = e, this.$to = n, this.unplaced = r, this.frontier = [], this.placed = Ne.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = Ne.from(e.node(i).copy(this.placed));
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
    return e > -1 ? new Gn(r.pos, e, this.$to.pos, this.$to.end(), l, n) : l.size || r.pos != this.$to.pos ? new qn(r.pos, i.pos, l) : null;
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
          if (n == 1 && (s ? c.matchType(s.type) || (d = c.fillBefore(Ne.from(s), !1)) : o && l.compatibleContent(o.type)))
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
      this.unplaced = new dt(ps(e, n - 1, 1), n - 1, o ? n - 1 : r);
    } else
      this.unplaced = new dt(ps(e, n, 1), n, r);
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
      c++, (c > 1 || l == 0 || g.content.size) && (d = m, u.push(Xb(g.mark(f.allowedMarks(g.marks)), c == 1 ? l : 0, c == a.childCount ? h : -1)));
    }
    let p = c == a.childCount;
    p || (h = -1), this.placed = gs(this.placed, n, Ne.from(u)), this.frontier[n].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, m = a; g < h; g++) {
      let y = m.lastChild;
      this.frontier.push({ type: y.type, match: y.contentMatchAt(y.childCount) }), m = y.content;
    }
    this.unplaced = p ? e == 0 ? dt.empty : new dt(ps(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new dt(ps(s.content, e, c), s.openStart, s.openEnd);
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
    i.match = i.match.matchType(e), this.placed = gs(this.placed, this.depth, Ne.from(e.create(n, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let n = this.frontier.pop().match.fillBefore(Ne.empty, !0);
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
function Xb(t, e, n) {
  if (e <= 0)
    return t;
  let r = t.content;
  return e > 1 && (r = r.replaceChild(0, Xb(r.firstChild, e - 1, r.childCount == 1 ? n - 1 : 0))), e > 0 && (r = t.type.contentMatch.fillBefore(r).append(r), n <= 0 && (r = r.append(t.type.contentMatch.matchFragment(r).fillBefore(Ne.empty, !0)))), t.copy(r);
}
function Jl(t, e, n, r, i) {
  let o = t.node(e), s = i ? t.indexAfter(e) : t.index(e);
  if (s == o.childCount && !n.compatibleContent(o.type))
    return null;
  let a = r.fillBefore(o.content, !0, s);
  return a && !cS(n, o.content, s) ? a : null;
}
function cS(t, e, n) {
  for (let r = n; r < e.childCount; r++)
    if (!t.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function uS(t) {
  return t.spec.defining || t.spec.definingForContent;
}
function dS(t, e, n, r) {
  if (!r.size)
    return t.deleteRange(e, n);
  let i = t.doc.resolve(e), o = t.doc.resolve(n);
  if (Yb(i, o, r))
    return t.step(new qn(e, n, r));
  let s = Jb(i, o);
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
    let h = c[f], p = uS(h.type);
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
          return t.replace(i.before(m), y ? o.after(m) : n, new dt(Vb(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = t.steps.length;
  for (let f = s.length - 1; f >= 0 && (t.replace(e, n, r), !(t.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), n = o.after(h));
  }
}
function Vb(t, e, n, r, i) {
  if (e < n) {
    let o = t.firstChild;
    t = t.replaceChild(0, o.copy(Vb(o.content, e + 1, n, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(t).append(t);
    t = s.append(o.matchFragment(s).fillBefore(Ne.empty, !0));
  }
  return t;
}
function fS(t, e, n, r) {
  if (!r.isInline && e == n && t.doc.resolve(e).parent.content.size) {
    let i = aS(t.doc, e, r.type);
    i != null && (e = n = i);
  }
  t.replaceRange(e, n, new dt(Ne.from(r), 0, 0));
}
function hS(t, e, n) {
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
  let o = Jb(r, i);
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
function Jb(t, e) {
  let n = [], r = Math.min(t.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = t.start(i);
    if (o < t.pos - (t.depth - i) || e.end(i) > e.pos + (e.depth - i) || t.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == t.depth && i == e.depth && t.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && n.push(i);
  }
  return n;
}
class Lo extends er {
  /**
  Construct an attribute step.
  */
  constructor(e, n, r) {
    super(), this.pos = e, this.attr = n, this.value = r;
  }
  apply(e) {
    let n = e.nodeAt(this.pos);
    if (!n)
      return Wn.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in n.attrs)
      r[o] = n.attrs[o];
    r[this.attr] = this.value;
    let i = n.type.create(r, null, n.marks);
    return Wn.fromReplace(e, this.pos, this.pos + 1, new dt(Ne.from(i), 0, n.isLeaf ? 0 : 1));
  }
  getMap() {
    return vr.empty;
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
er.jsonID("attr", Lo);
class _s extends er {
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
    return Wn.ok(r);
  }
  getMap() {
    return vr.empty;
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
er.jsonID("docAttr", _s);
let Fo = class extends Error {
};
Fo = function t(e) {
  let n = Error.call(this, e);
  return n.__proto__ = t.prototype, n;
};
Fo.prototype = Object.create(Error.prototype);
Fo.prototype.constructor = Fo;
Fo.prototype.name = "TransformError";
class pS {
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
    return this.replace(e, n, new dt(Ne.from(r), 0, 0));
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
    return dS(this, e, n, r), this;
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
    return fS(this, e, n, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, n) {
    return hS(this, e, n), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, n) {
    return Jk(this, e, n), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, n = 1) {
    return sS(this, e, n), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, n) {
    return eS(this, e, n), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, n = e, r, i = null) {
    return tS(this, e, n, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, n, r = null, i) {
    return rS(this, e, n, r, i), this;
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
    if (n instanceof Tn)
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
    return iS(this, e, n, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, n, r) {
    return Yk(this, e, n, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, n, r) {
    return Xk(this, e, n, r), this;
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
class On {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, n, r) {
    this.$anchor = e, this.$head = n, this.ranges = r || [new gS(e.min(n), e.max(n))];
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
      e.replaceRange(u.map(l.pos), u.map(c.pos), a ? dt.empty : n), a == 0 && Tp(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
    let i = e.parent.inlineContent ? new fr(e) : Ro(e.node(0), e.parent, e.pos, e.index(), n, r);
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
    return fr.between(this.$anchor, this.$head).getBookmark();
  }
}
On.prototype.visible = !0;
class gS {
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
class fr extends On {
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
      return On.near(r);
    let i = e.resolve(n.map(this.anchor));
    return new fr(i.parent.inlineContent ? i : r, r);
  }
  replace(e, n = dt.empty) {
    if (super.replace(e, n), n == dt.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof fr && e.anchor == this.anchor && e.head == this.head;
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
    return new fr(e.resolve(n.anchor), e.resolve(n.head));
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
      let o = On.findFrom(n, r, !0) || On.findFrom(n, -r, !0);
      if (o)
        n = o.$head;
      else
        return On.near(n, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = n : (e = (On.findFrom(e, -r, !0) || On.findFrom(e, r, !0)).$anchor, e.pos < n.pos != i < 0 && (e = n))), new fr(e, n);
  }
}
On.jsonID("text", fr);
class ml {
  constructor(e, n) {
    this.anchor = e, this.head = n;
  }
  map(e) {
    return new ml(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return fr.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class En extends On {
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
    return r ? On.near(o) : new En(o);
  }
  content() {
    return new dt(Ne.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof En && e.anchor == this.anchor;
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
    return new En(e.resolve(n.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, n) {
    return new En(e.resolve(n));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
En.prototype.visible = !1;
On.jsonID("node", En);
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
    return r && En.isSelectable(r) ? new En(n) : On.near(n);
  }
}
class jr extends On {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, n = dt.empty) {
    if (n == dt.empty) {
      e.delete(0, e.doc.content.size);
      let r = On.atStart(e.doc);
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
    return mS;
  }
}
On.jsonID("all", jr);
const mS = {
  map() {
    return this;
  },
  resolve(t) {
    return new jr(t);
  }
};
function Ro(t, e, n, r, i, o = !1) {
  if (e.inlineContent)
    return fr.create(t, n);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let a = e.child(s);
    if (a.isAtom) {
      if (!o && En.isSelectable(a))
        return En.create(t, n - (i < 0 ? a.nodeSize : 0));
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
  if (!(i instanceof qn || i instanceof Gn))
    return;
  let o = t.mapping.maps[r], s;
  o.forEach((a, l, c, u) => {
    s == null && (s = u);
  }), t.setSelection(On.near(t.doc.resolve(s), n));
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
    return t.selection || On.atStart(e.doc);
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
const Zb = (t, e) => t.selection.empty ? !1 : (e && e(t.tr.deleteSelection().scrollIntoView()), !0);
function Qb(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("backward", t) : n.parentOffset > 0) ? null : n;
}
const ev = (t, e, n) => {
  let r = Qb(t, n);
  if (!r)
    return !1;
  let i = Jf(r);
  if (!i) {
    let s = r.blockRange(), a = s && jo(s);
    return a == null ? !1 : (e && e(t.tr.lift(s, a).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (cv(t, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Ho(o, "end") || En.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let a = gl(t.doc, r.before(s), r.after(s), dt.empty);
      if (a && a.slice.size < a.to - a.from) {
        if (e) {
          let l = t.tr.step(a);
          l.setSelection(Ho(o, "end") ? On.findFrom(l.doc.resolve(l.mapping.map(i.pos, -1)), -1) : En.create(l.doc, i.pos - o.nodeSize)), e(l.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, yS = (t, e, n) => {
  let r = Qb(t, n);
  if (!r)
    return !1;
  let i = Jf(r);
  return i ? tv(t, i, e) : !1;
}, bS = (t, e, n) => {
  let r = rv(t, n);
  if (!r)
    return !1;
  let i = Zf(r);
  return i ? tv(t, i, e) : !1;
};
function tv(t, e, n) {
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
  if (!c || c.from != o || c instanceof qn && c.slice.size >= l - o)
    return !1;
  if (n) {
    let u = t.tr.step(c);
    u.setSelection(fr.create(u.doc, o)), n(u.scrollIntoView());
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
const nv = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("backward", t) : r.parentOffset > 0)
      return !1;
    o = Jf(r);
  }
  let s = o && o.nodeBefore;
  return !s || !En.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(En.create(t.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
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
function rv(t, e) {
  let { $cursor: n } = t.selection;
  return !n || (e ? !e.endOfTextblock("forward", t) : n.parentOffset < n.parent.content.size) ? null : n;
}
const iv = (t, e, n) => {
  let r = rv(t, n);
  if (!r)
    return !1;
  let i = Zf(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (cv(t, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Ho(o, "start") || En.isSelectable(o))) {
    let s = gl(t.doc, r.before(), r.after(), dt.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let a = t.tr.step(s);
        a.setSelection(Ho(o, "start") ? On.findFrom(a.doc.resolve(a.mapping.map(i.pos)), 1) : En.create(a.doc, a.mapping.map(i.pos))), e(a.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(t.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, ov = (t, e, n) => {
  let { $head: r, empty: i } = t.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (n ? !n.endOfTextblock("forward", t) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Zf(r);
  }
  let s = o && o.nodeAfter;
  return !s || !En.isSelectable(s) ? !1 : (e && e(t.tr.setSelection(En.create(t.doc, o.pos)).scrollIntoView()), !0);
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
const vS = (t, e) => {
  let n = t.selection, r = n instanceof En, i;
  if (r) {
    if (n.node.isTextblock || !so(t.doc, n.from))
      return !1;
    i = n.from;
  } else if (i = pl(t.doc, n.from, -1), i == null)
    return !1;
  if (e) {
    let o = t.tr.join(i);
    r && o.setSelection(En.create(o.doc, i - t.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, wS = (t, e) => {
  let n = t.selection, r;
  if (n instanceof En) {
    if (n.node.isTextblock || !so(t.doc, n.to))
      return !1;
    r = n.to;
  } else if (r = pl(t.doc, n.to, 1), r == null)
    return !1;
  return e && e(t.tr.join(r).scrollIntoView()), !0;
}, xS = (t, e) => {
  let { $from: n, $to: r } = t.selection, i = n.blockRange(r), o = i && jo(i);
  return o == null ? !1 : (e && e(t.tr.lift(i, o).scrollIntoView()), !0);
}, sv = (t, e) => {
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
const kS = (t, e) => {
  let { $head: n, $anchor: r } = t.selection;
  if (!n.parent.type.spec.code || !n.sameParent(r))
    return !1;
  let i = n.node(-1), o = n.indexAfter(-1), s = Qf(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let a = n.after(), l = t.tr.replaceWith(a, a, s.createAndFill());
    l.setSelection(On.near(l.doc.resolve(a), 1)), e(l.scrollIntoView());
  }
  return !0;
}, av = (t, e) => {
  let n = t.selection, { $from: r, $to: i } = n;
  if (n instanceof jr || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Qf(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, a = t.tr.insert(s, o.createAndFill());
    a.setSelection(fr.create(a.doc, s + 1)), e(a.scrollIntoView());
  }
  return !0;
}, lv = (t, e) => {
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
function SS(t) {
  return (e, n) => {
    if (e.selection instanceof En && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !di(e.doc, h.pos) ? !1 : (n && n(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof fr || e.selection instanceof jr) && r.deleteSelection();
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
const CS = SS(), RS = (t, e) => {
  let { $from: n, to: r } = t.selection, i, o = n.sharedDepth(r);
  return o == 0 ? !1 : (i = n.before(o), e && e(t.tr.setSelection(En.create(t.doc, i))), !0);
};
function TS(t, e, n) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (n && n(t.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || so(t.doc, e.pos)) ? !1 : (n && n(t.tr.join(e.pos).scrollIntoView()), !0);
}
function cv(t, e, n, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, a, l = i.type.spec.isolating || o.type.spec.isolating;
  if (!l && TS(t, e, n))
    return !0;
  let c = !l && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (a = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && a.matchType(s[0] || o.type).validEnd) {
    if (n) {
      let h = e.pos + o.nodeSize, p = Ne.empty;
      for (let y = s.length - 1; y >= 0; y--)
        p = Ne.from(s[y].create(null, p));
      p = Ne.from(i.copy(p));
      let g = t.tr.step(new Gn(e.pos - 1, h, e.pos, h, new dt(p, 1, 0), s.length, !0)), m = g.doc.resolve(h + 2 * s.length);
      m.nodeAfter && m.nodeAfter.type == i.type && so(g.doc, m.pos) && g.join(m.pos), n(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && l ? null : On.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && jo(d);
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
        let y = Ne.empty;
        for (let T = p.length - 1; T >= 0; T--)
          y = Ne.from(p[T].copy(y));
        let b = t.tr.step(new Gn(e.pos - p.length, e.pos + o.nodeSize, e.pos + m, e.pos + o.nodeSize - m, new dt(y, p.length, 0), 0, !0));
        n(b.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function uv(t) {
  return function(e, n) {
    let r = e.selection, i = t < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (n && n(e.tr.setSelection(fr.create(e.doc, t < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const ES = uv(-1), MS = uv(1);
function IS(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, s = i.blockRange(o), a = s && jb(s, t, e);
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
eh(Zb, ev, nv);
eh(Zb, iv, ov);
eh(sv, av, lv, CS);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function AS(t, e = null) {
  return function(n, r) {
    let { $from: i, $to: o } = n.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let a = r ? n.tr : null;
    return _S(a, s, t, e) ? (r && r(a.scrollIntoView()), !0) : !1;
  };
}
function _S(t, e, n, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(n) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let l = s.resolve(e.start - 2);
    o = new Wa(l, l, e.depth), e.endIndex < e.parent.childCount && (e = new Wa(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let a = jb(o, n, r, e);
  return a ? (t && PS(t, e, a, i, n), !0) : !1;
}
function PS(t, e, n, r, i) {
  let o = Ne.empty;
  for (let u = n.length - 1; u >= 0; u--)
    o = Ne.from(n[u].type.create(n[u].attrs, o));
  t.step(new Gn(e.start - (r ? 2 : 0), e.end, e.start, e.end, new dt(o, 0, 0), n.length, !0));
  let s = 0;
  for (let u = 0; u < n.length; u++)
    n[u].type == i && (s = u + 1);
  let a = n.length - s, l = e.start + n.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && di(t.doc, l, a) && (t.split(l, a), l += 2 * a), l += c.child(u).nodeSize;
  return t;
}
function DS(t) {
  return function(e, n) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == t);
    return o ? n ? r.node(o.depth - 1).type == t ? NS(e, n, t, o) : OS(e, n, o) : !0 : !1;
  };
}
function NS(t, e, n, r) {
  let i = t.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Gn(o - 1, s, o, s, new dt(Ne.from(n.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Wa(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const a = jo(r);
  if (a == null)
    return !1;
  i.lift(r, a);
  let l = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return so(i.doc, l.pos) && l.nodeBefore.type == l.nodeAfter.type && i.join(l.pos), e(i.scrollIntoView()), !0;
}
function OS(t, e, n) {
  let r = t.tr, i = n.parent;
  for (let h = n.end, p = n.endIndex - 1, g = n.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(n.start), s = o.nodeAfter;
  if (r.mapping.map(n.end) != n.start + o.nodeAfter.nodeSize)
    return !1;
  let a = n.startIndex == 0, l = n.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (a ? 0 : 1), u + 1, s.content.append(l ? Ne.empty : Ne.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new Gn(d - (a ? 1 : 0), f + (l ? 1 : 0), d + 1, f - 1, new dt((a ? Ne.empty : Ne.from(i.copy(Ne.empty))).append(l ? Ne.empty : Ne.from(i.copy(Ne.empty))), a ? 0 : 1, l ? 0 : 1), a ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function zS(t) {
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
      let c = l.lastChild && l.lastChild.type == a.type, u = Ne.from(c ? t.create() : null), d = new dt(Ne.from(t.create(null, Ne.from(a.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
      n(e.tr.step(new Gn(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function dv(t) {
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
var LS = class fv {
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
    const e = fv.createFakeChain();
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
      state: dv({
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
const $S = () => ({ editor: t, view: e }) => (requestAnimationFrame(() => {
  if (!t.isDestroyed) {
    var n;
    e.dom.blur(), (n = window) === null || n === void 0 || (n = n.getSelection()) === null || n === void 0 || n.removeAllRanges();
  }
}), !0), FS = (t = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: t }), HS = () => ({ state: t, tr: e, dispatch: n }) => {
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
}, BS = (t) => (e) => t(e), qS = () => ({ state: t, dispatch: e }) => av(t, e), WS = (t, e) => ({ editor: n, tr: r }) => {
  const { state: i } = n, o = i.doc.slice(t.from, t.to);
  r.deleteRange(t.from, t.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Ar(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, jS = () => ({ tr: t, dispatch: e }) => {
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
function Qn(t, e) {
  if (typeof t == "string") {
    if (!e.nodes[t]) throw Error(`There is no node type named '${t}'. Maybe you forgot to add the extension?`);
    return e.nodes[t];
  }
  return t;
}
const KS = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const i = Qn(t, n.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const a = o.before(s), l = o.after(s);
      e.delete(a, l).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, US = (t) => ({ tr: e, dispatch: n }) => {
  const { from: r, to: i } = t;
  return n && e.delete(r, i), !0;
}, GS = (t) => t.content ? /^text(\*|\+)/.test(t.content) : !1, Ip = (t, e, n) => {
  if (!t.parent.isInline || n === "left" && t.pos > t.start() || n === "right" && t.pos < t.end()) return t.pos;
  const r = e.nodes[t.parent.type.name].spec;
  return GS(r) ? n === "left" ? t.start() - 1 : t.end() + 1 : t.pos;
}, YS = (t, e, n) => ({
  from: Ip(t, n, "left"),
  to: Ip(e, n, "right")
}), XS = () => ({ state: t, dispatch: e }) => {
  if (t.selection.empty) return !1;
  if (e) {
    const n = t.tr, { ranges: r } = t.selection, i = n.steps.length;
    r.forEach((o) => {
      const s = n.mapping.slice(i), a = n.doc.resolve(s.map(o.$from.pos)), l = n.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = YS(a, l, t.schema);
      n.deleteRange(c, u);
    }), n.selection.empty || n.setSelection(Ar.near(n.doc.resolve(n.selection.from))), n.scrollIntoView(), e(n);
  }
  return !0;
}, VS = () => ({ commands: t }) => t.keyboardShortcut("Enter"), JS = () => ({ state: t, dispatch: e }) => kS(t, e);
function ZS(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function Ga(t, e, n = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => n.strict ? e[i] === t[i] : ZS(e[i]) ? e[i].test(t[i]) : e[i] === t[i]) : !0;
}
function hv(t, e, n = {}) {
  return t.find((r) => r.type === e && Ga(Object.fromEntries(Object.keys(n).map((i) => [i, r.attrs[i]])), n));
}
function Ap(t, e, n = {}) {
  return !!hv(t, e, n);
}
function pv(t, e, n) {
  if (!t || !e) return;
  let r = t.parent.childAfter(t.parentOffset);
  if ((!r.node || !r.node.marks.some((l) => l.type === e)) && (r = t.parent.childBefore(t.parentOffset)), !r.node || !r.node.marks.some((l) => l.type === e)) return;
  if (!n) {
    const l = r.node.marks.find((c) => c.type === e);
    l && (n = l.attrs);
  }
  if (!hv([...r.node.marks], e, n)) return;
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
const QS = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  const o = Di(t, r.schema), { doc: s, selection: a } = n, { $from: l, from: c, to: u } = a;
  if (i) {
    const d = pv(l, o, e);
    if (d && d.from <= c && d.to >= u) {
      const f = Ar.create(s, d.from, d.to);
      n.setSelection(f);
    }
  }
  return !0;
}, eC = (t) => (e) => {
  const n = typeof t == "function" ? t(e) : t;
  for (let r = 0; r < n.length; r += 1) if (n[r](e)) return !0;
  return !1;
};
function gv(t) {
  return t instanceof Ar;
}
function Xi(t = 0, e = 0, n = 0) {
  return Math.min(Math.max(t, e), n);
}
function tC(t, e = null) {
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
function nC() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const rC = (t = null, e = {}) => ({ editor: n, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Ya() || _p()) && r.dom.focus(), nC() && !Ya() && !_p() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      n.isDestroyed || (r.focus(), e != null && e.scrollIntoView && n.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && t === null || t === !1) return !0;
  } catch {
    return !1;
  }
  if (o && t === null && !gv(n.state.selection))
    return s(), !0;
  const a = tC(i.doc, t) || n.state.selection, l = n.state.selection.eq(a);
  return o && (l || i.setSelection(a), l && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, iC = (t, e) => (n) => t.every((r, i) => e(r, {
  ...n,
  index: i
})), oC = (t, e) => ({ tr: n, commands: r }) => r.insertContentAt({
  from: n.selection.from,
  to: n.selection.to
}, t, e), mv = (t) => {
  const e = t.childNodes;
  for (let n = e.length - 1; n >= 0; n -= 1) {
    const r = e[n];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? t.removeChild(r) : r.nodeType === 1 && mv(r);
  }
  return t;
};
function ma(t) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${t}</body>`, n = new window.DOMParser().parseFromString(e, "text/html").body;
  return mv(n);
}
function yv(t) {
  return typeof (t == null ? void 0 : t.nodesBetween) == "function";
}
function Bo(t, e, n) {
  if (yv(t)) return t;
  const r = typeof t == "object" && t !== null;
  n = {
    slice: !0,
    parseOptions: {},
    ...n
  };
  const i = typeof t == "string";
  if (r) try {
    if (Array.isArray(t) && t.length > 0) return Ne.fromArray(t.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(t);
    return n.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (n.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", t, "Error:", o), Bo("", e, n);
  }
  if (i) {
    if (n.errorOnInvalidContent) {
      let s = !1, a = "";
      const l = new Hk({
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
function bv(t) {
  return !("type" in t);
}
function vv(t, e, n) {
  const r = t.steps.length - 1;
  if (r < e) return;
  const i = t.steps[r];
  if (!(i instanceof qn || i instanceof Gn)) return;
  const o = t.mapping.maps[r];
  let s = 0;
  o.forEach((a, l, c, u) => {
    s === 0 && (s = u);
  }), t.setSelection(No.near(t.doc.resolve(s), n));
}
const sC = (t, e, n) => ({ tr: r, dispatch: i, editor: o }) => {
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
    const p = bv(a) ? a.content : [a];
    if (p.forEach((m) => {
      m.check(), f = f ? m.isText && m.marks.length === 0 : !1, h = h ? m.isBlock : !1;
    }), u === d && h) {
      const { parent: m } = r.doc.resolve(u);
      m.isTextblock && !m.type.spec.code && !m.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((m) => m.text || "").join("") : yv(e) ? g = p.map((m) => {
        var y;
        return (y = m.text) !== null && y !== void 0 ? y : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = Ne.from(p);
      const m = r.doc.resolve(u), y = m.node(), b = m.parentOffset === 0, T = y.isText || y.isTextblock, A = y.content.size > 0;
      b && T && A && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
    }
    n.updateSelection && vv(r, r.steps.length - 1, -1), n.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), n.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function wv(t) {
  for (let e = 0; e < t.edgeCount; e += 1) {
    const { type: n } = t.edge(e);
    if (n.isTextblock && !n.hasRequiredAttrs()) return n;
  }
  return null;
}
const aC = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: a = !0 } = t;
  let l;
  typeof i == "number" ? l = e.doc.resolve(i) : i ? l = i : l = e.selection.$from;
  const c = wv(l.parent.contentMatchAt(l.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let f;
  if (s) {
    const h = Bo(s, r.schema);
    f = c.createAndFill(d, h);
  } else f = c.createAndFill(d);
  return f ? (n && (e.insert(l.pos, f), a && vv(e, e.steps.length - 1, -1)), !0) : !1;
}, lC = () => ({ state: t, dispatch: e }) => vS(t, e), cC = () => ({ state: t, dispatch: e }) => wS(t, e), uC = () => ({ state: t, dispatch: e }) => ev(t, e), dC = () => ({ state: t, dispatch: e }) => iv(t, e), fC = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = pl(t.doc, t.selection.$from.pos, -1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, hC = () => ({ state: t, dispatch: e, tr: n }) => {
  try {
    const r = pl(t.doc, t.selection.$from.pos, 1);
    return r == null ? !1 : (n.join(r, 2), e && e(n), !0);
  } catch {
    return !1;
  }
}, pC = () => ({ state: t, dispatch: e }) => yS(t, e), gC = () => ({ state: t, dispatch: e }) => bS(t, e);
function xv() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function mC(t) {
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
      Ya() || xv() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${l}`);
  }
  return r && (n = `Alt-${n}`), i && (n = `Ctrl-${n}`), s && (n = `Meta-${n}`), o && (n = `Shift-${n}`), n;
}
const yC = (t) => ({ editor: e, view: n, tr: r, dispatch: i }) => {
  const o = mC(t).split(/-(?!$)/), s = o.find((c) => ![
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
  const { from: r, to: i, empty: o } = t.selection, s = e ? Qn(e, t.schema) : null, a = [];
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
const bC = (t, e = {}) => ({ state: n, dispatch: r }) => th(n, Qn(t, n.schema), e) ? xS(n, r) : !1, vC = () => ({ state: t, dispatch: e }) => lv(t, e), wC = (t) => ({ state: e, dispatch: n }) => {
  const r = Qn(t, e.schema);
  return DS(r)(e, n);
}, xC = () => ({ state: t, dispatch: e }) => sv(t, e);
function kv(t, e) {
  return e.nodes[t] ? "node" : e.marks[t] ? "mark" : null;
}
function Pp(t, e) {
  const n = typeof e == "string" ? [e] : e;
  return Object.keys(t).reduce((r, i) => (n.includes(i) || (r[i] = t[i]), r), {});
}
const kC = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, s = null;
  const a = kv(typeof t == "string" ? t : t.name, r.schema);
  if (!a) return !1;
  a === "node" && (o = Qn(t, r.schema)), a === "mark" && (s = Di(t, r.schema));
  let l = !1;
  return n.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      o && o === u.type && (l = !0, i && n.setNodeMarkup(d, void 0, Pp(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (l = !0, i && n.addMark(d, d + u.nodeSize, s.create(Pp(f.attrs, e))));
      });
    });
  }), l;
}, SC = () => ({ tr: t, dispatch: e }) => (e && t.scrollIntoView(), !0), CC = () => ({ tr: t, dispatch: e }) => {
  if (e) {
    const n = new sx(t.doc);
    t.setSelection(n);
  }
  return !0;
}, RC = () => ({ state: t, dispatch: e }) => nv(t, e), TC = () => ({ state: t, dispatch: e }) => ov(t, e), EC = () => ({ state: t, dispatch: e }) => RS(t, e), MC = () => ({ state: t, dispatch: e }) => MS(t, e), IC = () => ({ state: t, dispatch: e }) => ES(t, e);
function AC(t, e, n = {}, r = {}) {
  return Bo(t, e, {
    slice: !1,
    parseOptions: n,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const _C = (t, { errorOnInvalidContent: e, emitUpdate: n = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: a }) => {
  const { doc: l } = o;
  if (r.preserveWhitespace !== "full") {
    const c = AC(t, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = bv(c) ? c.content : [c];
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
function PC(t, e) {
  const n = Di(e, t.schema), { from: r, to: i, empty: o } = t.selection, s = [];
  o ? (t.storedMarks && s.push(...t.storedMarks), s.push(...t.selection.$head.marks())) : t.doc.nodesBetween(r, i, (l) => {
    s.push(...l.marks);
  });
  const a = s.find((l) => l.type.name === n.name);
  return a ? { ...a.attrs } : {};
}
function DC(t, e) {
  const n = new pS(t);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      n.step(i);
    });
  }), n;
}
function NC(t, e) {
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
  return (e) => NC(e.$from, t);
}
function Ps(t, e, n) {
  return t.config[e] === void 0 && t.parent ? Ps(t.parent, e, n) : typeof t.config[e] == "function" ? t.config[e].bind({
    ...n,
    parent: t.parent ? Ps(t.parent, e, n) : null
  }) : t.config[e];
}
function OC(t) {
  return typeof t == "function";
}
function wf(t, e = void 0, ...n) {
  return OC(t) ? e ? t.bind(e)(...n) : t(...n) : t;
}
function Sv(t) {
  return {
    baseExtensions: t.filter((e) => e.type === "extension"),
    nodeExtensions: t.filter((e) => e.type === "node"),
    markExtensions: t.filter((e) => e.type === "mark")
  };
}
function zC(t, e, n) {
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
function LC(t) {
  return Object.fromEntries(Object.entries(t.nodes).filter(([, e]) => e.spec.toText).map(([e, n]) => [e, n.spec.toText]));
}
function $C(t, e = JSON.stringify) {
  const n = {};
  return t.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(n, i) ? !1 : n[i] = !0;
  });
}
function FC(t) {
  const e = $C(t);
  return e.length === 1 ? e : e.filter((n, r) => !e.filter((i, o) => o !== r).some((i) => n.oldRange.from >= i.oldRange.from && n.oldRange.to <= i.oldRange.to && n.newRange.from >= i.newRange.from && n.newRange.to <= i.newRange.to));
}
function HC(t) {
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
  }), FC(r);
}
function Da(t, e, n) {
  return Object.fromEntries(Object.entries(n).filter(([r]) => {
    const i = t.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function BC(t, e, n = {}) {
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
  const { nodeExtensions: n } = Sv(e), r = n.find((o) => o.name === t);
  if (!r) return !1;
  const i = wf(Ps(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Cv(t, { checkChildren: e = !0, ignoreWhitespace: n = !1 } = {}) {
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
      i !== !1 && (Cv(o, {
        ignoreWhitespace: n,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function qC(t, e, n) {
  const { selection: r } = e;
  let i = null;
  if (gv(r) && (i = r.$cursor), i) {
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
const WC = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = n, { empty: s, ranges: a } = o, l = Di(t, r.schema);
  if (i)
    if (s) {
      const c = PC(r, l);
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
  return qC(r, n, l);
}, jC = (t, e) => ({ tr: n }) => (n.setMeta(t, e), !0), KC = (t, e = {}) => ({ state: n, dispatch: r, chain: i }) => {
  const o = Qn(t, n.schema);
  let s;
  return n.selection.$anchor.sameParent(n.selection.$head) && (s = n.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: a }) => Mp(o, {
    ...s,
    ...e
  })(n) ? !0 : a.clearNodes()).command(({ state: a }) => Mp(o, {
    ...s,
    ...e
  })(a, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, UC = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, i = Xi(t, 0, r.content.size), o = $o.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, GC = (t, e) => ({ tr: n, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, a;
  return typeof e == "number" ? (s = e, a = e) : e && "from" in e && "to" in e ? (s = e.from, a = e.to) : (s = o.from, a = o.to), i && n.doc.nodesBetween(s, a, (l, c) => {
    l.isText || n.setNodeMarkup(c, void 0, {
      ...l.attrs,
      dir: t
    });
  }), !0;
}, YC = (t) => ({ tr: e, dispatch: n }) => {
  if (n) {
    const { doc: r } = e, { from: i, to: o } = typeof t == "number" ? {
      from: t,
      to: t
    } : t, s = Ar.atStart(r).from, a = Ar.atEnd(r).to, l = Xi(i, s, a), c = Xi(o, s, a), u = Ar.create(r, l, c);
    e.setSelection(u);
  }
  return !0;
}, XC = (t) => ({ state: e, dispatch: n }) => {
  const r = Qn(t, e.schema);
  return zS(r)(e, n);
};
function Dp(t, e) {
  const n = t.storedMarks || t.selection.$to.parentOffset && t.selection.$from.marks();
  if (n) {
    const r = n.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    t.tr.ensureMarks(r);
  }
}
const VC = ({ keepMarks: t = !0 } = {}) => ({ tr: e, state: n, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: a, $to: l } = o, c = i.extensionManager.attributes, u = Da(c, a.node().type.name, a.node().attrs);
  if (o instanceof $o && o.node.isBlock)
    return !a.parentOffset || !di(s, a.pos) ? !1 : (r && (t && Dp(n, i.extensionManager.splittableMarks), e.split(a.pos).scrollIntoView()), !0);
  if (!a.parent.isBlock) return !1;
  const d = l.parentOffset === l.parent.content.size, f = a.depth === 0 ? void 0 : wv(a.node(-1).contentMatchAt(a.indexAfter(-1)));
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
}, JC = (t, e = {}) => ({ tr: n, state: r, dispatch: i, editor: o }) => {
  const s = Qn(t, r.schema), { $from: a, $to: l } = r.selection, c = r.selection.node;
  if (c && c.isBlock || a.depth < 2 || !a.sameParent(l)) return !1;
  const u = a.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== s || a.index(-2) !== a.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let y = Ne.empty;
      const b = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let P = a.depth - b; P >= a.depth - 3; P -= 1) y = Ne.from(a.node(P).copy(y));
      const T = a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3, A = {
        ...Da(d, a.node().type.name, a.node().attrs),
        ...e
      }, v = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(A)) || void 0;
      y = y.append(Ne.from(s.createAndFill(null, v) || void 0));
      const M = a.before(a.depth - (b - 1));
      n.replace(M, a.after(-T), new dt(y, 4 - b, 0));
      let O = -1;
      n.doc.nodesBetween(M, n.doc.content.size, (P, k) => {
        if (O > -1) return !1;
        P.isTextblock && P.content.size === 0 && (O = k + 1);
      }), O > -1 && n.setSelection(Ar.near(n.doc.resolve(O))), n.scrollIntoView();
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
    const v = A.filter((M) => T.includes(M.type.name));
    n.ensureMarks(v);
  }
  return !0;
};
function Np(t) {
  return !t || t === "1" ? null : t;
}
function Rv(t, e) {
  return Np(t) === Np(e);
}
const ec = (t, e) => {
  const n = nh((o) => o.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(Math.max(0, n.pos - 1)).before(n.depth);
  if (r === void 0) return !0;
  const i = t.doc.nodeAt(r);
  return !(n.node.type === (i == null ? void 0 : i.type) && so(t.doc, n.pos)) || !Rv(n.node.attrs.type, i == null ? void 0 : i.attrs.type) || t.join(n.pos), !0;
}, tc = (t, e) => {
  const n = nh((o) => o.type === e)(t.selection);
  if (!n) return !0;
  const r = t.doc.resolve(n.start).after(n.depth);
  if (r === void 0) return !0;
  const i = t.doc.nodeAt(r);
  return !(n.node.type === (i == null ? void 0 : i.type) && so(t.doc, r)) || !Rv(n.node.attrs.type, i == null ? void 0 : i.attrs.type) || t.join(r), !0;
};
function ZC(t) {
  const e = t.doc, n = e.firstChild;
  if (!n) return null;
  const r = e.resolve(1), i = e.resolve(n.nodeSize - 1);
  return Ar.between(r, i);
}
const QC = (t, e, n, r = {}) => ({ editor: i, tr: o, state: s, dispatch: a, chain: l, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Qn(t, s.schema), p = Qn(e, s.schema), { selection: g, storedMarks: m } = s, { $from: y, $to: b } = g, T = y.blockRange(b), A = m || g.$to.parentOffset && g.$from.marks();
  if (!T) return !1;
  const v = nh((I) => Ql(I.type.name, d))(g), M = g.from === 0 && g.to === s.doc.content.size, O = s.doc.content.content, P = O.length === 1 ? O[0] : null, k = M && P && Ql(P.type.name, d) ? {
    node: P,
    pos: 0
  } : null, z = v ?? k, C = !!v && T.depth >= 1 && T.depth - v.depth <= 1, x = !!k;
  if ((C || x) && z) {
    if (z.node.type === h)
      return M && x ? l().command(({ tr: I, dispatch: R }) => {
        const S = ZC(I);
        return S ? (I.setSelection(S), R && R(I), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (Ql(z.node.type.name, d) && h.validContent(z.node.content)) return l().command(() => (o.setNodeMarkup(z.pos, h), !0)).command(() => ec(o, h)).command(() => tc(o, h)).run();
  }
  return !n || !A || !a ? l().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => ec(o, h)).command(() => tc(o, h)).run() : l().command(() => {
    const I = u().wrapInList(h, r), R = A.filter((S) => f.includes(S.type.name));
    return o.ensureMarks(R), I ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => ec(o, h)).command(() => tc(o, h)).run();
}, e2 = (t, e = {}, n = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = n, s = Di(t, r.schema);
  return BC(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, t2 = (t, e, n = {}) => ({ state: r, commands: i }) => {
  const o = Qn(t, r.schema), s = Qn(e, r.schema), a = th(r, o, n);
  let l;
  return r.selection.$anchor.sameParent(r.selection.$head) && (l = r.selection.$anchor.parent.attrs), a ? i.setNode(s, l) : i.setNode(o, {
    ...l,
    ...n
  });
}, n2 = (t, e = {}) => ({ state: n, commands: r }) => {
  const i = Qn(t, n.schema);
  return th(n, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, r2 = () => ({ state: t, dispatch: e }) => {
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
}, i2 = (t = {}) => ({ tr: e, dispatch: n, editor: r }) => {
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
}, o2 = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = n, a = Di(t, r.schema), { $from: l, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var d;
    let { from: f, to: h } = s;
    const p = pv(l, a, (d = l.marks().find((g) => g.type === a)) === null || d === void 0 ? void 0 : d.attrs);
    p && (f = p.from, h = p.to), n.removeMark(f, h, a);
  } else u.forEach((f) => {
    n.removeMark(f.$from.pos, f.$to.pos, a);
  });
  return n.removeStoredMark(a), !0;
}, s2 = (t) => ({ tr: e, state: n, dispatch: r }) => {
  const { selection: i } = n;
  let o, s;
  return typeof t == "number" ? (o = t, s = t) : t && "from" in t && "to" in t ? (o = t.from, s = t.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (a, l) => {
    if (a.isText) return;
    const c = { ...a.attrs };
    delete c.dir, e.setNodeMarkup(l, void 0, c);
  }), !0;
}, a2 = (t, e = {}) => ({ tr: n, state: r, dispatch: i }) => {
  let o = null, s = null;
  const a = kv(typeof t == "string" ? t : t.name, r.schema);
  if (!a) return !1;
  a === "node" && (o = Qn(t, r.schema)), a === "mark" && (s = Di(t, r.schema));
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
}, l2 = new Kr("__tiptap_decorations__"), c2 = (t) => ({ tr: e, dispatch: n }) => (n && e.setMeta(l2, {
  type: "force",
  name: t
}), !0), u2 = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = Qn(t, n.schema);
  return IS(i, e)(n, r);
}, d2 = (t, e = {}) => ({ state: n, dispatch: r }) => {
  const i = Qn(t, n.schema);
  return AS(i, e)(n, r);
};
var f2 = /* @__PURE__ */ Sk({
  blur: () => $S,
  clearContent: () => FS,
  clearNodes: () => HS,
  command: () => BS,
  createParagraphNear: () => qS,
  cut: () => WS,
  deleteCurrentNode: () => jS,
  deleteNode: () => KS,
  deleteRange: () => US,
  deleteSelection: () => XS,
  enter: () => VS,
  exitCode: () => JS,
  extendMarkRange: () => QS,
  first: () => eC,
  focus: () => rC,
  forEach: () => iC,
  insertContent: () => oC,
  insertContentAt: () => sC,
  insertDefaultBlock: () => aC,
  joinBackward: () => uC,
  joinDown: () => cC,
  joinForward: () => dC,
  joinItemBackward: () => fC,
  joinItemForward: () => hC,
  joinTextblockBackward: () => pC,
  joinTextblockForward: () => gC,
  joinUp: () => lC,
  keyboardShortcut: () => yC,
  lift: () => bC,
  liftEmptyBlock: () => vC,
  liftListItem: () => wC,
  newlineInCode: () => xC,
  resetAttributes: () => kC,
  scrollIntoView: () => SC,
  selectAll: () => CC,
  selectNodeBackward: () => RC,
  selectNodeForward: () => TC,
  selectParentNode: () => EC,
  selectTextblockEnd: () => MC,
  selectTextblockStart: () => IC,
  setContent: () => _C,
  setMark: () => WC,
  setMeta: () => jC,
  setNode: () => KC,
  setNodeSelection: () => UC,
  setTextDirection: () => GC,
  setTextSelection: () => YC,
  sinkListItem: () => XC,
  splitBlock: () => VC,
  splitListItem: () => JC,
  toggleList: () => QC,
  toggleMark: () => e2,
  toggleNode: () => t2,
  toggleWrap: () => n2,
  undoInputRule: () => r2,
  unsetAllMarks: () => i2,
  unsetMark: () => o2,
  unsetTextDirection: () => s2,
  updateAttributes: () => a2,
  updateDecorations: () => c2,
  wrapIn: () => u2,
  wrapInList: () => d2
});
typeof process < "u" && process.env.NODE_ENV;
function h2(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function ya(t) {
  return h2(t) !== "Object" ? !1 : t.constructor === Object && Object.getPrototypeOf(t) === Object.prototype;
}
function Tv(t, e) {
  const n = { ...t };
  return ya(t) && ya(e) && Object.keys(e).forEach((r) => {
    ya(e[r]) && ya(t[r]) ? n[r] = Tv(t[r], e[r]) : n[r] = e[r];
  }), n;
}
var Ev = class {
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
      addOptions: () => Tv(this.options, t)
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
}, p2 = class Mv extends Ev {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Mv(n);
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
}, _r = class Iv extends Ev {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const n = typeof e == "function" ? e() : e;
    return new Iv(n);
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
        const { editor: t } = this, { state: e, schema: n } = t, { doc: r, selection: i } = e, o = LC(n), { blockSeparator: s } = this.options, a = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((l, c) => l.$from.pos - c.$from.pos).map(({ $from: l, $to: c }) => zC(r, {
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
    return { ...f2 };
  }
});
_r.create({
  name: "delete",
  onUpdate({ transaction: t, appendedTransactions: e }) {
    var n, r;
    const i = () => {
      var o, s, a;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (a = s.filterTransaction) === null || a === void 0 ? void 0 : a.call(s, t)) !== null && o !== void 0 ? o : t.getMeta("y-sync$")) return;
      const l = DC(t.before, [t, ...e]);
      HC(l).forEach((u) => {
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
const g2 = new Kr("focusEvents");
_r.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: t } = this;
    return [new pi({
      key: g2,
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
    return Ya() || xv() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new pi({
      key: new Kr("clearDocument"),
      appendTransaction: (t, e, n) => {
        if (t.some((h) => h.getMeta("composition"))) return;
        const r = t.some((h) => h.docChanged) && !e.doc.eq(n.doc), i = t.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: a } = e.selection, l = No.atStart(e.doc).from, c = No.atEnd(e.doc).to;
        if (o || !(s === l && a === c) || !Cv(n.doc)) return;
        const u = n.tr, d = dv({
          state: n,
          transaction: u
        }), { commands: f } = new LS({
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
    const { nodeExtensions: t } = Sv(this.extensions);
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
const m2 = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), y2 = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), b2 = /^(https?:\/\/|mailto:)/i;
function v2(t) {
  if (!t) return "";
  const e = [];
  for (const n of t.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const i = n.slice(0, r).trim().toLowerCase(), o = n.slice(r + 1).trim();
    y2.has(i) && o && e.push(`${i}: ${o}`);
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
  if (!m2.has(n)) return r();
  if (n === "a") {
    const a = e.getAttribute("href") || "";
    if (!b2.test(a)) return r();
  }
  const i = document.createElement(n), o = e.getAttribute("style"), s = v2(o || "");
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
function Av(t) {
  return t.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function w2(t) {
  const e = Av(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  n.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(n.content.childNodes)) r.appendChild(xf(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function y3(t) {
  const e = Av(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  return n.innerHTML = e, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function b3(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function x2(t) {
  return t.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Op(t) {
  return t.replace(/\{\{([^{}]+)\}\}/g, (e, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const k2 = { text: "#52525b" }, S2 = ({ node: t, selected: e, extension: n, editor: r, view: i, getPos: o }) => {
  var f;
  const s = t.attrs.field ?? "", a = n.options, l = ((f = a.resolve) == null ? void 0 : f.call(a, s)) ?? null, c = (l == null ? void 0 : l.color) ?? k2, u = (l == null ? void 0 : l.label) ?? `{{${s}}}`, d = l == null ? void 0 : l.nested;
  return /* @__PURE__ */ _(
    rx,
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
}, C2 = yx.extend({
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
    return nx(S2);
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
    return ["span", tx({ "data-type": "token" }, e), `{{${t.attrs.field ?? ""}}}`];
  },
  renderText({ node: t }) {
    return `{{${t.attrs.field ?? ""}}}`;
  }
}), R2 = 240, T2 = 280, E2 = ({ props: t, onApi: e }) => {
  const n = ul(), r = Q(e);
  r.current = e, Ge(() => {
    r.current(n);
  }, [n]);
  const i = Q(null);
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
      style: { width: T2, maxHeight: R2 },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ _("div", { ref: i, children: t.items.map((s) => /* @__PURE__ */ _(
        M2,
        {
          item: s,
          d: o,
          command: () => t.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, M2 = ({ item: t, d: e, command: n }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = mb({
    label: () => t.label,
    activate: n
  }), s = yn(), a = { padding: `${Me(8, 12, s)}px ${Me(12, 16, s)}px`, fontSize: Me(12, 14, s) };
  return /* @__PURE__ */ ge(
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
      /* @__PURE__ */ _(E2, { props: r, onApi: (i) => {
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
      const o = bx(i);
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
}, I2 = p2.create({
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
}), Na = new Kr("retainedSelectionHighlight"), A2 = _r.create({
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
              decorations: s ? sa.empty : sa.create(t.doc, [ax.inline(i, o, { class: "rt-retained-selection" })])
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
function _v(t, e) {
  const n = t.state.doc.resolve(e).nodeBefore;
  return n && n.type.name === "token" ? n.attrs.field ?? "" : null;
}
function _2(t) {
  const e = t.state.selection.$from, n = e.nodeBefore;
  if (!(n != null && n.isText)) return null;
  const r = n.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = _v(t, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const P2 = Mt.forwardRef(({
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
  const f = Q(s);
  f.current = s;
  const h = Q(a);
  h.current = a;
  const p = Q(l);
  p.current = l;
  const g = Q(c);
  g.current = c;
  const m = Q(u);
  m.current = u;
  const y = Q(null), b = Q(null), T = Q(e);
  T.current = e;
  const A = Q(r);
  A.current = r;
  const v = Q(o);
  v.current = o;
  const M = Q(null), O = (x) => {
    var U;
    const I = x.getAttributes("textStyle"), R = x.getAttributes("reportTextStyle"), { from: S, to: D, empty: $ } = x.state.selection;
    let B = !1, Z = !1, L = !1;
    if (!$) {
      const K = /* @__PURE__ */ new Set(), V = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
      x.state.doc.nodesBetween(S, D, (G) => {
        if (!G.isText) return;
        const ne = G.marks.find((Y) => Y.type.name === "textStyle");
        K.add((ne == null ? void 0 : ne.attrs.fontFamily) || ""), V.add((ne == null ? void 0 : ne.attrs.fontSize) || "");
        const te = G.marks.find((Y) => Y.type.name === "reportTextStyle");
        q.add((te == null ? void 0 : te.attrs.styleId) || "");
      }), B = K.size > 1, Z = V.size > 1, L = q.size > 1;
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
      textStyle: R.styleId || "",
      hasSelection: !$,
      fontFamilyMixed: B,
      fontSizeMixed: Z,
      textStyleMixed: L
    }, J = M.current;
    J && J.bold === N.bold && J.italic === N.italic && J.underline === N.underline && J.strike === N.strike && J.link === N.link && J.color === N.color && J.fontFamily === N.fontFamily && J.fontSize === N.fontSize && J.textStyle === N.textStyle && J.hasSelection === N.hasSelection && J.fontFamilyMixed === N.fontFamilyMixed && J.fontSizeMixed === N.fontSizeMixed && J.textStyleMixed === N.textStyleMixed || (M.current = N, (U = v.current) == null || U.call(v, N));
  }, P = (x) => {
    var $;
    const I = x.state.selection;
    let R = null;
    I instanceof $o && I.node.type.name === "token" ? (R = { key: I.node.attrs.field ?? "", pos: I.from }, y.current = I.from) : y.current != null && (y.current = x.state.tr.mapping.map(y.current));
    const S = b.current, D = S && R && S.key === R.key && S.pos === R.pos;
    !S && !R || D || (b.current = R, ($ = m.current) == null || $.call(m, R));
  }, k = (x) => {
    const I = w2(x2(x));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(I) ? "" : I;
  }, z = Mt.useMemo(() => {
    const x = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: S }) => {
        var D;
        return ((D = h.current) == null ? void 0 : D.call(h, S)) ?? [];
      },
      command: ({ editor: S, range: D, props: $ }) => {
        S.chain().focus().insertContentAt(D, { type: "token", attrs: { field: $.field } }).run();
      },
      render: zp
    }, I = C2.configure({
      resolve: f.current ?? null,
      suggestion: x,
      onTokenClick: (S, D, $) => {
        var B;
        y.current = $, (B = g.current) == null || B.call(g, S, D, $);
      }
    }), R = _r.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          mx({
            pluginKey: new Kr("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: S, range: D }) => _v(S, D.from) != null,
            items: ({ editor: S, query: D }) => {
              var B;
              const $ = _2(S);
              return $ ? ((B = p.current) == null ? void 0 : B.call(p, $.chipKey, D)) ?? [] : [];
            },
            command: ({ editor: S, range: D, props: $ }) => {
              S.chain().focus().insertContentAt(D, { type: "token", attrs: { field: $.field } }).run();
            },
            render: zp
          })
        ];
      }
    });
    return [I, R];
  }, []), C = ix({
    immediatelyRender: !1,
    extensions: [
      lx,
      cx.configure({ placeholder: n }),
      ux,
      dx,
      fx,
      I2,
      A2,
      hx,
      gx,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      px.configure({
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
      T.current(k(x.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: x }) => {
      O(x), P(x);
    }
  });
  return Ge(() => {
    if (!C || C.isFocused) return;
    k(C.getHTML()) !== t && (M.current = null, C.commands.setContent(Op(t || ""), { emitUpdate: !1 }), O(C));
  }, [t, C]), Ge(() => {
    C && C.setEditable(!r);
  }, [r, C]), Ge(() => {
    C && (M.current = null, O(C), P(C));
  }, [C]), qy(d, () => ({
    exec: (x, I, R) => {
      if (!C || A.current) return;
      const S = C.chain(), D = (R == null ? void 0 : R.focus) === !1 ? S : S.focus();
      switch (x) {
        case "bold":
          D.toggleBold().run();
          break;
        case "italic":
          D.toggleItalic().run();
          break;
        case "underline":
          D.toggleUnderline().run();
          break;
        case "strikeThrough":
          D.toggleStrike().run();
          break;
        case "foreColor":
          I && D.setColor(I).run();
          break;
        case "unsetColor":
          D.unsetColor().run();
          break;
        case "fontFamily":
          I && D.setFontFamily(I).run();
          break;
        case "unsetFontFamily":
          D.unsetFontFamily().run();
          break;
        case "fontSize":
          I && D.setFontSize(I).run();
          break;
        case "unsetFontSize":
          D.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          I && D.setMark("reportTextStyle", { styleId: I }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          D.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          D.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          I && D.extendMarkRange("link").setLink({ href: I }).run();
          break;
        case "unlink":
          D.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (x) => C == null ? void 0 : C.commands.focus(x),
    insertToken: (x) => {
      !C || A.current || C.chain().focus().insertContent({ type: "token", attrs: { field: x } }).run();
    },
    replaceToken: (x) => {
      if (!C || A.current) return;
      const I = y.current;
      I != null && C.commands.command(({ tr: R }) => {
        const S = R.doc.nodeAt(I);
        if (!S || S.type.name !== "token") return !1;
        R.setNodeMarkup(I, void 0, { field: x });
        const D = R.doc.resolve(I);
        return D.nodeAfter && D.nodeAfter.type.name === "token" && R.setSelection(new $o(D)), !0;
      });
    },
    holdSelectionHighlight: (x) => {
      !C || C.isDestroyed || C.view.dispatch(C.state.tr.setMeta(Na, { held: x }));
    }
  }), [C]), /* @__PURE__ */ _(ox, { editor: C, className: `richtext-editor ${i || ""}` });
});
P2.displayName = "RichTextEditor";
const D2 = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], N2 = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Lp = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ _("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ _("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), O2 = ({ value: t, disabled: e, onChange: n, mixed: r }) => {
  const [i, o] = Ye(!1);
  return /* @__PURE__ */ _(
    dl,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ ge("button", { type: "button", disabled: e, className: `${wk} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ _("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ _("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ _(ci, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: D2.map((s) => /* @__PURE__ */ _(Kx, { onClick: () => {
        n(s), o(!1);
      }, icon: !r && s === t ? /* @__PURE__ */ _(zs, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ _("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, z2 = ({ editorRef: t, disabled: e, active: n }) => {
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
        dr,
        {
          theme: "dark",
          active: n,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ _(Kw, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ ge("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: bk + " w-full"
          }
        ),
        /* @__PURE__ */ ge("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ _(dr, { theme: "dark", onClick: l, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ _(
            dr,
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
  }, f = fl(), h = (m) => !!(r != null && r[m]), p = "flex items-center gap-1 shrink-0", g = l ? /* @__PURE__ */ _("div", { className: xb }) : null;
  return /* @__PURE__ */ ge("div", { className: `flex flex-wrap items-center ${l ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ ge("div", { className: p, children: [
      /* @__PURE__ */ _(Co, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ _(dr, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (m) => m.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ _(Co, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ _(dr, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (m) => m.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ _(Co, { content: "Underline", children: /* @__PURE__ */ _(dr, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: e, onMouseDown: (m) => m.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ _(qw, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ _(Co, { content: "Strikethrough", children: /* @__PURE__ */ _(dr, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: e, onMouseDown: (m) => m.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ _(Ww, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ _("div", { className: p, children: /* @__PURE__ */ _(z2, { editorRef: t, disabled: e, active: (n == null ? void 0 : n.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ _("div", { className: p, children: /* @__PURE__ */ _(
      dl,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ ge(dr, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ _("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ _(Lp, {}),
          /* @__PURE__ */ _(ci, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ ge("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
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
          N2.map((m) => /* @__PURE__ */ _(
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
    (o || s || a) && /* @__PURE__ */ ge(Ln, { children: [
      g,
      /* @__PURE__ */ ge("div", { className: p, children: [
        o && /* @__PURE__ */ _(O2, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        a && /* @__PURE__ */ _(Co, { content: "Clear formatting", children: /* @__PURE__ */ _(
          dr,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (m) => m.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ _(jw, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ ge(Ln, { children: [
      g,
      /* @__PURE__ */ _("div", { className: p, children: i })
    ] })
  ] });
};
function rh(t, e, n) {
  return Math.max(e, Math.min(n, t));
}
function L2(t, e, n, r, i) {
  return rh(t + e * i, n, r);
}
const $2 = 2;
function F2(t, e, n, r, i) {
  return rh(t + Math.trunc(e / $2) * i, n, r);
}
const H2 = 3;
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
  const [h, p] = Ye(null), [g, m] = Ye(!1), y = Q(!1), b = Q(null), T = Q(null), A = Q(null), v = yn(), M = vb(), O = c === void 0;
  Ge(() => () => {
    var D;
    return (D = b.current) == null ? void 0 : D.call(b);
  }, []), $n(() => {
    const D = A.current, $ = T.current;
    !O && D && $ && ($.style.color = getComputedStyle(D).color);
  }, [O, c]), Ge(() => {
    y.current || p(null);
  }, [t]);
  const P = t ?? r, k = h !== null ? h : t != null ? String(t) : d ? "" : String(r), z = (D) => rh(D, e, n), C = (D) => {
    const $ = L2(P, D, e, n, o);
    $ !== P && (y.current && p(String($)), i($));
  }, x = (D) => {
    if (a || s || D.pointerType !== "mouse" || D.button !== 0) return;
    const $ = D.currentTarget, B = D.clientY, Z = P;
    let L = Z, N = !1;
    const J = (K) => {
      const V = B - K.clientY;
      if (!N) {
        if (Math.abs(V) < H2) return;
        N = !0, $.blur(), $.style.userSelect = "none";
      }
      const q = F2(Z, V, e, n, o);
      q !== L && (L = q, i(q));
    }, U = () => {
      b.current = null, window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", U), $.style.userSelect = "", N && $.blur();
    };
    b.current = U, window.addEventListener("pointermove", J), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", U);
  }, I = (D) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": D === 1 ? "Increase" : "Decrease",
    disabled: !!a || !!s || (D === 1 ? P >= n : P <= e),
    onPointerDown: ($) => $.preventDefault(),
    onClick: () => C(D)
  }), R = O ? Me(22, 30, v) : Me(16, 22, v), S = O ? Me(14, 18, v) : Me(11, 15, v);
  return /* @__PURE__ */ ge(
    "span",
    {
      ref: T,
      className: `ui-number ${O ? "ui-number-box" : ""}`,
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
            value: k,
            readOnly: s,
            disabled: a,
            className: c ?? "ui-input w-20",
            style: {
              ...O ? { ...M, minHeight: Me(28, 36, v) } : {},
              paddingRight: R + 2,
              cursor: a || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              y.current = !0, m(!0);
            },
            onChange: (D) => {
              const $ = D.target.value;
              p($);
              const B = parseInt($, 10);
              $ !== "" && !Number.isNaN(B) && i(z(B));
            },
            onBlur: () => {
              if (y.current = !1, m(!1), h === null) return;
              const D = parseInt(h, 10);
              Number.isNaN(D) || i(z(D)), p(null);
            },
            onKeyDown: (D) => {
              D.key === "Enter" && D.target.blur(), D.key === "Escape" && (p(null), D.target.blur()), !s && !a && (D.key === "ArrowUp" || D.key === "ArrowDown") && (D.preventDefault(), C(D.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: x
          }
        ),
        /* @__PURE__ */ ge("span", { className: "ui-number-steppers", style: { width: R }, children: [
          /* @__PURE__ */ _("button", { ...I(1), className: "ui-number-step", children: /* @__PURE__ */ _(Uw, { style: { width: S, height: S } }) }),
          /* @__PURE__ */ _("button", { ...I(-1), className: "ui-number-step", children: /* @__PURE__ */ _(ci, { style: { width: S, height: S } }) })
        ] })
      ]
    }
  );
}
function k3({ title: t, icon: e, count: n, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: a, className: l = "", dataProps: c, children: u }) {
  const d = yn(), f = _i({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = Me(14, 16, d), p = { width: h, height: h }, g = Me(10, 12, d);
  return /* @__PURE__ */ ge("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${l}`, children: [
    /* @__PURE__ */ ge("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ ge(
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
  const d = Q(null), f = Q(null), [h, p] = Ye(null), g = (M) => {
    d.current = M, typeof o == "function" ? o(M) : o && (o.current = M);
  };
  $n(() => {
    if (t) return;
    const M = d.current;
    if (!M || (f.current = M.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const O = new ResizeObserver(() => {
      f.current = M.getBoundingClientRect().width;
    });
    return O.observe(M), () => O.disconnect();
  }, [t]), $n(() => {
    if (!t || e !== "auto") {
      p(null);
      return;
    }
    p(f.current);
    const M = requestAnimationFrame(() => p(null));
    return () => cancelAnimationFrame(M);
  }, [t, e]);
  const [m, y] = Ye(!1), [b, T] = Ye(null), A = Q(!1);
  $n(() => {
    if (t) {
      A.current = !0, y(!1), T(null);
      return;
    }
    if (!A.current || e !== "auto") return;
    A.current = !1, y(!0);
    let M = 0, O = 0;
    return (() => {
      var C;
      const k = (C = d.current) == null ? void 0 : C.firstElementChild, z = (k == null ? void 0 : k.getBoundingClientRect().width) ?? 0;
      z > 0 ? (M = requestAnimationFrame(() => T(z)), O = window.setTimeout(() => {
        y(!1), T(null);
      }, Pi + 30)) : y(!1);
    })(), () => {
      cancelAnimationFrame(M), window.clearTimeout(O);
    };
  }, [t, e]);
  const v = t ? h ?? n : m ? b ?? n : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ ge(
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
function Pv({
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
  cancelOnOutside: M = !1,
  className: O = "",
  "aria-label": P
}) {
  const [k, z] = Ye(h), C = Q(k);
  C.current = k;
  const x = Q(null), I = Q(null), R = Q(null), S = Xy(), D = yn(), $ = Me(9, 13, D), B = ze((te) => {
    C.current !== te && (C.current = te, z(te), p == null || p(te));
  }, [p]), Z = ze((te = !1) => {
    var Y;
    B(!1), (Y = I.current) == null || Y.blur(), te && requestAnimationFrame(() => {
      var ce;
      return (ce = R.current) == null ? void 0 : ce.focus();
    });
  }, [B]), L = ze(() => {
    B(!0), requestAnimationFrame(() => {
      const te = I.current;
      if (!te) return;
      te.focus();
      const Y = te.value.length;
      te.setSelectionRange(Y, Y);
    });
  }, [B]);
  Ge(() => {
    h && L();
  }, [h, L]), Ge(() => {
    var ce;
    if (!k) return;
    const te = ((ce = x.current) == null ? void 0 : ce.ownerDocument) ?? document, Y = (fe) => {
      var Ce;
      const Ee = fe.target;
      Ee && ((Ce = x.current) != null && Ce.contains(Ee) || (M && (A == null || A()), Z()));
    };
    return te.addEventListener("pointerdown", Y, !0), () => te.removeEventListener("pointerdown", Y, !0);
  }, [k, Z, M, A]);
  const N = ze((te) => {
    var ce;
    if (!k) return;
    const Y = te.relatedTarget;
    Y && ((ce = x.current) != null && ce.contains(Y)) || (M && (A == null || A()), Z());
  }, [k, Z, M, A]), J = ze((te) => {
    if (te.key === "Enter") {
      te.preventDefault(), T == null || T(t), Z(!0);
      return;
    }
    te.key === "Escape" && (te.preventDefault(), te.stopPropagation(), v ? A == null || A() : e(""), Z(!0));
  }, [e, Z, v, A, T, t]), U = r === void 0 ? /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5" }) : r, K = y === void 0 ? U : y, G = 8 + (((m == null ? void 0 : m.length) || 0) + (b && t ? 1 : 0)) * (S.box + 2), ne = (te) => /* @__PURE__ */ _(
    "span",
    {
      style: { width: S.icon, height: S.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: te
    }
  );
  return /* @__PURE__ */ _(
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
      className: O,
      onBlur: N,
      trigger: /* @__PURE__ */ _(
        dr,
        {
          ref: R,
          type: "button",
          variant: a,
          size: "minimal",
          theme: d,
          icon: U,
          collapse: l,
          iconWithLabel: c,
          revealOnHover: u,
          active: f,
          keepLabelOnActive: !0,
          onClick: L,
          className: `${l ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${k ? "pointer-events-none" : ""}`,
          tabIndex: k ? -1 : 0,
          "aria-expanded": k,
          "aria-label": P || n,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ _("span", { className: `min-w-0 ${l ? "" : "truncate"}`, children: n })
        }
      ),
      field: /* @__PURE__ */ ge(Ln, { children: [
        K && /* @__PURE__ */ _(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: $, width: S.icon, height: S.icon },
            children: ne(K)
          }
        ),
        /* @__PURE__ */ _(
          "input",
          {
            ref: I,
            value: t,
            onChange: (te) => e(te.target.value),
            onKeyDown: J,
            placeholder: i,
            "aria-label": P || i,
            tabIndex: k ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: K ? $ + S.icon + 6 : 10, paddingRight: G },
            className: `${Ha("sm")} w-full`
          }
        ),
        /* @__PURE__ */ ge("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          m == null ? void 0 : m.map((te) => /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              "aria-label": te.label,
              title: te.label,
              tabIndex: k ? 0 : -1,
              onMouseDown: (Y) => Y.preventDefault(),
              onClick: () => {
                te.onClick(t, { close: () => Z(!0) }), te.keepOpen || Z(!0);
              },
              style: { width: S.box, height: S.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": te.key,
              children: ne(te.icon)
            },
            te.key
          )),
          b && t && /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: k ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var te;
                  return (te = I.current) == null ? void 0 : te.focus();
                });
              },
              style: { width: S.box, height: S.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ _(eo, { size: S.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function B2({
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
    Pv,
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
function q2(t) {
  return t.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function W2(t, e, n) {
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
function Dv(t, e, n) {
  const r = q2(n), i = r.length > 0, o = new Map(e.map((c) => [c.key, c])), s = [];
  for (const c of t) {
    const { matched: u, detail: d } = W2(c, c.group ? o.get(c.group) : void 0, r);
    u && s.push({ item: c, detail: d });
  }
  const a = new Set(s.map((c) => c.item.group).filter(Boolean)), l = i ? e.filter((c) => a.has(c.key) || c.label.toLowerCase().includes(n.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: l, hasQuery: i };
}
function j2(t) {
  var u;
  const { hits: e, visibleGroups: n, hasQuery: r } = Dv(t.items, t.groups, t.query), i = [];
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
function K2({
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
  expandedWidth: M = 288,
  panelWidth: O,
  panelMinWidth: P,
  keepAllRows: k = !1,
  maxMenuHeight: z = 420,
  theme: C = "light",
  morph: x = !0,
  emptyTitle: I,
  emptyHint: R,
  renderEmpty: S,
  emptyActions: D,
  leadingActions: $,
  hideLeadingOnEmpty: B = !1,
  footerActions: Z,
  fieldActions: L,
  multiple: N,
  open: J,
  onOpenChange: U,
  hideTrigger: K = !1,
  anchorRef: V,
  portalTarget: q,
  renderTrigger: G,
  renderItem: ne,
  highlightOnOpen: te = !0,
  ref: Y
}) {
  const ce = l !== void 0, [fe, Ee] = Ye(""), Ce = ce ? l : fe, Be = ze((H) => {
    ce || Ee(H), c == null || c(H);
  }, [ce, c]), it = J !== void 0, [mt, ot] = Ye(!1), re = it ? J : mt, _e = ze((H) => {
    it || ot(H), U == null || U(H);
  }, [it, U]), [Ie, $e] = Ye(n === "inline"), De = dn(() => e.map((H) => H.key).join("\0"), [e]), Oe = dn(() => new Set(De ? De.split("\0") : []), [De]), [Xe, pt] = Ye(() => m ? Oe : /* @__PURE__ */ new Set()), [Se, Ze] = Ye(0), Ct = Q(!1), ft = Q(null), Qe = ze((H, we = "keyboard") => {
    Ct.current = we === "pointer", Ze(H);
  }, []), Rt = Q(null), Ve = Q(null), tt = Q(null), Pt = Q(null), Lt = Q(null), Qt = Q(0), yt = Ls(), Ft = oo(), Ot = cl(), hn = qf(), rn = fb(), bt = Xy(), me = 8 + (((L == null ? void 0 : L.length) || 0) + (Ce ? 1 : 0)) * (bt.box + 2), [xe, qe] = Ye({ top: 0, left: 0, maxH: 288, ready: !1 }), [Ke, ue] = Ye(0);
  tb({
    anchorRef: V ?? Rt,
    panelRef: Pt,
    open: re,
    maxHeight: z,
    anchorRectRef: Lt,
    onPosition: (H) => qe({ top: H.top, left: H.left, maxH: H.maxH, ready: H.ready })
  }), Ge(() => {
    const H = (V == null ? void 0 : V.current) ?? Rt.current;
    !re || !H || ue(H.getBoundingClientRect().width);
  }, [re, Ie, V]);
  const [ke, se] = Ye(!1);
  Ge(() => {
    re && se(!0);
  }, [re]);
  const F = ll({
    visible: re,
    morph: x,
    anchor: () => {
      var H;
      return ((H = (V == null ? void 0 : V.current) ?? Rt.current) == null ? void 0 : H.getBoundingClientRect()) ?? null;
    },
    ref: Pt,
    cloneOnUnmount: !0,
    onClosed: () => se(!1)
  }), oe = (D || []).map(
    (H) => typeof H.label == "function" ? H.label(Ce) : H.label
  ), he = dn(
    () => j2({
      items: t,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: k ? "" : Ce,
      browseGroups: p || m || g,
      browseAll: b,
      expandedGroups: Xe,
      emptyActionLabels: oe
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, e, Ce, k, p, m, g, b, Xe, oe.join("\0")]
  ), Pe = dn(
    () => ($ || []).map((H, we) => ({
      kind: "action",
      label: typeof H.label == "function" ? H.label(Ce) : H.label,
      actionIndex: we,
      source: "leading"
    })),
    [$, Ce]
  ), nt = dn(
    () => (Z || []).map((H, we) => ({
      kind: "action",
      label: typeof H.label == "function" ? H.label(Ce) : H.label,
      actionIndex: we,
      source: "footer"
    })),
    [Z, Ce]
  ), It = he.some((H) => H.kind === "empty"), lt = Pe.length > 0 && !(B && It), gt = lt ? Pe.length : 0, kt = dn(
    () => [...lt ? Pe : [], ...he, ...nt],
    [lt, Pe, he, nt]
  ), vt = !!d || g && !Ce.trim(), Ut = dn(
    () => kt.map((H, we) => ({ row: H, index: we })).filter((H) => !(H.row.kind === "empty" || H.row.kind === "item" && H.row.hidden || H.row.kind === "group" && !vt)),
    [kt, vt]
  ), An = (g || m) && !Ce.trim(), zt = !!N, cn = dn(
    () => t.filter((H) => H.checkable !== !1).map((H) => H.id),
    [t]
  ), _n = dn(() => Ce.trim() ? Dv(t, e, Ce).hits.filter((H) => H.item.checkable !== !1).map((H) => H.item.id) : cn, [t, e, Ce, cn]), Pn = dn(() => new Set(_n), [_n]), Ht = sb({
    mode: (N == null ? void 0 : N.mode) ?? "draft",
    selectedIds: (N == null ? void 0 : N.selectedIds) ?? lb,
    itemIds: cn,
    visibleIds: _n,
    max: N == null ? void 0 : N.max,
    disabledIds: N == null ? void 0 : N.disabledIds,
    indicator: N == null ? void 0 : N.indicator,
    onCommit: N == null ? void 0 : N.onCommit,
    onDraftChange: N == null ? void 0 : N.onDraftChange,
    onToggle: N == null ? void 0 : N.onToggle
  }), mn = Q(Ht.reset);
  mn.current = Ht.reset;
  const Yn = typeof (N == null ? void 0 : N.commitLabel) == "function" ? N.commitLabel(Ht.count) : (N == null ? void 0 : N.commitLabel) ?? `Select ${Ht.count}`, bn = ze(() => {
    var H;
    _e(!1), n === "expandable" && ((H = Ve.current) == null || H.blur(), $e(!1), requestAnimationFrame(() => {
      var we;
      return (we = tt.current) == null ? void 0 : we.focus();
    })), it || Be(""), Qe(0), pt(m ? Oe : /* @__PURE__ */ new Set()), f == null || f();
  }, [n, f, Be, m, Oe, it, _e]);
  Ge(() => {
    if (Ce.trim() || !m) {
      pt((H) => H.size ? /* @__PURE__ */ new Set() : H);
      return;
    }
    pt((H) => H.size === Oe.size && [...Oe].every((we) => H.has(we)) ? H : Oe);
  }, [Ce, m, Oe]);
  const hr = Q(!1), Vn = Q(!1);
  Ge(() => {
    if (!re) {
      hr.current = !1;
      return;
    }
    if (hr.current || !g || Ce.trim()) return;
    const H = T ? [T] : [...(N == null ? void 0 : N.selectedIds) ?? []], we = new Set(H), Le = we.size ? e.filter((rt) => t.some((qt) => qt.group === rt.key && we.has(qt.id))).map((rt) => rt.key) : [];
    if (Le.length === 0) {
      hr.current = !0;
      return;
    }
    const Ue = y === "single" ? Le.slice(0, 1) : Le;
    if (!Ue.every((rt) => Xe.has(rt))) {
      Vn.current = !0, pt(new Set(Ue));
      return;
    }
    if (te && T) {
      const rt = kt.findIndex((qt) => qt.kind === "item" && qt.hit.item.id === T);
      rt >= 0 && Qe(rt);
    }
    hr.current = !0;
  }, [re, g, Ce, e, t, T, N == null ? void 0 : N.selectedIds, y, Xe, kt, te, Qe]);
  const un = ze((H) => {
    pt((we) => {
      const Le = new Set(we);
      return Le.has(H) ? Le.delete(H) : (y === "single" && Le.clear(), Le.add(H)), Le;
    });
  }, [y]), Cn = ze(() => {
    var we;
    if (re) {
      (we = Ve.current) == null || we.focus();
      return;
    }
    if (mn.current(), n === "expandable" && !Ie) {
      const Le = Rt.current;
      if (Le) {
        const Ue = Le.style.transition, rt = Le.style.width;
        Le.style.transition = "none", Le.style.width = `${M}px`;
        const qt = Le.getBoundingClientRect();
        Lt.current = { left: qt.left, top: qt.top, width: qt.width, height: qt.height }, Le.style.width = rt, Le.offsetWidth, Le.style.transition = Ue, window.clearTimeout(Qt.current), Qt.current = window.setTimeout(() => {
          Lt.current = null;
        }, Pi + 80);
      }
    }
    $e(!0), _e(!0);
    const H = T ? he.findIndex((Le) => Le.kind === "item" && Le.hit.item.id === T) : -1;
    Qe(H >= 0 ? gt + H : te ? gt : -1);
  }, [re, n, Ie, M, gt, he, T, te]);
  Ge(() => () => {
    window.clearTimeout(Qt.current), Lt.current = null;
  }, []), Ge(() => {
    re || (ft.current = null);
  }, [re]), Ge(() => {
    if (n !== "expandable" || !Ie || !re || !A) return;
    const H = requestAnimationFrame(() => {
      var we;
      return (we = Ve.current) == null ? void 0 : we.focus();
    });
    return () => cancelAnimationFrame(H);
  }, [n, Ie, re, A]), Ge(() => {
    var Le;
    if (!re) return;
    const H = ((Le = Rt.current) == null ? void 0 : Le.ownerDocument) ?? yt;
    if (!H) return;
    const we = (Ue) => {
      var qt, Kn, Un, pr;
      const rt = ((qt = Ue.composedPath) == null ? void 0 : qt.call(Ue)[0]) ?? Ue.target;
      !rt || typeof rt.nodeType != "number" || (Kn = Rt.current) != null && Kn.contains(rt) || (Un = Pt.current) != null && Un.contains(rt) || (pr = V == null ? void 0 : V.current) != null && pr.contains(rt) || bn();
    };
    return H.addEventListener("pointerdown", we, !0), () => H.removeEventListener("pointerdown", we, !0);
  }, [re, bn, yt, V]);
  const or = ze((H) => {
    var we;
    if (H.kind === "item" ? ft.current = H.hit.item.id : (H.kind === "group" || H.kind === "action") && (ft.current = null), H.kind === "group") {
      if (zt) {
        const Le = (we = N == null ? void 0 : N.groupToken) == null ? void 0 : we.call(N, H.group.key);
        if (Le) {
          Ht.canToggle(Le) && Ht.toggle(Le);
          return;
        }
        const Ue = t.filter((rt) => rt.group === H.group.key && rt.checkable !== !1 && Pn.has(rt.id) && !Ht.isDisabled(rt.id)).map((rt) => rt.id);
        Ue.length && Ht.toggleGroup(Ue);
        return;
      }
      d ? (d(H.group), h && bn()) : vt && un(H.group.key);
      return;
    }
    if (H.kind === "item") {
      if (zt) {
        Ht.canToggle(H.hit.item.id) && Ht.toggle(H.hit.item.id);
        return;
      }
      u(H.hit.item), h && bn();
      return;
    }
    if (H.kind === "action") {
      const Le = H.source === "leading" ? $ : H.source === "footer" ? Z : D, Ue = Le == null ? void 0 : Le[H.actionIndex];
      Ue && Ue.onClick(Ce), h && bn();
    }
  }, [bn, h, D, Z, vt, t, $, N, zt, u, d, Ce, Ht, un, Pn]), Pr = (H) => {
    if (Ut.length === 0) return;
    let we = Se;
    if (we < 0 && ft.current) {
      const rt = Ut.find(
        (qt) => qt.row.kind === "item" && qt.row.hit.item.id === ft.current
      );
      rt && (we = rt.index);
    }
    const Le = Ut.findIndex((rt) => rt.index === we), Ue = Le < 0 ? 0 : (Le + H + Ut.length) % Ut.length;
    Qe(Ut[Ue].index);
  };
  qy(Y, () => ({
    moveHighlight: Pr,
    activateHighlighted: () => {
      if (Ct.current) return !1;
      const H = Se >= 0 ? kt[Se] : void 0;
      return H ? (or(H), Qe(-1, "keyboard"), !0) : !1;
    },
    close: bn,
    selectAll: () => {
      zt && Ht.setAll(!0);
    },
    setSelection: (H) => {
      Ht.reset(H);
    }
  }), [kt, Se, or, bn, zt, Ht]);
  const gi = (H) => {
    if (zt && (H.metaKey || H.ctrlKey) && H.key.toLowerCase() === "a") {
      H.preventDefault(), H.stopPropagation(), Ht.setAll(!0);
      return;
    }
    if (H.key === "ArrowDown")
      H.preventDefault(), re ? Pr(1) : Cn();
    else if (H.key === "ArrowUp")
      H.preventDefault(), Pr(-1);
    else if ((H.key === "ArrowRight" || H.key === "ArrowLeft") && g && re && !Ce.trim()) {
      const we = kt[Se];
      if ((we == null ? void 0 : we.kind) === "group") {
        const Le = Xe.has(we.group.key);
        (H.key === "ArrowRight" || Le) && (H.preventDefault(), un(we.group.key));
      } else if ((we == null ? void 0 : we.kind) === "item" && H.key === "ArrowLeft" && we.hit.item.group) {
        H.preventDefault();
        const Le = we.hit.item.group;
        Xe.has(Le) && un(Le);
        const Ue = kt.findIndex((rt) => rt.kind === "group" && rt.group.key === Le);
        Ue >= 0 && Qe(Ue);
      }
    } else if (H.key === "Enter") {
      H.preventDefault();
      const we = kt[Se] ?? kt[0];
      we && or(we);
    } else H.key === "Escape" && (H.preventDefault(), bn());
  }, Ur = (H) => {
    n === "expandable" && !Ie || (Be(H), re || _e(!0));
  };
  Ge(() => {
    if (k) {
      const we = Ce.trim().toLowerCase();
      if (!we) {
        const Ue = T ? he.findIndex((rt) => rt.kind === "item" && rt.hit.item.id === T) : -1;
        Qe(Ue >= 0 ? gt + Ue : -1);
        return;
      }
      const Le = he.findIndex((Ue) => Ue.kind === "item" && Ue.hit.item.label.toLowerCase().includes(we));
      Qe(Le >= 0 ? gt + Le : -1);
      return;
    }
    if (it) {
      const we = Ce.trim().toLowerCase();
      if (!!we && t.some((Ue) => Ue.id.toLowerCase() === we || Ue.label.toLowerCase() === we)) {
        Qe(-1);
        return;
      }
      if (!zt) {
        const Ue = he.findIndex((rt) => rt.kind === "item" && rt.hit.item.tone !== "create");
        if (Ue >= 0) {
          Qe(gt + Ue);
          return;
        }
      }
    }
    const H = he.findIndex((we) => we.kind === "item");
    Qe(H >= 0 ? gt + H : gt);
  }, [Ce]), Ge(() => {
    if (!re || Ce.trim()) return;
    const H = T ? he.findIndex((we) => we.kind === "item" && we.hit.item.id === T) : -1;
    Qe(H >= 0 ? gt + H : te ? gt : -1);
  }, [re]), $n(() => {
    re && mn.current();
  }, [re]);
  const tr = (H) => /* @__PURE__ */ ge("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    L == null ? void 0 : L.map((we) => /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        "aria-label": we.label,
        title: we.label,
        tabIndex: Ie ? 0 : -1,
        onMouseDown: (Le) => Le.preventDefault(),
        onClick: () => {
          we.onClick(Ce, { close: bn }), we.keepOpen || bn();
        },
        style: { width: bt.box, height: bt.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": we.key,
        children: /* @__PURE__ */ _(
          "span",
          {
            style: { width: bt.icon, height: bt.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: we.icon
          }
        )
      },
      we.key
    )),
    Ce && /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: Ie ? 0 : -1,
        onPointerDown: (we) => we.preventDefault(),
        onClick: H,
        style: { width: bt.box, height: bt.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ _(eo, { size: bt.icon })
      }
    )
  ] }), kr = /* @__PURE__ */ ge("div", { className: "relative w-full", children: [
    /* @__PURE__ */ _(Io, { size: bt.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ _(
      "input",
      {
        ref: Ve,
        value: Ce,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": re,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (H) => Ur(H.target.value),
        onFocus: () => {
          p && Cn();
        },
        onClick: () => {
          p && Cn();
        },
        onKeyDown: gi,
        placeholder: a,
        style: { paddingRight: me },
        className: `${Ha("sm")} w-full pl-8`
      }
    ),
    tr(() => {
      Be(""), re || Cn();
    })
  ] }), mi = /* @__PURE__ */ ge("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ _(Io, { size: bt.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ _(
      "input",
      {
        ref: Ve,
        value: Ce,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": re,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (H) => Ur(H.target.value),
        onFocus: () => {
          p && Ie && Cn();
        },
        onClick: () => {
          p && Ie && Cn();
        },
        onKeyDown: gi,
        placeholder: a,
        tabIndex: Ie ? 0 : -1,
        style: { paddingRight: me },
        className: `${Ha("sm")} h-full w-full pl-8`
      }
    ),
    tr(() => {
      Be(""), !re && Ie && Cn();
    })
  ] });
  Ge(() => {
    if (!re || Ct.current) return;
    const H = Pt.current;
    hi(
      H == null ? void 0 : H.querySelector(`[data-search-row="${Se}"]`),
      "nearest",
      (H == null ? void 0 : H.querySelector("[data-search-scroller]")) ?? null
    );
  }, [re, Se]);
  const Gr = Q(he);
  Gr.current = he;
  const sr = Q(T);
  sr.current = T;
  const Te = Q(N == null ? void 0 : N.selectedIds);
  Te.current = N == null ? void 0 : N.selectedIds, $n(() => {
    if (!re || !Vn.current) return;
    const H = Pt.current;
    if (!H) return;
    const we = T;
    if (!we) {
      Vn.current = !1;
      return;
    }
    const Le = he.findIndex((rt) => rt.kind === "item" && rt.hit.item.id === we);
    if (Le < 0) {
      Vn.current = !1;
      return;
    }
    const Ue = H.querySelector(`[data-search-row="${Le}"]`);
    Ue && (hi(Ue, "center", H.querySelector("[data-search-scroller]") ?? null), Vn.current = !1);
  }, [re, Xe, he, T]);
  const et = ob({
    open: re,
    block: "center",
    ready: xe.ready,
    scroller: () => {
      var H;
      return ((H = Pt.current) == null ? void 0 : H.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Le;
      let H = -1;
      const we = sr.current;
      if (we)
        H = Gr.current.findIndex((Ue) => Ue.kind === "item" && Ue.hit.item.id === we);
      else {
        const Ue = Te.current;
        if (Ue && Ue.length) {
          const rt = new Set(Ue);
          H = Gr.current.findIndex((qt) => qt.kind === "item" && rt.has(qt.hit.item.id));
        }
      }
      return H < 0 ? null : ((Le = Pt.current) == null ? void 0 : Le.querySelector(`[data-search-row="${H}"]`)) ?? null;
    }
  }), At = (H, we) => {
    const Le = Se === we, Ue = !zt && T !== void 0 && H.hit.item.id === T, rt = zt ? Ht.isSelected(H.hit.item.id) : Ue, qt = !!H.hit.item.disabled || zt && !Ht.canToggle(H.hit.item.id), Kn = H.hit.item.tone === "create" ? C === "light" ? { background: Le ? "#d1fae5" : "#ecfdf5", color: Le ? "#065f46" : "#047857" } : { background: Le ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Le ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ ge(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": rt,
        tabIndex: -1,
        "data-search-item": H.hit.item.id,
        "data-search-row": we,
        "data-search-create": H.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (Un) => Un.preventDefault(),
        onMouseEnter: () => Qe(we, "pointer"),
        onClick: () => or(H),
        style: { ...hn, ...H.hit.item.rowStyle, ...Kn },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ot.itemDefault} ${H.hit.item.rowClassName ?? ""} ${Ue ? "ui-item-selected" : ""} ${Le ? "ui-item-highlighted" : ""} ${qt ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          zt && H.hit.item.checkable !== !1 && /* @__PURE__ */ _(Fa, { checked: rt, disabled: qt, indicator: N == null ? void 0 : N.indicator }),
          ne ? /* @__PURE__ */ _("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: ne(H.hit.item, { checked: rt, disabled: qt }) }) : /* @__PURE__ */ ge(Ln, { children: [
            H.hit.item.icon && /* @__PURE__ */ _("span", { className: `${Ot.icon} shrink-0`, children: H.hit.item.icon }),
            /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: H.hit.item.label }),
            (H.hit.detail || H.hit.item.detail) && /* @__PURE__ */ _("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: H.hit.detail || H.hit.item.detail }),
            Ue && /* @__PURE__ */ _(zs, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${H.hit.item.id}`
    );
  }, vn = (H, we) => {
    var fo;
    const Le = Xe.has(H.group.key), Ue = g && !Ce.trim(), rt = vt, qt = rt && Se === we, Kn = zt ? t.filter((en) => en.group === H.group.key && Pn.has(en.id) && en.checkable !== !1) : [], Un = Kn.filter((en) => !Ht.isDisabled(en.id)).map((en) => en.id), pr = zt ? (fo = N == null ? void 0 : N.groupToken) == null ? void 0 : fo.call(N, H.group.key) : void 0, yi = !!pr && Ht.isSelected(pr), wt = yi ? "all" : Un.length > 0 ? Ht.groupState(Un) : "none", Li = yi ? Kn.length : Kn.reduce((en, Fi) => en + (Ht.isSelected(Fi.id) ? 1 : 0), 0), $i = zt && /* @__PURE__ */ _(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${H.group.label}`,
        onMouseDown: (en) => en.preventDefault(),
        onClick: (en) => {
          en.stopPropagation(), pr ? Ht.toggle(pr) : Un.length && Ht.toggleGroup(Un);
        },
        className: `shrink-0 flex items-center justify-center rounded ${pr || Un.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ _(
          Fa,
          {
            checked: wt === "all",
            indeterminate: wt === "some",
            disabled: !pr && Un.length === 0,
            indicator: N == null ? void 0 : N.indicator
          }
        )
      }
    ), ar = zt ? /* @__PURE__ */ ge("span", { className: `shrink-0 tabular-nums text-[10px] ${rt ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Li,
      "/",
      Kn.length
    ] }) : H.group.count !== void 0 && /* @__PURE__ */ _("span", { className: `shrink-0 tabular-nums ${rt ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: H.group.count });
    return rt ? /* @__PURE__ */ ge(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": Ue ? Le : void 0,
        "data-search-group": H.group.key,
        onMouseDown: (en) => en.preventDefault(),
        onMouseEnter: () => Qe(we, "pointer"),
        onClick: () => {
          Ue && un(H.group.key);
        },
        style: hn,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Ot.itemDefault} ${qt ? "ui-item-highlighted" : ""}`,
        children: [
          $i,
          /* @__PURE__ */ ge(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (en) => en.preventDefault(),
              onClick: (en) => {
                en.stopPropagation(), or(H);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                H.group.icon && /* @__PURE__ */ _("span", { className: `${Ot.icon} shrink-0`, children: H.group.icon }),
                /* @__PURE__ */ _("span", { className: "truncate", children: H.group.label })
              ]
            }
          ),
          /* @__PURE__ */ _("span", { className: "min-w-0 flex-1" }),
          ar,
          Ue && /* @__PURE__ */ _(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Le ? "Collapse" : "Expand"} ${H.group.label}`,
              "aria-expanded": Le,
              onMouseDown: (en) => en.preventDefault(),
              onClick: (en) => {
                en.stopPropagation(), un(H.group.key);
              },
              style: { width: bt.box, height: bt.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ _(
                ci,
                {
                  size: bt.icon,
                  className: `transition-transform duration-200 ${Le ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${H.group.key}`
    ) : /* @__PURE__ */ ge(
      "div",
      {
        role: "presentation",
        "data-search-group": H.group.key,
        "data-search-row": we,
        style: rn,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          $i,
          H.group.icon && /* @__PURE__ */ _("span", { className: `${Ot.icon} shrink-0`, children: H.group.icon }),
          /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: H.group.label }),
          ar
        ]
      },
      `group:${H.group.key}`
    );
  }, Vt = (H, we) => {
    var rt;
    const Le = Se === we, Ue = H.source === "leading" ? $ : H.source === "footer" ? Z : D;
    return /* @__PURE__ */ ge(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": H.source || "empty",
        "data-search-row": we,
        onMouseDown: (qt) => qt.preventDefault(),
        onMouseEnter: () => Qe(we, "pointer"),
        onClick: () => or(H),
        style: hn,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ot.itemDefault} ${Le ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ _("span", { className: `${Ot.icon} shrink-0`, children: ((rt = Ue == null ? void 0 : Ue[H.actionIndex]) == null ? void 0 : rt.icon) || /* @__PURE__ */ _(ol, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: H.label })
        ]
      },
      `${H.source || "empty"}:${H.actionIndex}`
    );
  }, Jt = () => /* @__PURE__ */ _("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: S ? S({ query: Ce, close: bn }) : /* @__PURE__ */ ge(Ln, { children: [
    /* @__PURE__ */ _("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ _("div", { className: "text-xs font-medium text-zinc-500", children: I || `No matches for “${Ce.trim()}”` }),
    /* @__PURE__ */ _("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: R || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), Dn = [];
  for (let H = 0; H < he.length; H++) {
    const we = he[H];
    if (we.kind === "group") {
      const Le = [];
      let Ue = H + 1;
      for (; Ue < he.length && he[Ue].kind === "item" && he[Ue].hit.item.group === we.group.key; )
        Le.push({ row: he[Ue], index: Ue }), Ue++;
      Dn.push({ group: we, index: H, items: Le }), H = Ue - 1;
    } else we.kind === "item" ? Dn.push({ row: we, index: H }) : Dn.push({ row: we, index: H });
  }
  const Yr = re || ke ? sl(
    /* @__PURE__ */ ge(
      "div",
      {
        ref: F,
        id: "search-menu-panel",
        "data-theme": C,
        role: "listbox",
        "aria-label": a,
        "aria-multiselectable": zt ? !0 : void 0,
        onPointerEnter: et.engage,
        onPointerDown: (H) => {
          H.stopPropagation(), et.engage();
        },
        onMouseDown: (H) => H.stopPropagation(),
        onClick: (H) => H.stopPropagation(),
        onPointerLeave: () => {
          Ct.current && Qe(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: xe.left,
          top: xe.top,
          width: O ?? (n === "expandable" ? M : Ke || void 0),
          minWidth: P,
          maxHeight: xe.maxH,
          visibility: xe.ready ? "visible" : "hidden"
        },
        children: [
          lt && /* @__PURE__ */ ge("div", { className: "shrink-0 pb-1", children: [
            Pe.map((H, we) => Vt(H, we)),
            he.length > 0 && /* @__PURE__ */ _("div", { className: Ot.separator })
          ] }),
          /* @__PURE__ */ ge("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            he.length === 0 && /* @__PURE__ */ _("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: S ? S({ query: Ce, close: bn }) : /* @__PURE__ */ _(Ln, { children: "Type to search…" }) }),
            Dn.map((H) => {
              if (H.group) {
                const Ue = Xe.has(H.group.group.key), rt = H.items || [];
                return /* @__PURE__ */ ge(Mt.Fragment, { children: [
                  vn(H.group, gt + H.index),
                  An && /* @__PURE__ */ _(
                    "div",
                    {
                      "data-search-group-items": H.group.group.key,
                      "aria-hidden": !Ue,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: Ue ? "1fr" : "0fr",
                        opacity: Ue ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ _("div", { className: "overflow-hidden flex flex-col", children: rt.map((qt) => At(qt.row, gt + qt.index)) })
                    }
                  ),
                  !An && rt.map((qt) => At(qt.row, gt + qt.index))
                ] }, `group:${H.group.group.key}`);
              }
              const we = H.row, Le = gt + H.index;
              return we.kind === "empty" ? Jt() : we.kind === "action" ? Vt(we, Le) : we.kind === "item" ? At(we, Le) : null;
            })
          ] }),
          nt.length > 0 && /* @__PURE__ */ ge("div", { className: "shrink-0", children: [
            /* @__PURE__ */ _("div", { className: Ot.separator }),
            nt.map((H, we) => Vt(H, gt + he.length + we))
          ] }),
          zt && (N == null ? void 0 : N.footer) !== !1 && /* @__PURE__ */ _(
            ub,
            {
              count: Ht.count,
              max: N == null ? void 0 : N.max,
              hiddenCount: (N == null ? void 0 : N.hiddenNote) === !1 ? 0 : Ht.hiddenCount,
              clear: (N == null ? void 0 : N.clear) !== !1,
              theme: C,
              onClear: Ht.clear,
              hero: (N == null ? void 0 : N.mode) === "live" ? void 0 : {
                label: Yn,
                onClick: () => {
                  Ht.commit(), bn();
                },
                disabled: Ht.count === 0
              }
            }
          )
        ]
      }
    ),
    q ?? Ft ?? (yt == null ? void 0 : yt.body) ?? document.body
  ) : null;
  return K ? /* @__PURE__ */ ge(Ln, { children: [
    /* @__PURE__ */ _("div", { ref: Rt, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    Yr
  ] }) : n === "inline" ? /* @__PURE__ */ ge("div", { ref: Rt, "data-search-menu": !0, "data-mode": n, className: "relative inline-flex", style: { width: "100%" }, children: [
    kr,
    Yr
  ] }) : /* @__PURE__ */ _(
    ih,
    {
      expanded: Ie,
      collapsedWidth: v,
      expandedWidth: M,
      rootRef: Rt,
      "data-search-menu": !0,
      "data-mode": n,
      trigger: G ? G({ open: re, expanded: Ie, toggle: Cn }) : /* @__PURE__ */ _(
        dr,
        {
          ref: tt,
          type: "button",
          variant: o,
          size: "minimal",
          theme: C === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ _(Io, { className: "w-3.5 h-3.5" }) : i,
          onClick: Cn,
          className: `w-full justify-start ${Ie ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: Ie ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ _("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ ge(Ln, { children: [
        mi,
        Yr
      ] })
    }
  );
}
function Zi(t, e = "id") {
  return e === "label" ? t.label : t.id;
}
function Nv(t, e, n = "id") {
  const r = e.find((i) => Zi(i, n) === t);
  return (r == null ? void 0 : r.label) || t;
}
function U2(t) {
  return t.split(",").map((e) => e.trim()).filter(Boolean);
}
function G2(t) {
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
function Y2(t, e, n = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of U2(t)) {
    const s = oh(o, e, n);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function X2(t, e, n = "id") {
  const r = t.split(",").map((a) => a.trim()).filter(Boolean), i = t.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const a of i) {
    const l = oh(a, e, n);
    !l || o.has(l) || (o.add(l), s.push(l));
  }
  return s;
}
function V2(t, e, n = "id") {
  const r = t.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => Zi(o, n).toLowerCase() === i || o.label.toLowerCase() === i);
}
function J2(t, e, n = "id") {
  const r = new Set(e.map((i) => Zi(i, n)));
  return t.filter((i) => !r.has(i));
}
function $p(t, e, n, r, i) {
  return i ? i([...t], [...e]) : r === "count" ? t.length ? `${t.length} selected` : "" : r === "chips" ? "" : t.map((o) => Nv(o, e, n)).join(", ");
}
const Z2 = () => {
};
function Q2({
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
  selectAllOnOpen: M = !0,
  uppercase: O = !1,
  allowFreeText: P = !0,
  theme: k,
  className: z = "",
  style: C,
  panelWidth: x,
  panelMinWidth: I,
  initialQuery: R,
  keepAllRows: S = !1,
  maxMenuHeight: D,
  portalTarget: $,
  autoGrow: B = !1,
  skipComma: Z = !1,
  collapsedWidth: L = 140,
  expandedWidth: N = 280,
  createLabel: J,
  onCreateItem: U,
  onExit: K,
  onEscape: V,
  onTabExit: q,
  loadItems: G,
  emptyTitle: ne,
  emptyHint: te,
  sortItems: Y,
  max: ce,
  disabledIds: fe,
  indicator: Ee,
  browse: Ce,
  groupToken: Be
}) {
  const it = wr(), mt = k ?? (it == null ? void 0 : it.mode) ?? "light", ot = yn(), re = ze((Te) => Zi(Te, i), [i]), _e = dn(() => n.map(re), [n, re]), Ie = dn(() => new Map(n.map((Te) => [re(Te), Te])), [n, re]), $e = ze((Te) => Nv(Te, n, i), [n, i]), De = dn(() => new Set([...p ?? []].map((Te) => Te.toLowerCase())), [p]), [Oe, Xe] = Ye(!1), [pt, Se] = Ye(""), [Ze, Ct] = Ye(() => {
    const Te = R ?? "";
    return O ? Te.toUpperCase() : Te;
  }), [ft, Qe] = Ye(Ze), [Rt, Ve] = Ye(() => [...t]), [tt, Pt] = Ye(null), [Lt, Qt] = Ye(!1), yt = Q(null), Ft = Q(null), Ot = Q(null), hn = Q(null), rn = Q(null), bt = Q(t.join("\0")), Sn = Q(!1), me = Q(/* @__PURE__ */ new Set()), xe = Q(!1), qe = Q(!1), Ke = Q(!1), ue = Q(0), ke = Q(""), se = Q([...t]), F = t.join("\0"), oe = dn(
    () => $p(t, n, i, a, l),
    [t, n, i, a, l]
  ), he = ze((Te) => {
    if (c) return c([...Te], n);
    if (o === "single") return Te[0] ? $e(Te[0]) : "";
    const et = Te.map($e).join(", ");
    return Z ? et : Te.length ? `${et}, ` : "";
  }, [c, n, o, $e, Z]);
  Ge(() => {
    Oe || (Ve([...t]), se.current = [...t], bt.current = F);
  }, [F, Oe]);
  const Pe = ze(() => {
    if (Oe || y || T) return;
    Sn.current = !1, xe.current = !0;
    const Te = he(t);
    ke.current = Te, se.current = [...t], Ve([...t]), Se(Te), Qe(Ze), Ct(""), Xe(!0);
  }, [Oe, y, T, t, he, Ze]);
  $n(() => {
    if (!Oe) return;
    const Te = yt.current ?? Ft.current;
    Te && (Te.focus(), (Te instanceof HTMLInputElement || Te instanceof HTMLTextAreaElement) && (o === "single" && M ? Te.setSelectionRange(0, Te.value.length) : Te.setSelectionRange(Te.value.length, Te.value.length)));
  }, [Oe]), $n(() => {
    if (!Ke.current) return;
    Ke.current = !1;
    const Te = yt.current;
    Te && (Te.focus(), Te.setSelectionRange(Te.value.length, Te.value.length));
  }, [pt]), Ge(() => {
    (v || A) && Pe();
  }, []);
  const nt = o === "single" ? ft : G2(pt), It = G ? tt ?? [] : n, lt = dn(
    () => Y ? Y(It, Rt) : It,
    [It, Y, Rt]
  ), gt = nt.trim(), kt = !!U && P && !Lt && !!gt && !V2(gt, It, i);
  Ge(() => {
    if (!G || !Oe) return;
    const Te = nt.trim();
    if (!Te) {
      Pt(null), Qt(!1);
      return;
    }
    Qt(!0);
    const et = ++ue.current, At = setTimeout(() => {
      G(Te).then((vn) => {
        ue.current === et && (Pt(vn), Qt(!1));
      }).catch(() => {
        ue.current === et && (Pt([]), Qt(!1));
      });
    }, 400);
    return () => clearTimeout(At);
  }, [G, Oe, nt]);
  const vt = dn(() => {
    const Te = lt.filter((et) => !et.hidden).map((et) => ({
      id: re(et),
      label: et.label,
      group: et.group,
      detail: et.detail,
      icon: et.icon,
      disabled: !!et.disabled || !!(fe != null && fe.includes(re(et))),
      fields: et.fields,
      keywords: et.keywords,
      rowClassName: et.rowClassName,
      rowStyle: et.rowStyle
    }));
    return kt && Te.unshift({
      id: gt,
      label: J ? J(gt) : `Add “${gt}”…`,
      keywords: gt,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), Te;
  }, [lt, re, fe, kt, gt, J]), Ut = ze((Te) => {
    const et = Te.join("\0");
    if (et !== bt.current) {
      if (Gi(Te, t)) {
        bt.current = et;
        return;
      }
      if (bt.current = et, e(Te), U)
        for (const At of J2(Te, n, i))
          me.current.has(At) || (me.current.add(At), U(At));
    }
  }, [t, e, U, n, i]), An = ze((Te, et) => {
    !et || !U || !P || n.some((At) => re(At) === Te) || me.current.has(Te) || (me.current.add(Te), U(Te));
  }, [U, P, n, re]), zt = ze((Te = !0) => {
    if (!xe.current || (xe.current = !1, y || T)) return;
    if (Sn.current) {
      Sn.current = !1;
      return;
    }
    const et = ke.current, At = new Set(_e), vn = o === "single" ? (() => {
      const Vt = et.trim();
      if (!Vt) return P ? [] : t;
      const Jt = oh(Vt, n, i);
      return !P && !At.has(Jt) ? t : [Jt];
    })() : Mr(
      Y2(et, n, i).filter((Vt) => P || At.has(Vt)),
      _e
    );
    se.current = vn, Ve(vn), Qe(""), Xe(!1), Ut(vn), Te && !qe.current && (K == null || K());
  }, [y, T, o, n, i, _e, P, t, Ut, K]), cn = ze((Te) => {
    Xe(Te), Te || zt();
  }, [zt]), _n = ze(() => {
    Sn.current = !0, xe.current = !1;
    const Te = he(t);
    ke.current = Te, se.current = [...t], Ve([...t]), Se(Te), Qe(""), Xe(!1), V == null || V();
  }, [t, he, V]);
  Ge(() => {
    var vn;
    if (!Oe) return;
    const et = (((vn = Ot.current) == null ? void 0 : vn.ownerDocument) ?? document).defaultView;
    if (!et) return;
    const At = (Vt) => {
      Vt.key === "Escape" && (Vt.preventDefault(), Vt.stopImmediatePropagation(), _n());
    };
    return et.addEventListener("keydown", At, !0), () => et.removeEventListener("keydown", At, !0);
  }, [Oe, _n]);
  const Pn = ze((Te) => {
    const et = Mr(Te, _e), At = he(et);
    se.current = et, ke.current = At, Ve(et), Ke.current = !0, Se(At);
  }, [_e, he]), Ht = ze((Te) => {
    const et = Te.id;
    xe.current = !1;
    const At = $e(et);
    se.current = [et], ke.current = At, Ve([et]), Se(At), Qe(""), Xe(!1), Ut([et]), qe.current || K == null || K();
  }, [$e, Ut, K]), mn = (Te) => {
    var et, At, vn, Vt, Jt;
    if (Te.key === "Escape") {
      Te.preventDefault(), _n();
      return;
    }
    if (Te.key === "Tab") {
      if (Te.preventDefault(), o === "single" && Oe) {
        qe.current = !0;
        const Dn = (et = rn.current) == null ? void 0 : et.activateHighlighted();
        if (qe.current = !1, Dn) {
          (At = q ?? K) == null || At(yt.current ?? void 0);
          return;
        }
      }
      Oe && zt(!1), (vn = q ?? K) == null || vn(yt.current ?? void 0);
      return;
    }
    if (Te.key === "ArrowDown" || Te.key === "ArrowUp") {
      if (Te.preventDefault(), !Oe) {
        Pe();
        return;
      }
      (Vt = rn.current) == null || Vt.moveHighlight(Te.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (Te.key === "Enter") {
      if (Te.preventDefault(), Te.stopPropagation(), Oe && ((Jt = rn.current) != null && Jt.activateHighlighted())) return;
      zt();
      return;
    }
  }, Yn = (Te) => {
    var At;
    const et = O ? Te.target.value.toUpperCase() : Te.target.value;
    if (ke.current = et, Se(et), o === "single" && Qe(et), Oe || (xe.current = !0, Sn.current = !1, Xe(!0)), o === "multiple") {
      const vn = Mr(X2(et, n, i), _e);
      se.current = vn, Ve(vn), (At = rn.current) == null || At.setSelection(vn);
    }
  }, bn = () => {
    if (xe.current) {
      if (Sn.current) {
        Sn.current = !1;
        return;
      }
      zt();
    }
  }, hr = ze((Te, et) => {
    const At = Ie.get(Te.id);
    if (!At)
      return /* @__PURE__ */ ge(Ln, { children: [
        /* @__PURE__ */ _(ol, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: Te.label })
      ] });
    const vn = !!p && (i === "label" ? De.has(At.label.toLowerCase()) : p.has(re(At))), Vt = (f == null ? void 0 : f(At)) ?? At.badge ?? null;
    return /* @__PURE__ */ ge(Ln, { children: [
      d ? d(At, et.checked) : /* @__PURE__ */ ge(Ln, { children: [
        At.icon && /* @__PURE__ */ _("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: At.icon }),
        /* @__PURE__ */ _("span", { className: "flex-1 truncate", children: At.label }),
        Vt && /* @__PURE__ */ _("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Vt }),
        h == null ? void 0 : h(At)
      ] }),
      vn && /* @__PURE__ */ _("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ _(Gw, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [Ie, p, De, i, re, f, d, h, g]), Vn = /* @__PURE__ */ _(
    K2,
    {
      ref: rn,
      mode: "inline",
      hideTrigger: !0,
      open: Oe,
      onOpenChange: cn,
      anchorRef: s === "morph" ? hn : Ot,
      items: vt,
      groups: r,
      query: nt,
      onSelect: Ht,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Rt[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Rt,
        mode: "live",
        onDraftChange: Pn,
        onToggle: An,
        onCommit: Z2,
        max: ce,
        disabledIds: fe,
        indicator: Ee,
        groupToken: Be
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (Ce ?? "open") === "open",
      expandableGroups: r.length > 0 && Ce === "accordion",
      groupExpandMode: "single",
      renderItem: hr,
      emptyTitle: Lt ? "Searching…" : ne,
      emptyHint: Lt ? "Fetching matching records." : te,
      theme: mt,
      panelWidth: x,
      panelMinWidth: I,
      keepAllRows: S,
      maxMenuHeight: D,
      portalTarget: $
    }
  ), un = s === "chip", Cn = s === "wrap", or = !un && !Cn && B, Pr = !Oe && !oe, gi = Oe ? pt : oe, Ur = {
    ref: yt,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: Oe ? pt : un ? t.join(", ") : oe,
    disabled: T,
    readOnly: b,
    placeholder: "",
    onFocus: Pe,
    onClick: Pe,
    onChange: Yn,
    onBlur: bn,
    onKeyDown: mn,
    autoComplete: "off",
    spellCheck: !1
  }, tr = Me(5, 7, ot), kr = Me(9, 12, ot), mi = Me(12, 14, ot);
  if (s === "button") {
    const Te = (Vt) => mn(Vt), et = Oe ? Rt : t, At = $p(et, n, i, a, l), vn = !At;
    return /* @__PURE__ */ ge(
      "div",
      {
        ref: Ot,
        "data-picker-field": !0,
        className: `relative ${z}`,
        style: C,
        onMouseDown: (Vt) => Vt.stopPropagation(),
        onContextMenu: (Vt) => {
          Vt.preventDefault(), Vt.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ _("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...et], items: n, display: At, open: Oe, toggle: Pe }) }) : /* @__PURE__ */ ge(
            dr,
            {
              ref: Ft,
              variant: "outline",
              theme: mt === "dark" ? "dark" : "light",
              disabled: T,
              onClick: y ? void 0 : () => Oe ? zt() : Pe(),
              onKeyDown: Te,
              "data-state": Oe ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": Oe,
              className: "w-full justify-between gap-2",
              children: [
                a === "chips" && et.length > 0 ? /* @__PURE__ */ _("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: et.map((Vt) => /* @__PURE__ */ _(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: $e(Vt)
                  },
                  Vt
                )) }) : /* @__PURE__ */ _("span", { className: `min-w-0 flex-1 truncate text-left ${vn ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: At || m }),
                /* @__PURE__ */ _(ci, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          Vn
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ _(
      ih,
      {
        expanded: Oe,
        collapsedWidth: L,
        expandedWidth: N,
        rootRef: Ot,
        "data-picker-field": !0,
        className: z,
        style: C,
        trigger: u ? u({ values: [...t], items: n, display: oe, open: Oe, toggle: Pe }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ ge(
            "button",
            {
              type: "button",
              disabled: T,
              onClick: Pe,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${tr}px ${kr}px`, fontSize: mi },
              children: [
                /* @__PURE__ */ _("span", { className: `min-w-0 flex-1 truncate ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: oe || m }),
                /* @__PURE__ */ _(ci, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ ge("div", { ref: hn, className: "relative h-full", children: [
          /* @__PURE__ */ _(
            "input",
            {
              ...Ur,
              className: `${Ha("sm")} h-full w-full`
            }
          ),
          Vn
        ] })
      }
    );
  const Gr = un ? Me(5, 7, ot) : 0, sr = un ? Me(9, 12, ot) : 0;
  return y ? /* @__PURE__ */ _(
    "div",
    {
      ref: Ot,
      "data-picker-field": !0,
      className: `relative ${un ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Cn ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${z}`,
      style: un ? { padding: `${Gr}px ${sr}px`, fontSize: Me(12, 14, ot), ...C } : C,
      children: /* @__PURE__ */ _(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: oe,
          className: un ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ ge(
    "div",
    {
      ref: Ot,
      "data-picker-field": !0,
      className: `relative ${un ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Cn ? "min-h-[1lh] w-full pb-[1lh]" : or ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${z}`,
      style: un ? { padding: `${Gr}px ${sr}px`, fontSize: mi, ...C } : C,
      onMouseDown: (Te) => Te.stopPropagation(),
      onContextMenu: (Te) => {
        Te.preventDefault(), Te.stopPropagation();
      },
      onAuxClick: Pe,
      children: [
        un && u ? /* @__PURE__ */ _("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...t], items: n, display: oe, open: Oe, toggle: Pe }) }) : a === "chips" && !Oe ? /* @__PURE__ */ ge("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          t.map((Te) => /* @__PURE__ */ _(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: $e(Te)
            },
            Te
          )),
          t.length === 0 && /* @__PURE__ */ _("span", { className: "italic text-[color:var(--ui-text-muted)]", children: m })
        ] }) : /* @__PURE__ */ _(
          "span",
          {
            className: `pointer-events-none text-left ${un ? "min-w-0 flex-1 truncate" : Cn ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Pr ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: gi || m
          }
        ),
        Cn ? /* @__PURE__ */ _(
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
            className: or ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: or ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : un ? { caretColor: "#2563eb", color: "transparent", paddingLeft: sr, paddingRight: sr + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        un && /* @__PURE__ */ _(ci, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        Vn
      ]
    }
  );
}
var ba = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ni(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nc, Fp;
function eR() {
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
function Ov() {
  if (Bp) return ic;
  Bp = 1;
  var t = typeof ba == "object" && ba && ba.Object === Object && ba;
  return ic = t, ic;
}
var oc, qp;
function ii() {
  if (qp) return oc;
  qp = 1;
  var t = Ov(), e = typeof self == "object" && self && self.Object === Object && self, n = t || e || Function("return this")();
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
function tR() {
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
function nR() {
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
  var t = Bs(), e = tR(), n = nR(), r = "[object Null]", i = "[object Undefined]", o = t ? t.toStringTag : void 0;
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
function zv() {
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
function rR() {
  if (Zp) return gc;
  Zp = 1;
  var t = ii(), e = t["__core-js_shared__"];
  return gc = e, gc;
}
var mc, Qp;
function iR() {
  if (Qp) return mc;
  Qp = 1;
  var t = rR(), e = (function() {
    var r = /[^.]+$/.exec(t && t.keys && t.keys.IE_PROTO || "");
    return r ? "Symbol(src)_1." + r : "";
  })();
  function n(r) {
    return !!e && e in r;
  }
  return mc = n, mc;
}
var yc, eg;
function Lv() {
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
function oR() {
  if (tg) return bc;
  tg = 1;
  var t = zv(), e = iR(), n = ao(), r = Lv(), i = /[\\^$.*+?()[\]{}|]/g, o = /^\[object .+?Constructor\]$/, s = Function.prototype, a = Object.prototype, l = s.toString, c = a.hasOwnProperty, u = RegExp(
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
function sR() {
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
  var t = oR(), e = sR();
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
function aR() {
  if (og) return kc;
  og = 1;
  var t = bl();
  function e() {
    this.__data__ = t ? t(null) : {}, this.size = 0;
  }
  return kc = e, kc;
}
var Sc, sg;
function lR() {
  if (sg) return Sc;
  sg = 1;
  function t(e) {
    var n = this.has(e) && delete this.__data__[e];
    return this.size -= n ? 1 : 0, n;
  }
  return Sc = t, Sc;
}
var Cc, ag;
function cR() {
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
function uR() {
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
function dR() {
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
function fR() {
  if (ug) return Ec;
  ug = 1;
  var t = aR(), e = lR(), n = cR(), r = uR(), i = dR();
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
function hR() {
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
function pR() {
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
function gR() {
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
function mR() {
  if (mg) return Dc;
  mg = 1;
  var t = vl();
  function e(n) {
    return t(this.__data__, n) > -1;
  }
  return Dc = e, Dc;
}
var Nc, yg;
function yR() {
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
  var t = hR(), e = pR(), n = gR(), r = mR(), i = yR();
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
function bR() {
  if (wg) return Lc;
  wg = 1;
  var t = fR(), e = wl(), n = lh();
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
function vR() {
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
  var t = vR();
  function e(n, r) {
    var i = n.__data__;
    return t(r) ? i[typeof r == "string" ? "string" : "hash"] : i.map;
  }
  return Fc = e, Fc;
}
var Hc, Sg;
function wR() {
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
function xR() {
  if (Cg) return Bc;
  Cg = 1;
  var t = xl();
  function e(n) {
    return t(this, n).get(n);
  }
  return Bc = e, Bc;
}
var qc, Rg;
function kR() {
  if (Rg) return qc;
  Rg = 1;
  var t = xl();
  function e(n) {
    return t(this, n).has(n);
  }
  return qc = e, qc;
}
var Wc, Tg;
function SR() {
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
  var t = bR(), e = wR(), n = xR(), r = kR(), i = SR();
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
function CR() {
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
function RR() {
  if (Ig) return Uc;
  Ig = 1;
  var t = CR(), e = 500;
  function n(r) {
    var i = t(r, function(s) {
      return o.size === e && o.clear(), s;
    }), o = i.cache;
    return i;
  }
  return Uc = n, Uc;
}
var Gc, Ag;
function TR() {
  if (Ag) return Gc;
  Ag = 1;
  var t = RR(), e = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, n = /\\(\\)?/g, r = t(function(i) {
    var o = [];
    return i.charCodeAt(0) === 46 && o.push(""), i.replace(e, function(s, a, l, c) {
      o.push(l ? c.replace(n, "$1") : a || s);
    }), o;
  });
  return Gc = r, Gc;
}
var Yc, _g;
function ER() {
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
function MR() {
  if (Pg) return Xc;
  Pg = 1;
  var t = Bs(), e = ER(), n = ri(), r = yl(), i = t ? t.prototype : void 0, o = i ? i.toString : void 0;
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
function IR() {
  if (Dg) return Vc;
  Dg = 1;
  var t = MR();
  function e(n) {
    return n == null ? "" : t(n);
  }
  return Vc = e, Vc;
}
var Jc, Ng;
function $v() {
  if (Ng) return Jc;
  Ng = 1;
  var t = ri(), e = sh(), n = TR(), r = IR();
  function i(o, s) {
    return t(o) ? o : e(o, s) ? [o] : n(r(o));
  }
  return Jc = i, Jc;
}
var Zc, Og;
function AR() {
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
  var t = AR(), e = Ws(), n = Object.prototype, r = n.hasOwnProperty, i = n.propertyIsEnumerable, o = t(/* @__PURE__ */ (function() {
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
function Fv() {
  if (Hg) return ru;
  Hg = 1;
  var t = $v(), e = uh(), n = ri(), r = dh(), i = fh(), o = kl();
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
function _R() {
  if (Bg) return iu;
  Bg = 1;
  var t = eR(), e = Fv();
  function n(r, i) {
    return r != null && e(r, i, t);
  }
  return iu = n, iu;
}
var PR = _R();
const DR = /* @__PURE__ */ Ni(PR);
function Hv(t = "This should not happen") {
  throw new Error(t);
}
function yr(t, e = "Assertion failed") {
  if (!t)
    return Hv(e);
}
function Ds(t, e) {
  return Hv(e ?? "Hell froze over");
}
function NR(t, e) {
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
var He;
(function(t) {
  t.Uri = "uri", t.Text = "text", t.Image = "image", t.RowID = "row-id", t.Number = "number", t.Bubble = "bubble", t.Boolean = "boolean", t.Loading = "loading", t.Markdown = "markdown", t.Drilldown = "drilldown", t.Protected = "protected", t.Custom = "custom";
})(He || (He = {}));
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
  return !(t.kind === He.Loading || t.kind === He.Bubble || t.kind === He.RowID || t.kind === He.Protected || t.kind === He.Drilldown);
}
function _o(t) {
  return t.kind === Ir.Marker || t.kind === Ir.NewRow;
}
function Eo(t) {
  if (!To(t) || t.kind === He.Image)
    return !1;
  switch (t.kind) {
    case He.Text:
    case He.Number:
    case He.Markdown:
    case He.Uri:
    case He.Custom:
    case He.Boolean:
      return t.readonly !== !0;
    default:
      Ds(t, "A cell was passed with an invalid kind");
  }
}
function OR(t) {
  return DR(t, "editor");
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
const ur = class ur {
  constructor(e) {
    Je(this, "items");
    this.items = e;
  }
  offset(e) {
    if (e === 0)
      return this;
    const n = this.items.map((r) => [r[0] + e, r[1] + e]);
    return new ur(n);
  }
  add(e) {
    const n = typeof e == "number" ? [e, e + 1] : e, r = ou([...this.items, n]);
    return new ur(r);
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
    return new ur(n);
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
Je(ur, "create", (e) => new ur(ou(e))), Je(ur, "empty", () => Kg ?? (Kg = new ur([]))), Je(ur, "fromSingleSelection", (e) => ur.empty().add(e)), Je(ur, "fromArray", (e) => {
  if (e.length === 0)
    return ur.empty();
  const n = e.map((i) => [i, i + 1]), r = ou(n);
  return new ur(r);
});
let tn = ur;
function zR(t) {
  var e = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return e[n] === void 0 && (e[n] = t(n)), e[n];
  };
}
var LR = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|popover|popoverTarget|popoverTargetAction|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, su = /* @__PURE__ */ zR(
  function(t) {
    return LR.test(t) || t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) < 91;
  }
  /* Z+1 */
), $R = function() {
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
}, Ug = $R, FR = (t) => t.toUpperCase() === t, HR = (t) => (e) => t.indexOf(e) === -1, Bv = (t, e) => {
  const n = {};
  return Object.keys(t).filter(HR(e)).forEach((r) => {
    n[r] = t[r];
  }), n;
};
function BR(t, e, n) {
  const r = Bv(e, n);
  if (!t) {
    const i = typeof su == "function" ? { default: su } : su;
    Object.keys(r).forEach((o) => {
      i.default(o) || delete r[o];
    });
  }
  return r;
}
var qR = (t, e) => {
  if (process.env.NODE_ENV !== "production") {
    if (typeof t == "string" || // eslint-disable-next-line no-self-compare,no-restricted-globals
    typeof t == "number" && isFinite(t))
      return;
    const n = typeof t == "object" ? JSON.stringify(t) : String(t);
    console.warn(
      `An interpolation evaluated to '${n}' in the component '${e}', which is probably a mistake. You should explicitly cast or transform the value to a string.`
    );
  }
}, WR = 0;
function Gg(t) {
  let e = "";
  return process.env.NODE_ENV === "test" && (e += `mocked-styled-${WR++}`, t && t.__wyw_meta && t.__wyw_meta.className && (e += ` ${t.__wyw_meta.className}`)), (n) => {
    if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && Array.isArray(n))
      throw new Error(
        'Using the "styled" tag in runtime is not supported. Make sure you have set up the Babel plugin correctly. See https://github.com/callstack/linaria#setup'
      );
    const r = (o, s) => {
      const { as: a = t, class: l = e } = o, c = n.propsAsIs === void 0 ? !(typeof a == "string" && a.indexOf("-") === -1 && !FR(a[0])) : n.propsAsIs, u = BR(c, o, [
        "as",
        "class"
      ]);
      u.ref = s, u.className = n.atomic ? Ug(n.class, u.className || l) : Ug(u.className || l, n.class);
      const { vars: d } = n;
      if (d) {
        const f = {};
        for (const g in d) {
          const m = d[g], y = m[0], b = m[1] || "", T = typeof y == "function" ? y(o) : y;
          qR(T, n.name), f[`--${g}`] = `${T}${b}`;
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
        const s = Bv(o, ["innerRef"]);
        return r(s, o.innerRef);
      })
    );
    return i.displayName = n.name, i.__wyw_meta = {
      className: n.class || e,
      extends: t
    }, i;
  };
}
var xr = process.env.NODE_ENV !== "production" ? new Proxy(Gg, {
  get(t, e) {
    return t(e);
  }
}) : Gg;
const jR = /* @__PURE__ */ xr("div")({
  name: "ImageOverlayEditorStyle",
  class: "gdg-i2iowwq",
  propsAsIs: !1
});
var au = {}, es = {}, wa = {}, xa = {}, ka = { exports: {} }, Sa = { exports: {} }, an = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yg;
function KR() {
  if (Yg) return an;
  Yg = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, i = t ? Symbol.for("react.strict_mode") : 60108, o = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, a = t ? Symbol.for("react.context") : 60110, l = t ? Symbol.for("react.async_mode") : 60111, c = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, d = t ? Symbol.for("react.suspense") : 60113, f = t ? Symbol.for("react.suspense_list") : 60120, h = t ? Symbol.for("react.memo") : 60115, p = t ? Symbol.for("react.lazy") : 60116, g = t ? Symbol.for("react.block") : 60121, m = t ? Symbol.for("react.fundamental") : 60117, y = t ? Symbol.for("react.responder") : 60118, b = t ? Symbol.for("react.scope") : 60119;
  function T(v) {
    if (typeof v == "object" && v !== null) {
      var M = v.$$typeof;
      switch (M) {
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
                  return M;
              }
          }
        case n:
          return M;
      }
    }
  }
  function A(v) {
    return T(v) === c;
  }
  return an.AsyncMode = l, an.ConcurrentMode = c, an.ContextConsumer = a, an.ContextProvider = s, an.Element = e, an.ForwardRef = u, an.Fragment = r, an.Lazy = p, an.Memo = h, an.Portal = n, an.Profiler = o, an.StrictMode = i, an.Suspense = d, an.isAsyncMode = function(v) {
    return A(v) || T(v) === l;
  }, an.isConcurrentMode = A, an.isContextConsumer = function(v) {
    return T(v) === a;
  }, an.isContextProvider = function(v) {
    return T(v) === s;
  }, an.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, an.isForwardRef = function(v) {
    return T(v) === u;
  }, an.isFragment = function(v) {
    return T(v) === r;
  }, an.isLazy = function(v) {
    return T(v) === p;
  }, an.isMemo = function(v) {
    return T(v) === h;
  }, an.isPortal = function(v) {
    return T(v) === n;
  }, an.isProfiler = function(v) {
    return T(v) === o;
  }, an.isStrictMode = function(v) {
    return T(v) === i;
  }, an.isSuspense = function(v) {
    return T(v) === d;
  }, an.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === c || v === o || v === i || v === d || v === f || typeof v == "object" && v !== null && (v.$$typeof === p || v.$$typeof === h || v.$$typeof === s || v.$$typeof === a || v.$$typeof === u || v.$$typeof === m || v.$$typeof === y || v.$$typeof === b || v.$$typeof === g);
  }, an.typeOf = T, an;
}
var ln = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xg;
function UR() {
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
            var Ce = fe.type;
            switch (Ce) {
              case l:
              case c:
              case r:
              case o:
              case i:
              case d:
                return Ce;
              default:
                var Be = Ce && Ce.$$typeof;
                switch (Be) {
                  case a:
                  case u:
                  case p:
                  case h:
                  case s:
                    return Be;
                  default:
                    return Ee;
                }
            }
          case n:
            return Ee;
        }
      }
    }
    var v = l, M = c, O = a, P = s, k = e, z = u, C = r, x = p, I = h, R = n, S = o, D = i, $ = d, B = !1;
    function Z(fe) {
      return B || (B = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), L(fe) || A(fe) === l;
    }
    function L(fe) {
      return A(fe) === c;
    }
    function N(fe) {
      return A(fe) === a;
    }
    function J(fe) {
      return A(fe) === s;
    }
    function U(fe) {
      return typeof fe == "object" && fe !== null && fe.$$typeof === e;
    }
    function K(fe) {
      return A(fe) === u;
    }
    function V(fe) {
      return A(fe) === r;
    }
    function q(fe) {
      return A(fe) === p;
    }
    function G(fe) {
      return A(fe) === h;
    }
    function ne(fe) {
      return A(fe) === n;
    }
    function te(fe) {
      return A(fe) === o;
    }
    function Y(fe) {
      return A(fe) === i;
    }
    function ce(fe) {
      return A(fe) === d;
    }
    ln.AsyncMode = v, ln.ConcurrentMode = M, ln.ContextConsumer = O, ln.ContextProvider = P, ln.Element = k, ln.ForwardRef = z, ln.Fragment = C, ln.Lazy = x, ln.Memo = I, ln.Portal = R, ln.Profiler = S, ln.StrictMode = D, ln.Suspense = $, ln.isAsyncMode = Z, ln.isConcurrentMode = L, ln.isContextConsumer = N, ln.isContextProvider = J, ln.isElement = U, ln.isForwardRef = K, ln.isFragment = V, ln.isLazy = q, ln.isMemo = G, ln.isPortal = ne, ln.isProfiler = te, ln.isStrictMode = Y, ln.isSuspense = ce, ln.isValidElementType = T, ln.typeOf = A;
  })()), ln;
}
var Vg;
function qv() {
  return Vg || (Vg = 1, process.env.NODE_ENV === "production" ? Sa.exports = KR() : Sa.exports = UR()), Sa.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var lu, Jg;
function GR() {
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
function Wv() {
  return Qg || (Qg = 1, uu = Function.call.bind(Object.prototype.hasOwnProperty)), uu;
}
var du, em;
function YR() {
  if (em) return du;
  em = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ gh(), n = {}, r = /* @__PURE__ */ Wv();
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
function XR() {
  if (tm) return fu;
  tm = 1;
  var t = qv(), e = GR(), n = /* @__PURE__ */ gh(), r = /* @__PURE__ */ Wv(), i = /* @__PURE__ */ YR(), o = function() {
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
    function d(L) {
      var N = L && (c && L[c] || L[u]);
      if (typeof N == "function")
        return N;
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
      instanceOf: M,
      node: z(),
      objectOf: P,
      oneOf: O,
      oneOfType: k,
      shape: x,
      exact: I
    };
    function p(L, N) {
      return L === N ? L !== 0 || 1 / L === 1 / N : L !== L && N !== N;
    }
    function g(L, N) {
      this.message = L, this.data = N && typeof N == "object" ? N : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function m(L) {
      if (process.env.NODE_ENV !== "production")
        var N = {}, J = 0;
      function U(V, q, G, ne, te, Y, ce) {
        if (ne = ne || f, Y = Y || G, ce !== n) {
          if (l) {
            var fe = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw fe.name = "Invariant Violation", fe;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ee = ne + ":" + G;
            !N[Ee] && // Avoid spamming the console because they are often not actionable except for lib authors
            J < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + ne + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), N[Ee] = !0, J++);
          }
        }
        return q[G] == null ? V ? q[G] === null ? new g("The " + te + " `" + Y + "` is marked as required " + ("in `" + ne + "`, but its value is `null`.")) : new g("The " + te + " `" + Y + "` is marked as required in " + ("`" + ne + "`, but its value is `undefined`.")) : null : L(q, G, ne, te, Y);
      }
      var K = U.bind(null, !1);
      return K.isRequired = U.bind(null, !0), K;
    }
    function y(L) {
      function N(J, U, K, V, q, G) {
        var ne = J[U], te = D(ne);
        if (te !== L) {
          var Y = $(ne);
          return new g(
            "Invalid " + V + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + K + "`, expected ") + ("`" + L + "`."),
            { expectedType: L }
          );
        }
        return null;
      }
      return m(N);
    }
    function b() {
      return m(s);
    }
    function T(L) {
      function N(J, U, K, V, q) {
        if (typeof L != "function")
          return new g("Property `" + q + "` of component `" + K + "` has invalid PropType notation inside arrayOf.");
        var G = J[U];
        if (!Array.isArray(G)) {
          var ne = D(G);
          return new g("Invalid " + V + " `" + q + "` of type " + ("`" + ne + "` supplied to `" + K + "`, expected an array."));
        }
        for (var te = 0; te < G.length; te++) {
          var Y = L(G, te, K, V, q + "[" + te + "]", n);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return m(N);
    }
    function A() {
      function L(N, J, U, K, V) {
        var q = N[J];
        if (!a(q)) {
          var G = D(q);
          return new g("Invalid " + K + " `" + V + "` of type " + ("`" + G + "` supplied to `" + U + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(L);
    }
    function v() {
      function L(N, J, U, K, V) {
        var q = N[J];
        if (!t.isValidElementType(q)) {
          var G = D(q);
          return new g("Invalid " + K + " `" + V + "` of type " + ("`" + G + "` supplied to `" + U + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(L);
    }
    function M(L) {
      function N(J, U, K, V, q) {
        if (!(J[U] instanceof L)) {
          var G = L.name || f, ne = Z(J[U]);
          return new g("Invalid " + V + " `" + q + "` of type " + ("`" + ne + "` supplied to `" + K + "`, expected ") + ("instance of `" + G + "`."));
        }
        return null;
      }
      return m(N);
    }
    function O(L) {
      if (!Array.isArray(L))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? o(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : o("Invalid argument supplied to oneOf, expected an array.")), s;
      function N(J, U, K, V, q) {
        for (var G = J[U], ne = 0; ne < L.length; ne++)
          if (p(G, L[ne]))
            return null;
        var te = JSON.stringify(L, function(ce, fe) {
          var Ee = $(fe);
          return Ee === "symbol" ? String(fe) : fe;
        });
        return new g("Invalid " + V + " `" + q + "` of value `" + String(G) + "` " + ("supplied to `" + K + "`, expected one of " + te + "."));
      }
      return m(N);
    }
    function P(L) {
      function N(J, U, K, V, q) {
        if (typeof L != "function")
          return new g("Property `" + q + "` of component `" + K + "` has invalid PropType notation inside objectOf.");
        var G = J[U], ne = D(G);
        if (ne !== "object")
          return new g("Invalid " + V + " `" + q + "` of type " + ("`" + ne + "` supplied to `" + K + "`, expected an object."));
        for (var te in G)
          if (r(G, te)) {
            var Y = L(G, te, K, V, q + "." + te, n);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return m(N);
    }
    function k(L) {
      if (!Array.isArray(L))
        return process.env.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var N = 0; N < L.length; N++) {
        var J = L[N];
        if (typeof J != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + B(J) + " at index " + N + "."
          ), s;
      }
      function U(K, V, q, G, ne) {
        for (var te = [], Y = 0; Y < L.length; Y++) {
          var ce = L[Y], fe = ce(K, V, q, G, ne, n);
          if (fe == null)
            return null;
          fe.data && r(fe.data, "expectedType") && te.push(fe.data.expectedType);
        }
        var Ee = te.length > 0 ? ", expected one of type [" + te.join(", ") + "]" : "";
        return new g("Invalid " + G + " `" + ne + "` supplied to " + ("`" + q + "`" + Ee + "."));
      }
      return m(U);
    }
    function z() {
      function L(N, J, U, K, V) {
        return R(N[J]) ? null : new g("Invalid " + K + " `" + V + "` supplied to " + ("`" + U + "`, expected a ReactNode."));
      }
      return m(L);
    }
    function C(L, N, J, U, K) {
      return new g(
        (L || "React class") + ": " + N + " type `" + J + "." + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + K + "`."
      );
    }
    function x(L) {
      function N(J, U, K, V, q) {
        var G = J[U], ne = D(G);
        if (ne !== "object")
          return new g("Invalid " + V + " `" + q + "` of type `" + ne + "` " + ("supplied to `" + K + "`, expected `object`."));
        for (var te in L) {
          var Y = L[te];
          if (typeof Y != "function")
            return C(K, V, q, te, $(Y));
          var ce = Y(G, te, K, V, q + "." + te, n);
          if (ce)
            return ce;
        }
        return null;
      }
      return m(N);
    }
    function I(L) {
      function N(J, U, K, V, q) {
        var G = J[U], ne = D(G);
        if (ne !== "object")
          return new g("Invalid " + V + " `" + q + "` of type `" + ne + "` " + ("supplied to `" + K + "`, expected `object`."));
        var te = e({}, J[U], L);
        for (var Y in te) {
          var ce = L[Y];
          if (r(L, Y) && typeof ce != "function")
            return C(K, V, q, Y, $(ce));
          if (!ce)
            return new g(
              "Invalid " + V + " `" + q + "` key `" + Y + "` supplied to `" + K + "`.\nBad object: " + JSON.stringify(J[U], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(L), null, "  ")
            );
          var fe = ce(G, Y, K, V, q + "." + Y, n);
          if (fe)
            return fe;
        }
        return null;
      }
      return m(N);
    }
    function R(L) {
      switch (typeof L) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !L;
        case "object":
          if (Array.isArray(L))
            return L.every(R);
          if (L === null || a(L))
            return !0;
          var N = d(L);
          if (N) {
            var J = N.call(L), U;
            if (N !== L.entries) {
              for (; !(U = J.next()).done; )
                if (!R(U.value))
                  return !1;
            } else
              for (; !(U = J.next()).done; ) {
                var K = U.value;
                if (K && !R(K[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function S(L, N) {
      return L === "symbol" ? !0 : N ? N["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && N instanceof Symbol : !1;
    }
    function D(L) {
      var N = typeof L;
      return Array.isArray(L) ? "array" : L instanceof RegExp ? "object" : S(N, L) ? "symbol" : N;
    }
    function $(L) {
      if (typeof L > "u" || L === null)
        return "" + L;
      var N = D(L);
      if (N === "object") {
        if (L instanceof Date)
          return "date";
        if (L instanceof RegExp)
          return "regexp";
      }
      return N;
    }
    function B(L) {
      var N = $(L);
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
    function Z(L) {
      return !L.constructor || !L.constructor.name ? f : L.constructor.name;
    }
    return h.checkPropTypes = i, h.resetWarningCache = i.resetWarningCache, h.PropTypes = h, h;
  }, fu;
}
var hu, nm;
function VR() {
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
function JR() {
  if (rm) return ka.exports;
  if (rm = 1, process.env.NODE_ENV !== "production") {
    var t = qv(), e = !0;
    ka.exports = /* @__PURE__ */ XR()(t.isElement, e);
  } else
    ka.exports = /* @__PURE__ */ VR()();
  return ka.exports;
}
var im;
function ZR() {
  return im || (im = 1, (function(t) {
    (function(e, n) {
      n(t, Mt, /* @__PURE__ */ JR());
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
            var M = A[v];
            M.enumerable = M.enumerable || !1, M.configurable = !0, "value" in M && (M.writable = !0), Object.defineProperty(T, M.key, M);
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
        var M = b.screenX, O = b.screenY;
        return { x: M, y: O };
      }
      var y = (function(b) {
        f(T, b);
        function T() {
          var A;
          c(this, T);
          for (var v = arguments.length, M = Array(v), O = 0; O < v; O++)
            M[O] = arguments[O];
          var P = d(this, (A = T.__proto__ || Object.getPrototypeOf(T)).call.apply(A, [this].concat(M)));
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
            var M = m(v), O = M.x, P = M.y;
            this.moveStart = { x: O, y: P }, this.props.onSwipeStart(v);
          }
        }, {
          key: "_handleSwipeMove",
          value: function(v) {
            if (this.moveStart) {
              var M = m(v), O = M.x, P = M.y, k = O - this.moveStart.x, z = P - this.moveStart.y;
              this.moving = !0;
              var C = this.props.onSwipeMove({
                x: k,
                y: z
              }, v);
              C && v.cancelable && v.preventDefault(), this.movePosition = { deltaX: k, deltaY: z };
            }
          }
        }, {
          key: "_handleSwipeEnd",
          value: function(v) {
            this.props.onSwipeEnd(v);
            var M = this.props.tolerance;
            this.moving && this.movePosition && (this.movePosition.deltaX < -M ? this.props.onSwipeLeft(1, v) : this.movePosition.deltaX > M && this.props.onSwipeRight(1, v), this.movePosition.deltaY < -M ? this.props.onSwipeUp(1, v) : this.movePosition.deltaY > M && this.props.onSwipeDown(1, v)), this.moveStart = null, this.moving = !1, this.movePosition = null;
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
            var M = v.className, O = v.style, P = v.children;
            v.allowMouseEvents, v.onSwipeUp, v.onSwipeDown, v.onSwipeLeft, v.onSwipeRight, v.onSwipeStart, v.onSwipeMove, v.onSwipeEnd, v.innerRef, v.tolerance;
            var k = l(v, ["tagName", "className", "style", "children", "allowMouseEvents", "onSwipeUp", "onSwipeDown", "onSwipeLeft", "onSwipeRight", "onSwipeStart", "onSwipeMove", "onSwipeEnd", "innerRef", "tolerance"]);
            return i.default.createElement(
              this.props.tagName,
              a({
                ref: this._setSwiperRef,
                onMouseDown: this._onMouseDown,
                onTouchStart: this._handleSwipeStart,
                onTouchEnd: this._handleSwipeEnd,
                className: M,
                style: O
              }, k),
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
function jv() {
  return om || (om = 1, (function(t) {
    (function(e, n) {
      n(t, ZR());
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
function QR() {
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
function Kv() {
  if (am) return ts;
  am = 1, Object.defineProperty(ts, "__esModule", {
    value: !0
  }), ts.default = void 0;
  var t = e(QR());
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
function eT() {
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
function Uv() {
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
function Gv() {
  if (dm) return ns;
  dm = 1, Object.defineProperty(ns, "__esModule", {
    value: !0
  }), ns.default = void 0;
  var t = l(Mt), e = s(Kv()), n = eT(), r = s(mh()), i = s(jv()), o = s(Uv());
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
    var z = {}, C = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var x in P)
      if (Object.prototype.hasOwnProperty.call(P, x)) {
        var I = C ? Object.getOwnPropertyDescriptor(P, x) : null;
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
        for (var C in z)
          Object.prototype.hasOwnProperty.call(z, C) && (P[C] = z[C]);
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
      var C = k[z];
      C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(P, C.key, C);
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
    return g = Object.setPrototypeOf || function(C, x) {
      return C.__proto__ = x, C;
    }, g(P, k);
  }
  function m(P) {
    var k = T();
    return function() {
      var C = A(P), x;
      if (k) {
        var I = A(this).constructor;
        x = Reflect.construct(C, arguments, I);
      } else
        x = C.apply(this, arguments);
      return y(this, x);
    };
  }
  function y(P, k) {
    return k && (c(k) === "object" || typeof k == "function") ? k : b(P);
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
  function v(P, k, z) {
    return k in P ? Object.defineProperty(P, k, { value: z, enumerable: !0, configurable: !0, writable: !0 }) : P[k] = z, P;
  }
  var M = function(k) {
    return k.hasOwnProperty("key");
  }, O = /* @__PURE__ */ (function(P) {
    p(z, P);
    var k = m(z);
    function z(C) {
      var x;
      return d(this, z), x = k.call(this, C), v(b(x), "itemsWrapperRef", void 0), v(b(x), "itemsListRef", void 0), v(b(x), "thumbsRef", void 0), v(b(x), "setItemsWrapperRef", function(I) {
        x.itemsWrapperRef = I;
      }), v(b(x), "setItemsListRef", function(I) {
        x.itemsListRef = I;
      }), v(b(x), "setThumbsRef", function(I, R) {
        x.thumbsRef || (x.thumbsRef = []), x.thumbsRef[R] = I;
      }), v(b(x), "updateSizes", function() {
        if (!(!x.props.children || !x.itemsWrapperRef || !x.thumbsRef)) {
          var I = t.Children.count(x.props.children), R = x.itemsWrapperRef.clientWidth, S = x.props.thumbWidth ? x.props.thumbWidth : (0, n.outerWidth)(x.thumbsRef[0]), D = Math.floor(R / S), $ = D < I, B = $ ? I - D : 0;
          x.setState(function(Z, L) {
            return {
              itemSize: S,
              visibleItems: D,
              firstItem: $ ? x.getFirstItem(L.selectedItem) : 0,
              lastPosition: B,
              showArrows: $
            };
          });
        }
      }), v(b(x), "handleClickItem", function(I, R, S) {
        if (!M(S) || S.key === "Enter") {
          var D = x.props.onSelectItem;
          typeof D == "function" && D(I, R);
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
        var R = I.x;
        if (!x.state.itemSize || !x.itemsWrapperRef || !x.state.visibleItems)
          return !1;
        var S = 0, D = t.Children.count(x.props.children), $ = -(x.state.firstItem * 100) / x.state.visibleItems, B = Math.max(D - x.state.visibleItems, 0), Z = -B * 100 / x.state.visibleItems;
        $ === S && R > 0 && (R = 0), $ === Z && R < 0 && (R = 0);
        var L = x.itemsWrapperRef.clientWidth, N = $ + 100 / (L / R);
        return x.itemsListRef && ["WebkitTransform", "MozTransform", "MsTransform", "OTransform", "transform", "msTransform"].forEach(function(J) {
          x.itemsListRef.style[J] = (0, r.default)(N, "%", x.props.axis);
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
        selectedItem: C.selectedItem,
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
        return this.props.children.map(function(I, R) {
          var S = e.default.ITEM(!1, R === x.state.selectedItem), D = {
            key: R,
            ref: function(B) {
              return x.setThumbsRef(B, R);
            },
            className: S,
            onClick: x.handleClickItem.bind(x, R, x.props.children[R]),
            onKeyDown: x.handleClickItem.bind(x, R, x.props.children[R]),
            "aria-label": "".concat(x.props.labels.item, " ").concat(R + 1),
            style: {
              width: x.props.thumbWidth
            }
          };
          return /* @__PURE__ */ t.default.createElement("li", u({}, D, {
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
        var I = t.Children.count(this.props.children) > 1, R = this.state.showArrows && this.state.firstItem > 0, S = this.state.showArrows && this.state.firstItem < this.state.lastPosition, D = {}, $ = -this.state.firstItem * (this.state.itemSize || 0), B = (0, r.default)($, "px", this.props.axis), Z = this.props.transitionTime + "ms";
        return D = {
          WebkitTransform: B,
          MozTransform: B,
          MsTransform: B,
          OTransform: B,
          transform: B,
          msTransform: B,
          WebkitTransitionDuration: Z,
          MozTransitionDuration: Z,
          MsTransitionDuration: Z,
          OTransitionDuration: Z,
          transitionDuration: Z,
          msTransitionDuration: Z
        }, /* @__PURE__ */ t.default.createElement("div", {
          className: e.default.CAROUSEL(!1)
        }, /* @__PURE__ */ t.default.createElement("div", {
          className: e.default.WRAPPER(!1),
          ref: this.setItemsWrapperRef
        }, /* @__PURE__ */ t.default.createElement("button", {
          type: "button",
          className: e.default.ARROW_PREV(!R),
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
          style: D,
          innerRef: this.setItemsListRef,
          allowMouseEvents: this.props.emulateTouch
        }, this.renderItems()) : /* @__PURE__ */ t.default.createElement("ul", {
          className: e.default.SLIDER(!1, this.state.swiping),
          ref: function(N) {
            return x.setItemsListRef(N);
          },
          style: D
        }, this.renderItems()), /* @__PURE__ */ t.default.createElement("button", {
          type: "button",
          className: e.default.ARROW_NEXT(!S),
          onClick: function() {
            return x.slideLeft();
          },
          "aria-label": this.props.labels.rightArrow
        })));
      }
    }]), z;
  })(t.Component);
  return ns.default = O, v(O, "displayName", "Thumbs"), v(O, "defaultProps", {
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
function tT() {
  if (fm) return as;
  fm = 1, Object.defineProperty(as, "__esModule", {
    value: !0
  }), as.default = void 0;
  var t = function() {
    return document;
  };
  return as.default = t, as;
}
var mr = {}, hm;
function Yv() {
  if (hm) return mr;
  hm = 1, Object.defineProperty(mr, "__esModule", {
    value: !0
  }), mr.setPosition = mr.getPosition = mr.isKeyboardEvent = mr.defaultStatusFormatter = mr.noop = void 0;
  var t = Mt, e = n(mh());
  function n(l) {
    return l && l.__esModule ? l : { default: l };
  }
  var r = function() {
  };
  mr.noop = r;
  var i = function(c, u) {
    return "".concat(c, " of ").concat(u);
  };
  mr.defaultStatusFormatter = i;
  var o = function(c) {
    return c ? c.hasOwnProperty("key") : !1;
  };
  mr.isKeyboardEvent = o;
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
  mr.getPosition = s;
  var a = function(c, u) {
    var d = {};
    return ["WebkitTransform", "MozTransform", "MsTransform", "OTransform", "transform", "msTransform"].forEach(function(f) {
      d[f] = (0, e.default)(c, "%", u);
    }), d;
  };
  return mr.setPosition = a, mr;
}
var $r = {}, pm;
function nT() {
  if (pm) return $r;
  pm = 1, Object.defineProperty($r, "__esModule", {
    value: !0
  }), $r.fadeAnimationHandler = $r.slideStopSwipingHandler = $r.slideSwipeAnimationHandler = $r.slideAnimationHandler = void 0;
  var t = Mt, e = r(mh()), n = Yv();
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
    var m = {}, y = h.axis === "horizontal", b = t.Children.count(h.children), T = 0, A = (0, n.getPosition)(p.selectedItem, h), v = h.infiniteLoop ? (0, n.getPosition)(b - 1, h) - 100 : (0, n.getPosition)(b - 1, h), M = y ? f.x : f.y, O = M;
    A === T && M > 0 && (O = 0), A === v && M < 0 && (O = 0);
    var P = A + 100 / (p.itemSize / O), k = Math.abs(M) > h.swipeScrollTolerance;
    return h.infiniteLoop && k && (p.selectedItem === 0 && P > -100 ? P -= b * 100 : p.selectedItem === b - 1 && P < -b * 100 && (P += b * 100)), (!h.preventMovementUntilSwipeScrollTolerance || k || p.swipeMovementStarted) && (p.swipeMovementStarted || g({
      swipeMovementStarted: !0
    }), m.itemListStyle = (0, n.setPosition)(P, h.axis)), k && !p.cancelClick && g({
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
function rT() {
  if (gm) return es;
  gm = 1, Object.defineProperty(es, "__esModule", {
    value: !0
  }), es.default = void 0;
  var t = u(Mt), e = l(jv()), n = l(Kv()), r = l(Gv()), i = l(tT()), o = l(Uv()), s = Yv(), a = nT();
  function l(C) {
    return C && C.__esModule ? C : { default: C };
  }
  function c() {
    if (typeof WeakMap != "function") return null;
    var C = /* @__PURE__ */ new WeakMap();
    return c = function() {
      return C;
    }, C;
  }
  function u(C) {
    if (C && C.__esModule)
      return C;
    if (C === null || d(C) !== "object" && typeof C != "function")
      return { default: C };
    var x = c();
    if (x && x.has(C))
      return x.get(C);
    var I = {}, R = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var S in C)
      if (Object.prototype.hasOwnProperty.call(C, S)) {
        var D = R ? Object.getOwnPropertyDescriptor(C, S) : null;
        D && (D.get || D.set) ? Object.defineProperty(I, S, D) : I[S] = C[S];
      }
    return I.default = C, x && x.set(C, I), I;
  }
  function d(C) {
    "@babel/helpers - typeof";
    return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? d = function(I) {
      return typeof I;
    } : d = function(I) {
      return I && typeof Symbol == "function" && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I;
    }, d(C);
  }
  function f() {
    return f = Object.assign || function(C) {
      for (var x = 1; x < arguments.length; x++) {
        var I = arguments[x];
        for (var R in I)
          Object.prototype.hasOwnProperty.call(I, R) && (C[R] = I[R]);
      }
      return C;
    }, f.apply(this, arguments);
  }
  function h(C, x) {
    var I = Object.keys(C);
    if (Object.getOwnPropertySymbols) {
      var R = Object.getOwnPropertySymbols(C);
      x && (R = R.filter(function(S) {
        return Object.getOwnPropertyDescriptor(C, S).enumerable;
      })), I.push.apply(I, R);
    }
    return I;
  }
  function p(C) {
    for (var x = 1; x < arguments.length; x++) {
      var I = arguments[x] != null ? arguments[x] : {};
      x % 2 ? h(Object(I), !0).forEach(function(R) {
        k(C, R, I[R]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(C, Object.getOwnPropertyDescriptors(I)) : h(Object(I)).forEach(function(R) {
        Object.defineProperty(C, R, Object.getOwnPropertyDescriptor(I, R));
      });
    }
    return C;
  }
  function g(C, x) {
    if (!(C instanceof x))
      throw new TypeError("Cannot call a class as a function");
  }
  function m(C, x) {
    for (var I = 0; I < x.length; I++) {
      var R = x[I];
      R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(C, R.key, R);
    }
  }
  function y(C, x, I) {
    return x && m(C.prototype, x), C;
  }
  function b(C, x) {
    if (typeof x != "function" && x !== null)
      throw new TypeError("Super expression must either be null or a function");
    C.prototype = Object.create(x && x.prototype, { constructor: { value: C, writable: !0, configurable: !0 } }), x && T(C, x);
  }
  function T(C, x) {
    return T = Object.setPrototypeOf || function(R, S) {
      return R.__proto__ = S, R;
    }, T(C, x);
  }
  function A(C) {
    var x = O();
    return function() {
      var R = P(C), S;
      if (x) {
        var D = P(this).constructor;
        S = Reflect.construct(R, arguments, D);
      } else
        S = R.apply(this, arguments);
      return v(this, S);
    };
  }
  function v(C, x) {
    return x && (d(x) === "object" || typeof x == "function") ? x : M(C);
  }
  function M(C) {
    if (C === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return C;
  }
  function O() {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
      })), !0;
    } catch {
      return !1;
    }
  }
  function P(C) {
    return P = Object.setPrototypeOf ? Object.getPrototypeOf : function(I) {
      return I.__proto__ || Object.getPrototypeOf(I);
    }, P(C);
  }
  function k(C, x, I) {
    return x in C ? Object.defineProperty(C, x, { value: I, enumerable: !0, configurable: !0, writable: !0 }) : C[x] = I, C;
  }
  var z = /* @__PURE__ */ (function(C) {
    b(I, C);
    var x = A(I);
    function I(R) {
      var S;
      g(this, I), S = x.call(this, R), k(M(S), "thumbsRef", void 0), k(M(S), "carouselWrapperRef", void 0), k(M(S), "listRef", void 0), k(M(S), "itemsRef", void 0), k(M(S), "timer", void 0), k(M(S), "animationHandler", void 0), k(M(S), "setThumbsRef", function($) {
        S.thumbsRef = $;
      }), k(M(S), "setCarouselWrapperRef", function($) {
        S.carouselWrapperRef = $;
      }), k(M(S), "setListRef", function($) {
        S.listRef = $;
      }), k(M(S), "setItemsRef", function($, B) {
        S.itemsRef || (S.itemsRef = []), S.itemsRef[B] = $;
      }), k(M(S), "autoPlay", function() {
        t.Children.count(S.props.children) <= 1 || (S.clearAutoPlay(), S.props.autoPlay && (S.timer = setTimeout(function() {
          S.increment();
        }, S.props.interval)));
      }), k(M(S), "clearAutoPlay", function() {
        S.timer && clearTimeout(S.timer);
      }), k(M(S), "resetAutoPlay", function() {
        S.clearAutoPlay(), S.autoPlay();
      }), k(M(S), "stopOnHover", function() {
        S.setState({
          isMouseEntered: !0
        }, S.clearAutoPlay);
      }), k(M(S), "startOnLeave", function() {
        S.setState({
          isMouseEntered: !1
        }, S.autoPlay);
      }), k(M(S), "isFocusWithinTheCarousel", function() {
        return S.carouselWrapperRef ? !!((0, i.default)().activeElement === S.carouselWrapperRef || S.carouselWrapperRef.contains((0, i.default)().activeElement)) : !1;
      }), k(M(S), "navigateWithKeyboard", function($) {
        if (S.isFocusWithinTheCarousel()) {
          var B = S.props.axis, Z = B === "horizontal", L = {
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            ArrowLeft: 37
          }, N = Z ? L.ArrowRight : L.ArrowDown, J = Z ? L.ArrowLeft : L.ArrowUp;
          N === $.keyCode ? S.increment() : J === $.keyCode && S.decrement();
        }
      }), k(M(S), "updateSizes", function() {
        if (!(!S.state.initialized || !S.itemsRef || S.itemsRef.length === 0)) {
          var $ = S.props.axis === "horizontal", B = S.itemsRef[0];
          if (B) {
            var Z = $ ? B.clientWidth : B.clientHeight;
            S.setState({
              itemSize: Z
            }), S.thumbsRef && S.thumbsRef.updateSizes();
          }
        }
      }), k(M(S), "setMountState", function() {
        S.setState({
          hasMount: !0
        }), S.updateSizes();
      }), k(M(S), "handleClickItem", function($, B) {
        if (t.Children.count(S.props.children) !== 0) {
          if (S.state.cancelClick) {
            S.setState({
              cancelClick: !1
            });
            return;
          }
          S.props.onClickItem($, B), $ !== S.state.selectedItem && S.setState({
            selectedItem: $
          });
        }
      }), k(M(S), "handleOnChange", function($, B) {
        t.Children.count(S.props.children) <= 1 || S.props.onChange($, B);
      }), k(M(S), "handleClickThumb", function($, B) {
        S.props.onClickThumb($, B), S.moveTo($);
      }), k(M(S), "onSwipeStart", function($) {
        S.setState({
          swiping: !0
        }), S.props.onSwipeStart($);
      }), k(M(S), "onSwipeEnd", function($) {
        S.setState({
          swiping: !1,
          cancelClick: !1,
          swipeMovementStarted: !1
        }), S.props.onSwipeEnd($), S.clearAutoPlay(), S.state.autoPlay && S.autoPlay();
      }), k(M(S), "onSwipeMove", function($, B) {
        S.props.onSwipeMove(B);
        var Z = S.props.swipeAnimationHandler($, S.props, S.state, S.setState.bind(M(S)));
        return S.setState(p({}, Z)), !!Object.keys(Z).length;
      }), k(M(S), "decrement", function() {
        var $ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        S.moveTo(S.state.selectedItem - (typeof $ == "number" ? $ : 1));
      }), k(M(S), "increment", function() {
        var $ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
        S.moveTo(S.state.selectedItem + (typeof $ == "number" ? $ : 1));
      }), k(M(S), "moveTo", function($) {
        if (typeof $ == "number") {
          var B = t.Children.count(S.props.children) - 1;
          $ < 0 && ($ = S.props.infiniteLoop ? B : 0), $ > B && ($ = S.props.infiniteLoop ? 0 : B), S.selectItem({
            // if it's not a slider, we don't need to set position here
            selectedItem: $
          }), S.state.autoPlay && S.state.isMouseEntered === !1 && S.resetAutoPlay();
        }
      }), k(M(S), "onClickNext", function() {
        S.increment(1);
      }), k(M(S), "onClickPrev", function() {
        S.decrement(1);
      }), k(M(S), "onSwipeForward", function() {
        S.increment(1), S.props.emulateTouch && S.setState({
          cancelClick: !0
        });
      }), k(M(S), "onSwipeBackwards", function() {
        S.decrement(1), S.props.emulateTouch && S.setState({
          cancelClick: !0
        });
      }), k(M(S), "changeItem", function($) {
        return function(B) {
          (!(0, s.isKeyboardEvent)(B) || B.key === "Enter") && S.moveTo($);
        };
      }), k(M(S), "selectItem", function($) {
        S.setState(p({
          previousItem: S.state.selectedItem
        }, $), function() {
          S.setState(S.animationHandler(S.props, S.state));
        }), S.handleOnChange($.selectedItem, t.Children.toArray(S.props.children)[$.selectedItem]);
      }), k(M(S), "getInitialImage", function() {
        var $ = S.props.selectedItem, B = S.itemsRef && S.itemsRef[$], Z = B && B.getElementsByTagName("img") || [];
        return Z[0];
      }), k(M(S), "getVariableItemHeight", function($) {
        var B = S.itemsRef && S.itemsRef[$];
        if (S.state.hasMount && B && B.children.length) {
          var Z = B.children[0].getElementsByTagName("img") || [];
          if (Z.length > 0) {
            var L = Z[0];
            if (!L.complete) {
              var N = function K() {
                S.forceUpdate(), L.removeEventListener("load", K);
              };
              L.addEventListener("load", N);
            }
          }
          var J = Z[0] || B.children[0], U = J.clientHeight;
          return U > 0 ? U : null;
        }
        return null;
      });
      var D = {
        initialized: !1,
        previousItem: R.selectedItem,
        selectedItem: R.selectedItem,
        hasMount: !1,
        isMouseEntered: !1,
        autoPlay: R.autoPlay,
        swiping: !1,
        swipeMovementStarted: !1,
        cancelClick: !1,
        itemSize: 1,
        itemListStyle: {},
        slideStyle: {},
        selectedStyle: {},
        prevStyle: {}
      };
      return S.animationHandler = typeof R.animationHandler == "function" && R.animationHandler || R.animationHandler === "fade" && a.fadeAnimationHandler || a.slideAnimationHandler, S.state = p(p({}, D), S.animationHandler(R, D)), S;
    }
    return y(I, [{
      key: "componentDidMount",
      value: function() {
        this.props.children && this.setupCarousel();
      }
    }, {
      key: "componentDidUpdate",
      value: function(S, D) {
        !S.children && this.props.children && !this.state.initialized && this.setupCarousel(), !S.autoFocus && this.props.autoFocus && this.forceFocus(), D.swiping && !this.state.swiping && this.setState(p({}, this.props.stopSwipingHandler(this.props, this.state))), (S.selectedItem !== this.props.selectedItem || S.centerMode !== this.props.centerMode) && (this.updateSizes(), this.moveTo(this.props.selectedItem)), S.autoPlay !== this.props.autoPlay && (this.props.autoPlay ? this.setupAutoPlay() : this.destroyAutoPlay(), this.setState({
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
        var S = this;
        this.bindEvents(), this.state.autoPlay && t.Children.count(this.props.children) > 1 && this.setupAutoPlay(), this.props.autoFocus && this.forceFocus(), this.setState({
          initialized: !0
        }, function() {
          var D = S.getInitialImage();
          D && !D.complete ? D.addEventListener("load", S.setMountState) : S.setMountState();
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
        var S = this.carouselWrapperRef;
        this.props.stopOnHover && S && (S.addEventListener("mouseenter", this.stopOnHover), S.addEventListener("mouseleave", this.startOnLeave));
      }
    }, {
      key: "destroyAutoPlay",
      value: function() {
        this.clearAutoPlay();
        var S = this.carouselWrapperRef;
        this.props.stopOnHover && S && (S.removeEventListener("mouseenter", this.stopOnHover), S.removeEventListener("mouseleave", this.startOnLeave));
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
        var S = this.getInitialImage();
        S && S.removeEventListener("load", this.setMountState), this.props.useKeyboardArrows && (0, i.default)().removeEventListener("keydown", this.navigateWithKeyboard);
      }
    }, {
      key: "forceFocus",
      value: function() {
        var S;
        (S = this.carouselWrapperRef) === null || S === void 0 || S.focus();
      }
    }, {
      key: "renderItems",
      value: function(S) {
        var D = this;
        return this.props.children ? t.Children.map(this.props.children, function($, B) {
          var Z = B === D.state.selectedItem, L = B === D.state.previousItem, N = Z && D.state.selectedStyle || L && D.state.prevStyle || D.state.slideStyle || {};
          D.props.centerMode && D.props.axis === "horizontal" && (N = p(p({}, N), {}, {
            minWidth: D.props.centerSlidePercentage + "%"
          })), D.state.swiping && D.state.swipeMovementStarted && (N = p(p({}, N), {}, {
            pointerEvents: "none"
          }));
          var J = {
            ref: function(K) {
              return D.setItemsRef(K, B);
            },
            key: "itemKey" + B + (S ? "clone" : ""),
            className: n.default.ITEM(!0, B === D.state.selectedItem, B === D.state.previousItem),
            onClick: D.handleClickItem.bind(D, B, $),
            style: N
          };
          return /* @__PURE__ */ t.default.createElement("li", J, D.props.renderItem($, {
            isSelected: B === D.state.selectedItem,
            isPrevious: B === D.state.previousItem
          }));
        }) : [];
      }
    }, {
      key: "renderControls",
      value: function() {
        var S = this, D = this.props, $ = D.showIndicators, B = D.labels, Z = D.renderIndicator, L = D.children;
        return $ ? /* @__PURE__ */ t.default.createElement("ul", {
          className: "control-dots"
        }, t.Children.map(L, function(N, J) {
          return Z && Z(S.changeItem(J), J === S.state.selectedItem, J, B.item);
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
        var S = this;
        if (!this.props.children || t.Children.count(this.props.children) === 0)
          return null;
        var D = this.props.swipeable && t.Children.count(this.props.children) > 1, $ = this.props.axis === "horizontal", B = this.props.showArrows && t.Children.count(this.props.children) > 1, Z = B && (this.state.selectedItem > 0 || this.props.infiniteLoop) || !1, L = B && (this.state.selectedItem < t.Children.count(this.props.children) - 1 || this.props.infiniteLoop) || !1, N = this.renderItems(!0), J = N.shift(), U = N.pop(), K = {
          className: n.default.SLIDER(!0, this.state.swiping),
          onSwipeMove: this.onSwipeMove,
          onSwipeStart: this.onSwipeStart,
          onSwipeEnd: this.onSwipeEnd,
          style: this.state.itemListStyle,
          tolerance: this.props.swipeScrollTolerance
        }, V = {};
        if ($) {
          if (K.onSwipeLeft = this.onSwipeForward, K.onSwipeRight = this.onSwipeBackwards, this.props.dynamicHeight) {
            var q = this.getVariableItemHeight(this.state.selectedItem);
            V.height = q || "auto";
          }
        } else
          K.onSwipeUp = this.props.verticalSwipe === "natural" ? this.onSwipeBackwards : this.onSwipeForward, K.onSwipeDown = this.props.verticalSwipe === "natural" ? this.onSwipeForward : this.onSwipeBackwards, K.style = p(p({}, K.style), {}, {
            height: this.state.itemSize
          }), V.height = this.state.itemSize;
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
        }, this.renderControls(), this.props.renderArrowPrev(this.onClickPrev, Z, this.props.labels.leftArrow), /* @__PURE__ */ t.default.createElement("div", {
          className: n.default.WRAPPER(!0, this.props.axis),
          style: V
        }, D ? /* @__PURE__ */ t.default.createElement(e.default, f({
          tagName: "ul",
          innerRef: this.setListRef
        }, K, {
          allowMouseEvents: this.props.emulateTouch
        }), this.props.infiniteLoop && U, this.renderItems(), this.props.infiniteLoop && J) : /* @__PURE__ */ t.default.createElement("ul", {
          className: n.default.SLIDER(!0, this.state.swiping),
          ref: function(ne) {
            return S.setListRef(ne);
          },
          style: this.state.itemListStyle || {}
        }, this.props.infiniteLoop && U, this.renderItems(), this.props.infiniteLoop && J)), this.props.renderArrowNext(this.onClickNext, L, this.props.labels.rightArrow), this.renderStatus()), this.renderThumbs());
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
    renderArrowPrev: function(x, I, R) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": R,
        className: n.default.ARROW_PREV(!I),
        onClick: x
      });
    },
    renderArrowNext: function(x, I, R) {
      return /* @__PURE__ */ t.default.createElement("button", {
        type: "button",
        "aria-label": R,
        className: n.default.ARROW_NEXT(!I),
        onClick: x
      });
    },
    renderIndicator: function(x, I, R, S) {
      return /* @__PURE__ */ t.default.createElement("li", {
        className: n.default.DOT(I),
        onClick: x,
        onKeyDown: x,
        value: R,
        key: R,
        role: "button",
        tabIndex: 0,
        "aria-label": "".concat(S, " ").concat(R + 1)
      });
    },
    renderItem: function(x) {
      return x;
    },
    renderThumbs: function(x) {
      var I = t.Children.map(x, function(R) {
        var S = R;
        if (R.type !== "img" && (S = t.Children.toArray(R.props.children).find(function(D) {
          return D.type === "img";
        })), !!S)
          return S;
      });
      return I.filter(function(R) {
        return R;
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
function iT() {
  return ym || (ym = 1), mm;
}
var bm;
function oT() {
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
    var e = i(rT()), n = iT(), r = i(Gv());
    function i(o) {
      return o && o.__esModule ? o : { default: o };
    }
  })(au)), au;
}
var sT = oT(), gu, vm;
function aT() {
  if (vm) return gu;
  vm = 1;
  var t = ii(), e = function() {
    return t.Date.now();
  };
  return gu = e, gu;
}
var mu, wm;
function lT() {
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
function cT() {
  if (xm) return yu;
  xm = 1;
  var t = lT(), e = /^\s+/;
  function n(r) {
    return r && r.slice(0, t(r) + 1).replace(e, "");
  }
  return yu = n, yu;
}
var bu, km;
function yh() {
  if (km) return bu;
  km = 1;
  var t = cT(), e = ao(), n = yl(), r = NaN, i = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, s = /^0o[0-7]+$/i, a = parseInt;
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
function Xv() {
  if (Sm) return vu;
  Sm = 1;
  var t = ao(), e = aT(), n = yh(), r = "Expected a function", i = Math.max, o = Math.min;
  function s(a, l, c) {
    var u, d, f, h, p, g, m = 0, y = !1, b = !1, T = !0;
    if (typeof a != "function")
      throw new TypeError(r);
    l = n(l) || 0, t(c) && (y = !!c.leading, b = "maxWait" in c, f = b ? i(n(c.maxWait) || 0, l) : f, T = "trailing" in c ? !!c.trailing : T);
    function A(I) {
      var R = u, S = d;
      return u = d = void 0, m = I, h = a.apply(S, R), h;
    }
    function v(I) {
      return m = I, p = setTimeout(P, l), y ? A(I) : h;
    }
    function M(I) {
      var R = I - g, S = I - m, D = l - R;
      return b ? o(D, f - S) : D;
    }
    function O(I) {
      var R = I - g, S = I - m;
      return g === void 0 || R >= l || R < 0 || b && S >= f;
    }
    function P() {
      var I = e();
      if (O(I))
        return k(I);
      p = setTimeout(P, M(I));
    }
    function k(I) {
      return p = void 0, T && u ? A(I) : (u = d = void 0, h);
    }
    function z() {
      p !== void 0 && clearTimeout(p), m = 0, u = g = d = p = void 0;
    }
    function C() {
      return p === void 0 ? h : k(e());
    }
    function x() {
      var I = e(), R = O(I);
      if (u = arguments, d = this, g = I, R) {
        if (p === void 0)
          return v(g);
        if (b)
          return clearTimeout(p), p = setTimeout(P, l), A(g);
      }
      return p === void 0 && (p = setTimeout(P, l)), h;
    }
    return x.cancel = z, x.flush = C, x;
  }
  return vu = s, vu;
}
var uT = Xv();
const Vv = /* @__PURE__ */ Ni(uT);
function rr(t, e, n, r, i = !1) {
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
const dT = Math.PI;
function Cm(t) {
  return t * dT / 180;
}
const Jv = (t, e, n) => ({
  x1: t - n / 2,
  y1: e - n / 2,
  x2: t + n / 2,
  y2: e + n / 2
}), Zv = (t, e, n, r, i) => {
  switch (t) {
    case "left":
      return Math.floor(e) + r + i / 2;
    case "center":
      return Math.floor(e + n / 2);
    case "right":
      return Math.floor(e + n) - r - i / 2;
  }
}, Qv = (t, e, n) => Math.min(t, e - n * 2), e1 = (t, e, n) => n.x1 <= t && t <= n.x2 && n.y1 <= e && e <= n.y2, bh = (t) => {
  const e = t.fgColor ?? "currentColor";
  return w.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    w.createElement("path", { d: "M12.7073 7.05029C7.87391 11.8837 10.4544 9.30322 6.03024 13.7273C5.77392 13.9836 5.58981 14.3071 5.50189 14.6587L4.52521 18.5655C4.38789 19.1148 4.88543 19.6123 5.43472 19.475L9.34146 18.4983C9.69313 18.4104 10.0143 18.2286 10.2706 17.9722L16.9499 11.2929", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" }),
    w.createElement("path", { d: "M20.4854 4.92901L19.0712 3.5148C18.2901 2.73375 17.0238 2.73375 16.2428 3.5148L14.475 5.28257C15.5326 7.71912 16.4736 8.6278 18.7176 9.52521L20.4854 7.75744C21.2665 6.97639 21.2665 5.71006 20.4854 4.92901Z", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", fill: "none", vectorEffect: "non-scaling-stroke" })
  );
}, fT = (t) => {
  const e = t.fgColor ?? "currentColor";
  return w.createElement(
    "svg",
    { viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
    w.createElement("path", { d: "M19 6L10.3802 17L5.34071 11.8758", vectorEffect: "non-scaling-stroke", stroke: e, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  );
};
function hT(t, e, n) {
  const [r, i] = w.useState(t), o = w.useRef(!0);
  w.useEffect(() => () => {
    o.current = !1;
  }, []);
  const s = w.useRef(Vv((a) => {
    o.current && i(a);
  }, n));
  return w.useLayoutEffect(() => {
    o.current && s.current(() => t());
  }, e), r;
}
const pT = "֑-߿יִ-﷽ﹰ-ﻼ", gT = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿‎Ⰰ-﬜︀-﹯﻽-￿", mT = new RegExp("^[^" + gT + "]*[" + pT + "]");
function vh(t) {
  return mT.test(t) ? "rtl" : "not-rtl";
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
function yT(t) {
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
function t1(t) {
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
function bT(t) {
  const e = w.useRef(t);
  return qo(t, e.current) || (e.current = t), e.current;
}
const vT = (t) => {
  const { urls: e, canWrite: n, onEditClick: r, renderImage: i } = t, o = e.filter((a) => a !== "");
  if (o.length === 0)
    return null;
  const s = o.length > 1;
  return w.createElement(
    jR,
    { "data-testid": "GDG-default-image-overlay-editor" },
    w.createElement(sT.Carousel, { showArrows: s, showThumbs: !1, swipeable: s, emulateTouch: s, infiniteLoop: s }, o.map((a) => {
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
function n1(t) {
  co = t;
}
var xs = { exec: () => null };
function nn(t, e = "") {
  let n = typeof t == "string" ? t : t.source, r = { replace: (i, o) => {
    let s = typeof o == "string" ? o : o.source;
    return s = s.replace(ir.caret, "$1"), n = n.replace(i, s), r;
  }, getRegex: () => new RegExp(n, e) };
  return r;
}
var wT = (() => {
  try {
    return !!new RegExp("(?<=1)(?<!1)");
  } catch {
    return !1;
  }
})(), ir = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (t) => new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}#`), htmlBeginRegex: (t) => new RegExp(`^ {0,${Math.min(3, t - 1)}}<(?:[a-z].*>|!--)`, "i") }, xT = /^(?:[ \t]*(?:\n|$))+/, kT = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, ST = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/, js = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, CT = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, xh = /(?:[*+-]|\d{1,9}[.)])/, r1 = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/, i1 = nn(r1).replace(/bull/g, xh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), RT = nn(r1).replace(/bull/g, xh).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), kh = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/, TT = /^[^\n]+/, Sh = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/, ET = nn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Sh).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(), MT = nn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, xh).getRegex(), Sl = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", Ch = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, IT = nn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", Ch).replace("tag", Sl).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), o1 = nn(kh).replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), AT = nn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", o1).getRegex(), Rh = { blockquote: AT, code: kT, def: ET, fences: ST, heading: CT, hr: js, html: IT, lheading: i1, list: MT, newline: xT, paragraph: o1, table: xs, text: TT }, Rm = nn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex(), _T = { ...Rh, lheading: RT, table: Rm, paragraph: nn(kh).replace("hr", js).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", Rm).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Sl).getRegex() }, PT = { ...Rh, html: nn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", Ch).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: xs, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: nn(kh).replace("hr", js).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", i1).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, DT = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, NT = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, s1 = /^( {2,}|\\)\n(?!\s*$)/, OT = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, Cl = /[\p{P}\p{S}]/u, Th = /[\s\p{P}\p{S}]/u, a1 = /[^\s\p{P}\p{S}]/u, zT = nn(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, Th).getRegex(), l1 = /(?!~)[\p{P}\p{S}]/u, LT = /(?!~)[\s\p{P}\p{S}]/u, $T = /(?:[^\s\p{P}\p{S}]|~)/u, FT = nn(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", wT ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), c1 = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/, HT = nn(c1, "u").replace(/punct/g, Cl).getRegex(), BT = nn(c1, "u").replace(/punct/g, l1).getRegex(), u1 = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", qT = nn(u1, "gu").replace(/notPunctSpace/g, a1).replace(/punctSpace/g, Th).replace(/punct/g, Cl).getRegex(), WT = nn(u1, "gu").replace(/notPunctSpace/g, $T).replace(/punctSpace/g, LT).replace(/punct/g, l1).getRegex(), jT = nn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, a1).replace(/punctSpace/g, Th).replace(/punct/g, Cl).getRegex(), KT = nn(/\\(punct)/, "gu").replace(/punct/g, Cl).getRegex(), UT = nn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), GT = nn(Ch).replace("(?:-->|$)", "-->").getRegex(), YT = nn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", GT).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Za = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/, XT = nn(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", Za).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(), d1 = nn(/^!?\[(label)\]\[(ref)\]/).replace("label", Za).replace("ref", Sh).getRegex(), f1 = nn(/^!?\[(ref)\](?:\[\])?/).replace("ref", Sh).getRegex(), VT = nn("reflink|nolink(?!\\()", "g").replace("reflink", d1).replace("nolink", f1).getRegex(), Tm = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, Eh = { _backpedal: xs, anyPunctuation: KT, autolink: UT, blockSkip: FT, br: s1, code: NT, del: xs, emStrongLDelim: HT, emStrongRDelimAst: qT, emStrongRDelimUnd: jT, escape: DT, link: XT, nolink: f1, punctuation: zT, reflink: d1, reflinkSearch: VT, tag: YT, text: OT, url: xs }, JT = { ...Eh, link: nn(/^!?\[(label)\]\((.*?)\)/).replace("label", Za).getRegex(), reflink: nn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Za).getRegex() }, Sf = { ...Eh, emStrongRDelimAst: WT, emStrongLDelim: BT, url: nn(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", Tm).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: nn(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", Tm).getRegex() }, ZT = { ...Sf, br: nn(s1).replace("{2,}", "*").getRegex(), text: nn(Sf.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, Ra = { normal: Rh, gfm: _T, pedantic: PT }, ls = { normal: Eh, gfm: Sf, breaks: ZT, pedantic: JT }, QT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Em = (t) => QT[t];
function Qr(t, e) {
  if (e) {
    if (ir.escapeTest.test(t)) return t.replace(ir.escapeReplace, Em);
  } else if (ir.escapeTestNoEncode.test(t)) return t.replace(ir.escapeReplaceNoEncode, Em);
  return t;
}
function Mm(t) {
  try {
    t = encodeURI(t).replace(ir.percentDecode, "%");
  } catch {
    return null;
  }
  return t;
}
function Im(t, e) {
  var o;
  let n = t.replace(ir.findPipe, (s, a, l) => {
    let c = !1, u = a;
    for (; --u >= 0 && l[u] === "\\"; ) c = !c;
    return c ? "|" : " |";
  }), r = n.split(ir.splitPipe), i = 0;
  if (r[0].trim() || r.shift(), r.length > 0 && !((o = r.at(-1)) != null && o.trim()) && r.pop(), e) if (r.length > e) r.splice(e);
  else for (; r.length < e; ) r.push("");
  for (; i < r.length; i++) r[i] = r[i].trim().replace(ir.slashPipe, "|");
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
function eE(t, e) {
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
function tE(t, e, n) {
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
    Je(this, "options");
    Je(this, "rules");
    Je(this, "lexer");
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
      let n = e[0], r = tE(n, e[3] || "", this.rules);
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
            let M = t.split(`
`, 1)[0], O;
            if (f = M, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), O = f) : O = f.replace(this.rules.other.tabCharGlobal, "    "), T.test(f) || A.test(f) || v.test(f) || y.test(f) || b.test(f)) break;
            if (O.search(this.rules.other.nonSpaceChar) >= p || !f.trim()) u += `
` + O.slice(p);
            else {
              if (h || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || T.test(d) || A.test(d) || b.test(d)) break;
              u += `
` + f;
            }
            !h && !f.trim() && (h = !0), c += M + `
`, t = t.substring(M.length + 1), d = O.slice(p);
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
        let o = eE(e[2], "()");
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
    Je(this, "tokens");
    Je(this, "options");
    Je(this, "state");
    Je(this, "tokenizer");
    Je(this, "inlineQueue");
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || co, this.options.tokenizer = this.options.tokenizer || new Qa(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, top: !0 };
    let n = { other: ir, block: Ra.normal, inline: ls.normal };
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
    e = e.replace(ir.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let n = 0; n < this.inlineQueue.length; n++) {
      let r = this.inlineQueue[n];
      this.inlineTokens(r.src, r.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, n = [], r = !1) {
    var i, o, s;
    for (this.options.pedantic && (e = e.replace(ir.tabCharGlobal, "    ").replace(ir.spaceLine, "")); e; ) {
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
    Je(this, "options");
    Je(this, "parser");
    this.options = t || co;
  }
  space(t) {
    return "";
  }
  code({ text: t, lang: e, escaped: n }) {
    var o;
    let r = (o = (e || "").match(ir.notSpaceStart)) == null ? void 0 : o[0], i = t.replace(ir.endingNewline, "") + `
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
    Je(this, "options");
    Je(this, "renderer");
    Je(this, "textRenderer");
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
    Je(this, "options");
    Je(this, "block");
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
}, Je(Aa, "passThroughHooks", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"])), Je(Aa, "passThroughHooksRespectAsync", /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"])), Aa), nE = class {
  constructor(...t) {
    Je(this, "defaults", wh());
    Je(this, "options", this.setOptions);
    Je(this, "parse", this.parseMarkdown(!0));
    Je(this, "parseInline", this.parseMarkdown(!1));
    Je(this, "Parser", Hr);
    Je(this, "Renderer", el);
    Je(this, "TextRenderer", Mh);
    Je(this, "Lexer", Fr);
    Je(this, "Tokenizer", Qa);
    Je(this, "Hooks", ms);
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
}, ro = new nE();
function fn(t, e) {
  return ro.parse(t, e);
}
fn.options = fn.setOptions = function(t) {
  return ro.setOptions(t), fn.defaults = ro.defaults, n1(fn.defaults), fn;
};
fn.getDefaults = wh;
fn.defaults = co;
fn.use = function(...t) {
  return ro.use(...t), fn.defaults = ro.defaults, n1(fn.defaults), fn;
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
const rE = /* @__PURE__ */ xr("div")({
  name: "MarkdownContainer",
  class: "gdg-mnuv029",
  propsAsIs: !1
});
class iE extends Mt.PureComponent {
  constructor() {
    super(...arguments);
    Je(this, "targetElement", null);
    Je(this, "containerRefHook", (n) => {
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
    return this.renderMarkdownIntoDiv(), Mt.createElement(rE, { ref: this.containerRefHook });
  }
}
const oE = /* @__PURE__ */ xr("textarea")({
  name: "InputBox",
  class: "gdg-izpuzkl",
  propsAsIs: !1
}), sE = /* @__PURE__ */ xr("div")({
  name: "ShadowBox",
  class: "gdg-s69h75o",
  propsAsIs: !1
}), aE = /* @__PURE__ */ xr("div")({
  name: "GrowingEntryStyle",
  class: "gdg-g1y0xocz",
  propsAsIs: !1
});
let _m = 0;
const Ks = (t) => {
  const { placeholder: e, value: n, onKeyDown: r, highlight: i, altNewline: o, validatedSelection: s, ...a } = t, { onChange: l, className: c } = a, u = w.useRef(null), d = n ?? "";
  yr(l !== void 0, "GrowingEntry must be a controlled input area");
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
    aE,
    { className: "gdg-growing-entry" },
    w.createElement(sE, { className: c }, d + `
`),
    w.createElement(oE, { ...a, className: (c ?? "") + " gdg-input", id: f, ref: u, onKeyDown: h, value: d, placeholder: e, dir: "auto" })
  );
}, wu = {};
let Ri = null;
function lE() {
  const t = document.createElement("div");
  return t.style.opacity = "0", t.style.pointerEvents = "none", t.style.position = "fixed", document.body.append(t), t;
}
function Tf(t) {
  const e = t.toLowerCase().trim();
  if (wu[e] !== void 0)
    return wu[e];
  Ri = Ri || lE(), Ri.style.color = "#000", Ri.style.color = e;
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
  const i = br(t, e);
  return Pm.set(n, i), i;
}
function br(t, e) {
  if (e === void 0)
    return t;
  const [n, r, i, o] = Tf(t);
  if (o === 1)
    return t;
  const [s, a, l, c] = Tf(e), u = o + c * (1 - o), d = (o * n + c * s * (1 - o)) / u, f = (o * r + c * a * (1 - o)) / u, h = (o * i + c * l * (1 - o)) / u;
  return `rgba(${d}, ${f}, ${h}, ${u})`;
}
var Mo = /* @__PURE__ */ new Map(), Po = /* @__PURE__ */ new Map(), Ef = /* @__PURE__ */ new Map();
function cE() {
  Mo.clear(), Ef.clear(), Po.clear();
}
function uE(t, e, n, r, i) {
  var o, s, a;
  let l = 0, c = {};
  for (let d of t) l += (o = n.get(d)) != null ? o : i, c[d] = ((s = c[d]) != null ? s : 0) + 1;
  let u = e - l;
  for (let d of Object.keys(c)) {
    let f = c[d], h = (a = n.get(d)) != null ? a : i, p = h * f / l, g = u * p * r / f, m = h + g;
    n.set(d, m);
  }
}
function dE(t, e) {
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
    if (c === void 0 && (c = dE(t, s.size), Ef.set(n, c)), s.count > 5e5) {
      let d = 0;
      for (let f of e) d += (i = c.get(f)) != null ? i : s.size;
      return d * 1.01;
    }
    let u = t.measureText(e);
    return uE(e, u.width, c, Math.max(0.05, 1 - s.count / 2e5), s.size), Po.set(n, { count: s.count + e.length, size: s.size }), u.width;
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
function fE(t, e, n, r, i, o, s, a) {
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
function hE(t, e, n, r, i, o) {
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
        let m = fE(t, h, r, n, p, g, f), y = h.slice(0, Math.max(0, m));
        h = h.slice(y.length), l.push(y), p = ks(t, h.slice(0, Math.max(0, d)), n, f), g = Math.min(h.length, d);
      }
      p > 0 && l.push(h);
    }
  }
  return l = l.map((h, p) => p === 0 ? h.trimEnd() : h.trim()), Mo.set(s, l), Mo.size > 500 && Mo.delete(Mo.keys().next().value), l;
}
function pE(t, e) {
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
function gE(t, e) {
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
function mE(t, e, n) {
  return n.current === void 0 || t[1] !== n.current.cell[1] ? !1 : e.span === void 0 ? n.current.cell[0] === t[0] : n.current.cell[0] >= e.span[0] && n.current.cell[0] <= e.span[1];
}
function h1(t, e) {
  const [n, r] = t;
  return n >= e.x && n < e.x + e.width && r >= e.y && r < e.y + e.height;
}
function Ss(t, e) {
  return (t == null ? void 0 : t[0]) === (e == null ? void 0 : e[0]) && (t == null ? void 0 : t[1]) === (e == null ? void 0 : e[1]);
}
function p1(t) {
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
function yE(t, e, n, r) {
  let i = 0;
  if (n.current === void 0)
    return i;
  const o = n.current.range;
  (r || o.height * o.width > 1) && Nm(t, e, o) && i++;
  for (const s of n.current.rangeStack)
    Nm(t, e, s) && i++;
  return i;
}
function g1(t, e) {
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
  const r = g1(t, e);
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
  const o = g1(t, r), s = [];
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
function bE(t, e, n) {
  let r = 0;
  for (const i of e) {
    const o = i.sticky ? r : r + (n ?? 0);
    if (t <= o + i.width)
      return i.sourceIndex;
    r += i.width;
  }
  return -1;
}
function vE(t, e, n, r, i, o, s, a, l, c) {
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
const wE = typeof window > "u";
async function xE() {
  var t;
  wE || ((t = document == null ? void 0 : document.fonts) == null ? void 0 : t.ready) === void 0 || (await document.fonts.ready, Oa = 0, Cs = {}, cE());
}
xE();
function m1(t, e, n, r) {
  return `${t}_${r ?? (e == null ? void 0 : e.font)}_${n}`;
}
function Ko(t, e, n, r = "middle") {
  const i = m1(t, e, r, n);
  let o = Cs[i];
  return o === void 0 && (o = e.measureText(t), Cs[i] = o, Oa++), Oa > 1e4 && (Cs = {}, Oa = 0), o;
}
function y1(t, e) {
  const n = m1(t, void 0, "middle", e);
  return Cs[n];
}
function Oi(t, e) {
  return typeof e != "string" && (e = e.baseFontFull), kE(t, e);
}
function Om(t, e) {
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  t.save(), t.textBaseline = e;
  const r = t.measureText(n);
  return t.restore(), r;
}
const zm = [];
function kE(t, e) {
  for (const o of zm)
    if (o.key === e)
      return o.val;
  const n = Om(t, "alphabetic"), i = -(Om(t, "middle").actualBoundingBoxDescent - n.actualBoundingBoxDescent) + n.actualBoundingBoxAscent / 2;
  return zm.push({
    key: e,
    val: i
  }), i;
}
function SE(t, e, n, r, i, o) {
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
function b1(t, e, n, r, i, o, s, a, l) {
  l === "right" ? t.fillText(e, n + i - (a.cellHorizontalPadding + 0.5), r + o / 2 + s) : l === "center" ? t.fillText(e, n + i / 2, r + o / 2 + s) : t.fillText(e, n + a.cellHorizontalPadding + 0.5, r + o / 2 + s);
}
function v1(t, e) {
  const n = Ko("ABCi09jgqpy", t, e);
  return n.actualBoundingBoxAscent + n.actualBoundingBoxDescent;
}
function CE(t, e) {
  t.includes(`
`) && (t = t.split(/\r?\n/, 1)[0]);
  const n = e / 4;
  return t.length > n && (t = t.slice(0, n)), t;
}
function RE(t, e, n, r, i, o, s, a, l, c) {
  const u = a.baseFontFull, d = hE(t, e, u, i - a.cellHorizontalPadding * 2, c ?? !1), f = v1(t, u), h = a.lineHeight * f, p = f + h * (d.length - 1), g = p + a.cellVerticalPadding > o;
  g && (t.save(), t.rect(n, r, i, o), t.clip());
  const m = r + o / 2 - p / 2;
  let y = Math.max(r + a.cellVerticalPadding, m);
  for (const b of d)
    if (b1(t, b, n, y, i, f, s, a, l), y += h, y > r + o)
      break;
  g && t.restore();
}
function li(t, e, n, r, i) {
  const { ctx: o, rect: s, theme: a } = t, { x: l, y: c, width: u, height: d } = s;
  r = r ?? !1, r || (e = CE(e, u));
  const f = Oi(o, a), h = vh(e) === "rtl";
  if (n === void 0 && h && (n = "right"), h && (o.direction = "rtl"), e.length > 0) {
    let p = !1;
    n === "right" ? (o.textAlign = "right", p = !0) : n !== void 0 && n !== "left" && (o.textAlign = n, p = !0), r ? RE(o, e, l, c, u, d, f, a, n, i) : b1(o, e, l, c, u, d, f, a, n), p && (o.textAlign = "start"), h && (o.direction = "inherit");
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
function TE(t, e, n) {
  t.arc(e, n - 1.25 * 3.5, 1.25, 0, 2 * Math.PI, !1), t.arc(e, n, 1.25, 0, 2 * Math.PI, !1), t.arc(e, n + 1.25 * 3.5, 1.25, 0, 2 * Math.PI, !1);
}
function EE(t, e, n) {
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
      const v = Wo(h), M = g.x - v;
      M < 0 && (g.x -= M, g.width += M), g.x + g.width > n && (g.width = n - g.x);
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
function w1(t) {
  return t % Ih;
}
function Ah(t) {
  return Math.floor(t / Ih) - 2;
}
function _h(t) {
  const e = w1(t), n = Ah(t);
  return [e, n];
}
class x1 {
  constructor() {
    Je(this, "visibleWindow", {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
    Je(this, "freezeCols", 0);
    Je(this, "freezeRows", []);
    Je(this, "isInWindow", (e) => {
      const n = w1(e), r = Ah(e), i = this.visibleWindow, o = n >= i.x && n <= i.x + i.width || n < this.freezeCols, s = r >= i.y && r <= i.y + i.height || this.freezeRows.includes(r);
      return o && s;
    });
  }
  setWindow(e, n, r) {
    this.visibleWindow.x === e.x && this.visibleWindow.y === e.y && this.visibleWindow.width === e.width && this.visibleWindow.height === e.height && this.freezeCols === n && qo(this.freezeRows, r) || (this.visibleWindow = e, this.freezeCols = n, this.freezeRows = r, this.clearOutOfWindow());
  }
}
class ME extends x1 {
  constructor() {
    super(...arguments);
    Je(this, "cache", /* @__PURE__ */ new Map());
    Je(this, "setValue", (n, r) => {
      this.cache.set(qr(n[0], n[1]), r);
    });
    Je(this, "getValue", (n) => this.cache.get(qr(n[0], n[1])));
    Je(this, "clearOutOfWindow", () => {
      for (const [n] of this.cache.entries())
        this.isInWindow(n) || this.cache.delete(n);
    });
  }
}
class Rs {
  constructor(e = []) {
    Je(this, "cells");
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
function IE(t) {
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
const k1 = {
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
  return k1;
}
const AE = Mt.createContext(k1);
function fi(t, ...e) {
  const n = { ...t };
  for (const r of e)
    if (r !== void 0)
      for (const i in r)
        r.hasOwnProperty(i) && (i === "bgCell" ? n[i] = br(r[i], n[i]) : n[i] = r[i]);
  return (n.headerFontFull === void 0 || t.fontFamily !== n.fontFamily || t.headerFontStyle !== n.headerFontStyle) && (n.headerFontFull = `${n.headerFontStyle} ${n.fontFamily}`), (n.baseFontFull === void 0 || t.fontFamily !== n.fontFamily || t.baseFontStyle !== n.baseFontStyle) && (n.baseFontFull = `${n.baseFontStyle} ${n.fontFamily}`), (n.markerFontFull === void 0 || t.fontFamily !== n.fontFamily || t.markerFontStyle !== n.markerFontStyle) && (n.markerFontFull = `${n.markerFontStyle} ${n.fontFamily}`), n;
}
const Af = 150;
function _E(t, e, n, r) {
  var o;
  const i = r(e);
  return ((o = i == null ? void 0 : i.measure) == null ? void 0 : o.call(i, t, e, n)) ?? Af;
}
function S1(t, e, n, r, i, o, s, a, l) {
  let c = 0;
  const u = i === void 0 ? [] : i.map((h) => {
    const p = _E(t, h[r], e, l);
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
function PE(t, e, n, r, i, o, s, a, l) {
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
    }, M = {
      x: 0,
      y: c.current - 1,
      width: t.length,
      height: 1
    };
    (async () => {
      const P = b(v, l.signal), k = A > 0 ? b(M, l.signal) : void 0;
      let z;
      typeof P == "object" ? z = P : z = await jg(P), k !== void 0 && (typeof k == "object" ? z = [...z, ...k] : z = [...z, ...await jg(k)]), g.current = t, y(z);
    })();
  }, [l.signal, t]), w.useMemo(() => {
    let T = t.every(va) ? t : h === null ? t.map((O) => va(O) ? O : {
      ...O,
      width: Af
    }) : (h.font = d.current.baseFontFull, t.map((O, P) => {
      if (va(O))
        return O;
      if (p.current[O.id] !== void 0)
        return {
          ...O,
          width: p.current[O.id]
        };
      if (m === void 0 || g.current !== t || O.id === void 0)
        return {
          ...O,
          width: Af
        };
      const k = S1(h, s, O, P, m, i, o, !0, a);
      return p.current[O.id] = k.width, k;
    })), A = 0, v = 0;
    const M = [];
    for (const [O, P] of T.entries())
      A += P.width, P.grow !== void 0 && P.grow > 0 && (v += P.grow, M.push(O));
    if (A < r && M.length > 0) {
      const O = [...T], P = r - A;
      let k = P;
      for (let z = 0; z < M.length; z++) {
        const C = M[z], x = (T[C].grow ?? 0) / v, I = z === M.length - 1 ? k : Math.min(k, Math.floor(P * x));
        O[C] = {
          ...T[C],
          growOffset: I,
          width: T[C].width + I
        }, k -= I;
      }
      T = O;
    }
    return {
      sizedColumns: T,
      nonGrowWidth: A
    };
  }, [r, t, h, m, s, i, o, a]);
}
var xu, Lm;
function DE() {
  if (Lm) return xu;
  Lm = 1;
  function t(e, n, r) {
    return e === e && (r !== void 0 && (e = e <= r ? e : r), n !== void 0 && (e = e >= n ? e : n)), e;
  }
  return xu = t, xu;
}
var ku, $m;
function NE() {
  if ($m) return ku;
  $m = 1;
  var t = DE(), e = yh();
  function n(r, i, o) {
    return o === void 0 && (o = i, i = void 0), o !== void 0 && (o = e(o), o = o === o ? o : 0), i !== void 0 && (i = e(i), i = i === i ? i : 0), t(e(r), i, o);
  }
  return ku = n, ku;
}
var OE = NE();
const Er = /* @__PURE__ */ Ni(OE);
var Su, Fm;
function zE() {
  if (Fm) return Su;
  Fm = 1;
  var t = "__lodash_hash_undefined__";
  function e(n) {
    return this.__data__.set(n, t), this;
  }
  return Su = e, Su;
}
var Cu, Hm;
function LE() {
  if (Hm) return Cu;
  Hm = 1;
  function t(e) {
    return this.__data__.has(e);
  }
  return Cu = t, Cu;
}
var Ru, Bm;
function C1() {
  if (Bm) return Ru;
  Bm = 1;
  var t = ch(), e = zE(), n = LE();
  function r(i) {
    var o = -1, s = i == null ? 0 : i.length;
    for (this.__data__ = new t(); ++o < s; )
      this.add(i[o]);
  }
  return r.prototype.add = r.prototype.push = e, r.prototype.has = n, Ru = r, Ru;
}
var Tu, qm;
function $E() {
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
function FE() {
  if (Wm) return Eu;
  Wm = 1;
  function t(e) {
    return e !== e;
  }
  return Eu = t, Eu;
}
var Mu, jm;
function HE() {
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
function BE() {
  if (Km) return Iu;
  Km = 1;
  var t = $E(), e = FE(), n = HE();
  function r(i, o, s) {
    return o === o ? n(i, o, s) : t(i, e, s);
  }
  return Iu = r, Iu;
}
var Au, Um;
function qE() {
  if (Um) return Au;
  Um = 1;
  var t = BE();
  function e(n, r) {
    var i = n == null ? 0 : n.length;
    return !!i && t(n, r, 0) > -1;
  }
  return Au = e, Au;
}
var _u, Gm;
function WE() {
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
function R1() {
  if (Ym) return Pu;
  Ym = 1;
  function t(e, n) {
    return e.has(n);
  }
  return Pu = t, Pu;
}
var Du, Xm;
function T1() {
  if (Xm) return Du;
  Xm = 1;
  var t = lo(), e = ii(), n = t(e, "Set");
  return Du = n, Du;
}
var Nu, Vm;
function jE() {
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
function KE() {
  if (Zm) return zu;
  Zm = 1;
  var t = T1(), e = jE(), n = Dh(), r = 1 / 0, i = t && 1 / n(new t([, -0]))[1] == r ? function(o) {
    return new t(o);
  } : e;
  return zu = i, zu;
}
var Lu, Qm;
function UE() {
  if (Qm) return Lu;
  Qm = 1;
  var t = C1(), e = qE(), n = WE(), r = R1(), i = KE(), o = Dh(), s = 200;
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
function GE() {
  if (e0) return $u;
  e0 = 1;
  var t = UE();
  function e(n) {
    return n && n.length ? t(n) : [];
  }
  return $u = e, $u;
}
var YE = GE();
const XE = /* @__PURE__ */ Ni(YE);
var Fu, t0;
function E1() {
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
function VE() {
  if (n0) return Hu;
  n0 = 1;
  var t = Bs(), e = uh(), n = ri(), r = t ? t.isConcatSpreadable : void 0;
  function i(o) {
    return n(o) || e(o) || !!(r && o && o[r]);
  }
  return Hu = i, Hu;
}
var Bu, r0;
function JE() {
  if (r0) return Bu;
  r0 = 1;
  var t = E1(), e = VE();
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
function ZE() {
  if (i0) return qu;
  i0 = 1;
  var t = JE();
  function e(n) {
    var r = n == null ? 0 : n.length;
    return r ? t(n, 1) : [];
  }
  return qu = e, qu;
}
var QE = ZE();
const o0 = /* @__PURE__ */ Ni(QE);
var Wu, s0;
function eM() {
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
  var t = zv(), e = fh();
  function n(r) {
    return r != null && e(r.length) && !t(r);
  }
  return ju = n, ju;
}
var Ku, l0;
function tM() {
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
function nM() {
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
function rM() {
  if (u0) return Gu;
  u0 = 1;
  var t = eM(), e = tM(), n = nM();
  function r(i) {
    return function(o, s, a) {
      return a && typeof a != "number" && e(o, s, a) && (s = a = void 0), o = n(o), s === void 0 ? (s = o, o = 0) : s = n(s), a = a === void 0 ? o < s ? 1 : -1 : n(a), t(o, s, a, i);
    };
  }
  return Gu = r, Gu;
}
var Yu, d0;
function iM() {
  if (d0) return Yu;
  d0 = 1;
  var t = rM(), e = t();
  return Yu = e, Yu;
}
var oM = iM();
const Yi = /* @__PURE__ */ Ni(oM), kn = '<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">', sM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}<rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/><path d="M15.75 4h-1.5a.25.25 0 0 0-.177.074L9.308 8.838a3.75 3.75 0 1 0 1.854 1.854l1.155-1.157.967.322a.5.5 0 0 0 .65-.55l-.18-1.208.363-.363.727.331a.5.5 0 0 0 .69-.59l-.254-.904.647-.647A.25.25 0 0 0 16 5.75v-1.5a.25.25 0 0 0-.25-.25zM7.5 13.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0z" fill="${e}"/></svg>`;
}, aM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}<rect x="2" y="2" width="16" height="16" rx="4" fill="${n}"/><path d="m12.223 13.314 3.052-2.826a.65.65 0 0 0 0-.984l-3.052-2.822c-.27-.25-.634-.242-.865.022-.232.263-.206.636.056.882l2.601 2.41-2.601 2.41c-.262.245-.288.619-.056.882.231.263.595.277.865.026Zm-4.444.005c.266.25.634.241.866-.027.231-.263.206-.636-.06-.882L5.983 10l2.602-2.405c.266-.25.291-.62.06-.887-.232-.263-.596-.272-.866-.022L4.723 9.51a.653.653 0 0 0 0 .983l3.056 2.827Z" fill="${e}"/></svg>`;
}, lM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M6.52 12.78H5.51V8.74l-1.33.47v-.87l2.29-.83h.05v5.27zm5.2 0H8.15v-.69l1.7-1.83a6.38 6.38 0 0 0 .34-.4c.09-.11.16-.22.22-.32s.1-.19.12-.27a.9.9 0 0 0 0-.56.63.63 0 0 0-.15-.23.58.58 0 0 0-.22-.15.75.75 0 0 0-.29-.05c-.27 0-.48.08-.62.23a.95.95 0 0 0-.2.65H8.03c0-.24.04-.46.13-.67a1.67 1.67 0 0 1 .97-.91c.23-.1.49-.14.77-.14.26 0 .5.04.7.11.21.08.38.18.52.32.14.13.25.3.32.48a1.74 1.74 0 0 1 .03 1.13 2.05 2.05 0 0 1-.24.47 4.16 4.16 0 0 1-.35.47l-.47.5-1 1.05h2.32v.8zm1.8-3.08h.55c.28 0 .48-.06.61-.2a.76.76 0 0 0 .2-.55.8.8 0 0 0-.05-.28.56.56 0 0 0-.13-.22.6.6 0 0 0-.23-.15.93.93 0 0 0-.32-.05.92.92 0 0 0-.29.05.72.72 0 0 0-.23.12.57.57 0 0 0-.21.46H12.4a1.3 1.3 0 0 1 .5-1.04c.15-.13.33-.23.54-.3a2.48 2.48 0 0 1 1.4 0c.2.06.4.15.55.28.15.13.27.28.36.47.08.19.13.4.13.65a1.15 1.15 0 0 1-.2.65 1.36 1.36 0 0 1-.58.49c.15.05.28.12.38.2a1.14 1.14 0 0 1 .43.62c.03.13.05.26.05.4 0 .25-.05.47-.14.66a1.42 1.42 0 0 1-.4.49c-.16.13-.35.23-.58.3a2.51 2.51 0 0 1-.73.1c-.22 0-.44-.03-.65-.09a1.8 1.8 0 0 1-.57-.28 1.43 1.43 0 0 1-.4-.47 1.41 1.41 0 0 1-.15-.66h1a.66.66 0 0 0 .22.5.87.87 0 0 0 .58.2c.25 0 .45-.07.6-.2a.71.71 0 0 0 .21-.56.97.97 0 0 0-.06-.36.61.61 0 0 0-.18-.25.74.74 0 0 0-.28-.15 1.33 1.33 0 0 0-.37-.04h-.55V9.7z" fill="${e}"/>
  </svg>`;
}, cM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M8.182 12.4h3.636l.655 1.6H14l-3.454-8H9.455L6 14h1.527l.655-1.6zM10 7.44l1.36 3.651H8.64L10 7.441z" fill="${e}"/>
</svg>`;
}, uM = (t) => {
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
}, M1 = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
<path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.29 4.947a3.368 3.368 0 014.723.04 3.375 3.375 0 01.041 4.729l-.009.009-1.596 1.597a3.367 3.367 0 01-5.081-.364.71.71 0 011.136-.85 1.95 1.95 0 002.942.21l1.591-1.593a1.954 1.954 0 00-.027-2.733 1.95 1.95 0 00-2.732-.027l-.91.907a.709.709 0 11-1.001-1.007l.915-.911.007-.007z" fill="${e}"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.55 8.678a3.368 3.368 0 015.082.364.71.71 0 01-1.136.85 1.95 1.95 0 00-2.942-.21l-1.591 1.593a1.954 1.954 0 00.027 2.733 1.95 1.95 0 002.73.028l.906-.906a.709.709 0 111.003 1.004l-.91.91-.008.01a3.368 3.368 0 01-4.724-.042 3.375 3.375 0 01-.041-4.728l.009-.009L6.55 8.678z" fill="${e}"/>
</svg>
  `;
}, dM = (t) => {
  const e = t.bgColor;
  return `${kn}
    <path stroke="${e}" stroke-width="2" d="M12 3v14"/>
    <path stroke="${e}" stroke-width="2" stroke-linecap="round" d="M10 4h4m-4 12h4"/>
    <path d="M11 14h4a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4v2h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4v2ZM9.5 8H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5v2H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h4.5v2Z" fill="${e}"/>
  </svg>
`;
}, fM = M1, hM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 13.138a.5.5 0 00.748.434l5.492-3.138a.5.5 0 000-.868L7.748 6.427A.5.5 0 007 6.862v6.276z" fill="${e}"/>
</svg>`;
}, pM = (t) => {
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
}, gM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path opacity=".5" fill-rule="evenodd" clip-rule="evenodd" d="M12.499 10.801a.5.5 0 01.835 0l2.698 4.098a.5.5 0 01-.418.775H10.22a.5.5 0 01-.417-.775l2.697-4.098z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.07 8.934a.5.5 0 01.824 0l4.08 5.958a.5.5 0 01-.412.782h-8.16a.5.5 0 01-.413-.782l4.08-5.958zM13.75 8.333a2.083 2.083 0 100-4.166 2.083 2.083 0 000 4.166z" fill="${e}"/>
</svg>`;
}, mM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path fill="${e}" d="M3 3h14v14H3z"/>
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2zm-7.24 9.78h1.23c.15 0 .27.06.36.18l.98 1.28a.43.43 0 0 1-.05.58l-1.2 1.21a.45.45 0 0 1-.6.04A6.72 6.72 0 0 1 7.33 10c0-.61.1-1.2.25-1.78a6.68 6.68 0 0 1 2.12-3.3.44.44 0 0 1 .6.04l1.2 1.2c.16.17.18.42.05.59l-.98 1.29a.43.43 0 0 1-.36.17H8.98A5.38 5.38 0 0 0 8.67 10c0 .62.11 1.23.3 1.79z" fill="${n}"/>
  </svg>`;
}, yM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="m13.49 13.15-2.32-3.27h1.4V7h1.86v2.88h1.4l-2.34 3.27zM11 13H9v-3l-1.5 1.92L6 10v3H4V7h2l1.5 2L9 7h2v6z" fill="${e}"/>
  </svg>`;
}, bM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M14.8 4.182h-.6V3H13v1.182H7V3H5.8v1.182h-.6c-.66 0-1.2.532-1.2 1.182v9.454C4 15.468 4.54 16 5.2 16h9.6c.66 0 1.2-.532 1.2-1.182V5.364c0-.65-.54-1.182-1.2-1.182zm0 10.636H5.2V7.136h9.6v7.682z" fill="${e}"/>
</svg>`;
}, vM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 4a6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6 6 6 0 0 0-6-6zm0 10.8A4.8 4.8 0 0 1 5.2 10a4.8 4.8 0 1 1 4.8 4.8z" fill="${e}"/>
    <path d="M10 7H9v3.93L12.5 13l.5-.8-3-1.76V7z" fill="${e}"/>
  </svg>`;
}, wM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10 8.643a1.357 1.357 0 100 2.714 1.357 1.357 0 000-2.714zM7.357 10a2.643 2.643 0 115.286 0 2.643 2.643 0 01-5.286 0z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.589 4.898A5.643 5.643 0 0115.643 10v.5a2.143 2.143 0 01-4.286 0V8a.643.643 0 011.286 0v2.5a.857.857 0 001.714 0V10a4.357 4.357 0 10-1.708 3.46.643.643 0 01.782 1.02 5.643 5.643 0 11-5.842-9.582z" fill="${e}"/>
</svg>`;
}, xM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="8" width="10" height="8" rx="2" fill="${n}"/>
    <rect x="8" y="4" width="10" height="8" rx="2" fill="${n}"/>
    <path d="M10.68 7.73V6l2.97 3.02-2.97 3.02v-1.77c-2.13 0-3.62.7-4.68 2.2.43-2.15 1.7-4.31 4.68-4.74z" fill="${e}"/>
  </svg>`;
}, kM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path fill="${e}" d="M4 3h12v14H4z"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.6 2A1.6 1.6 0 002 3.6v12.8A1.6 1.6 0 003.6 18h12.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0016.4 2H3.6zm11.3 10.8a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7h-1.4a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.6-.693.117.117 0 00.1-.115V10.35a.117.117 0 00-.117-.116h-2.8a.117.117 0 00-.117.116v2.333c0 .064.053.117.117.117h.117a.7.7 0 01.7.7v1.4a.7.7 0 01-.7.7H9.3a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.117a.117.117 0 00.117-.117V10.35a.117.117 0 00-.117-.117h-2.8a.117.117 0 00-.117.117v2.342c0 .058.042.106.1.115a.7.7 0 01.6.693v1.4a.7.7 0 01-.7.7H5.1a.7.7 0 01-.7-.7v-1.4a.7.7 0 01.7-.7h.35a.116.116 0 00.116-.117v-2.45c0-.515.418-.933.934-.933h2.917a.117.117 0 00.117-.117V6.85a.117.117 0 00-.117-.116h-2.45a.7.7 0 01-.7-.7V5.1a.7.7 0 01.7-.7h6.067a.7.7 0 01.7.7v.934a.7.7 0 01-.7.7h-2.45a.117.117 0 00-.118.116v2.333c0 .064.053.117.117.117H13.5c.516 0 .934.418.934.934v2.45c0 .063.052.116.116.116h.35z" fill="${n}"/>
</svg>`;
}, SM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M9.98 13.33c.45 0 .74-.3.73-.75l-.01-.1-.16-1.67 1.45 1.05a.81.81 0 0 0 .5.18c.37 0 .72-.32.72-.76 0-.3-.17-.54-.49-.68l-1.63-.77 1.63-.77c.32-.14.49-.37.49-.67 0-.45-.34-.76-.71-.76a.81.81 0 0 0-.5.18l-1.47 1.03.16-1.74.01-.08c.01-.46-.27-.76-.72-.76-.46 0-.76.32-.75.76l.01.08.16 1.74-1.47-1.03a.77.77 0 0 0-.5-.18.74.74 0 0 0-.72.76c0 .3.17.53.49.67l1.63.77-1.62.77c-.32.14-.5.37-.5.68 0 .44.35.75.72.75a.78.78 0 0 0 .5-.17L9.4 10.8l-.16 1.68v.09c-.02.44.28.75.74.75z" fill="${e}"/>
  </svg>`;
}, CM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M8 5.83H5.83a.83.83 0 0 0 0 1.67h1.69A4.55 4.55 0 0 1 8 5.83zm-.33 3.34H5.83a.83.83 0 0 0 0 1.66h2.72a4.57 4.57 0 0 1-.88-1.66zM5.83 12.5a.83.83 0 0 0 0 1.67h7.5a.83.83 0 1 0 0-1.67h-7.5zm8.8-2.9a3.02 3.02 0 0 0 .46-1.6c0-1.66-1.32-3-2.94-3C10.52 5 9.2 6.34 9.2 8s1.31 3 2.93 3c.58 0 1.11-.17 1.56-.47l2.04 2.08.93-.94-2.04-2.08zm-2.48.07c-.9 0-1.63-.75-1.63-1.67s.73-1.67 1.63-1.67c.9 0 1.63.75 1.63 1.67s-.73 1.67-1.63 1.67z" fill="${e}"/>
  </svg>`;
}, RM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M7.676 4.726V3l2.976 3.021-2.976 3.022v-1.77c-2.125 0-3.613.69-4.676 2.201.425-2.158 1.7-4.316 4.676-4.748zM10.182 14.4h3.636l.655 1.6H16l-3.454-8h-1.091L8 16h1.527l.655-1.6zM12 9.44l1.36 3.65h-2.72L12 9.44z" fill="${e}"/>
</svg>`;
}, TM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.167 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666H4.167z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.083 4.167a.833.833 0 10-1.666 0v4.166a.833.833 0 101.666 0V4.167zM11.667 5.417a.833.833 0 100 1.666h4.166a.833.833 0 100-1.666h-4.166zM5.367 11.688a.833.833 0 00-1.179 1.179l2.947 2.946a.833.833 0 001.178-1.178l-2.946-2.947z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.313 12.867a.833.833 0 10-1.178-1.179l-2.947 2.947a.833.833 0 101.179 1.178l2.946-2.946z" fill="${e}"/>
  <path d="M10.833 12.5c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833zM10.833 15c0-.46.373-.833.834-.833h4.166a.833.833 0 110 1.666h-4.166a.833.833 0 01-.834-.833z" fill="${e}"/>
</svg>`;
}, EM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <path d="M16.22 2H3.78C2.8 2 2 2.8 2 3.78v12.44C2 17.2 2.8 18 3.78 18h12.44c.98 0 1.77-.8 1.77-1.78L18 3.78C18 2.8 17.2 2 16.22 2z" fill="${n}"/>
    <path d="M10 8.84a1.16 1.16 0 1 0 0 2.32 1.16 1.16 0 0 0 0-2.32zm3.02 3.61a3.92 3.92 0 0 0 .78-3.28.49.49 0 1 0-.95.2c.19.87-.02 1.78-.58 2.47a2.92 2.92 0 1 1-4.13-4.08 2.94 2.94 0 0 1 2.43-.62.49.49 0 1 0 .17-.96 3.89 3.89 0 1 0 2.28 6.27zM10 4.17a5.84 5.84 0 0 0-5.44 7.93.49.49 0 1 0 .9-.35 4.86 4.86 0 1 1 2.5 2.67.49.49 0 1 0-.4.88c.76.35 1.6.54 2.44.53a5.83 5.83 0 0 0 0-11.66zm3.02 3.5a.7.7 0 1 0-1.4 0 .7.7 0 0 0 1.4 0zm-6.97 5.35a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="${e}"/>
  </svg>`;
}, MM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path d="M12.4 13.565c1.865-.545 3.645-2.083 3.645-4.396 0-1.514-.787-2.604-2.071-2.604C12.69 6.565 12 7.63 12 8.939c1.114.072 1.865.726 1.865 1.683 0 .933-.8 1.647-1.84 2.023l.375.92zM4 5h6v2H4zM4 9h5v2H4zM4 13h4v2H4z" fill="${e}"/>
</svg>`;
}, IM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `
    ${kn}
    <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
    <path d="M12.4 13.56c1.86-.54 3.65-2.08 3.65-4.4 0-1.5-.8-2.6-2.08-2.6S12 7.64 12 8.95c1.11.07 1.86.73 1.86 1.68 0 .94-.8 1.65-1.83 2.03l.37.91zM4 5h6v2H4zm0 4h5v2H4zm0 4h4v2H4z" fill="${e}"/>
  </svg>`;
}, AM = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <path d="M16.222 2H3.778C2.8 2 2 2.8 2 3.778v12.444C2 17.2 2.8 18 3.778 18h12.444c.978 0 1.77-.8 1.77-1.778L18 3.778C18 2.8 17.2 2 16.222 2z" fill="${n}"/>
  <path d="M10 7a1 1 0 100-2v2zm0 6a1 1 0 100 2v-2zm0-8H7v2h3V5zm-3 6h5V9H7v2zm5 2h-2v2h2v-2zm1-1a1 1 0 01-1 1v2a3 3 0 003-3h-2zm-1-1a1 1 0 011 1h2a3 3 0 00-3-3v2zM4 8a3 3 0 003 3V9a1 1 0 01-1-1H4zm3-3a3 3 0 00-3 3h2a1 1 0 011-1V5z" fill="${e}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.856 12.014a.5.5 0 00-.712.702L5.409 14l-1.265 1.284a.5.5 0 00.712.702l1.255-1.274 1.255 1.274a.5.5 0 00.712-.702L6.813 14l1.265-1.284a.5.5 0 00-.712-.702L6.11 13.288l-1.255-1.274zM12.856 4.014a.5.5 0 00-.712.702L13.409 6l-1.265 1.284a.5.5 0 10.712.702l1.255-1.274 1.255 1.274a.5.5 0 10.712-.702L14.813 6l1.265-1.284a.5.5 0 00-.712-.702L14.11 5.288l-1.255-1.274z" fill="${e}"/>
</svg>`;
}, _M = (t) => {
  const e = t.fgColor, n = t.bgColor;
  return `${kn}
  <rect x="2" y="2" width="16" height="16" rx="2" fill="${n}"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 7.25a.75.75 0 000-1.5h-6.5a.75.75 0 100 1.5h6.5zM15 10a.75.75 0 01-.75.75h-6.5a.75.75 0 010-1.5h6.5A.75.75 0 0115 10zm-.75 4.25a.75.75 0 000-1.5h-6.5a.75.75 0 000 1.5h6.5zm-8.987-7a.75.75 0 100-1.5.75.75 0 000 1.5zm.75 2.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-.75 4.25a.75.75 0 100-1.5.75.75 0 000 1.5z" fill="${e}"/>
</svg>`;
}, PM = (t) => {
  const e = t.fgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 15v1h14v-2.5c0-.87-.44-1.55-.98-2.04a6.19 6.19 0 0 0-1.9-1.14 12.1 12.1 0 0 0-2.48-.67A4 4 0 1 0 5 6a4 4 0 0 0 2.36 3.65c-.82.13-1.7.36-2.48.67-.69.28-1.37.65-1.9 1.13A2.8 2.8 0 0 0 2 13.5V15z" fill="${t.bgColor}" stroke="${e}" stroke-width="2"/>
  </svg>`;
}, DM = (t) => {
  const e = t.fgColor;
  return `
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.43 6.04v-.18a3.86 3.86 0 0 0-7.72 0v.18A2.15 2.15 0 0 0 3 8.14v5.72C3 15.04 3.96 16 5.14 16H12c1.18 0 2.14-.96 2.14-2.14V8.14c0-1.03-.73-1.9-1.71-2.1zM7.86 6v-.14a.71.71 0 1 1 1.43 0V6H7.86z" fill="${t.bgColor}" stroke="${e}" stroke-width="2"/>
  </svg>
`;
}, NM = {
  headerRowID: sM,
  headerNumber: lM,
  headerCode: aM,
  headerString: cM,
  headerBoolean: uM,
  headerAudioUri: fM,
  headerVideoUri: hM,
  headerEmoji: pM,
  headerImage: gM,
  headerUri: M1,
  headerPhone: mM,
  headerMarkdown: yM,
  headerDate: bM,
  headerTime: vM,
  headerEmail: wM,
  headerReference: xM,
  headerIfThenElse: kM,
  headerSingleValue: SM,
  headerLookup: CM,
  headerTextTemplate: RM,
  headerMath: TM,
  headerRollup: EM,
  headerJoinStrings: MM,
  headerSplitString: IM,
  headerGeoDistance: AM,
  headerArray: _M,
  rowOwnerOverlay: PM,
  protectedColumnOverlay: DM,
  renameIcon: dM
};
function OM(t, e) {
  return t === "normal" ? [e.bgIconHeader, e.fgIconHeader] : t === "selected" ? ["white", e.accentColor] : [e.accentColor, e.bgHeader];
}
class zM {
  constructor(e, n) {
    Je(this, "onSettled");
    Je(this, "spriteMap", /* @__PURE__ */ new Map());
    Je(this, "headerIcons");
    Je(this, "inFlight", 0);
    this.onSettled = n, this.headerIcons = e ?? {};
  }
  drawSprite(e, n, r, i, o, s, a, l = 1) {
    const [c, u] = OM(n, a), d = s * Math.ceil(window.devicePixelRatio), f = `${c}_${u}_${d}_${e}`;
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
function I1(t) {
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
function A1(t, e, n, r, i) {
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
function _1(t, e, n, r, i, o, s) {
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
function LM(t, e, n, r) {
  if (r === "any")
    return P1(t, { x: e, y: n, width: 1, height: 1 });
  if (r === "vertical" && (e = t.x), r === "horizontal" && (n = t.y), h1([e, n], t))
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
function P1(t, e) {
  const n = Math.min(t.x, e.x), r = Math.min(t.y, e.y), i = Math.max(t.x + t.width, e.x + e.width) - n, o = Math.max(t.y + t.height, e.y + e.height) - r;
  return { x: n, y: r, width: i, height: o };
}
function $M(t, e) {
  return t.x <= e.x && t.y <= e.y && t.x + t.width >= e.x + e.width && t.y + t.height >= e.y + e.height;
}
function FM(t, e, n, r) {
  if (t.x > e || t.y > n || t.x < 0 && t.y < 0 && t.x + t.width > e && t.y + t.height > n)
    return;
  if (t.x >= 0 && t.y >= 0 && t.x + t.width <= e && t.y + t.height <= n)
    return t;
  const i = -4, o = -4, s = e + 4, a = n + 4, l = i - t.x, c = t.x + t.width - s, u = o - t.y, d = t.y + t.height - a, f = l > 0 ? t.x + Math.floor(l / r) * r : t.x, h = c > 0 ? t.x + t.width - Math.floor(c / r) * r : t.x + t.width, p = u > 0 ? t.y + Math.floor(u / r) * r : t.y, g = d > 0 ? t.y + t.height - Math.floor(d / r) * r : t.y + t.height;
  return { x: f, y: p, width: h - f, height: g - p };
}
function HM(t, e, n, r, i) {
  const [o, s, a, l] = e, [c, u, d, f] = i, { x: h, y: p, width: g, height: m } = t, y = [];
  if (g <= 0 || m <= 0)
    return y;
  const b = h + g, T = p + m, A = h < o, v = p < s, M = h + g > a, O = p + m > l, P = h >= o && h < a || b > o && b <= a || h < o && b > a, k = p >= s && p < l || T > s && T <= l || p < s && T > l;
  if (P && k) {
    const C = Math.max(h, o), x = Math.max(p, s), I = Math.min(b, a), R = Math.min(T, l);
    y.push({
      rect: { x: C, y: x, width: I - C, height: R - x },
      clip: {
        x: c,
        y: u,
        width: d - c + 1,
        height: f - u + 1
      }
    });
  }
  if (A && v) {
    const C = h, x = p, I = Math.min(b, o), R = Math.min(T, s);
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
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
    const C = Math.max(h, o), x = p, I = Math.min(b, a), R = Math.min(T, s);
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
      },
      clip: {
        x: c,
        y: 0,
        width: d - c + 1,
        height: u + 1
      }
    });
  }
  if (v && M) {
    const C = Math.max(h, a), x = p, I = b, R = Math.min(T, s);
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
      },
      clip: {
        x: d,
        y: 0,
        width: n - d + 1,
        height: u + 1
      }
    });
  }
  if (A && k) {
    const C = h, x = Math.max(p, s), I = Math.min(b, o), R = Math.min(T, l);
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
      },
      clip: {
        x: 0,
        y: u,
        width: c + 1,
        height: f - u + 1
      }
    });
  }
  if (M && k) {
    const C = Math.max(h, a), x = Math.max(p, s), I = b, R = Math.min(T, l);
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
      },
      clip: {
        x: d,
        y: u,
        width: n - d + 1,
        height: f - u + 1
      }
    });
  }
  if (A && O) {
    const C = h, x = Math.max(p, l), I = Math.min(b, o), R = T;
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
      },
      clip: {
        x: 0,
        y: f,
        width: c + 1,
        height: r - f + 1
      }
    });
  }
  if (O && P) {
    const C = Math.max(h, o), x = Math.max(p, l), I = Math.min(b, a), R = T;
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
      },
      clip: {
        x: c,
        y: f,
        width: d - c + 1,
        height: r - f + 1
      }
    });
  }
  if (M && O) {
    const C = Math.max(h, a), x = Math.max(p, l), I = b, R = T;
    y.push({
      rect: {
        x: C,
        y: x,
        width: I - C,
        height: R - x
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
const BM = {
  kind: He.Loading,
  allowOverlay: !1
};
function f0(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b, T, A, v, M, O, P, k, z, C, x, I, R, S, D, $, B) {
  let Z = (T == null ? void 0 : T.size) ?? Number.MAX_SAFE_INTEGER;
  const L = performance.now();
  let N = I.baseFontFull;
  t.font = N;
  const J = { ctx: t }, U = [0, 0], K = m > 0 ? uo(l, m, c) : 0;
  let V, q;
  const G = I1(b);
  return zi(e, a, o, s, i, (ne, te, Y, ce, fe) => {
    const Ee = Math.max(0, ce - te), Ce = te + Ee, Be = i + 1, it = ne.width - Ee, mt = r - i - 1;
    if (b.length > 0) {
      let Oe = !1;
      for (let Xe = 0; Xe < b.length; Xe++) {
        const pt = b[Xe];
        if (Os(Ce, Be, it, mt, pt.x, pt.y, pt.width, pt.height)) {
          Oe = !0;
          break;
        }
      }
      if (!Oe)
        return;
    }
    const ot = () => {
      t.save(), t.beginPath(), t.rect(Ce, Be, it, mt), t.clip();
    }, re = A.columns.hasIndex(ne.sourceIndex), _e = d(ne.group ?? "").overrideTheme, Ie = ne.themeOverride === void 0 && _e === void 0 ? I : fi(I, _e, ne.themeOverride), $e = Ie.baseFontFull;
    $e !== N && (N = $e, t.font = $e), ot();
    let De;
    return Rl(fe, Y, r, l, c, m, y, G, (Oe, Xe, pt, Se, Ze) => {
      var Ke, ue, ke;
      if (Xe < 0 || (U[0] = ne.sourceIndex, U[1] = Xe, T !== void 0 && !T.has(U)))
        return;
      if (b.length > 0) {
        let se = !1;
        for (let F = 0; F < b.length; F++) {
          const oe = b[F];
          if (Os(te, Oe, ne.width, pt, oe.x, oe.y, oe.width, oe.height)) {
            se = !0;
            break;
          }
        }
        if (!se)
          return;
      }
      const Ct = A.rows.hasIndex(Xe), ft = h.hasIndex(Xe), Qe = Xe < l ? u(U) : BM;
      let Rt = te, Ve = ne.width, tt = !1, Pt = !1;
      if (Qe.span !== void 0) {
        const [se, F] = Qe.span, oe = `${Xe},${se},${F},${ne.sticky}`;
        if (q === void 0 && (q = /* @__PURE__ */ new Set()), q.has(oe)) {
          Z--;
          return;
        } else {
          const he = _1(Qe.span, te, Oe, ne.width, pt, ne, n), Pe = ne.sticky ? he[0] : he[1];
          if (!ne.sticky && he[0] !== void 0 && (Pt = !0), Pe !== void 0) {
            Rt = Pe.x, Ve = Pe.width, q.add(oe), t.restore(), De = void 0, t.save(), t.beginPath();
            const nt = Math.max(0, ce - Pe.x);
            t.rect(Pe.x + nt, Oe, Pe.width - nt, pt), V === void 0 && (V = []), V.push({
              x: Pe.x + nt,
              y: Oe,
              width: Pe.width - nt,
              height: pt
            }), t.clip(), tt = !0;
          }
        }
      }
      const Lt = f == null ? void 0 : f(Xe), Qt = Ze && ((Ke = ne.trailingRowOptions) == null ? void 0 : Ke.themeOverride) !== void 0 ? (ue = ne.trailingRowOptions) == null ? void 0 : ue.themeOverride : void 0, yt = Qe.themeOverride === void 0 && Lt === void 0 && Qt === void 0 ? Ie : fi(Ie, Lt, Qt, Qe.themeOverride);
      t.beginPath();
      const Ft = mE(U, Qe, A);
      let Ot = yE(U, Qe, A, g);
      const hn = Qe.span !== void 0 && A.columns.some(
        (se) => Qe.span !== void 0 && se >= Qe.span[0] && se <= Qe.span[1]
        //alloc
      );
      Ft && !p && g ? Ot = 0 : Ft && g && (Ot = Math.max(Ot, 1)), hn && Ot++, Ft || (Ct && Ot++, re && !Ze && Ot++);
      const rn = Qe.kind === He.Protected ? yt.bgCellMedium : yt.bgCell;
      let bt;
      if ((Se || rn !== I.bgCell) && (bt = br(rn, bt)), Ot > 0 || ft) {
        ft && (bt = br(yt.bgHeader, bt));
        for (let se = 0; se < Ot; se++)
          bt = br(yt.accentLight, bt);
      } else if (v !== void 0) {
        for (const se of v)
          if (se[0] === ne.sourceIndex && se[1] === Xe) {
            bt = br(yt.bgSearchResult, bt);
            break;
          }
      }
      if (M !== void 0)
        for (let se = 0; se < M.length; se++) {
          const F = M[se], oe = F.range;
          F.style !== "solid-outline" && oe.x <= ne.sourceIndex && ne.sourceIndex < oe.x + oe.width && oe.y <= Xe && Xe < oe.y + oe.height && (bt = br(F.color, bt));
        }
      let Sn = !1;
      if (T !== void 0) {
        const se = Oe + 1, oe = (Se ? se + pt - 1 : Math.min(se + pt - 1, r - K)) - se;
        (oe !== pt - 1 || Rt + 1 <= ce) && (Sn = !0, t.save(), t.beginPath(), t.rect(Rt + 1, se, Ve - 1, oe), t.clip()), bt = bt === void 0 ? yt.bgCell : br(bt, yt.bgCell);
      }
      const me = ne.sourceIndex === n.length - 1, xe = Xe === l - 1;
      bt !== void 0 && (t.fillStyle = bt, De !== void 0 && (De.fillStyle = bt), T !== void 0 ? t.fillRect(Rt + 1, Oe + 1, Ve - (me ? 2 : 1), pt - (xe ? 2 : 1)) : t.fillRect(Rt, Oe, Ve, pt)), Qe.style === "faded" && (t.globalAlpha = 0.6);
      let qe;
      for (let se = 0; se < k.length; se++) {
        const F = k[se];
        if (F.item[0] === ne.sourceIndex && F.item[1] === Xe) {
          qe = F;
          break;
        }
      }
      if (Ve > B && !Pt) {
        const se = yt.baseFontFull;
        se !== N && (t.font = se, N = se), De = D1(t, Qe, ne.sourceIndex, Xe, me, xe, Rt, Oe, Ve, pt, Ot > 0, yt, bt ?? yt.bgCell, O, P, (qe == null ? void 0 : qe.hoverAmount) ?? 0, z, x, L, C, De, R, S, D, $);
      }
      return Sn && t.restore(), Qe.style === "faded" && (t.globalAlpha = 1), Z--, tt && (t.restore(), (ke = De == null ? void 0 : De.deprep) == null || ke.call(De, J), De = void 0, ot(), N = $e, t.font = $e), Z <= 0;
    }), t.restore(), Z <= 0;
  }), V;
}
const us = [0, 0], ds = { x: 0, y: 0, width: 0, height: 0 }, Xu = [void 0, () => {
}];
let _f = !1;
function qM() {
  _f = !0;
}
function D1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b, T, A, v, M, O, P) {
  var S, D;
  let k, z;
  m !== void 0 && m[0][0] === n && m[0][1] === r && (k = m[1][0], z = m[1][1]);
  let C;
  us[0] = n, us[1] = r, ds.x = s, ds.y = a, ds.width = l, ds.height = c, Xu[0] = M.getValue(us), Xu[1] = ($) => M.setValue(us, $), _f = !1;
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
    hyperWrapping: y,
    overrideCursor: k !== void 0 ? P : void 0,
    requestAnimationFrame: qM
  }, I = SE(x, e.lastUpdated, b, A, i, o), R = O(e);
  if (R !== void 0) {
    (A == null ? void 0 : A.renderer) !== R && ((S = A == null ? void 0 : A.deprep) == null || S.call(A, x), A = void 0);
    const $ = (D = R.drawPrep) == null ? void 0 : D.call(R, x, A);
    T !== void 0 && !_o(x.cell) ? T(x, () => R.draw(x, e)) : R.draw(x, e), C = $ === void 0 ? void 0 : {
      deprep: $ == null ? void 0 : $.deprep,
      fillStyle: $ == null ? void 0 : $.fillStyle,
      font: $ == null ? void 0 : $.font,
      renderer: R
    };
  }
  return (I || _f) && (v == null || v(us)), C;
}
function Oh(t, e, n, r, i, o, s, a, l = -20, c = -20, u = void 0, d = "center", f = "square") {
  const h = Math.floor(i + s / 2), p = f === "circle" ? 1e4 : e.roundingRadius ?? 4;
  let g = Qv(u ?? e.checkboxMaxSize, s, e.cellVerticalPadding), m = g / 2;
  const y = Zv(d, r, o, e.cellHorizontalPadding, g), b = Jv(y, h, g), T = e1(r + l, i + c, b);
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
function WM(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b) {
  var k, z, C, x;
  const T = s + a;
  if (T <= 0)
    return;
  t.fillStyle = d.bgHeader, t.fillRect(0, 0, i, T);
  const A = (k = r == null ? void 0 : r[0]) == null ? void 0 : k[0], v = (z = r == null ? void 0 : r[0]) == null ? void 0 : z[1], M = (C = r == null ? void 0 : r[1]) == null ? void 0 : C[0], O = (x = r == null ? void 0 : r[1]) == null ? void 0 : x[1], P = d.headerFontFull;
  t.font = P, zi(e, 0, o, 0, T, (I, R, S, D) => {
    var te;
    if (m !== void 0 && !m.has([I.sourceIndex, -1]))
      return;
    const $ = Math.max(0, D - R);
    t.save(), t.beginPath(), t.rect(R + $, a, I.width - $, s), t.clip();
    const B = g(I.group ?? "").overrideTheme, Z = I.themeOverride === void 0 && B === void 0 ? d : fi(d, B, I.themeOverride);
    Z.bgHeader !== d.bgHeader && (t.fillStyle = Z.bgHeader, t.fill()), Z !== d && (t.font = Z.headerFontFull);
    const L = u.columns.hasIndex(I.sourceIndex), N = l !== void 0 || c || I.headerRowMarkerDisabled === !0, J = !N && v === -1 && A === I.sourceIndex, U = N ? 0 : ((te = h.find((Y) => Y.item[0] === I.sourceIndex && Y.item[1] === -1)) == null ? void 0 : te.hoverAmount) ?? 0, K = (Y) => Y !== void 0 && I.sourceIndex >= Y.x && I.sourceIndex < Y.x + Y.width, V = (u == null ? void 0 : u.current) !== void 0 && (u.current.cell[0] === I.sourceIndex || K(u.current.range) || (u.current.rangeStack ?? []).some(K)), q = L ? Z.accentColor : V ? Z.bgHeaderHasFocus : Z.bgHeader, G = n ? a : 0, ne = I.sourceIndex === 0 ? 0 : 1;
    L ? (t.fillStyle = q, t.fillRect(R + ne, G, I.width - ne, s)) : (V || U > 0) && (t.beginPath(), t.rect(R + ne, G, I.width - ne, s), V && (t.fillStyle = Z.bgHeaderHasFocus, t.fill()), U > 0 && (t.globalAlpha = U, t.fillStyle = Z.bgHeaderHovered, t.fill(), t.globalAlpha = 1)), z1(t, R, G, I.width, s, I, L, Z, J, J ? M : void 0, J ? O : void 0, V, U, f, y, b), t.restore();
  }), n && jM(t, e, i, o, a, r, d, f, h, p, g, m);
}
function jM(t, e, n, r, i, o, s, a, l, c, u, d) {
  const [h, p] = (o == null ? void 0 : o[0]) ?? [];
  let g = 0;
  A1(e, n, r, i, (m, y, b, T, A, v) => {
    if (d !== void 0 && !d.hasItemInRectangle({
      x: m[0],
      y: -2,
      width: m[1] - m[0] + 1,
      height: 1
    }))
      return;
    t.save(), t.beginPath(), t.rect(b, T, A, v), t.clip();
    const M = u(y), O = (M == null ? void 0 : M.overrideTheme) === void 0 ? s : fi(s, M.overrideTheme), P = p === -2 && h !== void 0 && h >= m[0] && h <= m[1], k = P ? O.bgGroupHeaderHovered ?? O.bgHeaderHovered : O.bgGroupHeader ?? O.bgHeader;
    if (k !== s.bgHeader && (t.fillStyle = k, t.fill()), t.fillStyle = O.textGroupHeader ?? O.textHeader, M !== void 0) {
      let z = b;
      if (M.icon !== void 0 && (a.drawSprite(M.icon, "normal", t, z + 8, (i - 20) / 2, 20, O), z += 26), t.fillText(M.name, z + 8, i / 2 + Oi(t, s.headerFontFull)), M.actions !== void 0 && P) {
        const C = N1({ x: b, y: T, width: A, height: v }, M.actions);
        t.beginPath();
        const x = C[0].x - 10, I = b + A - x;
        t.rect(x, 0, I, i);
        const R = t.createLinearGradient(x, 0, x + I, 0), S = io(k, 0);
        R.addColorStop(0, S), R.addColorStop(10 / I, k), R.addColorStop(1, k), t.fillStyle = R, t.fill(), t.globalAlpha = 0.6;
        const [D, $] = (o == null ? void 0 : o[1]) ?? [-1, -1];
        for (let B = 0; B < M.actions.length; B++) {
          const Z = M.actions[B], L = C[B], N = Qi(L, D + b, $);
          N && (t.globalAlpha = 1), a.drawSprite(Z.icon, "normal", t, L.x + L.width / 2 - 10, L.y + L.height / 2 - 10, 20, O), N && (t.globalAlpha = 0.6);
        }
        t.globalAlpha = 1;
      }
    }
    b !== 0 && c(m[0]) && (t.beginPath(), t.moveTo(b + 0.5, 0), t.lineTo(b + 0.5, i), t.strokeStyle = s.borderColor, t.lineWidth = 1, t.stroke()), t.restore(), g = b + A;
  }), t.beginPath(), t.moveTo(g + 0.5, 0), t.lineTo(g + 0.5, i), t.moveTo(0, i + 0.5), t.lineTo(n, i + 0.5), t.strokeStyle = s.borderColor, t.lineWidth = 1, t.stroke();
}
const Ta = 30;
function KM(t, e, n, r, i) {
  return {
    x: t + n - Ta,
    // right align
    y: Math.max(e, e + r / 2 - Ta / 2),
    // center vertically
    width: Ta,
    height: Math.min(Ta, r)
  };
}
function N1(t, e) {
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
function O1(t, e, n, r, i, o, s, a) {
  var y;
  const l = s.cellHorizontalPadding, c = s.headerIconSize, u = KM(n, r, i, o);
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
    const b = t === void 0 ? ((y = y1(e.title, s.headerFontFull)) == null ? void 0 : y.width) ?? 0 : Ko(e.title, t, s.headerFontFull).width;
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
    const T = p ? 35 : r - 35, A = p ? 35 * 0.7 : r - 35 * 0.7, v = T / r, M = A / r, O = t.createLinearGradient(e, 0, e + r, 0), P = io(m, 0);
    O.addColorStop(p ? 1 : 0, m), O.addColorStop(v, m), O.addColorStop(M, P), O.addColorStop(p ? 0 : 1, P), t.fillStyle = O;
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
      EE(t, [
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
      TE(t, A, v), t.fillStyle = m, t.fill();
    } else {
      const A = b.x + (b.width - a.headerIconSize) / 2, v = b.y + (b.height - a.headerIconSize) / 2;
      f.drawSprite(o.menuIcon, "normal", t, A, v, a.headerIconSize, a);
    }
    T || (t.globalAlpha = 1);
  }
}
function z1(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g) {
  const m = vh(o.title) === "rtl", y = O1(t, o, e, n, r, i, a, m);
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
function UM() {
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
function GM() {
  if (g0) return Ju;
  g0 = 1;
  var t = UM();
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
function YM() {
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
function XM() {
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
function VM() {
  if (b0) return ed;
  b0 = 1;
  var t = XM(), e = t();
  return ed = e, ed;
}
var td, v0;
function JM() {
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
function ZM() {
  if (w0) return nd;
  w0 = 1;
  function t() {
    return !1;
  }
  return nd = t, nd;
}
ys.exports;
var x0;
function L1() {
  return x0 || (x0 = 1, (function(t, e) {
    var n = ii(), r = ZM(), i = e && !e.nodeType && e, o = i && !0 && t && !t.nodeType && t, s = o && o.exports === i, a = s ? n.Buffer : void 0, l = a ? a.isBuffer : void 0, c = l || r;
    t.exports = c;
  })(ys, ys.exports)), ys.exports;
}
var rd, k0;
function QM() {
  if (k0) return rd;
  k0 = 1;
  var t = qs(), e = fh(), n = Ws(), r = "[object Arguments]", i = "[object Array]", o = "[object Boolean]", s = "[object Date]", a = "[object Error]", l = "[object Function]", c = "[object Map]", u = "[object Number]", d = "[object Object]", f = "[object RegExp]", h = "[object Set]", p = "[object String]", g = "[object WeakMap]", m = "[object ArrayBuffer]", y = "[object DataView]", b = "[object Float32Array]", T = "[object Float64Array]", A = "[object Int8Array]", v = "[object Int16Array]", M = "[object Int32Array]", O = "[object Uint8Array]", P = "[object Uint8ClampedArray]", k = "[object Uint16Array]", z = "[object Uint32Array]", C = {};
  C[b] = C[T] = C[A] = C[v] = C[M] = C[O] = C[P] = C[k] = C[z] = !0, C[r] = C[i] = C[m] = C[o] = C[y] = C[s] = C[a] = C[l] = C[c] = C[u] = C[d] = C[f] = C[h] = C[p] = C[g] = !1;
  function x(I) {
    return n(I) && e(I.length) && !!C[t(I)];
  }
  return rd = x, rd;
}
var id, S0;
function eI() {
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
function tI() {
  return C0 || (C0 = 1, (function(t, e) {
    var n = Ov(), r = e && !e.nodeType && e, i = r && !0 && t && !t.nodeType && t, o = i && i.exports === r, s = o && n.process, a = (function() {
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
function $1() {
  if (R0) return od;
  R0 = 1;
  var t = QM(), e = eI(), n = tI(), r = n && n.isTypedArray, i = r ? e(r) : t;
  return od = i, od;
}
var sd, T0;
function nI() {
  if (T0) return sd;
  T0 = 1;
  var t = JM(), e = uh(), n = ri(), r = L1(), i = dh(), o = $1(), s = Object.prototype, a = s.hasOwnProperty;
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
function rI() {
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
function iI() {
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
function oI() {
  if (I0) return cd;
  I0 = 1;
  var t = iI(), e = t(Object.keys, Object);
  return cd = e, cd;
}
var ud, A0;
function sI() {
  if (A0) return ud;
  A0 = 1;
  var t = rI(), e = oI(), n = Object.prototype, r = n.hasOwnProperty;
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
  var t = nI(), e = sI(), n = Nh();
  function r(i) {
    return n(i) ? t(i) : e(i);
  }
  return dd = r, dd;
}
var fd, P0;
function aI() {
  if (P0) return fd;
  P0 = 1;
  var t = VM(), e = zh();
  function n(r, i) {
    return r && t(r, i, e);
  }
  return fd = n, fd;
}
var hd, D0;
function lI() {
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
function cI() {
  if (N0) return pd;
  N0 = 1;
  var t = aI(), e = lI(), n = e(t);
  return pd = n, pd;
}
var gd, O0;
function uI() {
  if (O0) return gd;
  O0 = 1;
  var t = cI();
  function e(n, r, i, o) {
    return t(n, function(s, a, l) {
      r(o, s, i(s), l);
    }), o;
  }
  return gd = e, gd;
}
var md, z0;
function dI() {
  if (z0) return md;
  z0 = 1;
  var t = wl();
  function e() {
    this.__data__ = new t(), this.size = 0;
  }
  return md = e, md;
}
var yd, L0;
function fI() {
  if (L0) return yd;
  L0 = 1;
  function t(e) {
    var n = this.__data__, r = n.delete(e);
    return this.size = n.size, r;
  }
  return yd = t, yd;
}
var bd, $0;
function hI() {
  if ($0) return bd;
  $0 = 1;
  function t(e) {
    return this.__data__.get(e);
  }
  return bd = t, bd;
}
var vd, F0;
function pI() {
  if (F0) return vd;
  F0 = 1;
  function t(e) {
    return this.__data__.has(e);
  }
  return vd = t, vd;
}
var wd, H0;
function gI() {
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
function F1() {
  if (B0) return xd;
  B0 = 1;
  var t = wl(), e = dI(), n = fI(), r = hI(), i = pI(), o = gI();
  function s(a) {
    var l = this.__data__ = new t(a);
    this.size = l.size;
  }
  return s.prototype.clear = e, s.prototype.delete = n, s.prototype.get = r, s.prototype.has = i, s.prototype.set = o, xd = s, xd;
}
var kd, q0;
function mI() {
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
function H1() {
  if (W0) return Sd;
  W0 = 1;
  var t = C1(), e = mI(), n = R1(), r = 1, i = 2;
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
        var M = f ? c(v, A, y, a, s, d) : c(A, v, y, s, a, d);
      if (M !== void 0) {
        if (M)
          continue;
        b = !1;
        break;
      }
      if (T) {
        if (!e(a, function(O, P) {
          if (!n(T, P) && (A === O || u(A, O, l, c, d)))
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
function yI() {
  if (j0) return Cd;
  j0 = 1;
  var t = ii(), e = t.Uint8Array;
  return Cd = e, Cd;
}
var Rd, K0;
function bI() {
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
function vI() {
  if (U0) return Td;
  U0 = 1;
  var t = Bs(), e = yI(), n = ah(), r = H1(), i = bI(), o = Dh(), s = 1, a = 2, l = "[object Boolean]", c = "[object Date]", u = "[object Error]", d = "[object Map]", f = "[object Number]", h = "[object RegExp]", p = "[object Set]", g = "[object String]", m = "[object Symbol]", y = "[object ArrayBuffer]", b = "[object DataView]", T = t ? t.prototype : void 0, A = T ? T.valueOf : void 0;
  function v(M, O, P, k, z, C, x) {
    switch (P) {
      case b:
        if (M.byteLength != O.byteLength || M.byteOffset != O.byteOffset)
          return !1;
        M = M.buffer, O = O.buffer;
      case y:
        return !(M.byteLength != O.byteLength || !C(new e(M), new e(O)));
      case l:
      case c:
      case f:
        return n(+M, +O);
      case u:
        return M.name == O.name && M.message == O.message;
      case h:
      case g:
        return M == O + "";
      case d:
        var I = i;
      case p:
        var R = k & s;
        if (I || (I = o), M.size != O.size && !R)
          return !1;
        var S = x.get(M);
        if (S)
          return S == O;
        k |= a, x.set(M, O);
        var D = r(I(M), I(O), k, z, C, x);
        return x.delete(M), D;
      case m:
        if (A)
          return A.call(M) == A.call(O);
    }
    return !1;
  }
  return Td = v, Td;
}
var Ed, G0;
function wI() {
  if (G0) return Ed;
  G0 = 1;
  var t = E1(), e = ri();
  function n(r, i, o) {
    var s = i(r);
    return e(r) ? s : t(s, o(r));
  }
  return Ed = n, Ed;
}
var Md, Y0;
function xI() {
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
function kI() {
  if (X0) return Id;
  X0 = 1;
  function t() {
    return [];
  }
  return Id = t, Id;
}
var Ad, V0;
function SI() {
  if (V0) return Ad;
  V0 = 1;
  var t = xI(), e = kI(), n = Object.prototype, r = n.propertyIsEnumerable, i = Object.getOwnPropertySymbols, o = i ? function(s) {
    return s == null ? [] : (s = Object(s), t(i(s), function(a) {
      return r.call(s, a);
    }));
  } : e;
  return Ad = o, Ad;
}
var _d, J0;
function CI() {
  if (J0) return _d;
  J0 = 1;
  var t = wI(), e = SI(), n = zh();
  function r(i) {
    return t(i, n, e);
  }
  return _d = r, _d;
}
var Pd, Z0;
function RI() {
  if (Z0) return Pd;
  Z0 = 1;
  var t = CI(), e = 1, n = Object.prototype, r = n.hasOwnProperty;
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
      var M = o[y], O = s[y];
      if (l)
        var P = d ? l(O, M, y, s, o, u) : l(M, O, y, o, s, u);
      if (!(P === void 0 ? M === O || c(M, O, a, l, u) : P)) {
        A = !1;
        break;
      }
      v || (v = y == "constructor");
    }
    if (A && !v) {
      var k = o.constructor, z = s.constructor;
      k != z && "constructor" in o && "constructor" in s && !(typeof k == "function" && k instanceof k && typeof z == "function" && z instanceof z) && (A = !1);
    }
    return u.delete(o), u.delete(s), A;
  }
  return Pd = i, Pd;
}
var Dd, Q0;
function TI() {
  if (Q0) return Dd;
  Q0 = 1;
  var t = lo(), e = ii(), n = t(e, "DataView");
  return Dd = n, Dd;
}
var Nd, ey;
function EI() {
  if (ey) return Nd;
  ey = 1;
  var t = lo(), e = ii(), n = t(e, "Promise");
  return Nd = n, Nd;
}
var Od, ty;
function MI() {
  if (ty) return Od;
  ty = 1;
  var t = lo(), e = ii(), n = t(e, "WeakMap");
  return Od = n, Od;
}
var zd, ny;
function II() {
  if (ny) return zd;
  ny = 1;
  var t = TI(), e = lh(), n = EI(), r = T1(), i = MI(), o = qs(), s = Lv(), a = "[object Map]", l = "[object Object]", c = "[object Promise]", u = "[object Set]", d = "[object WeakMap]", f = "[object DataView]", h = s(t), p = s(e), g = s(n), m = s(r), y = s(i), b = o;
  return (t && b(new t(new ArrayBuffer(1))) != f || e && b(new e()) != a || n && b(n.resolve()) != c || r && b(new r()) != u || i && b(new i()) != d) && (b = function(T) {
    var A = o(T), v = A == l ? T.constructor : void 0, M = v ? s(v) : "";
    if (M)
      switch (M) {
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
function AI() {
  if (ry) return Ld;
  ry = 1;
  var t = F1(), e = H1(), n = vI(), r = RI(), i = II(), o = ri(), s = L1(), a = $1(), l = 1, c = "[object Arguments]", u = "[object Array]", d = "[object Object]", f = Object.prototype, h = f.hasOwnProperty;
  function p(g, m, y, b, T, A) {
    var v = o(g), M = o(m), O = v ? u : i(g), P = M ? u : i(m);
    O = O == c ? d : O, P = P == c ? d : P;
    var k = O == d, z = P == d, C = O == P;
    if (C && s(g)) {
      if (!s(m))
        return !1;
      v = !0, k = !1;
    }
    if (C && !k)
      return A || (A = new t()), v || a(g) ? e(g, m, y, b, T, A) : n(g, m, O, y, b, T, A);
    if (!(y & l)) {
      var x = k && h.call(g, "__wrapped__"), I = z && h.call(m, "__wrapped__");
      if (x || I) {
        var R = x ? g.value() : g, S = I ? m.value() : m;
        return A || (A = new t()), T(R, S, y, b, A);
      }
    }
    return C ? (A || (A = new t()), r(g, m, y, b, T, A)) : !1;
  }
  return Ld = p, Ld;
}
var $d, iy;
function B1() {
  if (iy) return $d;
  iy = 1;
  var t = AI(), e = Ws();
  function n(r, i, o, s, a) {
    return r === i ? !0 : r == null || i == null || !e(r) && !e(i) ? r !== r && i !== i : t(r, i, o, s, n, a);
  }
  return $d = n, $d;
}
var Fd, oy;
function _I() {
  if (oy) return Fd;
  oy = 1;
  var t = F1(), e = B1(), n = 1, r = 2;
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
function q1() {
  if (sy) return Hd;
  sy = 1;
  var t = ao();
  function e(n) {
    return n === n && !t(n);
  }
  return Hd = e, Hd;
}
var Bd, ay;
function PI() {
  if (ay) return Bd;
  ay = 1;
  var t = q1(), e = zh();
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
function W1() {
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
function DI() {
  if (cy) return Wd;
  cy = 1;
  var t = _I(), e = PI(), n = W1();
  function r(i) {
    var o = e(i);
    return o.length == 1 && o[0][2] ? n(o[0][0], o[0][1]) : function(s) {
      return s === i || t(s, i, o);
    };
  }
  return Wd = r, Wd;
}
var jd, uy;
function j1() {
  if (uy) return jd;
  uy = 1;
  var t = $v(), e = kl();
  function n(r, i) {
    i = t(i, r);
    for (var o = 0, s = i.length; r != null && o < s; )
      r = r[e(i[o++])];
    return o && o == s ? r : void 0;
  }
  return jd = n, jd;
}
var Kd, dy;
function NI() {
  if (dy) return Kd;
  dy = 1;
  var t = j1();
  function e(n, r, i) {
    var o = n == null ? void 0 : t(n, r);
    return o === void 0 ? i : o;
  }
  return Kd = e, Kd;
}
var Ud, fy;
function OI() {
  if (fy) return Ud;
  fy = 1;
  function t(e, n) {
    return e != null && n in Object(e);
  }
  return Ud = t, Ud;
}
var Gd, hy;
function zI() {
  if (hy) return Gd;
  hy = 1;
  var t = OI(), e = Fv();
  function n(r, i) {
    return r != null && e(r, i, t);
  }
  return Gd = n, Gd;
}
var Yd, py;
function LI() {
  if (py) return Yd;
  py = 1;
  var t = B1(), e = NI(), n = zI(), r = sh(), i = q1(), o = W1(), s = kl(), a = 1, l = 2;
  function c(u, d) {
    return r(u) && i(d) ? o(s(u), d) : function(f) {
      var h = e(f, u);
      return h === void 0 && h === d ? n(f, u) : t(d, h, a | l);
    };
  }
  return Yd = c, Yd;
}
var Xd, gy;
function $I() {
  if (gy) return Xd;
  gy = 1;
  function t(e) {
    return e;
  }
  return Xd = t, Xd;
}
var Vd, my;
function FI() {
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
function HI() {
  if (yy) return Jd;
  yy = 1;
  var t = j1();
  function e(n) {
    return function(r) {
      return t(r, n);
    };
  }
  return Jd = e, Jd;
}
var Zd, by;
function BI() {
  if (by) return Zd;
  by = 1;
  var t = FI(), e = HI(), n = sh(), r = kl();
  function i(o) {
    return n(o) ? t(r(o)) : e(o);
  }
  return Zd = i, Zd;
}
var Qd, vy;
function qI() {
  if (vy) return Qd;
  vy = 1;
  var t = DI(), e = LI(), n = $I(), r = ri(), i = BI();
  function o(s) {
    return typeof s == "function" ? s : s == null ? n : typeof s == "object" ? r(s) ? e(s[0], s[1]) : t(s) : i(s);
  }
  return Qd = o, Qd;
}
var ef, wy;
function WI() {
  if (wy) return ef;
  wy = 1;
  var t = YM(), e = uI(), n = qI(), r = ri();
  function i(o, s) {
    return function(a, l) {
      var c = r(a) ? t : e, u = s ? s() : {};
      return c(a, o, n(l, 2), u);
    };
  }
  return ef = i, ef;
}
var tf, xy;
function jI() {
  if (xy) return tf;
  xy = 1;
  var t = GM(), e = WI(), n = Object.prototype, r = n.hasOwnProperty, i = e(function(o, s, a) {
    r.call(o, a) ? o[a].push(s) : t(o, a, [s]);
  });
  return tf = i, tf;
}
var KI = jI();
const UI = /* @__PURE__ */ Ni(KI);
function GI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b) {
  if (y !== void 0 || e[e.length - 1] !== n[e.length - 1])
    return;
  const T = I1(m);
  zi(e, l, s, a, o, (A, v, M, O, P) => {
    if (A !== e[e.length - 1])
      return;
    v += A.width;
    const k = Math.max(v, O);
    k > r || (t.save(), t.beginPath(), t.rect(k, o + 1, 1e4, i - o - 1), t.clip(), Rl(P, M, i, c, u, p, g, T, (z, C, x, I) => {
      if (!I && m.length > 0 && !m.some((B) => Os(v, z, 1e4, x, B.x, B.y, B.width, B.height)))
        return;
      const R = f.hasIndex(C), S = h.hasIndex(C);
      t.beginPath();
      const D = d == null ? void 0 : d(C), $ = D === void 0 ? b : fi(b, D);
      $.bgCell !== b.bgCell && (t.fillStyle = $.bgCell, t.fillRect(v, z, 1e4, x)), S && (t.fillStyle = $.bgHeader, t.fillRect(v, z, 1e4, x)), R && (t.fillStyle = $.accentLight, t.fillRect(v, z, 1e4, x));
    }), t.restore());
  });
}
function YI(t, e, n, r, i, o, s, a, l) {
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
const K1 = (t, e, n) => {
  let r = 0, i = e, o = 0, s = n;
  if (t !== void 0 && t.length > 0) {
    r = Number.MAX_SAFE_INTEGER, o = Number.MAX_SAFE_INTEGER, i = Number.MIN_SAFE_INTEGER, s = Number.MIN_SAFE_INTEGER;
    for (const a of t)
      r = Math.min(r, a.x - 1), i = Math.max(i, a.x + a.width + 1), o = Math.min(o, a.y - 1), s = Math.max(s, a.y + a.height + 1);
  }
  return { minX: r, maxX: i, minY: o, maxY: s };
};
function XI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p) {
  var x;
  const g = p.bgCell, { minX: m, maxX: y, minY: b, maxY: T } = K1(a, o, s), A = [], v = s - uo(h, f, c);
  let M = l, O = n, P = 0;
  for (; M + i < v; ) {
    const I = M + i, R = c(O);
    if (I >= b && I <= T - 1) {
      const S = u == null ? void 0 : u(O), D = S == null ? void 0 : S.bgCell;
      D !== void 0 && D !== g && O >= h - f && A.push({
        x: m,
        y: I,
        w: y - m,
        h: R,
        color: D
      });
    }
    M += R, O < h - f && (P = M), O++;
  }
  let k = 0;
  const z = Math.min(v, T) - P;
  if (z > 0)
    for (let I = 0; I < e.length; I++) {
      const R = e[I];
      if (R.width === 0)
        continue;
      const S = R.sticky ? k : k + r, D = (x = R.themeOverride) == null ? void 0 : x.bgCell;
      D !== void 0 && D !== g && S >= m && S <= y && d(I + 1) && A.push({
        x: S,
        y: P,
        w: R.width,
        h: z,
        color: D
      }), k += R.width;
    }
  if (A.length === 0)
    return;
  let C;
  t.beginPath();
  for (let I = A.length - 1; I >= 0; I--) {
    const R = A[I];
    C === void 0 ? C = R.color : R.color !== C && (t.fillStyle = C, t.fill(), t.beginPath(), C = R.color), t.rect(R.x, R.y, R.w, R.h);
  }
  C !== void 0 && (t.fillStyle = C, t.fill()), t.beginPath();
}
function ky(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y = !1) {
  if (l !== void 0) {
    t.beginPath(), t.save(), t.rect(0, 0, o, s);
    for (const x of l)
      t.rect(x.x + 1, x.y + 1, x.width - 1, x.height - 1);
    t.clip("evenodd");
  }
  const b = m.horizontalBorderColor ?? m.borderColor, T = m.borderColor, { minX: A, maxX: v, minY: M, maxY: O } = K1(a, o, s), P = [];
  t.beginPath();
  let k = 0.5;
  for (let x = 0; x < e.length; x++) {
    const I = e[x];
    if (I.width === 0)
      continue;
    k += I.width;
    const R = I.sticky ? k : k + r;
    R >= A && R <= v && h(x + 1) && P.push({
      x1: R,
      y1: Math.max(c, M),
      x2: R,
      y2: Math.min(s, O),
      color: T
    });
  }
  let z = s + 0.5;
  for (let x = g - p; x < g; x++) {
    const I = d(x);
    z -= I, P.push({ x1: A, y1: z, x2: v, y2: z, color: b });
  }
  if (y !== !0) {
    let x = u + 0.5, I = n;
    const R = z;
    for (; x + i < R; ) {
      const S = x + i;
      if (S >= M && S <= O - 1) {
        const D = f == null ? void 0 : f(I);
        P.push({
          x1: A,
          y1: S,
          x2: v,
          y2: S,
          color: (D == null ? void 0 : D.horizontalBorderColor) ?? (D == null ? void 0 : D.borderColor) ?? b
        });
      }
      x += d(I), I++;
    }
  }
  const C = UI(P, (x) => x.color);
  for (const x of Object.keys(C)) {
    t.strokeStyle = x;
    for (const I of C[x])
      t.moveTo(I.x1, I.y1), t.lineTo(I.x2, I.y2);
    t.stroke(), t.beginPath();
  }
  l !== void 0 && t.restore();
}
function VI(t, e, n, r, i, o, s, a, l, c, u, d, f, h, p, g, m, y, b) {
  const T = [];
  t.imageSmoothingEnabled = !1;
  const A = Math.min(i.cellYOffset, s), v = Math.max(i.cellYOffset, s);
  let M = 0;
  if (typeof y == "number")
    M += (v - A) * y;
  else
    for (let R = A; R < v; R++)
      M += y(R);
  s > i.cellYOffset && (M = -M), M += l - i.translateY;
  const O = Math.min(i.cellXOffset, o), P = Math.max(i.cellXOffset, o);
  let k = 0;
  for (let R = O; R < P; R++)
    k += g[R].width;
  o > i.cellXOffset && (k = -k), k += a - i.translateX;
  const z = Wo(m);
  if (k !== 0 && M !== 0)
    return {
      regions: []
    };
  const C = c > 0 ? uo(f, c, y) : 0, x = u - z - Math.abs(k), I = d - h - C - Math.abs(M) - 1;
  if (x > 150 && I > 150) {
    const R = {
      sx: 0,
      sy: 0,
      sw: u * p,
      sh: d * p,
      dx: 0,
      dy: 0,
      dw: u * p,
      dh: d * p
    };
    if (M > 0 ? (R.sy = (h + 1) * p, R.sh = I * p, R.dy = (M + h + 1) * p, R.dh = I * p, T.push({
      x: 0,
      y: h,
      width: u,
      height: M + 1
    })) : M < 0 && (R.sy = (-M + h + 1) * p, R.sh = I * p, R.dy = (h + 1) * p, R.dh = I * p, T.push({
      x: 0,
      y: d + M - C,
      width: u,
      height: -M + C
    })), k > 0 ? (R.sx = z * p, R.sw = x * p, R.dx = (k + z) * p, R.dw = x * p, T.push({
      x: z - 1,
      y: 0,
      width: k + 2,
      // extra width to account for first col not drawing a left side border
      height: d
    })) : k < 0 && (R.sx = (z - k) * p, R.sw = x * p, R.dx = z * p, R.dw = x * p, T.push({
      x: u + k,
      y: 0,
      width: -k,
      height: d
    })), t.setTransform(1, 0, 0, 1, 0, 0), b) {
      if (z > 0 && k !== 0 && M === 0 && (r === void 0 || (n == null ? void 0 : n[1]) !== !1)) {
        const S = z * p, D = d * p;
        t.drawImage(e, 0, 0, S, D, 0, 0, S, D);
      }
      if (C > 0 && k === 0 && M !== 0 && (r === void 0 || (n == null ? void 0 : n[0]) !== !1)) {
        const S = (d - C) * p, D = u * p, $ = C * p;
        t.drawImage(e, 0, S, D, $, 0, S, D, $);
      }
    }
    t.drawImage(e, R.sx, R.sy, R.sw, R.sh, R.dx, R.dy, R.dw, R.dh), t.scale(p, p);
  }
  return t.imageSmoothingEnabled = !0, {
    regions: T
  };
}
function JI(t, e, n, r, i, o, s, a, l, c) {
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
function ZI(t, e) {
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
  const m = p == null ? void 0 : p.filter((O) => O.style !== "no-outline");
  if (m === void 0 || m.length === 0)
    return;
  const y = Wo(a), b = uo(h, f, d), T = [l, 0, a.length, h - f], A = [y, 0, e, n - b], v = m.map((O) => {
    const P = O.range, k = O.style ?? "dashed";
    return HM(P, T, e, n, A).map((z) => {
      const C = z.rect, x = If(C.x, C.y, e, n, u, c + u, r, i, o, s, h, l, f, a, d), I = C.width === 1 && C.height === 1 ? x : If(C.x + C.width - 1, C.y + C.height - 1, e, n, u, c + u, r, i, o, s, h, l, f, a, d);
      return C.x + C.width >= a.length && (I.width -= 1), C.y + C.height >= h && (I.height -= 1), {
        color: O.color,
        style: k,
        clip: z.clip,
        rect: FM({
          x: x.x,
          y: x.y,
          width: I.x + I.width - x.x,
          height: I.y + I.height - x.y
        }, e, n, 8)
      };
    });
  }), M = () => {
    t.lineWidth = 1;
    let O = !1;
    for (const P of v)
      for (const k of P)
        if ((k == null ? void 0 : k.rect) !== void 0 && Os(0, 0, e, n, k.rect.x, k.rect.y, k.rect.width, k.rect.height)) {
          const z = O, C = !$M(k.clip, k.rect);
          t.beginPath(), C && (t.save(), t.rect(k.clip.x, k.clip.y, k.clip.width, k.clip.height), t.clip()), k.style === "dashed" && !O ? (t.setLineDash([5, 3]), O = !0) : (k.style === "solid" || k.style === "solid-outline") && O && (t.setLineDash([]), O = !1), t.strokeStyle = k.style === "solid-outline" ? br(br(k.color, g.borderColor), g.bgCell) : io(k.color, 1), t.closePath(), t.strokeRect(k.rect.x + 0.5, k.rect.y + 0.5, k.rect.width - 1, k.rect.height - 1), C && (t.restore(), O = z);
        }
    O && t.setLineDash([]);
  };
  return M(), M;
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
  if (A[1] >= m && v[1] >= m || !s.some((D) => D.sourceIndex === A[0] || D.sourceIndex === v[0]))
    return;
  const [O, P] = u.current.cell, k = f(u.current.cell), z = k.span ?? [O, O], C = P >= m - h, x = h > 0 && !C ? uo(m, h, d) - 1 : 0, I = v[1];
  let R;
  if (zi(s, r, i, o, c, (D, $, B, Z, L) => {
    if (D.sticky && O > D.sourceIndex)
      return;
    const N = D.sourceIndex < z[0], J = D.sourceIndex > z[1], U = D.sourceIndex === v[0];
    if (!(!U && (N || J)))
      return Rl(L, B, n, m, d, h, p, void 0, (K, V, q) => {
        if (V !== P && V !== I)
          return;
        let G = $, ne = D.width;
        if (k.span !== void 0) {
          const Y = _1(k.span, $, K, D.width, q, D, a), ce = D.sticky ? Y[0] : Y[1];
          ce !== void 0 && (G = ce.x, ne = ce.width);
        }
        return V === I && U && y && (R = () => {
          var Ce;
          Z > G && !D.sticky && (t.beginPath(), t.rect(Z, 0, e - Z, n), t.clip());
          const Y = b.size, ce = Y / 2, fe = G + ne + b.offsetX - ce + 0.5, Ee = K + q + b.offsetY - ce + 0.5;
          t.beginPath(), b.shape === "circle" ? t.arc(fe + ce, Ee + ce, ce, 0, Math.PI * 2) : t.rect(fe, Ee, Y, Y), t.fillStyle = ((Ce = D.themeOverride) == null ? void 0 : Ce.accentColor) ?? l.accentColor, t.fill(), b.outline > 0 && (t.lineWidth = b.outline, t.strokeStyle = l.bgCell, b.shape === "circle" ? (t.beginPath(), t.arc(fe + ce, Ee + ce, ce + b.outline / 2, 0, Math.PI * 2), t.stroke()) : t.strokeRect(fe - b.outline / 2, Ee - b.outline / 2, Y + b.outline, Y + b.outline));
        }), R !== void 0;
      }), R !== void 0;
  }), R === void 0)
    return;
  const S = () => {
    t.save(), t.beginPath(), t.rect(0, c, e, n - c - x), t.clip(), R == null || R(), t.restore();
  };
  return S(), S;
}
function QI(t, e, n, r, i, o, s, a, l) {
  l === void 0 || l.size === 0 || (t.beginPath(), A1(e, n, o, r, (c, u, d, f, h, p) => {
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
function Ry(t, e, n, r, i, o, s, a, l, c) {
  let u = 0;
  return zi(t, o, r, i, n, (d, f, h, p, g) => (Rl(g, h, e, s, a, l, c, void 0, (m, y, b, T) => {
    T || (u = Math.max(y, u));
  }), !0)), u;
}
function Ty(t, e) {
  var me;
  const { canvasCtx: n, headerCanvasCtx: r, width: i, height: o, cellXOffset: s, cellYOffset: a, translateX: l, translateY: c, mappedColumns: u, enableGroups: d, freezeColumns: f, dragAndDropState: h, theme: p, drawFocus: g, headerHeight: m, groupHeaderHeight: y, disabledRows: b, rowHeight: T, verticalBorder: A, overrideCursor: v, isResizing: M, selection: O, fillHandle: P, freezeTrailingRows: k, rows: z, getCellContent: C, getGroupDetails: x, getRowThemeOverride: I, isFocused: R, drawHeaderCallback: S, prelightCells: D, drawCellCallback: $, highlightRegions: B, resizeCol: Z, imageLoader: L, lastBlitData: N, hoverValues: J, hyperWrapping: U, hoverInfo: K, spriteManager: V, maxScaleFactor: q, hasAppendRow: G, touchMode: ne, enqueue: te, renderStateProvider: Y, getCellRenderer: ce, renderStrategy: fe, bufferACtx: Ee, bufferBCtx: Ce, damage: Be, minimumCellWidth: it, resizeIndicator: mt } = t;
  if (i === 0 || o === 0)
    return;
  const ot = fe === "double-buffer", re = Math.min(q, Math.ceil(window.devicePixelRatio ?? 1)), _e = fe !== "direct" && ZI(t, e), Ie = n.canvas;
  (Ie.width !== i * re || Ie.height !== o * re) && (Ie.width = i * re, Ie.height = o * re, Ie.style.width = i + "px", Ie.style.height = o + "px");
  const $e = r.canvas, De = d ? y + m : m, Oe = De + 1;
  ($e.width !== i * re || $e.height !== Oe * re) && ($e.width = i * re, $e.height = Oe * re, $e.style.width = i + "px", $e.style.height = Oe + "px");
  const Xe = Ee.canvas, pt = Ce.canvas;
  ot && (Xe.width !== i * re || Xe.height !== o * re) && (Xe.width = i * re, Xe.height = o * re, N.current !== void 0 && (N.current.aBufferScroll = void 0)), ot && (pt.width !== i * re || pt.height !== o * re) && (pt.width = i * re, pt.height = o * re, N.current !== void 0 && (N.current.bBufferScroll = void 0));
  const Se = N.current;
  if (_e === !0 && s === (Se == null ? void 0 : Se.cellXOffset) && a === (Se == null ? void 0 : Se.cellYOffset) && l === (Se == null ? void 0 : Se.translateX) && c === (Se == null ? void 0 : Se.translateY))
    return;
  let Ze = null;
  ot && (Ze = n);
  const Ct = r;
  let ft;
  ot ? Be !== void 0 ? ft = (Se == null ? void 0 : Se.lastBuffer) === "b" ? Ce : Ee : ft = (Se == null ? void 0 : Se.lastBuffer) === "b" ? Ee : Ce : ft = n;
  const Qe = ft.canvas, Rt = ot ? Qe === Xe ? pt : Xe : Ie, Ve = typeof T == "number" ? () => T : T;
  Ct.save(), ft.save(), Ct.beginPath(), ft.beginPath(), Ct.textBaseline = "middle", ft.textBaseline = "middle", re !== 1 && (Ct.scale(re, re), ft.scale(re, re));
  const tt = Mf(u, s, i, h, l);
  let Pt = [];
  const Lt = g && ((me = O.current) == null ? void 0 : me.cell[1]) === a && c === 0;
  let Qt = !1;
  if (B !== void 0) {
    for (const xe of B)
      if (xe.style !== "no-outline" && xe.range.y === a && c === 0) {
        Qt = !0;
        break;
      }
  }
  const yt = () => {
    WM(Ct, tt, d, K, i, l, m, y, h, M, O, p, V, J, A, x, Be, S, ne), ky(Ct, tt, a, l, c, i, o, void 0, void 0, y, De, Ve, I, A, k, z, p, !0), Ct.beginPath(), Ct.moveTo(0, Oe - 0.5), Ct.lineTo(i, Oe - 0.5), Ct.strokeStyle = br(p.headerBottomBorderColor ?? p.horizontalBorderColor ?? p.borderColor, p.bgHeader), Ct.stroke(), Qt && Sy(Ct, i, o, s, a, l, c, u, f, m, y, T, k, z, B, p), Lt && nf(Ct, i, o, a, l, c, tt, u, p, De, O, Ve, C, k, G, P, z);
  };
  if (Be !== void 0) {
    const xe = tt[tt.length - 1].sourceIndex + 1, qe = Be.hasItemInRegion([
      {
        x: s,
        y: -2,
        width: xe,
        height: 2
      },
      {
        x: s,
        y: a,
        width: xe,
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
        width: xe,
        height: k,
        when: k > 0
      }
    ]), Ke = (ue) => {
      f0(ue, tt, u, o, De, l, c, a, z, Ve, C, x, I, b, R, g, k, G, Pt, Be, O, D, B, L, V, J, K, $, U, p, te, Y, ce, v, it);
      const ke = O.current;
      P !== !1 && P !== void 0 && g && ke !== void 0 && Be.has(p1(ke.range)) && nf(ue, i, o, a, l, c, tt, u, p, De, O, Ve, C, k, G, P, z);
    };
    qe && (Ke(ft), Ze !== null && (Ze.save(), Ze.scale(re, re), Ze.textBaseline = "middle", Ke(Ze), Ze.restore()), Be.hasHeader() && (QI(Ct, tt, i, y, De, l, c, a, Be), yt())), ft.restore(), Ct.restore();
    return;
  }
  if ((_e !== !0 || s !== (Se == null ? void 0 : Se.cellXOffset) || l !== (Se == null ? void 0 : Se.translateX) || Lt !== (Se == null ? void 0 : Se.mustDrawFocusOnHeader) || Qt !== (Se == null ? void 0 : Se.mustDrawHighlightRingsOnHeader)) && yt(), _e === !0) {
    yr(Rt !== void 0 && Se !== void 0);
    const { regions: xe } = VI(ft, Rt, Rt === Xe ? Se.aBufferScroll : Se.bBufferScroll, Rt === Xe ? Se.bBufferScroll : Se.aBufferScroll, Se, s, a, l, c, k, i, o, z, De, re, u, tt, T, ot);
    Pt = xe;
  } else _e !== !1 && (yr(Se !== void 0), Pt = JI(Se, s, a, l, c, i, o, De, tt, _e));
  YI(ft, tt, i, o, k, z, A, Ve, p);
  const Ft = Sy(ft, i, o, s, a, l, c, u, f, m, y, T, k, z, B, p), Ot = g ? nf(ft, i, o, a, l, c, tt, u, p, De, O, Ve, C, k, G, P, z) : void 0;
  if (ft.fillStyle = p.bgCell, Pt.length > 0) {
    ft.beginPath();
    for (const xe of Pt)
      ft.rect(xe.x, xe.y, xe.width, xe.height);
    ft.clip(), ft.fill(), ft.beginPath();
  } else
    ft.fillRect(0, 0, i, o);
  const hn = f0(ft, tt, u, o, De, l, c, a, z, Ve, C, x, I, b, R, g, k, G, Pt, Be, O, D, B, L, V, J, K, $, U, p, te, Y, ce, v, it);
  if (GI(ft, tt, u, i, o, De, l, c, a, z, Ve, I, O.rows, b, k, G, Pt, Be, p), XI(ft, tt, a, l, c, i, o, Pt, De, Ve, I, A, k, z, p), ky(ft, tt, a, l, c, i, o, Pt, hn, y, De, Ve, I, A, k, z, p), k === 0) {
    const xe = Ry(tt, o, De, l, c, a, z, Ve, k, G);
    let qe = De + c;
    for (let Ke = a; Ke <= xe; Ke++)
      qe += Ve(Ke);
    if (typeof window < "u" && window.__glideBandDebug && console.log("band", { rows: z, cellYOffset: a, translateY: c, lastRow: xe, bandTop: qe, height: o, rowHeight: T }), qe < o) {
      const Ke = Math.max(De, qe);
      ft.fillStyle = p.horizontalBorderColor ?? p.borderColor, ft.fillRect(0, Math.round(Ke) - 1, i, 1), ft.fillStyle = p.bgCell, ft.fillRect(0, Ke, i, o - Ke);
    }
  }
  Ft == null || Ft(), Ot == null || Ot(), M && mt !== "none" && zi(tt, 0, l, 0, De, (xe, qe) => xe.sourceIndex === Z ? (Cy(Ct, qe + xe.width, 0, De + 1, br(p.resizeIndicatorColor ?? p.accentLight, p.bgHeader)), mt === "full" && Cy(ft, qe + xe.width, De, o, br(p.resizeIndicatorColor ?? p.accentLight, p.bgCell)), !0) : !1), Ze !== null && (Ze.fillStyle = p.bgCell, Ze.fillRect(0, 0, i, o), Ze.drawImage(ft.canvas, 0, 0));
  const rn = Ry(tt, o, De, l, c, a, z, Ve, k, G);
  L == null || L.setWindow({
    x: s,
    y: a,
    width: tt.length,
    height: rn - a
  }, f, Array.from({ length: k }, (xe, qe) => z - 1 - qe));
  const bt = Se !== void 0 && (s !== Se.cellXOffset || l !== Se.translateX), Sn = Se !== void 0 && (a !== Se.cellYOffset || c !== Se.translateY);
  N.current = {
    cellXOffset: s,
    cellYOffset: a,
    translateX: l,
    translateY: c,
    mustDrawFocusOnHeader: Lt,
    mustDrawHighlightRingsOnHeader: Qt,
    lastBuffer: ot ? Qe === Xe ? "a" : "b" : void 0,
    aBufferScroll: Qe === Xe ? [bt, Sn] : Se == null ? void 0 : Se.aBufferScroll,
    bBufferScroll: Qe === pt ? [bt, Sn] : Se == null ? void 0 : Se.bBufferScroll
  }, ft.restore(), Ct.restore();
}
const eA = 80;
function tA(t) {
  const e = t - 1;
  return e * e * e + 1;
}
class nA {
  constructor(e) {
    Je(this, "callback");
    Je(this, "currentHoveredItem");
    Je(this, "leavingItems", []);
    Je(this, "lastAnimationTime");
    Je(this, "addToLeavingItems", (e) => {
      this.leavingItems.some((r) => Ss(r.item, e.item)) || this.leavingItems.push(e);
    });
    /**
     * @returns the hover amount of the item, if it was leaving (0 if not).
     */
    Je(this, "removeFromLeavingItems", (e) => {
      const n = this.leavingItems.find((r) => Ss(r.item, e));
      return this.leavingItems = this.leavingItems.filter((r) => r !== n), (n == null ? void 0 : n.hoverAmount) ?? 0;
    });
    Je(this, "cleanUpLeavingElements", () => {
      this.leavingItems = this.leavingItems.filter((e) => e.hoverAmount > 0);
    });
    Je(this, "shouldStep", () => {
      const e = this.leavingItems.length > 0, n = this.currentHoveredItem !== void 0 && this.currentHoveredItem.hoverAmount < 1;
      return e || n;
    });
    Je(this, "getAnimatingItems", () => this.currentHoveredItem !== void 0 ? [...this.leavingItems, this.currentHoveredItem] : this.leavingItems.map((e) => ({ ...e, hoverAmount: tA(e.hoverAmount) })));
    Je(this, "step", (e) => {
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
    Je(this, "setHovered", (e) => {
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
    Je(this, "fn");
    Je(this, "val");
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
function U1(t, e) {
  return t === e ? !0 : (t == null ? void 0 : t.kind) === "out-of-bounds" ? (t == null ? void 0 : t.kind) === (e == null ? void 0 : e.kind) && (t == null ? void 0 : t.location[0]) === (e == null ? void 0 : e.location[0]) && (t == null ? void 0 : t.location[1]) === (e == null ? void 0 : e.location[1]) && (t == null ? void 0 : t.region[0]) === (e == null ? void 0 : e.region[0]) && (t == null ? void 0 : t.region[1]) === (e == null ? void 0 : e.region[1]) : (t == null ? void 0 : t.kind) === (e == null ? void 0 : e.kind) && (t == null ? void 0 : t.location[0]) === (e == null ? void 0 : e.location[0]) && (t == null ? void 0 : t.location[1]) === (e == null ? void 0 : e.location[1]);
}
const sA = (t, e) => {
  if (t.kind === He.Custom)
    return t.copyData;
  const n = e == null ? void 0 : e(t);
  return (n == null ? void 0 : n.getAccessibilityString(t)) ?? "";
}, aA = (t, e) => {
  const { width: n, height: r, accessibilityHeight: i, columns: o, cellXOffset: s, cellYOffset: a, headerHeight: l, fillHandle: c = !1, groupHeaderHeight: u, rowHeight: d, rows: f, getCellContent: h, getRowThemeOverride: p, onHeaderMenuClick: g, onHeaderIndicatorClick: m, enableGroups: y, isFilling: b, onCanvasFocused: T, onCanvasBlur: A, isFocused: v, selection: M, freezeColumns: O, onContextMenu: P, freezeTrailingRows: k, fixedShadowX: z = !0, fixedShadowY: C = !0, drawFocusRing: x, onMouseDown: I, onMouseUp: R, onMouseMoveRaw: S, onMouseMove: D, onItemHovered: $, dragAndDropState: B, firstColAccessible: Z, onKeyDown: L, onKeyUp: N, highlightRegions: J, canvasRef: U, onDragStart: K, onDragEnd: V, eventTargetRef: q, isResizing: G, resizeColumn: ne, isDragging: te, isDraggable: Y = !1, allowResize: ce, disabledRows: fe, hasAppendRow: Ee, getGroupDetails: Ce, theme: Be, prelightCells: it, headerIcons: mt, verticalBorder: ot, drawCell: re, drawHeader: _e, onCellFocused: Ie, onDragOverCell: $e, onDrop: De, onDragLeave: Oe, imageWindowLoader: Xe, smoothScrollX: pt = !1, smoothScrollY: Se = !1, experimental: Ze, getCellRenderer: Ct, resizeIndicator: ft = "full" } = t, Qe = t.translateX ?? 0, Rt = t.translateY ?? 0, Ve = Math.max(O, Math.min(o.length - 1, s)), tt = w.useRef(null), Pt = w.useRef((Ze == null ? void 0 : Ze.eventTarget) ?? window), Lt = Pt.current, Qt = Xe, yt = w.useRef(), [Ft, Ot] = w.useState(!1), hn = w.useRef([]), rn = w.useRef(), [bt, Sn] = w.useState(), [me, xe] = w.useState(), qe = w.useRef(null), [Ke, ue] = w.useState(), [ke, se] = w.useState(!1), F = w.useRef(ke);
  F.current = ke;
  const oe = w.useMemo(() => new zM(mt, () => {
    Yn.current = void 0, un.current();
  }), [mt]), he = y ? u + l : l, Pe = w.useRef(-1), nt = ((Ze == null ? void 0 : Ze.enableFirefoxRescaling) ?? !1) && iA.value, It = ((Ze == null ? void 0 : Ze.enableSafariRescaling) ?? !1) && tl.value;
  w.useLayoutEffect(() => {
    window.devicePixelRatio === 1 || !nt && !It || (Pe.current !== -1 && Ot(!0), window.clearTimeout(Pe.current), Pe.current = window.setTimeout(() => {
      Ot(!1), Pe.current = -1;
    }, 200));
  }, [a, Ve, Qe, Rt, nt, It]);
  const lt = pE(o, O), gt = w.useMemo(() => z ? Wo(lt, B) : 0, [lt, B, z]), kt = w.useCallback((ee, ve, st) => {
    const at = ee.getBoundingClientRect();
    if (ve >= lt.length || st >= f)
      return;
    const Fe = at.width / n, We = If(ve, st, n, r, u, he, Ve, a, Qe, Rt, f, O, k, lt, d);
    return Fe !== 1 && (We.x *= Fe, We.y *= Fe, We.width *= Fe, We.height *= Fe), We.x += at.x, We.y += at.y, We;
  }, [
    n,
    r,
    u,
    he,
    Ve,
    a,
    Qe,
    Rt,
    f,
    O,
    k,
    lt,
    d
  ]), vt = w.useCallback((ee, ve, st, at) => {
    const Fe = ee.getBoundingClientRect(), We = Fe.width / n, Tt = (ve - Fe.left) / We, Gt = (st - Fe.top) / We, ht = 5, Fn = Mf(lt, Ve, n, void 0, Qe);
    let xt = 0, Yt = 0;
    const $t = typeof PointerEvent < "u" && at instanceof PointerEvent && at.pointerType === "mouse" || typeof MouseEvent < "u" && at instanceof MouseEvent, Bt = typeof PointerEvent < "u" && at instanceof PointerEvent && at.pointerType === "touch" || typeof TouchEvent < "u" && at instanceof TouchEvent;
    $t && (xt = at.button, Yt = at.buttons);
    const Dt = bE(Tt, Fn, Qe), Xt = vE(Gt, r, y, l, u, f, d, a, Rt, k), Mn = (at == null ? void 0 : at.shiftKey) === !0, Dr = (at == null ? void 0 : at.ctrlKey) === !0, Nr = (at == null ? void 0 : at.metaKey) === !0, xn = [
      Tt < 0 ? -1 : n < Tt ? 1 : 0,
      Gt < he ? -1 : r < Gt ? 1 : 0
    ];
    let Nn;
    if (Dt === -1 || Gt < 0 || Tt < 0 || Xt === void 0 || Tt > n || Gt > r) {
      const on = Tt > n ? 1 : Tt < 0 ? -1 : 0, Sr = Gt > r ? 1 : Gt < 0 ? -1 : 0;
      let Jn = on * 2, go = Sr * 2;
      on === 0 && (Jn = Dt === -1 ? Do.EndPadding : Do.Center), Sr === 0 && (go = Xt === void 0 ? Do.EndPadding : Do.Center);
      let si = !1;
      if (Dt === -1 && Xt === -1) {
        const Hn = kt(ee, lt.length - 1, -1);
        yr(Hn !== void 0), si = ve < Hn.x + Hn.width + ht;
      }
      const Wt = Tt > n && Tt < n + kf() || Gt > r && Gt < r + kf();
      Nn = {
        kind: rl,
        location: [Dt !== -1 ? Dt : Tt < 0 ? 0 : lt.length - 1, Xt ?? f - 1],
        region: [Jn, go],
        shiftKey: Mn,
        ctrlKey: Dr,
        metaKey: Nr,
        isEdge: si,
        isTouch: Bt,
        button: xt,
        buttons: Yt,
        scrollEdge: xn,
        isMaybeScrollbar: Wt
      };
    } else if (Xt <= -1) {
      let on = kt(ee, Dt, Xt);
      yr(on !== void 0);
      let Sr = on !== void 0 && on.x + on.width - ve <= ht;
      const Jn = Dt - 1;
      ve - on.x <= ht && Jn >= 0 ? (Sr = !0, on = kt(ee, Jn, Xt), yr(on !== void 0), Nn = {
        kind: y && Xt === -2 ? Br : Mi,
        location: [Jn, Xt],
        bounds: on,
        group: lt[Jn].group ?? "",
        isEdge: Sr,
        shiftKey: Mn,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Bt,
        localEventX: ve - on.x,
        localEventY: st - on.y,
        button: xt,
        buttons: Yt,
        scrollEdge: xn
      }) : Nn = {
        kind: y && Xt === -2 ? Br : Mi,
        group: lt[Dt].group ?? "",
        location: [Dt, Xt],
        bounds: on,
        isEdge: Sr,
        shiftKey: Mn,
        ctrlKey: Dr,
        metaKey: Nr,
        isTouch: Bt,
        localEventX: ve - on.x,
        localEventY: st - on.y,
        button: xt,
        buttons: Yt,
        scrollEdge: xn
      };
    } else {
      const on = kt(ee, Dt, Xt);
      yr(on !== void 0);
      const Sr = on !== void 0 && on.x + on.width - ve < ht;
      let Jn = !1;
      if (c !== !1 && c !== void 0 && M.current !== void 0) {
        const si = typeof c == "object" ? { ...Ja, ...c } : Ja, Wt = si.size, Hn = Wt / 2, Bi = p1(M.current.range), vi = kt(ee, Bi[0], Bi[1]);
        if (vi !== void 0) {
          const ai = vi.x + vi.width + si.offsetX - Hn + 0.5, pn = vi.y + vi.height + si.offsetY - Hn + 0.5;
          Jn = Math.abs(ai - ve) < Wt && Math.abs(pn - st) < Wt;
        }
      }
      Nn = {
        kind: "cell",
        location: [Dt, Xt],
        bounds: on,
        isEdge: Sr,
        shiftKey: Mn,
        ctrlKey: Dr,
        isFillHandle: Jn,
        metaKey: Nr,
        isTouch: Bt,
        localEventX: ve - on.x,
        localEventY: st - on.y,
        button: xt,
        buttons: Yt,
        scrollEdge: xn
      };
    }
    return Nn;
  }, [
    n,
    lt,
    Ve,
    Qe,
    r,
    y,
    l,
    u,
    f,
    d,
    a,
    Rt,
    k,
    kt,
    c,
    M,
    he
  ]), [Ut] = bt ?? [], An = w.useRef(() => {
  }), zt = w.useRef(bt);
  zt.current = bt;
  const [cn, _n] = w.useMemo(() => {
    const ee = document.createElement("canvas"), ve = document.createElement("canvas");
    return ee.style.display = "none", ee.style.opacity = "0", ee.style.position = "fixed", ve.style.display = "none", ve.style.opacity = "0", ve.style.position = "fixed", [ee.getContext("2d", { alpha: !1 }), ve.getContext("2d", { alpha: !1 })];
  }, []);
  w.useLayoutEffect(() => {
    if (!(cn === null || _n === null))
      return document.documentElement.append(cn.canvas), document.documentElement.append(_n.canvas), () => {
        cn.canvas.remove(), _n.canvas.remove();
      };
  }, [cn, _n]);
  const Pn = w.useMemo(() => new ME(), []), Ht = nt && Ft ? 1 : It && Ft ? 2 : 5, mn = (Ze == null ? void 0 : Ze.disableMinimumCellWidth) === !0 ? 1 : 10, Yn = w.useRef(), bn = w.useRef(null), hr = w.useRef(null), Vn = w.useCallback(() => {
    var Tt;
    const ee = tt.current, ve = qe.current;
    if (ee === null || ve === null || (bn.current === null && (bn.current = ee.getContext("2d", { alpha: !1 }), ee.width = 0, ee.height = 0), hr.current === null && (hr.current = ve.getContext("2d", { alpha: !1 }), ve.width = 0, ve.height = 0), bn.current === null || hr.current === null || cn === null || _n === null))
      return;
    let st = !1;
    const at = (Gt) => {
      st = !0, ue(Gt);
    }, Fe = Yn.current, We = {
      headerCanvasCtx: hr.current,
      canvasCtx: bn.current,
      bufferACtx: cn,
      bufferBCtx: _n,
      width: n,
      height: r,
      cellXOffset: Ve,
      cellYOffset: a,
      translateX: Math.round(Qe),
      translateY: Math.round(Rt),
      mappedColumns: lt,
      enableGroups: y,
      freezeColumns: O,
      dragAndDropState: B,
      theme: Be,
      headerHeight: l,
      groupHeaderHeight: u,
      disabledRows: fe ?? tn.empty(),
      rowHeight: d,
      verticalBorder: ot,
      isResizing: G,
      resizeCol: ne,
      isFocused: v,
      selection: M,
      fillHandle: c,
      drawCellCallback: re,
      hasAppendRow: Ee,
      overrideCursor: at,
      maxScaleFactor: Ht,
      freezeTrailingRows: k,
      rows: f,
      drawFocus: x,
      getCellContent: h,
      getGroupDetails: Ce ?? ((Gt) => ({ name: Gt })),
      getRowThemeOverride: p,
      drawHeaderCallback: _e,
      prelightCells: it,
      highlightRegions: J,
      imageLoader: Qt,
      lastBlitData: rn,
      damage: yt.current,
      hoverValues: hn.current,
      hoverInfo: zt.current,
      spriteManager: oe,
      scrolling: Ft,
      hyperWrapping: (Ze == null ? void 0 : Ze.hyperWrapping) ?? !1,
      touchMode: ke,
      enqueue: An.current,
      renderStateProvider: Pn,
      renderStrategy: (Ze == null ? void 0 : Ze.renderStrategy) ?? (tl.value ? "double-buffer" : "single-buffer"),
      getCellRenderer: Ct,
      minimumCellWidth: mn,
      resizeIndicator: ft
    };
    We.damage === void 0 ? (Yn.current = We, Ty(We, Fe)) : Ty(We, void 0), !st && (We.damage === void 0 || We.damage.has((Tt = zt == null ? void 0 : zt.current) == null ? void 0 : Tt[0])) && ue(void 0);
  }, [
    cn,
    _n,
    n,
    r,
    Ve,
    a,
    Qe,
    Rt,
    lt,
    y,
    O,
    B,
    Be,
    l,
    u,
    fe,
    d,
    ot,
    G,
    Ee,
    ne,
    v,
    M,
    c,
    k,
    f,
    x,
    Ht,
    h,
    Ce,
    p,
    re,
    _e,
    it,
    J,
    Qt,
    oe,
    Ft,
    Ze == null ? void 0 : Ze.hyperWrapping,
    Ze == null ? void 0 : Ze.renderStrategy,
    ke,
    Pn,
    Ct,
    mn,
    ft
  ]), un = w.useRef(Vn);
  w.useLayoutEffect(() => {
    Vn(), un.current = Vn;
  }, [Vn]), w.useLayoutEffect(() => {
    (async () => {
      var ve;
      ((ve = document == null ? void 0 : document.fonts) == null ? void 0 : ve.ready) !== void 0 && (await document.fonts.ready, Yn.current = void 0, un.current());
    })();
  }, []);
  const Cn = w.useCallback((ee) => {
    yt.current = ee, un.current(), yt.current = void 0;
  }, []), or = oA(Cn);
  An.current = or;
  const Pr = w.useCallback((ee) => {
    Cn(new Rs(ee.map((ve) => ve.cell)));
  }, [Cn]);
  Qt.setCallback(Cn);
  const [gi, Ur] = w.useState(!1), [tr, kr] = Ut ?? [], mi = tr !== void 0 && kr === -1 && tr >= 0 && tr < lt.length && lt[tr].headerRowMarkerDisabled !== !0, Gr = tr !== void 0 && kr === -2;
  let sr = !1, Te = !1, et = Ke;
  if (et === void 0 && tr !== void 0 && kr !== void 0 && kr > -1 && kr < f) {
    const ee = h([tr, kr], !0);
    sr = ee.kind === Ir.NewRow || ee.kind === Ir.Marker && ee.markerKind !== "number", Te = ee.kind === He.Boolean && ph(ee), et = ee.cursor;
  }
  const vn = te ? "grabbing" : (me ?? !1) || G ? "col-resize" : gi || b ? "crosshair" : et !== void 0 ? et : mi || sr || Te || Gr ? "pointer" : "default", Vt = w.useMemo(() => ({
    // width,
    // height,
    contain: "strict",
    display: "block",
    cursor: vn
  }), [vn]), Jt = w.useRef("default"), Dn = q == null ? void 0 : q.current;
  Dn != null && Jt.current !== Vt.cursor && (Dn.style.cursor = Jt.current = Vt.cursor);
  const Yr = w.useCallback((ee, ve, st, at) => {
    if (Ce === void 0)
      return;
    const Fe = Ce(ee);
    if (Fe.actions !== void 0) {
      const We = N1(ve, Fe.actions);
      for (const [Tt, Gt] of We.entries())
        if (Qi(Gt, st + ve.x, at + Gt.y))
          return Fe.actions[Tt];
    }
  }, [Ce]), H = w.useCallback((ee, ve, st, at) => {
    const Fe = lt[ve];
    if (!te && !G && !(me ?? !1)) {
      const We = kt(ee, ve, -1);
      yr(We !== void 0);
      const Tt = O1(void 0, Fe, We.x, We.y, We.width, We.height, Be, vh(Fe.title) === "rtl");
      if (Fe.hasMenu === !0 && Tt.menuBounds !== void 0 && Qi(Tt.menuBounds, st, at))
        return {
          area: "menu",
          bounds: Tt.menuBounds
        };
      if (Fe.indicatorIcon !== void 0 && Tt.indicatorIconBounds !== void 0 && Qi(Tt.indicatorIconBounds, st, at))
        return {
          area: "indicator",
          bounds: Tt.indicatorIconBounds
        };
    }
  }, [lt, kt, me, te, G, Be]), we = w.useRef(0), Le = w.useRef(), Ue = w.useRef(!1), rt = w.useCallback((ee) => {
    const ve = tt.current, st = q == null ? void 0 : q.current;
    if (ve === null || ee.target !== ve && ee.target !== st)
      return;
    Ue.current = !0;
    const at = ee.clientX, Fe = ee.clientY;
    if (ee.target === st && st !== null) {
      const Tt = st.getBoundingClientRect();
      if (at > Tt.right || Fe > Tt.bottom)
        return;
    }
    const We = vt(ve, at, Fe, ee);
    Le.current = We.location, We.isTouch && (we.current = Date.now()), F.current !== We.isTouch && se(We.isTouch), !(We.kind === Mi && H(ve, We.location[0], at, Fe) !== void 0) && (We.kind === Br && Yr(We.group, We.bounds, We.localEventX, We.localEventY) !== void 0 || (I == null || I(We), !We.isTouch && Y !== !0 && Y !== We.kind && We.button < 3 && We.button !== 1 && ee.preventDefault()));
  }, [
    q,
    Y,
    vt,
    Yr,
    H,
    I
  ]);
  rr("pointerdown", rt, Lt, !1);
  const qt = w.useRef(0), Kn = w.useCallback((ee) => {
    var Yt, $t;
    const ve = qt.current;
    qt.current = Date.now();
    const st = tt.current;
    if (Ue.current = !1, R === void 0 || st === null)
      return;
    const at = q == null ? void 0 : q.current, Fe = ee.target !== st && ee.target !== at, We = ee.clientX, Tt = ee.clientY, Gt = ee.pointerType === "mouse" ? ee.button < 3 : !0;
    let ht = vt(st, We, Tt, ee);
    ht.isTouch && we.current !== 0 && Date.now() - we.current > 500 && (ht = {
      ...ht,
      isLongTouch: !0
    }), ve !== 0 && Date.now() - ve < (ht.isTouch ? 1e3 : 500) && (ht = {
      ...ht,
      isDoubleClick: !0
    }), F.current !== ht.isTouch && se(ht.isTouch), !Fe && ee.cancelable && Gt && ee.preventDefault();
    const [Fn] = ht.location, xt = H(st, Fn, We, Tt);
    if (ht.kind === Mi && xt !== void 0) {
      (ht.button !== 0 || ((Yt = Le.current) == null ? void 0 : Yt[0]) !== Fn || (($t = Le.current) == null ? void 0 : $t[1]) !== -1) && R(ht, !0);
      return;
    } else if (ht.kind === Br) {
      const Bt = Yr(ht.group, ht.bounds, ht.localEventX, ht.localEventY);
      if (Bt !== void 0) {
        ht.button === 0 && Bt.onClick(ht);
        return;
      }
    }
    R(ht, Fe);
  }, [R, q, vt, H, Yr]);
  rr("pointerup", Kn, Lt, !1);
  const Un = w.useCallback((ee) => {
    var Fn, xt;
    const ve = tt.current;
    if (ve === null)
      return;
    const st = q == null ? void 0 : q.current, at = ee.target !== ve && ee.target !== st;
    let Fe, We, Tt = !0;
    ee instanceof MouseEvent ? (Fe = ee.clientX, We = ee.clientY, Tt = ee.button < 3) : (Fe = ee.changedTouches[0].clientX, We = ee.changedTouches[0].clientY);
    const Gt = vt(ve, Fe, We, ee);
    F.current !== Gt.isTouch && se(Gt.isTouch), !at && ee.cancelable && Tt && ee.preventDefault();
    const [ht] = Gt.location;
    if (Gt.kind === Mi) {
      const Yt = H(ve, ht, Fe, We);
      Yt !== void 0 && Gt.button === 0 && ((Fn = Le.current) == null ? void 0 : Fn[0]) === ht && ((xt = Le.current) == null ? void 0 : xt[1]) === -1 && (Yt.area === "menu" ? g == null || g(ht, Yt.bounds) : Yt.area === "indicator" && (m == null || m(ht, Yt.bounds)));
    }
  }, [q, vt, H, g, m]);
  rr("click", Un, Lt, !1);
  const pr = w.useCallback((ee) => {
    const ve = tt.current, st = q == null ? void 0 : q.current;
    if (ve === null || ee.target !== ve && ee.target !== st || P === void 0)
      return;
    const at = vt(ve, ee.clientX, ee.clientY, ee);
    P(at, () => {
      ee.cancelable && ee.preventDefault();
    });
  }, [q, vt, P]);
  rr("contextmenu", pr, (q == null ? void 0 : q.current) ?? null, !1);
  const yi = w.useCallback((ee) => {
    yt.current = new Rs(ee.map((ve) => ve.item)), hn.current = ee, un.current(), yt.current = void 0;
  }, []), wt = w.useMemo(() => new nA(yi), [yi]), Li = w.useRef(wt);
  Li.current = wt, w.useLayoutEffect(() => {
    const ee = Li.current;
    if (Ut === void 0 || Ut[1] < 0) {
      ee.setHovered(Ut);
      return;
    }
    const ve = h(Ut, !0), st = Ct(ve), at = st === void 0 && ve.kind === He.Custom || (st == null ? void 0 : st.needsHover) !== void 0 && (typeof st.needsHover == "boolean" ? st.needsHover : st.needsHover(ve));
    ee.setHovered(at ? Ut : void 0);
  }, [h, Ct, Ut]);
  const $i = w.useRef(), ar = w.useCallback((ee) => {
    var Gt;
    const ve = tt.current;
    if (ve === null)
      return;
    const st = q == null ? void 0 : q.current, at = ee.target !== ve && ee.target !== st, Fe = vt(ve, ee.clientX, ee.clientY, ee);
    if (Fe.kind !== "out-of-bounds" && at && !Ue.current && !Fe.isTouch)
      return;
    const We = (ht, Fn) => {
      Sn((xt) => xt === ht || (xt == null ? void 0 : xt[0][0]) === (ht == null ? void 0 : ht[0][0]) && (xt == null ? void 0 : xt[0][1]) === (ht == null ? void 0 : ht[0][1]) && ((xt == null ? void 0 : xt[1][0]) === (ht == null ? void 0 : ht[1][0]) && (xt == null ? void 0 : xt[1][1]) === (ht == null ? void 0 : ht[1][1]) || !Fn) ? xt : ht);
    };
    if (!U1(Fe, $i.current))
      ue(void 0), $ == null || $(Fe), We(Fe.kind === rl ? void 0 : [Fe.location, [Fe.localEventX, Fe.localEventY]], !0), $i.current = Fe;
    else if (Fe.kind === "cell" || Fe.kind === Mi || Fe.kind === Br) {
      let ht = !1, Fn = !0;
      if (Fe.kind === "cell") {
        const Yt = h(Fe.location);
        Fn = ((Gt = Ct(Yt)) == null ? void 0 : Gt.needsHoverPosition) ?? Yt.kind === He.Custom, ht = Fn;
      } else
        ht = !0;
      const xt = [Fe.location, [Fe.localEventX, Fe.localEventY]];
      We(xt, Fn), zt.current = xt, ht && Cn(new Rs([Fe.location]));
    }
    const Tt = Fe.location[0] >= (Z ? 0 : 1);
    xe(Fe.kind === Mi && Fe.isEdge && Tt && ce === !0), Ur(Fe.kind === "cell" && Fe.isFillHandle), S == null || S(ee), D(Fe);
  }, [
    q,
    vt,
    Z,
    ce,
    S,
    D,
    $,
    h,
    Ct,
    Cn
  ]);
  rr("pointermove", ar, Lt, !0);
  const fo = w.useCallback((ee) => {
    const ve = tt.current;
    if (ve === null)
      return;
    let st, at;
    M.current !== void 0 && (st = kt(ve, M.current.cell[0], M.current.cell[1]), at = M.current.cell), L == null || L({
      bounds: st,
      stopPropagation: () => ee.stopPropagation(),
      preventDefault: () => ee.preventDefault(),
      cancel: () => {
      },
      ctrlKey: ee.ctrlKey,
      metaKey: ee.metaKey,
      shiftKey: ee.shiftKey,
      altKey: ee.altKey,
      key: ee.key,
      keyCode: ee.keyCode,
      rawEvent: ee,
      location: at
    });
  }, [L, M, kt]), en = w.useCallback((ee) => {
    const ve = tt.current;
    if (ve === null)
      return;
    let st, at;
    M.current !== void 0 && (st = kt(ve, M.current.cell[0], M.current.cell[1]), at = M.current.cell), N == null || N({
      bounds: st,
      stopPropagation: () => ee.stopPropagation(),
      preventDefault: () => ee.preventDefault(),
      cancel: () => {
      },
      ctrlKey: ee.ctrlKey,
      metaKey: ee.metaKey,
      shiftKey: ee.shiftKey,
      altKey: ee.altKey,
      key: ee.key,
      keyCode: ee.keyCode,
      rawEvent: ee,
      location: at
    });
  }, [N, M, kt]), Fi = w.useCallback((ee) => {
    if (tt.current = ee, U !== void 0 && (U.current = ee), Ze != null && Ze.eventTarget)
      Pt.current = Ze.eventTarget;
    else if (ee === null)
      Pt.current = window;
    else {
      const ve = ee.getRootNode();
      ve === document && (Pt.current = window), Pt.current = ve;
    }
  }, [U, Ze == null ? void 0 : Ze.eventTarget]), Gs = w.useCallback((ee) => {
    const ve = tt.current;
    if (ve === null || Y === !1 || G) {
      ee.preventDefault();
      return;
    }
    let st, at;
    const Fe = vt(ve, ee.clientX, ee.clientY);
    if (Y !== !0 && Fe.kind !== Y) {
      ee.preventDefault();
      return;
    }
    const We = (Yt, $t) => {
      st = Yt, at = $t;
    };
    let Tt, Gt, ht;
    const Fn = (Yt, $t, Bt) => {
      Tt = Yt, Gt = $t, ht = Bt;
    };
    let xt = !1;
    if (K == null || K({
      ...Fe,
      setData: We,
      setDragImage: Fn,
      preventDefault: () => xt = !0,
      defaultPrevented: () => xt
    }), !xt && st !== void 0 && at !== void 0 && ee.dataTransfer !== null)
      if (ee.dataTransfer.setData(st, at), ee.dataTransfer.effectAllowed = "copyLink", Tt !== void 0 && Gt !== void 0 && ht !== void 0)
        ee.dataTransfer.setDragImage(Tt, Gt, ht);
      else {
        const [Yt, $t] = Fe.location;
        if ($t !== void 0) {
          const Bt = document.createElement("canvas"), Dt = kt(ve, Yt, $t);
          yr(Dt !== void 0);
          const Xt = Math.ceil(window.devicePixelRatio ?? 1);
          Bt.width = Dt.width * Xt, Bt.height = Dt.height * Xt;
          const Mn = Bt.getContext("2d");
          Mn !== null && (Mn.scale(Xt, Xt), Mn.textBaseline = "middle", $t === -1 ? (Mn.font = Be.headerFontFull, Mn.fillStyle = Be.bgHeader, Mn.fillRect(0, 0, Bt.width, Bt.height), z1(Mn, 0, 0, Dt.width, Dt.height, lt[Yt], !1, Be, !1, void 0, void 0, !1, 0, oe, _e, !1)) : (Mn.font = Be.baseFontFull, Mn.fillStyle = Be.bgCell, Mn.fillRect(0, 0, Bt.width, Bt.height), D1(Mn, h([Yt, $t]), 0, $t, !1, !1, 0, 0, Dt.width, Dt.height, !1, Be, Be.bgCell, Qt, oe, 1, void 0, !1, 0, void 0, void 0, void 0, Pn, Ct, () => {
          }))), Bt.style.left = "-100%", Bt.style.position = "absolute", Bt.style.width = `${Dt.width}px`, Bt.style.height = `${Dt.height}px`, document.body.append(Bt), ee.dataTransfer.setDragImage(Bt, Dt.width / 2, Dt.height / 2), window.setTimeout(() => {
            Bt.remove();
          }, 0);
        }
      }
    else
      ee.preventDefault();
  }, [
    Y,
    G,
    vt,
    K,
    kt,
    Be,
    lt,
    oe,
    _e,
    h,
    Qt,
    Pn,
    Ct
  ]);
  rr("dragstart", Gs, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const ho = w.useRef(), Tl = w.useCallback((ee) => {
    const ve = tt.current;
    if (De !== void 0 && ee.preventDefault(), ve === null || $e === void 0)
      return;
    const st = vt(ve, ee.clientX, ee.clientY), [at, Fe] = st.location, We = at - (Z ? 0 : 1), [Tt, Gt] = ho.current ?? [];
    (Tt !== We || Gt !== Fe) && (ho.current = [We, Fe], $e([We, Fe], ee.dataTransfer));
  }, [Z, vt, $e, De]);
  rr("dragover", Tl, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const El = w.useCallback(() => {
    ho.current = void 0, V == null || V();
  }, [V]);
  rr("dragend", El, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const Xr = w.useCallback((ee) => {
    const ve = tt.current;
    if (ve === null || De === void 0)
      return;
    ee.preventDefault();
    const st = vt(ve, ee.clientX, ee.clientY), [at, Fe] = st.location, We = at - (Z ? 0 : 1);
    De([We, Fe], ee.dataTransfer);
  }, [Z, vt, De]);
  rr("drop", Xr, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const bi = w.useCallback(() => {
    Oe == null || Oe();
  }, [Oe]);
  rr("dragleave", bi, (q == null ? void 0 : q.current) ?? null, !1, !1);
  const gr = w.useRef(M);
  gr.current = M;
  const ie = w.useRef(null), wn = w.useCallback((ee) => {
    var ve;
    tt.current === null || !tt.current.contains(document.activeElement) || (ee === null && gr.current.current !== void 0 ? (ve = U == null ? void 0 : U.current) == null || ve.focus({
      preventScroll: !0
    }) : ee !== null && ee.focus({
      preventScroll: !0
    }), ie.current = ee);
  }, [U]);
  w.useImperativeHandle(e, () => ({
    focus: () => {
      var ve;
      const ee = ie.current;
      ee === null || !document.contains(ee) ? (ve = U == null ? void 0 : U.current) == null || ve.focus({
        preventScroll: !0
      }) : ee.focus({
        preventScroll: !0
      });
    },
    getBounds: (ee, ve) => {
      if (!(U === void 0 || U.current === null))
        return kt(U.current, ee ?? 0, ve ?? -1);
    },
    damage: Pr,
    getMouseArgsForPosition: (ee, ve, st) => {
      if (!(U === void 0 || U.current === null))
        return vt(U.current, ee, ve, st);
    }
  }), [U, Pr, kt, vt]);
  const oi = w.useRef(), Ml = hT(() => {
    var Gt, ht, Fn;
    if (n < 50 || (Ze == null ? void 0 : Ze.disableAccessibilityTree) === !0)
      return null;
    let ee = Mf(lt, Ve, n, B, Qe);
    const ve = Z ? 0 : -1;
    !Z && ((Gt = ee[0]) == null ? void 0 : Gt.sourceIndex) === 0 && (ee = ee.slice(1));
    const [st, at] = ((ht = M.current) == null ? void 0 : ht.cell) ?? [], Fe = (Fn = M.current) == null ? void 0 : Fn.range, We = ee.map((xt) => xt.sourceIndex), Tt = Yi(a, Math.min(f, a + i));
    return st !== void 0 && at !== void 0 && !(We.includes(st) && Tt.includes(at)) && wn(null), w.createElement(
      "table",
      { key: "access-tree", role: "grid", "aria-rowcount": f + 1, "aria-multiselectable": "true", "aria-colcount": lt.length + ve },
      w.createElement(
        "thead",
        { role: "rowgroup" },
        w.createElement("tr", { role: "row", "aria-rowindex": 1 }, ee.map((xt) => w.createElement("th", { role: "columnheader", "aria-selected": M.columns.hasIndex(xt.sourceIndex), "aria-colindex": xt.sourceIndex + 1 + ve, tabIndex: -1, onFocus: (Yt) => {
          if (Yt.target !== ie.current)
            return Ie == null ? void 0 : Ie([xt.sourceIndex, -1]);
        }, key: xt.sourceIndex }, xt.title)))
      ),
      w.createElement("tbody", { role: "rowgroup" }, Tt.map((xt) => w.createElement("tr", { role: "row", "aria-selected": M.rows.hasIndex(xt), key: xt, "aria-rowindex": xt + 2 }, ee.map((Yt) => {
        const $t = Yt.sourceIndex, Bt = qr($t, xt), Dt = st === $t && at === xt, Xt = Fe !== void 0 && $t >= Fe.x && $t < Fe.x + Fe.width && xt >= Fe.y && xt < Fe.y + Fe.height, Mn = `glide-cell-${$t}-${xt}`, Dr = [$t, xt], Nr = h(Dr, !0);
        return w.createElement("td", { key: Bt, role: "gridcell", "aria-colindex": $t + 1 + ve, "aria-selected": Xt, "aria-readonly": _o(Nr) || !Eo(Nr), id: Mn, "data-testid": Mn, onClick: () => {
          const xn = U == null ? void 0 : U.current;
          if (xn != null)
            return L == null ? void 0 : L({
              bounds: kt(xn, $t, xt),
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
          var Nn, on;
          if (!(xn.target === ie.current || ((Nn = oi.current) == null ? void 0 : Nn[0]) === $t && ((on = oi.current) == null ? void 0 : on[1]) === xt))
            return oi.current = Dr, Ie == null ? void 0 : Ie(Dr);
        }, ref: Dt ? wn : void 0, tabIndex: -1 }, sA(Nr, Ct));
      }))))
    );
  }, [
    n,
    lt,
    Ve,
    B,
    Qe,
    f,
    a,
    i,
    M,
    wn,
    h,
    U,
    L,
    kt,
    Ie
  ], 200), Hi = O === 0 || !z ? 0 : Ve > O ? 1 : Er(-Qe / 100, 0, 1), Il = -a * 32 + Rt, po = C ? Er(-Il / 100, 0, 1) : 0, Fh = w.useMemo(() => {
    if (!Hi && !po)
      return null;
    const ee = {
      position: "absolute",
      top: 0,
      left: gt,
      width: n - gt,
      height: r,
      opacity: Hi,
      pointerEvents: "none",
      transition: pt ? void 0 : "opacity 0.2s",
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    }, ve = {
      position: "absolute",
      top: he,
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
      Hi > 0 && w.createElement("div", { id: "shadow-x", style: ee }),
      po > 0 && w.createElement("div", { id: "shadow-y", style: ve })
    );
  }, [Hi, po, gt, n, pt, he, r, Se]), pe = w.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0
  }), []);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("canvas", { "data-testid": "data-grid-canvas", tabIndex: 0, onKeyDown: fo, onKeyUp: en, onFocus: T, onBlur: A, ref: Fi, style: Vt }, Ml),
    w.createElement("canvas", { ref: qe, style: pe }),
    Fh
  );
}, lA = w.memo(w.forwardRef(aA));
function hs(t, e, n, r) {
  return Er(Math.round(e - (t.growOffset ?? 0)), Math.ceil(n), Math.floor(r));
}
const cA = (t) => {
  const [e, n] = w.useState(), [r, i] = w.useState(), [o, s] = w.useState(), [a, l] = w.useState(), [c, u] = w.useState(!1), [d, f] = w.useState(), [h, p] = w.useState(), [g, m] = w.useState(), [y, b] = w.useState(!1), [T, A] = w.useState(), { onHeaderMenuClick: v, onHeaderIndicatorClick: M, getCellContent: O, onColumnMoved: P, onColumnResize: k, onColumnResizeStart: z, onColumnResizeEnd: C, gridRef: x, maxColumnWidth: I, minColumnWidth: R, onRowMoved: S, lockColumns: D, onColumnProposeMove: $, onMouseDown: B, onMouseUp: Z, onItemHovered: L, onDragStart: N, canvasRef: J } = t, U = (k ?? C ?? z) !== void 0, { columns: K, selection: V } = t, q = V.columns, G = w.useCallback((re) => {
    const [_e, Ie] = re.location;
    o !== void 0 && a !== _e && _e >= D ? (u(!0), l(_e)) : h !== void 0 && Ie !== void 0 ? (b(!0), m(Math.max(0, Ie))) : r === void 0 && !c && !y && (L == null || L(re));
  }, [o, h, a, L, D, r, c, y]), ne = P !== void 0, te = w.useCallback((re) => {
    var _e;
    if (re.button === 0) {
      const [Ie, $e] = re.location;
      if (re.kind === "out-of-bounds" && re.isEdge && U) {
        const De = (_e = x == null ? void 0 : x.current) == null ? void 0 : _e.getBounds(K.length - 1, -1);
        De !== void 0 && (n(De.x), i(K.length - 1));
      } else if (re.kind === "header" && Ie >= D) {
        const De = J == null ? void 0 : J.current;
        if (re.isEdge && U && De) {
          n(re.bounds.x), i(Ie);
          const Xe = De.getBoundingClientRect().width / De.offsetWidth, pt = re.bounds.width / Xe;
          z == null || z(K[Ie], pt, Ie, pt + (K[Ie].growOffset ?? 0));
        } else re.kind === "header" && ne && (f(re.bounds.x), s(Ie));
      } else re.kind === "cell" && D > 0 && Ie === 0 && $e !== void 0 && S !== void 0 && (A(re.bounds.y), p($e));
    }
    B == null || B(re);
  }, [B, U, D, S, x, K, ne, z, J]), Y = w.useCallback((re, _e) => {
    c || y || v == null || v(re, _e);
  }, [c, y, v]), ce = w.useCallback((re, _e) => {
    c || y || M == null || M(re, _e);
  }, [c, y, M]), fe = w.useRef(-1), Ee = w.useCallback(() => {
    fe.current = -1, p(void 0), m(void 0), A(void 0), b(!1), s(void 0), l(void 0), f(void 0), u(!1), i(void 0), n(void 0);
  }, []), Ce = w.useCallback((re, _e) => {
    if (re.button === 0) {
      if (r !== void 0) {
        if ((q == null ? void 0 : q.hasIndex(r)) === !0)
          for (const $e of q) {
            if ($e === r)
              continue;
            const De = K[$e], Oe = hs(De, fe.current, R, I);
            k == null || k(De, Oe, $e, Oe + (De.growOffset ?? 0));
          }
        const Ie = hs(K[r], fe.current, R, I);
        if (C == null || C(K[r], Ie, r, Ie + (K[r].growOffset ?? 0)), q.hasIndex(r))
          for (const $e of q) {
            if ($e === r)
              continue;
            const De = K[$e], Oe = hs(De, fe.current, R, I);
            C == null || C(De, Oe, $e, Oe + (De.growOffset ?? 0));
          }
      }
      Ee(), o !== void 0 && a !== void 0 && ($ == null ? void 0 : $(o, a)) !== !1 && (P == null || P(o, a)), h !== void 0 && g !== void 0 && (S == null || S(h, g));
    }
    Z == null || Z(re, _e);
  }, [
    Z,
    r,
    o,
    a,
    h,
    g,
    q,
    C,
    K,
    R,
    I,
    k,
    P,
    S,
    Ee,
    $
  ]), Be = w.useMemo(() => {
    if (!(o === void 0 || a === void 0) && o !== a && ($ == null ? void 0 : $(o, a)) !== !1)
      return {
        src: o,
        dest: a
      };
  }, [o, a, $]), it = w.useCallback((re) => {
    const _e = J == null ? void 0 : J.current;
    if (o !== void 0 && d !== void 0)
      Math.abs(re.clientX - d) > 20 && u(!0);
    else if (h !== void 0 && T !== void 0)
      Math.abs(re.clientY - T) > 20 && b(!0);
    else if (r !== void 0 && e !== void 0 && _e) {
      const $e = _e.getBoundingClientRect().width / _e.offsetWidth, De = (re.clientX - e) / $e, Oe = K[r], Xe = hs(Oe, De, R, I);
      if (k == null || k(Oe, Xe, r, Xe + (Oe.growOffset ?? 0)), fe.current = De, (q == null ? void 0 : q.first()) === r)
        for (const pt of q) {
          if (pt === r)
            continue;
          const Se = K[pt], Ze = hs(Se, fe.current, R, I);
          k == null || k(Se, Ze, pt, Ze + (Se.growOffset ?? 0));
        }
    }
  }, [
    o,
    d,
    h,
    T,
    r,
    e,
    K,
    R,
    I,
    k,
    q,
    J
  ]), mt = w.useCallback((re, _e) => {
    if (h === void 0 || g === void 0)
      return O(re, _e);
    let [Ie, $e] = re;
    return $e === g ? $e = h : ($e > g && ($e -= 1), $e >= h && ($e += 1)), O([Ie, $e], _e);
  }, [h, g, O]), ot = w.useCallback((re) => {
    N == null || N(re), re.defaultPrevented() || Ee();
  }, [Ee, N]);
  return w.createElement(lA, { accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, enableGroups: t.enableGroups, eventTargetRef: t.eventTargetRef, experimental: t.experimental, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, headerIcons: t.headerIcons, height: t.height, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, resizeColumn: r, isDraggable: t.isDraggable, isFilling: t.isFilling, isFocused: t.isFocused, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDrop: t.onDrop, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, resizeIndicator: t.resizeIndicator, verticalBorder: t.verticalBorder, width: t.width, getCellContent: mt, isResizing: r !== void 0, onHeaderMenuClick: Y, onHeaderIndicatorClick: ce, isDragging: c, onItemHovered: G, onDragStart: ot, onMouseDown: te, allowResize: U, onMouseUp: Ce, dragAndDropState: Be, onMouseMoveRaw: it, ref: x });
};
function uA(t) {
  const e = Q(null), [n, r] = Ye({
    width: t == null ? void 0 : t[0],
    height: t == null ? void 0 : t[1]
  });
  return $n(() => {
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
  const r = Q(null), i = Q(null), o = Q(null), s = Q(0), a = Q(e);
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
}, fA = () => (t) => t.isSafari ? "scroll" : "auto", hA = /* @__PURE__ */ xr("div")({
  name: "ScrollRegionStyle",
  class: "gdg-s1dgczr6",
  propsAsIs: !1,
  vars: {
    "s1dgczr6-0": [fA()]
  }
}), pA = 33554400, gA = 5e6;
function mA(t) {
  const [e, n] = w.useState(!1), r = typeof window > "u" ? null : window, i = w.useRef(0);
  return rr("touchstart", w.useCallback(() => {
    window.clearTimeout(i.current), n(!0);
  }, []), r, !0, !1), rr("touchend", w.useCallback((o) => {
    o.touches.length === 0 && (i.current = window.setTimeout(() => n(!1), t));
  }, [t]), r, !0, !1), e;
}
const yA = (t) => {
  var V, q;
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
  } = t, m = [], y = (f == null ? void 0 : f.sticky) ?? !1, b = (f == null ? void 0 : f.fill) ?? !1, T = w.useRef(0), A = w.useRef(0), v = w.useRef(null), M = typeof window > "u" ? 1 : window.devicePixelRatio, O = w.useRef(M);
  w.useEffect(() => {
    if (O.current !== M) {
      T.current = 0, A.current = 0, O.current = M;
      const G = v.current;
      G !== null && S.current(G.scrollLeft, G.scrollTop);
    }
  }, [M]);
  const P = w.useRef({
    scrollLeft: 0,
    scrollTop: 0,
    lockDirection: void 0
  }), k = w.useRef(null), z = mA(200), [C, x] = w.useState(!0), I = w.useRef(0);
  w.useLayoutEffect(() => {
    if (!C || z || P.current.lockDirection === void 0) return;
    const G = v.current;
    if (G === null) return;
    const [ne, te] = P.current.lockDirection;
    ne !== void 0 ? G.scrollLeft = ne : te !== void 0 && (G.scrollTop = te), P.current.lockDirection = void 0;
  }, [z, C]);
  const R = w.useCallback((G, ne) => {
    var Ie;
    const te = v.current;
    if (te === null) return;
    ne = ne ?? te.scrollTop, G = G ?? te.scrollLeft;
    const Y = P.current.scrollTop, ce = P.current.scrollLeft, fe = G - ce, Ee = ne - Y;
    z && fe !== 0 && Ee !== 0 && (Math.abs(fe) > 3 || Math.abs(Ee) > 3) && l && P.current.lockDirection === void 0 && (P.current.lockDirection = Math.abs(fe) < Math.abs(Ee) ? [ce, void 0] : [void 0, Y]);
    const Ce = P.current.lockDirection;
    G = (Ce == null ? void 0 : Ce[0]) ?? G, ne = (Ce == null ? void 0 : Ce[1]) ?? ne, P.current.scrollLeft = G, P.current.scrollTop = ne;
    const Be = te.clientWidth, it = te.clientHeight, mt = ne, ot = A.current - mt, re = te.scrollHeight - it;
    A.current = mt;
    let _e;
    if (re > 0 && r > te.scrollHeight + 5)
      if (Math.abs(ot) > 2e3 || mt === 0 || mt === re) {
        const $e = Math.max(0, Math.min(1, mt / re)), De = r - it;
        _e = $e * De, T.current = _e;
      } else
        T.current -= ot, _e = T.current;
    else
      _e = mt, T.current = _e;
    _e = Math.max(0, Math.min(_e, r - it)), T.current = _e, Ce !== void 0 && (window.clearTimeout(I.current), x(!1), I.current = window.setTimeout(() => x(!0), 200)), o({
      x: G,
      y: _e,
      width: Be - u,
      height: it - c,
      paddingRight: ((Ie = k.current) == null ? void 0 : Ie.clientWidth) ?? 0
    });
  }, [c, u, r, o, l, z]);
  dA(h && tl.value, R, v);
  const S = w.useRef(R);
  S.current = R;
  const D = w.useRef(), $ = w.useRef(!1);
  w.useLayoutEffect(() => {
    $.current ? R() : $.current = !0;
  }, [R, c, u]);
  const B = w.useCallback((G) => {
    v.current = G, p !== void 0 && (p.current = G);
  }, [p]);
  let Z = 0, L = 0;
  const N = Math.min(r, pA);
  for (m.push(w.createElement("div", {
    key: Z++,
    style: {
      width: i,
      height: 0
    }
  })); L < N; ) {
    const G = Math.min(gA, N - L);
    m.push(w.createElement("div", {
      key: Z++,
      style: {
        width: 0,
        height: G
      }
    })), L += G;
  }
  const {
    ref: J,
    width: U,
    height: K
  } = uA(g);
  return typeof window < "u" && (((V = D.current) == null ? void 0 : V.height) !== K || ((q = D.current) == null ? void 0 : q.width) !== U) && (window.setTimeout(() => S.current(), 0), D.current = {
    width: U,
    height: K
  }), (U ?? 0) === 0 || (K ?? 0) === 0 ? w.createElement("div", {
    ref: J
  }) : w.createElement("div", {
    ref: J
  }, w.createElement(hA, {
    isSafari: tl.value
  }, w.createElement("div", {
    className: "dvn-underlay"
  }, e), w.createElement("div", {
    ref: B,
    style: D.current,
    draggable: s,
    onDragStart: (G) => {
      s || (G.stopPropagation(), G.preventDefault());
    },
    className: "dvn-scroller " + (a ?? ""),
    onScroll: () => R()
  }, w.createElement("div", {
    className: "dvn-scroll-inner" + (d === void 0 ? " dvn-hidden" : "")
  }, w.createElement("div", {
    className: "dvn-stack"
  }, m), d !== void 0 && w.createElement(w.Fragment, null, !b && w.createElement("div", {
    className: "dvn-spacer"
  }), w.createElement("div", {
    ref: k,
    style: {
      height: K,
      maxHeight: n - Math.ceil(M % 1),
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
  const { columns: e, rows: n, rowHeight: r, headerHeight: i, groupHeaderHeight: o, enableGroups: s, freezeColumns: a, experimental: l, nonGrowWidth: c, clientSize: u, className: d, onVisibleRegionChanged: f, scrollRef: h, preventDiagonalScrolling: p, rightElement: g, rightElementProps: m, overscrollX: y, overscrollY: b, initialSize: T, smoothScrollX: A = !1, smoothScrollY: v = !1, isDraggable: M } = t, { paddingRight: O, paddingBottom: P } = l ?? {}, [k, z] = u, C = w.useRef(), x = w.useRef(), I = w.useRef(), R = w.useRef(), S = c + Math.max(0, y ?? 0);
  let D = s ? i + o : i;
  if (typeof r == "number")
    D += n * r;
  else
    for (let L = 0; L < n; L++)
      D += r(L);
  b !== void 0 && (D += b);
  const $ = w.useRef(), B = w.useCallback(() => {
    var ce, fe;
    if ($.current === void 0)
      return;
    const L = { ...$.current };
    let N = 0, J = L.x < 0 ? -L.x : 0, U = 0, K = 0;
    L.x = L.x < 0 ? 0 : L.x;
    let V = 0;
    for (let Ee = 0; Ee < a; Ee++)
      V += e[Ee].width;
    for (const Ee of e) {
      const Ce = N - V;
      if (L.x >= Ce + Ee.width)
        N += Ee.width, K++, U++;
      else if (L.x > Ce)
        N += Ee.width, A ? J += Ce - L.x : K++, U++;
      else if (L.x + L.width > Ce)
        N += Ee.width, U++;
      else
        break;
    }
    let q = 0, G = 0, ne = 0;
    if (typeof r == "number")
      v ? (G = Math.floor(L.y / r), q = G * r - L.y) : G = Math.ceil(L.y / r), ne = Math.ceil(L.height / r) + G, q < 0 && ne++;
    else {
      let Ee = 0;
      for (let Ce = 0; Ce < n; Ce++) {
        const Be = r(Ce), it = Ee + (v ? 0 : Be / 2);
        if (L.y >= Ee + Be)
          Ee += Be, G++, ne++;
        else if (L.y > it)
          Ee += Be, v ? q += it - L.y : G++, ne++;
        else if (L.y + L.height > Be / 2 + Ee)
          Ee += Be, ne++;
        else
          break;
      }
    }
    G = Math.max(0, Math.min(G, n - 1)), ne = Math.max(G, Math.min(ne, n));
    const te = {
      x: K,
      y: G,
      width: U - K,
      height: ne - G
    }, Y = C.current;
    (Y === void 0 || Y.y !== te.y || Y.x !== te.x || Y.height !== te.height || Y.width !== te.width || x.current !== J || I.current !== q || L.width !== ((ce = R.current) == null ? void 0 : ce[0]) || L.height !== ((fe = R.current) == null ? void 0 : fe[1])) && (f == null || f({
      x: K,
      y: G,
      width: U - K,
      height: ne - G
    }, L.width, L.height, L.paddingRight ?? 0, J, q), C.current = te, x.current = J, I.current = q, R.current = [L.width, L.height]);
  }, [e, r, n, f, a, A, v]), Z = w.useCallback((L) => {
    $.current = L, B();
  }, [B]);
  return w.useEffect(() => {
    B();
  }, [B]), w.createElement(
    yA,
    { scrollRef: h, className: d, kineticScrollPerfHack: l == null ? void 0 : l.kineticScrollPerfHack, preventDiagonalScrolling: p, draggable: M === !0 || typeof M == "string", scrollWidth: S + (O ?? 0), scrollHeight: D + (P ?? 0), clientHeight: z, rightElement: g, paddingBottom: P, paddingRight: O, rightElementProps: m, update: Z, initialSize: T },
    w.createElement(cA, { eventTargetRef: h, width: k, height: z, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, prelightCells: t.prelightCells, rowHeight: t.rowHeight, rows: t.rows, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, onColumnProposeMove: t.onColumnProposeMove, verticalBorder: t.verticalBorder, drawFocusRing: t.drawFocusRing, drawHeader: t.drawHeader, drawCell: t.drawCell, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator })
  );
}, vA = /* @__PURE__ */ xr("div")({
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
  const { canvasRef: e, cellYOffset: n, rows: r, columns: i, searchInputRef: o, searchValue: s, searchResults: a, onSearchValueChange: l, getCellsForSelection: c, onSearchResultsChanged: u, showSearch: d = !1, onSearchClose: f } = t, [h] = w.useState(() => "search-box-" + Math.round(Math.random() * 1e3)), [p, g] = w.useState(""), m = s ?? p, y = w.useCallback((N) => {
    g(N), l == null || l(N);
  }, [l]), [b, T] = w.useState(), A = w.useRef(b);
  A.current = b, w.useEffect(() => {
    a !== void 0 && (a.length > 0 ? T((N) => ({
      rowsSearched: r,
      results: a.length,
      selectedIndex: (N == null ? void 0 : N.selectedIndex) ?? -1
    })) : T(void 0));
  }, [r, a]);
  const v = w.useRef();
  v.current === void 0 && (v.current = new AbortController());
  const M = w.useRef(), [O, P] = w.useState([]), k = a ?? O, z = w.useCallback(() => {
    M.current !== void 0 && (window.cancelAnimationFrame(M.current), M.current = void 0), v.current !== void 0 && v.current.abort(), v.current = new AbortController();
  }, []), C = w.useRef(n);
  C.current = n;
  const x = w.useCallback((N) => {
    const J = new RegExp(N.replace(/([$()*+.?[\\\]^{|}-])/g, "\\$1"), "i");
    let U = C.current, K = Math.min(10, r), V = 0;
    T(void 0), P([]);
    const q = [], G = async () => {
      var mt;
      if (c === void 0)
        return;
      const ne = performance.now(), te = r - V;
      let Y = c({
        x: 0,
        y: U,
        width: i.length,
        height: Math.min(K, te, r - U)
      }, v.current.signal);
      typeof Y == "function" && (Y = await Y());
      let ce = !1;
      for (const [ot, re] of Y.entries())
        for (const [_e, Ie] of re.entries()) {
          let $e;
          switch (Ie.kind) {
            case He.Text:
            case He.Number:
              $e = Ie.displayData;
              break;
            case He.Uri:
            case He.Markdown:
              $e = Ie.data;
              break;
            case He.Boolean:
              $e = typeof Ie.data == "boolean" ? Ie.data.toString() : void 0;
              break;
            case He.Image:
            case He.Bubble:
              $e = Ie.data.join("🐳");
              break;
            case He.Custom:
              $e = Ie.copyData;
              break;
          }
          $e !== void 0 && J.test($e) && (q.push([_e, ot + U]), ce = !0);
        }
      const fe = performance.now();
      ce && P([...q]), V += Y.length, yr(V <= r);
      const Ee = ((mt = A.current) == null ? void 0 : mt.selectedIndex) ?? -1;
      T({
        results: q.length,
        rowsSearched: V,
        selectedIndex: Ee
      }), u == null || u(q, Ee), U + K >= r ? U = 0 : U += K;
      const Ce = fe - ne, Be = Math.max(Ce, 1), it = SA / Be;
      K = Math.ceil(K * it), V < r && q.length < 1e3 && (M.current = window.requestAnimationFrame(G));
    };
    z(), M.current = window.requestAnimationFrame(G);
  }, [z, i.length, c, u, r]), I = w.useCallback(() => {
    var N;
    f == null || f(), T(void 0), P([]), u == null || u([], -1), z(), (N = e == null ? void 0 : e.current) == null || N.focus();
  }, [z, e, f, u]), R = w.useCallback((N) => {
    y(N.target.value), a === void 0 && (N.target.value === "" ? (T(void 0), P([]), z()) : x(N.target.value));
  }, [x, z, y, a]);
  w.useEffect(() => {
    o.current !== null && (y(""), T(void 0), O.length > 0 && (P([]), u == null || u([], -1)), d ? o.current.focus({ preventScroll: !0 }) : z());
  }, [d, o]);
  const S = w.useCallback((N) => {
    var U;
    if ((U = N == null ? void 0 : N.stopPropagation) == null || U.call(N), b === void 0 || b.results === 0)
      return;
    const J = (b.selectedIndex + 1) % b.results;
    T({
      ...b,
      selectedIndex: J
    }), u == null || u(k, J);
  }, [b, u, k]), D = w.useCallback((N) => {
    var U;
    if ((U = N == null ? void 0 : N.stopPropagation) == null || U.call(N), b === void 0 || b.results === 0)
      return;
    let J = (b.selectedIndex - 1) % b.results;
    J < 0 && (J += b.results), T({
      ...b,
      selectedIndex: J
    }), u == null || u(k, J);
  }, [u, k, b]), $ = w.useCallback((N) => {
    (N.ctrlKey || N.metaKey) && N.nativeEvent.code === "KeyF" || N.key === "Escape" ? (I(), N.stopPropagation(), N.preventDefault()) : N.key === "Enter" && (N.shiftKey ? D() : S());
  }, [I, S, D]);
  w.useEffect(() => () => {
    z();
  }, [z]);
  const [B, Z] = w.useState(!1);
  w.useEffect(() => {
    if (d)
      Z(!0);
    else {
      const N = setTimeout(() => Z(!1), 150);
      return () => clearTimeout(N);
    }
  }, [d]);
  const L = w.useMemo(() => {
    if (!d && !B)
      return null;
    let N;
    b !== void 0 && (N = b.results >= 1e3 ? "over 1000" : `${b.results} result${b.results !== 1 ? "s" : ""}`, b.selectedIndex >= 0 && (N = `${b.selectedIndex + 1} of ${N}`));
    const J = (V) => {
      V.stopPropagation();
    }, K = {
      width: `${r > 0 ? Math.floor(((b == null ? void 0 : b.rowsSearched) ?? 0) / r * 100) : 0}%`
    };
    return w.createElement(
      vA,
      { className: "gdg-search-bar" + (d ? "" : " out"), onMouseDown: J, onMouseMove: J, onMouseUp: J, onClick: J },
      w.createElement(
        "div",
        { className: "gdg-search-bar-inner" },
        w.createElement("input", { id: h, "aria-hidden": !d, "data-testid": "search-input", ref: o, onChange: R, value: m, tabIndex: d ? void 0 : -1, onKeyDownCapture: $ }),
        w.createElement("button", { type: "button", "aria-label": "Previous Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: D, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, wA),
        w.createElement("button", { type: "button", "aria-label": "Next Result", "aria-hidden": !d, tabIndex: d ? void 0 : -1, onClick: S, disabled: ((b == null ? void 0 : b.results) ?? 0) === 0 }, xA),
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
        w.createElement("div", { className: "gdg-search-progress", style: K })
      ) : w.createElement(
        "div",
        { className: "gdg-search-status" },
        w.createElement("label", { htmlFor: h }, "Type to search")
      )
    );
  }, [
    d,
    B,
    b,
    r,
    h,
    o,
    R,
    m,
    $,
    D,
    S,
    f,
    I
  ]);
  return w.createElement(
    w.Fragment,
    null,
    w.createElement(bA, { prelightCells: k, accessibilityHeight: t.accessibilityHeight, canvasRef: t.canvasRef, cellXOffset: t.cellXOffset, cellYOffset: t.cellYOffset, className: t.className, clientSize: t.clientSize, columns: t.columns, disabledRows: t.disabledRows, enableGroups: t.enableGroups, fillHandle: t.fillHandle, firstColAccessible: t.firstColAccessible, nonGrowWidth: t.nonGrowWidth, fixedShadowX: t.fixedShadowX, fixedShadowY: t.fixedShadowY, freezeColumns: t.freezeColumns, getCellContent: t.getCellContent, getCellRenderer: t.getCellRenderer, getGroupDetails: t.getGroupDetails, getRowThemeOverride: t.getRowThemeOverride, groupHeaderHeight: t.groupHeaderHeight, headerHeight: t.headerHeight, highlightRegions: t.highlightRegions, imageWindowLoader: t.imageWindowLoader, initialSize: t.initialSize, isFilling: t.isFilling, isFocused: t.isFocused, lockColumns: t.lockColumns, maxColumnWidth: t.maxColumnWidth, minColumnWidth: t.minColumnWidth, onHeaderMenuClick: t.onHeaderMenuClick, onHeaderIndicatorClick: t.onHeaderIndicatorClick, onMouseMove: t.onMouseMove, onVisibleRegionChanged: t.onVisibleRegionChanged, overscrollX: t.overscrollX, overscrollY: t.overscrollY, preventDiagonalScrolling: t.preventDiagonalScrolling, rightElement: t.rightElement, rightElementProps: t.rightElementProps, rowHeight: t.rowHeight, rows: t.rows, scrollRef: t.scrollRef, selection: t.selection, theme: t.theme, freezeTrailingRows: t.freezeTrailingRows, hasAppendRow: t.hasAppendRow, translateX: t.translateX, translateY: t.translateY, verticalBorder: t.verticalBorder, onColumnProposeMove: t.onColumnProposeMove, drawFocusRing: t.drawFocusRing, drawCell: t.drawCell, drawHeader: t.drawHeader, experimental: t.experimental, gridRef: t.gridRef, headerIcons: t.headerIcons, isDraggable: t.isDraggable, onCanvasBlur: t.onCanvasBlur, onCanvasFocused: t.onCanvasFocused, onCellFocused: t.onCellFocused, onColumnMoved: t.onColumnMoved, onColumnResize: t.onColumnResize, onColumnResizeEnd: t.onColumnResizeEnd, onColumnResizeStart: t.onColumnResizeStart, onContextMenu: t.onContextMenu, onDragEnd: t.onDragEnd, onDragLeave: t.onDragLeave, onDragOverCell: t.onDragOverCell, onDragStart: t.onDragStart, onDrop: t.onDrop, onItemHovered: t.onItemHovered, onKeyDown: t.onKeyDown, onKeyUp: t.onKeyUp, onMouseDown: t.onMouseDown, onMouseUp: t.onMouseUp, onRowMoved: t.onRowMoved, smoothScrollX: t.smoothScrollX, smoothScrollY: t.smoothScrollY, resizeIndicator: t.resizeIndicator }),
    L
  );
};
class RA extends w.PureComponent {
  constructor() {
    super(...arguments);
    Je(this, "wrapperRef", w.createRef());
    Je(this, "clickOutside", (n) => {
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
const TA = () => (t) => Math.max(16, t.targetHeight - 10), EA = /* @__PURE__ */ xr("input")({
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
function jt(t, e, n) {
  const r = G1(t, e);
  return r && (n.didMatch = !0), r;
}
function G1(t, e) {
  if (t.length === 0)
    return !1;
  if (t.includes("|")) {
    const l = t.split("|");
    for (const c of l)
      if (G1(c, e))
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
      columns: g ? t.columns : tn.empty(),
      rows: m ? t.rows : tn.empty()
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
        columns: tn.empty(),
        rows: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && r === "mixed" || r === "additive";
      h = {
        current: p ? t.current : void 0,
        columns: g ? t.columns : tn.empty(),
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
        rows: tn.empty(),
        columns: u
      };
    else {
      const p = f && n === "mixed" || n === "additive", g = f && i === "mixed" || i === "additive";
      h = {
        current: p ? t.current : void 0,
        rows: g ? t.rows : tn.empty(),
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
            kind: He.Loading,
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
          { kind: He.Loading, allowOverlay: !1 },
          ...f
        ])
      ) : d.map((f) => [{ kind: He.Loading, allowOverlay: !1 }, ...f]);
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
    case He.Boolean:
      return {
        formatted: t.data === !0 ? "TRUE" : t.data === !1 ? "FALSE" : t.data === hh ? "INDETERMINATE" : "",
        rawValue: t.data,
        format: "boolean"
      };
    case He.Custom:
      return {
        formatted: t.copyData,
        rawValue: t.copyData,
        format: "string"
      };
    case He.Image:
    case He.Bubble:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string-array"
      };
    case He.Drilldown:
      return {
        formatted: t.data.map((e) => e.text),
        rawValue: t.data.map((e) => e.text),
        format: "string-array"
      };
    case He.Text:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "string"
      };
    case He.Uri:
      return {
        formatted: t.displayData ?? t.data,
        rawValue: t.data,
        format: "url"
      };
    case He.Markdown:
    case He.RowID:
      return {
        formatted: t.data,
        rawValue: t.data,
        format: "string"
      };
    case He.Number:
      return {
        formatted: t.displayData,
        rawValue: t.data,
        format: "number"
      };
    case He.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case He.Protected:
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
function Ey(t, e) {
  return (e ? /[\t\n",]/ : /[\t\n"]/).test(t) && (t = `"${t.replace(/"/g, '""')}"`), t;
}
function NA(t) {
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
      i.format === "url" ? e.push(`<td ${o}><a href="${i.rawValue}">${rf(i.formatted)}</a></td>`) : i.format === "string-array" ? e.push(`<td ${o}><ol>${i.formatted.map((s, a) => `<li gdg-raw-value=${My(i.rawValue[a])}>` + rf(s) + "</li>").join("")}</ol></td>`) : e.push(`<td gdg-raw-value=${My(((n = i.rawValue) == null ? void 0 : n.toString()) ?? "")} ${o}>${rf(i.formatted)}</td>`);
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
function Ay(t) {
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
function Y1(t) {
  return t !== !0;
}
function Py(t) {
  return typeof t == "string" ? t : `${t}px`;
}
const HA = () => (t) => t.innerWidth, BA = () => (t) => t.innerHeight, qA = /* @__PURE__ */ xr("div")({
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
    innerHeight: Py(n),
    innerWidth: Py(e),
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
function Kt(t, e) {
  return t === !0 ? e : t === !1 ? "" : t;
}
function Dy(t) {
  const e = nl.value;
  return {
    activateCell: Kt(t.activateCell, " |Enter|shift+Enter"),
    clear: Kt(t.clear, "any+Escape"),
    closeOverlay: Kt(t.closeOverlay, "any+Escape"),
    acceptOverlayDown: Kt(t.acceptOverlayDown, "Enter"),
    acceptOverlayUp: Kt(t.acceptOverlayUp, "shift+Enter"),
    acceptOverlayLeft: Kt(t.acceptOverlayLeft, "shift+Tab"),
    acceptOverlayRight: Kt(t.acceptOverlayRight, "Tab"),
    copy: t.copy,
    cut: t.cut,
    delete: Kt(t.delete, e ? "Backspace|Delete" : "Delete"),
    downFill: Kt(t.downFill, "primary+_68"),
    scrollToSelectedCell: Kt(t.scrollToSelectedCell, "primary+Enter"),
    goDownCell: Kt(t.goDownCell, "ArrowDown"),
    goDownCellRetainSelection: Kt(t.goDownCellRetainSelection, "alt+ArrowDown"),
    goLeftCell: Kt(t.goLeftCell, "ArrowLeft|shift+Tab"),
    goLeftCellRetainSelection: Kt(t.goLeftCellRetainSelection, "alt+ArrowLeft"),
    goRightCell: Kt(t.goRightCell, "ArrowRight|Tab"),
    goRightCellRetainSelection: Kt(t.goRightCellRetainSelection, "alt+ArrowRight"),
    goUpCell: Kt(t.goUpCell, "ArrowUp"),
    goUpCellRetainSelection: Kt(t.goUpCellRetainSelection, "alt+ArrowUp"),
    goToFirstCell: Kt(t.goToFirstCell, "primary+Home"),
    goToFirstColumn: Kt(t.goToFirstColumn, "Home|primary+ArrowLeft"),
    goToFirstRow: Kt(t.goToFirstRow, "primary+ArrowUp"),
    goToLastCell: Kt(t.goToLastCell, "primary+End"),
    goToLastColumn: Kt(t.goToLastColumn, "End|primary+ArrowRight"),
    goToLastRow: Kt(t.goToLastRow, "primary+ArrowDown"),
    goToNextPage: Kt(t.goToNextPage, "PageDown"),
    goToPreviousPage: Kt(t.goToPreviousPage, "PageUp"),
    paste: t.paste,
    rightFill: Kt(t.rightFill, "primary+_82"),
    search: Kt(t.search, "primary+f"),
    selectAll: Kt(t.selectAll, "primary+a"),
    selectColumn: Kt(t.selectColumn, "ctrl+ "),
    selectGrowDown: Kt(t.selectGrowDown, "shift+ArrowDown"),
    selectGrowLeft: Kt(t.selectGrowLeft, "shift+ArrowLeft"),
    selectGrowRight: Kt(t.selectGrowRight, "shift+ArrowRight"),
    selectGrowUp: Kt(t.selectGrowUp, "shift+ArrowUp"),
    selectRow: Kt(t.selectRow, "shift+ "),
    selectToFirstCell: Kt(t.selectToFirstCell, "primary+shift+Home"),
    selectToFirstColumn: Kt(t.selectToFirstColumn, "primary+shift+ArrowLeft"),
    selectToFirstRow: Kt(t.selectToFirstRow, "primary+shift+ArrowUp"),
    selectToLastCell: Kt(t.selectToLastCell, "primary+shift+End"),
    selectToLastColumn: Kt(t.selectToLastColumn, "primary+shift+ArrowRight"),
    selectToLastRow: Kt(t.selectToLastRow, "primary+shift+ArrowDown")
  };
}
function YA(t) {
  const e = bT(t);
  return Mt.useMemo(() => {
    if (e === void 0)
      return Dy(Ti);
    const n = {
      ...e,
      goToNextPage: (e == null ? void 0 : e.goToNextPage) ?? (e == null ? void 0 : e.pageDown) ?? Ti.goToNextPage,
      goToPreviousPage: (e == null ? void 0 : e.goToPreviousPage) ?? (e == null ? void 0 : e.pageUp) ?? Ti.goToPreviousPage,
      goToFirstCell: (e == null ? void 0 : e.goToFirstCell) ?? (e == null ? void 0 : e.first) ?? Ti.goToFirstCell,
      goToLastCell: (e == null ? void 0 : e.goToLastCell) ?? (e == null ? void 0 : e.last) ?? Ti.goToLastCell,
      selectToFirstCell: (e == null ? void 0 : e.selectToFirstCell) ?? (e == null ? void 0 : e.first) ?? Ti.selectToFirstCell,
      selectToLastCell: (e == null ? void 0 : e.selectToLastCell) ?? (e == null ? void 0 : e.last) ?? Ti.selectToLastCell
    };
    return Dy({
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
    getRowGroupingForPath: V1,
    updateRowGroupingByPath: X1,
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
function X1(t, e, n) {
  const [r, ...i] = e;
  return i[0] === -1 ? t.map((o, s) => s === r ? { ...o, ...n } : o) : t.map((o, s) => s === r ? { ...o, subGroups: X1(o.subGroups ?? [], i, n) } : o);
}
function V1(t, e) {
  const [n, ...r] = e;
  return r[0] === -1 ? t[n] : V1(t[n].subGroups ?? [], r);
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
  }), [r, s, o]), [l, c, u] = yT(a), d = w.useRef(i);
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
const e_ = w.lazy(async () => await import("./data-grid-overlay-editor-DKdcerDE.js"));
let t_ = 0;
function n_(t) {
  return XE(o0(o0(t).filter((e) => e.span !== void 0).map((e) => {
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
  kind: He.Loading,
  allowOverlay: !1
}, Ia = {
  columns: tn.empty(),
  rows: tn.empty(),
  current: void 0
}, r_ = (t, e) => {
  var Qh, ep, tp;
  const [n, r] = w.useState(Ia), [i, o] = w.useState(), s = w.useRef(null), a = w.useRef(null), [l, c] = w.useState(), u = w.useRef(), d = typeof window > "u" ? null : window, { imageEditorOverride: f, getRowThemeOverride: h, markdownDivCreateNode: p, width: g, height: m, columns: y, rows: b, getCellContent: T, onCellClicked: A, onCellActivated: v, onFillPattern: M, onFinishedEditing: O, coercePasteValue: P, drawHeader: k, drawCell: z, editorBloom: C, onHeaderClicked: x, onColumnProposeMove: I, rangeSelectionColumnSpanning: R = !0, spanRangeBehavior: S = "default", onGroupHeaderClicked: D, onCellContextMenu: $, className: B, onHeaderContextMenu: Z, getCellsForSelection: L, onGroupHeaderContextMenu: N, onGroupHeaderRenamed: J, onCellEdited: U, onCellsEdited: K, onSearchResultsChanged: V, searchResults: q, onSearchValueChange: G, searchValue: ne, onKeyDown: te, onKeyUp: Y, keybindings: ce, editOnType: fe = !0, onRowAppended: Ee, onColumnAppended: Ce, onColumnMoved: Be, validateCell: it, highlightRegions: mt, rangeSelect: ot = "rect", columnSelect: re = "multi", rowSelect: _e = "multi", rangeSelectionBlending: Ie = "exclusive", columnSelectionBlending: $e = "exclusive", rowSelectionBlending: De = "exclusive", onDelete: Oe, onDragStart: Xe, onMouseMove: pt, onPaste: Se, copyHeaders: Ze = !1, freezeColumns: Ct = 0, cellActivationBehavior: ft = "second-click", rowSelectionMode: Qe = "auto", columnSelectionMode: Rt = "auto", onHeaderMenuClick: Ve, onHeaderIndicatorClick: tt, getGroupDetails: Pt, rowGrouping: Lt, onSearchClose: Qt, onItemHovered: yt, onSelectionCleared: Ft, showSearch: Ot, onVisibleRegionChanged: hn, gridSelection: rn, onGridSelectionChange: bt, minColumnWidth: Sn = 50, maxColumnWidth: me = 500, maxColumnAutoWidth: xe, provideEditor: qe, trailingRowOptions: Ke, freezeTrailingRows: ue = 0, allowedFillDirections: ke = "orthogonal", scrollOffsetX: se, scrollOffsetY: F, verticalBorder: oe, onDragOverCell: he, onDrop: Pe, onColumnResize: nt, onColumnResizeEnd: It, onColumnResizeStart: lt, customRenderers: gt, fillHandle: kt, experimental: vt, fixedShadowX: Ut, fixedShadowY: An, headerIcons: zt, imageWindowLoader: cn, initialSize: _n, isDraggable: Pn, onDragLeave: Ht, onRowMoved: mn, overscrollX: Yn, overscrollY: bn, preventDiagonalScrolling: hr, rightElement: Vn, rightElementProps: un, trapFocus: Cn = !1, smoothScrollX: or, smoothScrollY: Pr, scaleToRem: gi = !1, rowHeight: Ur = 34, headerHeight: tr = 36, groupHeaderHeight: kr = tr, theme: mi, isOutsideClick: Gr, renderers: sr, resizeIndicator: Te, scrollToActiveCell: et = !0, drawFocusRing: At = !0, portalElementRef: vn } = t, Vt = At === "no-editor" ? i === void 0 : At, Jt = typeof t.rowMarkers == "string" ? void 0 : t.rowMarkers, Dn = (Jt == null ? void 0 : Jt.kind) ?? t.rowMarkers ?? "none", Yr = (Jt == null ? void 0 : Jt.width) ?? t.rowMarkerWidth, H = (Jt == null ? void 0 : Jt.startIndex) ?? t.rowMarkerStartIndex ?? 1, we = (Jt == null ? void 0 : Jt.theme) ?? t.rowMarkerTheme, Le = Jt == null ? void 0 : Jt.headerTheme, Ue = Jt == null ? void 0 : Jt.headerAlwaysVisible, rt = _e !== "multi" || (Jt == null ? void 0 : Jt.headerDisabled) === !0, qt = (Jt == null ? void 0 : Jt.checkboxStyle) ?? "square", Kn = Math.max(Sn, 20), Un = Math.max(me, Kn), pr = Math.max(xe ?? Un, Kn), yi = w.useMemo(() => typeof window > "u" ? { fontSize: "16px" } : window.getComputedStyle(document.documentElement), []), { rows: wt, rowNumberMapper: Li, rowHeight: $i, getRowThemeOverride: ar } = VA(Lt, b, Ur, h), fo = w.useMemo(() => Number.parseFloat(yi.fontSize), [yi]), { rowHeight: en, headerHeight: Fi, groupHeaderHeight: Gs, theme: ho, overscrollX: Tl, overscrollY: El } = GA({
    groupHeaderHeight: kr,
    headerHeight: tr,
    overscrollX: Yn,
    overscrollY: bn,
    remSize: fo,
    rowHeight: $i,
    scaleToRem: gi,
    theme: mi
  }), Xr = YA(ce), bi = Yr ?? (b > 1e4 ? 48 : b > 1e3 ? 44 : b > 100 ? 36 : 32), gr = Dn !== "none", ie = gr ? 1 : 0, wn = Ke !== void 0, oi = (Ke == null ? void 0 : Ke.sticky) === !0, [Ml, Hi] = w.useState(!1), Il = Ot ?? Ml, po = w.useCallback(() => {
    Qt !== void 0 ? Qt() : Hi(!1);
  }, [Qt]), pe = w.useMemo(() => rn === void 0 ? void 0 : Ea(rn, ie), [rn, ie]) ?? n, ee = w.useRef();
  ee.current === void 0 && (ee.current = new AbortController()), w.useEffect(() => () => ee == null ? void 0 : ee.current.abort(), []);
  const [ve, st] = _A(L, T, ie, ee.current, wt), at = w.useCallback((E, W, j) => {
    if (it === void 0)
      return !0;
    const X = [E[0] - ie, E[1]];
    return it == null ? void 0 : it(X, W, j);
  }, [ie, it]), Fe = w.useRef(rn), We = w.useCallback((E, W) => {
    W && (E = $A(E, ve, ie, S, ee.current)), bt !== void 0 ? (Fe.current = Ea(E, -ie), bt(Fe.current)) : r(E);
  }, [bt, ve, ie, S]), Tt = Ei(nt, w.useCallback((E, W, j, X) => {
    nt == null || nt(y[j - ie], W, j - ie, X);
  }, [nt, ie, y])), Gt = Ei(It, w.useCallback((E, W, j, X) => {
    It == null || It(y[j - ie], W, j - ie, X);
  }, [It, ie, y])), ht = Ei(lt, w.useCallback((E, W, j, X) => {
    lt == null || lt(y[j - ie], W, j - ie, X);
  }, [lt, ie, y])), Fn = Ei(k, w.useCallback((E, W) => (k == null ? void 0 : k({ ...E, columnIndex: E.columnIndex - ie }, W)) ?? !1, [k, ie])), xt = Ei(z, w.useCallback((E, W) => (z == null ? void 0 : z({ ...E, col: E.col - ie }, W)) ?? !1, [z, ie])), Yt = w.useCallback((E) => {
    if (Oe !== void 0) {
      const W = Oe(Ea(E, -ie));
      return typeof W == "boolean" ? W : Ea(W, ie);
    }
    return !0;
  }, [Oe, ie]), [$t, Bt, Dt] = AA(pe, We, Ie, $e, De, ot, R), Xt = w.useMemo(() => fi(Ph(), ho), [ho]), [Mn, Dr] = w.useState([0, 0, 0]), Nr = w.useMemo(() => {
    if (sr === void 0)
      return {};
    const E = {};
    for (const W of sr)
      E[W.kind] = W;
    return E;
  }, [sr]), xn = w.useCallback((E) => E.kind !== He.Custom ? Nr[E.kind] : gt == null ? void 0 : gt.find((W) => W.isMatch(E)), [gt, Nr]);
  let { sizedColumns: Nn, nonGrowWidth: on } = PE(y, wt, st, Mn[0] - (ie === 0 ? 0 : bi) - Mn[2], Kn, pr, Xt, xn, ee.current);
  Dn !== "none" && (on += bi);
  const Sr = w.useMemo(() => Nn.some((E) => E.group !== void 0), [Nn]), Jn = Sr ? Fi + Gs : Fi, go = pe.rows.length, si = Dn === "none" ? void 0 : go === 0 ? !1 : go === wt ? !0 : void 0, Wt = w.useMemo(() => Dn === "none" ? Nn : [
    {
      title: "",
      width: bi,
      icon: void 0,
      hasMenu: !1,
      style: "normal",
      themeOverride: we,
      rowMarker: qt,
      rowMarkerChecked: si,
      headerRowMarkerTheme: Le,
      headerRowMarkerAlwaysVisible: Ue,
      headerRowMarkerDisabled: rt
    },
    ...Nn
  ], [
    Dn,
    Nn,
    bi,
    we,
    qt,
    si,
    Le,
    Ue,
    rt
  ]), Hn = w.useRef({
    height: 1,
    width: 1,
    x: 0,
    y: 0
  }), Bi = w.useRef(!1), { setVisibleRegion: vi, visibleRegion: ai, scrollRef: pn } = QA(se, F, en, Hn, () => Bi.current = !0);
  Hn.current = ai;
  const rw = ai.x + ie, Ys = ai.y, jn = w.useRef(null), nr = w.useCallback((E) => {
    var W;
    E === !0 ? (W = jn.current) == null || W.focus() : window.requestAnimationFrame(() => {
      var j;
      (j = jn.current) == null || j.focus();
    });
  }, []), Zn = wn ? wt + 1 : wt, Cr = w.useCallback((E) => {
    const W = ie === 0 ? E : E.map((X) => ({
      ...X,
      location: [X.location[0] - ie, X.location[1]]
    })), j = K == null ? void 0 : K(W);
    if (j !== !0)
      for (const X of W)
        U == null || U(X.location, X.value);
    return j;
  }, [U, K, ie]), [qi, Al] = w.useState(), Xs = pe.current !== void 0 && pe.current.range.width * pe.current.range.height > 1 ? pe.current.range : void 0, mo = Vt ? (Qh = pe.current) == null ? void 0 : Qh.cell : void 0, Vs = mo == null ? void 0 : mo[0], Js = mo == null ? void 0 : mo[1], iw = w.useMemo(() => {
    if ((mt === void 0 || mt.length === 0) && (Xs ?? Vs ?? Js ?? qi) === void 0)
      return;
    const E = [];
    if (mt !== void 0)
      for (const W of mt) {
        const j = Wt.length - W.range.x - ie;
        j > 0 && E.push({
          color: W.color,
          range: {
            ...W.range,
            x: W.range.x + ie,
            width: Math.min(j, W.range.width)
          },
          style: W.style
        });
      }
    return qi !== void 0 && E.push({
      color: io(Xt.accentColor, 0),
      range: qi,
      style: "dashed"
    }), Xs !== void 0 && E.push({
      color: io(Xt.accentColor, 0.5),
      range: Xs,
      style: "solid-outline"
    }), Vs !== void 0 && Js !== void 0 && E.push({
      color: Xt.accentColor,
      range: {
        x: Vs,
        y: Js,
        width: 1,
        height: 1
      },
      style: "solid-outline"
    }), E.length > 0 ? E : void 0;
  }, [
    qi,
    Xs,
    Vs,
    Js,
    mt,
    Wt.length,
    Xt.accentColor,
    ie
  ]), Hh = w.useRef(Wt);
  Hh.current = Wt;
  const lr = w.useCallback(([E, W], j = !1) => {
    var ye, le, de, be, Re, je, ct;
    const X = wn && W === Zn - 1;
    if (E === 0 && gr) {
      if (X)
        return Ma;
      const Ae = Li(W);
      return Ae === void 0 ? Ma : {
        kind: Ir.Marker,
        allowOverlay: !1,
        checkboxStyle: qt,
        checked: (pe == null ? void 0 : pe.rows.hasIndex(W)) === !0,
        markerKind: Dn === "clickable-number" ? "number" : Dn,
        row: H + Ae,
        drawHandle: mn !== void 0,
        cursor: Dn === "clickable-number" ? "pointer" : void 0
      };
    } else if (X) {
      const Et = E === ie ? (Ke == null ? void 0 : Ke.hint) ?? "" : "", ut = Hh.current[E];
      if (((ye = ut == null ? void 0 : ut.trailingRowOptions) == null ? void 0 : ye.disabled) === !0)
        return Ma;
      {
        const Nt = ((le = ut == null ? void 0 : ut.trailingRowOptions) == null ? void 0 : le.hint) ?? Et, _t = ((de = ut == null ? void 0 : ut.trailingRowOptions) == null ? void 0 : de.addIcon) ?? (Ke == null ? void 0 : Ke.addIcon);
        return {
          kind: Ir.NewRow,
          hint: Nt,
          allowOverlay: !1,
          icon: _t
        };
      }
    } else {
      const Ae = E - ie;
      if (j || (vt == null ? void 0 : vt.strict) === !0) {
        const ut = Hn.current, Nt = ut.x > Ae || Ae > ut.x + ut.width || ut.y > W || W > ut.y + ut.height || W >= Nl.current, _t = Ae === ((Re = (be = ut.extras) == null ? void 0 : be.selected) == null ? void 0 : Re[0]) && W === ((je = ut.extras) == null ? void 0 : je.selected[1]);
        let St = !1;
        if (((ct = ut.extras) == null ? void 0 : ct.freezeRegions) !== void 0) {
          for (const Zt of ut.extras.freezeRegions)
            if (Qi(Zt, Ae, W)) {
              St = !0;
              break;
            }
        }
        if (Nt && !_t && !St)
          return Ma;
      }
      let Et = T([Ae, W]);
      return ie !== 0 && Et.span !== void 0 && (Et = {
        ...Et,
        span: [Et.span[0] + ie, Et.span[1] + ie]
      }), Et;
    }
  }, [
    wn,
    Zn,
    gr,
    Li,
    qt,
    pe == null ? void 0 : pe.rows,
    Dn,
    H,
    mn,
    ie,
    Ke == null ? void 0 : Ke.hint,
    Ke == null ? void 0 : Ke.addIcon,
    vt == null ? void 0 : vt.strict,
    T
  ]), _l = w.useCallback((E) => {
    let W = (Pt == null ? void 0 : Pt(E)) ?? { name: E };
    return J !== void 0 && E !== "" && (W = {
      icon: W.icon,
      name: W.name,
      overrideTheme: W.overrideTheme,
      actions: [
        ...W.actions ?? [],
        {
          title: "Rename",
          icon: "renameIcon",
          onClick: (j) => zl({
            group: W.name,
            bounds: j.bounds
          })
        }
      ]
    }), W;
  }, [Pt, J]), Uo = w.useCallback((E) => {
    var de;
    const [W, j] = E.cell, X = Wt[W], ae = (X == null ? void 0 : X.group) !== void 0 ? (de = _l(X.group)) == null ? void 0 : de.overrideTheme : void 0, ye = X == null ? void 0 : X.themeOverride, le = ar == null ? void 0 : ar(j);
    o({
      ...E,
      theme: fi(Xt, ae, ye, le, E.content.themeOverride)
    });
  }, [ar, Wt, _l, Xt]), yo = w.useCallback((E, W, j) => {
    var le;
    if (pe.current === void 0)
      return;
    const [X, ae] = pe.current.cell, ye = lr([X, ae]);
    if (ye.kind !== He.Boolean && ye.allowOverlay) {
      let de = ye;
      if (j !== void 0)
        switch (de.kind) {
          case He.Number: {
            const be = NR(() => j === "-" ? -0 : Number.parseFloat(j), 0);
            de = {
              ...de,
              data: Number.isNaN(be) ? 0 : be
            };
            break;
          }
          case He.Text:
          case He.Markdown:
          case He.Uri:
            de = {
              ...de,
              data: j
            };
            break;
        }
      Uo({
        target: E,
        content: de,
        initialValue: j,
        cell: [X, ae],
        highlight: j === void 0,
        forceEditMode: j !== void 0,
        activation: W
      });
    } else ye.kind === He.Boolean && W.inputType === "keyboard" && ye.readonly !== !0 && (Cr([
      {
        location: pe.current.cell,
        value: {
          ...ye,
          data: Y1(ye.data)
        }
      }
    ]), (le = jn.current) == null || le.damage([{ cell: pe.current.cell }]));
  }, [lr, pe, Cr, Uo]), Bh = w.useCallback((E, W) => {
    var ae;
    const j = (ae = jn.current) == null ? void 0 : ae.getBounds(E, W);
    if (j === void 0 || pn.current === null)
      return;
    const X = lr([E, W]);
    X.allowOverlay && Uo({
      target: j,
      content: X,
      initialValue: void 0,
      highlight: !0,
      cell: [E, W],
      forceEditMode: !0,
      activation: { inputType: "keyboard", key: "Enter" }
    });
  }, [lr, pn, Uo]), In = w.useCallback((E, W, j = "both", X = 0, ae = 0, ye = void 0) => {
    if (pn.current !== null) {
      const le = jn.current, de = a.current, be = typeof E != "number" ? E.unit === "cell" ? E.amount : void 0 : E, Re = typeof W != "number" ? W.unit === "cell" ? W.amount : void 0 : W, je = typeof E != "number" && E.unit === "px" ? E.amount : void 0, ct = typeof W != "number" && W.unit === "px" ? W.amount : void 0;
      if (le !== null && de !== null) {
        let Ae = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }, Et = 0, ut = 0;
        if ((be !== void 0 || Re !== void 0) && (Ae = le.getBounds((be ?? 0) + ie, Re ?? 0) ?? Ae, Ae.width === 0 || Ae.height === 0))
          return;
        const Nt = de.getBoundingClientRect(), _t = Nt.width / de.offsetWidth;
        if (je !== void 0 && (Ae = {
          ...Ae,
          x: je - Nt.left - pn.current.scrollLeft,
          width: 1
        }), ct !== void 0 && (Ae = {
          ...Ae,
          y: ct + Nt.top - pn.current.scrollTop,
          height: 1
        }), Ae !== void 0) {
          const St = {
            x: Ae.x - X,
            y: Ae.y - ae,
            width: Ae.width + 2 * X,
            height: Ae.height + 2 * ae
          };
          let Zt = 0;
          for (let Wl = 0; Wl < Ct; Wl++)
            Zt += Nn[Wl].width;
          let Rn = 0;
          const Bn = ue + (oi ? 1 : 0);
          Bn > 0 && (Rn = uo(Zn, Bn, en));
          let cr = Zt * _t + Nt.left + ie * bi * _t, Jr = Nt.right, Lr = Nt.top + Jn * _t, Zr = Nt.bottom - Rn * _t;
          const ia = Ae.width + X * 2;
          switch (ye == null ? void 0 : ye.hAlign) {
            case "start":
              Jr = cr + ia;
              break;
            case "end":
              cr = Jr - ia;
              break;
            case "center":
              cr = Math.floor((cr + Jr) / 2) - ia / 2, Jr = cr + ia;
              break;
          }
          const oa = Ae.height + ae * 2;
          switch (ye == null ? void 0 : ye.vAlign) {
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
          cr > St.x ? Et = St.x - cr : Jr < St.x + St.width && (Et = St.x + St.width - Jr), Lr > St.y ? ut = St.y - Lr : Zr < St.y + St.height && (ut = St.y + St.height - Zr), j === "vertical" || typeof E == "number" && E < Ct ? Et = 0 : (j === "horizontal" || typeof W == "number" && W >= Zn - Bn) && (ut = 0), (Et !== 0 || ut !== 0) && (_t !== 1 && (Et /= _t, ut /= _t), pn.current.scrollTo({
            left: Et + pn.current.scrollLeft,
            top: ut + pn.current.scrollTop,
            behavior: (ye == null ? void 0 : ye.behavior) ?? "auto"
          }));
        }
      }
    }
  }, [
    ie,
    ue,
    bi,
    pn,
    Jn,
    Ct,
    Nn,
    Zn,
    oi,
    en
  ]), Pl = w.useRef(Bh), Dl = w.useRef(T);
  Pl.current = Bh, Dl.current = T;
  const Nl = w.useRef(wt);
  Nl.current = wt;
  const qh = w.useRef(Wt.length);
  qh.current = Wt.length;
  const wi = w.useCallback(async (E, W = !0, j) => {
    var Re;
    const X = Wt[E];
    if (((Re = X == null ? void 0 : X.trailingRowOptions) == null ? void 0 : Re.disabled) === !0)
      return;
    const ae = Ee == null ? void 0 : Ee();
    let ye, le = !0;
    ae !== void 0 && (ye = await ae, ye === "top" && (le = !1), typeof ye == "number" && (le = !1));
    let de = 0;
    const be = () => {
      if (Nl.current <= wt) {
        de < 500 && window.setTimeout(be, de), de = 50 + de * 2;
        return;
      }
      const je = typeof ye == "number" ? ye : le ? wt : 0;
      ra.current(E - ie, je, "both", 0, 0, j ? { behavior: j } : void 0), $t({
        cell: [E, je],
        range: {
          x: E,
          y: je,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const ct = Dl.current([E - ie, je]);
      ct.allowOverlay && Eo(ct) && ct.readonly !== !0 && W && window.setTimeout(() => {
        Pl.current(E, je);
      }, 0);
    };
    be();
  }, [Wt, Ee, ie, wt, $t]), Zs = w.useCallback(async (E, W = !0) => {
    const j = Ce == null ? void 0 : Ce();
    let X, ae = !0;
    j !== void 0 && (X = await j, X === "left" && (ae = !1), typeof X == "number" && (ae = !1));
    let ye = 0;
    const le = () => {
      if (qh.current <= Wt.length) {
        ye < 500 && window.setTimeout(le, ye), ye = 50 + ye * 2;
        return;
      }
      const de = typeof X == "number" ? X : ae ? Wt.length : 0;
      In(de - ie, E), $t({
        cell: [de, E],
        range: {
          x: de,
          y: E,
          width: 1,
          height: 1
        }
      }, !1, !1, "edit");
      const be = Dl.current([de - ie, E]);
      be.allowOverlay && Eo(be) && be.readonly !== !0 && W && window.setTimeout(() => {
        Pl.current(de, E);
      }, 0);
    };
    le();
  }, [Wt, Ce, ie, In, $t]), bo = w.useCallback((E) => {
    var j, X;
    const W = ((X = (j = Nn[E]) == null ? void 0 : j.trailingRowOptions) == null ? void 0 : X.targetColumn) ?? (Ke == null ? void 0 : Ke.targetColumn);
    if (typeof W == "number")
      return W + (gr ? 1 : 0);
    if (typeof W == "object") {
      const ae = y.indexOf(W);
      if (ae >= 0)
        return ae + (gr ? 1 : 0);
    }
  }, [Nn, y, gr, Ke == null ? void 0 : Ke.targetColumn]), xi = w.useRef(), vo = w.useRef(), Go = w.useCallback((E, W) => {
    var ae;
    const [j, X] = W;
    return fi(Xt, (ae = Wt[j]) == null ? void 0 : ae.themeOverride, ar == null ? void 0 : ar(X), E.themeOverride);
  }, [ar, Wt, Xt]), { mapper: Wi } = JA(Lt, b), Or = Lt == null ? void 0 : Lt.navigationBehavior, Yo = w.useCallback((E) => {
    var Re, je, ct;
    const W = nl.value ? E.metaKey : E.ctrlKey, j = W && _e === "multi", [X, ae] = E.location, ye = pe.columns, le = pe.rows, [de, be] = ((Re = pe.current) == null ? void 0 : Re.cell) ?? [];
    if (E.kind === "cell") {
      if (vo.current = void 0, ji.current = [X, ae], X === 0 && gr) {
        if (wn === !0 && ae === wt || Dn === "number" || _e === "none")
          return;
        const Ae = lr(E.location);
        if (Ae.kind !== Ir.Marker)
          return;
        if (mn !== void 0) {
          const Nt = xn(Ae);
          yr((Nt == null ? void 0 : Nt.kind) === Ir.Marker);
          const _t = (je = Nt == null ? void 0 : Nt.onClick) == null ? void 0 : je.call(Nt, {
            ...E,
            cell: Ae,
            posX: E.localEventX,
            posY: E.localEventY,
            bounds: E.bounds,
            theme: Go(Ae, E.location),
            preventDefault: () => {
            }
          });
          if (_t === void 0 || _t.checked === Ae.checked)
            return;
        }
        o(void 0), nr();
        const Et = le.hasIndex(ae), ut = xi.current;
        if (_e === "multi" && (E.shiftKey || E.isLongTouch === !0) && ut !== void 0 && le.hasIndex(ut)) {
          const Nt = [Math.min(ut, ae), Math.max(ut, ae) + 1];
          j || Qe === "multi" ? Bt(void 0, Nt, !0) : Bt(tn.fromSingleSelection(Nt), void 0, j);
        } else _e === "multi" && (j || E.isTouch || Qe === "multi") ? Et ? Bt(le.remove(ae), void 0, !0) : (Bt(void 0, ae, !0), xi.current = ae) : Et && le.length === 1 ? Bt(tn.empty(), void 0, W) : (Bt(tn.fromSingleSelection(ae), void 0, W), xi.current = ae);
      } else if (X >= ie && wn && ae === wt) {
        const Ae = bo(X);
        wi(Ae ?? X);
      } else if (de !== X || be !== ae) {
        const Ae = lr(E.location), Et = xn(Ae);
        if ((Et == null ? void 0 : Et.onSelect) !== void 0) {
          let _t = !1;
          if (Et.onSelect({
            ...E,
            cell: Ae,
            posX: E.localEventX,
            posY: E.localEventY,
            bounds: E.bounds,
            preventDefault: () => _t = !0,
            theme: Go(Ae, E.location)
          }), _t)
            return;
        }
        if (Or === "block" && Wi(ae).isGroupHeader)
          return;
        const ut = oi && ae === wt, Nt = oi && pe !== void 0 && ((ct = pe.current) == null ? void 0 : ct.cell[1]) === wt;
        if ((E.shiftKey || E.isLongTouch === !0) && de !== void 0 && be !== void 0 && pe.current !== void 0 && !Nt) {
          if (ut)
            return;
          const _t = Math.min(X, de), St = Math.max(X, de), Zt = Math.min(ae, be), Rn = Math.max(ae, be);
          $t({
            ...pe.current,
            range: {
              x: _t,
              y: Zt,
              width: St - _t + 1,
              height: Rn - Zt + 1
            }
          }, !0, W, "click"), xi.current = void 0, nr();
        } else
          $t({
            cell: [X, ae],
            range: { x: X, y: ae, width: 1, height: 1 }
          }, !0, W, "click"), xi.current = void 0, o(void 0), nr();
      }
    } else if (E.kind === "header")
      if (ji.current = [X, ae], o(void 0), gr && X === 0)
        xi.current = void 0, vo.current = void 0, !rt && _e === "multi" && (le.length !== wt ? Bt(tn.fromSingleSelection([0, wt]), void 0, W) : Bt(tn.empty(), void 0, W), nr());
      else {
        const Ae = vo.current;
        if (re === "multi" && (E.shiftKey || E.isLongTouch === !0) && Ae !== void 0 && ye.hasIndex(Ae)) {
          const Et = [Math.min(Ae, X), Math.max(Ae, X) + 1];
          W || E.isTouch || Rt === "multi" ? Dt(void 0, Et, W) : Dt(tn.fromSingleSelection(Et), void 0, W);
        } else re === "multi" && (W || E.isTouch || Rt === "multi") ? (ye.hasIndex(X) ? Dt(ye.remove(X), void 0, W) : Dt(void 0, X, W), vo.current = X) : re !== "none" && (ye.hasIndex(X) ? Dt(ye.remove(X), void 0, W) : Dt(tn.fromSingleSelection(X), void 0, W), vo.current = X);
        xi.current = void 0, nr();
      }
    else E.kind === Br ? ji.current = [X, ae] : E.kind === rl && !E.isMaybeScrollbar && (We(Ia, !1), o(void 0), nr(), Ft == null || Ft(), xi.current = void 0, vo.current = void 0);
  }, [
    _e,
    re,
    pe,
    gr,
    ie,
    wn,
    wt,
    Dn,
    lr,
    mn,
    nr,
    Qe,
    Rt,
    xn,
    Go,
    Bt,
    bo,
    wi,
    Or,
    Wi,
    oi,
    $t,
    rt,
    Dt,
    We,
    Ft
  ]), Xo = w.useRef(!1), ji = w.useRef(), Wh = w.useRef(ai), Rr = w.useRef(), ow = w.useCallback((E) => {
    if (wo.current = !1, Wh.current = Hn.current, E.button !== 0 && E.button !== 1) {
      Rr.current = void 0;
      return;
    }
    const W = performance.now();
    Rr.current = {
      button: E.button,
      time: W,
      location: E.location
    }, (E == null ? void 0 : E.kind) === "header" && (Xo.current = !0);
    const j = E.kind === "cell" && E.isFillHandle;
    !j && E.kind !== "cell" && E.isEdge || (c({
      previousSelection: pe,
      fillHandle: j
    }), ji.current = void 0, !E.isTouch && E.button === 0 && !j ? Yo(E) : !E.isTouch && E.button === 1 && (ji.current = E.location));
  }, [pe, Yo]), [Ol, zl] = w.useState(), jh = w.useCallback((E) => {
    if (E.kind !== Br || re !== "multi")
      return;
    const W = nl.value ? E.metaKey : E.ctrlKey, [j] = E.location, X = pe.columns;
    if (j < ie)
      return;
    const ae = Wt[j];
    let ye = j, le = j;
    for (let de = j - 1; de >= ie && Ns(ae.group, Wt[de].group); de--)
      ye--;
    for (let de = j + 1; de < Wt.length && Ns(ae.group, Wt[de].group); de++)
      le++;
    if (nr(), W || E.isTouch || Rt === "multi")
      if (X.hasAll([ye, le + 1])) {
        let de = X;
        for (let be = ye; be <= le; be++)
          de = de.remove(be);
        Dt(de, void 0, W);
      } else
        Dt(void 0, [ye, le + 1], W);
    else
      Dt(tn.fromSingleSelection([ye, le + 1]), void 0, W);
  }, [
    re,
    nr,
    pe.columns,
    Wt,
    ie,
    Dt,
    Rt
  ]), wo = w.useRef(!1), Qs = w.useCallback(async (E) => {
    if (ve !== void 0 && Tt !== void 0) {
      const W = Hn.current.y, j = Hn.current.height;
      let X = ve({
        x: E,
        y: W,
        width: 1,
        height: Math.min(j, wt - W)
      }, ee.current.signal);
      typeof X != "object" && (X = await X());
      const ae = Nn[E - ie], le = document.createElement("canvas").getContext("2d", { alpha: !1 });
      if (le !== null) {
        le.font = Xt.baseFontFull;
        const de = S1(le, Xt, ae, 0, X, Kn, Un, !1, xn);
        Tt == null || Tt(ae, de.width, E, de.width);
      }
    }
  }, [
    Nn,
    ve,
    Un,
    Xt,
    Kn,
    Tt,
    ie,
    wt,
    xn
  ]), [sw, Ll] = w.useState(), xo = w.useCallback(async (E, W) => {
    var de, be;
    const j = (de = E.current) == null ? void 0 : de.range;
    if (j === void 0 || ve === void 0 || W.current === void 0)
      return;
    const X = W.current.range;
    if (M !== void 0) {
      let Re = !1;
      if (M({
        fillDestination: { ...X, x: X.x - ie },
        patternSource: { ...j, x: j.x - ie },
        preventDefault: () => Re = !0
      }), Re)
        return;
    }
    let ae = ve(j, ee.current.signal);
    typeof ae != "object" && (ae = await ae());
    const ye = ae, le = [];
    for (let Re = 0; Re < X.width; Re++)
      for (let je = 0; je < X.height; je++) {
        const ct = [X.x + Re, X.y + je];
        if (h1(ct, j))
          continue;
        const Ae = ye[je % j.height][Re % j.width];
        _o(Ae) || !Eo(Ae) || le.push({
          location: ct,
          value: { ...Ae }
        });
      }
    Cr(le), (be = jn.current) == null || be.damage(le.map((Re) => ({
      cell: Re.location
    })));
  }, [ve, Cr, M, ie]), Kh = w.useCallback(() => {
    if (pe.current === void 0 || pe.current.range.width <= 1)
      return;
    const E = {
      ...pe,
      current: {
        ...pe.current,
        range: {
          ...pe.current.range,
          width: 1
        }
      }
    };
    xo(E, pe);
  }, [xo, pe]), Uh = w.useCallback(() => {
    if (pe.current === void 0 || pe.current.range.height <= 1)
      return;
    const E = {
      ...pe,
      current: {
        ...pe.current,
        range: {
          ...pe.current.range,
          height: 1
        }
      }
    };
    xo(E, pe);
  }, [xo, pe]), aw = w.useCallback((E, W) => {
    var je, ct;
    const j = l;
    if (c(void 0), Al(void 0), Ll(void 0), Xo.current = !1, W)
      return;
    if ((j == null ? void 0 : j.fillHandle) === !0 && pe.current !== void 0 && ((je = j.previousSelection) == null ? void 0 : je.current) !== void 0) {
      if (qi === void 0)
        return;
      const Ae = {
        ...pe,
        current: {
          ...pe.current,
          range: P1(j.previousSelection.current.range, qi)
        }
      };
      xo(j.previousSelection, Ae), We(Ae, !0);
      return;
    }
    const [X, ae] = E.location, [ye, le] = ji.current ?? [], de = () => {
      wo.current = !0;
    }, be = (Ae) => {
      var ut, Nt, _t;
      const Et = Ae.isTouch || ye === X && le === ae;
      if (Et && (A == null || A([X - ie, ae], {
        ...Ae,
        preventDefault: de
      })), Ae.button === 1)
        return !wo.current;
      if (!wo.current) {
        const St = lr(E.location), Zt = xn(St);
        if (Zt !== void 0 && Zt.onClick !== void 0 && Et) {
          const Bn = Zt.onClick({
            ...Ae,
            cell: St,
            posX: Ae.localEventX,
            posY: Ae.localEventY,
            bounds: Ae.bounds,
            theme: Go(St, E.location),
            preventDefault: de
          });
          Bn !== void 0 && !_o(Bn) && To(Bn) && (Cr([{ location: Ae.location, value: Bn }]), (ut = jn.current) == null || ut.damage([
            {
              cell: Ae.location
            }
          ]));
        }
        if (wo.current || pe.current === void 0)
          return !1;
        let Rn = !1;
        switch (St.activationBehaviorOverride ?? ft) {
          case "double-click":
          case "second-click": {
            if (((_t = (Nt = j == null ? void 0 : j.previousSelection) == null ? void 0 : Nt.current) == null ? void 0 : _t.cell) === void 0)
              break;
            const [Bn, cr] = pe.current.cell, [Jr, Lr] = j.previousSelection.current.cell;
            Rn = X === Bn && X === Jr && ae === cr && ae === Lr && (Ae.isDoubleClick === !0 || ft === "second-click");
            break;
          }
          case "single-click": {
            Rn = !0;
            break;
          }
        }
        if (Rn) {
          const cr = {
            inputType: "pointer",
            pointerActivation: Ae.isDoubleClick === !0 ? "double-click" : St.activationBehaviorOverride ?? ft,
            pointerType: Ae.isTouch ? "touch" : "mouse"
          };
          return v == null || v([X - ie, ae], cr), yo(Ae.bounds, cr), !0;
        }
      }
      return !1;
    }, Re = E.location[0] - ie;
    if (E.isTouch) {
      const Ae = Hn.current, Et = Wh.current;
      if (Ae.x !== Et.x || Ae.y !== Et.y)
        return;
      if (E.isLongTouch === !0) {
        if (E.kind === "cell" && Ss((ct = pe.current) == null ? void 0 : ct.cell, E.location)) {
          $ == null || $([Re, E.location[1]], {
            ...E,
            preventDefault: de
          });
          return;
        } else if (E.kind === "header" && pe.columns.hasIndex(X)) {
          Z == null || Z(Re, { ...E, preventDefault: de });
          return;
        } else if (E.kind === Br) {
          if (Re < 0)
            return;
          N == null || N(Re, { ...E, preventDefault: de });
          return;
        }
      }
      E.kind === "cell" ? be(E) || Yo(E) : E.kind === Br ? D == null || D(Re, { ...E, preventDefault: de }) : (E.kind === Mi && (x == null || x(Re, {
        ...E,
        preventDefault: de
      })), Yo(E));
      return;
    }
    if (E.kind === "header") {
      if (Re < 0)
        return;
      E.isEdge ? E.isDoubleClick === !0 && Qs(X) : E.button === 0 && X === ye && ae === le && (x == null || x(Re, { ...E, preventDefault: de }));
    }
    if (E.kind === Br) {
      if (Re < 0)
        return;
      E.button === 0 && X === ye && ae === le && (D == null || D(Re, { ...E, preventDefault: de }), wo.current || jh(E));
    }
    E.kind === "cell" && (E.button === 0 || E.button === 1) && be(E), ji.current = void 0;
  }, [
    l,
    pe,
    ie,
    qi,
    xo,
    We,
    A,
    lr,
    xn,
    ft,
    Go,
    Cr,
    v,
    yo,
    $,
    Z,
    N,
    Yo,
    D,
    x,
    Qs,
    jh
  ]), lw = w.useCallback((E) => {
    const W = {
      ...E,
      location: [E.location[0] - ie, E.location[1]]
    };
    pt == null || pt(W), l !== void 0 && E.buttons === 0 && (c(void 0), Al(void 0), Ll(void 0), Xo.current = !1), Ll((j) => {
      var X;
      return Xo.current ? [E.scrollEdge[0], 0] : E.scrollEdge[0] === (j == null ? void 0 : j[0]) && E.scrollEdge[1] === j[1] ? j : l === void 0 || (((X = Rr.current) == null ? void 0 : X.location[0]) ?? 0) < ie ? void 0 : E.scrollEdge;
    });
  }, [l, pt, ie]), cw = w.useCallback((E, W) => {
    Ve == null || Ve(E - ie, W);
  }, [Ve, ie]), uw = w.useCallback((E, W) => {
    tt == null || tt(E - ie, W);
  }, [tt, ie]), Vr = (ep = pe == null ? void 0 : pe.current) == null ? void 0 : ep.cell, dw = w.useCallback((E, W, j, X, ae, ye) => {
    Bi.current = !1;
    let le = Vr;
    le !== void 0 && (le = [le[0] - ie, le[1]]);
    const de = Ct === 0 ? void 0 : {
      x: 0,
      y: E.y,
      width: Ct,
      height: E.height
    }, be = [];
    de !== void 0 && be.push(de), ue > 0 && (be.push({
      x: E.x - ie,
      y: wt - ue,
      width: E.width,
      height: ue
    }), Ct > 0 && be.push({
      x: 0,
      y: wt - ue,
      width: Ct,
      height: ue
    }));
    const Re = {
      x: E.x - ie,
      y: E.y,
      width: E.width,
      height: wn && E.y + E.height >= wt ? E.height - 1 : E.height,
      tx: ae,
      ty: ye,
      extras: {
        selected: le,
        freezeRegion: de,
        freezeRegions: be
      }
    };
    Hn.current = Re, vi(Re), Dr([W, j, X]), hn == null || hn(Re, Re.tx, Re.ty, Re.extras);
  }, [
    Vr,
    ie,
    wn,
    wt,
    Ct,
    ue,
    vi,
    hn
  ]), fw = Ei(I, w.useCallback((E, W) => (I == null ? void 0 : I(E - ie, W - ie)) !== !1, [I, ie])), hw = Ei(Be, w.useCallback((E, W) => {
    Be == null || Be(E - ie, W - ie), re !== "none" && Dt(tn.fromSingleSelection(W), void 0, !0);
  }, [re, Be, ie, Dt])), $l = w.useRef(!1), pw = w.useCallback((E) => {
    if (E.location[0] === 0 && ie > 0) {
      E.preventDefault();
      return;
    }
    Xe == null || Xe({
      ...E,
      location: [E.location[0] - ie, E.location[1]]
    }), E.defaultPrevented() || ($l.current = !0), c(void 0);
  }, [Xe, ie]), gw = w.useCallback(() => {
    $l.current = !1;
  }, []), Gh = Lt == null ? void 0 : Lt.selectionBehavior, ea = w.useCallback((E) => {
    if (Gh !== "block-spanning")
      return;
    const { isGroupHeader: W, path: j, groupRows: X } = Wi(E);
    if (W)
      return [E, E];
    const ae = j[j.length - 1], ye = E - ae, le = E + X - ae - 1;
    return [ye, le];
  }, [Wi, Gh]), Fl = w.useRef(), Hl = w.useCallback((E) => {
    var W, j, X;
    if (!U1(E, Fl.current) && (Fl.current = E, !(((W = Rr == null ? void 0 : Rr.current) == null ? void 0 : W.button) !== void 0 && Rr.current.button >= 1))) {
      if (E.buttons !== 0 && l !== void 0 && ((j = Rr.current) == null ? void 0 : j.location[0]) === 0 && ie === 1 && _e === "multi" && l.previousSelection && !l.previousSelection.rows.hasIndex(Rr.current.location[1]) && pe.rows.hasIndex(Rr.current.location[1])) {
        const ae = Math.min(Rr.current.location[1], E.location[1]), ye = Math.max(Rr.current.location[1], E.location[1]) + 1;
        Bt(tn.fromSingleSelection([ae, ye]), void 0, !1);
      } else if (E.buttons !== 0 && l !== void 0 && pe.current !== void 0 && !$l.current && !Xo.current && (ot === "rect" || ot === "multi-rect")) {
        const [ae, ye] = pe.current.cell;
        let [le, de] = E.location;
        if (de < 0 && (de = Hn.current.y), l.fillHandle === !0 && ((X = l.previousSelection) == null ? void 0 : X.current) !== void 0) {
          const be = l.previousSelection.current.range;
          de = Math.min(de, wn ? wt - 1 : wt);
          const Re = LM(be, le, de, ke);
          Al(Re);
        } else {
          if (wn && ye === wt)
            return;
          if (wn && de === wt)
            if (E.kind === rl)
              de--;
            else
              return;
          le = Math.max(le, ie);
          const je = ea(ye);
          de = je === void 0 ? de : Er(de, je[0], je[1]);
          const ct = le - ae, Ae = de - ye, Et = {
            x: ct >= 0 ? ae : le,
            y: Ae >= 0 ? ye : de,
            width: Math.abs(ct) + 1,
            height: Math.abs(Ae) + 1
          };
          $t({
            ...pe.current,
            range: Et
          }, !0, !1, "drag");
        }
      }
      yt == null || yt({ ...E, location: [E.location[0] - ie, E.location[1]] });
    }
  }, [
    l,
    ie,
    _e,
    pe,
    ot,
    yt,
    Bt,
    wn,
    wt,
    ke,
    ea,
    $t
  ]), mw = w.useCallback(() => {
    var le, de;
    const E = Fl.current;
    if (E === void 0)
      return;
    const [W, j] = E.scrollEdge;
    let [X, ae] = E.location;
    const ye = Hn.current;
    W === -1 ? X = ((de = (le = ye.extras) == null ? void 0 : le.freezeRegion) == null ? void 0 : de.x) ?? ye.x : W === 1 && (X = ye.x + ye.width), j === -1 ? ae = Math.max(0, ye.y) : j === 1 && (ae = Math.min(wt - 1, ye.y + ye.height)), X = Er(X, 0, Wt.length - 1), ae = Er(ae, 0, wt - 1), Hl({
      ...E,
      location: [X, ae]
    });
  }, [Wt.length, Hl, wt]);
  UA(sw, pn, mw);
  const zr = w.useCallback((E) => {
    if (pe.current === void 0)
      return;
    const [W, j] = E, [X, ae] = pe.current.cell, ye = pe.current.range;
    let le = ye.x, de = ye.x + ye.width, be = ye.y, Re = ye.y + ye.height;
    const [je, ct] = ea(ae) ?? [0, wt - 1], Ae = ct + 1;
    if (j !== 0)
      switch (j) {
        case 2: {
          Re = Ae, be = ae, In(0, Re, "vertical");
          break;
        }
        case -2: {
          be = je, Re = ae + 1, In(0, be, "vertical");
          break;
        }
        case 1: {
          be < ae ? (be++, In(0, be, "vertical")) : (Re = Math.min(Ae, Re + 1), In(0, Re, "vertical"));
          break;
        }
        case -1: {
          Re > ae + 1 ? (Re--, In(0, Re, "vertical")) : (be = Math.max(je, be - 1), In(0, be, "vertical"));
          break;
        }
        default:
          Ds();
      }
    if (W !== 0)
      if (W === 2)
        de = Wt.length, le = X, In(de - 1 - ie, 0, "horizontal");
      else if (W === -2)
        le = ie, de = X + 1, In(le - ie, 0, "horizontal");
      else {
        let Et = [];
        if (ve !== void 0) {
          const ut = ve({
            x: le,
            y: be,
            width: de - le - ie,
            height: Re - be
          }, ee.current.signal);
          typeof ut == "object" && (Et = n_(ut));
        }
        if (W === 1) {
          let ut = !1;
          if (le < X) {
            if (Et.length > 0) {
              const Nt = Yi(le + 1, X + 1).find((_t) => !Et.includes(_t - ie));
              Nt !== void 0 && (le = Nt, ut = !0);
            } else
              le++, ut = !0;
            ut && In(le, 0, "horizontal");
          }
          ut || (de = Math.min(Wt.length, de + 1), In(de - 1 - ie, 0, "horizontal"));
        } else if (W === -1) {
          let ut = !1;
          if (de > X + 1) {
            if (Et.length > 0) {
              const Nt = Yi(de - 1, X, -1).find((_t) => !Et.includes(_t - ie));
              Nt !== void 0 && (de = Nt, ut = !0);
            } else
              de--, ut = !0;
            ut && In(de - ie, 0, "horizontal");
          }
          ut || (le = Math.max(ie, le - 1), In(le - ie, 0, "horizontal"));
        } else
          Ds();
      }
    $t({
      cell: pe.current.cell,
      range: {
        x: le,
        y: be,
        width: de - le,
        height: Re - be
      }
    }, !0, !1, "keyboard-select");
  }, [
    ve,
    ea,
    pe,
    Wt.length,
    ie,
    wt,
    In,
    $t
  ]), Bl = w.useRef(et);
  Bl.current = et;
  const ki = w.useCallback((E, W, j, X) => {
    const ae = Zn - (j ? 0 : 1);
    E = Er(E, ie, Nn.length - 1 + ie), W = Er(W, 0, ae);
    const ye = Vr == null ? void 0 : Vr[0], le = Vr == null ? void 0 : Vr[1];
    if (E === ye && W === le)
      return !1;
    if (X && pe.current !== void 0) {
      const de = [...pe.current.rangeStack];
      (pe.current.range.width > 1 || pe.current.range.height > 1) && de.push(pe.current.range), We({
        ...pe,
        current: {
          cell: [E, W],
          range: { x: E, y: W, width: 1, height: 1 },
          rangeStack: de
        }
      }, !0);
    } else
      $t({
        cell: [E, W],
        range: { x: E, y: W, width: 1, height: 1 }
      }, !0, !1, "keyboard-nav");
    return u.current !== void 0 && u.current[0] === E && u.current[1] === W && (u.current = void 0), Bl.current && In(E - ie, W), !0;
  }, [
    Zn,
    ie,
    Nn.length,
    Vr,
    pe,
    In,
    We,
    $t
  ]), yw = w.useCallback((E, W) => {
    (i == null ? void 0 : i.cell) !== void 0 && E !== void 0 && To(E) && (Cr([{ location: i.cell, value: E }]), window.requestAnimationFrame(() => {
      var ae;
      (ae = jn.current) == null || ae.damage([
        {
          cell: i.cell
        }
      ]);
    })), nr(!0), o(void 0);
    const [j, X] = W;
    if (pe.current !== void 0 && (j !== 0 || X !== 0)) {
      const ae = pe.current.cell[1] === Zn - 1 && E !== void 0, ye = pe.current.cell[0] === Wt.length - 1 && E !== void 0;
      let le = !0;
      if (ae && X === 1 && Ee !== void 0) {
        le = !1;
        const de = pe.current.cell[0] + j, be = bo(de);
        wi(be ?? de, !1);
      }
      if (ye && j === 1 && Ce !== void 0) {
        le = !1;
        const de = pe.current.cell[1] + X;
        Zs(de, !1);
      }
      le && ki(Er(pe.current.cell[0] + j, 0, Wt.length - 1), Er(pe.current.cell[1] + X, 0, Zn - 1), ae, !1);
    }
    O == null || O(E, W);
  }, [
    i == null ? void 0 : i.cell,
    nr,
    pe,
    O,
    Cr,
    Zn,
    ki,
    Wt.length,
    wi,
    Zs,
    Ee,
    Ce,
    bo
  ]), bw = w.useMemo(() => `gdg-overlay-${t_++}`, []), Ki = w.useCallback((E) => {
    var j, X, ae, ye;
    nr();
    const W = [];
    for (let le = E.x; le < E.x + E.width; le++)
      for (let de = E.y; de < E.y + E.height; de++) {
        const be = T([le - ie, de]);
        if (!be.allowOverlay && be.kind !== He.Boolean)
          continue;
        let Re;
        if (be.kind === He.Custom) {
          const je = xn(be), ct = (j = je == null ? void 0 : je.provideEditor) == null ? void 0 : j.call(je, {
            ...be,
            location: [le - ie, de]
          });
          (je == null ? void 0 : je.onDelete) !== void 0 ? Re = je.onDelete(be) : OR(ct) && (Re = (X = ct == null ? void 0 : ct.deletedValue) == null ? void 0 : X.call(ct, be));
        } else if (To(be) && be.allowOverlay || be.kind === He.Boolean) {
          const je = xn(be);
          Re = (ae = je == null ? void 0 : je.onDelete) == null ? void 0 : ae.call(je, be);
        }
        Re !== void 0 && !_o(Re) && To(Re) && W.push({ location: [le, de], value: Re });
      }
    Cr(W), (ye = jn.current) == null || ye.damage(W.map((le) => ({ cell: le.location })));
  }, [nr, T, xn, Cr, ie]), Vo = i !== void 0, Yh = w.useCallback((E) => {
    var Nt, _t;
    const W = () => {
      E.stopPropagation(), E.preventDefault();
    }, j = {
      didMatch: !1
    }, { bounds: X } = E, ae = pe.columns, ye = pe.rows, le = Xr;
    if (!Vo && jt(le.clear, E, j))
      We(Ia, !1), Ft == null || Ft();
    else if (!Vo && jt(le.selectAll, E, j))
      We({
        columns: tn.empty(),
        rows: tn.empty(),
        current: {
          cell: ((Nt = pe.current) == null ? void 0 : Nt.cell) ?? [ie, 0],
          range: {
            x: ie,
            y: 0,
            width: y.length,
            height: wt
          },
          rangeStack: []
        }
      }, !1);
    else if (jt(le.search, E, j))
      (_t = s == null ? void 0 : s.current) == null || _t.focus({ preventScroll: !0 }), Hi(!0);
    else if (jt(le.delete, E, j)) {
      const St = (Yt == null ? void 0 : Yt(pe)) ?? !0;
      if (St !== !1) {
        const Zt = St === !0 ? pe : St;
        if (Zt.current !== void 0) {
          Ki(Zt.current.range);
          for (const Rn of Zt.current.rangeStack)
            Ki(Rn);
        }
        for (const Rn of Zt.rows)
          Ki({
            x: ie,
            y: Rn,
            width: y.length,
            height: 1
          });
        for (const Rn of Zt.columns)
          Ki({
            x: Rn,
            y: 0,
            width: 1,
            height: wt
          });
      }
    }
    if (j.didMatch)
      return W(), !0;
    if (pe.current === void 0)
      return !1;
    let [de, be] = pe.current.cell;
    const [, Re] = pe.current.cell;
    let je = !1, ct = !1;
    if (jt(le.scrollToSelectedCell, E, j))
      ra.current(de - ie, be);
    else if (re !== "none" && jt(le.selectColumn, E, j))
      ae.hasIndex(de) ? Dt(ae.remove(de), void 0, !0) : re === "single" ? Dt(tn.fromSingleSelection(de), void 0, !0) : Dt(void 0, de, !0);
    else if (_e !== "none" && jt(le.selectRow, E, j))
      ye.hasIndex(be) ? Bt(ye.remove(be), void 0, !0) : _e === "single" ? Bt(tn.fromSingleSelection(be), void 0, !0) : Bt(void 0, be, !0);
    else if (!Vo && X !== void 0 && jt(le.activateCell, E, j))
      if (be === wt && wn)
        window.setTimeout(() => {
          const St = bo(de);
          wi(St ?? de);
        }, 0);
      else {
        const St = {
          inputType: "keyboard",
          key: E.key
        };
        v == null || v([de - ie, be], St), yo(X, St);
      }
    else pe.current.range.height > 1 && jt(le.downFill, E, j) ? Uh() : pe.current.range.width > 1 && jt(le.rightFill, E, j) ? Kh() : jt(le.goToNextPage, E, j) ? be += Math.max(1, Hn.current.height - 4) : jt(le.goToPreviousPage, E, j) ? be -= Math.max(1, Hn.current.height - 4) : jt(le.goToFirstCell, E, j) ? (o(void 0), be = 0, de = 0) : jt(le.goToLastCell, E, j) ? (o(void 0), be = Number.MAX_SAFE_INTEGER, de = Number.MAX_SAFE_INTEGER) : jt(le.selectToFirstCell, E, j) ? (o(void 0), zr([-2, -2])) : jt(le.selectToLastCell, E, j) ? (o(void 0), zr([2, 2])) : Vo ? (jt(le.closeOverlay, E, j) && o(void 0), jt(le.acceptOverlayDown, E, j) && (o(void 0), be++), jt(le.acceptOverlayUp, E, j) && (o(void 0), be--), jt(le.acceptOverlayLeft, E, j) && (o(void 0), de--), jt(le.acceptOverlayRight, E, j) && (o(void 0), de++)) : (jt(le.goDownCell, E, j) ? be += 1 : jt(le.goUpCell, E, j) ? be -= 1 : jt(le.goRightCell, E, j) ? de += 1 : jt(le.goLeftCell, E, j) ? de -= 1 : jt(le.goDownCellRetainSelection, E, j) ? (be += 1, je = !0) : jt(le.goUpCellRetainSelection, E, j) ? (be -= 1, je = !0) : jt(le.goRightCellRetainSelection, E, j) ? (de += 1, je = !0) : jt(le.goLeftCellRetainSelection, E, j) ? (de -= 1, je = !0) : jt(le.goToLastRow, E, j) ? be = wt - 1 : jt(le.goToFirstRow, E, j) ? be = Number.MIN_SAFE_INTEGER : jt(le.goToLastColumn, E, j) ? de = Number.MAX_SAFE_INTEGER : jt(le.goToFirstColumn, E, j) ? de = Number.MIN_SAFE_INTEGER : (ot === "rect" || ot === "multi-rect") && (jt(le.selectGrowDown, E, j) ? zr([0, 1]) : jt(le.selectGrowUp, E, j) ? zr([0, -1]) : jt(le.selectGrowRight, E, j) ? zr([1, 0]) : jt(le.selectGrowLeft, E, j) ? zr([-1, 0]) : jt(le.selectToLastRow, E, j) ? zr([0, 2]) : jt(le.selectToFirstRow, E, j) ? zr([0, -2]) : jt(le.selectToLastColumn, E, j) ? zr([2, 0]) : jt(le.selectToFirstColumn, E, j) && zr([-2, 0])), ct = j.didMatch);
    if (Or !== void 0 && Or !== "normal" && be !== Re) {
      const St = Or === "skip-up" || Or === "skip" || Or === "block", Zt = Or === "skip-down" || Or === "skip" || Or === "block", Rn = be < Re;
      if (Rn && St) {
        for (; be >= 0 && Wi(be).isGroupHeader; )
          be--;
        be < 0 && (be = Re);
      } else if (!Rn && Zt) {
        for (; be < wt && Wi(be).isGroupHeader; )
          be++;
        be >= wt && (be = Re);
      }
    }
    const Et = ki(de, be, !1, je), ut = j.didMatch;
    return ut && (Et || !ct || Cn) && W(), ut;
  }, [
    Or,
    Vo,
    pe,
    Xr,
    re,
    _e,
    ot,
    ie,
    Wi,
    wt,
    ki,
    We,
    Ft,
    y.length,
    Yt,
    Cn,
    Ki,
    Dt,
    Bt,
    wn,
    bo,
    wi,
    v,
    yo,
    Uh,
    Kh,
    zr
  ]), Jo = w.useCallback((E) => {
    let W = !1;
    if (te !== void 0 && te({
      ...E,
      ...E.location && {
        location: [E.location[0] - ie, E.location[1]]
      },
      cancel: () => {
        W = !0;
      }
    }), W || Yh(E) || pe.current === void 0)
      return;
    const [j, X] = pe.current.cell, ae = Hn.current;
    if (fe && !E.metaKey && !E.ctrlKey && pe.current !== void 0 && E.key.length === 1 && /[\p{L}\p{M}\p{N}\p{S}\p{P}]/u.test(E.key) && E.bounds !== void 0 && Eo(T([j - ie, Math.max(0, Math.min(X, wt - 1))]))) {
      if ((!wn || X !== wt) && (ae.y > X || X > ae.y + ae.height || ae.x > j || j > ae.x + ae.width))
        return;
      const ye = {
        inputType: "keyboard",
        key: E.key
      };
      v == null || v([j - ie, X], ye), yo(E.bounds, ye, E.key), E.stopPropagation(), E.preventDefault();
    }
  }, [
    fe,
    te,
    Yh,
    pe,
    T,
    ie,
    wt,
    wn,
    v,
    yo
  ]), vw = w.useCallback((E, W) => {
    const j = E.location[0] - ie;
    if (E.kind === "header" && (Z == null || Z(j, { ...E, preventDefault: W })), E.kind === Br) {
      if (j < 0)
        return;
      N == null || N(j, { ...E, preventDefault: W });
    }
    if (E.kind === "cell") {
      const [X, ae] = E.location;
      $ == null || $([j, ae], {
        ...E,
        preventDefault: W
      }), gE(pe, E.location) || ki(X, ae, !1, !1);
    }
  }, [
    pe,
    $,
    N,
    Z,
    ie,
    ki
  ]), ql = w.useCallback(async (E) => {
    var le, de, be;
    if (!Xr.paste)
      return;
    function W(Re, je, ct, Ae) {
      var ut, Nt;
      const Et = typeof ct == "object" ? (ct == null ? void 0 : ct.join(`
`)) ?? "" : (ct == null ? void 0 : ct.toString()) ?? "";
      if (!_o(Re) && Eo(Re) && Re.readonly !== !0) {
        const _t = P == null ? void 0 : P(Et, Re);
        if (_t !== void 0 && To(_t))
          return process.env.NODE_ENV !== "production" && _t.kind !== Re.kind && console.warn("Coercion should not change cell kind."), {
            location: je,
            value: _t
          };
        const St = xn(Re);
        if (St === void 0)
          return;
        if (St.kind === He.Custom) {
          yr(Re.kind === He.Custom);
          const Zt = (ut = St.onPaste) == null ? void 0 : ut.call(St, Et, Re.data);
          return Zt === void 0 ? void 0 : {
            location: je,
            value: {
              ...Re,
              data: Zt
            }
          };
        } else {
          const Zt = (Nt = St.onPaste) == null ? void 0 : Nt.call(St, Et, Re, {
            formatted: Ae,
            formattedString: typeof Ae == "string" ? Ae : Ae == null ? void 0 : Ae.join(`
`),
            rawValue: ct
          });
          return Zt === void 0 ? void 0 : (yr(Zt.kind === Re.kind), {
            location: je,
            value: Zt
          });
        }
      }
    }
    const j = pe.columns, X = pe.rows, ae = ((le = pn.current) == null ? void 0 : le.contains(document.activeElement)) === !0 || ((de = a.current) == null ? void 0 : de.contains(document.activeElement)) === !0;
    let ye;
    if (pe.current !== void 0 ? ye = [pe.current.range.x, pe.current.range.y] : j.length === 1 ? ye = [j.first() ?? 0, 0] : X.length === 1 && (ye = [ie, X.first() ?? 0]), ae && ye !== void 0) {
      let Re, je;
      const ct = "text/plain", Ae = "text/html";
      if (navigator.clipboard.read !== void 0) {
        const _t = await navigator.clipboard.read();
        for (const St of _t) {
          if (St.types.includes(Ae)) {
            const Rn = await (await St.getType(Ae)).text(), Bn = Iy(Rn);
            if (Bn !== void 0) {
              Re = Bn;
              break;
            }
          }
          St.types.includes(ct) && (je = await (await St.getType(ct)).text());
        }
      } else if (navigator.clipboard.readText !== void 0)
        je = await navigator.clipboard.readText();
      else if (E !== void 0 && (E == null ? void 0 : E.clipboardData) !== null) {
        if (E.clipboardData.types.includes(Ae)) {
          const _t = E.clipboardData.getData(Ae);
          Re = Iy(_t);
        }
        Re === void 0 && E.clipboardData.types.includes(ct) && (je = E.clipboardData.getData(ct));
      } else
        return;
      const [Et, ut] = ye, Nt = [];
      do {
        if (Se === void 0) {
          const _t = lr(ye), St = je ?? (Re == null ? void 0 : Re.map((Rn) => Rn.map((Bn) => Bn.rawValue).join("	")).join("	")) ?? "", Zt = W(_t, ye, St, void 0);
          Zt !== void 0 && Nt.push(Zt);
          break;
        }
        if (Re === void 0) {
          if (je === void 0)
            return;
          Re = FA(je);
        }
        if (Se === !1 || typeof Se == "function" && (Se == null ? void 0 : Se([ye[0] - ie, ye[1]], Re.map((_t) => _t.map((St) => {
          var Zt;
          return ((Zt = St.rawValue) == null ? void 0 : Zt.toString()) ?? "";
        })))) !== !0)
          return;
        for (const [_t, St] of Re.entries()) {
          if (_t + ut >= wt)
            break;
          for (const [Zt, Rn] of St.entries()) {
            const Bn = [Zt + Et, _t + ut], [cr, Jr] = Bn;
            if (cr >= Wt.length || Jr >= Zn)
              continue;
            const Lr = lr(Bn), Zr = W(Lr, Bn, Rn.rawValue, Rn.formatted);
            Zr !== void 0 && Nt.push(Zr);
          }
        }
      } while (!1);
      Cr(Nt), (be = jn.current) == null || be.damage(Nt.map((_t) => ({
        cell: _t.location
      })));
    }
  }, [
    P,
    xn,
    lr,
    pe,
    Xr.paste,
    pn,
    Wt.length,
    Cr,
    Zn,
    Se,
    ie,
    wt
  ]);
  rr("paste", ql, d, !1, !0);
  const Zo = w.useCallback(async (E, W) => {
    var le, de;
    if (!Xr.copy)
      return;
    const j = W === !0 || ((le = pn.current) == null ? void 0 : le.contains(document.activeElement)) === !0 || ((de = a.current) == null ? void 0 : de.contains(document.activeElement)) === !0, X = pe.columns, ae = pe.rows, ye = (be, Re) => {
      if (!Ze)
        _y(be, Re, E);
      else {
        const je = Re.map((ct) => ({
          kind: He.Text,
          data: y[ct].title,
          displayData: y[ct].title,
          allowOverlay: !1
        }));
        _y([je, ...be], Re, E);
      }
    };
    if (j && ve !== void 0) {
      if (pe.current !== void 0) {
        let be = ve(pe.current.range, ee.current.signal);
        typeof be != "object" && (be = await be()), ye(be, Yi(pe.current.range.x - ie, pe.current.range.x + pe.current.range.width - ie));
      } else if (ae !== void 0 && ae.length > 0) {
        const Re = [...ae].map((je) => {
          const ct = ve({
            x: ie,
            y: je,
            width: y.length,
            height: 1
          }, ee.current.signal);
          return typeof ct == "object" ? ct[0] : ct().then((Ae) => Ae[0]);
        });
        if (Re.some((je) => je instanceof Promise)) {
          const je = await Promise.all(Re);
          ye(je, Yi(y.length));
        } else
          ye(Re, Yi(y.length));
      } else if (X.length > 0) {
        const be = [], Re = [];
        for (const je of X) {
          let ct = ve({
            x: je,
            y: 0,
            width: 1,
            height: wt
          }, ee.current.signal);
          typeof ct != "object" && (ct = await ct()), be.push(ct), Re.push(je - ie);
        }
        if (be.length === 1)
          ye(be[0], Re);
        else {
          const je = be.reduce((ct, Ae) => ct.map((Et, ut) => [...Et, ...Ae[ut]]));
          ye(je, Re);
        }
      }
    }
  }, [
    y,
    ve,
    pe,
    Xr.copy,
    ie,
    pn,
    wt,
    Ze
  ]);
  rr("copy", Zo, d, !1, !1);
  const ww = w.useCallback(async (E) => {
    var j, X;
    if (!(!Xr.cut || !(((j = pn.current) == null ? void 0 : j.contains(document.activeElement)) === !0 || ((X = a.current) == null ? void 0 : X.contains(document.activeElement)) === !0)) && (await Zo(E), pe.current !== void 0)) {
      let ae = {
        current: {
          cell: pe.current.cell,
          range: pe.current.range,
          rangeStack: []
        },
        rows: tn.empty(),
        columns: tn.empty()
      };
      const ye = Yt == null ? void 0 : Yt(ae);
      if (ye === !1 || (ae = ye === !0 ? ae : ye, ae.current === void 0))
        return;
      Ki(ae.current.range);
    }
  }, [Ki, pe, Xr.cut, Zo, pn, Yt]);
  rr("cut", ww, d, !1, !1);
  const xw = w.useCallback((E, W) => {
    if (V !== void 0) {
      ie !== 0 && (E = E.map((ae) => [ae[0] - ie, ae[1]])), V(E, W);
      return;
    }
    if (E.length === 0 || W === -1)
      return;
    const [j, X] = E[W];
    u.current !== void 0 && u.current[0] === j && u.current[1] === X || (u.current = [j, X], ki(j, X, !1, !1));
  }, [V, ie, ki]), [ta, na] = ((tp = rn == null ? void 0 : rn.current) == null ? void 0 : tp.cell) ?? [], ra = w.useRef(In);
  ra.current = In, w.useLayoutEffect(() => {
    var E, W, j, X;
    Bl.current && !Bi.current && ta !== void 0 && na !== void 0 && (ta !== ((W = (E = Fe.current) == null ? void 0 : E.current) == null ? void 0 : W.cell[0]) || na !== ((X = (j = Fe.current) == null ? void 0 : j.current) == null ? void 0 : X.cell[1])) && ra.current(ta, na), Bi.current = !1;
  }, [ta, na]);
  const Xh = pe.current !== void 0 && (pe.current.cell[0] >= Wt.length || pe.current.cell[1] >= Zn);
  w.useLayoutEffect(() => {
    Xh && We(Ia, !1);
  }, [Xh, We]);
  const kw = w.useMemo(() => wn === !0 && (Ke == null ? void 0 : Ke.tint) === !0 ? tn.fromSingleSelection(Zn - 1) : tn.empty(), [Zn, wn, Ke == null ? void 0 : Ke.tint]), Sw = w.useCallback((E) => typeof oe == "boolean" ? oe : (oe == null ? void 0 : oe(E - ie)) ?? !0, [ie, oe]), Cw = w.useMemo(() => {
    if (Ol === void 0 || a.current === null)
      return null;
    const { bounds: E, group: W } = Ol, j = a.current.getBoundingClientRect();
    return w.createElement(MA, { bounds: E, group: W, canvasBounds: j, onClose: () => zl(void 0), onFinish: (X) => {
      zl(void 0), J == null || J(W, X);
    } });
  }, [J, Ol]), Rw = Math.min(Wt.length, Ct + (gr ? 1 : 0));
  w.useImperativeHandle(e, () => ({
    appendRow: (E, W) => wi(E + ie, W),
    appendColumn: (E, W) => Zs(E, W),
    updateCells: (E) => {
      var W;
      return ie !== 0 && (E = E.map((j) => ({ cell: [j.cell[0] + ie, j.cell[1]] }))), (W = jn.current) == null ? void 0 : W.damage(E);
    },
    getBounds: (E, W) => {
      var j;
      if (!((a == null ? void 0 : a.current) === null || (pn == null ? void 0 : pn.current) === null)) {
        if (E === void 0 && W === void 0) {
          const X = a.current.getBoundingClientRect(), ae = X.width / pn.current.clientWidth;
          return {
            x: X.x - pn.current.scrollLeft * ae,
            y: X.y - pn.current.scrollTop * ae,
            width: pn.current.scrollWidth * ae,
            height: pn.current.scrollHeight * ae
          };
        }
        return (j = jn.current) == null ? void 0 : j.getBounds((E ?? 0) + ie, W);
      }
    },
    focus: () => {
      var E;
      return (E = jn.current) == null ? void 0 : E.focus();
    },
    /* fork: open a cell's overlay editor imperatively — the same path a
       double-click takes (a DOM dropdown button inside the cell can call
       this without synthesising pointer events). */
    openCellEditor: (E, W) => {
      var ae;
      const j = lr([E, W]);
      if (j == null || !j.allowOverlay) return;
      const X = (ae = jn.current) == null ? void 0 : ae.getBounds(E + ie, W);
      X != null && Uo({
        target: X,
        content: j,
        initialValue: void 0,
        highlight: !0,
        cell: [E, W],
        forceEditMode: !0,
        activation: { inputType: "keyboard", key: "Enter" }
      });
    },
    emit: async (E) => {
      switch (E) {
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
    scrollTo: In,
    remeasureColumns: (E) => {
      for (const W of E)
        Qs(W + ie);
    },
    getMouseArgsForPosition: (E, W, j) => {
      if ((jn == null ? void 0 : jn.current) === null)
        return;
      const X = jn.current.getMouseArgsForPosition(E, W, j);
      if (X !== void 0)
        return {
          ...X,
          location: [X.location[0] - ie, X.location[1]]
        };
    }
  }), [
    wi,
    Zs,
    Qs,
    pn,
    Zo,
    Jo,
    ql,
    ie,
    In
  ]);
  const [Vh, Jh] = Vr ?? [], Tw = w.useCallback((E) => {
    const [W, j] = E;
    if (j === -1) {
      re !== "none" && (Dt(tn.fromSingleSelection(W), void 0, !1), nr());
      return;
    }
    Vh === W && Jh === j || ($t({
      cell: E,
      range: { x: W, y: j, width: 1, height: 1 }
    }, !0, !1, "keyboard-nav"), In(W, j));
  }, [re, nr, In, Vh, Jh, $t, Dt]), [Ew, Mw] = w.useState(!1), Zh = w.useRef(Vv((E) => {
    Mw(E);
  }, 5)), Iw = w.useCallback(() => {
    Zh.current(!0), pe.current === void 0 && pe.columns.length === 0 && pe.rows.length === 0 && l === void 0 && $t({
      cell: [ie, Ys],
      range: {
        x: ie,
        y: Ys,
        width: 1,
        height: 1
      }
    }, !0, !1, "keyboard-select");
  }, [Ys, pe, l, ie, $t]), Aw = w.useCallback(() => {
    Zh.current(!1);
  }, []), [_w, Pw] = w.useMemo(() => {
    let E;
    const W = (vt == null ? void 0 : vt.scrollbarWidthOverride) ?? kf(), j = wt + (wn ? 1 : 0);
    if (typeof en == "number")
      E = Jn + j * en;
    else {
      let ae = 0;
      const ye = Math.min(j, 10);
      for (let le = 0; le < ye; le++)
        ae += en(le);
      ae = Math.floor(ae / ye), E = Jn + j * ae;
    }
    E += W;
    const X = Wt.reduce((ae, ye) => ye.width + ae, 0) + W;
    return [`${Math.min(1e5, X)}px`, `${Math.min(1e5, E)}px`];
  }, [Wt, vt == null ? void 0 : vt.scrollbarWidthOverride, en, wt, wn, Jn]), Dw = w.useMemo(() => IE(Xt), [Xt]);
  return w.createElement(
    AE.Provider,
    { value: Xt },
    w.createElement(
      WA,
      { style: Dw, className: B, inWidth: g ?? _w, inHeight: m ?? Pw },
      w.createElement(CA, { fillHandle: kt, drawFocusRing: Vt, experimental: vt, fixedShadowX: Ut, fixedShadowY: An, getRowThemeOverride: ar, headerIcons: zt, imageWindowLoader: cn, initialSize: _n, isDraggable: Pn, onDragLeave: Ht, onRowMoved: mn, overscrollX: Tl, overscrollY: El, preventDiagonalScrolling: hr, rightElement: Vn, rightElementProps: un, smoothScrollX: or, smoothScrollY: Pr, className: B, enableGroups: Sr, onCanvasFocused: Iw, onCanvasBlur: Aw, canvasRef: a, onContextMenu: vw, theme: Xt, cellXOffset: rw, cellYOffset: Ys, accessibilityHeight: ai.height, onDragEnd: gw, columns: Wt, nonGrowWidth: on, drawHeader: Fn, onColumnProposeMove: fw, drawCell: xt, disabledRows: kw, freezeColumns: Rw, lockColumns: ie, firstColAccessible: ie === 0, getCellContent: lr, minColumnWidth: Kn, maxColumnWidth: Un, searchInputRef: s, showSearch: Il, onSearchClose: po, highlightRegions: iw, getCellsForSelection: ve, getGroupDetails: _l, headerHeight: Fi, isFocused: Ew, groupHeaderHeight: Sr ? Gs : 0, freezeTrailingRows: ue + (wn && (Ke == null ? void 0 : Ke.sticky) === !0 ? 1 : 0), hasAppendRow: wn, onColumnResize: Tt, onColumnResizeEnd: Gt, onColumnResizeStart: ht, onCellFocused: Tw, onColumnMoved: hw, onDragStart: pw, onHeaderMenuClick: cw, onHeaderIndicatorClick: uw, onItemHovered: Hl, isFilling: (l == null ? void 0 : l.fillHandle) === !0, onMouseMove: lw, onKeyDown: Jo, onKeyUp: Y, onMouseDown: ow, onMouseUp: aw, onDragOverCell: he, onDrop: Pe, onSearchResultsChanged: xw, onVisibleRegionChanged: dw, clientSize: Mn, rowHeight: en, searchResults: q, searchValue: ne, onSearchValueChange: G, rows: Zn, scrollRef: pn, selection: pe, translateX: ai.tx, translateY: ai.ty, verticalBorder: Sw, gridRef: jn, getCellRenderer: xn, resizeIndicator: Te }),
      Cw,
      i !== void 0 && w.createElement(
        w.Suspense,
        { fallback: null },
        w.createElement(e_, { ...i, validateCell: at, bloom: C, id: bw, getCellRenderer: xn, className: (vt == null ? void 0 : vt.isSubGrid) === !0 ? "click-outside-ignore" : void 0, provideEditor: qe, imageEditorOverride: f, portalElementRef: vn, onFinishEditing: yw, markdownDivCreateNode: p, isOutsideClick: Gr, customEventTarget: vt == null ? void 0 : vt.eventTarget })
      )
    )
  );
}, i_ = w.forwardRef(r_);
function Ny(t) {
  const { cell: e, posX: n, posY: r, bounds: i, theme: o } = t, { width: s, height: a, x: l, y: c } = i, u = e.maxSize ?? o.checkboxMaxSize, d = Math.floor(i.y + a / 2), f = Qv(u, a, o.cellVerticalPadding), h = Zv(e.contentAlign ?? "center", l, s, o.cellHorizontalPadding, f), p = Jv(h, d, f), g = e1(l + n, c + r, p);
  return ph(e) && g;
}
const o_ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "false";
  },
  kind: He.Boolean,
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
    Ny(t) && t.preventDefault();
  },
  onClick: (t) => {
    if (Ny(t))
      return {
        ...t.cell,
        data: Y1(t.cell.data)
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
const a_ = /* @__PURE__ */ xr("div")({
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
  getAccessibilityString: (t) => t1(t.data),
  kind: He.Bubble,
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
const d_ = /* @__PURE__ */ xr("div")({
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
  getAccessibilityString: (t) => t1(t.data.map((e) => e.text)),
  kind: He.Drilldown,
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
  const { rect: n, theme: r, ctx: i, imageLoader: o, col: s, row: a } = t, { x: l, width: c } = n, u = r.baseFontFull, d = v1(i, u), f = Math.min(n.height, Math.max(16, Math.ceil(d * r.lineHeight) * 2)), h = Math.floor(n.y + (n.height - f) / 2), p = f - 10, g = r.bubblePadding, m = r.bubbleMargin;
  let y = l + r.cellHorizontalPadding;
  const b = r.roundingRadius ?? 6, T = p_(r.bgCell, r.drilldownBorder, f, b), A = [];
  for (const v of e) {
    if (y > l + c)
      break;
    const O = Ko(v.text, i, u).width;
    let P = 0;
    v.img !== void 0 && o.loadOrGetImage(v.img, s, a) !== void 0 && (P = p - 8 + 4);
    const k = O + P + g * 2;
    A.push({
      x: y,
      width: k
    }), y += k + m;
  }
  if (T !== null) {
    const { el: v, height: M, middleWidth: O, sideWidth: P, width: k, dpr: z, padding: C } = T, x = P / z, I = C / z;
    for (const R of A) {
      const S = Math.floor(R.x), D = Math.floor(R.width), $ = D - (x - I) * 2;
      i.imageSmoothingEnabled = !1, i.drawImage(v, 0, 0, P, M, S - I, h, x, f), $ > 0 && i.drawImage(v, P, 0, O, M, S + (x - I), h, $, f), i.drawImage(v, k - P, 0, P, M, S + D - (x - I), h, x, f), i.imageSmoothingEnabled = !0;
    }
  }
  i.beginPath();
  for (const [v, M] of A.entries()) {
    const O = e[v];
    let P = M.x + g;
    if (O.img !== void 0) {
      const k = o.loadOrGetImage(O.img, s, a);
      if (k !== void 0) {
        const z = p - 8;
        let C = 0, x = 0, I = k.width, R = k.height;
        I > R ? (C += (I - R) / 2, I = R) : R > I && (x += (R - I) / 2, R = I), i.beginPath(), ei(i, P, h + f / 2 - z / 2, z, z, r.roundingRadius ?? 3), i.save(), i.clip(), i.drawImage(k, C, x, I, R, P, h + f / 2 - z / 2, z, z), i.restore(), P += z + 4;
      }
    }
    i.beginPath(), i.fillStyle = r.textBubble, i.fillText(O.text, P, h + f / 2 + Oi(i, r));
  }
}
const m_ = {
  getAccessibilityString: (t) => t.data.join(", "),
  kind: He.Image,
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
    const { value: e, onFinishedEditing: n, imageEditorOverride: r } = t, i = r ?? vT;
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
  kind: He.Loading,
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
}, w_ = () => (t) => t.targetWidth, Oy = /* @__PURE__ */ xr("div")({
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
    Oy,
    { targetWidth: o.width - 20 },
    w.createElement(Ks, { autoFocus: !0, highlight: !1, validatedSelection: a, value: l, onKeyDown: (p) => {
      p.key === "Enter" && p.stopPropagation();
    }, onChange: n }),
    w.createElement(
      "div",
      { className: `gdg-edit-icon gdg-checkmark-hover ${h}`, onClick: () => s(e) },
      w.createElement(fT, null)
    )
  ) : w.createElement(
    Oy,
    { targetWidth: o.width },
    w.createElement(iE, { contents: l, createNode: i }),
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
  kind: He.Markdown,
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
function J1(t, e, n, r, i, o, s) {
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
const A_ = w.lazy(async () => await import("./number-overlay-editor-B0wnPkDY.js")), __ = {
  getAccessibilityString: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.toString()) ?? "";
  },
  kind: He.Number,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !1,
  useLabel: !0,
  drawPrep: Us,
  draw: (t) => {
    const { hoverAmount: e, cell: n, ctx: r, theme: i, rect: o, overrideCursor: s } = t, { hoverEffect: a, displayData: l, hoverEffectTheme: c } = n;
    a === !0 && e > 0 && J1(r, i, c, l, o, e, s), li(t, t.cell.displayData, t.cell.contentAlign);
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
  kind: He.Protected,
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
  kind: He.RowID,
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
  kind: He.Text,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !1,
  drawPrep: Us,
  useLabel: !0,
  draw: (t) => {
    const { cell: e, hoverAmount: n, hyperWrapping: r, ctx: i, rect: o, theme: s, overrideCursor: a } = t, { displayData: l, contentAlign: c, hoverEffect: u, allowWrapping: d, hoverEffectTheme: f } = e;
    u === !0 && n > 0 && J1(i, s, f, l, o, n, a), li(t, l, c, d, r);
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
}, z_ = /* @__PURE__ */ xr("div")({
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
function Z1(t, e, n, r) {
  let i = n.cellHorizontalPadding;
  const o = e.height / 2 - t.actualBoundingBoxAscent / 2, s = t.width, a = t.actualBoundingBoxAscent;
  return r === "right" ? i = e.width - s - n.cellHorizontalPadding : r === "center" && (i = e.width / 2 - s / 2), { x: i, y: o, width: s, height: a };
}
function zy(t) {
  const { cell: e, bounds: n, posX: r, posY: i, theme: o } = t, s = e.displayData ?? e.data;
  if (e.hoverEffect !== !0 || e.onClickUri === void 0)
    return !1;
  const a = y1(s, o.baseFontFull);
  if (a === void 0)
    return !1;
  const l = Z1(a, n, o, e.contentAlign);
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
  kind: He.Uri,
  needsHover: (t) => t.hoverEffect === !0,
  needsHoverPosition: !0,
  useLabel: !0,
  drawPrep: Us,
  draw: (t) => {
    const { cell: e, theme: n, overrideCursor: r, hoverX: i, hoverY: o, rect: s, ctx: a } = t, l = e.displayData ?? e.data, c = e.hoverEffect === !0;
    if (r !== void 0 && c && i !== void 0 && o !== void 0) {
      const u = Ko(l, a, n.baseFontFull), d = Z1(u, s, n, e.contentAlign), { x: f, y: h, width: p, height: g } = d;
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
var af, Ly;
function H_() {
  if (Ly) return af;
  Ly = 1;
  var t = Xv(), e = ao(), n = "Expected a function";
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
class W_ extends x1 {
  constructor() {
    super(...arguments);
    Je(this, "imageLoaded", () => {
    });
    Je(this, "loadedLocations", []);
    Je(this, "cache", {});
    // eslint-disable-next-line unicorn/consistent-function-scoping
    Je(this, "sendLoaded", q_(() => {
      this.imageLoaded(new Rs(this.loadedLocations)), this.loadedLocations = [];
    }, 20));
    Je(this, "clearOutOfWindow", () => {
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
  const n = w.useMemo(() => ({ ...NM, ...t.headerIcons }), [t.headerIcons]), r = w.useMemo(() => t.renderers ?? F_, [t.renderers]), i = w.useMemo(() => t.imageWindowLoader ?? new W_(), [t.imageWindowLoader]);
  return w.createElement(i_, { ...t, renderers: r, headerIcons: n, ref: e, imageWindowLoader: i });
}, K_ = w.forwardRef(j_), U_ = w.forwardRef(function(e, n) {
  var I;
  const { getDomCell: r, getDomHeaderCell: i, onVisibleRegionChanged: o, onCellActivated: s, domCellClassName: a, gridSelection: l, freezeColumns: c = 0, domCellBottomInset: u = 0, ...d } = e, f = (I = l == null ? void 0 : l.current) == null ? void 0 : I.cell, h = typeof e.rowHeight == "number" ? e.rowHeight : null, p = w.useRef(null), g = w.useRef(null), m = w.useRef(!1);
  m.current = i != null;
  const y = w.useRef(c);
  y.current = c;
  const b = (R) => {
    var $;
    const S = l == null ? void 0 : l.current;
    if (S == null) return !1;
    const D = (B) => B != null && R >= B.x && R < B.x + B.width;
    return (($ = S.cell) == null ? void 0 : $[0]) === R || D(S.range) || (S.rangeStack ?? []).some(D);
  }, T = w.useRef(null);
  w.useImperativeHandle(n, () => T.current, []);
  const A = w.useRef(null), v = w.useRef(null), M = w.useRef(null), [O, P] = w.useState([]), k = w.useCallback(() => {
    const R = T.current, S = A.current;
    if (R == null || S == null) return;
    const D = S.getBoundingClientRect(), $ = M.current, B = [];
    if ($ != null) {
      const Z = Math.max(0, Math.floor($.x)), L = Math.ceil($.x + $.width), N = Math.max(0, Math.floor($.y)), J = Math.ceil($.y + $.height);
      if (m.current)
        for (let U = 0; U < L; U++) {
          if (U >= y.current && U < Z) continue;
          const K = R.getBounds(U, -1);
          K == null || K.width <= 0 || B.push({
            col: U,
            row: -1,
            header: !0,
            left: Math.round(K.x - D.left),
            top: Math.round(K.y - D.top),
            width: Math.round(K.width),
            height: Math.round(K.height)
          });
        }
      for (let U = N; U < J; U++)
        for (let K = 0; K < L; K++) {
          if (K >= y.current && K < Z) continue;
          const V = R.getBounds(K, U);
          V != null && (V.y + V.height < D.top || V.y > D.bottom || u > 0 && V.y + V.height > D.bottom - u || V.x + V.width < D.left || V.x > D.right || B.push({
            col: K,
            row: U,
            left: Math.round(V.x - D.left),
            top: Math.round(V.y - D.top),
            width: Math.round(V.width),
            height: Math.round(V.height)
          }));
        }
    }
    P((Z) => {
      if (Z.length !== B.length) return B;
      for (let L = 0; L < B.length; L++) {
        const N = Z[L], J = B[L];
        if (N.col !== J.col || N.row !== J.row || N.left !== J.left || N.top !== J.top || N.width !== J.width || N.height !== J.height) return B;
      }
      return Z;
    });
  }, []), z = w.useCallback(() => {
    const R = T.current, S = A.current, D = v.current;
    if (R == null || S == null || D == null) return;
    const $ = S.getBoundingClientRect();
    for (const B of D.children) {
      const Z = B.getAttribute("data-glide-dom-cell"), L = B.getAttribute("data-glide-dom-header");
      let N = -1, J = -1;
      if (Z != null) {
        const K = Z.split(":");
        N = Number(K[0]), J = Number(K[1]);
      } else if (L != null)
        N = Number(L);
      else
        continue;
      const U = R.getBounds(N, J);
      U != null && (B.style.left = Math.round(U.x - $.left) + "px", B.style.top = Math.round(U.y - $.top) + "px");
    }
  }, []);
  w.useLayoutEffect(() => {
    k(), z();
  }), w.useEffect(() => {
    const R = A.current;
    if (R == null) return;
    const S = typeof ResizeObserver < "u" ? new ResizeObserver(() => k()) : null;
    S != null && S.observe(R);
    const D = () => {
      z(), requestAnimationFrame(() => {
        z(), k();
      });
    };
    return window.addEventListener("scroll", D, !0), () => {
      S != null && S.disconnect(), window.removeEventListener("scroll", D, !0), g.current != null && (clearTimeout(g.current), g.current = null);
    };
  }, [k]);
  const C = w.useCallback((R, S) => {
    var J, U;
    s == null || s(R, S);
    const [D, $] = R, B = (J = v.current) == null ? void 0 : J.querySelector('[data-glide-dom-cell="' + D + ":" + $ + '"]');
    if (B == null) return;
    const Z = B.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (Z.length !== 1) return;
    const L = Z[0], N = L.tagName === "BUTTON" || L.getAttribute("role") === "button";
    typeof L.click == "function" && L.click(), N ? (U = T.current) == null || U.focus() : typeof L.focus == "function" && L.focus();
  }, [s]), x = w.useCallback((R, S, D, $) => {
    const B = p.current;
    if (p.current = { range: R, tx: S, ty: D }, M.current = R, B != null && h != null && Math.abs(D - B.ty - (R.y - B.range.y) * h) > 4) {
      const L = v.current;
      L != null && (L.setAttribute("data-glide-scrolling", "true"), g.current != null && clearTimeout(g.current), g.current = setTimeout(() => {
        g.current = null, L.removeAttribute("data-glide-scrolling"), z();
      }, 90));
    }
    z(), requestAnimationFrame(() => {
      z(), k();
    }), o == null || o(R, S, D, $);
  }, [k, z, o, h]);
  return w.createElement(
    "div",
    { ref: A, style: { position: "relative", width: "100%" }, "data-glide-dom-wrap": "" },
    w.createElement(K_, Object.assign({}, d, { ref: T, gridSelection: l, freezeColumns: c, onVisibleRegionChanged: x, onCellActivated: C })),
    w.createElement(
      "div",
      { ref: v, style: { position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }, "data-glide-dom-layer": "" },
      O.map((R) => {
        var B, Z;
        if (R.header) {
          const L = i == null ? void 0 : i(R.col);
          return L == null || L === !1 ? null : w.createElement(
            "div",
            {
              key: "h:" + R.col,
              className: "group" + (a ? " " + a : ""),
              "data-glide-dom-header": String(R.col),
              "data-glide-header-focused": b(R.col) ? "true" : void 0,
              "data-glide-header-selected": ((Z = (B = l == null ? void 0 : l.columns) == null ? void 0 : B.hasIndex) == null ? void 0 : Z.call(B, R.col)) === !0 ? "true" : void 0,
              style: {
                position: "absolute",
                left: R.left,
                top: R.top,
                width: R.width,
                height: R.height,
                boxSizing: "border-box",
                /* Click-through: the canvas header keeps its
                   own click/selection/resize; only the node's
                   own pointer-events:auto children (a sort
                   affordance) capture. */
                pointerEvents: "none"
              }
            },
            L
          );
        }
        const S = r == null ? void 0 : r(R.col, R.row);
        if (S == null || S === !1) return null;
        const D = typeof S == "object" && !w.isValidElement(S) && "node" in S ? S : null, $ = D != null ? D.node : S;
        return $ == null || $ === !1 ? null : w.createElement(
          "div",
          {
            key: R.col + ":" + R.row,
            /* `group` lets a host control react to the focused cell
               with Tailwind's group-data-[glide-dom-focused=true]:… */
            className: "group" + (a ? " " + a : ""),
            ref: (L) => {
              if (L == null) return;
              const N = L.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
              );
              !(L.getAttribute("data-glide-dom-passthrough") === "true") && N.length === 1 && N[0].tagName === "BUTTON" ? L.setAttribute("data-glide-dom-button", "true") : L.removeAttribute("data-glide-dom-button");
            },
            "data-glide-dom-cell": R.col + ":" + R.row,
            /* The grid's selection rectangle is on this cell: paint
               the same hover wash the canvas rows use, so the DOM
               cell reads as hovered. */
            "data-glide-dom-focused": f != null && f[0] === R.col && f[1] === R.row ? "true" : void 0,
            "data-glide-dom-passthrough": D != null && D.passthrough === !0 ? "true" : void 0,
            style: {
              position: "absolute",
              left: R.left,
              top: R.top,
              width: R.width,
              height: R.height,
              /* Glide's cell padding (4px vertical, 8px
                 horizontal is the theme default; the drawn kit
                 faces use 4px all round) so host controls line
                 up with painted cells. */
              /* `bleed` = the control IS the cell (edge-to-edge hit
                 target); otherwise the cell's 4px inset + vertical
                 centring apply. */
              padding: D != null && D.bleed === !0 ? 0 : 4,
              boxSizing: "border-box",
              pointerEvents: D != null && D.passthrough === !0 ? "none" : "auto",
              display: D != null && D.bleed === !0 ? "block" : "flex",
              alignItems: "center",
              /* The cell is a CONTAINER: the host arranges its own
                 buttons/fields inside (and may overflow the box
                 for a morph that expands). */
              overflow: "visible"
            }
          },
          $
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
  const n = wr(), r = (n == null ? void 0 : n.mode) ?? "light";
  return dn(() => {
    const i = Y_((n == null ? void 0 : n.accent) ?? "zinc");
    return {
      theme: X_({ fontSize: t, mode: r, accent: i, overrides: e }),
      cellColors: G_(r),
      mode: r
    };
  }, [r, n == null ? void 0 : n.accent, t]);
}
function Q1(t, e = {}) {
  return {
    kind: He.Text,
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
  return Q1(t, {
    ...e,
    selectionRange: t.length > 0 ? [0, t.length] : void 0
  });
}
function C3(t, e, n) {
  const r = n.trim();
  return r === "" ? !t : r === (t || e).trim();
}
function R3(t, e = {}) {
  return Q1(t, { ...e, allowOverlay: !1, readonly: !0, cursor: e.cursor ?? "default" });
}
function J_(t = {}) {
  return {
    kind: He.Text,
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
function $y(t, e) {
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
    const o = $y(t.rows, e);
    return o.length === 0 ? null : { x: 0, y: o[0], width: n, height: o[o.length - 1] - o[0] + 1 };
  }
  if (t.columns.length > 0) {
    const o = $y(t.columns, n);
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
      const { value: c, onChange: u, onFinishedEditing: d, isHighlighted: f, validatedSelection: h, initialValue: p } = l, g = s.current, { cfg: m, align: y, activation: b, selectAllOnOpen: T, portal: A } = g, v = Q(c), M = Q(!1), O = Q(null), P = (R) => {
        const S = { kind: He.Text, data: R, displayData: R, allowOverlay: !0 };
        v.current = S, u(S);
      }, k = () => d(v.current), z = () => d(v.current, [1, 0]), C = () => d(void 0, [0, 0]);
      if (Ge(() => {
        if (b < 0) return;
        const R = O.current;
        R && (R.focus(), T ? R.select() : R.setSelectionRange(R.value.length, R.value.length));
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
            onChange: (R) => P(R.target.value)
          }
        );
      if (m.kind === "text") {
        const R = (S) => P(m.uppercase ? S.toUpperCase() : S);
        return /* @__PURE__ */ _(
          "input",
          {
            ref: O,
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
            onChange: (S) => R(S.target.value),
            onKeyDown: (S) => {
              if (S.key === "Enter" && !S.shiftKey) {
                S.preventDefault(), S.stopPropagation();
                const D = v.current;
                window.setTimeout(() => d(D), 0);
              }
            }
          }
        );
      }
      const x = m.seedValue ?? (c == null ? void 0 : c.data) ?? "", I = (R) => {
        M.current = !0, P(R[0] ?? "");
      };
      return /* @__PURE__ */ _("div", { style: { width: "100%", height: "100%" }, onKeyDown: (R) => R.stopPropagation(), children: /* @__PURE__ */ _(
        Q2,
        {
          appearance: "inline",
          mode: "single",
          values: x ? [x] : [],
          items: m.items,
          groups: m.groups,
          resolveBy: m.resolveBy ?? "id",
          onChange: I,
          onExit: () => {
            M.current ? k() : C();
          },
          onTabExit: () => z(),
          onEscape: () => {
            M.current = !1, C();
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
    if (!p || o.kind !== He.Text || o.readonly === !0) return;
    const [g, m] = p, y = l[g - h];
    if (!y) return;
    const b = y.key;
    let T = d ? d(m, b) : u == null ? void 0 : u[b];
    (T == null ? void 0 : T.kind) === "text" && T.align === void 0 && y.align && (T = { ...T, align: y.align });
    const A = !T && (y.align === "center" || y.align === "right");
    if (!T && !A) return;
    const M = String(c(m, b) ?? "") === (o.data ?? ""), { Editor: O, box: P } = i(b);
    return P.current = {
      cfg: T ?? null,
      align: y.align,
      activation: ++r,
      selectAllOnOpen: M,
      portal: f.current
    }, !T || T.kind === "text" ? { editor: O } : { editor: O, disablePadding: !0, styleOverride: { overflow: "visible" } };
  };
}
function sP() {
  const t = Ls(), e = Q(!1);
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
    kind: He.Custom,
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
    kind: He.Custom,
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
function ew(t) {
  const e = t.bgCell.replace("#", "");
  if (e.length !== 6) return t.textDark === "#ffffff";
  const n = parseInt(e, 16);
  return (0.2126 * (n >> 16 & 255) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255)) / 255 < 0.5;
}
function tw(t, e, n, r, i, o) {
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
  const i = ew(n), o = r.variant ?? "subtle", a = Math.max(14, e.height - 4 * 2), l = e.y + (e.height - a) / 2, c = e.x + 4, u = e.width - 8;
  if (u <= 0) return;
  let d = null, f = null, h = n.textDark;
  o === "primary" ? (d = n.accentColor, h = n.accentFg) : o === "outline" ? f = n.borderColor : o === "danger" ? (h = i ? "#fca5a5" : "#b91c1c", f = i ? "rgba(248, 113, 113, 0.4)" : "rgba(220, 38, 38, 0.35)") : d = n.bgBubble, t.save(), t.globalAlpha = r.disabled ? 0.45 : 1, tw(t, c, l, u, a, 6), d && (t.fillStyle = d, t.fill()), r.hoverAmount > 0 && !r.disabled && (t.fillStyle = o === "primary" ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.06)", t.globalAlpha *= Math.min(1, r.hoverAmount), t.fill()), r.highlighted && !r.disabled && (t.strokeStyle = n.accentColor, t.globalAlpha = 0.55, t.lineWidth = 1.5, t.stroke(), t.globalAlpha = 1), f && (t.strokeStyle = f, t.lineWidth = 1, t.stroke());
  const p = Math.max(10, Math.min(12, a - 8));
  t.font = `600 ${p}px ${n.fontFamily}`, t.textBaseline = "middle";
  const g = Math.min(14, a - 6), m = 5, b = t.measureText(r.label).width + (r.icon ? g + m : 0);
  let T = c + Math.max(6, (u - b) / 2);
  const A = l + a / 2;
  r.icon && (cP(t, r.icon, T, A - g / 2, g, h), T += g + m), t.fillStyle = h, t.textAlign = "left", t.fillText(r.label, T, A), t.restore();
}
const dP = ({ value: t, onFinishedEditing: e }) => {
  const n = t == null ? void 0 : t.data, r = wr(), [i, o] = Ye((n == null ? void 0 : n.value) ?? "");
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
  return /* @__PURE__ */ _("div", { style: { width: "100%", height: "100%", display: "flex", alignItems: "center" }, children: n.mode === "search" ? /* @__PURE__ */ _(Pv, { ...a, onSubmit: (l) => s(l), expandedWidth: 260 }) : /* @__PURE__ */ _(B2, { ...a, variant: n.variant === "danger" ? "outline" : n.variant ?? "primary", triggerIcon: void 0, clearOnSubmit: !1, onSubmit: (l) => s(l) }) });
};
function fP(t, e) {
  return {
    kind: He.Custom,
    isMatch: (n) => {
      var r;
      return ((r = n.data) == null ? void 0 : r.kind) === t;
    },
    draw: e,
    needsHover: !0
  };
}
const hP = {
  kind: He.Custom,
  isMatch: (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.kind) === "kit-badge";
  },
  draw: ({ ctx: t, rect: e, theme: n }, r) => {
    const i = r.data.tone ?? "neutral", o = ew(n) ? lP[i] : aP[i], s = Math.max(10, Math.min(11, e.height - 10));
    t.save(), t.font = `600 ${s}px ${n.fontFamily}`;
    const a = t.measureText(r.data.label).width, c = Math.min(e.width - 8, a + 7 * 2), u = Math.min(e.height - 8, s + 8), d = e.x + (e.width - c) / 2, f = e.y + (e.height - u) / 2;
    tw(t, d, f, c, u, u / 2), t.fillStyle = o.bg, t.fill(), t.fillStyle = o.fg, t.textAlign = "center", t.textBaseline = "middle", t.fillText(r.data.label, e.x + e.width / 2, f + u / 2), t.restore();
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
], Fy = gP, mP = 28, yP = 30, cf = {
  columns: tn.empty(),
  rows: tn.empty()
}, uf = /* @__PURE__ */ new Map();
let nw = "";
async function Hy(t) {
  nw = t;
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
  return nw;
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
  const t = Q(null), [e, n] = Ye(0);
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
  headerCells: M,
  overscrollY: O,
  apiRef: P,
  height: k,
  scrollable: z,
  freezeColumns: C = 0,
  rowMarkers: x,
  onAddRow: I,
  addRowHint: R,
  addRowSticky: S = !1,
  smoothScroll: D
}) => {
  var Ke;
  const $ = Q(e);
  $.current = e;
  const B = Q(!!o);
  B.current = !!o;
  const Z = wr(), { theme: L, cellColors: N } = V_(c, b), J = (Z == null ? void 0 : Z.mode) ?? "light", U = a, K = l, { ref: V, width: q } = wP(), G = dn(() => {
    if (z) return t.map((oe) => ({ ...oe, width: Math.max(40, Math.round(oe.width)) }));
    const ue = t.reduce((oe, he) => oe + he.width, 0);
    if (!q || q <= 0 || ue <= 0) return t;
    const ke = Math.max(120, Math.floor(q) - 1), se = Math.min(1, t.length - 1), F = t.map((oe) => Math.max(40, Math.floor(oe.width / ue * ke)));
    if (se >= 0) {
      const oe = F.reduce((he, Pe) => he + Pe, 0);
      F[se] = Math.max(40, F[se] + (ke - oe));
    }
    return t.map((oe, he) => ({ ...oe, width: F[he] }));
  }, [t, q, z]), ne = dn(
    () => G.map((ue) => ({
      title: ue.label.toUpperCase(),
      width: ue.width,
      ...ue.trailingRowOptions ? { trailingRowOptions: ue.trailingRowOptions } : {}
    })),
    [G]
  ), te = K + Math.max(e.length + (I ? 1 : 0), 1) * U, Y = k ?? te;
  Ge(() => {
    if (!ot.current) return;
    const ue = [];
    for (let se = 0; se < e.length; se++)
      for (let F = 0; F < G.length; F++) ue.push({ cell: [F, se] });
    const ke = setTimeout(() => {
      var se;
      return (se = ot.current) == null ? void 0 : se.updateCells(ue);
    }, 0);
    return () => clearTimeout(ke);
  }, [e, G]);
  const ce = oo(), fe = Ls(), Ee = Q(null), Ce = Q(null);
  Ge(() => {
    var he;
    const ue = fe ?? (typeof document < "u" ? document : null);
    if (!ue) return;
    const ke = !!((he = Ee.current) != null && he.closest('[role="dialog"]')), se = ue.createElement("div");
    se.setAttribute("data-glide-overlay-layer", ""), se.style.cssText = ke ? "position:fixed;left:0;top:0;z-index:10001;pointer-events:auto;width:0;height:0" : "position:fixed;left:0;top:0;z-index:9999;width:0;height:0";
    const F = (Pe) => Pe.stopPropagation();
    let oe = null;
    return ke && (se.addEventListener("focusin", F), se.addEventListener("focusout", F), oe = (Pe) => {
      const nt = Pe.relatedTarget;
      nt && se.contains(nt) && Pe.stopPropagation();
    }, ue.addEventListener("focusout", oe, !0)), ue.body.appendChild(se), Ce.current = se, () => {
      oe && ue.removeEventListener("focusout", oe, !0), se.remove(), Ce.current = null;
    };
  }, [ce, fe]);
  const Be = Q(null);
  Be.current = {
    readOnlyRef: B,
    columns: G,
    getValue: (ue, ke) => {
      var se;
      return String(((se = $.current[ue]) == null ? void 0 : se[ke]) ?? "");
    },
    editors: h,
    getEditor: p,
    portalRef: Ce,
    // `provideEditor` receives Glide's RAW column index; the row-marker gutter
    // is column 0 when it exists (roadmap: the classic Glide offset trap).
    columnOffset: x ? 1 : 0
  };
  const it = dn(() => oP(() => Be.current), []), mt = sP(), ot = Q(null), [re, _e] = Ye(() => (y ? uf.get(y) : void 0) ?? cf);
  Ge(() => {
    _e(y ? uf.get(y) ?? cf : cf);
  }, [y]);
  const Ie = Q(re);
  Ie.current = re;
  const [$e, De] = Ye(null), Oe = Q(null), Xe = dn(() => {
    const ue = /* @__PURE__ */ new Map();
    for (const ke of v ?? []) {
      const se = G.findIndex((F) => F.key === ke.colKey);
      se >= 0 && ue.set(`${se}:${ke.row}`, { node: ke.node, passthrough: ke.passthrough, bleed: ke.bleed });
    }
    return ue;
  }, [v, G]);
  Ge(() => {
    if (P)
      return P.current = {
        openCellEditor: (ue, ke) => {
          var F;
          const se = G.findIndex((oe) => oe.key === ke);
          se >= 0 && ((F = ot.current) == null || F.openCellEditor(se, ue));
        }
      }, () => {
        P.current = null;
      };
  }, [P, G]);
  const pt = ze(
    (ue, ke) => Xe.get(`${ue}:${ke}`) ?? null,
    [Xe]
  ), Se = dn(() => {
    const ue = /* @__PURE__ */ new Map();
    for (const [ke, se] of Object.entries(M ?? {})) {
      const F = G.findIndex((oe) => oe.key === ke);
      F >= 0 && ue.set(F, se);
    }
    return ue;
  }, [M, G]), Ze = ze(
    (ue) => Se.get(ue) ?? null,
    [Se]
  ), Ct = ze((ue) => {
    var he;
    const ke = ue == null ? void 0 : ue.location, se = (ue == null ? void 0 : ue.kind) === "cell" && ke && ke[1] >= 0 && ke[1] < $.current.length ? ke[1] : null;
    if (se === Oe.current) return;
    const F = Oe.current;
    Oe.current = se;
    const oe = [];
    if (F != null) for (let Pe = 0; Pe < G.length; Pe++) oe.push({ cell: [Pe, F] });
    if (se != null) for (let Pe = 0; Pe < G.length; Pe++) oe.push({ cell: [Pe, se] });
    oe.length && ((he = ot.current) == null || he.updateCells(oe));
  }, [G.length]), ft = ze(([ue, ke]) => {
    const se = G[ue], F = $.current[ke];
    if (!se || !F) return J_({ readonly: !0 });
    const oe = ke === Oe.current, he = n(se, F, ke);
    if (B.current) return { ...he, readonly: !0, allowOverlay: !1 };
    if (he.kind === He.Custom) return he;
    const Pe = !!he.readonly, nt = he.themeOverride ?? {};
    if (!Pe) {
      const It = oe ? N.editableHoverBg : N.editableBg;
      return { ...he, themeOverride: { ...nt, bgCell: It, bgCellMedium: It } };
    }
    return oe ? { ...he, themeOverride: { ...nt, bgCell: N.readonlyHoverBg, bgCellMedium: N.readonlyHoverBg } } : he;
  }, [G, n, N]), Qe = ze((ue, ke) => {
    ke();
    const { ctx: se, rect: F, column: oe, columnIndex: he, theme: Pe } = ue, nt = G[he];
    if (!nt) return;
    const It = (nt.align ?? "left") === "center", lt = Se.has(he);
    if (!It && !u && !lt) return;
    const gt = lt ? 18 : 0;
    se.save(), se.fillStyle = Pe.bgHeader, se.fillRect(F.x + 1, F.y, F.width - 2, F.height), ue.hasSelectedCell && (se.fillStyle = Pe.bgHeaderHasFocus, se.fillRect(F.x + 1, F.y, F.width - 2, F.height)), ue.hoverAmount > 0 && (se.globalAlpha = ue.hoverAmount, se.fillStyle = Pe.bgHeaderHovered, se.fillRect(F.x + 1, F.y, F.width - 2, F.height), se.globalAlpha = 1), ue.isSelected && (se.fillStyle = Pe.accentColor, se.fillRect(F.x + 1, F.y, F.width - 2, F.height)), se.fillStyle = ue.isSelected ? Pe.textHeaderSelected : Pe.textHeader, se.textAlign = It ? "center" : "left", se.textBaseline = "middle", se.beginPath(), se.rect(F.x, F.y, F.width - gt, F.height), se.clip();
    const kt = It ? F.x + (F.width - gt) / 2 : F.x + 6, vt = String(oe.title);
    if (!u)
      se.fillText(vt, kt, F.y + F.height / 2);
    else {
      const Ut = [];
      let An = "";
      const zt = F.width - 8 - gt;
      for (const Pn of vt.split(/\s+/)) {
        const Ht = An ? `${An} ${Pn}` : Pn;
        if (se.measureText(Ht).width <= zt) {
          An = Ht;
          continue;
        }
        An && (Ut.push(An), An = "");
        let mn = "";
        for (const Yn of Pn)
          mn && se.measureText(mn + Yn).width > zt ? (Ut.push(mn), mn = Yn) : mn += Yn;
        An = mn;
      }
      An && Ut.push(An);
      const cn = Math.min(14, F.height / Math.max(1, Ut.length)), _n = F.y + F.height / 2 - (Ut.length - 1) * cn / 2;
      Ut.forEach((Pn, Ht) => se.fillText(Pn, kt, _n + Ht * cn));
    }
    se.restore();
  }, [G, u, Se]), Rt = ze((ue, ke) => {
    m == null || m(ue, ke);
  }, [m]), Ve = ze((ue) => {
    if (B.current) return;
    const ke = [];
    for (const se of ue)
      i.has(se.colKey) && $.current[se.row] && ke.push({ row: se.row, colKey: se.colKey, value: se.val });
    ke.length > 0 && r(ke);
  }, [i, r]), tt = ze(
    () => eP(Ie.current, e.length, G.length),
    [e.length, G.length]
  ), Pt = ze((ue) => {
    if (B.current) return !1;
    if (ue.length === 1 && ue[0].value.kind === He.Text) {
      const ke = tt();
      if (ke && ke.width * ke.height > 1) {
        const se = tP(ke, G, ue[0].value.data);
        if (se.length > 1)
          return Ve(se), !0;
      }
    }
    return Ve(ue.map((ke) => {
      var se;
      return {
        row: ke.location[1],
        colKey: ((se = G[ke.location[0]]) == null ? void 0 : se.key) ?? "",
        val: ke.value.kind === He.Text ? ke.value.data : ke.value.kind === He.Boolean ? String(ke.value.data) : ""
      };
    })), !0;
  }, [G, Ve, tt]), Lt = ze((ue, ke) => {
    var F, oe;
    if (B.current) return !1;
    const se = nP(
      [ue[0], ue[1]],
      ke,
      $.current.length,
      G,
      (oe = (F = Ie.current) == null ? void 0 : F.current) == null ? void 0 : oe.range
    );
    return Ve(se), !1;
  }, [G, Ve]), Qt = ze(async () => {
    const ue = tt();
    if (!ue) return;
    const ke = Z_(e, G, ue);
    ke.length > 0 && await Hy(ke), De(null);
  }, [e, G, tt]), yt = ze(async () => {
    if (B.current) {
      De(null);
      return;
    }
    const ue = tt();
    if (!ue) return;
    const { text: ke, committers: se } = Q_(e, G, ue);
    ke.length > 0 && (await Hy(ke), Ve(se.map((F) => ({ ...F, val: "" })))), De(null);
  }, [e, G, Ve, tt]), Ft = ze(() => {
    if (B.current) {
      De(null);
      return;
    }
    const ue = tt();
    ue && (Ve(rP(ue, G, i)), De(null));
  }, [G, i, Ve, tt]), Ot = ze(() => {
    var se;
    const ue = Ie.current;
    let ke = (se = ue.current) == null ? void 0 : se.cell;
    if (!ke && ue.rows.length > 0) {
      for (let F = 0; F < $.current.length; F++)
        if (ue.rows.hasIndex(F)) {
          ke = [0, F];
          break;
        }
    }
    return ke ?? null;
  }, []), hn = ze((ue) => {
    if (B.current) return;
    const ke = Ot();
    ke && Lt(ke, iP(ue));
  }, [Ot, Lt]), rn = ze(async () => {
    const ue = await bP();
    ue && hn(ue), De(null);
  }, [hn]);
  vP(ze((ue) => {
    A || hn(ue);
  }, [A, hn]));
  const bt = Q({ copy: () => {
  }, cut: () => {
  }, paste: () => {
  } });
  bt.current = { copy: Qt, cut: yt, paste: rn }, Ge(() => {
    if (A) return;
    const ue = fe ?? (typeof document < "u" ? document : null);
    if (!ue) return;
    const ke = (F) => F instanceof HTMLElement ? F.tagName === "INPUT" || F.tagName === "TEXTAREA" || F.isContentEditable : !1, se = (F) => {
      if (!(F.metaKey || F.ctrlKey) || F.shiftKey || F.altKey) return;
      const oe = F.key.toLowerCase();
      if (oe !== "c" && oe !== "x" && oe !== "v" || ke(F.target)) return;
      F.preventDefault(), F.stopPropagation();
      const he = bt.current;
      oe === "c" ? he.copy() : oe === "x" ? he.cut() : he.paste();
    };
    return ue.addEventListener("keydown", se, !0), () => ue.removeEventListener("keydown", se, !0);
  }, [fe, A]);
  const Sn = ze((ue, ke) => {
    var oe, he;
    ke.preventDefault();
    const [se, F] = ue;
    F < 0 || F >= $.current.length || De({
      x: (((oe = ke.bounds) == null ? void 0 : oe.x) ?? 0) + (ke.localEventX ?? 0),
      y: (((he = ke.bounds) == null ? void 0 : he.y) ?? 0) + (ke.localEventY ?? 0),
      row: F,
      col: se
    });
  }, []), me = ((Ke = re.current) == null ? void 0 : Ke.range) !== void 0 || re.rows.length > 0 || re.columns.length > 0, xe = ze((ue) => {
    _e(ue), y && uf.set(y, ue);
  }, [y]), qe = dn(
    () => g ? [...Fy, ...g] : Fy,
    [g]
  );
  return /* @__PURE__ */ ge(
    "div",
    {
      ref: Ee,
      className: `relative ${f}`,
      ...d ? { [d]: "" } : {},
      "data-glide-sheet": J,
      style: {
        "--glide-dom-hover-bg": N.readonlyHoverBg,
        "--glide-dom-accent": L.accentColor,
        // The header face, for real DOM header controls (they cover the canvas).
        "--glide-header-bg": L.bgHeader,
        "--glide-header-fg": L.textHeader,
        "--glide-header-fg-selected": L.textHeaderSelected,
        "--glide-header-hover-bg": L.bgHeaderHovered,
        "--glide-header-focus-bg": L.bgHeaderHasFocus
      },
      onPointerLeave: () => {
        var se;
        const ue = Oe.current;
        if (ue == null) return;
        Oe.current = null;
        const ke = [];
        for (let F = 0; F < G.length; F++) ke.push({ cell: [F, ue] });
        (se = ot.current) == null || se.updateCells(ke);
      },
      children: [
        /* @__PURE__ */ _("div", { ref: V, style: { touchAction: "none" }, children: e.length === 0 && s && !I ? /* @__PURE__ */ _("div", { className: "px-2.5 py-6 text-center text-xs text-[color:var(--ui-text-faint)]", children: s }) : q > 0 ? /* @__PURE__ */ _(
          U_,
          {
            ref: ot,
            getDomCell: v && v.length > 0 ? pt : void 0,
            getDomHeaderCell: M && Object.keys(M).length > 0 ? Ze : void 0,
            domCellBottomInset: I && S ? U : 0,
            width: Math.max(120, Math.floor(q) - 1),
            height: Y,
            columns: ne,
            rows: e.length,
            getCellContent: ft,
            onCellsEdited: Pt,
            onPaste: Lt,
            provideEditor: it,
            ...mt,
            getCellsForSelection: !0,
            gridSelection: re,
            onGridSelectionChange: xe,
            theme: L,
            rowHeight: U,
            headerHeight: K,
            drawHeader: Qe,
            onCellClicked: Rt,
            onItemHovered: Ct,
            onCellContextMenu: Sn,
            customRenderers: qe,
            editOnType: !0,
            rangeSelect: "rect",
            cellActivationBehavior: "double-click",
            fillHandle: T && !o,
            portalElementRef: Ce,
            minColumnWidth: 1,
            maxColumnWidth: 1e4,
            overscrollY: O,
            freezeColumns: C,
            smoothScrollX: D,
            smoothScrollY: D,
            ...x ? { rowMarkers: x } : {},
            ...I ? {
              trailingRowOptions: { hint: R ?? "Add row", sticky: S },
              onRowAppended: () => {
                I();
              }
            } : {}
          }
        ) : /* @__PURE__ */ _("div", { style: { height: te } }) }),
        /* @__PURE__ */ ge(
          Gx,
          {
            open: !!$e,
            x: ($e == null ? void 0 : $e.x) ?? 0,
            y: ($e == null ? void 0 : $e.y) ?? 0,
            onClose: () => De(null),
            theme: J,
            children: [
              /* @__PURE__ */ _(aa, { onClick: () => void Qt(), icon: /* @__PURE__ */ _(Yw, { className: "w-3.5 h-3.5" }), disabled: !me, children: "Copy" }),
              /* @__PURE__ */ _(aa, { onClick: () => void rn(), icon: /* @__PURE__ */ _(Xw, { className: "w-3.5 h-3.5" }), disabled: o || A, children: "Paste" }),
              /* @__PURE__ */ _(aa, { onClick: Ft, icon: /* @__PURE__ */ _(za, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !me || o, children: "Clear" }),
              /* @__PURE__ */ _(Yx, {}),
              /* @__PURE__ */ _(aa, { onClick: () => void yt(), icon: /* @__PURE__ */ _(Vw, { className: "w-3.5 h-3.5 text-[color:var(--ui-text-faint)]" }), disabled: !me || o, children: "Cut" })
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
  wx as A,
  dr as B,
  RA as C,
  eb as D,
  YP as E,
  D2 as F,
  M3 as G,
  Pi as H,
  zn as I,
  Of as J,
  Fy as K,
  e3 as L,
  Nf as M,
  Hs as N,
  pb as O,
  Vx as P,
  VP as Q,
  ca as R,
  B2 as S,
  AE as T,
  Pv as U,
  lb as V,
  x3 as W,
  xP as X,
  Q2 as Y,
  vx as Z,
  v3 as _,
  _o as a,
  Tx as a$,
  P2 as a0,
  $2 as a1,
  K2 as a2,
  h3 as a3,
  f3 as a4,
  Fa as a5,
  ab as a6,
  ub as a7,
  m3 as a8,
  Wf as a9,
  rh as aA,
  Cx as aB,
  Me as aC,
  Px as aD,
  oP as aE,
  X_ as aF,
  eP as aG,
  b3 as aH,
  tP as aI,
  $p as aJ,
  Yy as aK,
  cl as aL,
  WP as aM,
  qP as aN,
  G_ as aO,
  sp as aP,
  V2 as aQ,
  Ha as aR,
  ok as aS,
  C3 as aT,
  df as aU,
  T3 as aV,
  gP as aW,
  E3 as aX,
  G2 as aY,
  W2 as aZ,
  ib as a_,
  GP as aa,
  mk as ab,
  ua as ac,
  yk as ad,
  xb as ae,
  bk as af,
  d3 as ag,
  wk as ah,
  a3 as ai,
  vk as aj,
  l3 as ak,
  u3 as al,
  c3 as am,
  cb as an,
  KP as ao,
  UP as ap,
  C2 as aq,
  S2 as ar,
  da as as,
  Co as at,
  zf as au,
  J_ as av,
  Z_ as aw,
  Q_ as ax,
  j2 as ay,
  Mx as az,
  OR as b,
  Zy as b0,
  Av as b1,
  Mr as b2,
  jl as b3,
  iP as b4,
  q2 as b5,
  X2 as b6,
  I3 as b7,
  Zi as b8,
  Nv as b9,
  yn as bA,
  _i as bB,
  Ls as bC,
  $s as bD,
  JP as bE,
  tb as bF,
  db as bG,
  sP as bH,
  V_ as bI,
  jP as bJ,
  vb as bK,
  qf as bL,
  wr as bM,
  xx as bN,
  QP as bO,
  jf as bP,
  qx as bQ,
  ll as bR,
  Df as bS,
  oo as bT,
  ob as bU,
  sb as bV,
  Dx as bW,
  gk as bX,
  t3 as bY,
  U2 as ba,
  rP as bb,
  nP as bc,
  Sx as bd,
  kx as be,
  Op as bf,
  Y_ as bg,
  oh as bh,
  Y2 as bi,
  hi as bj,
  Gi as bk,
  w2 as bl,
  F2 as bm,
  Dv as bn,
  S3 as bo,
  Ex as bp,
  HP as bq,
  op as br,
  R3 as bs,
  L2 as bt,
  y3 as bu,
  x2 as bv,
  Q1 as bw,
  _x as bx,
  J2 as by,
  BP as bz,
  k3 as c,
  Ff as d,
  Nx as e,
  i3 as f,
  g3 as g,
  p3 as h,
  To as i,
  Gx as j,
  Yx as k,
  aa as l,
  IE as m,
  XP as n,
  r3 as o,
  ZP as p,
  Kx as q,
  dl as r,
  xr as s,
  Ux as t,
  Hf as u,
  s3 as v,
  n3 as w,
  O2 as x,
  w3 as y,
  He as z
};
