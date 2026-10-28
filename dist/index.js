"use client";
import { jsx as h, jsxs as E, Fragment as rt } from "react/jsx-runtime";
import nt, { createContext as Vt, useContext as Yt, useState as re, useEffect as le, useRef as w, useCallback as ne, useLayoutEffect as ht, useMemo as Qe, useId as Dl, useImperativeHandle as Fo } from "react";
import * as $e from "@radix-ui/react-dropdown-menu";
import { Minus as Pl, Check as cr, Search as zn, X as Nn, Pencil as Ll, CopyPlus as Ho, Trash2 as di, RotateCcw as _o, Plus as Hr, ChevronRight as Mr, ChevronLeft as Ol, ArrowUp as Bl, ArrowDown as Fl, ChevronDown as fn, Underline as Hl, Strikethrough as _l, RemoveFormatting as jl, Link as Wl, ChevronUp as ql, Anchor as Kl } from "lucide-react";
import { computePosition as Jl, offset as jo, flip as Wo, shift as qo, size as Vl, useFloating as Yl, autoUpdate as Ul } from "@floating-ui/react-dom";
import * as cn from "@radix-ui/react-dialog";
import { createPortal as _r } from "react-dom";
import { mergeAttributes as Gl, ReactNodeViewRenderer as Xl, NodeViewWrapper as Ql, useEditor as Zl, EditorContent as ec } from "@tiptap/react";
import { PluginKey as Kt, Plugin as ln, Selection as Pn, TextSelection as Ft, NodeSelection as Fn, AllSelection as tc } from "@tiptap/pm/state";
import { DecorationSet as hr, Decoration as nc } from "@tiptap/pm/view";
import rc from "@tiptap/starter-kit";
import ic from "@tiptap/extension-placeholder";
import { TextStyle as oc, FontFamily as sc, FontSize as lc } from "@tiptap/extension-text-style";
import cc from "@tiptap/extension-color";
import ac from "@tiptap/extension-link";
import uc from "@tiptap/extension-underline";
import dc from "@tiptap/suggestion";
import { Mention as fc } from "@tiptap/extension-mention";
import { createRoot as hc } from "react-dom/client";
const pc = Vt(null);
function Si() {
  return Yt(pc);
}
function Wn() {
  const n = Si();
  return n ? n.document.body : null;
}
function Ni() {
  const n = Si();
  return n ? n.document : typeof document < "u" ? document : null;
}
function ar() {
  return Si() ?? (typeof window < "u" ? window : null);
}
const ur = typeof window < "u", et = ur && window.matchMedia("(pointer: coarse)").matches, mc = ur && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let jr = 0.5;
const tr = /* @__PURE__ */ new Set();
function uh(n) {
  jr = Math.max(0, Math.min(1, n)), tr.forEach((e) => e());
}
function Ko() {
  return jr;
}
function dh() {
  const [, n] = re(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), et && jr > 0;
}
function De() {
  const [, n] = re(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), jr;
}
function O(n, e, t) {
  return et ? Math.round(n + (e - n) * t) : n;
}
function hn(n, e) {
  const t = De();
  return et && t > 0 ? {
    padding: `${O(n.py, e.py, t)}px ${O(n.px, e.px, t)}px`,
    fontSize: `${O(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Jo() {
  const n = De(), e = et && n > 0;
  return {
    box: e ? O(28, 36, n) : 20,
    icon: e ? O(16, 20, n) : 14
  };
}
function fi(n) {
  return n === "touch" || n === "pen";
}
let Dn = null;
const hi = /* @__PURE__ */ new Set();
ur && window.addEventListener("pointerdown", (n) => {
  Dn = n.pointerType, hi.forEach((e) => e());
}, !0);
function fh() {
  return Dn;
}
function gc() {
  const [, n] = re(0), e = w(Dn);
  return le(() => {
    const t = () => {
      e.current !== Dn && (e.current = Dn, n((r) => r + 1));
    };
    return hi.add(t), () => {
      hi.delete(t);
    };
  }, []), Dn;
}
const Vo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Yo() {
  return ur ? Vo.some((n) => window.matchMedia(n).matches) : !1;
}
let Rr = Yo();
const pi = /* @__PURE__ */ new Set();
function no(n) {
  Rr !== n && (Rr = n, pi.forEach((e) => e()));
}
var Bo;
if (ur) {
  const n = () => no(Yo());
  for (const s of Vo) {
    const l = window.matchMedia(s);
    (Bo = l.addEventListener) == null || Bo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || no(!0));
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
function hh() {
  return Rr;
}
function ph() {
  const [, n] = re(0);
  return le(() => {
    const e = () => n((t) => t + 1);
    return pi.add(e), () => {
      pi.delete(e);
    };
  }, []), Rr;
}
const pn = 220, Ti = "cubic-bezier(0.32, 0.72, 0, 1)", Ci = 170, Ei = 0.94;
function Zr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Uo(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Go(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Uo({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function yc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Ei})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Go(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${pn}ms ${Ti}, opacity ${Ci}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, pn + 60);
    });
  });
}
function xc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Go(e, t);
  e.style.transition = `transform ${pn}ms ${Ti}, opacity ${Ci}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Ei})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, pn + 60);
}
function bc(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Uo({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${pn}ms ${Ti}, opacity ${Ci}ms ease`, r.style.transform = `scale(${Ei})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, pn + 60));
    });
  });
}
function Wr(n) {
  const e = w(null), [t, r] = re(!1), i = w(null), o = w(0), s = ne((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Zr(f.current) && bc(g, u.current, i.current));
    });
  }, []), l = ne(() => {
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
  return ht(() => {
    if (!t || !c.current || !Zr(f.current)) return;
    const m = e.current;
    m && yc(p, m, u.current);
  }, [t, n.visible]), le(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), ht(() => {
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Zr(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    xc(p, g, u.current, () => {
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
const Xo = 384;
function vc(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Qo({
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
  const u = ar(), d = w(u);
  d.current = u;
  const f = w(a);
  f.current = a, ht(() => {
    if (!t) return;
    let p = 0, m = !1;
    const g = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const R = d.current, J = n.current, L = e.current;
      if (!R || !J || !L || !L.isConnected) return;
      const A = (r == null ? void 0 : r.current) ?? L, q = vc(R), S = l ?? Xo, z = Math.min(c, S), _ = Math.max(0, L.offsetHeight - A.offsetHeight), H = Math.max(z, Math.ceil(A.scrollHeight + _)), U = Math.min(H, S);
      L.style.maxHeight = `${U}px`;
      let N = U;
      const V = i == null ? void 0 : i.current;
      Jl(V ? {
        getBoundingClientRect: () => ({
          left: V.left,
          top: V.top,
          width: V.width,
          height: V.height,
          right: V.left + V.width,
          bottom: V.top + V.height,
          x: V.left,
          y: V.top,
          toJSON: () => {
          }
        })
      } : J, L, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          jo(o),
          Wo({ boundary: q, padding: s, fallbackStrategy: "bestFit" }),
          qo({ boundary: q, padding: s, mainAxis: !1 }),
          Vl({
            boundary: q,
            padding: s,
            apply({ availableHeight: fe }) {
              N = Math.max(z, Math.floor(Math.min(S, fe))), L.style.maxHeight = `${N}px`;
            }
          })
        ]
      }).then(({ x: fe, y: I, placement: ye }) => {
        m || f.current({
          top: Math.round(I),
          left: Math.round(fe),
          maxH: N,
          side: ye.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, T = (x == null ? void 0 : x.document) ?? null, M = (x == null ? void 0 : x.visualViewport) ?? null, C = () => g();
    M == null || M.addEventListener("resize", C), M == null || M.addEventListener("scroll", C), x == null || x.addEventListener("resize", C), T == null || T.addEventListener("scroll", C, { capture: !0, passive: !0 });
    let v = null;
    return typeof ResizeObserver < "u" && (v = new ResizeObserver(C), e.current && v.observe(e.current), r != null && r.current && v.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), M == null || M.removeEventListener("resize", C), M == null || M.removeEventListener("scroll", C), x == null || x.removeEventListener("resize", C), T == null || T.removeEventListener("scroll", C, { capture: !0 }), v == null || v.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
let Rn = null;
function Zo(n) {
  return Rn == null || Rn(), Rn = n, () => {
    Rn === n && (Rn = null);
  };
}
const es = Vt(null);
function Mi(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ri({ theme: n, children: e }) {
  return /* @__PURE__ */ h(es.Provider, { value: n, children: e });
}
function mh({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Ut();
  return /* @__PURE__ */ h(Ri, { theme: Mi({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function gh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Ut(), c = Mi({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(Ri, { theme: c, children: /* @__PURE__ */ h(
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
  return Yt(es);
}
function wc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function ts(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = wc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function kc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Sc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Nc(n) {
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
  const r = t ?? Nc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function ns({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = w(!1), s = w(!1), l = w(!1), c = w({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = ne(() => {
    o.current = !0;
  }, []);
  return ht(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (mn(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), le(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      mn(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const Tc = [];
function Bt(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function bn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function Cc(n, e, t, r = {}) {
  var o;
  const i = Bt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Bt([...i, e], t);
}
function ro(n, e, t, r, i = {}) {
  const o = Bt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = Bt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : Bt([...o, ...u], r);
}
function io(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function Ec(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function rs(n) {
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
  } = n, [f, p] = re(() => Bt(t, r)), m = Qe(() => new Set(s ?? []), [s]), g = Qe(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !bn(f, t), T = ne((q) => {
    if (m.has(q)) return;
    const S = g.has(q), z = Cc(f, q, r, { max: o, disabledIds: s });
    bn(z, f) || (p(z), d == null || d(z), u == null || u(q, !S));
  }, [f, g, m, r, o, s, u, d]), M = ne((q) => {
    const S = q.filter((H) => !m.has(H)), z = io(f, S), _ = ro(f, S, z !== "all", r, { max: o, disabledIds: s });
    bn(_, f) || (p(_), d == null || d(_));
  }, [f, m, r, o, s, d]), C = ne((q, S = i ?? r) => {
    const z = ro(f, S, q, r, { max: o, disabledIds: s });
    bn(z, f) || (p(z), d == null || d(z));
  }, [f, i, r, o, s, d]), v = ne(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), R = ne((q) => {
    p(Bt(q ?? t, r));
  }, [t, r]), J = ne(() => !a || bn(f, t) ? !1 : (a(Bt(f, r)), !0), [a, f, t, r]), L = ne(() => !c || bn(f, t) ? !1 : (c(Bt(f, r)), !0), [c, f, t, r]), A = ne((q) => io(f, q), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: Ec(f, r, i),
    isSelected: (q) => g.has(q),
    isDisabled: (q) => m.has(q),
    canToggle: (q) => !m.has(q) && (g.has(q) || !b),
    toggle: T,
    toggleGroup: M,
    setAll: C,
    clear: v,
    reset: R,
    commit: J,
    flush: L,
    cancel: R,
    groupState: A
  };
}
const is = Vt(null), Mc = () => Yt(is), ss = Tc;
function Ai({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ E("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ E("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ h("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Rc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = De(), p = O(16, 20, f), m = O(12, 14, f), g = O(12, 14, f), b = O(12, 16, f), x = O(10, 12, f), T = O(8, 10, f);
  return /* @__PURE__ */ E(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: T, padding: d ? `${x}px ${b}px` : void 0 },
      onClick: (C) => C.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ h(
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
        d ? /* @__PURE__ */ h(Ai, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const oo = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Ac = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Ic = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", $c = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function zc(n) {
  if (!nt.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function ls({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: l }) {
  const c = !!e && !!n, a = c && !t, u = !!n && (t || c), d = zc(n), [f, p] = re({ sig: d, node: n }), [m, g] = re(null);
  d !== f.sig && (p({ sig: d, node: n }), g(f.node)), le(() => {
    if (m == null) return;
    const x = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(x);
  }, [m]);
  const b = m == null ? n : /* @__PURE__ */ E("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ h("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: m }, `out:${f.sig}`),
    /* @__PURE__ */ h("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${d}`)
  ] });
  return c ? /* @__PURE__ */ E(rt, { children: [
    u && (a ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${oo} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Ic}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: b }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: b })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${oo} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Ac}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${$c}`} ${a ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: a ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ E("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ h("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ h("span", { className: "col-start-1 row-start-1", children: l })
        ] }) : l
      }
    ) }) })
  ] }) : /* @__PURE__ */ E(rt, { children: [
    u && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    l
  ] });
}
const yh = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function It({
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
  const T = Ut(), M = e ?? (T == null ? void 0 : T.mode) ?? "light", C = t ?? Sc(T), v = hn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), R = hn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), J = hn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), L = "", A = "", q = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, S = "rounded", z = "rounded-[var(--ui-radius-btn)]", _ = {
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
  }, U = {
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
  }, V = {
    light: {
      subtle: { base: `${L} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${A} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${L} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${L} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${L} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${A} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      outline: {
        base: `${L} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${L} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, W = {
    blue: { base: `${A} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${A} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, fe = x["data-state"] === "open", I = V[M][n], ye = n === "primary" ? R : n.startsWith("tab") ? J : v, pe = et ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, xe = O(6, 8, De()), G = O(28, 40, De()), ee = C === "emerald" ? "emerald" : C ? "blue" : null, Y = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", ge = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let D;
  if (n === "tab") {
    const Q = _[M];
    D = `${S} ${r ? ee ? H[ee].active : Q.active : ee ? H[ee][M === "light" ? "inactiveLight" : "inactiveDark"] : Q.inactive}`;
  } else if (n === "tab-header") {
    const Q = ee ? r ? N[ee].active : N[ee].inactive : r ? U.active : U.inactive;
    D = `${S} ${Q} ${fe ? ee ? N[ee].open : U.open : ""}`;
  } else {
    if (D = `${z} ${I.base} ${fe ? I.open : ""}`, n === "primary" && ee) {
      const Q = W[ee];
      D = `${z} ${fe ? `${Q.base} ${Q.open}` : Q.base}`;
    }
    r && (D = `${D} ${i === "neutral" ? Y : ge[i]}`);
  }
  const oe = !!f && !!d && !o, F = o ? { width: G, height: G, padding: 0, gap: 0 } : s === "minimal" ? { ...pe, gap: oe ? 0 : xe } : { ...ye, gap: oe ? 0 : xe };
  return /* @__PURE__ */ h(
    "button",
    {
      type: g,
      "data-mode": M,
      "data-accent": T == null ? void 0 : T.accent,
      className: `${q} ${o ? "justify-center" : ""} ${oe ? "group" : ""} ${D} ${m}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: F,
      ...x,
      children: o ? b : /* @__PURE__ */ h(
        ls,
        {
          icon: d,
          collapse: f,
          iconWithLabel: p,
          active: r && (n.startsWith("tab") || c),
          gap: xe,
          reserve: a,
          roll: u,
          children: b
        }
      )
    }
  );
}
function Ar({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = De(), l = i ?? O(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(Pl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(cr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(Ai, { checked: n, indeterminate: e, size: l })
    }
  );
}
function cs({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = De(), a = O(10, 14, c), u = O(6, 9, c), d = O(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ E(
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
        /* @__PURE__ */ E(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ E("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                t,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ h(
          It,
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
          It,
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
const Ii = Vt("dark"), as = () => Yt(Ii), $i = Vt({ "data-theme": "dark" }), Dc = () => Yt($i);
function zi() {
  const n = De();
  return {
    padding: `${O(8, 12, n)}px ${O(12, 16, n)}px`,
    fontSize: `${O(12, 14, n)}px`,
    lineHeight: `${O(18, 22, n)}px`
  };
}
function us() {
  const n = De();
  return {
    padding: `${O(6, 9, n)}px ${O(12, 16, n)}px ${O(2, 3, n)}px`,
    fontSize: `${O(10, 11, n)}px`,
    lineHeight: `${O(14, 16, n)}px`
  };
}
const Pc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", so = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Lc = (n) => n ? "text-xs" : "text-[10px]";
function qr(n) {
  const e = et && Ko() > 0;
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
    headerPad: so(e),
    headerText: `${so(e)} font-semibold uppercase tracking-wider ${Lc(e)} ui-label`,
    // Item padding
    itemPad: Pc(e),
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
function ds(n) {
  const e = [];
  return nt.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (nt.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Di = Vt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), dr = Vt(null), Pi = () => Yt(dr), fs = Vt({ query: "", setQuery: () => {
} }), Oc = () => Yt(fs), hs = Vt(null), Bc = () => Yt(hs), Fc = () => !0;
function Kr(n) {
  const e = w([]), [t, r] = re(-1), [i, o] = re(!1), [s, l] = re(0), c = ne((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = ne((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = ne(() => {
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
function ps(n) {
  const e = Pi(), t = w(e);
  t.current = e;
  const r = w(null);
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
function Li(n, e, t, r) {
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
    var g, b, x, T, M, C;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const v = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((T = l.current) != null && T.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), v && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = u.key === "ArrowDown" ? 1 : -1, R = (i.current + v + m.length) % m.length;
        o.current.setHighlighted(R, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < m.length && m[v].submenu && m[v].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (C = (M = l.current) == null ? void 0 : M.onCloseSub) == null || C.call(M);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < m.length && m[v].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = Date.now(), R = (v - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: R, time: v }, !R) return;
        const J = i.current + 1;
        for (let L = 0; L < m.length; L++) {
          const A = (J + L) % m.length;
          if (m[A].label.toLowerCase().startsWith(R)) {
            o.current.setHighlighted(A, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Oi(n, e, t, r, i, o, s) {
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
function Bi(n, e) {
  const t = w(n);
  t.current = n;
  const r = w(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Jr({
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
  const T = Ut(), M = ts(s, T), C = M.theme, [v, R] = re([]), [J, L] = re(null), A = Wn(), q = Ni(), S = w(null), z = w(null), _ = w(n);
  _.current = n;
  const [H, U] = re(n), [N, V] = re(""), W = f && g !== void 0, fe = W ? g : N, I = W ? b ?? (() => {
  }) : V, ye = w(g ?? "");
  le(() => {
    n || (ye.current = g ?? "");
  }, [n, g]);
  const pe = W && fe === ye.current ? "" : fe, xe = Dl(), G = w(null), ee = De(), Y = {
    padding: `${O(8, 12, ee)}px ${O(12, 16, ee)}px`,
    fontSize: `${O(12, 14, ee)}px`
  }, [ge, D] = re(0), oe = f && !W;
  le(() => {
    var Ve;
    if (!oe || !n) return;
    const $ = (Ve = z.current) == null ? void 0 : Ve.querySelector("[data-menu-items]");
    if (!$) return;
    const X = () => D($.offsetWidth - $.clientWidth);
    X();
    const he = new ResizeObserver(X);
    return he.observe($), () => he.disconnect();
  }, [n, oe, fe]);
  const F = Qe(() => {
    if (!f) return;
    const $ = pe.trim().toLowerCase();
    return $ ? (X) => {
      var he;
      return m ? m($, X.label, X.group) : X.label.toLowerCase().includes($) || (((he = X.group) == null ? void 0 : he.toLowerCase().includes($)) ?? !1);
    } : Fc;
  }, [pe, f, m]), Q = Kr(F), Pe = f && pe.trim() !== "" && Q.items.length === 0, te = !!x, it = Q.allItems.map(($) => $.itemId).filter(($) => !!$), Le = Q.items.map(($) => $.itemId).filter(($) => !!$), Ae = rs({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? ss,
    itemIds: it,
    visibleIds: Le,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), ze = w(Ae.reset);
  ze.current = Ae.reset;
  const ae = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Ae.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Ae.count}`;
  le(() => {
    if (n)
      return U(!0), W || V(""), Q.setHighlighted(d ?? -1, "keyboard"), ze.current(), Zo(() => {
        t == null || t(!1), e == null || e();
      });
    R([]);
  }, [n, d, t, e]), le(() => {
    if (!n || !q) return;
    const $ = (X) => {
      if (X.pointerType !== "touch") return;
      const he = X.target;
      he && (z.current && z.current.contains(he) || S.current && S.current.contains(he) || he instanceof Element && he.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return q.addEventListener("pointerdown", $, { capture: !0 }), () => q.removeEventListener("pointerdown", $, { capture: !0 });
  }, [n, q, t, e]);
  const Te = ne(() => {
    const $ = S.current;
    if (!$) return null;
    const X = $.getBoundingClientRect();
    return { left: X.left, top: X.top, width: X.width, height: X.height };
  }, []), Se = Wr({
    visible: n,
    morph: c,
    anchor: Te,
    onClosed: () => U(!1)
  }), qe = w(() => {
  }), Ke = w(() => {
  }), ot = w(() => {
  }), ve = ne(($) => {
    if ($.key === "Enter") {
      const X = Q.highlightedIndex, he = Q.items[X >= 0 ? X : 0];
      return he == null || he.activate(), !0;
    }
    return $.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [Q, t, e]);
  Li(n && v.length === 0, Q, qe, {
    onFieldKey: ve,
    onSelectAll: te ? () => Ae.setAll(!0) : void 0
  }), Bi(n, Ke), Oi(n, Q, qe, z, v.length > 0, ot, {
    ignoreFields: W,
    selectAll: te
  });
  const st = w(null), Je = ne(($) => {
    var X;
    if ($) {
      $.addEventListener("keydown", qe.current, { capture: !0 }), $.addEventListener("wheel", Ke.current, { passive: !1 });
      const he = $.ownerDocument;
      st.current = he, he.addEventListener("keydown", ot.current, { capture: !0 }), pt(!0);
    } else
      (X = st.current) == null || X.removeEventListener("keydown", ot.current, { capture: !0 }), st.current = null, pt(!1);
    z.current = $, Se($);
  }, [Se]), [Ue, Pt] = re({ top: 0, left: 0, maxH: Xo, side: "bottom", ready: !1 }), [Lt, He] = re(0), [lt, pt] = re(!1);
  le(() => {
    n && S.current && He(S.current.getBoundingClientRect().width);
  }, [n]), Qo({
    anchorRef: S,
    panelRef: z,
    open: n && lt,
    maxHeight: u,
    onPosition: Pt
  }), le(() => {
    var $;
    if (Ue.ready && n) {
      if (f) {
        ($ = G.current ?? S.current) == null || $.focus();
        return;
      }
      const X = z.current;
      X && X.ownerDocument.activeElement !== X && !X.contains(X.ownerDocument.activeElement) && X.focus();
    }
  }, [Ue.ready, n, f]), le(() => {
    if (!n || !f) return;
    if (Q.items.length === 0) {
      Q.highlightedIndex !== -1 && Q.setHighlighted(-1, "keyboard");
      return;
    }
    const $ = Q.highlightedIndex;
    ($ < 0 || $ >= Q.items.length) && Q.setHighlighted(0, "keyboard");
  }, [n, fe, f, Q.items.length]), ht(() => {
    var X;
    if (!n || Q.highlightedIndex < 0 || Q.pointerDriven) return;
    const $ = (X = z.current) == null ? void 0 : X.querySelector(`[data-ei="${Q.highlightedIndex}"]`);
    mn($, "nearest");
  }, [n, Q.highlightedIndex, Q.pointerDriven]);
  const mt = ne(($) => {
    if (!(!$ && !_.current)) {
      if (!$ && kt.current) {
        if (W) return;
        bt.current = !0;
      }
      t ? t($) : $ || e == null || e();
    }
  }, [t, e]), xt = w(H);
  xt.current = H;
  const kt = w(!1), bt = w(!1), Et = ne(() => {
    if (!_.current && xt.current) {
      if (bt.current) {
        bt.current = !1, kt.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), _e = nt.isValidElement(r) ? r : null, Oe = w(!1), St = ne(() => {
    const $ = S.current;
    $ && (Oe.current = !0, $.focus(), setTimeout(() => {
      Oe.current = !1;
    }, 0));
  }, []), Gt = _e ? nt.cloneElement(_e, {
    ref: ($) => {
      S.current = $;
      const X = _e.props.ref;
      typeof X == "function" ? X($) : X && (X.current = $);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...W ? { type: _e.props.type ?? "text" } : {},
    ...W ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${xe}-content` : void 0,
      "aria-activedescendant": n && Q.highlightedIndex >= 0 ? `${xe}-opt-${Q.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: ($) => {
      var X, he;
      (he = (X = _e.props).onPointerDownCapture) == null || he.call(X, $), kt.current = !0, bt.current = !1, setTimeout(() => {
        kt.current = !1;
      }, 0);
    },
    onPointerDown: ($) => {
      var X, he;
      if ((he = (X = _e.props).onPointerDown) == null || he.call(X, $), W) {
        $.preventDefault();
        const Ve = _.current;
        Ve || t == null || t(!0);
        const Ge = S.current;
        Ge == null || Ge.focus(), !Ve && Ge instanceof HTMLInputElement && Ge.select();
      }
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: ($) => {
      var X, he;
      (he = (X = _e.props).onKeyDownCapture) == null || he.call(X, $), W && $.key === " " && $.stopPropagation();
    },
    onClick: ($) => {
      var X, he;
      (he = (X = _e.props).onClick) == null || he.call(X, $), Et();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: ($) => {
      var X, he;
      if (Oe.current) {
        Oe.current = !1;
        return;
      }
      (he = (X = _e.props).onFocus) == null || he.call(X, $);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: ($) => {
      var he, Ve, Ge, vt;
      if ((Ve = (he = _e.props).onBlur) == null || Ve.call(he, $), !W || !_.current) return;
      const X = $.relatedTarget;
      X && ((Ge = z.current) != null && Ge.contains(X) || (vt = S.current) != null && vt.contains(X)) || setTimeout(() => {
        var j;
        const Rt = S.current;
        if (!Rt || !_.current) return;
        const k = Rt.ownerDocument.activeElement;
        k && (Rt.contains(k) || (j = z.current) != null && j.contains(k)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: ($) => {
      var X, he;
      if ((he = (X = _e.props).onKeyDown) == null || he.call(X, $), !(!W || !_.current)) {
        if ($.key === "ArrowDown" || $.key === "ArrowUp") {
          $.preventDefault();
          const Ve = Q.items;
          if (Ve.length === 0) return;
          const Ge = $.key === "ArrowDown" ? 1 : -1, vt = (Q.highlightedIndex + Ge + Ve.length) % Ve.length;
          Q.setHighlighted(vt, "keyboard");
        } else if ($.key === "Enter") {
          $.preventDefault();
          const Ve = Q.highlightedIndex, Ge = Q.items[Ve >= 0 ? Ve : 0];
          Ge == null || Ge.activate();
        }
      }
    }
  }) : r, Be = /* @__PURE__ */ E("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ E("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      pe.trim(),
      "”"
    ] }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), _t = oe || te, Mt = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${_t ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ E($e.Root, { open: n || H, onOpenChange: mt, modal: !1, children: [
    /* @__PURE__ */ h($e.Trigger, { asChild: !0, children: Gt }),
    /* @__PURE__ */ h($e.Portal, { container: A ?? void 0, children: /* @__PURE__ */ h(Ii.Provider, { value: C, children: /* @__PURE__ */ h($i.Provider, { value: M.attrs, children: /* @__PURE__ */ h(Di.Provider, { value: { chain: v, setChain: R, morph: c, keyboardOpened: J, setKeyboardOpened: L }, children: /* @__PURE__ */ h(dr.Provider, { value: Q, children: /* @__PURE__ */ h(fs.Provider, { value: { query: fe, setQuery: I }, children: /* @__PURE__ */ h(is.Provider, { value: te ? Ae : null, children: /* @__PURE__ */ h(hs.Provider, { value: xe, children: /* @__PURE__ */ E(
      $e.Content,
      {
        id: `${xe}-content`,
        ref: Je,
        tabIndex: W ? void 0 : -1,
        ...M.attrs,
        "data-ui-fixed": !0,
        className: `${Mt} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ue.left,
          top: Ue.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Lt || void 0,
          maxHeight: Ue.maxH,
          visibility: Ue.ready ? "visible" : "hidden"
        },
        onPointerLeave: Q.pointerLeave,
        onFocusCapture: W ? ($) => {
          $.target === $.currentTarget && ($.stopPropagation(), St());
        } : void 0,
        onFocusOutside: W ? ($) => {
          var he;
          const X = $.target;
          X && (X === S.current || (he = S.current) != null && he.contains(X)) && $.preventDefault();
        } : void 0,
        onCloseAutoFocus: W ? ($) => {
          $.preventDefault(), St();
        } : void 0,
        children: [
          oe && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ge }, children: /* @__PURE__ */ E("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: Y, children: [
            /* @__PURE__ */ h(zn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: G,
                value: fe,
                onChange: ($) => I($.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            fe ? /* @__PURE__ */ h(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: ($) => $.stopPropagation(),
                onClick: () => {
                  var $;
                  I(""), ($ = G.current) == null || $.focus();
                },
                children: /* @__PURE__ */ h(Nn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          _t ? /* @__PURE__ */ E("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Pe && Be
          ] }) : /* @__PURE__ */ E(rt, { children: [
            l,
            Pe && Be
          ] }),
          te && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            cs,
            {
              count: Ae.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Ae.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: C,
              onClear: Ae.clear,
              hero: {
                label: ae,
                onClick: () => {
                  Ae.commit(), mt(!1);
                },
                disabled: Ae.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function xh({
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
  header: T,
  itemLabel: M,
  trigger: C,
  minItems: v = 1,
  itemRender: R,
  morph: J = !0,
  contentClassName: L
}) {
  const A = qr(), q = zi(), [S, z] = re(null), [_, H] = re(""), U = w(_);
  U.current = _;
  const N = w(null), V = w(null), [W, fe] = re(null), I = ne((Y) => {
    V.current = Y, fe(Y);
  }, []), ye = ns({
    open: n,
    scroller: () => V.current,
    row: () => {
      var Y;
      return ((Y = V.current) == null ? void 0 : Y.querySelector('[data-active="1"]')) ?? null;
    }
  });
  le(() => {
    if (!n) return;
    const Y = (D) => {
      var Le, Ae;
      const oe = D.target;
      if (oe && oe.closest("input, textarea, [contenteditable]")) {
        S && oe === N.current && (D.key === "Enter" ? (D.preventDefault(), D.stopImmediatePropagation(), xe()) : D.key === "Escape" && (D.preventDefault(), D.stopImmediatePropagation(), G()));
        return;
      }
      const F = (Le = V.current) == null ? void 0 : Le.closest(".ui-menu");
      if (!F || !F.contains(D.target)) return;
      const Q = F.ownerDocument, Pe = [...F.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], te = [...F.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], it = [...Pe, ...te];
      if (D.key === "ArrowDown" || D.key === "ArrowUp") {
        D.preventDefault(), D.stopImmediatePropagation();
        const ze = Q.activeElement;
        let ae = ze ? it.indexOf(ze) : -1;
        if (ae < 0 && ze) {
          const Ke = ze.closest("[data-im-row]"), ot = Ke == null ? void 0 : Ke.querySelector('[role="menuitem"]:first-child');
          ot && (ae = Pe.indexOf(ot));
        }
        const Te = D.key === "ArrowDown" ? 1 : -1, Se = ae < 0 ? Te === 1 ? 0 : it.length - 1 : (ae + Te + it.length) % it.length, qe = it[Se];
        qe == null || qe.focus({ preventScroll: !0 }), mn((qe == null ? void 0 : qe.closest("[data-im-row]")) ?? qe, "nearest", V.current);
        return;
      }
      if (D.key === "ArrowLeft" || D.key === "ArrowRight") {
        const ze = Q.activeElement, ae = ze == null ? void 0 : ze.closest("[data-im-row]");
        if (!ae) return;
        D.preventDefault(), D.stopImmediatePropagation();
        const Te = [...ae.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Te.length === 0) return;
        const Se = ze && ae.contains(ze) ? Te.indexOf(ze) : -1, qe = D.key === "ArrowRight" ? 1 : -1, Ke = Se < 0 ? 0 : (Se + qe + Te.length) % Te.length;
        (Ae = Te[Ke]) == null || Ae.focus({ preventScroll: !0 });
        return;
      }
    }, ge = (W == null ? void 0 : W.ownerDocument) ?? null;
    return ge == null || ge.addEventListener("keydown", Y, { capture: !0 }), () => ge == null ? void 0 : ge.removeEventListener("keydown", Y, { capture: !0 });
  }, [n, S, W]), le(() => {
    if (!S) return;
    const Y = t.find((F) => F.id === S);
    Y && !_ && H(Y.name);
    const ge = requestAnimationFrame(() => {
      const F = N.current;
      F && (F.focus(), F.select());
    });
    let D = 0;
    const oe = window.setInterval(() => {
      const F = N.current;
      if (D++, !F || D > 12) {
        clearInterval(oe);
        return;
      }
      F.ownerDocument.activeElement !== F && (F.focus(), F.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ge), clearInterval(oe);
    };
  }, [S]), le(() => {
    if (S) {
      const Y = t.find((ge) => ge.id === S);
      Y && !_ && H(Y.name);
    }
  }, [S, t]);
  const pe = (Y, ge) => {
    z(Y), H(ge);
  }, xe = () => {
    S && U.current.trim() && o(S, U.current.trim()), z(null);
  }, G = () => {
    z(null);
  }, ee = M || T.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ E(Jr, { open: n, onOpenChange: (Y) => {
    Y ? (z(null), H("")) : (S && _.trim() && o(S, _.trim()), z(null), H("")), (!Y || !m) && e(Y);
  }, width: "w-80", theme: g, align: b, trigger: C, morph: J, contentClassName: L, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${A.headerText}`, children: T }),
    /* @__PURE__ */ h("div", { ref: I, "data-im-list": !0, onPointerEnter: ye.engage, onPointerDown: ye.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((Y) => {
      const ge = Y.id === r, D = S === Y.id;
      return /* @__PURE__ */ h("div", { "data-im-row": Y.id, "data-active": ge ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ge || D ? A.rowActiveBg : A.rowHoverBg} ${S && !D ? "opacity-40 pointer-events-none" : ""}`, children: D ? /* @__PURE__ */ E(rt, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: N,
            autoFocus: !0,
            value: _,
            onChange: (oe) => H(oe.target.value),
            onKeyDown: (oe) => {
              oe.key === "Enter" && (oe.preventDefault(), oe.stopPropagation(), xe()), oe.key === "Escape" && (oe.preventDefault(), oe.stopPropagation(), G());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: q
          }
        ) }),
        /* @__PURE__ */ h(
          $e.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${A.editConfirm}`,
            onSelect: (oe) => {
              oe.preventDefault(), xe();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(cr, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          $e.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${A.editCancel}`,
            onSelect: (oe) => {
              oe.preventDefault(), G();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(Nn, { className: A.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ E(rt, { children: [
        /* @__PURE__ */ h(
          $e.Item,
          {
            style: q,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${A.rowText} ${ge ? "" : A.rowTextHover}`,
            onSelect: p ? () => {
              i(Y.id);
            } : (oe) => {
              oe.preventDefault(), i(Y.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h("span", { className: `truncate ${ge ? A.rowActiveText : ""}`, children: R ? R(Y) : Y.name })
          }
        ),
        /* @__PURE__ */ h(
          $e.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ge ? A.btnActive : A.btnBase}`,
            onSelect: (oe) => {
              oe.preventDefault(), pe(Y.id, Y.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Ll, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          $e.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ge ? A.btnActive : A.btnBase}`,
            onSelect: (oe) => {
              oe.preventDefault();
              const F = s(Y.id);
              F && pe(F, `${Y.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Ho, { className: A.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          $e.Item,
          {
            className: `shrink-0 ${A.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= v ? A.btnDisabled : ge ? A.btnDangerActive : A.btnDanger}`,
            onSelect: (oe) => {
              oe.preventDefault(), l(Y.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= v,
            children: /* @__PURE__ */ h(di, { className: A.btnIcon })
          }
        )
      ] }) }, Y.id);
    }) }),
    /* @__PURE__ */ E("div", { className: `shrink-0 ${S ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ E(rt, { children: [
        /* @__PURE__ */ h($e.Separator, { className: A.separator }),
        /* @__PURE__ */ E(
          $e.Item,
          {
            className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
            onSelect: (Y) => {
              Y.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(_o, { className: `${A.btnIcon} ${A.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h($e.Separator, { className: A.separator }),
      c && /* @__PURE__ */ E(
        $e.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault();
            const ge = c();
            ge && pe(ge, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(Hr, { className: `${A.btnIcon} ${A.icon}` }),
            "New ",
            ee
          ]
        }
      ),
      a && /* @__PURE__ */ E(
        $e.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ E("svg", { className: `${A.btnIcon} ${A.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ E(
        $e.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ E("svg", { className: `${A.btnIcon} ${A.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ E(
        $e.Item,
        {
          className: `w-full text-left ${A.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${A.itemDefault} ui-row`,
          onSelect: (Y) => {
            Y.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(di, { className: `${A.btnIcon} ${A.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Hc({
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
  var V;
  as();
  const f = qr(), p = zi(), m = us(), g = w(!1), b = w(null), x = Mc(), T = !!x && d !== void 0, M = x && d !== void 0 ? x.isSelected(d) : l, C = t || (x && d !== void 0 ? !x.canToggle(d) : !1), { myIndex: v, highlighted: R, setPointer: J, api: L } = ps({
    label: () => ds(o),
    activate: () => {
      C || (x && d !== void 0 ? x.toggle(d) : n());
    },
    disabled: C,
    group: u,
    itemId: d
  }), { query: A } = Oc(), q = A.trim() !== "" && v < 0, S = Bc(), z = u == null ? void 0 : u.trim(), _ = !!z && v >= 0 && (v === 0 || ((V = L == null ? void 0 : L.items[v - 1]) == null ? void 0 : V.group) !== z), H = z && x ? ((L == null ? void 0 : L.items) ?? []).filter((W) => W.group === z && W.itemId).map((W) => W.itemId).filter((W) => !x.isDisabled(W)) : [], U = x && H.length > 0 ? x.groupState(H) : "none", N = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ E(rt, { children: [
    _ && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": z,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && H.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && H.length > 0 ? /* @__PURE__ */ E("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${z}`,
              onMouseDown: (W) => W.preventDefault(),
              onClick: () => x.toggleGroup(H),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                Ar,
                {
                  checked: U === "all",
                  indeterminate: U === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: z })
        ] }) : z
      }
    ),
    /* @__PURE__ */ E(
      $e.Item,
      {
        ref: b,
        id: S && v >= 0 ? `${S}-opt-${v}` : void 0,
        "data-ei": v >= 0 ? v : void 0,
        ...T ? { role: "menuitemcheckbox", "aria-checked": M } : {},
        style: { ...p, display: q ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${N} ${T ? "" : l ? "ui-item-selected" : ""} ${R ? "ui-item-highlighted" : ""} ${C ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (W) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (T) {
            W.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && W.preventDefault(), n();
        },
        onPointerEnter: () => {
          J(v);
        },
        onTouchStart: () => {
        },
        disabled: C,
        children: [
          T && /* @__PURE__ */ h(Ar, { checked: M, disabled: C, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: c.title,
              onPointerDown: (W) => {
                W.stopPropagation(), W.preventDefault(), g.current = !0, c.onClick();
              },
              onClick: (W) => {
                W.stopPropagation(), W.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function _c({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Yt(Di), f = l.includes(n), p = l[l.length - 1] === n;
  as();
  const m = Dc(), g = Wn(), b = w(null), x = w(null), [T, M] = re(f), C = !f && T;
  le(() => {
    f && M(!0);
  }, [f]);
  const v = () => c((G) => {
    const ee = G.indexOf(n);
    return ee >= 0 ? G.slice(0, ee) : G;
  }), R = Kr(), J = Pi(), L = w(J);
  L.current = J;
  const A = w(null);
  le(() => {
    var ee;
    const G = {
      label: e,
      activate: () => {
        d(n), c((Y) => Y.includes(n) ? Y : [...Y, n]);
      },
      submenu: !0
    };
    return A.current = G, (ee = L.current) == null ? void 0 : ee.register(G);
  }, []);
  const q = J && A.current ? J.items.indexOf(A.current) : -1, S = q >= 0 && q === J.highlightedIndex, z = ne(() => {
    const G = b.current;
    if (!G) return null;
    const ee = G.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), _ = Wr({
    visible: f,
    morph: a,
    anchor: z,
    onClosed: () => M(!1)
  }), H = w(() => {
  }), U = w(() => {
  }), N = w(() => {
  });
  Li(f && p, R, H, {
    onCloseSub: () => {
      v(), J && q >= 0 && J.setHighlighted(q, "keyboard");
    }
  });
  const V = w(u);
  V.current = u, le(() => {
    f && (V.current === n ? (R.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var G;
      return (G = x.current) == null ? void 0 : G.focus();
    }), d(null)) : R.setHighlighted(-1, "keyboard"));
  }, [f]), Bi(f, U), Oi(f, R, H, x, !p, N), nt.useLayoutEffect(() => {
    var ee;
    if (!f || R.highlightedIndex < 0 || R.pointerDriven) return;
    const G = (ee = x.current) == null ? void 0 : ee.querySelector(`[data-ei="${R.highlightedIndex}"]`);
    mn(G, "nearest", x.current);
  }, [f, R.highlightedIndex, R.pointerDriven]);
  const W = w(null), fe = ne((G) => {
    var ee;
    if (G) {
      G.addEventListener("keydown", H.current, { capture: !0 }), G.addEventListener("wheel", U.current, { passive: !1 });
      const Y = G.ownerDocument;
      W.current = Y, Y.addEventListener("keydown", N.current, { capture: !0 });
    } else
      (ee = W.current) == null || ee.removeEventListener("keydown", N.current, { capture: !0 }), W.current = null;
    x.current = G, _(G);
  }, [_]), I = De(), ye = { padding: `${O(8, 12, I)}px ${O(12, 16, I)}px`, fontSize: O(12, 14, I) }, pe = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${S ? " ui-item-highlighted" : ""}${C ? " ui-sub-closing" : ""}`, xe = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ E($e.Sub, { open: f || T, onOpenChange: (G) => c((ee) => {
    if (!G) {
      const Y = ee.indexOf(n);
      return Y >= 0 ? ee.slice(0, Y) : ee;
    }
    return ee.includes(n) ? ee : [...ee, n];
  }), children: [
    /* @__PURE__ */ E(
      $e.SubTrigger,
      {
        ref: b,
        "data-ei": q >= 0 ? q : void 0,
        style: ye,
        className: pe,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          J && q >= 0 && J.setHighlighted(q, "pointer");
        },
        onPointerDown: (G) => {
          G.pointerType === "pen" && (G.preventDefault(), c((ee) => f ? ee.slice(0, ee.indexOf(n)) : [...ee, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Mr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ E("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Mr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ h($e.Portal, { container: g ?? void 0, children: /* @__PURE__ */ h(
      $e.SubContent,
      {
        ref: fe,
        ...m,
        className: xe,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: R.pointerLeave,
        children: /* @__PURE__ */ h(dr.Provider, { value: R, children: o })
      }
    ) })
  ] });
}
const Gn = 8, bh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Ut(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? ts(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = De(), f = O(12, 14, d), p = w(null), m = ar(), [g, b] = re(!1), [x, T] = re([]), [M, C] = re(null), v = Kr();
  le(() => {
    if (n)
      return v.setHighlighted(-1, "keyboard"), Zo(r);
  }, [n, r]);
  const R = w({ left: e, top: t });
  n && (R.current = { left: e, top: t });
  const J = ne(() => ({ left: R.current.left, top: R.current.top, width: 0, height: 0 }), []), L = Wr({
    visible: !0,
    morph: l,
    anchor: J,
    cloneOnUnmount: !0
  }), A = w(() => {
  }), q = w(() => {
  }), S = w(() => {
  });
  Li(n, v, A), ht(() => {
    if (!n || v.highlightedIndex < 0 || v.pointerDriven) return;
    const N = p.current;
    mn(
      N == null ? void 0 : N.querySelector(`[data-ei="${v.highlightedIndex}"]`),
      "nearest",
      N
    );
  }, [n, v.highlightedIndex, v.pointerDriven]), Bi(n, q), Oi(n, v, A, p, x.length > 0, S);
  const z = w(null), _ = ne((N) => {
    var V;
    if (N) {
      N.addEventListener("keydown", A.current, { capture: !0 }), N.addEventListener("wheel", q.current, { passive: !1 });
      const W = N.ownerDocument;
      z.current = W, W.addEventListener("keydown", S.current, { capture: !0 });
    } else
      (V = z.current) == null || V.removeEventListener("keydown", S.current, { capture: !0 }), z.current = null;
    p.current = N, b(!!N), L(N);
  }, [L]), [H, U] = re(null);
  return ht(() => {
    var Y;
    if (!n || !g || !p.current) return;
    const N = p.current, V = N.offsetWidth, W = N.offsetHeight, fe = (Y = o == null ? void 0 : o.current) == null ? void 0 : Y.getBoundingClientRect(), I = fe ? fe.right : (m == null ? void 0 : m.innerWidth) ?? 0, ye = fe ? fe.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, pe = fe ? fe.left : 0, xe = fe ? fe.top : 0;
    let G = Math.max(xe + Gn, R.current.top), ee = Math.max(pe + Gn, R.current.left);
    ee + V > I && (ee = I - V - Gn), G + W > ye && (G = Math.max(xe + Gn, ye - W - Gn)), U({ left: ee, top: G });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ E($e.Root, { open: n, onOpenChange: (N) => {
    N || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h($e.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h($e.Portal, { children: /* @__PURE__ */ h(Ii.Provider, { value: u, children: /* @__PURE__ */ h($i.Provider, { value: a.attrs, children: /* @__PURE__ */ h(Di.Provider, { value: { chain: x, setChain: T, morph: l, keyboardOpened: M, setKeyboardOpened: C }, children: /* @__PURE__ */ h(dr.Provider, { value: v, children: /* @__PURE__ */ h(
      $e.Content,
      {
        ref: _,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (H == null ? void 0 : H.left) ?? R.current.left, top: (H == null ? void 0 : H.top) ?? R.current.top, touchAction: "manipulation" },
        onPointerLeave: v.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, vh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = De(), c = { padding: `${O(8, 12, l)}px ${O(12, 16, l)}px`, fontSize: O(12, 14, l) }, a = Pi(), u = w(a);
  u.current = a;
  const d = w(null);
  le(() => {
    var g;
    const m = { label: ds(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ E(
    $e.Item,
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
}, wh = () => /* @__PURE__ */ h($e.Separator, { className: "ui-sep my-1" }), kh = (n) => /* @__PURE__ */ h(_c, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Re = 8, ms = "[data-modal-stack]", on = 220, nr = "cubic-bezier(0.32, 0.72, 0, 1)", Nr = 0.94;
function An() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function an(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function gs(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function lo(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = gs(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${on}ms ${nr}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, on + 80));
    });
  });
}
function jc(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Nr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${on}ms ${nr}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, on + 60));
    });
  });
}
function co(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Nr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Nr, height: i.height * Nr };
  e.style.transition = `transform ${on}ms ${nr}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = gs(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, on + 60);
}
function ei(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ms) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function pr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ms) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Wc({
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
  const g = Ut(), b = Mi(
    { mode: f, accent: m, surface: p, context: "surface" },
    g
  ), x = b.mode, T = b.surface, M = b.accent, C = w(null), v = w(null), R = w(null), J = De(), L = O(20, 24, J), A = O(10, 12, J), q = O(12, 14, J), S = O(14, 16, J), z = O(20, 24, J), _ = O(20, 24, J), H = O(20, 24, J), U = O(14, 16, J), N = O(16, 20, J), V = O(10, 12, J), W = O(12, 14, J), fe = O(8, 10, J), I = O(4, 6, J), ye = { padding: `${A}px ${L}px` }, pe = { fontSize: q }, xe = { padding: `${_}px ${z}px 16px ${z}px` }, G = { fontSize: S }, ee = { padding: `0 ${z}px 16px` }, Y = { padding: `${H}px ${z}px` }, ge = { fontSize: V, padding: `${I}px ${fe}px` }, [D, oe] = re(!1), F = ne((k) => {
    C.current = k, oe(k !== null);
  }, []), Q = Wn(), Pe = ar(), te = w(Pe);
  te.current = Pe;
  const [it, Le] = re(null), Ae = w(null), ze = w(!1), ae = w(!1), Te = w(0), Se = w({ w: 0, h: 0 }), qe = w(!1), [Ke, ot] = re(!1), [ve, st] = re(!1), Je = w(0), Ue = w(!1), [Pt, Lt] = re(!1), He = w(c);
  He.current = c;
  const lt = w(!1), pt = w(!1), mt = () => {
    pt.current = !0, ot(!0);
  }, xt = () => {
    pt.current = !1, ot(!1);
  };
  le(() => {
    n || (Le(null), qe.current = !1, ze.current = !1, st(!1));
  }, [n]), ht(() => {
    if (!n || qe.current || !D || !C.current) return;
    qe.current = !0;
    const k = C.current.getBoundingClientRect(), j = te.current ?? null, ie = (j == null ? void 0 : j.innerWidth) ?? 0, me = an(j);
    Le({
      left: Math.max(Re, Math.min((ie - k.width) / 2, ie - k.width - Re)),
      top: Math.max(me.top + Re, Math.min(me.top + (me.height - k.height) / 2, me.bottom - k.height - Re))
    });
  }, [n, D]), ht(() => {
    if (!n || !D || !c || An() || !C.current) return;
    const k = C.current, j = ei(k), ie = j[j.length - 1];
    mt(), ie ? lo(Je, k, ie.getBoundingClientRect(), xt) : jc(Je, k, xt);
  }, [n, D]);
  const kt = ne(() => {
    if (!u || Ue.current) return;
    const k = C.current, j = !!k && ei(k).length > 0;
    if (!k || !c || An() || j) {
      e();
      return;
    }
    Ue.current = !0, Lt(!0), lt.current = !0, mt(), co(Je, k, () => {
      Ue.current = !1, Lt(!1), xt(), e();
    });
  }, [c, e, u]), bt = ne(() => {
    const k = C.current;
    if (!k || lt.current || !He.current || An() || ei(k).length > 0) return;
    const j = k.ownerDocument, ie = k.cloneNode(!0);
    ie.removeAttribute("data-modal-stack"), ie.removeAttribute("data-state"), ie.removeAttribute("role"), ie.removeAttribute("data-aria-hidden"), ie.removeAttribute("tabindex"), ie.setAttribute("aria-hidden", "true"), ie.style.pointerEvents = "none", j.body.appendChild(ie), co({ current: 0 }, ie, () => {
      ie.isConnected && ie.remove();
    });
  }, []);
  ht(() => () => bt(), [bt]);
  const Et = w(n);
  ht(() => {
    const k = Et.current;
    Et.current = n, k && !n && bt();
  }, [n, D, bt]), le(() => {
    if (!n || !D || !c || !C.current) return;
    const k = C.current, j = k.parentNode;
    if (!j) return;
    let ie = 0, me = null, Ne = !1;
    const Ce = () => {
      ie = 0;
      const ke = pr(k);
      if (ke.length > 0)
        k.style.opacity = "", k.style.pointerEvents = "", me = ke[ke.length - 1].getBoundingClientRect(), Ne = !0, ie = requestAnimationFrame(Ce);
      else if (Ne) {
        Ne = !1, me && !An() && (mt(), lo(Je, k, me, xt)), me = null;
        const Fe = te.current ?? null;
        Fe == null || Fe.setTimeout(() => {
          !k || !k.isConnected || getComputedStyle(k).opacity !== "1" && (k.style.opacity = "1", k.style.pointerEvents = "");
        }, 240);
      }
    }, we = new MutationObserver(() => {
      !ie && pr(k).length > 0 && (ie = requestAnimationFrame(Ce));
    });
    return we.observe(j, { childList: !0 }), () => {
      we.disconnect(), ie && cancelAnimationFrame(ie);
    };
  }, [n, D]), le(() => {
    if (!D || !c || An() || !C.current) return;
    const k = C.current;
    let j = Math.round(k.getBoundingClientRect().height), ie = !1;
    const me = new ResizeObserver(() => {
      if (!k.isConnected) return;
      const Ne = Math.round(k.getBoundingClientRect().height);
      if (!ie) {
        ie = !0, j = Ne;
        return;
      }
      if (Math.abs(Ne - j) < 1) return;
      if (Ae.current || Ue.current || pr(k).length > 0) {
        j = Ne;
        return;
      }
      if (pt.current) return;
      const Ce = j;
      j = Ne, mt();
      const we = k.getBoundingClientRect(), ke = an(te.current ?? null), Fe = !ze.current && !ae.current, At = Fe ? ke.top + (ke.height - Ce) / 2 : we.top, dt = Fe ? ke.top + (ke.height - Ne) / 2 : we.top;
      k.style.transition = "none", k.style.height = `${Ce}px`, Fe && (k.style.top = `${At}px`), v.current && (v.current.style.overflow = "hidden"), k.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          k.style.height === `${Ce}px` && (k.style.transition = `height ${on}ms ${nr}${Fe ? `, top ${on}ms ${nr}` : ""}`, k.style.height = `${Ne}px`, Fe && (k.style.top = `${dt}px`), window.setTimeout(() => {
            k.style.height === `${Ne}px` && (k.style.transition = "", k.style.height = "", v.current && (v.current.style.overflow = ""), Fe && Le({ left: we.left, top: dt }), xt());
          }, on + 60));
        });
      });
    });
    return me.observe(k), () => me.disconnect();
  }, [D]), le(() => {
    if (!D || !C.current || c && !An()) return;
    const k = C.current, j = new ResizeObserver(() => {
      if (!k.isConnected || Ae.current || Ue.current || ae.current || pr(k).length > 0) return;
      const ie = te.current ?? null, me = an(ie), Ne = (ie == null ? void 0 : ie.innerWidth) ?? 0, Ce = k.getBoundingClientRect(), we = Math.max(me.top + Re, Math.min(Ce.top, me.bottom - Ce.height - Re)), ke = Math.max(Re, Math.min(Ce.left, Ne - Ce.width - Re));
      (Math.abs(we - Ce.top) > 0.5 || Math.abs(ke - Ce.left) > 0.5) && Le({ left: ke, top: we });
    });
    return j.observe(k), () => j.disconnect();
  }, [D, c]);
  const _e = ne(() => {
    const k = C.current;
    if (!k) return null;
    const j = k.getBoundingClientRect();
    return { left: j.left, top: j.top, width: j.width, height: j.height };
  }, []), Oe = ne((k, j) => {
    const ie = te.current ?? null, me = (ie == null ? void 0 : ie.innerWidth) ?? 0, Ne = an(ie), Ce = _e(), we = Ce ? Ce.width : Math.min(me - Re * 2, 576), ke = Ce ? Ce.height : Math.min(Ne.height - Re * 2, 400);
    return {
      left: Math.max(Re, Math.min(k, me - we - Re)),
      top: Math.max(Ne.top + Re, Math.min(j, Ne.bottom - ke - Re))
    };
  }, [_e]);
  le(() => {
    if (!n) return;
    const k = te.current ?? null, j = (k == null ? void 0 : k.visualViewport) ?? null;
    if (!k || !j) return;
    const ie = 120;
    ae.current = !1, Se.current = { w: k.innerWidth, h: k.innerHeight };
    let me = 0;
    const Ne = () => {
      if (Ue.current || Ae.current) return;
      const we = (k == null ? void 0 : k.innerHeight) ?? 0, ke = (k == null ? void 0 : k.innerWidth) ?? 0, At = an(k).height < we - ie, dt = we < Se.current.h - ie && ke === Se.current.w;
      At || dt ? (ae.current = !0, Te.current && (clearTimeout(Te.current), Te.current = 0)) : Te.current || (Te.current = (k == null ? void 0 : k.setTimeout(() => {
        ae.current = !1, Te.current = 0, st(!1);
      }, 600)) ?? 0), st(ae.current), !me && (me = requestAnimationFrame(() => {
        var Qt;
        me = 0;
        const Xe = C.current;
        if (!Xe) return;
        const gt = an(te.current ?? null), Nt = Xe.getBoundingClientRect(), Jt = ((Qt = te.current) == null ? void 0 : Qt.innerWidth) ?? 0, Ee = (k == null ? void 0 : k.innerHeight) ?? 0, yn = gt.height < Ee - ie || Ee < Se.current.h - ie && (k == null ? void 0 : k.innerWidth) === Se.current.w;
        Se.current = { w: (k == null ? void 0 : k.innerWidth) ?? 0, h: Ee };
        const Xt = Nt.top >= gt.top + Re && Nt.bottom <= gt.bottom - Re, ft = () => {
          Le({
            left: Math.max(Re, Math.min((Jt - Nt.width) / 2, Jt - Nt.width - Re)),
            top: Math.max(gt.top + Re, Math.min(gt.top + (gt.height - Nt.height) / 2, gt.bottom - Nt.height - Re))
          });
        };
        if (yn && !et) {
          if (ze.current) {
            Xt || Le(Oe(Nt.left, Nt.top));
            return;
          }
          if (Xt) return;
          ft();
          return;
        }
        if (!ae.current) {
          if (ze.current) {
            Xt || Le(Oe(Nt.left, Nt.top));
            return;
          }
          Xt || ft();
        }
      }));
    };
    j.addEventListener("resize", Ne), j.addEventListener("scroll", Ne);
    const Ce = () => {
      Ue.current || Ae.current || me || (me = requestAnimationFrame(() => {
        me = 0;
        const we = C.current;
        if (!we) return;
        const ke = te.current ?? null, Fe = an(ke), At = (ke == null ? void 0 : ke.innerWidth) ?? 0, dt = we.getBoundingClientRect();
        if (ze.current) {
          Le(Oe(dt.left, dt.top));
          return;
        }
        Le({
          left: Math.max(Re, Math.min((At - dt.width) / 2, At - dt.width - Re)),
          top: Math.max(Fe.top + Re, Math.min(Fe.top + (Fe.height - dt.height) / 2, Fe.bottom - dt.height - Re))
        });
      }));
    };
    return k.addEventListener("orientationchange", Ce), () => {
      j.removeEventListener("resize", Ne), j.removeEventListener("scroll", Ne), k.removeEventListener("orientationchange", Ce), me && cancelAnimationFrame(me), Te.current && clearTimeout(Te.current);
    };
  }, [n, Oe]);
  const St = ne((k) => {
    if (k.target.closest("button")) return;
    ze.current = !0;
    const j = _e();
    j && (Le(Oe(j.left, j.top)), Ae.current = { startX: k.clientX, startY: k.clientY, posX: j.left, posY: j.top }, k.target.setPointerCapture(k.pointerId));
  }, [_e, Oe]), Gt = ne((k) => {
    const j = Ae.current;
    j && (k.preventDefault(), Le(Oe(j.posX + k.clientX - j.startX, j.posY + k.clientY - j.startY)));
  }, [Oe]), Be = ne(() => {
    Ae.current = null;
  }, []), _t = Ae.current !== null, Mt = ne(() => {
    ze.current = !1;
    const k = te.current ?? null, j = an(k), ie = (k == null ? void 0 : k.innerWidth) ?? 0, me = C.current, Ne = me ? me.getBoundingClientRect() : { width: 0, height: 0 };
    Le({
      left: Math.max(Re, Math.min((ie - Ne.width) / 2, ie - Ne.width - Re)),
      top: Math.max(j.top + Re, Math.min(j.top + (j.height - Ne.height) / 2, j.bottom - Ne.height - Re))
    });
  }, []), $ = w(0), X = ne(() => {
    const k = Date.now();
    k - $.current < 300 ? ($.current = 0, Mt()) : $.current = k;
  }, [Mt]), he = it !== null, Ve = he ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Ge = `${i ? `${i} w-full` : "max-w-xl w-full"}`, vt = {
    ...he ? { left: it.left, top: it.top } : {},
    width: `min(100%, calc(100dvw - ${Re * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...ve ? {} : { maxHeight: `calc(100dvh - ${Re * 2}px)` }
  }, Rt = ne((k) => {
    if (k.key !== "Enter" || k.shiftKey || k.metaKey || k.ctrlKey || k.altKey) return;
    const j = k.target, ie = R.current;
    if (!(!!j.closest("[data-modal-close]") || !!ie && ie.contains(j) && !!j.closest('button, a, [role="button"]')) && j.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ie) return;
    const Ne = Array.from(ie.querySelectorAll("button[data-modal-confirm]")), Ce = Ne.length > 0 ? Ne : Array.from(ie.querySelectorAll("button")), we = Ce[Ce.length - 1];
    !we || we.disabled || (k.preventDefault(), we.click());
  }, []);
  return /* @__PURE__ */ h(Ri, { theme: b, children: /* @__PURE__ */ h(cn.Root, { open: n, onOpenChange: (k) => {
    k || kt();
  }, children: /* @__PURE__ */ E(cn.Portal, { container: Q ?? void 0, children: [
    /* @__PURE__ */ h(
      cn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Pt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (k) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (k.preventDefault(), d && kt());
        }
      }
    ),
    /* @__PURE__ */ E(
      cn.Content,
      {
        ref: F,
        onKeyDown: Rt,
        onInteractOutside: (k) => {
          d || k.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": M,
        "data-surface": T,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ve} ${Ge}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(vt).length > 0 ? vt : {} },
        children: [
          a ? /* @__PURE__ */ E(
            "div",
            {
              style: xe,
              className: `flex items-center justify-between ${_t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (k) => {
                Ke || St(k);
              },
              onPointerMove: Gt,
              onPointerUp: Be,
              onClick: X,
              children: [
                /* @__PURE__ */ h(cn.Title, { style: G, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(cn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Nn, { style: { width: N, height: N } }) })
              ]
            }
          ) : /* @__PURE__ */ E(
            "div",
            {
              style: ye,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${_t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (k) => {
                Ke || St(k);
              },
              onPointerMove: Gt,
              onPointerUp: Be,
              onClick: X,
              children: [
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(cn.Title, { style: pe, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ E("button", { onClick: l, style: ge, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(_o, { style: { width: W, height: W } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(cn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Nn, { style: { width: U, height: U } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: v, "data-testid": "modal-body", style: a ? ee : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: R, style: a ? Y : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Sh({ children: n }) {
  const e = De(), t = O(20, 24, e), r = O(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const qc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Kc = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Jc = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function mr({
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
      className: `${qc} ${n === "hero" ? Kc[e] : Jc[n]} ${t}`,
      ...i
    }
  );
}
function Ir(n = "md") {
  const e = et && Ko() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function ys(n = "md") {
  return n === "sm" ? hn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : hn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const xs = Vt(null);
function Nh() {
  const n = Yt(xs);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Th({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = re(null), [s, l] = re(!1), c = w(null), a = De(), u = O(16, 20, a), d = O(12, 14, a), f = ys(), p = w(i);
  p.current = i;
  const m = ne(() => {
    const v = p.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), g = ne((v) => {
    if (v.suppressKey) {
      const R = localStorage.getItem(v.suppressKey);
      if (R && Date.now() < parseInt(R, 10))
        return Promise.resolve(!0);
    }
    return new Promise((R) => {
      m(), l(!1), o({ kind: "confirm", options: v, resolve: R });
    });
  }, [m]), b = ne((v) => new Promise((R) => {
    m(), o({ kind: "prompt", options: v, resolve: R });
  }), [m]), x = ne((v) => new Promise((R) => {
    m(), o({ kind: "alert", options: v, resolve: R });
  }), [m]);
  le(() => {
    if (i) {
      const v = setTimeout(() => {
        var R;
        return (R = c.current) == null ? void 0 : R.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [i]);
  const T = ne(() => {
    var v, R;
    if (i) {
      if (i.kind === "confirm") {
        const J = i.options;
        J.suppressKey && s && localStorage.setItem(J.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((R = (v = c.current) == null ? void 0 : v.value) == null ? void 0 : R.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), M = i !== null;
  le(() => {
    if (!M) return;
    const v = (R) => {
      R.key !== "Enter" || R.shiftKey || R.metaKey || R.ctrlKey || R.altKey || R.isComposing || (R.preventDefault(), R.stopImmediatePropagation(), T());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [M, T]);
  const C = ne(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ E(xs.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    M && /* @__PURE__ */ h(
      Wc,
      {
        open: !0,
        onClose: C,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ E(rt, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(mr, { variant: "ghost", onClick: C, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(mr, { onClick: T, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            mr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: T,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(mr, { "data-modal-confirm": !0, onClick: T, children: "Save" })
        ] }),
        children: /* @__PURE__ */ E("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            Rc,
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
const Vc = 500, Yc = 250, Uc = 5, Ot = 88, ao = 4;
function Gc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Xc({ x: n, y: e, ms: t }) {
  const r = w(null), i = Wn();
  return le(() => {
    r.current && Gc(r.current, t);
  }, [t]), _r(
    /* @__PURE__ */ h(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Ot / 2,
          top: e - Ot / 2,
          width: Ot,
          height: Ot,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ E("svg", { ref: r, width: Ot, height: Ot, viewBox: `0 0 ${Ot} ${Ot}`, children: [
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Ot / 2,
              cy: Ot / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: ao + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: Ot / 2,
              cy: Ot / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: ao,
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
function Ch() {
  return { "data-no-longpress": "true" };
}
function Qc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Eh({
  children: n,
  showRing: e = !0,
  longPressMs: t = Vc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = re(null), c = Ni(), a = w(null), u = w(null), d = w({ x: 0, y: 0, target: null }), f = w(!1), p = Math.min(Yc, t * 0.5), m = w(i);
  m.current = i;
  const g = w(o);
  return g.current = o, le(() => {
    if (!et || !c) return;
    const b = (C) => {
      if (!fi(C.pointerType) || C.button !== 0) return;
      const v = C.target;
      if (!v.closest(r) || (m.current ? !m.current(v) : Qc(v))) return;
      const R = C.clientX, J = C.clientY;
      d.current = { x: R, y: J, target: C.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: R, y: J }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const L = d.current.target;
        if (!L) return;
        const A = g.current;
        if (A) {
          A(L, R, J);
          return;
        }
        const q = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: R,
          clientY: J,
          button: 2,
          view: window
        });
        L.dispatchEvent(q);
      }, t);
    }, x = (C) => {
      if (!f.current || a.current === null) return;
      const v = C.clientX - d.current.x, R = C.clientY - d.current.y;
      Math.sqrt(v * v + R * R) > Uc && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, T = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, M = (C) => {
      fi(C.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", T), c.addEventListener("pointercancel", T), c.addEventListener("pointerleave", M), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", T), c == null || c.removeEventListener("pointercancel", T), c == null || c.removeEventListener("pointerleave", M), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ E(rt, { children: [
    n,
    e && s && /* @__PURE__ */ h(Xc, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function Mh() {
  const n = gc();
  return mc ? n === null || fi(n) : !1;
}
const Zc = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, ea = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, ta = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Rh({
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
        ...e ? ta : n ? ea : Zc,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const na = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ra = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ti = 1900, ni = 2100;
function ia(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function oa(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Ah({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Ut(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const F = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(F.getTime()) ? c : F;
  })(), [u, d] = re(a.getFullYear()), [f, p] = re(a.getMonth()), [m, g] = re("days"), [b, x] = re(null), T = Qe(() => new Set(n), [n]), M = (F) => {
    T.has(F) ? e(n.filter((Q) => Q !== F)) : e([...n, F]);
  }, C = Qe(() => {
    const F = ia(u, f), Q = new Date(u, f, 1).getDay(), Pe = [];
    for (let te = 0; te < Q; te++) Pe.push({ key: `pad-${te}`, day: 0, empty: !0 });
    for (let te = 1; te <= F; te++) Pe.push({ key: oa(u, f, te), day: te, empty: !1 });
    return Pe;
  }, [u, f]), v = (F) => d((Q) => Math.max(ti, Math.min(ni, Q + F))), R = (F) => {
    f + F < 0 ? (d((Q) => Math.max(ti, Q - 1)), p(11)) : f + F > 11 ? (d((Q) => Math.min(ni, Q + 1)), p(0)) : p((Q) => Q + F);
  }, J = () => {
    if (b === null) return;
    const F = parseInt(b, 10);
    !isNaN(F) && F >= ti && F <= ni && d(F), x(null);
  }, L = (F) => n.some((Q) => Q.startsWith(`${u}-${String(F + 1).padStart(2, "0")}`)), A = De(), q = O(4, 8, A), S = O(16, 20, A), z = O(10, 11, A), _ = O(6, 8, A), H = O(12, 14, A), U = O(6, 10, A), N = O(12, 14, A), V = O(8, 12, A), W = O(10, 12, A), fe = O(6, 10, A), I = O(2, 6, A), ye = O(64, 80, A), pe = { padding: q }, xe = { width: S, height: S }, G = { fontSize: z, paddingTop: _, paddingBottom: _ }, ee = { fontSize: H, paddingTop: U, paddingBottom: U }, Y = { fontSize: N, paddingTop: V, paddingBottom: V }, ge = { fontSize: W, padding: `${I}px ${fe}px` }, D = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", oe = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ E("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ E("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? v(-1) : R(-1),
          style: pe,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Ol, { style: xe })
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
          onChange: (F) => x(F.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (F) => F.target.select(),
          onBlur: J,
          onKeyDown: (F) => {
            F.key === "Enter" && (F.preventDefault(), J()), F.key === "Escape" && x(null);
          },
          style: { width: ye },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? v(1) : R(1),
          style: pe,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Mr, { style: xe })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: ra.map((F, Q) => /* @__PURE__ */ E(
        "button",
        {
          type: "button",
          onClick: () => {
            p(Q), g("days");
          },
          style: Y,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${Q === f ? D : oe}`,
          children: [
            F,
            L(Q) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${Q === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        F
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), g("days");
          },
          style: { paddingTop: U, paddingBottom: U, fontSize: H },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ E("div", { className: "grid grid-cols-7 text-center", children: [
      na.map((F) => /* @__PURE__ */ h("div", { style: G, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: F }, F)),
      C.map((F) => F.empty ? /* @__PURE__ */ h("div", {}, F.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => M(F.key),
          style: ee,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${T.has(F.key) ? D : oe}`,
          children: F.day
        },
        F.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ E("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ E("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map((F) => {
        const Q = /* @__PURE__ */ new Date(F + "T00:00:00"), Pe = Q.getFullYear() === c.getFullYear() ? Q.toLocaleString("default", { month: "short", day: "numeric" }) : Q.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ E(
          "button",
          {
            type: "button",
            onClick: () => M(F),
            "aria-label": `Remove ${Pe}`,
            style: ge,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Pe,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          F
        );
      }) })
    ] })
  ] });
}
function Ih({
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
  const p = (C) => e instanceof Set ? e.has(C) : e.includes(C), m = De(), g = O(12, 16, m), b = O(8, 12, m), x = O(12, 14, m), T = O(16, 20, m), M = r != null || i != null;
  return /* @__PURE__ */ E("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    M && /* @__PURE__ */ E("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ h("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((C) => {
            const v = p(C.id), R = /* @__PURE__ */ h(Ai, { checked: v, size: T });
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(C.id),
                "aria-pressed": v,
                className: `ui-checklist-item ${v ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: x },
                ...C.dataProps,
                children: [
                  u === "leading" && R,
                  C.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: C.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: C.label }),
                  C.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: C.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: R })
                ]
              },
              C.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function $h({
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
  const u = De(), d = s ? 10 : O(12, 16, u), f = s ? 6 : O(8, 12, u), p = s ? 12 : O(12, 14, u), m = s ? 14 : O(16, 20, u);
  return /* @__PURE__ */ E("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const b = e === g.id;
            return /* @__PURE__ */ E(
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
const zh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = ar(), { refs: l, floatingStyles: c } = Yl({
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
          var T;
          if (i !== "visible") return {};
          const u = (T = a.elements.floating.ownerDocument) == null ? void 0 : T.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || g <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? p - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + x };
        }
      },
      jo(o),
      Wo({ padding: 8 }),
      qo({ padding: 8 }),
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
    whileElementsMounted: Ul
  });
  return ht(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ E(rt, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && _r(
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
function sa(n, e) {
  if (!e || !nt.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const In = ({ content: n, children: e }) => {
  const t = Ut(), r = De(), i = O(10, 12, r), o = O(6, 6, r), s = O(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Wn(), a = ar(), [u, d] = re(!1), [f, p] = re({ x: 0, y: 0 }), m = w(null), g = w(null), b = () => {
    if (!m.current) return;
    const M = m.current.getBoundingClientRect();
    p({ x: M.left + M.width / 2, y: M.top });
  };
  le(() => () => {
    g.current && clearTimeout(g.current);
  }, []), le(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]);
  const x = sa(e, n), T = Object.keys(x).length > 0 ? nt.cloneElement(e, x) : e;
  return /* @__PURE__ */ E(
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
        T,
        u && _r(
          /* @__PURE__ */ E(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((M, C) => /* @__PURE__ */ h("div", { className: C > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: M }, C)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, la = 250;
function ca(n, e, t) {
  const [r, i] = nt.useState(null), [o, s] = nt.useState(!1), l = nt.useRef(null), c = nt.useRef(t);
  c.current = t;
  const a = nt.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  nt.useLayoutEffect(() => {
    a();
  }, [t, a]), nt.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), la), a();
    }, p = new ResizeObserver(f);
    p.observe(d);
    for (const m of e.current ?? []) m && p.observe(m);
    return () => {
      p.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, a]);
  const u = nt.useMemo(
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
function Vr() {
  const n = De(), e = et, t = e ? O(28, 40, n) : 28, r = e ? O(28, 40, n) : 28, i = e ? O(10, 14, n) : 10, o = e ? O(10, 14, n) : 10, s = e ? O(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Dh = et ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", aa = et ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", gr = et ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", ua = "hover:bg-red-950/50", Ph = et ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Lh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Oh = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", da = et ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Bh = et ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", bs = et ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", fa = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", ha = et ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", yr = ({ onClick: n, disabled: e, title: t, className: r = aa, children: i }) => {
  const o = Vr();
  return /* @__PURE__ */ h(In, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, xr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, Fh = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const p = Ut(), m = c ?? kc(p), g = c === "blue" || c === "emerald" ? c : (p == null ? void 0 : p.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, x = Vr(), T = De(), M = s && !et ? 24 : x.control.height, C = hn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), v = et ? C : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, R = (S) => i ? i(S) : n === S, J = nt.useRef(null), L = nt.useRef([]), A = Math.max(0, e.findIndex((S) => R(S.v))), q = ca(J, L, A);
  return l === "track" ? /* @__PURE__ */ E(
    "div",
    {
      ref: J,
      role: a ? "tablist" : "group",
      "aria-label": f,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${et ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${xr.wrap}`,
      children: [
        q.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${xr.pill} ${q.motionClass}`,
            style: { ...q.style, top: 2, bottom: 2 }
          }
        ),
        e.map((S, z) => {
          const _ = R(S.v), H = u && !!S.icon;
          return /* @__PURE__ */ h(
            "button",
            {
              ref: (U) => {
                L.current[z] = U;
              },
              ...S.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(S.v),
              title: S.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? _ : void 0,
              "aria-pressed": a ? void 0 : _,
              "aria-label": S.ariaLabel ?? (S.l ? void 0 : S.title),
              style: v,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${H ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${_ ? xr.active : xr.idle}`,
              children: /* @__PURE__ */ h(
                ls,
                {
                  icon: S.icon,
                  collapse: H,
                  iconWithLabel: d,
                  active: _,
                  gap: O(6, 8, T),
                  children: S.l
                }
              )
            },
            S.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ E("div", { ref: J, className: `relative ${fa} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    q.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${q.motionClass}`,
        style: { ...q.style, top: 0, bottom: 0 }
      }
    ),
    e.map((S, z) => {
      const _ = R(S.v);
      return /* @__PURE__ */ E(
        "button",
        {
          ref: (H) => {
            L.current[z] = H;
          },
          ...S.dataProps,
          disabled: r,
          onClick: () => t(S.v),
          title: S.title,
          style: { ...x.control, height: M },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${_ ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${S.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            S.icon,
            S.l
          ]
        },
        S.v
      );
    })
  ] });
}, Hh = ({ children: n }) => /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: et ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), pa = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", ma = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", _h = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ E("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? pa : ma, children: n }),
  e
] }), jh = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ E("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Wh = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ E("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(yr, { onClick: () => r(-1), disabled: n, title: "Move up", className: gr, children: /* @__PURE__ */ h(Bl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(yr, { onClick: () => r(1), disabled: n, title: "Move down", className: gr, children: /* @__PURE__ */ h(Fl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(yr, { onClick: e, disabled: n, title: "Duplicate", className: gr, children: /* @__PURE__ */ h(Ho, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: bs }),
    /* @__PURE__ */ h(yr, { onClick: t, disabled: n, title: "Delete", className: `${gr} ${ua}`, children: /* @__PURE__ */ h(di, { className: "w-2.5 h-2.5" }) })
  ] })
);
var uo = Object.defineProperty, ga = (n, e) => {
  let t = {};
  for (var r in n) uo(t, r, {
    get: n[r],
    enumerable: !0
  });
  return uo(t, Symbol.toStringTag, { value: "Module" }), t;
};
function wt(n) {
  this.content = n;
}
wt.prototype = {
  constructor: wt,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new wt(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new wt(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new wt([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new wt(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new wt(i);
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
    return n = wt.from(n), n.size ? new wt(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = wt.from(n), n.size ? new wt(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = wt.from(n);
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
wt.from = function(n) {
  if (n instanceof wt) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new wt(e);
};
function vs(n, e, t) {
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
      return c && c < s.length && c < l.length && Ss(s.charCodeAt(c - 1)) && ks(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = vs(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function ws(n, e, t, r) {
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
      return d && f && d < a.length && Ss(a.charCodeAt(d - 1)) && ks(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = ws(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function ks(n) {
  return n >= 56320 && n < 57344;
}
function Ss(n) {
  return n >= 55296 && n < 56320;
}
class K {
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
    return new K(i, this.size + e.size);
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
    return new K(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? K.empty : e == 0 && t == this.content.length ? this : new K(this.content.slice(e, t));
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
    return i[e] = t, new K(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new K([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new K(this.content.concat(e), this.size + e.nodeSize);
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
    return vs(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return ws(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return br(0, e);
    if (e == this.size)
      return br(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? br(t + 1, o) : br(t, r);
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
      return K.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return K.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return K.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new K(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return K.empty;
    if (e instanceof K)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new K([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
K.empty = new K([], 0);
const ri = { index: 0, offset: 0 };
function br(n, e) {
  return ri.index = n, ri.offset = e, ri;
}
function $r(n, e) {
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
      if (!$r(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !$r(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let je = class mi {
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
    return this == e || this.type == e.type && $r(this.attrs, e.attrs);
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
      return mi.none;
    if (e instanceof mi)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
je.none = [];
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
    let r = Ts(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new ce(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new ce(Ns(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
    return new ce(K.fromJSON(e, t.content), r, i);
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
ce.empty = new ce(K.empty, 0, 0);
function Ns(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Ns(o.content, e - i - 1, t - i - 1)));
}
function Ts(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Ts(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function ya(n, e, t) {
  if (t.openStart > n.depth)
    throw new rr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new rr("Inconsistent open depths");
  return Cs(n, e, t, 0);
}
function Cs(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Cs(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return kn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = xa(t, n);
      return kn(o, Ms(n, s, l, e, r));
    }
  else return kn(o, zr(n, e, r));
}
function Es(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new rr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function gi(n, e, t) {
  let r = n.node(t);
  return Es(r, e.node(t)), r;
}
function wn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function Zn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (wn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    wn(i.child(l), r);
  e && e.depth == t && e.textOffset && wn(e.nodeBefore, r);
}
function kn(n, e) {
  if (!n.type.validContent(e))
    throw new rr("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Ms(n, e, t, r, i) {
  let o = n.depth > i && gi(n, e, i + 1), s = r.depth > i && gi(t, r, i + 1), l = [];
  return Zn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Es(o, s), wn(kn(o, Ms(n, e, t, r, i + 1)), l)) : (o && wn(kn(o, zr(n, e, i + 1)), l), Zn(e, t, i, l), s && wn(kn(s, zr(t, r, i + 1)), l)), Zn(r, null, i, l), new K(l);
}
function zr(n, e, t) {
  let r = [];
  if (Zn(null, n, t, r), n.depth > t) {
    let i = gi(n, e, t + 1);
    wn(kn(i, zr(n, e, t + 1)), r);
  }
  return Zn(e, null, t, r), new K(r);
}
function xa(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(K.from(i));
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
        return new Dr(this, e, r);
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
    let r = fo.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      fo.set(e, r = new ba());
    let i = r.elts[r.i] = ir.resolve(e, t);
    return r.i = (r.i + 1) % va, i;
  }
}
class ba {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const va = 12, fo = /* @__PURE__ */ new WeakMap();
class Dr {
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
const wa = /* @__PURE__ */ Object.create(null);
let Ln = class yi {
  /**
  @internal
  */
  constructor(e, t, r, i = je.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || K.empty;
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
    return this.type == e && $r(this.attrs, t || e.defaultAttrs || wa) && je.sameSet(this.marks, r || je.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new yi(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new yi(this.type, this.attrs, this.content, e);
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
    return ya(this.resolve(e), this.resolve(t), r);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Rs(this.marks, e);
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
  canReplace(e, t, r = K.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), ho(this.type.attrs, this.attrs, "node", this.type.name);
    let e = je.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      ho(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
    let i = K.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Ln.prototype.text = void 0;
class Pr extends Ln {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Rs(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Pr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Pr(this.type, this.attrs, e, this.marks);
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
function Rs(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function ho(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Tn {
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
    let r = new ka(e, t);
    if (r.next == null)
      return Tn.empty;
    let i = As(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ra(Ma(i));
    return Aa(o, r), o;
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
        return K.from(l.map((a) => a.createAndFill()));
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
Tn.empty = new Tn(!0);
class ka {
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
function As(n) {
  let e = [];
  do
    e.push(Sa(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Sa(n) {
  let e = [];
  do
    e.push(Na(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Na(n) {
  let e = Ea(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Ta(n, e);
    else
      break;
  return e;
}
function po(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Ta(n, e) {
  let t = po(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = po(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Ca(n, e) {
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
function Ea(n) {
  if (n.eat("(")) {
    let e = As(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Ca(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ma(n) {
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
function Is(n, e) {
  return e - n;
}
function mo(n, e) {
  let t = [];
  return r(e), t.sort(Is);
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
function Ra(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(mo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        mo(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Tn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Is);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Aa(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function $s(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function zs(n, e) {
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
function Ds(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new $a(n, r, e[r]);
  return t;
}
class Lr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ds(e, r.attrs), this.defaultAttrs = $s(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Tn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : zs(this.attrs, e);
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
    return new Ln(this, this.computeAttrs(e), K.from(t), je.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = K.from(t), this.checkContent(t), new Ln(this, this.computeAttrs(e), t, je.setFrom(r));
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
    if (e = this.computeAttrs(e), t = K.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(K.empty, !0);
    return o ? new Ln(this, e, t.append(o), je.setFrom(r)) : null;
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
    e.forEach((o, s) => r[o] = new Lr(o, t, s));
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
function Ia(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class $a {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Ia(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Yr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ds(e, i.attrs), this.excluded = null;
    let o = $s(this.attrs);
    this.instance = o ? new je(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new je(this, zs(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Yr(o, i++, t, s)), r;
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
class za {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = wt.from(e.nodes), t.marks = wt.from(e.marks || {}), this.nodes = Lr.compile(this.spec.nodes, this), this.marks = Yr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Tn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? go(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : go(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Ln.fromJSON(this, i), this.markFromJSON = (i) => je.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Lr) {
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
    return new Pr(r, r.defaultAttrs, e, je.setFrom(t));
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
function go(n, e) {
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
function Da(n) {
  return n.tag != null;
}
function Pa(n) {
  return n.style != null;
}
class On {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Da(i))
        this.tags.push(i);
      else if (Pa(i)) {
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
    let r = new xo(this, t, !1);
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
    let r = new xo(this, t, !0);
    return r.addAll(e, je.none, t.from, t.to), ce.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ba(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = bo(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = bo(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new On(e, On.schemaRules(e)));
  }
}
const Ps = {
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
}, La = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Ls = { ol: !0, ul: !0 }, or = 1, xi = 2, er = 4;
function yo(n, e, t) {
  return e != null ? (e ? or : 0) | (e === "full" ? xi : 0) : n && n.whitespace == "pre" ? or | xi : t & ~er;
}
class vr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = je.none, this.match = o || (s & er ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(K.from(e));
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
    if (!(this.options & or)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = K.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(K.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ps.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class xo {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = yo(null, t.preserveWhitespace, 0) | (r ? er : 0);
    i ? o = new vr(i.type, i.attrs, je.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new vr(null, null, je.none, !0, null, s) : o = new vr(e.schema.topNodeType, null, je.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & xi ? "full" : this.localPreserveWS || (i.options & or) > 0, { schema: s } = this.parser;
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
    Ls.hasOwnProperty(s) && this.parser.normalizeLists && Oa(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : La.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Ps.hasOwnProperty(s))
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
        (o.type ? o.type.allowsMarkType(l.type) : vo(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = yo(e, o, s.options);
    s.options & er && s.content.length == 0 && (l |= er);
    let c = je.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : vo(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new vr(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= or);
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
function Oa(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Ls.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ba(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function bo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function vo(n, e) {
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
const Os = 65535, Bs = Math.pow(2, 16);
function Fa(n, e) {
  return n + e * Bs;
}
function wo(n) {
  return n & Os;
}
function Ha(n) {
  return (n - (n & Os)) / Bs;
}
const Fs = 1, Hs = 2, Tr = 4, _s = 8;
class bi {
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
    return (this.delInfo & _s) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Fs | Tr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Hs | Tr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Tr) > 0;
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
    let t = 0, r = wo(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Ha(e);
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
        let m = e == (t < 0 ? c : d) ? null : Fa(l / 3, e - c), g = e == c ? Hs : e == d ? Fs : Tr;
        return (t < 0 ? e != c : e != d) && (g |= _s), new bi(p, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new bi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = wo(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
class Or {
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
    return new Or(this._maps, this.mirror, e, t);
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
    let e = new Or();
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
    return r ? e : new bi(e, i, null);
  }
}
const ii = /* @__PURE__ */ Object.create(null);
class Ct {
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
    let r = ii[t.stepType];
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
    if (e in ii)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ii[e] = t, t.prototype.jsonID = e, t;
  }
}
class ut {
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
    return new ut(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ut(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return ut.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof rr)
        return ut.fail(o.message);
      throw o;
    }
  }
}
function Fi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Fi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return K.fromArray(r);
}
class un extends Ct {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ce(Fi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ut.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Wt(this.from, this.to, this.mark);
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
Ct.jsonID("addMark", un);
class Wt extends Ct {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new ce(Fi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ut.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new un(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Wt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Wt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Wt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Wt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ct.jsonID("removeMark", Wt);
class dn extends Ct {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ut.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ut.fromReplace(e, this.pos, this.pos + 1, new ce(K.from(r), 0, t.isLeaf ? 0 : 1));
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
    return new Cn(this.pos, this.mark);
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
Ct.jsonID("addNodeMark", dn);
class Cn extends Ct {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ut.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ut.fromReplace(e, this.pos, this.pos + 1, new ce(K.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new dn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Cn(t.pos, this.mark);
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
    return new Cn(t.pos, e.markFromJSON(t.mark));
  }
}
Ct.jsonID("removeNodeMark", Cn);
class at extends Ct {
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
    return this.structure && vi(e, this.from, this.to) ? ut.fail("Structure replace would overwrite content") : ut.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Dt([this.from, this.to - this.from, this.slice.size]);
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
Ct.jsonID("replace", at);
class yt extends Ct {
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
    if (this.structure && (vi(e, this.from, this.gapFrom) || vi(e, this.gapTo, this.to)))
      return ut.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ut.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ut.fromReplace(e, this.from, this.to, r) : ut.fail("Content does not fit in gap");
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
    return new yt(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new yt(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new yt(t.from, t.to, t.gapFrom, t.gapTo, ce.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ct.jsonID("replaceAround", yt);
function vi(n, e, t) {
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
function _a(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = p : i.push(s = new Wt(f, p, d[g])));
      l && l.to == f ? l.to = p : o.push(l = new un(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function ja(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Yr) {
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
  }), i.forEach((s) => n.step(new Wt(s.from, s.to, s.style)));
}
function Hi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new at(l, u, ce.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new Wt(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new ce(K.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new at(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(K.empty, !0);
    n.replace(l, l, new ce(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function Wa(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function qn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Wa(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function qa(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = K.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = K.from(r.node(m).copy(u)), d++) : c--;
  let f = K.empty, p = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = K.from(i.node(m).copy(f)), p++) : a++;
  n.step(new yt(c, a, s, l, new ce(u.append(f), d, p), u.size - d, !0));
}
function js(n, e, t = null, r = n) {
  let i = Ka(n, e), o = i && Ja(r, e);
  return o ? i.map(ko).concat({ type: e, attrs: t }).concat(o.map(ko)) : null;
}
function ko(n) {
  return { type: n, attrs: null };
}
function Ka(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Ja(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function Va(n, e, t) {
  let r = K.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = K.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new yt(i, o, i, o, new ce(r, 0, 0), t.length, !0));
}
function Ya(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && Ua(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && qs(n, s, l, o), Hi(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new yt(d, f, d + 1, f - 1, new ce(K.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && Ws(n, s, l, o), !1;
    }
  });
}
function Ws(n, e, t, r) {
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
function qs(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Ua(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Ga(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new yt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ce(K.from(s), 0, 0), 1, !0));
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
    let g = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !g.type.validContent(p))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function Xa(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = K.empty, s = K.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = K.from(i.node(l).copy(o));
    let u = r && r[a];
    s = K.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new at(e, e, new ce(o.append(s), t, t), !0));
}
function En(n, e) {
  let t = n.resolve(e), r = t.index();
  return Ks(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Qa(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Ks(n, e) {
  return !!(n && e && !n.isLeaf && Qa(n, e));
}
function Ur(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Ks(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Za(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    qs(n, u.node(), u.before(), l);
  }
  s.inlineContent && Hi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new at(a, c.map(e + t, -1), ce.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    Ws(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function eu(n, e, t) {
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
function Gr(n, e, t = e, r = ce.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Js(i, o, r) ? new at(e, t, r) : new tu(i, o, r).fit();
}
function Js(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class tu {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = K.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = K.from(e.node(i).copy(this.placed));
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
    return e > -1 ? new yt(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new at(r.pos, i.pos, c) : null;
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
        r ? (o = oi(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(K.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = oi(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new ce(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = oi(e, t);
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
      a++, (a > 1 || c == 0 || g.content.size) && (d = b, u.push(Vs(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Qn(this.placed, t, K.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < p; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? ce.empty : new ce(Xn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new ce(Xn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !si(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = si(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = si(e, l, a, c, !0);
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
    i.match = i.match.matchType(e), this.placed = Qn(this.placed, this.depth, K.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(K.empty, !0);
    t.childCount && (this.placed = Qn(this.placed, this.frontier.length, t));
  }
}
function Xn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Xn(n.firstChild.content, e - 1, t)));
}
function Qn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Qn(n.lastChild.content, e - 1, t)));
}
function oi(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Vs(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Vs(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(K.empty, !0)))), n.copy(r);
}
function si(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !nu(t, o.content, s) ? l : null;
}
function nu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function ru(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function iu(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Js(i, o, r))
    return n.step(new at(e, t, r));
  let s = Us(i, o);
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
    let p = a[f], m = ru(p.type);
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
        let T = i.node(b - 1), M = i.index(b - 1);
        if (T.canReplaceWith(M, M, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new ce(Ys(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function Ys(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Ys(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(K.empty, !0));
  }
  return n;
}
function ou(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = eu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new ce(K.from(r), 0, 0));
}
function su(n, e, t) {
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
  let o = Us(r, i);
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
function Us(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Bn extends Ct {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ut.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return ut.fromReplace(e, this.pos, this.pos + 1, new ce(K.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Dt.empty;
  }
  invert(e) {
    return new Bn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Bn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Bn(t.pos, t.attr, t.value);
  }
}
Ct.jsonID("attr", Bn);
class sr extends Ct {
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
    return ut.ok(r);
  }
  getMap() {
    return Dt.empty;
  }
  invert(e) {
    return new sr(this.attr, e.attrs[this.attr]);
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
    return new sr(t.attr, t.value);
  }
}
Ct.jsonID("docAttr", sr);
let Hn = class extends Error {
};
Hn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Hn.prototype = Object.create(Error.prototype);
Hn.prototype.constructor = Hn;
Hn.prototype.name = "TransformError";
class lu {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Or();
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
      throw new Hn(t.failed);
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
    let i = Gr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new ce(K.from(r), 0, 0));
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
    return iu(this, e, t, r), this;
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
    return ou(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return su(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return qa(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Za(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Va(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Ya(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Ga(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Bn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new sr(e, t)), this;
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
    if (t instanceof je)
      t.isInSet(r.marks) && this.step(new Cn(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new Cn(e, o)), i = o.removeFromSet(i);
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
    return Xa(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return _a(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return ja(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Hi(this, e, t, r), this;
  }
}
const li = /* @__PURE__ */ Object.create(null);
class Ze {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new cu(e.min(t), e.max(t))];
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
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? ce.empty : t), l == 0 && To(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), To(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new $t(e) : $n(e.node(0), e.parent, e.pos, e.index(), t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new qt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return $n(e, e, 0, 0, 1) || new qt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return $n(e, e, e.content.size, e.childCount, -1) || new qt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = li[t.type];
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
    if (e in li)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return li[e] = t, t.prototype.jsonID = e, t;
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
    return $t.between(this.$anchor, this.$head).getBookmark();
  }
}
Ze.prototype.visible = !0;
class cu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let So = !1;
function No(n) {
  !So && !n.parent.inlineContent && (So = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class $t extends Ze {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    No(e), No(t), super(e, t);
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
    return new $t(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = ce.empty) {
    if (super.replace(e, t), t == ce.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof $t && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Xr(this.anchor, this.head);
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
    return new $t(e.resolve(t.anchor), e.resolve(t.head));
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
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ze.findFrom(e, -r, !0) || Ze.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new $t(e, t);
  }
}
Ze.jsonID("text", $t);
class Xr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Xr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return $t.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class We extends Ze {
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
    return r ? Ze.near(o) : new We(o);
  }
  content() {
    return new ce(K.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof We && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new _i(this.anchor);
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
Ze.jsonID("node", We);
class _i {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Xr(r, r) : new _i(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && We.isSelectable(r) ? new We(t) : Ze.near(t);
  }
}
class qt extends Ze {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = ce.empty) {
    if (t == ce.empty) {
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
    return new qt(e);
  }
  map(e) {
    return new qt(e);
  }
  eq(e) {
    return e instanceof qt;
  }
  getBookmark() {
    return au;
  }
}
Ze.jsonID("all", qt);
const au = {
  map() {
    return this;
  },
  resolve(n) {
    return new qt(n);
  }
};
function $n(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return $t.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && We.isSelectable(l))
        return We.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = $n(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function To(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof at || i instanceof yt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(Ze.near(n.doc.resolve(s), t));
}
function Co(n, e) {
  return !e || !n ? n : n.bind(e);
}
class wr {
  constructor(e, t, r) {
    this.name = e, this.init = Co(t.init, r), this.apply = Co(t.apply, r);
  }
}
new wr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new wr("selection", {
  init(n, e) {
    return n.selection || Ze.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new wr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new wr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Gs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Xs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Qs = (n, e, t) => {
  let r = Xs(n, t);
  if (!r)
    return !1;
  let i = ji(r);
  if (!i) {
    let s = r.blockRange(), l = s && qn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (ll(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (_n(o, "end") || We.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Gr(n.doc, r.before(s), r.after(s), ce.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(_n(o, "end") ? Ze.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : We.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, uu = (n, e, t) => {
  let r = Xs(n, t);
  if (!r)
    return !1;
  let i = ji(r);
  return i ? Zs(n, i, e) : !1;
}, du = (n, e, t) => {
  let r = tl(n, t);
  if (!r)
    return !1;
  let i = Wi(r);
  return i ? Zs(n, i, e) : !1;
};
function Zs(n, e, t) {
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
  let a = Gr(n.doc, o, c, ce.empty);
  if (!a || a.from != o || a instanceof at && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection($t.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function _n(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const el = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = ji(r);
  }
  let s = o && o.nodeBefore;
  return !s || !We.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(We.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function ji(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function tl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const nl = (n, e, t) => {
  let r = tl(n, t);
  if (!r)
    return !1;
  let i = Wi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (ll(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (_n(o, "start") || We.isSelectable(o))) {
    let s = Gr(n.doc, r.before(), r.after(), ce.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(_n(o, "start") ? Ze.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : We.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, rl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Wi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !We.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(We.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Wi(n) {
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
const fu = (n, e) => {
  let t = n.selection, r = t instanceof We, i;
  if (r) {
    if (t.node.isTextblock || !En(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Ur(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(We.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, hu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof We) {
    if (t.node.isTextblock || !En(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Ur(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, pu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && qn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, il = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function qi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const mu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = qi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(Ze.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, ol = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof qt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = qi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection($t.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, sl = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (sn(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && qn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function gu(n) {
  return (e, t) => {
    if (e.selection instanceof We && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !sn(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof $t || e.selection instanceof qt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = qi(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
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
      let p = r.mapping.slice(o), m = p.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const yu = gu(), xu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(We.create(n.doc, i))), !0);
};
function bu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || En(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function ll(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && bu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = K.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = K.from(s[x].create(null, m));
      m = K.from(i.copy(m));
      let g = n.tr.step(new yt(e.pos - 1, p, e.pos, p, new ce(m, 1, 0), s.length, !0)), b = g.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && En(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : Ze.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && qn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && _n(o, "start", !0) && _n(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, g.content)) {
      if (t) {
        let x = K.empty;
        for (let M = m.length - 1; M >= 0; M--)
          x = K.from(m[M].copy(x));
        let T = n.tr.step(new yt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new ce(x, m.length, 0), 0, !0));
        t(T.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function cl(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection($t.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const vu = cl(-1), wu = cl(1);
function ku(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && js(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Eo(n, e = null) {
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
function Ki(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Ki(Gs, Qs, el);
Ki(Gs, nl, rl);
Ki(il, ol, sl, yu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Su(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Nu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Nu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Dr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Dr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = js(o, t, r, e);
  return l ? (n && Tu(n, e, l, i, t), !0) : !1;
}
function Tu(n, e, t, r, i) {
  let o = K.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = K.from(t[u].type.create(t[u].attrs, o));
  n.step(new yt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ce(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && sn(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function Cu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Eu(e, t, n, o) : Mu(e, t, o) : !0 : !1;
  };
}
function Eu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new yt(o - 1, s, o, s, new ce(K.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Dr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = qn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return En(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Mu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let p = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    p -= i.child(m).nodeSize, r.delete(p - 1, p + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? K.empty : K.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new yt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new ce((l ? K.empty : K.from(i.copy(K.empty))).append(c ? K.empty : K.from(i.copy(K.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Ru(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = K.from(a ? n.create() : null), d = new ce(K.from(n.create(null, K.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new yt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function al(n) {
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
var Au = class ul {
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
    const e = ul.createFakeChain();
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
      state: al({
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
const Iu = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), $u = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), zu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = qn(p);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, g);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Du = (n) => (e) => n(e), Pu = () => ({ state: n, dispatch: e }) => ol(n, e), Lu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Ft(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Ou = () => ({ tr: n, dispatch: e }) => {
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
function Tt(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Bu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Tt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Fu = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Hu = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Mo = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Hu(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, _u = (n, e, t) => ({
  from: Mo(n, t, "left"),
  to: Mo(e, t, "right")
}), ju = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = _u(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Ft.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Wu = () => ({ commands: n }) => n.keyboardShortcut("Enter"), qu = () => ({ state: n, dispatch: e }) => mu(n, e);
function Ku(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Br(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Ku(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function dl(n, e, t = {}) {
  return n.find((r) => r.type === e && Br(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Ro(n, e, t = {}) {
  return !!dl(n, e, t);
}
function fl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!dl([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Ro([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Ro([...n.parent.child(s).marks], e, t); )
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
const Ju = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = gn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = fl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Ft.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Vu = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function hl(n) {
  return n instanceof Ft;
}
function vn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Yu(n, e = null) {
  if (!e) return null;
  const t = Pn.atStart(n), r = Pn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Ft.create(n, vn(0, i, o), vn(n.content.size, i, o)) : Ft.create(n, vn(e, i, o), vn(e, i, o));
}
function Ao() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Fr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Uu() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Gu = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Fr() || Ao()) && r.dom.focus(), Uu() && !Fr() && !Ao() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !hl(t.state.selection))
    return s(), !0;
  const l = Yu(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Xu = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), Qu = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), pl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && pl(r);
  }
  return n;
};
function kr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return pl(t);
}
function ml(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function jn(n, e, t) {
  if (ml(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return K.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), jn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new za({
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
      if (t.slice ? On.fromSchema(c).parseSlice(kr(n), t.parseOptions) : On.fromSchema(c).parse(kr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = On.fromSchema(e);
    return t.slice ? o.parseSlice(kr(n), t.parseOptions).content : o.parse(kr(n), t.parseOptions);
  }
  return jn("", e, t);
}
function gl(n) {
  return !("type" in n);
}
function yl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof at || i instanceof yt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Pn.near(n.doc.resolve(s), t));
}
const Zu = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
      jn(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = jn(e, o.schema, {
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
    const m = gl(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : ml(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = K.from(m);
      const b = r.doc.resolve(u), x = b.node(), T = b.parentOffset === 0, M = x.isText || x.isTextblock, C = x.content.size > 0;
      T && M && C && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && yl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function xl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const ed = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = xl(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = jn(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && yl(e, e.steps.length - 1, -1)), !0) : !1;
}, td = () => ({ state: n, dispatch: e }) => fu(n, e), nd = () => ({ state: n, dispatch: e }) => hu(n, e), rd = () => ({ state: n, dispatch: e }) => Qs(n, e), id = () => ({ state: n, dispatch: e }) => nl(n, e), od = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Ur(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, sd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Ur(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, ld = () => ({ state: n, dispatch: e }) => uu(n, e), cd = () => ({ state: n, dispatch: e }) => du(n, e);
function bl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function ad(n) {
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
      Fr() || bl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const ud = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = ad(n).split(/-(?!$)/), s = o.find((a) => ![
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
function Ji(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Tt(e, n.schema) : null, l = [];
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
const dd = (n, e = {}) => ({ state: t, dispatch: r }) => Ji(t, Tt(n, t.schema), e) ? pu(t, r) : !1, fd = () => ({ state: n, dispatch: e }) => sl(n, e), hd = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Cu(r)(e, t);
}, pd = () => ({ state: n, dispatch: e }) => il(n, e);
function vl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Io(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const md = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = vl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = gn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, Io(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(Io(f.attrs, e))));
      });
    });
  }), c;
}, gd = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), yd = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new tc(n.doc);
    n.setSelection(t);
  }
  return !0;
}, xd = () => ({ state: n, dispatch: e }) => el(n, e), bd = () => ({ state: n, dispatch: e }) => rl(n, e), vd = () => ({ state: n, dispatch: e }) => xu(n, e), wd = () => ({ state: n, dispatch: e }) => wu(n, e), kd = () => ({ state: n, dispatch: e }) => vu(n, e);
function Sd(n, e, t = {}, r = {}) {
  return jn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Nd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Sd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = gl(a) ? a.content : [a];
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
function Td(n, e) {
  const t = gn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Cd(n, e) {
  const t = new lu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Ed(n, e) {
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
function Vi(n) {
  return (e) => Ed(e.$from, n);
}
function lr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? lr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? lr(n.parent, e, t) : null
  }) : n.config[e];
}
function Md(n) {
  return typeof n == "function";
}
function wi(n, e = void 0, ...t) {
  return Md(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function wl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Rd(n, e, t) {
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
function Ad(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Id(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function $d(n) {
  const e = Id(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function zd(n) {
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
  }), $d(r);
}
function Cr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Dd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? gn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Br(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), x = Math.min(p, g + m.nodeSize), T = x - b;
      s += T, l.push(...m.marks.map((M) => ({
        mark: M,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Br(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function ci(n, e) {
  const { nodeExtensions: t } = wl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = wi(lr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function kl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (kl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Pd(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (hl(r) && (i = r.$cursor), i) {
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
const Ld = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = gn(n, r.schema);
  if (i)
    if (s) {
      const a = Td(r, c);
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
  return Pd(r, t, c);
}, Od = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Bd = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Tt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Eo(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Eo(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Fd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = vn(n, 0, r.content.size), o = Fn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Hd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, _d = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Ft.atStart(r).from, l = Ft.atEnd(r).to, c = vn(i, s, l), a = vn(o, s, l), u = Ft.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, jd = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Ru(r)(e, t);
};
function $o(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Wd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = Cr(a, l.node().type.name, l.node().attrs);
  if (o instanceof Fn && o.node.isBlock)
    return !l.parentOffset || !sn(s, l.pos) ? !1 : (r && (n && $o(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : xl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = sn(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !m && sn(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof Ft && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && $o(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, qd = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Tt(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = K.empty;
      const T = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let L = l.depth - T; L >= l.depth - 3; L -= 1) x = K.from(l.node(L).copy(x));
      const M = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, C = {
        ...Cr(d, l.node().type.name, l.node().attrs),
        ...e
      }, v = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(C)) || void 0;
      x = x.append(K.from(s.createAndFill(null, v) || void 0));
      const R = l.before(l.depth - (T - 1));
      t.replace(R, l.after(-M), new ce(x, 4 - T, 0));
      let J = -1;
      t.doc.nodesBetween(R, t.doc.content.size, (L, A) => {
        if (J > -1) return !1;
        L.isTextblock && L.content.size === 0 && (J = A + 1);
      }), J > -1 && t.setSelection(Ft.near(t.doc.resolve(J))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Cr(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Cr(d, l.node().type.name, l.node().attrs),
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
  if (!sn(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: T } = r, { splittableMarks: M } = o.extensionManager, C = T || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !C || !i) return !0;
    const v = C.filter((R) => M.includes(R.type.name));
    t.ensureMarks(v);
  }
  return !0;
};
function zo(n) {
  return !n || n === "1" ? null : n;
}
function Sl(n, e) {
  return zo(n) === zo(e);
}
const ai = (n, e) => {
  const t = Vi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && En(n.doc, t.pos)) || !Sl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, ui = (n, e) => {
  const t = Vi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && En(n.doc, r)) || !Sl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Kd(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Ft.between(r, i);
}
const Jd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = Tt(n, s.schema), m = Tt(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: T } = g, M = x.blockRange(T), C = b || g.$to.parentOffset && g.$from.marks();
  if (!M) return !1;
  const v = Vi((_) => ci(_.type.name, d))(g), R = g.from === 0 && g.to === s.doc.content.size, J = s.doc.content.content, L = J.length === 1 ? J[0] : null, A = R && L && ci(L.type.name, d) ? {
    node: L,
    pos: 0
  } : null, q = v ?? A, S = !!v && M.depth >= 1 && M.depth - v.depth <= 1, z = !!A;
  if ((S || z) && q) {
    if (q.node.type === p)
      return R && z ? c().command(({ tr: _, dispatch: H }) => {
        const U = Kd(_);
        return U ? (_.setSelection(U), H && H(_), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (ci(q.node.type.name, d) && p.validContent(q.node.content)) return c().command(() => (o.setNodeMarkup(q.pos, p), !0)).command(() => ai(o, p)).command(() => ui(o, p)).run();
  }
  return !t || !C || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => ai(o, p)).command(() => ui(o, p)).run() : c().command(() => {
    const _ = u().wrapInList(p, r), H = C.filter((U) => f.includes(U.type.name));
    return o.ensureMarks(H), _ ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => ai(o, p)).command(() => ui(o, p)).run();
}, Vd = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = gn(n, r.schema);
  return Dd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Yd = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Tt(n, r.schema), s = Tt(e, r.schema), l = Ji(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, Ud = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Tt(n, t.schema);
  return Ji(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Gd = () => ({ state: n, dispatch: e }) => {
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
}, Xd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, Qd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = gn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = fl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Zd = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, ef = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = vl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = gn(n, r.schema));
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
      })), s && b.marks.length && b.marks.forEach((T) => {
        if (s === T.type && (c = !0, i)) {
          const M = Math.max(x, u), C = Math.min(x + b.nodeSize, d);
          t.addMark(M, C, s.create({
            ...T.attrs,
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
}, tf = new Kt("__tiptap_decorations__"), nf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(tf, {
  type: "force",
  name: n
}), !0), rf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return ku(i, e)(t, r);
}, of = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return Su(i, e)(t, r);
};
var sf = /* @__PURE__ */ ga({
  blur: () => Iu,
  clearContent: () => $u,
  clearNodes: () => zu,
  command: () => Du,
  createParagraphNear: () => Pu,
  cut: () => Lu,
  deleteCurrentNode: () => Ou,
  deleteNode: () => Bu,
  deleteRange: () => Fu,
  deleteSelection: () => ju,
  enter: () => Wu,
  exitCode: () => qu,
  extendMarkRange: () => Ju,
  first: () => Vu,
  focus: () => Gu,
  forEach: () => Xu,
  insertContent: () => Qu,
  insertContentAt: () => Zu,
  insertDefaultBlock: () => ed,
  joinBackward: () => rd,
  joinDown: () => nd,
  joinForward: () => id,
  joinItemBackward: () => od,
  joinItemForward: () => sd,
  joinTextblockBackward: () => ld,
  joinTextblockForward: () => cd,
  joinUp: () => td,
  keyboardShortcut: () => ud,
  lift: () => dd,
  liftEmptyBlock: () => fd,
  liftListItem: () => hd,
  newlineInCode: () => pd,
  resetAttributes: () => md,
  scrollIntoView: () => gd,
  selectAll: () => yd,
  selectNodeBackward: () => xd,
  selectNodeForward: () => bd,
  selectParentNode: () => vd,
  selectTextblockEnd: () => wd,
  selectTextblockStart: () => kd,
  setContent: () => Nd,
  setMark: () => Ld,
  setMeta: () => Od,
  setNode: () => Bd,
  setNodeSelection: () => Fd,
  setTextDirection: () => Hd,
  setTextSelection: () => _d,
  sinkListItem: () => jd,
  splitBlock: () => Wd,
  splitListItem: () => qd,
  toggleList: () => Jd,
  toggleMark: () => Vd,
  toggleNode: () => Yd,
  toggleWrap: () => Ud,
  undoInputRule: () => Gd,
  unsetAllMarks: () => Xd,
  unsetMark: () => Qd,
  unsetTextDirection: () => Zd,
  updateAttributes: () => ef,
  updateDecorations: () => nf,
  wrapIn: () => rf,
  wrapInList: () => of
});
typeof process < "u" && process.env.NODE_ENV;
function lf(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Sr(n) {
  return lf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Nl(n, e) {
  const t = { ...n };
  return Sr(n) && Sr(e) && Object.keys(e).forEach((r) => {
    Sr(e[r]) && Sr(n[r]) ? t[r] = Nl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Tl = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...wi(lr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...wi(lr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Nl(this.options, n)
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
}, cf = class Cl extends Tl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Cl(t);
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
}, Ht = class El extends Tl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new El(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
Ht.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Kt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Ad(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => Rd(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Ht.create({
  name: "commands",
  addCommands() {
    return { ...sf };
  }
});
Ht.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Cd(n.before, [n, ...e]);
      zd(c).forEach((u) => {
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
        if (u instanceof Wt) {
          var f, p;
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(g), T = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((C) => C.eq(u.mark)) : !1, M = (p = c.doc.nodeAt(g)) === null || p === void 0 ? void 0 : p.marks.some((C) => C.eq(u.mark));
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
            partial: !!(M || T),
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
Ht.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new ln({
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
Ht.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new ln({
      key: new Kt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const af = new Kt("focusEvents");
Ht.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new ln({
      key: af,
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
Ht.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : Pn.atStart(a).from === f;
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
    return Fr() || bl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Kt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Pn.atStart(e.doc).from, a = Pn.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !kl(t.doc)) return;
        const u = t.tr, d = al({
          state: t,
          transaction: u
        }), { commands: f } = new Au({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
Ht.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new ln({
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
Ht.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Kt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Ht.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = wl(this.extensions);
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
    return [new ln({
      key: new Kt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const uf = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), df = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), ff = /^(https?:\/\/|mailto:)/i;
function hf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    df.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function ki(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(ki(c));
    return l;
  };
  if (!uf.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!ff.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = hf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(ki(l));
  return i;
}
function Ml(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function pf(n) {
  const e = Ml(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(ki(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function qh(n) {
  const e = Ml(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Kh(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function mf(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Do(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const gf = { text: "#52525b" }, yf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? gf, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    Ql,
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
        b && Fn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new Fn(g))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, xf = fc.extend({
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
    return Xl(yf);
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
    return ["span", Gl({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), bf = 240, vf = 280, wf = ({ props: n, onApi: e }) => {
  const t = Kr(), r = w(e);
  r.current = e, le(() => {
    r.current(t);
  }, [t]);
  const i = w(null);
  le(() => {
    var s;
    t.pointerDriven || mn((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), le(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = qr();
  return /* @__PURE__ */ h(dr.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: vf, maxHeight: bf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        kf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, kf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = ps({
    label: () => n.label,
    activate: t
  }), s = De(), l = { padding: `${O(8, 12, s)}px ${O(12, 16, s)}px`, fontSize: O(12, 14, s) };
  return /* @__PURE__ */ E(
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
}, Po = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h(wf, { props: r, onApi: (i) => {
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
      const o = hc(i);
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
}, Sf = cf.create({
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
}), Er = new Kt("retainedSelectionHighlight"), Nf = Ht.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new ln({
        key: Er,
        state: {
          init: () => ({ held: !1, decorations: hr.empty }),
          apply(n, e) {
            const t = n.getMeta(Er), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: hr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? hr.empty : hr.create(n.doc, [nc.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Er.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Jh = {
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
function Rl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Tf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Rl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Cf = nt.forwardRef(({
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
  const x = w(null), T = w(null), M = w(e);
  M.current = e;
  const C = w(r);
  C.current = r;
  const v = w(o);
  v.current = o;
  const R = w(null), J = (z) => {
    var xe;
    const _ = z.getAttributes("textStyle"), H = z.getAttributes("reportTextStyle"), { from: U, to: N, empty: V } = z.state.selection;
    let W = !1, fe = !1, I = !1;
    if (!V) {
      const G = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Set(), Y = /* @__PURE__ */ new Set();
      z.state.doc.nodesBetween(U, N, (ge) => {
        if (!ge.isText) return;
        const D = ge.marks.find((F) => F.type.name === "textStyle");
        G.add((D == null ? void 0 : D.attrs.fontFamily) || ""), ee.add((D == null ? void 0 : D.attrs.fontSize) || "");
        const oe = ge.marks.find((F) => F.type.name === "reportTextStyle");
        Y.add((oe == null ? void 0 : oe.attrs.styleId) || "");
      }), W = G.size > 1, fe = ee.size > 1, I = Y.size > 1;
    }
    const ye = {
      bold: z.isActive("bold"),
      italic: z.isActive("italic"),
      underline: z.isActive("underline"),
      strike: z.isActive("strike"),
      link: z.isActive("link"),
      color: _.color || "",
      fontFamily: _.fontFamily || "",
      fontSize: _.fontSize || "",
      textStyle: H.styleId || "",
      hasSelection: !V,
      fontFamilyMixed: W,
      fontSizeMixed: fe,
      textStyleMixed: I
    }, pe = R.current;
    pe && pe.bold === ye.bold && pe.italic === ye.italic && pe.underline === ye.underline && pe.strike === ye.strike && pe.link === ye.link && pe.color === ye.color && pe.fontFamily === ye.fontFamily && pe.fontSize === ye.fontSize && pe.textStyle === ye.textStyle && pe.hasSelection === ye.hasSelection && pe.fontFamilyMixed === ye.fontFamilyMixed && pe.fontSizeMixed === ye.fontSizeMixed && pe.textStyleMixed === ye.textStyleMixed || (R.current = ye, (xe = v.current) == null || xe.call(v, ye));
  }, L = (z) => {
    var V;
    const _ = z.state.selection;
    let H = null;
    _ instanceof Fn && _.node.type.name === "token" ? (H = { key: _.node.attrs.field ?? "", pos: _.from }, x.current = _.from) : x.current != null && (x.current = z.state.tr.mapping.map(x.current));
    const U = T.current, N = U && H && U.key === H.key && U.pos === H.pos;
    !U && !H || N || (T.current = H, (V = b.current) == null || V.call(b, H));
  }, A = (z) => {
    const _ = pf(mf(z));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(_) ? "" : _;
  }, q = nt.useMemo(() => {
    const z = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: U }) => {
        var N;
        return ((N = p.current) == null ? void 0 : N.call(p, U)) ?? [];
      },
      command: ({ editor: U, range: N, props: V }) => {
        U.chain().focus().insertContentAt(N, { type: "token", attrs: { field: V.field } }).run();
      },
      render: Po
    }, _ = xf.configure({
      resolve: f.current ?? null,
      suggestion: z,
      onTokenClick: (U, N, V) => {
        var W;
        x.current = V, (W = g.current) == null || W.call(g, U, N, V);
      }
    }), H = Ht.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          dc({
            pluginKey: new Kt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: U, range: N }) => Rl(U, N.from) != null,
            items: ({ editor: U, query: N }) => {
              var W;
              const V = Tf(U);
              return V ? ((W = m.current) == null ? void 0 : W.call(m, V.chipKey, N)) ?? [] : [];
            },
            command: ({ editor: U, range: N, props: V }) => {
              U.chain().focus().insertContentAt(N, { type: "token", attrs: { field: V.field } }).run();
            },
            render: Po
          })
        ];
      }
    });
    return [_, H];
  }, []), S = Zl({
    immediatelyRender: !1,
    extensions: [
      rc,
      ic.configure({ placeholder: t }),
      oc,
      sc,
      lc,
      Sf,
      Nf,
      cc,
      uc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      ac.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...q
    ],
    content: Do(n || ""),
    editable: !r,
    onUpdate: ({ editor: z }) => {
      M.current(A(z.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: z }) => {
      J(z), L(z);
    }
  });
  return le(() => {
    if (!S || S.isFocused) return;
    A(S.getHTML()) !== n && (R.current = null, S.commands.setContent(Do(n || ""), { emitUpdate: !1 }), J(S));
  }, [n, S]), le(() => {
    S && S.setEditable(!r);
  }, [r, S]), le(() => {
    S && (R.current = null, J(S), L(S));
  }, [S]), Fo(d, () => ({
    exec: (z, _, H) => {
      if (!S || C.current) return;
      const U = S.chain(), N = (H == null ? void 0 : H.focus) === !1 ? U : U.focus();
      switch (z) {
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
          _ && N.setColor(_).run();
          break;
        case "unsetColor":
          N.unsetColor().run();
          break;
        case "fontFamily":
          _ && N.setFontFamily(_).run();
          break;
        case "unsetFontFamily":
          N.unsetFontFamily().run();
          break;
        case "fontSize":
          _ && N.setFontSize(_).run();
          break;
        case "unsetFontSize":
          N.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          _ && N.setMark("reportTextStyle", { styleId: _ }).unsetFontFamily().unsetFontSize().run();
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
          _ && N.extendMarkRange("link").setLink({ href: _ }).run();
          break;
        case "unlink":
          N.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (z) => S == null ? void 0 : S.commands.focus(z),
    insertToken: (z) => {
      !S || C.current || S.chain().focus().insertContent({ type: "token", attrs: { field: z } }).run();
    },
    replaceToken: (z) => {
      if (!S || C.current) return;
      const _ = x.current;
      _ != null && S.commands.command(({ tr: H }) => {
        const U = H.doc.nodeAt(_);
        if (!U || U.type.name !== "token") return !1;
        H.setNodeMarkup(_, void 0, { field: z });
        const N = H.doc.resolve(_);
        return N.nodeAfter && N.nodeAfter.type.name === "token" && H.setSelection(new Fn(N)), !0;
      });
    },
    holdSelectionHighlight: (z) => {
      !S || S.isDestroyed || S.view.dispatch(S.state.tr.setMeta(Er, { held: z }));
    }
  }), [S]), /* @__PURE__ */ h(ec, { editor: S, className: `richtext-editor ${i || ""}` });
});
Cf.displayName = "RichTextEditor";
const Ef = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Mf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Lo = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Rf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = re(!1);
  return /* @__PURE__ */ h(
    Jr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ E("button", { type: "button", disabled: e, className: `${ha} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(fn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Ef.map((s) => /* @__PURE__ */ h(Hc, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(cr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Af = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = re(!1), o = Vr(), [s, l] = re(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    Jr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ h(
        It,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ h(Wl, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ E("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: da + " w-full"
          }
        ),
        /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(It, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ h(
            It,
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
}, Vh = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = re(!1), d = (b, x) => {
    var T;
    return (T = n.current) == null ? void 0 : T.exec(b, x);
  }, f = Vr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ h("div", { className: bs }) : null;
  return /* @__PURE__ */ E("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ E("div", { className: m, children: [
      /* @__PURE__ */ h(In, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(It, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(In, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(It, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(In, { content: "Underline", children: /* @__PURE__ */ h(It, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Hl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(In, { content: "Strikethrough", children: /* @__PURE__ */ h(It, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(_l, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(Af, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      Jr,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ E(It, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Lo, {}),
          /* @__PURE__ */ h(fn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ E("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ h(Lo, { className: "w-3.5 h-3.5" })
            }
          ),
          Mf.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ E(rt, { children: [
      g,
      /* @__PURE__ */ E("div", { className: m, children: [
        o && /* @__PURE__ */ h(Rf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(In, { content: "Clear formatting", children: /* @__PURE__ */ h(
          It,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(jl, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ E(rt, { children: [
      g,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function Yi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function If(n, e, t, r, i) {
  return Yi(n + e * i, t, r);
}
const $f = 2;
function zf(n, e, t, r, i) {
  return Yi(n + Math.trunc(e / $f) * i, t, r);
}
const Df = 3;
function Yh({
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
  const [p, m] = re(null), [g, b] = re(!1), x = w(!1), T = w(null), M = w(null), C = w(null), v = De(), R = ys(), J = a === void 0;
  le(() => () => {
    var N;
    return (N = T.current) == null ? void 0 : N.call(T);
  }, []), ht(() => {
    const N = C.current, V = M.current;
    !J && N && V && (V.style.color = getComputedStyle(N).color);
  }, [J, a]), le(() => {
    x.current || m(null);
  }, [n]);
  const L = n ?? r, A = p !== null ? p : n != null ? String(n) : d ? "" : String(r), q = (N) => Yi(N, e, t), S = (N) => {
    const V = If(L, N, e, t, o);
    V !== L && (x.current && m(String(V)), i(V));
  }, z = (N) => {
    if (l || s || N.pointerType !== "mouse" || N.button !== 0) return;
    const V = N.currentTarget, W = N.clientY, fe = L;
    let I = fe, ye = !1;
    const pe = (G) => {
      const ee = W - G.clientY;
      if (!ye) {
        if (Math.abs(ee) < Df) return;
        ye = !0, V.blur(), V.style.userSelect = "none";
      }
      const Y = zf(fe, ee, e, t, o);
      Y !== I && (I = Y, i(Y));
    }, xe = () => {
      T.current = null, window.removeEventListener("pointermove", pe), window.removeEventListener("pointerup", xe), window.removeEventListener("pointercancel", xe), V.style.userSelect = "", ye && V.blur();
    };
    T.current = xe, window.addEventListener("pointermove", pe), window.addEventListener("pointerup", xe), window.addEventListener("pointercancel", xe);
  }, _ = (N) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": N === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (N === 1 ? L >= t : L <= e),
    onPointerDown: (V) => V.preventDefault(),
    onClick: () => S(N)
  }), H = J ? O(22, 30, v) : O(16, 22, v), U = J ? O(14, 18, v) : O(11, 15, v);
  return /* @__PURE__ */ E(
    "span",
    {
      ref: M,
      className: `ui-number ${J ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ h(
          "input",
          {
            ref: C,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: A,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...J ? { ...R, minHeight: O(28, 36, v) } : {},
              paddingRight: H + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (N) => {
              const V = N.target.value;
              m(V);
              const W = parseInt(V, 10);
              V !== "" && !Number.isNaN(W) && i(q(W));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const N = parseInt(p, 10);
              Number.isNaN(N) || i(q(N)), m(null);
            },
            onKeyDown: (N) => {
              N.key === "Enter" && N.target.blur(), N.key === "Escape" && (m(null), N.target.blur()), !s && !l && (N.key === "ArrowUp" || N.key === "ArrowDown") && (N.preventDefault(), S(N.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: z
          }
        ),
        /* @__PURE__ */ E("span", { className: "ui-number-steppers", style: { width: H }, children: [
          /* @__PURE__ */ h("button", { ..._(1), className: "ui-number-step", children: /* @__PURE__ */ h(ql, { style: { width: U, height: U } }) }),
          /* @__PURE__ */ h("button", { ..._(-1), className: "ui-number-step", children: /* @__PURE__ */ h(fn, { style: { width: U, height: U } }) })
        ] })
      ]
    }
  );
}
function Uh({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = De(), f = hn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = O(14, 16, d), m = { width: p, height: p }, g = O(10, 12, d);
  return /* @__PURE__ */ E("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ E("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ E(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Mr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(fn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function Ui({
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
  const u = w(null), d = w(null), [f, p] = re(null), m = (v) => {
    u.current = v, typeof o == "function" ? o(v) : o && (o.current = v);
  };
  ht(() => {
    if (n) return;
    const v = u.current;
    if (!v || (d.current = v.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const R = new ResizeObserver(() => {
      d.current = v.getBoundingClientRect().width;
    });
    return R.observe(v), () => R.disconnect();
  }, [n]), ht(() => {
    if (!n || e !== "auto") {
      p(null);
      return;
    }
    p(d.current);
    const v = requestAnimationFrame(() => p(null));
    return () => cancelAnimationFrame(v);
  }, [n, e]);
  const [g, b] = re(!1), [x, T] = re(null), M = w(!1);
  ht(() => {
    if (n) {
      M.current = !0, b(!1), T(null);
      return;
    }
    if (!M.current || e !== "auto") return;
    M.current = !1, b(!0);
    let v = 0, R = 0;
    return (() => {
      var q;
      const L = (q = u.current) == null ? void 0 : q.firstElementChild, A = (L == null ? void 0 : L.getBoundingClientRect().width) ?? 0;
      A > 0 ? (v = requestAnimationFrame(() => T(A)), R = window.setTimeout(() => {
        b(!1), T(null);
      }, pn + 30)) : b(!1);
    })(), () => {
      cancelAnimationFrame(v), window.clearTimeout(R);
    };
  }, [n, e]);
  const C = n ? f ?? t : g ? x ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ E(
    "div",
    {
      ...a,
      ref: m,
      className: `relative inline-flex ${s ? "shrink-0" : ""} ${l}`,
      style: {
        ...c,
        width: C,
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
function Pf({
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
  onSubmit: T,
  onCancel: M,
  cancelOnEscape: C = !1,
  cancelOnOutside: v = !1,
  className: R = "",
  "aria-label": J
}) {
  const [L, A] = re(p), q = w(L);
  q.current = L;
  const S = w(null), z = w(null), _ = w(null), H = Jo(), U = De(), N = O(9, 13, U), V = ne((D) => {
    q.current !== D && (q.current = D, A(D), m == null || m(D));
  }, [m]), W = ne((D = !1) => {
    var oe;
    V(!1), (oe = z.current) == null || oe.blur(), D && requestAnimationFrame(() => {
      var F;
      return (F = _.current) == null ? void 0 : F.focus();
    });
  }, [V]), fe = ne(() => {
    V(!0), requestAnimationFrame(() => {
      const D = z.current;
      if (!D) return;
      D.focus();
      const oe = D.value.length;
      D.setSelectionRange(oe, oe);
    });
  }, [V]);
  le(() => {
    p && fe();
  }, [p, fe]), le(() => {
    var F;
    if (!L) return;
    const D = ((F = S.current) == null ? void 0 : F.ownerDocument) ?? document, oe = (Q) => {
      var te;
      const Pe = Q.target;
      Pe && ((te = S.current) != null && te.contains(Pe) || (v && (M == null || M()), W()));
    };
    return D.addEventListener("pointerdown", oe, !0), () => D.removeEventListener("pointerdown", oe, !0);
  }, [L, W, v, M]);
  const I = ne((D) => {
    var F;
    if (!L) return;
    const oe = D.relatedTarget;
    oe && ((F = S.current) != null && F.contains(oe)) || (v && (M == null || M()), W());
  }, [L, W, v, M]), ye = ne((D) => {
    if (D.key === "Enter") {
      D.preventDefault(), T == null || T(n), W(!0);
      return;
    }
    D.key === "Escape" && (D.preventDefault(), D.stopPropagation(), C ? M == null || M() : e(""), W(!0));
  }, [e, W, C, M, T, n]), pe = r === void 0 ? /* @__PURE__ */ h(zn, { className: "w-3.5 h-3.5" }) : r, xe = b === void 0 ? pe : b, Y = 8 + (((g == null ? void 0 : g.length) || 0) + (x && n ? 1 : 0)) * (H.box + 2), ge = (D) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: H.icon, height: H.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: D
    }
  );
  return /* @__PURE__ */ h(
    Ui,
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
      onBlur: I,
      trigger: /* @__PURE__ */ h(
        It,
        {
          ref: _,
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
          onClick: fe,
          className: `${c ? "w-auto" : "w-full"} justify-start ${L ? "pointer-events-none" : ""}`,
          tabIndex: L ? -1 : 0,
          "aria-expanded": L,
          "aria-label": J || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ E(rt, { children: [
        xe && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: N, width: H.icon, height: H.icon },
            children: ge(xe)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: z,
            value: n,
            onChange: (D) => e(D.target.value),
            onKeyDown: ye,
            placeholder: i,
            "aria-label": J || i,
            tabIndex: L ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: xe ? N + H.icon + 6 : 10, paddingRight: Y },
            className: `${Ir("sm")} w-full`
          }
        ),
        /* @__PURE__ */ E("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          g == null ? void 0 : g.map((D) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": D.label,
              title: D.label,
              tabIndex: L ? 0 : -1,
              onMouseDown: (oe) => oe.preventDefault(),
              onClick: () => {
                D.onClick(n, { close: () => W(!0) }), D.keepOpen || W(!0);
              },
              style: { width: H.box, height: H.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": D.key,
              children: ge(D.icon)
            },
            D.key
          )),
          x && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: L ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var D;
                  return (D = z.current) == null ? void 0 : D.focus();
                });
              },
              style: { width: H.box, height: H.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(Nn, { size: H.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function Gh({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(Hr, { className: "w-3.5 h-3.5" }),
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
      icon: /* @__PURE__ */ h(cr, { className: "w-3.5 h-3.5" }),
      onClick: m
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ h(Nn, { className: "w-3.5 h-3.5" }),
      onClick: g
    }] : []
  ];
  return /* @__PURE__ */ h(
    Pf,
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
function Lf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Of(n, e, t) {
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
function Al(n, e, t) {
  const r = Lf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Of(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Bf(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = Al(n.items, n.groups, n.query), i = [];
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
function Ff({
  items: n,
  groups: e = [],
  mode: t = "expandable",
  triggerLabel: r = "Search",
  triggerIcon: i,
  triggerVariant: o = "primary",
  placeholder: s = "Search…",
  query: l,
  onQueryChange: c,
  onSelect: a,
  onSelectGroup: u,
  onClose: d,
  closeOnSelect: f = !0,
  openOnFocus: p = !0,
  expandableGroups: m = !1,
  browseExpanded: g = !1,
  groupExpandMode: b = "multiple",
  browseAll: x = !1,
  selectedId: T,
  autoFocus: M = !0,
  collapsedWidth: C = 128,
  expandedWidth: v = 288,
  panelWidth: R,
  panelMinWidth: J,
  keepAllRows: L = !1,
  maxMenuHeight: A = 420,
  theme: q = "light",
  morph: S = !0,
  emptyTitle: z,
  emptyHint: _,
  renderEmpty: H,
  emptyActions: U,
  leadingActions: N,
  hideLeadingOnEmpty: V = !1,
  footerActions: W,
  fieldActions: fe,
  multiple: I,
  open: ye,
  onOpenChange: pe,
  hideTrigger: xe = !1,
  anchorRef: G,
  portalTarget: ee,
  renderTrigger: Y,
  renderItem: ge,
  highlightOnOpen: D = !0,
  ref: oe
}) {
  const F = l !== void 0, [Q, Pe] = re(""), te = F ? l : Q, it = ne((y) => {
    F || Pe(y), c == null || c(y);
  }, [F, c]), Le = ye !== void 0, [Ae, ze] = re(!1), ae = Le ? ye : Ae, Te = ne((y) => {
    Le || ze(y), pe == null || pe(y);
  }, [Le, pe]), [Se, qe] = re(t === "inline"), Ke = Qe(() => e.map((y) => y.key).join("\0"), [e]), ot = Qe(() => new Set(Ke ? Ke.split("\0") : []), [Ke]), [ve, st] = re(() => g ? ot : /* @__PURE__ */ new Set()), [Je, Ue] = re(0), Pt = w(!1), Lt = w(null), He = ne((y, P = "keyboard") => {
    Pt.current = P === "pointer", Ue(y);
  }, []), lt = w(null), pt = w(null), mt = w(null), xt = w(null), kt = w(null), bt = w(0), Et = Ni(), _e = Wn(), Oe = qr(), St = zi(), Gt = us(), Be = Jo(), Mt = 8 + (((fe == null ? void 0 : fe.length) || 0) + (te ? 1 : 0)) * (Be.box + 2), [$, X] = re({ top: 0, left: 0, maxH: 288, ready: !1 }), [he, Ve] = re(0);
  Qo({
    anchorRef: G ?? lt,
    panelRef: xt,
    open: ae,
    maxHeight: A,
    anchorRectRef: kt,
    onPosition: (y) => X({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), le(() => {
    const y = (G == null ? void 0 : G.current) ?? lt.current;
    !ae || !y || Ve(y.getBoundingClientRect().width);
  }, [ae, Se, G]);
  const [Ge, vt] = re(!1);
  le(() => {
    ae && vt(!0);
  }, [ae]);
  const Rt = Wr({
    visible: ae,
    morph: S,
    anchor: () => {
      var y;
      return ((y = (G == null ? void 0 : G.current) ?? lt.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: xt,
    cloneOnUnmount: !0,
    onClosed: () => vt(!1)
  }), k = (U || []).map(
    (y) => typeof y.label == "function" ? y.label(te) : y.label
  ), j = Qe(
    () => Bf({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: L ? "" : te,
      browseGroups: p || g || m,
      browseAll: x,
      expandedGroups: ve,
      emptyActionLabels: k
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, te, L, p, g, m, x, ve, k.join("\0")]
  ), ie = Qe(
    () => (N || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(te) : y.label,
      actionIndex: P,
      source: "leading"
    })),
    [N, te]
  ), me = Qe(
    () => (W || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(te) : y.label,
      actionIndex: P,
      source: "footer"
    })),
    [W, te]
  ), Ne = j.some((y) => y.kind === "empty"), Ce = ie.length > 0 && !(V && Ne), we = Ce ? ie.length : 0, ke = Qe(
    () => [...Ce ? ie : [], ...j, ...me],
    [Ce, ie, j, me]
  ), Fe = !!u || m && !te.trim(), At = Qe(
    () => ke.map((y, P) => ({ row: y, index: P })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !Fe)),
    [ke, Fe]
  ), dt = (m || g) && !te.trim(), Xe = !!I, gt = Qe(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), Nt = Qe(() => te.trim() ? Al(n, e, te).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : gt, [n, e, te, gt]), Jt = Qe(() => new Set(Nt), [Nt]), Ee = rs({
    mode: (I == null ? void 0 : I.mode) ?? "draft",
    selectedIds: (I == null ? void 0 : I.selectedIds) ?? ss,
    itemIds: gt,
    visibleIds: Nt,
    max: I == null ? void 0 : I.max,
    disabledIds: I == null ? void 0 : I.disabledIds,
    indicator: I == null ? void 0 : I.indicator,
    onCommit: I == null ? void 0 : I.onCommit,
    onDraftChange: I == null ? void 0 : I.onDraftChange,
    onToggle: I == null ? void 0 : I.onToggle
  }), yn = w(Ee.reset);
  yn.current = Ee.reset;
  const Xt = typeof (I == null ? void 0 : I.commitLabel) == "function" ? I.commitLabel(Ee.count) : (I == null ? void 0 : I.commitLabel) ?? `Select ${Ee.count}`, ft = ne(() => {
    var y;
    Te(!1), t === "expandable" && ((y = pt.current) == null || y.blur(), qe(!1), requestAnimationFrame(() => {
      var P;
      return (P = mt.current) == null ? void 0 : P.focus();
    })), Le || it(""), He(0), st(g ? ot : /* @__PURE__ */ new Set()), d == null || d();
  }, [t, d, it, g, ot, Le, Te]);
  le(() => {
    if (te.trim() || !g) {
      st((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    st((y) => y.size === ot.size && [...ot].every((P) => y.has(P)) ? y : ot);
  }, [te, g, ot]);
  const Qt = w(!1);
  le(() => {
    if (!ae) {
      Qt.current = !1;
      return;
    }
    if (Qt.current || !m || te.trim()) return;
    const y = T ? [T] : [...(I == null ? void 0 : I.selectedIds) ?? []], P = new Set(y), Z = P.size ? e.filter((de) => n.some((Me) => Me.group === de.key && P.has(Me.id))).map((de) => de.key) : [];
    if (Z.length === 0) {
      Qt.current = !0;
      return;
    }
    const se = b === "single" ? Z.slice(0, 1) : Z;
    if (!se.every((de) => ve.has(de))) {
      st(new Set(se));
      return;
    }
    if (D && T) {
      const de = ke.findIndex((Me) => Me.kind === "item" && Me.hit.item.id === T);
      de >= 0 && He(de);
    }
    Qt.current = !0;
  }, [ae, m, te, e, n, T, I == null ? void 0 : I.selectedIds, b, ve, ke, D, He]);
  const Zt = ne((y) => {
    st((P) => {
      const Z = new Set(P);
      return Z.has(y) ? Z.delete(y) : (b === "single" && Z.clear(), Z.add(y)), Z;
    });
  }, [b]), zt = ne(() => {
    var P;
    if (ae) {
      (P = pt.current) == null || P.focus();
      return;
    }
    if (yn.current(), t === "expandable" && !Se) {
      const Z = lt.current;
      if (Z) {
        const se = Z.style.transition, de = Z.style.width;
        Z.style.transition = "none", Z.style.width = `${v}px`;
        const Me = Z.getBoundingClientRect();
        kt.current = { left: Me.left, top: Me.top, width: Me.width, height: Me.height }, Z.style.width = de, Z.offsetWidth, Z.style.transition = se, window.clearTimeout(bt.current), bt.current = window.setTimeout(() => {
          kt.current = null;
        }, pn + 80);
      }
    }
    qe(!0), Te(!0);
    const y = T ? j.findIndex((Z) => Z.kind === "item" && Z.hit.item.id === T) : -1;
    He(y >= 0 ? we + y : D ? we : -1);
  }, [ae, t, Se, v, we, j, T, D]);
  le(() => () => {
    window.clearTimeout(bt.current), kt.current = null;
  }, []), le(() => {
    ae || (Lt.current = null);
  }, [ae]), le(() => {
    if (t !== "expandable" || !Se || !ae || !M) return;
    const y = requestAnimationFrame(() => {
      var P;
      return (P = pt.current) == null ? void 0 : P.focus();
    });
    return () => cancelAnimationFrame(y);
  }, [t, Se, ae, M]), le(() => {
    var Z;
    if (!ae) return;
    const y = ((Z = lt.current) == null ? void 0 : Z.ownerDocument) ?? Et;
    if (!y) return;
    const P = (se) => {
      var Me, nn, jt, rn;
      const de = ((Me = se.composedPath) == null ? void 0 : Me.call(se)[0]) ?? se.target;
      !de || typeof de.nodeType != "number" || (nn = lt.current) != null && nn.contains(de) || (jt = xt.current) != null && jt.contains(de) || (rn = G == null ? void 0 : G.current) != null && rn.contains(de) || ft();
    };
    return y.addEventListener("pointerdown", P, !0), () => y.removeEventListener("pointerdown", P, !0);
  }, [ae, ft, Et, G]);
  const ct = ne((y) => {
    var P;
    if (y.kind === "item" ? Lt.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (Lt.current = null), y.kind === "group") {
      if (Xe) {
        const Z = (P = I == null ? void 0 : I.groupToken) == null ? void 0 : P.call(I, y.group.key);
        if (Z) {
          Ee.canToggle(Z) && Ee.toggle(Z);
          return;
        }
        const se = n.filter((de) => de.group === y.group.key && de.checkable !== !1 && Jt.has(de.id) && !Ee.isDisabled(de.id)).map((de) => de.id);
        se.length && Ee.toggleGroup(se);
        return;
      }
      u ? (u(y.group), f && ft()) : Fe && Zt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Xe) {
        Ee.canToggle(y.hit.item.id) && Ee.toggle(y.hit.item.id);
        return;
      }
      a(y.hit.item), f && ft();
      return;
    }
    if (y.kind === "action") {
      const Z = y.source === "leading" ? N : y.source === "footer" ? W : U, se = Z == null ? void 0 : Z[y.actionIndex];
      se && se.onClick(te), f && ft();
    }
  }, [ft, f, U, W, Fe, n, N, I, Xe, a, u, te, Ee, Zt, Jt]), en = (y) => {
    if (At.length === 0) return;
    let P = Je;
    if (P < 0 && Lt.current) {
      const de = At.find(
        (Me) => Me.row.kind === "item" && Me.row.hit.item.id === Lt.current
      );
      de && (P = de.index);
    }
    const Z = At.findIndex((de) => de.index === P), se = Z < 0 ? 0 : (Z + y + At.length) % At.length;
    He(At[se].index);
  };
  Fo(oe, () => ({
    moveHighlight: en,
    activateHighlighted: () => {
      if (Pt.current) return !1;
      const y = Je >= 0 ? ke[Je] : void 0;
      return y ? (ct(y), He(-1, "keyboard"), !0) : !1;
    },
    close: ft,
    selectAll: () => {
      Xe && Ee.setAll(!0);
    },
    setSelection: (y) => {
      Ee.reset(y);
    }
  }), [ke, Je, ct, ft, Xe, Ee]);
  const Mn = (y) => {
    if (Xe && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), Ee.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), ae ? en(1) : zt();
    else if (y.key === "ArrowUp")
      y.preventDefault(), en(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && m && ae && !te.trim()) {
      const P = ke[Je];
      if ((P == null ? void 0 : P.kind) === "group") {
        const Z = ve.has(P.group.key);
        (y.key === "ArrowRight" || Z) && (y.preventDefault(), Zt(P.group.key));
      } else if ((P == null ? void 0 : P.kind) === "item" && y.key === "ArrowLeft" && P.hit.item.group) {
        y.preventDefault();
        const Z = P.hit.item.group;
        ve.has(Z) && Zt(Z);
        const se = ke.findIndex((de) => de.kind === "group" && de.group.key === Z);
        se >= 0 && He(se);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const P = ke[Je] ?? ke[0];
      P && ct(P);
    } else y.key === "Escape" && (y.preventDefault(), ft());
  }, Kn = (y) => {
    t === "expandable" && !Se || (it(y), ae || Te(!0));
  };
  le(() => {
    if (L) {
      const P = te.trim().toLowerCase();
      if (!P) {
        const se = T ? j.findIndex((de) => de.kind === "item" && de.hit.item.id === T) : -1;
        He(se >= 0 ? we + se : -1);
        return;
      }
      const Z = j.findIndex((se) => se.kind === "item" && se.hit.item.label.toLowerCase().includes(P));
      He(Z >= 0 ? we + Z : -1);
      return;
    }
    if (Le) {
      const P = te.trim().toLowerCase();
      if (!!P && n.some((se) => se.id.toLowerCase() === P || se.label.toLowerCase() === P)) {
        He(-1);
        return;
      }
      if (!Xe) {
        const se = j.findIndex((de) => de.kind === "item" && de.hit.item.tone !== "create");
        if (se >= 0) {
          He(we + se);
          return;
        }
      }
    }
    const y = j.findIndex((P) => P.kind === "item");
    He(y >= 0 ? we + y : we);
  }, [te]), le(() => {
    if (!ae || te.trim()) return;
    const y = T ? j.findIndex((P) => P.kind === "item" && P.hit.item.id === T) : -1;
    He(y >= 0 ? we + y : D ? we : -1);
  }, [ae]), ht(() => {
    ae && yn.current();
  }, [ae]);
  const fr = (y) => /* @__PURE__ */ E("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    fe == null ? void 0 : fe.map((P) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": P.label,
        title: P.label,
        tabIndex: Se ? 0 : -1,
        onMouseDown: (Z) => Z.preventDefault(),
        onClick: () => {
          P.onClick(te, { close: ft }), P.keepOpen || ft();
        },
        style: { width: Be.box, height: Be.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": P.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: Be.icon, height: Be.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: P.icon
          }
        )
      },
      P.key
    )),
    te && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: Se ? 0 : -1,
        onPointerDown: (P) => P.preventDefault(),
        onClick: y,
        style: { width: Be.box, height: Be.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(Nn, { size: Be.icon })
      }
    )
  ] }), Jn = /* @__PURE__ */ E("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(zn, { size: Be.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: pt,
        value: te,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ae,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => Kn(y.target.value),
        onFocus: () => {
          p && zt();
        },
        onClick: () => {
          p && zt();
        },
        onKeyDown: Mn,
        placeholder: s,
        style: { paddingRight: Mt },
        className: `${Ir("sm")} w-full pl-8`
      }
    ),
    fr(() => {
      it(""), ae || zt();
    })
  ] }), Qr = /* @__PURE__ */ E("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(zn, { size: Be.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: pt,
        value: te,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": ae,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => Kn(y.target.value),
        onFocus: () => {
          p && Se && zt();
        },
        onClick: () => {
          p && Se && zt();
        },
        onKeyDown: Mn,
        placeholder: s,
        tabIndex: Se ? 0 : -1,
        style: { paddingRight: Mt },
        className: `${Ir("sm")} h-full w-full pl-8`
      }
    ),
    fr(() => {
      it(""), !ae && Se && zt();
    })
  ] });
  le(() => {
    if (!ae || Pt.current) return;
    const y = xt.current;
    mn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${Je}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [ae, Je]);
  const Vn = w(j);
  Vn.current = j;
  const Yn = w(T);
  Yn.current = T;
  const Un = w(I == null ? void 0 : I.selectedIds);
  Un.current = I == null ? void 0 : I.selectedIds;
  const xn = ns({
    open: ae,
    block: "center",
    ready: $.ready,
    scroller: () => {
      var y;
      return ((y = xt.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Z;
      let y = -1;
      const P = Yn.current;
      if (P)
        y = Vn.current.findIndex((se) => se.kind === "item" && se.hit.item.id === P);
      else {
        const se = Un.current;
        if (se && se.length) {
          const de = new Set(se);
          y = Vn.current.findIndex((Me) => Me.kind === "item" && de.has(Me.hit.item.id));
        }
      }
      return y < 0 ? null : ((Z = xt.current) == null ? void 0 : Z.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), B = (y, P) => {
    const Z = Je === P, se = !Xe && T !== void 0 && y.hit.item.id === T, de = Xe ? Ee.isSelected(y.hit.item.id) : se, Me = !!y.hit.item.disabled || Xe && !Ee.canToggle(y.hit.item.id), nn = y.hit.item.tone === "create" ? q === "light" ? { background: Z ? "#d1fae5" : "#ecfdf5", color: Z ? "#065f46" : "#047857" } : { background: Z ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Z ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": de,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": P,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (jt) => jt.preventDefault(),
        onMouseEnter: () => He(P, "pointer"),
        onClick: () => ct(y),
        style: { ...St, ...y.hit.item.rowStyle, ...nn },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Oe.itemDefault} ${y.hit.item.rowClassName ?? ""} ${se ? "ui-item-selected" : ""} ${Z ? "ui-item-highlighted" : ""} ${Me ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Xe && y.hit.item.checkable !== !1 && /* @__PURE__ */ h(Ar, { checked: de, disabled: Me, indicator: I == null ? void 0 : I.indicator }),
          ge ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: ge(y.hit.item, { checked: de, disabled: Me }) }) : /* @__PURE__ */ E(rt, { children: [
            y.hit.item.icon && /* @__PURE__ */ h("span", { className: `${Oe.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            se && /* @__PURE__ */ h(cr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, ue = (y, P) => {
    var to;
    const Z = ve.has(y.group.key), se = m && !te.trim(), de = Fe, Me = de && Je === P, nn = Xe ? n.filter((Ye) => Ye.group === y.group.key && Jt.has(Ye.id) && Ye.checkable !== !1) : [], jt = nn.filter((Ye) => !Ee.isDisabled(Ye.id)).map((Ye) => Ye.id), rn = Xe ? (to = I == null ? void 0 : I.groupToken) == null ? void 0 : to.call(I, y.group.key) : void 0, Xi = !!rn && Ee.isSelected(rn), Qi = Xi ? "all" : jt.length > 0 ? Ee.groupState(jt) : "none", $l = Xi ? nn.length : nn.reduce((Ye, zl) => Ye + (Ee.isSelected(zl.id) ? 1 : 0), 0), Zi = Xe && /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (Ye) => Ye.preventDefault(),
        onClick: (Ye) => {
          Ye.stopPropagation(), rn ? Ee.toggle(rn) : jt.length && Ee.toggleGroup(jt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${rn || jt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ h(
          Ar,
          {
            checked: Qi === "all",
            indeterminate: Qi === "some",
            disabled: !rn && jt.length === 0,
            indicator: I == null ? void 0 : I.indicator
          }
        )
      }
    ), eo = Xe ? /* @__PURE__ */ E("span", { className: `shrink-0 tabular-nums text-[10px] ${de ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      $l,
      "/",
      nn.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${de ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return de ? /* @__PURE__ */ E(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": se ? Z : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (Ye) => Ye.preventDefault(),
        onMouseEnter: () => He(P, "pointer"),
        onClick: () => {
          se && Zt(y.group.key);
        },
        style: St,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Oe.itemDefault} ${Me ? "ui-item-highlighted" : ""}`,
        children: [
          Zi,
          /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Ye) => Ye.preventDefault(),
              onClick: (Ye) => {
                Ye.stopPropagation(), ct(y);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                y.group.icon && /* @__PURE__ */ h("span", { className: `${Oe.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ h("span", { className: "truncate", children: y.group.label })
              ]
            }
          ),
          /* @__PURE__ */ h("span", { className: "min-w-0 flex-1" }),
          eo,
          se && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Z ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": Z,
              onMouseDown: (Ye) => Ye.preventDefault(),
              onClick: (Ye) => {
                Ye.stopPropagation(), Zt(y.group.key);
              },
              style: { width: Be.box, height: Be.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ h(
                fn,
                {
                  size: Be.icon,
                  className: `transition-transform duration-200 ${Z ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${y.group.key}`
    ) : /* @__PURE__ */ E(
      "div",
      {
        role: "presentation",
        "data-search-group": y.group.key,
        "data-search-row": P,
        style: Gt,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          Zi,
          y.group.icon && /* @__PURE__ */ h("span", { className: `${Oe.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.group.label }),
          eo
        ]
      },
      `group:${y.group.key}`
    );
  }, be = (y, P) => {
    var de;
    const Z = Je === P, se = y.source === "leading" ? N : y.source === "footer" ? W : U;
    return /* @__PURE__ */ E(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": P,
        onMouseDown: (Me) => Me.preventDefault(),
        onMouseEnter: () => He(P, "pointer"),
        onClick: () => ct(y),
        style: St,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Oe.itemDefault} ${Z ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${Oe.icon} shrink-0`, children: ((de = se == null ? void 0 : se[y.actionIndex]) == null ? void 0 : de.icon) || /* @__PURE__ */ h(Hr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, tt = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: H ? H({ query: te, close: ft }) : /* @__PURE__ */ E(rt, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(zn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: z || `No matches for “${te.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: _ || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), Ie = [];
  for (let y = 0; y < j.length; y++) {
    const P = j[y];
    if (P.kind === "group") {
      const Z = [];
      let se = y + 1;
      for (; se < j.length && j[se].kind === "item" && j[se].hit.item.group === P.group.key; )
        Z.push({ row: j[se], index: se }), se++;
      Ie.push({ group: P, index: y, items: Z }), y = se - 1;
    } else P.kind === "item" ? Ie.push({ row: P, index: y }) : Ie.push({ row: P, index: y });
  }
  const tn = ae || Ge ? _r(
    /* @__PURE__ */ E(
      "div",
      {
        ref: Rt,
        id: "search-menu-panel",
        "data-theme": q,
        role: "listbox",
        "aria-label": s,
        "aria-multiselectable": Xe ? !0 : void 0,
        onPointerEnter: xn.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), xn.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          Pt.current && He(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: $.left,
          top: $.top,
          width: R ?? (t === "expandable" ? v : he || void 0),
          minWidth: J,
          maxHeight: $.maxH,
          visibility: $.ready ? "visible" : "hidden"
        },
        children: [
          Ce && /* @__PURE__ */ E("div", { className: "shrink-0 pb-1", children: [
            ie.map((y, P) => be(y, P)),
            j.length > 0 && /* @__PURE__ */ h("div", { className: Oe.separator })
          ] }),
          /* @__PURE__ */ E("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            j.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: H ? H({ query: te, close: ft }) : /* @__PURE__ */ h(rt, { children: "Type to search…" }) }),
            Ie.map((y) => {
              if (y.group) {
                const se = ve.has(y.group.group.key), de = y.items || [];
                return /* @__PURE__ */ E(nt.Fragment, { children: [
                  ue(y.group, we + y.index),
                  dt && /* @__PURE__ */ h(
                    "div",
                    {
                      "data-search-group-items": y.group.group.key,
                      "aria-hidden": !se,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: se ? "1fr" : "0fr",
                        opacity: se ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: de.map((Me) => B(Me.row, we + Me.index)) })
                    }
                  ),
                  !dt && de.map((Me) => B(Me.row, we + Me.index))
                ] }, `group:${y.group.group.key}`);
              }
              const P = y.row, Z = we + y.index;
              return P.kind === "empty" ? tt() : P.kind === "action" ? be(P, Z) : P.kind === "item" ? B(P, Z) : null;
            })
          ] }),
          me.length > 0 && /* @__PURE__ */ E("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: Oe.separator }),
            me.map((y, P) => be(y, we + j.length + P))
          ] }),
          Xe && (I == null ? void 0 : I.footer) !== !1 && /* @__PURE__ */ h(
            cs,
            {
              count: Ee.count,
              max: I == null ? void 0 : I.max,
              hiddenCount: (I == null ? void 0 : I.hiddenNote) === !1 ? 0 : Ee.hiddenCount,
              clear: (I == null ? void 0 : I.clear) !== !1,
              theme: q,
              onClear: Ee.clear,
              hero: (I == null ? void 0 : I.mode) === "live" ? void 0 : {
                label: Xt,
                onClick: () => {
                  Ee.commit(), ft();
                },
                disabled: Ee.count === 0
              }
            }
          )
        ]
      }
    ),
    ee ?? _e ?? (Et == null ? void 0 : Et.body) ?? document.body
  ) : null;
  return xe ? /* @__PURE__ */ E(rt, { children: [
    /* @__PURE__ */ h("div", { ref: lt, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    tn
  ] }) : t === "inline" ? /* @__PURE__ */ E("div", { ref: lt, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    Jn,
    tn
  ] }) : /* @__PURE__ */ h(
    Ui,
    {
      expanded: Se,
      collapsedWidth: C,
      expandedWidth: v,
      rootRef: lt,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: Y ? Y({ open: ae, expanded: Se, toggle: zt }) : /* @__PURE__ */ h(
        It,
        {
          ref: mt,
          type: "button",
          variant: o,
          size: "minimal",
          theme: q === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ h(zn, { className: "w-3.5 h-3.5" }),
          onClick: zt,
          className: `w-full justify-start ${Se ? "pointer-events-none" : ""}`,
          tabIndex: Se ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ E(rt, { children: [
        Qr,
        tn
      ] })
    }
  );
}
function Sn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Il(n, e, t = "id") {
  const r = e.find((i) => Sn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function Hf(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function _f(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Gi(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => Sn(l, t) === r);
  if (i) return Sn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? Sn(s, t) : r;
}
function jf(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of Hf(n)) {
    const s = Gi(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function Wf(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Gi(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function qf(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => Sn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function Kf(n, e, t = "id") {
  const r = new Set(e.map((i) => Sn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Oo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Il(o, e, t)).join(", ");
}
const Jf = () => {
};
function Xh({
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
  inputReadOnly: T = !1,
  disabled: M = !1,
  autoFocus: C = !1,
  defaultOpen: v = !1,
  selectAllOnOpen: R = !0,
  uppercase: J = !1,
  allowFreeText: L = !0,
  theme: A,
  className: q = "",
  style: S,
  panelWidth: z,
  panelMinWidth: _,
  initialQuery: H,
  keepAllRows: U = !1,
  maxMenuHeight: N,
  portalTarget: V,
  autoGrow: W = !1,
  skipComma: fe = !1,
  collapsedWidth: I = 140,
  expandedWidth: ye = 280,
  createLabel: pe,
  onCreateItem: xe,
  onExit: G,
  onEscape: ee,
  onTabExit: Y,
  loadItems: ge,
  emptyTitle: D,
  emptyHint: oe,
  sortItems: F,
  max: Q,
  disabledIds: Pe,
  indicator: te,
  browse: it,
  groupToken: Le
}) {
  const Ae = Ut(), ze = A ?? (Ae == null ? void 0 : Ae.mode) ?? "light", ae = De(), Te = ne((B) => Sn(B, i), [i]), Se = Qe(() => t.map(Te), [t, Te]), qe = Qe(() => new Map(t.map((B) => [Te(B), B])), [t, Te]), Ke = ne((B) => Il(B, t, i), [t, i]), ot = Qe(() => new Set([...m ?? []].map((B) => B.toLowerCase())), [m]), [ve, st] = re(!1), [Je, Ue] = re(""), [Pt, Lt] = re(() => {
    const B = H ?? "";
    return J ? B.toUpperCase() : B;
  }), [He, lt] = re(Pt), [pt, mt] = re(() => [...n]), [xt, kt] = re(null), [bt, Et] = re(!1), _e = w(null), Oe = w(null), St = w(null), Gt = w(null), Be = w(null), _t = w(n.join("\0")), Mt = w(!1), $ = w(/* @__PURE__ */ new Set()), X = w(!1), he = w(!1), Ve = w(!1), Ge = w(0), vt = w(""), Rt = w([...n]), k = n.join("\0"), j = Qe(
    () => Oo(n, t, i, l, c),
    [n, t, i, l, c]
  ), ie = ne((B) => {
    if (a) return a([...B], t);
    if (o === "single") return B[0] ? Ke(B[0]) : "";
    const ue = B.map(Ke).join(", ");
    return fe ? ue : B.length ? `${ue}, ` : "";
  }, [a, t, o, Ke, fe]);
  le(() => {
    ve || (mt([...n]), Rt.current = [...n], _t.current = k);
  }, [k, ve]);
  const me = ne(() => {
    if (ve || x || M) return;
    Mt.current = !1, X.current = !0;
    const B = ie(n);
    vt.current = B, Rt.current = [...n], mt([...n]), Ue(B), lt(Pt), Lt(""), st(!0);
  }, [ve, x, M, n, ie, Pt]);
  ht(() => {
    if (!ve) return;
    const B = _e.current ?? Oe.current;
    B && (B.focus(), (B instanceof HTMLInputElement || B instanceof HTMLTextAreaElement) && (o === "single" && R ? B.setSelectionRange(0, B.value.length) : B.setSelectionRange(B.value.length, B.value.length)));
  }, [ve]), ht(() => {
    if (!Ve.current) return;
    Ve.current = !1;
    const B = _e.current;
    B && (B.focus(), B.setSelectionRange(B.value.length, B.value.length));
  }, [Je]), le(() => {
    (v || C) && me();
  }, []);
  const Ne = o === "single" ? He : _f(Je), Ce = ge ? xt ?? [] : t, we = Qe(
    () => F ? F(Ce, pt) : Ce,
    [Ce, F, pt]
  ), ke = Ne.trim(), Fe = !!xe && L && !bt && !!ke && !qf(ke, Ce, i);
  le(() => {
    if (!ge || !ve) return;
    const B = Ne.trim();
    if (!B) {
      kt(null), Et(!1);
      return;
    }
    Et(!0);
    const ue = ++Ge.current, be = setTimeout(() => {
      ge(B).then((tt) => {
        Ge.current === ue && (kt(tt), Et(!1));
      }).catch(() => {
        Ge.current === ue && (kt([]), Et(!1));
      });
    }, 400);
    return () => clearTimeout(be);
  }, [ge, ve, Ne]);
  const At = Qe(() => {
    const B = we.filter((ue) => !ue.hidden).map((ue) => ({
      id: Te(ue),
      label: ue.label,
      group: ue.group,
      detail: ue.detail,
      icon: ue.icon,
      disabled: !!ue.disabled || !!(Pe != null && Pe.includes(Te(ue))),
      fields: ue.fields,
      keywords: ue.keywords,
      rowClassName: ue.rowClassName,
      rowStyle: ue.rowStyle
    }));
    return Fe && B.unshift({
      id: ke,
      label: pe ? pe(ke) : `Add “${ke}”…`,
      keywords: ke,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), B;
  }, [we, Te, Pe, Fe, ke, pe]), dt = ne((B) => {
    const ue = B.join("\0");
    if (ue !== _t.current) {
      if (bn(B, n)) {
        _t.current = ue;
        return;
      }
      if (_t.current = ue, e(B), xe)
        for (const be of Kf(B, t, i))
          $.current.has(be) || ($.current.add(be), xe(be));
    }
  }, [n, e, xe, t, i]), Xe = ne((B, ue) => {
    !ue || !xe || !L || t.some((be) => Te(be) === B) || $.current.has(B) || ($.current.add(B), xe(B));
  }, [xe, L, t, Te]), gt = ne((B = !0) => {
    if (!X.current || (X.current = !1, x || M)) return;
    if (Mt.current) {
      Mt.current = !1;
      return;
    }
    const ue = vt.current, be = new Set(Se), tt = o === "single" ? (() => {
      const Ie = ue.trim();
      if (!Ie) return L ? [] : n;
      const tn = Gi(Ie, t, i);
      return !L && !be.has(tn) ? n : [tn];
    })() : Bt(
      jf(ue, t, i).filter((Ie) => L || be.has(Ie)),
      Se
    );
    Rt.current = tt, mt(tt), lt(""), st(!1), dt(tt), B && !he.current && (G == null || G());
  }, [x, M, o, t, i, Se, L, n, dt, G]), Nt = ne((B) => {
    st(B), B || gt();
  }, [gt]), Jt = ne(() => {
    Mt.current = !0, X.current = !1;
    const B = ie(n);
    vt.current = B, Rt.current = [...n], mt([...n]), Ue(B), lt(""), st(!1), ee == null || ee();
  }, [n, ie, ee]);
  le(() => {
    var tt;
    if (!ve) return;
    const ue = (((tt = St.current) == null ? void 0 : tt.ownerDocument) ?? document).defaultView;
    if (!ue) return;
    const be = (Ie) => {
      Ie.key === "Escape" && (Ie.preventDefault(), Ie.stopImmediatePropagation(), Jt());
    };
    return ue.addEventListener("keydown", be, !0), () => ue.removeEventListener("keydown", be, !0);
  }, [ve, Jt]);
  const Ee = ne((B) => {
    const ue = Bt(B, Se), be = ie(ue);
    Rt.current = ue, vt.current = be, mt(ue), Ve.current = !0, Ue(be);
  }, [Se, ie]), yn = ne((B) => {
    const ue = B.id;
    X.current = !1;
    const be = Ke(ue);
    Rt.current = [ue], vt.current = be, mt([ue]), Ue(be), lt(""), st(!1), dt([ue]), he.current || G == null || G();
  }, [Ke, dt, G]), Xt = (B) => {
    var ue, be, tt, Ie, tn;
    if (B.key === "Escape") {
      B.preventDefault(), Jt();
      return;
    }
    if (B.key === "Tab") {
      if (B.preventDefault(), o === "single" && ve) {
        he.current = !0;
        const y = (ue = Be.current) == null ? void 0 : ue.activateHighlighted();
        if (he.current = !1, y) {
          (be = Y ?? G) == null || be(_e.current ?? void 0);
          return;
        }
      }
      ve && gt(!1), (tt = Y ?? G) == null || tt(_e.current ?? void 0);
      return;
    }
    if (B.key === "ArrowDown" || B.key === "ArrowUp") {
      if (B.preventDefault(), !ve) {
        me();
        return;
      }
      (Ie = Be.current) == null || Ie.moveHighlight(B.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (B.key === "Enter") {
      if (B.preventDefault(), B.stopPropagation(), ve && ((tn = Be.current) != null && tn.activateHighlighted())) return;
      gt();
      return;
    }
  }, ft = (B) => {
    var be;
    const ue = J ? B.target.value.toUpperCase() : B.target.value;
    if (vt.current = ue, Ue(ue), o === "single" && lt(ue), ve || (X.current = !0, Mt.current = !1, st(!0)), o === "multiple") {
      const tt = Bt(Wf(ue, t, i), Se);
      Rt.current = tt, mt(tt), (be = Be.current) == null || be.setSelection(tt);
    }
  }, Qt = () => {
    if (X.current) {
      if (Mt.current) {
        Mt.current = !1;
        return;
      }
      gt();
    }
  }, Zt = ne((B, ue) => {
    const be = qe.get(B.id);
    if (!be)
      return /* @__PURE__ */ E(rt, { children: [
        /* @__PURE__ */ h(Hr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: B.label })
      ] });
    const tt = !!m && (i === "label" ? ot.has(be.label.toLowerCase()) : m.has(Te(be))), Ie = (f == null ? void 0 : f(be)) ?? be.badge ?? null;
    return /* @__PURE__ */ E(rt, { children: [
      d ? d(be, ue.checked) : /* @__PURE__ */ E(rt, { children: [
        be.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: be.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: be.label }),
        Ie && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Ie }),
        p == null ? void 0 : p(be)
      ] }),
      tt && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ h(Kl, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [qe, m, ot, i, Te, f, d, p, g]), zt = /* @__PURE__ */ h(
    Ff,
    {
      ref: Be,
      mode: "inline",
      hideTrigger: !0,
      open: ve,
      onOpenChange: Nt,
      anchorRef: s === "morph" ? Gt : St,
      items: At,
      groups: r,
      query: Ne,
      onSelect: yn,
      closeOnSelect: o === "single",
      selectedId: o === "single" ? pt[0] : void 0,
      multiple: o === "multiple" ? {
        selectedIds: pt,
        mode: "live",
        onDraftChange: Ee,
        onToggle: Xe,
        onCommit: Jf,
        max: Q,
        disabledIds: Pe,
        indicator: te,
        groupToken: Le
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (it ?? "open") === "open",
      expandableGroups: r.length > 0 && it === "accordion",
      groupExpandMode: "single",
      renderItem: Zt,
      emptyTitle: bt ? "Searching…" : D,
      emptyHint: bt ? "Fetching matching records." : oe,
      theme: ze,
      panelWidth: z,
      panelMinWidth: _,
      keepAllRows: U,
      maxMenuHeight: N,
      portalTarget: V
    }
  ), ct = s === "chip", en = s === "wrap", Mn = !ct && !en && W, Kn = !ve && !j, fr = ve ? Je : j, Jn = {
    ref: _e,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: ve ? Je : ct ? n.join(", ") : j,
    disabled: M,
    readOnly: T,
    placeholder: "",
    onFocus: me,
    onClick: me,
    onChange: ft,
    onBlur: Qt,
    onKeyDown: Xt,
    autoComplete: "off",
    spellCheck: !1
  }, Qr = O(5, 7, ae), Vn = O(9, 12, ae), Yn = O(12, 14, ae);
  if (s === "button") {
    const B = (Ie) => Xt(Ie), ue = ve ? pt : n, be = Oo(ue, t, i, l, c), tt = !be;
    return /* @__PURE__ */ E(
      "div",
      {
        ref: St,
        "data-picker-field": !0,
        className: `relative ${q}`,
        style: S,
        onMouseDown: (Ie) => Ie.stopPropagation(),
        onContextMenu: (Ie) => {
          Ie.preventDefault(), Ie.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...ue], items: t, display: be, open: ve, toggle: me }) }) : /* @__PURE__ */ E(
            It,
            {
              ref: Oe,
              variant: "outline",
              theme: ze === "dark" ? "dark" : "light",
              disabled: M,
              onClick: x ? void 0 : () => ve ? gt() : me(),
              onKeyDown: B,
              "data-state": ve ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": ve,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && ue.length > 0 ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: ue.map((Ie) => /* @__PURE__ */ h(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Ke(Ie)
                  },
                  Ie
                )) }) : /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate text-left ${tt ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: be || b }),
                /* @__PURE__ */ h(fn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          zt
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ h(
      Ui,
      {
        expanded: ve,
        collapsedWidth: I,
        expandedWidth: ye,
        rootRef: St,
        "data-picker-field": !0,
        className: q,
        style: S,
        trigger: u ? u({ values: [...n], items: t, display: j, open: ve, toggle: me }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              disabled: M,
              onClick: me,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${Qr}px ${Vn}px`, fontSize: Yn },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${Kn ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: j || b }),
                /* @__PURE__ */ h(fn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ E("div", { ref: Gt, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...Jn,
              className: `${Ir("sm")} h-full w-full`
            }
          ),
          zt
        ] })
      }
    );
  const Un = ct ? O(5, 7, ae) : 0, xn = ct ? O(9, 12, ae) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: St,
      "data-picker-field": !0,
      className: `relative ${ct ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : en ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${q}`,
      style: ct ? { padding: `${Un}px ${xn}px`, fontSize: O(12, 14, ae), ...S } : S,
      children: /* @__PURE__ */ h(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: j,
          className: ct ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ E(
    "div",
    {
      ref: St,
      "data-picker-field": !0,
      className: `relative ${ct ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : en ? "min-h-[1lh] w-full pb-[1lh]" : Mn ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${q}`,
      style: ct ? { padding: `${Un}px ${xn}px`, fontSize: Yn, ...S } : S,
      onMouseDown: (B) => B.stopPropagation(),
      onContextMenu: (B) => {
        B.preventDefault(), B.stopPropagation();
      },
      onAuxClick: me,
      children: [
        ct && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: j, open: ve, toggle: me }) }) : l === "chips" && !ve ? /* @__PURE__ */ E("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((B) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Ke(B)
            },
            B
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${ct ? "min-w-0 flex-1 truncate" : en ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Kn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: fr || b
          }
        ),
        en ? /* @__PURE__ */ h(
          "textarea",
          {
            ...Jn,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...Jn,
            className: Mn ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Mn ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : ct ? { caretColor: "#2563eb", color: "transparent", paddingLeft: xn, paddingRight: xn + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        ct && /* @__PURE__ */ h(fn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        zt
      ]
    }
  );
}
export {
  It as Button,
  Uh as CardSection,
  Ai as CheckMark,
  Rc as Checkbox,
  Ih as Checklist,
  jh as ChromeHeader,
  _h as ContentRow,
  bh as ContextMenu,
  wh as ContextMenuDivider,
  vh as ContextMenuItem,
  kh as ContextMenuSub,
  Xo as DROPDOWN_MAX_HEIGHT,
  Ah as DatePicker,
  Th as DialogProvider,
  Hc as DropdownItem,
  Jr as DropdownMenu,
  _c as DropdownSubmenu,
  Ii as DropdownThemeContext,
  Ef as FONTS,
  zh as FloatingChrome,
  Rh as FloatingToggle,
  Rf as FontMenu,
  Vh as FormatToolbar,
  et as IS_COARSE,
  mc as IS_TOUCH_CAPABLE,
  xh as ItemManagerDropdown,
  Eh as LongPressMenuProvider,
  Ti as MORPH_EASE,
  pn as MORPH_MS,
  Ci as MORPH_OPACITY_MS,
  dr as MenuHighlightContext,
  fs as MenuSearchContext,
  Wc as Modal,
  Sh as ModalFooter,
  mr as ModalFooterButton,
  Gh as MorphActionField,
  Pf as MorphSearchField,
  ss as NO_SELECTION_IDS,
  Yh as NumberInput,
  Xh as PickerField,
  pc as PopoutWindowContext,
  Jh as RICH_TEXT_STATE_IDLE,
  $h as RadioList,
  Cf as RichTextEditor,
  $f as SCRUB_PX_PER_STEP,
  Ff as SearchMenu,
  Hh as SectionHeader,
  Fh as Seg,
  Ar as SelectionCheck,
  is as SelectionContext,
  cs as SelectionFooter,
  Wh as StructureControls,
  Di as SubmenuContext,
  yh as TAB_PILL,
  aa as TB_BTN,
  gr as TB_BTN_ICON,
  ua as TB_DANGER,
  bs as TB_DIVIDER,
  da as TB_INPUT,
  Bh as TB_NUM,
  ha as TB_PICKER,
  Dh as TB_ROW_LABEL,
  fa as TB_SEG,
  Ph as TB_TOGGLE,
  Oh as TB_TOGGLE_OFF,
  Lh as TB_TOGGLE_ON,
  ls as TabFace,
  mh as ThemeProvider,
  gh as ThemeScope,
  xf as Token,
  yf as TokenChipView,
  yr as ToolButton,
  In as Tooltip,
  Ei as ZOOM_FROM,
  Bf as buildSearchMenuRows,
  Sc as buttonCloudOf,
  Yi as clampNumber,
  bc as cloneOverlayClose,
  O as coarsePx,
  Ec as countHidden,
  Kh as escapeHtml,
  Oo as formatPickerValues,
  Ko as getCoarseScale,
  qr as getDropdownClasses,
  hh as getHardwareKeyboard,
  fh as getLastPointerType,
  io as groupSelectionState,
  qf as hasPickerMatch,
  Ir as inputCls,
  Qc as isInteractiveElement,
  fi as isTouchLike,
  _f as lastPickerSegment,
  Of as matchSearchItem,
  ts as menuAttributesOf,
  wc as menuThemeOf,
  Uo as nearestOverlayOrigin,
  Ml as normalizeSpaces,
  Bt as orderByCatalogue,
  Zr as overlayMorphEnabled,
  Lf as parseSearchTags,
  Wf as pickerCommittedKeys,
  Sn as pickerItemKey,
  Il as pickerItemLabel,
  Hf as pickerSegments,
  xc as playOverlayClose,
  yc as playOverlayOpen,
  Do as preprocessTokenHtml,
  Gi as resolvePickerSegment,
  jf as resolvePickerText,
  mn as revealRowInScroller,
  bn as sameSelection,
  pf as sanitizeRichText,
  zf as scrubbedValue,
  Al as searchMenuContent,
  kc as segModeOf,
  uh as setCoarseScale,
  ro as setSelected,
  If as steppedValue,
  qh as stripRichText,
  mf as stripTokenWrappers,
  Cc as toggleSelected,
  Kf as unknownPickerValues,
  dh as useCoarse,
  De as useCoarseScale,
  hn as useCoarseSize,
  Ni as useCurrentDocument,
  ar as useCurrentWindow,
  Nh as useDialog,
  Qo as useDropdownPosition,
  as as useDropdownTheme,
  ph as useHardwareKeyboard,
  ys as useInputSize,
  zi as useItemSize,
  Ut as useKitTheme,
  gc as useLastPointerType,
  Ch as useLongPressOptOut,
  Pi as useMenuHighlight,
  Oc as useMenuSearch,
  Wr as useOverlayMorph,
  Si as usePopoutWindow,
  Wn as usePortalTarget,
  ns as useRevealRowOnOpen,
  rs as useSelection,
  Mc as useSelectionContext,
  ca as useSlidingPill,
  Mh as useTouchMode
};
