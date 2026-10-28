"use client";
import { jsx as h, jsxs as C, Fragment as nt } from "react/jsx-runtime";
import ot, { createContext as Qt, useContext as Zt, useState as ie, useEffect as oe, useRef as w, useCallback as ee, useLayoutEffect as xt, useMemo as Xe, useId as Ml, useImperativeHandle as Do } from "react";
import * as De from "@radix-ui/react-dropdown-menu";
import { Minus as Rl, Check as rr, Search as hn, X as xn, Pencil as Il, Copy as Po, Trash2 as ci, RotateCcw as Lo, Plus as Or, ChevronRight as Cr, ChevronLeft as Al, ArrowUp as $l, ArrowDown as zl, ChevronDown as bn, Underline as Dl, Strikethrough as Pl, RemoveFormatting as Ll, Link as Ol, ChevronUp as Bl, Anchor as Fl } from "lucide-react";
import { computePosition as Hl, offset as Oo, flip as Bo, shift as Fo, size as _l, useFloating as jl, autoUpdate as Wl } from "@floating-ui/react-dom";
import * as rn from "@radix-ui/react-dialog";
import { createPortal as Br } from "react-dom";
import { mergeAttributes as ql, ReactNodeViewRenderer as Kl, NodeViewWrapper as Jl, useEditor as Vl, EditorContent as Yl } from "@tiptap/react";
import { PluginKey as qt, Plugin as en, Selection as Dn, TextSelection as Lt, NodeSelection as Bn, AllSelection as Ul } from "@tiptap/pm/state";
import { DecorationSet as ur, Decoration as Xl } from "@tiptap/pm/view";
import Gl from "@tiptap/starter-kit";
import Ql from "@tiptap/extension-placeholder";
import { TextStyle as Zl, FontFamily as ec, FontSize as tc } from "@tiptap/extension-text-style";
import nc from "@tiptap/extension-color";
import rc from "@tiptap/extension-link";
import ic from "@tiptap/extension-underline";
import oc from "@tiptap/suggestion";
import { Mention as sc } from "@tiptap/extension-mention";
import { createRoot as lc } from "react-dom/client";
const cc = Qt(null);
function vi() {
  return Zt(cc);
}
function jn() {
  const n = vi();
  return n ? n.document.body : null;
}
function wi() {
  const n = vi();
  return n ? n.document : typeof document < "u" ? document : null;
}
function ir() {
  return vi() ?? (typeof window < "u" ? window : null);
}
const or = typeof window < "u", rt = or && window.matchMedia("(pointer: coarse)").matches, ac = or && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Fr = 0.5;
const Xn = /* @__PURE__ */ new Set();
function ih(n) {
  Fr = Math.max(0, Math.min(1, n)), Xn.forEach((e) => e());
}
function Ho() {
  return Fr;
}
function oh() {
  const [, n] = ie(0);
  return oe(() => {
    const e = () => n((t) => t + 1);
    return Xn.add(e), () => {
      Xn.delete(e);
    };
  }, []), rt && Fr > 0;
}
function He() {
  const [, n] = ie(0);
  return oe(() => {
    const e = () => n((t) => t + 1);
    return Xn.add(e), () => {
      Xn.delete(e);
    };
  }, []), Fr;
}
function L(n, e, t) {
  return rt ? Math.round(n + (e - n) * t) : n;
}
function cn(n, e) {
  const t = He();
  return rt && t > 0 ? {
    padding: `${L(n.py, e.py, t)}px ${L(n.px, e.px, t)}px`,
    fontSize: `${L(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function _o() {
  const n = He(), e = rt && n > 0;
  return {
    box: e ? L(28, 36, n) : 20,
    icon: e ? L(16, 20, n) : 14
  };
}
function ai(n) {
  return n === "touch" || n === "pen";
}
let zn = null;
const ui = /* @__PURE__ */ new Set();
or && window.addEventListener("pointerdown", (n) => {
  zn = n.pointerType, ui.forEach((e) => e());
}, !0);
function sh() {
  return zn;
}
function uc() {
  const [, n] = ie(0), e = w(zn);
  return oe(() => {
    const t = () => {
      e.current !== zn && (e.current = zn, n((r) => r + 1));
    };
    return ui.add(t), () => {
      ui.delete(t);
    };
  }, []), zn;
}
const jo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Wo() {
  return or ? jo.some((n) => window.matchMedia(n).matches) : !1;
}
let Tr = Wo();
const di = /* @__PURE__ */ new Set();
function Qi(n) {
  Tr !== n && (Tr = n, di.forEach((e) => e()));
}
var zo;
if (or) {
  const n = () => Qi(Wo());
  for (const s of jo) {
    const l = window.matchMedia(s);
    (zo = l.addEventListener) == null || zo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || Qi(!0));
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
function lh() {
  return Tr;
}
function ch() {
  const [, n] = ie(0);
  return oe(() => {
    const e = () => n((t) => t + 1);
    return di.add(e), () => {
      di.delete(e);
    };
  }, []), Tr;
}
const vn = 220, ki = "cubic-bezier(0.32, 0.72, 0, 1)", Si = 170, Ni = 0.94;
function Xr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function qo(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Ko(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return qo({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function dc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Ni})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Ko(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${vn}ms ${ki}, opacity ${Si}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, vn + 60);
    });
  });
}
function fc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Ko(e, t);
  e.style.transition = `transform ${vn}ms ${ki}, opacity ${Si}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Ni})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, vn + 60);
}
function hc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? qo({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${vn}ms ${ki}, opacity ${Si}ms ease`, r.style.transform = `scale(${Ni})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, vn + 60));
    });
  });
}
function Hr(n) {
  const e = w(null), [t, r] = ie(!1), i = w(null), o = w(0), s = ee((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const y = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === y && (e.current = null, r(!1), !(!y || !n.cloneOnUnmount || !c.current) && y.style.visibility !== "hidden" && Xr(f.current) && hc(y, u.current, i.current));
    });
  }, []), l = ee(() => {
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
  return xt(() => {
    if (!t || !c.current || !Xr(f.current)) return;
    const m = e.current;
    m && dc(p, m, u.current);
  }, [t, n.visible]), oe(() => {
    if (!t || !c.current) return;
    let m = 0;
    const y = () => {
      m = 0, l(), m = requestAnimationFrame(y);
    };
    return m = requestAnimationFrame(y), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), xt(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const y = e.current;
    if (!y || !Xr(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    fc(p, y, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), oe(() => {
    if (!t || !c.current) return;
    const m = (y) => {
      const b = e.current;
      b && b.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), oe(() => {
    if (!t || !c.current) return;
    const m = (y) => {
      const b = e.current;
      b && b.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const Jo = 384;
function pc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Vo({
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
  const u = ir(), d = w(u);
  d.current = u;
  const f = w(a);
  f.current = a, xt(() => {
    if (!t) return;
    let p = 0, m = !1;
    const y = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const A = d.current, H = n.current, z = e.current;
      if (!A || !H || !z || !z.isConnected) return;
      const T = (r == null ? void 0 : r.current) ?? z, K = pc(A), E = l ?? Jo, D = Math.min(c, E), O = Math.max(0, z.offsetHeight - T.offsetHeight), V = Math.max(D, Math.ceil(T.scrollHeight + O)), Y = Math.min(V, E);
      z.style.maxHeight = `${Y}px`;
      let N = Y;
      const _ = i == null ? void 0 : i.current;
      Hl(_ ? {
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
      } : H, z, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Oo(o),
          Bo({ boundary: K, padding: s, fallbackStrategy: "bestFit" }),
          Fo({ boundary: K, padding: s, mainAxis: !1 }),
          _l({
            boundary: K,
            padding: s,
            apply({ availableHeight: M }) {
              N = Math.max(D, Math.floor(Math.min(E, M))), z.style.maxHeight = `${N}px`;
            }
          })
        ]
      }).then(({ x: M, y: we, placement: pe }) => {
        m || f.current({
          top: Math.round(we),
          left: Math.round(M),
          maxH: N,
          side: pe.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, P = (x == null ? void 0 : x.document) ?? null, $ = (x == null ? void 0 : x.visualViewport) ?? null, S = () => y();
    $ == null || $.addEventListener("resize", S), $ == null || $.addEventListener("scroll", S), x == null || x.addEventListener("resize", S), P == null || P.addEventListener("scroll", S, { capture: !0, passive: !0 });
    let k = null;
    return typeof ResizeObserver < "u" && (k = new ResizeObserver(S), e.current && k.observe(e.current), r != null && r.current && k.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), $ == null || $.removeEventListener("resize", S), $ == null || $.removeEventListener("scroll", S), x == null || x.removeEventListener("resize", S), P == null || P.removeEventListener("scroll", S, { capture: !0 }), k == null || k.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let Rn = null;
function Yo(n) {
  return Rn == null || Rn(), Rn = n, () => {
    Rn === n && (Rn = null);
  };
}
const Uo = Qt(null);
function Ci(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ti({ theme: n, children: e }) {
  return /* @__PURE__ */ h(Uo.Provider, { value: n, children: e });
}
function ah({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Vt();
  return /* @__PURE__ */ h(Ti, { theme: Ci({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function uh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Vt(), c = Ci({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(Ti, { theme: c, children: /* @__PURE__ */ h(
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
  return Zt(Uo);
}
function mc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function Xo(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = mc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function gc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function yc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function xc(n) {
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
  const r = t ?? xc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function Go({
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
  return xt(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (an(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), oe(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      an(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const bc = [];
function Pt(n, e) {
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
function vc(n, e, t, r = {}) {
  var o;
  const i = Pt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Pt([...i, e], t);
}
function Zi(n, e, t, r, i = {}) {
  const o = Pt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Pt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : Pt([...o, ...u], r);
}
function eo(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function wc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function Qo(n) {
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
  } = n, [f, p] = ie(() => Pt(t, r)), m = Xe(() => new Set(s ?? []), [s]), y = Xe(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !fn(f, t), P = ee((K) => {
    if (m.has(K)) return;
    const E = y.has(K), D = vc(f, K, r, { max: o, disabledIds: s });
    fn(D, f) || (p(D), d == null || d(D), u == null || u(K, !E));
  }, [f, y, m, r, o, s, u, d]), $ = ee((K) => {
    const E = K.filter((V) => !m.has(V)), D = eo(f, E), O = Zi(f, E, D !== "all", r, { max: o, disabledIds: s });
    fn(O, f) || (p(O), d == null || d(O));
  }, [f, m, r, o, s, d]), S = ee((K, E = i ?? r) => {
    const D = Zi(f, E, K, r, { max: o, disabledIds: s });
    fn(D, f) || (p(D), d == null || d(D));
  }, [f, i, r, o, s, d]), k = ee(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), A = ee((K) => {
    p(Pt(K ?? t, r));
  }, [t, r]), H = ee(() => !a || fn(f, t) ? !1 : (a(Pt(f, r)), !0), [a, f, t, r]), z = ee(() => !c || fn(f, t) ? !1 : (c(Pt(f, r)), !0), [c, f, t, r]), T = ee((K) => eo(f, K), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: wc(f, r, i),
    isSelected: (K) => y.has(K),
    isDisabled: (K) => m.has(K),
    canToggle: (K) => !m.has(K) && (y.has(K) || !b),
    toggle: P,
    toggleGroup: $,
    setAll: S,
    clear: k,
    reset: A,
    commit: H,
    flush: z,
    cancel: A,
    groupState: T
  };
}
const Zo = Qt(null), kc = () => Zt(Zo), es = bc;
function Ei({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
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
function Sc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = He(), p = L(16, 20, f), m = L(12, 14, f), y = L(12, 14, f), b = L(12, 16, f), x = L(10, 12, f), P = L(8, 10, f);
  return /* @__PURE__ */ C(
    "label",
    {
      className: `ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: P, padding: d ? `${x}px ${b}px` : void 0 },
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
        d ? /* @__PURE__ */ h(Ei, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: y }, children: r })
      ]
    }
  );
}
const to = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Nc = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Cc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Tc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Ec({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, c = !!n && (t || s);
  return s ? /* @__PURE__ */ C(nt, { children: [
    c && (l ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${to} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Cc}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${to} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Nc}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Tc}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ C(nt, { children: [
    c && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const dh = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function $t({
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
  const p = Vt(), m = e ?? (p == null ? void 0 : p.mode) ?? "light", y = t ?? yc(p), b = cn({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), x = cn({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), P = cn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), $ = "", S = "", k = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", A = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, H = {
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
  }, z = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, T = {
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
  }, K = {
    light: {
      subtle: { base: `${$} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${S} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${$} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${$} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${$} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${S} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${$} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${$} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, E = {
    blue: { base: `${S} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${S} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, D = f["data-state"] === "open", O = K[m][n], V = n === "primary" ? x : n.startsWith("tab") ? P : b, Y = rt ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, N = L(6, 8, He()), _ = L(28, 40, He()), F = y === "emerald" ? "emerald" : y ? "blue" : null, M = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let we;
  if (n === "tab") {
    const X = A[m];
    we = r ? F ? H[F].active : X.active : F ? H[F][m === "light" ? "inactiveLight" : "inactiveDark"] : X.inactive;
  } else if (n === "tab-header")
    we = `${F ? r ? T[F].active : T[F].inactive : r ? z.active : z.inactive} ${D ? F ? T[F].open : z.open : ""}`;
  else if (we = `${O.base} ${D ? O.open : ""}`, r && (we = `${we} ${M}`), n === "primary" && F) {
    const X = E[F];
    we = D ? `${X.base} ${X.open}` : X.base;
  }
  const pe = !!l && !!s && !i, W = i ? { width: _, height: _, padding: 0, gap: 0 } : o === "minimal" ? { ...Y, gap: pe ? 0 : N } : { ...V, gap: pe ? 0 : N };
  return /* @__PURE__ */ h(
    "button",
    {
      type: u,
      "data-mode": m,
      "data-accent": p == null ? void 0 : p.accent,
      className: `${k} ${i ? "justify-center" : ""} ${pe ? "group" : ""} ${we} ${a}`,
      style: W,
      ...f,
      children: i ? d : /* @__PURE__ */ h(Ec, { icon: s, collapse: l, iconWithLabel: c, active: r, gap: N, children: d })
    }
  );
}
function Er({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = He(), l = i ?? L(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(Rl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(rr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(Ei, { checked: n, indeterminate: e, size: l })
    }
  );
}
function ts({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = He(), a = L(10, 14, c), u = L(6, 9, c), d = L(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
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
          $t,
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
          $t,
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
const Mi = Qt("dark"), ns = () => Zt(Mi);
function Ri() {
  const n = He();
  return {
    padding: `${L(8, 12, n)}px ${L(12, 16, n)}px`,
    fontSize: `${L(12, 14, n)}px`,
    lineHeight: `${L(18, 22, n)}px`
  };
}
function rs() {
  const n = He();
  return {
    padding: `${L(6, 9, n)}px ${L(12, 16, n)}px ${L(2, 3, n)}px`,
    fontSize: `${L(10, 11, n)}px`,
    lineHeight: `${L(14, 16, n)}px`
  };
}
const Mc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", no = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Rc = (n) => n ? "text-xs" : "text-[10px]";
function _r(n) {
  const e = rt && Ho() > 0;
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
    headerPad: no(e),
    headerText: `${no(e)} font-semibold uppercase tracking-wider ${Rc(e)} ui-label`,
    // Item padding
    itemPad: Mc(e),
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
function is(n) {
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
const Ii = Qt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), sr = Qt(null), Ai = () => Zt(sr), ss = Qt({ query: "", setQuery: () => {
} }), Ic = () => Zt(ss), ls = Qt(null), Ac = () => Zt(ls), $c = () => !0;
function jr(n) {
  const e = w([]), [t, r] = ie(-1), [i, o] = ie(!1), [s, l] = ie(0), c = ee((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = ee((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = ee(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return Xe(() => ({
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
function cs(n) {
  const e = Ai(), t = w(e);
  t.current = e;
  const r = w(null);
  oe(() => {
    var c, a;
    const l = { label: n.label(), activate: n.activate, group: ((c = n.group) == null ? void 0 : c.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (a = t.current) == null ? void 0 : a.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function $i(n, e, t, r) {
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
    var y, b, x, P, $, S;
    if (!s.current) return;
    const d = (y = l.current) == null ? void 0 : y.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const k = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((P = l.current) != null && P.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), k && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = u.key === "ArrowDown" ? 1 : -1, A = (i.current + k + m.length) % m.length;
        o.current.setHighlighted(A, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = i.current;
        k >= 0 && k < m.length && m[k].submenu && m[k].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (S = ($ = l.current) == null ? void 0 : $.onCloseSub) == null || S.call($);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = i.current;
        k >= 0 && k < m.length && m[k].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = Date.now(), A = (k - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: A, time: k }, !A) return;
        const H = i.current + 1;
        for (let z = 0; z < m.length; z++) {
          const T = (H + z) % m.length;
          if (m[T].label.toLowerCase().startsWith(A)) {
            o.current.setHighlighted(T, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function zi(n, e, t, r, i, o, s) {
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
function Di(n, e) {
  const t = w(n);
  t.current = n;
  const r = w(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Wr({
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
  const P = Vt(), $ = Xo(s, P), S = $.theme, [k, A] = ie([]), [H, z] = ie(null), T = jn(), K = wi(), E = w(null), D = w(null), O = w(n);
  O.current = n;
  const [V, Y] = ie(n), [N, _] = ie(""), F = f && y !== void 0, M = F ? y : N, we = F ? b ?? (() => {
  }) : _, pe = w(y ?? "");
  oe(() => {
    n || (pe.current = y ?? "");
  }, [n, y]);
  const W = F && M === pe.current ? "" : M, X = Ml(), Q = w(null), se = He(), J = {
    padding: `${L(8, 12, se)}px ${L(12, 16, se)}px`,
    fontSize: `${L(12, 14, se)}px`
  }, [ge, ue] = ie(0), ye = f && !F;
  oe(() => {
    var Ye;
    if (!ye || !n) return;
    const I = (Ye = D.current) == null ? void 0 : Ye.querySelector("[data-menu-items]");
    if (!I) return;
    const U = () => ue(I.offsetWidth - I.clientWidth);
    U();
    const he = new ResizeObserver(U);
    return he.observe(I), () => he.disconnect();
  }, [n, ye, M]);
  const q = Xe(() => {
    if (!f) return;
    const I = W.trim().toLowerCase();
    return I ? (U) => {
      var he;
      return m ? m(I, U.label, U.group) : U.label.toLowerCase().includes(I) || (((he = U.group) == null ? void 0 : he.toLowerCase().includes(I)) ?? !1);
    } : $c;
  }, [W, f, m]), ne = jr(q), ae = f && W.trim() !== "" && ne.items.length === 0, Se = !!x, Qe = ne.allItems.map((I) => I.itemId).filter((I) => !!I), Ze = ne.items.map((I) => I.itemId).filter((I) => !!I), ze = Qo({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? es,
    itemIds: Qe,
    visibleIds: Ze,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), ce = w(ze.reset);
  ce.current = ze.reset;
  const Ae = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(ze.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${ze.count}`;
  oe(() => {
    if (n)
      return Y(!0), F || _(""), ne.setHighlighted(d ?? -1, "keyboard"), ce.current(), Yo(() => {
        t == null || t(!1), e == null || e();
      });
    A([]);
  }, [n, d, t, e]), oe(() => {
    if (!n || !K) return;
    const I = (U) => {
      if (U.pointerType !== "touch") return;
      const he = U.target;
      he && (D.current && D.current.contains(he) || E.current && E.current.contains(he) || he instanceof Element && he.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return K.addEventListener("pointerdown", I, { capture: !0 }), () => K.removeEventListener("pointerdown", I, { capture: !0 });
  }, [n, K, t, e]);
  const me = ee(() => {
    const I = E.current;
    if (!I) return null;
    const U = I.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), _e = Hr({
    visible: n,
    morph: c,
    anchor: me,
    onClosed: () => Y(!1)
  }), je = w(() => {
  }), Pe = w(() => {
  }), et = w(() => {
  }), Ee = ee((I) => {
    if (I.key === "Enter") {
      const U = ne.highlightedIndex, he = ne.items[U >= 0 ? U : 0];
      return he == null || he.activate(), !0;
    }
    return I.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [ne, t, e]);
  $i(n && k.length === 0, ne, je, {
    onFieldKey: Ee,
    onSelectAll: Se ? () => ze.setAll(!0) : void 0
  }), Di(n, Pe), zi(n, ne, je, D, k.length > 0, et, {
    ignoreFields: F,
    selectAll: Se
  });
  const Le = w(null), Rt = ee((I) => {
    var U;
    if (I) {
      I.addEventListener("keydown", je.current, { capture: !0 }), I.addEventListener("wheel", Pe.current, { passive: !1 });
      const he = I.ownerDocument;
      Le.current = he, he.addEventListener("keydown", et.current, { capture: !0 }), Ct(!0);
    } else
      (U = Le.current) == null || U.removeEventListener("keydown", et.current, { capture: !0 }), Le.current = null, Ct(!1);
    D.current = I, _e(I);
  }, [_e]), [Fe, It] = ie({ top: 0, left: 0, maxH: Jo, side: "bottom", ready: !1 }), [We, pt] = ie(0), [mt, Ct] = ie(!1);
  oe(() => {
    n && E.current && pt(E.current.getBoundingClientRect().width);
  }, [n]), Vo({
    anchorRef: E,
    panelRef: D,
    open: n && mt,
    maxHeight: u,
    onPosition: It
  }), oe(() => {
    var I;
    if (Fe.ready && n) {
      if (f) {
        (I = Q.current ?? E.current) == null || I.focus();
        return;
      }
      const U = D.current;
      U && U.ownerDocument.activeElement !== U && !U.contains(U.ownerDocument.activeElement) && U.focus();
    }
  }, [Fe.ready, n, f]), oe(() => {
    if (!n || !f) return;
    if (ne.items.length === 0) {
      ne.highlightedIndex !== -1 && ne.setHighlighted(-1, "keyboard");
      return;
    }
    const I = ne.highlightedIndex;
    (I < 0 || I >= ne.items.length) && ne.setHighlighted(0, "keyboard");
  }, [n, M, f, ne.items.length]), xt(() => {
    var U;
    if (!n || ne.highlightedIndex < 0 || ne.pointerDriven) return;
    const I = (U = D.current) == null ? void 0 : U.querySelector(`[data-ei="${ne.highlightedIndex}"]`);
    an(I, "nearest");
  }, [n, ne.highlightedIndex, ne.pointerDriven]);
  const Ue = ee((I) => {
    if (!(!I && !O.current)) {
      if (!I && kt.current) {
        if (F) return;
        ct.current = !0;
      }
      t ? t(I) : I || e == null || e();
    }
  }, [t, e]), wt = w(V);
  wt.current = V;
  const kt = w(!1), ct = w(!1), Bt = ee(() => {
    if (!O.current && wt.current) {
      if (ct.current) {
        ct.current = !1, kt.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), Ie = ot.isValidElement(r) ? r : null, Ve = w(!1), Kt = ee(() => {
    const I = E.current;
    I && (Ve.current = !0, I.focus(), setTimeout(() => {
      Ve.current = !1;
    }, 0));
  }, []), qe = Ie ? ot.cloneElement(Ie, {
    ref: (I) => {
      E.current = I;
      const U = Ie.props.ref;
      typeof U == "function" ? U(I) : U && (U.current = I);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...F ? { type: Ie.props.type ?? "text" } : {},
    ...F ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${X}-content` : void 0,
      "aria-activedescendant": n && ne.highlightedIndex >= 0 ? `${X}-opt-${ne.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (I) => {
      var U, he;
      (he = (U = Ie.props).onPointerDownCapture) == null || he.call(U, I), kt.current = !0, ct.current = !1, setTimeout(() => {
        kt.current = !1;
      }, 0);
    },
    onPointerDown: (I) => {
      var U, he;
      if ((he = (U = Ie.props).onPointerDown) == null || he.call(U, I), F) {
        I.preventDefault();
        const Ye = O.current;
        Ye || t == null || t(!0);
        const Oe = E.current;
        Oe == null || Oe.focus(), !Ye && Oe instanceof HTMLInputElement && Oe.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (I) => {
      var U, he;
      (he = (U = Ie.props).onKeyDownCapture) == null || he.call(U, I), F && I.key === " " && I.stopPropagation();
    },
    onClick: (I) => {
      var U, he;
      (he = (U = Ie.props).onClick) == null || he.call(U, I), Bt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (I) => {
      var U, he;
      if (Ve.current) {
        Ve.current = !1;
        return;
      }
      (he = (U = Ie.props).onFocus) == null || he.call(U, I);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (I) => {
      var he, Ye, Oe, ke;
      if ((Ye = (he = Ie.props).onBlur) == null || Ye.call(he, I), !F || !O.current) return;
      const U = I.relatedTarget;
      U && ((Oe = D.current) != null && Oe.contains(U) || (ke = E.current) != null && ke.contains(U)) || setTimeout(() => {
        var G;
        const Tt = E.current;
        if (!Tt || !O.current) return;
        const v = Tt.ownerDocument.activeElement;
        v && (Tt.contains(v) || (G = D.current) != null && G.contains(v)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (I) => {
      var U, he;
      if ((he = (U = Ie.props).onKeyDown) == null || he.call(U, I), !(!F || !O.current)) {
        if (I.key === "ArrowDown" || I.key === "ArrowUp") {
          I.preventDefault();
          const Ye = ne.items;
          if (Ye.length === 0) return;
          const Oe = I.key === "ArrowDown" ? 1 : -1, ke = (ne.highlightedIndex + Oe + Ye.length) % Ye.length;
          ne.setHighlighted(ke, "keyboard");
        } else if (I.key === "Enter") {
          I.preventDefault();
          const Ye = ne.highlightedIndex, Oe = ne.items[Ye >= 0 ? Ye : 0];
          Oe == null || Oe.activate();
        }
      }
    }
  }) : r, Ft = /* @__PURE__ */ C("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ C("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      W.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), gt = ye || Se, St = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${gt ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ C(De.Root, { open: n || V, onOpenChange: Ue, modal: !1, children: [
    /* @__PURE__ */ h(De.Trigger, { asChild: !0, children: qe }),
    /* @__PURE__ */ h(De.Portal, { container: T ?? void 0, children: /* @__PURE__ */ h(Mi.Provider, { value: S, children: /* @__PURE__ */ h(Ii.Provider, { value: { chain: k, setChain: A, morph: c, keyboardOpened: H, setKeyboardOpened: z }, children: /* @__PURE__ */ h(sr.Provider, { value: ne, children: /* @__PURE__ */ h(ss.Provider, { value: { query: M, setQuery: we }, children: /* @__PURE__ */ h(Zo.Provider, { value: Se ? ze : null, children: /* @__PURE__ */ h(ls.Provider, { value: X, children: /* @__PURE__ */ C(
      De.Content,
      {
        id: `${X}-content`,
        ref: Rt,
        tabIndex: F ? void 0 : -1,
        ...$.attrs,
        "data-ui-fixed": !0,
        className: `${St} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Fe.left,
          top: Fe.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : We || void 0,
          maxHeight: Fe.maxH,
          visibility: Fe.ready ? "visible" : "hidden"
        },
        onPointerLeave: ne.pointerLeave,
        onFocusCapture: F ? (I) => {
          I.target === I.currentTarget && (I.stopPropagation(), Kt());
        } : void 0,
        onFocusOutside: F ? (I) => {
          var he;
          const U = I.target;
          U && (U === E.current || (he = E.current) != null && he.contains(U)) && I.preventDefault();
        } : void 0,
        onCloseAutoFocus: F ? (I) => {
          I.preventDefault(), Kt();
        } : void 0,
        children: [
          ye && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ge }, children: /* @__PURE__ */ C("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: J, children: [
            /* @__PURE__ */ h(hn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: Q,
                value: M,
                onChange: (I) => we(I.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            M ? /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (I) => I.stopPropagation(),
                onClick: () => {
                  var I;
                  we(""), (I = Q.current) == null || I.focus();
                },
                children: /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          gt ? /* @__PURE__ */ C("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            ae && Ft
          ] }) : /* @__PURE__ */ C(nt, { children: [
            l,
            ae && Ft
          ] }),
          Se && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            ts,
            {
              count: ze.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : ze.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: S,
              onClear: ze.clear,
              hero: {
                label: Ae,
                onClick: () => {
                  ze.commit(), Ue(!1);
                },
                disabled: ze.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) })
  ] });
}
function fh({
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
  header: P,
  itemLabel: $,
  trigger: S,
  minItems: k = 1,
  itemRender: A,
  morph: H = !0,
  contentClassName: z
}) {
  const T = _r(), K = Ri(), [E, D] = ie(null), [O, V] = ie(""), Y = w(O);
  Y.current = O;
  const N = w(null), _ = w(null), [F, M] = ie(null), we = ee((J) => {
    _.current = J, M(J);
  }, []), pe = Go({
    open: n,
    scroller: () => _.current,
    row: () => {
      var J;
      return ((J = _.current) == null ? void 0 : J.querySelector('[data-active="1"]')) ?? null;
    }
  });
  oe(() => {
    if (!n) return;
    const J = (ue) => {
      var Ze, ze;
      const ye = ue.target;
      if (ye && ye.closest("input, textarea, [contenteditable]")) {
        E && ye === N.current && (ue.key === "Enter" ? (ue.preventDefault(), ue.stopImmediatePropagation(), X()) : ue.key === "Escape" && (ue.preventDefault(), ue.stopImmediatePropagation(), Q()));
        return;
      }
      const q = (Ze = _.current) == null ? void 0 : Ze.closest(".ui-menu");
      if (!q || !q.contains(ue.target)) return;
      const ne = q.ownerDocument, ae = [...q.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Se = [...q.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], Qe = [...ae, ...Se];
      if (ue.key === "ArrowDown" || ue.key === "ArrowUp") {
        ue.preventDefault(), ue.stopImmediatePropagation();
        const ce = ne.activeElement;
        let Ae = ce ? Qe.indexOf(ce) : -1;
        if (Ae < 0 && ce) {
          const Pe = ce.closest("[data-im-row]"), et = Pe == null ? void 0 : Pe.querySelector('[role="menuitem"]:first-child');
          et && (Ae = ae.indexOf(et));
        }
        const me = ue.key === "ArrowDown" ? 1 : -1, _e = Ae < 0 ? me === 1 ? 0 : Qe.length - 1 : (Ae + me + Qe.length) % Qe.length, je = Qe[_e];
        je == null || je.focus({ preventScroll: !0 }), an((je == null ? void 0 : je.closest("[data-im-row]")) ?? je, "nearest", _.current);
        return;
      }
      if (ue.key === "ArrowLeft" || ue.key === "ArrowRight") {
        const ce = ne.activeElement, Ae = ce == null ? void 0 : ce.closest("[data-im-row]");
        if (!Ae) return;
        ue.preventDefault(), ue.stopImmediatePropagation();
        const me = [...Ae.querySelectorAll('[role="menuitem"]')].slice(1);
        if (me.length === 0) return;
        const _e = ce && Ae.contains(ce) ? me.indexOf(ce) : -1, je = ue.key === "ArrowRight" ? 1 : -1, Pe = _e < 0 ? 0 : (_e + je + me.length) % me.length;
        (ze = me[Pe]) == null || ze.focus({ preventScroll: !0 });
        return;
      }
    }, ge = (F == null ? void 0 : F.ownerDocument) ?? null;
    return ge == null || ge.addEventListener("keydown", J, { capture: !0 }), () => ge == null ? void 0 : ge.removeEventListener("keydown", J, { capture: !0 });
  }, [n, E, F]), oe(() => {
    if (!E) return;
    const J = t.find((q) => q.id === E);
    J && !O && V(J.name);
    const ge = requestAnimationFrame(() => {
      const q = N.current;
      q && (q.focus(), q.select());
    });
    let ue = 0;
    const ye = window.setInterval(() => {
      const q = N.current;
      if (ue++, !q || ue > 12) {
        clearInterval(ye);
        return;
      }
      q.ownerDocument.activeElement !== q && (q.focus(), q.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ge), clearInterval(ye);
    };
  }, [E]), oe(() => {
    if (E) {
      const J = t.find((ge) => ge.id === E);
      J && !O && V(J.name);
    }
  }, [E, t]);
  const W = (J, ge) => {
    D(J), V(ge);
  }, X = () => {
    E && Y.current.trim() && o(E, Y.current.trim()), D(null);
  }, Q = () => {
    D(null);
  }, se = $ || P.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ C(Wr, { open: n, onOpenChange: (J) => {
    J ? (D(null), V("")) : (E && O.trim() && o(E, O.trim()), D(null), V("")), (!J || !m) && e(J);
  }, width: "w-80", theme: y, align: b, trigger: S, morph: H, contentClassName: z, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${T.headerText}`, children: P }),
    /* @__PURE__ */ h("div", { ref: we, "data-im-list": !0, onPointerEnter: pe.engage, onPointerDown: pe.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((J) => {
      const ge = J.id === r, ue = E === J.id;
      return /* @__PURE__ */ h("div", { "data-im-row": J.id, "data-active": ge ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ge || ue ? T.rowActiveBg : T.rowHoverBg} ${E && !ue ? "opacity-40 pointer-events-none" : ""}`, children: ue ? /* @__PURE__ */ C(nt, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: N,
            autoFocus: !0,
            value: O,
            onChange: (ye) => V(ye.target.value),
            onKeyDown: (ye) => {
              ye.key === "Enter" && (ye.preventDefault(), ye.stopPropagation(), X()), ye.key === "Escape" && (ye.preventDefault(), ye.stopPropagation(), Q());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: K
          }
        ) }),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${T.editConfirm}`,
            onSelect: (ye) => {
              ye.preventDefault(), X();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(rr, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${T.editCancel}`,
            onSelect: (ye) => {
              ye.preventDefault(), Q();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(xn, { className: T.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ C(nt, { children: [
        /* @__PURE__ */ h(
          De.Item,
          {
            style: K,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${T.rowText} ${ge ? "" : T.rowTextHover}`,
            onSelect: p ? () => {
              i(J.id);
            } : (ye) => {
              ye.preventDefault(), i(J.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${ge ? T.rowActiveText : ""}`, children: A ? A(J) : J.name })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ge ? T.btnActive : T.btnBase}`,
            onSelect: (ye) => {
              ye.preventDefault(), W(J.id, J.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Il, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ge ? T.btnActive : T.btnBase}`,
            onSelect: (ye) => {
              ye.preventDefault();
              const q = s(J.id);
              q && W(q, `${J.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Po, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= k ? T.btnDisabled : ge ? T.btnDangerActive : T.btnDanger}`,
            onSelect: (ye) => {
              ye.preventDefault(), l(J.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= k,
            children: /* @__PURE__ */ h(ci, { className: T.btnIcon })
          }
        )
      ] }) }, J.id);
    }) }),
    /* @__PURE__ */ C("div", { className: `shrink-0 ${E ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ C(nt, { children: [
        /* @__PURE__ */ h(De.Separator, { className: T.separator }),
        /* @__PURE__ */ C(
          De.Item,
          {
            className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
            onSelect: (J) => {
              J.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(Lo, { className: `${T.btnIcon} ${T.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(De.Separator, { className: T.separator }),
      c && /* @__PURE__ */ C(
        De.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (J) => {
            J.preventDefault();
            const ge = c();
            ge && W(ge, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(Or, { className: `${T.btnIcon} ${T.icon}` }),
            "New ",
            se
          ]
        }
      ),
      a && /* @__PURE__ */ C(
        De.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (J) => {
            J.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ C(
        De.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (J) => {
            J.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ C(
        De.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (J) => {
            J.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(ci, { className: `${T.btnIcon} ${T.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function zc({
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
  ns();
  const f = _r(), p = Ri(), m = rs(), y = w(!1), b = w(null), x = kc(), P = !!x && d !== void 0, $ = x && d !== void 0 ? x.isSelected(d) : l, S = t || (x && d !== void 0 ? !x.canToggle(d) : !1), { myIndex: k, highlighted: A, setPointer: H, api: z } = cs({
    label: () => is(o),
    activate: () => {
      S || (x && d !== void 0 ? x.toggle(d) : n());
    },
    disabled: S,
    group: u,
    itemId: d
  }), { query: T } = Ic(), K = T.trim() !== "" && k < 0, E = Ac(), D = u == null ? void 0 : u.trim(), O = !!D && k >= 0 && (k === 0 || ((_ = z == null ? void 0 : z.items[k - 1]) == null ? void 0 : _.group) !== D), V = D && x ? ((z == null ? void 0 : z.items) ?? []).filter((F) => F.group === D && F.itemId).map((F) => F.itemId).filter((F) => !x.isDisabled(F)) : [], Y = x && V.length > 0 ? x.groupState(V) : "none", N = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ C(nt, { children: [
    O && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": D,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && V.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && V.length > 0 ? /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${D}`,
              onMouseDown: (F) => F.preventDefault(),
              onClick: () => x.toggleGroup(V),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Er,
                {
                  checked: Y === "all",
                  indeterminate: Y === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: D })
        ] }) : D
      }
    ),
    /* @__PURE__ */ C(
      De.Item,
      {
        ref: b,
        id: E && k >= 0 ? `${E}-opt-${k}` : void 0,
        "data-ei": k >= 0 ? k : void 0,
        ...P ? { role: "menuitemcheckbox", "aria-checked": $ } : {},
        style: { ...p, display: K ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${N} ${P ? "" : l ? "ui-item-selected" : ""} ${A ? "ui-item-highlighted" : ""} ${S ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (F) => {
          if (y.current) {
            y.current = !1;
            return;
          }
          if (P) {
            F.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && F.preventDefault(), n();
        },
        onPointerEnter: () => {
          H(k);
        },
        onTouchStart: () => {
        },
        disabled: S,
        children: [
          P && /* @__PURE__ */ h(Er, { checked: $, disabled: S, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (F) => {
                F.stopPropagation(), F.preventDefault(), y.current = !0, c.onClick();
              },
              onClick: (F) => {
                F.stopPropagation(), F.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function Dc({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Zt(Ii), f = l.includes(n), p = l[l.length - 1] === n, m = ns(), y = jn(), b = w(null), x = w(null), [P, $] = ie(f), S = !f && P;
  oe(() => {
    f && $(!0);
  }, [f]);
  const k = () => c((Q) => {
    const se = Q.indexOf(n);
    return se >= 0 ? Q.slice(0, se) : Q;
  }), A = jr(), H = Ai(), z = w(H);
  z.current = H;
  const T = w(null);
  oe(() => {
    var se;
    const Q = {
      label: e,
      activate: () => {
        d(n), c((J) => J.includes(n) ? J : [...J, n]);
      },
      submenu: !0
    };
    return T.current = Q, (se = z.current) == null ? void 0 : se.register(Q);
  }, []);
  const K = H && T.current ? H.items.indexOf(T.current) : -1, E = K >= 0 && K === H.highlightedIndex, D = ee(() => {
    const Q = b.current;
    if (!Q) return null;
    const se = Q.getBoundingClientRect();
    return { left: se.left, top: se.top, width: se.width, height: se.height };
  }, []), O = Hr({
    visible: f,
    morph: a,
    anchor: D,
    onClosed: () => $(!1)
  }), V = w(() => {
  }), Y = w(() => {
  }), N = w(() => {
  });
  $i(f && p, A, V, {
    onCloseSub: () => {
      k(), H && K >= 0 && H.setHighlighted(K, "keyboard");
    }
  });
  const _ = w(u);
  _.current = u, oe(() => {
    f && (_.current === n ? (A.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var Q;
      return (Q = x.current) == null ? void 0 : Q.focus();
    }), d(null)) : A.setHighlighted(-1, "keyboard"));
  }, [f]), Di(f, Y), zi(f, A, V, x, !p, N), ot.useLayoutEffect(() => {
    var se;
    if (!f || A.highlightedIndex < 0 || A.pointerDriven) return;
    const Q = (se = x.current) == null ? void 0 : se.querySelector(`[data-ei="${A.highlightedIndex}"]`);
    an(Q, "nearest", x.current);
  }, [f, A.highlightedIndex, A.pointerDriven]);
  const F = w(null), M = ee((Q) => {
    var se;
    if (Q) {
      Q.addEventListener("keydown", V.current, { capture: !0 }), Q.addEventListener("wheel", Y.current, { passive: !1 });
      const J = Q.ownerDocument;
      F.current = J, J.addEventListener("keydown", N.current, { capture: !0 });
    } else
      (se = F.current) == null || se.removeEventListener("keydown", N.current, { capture: !0 }), F.current = null;
    x.current = Q, O(Q);
  }, [O]), we = He(), pe = { padding: `${L(8, 12, we)}px ${L(12, 16, we)}px`, fontSize: L(12, 14, we) }, W = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${E ? " ui-item-highlighted" : ""}${S ? " ui-sub-closing" : ""}`, X = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ C(De.Sub, { open: f || P, onOpenChange: (Q) => c((se) => {
    if (!Q) {
      const J = se.indexOf(n);
      return J >= 0 ? se.slice(0, J) : se;
    }
    return se.includes(n) ? se : [...se, n];
  }), children: [
    /* @__PURE__ */ C(
      De.SubTrigger,
      {
        ref: b,
        "data-ei": K >= 0 ? K : void 0,
        style: pe,
        className: W,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          H && K >= 0 && H.setHighlighted(K, "pointer");
        },
        onPointerDown: (Q) => {
          Q.pointerType === "pen" && (Q.preventDefault(), c((se) => f ? se.slice(0, se.indexOf(n)) : [...se, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Cr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Cr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ h(De.Portal, { container: y ?? void 0, children: /* @__PURE__ */ h(
      De.SubContent,
      {
        ref: M,
        "data-theme": m,
        className: X,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: A.pointerLeave,
        children: /* @__PURE__ */ h(sr.Provider, { value: A, children: o })
      }
    ) })
  ] });
}
const Kn = 8, hh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Vt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? Xo(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = He(), f = L(12, 14, d), p = w(null), m = ir(), [y, b] = ie(!1), [x, P] = ie([]), [$, S] = ie(null), k = jr();
  oe(() => {
    if (n)
      return k.setHighlighted(-1, "keyboard"), Yo(r);
  }, [n, r]);
  const A = w({ left: e, top: t });
  n && (A.current = { left: e, top: t });
  const H = ee(() => ({ left: A.current.left, top: A.current.top, width: 0, height: 0 }), []), z = Hr({
    visible: !0,
    morph: l,
    anchor: H,
    cloneOnUnmount: !0
  }), T = w(() => {
  }), K = w(() => {
  }), E = w(() => {
  });
  $i(n, k, T), xt(() => {
    if (!n || k.highlightedIndex < 0 || k.pointerDriven) return;
    const N = p.current;
    an(
      N == null ? void 0 : N.querySelector(`[data-ei="${k.highlightedIndex}"]`),
      "nearest",
      N
    );
  }, [n, k.highlightedIndex, k.pointerDriven]), Di(n, K), zi(n, k, T, p, x.length > 0, E);
  const D = w(null), O = ee((N) => {
    var _;
    if (N) {
      N.addEventListener("keydown", T.current, { capture: !0 }), N.addEventListener("wheel", K.current, { passive: !1 });
      const F = N.ownerDocument;
      D.current = F, F.addEventListener("keydown", E.current, { capture: !0 });
    } else
      (_ = D.current) == null || _.removeEventListener("keydown", E.current, { capture: !0 }), D.current = null;
    p.current = N, b(!!N), z(N);
  }, [z]), [V, Y] = ie(null);
  return xt(() => {
    var J;
    if (!n || !y || !p.current) return;
    const N = p.current, _ = N.offsetWidth, F = N.offsetHeight, M = (J = o == null ? void 0 : o.current) == null ? void 0 : J.getBoundingClientRect(), we = M ? M.right : (m == null ? void 0 : m.innerWidth) ?? 0, pe = M ? M.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, W = M ? M.left : 0, X = M ? M.top : 0;
    let Q = Math.max(X + Kn, A.current.top), se = Math.max(W + Kn, A.current.left);
    se + _ > we && (se = we - _ - Kn), Q + F > pe && (Q = Math.max(X + Kn, pe - F - Kn)), Y({ left: se, top: Q });
  }, [n, y, e, t, o]), n ? /* @__PURE__ */ C(De.Root, { open: n, onOpenChange: (N) => {
    N || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(De.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(De.Portal, { children: /* @__PURE__ */ h(Mi.Provider, { value: u, children: /* @__PURE__ */ h(Ii.Provider, { value: { chain: x, setChain: P, morph: l, keyboardOpened: $, setKeyboardOpened: S }, children: /* @__PURE__ */ h(sr.Provider, { value: k, children: /* @__PURE__ */ h(
      De.Content,
      {
        ref: O,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (V == null ? void 0 : V.left) ?? A.current.left, top: (V == null ? void 0 : V.top) ?? A.current.top, touchAction: "manipulation" },
        onPointerLeave: k.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, ph = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = He(), c = { padding: `${L(8, 12, l)}px ${L(12, 16, l)}px`, fontSize: L(12, 14, l) }, a = Ai(), u = w(a);
  u.current = a;
  const d = w(null);
  oe(() => {
    var y;
    const m = { label: is(s), activate: () => {
      r || n();
    } };
    return d.current = m, (y = u.current) == null ? void 0 : y.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ C(
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
}, mh = () => /* @__PURE__ */ h(De.Separator, { className: "ui-sep my-1" }), gh = (n) => /* @__PURE__ */ h(Dc, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), $e = 8, as = "[data-modal-stack]", Xt = 220, Gn = "cubic-bezier(0.32, 0.72, 0, 1)", wr = 0.94;
function In() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function on(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function us(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function ro(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = us(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Xt}ms ${Gn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, Xt + 80));
    });
  });
}
function Pc(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${wr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Xt}ms ${Gn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Xt + 60));
    });
  });
}
function io(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - wr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * wr, height: i.height * wr };
  e.style.transition = `transform ${Xt}ms ${Gn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = us(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, Xt + 60);
}
function Gr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(as) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function dr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(as) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Lc({
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
  const y = Vt(), b = Ci(
    { mode: f, accent: m, surface: p, context: "surface" },
    y
  ), x = b.mode, P = b.surface, $ = b.accent, S = w(null), k = w(null), A = w(null), H = He(), z = L(20, 24, H), T = L(10, 12, H), K = L(12, 14, H), E = L(14, 16, H), D = L(20, 24, H), O = L(20, 24, H), V = L(20, 24, H), Y = L(14, 16, H), N = L(16, 20, H), _ = L(10, 12, H), F = L(12, 14, H), M = L(8, 10, H), we = L(4, 6, H), pe = { padding: `${T}px ${z}px` }, W = { fontSize: K }, X = { padding: `${O}px ${D}px 16px ${D}px` }, Q = { fontSize: E }, se = { padding: `0 ${D}px 16px` }, J = { padding: `${V}px ${D}px` }, ge = { fontSize: _, padding: `${we}px ${M}px` }, [ue, ye] = ie(!1), q = ee((v) => {
    S.current = v, ye(v !== null);
  }, []), ne = jn(), ae = ir(), Se = w(ae);
  Se.current = ae;
  const [Qe, Ze] = ie(null), ze = w(null), ce = w(!1), Ae = w(!1), me = w(0), _e = w({ w: 0, h: 0 }), je = w(!1), [Pe, et] = ie(!1), [Ee, Le] = ie(!1), Rt = w(0), Fe = w(!1), [It, We] = ie(!1), pt = w(c);
  pt.current = c;
  const mt = w(!1), Ct = w(!1), Ue = () => {
    Ct.current = !0, et(!0);
  }, wt = () => {
    Ct.current = !1, et(!1);
  };
  oe(() => {
    n || (Ze(null), je.current = !1, ce.current = !1, Le(!1));
  }, [n]), xt(() => {
    if (!n || je.current || !ue || !S.current) return;
    je.current = !0;
    const v = S.current.getBoundingClientRect(), G = Se.current ?? null, te = (G == null ? void 0 : G.innerWidth) ?? 0, fe = on(G);
    Ze({
      left: Math.max($e, Math.min((te - v.width) / 2, te - v.width - $e)),
      top: Math.max(fe.top + $e, Math.min(fe.top + (fe.height - v.height) / 2, fe.bottom - v.height - $e))
    });
  }, [n, ue]), xt(() => {
    if (!n || !ue || !c || In() || !S.current) return;
    const v = S.current, G = Gr(v), te = G[G.length - 1];
    Ue(), te ? ro(Rt, v, te.getBoundingClientRect(), wt) : Pc(Rt, v, wt);
  }, [n, ue]);
  const kt = ee(() => {
    if (!u || Fe.current) return;
    const v = S.current, G = !!v && Gr(v).length > 0;
    if (!v || !c || In() || G) {
      e();
      return;
    }
    Fe.current = !0, We(!0), mt.current = !0, Ue(), io(Rt, v, () => {
      Fe.current = !1, We(!1), wt(), e();
    });
  }, [c, e, u]), ct = ee(() => {
    const v = S.current;
    if (!v || mt.current || !pt.current || In() || Gr(v).length > 0) return;
    const G = v.ownerDocument, te = v.cloneNode(!0);
    te.removeAttribute("data-modal-stack"), te.removeAttribute("data-state"), te.removeAttribute("role"), te.removeAttribute("data-aria-hidden"), te.removeAttribute("tabindex"), te.setAttribute("aria-hidden", "true"), te.style.pointerEvents = "none", G.body.appendChild(te), io({ current: 0 }, te, () => {
      te.isConnected && te.remove();
    });
  }, []);
  xt(() => () => ct(), [ct]);
  const Bt = w(n);
  xt(() => {
    const v = Bt.current;
    Bt.current = n, v && !n && ct();
  }, [n, ue, ct]), oe(() => {
    if (!n || !ue || !c || !S.current) return;
    const v = S.current, G = v.parentNode;
    if (!G) return;
    let te = 0, fe = null, be = !1;
    const Me = () => {
      te = 0;
      const Be = dr(v);
      if (Be.length > 0)
        v.style.opacity = "", v.style.pointerEvents = "", fe = Be[Be.length - 1].getBoundingClientRect(), be = !0, te = requestAnimationFrame(Me);
      else if (be) {
        be = !1, fe && !In() && (Ue(), ro(Rt, v, fe, wt)), fe = null;
        const Ce = Se.current ?? null;
        Ce == null || Ce.setTimeout(() => {
          !v || !v.isConnected || getComputedStyle(v).opacity !== "1" && (v.style.opacity = "1", v.style.pointerEvents = "");
        }, 240);
      }
    }, Ne = new MutationObserver(() => {
      !te && dr(v).length > 0 && (te = requestAnimationFrame(Me));
    });
    return Ne.observe(G, { childList: !0 }), () => {
      Ne.disconnect(), te && cancelAnimationFrame(te);
    };
  }, [n, ue]), oe(() => {
    if (!ue || !c || In() || !S.current) return;
    const v = S.current;
    let G = Math.round(v.getBoundingClientRect().height), te = !1;
    const fe = new ResizeObserver(() => {
      if (!v.isConnected) return;
      const be = Math.round(v.getBoundingClientRect().height);
      if (!te) {
        te = !0, G = be;
        return;
      }
      if (Math.abs(be - G) < 1) return;
      if (ze.current || Fe.current || dr(v).length > 0) {
        G = be;
        return;
      }
      if (Ct.current) return;
      const Me = G;
      G = be, Ue();
      const Ne = v.getBoundingClientRect(), Be = on(Se.current ?? null), Ce = !ce.current && !Ae.current, Nt = Ce ? Be.top + (Be.height - Me) / 2 : Ne.top, ft = Ce ? Be.top + (Be.height - be) / 2 : Ne.top;
      v.style.transition = "none", v.style.height = `${Me}px`, Ce && (v.style.top = `${Nt}px`), k.current && (k.current.style.overflow = "hidden"), v.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          v.style.height === `${Me}px` && (v.style.transition = `height ${Xt}ms ${Gn}${Ce ? `, top ${Xt}ms ${Gn}` : ""}`, v.style.height = `${be}px`, Ce && (v.style.top = `${ft}px`), window.setTimeout(() => {
            v.style.height === `${be}px` && (v.style.transition = "", v.style.height = "", k.current && (k.current.style.overflow = ""), Ce && Ze({ left: Ne.left, top: ft }), wt());
          }, Xt + 60));
        });
      });
    });
    return fe.observe(v), () => fe.disconnect();
  }, [ue]), oe(() => {
    if (!ue || !S.current || c && !In()) return;
    const v = S.current, G = new ResizeObserver(() => {
      if (!v.isConnected || ze.current || Fe.current || Ae.current || dr(v).length > 0) return;
      const te = Se.current ?? null, fe = on(te), be = (te == null ? void 0 : te.innerWidth) ?? 0, Me = v.getBoundingClientRect(), Ne = Math.max(fe.top + $e, Math.min(Me.top, fe.bottom - Me.height - $e)), Be = Math.max($e, Math.min(Me.left, be - Me.width - $e));
      (Math.abs(Ne - Me.top) > 0.5 || Math.abs(Be - Me.left) > 0.5) && Ze({ left: Be, top: Ne });
    });
    return G.observe(v), () => G.disconnect();
  }, [ue, c]);
  const Ie = ee(() => {
    const v = S.current;
    if (!v) return null;
    const G = v.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), Ve = ee((v, G) => {
    const te = Se.current ?? null, fe = (te == null ? void 0 : te.innerWidth) ?? 0, be = on(te), Me = Ie(), Ne = Me ? Me.width : Math.min(fe - $e * 2, 576), Be = Me ? Me.height : Math.min(be.height - $e * 2, 400);
    return {
      left: Math.max($e, Math.min(v, fe - Ne - $e)),
      top: Math.max(be.top + $e, Math.min(G, be.bottom - Be - $e))
    };
  }, [Ie]);
  oe(() => {
    if (!n) return;
    const v = Se.current ?? null, G = (v == null ? void 0 : v.visualViewport) ?? null;
    if (!v || !G) return;
    const te = 120;
    Ae.current = !1, _e.current = { w: v.innerWidth, h: v.innerHeight };
    let fe = 0;
    const be = () => {
      if (Fe.current || ze.current) return;
      const Ne = (v == null ? void 0 : v.innerHeight) ?? 0, Be = (v == null ? void 0 : v.innerWidth) ?? 0, Nt = on(v).height < Ne - te, ft = Ne < _e.current.h - te && Be === _e.current.w;
      Nt || ft ? (Ae.current = !0, me.current && (clearTimeout(me.current), me.current = 0)) : me.current || (me.current = (v == null ? void 0 : v.setTimeout(() => {
        Ae.current = !1, me.current = 0, Le(!1);
      }, 600)) ?? 0), Le(Ae.current), !fe && (fe = requestAnimationFrame(() => {
        var Ht;
        fe = 0;
        const Jt = S.current;
        if (!Jt) return;
        const Te = on(Se.current ?? null), ut = Jt.getBoundingClientRect(), Nn = ((Ht = Se.current) == null ? void 0 : Ht.innerWidth) ?? 0, it = (v == null ? void 0 : v.innerHeight) ?? 0, tn = Te.height < it - te || it < _e.current.h - te && (v == null ? void 0 : v.innerWidth) === _e.current.w;
        _e.current = { w: (v == null ? void 0 : v.innerWidth) ?? 0, h: it };
        const At = ut.top >= Te.top + $e && ut.bottom <= Te.bottom - $e, Et = () => {
          Ze({
            left: Math.max($e, Math.min((Nn - ut.width) / 2, Nn - ut.width - $e)),
            top: Math.max(Te.top + $e, Math.min(Te.top + (Te.height - ut.height) / 2, Te.bottom - ut.height - $e))
          });
        };
        if (tn && !rt) {
          if (ce.current) {
            At || Ze(Ve(ut.left, ut.top));
            return;
          }
          if (At) return;
          Et();
          return;
        }
        if (!Ae.current) {
          if (ce.current) {
            At || Ze(Ve(ut.left, ut.top));
            return;
          }
          At || Et();
        }
      }));
    };
    G.addEventListener("resize", be), G.addEventListener("scroll", be);
    const Me = () => {
      Fe.current || ze.current || fe || (fe = requestAnimationFrame(() => {
        fe = 0;
        const Ne = S.current;
        if (!Ne) return;
        const Be = Se.current ?? null, Ce = on(Be), Nt = (Be == null ? void 0 : Be.innerWidth) ?? 0, ft = Ne.getBoundingClientRect();
        if (ce.current) {
          Ze(Ve(ft.left, ft.top));
          return;
        }
        Ze({
          left: Math.max($e, Math.min((Nt - ft.width) / 2, Nt - ft.width - $e)),
          top: Math.max(Ce.top + $e, Math.min(Ce.top + (Ce.height - ft.height) / 2, Ce.bottom - ft.height - $e))
        });
      }));
    };
    return v.addEventListener("orientationchange", Me), () => {
      G.removeEventListener("resize", be), G.removeEventListener("scroll", be), v.removeEventListener("orientationchange", Me), fe && cancelAnimationFrame(fe), me.current && clearTimeout(me.current);
    };
  }, [n, Ve]);
  const Kt = ee((v) => {
    if (v.target.closest("button")) return;
    ce.current = !0;
    const G = Ie();
    G && (Ze(Ve(G.left, G.top)), ze.current = { startX: v.clientX, startY: v.clientY, posX: G.left, posY: G.top }, v.target.setPointerCapture(v.pointerId));
  }, [Ie, Ve]), qe = ee((v) => {
    const G = ze.current;
    G && (v.preventDefault(), Ze(Ve(G.posX + v.clientX - G.startX, G.posY + v.clientY - G.startY)));
  }, [Ve]), Ft = ee(() => {
    ze.current = null;
  }, []), gt = ze.current !== null, St = ee(() => {
    ce.current = !1;
    const v = Se.current ?? null, G = on(v), te = (v == null ? void 0 : v.innerWidth) ?? 0, fe = S.current, be = fe ? fe.getBoundingClientRect() : { width: 0, height: 0 };
    Ze({
      left: Math.max($e, Math.min((te - be.width) / 2, te - be.width - $e)),
      top: Math.max(G.top + $e, Math.min(G.top + (G.height - be.height) / 2, G.bottom - be.height - $e))
    });
  }, []), I = w(0), U = ee(() => {
    const v = Date.now();
    v - I.current < 300 ? (I.current = 0, St()) : I.current = v;
  }, [St]), he = Qe !== null, Ye = he ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Oe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, ke = {
    ...he ? { left: Qe.left, top: Qe.top } : {},
    width: `min(100%, calc(100dvw - ${$e * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Ee ? {} : { maxHeight: `calc(100dvh - ${$e * 2}px)` }
  }, Tt = ee((v) => {
    if (v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey) return;
    const G = v.target, te = A.current;
    if (!(!!G.closest("[data-modal-close]") || !!te && te.contains(G) && !!G.closest('button, a, [role="button"]')) && G.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !te) return;
    const be = Array.from(te.querySelectorAll("button[data-modal-confirm]")), Me = be.length > 0 ? be : Array.from(te.querySelectorAll("button")), Ne = Me[Me.length - 1];
    !Ne || Ne.disabled || (v.preventDefault(), Ne.click());
  }, []);
  return /* @__PURE__ */ h(Ti, { theme: b, children: /* @__PURE__ */ h(rn.Root, { open: n, onOpenChange: (v) => {
    v || kt();
  }, children: /* @__PURE__ */ C(rn.Portal, { container: ne ?? void 0, children: [
    /* @__PURE__ */ h(
      rn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${It ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (v) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (v.preventDefault(), d && kt());
        }
      }
    ),
    /* @__PURE__ */ C(
      rn.Content,
      {
        ref: q,
        onKeyDown: Tt,
        onInteractOutside: (v) => {
          d || v.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": $,
        "data-surface": P,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ye} ${Oe}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(ke).length > 0 ? ke : {} },
        children: [
          a ? /* @__PURE__ */ C(
            "div",
            {
              style: X,
              className: `flex items-center justify-between ${gt ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                Pe || Kt(v);
              },
              onPointerMove: qe,
              onPointerUp: Ft,
              onClick: U,
              children: [
                /* @__PURE__ */ h(rn.Title, { style: Q, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(rn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(xn, { style: { width: N, height: N } }) })
              ]
            }
          ) : /* @__PURE__ */ C(
            "div",
            {
              style: pe,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${gt ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                Pe || Kt(v);
              },
              onPointerMove: qe,
              onPointerUp: Ft,
              onClick: U,
              children: [
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(rn.Title, { style: W, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ C("button", { onClick: l, style: ge, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(Lo, { style: { width: F, height: F } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(rn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(xn, { style: { width: Y, height: Y } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: k, "data-testid": "modal-body", style: a ? se : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: A, style: a ? J : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function yh({ children: n }) {
  const e = He(), t = L(20, 24, e), r = L(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Oc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Bc = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Fc = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function fr({
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
      className: `${Oc} ${n === "hero" ? Bc[e] : Fc[n]} ${t}`,
      ...i
    }
  );
}
function Mr(n = "md") {
  const e = rt && Ho() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function ds(n = "md") {
  return n === "sm" ? cn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : cn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const fs = Qt(null);
function xh() {
  const n = Zt(fs);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function bh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = ie(null), [s, l] = ie(!1), c = w(null), a = He(), u = L(16, 20, a), d = L(12, 14, a), f = ds(), p = w(i);
  p.current = i;
  const m = ee(() => {
    const k = p.current;
    k && (k.kind === "confirm" ? k.resolve(!1) : k.kind === "prompt" ? k.resolve(null) : k.resolve());
  }, []), y = ee((k) => {
    if (k.suppressKey) {
      const A = localStorage.getItem(k.suppressKey);
      if (A && Date.now() < parseInt(A, 10))
        return Promise.resolve(!0);
    }
    return new Promise((A) => {
      m(), l(!1), o({ kind: "confirm", options: k, resolve: A });
    });
  }, [m]), b = ee((k) => new Promise((A) => {
    m(), o({ kind: "prompt", options: k, resolve: A });
  }), [m]), x = ee((k) => new Promise((A) => {
    m(), o({ kind: "alert", options: k, resolve: A });
  }), [m]);
  oe(() => {
    if (i) {
      const k = setTimeout(() => {
        var A;
        return (A = c.current) == null ? void 0 : A.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [i]);
  const P = ee(() => {
    var k, A;
    if (i) {
      if (i.kind === "confirm") {
        const H = i.options;
        H.suppressKey && s && localStorage.setItem(H.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((A = (k = c.current) == null ? void 0 : k.value) == null ? void 0 : A.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), $ = i !== null;
  oe(() => {
    if (!$) return;
    const k = (A) => {
      A.key !== "Enter" || A.shiftKey || A.metaKey || A.ctrlKey || A.altKey || A.isComposing || (A.preventDefault(), A.stopImmediatePropagation(), P());
    };
    return document.addEventListener("keydown", k, !0), () => document.removeEventListener("keydown", k, !0);
  }, [$, P]);
  const S = ee(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ C(fs.Provider, { value: { confirm: y, prompt: b, alert: x }, children: [
    n,
    $ && /* @__PURE__ */ h(
      Lc,
      {
        open: !0,
        onClose: S,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ C(nt, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(fr, { variant: "ghost", onClick: S, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(fr, { onClick: P, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            fr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: P,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(fr, { "data-modal-confirm": !0, onClick: P, children: "Save" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            Sc,
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
const Hc = 500, _c = 250, jc = 5, Dt = 88, oo = 4;
function Wc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function qc({ x: n, y: e, ms: t }) {
  const r = w(null), i = jn();
  return oe(() => {
    r.current && Wc(r.current, t);
  }, [t]), Br(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Dt / 2,
          top: e - Dt / 2,
          width: Dt,
          height: Dt,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ C("svg", { ref: r, width: Dt, height: Dt, viewBox: `0 0 ${Dt} ${Dt}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Dt / 2,
              cy: Dt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: oo + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Dt / 2,
              cy: Dt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: oo,
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
function vh() {
  return { "data-no-longpress": "true" };
}
function Kc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function wh({
  children: n,
  showRing: e = !0,
  longPressMs: t = Hc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = ie(null), c = wi(), a = w(null), u = w(null), d = w({ x: 0, y: 0, target: null }), f = w(!1), p = Math.min(_c, t * 0.5), m = w(i);
  m.current = i;
  const y = w(o);
  return y.current = o, oe(() => {
    if (!rt || !c) return;
    const b = (S) => {
      if (!ai(S.pointerType) || S.button !== 0) return;
      const k = S.target;
      if (!k.closest(r) || (m.current ? !m.current(k) : Kc(k))) return;
      const A = S.clientX, H = S.clientY;
      d.current = { x: A, y: H, target: S.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: A, y: H }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const z = d.current.target;
        if (!z) return;
        const T = y.current;
        if (T) {
          T(z, A, H);
          return;
        }
        const K = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: A,
          clientY: H,
          button: 2,
          view: window
        });
        z.dispatchEvent(K);
      }, t);
    }, x = (S) => {
      if (!f.current || a.current === null) return;
      const k = S.clientX - d.current.x, A = S.clientY - d.current.y;
      Math.sqrt(k * k + A * A) > jc && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, P = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, $ = (S) => {
      ai(S.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", P), c.addEventListener("pointercancel", P), c.addEventListener("pointerleave", $), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", P), c == null || c.removeEventListener("pointercancel", P), c == null || c.removeEventListener("pointerleave", $), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ C(nt, { children: [
    n,
    e && s && /* @__PURE__ */ h(qc, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function kh() {
  const n = uc();
  return ac ? n === null || ai(n) : !1;
}
const Jc = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, Vc = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, Yc = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Sh({
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
        ...e ? Yc : n ? Vc : Jc,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const Uc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Xc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Qr = 1900, Zr = 2100;
function Gc(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Qc(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Nh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Vt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const q = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(q.getTime()) ? c : q;
  })(), [u, d] = ie(a.getFullYear()), [f, p] = ie(a.getMonth()), [m, y] = ie("days"), [b, x] = ie(null), P = Xe(() => new Set(n), [n]), $ = (q) => {
    P.has(q) ? e(n.filter((ne) => ne !== q)) : e([...n, q]);
  }, S = Xe(() => {
    const q = Gc(u, f), ne = new Date(u, f, 1).getDay(), ae = [];
    for (let Se = 0; Se < ne; Se++) ae.push({ key: `pad-${Se}`, day: 0, empty: !0 });
    for (let Se = 1; Se <= q; Se++) ae.push({ key: Qc(u, f, Se), day: Se, empty: !1 });
    return ae;
  }, [u, f]), k = (q) => d((ne) => Math.max(Qr, Math.min(Zr, ne + q))), A = (q) => {
    f + q < 0 ? (d((ne) => Math.max(Qr, ne - 1)), p(11)) : f + q > 11 ? (d((ne) => Math.min(Zr, ne + 1)), p(0)) : p((ne) => ne + q);
  }, H = () => {
    if (b === null) return;
    const q = parseInt(b, 10);
    !isNaN(q) && q >= Qr && q <= Zr && d(q), x(null);
  }, z = (q) => n.some((ne) => ne.startsWith(`${u}-${String(q + 1).padStart(2, "0")}`)), T = He(), K = L(4, 8, T), E = L(16, 20, T), D = L(10, 11, T), O = L(6, 8, T), V = L(12, 14, T), Y = L(6, 10, T), N = L(12, 14, T), _ = L(8, 12, T), F = L(10, 12, T), M = L(6, 10, T), we = L(2, 6, T), pe = L(64, 80, T), W = { padding: K }, X = { width: E, height: E }, Q = { fontSize: D, paddingTop: O, paddingBottom: O }, se = { fontSize: V, paddingTop: Y, paddingBottom: Y }, J = { fontSize: N, paddingTop: _, paddingBottom: _ }, ge = { fontSize: F, padding: `${we}px ${M}px` }, ue = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", ye = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ C("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ C("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? k(-1) : A(-1),
          style: W,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Al, { style: X })
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
          onChange: (q) => x(q.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (q) => q.target.select(),
          onBlur: H,
          onKeyDown: (q) => {
            q.key === "Enter" && (q.preventDefault(), H()), q.key === "Escape" && x(null);
          },
          style: { width: pe },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? k(1) : A(1),
          style: W,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Cr, { style: X })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ C("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: Xc.map((q, ne) => /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: () => {
            p(ne), y("days");
          },
          style: J,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${ne === f ? ue : ye}`,
          children: [
            q,
            z(ne) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${ne === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        q
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), y("days");
          },
          style: { paddingTop: Y, paddingBottom: Y, fontSize: V },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ C("div", { className: "grid grid-cols-7 text-center", children: [
      Uc.map((q) => /* @__PURE__ */ h("div", { style: Q, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: q }, q)),
      S.map((q) => q.empty ? /* @__PURE__ */ h("div", {}, q.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => $(q.key),
          style: se,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${P.has(q.key) ? ue : ye}`,
          children: q.day
        },
        q.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ C("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ C("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map((q) => {
        const ne = /* @__PURE__ */ new Date(q + "T00:00:00"), ae = ne.getFullYear() === c.getFullYear() ? ne.toLocaleString("default", { month: "short", day: "numeric" }) : ne.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            onClick: () => $(q),
            "aria-label": `Remove ${ae}`,
            style: ge,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              ae,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          q
        );
      }) })
    ] })
  ] });
}
function Ch({
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
  const p = (S) => e instanceof Set ? e.has(S) : e.includes(S), m = He(), y = L(12, 16, m), b = L(8, 12, m), x = L(12, 14, m), P = L(16, 20, m), $ = r != null || i != null;
  return /* @__PURE__ */ C("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    $ && /* @__PURE__ */ C("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ h("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((S) => {
            const k = p(S.id), A = /* @__PURE__ */ h(Ei, { checked: k, size: P });
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(S.id),
                "aria-pressed": k,
                className: `ui-checklist-item ${k ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${y}px`, fontSize: x },
                ...S.dataProps,
                children: [
                  u === "leading" && A,
                  S.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: S.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: S.label }),
                  S.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: S.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: A })
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
function Th({
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
  const u = He(), d = s ? 10 : L(12, 16, u), f = s ? 6 : L(8, 12, u), p = s ? 12 : L(12, 14, u), m = s ? 14 : L(16, 20, u);
  return /* @__PURE__ */ C("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((y) => {
            const b = e === y.id;
            return /* @__PURE__ */ C(
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
const Eh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = ir(), { refs: l, floatingStyles: c } = jl({
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
          var P;
          if (i !== "visible") return {};
          const u = (P = a.elements.floating.ownerDocument) == null ? void 0 : P.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), y = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || y <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? p - d.y : r === "bottom" ? y - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + x };
        }
      },
      Oo(o),
      Bo({ padding: 8 }),
      Fo({ padding: 8 }),
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
    whileElementsMounted: Wl
  });
  return xt(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ C(nt, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Br(
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
function Zc(n, e) {
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
  const t = Vt(), r = He(), i = L(10, 12, r), o = L(6, 6, r), s = L(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = jn(), a = ir(), [u, d] = ie(!1), [f, p] = ie({ x: 0, y: 0 }), m = w(null), y = w(null), b = () => {
    if (!m.current) return;
    const $ = m.current.getBoundingClientRect();
    p({ x: $.left + $.width / 2, y: $.top });
  };
  oe(() => () => {
    y.current && clearTimeout(y.current);
  }, []), oe(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]);
  const x = Zc(e, n), P = Object.keys(x).length > 0 ? ot.cloneElement(e, x) : e;
  return /* @__PURE__ */ C(
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
        P,
        u && Br(
          /* @__PURE__ */ C(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map(($, S) => /* @__PURE__ */ h("div", { className: S > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: $ }, S)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, ea = 250;
function ta(n, e, t) {
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
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), ea), a();
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
function qr() {
  const n = He(), e = rt, t = e ? L(28, 40, n) : 28, r = e ? L(28, 40, n) : 28, i = e ? L(10, 14, n) : 10, o = e ? L(10, 14, n) : 10, s = e ? L(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Mh = rt ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", na = rt ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", hr = rt ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", ra = "hover:bg-red-950/50", Rh = rt ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ih = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Ah = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ia = rt ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", $h = rt ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", hs = rt ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", oa = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", sa = rt ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", pr = ({ onClick: n, disabled: e, title: t, className: r = na, children: i }) => {
  const o = qr();
  return /* @__PURE__ */ h(An, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, mr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, zh = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, ariaLabel: u }) => {
  const d = Vt(), f = c ?? gc(d), p = c === "blue" || c === "emerald" ? c : (d == null ? void 0 : d.accent) ?? "zinc", m = { "data-mode": f === "dark" ? "dark" : "light", "data-accent": p }, y = qr(), b = s && !rt ? 24 : y.control.height, x = cn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), P = rt ? x : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, $ = (z) => i ? i(z) : n === z, S = ot.useRef(null), k = ot.useRef([]), A = Math.max(0, e.findIndex((z) => $(z.v))), H = ta(S, k, A);
  return l === "track" ? /* @__PURE__ */ C(
    "div",
    {
      ref: S,
      role: a ? "tablist" : "group",
      "aria-label": u,
      ...m,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${mr.wrap}`,
      children: [
        H.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${mr.pill} ${H.motionClass}`,
            style: { ...H.style, top: 2, bottom: 2 }
          }
        ),
        e.map((z, T) => {
          const K = $(z.v);
          return /* @__PURE__ */ C(
            "button",
            {
              ref: (E) => {
                k.current[T] = E;
              },
              ...z.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(z.v),
              title: z.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? K : void 0,
              "aria-pressed": a ? void 0 : K,
              "aria-label": z.ariaLabel ?? (z.l ? void 0 : z.title),
              style: P,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${K ? mr.active : mr.idle}`,
              children: [
                z.icon,
                z.l
              ]
            },
            z.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ C("div", { ref: S, className: `relative ${oa} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    H.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${H.motionClass}`,
        style: { ...H.style, top: 0, bottom: 0 }
      }
    ),
    e.map((z, T) => {
      const K = $(z.v);
      return /* @__PURE__ */ C(
        "button",
        {
          ref: (E) => {
            k.current[T] = E;
          },
          ...z.dataProps,
          disabled: r,
          onClick: () => t(z.v),
          title: z.title,
          style: { ...y.control, height: b },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${K ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${z.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            z.icon,
            z.l
          ]
        },
        z.v
      );
    })
  ] });
}, Dh = ({ children: n }) => /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: rt ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), la = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", ca = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Ph = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ C("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? la : ca, children: n }),
  e
] }), Lh = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Oh = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ C("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(pr, { onClick: () => r(-1), disabled: n, title: "Move up", className: hr, children: /* @__PURE__ */ h($l, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(pr, { onClick: () => r(1), disabled: n, title: "Move down", className: hr, children: /* @__PURE__ */ h(zl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(pr, { onClick: e, disabled: n, title: "Duplicate", className: hr, children: /* @__PURE__ */ h(Po, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: hs }),
    /* @__PURE__ */ h(pr, { onClick: t, disabled: n, title: "Delete", className: `${hr} ${ra}`, children: /* @__PURE__ */ h(ci, { className: "w-2.5 h-2.5" }) })
  ] })
);
var so = Object.defineProperty, aa = (n, e) => {
  let t = {};
  for (var r in n) so(t, r, {
    get: n[r],
    enumerable: !0
  });
  return so(t, Symbol.toStringTag, { value: "Module" }), t;
};
function ht(n) {
  this.content = n;
}
ht.prototype = {
  constructor: ht,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new ht(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new ht(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new ht([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new ht(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new ht(i);
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
    return n = ht.from(n), n.size ? new ht(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = ht.from(n), n.size ? new ht(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = ht.from(n);
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
ht.from = function(n) {
  if (n instanceof ht) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new ht(e);
};
function ps(n, e, t) {
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
      return c && c < s.length && c < l.length && ys(s.charCodeAt(c - 1)) && gs(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = ps(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function ms(n, e, t, r) {
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
      return d && f && d < a.length && ys(a.charCodeAt(d - 1)) && gs(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = ms(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function gs(n) {
  return n >= 56320 && n < 57344;
}
function ys(n) {
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
    return ps(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return ms(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return gr(0, e);
    if (e == this.size)
      return gr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? gr(t + 1, o) : gr(t, r);
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
const ei = { index: 0, offset: 0 };
function gr(n, e) {
  return ei.index = n, ei.offset = e, ei;
}
function Rr(n, e) {
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
      if (!Rr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Rr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ke = class fi {
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
    return this == e || this.type == e.type && Rr(this.attrs, e.attrs);
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
      return fi.none;
    if (e instanceof fi)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Ke.none = [];
class Qn extends Error {
}
class re {
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
    let r = bs(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new re(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new re(xs(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return re.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new re(j.fromJSON(e, t.content), r, i);
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
    return new re(e, r, i);
  }
}
re.empty = new re(j.empty, 0, 0);
function xs(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(xs(o.content, e - i - 1, t - i - 1)));
}
function bs(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = bs(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function ua(n, e, t) {
  if (t.openStart > n.depth)
    throw new Qn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Qn("Inconsistent open depths");
  return vs(n, e, t, 0);
}
function vs(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = vs(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return gn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = da(t, n);
      return gn(o, ks(n, s, l, e, r));
    }
  else return gn(o, Ir(n, e, r));
}
function ws(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Qn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function hi(n, e, t) {
  let r = n.node(t);
  return ws(r, e.node(t)), r;
}
function mn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Yn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (mn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    mn(i.child(l), r);
  e && e.depth == t && e.textOffset && mn(e.nodeBefore, r);
}
function gn(n, e) {
  if (!n.type.validContent(e))
    throw new Qn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function ks(n, e, t, r, i) {
  let o = n.depth > i && hi(n, e, i + 1), s = r.depth > i && hi(t, r, i + 1), l = [];
  return Yn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (ws(o, s), mn(gn(o, ks(n, e, t, r, i + 1)), l)) : (o && mn(gn(o, Ir(n, e, i + 1)), l), Yn(e, t, i, l), s && mn(gn(s, Ir(t, r, i + 1)), l)), Yn(r, null, i, l), new j(l);
}
function Ir(n, e, t) {
  let r = [];
  if (Yn(null, n, t, r), n.depth > t) {
    let i = hi(n, e, t + 1);
    mn(gn(i, Ir(n, e, t + 1)), r);
  }
  return Yn(e, null, t, r), new j(r);
}
function da(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(j.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Zn {
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
        return new Ar(this, e, r);
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
    return new Zn(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = lo.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      lo.set(e, r = new fa());
    let i = r.elts[r.i] = Zn.resolve(e, t);
    return r.i = (r.i + 1) % ha, i;
  }
}
class fa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const ha = 12, lo = /* @__PURE__ */ new WeakMap();
class Ar {
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
const pa = /* @__PURE__ */ Object.create(null);
let Pn = class pi {
  /**
  @internal
  */
  constructor(e, t, r, i = Ke.none) {
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
    return this.type == e && Rr(this.attrs, t || e.defaultAttrs || pa) && Ke.sameSet(this.marks, r || Ke.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new pi(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new pi(this.type, this.attrs, this.content, e);
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
      return re.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new re(a, i.depth - s, o.depth - s);
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
    return ua(this.resolve(e), this.resolve(t), r);
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
    return Zn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Zn.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Ss(this.marks, e);
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
    this.type.checkContent(this.content), co(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ke.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      co(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
    let i = j.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Pn.prototype.text = void 0;
class $r extends Pn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ss(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new $r(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new $r(this.type, this.attrs, e, this.marks);
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
function Ss(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function co(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class wn {
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
    let r = new ma(e, t);
    if (r.next == null)
      return wn.empty;
    let i = Ns(r);
    r.next && r.err("Unexpected trailing text");
    let o = ka(wa(i));
    return Sa(o, r), o;
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
wn.empty = new wn(!0);
class ma {
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
function Ns(n) {
  let e = [];
  do
    e.push(ga(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function ga(n) {
  let e = [];
  do
    e.push(ya(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function ya(n) {
  let e = va(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = xa(n, e);
    else
      break;
  return e;
}
function ao(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function xa(n, e) {
  let t = ao(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = ao(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function ba(n, e) {
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
function va(n) {
  if (n.eat("(")) {
    let e = Ns(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = ba(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function wa(n) {
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
function Cs(n, e) {
  return e - n;
}
function uo(n, e) {
  let t = [];
  return r(e), t.sort(Cs);
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
function ka(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(uo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        uo(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new wn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Cs);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Sa(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ts(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Es(n, e) {
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
function Ms(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Ca(n, r, e[r]);
  return t;
}
class zr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ms(e, r.attrs), this.defaultAttrs = Ts(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == wn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Es(this.attrs, e);
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
    return new Pn(this, this.computeAttrs(e), j.from(t), Ke.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = j.from(t), this.checkContent(t), new Pn(this, this.computeAttrs(e), t, Ke.setFrom(r));
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
    return o ? new Pn(this, e, t.append(o), Ke.setFrom(r)) : null;
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
    e.forEach((o, s) => r[o] = new zr(o, t, s));
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
function Na(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Ca {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Na(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Kr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ms(e, i.attrs), this.excluded = null;
    let o = Ts(this.attrs);
    this.instance = o ? new Ke(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ke(this, Es(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Kr(o, i++, t, s)), r;
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
class Ta {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = ht.from(e.nodes), t.marks = ht.from(e.marks || {}), this.nodes = zr.compile(this.spec.nodes, this), this.marks = Kr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = wn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? fo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : fo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Pn.fromJSON(this, i), this.markFromJSON = (i) => Ke.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof zr) {
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
    return new $r(r, r.defaultAttrs, e, Ke.setFrom(t));
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
function fo(n, e) {
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
function Ea(n) {
  return n.tag != null;
}
function Ma(n) {
  return n.style != null;
}
class Ln {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Ea(i))
        this.tags.push(i);
      else if (Ma(i)) {
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
    let r = new po(this, t, !1);
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
    let r = new po(this, t, !0);
    return r.addAll(e, Ke.none, t.from, t.to), re.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Aa(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = mo(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = mo(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new Ln(e, Ln.schemaRules(e)));
  }
}
const Rs = {
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
}, Ra = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Is = { ol: !0, ul: !0 }, er = 1, mi = 2, Un = 4;
function ho(n, e, t) {
  return e != null ? (e ? er : 0) | (e === "full" ? mi : 0) : n && n.whitespace == "pre" ? er | mi : t & ~Un;
}
class yr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ke.none, this.match = o || (s & Un ? null : e.contentMatch);
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
    if (!(this.options & er)) {
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
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Rs.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class po {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = ho(null, t.preserveWhitespace, 0) | (r ? Un : 0);
    i ? o = new yr(i.type, i.attrs, Ke.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new yr(null, null, Ke.none, !0, null, s) : o = new yr(e.schema.topNodeType, null, Ke.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & mi ? "full" : this.localPreserveWS || (i.options & er) > 0, { schema: s } = this.parser;
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
    Is.hasOwnProperty(s) && this.parser.normalizeLists && Ia(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Ra.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Rs.hasOwnProperty(s))
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
        (o.type ? o.type.allowsMarkType(l.type) : go(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = ho(e, o, s.options);
    s.options & Un && s.content.length == 0 && (l |= Un);
    let c = Ke.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : go(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new yr(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= er);
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
function Ia(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Is.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Aa(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function mo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function go(n, e) {
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
const As = 65535, $s = Math.pow(2, 16);
function $a(n, e) {
  return n + e * $s;
}
function yo(n) {
  return n & As;
}
function za(n) {
  return (n - (n & As)) / $s;
}
const zs = 1, Ds = 2, kr = 4, Ps = 8;
class gi {
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
    return (this.delInfo & Ps) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (zs | kr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Ds | kr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & kr) > 0;
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
    let t = 0, r = yo(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + za(e);
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
        let m = e == (t < 0 ? c : d) ? null : $a(l / 3, e - c), y = e == c ? Ds : e == d ? zs : kr;
        return (t < 0 ? e != c : e != d) && (y |= Ps), new gi(p, y, m);
      }
      i += u - a;
    }
    return r ? e + i : new gi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = yo(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
class Dr {
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
    return new Dr(this._maps, this.mirror, e, t);
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
    let e = new Dr();
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
    return r ? e : new gi(e, i, null);
  }
}
const ti = /* @__PURE__ */ Object.create(null);
class vt {
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
    let r = ti[t.stepType];
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
    if (e in ti)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ti[e] = t, t.prototype.jsonID = e, t;
  }
}
class lt {
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
    return new lt(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new lt(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return lt.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof Qn)
        return lt.fail(o.message);
      throw o;
    }
  }
}
function Pi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Pi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return j.fromArray(r);
}
class sn extends vt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new re(Pi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return lt.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new jt(this.from, this.to, this.mark);
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
vt.jsonID("addMark", sn);
class jt extends vt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new re(Pi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return lt.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new sn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new jt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof jt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new jt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new jt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
vt.jsonID("removeMark", jt);
class ln extends vt {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return lt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return lt.fromReplace(e, this.pos, this.pos + 1, new re(j.from(r), 0, t.isLeaf ? 0 : 1));
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
    return new kn(this.pos, this.mark);
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
vt.jsonID("addNodeMark", ln);
class kn extends vt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return lt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return lt.fromReplace(e, this.pos, this.pos + 1, new re(j.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new ln(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new kn(t.pos, this.mark);
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
    return new kn(t.pos, e.markFromJSON(t.mark));
  }
}
vt.jsonID("removeNodeMark", kn);
class st extends vt {
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
    return this.structure && yi(e, this.from, this.to) ? lt.fail("Structure replace would overwrite content") : lt.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new zt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new st(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && st.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new st(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof st) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? re.empty : new re(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new st(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? re.empty : new re(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new st(e.from, this.to, t, this.structure);
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
    return new st(t.from, t.to, re.fromJSON(e, t.slice), !!t.structure);
  }
}
st.MAP_BIAS = 1;
vt.jsonID("replace", st);
class dt extends vt {
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
    if (this.structure && (yi(e, this.from, this.gapFrom) || yi(e, this.gapTo, this.to)))
      return lt.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return lt.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? lt.fromReplace(e, this.from, this.to, r) : lt.fail("Content does not fit in gap");
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
    return new dt(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new dt(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new dt(t.from, t.to, t.gapFrom, t.gapTo, re.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
vt.jsonID("replaceAround", dt);
function yi(n, e, t) {
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
function Da(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let y = 0; y < d.length; y++)
        d[y].isInSet(m) || (s && s.to == f && s.mark.eq(d[y]) ? s.to = p : i.push(s = new jt(f, p, d[y])));
      l && l.to == f ? l.to = p : o.push(l = new sn(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function Pa(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Kr) {
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
  }), i.forEach((s) => n.step(new jt(s.from, s.to, s.style)));
}
function Li(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new st(l, u, re.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new jt(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new re(j.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new st(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(j.empty, !0);
    n.replace(l, l, new re(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function La(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Wn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !La(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function Oa(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = j.empty, d = 0;
  for (let m = o, y = !1; m > t; m--)
    y || r.index(m) > 0 ? (y = !0, u = j.from(r.node(m).copy(u)), d++) : c--;
  let f = j.empty, p = 0;
  for (let m = o, y = !1; m > t; m--)
    y || i.after(m + 1) < i.end(m) ? (y = !0, f = j.from(i.node(m).copy(f)), p++) : a++;
  n.step(new dt(c, a, s, l, new re(u.append(f), d, p), u.size - d, !0));
}
function Ls(n, e, t = null, r = n) {
  let i = Ba(n, e), o = i && Fa(r, e);
  return o ? i.map(xo).concat({ type: e, attrs: t }).concat(o.map(xo)) : null;
}
function xo(n) {
  return { type: n, attrs: null };
}
function Ba(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Fa(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function Ha(n, e, t) {
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
  n.step(new dt(i, o, i, o, new re(r, 0, 0), t.length, !0));
}
function _a(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && ja(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && Bs(n, s, l, o), Li(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new dt(d, f, d + 1, f - 1, new re(j.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && Os(n, s, l, o), !1;
    }
  });
}
function Os(n, e, t, r) {
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
function Bs(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function ja(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Wa(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new dt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new re(j.from(s), 0, 0), 1, !0));
}
function Gt(n, e, t = 1, r) {
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
function qa(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = j.empty, s = j.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = j.from(i.node(l).copy(o));
    let u = r && r[a];
    s = j.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new st(e, e, new re(o.append(s), t, t), !0));
}
function Sn(n, e) {
  let t = n.resolve(e), r = t.index();
  return Fs(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Ka(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Fs(n, e) {
  return !!(n && e && !n.isLeaf && Ka(n, e));
}
function Jr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Fs(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Ja(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Bs(n, u.node(), u.before(), l);
  }
  s.inlineContent && Li(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new st(a, c.map(e + t, -1), re.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    Os(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Va(n, e, t) {
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
function Vr(n, e, t = e, r = re.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Hs(i, o, r) ? new st(e, t, r) : new Ya(i, o, r).fit();
}
function Hs(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Ya {
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
    let c = new re(o, s, l);
    return e > -1 ? new dt(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new st(r.pos, i.pos, c) : null;
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
        r ? (o = ni(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
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
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ni(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new re(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ni(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new re(Jn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new re(Jn(e, t, 1), t, r);
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
      a++, (a > 1 || c == 0 || y.content.size) && (d = b, u.push(_s(y.mark(f.allowedMarks(y.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Vn(this.placed, t, j.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let y = 0, b = l; y < p; y++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? re.empty : new re(Jn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new re(Jn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !ri(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = ri(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = ri(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Vn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Vn(this.placed, this.depth, j.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(j.empty, !0);
    t.childCount && (this.placed = Vn(this.placed, this.frontier.length, t));
  }
}
function Jn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Jn(n.firstChild.content, e - 1, t)));
}
function Vn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Vn(n.lastChild.content, e - 1, t)));
}
function ni(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function _s(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, _s(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(j.empty, !0)))), n.copy(r);
}
function ri(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !Ua(t, o.content, s) ? l : null;
}
function Ua(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Xa(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Ga(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Hs(i, o, r))
    return n.step(new st(e, t, r));
  let s = Ws(i, o);
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
    let p = a[f], m = Xa(p.type);
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
        let P = i.node(b - 1), $ = i.index(b - 1);
        if (P.canReplaceWith($, $, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new re(js(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function js(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(js(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(j.empty, !0));
  }
  return n;
}
function Qa(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Va(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new re(j.from(r), 0, 0));
}
function Za(n, e, t) {
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
  let o = Ws(r, i);
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
function Ws(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class On extends vt {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return lt.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return lt.fromReplace(e, this.pos, this.pos + 1, new re(j.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return zt.empty;
  }
  invert(e) {
    return new On(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new On(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new On(t.pos, t.attr, t.value);
  }
}
vt.jsonID("attr", On);
class tr extends vt {
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
    return lt.ok(r);
  }
  getMap() {
    return zt.empty;
  }
  invert(e) {
    return new tr(this.attr, e.attrs[this.attr]);
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
    return new tr(t.attr, t.value);
  }
}
vt.jsonID("docAttr", tr);
let Fn = class extends Error {
};
Fn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Fn.prototype = Object.create(Error.prototype);
Fn.prototype.constructor = Fn;
Fn.prototype.name = "TransformError";
class eu {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Dr();
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
      throw new Fn(t.failed);
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
  replace(e, t = e, r = re.empty) {
    let i = Vr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new re(j.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, re.empty);
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
    return Ga(this, e, t, r), this;
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
    return Qa(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Za(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Oa(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Ja(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Ha(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return _a(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Wa(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new On(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new tr(e, t)), this;
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
    if (t instanceof Ke)
      t.isInSet(r.marks) && this.step(new kn(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new kn(e, o)), i = o.removeFromSet(i);
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
    return qa(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Da(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Pa(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Li(this, e, t, r), this;
  }
}
const ii = /* @__PURE__ */ Object.create(null);
class Ge {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new tu(e.min(t), e.max(t))];
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
  replace(e, t = re.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? re.empty : t), l == 0 && wo(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), wo(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Mt(e) : $n(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? $n(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : $n(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Wt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return $n(e, e, 0, 0, 1) || new Wt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return $n(e, e, e.content.size, e.childCount, -1) || new Wt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ii[t.type];
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
    if (e in ii)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ii[e] = t, t.prototype.jsonID = e, t;
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
Ge.prototype.visible = !0;
class tu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let bo = !1;
function vo(n) {
  !bo && !n.parent.inlineContent && (bo = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Mt extends Ge {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    vo(e), vo(t), super(e, t);
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
      return Ge.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Mt(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = re.empty) {
    if (super.replace(e, t), t == re.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Mt && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Yr(this.anchor, this.head);
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
      let o = Ge.findFrom(t, r, !0) || Ge.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ge.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ge.findFrom(e, -r, !0) || Ge.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Mt(e, t);
  }
}
Ge.jsonID("text", Mt);
class Yr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Yr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Mt.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Je extends Ge {
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
    return r ? Ge.near(o) : new Je(o);
  }
  content() {
    return new re(j.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Je && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Oi(this.anchor);
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
Ge.jsonID("node", Je);
class Oi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Yr(r, r) : new Oi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Je.isSelectable(r) ? new Je(t) : Ge.near(t);
  }
}
class Wt extends Ge {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = re.empty) {
    if (t == re.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ge.atStart(e.doc);
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
    return new Wt(e);
  }
  map(e) {
    return new Wt(e);
  }
  eq(e) {
    return e instanceof Wt;
  }
  getBookmark() {
    return nu;
  }
}
Ge.jsonID("all", Wt);
const nu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Wt(n);
  }
};
function $n(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Mt.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Je.isSelectable(l))
        return Je.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = $n(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function wo(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof st || i instanceof dt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(Ge.near(n.doc.resolve(s), t));
}
function ko(n, e) {
  return !e || !n ? n : n.bind(e);
}
class xr {
  constructor(e, t, r) {
    this.name = e, this.init = ko(t.init, r), this.apply = ko(t.apply, r);
  }
}
new xr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new xr("selection", {
  init(n, e) {
    return n.selection || Ge.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new xr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new xr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const qs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Ks(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Js = (n, e, t) => {
  let r = Ks(n, t);
  if (!r)
    return !1;
  let i = Bi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Wn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (tl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Hn(o, "end") || Je.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Vr(n.doc, r.before(s), r.after(s), re.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Hn(o, "end") ? Ge.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Je.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, ru = (n, e, t) => {
  let r = Ks(n, t);
  if (!r)
    return !1;
  let i = Bi(r);
  return i ? Vs(n, i, e) : !1;
}, iu = (n, e, t) => {
  let r = Us(n, t);
  if (!r)
    return !1;
  let i = Fi(r);
  return i ? Vs(n, i, e) : !1;
};
function Vs(n, e, t) {
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
  let a = Vr(n.doc, o, c, re.empty);
  if (!a || a.from != o || a instanceof st && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Mt.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Hn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Ys = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Bi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Je.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Je.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Bi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Us(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Xs = (n, e, t) => {
  let r = Us(n, t);
  if (!r)
    return !1;
  let i = Fi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (tl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Hn(o, "start") || Je.isSelectable(o))) {
    let s = Vr(n.doc, r.before(), r.after(), re.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Hn(o, "start") ? Ge.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Je.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Gs = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Fi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Je.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Je.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Fi(n) {
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
const ou = (n, e) => {
  let t = n.selection, r = t instanceof Je, i;
  if (r) {
    if (t.node.isTextblock || !Sn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Jr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Je.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, su = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Je) {
    if (t.node.isTextblock || !Sn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Jr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, lu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Wn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Qs = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Hi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const cu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Hi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(Ge.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, Zs = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Wt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Hi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Mt.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, el = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (Gt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Wn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function au(n) {
  return (e, t) => {
    if (e.selection instanceof Je && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !Gt(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Mt || e.selection instanceof Wt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Hi(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
        break;
      } else {
        if (p == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = Gt(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = Gt(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let p = r.mapping.slice(o), m = p.map(i.before(l)), y = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(y.index(), y.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const uu = au(), du = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Je.create(n.doc, i))), !0);
};
function fu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Sn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function tl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && fu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = j.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = j.from(s[x].create(null, m));
      m = j.from(i.copy(m));
      let y = n.tr.step(new dt(e.pos - 1, p, e.pos, p, new re(m, 1, 0), s.length, !0)), b = y.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Sn(y.doc, b.pos) && y.join(b.pos), t(y.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : Ge.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Wn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && Hn(o, "start", !0) && Hn(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let y = o, b = 1;
    for (; !y.isTextblock; y = y.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, y.content)) {
      if (t) {
        let x = j.empty;
        for (let $ = m.length - 1; $ >= 0; $--)
          x = j.from(m[$].copy(x));
        let P = n.tr.step(new dt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new re(x, m.length, 0), 0, !0));
        t(P.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function nl(n) {
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
const hu = nl(-1), pu = nl(1);
function mu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Ls(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function So(n, e = null) {
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
function _i(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
_i(qs, Js, Ys);
_i(qs, Xs, Gs);
_i(Qs, Zs, el, uu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function gu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return yu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function yu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Ar(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Ar(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Ls(o, t, r, e);
  return l ? (n && xu(n, e, l, i, t), !0) : !1;
}
function xu(n, e, t, r, i) {
  let o = j.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = j.from(t[u].type.create(t[u].attrs, o));
  n.step(new dt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new re(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Gt(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function bu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? vu(e, t, n, o) : wu(e, t, o) : !0 : !1;
  };
}
function vu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new dt(o - 1, s, o, s, new re(j.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Ar(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Wn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Sn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function wu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, y = t.startIndex; m > y; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? j.empty : j.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new dt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new re((l ? j.empty : j.from(i.copy(j.empty))).append(c ? j.empty : j.from(i.copy(j.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function ku(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = j.from(a ? n.create() : null), d = new re(j.from(n.create(null, j.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new dt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function rl(n) {
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
var Su = class il {
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
    const e = il.createFakeChain();
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
      state: rl({
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
const Nu = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Cu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Tu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = Wn(p);
      if (l.type.isTextblock) {
        const { defaultType: y } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, y);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Eu = (n) => (e) => n(e), Mu = () => ({ state: n, dispatch: e }) => Zs(n, e), Ru = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Lt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Iu = () => ({ tr: n, dispatch: e }) => {
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
function bt(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Au = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = bt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, $u = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, zu = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, No = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return zu(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Du = (n, e, t) => ({
  from: No(n, t, "left"),
  to: No(e, t, "right")
}), Pu = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = Du(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Lt.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Lu = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Ou = () => ({ state: n, dispatch: e }) => cu(n, e);
function Bu(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Pr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Bu(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function ol(n, e, t = {}) {
  return n.find((r) => r.type === e && Pr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Co(n, e, t = {}) {
  return !!ol(n, e, t);
}
function sl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!ol([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Co([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Co([...n.parent.child(s).marks], e, t); )
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
const Fu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = un(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = sl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Lt.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Hu = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function ll(n) {
  return n instanceof Lt;
}
function pn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function _u(n, e = null) {
  if (!e) return null;
  const t = Dn.atStart(n), r = Dn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Lt.create(n, pn(0, i, o), pn(n.content.size, i, o)) : Lt.create(n, pn(e, i, o), pn(e, i, o));
}
function To() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Lr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function ju() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Wu = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Lr() || To()) && r.dom.focus(), ju() && !Lr() && !To() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !ll(t.state.selection))
    return s(), !0;
  const l = _u(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, qu = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), Ku = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), cl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && cl(r);
  }
  return n;
};
function br(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return cl(t);
}
function al(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function _n(n, e, t) {
  if (al(n)) return n;
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
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), _n("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Ta({
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
      if (t.slice ? Ln.fromSchema(c).parseSlice(br(n), t.parseOptions) : Ln.fromSchema(c).parse(br(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Ln.fromSchema(e);
    return t.slice ? o.parseSlice(br(n), t.parseOptions).content : o.parse(br(n), t.parseOptions);
  }
  return _n("", e, t);
}
function ul(n) {
  return !("type" in n);
}
function dl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof st || i instanceof dt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Dn.near(n.doc.resolve(s), t));
}
const Ju = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
      _n(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = _n(e, o.schema, {
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
    const m = ul(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let y;
    if (f)
      Array.isArray(e) ? y = e.map((b) => b.text || "").join("") : al(e) ? y = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? y = e.text : y = e, r.insertText(y, u, d);
    else {
      y = j.from(m);
      const b = r.doc.resolve(u), x = b.node(), P = b.parentOffset === 0, $ = x.isText || x.isTextblock, S = x.content.size > 0;
      P && $ && S && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && dl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: y
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: y
    });
  }
  return !0;
};
function fl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Vu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = fl(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = _n(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && dl(e, e.steps.length - 1, -1)), !0) : !1;
}, Yu = () => ({ state: n, dispatch: e }) => ou(n, e), Uu = () => ({ state: n, dispatch: e }) => su(n, e), Xu = () => ({ state: n, dispatch: e }) => Js(n, e), Gu = () => ({ state: n, dispatch: e }) => Xs(n, e), Qu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Jr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Zu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Jr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, ed = () => ({ state: n, dispatch: e }) => ru(n, e), td = () => ({ state: n, dispatch: e }) => iu(n, e);
function hl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function nd(n) {
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
      Lr() || hl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const rd = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = nd(n).split(/-(?!$)/), s = o.find((a) => ![
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
function ji(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? bt(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), p = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: p
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Pr(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const id = (n, e = {}) => ({ state: t, dispatch: r }) => ji(t, bt(n, t.schema), e) ? lu(t, r) : !1, od = () => ({ state: n, dispatch: e }) => el(n, e), sd = (n) => ({ state: e, dispatch: t }) => {
  const r = bt(n, e.schema);
  return bu(r)(e, t);
}, ld = () => ({ state: n, dispatch: e }) => Qs(n, e);
function pl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Eo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const cd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = pl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = bt(n, r.schema)), l === "mark" && (s = un(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, Eo(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(Eo(f.attrs, e))));
      });
    });
  }), c;
}, ad = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), ud = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Ul(n.doc);
    n.setSelection(t);
  }
  return !0;
}, dd = () => ({ state: n, dispatch: e }) => Ys(n, e), fd = () => ({ state: n, dispatch: e }) => Gs(n, e), hd = () => ({ state: n, dispatch: e }) => du(n, e), pd = () => ({ state: n, dispatch: e }) => pu(n, e), md = () => ({ state: n, dispatch: e }) => hu(n, e);
function gd(n, e, t = {}, r = {}) {
  return _n(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const yd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = gd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = ul(a) ? a.content : [a];
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
function xd(n, e) {
  const t = un(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function bd(n, e) {
  const t = new eu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function vd(n, e) {
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
function Wi(n) {
  return (e) => vd(e.$from, n);
}
function nr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? nr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? nr(n.parent, e, t) : null
  }) : n.config[e];
}
function wd(n) {
  return typeof n == "function";
}
function xi(n, e = void 0, ...t) {
  return wd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function ml(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function kd(n, e, t) {
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
function Sd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Nd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Cd(n) {
  const e = Nd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Td(n) {
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
  }), Cd(r);
}
function Sr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Ed(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? un(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Pr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, y) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, y), x = Math.min(p, y + m.nodeSize), P = x - b;
      s += P, l.push(...m.marks.map(($) => ({
        mark: $,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Pr(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function oi(n, e) {
  const { nodeExtensions: t } = ml(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = xi(nr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function gl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (gl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Md(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (ll(r) && (i = r.$cursor), i) {
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
const Rd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = un(n, r.schema);
  if (i)
    if (s) {
      const a = xd(r, c);
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
  return Md(r, t, c);
}, Id = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Ad = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = bt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => So(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => So(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, $d = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = pn(n, 0, r.content.size), o = Bn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, zd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, Dd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Lt.atStart(r).from, l = Lt.atEnd(r).to, c = pn(i, s, l), a = pn(o, s, l), u = Lt.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, Pd = (n) => ({ state: e, dispatch: t }) => {
  const r = bt(n, e.schema);
  return ku(r)(e, t);
};
function Mo(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Ld = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = Sr(a, l.node().type.name, l.node().attrs);
  if (o instanceof Bn && o.node.isBlock)
    return !l.parentOffset || !Gt(s, l.pos) ? !1 : (r && (n && Mo(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : fl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = Gt(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !m && Gt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof Lt && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const y = e.mapping.map(l.before()), b = e.doc.resolve(y);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Mo(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, Od = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = bt(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = j.empty;
      const P = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let z = l.depth - P; z >= l.depth - 3; z -= 1) x = j.from(l.node(z).copy(x));
      const $ = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, S = {
        ...Sr(d, l.node().type.name, l.node().attrs),
        ...e
      }, k = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(S)) || void 0;
      x = x.append(j.from(s.createAndFill(null, k) || void 0));
      const A = l.before(l.depth - (P - 1));
      t.replace(A, l.after(-$), new re(x, 4 - P, 0));
      let H = -1;
      t.doc.nodesBetween(A, t.doc.content.size, (z, T) => {
        if (H > -1) return !1;
        z.isTextblock && z.content.size === 0 && (H = T + 1);
      }), H > -1 && t.setSelection(Lt.near(t.doc.resolve(H))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Sr(d, u.type.name, u.attrs),
    ...e
  }, y = {
    ...Sr(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, c.pos);
  const b = p ? [{
    type: s,
    attrs: m
  }, {
    type: p,
    attrs: y
  }] : [{
    type: s,
    attrs: m
  }];
  if (!Gt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: P } = r, { splittableMarks: $ } = o.extensionManager, S = P || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !S || !i) return !0;
    const k = S.filter((A) => $.includes(A.type.name));
    t.ensureMarks(k);
  }
  return !0;
};
function Ro(n) {
  return !n || n === "1" ? null : n;
}
function yl(n, e) {
  return Ro(n) === Ro(e);
}
const si = (n, e) => {
  const t = Wi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Sn(n.doc, t.pos)) || !yl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, li = (n, e) => {
  const t = Wi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Sn(n.doc, r)) || !yl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Bd(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Lt.between(r, i);
}
const Fd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = bt(n, s.schema), m = bt(e, s.schema), { selection: y, storedMarks: b } = s, { $from: x, $to: P } = y, $ = x.blockRange(P), S = b || y.$to.parentOffset && y.$from.marks();
  if (!$) return !1;
  const k = Wi((O) => oi(O.type.name, d))(y), A = y.from === 0 && y.to === s.doc.content.size, H = s.doc.content.content, z = H.length === 1 ? H[0] : null, T = A && z && oi(z.type.name, d) ? {
    node: z,
    pos: 0
  } : null, K = k ?? T, E = !!k && $.depth >= 1 && $.depth - k.depth <= 1, D = !!T;
  if ((E || D) && K) {
    if (K.node.type === p)
      return A && D ? c().command(({ tr: O, dispatch: V }) => {
        const Y = Bd(O);
        return Y ? (O.setSelection(Y), V && V(O), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (oi(K.node.type.name, d) && p.validContent(K.node.content)) return c().command(() => (o.setNodeMarkup(K.pos, p), !0)).command(() => si(o, p)).command(() => li(o, p)).run();
  }
  return !t || !S || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => si(o, p)).command(() => li(o, p)).run() : c().command(() => {
    const O = u().wrapInList(p, r), V = S.filter((Y) => f.includes(Y.type.name));
    return o.ensureMarks(V), O ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => si(o, p)).command(() => li(o, p)).run();
}, Hd = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = un(n, r.schema);
  return Ed(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, _d = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = bt(n, r.schema), s = bt(e, r.schema), l = ji(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, jd = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = bt(n, t.schema);
  return ji(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Wd = () => ({ state: n, dispatch: e }) => {
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
}, qd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, Kd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = un(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = sl(c, l, (d = c.marks().find((y) => y.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Jd = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, Vd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = pl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = bt(n, r.schema)), l === "mark" && (s = un(n, r.schema));
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
      })), s && b.marks.length && b.marks.forEach((P) => {
        if (s === P.type && (c = !0, i)) {
          const $ = Math.max(x, u), S = Math.min(x + b.nodeSize, d);
          t.addMark($, S, s.create({
            ...P.attrs,
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
}, Yd = new qt("__tiptap_decorations__"), Ud = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Yd, {
  type: "force",
  name: n
}), !0), Xd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = bt(n, t.schema);
  return mu(i, e)(t, r);
}, Gd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = bt(n, t.schema);
  return gu(i, e)(t, r);
};
var Qd = /* @__PURE__ */ aa({
  blur: () => Nu,
  clearContent: () => Cu,
  clearNodes: () => Tu,
  command: () => Eu,
  createParagraphNear: () => Mu,
  cut: () => Ru,
  deleteCurrentNode: () => Iu,
  deleteNode: () => Au,
  deleteRange: () => $u,
  deleteSelection: () => Pu,
  enter: () => Lu,
  exitCode: () => Ou,
  extendMarkRange: () => Fu,
  first: () => Hu,
  focus: () => Wu,
  forEach: () => qu,
  insertContent: () => Ku,
  insertContentAt: () => Ju,
  insertDefaultBlock: () => Vu,
  joinBackward: () => Xu,
  joinDown: () => Uu,
  joinForward: () => Gu,
  joinItemBackward: () => Qu,
  joinItemForward: () => Zu,
  joinTextblockBackward: () => ed,
  joinTextblockForward: () => td,
  joinUp: () => Yu,
  keyboardShortcut: () => rd,
  lift: () => id,
  liftEmptyBlock: () => od,
  liftListItem: () => sd,
  newlineInCode: () => ld,
  resetAttributes: () => cd,
  scrollIntoView: () => ad,
  selectAll: () => ud,
  selectNodeBackward: () => dd,
  selectNodeForward: () => fd,
  selectParentNode: () => hd,
  selectTextblockEnd: () => pd,
  selectTextblockStart: () => md,
  setContent: () => yd,
  setMark: () => Rd,
  setMeta: () => Id,
  setNode: () => Ad,
  setNodeSelection: () => $d,
  setTextDirection: () => zd,
  setTextSelection: () => Dd,
  sinkListItem: () => Pd,
  splitBlock: () => Ld,
  splitListItem: () => Od,
  toggleList: () => Fd,
  toggleMark: () => Hd,
  toggleNode: () => _d,
  toggleWrap: () => jd,
  undoInputRule: () => Wd,
  unsetAllMarks: () => qd,
  unsetMark: () => Kd,
  unsetTextDirection: () => Jd,
  updateAttributes: () => Vd,
  updateDecorations: () => Ud,
  wrapIn: () => Xd,
  wrapInList: () => Gd
});
typeof process < "u" && process.env.NODE_ENV;
function Zd(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function vr(n) {
  return Zd(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function xl(n, e) {
  const t = { ...n };
  return vr(n) && vr(e) && Object.keys(e).forEach((r) => {
    vr(e[r]) && vr(n[r]) ? t[r] = xl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var bl = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...xi(nr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...xi(nr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => xl(this.options, n)
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
}, ef = class vl extends bl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new vl(t);
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
}, Ot = class wl extends bl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new wl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
Ot.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new en({
      key: new qt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Sd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => kd(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Ot.create({
  name: "commands",
  addCommands() {
    return { ...Qd };
  }
});
Ot.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = bd(n.before, [n, ...e]);
      Td(c).forEach((u) => {
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
        if (u instanceof jt) {
          var f, p;
          const m = a.slice(d).map(u.from, -1), y = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(y), P = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((S) => S.eq(u.mark)) : !1, $ = (p = c.doc.nodeAt(y)) === null || p === void 0 ? void 0 : p.marks.some((S) => S.eq(u.mark));
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
            partial: !!($ || P),
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
Ot.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new en({
      key: new qt("tiptapDrop"),
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
Ot.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new en({
      key: new qt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const tf = new qt("focusEvents");
Ot.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new en({
      key: tf,
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
Ot.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, y = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = y && m.parent.childCount === 1 ? b === d.pos : Dn.atStart(a).from === f;
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
    return Lr() || hl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new en({
      key: new qt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Dn.atStart(e.doc).from, a = Dn.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !gl(t.doc)) return;
        const u = t.tr, d = rl({
          state: t,
          transaction: u
        }), { commands: f } = new Su({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
Ot.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new en({
      key: new qt("tiptapPaste"),
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
Ot.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new en({
      key: new qt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Ot.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = ml(this.extensions);
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
      key: new qt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const nf = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), rf = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), of = /^(https?:\/\/|mailto:)/i;
function sf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    rf.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function bi(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(bi(c));
    return l;
  };
  if (!nf.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!of.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = sf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(bi(l));
  return i;
}
function kl(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function lf(n) {
  const e = kl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(bi(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Bh(n) {
  const e = kl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Fh(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function cf(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Io(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const af = { text: "#52525b" }, uf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? af, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    Jl,
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
        b && Bn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new Bn(y))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, df = sc.extend({
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
    return Kl(uf);
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
    return ["span", ql({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), ff = 240, hf = 280, pf = ({ props: n, onApi: e }) => {
  const t = jr(), r = w(e);
  r.current = e, oe(() => {
    r.current(t);
  }, [t]);
  const i = w(null);
  oe(() => {
    var s;
    t.pointerDriven || an((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), oe(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = _r();
  return /* @__PURE__ */ h(sr.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: hf, maxHeight: ff },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        mf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, mf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = cs({
    label: () => n.label,
    activate: t
  }), s = He(), l = { padding: `${L(8, 12, s)}px ${L(12, 16, s)}px`, fontSize: L(12, 14, s) };
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
}, Ao = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(pf, { props: r, onApi: (i) => {
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
      const o = lc(i);
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
}, gf = ef.create({
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
}), Nr = new qt("retainedSelectionHighlight"), yf = Ot.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new en({
        key: Nr,
        state: {
          init: () => ({ held: !1, decorations: ur.empty }),
          apply(n, e) {
            const t = n.getMeta(Nr), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: ur.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? ur.empty : ur.create(n.doc, [Xl.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Nr.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Hh = {
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
function Sl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function xf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Sl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const bf = ot.forwardRef(({
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
  const x = w(null), P = w(null), $ = w(e);
  $.current = e;
  const S = w(r);
  S.current = r;
  const k = w(o);
  k.current = o;
  const A = w(null), H = (D) => {
    var X;
    const O = D.getAttributes("textStyle"), V = D.getAttributes("reportTextStyle"), { from: Y, to: N, empty: _ } = D.state.selection;
    let F = !1, M = !1, we = !1;
    if (!_) {
      const Q = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Set(), J = /* @__PURE__ */ new Set();
      D.state.doc.nodesBetween(Y, N, (ge) => {
        if (!ge.isText) return;
        const ue = ge.marks.find((q) => q.type.name === "textStyle");
        Q.add((ue == null ? void 0 : ue.attrs.fontFamily) || ""), se.add((ue == null ? void 0 : ue.attrs.fontSize) || "");
        const ye = ge.marks.find((q) => q.type.name === "reportTextStyle");
        J.add((ye == null ? void 0 : ye.attrs.styleId) || "");
      }), F = Q.size > 1, M = se.size > 1, we = J.size > 1;
    }
    const pe = {
      bold: D.isActive("bold"),
      italic: D.isActive("italic"),
      underline: D.isActive("underline"),
      strike: D.isActive("strike"),
      link: D.isActive("link"),
      color: O.color || "",
      fontFamily: O.fontFamily || "",
      fontSize: O.fontSize || "",
      textStyle: V.styleId || "",
      hasSelection: !_,
      fontFamilyMixed: F,
      fontSizeMixed: M,
      textStyleMixed: we
    }, W = A.current;
    W && W.bold === pe.bold && W.italic === pe.italic && W.underline === pe.underline && W.strike === pe.strike && W.link === pe.link && W.color === pe.color && W.fontFamily === pe.fontFamily && W.fontSize === pe.fontSize && W.textStyle === pe.textStyle && W.hasSelection === pe.hasSelection && W.fontFamilyMixed === pe.fontFamilyMixed && W.fontSizeMixed === pe.fontSizeMixed && W.textStyleMixed === pe.textStyleMixed || (A.current = pe, (X = k.current) == null || X.call(k, pe));
  }, z = (D) => {
    var _;
    const O = D.state.selection;
    let V = null;
    O instanceof Bn && O.node.type.name === "token" ? (V = { key: O.node.attrs.field ?? "", pos: O.from }, x.current = O.from) : x.current != null && (x.current = D.state.tr.mapping.map(x.current));
    const Y = P.current, N = Y && V && Y.key === V.key && Y.pos === V.pos;
    !Y && !V || N || (P.current = V, (_ = b.current) == null || _.call(b, V));
  }, T = (D) => {
    const O = lf(cf(D));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(O) ? "" : O;
  }, K = ot.useMemo(() => {
    const D = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: Y }) => {
        var N;
        return ((N = p.current) == null ? void 0 : N.call(p, Y)) ?? [];
      },
      command: ({ editor: Y, range: N, props: _ }) => {
        Y.chain().focus().insertContentAt(N, { type: "token", attrs: { field: _.field } }).run();
      },
      render: Ao
    }, O = df.configure({
      resolve: f.current ?? null,
      suggestion: D,
      onTokenClick: (Y, N, _) => {
        var F;
        x.current = _, (F = y.current) == null || F.call(y, Y, N, _);
      }
    }), V = Ot.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          oc({
            pluginKey: new qt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: Y, range: N }) => Sl(Y, N.from) != null,
            items: ({ editor: Y, query: N }) => {
              var F;
              const _ = xf(Y);
              return _ ? ((F = m.current) == null ? void 0 : F.call(m, _.chipKey, N)) ?? [] : [];
            },
            command: ({ editor: Y, range: N, props: _ }) => {
              Y.chain().focus().insertContentAt(N, { type: "token", attrs: { field: _.field } }).run();
            },
            render: Ao
          })
        ];
      }
    });
    return [O, V];
  }, []), E = Vl({
    immediatelyRender: !1,
    extensions: [
      Gl,
      Ql.configure({ placeholder: t }),
      Zl,
      ec,
      tc,
      gf,
      yf,
      nc,
      ic,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      rc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...K
    ],
    content: Io(n || ""),
    editable: !r,
    onUpdate: ({ editor: D }) => {
      $.current(T(D.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: D }) => {
      H(D), z(D);
    }
  });
  return oe(() => {
    if (!E || E.isFocused) return;
    T(E.getHTML()) !== n && (A.current = null, E.commands.setContent(Io(n || ""), { emitUpdate: !1 }), H(E));
  }, [n, E]), oe(() => {
    E && E.setEditable(!r);
  }, [r, E]), oe(() => {
    E && (A.current = null, H(E), z(E));
  }, [E]), Do(d, () => ({
    exec: (D, O, V) => {
      if (!E || S.current) return;
      const Y = E.chain(), N = (V == null ? void 0 : V.focus) === !1 ? Y : Y.focus();
      switch (D) {
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
          O && N.setColor(O).run();
          break;
        case "unsetColor":
          N.unsetColor().run();
          break;
        case "fontFamily":
          O && N.setFontFamily(O).run();
          break;
        case "unsetFontFamily":
          N.unsetFontFamily().run();
          break;
        case "fontSize":
          O && N.setFontSize(O).run();
          break;
        case "unsetFontSize":
          N.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          O && N.setMark("reportTextStyle", { styleId: O }).unsetFontFamily().unsetFontSize().run();
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
          O && N.extendMarkRange("link").setLink({ href: O }).run();
          break;
        case "unlink":
          N.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (D) => E == null ? void 0 : E.commands.focus(D),
    insertToken: (D) => {
      !E || S.current || E.chain().focus().insertContent({ type: "token", attrs: { field: D } }).run();
    },
    replaceToken: (D) => {
      if (!E || S.current) return;
      const O = x.current;
      O != null && E.commands.command(({ tr: V }) => {
        const Y = V.doc.nodeAt(O);
        if (!Y || Y.type.name !== "token") return !1;
        V.setNodeMarkup(O, void 0, { field: D });
        const N = V.doc.resolve(O);
        return N.nodeAfter && N.nodeAfter.type.name === "token" && V.setSelection(new Bn(N)), !0;
      });
    },
    holdSelectionHighlight: (D) => {
      !E || E.isDestroyed || E.view.dispatch(E.state.tr.setMeta(Nr, { held: D }));
    }
  }), [E]), /* @__PURE__ */ h(Yl, { editor: E, className: `richtext-editor ${i || ""}` });
});
bf.displayName = "RichTextEditor";
const vf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], wf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], $o = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), kf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = ie(!1);
  return /* @__PURE__ */ h(
    Wr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ C("button", { type: "button", disabled: e, className: `${sa} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(bn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: vf.map((s) => /* @__PURE__ */ h(zc, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(rr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Sf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = ie(!1), o = qr(), [s, l] = ie(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    Wr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ h(
        $t,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ h(Ol, { className: "w-3 h-3" })
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
            className: ia + " w-full"
          }
        ),
        /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h($t, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ h(
            $t,
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
}, _h = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = ie(!1), d = (b, x) => {
    var P;
    return (P = n.current) == null ? void 0 : P.exec(b, x);
  }, f = qr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", y = c ? /* @__PURE__ */ h("div", { className: hs }) : null;
  return /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ C("div", { className: m, children: [
      /* @__PURE__ */ h(An, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h($t, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(An, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h($t, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(An, { content: "Underline", children: /* @__PURE__ */ h($t, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Dl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(An, { content: "Strikethrough", children: /* @__PURE__ */ h($t, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Pl, { className: "w-3 h-3" }) }) })
    ] }),
    y,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(Sf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    y,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      Wr,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ C($t, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h($o, {}),
          /* @__PURE__ */ h(bn, { className: "w-3 h-3 text-zinc-500" })
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
              children: /* @__PURE__ */ h($o, { className: "w-3.5 h-3.5" })
            }
          ),
          wf.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ C(nt, { children: [
      y,
      /* @__PURE__ */ C("div", { className: m, children: [
        o && /* @__PURE__ */ h(kf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(An, { content: "Clear formatting", children: /* @__PURE__ */ h(
          $t,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(Ll, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ C(nt, { children: [
      y,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function qi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Nf(n, e, t, r, i) {
  return qi(n + e * i, t, r);
}
const Cf = 2;
function Tf(n, e, t, r, i) {
  return qi(n + Math.trunc(e / Cf) * i, t, r);
}
const Ef = 3;
function jh({
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
  const [p, m] = ie(null), [y, b] = ie(!1), x = w(!1), P = w(null), $ = w(null), S = w(null), k = He(), A = ds(), H = a === void 0;
  oe(() => () => {
    var N;
    return (N = P.current) == null ? void 0 : N.call(P);
  }, []), xt(() => {
    const N = S.current, _ = $.current;
    !H && N && _ && (_.style.color = getComputedStyle(N).color);
  }, [H, a]), oe(() => {
    x.current || m(null);
  }, [n]);
  const z = n ?? r, T = p !== null ? p : n != null ? String(n) : d ? "" : String(r), K = (N) => qi(N, e, t), E = (N) => {
    const _ = Nf(z, N, e, t, o);
    _ !== z && (x.current && m(String(_)), i(_));
  }, D = (N) => {
    if (l || s || N.pointerType !== "mouse" || N.button !== 0) return;
    const _ = N.currentTarget, F = N.clientY, M = z;
    let we = M, pe = !1;
    const W = (Q) => {
      const se = F - Q.clientY;
      if (!pe) {
        if (Math.abs(se) < Ef) return;
        pe = !0, _.blur(), _.style.userSelect = "none";
      }
      const J = Tf(M, se, e, t, o);
      J !== we && (we = J, i(J));
    }, X = () => {
      P.current = null, window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", X), window.removeEventListener("pointercancel", X), _.style.userSelect = "", pe && _.blur();
    };
    P.current = X, window.addEventListener("pointermove", W), window.addEventListener("pointerup", X), window.addEventListener("pointercancel", X);
  }, O = (N) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": N === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (N === 1 ? z >= t : z <= e),
    onPointerDown: (_) => _.preventDefault(),
    onClick: () => E(N)
  }), V = H ? L(22, 30, k) : L(16, 22, k), Y = H ? L(14, 18, k) : L(11, 15, k);
  return /* @__PURE__ */ C(
    "span",
    {
      ref: $,
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
            value: T,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...H ? { ...A, minHeight: L(30, 38, k) } : {},
              paddingRight: V + 2,
              cursor: l || s ? void 0 : y ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (N) => {
              const _ = N.target.value;
              m(_);
              const F = parseInt(_, 10);
              _ !== "" && !Number.isNaN(F) && i(K(F));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const N = parseInt(p, 10);
              Number.isNaN(N) || i(K(N)), m(null);
            },
            onKeyDown: (N) => {
              N.key === "Enter" && N.target.blur(), N.key === "Escape" && (m(null), N.target.blur()), !s && !l && (N.key === "ArrowUp" || N.key === "ArrowDown") && (N.preventDefault(), E(N.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: D
          }
        ),
        /* @__PURE__ */ C("span", { className: "ui-number-steppers", style: { width: V }, children: [
          /* @__PURE__ */ h("button", { ...O(1), className: "ui-number-step", children: /* @__PURE__ */ h(Bl, { style: { width: Y, height: Y } }) }),
          /* @__PURE__ */ h("button", { ...O(-1), className: "ui-number-step", children: /* @__PURE__ */ h(bn, { style: { width: Y, height: Y } }) })
        ] })
      ]
    }
  );
}
function Wh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = He(), f = cn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = L(14, 16, d), m = { width: p, height: p }, y = L(10, 12, d);
  return /* @__PURE__ */ C("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ C("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Cr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(bn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function Ki({
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
function Mf({
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
  onSubmit: y,
  onCancel: b,
  cancelOnEscape: x = !1,
  cancelOnOutside: P = !1,
  className: $ = "",
  "aria-label": S
}) {
  const [k, A] = ie(u), H = w(k);
  H.current = k;
  const z = w(null), T = w(null), K = w(null), E = _o(), D = ee((W) => {
    H.current !== W && (H.current = W, A(W), d == null || d(W));
  }, [d]), O = ee((W = !1) => {
    var X;
    D(!1), (X = T.current) == null || X.blur(), W && requestAnimationFrame(() => {
      var Q;
      return (Q = K.current) == null ? void 0 : Q.focus();
    });
  }, [D]), V = ee(() => {
    D(!0), requestAnimationFrame(() => {
      const W = T.current;
      if (!W) return;
      W.focus();
      const X = W.value.length;
      W.setSelectionRange(X, X);
    });
  }, [D]);
  oe(() => {
    u && V();
  }, [u, V]), oe(() => {
    var Q;
    if (!k) return;
    const W = ((Q = z.current) == null ? void 0 : Q.ownerDocument) ?? document, X = (se) => {
      var ge;
      const J = se.target;
      J && ((ge = z.current) != null && ge.contains(J) || (P && (b == null || b()), O()));
    };
    return W.addEventListener("pointerdown", X, !0), () => W.removeEventListener("pointerdown", X, !0);
  }, [k, O, P, b]);
  const Y = ee((W) => {
    var Q;
    if (!k) return;
    const X = W.relatedTarget;
    X && ((Q = z.current) != null && Q.contains(X)) || (P && (b == null || b()), O());
  }, [k, O, P, b]), N = ee((W) => {
    if (W.key === "Enter" && y) {
      W.preventDefault(), y(n), O(!0);
      return;
    }
    W.key === "Escape" && (W.preventDefault(), W.stopPropagation(), x ? b == null || b() : e(""), O(!0));
  }, [e, O, x, b, y, n]), _ = p === void 0 ? r ?? /* @__PURE__ */ h(hn, { className: "w-3.5 h-3.5" }) : p, we = 8 + (((f == null ? void 0 : f.length) || 0) + (m && n ? 1 : 0)) * (E.box + 2), pe = (W) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: E.icon, height: E.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: W
    }
  );
  return /* @__PURE__ */ h(
    Ki,
    {
      expanded: k,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: z,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": c,
      "data-expanded": k ? "true" : "false",
      className: $,
      onBlur: Y,
      trigger: /* @__PURE__ */ h(
        $t,
        {
          ref: K,
          type: "button",
          variant: l,
          size: "minimal",
          theme: c,
          icon: r ?? /* @__PURE__ */ h(hn, { className: "w-3.5 h-3.5" }),
          active: a,
          onClick: V,
          className: `w-full justify-start ${k ? "pointer-events-none" : ""}`,
          tabIndex: k ? -1 : 0,
          "aria-expanded": k,
          "aria-label": S || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: "min-w-0 truncate", children: t })
        }
      ),
      field: /* @__PURE__ */ C(nt, { children: [
        _ && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
            style: { width: E.icon, height: E.icon },
            children: pe(_)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: T,
            value: n,
            onChange: (W) => e(W.target.value),
            onKeyDown: N,
            placeholder: i,
            "aria-label": S || i,
            tabIndex: k ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: _ ? E.icon + 16 : 10, paddingRight: we },
            className: `${Mr("sm")} w-full`
          }
        ),
        /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          f == null ? void 0 : f.map((W) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": W.label,
              title: W.label,
              tabIndex: k ? 0 : -1,
              onMouseDown: (X) => X.preventDefault(),
              onClick: () => {
                W.onClick(n, { close: () => O(!0) }), W.keepOpen || O(!0);
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": W.key,
              children: pe(W.icon)
            },
            W.key
          )),
          m && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: k ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var W;
                  return (W = T.current) == null ? void 0 : W.focus();
                });
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(xn, { size: E.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function qh({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(Or, { className: "w-3.5 h-3.5" }),
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
  const f = (y) => {
    i == null || i(y), s && c("");
  }, p = () => {
    o == null || o(), l && c("");
  }, m = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ h(rr, { className: "w-3.5 h-3.5" }),
      onClick: f
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ h(xn, { className: "w-3.5 h-3.5" }),
      onClick: p
    }] : []
  ];
  return /* @__PURE__ */ h(
    Mf,
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
function Rf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function If(n, e, t) {
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
function Nl(n, e, t) {
  const r = Rf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = If(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Af(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = Nl(n.items, n.groups, n.query), i = [];
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
function $f({
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
  groupExpandMode: y = "multiple",
  browseAll: b = !1,
  selectedId: x,
  autoFocus: P = !0,
  collapsedWidth: $ = 128,
  expandedWidth: S = 288,
  panelWidth: k,
  panelMinWidth: A,
  keepAllRows: H = !1,
  maxMenuHeight: z = 420,
  theme: T = "light",
  morph: K = !0,
  emptyTitle: E,
  emptyHint: D,
  renderEmpty: O,
  emptyActions: V,
  leadingActions: Y,
  hideLeadingOnEmpty: N = !1,
  footerActions: _,
  fieldActions: F,
  multiple: M,
  open: we,
  onOpenChange: pe,
  hideTrigger: W = !1,
  anchorRef: X,
  portalTarget: Q,
  renderTrigger: se,
  renderItem: J,
  highlightOnOpen: ge = !0,
  ref: ue
}) {
  const ye = s !== void 0, [q, ne] = ie(""), ae = ye ? s : q, Se = ee((g) => {
    ye || ne(g), l == null || l(g);
  }, [ye, l]), Qe = we !== void 0, [Ze, ze] = ie(!1), ce = Qe ? we : Ze, Ae = ee((g) => {
    Qe || ze(g), pe == null || pe(g);
  }, [Qe, pe]), [me, _e] = ie(t === "inline"), je = Xe(() => e.map((g) => g.key).join("\0"), [e]), Pe = Xe(() => new Set(je ? je.split("\0") : []), [je]), [et, Ee] = ie(() => m ? Pe : /* @__PURE__ */ new Set()), [Le, Rt] = ie(0), Fe = w(!1), It = w(null), We = ee((g, R = "keyboard") => {
    Fe.current = R === "pointer", Rt(g);
  }, []), pt = w(null), mt = w(null), Ct = w(null), Ue = w(null), wt = w(null), kt = w(0), ct = wi(), Bt = jn(), Ie = _r(), Ve = Ri(), Kt = rs(), qe = _o(), gt = 8 + (((F == null ? void 0 : F.length) || 0) + (ae ? 1 : 0)) * (qe.box + 2), [St, I] = ie({ top: 0, left: 0, maxH: 288, ready: !1 }), [U, he] = ie(0);
  Vo({
    anchorRef: X ?? pt,
    panelRef: Ue,
    open: ce,
    maxHeight: z,
    anchorRectRef: wt,
    onPosition: (g) => I({ top: g.top, left: g.left, maxH: g.maxH, ready: g.ready })
  }), oe(() => {
    const g = (X == null ? void 0 : X.current) ?? pt.current;
    !ce || !g || he(g.getBoundingClientRect().width);
  }, [ce, me, X]);
  const Ye = Hr({
    visible: ce,
    morph: K,
    anchor: () => {
      var g;
      return ((g = (X == null ? void 0 : X.current) ?? pt.current) == null ? void 0 : g.getBoundingClientRect()) ?? null;
    },
    ref: Ue,
    cloneOnUnmount: !0
  }), Oe = (V || []).map(
    (g) => typeof g.label == "function" ? g.label(ae) : g.label
  ), ke = Xe(
    () => Af({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: H ? "" : ae,
      browseGroups: f || m || p,
      browseAll: b,
      expandedGroups: et,
      emptyActionLabels: Oe
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, ae, H, f, m, p, b, et, Oe.join("\0")]
  ), Tt = Xe(
    () => (Y || []).map((g, R) => ({
      kind: "action",
      label: typeof g.label == "function" ? g.label(ae) : g.label,
      actionIndex: R,
      source: "leading"
    })),
    [Y, ae]
  ), v = Xe(
    () => (_ || []).map((g, R) => ({
      kind: "action",
      label: typeof g.label == "function" ? g.label(ae) : g.label,
      actionIndex: R,
      source: "footer"
    })),
    [_, ae]
  ), G = ke.some((g) => g.kind === "empty"), te = Tt.length > 0 && !(N && G), fe = te ? Tt.length : 0, be = Xe(
    () => [...te ? Tt : [], ...ke, ...v],
    [te, Tt, ke, v]
  ), Me = !!a || p && !ae.trim(), Ne = Xe(
    () => be.map((g, R) => ({ row: g, index: R })).filter((g) => !(g.row.kind === "empty" || g.row.kind === "item" && g.row.hidden || g.row.kind === "group" && !Me)),
    [be, Me]
  ), Be = (p || m) && !ae.trim(), Ce = !!M, Nt = Xe(
    () => n.filter((g) => g.checkable !== !1).map((g) => g.id),
    [n]
  ), ft = Xe(() => ae.trim() ? Nl(n, e, ae).hits.filter((g) => g.item.checkable !== !1).map((g) => g.item.id) : Nt, [n, e, ae, Nt]), Jt = Xe(() => new Set(ft), [ft]), Te = Qo({
    mode: (M == null ? void 0 : M.mode) ?? "draft",
    selectedIds: (M == null ? void 0 : M.selectedIds) ?? es,
    itemIds: Nt,
    visibleIds: ft,
    max: M == null ? void 0 : M.max,
    disabledIds: M == null ? void 0 : M.disabledIds,
    indicator: M == null ? void 0 : M.indicator,
    onCommit: M == null ? void 0 : M.onCommit,
    onDraftChange: M == null ? void 0 : M.onDraftChange,
    onToggle: M == null ? void 0 : M.onToggle
  }), ut = w(Te.reset);
  ut.current = Te.reset;
  const Nn = typeof (M == null ? void 0 : M.commitLabel) == "function" ? M.commitLabel(Te.count) : (M == null ? void 0 : M.commitLabel) ?? `Select ${Te.count}`, it = ee(() => {
    var g;
    Ae(!1), t === "expandable" && ((g = mt.current) == null || g.blur(), _e(!1), requestAnimationFrame(() => {
      var R;
      return (R = Ct.current) == null ? void 0 : R.focus();
    })), Qe || Se(""), We(0), Ee(m ? Pe : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, Se, m, Pe, Qe, Ae]);
  oe(() => {
    if (ae.trim() || !m) {
      Ee((g) => g.size ? /* @__PURE__ */ new Set() : g);
      return;
    }
    Ee((g) => g.size === Pe.size && [...Pe].every((R) => g.has(R)) ? g : Pe);
  }, [ae, m, Pe]);
  const tn = w(!1);
  oe(() => {
    if (!ce) {
      tn.current = !1;
      return;
    }
    if (tn.current || !p || ae.trim()) return;
    const g = x ? [x] : [...(M == null ? void 0 : M.selectedIds) ?? []], R = new Set(g), Z = R.size ? e.filter((xe) => n.some((Re) => Re.group === xe.key && R.has(Re.id))).map((xe) => xe.key) : [];
    if (Z.length === 0) {
      tn.current = !0;
      return;
    }
    const le = y === "single" ? Z.slice(0, 1) : Z;
    if (!le.every((xe) => et.has(xe))) {
      Ee(new Set(le));
      return;
    }
    if (ge && x) {
      const xe = be.findIndex((Re) => Re.kind === "item" && Re.hit.item.id === x);
      xe >= 0 && We(xe);
    }
    tn.current = !0;
  }, [ce, p, ae, e, n, x, M == null ? void 0 : M.selectedIds, y, et, be, ge, We]);
  const At = ee((g) => {
    Ee((R) => {
      const Z = new Set(R);
      return Z.has(g) ? Z.delete(g) : (y === "single" && Z.clear(), Z.add(g)), Z;
    });
  }, [y]), Et = ee(() => {
    var R;
    if (ce) {
      (R = mt.current) == null || R.focus();
      return;
    }
    if (ut.current(), t === "expandable" && !me) {
      const Z = pt.current;
      if (Z) {
        const le = Z.style.transition, xe = Z.style.width;
        Z.style.transition = "none", Z.style.width = `${S}px`;
        const Re = Z.getBoundingClientRect();
        wt.current = { left: Re.left, top: Re.top, width: Re.width, height: Re.height }, Z.style.width = xe, Z.offsetWidth, Z.style.transition = le, window.clearTimeout(kt.current), kt.current = window.setTimeout(() => {
          wt.current = null;
        }, vn + 80);
      }
    }
    _e(!0), Ae(!0);
    const g = x ? ke.findIndex((Z) => Z.kind === "item" && Z.hit.item.id === x) : -1;
    We(g >= 0 ? fe + g : ge ? fe : -1);
  }, [ce, t, me, S, fe, ke, x, ge]);
  oe(() => () => {
    window.clearTimeout(kt.current), wt.current = null;
  }, []), oe(() => {
    ce || (It.current = null);
  }, [ce]), oe(() => {
    if (t !== "expandable" || !me || !ce || !P) return;
    const g = requestAnimationFrame(() => {
      var R;
      return (R = mt.current) == null ? void 0 : R.focus();
    });
    return () => cancelAnimationFrame(g);
  }, [t, me, ce, P]), oe(() => {
    var Z;
    if (!ce) return;
    const g = ((Z = pt.current) == null ? void 0 : Z.ownerDocument) ?? ct;
    if (!g) return;
    const R = (le) => {
      var Re, Yt, _t, Ut;
      const xe = ((Re = le.composedPath) == null ? void 0 : Re.call(le)[0]) ?? le.target;
      !xe || typeof xe.nodeType != "number" || (Yt = pt.current) != null && Yt.contains(xe) || (_t = Ue.current) != null && _t.contains(xe) || (Ut = X == null ? void 0 : X.current) != null && Ut.contains(xe) || it();
    };
    return g.addEventListener("pointerdown", R, !0), () => g.removeEventListener("pointerdown", R, !0);
  }, [ce, it, ct, X]);
  const Ht = ee((g) => {
    if (g.kind === "item" ? It.current = g.hit.item.id : (g.kind === "group" || g.kind === "action") && (It.current = null), g.kind === "group") {
      a ? (a(g.group), d && it()) : Me && At(g.group.key);
      return;
    }
    if (g.kind === "item") {
      if (Ce) {
        Te.canToggle(g.hit.item.id) && Te.toggle(g.hit.item.id);
        return;
      }
      c(g.hit.item), d && it();
      return;
    }
    if (g.kind === "action") {
      const R = g.source === "leading" ? Y : g.source === "footer" ? _ : V, Z = R == null ? void 0 : R[g.actionIndex];
      Z && Z.onClick(ae), d && it();
    }
  }, [it, d, V, _, Me, Y, Ce, c, a, ae, Te, At]), Cn = (g) => {
    if (Ne.length === 0) return;
    let R = Le;
    if (R < 0 && It.current) {
      const xe = Ne.find(
        (Re) => Re.row.kind === "item" && Re.row.hit.item.id === It.current
      );
      xe && (R = xe.index);
    }
    const Z = Ne.findIndex((xe) => xe.index === R), le = Z < 0 ? 0 : (Z + g + Ne.length) % Ne.length;
    We(Ne[le].index);
  };
  Do(ue, () => ({
    moveHighlight: Cn,
    activateHighlighted: () => {
      if (Fe.current) return !1;
      const g = Le >= 0 ? be[Le] : void 0;
      return g ? (Ht(g), We(-1, "keyboard"), !0) : !1;
    },
    close: it,
    selectAll: () => {
      Ce && Te.setAll(!0);
    },
    setSelection: (g) => {
      Te.reset(g);
    }
  }), [be, Le, Ht, it, Ce, Te]);
  const yt = (g) => {
    if (Ce && (g.metaKey || g.ctrlKey) && g.key.toLowerCase() === "a") {
      g.preventDefault(), g.stopPropagation(), Te.setAll(!0);
      return;
    }
    if (g.key === "ArrowDown")
      g.preventDefault(), ce ? Cn(1) : Et();
    else if (g.key === "ArrowUp")
      g.preventDefault(), Cn(-1);
    else if ((g.key === "ArrowRight" || g.key === "ArrowLeft") && p && ce && !ae.trim()) {
      const R = be[Le];
      if ((R == null ? void 0 : R.kind) === "group") {
        const Z = et.has(R.group.key);
        (g.key === "ArrowRight" || Z) && (g.preventDefault(), At(R.group.key));
      } else if ((R == null ? void 0 : R.kind) === "item" && g.key === "ArrowLeft" && R.hit.item.group) {
        g.preventDefault();
        const Z = R.hit.item.group;
        et.has(Z) && At(Z);
        const le = be.findIndex((xe) => xe.kind === "group" && xe.group.key === Z);
        le >= 0 && We(le);
      }
    } else if (g.key === "Enter") {
      g.preventDefault();
      const R = be[Le] ?? be[0];
      R && Ht(R);
    } else g.key === "Escape" && (g.preventDefault(), it());
  }, nn = (g) => {
    t === "expandable" && !me || (Se(g), ce || Ae(!0));
  };
  oe(() => {
    if (H) {
      const R = ae.trim().toLowerCase();
      if (!R) {
        const le = x ? ke.findIndex((xe) => xe.kind === "item" && xe.hit.item.id === x) : -1;
        We(le >= 0 ? fe + le : -1);
        return;
      }
      const Z = ke.findIndex((le) => le.kind === "item" && le.hit.item.label.toLowerCase().includes(R));
      We(Z >= 0 ? fe + Z : -1);
      return;
    }
    if (Qe) {
      const R = ae.trim().toLowerCase();
      if (!!R && n.some((le) => le.id.toLowerCase() === R || le.label.toLowerCase() === R)) {
        We(-1);
        return;
      }
      if (!Ce) {
        const le = ke.findIndex((xe) => xe.kind === "item" && xe.hit.item.tone !== "create");
        if (le >= 0) {
          We(fe + le);
          return;
        }
      }
    }
    const g = ke.findIndex((R) => R.kind === "item");
    We(g >= 0 ? fe + g : fe);
  }, [ae]), oe(() => {
    if (!ce || ae.trim()) return;
    const g = x ? ke.findIndex((R) => R.kind === "item" && R.hit.item.id === x) : -1;
    We(g >= 0 ? fe + g : ge ? fe : -1);
  }, [ce]), xt(() => {
    ce && ut.current();
  }, [ce]);
  const Tn = (g) => /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    F == null ? void 0 : F.map((R) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": R.label,
        title: R.label,
        tabIndex: me ? 0 : -1,
        onMouseDown: (Z) => Z.preventDefault(),
        onClick: () => {
          R.onClick(ae, { close: it }), R.keepOpen || it();
        },
        style: { width: qe.box, height: qe.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": R.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: qe.icon, height: qe.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: R.icon
          }
        )
      },
      R.key
    )),
    ae && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: me ? 0 : -1,
        onPointerDown: (R) => R.preventDefault(),
        onClick: g,
        style: { width: qe.box, height: qe.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(xn, { size: qe.icon })
      }
    )
  ] }), lr = /* @__PURE__ */ C("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(hn, { size: qe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: mt,
        value: ae,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ce,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (g) => nn(g.target.value),
        onFocus: () => {
          f && Et();
        },
        onClick: () => {
          f && Et();
        },
        onKeyDown: yt,
        placeholder: o,
        style: { paddingRight: gt },
        className: `${Mr("sm")} w-full pl-8`
      }
    ),
    Tn(() => {
      Se(""), ce || Et();
    })
  ] }), Ur = /* @__PURE__ */ C("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(hn, { size: qe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: mt,
        value: ae,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ce,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (g) => nn(g.target.value),
        onFocus: () => {
          f && me && Et();
        },
        onClick: () => {
          f && me && Et();
        },
        onKeyDown: yt,
        placeholder: o,
        tabIndex: me ? 0 : -1,
        style: { paddingRight: gt },
        className: `${Mr("sm")} h-full w-full pl-8`
      }
    ),
    Tn(() => {
      Se(""), !ce && me && Et();
    })
  ] });
  oe(() => {
    if (!ce || Fe.current) return;
    const g = Ue.current;
    an(
      g == null ? void 0 : g.querySelector(`[data-search-row="${Le}"]`),
      "nearest",
      (g == null ? void 0 : g.querySelector("[data-search-scroller]")) ?? null
    );
  }, [ce, Le]);
  const dn = w(ke);
  dn.current = ke;
  const cr = w(x);
  cr.current = x;
  const ar = w(M == null ? void 0 : M.selectedIds);
  ar.current = M == null ? void 0 : M.selectedIds;
  const qn = Go({
    open: ce,
    block: "center",
    ready: St.ready,
    scroller: () => {
      var g;
      return ((g = Ue.current) == null ? void 0 : g.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Z;
      let g = -1;
      const R = cr.current;
      if (R)
        g = dn.current.findIndex((le) => le.kind === "item" && le.hit.item.id === R);
      else {
        const le = ar.current;
        if (le && le.length) {
          const xe = new Set(le);
          g = dn.current.findIndex((Re) => Re.kind === "item" && xe.has(Re.hit.item.id));
        }
      }
      return g < 0 ? null : ((Z = Ue.current) == null ? void 0 : Z.querySelector(`[data-search-row="${g}"]`)) ?? null;
    }
  }), En = (g, R) => {
    const Z = Le === R, le = !Ce && x !== void 0 && g.hit.item.id === x, xe = Ce ? Te.isSelected(g.hit.item.id) : le, Re = !!g.hit.item.disabled || Ce && !Te.canToggle(g.hit.item.id), Yt = g.hit.item.tone === "create" ? T === "light" ? { background: Z ? "#d1fae5" : "#ecfdf5", color: Z ? "#065f46" : "#047857" } : { background: Z ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Z ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": xe,
        tabIndex: -1,
        "data-search-item": g.hit.item.id,
        "data-search-row": R,
        "data-search-create": g.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (_t) => _t.preventDefault(),
        onMouseEnter: () => We(R, "pointer"),
        onClick: () => Ht(g),
        style: { ...Ve, ...g.hit.item.rowStyle, ...Yt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ie.itemDefault} ${g.hit.item.rowClassName ?? ""} ${le ? "ui-item-selected" : ""} ${Z ? "ui-item-highlighted" : ""} ${Re ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Ce && g.hit.item.checkable !== !1 && /* @__PURE__ */ h(Er, { checked: xe, disabled: Re, indicator: M == null ? void 0 : M.indicator }),
          J ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: J(g.hit.item, { checked: xe, disabled: Re }) }) : /* @__PURE__ */ C(nt, { children: [
            g.hit.item.icon && /* @__PURE__ */ h("span", { className: `${Ie.icon} shrink-0`, children: g.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: g.hit.item.label }),
            (g.hit.detail || g.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: g.hit.detail || g.hit.item.detail }),
            le && /* @__PURE__ */ h(rr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${g.hit.item.id}`
    );
  }, Mn = (g, R) => {
    var Gi;
    const Z = et.has(g.group.key), le = p && !ae.trim(), xe = Me, Re = xe && Le === R, Yt = Ce ? n.filter((at) => at.group === g.group.key && Jt.has(at.id) && at.checkable !== !1) : [], _t = Yt.filter((at) => !Te.isDisabled(at.id)).map((at) => at.id), Ut = Ce ? (Gi = M == null ? void 0 : M.groupToken) == null ? void 0 : Gi.call(M, g.group.key) : void 0, Vi = !!Ut && Te.isSelected(Ut), Yi = Vi ? "all" : _t.length > 0 ? Te.groupState(_t) : "none", Tl = Vi ? Yt.length : Yt.reduce((at, El) => at + (Te.isSelected(El.id) ? 1 : 0), 0), Ui = Ce && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${g.group.label}`,
        onMouseDown: (at) => at.preventDefault(),
        onClick: (at) => {
          at.stopPropagation(), Ut ? Te.toggle(Ut) : _t.length && Te.toggleGroup(_t);
        },
        className: `shrink-0 flex items-center justify-center rounded ${Ut || _t.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Er,
          {
            checked: Yi === "all",
            indeterminate: Yi === "some",
            disabled: !Ut && _t.length === 0,
            indicator: M == null ? void 0 : M.indicator
          }
        )
      }
    ), Xi = Ce ? /* @__PURE__ */ C("span", { className: `shrink-0 tabular-nums text-[10px] ${xe ? "text-zinc-400" : "opacity-70"}`, children: [
      Tl,
      "/",
      Yt.length
    ] }) : g.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${xe ? "text-[10px] text-zinc-400" : "opacity-70"}`, children: g.group.count });
    return xe ? /* @__PURE__ */ C(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": le ? Z : void 0,
        "data-search-group": g.group.key,
        onMouseEnter: () => We(R, "pointer"),
        style: Ve,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Ie.itemDefault} ${Re ? "ui-item-highlighted" : ""}`,
        children: [
          Ui,
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (at) => at.preventDefault(),
              onClick: () => Ht(g),
              className: "flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left",
              children: [
                g.group.icon && /* @__PURE__ */ h("span", { className: `${Ie.icon} shrink-0`, children: g.group.icon }),
                /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: g.group.label }),
                Xi
              ]
            }
          ),
          le && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Z ? "Collapse" : "Expand"} ${g.group.label}`,
              "aria-expanded": Z,
              onMouseDown: (at) => at.preventDefault(),
              onClick: (at) => {
                at.stopPropagation(), At(g.group.key);
              },
              style: { width: qe.box, height: qe.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ h(
                bn,
                {
                  size: qe.icon,
                  className: `transition-transform duration-200 ${Z ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${g.group.key}`
    ) : /* @__PURE__ */ C(
      "div",
      {
        role: "presentation",
        "data-search-group": g.group.key,
        "data-search-row": R,
        style: Kt,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          Ui,
          g.group.icon && /* @__PURE__ */ h("span", { className: `${Ie.icon} shrink-0`, children: g.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: g.group.label }),
          Xi
        ]
      },
      `group:${g.group.key}`
    );
  }, B = (g, R) => {
    var xe;
    const Z = Le === R, le = g.source === "leading" ? Y : g.source === "footer" ? _ : V;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": g.source || "empty",
        "data-search-row": R,
        onMouseDown: (Re) => Re.preventDefault(),
        onMouseEnter: () => We(R, "pointer"),
        onClick: () => Ht(g),
        style: Ve,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ie.itemDefault} ${Z ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${Ie.icon} shrink-0`, children: ((xe = le == null ? void 0 : le[g.actionIndex]) == null ? void 0 : xe.icon) || /* @__PURE__ */ h(Or, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: g.label })
        ]
      },
      `${g.source || "empty"}:${g.actionIndex}`
    );
  }, de = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: O ? O({ query: ae, close: it }) : /* @__PURE__ */ C(nt, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(hn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: E || `No matches for “${ae.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: D || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), ve = [];
  for (let g = 0; g < ke.length; g++) {
    const R = ke[g];
    if (R.kind === "group") {
      const Z = [];
      let le = g + 1;
      for (; le < ke.length && ke[le].kind === "item" && ke[le].hit.item.group === R.group.key; )
        Z.push({ row: ke[le], index: le }), le++;
      ve.push({ group: R, index: g, items: Z }), g = le - 1;
    } else R.kind === "item" ? ve.push({ row: R, index: g }) : ve.push({ row: R, index: g });
  }
  const tt = ce ? Br(
    /* @__PURE__ */ C(
      "div",
      {
        ref: Ye,
        id: "search-menu-panel",
        "data-theme": T,
        role: "listbox",
        "aria-label": o,
        "aria-multiselectable": Ce ? !0 : void 0,
        onPointerEnter: qn.engage,
        onPointerDown: (g) => {
          g.stopPropagation(), qn.engage();
        },
        onMouseDown: (g) => g.stopPropagation(),
        onClick: (g) => g.stopPropagation(),
        onPointerLeave: () => {
          Fe.current && We(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: St.left,
          top: St.top,
          width: k ?? (t === "expandable" ? S : U || void 0),
          minWidth: A,
          maxHeight: St.maxH,
          visibility: St.ready ? "visible" : "hidden"
        },
        children: [
          te && /* @__PURE__ */ C("div", { className: "shrink-0 pb-1", children: [
            Tt.map((g, R) => B(g, R)),
            ke.length > 0 && /* @__PURE__ */ h("div", { className: Ie.separator })
          ] }),
          /* @__PURE__ */ C("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            ke.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: O ? O({ query: ae, close: it }) : /* @__PURE__ */ h(nt, { children: "Type to search…" }) }),
            ve.map((g) => {
              if (g.group) {
                const le = et.has(g.group.group.key), xe = g.items || [];
                return /* @__PURE__ */ C(ot.Fragment, { children: [
                  Mn(g.group, fe + g.index),
                  Be && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": g.group.group.key,
                      "aria-hidden": !le,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: le ? "1fr" : "0fr",
                        opacity: le ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: xe.map((Re) => En(Re.row, fe + Re.index)) })
                    }
                  ),
                  !Be && xe.map((Re) => En(Re.row, fe + Re.index))
                ] }, `group:${g.group.group.key}`);
              }
              const R = g.row, Z = fe + g.index;
              return R.kind === "empty" ? de() : R.kind === "action" ? B(R, Z) : R.kind === "item" ? En(R, Z) : null;
            })
          ] }),
          v.length > 0 && /* @__PURE__ */ C("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: Ie.separator }),
            v.map((g, R) => B(g, fe + ke.length + R))
          ] }),
          Ce && (M == null ? void 0 : M.footer) !== !1 && /* @__PURE__ */ h(
            ts,
            {
              count: Te.count,
              max: M == null ? void 0 : M.max,
              hiddenCount: (M == null ? void 0 : M.hiddenNote) === !1 ? 0 : Te.hiddenCount,
              clear: (M == null ? void 0 : M.clear) !== !1,
              theme: T,
              onClear: Te.clear,
              hero: (M == null ? void 0 : M.mode) === "live" ? void 0 : {
                label: Nn,
                onClick: () => {
                  Te.commit(), it();
                },
                disabled: Te.count === 0
              }
            }
          )
        ]
      }
    ),
    Q ?? Bt ?? (ct == null ? void 0 : ct.body) ?? document.body
  ) : null;
  return W ? /* @__PURE__ */ C(nt, { children: [
    /* @__PURE__ */ h("div", { ref: pt, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    tt
  ] }) : t === "inline" ? /* @__PURE__ */ C("div", { ref: pt, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    lr,
    tt
  ] }) : /* @__PURE__ */ h(
    Ki,
    {
      expanded: me,
      collapsedWidth: $,
      expandedWidth: S,
      rootRef: pt,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: se ? se({ open: ce, expanded: me, toggle: Et }) : /* @__PURE__ */ h(
        $t,
        {
          ref: Ct,
          type: "button",
          variant: "primary",
          size: "minimal",
          theme: T === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ h(hn, { className: "w-3.5 h-3.5" }),
          onClick: Et,
          className: `w-full justify-start ${me ? "pointer-events-none" : ""}`,
          tabIndex: me ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ C(nt, { children: [
        Ur,
        tt
      ] })
    }
  );
}
function yn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Cl(n, e, t = "id") {
  const r = e.find((i) => yn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function zf(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function Df(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Ji(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => yn(l, t) === r);
  if (i) return yn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? yn(s, t) : r;
}
function Pf(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of zf(n)) {
    const s = Ji(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function Lf(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Ji(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function Of(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => yn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function Bf(n, e, t = "id") {
  const r = new Set(e.map((i) => yn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Ff(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Cl(o, e, t)).join(", ");
}
const Hf = () => {
};
function Kh({
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
  inputReadOnly: P = !1,
  disabled: $ = !1,
  autoFocus: S = !1,
  defaultOpen: k = !1,
  selectAllOnOpen: A = !0,
  uppercase: H = !1,
  allowFreeText: z = !0,
  theme: T,
  className: K = "",
  style: E,
  panelWidth: D,
  panelMinWidth: O,
  initialQuery: V,
  keepAllRows: Y = !1,
  maxMenuHeight: N,
  portalTarget: _,
  autoGrow: F = !1,
  skipComma: M = !1,
  collapsedWidth: we = 140,
  expandedWidth: pe = 280,
  createLabel: W,
  onCreateItem: X,
  onExit: Q,
  onEscape: se,
  onTabExit: J,
  loadItems: ge,
  emptyTitle: ue,
  emptyHint: ye,
  sortItems: q,
  max: ne,
  disabledIds: ae,
  indicator: Se,
  browse: Qe,
  groupToken: Ze
}) {
  const ze = Vt(), ce = T ?? (ze == null ? void 0 : ze.mode) ?? "light", Ae = He(), me = ee((B) => yn(B, i), [i]), _e = Xe(() => t.map(me), [t, me]), je = Xe(() => new Map(t.map((B) => [me(B), B])), [t, me]), Pe = ee((B) => Cl(B, t, i), [t, i]), et = Xe(() => new Set([...m ?? []].map((B) => B.toLowerCase())), [m]), [Ee, Le] = ie(!1), [Rt, Fe] = ie(""), [It, We] = ie(() => {
    const B = V ?? "";
    return H ? B.toUpperCase() : B;
  }), [pt, mt] = ie(It), [Ct, Ue] = ie(() => [...n]), [wt, kt] = ie(null), [ct, Bt] = ie(!1), Ie = w(null), Ve = w(null), Kt = w(null), qe = w(null), Ft = w(n.join("\0")), gt = w(!1), St = w(/* @__PURE__ */ new Set()), I = w(!1), U = w(!1), he = w(!1), Ye = w(0), Oe = w(""), ke = w([...n]), Tt = n.join("\0"), v = Xe(
    () => Ff(n, t, i, l, c),
    [n, t, i, l, c]
  ), G = ee((B) => {
    if (a) return a([...B], t);
    if (o === "single") return B[0] ? Pe(B[0]) : "";
    const de = B.map(Pe).join(", ");
    return M ? de : B.length ? `${de}, ` : "";
  }, [a, t, o, Pe, M]);
  oe(() => {
    Ee || (Ue([...n]), ke.current = [...n], Ft.current = Tt);
  }, [Tt, Ee]);
  const te = ee(() => {
    if (Ee || x || $) return;
    gt.current = !1, I.current = !0;
    const B = G(n);
    Oe.current = B, ke.current = [...n], Ue([...n]), Fe(B), mt(It), We(""), Le(!0);
  }, [Ee, x, $, n, G, It]);
  xt(() => {
    if (!Ee) return;
    const B = Ie.current;
    B && (B.focus(), o === "single" && A ? B.setSelectionRange(0, B.value.length) : B.setSelectionRange(B.value.length, B.value.length));
  }, [Ee]), xt(() => {
    if (!he.current) return;
    he.current = !1;
    const B = Ie.current;
    B && (B.focus(), B.setSelectionRange(B.value.length, B.value.length));
  }, [Rt]), oe(() => {
    (k || S) && te();
  }, []);
  const fe = o === "single" ? pt : Df(Rt), be = ge ? wt ?? [] : t, Me = Xe(
    () => q ? q(be, Ct) : be,
    [be, q, Ct]
  ), Ne = fe.trim(), Be = !!X && z && !ct && !!Ne && !Of(Ne, be, i);
  oe(() => {
    if (!ge || !Ee) return;
    const B = fe.trim();
    if (!B) {
      kt(null), Bt(!1);
      return;
    }
    Bt(!0);
    const de = ++Ye.current, ve = setTimeout(() => {
      ge(B).then((tt) => {
        Ye.current === de && (kt(tt), Bt(!1));
      }).catch(() => {
        Ye.current === de && (kt([]), Bt(!1));
      });
    }, 400);
    return () => clearTimeout(ve);
  }, [ge, Ee, fe]);
  const Ce = Xe(() => {
    const B = Me.filter((de) => !de.hidden).map((de) => ({
      id: me(de),
      label: de.label,
      group: de.group,
      detail: de.detail,
      icon: de.icon,
      disabled: !!de.disabled || !!(ae != null && ae.includes(me(de))),
      fields: de.fields,
      keywords: de.keywords,
      rowClassName: de.rowClassName,
      rowStyle: de.rowStyle
    }));
    return Be && B.unshift({
      id: Ne,
      label: W ? W(Ne) : `Add “${Ne}”…`,
      keywords: Ne,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), B;
  }, [Me, me, ae, Be, Ne, W]), Nt = ee((B) => {
    const de = B.join("\0");
    if (de !== Ft.current) {
      if (fn(B, n)) {
        Ft.current = de;
        return;
      }
      if (Ft.current = de, e(B), X)
        for (const ve of Bf(B, t, i))
          St.current.has(ve) || (St.current.add(ve), X(ve));
    }
  }, [n, e, X, t, i]), ft = ee((B, de) => {
    !de || !X || !z || t.some((ve) => me(ve) === B) || St.current.has(B) || (St.current.add(B), X(B));
  }, [X, z, t, me]), Jt = ee((B = !0) => {
    if (!I.current || (I.current = !1, x || $)) return;
    if (gt.current) {
      gt.current = !1;
      return;
    }
    const de = Oe.current, ve = new Set(_e), tt = o === "single" ? (() => {
      const g = de.trim();
      if (!g) return z ? [] : n;
      const R = Ji(g, t, i);
      return !z && !ve.has(R) ? n : [R];
    })() : Pt(
      Pf(de, t, i).filter((g) => z || ve.has(g)),
      _e
    );
    ke.current = tt, Ue(tt), mt(""), Le(!1), Nt(tt), B && !U.current && (Q == null || Q());
  }, [x, $, o, t, i, _e, z, n, Nt, Q]), Te = ee((B) => {
    Le(B), B || Jt();
  }, [Jt]), ut = ee(() => {
    gt.current = !0, I.current = !1;
    const B = G(n);
    Oe.current = B, ke.current = [...n], Ue([...n]), Fe(B), mt(""), Le(!1), se == null || se();
  }, [n, G, se]);
  oe(() => {
    var tt;
    if (!Ee) return;
    const de = (((tt = Ve.current) == null ? void 0 : tt.ownerDocument) ?? document).defaultView;
    if (!de) return;
    const ve = (g) => {
      g.key === "Escape" && (g.preventDefault(), g.stopImmediatePropagation(), ut());
    };
    return de.addEventListener("keydown", ve, !0), () => de.removeEventListener("keydown", ve, !0);
  }, [Ee, ut]);
  const Nn = ee((B) => {
    const de = Pt(B, _e), ve = G(de);
    ke.current = de, Oe.current = ve, Ue(de), he.current = !0, Fe(ve);
  }, [_e, G]), it = ee((B) => {
    const de = B.id;
    I.current = !1;
    const ve = Pe(de);
    ke.current = [de], Oe.current = ve, Ue([de]), Fe(ve), mt(""), Le(!1), Nt([de]), U.current || Q == null || Q();
  }, [Pe, Nt, Q]), tn = (B) => {
    var de, ve, tt, g, R;
    if (B.key === "Escape") {
      B.preventDefault(), ut();
      return;
    }
    if (B.key === "Tab") {
      if (B.preventDefault(), o === "single" && Ee) {
        U.current = !0;
        const Z = (de = qe.current) == null ? void 0 : de.activateHighlighted();
        if (U.current = !1, Z) {
          (ve = J ?? Q) == null || ve(Ie.current ?? void 0);
          return;
        }
      }
      Ee && Jt(!1), (tt = J ?? Q) == null || tt(Ie.current ?? void 0);
      return;
    }
    if (B.key === "ArrowDown" || B.key === "ArrowUp") {
      if (B.preventDefault(), !Ee) {
        te();
        return;
      }
      (g = qe.current) == null || g.moveHighlight(B.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (B.key === "Enter") {
      if (B.preventDefault(), B.stopPropagation(), Ee && ((R = qe.current) != null && R.activateHighlighted())) return;
      Jt();
      return;
    }
  }, At = (B) => {
    var ve;
    const de = H ? B.target.value.toUpperCase() : B.target.value;
    if (Oe.current = de, Fe(de), o === "single" && mt(de), Ee || (I.current = !0, gt.current = !1, Le(!0)), o === "multiple") {
      const tt = Pt(Lf(de, t, i), _e);
      ke.current = tt, Ue(tt), (ve = qe.current) == null || ve.setSelection(tt);
    }
  }, Et = () => {
    if (I.current) {
      if (gt.current) {
        gt.current = !1;
        return;
      }
      Jt();
    }
  }, Ht = ee((B, de) => {
    const ve = je.get(B.id);
    if (!ve)
      return /* @__PURE__ */ C(nt, { children: [
        /* @__PURE__ */ h(Or, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: B.label })
      ] });
    const tt = !!m && (i === "label" ? et.has(ve.label.toLowerCase()) : m.has(me(ve))), g = (f == null ? void 0 : f(ve)) ?? ve.badge ?? null;
    return /* @__PURE__ */ C(nt, { children: [
      d ? d(ve, de.checked) : /* @__PURE__ */ C(nt, { children: [
        ve.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: ve.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: ve.label }),
        g && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: g }),
        p == null ? void 0 : p(ve)
      ] }),
      tt && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: y, "aria-label": y, children: /* @__PURE__ */ h(Fl, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [je, m, et, i, me, f, d, p, y]), Cn = /* @__PURE__ */ h(
    $f,
    {
      ref: qe,
      mode: "inline",
      hideTrigger: !0,
      open: Ee,
      onOpenChange: Te,
      anchorRef: s === "morph" ? Kt : Ve,
      items: Ce,
      groups: r,
      query: fe,
      onSelect: it,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? Ct[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Ct,
        mode: "live",
        onDraftChange: Nn,
        onToggle: ft,
        onCommit: Hf,
        max: ne,
        disabledIds: ae,
        indicator: Se,
        groupToken: Ze
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (Qe ?? "open") === "open",
      expandableGroups: r.length > 0 && Qe === "accordion",
      groupExpandMode: "single",
      renderItem: Ht,
      emptyTitle: ct ? "Searching…" : ue,
      emptyHint: ct ? "Fetching matching records." : ye,
      theme: ce,
      panelWidth: D,
      panelMinWidth: O,
      keepAllRows: Y,
      maxMenuHeight: N,
      portalTarget: _
    }
  ), yt = s === "chip", nn = s === "wrap", Tn = !yt && !nn && F, lr = !Ee && !v, Ur = Ee ? Rt : v, dn = {
    ref: Ie,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: Ee ? Rt : yt ? n.join(", ") : v,
    disabled: $,
    readOnly: P,
    placeholder: "",
    onFocus: te,
    onClick: te,
    onChange: At,
    onBlur: Et,
    onKeyDown: tn,
    autoComplete: "off",
    spellCheck: !1
  }, cr = L(5, 7, Ae), ar = L(9, 12, Ae), qn = L(12, 14, Ae);
  if (s === "morph")
    return /* @__PURE__ */ h(
      Ki,
      {
        expanded: Ee,
        collapsedWidth: we,
        expandedWidth: pe,
        rootRef: Ve,
        "data-picker-field": !0,
        className: K,
        style: E,
        trigger: u ? u({ values: [...n], items: t, display: v, open: Ee, toggle: te }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              disabled: $,
              onClick: te,
              className: "flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${cr}px ${ar}px`, fontSize: qn },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${lr ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: v || b }),
                /* @__PURE__ */ h(bn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ C("div", { ref: Kt, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...dn,
              className: `${Mr("sm")} h-full w-full`
            }
          ),
          Cn
        ] })
      }
    );
  const En = yt ? L(5, 7, Ae) : 0, Mn = yt ? L(9, 12, Ae) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: Ve,
      "data-picker-field": !0,
      className: `relative ${yt ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : nn ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${K}`,
      style: yt ? { padding: `${En}px ${Mn}px`, fontSize: L(12, 14, Ae), ...E } : E,
      children: /* @__PURE__ */ h(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: v,
          className: yt ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ C(
    "div",
    {
      ref: Ve,
      "data-picker-field": !0,
      className: `relative ${yt ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : nn ? "min-h-[1lh] w-full pb-[1lh]" : Tn ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${K}`,
      style: yt ? { padding: `${En}px ${Mn}px`, fontSize: qn, ...E } : E,
      onMouseDown: (B) => B.stopPropagation(),
      onContextMenu: (B) => {
        B.preventDefault(), B.stopPropagation();
      },
      onAuxClick: te,
      children: [
        yt && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: v, open: Ee, toggle: te }) }) : l === "chips" && !Ee ? /* @__PURE__ */ C("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((B) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Pe(B)
            },
            B
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${yt ? "min-w-0 flex-1 truncate" : nn ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${lr ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: Ur || b
          }
        ),
        nn ? /* @__PURE__ */ h(
          "textarea",
          {
            ...dn,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...dn,
            className: Tn ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Tn ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : yt ? { caretColor: "#2563eb", color: "transparent", paddingLeft: Mn, paddingRight: Mn + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        yt && /* @__PURE__ */ h(bn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        Cn
      ]
    }
  );
}
export {
  $t as Button,
  Wh as CardSection,
  Ei as CheckMark,
  Sc as Checkbox,
  Ch as Checklist,
  Lh as ChromeHeader,
  Ph as ContentRow,
  hh as ContextMenu,
  mh as ContextMenuDivider,
  ph as ContextMenuItem,
  gh as ContextMenuSub,
  Jo as DROPDOWN_MAX_HEIGHT,
  Nh as DatePicker,
  bh as DialogProvider,
  zc as DropdownItem,
  Wr as DropdownMenu,
  Dc as DropdownSubmenu,
  Mi as DropdownThemeContext,
  vf as FONTS,
  Eh as FloatingChrome,
  Sh as FloatingToggle,
  kf as FontMenu,
  _h as FormatToolbar,
  rt as IS_COARSE,
  ac as IS_TOUCH_CAPABLE,
  fh as ItemManagerDropdown,
  wh as LongPressMenuProvider,
  ki as MORPH_EASE,
  vn as MORPH_MS,
  Si as MORPH_OPACITY_MS,
  sr as MenuHighlightContext,
  ss as MenuSearchContext,
  Lc as Modal,
  yh as ModalFooter,
  fr as ModalFooterButton,
  qh as MorphActionField,
  Mf as MorphSearchField,
  es as NO_SELECTION_IDS,
  jh as NumberInput,
  Kh as PickerField,
  cc as PopoutWindowContext,
  Hh as RICH_TEXT_STATE_IDLE,
  Th as RadioList,
  bf as RichTextEditor,
  Cf as SCRUB_PX_PER_STEP,
  $f as SearchMenu,
  Dh as SectionHeader,
  zh as Seg,
  Er as SelectionCheck,
  Zo as SelectionContext,
  ts as SelectionFooter,
  Oh as StructureControls,
  Ii as SubmenuContext,
  dh as TAB_PILL,
  na as TB_BTN,
  hr as TB_BTN_ICON,
  ra as TB_DANGER,
  hs as TB_DIVIDER,
  ia as TB_INPUT,
  $h as TB_NUM,
  sa as TB_PICKER,
  Mh as TB_ROW_LABEL,
  oa as TB_SEG,
  Rh as TB_TOGGLE,
  Ah as TB_TOGGLE_OFF,
  Ih as TB_TOGGLE_ON,
  Ec as TabFace,
  ah as ThemeProvider,
  uh as ThemeScope,
  df as Token,
  uf as TokenChipView,
  pr as ToolButton,
  An as Tooltip,
  Ni as ZOOM_FROM,
  Af as buildSearchMenuRows,
  yc as buttonCloudOf,
  qi as clampNumber,
  hc as cloneOverlayClose,
  L as coarsePx,
  wc as countHidden,
  Fh as escapeHtml,
  Ff as formatPickerValues,
  Ho as getCoarseScale,
  _r as getDropdownClasses,
  lh as getHardwareKeyboard,
  sh as getLastPointerType,
  eo as groupSelectionState,
  Of as hasPickerMatch,
  Mr as inputCls,
  Kc as isInteractiveElement,
  ai as isTouchLike,
  Df as lastPickerSegment,
  If as matchSearchItem,
  Xo as menuAttributesOf,
  mc as menuThemeOf,
  qo as nearestOverlayOrigin,
  kl as normalizeSpaces,
  Pt as orderByCatalogue,
  Xr as overlayMorphEnabled,
  Rf as parseSearchTags,
  Lf as pickerCommittedKeys,
  yn as pickerItemKey,
  Cl as pickerItemLabel,
  zf as pickerSegments,
  fc as playOverlayClose,
  dc as playOverlayOpen,
  Io as preprocessTokenHtml,
  Ji as resolvePickerSegment,
  Pf as resolvePickerText,
  an as revealRowInScroller,
  fn as sameSelection,
  lf as sanitizeRichText,
  Tf as scrubbedValue,
  Nl as searchMenuContent,
  gc as segModeOf,
  ih as setCoarseScale,
  Zi as setSelected,
  Nf as steppedValue,
  Bh as stripRichText,
  cf as stripTokenWrappers,
  vc as toggleSelected,
  Bf as unknownPickerValues,
  oh as useCoarse,
  He as useCoarseScale,
  cn as useCoarseSize,
  wi as useCurrentDocument,
  ir as useCurrentWindow,
  xh as useDialog,
  Vo as useDropdownPosition,
  ns as useDropdownTheme,
  ch as useHardwareKeyboard,
  ds as useInputSize,
  Ri as useItemSize,
  Vt as useKitTheme,
  uc as useLastPointerType,
  vh as useLongPressOptOut,
  Ai as useMenuHighlight,
  Ic as useMenuSearch,
  Hr as useOverlayMorph,
  vi as usePopoutWindow,
  jn as usePortalTarget,
  Go as useRevealRowOnOpen,
  Qo as useSelection,
  kc as useSelectionContext,
  ta as useSlidingPill,
  kh as useTouchMode
};
