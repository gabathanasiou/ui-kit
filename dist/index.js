"use client";
import { jsx as h, jsxs as C, Fragment as Ze } from "react/jsx-runtime";
import rt, { createContext as en, useContext as tn, useState as oe, useEffect as ie, useRef as w, useCallback as Q, useLayoutEffect as vt, useMemo as Ve, useId as El, useImperativeHandle as zo } from "react";
import * as De from "@radix-ui/react-dropdown-menu";
import { Minus as Ml, Check as Zn, Search as pn, X as bn, Pencil as Rl, Copy as Do, Trash2 as li, RotateCcw as Po, Plus as Pr, ChevronRight as Sr, ChevronLeft as Il, ArrowUp as Al, ArrowDown as $l, ChevronDown as vn, Underline as zl, Strikethrough as Dl, RemoveFormatting as Pl, Link as Ll, ChevronUp as Ol, Anchor as Bl } from "lucide-react";
import { computePosition as Fl, offset as Lo, flip as Oo, shift as Bo, size as Hl, useFloating as _l, autoUpdate as jl } from "@floating-ui/react-dom";
import * as sn from "@radix-ui/react-dialog";
import { createPortal as Lr } from "react-dom";
import { mergeAttributes as Wl, ReactNodeViewRenderer as ql, NodeViewWrapper as Kl, useEditor as Jl, EditorContent as Vl } from "@tiptap/react";
import { PluginKey as Yt, Plugin as nn, Selection as An, TextSelection as _t, NodeSelection as Pn, AllSelection as Yl } from "@tiptap/pm/state";
import { DecorationSet as cr, Decoration as Ul } from "@tiptap/pm/view";
import Xl from "@tiptap/starter-kit";
import Gl from "@tiptap/extension-placeholder";
import { TextStyle as Ql, FontFamily as Zl, FontSize as ec } from "@tiptap/extension-text-style";
import tc from "@tiptap/extension-color";
import nc from "@tiptap/extension-link";
import rc from "@tiptap/extension-underline";
import ic from "@tiptap/suggestion";
import { Mention as oc } from "@tiptap/extension-mention";
import { createRoot as sc } from "react-dom/client";
const lc = en(null);
function bi() {
  return tn(lc);
}
function Fn() {
  const n = bi();
  return n ? n.document.body : null;
}
function vi() {
  const n = bi();
  return n ? n.document : typeof document < "u" ? document : null;
}
function er() {
  return bi() ?? (typeof window < "u" ? window : null);
}
const tr = typeof window < "u", et = tr && window.matchMedia("(pointer: coarse)").matches, cc = tr && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Or = 0.5;
const Jn = /* @__PURE__ */ new Set();
function rh(n) {
  Or = Math.max(0, Math.min(1, n)), Jn.forEach((e) => e());
}
function Fo() {
  return Or;
}
function ih() {
  const [, n] = oe(0);
  return ie(() => {
    const e = () => n((t) => t + 1);
    return Jn.add(e), () => {
      Jn.delete(e);
    };
  }, []), et && Or > 0;
}
function He() {
  const [, n] = oe(0);
  return ie(() => {
    const e = () => n((t) => t + 1);
    return Jn.add(e), () => {
      Jn.delete(e);
    };
  }, []), Or;
}
function O(n, e, t) {
  return et ? Math.round(n + (e - n) * t) : n;
}
function un(n, e) {
  const t = He();
  return et && t > 0 ? {
    padding: `${O(n.py, e.py, t)}px ${O(n.px, e.px, t)}px`,
    fontSize: `${O(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Ho() {
  const n = He(), e = et && n > 0;
  return {
    box: e ? O(28, 36, n) : 20,
    icon: e ? O(16, 20, n) : 14
  };
}
function ci(n) {
  return n === "touch" || n === "pen";
}
let In = null;
const ai = /* @__PURE__ */ new Set();
tr && window.addEventListener("pointerdown", (n) => {
  In = n.pointerType, ai.forEach((e) => e());
}, !0);
function oh() {
  return In;
}
function ac() {
  const [, n] = oe(0), e = w(In);
  return ie(() => {
    const t = () => {
      e.current !== In && (e.current = In, n((r) => r + 1));
    };
    return ai.add(t), () => {
      ai.delete(t);
    };
  }, []), In;
}
const _o = ["(any-hover: hover)", "(any-pointer: fine)"];
function jo() {
  return tr ? _o.some((n) => window.matchMedia(n).matches) : !1;
}
let Nr = jo();
const ui = /* @__PURE__ */ new Set();
function Gi(n) {
  Nr !== n && (Nr = n, ui.forEach((e) => e()));
}
var $o;
if (tr) {
  const n = () => Gi(jo());
  for (const s of _o) {
    const l = window.matchMedia(s);
    ($o = l.addEventListener) == null || $o.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || Gi(!0));
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
function sh() {
  return Nr;
}
function lh() {
  const [, n] = oe(0);
  return ie(() => {
    const e = () => n((t) => t + 1);
    return ui.add(e), () => {
      ui.delete(e);
    };
  }, []), Nr;
}
const wn = 220, wi = "cubic-bezier(0.32, 0.72, 0, 1)", ki = 170, Si = 0.94;
function Ur(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Wo(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function qo(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Wo({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function uc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Si})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = qo(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${wn}ms ${wi}, opacity ${ki}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, wn + 60);
    });
  });
}
function dc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = qo(e, t);
  e.style.transition = `transform ${wn}ms ${wi}, opacity ${ki}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Si})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, wn + 60);
}
function fc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Wo({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${wn}ms ${wi}, opacity ${ki}ms ease`, r.style.transform = `scale(${Si})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, wn + 60));
    });
  });
}
function Br(n) {
  const e = w(null), [t, r] = oe(!1), i = w(null), o = w(0), s = Q((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Ur(f.current) && fc(g, u.current, i.current));
    });
  }, []), l = Q(() => {
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
  return vt(() => {
    if (!t || !c.current || !Ur(f.current)) return;
    const m = e.current;
    m && uc(p, m, u.current);
  }, [t, n.visible]), ie(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), vt(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Ur(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    dc(p, g, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), ie(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), ie(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const Ko = 384;
function hc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Jo({
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
  const u = er(), d = w(u);
  d.current = u;
  const f = w(a);
  f.current = a, vt(() => {
    if (!t) return;
    let p = 0, m = !1;
    const g = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const R = d.current, j = n.current, I = e.current;
      if (!R || !j || !I || !I.isConnected) return;
      const M = (r == null ? void 0 : r.current) ?? I, J = hc(R), E = l ?? Ko, A = Math.min(c, E), B = Math.max(0, I.offsetHeight - M.offsetHeight), V = Math.max(A, Math.ceil(M.scrollHeight + B)), X = Math.min(V, E);
      I.style.maxHeight = `${X}px`;
      let T = X;
      const _ = i == null ? void 0 : i.current;
      Fl(_ ? {
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
      } : j, I, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Lo(o),
          Oo({ boundary: J, padding: s, fallbackStrategy: "bestFit" }),
          Bo({ boundary: J, padding: s, mainAxis: !1 }),
          Hl({
            boundary: J,
            padding: s,
            apply({ availableHeight: ge }) {
              T = Math.max(A, Math.floor(Math.min(E, ge))), I.style.maxHeight = `${T}px`;
            }
          })
        ]
      }).then(({ x: ge, y: me, placement: ue }) => {
        m || f.current({
          top: Math.round(me),
          left: Math.round(ge),
          maxH: T,
          side: ue.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, L = (x == null ? void 0 : x.document) ?? null, $ = (x == null ? void 0 : x.visualViewport) ?? null, N = () => g();
    $ == null || $.addEventListener("resize", N), $ == null || $.addEventListener("scroll", N), x == null || x.addEventListener("resize", N), L == null || L.addEventListener("scroll", N, { capture: !0, passive: !0 });
    let k = null;
    return typeof ResizeObserver < "u" && (k = new ResizeObserver(N), e.current && k.observe(e.current), r != null && r.current && k.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), $ == null || $.removeEventListener("resize", N), $ == null || $.removeEventListener("scroll", N), x == null || x.removeEventListener("resize", N), L == null || L.removeEventListener("scroll", N, { capture: !0 }), k == null || k.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let Cn = null;
function Vo(n) {
  return Cn == null || Cn(), Cn = n, () => {
    Cn === n && (Cn = null);
  };
}
const Yo = en(null);
function Ni(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ti({ theme: n, children: e }) {
  return /* @__PURE__ */ h(Yo.Provider, { value: n, children: e });
}
function ch({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Ut();
  return /* @__PURE__ */ h(Ti, { theme: Ni({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function ah({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Ut(), c = Ni({ mode: n, accent: e, surface: t, context: r }, l);
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
function Ut() {
  return tn(Yo);
}
function pc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function Uo(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = pc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function mc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function gc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function yc(n) {
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
function dn(n, e = "nearest", t) {
  if (!n) return;
  const r = t ?? yc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function Xo({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = w(!1), s = w(!1), l = w(!1), c = w({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = Q(() => {
    o.current = !0;
  }, []);
  return vt(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (dn(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), ie(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      dn(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const xc = [];
function Ht(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function hn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function bc(n, e, t, r = {}) {
  var o;
  const i = Ht(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Ht([...i, e], t);
}
function Qi(n, e, t, r, i = {}) {
  const o = Ht(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Ht([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : Ht([...o, ...u], r);
}
function Zi(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function vc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function Go(n) {
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
  } = n, [f, p] = oe(() => Ht(t, r)), m = Ve(() => new Set(s ?? []), [s]), g = Ve(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !hn(f, t), L = Q((J) => {
    if (m.has(J)) return;
    const E = g.has(J), A = bc(f, J, r, { max: o, disabledIds: s });
    hn(A, f) || (p(A), d == null || d(A), u == null || u(J, !E));
  }, [f, g, m, r, o, s, u, d]), $ = Q((J) => {
    const E = J.filter((V) => !m.has(V)), A = Zi(f, E), B = Qi(f, E, A !== "all", r, { max: o, disabledIds: s });
    hn(B, f) || (p(B), d == null || d(B));
  }, [f, m, r, o, s, d]), N = Q((J, E = i ?? r) => {
    const A = Qi(f, E, J, r, { max: o, disabledIds: s });
    hn(A, f) || (p(A), d == null || d(A));
  }, [f, i, r, o, s, d]), k = Q(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), R = Q((J) => {
    p(Ht(J ?? t, r));
  }, [t, r]), j = Q(() => !a || hn(f, t) ? !1 : (a(Ht(f, r)), !0), [a, f, t, r]), I = Q(() => !c || hn(f, t) ? !1 : (c(Ht(f, r)), !0), [c, f, t, r]), M = Q((J) => Zi(f, J), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: vc(f, r, i),
    isSelected: (J) => g.has(J),
    isDisabled: (J) => m.has(J),
    canToggle: (J) => !m.has(J) && (g.has(J) || !b),
    toggle: L,
    toggleGroup: $,
    setAll: N,
    clear: k,
    reset: R,
    commit: j,
    flush: I,
    cancel: R,
    groupState: M
  };
}
const Qo = en(null), wc = () => tn(Qo), Zo = xc;
function Ci({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
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
function kc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = He(), p = O(16, 20, f), m = O(12, 14, f), g = O(12, 14, f), b = O(12, 16, f), x = O(10, 12, f), L = O(8, 10, f);
  return /* @__PURE__ */ C(
    "label",
    {
      className: `ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: L, padding: d ? `${x}px ${b}px` : void 0 },
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
        d ? /* @__PURE__ */ h(Ci, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const eo = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Sc = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Nc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Tc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Cc({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, c = !!n && (t || s);
  return s ? /* @__PURE__ */ C(Ze, { children: [
    c && (l ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${eo} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Nc}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${eo} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Sc}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Tc}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ C(Ze, { children: [
    c && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const uh = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function zt({
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
  const p = Ut(), m = e ?? (p == null ? void 0 : p.mode) ?? "light", g = t ?? gc(p), b = un({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), x = un({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), L = un({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), $ = "", N = "", k = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", R = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, j = {
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
  }, I = {
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
  }, J = {
    light: {
      subtle: { base: `${$} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${N} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
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
      primary: { base: `${N} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${$} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${$} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, E = {
    blue: { base: `${N} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${N} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, A = f["data-state"] === "open", B = J[m][n], V = n === "primary" ? x : n.startsWith("tab") ? L : b, X = et ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, T = O(6, 8, He()), _ = O(28, 40, He()), v = g === "emerald" ? "emerald" : g ? "blue" : null, ge = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let me;
  if (n === "tab") {
    const le = R[m];
    me = r ? v ? j[v].active : le.active : v ? j[v][m === "light" ? "inactiveLight" : "inactiveDark"] : le.inactive;
  } else if (n === "tab-header")
    me = `${v ? r ? M[v].active : M[v].inactive : r ? I.active : I.inactive} ${A ? v ? M[v].open : I.open : ""}`;
  else if (me = `${B.base} ${A ? B.open : ""}`, r && (me = `${me} ${ge}`), n === "primary" && v) {
    const le = E[v];
    me = A ? `${le.base} ${le.open}` : le.base;
  }
  const ue = !!l && !!s && !i, P = i ? { width: _, height: _, padding: 0, gap: 0 } : o === "minimal" ? { ...X, gap: ue ? 0 : T } : { ...V, gap: ue ? 0 : T };
  return /* @__PURE__ */ h(
    "button",
    {
      type: u,
      "data-mode": m,
      "data-accent": p == null ? void 0 : p.accent,
      className: `${k} ${i ? "justify-center" : ""} ${ue ? "group" : ""} ${me} ${a}`,
      style: P,
      ...f,
      children: i ? d : /* @__PURE__ */ h(Cc, { icon: s, collapse: l, iconWithLabel: c, active: r, gap: T, children: d })
    }
  );
}
function Tr({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = He(), l = i ?? O(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(Ml, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(Zn, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(Ci, { checked: n, indeterminate: e, size: l })
    }
  );
}
function es({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = He(), a = O(10, 14, c), u = O(6, 9, c), d = O(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
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
          zt,
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
          zt,
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
const Ei = en("dark"), ts = () => tn(Ei);
function Mi() {
  const n = He();
  return {
    padding: `${O(8, 12, n)}px ${O(12, 16, n)}px`,
    fontSize: `${O(12, 14, n)}px`,
    lineHeight: `${O(18, 22, n)}px`
  };
}
function ns() {
  const n = He();
  return {
    padding: `${O(6, 9, n)}px ${O(12, 16, n)}px ${O(2, 3, n)}px`,
    fontSize: `${O(10, 11, n)}px`,
    lineHeight: `${O(14, 16, n)}px`
  };
}
const Ec = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", to = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Mc = (n) => n ? "text-xs" : "text-[10px]";
function Fr(n) {
  const e = et && Fo() > 0;
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
    headerPad: to(e),
    headerText: `${to(e)} font-semibold uppercase tracking-wider ${Mc(e)} ui-label`,
    // Item padding
    itemPad: Ec(e),
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
function rs(n) {
  const e = [];
  return rt.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (rt.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Ri = en({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), nr = en(null), Ii = () => tn(nr), is = en({ query: "", setQuery: () => {
} }), Rc = () => tn(is), ss = en(null), Ic = () => tn(ss), Ac = () => !0;
function Hr(n) {
  const e = w([]), [t, r] = oe(-1), [i, o] = oe(!1), [s, l] = oe(0), c = Q((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = Q((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = Q(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return Ve(() => ({
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
function ls(n) {
  const e = Ii(), t = w(e);
  t.current = e;
  const r = w(null);
  ie(() => {
    var c, a;
    const l = { label: n.label(), activate: n.activate, group: ((c = n.group) == null ? void 0 : c.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (a = t.current) == null ? void 0 : a.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Ai(n, e, t, r) {
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
    var g, b, x, L, $, N;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const k = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((L = l.current) != null && L.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), k && u.preventDefault());
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
        u.preventDefault(), u.stopImmediatePropagation(), (N = ($ = l.current) == null ? void 0 : $.onCloseSub) == null || N.call($);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = i.current;
        k >= 0 && k < m.length && m[k].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = Date.now(), R = (k - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: R, time: k }, !R) return;
        const j = i.current + 1;
        for (let I = 0; I < m.length; I++) {
          const M = (j + I) % m.length;
          if (m[M].label.toLowerCase().startsWith(R)) {
            o.current.setHighlighted(M, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function $i(n, e, t, r, i, o, s) {
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
function zi(n, e) {
  const t = w(n);
  t.current = n;
  const r = w(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function _r({
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
  const L = Ut(), $ = Uo(s, L), N = $.theme, [k, R] = oe([]), [j, I] = oe(null), M = Fn(), J = vi(), E = w(null), A = w(null), B = w(n);
  B.current = n;
  const [V, X] = oe(n), [T, _] = oe(""), v = f && g !== void 0, ge = v ? g : T, me = v ? b ?? (() => {
  }) : _, ue = w(g ?? "");
  ie(() => {
    n || (ue.current = g ?? "");
  }, [n, g]);
  const P = v && ge === ue.current ? "" : ge, le = El(), ee = w(null), se = He(), q = {
    padding: `${O(8, 12, se)}px ${O(12, 16, se)}px`,
    fontSize: `${O(12, 14, se)}px`
  }, [we, re] = oe(0), he = f && !v;
  ie(() => {
    var Ae;
    if (!he || !n) return;
    const z = (Ae = A.current) == null ? void 0 : Ae.querySelector("[data-menu-items]");
    if (!z) return;
    const Y = () => re(z.offsetWidth - z.clientWidth);
    Y();
    const ce = new ResizeObserver(Y);
    return ce.observe(z), () => ce.disconnect();
  }, [n, he, ge]);
  const K = Ve(() => {
    if (!f) return;
    const z = P.trim().toLowerCase();
    return z ? (Y) => {
      var ce;
      return m ? m(z, Y.label, Y.group) : Y.label.toLowerCase().includes(z) || (((ce = Y.group) == null ? void 0 : ce.toLowerCase().includes(z)) ?? !1);
    } : Ac;
  }, [P, f, m]), F = Hr(K), Le = f && P.trim() !== "" && F.items.length === 0, Ne = !!x, tt = F.allItems.map((z) => z.itemId).filter((z) => !!z), Ee = F.items.map((z) => z.itemId).filter((z) => !!z), te = Go({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? Zo,
    itemIds: tt,
    visibleIds: Ee,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), Re = w(te.reset);
  Re.current = te.reset;
  const ye = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(te.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${te.count}`;
  ie(() => {
    if (n)
      return X(!0), v || _(""), F.setHighlighted(d ?? -1, "keyboard"), Re.current(), Vo(() => {
        t == null || t(!1), e == null || e();
      });
    R([]);
  }, [n, d, t, e]), ie(() => {
    if (!n || !J) return;
    const z = (Y) => {
      if (Y.pointerType !== "touch") return;
      const ce = Y.target;
      ce && (A.current && A.current.contains(ce) || E.current && E.current.contains(ce) || ce instanceof Element && ce.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return J.addEventListener("pointerdown", z, { capture: !0 }), () => J.removeEventListener("pointerdown", z, { capture: !0 });
  }, [n, J, t, e]);
  const Oe = Q(() => {
    const z = E.current;
    if (!z) return null;
    const Y = z.getBoundingClientRect();
    return { left: Y.left, top: Y.top, width: Y.width, height: Y.height };
  }, []), xe = Br({
    visible: n,
    morph: c,
    anchor: Oe,
    onClosed: () => X(!1)
  }), Ce = w(() => {
  }), Be = w(() => {
  }), Ue = w(() => {
  }), mt = Q((z) => {
    if (z.key === "Enter") {
      const Y = F.highlightedIndex, ce = F.items[Y >= 0 ? Y : 0];
      return ce == null || ce.activate(), !0;
    }
    return z.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [F, t, e]);
  Ai(n && k.length === 0, F, Ce, {
    onFieldKey: mt,
    onSelectAll: Ne ? () => te.setAll(!0) : void 0
  }), zi(n, Be), $i(n, F, Ce, A, k.length > 0, Ue, {
    ignoreFields: v,
    selectAll: Ne
  });
  const St = w(null), yt = Q((z) => {
    var Y;
    if (z) {
      z.addEventListener("keydown", Ce.current, { capture: !0 }), z.addEventListener("wheel", Be.current, { passive: !1 });
      const ce = z.ownerDocument;
      St.current = ce, ce.addEventListener("keydown", Ue.current, { capture: !0 }), st(!0);
    } else
      (Y = St.current) == null || Y.removeEventListener("keydown", Ue.current, { capture: !0 }), St.current = null, st(!1);
    A.current = z, xe(z);
  }, [xe]), [ze, Xe] = oe({ top: 0, left: 0, maxH: Ko, side: "bottom", ready: !1 }), [at, Ct] = oe(0), [Pt, st] = oe(!1);
  ie(() => {
    n && E.current && Ct(E.current.getBoundingClientRect().width);
  }, [n]), Jo({
    anchorRef: E,
    panelRef: A,
    open: n && Pt,
    maxHeight: u,
    onPosition: Xe
  }), ie(() => {
    var z;
    if (ze.ready && n) {
      if (f) {
        (z = ee.current ?? E.current) == null || z.focus();
        return;
      }
      const Y = A.current;
      Y && Y.ownerDocument.activeElement !== Y && !Y.contains(Y.ownerDocument.activeElement) && Y.focus();
    }
  }, [ze.ready, n, f]), ie(() => {
    if (!n || !f) return;
    if (F.items.length === 0) {
      F.highlightedIndex !== -1 && F.setHighlighted(-1, "keyboard");
      return;
    }
    const z = F.highlightedIndex;
    (z < 0 || z >= F.items.length) && F.setHighlighted(0, "keyboard");
  }, [n, ge, f, F.items.length]), vt(() => {
    var Y;
    if (!n || F.highlightedIndex < 0 || F.pointerDriven) return;
    const z = (Y = A.current) == null ? void 0 : Y.querySelector(`[data-ei="${F.highlightedIndex}"]`);
    dn(z, "nearest");
  }, [n, F.highlightedIndex, F.pointerDriven]);
  const ut = Q((z) => {
    if (!(!z && !B.current)) {
      if (!z && lt.current) {
        if (v) return;
        xt.current = !0;
      }
      t ? t(z) : z || e == null || e();
    }
  }, [t, e]), Nt = w(V);
  Nt.current = V;
  const lt = w(!1), xt = w(!1), Ge = Q(() => {
    if (!B.current && Nt.current) {
      if (xt.current) {
        xt.current = !1, lt.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), Fe = rt.isValidElement(r) ? r : null, qe = w(!1), _e = Q(() => {
    const z = E.current;
    z && (qe.current = !0, z.focus(), setTimeout(() => {
      qe.current = !1;
    }, 0));
  }, []), Xt = Fe ? rt.cloneElement(Fe, {
    ref: (z) => {
      E.current = z;
      const Y = Fe.props.ref;
      typeof Y == "function" ? Y(z) : Y && (Y.current = z);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...v ? { type: Fe.props.type ?? "text" } : {},
    ...v ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${le}-content` : void 0,
      "aria-activedescendant": n && F.highlightedIndex >= 0 ? `${le}-opt-${F.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (z) => {
      var Y, ce;
      (ce = (Y = Fe.props).onPointerDownCapture) == null || ce.call(Y, z), lt.current = !0, xt.current = !1, setTimeout(() => {
        lt.current = !1;
      }, 0);
    },
    onPointerDown: (z) => {
      var Y, ce;
      if ((ce = (Y = Fe.props).onPointerDown) == null || ce.call(Y, z), v) {
        z.preventDefault();
        const Ae = B.current;
        Ae || t == null || t(!0);
        const ve = E.current;
        ve == null || ve.focus(), !Ae && ve instanceof HTMLInputElement && ve.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (z) => {
      var Y, ce;
      (ce = (Y = Fe.props).onKeyDownCapture) == null || ce.call(Y, z), v && z.key === " " && z.stopPropagation();
    },
    onClick: (z) => {
      var Y, ce;
      (ce = (Y = Fe.props).onClick) == null || ce.call(Y, z), Ge();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (z) => {
      var Y, ce;
      if (qe.current) {
        qe.current = !1;
        return;
      }
      (ce = (Y = Fe.props).onFocus) == null || ce.call(Y, z);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (z) => {
      var ce, Ae, ve, ft;
      if ((Ae = (ce = Fe.props).onBlur) == null || Ae.call(ce, z), !v || !B.current) return;
      const Y = z.relatedTarget;
      Y && ((ve = A.current) != null && ve.contains(Y) || (ft = E.current) != null && ft.contains(Y)) || setTimeout(() => {
        var U;
        const At = E.current;
        if (!At || !B.current) return;
        const S = At.ownerDocument.activeElement;
        S && (At.contains(S) || (U = A.current) != null && U.contains(S)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (z) => {
      var Y, ce;
      if ((ce = (Y = Fe.props).onKeyDown) == null || ce.call(Y, z), !(!v || !B.current)) {
        if (z.key === "ArrowDown" || z.key === "ArrowUp") {
          z.preventDefault();
          const Ae = F.items;
          if (Ae.length === 0) return;
          const ve = z.key === "ArrowDown" ? 1 : -1, ft = (F.highlightedIndex + ve + Ae.length) % Ae.length;
          F.setHighlighted(ft, "keyboard");
        } else if (z.key === "Enter") {
          z.preventDefault();
          const Ae = F.highlightedIndex, ve = F.items[Ae >= 0 ? Ae : 0];
          ve == null || ve.activate();
        }
      }
    }
  }) : r, Lt = /* @__PURE__ */ C("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ C("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      P.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), dt = he || Ne, Et = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${dt ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ C(De.Root, { open: n || V, onOpenChange: ut, modal: !1, children: [
    /* @__PURE__ */ h(De.Trigger, { asChild: !0, children: Xt }),
    /* @__PURE__ */ h(De.Portal, { container: M ?? void 0, children: /* @__PURE__ */ h(Ei.Provider, { value: N, children: /* @__PURE__ */ h(Ri.Provider, { value: { chain: k, setChain: R, morph: c, keyboardOpened: j, setKeyboardOpened: I }, children: /* @__PURE__ */ h(nr.Provider, { value: F, children: /* @__PURE__ */ h(is.Provider, { value: { query: ge, setQuery: me }, children: /* @__PURE__ */ h(Qo.Provider, { value: Ne ? te : null, children: /* @__PURE__ */ h(ss.Provider, { value: le, children: /* @__PURE__ */ C(
      De.Content,
      {
        id: `${le}-content`,
        ref: yt,
        tabIndex: v ? void 0 : -1,
        ...$.attrs,
        "data-ui-fixed": !0,
        className: `${Et} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: ze.left,
          top: ze.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : at || void 0,
          maxHeight: ze.maxH,
          visibility: ze.ready ? "visible" : "hidden"
        },
        onPointerLeave: F.pointerLeave,
        onFocusCapture: v ? (z) => {
          z.target === z.currentTarget && (z.stopPropagation(), _e());
        } : void 0,
        onFocusOutside: v ? (z) => {
          var ce;
          const Y = z.target;
          Y && (Y === E.current || (ce = E.current) != null && ce.contains(Y)) && z.preventDefault();
        } : void 0,
        onCloseAutoFocus: v ? (z) => {
          z.preventDefault(), _e();
        } : void 0,
        children: [
          he && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: we }, children: /* @__PURE__ */ C("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: q, children: [
            /* @__PURE__ */ h(pn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: ee,
                value: ge,
                onChange: (z) => me(z.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            ge ? /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (z) => z.stopPropagation(),
                onClick: () => {
                  var z;
                  me(""), (z = ee.current) == null || z.focus();
                },
                children: /* @__PURE__ */ h(bn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          dt ? /* @__PURE__ */ C("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Le && Lt
          ] }) : /* @__PURE__ */ C(Ze, { children: [
            l,
            Le && Lt
          ] }),
          Ne && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            es,
            {
              count: te.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : te.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: N,
              onClear: te.clear,
              hero: {
                label: ye,
                onClick: () => {
                  te.commit(), ut(!1);
                },
                disabled: te.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) })
  ] });
}
function dh({
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
  header: L,
  itemLabel: $,
  trigger: N,
  minItems: k = 1,
  itemRender: R,
  morph: j = !0,
  contentClassName: I
}) {
  const M = Fr(), J = Mi(), [E, A] = oe(null), [B, V] = oe(""), X = w(B);
  X.current = B;
  const T = w(null), _ = w(null), [v, ge] = oe(null), me = Q((q) => {
    _.current = q, ge(q);
  }, []), ue = Xo({
    open: n,
    scroller: () => _.current,
    row: () => {
      var q;
      return ((q = _.current) == null ? void 0 : q.querySelector('[data-active="1"]')) ?? null;
    }
  });
  ie(() => {
    if (!n) return;
    const q = (re) => {
      var Ee, te;
      const he = re.target;
      if (he && he.closest("input, textarea, [contenteditable]")) {
        E && he === T.current && (re.key === "Enter" ? (re.preventDefault(), re.stopImmediatePropagation(), le()) : re.key === "Escape" && (re.preventDefault(), re.stopImmediatePropagation(), ee()));
        return;
      }
      const K = (Ee = _.current) == null ? void 0 : Ee.closest(".ui-menu");
      if (!K || !K.contains(re.target)) return;
      const F = K.ownerDocument, Le = [...K.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ne = [...K.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], tt = [...Le, ...Ne];
      if (re.key === "ArrowDown" || re.key === "ArrowUp") {
        re.preventDefault(), re.stopImmediatePropagation();
        const Re = F.activeElement;
        let ye = Re ? tt.indexOf(Re) : -1;
        if (ye < 0 && Re) {
          const Be = Re.closest("[data-im-row]"), Ue = Be == null ? void 0 : Be.querySelector('[role="menuitem"]:first-child');
          Ue && (ye = Le.indexOf(Ue));
        }
        const Oe = re.key === "ArrowDown" ? 1 : -1, xe = ye < 0 ? Oe === 1 ? 0 : tt.length - 1 : (ye + Oe + tt.length) % tt.length, Ce = tt[xe];
        Ce == null || Ce.focus({ preventScroll: !0 }), dn((Ce == null ? void 0 : Ce.closest("[data-im-row]")) ?? Ce, "nearest", _.current);
        return;
      }
      if (re.key === "ArrowLeft" || re.key === "ArrowRight") {
        const Re = F.activeElement, ye = Re == null ? void 0 : Re.closest("[data-im-row]");
        if (!ye) return;
        re.preventDefault(), re.stopImmediatePropagation();
        const Oe = [...ye.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Oe.length === 0) return;
        const xe = Re && ye.contains(Re) ? Oe.indexOf(Re) : -1, Ce = re.key === "ArrowRight" ? 1 : -1, Be = xe < 0 ? 0 : (xe + Ce + Oe.length) % Oe.length;
        (te = Oe[Be]) == null || te.focus({ preventScroll: !0 });
        return;
      }
    }, we = (v == null ? void 0 : v.ownerDocument) ?? null;
    return we == null || we.addEventListener("keydown", q, { capture: !0 }), () => we == null ? void 0 : we.removeEventListener("keydown", q, { capture: !0 });
  }, [n, E, v]), ie(() => {
    if (!E) return;
    const q = t.find((K) => K.id === E);
    q && !B && V(q.name);
    const we = requestAnimationFrame(() => {
      const K = T.current;
      K && (K.focus(), K.select());
    });
    let re = 0;
    const he = window.setInterval(() => {
      const K = T.current;
      if (re++, !K || re > 12) {
        clearInterval(he);
        return;
      }
      K.ownerDocument.activeElement !== K && (K.focus(), K.select());
    }, 50);
    return () => {
      cancelAnimationFrame(we), clearInterval(he);
    };
  }, [E]), ie(() => {
    if (E) {
      const q = t.find((we) => we.id === E);
      q && !B && V(q.name);
    }
  }, [E, t]);
  const P = (q, we) => {
    A(q), V(we);
  }, le = () => {
    E && X.current.trim() && o(E, X.current.trim()), A(null);
  }, ee = () => {
    A(null);
  }, se = $ || L.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ C(_r, { open: n, onOpenChange: (q) => {
    q ? (A(null), V("")) : (E && B.trim() && o(E, B.trim()), A(null), V("")), (!q || !m) && e(q);
  }, width: "w-80", theme: g, align: b, trigger: N, morph: j, contentClassName: I, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${M.headerText}`, children: L }),
    /* @__PURE__ */ h("div", { ref: me, "data-im-list": !0, onPointerEnter: ue.engage, onPointerDown: ue.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((q) => {
      const we = q.id === r, re = E === q.id;
      return /* @__PURE__ */ h("div", { "data-im-row": q.id, "data-active": we ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${we || re ? M.rowActiveBg : M.rowHoverBg} ${E && !re ? "opacity-40 pointer-events-none" : ""}`, children: re ? /* @__PURE__ */ C(Ze, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: T,
            autoFocus: !0,
            value: B,
            onChange: (he) => V(he.target.value),
            onKeyDown: (he) => {
              he.key === "Enter" && (he.preventDefault(), he.stopPropagation(), le()), he.key === "Escape" && (he.preventDefault(), he.stopPropagation(), ee());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: J
          }
        ) }),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${M.editConfirm}`,
            onSelect: (he) => {
              he.preventDefault(), le();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(Zn, { className: M.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${M.editCancel}`,
            onSelect: (he) => {
              he.preventDefault(), ee();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(bn, { className: M.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ C(Ze, { children: [
        /* @__PURE__ */ h(
          De.Item,
          {
            style: J,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${M.rowText} ${we ? "" : M.rowTextHover}`,
            onSelect: p ? () => {
              i(q.id);
            } : (he) => {
              he.preventDefault(), i(q.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${we ? M.rowActiveText : ""}`, children: R ? R(q) : q.name })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${we ? M.btnActive : M.btnBase}`,
            onSelect: (he) => {
              he.preventDefault(), P(q.id, q.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Rl, { className: M.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${we ? M.btnActive : M.btnBase}`,
            onSelect: (he) => {
              he.preventDefault();
              const K = s(q.id);
              K && P(K, `${q.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Do, { className: M.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          De.Item,
          {
            className: `shrink-0 ${M.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= k ? M.btnDisabled : we ? M.btnDangerActive : M.btnDanger}`,
            onSelect: (he) => {
              he.preventDefault(), l(q.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= k,
            children: /* @__PURE__ */ h(li, { className: M.btnIcon })
          }
        )
      ] }) }, q.id);
    }) }),
    /* @__PURE__ */ C("div", { className: `shrink-0 ${E ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ C(Ze, { children: [
        /* @__PURE__ */ h(De.Separator, { className: M.separator }),
        /* @__PURE__ */ C(
          De.Item,
          {
            className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
            onSelect: (q) => {
              q.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(Po, { className: `${M.btnIcon} ${M.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(De.Separator, { className: M.separator }),
      c && /* @__PURE__ */ C(
        De.Item,
        {
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault();
            const we = c();
            we && P(we, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(Pr, { className: `${M.btnIcon} ${M.icon}` }),
            "New ",
            se
          ]
        }
      ),
      a && /* @__PURE__ */ C(
        De.Item,
        {
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${M.btnIcon} ${M.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${M.btnIcon} ${M.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${M.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${M.itemDefault} ui-row`,
          onSelect: (q) => {
            q.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(li, { className: `${M.btnIcon} ${M.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function $c({
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
  ts();
  const f = Fr(), p = Mi(), m = ns(), g = w(!1), b = w(null), x = wc(), L = !!x && d !== void 0, $ = x && d !== void 0 ? x.isSelected(d) : l, N = t || (x && d !== void 0 ? !x.canToggle(d) : !1), { myIndex: k, highlighted: R, setPointer: j, api: I } = ls({
    label: () => rs(o),
    activate: () => {
      N || (x && d !== void 0 ? x.toggle(d) : n());
    },
    disabled: N,
    group: u,
    itemId: d
  }), { query: M } = Rc(), J = M.trim() !== "" && k < 0, E = Ic(), A = u == null ? void 0 : u.trim(), B = !!A && k >= 0 && (k === 0 || ((_ = I == null ? void 0 : I.items[k - 1]) == null ? void 0 : _.group) !== A), V = A && x ? ((I == null ? void 0 : I.items) ?? []).filter((v) => v.group === A && v.itemId).map((v) => v.itemId).filter((v) => !x.isDisabled(v)) : [], X = x && V.length > 0 ? x.groupState(V) : "none", T = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ C(Ze, { children: [
    B && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": A,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && V.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && V.length > 0 ? /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${A}`,
              onMouseDown: (v) => v.preventDefault(),
              onClick: () => x.toggleGroup(V),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Tr,
                {
                  checked: X === "all",
                  indeterminate: X === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: A })
        ] }) : A
      }
    ),
    /* @__PURE__ */ C(
      De.Item,
      {
        ref: b,
        id: E && k >= 0 ? `${E}-opt-${k}` : void 0,
        "data-ei": k >= 0 ? k : void 0,
        ...L ? { role: "menuitemcheckbox", "aria-checked": $ } : {},
        style: { ...p, display: J ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${T} ${L ? "" : l ? "ui-item-selected" : ""} ${R ? "ui-item-highlighted" : ""} ${N ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (v) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (L) {
            v.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && v.preventDefault(), n();
        },
        onPointerEnter: () => {
          j(k);
        },
        onTouchStart: () => {
        },
        disabled: N,
        children: [
          L && /* @__PURE__ */ h(Tr, { checked: $, disabled: N, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (v) => {
                v.stopPropagation(), v.preventDefault(), g.current = !0, c.onClick();
              },
              onClick: (v) => {
                v.stopPropagation(), v.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function zc({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = tn(Ri), f = l.includes(n), p = l[l.length - 1] === n, m = ts(), g = Fn(), b = w(null), x = w(null), [L, $] = oe(f), N = !f && L;
  ie(() => {
    f && $(!0);
  }, [f]);
  const k = () => c((ee) => {
    const se = ee.indexOf(n);
    return se >= 0 ? ee.slice(0, se) : ee;
  }), R = Hr(), j = Ii(), I = w(j);
  I.current = j;
  const M = w(null);
  ie(() => {
    var se;
    const ee = {
      label: e,
      activate: () => {
        d(n), c((q) => q.includes(n) ? q : [...q, n]);
      },
      submenu: !0
    };
    return M.current = ee, (se = I.current) == null ? void 0 : se.register(ee);
  }, []);
  const J = j && M.current ? j.items.indexOf(M.current) : -1, E = J >= 0 && J === j.highlightedIndex, A = Q(() => {
    const ee = b.current;
    if (!ee) return null;
    const se = ee.getBoundingClientRect();
    return { left: se.left, top: se.top, width: se.width, height: se.height };
  }, []), B = Br({
    visible: f,
    morph: a,
    anchor: A,
    onClosed: () => $(!1)
  }), V = w(() => {
  }), X = w(() => {
  }), T = w(() => {
  });
  Ai(f && p, R, V, {
    onCloseSub: () => {
      k(), j && J >= 0 && j.setHighlighted(J, "keyboard");
    }
  });
  const _ = w(u);
  _.current = u, ie(() => {
    f && (_.current === n ? (R.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var ee;
      return (ee = x.current) == null ? void 0 : ee.focus();
    }), d(null)) : R.setHighlighted(-1, "keyboard"));
  }, [f]), zi(f, X), $i(f, R, V, x, !p, T), rt.useLayoutEffect(() => {
    var se;
    if (!f || R.highlightedIndex < 0 || R.pointerDriven) return;
    const ee = (se = x.current) == null ? void 0 : se.querySelector(`[data-ei="${R.highlightedIndex}"]`);
    dn(ee, "nearest", x.current);
  }, [f, R.highlightedIndex, R.pointerDriven]);
  const v = w(null), ge = Q((ee) => {
    var se;
    if (ee) {
      ee.addEventListener("keydown", V.current, { capture: !0 }), ee.addEventListener("wheel", X.current, { passive: !1 });
      const q = ee.ownerDocument;
      v.current = q, q.addEventListener("keydown", T.current, { capture: !0 });
    } else
      (se = v.current) == null || se.removeEventListener("keydown", T.current, { capture: !0 }), v.current = null;
    x.current = ee, B(ee);
  }, [B]), me = He(), ue = { padding: `${O(8, 12, me)}px ${O(12, 16, me)}px`, fontSize: O(12, 14, me) }, P = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${E ? " ui-item-highlighted" : ""}${N ? " ui-sub-closing" : ""}`, le = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ C(De.Sub, { open: f || L, onOpenChange: (ee) => c((se) => {
    if (!ee) {
      const q = se.indexOf(n);
      return q >= 0 ? se.slice(0, q) : se;
    }
    return se.includes(n) ? se : [...se, n];
  }), children: [
    /* @__PURE__ */ C(
      De.SubTrigger,
      {
        ref: b,
        "data-ei": J >= 0 ? J : void 0,
        style: ue,
        className: P,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          j && J >= 0 && j.setHighlighted(J, "pointer");
        },
        onPointerDown: (ee) => {
          ee.pointerType === "pen" && (ee.preventDefault(), c((se) => f ? se.slice(0, se.indexOf(n)) : [...se, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Sr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Sr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ h(De.Portal, { container: g ?? void 0, children: /* @__PURE__ */ h(
      De.SubContent,
      {
        ref: ge,
        "data-theme": m,
        className: le,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: R.pointerLeave,
        children: /* @__PURE__ */ h(nr.Provider, { value: R, children: o })
      }
    ) })
  ] });
}
const _n = 8, fh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Ut(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? Uo(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = He(), f = O(12, 14, d), p = w(null), m = er(), [g, b] = oe(!1), [x, L] = oe([]), [$, N] = oe(null), k = Hr();
  ie(() => {
    if (n)
      return k.setHighlighted(-1, "keyboard"), Vo(r);
  }, [n, r]);
  const R = w({ left: e, top: t });
  n && (R.current = { left: e, top: t });
  const j = Q(() => ({ left: R.current.left, top: R.current.top, width: 0, height: 0 }), []), I = Br({
    visible: !0,
    morph: l,
    anchor: j,
    cloneOnUnmount: !0
  }), M = w(() => {
  }), J = w(() => {
  }), E = w(() => {
  });
  Ai(n, k, M), vt(() => {
    if (!n || k.highlightedIndex < 0 || k.pointerDriven) return;
    const T = p.current;
    dn(
      T == null ? void 0 : T.querySelector(`[data-ei="${k.highlightedIndex}"]`),
      "nearest",
      T
    );
  }, [n, k.highlightedIndex, k.pointerDriven]), zi(n, J), $i(n, k, M, p, x.length > 0, E);
  const A = w(null), B = Q((T) => {
    var _;
    if (T) {
      T.addEventListener("keydown", M.current, { capture: !0 }), T.addEventListener("wheel", J.current, { passive: !1 });
      const v = T.ownerDocument;
      A.current = v, v.addEventListener("keydown", E.current, { capture: !0 });
    } else
      (_ = A.current) == null || _.removeEventListener("keydown", E.current, { capture: !0 }), A.current = null;
    p.current = T, b(!!T), I(T);
  }, [I]), [V, X] = oe(null);
  return vt(() => {
    var q;
    if (!n || !g || !p.current) return;
    const T = p.current, _ = T.offsetWidth, v = T.offsetHeight, ge = (q = o == null ? void 0 : o.current) == null ? void 0 : q.getBoundingClientRect(), me = ge ? ge.right : (m == null ? void 0 : m.innerWidth) ?? 0, ue = ge ? ge.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, P = ge ? ge.left : 0, le = ge ? ge.top : 0;
    let ee = Math.max(le + _n, R.current.top), se = Math.max(P + _n, R.current.left);
    se + _ > me && (se = me - _ - _n), ee + v > ue && (ee = Math.max(le + _n, ue - v - _n)), X({ left: se, top: ee });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ C(De.Root, { open: n, onOpenChange: (T) => {
    T || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(De.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(De.Portal, { children: /* @__PURE__ */ h(Ei.Provider, { value: u, children: /* @__PURE__ */ h(Ri.Provider, { value: { chain: x, setChain: L, morph: l, keyboardOpened: $, setKeyboardOpened: N }, children: /* @__PURE__ */ h(nr.Provider, { value: k, children: /* @__PURE__ */ h(
      De.Content,
      {
        ref: B,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (V == null ? void 0 : V.left) ?? R.current.left, top: (V == null ? void 0 : V.top) ?? R.current.top, touchAction: "manipulation" },
        onPointerLeave: k.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, hh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = He(), c = { padding: `${O(8, 12, l)}px ${O(12, 16, l)}px`, fontSize: O(12, 14, l) }, a = Ii(), u = w(a);
  u.current = a;
  const d = w(null);
  ie(() => {
    var g;
    const m = { label: rs(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
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
}, ph = () => /* @__PURE__ */ h(De.Separator, { className: "ui-sep my-1" }), mh = (n) => /* @__PURE__ */ h(zc, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Ie = 8, cs = "[data-modal-stack]", Qt = 220, Vn = "cubic-bezier(0.32, 0.72, 0, 1)", br = 0.94;
function En() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function as(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function no(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = as(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Qt}ms ${Vn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, Qt + 80));
    });
  });
}
function Dc(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${br})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Qt}ms ${Vn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Qt + 60));
    });
  });
}
function ro(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - br, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * br, height: i.height * br };
  e.style.transition = `transform ${Qt}ms ${Vn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = as(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, Qt + 60);
}
function Xr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(cs) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function ar(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(cs) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Pc({
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
  const g = Ut(), b = Ni(
    { mode: f, accent: m, surface: p, context: "surface" },
    g
  ), x = b.mode, L = b.surface, $ = b.accent, N = w(null), k = w(null), R = w(null), j = He(), I = O(20, 24, j), M = O(10, 12, j), J = O(12, 14, j), E = O(14, 16, j), A = O(20, 24, j), B = O(20, 24, j), V = O(20, 24, j), X = O(14, 16, j), T = O(16, 20, j), _ = O(10, 12, j), v = O(12, 14, j), ge = O(8, 10, j), me = O(4, 6, j), ue = { padding: `${M}px ${I}px` }, P = { fontSize: J }, le = { padding: `${B}px ${A}px 16px ${A}px` }, ee = { fontSize: E }, se = { padding: `0 ${A}px 16px` }, q = { padding: `${V}px ${A}px` }, we = { fontSize: _, padding: `${me}px ${ge}px` }, [re, he] = oe(!1), K = Q((S) => {
    N.current = S, he(S !== null);
  }, []), F = Fn(), Le = er(), Ne = w(Le);
  Ne.current = Le;
  const [tt, Ee] = oe(null), te = w(null), Re = w(!1), ye = w(!1), Oe = w(0), xe = w({ w: 0, h: 0 }), Ce = w(!1), [Be, Ue] = oe(!1), [mt, St] = oe(!1), yt = w(0), ze = w(!1), [Xe, at] = oe(!1), Ct = w(c);
  Ct.current = c;
  const Pt = w(!1), st = w(!1), ut = () => {
    st.current = !0, Ue(!0);
  }, Nt = () => {
    st.current = !1, Ue(!1);
  };
  ie(() => {
    n || (Ee(null), Ce.current = !1, Re.current = !1, St(!1));
  }, [n]), vt(() => {
    if (!n || Ce.current || !re || !N.current) return;
    Ce.current = !0;
    const S = N.current.getBoundingClientRect(), U = Ne.current ?? null, G = (U == null ? void 0 : U.innerWidth) ?? 0, fe = ln(U);
    Ee({
      left: Math.max(Ie, Math.min((G - S.width) / 2, G - S.width - Ie)),
      top: Math.max(fe.top + Ie, Math.min(fe.top + (fe.height - S.height) / 2, fe.bottom - S.height - Ie))
    });
  }, [n, re]), vt(() => {
    if (!n || !re || !c || En() || !N.current) return;
    const S = N.current, U = Xr(S), G = U[U.length - 1];
    ut(), G ? no(yt, S, G.getBoundingClientRect(), Nt) : Dc(yt, S, Nt);
  }, [n, re]);
  const lt = Q(() => {
    if (!u || ze.current) return;
    const S = N.current, U = !!S && Xr(S).length > 0;
    if (!S || !c || En() || U) {
      e();
      return;
    }
    ze.current = !0, at(!0), Pt.current = !0, ut(), ro(yt, S, () => {
      ze.current = !1, at(!1), Nt(), e();
    });
  }, [c, e, u]), xt = Q(() => {
    const S = N.current;
    if (!S || Pt.current || !Ct.current || En() || Xr(S).length > 0) return;
    const U = S.ownerDocument, G = S.cloneNode(!0);
    G.removeAttribute("data-modal-stack"), G.removeAttribute("data-state"), G.removeAttribute("role"), G.removeAttribute("data-aria-hidden"), G.removeAttribute("tabindex"), G.setAttribute("aria-hidden", "true"), G.style.pointerEvents = "none", U.body.appendChild(G), ro({ current: 0 }, G, () => {
      G.isConnected && G.remove();
    });
  }, []);
  vt(() => () => xt(), [xt]);
  const Ge = w(n);
  vt(() => {
    const S = Ge.current;
    Ge.current = n, S && !n && xt();
  }, [n, re, xt]), ie(() => {
    if (!n || !re || !c || !N.current) return;
    const S = N.current, U = S.parentNode;
    if (!U) return;
    let G = 0, fe = null, Se = !1;
    const Te = () => {
      G = 0;
      const be = ar(S);
      if (be.length > 0)
        S.style.opacity = "", S.style.pointerEvents = "", fe = be[be.length - 1].getBoundingClientRect(), Se = !0, G = requestAnimationFrame(Te);
      else if (Se) {
        Se = !1, fe && !En() && (ut(), no(yt, S, fe, Nt)), fe = null;
        const Ke = Ne.current ?? null;
        Ke == null || Ke.setTimeout(() => {
          !S || !S.isConnected || getComputedStyle(S).opacity !== "1" && (S.style.opacity = "1", S.style.pointerEvents = "");
        }, 240);
      }
    }, Pe = new MutationObserver(() => {
      !G && ar(S).length > 0 && (G = requestAnimationFrame(Te));
    });
    return Pe.observe(U, { childList: !0 }), () => {
      Pe.disconnect(), G && cancelAnimationFrame(G);
    };
  }, [n, re]), ie(() => {
    if (!re || !c || En() || !N.current) return;
    const S = N.current;
    let U = Math.round(S.getBoundingClientRect().height), G = !1;
    const fe = new ResizeObserver(() => {
      if (!S.isConnected) return;
      const Se = Math.round(S.getBoundingClientRect().height);
      if (!G) {
        G = !0, U = Se;
        return;
      }
      if (Math.abs(Se - U) < 1) return;
      if (te.current || ze.current || ar(S).length > 0) {
        U = Se;
        return;
      }
      if (st.current) return;
      const Te = U;
      U = Se, ut();
      const Pe = S.getBoundingClientRect(), be = ln(Ne.current ?? null), Ke = !Re.current && !ye.current, Ot = Ke ? be.top + (be.height - Te) / 2 : Pe.top, Tt = Ke ? be.top + (be.height - Se) / 2 : Pe.top;
      S.style.transition = "none", S.style.height = `${Te}px`, Ke && (S.style.top = `${Ot}px`), k.current && (k.current.style.overflow = "hidden"), S.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          S.style.height === `${Te}px` && (S.style.transition = `height ${Qt}ms ${Vn}${Ke ? `, top ${Qt}ms ${Vn}` : ""}`, S.style.height = `${Se}px`, Ke && (S.style.top = `${Tt}px`), window.setTimeout(() => {
            S.style.height === `${Se}px` && (S.style.transition = "", S.style.height = "", k.current && (k.current.style.overflow = ""), Ke && Ee({ left: Pe.left, top: Tt }), Nt());
          }, Qt + 60));
        });
      });
    });
    return fe.observe(S), () => fe.disconnect();
  }, [re]), ie(() => {
    if (!re || !N.current || c && !En()) return;
    const S = N.current, U = new ResizeObserver(() => {
      if (!S.isConnected || te.current || ze.current || ye.current || ar(S).length > 0) return;
      const G = Ne.current ?? null, fe = ln(G), Se = (G == null ? void 0 : G.innerWidth) ?? 0, Te = S.getBoundingClientRect(), Pe = Math.max(fe.top + Ie, Math.min(Te.top, fe.bottom - Te.height - Ie)), be = Math.max(Ie, Math.min(Te.left, Se - Te.width - Ie));
      (Math.abs(Pe - Te.top) > 0.5 || Math.abs(be - Te.left) > 0.5) && Ee({ left: be, top: Pe });
    });
    return U.observe(S), () => U.disconnect();
  }, [re, c]);
  const Fe = Q(() => {
    const S = N.current;
    if (!S) return null;
    const U = S.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), qe = Q((S, U) => {
    const G = Ne.current ?? null, fe = (G == null ? void 0 : G.innerWidth) ?? 0, Se = ln(G), Te = Fe(), Pe = Te ? Te.width : Math.min(fe - Ie * 2, 576), be = Te ? Te.height : Math.min(Se.height - Ie * 2, 400);
    return {
      left: Math.max(Ie, Math.min(S, fe - Pe - Ie)),
      top: Math.max(Se.top + Ie, Math.min(U, Se.bottom - be - Ie))
    };
  }, [Fe]);
  ie(() => {
    if (!n) return;
    const S = Ne.current ?? null, U = (S == null ? void 0 : S.visualViewport) ?? null;
    if (!S || !U) return;
    const G = 120;
    ye.current = !1, xe.current = { w: S.innerWidth, h: S.innerHeight };
    let fe = 0;
    const Se = () => {
      if (ze.current || te.current) return;
      const Pe = (S == null ? void 0 : S.innerHeight) ?? 0, be = (S == null ? void 0 : S.innerWidth) ?? 0, Ot = ln(S).height < Pe - G, Tt = Pe < xe.current.h - G && be === xe.current.w;
      Ot || Tt ? (ye.current = !0, Oe.current && (clearTimeout(Oe.current), Oe.current = 0)) : Oe.current || (Oe.current = (S == null ? void 0 : S.setTimeout(() => {
        ye.current = !1, Oe.current = 0, St(!1);
      }, 600)) ?? 0), St(ye.current), !fe && (fe = requestAnimationFrame(() => {
        var rn;
        fe = 0;
        const $e = N.current;
        if (!$e) return;
        const $t = ln(Ne.current ?? null), Mt = $e.getBoundingClientRect(), nt = ((rn = Ne.current) == null ? void 0 : rn.innerWidth) ?? 0, Je = (S == null ? void 0 : S.innerHeight) ?? 0, Rt = $t.height < Je - G || Je < xe.current.h - G && (S == null ? void 0 : S.innerWidth) === xe.current.w;
        xe.current = { w: (S == null ? void 0 : S.innerWidth) ?? 0, h: Je };
        const ht = Mt.top >= $t.top + Ie && Mt.bottom <= $t.bottom - Ie, Bt = () => {
          Ee({
            left: Math.max(Ie, Math.min((nt - Mt.width) / 2, nt - Mt.width - Ie)),
            top: Math.max($t.top + Ie, Math.min($t.top + ($t.height - Mt.height) / 2, $t.bottom - Mt.height - Ie))
          });
        };
        if (Rt && !et) {
          if (Re.current) {
            ht || Ee(qe(Mt.left, Mt.top));
            return;
          }
          if (ht) return;
          Bt();
          return;
        }
        if (!ye.current) {
          if (Re.current) {
            ht || Ee(qe(Mt.left, Mt.top));
            return;
          }
          ht || Bt();
        }
      }));
    };
    U.addEventListener("resize", Se), U.addEventListener("scroll", Se);
    const Te = () => {
      ze.current || te.current || fe || (fe = requestAnimationFrame(() => {
        fe = 0;
        const Pe = N.current;
        if (!Pe) return;
        const be = Ne.current ?? null, Ke = ln(be), Ot = (be == null ? void 0 : be.innerWidth) ?? 0, Tt = Pe.getBoundingClientRect();
        if (Re.current) {
          Ee(qe(Tt.left, Tt.top));
          return;
        }
        Ee({
          left: Math.max(Ie, Math.min((Ot - Tt.width) / 2, Ot - Tt.width - Ie)),
          top: Math.max(Ke.top + Ie, Math.min(Ke.top + (Ke.height - Tt.height) / 2, Ke.bottom - Tt.height - Ie))
        });
      }));
    };
    return S.addEventListener("orientationchange", Te), () => {
      U.removeEventListener("resize", Se), U.removeEventListener("scroll", Se), S.removeEventListener("orientationchange", Te), fe && cancelAnimationFrame(fe), Oe.current && clearTimeout(Oe.current);
    };
  }, [n, qe]);
  const _e = Q((S) => {
    if (S.target.closest("button")) return;
    Re.current = !0;
    const U = Fe();
    U && (Ee(qe(U.left, U.top)), te.current = { startX: S.clientX, startY: S.clientY, posX: U.left, posY: U.top }, S.target.setPointerCapture(S.pointerId));
  }, [Fe, qe]), Xt = Q((S) => {
    const U = te.current;
    U && (S.preventDefault(), Ee(qe(U.posX + S.clientX - U.startX, U.posY + S.clientY - U.startY)));
  }, [qe]), Lt = Q(() => {
    te.current = null;
  }, []), dt = te.current !== null, Et = Q(() => {
    Re.current = !1;
    const S = Ne.current ?? null, U = ln(S), G = (S == null ? void 0 : S.innerWidth) ?? 0, fe = N.current, Se = fe ? fe.getBoundingClientRect() : { width: 0, height: 0 };
    Ee({
      left: Math.max(Ie, Math.min((G - Se.width) / 2, G - Se.width - Ie)),
      top: Math.max(U.top + Ie, Math.min(U.top + (U.height - Se.height) / 2, U.bottom - Se.height - Ie))
    });
  }, []), z = w(0), Y = Q(() => {
    const S = Date.now();
    S - z.current < 300 ? (z.current = 0, Et()) : z.current = S;
  }, [Et]), ce = tt !== null, Ae = ce ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ve = `${i ? `${i} w-full` : "max-w-xl w-full"}`, ft = {
    ...ce ? { left: tt.left, top: tt.top } : {},
    width: `min(100%, calc(100dvw - ${Ie * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...mt ? {} : { maxHeight: `calc(100dvh - ${Ie * 2}px)` }
  }, At = Q((S) => {
    if (S.key !== "Enter" || S.shiftKey || S.metaKey || S.ctrlKey || S.altKey) return;
    const U = S.target, G = R.current;
    if (!(!!U.closest("[data-modal-close]") || !!G && G.contains(U) && !!U.closest('button, a, [role="button"]')) && U.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !G) return;
    const Se = Array.from(G.querySelectorAll("button[data-modal-confirm]")), Te = Se.length > 0 ? Se : Array.from(G.querySelectorAll("button")), Pe = Te[Te.length - 1];
    !Pe || Pe.disabled || (S.preventDefault(), Pe.click());
  }, []);
  return /* @__PURE__ */ h(Ti, { theme: b, children: /* @__PURE__ */ h(sn.Root, { open: n, onOpenChange: (S) => {
    S || lt();
  }, children: /* @__PURE__ */ C(sn.Portal, { container: F ?? void 0, children: [
    /* @__PURE__ */ h(
      sn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Xe ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (S) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (S.preventDefault(), d && lt());
        }
      }
    ),
    /* @__PURE__ */ C(
      sn.Content,
      {
        ref: K,
        onKeyDown: At,
        onInteractOutside: (S) => {
          d || S.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": $,
        "data-surface": L,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ae} ${ve}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(ft).length > 0 ? ft : {} },
        children: [
          a ? /* @__PURE__ */ C(
            "div",
            {
              style: le,
              className: `flex items-center justify-between ${dt ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Be || _e(S);
              },
              onPointerMove: Xt,
              onPointerUp: Lt,
              onClick: Y,
              children: [
                /* @__PURE__ */ h(sn.Title, { style: ee, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(sn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(bn, { style: { width: T, height: T } }) })
              ]
            }
          ) : /* @__PURE__ */ C(
            "div",
            {
              style: ue,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${dt ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Be || _e(S);
              },
              onPointerMove: Xt,
              onPointerUp: Lt,
              onClick: Y,
              children: [
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(sn.Title, { style: P, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ C("button", { onClick: l, style: we, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(Po, { style: { width: v, height: v } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(sn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(bn, { style: { width: X, height: X } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: k, "data-testid": "modal-body", style: a ? se : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: R, style: a ? q : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function gh({ children: n }) {
  const e = He(), t = O(20, 24, e), r = O(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Lc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Oc = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Bc = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function ur({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = un({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ h(
    "button",
    {
      type: r,
      style: o,
      className: `${Lc} ${n === "hero" ? Oc[e] : Bc[n]} ${t}`,
      ...i
    }
  );
}
function Cr(n = "md") {
  const e = et && Fo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function us(n = "md") {
  return n === "sm" ? un({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : un({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const ds = en(null);
function yh() {
  const n = tn(ds);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function xh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = oe(null), [s, l] = oe(!1), c = w(null), a = He(), u = O(16, 20, a), d = O(12, 14, a), f = us(), p = w(i);
  p.current = i;
  const m = Q(() => {
    const k = p.current;
    k && (k.kind === "confirm" ? k.resolve(!1) : k.kind === "prompt" ? k.resolve(null) : k.resolve());
  }, []), g = Q((k) => {
    if (k.suppressKey) {
      const R = localStorage.getItem(k.suppressKey);
      if (R && Date.now() < parseInt(R, 10))
        return Promise.resolve(!0);
    }
    return new Promise((R) => {
      m(), l(!1), o({ kind: "confirm", options: k, resolve: R });
    });
  }, [m]), b = Q((k) => new Promise((R) => {
    m(), o({ kind: "prompt", options: k, resolve: R });
  }), [m]), x = Q((k) => new Promise((R) => {
    m(), o({ kind: "alert", options: k, resolve: R });
  }), [m]);
  ie(() => {
    if (i) {
      const k = setTimeout(() => {
        var R;
        return (R = c.current) == null ? void 0 : R.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [i]);
  const L = Q(() => {
    var k, R;
    if (i) {
      if (i.kind === "confirm") {
        const j = i.options;
        j.suppressKey && s && localStorage.setItem(j.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((R = (k = c.current) == null ? void 0 : k.value) == null ? void 0 : R.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), $ = i !== null;
  ie(() => {
    if (!$) return;
    const k = (R) => {
      R.key !== "Enter" || R.shiftKey || R.metaKey || R.ctrlKey || R.altKey || R.isComposing || (R.preventDefault(), R.stopImmediatePropagation(), L());
    };
    return document.addEventListener("keydown", k, !0), () => document.removeEventListener("keydown", k, !0);
  }, [$, L]);
  const N = Q(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ C(ds.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    $ && /* @__PURE__ */ h(
      Pc,
      {
        open: !0,
        onClose: N,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ C(Ze, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(ur, { variant: "ghost", onClick: N, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(ur, { onClick: L, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            ur,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: L,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(ur, { "data-modal-confirm": !0, onClick: L, children: "Save" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            kc,
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
const Fc = 500, Hc = 250, _c = 5, Ft = 88, io = 4;
function jc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Wc({ x: n, y: e, ms: t }) {
  const r = w(null), i = Fn();
  return ie(() => {
    r.current && jc(r.current, t);
  }, [t]), Lr(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Ft / 2,
          top: e - Ft / 2,
          width: Ft,
          height: Ft,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ C("svg", { ref: r, width: Ft, height: Ft, viewBox: `0 0 ${Ft} ${Ft}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Ft / 2,
              cy: Ft / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: io + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Ft / 2,
              cy: Ft / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: io,
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
function bh() {
  return { "data-no-longpress": "true" };
}
function qc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function vh({
  children: n,
  showRing: e = !0,
  longPressMs: t = Fc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = oe(null), c = vi(), a = w(null), u = w(null), d = w({ x: 0, y: 0, target: null }), f = w(!1), p = Math.min(Hc, t * 0.5), m = w(i);
  m.current = i;
  const g = w(o);
  return g.current = o, ie(() => {
    if (!et || !c) return;
    const b = (N) => {
      if (!ci(N.pointerType) || N.button !== 0) return;
      const k = N.target;
      if (!k.closest(r) || (m.current ? !m.current(k) : qc(k))) return;
      const R = N.clientX, j = N.clientY;
      d.current = { x: R, y: j, target: N.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: R, y: j }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const I = d.current.target;
        if (!I) return;
        const M = g.current;
        if (M) {
          M(I, R, j);
          return;
        }
        const J = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: R,
          clientY: j,
          button: 2,
          view: window
        });
        I.dispatchEvent(J);
      }, t);
    }, x = (N) => {
      if (!f.current || a.current === null) return;
      const k = N.clientX - d.current.x, R = N.clientY - d.current.y;
      Math.sqrt(k * k + R * R) > _c && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, L = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, $ = (N) => {
      ci(N.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", L), c.addEventListener("pointercancel", L), c.addEventListener("pointerleave", $), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", L), c == null || c.removeEventListener("pointercancel", L), c == null || c.removeEventListener("pointerleave", $), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ C(Ze, { children: [
    n,
    e && s && /* @__PURE__ */ h(Wc, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function wh() {
  const n = ac();
  return cc ? n === null || ci(n) : !1;
}
const Kc = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, Jc = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, Vc = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function kh({
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
        ...e ? Vc : n ? Jc : Kc,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const Yc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Uc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Gr = 1900, Qr = 2100;
function Xc(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Gc(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Sh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Ut(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const K = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(K.getTime()) ? c : K;
  })(), [u, d] = oe(a.getFullYear()), [f, p] = oe(a.getMonth()), [m, g] = oe("days"), [b, x] = oe(null), L = Ve(() => new Set(n), [n]), $ = (K) => {
    L.has(K) ? e(n.filter((F) => F !== K)) : e([...n, K]);
  }, N = Ve(() => {
    const K = Xc(u, f), F = new Date(u, f, 1).getDay(), Le = [];
    for (let Ne = 0; Ne < F; Ne++) Le.push({ key: `pad-${Ne}`, day: 0, empty: !0 });
    for (let Ne = 1; Ne <= K; Ne++) Le.push({ key: Gc(u, f, Ne), day: Ne, empty: !1 });
    return Le;
  }, [u, f]), k = (K) => d((F) => Math.max(Gr, Math.min(Qr, F + K))), R = (K) => {
    f + K < 0 ? (d((F) => Math.max(Gr, F - 1)), p(11)) : f + K > 11 ? (d((F) => Math.min(Qr, F + 1)), p(0)) : p((F) => F + K);
  }, j = () => {
    if (b === null) return;
    const K = parseInt(b, 10);
    !isNaN(K) && K >= Gr && K <= Qr && d(K), x(null);
  }, I = (K) => n.some((F) => F.startsWith(`${u}-${String(K + 1).padStart(2, "0")}`)), M = He(), J = O(4, 8, M), E = O(16, 20, M), A = O(10, 11, M), B = O(6, 8, M), V = O(12, 14, M), X = O(6, 10, M), T = O(12, 14, M), _ = O(8, 12, M), v = O(10, 12, M), ge = O(6, 10, M), me = O(2, 6, M), ue = O(64, 80, M), P = { padding: J }, le = { width: E, height: E }, ee = { fontSize: A, paddingTop: B, paddingBottom: B }, se = { fontSize: V, paddingTop: X, paddingBottom: X }, q = { fontSize: T, paddingTop: _, paddingBottom: _ }, we = { fontSize: v, padding: `${me}px ${ge}px` }, re = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", he = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ C("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ C("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? k(-1) : R(-1),
          style: P,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Il, { style: le })
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
          onChange: (K) => x(K.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (K) => K.target.select(),
          onBlur: j,
          onKeyDown: (K) => {
            K.key === "Enter" && (K.preventDefault(), j()), K.key === "Escape" && x(null);
          },
          style: { width: ue },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? k(1) : R(1),
          style: P,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Sr, { style: le })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ C("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: Uc.map((K, F) => /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: () => {
            p(F), g("days");
          },
          style: q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${F === f ? re : he}`,
          children: [
            K,
            I(F) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${F === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        K
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), g("days");
          },
          style: { paddingTop: X, paddingBottom: X, fontSize: V },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ C("div", { className: "grid grid-cols-7 text-center", children: [
      Yc.map((K) => /* @__PURE__ */ h("div", { style: ee, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: K }, K)),
      N.map((K) => K.empty ? /* @__PURE__ */ h("div", {}, K.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => $(K.key),
          style: se,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${L.has(K.key) ? re : he}`,
          children: K.day
        },
        K.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ C("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ C("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map((K) => {
        const F = /* @__PURE__ */ new Date(K + "T00:00:00"), Le = F.getFullYear() === c.getFullYear() ? F.toLocaleString("default", { month: "short", day: "numeric" }) : F.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            onClick: () => $(K),
            "aria-label": `Remove ${Le}`,
            style: we,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Le,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          K
        );
      }) })
    ] })
  ] });
}
function Nh({
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
  const p = (N) => e instanceof Set ? e.has(N) : e.includes(N), m = He(), g = O(12, 16, m), b = O(8, 12, m), x = O(12, 14, m), L = O(16, 20, m), $ = r != null || i != null;
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
          n.map((N) => {
            const k = p(N.id), R = /* @__PURE__ */ h(Ci, { checked: k, size: L });
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
  const u = He(), d = s ? 10 : O(12, 16, u), f = s ? 6 : O(8, 12, u), p = s ? 12 : O(12, 14, u), m = s ? 14 : O(16, 20, u);
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
const Ch = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = er(), { refs: l, floatingStyles: c } = _l({
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
          var L;
          if (i !== "visible") return {};
          const u = (L = a.elements.floating.ownerDocument) == null ? void 0 : L.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || g <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? p - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + x };
        }
      },
      Lo(o),
      Oo({ padding: 8 }),
      Bo({ padding: 8 }),
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
    whileElementsMounted: jl
  });
  return vt(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ C(Ze, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Lr(
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
function Qc(n, e) {
  if (!e || !rt.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Mn = ({ content: n, children: e }) => {
  const t = Ut(), r = He(), i = O(10, 12, r), o = O(6, 6, r), s = O(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Fn(), a = er(), [u, d] = oe(!1), [f, p] = oe({ x: 0, y: 0 }), m = w(null), g = w(null), b = () => {
    if (!m.current) return;
    const $ = m.current.getBoundingClientRect();
    p({ x: $.left + $.width / 2, y: $.top });
  };
  ie(() => () => {
    g.current && clearTimeout(g.current);
  }, []), ie(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]);
  const x = Qc(e, n), L = Object.keys(x).length > 0 ? rt.cloneElement(e, x) : e;
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
        L,
        u && Lr(
          /* @__PURE__ */ C(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map(($, N) => /* @__PURE__ */ h("div", { className: N > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: $ }, N)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, Zc = 250;
function ea(n, e, t) {
  const [r, i] = rt.useState(null), [o, s] = rt.useState(!1), l = rt.useRef(null), c = rt.useRef(t);
  c.current = t;
  const a = rt.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  rt.useLayoutEffect(() => {
    a();
  }, [t, a]), rt.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Zc), a();
    }, p = new ResizeObserver(f);
    p.observe(d);
    for (const m of e.current ?? []) m && p.observe(m);
    return () => {
      p.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, a]);
  const u = rt.useMemo(
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
function jr() {
  const n = He(), e = et, t = e ? O(28, 40, n) : 28, r = e ? O(28, 40, n) : 28, i = e ? O(10, 14, n) : 10, o = e ? O(10, 14, n) : 10, s = e ? O(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Eh = et ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", ta = et ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", dr = et ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", na = "hover:bg-red-950/50", Mh = et ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Rh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Ih = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ra = et ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Ah = et ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", fs = et ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", ia = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", oa = et ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", fr = ({ onClick: n, disabled: e, title: t, className: r = ta, children: i }) => {
  const o = jr();
  return /* @__PURE__ */ h(Mn, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, hr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, $h = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, ariaLabel: u }) => {
  const d = Ut(), f = c ?? mc(d), p = c === "blue" || c === "emerald" ? c : (d == null ? void 0 : d.accent) ?? "zinc", m = { "data-mode": f === "dark" ? "dark" : "light", "data-accent": p }, g = jr(), b = s && !et ? 24 : g.control.height, x = un({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), L = et ? x : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, $ = (I) => i ? i(I) : n === I, N = rt.useRef(null), k = rt.useRef([]), R = Math.max(0, e.findIndex((I) => $(I.v))), j = ea(N, k, R);
  return l === "track" ? /* @__PURE__ */ C(
    "div",
    {
      ref: N,
      role: a ? "tablist" : "group",
      "aria-label": u,
      ...m,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${hr.wrap}`,
      children: [
        j.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${hr.pill} ${j.motionClass}`,
            style: { ...j.style, top: 2, bottom: 2 }
          }
        ),
        e.map((I, M) => {
          const J = $(I.v);
          return /* @__PURE__ */ C(
            "button",
            {
              ref: (E) => {
                k.current[M] = E;
              },
              ...I.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(I.v),
              title: I.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? J : void 0,
              "aria-pressed": a ? void 0 : J,
              "aria-label": I.ariaLabel ?? (I.l ? void 0 : I.title),
              style: L,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? hr.active : hr.idle}`,
              children: [
                I.icon,
                I.l
              ]
            },
            I.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ C("div", { ref: N, className: `relative ${ia} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    j.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${j.motionClass}`,
        style: { ...j.style, top: 0, bottom: 0 }
      }
    ),
    e.map((I, M) => {
      const J = $(I.v);
      return /* @__PURE__ */ C(
        "button",
        {
          ref: (E) => {
            k.current[M] = E;
          },
          ...I.dataProps,
          disabled: r,
          onClick: () => t(I.v),
          title: I.title,
          style: { ...g.control, height: b },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${I.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            I.icon,
            I.l
          ]
        },
        I.v
      );
    })
  ] });
}, zh = ({ children: n }) => /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: et ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), sa = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", la = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Dh = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ C("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? sa : la, children: n }),
  e
] }), Ph = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Lh = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ C("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(fr, { onClick: () => r(-1), disabled: n, title: "Move up", className: dr, children: /* @__PURE__ */ h(Al, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(fr, { onClick: () => r(1), disabled: n, title: "Move down", className: dr, children: /* @__PURE__ */ h($l, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(fr, { onClick: e, disabled: n, title: "Duplicate", className: dr, children: /* @__PURE__ */ h(Do, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: fs }),
    /* @__PURE__ */ h(fr, { onClick: t, disabled: n, title: "Delete", className: `${dr} ${na}`, children: /* @__PURE__ */ h(li, { className: "w-2.5 h-2.5" }) })
  ] })
);
var oo = Object.defineProperty, ca = (n, e) => {
  let t = {};
  for (var r in n) oo(t, r, {
    get: n[r],
    enumerable: !0
  });
  return oo(t, Symbol.toStringTag, { value: "Module" }), t;
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
function hs(n, e, t) {
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
      return c && c < s.length && c < l.length && gs(s.charCodeAt(c - 1)) && ms(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = hs(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function ps(n, e, t, r) {
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
      return d && f && d < a.length && gs(a.charCodeAt(d - 1)) && ms(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = ps(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function ms(n) {
  return n >= 56320 && n < 57344;
}
function gs(n) {
  return n >= 55296 && n < 56320;
}
class W {
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
    return new W(i, this.size + e.size);
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
    return new W(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? W.empty : e == 0 && t == this.content.length ? this : new W(this.content.slice(e, t));
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
    return i[e] = t, new W(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new W([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new W(this.content.concat(e), this.size + e.nodeSize);
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
    return hs(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return ps(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return pr(0, e);
    if (e == this.size)
      return pr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? pr(t + 1, o) : pr(t, r);
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
      return W.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return W.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return W.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new W(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return W.empty;
    if (e instanceof W)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new W([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
W.empty = new W([], 0);
const Zr = { index: 0, offset: 0 };
function pr(n, e) {
  return Zr.index = n, Zr.offset = e, Zr;
}
function Er(n, e) {
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
      if (!Er(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Er(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let je = class di {
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
    return this == e || this.type == e.type && Er(this.attrs, e.attrs);
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
      return di.none;
    if (e instanceof di)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
je.none = [];
class Yn extends Error {
}
class ne {
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
    let r = xs(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new ne(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new ne(ys(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return ne.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new ne(W.fromJSON(e, t.content), r, i);
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
    return new ne(e, r, i);
  }
}
ne.empty = new ne(W.empty, 0, 0);
function ys(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(ys(o.content, e - i - 1, t - i - 1)));
}
function xs(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = xs(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function aa(n, e, t) {
  if (t.openStart > n.depth)
    throw new Yn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Yn("Inconsistent open depths");
  return bs(n, e, t, 0);
}
function bs(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = bs(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return yn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = ua(t, n);
      return yn(o, ws(n, s, l, e, r));
    }
  else return yn(o, Mr(n, e, r));
}
function vs(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Yn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function fi(n, e, t) {
  let r = n.node(t);
  return vs(r, e.node(t)), r;
}
function gn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function qn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (gn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    gn(i.child(l), r);
  e && e.depth == t && e.textOffset && gn(e.nodeBefore, r);
}
function yn(n, e) {
  if (!n.type.validContent(e))
    throw new Yn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function ws(n, e, t, r, i) {
  let o = n.depth > i && fi(n, e, i + 1), s = r.depth > i && fi(t, r, i + 1), l = [];
  return qn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (vs(o, s), gn(yn(o, ws(n, e, t, r, i + 1)), l)) : (o && gn(yn(o, Mr(n, e, i + 1)), l), qn(e, t, i, l), s && gn(yn(s, Mr(t, r, i + 1)), l)), qn(r, null, i, l), new W(l);
}
function Mr(n, e, t) {
  let r = [];
  if (qn(null, n, t, r), n.depth > t) {
    let i = fi(n, e, t + 1);
    gn(yn(i, Mr(n, e, t + 1)), r);
  }
  return qn(e, null, t, r), new W(r);
}
function ua(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(W.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Un {
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
      return je.none;
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
        return new Rr(this, e, r);
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
    return new Un(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = so.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      so.set(e, r = new da());
    let i = r.elts[r.i] = Un.resolve(e, t);
    return r.i = (r.i + 1) % fa, i;
  }
}
class da {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const fa = 12, so = /* @__PURE__ */ new WeakMap();
class Rr {
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
const ha = /* @__PURE__ */ Object.create(null);
let $n = class hi {
  /**
  @internal
  */
  constructor(e, t, r, i = je.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || W.empty;
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
    return this.type == e && Er(this.attrs, t || e.defaultAttrs || ha) && je.sameSet(this.marks, r || je.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new hi(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new hi(this.type, this.attrs, this.content, e);
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
      return ne.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new ne(a, i.depth - s, o.depth - s);
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
    return aa(this.resolve(e), this.resolve(t), r);
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
    return Un.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Un.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), ks(this.marks, e);
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
  canReplace(e, t, r = W.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), lo(this.type.attrs, this.attrs, "node", this.type.name);
    let e = je.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      lo(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!je.sameSet(e, this.marks))
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
    let i = W.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
$n.prototype.text = void 0;
class Ir extends $n {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : ks(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Ir(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Ir(this.type, this.attrs, e, this.marks);
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
function ks(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function lo(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class kn {
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
    let r = new pa(e, t);
    if (r.next == null)
      return kn.empty;
    let i = Ss(r);
    r.next && r.err("Unexpected trailing text");
    let o = wa(va(i));
    return ka(o, r), o;
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
        return W.from(l.map((a) => a.createAndFill()));
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
kn.empty = new kn(!0);
class pa {
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
function Ss(n) {
  let e = [];
  do
    e.push(ma(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function ma(n) {
  let e = [];
  do
    e.push(ga(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function ga(n) {
  let e = ba(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = ya(n, e);
    else
      break;
  return e;
}
function co(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function ya(n, e) {
  let t = co(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = co(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function xa(n, e) {
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
function ba(n) {
  if (n.eat("(")) {
    let e = Ss(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = xa(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function va(n) {
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
function Ns(n, e) {
  return e - n;
}
function ao(n, e) {
  let t = [];
  return r(e), t.sort(Ns);
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
function wa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(ao(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        ao(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new kn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Ns);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function ka(n, e) {
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
function Cs(n, e) {
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
function Es(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Na(n, r, e[r]);
  return t;
}
class Ar {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Es(e, r.attrs), this.defaultAttrs = Ts(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == kn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Cs(this.attrs, e);
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
    return new $n(this, this.computeAttrs(e), W.from(t), je.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = W.from(t), this.checkContent(t), new $n(this, this.computeAttrs(e), t, je.setFrom(r));
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
    if (e = this.computeAttrs(e), t = W.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(W.empty, !0);
    return o ? new $n(this, e, t.append(o), je.setFrom(r)) : null;
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
    return t ? t.length ? t : je.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Ar(o, t, s));
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
function Sa(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Na {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Sa(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Wr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Es(e, i.attrs), this.excluded = null;
    let o = Ts(this.attrs);
    this.instance = o ? new je(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new je(this, Cs(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Wr(o, i++, t, s)), r;
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
    t.nodes = gt.from(e.nodes), t.marks = gt.from(e.marks || {}), this.nodes = Ar.compile(this.spec.nodes, this), this.marks = Wr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = kn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? uo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : uo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => $n.fromJSON(this, i), this.markFromJSON = (i) => je.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Ar) {
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
    return new Ir(r, r.defaultAttrs, e, je.setFrom(t));
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
function uo(n, e) {
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
function Ca(n) {
  return n.tag != null;
}
function Ea(n) {
  return n.style != null;
}
class zn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Ca(i))
        this.tags.push(i);
      else if (Ea(i)) {
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
    let r = new ho(this, t, !1);
    return r.addAll(e, je.none, t.from, t.to), r.finish();
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
    let r = new ho(this, t, !0);
    return r.addAll(e, je.none, t.from, t.to), ne.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ia(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = po(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = po(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new zn(e, zn.schemaRules(e)));
  }
}
const Ms = {
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
}, Ma = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Rs = { ol: !0, ul: !0 }, Xn = 1, pi = 2, Kn = 4;
function fo(n, e, t) {
  return e != null ? (e ? Xn : 0) | (e === "full" ? pi : 0) : n && n.whitespace == "pre" ? Xn | pi : t & ~Kn;
}
class mr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = je.none, this.match = o || (s & Kn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(W.from(e));
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
    if (!(this.options & Xn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = W.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(W.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ms.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ho {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = fo(null, t.preserveWhitespace, 0) | (r ? Kn : 0);
    i ? o = new mr(i.type, i.attrs, je.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new mr(null, null, je.none, !0, null, s) : o = new mr(e.schema.topNodeType, null, je.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & pi ? "full" : this.localPreserveWS || (i.options & Xn) > 0, { schema: s } = this.parser;
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
    Rs.hasOwnProperty(s) && this.parser.normalizeLists && Ra(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Ma.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Ms.hasOwnProperty(s))
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
      let s = je.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : mo(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = fo(e, o, s.options);
    s.options & Kn && s.content.length == 0 && (l |= Kn);
    let c = je.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : mo(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new mr(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= Xn);
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
function Ra(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Rs.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ia(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function po(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function mo(n, e) {
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
const Is = 65535, As = Math.pow(2, 16);
function Aa(n, e) {
  return n + e * As;
}
function go(n) {
  return n & Is;
}
function $a(n) {
  return (n - (n & Is)) / As;
}
const $s = 1, zs = 2, vr = 4, Ds = 8;
class mi {
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
    return (this.delInfo & Ds) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & ($s | vr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (zs | vr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & vr) > 0;
  }
}
class Dt {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Dt.empty)
      return Dt.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = go(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + $a(e);
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
        let m = e == (t < 0 ? c : d) ? null : Aa(l / 3, e - c), g = e == c ? zs : e == d ? $s : vr;
        return (t < 0 ? e != c : e != d) && (g |= Ds), new mi(p, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new mi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = go(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Dt(this.ranges, !this.inverted);
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
    return e == 0 ? Dt.empty : new Dt(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Dt.empty = new Dt([]);
class $r {
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
    return new $r(this._maps, this.mirror, e, t);
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
    let e = new $r();
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
    return r ? e : new mi(e, i, null);
  }
}
const ei = /* @__PURE__ */ Object.create(null);
class kt {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Dt.empty;
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
    let r = ei[t.stepType];
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
    if (e in ei)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ei[e] = t, t.prototype.jsonID = e, t;
  }
}
class ot {
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
    return new ot(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ot(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return ot.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof Yn)
        return ot.fail(o.message);
      throw o;
    }
  }
}
function Di(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Di(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return W.fromArray(r);
}
class cn extends kt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ne(Di(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ot.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Jt(this.from, this.to, this.mark);
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
kt.jsonID("addMark", cn);
class Jt extends kt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new ne(Di(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ot.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new cn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Jt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Jt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Jt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Jt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
kt.jsonID("removeMark", Jt);
class an extends kt {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ot.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ot.fromReplace(e, this.pos, this.pos + 1, new ne(W.from(r), 0, t.isLeaf ? 0 : 1));
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
    return new Sn(this.pos, this.mark);
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
kt.jsonID("addNodeMark", an);
class Sn extends kt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ot.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ot.fromReplace(e, this.pos, this.pos + 1, new ne(W.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new an(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Sn(t.pos, this.mark);
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
    return new Sn(t.pos, e.markFromJSON(t.mark));
  }
}
kt.jsonID("removeNodeMark", Sn);
class it extends kt {
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
    return this.structure && gi(e, this.from, this.to) ? ot.fail("Structure replace would overwrite content") : ot.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Dt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new it(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && it.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new it(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof it) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? ne.empty : new ne(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new it(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? ne.empty : new ne(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new it(e.from, this.to, t, this.structure);
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
    return new it(t.from, t.to, ne.fromJSON(e, t.slice), !!t.structure);
  }
}
it.MAP_BIAS = 1;
kt.jsonID("replace", it);
class pt extends kt {
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
    if (this.structure && (gi(e, this.from, this.gapFrom) || gi(e, this.gapTo, this.to)))
      return ot.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ot.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ot.fromReplace(e, this.from, this.to, r) : ot.fail("Content does not fit in gap");
  }
  getMap() {
    return new Dt([
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
    return new pt(t.from, t.to, t.gapFrom, t.gapTo, ne.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
kt.jsonID("replaceAround", pt);
function gi(n, e, t) {
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
function za(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = p : i.push(s = new Jt(f, p, d[g])));
      l && l.to == f ? l.to = p : o.push(l = new cn(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function Da(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Wr) {
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
  }), i.forEach((s) => n.step(new Jt(s.from, s.to, s.style)));
}
function Pi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new it(l, u, ne.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new Jt(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new ne(W.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new it(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(W.empty, !0);
    n.replace(l, l, new ne(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function Pa(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Hn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Pa(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function La(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = W.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = W.from(r.node(m).copy(u)), d++) : c--;
  let f = W.empty, p = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = W.from(i.node(m).copy(f)), p++) : a++;
  n.step(new pt(c, a, s, l, new ne(u.append(f), d, p), u.size - d, !0));
}
function Ps(n, e, t = null, r = n) {
  let i = Oa(n, e), o = i && Ba(r, e);
  return o ? i.map(yo).concat({ type: e, attrs: t }).concat(o.map(yo)) : null;
}
function yo(n) {
  return { type: n, attrs: null };
}
function Oa(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Ba(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function Fa(n, e, t) {
  let r = W.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = W.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new pt(i, o, i, o, new ne(r, 0, 0), t.length, !0));
}
function Ha(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && _a(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && Os(n, s, l, o), Pi(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new pt(d, f, d + 1, f - 1, new ne(W.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && Ls(n, s, l, o), !1;
    }
  });
}
function Ls(n, e, t, r) {
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
function Os(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function _a(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function ja(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new pt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ne(W.from(s), 0, 0), 1, !0));
}
function Zt(n, e, t = 1, r) {
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
function Wa(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = W.empty, s = W.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = W.from(i.node(l).copy(o));
    let u = r && r[a];
    s = W.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new it(e, e, new ne(o.append(s), t, t), !0));
}
function Nn(n, e) {
  let t = n.resolve(e), r = t.index();
  return Bs(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function qa(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Bs(n, e) {
  return !!(n && e && !n.isLeaf && qa(n, e));
}
function qr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Bs(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Ka(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Os(n, u.node(), u.before(), l);
  }
  s.inlineContent && Pi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new it(a, c.map(e + t, -1), ne.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    Ls(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Ja(n, e, t) {
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
function Kr(n, e, t = e, r = ne.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Fs(i, o, r) ? new it(e, t, r) : new Va(i, o, r).fit();
}
function Fs(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Va {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = W.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = W.from(e.node(i).copy(this.placed));
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
    let c = new ne(o, s, l);
    return e > -1 ? new pt(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new it(r.pos, i.pos, c) : null;
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
        r ? (o = ti(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(W.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ti(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new ne(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ti(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new ne(jn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new ne(jn(e, t, 1), t, r);
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
      a++, (a > 1 || c == 0 || g.content.size) && (d = b, u.push(Hs(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Wn(this.placed, t, W.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < p; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? ne.empty : new ne(jn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new ne(jn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !ni(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = ni(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = ni(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Wn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Wn(this.placed, this.depth, W.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(W.empty, !0);
    t.childCount && (this.placed = Wn(this.placed, this.frontier.length, t));
  }
}
function jn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(jn(n.firstChild.content, e - 1, t)));
}
function Wn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Wn(n.lastChild.content, e - 1, t)));
}
function ti(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Hs(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Hs(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(W.empty, !0)))), n.copy(r);
}
function ni(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !Ya(t, o.content, s) ? l : null;
}
function Ya(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Ua(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Xa(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Fs(i, o, r))
    return n.step(new it(e, t, r));
  let s = js(i, o);
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
    let p = a[f], m = Ua(p.type);
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
        let L = i.node(b - 1), $ = i.index(b - 1);
        if (L.canReplaceWith($, $, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new ne(_s(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function _s(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(_s(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(W.empty, !0));
  }
  return n;
}
function Ga(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Ja(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new ne(W.from(r), 0, 0));
}
function Qa(n, e, t) {
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
  let o = js(r, i);
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
function js(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Dn extends kt {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ot.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return ot.fromReplace(e, this.pos, this.pos + 1, new ne(W.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Dt.empty;
  }
  invert(e) {
    return new Dn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Dn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Dn(t.pos, t.attr, t.value);
  }
}
kt.jsonID("attr", Dn);
class Gn extends kt {
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
    return ot.ok(r);
  }
  getMap() {
    return Dt.empty;
  }
  invert(e) {
    return new Gn(this.attr, e.attrs[this.attr]);
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
    return new Gn(t.attr, t.value);
  }
}
kt.jsonID("docAttr", Gn);
let Ln = class extends Error {
};
Ln = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Ln.prototype = Object.create(Error.prototype);
Ln.prototype.constructor = Ln;
Ln.prototype.name = "TransformError";
class Za {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new $r();
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
      throw new Ln(t.failed);
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
  replace(e, t = e, r = ne.empty) {
    let i = Kr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new ne(W.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, ne.empty);
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
    return Xa(this, e, t, r), this;
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
    return Ga(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Qa(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return La(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Ka(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Fa(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Ha(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return ja(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Dn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Gn(e, t)), this;
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
    if (t instanceof je)
      t.isInSet(r.marks) && this.step(new Sn(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new Sn(e, o)), i = o.removeFromSet(i);
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
    return Wa(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return za(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Da(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Pi(this, e, t, r), this;
  }
}
const ri = /* @__PURE__ */ Object.create(null);
class Ye {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new eu(e.min(t), e.max(t))];
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
  replace(e, t = ne.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? ne.empty : t), l == 0 && vo(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), vo(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new It(e) : Rn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Rn(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Rn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Vt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Rn(e, e, 0, 0, 1) || new Vt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Rn(e, e, e.content.size, e.childCount, -1) || new Vt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = ri[t.type];
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
    if (e in ri)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return ri[e] = t, t.prototype.jsonID = e, t;
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
    return It.between(this.$anchor, this.$head).getBookmark();
  }
}
Ye.prototype.visible = !0;
class eu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let xo = !1;
function bo(n) {
  !xo && !n.parent.inlineContent && (xo = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class It extends Ye {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    bo(e), bo(t), super(e, t);
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
      return Ye.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new It(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = ne.empty) {
    if (super.replace(e, t), t == ne.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof It && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Jr(this.anchor, this.head);
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
    return new It(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = Ye.findFrom(t, r, !0) || Ye.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ye.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ye.findFrom(e, -r, !0) || Ye.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new It(e, t);
  }
}
Ye.jsonID("text", It);
class Jr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Jr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return It.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class We extends Ye {
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
    return r ? Ye.near(o) : new We(o);
  }
  content() {
    return new ne(W.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof We && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Li(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new We(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new We(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
We.prototype.visible = !1;
Ye.jsonID("node", We);
class Li {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Jr(r, r) : new Li(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && We.isSelectable(r) ? new We(t) : Ye.near(t);
  }
}
class Vt extends Ye {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = ne.empty) {
    if (t == ne.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ye.atStart(e.doc);
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
    return new Vt(e);
  }
  map(e) {
    return new Vt(e);
  }
  eq(e) {
    return e instanceof Vt;
  }
  getBookmark() {
    return tu;
  }
}
Ye.jsonID("all", Vt);
const tu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Vt(n);
  }
};
function Rn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return It.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && We.isSelectable(l))
        return We.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Rn(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function vo(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof it || i instanceof pt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(Ye.near(n.doc.resolve(s), t));
}
function wo(n, e) {
  return !e || !n ? n : n.bind(e);
}
class gr {
  constructor(e, t, r) {
    this.name = e, this.init = wo(t.init, r), this.apply = wo(t.apply, r);
  }
}
new gr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new gr("selection", {
  init(n, e) {
    return n.selection || Ye.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new gr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new gr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Ws = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function qs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Ks = (n, e, t) => {
  let r = qs(n, t);
  if (!r)
    return !1;
  let i = Oi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Hn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (el(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (On(o, "end") || We.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Kr(n.doc, r.before(s), r.after(s), ne.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(On(o, "end") ? Ye.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : We.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, nu = (n, e, t) => {
  let r = qs(n, t);
  if (!r)
    return !1;
  let i = Oi(r);
  return i ? Js(n, i, e) : !1;
}, ru = (n, e, t) => {
  let r = Ys(n, t);
  if (!r)
    return !1;
  let i = Bi(r);
  return i ? Js(n, i, e) : !1;
};
function Js(n, e, t) {
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
  let a = Kr(n.doc, o, c, ne.empty);
  if (!a || a.from != o || a instanceof it && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(It.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function On(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Vs = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Oi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !We.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(We.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Oi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Ys(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Us = (n, e, t) => {
  let r = Ys(n, t);
  if (!r)
    return !1;
  let i = Bi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (el(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (On(o, "start") || We.isSelectable(o))) {
    let s = Kr(n.doc, r.before(), r.after(), ne.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(On(o, "start") ? Ye.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : We.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Xs = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Bi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !We.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(We.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Bi(n) {
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
const iu = (n, e) => {
  let t = n.selection, r = t instanceof We, i;
  if (r) {
    if (t.node.isTextblock || !Nn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = qr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(We.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, ou = (n, e) => {
  let t = n.selection, r;
  if (t instanceof We) {
    if (t.node.isTextblock || !Nn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = qr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, su = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Hn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Gs = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Fi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const lu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Fi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(Ye.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, Qs = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Vt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Fi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(It.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Zs = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (Zt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Hn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function cu(n) {
  return (e, t) => {
    if (e.selection instanceof We && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !Zt(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof It || e.selection instanceof Vt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Fi(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
        break;
      } else {
        if (p == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = Zt(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = Zt(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let p = r.mapping.slice(o), m = p.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const au = cu(), uu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(We.create(n.doc, i))), !0);
};
function du(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Nn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function el(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && du(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = W.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = W.from(s[x].create(null, m));
      m = W.from(i.copy(m));
      let g = n.tr.step(new pt(e.pos - 1, p, e.pos, p, new ne(m, 1, 0), s.length, !0)), b = g.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Nn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : Ye.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Hn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && On(o, "start", !0) && On(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, g.content)) {
      if (t) {
        let x = W.empty;
        for (let $ = m.length - 1; $ >= 0; $--)
          x = W.from(m[$].copy(x));
        let L = n.tr.step(new pt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new ne(x, m.length, 0), 0, !0));
        t(L.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function tl(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(It.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const fu = tl(-1), hu = tl(1);
function pu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Ps(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function ko(n, e = null) {
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
function Hi(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Hi(Ws, Ks, Vs);
Hi(Ws, Us, Xs);
Hi(Gs, Qs, Zs, au);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function mu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return gu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function gu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Rr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Rr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Ps(o, t, r, e);
  return l ? (n && yu(n, e, l, i, t), !0) : !1;
}
function yu(n, e, t, r, i) {
  let o = W.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = W.from(t[u].type.create(t[u].attrs, o));
  n.step(new pt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ne(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Zt(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function xu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? bu(e, t, n, o) : vu(e, t, o) : !0 : !1;
  };
}
function bu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new pt(o - 1, s, o, s, new ne(W.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Rr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Hn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Nn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function vu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? W.empty : W.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new pt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new ne((l ? W.empty : W.from(i.copy(W.empty))).append(c ? W.empty : W.from(i.copy(W.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function wu(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = W.from(a ? n.create() : null), d = new ne(W.from(n.create(null, W.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new pt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function nl(n) {
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
var ku = class rl {
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
    const e = rl.createFakeChain();
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
      state: nl({
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
const Su = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Nu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Tu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = Hn(p);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, g);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Cu = (n) => (e) => n(e), Eu = () => ({ state: n, dispatch: e }) => Qs(n, e), Mu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new _t(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Ru = () => ({ tr: n, dispatch: e }) => {
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
function wt(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Iu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = wt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Au = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, $u = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, So = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return $u(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, zu = (n, e, t) => ({
  from: So(n, t, "left"),
  to: So(e, t, "right")
}), Du = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = zu(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(_t.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Pu = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Lu = () => ({ state: n, dispatch: e }) => lu(n, e);
function Ou(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function zr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Ou(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function il(n, e, t = {}) {
  return n.find((r) => r.type === e && zr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function No(n, e, t = {}) {
  return !!il(n, e, t);
}
function ol(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!il([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && No([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && No([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function fn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Bu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = fn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = ol(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = _t.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Fu = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function sl(n) {
  return n instanceof _t;
}
function mn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Hu(n, e = null) {
  if (!e) return null;
  const t = An.atStart(n), r = An.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? _t.create(n, mn(0, i, o), mn(n.content.size, i, o)) : _t.create(n, mn(e, i, o), mn(e, i, o));
}
function To() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Dr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function _u() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const ju = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Dr() || To()) && r.dom.focus(), _u() && !Dr() && !To() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !sl(t.state.selection))
    return s(), !0;
  const l = Hu(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Wu = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), qu = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), ll = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && ll(r);
  }
  return n;
};
function yr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return ll(t);
}
function cl(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Bn(n, e, t) {
  if (cl(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return W.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Bn("", e, t);
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
      if (t.slice ? zn.fromSchema(c).parseSlice(yr(n), t.parseOptions) : zn.fromSchema(c).parse(yr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = zn.fromSchema(e);
    return t.slice ? o.parseSlice(yr(n), t.parseOptions).content : o.parse(yr(n), t.parseOptions);
  }
  return Bn("", e, t);
}
function al(n) {
  return !("type" in n);
}
function ul(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof it || i instanceof pt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(An.near(n.doc.resolve(s), t));
}
const Ku = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
      Bn(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = Bn(e, o.schema, {
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
    const m = al(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : cl(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = W.from(m);
      const b = r.doc.resolve(u), x = b.node(), L = b.parentOffset === 0, $ = x.isText || x.isTextblock, N = x.content.size > 0;
      L && $ && N && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && ul(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function dl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Ju = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = dl(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = Bn(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && ul(e, e.steps.length - 1, -1)), !0) : !1;
}, Vu = () => ({ state: n, dispatch: e }) => iu(n, e), Yu = () => ({ state: n, dispatch: e }) => ou(n, e), Uu = () => ({ state: n, dispatch: e }) => Ks(n, e), Xu = () => ({ state: n, dispatch: e }) => Us(n, e), Gu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = qr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Qu = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = qr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Zu = () => ({ state: n, dispatch: e }) => nu(n, e), ed = () => ({ state: n, dispatch: e }) => ru(n, e);
function fl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function td(n) {
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
      Dr() || fl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const nd = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = td(n).split(/-(?!$)/), s = o.find((a) => ![
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
function _i(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? wt(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), p = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: p
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => zr(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const rd = (n, e = {}) => ({ state: t, dispatch: r }) => _i(t, wt(n, t.schema), e) ? su(t, r) : !1, id = () => ({ state: n, dispatch: e }) => Zs(n, e), od = (n) => ({ state: e, dispatch: t }) => {
  const r = wt(n, e.schema);
  return xu(r)(e, t);
}, sd = () => ({ state: n, dispatch: e }) => Gs(n, e);
function hl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Co(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const ld = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = hl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = wt(n, r.schema)), l === "mark" && (s = fn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, Co(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(Co(f.attrs, e))));
      });
    });
  }), c;
}, cd = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), ad = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Yl(n.doc);
    n.setSelection(t);
  }
  return !0;
}, ud = () => ({ state: n, dispatch: e }) => Vs(n, e), dd = () => ({ state: n, dispatch: e }) => Xs(n, e), fd = () => ({ state: n, dispatch: e }) => uu(n, e), hd = () => ({ state: n, dispatch: e }) => hu(n, e), pd = () => ({ state: n, dispatch: e }) => fu(n, e);
function md(n, e, t = {}, r = {}) {
  return Bn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const gd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = md(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = al(a) ? a.content : [a];
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
function yd(n, e) {
  const t = fn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function xd(n, e) {
  const t = new Za(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function bd(n, e) {
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
function ji(n) {
  return (e) => bd(e.$from, n);
}
function Qn(n, e, t) {
  return n.config[e] === void 0 && n.parent ? Qn(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? Qn(n.parent, e, t) : null
  }) : n.config[e];
}
function vd(n) {
  return typeof n == "function";
}
function yi(n, e = void 0, ...t) {
  return vd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function pl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function wd(n, e, t) {
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
function kd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Sd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Nd(n) {
  const e = Sd(n);
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
  }), Nd(r);
}
function wr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Cd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? fn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => zr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), x = Math.min(p, g + m.nodeSize), L = x - b;
      s += L, l.push(...m.marks.map(($) => ({
        mark: $,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => zr(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function ii(n, e) {
  const { nodeExtensions: t } = pl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = yi(Qn(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function ml(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (ml(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Ed(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (sl(r) && (i = r.$cursor), i) {
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
const Md = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = fn(n, r.schema);
  if (i)
    if (s) {
      const a = yd(r, c);
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
  return Ed(r, t, c);
}, Rd = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Id = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = wt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => ko(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => ko(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Ad = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = mn(n, 0, r.content.size), o = Pn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, $d = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, zd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = _t.atStart(r).from, l = _t.atEnd(r).to, c = mn(i, s, l), a = mn(o, s, l), u = _t.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, Dd = (n) => ({ state: e, dispatch: t }) => {
  const r = wt(n, e.schema);
  return wu(r)(e, t);
};
function Eo(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Pd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = wr(a, l.node().type.name, l.node().attrs);
  if (o instanceof Pn && o.node.isBlock)
    return !l.parentOffset || !Zt(s, l.pos) ? !1 : (r && (n && Eo(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : dl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = Zt(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !m && Zt(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof _t && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Eo(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, Ld = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = wt(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = W.empty;
      const L = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let I = l.depth - L; I >= l.depth - 3; I -= 1) x = W.from(l.node(I).copy(x));
      const $ = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, N = {
        ...wr(d, l.node().type.name, l.node().attrs),
        ...e
      }, k = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(N)) || void 0;
      x = x.append(W.from(s.createAndFill(null, k) || void 0));
      const R = l.before(l.depth - (L - 1));
      t.replace(R, l.after(-$), new ne(x, 4 - L, 0));
      let j = -1;
      t.doc.nodesBetween(R, t.doc.content.size, (I, M) => {
        if (j > -1) return !1;
        I.isTextblock && I.content.size === 0 && (j = M + 1);
      }), j > -1 && t.setSelection(_t.near(t.doc.resolve(j))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...wr(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...wr(d, l.node().type.name, l.node().attrs),
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
  if (!Zt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: L } = r, { splittableMarks: $ } = o.extensionManager, N = L || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !N || !i) return !0;
    const k = N.filter((R) => $.includes(R.type.name));
    t.ensureMarks(k);
  }
  return !0;
};
function Mo(n) {
  return !n || n === "1" ? null : n;
}
function gl(n, e) {
  return Mo(n) === Mo(e);
}
const oi = (n, e) => {
  const t = ji((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Nn(n.doc, t.pos)) || !gl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, si = (n, e) => {
  const t = ji((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Nn(n.doc, r)) || !gl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Od(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return _t.between(r, i);
}
const Bd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = wt(n, s.schema), m = wt(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: L } = g, $ = x.blockRange(L), N = b || g.$to.parentOffset && g.$from.marks();
  if (!$) return !1;
  const k = ji((B) => ii(B.type.name, d))(g), R = g.from === 0 && g.to === s.doc.content.size, j = s.doc.content.content, I = j.length === 1 ? j[0] : null, M = R && I && ii(I.type.name, d) ? {
    node: I,
    pos: 0
  } : null, J = k ?? M, E = !!k && $.depth >= 1 && $.depth - k.depth <= 1, A = !!M;
  if ((E || A) && J) {
    if (J.node.type === p)
      return R && A ? c().command(({ tr: B, dispatch: V }) => {
        const X = Od(B);
        return X ? (B.setSelection(X), V && V(B), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (ii(J.node.type.name, d) && p.validContent(J.node.content)) return c().command(() => (o.setNodeMarkup(J.pos, p), !0)).command(() => oi(o, p)).command(() => si(o, p)).run();
  }
  return !t || !N || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => oi(o, p)).command(() => si(o, p)).run() : c().command(() => {
    const B = u().wrapInList(p, r), V = N.filter((X) => f.includes(X.type.name));
    return o.ensureMarks(V), B ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => oi(o, p)).command(() => si(o, p)).run();
}, Fd = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = fn(n, r.schema);
  return Cd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Hd = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = wt(n, r.schema), s = wt(e, r.schema), l = _i(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, _d = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = wt(n, t.schema);
  return _i(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, jd = () => ({ state: n, dispatch: e }) => {
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
}, Wd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, qd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = fn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = ol(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Kd = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, Jd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = hl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = wt(n, r.schema)), l === "mark" && (s = fn(n, r.schema));
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
      })), s && b.marks.length && b.marks.forEach((L) => {
        if (s === L.type && (c = !0, i)) {
          const $ = Math.max(x, u), N = Math.min(x + b.nodeSize, d);
          t.addMark($, N, s.create({
            ...L.attrs,
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
}, Vd = new Yt("__tiptap_decorations__"), Yd = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Vd, {
  type: "force",
  name: n
}), !0), Ud = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = wt(n, t.schema);
  return pu(i, e)(t, r);
}, Xd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = wt(n, t.schema);
  return mu(i, e)(t, r);
};
var Gd = /* @__PURE__ */ ca({
  blur: () => Su,
  clearContent: () => Nu,
  clearNodes: () => Tu,
  command: () => Cu,
  createParagraphNear: () => Eu,
  cut: () => Mu,
  deleteCurrentNode: () => Ru,
  deleteNode: () => Iu,
  deleteRange: () => Au,
  deleteSelection: () => Du,
  enter: () => Pu,
  exitCode: () => Lu,
  extendMarkRange: () => Bu,
  first: () => Fu,
  focus: () => ju,
  forEach: () => Wu,
  insertContent: () => qu,
  insertContentAt: () => Ku,
  insertDefaultBlock: () => Ju,
  joinBackward: () => Uu,
  joinDown: () => Yu,
  joinForward: () => Xu,
  joinItemBackward: () => Gu,
  joinItemForward: () => Qu,
  joinTextblockBackward: () => Zu,
  joinTextblockForward: () => ed,
  joinUp: () => Vu,
  keyboardShortcut: () => nd,
  lift: () => rd,
  liftEmptyBlock: () => id,
  liftListItem: () => od,
  newlineInCode: () => sd,
  resetAttributes: () => ld,
  scrollIntoView: () => cd,
  selectAll: () => ad,
  selectNodeBackward: () => ud,
  selectNodeForward: () => dd,
  selectParentNode: () => fd,
  selectTextblockEnd: () => hd,
  selectTextblockStart: () => pd,
  setContent: () => gd,
  setMark: () => Md,
  setMeta: () => Rd,
  setNode: () => Id,
  setNodeSelection: () => Ad,
  setTextDirection: () => $d,
  setTextSelection: () => zd,
  sinkListItem: () => Dd,
  splitBlock: () => Pd,
  splitListItem: () => Ld,
  toggleList: () => Bd,
  toggleMark: () => Fd,
  toggleNode: () => Hd,
  toggleWrap: () => _d,
  undoInputRule: () => jd,
  unsetAllMarks: () => Wd,
  unsetMark: () => qd,
  unsetTextDirection: () => Kd,
  updateAttributes: () => Jd,
  updateDecorations: () => Yd,
  wrapIn: () => Ud,
  wrapInList: () => Xd
});
typeof process < "u" && process.env.NODE_ENV;
function Qd(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function xr(n) {
  return Qd(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function yl(n, e) {
  const t = { ...n };
  return xr(n) && xr(e) && Object.keys(e).forEach((r) => {
    xr(e[r]) && xr(n[r]) ? t[r] = yl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var xl = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...yi(Qn(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...yi(Qn(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => yl(this.options, n)
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
}, Zd = class bl extends xl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new bl(t);
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
}, jt = class vl extends xl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new vl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
jt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new nn({
      key: new Yt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = kd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => wd(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
jt.create({
  name: "commands",
  addCommands() {
    return { ...Gd };
  }
});
jt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = xd(n.before, [n, ...e]);
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
        if (u instanceof Jt) {
          var f, p;
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(g), L = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((N) => N.eq(u.mark)) : !1, $ = (p = c.doc.nodeAt(g)) === null || p === void 0 ? void 0 : p.marks.some((N) => N.eq(u.mark));
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
            partial: !!($ || L),
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
jt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new nn({
      key: new Yt("tiptapDrop"),
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
jt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new nn({
      key: new Yt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const ef = new Yt("focusEvents");
jt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new nn({
      key: ef,
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
jt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : An.atStart(a).from === f;
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
    return Dr() || fl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new nn({
      key: new Yt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = An.atStart(e.doc).from, a = An.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !ml(t.doc)) return;
        const u = t.tr, d = nl({
          state: t,
          transaction: u
        }), { commands: f } = new ku({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
jt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new nn({
      key: new Yt("tiptapPaste"),
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
jt.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new nn({
      key: new Yt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
jt.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = pl(this.extensions);
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
    return [new nn({
      key: new Yt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const tf = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), nf = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), rf = /^(https?:\/\/|mailto:)/i;
function of(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    nf.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function xi(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(xi(c));
    return l;
  };
  if (!tf.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!rf.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = of(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(xi(l));
  return i;
}
function wl(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function sf(n) {
  const e = wl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(xi(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Oh(n) {
  const e = wl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Bh(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function lf(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Ro(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const cf = { text: "#52525b" }, af = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? cf, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    Kl,
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
        b && Pn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new Pn(g))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, uf = oc.extend({
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
    return ql(af);
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
    return ["span", Wl({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), df = 240, ff = 280, hf = ({ props: n, onApi: e }) => {
  const t = Hr(), r = w(e);
  r.current = e, ie(() => {
    r.current(t);
  }, [t]);
  const i = w(null);
  ie(() => {
    var s;
    t.pointerDriven || dn((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), ie(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Fr();
  return /* @__PURE__ */ h(nr.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: ff, maxHeight: df },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        pf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, pf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = ls({
    label: () => n.label,
    activate: t
  }), s = He(), l = { padding: `${O(8, 12, s)}px ${O(12, 16, s)}px`, fontSize: O(12, 14, s) };
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
}, Io = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(hf, { props: r, onApi: (i) => {
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
      const o = sc(i);
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
}, mf = Zd.create({
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
}), kr = new Yt("retainedSelectionHighlight"), gf = jt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new nn({
        key: kr,
        state: {
          init: () => ({ held: !1, decorations: cr.empty }),
          apply(n, e) {
            const t = n.getMeta(kr), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: cr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? cr.empty : cr.create(n.doc, [Ul.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = kr.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Fh = {
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
function kl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function yf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = kl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const xf = rt.forwardRef(({
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
  const x = w(null), L = w(null), $ = w(e);
  $.current = e;
  const N = w(r);
  N.current = r;
  const k = w(o);
  k.current = o;
  const R = w(null), j = (A) => {
    var le;
    const B = A.getAttributes("textStyle"), V = A.getAttributes("reportTextStyle"), { from: X, to: T, empty: _ } = A.state.selection;
    let v = !1, ge = !1, me = !1;
    if (!_) {
      const ee = /* @__PURE__ */ new Set(), se = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
      A.state.doc.nodesBetween(X, T, (we) => {
        if (!we.isText) return;
        const re = we.marks.find((K) => K.type.name === "textStyle");
        ee.add((re == null ? void 0 : re.attrs.fontFamily) || ""), se.add((re == null ? void 0 : re.attrs.fontSize) || "");
        const he = we.marks.find((K) => K.type.name === "reportTextStyle");
        q.add((he == null ? void 0 : he.attrs.styleId) || "");
      }), v = ee.size > 1, ge = se.size > 1, me = q.size > 1;
    }
    const ue = {
      bold: A.isActive("bold"),
      italic: A.isActive("italic"),
      underline: A.isActive("underline"),
      strike: A.isActive("strike"),
      link: A.isActive("link"),
      color: B.color || "",
      fontFamily: B.fontFamily || "",
      fontSize: B.fontSize || "",
      textStyle: V.styleId || "",
      hasSelection: !_,
      fontFamilyMixed: v,
      fontSizeMixed: ge,
      textStyleMixed: me
    }, P = R.current;
    P && P.bold === ue.bold && P.italic === ue.italic && P.underline === ue.underline && P.strike === ue.strike && P.link === ue.link && P.color === ue.color && P.fontFamily === ue.fontFamily && P.fontSize === ue.fontSize && P.textStyle === ue.textStyle && P.hasSelection === ue.hasSelection && P.fontFamilyMixed === ue.fontFamilyMixed && P.fontSizeMixed === ue.fontSizeMixed && P.textStyleMixed === ue.textStyleMixed || (R.current = ue, (le = k.current) == null || le.call(k, ue));
  }, I = (A) => {
    var _;
    const B = A.state.selection;
    let V = null;
    B instanceof Pn && B.node.type.name === "token" ? (V = { key: B.node.attrs.field ?? "", pos: B.from }, x.current = B.from) : x.current != null && (x.current = A.state.tr.mapping.map(x.current));
    const X = L.current, T = X && V && X.key === V.key && X.pos === V.pos;
    !X && !V || T || (L.current = V, (_ = b.current) == null || _.call(b, V));
  }, M = (A) => {
    const B = sf(lf(A));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(B) ? "" : B;
  }, J = rt.useMemo(() => {
    const A = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: X }) => {
        var T;
        return ((T = p.current) == null ? void 0 : T.call(p, X)) ?? [];
      },
      command: ({ editor: X, range: T, props: _ }) => {
        X.chain().focus().insertContentAt(T, { type: "token", attrs: { field: _.field } }).run();
      },
      render: Io
    }, B = uf.configure({
      resolve: f.current ?? null,
      suggestion: A,
      onTokenClick: (X, T, _) => {
        var v;
        x.current = _, (v = g.current) == null || v.call(g, X, T, _);
      }
    }), V = jt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          ic({
            pluginKey: new Yt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: X, range: T }) => kl(X, T.from) != null,
            items: ({ editor: X, query: T }) => {
              var v;
              const _ = yf(X);
              return _ ? ((v = m.current) == null ? void 0 : v.call(m, _.chipKey, T)) ?? [] : [];
            },
            command: ({ editor: X, range: T, props: _ }) => {
              X.chain().focus().insertContentAt(T, { type: "token", attrs: { field: _.field } }).run();
            },
            render: Io
          })
        ];
      }
    });
    return [B, V];
  }, []), E = Jl({
    immediatelyRender: !1,
    extensions: [
      Xl,
      Gl.configure({ placeholder: t }),
      Ql,
      Zl,
      ec,
      mf,
      gf,
      tc,
      rc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      nc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...J
    ],
    content: Ro(n || ""),
    editable: !r,
    onUpdate: ({ editor: A }) => {
      $.current(M(A.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: A }) => {
      j(A), I(A);
    }
  });
  return ie(() => {
    if (!E || E.isFocused) return;
    M(E.getHTML()) !== n && (R.current = null, E.commands.setContent(Ro(n || ""), { emitUpdate: !1 }), j(E));
  }, [n, E]), ie(() => {
    E && E.setEditable(!r);
  }, [r, E]), ie(() => {
    E && (R.current = null, j(E), I(E));
  }, [E]), zo(d, () => ({
    exec: (A, B, V) => {
      if (!E || N.current) return;
      const X = E.chain(), T = (V == null ? void 0 : V.focus) === !1 ? X : X.focus();
      switch (A) {
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
          B && T.setColor(B).run();
          break;
        case "unsetColor":
          T.unsetColor().run();
          break;
        case "fontFamily":
          B && T.setFontFamily(B).run();
          break;
        case "unsetFontFamily":
          T.unsetFontFamily().run();
          break;
        case "fontSize":
          B && T.setFontSize(B).run();
          break;
        case "unsetFontSize":
          T.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          B && T.setMark("reportTextStyle", { styleId: B }).unsetFontFamily().unsetFontSize().run();
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
          B && T.extendMarkRange("link").setLink({ href: B }).run();
          break;
        case "unlink":
          T.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (A) => E == null ? void 0 : E.commands.focus(A),
    insertToken: (A) => {
      !E || N.current || E.chain().focus().insertContent({ type: "token", attrs: { field: A } }).run();
    },
    replaceToken: (A) => {
      if (!E || N.current) return;
      const B = x.current;
      B != null && E.commands.command(({ tr: V }) => {
        const X = V.doc.nodeAt(B);
        if (!X || X.type.name !== "token") return !1;
        V.setNodeMarkup(B, void 0, { field: A });
        const T = V.doc.resolve(B);
        return T.nodeAfter && T.nodeAfter.type.name === "token" && V.setSelection(new Pn(T)), !0;
      });
    },
    holdSelectionHighlight: (A) => {
      !E || E.isDestroyed || E.view.dispatch(E.state.tr.setMeta(kr, { held: A }));
    }
  }), [E]), /* @__PURE__ */ h(Vl, { editor: E, className: `richtext-editor ${i || ""}` });
});
xf.displayName = "RichTextEditor";
const bf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], vf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Ao = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), wf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = oe(!1);
  return /* @__PURE__ */ h(
    _r,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ C("button", { type: "button", disabled: e, className: `${oa} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(vn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: bf.map((s) => /* @__PURE__ */ h($c, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(Zn, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, kf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = oe(!1), o = jr(), [s, l] = oe(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    _r,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ h(
        zt,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ h(Ll, { className: "w-3 h-3" })
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
            className: ra + " w-full"
          }
        ),
        /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(zt, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ h(
            zt,
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
}, Hh = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = oe(!1), d = (b, x) => {
    var L;
    return (L = n.current) == null ? void 0 : L.exec(b, x);
  }, f = jr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ h("div", { className: fs }) : null;
  return /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ C("div", { className: m, children: [
      /* @__PURE__ */ h(Mn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(Mn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(Mn, { content: "Underline", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(zl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(Mn, { content: "Strikethrough", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Dl, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(kf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      _r,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ C(zt, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Ao, {}),
          /* @__PURE__ */ h(vn, { className: "w-3 h-3 text-zinc-500" })
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
              children: /* @__PURE__ */ h(Ao, { className: "w-3.5 h-3.5" })
            }
          ),
          vf.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ C(Ze, { children: [
      g,
      /* @__PURE__ */ C("div", { className: m, children: [
        o && /* @__PURE__ */ h(wf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(Mn, { content: "Clear formatting", children: /* @__PURE__ */ h(
          zt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(Pl, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ C(Ze, { children: [
      g,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function Wi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Sf(n, e, t, r, i) {
  return Wi(n + e * i, t, r);
}
const Nf = 2;
function Tf(n, e, t, r, i) {
  return Wi(n + Math.trunc(e / Nf) * i, t, r);
}
const Cf = 3;
function _h({
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
  const [p, m] = oe(null), [g, b] = oe(!1), x = w(!1), L = w(null), $ = w(null), N = w(null), k = He(), R = us(), j = a === void 0;
  ie(() => () => {
    var T;
    return (T = L.current) == null ? void 0 : T.call(L);
  }, []), vt(() => {
    const T = N.current, _ = $.current;
    !j && T && _ && (_.style.color = getComputedStyle(T).color);
  }, [j, a]), ie(() => {
    x.current || m(null);
  }, [n]);
  const I = n ?? r, M = p !== null ? p : n != null ? String(n) : d ? "" : String(r), J = (T) => Wi(T, e, t), E = (T) => {
    const _ = Sf(I, T, e, t, o);
    _ !== I && (x.current && m(String(_)), i(_));
  }, A = (T) => {
    if (l || s || T.pointerType !== "mouse" || T.button !== 0) return;
    const _ = T.currentTarget, v = T.clientY, ge = I;
    let me = ge, ue = !1;
    const P = (ee) => {
      const se = v - ee.clientY;
      if (!ue) {
        if (Math.abs(se) < Cf) return;
        ue = !0, _.blur(), _.style.userSelect = "none";
      }
      const q = Tf(ge, se, e, t, o);
      q !== me && (me = q, i(q));
    }, le = () => {
      L.current = null, window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", le), window.removeEventListener("pointercancel", le), _.style.userSelect = "", ue && _.blur();
    };
    L.current = le, window.addEventListener("pointermove", P), window.addEventListener("pointerup", le), window.addEventListener("pointercancel", le);
  }, B = (T) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": T === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (T === 1 ? I >= t : I <= e),
    onPointerDown: (_) => _.preventDefault(),
    onClick: () => E(T)
  }), V = j ? O(22, 30, k) : O(16, 22, k), X = j ? O(14, 18, k) : O(11, 15, k);
  return /* @__PURE__ */ C(
    "span",
    {
      ref: $,
      className: `ui-number ${j ? "ui-number-box" : ""}`,
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
            value: M,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...j ? { ...R, minHeight: O(30, 38, k) } : {},
              paddingRight: V + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (T) => {
              const _ = T.target.value;
              m(_);
              const v = parseInt(_, 10);
              _ !== "" && !Number.isNaN(v) && i(J(v));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const T = parseInt(p, 10);
              Number.isNaN(T) || i(J(T)), m(null);
            },
            onKeyDown: (T) => {
              T.key === "Enter" && T.target.blur(), T.key === "Escape" && (m(null), T.target.blur()), !s && !l && (T.key === "ArrowUp" || T.key === "ArrowDown") && (T.preventDefault(), E(T.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: A
          }
        ),
        /* @__PURE__ */ C("span", { className: "ui-number-steppers", style: { width: V }, children: [
          /* @__PURE__ */ h("button", { ...B(1), className: "ui-number-step", children: /* @__PURE__ */ h(Ol, { style: { width: X, height: X } }) }),
          /* @__PURE__ */ h("button", { ...B(-1), className: "ui-number-step", children: /* @__PURE__ */ h(vn, { style: { width: X, height: X } }) })
        ] })
      ]
    }
  );
}
function jh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = He(), f = un({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = O(14, 16, d), m = { width: p, height: p }, g = O(10, 12, d);
  return /* @__PURE__ */ C("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ C("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Sr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(vn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function qi({
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
function Ef({
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
  onSubmit: g,
  onCancel: b,
  cancelOnEscape: x = !1,
  cancelOnOutside: L = !1,
  className: $ = "",
  "aria-label": N
}) {
  const [k, R] = oe(u), j = w(k);
  j.current = k;
  const I = w(null), M = w(null), J = w(null), E = Ho(), A = Q((P) => {
    j.current !== P && (j.current = P, R(P), d == null || d(P));
  }, [d]), B = Q((P = !1) => {
    var le;
    A(!1), (le = M.current) == null || le.blur(), P && requestAnimationFrame(() => {
      var ee;
      return (ee = J.current) == null ? void 0 : ee.focus();
    });
  }, [A]), V = Q(() => {
    A(!0), requestAnimationFrame(() => {
      const P = M.current;
      if (!P) return;
      P.focus();
      const le = P.value.length;
      P.setSelectionRange(le, le);
    });
  }, [A]);
  ie(() => {
    u && V();
  }, [u, V]), ie(() => {
    var ee;
    if (!k) return;
    const P = ((ee = I.current) == null ? void 0 : ee.ownerDocument) ?? document, le = (se) => {
      var we;
      const q = se.target;
      q && ((we = I.current) != null && we.contains(q) || (L && (b == null || b()), B()));
    };
    return P.addEventListener("pointerdown", le, !0), () => P.removeEventListener("pointerdown", le, !0);
  }, [k, B, L, b]);
  const X = Q((P) => {
    var ee;
    if (!k) return;
    const le = P.relatedTarget;
    le && ((ee = I.current) != null && ee.contains(le)) || (L && (b == null || b()), B());
  }, [k, B, L, b]), T = Q((P) => {
    if (P.key === "Enter" && g) {
      P.preventDefault(), g(n), B(!0);
      return;
    }
    P.key === "Escape" && (P.preventDefault(), P.stopPropagation(), x ? b == null || b() : e(""), B(!0));
  }, [e, B, x, b, g, n]), _ = p === void 0 ? r ?? /* @__PURE__ */ h(pn, { className: "w-3.5 h-3.5" }) : p, me = 8 + (((f == null ? void 0 : f.length) || 0) + (m && n ? 1 : 0)) * (E.box + 2), ue = (P) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: E.icon, height: E.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: P
    }
  );
  return /* @__PURE__ */ h(
    qi,
    {
      expanded: k,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: I,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": c,
      "data-expanded": k ? "true" : "false",
      className: $,
      onBlur: X,
      trigger: /* @__PURE__ */ h(
        zt,
        {
          ref: J,
          type: "button",
          variant: l,
          size: "minimal",
          theme: c,
          icon: r ?? /* @__PURE__ */ h(pn, { className: "w-3.5 h-3.5" }),
          active: a,
          onClick: V,
          className: `w-full justify-start ${k ? "pointer-events-none" : ""}`,
          tabIndex: k ? -1 : 0,
          "aria-expanded": k,
          "aria-label": N || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: "min-w-0 truncate", children: t })
        }
      ),
      field: /* @__PURE__ */ C(Ze, { children: [
        _ && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
            style: { width: E.icon, height: E.icon },
            children: ue(_)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: M,
            value: n,
            onChange: (P) => e(P.target.value),
            onKeyDown: T,
            placeholder: i,
            "aria-label": N || i,
            tabIndex: k ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: _ ? E.icon + 16 : 10, paddingRight: me },
            className: `${Cr("sm")} w-full`
          }
        ),
        /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          f == null ? void 0 : f.map((P) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": P.label,
              title: P.label,
              tabIndex: k ? 0 : -1,
              onMouseDown: (le) => le.preventDefault(),
              onClick: () => {
                P.onClick(n, { close: () => B(!0) }), P.keepOpen || B(!0);
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": P.key,
              children: ue(P.icon)
            },
            P.key
          )),
          m && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: k ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var P;
                  return (P = M.current) == null ? void 0 : P.focus();
                });
              },
              style: { width: E.box, height: E.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(bn, { size: E.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function Wh({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(Pr, { className: "w-3.5 h-3.5" }),
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
  const f = (g) => {
    i == null || i(g), s && c("");
  }, p = () => {
    o == null || o(), l && c("");
  }, m = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ h(Zn, { className: "w-3.5 h-3.5" }),
      onClick: f
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ h(bn, { className: "w-3.5 h-3.5" }),
      onClick: p
    }] : []
  ];
  return /* @__PURE__ */ h(
    Ef,
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
function Mf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Rf(n, e, t) {
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
function Sl(n, e, t) {
  const r = Mf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Rf(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function If(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = Sl(n.items, n.groups, n.query), i = [];
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
function Af({
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
  autoFocus: L = !0,
  collapsedWidth: $ = 128,
  expandedWidth: N = 288,
  panelWidth: k,
  panelMinWidth: R,
  maxMenuHeight: j = 420,
  theme: I = "light",
  morph: M = !0,
  emptyTitle: J,
  emptyHint: E,
  renderEmpty: A,
  emptyActions: B,
  leadingActions: V,
  hideLeadingOnEmpty: X = !1,
  footerActions: T,
  fieldActions: _,
  multiple: v,
  open: ge,
  onOpenChange: me,
  hideTrigger: ue = !1,
  anchorRef: P,
  portalTarget: le,
  renderTrigger: ee,
  renderItem: se,
  highlightOnOpen: q = !0,
  ref: we
}) {
  const re = s !== void 0, [he, K] = oe(""), F = re ? s : he, Le = Q((y) => {
    re || K(y), l == null || l(y);
  }, [re, l]), Ne = ge !== void 0, [tt, Ee] = oe(!1), te = Ne ? ge : tt, Re = Q((y) => {
    Ne || Ee(y), me == null || me(y);
  }, [Ne, me]), [ye, Oe] = oe(t === "inline"), xe = Ve(() => e.map((y) => y.key).join("\0"), [e]), Ce = Ve(() => new Set(xe ? xe.split("\0") : []), [xe]), [Be, Ue] = oe(() => m ? Ce : /* @__PURE__ */ new Set()), [mt, St] = oe(0), yt = w(!1), ze = w(null), Xe = Q((y, D = "keyboard") => {
    yt.current = D === "pointer", St(y);
  }, []), at = w(null), Ct = w(null), Pt = w(null), st = w(null), ut = w(null), Nt = w(0), lt = vi(), xt = Fn(), Ge = Fr(), Fe = Mi(), qe = ns(), _e = Ho(), Lt = 8 + (((_ == null ? void 0 : _.length) || 0) + (F ? 1 : 0)) * (_e.box + 2), [dt, Et] = oe({ top: 0, left: 0, maxH: 288, ready: !1 }), [z, Y] = oe(0);
  Jo({
    anchorRef: P ?? at,
    panelRef: st,
    open: te,
    maxHeight: j,
    anchorRectRef: ut,
    onPosition: (y) => Et({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), ie(() => {
    const y = (P == null ? void 0 : P.current) ?? at.current;
    !te || !y || Y(y.getBoundingClientRect().width);
  }, [te, ye, P]);
  const ce = Br({
    visible: te,
    morph: M,
    anchor: () => {
      var y;
      return ((y = (P == null ? void 0 : P.current) ?? at.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: st,
    cloneOnUnmount: !0
  }), Ae = (B || []).map(
    (y) => typeof y.label == "function" ? y.label(F) : y.label
  ), ve = Ve(
    () => If({
      items: n,
      groups: e,
      query: F,
      browseGroups: f || m || p,
      browseAll: b,
      expandedGroups: Be,
      emptyActionLabels: Ae
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, F, f, m, p, b, Be, Ae.join("\0")]
  ), ft = Ve(
    () => (V || []).map((y, D) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(F) : y.label,
      actionIndex: D,
      source: "leading"
    })),
    [V, F]
  ), At = Ve(
    () => (T || []).map((y, D) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(F) : y.label,
      actionIndex: D,
      source: "footer"
    })),
    [T, F]
  ), S = ve.some((y) => y.kind === "empty"), U = ft.length > 0 && !(X && S), G = U ? ft.length : 0, fe = Ve(
    () => [...U ? ft : [], ...ve, ...At],
    [U, ft, ve, At]
  ), Se = !!a || p && !F.trim(), Te = Ve(
    () => fe.map((y, D) => ({ row: y, index: D })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !Se)),
    [fe, Se]
  ), Pe = (p || m) && !F.trim(), be = !!v, Ke = Ve(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), Ot = Ve(() => F.trim() ? Sl(n, e, F).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : Ke, [n, e, F, Ke]), Tt = Ve(() => new Set(Ot), [Ot]), $e = Go({
    mode: (v == null ? void 0 : v.mode) ?? "draft",
    selectedIds: (v == null ? void 0 : v.selectedIds) ?? Zo,
    itemIds: Ke,
    visibleIds: Ot,
    max: v == null ? void 0 : v.max,
    disabledIds: v == null ? void 0 : v.disabledIds,
    indicator: v == null ? void 0 : v.indicator,
    onCommit: v == null ? void 0 : v.onCommit,
    onDraftChange: v == null ? void 0 : v.onDraftChange,
    onToggle: v == null ? void 0 : v.onToggle
  }), $t = w($e.reset);
  $t.current = $e.reset;
  const Mt = typeof (v == null ? void 0 : v.commitLabel) == "function" ? v.commitLabel($e.count) : (v == null ? void 0 : v.commitLabel) ?? `Select ${$e.count}`, nt = Q(() => {
    var y;
    Re(!1), t === "expandable" && ((y = Ct.current) == null || y.blur(), Oe(!1), requestAnimationFrame(() => {
      var D;
      return (D = Pt.current) == null ? void 0 : D.focus();
    })), Ne || Le(""), Xe(0), Ue(m ? Ce : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, Le, m, Ce, Ne, Re]);
  ie(() => {
    if (F.trim() || !m) {
      Ue((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    Ue((y) => y.size === Ce.size && [...Ce].every((D) => y.has(D)) ? y : Ce);
  }, [F, m, Ce]);
  const Je = w(!1);
  ie(() => {
    if (!te) {
      Je.current = !1;
      return;
    }
    if (Je.current || !p || F.trim()) return;
    const y = x ? [x] : [...(v == null ? void 0 : v.selectedIds) ?? []], D = new Set(y), Z = D.size ? e.filter((pe) => n.some((Me) => Me.group === pe.key && D.has(Me.id))).map((pe) => pe.key) : [];
    if (Z.length === 0) {
      Je.current = !0;
      return;
    }
    const de = g === "single" ? Z.slice(0, 1) : Z;
    if (!de.every((pe) => Be.has(pe))) {
      Ue(new Set(de));
      return;
    }
    if (q && x) {
      const pe = fe.findIndex((Me) => Me.kind === "item" && Me.hit.item.id === x);
      pe >= 0 && Xe(pe);
    }
    Je.current = !0;
  }, [te, p, F, e, n, x, v == null ? void 0 : v.selectedIds, g, Be, fe, q, Xe]);
  const Rt = Q((y) => {
    Ue((D) => {
      const Z = new Set(D);
      return Z.has(y) ? Z.delete(y) : (g === "single" && Z.clear(), Z.add(y)), Z;
    });
  }, [g]), ht = Q(() => {
    var D;
    if (te) {
      (D = Ct.current) == null || D.focus();
      return;
    }
    if ($t.current(), t === "expandable" && !ye) {
      const Z = at.current;
      if (Z) {
        const de = Z.style.transition, pe = Z.style.width;
        Z.style.transition = "none", Z.style.width = `${N}px`;
        const Me = Z.getBoundingClientRect();
        ut.current = { left: Me.left, top: Me.top, width: Me.width, height: Me.height }, Z.style.width = pe, Z.offsetWidth, Z.style.transition = de, window.clearTimeout(Nt.current), Nt.current = window.setTimeout(() => {
          ut.current = null;
        }, wn + 80);
      }
    }
    Oe(!0), Re(!0);
    const y = x ? ve.findIndex((Z) => Z.kind === "item" && Z.hit.item.id === x) : -1;
    Xe(y >= 0 ? G + y : q ? G : -1);
  }, [te, t, ye, N, G, ve, x, q]);
  ie(() => () => {
    window.clearTimeout(Nt.current), ut.current = null;
  }, []), ie(() => {
    te || (ze.current = null);
  }, [te]), ie(() => {
    if (t !== "expandable" || !ye || !te || !L) return;
    const y = requestAnimationFrame(() => {
      var D;
      return (D = Ct.current) == null ? void 0 : D.focus();
    });
    return () => cancelAnimationFrame(y);
  }, [t, ye, te, L]), ie(() => {
    var Z;
    if (!te) return;
    const y = ((Z = at.current) == null ? void 0 : Z.ownerDocument) ?? lt;
    if (!y) return;
    const D = (de) => {
      var Me, Wt, qt, Kt;
      const pe = ((Me = de.composedPath) == null ? void 0 : Me.call(de)[0]) ?? de.target;
      !pe || typeof pe.nodeType != "number" || (Wt = at.current) != null && Wt.contains(pe) || (qt = st.current) != null && qt.contains(pe) || (Kt = P == null ? void 0 : P.current) != null && Kt.contains(pe) || nt();
    };
    return y.addEventListener("pointerdown", D, !0), () => y.removeEventListener("pointerdown", D, !0);
  }, [te, nt, lt, P]);
  const Bt = Q((y) => {
    if (y.kind === "item" ? ze.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (ze.current = null), y.kind === "group") {
      a ? (a(y.group), d && nt()) : Se && Rt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (be) {
        $e.canToggle(y.hit.item.id) && $e.toggle(y.hit.item.id);
        return;
      }
      c(y.hit.item), d && nt();
      return;
    }
    if (y.kind === "action") {
      const D = y.source === "leading" ? V : y.source === "footer" ? T : B, Z = D == null ? void 0 : D[y.actionIndex];
      Z && Z.onClick(F), d && nt();
    }
  }, [nt, d, B, T, Se, V, be, c, a, F, $e, Rt]), rn = (y) => {
    if (Te.length === 0) return;
    let D = mt;
    if (D < 0 && ze.current) {
      const pe = Te.find(
        (Me) => Me.row.kind === "item" && Me.row.hit.item.id === ze.current
      );
      pe && (D = pe.index);
    }
    const Z = Te.findIndex((pe) => pe.index === D), de = Z < 0 ? 0 : (Z + y + Te.length) % Te.length;
    Xe(Te[de].index);
  };
  zo(we, () => ({
    moveHighlight: rn,
    activateHighlighted: () => {
      if (yt.current) return !1;
      const y = mt >= 0 ? fe[mt] : void 0;
      return y ? (Bt(y), Xe(-1, "keyboard"), !0) : !1;
    },
    close: nt,
    selectAll: () => {
      be && $e.setAll(!0);
    },
    setSelection: (y) => {
      $e.reset(y);
    }
  }), [fe, mt, Bt, nt, be, $e]);
  const Tn = (y) => {
    if (be && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), $e.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), te ? rn(1) : ht();
    else if (y.key === "ArrowUp")
      y.preventDefault(), rn(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && p && te && !F.trim()) {
      const D = fe[mt];
      if ((D == null ? void 0 : D.kind) === "group") {
        const Z = Be.has(D.group.key);
        (y.key === "ArrowRight" || Z) && (y.preventDefault(), Rt(D.group.key));
      } else if ((D == null ? void 0 : D.kind) === "item" && y.key === "ArrowLeft" && D.hit.item.group) {
        y.preventDefault();
        const Z = D.hit.item.group;
        Be.has(Z) && Rt(Z);
        const de = fe.findIndex((pe) => pe.kind === "group" && pe.group.key === Z);
        de >= 0 && Xe(de);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const D = fe[mt] ?? fe[0];
      D && Bt(D);
    } else y.key === "Escape" && (y.preventDefault(), nt());
  }, rr = (y) => {
    t === "expandable" && !ye || (Le(y), te || Re(!0));
  };
  ie(() => {
    if (Ne) {
      const D = F.trim().toLowerCase();
      if (!!D && n.some((de) => de.id.toLowerCase() === D || de.label.toLowerCase() === D)) {
        Xe(-1);
        return;
      }
      if (!be) {
        const de = ve.findIndex((pe) => pe.kind === "item" && pe.hit.item.tone !== "create");
        if (de >= 0) {
          Xe(G + de);
          return;
        }
      }
    }
    const y = ve.findIndex((D) => D.kind === "item");
    Xe(y >= 0 ? G + y : G);
  }, [F]), ie(() => {
    if (!te) return;
    const y = x ? ve.findIndex((D) => D.kind === "item" && D.hit.item.id === x) : -1;
    Xe(y >= 0 ? G + y : q ? G : -1);
  }, [te]), vt(() => {
    te && $t.current();
  }, [te]);
  const ir = (y) => /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    _ == null ? void 0 : _.map((D) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": D.label,
        title: D.label,
        tabIndex: ye ? 0 : -1,
        onMouseDown: (Z) => Z.preventDefault(),
        onClick: () => {
          D.onClick(F, { close: nt }), D.keepOpen || nt();
        },
        style: { width: _e.box, height: _e.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": D.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: _e.icon, height: _e.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: D.icon
          }
        )
      },
      D.key
    )),
    F && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: ye ? 0 : -1,
        onPointerDown: (D) => D.preventDefault(),
        onClick: y,
        style: { width: _e.box, height: _e.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(bn, { size: _e.icon })
      }
    )
  ] }), or = /* @__PURE__ */ C("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(pn, { size: _e.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: Ct,
        value: F,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": te,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => rr(y.target.value),
        onFocus: () => {
          f && ht();
        },
        onClick: () => {
          f && ht();
        },
        onKeyDown: Tn,
        placeholder: o,
        style: { paddingRight: Lt },
        className: `${Cr("sm")} w-full pl-8`
      }
    ),
    ir(() => {
      Le(""), te || ht();
    })
  ] }), sr = /* @__PURE__ */ C("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(pn, { size: _e.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: Ct,
        value: F,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": te,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => rr(y.target.value),
        onFocus: () => {
          f && ye && ht();
        },
        onClick: () => {
          f && ye && ht();
        },
        onKeyDown: Tn,
        placeholder: o,
        tabIndex: ye ? 0 : -1,
        style: { paddingRight: Lt },
        className: `${Cr("sm")} h-full w-full pl-8`
      }
    ),
    ir(() => {
      Le(""), !te && ye && ht();
    })
  ] });
  ie(() => {
    if (!te || yt.current) return;
    const y = st.current;
    dn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${mt}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [te, mt]);
  const on = w(ve);
  on.current = ve;
  const H = w(x);
  H.current = x;
  const ae = w(v == null ? void 0 : v.selectedIds);
  ae.current = v == null ? void 0 : v.selectedIds;
  const ke = Xo({
    open: te,
    block: "center",
    ready: dt.ready,
    scroller: () => {
      var y;
      return ((y = st.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Z;
      let y = -1;
      const D = H.current;
      if (D)
        y = on.current.findIndex((de) => de.kind === "item" && de.hit.item.id === D);
      else {
        const de = ae.current;
        if (de && de.length) {
          const pe = new Set(de);
          y = on.current.findIndex((Me) => Me.kind === "item" && pe.has(Me.hit.item.id));
        }
      }
      return y < 0 ? null : ((Z = st.current) == null ? void 0 : Z.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), Qe = (y, D) => {
    const Z = mt === D, de = !be && x !== void 0 && y.hit.item.id === x, pe = be ? $e.isSelected(y.hit.item.id) : de, Me = be ? pe ? "ui-item-selected" : "" : Z ? "ui-item-selected" : "", Wt = !!y.hit.item.disabled || be && !$e.canToggle(y.hit.item.id), qt = y.hit.item.tone === "create" ? I === "light" ? { background: Z ? "#d1fae5" : "#ecfdf5", color: Z ? "#065f46" : "#047857" } : { background: Z ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Z ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": pe,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": D,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (Kt) => Kt.preventDefault(),
        onMouseEnter: () => Xe(D, "pointer"),
        onClick: () => Bt(y),
        style: { ...Fe, ...y.hit.item.rowStyle, ...qt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ge.itemDefault} ${y.hit.item.rowClassName ?? ""} ${Me} ${Z ? "ui-item-highlighted" : ""} ${Wt ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          be && y.hit.item.checkable !== !1 && /* @__PURE__ */ h(Tr, { checked: pe, disabled: Wt, indicator: v == null ? void 0 : v.indicator }),
          se ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: se(y.hit.item, { checked: pe, disabled: Wt }) }) : /* @__PURE__ */ C(Ze, { children: [
            y.hit.item.icon && /* @__PURE__ */ h("span", { className: `${Ge.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            de && /* @__PURE__ */ h(Zn, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, bt = (y, D) => {
    var Xi;
    const Z = Be.has(y.group.key), de = p && !F.trim(), pe = Se, Me = pe && mt === D, Wt = be ? n.filter((ct) => ct.group === y.group.key && Tt.has(ct.id) && ct.checkable !== !1) : [], qt = Wt.filter((ct) => !$e.isDisabled(ct.id)).map((ct) => ct.id), Kt = be ? (Xi = v == null ? void 0 : v.groupToken) == null ? void 0 : Xi.call(v, y.group.key) : void 0, Ji = !!Kt && $e.isSelected(Kt), Vi = Ji ? "all" : qt.length > 0 ? $e.groupState(qt) : "none", Tl = Ji ? Wt.length : Wt.reduce((ct, Cl) => ct + ($e.isSelected(Cl.id) ? 1 : 0), 0), Yi = be && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (ct) => ct.preventDefault(),
        onClick: (ct) => {
          ct.stopPropagation(), Kt ? $e.toggle(Kt) : qt.length && $e.toggleGroup(qt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${Kt || qt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Tr,
          {
            checked: Vi === "all",
            indeterminate: Vi === "some",
            disabled: !Kt && qt.length === 0,
            indicator: v == null ? void 0 : v.indicator
          }
        )
      }
    ), Ui = be ? /* @__PURE__ */ C("span", { className: `shrink-0 tabular-nums text-[10px] ${pe ? "text-zinc-400" : "opacity-70"}`, children: [
      Tl,
      "/",
      Wt.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${pe ? "text-[10px] text-zinc-400" : "opacity-70"}`, children: y.group.count });
    return pe ? /* @__PURE__ */ C(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": de ? Z : void 0,
        "data-search-group": y.group.key,
        onMouseEnter: () => Xe(D, "pointer"),
        style: Fe,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Ge.itemDefault} ${Me ? "ui-item-highlighted" : ""}`,
        children: [
          Yi,
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (ct) => ct.preventDefault(),
              onClick: () => Bt(y),
              className: "flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left",
              children: [
                y.group.icon && /* @__PURE__ */ h("span", { className: `${Ge.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.group.label }),
                Ui
              ]
            }
          ),
          de && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Z ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": Z,
              onMouseDown: (ct) => ct.preventDefault(),
              onClick: (ct) => {
                ct.stopPropagation(), Rt(y.group.key);
              },
              style: { width: _e.box, height: _e.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ h(
                vn,
                {
                  size: _e.icon,
                  className: `transition-transform duration-200 ${Z ? "rotate-180" : ""}`
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
        style: qe,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          Yi,
          y.group.icon && /* @__PURE__ */ h("span", { className: `${Ge.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.group.label }),
          Ui
        ]
      },
      `group:${y.group.key}`
    );
  }, Gt = (y, D) => {
    var pe;
    const Z = mt === D, de = y.source === "leading" ? V : y.source === "footer" ? T : B;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": D,
        onMouseDown: (Me) => Me.preventDefault(),
        onMouseEnter: () => Xe(D, "pointer"),
        onClick: () => Bt(y),
        style: Fe,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ge.itemDefault} ${Z ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${Ge.icon} shrink-0`, children: ((pe = de == null ? void 0 : de[y.actionIndex]) == null ? void 0 : pe.icon) || /* @__PURE__ */ h(Pr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, Vr = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: A ? A({ query: F, close: nt }) : /* @__PURE__ */ C(Ze, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(pn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: J || `No matches for “${F.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: E || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), lr = [];
  for (let y = 0; y < ve.length; y++) {
    const D = ve[y];
    if (D.kind === "group") {
      const Z = [];
      let de = y + 1;
      for (; de < ve.length && ve[de].kind === "item" && ve[de].hit.item.group === D.group.key; )
        Z.push({ row: ve[de], index: de }), de++;
      lr.push({ group: D, index: y, items: Z }), y = de - 1;
    } else D.kind === "item" ? lr.push({ row: D, index: y }) : lr.push({ row: D, index: y });
  }
  const Yr = te ? Lr(
    /* @__PURE__ */ C(
      "div",
      {
        ref: ce,
        id: "search-menu-panel",
        "data-theme": I,
        role: "listbox",
        "aria-label": o,
        "aria-multiselectable": be ? !0 : void 0,
        onPointerEnter: ke.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), ke.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          yt.current && Xe(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: dt.left,
          top: dt.top,
          width: k ?? (t === "expandable" ? N : z || void 0),
          minWidth: R,
          maxHeight: dt.maxH,
          visibility: dt.ready ? "visible" : "hidden"
        },
        children: [
          U && /* @__PURE__ */ C("div", { className: "shrink-0 pb-1", children: [
            ft.map((y, D) => Gt(y, D)),
            ve.length > 0 && /* @__PURE__ */ h("div", { className: Ge.separator })
          ] }),
          /* @__PURE__ */ C("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            ve.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: A ? A({ query: F, close: nt }) : /* @__PURE__ */ h(Ze, { children: "Type to search…" }) }),
            lr.map((y) => {
              if (y.group) {
                const de = Be.has(y.group.group.key), pe = y.items || [];
                return /* @__PURE__ */ C(rt.Fragment, { children: [
                  bt(y.group, G + y.index),
                  Pe && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": y.group.group.key,
                      "aria-hidden": !de,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: de ? "1fr" : "0fr",
                        opacity: de ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: pe.map((Me) => Qe(Me.row, G + Me.index)) })
                    }
                  ),
                  !Pe && pe.map((Me) => Qe(Me.row, G + Me.index))
                ] }, `group:${y.group.group.key}`);
              }
              const D = y.row, Z = G + y.index;
              return D.kind === "empty" ? Vr() : D.kind === "action" ? Gt(D, Z) : D.kind === "item" ? Qe(D, Z) : null;
            })
          ] }),
          At.length > 0 && /* @__PURE__ */ C("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: Ge.separator }),
            At.map((y, D) => Gt(y, G + ve.length + D))
          ] }),
          be && (v == null ? void 0 : v.footer) !== !1 && /* @__PURE__ */ h(
            es,
            {
              count: $e.count,
              max: v == null ? void 0 : v.max,
              hiddenCount: (v == null ? void 0 : v.hiddenNote) === !1 ? 0 : $e.hiddenCount,
              clear: (v == null ? void 0 : v.clear) !== !1,
              theme: I,
              onClear: $e.clear,
              hero: (v == null ? void 0 : v.mode) === "live" ? void 0 : {
                label: Mt,
                onClick: () => {
                  $e.commit(), nt();
                },
                disabled: $e.count === 0
              }
            }
          )
        ]
      }
    ),
    le ?? xt ?? (lt == null ? void 0 : lt.body) ?? document.body
  ) : null;
  return ue ? /* @__PURE__ */ C(Ze, { children: [
    /* @__PURE__ */ h("div", { ref: at, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    Yr
  ] }) : t === "inline" ? /* @__PURE__ */ C("div", { ref: at, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    or,
    Yr
  ] }) : /* @__PURE__ */ h(
    qi,
    {
      expanded: ye,
      collapsedWidth: $,
      expandedWidth: N,
      rootRef: at,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ee ? ee({ open: te, expanded: ye, toggle: ht }) : /* @__PURE__ */ h(
        zt,
        {
          ref: Pt,
          type: "button",
          variant: "primary",
          size: "minimal",
          theme: I === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ h(pn, { className: "w-3.5 h-3.5" }),
          onClick: ht,
          className: `w-full justify-start ${ye ? "pointer-events-none" : ""}`,
          tabIndex: ye ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ C(Ze, { children: [
        sr,
        Yr
      ] })
    }
  );
}
function xn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Nl(n, e, t = "id") {
  const r = e.find((i) => xn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function $f(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function zf(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Ki(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => xn(l, t) === r);
  if (i) return xn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? xn(s, t) : r;
}
function Df(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of $f(n)) {
    const s = Ki(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function Pf(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Ki(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function Lf(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => xn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function Of(n, e, t = "id") {
  const r = new Set(e.map((i) => xn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Bf(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Nl(o, e, t)).join(", ");
}
const Ff = () => {
};
function qh({
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
  inputReadOnly: L = !1,
  disabled: $ = !1,
  autoFocus: N = !1,
  defaultOpen: k = !1,
  selectAllOnOpen: R = !0,
  uppercase: j = !1,
  allowFreeText: I = !0,
  theme: M,
  className: J = "",
  style: E,
  panelWidth: A,
  panelMinWidth: B,
  maxMenuHeight: V,
  portalTarget: X,
  autoGrow: T = !1,
  skipComma: _ = !1,
  collapsedWidth: v = 140,
  expandedWidth: ge = 280,
  createLabel: me,
  onCreateItem: ue,
  onExit: P,
  onEscape: le,
  onTabExit: ee,
  loadItems: se,
  sortItems: q,
  max: we,
  disabledIds: re,
  indicator: he,
  browse: K,
  groupToken: F
}) {
  const Le = Ut(), Ne = M ?? (Le == null ? void 0 : Le.mode) ?? "light", tt = He(), Ee = Q((H) => xn(H, i), [i]), te = Ve(() => t.map(Ee), [t, Ee]), Re = Ve(() => new Map(t.map((H) => [Ee(H), H])), [t, Ee]), ye = Q((H) => Nl(H, t, i), [t, i]), Oe = Ve(() => new Set([...m ?? []].map((H) => H.toLowerCase())), [m]), [xe, Ce] = oe(!1), [Be, Ue] = oe(""), [mt, St] = oe(""), [yt, ze] = oe(() => [...n]), [Xe, at] = oe(null), [Ct, Pt] = oe(!1), st = w(null), ut = w(null), Nt = w(null), lt = w(null), xt = w(n.join("\0")), Ge = w(!1), Fe = w(/* @__PURE__ */ new Set()), qe = w(!1), _e = w(!1), Xt = w(!1), Lt = w(0), dt = w(""), Et = w([...n]), z = n.join("\0"), Y = Ve(
    () => Bf(n, t, i, l, c),
    [n, t, i, l, c]
  ), ce = Q((H) => {
    if (a) return a([...H], t);
    if (o === "single") return H[0] ? ye(H[0]) : "";
    const ae = H.map(ye).join(", ");
    return _ ? ae : H.length ? `${ae}, ` : "";
  }, [a, t, o, ye, _]);
  ie(() => {
    xe || (ze([...n]), Et.current = [...n], xt.current = z);
  }, [z, xe]);
  const Ae = Q(() => {
    if (xe || x || $) return;
    Ge.current = !1, qe.current = !0;
    const H = ce(n);
    dt.current = H, Et.current = [...n], ze([...n]), Ue(H), St(""), Ce(!0);
  }, [xe, x, $, n, ce]);
  vt(() => {
    if (!xe) return;
    const H = st.current;
    H && (H.focus(), o === "single" && R ? H.setSelectionRange(0, H.value.length) : H.setSelectionRange(H.value.length, H.value.length));
  }, [xe]), vt(() => {
    if (!Xt.current) return;
    Xt.current = !1;
    const H = st.current;
    H && (H.focus(), H.setSelectionRange(H.value.length, H.value.length));
  }, [Be]), ie(() => {
    (k || N) && Ae();
  }, []);
  const ve = o === "single" ? mt : zf(Be), ft = se ? Xe ?? [] : t, At = Ve(
    () => q ? q(ft, yt) : ft,
    [ft, q, yt]
  ), S = ve.trim(), U = !!ue && I && !Ct && !!S && !Lf(S, ft, i);
  ie(() => {
    if (!se || !xe) return;
    const H = ve.trim();
    if (!H) {
      at(null), Pt(!1);
      return;
    }
    Pt(!0);
    const ae = ++Lt.current, ke = setTimeout(() => {
      se(H).then((Qe) => {
        Lt.current === ae && (at(Qe), Pt(!1));
      }).catch(() => {
        Lt.current === ae && (at([]), Pt(!1));
      });
    }, 400);
    return () => clearTimeout(ke);
  }, [se, xe, ve]);
  const G = Ve(() => {
    const H = At.filter((ae) => !ae.hidden).map((ae) => ({
      id: Ee(ae),
      label: ae.label,
      group: ae.group,
      detail: ae.detail,
      icon: ae.icon,
      disabled: !!ae.disabled || !!(re != null && re.includes(Ee(ae))),
      fields: ae.fields,
      keywords: ae.keywords,
      rowClassName: ae.rowClassName,
      rowStyle: ae.rowStyle
    }));
    return U && H.unshift({
      id: S,
      label: me ? me(S) : `Add “${S}”…`,
      keywords: S,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), H;
  }, [At, Ee, re, U, S, me]), fe = Q((H) => {
    const ae = H.join("\0");
    if (ae !== xt.current) {
      if (hn(H, n)) {
        xt.current = ae;
        return;
      }
      if (xt.current = ae, e(H), ue)
        for (const ke of Of(H, t, i))
          Fe.current.has(ke) || (Fe.current.add(ke), ue(ke));
    }
  }, [n, e, ue, t, i]), Se = Q((H, ae) => {
    !ae || !ue || !I || t.some((ke) => Ee(ke) === H) || Fe.current.has(H) || (Fe.current.add(H), ue(H));
  }, [ue, I, t, Ee]), Te = Q((H = !0) => {
    if (!qe.current || (qe.current = !1, x || $)) return;
    if (Ge.current) {
      Ge.current = !1;
      return;
    }
    const ae = dt.current, ke = new Set(te), Qe = o === "single" ? (() => {
      const bt = ae.trim();
      if (!bt) return I ? [] : n;
      const Gt = Ki(bt, t, i);
      return !I && !ke.has(Gt) ? n : [Gt];
    })() : Ht(
      Df(ae, t, i).filter((bt) => I || ke.has(bt)),
      te
    );
    Et.current = Qe, ze(Qe), St(""), Ce(!1), fe(Qe), H && !_e.current && (P == null || P());
  }, [x, $, o, t, i, te, I, n, fe, P]), Pe = Q((H) => {
    Ce(H), H || Te();
  }, [Te]), be = Q(() => {
    Ge.current = !0, qe.current = !1;
    const H = ce(n);
    dt.current = H, Et.current = [...n], ze([...n]), Ue(H), St(""), Ce(!1), le == null || le();
  }, [n, ce, le]);
  ie(() => {
    var Qe;
    if (!xe) return;
    const ae = (((Qe = ut.current) == null ? void 0 : Qe.ownerDocument) ?? document).defaultView;
    if (!ae) return;
    const ke = (bt) => {
      bt.key === "Escape" && (bt.preventDefault(), bt.stopImmediatePropagation(), be());
    };
    return ae.addEventListener("keydown", ke, !0), () => ae.removeEventListener("keydown", ke, !0);
  }, [xe, be]);
  const Ke = Q((H) => {
    const ae = Ht(H, te), ke = ce(ae);
    Et.current = ae, dt.current = ke, ze(ae), Xt.current = !0, Ue(ke);
  }, [te, ce]), Ot = Q((H) => {
    const ae = H.id;
    qe.current = !1;
    const ke = ye(ae);
    Et.current = [ae], dt.current = ke, ze([ae]), Ue(ke), St(""), Ce(!1), fe([ae]), _e.current || P == null || P();
  }, [ye, fe, P]), Tt = (H) => {
    var ae, ke, Qe, bt, Gt;
    if (H.key === "Escape") {
      H.preventDefault(), be();
      return;
    }
    if (H.key === "Tab") {
      if (H.preventDefault(), o === "single" && xe) {
        _e.current = !0;
        const Vr = (ae = lt.current) == null ? void 0 : ae.activateHighlighted();
        if (_e.current = !1, Vr) {
          (ke = ee ?? P) == null || ke(st.current ?? void 0);
          return;
        }
      }
      xe && Te(!1), (Qe = ee ?? P) == null || Qe(st.current ?? void 0);
      return;
    }
    if (H.key === "ArrowDown" || H.key === "ArrowUp") {
      if (H.preventDefault(), !xe) {
        Ae();
        return;
      }
      (bt = lt.current) == null || bt.moveHighlight(H.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (H.key === "Enter") {
      if (H.preventDefault(), H.stopPropagation(), xe && ((Gt = lt.current) != null && Gt.activateHighlighted())) return;
      Te();
      return;
    }
  }, $e = (H) => {
    var ke;
    const ae = j ? H.target.value.toUpperCase() : H.target.value;
    if (dt.current = ae, Ue(ae), o === "single" && St(ae), xe || Ce(!0), o === "multiple") {
      const Qe = Ht(Pf(ae, t, i), te);
      Et.current = Qe, ze(Qe), (ke = lt.current) == null || ke.setSelection(Qe);
    }
  }, $t = () => {
    if (qe.current) {
      if (Ge.current) {
        Ge.current = !1;
        return;
      }
      Te();
    }
  }, Mt = Q((H, ae) => {
    const ke = Re.get(H.id);
    if (!ke)
      return /* @__PURE__ */ C(Ze, { children: [
        /* @__PURE__ */ h(Pr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: H.label })
      ] });
    const Qe = !!m && (i === "label" ? Oe.has(ke.label.toLowerCase()) : m.has(Ee(ke))), bt = (f == null ? void 0 : f(ke)) ?? ke.badge ?? null;
    return /* @__PURE__ */ C(Ze, { children: [
      d ? d(ke, ae.checked) : /* @__PURE__ */ C(Ze, { children: [
        ke.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: ke.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: ke.label }),
        bt && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: bt }),
        p == null ? void 0 : p(ke)
      ] }),
      Qe && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ h(Bl, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [Re, m, Oe, i, Ee, f, d, p, g]), nt = /* @__PURE__ */ h(
    Af,
    {
      ref: lt,
      mode: "inline",
      hideTrigger: !0,
      open: xe,
      onOpenChange: Pe,
      anchorRef: s === "morph" ? Nt : ut,
      items: G,
      groups: r,
      query: ve,
      onSelect: Ot,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? yt[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: yt,
        mode: "live",
        onDraftChange: Ke,
        onToggle: Se,
        onCommit: Ff,
        max: we,
        disabledIds: re,
        indicator: he,
        groupToken: F
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (K ?? "open") === "open",
      expandableGroups: r.length > 0 && K === "accordion",
      groupExpandMode: "single",
      renderItem: Mt,
      emptyTitle: Ct ? "Searching…" : void 0,
      emptyHint: Ct ? "Fetching matching records." : void 0,
      theme: Ne,
      panelWidth: A,
      panelMinWidth: B,
      maxMenuHeight: V,
      portalTarget: X
    }
  ), Je = s === "chip", Rt = s === "wrap", ht = !Je && !Rt && T, Bt = !xe && !Y, rn = xe ? Be : Y, Tn = {
    ref: st,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: xe ? Be : Je ? n.join(", ") : Y,
    disabled: $,
    readOnly: L,
    placeholder: "",
    onFocus: Ae,
    onClick: Ae,
    onChange: $e,
    onBlur: $t,
    onKeyDown: Tt,
    autoComplete: "off",
    spellCheck: !1
  }, rr = O(5, 7, tt), ir = O(9, 12, tt), or = O(12, 14, tt);
  if (s === "morph")
    return /* @__PURE__ */ h(
      qi,
      {
        expanded: xe,
        collapsedWidth: v,
        expandedWidth: ge,
        rootRef: ut,
        "data-picker-field": !0,
        className: J,
        style: E,
        trigger: u ? u({ values: [...n], items: t, display: Y, open: xe, toggle: Ae }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              disabled: $,
              onClick: Ae,
              className: "flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${rr}px ${ir}px`, fontSize: or },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${Bt ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: Y || b }),
                /* @__PURE__ */ h(vn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ C("div", { ref: Nt, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...Tn,
              className: `${Cr("sm")} h-full w-full`
            }
          ),
          nt
        ] })
      }
    );
  const sr = Je ? O(5, 7, tt) : 0, on = Je ? O(9, 12, tt) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: ut,
      "data-picker-field": !0,
      className: `relative ${Je ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Rt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${J}`,
      style: Je ? { padding: `${sr}px ${on}px`, fontSize: O(12, 14, tt), ...E } : E,
      children: /* @__PURE__ */ h(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: Y,
          className: Je ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ C(
    "div",
    {
      ref: ut,
      "data-picker-field": !0,
      className: `relative ${Je ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Rt ? "min-h-[1lh] w-full pb-[1lh]" : ht ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${J}`,
      style: Je ? { padding: `${sr}px ${on}px`, fontSize: or, ...E } : E,
      onMouseDown: (H) => H.stopPropagation(),
      onContextMenu: (H) => {
        H.preventDefault(), H.stopPropagation();
      },
      onAuxClick: Ae,
      children: [
        Je && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: Y, open: xe, toggle: Ae }) }) : l === "chips" && !xe ? /* @__PURE__ */ C("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((H) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: ye(H)
            },
            H
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${Je ? "min-w-0 flex-1 truncate" : Rt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Bt ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: rn || b
          }
        ),
        Rt ? /* @__PURE__ */ h(
          "textarea",
          {
            ...Tn,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...Tn,
            className: ht ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: ht ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : Je ? { caretColor: "#2563eb", color: "transparent", paddingLeft: on, paddingRight: on + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        Je && /* @__PURE__ */ h(vn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        nt
      ]
    }
  );
}
export {
  zt as Button,
  jh as CardSection,
  Ci as CheckMark,
  kc as Checkbox,
  Nh as Checklist,
  Ph as ChromeHeader,
  Dh as ContentRow,
  fh as ContextMenu,
  ph as ContextMenuDivider,
  hh as ContextMenuItem,
  mh as ContextMenuSub,
  Ko as DROPDOWN_MAX_HEIGHT,
  Sh as DatePicker,
  xh as DialogProvider,
  $c as DropdownItem,
  _r as DropdownMenu,
  zc as DropdownSubmenu,
  Ei as DropdownThemeContext,
  bf as FONTS,
  Ch as FloatingChrome,
  kh as FloatingToggle,
  wf as FontMenu,
  Hh as FormatToolbar,
  et as IS_COARSE,
  cc as IS_TOUCH_CAPABLE,
  dh as ItemManagerDropdown,
  vh as LongPressMenuProvider,
  wi as MORPH_EASE,
  wn as MORPH_MS,
  ki as MORPH_OPACITY_MS,
  nr as MenuHighlightContext,
  is as MenuSearchContext,
  Pc as Modal,
  gh as ModalFooter,
  ur as ModalFooterButton,
  Wh as MorphActionField,
  Ef as MorphSearchField,
  Zo as NO_SELECTION_IDS,
  _h as NumberInput,
  qh as PickerField,
  lc as PopoutWindowContext,
  Fh as RICH_TEXT_STATE_IDLE,
  Th as RadioList,
  xf as RichTextEditor,
  Nf as SCRUB_PX_PER_STEP,
  Af as SearchMenu,
  zh as SectionHeader,
  $h as Seg,
  Tr as SelectionCheck,
  Qo as SelectionContext,
  es as SelectionFooter,
  Lh as StructureControls,
  Ri as SubmenuContext,
  uh as TAB_PILL,
  ta as TB_BTN,
  dr as TB_BTN_ICON,
  na as TB_DANGER,
  fs as TB_DIVIDER,
  ra as TB_INPUT,
  Ah as TB_NUM,
  oa as TB_PICKER,
  Eh as TB_ROW_LABEL,
  ia as TB_SEG,
  Mh as TB_TOGGLE,
  Ih as TB_TOGGLE_OFF,
  Rh as TB_TOGGLE_ON,
  Cc as TabFace,
  ch as ThemeProvider,
  ah as ThemeScope,
  uf as Token,
  af as TokenChipView,
  fr as ToolButton,
  Mn as Tooltip,
  Si as ZOOM_FROM,
  If as buildSearchMenuRows,
  gc as buttonCloudOf,
  Wi as clampNumber,
  fc as cloneOverlayClose,
  O as coarsePx,
  vc as countHidden,
  Bh as escapeHtml,
  Bf as formatPickerValues,
  Fo as getCoarseScale,
  Fr as getDropdownClasses,
  sh as getHardwareKeyboard,
  oh as getLastPointerType,
  Zi as groupSelectionState,
  Lf as hasPickerMatch,
  Cr as inputCls,
  qc as isInteractiveElement,
  ci as isTouchLike,
  zf as lastPickerSegment,
  Rf as matchSearchItem,
  Uo as menuAttributesOf,
  pc as menuThemeOf,
  Wo as nearestOverlayOrigin,
  wl as normalizeSpaces,
  Ht as orderByCatalogue,
  Ur as overlayMorphEnabled,
  Mf as parseSearchTags,
  Pf as pickerCommittedKeys,
  xn as pickerItemKey,
  Nl as pickerItemLabel,
  $f as pickerSegments,
  dc as playOverlayClose,
  uc as playOverlayOpen,
  Ro as preprocessTokenHtml,
  Ki as resolvePickerSegment,
  Df as resolvePickerText,
  dn as revealRowInScroller,
  hn as sameSelection,
  sf as sanitizeRichText,
  Tf as scrubbedValue,
  Sl as searchMenuContent,
  mc as segModeOf,
  rh as setCoarseScale,
  Qi as setSelected,
  Sf as steppedValue,
  Oh as stripRichText,
  lf as stripTokenWrappers,
  bc as toggleSelected,
  Of as unknownPickerValues,
  ih as useCoarse,
  He as useCoarseScale,
  un as useCoarseSize,
  vi as useCurrentDocument,
  er as useCurrentWindow,
  yh as useDialog,
  Jo as useDropdownPosition,
  ts as useDropdownTheme,
  lh as useHardwareKeyboard,
  us as useInputSize,
  Mi as useItemSize,
  Ut as useKitTheme,
  ac as useLastPointerType,
  bh as useLongPressOptOut,
  Ii as useMenuHighlight,
  Rc as useMenuSearch,
  Br as useOverlayMorph,
  bi as usePopoutWindow,
  Fn as usePortalTarget,
  Xo as useRevealRowOnOpen,
  Go as useSelection,
  wc as useSelectionContext,
  ea as useSlidingPill,
  wh as useTouchMode
};
