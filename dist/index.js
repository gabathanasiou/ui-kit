"use client";
import { jsx as p, jsxs as A, Fragment as at } from "react/jsx-runtime";
import ct, { createContext as Gt, useContext as Xt, useState as re, useEffect as ae, useRef as v, useCallback as se, useLayoutEffect as et, useMemo as ot, useId as Vl, useImperativeHandle as qo } from "react";
import * as _e from "@radix-ui/react-dropdown-menu";
import { Minus as Yl, Check as cr, Search as On, X as Cn, Pencil as Ul, CopyPlus as Ko, Trash2 as yi, RotateCcw as Jo, Plus as Jr, ChevronRight as Dr, ChevronLeft as Vo, ArrowUp as Gl, ArrowDown as Xl, ChevronDown as mn, Underline as Ql, Strikethrough as Zl, RemoveFormatting as ec, Link as tc, ChevronUp as nc, Anchor as rc } from "lucide-react";
import { computePosition as ic, offset as Yo, flip as Uo, shift as Go, size as oc, useFloating as sc, autoUpdate as lc } from "@floating-ui/react-dom";
import * as dn from "@radix-ui/react-dialog";
import { createPortal as Vr } from "react-dom";
import { mergeAttributes as cc, ReactNodeViewRenderer as ac, NodeViewWrapper as uc, useEditor as dc, EditorContent as fc } from "@tiptap/react";
import { PluginKey as Yt, Plugin as ln, Selection as Bn, TextSelection as Wt, NodeSelection as qn, AllSelection as hc } from "@tiptap/pm/state";
import { DecorationSet as gr, Decoration as pc } from "@tiptap/pm/view";
import mc from "@tiptap/starter-kit";
import gc from "@tiptap/extension-placeholder";
import { TextStyle as yc, FontFamily as xc, FontSize as bc } from "@tiptap/extension-text-style";
import vc from "@tiptap/extension-color";
import wc from "@tiptap/extension-link";
import kc from "@tiptap/extension-underline";
import Sc from "@tiptap/suggestion";
import { Mention as Nc } from "@tiptap/extension-mention";
import { createRoot as Cc } from "react-dom/client";
const Tc = Gt(null);
function Ri() {
  return Xt(Tc);
}
function Yn() {
  const n = Ri();
  return n ? n.document.body : null;
}
function Ii() {
  const n = Ri();
  return n ? n.document : typeof document < "u" ? document : null;
}
function ar() {
  return Ri() ?? (typeof window < "u" ? window : null);
}
const Un = typeof window < "u", Fe = Un && window.matchMedia("(pointer: coarse)").matches, Ec = Un && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ch() {
  return Un && window.matchMedia("(max-width: 600px)").matches;
}
let Yr = 0.5;
const nr = /* @__PURE__ */ new Set();
function Th(n) {
  Yr = Math.max(0, Math.min(1, n)), nr.forEach((e) => e());
}
function Xo() {
  return Yr;
}
function Eh() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return nr.add(e), () => {
      nr.delete(e);
    };
  }, []), Fe && Yr > 0;
}
function We() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return nr.add(e), () => {
      nr.delete(e);
    };
  }, []), Yr;
}
function F(n, e, t) {
  return Fe ? Math.round(n + (e - n) * t) : n;
}
function gn(n, e) {
  const t = We();
  return Fe && t > 0 ? {
    padding: `${F(n.py, e.py, t)}px ${F(n.px, e.px, t)}px`,
    fontSize: `${F(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Qo() {
  const n = We(), e = Fe && n > 0;
  return {
    box: e ? F(28, 36, n) : 20,
    icon: e ? F(16, 20, n) : 14
  };
}
function xi(n) {
  return n === "touch" || n === "pen";
}
let Fn = null;
const bi = /* @__PURE__ */ new Set();
Un && window.addEventListener("pointerdown", (n) => {
  Fn = n.pointerType, bi.forEach((e) => e());
}, !0);
function Mh() {
  return Fn;
}
function Mc() {
  const [, n] = re(0), e = v(Fn);
  return ae(() => {
    const t = () => {
      e.current !== Fn && (e.current = Fn, n((r) => r + 1));
    };
    return bi.add(t), () => {
      bi.delete(t);
    };
  }, []), Fn;
}
const Zo = ["(any-hover: hover)", "(any-pointer: fine)"];
function es() {
  return Un ? Zo.some((n) => window.matchMedia(n).matches) : !1;
}
let $r = es();
const vi = /* @__PURE__ */ new Set();
function so(n) {
  $r !== n && ($r = n, vi.forEach((e) => e()));
}
var Wo;
if (Un) {
  const n = () => so(es());
  for (const s of Zo) {
    const l = window.matchMedia(s);
    (Wo = l.addEventListener) == null || Wo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || so(!0));
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
  return $r;
}
function Ih() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return vi.add(e), () => {
      vi.delete(e);
    };
  }, []), $r;
}
const kt = 220, xn = "cubic-bezier(0.32, 0.72, 0, 1)", Ai = 170, Di = 0.94;
function ts(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Hn(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function zr(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ts(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${kt}ms ${xn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r == null || r());
      }, kt + 80));
    });
  });
}
function ns(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function rs(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return ns({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Rc(n, e, t, r) {
  const i = ++n.current;
  e.style.visibility = "", e.style.pointerEvents = "", e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Di})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const o = rs(e, t);
      e.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, e.style.transition = `transform ${kt}ms ${xn}, opacity ${Ai}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", r == null || r());
      }, kt + 60);
    });
  });
}
function Ic(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = rs(e, t);
  e.style.transition = `transform ${kt}ms ${xn}, opacity ${Ai}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Di})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, kt + 60);
}
function Ac(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? ns({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${kt}ms ${xn}, opacity ${Ai}ms ease`, r.style.transform = `scale(${Di})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, kt + 60));
    });
  });
}
function Ur(n) {
  const e = v(null), [t, r] = re(!1), i = v(null), o = v(0), s = se((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const b = m.getBoundingClientRect();
      (b.width > 0 || b.height > 0) && (i.current = { left: b.left, top: b.top, width: b.width, height: b.height }), r(!0);
      return;
    }
    const g = e.current, x = ++o.current;
    queueMicrotask(() => {
      x === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Hn(h.current) && Ac(g, u.current, i.current));
    });
  }, []), l = se(() => {
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
  const h = v(n.morph !== !1);
  h.current = n.morph !== !1;
  const f = v(0);
  return et(() => {
    if (!t || !c.current || !Hn(h.current)) return;
    const m = e.current;
    m && Rc(f, m, u.current);
  }, [t, n.visible]), ae(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), et(() => {
    var x;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Hn(h.current)) {
      (x = d.current) == null || x.call(d);
      return;
    }
    Ic(f, g, u.current, () => {
      var b;
      return (b = d.current) == null ? void 0 : b.call(d);
    });
  }, [n.visible]), ae(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const x = e.current;
      x && x.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), ae(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const x = e.current;
      x && x.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
function is(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function yr(n, e) {
  const t = getComputedStyle(n.documentElement).getPropertyValue(e).trim(), r = Number.parseFloat(t);
  return Number.isFinite(r) ? r : 0;
}
function ss(n) {
  return n ? {
    left: yr(n, "--ui-safe-area-left"),
    right: yr(n, "--ui-safe-area-right"),
    top: yr(n, "--ui-safe-area-top"),
    bottom: yr(n, "--ui-safe-area-bottom")
  } : { left: 0, right: 0, top: 0, bottom: 0 };
}
const ls = 384, Dc = is;
function cs({
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
  const u = ar(), d = v(u);
  d.current = u;
  const h = v(a);
  h.current = a, et(() => {
    if (!t) return;
    let f = 0, m = !1;
    const g = () => {
      f || (f = requestAnimationFrame(x));
    }, x = () => {
      if (f = 0, m) return;
      const T = d.current, j = n.current, U = e.current;
      if (!T || !j || !U || !U.isConnected) return;
      const R = (r == null ? void 0 : r.current) ?? U, q = Dc(T), k = ss(T.document), O = {
        x: q.x + k.left,
        y: q.y + k.top,
        width: Math.max(0, q.width - k.left - k.right),
        height: Math.max(0, q.height - k.top - k.bottom)
      }, H = l ?? ls, K = Math.min(c, H), J = Math.max(0, U.offsetHeight - R.offsetHeight), I = Math.max(K, Math.ceil(R.scrollHeight + J)), G = Math.min(I, H);
      U.style.maxHeight = `${G}px`;
      let Q = G;
      const Z = i == null ? void 0 : i.current;
      ic(Z ? {
        getBoundingClientRect: () => ({
          left: Z.left,
          top: Z.top,
          width: Z.width,
          height: Z.height,
          right: Z.left + Z.width,
          bottom: Z.top + Z.height,
          x: Z.left,
          y: Z.top,
          toJSON: () => {
          }
        })
      } : j, U, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Yo(o),
          Uo({ boundary: O, padding: s, fallbackStrategy: "bestFit" }),
          Go({ boundary: O, padding: s, mainAxis: !1 }),
          oc({
            boundary: O,
            padding: s,
            apply({ availableHeight: M }) {
              Q = Math.max(K, Math.floor(Math.min(H, M))), U.style.maxHeight = `${Q}px`;
            }
          })
        ]
      }).then(({ x: M, y: ce, placement: be }) => {
        m || !Number.isFinite(M) || !Number.isFinite(ce) || h.current({
          top: Math.round(ce),
          left: Math.round(M),
          maxH: Q,
          side: be.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    x();
    const b = d.current, $ = (b == null ? void 0 : b.document) ?? null, E = (b == null ? void 0 : b.visualViewport) ?? null, w = () => g();
    E == null || E.addEventListener("resize", w), E == null || E.addEventListener("scroll", w), b == null || b.addEventListener("resize", w), $ == null || $.addEventListener("scroll", w, { capture: !0, passive: !0 });
    let N = null;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(w), e.current && N.observe(e.current), r != null && r.current && N.observe(r.current)), () => {
      m = !0, f && cancelAnimationFrame(f), E == null || E.removeEventListener("resize", w), E == null || E.removeEventListener("scroll", w), b == null || b.removeEventListener("resize", w), $ == null || $.removeEventListener("scroll", w, { capture: !0 }), N == null || N.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
const $c = 8, zc = 900, as = 1e3;
let zn = { at: 0, target: null, x: 0, y: 0 };
typeof document < "u" && document.addEventListener("pointerdown", (n) => {
  zn = { at: Date.now(), target: n.target, x: n.clientX, y: n.clientY };
}, !0);
const Pc = 12;
function us(n, e) {
  const t = Date.now() - zn.at < as, r = Math.hypot(e.clientX - zn.x, e.clientY - zn.y) <= Pc, i = !!zn.target && n.contains(zn.target);
  return Fe && t && r && !i;
}
function ds() {
  const n = v(!1);
  return { onClick: (r) => {
    const i = r.currentTarget;
    n.current = !!i && us(i, r);
  }, takeGhost: () => {
    const r = n.current;
    return n.current = !1, r;
  } };
}
function fs(n, e = !1) {
  const t = ds(), r = v(null), i = v(0), o = (a) => {
    !Fe || e || a.pointerType !== "touch" || (r.current = { x: a.clientX, y: a.clientY, t: Date.now(), doc: a.currentTarget.ownerDocument });
  }, s = (a) => {
    if (!Fe || e || a.pointerType !== "touch") return;
    const u = r.current;
    if (r.current = null, !u || Date.now() - u.t > zc || Math.hypot(a.clientX - u.x, a.clientY - u.y) > $c) return;
    i.current = Date.now();
    const d = a.currentTarget;
    n(), d.click();
    let h = 0;
    const f = () => {
      u.doc.removeEventListener("click", m, !0), u.doc.removeEventListener("pointerdown", g, !0), h && window.clearTimeout(h);
    }, m = (x) => {
      x.preventDefault(), x.stopImmediatePropagation(), f();
    }, g = () => f();
    u.doc.addEventListener("click", m, !0), u.doc.addEventListener("pointerdown", g, !0), h = window.setTimeout(f, 600);
  }, l = () => {
    r.current = null;
  }, c = () => Date.now() - i.current < as;
  return {
    onPointerDown: o,
    onPointerUp: s,
    onPointerCancel: l,
    onClick: t.onClick,
    takeGhost: t.takeGhost,
    suppressSelect: c
  };
}
let An = null;
function hs(n) {
  return An == null || An(), An = n, () => {
    An === n && (An = null);
  };
}
const ps = Gt(null);
function $i(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.identityAccent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", identityAccent: o, surface: r, context: i };
}
function zi({ theme: n, children: e }) {
  return /* @__PURE__ */ p(ps.Provider, { value: n, children: e });
}
function Ah({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Qt();
  return /* @__PURE__ */ p(zi, { theme: $i({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Dh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Qt(), c = $i({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ p(zi, { theme: c, children: /* @__PURE__ */ p(
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
function Qt() {
  return Xt(ps);
}
function Lc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function ms(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = Lc(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Oc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Fc(n) {
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
function sn(n, e = "nearest", t) {
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
function gs({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = v(!1), s = v(!1), l = v(!1), c = v({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const a = se(() => {
    o.current = !0;
  }, []);
  return et(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: d, block: h } = c.current, f = u();
    f && (sn(f, h, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), ae(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: h } = c.current;
      sn(d(), "nearest", (h == null ? void 0 : h()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const Hc = [];
function jt(n, e) {
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
function _c(n, e, t, r = {}) {
  var o;
  const i = jt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : jt([...i, e], t);
}
function lo(n, e, t, r, i = {}) {
  const o = jt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = jt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : jt([...o, ...u], r);
}
function co(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function jc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function ys(n) {
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
  } = n, [h, f] = re(() => jt(t, r)), m = ot(() => new Set(s ?? []), [s]), g = ot(() => new Set(h), [h]), x = o !== void 0 && h.length >= o, b = !wn(h, t), $ = se((q) => {
    if (m.has(q)) return;
    const k = g.has(q), O = _c(h, q, r, { max: o, disabledIds: s });
    wn(O, h) || (f(O), d == null || d(O), u == null || u(q, !k));
  }, [h, g, m, r, o, s, u, d]), E = se((q) => {
    const k = q.filter((K) => !m.has(K)), O = co(h, k), H = lo(h, k, O !== "all", r, { max: o, disabledIds: s });
    wn(H, h) || (f(H), d == null || d(H));
  }, [h, m, r, o, s, d]), w = se((q, k = i ?? r) => {
    const O = lo(h, k, q, r, { max: o, disabledIds: s });
    wn(O, h) || (f(O), d == null || d(O));
  }, [h, i, r, o, s, d]), N = se(() => {
    h.length !== 0 && (f([]), d == null || d([]));
  }, [h, d]), T = se((q) => {
    f(jt(q ?? t, r));
  }, [t, r]), j = se(() => !a || wn(h, t) ? !1 : (a(jt(h, r)), !0), [a, h, t, r]), U = se(() => !c || wn(h, t) ? !1 : (c(jt(h, r)), !0), [c, h, t, r]), R = se((q) => co(h, q), [h]);
  return {
    mode: e,
    indicator: l,
    draft: h,
    count: h.length,
    max: o,
    atMax: x,
    dirty: b,
    hiddenCount: jc(h, r, i),
    isSelected: (q) => g.has(q),
    isDisabled: (q) => m.has(q),
    canToggle: (q) => !m.has(q) && (g.has(q) || !x),
    toggle: $,
    toggleGroup: E,
    setAll: w,
    clear: N,
    reset: T,
    commit: j,
    flush: U,
    cancel: T,
    groupState: R
  };
}
const xs = Gt(null), Wc = () => Xt(xs), bs = Hc;
function Pi({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ A("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ A("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ p("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function qc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", h = We(), f = F(16, 20, h), m = F(12, 14, h), g = F(12, 14, h), x = F(12, 16, h), b = F(10, 12, h), $ = F(8, 10, h);
  return /* @__PURE__ */ A(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: $, padding: d ? `${b}px ${x}px` : void 0 },
      onClick: (w) => w.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (w) => e(w.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ p(Pi, { checked: n, size: f, tone: a }) : /* @__PURE__ */ p("span", { className: "ui-checkbox-box", style: { width: f, height: f }, "aria-hidden": !0, children: n && /* @__PURE__ */ p("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ p("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ p("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const ao = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", uo = Fe ? " delay-200" : "", Kc = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-active:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Jc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-active:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Vc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 group-data-[state=open]:opacity-100";
function Yc(n) {
  if (!ct.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function vs({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: l }) {
  const c = !!e && !!n, a = c && !t, u = !!n && (t || c), d = Yc(n), [h, f] = re({ sig: d, node: n }), [m, g] = re(null);
  d !== h.sig && (f({ sig: d, node: n }), g(h.node)), ae(() => {
    if (m == null) return;
    const b = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(b);
  }, [m]);
  const x = m == null ? n : /* @__PURE__ */ A("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ p("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: m }, `out:${h.sig}`),
    /* @__PURE__ */ p("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${d}`)
  ] });
  return c ? /* @__PURE__ */ A(at, { children: [
    u && (a ? /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: `grid min-w-0 ${ao}${uo} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Jc}`}`, children: /* @__PURE__ */ p("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: x }) }) : /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: x })),
    /* @__PURE__ */ p("span", { "data-kit-label": !0, className: `grid min-w-0 ${ao}${uo} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Kc}`}`, children: /* @__PURE__ */ p("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ p(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Vc}`} ${a ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-active:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: a ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ A("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ p("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ p("span", { className: "col-start-1 row-start-1", children: l })
        ] }) : l
      }
    ) }) })
  ] }) : /* @__PURE__ */ A(at, { children: [
    u && /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    l
  ] });
}
const $h = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function zt({
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
  collapse: h = !1,
  iconWithLabel: f = !0,
  className: m = "",
  type: g = "button",
  children: x,
  ...b
}) {
  const $ = Qt(), E = e ?? ($ == null ? void 0 : $.mode) ?? "light", w = t ?? Fc($), N = gn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), T = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), j = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), U = "", R = "", q = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, k = "rounded", O = "rounded-[var(--ui-radius-btn)]", H = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, K = {
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
  }, J = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, I = {
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
  }, G = { base: `${R} bg-[var(--ui-btn-solid-bg)] hover:bg-[var(--ui-btn-solid-hover-bg)] border border-[color:var(--ui-btn-solid-border)] hover:border-[color:var(--ui-btn-solid-hover-border)] text-[color:var(--ui-btn-solid-text)]`, open: "bg-[var(--ui-btn-solid-hover-bg)]!" }, Q = {
    light: {
      subtle: { base: `${U} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      /* The primary fill is the identity header step, mode-independent (the
         app header is always dark chrome). Read from the `data-identity-accent`
         block the button carries, so a neutral modal keeps its project CTA. */
      primary: { base: `${R} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: G,
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${U} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${U} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${U} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${R} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: G,
      outline: {
        base: `${U} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${U} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, Z = b["data-state"] === "open", le = Q[E][n], M = n === "primary" || n === "solid" ? T : n.startsWith("tab") ? j : N, ce = Fe ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, be = F(6, 8, We()), Se = F(28, 40, We()), xe = w === "emerald" ? "emerald" : w ? "blue" : null, ne = t === "emerald" ? "emerald" : t ? "blue" : ($ == null ? void 0 : $.identityAccent) ?? "zinc", ye = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", ie = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let B;
  if (n === "tab") {
    const Ie = H[E];
    B = `${k} ${r ? xe ? K[xe].active : Ie.active : xe ? K[xe][E === "light" ? "inactiveLight" : "inactiveDark"] : Ie.inactive}`;
  } else if (n === "tab-header") {
    const Ie = xe ? r ? I[xe].active : I[xe].inactive : r ? J.active : J.inactive;
    B = `${k} ${Ie} ${Z ? xe ? I[xe].open : J.open : ""}`;
  } else
    B = `${O} ${le.base} ${Z ? le.open : ""}`, r && (B = `${B} ${i === "neutral" ? ye : ie[i]}`);
  const D = !!h && !!d && !o, Y = o ? { width: Se, height: Se, padding: 0, gap: 0 } : s === "minimal" ? { ...ce, gap: D ? 0 : be } : { ...M, gap: D ? 0 : be };
  return /* @__PURE__ */ p(
    "button",
    {
      type: g,
      "data-mode": E,
      "data-accent": $ == null ? void 0 : $.accent,
      "data-surface": $ == null ? void 0 : $.surface,
      "data-identity-accent": ne,
      className: `${q} ${o ? "justify-center" : ""} ${D ? "group" : ""} ${B} ${m}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: Y,
      ...b,
      children: o ? x : /* @__PURE__ */ p(
        vs,
        {
          icon: d,
          collapse: h,
          iconWithLabel: f,
          active: r && (n.startsWith("tab") || c),
          gap: be,
          reserve: a,
          roll: u,
          children: x
        }
      )
    }
  );
}
function Pr({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = We(), l = i ?? F(14, 18, s);
  return r === "check" ? /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ p(Yl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ p(cr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ p(Pi, { checked: n, indeterminate: e, size: l })
    }
  );
}
function ws({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = We(), a = F(10, 14, c), u = F(6, 9, c), d = F(11, 13, c), h = s === "light" ? "light" : "dark", f = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ A(
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
        /* @__PURE__ */ A(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ A("span", { className: "text-[color:var(--ui-text-faint)]", children: [
                " · ",
                t,
                " hidden by filter"
              ] })
            ]
          }
        ),
        o && /* @__PURE__ */ p(
          zt,
          {
            variant: "subtle",
            size: "minimal",
            theme: h,
            cloud: f,
            onMouseDown: (g) => g.preventDefault(),
            onClick: r,
            disabled: n === 0,
            "data-selection-clear": !0,
            children: "Clear"
          }
        ),
        i && /* @__PURE__ */ p(
          zt,
          {
            variant: "primary",
            size: "minimal",
            theme: h,
            cloud: f,
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
const Li = Gt("dark"), ks = () => Xt(Li), Oi = Gt({ "data-theme": "dark" }), Uc = () => Xt(Oi);
function Fi() {
  const n = We();
  return {
    padding: `${F(8, 12, n)}px ${F(12, 16, n)}px`,
    fontSize: `${F(12, 14, n)}px`,
    lineHeight: `${F(18, 22, n)}px`
  };
}
function Ss() {
  const n = We();
  return {
    padding: `${F(6, 9, n)}px ${F(12, 16, n)}px ${F(2, 3, n)}px`,
    fontSize: `${F(10, 11, n)}px`,
    lineHeight: `${F(14, 16, n)}px`
  };
}
const Gc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", fo = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Xc = (n) => n ? "text-xs" : "text-[10px]";
function Gr(n) {
  const e = Fe && Xo() > 0;
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
    headerPad: fo(e),
    headerText: `${fo(e)} font-semibold uppercase tracking-wider ${Xc(e)} ui-label`,
    // Item padding
    itemPad: Gc(e),
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
function Ns(n) {
  const e = [];
  return ct.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (ct.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Bi = Gt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), ur = Gt(null), Hi = () => Xt(ur), Cs = Gt({ query: "", setQuery: () => {
} }), Qc = () => Xt(Cs), Ts = Gt(null), Zc = () => Xt(Ts), ea = () => !0;
function Xr(n) {
  const e = v([]), [t, r] = re(-1), [i, o] = re(!1), [s, l] = re(0), c = se((h) => (e.current = [...e.current, h], l((f) => f + 1), () => {
    e.current = e.current.filter((f) => f !== h), l((f) => f + 1);
  }), []), a = se((h, f) => {
    r(h), o(f === "pointer");
  }, []), u = se(() => {
    o((h) => h && (r(-1), !1));
  }, []);
  return ot(() => ({
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
function Es(n) {
  const e = Hi(), t = v(e);
  t.current = e;
  const r = v(null);
  ae(() => {
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
    var g, x, b, $, E, w;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const h = u.target;
    if (!!h && !!h.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const N = (b = (x = l.current) == null ? void 0 : x.onFieldKey) == null ? void 0 : b.call(x, u);
      (!!(($ = l.current) != null && $.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), N && u.preventDefault());
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
        u.preventDefault(), u.stopImmediatePropagation(), (w = (E = l.current) == null ? void 0 : E.onCloseSub) == null || w.call(E);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = Date.now(), T = (N - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: T, time: N }, !T) return;
        const j = i.current + 1;
        for (let U = 0; U < m.length; U++) {
          const R = (j + U) % m.length;
          if (m[R].label.toLowerCase().startsWith(T)) {
            o.current.setHighlighted(R, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ji(n, e, t, r, i, o, s) {
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
  const h = v(!1);
  h.current || (h.current = !0, o.current = (f) => {
    if (!c.current || a.current) return;
    const m = r.current;
    if (m && m.contains(f.target)) return;
    if (d.current && (f.metaKey || f.ctrlKey) && f.key.toLowerCase() === "a") {
      f.preventDefault(), f.stopImmediatePropagation(), t.current(f);
      return;
    }
    if (u.current) {
      const x = f.target;
      if (x && x.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(f.key === "ArrowDown" || f.key === "ArrowUp" || f.key === "ArrowLeft" || f.key === "ArrowRight" || f.key === "Enter" || f.key === " " || f.key.length === 1 && !f.ctrlKey && !f.metaKey && !f.altKey) || (f.preventDefault(), f.stopImmediatePropagation(), t.current(f));
  });
}
function Wi(n, e) {
  const t = v(n);
  t.current = n;
  const r = v(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Qr({
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
  searchable: h = !1,
  searchPlaceholder: f,
  searchFilter: m,
  searchValue: g,
  onSearchValueChange: x,
  multiple: b
}) {
  const $ = Qt(), E = ms(s, $), w = E.theme, [N, T] = re([]), [j, U] = re(null), R = Yn(), q = Ii(), k = v(null), O = v(null), H = v(n);
  H.current = n;
  const [K, J] = re(n), [I, G] = re(""), Q = h && g !== void 0, Z = Q ? g : I, le = Q ? x ?? (() => {
  }) : G, M = v(g ?? "");
  ae(() => {
    n || (M.current = g ?? "");
  }, [n, g]);
  const ce = Q && Z === M.current ? "" : Z, be = Vl(), Se = v(null), xe = We(), ne = {
    padding: `${F(8, 12, xe)}px ${F(12, 16, xe)}px`,
    fontSize: `${F(12, 14, xe)}px`
  }, [ye, ie] = re(0), B = h && !Q;
  ae(() => {
    var Xe;
    if (!B || !n) return;
    const z = (Xe = O.current) == null ? void 0 : Xe.querySelector("[data-menu-items]");
    if (!z) return;
    const V = () => ie(z.offsetWidth - z.clientWidth);
    V();
    const pe = new ResizeObserver(V);
    return pe.observe(z), () => pe.disconnect();
  }, [n, B, Z]);
  const D = ot(() => {
    if (!h) return;
    const z = ce.trim().toLowerCase();
    return z ? (V) => {
      var pe;
      return m ? m(z, V.label, V.group) : V.label.toLowerCase().includes(z) || (((pe = V.group) == null ? void 0 : pe.toLowerCase().includes(z)) ?? !1);
    } : ea;
  }, [ce, h, m]), Y = Xr(D), Ie = h && ce.trim() !== "" && Y.items.length === 0, Ce = !!b, me = Y.allItems.map((z) => z.itemId).filter((z) => !!z), je = Y.items.map((z) => z.itemId).filter((z) => !!z), Ee = ys({
    mode: "draft",
    selectedIds: (b == null ? void 0 : b.selectedIds) ?? bs,
    itemIds: me,
    visibleIds: je,
    max: b == null ? void 0 : b.max,
    disabledIds: b == null ? void 0 : b.disabledIds,
    indicator: b == null ? void 0 : b.indicator,
    onCommit: b == null ? void 0 : b.onCommit
  }), Be = v(Ee.reset);
  Be.current = Ee.reset;
  const L = typeof (b == null ? void 0 : b.commitLabel) == "function" ? b.commitLabel(Ee.count) : (b == null ? void 0 : b.commitLabel) ?? `Select ${Ee.count}`;
  ae(() => {
    if (n)
      return J(!0), Q || G(""), Y.setHighlighted(d ?? -1, "keyboard"), Be.current(), hs(() => {
        t == null || t(!1), e == null || e();
      });
    T([]);
  }, [n, d, t, e]), ae(() => {
    if (!n || !q) return;
    const z = (V) => {
      if (V.pointerType !== "touch") return;
      const pe = V.target;
      pe && (O.current && O.current.contains(pe) || k.current && k.current.contains(pe) || pe instanceof Element && pe.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') || (t == null || t(!1), e == null || e()));
    };
    return q.addEventListener("pointerdown", z, { capture: !0 }), () => q.removeEventListener("pointerdown", z, { capture: !0 });
  }, [n, q, t, e]);
  const C = se(() => {
    const z = k.current;
    if (!z) return null;
    const V = z.getBoundingClientRect();
    return { left: V.left, top: V.top, width: V.width, height: V.height };
  }, []), ge = Ur({
    visible: n,
    morph: c,
    anchor: C,
    onClosed: () => J(!1)
  }), ve = v(() => {
  }), Pe = v(() => {
  }), lt = v(() => {
  }), we = se((z) => {
    if (z.key === "Enter") {
      const V = Y.highlightedIndex, pe = Y.items[V >= 0 ? V : 0];
      return pe == null || pe.activate(), !0;
    }
    return z.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [Y, t, e]);
  _i(n && N.length === 0, Y, ve, {
    onFieldKey: we,
    onSelectAll: Ce ? () => Ee.setAll(!0) : void 0
  }), Wi(n, Pe), ji(n, Y, ve, O, N.length > 0, lt, {
    ignoreFields: Q,
    selectAll: Ce
  });
  const He = v(null), mt = se((z) => {
    var V;
    if (z) {
      z.addEventListener("keydown", ve.current, { capture: !0 }), z.addEventListener("wheel", Pe.current, { passive: !1 });
      const pe = z.ownerDocument;
      He.current = pe, pe.addEventListener("keydown", lt.current, { capture: !0 }), Ae(!0);
    } else
      (V = He.current) == null || V.removeEventListener("keydown", lt.current, { capture: !0 }), He.current = null, Ae(!1);
    O.current = z, ge(z);
  }, [ge]), [ze, Zt] = re({ top: 0, left: 0, maxH: ls, side: "bottom", ready: !1 }), [Kt, Bt] = re(0), [Et, Ae] = re(!1);
  ae(() => {
    n && k.current && Bt(k.current.getBoundingClientRect().width);
  }, [n]), cs({
    anchorRef: k,
    panelRef: O,
    open: n && Et,
    maxHeight: u,
    onPosition: Zt
  }), ae(() => {
    var z;
    if (ze.ready && n) {
      if (h) {
        (z = Se.current ?? k.current) == null || z.focus();
        return;
      }
      const V = O.current;
      V && V.ownerDocument.activeElement !== V && !V.contains(V.ownerDocument.activeElement) && V.focus();
    }
  }, [ze.ready, n, h]), ae(() => {
    if (!n || !h) return;
    if (Y.items.length === 0) {
      Y.highlightedIndex !== -1 && Y.setHighlighted(-1, "keyboard");
      return;
    }
    const z = Y.highlightedIndex;
    (z < 0 || z >= Y.items.length) && Y.setHighlighted(0, "keyboard");
  }, [n, Z, h, Y.items.length]), et(() => {
    var V;
    if (!n || Y.highlightedIndex < 0 || Y.pointerDriven) return;
    const z = (V = O.current) == null ? void 0 : V.querySelector(`[data-ei="${Y.highlightedIndex}"]`);
    sn(z, "nearest");
  }, [n, Y.highlightedIndex, Y.pointerDriven]);
  const Ve = se((z) => {
    if (!(!z && !H.current)) {
      if (!z && At.current) {
        if (Q) return;
        tt.current = !0;
      }
      t ? t(z) : z || e == null || e();
    }
  }, [t, e]), gt = v(K);
  gt.current = K;
  const At = v(!1), tt = v(!1), Dt = se(() => {
    if (!H.current && gt.current) {
      if (tt.current) {
        tt.current = !1, At.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), qe = ct.isValidElement(r) ? r : null, nt = v(!1), $t = se(() => {
    const z = k.current;
    z && (nt.current = !0, z.focus(), setTimeout(() => {
      nt.current = !1;
    }, 0));
  }, []), yt = qe ? ct.cloneElement(qe, {
    ref: (z) => {
      k.current = z;
      const V = qe.props.ref;
      typeof V == "function" ? V(z) : V && (V.current = z);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...Q ? { type: qe.props.type ?? "text" } : {},
    ...Q ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${be}-content` : void 0,
      "aria-activedescendant": n && Y.highlightedIndex >= 0 ? `${be}-opt-${Y.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (z) => {
      var V, pe;
      (pe = (V = qe.props).onPointerDownCapture) == null || pe.call(V, z), At.current = !0, tt.current = !1, setTimeout(() => {
        At.current = !1;
      }, 0);
    },
    onPointerDown: (z) => {
      var V, pe;
      if ((pe = (V = qe.props).onPointerDown) == null || pe.call(V, z), Q) {
        z.preventDefault();
        const Xe = H.current;
        Xe || t == null || t(!0);
        const rt = k.current;
        rt == null || rt.focus(), !Xe && rt instanceof HTMLInputElement && rt.select();
      } else !H.current && gt.current && !tt.current && (t == null || t(!0));
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (z) => {
      var V, pe;
      (pe = (V = qe.props).onKeyDownCapture) == null || pe.call(V, z), Q && z.key === " " && z.stopPropagation();
    },
    onClick: (z) => {
      var V, pe;
      (pe = (V = qe.props).onClick) == null || pe.call(V, z), Dt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (z) => {
      var V, pe;
      if (nt.current) {
        nt.current = !1;
        return;
      }
      (pe = (V = qe.props).onFocus) == null || pe.call(V, z);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (z) => {
      var pe, Xe, rt, St;
      if ((Xe = (pe = qe.props).onBlur) == null || Xe.call(pe, z), !Q || !H.current) return;
      const V = z.relatedTarget;
      V && ((rt = O.current) != null && rt.contains(V) || (St = k.current) != null && St.contains(V)) || setTimeout(() => {
        var ee;
        const Rt = k.current;
        if (!Rt || !H.current) return;
        const S = Rt.ownerDocument.activeElement;
        S && (Rt.contains(S) || (ee = O.current) != null && ee.contains(S)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (z) => {
      var V, pe;
      if ((pe = (V = qe.props).onKeyDown) == null || pe.call(V, z), !(!Q || !H.current)) {
        if (z.key === "ArrowDown" || z.key === "ArrowUp") {
          z.preventDefault();
          const Xe = Y.items;
          if (Xe.length === 0) return;
          const rt = z.key === "ArrowDown" ? 1 : -1, St = (Y.highlightedIndex + rt + Xe.length) % Xe.length;
          Y.setHighlighted(St, "keyboard");
        } else if (z.key === "Enter") {
          z.preventDefault();
          const Xe = Y.highlightedIndex, rt = Y.items[Xe >= 0 ? Xe : 0];
          rt == null || rt.activate();
        }
      }
    }
  }) : r, Mt = /* @__PURE__ */ A("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ A("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      ce.trim(),
      "”"
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), Ht = B || Ce, Ke = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${Ht ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ A(_e.Root, { open: n || K, onOpenChange: Ve, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: yt }),
    /* @__PURE__ */ p(_e.Portal, { container: R ?? void 0, children: /* @__PURE__ */ p(Li.Provider, { value: w, children: /* @__PURE__ */ p(Oi.Provider, { value: E.attrs, children: /* @__PURE__ */ p(Bi.Provider, { value: { chain: N, setChain: T, morph: c, keyboardOpened: j, setKeyboardOpened: U }, children: /* @__PURE__ */ p(ur.Provider, { value: Y, children: /* @__PURE__ */ p(Cs.Provider, { value: { query: Z, setQuery: le }, children: /* @__PURE__ */ p(xs.Provider, { value: Ce ? Ee : null, children: /* @__PURE__ */ p(Ts.Provider, { value: be, children: /* @__PURE__ */ A(
      _e.Content,
      {
        id: `${be}-content`,
        ref: mt,
        tabIndex: Q ? void 0 : -1,
        ...E.attrs,
        "data-ui-fixed": !0,
        className: `${Ke} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: ze.left,
          top: ze.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Kt || void 0,
          maxHeight: ze.maxH,
          visibility: ze.ready ? "visible" : "hidden"
        },
        onPointerLeave: Y.pointerLeave,
        onPointerDownOutside: (z) => {
          const V = z.target;
          V != null && V.closest('[role="menu"], [data-radix-menu-content]') && z.preventDefault(), V && k.current && k.current.contains(V) && z.preventDefault();
        },
        onInteractOutside: (z) => {
          z.type === "dismissableLayer.focusOutside" && N.length > 0 && z.preventDefault();
        },
        onFocusCapture: Q ? (z) => {
          z.target === z.currentTarget && (z.stopPropagation(), $t());
        } : void 0,
        onFocusOutside: Q ? (z) => {
          var pe;
          const V = z.target;
          V && (V === k.current || (pe = k.current) != null && pe.contains(V)) && z.preventDefault();
        } : void 0,
        onCloseAutoFocus: Q ? (z) => {
          z.preventDefault(), $t();
        } : void 0,
        children: [
          B && /* @__PURE__ */ p("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ye }, children: /* @__PURE__ */ A("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: ne, children: [
            /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: Se,
                value: Z,
                onChange: (z) => le(z.target.value),
                placeholder: f ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            Z ? /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (z) => z.stopPropagation(),
                onClick: () => {
                  var z;
                  le(""), (z = Se.current) == null || z.focus();
                },
                children: /* @__PURE__ */ p(Cn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ p("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          Ht ? /* @__PURE__ */ A("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Ie && Mt
          ] }) : /* @__PURE__ */ A(at, { children: [
            l,
            Ie && Mt
          ] }),
          Ce && (b == null ? void 0 : b.footer) !== !1 && /* @__PURE__ */ p(
            ws,
            {
              count: Ee.count,
              max: b == null ? void 0 : b.max,
              hiddenCount: (b == null ? void 0 : b.hiddenNote) === !1 ? 0 : Ee.hiddenCount,
              clear: (b == null ? void 0 : b.clear) !== !1,
              theme: w,
              onClear: Ee.clear,
              hero: {
                label: L,
                onClick: () => {
                  Ee.commit(), Ve(!1);
                },
                disabled: Ee.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function ta({
  item: n,
  isActive: e,
  itemSize: t,
  itemRender: r,
  closeOnSelect: i,
  onSelect: o,
  d: s
}) {
  const l = fs(() => o(n.id));
  return /* @__PURE__ */ p(
    _e.Item,
    {
      style: t,
      className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${s.rowText} ${e ? "" : s.rowTextHover}`,
      onSelect: (c) => {
        if (l.takeGhost()) {
          c.preventDefault();
          return;
        }
        if (l.suppressSelect()) {
          i || c.preventDefault();
          return;
        }
        i || c.preventDefault(), o(n.id);
      },
      onClick: l.onClick,
      onPointerDown: l.onPointerDown,
      onPointerUp: l.onPointerUp,
      onPointerCancel: l.onPointerCancel,
      onTouchStart: () => {
      },
      children: /* @__PURE__ */ p("span", { className: `truncate ${e ? s.rowActiveText : ""}`, children: r ? r(n) : n.name })
    }
  );
}
function zh({
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
  onTrash: h,
  closeOnSelect: f,
  readOnly: m = !1,
  theme: g,
  align: x,
  label: b,
  header: $,
  itemLabel: E,
  trigger: w,
  minItems: N = 1,
  itemRender: T,
  morph: j = !0,
  contentClassName: U
}) {
  const R = Gr(), q = Fi(), [k, O] = re(null), [H, K] = re(""), J = v(H);
  J.current = H;
  const I = v(null), G = v(null), [Q, Z] = re(null), le = se((ne) => {
    G.current = ne, Z(ne);
  }, []), M = gs({
    open: n,
    scroller: () => G.current,
    row: () => {
      var ne;
      return ((ne = G.current) == null ? void 0 : ne.querySelector('[data-active="1"]')) ?? null;
    }
  });
  ae(() => {
    if (!n) return;
    const ne = (ie) => {
      var je, Ee;
      const B = ie.target;
      if (B && B.closest("input, textarea, [contenteditable]")) {
        k && B === I.current && (ie.key === "Enter" ? (ie.preventDefault(), ie.stopImmediatePropagation(), be()) : ie.key === "Escape" && (ie.preventDefault(), ie.stopImmediatePropagation(), Se()));
        return;
      }
      const D = (je = G.current) == null ? void 0 : je.closest(".ui-menu");
      if (!D || !D.contains(ie.target)) return;
      const Y = D.ownerDocument, Ie = [...D.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ce = [...D.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], me = [...Ie, ...Ce];
      if (ie.key === "ArrowDown" || ie.key === "ArrowUp") {
        ie.preventDefault(), ie.stopImmediatePropagation();
        const Be = Y.activeElement;
        let L = Be ? me.indexOf(Be) : -1;
        if (L < 0 && Be) {
          const Pe = Be.closest("[data-im-row]"), lt = Pe == null ? void 0 : Pe.querySelector('[role="menuitem"]:first-child');
          lt && (L = Ie.indexOf(lt));
        }
        const C = ie.key === "ArrowDown" ? 1 : -1, ge = L < 0 ? C === 1 ? 0 : me.length - 1 : (L + C + me.length) % me.length, ve = me[ge];
        ve == null || ve.focus({ preventScroll: !0 }), sn((ve == null ? void 0 : ve.closest("[data-im-row]")) ?? ve, "nearest", G.current);
        return;
      }
      if (ie.key === "ArrowLeft" || ie.key === "ArrowRight") {
        const Be = Y.activeElement, L = Be == null ? void 0 : Be.closest("[data-im-row]");
        if (!L) return;
        ie.preventDefault(), ie.stopImmediatePropagation();
        const C = [...L.querySelectorAll('[role="menuitem"]')].slice(1);
        if (C.length === 0) return;
        const ge = Be && L.contains(Be) ? C.indexOf(Be) : -1, ve = ie.key === "ArrowRight" ? 1 : -1, Pe = ge < 0 ? 0 : (ge + ve + C.length) % C.length;
        (Ee = C[Pe]) == null || Ee.focus({ preventScroll: !0 });
        return;
      }
    }, ye = (Q == null ? void 0 : Q.ownerDocument) ?? null;
    return ye == null || ye.addEventListener("keydown", ne, { capture: !0 }), () => ye == null ? void 0 : ye.removeEventListener("keydown", ne, { capture: !0 });
  }, [n, k, Q]), ae(() => {
    if (!k) return;
    const ne = t.find((D) => D.id === k);
    ne && !H && K(ne.name);
    const ye = requestAnimationFrame(() => {
      const D = I.current;
      D && (D.focus(), D.select());
    });
    let ie = 0;
    const B = window.setInterval(() => {
      const D = I.current;
      if (ie++, !D || ie > 12) {
        clearInterval(B);
        return;
      }
      D.ownerDocument.activeElement !== D && (D.focus(), D.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ye), clearInterval(B);
    };
  }, [k]), ae(() => {
    if (k) {
      const ne = t.find((ye) => ye.id === k);
      ne && !H && K(ne.name);
    }
  }, [k, t]);
  const ce = (ne, ye) => {
    O(ne), K(ye);
  }, be = () => {
    k && J.current.trim() && o(k, J.current.trim()), O(null);
  }, Se = () => {
    O(null);
  }, xe = E || $.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ A(Qr, { open: n, onOpenChange: (ne) => {
    ne ? (O(null), K("")) : (k && H.trim() && o(k, H.trim()), O(null), K("")), (!ne || !m) && e(ne);
  }, width: "w-80", theme: g, align: x, trigger: w, morph: j, contentClassName: U, children: [
    /* @__PURE__ */ p("div", { className: `shrink-0 ${R.headerText}`, children: $ }),
    /* @__PURE__ */ p("div", { ref: le, "data-im-list": !0, onPointerEnter: M.engage, onPointerDown: M.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((ne) => {
      const ye = ne.id === r, ie = k === ne.id;
      return /* @__PURE__ */ p("div", { "data-im-row": ne.id, "data-active": ye ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ye || ie ? R.rowActiveBg : R.rowHoverBg} ${k && !ie ? "opacity-40 pointer-events-none" : ""}`, children: ie ? /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ p("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ p(
          "input",
          {
            ref: I,
            autoFocus: !0,
            value: H,
            onChange: (B) => K(B.target.value),
            onKeyDown: (B) => {
              B.key === "Enter" && (B.preventDefault(), B.stopPropagation(), be()), B.key === "Escape" && (B.preventDefault(), B.stopPropagation(), Se());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: q
          }
        ) }),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${R.editConfirm}`,
            onSelect: (B) => {
              B.preventDefault(), be();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(cr, { className: R.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${R.editCancel}`,
            onSelect: (B) => {
              B.preventDefault(), Se();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(Cn, { className: R.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ p(
          ta,
          {
            item: ne,
            isActive: ye,
            itemSize: q,
            itemRender: T,
            closeOnSelect: f,
            onSelect: i,
            d: R
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? R.btnActive : R.btnBase}`,
            onSelect: (B) => {
              B.preventDefault(), ce(ne.id, ne.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Ul, { className: R.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? R.btnActive : R.btnBase}`,
            onSelect: (B) => {
              B.preventDefault();
              const D = s(ne.id);
              D && ce(D, `${ne.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Ko, { className: R.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= N ? R.btnDisabled : ye ? R.btnDangerActive : R.btnDanger}`,
            onSelect: (B) => {
              B.preventDefault(), l(ne.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= N,
            children: /* @__PURE__ */ p(yi, { className: R.btnIcon })
          }
        )
      ] }) }, ne.id);
    }) }),
    /* @__PURE__ */ A("div", { className: `shrink-0 ${k ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ p(_e.Separator, { className: R.separator }),
        /* @__PURE__ */ A(
          _e.Item,
          {
            className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
            onSelect: (ne) => {
              ne.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ p(Jo, { className: `${R.btnIcon} ${R.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || h) && /* @__PURE__ */ p(_e.Separator, { className: R.separator }),
      c && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
          onSelect: (ne) => {
            ne.preventDefault();
            const ye = c();
            ye && ce(ye, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(Jr, { className: `${R.btnIcon} ${R.icon}` }),
            "New ",
            xe
          ]
        }
      ),
      a && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
          onSelect: (ne) => {
            ne.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ A("svg", { className: `${R.btnIcon} ${R.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
          onSelect: (ne) => {
            ne.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ A("svg", { className: `${R.btnIcon} ${R.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      h && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
          onSelect: (ne) => {
            ne.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(yi, { className: `${R.btnIcon} ${R.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Ms({
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
  var Z;
  ks();
  const h = Gr(), f = Fi(), m = Ss(), g = v(!1), x = v(null), b = Wc(), $ = !!b && d !== void 0, E = b && d !== void 0 ? b.isSelected(d) : l, w = t || (b && d !== void 0 ? !b.canToggle(d) : !1), N = () => {
    w || (b && d !== void 0 ? b.toggle(d) : n());
  }, T = fs(N, w), { myIndex: j, highlighted: U, setPointer: R, api: q } = Es({
    label: () => Ns(o),
    activate: N,
    disabled: w,
    group: u,
    itemId: d
  }), { query: k } = Qc(), O = k.trim() !== "" && j < 0, H = Zc(), K = u == null ? void 0 : u.trim(), J = !!K && j >= 0 && (j === 0 || ((Z = q == null ? void 0 : q.items[j - 1]) == null ? void 0 : Z.group) !== K), I = K && b ? ((q == null ? void 0 : q.items) ?? []).filter((le) => le.group === K && le.itemId).map((le) => le.itemId).filter((le) => !b.isDisabled(le)) : [], G = b && I.length > 0 ? b.groupState(I) : "none", Q = r === "danger" ? h.itemDanger : h.itemDefault;
  return /* @__PURE__ */ A(at, { children: [
    J && /* @__PURE__ */ p(
      "div",
      {
        "data-menu-group": K,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${b && I.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: b && I.length > 0 ? /* @__PURE__ */ A("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${K}`,
              onMouseDown: (le) => le.preventDefault(),
              onClick: () => b.toggleGroup(I),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ p(
                Pr,
                {
                  checked: G === "all",
                  indeterminate: G === "some",
                  indicator: b.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: K })
        ] }) : K
      }
    ),
    /* @__PURE__ */ A(
      _e.Item,
      {
        ref: x,
        id: H && j >= 0 ? `${H}-opt-${j}` : void 0,
        "data-ei": j >= 0 ? j : void 0,
        ...$ ? { role: "menuitemcheckbox", "aria-checked": E } : {},
        style: { ...f, display: O ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Q} ${$ ? "" : l ? "ui-item-selected" : ""} ${U ? "ui-item-highlighted" : ""} ${w ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (le) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (T.takeGhost()) {
            le.preventDefault();
            return;
          }
          if (T.suppressSelect()) {
            (s || $) && le.preventDefault();
            return;
          }
          if ($) {
            le.preventDefault(), b && d !== void 0 && b.toggle(d);
            return;
          }
          s && le.preventDefault(), n();
        },
        onClick: T.onClick,
        onPointerDown: T.onPointerDown,
        onPointerUp: T.onPointerUp,
        onPointerCancel: T.onPointerCancel,
        onPointerEnter: () => {
          R(j);
        },
        onTouchStart: () => {
        },
        disabled: w,
        children: [
          $ && /* @__PURE__ */ p(Pr, { checked: E, disabled: w, indicator: b.indicator }),
          e && /* @__PURE__ */ p("span", { className: `${h.icon} shrink-0`, children: e }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ p(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${h.rightAction}`,
              title: c.title,
              onPointerDown: (le) => {
                le.stopPropagation(), le.preventDefault(), g.current = !0, c.onClick();
              },
              onPointerUp: (le) => le.stopPropagation(),
              onClick: (le) => {
                le.stopPropagation(), le.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function na({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s, touchPresentation: l }) {
  const { chain: c, setChain: a, morph: u, keyboardOpened: d, setKeyboardOpened: h } = Xt(Bi), f = c.includes(n), m = l ?? "replace", g = Fe && m === "accordion", x = Fe && m === "replace", b = c[c.length - 1] === n;
  ks();
  const $ = Uc(), E = Yn(), w = v(null), N = v(null), T = v(null), j = v(0), U = v(0), R = v(null), [q, k] = re(f), [O, H] = re(!1), K = !f && q;
  ae(() => {
    f && k(!0);
  }, [f]);
  const J = () => a((L) => {
    const C = L.indexOf(n);
    return C >= 0 ? L.slice(0, C) : L;
  }), I = () => {
    var lt;
    const L = (lt = w.current) == null ? void 0 : lt.ownerDocument;
    if (!L) return;
    let C = 0;
    const ge = () => {
      L.removeEventListener("click", ve, !0), L.removeEventListener("pointerdown", Pe, !0), C && window.clearTimeout(C);
    }, ve = (we) => {
      const He = we.target;
      if (He != null && He.closest('[role="menuitem"]')) {
        ge();
        return;
      }
      we.preventDefault(), we.stopImmediatePropagation(), ge();
    }, Pe = () => ge();
    L.addEventListener("click", ve, !0), L.addEventListener("pointerdown", Pe, !0), C = window.setTimeout(ge, 600);
  }, G = () => {
    if (x && Hn(u)) {
      const L = N.current, C = T.current;
      if (L && C && L.isConnected && C.isConnected) {
        const ge = L.getBoundingClientRect();
        delete C.dataset.submenuOpen, delete C.dataset.submenuInert, L.style.visibility = "hidden", zr(U, C, ge);
      }
    }
    J();
  }, Q = Xr(), Z = Hi(), le = v(Z);
  le.current = Z;
  const M = v(null);
  ae(() => {
    var C;
    const L = {
      label: e,
      activate: () => {
        h(n), a((ge) => ge.includes(n) ? ge : [...ge, n]);
      },
      submenu: !0
    };
    return M.current = L, (C = le.current) == null ? void 0 : C.register(L);
  }, []);
  const ce = Z && M.current ? Z.items.indexOf(M.current) : -1, be = ce >= 0 && ce === Z.highlightedIndex, Se = se(() => {
    const L = w.current;
    if (!L) return null;
    const C = L.getBoundingClientRect();
    return { left: C.left, top: C.top, width: C.width, height: C.height };
  }, []), xe = Ur({
    visible: f,
    /* Replace owns the transition (FLIP via playRectMorph on both edges);
       the generic scale/fade would fight it. Desktop side flyouts keep it. */
    morph: u && !x,
    anchor: Se,
    onClosed: () => k(!1)
  }), ne = v(() => {
  }), ye = v(() => {
  }), ie = v(() => {
  });
  _i(f && b, Q, ne, {
    onCloseSub: () => {
      G(), Z && ce >= 0 && Z.setHighlighted(ce, "keyboard");
    }
  });
  const B = v(d);
  B.current = d, ae(() => {
    f && (B.current === n ? (Q.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var L;
      return (L = N.current) == null ? void 0 : L.focus();
    }), h(null)) : Q.setHighlighted(-1, "keyboard"));
  }, [f]), Wi(f, ye), ji(f, Q, ne, N, !b, ie), ae(() => {
    if (!g || !f) return;
    const L = w.current, C = (L == null ? void 0 : L.closest("[data-submenu-panel]")) ?? (L == null ? void 0 : L.closest('[role="menu"]'));
    if (C)
      return C.dataset.submenuOpen = "accordion", () => {
        delete C.dataset.submenuOpen;
      };
  }, [g, f]);
  const [D, Y] = re(null);
  et(() => {
    if (!f || !Fe || g) {
      Y(null);
      return;
    }
    const L = w.current, C = L == null ? void 0 : L.closest('[role="menu"]');
    if (!L || !C) return;
    T.current = C;
    const ge = L.getBoundingClientRect(), ve = C.getBoundingClientRect(), Pe = parseInt(getComputedStyle(C).zIndex, 10) || 0;
    Y({
      presentation: "replace",
      sideOffset: ve.left - ge.right,
      alignOffset: ve.top - ge.top,
      width: ve.width,
      childZ: Pe + 2
    }), C.dataset.submenuOpen = "replace", N.current && Hn(u) && (N.current.style.visibility = "hidden");
    const lt = window.setTimeout(() => {
      C.isConnected && (C.dataset.submenuInert = "replace");
    }, 320);
    return () => {
      window.clearTimeout(lt), delete C.dataset.submenuOpen, delete C.dataset.submenuInert, T.current === C && (T.current = null);
    };
  }, [f, m]), et(() => {
    if (!f || !x || !D || !O || !Hn(u)) return;
    const L = N.current, C = T.current;
    if (!L || !C) return;
    L.style.visibility = "hidden";
    let ge = 0, ve = 0;
    return ge = requestAnimationFrame(() => {
      ve = requestAnimationFrame(() => {
        if (!L.isConnected || !C.isConnected) return;
        const Pe = C.getBoundingClientRect();
        !Pe.width || !Pe.height || (L.style.visibility = "visible", zr(j, L, Pe));
      });
    }), () => {
      cancelAnimationFrame(ge), cancelAnimationFrame(ve);
    };
  }, [f, x, D, O]), ct.useLayoutEffect(() => {
    var C;
    if (!f || Q.highlightedIndex < 0 || Q.pointerDriven) return;
    const L = (C = N.current) == null ? void 0 : C.querySelector(`[data-ei="${Q.highlightedIndex}"]`);
    sn(L, "nearest", N.current);
  }, [f, Q.highlightedIndex, Q.pointerDriven]);
  const Ie = v(null), Ce = se((L) => {
    var C;
    if (L) {
      L.addEventListener("keydown", ne.current, { capture: !0 }), L.addEventListener("wheel", ye.current, { passive: !1 });
      const ge = L.ownerDocument;
      Ie.current = ge, ge.addEventListener("keydown", ie.current, { capture: !0 });
    } else
      (C = Ie.current) == null || C.removeEventListener("keydown", ie.current, { capture: !0 }), Ie.current = null;
    N.current = L, H(!!L), xe(L);
  }, [xe]), me = We(), je = { padding: `${F(8, 12, me)}px ${F(12, 16, me)}px`, fontSize: F(12, 14, me) }, Ee = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${be ? " ui-item-highlighted" : ""}${K ? " ui-sub-closing" : ""}`, Be = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ A(_e.Sub, { open: f || q, onOpenChange: (L) => a((C) => {
    if (!L) {
      const ge = C.indexOf(n);
      return ge >= 0 ? C.slice(0, ge) : C;
    }
    return C.includes(n) ? C : [...C, n];
  }), children: [
    /* @__PURE__ */ A(
      _e.SubTrigger,
      {
        ref: w,
        "data-ei": ce >= 0 ? ce : void 0,
        "data-submenu-header": Fe ? "true" : void 0,
        style: je,
        className: Ee,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          Z && ce >= 0 && Z.setHighlighted(ce, "pointer");
        },
        onPointerDown: (L) => {
          L.pointerType === "pen" ? (L.preventDefault(), a((C) => f ? C.slice(0, C.indexOf(n)) : [...C, n])) : x && L.pointerType === "touch" && (R.current = { x: L.clientX, y: L.clientY });
        },
        onPointerUp: (L) => {
          if (!x || L.pointerType !== "touch") return;
          const C = R.current;
          R.current = null, !(!C || f) && (Math.hypot(L.clientX - C.x, L.clientY - C.y) > 8 || (h(null), I(), a((ge) => ge.includes(n) ? ge : [...ge, n])));
        },
        onPointerCancel: () => {
          R.current = null;
        },
        onClick: (L) => {
          if (us(L.currentTarget, L)) {
            L.preventDefault();
            return;
          }
          !g || !f || (L.preventDefault(), L.stopPropagation(), G());
        },
        children: [
          i === "left" && /* @__PURE__ */ p(Dr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ A("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ p("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ p(Dr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    g && f && /* The accordion body: rendered INLINE in the parent card, below the
    reordered header row. No portal, no positioning — the card simply
    grows and the panel fades/slides in. */
    /* @__PURE__ */ p("div", { "data-submenu-panel": !0, className: "ui-submenu-panel", children: o }),
    !g && /* @__PURE__ */ p(_e.Portal, { container: E ?? void 0, children: /* @__PURE__ */ p(
      _e.SubContent,
      {
        ref: Ce,
        ...$,
        "data-submenu-presentation": D == null ? void 0 : D.presentation,
        className: Be,
        align: D ? "start" : void 0,
        sideOffset: D ? D.sideOffset : 8,
        alignOffset: D ? D.alignOffset : -4,
        collisionPadding: 8,
        style: D ? { width: D.width, zIndex: D.childZ } : void 0,
        onPointerLeave: Q.pointerLeave,
        onFocusOutside: (L) => {
          const C = L.target;
          C != null && C.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') && L.preventDefault();
        },
        children: /* @__PURE__ */ A(ur.Provider, { value: Q, children: [
          D && /* Back is a NORMAL menu item (same row height/padding as every
          other row), pinned above the scrolling list with the standard
          divider beneath it. It names the immediate parent. */
          /* @__PURE__ */ p(
            "div",
            {
              "data-submenu-back": !0,
              className: "sticky -top-1 z-10 -mx-1 -mt-1 mb-1 shrink-0 border-b border-[color:var(--ui-sep)] bg-[var(--ui-menu-bg)]",
              children: /* @__PURE__ */ p(
                Ms,
                {
                  keepOpen: !0,
                  onClick: G,
                  icon: /* @__PURE__ */ p(Vo, { className: "h-3.5 w-3.5 shrink-0" }),
                  children: e
                }
              )
            }
          ),
          o
        ] })
      }
    ) })
  ] });
}
const Dn = 8, Ph = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Qt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? ms(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = We(), h = F(12, 14, d), f = v(null), m = ar(), [g, x] = re(!1), [b, $] = re([]), [E, w] = re(null), N = Xr();
  ae(() => {
    if (n)
      return N.setHighlighted(-1, "keyboard"), hs(r);
  }, [n, r]);
  const T = v({ left: e, top: t });
  n && (T.current = { left: e, top: t });
  const j = se(() => ({ left: T.current.left, top: T.current.top, width: 0, height: 0 }), []), U = Ur({
    visible: !0,
    morph: l,
    anchor: j,
    cloneOnUnmount: !0
  }), R = v(() => {
  }), q = v(() => {
  }), k = v(() => {
  });
  _i(n, N, R), et(() => {
    if (!n || N.highlightedIndex < 0 || N.pointerDriven) return;
    const I = f.current;
    sn(
      I == null ? void 0 : I.querySelector(`[data-ei="${N.highlightedIndex}"]`),
      "nearest",
      I
    );
  }, [n, N.highlightedIndex, N.pointerDriven]), Wi(n, q), ji(n, N, R, f, b.length > 0, k);
  const O = v(null), H = se((I) => {
    var G;
    if (I) {
      I.addEventListener("keydown", R.current, { capture: !0 }), I.addEventListener("wheel", q.current, { passive: !1 });
      const Q = I.ownerDocument;
      O.current = Q, Q.addEventListener("keydown", k.current, { capture: !0 });
    } else
      (G = O.current) == null || G.removeEventListener("keydown", k.current, { capture: !0 }), O.current = null;
    f.current = I, x(!!I), U(I);
  }, [U]), [K, J] = re(null);
  return et(() => {
    var B;
    if (!n || !g || !f.current) return;
    const I = f.current, G = I.offsetWidth, Q = I.offsetHeight, Z = m ?? null, le = Z ? is(Z) : { x: 0, y: 0, width: 0, height: 0 }, M = Z ? ss(Z.document) : { left: 0, right: 0, top: 0, bottom: 0 }, ce = (B = o == null ? void 0 : o.current) == null ? void 0 : B.getBoundingClientRect(), be = (ce ? ce.right : le.x + le.width) - M.right, Se = (ce ? ce.bottom : le.y + le.height) - M.bottom, xe = (ce ? ce.left : le.x) + M.left, ne = (ce ? ce.top : le.y) + M.top;
    let ye = Math.max(ne + Dn, T.current.top), ie = Math.max(xe + Dn, T.current.left);
    ie + G > be && (ie = Math.max(xe + Dn, be - G - Dn)), ye + Q > Se && (ye = Math.max(ne + Dn, Se - Q - Dn)), J({ left: ie, top: ye });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ A(_e.Root, { open: n, onOpenChange: (I) => {
    I || r();
  }, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: /* @__PURE__ */ p("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ p(_e.Portal, { children: /* @__PURE__ */ p(Li.Provider, { value: u, children: /* @__PURE__ */ p(Oi.Provider, { value: a.attrs, children: /* @__PURE__ */ p(Bi.Provider, { value: { chain: b, setChain: $, morph: l, keyboardOpened: E, setKeyboardOpened: w }, children: /* @__PURE__ */ p(ur.Provider, { value: N, children: /* @__PURE__ */ p(
      _e.Content,
      {
        ref: H,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: {
          fontSize: h,
          left: (K == null ? void 0 : K.left) ?? T.current.left,
          top: (K == null ? void 0 : K.top) ?? T.current.top,
          touchAction: "manipulation"
        },
        onPointerLeave: N.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, Lh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = We(), c = { padding: `${F(8, 12, l)}px ${F(12, 16, l)}px`, fontSize: F(12, 14, l) }, a = Hi(), u = v(a);
  u.current = a;
  const d = v(null), h = ds();
  ae(() => {
    var x;
    const g = { label: Ns(s), activate: () => {
      r || n();
    } };
    return d.current = g, (x = u.current) == null ? void 0 : x.register(g);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, m = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ A(
    _e.Item,
    {
      "data-ei": f >= 0 ? f : void 0,
      onClick: (g) => {
        if (!r) {
          if (h.takeGhost()) {
            g.preventDefault();
            return;
          }
          n();
        }
      },
      onPointerEnter: () => {
        !r && a && f >= 0 && a.setHighlighted(f, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: c,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${m ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Oh = () => /* @__PURE__ */ p(_e.Separator, { className: "ui-sep my-1" }), Fh = (n) => /* @__PURE__ */ p(na, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Oe = 8, Rs = "[data-modal-stack]", Mr = 0.94;
function $n() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function fn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function ra(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Mr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${kt}ms ${xn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, kt + 60));
    });
  });
}
function ho(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Mr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Mr, height: i.height * Mr };
  e.style.transition = `transform ${kt}ms ${xn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ts(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, kt + 60);
}
function si(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Rs) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function xr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Rs) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function ia({
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
  theme: h,
  surface: f,
  accent: m
}) {
  const g = Qt(), x = $i(
    { mode: h, accent: m, surface: f, context: "surface" },
    g
  ), b = x.mode, $ = x.surface, E = x.accent, w = v(null), N = v(null), T = v(null), j = We(), U = F(20, 24, j), R = F(10, 12, j), q = F(12, 14, j), k = F(14, 16, j), O = F(20, 24, j), H = F(20, 24, j), K = F(20, 24, j), J = F(14, 16, j), I = F(16, 20, j), G = F(10, 12, j), Q = F(12, 14, j), Z = F(8, 10, j), le = F(4, 6, j), M = { padding: `${R}px ${U}px` }, ce = { fontSize: q }, be = { padding: `${H}px ${O}px 16px ${O}px` }, Se = { fontSize: k }, xe = { padding: `0 ${O}px 16px` }, ne = { padding: `${K}px ${O}px` }, ye = { fontSize: G, padding: `${le}px ${Z}px` }, [ie, B] = re(!1), D = se((S) => {
    w.current = S, B(S !== null);
  }, []), Y = Yn(), Ie = ar(), Ce = v(Ie);
  Ce.current = Ie;
  const [me, je] = re(null), Ee = v(null), Be = v(!1), L = v(!1), C = v(0), ge = v({ w: 0, h: 0 }), ve = v(!1), [Pe, lt] = re(!1), [we, He] = re(!1), mt = v(0), ze = v(!1), [Zt, Kt] = re(!1), Bt = v(c);
  Bt.current = c;
  const Et = v(!1), Ae = v(!1), Ve = () => {
    Ae.current = !0, lt(!0);
  }, gt = () => {
    Ae.current = !1, lt(!1);
  };
  ae(() => {
    n || (je(null), ve.current = !1, Be.current = !1, He(!1));
  }, [n]), et(() => {
    if (!n || ve.current || !ie || !w.current) return;
    ve.current = !0;
    const S = w.current.getBoundingClientRect(), ee = Ce.current ?? null, ue = (ee == null ? void 0 : ee.innerWidth) ?? 0, oe = fn(ee);
    je({
      left: Math.max(Oe, Math.min((ue - S.width) / 2, ue - S.width - Oe)),
      top: Math.max(oe.top + Oe, Math.min(oe.top + (oe.height - S.height) / 2, oe.bottom - S.height - Oe))
    });
  }, [n, ie]), et(() => {
    if (!n || !ie || !c || $n() || !w.current) return;
    const S = w.current, ee = si(S), ue = ee[ee.length - 1];
    Ve(), ue ? zr(mt, S, ue.getBoundingClientRect(), gt) : ra(mt, S, gt);
  }, [n, ie]);
  const At = se(() => {
    if (!u || ze.current) return;
    const S = w.current, ee = !!S && si(S).length > 0;
    if (!S || !c || $n() || ee) {
      e();
      return;
    }
    ze.current = !0, Kt(!0), Et.current = !0, Ve(), ho(mt, S, () => {
      ze.current = !1, Kt(!1), gt(), e();
    });
  }, [c, e, u]), tt = se(() => {
    const S = w.current;
    if (!S || Et.current || !Bt.current || $n() || si(S).length > 0) return;
    const ee = S.ownerDocument, ue = S.cloneNode(!0);
    ue.removeAttribute("data-modal-stack"), ue.removeAttribute("data-state"), ue.removeAttribute("role"), ue.removeAttribute("data-aria-hidden"), ue.removeAttribute("tabindex"), ue.setAttribute("aria-hidden", "true"), ue.style.pointerEvents = "none", ee.body.appendChild(ue), ho({ current: 0 }, ue, () => {
      ue.isConnected && ue.remove();
    });
  }, []);
  et(() => () => tt(), [tt]);
  const Dt = v(n);
  et(() => {
    const S = Dt.current;
    Dt.current = n, S && !n && tt();
  }, [n, ie, tt]), ae(() => {
    if (!n || !ie || !c || !w.current) return;
    const S = w.current, ee = S.parentNode;
    if (!ee) return;
    let ue = 0, oe = null, Ne = !1;
    const De = () => {
      ue = 0;
      const $e = xr(S);
      if ($e.length > 0)
        S.style.opacity = "", S.style.pointerEvents = "", oe = $e[$e.length - 1].getBoundingClientRect(), Ne = !0, ue = requestAnimationFrame(De);
      else if (Ne) {
        Ne = !1, oe && !$n() && (Ve(), zr(mt, S, oe, gt)), oe = null;
        const Re = Ce.current ?? null;
        Re == null || Re.setTimeout(() => {
          !S || !S.isConnected || getComputedStyle(S).opacity !== "1" && (S.style.opacity = "1", S.style.pointerEvents = "");
        }, 240);
      }
    }, Je = new MutationObserver(() => {
      !ue && xr(S).length > 0 && (ue = requestAnimationFrame(De));
    });
    return Je.observe(ee, { childList: !0 }), () => {
      Je.disconnect(), ue && cancelAnimationFrame(ue);
    };
  }, [n, ie]), ae(() => {
    if (!ie || !c || $n() || !w.current) return;
    const S = w.current;
    let ee = Math.round(S.getBoundingClientRect().height), ue = !1;
    const oe = new ResizeObserver(() => {
      if (!S.isConnected) return;
      const Ne = Math.round(S.getBoundingClientRect().height);
      if (!ue) {
        ue = !0, ee = Ne;
        return;
      }
      if (Math.abs(Ne - ee) < 1) return;
      if (Ee.current || ze.current || xr(S).length > 0) {
        ee = Ne;
        return;
      }
      if (Ae.current) return;
      const De = ee;
      ee = Ne, Ve();
      const Je = S.getBoundingClientRect(), $e = fn(Ce.current ?? null), Re = !Be.current && !L.current, ft = Re ? $e.top + ($e.height - De) / 2 : Je.top, it = Re ? $e.top + ($e.height - Ne) / 2 : Je.top;
      S.style.transition = "none", S.style.height = `${De}px`, Re && (S.style.top = `${ft}px`), N.current && (N.current.style.overflow = "hidden"), S.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          S.style.height === `${De}px` && (S.style.transition = `height ${kt}ms ${xn}${Re ? `, top ${kt}ms ${xn}` : ""}`, S.style.height = `${Ne}px`, Re && (S.style.top = `${it}px`), window.setTimeout(() => {
            S.style.height === `${Ne}px` && (S.style.transition = "", S.style.height = "", N.current && (N.current.style.overflow = ""), Re && je({ left: Je.left, top: it }), gt());
          }, kt + 60));
        });
      });
    });
    return oe.observe(S), () => oe.disconnect();
  }, [ie]), ae(() => {
    if (!ie || !w.current || c && !$n()) return;
    const S = w.current, ee = new ResizeObserver(() => {
      if (!S.isConnected || Ee.current || ze.current || L.current || xr(S).length > 0) return;
      const ue = Ce.current ?? null, oe = fn(ue), Ne = (ue == null ? void 0 : ue.innerWidth) ?? 0, De = S.getBoundingClientRect(), Je = Math.max(oe.top + Oe, Math.min(De.top, oe.bottom - De.height - Oe)), $e = Math.max(Oe, Math.min(De.left, Ne - De.width - Oe));
      (Math.abs(Je - De.top) > 0.5 || Math.abs($e - De.left) > 0.5) && je({ left: $e, top: Je });
    });
    return ee.observe(S), () => ee.disconnect();
  }, [ie, c]);
  const qe = se(() => {
    const S = w.current;
    if (!S) return null;
    const ee = S.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), nt = se((S, ee) => {
    const ue = Ce.current ?? null, oe = (ue == null ? void 0 : ue.innerWidth) ?? 0, Ne = fn(ue), De = qe(), Je = De ? De.width : Math.min(oe - Oe * 2, 576), $e = De ? De.height : Math.min(Ne.height - Oe * 2, 400);
    return {
      left: Math.max(Oe, Math.min(S, oe - Je - Oe)),
      top: Math.max(Ne.top + Oe, Math.min(ee, Ne.bottom - $e - Oe))
    };
  }, [qe]);
  ae(() => {
    if (!n) return;
    const S = Ce.current ?? null, ee = (S == null ? void 0 : S.visualViewport) ?? null;
    if (!S || !ee) return;
    const ue = 120;
    L.current = !1, ge.current = { w: S.innerWidth, h: S.innerHeight };
    let oe = 0;
    const Ne = () => {
      if (ze.current || Ee.current) return;
      const Je = (S == null ? void 0 : S.innerHeight) ?? 0, $e = (S == null ? void 0 : S.innerWidth) ?? 0, ft = fn(S).height < Je - ue, it = Je < ge.current.h - ue && $e === ge.current.w;
      ft || it ? (L.current = !0, C.current && (clearTimeout(C.current), C.current = 0)) : C.current || (C.current = (S == null ? void 0 : S.setTimeout(() => {
        L.current = !1, C.current = 0, He(!1);
      }, 600)) ?? 0), He(L.current), !oe && (oe = requestAnimationFrame(() => {
        var Rn;
        oe = 0;
        const It = w.current;
        if (!It) return;
        const xt = fn(Ce.current ?? null), Le = It.getBoundingClientRect(), Ut = ((Rn = Ce.current) == null ? void 0 : Rn.innerWidth) ?? 0, en = (S == null ? void 0 : S.innerHeight) ?? 0, vn = xt.height < en - ue || en < ge.current.h - ue && (S == null ? void 0 : S.innerWidth) === ge.current.w;
        ge.current = { w: (S == null ? void 0 : S.innerWidth) ?? 0, h: en };
        const Me = Le.top >= xt.top + Oe && Le.bottom <= xt.bottom - Oe, cn = () => {
          je({
            left: Math.max(Oe, Math.min((Ut - Le.width) / 2, Ut - Le.width - Oe)),
            top: Math.max(xt.top + Oe, Math.min(xt.top + (xt.height - Le.height) / 2, xt.bottom - Le.height - Oe))
          });
        };
        if (vn && !Fe) {
          if (Be.current) {
            Me || je(nt(Le.left, Le.top));
            return;
          }
          if (Me) return;
          cn();
          return;
        }
        if (!L.current) {
          if (Be.current) {
            Me || je(nt(Le.left, Le.top));
            return;
          }
          Me || cn();
        }
      }));
    };
    ee.addEventListener("resize", Ne), ee.addEventListener("scroll", Ne);
    const De = () => {
      ze.current || Ee.current || oe || (oe = requestAnimationFrame(() => {
        oe = 0;
        const Je = w.current;
        if (!Je) return;
        const $e = Ce.current ?? null, Re = fn($e), ft = ($e == null ? void 0 : $e.innerWidth) ?? 0, it = Je.getBoundingClientRect();
        if (Be.current) {
          je(nt(it.left, it.top));
          return;
        }
        je({
          left: Math.max(Oe, Math.min((ft - it.width) / 2, ft - it.width - Oe)),
          top: Math.max(Re.top + Oe, Math.min(Re.top + (Re.height - it.height) / 2, Re.bottom - it.height - Oe))
        });
      }));
    };
    return S.addEventListener("orientationchange", De), () => {
      ee.removeEventListener("resize", Ne), ee.removeEventListener("scroll", Ne), S.removeEventListener("orientationchange", De), oe && cancelAnimationFrame(oe), C.current && clearTimeout(C.current);
    };
  }, [n, nt]);
  const $t = se((S) => {
    if (S.target.closest("button")) return;
    Be.current = !0;
    const ee = qe();
    ee && (je(nt(ee.left, ee.top)), Ee.current = { startX: S.clientX, startY: S.clientY, posX: ee.left, posY: ee.top }, S.target.setPointerCapture(S.pointerId));
  }, [qe, nt]), yt = se((S) => {
    const ee = Ee.current;
    ee && (S.preventDefault(), je(nt(ee.posX + S.clientX - ee.startX, ee.posY + S.clientY - ee.startY)));
  }, [nt]), Mt = se(() => {
    Ee.current = null;
  }, []), Ht = Ee.current !== null, Ke = se(() => {
    Be.current = !1;
    const S = Ce.current ?? null, ee = fn(S), ue = (S == null ? void 0 : S.innerWidth) ?? 0, oe = w.current, Ne = oe ? oe.getBoundingClientRect() : { width: 0, height: 0 };
    je({
      left: Math.max(Oe, Math.min((ue - Ne.width) / 2, ue - Ne.width - Oe)),
      top: Math.max(ee.top + Oe, Math.min(ee.top + (ee.height - Ne.height) / 2, ee.bottom - Ne.height - Oe))
    });
  }, []), z = v(0), V = se(() => {
    const S = Date.now();
    S - z.current < 300 ? (z.current = 0, Ke()) : z.current = S;
  }, [Ke]), pe = me !== null, Xe = pe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", rt = `${i ? `${i} w-full` : "max-w-xl w-full"}`, St = {
    ...pe ? { left: me.left, top: me.top } : {},
    width: `min(100%, calc(100dvw - ${Oe * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...we ? {} : { maxHeight: `calc(100dvh - ${Oe * 2}px)` }
  }, Rt = se((S) => {
    if (S.key !== "Enter" || S.shiftKey || S.metaKey || S.ctrlKey || S.altKey) return;
    const ee = S.target, ue = T.current;
    if (!(!!ee.closest("[data-modal-close]") || !!ue && ue.contains(ee) && !!ee.closest('button, a, [role="button"]')) && ee.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ue) return;
    const Ne = Array.from(ue.querySelectorAll("button[data-modal-confirm]")), De = Ne.length > 0 ? Ne : Array.from(ue.querySelectorAll("button")), Je = De[De.length - 1];
    !Je || Je.disabled || (S.preventDefault(), Je.click());
  }, []);
  return /* @__PURE__ */ p(zi, { theme: x, children: /* @__PURE__ */ p(dn.Root, { open: n, onOpenChange: (S) => {
    S || At();
  }, children: /* @__PURE__ */ A(dn.Portal, { container: Y ?? void 0, children: [
    /* @__PURE__ */ p(
      dn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Zt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (S) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (S.preventDefault(), d && At());
        }
      }
    ),
    /* @__PURE__ */ A(
      dn.Content,
      {
        ref: D,
        onKeyDown: Rt,
        onInteractOutside: (S) => {
          d || S.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": b,
        "data-accent": E,
        "data-surface": $,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Xe} ${rt}`,
        style: { touchAction: "manipulation", colorScheme: b, ...Object.keys(St).length > 0 ? St : {} },
        children: [
          a ? /* @__PURE__ */ A(
            "div",
            {
              style: be,
              className: `flex items-center justify-between ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Pe || $t(S);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: V,
              children: [
                /* @__PURE__ */ p(dn.Title, { style: Se, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ p(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Cn, { style: { width: I, height: I } }) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "div",
            {
              style: M,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Pe || $t(S);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: V,
              children: [
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ p(dn.Title, { style: ce, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ A("button", { onClick: l, style: ye, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ p(Jo, { style: { width: Q, height: Q } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ p(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Cn, { style: { width: J, height: J } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p("div", { ref: N, "data-testid": "modal-body", style: a ? xe : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ p("div", { ref: T, style: a ? ne : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Bh({ children: n }) {
  const e = We(), t = F(20, 24, e), r = F(8, 12, e);
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const oa = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", sa = {
  zinc: "bg-[var(--ui-btn-solid-bg)] text-[color:var(--ui-btn-solid-text)] font-semibold border border-[color:var(--ui-btn-solid-border)] hover:bg-[var(--ui-btn-solid-hover-bg)] hover:border-[color:var(--ui-btn-solid-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, la = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function br({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = gn({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ p(
    "button",
    {
      type: r,
      style: o,
      className: `${oa} ${n === "hero" ? sa[e] : la[n]} ${t}`,
      ...i
    }
  );
}
function Lr(n = "md") {
  const e = Fe && Xo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function Is(n = "md") {
  return n === "sm" ? gn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : gn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const As = Gt(null);
function Hh() {
  const n = Xt(As);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function _h({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = re(null), [s, l] = re(!1), c = v(null), a = We(), u = F(16, 20, a), d = F(12, 14, a), h = Is(), f = v(i);
  f.current = i;
  const m = se(() => {
    const N = f.current;
    N && (N.kind === "confirm" ? N.resolve(!1) : N.kind === "prompt" ? N.resolve(null) : N.resolve());
  }, []), g = se((N) => {
    if (N.suppressKey) {
      const T = localStorage.getItem(N.suppressKey);
      if (T && Date.now() < parseInt(T, 10))
        return Promise.resolve(!0);
    }
    return new Promise((T) => {
      m(), l(!1), o({ kind: "confirm", options: N, resolve: T });
    });
  }, [m]), x = se((N) => new Promise((T) => {
    m(), o({ kind: "prompt", options: N, resolve: T });
  }), [m]), b = se((N) => new Promise((T) => {
    m(), o({ kind: "alert", options: N, resolve: T });
  }), [m]);
  ae(() => {
    if (i) {
      const N = setTimeout(() => {
        var T;
        return (T = c.current) == null ? void 0 : T.focus();
      }, 50);
      return () => clearTimeout(N);
    }
  }, [i]);
  const $ = se(() => {
    var N, T;
    if (i) {
      if (i.kind === "confirm") {
        const j = i.options;
        j.suppressKey && s && localStorage.setItem(j.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((T = (N = c.current) == null ? void 0 : N.value) == null ? void 0 : T.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), E = i !== null;
  ae(() => {
    if (!E) return;
    const N = (T) => {
      T.key !== "Enter" || T.shiftKey || T.metaKey || T.ctrlKey || T.altKey || T.isComposing || (T.preventDefault(), T.stopImmediatePropagation(), $());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [E, $]);
  const w = se(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ A(As.Provider, { value: { confirm: g, prompt: x, alert: b }, children: [
    n,
    E && /* @__PURE__ */ p(
      ia,
      {
        open: !0,
        onClose: w,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ A(at, { children: [
          i.kind !== "alert" && /* @__PURE__ */ p(br, { variant: "ghost", onClick: w, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ p(br, { onClick: $, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ p(
            br,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: $,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ p(br, { "data-modal-confirm": !0, onClick: $, children: "Save" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ p("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ p(
            qc,
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
              ref: c,
              type: "text",
              defaultValue: i.options.defaultValue || "",
              placeholder: i.options.placeholder,
              style: h,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const ca = 500, aa = 250, ua = 5, _t = 88, po = 4;
function da(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function fa({ x: n, y: e, ms: t }) {
  const r = v(null), i = Yn();
  return ae(() => {
    r.current && da(r.current, t);
  }, [t]), Vr(
    /* @__PURE__ */ p(
      "div",
      {
        style: {
          position: "fixed",
          left: n - _t / 2,
          top: e - _t / 2,
          width: _t,
          height: _t,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ A("svg", { ref: r, width: _t, height: _t, viewBox: `0 0 ${_t} ${_t}`, children: [
          /* @__PURE__ */ p(
            "circle",
            {
              cx: _t / 2,
              cy: _t / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: po + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ p(
            "circle",
            {
              cx: _t / 2,
              cy: _t / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: po,
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
function jh() {
  return { "data-no-longpress": "true" };
}
function ha(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Wh({
  children: n,
  showRing: e = !0,
  longPressMs: t = ca,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = re(null), c = Ii(), a = v(null), u = v(null), d = v({ x: 0, y: 0, target: null }), h = v(!1), f = Math.min(aa, t * 0.5), m = v(i);
  m.current = i;
  const g = v(o);
  return g.current = o, ae(() => {
    if (!Fe || !c) return;
    const x = (w) => {
      if (!xi(w.pointerType) || w.button !== 0) return;
      const N = w.target;
      if (!N.closest(r) || (m.current ? !m.current(N) : ha(N))) return;
      const T = w.clientX, j = w.clientY;
      d.current = { x: T, y: j, target: w.target }, h.current = !0, e && (u.current = setTimeout(() => l({ x: T, y: j }), f)), a.current = setTimeout(() => {
        if (!h.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const U = d.current.target;
        if (!U) return;
        const R = g.current;
        if (R) {
          R(U, T, j);
          return;
        }
        const q = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: T,
          clientY: j,
          button: 2,
          view: window
        });
        U.dispatchEvent(q);
      }, t);
    }, b = (w) => {
      if (!h.current || a.current === null) return;
      const N = w.clientX - d.current.x, T = w.clientY - d.current.y;
      Math.sqrt(N * N + T * T) > ua && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), h.current = !1, l(null));
    }, $ = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), h.current = !1, l(null);
    }, E = (w) => {
      xi(w.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), h.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", x), c.addEventListener("pointermove", b), c.addEventListener("pointerup", $), c.addEventListener("pointercancel", $), c.addEventListener("pointerleave", E), () => {
      c.removeEventListener("pointerdown", x), c.removeEventListener("pointermove", b), c.removeEventListener("pointerup", $), c == null || c.removeEventListener("pointercancel", $), c == null || c.removeEventListener("pointerleave", E), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, f, r]), /* @__PURE__ */ A(at, { children: [
    n,
    e && s && /* @__PURE__ */ p(fa, { x: s.x, y: s.y, ms: t - f })
  ] });
}
function qh() {
  const n = Mc();
  return Ec ? n === null || xi(n) : !1;
}
const pa = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, ma = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, ga = {
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
        ...e ? ga : n ? ma : pa,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ya = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], xa = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], li = 1900, ci = 2100;
function ba(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function va(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Jh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Qt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const D = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(D.getTime()) ? c : D;
  })(), [u, d] = re(a.getFullYear()), [h, f] = re(a.getMonth()), [m, g] = re("days"), [x, b] = re(null), $ = ot(() => new Set(n), [n]), E = (D) => {
    $.has(D) ? e(n.filter((Y) => Y !== D)) : e([...n, D]);
  }, w = ot(() => {
    const D = ba(u, h), Y = new Date(u, h, 1).getDay(), Ie = [];
    for (let Ce = 0; Ce < Y; Ce++) Ie.push({ key: `pad-${Ce}`, day: 0, empty: !0 });
    for (let Ce = 1; Ce <= D; Ce++) Ie.push({ key: va(u, h, Ce), day: Ce, empty: !1 });
    return Ie;
  }, [u, h]), N = (D) => d((Y) => Math.max(li, Math.min(ci, Y + D))), T = (D) => {
    h + D < 0 ? (d((Y) => Math.max(li, Y - 1)), f(11)) : h + D > 11 ? (d((Y) => Math.min(ci, Y + 1)), f(0)) : f((Y) => Y + D);
  }, j = () => {
    if (x === null) return;
    const D = parseInt(x, 10);
    !isNaN(D) && D >= li && D <= ci && d(D), b(null);
  }, U = (D) => n.some((Y) => Y.startsWith(`${u}-${String(D + 1).padStart(2, "0")}`)), R = We(), q = F(4, 8, R), k = F(16, 20, R), O = F(10, 11, R), H = F(6, 8, R), K = F(12, 14, R), J = F(6, 10, R), I = F(12, 14, R), G = F(8, 12, R), Q = F(10, 12, R), Z = F(6, 10, R), le = F(2, 6, R), M = F(64, 80, R), ce = { padding: q }, be = { width: k, height: k }, Se = { fontSize: O, paddingTop: H, paddingBottom: H }, xe = { fontSize: K, paddingTop: J, paddingBottom: J }, ne = { fontSize: I, paddingTop: G, paddingBottom: G }, ye = { fontSize: Q, padding: `${le}px ${Z}px` }, ie = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", B = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ A("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(-1) : T(-1),
          style: ce,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ p(Vo, { style: be })
        }
      ),
      m === "days" ? /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, h).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ p(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: x ?? String(u),
          onChange: (D) => b(D.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (D) => D.target.select(),
          onBlur: j,
          onKeyDown: (D) => {
            D.key === "Enter" && (D.preventDefault(), j()), D.key === "Escape" && b(null);
          },
          style: { width: M },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(1) : T(1),
          style: ce,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ p(Dr, { style: be })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-3 text-center", children: xa.map((D, Y) => /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => {
            f(Y), g("days");
          },
          style: ne,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${Y === h ? ie : B}`,
          children: [
            D,
            U(Y) && /* @__PURE__ */ p("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${Y === h ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        D
      )) }),
      /* @__PURE__ */ p("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), f(c.getMonth()), g("days");
          },
          style: { paddingTop: J, paddingBottom: J, fontSize: K },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ A("div", { className: "grid grid-cols-7 text-center", children: [
      ya.map((D) => /* @__PURE__ */ p("div", { style: Se, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: D }, D)),
      w.map((D) => D.empty ? /* @__PURE__ */ p("div", {}, D.key) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => E(D.key),
          style: xe,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${$.has(D.key) ? ie : B}`,
          children: D.day
        },
        D.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ A("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ A("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ p("div", { className: "flex flex-wrap gap-1", children: n.map((D) => {
        const Y = /* @__PURE__ */ new Date(D + "T00:00:00"), Ie = Y.getFullYear() === c.getFullYear() ? Y.toLocaleString("default", { month: "short", day: "numeric" }) : Y.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            onClick: () => E(D),
            "aria-label": `Remove ${Ie}`,
            style: ye,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Ie,
              /* @__PURE__ */ p("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          D
        );
      }) })
    ] })
  ] });
}
function Vh({
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
  className: h = ""
}) {
  const f = (w) => e instanceof Set ? e.has(w) : e.includes(w), m = We(), g = F(12, 16, m), x = F(8, 12, m), b = F(12, 14, m), $ = F(16, 20, m), E = r != null || i != null;
  return /* @__PURE__ */ A("div", { className: h, ...d ? { "data-theme": d } : {}, children: [
    E && /* @__PURE__ */ A("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ p("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((w) => {
            const N = f(w.id), T = /* @__PURE__ */ p(Pi, { checked: N, size: $ });
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(w.id),
                "aria-pressed": N,
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${x}px ${g}px`, fontSize: b },
                ...w.dataProps,
                children: [
                  u === "leading" && T,
                  w.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: w.secondary }),
                  u === "trailing" && /* @__PURE__ */ p("span", { className: "ml-auto flex shrink-0", children: T })
                ]
              },
              w.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ p("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function Yh({
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
  const u = We(), d = s ? 10 : F(12, 16, u), h = s ? 6 : F(8, 12, u), f = s ? 12 : F(12, 14, u), m = s ? 14 : F(16, 20, u);
  return /* @__PURE__ */ A("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ p("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const x = e === g.id;
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${x ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${h}px ${d}px`, fontSize: f },
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
const Uh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = ar(), { refs: l, floatingStyles: c } = sc({
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
          var $;
          if (i !== "visible") return {};
          const u = ($ = a.elements.floating.ownerDocument) == null ? void 0 : $.defaultView;
          if (!u) return {};
          const d = a.rects.reference, h = Math.max(d.x, 0), f = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= h || g <= f) return {};
          const x = r === "left" ? m - (d.x + d.width) : r === "right" ? h - d.x : 0, b = r === "top" ? f - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + x, y: a.y + b };
        }
      },
      Yo(o),
      Uo({ padding: 8 }),
      Go({ padding: 8 }),
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
          const d = a.rects.floating.width, h = a.rects.floating.height, f = Math.max(8, Math.min(a.x, u.innerWidth - d - 8)), m = Math.max(8, Math.min(a.y, u.innerHeight - h - 8));
          return { x: f, y: m };
        }
      }
    ],
    whileElementsMounted: lc
  });
  return et(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ A(at, { children: [
    !t && /* @__PURE__ */ p("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Vr(
      /* @__PURE__ */ p(
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
function wa(n, e) {
  if (!e || !ct.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Pn = ({ content: n, children: e }) => {
  const t = Qt(), r = We(), i = F(10, 12, r), o = F(6, 6, r), s = F(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Yn(), a = ar(), [u, d] = re(!1), [h, f] = re({ x: 0, y: 0 }), m = v(null), g = v(null), x = () => {
    if (!m.current) return;
    const E = m.current.getBoundingClientRect();
    f({ x: E.left + E.width / 2, y: E.top });
  };
  ae(() => () => {
    g.current && clearTimeout(g.current);
  }, []), ae(() => (u && a && (x(), a.addEventListener("scroll", x, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", x, !0)), [u]), ae(() => {
    var N;
    if (!u) return;
    const E = ((N = m.current) == null ? void 0 : N.ownerDocument) ?? document, w = (T) => {
      m.current && !m.current.contains(T.target) && d(!1);
    };
    return E.addEventListener("pointerdown", w, !0), () => E.removeEventListener("pointerdown", w, !0);
  }, [u]);
  const b = wa(e, n), $ = Object.keys(b).length > 0 ? ct.cloneElement(e, b) : e;
  return /* @__PURE__ */ A(
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
        $,
        u && Vr(
          /* @__PURE__ */ A(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: h.x, top: h.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((E, w) => /* @__PURE__ */ p("div", { className: w > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: E }, w)),
                /* @__PURE__ */ p("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, ka = 250;
function Sa(n, e, t) {
  const [r, i] = ct.useState(null), [o, s] = ct.useState(!1), l = ct.useRef(null), c = ct.useRef(t);
  c.current = t;
  const a = ct.useCallback(() => {
    var h;
    const d = (h = e.current) == null ? void 0 : h[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  ct.useLayoutEffect(() => {
    a();
  }, [t, a]), ct.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const h = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), ka), a();
    }, f = new ResizeObserver(h);
    f.observe(d);
    for (const m of e.current ?? []) m && f.observe(m);
    return () => {
      f.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, a]);
  const u = ct.useMemo(
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
function Zr() {
  const n = We(), e = Fe, t = e ? F(28, 40, n) : 28, r = e ? F(28, 40, n) : 28, i = e ? F(10, 14, n) : 10, o = e ? F(10, 14, n) : 10, s = e ? F(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Gh = Fe ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Na = Fe ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", vr = Fe ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ca = "hover:bg-red-950/50", Xh = Fe ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Qh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Zh = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ta = Fe ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", ep = Fe ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", Ds = Fe ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ea = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", Ma = Fe ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", wr = ({ onClick: n, disabled: e, title: t, className: r = Na, children: i }) => {
  const o = Zr();
  return /* @__PURE__ */ p(Pn, { content: t, children: /* @__PURE__ */ p("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, kr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, tp = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: h }) => {
  const f = Qt(), m = c ?? Oc(f), g = c === "blue" || c === "emerald" ? c : (f == null ? void 0 : f.accent) ?? "zinc", x = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, b = Zr(), $ = We(), E = s && !Fe ? 24 : b.control.height, w = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), N = Fe ? w : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, T = (k) => i ? i(k) : n === k, j = ct.useRef(null), U = ct.useRef([]), R = Math.max(0, e.findIndex((k) => T(k.v))), q = Sa(j, U, R);
  return l === "track" ? /* @__PURE__ */ A(
    "div",
    {
      ref: j,
      role: a ? "tablist" : "group",
      "aria-label": h,
      ...x,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${Fe ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${kr.wrap}`,
      children: [
        q.style && /* @__PURE__ */ p(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${kr.pill} ${q.motionClass}`,
            style: { ...q.style, top: 2, bottom: 2 }
          }
        ),
        e.map((k, O) => {
          const H = T(k.v), K = u && !!k.icon;
          return /* @__PURE__ */ p(
            "button",
            {
              ref: (J) => {
                U.current[O] = J;
              },
              ...k.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(k.v),
              title: k.title,
              role: a ? "tab" : void 0,
              "aria-selected": a ? H : void 0,
              "aria-pressed": a ? void 0 : H,
              "aria-label": k.ariaLabel ?? (k.l ? void 0 : k.title),
              style: N,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${K ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${H ? kr.active : kr.idle}`,
              children: /* @__PURE__ */ p(
                vs,
                {
                  icon: k.icon,
                  collapse: K,
                  iconWithLabel: d,
                  active: H,
                  gap: F(6, 8, $),
                  children: k.l
                }
              )
            },
            k.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ A("div", { ref: j, className: `relative ${Ea} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    q.style && /* @__PURE__ */ p(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${q.motionClass}`,
        style: { ...q.style, top: 0, bottom: 0 }
      }
    ),
    e.map((k, O) => {
      const H = T(k.v);
      return /* @__PURE__ */ A(
        "button",
        {
          ref: (K) => {
            U.current[O] = K;
          },
          ...k.dataProps,
          disabled: r,
          onClick: () => t(k.v),
          title: k.title,
          style: { ...b.control, height: E },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${H ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${k.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            k.icon,
            k.l
          ]
        },
        k.v
      );
    })
  ] });
}, np = ({ children: n }) => /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ p("span", { className: Fe ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ p("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Ra = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Ia = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", rp = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ A("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ p("span", { className: t ? Ra : Ia, children: n }),
  e
] }), ip = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ p("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), op = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ A("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ p(wr, { onClick: () => r(-1), disabled: n, title: "Move up", className: vr, children: /* @__PURE__ */ p(Gl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(wr, { onClick: () => r(1), disabled: n, title: "Move down", className: vr, children: /* @__PURE__ */ p(Xl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(wr, { onClick: e, disabled: n, title: "Duplicate", className: vr, children: /* @__PURE__ */ p(Ko, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p("div", { className: Ds }),
    /* @__PURE__ */ p(wr, { onClick: t, disabled: n, title: "Delete", className: `${vr} ${Ca}`, children: /* @__PURE__ */ p(yi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var mo = Object.defineProperty, Aa = (n, e) => {
  let t = {};
  for (var r in n) mo(t, r, {
    get: n[r],
    enumerable: !0
  });
  return mo(t, Symbol.toStringTag, { value: "Module" }), t;
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
function $s(n, e, t) {
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
      return c && c < s.length && c < l.length && Ls(s.charCodeAt(c - 1)) && Ps(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = $s(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function zs(n, e, t, r) {
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
      let a = s.text, u = l.text, d = a.length, h = u.length;
      for (; d > 0 && h > 0 && a[d - 1] == u[h - 1]; )
        d--, h--, t--, r--;
      return d && h && d < a.length && Ls(a.charCodeAt(d - 1)) && Ps(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = zs(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function Ps(n) {
  return n >= 56320 && n < 57344;
}
function Ls(n) {
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
    return $s(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return zs(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Sr(0, e);
    if (e == this.size)
      return Sr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Sr(t + 1, o) : Sr(t, r);
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
const ai = { index: 0, offset: 0 };
function Sr(n, e) {
  return ai.index = n, ai.offset = e, ai;
}
function Or(n, e) {
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
      if (!Or(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Or(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ue = class wi {
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
    return this == e || this.type == e.type && Or(this.attrs, e.attrs);
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
Ue.none = [];
class rr extends Error {
}
class de {
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
    let r = Fs(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new de(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new de(Os(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return de.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new de(W.fromJSON(e, t.content), r, i);
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
    return new de(e, r, i);
  }
}
de.empty = new de(W.empty, 0, 0);
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
function Fs(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Fs(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function Da(n, e, t) {
  if (t.openStart > n.depth)
    throw new rr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new rr("Inconsistent open depths");
  return Bs(n, e, t, 0);
}
function Bs(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Bs(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Nn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = $a(t, n);
      return Nn(o, _s(n, s, l, e, r));
    }
  else return Nn(o, Fr(n, e, r));
}
function Hs(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new rr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function ki(n, e, t) {
  let r = n.node(t);
  return Hs(r, e.node(t)), r;
}
function Sn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function er(n, e, t, r) {
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
function _s(n, e, t, r, i) {
  let o = n.depth > i && ki(n, e, i + 1), s = r.depth > i && ki(t, r, i + 1), l = [];
  return er(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Hs(o, s), Sn(Nn(o, _s(n, e, t, r, i + 1)), l)) : (o && Sn(Nn(o, Fr(n, e, i + 1)), l), er(e, t, i, l), s && Sn(Nn(s, Fr(t, r, i + 1)), l)), er(r, null, i, l), new W(l);
}
function Fr(n, e, t) {
  let r = [];
  if (er(null, n, t, r), n.depth > t) {
    let i = ki(n, e, t + 1);
    Sn(Nn(i, Fr(n, e, t + 1)), r);
  }
  return er(e, null, t, r), new W(r);
}
function $a(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(W.from(i));
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
      return Ue.none;
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
        return new Br(this, e, r);
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
    let r = go.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      go.set(e, r = new za());
    let i = r.elts[r.i] = ir.resolve(e, t);
    return r.i = (r.i + 1) % Pa, i;
  }
}
class za {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Pa = 12, go = /* @__PURE__ */ new WeakMap();
class Br {
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
const La = /* @__PURE__ */ Object.create(null);
let _n = class Si {
  /**
  @internal
  */
  constructor(e, t, r, i = Ue.none) {
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
    return this.type == e && Or(this.attrs, t || e.defaultAttrs || La) && Ue.sameSet(this.marks, r || Ue.none);
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
      return de.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new de(a, i.depth - s, o.depth - s);
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
    return Da(this.resolve(e), this.resolve(t), r);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), js(this.marks, e);
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
    this.type.checkContent(this.content), yo(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ue.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      yo(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Ue.sameSet(e, this.marks))
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
_n.prototype.text = void 0;
class Hr extends _n {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : js(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Hr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Hr(this.type, this.attrs, e, this.marks);
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
function js(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function yo(n, e, t, r) {
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
    let r = new Oa(e, t);
    if (r.next == null)
      return Tn.empty;
    let i = Ws(r);
    r.next && r.err("Unexpected trailing text");
    let o = qa(Wa(i));
    return Ka(o, r), o;
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
          let h = o(d, l.concat(u));
          if (h)
            return h;
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
class Oa {
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
function Ws(n) {
  let e = [];
  do
    e.push(Fa(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Fa(n) {
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
      e = Ha(n, e);
    else
      break;
  return e;
}
function xo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Ha(n, e) {
  let t = xo(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = xo(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function _a(n, e) {
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
    let e = Ws(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = _a(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Wa(n) {
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
function qs(n, e) {
  return e - n;
}
function bo(n, e) {
  let t = [];
  return r(e), t.sort(qs);
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
function qa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(bo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        bo(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Tn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(qs);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Ka(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ks(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Js(n, e) {
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
function Vs(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Va(n, r, e[r]);
  return t;
}
class _r {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Vs(e, r.attrs), this.defaultAttrs = Ks(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Js(this.attrs, e);
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
    return new _n(this, this.computeAttrs(e), W.from(t), Ue.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = W.from(t), this.checkContent(t), new _n(this, this.computeAttrs(e), t, Ue.setFrom(r));
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
    return o ? new _n(this, e, t.append(o), Ue.setFrom(r)) : null;
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
    return t ? t.length ? t : Ue.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new _r(o, t, s));
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
class Va {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Ja(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ei {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Vs(e, i.attrs), this.excluded = null;
    let o = Ks(this.attrs);
    this.instance = o ? new Ue(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ue(this, Js(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new ei(o, i++, t, s)), r;
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
class Ya {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = wt.from(e.nodes), t.marks = wt.from(e.marks || {}), this.nodes = _r.compile(this.spec.nodes, this), this.marks = ei.compile(this.spec.marks, this);
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
      o.markSet = l == "_" ? null : l ? vo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : vo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => _n.fromJSON(this, i), this.markFromJSON = (i) => Ue.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof _r) {
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
    return new Hr(r, r.defaultAttrs, e, Ue.setFrom(t));
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
function vo(n, e) {
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
function Ua(n) {
  return n.tag != null;
}
function Ga(n) {
  return n.style != null;
}
class jn {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Ua(i))
        this.tags.push(i);
      else if (Ga(i)) {
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
    let r = new ko(this, t, !1);
    return r.addAll(e, Ue.none, t.from, t.to), r.finish();
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
    let r = new ko(this, t, !0);
    return r.addAll(e, Ue.none, t.from, t.to), de.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Za(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = So(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = So(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new jn(e, jn.schemaRules(e)));
  }
}
const Ys = {
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
}, Xa = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Us = { ol: !0, ul: !0 }, or = 1, Ni = 2, tr = 4;
function wo(n, e, t) {
  return e != null ? (e ? or : 0) | (e === "full" ? Ni : 0) : n && n.whitespace == "pre" ? or | Ni : t & ~tr;
}
class Nr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ue.none, this.match = o || (s & tr ? null : e.contentMatch);
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
    if (!(this.options & or)) {
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
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ys.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ko {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = wo(null, t.preserveWhitespace, 0) | (r ? tr : 0);
    i ? o = new Nr(i.type, i.attrs, Ue.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Nr(null, null, Ue.none, !0, null, s) : o = new Nr(e.schema.topNodeType, null, Ue.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Ni ? "full" : this.localPreserveWS || (i.options & or) > 0, { schema: s } = this.parser;
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
    Us.hasOwnProperty(s) && this.parser.normalizeLists && Qa(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Xa.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (Ys.hasOwnProperty(s))
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
      let s = Ue.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : No(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = wo(e, o, s.options);
    s.options & tr && s.content.length == 0 && (l |= tr);
    let c = Ue.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : No(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new Nr(e, t, c, i, null, l)), this.open++, r;
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
function Qa(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Us.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Za(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function So(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function No(n, e) {
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
const Gs = 65535, Xs = Math.pow(2, 16);
function eu(n, e) {
  return n + e * Xs;
}
function Co(n) {
  return n & Gs;
}
function tu(n) {
  return (n - (n & Gs)) / Xs;
}
const Qs = 1, Zs = 2, Rr = 4, el = 8;
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
    return (this.delInfo & el) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Qs | Rr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Zs | Rr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Rr) > 0;
  }
}
class Ft {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Ft.empty)
      return Ft.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Co(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + tu(e);
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
        let h = a ? e == c ? -1 : e == d ? 1 : t : t, f = c + i + (h < 0 ? 0 : u);
        if (r)
          return f;
        let m = e == (t < 0 ? c : d) ? null : eu(l / 3, e - c), g = e == c ? Zs : e == d ? Qs : Rr;
        return (t < 0 ? e != c : e != d) && (g |= el), new Ci(f, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new Ci(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Co(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Ft(this.ranges, !this.inverted);
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
    return e == 0 ? Ft.empty : new Ft(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Ft.empty = new Ft([]);
class jr {
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
    return new jr(this._maps, this.mirror, e, t);
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
    let e = new jr();
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
const ui = /* @__PURE__ */ Object.create(null);
class Tt {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Ft.empty;
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
    let r = ui[t.stepType];
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
    if (e in ui)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ui[e] = t, t.prototype.jsonID = e, t;
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
      if (o instanceof rr)
        return dt.fail(o.message);
      throw o;
    }
  }
}
function qi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(qi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return W.fromArray(r);
}
class hn extends Tt {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new de(qi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return dt.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Jt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new hn(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof hn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new hn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new hn(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Tt.jsonID("addMark", hn);
class Jt extends Tt {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new de(qi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return dt.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new hn(this.from, this.to, this.mark);
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
Tt.jsonID("removeMark", Jt);
class pn extends Tt {
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
    return dt.fromReplace(e, this.pos, this.pos + 1, new de(W.from(r), 0, t.isLeaf ? 0 : 1));
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
Tt.jsonID("addNodeMark", pn);
class En extends Tt {
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
    return dt.fromReplace(e, this.pos, this.pos + 1, new de(W.from(r), 0, t.isLeaf ? 0 : 1));
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
Tt.jsonID("removeNodeMark", En);
class ut extends Tt {
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
    return this.structure && Ti(e, this.from, this.to) ? dt.fail("Structure replace would overwrite content") : dt.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Ft([this.from, this.to - this.from, this.slice.size]);
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
      let t = this.slice.size + e.slice.size == 0 ? de.empty : new de(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new ut(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? de.empty : new de(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
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
    return new ut(t.from, t.to, de.fromJSON(e, t.slice), !!t.structure);
  }
}
ut.MAP_BIAS = 1;
Tt.jsonID("replace", ut);
class pt extends Tt {
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
      return dt.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return dt.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? dt.fromReplace(e, this.from, this.to, r) : dt.fail("Content does not fit in gap");
  }
  getMap() {
    return new Ft([
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
    return new pt(t.from, t.to, t.gapFrom, t.gapTo, de.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Tt.jsonID("replaceAround", pt);
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
function nu(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let h = Math.max(a, e), f = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == h && s.mark.eq(d[g]) ? s.to = f : i.push(s = new Jt(h, f, d[g])));
      l && l.to == h ? l.to = f : o.push(l = new hn(h, f, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function ru(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof ei) {
      let a = s.marks, u;
      for (; u = r.isInSet(a); )
        (c || (c = [])).push(u), a = u.removeFromSet(a);
    } else r ? r.isInSet(s.marks) && (c = [r]) : c = s.marks;
    if (c && c.length) {
      let a = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < c.length; u++) {
        let d = c[u], h;
        for (let f = 0; f < i.length; f++) {
          let m = i[f];
          m.step == o - 1 && d.eq(i[f].style) && (h = m);
        }
        h ? (h.to = a, h.step = o) : i.push({ style: d, from: Math.max(l, e), to: a, step: o });
      }
    }
  }), i.forEach((s) => n.step(new Jt(s.from, s.to, s.style)));
}
function Ki(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new ut(l, u, de.empty));
    else {
      r = d;
      for (let h = 0; h < a.marks.length; h++)
        t.allowsMarkType(a.marks[h].type) || n.step(new Jt(l, u, a.marks[h]));
      if (i && a.isText && t.whitespace != "pre") {
        let h, f = /\r?\n|\r/g, m;
        for (; h = f.exec(a.text); )
          m || (m = new de(W.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new ut(l + h.index, l + h.index + h[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(W.empty, !0);
    n.replace(l, l, new de(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function iu(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Gn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !iu(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function ou(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = W.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = W.from(r.node(m).copy(u)), d++) : c--;
  let h = W.empty, f = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, h = W.from(i.node(m).copy(h)), f++) : a++;
  n.step(new pt(c, a, s, l, new de(u.append(h), d, f), u.size - d, !0));
}
function tl(n, e, t = null, r = n) {
  let i = su(n, e), o = i && lu(r, e);
  return o ? i.map(To).concat({ type: e, attrs: t }).concat(o.map(To)) : null;
}
function To(n) {
  return { type: n, attrs: null };
}
function su(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function lu(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function cu(n, e, t) {
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
  n.step(new pt(i, o, i, o, new de(r, 0, 0), t.length, !0));
}
function au(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && uu(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let f = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        f && !m ? a = !1 : !f && m && (a = !0);
      }
      a === !1 && rl(n, s, l, o), Ki(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), h = u.map(l + s.nodeSize, 1);
      return n.step(new pt(d, h, d + 1, h - 1, new de(W.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && nl(n, s, l, o), !1;
    }
  });
}
function nl(n, e, t, r) {
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
function rl(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function uu(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function du(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new pt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new de(W.from(s), 0, 0), 1, !0));
}
function on(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let a = i.depth - 1, u = t - 2; a > o; a--, u--) {
    let d = i.node(a), h = i.index(a);
    if (d.type.spec.isolating)
      return !1;
    let f = d.content.cutByIndex(h, d.childCount), m = r && r[u + 1];
    m && (f = f.replaceChild(0, m.type.create(m.attrs)));
    let g = r && r[u] || d;
    if (!d.canReplace(h + 1, d.childCount) || !g.type.validContent(f))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function fu(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = W.empty, s = W.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = W.from(i.node(l).copy(o));
    let u = r && r[a];
    s = W.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new ut(e, e, new de(o.append(s), t, t), !0));
}
function Mn(n, e) {
  let t = n.resolve(e), r = t.index();
  return il(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function hu(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function il(n, e) {
  return !!(n && e && !n.isLeaf && hu(n, e));
}
function ti(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && il(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function pu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    rl(n, u.node(), u.before(), l);
  }
  s.inlineContent && Ki(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new ut(a, c.map(e + t, -1), de.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    nl(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function mu(n, e, t) {
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
function ni(n, e, t = e, r = de.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return ol(i, o, r) ? new ut(e, t, r) : new gu(i, o, r).fit();
}
function ol(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class gu {
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
    let c = new de(o, s, l);
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
        r ? (o = di(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
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
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = di(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new de(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = di(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new de(Qn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new de(Qn(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, c = s.openStart - e, a = 0, u = [], { match: d, type: h } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        u.push(i.child(g));
      d = d.matchFragment(i);
    }
    let f = l.size + e - (s.content.size - s.openEnd);
    for (; a < l.childCount; ) {
      let g = l.child(a), x = d.matchType(g.type);
      if (!x)
        break;
      a++, (a > 1 || c == 0 || g.content.size) && (d = x, u.push(sl(g.mark(h.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? f : -1)));
    }
    let m = a == l.childCount;
    m || (f = -1), this.placed = Zn(this.placed, t, W.from(u)), this.frontier[t].match = d, m && f < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, x = l; g < f; g++) {
      let b = x.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), x = b.content;
    }
    this.unplaced = m ? e == 0 ? de.empty : new de(Qn(s.content, e - 1, 1), e - 1, f < 0 ? s.openEnd : e - 1) : new de(Qn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !fi(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = fi(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = fi(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Zn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Zn(this.placed, this.depth, W.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(W.empty, !0);
    t.childCount && (this.placed = Zn(this.placed, this.frontier.length, t));
  }
}
function Qn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Qn(n.firstChild.content, e - 1, t)));
}
function Zn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Zn(n.lastChild.content, e - 1, t)));
}
function di(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function sl(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, sl(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(W.empty, !0)))), n.copy(r);
}
function fi(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !yu(t, o.content, s) ? l : null;
}
function yu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function xu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function bu(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (ol(i, o, r))
    return n.step(new ut(e, t, r));
  let s = cl(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let h = i.depth, f = i.pos - 1; h > 0; h--, f--) {
    let m = i.node(h).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    s.indexOf(h) > -1 ? l = h : i.before(h) == f && s.splice(1, 0, -h);
  }
  let c = s.indexOf(l), a = [], u = r.openStart;
  for (let h = r.content, f = 0; ; f++) {
    let m = h.firstChild;
    if (a.push(m), f == r.openStart)
      break;
    h = m.content;
  }
  for (let h = u - 1; h >= 0; h--) {
    let f = a[h], m = xu(f.type);
    if (m && !f.sameMarkup(i.node(Math.abs(l) - 1)))
      u = h;
    else if (m || !f.type.isTextblock)
      break;
  }
  for (let h = r.openStart; h >= 0; h--) {
    let f = (h + u + 1) % (r.openStart + 1), m = a[f];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let x = s[(g + c) % s.length], b = !0;
        x < 0 && (b = !1, x = -x);
        let $ = i.node(x - 1), E = i.index(x - 1);
        if ($.canReplaceWith(E, E, m.type, m.marks))
          return n.replace(i.before(x), b ? o.after(x) : t, new de(ll(r.content, 0, r.openStart, f), f, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let h = s.length - 1; h >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); h--) {
    let f = s[h];
    f < 0 || (e = i.before(f), t = o.after(f));
  }
}
function ll(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(ll(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(W.empty, !0));
  }
  return n;
}
function vu(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = mu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new de(W.from(r), 0, 0));
}
function wu(n, e, t) {
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
  let o = cl(r, i);
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
function cl(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Wn extends Tt {
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
    return dt.fromReplace(e, this.pos, this.pos + 1, new de(W.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Ft.empty;
  }
  invert(e) {
    return new Wn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Wn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Wn(t.pos, t.attr, t.value);
  }
}
Tt.jsonID("attr", Wn);
class sr extends Tt {
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
    return Ft.empty;
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
Tt.jsonID("docAttr", sr);
let Kn = class extends Error {
};
Kn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Kn.prototype = Object.create(Error.prototype);
Kn.prototype.constructor = Kn;
Kn.prototype.name = "TransformError";
class ku {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new jr();
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
      throw new Kn(t.failed);
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
  replace(e, t = e, r = de.empty) {
    let i = ni(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new de(W.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, de.empty);
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
    return bu(this, e, t, r), this;
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
    return vu(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return wu(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return ou(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return pu(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return cu(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return au(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return du(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Wn(e, t, r)), this;
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
    if (t instanceof Ue)
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
    return fu(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return nu(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return ru(this, e, t, r), this;
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
const hi = /* @__PURE__ */ Object.create(null);
class st {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Su(e.min(t), e.max(t))];
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
  replace(e, t = de.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? de.empty : t), l == 0 && Ro(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), Ro(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Pt(e) : Ln(e.node(0), e.parent, e.pos, e.index(), t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Vt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Ln(e, e, 0, 0, 1) || new Vt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Ln(e, e, e.content.size, e.childCount, -1) || new Vt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = hi[t.type];
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
    if (e in hi)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return hi[e] = t, t.prototype.jsonID = e, t;
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
    return Pt.between(this.$anchor, this.$head).getBookmark();
  }
}
st.prototype.visible = !0;
class Su {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Eo = !1;
function Mo(n) {
  !Eo && !n.parent.inlineContent && (Eo = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Pt extends st {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Mo(e), Mo(t), super(e, t);
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
      return st.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Pt(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = de.empty) {
    if (super.replace(e, t), t == de.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Pt && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ri(this.anchor, this.head);
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
    return new Pt(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = st.findFrom(t, r, !0) || st.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return st.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (st.findFrom(e, -r, !0) || st.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Pt(e, t);
  }
}
st.jsonID("text", Pt);
class ri {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ri(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Pt.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Ge extends st {
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
    return r ? st.near(o) : new Ge(o);
  }
  content() {
    return new de(W.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Ge && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Ji(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Ge(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Ge(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Ge.prototype.visible = !1;
st.jsonID("node", Ge);
class Ji {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ri(r, r) : new Ji(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Ge.isSelectable(r) ? new Ge(t) : st.near(t);
  }
}
class Vt extends st {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = de.empty) {
    if (t == de.empty) {
      e.delete(0, e.doc.content.size);
      let r = st.atStart(e.doc);
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
    return Nu;
  }
}
st.jsonID("all", Vt);
const Nu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Vt(n);
  }
};
function Ln(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Pt.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Ge.isSelectable(l))
        return Ge.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Ln(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Ro(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof ut || i instanceof pt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(st.near(n.doc.resolve(s), t));
}
function Io(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Cr {
  constructor(e, t, r) {
    this.name = e, this.init = Io(t.init, r), this.apply = Io(t.apply, r);
  }
}
new Cr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new Cr("selection", {
  init(n, e) {
    return n.selection || st.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new Cr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new Cr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const al = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function ul(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const dl = (n, e, t) => {
  let r = ul(n, t);
  if (!r)
    return !1;
  let i = Vi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Gn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (vl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "end") || Ge.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = ni(n.doc, r.before(s), r.after(s), de.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Jn(o, "end") ? st.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Ge.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Cu = (n, e, t) => {
  let r = ul(n, t);
  if (!r)
    return !1;
  let i = Vi(r);
  return i ? fl(n, i, e) : !1;
}, Tu = (n, e, t) => {
  let r = pl(n, t);
  if (!r)
    return !1;
  let i = Yi(r);
  return i ? fl(n, i, e) : !1;
};
function fl(n, e, t) {
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
  let a = ni(n.doc, o, c, de.empty);
  if (!a || a.from != o || a instanceof ut && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Pt.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Jn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const hl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Vi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Ge.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ge.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Vi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function pl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const ml = (n, e, t) => {
  let r = pl(n, t);
  if (!r)
    return !1;
  let i = Yi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (vl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "start") || Ge.isSelectable(o))) {
    let s = ni(n.doc, r.before(), r.after(), de.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Jn(o, "start") ? st.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Ge.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, gl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Yi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Ge.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Ge.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Yi(n) {
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
const Eu = (n, e) => {
  let t = n.selection, r = t instanceof Ge, i;
  if (r) {
    if (t.node.isTextblock || !Mn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = ti(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Ge.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Mu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Ge) {
    if (t.node.isTextblock || !Mn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ti(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Ru = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Gn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, yl = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ui(n) {
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
  let i = t.node(-1), o = t.indexAfter(-1), s = Ui(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(st.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, xl = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Vt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ui(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Pt.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, bl = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (on(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Gn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function Au(n) {
  return (e, t) => {
    if (e.selection instanceof Ge && e.selection.node.isBlock) {
      let { $from: f } = e.selection;
      return !f.parentOffset || !on(e.doc, f.pos) ? !1 : (t && t(e.tr.split(f.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Pt || e.selection instanceof Vt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let f = i.depth; ; f--)
      if (i.node(f).isBlock) {
        a = i.end(f) == i.pos + (i.depth - f), u = i.start(f) == i.pos - (i.depth - f), c = Ui(i.node(f - 1).contentMatchAt(i.indexAfter(f - 1))), s.unshift(a && c ? { type: c } : null), l = f;
        break;
      } else {
        if (f == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, h = on(r.doc, d, s.length, s);
    if (h || (s[0] = c ? { type: c } : null, h = on(r.doc, d, s.length, s)), !h)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let f = r.mapping.slice(o), m = f.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(f.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Du = Au(), $u = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Ge.create(n.doc, i))), !0);
};
function zu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Mn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function vl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && zu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let f = e.pos + o.nodeSize, m = W.empty;
      for (let b = s.length - 1; b >= 0; b--)
        m = W.from(s[b].create(null, m));
      m = W.from(i.copy(m));
      let g = n.tr.step(new pt(e.pos - 1, f, e.pos, f, new de(m, 1, 0), s.length, !0)), x = g.doc.resolve(f + 2 * s.length);
      x.nodeAfter && x.nodeAfter.type == i.type && Mn(g.doc, x.pos) && g.join(x.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : st.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), h = d && Gn(d);
  if (h != null && h >= e.depth)
    return t && t(n.tr.lift(d, h).scrollIntoView()), !0;
  if (a && Jn(o, "start", !0) && Jn(i, "end")) {
    let f = i, m = [];
    for (; m.push(f), !f.isTextblock; )
      f = f.lastChild;
    let g = o, x = 1;
    for (; !g.isTextblock; g = g.firstChild)
      x++;
    if (f.canReplace(f.childCount, f.childCount, g.content)) {
      if (t) {
        let b = W.empty;
        for (let E = m.length - 1; E >= 0; E--)
          b = W.from(m[E].copy(b));
        let $ = n.tr.step(new pt(e.pos - m.length, e.pos + o.nodeSize, e.pos + x, e.pos + o.nodeSize - x, new de(b, m.length, 0), 0, !0));
        t($.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function wl(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Pt.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Pu = wl(-1), Lu = wl(1);
function Ou(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && tl(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Ao(n, e = null) {
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
function Gi(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Gi(al, dl, hl);
Gi(al, ml, gl);
Gi(yl, xl, bl, Du);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Fu(n, e = null) {
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
    o = new Br(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Br(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = tl(o, t, r, e);
  return l ? (n && Hu(n, e, l, i, t), !0) : !1;
}
function Hu(n, e, t, r, i) {
  let o = W.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = W.from(t[u].type.create(t[u].attrs, o));
  n.step(new pt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new de(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, h = !0; u < d; u++, h = !1)
    !h && on(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function _u(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? ju(e, t, n, o) : Wu(e, t, o) : !0 : !1;
  };
}
function ju(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new pt(o - 1, s, o, s, new de(W.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Br(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Gn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Mn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Wu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let f = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    f -= i.child(m).nodeSize, r.delete(f - 1, f + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? W.empty : W.from(i))))
    return !1;
  let d = o.pos, h = d + s.nodeSize;
  return r.step(new pt(d - (l ? 1 : 0), h + (c ? 1 : 0), d + 1, h - 1, new de((l ? W.empty : W.from(i.copy(W.empty))).append(c ? W.empty : W.from(i.copy(W.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function qu(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = W.from(a ? n.create() : null), d = new de(W.from(n.create(null, W.from(l.type.create(null, u)))), a ? 3 : 1, 0), h = o.start, f = o.end;
      t(e.tr.step(new pt(h - (a ? 3 : 1), f, h, f, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function kl(n) {
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
var Ku = class Sl {
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
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], c = !!e, a = e || o.tr, u = () => (!c && t && !a.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(a), l.every((h) => h === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([h, f]) => [h, (...g) => {
        const x = this.buildProps(a, t), b = f(...g)(x);
        return l.push(b), d;
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
    const e = Sl.createFakeChain();
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
      state: kl({
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
}), !0), Vu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Yu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), h = a.resolve(u.map(c + l.nodeSize)), f = d.blockRange(h);
      if (!f) return;
      const m = Gn(f);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(f.start, g);
      }
      (m || m === 0) && e.lift(f, m);
    });
  }), !0;
}, Uu = (n) => (e) => n(e), Gu = () => ({ state: n, dispatch: e }) => xl(n, e), Xu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Wt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Qu = () => ({ tr: n, dispatch: e }) => {
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
const Zu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Ct(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, ed = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, td = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Do = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return td(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, nd = (n, e, t) => ({
  from: Do(n, t, "left"),
  to: Do(e, t, "right")
}), rd = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = nd(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Wt.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, id = () => ({ commands: n }) => n.keyboardShortcut("Enter"), od = () => ({ state: n, dispatch: e }) => Iu(n, e);
function sd(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Wr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : sd(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Nl(n, e, t = {}) {
  return n.find((r) => r.type === e && Wr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function $o(n, e, t = {}) {
  return !!Nl(n, e, t);
}
function Cl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!Nl([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && $o([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && $o([...n.parent.child(s).marks], e, t); )
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
const ld = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = bn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = Cl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const h = Wt.create(s, d.from, d.to);
      t.setSelection(h);
    }
  }
  return !0;
}, cd = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function Tl(n) {
  return n instanceof Wt;
}
function kn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function ad(n, e = null) {
  if (!e) return null;
  const t = Bn.atStart(n), r = Bn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Wt.create(n, kn(0, i, o), kn(n.content.size, i, o)) : Wt.create(n, kn(e, i, o), kn(e, i, o));
}
function zo() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function qr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function ud() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const dd = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (qr() || zo()) && r.dom.focus(), ud() && !qr() && !zo() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !Tl(t.state.selection))
    return s(), !0;
  const l = ad(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, fd = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), hd = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), El = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && El(r);
  }
  return n;
};
function Tr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return El(t);
}
function Ml(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Vn(n, e, t) {
  if (Ml(n)) return n;
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
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Vn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Ya({
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
      if (t.slice ? jn.fromSchema(c).parseSlice(Tr(n), t.parseOptions) : jn.fromSchema(c).parse(Tr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = jn.fromSchema(e);
    return t.slice ? o.parseSlice(Tr(n), t.parseOptions).content : o.parse(Tr(n), t.parseOptions);
  }
  return Vn("", e, t);
}
function Rl(n) {
  return !("type" in n);
}
function Il(n, e, t) {
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
const pd = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const c = (x) => {
      o.emit("contentError", {
        editor: o,
        error: x,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, a = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      Vn(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (x) {
      c(x);
    }
    try {
      var s;
      l = Vn(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (x) {
      return c(x), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, h = !0, f = !0;
    const m = Rl(l) ? l.content : [l];
    if (m.forEach((x) => {
      x.check(), h = h ? x.isText && x.marks.length === 0 : !1, f = f ? x.isBlock : !1;
    }), u === d && f) {
      const { parent: x } = r.doc.resolve(u);
      x.isTextblock && !x.type.spec.code && !x.childCount && (u -= 1, d += 1);
    }
    let g;
    if (h)
      Array.isArray(e) ? g = e.map((x) => x.text || "").join("") : Ml(e) ? g = m.map((x) => {
        var b;
        return (b = x.text) !== null && b !== void 0 ? b : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = W.from(m);
      const x = r.doc.resolve(u), b = x.node(), $ = x.parentOffset === 0, E = b.isText || b.isTextblock, w = b.content.size > 0;
      $ && E && w && f && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && Il(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function Al(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const md = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = Al(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([f]) => u.includes(f))) : {};
  let h;
  if (s) {
    const f = Vn(s, r.schema);
    h = a.createAndFill(d, f);
  } else h = a.createAndFill(d);
  return h ? (t && (e.insert(c.pos, h), l && Il(e, e.steps.length - 1, -1)), !0) : !1;
}, gd = () => ({ state: n, dispatch: e }) => Eu(n, e), yd = () => ({ state: n, dispatch: e }) => Mu(n, e), xd = () => ({ state: n, dispatch: e }) => dl(n, e), bd = () => ({ state: n, dispatch: e }) => ml(n, e), vd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ti(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, wd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ti(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, kd = () => ({ state: n, dispatch: e }) => Cu(n, e), Sd = () => ({ state: n, dispatch: e }) => Tu(n, e);
function Dl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Nd(n) {
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
      qr() || Dl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Cd = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Nd(n).split(/-(?!$)/), s = o.find((a) => ![
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
function Xi(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Ct(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const h = Math.max(r, d), f = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: h,
      to: f
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Wr(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const Td = (n, e = {}) => ({ state: t, dispatch: r }) => Xi(t, Ct(n, t.schema), e) ? Ru(t, r) : !1, Ed = () => ({ state: n, dispatch: e }) => bl(n, e), Md = (n) => ({ state: e, dispatch: t }) => {
  const r = Ct(n, e.schema);
  return _u(r)(e, t);
}, Rd = () => ({ state: n, dispatch: e }) => yl(n, e);
function $l(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Po(n, e) {
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
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, Po(u.attrs, e))), s && u.marks.length && u.marks.forEach((h) => {
        s === h.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(Po(h.attrs, e))));
      });
    });
  }), c;
}, Ad = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Dd = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new hc(n.doc);
    n.setSelection(t);
  }
  return !0;
}, $d = () => ({ state: n, dispatch: e }) => hl(n, e), zd = () => ({ state: n, dispatch: e }) => gl(n, e), Pd = () => ({ state: n, dispatch: e }) => $u(n, e), Ld = () => ({ state: n, dispatch: e }) => Lu(n, e), Od = () => ({ state: n, dispatch: e }) => Pu(n, e);
function Fd(n, e, t = {}, r = {}) {
  return Vn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Bd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Fd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = Rl(a) ? a.content : [a];
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
function Hd(n, e) {
  const t = bn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function _d(n, e) {
  const t = new ku(n);
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
function Qi(n) {
  return (e) => jd(e.$from, n);
}
function lr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? lr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? lr(n.parent, e, t) : null
  }) : n.config[e];
}
function Wd(n) {
  return typeof n == "function";
}
function Ei(n, e = void 0, ...t) {
  return Wd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function zl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function qd(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (c, a, u, d) => {
    c.isBlock && a > r && (l += o);
    const h = s == null ? void 0 : s[c.type.name];
    if (h)
      return u && (l += h({
        node: c,
        pos: a,
        parent: u,
        index: d,
        range: e
      })), !1;
    if (c.isText) {
      var f;
      l += c == null || (f = c.text) === null || f === void 0 ? void 0 : f.slice(Math.max(r, a) - a, i - a);
    }
  }), l;
}
function Kd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Jd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Vd(n) {
  const e = Jd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Yd(n) {
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
      const a = e.slice(o).map(l, -1), u = e.slice(o).map(c), d = e.invert().map(a, -1), h = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: h
        },
        newRange: {
          from: a,
          to: u
        }
      });
    });
  }), Vd(r);
}
function Ir(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Ud(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? bn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Wr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const h = u.pos, f = d.pos;
    n.doc.nodesBetween(h, f, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const x = Math.max(h, g), b = Math.min(f, g + m.nodeSize), $ = b - x;
      s += $, l.push(...m.marks.map((E) => ({
        mark: E,
        from: x,
        to: b
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Wr(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function pi(n, e) {
  const { nodeExtensions: t } = zl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Ei(lr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Pl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Pl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Gd(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (Tl(r) && (i = r.$cursor), i) {
    var o;
    const l = (o = n.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((c) => c.type.excludes(t)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: l, $to: c }) => {
    let a = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, c.pos, (u, d, h) => {
      if (a) return !1;
      if (u.isInline) {
        const f = !h || h.type.allowsMarkType(t), m = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        a = f && m;
      }
      return !a;
    }), a;
  });
}
const Xd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = bn(n, r.schema);
  if (i)
    if (s) {
      const a = Hd(r, c);
      t.addStoredMark(c.create({
        ...a,
        ...e
      }));
    } else l.forEach((a) => {
      const u = a.$from.pos, d = a.$to.pos;
      r.doc.nodesBetween(u, d, (h, f) => {
        const m = Math.max(f, u), g = Math.min(f + h.nodeSize, d);
        h.marks.find((x) => x.type === c) ? h.marks.forEach((x) => {
          c === x.type && t.addMark(m, g, c.create({
            ...x.attrs,
            ...e
          }));
        }) : t.addMark(m, g, c.create(e));
      });
    });
  return Gd(r, t, c);
}, Qd = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Zd = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Ct(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Ao(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Ao(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, ef = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = kn(n, 0, r.content.size), o = qn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, tf = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, nf = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Wt.atStart(r).from, l = Wt.atEnd(r).to, c = kn(i, s, l), a = kn(o, s, l), u = Wt.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, rf = (n) => ({ state: e, dispatch: t }) => {
  const r = Ct(n, e.schema);
  return qu(r)(e, t);
};
function Lo(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const of = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = Ir(a, l.node().type.name, l.node().attrs);
  if (o instanceof qn && o.node.isBlock)
    return !l.parentOffset || !on(s, l.pos) ? !1 : (r && (n && Lo(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, h = l.depth === 0 ? void 0 : Al(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let f = d && h ? [{
    type: h,
    attrs: u
  }] : void 0, m = on(e.doc, e.mapping.map(l.pos), 1, f);
  if (!f && !m && on(e.doc, e.mapping.map(l.pos), 1, h ? [{ type: h }] : void 0) && (m = !0, f = h ? [{
    type: h,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof Wt && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, f), h && !d && !l.parentOffset && l.parent.type !== h)) {
      const g = e.mapping.map(l.before()), x = e.doc.resolve(g);
      l.node(-1).canReplaceWith(x.index(), x.index() + 1, h) && e.setNodeMarkup(e.mapping.map(l.before()), h);
    }
    n && Lo(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, sf = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Ct(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var h;
      let b = W.empty;
      const $ = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let U = l.depth - $; U >= l.depth - 3; U -= 1) b = W.from(l.node(U).copy(b));
      const E = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, w = {
        ...Ir(d, l.node().type.name, l.node().attrs),
        ...e
      }, N = ((h = s.contentMatch.defaultType) === null || h === void 0 ? void 0 : h.createAndFill(w)) || void 0;
      b = b.append(W.from(s.createAndFill(null, N) || void 0));
      const T = l.before(l.depth - ($ - 1));
      t.replace(T, l.after(-E), new de(b, 4 - $, 0));
      let j = -1;
      t.doc.nodesBetween(T, t.doc.content.size, (U, R) => {
        if (j > -1) return !1;
        U.isTextblock && U.content.size === 0 && (j = R + 1);
      }), j > -1 && t.setSelection(Wt.near(t.doc.resolve(j))), t.scrollIntoView();
    }
    return !0;
  }
  const f = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Ir(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Ir(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, c.pos);
  const x = f ? [{
    type: s,
    attrs: m
  }, {
    type: f,
    attrs: g
  }] : [{
    type: s,
    attrs: m
  }];
  if (!on(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: b, storedMarks: $ } = r, { splittableMarks: E } = o.extensionManager, w = $ || b.$to.parentOffset && b.$from.marks();
    if (t.split(l.pos, 2, x).scrollIntoView(), !w || !i) return !0;
    const N = w.filter((T) => E.includes(T.type.name));
    t.ensureMarks(N);
  }
  return !0;
};
function Oo(n) {
  return !n || n === "1" ? null : n;
}
function Ll(n, e) {
  return Oo(n) === Oo(e);
}
const mi = (n, e) => {
  const t = Qi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, t.pos)) || !Ll(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, gi = (n, e) => {
  const t = Qi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, r)) || !Ll(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function lf(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Wt.between(r, i);
}
const cf = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: h } = i.extensionManager, f = Ct(n, s.schema), m = Ct(e, s.schema), { selection: g, storedMarks: x } = s, { $from: b, $to: $ } = g, E = b.blockRange($), w = x || g.$to.parentOffset && g.$from.marks();
  if (!E) return !1;
  const N = Qi((H) => pi(H.type.name, d))(g), T = g.from === 0 && g.to === s.doc.content.size, j = s.doc.content.content, U = j.length === 1 ? j[0] : null, R = T && U && pi(U.type.name, d) ? {
    node: U,
    pos: 0
  } : null, q = N ?? R, k = !!N && E.depth >= 1 && E.depth - N.depth <= 1, O = !!R;
  if ((k || O) && q) {
    if (q.node.type === f)
      return T && O ? c().command(({ tr: H, dispatch: K }) => {
        const J = lf(H);
        return J ? (H.setSelection(J), K && K(H), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (pi(q.node.type.name, d) && f.validContent(q.node.content)) return c().command(() => (o.setNodeMarkup(q.pos, f), !0)).command(() => mi(o, f)).command(() => gi(o, f)).run();
  }
  return !t || !w || !l ? c().command(() => u().wrapInList(f, r) ? !0 : a.clearNodes()).wrapInList(f, r).command(() => mi(o, f)).command(() => gi(o, f)).run() : c().command(() => {
    const H = u().wrapInList(f, r), K = w.filter((J) => h.includes(J.type.name));
    return o.ensureMarks(K), H ? !0 : a.clearNodes();
  }).wrapInList(f, r).command(() => mi(o, f)).command(() => gi(o, f)).run();
}, af = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = bn(n, r.schema);
  return Ud(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, uf = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Ct(n, r.schema), s = Ct(e, r.schema), l = Xi(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, df = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Ct(n, t.schema);
  return Xi(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, ff = () => ({ state: n, dispatch: e }) => {
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
}, hf = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, pf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = bn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: h, to: f } = s;
    const m = Cl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (h = m.from, f = m.to), t.removeMark(h, f, l);
  } else u.forEach((h) => {
    t.removeMark(h.$from.pos, h.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, mf = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, gf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = $l(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ct(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    const u = a.$from.pos, d = a.$to.pos;
    let h, f, m, g;
    t.selection.empty ? r.doc.nodesBetween(u, d, (x, b) => {
      o && o === x.type && (c = !0, m = Math.max(b, u), g = Math.min(b + x.nodeSize, d), h = b, f = x);
    }) : r.doc.nodesBetween(u, d, (x, b) => {
      b < u && o && o === x.type && (c = !0, m = Math.max(b, u), g = Math.min(b + x.nodeSize, d), h = b, f = x), b >= u && b <= d && (o && o === x.type && (c = !0, i && t.setNodeMarkup(b, void 0, {
        ...x.attrs,
        ...e
      })), s && x.marks.length && x.marks.forEach(($) => {
        if (s === $.type && (c = !0, i)) {
          const E = Math.max(b, u), w = Math.min(b + x.nodeSize, d);
          t.addMark(E, w, s.create({
            ...$.attrs,
            ...e
          }));
        }
      }));
    }), f && (h !== void 0 && i && t.setNodeMarkup(h, void 0, {
      ...f.attrs,
      ...e
    }), s && f.marks.length && f.marks.forEach((x) => {
      s === x.type && i && t.addMark(m, g, s.create({
        ...x.attrs,
        ...e
      }));
    }));
  }), c;
}, yf = new Yt("__tiptap_decorations__"), xf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(yf, {
  type: "force",
  name: n
}), !0), bf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ct(n, t.schema);
  return Ou(i, e)(t, r);
}, vf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ct(n, t.schema);
  return Fu(i, e)(t, r);
};
var wf = /* @__PURE__ */ Aa({
  blur: () => Ju,
  clearContent: () => Vu,
  clearNodes: () => Yu,
  command: () => Uu,
  createParagraphNear: () => Gu,
  cut: () => Xu,
  deleteCurrentNode: () => Qu,
  deleteNode: () => Zu,
  deleteRange: () => ed,
  deleteSelection: () => rd,
  enter: () => id,
  exitCode: () => od,
  extendMarkRange: () => ld,
  first: () => cd,
  focus: () => dd,
  forEach: () => fd,
  insertContent: () => hd,
  insertContentAt: () => pd,
  insertDefaultBlock: () => md,
  joinBackward: () => xd,
  joinDown: () => yd,
  joinForward: () => bd,
  joinItemBackward: () => vd,
  joinItemForward: () => wd,
  joinTextblockBackward: () => kd,
  joinTextblockForward: () => Sd,
  joinUp: () => gd,
  keyboardShortcut: () => Cd,
  lift: () => Td,
  liftEmptyBlock: () => Ed,
  liftListItem: () => Md,
  newlineInCode: () => Rd,
  resetAttributes: () => Id,
  scrollIntoView: () => Ad,
  selectAll: () => Dd,
  selectNodeBackward: () => $d,
  selectNodeForward: () => zd,
  selectParentNode: () => Pd,
  selectTextblockEnd: () => Ld,
  selectTextblockStart: () => Od,
  setContent: () => Bd,
  setMark: () => Xd,
  setMeta: () => Qd,
  setNode: () => Zd,
  setNodeSelection: () => ef,
  setTextDirection: () => tf,
  setTextSelection: () => nf,
  sinkListItem: () => rf,
  splitBlock: () => of,
  splitListItem: () => sf,
  toggleList: () => cf,
  toggleMark: () => af,
  toggleNode: () => uf,
  toggleWrap: () => df,
  undoInputRule: () => ff,
  unsetAllMarks: () => hf,
  unsetMark: () => pf,
  unsetTextDirection: () => mf,
  updateAttributes: () => gf,
  updateDecorations: () => xf,
  wrapIn: () => bf,
  wrapInList: () => vf
});
typeof process < "u" && process.env.NODE_ENV;
function kf(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Er(n) {
  return kf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Ol(n, e) {
  const t = { ...n };
  return Er(n) && Er(e) && Object.keys(e).forEach((r) => {
    Er(e[r]) && Er(n[r]) ? t[r] = Ol(n[r], e[r]) : t[r] = e[r];
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
    return { ...Ei(lr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Ei(lr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Ol(this.options, n)
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
}, Sf = class Bl extends Fl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Bl(t);
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
}, qt = class Hl extends Fl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Hl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
qt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Yt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Kd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => qd(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
qt.create({
  name: "commands",
  addCommands() {
    return { ...wf };
  }
});
qt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = _d(n.before, [n, ...e]);
      Yd(c).forEach((u) => {
        c.mapping.mapResult(u.oldRange.from).deletedAfter && c.mapping.mapResult(u.oldRange.to).deletedBefore && c.before.nodesBetween(u.oldRange.from, u.oldRange.to, (d, h) => {
          const f = h + d.nodeSize - 2, m = u.oldRange.from <= h && f <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: h,
            to: f,
            newFrom: c.mapping.map(h),
            newTo: c.mapping.map(f),
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
          var h, f;
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), x = a.invert().map(m, -1), b = a.invert().map(g), $ = m > 0 ? (h = c.doc.nodeAt(m - 1)) === null || h === void 0 ? void 0 : h.marks.some((w) => w.eq(u.mark)) : !1, E = (f = c.doc.nodeAt(g)) === null || f === void 0 ? void 0 : f.marks.some((w) => w.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: x,
              to: b
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(E || $),
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
qt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new ln({
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
qt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new ln({
      key: new Yt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Nf = new Yt("focusEvents");
qt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new ln({
      key: Nf,
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
qt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: h, parent: f } = d, m = d.parent.isTextblock && h > 0 ? l.doc.resolve(h - 1) : d, g = m.parent.type.spec.isolating, x = d.pos - d.parentOffset, b = g && m.parent.childCount === 1 ? x === d.pos : Bn.atStart(a).from === h;
        return !u || !f.type.isTextblock || f.textContent.length || !b || b && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return qr() || Dl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Yt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((f) => f.getMeta("composition"))) return;
        const r = n.some((f) => f.docChanged) && !e.doc.eq(t.doc), i = n.some((f) => f.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Bn.atStart(e.doc).from, a = Bn.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !Pl(t.doc)) return;
        const u = t.tr, d = kl({
          state: t,
          transaction: u
        }), { commands: h } = new Ku({
          editor: this.editor,
          state: d
        });
        if (h.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
qt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new ln({
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
qt.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Yt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
qt.create({
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
    return [new ln({
      key: new Yt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Cf = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Tf = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Ef = /^(https?:\/\/|mailto:)/i;
function Mf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Tf.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function Mi(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(Mi(c));
    return l;
  };
  if (!Cf.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Ef.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Mf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Mi(l));
  return i;
}
function _l(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Rf(n) {
  const e = _l(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Mi(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function sp(n) {
  const e = _l(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function lp(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function If(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Fo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const Af = { text: "#52525b" }, Df = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var h;
  const s = n.attrs.field ?? "", l = t.options, c = ((h = l.resolve) == null ? void 0 : h.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? Af, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ p(
    uc,
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
      onMouseDown: (f) => {
        var b;
        if (f.button !== 0 || !r.isEditable) return;
        f.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), x = g.nodeAfter;
        x && qn.isSelectable(x) && i.dispatch(i.state.tr.setSelection(new qn(g))), (b = l.onTokenClick) == null || b.call(l, s, f.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ p("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, $f = Nc.extend({
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
    return ac(Df);
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
    return ["span", cc({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), zf = 240, Pf = 280, Lf = ({ props: n, onApi: e }) => {
  const t = Xr(), r = v(e);
  r.current = e, ae(() => {
    r.current(t);
  }, [t]);
  const i = v(null);
  ae(() => {
    var s;
    t.pointerDriven || sn((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), ae(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Gr();
  return /* @__PURE__ */ p(ur.Provider, { value: t, children: /* @__PURE__ */ p(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Pf, maxHeight: zf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ p("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ p(
        Of,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Of = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Es({
    label: () => n.label,
    activate: t
  }), s = We(), l = { padding: `${F(8, 12, s)}px ${F(12, 16, s)}px`, fontSize: F(12, 14, s) };
  return /* @__PURE__ */ A(
    "div",
    {
      role: "option",
      "aria-selected": i,
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
}, Bo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ p(Lf, { props: r, onApi: (i) => {
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
      const o = Cc(i);
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
}, Ff = Sf.create({
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
}), Ar = new Yt("retainedSelectionHighlight"), Bf = qt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new ln({
        key: Ar,
        state: {
          init: () => ({ held: !1, decorations: gr.empty }),
          apply(n, e) {
            const t = n.getMeta(Ar), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: gr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? gr.empty : gr.create(n.doc, [pc.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Ar.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), cp = {
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
function jl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Hf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = jl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const _f = ct.forwardRef(({
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
  const h = v(s);
  h.current = s;
  const f = v(l);
  f.current = l;
  const m = v(c);
  m.current = c;
  const g = v(a);
  g.current = a;
  const x = v(u);
  x.current = u;
  const b = v(null), $ = v(null), E = v(e);
  E.current = e;
  const w = v(r);
  w.current = r;
  const N = v(o);
  N.current = o;
  const T = v(null), j = (O) => {
    var be;
    const H = O.getAttributes("textStyle"), K = O.getAttributes("reportTextStyle"), { from: J, to: I, empty: G } = O.state.selection;
    let Q = !1, Z = !1, le = !1;
    if (!G) {
      const Se = /* @__PURE__ */ new Set(), xe = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Set();
      O.state.doc.nodesBetween(J, I, (ye) => {
        if (!ye.isText) return;
        const ie = ye.marks.find((D) => D.type.name === "textStyle");
        Se.add((ie == null ? void 0 : ie.attrs.fontFamily) || ""), xe.add((ie == null ? void 0 : ie.attrs.fontSize) || "");
        const B = ye.marks.find((D) => D.type.name === "reportTextStyle");
        ne.add((B == null ? void 0 : B.attrs.styleId) || "");
      }), Q = Se.size > 1, Z = xe.size > 1, le = ne.size > 1;
    }
    const M = {
      bold: O.isActive("bold"),
      italic: O.isActive("italic"),
      underline: O.isActive("underline"),
      strike: O.isActive("strike"),
      link: O.isActive("link"),
      color: H.color || "",
      fontFamily: H.fontFamily || "",
      fontSize: H.fontSize || "",
      textStyle: K.styleId || "",
      hasSelection: !G,
      fontFamilyMixed: Q,
      fontSizeMixed: Z,
      textStyleMixed: le
    }, ce = T.current;
    ce && ce.bold === M.bold && ce.italic === M.italic && ce.underline === M.underline && ce.strike === M.strike && ce.link === M.link && ce.color === M.color && ce.fontFamily === M.fontFamily && ce.fontSize === M.fontSize && ce.textStyle === M.textStyle && ce.hasSelection === M.hasSelection && ce.fontFamilyMixed === M.fontFamilyMixed && ce.fontSizeMixed === M.fontSizeMixed && ce.textStyleMixed === M.textStyleMixed || (T.current = M, (be = N.current) == null || be.call(N, M));
  }, U = (O) => {
    var G;
    const H = O.state.selection;
    let K = null;
    H instanceof qn && H.node.type.name === "token" ? (K = { key: H.node.attrs.field ?? "", pos: H.from }, b.current = H.from) : b.current != null && (b.current = O.state.tr.mapping.map(b.current));
    const J = $.current, I = J && K && J.key === K.key && J.pos === K.pos;
    !J && !K || I || ($.current = K, (G = x.current) == null || G.call(x, K));
  }, R = (O) => {
    const H = Rf(If(O));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(H) ? "" : H;
  }, q = ct.useMemo(() => {
    const O = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: J }) => {
        var I;
        return ((I = f.current) == null ? void 0 : I.call(f, J)) ?? [];
      },
      command: ({ editor: J, range: I, props: G }) => {
        J.chain().focus().insertContentAt(I, { type: "token", attrs: { field: G.field } }).run();
      },
      render: Bo
    }, H = $f.configure({
      resolve: h.current ?? null,
      suggestion: O,
      onTokenClick: (J, I, G) => {
        var Q;
        b.current = G, (Q = g.current) == null || Q.call(g, J, I, G);
      }
    }), K = qt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Sc({
            pluginKey: new Yt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: J, range: I }) => jl(J, I.from) != null,
            items: ({ editor: J, query: I }) => {
              var Q;
              const G = Hf(J);
              return G ? ((Q = m.current) == null ? void 0 : Q.call(m, G.chipKey, I)) ?? [] : [];
            },
            command: ({ editor: J, range: I, props: G }) => {
              J.chain().focus().insertContentAt(I, { type: "token", attrs: { field: G.field } }).run();
            },
            render: Bo
          })
        ];
      }
    });
    return [H, K];
  }, []), k = dc({
    immediatelyRender: !1,
    extensions: [
      mc,
      gc.configure({ placeholder: t }),
      yc,
      xc,
      bc,
      Ff,
      Bf,
      vc,
      kc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      wc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...q
    ],
    content: Fo(n || ""),
    editable: !r,
    onUpdate: ({ editor: O }) => {
      E.current(R(O.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: O }) => {
      j(O), U(O);
    }
  });
  return ae(() => {
    if (!k || k.isFocused) return;
    R(k.getHTML()) !== n && (T.current = null, k.commands.setContent(Fo(n || ""), { emitUpdate: !1 }), j(k));
  }, [n, k]), ae(() => {
    k && k.setEditable(!r);
  }, [r, k]), ae(() => {
    k && (T.current = null, j(k), U(k));
  }, [k]), qo(d, () => ({
    exec: (O, H, K) => {
      if (!k || w.current) return;
      const J = k.chain(), I = (K == null ? void 0 : K.focus) === !1 ? J : J.focus();
      switch (O) {
        case "bold":
          I.toggleBold().run();
          break;
        case "italic":
          I.toggleItalic().run();
          break;
        case "underline":
          I.toggleUnderline().run();
          break;
        case "strikeThrough":
          I.toggleStrike().run();
          break;
        case "foreColor":
          H && I.setColor(H).run();
          break;
        case "unsetColor":
          I.unsetColor().run();
          break;
        case "fontFamily":
          H && I.setFontFamily(H).run();
          break;
        case "unsetFontFamily":
          I.unsetFontFamily().run();
          break;
        case "fontSize":
          H && I.setFontSize(H).run();
          break;
        case "unsetFontSize":
          I.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          H && I.setMark("reportTextStyle", { styleId: H }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          I.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          I.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          H && I.extendMarkRange("link").setLink({ href: H }).run();
          break;
        case "unlink":
          I.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (O) => k == null ? void 0 : k.commands.focus(O),
    insertToken: (O) => {
      !k || w.current || k.chain().focus().insertContent({ type: "token", attrs: { field: O } }).run();
    },
    replaceToken: (O) => {
      if (!k || w.current) return;
      const H = b.current;
      H != null && k.commands.command(({ tr: K }) => {
        const J = K.doc.nodeAt(H);
        if (!J || J.type.name !== "token") return !1;
        K.setNodeMarkup(H, void 0, { field: O });
        const I = K.doc.resolve(H);
        return I.nodeAfter && I.nodeAfter.type.name === "token" && K.setSelection(new qn(I)), !0;
      });
    },
    holdSelectionHighlight: (O) => {
      !k || k.isDestroyed || k.view.dispatch(k.state.tr.setMeta(Ar, { held: O }));
    }
  }), [k]), /* @__PURE__ */ p(fc, { editor: k, className: `richtext-editor ${i || ""}` });
});
_f.displayName = "RichTextEditor";
const jf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Wf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Ho = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ p("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ p("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), qf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = re(!1);
  return /* @__PURE__ */ p(
    Qr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ A("button", { type: "button", disabled: e, className: `${Ma} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ p("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ p("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ p(mn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: jf.map((s) => /* @__PURE__ */ p(Ms, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ p(cr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ p("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Kf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = re(!1), o = Zr(), [s, l] = re(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ p(
    Qr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ p(
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
          children: /* @__PURE__ */ p(tc, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ A("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ p(
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
            className: Ta + " w-full"
          }
        ),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(zt, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ p(
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
}, ap = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = re(!1), d = (x, b) => {
    var $;
    return ($ = n.current) == null ? void 0 : $.exec(x, b);
  }, h = Zr(), f = (x) => !!(r != null && r[x]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ p("div", { className: Ds }) : null;
  return /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ A("div", { className: m, children: [
      /* @__PURE__ */ p(Pn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || f("bold"), disabled: e || f("bold"), onMouseDown: (x) => x.preventDefault(), onClick: () => d("bold"), style: { ...h.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ p(Pn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || f("italic"), disabled: e || f("italic"), onMouseDown: (x) => x.preventDefault(), onClick: () => d("italic"), style: { ...h.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ p(Pn, { content: "Underline", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (x) => x.preventDefault(), onClick: () => d("underline"), style: { ...h.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Ql, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ p(Pn, { content: "Strikethrough", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (x) => x.preventDefault(), onClick: () => d("strikeThrough"), style: { ...h.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Zl, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(Kf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(
      Qr,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ A(zt, { theme: "dark", disabled: e, style: h.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ p("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ p(Ho, {}),
          /* @__PURE__ */ p(mn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ p(Ho, { className: "w-3.5 h-3.5" })
            }
          ),
          Wf.map((x) => /* @__PURE__ */ p(
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
    (o || s || l) && /* @__PURE__ */ A(at, { children: [
      g,
      /* @__PURE__ */ A("div", { className: m, children: [
        o && /* @__PURE__ */ p(qf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ p(Pn, { content: "Clear formatting", children: /* @__PURE__ */ p(
          zt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (x) => x.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...h.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ p(ec, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ A(at, { children: [
      g,
      /* @__PURE__ */ p("div", { className: m, children: i })
    ] })
  ] });
};
function Zi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Jf(n, e, t, r, i) {
  return Zi(n + e * i, t, r);
}
const Vf = 2;
function Yf(n, e, t, r, i) {
  return Zi(n + Math.trunc(e / Vf) * i, t, r);
}
const Uf = 3;
function up({
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
  theme: h
}) {
  const [f, m] = re(null), [g, x] = re(!1), b = v(!1), $ = v(null), E = v(null), w = v(null), N = We(), T = Is(), j = a === void 0;
  ae(() => () => {
    var I;
    return (I = $.current) == null ? void 0 : I.call($);
  }, []), et(() => {
    const I = w.current, G = E.current;
    !j && I && G && (G.style.color = getComputedStyle(I).color);
  }, [j, a]), ae(() => {
    b.current || m(null);
  }, [n]);
  const U = n ?? r, R = f !== null ? f : n != null ? String(n) : d ? "" : String(r), q = (I) => Zi(I, e, t), k = (I) => {
    const G = Jf(U, I, e, t, o);
    G !== U && (b.current && m(String(G)), i(G));
  }, O = (I) => {
    if (l || s || I.pointerType !== "mouse" || I.button !== 0) return;
    const G = I.currentTarget, Q = I.clientY, Z = U;
    let le = Z, M = !1;
    const ce = (Se) => {
      const xe = Q - Se.clientY;
      if (!M) {
        if (Math.abs(xe) < Uf) return;
        M = !0, G.blur(), G.style.userSelect = "none";
      }
      const ne = Yf(Z, xe, e, t, o);
      ne !== le && (le = ne, i(ne));
    }, be = () => {
      $.current = null, window.removeEventListener("pointermove", ce), window.removeEventListener("pointerup", be), window.removeEventListener("pointercancel", be), G.style.userSelect = "", M && G.blur();
    };
    $.current = be, window.addEventListener("pointermove", ce), window.addEventListener("pointerup", be), window.addEventListener("pointercancel", be);
  }, H = (I) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": I === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (I === 1 ? U >= t : U <= e),
    /* Keep the input's focus (desktop) WITHOUT killing the tap: WebKit
       suppresses the click when a pointerdown's default is cancelled, so an
       iPhone/iPad stepper tap went dead. `mousedown` preserves the focus but
       does not cancel the click. */
    onMouseDown: (G) => G.preventDefault(),
    onClick: () => k(I)
  }), K = j ? F(22, 30, N) : F(16, 22, N), J = j ? F(14, 18, N) : F(11, 15, N);
  return /* @__PURE__ */ A(
    "span",
    {
      ref: E,
      className: `ui-number ${j ? "ui-number-box" : ""}`,
      ...h ? { "data-theme": h } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            ref: w,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: R,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...j ? { ...T, minHeight: F(28, 36, N) } : {},
              paddingRight: K + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              b.current = !0, x(!0);
            },
            onChange: (I) => {
              const G = I.target.value;
              m(G);
              const Q = parseInt(G, 10);
              G !== "" && !Number.isNaN(Q) && i(q(Q));
            },
            onBlur: () => {
              if (b.current = !1, x(!1), f === null) return;
              const I = parseInt(f, 10);
              Number.isNaN(I) || i(q(I)), m(null);
            },
            onKeyDown: (I) => {
              I.key === "Enter" && I.target.blur(), I.key === "Escape" && (m(null), I.target.blur()), !s && !l && (I.key === "ArrowUp" || I.key === "ArrowDown") && (I.preventDefault(), k(I.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: O
          }
        ),
        /* @__PURE__ */ A("span", { className: "ui-number-steppers", style: { width: K }, children: [
          /* @__PURE__ */ p("button", { ...H(1), className: "ui-number-step", children: /* @__PURE__ */ p(nc, { style: { width: J, height: J } }) }),
          /* @__PURE__ */ p("button", { ...H(-1), className: "ui-number-step", children: /* @__PURE__ */ p(mn, { style: { width: J, height: J } }) })
        ] })
      ]
    }
  );
}
function dp({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = We(), h = gn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), f = F(14, 16, d), m = { width: f, height: f }, g = F(10, 12, d);
  return /* @__PURE__ */ A("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ A("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: h, children: [
      /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ p(Dr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ p(mn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function eo({
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
  const d = v(null), h = v(null), [f, m] = re(null), g = (T) => {
    d.current = T, typeof o == "function" ? o(T) : o && (o.current = T);
  };
  et(() => {
    if (n) return;
    const T = d.current;
    if (!T || (h.current = T.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const j = new ResizeObserver(() => {
      h.current = T.getBoundingClientRect().width;
    });
    return j.observe(T), () => j.disconnect();
  }, [n]), et(() => {
    if (!n || e !== "auto") {
      m(null);
      return;
    }
    m(h.current);
    const T = requestAnimationFrame(() => m(null));
    return () => cancelAnimationFrame(T);
  }, [n, e]);
  const [x, b] = re(!1), [$, E] = re(null), w = v(!1);
  et(() => {
    if (n) {
      w.current = !0, b(!1), E(null);
      return;
    }
    if (!w.current || e !== "auto") return;
    w.current = !1, b(!0);
    let T = 0, j = 0;
    return (() => {
      var k;
      const R = (k = d.current) == null ? void 0 : k.firstElementChild, q = (R == null ? void 0 : R.getBoundingClientRect().width) ?? 0;
      q > 0 ? (T = requestAnimationFrame(() => E(q)), j = window.setTimeout(() => {
        b(!1), E(null);
      }, kt + 30)) : b(!1);
    })(), () => {
      cancelAnimationFrame(T), window.clearTimeout(j);
    };
  }, [n, e]);
  const N = n ? f ?? t : x ? $ ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ A(
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
        /* @__PURE__ */ p(
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
function Gf({
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
  active: h = !1,
  autoFocus: f = !1,
  onExpandedChange: m,
  stretch: g = !1,
  actions: x,
  leadingIcon: b,
  showClear: $ = !0,
  onSubmit: E,
  onCancel: w,
  cancelOnEscape: N = !1,
  cancelOnOutside: T = !1,
  className: j = "",
  "aria-label": U
}) {
  const [R, q] = re(f), k = v(R);
  k.current = R;
  const O = v(null), H = v(null), K = v(null), J = Qo(), I = We(), G = F(9, 13, I), Q = se((B) => {
    k.current !== B && (k.current = B, q(B), m == null || m(B));
  }, [m]), Z = se((B = !1) => {
    var D;
    Q(!1), (D = H.current) == null || D.blur(), B && requestAnimationFrame(() => {
      var Y;
      return (Y = K.current) == null ? void 0 : Y.focus();
    });
  }, [Q]), le = se(() => {
    Q(!0);
    const B = H.current;
    if (B) {
      B.focus({ preventScroll: !0 });
      const D = B.value.length;
      B.setSelectionRange(D, D);
    }
  }, [Q]);
  ae(() => {
    f && le();
  }, [f, le]), ae(() => {
    var Y;
    if (!R) return;
    const B = ((Y = O.current) == null ? void 0 : Y.ownerDocument) ?? document, D = (Ie) => {
      var me;
      const Ce = Ie.target;
      Ce && ((me = O.current) != null && me.contains(Ce) || (T && (w == null || w()), Z()));
    };
    return B.addEventListener("pointerdown", D, !0), () => B.removeEventListener("pointerdown", D, !0);
  }, [R, Z, T, w]);
  const M = se((B) => {
    var Y;
    if (!R) return;
    const D = B.relatedTarget;
    D && ((Y = O.current) != null && Y.contains(D)) || (T && (w == null || w()), Z());
  }, [R, Z, T, w]), ce = se((B) => {
    if (B.key === "Enter") {
      B.preventDefault(), E == null || E(n), Z(!0);
      return;
    }
    B.key === "Escape" && (B.preventDefault(), B.stopPropagation(), N ? w == null || w() : e(""), Z(!0));
  }, [e, Z, N, w, E, n]), be = r === void 0 ? /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5" }) : r, Se = b === void 0 ? be : b, ye = 8 + (((x == null ? void 0 : x.length) || 0) + ($ && n ? 1 : 0)) * (J.box + 2), ie = (B) => /* @__PURE__ */ p(
    "span",
    {
      style: { width: J.icon, height: J.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: B
    }
  );
  return /* @__PURE__ */ p(
    eo,
    {
      expanded: R,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: O,
      shrink: !0,
      stretch: g,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": R ? "true" : "false",
      className: j,
      onBlur: M,
      trigger: /* @__PURE__ */ p(
        zt,
        {
          ref: K,
          type: "button",
          variant: l,
          size: "minimal",
          theme: d,
          icon: be,
          collapse: c,
          iconWithLabel: a,
          revealOnHover: u,
          active: h,
          keepLabelOnActive: !0,
          onClick: le,
          className: `${c ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${R ? "pointer-events-none" : ""}`,
          tabIndex: R ? -1 : 0,
          "aria-expanded": R,
          "aria-label": U || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ A(at, { children: [
        Se && /* @__PURE__ */ p(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: G, width: J.icon, height: J.icon },
            children: ie(Se)
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            ref: H,
            value: n,
            onChange: (B) => e(B.target.value),
            onKeyDown: ce,
            placeholder: i,
            "aria-label": U || i,
            tabIndex: R ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: Se ? G + J.icon + 6 : 10, paddingRight: ye },
            className: `${Lr("sm")} w-full`
          }
        ),
        /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          x == null ? void 0 : x.map((B) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": B.label,
              title: B.label,
              tabIndex: R ? 0 : -1,
              onMouseDown: (D) => D.preventDefault(),
              onClick: () => {
                B.onClick(n, { close: () => Z(!0) }), B.keepOpen || Z(!0);
              },
              style: { width: J.box, height: J.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": B.key,
              children: ie(B.icon)
            },
            B.key
          )),
          $ && n && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: R ? 0 : -1,
              onClick: () => {
                var B;
                e(""), (B = H.current) == null || B.focus({ preventScroll: !0 });
              },
              style: { width: J.box, height: J.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ p(Cn, { size: J.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function fp({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ p(Jr, { className: "w-3.5 h-3.5" }),
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
  iconWithLabel: h = !0,
  ...f
}) {
  const m = (b) => {
    i == null || i(b), s && c("");
  }, g = () => {
    o == null || o(), l && c("");
  }, x = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ p(cr, { className: "w-3.5 h-3.5" }),
      onClick: m
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ p(Cn, { className: "w-3.5 h-3.5" }),
      onClick: g
    }] : []
  ];
  return /* @__PURE__ */ p(
    Gf,
    {
      ...f,
      value: a,
      onChange: c,
      triggerLabel: n,
      triggerIcon: e,
      triggerCollapse: d,
      iconWithLabel: h,
      leadingIcon: t,
      actions: x,
      showClear: !1,
      variant: u,
      onSubmit: i ? m : void 0,
      onCancel: o ? g : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function Xf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Qf(n, e, t) {
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
function Wl(n, e, t) {
  const r = Xf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Qf(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Zf(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = Wl(n.items, n.groups, n.query), i = [];
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
        const h = ((u = n.expandedGroups) == null ? void 0 : u.has(d.key)) ?? !1;
        if (n.includeGroupItems)
          for (const f of s)
            f.group === d.key && i.push({ kind: "item", hit: { item: f }, hidden: !h });
        else if (h)
          for (const f of s)
            f.group === d.key && i.push({ kind: "item", hit: { item: f } });
      }
    return i;
  }
  for (const d of l) i.push({ kind: "item", hit: d });
  const a = /* @__PURE__ */ new Set();
  for (const d of t) {
    i.push({ kind: "group", group: d }), a.add(d.key);
    for (const h of c)
      h.item.group === d.key && i.push({ kind: "item", hit: h });
  }
  for (const d of c)
    (!d.item.group || !a.has(d.item.group)) && i.push({ kind: "item", hit: d });
  return i.length === 0 && (i.push({ kind: "empty" }), (n.emptyActionLabels || []).forEach((d, h) => {
    i.push({ kind: "action", label: d, actionIndex: h });
  })), i;
}
function eh({
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
  onClose: h,
  closeOnSelect: f = !0,
  openOnFocus: m = !0,
  expandableGroups: g = !1,
  browseExpanded: x = !1,
  groupExpandMode: b = "multiple",
  browseAll: $ = !1,
  selectedId: E,
  autoFocus: w = !0,
  collapsedWidth: N = 128,
  expandedWidth: T = 288,
  panelWidth: j,
  panelMinWidth: U,
  keepAllRows: R = !1,
  maxMenuHeight: q = 420,
  theme: k = "light",
  morph: O = !0,
  emptyTitle: H,
  emptyHint: K,
  renderEmpty: J,
  emptyActions: I,
  leadingActions: G,
  hideLeadingOnEmpty: Q = !1,
  footerActions: Z,
  fieldActions: le,
  multiple: M,
  open: ce,
  onOpenChange: be,
  hideTrigger: Se = !1,
  anchorRef: xe,
  portalTarget: ne,
  renderTrigger: ye,
  renderItem: ie,
  highlightOnOpen: B = !0,
  ref: D
}) {
  const Y = c !== void 0, [Ie, Ce] = re(""), me = Y ? c : Ie, je = se((y) => {
    Y || Ce(y), a == null || a(y);
  }, [Y, a]), Ee = ce !== void 0, [Be, L] = re(!1), C = Ee ? ce : Be, ge = se((y) => {
    Ee || L(y), be == null || be(y);
  }, [Ee, be]), [ve, Pe] = re(t === "inline"), lt = ot(() => e.map((y) => y.key).join("\0"), [e]), we = ot(() => new Set(lt ? lt.split("\0") : []), [lt]), [He, mt] = re(() => x ? we : /* @__PURE__ */ new Set()), [ze, Zt] = re(0), Kt = v(!1), Bt = v(null), Et = v(null), Ae = se((y, P = "keyboard") => {
    Kt.current = P === "pointer", Zt(y);
  }, []), Ve = v(null), gt = v(null), At = v(null), tt = v(null), Dt = v(null), qe = v(0), nt = Ii(), $t = Yn(), yt = Gr(), Mt = Fi(), Ht = Ss(), Ke = Qo(), V = 8 + (((le == null ? void 0 : le.length) || 0) + (me ? 1 : 0)) * (Ke.box + 2), [pe, Xe] = re({ top: 0, left: 0, maxH: 288, ready: !1 }), [rt, St] = re(0);
  cs({
    anchorRef: xe ?? Ve,
    panelRef: tt,
    open: C,
    maxHeight: q,
    anchorRectRef: Dt,
    onPosition: (y) => Xe({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), ae(() => {
    const y = (xe == null ? void 0 : xe.current) ?? Ve.current;
    !C || !y || St(y.getBoundingClientRect().width);
  }, [C, ve, xe]);
  const [Rt, S] = re(!1);
  ae(() => {
    C && S(!0);
  }, [C]);
  const ee = Ur({
    visible: C,
    morph: O,
    anchor: () => {
      var y;
      return ((y = (xe == null ? void 0 : xe.current) ?? Ve.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: tt,
    cloneOnUnmount: !0,
    onClosed: () => S(!1)
  }), ue = (I || []).map(
    (y) => typeof y.label == "function" ? y.label(me) : y.label
  ), oe = ot(
    () => Zf({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: R ? "" : me,
      browseGroups: m || x || g,
      browseAll: $,
      expandedGroups: He,
      emptyActionLabels: ue
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, me, R, m, x, g, $, He, ue.join("\0")]
  ), Ne = ot(
    () => (G || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(me) : y.label,
      actionIndex: P,
      source: "leading"
    })),
    [G, me]
  ), De = ot(
    () => (Z || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(me) : y.label,
      actionIndex: P,
      source: "footer"
    })),
    [Z, me]
  ), Je = oe.some((y) => y.kind === "empty"), $e = Ne.length > 0 && !(Q && Je), Re = $e ? Ne.length : 0, ft = ot(
    () => [...$e ? Ne : [], ...oe, ...De],
    [$e, Ne, oe, De]
  ), it = !!d || g && !me.trim(), It = ot(
    () => ft.map((y, P) => ({ row: y, index: P })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !it)),
    [ft, it]
  ), xt = (g || x) && !me.trim(), Le = !!M, Ut = ot(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), en = ot(() => me.trim() ? Wl(n, e, me).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : Ut, [n, e, me, Ut]), vn = ot(() => new Set(en), [en]), Me = ys({
    mode: (M == null ? void 0 : M.mode) ?? "draft",
    selectedIds: (M == null ? void 0 : M.selectedIds) ?? bs,
    itemIds: Ut,
    visibleIds: en,
    max: M == null ? void 0 : M.max,
    disabledIds: M == null ? void 0 : M.disabledIds,
    indicator: M == null ? void 0 : M.indicator,
    onCommit: M == null ? void 0 : M.onCommit,
    onDraftChange: M == null ? void 0 : M.onDraftChange,
    onToggle: M == null ? void 0 : M.onToggle
  }), cn = v(Me.reset);
  cn.current = Me.reset;
  const Rn = typeof (M == null ? void 0 : M.commitLabel) == "function" ? M.commitLabel(Me.count) : (M == null ? void 0 : M.commitLabel) ?? `Select ${Me.count}`, Nt = se(() => {
    var y;
    ge(!1), t === "expandable" && ((y = gt.current) == null || y.blur(), Pe(!1), requestAnimationFrame(() => {
      var P;
      return (P = At.current) == null ? void 0 : P.focus();
    })), Ee || je(""), Ae(0), mt(x ? we : /* @__PURE__ */ new Set()), h == null || h();
  }, [t, h, je, x, we, Ee, ge]);
  ae(() => {
    if (me.trim() || !x) {
      mt((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    mt((y) => y.size === we.size && [...we].every((P) => y.has(P)) ? y : we);
  }, [me, x, we]);
  const an = v(!1), ht = v(!1);
  ae(() => {
    if (!C) {
      an.current = !1;
      return;
    }
    if (an.current || !g || me.trim()) return;
    const y = E ? [E] : [...(M == null ? void 0 : M.selectedIds) ?? []], P = new Set(y), X = P.size ? e.filter((he) => n.some((Te) => Te.group === he.key && P.has(Te.id))).map((he) => he.key) : [];
    if (X.length === 0) {
      an.current = !0;
      return;
    }
    const te = b === "single" ? X.slice(0, 1) : X;
    if (!te.every((he) => He.has(he))) {
      ht.current = !0, mt(new Set(te));
      return;
    }
    if (B && E) {
      const he = ft.findIndex((Te) => Te.kind === "item" && Te.hit.item.id === E);
      he >= 0 && Ae(he);
    }
    an.current = !0;
  }, [C, g, me, e, n, E, M == null ? void 0 : M.selectedIds, b, He, ft, B, Ae]);
  const Lt = se((y) => {
    mt((P) => {
      const X = new Set(P);
      return X.has(y) ? X.delete(y) : (b === "single" && X.clear(), X.add(y)), X;
    });
  }, [b]), Ot = se(() => {
    var P;
    if (C) {
      (P = gt.current) == null || P.focus();
      return;
    }
    if (cn.current(), t === "expandable" && !ve) {
      const X = Ve.current;
      if (X) {
        const te = X.style.transition, he = X.style.width;
        X.style.transition = "none", X.style.width = `${T}px`;
        const Te = X.getBoundingClientRect();
        Dt.current = { left: Te.left, top: Te.top, width: Te.width, height: Te.height }, X.style.width = he, X.offsetWidth, X.style.transition = te, window.clearTimeout(qe.current), qe.current = window.setTimeout(() => {
          Dt.current = null;
        }, kt + 80);
      }
    }
    Pe(!0), ge(!0);
    const y = E ? oe.findIndex((X) => X.kind === "item" && X.hit.item.id === E) : -1;
    Ae(y >= 0 ? Re + y : B ? Re : -1);
  }, [C, t, ve, T, Re, oe, E, B]);
  ae(() => () => {
    window.clearTimeout(qe.current), Dt.current = null;
  }, []), ae(() => {
    C || (Bt.current = null), Et.current = null;
  }, [C, me]), et(() => {
    var y;
    t !== "expandable" || !ve || !C || !w || (y = gt.current) == null || y.focus({ preventScroll: !0 });
  }, [t, ve, C, w]), ae(() => {
    var X;
    if (!C) return;
    const y = ((X = Ve.current) == null ? void 0 : X.ownerDocument) ?? nt;
    if (!y) return;
    const P = (te) => {
      var Te, bt, vt, rn;
      const he = ((Te = te.composedPath) == null ? void 0 : Te.call(te)[0]) ?? te.target;
      !he || typeof he.nodeType != "number" || (bt = Ve.current) != null && bt.contains(he) || (vt = tt.current) != null && vt.contains(he) || (rn = xe == null ? void 0 : xe.current) != null && rn.contains(he) || Nt();
    };
    return y.addEventListener("pointerdown", P, !0), () => y.removeEventListener("pointerdown", P, !0);
  }, [C, Nt, nt, xe]);
  const tn = se((y) => {
    var P;
    if (y.kind === "item" ? Bt.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (Bt.current = null), y.kind === "group") {
      if (Le) {
        const X = (P = M == null ? void 0 : M.groupToken) == null ? void 0 : P.call(M, y.group.key);
        if (X) {
          Me.canToggle(X) && Me.toggle(X);
          return;
        }
        const te = n.filter((he) => he.group === y.group.key && he.checkable !== !1 && vn.has(he.id) && !Me.isDisabled(he.id)).map((he) => he.id);
        te.length && Me.toggleGroup(te);
        return;
      }
      d ? (d(y.group), f && Nt()) : it && Lt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Le) {
        if (Me.canToggle(y.hit.item.id)) {
          const X = It.findIndex((he) => he.row === y), te = (he) => {
            const Te = It[he];
            return (Te == null ? void 0 : Te.row.kind) === "item" ? Te.row.hit.item.id : null;
          };
          Et.current = X < 0 ? null : { up: te(X - 1), down: te(X + 1) }, Me.toggle(y.hit.item.id), Ae(-1, "keyboard");
        }
        return;
      }
      u(y.hit.item), f && Nt();
      return;
    }
    if (y.kind === "action") {
      const X = y.source === "leading" ? G : y.source === "footer" ? Z : I, te = X == null ? void 0 : X[y.actionIndex];
      te && te.onClick(me), f && Nt();
    }
  }, [Nt, f, I, Z, it, n, G, M, Le, It, u, d, me, Me, Ae, Lt, vn]), Xn = (y) => {
    if (It.length === 0) return;
    const P = Et.current, X = y === 1 ? P == null ? void 0 : P.down : P == null ? void 0 : P.up;
    if (X != null) {
      const bt = It.find(
        (vt) => vt.row.kind === "item" && vt.row.hit.item.id === X
      );
      if (bt) {
        Et.current = null, Ae(bt.index);
        return;
      }
    }
    let te = ze;
    if (te < 0 && Bt.current) {
      const bt = It.find(
        (vt) => vt.row.kind === "item" && vt.row.hit.item.id === Bt.current
      );
      bt && (te = bt.index);
    }
    const he = It.findIndex((bt) => bt.index === te), Te = he < 0 ? 0 : (he + y + It.length) % It.length;
    Ae(It[Te].index);
  };
  qo(D, () => ({
    moveHighlight: Xn,
    activateHighlighted: () => {
      if (Kt.current) return !1;
      const y = ze >= 0 ? ft[ze] : void 0;
      return y ? (tn(y), Ae(-1, "keyboard"), !0) : !1;
    },
    close: Nt,
    selectAll: () => {
      Le && Me.setAll(!0);
    },
    setSelection: (y) => {
      Me.reset(y);
    }
  }), [ft, ze, tn, Nt, Le, Me]);
  const In = (y) => {
    if (Le && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), Me.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), C ? Xn(1) : Ot();
    else if (y.key === "ArrowUp")
      y.preventDefault(), Xn(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && g && C && !me.trim()) {
      const P = ft[ze];
      if ((P == null ? void 0 : P.kind) === "group") {
        const X = He.has(P.group.key);
        (y.key === "ArrowRight" || X) && (y.preventDefault(), Lt(P.group.key));
      } else if ((P == null ? void 0 : P.kind) === "item" && y.key === "ArrowLeft" && P.hit.item.group) {
        y.preventDefault();
        const X = P.hit.item.group;
        He.has(X) && Lt(X);
        const te = ft.findIndex((he) => he.kind === "group" && he.group.key === X);
        te >= 0 && Ae(te);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const P = ft[ze] ?? ft[0];
      P && tn(P);
    } else y.key === "Escape" && (y.preventDefault(), Nt());
  }, dr = (y) => {
    t === "expandable" && !ve || (je(y), C || ge(!0));
  };
  ae(() => {
    if (R) {
      const P = me.trim().toLowerCase();
      if (!P) {
        const te = E ? oe.findIndex((he) => he.kind === "item" && he.hit.item.id === E) : -1;
        Ae(te >= 0 ? Re + te : -1);
        return;
      }
      const X = oe.findIndex((te) => te.kind === "item" && te.hit.item.label.toLowerCase().includes(P));
      Ae(X >= 0 ? Re + X : -1);
      return;
    }
    if (Ee) {
      const P = me.trim().toLowerCase();
      if (!!P && n.some((te) => te.id.toLowerCase() === P || te.label.toLowerCase() === P)) {
        Ae(-1);
        return;
      }
      if (!Le) {
        const te = oe.findIndex((he) => he.kind === "item" && he.hit.item.tone !== "create");
        if (te >= 0) {
          Ae(Re + te);
          return;
        }
      }
    }
    const y = oe.findIndex((P) => P.kind === "item");
    Ae(y >= 0 ? Re + y : Re);
  }, [me]), ae(() => {
    if (!C || me.trim()) return;
    const y = E ? oe.findIndex((P) => P.kind === "item" && P.hit.item.id === E) : -1;
    Ae(y >= 0 ? Re + y : B ? Re : -1);
  }, [C]), et(() => {
    C && cn.current();
  }, [C]);
  const fr = (y) => /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    le == null ? void 0 : le.map((P) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": P.label,
        title: P.label,
        tabIndex: ve ? 0 : -1,
        onMouseDown: (X) => X.preventDefault(),
        onClick: () => {
          P.onClick(me, { close: Nt }), P.keepOpen || Nt();
        },
        style: { width: Ke.box, height: Ke.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": P.key,
        children: /* @__PURE__ */ p(
          "span",
          {
            style: { width: Ke.icon, height: Ke.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: P.icon
          }
        )
      },
      P.key
    )),
    me && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: ve ? 0 : -1,
        onMouseDown: (P) => P.preventDefault(),
        onClick: y,
        style: { width: Ke.box, height: Ke.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(Cn, { size: Ke.icon })
      }
    )
  ] }), hr = /* @__PURE__ */ A("div", { className: "relative w-full", children: [
    /* @__PURE__ */ p(On, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: gt,
        value: me,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": C,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => dr(y.target.value),
        onFocus: () => {
          m && Ot();
        },
        onClick: () => {
          m && Ot();
        },
        onKeyDown: In,
        placeholder: l,
        style: { paddingRight: V },
        className: `${Lr("sm")} w-full pl-8`
      }
    ),
    fr(() => {
      je(""), C || Ot();
    })
  ] }), pr = /* @__PURE__ */ A("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ p(On, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: gt,
        value: me,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": C,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => dr(y.target.value),
        onFocus: () => {
          m && ve && Ot();
        },
        onClick: () => {
          m && ve && Ot();
        },
        onKeyDown: In,
        placeholder: l,
        tabIndex: ve ? 0 : -1,
        style: { paddingRight: V },
        className: `${Lr("sm")} h-full w-full pl-8`
      }
    ),
    fr(() => {
      je(""), !C && ve && Ot();
    })
  ] });
  ae(() => {
    if (!C || Kt.current) return;
    const y = tt.current;
    sn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${ze}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [C, ze]);
  const un = v(oe);
  un.current = oe;
  const _ = v(E);
  _.current = E;
  const fe = v(M == null ? void 0 : M.selectedIds);
  fe.current = M == null ? void 0 : M.selectedIds, et(() => {
    if (!C || !ht.current) return;
    const y = tt.current;
    if (!y) return;
    const P = E;
    if (!P) {
      ht.current = !1;
      return;
    }
    const X = oe.findIndex((he) => he.kind === "item" && he.hit.item.id === P);
    if (X < 0) {
      ht.current = !1;
      return;
    }
    const te = y.querySelector(`[data-search-row="${X}"]`);
    te && (sn(te, "center", y.querySelector("[data-search-scroller]") ?? null), ht.current = !1);
  }, [C, He, oe, E]);
  const ke = gs({
    open: C,
    block: "center",
    ready: pe.ready,
    scroller: () => {
      var y;
      return ((y = tt.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var X;
      let y = -1;
      const P = _.current;
      if (P)
        y = un.current.findIndex((te) => te.kind === "item" && te.hit.item.id === P);
      else {
        const te = fe.current;
        if (te && te.length) {
          const he = new Set(te);
          y = un.current.findIndex((Te) => Te.kind === "item" && he.has(Te.hit.item.id));
        }
      }
      return y < 0 ? null : ((X = tt.current) == null ? void 0 : X.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), Qe = (y, P) => {
    const X = ze === P, te = !Le && E !== void 0 && y.hit.item.id === E, he = Le ? Me.isSelected(y.hit.item.id) : te, Te = !!y.hit.item.disabled || Le && !Me.canToggle(y.hit.item.id), bt = y.hit.item.tone === "create" ? k === "light" ? { background: X ? "#d1fae5" : "#ecfdf5", color: X ? "#065f46" : "#047857" } : { background: X ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: X ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": he,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": P,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (vt) => vt.preventDefault(),
        onMouseEnter: () => Ae(P, "pointer"),
        onClick: () => tn(y),
        style: { ...Mt, ...y.hit.item.rowStyle, ...bt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${y.hit.item.rowClassName ?? ""} ${te ? "ui-item-selected" : ""} ${X ? "ui-item-highlighted" : ""} ${Te ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Le && y.hit.item.checkable !== !1 && /* @__PURE__ */ p(Pr, { checked: he, disabled: Te, indicator: M == null ? void 0 : M.indicator }),
          ie ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: ie(y.hit.item, { checked: he, disabled: Te }) }) : /* @__PURE__ */ A(at, { children: [
            y.hit.item.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ p("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            te && /* @__PURE__ */ p(cr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, Ye = (y, P) => {
    var oo;
    const X = He.has(y.group.key), te = g && !me.trim(), he = it, Te = he && ze === P, bt = Le ? n.filter((Ze) => Ze.group === y.group.key && vn.has(Ze.id) && Ze.checkable !== !1) : [], vt = bt.filter((Ze) => !Me.isDisabled(Ze.id)).map((Ze) => Ze.id), rn = Le ? (oo = M == null ? void 0 : M.groupToken) == null ? void 0 : oo.call(M, y.group.key) : void 0, to = !!rn && Me.isSelected(rn), no = to ? "all" : vt.length > 0 ? Me.groupState(vt) : "none", Kl = to ? bt.length : bt.reduce((Ze, Jl) => Ze + (Me.isSelected(Jl.id) ? 1 : 0), 0), ro = Le && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (Ze) => Ze.preventDefault(),
        onClick: (Ze) => {
          Ze.stopPropagation(), rn ? Me.toggle(rn) : vt.length && Me.toggleGroup(vt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${rn || vt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ p(
          Pr,
          {
            checked: no === "all",
            indeterminate: no === "some",
            disabled: !rn && vt.length === 0,
            indicator: M == null ? void 0 : M.indicator
          }
        )
      }
    ), io = Le ? /* @__PURE__ */ A("span", { className: `shrink-0 tabular-nums text-[10px] ${he ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Kl,
      "/",
      bt.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ p("span", { className: `shrink-0 tabular-nums ${he ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return he ? /* @__PURE__ */ A(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": te ? X : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (Ze) => Ze.preventDefault(),
        onMouseEnter: () => Ae(P, "pointer"),
        onClick: () => {
          te && Lt(y.group.key);
        },
        style: Mt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${yt.itemDefault} ${Te ? "ui-item-highlighted" : ""}`,
        children: [
          ro,
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Ze) => Ze.preventDefault(),
              onClick: (Ze) => {
                Ze.stopPropagation(), tn(y);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                y.group.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ p("span", { className: "truncate", children: y.group.label })
              ]
            }
          ),
          /* @__PURE__ */ p("span", { className: "min-w-0 flex-1" }),
          io,
          te && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${X ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": X,
              onMouseDown: (Ze) => Ze.preventDefault(),
              onClick: (Ze) => {
                Ze.stopPropagation(), Lt(y.group.key);
              },
              style: { width: Ke.box, height: Ke.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ p(
                mn,
                {
                  size: Ke.icon,
                  className: `transition-transform duration-200 ${X ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${y.group.key}`
    ) : /* @__PURE__ */ A(
      "div",
      {
        role: "presentation",
        "data-search-group": y.group.key,
        "data-search-row": P,
        style: Ht,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          ro,
          y.group.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.group.label }),
          io
        ]
      },
      `group:${y.group.key}`
    );
  }, nn = (y, P) => {
    var he;
    const X = ze === P, te = y.source === "leading" ? G : y.source === "footer" ? Z : I;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": P,
        onMouseDown: (Te) => Te.preventDefault(),
        onMouseEnter: () => Ae(P, "pointer"),
        onClick: () => tn(y),
        style: Mt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${X ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: ((he = te == null ? void 0 : te[y.actionIndex]) == null ? void 0 : he.icon) || /* @__PURE__ */ p(Jr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, ii = () => /* @__PURE__ */ p("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: J ? J({ query: me, close: Nt }) : /* @__PURE__ */ A(at, { children: [
    /* @__PURE__ */ p("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ p("div", { className: "text-xs font-medium text-zinc-500", children: H || `No matches for “${me.trim()}”` }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: K || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), mr = [];
  for (let y = 0; y < oe.length; y++) {
    const P = oe[y];
    if (P.kind === "group") {
      const X = [];
      let te = y + 1;
      for (; te < oe.length && oe[te].kind === "item" && oe[te].hit.item.group === P.group.key; )
        X.push({ row: oe[te], index: te }), te++;
      mr.push({ group: P, index: y, items: X }), y = te - 1;
    } else P.kind === "item" ? mr.push({ row: P, index: y }) : mr.push({ row: P, index: y });
  }
  const oi = C || Rt ? Vr(
    /* @__PURE__ */ A(
      "div",
      {
        ref: ee,
        id: "search-menu-panel",
        "data-theme": k,
        role: "listbox",
        "aria-label": l,
        "aria-multiselectable": Le ? !0 : void 0,
        onPointerEnter: ke.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), ke.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          Kt.current && Ae(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: pe.left,
          top: pe.top,
          width: j ?? (t === "expandable" ? T : rt || void 0),
          minWidth: U,
          maxHeight: pe.maxH,
          visibility: pe.ready ? "visible" : "hidden"
        },
        children: [
          $e && /* @__PURE__ */ A("div", { className: "shrink-0 pb-1", children: [
            Ne.map((y, P) => nn(y, P)),
            oe.length > 0 && /* @__PURE__ */ p("div", { className: yt.separator })
          ] }),
          /* @__PURE__ */ A("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            oe.length === 0 && /* @__PURE__ */ p("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: J ? J({ query: me, close: Nt }) : /* @__PURE__ */ p(at, { children: "Type to search…" }) }),
            mr.map((y) => {
              if (y.group) {
                const te = He.has(y.group.group.key), he = y.items || [];
                return /* @__PURE__ */ A(ct.Fragment, { children: [
                  Ye(y.group, Re + y.index),
                  xt && /* @__PURE__ */ p(
                    "div",
                    {
                      "data-search-group-items": y.group.group.key,
                      "aria-hidden": !te,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: te ? "1fr" : "0fr",
                        opacity: te ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ p("div", { className: "overflow-hidden flex flex-col", children: he.map((Te) => Qe(Te.row, Re + Te.index)) })
                    }
                  ),
                  !xt && he.map((Te) => Qe(Te.row, Re + Te.index))
                ] }, `group:${y.group.group.key}`);
              }
              const P = y.row, X = Re + y.index;
              return P.kind === "empty" ? ii() : P.kind === "action" ? nn(P, X) : P.kind === "item" ? Qe(P, X) : null;
            })
          ] }),
          De.length > 0 && /* @__PURE__ */ A("div", { className: "shrink-0", children: [
            /* @__PURE__ */ p("div", { className: yt.separator }),
            De.map((y, P) => nn(y, Re + oe.length + P))
          ] }),
          Le && (M == null ? void 0 : M.footer) !== !1 && /* @__PURE__ */ p(
            ws,
            {
              count: Me.count,
              max: M == null ? void 0 : M.max,
              hiddenCount: (M == null ? void 0 : M.hiddenNote) === !1 ? 0 : Me.hiddenCount,
              clear: (M == null ? void 0 : M.clear) !== !1,
              theme: k,
              onClear: Me.clear,
              hero: (M == null ? void 0 : M.mode) === "live" ? void 0 : {
                label: Rn,
                onClick: () => {
                  Me.commit(), Nt();
                },
                disabled: Me.count === 0
              }
            }
          )
        ]
      }
    ),
    ne ?? $t ?? (nt == null ? void 0 : nt.body) ?? document.body
  ) : null;
  return Se ? /* @__PURE__ */ A(at, { children: [
    /* @__PURE__ */ p("div", { ref: Ve, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    oi
  ] }) : t === "inline" ? /* @__PURE__ */ A("div", { ref: Ve, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    hr,
    oi
  ] }) : /* @__PURE__ */ p(
    eo,
    {
      expanded: ve,
      collapsedWidth: N,
      expandedWidth: T,
      rootRef: Ve,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ye ? ye({ open: C, expanded: ve, toggle: Ot }) : /* @__PURE__ */ p(
        zt,
        {
          ref: At,
          type: "button",
          variant: o,
          size: "minimal",
          theme: k === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5" }) : i,
          onClick: Ot,
          className: `w-full justify-start ${ve ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: ve ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ A(at, { children: [
        pr,
        oi
      ] })
    }
  );
}
function yn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function ql(n, e, t = "id") {
  const r = e.find((i) => yn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function th(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function nh(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Kr(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => yn(l, t) === r);
  if (i) return yn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? yn(s, t) : r;
}
function _o(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of th(n)) {
    const s = Kr(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function rh(n, e, t, r, i) {
  if (i) return _o(n, e, t);
  const o = new Set(e.map((l) => yn(l, t))), s = _o(n, e, t).filter((l) => o.has(l));
  return s.length === 0 && n.trim() !== "" ? [...r] : s;
}
function ih(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Kr(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function oh(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => yn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function sh(n, e, t = "id") {
  const r = new Set(e.map((i) => yn(i, t)));
  return n.filter((i) => !r.has(i));
}
function jo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => ql(o, e, t)).join(", ");
}
const lh = () => {
};
function hp({
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
  badge: h,
  trailing: f,
  anchoredKeys: m,
  anchoredLabel: g = "Element link anchor",
  placeholder: x = "Select…",
  readOnly: b = !1,
  inputReadOnly: $ = !1,
  disabled: E = !1,
  autoFocus: w = !1,
  defaultOpen: N = !1,
  selectAllOnOpen: T = !0,
  uppercase: j = !1,
  allowFreeText: U = !0,
  theme: R,
  className: q = "",
  style: k,
  panelWidth: O,
  panelMinWidth: H,
  initialQuery: K,
  keepAllRows: J = !1,
  maxMenuHeight: I,
  portalTarget: G,
  autoGrow: Q = !1,
  skipComma: Z = !1,
  collapsedWidth: le = 140,
  expandedWidth: M = 280,
  createLabel: ce,
  onCreateItem: be,
  onExit: Se,
  onEscape: xe,
  onTabExit: ne,
  loadItems: ye,
  emptyTitle: ie,
  emptyHint: B,
  sortItems: D,
  max: Y,
  disabledIds: Ie,
  indicator: Ce,
  browse: me,
  groupToken: je
}) {
  const Ee = Qt(), Be = R ?? (Ee == null ? void 0 : Ee.mode) ?? "light", L = We(), C = se((_) => yn(_, i), [i]), ge = ot(() => t.map(C), [t, C]), ve = ot(() => new Map(t.map((_) => [C(_), _])), [t, C]), Pe = se((_) => ql(_, t, i), [t, i]), lt = ot(() => new Set([...m ?? []].map((_) => _.toLowerCase())), [m]), [we, He] = re(!1), [mt, ze] = re(""), [Zt, Kt] = re(() => {
    const _ = K ?? "";
    return j ? _.toUpperCase() : _;
  }), [Bt, Et] = re(Zt), [Ae, Ve] = re(() => [...n]), [gt, At] = re(null), [tt, Dt] = re(!1), qe = v(null), nt = v(null), $t = v(null), yt = v(null), Mt = v(null), Ht = v(n.join("\0")), Ke = v(!1), z = v(/* @__PURE__ */ new Set()), V = v(!1), pe = v(!1), Xe = v(!1), rt = v(0), St = v(""), Rt = v([...n]), S = n.join("\0"), ee = ot(
    () => jo(n, t, i, l, c),
    [n, t, i, l, c]
  ), ue = se((_) => {
    if (a) return a([..._], t);
    if (o === "single") return _[0] ? Pe(_[0]) : "";
    const fe = _.map(Pe).join(", ");
    return Z ? fe : _.length ? `${fe}, ` : "";
  }, [a, t, o, Pe, Z]);
  ae(() => {
    we || (Ve([...n]), Rt.current = [...n], Ht.current = S);
  }, [S, we]);
  const oe = se(() => {
    if (we || b || E) return;
    Ke.current = !1, V.current = !0;
    const _ = ue(n);
    St.current = _, Rt.current = [...n], Ve([...n]), ze(_), Et(Zt), Kt(""), He(!0);
  }, [we, b, E, n, ue, Zt]);
  et(() => {
    if (!we) return;
    const _ = qe.current ?? nt.current;
    _ && (_.focus(), (_ instanceof HTMLInputElement || _ instanceof HTMLTextAreaElement) && (o === "single" && T ? _.setSelectionRange(0, _.value.length) : _.setSelectionRange(_.value.length, _.value.length)));
  }, [we]), et(() => {
    if (!Xe.current) return;
    Xe.current = !1;
    const _ = qe.current;
    _ && (_.focus(), _.setSelectionRange(_.value.length, _.value.length));
  }, [mt]), ae(() => {
    (N || w) && oe();
  }, []);
  const Ne = o === "single" ? Bt : nh(mt), De = ye ? gt ?? [] : t, Je = ot(
    () => D ? D(De, Ae) : De,
    [De, D, Ae]
  ), $e = Ne.trim(), Re = !!be && U && !tt && !!$e && !oh($e, De, i);
  ae(() => {
    if (!ye || !we) return;
    const _ = Ne.trim();
    if (!_) {
      At(null), Dt(!1);
      return;
    }
    Dt(!0);
    const fe = ++rt.current, ke = setTimeout(() => {
      ye(_).then((Qe) => {
        rt.current === fe && (At(Qe), Dt(!1));
      }).catch(() => {
        rt.current === fe && (At([]), Dt(!1));
      });
    }, 400);
    return () => clearTimeout(ke);
  }, [ye, we, Ne]);
  const ft = ot(() => {
    const _ = Je.filter((fe) => !fe.hidden).map((fe) => ({
      id: C(fe),
      label: fe.label,
      group: fe.group,
      detail: fe.detail,
      icon: fe.icon,
      disabled: !!fe.disabled || !!(Ie != null && Ie.includes(C(fe))),
      fields: fe.fields,
      keywords: fe.keywords,
      rowClassName: fe.rowClassName,
      rowStyle: fe.rowStyle
    }));
    return Re && _.unshift({
      id: $e,
      label: ce ? ce($e) : `Add “${$e}”…`,
      keywords: $e,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), _;
  }, [Je, C, Ie, Re, $e, ce]), it = se((_) => {
    const fe = _.join("\0");
    if (fe !== Ht.current) {
      if (wn(_, n)) {
        Ht.current = fe;
        return;
      }
      if (Ht.current = fe, e(_), be)
        for (const ke of sh(_, t, i))
          z.current.has(ke) || (z.current.add(ke), be(ke));
    }
  }, [n, e, be, t, i]), It = se((_, fe) => {
    !fe || !be || !U || t.some((ke) => C(ke) === _) || z.current.has(_) || (z.current.add(_), be(_));
  }, [be, U, t, C]), xt = se((_ = !0) => {
    if (!V.current || (V.current = !1, b || E)) return;
    if (Ke.current) {
      Ke.current = !1;
      return;
    }
    const fe = St.current, ke = new Set(ge), Qe = o === "single" ? (() => {
      const Ye = fe.trim();
      if (!Ye) return U ? [] : n;
      const nn = Kr(Ye, t, i);
      return !U && !ke.has(nn) ? n : [nn];
    })() : jt(
      rh(fe, t, i, n, U),
      ge
    );
    Rt.current = Qe, Ve(Qe), Et(""), He(!1), it(Qe), _ && !pe.current && (Se == null || Se());
  }, [b, E, o, t, i, ge, U, n, it, Se]), Le = se((_) => {
    He(_), _ || xt();
  }, [xt]), Ut = se(() => {
    Ke.current = !0, V.current = !1;
    const _ = ue(n);
    St.current = _, Rt.current = [...n], Ve([...n]), ze(_), Et(""), He(!1), xe == null || xe();
  }, [n, ue, xe]);
  ae(() => {
    var Qe;
    if (!we) return;
    const fe = (((Qe = $t.current) == null ? void 0 : Qe.ownerDocument) ?? document).defaultView;
    if (!fe) return;
    const ke = (Ye) => {
      Ye.key === "Escape" && (Ye.preventDefault(), Ye.stopImmediatePropagation(), Ut());
    };
    return fe.addEventListener("keydown", ke, !0), () => fe.removeEventListener("keydown", ke, !0);
  }, [we, Ut]);
  const en = se((_) => {
    const fe = jt(_, ge), ke = ue(fe);
    Rt.current = fe, St.current = ke, Ve(fe), Xe.current = !0, ze(ke);
  }, [ge, ue]), vn = se((_) => {
    const fe = _.id;
    V.current = !1;
    const ke = Pe(fe);
    Rt.current = [fe], St.current = ke, Ve([fe]), ze(ke), Et(""), He(!1), it([fe]), pe.current || Se == null || Se();
  }, [Pe, it, Se]), Me = (_) => {
    var fe, ke, Qe, Ye, nn;
    if (_.key === "Escape") {
      _.preventDefault(), Ut();
      return;
    }
    if (_.key === "Tab") {
      if (_.preventDefault(), o === "single" && we) {
        pe.current = !0;
        const ii = (fe = Mt.current) == null ? void 0 : fe.activateHighlighted();
        if (pe.current = !1, ii) {
          (ke = ne ?? Se) == null || ke(qe.current ?? void 0);
          return;
        }
      }
      we && xt(!1), (Qe = ne ?? Se) == null || Qe(qe.current ?? void 0);
      return;
    }
    if (_.key === "ArrowDown" || _.key === "ArrowUp") {
      if (_.preventDefault(), !we) {
        oe();
        return;
      }
      (Ye = Mt.current) == null || Ye.moveHighlight(_.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (_.key === "Enter") {
      if (_.preventDefault(), _.stopPropagation(), we && ((nn = Mt.current) != null && nn.activateHighlighted())) return;
      xt();
      return;
    }
  }, cn = (_) => {
    var ke;
    const fe = j ? _.target.value.toUpperCase() : _.target.value;
    if (St.current = fe, ze(fe), o === "single" && Et(fe), we || (V.current = !0, Ke.current = !1, He(!0)), o === "multiple") {
      const Qe = jt(ih(fe, t, i), ge);
      Rt.current = Qe, Ve(Qe), (ke = Mt.current) == null || ke.setSelection(Qe);
    }
  }, Rn = () => {
    if (V.current) {
      if (Ke.current) {
        Ke.current = !1;
        return;
      }
      xt();
    }
  }, Nt = se((_, fe) => {
    const ke = ve.get(_.id);
    if (!ke)
      return /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ p(Jr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: _.label })
      ] });
    const Qe = !!m && (i === "label" ? lt.has(ke.label.toLowerCase()) : m.has(C(ke))), Ye = (h == null ? void 0 : h(ke)) ?? ke.badge ?? null;
    return /* @__PURE__ */ A(at, { children: [
      d ? d(ke, fe.checked) : /* @__PURE__ */ A(at, { children: [
        ke.icon && /* @__PURE__ */ p("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: ke.icon }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: ke.label }),
        Ye && /* @__PURE__ */ p("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Ye }),
        f == null ? void 0 : f(ke)
      ] }),
      Qe && /* @__PURE__ */ p("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ p(rc, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [ve, m, lt, i, C, h, d, f, g]), an = /* @__PURE__ */ p(
    eh,
    {
      ref: Mt,
      mode: "inline",
      hideTrigger: !0,
      open: we,
      onOpenChange: Le,
      anchorRef: s === "morph" ? yt : $t,
      items: ft,
      groups: r,
      query: Ne,
      onSelect: vn,
      closeOnSelect: o === "single",
      selectedId: o === "single" && Ae[0] !== void 0 ? Kr(Ae[0], t, i) : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Ae,
        mode: "live",
        onDraftChange: en,
        onToggle: It,
        onCommit: lh,
        max: Y,
        disabledIds: Ie,
        indicator: Ce,
        groupToken: je
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (me ?? "open") === "open",
      expandableGroups: r.length > 0 && me === "accordion",
      groupExpandMode: "single",
      renderItem: Nt,
      emptyTitle: tt ? "Searching…" : ie,
      emptyHint: tt ? "Fetching matching records." : B,
      theme: Be,
      panelWidth: O,
      panelMinWidth: H,
      keepAllRows: J,
      maxMenuHeight: I,
      portalTarget: G
    }
  ), ht = s === "chip", Lt = s === "wrap", Ot = !ht && !Lt && Q, tn = !we && !ee, Xn = we ? mt : ee, In = {
    ref: qe,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: we ? mt : ht ? n.join(", ") : ee,
    disabled: E,
    readOnly: $,
    placeholder: "",
    onFocus: oe,
    onClick: oe,
    onChange: cn,
    onBlur: Rn,
    onKeyDown: Me,
    autoComplete: "off",
    spellCheck: !1
  }, dr = F(5, 7, L), fr = F(9, 12, L), hr = F(12, 14, L);
  if (s === "button") {
    const _ = (Ye) => Me(Ye), fe = we ? Ae : n, ke = jo(fe, t, i, l, c), Qe = !ke;
    return /* @__PURE__ */ A(
      "div",
      {
        ref: $t,
        "data-picker-field": !0,
        className: `relative ${q}`,
        style: k,
        onMouseDown: (Ye) => Ye.stopPropagation(),
        onContextMenu: (Ye) => {
          Ye.preventDefault(), Ye.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...fe], items: t, display: ke, open: we, toggle: oe }) }) : /* @__PURE__ */ A(
            zt,
            {
              ref: nt,
              variant: "outline",
              theme: Be === "dark" ? "dark" : "light",
              disabled: E,
              onClick: b ? void 0 : () => we ? xt() : oe(),
              onKeyDown: _,
              "data-state": we ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": we,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && fe.length > 0 ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: fe.map((Ye) => /* @__PURE__ */ p(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Pe(Ye)
                  },
                  Ye
                )) }) : /* @__PURE__ */ p("span", { className: `min-w-0 flex-1 truncate text-left ${Qe ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: ke || x }),
                /* @__PURE__ */ p(mn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          an
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ p(
      eo,
      {
        expanded: we,
        collapsedWidth: le,
        expandedWidth: M,
        rootRef: $t,
        "data-picker-field": !0,
        className: q,
        style: k,
        trigger: u ? u({ values: [...n], items: t, display: ee, open: we, toggle: oe }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              disabled: E,
              onClick: oe,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${dr}px ${fr}px`, fontSize: hr },
              children: [
                /* @__PURE__ */ p("span", { className: `min-w-0 flex-1 truncate ${tn ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: ee || x }),
                /* @__PURE__ */ p(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ A("div", { ref: yt, className: "relative h-full", children: [
          /* @__PURE__ */ p(
            "input",
            {
              ...In,
              className: `${Lr("sm")} h-full w-full`
            }
          ),
          an
        ] })
      }
    );
  const pr = ht ? F(5, 7, L) : 0, un = ht ? F(9, 12, L) : 0;
  return b ? /* @__PURE__ */ p(
    "div",
    {
      ref: $t,
      "data-picker-field": !0,
      className: `relative ${ht ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Lt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${q}`,
      style: ht ? { padding: `${pr}px ${un}px`, fontSize: F(12, 14, L), ...k } : k,
      children: /* @__PURE__ */ p(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: ee,
          className: ht ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ A(
    "div",
    {
      ref: $t,
      "data-picker-field": !0,
      className: `relative ${ht ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Lt ? "min-h-[1lh] w-full pb-[1lh]" : Ot ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${q}`,
      style: ht ? { padding: `${pr}px ${un}px`, fontSize: hr, ...k } : k,
      onMouseDown: (_) => _.stopPropagation(),
      onContextMenu: (_) => {
        _.preventDefault(), _.stopPropagation();
      },
      onAuxClick: oe,
      children: [
        ht && u ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: ee, open: we, toggle: oe }) }) : l === "chips" && !we ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((_) => /* @__PURE__ */ p(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Pe(_)
            },
            _
          )),
          n.length === 0 && /* @__PURE__ */ p("span", { className: "italic text-[color:var(--ui-text-muted)]", children: x })
        ] }) : /* @__PURE__ */ p(
          "span",
          {
            className: `pointer-events-none text-left ${ht ? "min-w-0 flex-1 truncate" : Lt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${tn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: Xn || x
          }
        ),
        Lt ? /* @__PURE__ */ p(
          "textarea",
          {
            ...In,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ p(
          "input",
          {
            ...In,
            className: Ot ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Ot ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : ht ? { caretColor: "#2563eb", color: "transparent", paddingLeft: un, paddingRight: un + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        ht && /* @__PURE__ */ p(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        an
      ]
    }
  );
}
export {
  zt as Button,
  dp as CardSection,
  Pi as CheckMark,
  qc as Checkbox,
  Vh as Checklist,
  ip as ChromeHeader,
  rp as ContentRow,
  Ph as ContextMenu,
  Oh as ContextMenuDivider,
  Lh as ContextMenuItem,
  Fh as ContextMenuSub,
  ls as DROPDOWN_MAX_HEIGHT,
  Jh as DatePicker,
  _h as DialogProvider,
  Ms as DropdownItem,
  Qr as DropdownMenu,
  na as DropdownSubmenu,
  Li as DropdownThemeContext,
  jf as FONTS,
  Uh as FloatingChrome,
  Kh as FloatingToggle,
  qf as FontMenu,
  ap as FormatToolbar,
  Fe as IS_COARSE,
  Ec as IS_TOUCH_CAPABLE,
  zh as ItemManagerDropdown,
  Wh as LongPressMenuProvider,
  xn as MORPH_EASE,
  kt as MORPH_MS,
  Ai as MORPH_OPACITY_MS,
  ur as MenuHighlightContext,
  Cs as MenuSearchContext,
  ia as Modal,
  Bh as ModalFooter,
  br as ModalFooterButton,
  fp as MorphActionField,
  Gf as MorphSearchField,
  bs as NO_SELECTION_IDS,
  up as NumberInput,
  hp as PickerField,
  Tc as PopoutWindowContext,
  cp as RICH_TEXT_STATE_IDLE,
  Yh as RadioList,
  _f as RichTextEditor,
  Vf as SCRUB_PX_PER_STEP,
  eh as SearchMenu,
  np as SectionHeader,
  tp as Seg,
  Pr as SelectionCheck,
  xs as SelectionContext,
  ws as SelectionFooter,
  op as StructureControls,
  Bi as SubmenuContext,
  $h as TAB_PILL,
  Na as TB_BTN,
  vr as TB_BTN_ICON,
  Ca as TB_DANGER,
  Ds as TB_DIVIDER,
  Ta as TB_INPUT,
  ep as TB_NUM,
  Ma as TB_PICKER,
  Gh as TB_ROW_LABEL,
  Ea as TB_SEG,
  Xh as TB_TOGGLE,
  Zh as TB_TOGGLE_OFF,
  Qh as TB_TOGGLE_ON,
  vs as TabFace,
  Ah as ThemeProvider,
  Dh as ThemeScope,
  $f as Token,
  Df as TokenChipView,
  wr as ToolButton,
  Pn as Tooltip,
  Di as ZOOM_FROM,
  Zf as buildSearchMenuRows,
  Fc as buttonCloudOf,
  Zi as clampNumber,
  Ac as cloneOverlayClose,
  F as coarsePx,
  jc as countHidden,
  lp as escapeHtml,
  jo as formatPickerValues,
  Xo as getCoarseScale,
  Gr as getDropdownClasses,
  Rh as getHardwareKeyboard,
  Mh as getLastPointerType,
  co as groupSelectionState,
  oh as hasPickerMatch,
  Lr as inputCls,
  ha as isInteractiveElement,
  Ch as isPhoneViewport,
  xi as isTouchLike,
  nh as lastPickerSegment,
  Qf as matchSearchItem,
  ms as menuAttributesOf,
  Lc as menuThemeOf,
  ns as nearestOverlayOrigin,
  _l as normalizeSpaces,
  jt as orderByCatalogue,
  Hn as overlayMorphEnabled,
  Xf as parseSearchTags,
  ih as pickerCommittedKeys,
  yn as pickerItemKey,
  ql as pickerItemLabel,
  th as pickerSegments,
  Ic as playOverlayClose,
  Rc as playOverlayOpen,
  Fo as preprocessTokenHtml,
  Kr as resolvePickerSegment,
  _o as resolvePickerText,
  sn as revealRowInScroller,
  ss as safeAreaInsets,
  wn as sameSelection,
  Rf as sanitizeRichText,
  Yf as scrubbedValue,
  Wl as searchMenuContent,
  Oc as segModeOf,
  Th as setCoarseScale,
  lo as setSelected,
  Jf as steppedValue,
  sp as stripRichText,
  If as stripTokenWrappers,
  _c as toggleSelected,
  sh as unknownPickerValues,
  Eh as useCoarse,
  We as useCoarseScale,
  gn as useCoarseSize,
  Ii as useCurrentDocument,
  ar as useCurrentWindow,
  Hh as useDialog,
  cs as useDropdownPosition,
  ks as useDropdownTheme,
  Ih as useHardwareKeyboard,
  Is as useInputSize,
  Fi as useItemSize,
  Qt as useKitTheme,
  Mc as useLastPointerType,
  jh as useLongPressOptOut,
  Hi as useMenuHighlight,
  Qc as useMenuSearch,
  Ur as useOverlayMorph,
  Ri as usePopoutWindow,
  Yn as usePortalTarget,
  gs as useRevealRowOnOpen,
  ys as useSelection,
  Wc as useSelectionContext,
  Sa as useSlidingPill,
  qh as useTouchMode,
  is as visualViewportBox
};
