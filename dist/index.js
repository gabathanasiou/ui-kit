"use client";
import { jsx as h, jsxs as I, Fragment as ct } from "react/jsx-runtime";
import lt, { createContext as Ut, useContext as Gt, useState as te, useEffect as se, useRef as w, useCallback as ie, useLayoutEffect as ot, useMemo as rt, useId as Yl, useImperativeHandle as Uo } from "react";
import * as De from "@radix-ui/react-dropdown-menu";
import { Minus as Ul, Check as ar, Search as Pn, X as Tn, Pencil as Gl, CopyPlus as Go, Trash2 as yi, RotateCcw as Xo, Plus as Ur, ChevronRight as Or, ChevronLeft as Qo, ArrowUp as Xl, ArrowDown as Ql, ChevronDown as mn, Underline as Zl, Strikethrough as ec, RemoveFormatting as tc, Link as nc, ChevronUp as rc, Anchor as ic } from "lucide-react";
import { computePosition as oc, offset as Zo, flip as es, shift as ts, size as sc, useFloating as lc, autoUpdate as cc } from "@floating-ui/react-dom";
import * as fn from "@radix-ui/react-dialog";
import { createPortal as Gr } from "react-dom";
import { mergeAttributes as ac, ReactNodeViewRenderer as uc, NodeViewWrapper as dc, useEditor as fc, EditorContent as hc } from "@tiptap/react";
import { PluginKey as Kt, Plugin as cn, Selection as Bn, TextSelection as Rt, NodeSelection as _n, EditorState as pc, AllSelection as mc } from "@tiptap/pm/state";
import { DecorationSet as xr, Decoration as gc } from "@tiptap/pm/view";
import yc from "@tiptap/starter-kit";
import xc from "@tiptap/extension-placeholder";
import { TextStyle as bc, FontFamily as vc, FontSize as wc } from "@tiptap/extension-text-style";
import kc from "@tiptap/extension-color";
import Sc from "@tiptap/extension-link";
import Nc from "@tiptap/extension-underline";
import Cc from "@tiptap/suggestion";
import { Mention as Tc } from "@tiptap/extension-mention";
import { createRoot as Mc } from "react-dom/client";
const Ec = Ut(null);
function Ii() {
  return Gt(Ec);
}
function Kn() {
  const n = Ii();
  return n ? n.document.body : null;
}
function Ri() {
  const n = Ii();
  return n ? n.document : typeof document < "u" ? document : null;
}
function ur() {
  return Ii() ?? (typeof window < "u" ? window : null);
}
const dr = typeof window < "u", We = dr && window.matchMedia("(pointer: coarse)").matches, Ic = dr && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Xr = 0.5;
const tr = /* @__PURE__ */ new Set();
function Mh(n) {
  Xr = Math.max(0, Math.min(1, n)), tr.forEach((e) => e());
}
function ns() {
  return Xr;
}
function Eh() {
  const [, n] = te(0);
  return se(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), We && Xr > 0;
}
function Be() {
  const [, n] = te(0);
  return se(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), Xr;
}
function B(n, e, t) {
  return We ? Math.round(n + (e - n) * t) : n;
}
function gn(n, e) {
  const t = Be();
  return We && t > 0 ? {
    padding: `${B(n.py, e.py, t)}px ${B(n.px, e.px, t)}px`,
    fontSize: `${B(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function rs() {
  const n = Be(), e = We && n > 0;
  return {
    box: e ? B(28, 36, n) : 20,
    icon: e ? B(16, 20, n) : 14
  };
}
function xi(n) {
  return n === "touch" || n === "pen";
}
let Ln = null;
const bi = /* @__PURE__ */ new Set();
dr && window.addEventListener("pointerdown", (n) => {
  Ln = n.pointerType, bi.forEach((e) => e());
}, !0);
function Ih() {
  return Ln;
}
function Rc() {
  const [, n] = te(0), e = w(Ln);
  return se(() => {
    const t = () => {
      e.current !== Ln && (e.current = Ln, n((r) => r + 1));
    };
    return bi.add(t), () => {
      bi.delete(t);
    };
  }, []), Ln;
}
const is = ["(any-hover: hover)", "(any-pointer: fine)"];
function ss() {
  return dr ? is.some((n) => window.matchMedia(n).matches) : !1;
}
let Pr = ss();
const vi = /* @__PURE__ */ new Set();
function co(n) {
  Pr !== n && (Pr = n, vi.forEach((e) => e()));
}
var Yo;
if (dr) {
  const n = () => co(ss());
  for (const s of is) {
    const l = window.matchMedia(s);
    (Yo = l.addEventListener) == null || Yo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || co(!0));
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
function Rh() {
  return Pr;
}
function Ah() {
  const [, n] = te(0);
  return se(() => {
    const e = () => n((t) => t + 1);
    return vi.add(e), () => {
      vi.delete(e);
    };
  }, []), Pr;
}
const xn = 220, Ai = "cubic-bezier(0.32, 0.72, 0, 1)", $i = 170, zi = 0.94;
function ai(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ls(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function cs(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return ls({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Ac(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${zi})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = cs(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${xn}ms ${Ai}, opacity ${$i}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, xn + 60);
    });
  });
}
function $c(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = cs(e, t);
  e.style.transition = `transform ${xn}ms ${Ai}, opacity ${$i}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${zi})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, xn + 60);
}
function zc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? ls({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${xn}ms ${Ai}, opacity ${$i}ms ease`, r.style.transform = `scale(${zi})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, xn + 60));
    });
  });
}
function Qr(n) {
  const e = w(null), [t, r] = te(!1), i = w(null), o = w(0), s = ie((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const y = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === y && (e.current = null, r(!1), !(!y || !n.cloneOnUnmount || !c.current) && y.style.visibility !== "hidden" && ai(f.current) && zc(y, u.current, i.current));
    });
  }, []), l = ie(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const y = m.getBoundingClientRect();
    (y.width > 0 || y.height > 0) && (i.current = { left: y.left, top: y.top, width: y.width, height: y.height });
  }, []), c = w(n.visible);
  c.current = n.visible;
  const a = w(n.visible), u = w(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const d = w(n.onClosed);
  d.current = n.onClosed;
  const f = w(n.morph !== !1);
  f.current = n.morph !== !1;
  const p = w(0);
  return ot(() => {
    if (!t || !c.current || !ai(f.current)) return;
    const m = e.current;
    m && Ac(p, m, u.current);
  }, [t, n.visible]), se(() => {
    if (!t || !c.current) return;
    let m = 0;
    const y = () => {
      m = 0, l(), m = requestAnimationFrame(y);
    };
    return m = requestAnimationFrame(y), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), ot(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const y = e.current;
    if (!y || !ai(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    $c(p, y, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), se(() => {
    if (!t || !c.current) return;
    const m = (y) => {
      const b = e.current;
      b && b.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), se(() => {
    if (!t || !c.current) return;
    const m = (y) => {
      const b = e.current;
      b && b.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const as = 384;
function Dc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function us({
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
  const u = ur(), d = w(u);
  d.current = u;
  const f = w(a);
  f.current = a, ot(() => {
    if (!t) return;
    let p = 0, m = !1;
    const y = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const A = d.current, W = n.current, K = e.current;
      if (!A || !W || !K || !K.isConnected) return;
      const M = (r == null ? void 0 : r.current) ?? K, j = Dc(A), v = l ?? as, O = Math.min(c, v), J = Math.max(0, K.offsetHeight - M.offsetHeight), Y = Math.max(O, Math.ceil(M.scrollHeight + J)), q = Math.min(Y, v);
      K.style.maxHeight = `${q}px`;
      let C = q;
      const _ = i == null ? void 0 : i.current;
      oc(_ ? {
        getBoundingClientRect: () => ({
          left: _.left,
          top: _.top,
          width: _.width,
          height: _.height,
          right: _.left + _.width,
          bottom: _.top + _.height,
          x: _.left,
          y: _.top,
          toJSON: () => {
          }
        })
      } : W, K, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Zo(o),
          es({ boundary: j, padding: s, fallbackStrategy: "bestFit" }),
          ts({ boundary: j, padding: s, mainAxis: !1 }),
          sc({
            boundary: j,
            padding: s,
            apply({ availableHeight: oe }) {
              C = Math.max(O, Math.floor(Math.min(v, oe))), K.style.maxHeight = `${C}px`;
            }
          })
        ]
      }).then(({ x: oe, y: he, placement: R }) => {
        m || !Number.isFinite(oe) || !Number.isFinite(he) || f.current({
          top: Math.round(he),
          left: Math.round(oe),
          maxH: C,
          side: R.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, z = (x == null ? void 0 : x.document) ?? null, T = (x == null ? void 0 : x.visualViewport) ?? null, k = () => y();
    T == null || T.addEventListener("resize", k), T == null || T.addEventListener("scroll", k), x == null || x.addEventListener("resize", k), z == null || z.addEventListener("scroll", k, { capture: !0, passive: !0 });
    let N = null;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(k), e.current && N.observe(e.current), r != null && r.current && N.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), T == null || T.removeEventListener("resize", k), T == null || T.removeEventListener("scroll", k), x == null || x.removeEventListener("resize", k), z == null || z.removeEventListener("scroll", k, { capture: !0 }), N == null || N.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let $n = null;
function ds(n) {
  return $n == null || $n(), $n = n, () => {
    $n === n && ($n = null);
  };
}
const fs = Ut(null);
function Di(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Oi({ theme: n, children: e }) {
  return /* @__PURE__ */ h(fs.Provider, { value: n, children: e });
}
function $h({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Xt();
  return /* @__PURE__ */ h(Oi, { theme: Di({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function zh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Xt(), c = Di({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(Oi, { theme: c, children: /* @__PURE__ */ h(
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
  return Gt(fs);
}
function Oc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function hs(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = Oc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Pc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Lc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Bc(n) {
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
function ln(n, e = "nearest", t) {
  if (!n) return;
  const r = t ?? Bc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function ps({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = w(!1), s = w(!1), l = w(!1), c = w({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = ie(() => {
    o.current = !0;
  }, []);
  return ot(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (ln(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), se(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      ln(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const Fc = [];
function _t(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function wn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function Hc(n, e, t, r = {}) {
  var o;
  const i = _t(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : _t([...i, e], t);
}
function ao(n, e, t, r, i = {}) {
  const o = _t(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = _t([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : _t([...o, ...u], r);
}
function uo(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function jc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function ms(n) {
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
  } = n, [f, p] = te(() => _t(t, r)), m = rt(() => new Set(s ?? []), [s]), y = rt(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !wn(f, t), z = ie((j) => {
    if (m.has(j)) return;
    const v = y.has(j), O = Hc(f, j, r, { max: o, disabledIds: s });
    wn(O, f) || (p(O), d == null || d(O), u == null || u(j, !v));
  }, [f, y, m, r, o, s, u, d]), T = ie((j) => {
    const v = j.filter((Y) => !m.has(Y)), O = uo(f, v), J = ao(f, v, O !== "all", r, { max: o, disabledIds: s });
    wn(J, f) || (p(J), d == null || d(J));
  }, [f, m, r, o, s, d]), k = ie((j, v = i ?? r) => {
    const O = ao(f, v, j, r, { max: o, disabledIds: s });
    wn(O, f) || (p(O), d == null || d(O));
  }, [f, i, r, o, s, d]), N = ie(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), A = ie((j) => {
    p(_t(j ?? t, r));
  }, [t, r]), W = ie(() => !a || wn(f, t) ? !1 : (a(_t(f, r)), !0), [a, f, t, r]), K = ie(() => !c || wn(f, t) ? !1 : (c(_t(f, r)), !0), [c, f, t, r]), M = ie((j) => uo(f, j), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: jc(f, r, i),
    isSelected: (j) => y.has(j),
    isDisabled: (j) => m.has(j),
    canToggle: (j) => !m.has(j) && (y.has(j) || !b),
    toggle: z,
    toggleGroup: T,
    setAll: k,
    clear: N,
    reset: A,
    commit: W,
    flush: K,
    cancel: A,
    groupState: M
  };
}
const gs = Ut(null), _c = () => Gt(gs), ys = Fc;
function Pi({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ I("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ I("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ h("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Wc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = Be(), p = B(16, 20, f), m = B(12, 14, f), y = B(12, 14, f), b = B(12, 16, f), x = B(10, 12, f), z = B(8, 10, f);
  return /* @__PURE__ */ I(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: z, padding: d ? `${x}px ${b}px` : void 0 },
      onClick: (k) => k.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ h(
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
        d ? /* @__PURE__ */ h(Pi, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: y }, children: r })
      ]
    }
  );
}
const fo = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", qc = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-active:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Jc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-active:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Kc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 group-data-[state=open]:opacity-100";
function Vc(n) {
  if (!lt.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function xs({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: l }) {
  const c = !!e && !!n, a = c && !t, u = !!n && (t || c), d = Vc(n), [f, p] = te({ sig: d, node: n }), [m, y] = te(null);
  d !== f.sig && (p({ sig: d, node: n }), y(f.node)), se(() => {
    if (m == null) return;
    const x = window.setTimeout(() => y(null), 200);
    return () => window.clearTimeout(x);
  }, [m]);
  const b = m == null ? n : /* @__PURE__ */ I("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ h("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: m }, `out:${f.sig}`),
    /* @__PURE__ */ h("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${d}`)
  ] });
  return c ? /* @__PURE__ */ I(ct, { children: [
    u && (a ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${fo} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Jc}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: b }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: b })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${fo} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${qc}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Kc}`} ${a ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-active:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: a ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ I("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ h("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ h("span", { className: "col-start-1 row-start-1", children: l })
        ] }) : l
      }
    ) }) })
  ] }) : /* @__PURE__ */ I(ct, { children: [
    u && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    l
  ] });
}
const Dh = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function Dt({
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
  type: y = "button",
  children: b,
  ...x
}) {
  const z = Xt(), T = e ?? (z == null ? void 0 : z.mode) ?? "light", k = t ?? Lc(z), N = gn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), A = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), W = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), K = "", M = "", j = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, v = "rounded", O = "rounded-[var(--ui-radius-btn)]", J = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, Y = {
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
  }, q = {
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
  }, _ = {
    light: {
      subtle: { base: `${K} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${M} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${K} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${K} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${K} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${M} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${K} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${K} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, U = {
    blue: { base: `${M} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${M} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, oe = x["data-state"] === "open", he = _[T][n], R = n === "primary" ? A : n.startsWith("tab") ? W : N, ge = We ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, pe = B(6, 8, Be()), ye = B(28, 40, Be()), fe = k === "emerald" ? "emerald" : k ? "blue" : null, Q = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", xe = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let D;
  if (n === "tab") {
    const V = J[T];
    D = `${v} ${r ? fe ? Y[fe].active : V.active : fe ? Y[fe][T === "light" ? "inactiveLight" : "inactiveDark"] : V.inactive}`;
  } else if (n === "tab-header") {
    const V = fe ? r ? C[fe].active : C[fe].inactive : r ? q.active : q.inactive;
    D = `${v} ${V} ${oe ? fe ? C[fe].open : q.open : ""}`;
  } else {
    if (D = `${O} ${he.base} ${oe ? he.open : ""}`, n === "primary" && fe) {
      const V = U[fe];
      D = `${O} ${oe ? `${V.base} ${V.open}` : V.base}`;
    }
    r && (D = `${D} ${i === "neutral" ? Q : xe[i]}`);
  }
  const E = !!f && !!d && !o, $ = o ? { width: ye, height: ye, padding: 0, gap: 0 } : s === "minimal" ? { ...ge, gap: E ? 0 : pe } : { ...R, gap: E ? 0 : pe };
  return /* @__PURE__ */ h(
    "button",
    {
      type: y,
      "data-mode": T,
      "data-accent": z == null ? void 0 : z.accent,
      className: `${j} ${o ? "justify-center" : ""} ${E ? "group" : ""} ${D} ${m}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: $,
      ...x,
      children: o ? b : /* @__PURE__ */ h(
        xs,
        {
          icon: d,
          collapse: f,
          iconWithLabel: p,
          active: r && (n.startsWith("tab") || c),
          gap: pe,
          reserve: a,
          roll: u,
          children: b
        }
      )
    }
  );
}
function Lr({
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
      children: e ? /* @__PURE__ */ h(Ul, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(ar, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(Pi, { checked: n, indeterminate: e, size: l })
    }
  );
}
function bs({
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
  return /* @__PURE__ */ I(
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
        /* @__PURE__ */ I(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ I("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                t,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ h(
          Dt,
          {
            variant: "subtle",
            size: "minimal",
            theme: f,
            cloud: p,
            onMouseDown: (y) => y.preventDefault(),
            onClick: r,
            disabled: n === 0,
            "data-selection-clear": !0,
            children: "Clear"
          }
        ),
        i && /* @__PURE__ */ h(
          Dt,
          {
            variant: "primary",
            size: "minimal",
            theme: f,
            cloud: p,
            onMouseDown: (y) => y.preventDefault(),
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
const Li = Ut("dark"), vs = () => Gt(Li), Bi = Ut({ "data-theme": "dark" }), Yc = () => Gt(Bi);
function Fi() {
  const n = Be();
  return {
    padding: `${B(8, 12, n)}px ${B(12, 16, n)}px`,
    fontSize: `${B(12, 14, n)}px`,
    lineHeight: `${B(18, 22, n)}px`
  };
}
function ws() {
  const n = Be();
  return {
    padding: `${B(6, 9, n)}px ${B(12, 16, n)}px ${B(2, 3, n)}px`,
    fontSize: `${B(10, 11, n)}px`,
    lineHeight: `${B(14, 16, n)}px`
  };
}
const Uc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", ho = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Gc = (n) => n ? "text-xs" : "text-[10px]";
function Zr(n) {
  const e = We && ns() > 0;
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
    headerPad: ho(e),
    headerText: `${ho(e)} font-semibold uppercase tracking-wider ${Gc(e)} ui-label`,
    // Item padding
    itemPad: Uc(e),
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
function ks(n) {
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
const Hi = Ut({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), fr = Ut(null), ji = () => Gt(fr), Ss = Ut({ query: "", setQuery: () => {
} }), Xc = () => Gt(Ss), Ns = Ut(null), Qc = () => Gt(Ns), Zc = () => !0;
function ei(n) {
  const e = w([]), [t, r] = te(-1), [i, o] = te(!1), [s, l] = te(0), c = ie((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = ie((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = ie(() => {
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
function Cs(n) {
  const e = ji(), t = w(e);
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
function _i(n, e, t, r) {
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
    var y, b, x, z, T, k;
    if (!s.current) return;
    const d = (y = l.current) == null ? void 0 : y.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const N = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((z = l.current) != null && z.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), N && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = u.key === "ArrowDown" ? 1 : -1, A = (i.current + N + m.length) % m.length;
        o.current.setHighlighted(A, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].submenu && m[N].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (k = (T = l.current) == null ? void 0 : T.onCloseSub) == null || k.call(T);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = Date.now(), A = (N - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: A, time: N }, !A) return;
        const W = i.current + 1;
        for (let K = 0; K < m.length; K++) {
          const M = (W + K) % m.length;
          if (m[M].label.toLowerCase().startsWith(A)) {
            o.current.setHighlighted(M, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Wi(n, e, t, r, i, o, s) {
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
function qi(n, e) {
  const t = w(n);
  t.current = n;
  const r = w(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function ti({
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
  searchValue: y,
  onSearchValueChange: b,
  multiple: x
}) {
  const z = Xt(), T = hs(s, z), k = T.theme, [N, A] = te([]), [W, K] = te(null), M = Kn(), j = Ri(), v = w(null), O = w(null), J = w(n);
  J.current = n;
  const [Y, q] = te(n), [C, _] = te(""), U = f && y !== void 0, oe = U ? y : C, he = U ? b ?? (() => {
  }) : _, R = w(y ?? "");
  se(() => {
    n || (R.current = y ?? "");
  }, [n, y]);
  const ge = U && oe === R.current ? "" : oe, pe = Yl(), ye = w(null), fe = Be(), Q = {
    padding: `${B(8, 12, fe)}px ${B(12, 16, fe)}px`,
    fontSize: `${B(12, 14, fe)}px`
  }, [xe, D] = te(0), E = f && !U;
  se(() => {
    var Ge;
    if (!E || !n) return;
    const L = (Ge = O.current) == null ? void 0 : Ge.querySelector("[data-menu-items]");
    if (!L) return;
    const X = () => D(L.offsetWidth - L.clientWidth);
    X();
    const de = new ResizeObserver(X);
    return de.observe(L), () => de.disconnect();
  }, [n, E, oe]);
  const $ = rt(() => {
    if (!f) return;
    const L = ge.trim().toLowerCase();
    return L ? (X) => {
      var de;
      return m ? m(L, X.label, X.group) : X.label.toLowerCase().includes(L) || (((de = X.group) == null ? void 0 : de.toLowerCase().includes(L)) ?? !1);
    } : Zc;
  }, [ge, f, m]), V = ei($), Oe = f && ge.trim() !== "" && V.items.length === 0, Ce = !!x, me = V.allItems.map((L) => L.itemId).filter((L) => !!L), qe = V.items.map((L) => L.itemId).filter((L) => !!L), Me = ms({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? ys,
    itemIds: me,
    visibleIds: qe,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), Pe = w(Me.reset);
  Pe.current = Me.reset;
  const Le = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Me.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Me.count}`;
  se(() => {
    if (n)
      return q(!0), U || _(""), V.setHighlighted(d ?? -1, "keyboard"), Pe.current(), ds(() => {
        t == null || t(!1), e == null || e();
      });
    A([]);
  }, [n, d, t, e]), se(() => {
    if (!n || !j) return;
    const L = (X) => {
      if (X.pointerType !== "touch") return;
      const de = X.target;
      de && (O.current && O.current.contains(de) || v.current && v.current.contains(de) || de instanceof Element && de.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return j.addEventListener("pointerdown", L, { capture: !0 }), () => j.removeEventListener("pointerdown", L, { capture: !0 });
  }, [n, j, t, e]);
  const ne = ie(() => {
    const L = v.current;
    if (!L) return null;
    const X = L.getBoundingClientRect();
    return { left: X.left, top: X.top, width: X.width, height: X.height };
  }, []), Fe = Qr({
    visible: n,
    morph: c,
    anchor: ne,
    onClosed: () => q(!1)
  }), ke = w(() => {
  }), Ze = w(() => {
  }), wt = w(() => {
  }), we = ie((L) => {
    if (L.key === "Enter") {
      const X = V.highlightedIndex, de = V.items[X >= 0 ? X : 0];
      return de == null || de.activate(), !0;
    }
    return L.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [V, t, e]);
  _i(n && N.length === 0, V, ke, {
    onFieldKey: we,
    onSelectAll: Ce ? () => Me.setAll(!0) : void 0
  }), qi(n, Ze), Wi(n, V, ke, O, N.length > 0, wt, {
    ignoreFields: U,
    selectAll: Ce
  });
  const Ve = w(null), mt = ie((L) => {
    var X;
    if (L) {
      L.addEventListener("keydown", ke.current, { capture: !0 }), L.addEventListener("wheel", Ze.current, { passive: !1 });
      const de = L.ownerDocument;
      Ve.current = de, de.addEventListener("keydown", wt.current, { capture: !0 }), Ee(!0);
    } else
      (X = Ve.current) == null || X.removeEventListener("keydown", wt.current, { capture: !0 }), Ve.current = null, Ee(!1);
    O.current = L, Fe(L);
  }, [Fe]), [Ae, Qt] = te({ top: 0, left: 0, maxH: as, side: "bottom", ready: !1 }), [qt, Ft] = te(0), [Tt, Ee] = te(!1);
  se(() => {
    n && v.current && Ft(v.current.getBoundingClientRect().width);
  }, [n]), us({
    anchorRef: v,
    panelRef: O,
    open: n && Tt,
    maxHeight: u,
    onPosition: Qt
  }), se(() => {
    var L;
    if (Ae.ready && n) {
      if (f) {
        (L = ye.current ?? v.current) == null || L.focus();
        return;
      }
      const X = O.current;
      X && X.ownerDocument.activeElement !== X && !X.contains(X.ownerDocument.activeElement) && X.focus();
    }
  }, [Ae.ready, n, f]), se(() => {
    if (!n || !f) return;
    if (V.items.length === 0) {
      V.highlightedIndex !== -1 && V.setHighlighted(-1, "keyboard");
      return;
    }
    const L = V.highlightedIndex;
    (L < 0 || L >= V.items.length) && V.setHighlighted(0, "keyboard");
  }, [n, oe, f, V.items.length]), ot(() => {
    var X;
    if (!n || V.highlightedIndex < 0 || V.pointerDriven) return;
    const L = (X = O.current) == null ? void 0 : X.querySelector(`[data-ei="${V.highlightedIndex}"]`);
    ln(L, "nearest");
  }, [n, V.highlightedIndex, V.pointerDriven]);
  const Je = ie((L) => {
    if (!(!L && !J.current)) {
      if (!L && At.current) {
        if (U) return;
        st.current = !0;
      }
      t ? t(L) : L || e == null || e();
    }
  }, [t, e]), kt = w(Y);
  kt.current = Y;
  const At = w(!1), st = w(!1), $t = ie(() => {
    if (!J.current && kt.current) {
      if (st.current) {
        st.current = !1, At.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), He = lt.isValidElement(r) ? r : null, et = w(!1), zt = ie(() => {
    const L = v.current;
    L && (et.current = !0, L.focus(), setTimeout(() => {
      et.current = !1;
    }, 0));
  }, []), gt = He ? lt.cloneElement(He, {
    ref: (L) => {
      v.current = L;
      const X = He.props.ref;
      typeof X == "function" ? X(L) : X && (X.current = L);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...U ? { type: He.props.type ?? "text" } : {},
    ...U ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${pe}-content` : void 0,
      "aria-activedescendant": n && V.highlightedIndex >= 0 ? `${pe}-opt-${V.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (L) => {
      var X, de;
      (de = (X = He.props).onPointerDownCapture) == null || de.call(X, L), At.current = !0, st.current = !1, setTimeout(() => {
        At.current = !1;
      }, 0);
    },
    onPointerDown: (L) => {
      var X, de;
      if ((de = (X = He.props).onPointerDown) == null || de.call(X, L), U) {
        L.preventDefault();
        const Ge = J.current;
        Ge || t == null || t(!0);
        const tt = v.current;
        tt == null || tt.focus(), !Ge && tt instanceof HTMLInputElement && tt.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (L) => {
      var X, de;
      (de = (X = He.props).onKeyDownCapture) == null || de.call(X, L), U && L.key === " " && L.stopPropagation();
    },
    onClick: (L) => {
      var X, de;
      (de = (X = He.props).onClick) == null || de.call(X, L), $t();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (L) => {
      var X, de;
      if (et.current) {
        et.current = !1;
        return;
      }
      (de = (X = He.props).onFocus) == null || de.call(X, L);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (L) => {
      var de, Ge, tt, St;
      if ((Ge = (de = He.props).onBlur) == null || Ge.call(de, L), !U || !J.current) return;
      const X = L.relatedTarget;
      X && ((tt = O.current) != null && tt.contains(X) || (St = v.current) != null && St.contains(X)) || setTimeout(() => {
        var Z;
        const Et = v.current;
        if (!Et || !J.current) return;
        const S = Et.ownerDocument.activeElement;
        S && (Et.contains(S) || (Z = O.current) != null && Z.contains(S)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (L) => {
      var X, de;
      if ((de = (X = He.props).onKeyDown) == null || de.call(X, L), !(!U || !J.current)) {
        if (L.key === "ArrowDown" || L.key === "ArrowUp") {
          L.preventDefault();
          const Ge = V.items;
          if (Ge.length === 0) return;
          const tt = L.key === "ArrowDown" ? 1 : -1, St = (V.highlightedIndex + tt + Ge.length) % Ge.length;
          V.setHighlighted(St, "keyboard");
        } else if (L.key === "Enter") {
          L.preventDefault();
          const Ge = V.highlightedIndex, tt = V.items[Ge >= 0 ? Ge : 0];
          tt == null || tt.activate();
        }
      }
    }
  }) : r, Mt = /* @__PURE__ */ I("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ I("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      ge.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), Ht = E || Ce, je = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${Ht ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ I(De.Root, { open: n || Y, onOpenChange: Je, modal: !1, children: [
    /* @__PURE__ */ h(De.Trigger, { asChild: !0, children: gt }),
    /* @__PURE__ */ h(De.Portal, { container: M ?? void 0, children: /* @__PURE__ */ h(Li.Provider, { value: k, children: /* @__PURE__ */ h(Bi.Provider, { value: T.attrs, children: /* @__PURE__ */ h(Hi.Provider, { value: { chain: N, setChain: A, morph: c, keyboardOpened: W, setKeyboardOpened: K }, children: /* @__PURE__ */ h(fr.Provider, { value: V, children: /* @__PURE__ */ h(Ss.Provider, { value: { query: oe, setQuery: he }, children: /* @__PURE__ */ h(gs.Provider, { value: Ce ? Me : null, children: /* @__PURE__ */ h(Ns.Provider, { value: pe, children: /* @__PURE__ */ I(
      De.Content,
      {
        id: `${pe}-content`,
        ref: mt,
        tabIndex: U ? void 0 : -1,
        ...T.attrs,
        "data-ui-fixed": !0,
        className: `${je} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ae.left,
          top: Ae.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : qt || void 0,
          maxHeight: Ae.maxH,
          visibility: Ae.ready ? "visible" : "hidden"
        },
        onPointerLeave: V.pointerLeave,
        onFocusCapture: U ? (L) => {
          L.target === L.currentTarget && (L.stopPropagation(), zt());
        } : void 0,
        onFocusOutside: U ? (L) => {
          var de;
          const X = L.target;
          X && (X === v.current || (de = v.current) != null && de.contains(X)) && L.preventDefault();
        } : void 0,
        onCloseAutoFocus: U ? (L) => {
          L.preventDefault(), zt();
        } : void 0,
        children: [
          E && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: xe }, children: /* @__PURE__ */ I("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: Q, children: [
            /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: ye,
                value: oe,
                onChange: (L) => he(L.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            oe ? /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (L) => L.stopPropagation(),
                onClick: () => {
                  var L;
                  he(""), (L = ye.current) == null || L.focus();
                },
                children: /* @__PURE__ */ h(Tn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          Ht ? /* @__PURE__ */ I("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Oe && Mt
          ] }) : /* @__PURE__ */ I(ct, { children: [
            l,
            Oe && Mt
          ] }),
          Ce && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            bs,
            {
              count: Me.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Me.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: k,
              onClear: Me.clear,
              hero: {
                label: Le,
                onClick: () => {
                  Me.commit(), Je(!1);
                },
                disabled: Me.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function Oh({
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
  theme: y,
  align: b,
  label: x,
  header: z,
  itemLabel: T,
  trigger: k,
  minItems: N = 1,
  itemRender: A,
  morph: W = !0,
  contentClassName: K
}) {
  const M = Zr(), j = Fi(), [v, O] = te(null), [J, Y] = te(""), q = w(J);
  q.current = J;
  const C = w(null), _ = w(null), [U, oe] = te(null), he = ie((Q) => {
    _.current = Q, oe(Q);
  }, []), R = ps({
    open: n,
    scroller: () => _.current,
    row: () => {
      var Q;
      return ((Q = _.current) == null ? void 0 : Q.querySelector('[data-active="1"]')) ?? null;
    }
  });
  se(() => {
    if (!n) return;
    const Q = (D) => {
      var qe, Me;
      const E = D.target;
      if (E && E.closest("input, textarea, [contenteditable]")) {
        v && E === C.current && (D.key === "Enter" ? (D.preventDefault(), D.stopImmediatePropagation(), pe()) : D.key === "Escape" && (D.preventDefault(), D.stopImmediatePropagation(), ye()));
        return;
      }
      const $ = (qe = _.current) == null ? void 0 : qe.closest(".ui-menu");
      if (!$ || !$.contains(D.target)) return;
      const V = $.ownerDocument, Oe = [...$.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ce = [...$.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], me = [...Oe, ...Ce];
      if (D.key === "ArrowDown" || D.key === "ArrowUp") {
        D.preventDefault(), D.stopImmediatePropagation();
        const Pe = V.activeElement;
        let Le = Pe ? me.indexOf(Pe) : -1;
        if (Le < 0 && Pe) {
          const Ze = Pe.closest("[data-im-row]"), wt = Ze == null ? void 0 : Ze.querySelector('[role="menuitem"]:first-child');
          wt && (Le = Oe.indexOf(wt));
        }
        const ne = D.key === "ArrowDown" ? 1 : -1, Fe = Le < 0 ? ne === 1 ? 0 : me.length - 1 : (Le + ne + me.length) % me.length, ke = me[Fe];
        ke == null || ke.focus({ preventScroll: !0 }), ln((ke == null ? void 0 : ke.closest("[data-im-row]")) ?? ke, "nearest", _.current);
        return;
      }
      if (D.key === "ArrowLeft" || D.key === "ArrowRight") {
        const Pe = V.activeElement, Le = Pe == null ? void 0 : Pe.closest("[data-im-row]");
        if (!Le) return;
        D.preventDefault(), D.stopImmediatePropagation();
        const ne = [...Le.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ne.length === 0) return;
        const Fe = Pe && Le.contains(Pe) ? ne.indexOf(Pe) : -1, ke = D.key === "ArrowRight" ? 1 : -1, Ze = Fe < 0 ? 0 : (Fe + ke + ne.length) % ne.length;
        (Me = ne[Ze]) == null || Me.focus({ preventScroll: !0 });
        return;
      }
    }, xe = (U == null ? void 0 : U.ownerDocument) ?? null;
    return xe == null || xe.addEventListener("keydown", Q, { capture: !0 }), () => xe == null ? void 0 : xe.removeEventListener("keydown", Q, { capture: !0 });
  }, [n, v, U]), se(() => {
    if (!v) return;
    const Q = t.find(($) => $.id === v);
    Q && !J && Y(Q.name);
    const xe = requestAnimationFrame(() => {
      const $ = C.current;
      $ && ($.focus(), $.select());
    });
    let D = 0;
    const E = window.setInterval(() => {
      const $ = C.current;
      if (D++, !$ || D > 12) {
        clearInterval(E);
        return;
      }
      $.ownerDocument.activeElement !== $ && ($.focus(), $.select());
    }, 50);
    return () => {
      cancelAnimationFrame(xe), clearInterval(E);
    };
  }, [v]), se(() => {
    if (v) {
      const Q = t.find((xe) => xe.id === v);
      Q && !J && Y(Q.name);
    }
  }, [v, t]);
  const ge = (Q, xe) => {
    O(Q), Y(xe);
  }, pe = () => {
    v && q.current.trim() && o(v, q.current.trim()), O(null);
  }, ye = () => {
    O(null);
  }, fe = T || z.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ I(ti, { open: n, onOpenChange: (Q) => {
    Q ? (O(null), Y("")) : (v && J.trim() && o(v, J.trim()), O(null), Y("")), (!Q || !m) && e(Q);
  }, width: "w-80", theme: y, align: b, trigger: k, morph: W, contentClassName: K, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${M.headerText}`, children: z }),
    /* @__PURE__ */ h("div", { ref: he, "data-im-list": !0, onPointerEnter: R.engage, onPointerDown: R.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((Q) => {
      const xe = Q.id === r, D = v === Q.id;
      return /* @__PURE__ */ h("div", { "data-im-row": Q.id, "data-active": xe ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${xe || D ? M.rowActiveBg : M.rowHoverBg} ${v && !D ? "opacity-40 pointer-events-none" : ""}`, children: D ? /* @__PURE__ */ I(ct, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: C,
            autoFocus: !0,
            value: J,
            onChange: (E) => Y(E.target.value),
            onKeyDown: (E) => {
              E.key === "Enter" && (E.preventDefault(), E.stopPropagation(), pe()), E.key === "Escape" && (E.preventDefault(), E.stopPropagation(), ye());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: j
          }
        ) }),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${M.editConfirm}`,
            onSelect: (E) => {
              E.preventDefault(), pe();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(ar, { className: M.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${M.editCancel}`,
            onSelect: (E) => {
              E.preventDefault(), ye();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(Tn, { className: M.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ I(ct, { children: [
        /* @__PURE__ */ h(
          De.Item,
          {
            style: j,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${M.rowText} ${xe ? "" : M.rowTextHover}`,
            onSelect: p ? () => {
              i(Q.id);
            } : (E) => {
              E.preventDefault(), i(Q.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${xe ? M.rowActiveText : ""}`, children: A ? A(Q) : Q.name })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${xe ? M.btnActive : M.btnBase}`,
            onSelect: (E) => {
              E.preventDefault(), ge(Q.id, Q.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Gl, { className: M.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${xe ? M.btnActive : M.btnBase}`,
            onSelect: (E) => {
              E.preventDefault();
              const $ = s(Q.id);
              $ && ge($, `${Q.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Go, { className: M.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= N ? M.btnDisabled : xe ? M.btnDangerActive : M.btnDanger}`,
            onSelect: (E) => {
              E.preventDefault(), l(Q.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= N,
            children: /* @__PURE__ */ h(yi, { className: M.btnIcon })
          }
        )
      ] }) }, Q.id);
    }) }),
    /* @__PURE__ */ I("div", { className: `shrink-0 ${v ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ I(ct, { children: [
        /* @__PURE__ */ h(De.Separator, { className: M.separator }),
        /* @__PURE__ */ I(
          De.Item,
          {
            className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
            onSelect: (Q) => {
              Q.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(Xo, { className: `${M.btnIcon} ${M.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(De.Separator, { className: M.separator }),
      c && /* @__PURE__ */ I(
        De.Item,
        {
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault();
            const xe = c();
            xe && ge(xe, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(Ur, { className: `${M.btnIcon} ${M.icon}` }),
            "New ",
            fe
          ]
        }
      ),
      a && /* @__PURE__ */ I(
        De.Item,
        {
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ I("svg", { className: `${M.btnIcon} ${M.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ I(
        De.Item,
        {
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ I("svg", { className: `${M.btnIcon} ${M.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ I(
        De.Item,
        {
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (Q) => {
            Q.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(yi, { className: `${M.btnIcon} ${M.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function ea({
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
  var _;
  vs();
  const f = Zr(), p = Fi(), m = ws(), y = w(!1), b = w(null), x = _c(), z = !!x && d !== void 0, T = x && d !== void 0 ? x.isSelected(d) : l, k = t || (x && d !== void 0 ? !x.canToggle(d) : !1), { myIndex: N, highlighted: A, setPointer: W, api: K } = Cs({
    label: () => ks(o),
    activate: () => {
      k || (x && d !== void 0 ? x.toggle(d) : n());
    },
    disabled: k,
    group: u,
    itemId: d
  }), { query: M } = Xc(), j = M.trim() !== "" && N < 0, v = Qc(), O = u == null ? void 0 : u.trim(), J = !!O && N >= 0 && (N === 0 || ((_ = K == null ? void 0 : K.items[N - 1]) == null ? void 0 : _.group) !== O), Y = O && x ? ((K == null ? void 0 : K.items) ?? []).filter((U) => U.group === O && U.itemId).map((U) => U.itemId).filter((U) => !x.isDisabled(U)) : [], q = x && Y.length > 0 ? x.groupState(Y) : "none", C = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ I(ct, { children: [
    J && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": O,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && Y.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && Y.length > 0 ? /* @__PURE__ */ I("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${O}`,
              onMouseDown: (U) => U.preventDefault(),
              onClick: () => x.toggleGroup(Y),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Lr,
                {
                  checked: q === "all",
                  indeterminate: q === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: O })
        ] }) : O
      }
    ),
    /* @__PURE__ */ I(
      De.Item,
      {
        ref: b,
        id: v && N >= 0 ? `${v}-opt-${N}` : void 0,
        "data-ei": N >= 0 ? N : void 0,
        ...z ? { role: "menuitemcheckbox", "aria-checked": T } : {},
        style: { ...p, display: j ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${C} ${z ? "" : l ? "ui-item-selected" : ""} ${A ? "ui-item-highlighted" : ""} ${k ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (U) => {
          if (y.current) {
            y.current = !1;
            return;
          }
          if (z) {
            U.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && U.preventDefault(), n();
        },
        onPointerEnter: () => {
          W(N);
        },
        onTouchStart: () => {
        },
        disabled: k,
        children: [
          z && /* @__PURE__ */ h(Lr, { checked: T, disabled: k, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (U) => {
                U.stopPropagation(), U.preventDefault(), y.current = !0, c.onClick();
              },
              onClick: (U) => {
                U.stopPropagation(), U.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function ta({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s, touchPresentation: l = "accordion" }) {
  const { chain: c, setChain: a, morph: u, keyboardOpened: d, setKeyboardOpened: f } = Gt(Hi), p = c.includes(n), m = c[c.length - 1] === n;
  vs();
  const y = Yc(), b = Kn(), x = w(null), z = w(null), [T, k] = te(p), N = !p && T;
  se(() => {
    p && k(!0);
  }, [p]);
  const A = () => a((D) => {
    const E = D.indexOf(n);
    return E >= 0 ? D.slice(0, E) : D;
  }), W = ei(), K = ji(), M = w(K);
  M.current = K;
  const j = w(null);
  se(() => {
    var E;
    const D = {
      label: e,
      activate: () => {
        f(n), a(($) => $.includes(n) ? $ : [...$, n]);
      },
      submenu: !0
    };
    return j.current = D, (E = M.current) == null ? void 0 : E.register(D);
  }, []);
  const v = K && j.current ? K.items.indexOf(j.current) : -1, O = v >= 0 && v === K.highlightedIndex, J = ie(() => {
    const D = x.current;
    if (!D) return null;
    const E = D.getBoundingClientRect();
    return { left: E.left, top: E.top, width: E.width, height: E.height };
  }, []), Y = Qr({
    visible: p,
    morph: u,
    anchor: J,
    onClosed: () => k(!1)
  }), q = w(() => {
  }), C = w(() => {
  }), _ = w(() => {
  });
  _i(p && m, W, q, {
    onCloseSub: () => {
      A(), K && v >= 0 && K.setHighlighted(v, "keyboard");
    }
  });
  const U = w(d);
  U.current = d, se(() => {
    p && (U.current === n ? (W.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var D;
      return (D = z.current) == null ? void 0 : D.focus();
    }), f(null)) : W.setHighlighted(-1, "keyboard"));
  }, [p]), qi(p, C), Wi(p, W, q, z, !m, _);
  const oe = We && l === "accordion";
  se(() => {
    if (!oe || !p) return;
    const D = x.current, E = (D == null ? void 0 : D.closest("[data-submenu-panel]")) ?? (D == null ? void 0 : D.closest('[role="menu"]'));
    if (E)
      return E.dataset.submenuOpen = "accordion", () => {
        delete E.dataset.submenuOpen;
      };
  }, [oe, p]);
  const [he, R] = te(null);
  ot(() => {
    if (!p || !We || oe) {
      R(null);
      return;
    }
    const D = x.current, E = D == null ? void 0 : D.closest('[role="menu"]');
    if (!D || !E) return;
    const $ = D.getBoundingClientRect(), V = E.getBoundingClientRect(), Oe = parseInt(getComputedStyle(E).zIndex, 10) || 0;
    return R({
      presentation: "replace",
      sideOffset: 2 - (V.width - 4),
      alignOffset: 6 - ($.top - V.top),
      width: V.width,
      childZ: Oe + 2
    }), E.dataset.submenuOpen = "replace", () => {
      delete E.dataset.submenuOpen;
    };
  }, [p, l]), lt.useLayoutEffect(() => {
    var E;
    if (!p || W.highlightedIndex < 0 || W.pointerDriven) return;
    const D = (E = z.current) == null ? void 0 : E.querySelector(`[data-ei="${W.highlightedIndex}"]`);
    ln(D, "nearest", z.current);
  }, [p, W.highlightedIndex, W.pointerDriven]);
  const ge = w(null), pe = ie((D) => {
    var E;
    if (D) {
      D.addEventListener("keydown", q.current, { capture: !0 }), D.addEventListener("wheel", C.current, { passive: !1 });
      const $ = D.ownerDocument;
      ge.current = $, $.addEventListener("keydown", _.current, { capture: !0 });
    } else
      (E = ge.current) == null || E.removeEventListener("keydown", _.current, { capture: !0 }), ge.current = null;
    z.current = D, Y(D);
  }, [Y]), ye = Be(), fe = { padding: `${B(8, 12, ye)}px ${B(12, 16, ye)}px`, fontSize: B(12, 14, ye) }, Q = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${O ? " ui-item-highlighted" : ""}${N ? " ui-sub-closing" : ""}`, xe = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ I(De.Sub, { open: p || T, onOpenChange: (D) => a((E) => {
    if (!D) {
      const $ = E.indexOf(n);
      return $ >= 0 ? E.slice(0, $) : E;
    }
    return E.includes(n) ? E : [...E, n];
  }), children: [
    /* @__PURE__ */ I(
      De.SubTrigger,
      {
        ref: x,
        "data-ei": v >= 0 ? v : void 0,
        "data-submenu-header": We ? "true" : void 0,
        style: fe,
        className: Q,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          K && v >= 0 && K.setHighlighted(v, "pointer");
        },
        onPointerDown: (D) => {
          D.pointerType === "pen" && (D.preventDefault(), a((E) => p ? E.slice(0, E.indexOf(n)) : [...E, n]));
        },
        onClick: (D) => {
          !We || !p || (D.preventDefault(), D.stopPropagation(), A());
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Or, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ I("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Or, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    oe && p && /* The accordion body: rendered INLINE in the parent card, below the
    reordered header row. No portal, no positioning — the card simply
    grows and the panel fades/slides in. */
    /* @__PURE__ */ h("div", { "data-submenu-panel": !0, className: "ui-submenu-panel", children: o }),
    !oe && /* @__PURE__ */ h(De.Portal, { container: b ?? void 0, children: /* @__PURE__ */ h(
      De.SubContent,
      {
        ref: pe,
        ...y,
        "data-submenu-presentation": he == null ? void 0 : he.presentation,
        className: xe,
        sideOffset: he ? he.sideOffset : 8,
        alignOffset: he ? he.alignOffset : -4,
        collisionPadding: 8,
        style: he ? { width: he.width, maxWidth: "calc(100vw - 16px)", zIndex: he.childZ } : void 0,
        onPointerLeave: W.pointerLeave,
        children: /* @__PURE__ */ I(fr.Provider, { value: W, children: [
          he && /* @__PURE__ */ I(
            "button",
            {
              type: "button",
              "data-submenu-back": !0,
              onClick: A,
              style: { padding: `${B(8, 10, ye)}px ${B(12, 14, ye)}px`, fontSize: B(12, 13, ye) },
              className: "ui-submenu-back sticky -top-1 z-10 -mx-1 mb-1 -mt-1 flex w-[calc(100%+8px)] items-center gap-1.5 rounded-md border-b border-[color:var(--ui-sep)] bg-[var(--ui-menu-bg)] font-medium text-[color:var(--ui-text-muted)]",
              children: [
                /* @__PURE__ */ h(Qo, { className: "h-3.5 w-3.5 shrink-0" }),
                /* @__PURE__ */ h("span", { className: "truncate", children: e })
              ]
            }
          ),
          o
        ] })
      }
    ) })
  ] });
}
const Un = 8, Ph = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Xt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? hs(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = Be(), f = B(12, 14, d), p = w(null), m = ur(), [y, b] = te(!1), [x, z] = te([]), [T, k] = te(null), N = ei();
  se(() => {
    if (n)
      return N.setHighlighted(-1, "keyboard"), ds(r);
  }, [n, r]);
  const A = w({ left: e, top: t });
  n && (A.current = { left: e, top: t });
  const W = ie(() => ({ left: A.current.left, top: A.current.top, width: 0, height: 0 }), []), K = Qr({
    visible: !0,
    morph: l,
    anchor: W,
    cloneOnUnmount: !0
  }), M = w(() => {
  }), j = w(() => {
  }), v = w(() => {
  });
  _i(n, N, M), ot(() => {
    if (!n || N.highlightedIndex < 0 || N.pointerDriven) return;
    const C = p.current;
    ln(
      C == null ? void 0 : C.querySelector(`[data-ei="${N.highlightedIndex}"]`),
      "nearest",
      C
    );
  }, [n, N.highlightedIndex, N.pointerDriven]), qi(n, j), Wi(n, N, M, p, x.length > 0, v);
  const O = w(null), J = ie((C) => {
    var _;
    if (C) {
      C.addEventListener("keydown", M.current, { capture: !0 }), C.addEventListener("wheel", j.current, { passive: !1 });
      const U = C.ownerDocument;
      O.current = U, U.addEventListener("keydown", v.current, { capture: !0 });
    } else
      (_ = O.current) == null || _.removeEventListener("keydown", v.current, { capture: !0 }), O.current = null;
    p.current = C, b(!!C), K(C);
  }, [K]), [Y, q] = te(null);
  return ot(() => {
    var Q;
    if (!n || !y || !p.current) return;
    const C = p.current, _ = C.offsetWidth, U = C.offsetHeight, oe = (Q = o == null ? void 0 : o.current) == null ? void 0 : Q.getBoundingClientRect(), he = oe ? oe.right : (m == null ? void 0 : m.innerWidth) ?? 0, R = oe ? oe.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, ge = oe ? oe.left : 0, pe = oe ? oe.top : 0;
    let ye = Math.max(pe + Un, A.current.top), fe = Math.max(ge + Un, A.current.left);
    fe + _ > he && (fe = he - _ - Un), ye + U > R && (ye = Math.max(pe + Un, R - U - Un)), q({ left: fe, top: ye });
  }, [n, y, e, t, o]), n ? /* @__PURE__ */ I(De.Root, { open: n, onOpenChange: (C) => {
    C || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(De.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(De.Portal, { children: /* @__PURE__ */ h(Li.Provider, { value: u, children: /* @__PURE__ */ h(Bi.Provider, { value: a.attrs, children: /* @__PURE__ */ h(Hi.Provider, { value: { chain: x, setChain: z, morph: l, keyboardOpened: T, setKeyboardOpened: k }, children: /* @__PURE__ */ h(fr.Provider, { value: N, children: /* @__PURE__ */ h(
      De.Content,
      {
        ref: J,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (Y == null ? void 0 : Y.left) ?? A.current.left, top: (Y == null ? void 0 : Y.top) ?? A.current.top, touchAction: "manipulation" },
        onPointerLeave: N.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, Lh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Be(), c = { padding: `${B(8, 12, l)}px ${B(12, 16, l)}px`, fontSize: B(12, 14, l) }, a = ji(), u = w(a);
  u.current = a;
  const d = w(null);
  se(() => {
    var y;
    const m = { label: ks(s), activate: () => {
      r || n();
    } };
    return d.current = m, (y = u.current) == null ? void 0 : y.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ I(
    De.Item,
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
}, Bh = () => /* @__PURE__ */ h(De.Separator, { className: "ui-sep my-1" }), Fh = (n) => /* @__PURE__ */ h(ta, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), ze = 8, Ts = "[data-modal-stack]", on = 220, nr = "cubic-bezier(0.32, 0.72, 0, 1)", Ar = 0.94;
function zn() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function hn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function Ms(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function po(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = Ms(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${on}ms ${nr}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, on + 80));
    });
  });
}
function na(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Ar})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${on}ms ${nr}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, on + 60));
    });
  });
}
function mo(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Ar, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Ar, height: i.height * Ar };
  e.style.transition = `transform ${on}ms ${nr}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Ms(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, on + 60);
}
function ui(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Ts) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function br(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Ts) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function ra({
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
  const y = Xt(), b = Di(
    { mode: f, accent: m, surface: p, context: "surface" },
    y
  ), x = b.mode, z = b.surface, T = b.accent, k = w(null), N = w(null), A = w(null), W = Be(), K = B(20, 24, W), M = B(10, 12, W), j = B(12, 14, W), v = B(14, 16, W), O = B(20, 24, W), J = B(20, 24, W), Y = B(20, 24, W), q = B(14, 16, W), C = B(16, 20, W), _ = B(10, 12, W), U = B(12, 14, W), oe = B(8, 10, W), he = B(4, 6, W), R = { padding: `${M}px ${K}px` }, ge = { fontSize: j }, pe = { padding: `${J}px ${O}px 16px ${O}px` }, ye = { fontSize: v }, fe = { padding: `0 ${O}px 16px` }, Q = { padding: `${Y}px ${O}px` }, xe = { fontSize: _, padding: `${he}px ${oe}px` }, [D, E] = te(!1), $ = ie((S) => {
    k.current = S, E(S !== null);
  }, []), V = Kn(), Oe = ur(), Ce = w(Oe);
  Ce.current = Oe;
  const [me, qe] = te(null), Me = w(null), Pe = w(!1), Le = w(!1), ne = w(0), Fe = w({ w: 0, h: 0 }), ke = w(!1), [Ze, wt] = te(!1), [we, Ve] = te(!1), mt = w(0), Ae = w(!1), [Qt, qt] = te(!1), Ft = w(c);
  Ft.current = c;
  const Tt = w(!1), Ee = w(!1), Je = () => {
    Ee.current = !0, wt(!0);
  }, kt = () => {
    Ee.current = !1, wt(!1);
  };
  se(() => {
    n || (qe(null), ke.current = !1, Pe.current = !1, Ve(!1));
  }, [n]), ot(() => {
    if (!n || ke.current || !D || !k.current) return;
    ke.current = !0;
    const S = k.current.getBoundingClientRect(), Z = Ce.current ?? null, le = (Z == null ? void 0 : Z.innerWidth) ?? 0, re = hn(Z);
    qe({
      left: Math.max(ze, Math.min((le - S.width) / 2, le - S.width - ze)),
      top: Math.max(re.top + ze, Math.min(re.top + (re.height - S.height) / 2, re.bottom - S.height - ze))
    });
  }, [n, D]), ot(() => {
    if (!n || !D || !c || zn() || !k.current) return;
    const S = k.current, Z = ui(S), le = Z[Z.length - 1];
    Je(), le ? po(mt, S, le.getBoundingClientRect(), kt) : na(mt, S, kt);
  }, [n, D]);
  const At = ie(() => {
    if (!u || Ae.current) return;
    const S = k.current, Z = !!S && ui(S).length > 0;
    if (!S || !c || zn() || Z) {
      e();
      return;
    }
    Ae.current = !0, qt(!0), Tt.current = !0, Je(), mo(mt, S, () => {
      Ae.current = !1, qt(!1), kt(), e();
    });
  }, [c, e, u]), st = ie(() => {
    const S = k.current;
    if (!S || Tt.current || !Ft.current || zn() || ui(S).length > 0) return;
    const Z = S.ownerDocument, le = S.cloneNode(!0);
    le.removeAttribute("data-modal-stack"), le.removeAttribute("data-state"), le.removeAttribute("role"), le.removeAttribute("data-aria-hidden"), le.removeAttribute("tabindex"), le.setAttribute("aria-hidden", "true"), le.style.pointerEvents = "none", Z.body.appendChild(le), mo({ current: 0 }, le, () => {
      le.isConnected && le.remove();
    });
  }, []);
  ot(() => () => st(), [st]);
  const $t = w(n);
  ot(() => {
    const S = $t.current;
    $t.current = n, S && !n && st();
  }, [n, D, st]), se(() => {
    if (!n || !D || !c || !k.current) return;
    const S = k.current, Z = S.parentNode;
    if (!Z) return;
    let le = 0, re = null, ve = !1;
    const Ie = () => {
      le = 0;
      const Re = br(S);
      if (Re.length > 0)
        S.style.opacity = "", S.style.pointerEvents = "", re = Re[Re.length - 1].getBoundingClientRect(), ve = !0, le = requestAnimationFrame(Ie);
      else if (ve) {
        ve = !1, re && !zn() && (Je(), po(mt, S, re, kt)), re = null;
        const Te = Ce.current ?? null;
        Te == null || Te.setTimeout(() => {
          !S || !S.isConnected || getComputedStyle(S).opacity !== "1" && (S.style.opacity = "1", S.style.pointerEvents = "");
        }, 240);
      }
    }, _e = new MutationObserver(() => {
      !le && br(S).length > 0 && (le = requestAnimationFrame(Ie));
    });
    return _e.observe(Z, { childList: !0 }), () => {
      _e.disconnect(), le && cancelAnimationFrame(le);
    };
  }, [n, D]), se(() => {
    if (!D || !c || zn() || !k.current) return;
    const S = k.current;
    let Z = Math.round(S.getBoundingClientRect().height), le = !1;
    const re = new ResizeObserver(() => {
      if (!S.isConnected) return;
      const ve = Math.round(S.getBoundingClientRect().height);
      if (!le) {
        le = !0, Z = ve;
        return;
      }
      if (Math.abs(ve - Z) < 1) return;
      if (Me.current || Ae.current || br(S).length > 0) {
        Z = ve;
        return;
      }
      if (Ee.current) return;
      const Ie = Z;
      Z = ve, Je();
      const _e = S.getBoundingClientRect(), Re = hn(Ce.current ?? null), Te = !Pe.current && !Le.current, dt = Te ? Re.top + (Re.height - Ie) / 2 : _e.top, nt = Te ? Re.top + (Re.height - ve) / 2 : _e.top;
      S.style.transition = "none", S.style.height = `${Ie}px`, Te && (S.style.top = `${dt}px`), N.current && (N.current.style.overflow = "hidden"), S.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          S.style.height === `${Ie}px` && (S.style.transition = `height ${on}ms ${nr}${Te ? `, top ${on}ms ${nr}` : ""}`, S.style.height = `${ve}px`, Te && (S.style.top = `${nt}px`), window.setTimeout(() => {
            S.style.height === `${ve}px` && (S.style.transition = "", S.style.height = "", N.current && (N.current.style.overflow = ""), Te && qe({ left: _e.left, top: nt }), kt());
          }, on + 60));
        });
      });
    });
    return re.observe(S), () => re.disconnect();
  }, [D]), se(() => {
    if (!D || !k.current || c && !zn()) return;
    const S = k.current, Z = new ResizeObserver(() => {
      if (!S.isConnected || Me.current || Ae.current || Le.current || br(S).length > 0) return;
      const le = Ce.current ?? null, re = hn(le), ve = (le == null ? void 0 : le.innerWidth) ?? 0, Ie = S.getBoundingClientRect(), _e = Math.max(re.top + ze, Math.min(Ie.top, re.bottom - Ie.height - ze)), Re = Math.max(ze, Math.min(Ie.left, ve - Ie.width - ze));
      (Math.abs(_e - Ie.top) > 0.5 || Math.abs(Re - Ie.left) > 0.5) && qe({ left: Re, top: _e });
    });
    return Z.observe(S), () => Z.disconnect();
  }, [D, c]);
  const He = ie(() => {
    const S = k.current;
    if (!S) return null;
    const Z = S.getBoundingClientRect();
    return { left: Z.left, top: Z.top, width: Z.width, height: Z.height };
  }, []), et = ie((S, Z) => {
    const le = Ce.current ?? null, re = (le == null ? void 0 : le.innerWidth) ?? 0, ve = hn(le), Ie = He(), _e = Ie ? Ie.width : Math.min(re - ze * 2, 576), Re = Ie ? Ie.height : Math.min(ve.height - ze * 2, 400);
    return {
      left: Math.max(ze, Math.min(S, re - _e - ze)),
      top: Math.max(ve.top + ze, Math.min(Z, ve.bottom - Re - ze))
    };
  }, [He]);
  se(() => {
    if (!n) return;
    const S = Ce.current ?? null, Z = (S == null ? void 0 : S.visualViewport) ?? null;
    if (!S || !Z) return;
    const le = 120;
    Le.current = !1, Fe.current = { w: S.innerWidth, h: S.innerHeight };
    let re = 0;
    const ve = () => {
      if (Ae.current || Me.current) return;
      const _e = (S == null ? void 0 : S.innerHeight) ?? 0, Re = (S == null ? void 0 : S.innerWidth) ?? 0, dt = hn(S).height < _e - le, nt = _e < Fe.current.h - le && Re === Fe.current.w;
      dt || nt ? (Le.current = !0, ne.current && (clearTimeout(ne.current), ne.current = 0)) : ne.current || (ne.current = (S == null ? void 0 : S.setTimeout(() => {
        Le.current = !1, ne.current = 0, Ve(!1);
      }, 600)) ?? 0), Ve(Le.current), !re && (re = requestAnimationFrame(() => {
        var Rn;
        re = 0;
        const It = k.current;
        if (!It) return;
        const yt = hn(Ce.current ?? null), $e = It.getBoundingClientRect(), Vt = ((Rn = Ce.current) == null ? void 0 : Rn.innerWidth) ?? 0, Zt = (S == null ? void 0 : S.innerHeight) ?? 0, vn = yt.height < Zt - le || Zt < Fe.current.h - le && (S == null ? void 0 : S.innerWidth) === Fe.current.w;
        Fe.current = { w: (S == null ? void 0 : S.innerWidth) ?? 0, h: Zt };
        const Ne = $e.top >= yt.top + ze && $e.bottom <= yt.bottom - ze, an = () => {
          qe({
            left: Math.max(ze, Math.min((Vt - $e.width) / 2, Vt - $e.width - ze)),
            top: Math.max(yt.top + ze, Math.min(yt.top + (yt.height - $e.height) / 2, yt.bottom - $e.height - ze))
          });
        };
        if (vn && !We) {
          if (Pe.current) {
            Ne || qe(et($e.left, $e.top));
            return;
          }
          if (Ne) return;
          an();
          return;
        }
        if (!Le.current) {
          if (Pe.current) {
            Ne || qe(et($e.left, $e.top));
            return;
          }
          Ne || an();
        }
      }));
    };
    Z.addEventListener("resize", ve), Z.addEventListener("scroll", ve);
    const Ie = () => {
      Ae.current || Me.current || re || (re = requestAnimationFrame(() => {
        re = 0;
        const _e = k.current;
        if (!_e) return;
        const Re = Ce.current ?? null, Te = hn(Re), dt = (Re == null ? void 0 : Re.innerWidth) ?? 0, nt = _e.getBoundingClientRect();
        if (Pe.current) {
          qe(et(nt.left, nt.top));
          return;
        }
        qe({
          left: Math.max(ze, Math.min((dt - nt.width) / 2, dt - nt.width - ze)),
          top: Math.max(Te.top + ze, Math.min(Te.top + (Te.height - nt.height) / 2, Te.bottom - nt.height - ze))
        });
      }));
    };
    return S.addEventListener("orientationchange", Ie), () => {
      Z.removeEventListener("resize", ve), Z.removeEventListener("scroll", ve), S.removeEventListener("orientationchange", Ie), re && cancelAnimationFrame(re), ne.current && clearTimeout(ne.current);
    };
  }, [n, et]);
  const zt = ie((S) => {
    if (S.target.closest("button")) return;
    Pe.current = !0;
    const Z = He();
    Z && (qe(et(Z.left, Z.top)), Me.current = { startX: S.clientX, startY: S.clientY, posX: Z.left, posY: Z.top }, S.target.setPointerCapture(S.pointerId));
  }, [He, et]), gt = ie((S) => {
    const Z = Me.current;
    Z && (S.preventDefault(), qe(et(Z.posX + S.clientX - Z.startX, Z.posY + S.clientY - Z.startY)));
  }, [et]), Mt = ie(() => {
    Me.current = null;
  }, []), Ht = Me.current !== null, je = ie(() => {
    Pe.current = !1;
    const S = Ce.current ?? null, Z = hn(S), le = (S == null ? void 0 : S.innerWidth) ?? 0, re = k.current, ve = re ? re.getBoundingClientRect() : { width: 0, height: 0 };
    qe({
      left: Math.max(ze, Math.min((le - ve.width) / 2, le - ve.width - ze)),
      top: Math.max(Z.top + ze, Math.min(Z.top + (Z.height - ve.height) / 2, Z.bottom - ve.height - ze))
    });
  }, []), L = w(0), X = ie(() => {
    const S = Date.now();
    S - L.current < 300 ? (L.current = 0, je()) : L.current = S;
  }, [je]), de = me !== null, Ge = de ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", tt = `${i ? `${i} w-full` : "max-w-xl w-full"}`, St = {
    ...de ? { left: me.left, top: me.top } : {},
    width: `min(100%, calc(100dvw - ${ze * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...we ? {} : { maxHeight: `calc(100dvh - ${ze * 2}px)` }
  }, Et = ie((S) => {
    if (S.key !== "Enter" || S.shiftKey || S.metaKey || S.ctrlKey || S.altKey) return;
    const Z = S.target, le = A.current;
    if (!(!!Z.closest("[data-modal-close]") || !!le && le.contains(Z) && !!Z.closest('button, a, [role="button"]')) && Z.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !le) return;
    const ve = Array.from(le.querySelectorAll("button[data-modal-confirm]")), Ie = ve.length > 0 ? ve : Array.from(le.querySelectorAll("button")), _e = Ie[Ie.length - 1];
    !_e || _e.disabled || (S.preventDefault(), _e.click());
  }, []);
  return /* @__PURE__ */ h(Oi, { theme: b, children: /* @__PURE__ */ h(fn.Root, { open: n, onOpenChange: (S) => {
    S || At();
  }, children: /* @__PURE__ */ I(fn.Portal, { container: V ?? void 0, children: [
    /* @__PURE__ */ h(
      fn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Qt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (S) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (S.preventDefault(), d && At());
        }
      }
    ),
    /* @__PURE__ */ I(
      fn.Content,
      {
        ref: $,
        onKeyDown: Et,
        onInteractOutside: (S) => {
          d || S.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": T,
        "data-surface": z,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ge} ${tt}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(St).length > 0 ? St : {} },
        children: [
          a ? /* @__PURE__ */ I(
            "div",
            {
              style: pe,
              className: `flex items-center justify-between ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Ze || zt(S);
              },
              onPointerMove: gt,
              onPointerUp: Mt,
              onClick: X,
              children: [
                /* @__PURE__ */ h(fn.Title, { style: ye, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(fn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Tn, { style: { width: C, height: C } }) })
              ]
            }
          ) : /* @__PURE__ */ I(
            "div",
            {
              style: R,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Ze || zt(S);
              },
              onPointerMove: gt,
              onPointerUp: Mt,
              onClick: X,
              children: [
                /* @__PURE__ */ I("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(fn.Title, { style: ge, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ I("button", { onClick: l, style: xe, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(Xo, { style: { width: U, height: U } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(fn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Tn, { style: { width: q, height: q } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: N, "data-testid": "modal-body", style: a ? fe : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: A, style: a ? Q : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Hh({ children: n }) {
  const e = Be(), t = B(20, 24, e), r = B(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const ia = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", oa = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, sa = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function vr({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = gn({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ h(
    "button",
    {
      type: r,
      style: o,
      className: `${ia} ${n === "hero" ? oa[e] : sa[n]} ${t}`,
      ...i
    }
  );
}
function Br(n = "md") {
  const e = We && ns() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function Es(n = "md") {
  return n === "sm" ? gn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : gn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Is = Ut(null);
function jh() {
  const n = Gt(Is);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function _h({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = te(null), [s, l] = te(!1), c = w(null), a = Be(), u = B(16, 20, a), d = B(12, 14, a), f = Es(), p = w(i);
  p.current = i;
  const m = ie(() => {
    const N = p.current;
    N && (N.kind === "confirm" ? N.resolve(!1) : N.kind === "prompt" ? N.resolve(null) : N.resolve());
  }, []), y = ie((N) => {
    if (N.suppressKey) {
      const A = localStorage.getItem(N.suppressKey);
      if (A && Date.now() < parseInt(A, 10))
        return Promise.resolve(!0);
    }
    return new Promise((A) => {
      m(), l(!1), o({ kind: "confirm", options: N, resolve: A });
    });
  }, [m]), b = ie((N) => new Promise((A) => {
    m(), o({ kind: "prompt", options: N, resolve: A });
  }), [m]), x = ie((N) => new Promise((A) => {
    m(), o({ kind: "alert", options: N, resolve: A });
  }), [m]);
  se(() => {
    if (i) {
      const N = setTimeout(() => {
        var A;
        return (A = c.current) == null ? void 0 : A.focus();
      }, 50);
      return () => clearTimeout(N);
    }
  }, [i]);
  const z = ie(() => {
    var N, A;
    if (i) {
      if (i.kind === "confirm") {
        const W = i.options;
        W.suppressKey && s && localStorage.setItem(W.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((A = (N = c.current) == null ? void 0 : N.value) == null ? void 0 : A.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), T = i !== null;
  se(() => {
    if (!T) return;
    const N = (A) => {
      A.key !== "Enter" || A.shiftKey || A.metaKey || A.ctrlKey || A.altKey || A.isComposing || (A.preventDefault(), A.stopImmediatePropagation(), z());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [T, z]);
  const k = ie(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ I(Is.Provider, { value: { confirm: y, prompt: b, alert: x }, children: [
    n,
    T && /* @__PURE__ */ h(
      ra,
      {
        open: !0,
        onClose: k,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ I(ct, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(vr, { variant: "ghost", onClick: k, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(vr, { onClick: z, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            vr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: z,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(vr, { "data-modal-confirm": !0, onClick: z, children: "Save" })
        ] }),
        children: /* @__PURE__ */ I("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            Wc,
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
const la = 500, ca = 250, aa = 5, jt = 88, go = 4;
function ua(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function da({ x: n, y: e, ms: t }) {
  const r = w(null), i = Kn();
  return se(() => {
    r.current && ua(r.current, t);
  }, [t]), Gr(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          left: n - jt / 2,
          top: e - jt / 2,
          width: jt,
          height: jt,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ I("svg", { ref: r, width: jt, height: jt, viewBox: `0 0 ${jt} ${jt}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: jt / 2,
              cy: jt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: go + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: jt / 2,
              cy: jt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: go,
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
function Wh() {
  return { "data-no-longpress": "true" };
}
function fa(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function qh({
  children: n,
  showRing: e = !0,
  longPressMs: t = la,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = te(null), c = Ri(), a = w(null), u = w(null), d = w({ x: 0, y: 0, target: null }), f = w(!1), p = Math.min(ca, t * 0.5), m = w(i);
  m.current = i;
  const y = w(o);
  return y.current = o, se(() => {
    if (!We || !c) return;
    const b = (k) => {
      if (!xi(k.pointerType) || k.button !== 0) return;
      const N = k.target;
      if (!N.closest(r) || (m.current ? !m.current(N) : fa(N))) return;
      const A = k.clientX, W = k.clientY;
      d.current = { x: A, y: W, target: k.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: A, y: W }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const K = d.current.target;
        if (!K) return;
        const M = y.current;
        if (M) {
          M(K, A, W);
          return;
        }
        const j = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: A,
          clientY: W,
          button: 2,
          view: window
        });
        K.dispatchEvent(j);
      }, t);
    }, x = (k) => {
      if (!f.current || a.current === null) return;
      const N = k.clientX - d.current.x, A = k.clientY - d.current.y;
      Math.sqrt(N * N + A * A) > aa && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, z = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, T = (k) => {
      xi(k.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", z), c.addEventListener("pointercancel", z), c.addEventListener("pointerleave", T), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", z), c == null || c.removeEventListener("pointercancel", z), c == null || c.removeEventListener("pointerleave", T), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ I(ct, { children: [
    n,
    e && s && /* @__PURE__ */ h(da, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function Jh() {
  const n = Rc();
  return Ic ? n === null || xi(n) : !1;
}
const ha = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, pa = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, ma = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Kh({
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
        ...e ? ma : n ? pa : ha,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ga = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ya = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], di = 1900, fi = 2100;
function xa(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function ba(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Vh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Xt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const $ = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN($.getTime()) ? c : $;
  })(), [u, d] = te(a.getFullYear()), [f, p] = te(a.getMonth()), [m, y] = te("days"), [b, x] = te(null), z = rt(() => new Set(n), [n]), T = ($) => {
    z.has($) ? e(n.filter((V) => V !== $)) : e([...n, $]);
  }, k = rt(() => {
    const $ = xa(u, f), V = new Date(u, f, 1).getDay(), Oe = [];
    for (let Ce = 0; Ce < V; Ce++) Oe.push({ key: `pad-${Ce}`, day: 0, empty: !0 });
    for (let Ce = 1; Ce <= $; Ce++) Oe.push({ key: ba(u, f, Ce), day: Ce, empty: !1 });
    return Oe;
  }, [u, f]), N = ($) => d((V) => Math.max(di, Math.min(fi, V + $))), A = ($) => {
    f + $ < 0 ? (d((V) => Math.max(di, V - 1)), p(11)) : f + $ > 11 ? (d((V) => Math.min(fi, V + 1)), p(0)) : p((V) => V + $);
  }, W = () => {
    if (b === null) return;
    const $ = parseInt(b, 10);
    !isNaN($) && $ >= di && $ <= fi && d($), x(null);
  }, K = ($) => n.some((V) => V.startsWith(`${u}-${String($ + 1).padStart(2, "0")}`)), M = Be(), j = B(4, 8, M), v = B(16, 20, M), O = B(10, 11, M), J = B(6, 8, M), Y = B(12, 14, M), q = B(6, 10, M), C = B(12, 14, M), _ = B(8, 12, M), U = B(10, 12, M), oe = B(6, 10, M), he = B(2, 6, M), R = B(64, 80, M), ge = { padding: j }, pe = { width: v, height: v }, ye = { fontSize: O, paddingTop: J, paddingBottom: J }, fe = { fontSize: Y, paddingTop: q, paddingBottom: q }, Q = { fontSize: C, paddingTop: _, paddingBottom: _ }, xe = { fontSize: U, padding: `${he}px ${oe}px` }, D = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", E = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ I("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ I("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(-1) : A(-1),
          style: ge,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Qo, { style: pe })
        }
      ),
      m === "days" ? /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => y("months"),
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
          onChange: ($) => x($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: W,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), W()), $.key === "Escape" && x(null);
          },
          style: { width: R },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(1) : A(1),
          style: ge,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Or, { style: pe })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ I("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: ya.map(($, V) => /* @__PURE__ */ I(
        "button",
        {
          type: "button",
          onClick: () => {
            p(V), y("days");
          },
          style: Q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${V === f ? D : E}`,
          children: [
            $,
            K(V) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${V === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), y("days");
          },
          style: { paddingTop: q, paddingBottom: q, fontSize: Y },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ I("div", { className: "grid grid-cols-7 text-center", children: [
      ga.map(($) => /* @__PURE__ */ h("div", { style: ye, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: $ }, $)),
      k.map(($) => $.empty ? /* @__PURE__ */ h("div", {}, $.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => T($.key),
          style: fe,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${z.has($.key) ? D : E}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ I("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ I("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map(($) => {
        const V = /* @__PURE__ */ new Date($ + "T00:00:00"), Oe = V.getFullYear() === c.getFullYear() ? V.toLocaleString("default", { month: "short", day: "numeric" }) : V.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ I(
          "button",
          {
            type: "button",
            onClick: () => T($),
            "aria-label": `Remove ${Oe}`,
            style: xe,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Oe,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function Yh({
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
  const p = (k) => e instanceof Set ? e.has(k) : e.includes(k), m = Be(), y = B(12, 16, m), b = B(8, 12, m), x = B(12, 14, m), z = B(16, 20, m), T = r != null || i != null;
  return /* @__PURE__ */ I("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    T && /* @__PURE__ */ I("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ h("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ I(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((k) => {
            const N = p(k.id), A = /* @__PURE__ */ h(Pi, { checked: N, size: z });
            return /* @__PURE__ */ I(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(k.id),
                "aria-pressed": N,
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${y}px`, fontSize: x },
                ...k.dataProps,
                children: [
                  u === "leading" && A,
                  k.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: k.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: A })
                ]
              },
              k.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function Uh({
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
  return /* @__PURE__ */ I("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ I(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((y) => {
            const b = e === y.id;
            return /* @__PURE__ */ I(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(y.id),
                className: `ui-checklist-item ${b ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: p },
                children: [
                  /* @__PURE__ */ h("span", { className: "ui-radio-circle", style: { width: m, height: m }, "aria-hidden": !0, children: b && /* @__PURE__ */ h("span", { className: "ui-radio-dot" }) }),
                  y.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: y.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: y.label }),
                  y.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: y.secondary })
                ]
              },
              y.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const Gh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = ur(), { refs: l, floatingStyles: c } = lc({
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
          var z;
          if (i !== "visible") return {};
          const u = (z = a.elements.floating.ownerDocument) == null ? void 0 : z.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), y = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || y <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? p - d.y : r === "bottom" ? y - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + x };
        }
      },
      Zo(o),
      es({ padding: 8 }),
      ts({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (a) => {
          var y;
          const u = (y = a.elements.floating.ownerDocument) == null ? void 0 : y.defaultView;
          if (!u) return {};
          const d = a.rects.floating.width, f = a.rects.floating.height, p = Math.max(8, Math.min(a.x, u.innerWidth - d - 8)), m = Math.max(8, Math.min(a.y, u.innerHeight - f - 8));
          return { x: p, y: m };
        }
      }
    ],
    whileElementsMounted: cc
  });
  return ot(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ I(ct, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Gr(
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
function va(n, e) {
  if (!e || !lt.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Dn = ({ content: n, children: e }) => {
  const t = Xt(), r = Be(), i = B(10, 12, r), o = B(6, 6, r), s = B(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Kn(), a = ur(), [u, d] = te(!1), [f, p] = te({ x: 0, y: 0 }), m = w(null), y = w(null), b = () => {
    if (!m.current) return;
    const T = m.current.getBoundingClientRect();
    p({ x: T.left + T.width / 2, y: T.top });
  };
  se(() => () => {
    y.current && clearTimeout(y.current);
  }, []), se(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]), se(() => {
    var N;
    if (!u) return;
    const T = ((N = m.current) == null ? void 0 : N.ownerDocument) ?? document, k = (A) => {
      m.current && !m.current.contains(A.target) && d(!1);
    };
    return T.addEventListener("pointerdown", k, !0), () => T.removeEventListener("pointerdown", k, !0);
  }, [u]);
  const x = va(e, n), z = Object.keys(x).length > 0 ? lt.cloneElement(e, x) : e;
  return /* @__PURE__ */ I(
    "div",
    {
      ref: m,
      className: "inline-flex",
      onMouseEnter: () => {
        y.current && clearTimeout(y.current), b(), d(!0);
      },
      onMouseLeave: () => {
        y.current = setTimeout(() => d(!1), 60);
      },
      children: [
        z,
        u && Gr(
          /* @__PURE__ */ I(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((T, k) => /* @__PURE__ */ h("div", { className: k > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: T }, k)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, wa = 250;
function ka(n, e, t) {
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
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), wa), a();
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
function ni() {
  const n = Be(), e = We, t = e ? B(28, 40, n) : 28, r = e ? B(28, 40, n) : 28, i = e ? B(10, 14, n) : 10, o = e ? B(10, 14, n) : 10, s = e ? B(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Xh = We ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Sa = We ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", wr = We ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Na = "hover:bg-red-950/50", Qh = We ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Zh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", ep = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ca = We ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", tp = We ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", Rs = We ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ta = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", Ma = We ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", kr = ({ onClick: n, disabled: e, title: t, className: r = Sa, children: i }) => {
  const o = ni();
  return /* @__PURE__ */ h(Dn, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Sr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, np = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const p = Xt(), m = c ?? Pc(p), y = c === "blue" || c === "emerald" ? c : (p == null ? void 0 : p.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": y }, x = ni(), z = Be(), T = s && !We ? 24 : x.control.height, k = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), N = We ? k : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, A = (v) => i ? i(v) : n === v, W = lt.useRef(null), K = lt.useRef([]), M = Math.max(0, e.findIndex((v) => A(v.v))), j = ka(W, K, M);
  return l === "track" ? /* @__PURE__ */ I(
    "div",
    {
      ref: W,
      role: a ? "tablist" : "group",
      "aria-label": f,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${We ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${Sr.wrap}`,
      children: [
        j.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${Sr.pill} ${j.motionClass}`,
            style: { ...j.style, top: 2, bottom: 2 }
          }
        ),
        e.map((v, O) => {
          const J = A(v.v), Y = u && !!v.icon;
          return /* @__PURE__ */ h(
            "button",
            {
              ref: (q) => {
                K.current[O] = q;
              },
              ...v.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(v.v),
              title: v.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? J : void 0,
              "aria-pressed": a ? void 0 : J,
              "aria-label": v.ariaLabel ?? (v.l ? void 0 : v.title),
              style: N,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${Y ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${J ? Sr.active : Sr.idle}`,
              children: /* @__PURE__ */ h(
                xs,
                {
                  icon: v.icon,
                  collapse: Y,
                  iconWithLabel: d,
                  active: J,
                  gap: B(6, 8, z),
                  children: v.l
                }
              )
            },
            v.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ I("div", { ref: W, className: `relative ${Ta} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    j.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${j.motionClass}`,
        style: { ...j.style, top: 0, bottom: 0 }
      }
    ),
    e.map((v, O) => {
      const J = A(v.v);
      return /* @__PURE__ */ I(
        "button",
        {
          ref: (Y) => {
            K.current[O] = Y;
          },
          ...v.dataProps,
          disabled: r,
          onClick: () => t(v.v),
          title: v.title,
          style: { ...x.control, height: T },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${v.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            v.icon,
            v.l
          ]
        },
        v.v
      );
    })
  ] });
}, rp = ({ children: n }) => /* @__PURE__ */ I("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: We ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Ea = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Ia = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", ip = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ I("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? Ea : Ia, children: n }),
  e
] }), op = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ I("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), sp = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ I("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(kr, { onClick: () => r(-1), disabled: n, title: "Move up", className: wr, children: /* @__PURE__ */ h(Xl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(kr, { onClick: () => r(1), disabled: n, title: "Move down", className: wr, children: /* @__PURE__ */ h(Ql, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(kr, { onClick: e, disabled: n, title: "Duplicate", className: wr, children: /* @__PURE__ */ h(Go, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: Rs }),
    /* @__PURE__ */ h(kr, { onClick: t, disabled: n, title: "Delete", className: `${wr} ${Na}`, children: /* @__PURE__ */ h(yi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var yo = Object.defineProperty, Ra = (n, e) => {
  let t = {};
  for (var r in n) yo(t, r, {
    get: n[r],
    enumerable: !0
  });
  return yo(t, Symbol.toStringTag, { value: "Module" }), t;
};
function vt(n) {
  this.content = n;
}
vt.prototype = {
  constructor: vt,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new vt(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new vt(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new vt([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new vt(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new vt(i);
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
    return n = vt.from(n), n.size ? new vt(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = vt.from(n), n.size ? new vt(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = vt.from(n);
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
vt.from = function(n) {
  if (n instanceof vt) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new vt(e);
};
function As(n, e, t) {
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
      return c && c < s.length && c < l.length && Ds(s.charCodeAt(c - 1)) && zs(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = As(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function $s(n, e, t, r) {
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
      return d && f && d < a.length && Ds(a.charCodeAt(d - 1)) && zs(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = $s(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function zs(n) {
  return n >= 56320 && n < 57344;
}
function Ds(n) {
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
        let l = this.content[o], c = s + l.nodeSize;
        c > e && ((s < e || c > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), r.push(l), i += l.nodeSize), s = c;
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
    return As(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return $s(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Nr(0, e);
    if (e == this.size)
      return Nr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Nr(t + 1, o) : Nr(t, r);
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
const hi = { index: 0, offset: 0 };
function Nr(n, e) {
  return hi.index = n, hi.offset = e, hi;
}
function Fr(n, e) {
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
      if (!Fr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Fr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ke = class wi {
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
    return this == e || this.type == e.type && Fr(this.attrs, e.attrs);
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
      return wi.none;
    if (e instanceof wi)
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
    let r = Ps(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new ce(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new ce(Os(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
    return new ce(H.fromJSON(e, t.content), r, i);
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
ce.empty = new ce(H.empty, 0, 0);
function Os(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Os(o.content, e - i - 1, t - i - 1)));
}
function Ps(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Ps(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function Aa(n, e, t) {
  if (t.openStart > n.depth)
    throw new rr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new rr("Inconsistent open depths");
  return Ls(n, e, t, 0);
}
function Ls(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Ls(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Nn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = $a(t, n);
      return Nn(o, Fs(n, s, l, e, r));
    }
  else return Nn(o, Hr(n, e, r));
}
function Bs(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new rr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function ki(n, e, t) {
  let r = n.node(t);
  return Bs(r, e.node(t)), r;
}
function Sn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Zn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (Sn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Sn(i.child(l), r);
  e && e.depth == t && e.textOffset && Sn(e.nodeBefore, r);
}
function Nn(n, e) {
  if (!n.type.validContent(e))
    throw new rr("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Fs(n, e, t, r, i) {
  let o = n.depth > i && ki(n, e, i + 1), s = r.depth > i && ki(t, r, i + 1), l = [];
  return Zn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Bs(o, s), Sn(Nn(o, Fs(n, e, t, r, i + 1)), l)) : (o && Sn(Nn(o, Hr(n, e, i + 1)), l), Zn(e, t, i, l), s && Sn(Nn(s, Hr(t, r, i + 1)), l)), Zn(r, null, i, l), new H(l);
}
function Hr(n, e, t) {
  let r = [];
  if (Zn(null, n, t, r), n.depth > t) {
    let i = ki(n, e, t + 1);
    Sn(Nn(i, Hr(n, e, t + 1)), r);
  }
  return Zn(e, null, t, r), new H(r);
}
function $a(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(H.from(i));
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
        return new jr(this, e, r);
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
    let r = xo.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      xo.set(e, r = new za());
    let i = r.elts[r.i] = ir.resolve(e, t);
    return r.i = (r.i + 1) % Da, i;
  }
}
class za {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Da = 12, xo = /* @__PURE__ */ new WeakMap();
class jr {
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
const Oa = /* @__PURE__ */ Object.create(null);
let Fn = class Si {
  /**
  @internal
  */
  constructor(e, t, r, i = Ke.none) {
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
    return this.type == e && Fr(this.attrs, t || e.defaultAttrs || Oa) && Ke.sameSet(this.marks, r || Ke.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Si(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Si(this.type, this.attrs, this.content, e);
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
    return Aa(this.resolve(e), this.resolve(t), r);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Hs(this.marks, e);
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
    this.type.checkContent(this.content), bo(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ke.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      bo(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
    let i = H.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Fn.prototype.text = void 0;
class _r extends Fn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Hs(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new _r(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new _r(this.type, this.attrs, e, this.marks);
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
function Hs(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function bo(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Mn {
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
    let r = new Pa(e, t);
    if (r.next == null)
      return Mn.empty;
    let i = js(r);
    r.next && r.err("Unexpected trailing text");
    let o = Wa(_a(i));
    return qa(o, r), o;
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
        return H.from(l.map((a) => a.createAndFill()));
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
Mn.empty = new Mn(!0);
class Pa {
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
function js(n) {
  let e = [];
  do
    e.push(La(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function La(n) {
  let e = [];
  do
    e.push(Ba(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Ba(n) {
  let e = ja(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Fa(n, e);
    else
      break;
  return e;
}
function vo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Fa(n, e) {
  let t = vo(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = vo(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Ha(n, e) {
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
function ja(n) {
  if (n.eat("(")) {
    let e = js(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Ha(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function _a(n) {
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
function _s(n, e) {
  return e - n;
}
function wo(n, e) {
  let t = [];
  return r(e), t.sort(_s);
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
function Wa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(wo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        wo(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Mn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(_s);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function qa(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ws(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function qs(n, e) {
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
function Js(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Ka(n, r, e[r]);
  return t;
}
class or {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Js(e, r.attrs), this.defaultAttrs = Ws(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Mn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : qs(this.attrs, e);
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
    return new Fn(this, this.computeAttrs(e), H.from(t), Ke.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = H.from(t), this.checkContent(t), new Fn(this, this.computeAttrs(e), t, Ke.setFrom(r));
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
    return o ? new Fn(this, e, t.append(o), Ke.setFrom(r)) : null;
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
    e.forEach((o, s) => r[o] = new or(o, t, s));
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
function Ja(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Ka {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Ja(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ri {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Js(e, i.attrs), this.excluded = null;
    let o = Ws(this.attrs);
    this.instance = o ? new Ke(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ke(this, qs(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new ri(o, i++, t, s)), r;
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
class Va {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = vt.from(e.nodes), t.marks = vt.from(e.marks || {}), this.nodes = or.compile(this.spec.nodes, this), this.marks = ri.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Mn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? ko(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : ko(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Fn.fromJSON(this, i), this.markFromJSON = (i) => Ke.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof or) {
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
    return new _r(r, r.defaultAttrs, e, Ke.setFrom(t));
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
function ko(n, e) {
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
function Ya(n) {
  return n.tag != null;
}
function Ua(n) {
  return n.style != null;
}
class Hn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Ya(i))
        this.tags.push(i);
      else if (Ua(i)) {
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
    let r = new No(this, t, !1);
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
    let r = new No(this, t, !0);
    return r.addAll(e, Ke.none, t.from, t.to), ce.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Qa(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = Co(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = Co(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new Hn(e, Hn.schemaRules(e)));
  }
}
const Ks = {
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
}, Ga = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Vs = { ol: !0, ul: !0 }, sr = 1, Ni = 2, er = 4;
function So(n, e, t) {
  return e != null ? (e ? sr : 0) | (e === "full" ? Ni : 0) : n && n.whitespace == "pre" ? sr | Ni : t & ~er;
}
class Cr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ke.none, this.match = o || (s & er ? null : e.contentMatch);
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
    if (!(this.options & sr)) {
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
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ks.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class No {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = So(null, t.preserveWhitespace, 0) | (r ? er : 0);
    i ? o = new Cr(i.type, i.attrs, Ke.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Cr(null, null, Ke.none, !0, null, s) : o = new Cr(e.schema.topNodeType, null, Ke.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Ni ? "full" : this.localPreserveWS || (i.options & sr) > 0, { schema: s } = this.parser;
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
    Vs.hasOwnProperty(s) && this.parser.normalizeLists && Xa(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Ga.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Ks.hasOwnProperty(s))
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
        (o.type ? o.type.allowsMarkType(l.type) : To(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = So(e, o, s.options);
    s.options & er && s.content.length == 0 && (l |= er);
    let c = Ke.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : To(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new Cr(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= sr);
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
function Xa(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Vs.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Qa(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Co(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function To(n, e) {
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
const Ys = 65535, Us = Math.pow(2, 16);
function Za(n, e) {
  return n + e * Us;
}
function Mo(n) {
  return n & Ys;
}
function eu(n) {
  return (n - (n & Ys)) / Us;
}
const Gs = 1, Xs = 2, $r = 4, Qs = 8;
class Ci {
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
    return (this.delInfo & Qs) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Gs | $r)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Xs | $r)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & $r) > 0;
  }
}
class Bt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Bt.empty)
      return Bt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Mo(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + eu(e);
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
        let m = e == (t < 0 ? c : d) ? null : Za(l / 3, e - c), y = 0;
        return a && (y |= e == c ? Xs : e == d ? Gs : $r, (t < 0 ? e != c : e != d) && (y |= Qs)), new Ci(p, y, m);
      }
      i += u - a;
    }
    return r ? e + i : new Ci(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Mo(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Bt(this.ranges, !this.inverted);
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
    return e == 0 ? Bt.empty : new Bt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Bt.empty = new Bt([]);
class Wr {
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
    return new Wr(this._maps, this.mirror, e, t);
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
    let e = new Wr();
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
    return r ? e : new Ci(e, i, null);
  }
}
const pi = /* @__PURE__ */ Object.create(null);
class ht {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Bt.empty;
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
    let r = pi[t.stepType];
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
    if (e in pi)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return pi[e] = t, t.prototype.jsonID = e, t;
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
      if (o instanceof rr)
        return at.fail(o.message);
      throw o;
    }
  }
}
function Ji(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Ji(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return H.fromArray(r);
}
class rn extends ht {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ce(Ji(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return at.fromReplace(e, this.from, this.to, o);
  }
  invert(e) {
    let t = [];
    return e.nodesBetween(this.from, this.to, (r, i) => {
      if (r.isInline && r.isAtom) {
        let o = this.mark.addToSet(r.marks);
        if (!Ke.sameSet(o, r.marks)) {
          let s = Math.max(this.from, i), l = Math.min(this.to, i + r.nodeSize);
          qr(Yt, s, l, this.mark, t);
          for (let c of r.marks)
            c.isInSet(o) || qr(rn, s, l, c, t);
        }
      }
    }), t.length == 1 ? t[0] : new Cn(t);
  }
  map(e) {
    let t = e.map(this.from, 1), r = e.map(this.to, -1);
    return t >= r ? null : new rn(t, r, this.mark);
  }
  merge(e) {
    return e instanceof rn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new rn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new rn(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ht.jsonID("addMark", rn);
class Yt extends ht {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new ce(Ji(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return at.fromReplace(e, this.from, this.to, r);
  }
  invert(e) {
    let t = [];
    return e.nodesBetween(this.from, this.to, (r, i) => {
      r.isInline && r.isAtom && this.mark.isInSet(r.marks) && qr(rn, Math.max(this.from, i), Math.min(this.to, i + r.nodeSize), this.mark, t);
    }), t.length == 1 ? t[0] : new Cn(t);
  }
  map(e) {
    let t = e.map(this.from, 1), r = e.map(this.to, -1);
    return t >= r ? null : new Yt(t, r, this.mark);
  }
  merge(e) {
    return e instanceof Yt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Yt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Yt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ht.jsonID("removeMark", Yt);
function qr(n, e, t, r, i) {
  let o = i.length ? i[i.length - 1] : null;
  o && o instanceof n && o.to == e && o.mark.eq(r) ? i[i.length - 1] = new n(o.from, t, r) : i.push(new n(e, t, r));
}
class Cn extends ht {
  constructor(e) {
    super(), this.steps = e;
  }
  apply(e) {
    for (let t of this.steps) {
      let r = t.apply(e);
      if (!r.doc)
        return r;
      e = r.doc;
    }
    return new at(e, null);
  }
  invert(e) {
    return new Cn(this.steps.map((t) => t.invert(e)));
  }
  map(e) {
    let t = [];
    for (let r of this.steps) {
      let i = r.map(e);
      i && t.push(i);
    }
    return t.length ? new Cn(t) : null;
  }
  toJSON() {
    return { stepType: "markSet", steps: this.steps.map((e) => e.toJSON()) };
  }
  static fromJSON(e, t) {
    if (!Array.isArray(t.steps) || !t.steps.every((r) => r.stepType == "addMark" || r.stepType == "removeMark"))
      throw new RangeError("Invalid JSON for MarkSetStep");
    return new Cn(t.steps.map((r) => ht.fromJSON(e, r)));
  }
}
ht.jsonID("markSet", Cn);
class pn extends ht {
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
    return at.fromReplace(e, this.pos, this.pos + 1, new ce(H.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new pn(this.pos, t.marks[i]);
        return new pn(this.pos, this.mark);
      }
    }
    return new En(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new pn(t.pos, this.mark);
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
    return new pn(t.pos, e.markFromJSON(t.mark));
  }
}
ht.jsonID("addNodeMark", pn);
class En extends ht {
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
    return at.fromReplace(e, this.pos, this.pos + 1, new ce(H.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new pn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new En(t.pos, this.mark);
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
    return new En(t.pos, e.markFromJSON(t.mark));
  }
}
ht.jsonID("removeNodeMark", En);
class ut extends ht {
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
    return this.structure && Ti(e, this.from, this.to) ? at.fail("Structure replace would overwrite content") : at.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Bt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new ut(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && ut.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new ut(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof ut) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? ce.empty : new ce(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ut(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? ce.empty : new ce(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new ut(e.from, this.to, t, this.structure);
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
    return new ut(t.from, t.to, ce.fromJSON(e, t.slice), !!t.structure);
  }
}
ut.MAP_BIAS = 1;
ht.jsonID("replace", ut);
class pt extends ht {
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
    if (this.structure && (Ti(e, this.from, this.gapFrom) || Ti(e, this.gapTo, this.to)))
      return at.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return at.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? at.fromReplace(e, this.from, this.to, r) : at.fail("Content does not fit in gap");
  }
  getMap() {
    return new Bt([
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
    return new pt(t.from, t.to, t.gapFrom, t.gapTo, ce.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
ht.jsonID("replaceAround", pt);
function Ti(n, e, t) {
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
function tu(n, e, t, r) {
  let i = [];
  n.doc.nodesBetween(e, t, (o, s, l) => {
    if (!o.isInline)
      return;
    let c = o.marks;
    if (!r.isInSet(c) && l.type.allowsMarkType(r.type)) {
      let a = Math.max(s, e), u = Math.min(s + o.nodeSize, t);
      qr(rn, a, u, r, i);
    }
  }), i.forEach((o) => n.step(o));
}
function nu(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline || !s.isAtom)
      return;
    o++;
    let c = null;
    if (r instanceof ri) {
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
  }), i.forEach((s) => n.step(new Yt(s.from, s.to, s.style)));
}
function Ki(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new ut(l, u, ce.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new Yt(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new ce(H.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new ut(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(H.empty, !0);
    n.replace(l, l, new ce(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function ru(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Vn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !ru(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function iu(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = H.empty, d = 0;
  for (let m = o, y = !1; m > t; m--)
    y || r.index(m) > 0 ? (y = !0, u = H.from(r.node(m).copy(u)), d++) : c--;
  let f = H.empty, p = 0;
  for (let m = o, y = !1; m > t; m--)
    y || i.after(m + 1) < i.end(m) ? (y = !0, f = H.from(i.node(m).copy(f)), p++) : a++;
  n.step(new pt(c, a, s, l, new ce(u.append(f), d, p), u.size - d, !0));
}
function Zs(n, e, t = null, r = n) {
  let i = ou(n, e), o = i && su(r, e);
  return o ? i.map(Eo).concat({ type: e, attrs: t }).concat(o.map(Eo)) : null;
}
function Eo(n) {
  return { type: n, attrs: null };
}
function ou(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function su(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function lu(n, e, t) {
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
  n.step(new pt(i, o, i, o, new ce(r, 0, 0), t.length, !0));
}
function cu(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && au(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && tl(n, s, l, o), Ki(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new pt(d, f, d + 1, f - 1, new ce(H.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && el(n, s, l, o), !1;
    }
  });
}
function el(n, e, t, r) {
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
function tl(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function au(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function uu(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new pt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ce(H.from(s), 0, 0), 1, !0));
}
function sn(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let a = i.depth - 1, u = t - 2; a > o; a--, u--) {
    let d = i.node(a), f = i.index(a);
    if (d.type.spec.isolating)
      return !1;
    let p = d.content.cutByIndex(f, d.childCount), m = r && r[u + 1];
    m && (p = p.replaceChild(0, m.type.create(m.attrs)));
    let y = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !y.type.validContent(p))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function du(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = H.empty, s = H.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = H.from(i.node(l).copy(o));
    let u = r && r[a];
    s = H.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new ut(e, e, new ce(o.append(s), t, t), !0));
}
function In(n, e) {
  let t = n.resolve(e), r = t.index();
  return nl(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function fu(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function nl(n, e) {
  return !!(n && e && !n.isLeaf && fu(n, e));
}
function ii(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && nl(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function hu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    tl(n, u.node(), u.before(), l);
  }
  s.inlineContent && Ki(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new ut(a, c.map(e + t, -1), ce.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    el(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function pu(n, e, t) {
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
function oi(n, e, t = e, r = ce.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return rl(i, o, r) ? new ut(e, t, r) : new mu(i, o, r).fit();
}
function rl(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class mu {
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
    return e > -1 ? new pt(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new ut(r.pos, i.pos, c) : null;
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
        r ? (o = Io(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(H.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced;
    return Ro(e, -1) <= t ? !1 : (this.unplaced.size > 1 && Ro(e, 1) > r && r++, this.unplaced = new ce(e, t + 1, r), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Io(e, t);
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
      for (let y = 0; y < o.length; y++)
        this.openFrontierNode(o[y]);
    let s = this.unplaced, l = r ? r.content : s.content, c = s.openStart - e, a = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let y = 0; y < i.childCount; y++)
        u.push(i.child(y));
      d = d.matchFragment(i);
    }
    let p = l.size + e - (s.content.size - s.openEnd);
    for (; a < l.childCount; ) {
      let y = l.child(a), b = d.matchType(y.type);
      if (!b)
        break;
      a++, (a > 1 || c == 0 || y.content.size) && (d = b, u.push(il(y.mark(f.allowedMarks(y.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Qn(this.placed, t, H.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let y = 0, b = l; y < p; y++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? ce.empty : new ce(Xn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new ce(Xn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !mi(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = mi(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = mi(e, l, a, c, !0);
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
    i.match = i.match.matchType(e), this.placed = Qn(this.placed, this.depth, H.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(H.empty, !0);
    t.childCount && (this.placed = Qn(this.placed, this.frontier.length, t));
  }
}
function Xn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Xn(n.firstChild.content, e - 1, t)));
}
function Qn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Qn(n.lastChild.content, e - 1, t)));
}
function Io(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function il(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, il(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(H.empty, !0)))), n.copy(r);
}
function mi(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !gu(t, o.content, s) ? l : null;
}
function gu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function yu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Ro(n, e) {
  for (let t = 0; ; t++) {
    let r = e < 0 ? n.firstChild : n.lastChild;
    if (!r || r.isAtom)
      return t;
    n = r.content;
  }
}
function xu(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (rl(i, o, r))
    return n.step(new ut(e, t, r));
  let s = sl(i, o);
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
    let p = a[f], m = yu(p.type);
    if (m && !p.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (m || !p.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let p = (f + u + 1) % (r.openStart + 1), m = a[p];
    if (m)
      for (let y = 0; y < s.length; y++) {
        let b = s[(y + c) % s.length], x = !0;
        b < 0 && (x = !1, b = -b);
        let z = i.node(b - 1), T = i.index(b - 1);
        if (z.canReplaceWith(T, T, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new ce(ol(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function ol(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(ol(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(H.empty, !0));
  }
  return n;
}
function bu(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = pu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new ce(H.from(r), 0, 0));
}
function vu(n, e, t) {
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
  let o = sl(r, i);
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
function sl(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class jn extends ht {
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
    return at.fromReplace(e, this.pos, this.pos + 1, new ce(H.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Bt.empty;
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
ht.jsonID("attr", jn);
class lr extends ht {
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
    return Bt.empty;
  }
  invert(e) {
    return new lr(this.attr, e.attrs[this.attr]);
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
    return new lr(t.attr, t.value);
  }
}
ht.jsonID("docAttr", lr);
let Wn = class extends Error {
};
Wn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Wn.prototype = Object.create(Error.prototype);
Wn.prototype.constructor = Wn;
Wn.prototype.name = "TransformError";
class wu {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Wr();
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
      throw new Wn(t.failed);
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
    let i = oi(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new ce(H.from(r), 0, 0));
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
    return xu(this, e, t, r), this;
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
    return bu(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return vu(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return iu(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return hu(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return lu(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return cu(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return uu(this, e, t, r, i), this;
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
    return this.step(new lr(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new pn(e, t)), this;
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
      t.isInSet(r.marks) && this.step(new En(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new En(e, o)), i = o.removeFromSet(i);
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
    return du(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return tu(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return nu(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Ki(this, e, t, r), this;
  }
}
const gi = /* @__PURE__ */ Object.create(null);
class it {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new ku(e.min(t), e.max(t))];
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
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? ce.empty : t), l == 0 && zo(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), zo(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Ot(e) : On(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? On(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : On(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Jt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return On(e, e, 0, 0, 1) || new Jt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return On(e, e, e.content.size, e.childCount, -1) || new Jt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = gi[t.type];
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
    if (e in gi)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return gi[e] = t, t.prototype.jsonID = e, t;
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
    return Ot.between(this.$anchor, this.$head).getBookmark();
  }
}
it.prototype.visible = !0;
class ku {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Ao = !1;
function $o(n) {
  !Ao && !n.parent.inlineContent && (Ao = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Ot extends it {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    $o(e), $o(t), super(e, t);
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
    return new Ot(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = ce.empty) {
    if (super.replace(e, t), t == ce.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Ot && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new si(this.anchor, this.head);
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
    return new Ot(e.resolve(t.anchor), e.resolve(t.head));
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
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (it.findFrom(e, -r, !0) || it.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Ot(e, t);
  }
}
it.jsonID("text", Ot);
class si {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new si(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Ot.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Ue extends it {
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
    return r ? it.near(o) : new Ue(o);
  }
  content() {
    return new ce(H.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Ue && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Vi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Ue(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Ue(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Ue.prototype.visible = !1;
it.jsonID("node", Ue);
class Vi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new si(r, r) : new Vi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Ue.isSelectable(r) ? new Ue(t) : it.near(t);
  }
}
class Jt extends it {
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
    return new Jt(e);
  }
  map(e) {
    return new Jt(e);
  }
  eq(e) {
    return e instanceof Jt;
  }
  getBookmark() {
    return Su;
  }
}
it.jsonID("all", Jt);
const Su = {
  map() {
    return this;
  },
  resolve(n) {
    return new Jt(n);
  }
};
function On(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Ot.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Ue.isSelectable(l))
        return Ue.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = On(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function zo(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof ut || i instanceof pt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(it.near(n.doc.resolve(s), t));
}
function Do(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Tr {
  constructor(e, t, r) {
    this.name = e, this.init = Do(t.init, r), this.apply = Do(t.apply, r);
  }
}
new Tr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new Tr("selection", {
  init(n, e) {
    return n.selection || it.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new Tr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new Tr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const ll = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function cl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const al = (n, e, t) => {
  let r = cl(n, t);
  if (!r)
    return !1;
  let i = Yi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Vn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (xl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (qn(o, "end") || Ue.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = oi(n.doc, r.before(s), r.after(s), ce.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(qn(o, "end") ? it.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Ue.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Nu = (n, e, t) => {
  let r = cl(n, t);
  if (!r)
    return !1;
  let i = Yi(r);
  return i ? ul(n, i, e) : !1;
}, Cu = (n, e, t) => {
  let r = fl(n, t);
  if (!r)
    return !1;
  let i = Ui(r);
  return i ? ul(n, i, e) : !1;
};
function ul(n, e, t) {
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
  let a = oi(n.doc, o, c, ce.empty);
  if (!a || a.from != o || a instanceof ut && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Ot.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function qn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const dl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Yi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Ue.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ue.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Yi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function fl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const hl = (n, e, t) => {
  let r = fl(n, t);
  if (!r)
    return !1;
  let i = Ui(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (xl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (qn(o, "start") || Ue.isSelectable(o))) {
    let s = oi(n.doc, r.before(), r.after(), ce.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(qn(o, "start") ? it.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Ue.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, pl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Ui(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Ue.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ue.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Ui(n) {
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
const Tu = (n, e) => {
  let t = n.selection, r = t instanceof Ue, i;
  if (r) {
    if (t.node.isTextblock || !In(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = ii(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Ue.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Mu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Ue) {
    if (t.node.isTextblock || !In(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ii(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Eu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Vn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, ml = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Gi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Iu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Gi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(it.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, gl = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Jt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Gi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Ot.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, yl = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (sn(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Vn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function Ru(n) {
  return (e, t) => {
    if (e.selection instanceof Ue && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !sn(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Ot || e.selection instanceof Jt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Gi(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
        break;
      } else {
        if (p == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = sn(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = sn(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let p = r.mapping.slice(o), m = p.map(i.before(l)), y = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(y.index(), y.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Au = Ru(), $u = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Ue.create(n.doc, i))), !0);
};
function zu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || In(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function xl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && zu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = H.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = H.from(s[x].create(null, m));
      m = H.from(i.copy(m));
      let y = n.tr.step(new pt(e.pos - 1, p, e.pos, p, new ce(m, 1, 0), s.length, !0)), b = y.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && In(y.doc, b.pos) && y.join(b.pos), t(y.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : it.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Vn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && qn(o, "start", !0) && qn(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let y = o, b = 1;
    for (; !y.isTextblock; y = y.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, y.content)) {
      if (t) {
        let x = H.empty;
        for (let T = m.length - 1; T >= 0; T--)
          x = H.from(m[T].copy(x));
        let z = n.tr.step(new pt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new ce(x, m.length, 0), 0, !0));
        t(z.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function bl(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Ot.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Du = bl(-1), Ou = bl(1);
function Pu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Zs(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Oo(n, e = null) {
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
function Xi(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Xi(ll, al, dl);
Xi(ll, hl, pl);
Xi(ml, gl, yl, Au);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Lu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Bu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Bu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new jr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new jr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Zs(o, t, r, e);
  return l ? (n && Fu(n, e, l, i, t), !0) : !1;
}
function Fu(n, e, t, r, i) {
  let o = H.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = H.from(t[u].type.create(t[u].attrs, o));
  n.step(new pt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ce(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && l && sn(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function Jr(n, e) {
  return n instanceof or ? e == n : n.indexOf(e) > -1;
}
function Hu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && Jr(n, s.firstChild.type));
    return o ? t ? Jr(n, r.node(o.depth - 1).type) ? ju(e, t, o) : _u(e, t, o) : !0 : !1;
  };
}
function ju(n, e, t) {
  let r = n.tr, i = t.end, o = t.$to.end(t.depth), s = t.parent.child(t.endIndex - 1).type;
  i < o && (r.step(new pt(i - 1, o, i, o, new ce(H.from(s.create(null, t.parent.copy())), 1, 0), 1, !0)), t = new jr(r.doc.resolve(t.$from.pos), r.doc.resolve(o), t.depth));
  const l = Vn(t);
  if (l == null)
    return !1;
  r.lift(t, l);
  let c = r.doc.resolve(r.mapping.map(i, -1) - 1);
  return In(r.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && r.join(c.pos), e(r.scrollIntoView()), !0;
}
function _u(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, y = t.startIndex; m > y; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? H.empty : H.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new pt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new ce((l ? H.empty : H.from(i.copy(H.empty))).append(c ? H.empty : H.from(i.copy(H.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Wu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (a) => a.childCount > 0 && Jr(n, a.firstChild.type));
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, c = l.child(s - 1);
    if (!Jr(n, c.type))
      return !1;
    if (t) {
      let a = c.lastChild && c.lastChild.type == l.type, u = H.from(a ? c.lastChild.lastChild.type.create() : null), d = new ce(H.from(c.type.create(null, H.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new pt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function vl(n) {
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
var qu = class wl {
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
      ...Object.fromEntries(Object.entries(r).map(([f, p]) => [f, (...y) => {
        const b = this.buildProps(a, t), x = p(...y)(b);
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
    const e = wl.createFakeChain();
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
      state: vl({
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
const Ju = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Ku = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Vu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = Vn(p);
      if (l.type.isTextblock) {
        const { defaultType: y } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, y);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Yu = (n) => (e) => n(e), Uu = () => ({ state: n, dispatch: e }) => gl(n, e), Gu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Rt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Xu = () => ({ tr: n, dispatch: e }) => {
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
function Ct(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Qu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Ct(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Zu = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, ed = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Po = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return ed(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, td = (n, e, t) => ({
  from: Po(n, t, "left"),
  to: Po(e, t, "right")
}), nd = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = n.selection instanceof Rt ? n.selection.$from.marksAcross(n.selection.$to) : null, o = t.steps.length;
    r.forEach((s) => {
      const l = t.mapping.slice(o), c = t.doc.resolve(l.map(s.$from.pos)), a = t.doc.resolve(l.map(s.$to.pos)), { from: u, to: d } = td(c, a, n.schema);
      t.deleteRange(u, d);
    }), t.selection.empty || t.setSelection(Rt.near(t.doc.resolve(t.selection.from))), i && t.ensureMarks(i), t.scrollIntoView(), e(t);
  }
  return !0;
}, rd = () => ({ commands: n }) => n.keyboardShortcut("Enter"), id = () => ({ state: n, dispatch: e }) => Iu(n, e);
function od(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Kr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : od(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function kl(n, e, t = {}) {
  return n.find((r) => r.type === e && Kr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Lo(n, e, t = {}) {
  return !!kl(n, e, t);
}
function Sl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!kl([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Lo([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Lo([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function bn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const sd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = bn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = Sl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Rt.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, ld = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function Nl(n) {
  return n instanceof Rt;
}
function kn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function cd(n, e = null) {
  if (!e) return null;
  const t = Bn.atStart(n), r = Bn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Rt.create(n, kn(0, i, o), kn(n.content.size, i, o)) : Rt.create(n, kn(e, i, o), kn(e, i, o));
}
function Bo() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Vr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function ad() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const ud = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Vr() || Bo()) && r.dom.focus(), ad() && !Vr() && !Bo() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !Nl(t.state.selection))
    return s(), !0;
  const l = cd(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, dd = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), fd = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), Cl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Cl(r);
  }
  return n;
};
function Mr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Cl(t);
}
function Tl(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Jn(n, e, t) {
  if (Tl(n)) return n;
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
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Jn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Va({
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
      if (t.slice ? Hn.fromSchema(c).parseSlice(Mr(n), t.parseOptions) : Hn.fromSchema(c).parse(Mr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Hn.fromSchema(e);
    return t.slice ? o.parseSlice(Mr(n), t.parseOptions).content : o.parse(Mr(n), t.parseOptions);
  }
  return Jn("", e, t);
}
function Ml(n) {
  return !("type" in n);
}
function El(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof ut || i instanceof pt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Bn.near(n.doc.resolve(s), t));
}
const hd = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
    const m = Ml(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let y;
    if (f)
      Array.isArray(e) ? y = e.map((b) => b.text || "").join("") : Tl(e) ? y = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? y = e.text : y = e, r.insertText(y, u, d);
    else {
      y = H.from(m);
      const b = r.doc.resolve(u), x = b.node(), z = b.parentOffset === 0, T = x.isText || x.isTextblock, k = x.content.size > 0;
      z && T && k && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && El(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: y
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: y
    });
  }
  return !0;
};
function Il(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const pd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = Il(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = Jn(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && El(e, e.steps.length - 1, -1)), !0) : !1;
}, md = () => ({ state: n, dispatch: e }) => Tu(n, e), gd = () => ({ state: n, dispatch: e }) => Mu(n, e), yd = () => ({ state: n, dispatch: e }) => al(n, e), xd = () => ({ state: n, dispatch: e }) => hl(n, e), Rl = (n, e) => {
  const t = n.resolve(e), r = t.nodeBefore, i = t.nodeAfter;
  return !r || !i ? !1 : !r.type.spec.isolating && !i.type.spec.isolating;
}, bd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ii(n.doc, n.selection.$from.pos, -1);
    return r == null || !Rl(n.doc, r) ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, vd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ii(n.doc, n.selection.$from.pos, 1);
    return r == null || !Rl(n.doc, r) ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, wd = () => ({ state: n, dispatch: e }) => Nu(n, e), kd = () => ({ state: n, dispatch: e }) => Cu(n, e);
function Al() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Sd(n) {
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
      Vr() || Al() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Nd = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Sd(n).split(/-(?!$)/), s = o.find((a) => ![
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
function Qi(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Ct(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), p = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: p
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Kr(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const Cd = (n, e = {}) => ({ state: t, dispatch: r }) => Qi(t, Ct(n, t.schema), e) ? Eu(t, r) : !1, Td = () => ({ state: n, dispatch: e }) => yl(n, e), Md = (n) => ({ state: e, dispatch: t }) => {
  const r = Ct(n, e.schema);
  return Hu(r)(e, t);
}, Ed = () => ({ state: n, dispatch: e }) => ml(n, e);
function $l(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Fo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Id = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = $l(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ct(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, Fo(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(Fo(f.attrs, e))));
      });
    });
  }), c;
}, Rd = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Ad = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new mc(n.doc);
    n.setSelection(t);
  }
  return !0;
}, $d = () => ({ state: n, dispatch: e }) => dl(n, e), zd = () => ({ state: n, dispatch: e }) => pl(n, e), Dd = () => ({ state: n, dispatch: e }) => $u(n, e), Od = () => ({ state: n, dispatch: e }) => Ou(n, e), Pd = () => ({ state: n, dispatch: e }) => Du(n, e);
function Ld(n, e, t = {}, r = {}) {
  return Jn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Bd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Ld(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = Ml(a) ? a.content : [a];
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
function Fd(n, e) {
  const t = bn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Hd(n, e) {
  const t = new wu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function jd(n, e) {
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
function Zi(n) {
  return (e) => jd(e.$from, n);
}
function cr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? cr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? cr(n.parent, e, t) : null
  }) : n.config[e];
}
function zl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function _d(n) {
  return typeof n == "function";
}
function Mi(n, e = void 0, ...t) {
  return _d(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Wd(n, e, t) {
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
function qd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Jd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Kd(n) {
  const e = Jd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Vd(n) {
  const { mapping: e, steps: t } = n, r = [], i = e.invert();
  return e.maps.forEach((o, s) => {
    const l = [];
    if (o.ranges.length)
      o.forEach((a, u) => {
        l.push({
          from: a,
          to: u
        });
      });
    else {
      const { from: a, to: u } = t[s];
      if (a === void 0 || u === void 0) return;
      l.push({
        from: a,
        to: u
      });
    }
    const c = e.slice(s);
    l.forEach(({ from: a, to: u }) => {
      const d = c.map(a, -1), f = c.map(u), p = i.map(d, -1), m = i.map(f);
      r.push({
        oldRange: {
          from: p,
          to: m
        },
        newRange: {
          from: d,
          to: f
        }
      });
    });
  }), Kd(r);
}
function zr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Yd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? bn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Kr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, y) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, y), x = Math.min(p, y + m.nodeSize), z = x - b;
      s += z, l.push(...m.marks.map((T) => ({
        mark: T,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Kr(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function Gn(n, e) {
  const { nodeExtensions: t } = zl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Mi(cr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Dl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Dl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Ud(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (Nl(r) && (i = r.$cursor), i) {
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
        const p = !f || f.type.allowsMarkType(t), m = !!t.isInSet(u.marks) || !u.marks.some((y) => y.type.excludes(t));
        a = p && m;
      }
      return !a;
    }), a;
  });
}
const Gd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = bn(n, r.schema);
  if (i)
    if (s) {
      const a = Fd(r, c);
      t.addStoredMark(c.create({
        ...a,
        ...e
      }));
    } else l.forEach((a) => {
      const u = a.$from.pos, d = a.$to.pos;
      r.doc.nodesBetween(u, d, (f, p) => {
        const m = Math.max(p, u), y = Math.min(p + f.nodeSize, d);
        f.marks.find((b) => b.type === c) ? f.marks.forEach((b) => {
          c === b.type && t.addMark(m, y, c.create({
            ...b.attrs,
            ...e
          }));
        }) : t.addMark(m, y, c.create(e));
      });
    });
  return Ud(r, t, c);
}, Xd = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Qd = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Ct(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Oo(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Oo(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Zd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = kn(n, 0, r.content.size), o = _n.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, ef = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, tf = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Rt.atStart(r).from, l = Rt.atEnd(r).to, c = kn(i, s, l), a = kn(o, s, l), u = Rt.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, nf = (n) => ({ state: e, dispatch: t }) => {
  const r = Ct(n, e.schema);
  return Wu(r)(e, t);
};
function Ho(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const rf = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = zr(a, l.node().type.name, l.node().attrs);
  if (o instanceof _n && o.node.isBlock)
    return !l.parentOffset || !sn(s, l.pos) ? !1 : (r && (n && Ho(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : Il(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0;
  const m = o instanceof Rt && !o.empty ? pc.create({
    doc: e.doc,
    selection: o
  }).tr.deleteSelection() : null, y = m ? m.doc : e.doc, b = m ? m.mapping.map(l.pos) : l.pos;
  let x = sn(y, b, 1, p);
  if (!p && !x && sn(y, b, 1, f ? [{ type: f }] : void 0) && (x = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (x) {
      const z = e.steps.length;
      if (o instanceof Rt && e.deleteSelection(), e.split(e.mapping.slice(z).map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f) {
        const T = e.mapping.slice(z).map(l.before()), k = e.doc.resolve(T);
        l.node(-1).canReplaceWith(k.index(), k.index() + 1, f) && e.setNodeMarkup(e.mapping.slice(z).map(l.before()), f);
      }
    }
    n && Ho(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return x;
}, of = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Ct(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let k = H.empty;
      const N = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let v = l.depth - N; v >= l.depth - 3; v -= 1) k = H.from(l.node(v).copy(k));
      const A = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, W = {
        ...zr(d, l.node().type.name, l.node().attrs),
        ...e
      }, K = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(W)) || void 0;
      k = k.append(H.from(s.createAndFill(null, K) || void 0));
      const M = l.before(l.depth - (N - 1));
      t.replace(M, l.after(-A), new ce(k, 4 - N, 0));
      let j = -1;
      t.doc.nodesBetween(M, t.doc.content.size, (v, O) => {
        if (j > -1) return !1;
        v.isTextblock && v.content.size === 0 && (j = O + 1);
      }), j > -1 && t.setSelection(Rt.near(t.doc.resolve(j))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...zr(d, u.type.name, u.attrs),
    ...e
  }, y = {
    ...zr(d, l.node().type.name, l.node().attrs),
    ...e
  }, b = l.parentOffset === 0 && l.index(-1) === 0, x = l.before(-1);
  t.delete(l.pos, c.pos);
  const z = b ? u.attrs : m, T = p ? [{
    type: s,
    attrs: z
  }, {
    type: p,
    attrs: y
  }] : [{
    type: s,
    attrs: z
  }];
  if (!sn(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: k, storedMarks: N } = r, { splittableMarks: A } = o.extensionManager, W = N || k.$to.parentOffset && k.$from.marks();
    if (t.split(l.pos, 2, T).scrollIntoView(), b && t.setNodeMarkup(x, void 0, m), !W || !i) return !0;
    const K = W.filter((M) => A.includes(M.type.name));
    t.ensureMarks(K);
  }
  return !0;
};
function Ol(n, e, t) {
  if (!n.validContent(e)) return null;
  try {
    return n.create(t, e);
  } catch {
    return null;
  }
}
function eo(n, e) {
  if (n.pendingContent.length === 0) return !0;
  const t = Ol(e, H.from(n.pendingContent));
  return t ? (n.items.push(t), n.pendingContent = [], !0) : !1;
}
function sf(n, e, t) {
  return t.validContent(H.from([...e.pendingContent, n])) ? (e.pendingContent.push(n), !0) : !eo(e, t) || !t.validContent(H.from(n)) ? !1 : (e.pendingContent.push(n), !0);
}
function lf(n, e, t, r) {
  const i = r(n, t);
  if (!i) return !1;
  const o = Ol(t.listType, H.from(i), n.attrs);
  return o ? t.itemType.validContent(H.from([...e.pendingContent, o])) ? (e.pendingContent.push(o), !0) : eo(e, t.itemType) ? (e.items.push(...i), !0) : !1 : !1;
}
function cf(n, e, t) {
  const r = {
    items: [],
    pendingContent: []
  };
  for (let i = 0; i < n.childCount; i += 1) {
    const o = n.child(i);
    if (!(e.isListNode(o) ? lf(o, r, e, t) : sf(o, r, e.itemType))) return null;
  }
  return eo(r, e.itemType) ? r.items : null;
}
function Pl(n, e) {
  const t = [];
  for (let r = 0; r < n.childCount; r += 1) {
    const i = cf(n.child(r), e, Pl);
    if (!i) return null;
    t.push(...i);
  }
  return t;
}
function jo(n, e) {
  let t = null;
  return n.descendants((r, i) => r !== e ? !0 : (t = i, !1)), t;
}
function _o(n) {
  return !n || n === "1" ? null : n;
}
function Ll(n, e) {
  return _o(n) === _o(e);
}
const Er = (n, e) => {
  const t = Zi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && In(n.doc, t.pos)) || !Ll(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, Ir = (n, e) => {
  const t = Zi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && In(n.doc, r)) || !Ll(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function af(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Rt.between(r, i);
}
const uf = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = Ct(n, s.schema), m = Ct(e, s.schema), { selection: y, storedMarks: b } = s, { $from: x, $to: z } = y, T = x.blockRange(z), k = b || y.$to.parentOffset && y.$from.marks();
  if (!T) return !1;
  const N = Zi((Y) => Gn(Y.type.name, d))(y), A = y.from === 0 && y.to === s.doc.content.size, W = s.doc.content.content, K = W.length === 1 ? W[0] : null, M = A && K && Gn(K.type.name, d) ? {
    node: K,
    pos: 0
  } : null, j = N ?? M, v = !!N && T.depth >= 1 && T.depth - N.depth <= 1, O = !!M;
  if ((v || O) && j) {
    if (j.node.type === p)
      return A && O ? c().command(({ tr: Y, dispatch: q }) => {
        const C = af(Y);
        return C ? (Y.setSelection(C), q && q(Y), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (Gn(j.node.type.name, d) && p.validContent(j.node.content)) return c().command(() => (o.setNodeMarkup(j.pos, p), !0)).command(() => Er(o, p)).command(() => Ir(o, p)).run();
    if (Gn(j.node.type.name, d)) {
      var J;
      const Y = (J = j.node.firstChild) === null || J === void 0 ? void 0 : J.type;
      if (Y && Y !== m) {
        const q = Pl(j.node, {
          listType: p,
          itemType: m,
          isListNode: (_) => Gn(_.type.name, d)
        }), C = q ? H.from(q) : null;
        return !C || !p.validContent(C) ? !1 : c().command(() => {
          const { $anchor: _, $head: U } = o.selection, oe = _.parent, he = U.parent, R = _.parentOffset, ge = U.parentOffset;
          let pe;
          try {
            pe = p.create(r, C);
          } catch {
            return !1;
          }
          if (o.replaceWith(j.pos, j.pos + j.node.nodeSize, pe), oe.inlineContent && he.inlineContent) {
            const ye = jo(pe, oe), fe = jo(pe, he);
            if (ye !== null && fe !== null) {
              const Q = j.pos + ye + 2 + R, xe = j.pos + fe + 2 + ge;
              o.setSelection(Rt.create(o.doc, Q, xe));
            }
          }
          return !0;
        }).command(() => Er(o, p)).command(() => Ir(o, p)).run();
      }
    }
  }
  return !t || !k || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => Er(o, p)).command(() => Ir(o, p)).run() : c().command(() => {
    const Y = u().wrapInList(p, r), q = k.filter((C) => f.includes(C.type.name));
    return o.ensureMarks(q), Y ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => Er(o, p)).command(() => Ir(o, p)).run();
}, df = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = bn(n, r.schema);
  return Yd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, ff = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Ct(n, r.schema), s = Ct(e, r.schema), l = Qi(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, hf = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Ct(n, t.schema);
  return Qi(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, pf = () => ({ state: n, dispatch: e }) => {
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
}, mf = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, gf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = bn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = Sl(c, l, (d = c.marks().find((y) => y.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, yf = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, xf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = $l(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ct(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    const u = a.$from.pos, d = a.$to.pos;
    let f, p, m, y;
    t.selection.empty ? r.doc.nodesBetween(u, d, (b, x) => {
      o && o === b.type && (c = !0, m = Math.max(x, u), y = Math.min(x + b.nodeSize, d), f = x, p = b);
    }) : r.doc.nodesBetween(u, d, (b, x) => {
      x < u && o && o === b.type && (c = !0, m = Math.max(x, u), y = Math.min(x + b.nodeSize, d), f = x, p = b), x >= u && x <= d && (o && o === b.type && (c = !0, i && t.setNodeMarkup(x, void 0, {
        ...b.attrs,
        ...e
      })), s && b.marks.length && b.marks.forEach((z) => {
        if (s === z.type && (c = !0, i)) {
          const T = Math.max(x, u), k = Math.min(x + b.nodeSize, d);
          t.addMark(T, k, s.create({
            ...z.attrs,
            ...e
          }));
        }
      }));
    }), p && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...p.attrs,
      ...e
    }), s && p.marks.length && p.marks.forEach((b) => {
      s === b.type && i && t.addMark(m, y, s.create({
        ...b.attrs,
        ...e
      }));
    }));
  }), c;
}, bf = new Kt("__tiptap_decorations__"), vf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(bf, {
  type: "force",
  name: n
}), !0), wf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ct(n, t.schema);
  return Pu(i, e)(t, r);
}, kf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ct(n, t.schema);
  return Lu(i, e)(t, r);
};
var Sf = /* @__PURE__ */ Ra({
  blur: () => Ju,
  clearContent: () => Ku,
  clearNodes: () => Vu,
  command: () => Yu,
  createParagraphNear: () => Uu,
  cut: () => Gu,
  deleteCurrentNode: () => Xu,
  deleteNode: () => Qu,
  deleteRange: () => Zu,
  deleteSelection: () => nd,
  enter: () => rd,
  exitCode: () => id,
  extendMarkRange: () => sd,
  first: () => ld,
  focus: () => ud,
  forEach: () => dd,
  insertContent: () => fd,
  insertContentAt: () => hd,
  insertDefaultBlock: () => pd,
  joinBackward: () => yd,
  joinDown: () => gd,
  joinForward: () => xd,
  joinItemBackward: () => bd,
  joinItemForward: () => vd,
  joinTextblockBackward: () => wd,
  joinTextblockForward: () => kd,
  joinUp: () => md,
  keyboardShortcut: () => Nd,
  lift: () => Cd,
  liftEmptyBlock: () => Td,
  liftListItem: () => Md,
  newlineInCode: () => Ed,
  resetAttributes: () => Id,
  scrollIntoView: () => Rd,
  selectAll: () => Ad,
  selectNodeBackward: () => $d,
  selectNodeForward: () => zd,
  selectParentNode: () => Dd,
  selectTextblockEnd: () => Od,
  selectTextblockStart: () => Pd,
  setContent: () => Bd,
  setMark: () => Gd,
  setMeta: () => Xd,
  setNode: () => Qd,
  setNodeSelection: () => Zd,
  setTextDirection: () => ef,
  setTextSelection: () => tf,
  sinkListItem: () => nf,
  splitBlock: () => rf,
  splitListItem: () => of,
  toggleList: () => uf,
  toggleMark: () => df,
  toggleNode: () => ff,
  toggleWrap: () => hf,
  undoInputRule: () => pf,
  unsetAllMarks: () => mf,
  unsetMark: () => gf,
  unsetTextDirection: () => yf,
  updateAttributes: () => xf,
  updateDecorations: () => vf,
  wrapIn: () => wf,
  wrapInList: () => kf
});
typeof process < "u" && process.env.NODE_ENV;
function Nf(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Rr(n) {
  return Nf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Bl(n, e) {
  const t = { ...n };
  return Rr(n) && Rr(e) && Object.keys(e).forEach((r) => {
    Rr(e[r]) && Rr(n[r]) ? t[r] = Bl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Fl = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Mi(cr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Mi(cr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Bl(this.options, n)
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
}, Cf = class Hl extends Fl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Hl(t);
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
}, Wt = class jl extends Fl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new jl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
Wt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new cn({
      key: new Kt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = qd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => Wd(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Wt.create({
  name: "commands",
  addCommands() {
    return { ...Sf };
  }
});
Wt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Hd(n.before, [n, ...e]);
      Vd(c).forEach((u) => {
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
        if (u instanceof Yt) {
          var f, p;
          const m = a.slice(d).map(u.from, -1), y = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(y), z = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((k) => k.eq(u.mark)) : !1, T = (p = c.doc.nodeAt(y)) === null || p === void 0 ? void 0 : p.marks.some((k) => k.eq(u.mark));
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
              to: y
            },
            partial: !!(T || z),
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
Wt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new cn({
      key: new Kt("tiptapDrop"),
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
Wt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new cn({
      key: new Kt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Tf = new Kt("focusEvents");
Wt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new cn({
      key: Tf,
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
Wt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, y = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = y && m.parent.childCount === 1 ? b === d.pos : Bn.atStart(a).from === f;
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
    return Vr() || Al() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new cn({
      key: new Kt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Bn.atStart(e.doc).from, a = Bn.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !Dl(t.doc)) return;
        const u = t.tr, d = vl({
          state: t,
          transaction: u
        }), { commands: f } = new qu({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
Wt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new cn({
      key: new Kt("tiptapPaste"),
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
Wt.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new cn({
      key: new Kt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Wt.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = zl(this.extensions);
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
    return [new cn({
      key: new Kt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Mf = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Ef = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), If = /^(https?:\/\/|mailto:)/i;
function Rf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Ef.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function Ei(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(Ei(c));
    return l;
  };
  if (!Mf.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!If.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Rf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Ei(l));
  return i;
}
function _l(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Af(n) {
  const e = _l(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Ei(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function lp(n) {
  const e = _l(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function cp(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function $f(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Wo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const zf = { text: "#52525b" }, Df = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? zf, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    dc,
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
        const y = i.state.doc.resolve(m), b = y.nodeAfter;
        b && _n.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new _n(y))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, Of = Tc.extend({
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
    return uc(Df);
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
    return ["span", ac({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), Pf = 240, Lf = 280, Bf = ({ props: n, onApi: e }) => {
  const t = ei(), r = w(e);
  r.current = e, se(() => {
    r.current(t);
  }, [t]);
  const i = w(null);
  se(() => {
    var s;
    t.pointerDriven || ln((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), se(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Zr();
  return /* @__PURE__ */ h(fr.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Lf, maxHeight: Pf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        Ff,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Ff = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Cs({
    label: () => n.label,
    activate: t
  }), s = Be(), l = { padding: `${B(8, 12, s)}px ${B(12, 16, s)}px`, fontSize: B(12, 14, s) };
  return /* @__PURE__ */ I(
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
}, qo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(Bf, { props: r, onApi: (i) => {
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
      const o = Mc(i);
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
}, Hf = Cf.create({
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
}), Dr = new Kt("retainedSelectionHighlight"), jf = Wt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new cn({
        key: Dr,
        state: {
          init: () => ({ held: !1, decorations: xr.empty }),
          apply(n, e) {
            const t = n.getMeta(Dr), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: xr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? xr.empty : xr.create(n.doc, [gc.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Dr.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), ap = {
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
function Wl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function _f(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Wl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Wf = lt.forwardRef(({
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
  const y = w(a);
  y.current = a;
  const b = w(u);
  b.current = u;
  const x = w(null), z = w(null), T = w(e);
  T.current = e;
  const k = w(r);
  k.current = r;
  const N = w(o);
  N.current = o;
  const A = w(null), W = (O) => {
    var pe;
    const J = O.getAttributes("textStyle"), Y = O.getAttributes("reportTextStyle"), { from: q, to: C, empty: _ } = O.state.selection;
    let U = !1, oe = !1, he = !1;
    if (!_) {
      const ye = /* @__PURE__ */ new Set(), fe = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
      O.state.doc.nodesBetween(q, C, (xe) => {
        if (!xe.isText) return;
        const D = xe.marks.find(($) => $.type.name === "textStyle");
        ye.add((D == null ? void 0 : D.attrs.fontFamily) || ""), fe.add((D == null ? void 0 : D.attrs.fontSize) || "");
        const E = xe.marks.find(($) => $.type.name === "reportTextStyle");
        Q.add((E == null ? void 0 : E.attrs.styleId) || "");
      }), U = ye.size > 1, oe = fe.size > 1, he = Q.size > 1;
    }
    const R = {
      bold: O.isActive("bold"),
      italic: O.isActive("italic"),
      underline: O.isActive("underline"),
      strike: O.isActive("strike"),
      link: O.isActive("link"),
      color: J.color || "",
      fontFamily: J.fontFamily || "",
      fontSize: J.fontSize || "",
      textStyle: Y.styleId || "",
      hasSelection: !_,
      fontFamilyMixed: U,
      fontSizeMixed: oe,
      textStyleMixed: he
    }, ge = A.current;
    ge && ge.bold === R.bold && ge.italic === R.italic && ge.underline === R.underline && ge.strike === R.strike && ge.link === R.link && ge.color === R.color && ge.fontFamily === R.fontFamily && ge.fontSize === R.fontSize && ge.textStyle === R.textStyle && ge.hasSelection === R.hasSelection && ge.fontFamilyMixed === R.fontFamilyMixed && ge.fontSizeMixed === R.fontSizeMixed && ge.textStyleMixed === R.textStyleMixed || (A.current = R, (pe = N.current) == null || pe.call(N, R));
  }, K = (O) => {
    var _;
    const J = O.state.selection;
    let Y = null;
    J instanceof _n && J.node.type.name === "token" ? (Y = { key: J.node.attrs.field ?? "", pos: J.from }, x.current = J.from) : x.current != null && (x.current = O.state.tr.mapping.map(x.current));
    const q = z.current, C = q && Y && q.key === Y.key && q.pos === Y.pos;
    !q && !Y || C || (z.current = Y, (_ = b.current) == null || _.call(b, Y));
  }, M = (O) => {
    const J = Af($f(O));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(J) ? "" : J;
  }, j = lt.useMemo(() => {
    const O = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: q }) => {
        var C;
        return ((C = p.current) == null ? void 0 : C.call(p, q)) ?? [];
      },
      command: ({ editor: q, range: C, props: _ }) => {
        q.chain().focus().insertContentAt(C, { type: "token", attrs: { field: _.field } }).run();
      },
      render: qo
    }, J = Of.configure({
      resolve: f.current ?? null,
      suggestion: O,
      onTokenClick: (q, C, _) => {
        var U;
        x.current = _, (U = y.current) == null || U.call(y, q, C, _);
      }
    }), Y = Wt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Cc({
            pluginKey: new Kt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: q, range: C }) => Wl(q, C.from) != null,
            items: ({ editor: q, query: C }) => {
              var U;
              const _ = _f(q);
              return _ ? ((U = m.current) == null ? void 0 : U.call(m, _.chipKey, C)) ?? [] : [];
            },
            command: ({ editor: q, range: C, props: _ }) => {
              q.chain().focus().insertContentAt(C, { type: "token", attrs: { field: _.field } }).run();
            },
            render: qo
          })
        ];
      }
    });
    return [J, Y];
  }, []), v = fc({
    immediatelyRender: !1,
    extensions: [
      yc,
      xc.configure({ placeholder: t }),
      bc,
      vc,
      wc,
      Hf,
      jf,
      kc,
      Nc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Sc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...j
    ],
    content: Wo(n || ""),
    editable: !r,
    onUpdate: ({ editor: O }) => {
      T.current(M(O.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: O }) => {
      W(O), K(O);
    }
  });
  return se(() => {
    if (!v || v.isFocused) return;
    M(v.getHTML()) !== n && (A.current = null, v.commands.setContent(Wo(n || ""), { emitUpdate: !1 }), W(v));
  }, [n, v]), se(() => {
    v && v.setEditable(!r);
  }, [r, v]), se(() => {
    v && (A.current = null, W(v), K(v));
  }, [v]), Uo(d, () => ({
    exec: (O, J, Y) => {
      if (!v || k.current) return;
      const q = v.chain(), C = (Y == null ? void 0 : Y.focus) === !1 ? q : q.focus();
      switch (O) {
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
          J && C.setColor(J).run();
          break;
        case "unsetColor":
          C.unsetColor().run();
          break;
        case "fontFamily":
          J && C.setFontFamily(J).run();
          break;
        case "unsetFontFamily":
          C.unsetFontFamily().run();
          break;
        case "fontSize":
          J && C.setFontSize(J).run();
          break;
        case "unsetFontSize":
          C.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          J && C.setMark("reportTextStyle", { styleId: J }).unsetFontFamily().unsetFontSize().run();
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
          J && C.extendMarkRange("link").setLink({ href: J }).run();
          break;
        case "unlink":
          C.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (O) => v == null ? void 0 : v.commands.focus(O),
    insertToken: (O) => {
      !v || k.current || v.chain().focus().insertContent({ type: "token", attrs: { field: O } }).run();
    },
    replaceToken: (O) => {
      if (!v || k.current) return;
      const J = x.current;
      J != null && v.commands.command(({ tr: Y }) => {
        const q = Y.doc.nodeAt(J);
        if (!q || q.type.name !== "token") return !1;
        Y.setNodeMarkup(J, void 0, { field: O });
        const C = Y.doc.resolve(J);
        return C.nodeAfter && C.nodeAfter.type.name === "token" && Y.setSelection(new _n(C)), !0;
      });
    },
    holdSelectionHighlight: (O) => {
      !v || v.isDestroyed || v.view.dispatch(v.state.tr.setMeta(Dr, { held: O }));
    }
  }), [v]), /* @__PURE__ */ h(hc, { editor: v, className: `richtext-editor ${i || ""}` });
});
Wf.displayName = "RichTextEditor";
const qf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Jf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Jo = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Kf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = te(!1);
  return /* @__PURE__ */ h(
    ti,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ I("button", { type: "button", disabled: e, className: `${Ma} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(mn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: qf.map((s) => /* @__PURE__ */ h(ea, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(ar, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Vf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = te(!1), o = ni(), [s, l] = te(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    ti,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ h(
        Dt,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ h(nc, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ I("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: Ca + " w-full"
          }
        ),
        /* @__PURE__ */ I("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(Dt, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ h(
            Dt,
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
}, up = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = te(!1), d = (b, x) => {
    var z;
    return (z = n.current) == null ? void 0 : z.exec(b, x);
  }, f = ni(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", y = c ? /* @__PURE__ */ h("div", { className: Rs }) : null;
  return /* @__PURE__ */ I("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ I("div", { className: m, children: [
      /* @__PURE__ */ h(Dn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(Dt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(Dn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(Dt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(Dn, { content: "Underline", children: /* @__PURE__ */ h(Dt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Zl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(Dn, { content: "Strikethrough", children: /* @__PURE__ */ h(Dt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(ec, { className: "w-3 h-3" }) }) })
    ] }),
    y,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(Vf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    y,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      ti,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ I(Dt, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Jo, {}),
          /* @__PURE__ */ h(mn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ I("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ h(Jo, { className: "w-3.5 h-3.5" })
            }
          ),
          Jf.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ I(ct, { children: [
      y,
      /* @__PURE__ */ I("div", { className: m, children: [
        o && /* @__PURE__ */ h(Kf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(Dn, { content: "Clear formatting", children: /* @__PURE__ */ h(
          Dt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(tc, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ I(ct, { children: [
      y,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function to(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Yf(n, e, t, r, i) {
  return to(n + e * i, t, r);
}
const Uf = 2;
function Gf(n, e, t, r, i) {
  return to(n + Math.trunc(e / Uf) * i, t, r);
}
const Xf = 3;
function dp({
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
  const [p, m] = te(null), [y, b] = te(!1), x = w(!1), z = w(null), T = w(null), k = w(null), N = Be(), A = Es(), W = a === void 0;
  se(() => () => {
    var C;
    return (C = z.current) == null ? void 0 : C.call(z);
  }, []), ot(() => {
    const C = k.current, _ = T.current;
    !W && C && _ && (_.style.color = getComputedStyle(C).color);
  }, [W, a]), se(() => {
    x.current || m(null);
  }, [n]);
  const K = n ?? r, M = p !== null ? p : n != null ? String(n) : d ? "" : String(r), j = (C) => to(C, e, t), v = (C) => {
    const _ = Yf(K, C, e, t, o);
    _ !== K && (x.current && m(String(_)), i(_));
  }, O = (C) => {
    if (l || s || C.pointerType !== "mouse" || C.button !== 0) return;
    const _ = C.currentTarget, U = C.clientY, oe = K;
    let he = oe, R = !1;
    const ge = (ye) => {
      const fe = U - ye.clientY;
      if (!R) {
        if (Math.abs(fe) < Xf) return;
        R = !0, _.blur(), _.style.userSelect = "none";
      }
      const Q = Gf(oe, fe, e, t, o);
      Q !== he && (he = Q, i(Q));
    }, pe = () => {
      z.current = null, window.removeEventListener("pointermove", ge), window.removeEventListener("pointerup", pe), window.removeEventListener("pointercancel", pe), _.style.userSelect = "", R && _.blur();
    };
    z.current = pe, window.addEventListener("pointermove", ge), window.addEventListener("pointerup", pe), window.addEventListener("pointercancel", pe);
  }, J = (C) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": C === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (C === 1 ? K >= t : K <= e),
    /* Keep the input's focus (desktop) WITHOUT killing the tap: WebKit
       suppresses the click when a pointerdown's default is cancelled, so an
       iPhone/iPad stepper tap went dead. `mousedown` preserves the focus but
       does not cancel the click. */
    onMouseDown: (_) => _.preventDefault(),
    onClick: () => v(C)
  }), Y = W ? B(22, 30, N) : B(16, 22, N), q = W ? B(14, 18, N) : B(11, 15, N);
  return /* @__PURE__ */ I(
    "span",
    {
      ref: T,
      className: `ui-number ${W ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: k,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: M,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...W ? { ...A, minHeight: B(28, 36, N) } : {},
              paddingRight: Y + 2,
              cursor: l || s ? void 0 : y ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (C) => {
              const _ = C.target.value;
              m(_);
              const U = parseInt(_, 10);
              _ !== "" && !Number.isNaN(U) && i(j(U));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const C = parseInt(p, 10);
              Number.isNaN(C) || i(j(C)), m(null);
            },
            onKeyDown: (C) => {
              C.key === "Enter" && C.target.blur(), C.key === "Escape" && (m(null), C.target.blur()), !s && !l && (C.key === "ArrowUp" || C.key === "ArrowDown") && (C.preventDefault(), v(C.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: O
          }
        ),
        /* @__PURE__ */ I("span", { className: "ui-number-steppers", style: { width: Y }, children: [
          /* @__PURE__ */ h("button", { ...J(1), className: "ui-number-step", children: /* @__PURE__ */ h(rc, { style: { width: q, height: q } }) }),
          /* @__PURE__ */ h("button", { ...J(-1), className: "ui-number-step", children: /* @__PURE__ */ h(mn, { style: { width: q, height: q } }) })
        ] })
      ]
    }
  );
}
function fp({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = Be(), f = gn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = B(14, 16, d), m = { width: p, height: p }, y = B(10, 12, d);
  return /* @__PURE__ */ I("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ I("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ I(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Or, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(mn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
            e && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ h("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: n }),
            t && /* @__PURE__ */ h("span", { className: "ui-card-count shrink-0", style: { fontSize: y }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ h("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ h("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
function no({
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
  const d = w(null), f = w(null), [p, m] = te(null), y = (A) => {
    d.current = A, typeof o == "function" ? o(A) : o && (o.current = A);
  };
  ot(() => {
    if (n) return;
    const A = d.current;
    if (!A || (f.current = A.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const W = new ResizeObserver(() => {
      f.current = A.getBoundingClientRect().width;
    });
    return W.observe(A), () => W.disconnect();
  }, [n]), ot(() => {
    if (!n || e !== "auto") {
      m(null);
      return;
    }
    m(f.current);
    const A = requestAnimationFrame(() => m(null));
    return () => cancelAnimationFrame(A);
  }, [n, e]);
  const [b, x] = te(!1), [z, T] = te(null), k = w(!1);
  ot(() => {
    if (n) {
      k.current = !0, x(!1), T(null);
      return;
    }
    if (!k.current || e !== "auto") return;
    k.current = !1, x(!0);
    let A = 0, W = 0;
    return (() => {
      var v;
      const M = (v = d.current) == null ? void 0 : v.firstElementChild, j = (M == null ? void 0 : M.getBoundingClientRect().width) ?? 0;
      j > 0 ? (A = requestAnimationFrame(() => T(j)), W = window.setTimeout(() => {
        x(!1), T(null);
      }, xn + 30)) : x(!1);
    })(), () => {
      cancelAnimationFrame(A), window.clearTimeout(W);
    };
  }, [n, e]);
  const N = n ? p ?? t : b ? z ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ I(
    "div",
    {
      ...u,
      ref: y,
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
function Qf({
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
  stretch: y = !1,
  actions: b,
  leadingIcon: x,
  showClear: z = !0,
  onSubmit: T,
  onCancel: k,
  cancelOnEscape: N = !1,
  cancelOnOutside: A = !1,
  className: W = "",
  "aria-label": K
}) {
  const [M, j] = te(p), v = w(M);
  v.current = M;
  const O = w(null), J = w(null), Y = w(null), q = rs(), C = Be(), _ = B(9, 13, C), U = ie((E) => {
    v.current !== E && (v.current = E, j(E), m == null || m(E));
  }, [m]), oe = ie((E = !1) => {
    var $;
    U(!1), ($ = J.current) == null || $.blur(), E && requestAnimationFrame(() => {
      var V;
      return (V = Y.current) == null ? void 0 : V.focus();
    });
  }, [U]), he = ie(() => {
    U(!0);
    const E = J.current;
    if (E) {
      E.focus({ preventScroll: !0 });
      const $ = E.value.length;
      E.setSelectionRange($, $);
    }
  }, [U]);
  se(() => {
    p && he();
  }, [p, he]), se(() => {
    var V;
    if (!M) return;
    const E = ((V = O.current) == null ? void 0 : V.ownerDocument) ?? document, $ = (Oe) => {
      var me;
      const Ce = Oe.target;
      Ce && ((me = O.current) != null && me.contains(Ce) || (A && (k == null || k()), oe()));
    };
    return E.addEventListener("pointerdown", $, !0), () => E.removeEventListener("pointerdown", $, !0);
  }, [M, oe, A, k]);
  const R = ie((E) => {
    var V;
    if (!M) return;
    const $ = E.relatedTarget;
    $ && ((V = O.current) != null && V.contains($)) || (A && (k == null || k()), oe());
  }, [M, oe, A, k]), ge = ie((E) => {
    if (E.key === "Enter") {
      E.preventDefault(), T == null || T(n), oe(!0);
      return;
    }
    E.key === "Escape" && (E.preventDefault(), E.stopPropagation(), N ? k == null || k() : e(""), oe(!0));
  }, [e, oe, N, k, T, n]), pe = r === void 0 ? /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5" }) : r, ye = x === void 0 ? pe : x, xe = 8 + (((b == null ? void 0 : b.length) || 0) + (z && n ? 1 : 0)) * (q.box + 2), D = (E) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: q.icon, height: q.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: E
    }
  );
  return /* @__PURE__ */ h(
    no,
    {
      expanded: M,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: O,
      shrink: !0,
      stretch: y,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": M ? "true" : "false",
      className: W,
      onBlur: R,
      trigger: /* @__PURE__ */ h(
        Dt,
        {
          ref: Y,
          type: "button",
          variant: l,
          size: "minimal",
          theme: d,
          icon: pe,
          collapse: c,
          iconWithLabel: a,
          revealOnHover: u,
          active: f,
          keepLabelOnActive: !0,
          onClick: he,
          className: `${c ? "w-auto" : "w-full"} ${y ? "justify-center" : "justify-start"} ${M ? "pointer-events-none" : ""}`,
          tabIndex: M ? -1 : 0,
          "aria-expanded": M,
          "aria-label": K || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ I(ct, { children: [
        ye && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: _, width: q.icon, height: q.icon },
            children: D(ye)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: J,
            value: n,
            onChange: (E) => e(E.target.value),
            onKeyDown: ge,
            placeholder: i,
            "aria-label": K || i,
            tabIndex: M ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: ye ? _ + q.icon + 6 : 10, paddingRight: xe },
            className: `${Br("sm")} w-full`
          }
        ),
        /* @__PURE__ */ I("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          b == null ? void 0 : b.map((E) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": E.label,
              title: E.label,
              tabIndex: M ? 0 : -1,
              onMouseDown: ($) => $.preventDefault(),
              onClick: () => {
                E.onClick(n, { close: () => oe(!0) }), E.keepOpen || oe(!0);
              },
              style: { width: q.box, height: q.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": E.key,
              children: D(E.icon)
            },
            E.key
          )),
          z && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: M ? 0 : -1,
              onClick: () => {
                var E;
                e(""), (E = J.current) == null || E.focus({ preventScroll: !0 });
              },
              style: { width: q.box, height: q.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(Tn, { size: q.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function hp({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(Ur, { className: "w-3.5 h-3.5" }),
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
  }, y = () => {
    o == null || o(), l && c("");
  }, b = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ h(ar, { className: "w-3.5 h-3.5" }),
      onClick: m
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ h(Tn, { className: "w-3.5 h-3.5" }),
      onClick: y
    }] : []
  ];
  return /* @__PURE__ */ h(
    Qf,
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
      onCancel: o ? y : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function Zf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function eh(n, e, t) {
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
function ql(n, e, t) {
  const r = Zf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = eh(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function th(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = ql(n.items, n.groups, n.query), i = [];
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
function nh({
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
  expandableGroups: y = !1,
  browseExpanded: b = !1,
  groupExpandMode: x = "multiple",
  browseAll: z = !1,
  selectedId: T,
  autoFocus: k = !0,
  collapsedWidth: N = 128,
  expandedWidth: A = 288,
  panelWidth: W,
  panelMinWidth: K,
  keepAllRows: M = !1,
  maxMenuHeight: j = 420,
  theme: v = "light",
  morph: O = !0,
  emptyTitle: J,
  emptyHint: Y,
  renderEmpty: q,
  emptyActions: C,
  leadingActions: _,
  hideLeadingOnEmpty: U = !1,
  footerActions: oe,
  fieldActions: he,
  multiple: R,
  open: ge,
  onOpenChange: pe,
  hideTrigger: ye = !1,
  anchorRef: fe,
  portalTarget: Q,
  renderTrigger: xe,
  renderItem: D,
  highlightOnOpen: E = !0,
  ref: $
}) {
  const V = c !== void 0, [Oe, Ce] = te(""), me = V ? c : Oe, qe = ie((g) => {
    V || Ce(g), a == null || a(g);
  }, [V, a]), Me = ge !== void 0, [Pe, Le] = te(!1), ne = Me ? ge : Pe, Fe = ie((g) => {
    Me || Le(g), pe == null || pe(g);
  }, [Me, pe]), [ke, Ze] = te(t === "inline"), wt = rt(() => e.map((g) => g.key).join("\0"), [e]), we = rt(() => new Set(wt ? wt.split("\0") : []), [wt]), [Ve, mt] = te(() => b ? we : /* @__PURE__ */ new Set()), [Ae, Qt] = te(0), qt = w(!1), Ft = w(null), Tt = w(null), Ee = ie((g, P = "keyboard") => {
    qt.current = P === "pointer", Qt(g);
  }, []), Je = w(null), kt = w(null), At = w(null), st = w(null), $t = w(null), He = w(0), et = Ri(), zt = Kn(), gt = Zr(), Mt = Fi(), Ht = ws(), je = rs(), X = 8 + (((he == null ? void 0 : he.length) || 0) + (me ? 1 : 0)) * (je.box + 2), [de, Ge] = te({ top: 0, left: 0, maxH: 288, ready: !1 }), [tt, St] = te(0);
  us({
    anchorRef: fe ?? Je,
    panelRef: st,
    open: ne,
    maxHeight: j,
    anchorRectRef: $t,
    onPosition: (g) => Ge({ top: g.top, left: g.left, maxH: g.maxH, ready: g.ready })
  }), se(() => {
    const g = (fe == null ? void 0 : fe.current) ?? Je.current;
    !ne || !g || St(g.getBoundingClientRect().width);
  }, [ne, ke, fe]);
  const [Et, S] = te(!1);
  se(() => {
    ne && S(!0);
  }, [ne]);
  const Z = Qr({
    visible: ne,
    morph: O,
    anchor: () => {
      var g;
      return ((g = (fe == null ? void 0 : fe.current) ?? Je.current) == null ? void 0 : g.getBoundingClientRect()) ?? null;
    },
    ref: st,
    cloneOnUnmount: !0,
    onClosed: () => S(!1)
  }), le = (C || []).map(
    (g) => typeof g.label == "function" ? g.label(me) : g.label
  ), re = rt(
    () => th({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: M ? "" : me,
      browseGroups: m || b || y,
      browseAll: z,
      expandedGroups: Ve,
      emptyActionLabels: le
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, me, M, m, b, y, z, Ve, le.join("\0")]
  ), ve = rt(
    () => (_ || []).map((g, P) => ({
      kind: "action",
      label: typeof g.label == "function" ? g.label(me) : g.label,
      actionIndex: P,
      source: "leading"
    })),
    [_, me]
  ), Ie = rt(
    () => (oe || []).map((g, P) => ({
      kind: "action",
      label: typeof g.label == "function" ? g.label(me) : g.label,
      actionIndex: P,
      source: "footer"
    })),
    [oe, me]
  ), _e = re.some((g) => g.kind === "empty"), Re = ve.length > 0 && !(U && _e), Te = Re ? ve.length : 0, dt = rt(
    () => [...Re ? ve : [], ...re, ...Ie],
    [Re, ve, re, Ie]
  ), nt = !!d || y && !me.trim(), It = rt(
    () => dt.map((g, P) => ({ row: g, index: P })).filter((g) => !(g.row.kind === "empty" || g.row.kind === "item" && g.row.hidden || g.row.kind === "group" && !nt)),
    [dt, nt]
  ), yt = (y || b) && !me.trim(), $e = !!R, Vt = rt(
    () => n.filter((g) => g.checkable !== !1).map((g) => g.id),
    [n]
  ), Zt = rt(() => me.trim() ? ql(n, e, me).hits.filter((g) => g.item.checkable !== !1).map((g) => g.item.id) : Vt, [n, e, me, Vt]), vn = rt(() => new Set(Zt), [Zt]), Ne = ms({
    mode: (R == null ? void 0 : R.mode) ?? "draft",
    selectedIds: (R == null ? void 0 : R.selectedIds) ?? ys,
    itemIds: Vt,
    visibleIds: Zt,
    max: R == null ? void 0 : R.max,
    disabledIds: R == null ? void 0 : R.disabledIds,
    indicator: R == null ? void 0 : R.indicator,
    onCommit: R == null ? void 0 : R.onCommit,
    onDraftChange: R == null ? void 0 : R.onDraftChange,
    onToggle: R == null ? void 0 : R.onToggle
  }), an = w(Ne.reset);
  an.current = Ne.reset;
  const Rn = typeof (R == null ? void 0 : R.commitLabel) == "function" ? R.commitLabel(Ne.count) : (R == null ? void 0 : R.commitLabel) ?? `Select ${Ne.count}`, Nt = ie(() => {
    var g;
    Fe(!1), t === "expandable" && ((g = kt.current) == null || g.blur(), Ze(!1), requestAnimationFrame(() => {
      var P;
      return (P = At.current) == null ? void 0 : P.focus();
    })), Me || qe(""), Ee(0), mt(b ? we : /* @__PURE__ */ new Set()), f == null || f();
  }, [t, f, qe, b, we, Me, Fe]);
  se(() => {
    if (me.trim() || !b) {
      mt((g) => g.size ? /* @__PURE__ */ new Set() : g);
      return;
    }
    mt((g) => g.size === we.size && [...we].every((P) => g.has(P)) ? g : we);
  }, [me, b, we]);
  const un = w(!1), ft = w(!1);
  se(() => {
    if (!ne) {
      un.current = !1;
      return;
    }
    if (un.current || !y || me.trim()) return;
    const g = T ? [T] : [...(R == null ? void 0 : R.selectedIds) ?? []], P = new Set(g), G = P.size ? e.filter((ue) => n.some((Se) => Se.group === ue.key && P.has(Se.id))).map((ue) => ue.key) : [];
    if (G.length === 0) {
      un.current = !0;
      return;
    }
    const ee = x === "single" ? G.slice(0, 1) : G;
    if (!ee.every((ue) => Ve.has(ue))) {
      ft.current = !0, mt(new Set(ee));
      return;
    }
    if (E && T) {
      const ue = dt.findIndex((Se) => Se.kind === "item" && Se.hit.item.id === T);
      ue >= 0 && Ee(ue);
    }
    un.current = !0;
  }, [ne, y, me, e, n, T, R == null ? void 0 : R.selectedIds, x, Ve, dt, E, Ee]);
  const Pt = ie((g) => {
    mt((P) => {
      const G = new Set(P);
      return G.has(g) ? G.delete(g) : (x === "single" && G.clear(), G.add(g)), G;
    });
  }, [x]), Lt = ie(() => {
    var P;
    if (ne) {
      (P = kt.current) == null || P.focus();
      return;
    }
    if (an.current(), t === "expandable" && !ke) {
      const G = Je.current;
      if (G) {
        const ee = G.style.transition, ue = G.style.width;
        G.style.transition = "none", G.style.width = `${A}px`;
        const Se = G.getBoundingClientRect();
        $t.current = { left: Se.left, top: Se.top, width: Se.width, height: Se.height }, G.style.width = ue, G.offsetWidth, G.style.transition = ee, window.clearTimeout(He.current), He.current = window.setTimeout(() => {
          $t.current = null;
        }, xn + 80);
      }
    }
    Ze(!0), Fe(!0);
    const g = T ? re.findIndex((G) => G.kind === "item" && G.hit.item.id === T) : -1;
    Ee(g >= 0 ? Te + g : E ? Te : -1);
  }, [ne, t, ke, A, Te, re, T, E]);
  se(() => () => {
    window.clearTimeout(He.current), $t.current = null;
  }, []), se(() => {
    ne || (Ft.current = null), Tt.current = null;
  }, [ne, me]), ot(() => {
    var g;
    t !== "expandable" || !ke || !ne || !k || (g = kt.current) == null || g.focus({ preventScroll: !0 });
  }, [t, ke, ne, k]), se(() => {
    var G;
    if (!ne) return;
    const g = ((G = Je.current) == null ? void 0 : G.ownerDocument) ?? et;
    if (!g) return;
    const P = (ee) => {
      var Se, xt, bt, nn;
      const ue = ((Se = ee.composedPath) == null ? void 0 : Se.call(ee)[0]) ?? ee.target;
      !ue || typeof ue.nodeType != "number" || (xt = Je.current) != null && xt.contains(ue) || (bt = st.current) != null && bt.contains(ue) || (nn = fe == null ? void 0 : fe.current) != null && nn.contains(ue) || Nt();
    };
    return g.addEventListener("pointerdown", P, !0), () => g.removeEventListener("pointerdown", P, !0);
  }, [ne, Nt, et, fe]);
  const en = ie((g) => {
    var P;
    if (g.kind === "item" ? Ft.current = g.hit.item.id : (g.kind === "group" || g.kind === "action") && (Ft.current = null), g.kind === "group") {
      if ($e) {
        const G = (P = R == null ? void 0 : R.groupToken) == null ? void 0 : P.call(R, g.group.key);
        if (G) {
          Ne.canToggle(G) && Ne.toggle(G);
          return;
        }
        const ee = n.filter((ue) => ue.group === g.group.key && ue.checkable !== !1 && vn.has(ue.id) && !Ne.isDisabled(ue.id)).map((ue) => ue.id);
        ee.length && Ne.toggleGroup(ee);
        return;
      }
      d ? (d(g.group), p && Nt()) : nt && Pt(g.group.key);
      return;
    }
    if (g.kind === "item") {
      if ($e) {
        if (Ne.canToggle(g.hit.item.id)) {
          const G = It.findIndex((ue) => ue.row === g), ee = (ue) => {
            const Se = It[ue];
            return (Se == null ? void 0 : Se.row.kind) === "item" ? Se.row.hit.item.id : null;
          };
          Tt.current = G < 0 ? null : { up: ee(G - 1), down: ee(G + 1) }, Ne.toggle(g.hit.item.id), Ee(-1, "keyboard");
        }
        return;
      }
      u(g.hit.item), p && Nt();
      return;
    }
    if (g.kind === "action") {
      const G = g.source === "leading" ? _ : g.source === "footer" ? oe : C, ee = G == null ? void 0 : G[g.actionIndex];
      ee && ee.onClick(me), p && Nt();
    }
  }, [Nt, p, C, oe, nt, n, _, R, $e, It, u, d, me, Ne, Ee, Pt, vn]), Yn = (g) => {
    if (It.length === 0) return;
    const P = Tt.current, G = g === 1 ? P == null ? void 0 : P.down : P == null ? void 0 : P.up;
    if (G != null) {
      const xt = It.find(
        (bt) => bt.row.kind === "item" && bt.row.hit.item.id === G
      );
      if (xt) {
        Tt.current = null, Ee(xt.index);
        return;
      }
    }
    let ee = Ae;
    if (ee < 0 && Ft.current) {
      const xt = It.find(
        (bt) => bt.row.kind === "item" && bt.row.hit.item.id === Ft.current
      );
      xt && (ee = xt.index);
    }
    const ue = It.findIndex((xt) => xt.index === ee), Se = ue < 0 ? 0 : (ue + g + It.length) % It.length;
    Ee(It[Se].index);
  };
  Uo($, () => ({
    moveHighlight: Yn,
    activateHighlighted: () => {
      if (qt.current) return !1;
      const g = Ae >= 0 ? dt[Ae] : void 0;
      return g ? (en(g), Ee(-1, "keyboard"), !0) : !1;
    },
    close: Nt,
    selectAll: () => {
      $e && Ne.setAll(!0);
    },
    setSelection: (g) => {
      Ne.reset(g);
    }
  }), [dt, Ae, en, Nt, $e, Ne]);
  const An = (g) => {
    if ($e && (g.metaKey || g.ctrlKey) && g.key.toLowerCase() === "a") {
      g.preventDefault(), g.stopPropagation(), Ne.setAll(!0);
      return;
    }
    if (g.key === "ArrowDown")
      g.preventDefault(), ne ? Yn(1) : Lt();
    else if (g.key === "ArrowUp")
      g.preventDefault(), Yn(-1);
    else if ((g.key === "ArrowRight" || g.key === "ArrowLeft") && y && ne && !me.trim()) {
      const P = dt[Ae];
      if ((P == null ? void 0 : P.kind) === "group") {
        const G = Ve.has(P.group.key);
        (g.key === "ArrowRight" || G) && (g.preventDefault(), Pt(P.group.key));
      } else if ((P == null ? void 0 : P.kind) === "item" && g.key === "ArrowLeft" && P.hit.item.group) {
        g.preventDefault();
        const G = P.hit.item.group;
        Ve.has(G) && Pt(G);
        const ee = dt.findIndex((ue) => ue.kind === "group" && ue.group.key === G);
        ee >= 0 && Ee(ee);
      }
    } else if (g.key === "Enter") {
      g.preventDefault();
      const P = dt[Ae] ?? dt[0];
      P && en(P);
    } else g.key === "Escape" && (g.preventDefault(), Nt());
  }, hr = (g) => {
    t === "expandable" && !ke || (qe(g), ne || Fe(!0));
  };
  se(() => {
    if (M) {
      const P = me.trim().toLowerCase();
      if (!P) {
        const ee = T ? re.findIndex((ue) => ue.kind === "item" && ue.hit.item.id === T) : -1;
        Ee(ee >= 0 ? Te + ee : -1);
        return;
      }
      const G = re.findIndex((ee) => ee.kind === "item" && ee.hit.item.label.toLowerCase().includes(P));
      Ee(G >= 0 ? Te + G : -1);
      return;
    }
    if (Me) {
      const P = me.trim().toLowerCase();
      if (!!P && n.some((ee) => ee.id.toLowerCase() === P || ee.label.toLowerCase() === P)) {
        Ee(-1);
        return;
      }
      if (!$e) {
        const ee = re.findIndex((ue) => ue.kind === "item" && ue.hit.item.tone !== "create");
        if (ee >= 0) {
          Ee(Te + ee);
          return;
        }
      }
    }
    const g = re.findIndex((P) => P.kind === "item");
    Ee(g >= 0 ? Te + g : Te);
  }, [me]), se(() => {
    if (!ne || me.trim()) return;
    const g = T ? re.findIndex((P) => P.kind === "item" && P.hit.item.id === T) : -1;
    Ee(g >= 0 ? Te + g : E ? Te : -1);
  }, [ne]), ot(() => {
    ne && an.current();
  }, [ne]);
  const pr = (g) => /* @__PURE__ */ I("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    he == null ? void 0 : he.map((P) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": P.label,
        title: P.label,
        tabIndex: ke ? 0 : -1,
        onMouseDown: (G) => G.preventDefault(),
        onClick: () => {
          P.onClick(me, { close: Nt }), P.keepOpen || Nt();
        },
        style: { width: je.box, height: je.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": P.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: je.icon, height: je.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: P.icon
          }
        )
      },
      P.key
    )),
    me && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: ke ? 0 : -1,
        onMouseDown: (P) => P.preventDefault(),
        onClick: g,
        style: { width: je.box, height: je.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(Tn, { size: je.icon })
      }
    )
  ] }), mr = /* @__PURE__ */ I("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(Pn, { size: je.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: kt,
        value: me,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ne,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (g) => hr(g.target.value),
        onFocus: () => {
          m && Lt();
        },
        onClick: () => {
          m && Lt();
        },
        onKeyDown: An,
        placeholder: l,
        style: { paddingRight: X },
        className: `${Br("sm")} w-full pl-8`
      }
    ),
    pr(() => {
      qe(""), ne || Lt();
    })
  ] }), gr = /* @__PURE__ */ I("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(Pn, { size: je.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: kt,
        value: me,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ne,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (g) => hr(g.target.value),
        onFocus: () => {
          m && ke && Lt();
        },
        onClick: () => {
          m && ke && Lt();
        },
        onKeyDown: An,
        placeholder: l,
        tabIndex: ke ? 0 : -1,
        style: { paddingRight: X },
        className: `${Br("sm")} h-full w-full pl-8`
      }
    ),
    pr(() => {
      qe(""), !ne && ke && Lt();
    })
  ] });
  se(() => {
    if (!ne || qt.current) return;
    const g = st.current;
    ln(
      g == null ? void 0 : g.querySelector(`[data-search-row="${Ae}"]`),
      "nearest",
      (g == null ? void 0 : g.querySelector("[data-search-scroller]")) ?? null
    );
  }, [ne, Ae]);
  const dn = w(re);
  dn.current = re;
  const F = w(T);
  F.current = T;
  const ae = w(R == null ? void 0 : R.selectedIds);
  ae.current = R == null ? void 0 : R.selectedIds, ot(() => {
    if (!ne || !ft.current) return;
    const g = st.current;
    if (!g) return;
    const P = T;
    if (!P) {
      ft.current = !1;
      return;
    }
    const G = re.findIndex((ue) => ue.kind === "item" && ue.hit.item.id === P);
    if (G < 0) {
      ft.current = !1;
      return;
    }
    const ee = g.querySelector(`[data-search-row="${G}"]`);
    ee && (ln(ee, "center", g.querySelector("[data-search-scroller]") ?? null), ft.current = !1);
  }, [ne, Ve, re, T]);
  const be = ps({
    open: ne,
    block: "center",
    ready: de.ready,
    scroller: () => {
      var g;
      return ((g = st.current) == null ? void 0 : g.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var G;
      let g = -1;
      const P = F.current;
      if (P)
        g = dn.current.findIndex((ee) => ee.kind === "item" && ee.hit.item.id === P);
      else {
        const ee = ae.current;
        if (ee && ee.length) {
          const ue = new Set(ee);
          g = dn.current.findIndex((Se) => Se.kind === "item" && ue.has(Se.hit.item.id));
        }
      }
      return g < 0 ? null : ((G = st.current) == null ? void 0 : G.querySelector(`[data-search-row="${g}"]`)) ?? null;
    }
  }), Xe = (g, P) => {
    const G = Ae === P, ee = !$e && T !== void 0 && g.hit.item.id === T, ue = $e ? Ne.isSelected(g.hit.item.id) : ee, Se = !!g.hit.item.disabled || $e && !Ne.canToggle(g.hit.item.id), xt = g.hit.item.tone === "create" ? v === "light" ? { background: G ? "#d1fae5" : "#ecfdf5", color: G ? "#065f46" : "#047857" } : { background: G ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: G ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ I(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": ue,
        tabIndex: -1,
        "data-search-item": g.hit.item.id,
        "data-search-row": P,
        "data-search-create": g.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (bt) => bt.preventDefault(),
        onMouseEnter: () => Ee(P, "pointer"),
        onClick: () => en(g),
        style: { ...Mt, ...g.hit.item.rowStyle, ...xt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${gt.itemDefault} ${g.hit.item.rowClassName ?? ""} ${ee ? "ui-item-selected" : ""} ${G ? "ui-item-highlighted" : ""} ${Se ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          $e && g.hit.item.checkable !== !1 && /* @__PURE__ */ h(Lr, { checked: ue, disabled: Se, indicator: R == null ? void 0 : R.indicator }),
          D ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: D(g.hit.item, { checked: ue, disabled: Se }) }) : /* @__PURE__ */ I(ct, { children: [
            g.hit.item.icon && /* @__PURE__ */ h("span", { className: `${gt.icon} shrink-0`, children: g.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: g.hit.item.label }),
            (g.hit.detail || g.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: g.hit.detail || g.hit.item.detail }),
            ee && /* @__PURE__ */ h(ar, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${g.hit.item.id}`
    );
  }, Ye = (g, P) => {
    var lo;
    const G = Ve.has(g.group.key), ee = y && !me.trim(), ue = nt, Se = ue && Ae === P, xt = $e ? n.filter((Qe) => Qe.group === g.group.key && vn.has(Qe.id) && Qe.checkable !== !1) : [], bt = xt.filter((Qe) => !Ne.isDisabled(Qe.id)).map((Qe) => Qe.id), nn = $e ? (lo = R == null ? void 0 : R.groupToken) == null ? void 0 : lo.call(R, g.group.key) : void 0, ro = !!nn && Ne.isSelected(nn), io = ro ? "all" : bt.length > 0 ? Ne.groupState(bt) : "none", Kl = ro ? xt.length : xt.reduce((Qe, Vl) => Qe + (Ne.isSelected(Vl.id) ? 1 : 0), 0), oo = $e && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${g.group.label}`,
        onMouseDown: (Qe) => Qe.preventDefault(),
        onClick: (Qe) => {
          Qe.stopPropagation(), nn ? Ne.toggle(nn) : bt.length && Ne.toggleGroup(bt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${nn || bt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Lr,
          {
            checked: io === "all",
            indeterminate: io === "some",
            disabled: !nn && bt.length === 0,
            indicator: R == null ? void 0 : R.indicator
          }
        )
      }
    ), so = $e ? /* @__PURE__ */ I("span", { className: `shrink-0 tabular-nums text-[10px] ${ue ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Kl,
      "/",
      xt.length
    ] }) : g.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${ue ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: g.group.count });
    return ue ? /* @__PURE__ */ I(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": ee ? G : void 0,
        "data-search-group": g.group.key,
        onMouseDown: (Qe) => Qe.preventDefault(),
        onMouseEnter: () => Ee(P, "pointer"),
        onClick: () => {
          ee && Pt(g.group.key);
        },
        style: Mt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${gt.itemDefault} ${Se ? "ui-item-highlighted" : ""}`,
        children: [
          oo,
          /* @__PURE__ */ I(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Qe) => Qe.preventDefault(),
              onClick: (Qe) => {
                Qe.stopPropagation(), en(g);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                g.group.icon && /* @__PURE__ */ h("span", { className: `${gt.icon} shrink-0`, children: g.group.icon }),
                /* @__PURE__ */ h("span", { className: "truncate", children: g.group.label })
              ]
            }
          ),
          /* @__PURE__ */ h("span", { className: "min-w-0 flex-1" }),
          so,
          ee && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${G ? "Collapse" : "Expand"} ${g.group.label}`,
              "aria-expanded": G,
              onMouseDown: (Qe) => Qe.preventDefault(),
              onClick: (Qe) => {
                Qe.stopPropagation(), Pt(g.group.key);
              },
              style: { width: je.box, height: je.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ h(
                mn,
                {
                  size: je.icon,
                  className: `transition-transform duration-200 ${G ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${g.group.key}`
    ) : /* @__PURE__ */ I(
      "div",
      {
        role: "presentation",
        "data-search-group": g.group.key,
        "data-search-row": P,
        style: Ht,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          oo,
          g.group.icon && /* @__PURE__ */ h("span", { className: `${gt.icon} shrink-0`, children: g.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: g.group.label }),
          so
        ]
      },
      `group:${g.group.key}`
    );
  }, tn = (g, P) => {
    var ue;
    const G = Ae === P, ee = g.source === "leading" ? _ : g.source === "footer" ? oe : C;
    return /* @__PURE__ */ I(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": g.source || "empty",
        "data-search-row": P,
        onMouseDown: (Se) => Se.preventDefault(),
        onMouseEnter: () => Ee(P, "pointer"),
        onClick: () => en(g),
        style: Mt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${gt.itemDefault} ${G ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${gt.icon} shrink-0`, children: ((ue = ee == null ? void 0 : ee[g.actionIndex]) == null ? void 0 : ue.icon) || /* @__PURE__ */ h(Ur, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: g.label })
        ]
      },
      `${g.source || "empty"}:${g.actionIndex}`
    );
  }, li = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: q ? q({ query: me, close: Nt }) : /* @__PURE__ */ I(ct, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: J || `No matches for “${me.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: Y || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), yr = [];
  for (let g = 0; g < re.length; g++) {
    const P = re[g];
    if (P.kind === "group") {
      const G = [];
      let ee = g + 1;
      for (; ee < re.length && re[ee].kind === "item" && re[ee].hit.item.group === P.group.key; )
        G.push({ row: re[ee], index: ee }), ee++;
      yr.push({ group: P, index: g, items: G }), g = ee - 1;
    } else P.kind === "item" ? yr.push({ row: P, index: g }) : yr.push({ row: P, index: g });
  }
  const ci = ne || Et ? Gr(
    /* @__PURE__ */ I(
      "div",
      {
        ref: Z,
        id: "search-menu-panel",
        "data-theme": v,
        role: "listbox",
        "aria-label": l,
        "aria-multiselectable": $e ? !0 : void 0,
        onPointerEnter: be.engage,
        onPointerDown: (g) => {
          g.stopPropagation(), be.engage();
        },
        onMouseDown: (g) => g.stopPropagation(),
        onClick: (g) => g.stopPropagation(),
        onPointerLeave: () => {
          qt.current && Ee(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: de.left,
          top: de.top,
          width: W ?? (t === "expandable" ? A : tt || void 0),
          minWidth: K,
          maxHeight: de.maxH,
          visibility: de.ready ? "visible" : "hidden"
        },
        children: [
          Re && /* @__PURE__ */ I("div", { className: "shrink-0 pb-1", children: [
            ve.map((g, P) => tn(g, P)),
            re.length > 0 && /* @__PURE__ */ h("div", { className: gt.separator })
          ] }),
          /* @__PURE__ */ I("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            re.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: q ? q({ query: me, close: Nt }) : /* @__PURE__ */ h(ct, { children: "Type to search…" }) }),
            yr.map((g) => {
              if (g.group) {
                const ee = Ve.has(g.group.group.key), ue = g.items || [];
                return /* @__PURE__ */ I(lt.Fragment, { children: [
                  Ye(g.group, Te + g.index),
                  yt && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": g.group.group.key,
                      "aria-hidden": !ee,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: ee ? "1fr" : "0fr",
                        opacity: ee ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: ue.map((Se) => Xe(Se.row, Te + Se.index)) })
                    }
                  ),
                  !yt && ue.map((Se) => Xe(Se.row, Te + Se.index))
                ] }, `group:${g.group.group.key}`);
              }
              const P = g.row, G = Te + g.index;
              return P.kind === "empty" ? li() : P.kind === "action" ? tn(P, G) : P.kind === "item" ? Xe(P, G) : null;
            })
          ] }),
          Ie.length > 0 && /* @__PURE__ */ I("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: gt.separator }),
            Ie.map((g, P) => tn(g, Te + re.length + P))
          ] }),
          $e && (R == null ? void 0 : R.footer) !== !1 && /* @__PURE__ */ h(
            bs,
            {
              count: Ne.count,
              max: R == null ? void 0 : R.max,
              hiddenCount: (R == null ? void 0 : R.hiddenNote) === !1 ? 0 : Ne.hiddenCount,
              clear: (R == null ? void 0 : R.clear) !== !1,
              theme: v,
              onClear: Ne.clear,
              hero: (R == null ? void 0 : R.mode) === "live" ? void 0 : {
                label: Rn,
                onClick: () => {
                  Ne.commit(), Nt();
                },
                disabled: Ne.count === 0
              }
            }
          )
        ]
      }
    ),
    Q ?? zt ?? (et == null ? void 0 : et.body) ?? document.body
  ) : null;
  return ye ? /* @__PURE__ */ I(ct, { children: [
    /* @__PURE__ */ h("div", { ref: Je, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    ci
  ] }) : t === "inline" ? /* @__PURE__ */ I("div", { ref: Je, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    mr,
    ci
  ] }) : /* @__PURE__ */ h(
    no,
    {
      expanded: ke,
      collapsedWidth: N,
      expandedWidth: A,
      rootRef: Je,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: xe ? xe({ open: ne, expanded: ke, toggle: Lt }) : /* @__PURE__ */ h(
        Dt,
        {
          ref: At,
          type: "button",
          variant: o,
          size: "minimal",
          theme: v === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ h(Pn, { className: "w-3.5 h-3.5" }) : i,
          onClick: Lt,
          className: `w-full justify-start ${ke ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: ke ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ I(ct, { children: [
        gr,
        ci
      ] })
    }
  );
}
function yn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Jl(n, e, t = "id") {
  const r = e.find((i) => yn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function rh(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function ih(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Yr(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => yn(l, t) === r);
  if (i) return yn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? yn(s, t) : r;
}
function Ko(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of rh(n)) {
    const s = Yr(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function oh(n, e, t, r, i) {
  if (i) return Ko(n, e, t);
  const o = new Set(e.map((l) => yn(l, t))), s = Ko(n, e, t).filter((l) => o.has(l));
  return s.length === 0 && n.trim() !== "" ? [...r] : s;
}
function sh(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Yr(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function lh(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => yn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function ch(n, e, t = "id") {
  const r = new Set(e.map((i) => yn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Vo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Jl(o, e, t)).join(", ");
}
const ah = () => {
};
function pp({
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
  anchoredLabel: y = "Element link anchor",
  placeholder: b = "Select…",
  readOnly: x = !1,
  inputReadOnly: z = !1,
  disabled: T = !1,
  autoFocus: k = !1,
  defaultOpen: N = !1,
  selectAllOnOpen: A = !0,
  uppercase: W = !1,
  allowFreeText: K = !0,
  theme: M,
  className: j = "",
  style: v,
  panelWidth: O,
  panelMinWidth: J,
  initialQuery: Y,
  keepAllRows: q = !1,
  maxMenuHeight: C,
  portalTarget: _,
  autoGrow: U = !1,
  skipComma: oe = !1,
  collapsedWidth: he = 140,
  expandedWidth: R = 280,
  createLabel: ge,
  onCreateItem: pe,
  onExit: ye,
  onEscape: fe,
  onTabExit: Q,
  loadItems: xe,
  emptyTitle: D,
  emptyHint: E,
  sortItems: $,
  max: V,
  disabledIds: Oe,
  indicator: Ce,
  browse: me,
  groupToken: qe
}) {
  const Me = Xt(), Pe = M ?? (Me == null ? void 0 : Me.mode) ?? "light", Le = Be(), ne = ie((F) => yn(F, i), [i]), Fe = rt(() => t.map(ne), [t, ne]), ke = rt(() => new Map(t.map((F) => [ne(F), F])), [t, ne]), Ze = ie((F) => Jl(F, t, i), [t, i]), wt = rt(() => new Set([...m ?? []].map((F) => F.toLowerCase())), [m]), [we, Ve] = te(!1), [mt, Ae] = te(""), [Qt, qt] = te(() => {
    const F = Y ?? "";
    return W ? F.toUpperCase() : F;
  }), [Ft, Tt] = te(Qt), [Ee, Je] = te(() => [...n]), [kt, At] = te(null), [st, $t] = te(!1), He = w(null), et = w(null), zt = w(null), gt = w(null), Mt = w(null), Ht = w(n.join("\0")), je = w(!1), L = w(/* @__PURE__ */ new Set()), X = w(!1), de = w(!1), Ge = w(!1), tt = w(0), St = w(""), Et = w([...n]), S = n.join("\0"), Z = rt(
    () => Vo(n, t, i, l, c),
    [n, t, i, l, c]
  ), le = ie((F) => {
    if (a) return a([...F], t);
    if (o === "single") return F[0] ? Ze(F[0]) : "";
    const ae = F.map(Ze).join(", ");
    return oe ? ae : F.length ? `${ae}, ` : "";
  }, [a, t, o, Ze, oe]);
  se(() => {
    we || (Je([...n]), Et.current = [...n], Ht.current = S);
  }, [S, we]);
  const re = ie(() => {
    if (we || x || T) return;
    je.current = !1, X.current = !0;
    const F = le(n);
    St.current = F, Et.current = [...n], Je([...n]), Ae(F), Tt(Qt), qt(""), Ve(!0);
  }, [we, x, T, n, le, Qt]);
  ot(() => {
    if (!we) return;
    const F = He.current ?? et.current;
    F && (F.focus(), (F instanceof HTMLInputElement || F instanceof HTMLTextAreaElement) && (o === "single" && A ? F.setSelectionRange(0, F.value.length) : F.setSelectionRange(F.value.length, F.value.length)));
  }, [we]), ot(() => {
    if (!Ge.current) return;
    Ge.current = !1;
    const F = He.current;
    F && (F.focus(), F.setSelectionRange(F.value.length, F.value.length));
  }, [mt]), se(() => {
    (N || k) && re();
  }, []);
  const ve = o === "single" ? Ft : ih(mt), Ie = xe ? kt ?? [] : t, _e = rt(
    () => $ ? $(Ie, Ee) : Ie,
    [Ie, $, Ee]
  ), Re = ve.trim(), Te = !!pe && K && !st && !!Re && !lh(Re, Ie, i);
  se(() => {
    if (!xe || !we) return;
    const F = ve.trim();
    if (!F) {
      At(null), $t(!1);
      return;
    }
    $t(!0);
    const ae = ++tt.current, be = setTimeout(() => {
      xe(F).then((Xe) => {
        tt.current === ae && (At(Xe), $t(!1));
      }).catch(() => {
        tt.current === ae && (At([]), $t(!1));
      });
    }, 400);
    return () => clearTimeout(be);
  }, [xe, we, ve]);
  const dt = rt(() => {
    const F = _e.filter((ae) => !ae.hidden).map((ae) => ({
      id: ne(ae),
      label: ae.label,
      group: ae.group,
      detail: ae.detail,
      icon: ae.icon,
      disabled: !!ae.disabled || !!(Oe != null && Oe.includes(ne(ae))),
      fields: ae.fields,
      keywords: ae.keywords,
      rowClassName: ae.rowClassName,
      rowStyle: ae.rowStyle
    }));
    return Te && F.unshift({
      id: Re,
      label: ge ? ge(Re) : `Add “${Re}”…`,
      keywords: Re,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), F;
  }, [_e, ne, Oe, Te, Re, ge]), nt = ie((F) => {
    const ae = F.join("\0");
    if (ae !== Ht.current) {
      if (wn(F, n)) {
        Ht.current = ae;
        return;
      }
      if (Ht.current = ae, e(F), pe)
        for (const be of ch(F, t, i))
          L.current.has(be) || (L.current.add(be), pe(be));
    }
  }, [n, e, pe, t, i]), It = ie((F, ae) => {
    !ae || !pe || !K || t.some((be) => ne(be) === F) || L.current.has(F) || (L.current.add(F), pe(F));
  }, [pe, K, t, ne]), yt = ie((F = !0) => {
    if (!X.current || (X.current = !1, x || T)) return;
    if (je.current) {
      je.current = !1;
      return;
    }
    const ae = St.current, be = new Set(Fe), Xe = o === "single" ? (() => {
      const Ye = ae.trim();
      if (!Ye) return K ? [] : n;
      const tn = Yr(Ye, t, i);
      return !K && !be.has(tn) ? n : [tn];
    })() : _t(
      oh(ae, t, i, n, K),
      Fe
    );
    Et.current = Xe, Je(Xe), Tt(""), Ve(!1), nt(Xe), F && !de.current && (ye == null || ye());
  }, [x, T, o, t, i, Fe, K, n, nt, ye]), $e = ie((F) => {
    Ve(F), F || yt();
  }, [yt]), Vt = ie(() => {
    je.current = !0, X.current = !1;
    const F = le(n);
    St.current = F, Et.current = [...n], Je([...n]), Ae(F), Tt(""), Ve(!1), fe == null || fe();
  }, [n, le, fe]);
  se(() => {
    var Xe;
    if (!we) return;
    const ae = (((Xe = zt.current) == null ? void 0 : Xe.ownerDocument) ?? document).defaultView;
    if (!ae) return;
    const be = (Ye) => {
      Ye.key === "Escape" && (Ye.preventDefault(), Ye.stopImmediatePropagation(), Vt());
    };
    return ae.addEventListener("keydown", be, !0), () => ae.removeEventListener("keydown", be, !0);
  }, [we, Vt]);
  const Zt = ie((F) => {
    const ae = _t(F, Fe), be = le(ae);
    Et.current = ae, St.current = be, Je(ae), Ge.current = !0, Ae(be);
  }, [Fe, le]), vn = ie((F) => {
    const ae = F.id;
    X.current = !1;
    const be = Ze(ae);
    Et.current = [ae], St.current = be, Je([ae]), Ae(be), Tt(""), Ve(!1), nt([ae]), de.current || ye == null || ye();
  }, [Ze, nt, ye]), Ne = (F) => {
    var ae, be, Xe, Ye, tn;
    if (F.key === "Escape") {
      F.preventDefault(), Vt();
      return;
    }
    if (F.key === "Tab") {
      if (F.preventDefault(), o === "single" && we) {
        de.current = !0;
        const li = (ae = Mt.current) == null ? void 0 : ae.activateHighlighted();
        if (de.current = !1, li) {
          (be = Q ?? ye) == null || be(He.current ?? void 0);
          return;
        }
      }
      we && yt(!1), (Xe = Q ?? ye) == null || Xe(He.current ?? void 0);
      return;
    }
    if (F.key === "ArrowDown" || F.key === "ArrowUp") {
      if (F.preventDefault(), !we) {
        re();
        return;
      }
      (Ye = Mt.current) == null || Ye.moveHighlight(F.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (F.key === "Enter") {
      if (F.preventDefault(), F.stopPropagation(), we && ((tn = Mt.current) != null && tn.activateHighlighted())) return;
      yt();
      return;
    }
  }, an = (F) => {
    var be;
    const ae = W ? F.target.value.toUpperCase() : F.target.value;
    if (St.current = ae, Ae(ae), o === "single" && Tt(ae), we || (X.current = !0, je.current = !1, Ve(!0)), o === "multiple") {
      const Xe = _t(sh(ae, t, i), Fe);
      Et.current = Xe, Je(Xe), (be = Mt.current) == null || be.setSelection(Xe);
    }
  }, Rn = () => {
    if (X.current) {
      if (je.current) {
        je.current = !1;
        return;
      }
      yt();
    }
  }, Nt = ie((F, ae) => {
    const be = ke.get(F.id);
    if (!be)
      return /* @__PURE__ */ I(ct, { children: [
        /* @__PURE__ */ h(Ur, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: F.label })
      ] });
    const Xe = !!m && (i === "label" ? wt.has(be.label.toLowerCase()) : m.has(ne(be))), Ye = (f == null ? void 0 : f(be)) ?? be.badge ?? null;
    return /* @__PURE__ */ I(ct, { children: [
      d ? d(be, ae.checked) : /* @__PURE__ */ I(ct, { children: [
        be.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: be.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: be.label }),
        Ye && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Ye }),
        p == null ? void 0 : p(be)
      ] }),
      Xe && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: y, "aria-label": y, children: /* @__PURE__ */ h(ic, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [ke, m, wt, i, ne, f, d, p, y]), un = /* @__PURE__ */ h(
    nh,
    {
      ref: Mt,
      mode: "inline",
      hideTrigger: !0,
      open: we,
      onOpenChange: $e,
      anchorRef: s === "morph" ? gt : zt,
      items: dt,
      groups: r,
      query: ve,
      onSelect: vn,
      closeOnSelect: o === "single",
      selectedId: o === "single" && Ee[0] !== void 0 ? Yr(Ee[0], t, i) : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Ee,
        mode: "live",
        onDraftChange: Zt,
        onToggle: It,
        onCommit: ah,
        max: V,
        disabledIds: Oe,
        indicator: Ce,
        groupToken: qe
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (me ?? "open") === "open",
      expandableGroups: r.length > 0 && me === "accordion",
      groupExpandMode: "single",
      renderItem: Nt,
      emptyTitle: st ? "Searching…" : D,
      emptyHint: st ? "Fetching matching records." : E,
      theme: Pe,
      panelWidth: O,
      panelMinWidth: J,
      keepAllRows: q,
      maxMenuHeight: C,
      portalTarget: _
    }
  ), ft = s === "chip", Pt = s === "wrap", Lt = !ft && !Pt && U, en = !we && !Z, Yn = we ? mt : Z, An = {
    ref: He,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: we ? mt : ft ? n.join(", ") : Z,
    disabled: T,
    readOnly: z,
    placeholder: "",
    onFocus: re,
    onClick: re,
    onChange: an,
    onBlur: Rn,
    onKeyDown: Ne,
    autoComplete: "off",
    spellCheck: !1
  }, hr = B(5, 7, Le), pr = B(9, 12, Le), mr = B(12, 14, Le);
  if (s === "button") {
    const F = (Ye) => Ne(Ye), ae = we ? Ee : n, be = Vo(ae, t, i, l, c), Xe = !be;
    return /* @__PURE__ */ I(
      "div",
      {
        ref: zt,
        "data-picker-field": !0,
        className: `relative ${j}`,
        style: v,
        onMouseDown: (Ye) => Ye.stopPropagation(),
        onContextMenu: (Ye) => {
          Ye.preventDefault(), Ye.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...ae], items: t, display: be, open: we, toggle: re }) }) : /* @__PURE__ */ I(
            Dt,
            {
              ref: et,
              variant: "outline",
              theme: Pe === "dark" ? "dark" : "light",
              disabled: T,
              onClick: x ? void 0 : () => we ? yt() : re(),
              onKeyDown: F,
              "data-state": we ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": we,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && ae.length > 0 ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: ae.map((Ye) => /* @__PURE__ */ h(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Ze(Ye)
                  },
                  Ye
                )) }) : /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate text-left ${Xe ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: be || b }),
                /* @__PURE__ */ h(mn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          un
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ h(
      no,
      {
        expanded: we,
        collapsedWidth: he,
        expandedWidth: R,
        rootRef: zt,
        "data-picker-field": !0,
        className: j,
        style: v,
        trigger: u ? u({ values: [...n], items: t, display: Z, open: we, toggle: re }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ I(
            "button",
            {
              type: "button",
              disabled: T,
              onClick: re,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${hr}px ${pr}px`, fontSize: mr },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${en ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: Z || b }),
                /* @__PURE__ */ h(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ I("div", { ref: gt, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...An,
              className: `${Br("sm")} h-full w-full`
            }
          ),
          un
        ] })
      }
    );
  const gr = ft ? B(5, 7, Le) : 0, dn = ft ? B(9, 12, Le) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: zt,
      "data-picker-field": !0,
      className: `relative ${ft ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Pt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${j}`,
      style: ft ? { padding: `${gr}px ${dn}px`, fontSize: B(12, 14, Le), ...v } : v,
      children: /* @__PURE__ */ h(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: Z,
          className: ft ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ I(
    "div",
    {
      ref: zt,
      "data-picker-field": !0,
      className: `relative ${ft ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Pt ? "min-h-[1lh] w-full pb-[1lh]" : Lt ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${j}`,
      style: ft ? { padding: `${gr}px ${dn}px`, fontSize: mr, ...v } : v,
      onMouseDown: (F) => F.stopPropagation(),
      onContextMenu: (F) => {
        F.preventDefault(), F.stopPropagation();
      },
      onAuxClick: re,
      children: [
        ft && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: Z, open: we, toggle: re }) }) : l === "chips" && !we ? /* @__PURE__ */ I("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((F) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Ze(F)
            },
            F
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${ft ? "min-w-0 flex-1 truncate" : Pt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${en ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: Yn || b
          }
        ),
        Pt ? /* @__PURE__ */ h(
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
            className: Lt ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Lt ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : ft ? { caretColor: "#2563eb", color: "transparent", paddingLeft: dn, paddingRight: dn + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        ft && /* @__PURE__ */ h(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        un
      ]
    }
  );
}
export {
  Dt as Button,
  fp as CardSection,
  Pi as CheckMark,
  Wc as Checkbox,
  Yh as Checklist,
  op as ChromeHeader,
  ip as ContentRow,
  Ph as ContextMenu,
  Bh as ContextMenuDivider,
  Lh as ContextMenuItem,
  Fh as ContextMenuSub,
  as as DROPDOWN_MAX_HEIGHT,
  Vh as DatePicker,
  _h as DialogProvider,
  ea as DropdownItem,
  ti as DropdownMenu,
  ta as DropdownSubmenu,
  Li as DropdownThemeContext,
  qf as FONTS,
  Gh as FloatingChrome,
  Kh as FloatingToggle,
  Kf as FontMenu,
  up as FormatToolbar,
  We as IS_COARSE,
  Ic as IS_TOUCH_CAPABLE,
  Oh as ItemManagerDropdown,
  qh as LongPressMenuProvider,
  Ai as MORPH_EASE,
  xn as MORPH_MS,
  $i as MORPH_OPACITY_MS,
  fr as MenuHighlightContext,
  Ss as MenuSearchContext,
  ra as Modal,
  Hh as ModalFooter,
  vr as ModalFooterButton,
  hp as MorphActionField,
  Qf as MorphSearchField,
  ys as NO_SELECTION_IDS,
  dp as NumberInput,
  pp as PickerField,
  Ec as PopoutWindowContext,
  ap as RICH_TEXT_STATE_IDLE,
  Uh as RadioList,
  Wf as RichTextEditor,
  Uf as SCRUB_PX_PER_STEP,
  nh as SearchMenu,
  rp as SectionHeader,
  np as Seg,
  Lr as SelectionCheck,
  gs as SelectionContext,
  bs as SelectionFooter,
  sp as StructureControls,
  Hi as SubmenuContext,
  Dh as TAB_PILL,
  Sa as TB_BTN,
  wr as TB_BTN_ICON,
  Na as TB_DANGER,
  Rs as TB_DIVIDER,
  Ca as TB_INPUT,
  tp as TB_NUM,
  Ma as TB_PICKER,
  Xh as TB_ROW_LABEL,
  Ta as TB_SEG,
  Qh as TB_TOGGLE,
  ep as TB_TOGGLE_OFF,
  Zh as TB_TOGGLE_ON,
  xs as TabFace,
  $h as ThemeProvider,
  zh as ThemeScope,
  Of as Token,
  Df as TokenChipView,
  kr as ToolButton,
  Dn as Tooltip,
  zi as ZOOM_FROM,
  th as buildSearchMenuRows,
  Lc as buttonCloudOf,
  to as clampNumber,
  zc as cloneOverlayClose,
  B as coarsePx,
  jc as countHidden,
  cp as escapeHtml,
  Vo as formatPickerValues,
  ns as getCoarseScale,
  Zr as getDropdownClasses,
  Rh as getHardwareKeyboard,
  Ih as getLastPointerType,
  uo as groupSelectionState,
  lh as hasPickerMatch,
  Br as inputCls,
  fa as isInteractiveElement,
  xi as isTouchLike,
  ih as lastPickerSegment,
  eh as matchSearchItem,
  hs as menuAttributesOf,
  Oc as menuThemeOf,
  ls as nearestOverlayOrigin,
  _l as normalizeSpaces,
  _t as orderByCatalogue,
  ai as overlayMorphEnabled,
  Zf as parseSearchTags,
  sh as pickerCommittedKeys,
  yn as pickerItemKey,
  Jl as pickerItemLabel,
  rh as pickerSegments,
  $c as playOverlayClose,
  Ac as playOverlayOpen,
  Wo as preprocessTokenHtml,
  Yr as resolvePickerSegment,
  Ko as resolvePickerText,
  ln as revealRowInScroller,
  wn as sameSelection,
  Af as sanitizeRichText,
  Gf as scrubbedValue,
  ql as searchMenuContent,
  Pc as segModeOf,
  Mh as setCoarseScale,
  ao as setSelected,
  Yf as steppedValue,
  lp as stripRichText,
  $f as stripTokenWrappers,
  Hc as toggleSelected,
  ch as unknownPickerValues,
  Eh as useCoarse,
  Be as useCoarseScale,
  gn as useCoarseSize,
  Ri as useCurrentDocument,
  ur as useCurrentWindow,
  jh as useDialog,
  us as useDropdownPosition,
  vs as useDropdownTheme,
  Ah as useHardwareKeyboard,
  Es as useInputSize,
  Fi as useItemSize,
  Xt as useKitTheme,
  Rc as useLastPointerType,
  Wh as useLongPressOptOut,
  ji as useMenuHighlight,
  Xc as useMenuSearch,
  Qr as useOverlayMorph,
  Ii as usePopoutWindow,
  Kn as usePortalTarget,
  ps as useRevealRowOnOpen,
  ms as useSelection,
  _c as useSelectionContext,
  ka as useSlidingPill,
  Jh as useTouchMode
};
