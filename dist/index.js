"use client";
import { jsx as p, jsxs as A, Fragment as ut } from "react/jsx-runtime";
import at, { createContext as Xt, useContext as Gt, useState as re, useEffect as ae, useRef as v, useCallback as se, useLayoutEffect as tt, useMemo as st, useId as Jl, useImperativeHandle as qo } from "react";
import * as _e from "@radix-ui/react-dropdown-menu";
import { Minus as Vl, Check as cr, Search as On, X as Tn, Pencil as Yl, CopyPlus as Ko, Trash2 as yi, RotateCcw as Jo, Plus as Jr, ChevronRight as Dr, ChevronLeft as Vo, ArrowUp as Ul, ArrowDown as Xl, ChevronDown as mn, Underline as Gl, Strikethrough as Ql, RemoveFormatting as Zl, Link as ec, ChevronUp as tc, Anchor as nc } from "lucide-react";
import { computePosition as rc, offset as Yo, flip as Uo, shift as Xo, size as ic, useFloating as oc, autoUpdate as sc } from "@floating-ui/react-dom";
import * as dn from "@radix-ui/react-dialog";
import { createPortal as Vr } from "react-dom";
import { mergeAttributes as lc, ReactNodeViewRenderer as cc, NodeViewWrapper as ac, useEditor as uc, EditorContent as dc } from "@tiptap/react";
import { PluginKey as Yt, Plugin as ln, Selection as Bn, TextSelection as Wt, NodeSelection as qn, AllSelection as fc } from "@tiptap/pm/state";
import { DecorationSet as gr, Decoration as hc } from "@tiptap/pm/view";
import pc from "@tiptap/starter-kit";
import mc from "@tiptap/extension-placeholder";
import { TextStyle as gc, FontFamily as yc, FontSize as xc } from "@tiptap/extension-text-style";
import bc from "@tiptap/extension-color";
import vc from "@tiptap/extension-link";
import wc from "@tiptap/extension-underline";
import kc from "@tiptap/suggestion";
import { Mention as Sc } from "@tiptap/extension-mention";
import { createRoot as Nc } from "react-dom/client";
const Tc = Xt(null);
function Ri() {
  return Gt(Tc);
}
function Yn() {
  const n = Ri();
  return n ? n.document.body : null;
}
function Ai() {
  const n = Ri();
  return n ? n.document : typeof document < "u" ? document : null;
}
function ar() {
  return Ri() ?? (typeof window < "u" ? window : null);
}
const Un = typeof window < "u", He = Un && window.matchMedia("(pointer: coarse)").matches, Cc = Un && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Eh() {
  return Un && window.matchMedia("(max-width: 600px)").matches;
}
let Yr = 0.5;
const nr = /* @__PURE__ */ new Set();
function Mh(n) {
  Yr = Math.max(0, Math.min(1, n)), nr.forEach((e) => e());
}
function Go() {
  return Yr;
}
function Rh() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return nr.add(e), () => {
      nr.delete(e);
    };
  }, []), He && Yr > 0;
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
  return He ? Math.round(n + (e - n) * t) : n;
}
function gn(n, e) {
  const t = We();
  return He && t > 0 ? {
    padding: `${F(n.py, e.py, t)}px ${F(n.px, e.px, t)}px`,
    fontSize: `${F(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Qo() {
  const n = We(), e = He && n > 0;
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
function Ah() {
  return Fn;
}
function Ec() {
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
function lo(n) {
  $r !== n && ($r = n, vi.forEach((e) => e()));
}
var Wo;
if (Un) {
  const n = () => lo(es());
  for (const s of Zo) {
    const l = window.matchMedia(s);
    (Wo = l.addEventListener) == null || Wo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || lo(!0));
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
    const u = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    u[i] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, c.dispatchEvent(u);
  }, !0), window.addEventListener("click", (s) => {
    s[i] || r && Date.now() - r.time < 1e3 && Math.hypot(s.clientX - r.x, s.clientY - r.y) < 12 && (s.preventDefault(), s.stopPropagation());
  }, !0);
}
function Ih() {
  return $r;
}
function Dh() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return vi.add(e), () => {
      vi.delete(e);
    };
  }, []), $r;
}
const kt = 220, xn = "cubic-bezier(0.32, 0.72, 0, 1)", Ii = 170, Di = 0.94;
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
function Mc(n, e, t, r) {
  const i = ++n.current;
  e.style.visibility = "", e.style.pointerEvents = "", e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Di})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const o = rs(e, t);
      e.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, e.style.transition = `transform ${kt}ms ${xn}, opacity ${Ii}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", r == null || r());
      }, kt + 60);
    });
  });
}
function Rc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = rs(e, t);
  e.style.transition = `transform ${kt}ms ${xn}, opacity ${Ii}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Di})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
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
      r.isConnected && (r.style.transition = `transform ${kt}ms ${xn}, opacity ${Ii}ms ease`, r.style.transform = `scale(${Di})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, kt + 60));
    });
  });
}
function Ur(n) {
  const e = v(null), [t, r] = re(!1), i = v(null), o = v(0), s = se((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Hn(h.current) && Ac(g, a.current, i.current));
    });
  }, []), l = se(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), c = v(n.visible);
  c.current = n.visible;
  const u = v(n.visible), a = v(n.anchor ?? null);
  a.current = n.anchor ?? null;
  const d = v(n.onClosed);
  d.current = n.onClosed;
  const h = v(n.morph !== !1);
  h.current = n.morph !== !1;
  const f = v(0);
  return tt(() => {
    if (!t || !c.current || !Hn(h.current)) return;
    const m = e.current;
    m && Mc(f, m, a.current);
  }, [t, n.visible]), ae(() => {
    if (!t || !c.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), tt(() => {
    var b;
    const m = u.current;
    if (u.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Hn(h.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    Rc(f, g, a.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), ae(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), ae(() => {
    if (!t || !c.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
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
const ls = 384, Ic = is;
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
  onPosition: u
}) {
  const a = ar(), d = v(a);
  d.current = a;
  const h = v(u);
  h.current = u, tt(() => {
    if (!t) return;
    let f = 0, m = !1;
    const g = () => {
      f || (f = requestAnimationFrame(b));
    }, b = () => {
      if (f = 0, m) return;
      const C = d.current, j = n.current, J = e.current;
      if (!C || !j || !J || !J.isConnected) return;
      const R = (r == null ? void 0 : r.current) ?? J, V = Ic(C), N = ss(C.document), O = {
        x: V.x + N.left,
        y: V.y + N.top,
        width: Math.max(0, V.width - N.left - N.right),
        height: Math.max(0, V.height - N.top - N.bottom)
      }, B = l ?? ls, W = Math.min(c, B), Y = Math.max(0, J.offsetHeight - R.offsetHeight), I = Math.max(W, Math.ceil(R.scrollHeight + Y)), X = Math.min(I, B);
      J.style.maxHeight = `${X}px`;
      let Q = X;
      const te = i == null ? void 0 : i.current;
      rc(te ? {
        getBoundingClientRect: () => ({
          left: te.left,
          top: te.top,
          width: te.width,
          height: te.height,
          right: te.left + te.width,
          bottom: te.top + te.height,
          x: te.left,
          y: te.top,
          toJSON: () => {
          }
        })
      } : j, J, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Yo(o),
          Uo({ boundary: O, padding: s, fallbackStrategy: "bestFit" }),
          Xo({ boundary: O, padding: s, mainAxis: !1 }),
          ic({
            boundary: O,
            padding: s,
            apply({ availableHeight: M }) {
              Q = Math.max(W, Math.floor(Math.min(B, M))), J.style.maxHeight = `${Q}px`;
            }
          })
        ]
      }).then(({ x: M, y: le, placement: xe }) => {
        m || !Number.isFinite(M) || !Number.isFinite(le) || h.current({
          top: Math.round(le),
          left: Math.round(M),
          maxH: Q,
          side: xe.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, L = (x == null ? void 0 : x.document) ?? null, E = (x == null ? void 0 : x.visualViewport) ?? null, w = () => g();
    E == null || E.addEventListener("resize", w), E == null || E.addEventListener("scroll", w), x == null || x.addEventListener("resize", w), L == null || L.addEventListener("scroll", w, { capture: !0, passive: !0 });
    let S = null;
    return typeof ResizeObserver < "u" && (S = new ResizeObserver(w), n.current && S.observe(n.current), e.current && S.observe(e.current), r != null && r.current && S.observe(r.current)), () => {
      m = !0, f && cancelAnimationFrame(f), E == null || E.removeEventListener("resize", w), E == null || E.removeEventListener("scroll", w), x == null || x.removeEventListener("resize", w), L == null || L.removeEventListener("scroll", w, { capture: !0 }), S == null || S.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
const Dc = 14, $c = 900, as = 1e3;
let zn = { at: 0, target: null, x: 0, y: 0 };
typeof document < "u" && document.addEventListener("pointerdown", (n) => {
  zn = { at: Date.now(), target: n.target, x: n.clientX, y: n.clientY };
}, !0);
const zc = 12;
function us(n, e) {
  const t = Date.now() - zn.at < as, r = Math.hypot(e.clientX - zn.x, e.clientY - zn.y) <= zc, i = !!zn.target && n.contains(zn.target);
  return He && t && r && !i;
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
function $i(n, e = !1) {
  const t = ds(), r = v(null), i = v(0), o = (a, d, h) => {
    let f = 0;
    const m = () => {
      a.removeEventListener("click", g, !0), a.removeEventListener("pointerdown", b, !0), f && window.clearTimeout(f);
    }, g = (x) => {
      if (Math.hypot(x.clientX - d, x.clientY - h) > 14) {
        m();
        return;
      }
      x.preventDefault(), x.stopImmediatePropagation(), m();
    }, b = () => m();
    a.addEventListener("click", g, !0), a.addEventListener("pointerdown", b, !0), f = window.setTimeout(m, 600);
  }, s = (a) => {
    !He || e || a.pointerType !== "touch" || (r.current = { x: a.clientX, y: a.clientY, t: Date.now(), doc: a.currentTarget.ownerDocument });
  }, l = (a) => {
    if (!He || e || a.pointerType !== "touch") return;
    const d = r.current;
    if (r.current = null, !d) return;
    if (Math.hypot(a.clientX - d.x, a.clientY - d.y) > Dc) {
      o(d.doc, a.clientX, a.clientY);
      return;
    }
    if (Date.now() - d.t > $c) return;
    i.current = Date.now();
    const h = a.currentTarget;
    n(), h.click(), o(d.doc, a.clientX, a.clientY);
  }, c = () => {
    r.current = null;
  }, u = () => Date.now() - i.current < as;
  return {
    onPointerDown: s,
    onPointerUp: l,
    onPointerCancel: c,
    onClick: t.onClick,
    takeGhost: t.takeGhost,
    suppressSelect: u
  };
}
let In = null;
function fs(n) {
  return In == null || In(), In = n, () => {
    In === n && (In = null);
  };
}
const hs = Xt(null);
function zi(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.identityAccent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", identityAccent: o, surface: r, context: i };
}
function Li({ theme: n, children: e }) {
  return /* @__PURE__ */ p(hs.Provider, { value: n, children: e });
}
function $h({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Qt();
  return /* @__PURE__ */ p(Li, { theme: zi({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function zh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Qt(), c = zi({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ p(Li, { theme: c, children: /* @__PURE__ */ p(
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
  return Gt(hs);
}
function Lc(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function ps(n, e) {
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
function Pc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Oc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Fc(n) {
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
  const r = t ?? Fc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function ms({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = v(!1), s = v(!1), l = v(!1), c = v({ row: e, scroller: r, block: t });
  c.current = { row: e, scroller: r, block: t };
  const u = se(() => {
    o.current = !0;
  }, []);
  return tt(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: a, scroller: d, block: h } = c.current, f = a();
    f && (sn(f, h, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), ae(() => {
    if (!n || i !== !0 || !l.current) return;
    const a = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: h } = c.current;
      sn(d(), "nearest", (h == null ? void 0 : h()) ?? null);
    });
    return () => cancelAnimationFrame(a);
  }, [n, i]), { engagedRef: o, engage: u };
}
const Bc = [];
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
function Hc(n, e, t, r = {}) {
  var o;
  const i = jt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : jt([...i, e], t);
}
function co(n, e, t, r, i = {}) {
  const o = jt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), u = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), a = jt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, u);
  return a.length === 0 ? o : jt([...o, ...a], r);
}
function ao(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function _c(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function gs(n) {
  const {
    mode: e = "draft",
    selectedIds: t,
    itemIds: r,
    visibleIds: i,
    max: o,
    disabledIds: s,
    indicator: l = "box",
    onChange: c,
    onCommit: u,
    onToggle: a,
    onDraftChange: d
  } = n, [h, f] = re(() => jt(t, r)), m = st(() => new Set(s ?? []), [s]), g = st(() => new Set(h), [h]), b = o !== void 0 && h.length >= o, x = !wn(h, t), L = se((V) => {
    if (m.has(V)) return;
    const N = g.has(V), O = Hc(h, V, r, { max: o, disabledIds: s });
    wn(O, h) || (f(O), d == null || d(O), a == null || a(V, !N));
  }, [h, g, m, r, o, s, a, d]), E = se((V) => {
    const N = V.filter((W) => !m.has(W)), O = ao(h, N), B = co(h, N, O !== "all", r, { max: o, disabledIds: s });
    wn(B, h) || (f(B), d == null || d(B));
  }, [h, m, r, o, s, d]), w = se((V, N = i ?? r) => {
    const O = co(h, N, V, r, { max: o, disabledIds: s });
    wn(O, h) || (f(O), d == null || d(O));
  }, [h, i, r, o, s, d]), S = se(() => {
    h.length !== 0 && (f([]), d == null || d([]));
  }, [h, d]), C = se((V) => {
    f(jt(V ?? t, r));
  }, [t, r]), j = se(() => !u || wn(h, t) ? !1 : (u(jt(h, r)), !0), [u, h, t, r]), J = se(() => !c || wn(h, t) ? !1 : (c(jt(h, r)), !0), [c, h, t, r]), R = se((V) => ao(h, V), [h]);
  return {
    mode: e,
    indicator: l,
    draft: h,
    count: h.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: _c(h, r, i),
    isSelected: (V) => g.has(V),
    isDisabled: (V) => m.has(V),
    canToggle: (V) => !m.has(V) && (g.has(V) || !b),
    toggle: L,
    toggleGroup: E,
    setAll: w,
    clear: S,
    reset: C,
    commit: j,
    flush: J,
    cancel: C,
    groupState: R
  };
}
const ys = Xt(null), jc = () => Gt(ys), xs = Bc;
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
function Wc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: u = "accent", block: a = !1 }) {
  const d = c !== "plain", h = We(), f = F(16, 20, h), m = F(12, 14, h), g = F(12, 14, h), b = F(12, 16, h), x = F(10, 12, h), L = F(8, 10, h);
  return /* @__PURE__ */ A(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${u === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: a ? "flex" : "inline-flex", alignItems: "center", gap: L, padding: d ? `${x}px ${b}px` : void 0 },
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
        d ? /* @__PURE__ */ p(Pi, { checked: n, size: f, tone: u }) : /* @__PURE__ */ p("span", { className: "ui-checkbox-box", style: { width: f, height: f }, "aria-hidden": !0, children: n && /* @__PURE__ */ p("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ p("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ p("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const uo = "transition-[grid-template-columns] ease-out duration-150 motion-reduce:transition-none", qc = "group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr] fine:group-hover:grid-cols-[1fr] fine:group-active:grid-cols-[1fr]", Kc = "group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr] fine:group-hover:grid-cols-[0fr] fine:group-active:grid-cols-[0fr]", Jc = "group-focus-visible:opacity-100 group-data-[state=open]:opacity-100 fine:group-hover:opacity-100 fine:group-active:opacity-100", Vc = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-active:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Yc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-active:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Uc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 group-data-[state=open]:opacity-100";
function Xc(n) {
  if (!at.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function bs({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", coarseReveal: l = !1, children: c }) {
  const u = !!e && !!n, a = l && He, d = a ? " delay-200" : "", h = a ? Vc : qc, f = a ? Yc : Kc, m = a ? Uc : Jc, g = u && !t, b = !!n && (t || u), x = Xc(n), [L, E] = re({ sig: x, node: n }), [w, S] = re(null);
  x !== L.sig && (E({ sig: x, node: n }), S(L.node)), ae(() => {
    if (w == null) return;
    const j = window.setTimeout(() => S(null), 200);
    return () => window.clearTimeout(j);
  }, [w]);
  const C = w == null ? n : /* @__PURE__ */ A("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ p("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: w }, `out:${L.sig}`),
    /* @__PURE__ */ p("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${x}`)
  ] });
  return u ? /* @__PURE__ */ A(ut, { children: [
    b && (g ? /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: `grid min-w-0 ${uo}${d} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${f}`}`, children: /* @__PURE__ */ p("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: C }) }) : /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: C })),
    /* @__PURE__ */ p("span", { "data-kit-label": !0, className: `grid min-w-0 ${uo}${d} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${h}`}`, children: /* @__PURE__ */ p("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ p(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${m}`} ${g ? `pl-[var(--kit-collapse-gap)] group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${a ? "group-hover:pl-0! group-active:pl-0!" : "fine:group-hover:pl-0! fine:group-active:pl-0!"} ${r ? "pl-0!" : ""}` : ""}`,
        style: g ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ A("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ p("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ p("span", { className: "col-start-1 row-start-1", children: c })
        ] }) : c
      }
    ) }) })
  ] }) : /* @__PURE__ */ A(ut, { children: [
    b && /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    c
  ] });
}
const Lh = {
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
  reserveLabel: u,
  iconRoll: a = "up",
  icon: d,
  collapse: h = !1,
  iconWithLabel: f = !0,
  touchReveal: m = !0,
  className: g = "",
  type: b = "button",
  children: x,
  onClick: L,
  onPointerDown: E,
  onPointerUp: w,
  onPointerCancel: S,
  disabled: C,
  ...j
}) {
  const J = Qt(), R = e ?? (J == null ? void 0 : J.mode) ?? "light", V = t ?? Oc(J), N = gn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), O = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), B = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), W = "", Y = "", I = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, X = "rounded", Q = "rounded-[var(--ui-radius-btn)]", te = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, ce = {
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
  }, le = {
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
  }, xe = { base: `${Y} bg-[var(--ui-btn-solid-bg)] hover:bg-[var(--ui-btn-solid-hover-bg)] border border-[color:var(--ui-btn-solid-border)] hover:border-[color:var(--ui-btn-solid-hover-border)] text-[color:var(--ui-btn-solid-text)]`, open: "bg-[var(--ui-btn-solid-hover-bg)]!" }, Ne = {
    light: {
      subtle: { base: `${W} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      /* The primary fill is the identity header step, mode-independent (the
         app header is always dark chrome). Read from the `data-identity-accent`
         block the button carries, so a neutral modal keeps its project CTA. */
      primary: { base: `${Y} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: xe,
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${W} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${W} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${W} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${Y} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: xe,
      outline: {
        base: `${W} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${W} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, ve = j["data-state"] === "open", ne = Ne[R][n], ye = n === "primary" || n === "solid" ? O : n.startsWith("tab") ? B : N, ie = He ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, _ = F(6, 8, We()), D = F(28, 40, We()), q = V === "emerald" ? "emerald" : V ? "blue" : null, Pe = t === "emerald" ? "emerald" : t ? "blue" : (J == null ? void 0 : J.identityAccent) ?? "zinc", Ce = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", pe = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let Ie;
  if (n === "tab") {
    const k = te[R];
    Ie = `${X} ${r ? q ? ce[q].active : k.active : q ? ce[q][R === "light" ? "inactiveLight" : "inactiveDark"] : k.inactive}`;
  } else if (n === "tab-header") {
    const k = q ? r ? le[q].active : le[q].inactive : r ? M.active : M.inactive;
    Ie = `${X} ${k} ${ve ? q ? le[q].open : M.open : ""}`;
  } else
    Ie = `${Q} ${ne.base} ${ve ? ne.open : ""}`, r && (Ie = `${Ie} ${i === "neutral" ? Ce : pe[i]}`);
  const Te = !!h && !!d && !o, Oe = o ? { width: D, height: D, padding: 0, gap: 0 } : s === "minimal" ? { ...ie, gap: Te ? 0 : _ } : { ...ye, gap: Te ? 0 : _ }, P = $i(() => {
  }, C);
  return /* @__PURE__ */ p(
    "button",
    {
      type: b,
      "data-mode": R,
      "data-accent": J == null ? void 0 : J.accent,
      "data-surface": J == null ? void 0 : J.surface,
      "data-identity-accent": Pe,
      className: `${I} ${o ? "justify-center" : ""} ${Te ? "group" : ""} ${Ie} ${g}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: Oe,
      disabled: C,
      onPointerDown: (k) => {
        P.onPointerDown(k), E == null || E(k);
      },
      onPointerUp: (k) => {
        P.onPointerUp(k), w == null || w(k);
      },
      onPointerCancel: (k) => {
        P.onPointerCancel(), S == null || S(k);
      },
      onClick: (k) => L == null ? void 0 : L(k),
      ...j,
      children: o ? x : /* @__PURE__ */ p(
        bs,
        {
          icon: d,
          collapse: h,
          iconWithLabel: f,
          coarseReveal: m,
          active: r && (n.startsWith("tab") || c),
          gap: _,
          reserve: u,
          roll: a,
          children: x
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
  const s = We(), l = i ?? F(14, 18, s);
  return r === "check" ? /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ p(Vl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ p(cr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
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
function vs({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = We(), u = F(10, 14, c), a = F(6, 9, c), d = F(11, 13, c), h = s === "light" ? "light" : "dark", f = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ A(
    "div",
    {
      "data-selection-footer": !0,
      className: `shrink-0 flex items-center gap-2 border-t border-[color:var(--ui-menu-border)] ${l}`,
      style: {
        padding: `${a}px ${u}px`,
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
const Oi = Xt("dark"), ws = () => Gt(Oi), Fi = Xt({ "data-theme": "dark" }), Gc = () => Gt(Fi);
function Bi() {
  const n = We();
  return {
    padding: `${F(8, 12, n)}px ${F(12, 16, n)}px`,
    fontSize: `${F(12, 14, n)}px`,
    lineHeight: `${F(18, 22, n)}px`
  };
}
function ks() {
  const n = We();
  return {
    padding: `${F(6, 9, n)}px ${F(12, 16, n)}px ${F(2, 3, n)}px`,
    fontSize: `${F(10, 11, n)}px`,
    lineHeight: `${F(14, 16, n)}px`
  };
}
const Qc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", fo = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Zc = (n) => n ? "text-xs" : "text-[10px]";
function Xr(n) {
  const e = He && Go() > 0;
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
    headerText: `${fo(e)} font-semibold uppercase tracking-wider ${Zc(e)} ui-label`,
    // Item padding
    itemPad: Qc(e),
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
function Ss(n) {
  const e = [];
  return at.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (at.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Hi = Xt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), ur = Xt(null), _i = () => Gt(ur), Ns = Xt({ query: "", setQuery: () => {
} }), ea = () => Gt(Ns), Ts = Xt(null), ta = () => Gt(Ts), na = () => !0;
function Gr(n) {
  const e = v([]), [t, r] = re(-1), [i, o] = re(!1), [s, l] = re(0), c = se((h) => (e.current = [...e.current, h], l((f) => f + 1), () => {
    e.current = e.current.filter((f) => f !== h), l((f) => f + 1);
  }), []), u = se((h, f) => {
    r(h), o(f === "pointer");
  }, []), a = se(() => {
    o((h) => h && (r(-1), !1));
  }, []);
  return st(() => ({
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
    setHighlighted: u,
    pointerLeave: a
  }), [t, i, s, c, u, a, n]);
}
function Cs(n) {
  const e = _i(), t = v(e);
  t.current = e;
  const r = v(null);
  ae(() => {
    var c, u;
    const l = { label: n.label(), activate: n.activate, group: ((c = n.group) == null ? void 0 : c.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (u = t.current) == null ? void 0 : u.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function ji(n, e, t, r) {
  const i = v(-1);
  i.current = e.highlightedIndex;
  const o = v(e);
  o.current = e;
  const s = v(n);
  s.current = n;
  const l = v(r);
  l.current = r;
  const c = v({ text: "", time: 0 }), u = v(!1);
  u.current || (u.current = !0, t.current = (a) => {
    var g, b, x, L, E, w;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (a.metaKey || a.ctrlKey) && a.key.toLowerCase() === "a") {
      a.preventDefault(), a.stopImmediatePropagation(), d();
      return;
    }
    const h = a.target;
    if (!!h && !!h.closest("input, textarea, [contenteditable]") && (a.key.length === 1 || a.key === "Enter" || a.key === "Escape")) {
      const S = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, a);
      (!!((L = l.current) != null && L.onFieldKey) || o.current.items.length > 0) && (a.stopImmediatePropagation(), S && a.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (a.key === "ArrowDown" || a.key === "ArrowUp") {
        a.preventDefault(), a.stopImmediatePropagation();
        const S = a.key === "ArrowDown" ? 1 : -1, C = (i.current + S + m.length) % m.length;
        o.current.setHighlighted(C, "keyboard");
      } else if (a.key === "ArrowRight") {
        a.preventDefault(), a.stopImmediatePropagation();
        const S = i.current;
        S >= 0 && S < m.length && m[S].submenu && m[S].activate();
      } else if (a.key === "ArrowLeft")
        a.preventDefault(), a.stopImmediatePropagation(), (w = (E = l.current) == null ? void 0 : E.onCloseSub) == null || w.call(E);
      else if (a.key === "Enter" || a.key === " ") {
        a.preventDefault(), a.stopImmediatePropagation();
        const S = i.current;
        S >= 0 && S < m.length && m[S].activate();
      } else if (a.key.length === 1 && !a.ctrlKey && !a.metaKey && !a.altKey) {
        a.preventDefault(), a.stopImmediatePropagation();
        const S = Date.now(), C = (S - c.current.time > 500 ? "" : c.current.text) + a.key.toLowerCase();
        if (c.current = { text: C, time: S }, !C) return;
        const j = i.current + 1;
        for (let J = 0; J < m.length; J++) {
          const R = (j + J) % m.length;
          if (m[R].label.toLowerCase().startsWith(C)) {
            o.current.setHighlighted(R, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Wi(n, e, t, r, i, o, s) {
  const l = v(e);
  l.current = e;
  const c = v(n);
  c.current = n;
  const u = v(i);
  u.current = i;
  const a = v(s == null ? void 0 : s.ignoreFields);
  a.current = s == null ? void 0 : s.ignoreFields;
  const d = v(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const h = v(!1);
  h.current || (h.current = !0, o.current = (f) => {
    if (!c.current || u.current) return;
    const m = r.current;
    if (m && m.contains(f.target)) return;
    if (d.current && (f.metaKey || f.ctrlKey) && f.key.toLowerCase() === "a") {
      f.preventDefault(), f.stopImmediatePropagation(), t.current(f);
      return;
    }
    if (a.current) {
      const b = f.target;
      if (b && b.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(f.key === "ArrowDown" || f.key === "ArrowUp" || f.key === "ArrowLeft" || f.key === "ArrowRight" || f.key === "Enter" || f.key === " " || f.key.length === 1 && !f.ctrlKey && !f.metaKey && !f.altKey) || (f.preventDefault(), f.stopImmediatePropagation(), t.current(f));
  });
}
function qi(n, e) {
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
  contentClassName: u,
  maxMenuHeight: a,
  initialHighlightIndex: d,
  searchable: h = !1,
  searchPlaceholder: f,
  searchFilter: m,
  searchValue: g,
  onSearchValueChange: b,
  multiple: x
}) {
  const L = Qt(), E = ps(s, L), w = E.theme, [S, C] = re([]), [j, J] = re(null), R = Yn(), V = Ai(), N = v(null), O = v(null), B = v(n);
  B.current = n;
  const [W, Y] = re(n), [I, X] = re(""), Q = h && g !== void 0, te = Q ? g : I, ce = Q ? b ?? (() => {
  }) : X, M = v(g ?? "");
  ae(() => {
    n || (M.current = g ?? "");
  }, [n, g]);
  const le = Q && te === M.current ? "" : te, xe = Jl(), Ne = v(null), ve = We(), ne = {
    padding: `${F(8, 12, ve)}px ${F(12, 16, ve)}px`,
    fontSize: `${F(12, 14, ve)}px`
  }, [ye, ie] = re(0), _ = h && !Q;
  ae(() => {
    var Qe;
    if (!_ || !n) return;
    const $ = (Qe = O.current) == null ? void 0 : Qe.querySelector("[data-menu-items]");
    if (!$) return;
    const U = () => ie($.offsetWidth - $.clientWidth);
    U();
    const me = new ResizeObserver(U);
    return me.observe($), () => me.disconnect();
  }, [n, _, te]);
  const D = st(() => {
    if (!h) return;
    const $ = le.trim().toLowerCase();
    return $ ? (U) => {
      var me;
      return m ? m($, U.label, U.group) : U.label.toLowerCase().includes($) || (((me = U.group) == null ? void 0 : me.toLowerCase().includes($)) ?? !1);
    } : na;
  }, [le, h, m]), q = Gr(D), Pe = h && le.trim() !== "" && q.items.length === 0, Ce = !!x, pe = q.allItems.map(($) => $.itemId).filter(($) => !!$), Ie = q.items.map(($) => $.itemId).filter(($) => !!$), Te = gs({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? xs,
    itemIds: pe,
    visibleIds: Ie,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), Oe = v(Te.reset);
  Oe.current = Te.reset;
  const P = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Te.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Te.count}`;
  ae(() => {
    if (n)
      return Y(!0), Q || X(""), q.setHighlighted(d ?? -1, "keyboard"), Oe.current(), fs(() => {
        t == null || t(!1), e == null || e();
      });
    C([]);
  }, [n, d, t, e]), ae(() => {
    if (!n || !V) return;
    const $ = (U) => {
      if (U.pointerType !== "touch") return;
      const me = U.target;
      me && (O.current && O.current.contains(me) || N.current && N.current.contains(me) || me instanceof Element && me.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') || (t == null || t(!1), e == null || e()));
    };
    return V.addEventListener("pointerdown", $, { capture: !0 }), () => V.removeEventListener("pointerdown", $, { capture: !0 });
  }, [n, V, t, e]);
  const k = se(() => {
    const $ = N.current;
    if (!$) return null;
    const U = $.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), ge = Ur({
    visible: n,
    morph: c,
    anchor: k,
    onClosed: () => Y(!1)
  }), be = v(() => {
  }), De = v(() => {
  }), ct = v(() => {
  }), we = se(($) => {
    if ($.key === "Enter") {
      const U = q.highlightedIndex, me = q.items[U >= 0 ? U : 0];
      return me == null || me.activate(), !0;
    }
    return $.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [q, t, e]);
  ji(n && S.length === 0, q, be, {
    onFieldKey: we,
    onSelectAll: Ce ? () => Te.setAll(!0) : void 0
  }), qi(n, De), Wi(n, q, be, O, S.length > 0, ct, {
    ignoreFields: Q,
    selectAll: Ce
  });
  const je = v(null), Ge = se(($) => {
    var U;
    if ($) {
      $.addEventListener("keydown", be.current, { capture: !0 }), $.addEventListener("wheel", De.current, { passive: !1 });
      const me = $.ownerDocument;
      je.current = me, me.addEventListener("keydown", ct.current, { capture: !0 }), $e(!0);
    } else
      (U = je.current) == null || U.removeEventListener("keydown", ct.current, { capture: !0 }), je.current = null, $e(!1);
    O.current = $, ge($);
  }, [ge]), [Me, Zt] = re({ top: 0, left: 0, maxH: ls, side: "bottom", ready: !1 }), [Kt, Bt] = re(0), [Et, $e] = re(!1);
  ae(() => {
    n && N.current && Bt(N.current.getBoundingClientRect().width);
  }, [n]), cs({
    anchorRef: N,
    panelRef: O,
    open: n && Et,
    maxHeight: a,
    onPosition: Zt
  }), ae(() => {
    var $;
    if (Me.ready && n) {
      if (h) {
        ($ = Ne.current ?? N.current) == null || $.focus();
        return;
      }
      const U = O.current;
      U && U.ownerDocument.activeElement !== U && !U.contains(U.ownerDocument.activeElement) && U.focus();
    }
  }, [Me.ready, n, h]), ae(() => {
    if (!n || !h) return;
    if (q.items.length === 0) {
      q.highlightedIndex !== -1 && q.setHighlighted(-1, "keyboard");
      return;
    }
    const $ = q.highlightedIndex;
    ($ < 0 || $ >= q.items.length) && q.setHighlighted(0, "keyboard");
  }, [n, te, h, q.items.length]), tt(() => {
    var U;
    if (!n || q.highlightedIndex < 0 || q.pointerDriven) return;
    const $ = (U = O.current) == null ? void 0 : U.querySelector(`[data-ei="${q.highlightedIndex}"]`);
    sn($, "nearest");
  }, [n, q.highlightedIndex, q.pointerDriven]);
  const Ve = se(($) => {
    if (!(!$ && !B.current)) {
      if (!$ && It.current) {
        if (Q) return;
        nt.current = !0;
      }
      t ? t($) : $ || e == null || e();
    }
  }, [t, e]), gt = v(W);
  gt.current = W;
  const It = v(!1), nt = v(!1), Dt = se(() => {
    if (!B.current && gt.current) {
      if (nt.current) {
        nt.current = !1, It.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), qe = at.isValidElement(r) ? r : null, rt = v(!1), $t = se(() => {
    const $ = N.current;
    $ && (rt.current = !0, $.focus(), setTimeout(() => {
      rt.current = !1;
    }, 0));
  }, []), yt = qe ? at.cloneElement(qe, {
    ref: ($) => {
      N.current = $;
      const U = qe.props.ref;
      typeof U == "function" ? U($) : U && (U.current = $);
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
      "aria-controls": n ? `${xe}-content` : void 0,
      "aria-activedescendant": n && q.highlightedIndex >= 0 ? `${xe}-opt-${q.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: ($) => {
      var U, me;
      (me = (U = qe.props).onPointerDownCapture) == null || me.call(U, $), It.current = !0, nt.current = !1, setTimeout(() => {
        It.current = !1;
      }, 0);
    },
    onPointerDown: ($) => {
      var U, me;
      if ((me = (U = qe.props).onPointerDown) == null || me.call(U, $), Q) {
        $.preventDefault();
        const Qe = B.current;
        Qe || t == null || t(!0);
        const it = N.current;
        it == null || it.focus(), !Qe && it instanceof HTMLInputElement && it.select();
      } else !B.current && gt.current && !nt.current && (t == null || t(!0));
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: ($) => {
      var U, me;
      (me = (U = qe.props).onKeyDownCapture) == null || me.call(U, $), Q && $.key === " " && $.stopPropagation();
    },
    onClick: ($) => {
      var U, me;
      (me = (U = qe.props).onClick) == null || me.call(U, $), Dt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: ($) => {
      var U, me;
      if (rt.current) {
        rt.current = !1;
        return;
      }
      (me = (U = qe.props).onFocus) == null || me.call(U, $);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: ($) => {
      var me, Qe, it, St;
      if ((Qe = (me = qe.props).onBlur) == null || Qe.call(me, $), !Q || !B.current) return;
      const U = $.relatedTarget;
      U && ((it = O.current) != null && it.contains(U) || (St = N.current) != null && St.contains(U)) || setTimeout(() => {
        var Z;
        const Rt = N.current;
        if (!Rt || !B.current) return;
        const T = Rt.ownerDocument.activeElement;
        T && (Rt.contains(T) || (Z = O.current) != null && Z.contains(T)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: ($) => {
      var U, me;
      if ((me = (U = qe.props).onKeyDown) == null || me.call(U, $), !(!Q || !B.current)) {
        if ($.key === "ArrowDown" || $.key === "ArrowUp") {
          $.preventDefault();
          const Qe = q.items;
          if (Qe.length === 0) return;
          const it = $.key === "ArrowDown" ? 1 : -1, St = (q.highlightedIndex + it + Qe.length) % Qe.length;
          q.setHighlighted(St, "keyboard");
        } else if ($.key === "Enter") {
          $.preventDefault();
          const Qe = q.highlightedIndex, it = q.items[Qe >= 0 ? Qe : 0];
          it == null || it.activate();
        }
      }
    }
  }) : r, Mt = /* @__PURE__ */ A("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ A("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      le.trim(),
      "”"
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), Ht = _ || Ce, Ke = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${Ht ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ A(_e.Root, { open: n || W, onOpenChange: Ve, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: yt }),
    /* @__PURE__ */ p(_e.Portal, { container: R ?? void 0, children: /* @__PURE__ */ p(Oi.Provider, { value: w, children: /* @__PURE__ */ p(Fi.Provider, { value: E.attrs, children: /* @__PURE__ */ p(Hi.Provider, { value: { chain: S, setChain: C, morph: c, keyboardOpened: j, setKeyboardOpened: J }, children: /* @__PURE__ */ p(ur.Provider, { value: q, children: /* @__PURE__ */ p(Ns.Provider, { value: { query: te, setQuery: ce }, children: /* @__PURE__ */ p(ys.Provider, { value: Ce ? Te : null, children: /* @__PURE__ */ p(Ts.Provider, { value: xe, children: /* @__PURE__ */ A(
      _e.Content,
      {
        id: `${xe}-content`,
        ref: Ge,
        tabIndex: Q ? void 0 : -1,
        ...E.attrs,
        "data-ui-fixed": !0,
        className: `${Ke} ${o || ""} ${u || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Me.left,
          top: Me.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Kt || void 0,
          maxHeight: Me.maxH,
          visibility: Me.ready ? "visible" : "hidden"
        },
        onPointerLeave: q.pointerLeave,
        onPointerDownOutside: ($) => {
          const U = $.target;
          U != null && U.closest('[role="menu"], [data-radix-menu-content]') && $.preventDefault(), U && N.current && N.current.contains(U) && $.preventDefault();
        },
        onInteractOutside: ($) => {
          $.type === "dismissableLayer.focusOutside" && S.length > 0 && $.preventDefault();
        },
        onFocusCapture: Q ? ($) => {
          $.target === $.currentTarget && ($.stopPropagation(), $t());
        } : void 0,
        onFocusOutside: Q ? ($) => {
          var me;
          const U = $.target;
          U && (U === N.current || (me = N.current) != null && me.contains(U)) && $.preventDefault();
        } : void 0,
        onCloseAutoFocus: Q ? ($) => {
          $.preventDefault(), $t();
        } : void 0,
        children: [
          _ && /* @__PURE__ */ p("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ye }, children: /* @__PURE__ */ A("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: ne, children: [
            /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: Ne,
                value: te,
                onChange: ($) => ce($.target.value),
                placeholder: f ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            te ? /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: ($) => $.stopPropagation(),
                onClick: () => {
                  var $;
                  ce(""), ($ = Ne.current) == null || $.focus();
                },
                children: /* @__PURE__ */ p(Tn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ p("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          Ht ? /* @__PURE__ */ A("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Pe && Mt
          ] }) : /* @__PURE__ */ A(ut, { children: [
            l,
            Pe && Mt
          ] }),
          Ce && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ p(
            vs,
            {
              count: Te.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Te.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: w,
              onClear: Te.clear,
              hero: {
                label: P,
                onClick: () => {
                  Te.commit(), Ve(!1);
                },
                disabled: Te.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function ra({
  item: n,
  isActive: e,
  itemSize: t,
  itemRender: r,
  closeOnSelect: i,
  onSelect: o,
  d: s
}) {
  const l = $i(() => o(n.id));
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
function Ph({
  open: n,
  onClose: e,
  items: t,
  activeId: r,
  onSelect: i,
  onRename: o,
  onDuplicate: s,
  onDelete: l,
  onCreate: c,
  onImport: u,
  onExport: a,
  onReset: d,
  onTrash: h,
  closeOnSelect: f,
  readOnly: m = !1,
  theme: g,
  align: b,
  label: x,
  header: L,
  itemLabel: E,
  trigger: w,
  minItems: S = 1,
  itemRender: C,
  morph: j = !0,
  contentClassName: J
}) {
  const R = Xr(), V = Bi(), [N, O] = re(null), [B, W] = re(""), Y = v(B);
  Y.current = B;
  const I = v(null), X = v(null), [Q, te] = re(null), ce = se((ne) => {
    X.current = ne, te(ne);
  }, []), M = ms({
    open: n,
    scroller: () => X.current,
    row: () => {
      var ne;
      return ((ne = X.current) == null ? void 0 : ne.querySelector('[data-active="1"]')) ?? null;
    }
  });
  ae(() => {
    if (!n) return;
    const ne = (ie) => {
      var Ie, Te;
      const _ = ie.target;
      if (_ && _.closest("input, textarea, [contenteditable]")) {
        N && _ === I.current && (ie.key === "Enter" ? (ie.preventDefault(), ie.stopImmediatePropagation(), xe()) : ie.key === "Escape" && (ie.preventDefault(), ie.stopImmediatePropagation(), Ne()));
        return;
      }
      const D = (Ie = X.current) == null ? void 0 : Ie.closest(".ui-menu");
      if (!D || !D.contains(ie.target)) return;
      const q = D.ownerDocument, Pe = [...D.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ce = [...D.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], pe = [...Pe, ...Ce];
      if (ie.key === "ArrowDown" || ie.key === "ArrowUp") {
        ie.preventDefault(), ie.stopImmediatePropagation();
        const Oe = q.activeElement;
        let P = Oe ? pe.indexOf(Oe) : -1;
        if (P < 0 && Oe) {
          const De = Oe.closest("[data-im-row]"), ct = De == null ? void 0 : De.querySelector('[role="menuitem"]:first-child');
          ct && (P = Pe.indexOf(ct));
        }
        const k = ie.key === "ArrowDown" ? 1 : -1, ge = P < 0 ? k === 1 ? 0 : pe.length - 1 : (P + k + pe.length) % pe.length, be = pe[ge];
        be == null || be.focus({ preventScroll: !0 }), sn((be == null ? void 0 : be.closest("[data-im-row]")) ?? be, "nearest", X.current);
        return;
      }
      if (ie.key === "ArrowLeft" || ie.key === "ArrowRight") {
        const Oe = q.activeElement, P = Oe == null ? void 0 : Oe.closest("[data-im-row]");
        if (!P) return;
        ie.preventDefault(), ie.stopImmediatePropagation();
        const k = [...P.querySelectorAll('[role="menuitem"]')].slice(1);
        if (k.length === 0) return;
        const ge = Oe && P.contains(Oe) ? k.indexOf(Oe) : -1, be = ie.key === "ArrowRight" ? 1 : -1, De = ge < 0 ? 0 : (ge + be + k.length) % k.length;
        (Te = k[De]) == null || Te.focus({ preventScroll: !0 });
        return;
      }
    }, ye = (Q == null ? void 0 : Q.ownerDocument) ?? null;
    return ye == null || ye.addEventListener("keydown", ne, { capture: !0 }), () => ye == null ? void 0 : ye.removeEventListener("keydown", ne, { capture: !0 });
  }, [n, N, Q]), ae(() => {
    if (!N) return;
    const ne = t.find((D) => D.id === N);
    ne && !B && W(ne.name);
    const ye = requestAnimationFrame(() => {
      const D = I.current;
      D && (D.focus(), D.select());
    });
    let ie = 0;
    const _ = window.setInterval(() => {
      const D = I.current;
      if (ie++, !D || ie > 12) {
        clearInterval(_);
        return;
      }
      D.ownerDocument.activeElement !== D && (D.focus(), D.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ye), clearInterval(_);
    };
  }, [N]), ae(() => {
    if (N) {
      const ne = t.find((ye) => ye.id === N);
      ne && !B && W(ne.name);
    }
  }, [N, t]);
  const le = (ne, ye) => {
    O(ne), W(ye);
  }, xe = () => {
    N && Y.current.trim() && o(N, Y.current.trim()), O(null);
  }, Ne = () => {
    O(null);
  }, ve = E || L.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ A(Qr, { open: n, onOpenChange: (ne) => {
    ne ? (O(null), W("")) : (N && B.trim() && o(N, B.trim()), O(null), W("")), (!ne || !m) && e(ne);
  }, width: "w-80", theme: g, align: b, trigger: w, morph: j, contentClassName: J, children: [
    /* @__PURE__ */ p("div", { className: `shrink-0 ${R.headerText}`, children: L }),
    /* @__PURE__ */ p("div", { ref: ce, "data-im-list": !0, onPointerEnter: M.engage, onPointerDown: M.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((ne) => {
      const ye = ne.id === r, ie = N === ne.id;
      return /* @__PURE__ */ p("div", { "data-im-row": ne.id, "data-active": ye ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ye || ie ? R.rowActiveBg : R.rowHoverBg} ${N && !ie ? "opacity-40 pointer-events-none" : ""}`, children: ie ? /* @__PURE__ */ A(ut, { children: [
        /* @__PURE__ */ p("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ p(
          "input",
          {
            ref: I,
            autoFocus: !0,
            value: B,
            onChange: (_) => W(_.target.value),
            onKeyDown: (_) => {
              _.key === "Enter" && (_.preventDefault(), _.stopPropagation(), xe()), _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), Ne());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: V
          }
        ) }),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${R.editConfirm}`,
            onSelect: (_) => {
              _.preventDefault(), xe();
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
            onSelect: (_) => {
              _.preventDefault(), Ne();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(Tn, { className: R.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ A(ut, { children: [
        /* @__PURE__ */ p(
          ra,
          {
            item: ne,
            isActive: ye,
            itemSize: V,
            itemRender: C,
            closeOnSelect: f,
            onSelect: i,
            d: R
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? R.btnActive : R.btnBase}`,
            onSelect: (_) => {
              _.preventDefault(), le(ne.id, ne.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Yl, { className: R.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? R.btnActive : R.btnBase}`,
            onSelect: (_) => {
              _.preventDefault();
              const D = s(ne.id);
              D && le(D, `${ne.name} Copy`);
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
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= S ? R.btnDisabled : ye ? R.btnDangerActive : R.btnDanger}`,
            onSelect: (_) => {
              _.preventDefault(), l(ne.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= S,
            children: /* @__PURE__ */ p(yi, { className: R.btnIcon })
          }
        )
      ] }) }, ne.id);
    }) }),
    /* @__PURE__ */ A("div", { className: `shrink-0 ${N ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ A(ut, { children: [
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
      (c || u || a || h) && /* @__PURE__ */ p(_e.Separator, { className: R.separator }),
      c && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
          onSelect: (ne) => {
            ne.preventDefault();
            const ye = c();
            ye && le(ye, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(Jr, { className: `${R.btnIcon} ${R.icon}` }),
            "New ",
            ve
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
              /* @__PURE__ */ p("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
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
function Es({
  onClick: n,
  icon: e,
  disabled: t = !1,
  variant: r = "default",
  className: i = "",
  children: o,
  keepOpen: s = !1,
  selected: l = !1,
  rightAction: c,
  trailing: u,
  group: a,
  itemId: d
}) {
  var te;
  ws();
  const h = Xr(), f = Bi(), m = ks(), g = v(!1), b = v(null), x = jc(), L = !!x && d !== void 0, E = x && d !== void 0 ? x.isSelected(d) : l, w = t || (x && d !== void 0 ? !x.canToggle(d) : !1), S = () => {
    w || (x && d !== void 0 ? x.toggle(d) : n());
  }, C = $i(S, w), { myIndex: j, highlighted: J, setPointer: R, api: V } = Cs({
    label: () => Ss(o),
    activate: S,
    disabled: w,
    group: a,
    itemId: d
  }), { query: N } = ea(), O = N.trim() !== "" && j < 0, B = ta(), W = a == null ? void 0 : a.trim(), Y = !!W && j >= 0 && (j === 0 || ((te = V == null ? void 0 : V.items[j - 1]) == null ? void 0 : te.group) !== W), I = W && x ? ((V == null ? void 0 : V.items) ?? []).filter((ce) => ce.group === W && ce.itemId).map((ce) => ce.itemId).filter((ce) => !x.isDisabled(ce)) : [], X = x && I.length > 0 ? x.groupState(I) : "none", Q = r === "danger" ? h.itemDanger : h.itemDefault;
  return /* @__PURE__ */ A(ut, { children: [
    Y && /* @__PURE__ */ p(
      "div",
      {
        "data-menu-group": W,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && I.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && I.length > 0 ? /* @__PURE__ */ A("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${W}`,
              onMouseDown: (ce) => ce.preventDefault(),
              onClick: () => x.toggleGroup(I),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ p(
                Lr,
                {
                  checked: X === "all",
                  indeterminate: X === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: W })
        ] }) : W
      }
    ),
    /* @__PURE__ */ A(
      _e.Item,
      {
        ref: b,
        id: B && j >= 0 ? `${B}-opt-${j}` : void 0,
        "data-ei": j >= 0 ? j : void 0,
        ...L ? { role: "menuitemcheckbox", "aria-checked": E } : {},
        style: { ...f, display: O ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Q} ${L ? "" : l ? "ui-item-selected" : ""} ${J ? "ui-item-highlighted" : ""} ${w ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (ce) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (C.takeGhost()) {
            ce.preventDefault();
            return;
          }
          if (C.suppressSelect()) {
            (s || L) && ce.preventDefault();
            return;
          }
          if (L) {
            ce.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && ce.preventDefault(), n();
        },
        onClick: C.onClick,
        onPointerDown: C.onPointerDown,
        onPointerUp: C.onPointerUp,
        onPointerCancel: C.onPointerCancel,
        onPointerEnter: () => {
          R(j);
        },
        onTouchStart: () => {
        },
        disabled: w,
        children: [
          L && /* @__PURE__ */ p(Lr, { checked: E, disabled: w, indicator: x.indicator }),
          e && /* @__PURE__ */ p("span", { className: `${h.icon} shrink-0`, children: e }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: o }),
          u && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: u }),
          c && /* @__PURE__ */ p(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${h.rightAction}`,
              title: c.title,
              onPointerDown: (ce) => {
                ce.stopPropagation(), ce.preventDefault(), g.current = !0, c.onClick();
              },
              onPointerUp: (ce) => ce.stopPropagation(),
              onClick: (ce) => {
                ce.stopPropagation(), ce.preventDefault();
              },
              children: c.icon
            }
          )
        ]
      }
    )
  ] });
}
function ia({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s, touchPresentation: l }) {
  const { chain: c, setChain: u, morph: a, keyboardOpened: d, setKeyboardOpened: h } = Gt(Hi), f = c.includes(n), m = l ?? "replace", g = He && m === "accordion", b = He && m === "replace", x = c[c.length - 1] === n;
  ws();
  const L = Gc(), E = Yn(), w = v(null), S = v(null), C = v(null), j = v(0), J = v(0), R = v(null), [V, N] = re(f), [O, B] = re(!1), W = !f && V;
  ae(() => {
    f && N(!0);
  }, [f]);
  const Y = () => u((P) => {
    const k = P.indexOf(n);
    return k >= 0 ? P.slice(0, k) : P;
  }), I = (P, k) => {
    var je;
    const ge = (je = w.current) == null ? void 0 : je.ownerDocument;
    if (!ge) return;
    let be = 0;
    const De = () => {
      ge.removeEventListener("click", ct, !0), ge.removeEventListener("pointerdown", we, !0), be && window.clearTimeout(be);
    }, ct = (Ge) => {
      if (Math.hypot(Ge.clientX - P, Ge.clientY - k) > 14) {
        De();
        return;
      }
      const Me = Ge.target;
      if (Me != null && Me.closest('[role="menuitem"]')) {
        De();
        return;
      }
      Ge.preventDefault(), Ge.stopImmediatePropagation(), De();
    }, we = () => De();
    ge.addEventListener("click", ct, !0), ge.addEventListener("pointerdown", we, !0), be = window.setTimeout(De, 600);
  }, X = () => {
    if (b && Hn(a)) {
      const P = S.current, k = C.current;
      if (P && k && P.isConnected && k.isConnected) {
        const ge = P.getBoundingClientRect();
        delete k.dataset.submenuOpen, delete k.dataset.submenuInert, P.style.visibility = "hidden", zr(J, k, ge);
      }
    }
    Y();
  }, Q = Gr(), te = _i(), ce = v(te);
  ce.current = te;
  const M = v(null);
  ae(() => {
    var k;
    const P = {
      label: e,
      activate: () => {
        h(n), u((ge) => ge.includes(n) ? ge : [...ge, n]);
      },
      submenu: !0
    };
    return M.current = P, (k = ce.current) == null ? void 0 : k.register(P);
  }, []);
  const le = te && M.current ? te.items.indexOf(M.current) : -1, xe = le >= 0 && le === te.highlightedIndex, Ne = se(() => {
    const P = w.current;
    if (!P) return null;
    const k = P.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), ve = Ur({
    visible: f,
    /* Replace owns the transition (FLIP via playRectMorph on both edges);
       the generic scale/fade would fight it. Desktop side flyouts keep it. */
    morph: a && !b,
    anchor: Ne,
    onClosed: () => N(!1)
  }), ne = v(() => {
  }), ye = v(() => {
  }), ie = v(() => {
  });
  ji(f && x, Q, ne, {
    onCloseSub: () => {
      X(), te && le >= 0 && te.setHighlighted(le, "keyboard");
    }
  });
  const _ = v(d);
  _.current = d, ae(() => {
    f && (_.current === n ? (Q.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var P;
      return (P = S.current) == null ? void 0 : P.focus();
    }), h(null)) : Q.setHighlighted(-1, "keyboard"));
  }, [f]), qi(f, ye), Wi(f, Q, ne, S, !x, ie), ae(() => {
    if (!g || !f) return;
    const P = w.current, k = (P == null ? void 0 : P.closest("[data-submenu-panel]")) ?? (P == null ? void 0 : P.closest('[role="menu"]'));
    if (k)
      return k.dataset.submenuOpen = "accordion", () => {
        delete k.dataset.submenuOpen;
      };
  }, [g, f]);
  const [D, q] = re(null);
  tt(() => {
    if (!f || !He || g) {
      q(null);
      return;
    }
    const P = w.current, k = P == null ? void 0 : P.closest('[role="menu"]');
    if (!P || !k) return;
    C.current = k;
    const ge = P.getBoundingClientRect(), be = k.getBoundingClientRect(), De = parseInt(getComputedStyle(k).zIndex, 10) || 0;
    q({
      presentation: "replace",
      sideOffset: be.left - ge.right,
      alignOffset: be.top - ge.top,
      width: be.width,
      childZ: De + 2
    }), k.dataset.submenuOpen = "replace", S.current && Hn(a) && (S.current.style.visibility = "hidden");
    const ct = window.setTimeout(() => {
      k.isConnected && (k.dataset.submenuInert = "replace");
    }, 320);
    return () => {
      window.clearTimeout(ct), delete k.dataset.submenuOpen, delete k.dataset.submenuInert, C.current === k && (C.current = null);
    };
  }, [f, m]), tt(() => {
    if (!f || !b || !D || !O || !Hn(a)) return;
    const P = S.current, k = C.current;
    if (!P || !k) return;
    P.style.visibility = "hidden";
    let ge = 0, be = 0;
    return ge = requestAnimationFrame(() => {
      be = requestAnimationFrame(() => {
        if (!P.isConnected || !k.isConnected) return;
        const De = k.getBoundingClientRect();
        !De.width || !De.height || (P.style.visibility = "visible", zr(j, P, De));
      });
    }), () => {
      cancelAnimationFrame(ge), cancelAnimationFrame(be);
    };
  }, [f, b, D, O]), at.useLayoutEffect(() => {
    var k;
    if (!f || Q.highlightedIndex < 0 || Q.pointerDriven) return;
    const P = (k = S.current) == null ? void 0 : k.querySelector(`[data-ei="${Q.highlightedIndex}"]`);
    sn(P, "nearest", S.current);
  }, [f, Q.highlightedIndex, Q.pointerDriven]);
  const Pe = v(null), Ce = se((P) => {
    var k;
    if (P) {
      P.addEventListener("keydown", ne.current, { capture: !0 }), P.addEventListener("wheel", ye.current, { passive: !1 });
      const ge = P.ownerDocument;
      Pe.current = ge, ge.addEventListener("keydown", ie.current, { capture: !0 });
    } else
      (k = Pe.current) == null || k.removeEventListener("keydown", ie.current, { capture: !0 }), Pe.current = null;
    S.current = P, B(!!P), ve(P);
  }, [ve]), pe = We(), Ie = { padding: `${F(8, 12, pe)}px ${F(12, 16, pe)}px`, fontSize: F(12, 14, pe) }, Te = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${xe ? " ui-item-highlighted" : ""}${W ? " ui-sub-closing" : ""}`, Oe = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ A(_e.Sub, { open: f || V, onOpenChange: (P) => u((k) => {
    if (!P) {
      const ge = k.indexOf(n);
      return ge >= 0 ? k.slice(0, ge) : k;
    }
    return k.includes(n) ? k : [...k, n];
  }), children: [
    /* @__PURE__ */ A(
      _e.SubTrigger,
      {
        ref: w,
        "data-ei": le >= 0 ? le : void 0,
        "data-submenu-header": He ? "true" : void 0,
        style: Ie,
        className: Te,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          te && le >= 0 && te.setHighlighted(le, "pointer");
        },
        onPointerDown: (P) => {
          P.pointerType === "pen" ? (P.preventDefault(), u((k) => f ? k.slice(0, k.indexOf(n)) : [...k, n])) : b && P.pointerType === "touch" && (R.current = { x: P.clientX, y: P.clientY });
        },
        onPointerUp: (P) => {
          if (!b || P.pointerType !== "touch") return;
          const k = R.current;
          R.current = null, !(!k || f) && (Math.hypot(P.clientX - k.x, P.clientY - k.y) > 8 || (h(null), I(P.clientX, P.clientY), u((ge) => ge.includes(n) ? ge : [...ge, n])));
        },
        onPointerCancel: () => {
          R.current = null;
        },
        onClick: (P) => {
          if (us(P.currentTarget, P)) {
            P.preventDefault();
            return;
          }
          !g || !f || (P.preventDefault(), P.stopPropagation(), X());
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
        ...L,
        "data-submenu-presentation": D == null ? void 0 : D.presentation,
        className: Oe,
        align: D ? "start" : void 0,
        sideOffset: D ? D.sideOffset : 8,
        alignOffset: D ? D.alignOffset : -4,
        collisionPadding: 8,
        style: D ? { width: D.width, zIndex: D.childZ } : void 0,
        onPointerLeave: Q.pointerLeave,
        onFocusOutside: (P) => {
          const k = P.target;
          k != null && k.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') && P.preventDefault();
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
                Es,
                {
                  keepOpen: !0,
                  onClick: X,
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
const Dn = 8, Oh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Qt(), u = s ? { theme: s, attrs: { "data-theme": s } } : c ? ps(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: a } = u, d = We(), h = F(12, 14, d), f = v(null), m = ar(), [g, b] = re(!1), [x, L] = re([]), [E, w] = re(null), S = Gr();
  ae(() => {
    if (n)
      return S.setHighlighted(-1, "keyboard"), fs(r);
  }, [n, r]);
  const C = v({ left: e, top: t });
  n && (C.current = { left: e, top: t });
  const j = se(() => ({ left: C.current.left, top: C.current.top, width: 0, height: 0 }), []), J = Ur({
    visible: !0,
    morph: l,
    anchor: j,
    cloneOnUnmount: !0
  }), R = v(() => {
  }), V = v(() => {
  }), N = v(() => {
  });
  ji(n, S, R), tt(() => {
    if (!n || S.highlightedIndex < 0 || S.pointerDriven) return;
    const I = f.current;
    sn(
      I == null ? void 0 : I.querySelector(`[data-ei="${S.highlightedIndex}"]`),
      "nearest",
      I
    );
  }, [n, S.highlightedIndex, S.pointerDriven]), qi(n, V), Wi(n, S, R, f, x.length > 0, N);
  const O = v(null), B = se((I) => {
    var X;
    if (I) {
      I.addEventListener("keydown", R.current, { capture: !0 }), I.addEventListener("wheel", V.current, { passive: !1 });
      const Q = I.ownerDocument;
      O.current = Q, Q.addEventListener("keydown", N.current, { capture: !0 });
    } else
      (X = O.current) == null || X.removeEventListener("keydown", N.current, { capture: !0 }), O.current = null;
    f.current = I, b(!!I), J(I);
  }, [J]), [W, Y] = re(null);
  return tt(() => {
    var _;
    if (!n || !g || !f.current) return;
    const I = f.current, X = I.offsetWidth, Q = I.offsetHeight, te = m ?? null, ce = te ? is(te) : { x: 0, y: 0, width: 0, height: 0 }, M = te ? ss(te.document) : { left: 0, right: 0, top: 0, bottom: 0 }, le = (_ = o == null ? void 0 : o.current) == null ? void 0 : _.getBoundingClientRect(), xe = (le ? le.right : ce.x + ce.width) - M.right, Ne = (le ? le.bottom : ce.y + ce.height) - M.bottom, ve = (le ? le.left : ce.x) + M.left, ne = (le ? le.top : ce.y) + M.top;
    let ye = Math.max(ne + Dn, C.current.top), ie = Math.max(ve + Dn, C.current.left);
    ie + X > xe && (ie = Math.max(ve + Dn, xe - X - Dn)), ye + Q > Ne && (ye = Math.max(ne + Dn, Ne - Q - Dn)), Y({ left: ie, top: ye });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ A(_e.Root, { open: n, onOpenChange: (I) => {
    I || r();
  }, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: /* @__PURE__ */ p("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ p(_e.Portal, { children: /* @__PURE__ */ p(Oi.Provider, { value: a, children: /* @__PURE__ */ p(Fi.Provider, { value: u.attrs, children: /* @__PURE__ */ p(Hi.Provider, { value: { chain: x, setChain: L, morph: l, keyboardOpened: E, setKeyboardOpened: w }, children: /* @__PURE__ */ p(ur.Provider, { value: S, children: /* @__PURE__ */ p(
      _e.Content,
      {
        ref: B,
        ...u.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: {
          fontSize: h,
          left: (W == null ? void 0 : W.left) ?? C.current.left,
          top: (W == null ? void 0 : W.top) ?? C.current.top,
          touchAction: "manipulation"
        },
        onPointerLeave: S.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, Fh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = We(), c = { padding: `${F(8, 12, l)}px ${F(12, 16, l)}px`, fontSize: F(12, 14, l) }, u = _i(), a = v(u);
  a.current = u;
  const d = v(null), h = ds();
  ae(() => {
    var b;
    const g = { label: Ss(s), activate: () => {
      r || n();
    } };
    return d.current = g, (b = a.current) == null ? void 0 : b.register(g);
  }, []);
  const f = u && d.current ? u.items.indexOf(d.current) : -1, m = !r && f >= 0 && f === u.highlightedIndex;
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
        !r && u && f >= 0 && u.setHighlighted(f, "pointer");
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
}, Bh = () => /* @__PURE__ */ p(_e.Separator, { className: "ui-sep my-1" }), Hh = (n) => /* @__PURE__ */ p(ia, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Be = 8, Ms = "[data-modal-stack]", Mr = 0.94;
function $n() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function fn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function oa(n, e, t) {
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
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Ms) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function xr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Ms) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function sa({
  open: n,
  onClose: e,
  title: t,
  icon: r,
  width: i,
  footer: o,
  children: s,
  onReset: l,
  morph: c = !0,
  flat: u = !1,
  closable: a = !0,
  dismissOnBackdrop: d = !0,
  theme: h,
  surface: f,
  accent: m
}) {
  const g = Qt(), b = zi(
    { mode: h, accent: m, surface: f, context: "surface" },
    g
  ), x = b.mode, L = b.surface, E = b.accent, w = v(null), S = v(null), C = v(null), j = We(), J = F(20, 24, j), R = F(10, 12, j), V = F(12, 14, j), N = F(14, 16, j), O = F(20, 24, j), B = F(20, 24, j), W = F(20, 24, j), Y = F(14, 16, j), I = F(16, 20, j), X = F(10, 12, j), Q = F(12, 14, j), te = F(8, 10, j), ce = F(4, 6, j), M = { padding: `${R}px ${J}px` }, le = { fontSize: V }, xe = { padding: `${B}px ${O}px 16px ${O}px` }, Ne = { fontSize: N }, ve = { padding: `0 ${O}px 16px` }, ne = { padding: `${W}px ${O}px` }, ye = { fontSize: X, padding: `${ce}px ${te}px` }, [ie, _] = re(!1), D = se((T) => {
    w.current = T, _(T !== null);
  }, []), q = Yn(), Pe = ar(), Ce = v(Pe);
  Ce.current = Pe;
  const [pe, Ie] = re(null), Te = v(null), Oe = v(!1), P = v(!1), k = v(0), ge = v({ w: 0, h: 0 }), be = v(!1), [De, ct] = re(!1), [we, je] = re(!1), Ge = v(0), Me = v(!1), [Zt, Kt] = re(!1), Bt = v(c);
  Bt.current = c;
  const Et = v(!1), $e = v(!1), Ve = () => {
    $e.current = !0, ct(!0);
  }, gt = () => {
    $e.current = !1, ct(!1);
  };
  ae(() => {
    n || (Ie(null), be.current = !1, Oe.current = !1, je(!1));
  }, [n]), tt(() => {
    if (!n || be.current || !ie || !w.current) return;
    be.current = !0;
    const T = w.current.getBoundingClientRect(), Z = Ce.current ?? null, ue = (Z == null ? void 0 : Z.innerWidth) ?? 0, oe = fn(Z);
    Ie({
      left: Math.max(Be, Math.min((ue - T.width) / 2, ue - T.width - Be)),
      top: Math.max(oe.top + Be, Math.min(oe.top + (oe.height - T.height) / 2, oe.bottom - T.height - Be))
    });
  }, [n, ie]), tt(() => {
    if (!n || !ie || !c || $n() || !w.current) return;
    const T = w.current, Z = si(T), ue = Z[Z.length - 1];
    Ve(), ue ? zr(Ge, T, ue.getBoundingClientRect(), gt) : oa(Ge, T, gt);
  }, [n, ie]);
  const It = se(() => {
    if (!a || Me.current) return;
    const T = w.current, Z = !!T && si(T).length > 0;
    if (!T || !c || $n() || Z) {
      e();
      return;
    }
    Me.current = !0, Kt(!0), Et.current = !0, Ve(), ho(Ge, T, () => {
      Me.current = !1, Kt(!1), gt(), e();
    });
  }, [c, e, a]), nt = se(() => {
    const T = w.current;
    if (!T || Et.current || !Bt.current || $n() || si(T).length > 0) return;
    const Z = T.ownerDocument, ue = T.cloneNode(!0);
    ue.removeAttribute("data-modal-stack"), ue.removeAttribute("data-state"), ue.removeAttribute("role"), ue.removeAttribute("data-aria-hidden"), ue.removeAttribute("tabindex"), ue.setAttribute("aria-hidden", "true"), ue.style.pointerEvents = "none", Z.body.appendChild(ue), ho({ current: 0 }, ue, () => {
      ue.isConnected && ue.remove();
    });
  }, []);
  tt(() => () => nt(), [nt]);
  const Dt = v(n);
  tt(() => {
    const T = Dt.current;
    Dt.current = n, T && !n && nt();
  }, [n, ie, nt]), ae(() => {
    if (!n || !ie || !c || !w.current) return;
    const T = w.current, Z = T.parentNode;
    if (!Z) return;
    let ue = 0, oe = null, Se = !1;
    const ze = () => {
      ue = 0;
      const Le = xr(T);
      if (Le.length > 0)
        T.style.opacity = "", T.style.pointerEvents = "", oe = Le[Le.length - 1].getBoundingClientRect(), Se = !0, ue = requestAnimationFrame(ze);
      else if (Se) {
        Se = !1, oe && !$n() && (Ve(), zr(Ge, T, oe, gt)), oe = null;
        const Ae = Ce.current ?? null;
        Ae == null || Ae.setTimeout(() => {
          !T || !T.isConnected || getComputedStyle(T).opacity !== "1" && (T.style.opacity = "1", T.style.pointerEvents = "");
        }, 240);
      }
    }, Je = new MutationObserver(() => {
      !ue && xr(T).length > 0 && (ue = requestAnimationFrame(ze));
    });
    return Je.observe(Z, { childList: !0 }), () => {
      Je.disconnect(), ue && cancelAnimationFrame(ue);
    };
  }, [n, ie]), ae(() => {
    if (!ie || !c || $n() || !w.current) return;
    const T = w.current;
    let Z = Math.round(T.getBoundingClientRect().height), ue = !1;
    const oe = new ResizeObserver(() => {
      if (!T.isConnected) return;
      const Se = Math.round(T.getBoundingClientRect().height);
      if (!ue) {
        ue = !0, Z = Se;
        return;
      }
      if (Math.abs(Se - Z) < 1) return;
      if (Te.current || Me.current || xr(T).length > 0) {
        Z = Se;
        return;
      }
      if ($e.current) return;
      const ze = Z;
      Z = Se, Ve();
      const Je = T.getBoundingClientRect(), Le = fn(Ce.current ?? null), Ae = !Oe.current && !P.current, ht = Ae ? Le.top + (Le.height - ze) / 2 : Je.top, ot = Ae ? Le.top + (Le.height - Se) / 2 : Je.top;
      T.style.transition = "none", T.style.height = `${ze}px`, Ae && (T.style.top = `${ht}px`), S.current && (S.current.style.overflow = "hidden"), T.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          T.style.height === `${ze}px` && (T.style.transition = `height ${kt}ms ${xn}${Ae ? `, top ${kt}ms ${xn}` : ""}`, T.style.height = `${Se}px`, Ae && (T.style.top = `${ot}px`), window.setTimeout(() => {
            T.style.height === `${Se}px` && (T.style.transition = "", T.style.height = "", S.current && (S.current.style.overflow = ""), Ae && Ie({ left: Je.left, top: ot }), gt());
          }, kt + 60));
        });
      });
    });
    return oe.observe(T), () => oe.disconnect();
  }, [ie]), ae(() => {
    if (!ie || !w.current || c && !$n()) return;
    const T = w.current, Z = new ResizeObserver(() => {
      if (!T.isConnected || Te.current || Me.current || P.current || xr(T).length > 0) return;
      const ue = Ce.current ?? null, oe = fn(ue), Se = (ue == null ? void 0 : ue.innerWidth) ?? 0, ze = T.getBoundingClientRect(), Je = Math.max(oe.top + Be, Math.min(ze.top, oe.bottom - ze.height - Be)), Le = Math.max(Be, Math.min(ze.left, Se - ze.width - Be));
      (Math.abs(Je - ze.top) > 0.5 || Math.abs(Le - ze.left) > 0.5) && Ie({ left: Le, top: Je });
    });
    return Z.observe(T), () => Z.disconnect();
  }, [ie, c]);
  const qe = se(() => {
    const T = w.current;
    if (!T) return null;
    const Z = T.getBoundingClientRect();
    return { left: Z.left, top: Z.top, width: Z.width, height: Z.height };
  }, []), rt = se((T, Z) => {
    const ue = Ce.current ?? null, oe = (ue == null ? void 0 : ue.innerWidth) ?? 0, Se = fn(ue), ze = qe(), Je = ze ? ze.width : Math.min(oe - Be * 2, 576), Le = ze ? ze.height : Math.min(Se.height - Be * 2, 400);
    return {
      left: Math.max(Be, Math.min(T, oe - Je - Be)),
      top: Math.max(Se.top + Be, Math.min(Z, Se.bottom - Le - Be))
    };
  }, [qe]);
  ae(() => {
    if (!n) return;
    const T = Ce.current ?? null, Z = (T == null ? void 0 : T.visualViewport) ?? null;
    if (!T || !Z) return;
    const ue = 120;
    P.current = !1, ge.current = { w: T.innerWidth, h: T.innerHeight };
    let oe = 0;
    const Se = () => {
      if (Me.current || Te.current) return;
      const Je = (T == null ? void 0 : T.innerHeight) ?? 0, Le = (T == null ? void 0 : T.innerWidth) ?? 0, ht = fn(T).height < Je - ue, ot = Je < ge.current.h - ue && Le === ge.current.w;
      ht || ot ? (P.current = !0, k.current && (clearTimeout(k.current), k.current = 0)) : k.current || (k.current = (T == null ? void 0 : T.setTimeout(() => {
        P.current = !1, k.current = 0, je(!1);
      }, 600)) ?? 0), je(P.current), !oe && (oe = requestAnimationFrame(() => {
        var Rn;
        oe = 0;
        const At = w.current;
        if (!At) return;
        const xt = fn(Ce.current ?? null), Fe = At.getBoundingClientRect(), Ut = ((Rn = Ce.current) == null ? void 0 : Rn.innerWidth) ?? 0, en = (T == null ? void 0 : T.innerHeight) ?? 0, vn = xt.height < en - ue || en < ge.current.h - ue && (T == null ? void 0 : T.innerWidth) === ge.current.w;
        ge.current = { w: (T == null ? void 0 : T.innerWidth) ?? 0, h: en };
        const Re = Fe.top >= xt.top + Be && Fe.bottom <= xt.bottom - Be, cn = () => {
          Ie({
            left: Math.max(Be, Math.min((Ut - Fe.width) / 2, Ut - Fe.width - Be)),
            top: Math.max(xt.top + Be, Math.min(xt.top + (xt.height - Fe.height) / 2, xt.bottom - Fe.height - Be))
          });
        };
        if (vn && !He) {
          if (Oe.current) {
            Re || Ie(rt(Fe.left, Fe.top));
            return;
          }
          if (Re) return;
          cn();
          return;
        }
        if (!P.current) {
          if (Oe.current) {
            Re || Ie(rt(Fe.left, Fe.top));
            return;
          }
          Re || cn();
        }
      }));
    };
    Z.addEventListener("resize", Se), Z.addEventListener("scroll", Se);
    const ze = () => {
      Me.current || Te.current || oe || (oe = requestAnimationFrame(() => {
        oe = 0;
        const Je = w.current;
        if (!Je) return;
        const Le = Ce.current ?? null, Ae = fn(Le), ht = (Le == null ? void 0 : Le.innerWidth) ?? 0, ot = Je.getBoundingClientRect();
        if (Oe.current) {
          Ie(rt(ot.left, ot.top));
          return;
        }
        Ie({
          left: Math.max(Be, Math.min((ht - ot.width) / 2, ht - ot.width - Be)),
          top: Math.max(Ae.top + Be, Math.min(Ae.top + (Ae.height - ot.height) / 2, Ae.bottom - ot.height - Be))
        });
      }));
    };
    return T.addEventListener("orientationchange", ze), () => {
      Z.removeEventListener("resize", Se), Z.removeEventListener("scroll", Se), T.removeEventListener("orientationchange", ze), oe && cancelAnimationFrame(oe), k.current && clearTimeout(k.current);
    };
  }, [n, rt]);
  const $t = se((T) => {
    if (T.target.closest("button")) return;
    Oe.current = !0;
    const Z = qe();
    Z && (Ie(rt(Z.left, Z.top)), Te.current = { startX: T.clientX, startY: T.clientY, posX: Z.left, posY: Z.top }, T.target.setPointerCapture(T.pointerId));
  }, [qe, rt]), yt = se((T) => {
    const Z = Te.current;
    Z && (T.preventDefault(), Ie(rt(Z.posX + T.clientX - Z.startX, Z.posY + T.clientY - Z.startY)));
  }, [rt]), Mt = se(() => {
    Te.current = null;
  }, []), Ht = Te.current !== null, Ke = se(() => {
    Oe.current = !1;
    const T = Ce.current ?? null, Z = fn(T), ue = (T == null ? void 0 : T.innerWidth) ?? 0, oe = w.current, Se = oe ? oe.getBoundingClientRect() : { width: 0, height: 0 };
    Ie({
      left: Math.max(Be, Math.min((ue - Se.width) / 2, ue - Se.width - Be)),
      top: Math.max(Z.top + Be, Math.min(Z.top + (Z.height - Se.height) / 2, Z.bottom - Se.height - Be))
    });
  }, []), $ = v(0), U = se(() => {
    const T = Date.now();
    T - $.current < 300 ? ($.current = 0, Ke()) : $.current = T;
  }, [Ke]), me = pe !== null, Qe = me ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", it = `${i ? `${i} w-full` : "max-w-xl w-full"}`, St = {
    ...me ? { left: pe.left, top: pe.top } : {},
    width: `min(100%, calc(100dvw - ${Be * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...we ? {} : { maxHeight: `calc(100dvh - ${Be * 2}px)` }
  }, Rt = se((T) => {
    if (T.key !== "Enter" || T.shiftKey || T.metaKey || T.ctrlKey || T.altKey) return;
    const Z = T.target, ue = C.current;
    if (!(!!Z.closest("[data-modal-close]") || !!ue && ue.contains(Z) && !!Z.closest('button, a, [role="button"]')) && Z.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ue) return;
    const Se = Array.from(ue.querySelectorAll("button[data-modal-confirm]")), ze = Se.length > 0 ? Se : Array.from(ue.querySelectorAll("button")), Je = ze[ze.length - 1];
    !Je || Je.disabled || (T.preventDefault(), Je.click());
  }, []);
  return /* @__PURE__ */ p(Li, { theme: b, children: /* @__PURE__ */ p(dn.Root, { open: n, onOpenChange: (T) => {
    T || It();
  }, children: /* @__PURE__ */ A(dn.Portal, { container: q ?? void 0, children: [
    /* @__PURE__ */ p(
      dn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Zt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (T) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (T.preventDefault(), d && It());
        }
      }
    ),
    /* @__PURE__ */ A(
      dn.Content,
      {
        ref: D,
        onKeyDown: Rt,
        onInteractOutside: (T) => {
          d || T.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": E,
        "data-surface": L,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Qe} ${it}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(St).length > 0 ? St : {} },
        children: [
          u ? /* @__PURE__ */ A(
            "div",
            {
              style: xe,
              className: `flex items-center justify-between ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (T) => {
                De || $t(T);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: U,
              children: [
                /* @__PURE__ */ p(dn.Title, { style: Ne, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                a && /* @__PURE__ */ p(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Tn, { style: { width: I, height: I } }) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "div",
            {
              style: M,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (T) => {
                De || $t(T);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: U,
              children: [
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ p(dn.Title, { style: le, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ A("button", { onClick: l, style: ye, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ p(Jo, { style: { width: Q, height: Q } }),
                    "Reset"
                  ] }),
                  a && /* @__PURE__ */ p(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Tn, { style: { width: Y, height: Y } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p("div", { ref: S, "data-testid": "modal-body", style: u ? ve : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ p("div", { ref: C, style: u ? ne : void 0, className: u ? "" : "shrink-0", children: u ? /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function _h({ children: n }) {
  const e = We(), t = F(20, 24, e), r = F(8, 12, e);
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const la = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", ca = {
  zinc: "bg-[var(--ui-btn-solid-bg)] text-[color:var(--ui-btn-solid-text)] font-semibold border border-[color:var(--ui-btn-solid-border)] hover:bg-[var(--ui-btn-solid-hover-bg)] hover:border-[color:var(--ui-btn-solid-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, aa = {
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
      className: `${la} ${n === "hero" ? ca[e] : aa[n]} ${t}`,
      ...i
    }
  );
}
function Pr(n = "md") {
  const e = He && Go() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function Rs(n = "md") {
  return n === "sm" ? gn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : gn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const As = Xt(null);
function jh() {
  const n = Gt(As);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Wh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = re(null), [s, l] = re(!1), c = v(null), u = We(), a = F(16, 20, u), d = F(12, 14, u), h = Rs(), f = v(i);
  f.current = i;
  const m = se(() => {
    const S = f.current;
    S && (S.kind === "confirm" ? S.resolve(!1) : S.kind === "prompt" ? S.resolve(null) : S.resolve());
  }, []), g = se((S) => {
    if (S.suppressKey) {
      const C = localStorage.getItem(S.suppressKey);
      if (C && Date.now() < parseInt(C, 10))
        return Promise.resolve(!0);
    }
    return new Promise((C) => {
      m(), l(!1), o({ kind: "confirm", options: S, resolve: C });
    });
  }, [m]), b = se((S) => new Promise((C) => {
    m(), o({ kind: "prompt", options: S, resolve: C });
  }), [m]), x = se((S) => new Promise((C) => {
    m(), o({ kind: "alert", options: S, resolve: C });
  }), [m]);
  ae(() => {
    if (i) {
      const S = setTimeout(() => {
        var C;
        return (C = c.current) == null ? void 0 : C.focus();
      }, 50);
      return () => clearTimeout(S);
    }
  }, [i]);
  const L = se(() => {
    var S, C;
    if (i) {
      if (i.kind === "confirm") {
        const j = i.options;
        j.suppressKey && s && localStorage.setItem(j.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((C = (S = c.current) == null ? void 0 : S.value) == null ? void 0 : C.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), E = i !== null;
  ae(() => {
    if (!E) return;
    const S = (C) => {
      C.key !== "Enter" || C.shiftKey || C.metaKey || C.ctrlKey || C.altKey || C.isComposing || (C.preventDefault(), C.stopImmediatePropagation(), L());
    };
    return document.addEventListener("keydown", S, !0), () => document.removeEventListener("keydown", S, !0);
  }, [E, L]);
  const w = se(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ A(As.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    E && /* @__PURE__ */ p(
      sa,
      {
        open: !0,
        onClose: w,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ A(ut, { children: [
          i.kind !== "alert" && /* @__PURE__ */ p(br, { variant: "ghost", onClick: w, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ p(br, { onClick: L, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ p(
            br,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: L,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ p(br, { "data-modal-confirm": !0, onClick: L, children: "Save" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "flex flex-col", style: { gap: a }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ p("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ p(
            Wc,
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
const ua = 500, da = 250, fa = 5, _t = 88, po = 4;
function ha(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function pa({ x: n, y: e, ms: t }) {
  const r = v(null), i = Yn();
  return ae(() => {
    r.current && ha(r.current, t);
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
function qh() {
  return { "data-no-longpress": "true" };
}
function ma(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Kh({
  children: n,
  showRing: e = !0,
  longPressMs: t = ua,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = re(null), c = Ai(), u = v(null), a = v(null), d = v({ x: 0, y: 0, target: null }), h = v(!1), f = Math.min(da, t * 0.5), m = v(i);
  m.current = i;
  const g = v(o);
  return g.current = o, ae(() => {
    if (!He || !c) return;
    const b = (w) => {
      if (!xi(w.pointerType) || w.button !== 0) return;
      const S = w.target;
      if (!S.closest(r) || (m.current ? !m.current(S) : ma(S))) return;
      const C = w.clientX, j = w.clientY;
      d.current = { x: C, y: j, target: w.target }, h.current = !0, e && (a.current = setTimeout(() => l({ x: C, y: j }), f)), u.current = setTimeout(() => {
        if (!h.current) return;
        a.current && (clearTimeout(a.current), a.current = null), l(null);
        const J = d.current.target;
        if (!J) return;
        const R = g.current;
        if (R) {
          R(J, C, j);
          return;
        }
        const V = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: C,
          clientY: j,
          button: 2,
          view: window
        });
        J.dispatchEvent(V);
      }, t);
    }, x = (w) => {
      if (!h.current || u.current === null) return;
      const S = w.clientX - d.current.x, C = w.clientY - d.current.y;
      Math.sqrt(S * S + C * C) > fa && (clearTimeout(u.current), u.current = null, a.current && (clearTimeout(a.current), a.current = null), h.current = !1, l(null));
    }, L = () => {
      u.current !== null && (clearTimeout(u.current), u.current = null), a.current !== null && (clearTimeout(a.current), a.current = null), h.current = !1, l(null);
    }, E = (w) => {
      xi(w.pointerType) && (u.current !== null && (clearTimeout(u.current), u.current = null), a.current !== null && (clearTimeout(a.current), a.current = null), h.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", L), c.addEventListener("pointercancel", L), c.addEventListener("pointerleave", E), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", L), c == null || c.removeEventListener("pointercancel", L), c == null || c.removeEventListener("pointerleave", E), u.current !== null && clearTimeout(u.current), a.current !== null && clearTimeout(a.current);
    };
  }, [e, t, f, r]), /* @__PURE__ */ A(ut, { children: [
    n,
    e && s && /* @__PURE__ */ p(pa, { x: s.x, y: s.y, ms: t - f })
  ] });
}
function Jh() {
  const n = Ec();
  return Cc ? n === null || xi(n) : !1;
}
const ga = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, ya = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, xa = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Vh({
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
        ...e ? xa : n ? ya : ga,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ba = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], va = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], li = 1900, ci = 2100;
function wa(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function ka(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Yh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Qt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), u = (() => {
    if (!o) return c;
    const D = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(D.getTime()) ? c : D;
  })(), [a, d] = re(u.getFullYear()), [h, f] = re(u.getMonth()), [m, g] = re("days"), [b, x] = re(null), L = st(() => new Set(n), [n]), E = (D) => {
    L.has(D) ? e(n.filter((q) => q !== D)) : e([...n, D]);
  }, w = st(() => {
    const D = wa(a, h), q = new Date(a, h, 1).getDay(), Pe = [];
    for (let Ce = 0; Ce < q; Ce++) Pe.push({ key: `pad-${Ce}`, day: 0, empty: !0 });
    for (let Ce = 1; Ce <= D; Ce++) Pe.push({ key: ka(a, h, Ce), day: Ce, empty: !1 });
    return Pe;
  }, [a, h]), S = (D) => d((q) => Math.max(li, Math.min(ci, q + D))), C = (D) => {
    h + D < 0 ? (d((q) => Math.max(li, q - 1)), f(11)) : h + D > 11 ? (d((q) => Math.min(ci, q + 1)), f(0)) : f((q) => q + D);
  }, j = () => {
    if (b === null) return;
    const D = parseInt(b, 10);
    !isNaN(D) && D >= li && D <= ci && d(D), x(null);
  }, J = (D) => n.some((q) => q.startsWith(`${a}-${String(D + 1).padStart(2, "0")}`)), R = We(), V = F(4, 8, R), N = F(16, 20, R), O = F(10, 11, R), B = F(6, 8, R), W = F(12, 14, R), Y = F(6, 10, R), I = F(12, 14, R), X = F(8, 12, R), Q = F(10, 12, R), te = F(6, 10, R), ce = F(2, 6, R), M = F(64, 80, R), le = { padding: V }, xe = { width: N, height: N }, Ne = { fontSize: O, paddingTop: B, paddingBottom: B }, ve = { fontSize: W, paddingTop: Y, paddingBottom: Y }, ne = { fontSize: I, paddingTop: X, paddingBottom: X }, ye = { fontSize: Q, padding: `${ce}px ${te}px` }, ie = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", _ = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ A("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? S(-1) : C(-1),
          style: le,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ p(Vo, { style: xe })
        }
      ),
      m === "days" ? /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(a, h).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ p(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: b ?? String(a),
          onChange: (D) => x(D.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (D) => D.target.select(),
          onBlur: j,
          onKeyDown: (D) => {
            D.key === "Enter" && (D.preventDefault(), j()), D.key === "Escape" && x(null);
          },
          style: { width: M },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? S(1) : C(1),
          style: le,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ p(Dr, { style: xe })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-3 text-center", children: va.map((D, q) => /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => {
            f(q), g("days");
          },
          style: ne,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${q === h ? ie : _}`,
          children: [
            D,
            J(q) && /* @__PURE__ */ p("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${q === h ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
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
          style: { paddingTop: Y, paddingBottom: Y, fontSize: W },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ A("div", { className: "grid grid-cols-7 text-center", children: [
      ba.map((D) => /* @__PURE__ */ p("div", { style: Ne, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: D }, D)),
      w.map((D) => D.empty ? /* @__PURE__ */ p("div", {}, D.key) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => E(D.key),
          style: ve,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${L.has(D.key) ? ie : _}`,
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
        const q = /* @__PURE__ */ new Date(D + "T00:00:00"), Pe = q.getFullYear() === c.getFullYear() ? q.toLocaleString("default", { month: "short", day: "numeric" }) : q.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            onClick: () => E(D),
            "aria-label": `Remove ${Pe}`,
            style: ye,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Pe,
              /* @__PURE__ */ p("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          D
        );
      }) })
    ] })
  ] });
}
function Uh({
  items: n,
  selected: e,
  onToggle: t,
  title: r,
  onToggleAll: i,
  allSelected: o = !1,
  toggleAllLabel: s,
  emptyHint: l = "Nothing here",
  maxHeight: c,
  disabled: u = !1,
  checkPosition: a = "leading",
  theme: d,
  className: h = ""
}) {
  const f = (w) => e instanceof Set ? e.has(w) : e.includes(w), m = We(), g = F(12, 16, m), b = F(8, 12, m), x = F(12, 14, m), L = F(16, 20, m), E = r != null || i != null;
  return /* @__PURE__ */ A("div", { className: h, ...d ? { "data-theme": d } : {}, children: [
    E && /* @__PURE__ */ A("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ p("button", { type: "button", disabled: u, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((w) => {
            const S = f(w.id), C = /* @__PURE__ */ p(Pi, { checked: S, size: L });
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => t(w.id),
                "aria-pressed": S,
                className: `ui-checklist-item ${S ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: x },
                ...w.dataProps,
                children: [
                  a === "leading" && C,
                  w.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: w.secondary }),
                  a === "trailing" && /* @__PURE__ */ p("span", { className: "ml-auto flex shrink-0", children: C })
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
function Xh({
  items: n,
  value: e,
  onChange: t,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: o,
  compact: s = !1,
  disabled: l = !1,
  theme: c,
  className: u = ""
}) {
  const a = We(), d = s ? 10 : F(12, 16, a), h = s ? 6 : F(8, 12, a), f = s ? 12 : F(12, 14, a), m = s ? 14 : F(16, 20, a);
  return /* @__PURE__ */ A("div", { className: u, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ p("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const b = e === g.id;
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${b ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${h}px ${d}px`, fontSize: f },
                children: [
                  /* @__PURE__ */ p("span", { className: "ui-radio-circle", style: { width: m, height: m }, "aria-hidden": !0, children: b && /* @__PURE__ */ p("span", { className: "ui-radio-dot" }) }),
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
const Gh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = ar(), { refs: l, floatingStyles: c } = oc({
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
        fn: (u) => {
          var L;
          if (i !== "visible") return {};
          const a = (L = u.elements.floating.ownerDocument) == null ? void 0 : L.defaultView;
          if (!a) return {};
          const d = u.rects.reference, h = Math.max(d.x, 0), f = Math.max(d.y, 0), m = Math.min(d.x + d.width, a.innerWidth), g = Math.min(d.y + d.height, a.innerHeight);
          if (m <= h || g <= f) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? h - d.x : 0, x = r === "top" ? f - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: u.x + b, y: u.y + x };
        }
      },
      Yo(o),
      Uo({ padding: 8 }),
      Xo({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (u) => {
          var g;
          const a = (g = u.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!a) return {};
          const d = u.rects.floating.width, h = u.rects.floating.height, f = Math.max(8, Math.min(u.x, a.innerWidth - d - 8)), m = Math.max(8, Math.min(u.y, a.innerHeight - h - 8));
          return { x: f, y: m };
        }
      }
    ],
    whileElementsMounted: sc
  });
  return tt(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ A(ut, { children: [
    !t && /* @__PURE__ */ p("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Vr(
      /* @__PURE__ */ p(
        "div",
        {
          ref: l.setFloating,
          className: `ui-chrome ${n}`,
          style: c,
          onMouseDown: (u) => u.stopPropagation(),
          onClick: (u) => u.stopPropagation(),
          onDragStart: (u) => u.preventDefault(),
          children: e
        }
      ),
      s.document.body
    )
  ] });
};
function Sa(n, e) {
  if (!e || !at.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Ln = ({ content: n, children: e }) => {
  const t = Qt(), r = We(), i = F(10, 12, r), o = F(6, 6, r), s = F(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Yn(), u = ar(), [a, d] = re(!1), [h, f] = re({ x: 0, y: 0 }), m = v(null), g = v(null), b = () => {
    if (!m.current) return;
    const E = m.current.getBoundingClientRect();
    f({ x: E.left + E.width / 2, y: E.top });
  };
  ae(() => () => {
    g.current && clearTimeout(g.current);
  }, []), ae(() => (a && u && (b(), u.addEventListener("scroll", b, !0)), () => u == null ? void 0 : u.removeEventListener("scroll", b, !0)), [a]), ae(() => {
    var S;
    if (!a) return;
    const E = ((S = m.current) == null ? void 0 : S.ownerDocument) ?? document, w = (C) => {
      m.current && !m.current.contains(C.target) && d(!1);
    };
    return E.addEventListener("pointerdown", w, !0), () => E.removeEventListener("pointerdown", w, !0);
  }, [a]);
  const x = Sa(e, n), L = Object.keys(x).length > 0 ? at.cloneElement(e, x) : e;
  return /* @__PURE__ */ A(
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
        a && Vr(
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
}, Na = 250;
function Ta(n, e, t) {
  const [r, i] = at.useState(null), [o, s] = at.useState(!1), l = at.useRef(null), c = at.useRef(t);
  c.current = t;
  const u = at.useCallback(() => {
    var h;
    const d = (h = e.current) == null ? void 0 : h[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  at.useLayoutEffect(() => {
    u();
  }, [t, u]), at.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const h = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Na), u();
    }, f = new ResizeObserver(h);
    f.observe(d);
    for (const m of e.current ?? []) m && f.observe(m);
    return () => {
      f.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, u]);
  const a = at.useMemo(
    () => {
      var d;
      return typeof window < "u" && !!((d = window.matchMedia) != null && d.call(window, "(prefers-reduced-motion: reduce)").matches);
    },
    []
  );
  return {
    style: r ? { left: 0, width: r.width, transform: `translateX(${r.left}px)` } : null,
    motionClass: a || o ? "" : "transition-[transform,width] duration-200 ease-out"
  };
}
function Zr() {
  const n = We(), e = He, t = e ? F(28, 40, n) : 28, r = e ? F(28, 40, n) : 28, i = e ? F(10, 14, n) : 10, o = e ? F(10, 14, n) : 10, s = e ? F(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Qh = He ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Ca = He ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", vr = He ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ea = "hover:bg-red-950/50", Zh = He ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", ep = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", tp = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ma = He ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", np = He ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", Is = He ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ra = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", Aa = He ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", wr = ({ onClick: n, disabled: e, title: t, className: r = Ca, children: i }) => {
  const o = Zr();
  return /* @__PURE__ */ p(Ln, { content: t, children: /* @__PURE__ */ p("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, kr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, rp = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: u, iconCollapse: a = !1, iconWithLabel: d = !0, ariaLabel: h }) => {
  const f = Qt(), m = c ?? Pc(f), g = c === "blue" || c === "emerald" ? c : (f == null ? void 0 : f.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, x = Zr(), L = We(), E = s && !He ? 24 : x.control.height, w = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), S = He ? w : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, C = (N) => i ? i(N) : n === N, j = at.useRef(null), J = at.useRef([]), R = Math.max(0, e.findIndex((N) => C(N.v))), V = Ta(j, J, R);
  return l === "track" ? /* @__PURE__ */ A(
    "div",
    {
      ref: j,
      role: u ? "tablist" : "group",
      "aria-label": h,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${He ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${kr.wrap}`,
      children: [
        V.style && /* @__PURE__ */ p(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${kr.pill} ${V.motionClass}`,
            style: { ...V.style, top: 2, bottom: 2 }
          }
        ),
        e.map((N, O) => {
          const B = C(N.v), W = a && !!N.icon;
          return /* @__PURE__ */ p(
            "button",
            {
              ref: (Y) => {
                J.current[O] = Y;
              },
              ...N.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(N.v),
              title: N.title,
              role: u ? "tab" : void 0,
              "aria-selected": u ? B : void 0,
              "aria-pressed": u ? void 0 : B,
              "aria-label": N.ariaLabel ?? (N.l ? void 0 : N.title),
              style: S,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${W ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${B ? kr.active : kr.idle}`,
              children: /* @__PURE__ */ p(
                bs,
                {
                  icon: N.icon,
                  collapse: W,
                  iconWithLabel: d,
                  active: B,
                  gap: F(6, 8, L),
                  children: N.l
                }
              )
            },
            N.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ A("div", { ref: j, className: `relative ${Ra} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    V.style && /* @__PURE__ */ p(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${V.motionClass}`,
        style: { ...V.style, top: 0, bottom: 0 }
      }
    ),
    e.map((N, O) => {
      const B = C(N.v);
      return /* @__PURE__ */ A(
        "button",
        {
          ref: (W) => {
            J.current[O] = W;
          },
          ...N.dataProps,
          disabled: r,
          onClick: () => t(N.v),
          title: N.title,
          style: { ...x.control, height: E },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${B ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${N.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            N.icon,
            N.l
          ]
        },
        N.v
      );
    })
  ] });
}, ip = ({ children: n }) => /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ p("span", { className: He ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ p("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Ia = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Da = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", op = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ A("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ p("span", { className: t ? Ia : Da, children: n }),
  e
] }), sp = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ p("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), lp = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ A("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ p(wr, { onClick: () => r(-1), disabled: n, title: "Move up", className: vr, children: /* @__PURE__ */ p(Ul, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(wr, { onClick: () => r(1), disabled: n, title: "Move down", className: vr, children: /* @__PURE__ */ p(Xl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(wr, { onClick: e, disabled: n, title: "Duplicate", className: vr, children: /* @__PURE__ */ p(Ko, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p("div", { className: Is }),
    /* @__PURE__ */ p(wr, { onClick: t, disabled: n, title: "Delete", className: `${vr} ${Ea}`, children: /* @__PURE__ */ p(yi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var mo = Object.defineProperty, $a = (n, e) => {
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
function Ds(n, e, t) {
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
      return c && c < s.length && c < l.length && Ls(s.charCodeAt(c - 1)) && zs(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = Ds(i.content, o.content, t + 1);
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
      let u = s.text, a = l.text, d = u.length, h = a.length;
      for (; d > 0 && h > 0 && u[d - 1] == a[h - 1]; )
        d--, h--, t--, r--;
      return d && h && d < u.length && Ls(u.charCodeAt(d - 1)) && zs(u.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let u = $s(s.content, l.content, t - 1, r - 1);
      if (u)
        return u;
    }
    t -= c, r -= c;
  }
}
function zs(n) {
  return n >= 56320 && n < 57344;
}
function Ls(n) {
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
      let c = this.content[s], u = l + c.nodeSize;
      if (u > e && r(c, i + l, o || null, s) !== !1 && c.content.size) {
        let a = l + 1;
        c.nodesBetween(Math.max(0, e - a), Math.min(c.content.size, t - a), r, i + a);
      }
      l = u;
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
      let u = l.isText ? l.text.slice(Math.max(e, c) - c, t - c) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && u || l.isTextblock) && r && (s ? s = !1 : o += r), o += u;
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
    return Ds(this, e, t);
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
    let r = Os(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new de(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new de(Ps(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
    return new de(K.fromJSON(e, t.content), r, i);
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
de.empty = new de(K.empty, 0, 0);
function Ps(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Ps(o.content, e - i - 1, t - i - 1)));
}
function Os(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let u = Os(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return u && n.replaceChild(s, c.copy(u));
}
function za(n, e, t) {
  if (t.openStart > n.depth)
    throw new rr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new rr("Inconsistent open depths");
  return Fs(n, e, t, 0);
}
function Fs(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Fs(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Nn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = La(t, n);
      return Nn(o, Hs(n, s, l, e, r));
    }
  else return Nn(o, Fr(n, e, r));
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
function Hs(n, e, t, r, i) {
  let o = n.depth > i && ki(n, e, i + 1), s = r.depth > i && ki(t, r, i + 1), l = [];
  return er(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Bs(o, s), Sn(Nn(o, Hs(n, e, t, r, i + 1)), l)) : (o && Sn(Nn(o, Fr(n, e, i + 1)), l), er(e, t, i, l), s && Sn(Nn(s, Fr(t, r, i + 1)), l)), er(r, null, i, l), new K(l);
}
function Fr(n, e, t) {
  let r = [];
  if (er(null, n, t, r), n.depth > t) {
    let i = ki(n, e, t + 1);
    Sn(Nn(i, Fr(n, e, t + 1)), r);
  }
  return er(e, null, t, r), new K(r);
}
function La(n, e) {
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
      let { index: l, offset: c } = s.content.findIndex(o), u = o - c;
      if (r.push(s, l, i + c), !u || (s = s.child(l), s.isText))
        break;
      o = u - 1, i += c + 1;
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
      go.set(e, r = new Pa());
    let i = r.elts[r.i] = ir.resolve(e, t);
    return r.i = (r.i + 1) % Oa, i;
  }
}
class Pa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Oa = 12, go = /* @__PURE__ */ new WeakMap();
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
const Fa = /* @__PURE__ */ Object.create(null);
let _n = class Si {
  /**
  @internal
  */
  constructor(e, t, r, i = Ue.none) {
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
    return this.type == e && Or(this.attrs, t || e.defaultAttrs || Fa) && Ue.sameSet(this.marks, r || Ue.none);
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
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), u = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new de(u, i.depth - s, o.depth - s);
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
    return za(this.resolve(e), this.resolve(t), r);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), _s(this.marks, e);
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
    let i = K.fromJSON(e, t.content);
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
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : _s(this.marks, JSON.stringify(this.text));
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
function _s(n, e) {
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
class Cn {
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
    let r = new Ba(e, t);
    if (r.next == null)
      return Cn.empty;
    let i = js(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ja(Ka(i));
    return Va(o, r), o;
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
        return K.from(l.map((u) => u.createAndFill()));
      for (let u = 0; u < s.next.length; u++) {
        let { type: a, next: d } = s.next[u];
        if (!(a.isText || a.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let h = o(d, l.concat(a));
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
Cn.empty = new Cn(!0);
class Ba {
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
    e.push(Ha(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Ha(n) {
  let e = [];
  do
    e.push(_a(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function _a(n) {
  let e = qa(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = ja(n, e);
    else
      break;
  return e;
}
function xo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function ja(n, e) {
  let t = xo(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = xo(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Wa(n, e) {
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
function qa(n) {
  if (n.eat("(")) {
    let e = js(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Wa(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ka(n) {
  let e = [[]];
  return i(o(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(s, l, c) {
    let u = { term: c, to: l };
    return e[s].push(u), u;
  }
  function i(s, l) {
    s.forEach((c) => c.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((c, u) => c.concat(o(u, l)), []);
    if (s.type == "seq")
      for (let c = 0; ; c++) {
        let u = o(s.exprs[c], l);
        if (c == s.exprs.length - 1)
          return u;
        i(u, l = t());
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
        for (let u = 0; u < s.min; u++) {
          let a = t();
          i(o(s.expr, c), a), c = a;
        }
        if (s.max == -1)
          i(o(s.expr, c), c);
        else
          for (let u = s.min; u < s.max; u++) {
            let a = t();
            r(c, a), i(o(s.expr, c), a), c = a;
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
function Ws(n, e) {
  return e - n;
}
function bo(n, e) {
  let t = [];
  return r(e), t.sort(Ws);
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
function Ja(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(bo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let u;
        for (let a = 0; a < i.length; a++)
          i[a][0] == l && (u = i[a][1]);
        bo(n, c).forEach((a) => {
          u || i.push([l, u = []]), u.indexOf(a) == -1 && u.push(a);
        });
      });
    });
    let o = e[r.join(",")] = new Cn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Ws);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Va(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: u } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(u) == -1 && r.push(u);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function qs(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Ks(n, e) {
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
      t[r] = new Ua(n, r, e[r]);
  return t;
}
class _r {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Js(e, r.attrs), this.defaultAttrs = qs(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Cn.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Ks(this.attrs, e);
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
    return new _n(this, this.computeAttrs(e), K.from(t), Ue.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = K.from(t), this.checkContent(t), new _n(this, this.computeAttrs(e), t, Ue.setFrom(r));
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
function Ya(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Ua {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Ya(e, t, r.validate) : r.validate;
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
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Js(e, i.attrs), this.excluded = null;
    let o = qs(this.attrs);
    this.instance = o ? new Ue(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ue(this, Ks(this.attrs, e));
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
class Xa {
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
      if (o.contentMatch = r[s] || (r[s] = Cn.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
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
function Ga(n) {
  return n.tag != null;
}
function Qa(n) {
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
      if (Ga(i))
        this.tags.push(i);
      else if (Qa(i)) {
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
      if (tu(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
const Vs = {
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
}, Za = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Ys = { ol: !0, ul: !0 }, or = 1, Ni = 2, tr = 4;
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
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Vs.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
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
    Ys.hasOwnProperty(s) && this.parser.normalizeLists && eu(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Za.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let u, a = this.needsBlock;
      if (Vs.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), u = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = c && c.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), u && this.sync(o), this.needsBlock = a;
    } else {
      let u = this.readStyles(e, t);
      u && this.addElementByRule(e, c, u, c.consuming === !1 ? l : void 0);
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
            if (c.clearMark ? t = t.filter((u) => !c.clearMark(u)) : t = t.concat(this.parser.schema.marks[c.mark].create(c.attrs)), c.consuming === !1)
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
      let c = this.nodes[s], u = c.findWrapping(e);
      if (u && (!i || i.length > u.length + l) && (i = u, o = c, !u.length))
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
    return r = r.filter((u) => (s.type ? s.type.allowsMarkType(u.type) : No(u.type, e)) ? (c = u.addToSet(c), !1) : !0), this.nodes.push(new Nr(e, t, c, i, null, l)), this.open++, r;
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
        let u = t[l];
        if (u == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; c >= o; c--)
            if (s(l - 1, c))
              return !0;
          return !1;
        } else {
          let a = c > 0 || c == 0 && i ? this.nodes[c].type : r && c >= o ? r.node(c - o).type : null;
          if (!a || a.name != u && !a.isInGroup(u))
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
function eu(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Ys.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function tu(n, e) {
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
        let { type: u, next: a } = l.edge(c);
        if (u == e || o.indexOf(a) < 0 && s(a))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
const Us = 65535, Xs = Math.pow(2, 16);
function nu(n, e) {
  return n + e * Xs;
}
function To(n) {
  return n & Us;
}
function ru(n) {
  return (n - (n & Us)) / Xs;
}
const Gs = 1, Qs = 2, Rr = 4, Zs = 8;
class Ti {
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
    return (this.delInfo & Zs) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Gs | Rr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Qs | Rr)) > 0;
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
    let t = 0, r = To(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + ru(e);
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
      let u = this.ranges[l + o], a = this.ranges[l + s], d = c + u;
      if (e <= d) {
        let h = u ? e == c ? -1 : e == d ? 1 : t : t, f = c + i + (h < 0 ? 0 : a);
        if (r)
          return f;
        let m = e == (t < 0 ? c : d) ? null : nu(l / 3, e - c), g = e == c ? Qs : e == d ? Gs : Rr;
        return (t < 0 ? e != c : e != d) && (g |= Zs), new Ti(f, g, m);
      }
      i += a - u;
    }
    return r ? e + i : new Ti(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = To(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let c = this.ranges[l] - (this.inverted ? r : 0);
      if (c > e)
        break;
      let u = this.ranges[l + o], a = c + u;
      if (e <= a && l == i * 3)
        return !0;
      r += this.ranges[l + s] - u;
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
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), c = s + (this.inverted ? 0 : o), u = this.ranges[i + t], a = this.ranges[i + r];
      e(l, l + u, c, c + a), o += a - u;
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
    return r ? e : new Ti(e, i, null);
  }
}
const ui = /* @__PURE__ */ Object.create(null);
class Ct {
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
class ft {
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
    return new ft(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ft(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return ft.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof rr)
        return ft.fail(o.message);
      throw o;
    }
  }
}
function Ki(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Ki(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return K.fromArray(r);
}
class hn extends Ct {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new de(Ki(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ft.fromReplace(e, this.from, this.to, o);
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
Ct.jsonID("addMark", hn);
class Jt extends Ct {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new de(Ki(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ft.fromReplace(e, this.from, this.to, r);
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
Ct.jsonID("removeMark", Jt);
class pn extends Ct {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ft.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ft.fromReplace(e, this.pos, this.pos + 1, new de(K.from(r), 0, t.isLeaf ? 0 : 1));
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
Ct.jsonID("addNodeMark", pn);
class En extends Ct {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ft.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ft.fromReplace(e, this.pos, this.pos + 1, new de(K.from(r), 0, t.isLeaf ? 0 : 1));
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
Ct.jsonID("removeNodeMark", En);
class dt extends Ct {
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
    return this.structure && Ci(e, this.from, this.to) ? ft.fail("Structure replace would overwrite content") : ft.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Ft([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new dt(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && dt.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new dt(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof dt) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? de.empty : new de(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new dt(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? de.empty : new de(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new dt(e.from, this.to, t, this.structure);
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
    return new dt(t.from, t.to, de.fromJSON(e, t.slice), !!t.structure);
  }
}
dt.MAP_BIAS = 1;
Ct.jsonID("replace", dt);
class mt extends Ct {
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
    if (this.structure && (Ci(e, this.from, this.gapFrom) || Ci(e, this.gapTo, this.to)))
      return ft.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ft.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ft.fromReplace(e, this.from, this.to, r) : ft.fail("Content does not fit in gap");
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
    return new mt(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new mt(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new mt(t.from, t.to, t.gapFrom, t.gapTo, de.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ct.jsonID("replaceAround", mt);
function Ci(n, e, t) {
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
function iu(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, u, a) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && a.type.allowsMarkType(r.type)) {
      let h = Math.max(u, e), f = Math.min(u + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == h && s.mark.eq(d[g]) ? s.to = f : i.push(s = new Jt(h, f, d[g])));
      l && l.to == h ? l.to = f : o.push(l = new hn(h, f, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function ou(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof ei) {
      let u = s.marks, a;
      for (; a = r.isInSet(u); )
        (c || (c = [])).push(a), u = a.removeFromSet(u);
    } else r ? r.isInSet(s.marks) && (c = [r]) : c = s.marks;
    if (c && c.length) {
      let u = Math.min(l + s.nodeSize, t);
      for (let a = 0; a < c.length; a++) {
        let d = c[a], h;
        for (let f = 0; f < i.length; f++) {
          let m = i[f];
          m.step == o - 1 && d.eq(i[f].style) && (h = m);
        }
        h ? (h.to = u, h.step = o) : i.push({ style: d, from: Math.max(l, e), to: u, step: o });
      }
    }
  }), i.forEach((s) => n.step(new Jt(s.from, s.to, s.style)));
}
function Ji(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let u = o.child(c), a = l + u.nodeSize, d = r.matchType(u.type);
    if (!d)
      s.push(new dt(l, a, de.empty));
    else {
      r = d;
      for (let h = 0; h < u.marks.length; h++)
        t.allowsMarkType(u.marks[h].type) || n.step(new Jt(l, a, u.marks[h]));
      if (i && u.isText && t.whitespace != "pre") {
        let h, f = /\r?\n|\r/g, m;
        for (; h = f.exec(u.text); )
          m || (m = new de(K.from(t.schema.text(" ", t.allowedMarks(u.marks))), 0, 0)), s.push(new dt(l + h.index, l + h.index + h[0].length, m));
      }
    }
    l = a;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(K.empty, !0);
    n.replace(l, l, new de(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function su(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Xn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !su(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function lu(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, u = l, a = K.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, a = K.from(r.node(m).copy(a)), d++) : c--;
  let h = K.empty, f = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, h = K.from(i.node(m).copy(h)), f++) : u++;
  n.step(new mt(c, u, s, l, new de(a.append(h), d, f), a.size - d, !0));
}
function el(n, e, t = null, r = n) {
  let i = cu(n, e), o = i && au(r, e);
  return o ? i.map(Co).concat({ type: e, attrs: t }).concat(o.map(Co)) : null;
}
function Co(n) {
  return { type: n, attrs: null };
}
function cu(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function au(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let u = r; c && u < i; u++)
    c = c.matchType(t.child(u).type);
  return !c || !c.validEnd ? null : s;
}
function uu(n, e, t) {
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
  n.step(new mt(i, o, i, o, new de(r, 0, 0), t.length, !0));
}
function du(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && fu(n.doc, n.mapping.slice(o).map(l), r)) {
      let u = null;
      if (r.schema.linebreakReplacement) {
        let f = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        f && !m ? u = !1 : !f && m && (u = !0);
      }
      u === !1 && nl(n, s, l, o), Ji(n, n.mapping.slice(o).map(l, 1), r, void 0, u === null);
      let a = n.mapping.slice(o), d = a.map(l, 1), h = a.map(l + s.nodeSize, 1);
      return n.step(new mt(d, h, d + 1, h - 1, new de(K.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), u === !0 && tl(n, s, l, o), !1;
    }
  });
}
function tl(n, e, t, r) {
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
function nl(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function fu(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function hu(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new mt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new de(K.from(s), 0, 0), 1, !0));
}
function on(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let u = i.depth - 1, a = t - 2; u > o; u--, a--) {
    let d = i.node(u), h = i.index(u);
    if (d.type.spec.isolating)
      return !1;
    let f = d.content.cutByIndex(h, d.childCount), m = r && r[a + 1];
    m && (f = f.replaceChild(0, m.type.create(m.attrs)));
    let g = r && r[a] || d;
    if (!d.canReplace(h + 1, d.childCount) || !g.type.validContent(f))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function pu(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = K.empty, s = K.empty;
  for (let l = i.depth, c = i.depth - t, u = t - 1; l > c; l--, u--) {
    o = K.from(i.node(l).copy(o));
    let a = r && r[u];
    s = K.from(a ? a.type.create(a.attrs, s) : i.node(l).copy(s));
  }
  n.step(new dt(e, e, new de(o.append(s), t, t), !0));
}
function Mn(n, e) {
  let t = n.resolve(e), r = t.index();
  return rl(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function mu(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function rl(n, e) {
  return !!(n && e && !n.isLeaf && mu(n, e));
}
function ti(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && rl(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function gu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let a = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    a && !d ? r = !1 : !a && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let a = n.doc.resolve(e + t);
    nl(n, a.node(), a.before(), l);
  }
  s.inlineContent && Ji(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), u = c.map(e - t);
  if (n.step(new dt(u, c.map(e + t, -1), de.empty, !0)), r === !0) {
    let a = n.doc.resolve(u);
    tl(n, a.node(), a.before(), n.steps.length);
  }
  return n;
}
function yu(n, e, t) {
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
  return il(i, o, r) ? new dt(e, t, r) : new xu(i, o, r).fit();
}
function il(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class xu {
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
      let u = this.findFittable();
      u ? this.placeNodes(u) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let c = new de(o, s, l);
    return e > -1 ? new mt(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new dt(r.pos, i.pos, c) : null;
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
          let { type: c, match: u } = this.frontier[l], a, d = null;
          if (t == 1 && (s ? u.matchType(s.type) || (d = u.fillBefore(K.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (a = u.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: a };
          if (o && u.matchType(o.type))
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
    let s = this.unplaced, l = r ? r.content : s.content, c = s.openStart - e, u = 0, a = [], { match: d, type: h } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        a.push(i.child(g));
      d = d.matchFragment(i);
    }
    let f = l.size + e - (s.content.size - s.openEnd);
    for (; u < l.childCount; ) {
      let g = l.child(u), b = d.matchType(g.type);
      if (!b)
        break;
      u++, (u > 1 || c == 0 || g.content.size) && (d = b, a.push(ol(g.mark(h.allowedMarks(g.marks)), u == 1 ? c : 0, u == l.childCount ? f : -1)));
    }
    let m = u == l.childCount;
    m || (f = -1), this.placed = Zn(this.placed, t, K.from(a)), this.frontier[t].match = d, m && f < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < f; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? de.empty : new de(Qn(s.content, e - 1, 1), e - 1, f < 0 ? s.openEnd : e - 1) : new de(Qn(s.content, e, u), s.openStart, s.openEnd);
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
          let { match: c, type: u } = this.frontier[l], a = fi(e, l, u, c, !0);
          if (!a || a.childCount)
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
    i.match = i.match.matchType(e), this.placed = Zn(this.placed, this.depth, K.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(K.empty, !0);
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
function ol(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, ol(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(K.empty, !0)))), n.copy(r);
}
function fi(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !bu(t, o.content, s) ? l : null;
}
function bu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function vu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function wu(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (il(i, o, r))
    return n.step(new dt(e, t, r));
  let s = ll(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let h = i.depth, f = i.pos - 1; h > 0; h--, f--) {
    let m = i.node(h).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    s.indexOf(h) > -1 ? l = h : i.before(h) == f && s.splice(1, 0, -h);
  }
  let c = s.indexOf(l), u = [], a = r.openStart;
  for (let h = r.content, f = 0; ; f++) {
    let m = h.firstChild;
    if (u.push(m), f == r.openStart)
      break;
    h = m.content;
  }
  for (let h = a - 1; h >= 0; h--) {
    let f = u[h], m = vu(f.type);
    if (m && !f.sameMarkup(i.node(Math.abs(l) - 1)))
      a = h;
    else if (m || !f.type.isTextblock)
      break;
  }
  for (let h = r.openStart; h >= 0; h--) {
    let f = (h + a + 1) % (r.openStart + 1), m = u[f];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let b = s[(g + c) % s.length], x = !0;
        b < 0 && (x = !1, b = -b);
        let L = i.node(b - 1), E = i.index(b - 1);
        if (L.canReplaceWith(E, E, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new de(sl(r.content, 0, r.openStart, f), f, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let h = s.length - 1; h >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); h--) {
    let f = s[h];
    f < 0 || (e = i.before(f), t = o.after(f));
  }
}
function sl(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(sl(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(K.empty, !0));
  }
  return n;
}
function ku(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = yu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new de(K.from(r), 0, 0));
}
function Su(n, e, t) {
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
  let o = ll(r, i);
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
function ll(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Wn extends Ct {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ft.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return ft.fromReplace(e, this.pos, this.pos + 1, new de(K.from(i), 0, t.isLeaf ? 0 : 1));
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
Ct.jsonID("attr", Wn);
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
    return ft.ok(r);
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
Ct.jsonID("docAttr", sr);
let Kn = class extends Error {
};
Kn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Kn.prototype = Object.create(Error.prototype);
Kn.prototype.constructor = Kn;
Kn.prototype.name = "TransformError";
class Nu {
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
    return this.replace(e, t, new de(K.from(r), 0, 0));
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
    return wu(this, e, t, r), this;
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
    return ku(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Su(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return lu(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return gu(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return uu(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return du(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return hu(this, e, t, r, i), this;
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
    return pu(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return iu(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return ou(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Ji(this, e, t, r), this;
  }
}
const hi = /* @__PURE__ */ Object.create(null);
class lt {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Tu(e.min(t), e.max(t))];
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
      let { $from: c, $to: u } = s[l], a = e.mapping.slice(o);
      e.replaceRange(a.map(c.pos), a.map(u.pos), l ? de.empty : t), l == 0 && Ro(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], c = e.mapping.slice(r), u = c.map(s.pos), a = c.map(l.pos);
      o ? e.deleteRange(u, a) : (e.replaceRangeWith(u, a, t), Ro(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Lt(e) : Pn(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Pn(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Pn(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return Pn(e, e, 0, 0, 1) || new Vt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Pn(e, e, e.content.size, e.childCount, -1) || new Vt(e);
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
    return Lt.between(this.$anchor, this.$head).getBookmark();
  }
}
lt.prototype.visible = !0;
class Tu {
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
class Lt extends lt {
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
      return lt.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Lt(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = de.empty) {
    if (super.replace(e, t), t == de.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Lt && e.anchor == this.anchor && e.head == this.head;
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
    return new Lt(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = lt.findFrom(t, r, !0) || lt.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return lt.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (lt.findFrom(e, -r, !0) || lt.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Lt(e, t);
  }
}
lt.jsonID("text", Lt);
class ri {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ri(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Lt.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Xe extends lt {
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
    return r ? lt.near(o) : new Xe(o);
  }
  content() {
    return new de(K.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Xe && e.anchor == this.anchor;
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
    return new Xe(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Xe(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Xe.prototype.visible = !1;
lt.jsonID("node", Xe);
class Vi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ri(r, r) : new Vi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Xe.isSelectable(r) ? new Xe(t) : lt.near(t);
  }
}
class Vt extends lt {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = de.empty) {
    if (t == de.empty) {
      e.delete(0, e.doc.content.size);
      let r = lt.atStart(e.doc);
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
    return Cu;
  }
}
lt.jsonID("all", Vt);
const Cu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Vt(n);
  }
};
function Pn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Lt.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Xe.isSelectable(l))
        return Xe.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Pn(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
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
  if (!(i instanceof dt || i instanceof mt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, u, a) => {
    s == null && (s = a);
  }), n.setSelection(lt.near(n.doc.resolve(s), t));
}
function Ao(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Tr {
  constructor(e, t, r) {
    this.name = e, this.init = Ao(t.init, r), this.apply = Ao(t.apply, r);
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
    return n.selection || lt.atStart(e.doc);
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
const cl = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function al(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const ul = (n, e, t) => {
  let r = al(n, t);
  if (!r)
    return !1;
  let i = Yi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Xn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (bl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "end") || Xe.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = ni(n.doc, r.before(s), r.after(s), de.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Jn(o, "end") ? lt.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Xe.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Eu = (n, e, t) => {
  let r = al(n, t);
  if (!r)
    return !1;
  let i = Yi(r);
  return i ? dl(n, i, e) : !1;
}, Mu = (n, e, t) => {
  let r = hl(n, t);
  if (!r)
    return !1;
  let i = Ui(r);
  return i ? dl(n, i, e) : !1;
};
function dl(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let a = i.lastChild;
    if (!a)
      return !1;
    i = a;
  }
  let s = e.nodeAfter, l = s, c = e.pos + 1;
  for (; !l.isTextblock; c++) {
    if (l.type.spec.isolating)
      return !1;
    let a = l.firstChild;
    if (!a)
      return !1;
    l = a;
  }
  let u = ni(n.doc, o, c, de.empty);
  if (!u || u.from != o || u instanceof dt && u.slice.size >= c - o)
    return !1;
  if (t) {
    let a = n.tr.step(u);
    a.setSelection(Lt.create(a.doc, o)), t(a.scrollIntoView());
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
const fl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Yi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Xe.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Xe.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
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
function hl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const pl = (n, e, t) => {
  let r = hl(n, t);
  if (!r)
    return !1;
  let i = Ui(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (bl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "start") || Xe.isSelectable(o))) {
    let s = ni(n.doc, r.before(), r.after(), de.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Jn(o, "start") ? lt.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Xe.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, ml = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Ui(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Xe.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Xe.create(n.doc, o.pos)).scrollIntoView()), !0);
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
const Ru = (n, e) => {
  let t = n.selection, r = t instanceof Xe, i;
  if (r) {
    if (t.node.isTextblock || !Mn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = ti(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Xe.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Au = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Xe) {
    if (t.node.isTextblock || !Mn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ti(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Iu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Xn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, gl = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Xi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Du = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Xi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(lt.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, yl = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Vt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Xi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Lt.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, xl = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (on(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Xn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function $u(n) {
  return (e, t) => {
    if (e.selection instanceof Xe && e.selection.node.isBlock) {
      let { $from: f } = e.selection;
      return !f.parentOffset || !on(e.doc, f.pos) ? !1 : (t && t(e.tr.split(f.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Lt || e.selection instanceof Vt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, u = !1, a = !1;
    for (let f = i.depth; ; f--)
      if (i.node(f).isBlock) {
        u = i.end(f) == i.pos + (i.depth - f), a = i.start(f) == i.pos - (i.depth - f), c = Xi(i.node(f - 1).contentMatchAt(i.indexAfter(f - 1))), s.unshift(u && c ? { type: c } : null), l = f;
        break;
      } else {
        if (f == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, h = on(r.doc, d, s.length, s);
    if (h || (s[0] = c ? { type: c } : null, h = on(r.doc, d, s.length, s)), !h)
      return !1;
    if (r.split(d, s.length, s), !u && a && i.node(l).type != c) {
      let f = r.mapping.slice(o), m = f.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(f.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const zu = $u(), Lu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Xe.create(n.doc, i))), !0);
};
function Pu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Mn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function bl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && Pu(n, e, t))
    return !0;
  let u = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (u && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let f = e.pos + o.nodeSize, m = K.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = K.from(s[x].create(null, m));
      m = K.from(i.copy(m));
      let g = n.tr.step(new mt(e.pos - 1, f, e.pos, f, new de(m, 1, 0), s.length, !0)), b = g.doc.resolve(f + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Mn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let a = o.type.spec.isolating || r > 0 && c ? null : lt.findFrom(e, 1), d = a && a.$from.blockRange(a.$to), h = d && Xn(d);
  if (h != null && h >= e.depth)
    return t && t(n.tr.lift(d, h).scrollIntoView()), !0;
  if (u && Jn(o, "start", !0) && Jn(i, "end")) {
    let f = i, m = [];
    for (; m.push(f), !f.isTextblock; )
      f = f.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (f.canReplace(f.childCount, f.childCount, g.content)) {
      if (t) {
        let x = K.empty;
        for (let E = m.length - 1; E >= 0; E--)
          x = K.from(m[E].copy(x));
        let L = n.tr.step(new mt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new de(x, m.length, 0), 0, !0));
        t(L.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function vl(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Lt.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Ou = vl(-1), Fu = vl(1);
function Bu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && el(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Io(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (c, u) => {
        if (i)
          return !1;
        if (!(!c.isTextblock || c.hasMarkup(n, e)))
          if (c.type == n)
            i = !0;
          else {
            let a = t.doc.resolve(u), d = a.index();
            i = a.parent.canReplaceWith(d, d + 1, n);
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
Gi(cl, ul, fl);
Gi(cl, pl, ml);
Gi(gl, yl, xl, zu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Hu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return _u(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function _u(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Br(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Br(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = el(o, t, r, e);
  return l ? (n && ju(n, e, l, i, t), !0) : !1;
}
function ju(n, e, t, r, i) {
  let o = K.empty;
  for (let a = t.length - 1; a >= 0; a--)
    o = K.from(t[a].type.create(t[a].attrs, o));
  n.step(new mt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new de(o, 0, 0), t.length, !0));
  let s = 0;
  for (let a = 0; a < t.length; a++)
    t[a].type == i && (s = a + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), u = e.parent;
  for (let a = e.startIndex, d = e.endIndex, h = !0; a < d; a++, h = !1)
    !h && on(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += u.child(a).nodeSize;
  return n;
}
function Wu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? qu(e, t, n, o) : Ku(e, t, o) : !0 : !1;
  };
}
function qu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new mt(o - 1, s, o, s, new de(K.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Br(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Xn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Mn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Ku(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let f = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    f -= i.child(m).nodeSize, r.delete(f - 1, f + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, u = o.node(-1), a = o.index(-1);
  if (!u.canReplace(a + (l ? 0 : 1), a + 1, s.content.append(c ? K.empty : K.from(i))))
    return !1;
  let d = o.pos, h = d + s.nodeSize;
  return r.step(new mt(d - (l ? 1 : 0), h + (c ? 1 : 0), d + 1, h - 1, new de((l ? K.empty : K.from(i.copy(K.empty))).append(c ? K.empty : K.from(i.copy(K.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Ju(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (u) => u.childCount > 0 && u.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, c = l.child(s - 1);
    if (c.type != n)
      return !1;
    if (t) {
      let u = c.lastChild && c.lastChild.type == l.type, a = K.from(u ? n.create() : null), d = new de(K.from(n.create(null, K.from(l.type.create(null, a)))), u ? 3 : 1, 0), h = o.start, f = o.end;
      t(e.tr.step(new mt(h - (u ? 3 : 1), f, h, f, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function wl(n) {
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
var Vu = class kl {
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
    return Object.fromEntries(Object.entries(e).map(([l, c]) => [l, (...a) => {
      const d = c(...a)(s);
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
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], c = !!e, u = e || o.tr, a = () => (!c && t && !u.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(u), l.every((h) => h === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([h, f]) => [h, (...g) => {
        const b = this.buildProps(u, t), x = f(...g)(b);
        return l.push(x), d;
      }])),
      run: a
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
      ...Object.fromEntries(Object.entries(t).map(([l, c]) => [l, (...u) => c(...u)({
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
    const e = kl.createFakeChain();
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
      state: wl({
        state: o,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([c, u]) => [c, (...a) => u(...a)(l)]));
      }
    };
    return l;
  }
};
const Yu = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Uu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Xu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: u, mapping: a } = e, d = u.resolve(a.map(c)), h = u.resolve(a.map(c + l.nodeSize)), f = d.blockRange(h);
      if (!f) return;
      const m = Xn(f);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(f.start, g);
      }
      (m || m === 0) && e.lift(f, m);
    });
  }), !0;
}, Gu = (n) => (e) => n(e), Qu = () => ({ state: n, dispatch: e }) => yl(n, e), Zu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Wt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, ed = () => ({ tr: n, dispatch: e }) => {
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
const td = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Tt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, nd = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, rd = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Do = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return rd(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, id = (n, e, t) => ({
  from: Do(n, t, "left"),
  to: Do(e, t, "right")
}), od = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: u, to: a } = id(l, c, n.schema);
      t.deleteRange(u, a);
    }), t.selection.empty || t.setSelection(Wt.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, sd = () => ({ commands: n }) => n.keyboardShortcut("Enter"), ld = () => ({ state: n, dispatch: e }) => Du(n, e);
function cd(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Wr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : cd(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Sl(n, e, t = {}) {
  return n.find((r) => r.type === e && Wr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function $o(n, e, t = {}) {
  return !!Sl(n, e, t);
}
function Nl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((u) => u.type === e);
    c && (t = c.attrs);
  }
  if (!Sl([...r.node.marks], e, t)) return;
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
const ad = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = bn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: u, to: a } = l;
  if (i) {
    const d = Nl(c, o, e);
    if (d && d.from <= u && d.to >= a) {
      const h = Wt.create(s, d.from, d.to);
      t.setSelection(h);
    }
  }
  return !0;
}, ud = (n) => (e) => {
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
function dd(n, e = null) {
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
function fd() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const hd = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (qr() || zo()) && r.dom.focus(), fd() && !qr() && !zo() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
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
  const l = dd(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, pd = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), md = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
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
function Cr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Cl(t);
}
function El(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Vn(n, e, t) {
  if (El(n)) return n;
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
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Vn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Xa({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
          content: "inline*",
          group: "block",
          parseDOM: [{
            tag: "*",
            getAttrs: (u) => (s = !0, l = typeof u == "string" ? u : u.outerHTML, null)
          }]
        } })
      });
      if (t.slice ? jn.fromSchema(c).parseSlice(Cr(n), t.parseOptions) : jn.fromSchema(c).parse(Cr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = jn.fromSchema(e);
    return t.slice ? o.parseSlice(Cr(n), t.parseOptions).content : o.parse(Cr(n), t.parseOptions);
  }
  return Vn("", e, t);
}
function Ml(n) {
  return !("type" in n);
}
function Rl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof dt || i instanceof mt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, u, a) => {
    s === 0 && (s = a);
  }), n.setSelection(Bn.near(n.doc.resolve(s), t));
}
const gd = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
    }, u = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      Vn(e, o.schema, {
        parseOptions: u,
        errorOnInvalidContent: !0
      });
    } catch (b) {
      c(b);
    }
    try {
      var s;
      l = Vn(e, o.schema, {
        parseOptions: u,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (b) {
      return c(b), !1;
    }
    let { from: a, to: d } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, h = !0, f = !0;
    const m = Ml(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), h = h ? b.isText && b.marks.length === 0 : !1, f = f ? b.isBlock : !1;
    }), a === d && f) {
      const { parent: b } = r.doc.resolve(a);
      b.isTextblock && !b.type.spec.code && !b.childCount && (a -= 1, d += 1);
    }
    let g;
    if (h)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : El(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, a, d);
    else {
      g = K.from(m);
      const b = r.doc.resolve(a), x = b.node(), L = b.parentOffset === 0, E = x.isText || x.isTextblock, w = x.content.size > 0;
      L && E && w && f && (a = Math.max(0, a - 1)), r.replaceWith(a, d, m);
    }
    t.updateSelection && Rl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: a,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: a,
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
const yd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const u = Al(c.parent.contentMatchAt(c.index()));
  if (!u) return !1;
  const a = Object.keys(u.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([f]) => a.includes(f))) : {};
  let h;
  if (s) {
    const f = Vn(s, r.schema);
    h = u.createAndFill(d, f);
  } else h = u.createAndFill(d);
  return h ? (t && (e.insert(c.pos, h), l && Rl(e, e.steps.length - 1, -1)), !0) : !1;
}, xd = () => ({ state: n, dispatch: e }) => Ru(n, e), bd = () => ({ state: n, dispatch: e }) => Au(n, e), vd = () => ({ state: n, dispatch: e }) => ul(n, e), wd = () => ({ state: n, dispatch: e }) => pl(n, e), kd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ti(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Sd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ti(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Nd = () => ({ state: n, dispatch: e }) => Eu(n, e), Td = () => ({ state: n, dispatch: e }) => Mu(n, e);
function Il() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Cd(n) {
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
      qr() || Il() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Ed = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Cd(n).split(/-(?!$)/), s = o.find((u) => ![
    "Alt",
    "Ctrl",
    "Meta",
    "Shift"
  ].includes(u)), l = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), c = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (u) => u(t, l));
  });
  return c == null || c.steps.forEach((u) => {
    const a = u.map(r.mapping);
    a && i && r.maybeStep(a);
  }), !0;
};
function Qi(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Tt(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (a, d) => {
    if (a.isText) return;
    const h = Math.max(r, d), f = Math.min(i, d + a.nodeSize);
    l.push({
      node: a,
      from: h,
      to: f
    });
  });
  const c = i - r, u = l.filter((a) => s ? s.name === a.node.type.name : !0).filter((a) => Wr(a.node.attrs, t, { strict: !1 }));
  return o ? !!u.length : u.reduce((a, d) => a + d.to - d.from, 0) >= c;
}
const Md = (n, e = {}) => ({ state: t, dispatch: r }) => Qi(t, Tt(n, t.schema), e) ? Iu(t, r) : !1, Rd = () => ({ state: n, dispatch: e }) => xl(n, e), Ad = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Wu(r)(e, t);
}, Id = () => ({ state: n, dispatch: e }) => gl(n, e);
function Dl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Lo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Dd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Dl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((u) => {
    r.doc.nodesBetween(u.$from.pos, u.$to.pos, (a, d) => {
      o && o === a.type && (c = !0, i && t.setNodeMarkup(d, void 0, Lo(a.attrs, e))), s && a.marks.length && a.marks.forEach((h) => {
        s === h.type && (c = !0, i && t.addMark(d, d + a.nodeSize, s.create(Lo(h.attrs, e))));
      });
    });
  }), c;
}, $d = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), zd = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new fc(n.doc);
    n.setSelection(t);
  }
  return !0;
}, Ld = () => ({ state: n, dispatch: e }) => fl(n, e), Pd = () => ({ state: n, dispatch: e }) => ml(n, e), Od = () => ({ state: n, dispatch: e }) => Lu(n, e), Fd = () => ({ state: n, dispatch: e }) => Fu(n, e), Bd = () => ({ state: n, dispatch: e }) => Ou(n, e);
function Hd(n, e, t = {}, r = {}) {
  return Vn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const _d = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const u = Hd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const a = Ml(u) ? u.content : [u];
      o.replaceWith(0, c.content.size, a).setMeta("preventUpdate", !t);
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
function jd(n, e) {
  const t = bn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Wd(n, e) {
  const t = new Nu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function qd(n, e) {
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
  return (e) => qd(e.$from, n);
}
function lr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? lr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? lr(n.parent, e, t) : null
  }) : n.config[e];
}
function Kd(n) {
  return typeof n == "function";
}
function Ei(n, e = void 0, ...t) {
  return Kd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function $l(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Jd(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (c, u, a, d) => {
    c.isBlock && u > r && (l += o);
    const h = s == null ? void 0 : s[c.type.name];
    if (h)
      return a && (l += h({
        node: c,
        pos: u,
        parent: a,
        index: d,
        range: e
      })), !1;
    if (c.isText) {
      var f;
      l += c == null || (f = c.text) === null || f === void 0 ? void 0 : f.slice(Math.max(r, u) - u, i - u);
    }
  }), l;
}
function Vd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Yd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Ud(n) {
  const e = Yd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Xd(n) {
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
      const u = e.slice(o).map(l, -1), a = e.slice(o).map(c), d = e.invert().map(u, -1), h = e.invert().map(a);
      r.push({
        oldRange: {
          from: d,
          to: h
        },
        newRange: {
          from: u,
          to: a
        }
      });
    });
  }), Ud(r);
}
function Ar(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Gd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? bn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((a) => o ? o.name === a.type.name : !0).find((a) => Wr(a.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: a, $to: d }) => {
    const h = a.pos, f = d.pos;
    n.doc.nodesBetween(h, f, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(h, g), x = Math.min(f, g + m.nodeSize), L = x - b;
      s += L, l.push(...m.marks.map((E) => ({
        mark: E,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((a) => o ? o.name === a.mark.type.name : !0).filter((a) => Wr(a.mark.attrs, t, { strict: !1 })).reduce((a, d) => a + d.to - d.from, 0), u = l.filter((a) => o ? a.mark.type !== o && a.mark.type.excludes(o) : !0).reduce((a, d) => a + d.to - d.from, 0);
  return (c > 0 ? c + u : c) >= s;
}
function pi(n, e) {
  const { nodeExtensions: t } = $l(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Ei(lr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function zl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (zl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Qd(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (Tl(r) && (i = r.$cursor), i) {
    var o;
    const l = (o = n.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((c) => c.type.excludes(t)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: l, $to: c }) => {
    let u = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, c.pos, (a, d, h) => {
      if (u) return !1;
      if (a.isInline) {
        const f = !h || h.type.allowsMarkType(t), m = !!t.isInSet(a.marks) || !a.marks.some((g) => g.type.excludes(t));
        u = f && m;
      }
      return !u;
    }), u;
  });
}
const Zd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = bn(n, r.schema);
  if (i)
    if (s) {
      const u = jd(r, c);
      t.addStoredMark(c.create({
        ...u,
        ...e
      }));
    } else l.forEach((u) => {
      const a = u.$from.pos, d = u.$to.pos;
      r.doc.nodesBetween(a, d, (h, f) => {
        const m = Math.max(f, a), g = Math.min(f + h.nodeSize, d);
        h.marks.find((b) => b.type === c) ? h.marks.forEach((b) => {
          c === b.type && t.addMark(m, g, c.create({
            ...b.attrs,
            ...e
          }));
        }) : t.addMark(m, g, c.create(e));
      });
    });
  return Qd(r, t, c);
}, ef = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), tf = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Tt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Io(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Io(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, nf = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = kn(n, 0, r.content.size), o = qn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, rf = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, u) => {
    c.isText || t.setNodeMarkup(u, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, of = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Wt.atStart(r).from, l = Wt.atEnd(r).to, c = kn(i, s, l), u = kn(o, s, l), a = Wt.create(r, c, u);
    e.setSelection(a);
  }
  return !0;
}, sf = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Ju(r)(e, t);
};
function Po(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const lf = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, u = i.extensionManager.attributes, a = Ar(u, l.node().type.name, l.node().attrs);
  if (o instanceof qn && o.node.isBlock)
    return !l.parentOffset || !on(s, l.pos) ? !1 : (r && (n && Po(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, h = l.depth === 0 ? void 0 : Al(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let f = d && h ? [{
    type: h,
    attrs: a
  }] : void 0, m = on(e.doc, e.mapping.map(l.pos), 1, f);
  if (!f && !m && on(e.doc, e.mapping.map(l.pos), 1, h ? [{ type: h }] : void 0) && (m = !0, f = h ? [{
    type: h,
    attrs: a
  }] : void 0), r) {
    if (m && (o instanceof Wt && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, f), h && !d && !l.parentOffset && l.parent.type !== h)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, h) && e.setNodeMarkup(e.mapping.map(l.before()), h);
    }
    n && Po(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, cf = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Tt(n, r.schema), { $from: l, $to: c } = r.selection, u = r.selection.node;
  if (u && u.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const a = l.node(-1);
  if (a.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var h;
      let x = K.empty;
      const L = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let J = l.depth - L; J >= l.depth - 3; J -= 1) x = K.from(l.node(J).copy(x));
      const E = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, w = {
        ...Ar(d, l.node().type.name, l.node().attrs),
        ...e
      }, S = ((h = s.contentMatch.defaultType) === null || h === void 0 ? void 0 : h.createAndFill(w)) || void 0;
      x = x.append(K.from(s.createAndFill(null, S) || void 0));
      const C = l.before(l.depth - (L - 1));
      t.replace(C, l.after(-E), new de(x, 4 - L, 0));
      let j = -1;
      t.doc.nodesBetween(C, t.doc.content.size, (J, R) => {
        if (j > -1) return !1;
        J.isTextblock && J.content.size === 0 && (j = R + 1);
      }), j > -1 && t.setSelection(Wt.near(t.doc.resolve(j))), t.scrollIntoView();
    }
    return !0;
  }
  const f = c.pos === l.end() ? a.contentMatchAt(0).defaultType : null, m = {
    ...Ar(d, a.type.name, a.attrs),
    ...e
  }, g = {
    ...Ar(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, c.pos);
  const b = f ? [{
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
    const { selection: x, storedMarks: L } = r, { splittableMarks: E } = o.extensionManager, w = L || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !w || !i) return !0;
    const S = w.filter((C) => E.includes(C.type.name));
    t.ensureMarks(S);
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
  const t = Zi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, t.pos)) || !Ll(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, gi = (n, e) => {
  const t = Zi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, r)) || !Ll(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function af(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Wt.between(r, i);
}
const uf = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: u, can: a }) => {
  const { extensions: d, splittableMarks: h } = i.extensionManager, f = Tt(n, s.schema), m = Tt(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: L } = g, E = x.blockRange(L), w = b || g.$to.parentOffset && g.$from.marks();
  if (!E) return !1;
  const S = Zi((B) => pi(B.type.name, d))(g), C = g.from === 0 && g.to === s.doc.content.size, j = s.doc.content.content, J = j.length === 1 ? j[0] : null, R = C && J && pi(J.type.name, d) ? {
    node: J,
    pos: 0
  } : null, V = S ?? R, N = !!S && E.depth >= 1 && E.depth - S.depth <= 1, O = !!R;
  if ((N || O) && V) {
    if (V.node.type === f)
      return C && O ? c().command(({ tr: B, dispatch: W }) => {
        const Y = af(B);
        return Y ? (B.setSelection(Y), W && W(B), !0) : !1;
      }).liftListItem(m).run() : u.liftListItem(m);
    if (pi(V.node.type.name, d) && f.validContent(V.node.content)) return c().command(() => (o.setNodeMarkup(V.pos, f), !0)).command(() => mi(o, f)).command(() => gi(o, f)).run();
  }
  return !t || !w || !l ? c().command(() => a().wrapInList(f, r) ? !0 : u.clearNodes()).wrapInList(f, r).command(() => mi(o, f)).command(() => gi(o, f)).run() : c().command(() => {
    const B = a().wrapInList(f, r), W = w.filter((Y) => h.includes(Y.type.name));
    return o.ensureMarks(W), B ? !0 : u.clearNodes();
  }).wrapInList(f, r).command(() => mi(o, f)).command(() => gi(o, f)).run();
}, df = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = bn(n, r.schema);
  return Gd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, ff = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Tt(n, r.schema), s = Tt(e, r.schema), l = Qi(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, hf = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Tt(n, t.schema);
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
    const u = Object.values(r.schema.marks).filter((a) => i || !c.includes(a.name));
    l.forEach((a) => {
      for (const d of u) e.removeMark(a.$from.pos, a.$to.pos, d);
    });
  }
  return !0;
}, gf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = bn(n, r.schema), { $from: c, empty: u, ranges: a } = s;
  if (!i) return !0;
  if (u && o) {
    var d;
    let { from: h, to: f } = s;
    const m = Nl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (h = m.from, f = m.to), t.removeMark(h, f, l);
  } else a.forEach((h) => {
    t.removeMark(h.$from.pos, h.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, yf = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const u = { ...l.attrs };
    delete u.dir, e.setNodeMarkup(c, void 0, u);
  }), !0;
}, xf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Dl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((u) => {
    const a = u.$from.pos, d = u.$to.pos;
    let h, f, m, g;
    t.selection.empty ? r.doc.nodesBetween(a, d, (b, x) => {
      o && o === b.type && (c = !0, m = Math.max(x, a), g = Math.min(x + b.nodeSize, d), h = x, f = b);
    }) : r.doc.nodesBetween(a, d, (b, x) => {
      x < a && o && o === b.type && (c = !0, m = Math.max(x, a), g = Math.min(x + b.nodeSize, d), h = x, f = b), x >= a && x <= d && (o && o === b.type && (c = !0, i && t.setNodeMarkup(x, void 0, {
        ...b.attrs,
        ...e
      })), s && b.marks.length && b.marks.forEach((L) => {
        if (s === L.type && (c = !0, i)) {
          const E = Math.max(x, a), w = Math.min(x + b.nodeSize, d);
          t.addMark(E, w, s.create({
            ...L.attrs,
            ...e
          }));
        }
      }));
    }), f && (h !== void 0 && i && t.setNodeMarkup(h, void 0, {
      ...f.attrs,
      ...e
    }), s && f.marks.length && f.marks.forEach((b) => {
      s === b.type && i && t.addMark(m, g, s.create({
        ...b.attrs,
        ...e
      }));
    }));
  }), c;
}, bf = new Yt("__tiptap_decorations__"), vf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(bf, {
  type: "force",
  name: n
}), !0), wf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return Bu(i, e)(t, r);
}, kf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return Hu(i, e)(t, r);
};
var Sf = /* @__PURE__ */ $a({
  blur: () => Yu,
  clearContent: () => Uu,
  clearNodes: () => Xu,
  command: () => Gu,
  createParagraphNear: () => Qu,
  cut: () => Zu,
  deleteCurrentNode: () => ed,
  deleteNode: () => td,
  deleteRange: () => nd,
  deleteSelection: () => od,
  enter: () => sd,
  exitCode: () => ld,
  extendMarkRange: () => ad,
  first: () => ud,
  focus: () => hd,
  forEach: () => pd,
  insertContent: () => md,
  insertContentAt: () => gd,
  insertDefaultBlock: () => yd,
  joinBackward: () => vd,
  joinDown: () => bd,
  joinForward: () => wd,
  joinItemBackward: () => kd,
  joinItemForward: () => Sd,
  joinTextblockBackward: () => Nd,
  joinTextblockForward: () => Td,
  joinUp: () => xd,
  keyboardShortcut: () => Ed,
  lift: () => Md,
  liftEmptyBlock: () => Rd,
  liftListItem: () => Ad,
  newlineInCode: () => Id,
  resetAttributes: () => Dd,
  scrollIntoView: () => $d,
  selectAll: () => zd,
  selectNodeBackward: () => Ld,
  selectNodeForward: () => Pd,
  selectParentNode: () => Od,
  selectTextblockEnd: () => Fd,
  selectTextblockStart: () => Bd,
  setContent: () => _d,
  setMark: () => Zd,
  setMeta: () => ef,
  setNode: () => tf,
  setNodeSelection: () => nf,
  setTextDirection: () => rf,
  setTextSelection: () => of,
  sinkListItem: () => sf,
  splitBlock: () => lf,
  splitListItem: () => cf,
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
function Er(n) {
  return Nf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Pl(n, e) {
  const t = { ...n };
  return Er(n) && Er(e) && Object.keys(e).forEach((r) => {
    Er(e[r]) && Er(n[r]) ? t[r] = Pl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Ol = class {
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
      addOptions: () => Pl(this.options, n)
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
}, Tf = class Fl extends Ol {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Fl(t);
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
}, qt = class Bl extends Ol {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Bl(t);
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
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Vd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, u) => c.$from.pos - u.$from.pos).map(({ $from: c, $to: u }) => Jd(r, {
          from: c.pos,
          to: u.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
qt.create({
  name: "commands",
  addCommands() {
    return { ...Sf };
  }
});
qt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Wd(n.before, [n, ...e]);
      Xd(c).forEach((a) => {
        c.mapping.mapResult(a.oldRange.from).deletedAfter && c.mapping.mapResult(a.oldRange.to).deletedBefore && c.before.nodesBetween(a.oldRange.from, a.oldRange.to, (d, h) => {
          const f = h + d.nodeSize - 2, m = a.oldRange.from <= h && f <= a.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: h,
            to: f,
            newFrom: c.mapping.map(h),
            newTo: c.mapping.map(f),
            deletedRange: a.oldRange,
            newRange: a.newRange,
            partial: !m,
            editor: this.editor,
            transaction: n,
            combinedTransform: c
          });
        });
      });
      const u = c.mapping;
      c.steps.forEach((a, d) => {
        if (a instanceof Jt) {
          var h, f;
          const m = u.slice(d).map(a.from, -1), g = u.slice(d).map(a.to), b = u.invert().map(m, -1), x = u.invert().map(g), L = m > 0 ? (h = c.doc.nodeAt(m - 1)) === null || h === void 0 ? void 0 : h.marks.some((w) => w.eq(a.mark)) : !1, E = (f = c.doc.nodeAt(g)) === null || f === void 0 ? void 0 : f.marks.some((w) => w.eq(a.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: a.mark,
            from: a.from,
            to: a.to,
            deletedRange: {
              from: b,
              to: x
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(E || L),
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
const Cf = new Yt("focusEvents");
qt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new ln({
      key: Cf,
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
        const { selection: c, doc: u } = l, { empty: a, $anchor: d } = c, { pos: h, parent: f } = d, m = d.parent.isTextblock && h > 0 ? l.doc.resolve(h - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : Bn.atStart(u).from === h;
        return !a || !f.type.isTextblock || f.textContent.length || !x || x && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return qr() || Il() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Yt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((f) => f.getMeta("composition"))) return;
        const r = n.some((f) => f.docChanged) && !e.doc.eq(t.doc), i = n.some((f) => f.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Bn.atStart(e.doc).from, u = Bn.atEnd(e.doc).to;
        if (o || !(s === c && l === u) || !zl(t.doc)) return;
        const a = t.tr, d = wl({
          state: t,
          transaction: a
        }), { commands: h } = new Vu({
          editor: this.editor,
          state: d
        });
        if (h.clearNodes(), !!a.steps.length)
          return a;
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
    const { nodeExtensions: n } = $l(this.extensions);
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
const Ef = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Mf = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Rf = /^(https?:\/\/|mailto:)/i;
function Af(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Mf.has(i) && o && e.push(`${i}: ${o}`);
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
  if (!Ef.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Rf.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Af(o || "");
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
function Hl(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function If(n) {
  const e = Hl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Mi(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function cp(n) {
  const e = Hl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function ap(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Df(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Fo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const $f = { text: "#52525b" }, zf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var h;
  const s = n.attrs.field ?? "", l = t.options, c = ((h = l.resolve) == null ? void 0 : h.call(l, s)) ?? null, u = (c == null ? void 0 : c.color) ?? $f, a = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ p(
    ac,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${e ? "rt-token-selected" : ""}`,
      style: {
        background: u.text,
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
        var x;
        if (f.button !== 0 || !r.isEditable) return;
        f.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), b = g.nodeAfter;
        b && qn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new qn(g))), (x = l.onTokenClick) == null || x.call(l, s, f.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ p("span", { className: "rt-token-nested", children: a }) : a
    }
  );
}, Lf = Sc.extend({
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
    return cc(zf);
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
    return ["span", lc({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), Pf = 240, Of = 280, Ff = ({ props: n, onApi: e }) => {
  const t = Gr(), r = v(e);
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
  const o = Xr();
  return /* @__PURE__ */ p(ur.Provider, { value: t, children: /* @__PURE__ */ p(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Of, maxHeight: Pf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ p("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ p(
        Bf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Bf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Cs({
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
      /* @__PURE__ */ p(Ff, { props: r, onApi: (i) => {
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
        var a, d;
        if (!n) return;
        const c = (d = (a = n.props) == null ? void 0 : a.clientRect) == null ? void 0 : d.call(a), u = c && !s.endsWith("-end") ? c.width : 0;
        n.holder.style.position = l, n.holder.style.left = `${i + u}px`, n.holder.style.top = `${o}px`;
      }
    }));
  };
  return {
    onStart(r) {
      const i = document.createElement("div");
      i.style.zIndex = "10002";
      const o = Nc(i);
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
        const c = s.highlightedIndex, u = l === "ArrowDown" ? 1 : -1;
        return s.setHighlighted((c + u + i.length) % i.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        r.preventDefault();
        const c = s.highlightedIndex, u = c >= 0 ? c : 0, a = s.items[u];
        return a ? a.activate() : i[u] && o({ field: i[u].key }), !0;
      }
      return !1;
    },
    onExit() {
      var r;
      n && ((r = n.unmount) == null || r.call(n), n.root.unmount(), n.holder.remove(), n = null);
    }
  };
}, Hf = Tf.create({
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
}), Ir = new Yt("retainedSelectionHighlight"), _f = qt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new ln({
        key: Ir,
        state: {
          init: () => ({ held: !1, decorations: gr.empty }),
          apply(n, e) {
            const t = n.getMeta(Ir), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: gr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? gr.empty : gr.create(n.doc, [hc.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Ir.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), up = {
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
function _l(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function jf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = _l(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Wf = at.forwardRef(({
  value: n,
  onChange: e,
  placeholder: t,
  disabled: r,
  className: i,
  onStateChange: o,
  resolveToken: s,
  suggestionItems: l,
  attributeItems: c,
  onTokenClick: u,
  onSelectionChange: a
}, d) => {
  const h = v(s);
  h.current = s;
  const f = v(l);
  f.current = l;
  const m = v(c);
  m.current = c;
  const g = v(u);
  g.current = u;
  const b = v(a);
  b.current = a;
  const x = v(null), L = v(null), E = v(e);
  E.current = e;
  const w = v(r);
  w.current = r;
  const S = v(o);
  S.current = o;
  const C = v(null), j = (O) => {
    var xe;
    const B = O.getAttributes("textStyle"), W = O.getAttributes("reportTextStyle"), { from: Y, to: I, empty: X } = O.state.selection;
    let Q = !1, te = !1, ce = !1;
    if (!X) {
      const Ne = /* @__PURE__ */ new Set(), ve = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Set();
      O.state.doc.nodesBetween(Y, I, (ye) => {
        if (!ye.isText) return;
        const ie = ye.marks.find((D) => D.type.name === "textStyle");
        Ne.add((ie == null ? void 0 : ie.attrs.fontFamily) || ""), ve.add((ie == null ? void 0 : ie.attrs.fontSize) || "");
        const _ = ye.marks.find((D) => D.type.name === "reportTextStyle");
        ne.add((_ == null ? void 0 : _.attrs.styleId) || "");
      }), Q = Ne.size > 1, te = ve.size > 1, ce = ne.size > 1;
    }
    const M = {
      bold: O.isActive("bold"),
      italic: O.isActive("italic"),
      underline: O.isActive("underline"),
      strike: O.isActive("strike"),
      link: O.isActive("link"),
      color: B.color || "",
      fontFamily: B.fontFamily || "",
      fontSize: B.fontSize || "",
      textStyle: W.styleId || "",
      hasSelection: !X,
      fontFamilyMixed: Q,
      fontSizeMixed: te,
      textStyleMixed: ce
    }, le = C.current;
    le && le.bold === M.bold && le.italic === M.italic && le.underline === M.underline && le.strike === M.strike && le.link === M.link && le.color === M.color && le.fontFamily === M.fontFamily && le.fontSize === M.fontSize && le.textStyle === M.textStyle && le.hasSelection === M.hasSelection && le.fontFamilyMixed === M.fontFamilyMixed && le.fontSizeMixed === M.fontSizeMixed && le.textStyleMixed === M.textStyleMixed || (C.current = M, (xe = S.current) == null || xe.call(S, M));
  }, J = (O) => {
    var X;
    const B = O.state.selection;
    let W = null;
    B instanceof qn && B.node.type.name === "token" ? (W = { key: B.node.attrs.field ?? "", pos: B.from }, x.current = B.from) : x.current != null && (x.current = O.state.tr.mapping.map(x.current));
    const Y = L.current, I = Y && W && Y.key === W.key && Y.pos === W.pos;
    !Y && !W || I || (L.current = W, (X = b.current) == null || X.call(b, W));
  }, R = (O) => {
    const B = If(Df(O));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(B) ? "" : B;
  }, V = at.useMemo(() => {
    const O = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: Y }) => {
        var I;
        return ((I = f.current) == null ? void 0 : I.call(f, Y)) ?? [];
      },
      command: ({ editor: Y, range: I, props: X }) => {
        Y.chain().focus().insertContentAt(I, { type: "token", attrs: { field: X.field } }).run();
      },
      render: Bo
    }, B = Lf.configure({
      resolve: h.current ?? null,
      suggestion: O,
      onTokenClick: (Y, I, X) => {
        var Q;
        x.current = X, (Q = g.current) == null || Q.call(g, Y, I, X);
      }
    }), W = qt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          kc({
            pluginKey: new Yt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: Y, range: I }) => _l(Y, I.from) != null,
            items: ({ editor: Y, query: I }) => {
              var Q;
              const X = jf(Y);
              return X ? ((Q = m.current) == null ? void 0 : Q.call(m, X.chipKey, I)) ?? [] : [];
            },
            command: ({ editor: Y, range: I, props: X }) => {
              Y.chain().focus().insertContentAt(I, { type: "token", attrs: { field: X.field } }).run();
            },
            render: Bo
          })
        ];
      }
    });
    return [B, W];
  }, []), N = uc({
    immediatelyRender: !1,
    extensions: [
      pc,
      mc.configure({ placeholder: t }),
      gc,
      yc,
      xc,
      Hf,
      _f,
      bc,
      wc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      vc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...V
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
      j(O), J(O);
    }
  });
  return ae(() => {
    if (!N || N.isFocused) return;
    R(N.getHTML()) !== n && (C.current = null, N.commands.setContent(Fo(n || ""), { emitUpdate: !1 }), j(N));
  }, [n, N]), ae(() => {
    N && N.setEditable(!r);
  }, [r, N]), ae(() => {
    N && (C.current = null, j(N), J(N));
  }, [N]), qo(d, () => ({
    exec: (O, B, W) => {
      if (!N || w.current) return;
      const Y = N.chain(), I = (W == null ? void 0 : W.focus) === !1 ? Y : Y.focus();
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
          B && I.setColor(B).run();
          break;
        case "unsetColor":
          I.unsetColor().run();
          break;
        case "fontFamily":
          B && I.setFontFamily(B).run();
          break;
        case "unsetFontFamily":
          I.unsetFontFamily().run();
          break;
        case "fontSize":
          B && I.setFontSize(B).run();
          break;
        case "unsetFontSize":
          I.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          B && I.setMark("reportTextStyle", { styleId: B }).unsetFontFamily().unsetFontSize().run();
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
          B && I.extendMarkRange("link").setLink({ href: B }).run();
          break;
        case "unlink":
          I.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (O) => N == null ? void 0 : N.commands.focus(O),
    insertToken: (O) => {
      !N || w.current || N.chain().focus().insertContent({ type: "token", attrs: { field: O } }).run();
    },
    replaceToken: (O) => {
      if (!N || w.current) return;
      const B = x.current;
      B != null && N.commands.command(({ tr: W }) => {
        const Y = W.doc.nodeAt(B);
        if (!Y || Y.type.name !== "token") return !1;
        W.setNodeMarkup(B, void 0, { field: O });
        const I = W.doc.resolve(B);
        return I.nodeAfter && I.nodeAfter.type.name === "token" && W.setSelection(new qn(I)), !0;
      });
    },
    holdSelectionHighlight: (O) => {
      !N || N.isDestroyed || N.view.dispatch(N.state.tr.setMeta(Ir, { held: O }));
    }
  }), [N]), /* @__PURE__ */ p(dc, { editor: N, className: `richtext-editor ${i || ""}` });
});
Wf.displayName = "RichTextEditor";
const qf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Kf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Ho = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ p("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ p("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Jf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = re(!1);
  return /* @__PURE__ */ p(
    Qr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ A("button", { type: "button", disabled: e, className: `${Aa} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ p("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ p("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ p(mn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: qf.map((s) => /* @__PURE__ */ p(Es, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ p(cr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ p("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Vf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = re(!1), o = Zr(), [s, l] = re(""), c = () => {
    var a;
    const u = s.trim();
    u && ((a = n.current) == null || a.exec("link", u), i(!1));
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
          onMouseDown: (u) => u.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ p(ec, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ A("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ p(
          "input",
          {
            value: s,
            onChange: (u) => l(u.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (u) => {
              u.key === "Enter" && (u.preventDefault(), c());
            },
            style: o.input,
            className: Ma + " w-full"
          }
        ),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(zt, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ p(
            zt,
            {
              theme: "dark",
              onClick: () => {
                var u;
                (u = n.current) == null || u.exec("unlink"), i(!1);
              },
              style: o.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, dp = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [u, a] = re(!1), d = (b, x) => {
    var L;
    return (L = n.current) == null ? void 0 : L.exec(b, x);
  }, h = Zr(), f = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ p("div", { className: Is }) : null;
  return /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ A("div", { className: m, children: [
      /* @__PURE__ */ p(Ln, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || f("bold"), disabled: e || f("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...h.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ p(Ln, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || f("italic"), disabled: e || f("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...h.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ p(Ln, { content: "Underline", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...h.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Gl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ p(Ln, { content: "Strikethrough", children: /* @__PURE__ */ p(zt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...h.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Ql, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(Vf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(
      Qr,
      {
        open: u,
        onOpenChange: a,
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
                d("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ p(Ho, { className: "w-3.5 h-3.5" })
            }
          ),
          Kf.map((b) => /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                d("foreColor", b), a(!1);
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
    (o || s || l) && /* @__PURE__ */ A(ut, { children: [
      g,
      /* @__PURE__ */ A("div", { className: m, children: [
        o && /* @__PURE__ */ p(Jf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ p(Ln, { content: "Clear formatting", children: /* @__PURE__ */ p(
          zt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...h.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ p(Zl, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ A(ut, { children: [
      g,
      /* @__PURE__ */ p("div", { className: m, children: i })
    ] })
  ] });
};
function eo(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Yf(n, e, t, r, i) {
  return eo(n + e * i, t, r);
}
const Uf = 2;
function Xf(n, e, t, r, i) {
  return eo(n + Math.trunc(e / Uf) * i, t, r);
}
const Gf = 3;
function fp({
  value: n,
  min: e,
  max: t,
  fallback: r,
  onCommit: i,
  step: o = 1,
  readOnly: s,
  disabled: l,
  ariaLabel: c,
  className: u,
  title: a,
  placeholder: d,
  theme: h
}) {
  const [f, m] = re(null), [g, b] = re(!1), x = v(!1), L = v(null), E = v(null), w = v(null), S = We(), C = Rs(), j = u === void 0;
  ae(() => () => {
    var I;
    return (I = L.current) == null ? void 0 : I.call(L);
  }, []), tt(() => {
    const I = w.current, X = E.current;
    !j && I && X && (X.style.color = getComputedStyle(I).color);
  }, [j, u]), ae(() => {
    x.current || m(null);
  }, [n]);
  const J = n ?? r, R = f !== null ? f : n != null ? String(n) : d ? "" : String(r), V = (I) => eo(I, e, t), N = (I) => {
    const X = Yf(J, I, e, t, o);
    X !== J && (x.current && m(String(X)), i(X));
  }, O = (I) => {
    if (l || s || I.pointerType !== "mouse" || I.button !== 0) return;
    const X = I.currentTarget, Q = I.clientY, te = J;
    let ce = te, M = !1;
    const le = (Ne) => {
      const ve = Q - Ne.clientY;
      if (!M) {
        if (Math.abs(ve) < Gf) return;
        M = !0, X.blur(), X.style.userSelect = "none";
      }
      const ne = Xf(te, ve, e, t, o);
      ne !== ce && (ce = ne, i(ne));
    }, xe = () => {
      L.current = null, window.removeEventListener("pointermove", le), window.removeEventListener("pointerup", xe), window.removeEventListener("pointercancel", xe), X.style.userSelect = "", M && X.blur();
    };
    L.current = xe, window.addEventListener("pointermove", le), window.addEventListener("pointerup", xe), window.addEventListener("pointercancel", xe);
  }, B = (I) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": I === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (I === 1 ? J >= t : J <= e),
    /* Keep the input's focus (desktop) WITHOUT killing the tap: WebKit
       suppresses the click when a pointerdown's default is cancelled, so an
       iPhone/iPad stepper tap went dead. `mousedown` preserves the focus but
       does not cancel the click. */
    onMouseDown: (X) => X.preventDefault(),
    onClick: () => N(I)
  }), W = j ? F(22, 30, S) : F(16, 22, S), Y = j ? F(14, 18, S) : F(11, 15, S);
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
            title: a,
            placeholder: d,
            value: R,
            readOnly: s,
            disabled: l,
            className: u ?? "ui-input w-20",
            style: {
              ...j ? { ...C, minHeight: F(28, 36, S) } : {},
              paddingRight: W + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (I) => {
              const X = I.target.value;
              m(X);
              const Q = parseInt(X, 10);
              X !== "" && !Number.isNaN(Q) && i(V(Q));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), f === null) return;
              const I = parseInt(f, 10);
              Number.isNaN(I) || i(V(I)), m(null);
            },
            onKeyDown: (I) => {
              I.key === "Enter" && I.target.blur(), I.key === "Escape" && (m(null), I.target.blur()), !s && !l && (I.key === "ArrowUp" || I.key === "ArrowDown") && (I.preventDefault(), N(I.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: O
          }
        ),
        /* @__PURE__ */ A("span", { className: "ui-number-steppers", style: { width: W }, children: [
          /* @__PURE__ */ p("button", { ...B(1), className: "ui-number-step", children: /* @__PURE__ */ p(tc, { style: { width: Y, height: Y } }) }),
          /* @__PURE__ */ p("button", { ...B(-1), className: "ui-number-step", children: /* @__PURE__ */ p(mn, { style: { width: Y, height: Y } }) })
        ] })
      ]
    }
  );
}
function hp({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: u, children: a }) {
  const d = We(), h = gn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), f = F(14, 16, d), m = { width: f, height: f }, g = F(10, 12, d);
  return /* @__PURE__ */ A("div", { ...u, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
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
    !i && a && /* @__PURE__ */ p("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: a })
  ] });
}
function to({
  expanded: n,
  collapsedWidth: e,
  expandedWidth: t,
  trigger: r,
  field: i,
  rootRef: o,
  shrink: s = !1,
  stretch: l = !1,
  className: c = "",
  style: u,
  ...a
}) {
  const d = v(null), h = v(null), [f, m] = re(null), g = (C) => {
    d.current = C, typeof o == "function" ? o(C) : o && (o.current = C);
  };
  tt(() => {
    if (n) return;
    const C = d.current;
    if (!C || (h.current = C.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const j = new ResizeObserver(() => {
      h.current = C.getBoundingClientRect().width;
    });
    return j.observe(C), () => j.disconnect();
  }, [n]), tt(() => {
    if (!n || e !== "auto") {
      m(null);
      return;
    }
    m(h.current);
    const C = requestAnimationFrame(() => m(null));
    return () => cancelAnimationFrame(C);
  }, [n, e]);
  const [b, x] = re(!1), [L, E] = re(null), w = v(!1);
  tt(() => {
    if (n) {
      w.current = !0, x(!1), E(null);
      return;
    }
    if (!w.current || e !== "auto") return;
    w.current = !1, x(!0);
    let C = 0, j = 0;
    return (() => {
      var N;
      const R = (N = d.current) == null ? void 0 : N.firstElementChild, V = (R == null ? void 0 : R.getBoundingClientRect().width) ?? 0;
      V > 0 ? (C = requestAnimationFrame(() => E(V)), j = window.setTimeout(() => {
        x(!1), E(null);
      }, kt + 30)) : x(!1);
    })(), () => {
      cancelAnimationFrame(C), window.clearTimeout(j);
    };
  }, [n, e]);
  const S = n ? f ?? t : b ? L ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ A(
    "div",
    {
      ...a,
      ref: g,
      className: `relative ${l ? "flex" : "inline-flex"} ${s ? "shrink-0" : ""} ${c}`,
      style: {
        ...u,
        width: l ? "100%" : S,
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
  iconWithLabel: u = !0,
  triggerReveal: a = !1,
  theme: d,
  active: h = !1,
  autoFocus: f = !1,
  onExpandedChange: m,
  stretch: g = !1,
  actions: b,
  leadingIcon: x,
  showClear: L = !0,
  onSubmit: E,
  onCancel: w,
  cancelOnEscape: S = !1,
  cancelOnOutside: C = !1,
  className: j = "",
  "aria-label": J
}) {
  const [R, V] = re(f), N = v(R);
  N.current = R;
  const O = v(null), B = v(null), W = v(null), Y = Qo(), I = We(), X = F(9, 13, I), Q = se((_) => {
    N.current !== _ && (N.current = _, V(_), m == null || m(_));
  }, [m]), te = se((_ = !1) => {
    var D;
    Q(!1), (D = B.current) == null || D.blur(), _ && requestAnimationFrame(() => {
      var q;
      return (q = W.current) == null ? void 0 : q.focus();
    });
  }, [Q]), ce = se(() => {
    Q(!0);
    const _ = B.current;
    if (_) {
      _.focus({ preventScroll: !0 });
      const D = _.value.length;
      _.setSelectionRange(D, D);
    }
  }, [Q]);
  ae(() => {
    f && ce();
  }, [f, ce]), ae(() => {
    var q;
    if (!R) return;
    const _ = ((q = O.current) == null ? void 0 : q.ownerDocument) ?? document, D = (Pe) => {
      var pe;
      const Ce = Pe.target;
      Ce && ((pe = O.current) != null && pe.contains(Ce) || (C && (w == null || w()), te()));
    };
    return _.addEventListener("pointerdown", D, !0), () => _.removeEventListener("pointerdown", D, !0);
  }, [R, te, C, w]);
  const M = se((_) => {
    var q;
    if (!R) return;
    const D = _.relatedTarget;
    D && ((q = O.current) != null && q.contains(D)) || (C && (w == null || w()), te());
  }, [R, te, C, w]), le = se((_) => {
    if (_.key === "Enter") {
      _.preventDefault(), E == null || E(n), te(!0);
      return;
    }
    _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), S ? w == null || w() : e(""), te(!0));
  }, [e, te, S, w, E, n]), xe = r === void 0 ? /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5" }) : r, Ne = x === void 0 ? xe : x, ye = 8 + (((b == null ? void 0 : b.length) || 0) + (L && n ? 1 : 0)) * (Y.box + 2), ie = (_) => /* @__PURE__ */ p(
    "span",
    {
      style: { width: Y.icon, height: Y.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: _
    }
  );
  return /* @__PURE__ */ p(
    to,
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
          ref: W,
          type: "button",
          variant: l,
          size: "minimal",
          theme: d,
          icon: xe,
          collapse: c,
          iconWithLabel: u,
          revealOnHover: a,
          active: h,
          keepLabelOnActive: !0,
          onClick: ce,
          className: `${c ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${R ? "pointer-events-none" : ""}`,
          tabIndex: R ? -1 : 0,
          "aria-expanded": R,
          "aria-label": J || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ A(ut, { children: [
        Ne && /* @__PURE__ */ p(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: X, width: Y.icon, height: Y.icon },
            children: ie(Ne)
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            ref: B,
            value: n,
            onChange: (_) => e(_.target.value),
            onKeyDown: le,
            placeholder: i,
            "aria-label": J || i,
            tabIndex: R ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: Ne ? X + Y.icon + 6 : 10, paddingRight: ye },
            className: `${Pr("sm")} w-full`
          }
        ),
        /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          b == null ? void 0 : b.map((_) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": _.label,
              title: _.label,
              tabIndex: R ? 0 : -1,
              onMouseDown: (D) => D.preventDefault(),
              onClick: () => {
                _.onClick(n, { close: () => te(!0) }), _.keepOpen || te(!0);
              },
              style: { width: Y.box, height: Y.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": _.key,
              children: ie(_.icon)
            },
            _.key
          )),
          L && n && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: R ? 0 : -1,
              onClick: () => {
                var _;
                e(""), (_ = B.current) == null || _.focus({ preventScroll: !0 });
              },
              style: { width: Y.box, height: Y.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ p(Tn, { size: Y.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function pp({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ p(Jr, { className: "w-3.5 h-3.5" }),
  fieldIcon: t = null,
  actions: r = [],
  onSubmit: i,
  onCancel: o,
  clearOnSubmit: s = !0,
  clearOnCancel: l = !0,
  onChange: c,
  value: u,
  variant: a = "primary",
  triggerCollapse: d = !1,
  iconWithLabel: h = !0,
  ...f
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
      icon: /* @__PURE__ */ p(cr, { className: "w-3.5 h-3.5" }),
      onClick: m
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ p(Tn, { className: "w-3.5 h-3.5" }),
      onClick: g
    }] : []
  ];
  return /* @__PURE__ */ p(
    Qf,
    {
      ...f,
      value: u,
      onChange: c,
      triggerLabel: n,
      triggerIcon: e,
      triggerCollapse: d,
      iconWithLabel: h,
      leadingIcon: t,
      actions: b,
      showClear: !1,
      variant: a,
      onSubmit: i ? m : void 0,
      onCancel: o ? g : void 0,
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
    const u = s.find((a) => a.value.toLowerCase().includes(c));
    if (u) {
      const a = u.value.trim();
      return { matched: !0, detail: `${u.label}: ${a.length > 48 ? `${a.slice(0, 47)}…` : a}` };
    }
    if (i.includes(c)) return { matched: !0, detail: n.detail };
  }
  return { matched: !0 };
}
function jl(n, e, t) {
  const r = Zf(t), i = r.length > 0, o = new Map(e.map((u) => [u.key, u])), s = [];
  for (const u of n) {
    const { matched: a, detail: d } = eh(u, u.group ? o.get(u.group) : void 0, r);
    a && s.push({ item: u, detail: d });
  }
  const l = new Set(s.map((u) => u.item.group).filter(Boolean)), c = i ? e.filter((u) => l.has(u.key) || u.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function th(n) {
  var a;
  const { hits: e, visibleGroups: t, hasQuery: r } = jl(n.items, n.groups, n.query), i = [];
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
        const h = ((a = n.expandedGroups) == null ? void 0 : a.has(d.key)) ?? !1;
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
  const u = /* @__PURE__ */ new Set();
  for (const d of t) {
    i.push({ kind: "group", group: d }), u.add(d.key);
    for (const h of c)
      h.item.group === d.key && i.push({ kind: "item", hit: h });
  }
  for (const d of c)
    (!d.item.group || !u.has(d.item.group)) && i.push({ kind: "item", hit: d });
  return i.length === 0 && (i.push({ kind: "empty" }), (n.emptyActionLabels || []).forEach((d, h) => {
    i.push({ kind: "action", label: d, actionIndex: h });
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
  onQueryChange: u,
  onSelect: a,
  onSelectGroup: d,
  onClose: h,
  closeOnSelect: f = !0,
  openOnFocus: m = !0,
  expandableGroups: g = !1,
  browseExpanded: b = !1,
  groupExpandMode: x = "multiple",
  browseAll: L = !1,
  selectedId: E,
  autoFocus: w = !0,
  collapsedWidth: S = 128,
  expandedWidth: C = 288,
  panelWidth: j,
  panelMinWidth: J,
  keepAllRows: R = !1,
  maxMenuHeight: V = 420,
  theme: N = "light",
  morph: O = !0,
  emptyTitle: B,
  emptyHint: W,
  renderEmpty: Y,
  emptyActions: I,
  leadingActions: X,
  hideLeadingOnEmpty: Q = !1,
  footerActions: te,
  fieldActions: ce,
  multiple: M,
  open: le,
  onOpenChange: xe,
  hideTrigger: Ne = !1,
  anchorRef: ve,
  portalTarget: ne,
  renderTrigger: ye,
  renderItem: ie,
  highlightOnOpen: _ = !0,
  ref: D
}) {
  const q = c !== void 0, [Pe, Ce] = re(""), pe = q ? c : Pe, Ie = se((y) => {
    q || Ce(y), u == null || u(y);
  }, [q, u]), Te = le !== void 0, [Oe, P] = re(!1), k = Te ? le : Oe, ge = se((y) => {
    Te || P(y), xe == null || xe(y);
  }, [Te, xe]), [be, De] = re(t === "inline"), ct = st(() => e.map((y) => y.key).join("\0"), [e]), we = st(() => new Set(ct ? ct.split("\0") : []), [ct]), [je, Ge] = re(() => b ? we : /* @__PURE__ */ new Set()), [Me, Zt] = re(0), Kt = v(!1), Bt = v(null), Et = v(null), $e = se((y, z = "keyboard") => {
    Kt.current = z === "pointer", Zt(y);
  }, []), Ve = v(null), gt = v(null), It = v(null), nt = v(null), Dt = v(null), qe = v(0), rt = Ai(), $t = Yn(), yt = Xr(), Mt = Bi(), Ht = ks(), Ke = Qo(), U = 8 + (((ce == null ? void 0 : ce.length) || 0) + (pe ? 1 : 0)) * (Ke.box + 2), [me, Qe] = re({ top: 0, left: 0, maxH: 288, ready: !1 }), [it, St] = re(0);
  cs({
    anchorRef: ve ?? Ve,
    panelRef: nt,
    open: k,
    maxHeight: V,
    anchorRectRef: Dt,
    onPosition: (y) => Qe({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), ae(() => {
    const y = (ve == null ? void 0 : ve.current) ?? Ve.current;
    !k || !y || St(y.getBoundingClientRect().width);
  }, [k, be, ve]);
  const [Rt, T] = re(!1);
  ae(() => {
    k && T(!0);
  }, [k]);
  const Z = Ur({
    visible: k,
    morph: O,
    anchor: () => {
      var y;
      return ((y = (ve == null ? void 0 : ve.current) ?? Ve.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: nt,
    cloneOnUnmount: !0,
    onClosed: () => T(!1)
  }), ue = (I || []).map(
    (y) => typeof y.label == "function" ? y.label(pe) : y.label
  ), oe = st(
    () => th({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: R ? "" : pe,
      browseGroups: m || b || g,
      browseAll: L,
      expandedGroups: je,
      emptyActionLabels: ue
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, pe, R, m, b, g, L, je, ue.join("\0")]
  ), Se = st(
    () => (X || []).map((y, z) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(pe) : y.label,
      actionIndex: z,
      source: "leading"
    })),
    [X, pe]
  ), ze = st(
    () => (te || []).map((y, z) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(pe) : y.label,
      actionIndex: z,
      source: "footer"
    })),
    [te, pe]
  ), Je = oe.some((y) => y.kind === "empty"), Le = Se.length > 0 && !(Q && Je), Ae = Le ? Se.length : 0, ht = st(
    () => [...Le ? Se : [], ...oe, ...ze],
    [Le, Se, oe, ze]
  ), ot = !!d || g && !pe.trim(), At = st(
    () => ht.map((y, z) => ({ row: y, index: z })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !ot)),
    [ht, ot]
  ), xt = (g || b) && !pe.trim(), Fe = !!M, Ut = st(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), en = st(() => pe.trim() ? jl(n, e, pe).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : Ut, [n, e, pe, Ut]), vn = st(() => new Set(en), [en]), Re = gs({
    mode: (M == null ? void 0 : M.mode) ?? "draft",
    selectedIds: (M == null ? void 0 : M.selectedIds) ?? xs,
    itemIds: Ut,
    visibleIds: en,
    max: M == null ? void 0 : M.max,
    disabledIds: M == null ? void 0 : M.disabledIds,
    indicator: M == null ? void 0 : M.indicator,
    onCommit: M == null ? void 0 : M.onCommit,
    onDraftChange: M == null ? void 0 : M.onDraftChange,
    onToggle: M == null ? void 0 : M.onToggle
  }), cn = v(Re.reset);
  cn.current = Re.reset;
  const Rn = typeof (M == null ? void 0 : M.commitLabel) == "function" ? M.commitLabel(Re.count) : (M == null ? void 0 : M.commitLabel) ?? `Select ${Re.count}`, Nt = se(() => {
    var y;
    ge(!1), t === "expandable" && ((y = gt.current) == null || y.blur(), De(!1), requestAnimationFrame(() => {
      var z;
      return (z = It.current) == null ? void 0 : z.focus();
    })), Te || Ie(""), $e(0), Ge(b ? we : /* @__PURE__ */ new Set()), h == null || h();
  }, [t, h, Ie, b, we, Te, ge]);
  ae(() => {
    if (pe.trim() || !b) {
      Ge((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    Ge((y) => y.size === we.size && [...we].every((z) => y.has(z)) ? y : we);
  }, [pe, b, we]);
  const an = v(!1), pt = v(!1);
  ae(() => {
    if (!k) {
      an.current = !1;
      return;
    }
    if (an.current || !g || pe.trim()) return;
    const y = E ? [E] : [...(M == null ? void 0 : M.selectedIds) ?? []], z = new Set(y), G = z.size ? e.filter((he) => n.some((Ee) => Ee.group === he.key && z.has(Ee.id))).map((he) => he.key) : [];
    if (G.length === 0) {
      an.current = !0;
      return;
    }
    const ee = x === "single" ? G.slice(0, 1) : G;
    if (!ee.every((he) => je.has(he))) {
      pt.current = !0, Ge(new Set(ee));
      return;
    }
    if (_ && E) {
      const he = ht.findIndex((Ee) => Ee.kind === "item" && Ee.hit.item.id === E);
      he >= 0 && $e(he);
    }
    an.current = !0;
  }, [k, g, pe, e, n, E, M == null ? void 0 : M.selectedIds, x, je, ht, _, $e]);
  const Pt = se((y) => {
    Ge((z) => {
      const G = new Set(z);
      return G.has(y) ? G.delete(y) : (x === "single" && G.clear(), G.add(y)), G;
    });
  }, [x]), Ot = se(() => {
    var z;
    if (k) {
      (z = gt.current) == null || z.focus();
      return;
    }
    if (cn.current(), t === "expandable" && !be) {
      const G = Ve.current;
      if (G) {
        const ee = G.style.transition, he = G.style.width;
        G.style.transition = "none", G.style.width = `${C}px`;
        const Ee = G.getBoundingClientRect();
        Dt.current = { left: Ee.left, top: Ee.top, width: Ee.width, height: Ee.height }, G.style.width = he, G.offsetWidth, G.style.transition = ee, window.clearTimeout(qe.current), qe.current = window.setTimeout(() => {
          Dt.current = null;
        }, kt + 80);
      }
    }
    De(!0), ge(!0);
    const y = E ? oe.findIndex((G) => G.kind === "item" && G.hit.item.id === E) : -1;
    $e(y >= 0 ? Ae + y : _ ? Ae : -1);
  }, [k, t, be, C, Ae, oe, E, _]);
  ae(() => () => {
    window.clearTimeout(qe.current), Dt.current = null;
  }, []), ae(() => {
    k || (Bt.current = null), Et.current = null;
  }, [k, pe]), tt(() => {
    var y;
    t !== "expandable" || !be || !k || !w || (y = gt.current) == null || y.focus({ preventScroll: !0 });
  }, [t, be, k, w]), ae(() => {
    var G;
    if (!k) return;
    const y = ((G = Ve.current) == null ? void 0 : G.ownerDocument) ?? rt;
    if (!y) return;
    const z = (ee) => {
      var Ee, bt, vt, rn;
      const he = ((Ee = ee.composedPath) == null ? void 0 : Ee.call(ee)[0]) ?? ee.target;
      !he || typeof he.nodeType != "number" || (bt = Ve.current) != null && bt.contains(he) || (vt = nt.current) != null && vt.contains(he) || (rn = ve == null ? void 0 : ve.current) != null && rn.contains(he) || Nt();
    };
    return y.addEventListener("pointerdown", z, !0), () => y.removeEventListener("pointerdown", z, !0);
  }, [k, Nt, rt, ve]);
  const tn = se((y) => {
    var z;
    if (y.kind === "item" ? Bt.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (Bt.current = null), y.kind === "group") {
      if (Fe) {
        const G = (z = M == null ? void 0 : M.groupToken) == null ? void 0 : z.call(M, y.group.key);
        if (G) {
          Re.canToggle(G) && Re.toggle(G);
          return;
        }
        const ee = n.filter((he) => he.group === y.group.key && he.checkable !== !1 && vn.has(he.id) && !Re.isDisabled(he.id)).map((he) => he.id);
        ee.length && Re.toggleGroup(ee);
        return;
      }
      d ? (d(y.group), f && Nt()) : ot && Pt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Fe) {
        if (Re.canToggle(y.hit.item.id)) {
          const G = At.findIndex((he) => he.row === y), ee = (he) => {
            const Ee = At[he];
            return (Ee == null ? void 0 : Ee.row.kind) === "item" ? Ee.row.hit.item.id : null;
          };
          Et.current = G < 0 ? null : { up: ee(G - 1), down: ee(G + 1) }, Re.toggle(y.hit.item.id), $e(-1, "keyboard");
        }
        return;
      }
      a(y.hit.item), f && Nt();
      return;
    }
    if (y.kind === "action") {
      const G = y.source === "leading" ? X : y.source === "footer" ? te : I, ee = G == null ? void 0 : G[y.actionIndex];
      ee && ee.onClick(pe), f && Nt();
    }
  }, [Nt, f, I, te, ot, n, X, M, Fe, At, a, d, pe, Re, $e, Pt, vn]), Gn = (y) => {
    if (At.length === 0) return;
    const z = Et.current, G = y === 1 ? z == null ? void 0 : z.down : z == null ? void 0 : z.up;
    if (G != null) {
      const bt = At.find(
        (vt) => vt.row.kind === "item" && vt.row.hit.item.id === G
      );
      if (bt) {
        Et.current = null, $e(bt.index);
        return;
      }
    }
    let ee = Me;
    if (ee < 0 && Bt.current) {
      const bt = At.find(
        (vt) => vt.row.kind === "item" && vt.row.hit.item.id === Bt.current
      );
      bt && (ee = bt.index);
    }
    const he = At.findIndex((bt) => bt.index === ee), Ee = he < 0 ? 0 : (he + y + At.length) % At.length;
    $e(At[Ee].index);
  };
  qo(D, () => ({
    moveHighlight: Gn,
    activateHighlighted: () => {
      if (Kt.current) return !1;
      const y = Me >= 0 ? ht[Me] : void 0;
      return y ? (tn(y), $e(-1, "keyboard"), !0) : !1;
    },
    close: Nt,
    selectAll: () => {
      Fe && Re.setAll(!0);
    },
    setSelection: (y) => {
      Re.reset(y);
    }
  }), [ht, Me, tn, Nt, Fe, Re]);
  const An = (y) => {
    if (Fe && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), Re.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), k ? Gn(1) : Ot();
    else if (y.key === "ArrowUp")
      y.preventDefault(), Gn(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && g && k && !pe.trim()) {
      const z = ht[Me];
      if ((z == null ? void 0 : z.kind) === "group") {
        const G = je.has(z.group.key);
        (y.key === "ArrowRight" || G) && (y.preventDefault(), Pt(z.group.key));
      } else if ((z == null ? void 0 : z.kind) === "item" && y.key === "ArrowLeft" && z.hit.item.group) {
        y.preventDefault();
        const G = z.hit.item.group;
        je.has(G) && Pt(G);
        const ee = ht.findIndex((he) => he.kind === "group" && he.group.key === G);
        ee >= 0 && $e(ee);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const z = ht[Me] ?? ht[0];
      z && tn(z);
    } else y.key === "Escape" && (y.preventDefault(), Nt());
  }, dr = (y) => {
    t === "expandable" && !be || (Ie(y), k || ge(!0));
  };
  ae(() => {
    if (R) {
      const z = pe.trim().toLowerCase();
      if (!z) {
        const ee = E ? oe.findIndex((he) => he.kind === "item" && he.hit.item.id === E) : -1;
        $e(ee >= 0 ? Ae + ee : -1);
        return;
      }
      const G = oe.findIndex((ee) => ee.kind === "item" && ee.hit.item.label.toLowerCase().includes(z));
      $e(G >= 0 ? Ae + G : -1);
      return;
    }
    if (Te) {
      const z = pe.trim().toLowerCase();
      if (!!z && n.some((ee) => ee.id.toLowerCase() === z || ee.label.toLowerCase() === z)) {
        $e(-1);
        return;
      }
      if (!Fe) {
        const ee = oe.findIndex((he) => he.kind === "item" && he.hit.item.tone !== "create");
        if (ee >= 0) {
          $e(Ae + ee);
          return;
        }
      }
    }
    const y = oe.findIndex((z) => z.kind === "item");
    $e(y >= 0 ? Ae + y : Ae);
  }, [pe]), ae(() => {
    if (!k || pe.trim()) return;
    const y = E ? oe.findIndex((z) => z.kind === "item" && z.hit.item.id === E) : -1;
    $e(y >= 0 ? Ae + y : _ ? Ae : -1);
  }, [k]), tt(() => {
    k && cn.current();
  }, [k]);
  const fr = (y) => /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    ce == null ? void 0 : ce.map((z) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": z.label,
        title: z.label,
        tabIndex: be ? 0 : -1,
        onMouseDown: (G) => G.preventDefault(),
        onClick: () => {
          z.onClick(pe, { close: Nt }), z.keepOpen || Nt();
        },
        style: { width: Ke.box, height: Ke.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": z.key,
        children: /* @__PURE__ */ p(
          "span",
          {
            style: { width: Ke.icon, height: Ke.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: z.icon
          }
        )
      },
      z.key
    )),
    pe && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: be ? 0 : -1,
        onMouseDown: (z) => z.preventDefault(),
        onClick: y,
        style: { width: Ke.box, height: Ke.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(Tn, { size: Ke.icon })
      }
    )
  ] }), hr = /* @__PURE__ */ A("div", { className: "relative w-full", children: [
    /* @__PURE__ */ p(On, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: gt,
        value: pe,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": k,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => dr(y.target.value),
        onFocus: () => {
          m && Ot();
        },
        onClick: () => {
          m && Ot();
        },
        onKeyDown: An,
        placeholder: l,
        style: { paddingRight: U },
        className: `${Pr("sm")} w-full pl-8`
      }
    ),
    fr(() => {
      Ie(""), k || Ot();
    })
  ] }), pr = /* @__PURE__ */ A("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ p(On, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: gt,
        value: pe,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": k,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => dr(y.target.value),
        onFocus: () => {
          m && be && Ot();
        },
        onClick: () => {
          m && be && Ot();
        },
        onKeyDown: An,
        placeholder: l,
        tabIndex: be ? 0 : -1,
        style: { paddingRight: U },
        className: `${Pr("sm")} h-full w-full pl-8`
      }
    ),
    fr(() => {
      Ie(""), !k && be && Ot();
    })
  ] });
  ae(() => {
    if (!k || Kt.current) return;
    const y = nt.current;
    sn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${Me}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [k, Me]);
  const un = v(oe);
  un.current = oe;
  const H = v(E);
  H.current = E;
  const fe = v(M == null ? void 0 : M.selectedIds);
  fe.current = M == null ? void 0 : M.selectedIds, tt(() => {
    if (!k || !pt.current) return;
    const y = nt.current;
    if (!y) return;
    const z = E;
    if (!z) {
      pt.current = !1;
      return;
    }
    const G = oe.findIndex((he) => he.kind === "item" && he.hit.item.id === z);
    if (G < 0) {
      pt.current = !1;
      return;
    }
    const ee = y.querySelector(`[data-search-row="${G}"]`);
    ee && (sn(ee, "center", y.querySelector("[data-search-scroller]") ?? null), pt.current = !1);
  }, [k, je, oe, E]);
  const ke = ms({
    open: k,
    block: "center",
    ready: me.ready,
    scroller: () => {
      var y;
      return ((y = nt.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var G;
      let y = -1;
      const z = H.current;
      if (z)
        y = un.current.findIndex((ee) => ee.kind === "item" && ee.hit.item.id === z);
      else {
        const ee = fe.current;
        if (ee && ee.length) {
          const he = new Set(ee);
          y = un.current.findIndex((Ee) => Ee.kind === "item" && he.has(Ee.hit.item.id));
        }
      }
      return y < 0 ? null : ((G = nt.current) == null ? void 0 : G.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), Ze = (y, z) => {
    const G = Me === z, ee = !Fe && E !== void 0 && y.hit.item.id === E, he = Fe ? Re.isSelected(y.hit.item.id) : ee, Ee = !!y.hit.item.disabled || Fe && !Re.canToggle(y.hit.item.id), bt = y.hit.item.tone === "create" ? N === "light" ? { background: G ? "#d1fae5" : "#ecfdf5", color: G ? "#065f46" : "#047857" } : { background: G ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: G ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": he,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": z,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (vt) => vt.preventDefault(),
        onMouseEnter: () => $e(z, "pointer"),
        onClick: () => tn(y),
        style: { ...Mt, ...y.hit.item.rowStyle, ...bt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${y.hit.item.rowClassName ?? ""} ${ee ? "ui-item-selected" : ""} ${G ? "ui-item-highlighted" : ""} ${Ee ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Fe && y.hit.item.checkable !== !1 && /* @__PURE__ */ p(Lr, { checked: he, disabled: Ee, indicator: M == null ? void 0 : M.indicator }),
          ie ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: ie(y.hit.item, { checked: he, disabled: Ee }) }) : /* @__PURE__ */ A(ut, { children: [
            y.hit.item.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ p("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            ee && /* @__PURE__ */ p(cr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, Ye = (y, z) => {
    var so;
    const G = je.has(y.group.key), ee = g && !pe.trim(), he = ot, Ee = he && Me === z, bt = Fe ? n.filter((et) => et.group === y.group.key && vn.has(et.id) && et.checkable !== !1) : [], vt = bt.filter((et) => !Re.isDisabled(et.id)).map((et) => et.id), rn = Fe ? (so = M == null ? void 0 : M.groupToken) == null ? void 0 : so.call(M, y.group.key) : void 0, no = !!rn && Re.isSelected(rn), ro = no ? "all" : vt.length > 0 ? Re.groupState(vt) : "none", ql = no ? bt.length : bt.reduce((et, Kl) => et + (Re.isSelected(Kl.id) ? 1 : 0), 0), io = Fe && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (et) => et.preventDefault(),
        onClick: (et) => {
          et.stopPropagation(), rn ? Re.toggle(rn) : vt.length && Re.toggleGroup(vt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${rn || vt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ p(
          Lr,
          {
            checked: ro === "all",
            indeterminate: ro === "some",
            disabled: !rn && vt.length === 0,
            indicator: M == null ? void 0 : M.indicator
          }
        )
      }
    ), oo = Fe ? /* @__PURE__ */ A("span", { className: `shrink-0 tabular-nums text-[10px] ${he ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      ql,
      "/",
      bt.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ p("span", { className: `shrink-0 tabular-nums ${he ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return he ? /* @__PURE__ */ A(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": ee ? G : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (et) => et.preventDefault(),
        onMouseEnter: () => $e(z, "pointer"),
        onClick: () => {
          ee && Pt(y.group.key);
        },
        style: Mt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${yt.itemDefault} ${Ee ? "ui-item-highlighted" : ""}`,
        children: [
          io,
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (et) => et.preventDefault(),
              onClick: (et) => {
                et.stopPropagation(), tn(y);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                y.group.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ p("span", { className: "truncate", children: y.group.label })
              ]
            }
          ),
          /* @__PURE__ */ p("span", { className: "min-w-0 flex-1" }),
          oo,
          ee && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${G ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": G,
              onMouseDown: (et) => et.preventDefault(),
              onClick: (et) => {
                et.stopPropagation(), Pt(y.group.key);
              },
              style: { width: Ke.box, height: Ke.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ p(
                mn,
                {
                  size: Ke.icon,
                  className: `transition-transform duration-200 ${G ? "rotate-180" : ""}`
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
        "data-search-row": z,
        style: Ht,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          io,
          y.group.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.group.label }),
          oo
        ]
      },
      `group:${y.group.key}`
    );
  }, nn = (y, z) => {
    var he;
    const G = Me === z, ee = y.source === "leading" ? X : y.source === "footer" ? te : I;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": z,
        onMouseDown: (Ee) => Ee.preventDefault(),
        onMouseEnter: () => $e(z, "pointer"),
        onClick: () => tn(y),
        style: Mt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${G ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: ((he = ee == null ? void 0 : ee[y.actionIndex]) == null ? void 0 : he.icon) || /* @__PURE__ */ p(Jr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, ii = () => /* @__PURE__ */ p("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: Y ? Y({ query: pe, close: Nt }) : /* @__PURE__ */ A(ut, { children: [
    /* @__PURE__ */ p("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ p("div", { className: "text-xs font-medium text-zinc-500", children: B || `No matches for “${pe.trim()}”` }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: W || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), mr = [];
  for (let y = 0; y < oe.length; y++) {
    const z = oe[y];
    if (z.kind === "group") {
      const G = [];
      let ee = y + 1;
      for (; ee < oe.length && oe[ee].kind === "item" && oe[ee].hit.item.group === z.group.key; )
        G.push({ row: oe[ee], index: ee }), ee++;
      mr.push({ group: z, index: y, items: G }), y = ee - 1;
    } else z.kind === "item" ? mr.push({ row: z, index: y }) : mr.push({ row: z, index: y });
  }
  const oi = k || Rt ? Vr(
    /* @__PURE__ */ A(
      "div",
      {
        ref: Z,
        id: "search-menu-panel",
        "data-theme": N,
        role: "listbox",
        "aria-label": l,
        "aria-multiselectable": Fe ? !0 : void 0,
        onPointerEnter: ke.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), ke.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          Kt.current && $e(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: me.left,
          top: me.top,
          width: j ?? (t === "expandable" ? C : it || void 0),
          minWidth: J,
          maxHeight: me.maxH,
          visibility: me.ready ? "visible" : "hidden"
        },
        children: [
          Le && /* @__PURE__ */ A("div", { className: "shrink-0 pb-1", children: [
            Se.map((y, z) => nn(y, z)),
            oe.length > 0 && /* @__PURE__ */ p("div", { className: yt.separator })
          ] }),
          /* @__PURE__ */ A("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            oe.length === 0 && /* @__PURE__ */ p("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: Y ? Y({ query: pe, close: Nt }) : /* @__PURE__ */ p(ut, { children: "Type to search…" }) }),
            mr.map((y) => {
              if (y.group) {
                const ee = je.has(y.group.group.key), he = y.items || [];
                return /* @__PURE__ */ A(at.Fragment, { children: [
                  Ye(y.group, Ae + y.index),
                  xt && /* @__PURE__ */ p(
                    "div",
                    {
                      "data-search-group-items": y.group.group.key,
                      "aria-hidden": !ee,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: ee ? "1fr" : "0fr",
                        opacity: ee ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ p("div", { className: "overflow-hidden flex flex-col", children: he.map((Ee) => Ze(Ee.row, Ae + Ee.index)) })
                    }
                  ),
                  !xt && he.map((Ee) => Ze(Ee.row, Ae + Ee.index))
                ] }, `group:${y.group.group.key}`);
              }
              const z = y.row, G = Ae + y.index;
              return z.kind === "empty" ? ii() : z.kind === "action" ? nn(z, G) : z.kind === "item" ? Ze(z, G) : null;
            })
          ] }),
          ze.length > 0 && /* @__PURE__ */ A("div", { className: "shrink-0", children: [
            /* @__PURE__ */ p("div", { className: yt.separator }),
            ze.map((y, z) => nn(y, Ae + oe.length + z))
          ] }),
          Fe && (M == null ? void 0 : M.footer) !== !1 && /* @__PURE__ */ p(
            vs,
            {
              count: Re.count,
              max: M == null ? void 0 : M.max,
              hiddenCount: (M == null ? void 0 : M.hiddenNote) === !1 ? 0 : Re.hiddenCount,
              clear: (M == null ? void 0 : M.clear) !== !1,
              theme: N,
              onClear: Re.clear,
              hero: (M == null ? void 0 : M.mode) === "live" ? void 0 : {
                label: Rn,
                onClick: () => {
                  Re.commit(), Nt();
                },
                disabled: Re.count === 0
              }
            }
          )
        ]
      }
    ),
    ne ?? $t ?? (rt == null ? void 0 : rt.body) ?? document.body
  ) : null;
  return Ne ? /* @__PURE__ */ A(ut, { children: [
    /* @__PURE__ */ p("div", { ref: Ve, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    oi
  ] }) : t === "inline" ? /* @__PURE__ */ A("div", { ref: Ve, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    hr,
    oi
  ] }) : /* @__PURE__ */ p(
    to,
    {
      expanded: be,
      collapsedWidth: S,
      expandedWidth: C,
      rootRef: Ve,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ye ? ye({ open: k, expanded: be, toggle: Ot }) : /* @__PURE__ */ p(
        zt,
        {
          ref: It,
          type: "button",
          variant: o,
          size: "minimal",
          theme: N === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ p(On, { className: "w-3.5 h-3.5" }) : i,
          onClick: Ot,
          className: `w-full justify-start ${be ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: be ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ A(ut, { children: [
        pr,
        oi
      ] })
    }
  );
}
function yn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Wl(n, e, t = "id") {
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
  for (const o of rh(n)) {
    const s = Kr(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function oh(n, e, t, r, i) {
  if (i) return _o(n, e, t);
  const o = new Set(e.map((l) => yn(l, t))), s = _o(n, e, t).filter((l) => o.has(l));
  return s.length === 0 && n.trim() !== "" ? [...r] : s;
}
function sh(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = Kr(l, e, t);
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
function jo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Wl(o, e, t)).join(", ");
}
const ah = () => {
};
function mp({
  values: n,
  onChange: e,
  items: t,
  groups: r = [],
  resolveBy: i = "id",
  mode: o = "multiple",
  appearance: s = "inline",
  display: l = "names",
  formatDisplay: c,
  formatEditing: u,
  renderTrigger: a,
  renderItem: d,
  badge: h,
  trailing: f,
  anchoredKeys: m,
  anchoredLabel: g = "Element link anchor",
  placeholder: b = "Select…",
  readOnly: x = !1,
  inputReadOnly: L = !1,
  disabled: E = !1,
  autoFocus: w = !1,
  defaultOpen: S = !1,
  selectAllOnOpen: C = !0,
  uppercase: j = !1,
  allowFreeText: J = !0,
  theme: R,
  className: V = "",
  style: N,
  panelWidth: O,
  panelMinWidth: B,
  initialQuery: W,
  keepAllRows: Y = !1,
  maxMenuHeight: I,
  portalTarget: X,
  autoGrow: Q = !1,
  skipComma: te = !1,
  collapsedWidth: ce = 140,
  expandedWidth: M = 280,
  createLabel: le,
  onCreateItem: xe,
  onExit: Ne,
  onEscape: ve,
  onTabExit: ne,
  loadItems: ye,
  emptyTitle: ie,
  emptyHint: _,
  sortItems: D,
  max: q,
  disabledIds: Pe,
  indicator: Ce,
  browse: pe,
  groupToken: Ie
}) {
  const Te = Qt(), Oe = R ?? (Te == null ? void 0 : Te.mode) ?? "light", P = We(), k = se((H) => yn(H, i), [i]), ge = st(() => t.map(k), [t, k]), be = st(() => new Map(t.map((H) => [k(H), H])), [t, k]), De = se((H) => Wl(H, t, i), [t, i]), ct = st(() => new Set([...m ?? []].map((H) => H.toLowerCase())), [m]), [we, je] = re(!1), [Ge, Me] = re(""), [Zt, Kt] = re(() => {
    const H = W ?? "";
    return j ? H.toUpperCase() : H;
  }), [Bt, Et] = re(Zt), [$e, Ve] = re(() => [...n]), [gt, It] = re(null), [nt, Dt] = re(!1), qe = v(null), rt = v(null), $t = v(null), yt = v(null), Mt = v(null), Ht = v(n.join("\0")), Ke = v(!1), $ = v(/* @__PURE__ */ new Set()), U = v(!1), me = v(!1), Qe = v(!1), it = v(0), St = v(""), Rt = v([...n]), T = n.join("\0"), Z = st(
    () => jo(n, t, i, l, c),
    [n, t, i, l, c]
  ), ue = se((H) => {
    if (u) return u([...H], t);
    if (o === "single") return H[0] ? De(H[0]) : "";
    const fe = H.map(De).join(", ");
    return te ? fe : H.length ? `${fe}, ` : "";
  }, [u, t, o, De, te]);
  ae(() => {
    we || (Ve([...n]), Rt.current = [...n], Ht.current = T);
  }, [T, we]);
  const oe = se(() => {
    if (we || x || E) return;
    Ke.current = !1, U.current = !0;
    const H = ue(n);
    St.current = H, Rt.current = [...n], Ve([...n]), Me(H), Et(Zt), Kt(""), je(!0);
  }, [we, x, E, n, ue, Zt]);
  tt(() => {
    if (!we) return;
    const H = qe.current ?? rt.current;
    H && (H.focus(), (H instanceof HTMLInputElement || H instanceof HTMLTextAreaElement) && (o === "single" && C ? H.setSelectionRange(0, H.value.length) : H.setSelectionRange(H.value.length, H.value.length)));
  }, [we]), tt(() => {
    if (!Qe.current) return;
    Qe.current = !1;
    const H = qe.current;
    H && (H.focus(), H.setSelectionRange(H.value.length, H.value.length));
  }, [Ge]), ae(() => {
    (S || w) && oe();
  }, []);
  const Se = o === "single" ? Bt : ih(Ge), ze = ye ? gt ?? [] : t, Je = st(
    () => D ? D(ze, $e) : ze,
    [ze, D, $e]
  ), Le = Se.trim(), Ae = !!xe && J && !nt && !!Le && !lh(Le, ze, i);
  ae(() => {
    if (!ye || !we) return;
    const H = Se.trim();
    if (!H) {
      It(null), Dt(!1);
      return;
    }
    Dt(!0);
    const fe = ++it.current, ke = setTimeout(() => {
      ye(H).then((Ze) => {
        it.current === fe && (It(Ze), Dt(!1));
      }).catch(() => {
        it.current === fe && (It([]), Dt(!1));
      });
    }, 400);
    return () => clearTimeout(ke);
  }, [ye, we, Se]);
  const ht = st(() => {
    const H = Je.filter((fe) => !fe.hidden).map((fe) => ({
      id: k(fe),
      label: fe.label,
      group: fe.group,
      detail: fe.detail,
      icon: fe.icon,
      disabled: !!fe.disabled || !!(Pe != null && Pe.includes(k(fe))),
      fields: fe.fields,
      keywords: fe.keywords,
      rowClassName: fe.rowClassName,
      rowStyle: fe.rowStyle
    }));
    return Ae && H.unshift({
      id: Le,
      label: le ? le(Le) : `Add “${Le}”…`,
      keywords: Le,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), H;
  }, [Je, k, Pe, Ae, Le, le]), ot = se((H) => {
    const fe = H.join("\0");
    if (fe !== Ht.current) {
      if (wn(H, n)) {
        Ht.current = fe;
        return;
      }
      if (Ht.current = fe, e(H), xe)
        for (const ke of ch(H, t, i))
          $.current.has(ke) || ($.current.add(ke), xe(ke));
    }
  }, [n, e, xe, t, i]), At = se((H, fe) => {
    !fe || !xe || !J || t.some((ke) => k(ke) === H) || $.current.has(H) || ($.current.add(H), xe(H));
  }, [xe, J, t, k]), xt = se((H = !0) => {
    if (!U.current || (U.current = !1, x || E)) return;
    if (Ke.current) {
      Ke.current = !1;
      return;
    }
    const fe = St.current, ke = new Set(ge), Ze = o === "single" ? (() => {
      const Ye = fe.trim();
      if (!Ye) return J ? [] : n;
      const nn = Kr(Ye, t, i);
      return !J && !ke.has(nn) ? n : [nn];
    })() : jt(
      oh(fe, t, i, n, J),
      ge
    );
    Rt.current = Ze, Ve(Ze), Et(""), je(!1), ot(Ze), H && !me.current && (Ne == null || Ne());
  }, [x, E, o, t, i, ge, J, n, ot, Ne]), Fe = se((H) => {
    je(H), H || xt();
  }, [xt]), Ut = se(() => {
    Ke.current = !0, U.current = !1;
    const H = ue(n);
    St.current = H, Rt.current = [...n], Ve([...n]), Me(H), Et(""), je(!1), ve == null || ve();
  }, [n, ue, ve]);
  ae(() => {
    var Ze;
    if (!we) return;
    const fe = (((Ze = $t.current) == null ? void 0 : Ze.ownerDocument) ?? document).defaultView;
    if (!fe) return;
    const ke = (Ye) => {
      Ye.key === "Escape" && (Ye.preventDefault(), Ye.stopImmediatePropagation(), Ut());
    };
    return fe.addEventListener("keydown", ke, !0), () => fe.removeEventListener("keydown", ke, !0);
  }, [we, Ut]);
  const en = se((H) => {
    const fe = jt(H, ge), ke = ue(fe);
    Rt.current = fe, St.current = ke, Ve(fe), Qe.current = !0, Me(ke);
  }, [ge, ue]), vn = se((H) => {
    const fe = H.id;
    U.current = !1;
    const ke = De(fe);
    Rt.current = [fe], St.current = ke, Ve([fe]), Me(ke), Et(""), je(!1), ot([fe]), me.current || Ne == null || Ne();
  }, [De, ot, Ne]), Re = (H) => {
    var fe, ke, Ze, Ye, nn;
    if (H.key === "Escape") {
      H.preventDefault(), Ut();
      return;
    }
    if (H.key === "Tab") {
      if (H.preventDefault(), o === "single" && we) {
        me.current = !0;
        const ii = (fe = Mt.current) == null ? void 0 : fe.activateHighlighted();
        if (me.current = !1, ii) {
          (ke = ne ?? Ne) == null || ke(qe.current ?? void 0);
          return;
        }
      }
      we && xt(!1), (Ze = ne ?? Ne) == null || Ze(qe.current ?? void 0);
      return;
    }
    if (H.key === "ArrowDown" || H.key === "ArrowUp") {
      if (H.preventDefault(), !we) {
        oe();
        return;
      }
      (Ye = Mt.current) == null || Ye.moveHighlight(H.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (H.key === "Enter") {
      if (H.preventDefault(), H.stopPropagation(), we && ((nn = Mt.current) != null && nn.activateHighlighted())) return;
      xt();
      return;
    }
  }, cn = (H) => {
    var ke;
    const fe = j ? H.target.value.toUpperCase() : H.target.value;
    if (St.current = fe, Me(fe), o === "single" && Et(fe), we || (U.current = !0, Ke.current = !1, je(!0)), o === "multiple") {
      const Ze = jt(sh(fe, t, i), ge);
      Rt.current = Ze, Ve(Ze), (ke = Mt.current) == null || ke.setSelection(Ze);
    }
  }, Rn = () => {
    if (U.current) {
      if (Ke.current) {
        Ke.current = !1;
        return;
      }
      xt();
    }
  }, Nt = se((H, fe) => {
    const ke = be.get(H.id);
    if (!ke)
      return /* @__PURE__ */ A(ut, { children: [
        /* @__PURE__ */ p(Jr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: H.label })
      ] });
    const Ze = !!m && (i === "label" ? ct.has(ke.label.toLowerCase()) : m.has(k(ke))), Ye = (h == null ? void 0 : h(ke)) ?? ke.badge ?? null;
    return /* @__PURE__ */ A(ut, { children: [
      d ? d(ke, fe.checked) : /* @__PURE__ */ A(ut, { children: [
        ke.icon && /* @__PURE__ */ p("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: ke.icon }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: ke.label }),
        Ye && /* @__PURE__ */ p("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Ye }),
        f == null ? void 0 : f(ke)
      ] }),
      Ze && /* @__PURE__ */ p("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ p(nc, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [be, m, ct, i, k, h, d, f, g]), an = /* @__PURE__ */ p(
    nh,
    {
      ref: Mt,
      mode: "inline",
      hideTrigger: !0,
      open: we,
      onOpenChange: Fe,
      anchorRef: s === "morph" ? yt : $t,
      items: ht,
      groups: r,
      query: Se,
      onSelect: vn,
      closeOnSelect: o === "single",
      selectedId: o === "single" && $e[0] !== void 0 ? Kr($e[0], t, i) : void 0,
      multiple: o === "multiple" ? {
        selectedIds: $e,
        mode: "live",
        onDraftChange: en,
        onToggle: At,
        onCommit: ah,
        max: q,
        disabledIds: Pe,
        indicator: Ce,
        groupToken: Ie
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (pe ?? "open") === "open",
      expandableGroups: r.length > 0 && pe === "accordion",
      groupExpandMode: "single",
      renderItem: Nt,
      emptyTitle: nt ? "Searching…" : ie,
      emptyHint: nt ? "Fetching matching records." : _,
      theme: Oe,
      panelWidth: O,
      panelMinWidth: B,
      keepAllRows: Y,
      maxMenuHeight: I,
      portalTarget: X
    }
  ), pt = s === "chip", Pt = s === "wrap", Ot = !pt && !Pt && Q, tn = !we && !Z, Gn = we ? Ge : Z, An = {
    ref: qe,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: we ? Ge : pt ? n.join(", ") : Z,
    disabled: E,
    readOnly: L,
    placeholder: "",
    onFocus: oe,
    onClick: oe,
    onChange: cn,
    onBlur: Rn,
    onKeyDown: Re,
    autoComplete: "off",
    spellCheck: !1
  }, dr = F(5, 7, P), fr = F(9, 12, P), hr = F(12, 14, P);
  if (s === "button") {
    const H = (Ye) => Re(Ye), fe = we ? $e : n, ke = jo(fe, t, i, l, c), Ze = !ke;
    return /* @__PURE__ */ A(
      "div",
      {
        ref: $t,
        "data-picker-field": !0,
        className: `relative ${V}`,
        style: N,
        onMouseDown: (Ye) => Ye.stopPropagation(),
        onContextMenu: (Ye) => {
          Ye.preventDefault(), Ye.stopPropagation();
        },
        children: [
          a ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: a({ values: [...fe], items: t, display: ke, open: we, toggle: oe }) }) : /* @__PURE__ */ A(
            zt,
            {
              ref: rt,
              variant: "outline",
              theme: Oe === "dark" ? "dark" : "light",
              disabled: E,
              onClick: x ? void 0 : () => we ? xt() : oe(),
              onKeyDown: H,
              "data-state": we ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": we,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && fe.length > 0 ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: fe.map((Ye) => /* @__PURE__ */ p(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: De(Ye)
                  },
                  Ye
                )) }) : /* @__PURE__ */ p("span", { className: `min-w-0 flex-1 truncate text-left ${Ze ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: ke || b }),
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
      to,
      {
        expanded: we,
        collapsedWidth: ce,
        expandedWidth: M,
        rootRef: $t,
        "data-picker-field": !0,
        className: V,
        style: N,
        trigger: a ? a({ values: [...n], items: t, display: Z, open: we, toggle: oe }) : (
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
                /* @__PURE__ */ p("span", { className: `min-w-0 flex-1 truncate ${tn ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: Z || b }),
                /* @__PURE__ */ p(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ A("div", { ref: yt, className: "relative h-full", children: [
          /* @__PURE__ */ p(
            "input",
            {
              ...An,
              className: `${Pr("sm")} h-full w-full`
            }
          ),
          an
        ] })
      }
    );
  const pr = pt ? F(5, 7, P) : 0, un = pt ? F(9, 12, P) : 0;
  return x ? /* @__PURE__ */ p(
    "div",
    {
      ref: $t,
      "data-picker-field": !0,
      className: `relative ${pt ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Pt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${V}`,
      style: pt ? { padding: `${pr}px ${un}px`, fontSize: F(12, 14, P), ...N } : N,
      children: /* @__PURE__ */ p(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: Z,
          className: pt ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ A(
    "div",
    {
      ref: $t,
      "data-picker-field": !0,
      className: `relative ${pt ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Pt ? "min-h-[1lh] w-full pb-[1lh]" : Ot ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${V}`,
      style: pt ? { padding: `${pr}px ${un}px`, fontSize: hr, ...N } : N,
      onMouseDown: (H) => H.stopPropagation(),
      onContextMenu: (H) => {
        H.preventDefault(), H.stopPropagation();
      },
      onAuxClick: oe,
      children: [
        pt && a ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: a({ values: [...n], items: t, display: Z, open: we, toggle: oe }) }) : l === "chips" && !we ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((H) => /* @__PURE__ */ p(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: De(H)
            },
            H
          )),
          n.length === 0 && /* @__PURE__ */ p("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ p(
          "span",
          {
            className: `pointer-events-none text-left ${pt ? "min-w-0 flex-1 truncate" : Pt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${tn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: Gn || b
          }
        ),
        Pt ? /* @__PURE__ */ p(
          "textarea",
          {
            ...An,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ p(
          "input",
          {
            ...An,
            className: Ot ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Ot ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : pt ? { caretColor: "#2563eb", color: "transparent", paddingLeft: un, paddingRight: un + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        pt && /* @__PURE__ */ p(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        an
      ]
    }
  );
}
export {
  zt as Button,
  hp as CardSection,
  Pi as CheckMark,
  Wc as Checkbox,
  Uh as Checklist,
  sp as ChromeHeader,
  op as ContentRow,
  Oh as ContextMenu,
  Bh as ContextMenuDivider,
  Fh as ContextMenuItem,
  Hh as ContextMenuSub,
  ls as DROPDOWN_MAX_HEIGHT,
  Yh as DatePicker,
  Wh as DialogProvider,
  Es as DropdownItem,
  Qr as DropdownMenu,
  ia as DropdownSubmenu,
  Oi as DropdownThemeContext,
  qf as FONTS,
  Gh as FloatingChrome,
  Vh as FloatingToggle,
  Jf as FontMenu,
  dp as FormatToolbar,
  He as IS_COARSE,
  Cc as IS_TOUCH_CAPABLE,
  Ph as ItemManagerDropdown,
  Kh as LongPressMenuProvider,
  xn as MORPH_EASE,
  kt as MORPH_MS,
  Ii as MORPH_OPACITY_MS,
  ur as MenuHighlightContext,
  Ns as MenuSearchContext,
  sa as Modal,
  _h as ModalFooter,
  br as ModalFooterButton,
  pp as MorphActionField,
  Qf as MorphSearchField,
  xs as NO_SELECTION_IDS,
  fp as NumberInput,
  mp as PickerField,
  Tc as PopoutWindowContext,
  up as RICH_TEXT_STATE_IDLE,
  Xh as RadioList,
  Wf as RichTextEditor,
  Uf as SCRUB_PX_PER_STEP,
  nh as SearchMenu,
  ip as SectionHeader,
  rp as Seg,
  Lr as SelectionCheck,
  ys as SelectionContext,
  vs as SelectionFooter,
  lp as StructureControls,
  Hi as SubmenuContext,
  Lh as TAB_PILL,
  Ca as TB_BTN,
  vr as TB_BTN_ICON,
  Ea as TB_DANGER,
  Is as TB_DIVIDER,
  Ma as TB_INPUT,
  np as TB_NUM,
  Aa as TB_PICKER,
  Qh as TB_ROW_LABEL,
  Ra as TB_SEG,
  Zh as TB_TOGGLE,
  tp as TB_TOGGLE_OFF,
  ep as TB_TOGGLE_ON,
  bs as TabFace,
  $h as ThemeProvider,
  zh as ThemeScope,
  Lf as Token,
  zf as TokenChipView,
  wr as ToolButton,
  Ln as Tooltip,
  Di as ZOOM_FROM,
  th as buildSearchMenuRows,
  Oc as buttonCloudOf,
  eo as clampNumber,
  Ac as cloneOverlayClose,
  F as coarsePx,
  _c as countHidden,
  ap as escapeHtml,
  jo as formatPickerValues,
  Go as getCoarseScale,
  Xr as getDropdownClasses,
  Ih as getHardwareKeyboard,
  Ah as getLastPointerType,
  ao as groupSelectionState,
  lh as hasPickerMatch,
  Pr as inputCls,
  ma as isInteractiveElement,
  Eh as isPhoneViewport,
  xi as isTouchLike,
  ih as lastPickerSegment,
  eh as matchSearchItem,
  ps as menuAttributesOf,
  Lc as menuThemeOf,
  ns as nearestOverlayOrigin,
  Hl as normalizeSpaces,
  jt as orderByCatalogue,
  Hn as overlayMorphEnabled,
  Zf as parseSearchTags,
  sh as pickerCommittedKeys,
  yn as pickerItemKey,
  Wl as pickerItemLabel,
  rh as pickerSegments,
  Rc as playOverlayClose,
  Mc as playOverlayOpen,
  Fo as preprocessTokenHtml,
  Kr as resolvePickerSegment,
  _o as resolvePickerText,
  sn as revealRowInScroller,
  ss as safeAreaInsets,
  wn as sameSelection,
  If as sanitizeRichText,
  Xf as scrubbedValue,
  jl as searchMenuContent,
  Pc as segModeOf,
  Mh as setCoarseScale,
  co as setSelected,
  Yf as steppedValue,
  cp as stripRichText,
  Df as stripTokenWrappers,
  Hc as toggleSelected,
  ch as unknownPickerValues,
  Rh as useCoarse,
  $i as useCoarseItemTap,
  We as useCoarseScale,
  gn as useCoarseSize,
  Ai as useCurrentDocument,
  ar as useCurrentWindow,
  jh as useDialog,
  cs as useDropdownPosition,
  ws as useDropdownTheme,
  Dh as useHardwareKeyboard,
  Rs as useInputSize,
  Bi as useItemSize,
  Qt as useKitTheme,
  Ec as useLastPointerType,
  qh as useLongPressOptOut,
  _i as useMenuHighlight,
  ea as useMenuSearch,
  Ur as useOverlayMorph,
  Ri as usePopoutWindow,
  Yn as usePortalTarget,
  ms as useRevealRowOnOpen,
  gs as useSelection,
  jc as useSelectionContext,
  Ta as useSlidingPill,
  Jh as useTouchMode,
  is as visualViewportBox
};
