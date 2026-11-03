"use client";
import { jsx as h, jsxs as A, Fragment as at } from "react/jsx-runtime";
import ct, { createContext as Xt, useContext as Gt, useState as re, useEffect as ae, useRef as v, useCallback as se, useLayoutEffect as et, useMemo as ot, useId as Wl, useImperativeHandle as Wo } from "react";
import * as He from "@radix-ui/react-dropdown-menu";
import { Minus as ql, Check as lr, Search as Ln, X as Tn, Pencil as Kl, CopyPlus as qo, Trash2 as gi, RotateCcw as Ko, Plus as Kr, ChevronRight as Ar, ChevronLeft as Jo, ArrowUp as Jl, ArrowDown as Vl, ChevronDown as mn, Underline as Yl, Strikethrough as Ul, RemoveFormatting as Xl, Link as Gl, ChevronUp as Ql, Anchor as Zl } from "lucide-react";
import { computePosition as ec, offset as Vo, flip as Yo, shift as Uo, size as tc, useFloating as nc, autoUpdate as rc } from "@floating-ui/react-dom";
import * as dn from "@radix-ui/react-dialog";
import { createPortal as Jr } from "react-dom";
import { mergeAttributes as ic, ReactNodeViewRenderer as oc, NodeViewWrapper as sc, useEditor as lc, EditorContent as cc } from "@tiptap/react";
import { PluginKey as Yt, Plugin as ln, Selection as Fn, TextSelection as Wt, NodeSelection as Wn, AllSelection as ac } from "@tiptap/pm/state";
import { DecorationSet as mr, Decoration as uc } from "@tiptap/pm/view";
import dc from "@tiptap/starter-kit";
import fc from "@tiptap/extension-placeholder";
import { TextStyle as hc, FontFamily as pc, FontSize as mc } from "@tiptap/extension-text-style";
import gc from "@tiptap/extension-color";
import yc from "@tiptap/extension-link";
import xc from "@tiptap/extension-underline";
import bc from "@tiptap/suggestion";
import { Mention as vc } from "@tiptap/extension-mention";
import { createRoot as wc } from "react-dom/client";
const kc = Xt(null);
function Mi() {
  return Gt(kc);
}
function Vn() {
  const n = Mi();
  return n ? n.document.body : null;
}
function Ri() {
  const n = Mi();
  return n ? n.document : typeof document < "u" ? document : null;
}
function cr() {
  return Mi() ?? (typeof window < "u" ? window : null);
}
const Yn = typeof window < "u", Be = Yn && window.matchMedia("(pointer: coarse)").matches, Sc = Yn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function wh() {
  return Yn && window.matchMedia("(max-width: 600px)").matches;
}
let Vr = 0.5;
const tr = /* @__PURE__ */ new Set();
function kh(n) {
  Vr = Math.max(0, Math.min(1, n)), tr.forEach((e) => e());
}
function Xo() {
  return Vr;
}
function Sh() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), Be && Vr > 0;
}
function je() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return tr.add(e), () => {
      tr.delete(e);
    };
  }, []), Vr;
}
function O(n, e, t) {
  return Be ? Math.round(n + (e - n) * t) : n;
}
function gn(n, e) {
  const t = je();
  return Be && t > 0 ? {
    padding: `${O(n.py, e.py, t)}px ${O(n.px, e.px, t)}px`,
    fontSize: `${O(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Go() {
  const n = je(), e = Be && n > 0;
  return {
    box: e ? O(28, 36, n) : 20,
    icon: e ? O(16, 20, n) : 14
  };
}
function yi(n) {
  return n === "touch" || n === "pen";
}
let On = null;
const xi = /* @__PURE__ */ new Set();
Yn && window.addEventListener("pointerdown", (n) => {
  On = n.pointerType, xi.forEach((e) => e());
}, !0);
function Nh() {
  return On;
}
function Nc() {
  const [, n] = re(0), e = v(On);
  return ae(() => {
    const t = () => {
      e.current !== On && (e.current = On, n((r) => r + 1));
    };
    return xi.add(t), () => {
      xi.delete(t);
    };
  }, []), On;
}
const Qo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Zo() {
  return Yn ? Qo.some((n) => window.matchMedia(n).matches) : !1;
}
let $r = Zo();
const bi = /* @__PURE__ */ new Set();
function oo(n) {
  $r !== n && ($r = n, bi.forEach((e) => e()));
}
var jo;
if (Yn) {
  const n = () => oo(Zo());
  for (const s of Qo) {
    const l = window.matchMedia(s);
    (jo = l.addEventListener) == null || jo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || oo(!0));
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
function Th() {
  return $r;
}
function Ch() {
  const [, n] = re(0);
  return ae(() => {
    const e = () => n((t) => t + 1);
    return bi.add(e), () => {
      bi.delete(e);
    };
  }, []), $r;
}
const kt = 220, xn = "cubic-bezier(0.32, 0.72, 0, 1)", Ii = 170, Ai = 0.94;
function es(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Bn(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Dr(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = es(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${kt}ms ${xn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r == null || r());
      }, kt + 80));
    });
  });
}
function ts(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function ns(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return ts({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Tc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.visibility = "", e.style.pointerEvents = "", e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Ai})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = ns(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${kt}ms ${xn}, opacity ${Ii}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, kt + 60);
    });
  });
}
function Cc(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = ns(e, t);
  e.style.transition = `transform ${kt}ms ${xn}, opacity ${Ii}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Ai})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, kt + 60);
}
function Ec(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? ts({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${kt}ms ${xn}, opacity ${Ii}ms ease`, r.style.transform = `scale(${Ai})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, kt + 60));
    });
  });
}
function Yr(n) {
  const e = v(null), [t, r] = re(!1), i = v(null), o = v(0), s = se((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Bn(f.current) && Ec(g, u.current, i.current));
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
  const f = v(n.morph !== !1);
  f.current = n.morph !== !1;
  const p = v(0);
  return et(() => {
    if (!t || !c.current || !Bn(f.current)) return;
    const m = e.current;
    m && Tc(p, m, u.current);
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
    var b;
    const m = a.current;
    if (a.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !Bn(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    Cc(p, g, u.current, () => {
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
function rs(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function gr(n, e) {
  const t = getComputedStyle(n.documentElement).getPropertyValue(e).trim(), r = Number.parseFloat(t);
  return Number.isFinite(r) ? r : 0;
}
function is(n) {
  return n ? {
    left: gr(n, "--ui-safe-area-left"),
    right: gr(n, "--ui-safe-area-right"),
    top: gr(n, "--ui-safe-area-top"),
    bottom: gr(n, "--ui-safe-area-bottom")
  } : { left: 0, right: 0, top: 0, bottom: 0 };
}
const ss = 384, Mc = rs;
function ls({
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
  const u = cr(), d = v(u);
  d.current = u;
  const f = v(a);
  f.current = a, et(() => {
    if (!t) return;
    let p = 0, m = !1;
    const g = () => {
      p || (p = requestAnimationFrame(b));
    }, b = () => {
      if (p = 0, m) return;
      const E = d.current, j = n.current, U = e.current;
      if (!E || !j || !U || !U.isConnected) return;
      const R = (r == null ? void 0 : r.current) ?? U, q = Mc(E), k = is(E.document), L = {
        x: q.x + k.left,
        y: q.y + k.top,
        width: Math.max(0, q.width - k.left - k.right),
        height: Math.max(0, q.height - k.top - k.bottom)
      }, H = l ?? ss, K = Math.min(c, H), J = Math.max(0, U.offsetHeight - R.offsetHeight), I = Math.max(K, Math.ceil(R.scrollHeight + J)), X = Math.min(I, H);
      U.style.maxHeight = `${X}px`;
      let Q = X;
      const Z = i == null ? void 0 : i.current;
      ec(Z ? {
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
          Vo(o),
          Yo({ boundary: L, padding: s, fallbackStrategy: "bestFit" }),
          Uo({ boundary: L, padding: s, mainAxis: !1 }),
          tc({
            boundary: L,
            padding: s,
            apply({ availableHeight: M }) {
              Q = Math.max(K, Math.floor(Math.min(H, M))), U.style.maxHeight = `${Q}px`;
            }
          })
        ]
      }).then(({ x: M, y: ce, placement: be }) => {
        m || !Number.isFinite(M) || !Number.isFinite(ce) || f.current({
          top: Math.round(ce),
          left: Math.round(M),
          maxH: Q,
          side: be.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, D = (x == null ? void 0 : x.document) ?? null, C = (x == null ? void 0 : x.visualViewport) ?? null, w = () => g();
    C == null || C.addEventListener("resize", w), C == null || C.addEventListener("scroll", w), x == null || x.addEventListener("resize", w), D == null || D.addEventListener("scroll", w, { capture: !0, passive: !0 });
    let N = null;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(w), e.current && N.observe(e.current), r != null && r.current && N.observe(r.current)), () => {
      m = !0, p && cancelAnimationFrame(p), C == null || C.removeEventListener("resize", w), C == null || C.removeEventListener("scroll", w), x == null || x.removeEventListener("resize", w), D == null || D.removeEventListener("scroll", w, { capture: !0 }), N == null || N.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, c]);
}
const Rc = 8, Ic = 900, Ac = 1e3;
function cs(n, e = !1) {
  const t = v(null), r = v(0);
  return { onPointerDown: (c) => {
    !Be || e || c.pointerType !== "touch" || (t.current = { x: c.clientX, y: c.clientY, t: Date.now(), doc: c.currentTarget.ownerDocument });
  }, onPointerUp: (c) => {
    if (!Be || e || c.pointerType !== "touch") return;
    const a = t.current;
    if (t.current = null, !a || Date.now() - a.t > Ic || Math.hypot(c.clientX - a.x, c.clientY - a.y) > Rc) return;
    r.current = Date.now();
    const u = c.currentTarget;
    n(), u.click();
    let d = 0;
    const f = () => {
      a.doc.removeEventListener("click", p, !0), a.doc.removeEventListener("pointerdown", m, !0), d && window.clearTimeout(d);
    }, p = (g) => {
      g.preventDefault(), g.stopImmediatePropagation(), f();
    }, m = () => f();
    a.doc.addEventListener("click", p, !0), a.doc.addEventListener("pointerdown", m, !0), d = window.setTimeout(f, 600);
  }, onPointerCancel: () => {
    t.current = null;
  }, suppressSelect: () => Date.now() - r.current < Ac };
}
let An = null;
function as(n) {
  return An == null || An(), An = n, () => {
    An === n && (An = null);
  };
}
const us = Xt(null);
function $i(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.identityAccent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", identityAccent: o, surface: r, context: i };
}
function Di({ theme: n, children: e }) {
  return /* @__PURE__ */ h(us.Provider, { value: n, children: e });
}
function Eh({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Qt();
  return /* @__PURE__ */ h(Di, { theme: $i({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Mh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Qt(), c = $i({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ h(Di, { theme: c, children: /* @__PURE__ */ h(
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
  return Gt(us);
}
function $c(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function ds(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = $c(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Dc(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function zc(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Pc(n) {
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
  const r = t ?? Pc(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, c = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + c > o.bottom && (r.scrollTop += i.bottom + c - o.bottom);
}
function fs({
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
    const { row: u, scroller: d, block: f } = c.current, p = u();
    p && (sn(p, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), ae(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = c.current;
      sn(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: a };
}
const Lc = [];
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
function Oc(n, e, t, r = {}) {
  var o;
  const i = jt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : jt([...i, e], t);
}
function so(n, e, t, r, i = {}) {
  const o = jt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), c = new Set(i.disabledIds ?? []), a = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), u = jt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !c.has(d)).slice(0, a);
  return u.length === 0 ? o : jt([...o, ...u], r);
}
function lo(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function Fc(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function hs(n) {
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
  } = n, [f, p] = re(() => jt(t, r)), m = ot(() => new Set(s ?? []), [s]), g = ot(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !wn(f, t), D = se((q) => {
    if (m.has(q)) return;
    const k = g.has(q), L = Oc(f, q, r, { max: o, disabledIds: s });
    wn(L, f) || (p(L), d == null || d(L), u == null || u(q, !k));
  }, [f, g, m, r, o, s, u, d]), C = se((q) => {
    const k = q.filter((K) => !m.has(K)), L = lo(f, k), H = so(f, k, L !== "all", r, { max: o, disabledIds: s });
    wn(H, f) || (p(H), d == null || d(H));
  }, [f, m, r, o, s, d]), w = se((q, k = i ?? r) => {
    const L = so(f, k, q, r, { max: o, disabledIds: s });
    wn(L, f) || (p(L), d == null || d(L));
  }, [f, i, r, o, s, d]), N = se(() => {
    f.length !== 0 && (p([]), d == null || d([]));
  }, [f, d]), E = se((q) => {
    p(jt(q ?? t, r));
  }, [t, r]), j = se(() => !a || wn(f, t) ? !1 : (a(jt(f, r)), !0), [a, f, t, r]), U = se(() => !c || wn(f, t) ? !1 : (c(jt(f, r)), !0), [c, f, t, r]), R = se((q) => lo(f, q), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: Fc(f, r, i),
    isSelected: (q) => g.has(q),
    isDisabled: (q) => m.has(q),
    canToggle: (q) => !m.has(q) && (g.has(q) || !b),
    toggle: D,
    toggleGroup: C,
    setAll: w,
    clear: N,
    reset: E,
    commit: j,
    flush: U,
    cancel: E,
    groupState: R
  };
}
const ps = Xt(null), Bc = () => Gt(ps), ms = Lc;
function zi({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ A("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ A("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ h("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ h("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ h("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Hc({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = je(), p = O(16, 20, f), m = O(12, 14, f), g = O(12, 14, f), b = O(12, 16, f), x = O(10, 12, f), D = O(8, 10, f);
  return /* @__PURE__ */ A(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: D, padding: d ? `${x}px ${b}px` : void 0 },
      onClick: (w) => w.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ h(
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
        d ? /* @__PURE__ */ h(zi, { checked: n, size: p, tone: a }) : /* @__PURE__ */ h("span", { className: "ui-checkbox-box", style: { width: p, height: p }, "aria-hidden": !0, children: n && /* @__PURE__ */ h("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ h("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ h("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const co = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", ao = Be ? " delay-200" : "", _c = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-active:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", jc = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-active:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Wc = "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 group-data-[state=open]:opacity-100";
function qc(n) {
  if (!ct.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function gs({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", children: l }) {
  const c = !!e && !!n, a = c && !t, u = !!n && (t || c), d = qc(n), [f, p] = re({ sig: d, node: n }), [m, g] = re(null);
  d !== f.sig && (p({ sig: d, node: n }), g(f.node)), ae(() => {
    if (m == null) return;
    const x = window.setTimeout(() => g(null), 200);
    return () => window.clearTimeout(x);
  }, [m]);
  const b = m == null ? n : /* @__PURE__ */ A("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ h("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: m }, `out:${f.sig}`),
    /* @__PURE__ */ h("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${d}`)
  ] });
  return c ? /* @__PURE__ */ A(at, { children: [
    u && (a ? /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: `grid min-w-0 ${co}${ao} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${jc}`}`, children: /* @__PURE__ */ h("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: b }) }) : /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: b })),
    /* @__PURE__ */ h("span", { "data-kit-label": !0, className: `grid min-w-0 ${co}${ao} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${_c}`}`, children: /* @__PURE__ */ h("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ h(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Wc}`} ${a ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-active:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: a ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ A("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ h("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ h("span", { className: "col-start-1 row-start-1", children: l })
        ] }) : l
      }
    ) }) })
  ] }) : /* @__PURE__ */ A(at, { children: [
    u && /* @__PURE__ */ h("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    l
  ] });
}
const Rh = {
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
  collapse: f = !1,
  iconWithLabel: p = !0,
  className: m = "",
  type: g = "button",
  children: b,
  ...x
}) {
  const D = Qt(), C = e ?? (D == null ? void 0 : D.mode) ?? "light", w = t ?? zc(D), N = gn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), E = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), j = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), U = "", R = "", q = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, k = "rounded", L = "rounded-[var(--ui-radius-btn)]", H = {
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
  }, X = { base: `${R} bg-[var(--ui-btn-solid-bg)] hover:bg-[var(--ui-btn-solid-hover-bg)] border border-[color:var(--ui-btn-solid-border)] hover:border-[color:var(--ui-btn-solid-hover-border)] text-[color:var(--ui-btn-solid-text)]`, open: "bg-[var(--ui-btn-solid-hover-bg)]!" }, Q = {
    light: {
      subtle: { base: `${U} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      /* The primary fill is the identity header step, mode-independent (the
         app header is always dark chrome). Read from the `data-identity-accent`
         block the button carries, so a neutral modal keeps its project CTA. */
      primary: { base: `${R} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: X,
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
      solid: X,
      outline: {
        base: `${U} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${U} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, Z = x["data-state"] === "open", le = Q[C][n], M = n === "primary" || n === "solid" ? E : n.startsWith("tab") ? j : N, ce = Be ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, be = O(6, 8, je()), Se = O(28, 40, je()), xe = w === "emerald" ? "emerald" : w ? "blue" : null, ne = t === "emerald" ? "emerald" : t ? "blue" : (D == null ? void 0 : D.identityAccent) ?? "zinc", ye = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", ie = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let F;
  if (n === "tab") {
    const Ie = H[C];
    F = `${k} ${r ? xe ? K[xe].active : Ie.active : xe ? K[xe][C === "light" ? "inactiveLight" : "inactiveDark"] : Ie.inactive}`;
  } else if (n === "tab-header") {
    const Ie = xe ? r ? I[xe].active : I[xe].inactive : r ? J.active : J.inactive;
    F = `${k} ${Ie} ${Z ? xe ? I[xe].open : J.open : ""}`;
  } else
    F = `${L} ${le.base} ${Z ? le.open : ""}`, r && (F = `${F} ${i === "neutral" ? ye : ie[i]}`);
  const $ = !!f && !!d && !o, Y = o ? { width: Se, height: Se, padding: 0, gap: 0 } : s === "minimal" ? { ...ce, gap: $ ? 0 : be } : { ...M, gap: $ ? 0 : be };
  return /* @__PURE__ */ h(
    "button",
    {
      type: g,
      "data-mode": C,
      "data-accent": D == null ? void 0 : D.accent,
      "data-surface": D == null ? void 0 : D.surface,
      "data-identity-accent": ne,
      className: `${q} ${o ? "justify-center" : ""} ${$ ? "group" : ""} ${F} ${m}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: Y,
      ...x,
      children: o ? b : /* @__PURE__ */ h(
        gs,
        {
          icon: d,
          collapse: f,
          iconWithLabel: p,
          active: r && (n.startsWith("tab") || c),
          gap: be,
          reserve: a,
          roll: u,
          children: b
        }
      )
    }
  );
}
function zr({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = je(), l = i ?? O(14, 18, s);
  return r === "check" ? /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ h(ql, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ h(lr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ h(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ h(zi, { checked: n, indeterminate: e, size: l })
    }
  );
}
function ys({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const c = je(), a = O(10, 14, c), u = O(6, 9, c), d = O(11, 13, c), f = s === "light" ? "light" : "dark", p = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
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
const Pi = Xt("dark"), xs = () => Gt(Pi), Li = Xt({ "data-theme": "dark" }), Kc = () => Gt(Li);
function Oi() {
  const n = je();
  return {
    padding: `${O(8, 12, n)}px ${O(12, 16, n)}px`,
    fontSize: `${O(12, 14, n)}px`,
    lineHeight: `${O(18, 22, n)}px`
  };
}
function bs() {
  const n = je();
  return {
    padding: `${O(6, 9, n)}px ${O(12, 16, n)}px ${O(2, 3, n)}px`,
    fontSize: `${O(10, 11, n)}px`,
    lineHeight: `${O(14, 16, n)}px`
  };
}
const Jc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", uo = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Vc = (n) => n ? "text-xs" : "text-[10px]";
function Ur(n) {
  const e = Be && Xo() > 0;
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
    headerPad: uo(e),
    headerText: `${uo(e)} font-semibold uppercase tracking-wider ${Vc(e)} ui-label`,
    // Item padding
    itemPad: Jc(e),
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
function vs(n) {
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
const Fi = Xt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), ar = Xt(null), Bi = () => Gt(ar), ws = Xt({ query: "", setQuery: () => {
} }), Yc = () => Gt(ws), ks = Xt(null), Uc = () => Gt(ks), Xc = () => !0;
function Xr(n) {
  const e = v([]), [t, r] = re(-1), [i, o] = re(!1), [s, l] = re(0), c = se((f) => (e.current = [...e.current, f], l((p) => p + 1), () => {
    e.current = e.current.filter((p) => p !== f), l((p) => p + 1);
  }), []), a = se((f, p) => {
    r(f), o(p === "pointer");
  }, []), u = se(() => {
    o((f) => f && (r(-1), !1));
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
function Ss(n) {
  const e = Bi(), t = v(e);
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
function Hi(n, e, t, r) {
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
    var g, b, x, D, C, w;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (u.metaKey || u.ctrlKey) && u.key.toLowerCase() === "a") {
      u.preventDefault(), u.stopImmediatePropagation(), d();
      return;
    }
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const N = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, u);
      (!!((D = l.current) != null && D.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), N && u.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = u.key === "ArrowDown" ? 1 : -1, E = (i.current + N + m.length) % m.length;
        o.current.setHighlighted(E, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].submenu && m[N].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (w = (C = l.current) == null ? void 0 : C.onCloseSub) == null || w.call(C);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const N = Date.now(), E = (N - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: E, time: N }, !E) return;
        const j = i.current + 1;
        for (let U = 0; U < m.length; U++) {
          const R = (j + U) % m.length;
          if (m[R].label.toLowerCase().startsWith(E)) {
            o.current.setHighlighted(R, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function _i(n, e, t, r, i, o, s) {
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
  const f = v(!1);
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
function ji(n, e) {
  const t = v(n);
  t.current = n;
  const r = v(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Gr({
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
  const D = Qt(), C = ds(s, D), w = C.theme, [N, E] = re([]), [j, U] = re(null), R = Vn(), q = Ri(), k = v(null), L = v(null), H = v(n);
  H.current = n;
  const [K, J] = re(n), [I, X] = re(""), Q = f && g !== void 0, Z = Q ? g : I, le = Q ? b ?? (() => {
  }) : X, M = v(g ?? "");
  ae(() => {
    n || (M.current = g ?? "");
  }, [n, g]);
  const ce = Q && Z === M.current ? "" : Z, be = Wl(), Se = v(null), xe = je(), ne = {
    padding: `${O(8, 12, xe)}px ${O(12, 16, xe)}px`,
    fontSize: `${O(12, 14, xe)}px`
  }, [ye, ie] = re(0), F = f && !Q;
  ae(() => {
    var Ge;
    if (!F || !n) return;
    const z = (Ge = L.current) == null ? void 0 : Ge.querySelector("[data-menu-items]");
    if (!z) return;
    const V = () => ie(z.offsetWidth - z.clientWidth);
    V();
    const pe = new ResizeObserver(V);
    return pe.observe(z), () => pe.disconnect();
  }, [n, F, Z]);
  const $ = ot(() => {
    if (!f) return;
    const z = ce.trim().toLowerCase();
    return z ? (V) => {
      var pe;
      return m ? m(z, V.label, V.group) : V.label.toLowerCase().includes(z) || (((pe = V.group) == null ? void 0 : pe.toLowerCase().includes(z)) ?? !1);
    } : Xc;
  }, [ce, f, m]), Y = Xr($), Ie = f && ce.trim() !== "" && Y.items.length === 0, Te = !!x, me = Y.allItems.map((z) => z.itemId).filter((z) => !!z), _e = Y.items.map((z) => z.itemId).filter((z) => !!z), Ee = hs({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? ms,
    itemIds: me,
    visibleIds: _e,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), Fe = v(Ee.reset);
  Fe.current = Ee.reset;
  const B = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Ee.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Ee.count}`;
  ae(() => {
    if (n)
      return J(!0), Q || X(""), Y.setHighlighted(d ?? -1, "keyboard"), Fe.current(), as(() => {
        t == null || t(!1), e == null || e();
      });
    E([]);
  }, [n, d, t, e]), ae(() => {
    if (!n || !q) return;
    const z = (V) => {
      if (V.pointerType !== "touch") return;
      const pe = V.target;
      pe && (L.current && L.current.contains(pe) || k.current && k.current.contains(pe) || pe instanceof Element && pe.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') || (t == null || t(!1), e == null || e()));
    };
    return q.addEventListener("pointerdown", z, { capture: !0 }), () => q.removeEventListener("pointerdown", z, { capture: !0 });
  }, [n, q, t, e]);
  const T = se(() => {
    const z = k.current;
    if (!z) return null;
    const V = z.getBoundingClientRect();
    return { left: V.left, top: V.top, width: V.width, height: V.height };
  }, []), ge = Yr({
    visible: n,
    morph: c,
    anchor: T,
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
  Hi(n && N.length === 0, Y, ve, {
    onFieldKey: we,
    onSelectAll: Te ? () => Ee.setAll(!0) : void 0
  }), ji(n, Pe), _i(n, Y, ve, L, N.length > 0, lt, {
    ignoreFields: Q,
    selectAll: Te
  });
  const Ve = v(null), mt = se((z) => {
    var V;
    if (z) {
      z.addEventListener("keydown", ve.current, { capture: !0 }), z.addEventListener("wheel", Pe.current, { passive: !1 });
      const pe = z.ownerDocument;
      Ve.current = pe, pe.addEventListener("keydown", lt.current, { capture: !0 }), Ae(!0);
    } else
      (V = Ve.current) == null || V.removeEventListener("keydown", lt.current, { capture: !0 }), Ve.current = null, Ae(!1);
    L.current = z, ge(z);
  }, [ge]), [ze, Zt] = re({ top: 0, left: 0, maxH: ss, side: "bottom", ready: !1 }), [Kt, Bt] = re(0), [Et, Ae] = re(!1);
  ae(() => {
    n && k.current && Bt(k.current.getBoundingClientRect().width);
  }, [n]), ls({
    anchorRef: k,
    panelRef: L,
    open: n && Et,
    maxHeight: u,
    onPosition: Zt
  }), ae(() => {
    var z;
    if (ze.ready && n) {
      if (f) {
        (z = Se.current ?? k.current) == null || z.focus();
        return;
      }
      const V = L.current;
      V && V.ownerDocument.activeElement !== V && !V.contains(V.ownerDocument.activeElement) && V.focus();
    }
  }, [ze.ready, n, f]), ae(() => {
    if (!n || !f) return;
    if (Y.items.length === 0) {
      Y.highlightedIndex !== -1 && Y.setHighlighted(-1, "keyboard");
      return;
    }
    const z = Y.highlightedIndex;
    (z < 0 || z >= Y.items.length) && Y.setHighlighted(0, "keyboard");
  }, [n, Z, f, Y.items.length]), et(() => {
    var V;
    if (!n || Y.highlightedIndex < 0 || Y.pointerDriven) return;
    const z = (V = L.current) == null ? void 0 : V.querySelector(`[data-ei="${Y.highlightedIndex}"]`);
    sn(z, "nearest");
  }, [n, Y.highlightedIndex, Y.pointerDriven]);
  const Je = se((z) => {
    if (!(!z && !H.current)) {
      if (!z && At.current) {
        if (Q) return;
        tt.current = !0;
      }
      t ? t(z) : z || e == null || e();
    }
  }, [t, e]), gt = v(K);
  gt.current = K;
  const At = v(!1), tt = v(!1), $t = se(() => {
    if (!H.current && gt.current) {
      if (tt.current) {
        tt.current = !1, At.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), We = ct.isValidElement(r) ? r : null, nt = v(!1), Dt = se(() => {
    const z = k.current;
    z && (nt.current = !0, z.focus(), setTimeout(() => {
      nt.current = !1;
    }, 0));
  }, []), yt = We ? ct.cloneElement(We, {
    ref: (z) => {
      k.current = z;
      const V = We.props.ref;
      typeof V == "function" ? V(z) : V && (V.current = z);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...Q ? { type: We.props.type ?? "text" } : {},
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
      (pe = (V = We.props).onPointerDownCapture) == null || pe.call(V, z), At.current = !0, tt.current = !1, setTimeout(() => {
        At.current = !1;
      }, 0);
    },
    onPointerDown: (z) => {
      var V, pe;
      if ((pe = (V = We.props).onPointerDown) == null || pe.call(V, z), Q) {
        z.preventDefault();
        const Ge = H.current;
        Ge || t == null || t(!0);
        const rt = k.current;
        rt == null || rt.focus(), !Ge && rt instanceof HTMLInputElement && rt.select();
      } else !H.current && gt.current && !tt.current && (t == null || t(!0));
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (z) => {
      var V, pe;
      (pe = (V = We.props).onKeyDownCapture) == null || pe.call(V, z), Q && z.key === " " && z.stopPropagation();
    },
    onClick: (z) => {
      var V, pe;
      (pe = (V = We.props).onClick) == null || pe.call(V, z), $t();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (z) => {
      var V, pe;
      if (nt.current) {
        nt.current = !1;
        return;
      }
      (pe = (V = We.props).onFocus) == null || pe.call(V, z);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (z) => {
      var pe, Ge, rt, St;
      if ((Ge = (pe = We.props).onBlur) == null || Ge.call(pe, z), !Q || !H.current) return;
      const V = z.relatedTarget;
      V && ((rt = L.current) != null && rt.contains(V) || (St = k.current) != null && St.contains(V)) || setTimeout(() => {
        var ee;
        const Rt = k.current;
        if (!Rt || !H.current) return;
        const S = Rt.ownerDocument.activeElement;
        S && (Rt.contains(S) || (ee = L.current) != null && ee.contains(S)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (z) => {
      var V, pe;
      if ((pe = (V = We.props).onKeyDown) == null || pe.call(V, z), !(!Q || !H.current)) {
        if (z.key === "ArrowDown" || z.key === "ArrowUp") {
          z.preventDefault();
          const Ge = Y.items;
          if (Ge.length === 0) return;
          const rt = z.key === "ArrowDown" ? 1 : -1, St = (Y.highlightedIndex + rt + Ge.length) % Ge.length;
          Y.setHighlighted(St, "keyboard");
        } else if (z.key === "Enter") {
          z.preventDefault();
          const Ge = Y.highlightedIndex, rt = Y.items[Ge >= 0 ? Ge : 0];
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
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), Ht = F || Te, qe = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${Ht ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ A(He.Root, { open: n || K, onOpenChange: Je, modal: !1, children: [
    /* @__PURE__ */ h(He.Trigger, { asChild: !0, children: yt }),
    /* @__PURE__ */ h(He.Portal, { container: R ?? void 0, children: /* @__PURE__ */ h(Pi.Provider, { value: w, children: /* @__PURE__ */ h(Li.Provider, { value: C.attrs, children: /* @__PURE__ */ h(Fi.Provider, { value: { chain: N, setChain: E, morph: c, keyboardOpened: j, setKeyboardOpened: U }, children: /* @__PURE__ */ h(ar.Provider, { value: Y, children: /* @__PURE__ */ h(ws.Provider, { value: { query: Z, setQuery: le }, children: /* @__PURE__ */ h(ps.Provider, { value: Te ? Ee : null, children: /* @__PURE__ */ h(ks.Provider, { value: be, children: /* @__PURE__ */ A(
      He.Content,
      {
        id: `${be}-content`,
        ref: mt,
        tabIndex: Q ? void 0 : -1,
        ...C.attrs,
        "data-ui-fixed": !0,
        className: `${qe} ${o || ""} ${a || ""}`,
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
          V != null && V.closest('[role="menu"], [data-radix-menu-content]') && z.preventDefault();
        },
        onInteractOutside: (z) => {
          z.type === "dismissableLayer.focusOutside" && N.length > 0 && z.preventDefault();
        },
        onFocusCapture: Q ? (z) => {
          z.target === z.currentTarget && (z.stopPropagation(), Dt());
        } : void 0,
        onFocusOutside: Q ? (z) => {
          var pe;
          const V = z.target;
          V && (V === k.current || (pe = k.current) != null && pe.contains(V)) && z.preventDefault();
        } : void 0,
        onCloseAutoFocus: Q ? (z) => {
          z.preventDefault(), Dt();
        } : void 0,
        children: [
          F && /* @__PURE__ */ h("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ye }, children: /* @__PURE__ */ A("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: ne, children: [
            /* @__PURE__ */ h(Ln, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ h(
              "input",
              {
                ref: Se,
                value: Z,
                onChange: (z) => le(z.target.value),
                placeholder: p ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            Z ? /* @__PURE__ */ h(
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
                children: /* @__PURE__ */ h(Tn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ h("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          Ht ? /* @__PURE__ */ A("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Ie && Mt
          ] }) : /* @__PURE__ */ A(at, { children: [
            l,
            Ie && Mt
          ] }),
          Te && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ h(
            ys,
            {
              count: Ee.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Ee.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: w,
              onClear: Ee.clear,
              hero: {
                label: B,
                onClick: () => {
                  Ee.commit(), Je(!1);
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
function Gc({
  item: n,
  isActive: e,
  itemSize: t,
  itemRender: r,
  closeOnSelect: i,
  onSelect: o,
  d: s
}) {
  const l = cs(() => o(n.id));
  return /* @__PURE__ */ h(
    He.Item,
    {
      style: t,
      className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${s.rowText} ${e ? "" : s.rowTextHover}`,
      onSelect: (c) => {
        if (l.suppressSelect()) {
          i || c.preventDefault();
          return;
        }
        i || c.preventDefault(), o(n.id);
      },
      onPointerDown: l.onPointerDown,
      onPointerUp: l.onPointerUp,
      onPointerCancel: l.onPointerCancel,
      onTouchStart: () => {
      },
      children: /* @__PURE__ */ h("span", { className: `truncate ${e ? s.rowActiveText : ""}`, children: r ? r(n) : n.name })
    }
  );
}
function Ih({
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
  header: D,
  itemLabel: C,
  trigger: w,
  minItems: N = 1,
  itemRender: E,
  morph: j = !0,
  contentClassName: U
}) {
  const R = Ur(), q = Oi(), [k, L] = re(null), [H, K] = re(""), J = v(H);
  J.current = H;
  const I = v(null), X = v(null), [Q, Z] = re(null), le = se((ne) => {
    X.current = ne, Z(ne);
  }, []), M = fs({
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
      var _e, Ee;
      const F = ie.target;
      if (F && F.closest("input, textarea, [contenteditable]")) {
        k && F === I.current && (ie.key === "Enter" ? (ie.preventDefault(), ie.stopImmediatePropagation(), be()) : ie.key === "Escape" && (ie.preventDefault(), ie.stopImmediatePropagation(), Se()));
        return;
      }
      const $ = (_e = X.current) == null ? void 0 : _e.closest(".ui-menu");
      if (!$ || !$.contains(ie.target)) return;
      const Y = $.ownerDocument, Ie = [...$.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Te = [...$.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], me = [...Ie, ...Te];
      if (ie.key === "ArrowDown" || ie.key === "ArrowUp") {
        ie.preventDefault(), ie.stopImmediatePropagation();
        const Fe = Y.activeElement;
        let B = Fe ? me.indexOf(Fe) : -1;
        if (B < 0 && Fe) {
          const Pe = Fe.closest("[data-im-row]"), lt = Pe == null ? void 0 : Pe.querySelector('[role="menuitem"]:first-child');
          lt && (B = Ie.indexOf(lt));
        }
        const T = ie.key === "ArrowDown" ? 1 : -1, ge = B < 0 ? T === 1 ? 0 : me.length - 1 : (B + T + me.length) % me.length, ve = me[ge];
        ve == null || ve.focus({ preventScroll: !0 }), sn((ve == null ? void 0 : ve.closest("[data-im-row]")) ?? ve, "nearest", X.current);
        return;
      }
      if (ie.key === "ArrowLeft" || ie.key === "ArrowRight") {
        const Fe = Y.activeElement, B = Fe == null ? void 0 : Fe.closest("[data-im-row]");
        if (!B) return;
        ie.preventDefault(), ie.stopImmediatePropagation();
        const T = [...B.querySelectorAll('[role="menuitem"]')].slice(1);
        if (T.length === 0) return;
        const ge = Fe && B.contains(Fe) ? T.indexOf(Fe) : -1, ve = ie.key === "ArrowRight" ? 1 : -1, Pe = ge < 0 ? 0 : (ge + ve + T.length) % T.length;
        (Ee = T[Pe]) == null || Ee.focus({ preventScroll: !0 });
        return;
      }
    }, ye = (Q == null ? void 0 : Q.ownerDocument) ?? null;
    return ye == null || ye.addEventListener("keydown", ne, { capture: !0 }), () => ye == null ? void 0 : ye.removeEventListener("keydown", ne, { capture: !0 });
  }, [n, k, Q]), ae(() => {
    if (!k) return;
    const ne = t.find(($) => $.id === k);
    ne && !H && K(ne.name);
    const ye = requestAnimationFrame(() => {
      const $ = I.current;
      $ && ($.focus(), $.select());
    });
    let ie = 0;
    const F = window.setInterval(() => {
      const $ = I.current;
      if (ie++, !$ || ie > 12) {
        clearInterval(F);
        return;
      }
      $.ownerDocument.activeElement !== $ && ($.focus(), $.select());
    }, 50);
    return () => {
      cancelAnimationFrame(ye), clearInterval(F);
    };
  }, [k]), ae(() => {
    if (k) {
      const ne = t.find((ye) => ye.id === k);
      ne && !H && K(ne.name);
    }
  }, [k, t]);
  const ce = (ne, ye) => {
    L(ne), K(ye);
  }, be = () => {
    k && J.current.trim() && o(k, J.current.trim()), L(null);
  }, Se = () => {
    L(null);
  }, xe = C || D.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ A(Gr, { open: n, onOpenChange: (ne) => {
    ne ? (L(null), K("")) : (k && H.trim() && o(k, H.trim()), L(null), K("")), (!ne || !m) && e(ne);
  }, width: "w-80", theme: g, align: b, trigger: w, morph: j, contentClassName: U, children: [
    /* @__PURE__ */ h("div", { className: `shrink-0 ${R.headerText}`, children: D }),
    /* @__PURE__ */ h("div", { ref: le, "data-im-list": !0, onPointerEnter: M.engage, onPointerDown: M.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((ne) => {
      const ye = ne.id === r, ie = k === ne.id;
      return /* @__PURE__ */ h("div", { "data-im-row": ne.id, "data-active": ye ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${ye || ie ? R.rowActiveBg : R.rowHoverBg} ${k && !ie ? "opacity-40 pointer-events-none" : ""}`, children: ie ? /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ h("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ h(
          "input",
          {
            ref: I,
            autoFocus: !0,
            value: H,
            onChange: (F) => K(F.target.value),
            onKeyDown: (F) => {
              F.key === "Enter" && (F.preventDefault(), F.stopPropagation(), be()), F.key === "Escape" && (F.preventDefault(), F.stopPropagation(), Se());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: q
          }
        ) }),
        /* @__PURE__ */ h(
          He.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${R.editConfirm}`,
            onSelect: (F) => {
              F.preventDefault(), be();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(lr, { className: R.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          He.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${R.editCancel}`,
            onSelect: (F) => {
              F.preventDefault(), Se();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ h(Tn, { className: R.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ h(
          Gc,
          {
            item: ne,
            isActive: ye,
            itemSize: q,
            itemRender: E,
            closeOnSelect: p,
            onSelect: i,
            d: R
          }
        ),
        /* @__PURE__ */ h(
          He.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? R.btnActive : R.btnBase}`,
            onSelect: (F) => {
              F.preventDefault(), ce(ne.id, ne.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(Kl, { className: R.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          He.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${ye ? R.btnActive : R.btnBase}`,
            onSelect: (F) => {
              F.preventDefault();
              const $ = s(ne.id);
              $ && ce($, `${ne.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ h(qo, { className: R.btnIcon })
          }
        ),
        /* @__PURE__ */ h(
          He.Item,
          {
            className: `shrink-0 ${R.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= N ? R.btnDisabled : ye ? R.btnDangerActive : R.btnDanger}`,
            onSelect: (F) => {
              F.preventDefault(), l(ne.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= N,
            children: /* @__PURE__ */ h(gi, { className: R.btnIcon })
          }
        )
      ] }) }, ne.id);
    }) }),
    /* @__PURE__ */ A("div", { className: `shrink-0 ${k ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ h(He.Separator, { className: R.separator }),
        /* @__PURE__ */ A(
          He.Item,
          {
            className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
            onSelect: (ne) => {
              ne.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ h(Ko, { className: `${R.btnIcon} ${R.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ h(He.Separator, { className: R.separator }),
      c && /* @__PURE__ */ A(
        He.Item,
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
            /* @__PURE__ */ h(Kr, { className: `${R.btnIcon} ${R.icon}` }),
            "New ",
            xe
          ]
        }
      ),
      a && /* @__PURE__ */ A(
        He.Item,
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
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ A(
        He.Item,
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
              /* @__PURE__ */ h("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ h("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ h("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ A(
        He.Item,
        {
          className: `w-full text-left ${R.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${R.itemDefault} ui-row`,
          onSelect: (ne) => {
            ne.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ h(gi, { className: `${R.btnIcon} ${R.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Ns({
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
  xs();
  const f = Ur(), p = Oi(), m = bs(), g = v(!1), b = v(null), x = Bc(), D = !!x && d !== void 0, C = x && d !== void 0 ? x.isSelected(d) : l, w = t || (x && d !== void 0 ? !x.canToggle(d) : !1), N = () => {
    w || (x && d !== void 0 ? x.toggle(d) : n());
  }, E = cs(N, w), { myIndex: j, highlighted: U, setPointer: R, api: q } = Ss({
    label: () => vs(o),
    activate: N,
    disabled: w,
    group: u,
    itemId: d
  }), { query: k } = Yc(), L = k.trim() !== "" && j < 0, H = Uc(), K = u == null ? void 0 : u.trim(), J = !!K && j >= 0 && (j === 0 || ((Z = q == null ? void 0 : q.items[j - 1]) == null ? void 0 : Z.group) !== K), I = K && x ? ((q == null ? void 0 : q.items) ?? []).filter((le) => le.group === K && le.itemId).map((le) => le.itemId).filter((le) => !x.isDisabled(le)) : [], X = x && I.length > 0 ? x.groupState(I) : "none", Q = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ A(at, { children: [
    J && /* @__PURE__ */ h(
      "div",
      {
        "data-menu-group": K,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && I.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && I.length > 0 ? /* @__PURE__ */ A("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${K}`,
              onMouseDown: (le) => le.preventDefault(),
              onClick: () => x.toggleGroup(I),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ h(
                zr,
                {
                  checked: X === "all",
                  indeterminate: X === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: K })
        ] }) : K
      }
    ),
    /* @__PURE__ */ A(
      He.Item,
      {
        ref: b,
        id: H && j >= 0 ? `${H}-opt-${j}` : void 0,
        "data-ei": j >= 0 ? j : void 0,
        ...D ? { role: "menuitemcheckbox", "aria-checked": C } : {},
        style: { ...p, display: L ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Q} ${D ? "" : l ? "ui-item-selected" : ""} ${U ? "ui-item-highlighted" : ""} ${w ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (le) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (E.suppressSelect()) {
            (s || D) && le.preventDefault();
            return;
          }
          if (D) {
            le.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && le.preventDefault(), n();
        },
        onPointerDown: E.onPointerDown,
        onPointerUp: E.onPointerUp,
        onPointerCancel: E.onPointerCancel,
        onPointerEnter: () => {
          R(j);
        },
        onTouchStart: () => {
        },
        disabled: w,
        children: [
          D && /* @__PURE__ */ h(zr, { checked: C, disabled: w, indicator: x.indicator }),
          e && /* @__PURE__ */ h("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: o }),
          a && /* @__PURE__ */ h("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
          c && /* @__PURE__ */ h(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
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
function Qc({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s, touchPresentation: l }) {
  const { chain: c, setChain: a, morph: u, keyboardOpened: d, setKeyboardOpened: f } = Gt(Fi), p = c.includes(n), m = l ?? "replace", g = Be && m === "accordion", b = Be && m === "replace", x = c[c.length - 1] === n;
  xs();
  const D = Kc(), C = Vn(), w = v(null), N = v(null), E = v(null), j = v(0), U = v(0), R = v(null), [q, k] = re(p), [L, H] = re(!1), K = !p && q;
  ae(() => {
    p && k(!0);
  }, [p]);
  const J = () => a((B) => {
    const T = B.indexOf(n);
    return T >= 0 ? B.slice(0, T) : B;
  }), I = () => {
    var lt;
    const B = (lt = w.current) == null ? void 0 : lt.ownerDocument;
    if (!B) return;
    let T = 0;
    const ge = () => {
      B.removeEventListener("click", ve, !0), B.removeEventListener("pointerdown", Pe, !0), T && window.clearTimeout(T);
    }, ve = (we) => {
      we.preventDefault(), we.stopImmediatePropagation(), ge();
    }, Pe = () => ge();
    B.addEventListener("click", ve, !0), B.addEventListener("pointerdown", Pe, !0), T = window.setTimeout(ge, 600);
  }, X = () => {
    if (b && Bn(u)) {
      const B = N.current, T = E.current;
      if (B && T && B.isConnected && T.isConnected) {
        const ge = B.getBoundingClientRect();
        delete T.dataset.submenuOpen, delete T.dataset.submenuInert, B.style.visibility = "hidden", Dr(U, T, ge);
      }
    }
    J();
  }, Q = Xr(), Z = Bi(), le = v(Z);
  le.current = Z;
  const M = v(null);
  ae(() => {
    var T;
    const B = {
      label: e,
      activate: () => {
        f(n), a((ge) => ge.includes(n) ? ge : [...ge, n]);
      },
      submenu: !0
    };
    return M.current = B, (T = le.current) == null ? void 0 : T.register(B);
  }, []);
  const ce = Z && M.current ? Z.items.indexOf(M.current) : -1, be = ce >= 0 && ce === Z.highlightedIndex, Se = se(() => {
    const B = w.current;
    if (!B) return null;
    const T = B.getBoundingClientRect();
    return { left: T.left, top: T.top, width: T.width, height: T.height };
  }, []), xe = Yr({
    visible: p,
    /* Replace owns the transition (FLIP via playRectMorph on both edges);
       the generic scale/fade would fight it. Desktop side flyouts keep it. */
    morph: u && !b,
    anchor: Se,
    onClosed: () => k(!1)
  }), ne = v(() => {
  }), ye = v(() => {
  }), ie = v(() => {
  });
  Hi(p && x, Q, ne, {
    onCloseSub: () => {
      X(), Z && ce >= 0 && Z.setHighlighted(ce, "keyboard");
    }
  });
  const F = v(d);
  F.current = d, ae(() => {
    p && (F.current === n ? (Q.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var B;
      return (B = N.current) == null ? void 0 : B.focus();
    }), f(null)) : Q.setHighlighted(-1, "keyboard"));
  }, [p]), ji(p, ye), _i(p, Q, ne, N, !x, ie), ae(() => {
    if (!g || !p) return;
    const B = w.current, T = (B == null ? void 0 : B.closest("[data-submenu-panel]")) ?? (B == null ? void 0 : B.closest('[role="menu"]'));
    if (T)
      return T.dataset.submenuOpen = "accordion", () => {
        delete T.dataset.submenuOpen;
      };
  }, [g, p]);
  const [$, Y] = re(null);
  et(() => {
    if (!p || !Be || g) {
      Y(null);
      return;
    }
    const B = w.current, T = B == null ? void 0 : B.closest('[role="menu"]');
    if (!B || !T) return;
    E.current = T;
    const ge = B.getBoundingClientRect(), ve = T.getBoundingClientRect(), Pe = parseInt(getComputedStyle(T).zIndex, 10) || 0;
    Y({
      presentation: "replace",
      sideOffset: ve.left - ge.right,
      alignOffset: ve.top - ge.top,
      width: ve.width,
      childZ: Pe + 2
    }), T.dataset.submenuOpen = "replace", N.current && Bn(u) && (N.current.style.visibility = "hidden");
    const lt = window.setTimeout(() => {
      T.isConnected && (T.dataset.submenuInert = "replace");
    }, 320);
    return () => {
      window.clearTimeout(lt), delete T.dataset.submenuOpen, delete T.dataset.submenuInert, E.current === T && (E.current = null);
    };
  }, [p, m]), et(() => {
    if (!p || !b || !$ || !L || !Bn(u)) return;
    const B = N.current, T = E.current;
    if (!B || !T) return;
    B.style.visibility = "hidden";
    let ge = 0, ve = 0;
    return ge = requestAnimationFrame(() => {
      ve = requestAnimationFrame(() => {
        if (!B.isConnected || !T.isConnected) return;
        const Pe = T.getBoundingClientRect();
        !Pe.width || !Pe.height || (B.style.visibility = "visible", Dr(j, B, Pe));
      });
    }), () => {
      cancelAnimationFrame(ge), cancelAnimationFrame(ve);
    };
  }, [p, b, $, L]), ct.useLayoutEffect(() => {
    var T;
    if (!p || Q.highlightedIndex < 0 || Q.pointerDriven) return;
    const B = (T = N.current) == null ? void 0 : T.querySelector(`[data-ei="${Q.highlightedIndex}"]`);
    sn(B, "nearest", N.current);
  }, [p, Q.highlightedIndex, Q.pointerDriven]);
  const Ie = v(null), Te = se((B) => {
    var T;
    if (B) {
      B.addEventListener("keydown", ne.current, { capture: !0 }), B.addEventListener("wheel", ye.current, { passive: !1 });
      const ge = B.ownerDocument;
      Ie.current = ge, ge.addEventListener("keydown", ie.current, { capture: !0 });
    } else
      (T = Ie.current) == null || T.removeEventListener("keydown", ie.current, { capture: !0 }), Ie.current = null;
    N.current = B, H(!!B), xe(B);
  }, [xe]), me = je(), _e = { padding: `${O(8, 12, me)}px ${O(12, 16, me)}px`, fontSize: O(12, 14, me) }, Ee = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${be ? " ui-item-highlighted" : ""}${K ? " ui-sub-closing" : ""}`, Fe = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ A(He.Sub, { open: p || q, onOpenChange: (B) => a((T) => {
    if (!B) {
      const ge = T.indexOf(n);
      return ge >= 0 ? T.slice(0, ge) : T;
    }
    return T.includes(n) ? T : [...T, n];
  }), children: [
    /* @__PURE__ */ A(
      He.SubTrigger,
      {
        ref: w,
        "data-ei": ce >= 0 ? ce : void 0,
        "data-submenu-header": Be ? "true" : void 0,
        style: _e,
        className: Ee,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          Z && ce >= 0 && Z.setHighlighted(ce, "pointer");
        },
        onPointerDown: (B) => {
          B.pointerType === "pen" ? (B.preventDefault(), a((T) => p ? T.slice(0, T.indexOf(n)) : [...T, n])) : b && B.pointerType === "touch" && (R.current = { x: B.clientX, y: B.clientY });
        },
        onPointerUp: (B) => {
          if (!b || B.pointerType !== "touch") return;
          const T = R.current;
          R.current = null, !(!T || p) && (Math.hypot(B.clientX - T.x, B.clientY - T.y) > 8 || (f(null), I(), a((ge) => ge.includes(n) ? ge : [...ge, n])));
        },
        onPointerCancel: () => {
          R.current = null;
        },
        onClick: (B) => {
          !g || !p || (B.preventDefault(), B.stopPropagation(), X());
        },
        children: [
          i === "left" && /* @__PURE__ */ h(Ar, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ A("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ h("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ h(Ar, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    g && p && /* The accordion body: rendered INLINE in the parent card, below the
    reordered header row. No portal, no positioning — the card simply
    grows and the panel fades/slides in. */
    /* @__PURE__ */ h("div", { "data-submenu-panel": !0, className: "ui-submenu-panel", children: o }),
    !g && /* @__PURE__ */ h(He.Portal, { container: C ?? void 0, children: /* @__PURE__ */ h(
      He.SubContent,
      {
        ref: Te,
        ...D,
        "data-submenu-presentation": $ == null ? void 0 : $.presentation,
        className: Fe,
        align: $ ? "start" : void 0,
        sideOffset: $ ? $.sideOffset : 8,
        alignOffset: $ ? $.alignOffset : -4,
        collisionPadding: 8,
        style: $ ? { width: $.width, zIndex: $.childZ } : void 0,
        onPointerLeave: Q.pointerLeave,
        onFocusOutside: (B) => {
          const T = B.target;
          T != null && T.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') && B.preventDefault();
        },
        children: /* @__PURE__ */ A(ar.Provider, { value: Q, children: [
          $ && /* Back is a NORMAL menu item (same row height/padding as every
          other row), pinned above the scrolling list with the standard
          divider beneath it. It names the immediate parent. */
          /* @__PURE__ */ h(
            "div",
            {
              "data-submenu-back": !0,
              className: "sticky -top-1 z-10 -mx-1 -mt-1 mb-1 shrink-0 border-b border-[color:var(--ui-sep)] bg-[var(--ui-menu-bg)]",
              children: /* @__PURE__ */ h(
                Ns,
                {
                  keepOpen: !0,
                  onClick: X,
                  icon: /* @__PURE__ */ h(Jo, { className: "h-3.5 w-3.5 shrink-0" }),
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
const $n = 8, Ah = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const c = Qt(), a = s ? { theme: s, attrs: { "data-theme": s } } : c ? ds(void 0, c) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = a, d = je(), f = O(12, 14, d), p = v(null), m = cr(), [g, b] = re(!1), [x, D] = re([]), [C, w] = re(null), N = Xr();
  ae(() => {
    if (n)
      return N.setHighlighted(-1, "keyboard"), as(r);
  }, [n, r]);
  const E = v({ left: e, top: t });
  n && (E.current = { left: e, top: t });
  const j = se(() => ({ left: E.current.left, top: E.current.top, width: 0, height: 0 }), []), U = Yr({
    visible: !0,
    morph: l,
    anchor: j,
    cloneOnUnmount: !0
  }), R = v(() => {
  }), q = v(() => {
  }), k = v(() => {
  });
  Hi(n, N, R), et(() => {
    if (!n || N.highlightedIndex < 0 || N.pointerDriven) return;
    const I = p.current;
    sn(
      I == null ? void 0 : I.querySelector(`[data-ei="${N.highlightedIndex}"]`),
      "nearest",
      I
    );
  }, [n, N.highlightedIndex, N.pointerDriven]), ji(n, q), _i(n, N, R, p, x.length > 0, k);
  const L = v(null), H = se((I) => {
    var X;
    if (I) {
      I.addEventListener("keydown", R.current, { capture: !0 }), I.addEventListener("wheel", q.current, { passive: !1 });
      const Q = I.ownerDocument;
      L.current = Q, Q.addEventListener("keydown", k.current, { capture: !0 });
    } else
      (X = L.current) == null || X.removeEventListener("keydown", k.current, { capture: !0 }), L.current = null;
    p.current = I, b(!!I), U(I);
  }, [U]), [K, J] = re(null);
  return et(() => {
    var F;
    if (!n || !g || !p.current) return;
    const I = p.current, X = I.offsetWidth, Q = I.offsetHeight, Z = m ?? null, le = Z ? rs(Z) : { x: 0, y: 0, width: 0, height: 0 }, M = Z ? is(Z.document) : { left: 0, right: 0, top: 0, bottom: 0 }, ce = (F = o == null ? void 0 : o.current) == null ? void 0 : F.getBoundingClientRect(), be = (ce ? ce.right : le.x + le.width) - M.right, Se = (ce ? ce.bottom : le.y + le.height) - M.bottom, xe = (ce ? ce.left : le.x) + M.left, ne = (ce ? ce.top : le.y) + M.top;
    let ye = Math.max(ne + $n, E.current.top), ie = Math.max(xe + $n, E.current.left);
    ie + X > be && (ie = Math.max(xe + $n, be - X - $n)), ye + Q > Se && (ye = Math.max(ne + $n, Se - Q - $n)), J({ left: ie, top: ye });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ A(He.Root, { open: n, onOpenChange: (I) => {
    I || r();
  }, modal: !1, children: [
    /* @__PURE__ */ h(He.Trigger, { asChild: !0, children: /* @__PURE__ */ h("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ h(He.Portal, { children: /* @__PURE__ */ h(Pi.Provider, { value: u, children: /* @__PURE__ */ h(Li.Provider, { value: a.attrs, children: /* @__PURE__ */ h(Fi.Provider, { value: { chain: x, setChain: D, morph: l, keyboardOpened: C, setKeyboardOpened: w }, children: /* @__PURE__ */ h(ar.Provider, { value: N, children: /* @__PURE__ */ h(
      He.Content,
      {
        ref: H,
        ...a.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: {
          fontSize: f,
          left: (K == null ? void 0 : K.left) ?? E.current.left,
          top: (K == null ? void 0 : K.top) ?? E.current.top,
          touchAction: "manipulation"
        },
        onPointerLeave: N.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, $h = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = je(), c = { padding: `${O(8, 12, l)}px ${O(12, 16, l)}px`, fontSize: O(12, 14, l) }, a = Bi(), u = v(a);
  u.current = a;
  const d = v(null);
  ae(() => {
    var g;
    const m = { label: vs(s), activate: () => {
      r || n();
    } };
    return d.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, p = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ A(
    He.Item,
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
}, Dh = () => /* @__PURE__ */ h(He.Separator, { className: "ui-sep my-1" }), zh = (n) => /* @__PURE__ */ h(Qc, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Oe = 8, Ts = "[data-modal-stack]", Er = 0.94;
function Dn() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function fn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function Zc(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Er})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${kt}ms ${xn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, kt + 60));
    });
  });
}
function fo(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Er, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Er, height: i.height * Er };
  e.style.transition = `transform ${kt}ms ${xn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = es(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, kt + 60);
}
function oi(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Ts) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function yr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(Ts) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function ea({
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
  const g = Qt(), b = $i(
    { mode: f, accent: m, surface: p, context: "surface" },
    g
  ), x = b.mode, D = b.surface, C = b.accent, w = v(null), N = v(null), E = v(null), j = je(), U = O(20, 24, j), R = O(10, 12, j), q = O(12, 14, j), k = O(14, 16, j), L = O(20, 24, j), H = O(20, 24, j), K = O(20, 24, j), J = O(14, 16, j), I = O(16, 20, j), X = O(10, 12, j), Q = O(12, 14, j), Z = O(8, 10, j), le = O(4, 6, j), M = { padding: `${R}px ${U}px` }, ce = { fontSize: q }, be = { padding: `${H}px ${L}px 16px ${L}px` }, Se = { fontSize: k }, xe = { padding: `0 ${L}px 16px` }, ne = { padding: `${K}px ${L}px` }, ye = { fontSize: X, padding: `${le}px ${Z}px` }, [ie, F] = re(!1), $ = se((S) => {
    w.current = S, F(S !== null);
  }, []), Y = Vn(), Ie = cr(), Te = v(Ie);
  Te.current = Ie;
  const [me, _e] = re(null), Ee = v(null), Fe = v(!1), B = v(!1), T = v(0), ge = v({ w: 0, h: 0 }), ve = v(!1), [Pe, lt] = re(!1), [we, Ve] = re(!1), mt = v(0), ze = v(!1), [Zt, Kt] = re(!1), Bt = v(c);
  Bt.current = c;
  const Et = v(!1), Ae = v(!1), Je = () => {
    Ae.current = !0, lt(!0);
  }, gt = () => {
    Ae.current = !1, lt(!1);
  };
  ae(() => {
    n || (_e(null), ve.current = !1, Fe.current = !1, Ve(!1));
  }, [n]), et(() => {
    if (!n || ve.current || !ie || !w.current) return;
    ve.current = !0;
    const S = w.current.getBoundingClientRect(), ee = Te.current ?? null, ue = (ee == null ? void 0 : ee.innerWidth) ?? 0, oe = fn(ee);
    _e({
      left: Math.max(Oe, Math.min((ue - S.width) / 2, ue - S.width - Oe)),
      top: Math.max(oe.top + Oe, Math.min(oe.top + (oe.height - S.height) / 2, oe.bottom - S.height - Oe))
    });
  }, [n, ie]), et(() => {
    if (!n || !ie || !c || Dn() || !w.current) return;
    const S = w.current, ee = oi(S), ue = ee[ee.length - 1];
    Je(), ue ? Dr(mt, S, ue.getBoundingClientRect(), gt) : Zc(mt, S, gt);
  }, [n, ie]);
  const At = se(() => {
    if (!u || ze.current) return;
    const S = w.current, ee = !!S && oi(S).length > 0;
    if (!S || !c || Dn() || ee) {
      e();
      return;
    }
    ze.current = !0, Kt(!0), Et.current = !0, Je(), fo(mt, S, () => {
      ze.current = !1, Kt(!1), gt(), e();
    });
  }, [c, e, u]), tt = se(() => {
    const S = w.current;
    if (!S || Et.current || !Bt.current || Dn() || oi(S).length > 0) return;
    const ee = S.ownerDocument, ue = S.cloneNode(!0);
    ue.removeAttribute("data-modal-stack"), ue.removeAttribute("data-state"), ue.removeAttribute("role"), ue.removeAttribute("data-aria-hidden"), ue.removeAttribute("tabindex"), ue.setAttribute("aria-hidden", "true"), ue.style.pointerEvents = "none", ee.body.appendChild(ue), fo({ current: 0 }, ue, () => {
      ue.isConnected && ue.remove();
    });
  }, []);
  et(() => () => tt(), [tt]);
  const $t = v(n);
  et(() => {
    const S = $t.current;
    $t.current = n, S && !n && tt();
  }, [n, ie, tt]), ae(() => {
    if (!n || !ie || !c || !w.current) return;
    const S = w.current, ee = S.parentNode;
    if (!ee) return;
    let ue = 0, oe = null, Ne = !1;
    const $e = () => {
      ue = 0;
      const De = yr(S);
      if (De.length > 0)
        S.style.opacity = "", S.style.pointerEvents = "", oe = De[De.length - 1].getBoundingClientRect(), Ne = !0, ue = requestAnimationFrame($e);
      else if (Ne) {
        Ne = !1, oe && !Dn() && (Je(), Dr(mt, S, oe, gt)), oe = null;
        const Re = Te.current ?? null;
        Re == null || Re.setTimeout(() => {
          !S || !S.isConnected || getComputedStyle(S).opacity !== "1" && (S.style.opacity = "1", S.style.pointerEvents = "");
        }, 240);
      }
    }, Ke = new MutationObserver(() => {
      !ue && yr(S).length > 0 && (ue = requestAnimationFrame($e));
    });
    return Ke.observe(ee, { childList: !0 }), () => {
      Ke.disconnect(), ue && cancelAnimationFrame(ue);
    };
  }, [n, ie]), ae(() => {
    if (!ie || !c || Dn() || !w.current) return;
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
      if (Ee.current || ze.current || yr(S).length > 0) {
        ee = Ne;
        return;
      }
      if (Ae.current) return;
      const $e = ee;
      ee = Ne, Je();
      const Ke = S.getBoundingClientRect(), De = fn(Te.current ?? null), Re = !Fe.current && !B.current, ft = Re ? De.top + (De.height - $e) / 2 : Ke.top, it = Re ? De.top + (De.height - Ne) / 2 : Ke.top;
      S.style.transition = "none", S.style.height = `${$e}px`, Re && (S.style.top = `${ft}px`), N.current && (N.current.style.overflow = "hidden"), S.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          S.style.height === `${$e}px` && (S.style.transition = `height ${kt}ms ${xn}${Re ? `, top ${kt}ms ${xn}` : ""}`, S.style.height = `${Ne}px`, Re && (S.style.top = `${it}px`), window.setTimeout(() => {
            S.style.height === `${Ne}px` && (S.style.transition = "", S.style.height = "", N.current && (N.current.style.overflow = ""), Re && _e({ left: Ke.left, top: it }), gt());
          }, kt + 60));
        });
      });
    });
    return oe.observe(S), () => oe.disconnect();
  }, [ie]), ae(() => {
    if (!ie || !w.current || c && !Dn()) return;
    const S = w.current, ee = new ResizeObserver(() => {
      if (!S.isConnected || Ee.current || ze.current || B.current || yr(S).length > 0) return;
      const ue = Te.current ?? null, oe = fn(ue), Ne = (ue == null ? void 0 : ue.innerWidth) ?? 0, $e = S.getBoundingClientRect(), Ke = Math.max(oe.top + Oe, Math.min($e.top, oe.bottom - $e.height - Oe)), De = Math.max(Oe, Math.min($e.left, Ne - $e.width - Oe));
      (Math.abs(Ke - $e.top) > 0.5 || Math.abs(De - $e.left) > 0.5) && _e({ left: De, top: Ke });
    });
    return ee.observe(S), () => ee.disconnect();
  }, [ie, c]);
  const We = se(() => {
    const S = w.current;
    if (!S) return null;
    const ee = S.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), nt = se((S, ee) => {
    const ue = Te.current ?? null, oe = (ue == null ? void 0 : ue.innerWidth) ?? 0, Ne = fn(ue), $e = We(), Ke = $e ? $e.width : Math.min(oe - Oe * 2, 576), De = $e ? $e.height : Math.min(Ne.height - Oe * 2, 400);
    return {
      left: Math.max(Oe, Math.min(S, oe - Ke - Oe)),
      top: Math.max(Ne.top + Oe, Math.min(ee, Ne.bottom - De - Oe))
    };
  }, [We]);
  ae(() => {
    if (!n) return;
    const S = Te.current ?? null, ee = (S == null ? void 0 : S.visualViewport) ?? null;
    if (!S || !ee) return;
    const ue = 120;
    B.current = !1, ge.current = { w: S.innerWidth, h: S.innerHeight };
    let oe = 0;
    const Ne = () => {
      if (ze.current || Ee.current) return;
      const Ke = (S == null ? void 0 : S.innerHeight) ?? 0, De = (S == null ? void 0 : S.innerWidth) ?? 0, ft = fn(S).height < Ke - ue, it = Ke < ge.current.h - ue && De === ge.current.w;
      ft || it ? (B.current = !0, T.current && (clearTimeout(T.current), T.current = 0)) : T.current || (T.current = (S == null ? void 0 : S.setTimeout(() => {
        B.current = !1, T.current = 0, Ve(!1);
      }, 600)) ?? 0), Ve(B.current), !oe && (oe = requestAnimationFrame(() => {
        var Rn;
        oe = 0;
        const It = w.current;
        if (!It) return;
        const xt = fn(Te.current ?? null), Le = It.getBoundingClientRect(), Ut = ((Rn = Te.current) == null ? void 0 : Rn.innerWidth) ?? 0, en = (S == null ? void 0 : S.innerHeight) ?? 0, vn = xt.height < en - ue || en < ge.current.h - ue && (S == null ? void 0 : S.innerWidth) === ge.current.w;
        ge.current = { w: (S == null ? void 0 : S.innerWidth) ?? 0, h: en };
        const Me = Le.top >= xt.top + Oe && Le.bottom <= xt.bottom - Oe, cn = () => {
          _e({
            left: Math.max(Oe, Math.min((Ut - Le.width) / 2, Ut - Le.width - Oe)),
            top: Math.max(xt.top + Oe, Math.min(xt.top + (xt.height - Le.height) / 2, xt.bottom - Le.height - Oe))
          });
        };
        if (vn && !Be) {
          if (Fe.current) {
            Me || _e(nt(Le.left, Le.top));
            return;
          }
          if (Me) return;
          cn();
          return;
        }
        if (!B.current) {
          if (Fe.current) {
            Me || _e(nt(Le.left, Le.top));
            return;
          }
          Me || cn();
        }
      }));
    };
    ee.addEventListener("resize", Ne), ee.addEventListener("scroll", Ne);
    const $e = () => {
      ze.current || Ee.current || oe || (oe = requestAnimationFrame(() => {
        oe = 0;
        const Ke = w.current;
        if (!Ke) return;
        const De = Te.current ?? null, Re = fn(De), ft = (De == null ? void 0 : De.innerWidth) ?? 0, it = Ke.getBoundingClientRect();
        if (Fe.current) {
          _e(nt(it.left, it.top));
          return;
        }
        _e({
          left: Math.max(Oe, Math.min((ft - it.width) / 2, ft - it.width - Oe)),
          top: Math.max(Re.top + Oe, Math.min(Re.top + (Re.height - it.height) / 2, Re.bottom - it.height - Oe))
        });
      }));
    };
    return S.addEventListener("orientationchange", $e), () => {
      ee.removeEventListener("resize", Ne), ee.removeEventListener("scroll", Ne), S.removeEventListener("orientationchange", $e), oe && cancelAnimationFrame(oe), T.current && clearTimeout(T.current);
    };
  }, [n, nt]);
  const Dt = se((S) => {
    if (S.target.closest("button")) return;
    Fe.current = !0;
    const ee = We();
    ee && (_e(nt(ee.left, ee.top)), Ee.current = { startX: S.clientX, startY: S.clientY, posX: ee.left, posY: ee.top }, S.target.setPointerCapture(S.pointerId));
  }, [We, nt]), yt = se((S) => {
    const ee = Ee.current;
    ee && (S.preventDefault(), _e(nt(ee.posX + S.clientX - ee.startX, ee.posY + S.clientY - ee.startY)));
  }, [nt]), Mt = se(() => {
    Ee.current = null;
  }, []), Ht = Ee.current !== null, qe = se(() => {
    Fe.current = !1;
    const S = Te.current ?? null, ee = fn(S), ue = (S == null ? void 0 : S.innerWidth) ?? 0, oe = w.current, Ne = oe ? oe.getBoundingClientRect() : { width: 0, height: 0 };
    _e({
      left: Math.max(Oe, Math.min((ue - Ne.width) / 2, ue - Ne.width - Oe)),
      top: Math.max(ee.top + Oe, Math.min(ee.top + (ee.height - Ne.height) / 2, ee.bottom - Ne.height - Oe))
    });
  }, []), z = v(0), V = se(() => {
    const S = Date.now();
    S - z.current < 300 ? (z.current = 0, qe()) : z.current = S;
  }, [qe]), pe = me !== null, Ge = pe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", rt = `${i ? `${i} w-full` : "max-w-xl w-full"}`, St = {
    ...pe ? { left: me.left, top: me.top } : {},
    width: `min(100%, calc(100dvw - ${Oe * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...we ? {} : { maxHeight: `calc(100dvh - ${Oe * 2}px)` }
  }, Rt = se((S) => {
    if (S.key !== "Enter" || S.shiftKey || S.metaKey || S.ctrlKey || S.altKey) return;
    const ee = S.target, ue = E.current;
    if (!(!!ee.closest("[data-modal-close]") || !!ue && ue.contains(ee) && !!ee.closest('button, a, [role="button"]')) && ee.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ue) return;
    const Ne = Array.from(ue.querySelectorAll("button[data-modal-confirm]")), $e = Ne.length > 0 ? Ne : Array.from(ue.querySelectorAll("button")), Ke = $e[$e.length - 1];
    !Ke || Ke.disabled || (S.preventDefault(), Ke.click());
  }, []);
  return /* @__PURE__ */ h(Di, { theme: b, children: /* @__PURE__ */ h(dn.Root, { open: n, onOpenChange: (S) => {
    S || At();
  }, children: /* @__PURE__ */ A(dn.Portal, { container: Y ?? void 0, children: [
    /* @__PURE__ */ h(
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
        ref: $,
        onKeyDown: Rt,
        onInteractOutside: (S) => {
          d || S.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": C,
        "data-surface": D,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ge} ${rt}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(St).length > 0 ? St : {} },
        children: [
          a ? /* @__PURE__ */ A(
            "div",
            {
              style: be,
              className: `flex items-center justify-between ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Pe || Dt(S);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: V,
              children: [
                /* @__PURE__ */ h(dn.Title, { style: Se, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ h(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Tn, { style: { width: I, height: I } }) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "div",
            {
              style: M,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${Ht ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (S) => {
                Pe || Dt(S);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: V,
              children: [
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ h("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ h(dn.Title, { style: ce, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ A("button", { onClick: l, style: ye, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ h(Ko, { style: { width: Q, height: Q } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ h(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ h(Tn, { style: { width: J, height: J } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ h("div", { ref: N, "data-testid": "modal-body", style: a ? xe : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ h("div", { ref: E, style: a ? ne : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Ph({ children: n }) {
  const e = je(), t = O(20, 24, e), r = O(8, 12, e);
  return /* @__PURE__ */ h("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const ta = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", na = {
  zinc: "bg-[var(--ui-btn-solid-bg)] text-[color:var(--ui-btn-solid-text)] font-semibold border border-[color:var(--ui-btn-solid-border)] hover:bg-[var(--ui-btn-solid-hover-bg)] hover:border-[color:var(--ui-btn-solid-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, ra = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function xr({
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
      className: `${ta} ${n === "hero" ? na[e] : ra[n]} ${t}`,
      ...i
    }
  );
}
function Pr(n = "md") {
  const e = Be && Xo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function Cs(n = "md") {
  return n === "sm" ? gn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : gn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Es = Xt(null);
function Lh() {
  const n = Gt(Es);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Oh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = re(null), [s, l] = re(!1), c = v(null), a = je(), u = O(16, 20, a), d = O(12, 14, a), f = Cs(), p = v(i);
  p.current = i;
  const m = se(() => {
    const N = p.current;
    N && (N.kind === "confirm" ? N.resolve(!1) : N.kind === "prompt" ? N.resolve(null) : N.resolve());
  }, []), g = se((N) => {
    if (N.suppressKey) {
      const E = localStorage.getItem(N.suppressKey);
      if (E && Date.now() < parseInt(E, 10))
        return Promise.resolve(!0);
    }
    return new Promise((E) => {
      m(), l(!1), o({ kind: "confirm", options: N, resolve: E });
    });
  }, [m]), b = se((N) => new Promise((E) => {
    m(), o({ kind: "prompt", options: N, resolve: E });
  }), [m]), x = se((N) => new Promise((E) => {
    m(), o({ kind: "alert", options: N, resolve: E });
  }), [m]);
  ae(() => {
    if (i) {
      const N = setTimeout(() => {
        var E;
        return (E = c.current) == null ? void 0 : E.focus();
      }, 50);
      return () => clearTimeout(N);
    }
  }, [i]);
  const D = se(() => {
    var N, E;
    if (i) {
      if (i.kind === "confirm") {
        const j = i.options;
        j.suppressKey && s && localStorage.setItem(j.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((E = (N = c.current) == null ? void 0 : N.value) == null ? void 0 : E.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), C = i !== null;
  ae(() => {
    if (!C) return;
    const N = (E) => {
      E.key !== "Enter" || E.shiftKey || E.metaKey || E.ctrlKey || E.altKey || E.isComposing || (E.preventDefault(), E.stopImmediatePropagation(), D());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [C, D]);
  const w = se(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ A(Es.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    C && /* @__PURE__ */ h(
      ea,
      {
        open: !0,
        onClose: w,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ A(at, { children: [
          i.kind !== "alert" && /* @__PURE__ */ h(xr, { variant: "ghost", onClick: w, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ h(xr, { onClick: D, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ h(
            xr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: D,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ h(xr, { "data-modal-confirm": !0, onClick: D, children: "Save" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ h("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ h(
            Hc,
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
const ia = 500, oa = 250, sa = 5, _t = 88, ho = 4;
function la(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function ca({ x: n, y: e, ms: t }) {
  const r = v(null), i = Vn();
  return ae(() => {
    r.current && la(r.current, t);
  }, [t]), Jr(
    /* @__PURE__ */ h(
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
          /* @__PURE__ */ h(
            "circle",
            {
              cx: _t / 2,
              cy: _t / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: ho + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ h(
            "circle",
            {
              cx: _t / 2,
              cy: _t / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: ho,
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
function Fh() {
  return { "data-no-longpress": "true" };
}
function aa(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Bh({
  children: n,
  showRing: e = !0,
  longPressMs: t = ia,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = re(null), c = Ri(), a = v(null), u = v(null), d = v({ x: 0, y: 0, target: null }), f = v(!1), p = Math.min(oa, t * 0.5), m = v(i);
  m.current = i;
  const g = v(o);
  return g.current = o, ae(() => {
    if (!Be || !c) return;
    const b = (w) => {
      if (!yi(w.pointerType) || w.button !== 0) return;
      const N = w.target;
      if (!N.closest(r) || (m.current ? !m.current(N) : aa(N))) return;
      const E = w.clientX, j = w.clientY;
      d.current = { x: E, y: j, target: w.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: E, y: j }), p)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const U = d.current.target;
        if (!U) return;
        const R = g.current;
        if (R) {
          R(U, E, j);
          return;
        }
        const q = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: E,
          clientY: j,
          button: 2,
          view: window
        });
        U.dispatchEvent(q);
      }, t);
    }, x = (w) => {
      if (!f.current || a.current === null) return;
      const N = w.clientX - d.current.x, E = w.clientY - d.current.y;
      Math.sqrt(N * N + E * E) > sa && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, D = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, C = (w) => {
      yi(w.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", b), c.addEventListener("pointermove", x), c.addEventListener("pointerup", D), c.addEventListener("pointercancel", D), c.addEventListener("pointerleave", C), () => {
      c.removeEventListener("pointerdown", b), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", D), c == null || c.removeEventListener("pointercancel", D), c == null || c.removeEventListener("pointerleave", C), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, p, r]), /* @__PURE__ */ A(at, { children: [
    n,
    e && s && /* @__PURE__ */ h(ca, { x: s.x, y: s.y, ms: t - p })
  ] });
}
function Hh() {
  const n = Nc();
  return Sc ? n === null || yi(n) : !1;
}
const ua = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, da = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, fa = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function _h({
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
        ...e ? fa : n ? da : ua,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const ha = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], pa = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], si = 1900, li = 2100;
function ma(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function ga(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function jh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Qt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", c = /* @__PURE__ */ new Date(), a = (() => {
    if (!o) return c;
    const $ = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN($.getTime()) ? c : $;
  })(), [u, d] = re(a.getFullYear()), [f, p] = re(a.getMonth()), [m, g] = re("days"), [b, x] = re(null), D = ot(() => new Set(n), [n]), C = ($) => {
    D.has($) ? e(n.filter((Y) => Y !== $)) : e([...n, $]);
  }, w = ot(() => {
    const $ = ma(u, f), Y = new Date(u, f, 1).getDay(), Ie = [];
    for (let Te = 0; Te < Y; Te++) Ie.push({ key: `pad-${Te}`, day: 0, empty: !0 });
    for (let Te = 1; Te <= $; Te++) Ie.push({ key: ga(u, f, Te), day: Te, empty: !1 });
    return Ie;
  }, [u, f]), N = ($) => d((Y) => Math.max(si, Math.min(li, Y + $))), E = ($) => {
    f + $ < 0 ? (d((Y) => Math.max(si, Y - 1)), p(11)) : f + $ > 11 ? (d((Y) => Math.min(li, Y + 1)), p(0)) : p((Y) => Y + $);
  }, j = () => {
    if (b === null) return;
    const $ = parseInt(b, 10);
    !isNaN($) && $ >= si && $ <= li && d($), x(null);
  }, U = ($) => n.some((Y) => Y.startsWith(`${u}-${String($ + 1).padStart(2, "0")}`)), R = je(), q = O(4, 8, R), k = O(16, 20, R), L = O(10, 11, R), H = O(6, 8, R), K = O(12, 14, R), J = O(6, 10, R), I = O(12, 14, R), X = O(8, 12, R), Q = O(10, 12, R), Z = O(6, 10, R), le = O(2, 6, R), M = O(64, 80, R), ce = { padding: q }, be = { width: k, height: k }, Se = { fontSize: L, paddingTop: H, paddingBottom: H }, xe = { fontSize: K, paddingTop: J, paddingBottom: J }, ne = { fontSize: I, paddingTop: X, paddingBottom: X }, ye = { fontSize: Q, padding: `${le}px ${Z}px` }, ie = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", F = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ A("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(-1) : E(-1),
          style: ce,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ h(Jo, { style: be })
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
          onChange: ($) => x($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: j,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), j()), $.key === "Escape" && x(null);
          },
          style: { width: M },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(1) : E(1),
          style: ce,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ h(Ar, { style: be })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ h("div", { className: "grid grid-cols-3 text-center", children: pa.map(($, Y) => /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => {
            p(Y), g("days");
          },
          style: ne,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${Y === f ? ie : F}`,
          children: [
            $,
            U(Y) && /* @__PURE__ */ h("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${Y === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ h("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => {
            d(c.getFullYear()), p(c.getMonth()), g("days");
          },
          style: { paddingTop: J, paddingBottom: J, fontSize: K },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ A("div", { className: "grid grid-cols-7 text-center", children: [
      ha.map(($) => /* @__PURE__ */ h("div", { style: Se, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: $ }, $)),
      w.map(($) => $.empty ? /* @__PURE__ */ h("div", {}, $.key) : /* @__PURE__ */ h(
        "button",
        {
          type: "button",
          onClick: () => C($.key),
          style: xe,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${D.has($.key) ? ie : F}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ A("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ A("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ h("div", { className: "flex flex-wrap gap-1", children: n.map(($) => {
        const Y = /* @__PURE__ */ new Date($ + "T00:00:00"), Ie = Y.getFullYear() === c.getFullYear() ? Y.toLocaleString("default", { month: "short", day: "numeric" }) : Y.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            onClick: () => C($),
            "aria-label": `Remove ${Ie}`,
            style: ye,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Ie,
              /* @__PURE__ */ h("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function Wh({
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
  const p = (w) => e instanceof Set ? e.has(w) : e.includes(w), m = je(), g = O(12, 16, m), b = O(8, 12, m), x = O(12, 14, m), D = O(16, 20, m), C = r != null || i != null;
  return /* @__PURE__ */ A("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    C && /* @__PURE__ */ A("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ h("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((w) => {
            const N = p(w.id), E = /* @__PURE__ */ h(zi, { checked: N, size: D });
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(w.id),
                "aria-pressed": N,
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: x },
                ...w.dataProps,
                children: [
                  u === "leading" && E,
                  w.leading != null && /* @__PURE__ */ h("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ h("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ h("span", { className: "ui-checklist-secondary", children: w.secondary }),
                  u === "trailing" && /* @__PURE__ */ h("span", { className: "ml-auto flex shrink-0", children: E })
                ]
              },
              w.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ h("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function qh({
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
  const u = je(), d = s ? 10 : O(12, 16, u), f = s ? 6 : O(8, 12, u), p = s ? 12 : O(12, 14, u), m = s ? 14 : O(16, 20, u);
  return /* @__PURE__ */ A("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ h("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ h("span", { className: "ui-checklist-title", children: r }) }),
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
const Kh = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = cr(), { refs: l, floatingStyles: c } = nc({
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
          var D;
          if (i !== "visible") return {};
          const u = (D = a.elements.floating.ownerDocument) == null ? void 0 : D.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), p = Math.max(d.y, 0), m = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (m <= f || g <= p) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? p - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + b, y: a.y + x };
        }
      },
      Vo(o),
      Yo({ padding: 8 }),
      Uo({ padding: 8 }),
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
    whileElementsMounted: rc
  });
  return et(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ A(at, { children: [
    !t && /* @__PURE__ */ h("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Jr(
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
function ya(n, e) {
  if (!e || !ct.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const zn = ({ content: n, children: e }) => {
  const t = Qt(), r = je(), i = O(10, 12, r), o = O(6, 6, r), s = O(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, c = Vn(), a = cr(), [u, d] = re(!1), [f, p] = re({ x: 0, y: 0 }), m = v(null), g = v(null), b = () => {
    if (!m.current) return;
    const C = m.current.getBoundingClientRect();
    p({ x: C.left + C.width / 2, y: C.top });
  };
  ae(() => () => {
    g.current && clearTimeout(g.current);
  }, []), ae(() => (u && a && (b(), a.addEventListener("scroll", b, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", b, !0)), [u]), ae(() => {
    var N;
    if (!u) return;
    const C = ((N = m.current) == null ? void 0 : N.ownerDocument) ?? document, w = (E) => {
      m.current && !m.current.contains(E.target) && d(!1);
    };
    return C.addEventListener("pointerdown", w, !0), () => C.removeEventListener("pointerdown", w, !0);
  }, [u]);
  const x = ya(e, n), D = Object.keys(x).length > 0 ? ct.cloneElement(e, x) : e;
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
        D,
        u && Jr(
          /* @__PURE__ */ A(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((C, w) => /* @__PURE__ */ h("div", { className: w > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: C }, w)),
                /* @__PURE__ */ h("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          c ?? document.body
        )
      ]
    }
  );
}, xa = 250;
function ba(n, e, t) {
  const [r, i] = ct.useState(null), [o, s] = ct.useState(!1), l = ct.useRef(null), c = ct.useRef(t);
  c.current = t;
  const a = ct.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  ct.useLayoutEffect(() => {
    a();
  }, [t, a]), ct.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), xa), a();
    }, p = new ResizeObserver(f);
    p.observe(d);
    for (const m of e.current ?? []) m && p.observe(m);
    return () => {
      p.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
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
function Qr() {
  const n = je(), e = Be, t = e ? O(28, 40, n) : 28, r = e ? O(28, 40, n) : 28, i = e ? O(10, 14, n) : 10, o = e ? O(10, 14, n) : 10, s = e ? O(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Jh = Be ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", va = Be ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", br = Be ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", wa = "hover:bg-red-950/50", Vh = Be ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Yh = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", Uh = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ka = Be ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Xh = Be ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", Ms = Be ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Sa = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", Na = Be ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", vr = ({ onClick: n, disabled: e, title: t, className: r = va, children: i }) => {
  const o = Qr();
  return /* @__PURE__ */ h(zn, { content: t, children: /* @__PURE__ */ h("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, wr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, Gh = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c, tablist: a, iconCollapse: u = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const p = Qt(), m = c ?? Dc(p), g = c === "blue" || c === "emerald" ? c : (p == null ? void 0 : p.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, x = Qr(), D = je(), C = s && !Be ? 24 : x.control.height, w = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), N = Be ? w : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, E = (k) => i ? i(k) : n === k, j = ct.useRef(null), U = ct.useRef([]), R = Math.max(0, e.findIndex((k) => E(k.v))), q = ba(j, U, R);
  return l === "track" ? /* @__PURE__ */ A(
    "div",
    {
      ref: j,
      role: a ? "tablist" : "group",
      "aria-label": f,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${Be ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${wr.wrap}`,
      children: [
        q.style && /* @__PURE__ */ h(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${wr.pill} ${q.motionClass}`,
            style: { ...q.style, top: 2, bottom: 2 }
          }
        ),
        e.map((k, L) => {
          const H = E(k.v), K = u && !!k.icon;
          return /* @__PURE__ */ h(
            "button",
            {
              ref: (J) => {
                U.current[L] = J;
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
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${K ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${H ? wr.active : wr.idle}`,
              children: /* @__PURE__ */ h(
                gs,
                {
                  icon: k.icon,
                  collapse: K,
                  iconWithLabel: d,
                  active: H,
                  gap: O(6, 8, D),
                  children: k.l
                }
              )
            },
            k.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ A("div", { ref: j, className: `relative ${Sa} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    q.style && /* @__PURE__ */ h(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${q.motionClass}`,
        style: { ...q.style, top: 0, bottom: 0 }
      }
    ),
    e.map((k, L) => {
      const H = E(k.v);
      return /* @__PURE__ */ A(
        "button",
        {
          ref: (K) => {
            U.current[L] = K;
          },
          ...k.dataProps,
          disabled: r,
          onClick: () => t(k.v),
          title: k.title,
          style: { ...x.control, height: C },
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
}, Qh = ({ children: n }) => /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ h("span", { className: Be ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ h("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Ta = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Ca = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Zh = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ A("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ h("span", { className: t ? Ta : Ca, children: n }),
  e
] }), ep = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ h("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), tp = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ A("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ h(vr, { onClick: () => r(-1), disabled: n, title: "Move up", className: br, children: /* @__PURE__ */ h(Jl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(vr, { onClick: () => r(1), disabled: n, title: "Move down", className: br, children: /* @__PURE__ */ h(Vl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h(vr, { onClick: e, disabled: n, title: "Duplicate", className: br, children: /* @__PURE__ */ h(qo, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ h("div", { className: Ms }),
    /* @__PURE__ */ h(vr, { onClick: t, disabled: n, title: "Delete", className: `${br} ${wa}`, children: /* @__PURE__ */ h(gi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var po = Object.defineProperty, Ea = (n, e) => {
  let t = {};
  for (var r in n) po(t, r, {
    get: n[r],
    enumerable: !0
  });
  return po(t, Symbol.toStringTag, { value: "Module" }), t;
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
function Rs(n, e, t) {
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
      return c && c < s.length && c < l.length && $s(s.charCodeAt(c - 1)) && As(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = Rs(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Is(n, e, t, r) {
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
      return d && f && d < a.length && $s(a.charCodeAt(d - 1)) && As(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = Is(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function As(n) {
  return n >= 56320 && n < 57344;
}
function $s(n) {
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
    return Rs(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Is(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return kr(0, e);
    if (e == this.size)
      return kr(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? kr(t + 1, o) : kr(t, r);
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
const ci = { index: 0, offset: 0 };
function kr(n, e) {
  return ci.index = n, ci.offset = e, ci;
}
function Lr(n, e) {
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
      if (!Lr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Lr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ue = class vi {
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
    return this == e || this.type == e.type && Lr(this.attrs, e.attrs);
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
      return vi.none;
    if (e instanceof vi)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Ue.none = [];
class nr extends Error {
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
    let r = zs(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new de(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new de(Ds(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
function Ds(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Ds(o.content, e - i - 1, t - i - 1)));
}
function zs(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = zs(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function Ma(n, e, t) {
  if (t.openStart > n.depth)
    throw new nr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new nr("Inconsistent open depths");
  return Ps(n, e, t, 0);
}
function Ps(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Ps(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Nn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Ra(t, n);
      return Nn(o, Os(n, s, l, e, r));
    }
  else return Nn(o, Or(n, e, r));
}
function Ls(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new nr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function wi(n, e, t) {
  let r = n.node(t);
  return Ls(r, e.node(t)), r;
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
    throw new nr("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Os(n, e, t, r, i) {
  let o = n.depth > i && wi(n, e, i + 1), s = r.depth > i && wi(t, r, i + 1), l = [];
  return Zn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Ls(o, s), Sn(Nn(o, Os(n, e, t, r, i + 1)), l)) : (o && Sn(Nn(o, Or(n, e, i + 1)), l), Zn(e, t, i, l), s && Sn(Nn(s, Or(t, r, i + 1)), l)), Zn(r, null, i, l), new W(l);
}
function Or(n, e, t) {
  let r = [];
  if (Zn(null, n, t, r), n.depth > t) {
    let i = wi(n, e, t + 1);
    Sn(Nn(i, Or(n, e, t + 1)), r);
  }
  return Zn(e, null, t, r), new W(r);
}
function Ra(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(W.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class rr {
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
        return new Fr(this, e, r);
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
    return new rr(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = mo.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      mo.set(e, r = new Ia());
    let i = r.elts[r.i] = rr.resolve(e, t);
    return r.i = (r.i + 1) % Aa, i;
  }
}
class Ia {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Aa = 12, mo = /* @__PURE__ */ new WeakMap();
class Fr {
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
const $a = /* @__PURE__ */ Object.create(null);
let Hn = class ki {
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
    return this.type == e && Lr(this.attrs, t || e.defaultAttrs || $a) && Ue.sameSet(this.marks, r || Ue.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new ki(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new ki(this.type, this.attrs, this.content, e);
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
    return Ma(this.resolve(e), this.resolve(t), r);
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
    return rr.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return rr.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Fs(this.marks, e);
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
    this.type.checkContent(this.content), go(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ue.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      go(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
Hn.prototype.text = void 0;
class Br extends Hn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Fs(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Br(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Br(this.type, this.attrs, e, this.marks);
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
function Fs(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function go(n, e, t, r) {
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
    let r = new Da(e, t);
    if (r.next == null)
      return Cn.empty;
    let i = Bs(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ha(Ba(i));
    return _a(o, r), o;
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
Cn.empty = new Cn(!0);
class Da {
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
function Bs(n) {
  let e = [];
  do
    e.push(za(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function za(n) {
  let e = [];
  do
    e.push(Pa(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Pa(n) {
  let e = Fa(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = La(n, e);
    else
      break;
  return e;
}
function yo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function La(n, e) {
  let t = yo(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = yo(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Oa(n, e) {
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
function Fa(n) {
  if (n.eat("(")) {
    let e = Bs(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Oa(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Ba(n) {
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
function Hs(n, e) {
  return e - n;
}
function xo(n, e) {
  let t = [];
  return r(e), t.sort(Hs);
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
function Ha(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(xo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        xo(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Cn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Hs);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function _a(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function _s(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function js(n, e) {
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
function Ws(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Wa(n, r, e[r]);
  return t;
}
class Hr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Ws(e, r.attrs), this.defaultAttrs = _s(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return !e && this.defaultAttrs ? this.defaultAttrs : js(this.attrs, e);
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
    return new Hn(this, this.computeAttrs(e), W.from(t), Ue.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = W.from(t), this.checkContent(t), new Hn(this, this.computeAttrs(e), t, Ue.setFrom(r));
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
    return o ? new Hn(this, e, t.append(o), Ue.setFrom(r)) : null;
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
    e.forEach((o, s) => r[o] = new Hr(o, t, s));
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
function ja(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Wa {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? ja(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Zr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Ws(e, i.attrs), this.excluded = null;
    let o = _s(this.attrs);
    this.instance = o ? new Ue(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ue(this, js(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Zr(o, i++, t, s)), r;
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
class qa {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = wt.from(e.nodes), t.marks = wt.from(e.marks || {}), this.nodes = Hr.compile(this.spec.nodes, this), this.marks = Zr.compile(this.spec.marks, this);
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
      o.markSet = l == "_" ? null : l ? bo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : bo(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Hn.fromJSON(this, i), this.markFromJSON = (i) => Ue.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Hr) {
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
    return new Br(r, r.defaultAttrs, e, Ue.setFrom(t));
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
function bo(n, e) {
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
function Ka(n) {
  return n.tag != null;
}
function Ja(n) {
  return n.style != null;
}
class _n {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Ka(i))
        this.tags.push(i);
      else if (Ja(i)) {
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
    let r = new wo(this, t, !1);
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
    let r = new wo(this, t, !0);
    return r.addAll(e, Ue.none, t.from, t.to), de.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ua(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = ko(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = ko(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new _n(e, _n.schemaRules(e)));
  }
}
const qs = {
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
}, Va = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Ks = { ol: !0, ul: !0 }, ir = 1, Si = 2, er = 4;
function vo(n, e, t) {
  return e != null ? (e ? ir : 0) | (e === "full" ? Si : 0) : n && n.whitespace == "pre" ? ir | Si : t & ~er;
}
class Sr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ue.none, this.match = o || (s & er ? null : e.contentMatch);
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
    if (!(this.options & ir)) {
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
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !qs.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class wo {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = vo(null, t.preserveWhitespace, 0) | (r ? er : 0);
    i ? o = new Sr(i.type, i.attrs, Ue.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Sr(null, null, Ue.none, !0, null, s) : o = new Sr(e.schema.topNodeType, null, Ue.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Si ? "full" : this.localPreserveWS || (i.options & ir) > 0, { schema: s } = this.parser;
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
    Ks.hasOwnProperty(s) && this.parser.normalizeLists && Ya(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Va.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (qs.hasOwnProperty(s))
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
        (o.type ? o.type.allowsMarkType(l.type) : So(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = vo(e, o, s.options);
    s.options & er && s.content.length == 0 && (l |= er);
    let c = Ue.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : So(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new Sr(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= ir);
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
function Ya(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Ks.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ua(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function ko(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function So(n, e) {
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
const Js = 65535, Vs = Math.pow(2, 16);
function Xa(n, e) {
  return n + e * Vs;
}
function No(n) {
  return n & Js;
}
function Ga(n) {
  return (n - (n & Js)) / Vs;
}
const Ys = 1, Us = 2, Mr = 4, Xs = 8;
class Ni {
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
    return (this.delInfo & Xs) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Ys | Mr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Us | Mr)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Mr) > 0;
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
    let t = 0, r = No(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Ga(e);
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
        let m = e == (t < 0 ? c : d) ? null : Xa(l / 3, e - c), g = e == c ? Us : e == d ? Ys : Mr;
        return (t < 0 ? e != c : e != d) && (g |= Xs), new Ni(p, g, m);
      }
      i += u - a;
    }
    return r ? e + i : new Ni(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = No(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
class _r {
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
    return new _r(this._maps, this.mirror, e, t);
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
    let e = new _r();
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
    return r ? e : new Ni(e, i, null);
  }
}
const ai = /* @__PURE__ */ Object.create(null);
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
    let r = ai[t.stepType];
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
    if (e in ai)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ai[e] = t, t.prototype.jsonID = e, t;
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
      if (o instanceof nr)
        return dt.fail(o.message);
      throw o;
    }
  }
}
function Wi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Wi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return W.fromArray(r);
}
class hn extends Ct {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new de(Wi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
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
Ct.jsonID("addMark", hn);
class Jt extends Ct {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new de(Wi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
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
Ct.jsonID("removeNodeMark", En);
class ut extends Ct {
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
Ct.jsonID("replace", ut);
class pt extends Ct {
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
Ct.jsonID("replaceAround", pt);
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
function Qa(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), p = Math.min(a + c.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = p : i.push(s = new Jt(f, p, d[g])));
      l && l.to == f ? l.to = p : o.push(l = new hn(f, p, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function Za(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Zr) {
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
function qi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new ut(l, u, de.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new Jt(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, p = /\r?\n|\r/g, m;
        for (; f = p.exec(a.text); )
          m || (m = new de(W.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new ut(l + f.index, l + f.index + f[0].length, m));
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
function eu(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Un(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !eu(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function tu(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = W.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = W.from(r.node(m).copy(u)), d++) : c--;
  let f = W.empty, p = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = W.from(i.node(m).copy(f)), p++) : a++;
  n.step(new pt(c, a, s, l, new de(u.append(f), d, p), u.size - d, !0));
}
function Gs(n, e, t = null, r = n) {
  let i = nu(n, e), o = i && ru(r, e);
  return o ? i.map(To).concat({ type: e, attrs: t }).concat(o.map(To)) : null;
}
function To(n) {
  return { type: n, attrs: null };
}
function nu(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function ru(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function iu(n, e, t) {
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
function ou(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && su(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let p = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        p && !m ? a = !1 : !p && m && (a = !0);
      }
      a === !1 && Zs(n, s, l, o), qi(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new pt(d, f, d + 1, f - 1, new de(W.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && Qs(n, s, l, o), !1;
    }
  });
}
function Qs(n, e, t, r) {
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
function Zs(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function su(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function lu(n, e, t, r, i) {
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
function cu(n, e, t = 1, r) {
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
  return el(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function au(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function el(n, e) {
  return !!(n && e && !n.isLeaf && au(n, e));
}
function ei(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && el(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function uu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Zs(n, u.node(), u.before(), l);
  }
  s.inlineContent && qi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new ut(a, c.map(e + t, -1), de.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    Qs(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function du(n, e, t) {
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
function ti(n, e, t = e, r = de.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return tl(i, o, r) ? new ut(e, t, r) : new fu(i, o, r).fit();
}
function tl(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class fu {
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
        r ? (o = ui(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
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
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ui(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new de(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = ui(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new de(Gn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new de(Gn(e, t, 1), t, r);
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
      a++, (a > 1 || c == 0 || g.content.size) && (d = b, u.push(nl(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? p : -1)));
    }
    let m = a == l.childCount;
    m || (p = -1), this.placed = Qn(this.placed, t, W.from(u)), this.frontier[t].match = d, m && p < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < p; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? de.empty : new de(Gn(s.content, e - 1, 1), e - 1, p < 0 ? s.openEnd : e - 1) : new de(Gn(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !di(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = di(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = di(e, l, a, c, !0);
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
    i.match = i.match.matchType(e), this.placed = Qn(this.placed, this.depth, W.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(W.empty, !0);
    t.childCount && (this.placed = Qn(this.placed, this.frontier.length, t));
  }
}
function Gn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Gn(n.firstChild.content, e - 1, t)));
}
function Qn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Qn(n.lastChild.content, e - 1, t)));
}
function ui(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function nl(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, nl(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(W.empty, !0)))), n.copy(r);
}
function di(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !hu(t, o.content, s) ? l : null;
}
function hu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function pu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function mu(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (tl(i, o, r))
    return n.step(new ut(e, t, r));
  let s = il(i, o);
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
    let p = a[f], m = pu(p.type);
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
        let D = i.node(b - 1), C = i.index(b - 1);
        if (D.canReplaceWith(C, C, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new de(rl(r.content, 0, r.openStart, p), p, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let p = s[f];
    p < 0 || (e = i.before(p), t = o.after(p));
  }
}
function rl(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(rl(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(W.empty, !0));
  }
  return n;
}
function gu(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = du(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new de(W.from(r), 0, 0));
}
function yu(n, e, t) {
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
  let o = il(r, i);
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
function il(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class jn extends Ct {
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
Ct.jsonID("attr", jn);
class or extends Ct {
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
    return new or(this.attr, e.attrs[this.attr]);
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
    return new or(t.attr, t.value);
  }
}
Ct.jsonID("docAttr", or);
let qn = class extends Error {
};
qn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
qn.prototype = Object.create(Error.prototype);
qn.prototype.constructor = qn;
qn.prototype.name = "TransformError";
class xu {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new _r();
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
      throw new qn(t.failed);
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
    let i = ti(this.doc, e, t, r);
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
    return mu(this, e, t, r), this;
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
    return gu(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return yu(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return tu(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return uu(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return iu(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return ou(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return lu(this, e, t, r, i), this;
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
    return this.step(new or(e, t)), this;
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
    return cu(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Qa(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Za(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return qi(this, e, t, r), this;
  }
}
const fi = /* @__PURE__ */ Object.create(null);
class st {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new bu(e.min(t), e.max(t))];
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
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? de.empty : t), l == 0 && Mo(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), Mo(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Pt(e) : Pn(e.node(0), e.parent, e.pos, e.index(), t, r);
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
    let r = fi[t.type];
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
    if (e in fi)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return fi[e] = t, t.prototype.jsonID = e, t;
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
class bu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Co = !1;
function Eo(n) {
  !Co && !n.parent.inlineContent && (Co = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Pt extends st {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Eo(e), Eo(t), super(e, t);
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
    return new ni(this.anchor, this.head);
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
class ni {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ni(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Pt.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Xe extends st {
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
    return r ? st.near(o) : new Xe(o);
  }
  content() {
    return new de(W.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Xe && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Ki(this.anchor);
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
st.jsonID("node", Xe);
class Ki {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ni(r, r) : new Ki(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Xe.isSelectable(r) ? new Xe(t) : st.near(t);
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
    return vu;
  }
}
st.jsonID("all", Vt);
const vu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Vt(n);
  }
};
function Pn(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Pt.create(n, t);
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
function Mo(n, e, t) {
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
function Ro(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Nr {
  constructor(e, t, r) {
    this.name = e, this.init = Ro(t.init, r), this.apply = Ro(t.apply, r);
  }
}
new Nr("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new Nr("selection", {
  init(n, e) {
    return n.selection || st.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new Nr("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new Nr("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const ol = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function sl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const ll = (n, e, t) => {
  let r = sl(n, t);
  if (!r)
    return !1;
  let i = Ji(r);
  if (!i) {
    let s = r.blockRange(), l = s && Un(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (gl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Kn(o, "end") || Xe.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = ti(n.doc, r.before(s), r.after(s), de.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection(Kn(o, "end") ? st.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : Xe.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, wu = (n, e, t) => {
  let r = sl(n, t);
  if (!r)
    return !1;
  let i = Ji(r);
  return i ? cl(n, i, e) : !1;
}, ku = (n, e, t) => {
  let r = ul(n, t);
  if (!r)
    return !1;
  let i = Vi(r);
  return i ? cl(n, i, e) : !1;
};
function cl(n, e, t) {
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
  let a = ti(n.doc, o, c, de.empty);
  if (!a || a.from != o || a instanceof ut && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Pt.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Kn(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const al = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Ji(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Xe.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Xe.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Ji(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function ul(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const dl = (n, e, t) => {
  let r = ul(n, t);
  if (!r)
    return !1;
  let i = Vi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (gl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Kn(o, "start") || Xe.isSelectable(o))) {
    let s = ti(n.doc, r.before(), r.after(), de.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Kn(o, "start") ? st.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Xe.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, fl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Vi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Xe.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Xe.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Vi(n) {
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
const Su = (n, e) => {
  let t = n.selection, r = t instanceof Xe, i;
  if (r) {
    if (t.node.isTextblock || !Mn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = ei(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Xe.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Nu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Xe) {
    if (t.node.isTextblock || !Mn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ei(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Tu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Un(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, hl = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Yi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Cu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Yi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(st.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, pl = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Vt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Yi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Pt.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, ml = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (on(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Un(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function Eu(n) {
  return (e, t) => {
    if (e.selection instanceof Xe && e.selection.node.isBlock) {
      let { $from: p } = e.selection;
      return !p.parentOffset || !on(e.doc, p.pos) ? !1 : (t && t(e.tr.split(p.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Pt || e.selection instanceof Vt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let p = i.depth; ; p--)
      if (i.node(p).isBlock) {
        a = i.end(p) == i.pos + (i.depth - p), u = i.start(p) == i.pos - (i.depth - p), c = Yi(i.node(p - 1).contentMatchAt(i.indexAfter(p - 1))), s.unshift(a && c ? { type: c } : null), l = p;
        break;
      } else {
        if (p == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = on(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = on(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let p = r.mapping.slice(o), m = p.map(i.before(l)), g = r.doc.resolve(m);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(p.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Mu = Eu(), Ru = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Xe.create(n.doc, i))), !0);
};
function Iu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Mn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function gl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && Iu(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let p = e.pos + o.nodeSize, m = W.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = W.from(s[x].create(null, m));
      m = W.from(i.copy(m));
      let g = n.tr.step(new pt(e.pos - 1, p, e.pos, p, new de(m, 1, 0), s.length, !0)), b = g.doc.resolve(p + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Mn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : st.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Un(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && Kn(o, "start", !0) && Kn(i, "end")) {
    let p = i, m = [];
    for (; m.push(p), !p.isTextblock; )
      p = p.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (p.canReplace(p.childCount, p.childCount, g.content)) {
      if (t) {
        let x = W.empty;
        for (let C = m.length - 1; C >= 0; C--)
          x = W.from(m[C].copy(x));
        let D = n.tr.step(new pt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new de(x, m.length, 0), 0, !0));
        t(D.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function yl(n) {
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
const Au = yl(-1), $u = yl(1);
function Du(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Gs(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Io(n, e = null) {
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
function Ui(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Ui(ol, ll, al);
Ui(ol, dl, fl);
Ui(hl, pl, ml, Mu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function zu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Pu(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Pu(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Fr(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Fr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Gs(o, t, r, e);
  return l ? (n && Lu(n, e, l, i, t), !0) : !1;
}
function Lu(n, e, t, r, i) {
  let o = W.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = W.from(t[u].type.create(t[u].attrs, o));
  n.step(new pt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new de(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && on(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function Ou(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Fu(e, t, n, o) : Bu(e, t, o) : !0 : !1;
  };
}
function Fu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new pt(o - 1, s, o, s, new de(W.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Fr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Un(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Mn(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Bu(n, e, t) {
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
  return r.step(new pt(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new de((l ? W.empty : W.from(i.copy(W.empty))).append(c ? W.empty : W.from(i.copy(W.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Hu(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = W.from(a ? n.create() : null), d = new de(W.from(n.create(null, W.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, p = o.end;
      t(e.tr.step(new pt(f - (a ? 3 : 1), p, f, p, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function xl(n) {
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
var _u = class bl {
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
    const e = bl.createFakeChain();
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
      state: xl({
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
const ju = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Wu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), qu = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), p = d.blockRange(f);
      if (!p) return;
      const m = Un(p);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(p.start, g);
      }
      (m || m === 0) && e.lift(p, m);
    });
  }), !0;
}, Ku = (n) => (e) => n(e), Ju = () => ({ state: n, dispatch: e }) => pl(n, e), Vu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Wt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Yu = () => ({ tr: n, dispatch: e }) => {
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
const Uu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Tt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Xu = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Gu = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Ao = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Gu(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Qu = (n, e, t) => ({
  from: Ao(n, t, "left"),
  to: Ao(e, t, "right")
}), Zu = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = Qu(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Wt.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, ed = () => ({ commands: n }) => n.keyboardShortcut("Enter"), td = () => ({ state: n, dispatch: e }) => Cu(n, e);
function nd(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function jr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : nd(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function vl(n, e, t = {}) {
  return n.find((r) => r.type === e && jr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function $o(n, e, t = {}) {
  return !!vl(n, e, t);
}
function wl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!vl([...r.node.marks], e, t)) return;
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
const rd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = bn(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = wl(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Wt.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, id = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function kl(n) {
  return n instanceof Wt;
}
function kn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function od(n, e = null) {
  if (!e) return null;
  const t = Fn.atStart(n), r = Fn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Wt.create(n, kn(0, i, o), kn(n.content.size, i, o)) : Wt.create(n, kn(e, i, o), kn(e, i, o));
}
function Do() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Wr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function sd() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const ld = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Wr() || Do()) && r.dom.focus(), sd() && !Wr() && !Do() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !kl(t.state.selection))
    return s(), !0;
  const l = od(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, cd = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), ad = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), Sl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Sl(r);
  }
  return n;
};
function Tr(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Sl(t);
}
function Nl(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Jn(n, e, t) {
  if (Nl(n)) return n;
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
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Jn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new qa({
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
      if (t.slice ? _n.fromSchema(c).parseSlice(Tr(n), t.parseOptions) : _n.fromSchema(c).parse(Tr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = _n.fromSchema(e);
    return t.slice ? o.parseSlice(Tr(n), t.parseOptions).content : o.parse(Tr(n), t.parseOptions);
  }
  return Jn("", e, t);
}
function Tl(n) {
  return !("type" in n);
}
function Cl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof ut || i instanceof pt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Fn.near(n.doc.resolve(s), t));
}
const ud = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
    const m = Tl(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, p = p ? b.isBlock : !1;
    }), u === d && p) {
      const { parent: b } = r.doc.resolve(u);
      b.isTextblock && !b.type.spec.code && !b.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : Nl(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = W.from(m);
      const b = r.doc.resolve(u), x = b.node(), D = b.parentOffset === 0, C = x.isText || x.isTextblock, w = x.content.size > 0;
      D && C && w && p && (u = Math.max(0, u - 1)), r.replaceWith(u, d, m);
    }
    t.updateSelection && Cl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function El(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const dd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = El(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([p]) => u.includes(p))) : {};
  let f;
  if (s) {
    const p = Jn(s, r.schema);
    f = a.createAndFill(d, p);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && Cl(e, e.steps.length - 1, -1)), !0) : !1;
}, fd = () => ({ state: n, dispatch: e }) => Su(n, e), hd = () => ({ state: n, dispatch: e }) => Nu(n, e), pd = () => ({ state: n, dispatch: e }) => ll(n, e), md = () => ({ state: n, dispatch: e }) => dl(n, e), gd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ei(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, yd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ei(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, xd = () => ({ state: n, dispatch: e }) => wu(n, e), bd = () => ({ state: n, dispatch: e }) => ku(n, e);
function Ml() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function vd(n) {
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
      Wr() || Ml() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const wd = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = vd(n).split(/-(?!$)/), s = o.find((a) => ![
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
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => jr(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const kd = (n, e = {}) => ({ state: t, dispatch: r }) => Xi(t, Tt(n, t.schema), e) ? Tu(t, r) : !1, Sd = () => ({ state: n, dispatch: e }) => ml(n, e), Nd = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Ou(r)(e, t);
}, Td = () => ({ state: n, dispatch: e }) => hl(n, e);
function Rl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function zo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Cd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Rl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, zo(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(zo(f.attrs, e))));
      });
    });
  }), c;
}, Ed = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Md = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new ac(n.doc);
    n.setSelection(t);
  }
  return !0;
}, Rd = () => ({ state: n, dispatch: e }) => al(n, e), Id = () => ({ state: n, dispatch: e }) => fl(n, e), Ad = () => ({ state: n, dispatch: e }) => Ru(n, e), $d = () => ({ state: n, dispatch: e }) => $u(n, e), Dd = () => ({ state: n, dispatch: e }) => Au(n, e);
function zd(n, e, t = {}, r = {}) {
  return Jn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Pd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = zd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = Tl(a) ? a.content : [a];
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
function Ld(n, e) {
  const t = bn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Od(n, e) {
  const t = new xu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Fd(n, e) {
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
function Gi(n) {
  return (e) => Fd(e.$from, n);
}
function sr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? sr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? sr(n.parent, e, t) : null
  }) : n.config[e];
}
function Bd(n) {
  return typeof n == "function";
}
function Ci(n, e = void 0, ...t) {
  return Bd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Il(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Hd(n, e, t) {
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
function _d(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function jd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Wd(n) {
  const e = jd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function qd(n) {
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
  }), Wd(r);
}
function Rr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Kd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? bn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => jr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, p = d.pos;
    n.doc.nodesBetween(f, p, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), x = Math.min(p, g + m.nodeSize), D = x - b;
      s += D, l.push(...m.marks.map((C) => ({
        mark: C,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => jr(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function hi(n, e) {
  const { nodeExtensions: t } = Il(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Ci(sr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Al(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Al(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Jd(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (kl(r) && (i = r.$cursor), i) {
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
const Vd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = bn(n, r.schema);
  if (i)
    if (s) {
      const a = Ld(r, c);
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
  return Jd(r, t, c);
}, Yd = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Ud = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Tt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Io(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Io(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Xd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = kn(n, 0, r.content.size), o = Wn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Gd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, Qd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Wt.atStart(r).from, l = Wt.atEnd(r).to, c = kn(i, s, l), a = kn(o, s, l), u = Wt.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, Zd = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Hu(r)(e, t);
};
function Po(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const ef = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = Rr(a, l.node().type.name, l.node().attrs);
  if (o instanceof Wn && o.node.isBlock)
    return !l.parentOffset || !on(s, l.pos) ? !1 : (r && (n && Po(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : El(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let p = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, m = on(e.doc, e.mapping.map(l.pos), 1, p);
  if (!p && !m && on(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, p = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof Wt && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, p), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Po(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, tf = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Tt(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = W.empty;
      const D = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let U = l.depth - D; U >= l.depth - 3; U -= 1) x = W.from(l.node(U).copy(x));
      const C = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, w = {
        ...Rr(d, l.node().type.name, l.node().attrs),
        ...e
      }, N = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(w)) || void 0;
      x = x.append(W.from(s.createAndFill(null, N) || void 0));
      const E = l.before(l.depth - (D - 1));
      t.replace(E, l.after(-C), new de(x, 4 - D, 0));
      let j = -1;
      t.doc.nodesBetween(E, t.doc.content.size, (U, R) => {
        if (j > -1) return !1;
        U.isTextblock && U.content.size === 0 && (j = R + 1);
      }), j > -1 && t.setSelection(Wt.near(t.doc.resolve(j))), t.scrollIntoView();
    }
    return !0;
  }
  const p = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Rr(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Rr(d, l.node().type.name, l.node().attrs),
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
  if (!on(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: D } = r, { splittableMarks: C } = o.extensionManager, w = D || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !w || !i) return !0;
    const N = w.filter((E) => C.includes(E.type.name));
    t.ensureMarks(N);
  }
  return !0;
};
function Lo(n) {
  return !n || n === "1" ? null : n;
}
function $l(n, e) {
  return Lo(n) === Lo(e);
}
const pi = (n, e) => {
  const t = Gi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, t.pos)) || !$l(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, mi = (n, e) => {
  const t = Gi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, r)) || !$l(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function nf(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Wt.between(r, i);
}
const rf = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, p = Tt(n, s.schema), m = Tt(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: D } = g, C = x.blockRange(D), w = b || g.$to.parentOffset && g.$from.marks();
  if (!C) return !1;
  const N = Gi((H) => hi(H.type.name, d))(g), E = g.from === 0 && g.to === s.doc.content.size, j = s.doc.content.content, U = j.length === 1 ? j[0] : null, R = E && U && hi(U.type.name, d) ? {
    node: U,
    pos: 0
  } : null, q = N ?? R, k = !!N && C.depth >= 1 && C.depth - N.depth <= 1, L = !!R;
  if ((k || L) && q) {
    if (q.node.type === p)
      return E && L ? c().command(({ tr: H, dispatch: K }) => {
        const J = nf(H);
        return J ? (H.setSelection(J), K && K(H), !0) : !1;
      }).liftListItem(m).run() : a.liftListItem(m);
    if (hi(q.node.type.name, d) && p.validContent(q.node.content)) return c().command(() => (o.setNodeMarkup(q.pos, p), !0)).command(() => pi(o, p)).command(() => mi(o, p)).run();
  }
  return !t || !w || !l ? c().command(() => u().wrapInList(p, r) ? !0 : a.clearNodes()).wrapInList(p, r).command(() => pi(o, p)).command(() => mi(o, p)).run() : c().command(() => {
    const H = u().wrapInList(p, r), K = w.filter((J) => f.includes(J.type.name));
    return o.ensureMarks(K), H ? !0 : a.clearNodes();
  }).wrapInList(p, r).command(() => pi(o, p)).command(() => mi(o, p)).run();
}, of = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = bn(n, r.schema);
  return Kd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, sf = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Tt(n, r.schema), s = Tt(e, r.schema), l = Xi(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, lf = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Tt(n, t.schema);
  return Xi(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, cf = () => ({ state: n, dispatch: e }) => {
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
}, af = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, uf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = bn(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: p } = s;
    const m = wl(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, p = m.to), t.removeMark(f, p, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, df = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, ff = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Rl(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
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
      })), s && b.marks.length && b.marks.forEach((D) => {
        if (s === D.type && (c = !0, i)) {
          const C = Math.max(x, u), w = Math.min(x + b.nodeSize, d);
          t.addMark(C, w, s.create({
            ...D.attrs,
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
}, hf = new Yt("__tiptap_decorations__"), pf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(hf, {
  type: "force",
  name: n
}), !0), mf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return Du(i, e)(t, r);
}, gf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return zu(i, e)(t, r);
};
var yf = /* @__PURE__ */ Ea({
  blur: () => ju,
  clearContent: () => Wu,
  clearNodes: () => qu,
  command: () => Ku,
  createParagraphNear: () => Ju,
  cut: () => Vu,
  deleteCurrentNode: () => Yu,
  deleteNode: () => Uu,
  deleteRange: () => Xu,
  deleteSelection: () => Zu,
  enter: () => ed,
  exitCode: () => td,
  extendMarkRange: () => rd,
  first: () => id,
  focus: () => ld,
  forEach: () => cd,
  insertContent: () => ad,
  insertContentAt: () => ud,
  insertDefaultBlock: () => dd,
  joinBackward: () => pd,
  joinDown: () => hd,
  joinForward: () => md,
  joinItemBackward: () => gd,
  joinItemForward: () => yd,
  joinTextblockBackward: () => xd,
  joinTextblockForward: () => bd,
  joinUp: () => fd,
  keyboardShortcut: () => wd,
  lift: () => kd,
  liftEmptyBlock: () => Sd,
  liftListItem: () => Nd,
  newlineInCode: () => Td,
  resetAttributes: () => Cd,
  scrollIntoView: () => Ed,
  selectAll: () => Md,
  selectNodeBackward: () => Rd,
  selectNodeForward: () => Id,
  selectParentNode: () => Ad,
  selectTextblockEnd: () => $d,
  selectTextblockStart: () => Dd,
  setContent: () => Pd,
  setMark: () => Vd,
  setMeta: () => Yd,
  setNode: () => Ud,
  setNodeSelection: () => Xd,
  setTextDirection: () => Gd,
  setTextSelection: () => Qd,
  sinkListItem: () => Zd,
  splitBlock: () => ef,
  splitListItem: () => tf,
  toggleList: () => rf,
  toggleMark: () => of,
  toggleNode: () => sf,
  toggleWrap: () => lf,
  undoInputRule: () => cf,
  unsetAllMarks: () => af,
  unsetMark: () => uf,
  unsetTextDirection: () => df,
  updateAttributes: () => ff,
  updateDecorations: () => pf,
  wrapIn: () => mf,
  wrapInList: () => gf
});
typeof process < "u" && process.env.NODE_ENV;
function xf(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Cr(n) {
  return xf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Dl(n, e) {
  const t = { ...n };
  return Cr(n) && Cr(e) && Object.keys(e).forEach((r) => {
    Cr(e[r]) && Cr(n[r]) ? t[r] = Dl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var zl = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Ci(sr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Ci(sr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Dl(this.options, n)
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
}, bf = class Pl extends zl {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Pl(t);
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
}, qt = class Ll extends zl {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Ll(t);
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
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = _d(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => Hd(r, {
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
    return { ...yf };
  }
});
qt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Od(n.before, [n, ...e]);
      qd(c).forEach((u) => {
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
          const m = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), b = a.invert().map(m, -1), x = a.invert().map(g), D = m > 0 ? (f = c.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((w) => w.eq(u.mark)) : !1, C = (p = c.doc.nodeAt(g)) === null || p === void 0 ? void 0 : p.marks.some((w) => w.eq(u.mark));
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
            partial: !!(C || D),
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
const vf = new Yt("focusEvents");
qt.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new ln({
      key: vf,
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
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: p } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : Fn.atStart(a).from === f;
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
    return Wr() || Ml() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Yt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((p) => p.getMeta("composition"))) return;
        const r = n.some((p) => p.docChanged) && !e.doc.eq(t.doc), i = n.some((p) => p.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Fn.atStart(e.doc).from, a = Fn.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !Al(t.doc)) return;
        const u = t.tr, d = xl({
          state: t,
          transaction: u
        }), { commands: f } = new _u({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
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
    const { nodeExtensions: n } = Il(this.extensions);
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
const wf = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), kf = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Sf = /^(https?:\/\/|mailto:)/i;
function Nf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    kf.has(i) && o && e.push(`${i}: ${o}`);
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
  if (!wf.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Sf.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Nf(o || "");
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
function Ol(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Tf(n) {
  const e = Ol(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Ei(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function np(n) {
  const e = Ol(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function rp(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Cf(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Oo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const Ef = { text: "#52525b" }, Mf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? Ef, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ h(
    sc,
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
        b && Wn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new Wn(g))), (x = l.onTokenClick) == null || x.call(l, s, p.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ h("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, Rf = vc.extend({
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
    return oc(Mf);
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
    return ["span", ic({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), If = 240, Af = 280, $f = ({ props: n, onApi: e }) => {
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
  const o = Ur();
  return /* @__PURE__ */ h(ar.Provider, { value: t, children: /* @__PURE__ */ h(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Af, maxHeight: If },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ h("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ h(
        Df,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Df = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Ss({
    label: () => n.label,
    activate: t
  }), s = je(), l = { padding: `${O(8, 12, s)}px ${O(12, 16, s)}px`, fontSize: O(12, 14, s) };
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
        /* @__PURE__ */ h("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ h("span", { className: "block w-2 h-2 rounded-full", style: { background: n.color.text } }) }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: n.label }),
        n.group && /* @__PURE__ */ h("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: n.color.text }, children: n.group })
      ]
    }
  );
}, Fo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ h($f, { props: r, onApi: (i) => {
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
      const o = wc(i);
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
}, zf = bf.create({
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
}), Ir = new Yt("retainedSelectionHighlight"), Pf = qt.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new ln({
        key: Ir,
        state: {
          init: () => ({ held: !1, decorations: mr.empty }),
          apply(n, e) {
            const t = n.getMeta(Ir), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: mr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? mr.empty : mr.create(n.doc, [uc.inline(i, o, { class: "rt-retained-selection" })])
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
}), ip = {
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
function Fl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Lf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Fl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Of = ct.forwardRef(({
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
  const f = v(s);
  f.current = s;
  const p = v(l);
  p.current = l;
  const m = v(c);
  m.current = c;
  const g = v(a);
  g.current = a;
  const b = v(u);
  b.current = u;
  const x = v(null), D = v(null), C = v(e);
  C.current = e;
  const w = v(r);
  w.current = r;
  const N = v(o);
  N.current = o;
  const E = v(null), j = (L) => {
    var be;
    const H = L.getAttributes("textStyle"), K = L.getAttributes("reportTextStyle"), { from: J, to: I, empty: X } = L.state.selection;
    let Q = !1, Z = !1, le = !1;
    if (!X) {
      const Se = /* @__PURE__ */ new Set(), xe = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Set();
      L.state.doc.nodesBetween(J, I, (ye) => {
        if (!ye.isText) return;
        const ie = ye.marks.find(($) => $.type.name === "textStyle");
        Se.add((ie == null ? void 0 : ie.attrs.fontFamily) || ""), xe.add((ie == null ? void 0 : ie.attrs.fontSize) || "");
        const F = ye.marks.find(($) => $.type.name === "reportTextStyle");
        ne.add((F == null ? void 0 : F.attrs.styleId) || "");
      }), Q = Se.size > 1, Z = xe.size > 1, le = ne.size > 1;
    }
    const M = {
      bold: L.isActive("bold"),
      italic: L.isActive("italic"),
      underline: L.isActive("underline"),
      strike: L.isActive("strike"),
      link: L.isActive("link"),
      color: H.color || "",
      fontFamily: H.fontFamily || "",
      fontSize: H.fontSize || "",
      textStyle: K.styleId || "",
      hasSelection: !X,
      fontFamilyMixed: Q,
      fontSizeMixed: Z,
      textStyleMixed: le
    }, ce = E.current;
    ce && ce.bold === M.bold && ce.italic === M.italic && ce.underline === M.underline && ce.strike === M.strike && ce.link === M.link && ce.color === M.color && ce.fontFamily === M.fontFamily && ce.fontSize === M.fontSize && ce.textStyle === M.textStyle && ce.hasSelection === M.hasSelection && ce.fontFamilyMixed === M.fontFamilyMixed && ce.fontSizeMixed === M.fontSizeMixed && ce.textStyleMixed === M.textStyleMixed || (E.current = M, (be = N.current) == null || be.call(N, M));
  }, U = (L) => {
    var X;
    const H = L.state.selection;
    let K = null;
    H instanceof Wn && H.node.type.name === "token" ? (K = { key: H.node.attrs.field ?? "", pos: H.from }, x.current = H.from) : x.current != null && (x.current = L.state.tr.mapping.map(x.current));
    const J = D.current, I = J && K && J.key === K.key && J.pos === K.pos;
    !J && !K || I || (D.current = K, (X = b.current) == null || X.call(b, K));
  }, R = (L) => {
    const H = Tf(Cf(L));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(H) ? "" : H;
  }, q = ct.useMemo(() => {
    const L = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: J }) => {
        var I;
        return ((I = p.current) == null ? void 0 : I.call(p, J)) ?? [];
      },
      command: ({ editor: J, range: I, props: X }) => {
        J.chain().focus().insertContentAt(I, { type: "token", attrs: { field: X.field } }).run();
      },
      render: Fo
    }, H = Rf.configure({
      resolve: f.current ?? null,
      suggestion: L,
      onTokenClick: (J, I, X) => {
        var Q;
        x.current = X, (Q = g.current) == null || Q.call(g, J, I, X);
      }
    }), K = qt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          bc({
            pluginKey: new Yt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: J, range: I }) => Fl(J, I.from) != null,
            items: ({ editor: J, query: I }) => {
              var Q;
              const X = Lf(J);
              return X ? ((Q = m.current) == null ? void 0 : Q.call(m, X.chipKey, I)) ?? [] : [];
            },
            command: ({ editor: J, range: I, props: X }) => {
              J.chain().focus().insertContentAt(I, { type: "token", attrs: { field: X.field } }).run();
            },
            render: Fo
          })
        ];
      }
    });
    return [H, K];
  }, []), k = lc({
    immediatelyRender: !1,
    extensions: [
      dc,
      fc.configure({ placeholder: t }),
      hc,
      pc,
      mc,
      zf,
      Pf,
      gc,
      xc,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      yc.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...q
    ],
    content: Oo(n || ""),
    editable: !r,
    onUpdate: ({ editor: L }) => {
      C.current(R(L.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: L }) => {
      j(L), U(L);
    }
  });
  return ae(() => {
    if (!k || k.isFocused) return;
    R(k.getHTML()) !== n && (E.current = null, k.commands.setContent(Oo(n || ""), { emitUpdate: !1 }), j(k));
  }, [n, k]), ae(() => {
    k && k.setEditable(!r);
  }, [r, k]), ae(() => {
    k && (E.current = null, j(k), U(k));
  }, [k]), Wo(d, () => ({
    exec: (L, H, K) => {
      if (!k || w.current) return;
      const J = k.chain(), I = (K == null ? void 0 : K.focus) === !1 ? J : J.focus();
      switch (L) {
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
    focus: (L) => k == null ? void 0 : k.commands.focus(L),
    insertToken: (L) => {
      !k || w.current || k.chain().focus().insertContent({ type: "token", attrs: { field: L } }).run();
    },
    replaceToken: (L) => {
      if (!k || w.current) return;
      const H = x.current;
      H != null && k.commands.command(({ tr: K }) => {
        const J = K.doc.nodeAt(H);
        if (!J || J.type.name !== "token") return !1;
        K.setNodeMarkup(H, void 0, { field: L });
        const I = K.doc.resolve(H);
        return I.nodeAfter && I.nodeAfter.type.name === "token" && K.setSelection(new Wn(I)), !0;
      });
    },
    holdSelectionHighlight: (L) => {
      !k || k.isDestroyed || k.view.dispatch(k.state.tr.setMeta(Ir, { held: L }));
    }
  }), [k]), /* @__PURE__ */ h(cc, { editor: k, className: `richtext-editor ${i || ""}` });
});
Of.displayName = "RichTextEditor";
const Ff = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Bf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Bo = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ h("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ h("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Hf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = re(!1);
  return /* @__PURE__ */ h(
    Gr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ A("button", { type: "button", disabled: e, className: `${Na} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ h("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ h("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ h(mn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Ff.map((s) => /* @__PURE__ */ h(Ns, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ h(lr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ h("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, _f = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = re(!1), o = Qr(), [s, l] = re(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ h(
    Gr,
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
          children: /* @__PURE__ */ h(Gl, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ A("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: ka + " w-full"
          }
        ),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
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
}, op = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = re(!1), d = (b, x) => {
    var D;
    return (D = n.current) == null ? void 0 : D.exec(b, x);
  }, f = Qr(), p = (b) => !!(r != null && r[b]), m = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ h("div", { className: Ms }) : null;
  return /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ A("div", { className: m, children: [
      /* @__PURE__ */ h(zn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || p("bold"), disabled: e || p("bold"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ h(zn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || p("italic"), disabled: e || p("italic"), onMouseDown: (b) => b.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ h(zn, { content: "Underline", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Yl, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ h(zn, { content: "Strikethrough", children: /* @__PURE__ */ h(zt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (b) => b.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ h(Ul, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(_f, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ h("div", { className: m, children: /* @__PURE__ */ h(
      Gr,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ A(zt, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ h("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ h(Bo, {}),
          /* @__PURE__ */ h(mn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ h(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ h(Bo, { className: "w-3.5 h-3.5" })
            }
          ),
          Bf.map((b) => /* @__PURE__ */ h(
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
    (o || s || l) && /* @__PURE__ */ A(at, { children: [
      g,
      /* @__PURE__ */ A("div", { className: m, children: [
        o && /* @__PURE__ */ h(Hf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ h(zn, { content: "Clear formatting", children: /* @__PURE__ */ h(
          zt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (b) => b.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ h(Xl, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ A(at, { children: [
      g,
      /* @__PURE__ */ h("div", { className: m, children: i })
    ] })
  ] });
};
function Qi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function jf(n, e, t, r, i) {
  return Qi(n + e * i, t, r);
}
const Wf = 2;
function qf(n, e, t, r, i) {
  return Qi(n + Math.trunc(e / Wf) * i, t, r);
}
const Kf = 3;
function sp({
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
  const [p, m] = re(null), [g, b] = re(!1), x = v(!1), D = v(null), C = v(null), w = v(null), N = je(), E = Cs(), j = a === void 0;
  ae(() => () => {
    var I;
    return (I = D.current) == null ? void 0 : I.call(D);
  }, []), et(() => {
    const I = w.current, X = C.current;
    !j && I && X && (X.style.color = getComputedStyle(I).color);
  }, [j, a]), ae(() => {
    x.current || m(null);
  }, [n]);
  const U = n ?? r, R = p !== null ? p : n != null ? String(n) : d ? "" : String(r), q = (I) => Qi(I, e, t), k = (I) => {
    const X = jf(U, I, e, t, o);
    X !== U && (x.current && m(String(X)), i(X));
  }, L = (I) => {
    if (l || s || I.pointerType !== "mouse" || I.button !== 0) return;
    const X = I.currentTarget, Q = I.clientY, Z = U;
    let le = Z, M = !1;
    const ce = (Se) => {
      const xe = Q - Se.clientY;
      if (!M) {
        if (Math.abs(xe) < Kf) return;
        M = !0, X.blur(), X.style.userSelect = "none";
      }
      const ne = qf(Z, xe, e, t, o);
      ne !== le && (le = ne, i(ne));
    }, be = () => {
      D.current = null, window.removeEventListener("pointermove", ce), window.removeEventListener("pointerup", be), window.removeEventListener("pointercancel", be), X.style.userSelect = "", M && X.blur();
    };
    D.current = be, window.addEventListener("pointermove", ce), window.addEventListener("pointerup", be), window.addEventListener("pointercancel", be);
  }, H = (I) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": I === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (I === 1 ? U >= t : U <= e),
    /* Keep the input's focus (desktop) WITHOUT killing the tap: WebKit
       suppresses the click when a pointerdown's default is cancelled, so an
       iPhone/iPad stepper tap went dead. `mousedown` preserves the focus but
       does not cancel the click. */
    onMouseDown: (X) => X.preventDefault(),
    onClick: () => k(I)
  }), K = j ? O(22, 30, N) : O(16, 22, N), J = j ? O(14, 18, N) : O(11, 15, N);
  return /* @__PURE__ */ A(
    "span",
    {
      ref: C,
      className: `ui-number ${j ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ h(
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
              ...j ? { ...E, minHeight: O(28, 36, N) } : {},
              paddingRight: K + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (I) => {
              const X = I.target.value;
              m(X);
              const Q = parseInt(X, 10);
              X !== "" && !Number.isNaN(Q) && i(q(Q));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), p === null) return;
              const I = parseInt(p, 10);
              Number.isNaN(I) || i(q(I)), m(null);
            },
            onKeyDown: (I) => {
              I.key === "Enter" && I.target.blur(), I.key === "Escape" && (m(null), I.target.blur()), !s && !l && (I.key === "ArrowUp" || I.key === "ArrowDown") && (I.preventDefault(), k(I.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: L
          }
        ),
        /* @__PURE__ */ A("span", { className: "ui-number-steppers", style: { width: K }, children: [
          /* @__PURE__ */ h("button", { ...H(1), className: "ui-number-step", children: /* @__PURE__ */ h(Ql, { style: { width: J, height: J } }) }),
          /* @__PURE__ */ h("button", { ...H(-1), className: "ui-number-step", children: /* @__PURE__ */ h(mn, { style: { width: J, height: J } }) })
        ] })
      ]
    }
  );
}
function lp({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = je(), f = gn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), p = O(14, 16, d), m = { width: p, height: p }, g = O(10, 12, d);
  return /* @__PURE__ */ A("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ A("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ h(Ar, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ h(mn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function Zi({
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
  const d = v(null), f = v(null), [p, m] = re(null), g = (E) => {
    d.current = E, typeof o == "function" ? o(E) : o && (o.current = E);
  };
  et(() => {
    if (n) return;
    const E = d.current;
    if (!E || (f.current = E.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const j = new ResizeObserver(() => {
      f.current = E.getBoundingClientRect().width;
    });
    return j.observe(E), () => j.disconnect();
  }, [n]), et(() => {
    if (!n || e !== "auto") {
      m(null);
      return;
    }
    m(f.current);
    const E = requestAnimationFrame(() => m(null));
    return () => cancelAnimationFrame(E);
  }, [n, e]);
  const [b, x] = re(!1), [D, C] = re(null), w = v(!1);
  et(() => {
    if (n) {
      w.current = !0, x(!1), C(null);
      return;
    }
    if (!w.current || e !== "auto") return;
    w.current = !1, x(!0);
    let E = 0, j = 0;
    return (() => {
      var k;
      const R = (k = d.current) == null ? void 0 : k.firstElementChild, q = (R == null ? void 0 : R.getBoundingClientRect().width) ?? 0;
      q > 0 ? (E = requestAnimationFrame(() => C(q)), j = window.setTimeout(() => {
        x(!1), C(null);
      }, kt + 30)) : x(!1);
    })(), () => {
      cancelAnimationFrame(E), window.clearTimeout(j);
    };
  }, [n, e]);
  const N = n ? p ?? t : b ? D ?? t : e === "auto" ? "auto" : e;
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
function Jf({
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
  stretch: g = !1,
  actions: b,
  leadingIcon: x,
  showClear: D = !0,
  onSubmit: C,
  onCancel: w,
  cancelOnEscape: N = !1,
  cancelOnOutside: E = !1,
  className: j = "",
  "aria-label": U
}) {
  const [R, q] = re(p), k = v(R);
  k.current = R;
  const L = v(null), H = v(null), K = v(null), J = Go(), I = je(), X = O(9, 13, I), Q = se((F) => {
    k.current !== F && (k.current = F, q(F), m == null || m(F));
  }, [m]), Z = se((F = !1) => {
    var $;
    Q(!1), ($ = H.current) == null || $.blur(), F && requestAnimationFrame(() => {
      var Y;
      return (Y = K.current) == null ? void 0 : Y.focus();
    });
  }, [Q]), le = se(() => {
    Q(!0);
    const F = H.current;
    if (F) {
      F.focus({ preventScroll: !0 });
      const $ = F.value.length;
      F.setSelectionRange($, $);
    }
  }, [Q]);
  ae(() => {
    p && le();
  }, [p, le]), ae(() => {
    var Y;
    if (!R) return;
    const F = ((Y = L.current) == null ? void 0 : Y.ownerDocument) ?? document, $ = (Ie) => {
      var me;
      const Te = Ie.target;
      Te && ((me = L.current) != null && me.contains(Te) || (E && (w == null || w()), Z()));
    };
    return F.addEventListener("pointerdown", $, !0), () => F.removeEventListener("pointerdown", $, !0);
  }, [R, Z, E, w]);
  const M = se((F) => {
    var Y;
    if (!R) return;
    const $ = F.relatedTarget;
    $ && ((Y = L.current) != null && Y.contains($)) || (E && (w == null || w()), Z());
  }, [R, Z, E, w]), ce = se((F) => {
    if (F.key === "Enter") {
      F.preventDefault(), C == null || C(n), Z(!0);
      return;
    }
    F.key === "Escape" && (F.preventDefault(), F.stopPropagation(), N ? w == null || w() : e(""), Z(!0));
  }, [e, Z, N, w, C, n]), be = r === void 0 ? /* @__PURE__ */ h(Ln, { className: "w-3.5 h-3.5" }) : r, Se = x === void 0 ? be : x, ye = 8 + (((b == null ? void 0 : b.length) || 0) + (D && n ? 1 : 0)) * (J.box + 2), ie = (F) => /* @__PURE__ */ h(
    "span",
    {
      style: { width: J.icon, height: J.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: F
    }
  );
  return /* @__PURE__ */ h(
    Zi,
    {
      expanded: R,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: L,
      shrink: !0,
      stretch: g,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": R ? "true" : "false",
      className: j,
      onBlur: M,
      trigger: /* @__PURE__ */ h(
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
          active: f,
          keepLabelOnActive: !0,
          onClick: le,
          className: `${c ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${R ? "pointer-events-none" : ""}`,
          tabIndex: R ? -1 : 0,
          "aria-expanded": R,
          "aria-label": U || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: `min-w-0 ${c ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ A(at, { children: [
        Se && /* @__PURE__ */ h(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: X, width: J.icon, height: J.icon },
            children: ie(Se)
          }
        ),
        /* @__PURE__ */ h(
          "input",
          {
            ref: H,
            value: n,
            onChange: (F) => e(F.target.value),
            onKeyDown: ce,
            placeholder: i,
            "aria-label": U || i,
            tabIndex: R ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: Se ? X + J.icon + 6 : 10, paddingRight: ye },
            className: `${Pr("sm")} w-full`
          }
        ),
        /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          b == null ? void 0 : b.map((F) => /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": F.label,
              title: F.label,
              tabIndex: R ? 0 : -1,
              onMouseDown: ($) => $.preventDefault(),
              onClick: () => {
                F.onClick(n, { close: () => Z(!0) }), F.keepOpen || Z(!0);
              },
              style: { width: J.box, height: J.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": F.key,
              children: ie(F.icon)
            },
            F.key
          )),
          D && n && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: R ? 0 : -1,
              onClick: () => {
                var F;
                e(""), (F = H.current) == null || F.focus({ preventScroll: !0 });
              },
              style: { width: J.box, height: J.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ h(Tn, { size: J.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function cp({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ h(Kr, { className: "w-3.5 h-3.5" }),
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
      icon: /* @__PURE__ */ h(lr, { className: "w-3.5 h-3.5" }),
      onClick: m
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ h(Tn, { className: "w-3.5 h-3.5" }),
      onClick: g
    }] : []
  ];
  return /* @__PURE__ */ h(
    Jf,
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
function Vf(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Yf(n, e, t) {
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
function Bl(n, e, t) {
  const r = Vf(t), i = r.length > 0, o = new Map(e.map((a) => [a.key, a])), s = [];
  for (const a of n) {
    const { matched: u, detail: d } = Yf(a, a.group ? o.get(a.group) : void 0, r);
    u && s.push({ item: a, detail: d });
  }
  const l = new Set(s.map((a) => a.item.group).filter(Boolean)), c = i ? e.filter((a) => l.has(a.key) || a.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: c, hasQuery: i };
}
function Uf(n) {
  var u;
  const { hits: e, visibleGroups: t, hasQuery: r } = Bl(n.items, n.groups, n.query), i = [];
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
function Xf({
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
  expandableGroups: g = !1,
  browseExpanded: b = !1,
  groupExpandMode: x = "multiple",
  browseAll: D = !1,
  selectedId: C,
  autoFocus: w = !0,
  collapsedWidth: N = 128,
  expandedWidth: E = 288,
  panelWidth: j,
  panelMinWidth: U,
  keepAllRows: R = !1,
  maxMenuHeight: q = 420,
  theme: k = "light",
  morph: L = !0,
  emptyTitle: H,
  emptyHint: K,
  renderEmpty: J,
  emptyActions: I,
  leadingActions: X,
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
  highlightOnOpen: F = !0,
  ref: $
}) {
  const Y = c !== void 0, [Ie, Te] = re(""), me = Y ? c : Ie, _e = se((y) => {
    Y || Te(y), a == null || a(y);
  }, [Y, a]), Ee = ce !== void 0, [Fe, B] = re(!1), T = Ee ? ce : Fe, ge = se((y) => {
    Ee || B(y), be == null || be(y);
  }, [Ee, be]), [ve, Pe] = re(t === "inline"), lt = ot(() => e.map((y) => y.key).join("\0"), [e]), we = ot(() => new Set(lt ? lt.split("\0") : []), [lt]), [Ve, mt] = re(() => b ? we : /* @__PURE__ */ new Set()), [ze, Zt] = re(0), Kt = v(!1), Bt = v(null), Et = v(null), Ae = se((y, P = "keyboard") => {
    Kt.current = P === "pointer", Zt(y);
  }, []), Je = v(null), gt = v(null), At = v(null), tt = v(null), $t = v(null), We = v(0), nt = Ri(), Dt = Vn(), yt = Ur(), Mt = Oi(), Ht = bs(), qe = Go(), V = 8 + (((le == null ? void 0 : le.length) || 0) + (me ? 1 : 0)) * (qe.box + 2), [pe, Ge] = re({ top: 0, left: 0, maxH: 288, ready: !1 }), [rt, St] = re(0);
  ls({
    anchorRef: xe ?? Je,
    panelRef: tt,
    open: T,
    maxHeight: q,
    anchorRectRef: $t,
    onPosition: (y) => Ge({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), ae(() => {
    const y = (xe == null ? void 0 : xe.current) ?? Je.current;
    !T || !y || St(y.getBoundingClientRect().width);
  }, [T, ve, xe]);
  const [Rt, S] = re(!1);
  ae(() => {
    T && S(!0);
  }, [T]);
  const ee = Yr({
    visible: T,
    morph: L,
    anchor: () => {
      var y;
      return ((y = (xe == null ? void 0 : xe.current) ?? Je.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: tt,
    cloneOnUnmount: !0,
    onClosed: () => S(!1)
  }), ue = (I || []).map(
    (y) => typeof y.label == "function" ? y.label(me) : y.label
  ), oe = ot(
    () => Uf({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: R ? "" : me,
      browseGroups: m || b || g,
      browseAll: D,
      expandedGroups: Ve,
      emptyActionLabels: ue
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, me, R, m, b, g, D, Ve, ue.join("\0")]
  ), Ne = ot(
    () => (X || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(me) : y.label,
      actionIndex: P,
      source: "leading"
    })),
    [X, me]
  ), $e = ot(
    () => (Z || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(me) : y.label,
      actionIndex: P,
      source: "footer"
    })),
    [Z, me]
  ), Ke = oe.some((y) => y.kind === "empty"), De = Ne.length > 0 && !(Q && Ke), Re = De ? Ne.length : 0, ft = ot(
    () => [...De ? Ne : [], ...oe, ...$e],
    [De, Ne, oe, $e]
  ), it = !!d || g && !me.trim(), It = ot(
    () => ft.map((y, P) => ({ row: y, index: P })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !it)),
    [ft, it]
  ), xt = (g || b) && !me.trim(), Le = !!M, Ut = ot(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), en = ot(() => me.trim() ? Bl(n, e, me).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : Ut, [n, e, me, Ut]), vn = ot(() => new Set(en), [en]), Me = hs({
    mode: (M == null ? void 0 : M.mode) ?? "draft",
    selectedIds: (M == null ? void 0 : M.selectedIds) ?? ms,
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
    })), Ee || _e(""), Ae(0), mt(b ? we : /* @__PURE__ */ new Set()), f == null || f();
  }, [t, f, _e, b, we, Ee, ge]);
  ae(() => {
    if (me.trim() || !b) {
      mt((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    mt((y) => y.size === we.size && [...we].every((P) => y.has(P)) ? y : we);
  }, [me, b, we]);
  const an = v(!1), ht = v(!1);
  ae(() => {
    if (!T) {
      an.current = !1;
      return;
    }
    if (an.current || !g || me.trim()) return;
    const y = C ? [C] : [...(M == null ? void 0 : M.selectedIds) ?? []], P = new Set(y), G = P.size ? e.filter((he) => n.some((Ce) => Ce.group === he.key && P.has(Ce.id))).map((he) => he.key) : [];
    if (G.length === 0) {
      an.current = !0;
      return;
    }
    const te = x === "single" ? G.slice(0, 1) : G;
    if (!te.every((he) => Ve.has(he))) {
      ht.current = !0, mt(new Set(te));
      return;
    }
    if (F && C) {
      const he = ft.findIndex((Ce) => Ce.kind === "item" && Ce.hit.item.id === C);
      he >= 0 && Ae(he);
    }
    an.current = !0;
  }, [T, g, me, e, n, C, M == null ? void 0 : M.selectedIds, x, Ve, ft, F, Ae]);
  const Lt = se((y) => {
    mt((P) => {
      const G = new Set(P);
      return G.has(y) ? G.delete(y) : (x === "single" && G.clear(), G.add(y)), G;
    });
  }, [x]), Ot = se(() => {
    var P;
    if (T) {
      (P = gt.current) == null || P.focus();
      return;
    }
    if (cn.current(), t === "expandable" && !ve) {
      const G = Je.current;
      if (G) {
        const te = G.style.transition, he = G.style.width;
        G.style.transition = "none", G.style.width = `${E}px`;
        const Ce = G.getBoundingClientRect();
        $t.current = { left: Ce.left, top: Ce.top, width: Ce.width, height: Ce.height }, G.style.width = he, G.offsetWidth, G.style.transition = te, window.clearTimeout(We.current), We.current = window.setTimeout(() => {
          $t.current = null;
        }, kt + 80);
      }
    }
    Pe(!0), ge(!0);
    const y = C ? oe.findIndex((G) => G.kind === "item" && G.hit.item.id === C) : -1;
    Ae(y >= 0 ? Re + y : F ? Re : -1);
  }, [T, t, ve, E, Re, oe, C, F]);
  ae(() => () => {
    window.clearTimeout(We.current), $t.current = null;
  }, []), ae(() => {
    T || (Bt.current = null), Et.current = null;
  }, [T, me]), et(() => {
    var y;
    t !== "expandable" || !ve || !T || !w || (y = gt.current) == null || y.focus({ preventScroll: !0 });
  }, [t, ve, T, w]), ae(() => {
    var G;
    if (!T) return;
    const y = ((G = Je.current) == null ? void 0 : G.ownerDocument) ?? nt;
    if (!y) return;
    const P = (te) => {
      var Ce, bt, vt, rn;
      const he = ((Ce = te.composedPath) == null ? void 0 : Ce.call(te)[0]) ?? te.target;
      !he || typeof he.nodeType != "number" || (bt = Je.current) != null && bt.contains(he) || (vt = tt.current) != null && vt.contains(he) || (rn = xe == null ? void 0 : xe.current) != null && rn.contains(he) || Nt();
    };
    return y.addEventListener("pointerdown", P, !0), () => y.removeEventListener("pointerdown", P, !0);
  }, [T, Nt, nt, xe]);
  const tn = se((y) => {
    var P;
    if (y.kind === "item" ? Bt.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (Bt.current = null), y.kind === "group") {
      if (Le) {
        const G = (P = M == null ? void 0 : M.groupToken) == null ? void 0 : P.call(M, y.group.key);
        if (G) {
          Me.canToggle(G) && Me.toggle(G);
          return;
        }
        const te = n.filter((he) => he.group === y.group.key && he.checkable !== !1 && vn.has(he.id) && !Me.isDisabled(he.id)).map((he) => he.id);
        te.length && Me.toggleGroup(te);
        return;
      }
      d ? (d(y.group), p && Nt()) : it && Lt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Le) {
        if (Me.canToggle(y.hit.item.id)) {
          const G = It.findIndex((he) => he.row === y), te = (he) => {
            const Ce = It[he];
            return (Ce == null ? void 0 : Ce.row.kind) === "item" ? Ce.row.hit.item.id : null;
          };
          Et.current = G < 0 ? null : { up: te(G - 1), down: te(G + 1) }, Me.toggle(y.hit.item.id), Ae(-1, "keyboard");
        }
        return;
      }
      u(y.hit.item), p && Nt();
      return;
    }
    if (y.kind === "action") {
      const G = y.source === "leading" ? X : y.source === "footer" ? Z : I, te = G == null ? void 0 : G[y.actionIndex];
      te && te.onClick(me), p && Nt();
    }
  }, [Nt, p, I, Z, it, n, X, M, Le, It, u, d, me, Me, Ae, Lt, vn]), Xn = (y) => {
    if (It.length === 0) return;
    const P = Et.current, G = y === 1 ? P == null ? void 0 : P.down : P == null ? void 0 : P.up;
    if (G != null) {
      const bt = It.find(
        (vt) => vt.row.kind === "item" && vt.row.hit.item.id === G
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
    const he = It.findIndex((bt) => bt.index === te), Ce = he < 0 ? 0 : (he + y + It.length) % It.length;
    Ae(It[Ce].index);
  };
  Wo($, () => ({
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
      y.preventDefault(), T ? Xn(1) : Ot();
    else if (y.key === "ArrowUp")
      y.preventDefault(), Xn(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && g && T && !me.trim()) {
      const P = ft[ze];
      if ((P == null ? void 0 : P.kind) === "group") {
        const G = Ve.has(P.group.key);
        (y.key === "ArrowRight" || G) && (y.preventDefault(), Lt(P.group.key));
      } else if ((P == null ? void 0 : P.kind) === "item" && y.key === "ArrowLeft" && P.hit.item.group) {
        y.preventDefault();
        const G = P.hit.item.group;
        Ve.has(G) && Lt(G);
        const te = ft.findIndex((he) => he.kind === "group" && he.group.key === G);
        te >= 0 && Ae(te);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const P = ft[ze] ?? ft[0];
      P && tn(P);
    } else y.key === "Escape" && (y.preventDefault(), Nt());
  }, ur = (y) => {
    t === "expandable" && !ve || (_e(y), T || ge(!0));
  };
  ae(() => {
    if (R) {
      const P = me.trim().toLowerCase();
      if (!P) {
        const te = C ? oe.findIndex((he) => he.kind === "item" && he.hit.item.id === C) : -1;
        Ae(te >= 0 ? Re + te : -1);
        return;
      }
      const G = oe.findIndex((te) => te.kind === "item" && te.hit.item.label.toLowerCase().includes(P));
      Ae(G >= 0 ? Re + G : -1);
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
    if (!T || me.trim()) return;
    const y = C ? oe.findIndex((P) => P.kind === "item" && P.hit.item.id === C) : -1;
    Ae(y >= 0 ? Re + y : F ? Re : -1);
  }, [T]), et(() => {
    T && cn.current();
  }, [T]);
  const dr = (y) => /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    le == null ? void 0 : le.map((P) => /* @__PURE__ */ h(
      "button",
      {
        type: "button",
        "aria-label": P.label,
        title: P.label,
        tabIndex: ve ? 0 : -1,
        onMouseDown: (G) => G.preventDefault(),
        onClick: () => {
          P.onClick(me, { close: Nt }), P.keepOpen || Nt();
        },
        style: { width: qe.box, height: qe.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": P.key,
        children: /* @__PURE__ */ h(
          "span",
          {
            style: { width: qe.icon, height: qe.icon },
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
        tabIndex: ve ? 0 : -1,
        onMouseDown: (P) => P.preventDefault(),
        onClick: y,
        style: { width: qe.box, height: qe.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ h(Tn, { size: qe.icon })
      }
    )
  ] }), fr = /* @__PURE__ */ A("div", { className: "relative w-full", children: [
    /* @__PURE__ */ h(Ln, { size: qe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: gt,
        value: me,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": T,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => ur(y.target.value),
        onFocus: () => {
          m && Ot();
        },
        onClick: () => {
          m && Ot();
        },
        onKeyDown: In,
        placeholder: l,
        style: { paddingRight: V },
        className: `${Pr("sm")} w-full pl-8`
      }
    ),
    dr(() => {
      _e(""), T || Ot();
    })
  ] }), hr = /* @__PURE__ */ A("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ h(Ln, { size: qe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ h(
      "input",
      {
        ref: gt,
        value: me,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": T,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => ur(y.target.value),
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
        className: `${Pr("sm")} h-full w-full pl-8`
      }
    ),
    dr(() => {
      _e(""), !T && ve && Ot();
    })
  ] });
  ae(() => {
    if (!T || Kt.current) return;
    const y = tt.current;
    sn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${ze}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [T, ze]);
  const un = v(oe);
  un.current = oe;
  const _ = v(C);
  _.current = C;
  const fe = v(M == null ? void 0 : M.selectedIds);
  fe.current = M == null ? void 0 : M.selectedIds, et(() => {
    if (!T || !ht.current) return;
    const y = tt.current;
    if (!y) return;
    const P = C;
    if (!P) {
      ht.current = !1;
      return;
    }
    const G = oe.findIndex((he) => he.kind === "item" && he.hit.item.id === P);
    if (G < 0) {
      ht.current = !1;
      return;
    }
    const te = y.querySelector(`[data-search-row="${G}"]`);
    te && (sn(te, "center", y.querySelector("[data-search-scroller]") ?? null), ht.current = !1);
  }, [T, Ve, oe, C]);
  const ke = fs({
    open: T,
    block: "center",
    ready: pe.ready,
    scroller: () => {
      var y;
      return ((y = tt.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var G;
      let y = -1;
      const P = _.current;
      if (P)
        y = un.current.findIndex((te) => te.kind === "item" && te.hit.item.id === P);
      else {
        const te = fe.current;
        if (te && te.length) {
          const he = new Set(te);
          y = un.current.findIndex((Ce) => Ce.kind === "item" && he.has(Ce.hit.item.id));
        }
      }
      return y < 0 ? null : ((G = tt.current) == null ? void 0 : G.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), Qe = (y, P) => {
    const G = ze === P, te = !Le && C !== void 0 && y.hit.item.id === C, he = Le ? Me.isSelected(y.hit.item.id) : te, Ce = !!y.hit.item.disabled || Le && !Me.canToggle(y.hit.item.id), bt = y.hit.item.tone === "create" ? k === "light" ? { background: G ? "#d1fae5" : "#ecfdf5", color: G ? "#065f46" : "#047857" } : { background: G ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: G ? "#d1fae5" : "#6ee7b7" } : void 0;
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
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${y.hit.item.rowClassName ?? ""} ${te ? "ui-item-selected" : ""} ${G ? "ui-item-highlighted" : ""} ${Ce ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Le && y.hit.item.checkable !== !1 && /* @__PURE__ */ h(zr, { checked: he, disabled: Ce, indicator: M == null ? void 0 : M.indicator }),
          ie ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: ie(y.hit.item, { checked: he, disabled: Ce }) }) : /* @__PURE__ */ A(at, { children: [
            y.hit.item.icon && /* @__PURE__ */ h("span", { className: `${yt.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ h("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            te && /* @__PURE__ */ h(lr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, Ye = (y, P) => {
    var io;
    const G = Ve.has(y.group.key), te = g && !me.trim(), he = it, Ce = he && ze === P, bt = Le ? n.filter((Ze) => Ze.group === y.group.key && vn.has(Ze.id) && Ze.checkable !== !1) : [], vt = bt.filter((Ze) => !Me.isDisabled(Ze.id)).map((Ze) => Ze.id), rn = Le ? (io = M == null ? void 0 : M.groupToken) == null ? void 0 : io.call(M, y.group.key) : void 0, eo = !!rn && Me.isSelected(rn), to = eo ? "all" : vt.length > 0 ? Me.groupState(vt) : "none", _l = eo ? bt.length : bt.reduce((Ze, jl) => Ze + (Me.isSelected(jl.id) ? 1 : 0), 0), no = Le && /* @__PURE__ */ h(
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
        children: /* @__PURE__ */ h(
          zr,
          {
            checked: to === "all",
            indeterminate: to === "some",
            disabled: !rn && vt.length === 0,
            indicator: M == null ? void 0 : M.indicator
          }
        )
      }
    ), ro = Le ? /* @__PURE__ */ A("span", { className: `shrink-0 tabular-nums text-[10px] ${he ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      _l,
      "/",
      bt.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ h("span", { className: `shrink-0 tabular-nums ${he ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return he ? /* @__PURE__ */ A(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": te ? G : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (Ze) => Ze.preventDefault(),
        onMouseEnter: () => Ae(P, "pointer"),
        onClick: () => {
          te && Lt(y.group.key);
        },
        style: Mt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${yt.itemDefault} ${Ce ? "ui-item-highlighted" : ""}`,
        children: [
          no,
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
                y.group.icon && /* @__PURE__ */ h("span", { className: `${yt.icon} shrink-0`, children: y.group.icon }),
                /* @__PURE__ */ h("span", { className: "truncate", children: y.group.label })
              ]
            }
          ),
          /* @__PURE__ */ h("span", { className: "min-w-0 flex-1" }),
          ro,
          te && /* @__PURE__ */ h(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${G ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": G,
              onMouseDown: (Ze) => Ze.preventDefault(),
              onClick: (Ze) => {
                Ze.stopPropagation(), Lt(y.group.key);
              },
              style: { width: qe.box, height: qe.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ h(
                mn,
                {
                  size: qe.icon,
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
        "data-search-row": P,
        style: Ht,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          no,
          y.group.icon && /* @__PURE__ */ h("span", { className: `${yt.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.group.label }),
          ro
        ]
      },
      `group:${y.group.key}`
    );
  }, nn = (y, P) => {
    var he;
    const G = ze === P, te = y.source === "leading" ? X : y.source === "footer" ? Z : I;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": P,
        onMouseDown: (Ce) => Ce.preventDefault(),
        onMouseEnter: () => Ae(P, "pointer"),
        onClick: () => tn(y),
        style: Mt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${G ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ h("span", { className: `${yt.icon} shrink-0`, children: ((he = te == null ? void 0 : te[y.actionIndex]) == null ? void 0 : he.icon) || /* @__PURE__ */ h(Kr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, ri = () => /* @__PURE__ */ h("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: J ? J({ query: me, close: Nt }) : /* @__PURE__ */ A(at, { children: [
    /* @__PURE__ */ h("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ h(Ln, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ h("div", { className: "text-xs font-medium text-zinc-500", children: H || `No matches for “${me.trim()}”` }),
    /* @__PURE__ */ h("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: K || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), pr = [];
  for (let y = 0; y < oe.length; y++) {
    const P = oe[y];
    if (P.kind === "group") {
      const G = [];
      let te = y + 1;
      for (; te < oe.length && oe[te].kind === "item" && oe[te].hit.item.group === P.group.key; )
        G.push({ row: oe[te], index: te }), te++;
      pr.push({ group: P, index: y, items: G }), y = te - 1;
    } else P.kind === "item" ? pr.push({ row: P, index: y }) : pr.push({ row: P, index: y });
  }
  const ii = T || Rt ? Jr(
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
          width: j ?? (t === "expandable" ? E : rt || void 0),
          minWidth: U,
          maxHeight: pe.maxH,
          visibility: pe.ready ? "visible" : "hidden"
        },
        children: [
          De && /* @__PURE__ */ A("div", { className: "shrink-0 pb-1", children: [
            Ne.map((y, P) => nn(y, P)),
            oe.length > 0 && /* @__PURE__ */ h("div", { className: yt.separator })
          ] }),
          /* @__PURE__ */ A("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            oe.length === 0 && /* @__PURE__ */ h("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: J ? J({ query: me, close: Nt }) : /* @__PURE__ */ h(at, { children: "Type to search…" }) }),
            pr.map((y) => {
              if (y.group) {
                const te = Ve.has(y.group.group.key), he = y.items || [];
                return /* @__PURE__ */ A(ct.Fragment, { children: [
                  Ye(y.group, Re + y.index),
                  xt && /* @__PURE__ */ h(
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
                      children: /* @__PURE__ */ h("div", { className: "overflow-hidden flex flex-col", children: he.map((Ce) => Qe(Ce.row, Re + Ce.index)) })
                    }
                  ),
                  !xt && he.map((Ce) => Qe(Ce.row, Re + Ce.index))
                ] }, `group:${y.group.group.key}`);
              }
              const P = y.row, G = Re + y.index;
              return P.kind === "empty" ? ri() : P.kind === "action" ? nn(P, G) : P.kind === "item" ? Qe(P, G) : null;
            })
          ] }),
          $e.length > 0 && /* @__PURE__ */ A("div", { className: "shrink-0", children: [
            /* @__PURE__ */ h("div", { className: yt.separator }),
            $e.map((y, P) => nn(y, Re + oe.length + P))
          ] }),
          Le && (M == null ? void 0 : M.footer) !== !1 && /* @__PURE__ */ h(
            ys,
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
    ne ?? Dt ?? (nt == null ? void 0 : nt.body) ?? document.body
  ) : null;
  return Se ? /* @__PURE__ */ A(at, { children: [
    /* @__PURE__ */ h("div", { ref: Je, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    ii
  ] }) : t === "inline" ? /* @__PURE__ */ A("div", { ref: Je, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    fr,
    ii
  ] }) : /* @__PURE__ */ h(
    Zi,
    {
      expanded: ve,
      collapsedWidth: N,
      expandedWidth: E,
      rootRef: Je,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: ye ? ye({ open: T, expanded: ve, toggle: Ot }) : /* @__PURE__ */ h(
        zt,
        {
          ref: At,
          type: "button",
          variant: o,
          size: "minimal",
          theme: k === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ h(Ln, { className: "w-3.5 h-3.5" }) : i,
          onClick: Ot,
          className: `w-full justify-start ${ve ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: ve ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ h("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ A(at, { children: [
        hr,
        ii
      ] })
    }
  );
}
function yn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Hl(n, e, t = "id") {
  const r = e.find((i) => yn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function Gf(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function Qf(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function qr(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => yn(l, t) === r);
  if (i) return yn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? yn(s, t) : r;
}
function Ho(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of Gf(n)) {
    const s = qr(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function Zf(n, e, t, r, i) {
  if (i) return Ho(n, e, t);
  const o = new Set(e.map((l) => yn(l, t))), s = Ho(n, e, t).filter((l) => o.has(l));
  return s.length === 0 && n.trim() !== "" ? [...r] : s;
}
function eh(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const c = qr(l, e, t);
    !c || o.has(c) || (o.add(c), s.push(c));
  }
  return s;
}
function th(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => yn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function nh(n, e, t = "id") {
  const r = new Set(e.map((i) => yn(i, t)));
  return n.filter((i) => !r.has(i));
}
function _o(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Hl(o, e, t)).join(", ");
}
const rh = () => {
};
function ap({
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
  inputReadOnly: D = !1,
  disabled: C = !1,
  autoFocus: w = !1,
  defaultOpen: N = !1,
  selectAllOnOpen: E = !0,
  uppercase: j = !1,
  allowFreeText: U = !0,
  theme: R,
  className: q = "",
  style: k,
  panelWidth: L,
  panelMinWidth: H,
  initialQuery: K,
  keepAllRows: J = !1,
  maxMenuHeight: I,
  portalTarget: X,
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
  emptyHint: F,
  sortItems: $,
  max: Y,
  disabledIds: Ie,
  indicator: Te,
  browse: me,
  groupToken: _e
}) {
  const Ee = Qt(), Fe = R ?? (Ee == null ? void 0 : Ee.mode) ?? "light", B = je(), T = se((_) => yn(_, i), [i]), ge = ot(() => t.map(T), [t, T]), ve = ot(() => new Map(t.map((_) => [T(_), _])), [t, T]), Pe = se((_) => Hl(_, t, i), [t, i]), lt = ot(() => new Set([...m ?? []].map((_) => _.toLowerCase())), [m]), [we, Ve] = re(!1), [mt, ze] = re(""), [Zt, Kt] = re(() => {
    const _ = K ?? "";
    return j ? _.toUpperCase() : _;
  }), [Bt, Et] = re(Zt), [Ae, Je] = re(() => [...n]), [gt, At] = re(null), [tt, $t] = re(!1), We = v(null), nt = v(null), Dt = v(null), yt = v(null), Mt = v(null), Ht = v(n.join("\0")), qe = v(!1), z = v(/* @__PURE__ */ new Set()), V = v(!1), pe = v(!1), Ge = v(!1), rt = v(0), St = v(""), Rt = v([...n]), S = n.join("\0"), ee = ot(
    () => _o(n, t, i, l, c),
    [n, t, i, l, c]
  ), ue = se((_) => {
    if (a) return a([..._], t);
    if (o === "single") return _[0] ? Pe(_[0]) : "";
    const fe = _.map(Pe).join(", ");
    return Z ? fe : _.length ? `${fe}, ` : "";
  }, [a, t, o, Pe, Z]);
  ae(() => {
    we || (Je([...n]), Rt.current = [...n], Ht.current = S);
  }, [S, we]);
  const oe = se(() => {
    if (we || x || C) return;
    qe.current = !1, V.current = !0;
    const _ = ue(n);
    St.current = _, Rt.current = [...n], Je([...n]), ze(_), Et(Zt), Kt(""), Ve(!0);
  }, [we, x, C, n, ue, Zt]);
  et(() => {
    if (!we) return;
    const _ = We.current ?? nt.current;
    _ && (_.focus(), (_ instanceof HTMLInputElement || _ instanceof HTMLTextAreaElement) && (o === "single" && E ? _.setSelectionRange(0, _.value.length) : _.setSelectionRange(_.value.length, _.value.length)));
  }, [we]), et(() => {
    if (!Ge.current) return;
    Ge.current = !1;
    const _ = We.current;
    _ && (_.focus(), _.setSelectionRange(_.value.length, _.value.length));
  }, [mt]), ae(() => {
    (N || w) && oe();
  }, []);
  const Ne = o === "single" ? Bt : Qf(mt), $e = ye ? gt ?? [] : t, Ke = ot(
    () => $ ? $($e, Ae) : $e,
    [$e, $, Ae]
  ), De = Ne.trim(), Re = !!be && U && !tt && !!De && !th(De, $e, i);
  ae(() => {
    if (!ye || !we) return;
    const _ = Ne.trim();
    if (!_) {
      At(null), $t(!1);
      return;
    }
    $t(!0);
    const fe = ++rt.current, ke = setTimeout(() => {
      ye(_).then((Qe) => {
        rt.current === fe && (At(Qe), $t(!1));
      }).catch(() => {
        rt.current === fe && (At([]), $t(!1));
      });
    }, 400);
    return () => clearTimeout(ke);
  }, [ye, we, Ne]);
  const ft = ot(() => {
    const _ = Ke.filter((fe) => !fe.hidden).map((fe) => ({
      id: T(fe),
      label: fe.label,
      group: fe.group,
      detail: fe.detail,
      icon: fe.icon,
      disabled: !!fe.disabled || !!(Ie != null && Ie.includes(T(fe))),
      fields: fe.fields,
      keywords: fe.keywords,
      rowClassName: fe.rowClassName,
      rowStyle: fe.rowStyle
    }));
    return Re && _.unshift({
      id: De,
      label: ce ? ce(De) : `Add “${De}”…`,
      keywords: De,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), _;
  }, [Ke, T, Ie, Re, De, ce]), it = se((_) => {
    const fe = _.join("\0");
    if (fe !== Ht.current) {
      if (wn(_, n)) {
        Ht.current = fe;
        return;
      }
      if (Ht.current = fe, e(_), be)
        for (const ke of nh(_, t, i))
          z.current.has(ke) || (z.current.add(ke), be(ke));
    }
  }, [n, e, be, t, i]), It = se((_, fe) => {
    !fe || !be || !U || t.some((ke) => T(ke) === _) || z.current.has(_) || (z.current.add(_), be(_));
  }, [be, U, t, T]), xt = se((_ = !0) => {
    if (!V.current || (V.current = !1, x || C)) return;
    if (qe.current) {
      qe.current = !1;
      return;
    }
    const fe = St.current, ke = new Set(ge), Qe = o === "single" ? (() => {
      const Ye = fe.trim();
      if (!Ye) return U ? [] : n;
      const nn = qr(Ye, t, i);
      return !U && !ke.has(nn) ? n : [nn];
    })() : jt(
      Zf(fe, t, i, n, U),
      ge
    );
    Rt.current = Qe, Je(Qe), Et(""), Ve(!1), it(Qe), _ && !pe.current && (Se == null || Se());
  }, [x, C, o, t, i, ge, U, n, it, Se]), Le = se((_) => {
    Ve(_), _ || xt();
  }, [xt]), Ut = se(() => {
    qe.current = !0, V.current = !1;
    const _ = ue(n);
    St.current = _, Rt.current = [...n], Je([...n]), ze(_), Et(""), Ve(!1), xe == null || xe();
  }, [n, ue, xe]);
  ae(() => {
    var Qe;
    if (!we) return;
    const fe = (((Qe = Dt.current) == null ? void 0 : Qe.ownerDocument) ?? document).defaultView;
    if (!fe) return;
    const ke = (Ye) => {
      Ye.key === "Escape" && (Ye.preventDefault(), Ye.stopImmediatePropagation(), Ut());
    };
    return fe.addEventListener("keydown", ke, !0), () => fe.removeEventListener("keydown", ke, !0);
  }, [we, Ut]);
  const en = se((_) => {
    const fe = jt(_, ge), ke = ue(fe);
    Rt.current = fe, St.current = ke, Je(fe), Ge.current = !0, ze(ke);
  }, [ge, ue]), vn = se((_) => {
    const fe = _.id;
    V.current = !1;
    const ke = Pe(fe);
    Rt.current = [fe], St.current = ke, Je([fe]), ze(ke), Et(""), Ve(!1), it([fe]), pe.current || Se == null || Se();
  }, [Pe, it, Se]), Me = (_) => {
    var fe, ke, Qe, Ye, nn;
    if (_.key === "Escape") {
      _.preventDefault(), Ut();
      return;
    }
    if (_.key === "Tab") {
      if (_.preventDefault(), o === "single" && we) {
        pe.current = !0;
        const ri = (fe = Mt.current) == null ? void 0 : fe.activateHighlighted();
        if (pe.current = !1, ri) {
          (ke = ne ?? Se) == null || ke(We.current ?? void 0);
          return;
        }
      }
      we && xt(!1), (Qe = ne ?? Se) == null || Qe(We.current ?? void 0);
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
    if (St.current = fe, ze(fe), o === "single" && Et(fe), we || (V.current = !0, qe.current = !1, Ve(!0)), o === "multiple") {
      const Qe = jt(eh(fe, t, i), ge);
      Rt.current = Qe, Je(Qe), (ke = Mt.current) == null || ke.setSelection(Qe);
    }
  }, Rn = () => {
    if (V.current) {
      if (qe.current) {
        qe.current = !1;
        return;
      }
      xt();
    }
  }, Nt = se((_, fe) => {
    const ke = ve.get(_.id);
    if (!ke)
      return /* @__PURE__ */ A(at, { children: [
        /* @__PURE__ */ h(Kr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: _.label })
      ] });
    const Qe = !!m && (i === "label" ? lt.has(ke.label.toLowerCase()) : m.has(T(ke))), Ye = (f == null ? void 0 : f(ke)) ?? ke.badge ?? null;
    return /* @__PURE__ */ A(at, { children: [
      d ? d(ke, fe.checked) : /* @__PURE__ */ A(at, { children: [
        ke.icon && /* @__PURE__ */ h("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: ke.icon }),
        /* @__PURE__ */ h("span", { className: "flex-1 truncate", children: ke.label }),
        Ye && /* @__PURE__ */ h("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Ye }),
        p == null ? void 0 : p(ke)
      ] }),
      Qe && /* @__PURE__ */ h("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ h(Zl, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [ve, m, lt, i, T, f, d, p, g]), an = /* @__PURE__ */ h(
    Xf,
    {
      ref: Mt,
      mode: "inline",
      hideTrigger: !0,
      open: we,
      onOpenChange: Le,
      anchorRef: s === "morph" ? yt : Dt,
      items: ft,
      groups: r,
      query: Ne,
      onSelect: vn,
      closeOnSelect: o === "single",
      selectedId: o === "single" && Ae[0] !== void 0 ? qr(Ae[0], t, i) : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Ae,
        mode: "live",
        onDraftChange: en,
        onToggle: It,
        onCommit: rh,
        max: Y,
        disabledIds: Ie,
        indicator: Te,
        groupToken: _e
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
      emptyHint: tt ? "Fetching matching records." : F,
      theme: Fe,
      panelWidth: L,
      panelMinWidth: H,
      keepAllRows: J,
      maxMenuHeight: I,
      portalTarget: X
    }
  ), ht = s === "chip", Lt = s === "wrap", Ot = !ht && !Lt && Q, tn = !we && !ee, Xn = we ? mt : ee, In = {
    ref: We,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: we ? mt : ht ? n.join(", ") : ee,
    disabled: C,
    readOnly: D,
    placeholder: "",
    onFocus: oe,
    onClick: oe,
    onChange: cn,
    onBlur: Rn,
    onKeyDown: Me,
    autoComplete: "off",
    spellCheck: !1
  }, ur = O(5, 7, B), dr = O(9, 12, B), fr = O(12, 14, B);
  if (s === "button") {
    const _ = (Ye) => Me(Ye), fe = we ? Ae : n, ke = _o(fe, t, i, l, c), Qe = !ke;
    return /* @__PURE__ */ A(
      "div",
      {
        ref: Dt,
        "data-picker-field": !0,
        className: `relative ${q}`,
        style: k,
        onMouseDown: (Ye) => Ye.stopPropagation(),
        onContextMenu: (Ye) => {
          Ye.preventDefault(), Ye.stopPropagation();
        },
        children: [
          u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: u({ values: [...fe], items: t, display: ke, open: we, toggle: oe }) }) : /* @__PURE__ */ A(
            zt,
            {
              ref: nt,
              variant: "outline",
              theme: Fe === "dark" ? "dark" : "light",
              disabled: C,
              onClick: x ? void 0 : () => we ? xt() : oe(),
              onKeyDown: _,
              "data-state": we ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": we,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && fe.length > 0 ? /* @__PURE__ */ h("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: fe.map((Ye) => /* @__PURE__ */ h(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: Pe(Ye)
                  },
                  Ye
                )) }) : /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate text-left ${Qe ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: ke || b }),
                /* @__PURE__ */ h(mn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          an
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ h(
      Zi,
      {
        expanded: we,
        collapsedWidth: le,
        expandedWidth: M,
        rootRef: Dt,
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
              disabled: C,
              onClick: oe,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${ur}px ${dr}px`, fontSize: fr },
              children: [
                /* @__PURE__ */ h("span", { className: `min-w-0 flex-1 truncate ${tn ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: ee || b }),
                /* @__PURE__ */ h(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ A("div", { ref: yt, className: "relative h-full", children: [
          /* @__PURE__ */ h(
            "input",
            {
              ...In,
              className: `${Pr("sm")} h-full w-full`
            }
          ),
          an
        ] })
      }
    );
  const hr = ht ? O(5, 7, B) : 0, un = ht ? O(9, 12, B) : 0;
  return x ? /* @__PURE__ */ h(
    "div",
    {
      ref: Dt,
      "data-picker-field": !0,
      className: `relative ${ht ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Lt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${q}`,
      style: ht ? { padding: `${hr}px ${un}px`, fontSize: O(12, 14, B), ...k } : k,
      children: /* @__PURE__ */ h(
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
      ref: Dt,
      "data-picker-field": !0,
      className: `relative ${ht ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Lt ? "min-h-[1lh] w-full pb-[1lh]" : Ot ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${q}`,
      style: ht ? { padding: `${hr}px ${un}px`, fontSize: fr, ...k } : k,
      onMouseDown: (_) => _.stopPropagation(),
      onContextMenu: (_) => {
        _.preventDefault(), _.stopPropagation();
      },
      onAuxClick: oe,
      children: [
        ht && u ? /* @__PURE__ */ h("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: u({ values: [...n], items: t, display: ee, open: we, toggle: oe }) }) : l === "chips" && !we ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((_) => /* @__PURE__ */ h(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: Pe(_)
            },
            _
          )),
          n.length === 0 && /* @__PURE__ */ h("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ h(
          "span",
          {
            className: `pointer-events-none text-left ${ht ? "min-w-0 flex-1 truncate" : Lt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${tn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: Xn || b
          }
        ),
        Lt ? /* @__PURE__ */ h(
          "textarea",
          {
            ...In,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ h(
          "input",
          {
            ...In,
            className: Ot ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Ot ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : ht ? { caretColor: "#2563eb", color: "transparent", paddingLeft: un, paddingRight: un + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        ht && /* @__PURE__ */ h(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        an
      ]
    }
  );
}
export {
  zt as Button,
  lp as CardSection,
  zi as CheckMark,
  Hc as Checkbox,
  Wh as Checklist,
  ep as ChromeHeader,
  Zh as ContentRow,
  Ah as ContextMenu,
  Dh as ContextMenuDivider,
  $h as ContextMenuItem,
  zh as ContextMenuSub,
  ss as DROPDOWN_MAX_HEIGHT,
  jh as DatePicker,
  Oh as DialogProvider,
  Ns as DropdownItem,
  Gr as DropdownMenu,
  Qc as DropdownSubmenu,
  Pi as DropdownThemeContext,
  Ff as FONTS,
  Kh as FloatingChrome,
  _h as FloatingToggle,
  Hf as FontMenu,
  op as FormatToolbar,
  Be as IS_COARSE,
  Sc as IS_TOUCH_CAPABLE,
  Ih as ItemManagerDropdown,
  Bh as LongPressMenuProvider,
  xn as MORPH_EASE,
  kt as MORPH_MS,
  Ii as MORPH_OPACITY_MS,
  ar as MenuHighlightContext,
  ws as MenuSearchContext,
  ea as Modal,
  Ph as ModalFooter,
  xr as ModalFooterButton,
  cp as MorphActionField,
  Jf as MorphSearchField,
  ms as NO_SELECTION_IDS,
  sp as NumberInput,
  ap as PickerField,
  kc as PopoutWindowContext,
  ip as RICH_TEXT_STATE_IDLE,
  qh as RadioList,
  Of as RichTextEditor,
  Wf as SCRUB_PX_PER_STEP,
  Xf as SearchMenu,
  Qh as SectionHeader,
  Gh as Seg,
  zr as SelectionCheck,
  ps as SelectionContext,
  ys as SelectionFooter,
  tp as StructureControls,
  Fi as SubmenuContext,
  Rh as TAB_PILL,
  va as TB_BTN,
  br as TB_BTN_ICON,
  wa as TB_DANGER,
  Ms as TB_DIVIDER,
  ka as TB_INPUT,
  Xh as TB_NUM,
  Na as TB_PICKER,
  Jh as TB_ROW_LABEL,
  Sa as TB_SEG,
  Vh as TB_TOGGLE,
  Uh as TB_TOGGLE_OFF,
  Yh as TB_TOGGLE_ON,
  gs as TabFace,
  Eh as ThemeProvider,
  Mh as ThemeScope,
  Rf as Token,
  Mf as TokenChipView,
  vr as ToolButton,
  zn as Tooltip,
  Ai as ZOOM_FROM,
  Uf as buildSearchMenuRows,
  zc as buttonCloudOf,
  Qi as clampNumber,
  Ec as cloneOverlayClose,
  O as coarsePx,
  Fc as countHidden,
  rp as escapeHtml,
  _o as formatPickerValues,
  Xo as getCoarseScale,
  Ur as getDropdownClasses,
  Th as getHardwareKeyboard,
  Nh as getLastPointerType,
  lo as groupSelectionState,
  th as hasPickerMatch,
  Pr as inputCls,
  aa as isInteractiveElement,
  wh as isPhoneViewport,
  yi as isTouchLike,
  Qf as lastPickerSegment,
  Yf as matchSearchItem,
  ds as menuAttributesOf,
  $c as menuThemeOf,
  ts as nearestOverlayOrigin,
  Ol as normalizeSpaces,
  jt as orderByCatalogue,
  Bn as overlayMorphEnabled,
  Vf as parseSearchTags,
  eh as pickerCommittedKeys,
  yn as pickerItemKey,
  Hl as pickerItemLabel,
  Gf as pickerSegments,
  Cc as playOverlayClose,
  Tc as playOverlayOpen,
  Oo as preprocessTokenHtml,
  qr as resolvePickerSegment,
  Ho as resolvePickerText,
  sn as revealRowInScroller,
  is as safeAreaInsets,
  wn as sameSelection,
  Tf as sanitizeRichText,
  qf as scrubbedValue,
  Bl as searchMenuContent,
  Dc as segModeOf,
  kh as setCoarseScale,
  so as setSelected,
  jf as steppedValue,
  np as stripRichText,
  Cf as stripTokenWrappers,
  Oc as toggleSelected,
  nh as unknownPickerValues,
  Sh as useCoarse,
  je as useCoarseScale,
  gn as useCoarseSize,
  Ri as useCurrentDocument,
  cr as useCurrentWindow,
  Lh as useDialog,
  ls as useDropdownPosition,
  xs as useDropdownTheme,
  Ch as useHardwareKeyboard,
  Cs as useInputSize,
  Oi as useItemSize,
  Qt as useKitTheme,
  Nc as useLastPointerType,
  Fh as useLongPressOptOut,
  Bi as useMenuHighlight,
  Yc as useMenuSearch,
  Yr as useOverlayMorph,
  Mi as usePopoutWindow,
  Vn as usePortalTarget,
  fs as useRevealRowOnOpen,
  hs as useSelection,
  Bc as useSelectionContext,
  ba as useSlidingPill,
  Hh as useTouchMode,
  rs as visualViewportBox
};
