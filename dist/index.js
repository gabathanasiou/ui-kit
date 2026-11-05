"use client";
import { jsx as p, jsxs as A, Fragment as ut } from "react/jsx-runtime";
import ct, { createContext as Gt, useContext as Qt, useState as re, useEffect as ae, useRef as v, useCallback as se, useLayoutEffect as tt, useMemo as st, useId as Vl, useImperativeHandle as Ko } from "react";
import * as _e from "@radix-ui/react-dropdown-menu";
import { Minus as Yl, Check as ar, Search as zn, X as Tn, Pencil as Ul, CopyPlus as Jo, Trash2 as xi, RotateCcw as Vo, Plus as Jr, ChevronRight as Dr, ChevronLeft as Yo, ArrowUp as Xl, ArrowDown as Gl, ChevronDown as mn, Underline as Ql, Strikethrough as Zl, RemoveFormatting as ea, Link as ta, ChevronUp as na, Anchor as ra } from "lucide-react";
import { computePosition as ia, offset as Uo, flip as Xo, shift as Go, size as oa, useFloating as sa, autoUpdate as la } from "@floating-ui/react-dom";
import * as dn from "@radix-ui/react-dialog";
import { createPortal as Vr } from "react-dom";
import { mergeAttributes as aa, ReactNodeViewRenderer as ca, NodeViewWrapper as ua, useEditor as da, EditorContent as fa } from "@tiptap/react";
import { PluginKey as Ut, Plugin as ln, Selection as Bn, TextSelection as qt, NodeSelection as qn, AllSelection as ha } from "@tiptap/pm/state";
import { DecorationSet as gr, Decoration as pa } from "@tiptap/pm/view";
import ma from "@tiptap/starter-kit";
import ga from "@tiptap/extension-placeholder";
import { TextStyle as ya, FontFamily as xa, FontSize as ba } from "@tiptap/extension-text-style";
import va from "@tiptap/extension-color";
import wa from "@tiptap/extension-link";
import ka from "@tiptap/extension-underline";
import Sa from "@tiptap/suggestion";
import { Mention as Na } from "@tiptap/extension-mention";
import { createRoot as Ta } from "react-dom/client";
const Ca = Gt(null);
function Ri() {
  return Qt(Ca);
}
function Yn() {
  const n = Ri();
  return n ? n.document.body : null;
}
function Ii() {
  const n = Ri();
  return n ? n.document : typeof document < "u" ? document : null;
}
function cr() {
  return Ri() ?? (typeof window < "u" ? window : null);
}
const Un = typeof window < "u", He = Un && window.matchMedia("(pointer: coarse)").matches, Ea = Un && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Eh() {
  return Un && window.matchMedia("(max-width: 600px)").matches;
}
let Yr = 0.5;
const nr = /* @__PURE__ */ new Set();
function Mh(n) {
  Yr = Math.max(0, Math.min(1, n)), nr.forEach((e) => e());
}
function Qo() {
  return Yr;
}
function Ah() {
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
function Zo() {
  const n = We(), e = He && n > 0;
  return {
    box: e ? F(28, 36, n) : 20,
    icon: e ? F(16, 20, n) : 14
  };
}
function bi(n) {
  return n === "touch" || n === "pen";
}
let Fn = null;
const vi = /* @__PURE__ */ new Set();
Un && window.addEventListener("pointerdown", (n) => {
  Fn = n.pointerType, vi.forEach((e) => e());
}, !0);
function Rh() {
  return Fn;
}
function Ma() {
  const [, n] = re(0), e = v(Fn);
  return ae(() => {
    const t = () => {
      e.current !== Fn && (e.current = Fn, n((r) => r + 1));
    };
    return vi.add(t), () => {
      vi.delete(t);
    };
  }, []), Fn;
}
const es = ["(any-hover: hover)", "(any-pointer: fine)"];
function ts() {
  return Un ? es.some((n) => window.matchMedia(n).matches) : !1;
}
let $r = ts();
const wi = /* @__PURE__ */ new Set();
function ao(n) {
  $r !== n && ($r = n, wi.forEach((e) => e()));
}
var qo;
if (Un) {
  const n = () => ao(ts());
  for (const s of es) {
    const l = window.matchMedia(s);
    (qo = l.addEventListener) == null || qo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || ao(!0));
  });
  let t = null, r = null;
  const i = "__penClick", o = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (s) => {
    s.pointerType !== "pen" || s.button !== 0 || (t = { x: s.clientX, y: s.clientY });
  }, !0), window.addEventListener("pointerup", (s) => {
    if (s.pointerType !== "pen") return;
    const l = t;
    if (t = null, !l || Math.hypot(s.clientX - l.x, s.clientY - l.y) > 8) return;
    const a = s.target;
    if (!a || !a.isConnected) return;
    if (a instanceof HTMLInputElement && o.has(a.type)) {
      try {
        a.showPicker();
      } catch {
      }
      return;
    }
    const u = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    u[i] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, a.dispatchEvent(u);
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
    return wi.add(e), () => {
      wi.delete(e);
    };
  }, []), $r;
}
const kt = 220, xn = "cubic-bezier(0.32, 0.72, 0, 1)", Di = 170, $i = 0.94;
function ns(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Hn(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Lr(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ns(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${kt}ms ${xn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r == null || r());
      }, kt + 80));
    });
  });
}
function rs(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function is(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return rs({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Aa(n, e, t, r) {
  const i = ++n.current;
  e.style.visibility = "", e.style.pointerEvents = "", e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${$i})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const o = is(e, t);
      e.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, e.style.transition = `transform ${kt}ms ${xn}, opacity ${Di}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", r == null || r());
      }, kt + 60);
    });
  });
}
function Ra(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = is(e, t);
  e.style.transition = `transform ${kt}ms ${xn}, opacity ${Di}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${$i})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, kt + 60);
}
function Ia(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? rs({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${kt}ms ${xn}, opacity ${Di}ms ease`, r.style.transform = `scale(${$i})`, r.style.opacity = "0", window.setTimeout(() => {
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
      b === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && Hn(f.current) && Ia(g, c.current, i.current));
    });
  }, []), l = se(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), a = v(n.visible);
  a.current = n.visible;
  const u = v(n.visible), c = v(n.anchor ?? null);
  c.current = n.anchor ?? null;
  const d = v(n.onClosed);
  d.current = n.onClosed;
  const f = v(n.morph !== !1);
  f.current = n.morph !== !1;
  const h = v(0);
  return tt(() => {
    if (!t || !a.current || !Hn(f.current)) return;
    const m = e.current;
    m && Aa(h, m, c.current);
  }, [t, n.visible]), ae(() => {
    if (!t || !a.current) return;
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
    if (!g || !Hn(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    Ra(h, g, c.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), ae(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), ae(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const b = e.current;
      b && b.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
function ss(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function yr(n, e) {
  const t = getComputedStyle(n.documentElement).getPropertyValue(e).trim(), r = Number.parseFloat(t);
  return Number.isFinite(r) ? r : 0;
}
function ls(n) {
  return n ? {
    left: yr(n, "--ui-safe-area-left"),
    right: yr(n, "--ui-safe-area-right"),
    top: yr(n, "--ui-safe-area-top"),
    bottom: yr(n, "--ui-safe-area-bottom")
  } : { left: 0, right: 0, top: 0, bottom: 0 };
}
const as = 384, Da = ss;
function cs({
  anchorRef: n,
  panelRef: e,
  open: t,
  contentRef: r,
  anchorRectRef: i,
  gap: o = 4,
  padding: s = 8,
  maxHeight: l,
  minHeight: a = 32,
  onPosition: u
}) {
  const c = cr(), d = v(c);
  d.current = c;
  const f = v(u);
  f.current = u, tt(() => {
    if (!t) return;
    let h = 0, m = !1;
    const g = () => {
      h || (h = requestAnimationFrame(b));
    }, b = () => {
      if (h = 0, m) return;
      const C = d.current, W = n.current, J = e.current;
      if (!C || !W || !J || !J.isConnected) return;
      const E = (r == null ? void 0 : r.current) ?? J, V = Da(C), R = ls(C.document), ne = {
        x: V.x + R.left,
        y: V.y + R.top,
        width: Math.max(0, V.width - R.left - R.right),
        height: Math.max(0, V.height - R.top - R.bottom)
      }, ie = l ?? as, H = Math.min(a, ie), K = Math.max(0, J.offsetHeight - E.offsetHeight), I = Math.max(H, Math.ceil(E.scrollHeight + K)), U = Math.min(I, ie);
      J.style.maxHeight = `${U}px`;
      let q = U;
      const O = i == null ? void 0 : i.current;
      ia(O ? {
        getBoundingClientRect: () => ({
          left: O.left,
          top: O.top,
          width: O.width,
          height: O.height,
          right: O.left + O.width,
          bottom: O.top + O.height,
          x: O.left,
          y: O.top,
          toJSON: () => {
          }
        })
      } : W, J, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Uo(o),
          Xo({ boundary: ne, padding: s, fallbackStrategy: "bestFit" }),
          Go({ boundary: ne, padding: s, mainAxis: !1 }),
          oa({
            boundary: ne,
            padding: s,
            apply({ availableHeight: M }) {
              q = Math.max(H, Math.floor(Math.min(ie, M))), J.style.maxHeight = `${q}px`;
            }
          })
        ]
      }).then(({ x: M, y: ye, placement: ve }) => {
        m || !Number.isFinite(M) || !Number.isFinite(ye) || f.current({
          top: Math.round(ye),
          left: Math.round(M),
          maxH: q,
          side: ve.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, L = (x == null ? void 0 : x.document) ?? null, w = (x == null ? void 0 : x.visualViewport) ?? null, k = () => g();
    w == null || w.addEventListener("resize", k), w == null || w.addEventListener("scroll", k), x == null || x.addEventListener("resize", k), L == null || L.addEventListener("scroll", k, { capture: !0, passive: !0 });
    let N = null;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(k), n.current && N.observe(n.current), e.current && N.observe(e.current), r != null && r.current && N.observe(r.current)), () => {
      m = !0, h && cancelAnimationFrame(h), w == null || w.removeEventListener("resize", k), w == null || w.removeEventListener("scroll", k), x == null || x.removeEventListener("resize", k), L == null || L.removeEventListener("scroll", k, { capture: !0 }), N == null || N.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, a]);
}
const $a = 14, La = 900, us = 1e3;
let Ln = { at: 0, target: null, x: 0, y: 0 };
typeof document < "u" && document.addEventListener("pointerdown", (n) => {
  Ln = { at: Date.now(), target: n.target, x: n.clientX, y: n.clientY };
}, !0);
const Pa = 12;
function ds(n, e) {
  const t = Date.now() - Ln.at < us, r = Math.hypot(e.clientX - Ln.x, e.clientY - Ln.y) <= Pa, i = !!Ln.target && n.contains(Ln.target);
  return He && t && r && !i;
}
function fs() {
  const n = v(!1);
  return { onClick: (r) => {
    const i = r.currentTarget;
    n.current = !!i && ds(i, r);
  }, takeGhost: () => {
    const r = n.current;
    return n.current = !1, r;
  } };
}
function Li(n, e = !1) {
  const t = fs(), r = v(null), i = v(0), o = (c, d, f) => {
    let h = 0;
    const m = () => {
      c.removeEventListener("click", g, !0), c.removeEventListener("pointerdown", b, !0), h && window.clearTimeout(h);
    }, g = (x) => {
      if (Math.hypot(x.clientX - d, x.clientY - f) > 14) {
        m();
        return;
      }
      x.preventDefault(), x.stopImmediatePropagation(), m();
    }, b = () => m();
    c.addEventListener("click", g, !0), c.addEventListener("pointerdown", b, !0), h = window.setTimeout(m, 600);
  }, s = (c) => {
    !He || e || c.pointerType !== "touch" || (r.current = { x: c.clientX, y: c.clientY, t: Date.now(), doc: c.currentTarget.ownerDocument });
  }, l = (c) => {
    if (!He || e || c.pointerType !== "touch") return;
    const d = r.current;
    if (r.current = null, !d) return;
    if (Math.hypot(c.clientX - d.x, c.clientY - d.y) > $a) {
      o(d.doc, c.clientX, c.clientY);
      return;
    }
    if (Date.now() - d.t > La) return;
    i.current = Date.now();
    const f = c.currentTarget;
    n(), f.click(), o(d.doc, c.clientX, c.clientY);
  }, a = () => {
    r.current = null;
  }, u = () => Date.now() - i.current < us;
  return {
    onPointerDown: s,
    onPointerUp: l,
    onPointerCancel: a,
    onClick: t.onClick,
    takeGhost: t.takeGhost,
    suppressSelect: u
  };
}
let In = null;
function hs(n) {
  return In == null || In(), In = n, () => {
    In === n && (In = null);
  };
}
const ps = Gt(null);
function Pi(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.identityAccent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", identityAccent: o, surface: r, context: i };
}
function Oi({ theme: n, children: e }) {
  return /* @__PURE__ */ p(ps.Provider, { value: n, children: e });
}
function $h({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Ot();
  return /* @__PURE__ */ p(Oi, { theme: Pi({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Lh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Ot(), a = Pi({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ p(Oi, { theme: a, children: /* @__PURE__ */ p(
    "div",
    {
      "data-mode": a.mode,
      "data-accent": a.accent,
      "data-surface": a.surface,
      "data-context": a.context,
      className: o,
      style: s,
      children: i
    }
  ) });
}
function Ot() {
  return Qt(ps);
}
function Xr(n, e = "dark") {
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
    const t = Xr(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Oa(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function za(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function Fa(n) {
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
  const r = t ?? Fa(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, a = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + a > o.bottom && (r.scrollTop += i.bottom + a - o.bottom);
}
function gs({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = v(!1), s = v(!1), l = v(!1), a = v({ row: e, scroller: r, block: t });
  a.current = { row: e, scroller: r, block: t };
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
    const { row: c, scroller: d, block: f } = a.current, h = c();
    h && (sn(h, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), ae(() => {
    if (!n || i !== !0 || !l.current) return;
    const c = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = a.current;
      sn(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(c);
  }, [n, i]), { engagedRef: o, engage: u };
}
const Ba = [];
function Wt(n, e) {
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
function Ha(n, e, t, r = {}) {
  var o;
  const i = Wt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Wt([...i, e], t);
}
function co(n, e, t, r, i = {}) {
  const o = Wt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), a = new Set(i.disabledIds ?? []), u = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), c = Wt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !a.has(d)).slice(0, u);
  return c.length === 0 ? o : Wt([...o, ...c], r);
}
function uo(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function _a(n, e, t) {
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
    onChange: a,
    onCommit: u,
    onToggle: c,
    onDraftChange: d
  } = n, [f, h] = re(() => Wt(t, r)), m = st(() => new Set(s ?? []), [s]), g = st(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !wn(f, t), L = se((V) => {
    if (m.has(V)) return;
    const R = g.has(V), ne = Ha(f, V, r, { max: o, disabledIds: s });
    wn(ne, f) || (h(ne), d == null || d(ne), c == null || c(V, !R));
  }, [f, g, m, r, o, s, c, d]), w = se((V) => {
    const R = V.filter((H) => !m.has(H)), ne = uo(f, R), ie = co(f, R, ne !== "all", r, { max: o, disabledIds: s });
    wn(ie, f) || (h(ie), d == null || d(ie));
  }, [f, m, r, o, s, d]), k = se((V, R = i ?? r) => {
    const ne = co(f, R, V, r, { max: o, disabledIds: s });
    wn(ne, f) || (h(ne), d == null || d(ne));
  }, [f, i, r, o, s, d]), N = se(() => {
    f.length !== 0 && (h([]), d == null || d([]));
  }, [f, d]), C = se((V) => {
    h(Wt(V ?? t, r));
  }, [t, r]), W = se(() => !u || wn(f, t) ? !1 : (u(Wt(f, r)), !0), [u, f, t, r]), J = se(() => !a || wn(f, t) ? !1 : (a(Wt(f, r)), !0), [a, f, t, r]), E = se((V) => uo(f, V), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: _a(f, r, i),
    isSelected: (V) => g.has(V),
    isDisabled: (V) => m.has(V),
    canToggle: (V) => !m.has(V) && (g.has(V) || !b),
    toggle: L,
    toggleGroup: w,
    setAll: k,
    clear: N,
    reset: C,
    commit: W,
    flush: J,
    cancel: C,
    groupState: E
  };
}
const xs = Gt(null), ja = () => Qt(xs), bs = Ba;
function zi({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
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
function Wa({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: u = "accent", block: c = !1 }) {
  const d = a !== "plain", f = We(), h = F(16, 20, f), m = F(12, 14, f), g = F(12, 14, f), b = F(12, 16, f), x = F(10, 12, f), L = F(8, 10, f);
  return /* @__PURE__ */ A(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${u === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: c ? "flex" : "inline-flex", alignItems: "center", gap: L, padding: d ? `${x}px ${b}px` : void 0 },
      onClick: (k) => k.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ p(
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
        d ? /* @__PURE__ */ p(zi, { checked: n, size: h, tone: u }) : /* @__PURE__ */ p("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ p("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ p("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ p("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
const fo = "transition-[grid-template-columns] ease-out duration-150 motion-reduce:transition-none", qa = "group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr] fine:group-hover:grid-cols-[1fr] fine:group-active:grid-cols-[1fr]", Ka = "group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr] fine:group-hover:grid-cols-[0fr] fine:group-active:grid-cols-[0fr]", Ja = "group-focus-visible:opacity-100 group-data-[state=open]:opacity-100 fine:group-hover:opacity-100 fine:group-active:opacity-100", Va = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-active:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Ya = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-active:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Ua = "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 group-data-[state=open]:opacity-100";
function Xa(n) {
  if (!ct.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function vs({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", coarseReveal: l = !1, children: a }) {
  const u = !!n, c = l && He, d = c ? " delay-200" : "", f = c ? Va : qa, h = c ? Ya : Ka, m = c ? Ua : Ja, g = u && !t, b = !!e, x = r || !b, L = !g || b && !r, w = Xa(n), [k, N] = re({ sig: w, node: n }), [C, W] = re(null);
  w !== k.sig && (N({ sig: w, node: n }), W(k.node)), ae(() => {
    if (C == null) return;
    const E = window.setTimeout(() => W(null), 200);
    return () => window.clearTimeout(E);
  }, [C]);
  const J = C == null ? n : /* @__PURE__ */ A("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ p("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: C }, `out:${k.sig}`),
    /* @__PURE__ */ p("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${w}`)
  ] });
  return u ? /* @__PURE__ */ A(ut, { children: [
    g ? /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: `grid min-w-0 ${fo}${d} ${L ? `grid-cols-[1fr] ${h}` : "grid-cols-[0fr]"}`, children: /* @__PURE__ */ p("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: J }) }) : /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: J }),
    /* @__PURE__ */ p("span", { "data-kit-label": !0, className: `grid min-w-0 ${fo}${d} ${x ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${f}`}`, children: /* @__PURE__ */ p("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ p(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${x ? "opacity-100" : `opacity-0 ${m}`} ${g ? `pl-[var(--kit-collapse-gap)] group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${c ? "group-hover:pl-0! group-active:pl-0!" : "fine:group-hover:pl-0! fine:group-active:pl-0!"} ${x ? "pl-0!" : ""}` : ""}`,
        style: g ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ A("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ p("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ p("span", { className: "col-start-1 row-start-1", children: a })
        ] }) : a
      }
    ) }) })
  ] }) : /* @__PURE__ */ p(ut, { children: a });
}
const Ph = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function Lt({
  variant: n = "subtle",
  theme: e,
  cloud: t,
  active: r = !1,
  activeTone: i = "neutral",
  iconOnly: o = !1,
  size: s = "default",
  revealOnHover: l = !1,
  keepLabelOnActive: a = !1,
  reserveLabel: u,
  iconRoll: c = "up",
  icon: d,
  collapse: f = !1,
  iconWithLabel: h = !0,
  touchReveal: m = !0,
  className: g = "",
  type: b = "button",
  children: x,
  onClick: L,
  onPointerDown: w,
  onPointerUp: k,
  onPointerCancel: N,
  disabled: C,
  ...W
}) {
  const J = Ot(), E = e ?? (J == null ? void 0 : J.mode) ?? "light", V = t ?? za(J), R = gn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), ne = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), ie = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), H = "", K = "", I = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, U = "rounded", q = "rounded-[var(--ui-radius-btn)]", O = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, G = {
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
  }, ye = {
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
  }, ve = { base: `${K} bg-[var(--ui-btn-solid-bg)] hover:bg-[var(--ui-btn-solid-hover-bg)] border border-[color:var(--ui-btn-solid-border)] hover:border-[color:var(--ui-btn-solid-hover-border)] text-[color:var(--ui-btn-solid-text)]`, open: "bg-[var(--ui-btn-solid-hover-bg)]!" }, xe = {
    light: {
      subtle: { base: `${H} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      /* The primary fill is the identity header step, mode-independent (the
         app header is always dark chrome). Read from the `data-identity-accent`
         block the button carries, so a neutral modal keeps its project CTA. */
      primary: { base: `${K} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: ve,
      /* The outline is painted as an INSET SHADOW, not a border: the button
         keeps `subtle`'s exact box (same padding + height), so the two can sit
         side by side in a toolbar without a 2px step. */
      outline: {
        base: `${H} text-zinc-700 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-900`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900"
      },
      "danger-ghost": { base: `${H} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${H} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${K} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: ve,
      outline: {
        base: `${H} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${H} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, me = W["data-state"] === "open", te = xe[E][n], be = n === "primary" || n === "solid" ? ne : n.startsWith("tab") ? ie : R, le = He ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, _ = F(6, 8, We()), D = F(28, 40, We()), j = V === "emerald" ? "emerald" : V ? "blue" : null, Re = t === "emerald" ? "emerald" : t ? "blue" : (J == null ? void 0 : J.identityAccent) ?? "zinc", ke = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", he = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let De;
  if (n === "tab") {
    const S = O[E];
    De = `${U} ${r ? j ? G[j].active : S.active : j ? G[j][E === "light" ? "inactiveLight" : "inactiveDark"] : S.inactive}`;
  } else if (n === "tab-header") {
    const S = j ? r ? ye[j].active : ye[j].inactive : r ? M.active : M.inactive;
    De = `${U} ${S} ${me ? j ? ye[j].open : M.open : ""}`;
  } else
    De = `${q} ${te.base} ${me ? te.open : ""}`, r && (De = `${De} ${i === "neutral" ? ke : he[i]}`);
  const Ce = !!d && !o, ze = o ? { width: D, height: D, padding: 0, gap: 0 } : s === "minimal" ? { ...le, gap: Ce ? 0 : _ } : { ...be, gap: Ce ? 0 : _ }, z = Li(() => {
  }, C);
  return /* @__PURE__ */ p(
    "button",
    {
      type: b,
      "data-mode": E,
      "data-accent": J == null ? void 0 : J.accent,
      "data-surface": J == null ? void 0 : J.surface,
      "data-identity-accent": Re,
      className: `${I} ${o ? "justify-center" : ""} ${Ce ? "group" : ""} ${De} ${g}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: ze,
      disabled: C,
      onPointerDown: (S) => {
        z.onPointerDown(S), w == null || w(S);
      },
      onPointerUp: (S) => {
        z.onPointerUp(S), k == null || k(S);
      },
      onPointerCancel: (S) => {
        z.onPointerCancel(), N == null || N(S);
      },
      onClick: (S) => L == null ? void 0 : L(S),
      ...W,
      children: o ? x : /* @__PURE__ */ p(
        vs,
        {
          icon: d,
          collapse: f,
          iconWithLabel: h,
          coarseReveal: m,
          active: r && (n.startsWith("tab") || a),
          gap: _,
          reserve: u,
          roll: c,
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
      children: e ? /* @__PURE__ */ p(Yl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ p(ar, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ p(zi, { checked: n, indeterminate: e, size: l })
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
  const a = We(), u = F(10, 14, a), c = F(6, 9, a), d = F(11, 13, a), f = s === "light" ? "light" : "dark", h = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ A(
    "div",
    {
      "data-selection-footer": !0,
      className: `shrink-0 flex items-center gap-2 border-t border-[color:var(--ui-menu-border)] ${l}`,
      style: {
        padding: `${c}px ${u}px`,
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
          Lt,
          {
            variant: "subtle",
            size: "minimal",
            theme: f,
            cloud: h,
            onMouseDown: (g) => g.preventDefault(),
            onClick: r,
            disabled: n === 0,
            "data-selection-clear": !0,
            children: "Clear"
          }
        ),
        i && /* @__PURE__ */ p(
          Lt,
          {
            variant: "primary",
            size: "minimal",
            theme: f,
            cloud: h,
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
const Fi = Gt("dark"), ks = () => Qt(Fi), Bi = Gt({ "data-theme": "dark" }), Ga = () => Qt(Bi);
function Hi() {
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
const Qa = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", ho = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Za = (n) => n ? "text-xs" : "text-[10px]";
function Gr(n) {
  const e = He && Qo() > 0;
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
    headerText: `${ho(e)} font-semibold uppercase tracking-wider ${Za(e)} ui-label`,
    // Item padding
    itemPad: Qa(e),
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
const _i = Gt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), ur = Gt(null), ji = () => Qt(ur), Ts = Gt({ query: "", setQuery: () => {
} }), ec = () => Qt(Ts), Cs = Gt(null), tc = () => Qt(Cs), nc = () => !0;
function Qr(n) {
  const e = v([]), [t, r] = re(-1), [i, o] = re(!1), [s, l] = re(0), a = se((f) => (e.current = [...e.current, f], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), l((h) => h + 1);
  }), []), u = se((f, h) => {
    r(f), o(h === "pointer");
  }, []), c = se(() => {
    o((f) => f && (r(-1), !1));
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
    register: a,
    setHighlighted: u,
    pointerLeave: c
  }), [t, i, s, a, u, c, n]);
}
function Es(n) {
  const e = ji(), t = v(e);
  t.current = e;
  const r = v(null);
  ae(() => {
    var a, u;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (u = t.current) == null ? void 0 : u.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Wi(n, e, t, r) {
  const i = v(-1);
  i.current = e.highlightedIndex;
  const o = v(e);
  o.current = e;
  const s = v(n);
  s.current = n;
  const l = v(r);
  l.current = r;
  const a = v({ text: "", time: 0 }), u = v(!1);
  u.current || (u.current = !0, t.current = (c) => {
    var g, b, x, L, w, k;
    if (!s.current) return;
    const d = (g = l.current) == null ? void 0 : g.onSelectAll;
    if (d && (c.metaKey || c.ctrlKey) && c.key.toLowerCase() === "a") {
      c.preventDefault(), c.stopImmediatePropagation(), d();
      return;
    }
    const f = c.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (c.key.length === 1 || c.key === "Enter" || c.key === "Escape")) {
      const N = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, c);
      (!!((L = l.current) != null && L.onFieldKey) || o.current.items.length > 0) && (c.stopImmediatePropagation(), N && c.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (c.key === "ArrowDown" || c.key === "ArrowUp") {
        c.preventDefault(), c.stopImmediatePropagation();
        const N = c.key === "ArrowDown" ? 1 : -1, C = (i.current + N + m.length) % m.length;
        o.current.setHighlighted(C, "keyboard");
      } else if (c.key === "ArrowRight") {
        c.preventDefault(), c.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].submenu && m[N].activate();
      } else if (c.key === "ArrowLeft")
        c.preventDefault(), c.stopImmediatePropagation(), (k = (w = l.current) == null ? void 0 : w.onCloseSub) == null || k.call(w);
      else if (c.key === "Enter" || c.key === " ") {
        c.preventDefault(), c.stopImmediatePropagation();
        const N = i.current;
        N >= 0 && N < m.length && m[N].activate();
      } else if (c.key.length === 1 && !c.ctrlKey && !c.metaKey && !c.altKey) {
        c.preventDefault(), c.stopImmediatePropagation();
        const N = Date.now(), C = (N - a.current.time > 500 ? "" : a.current.text) + c.key.toLowerCase();
        if (a.current = { text: C, time: N }, !C) return;
        const W = i.current + 1;
        for (let J = 0; J < m.length; J++) {
          const E = (W + J) % m.length;
          if (m[E].label.toLowerCase().startsWith(C)) {
            o.current.setHighlighted(E, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function qi(n, e, t, r, i, o, s) {
  const l = v(e);
  l.current = e;
  const a = v(n);
  a.current = n;
  const u = v(i);
  u.current = i;
  const c = v(s == null ? void 0 : s.ignoreFields);
  c.current = s == null ? void 0 : s.ignoreFields;
  const d = v(s == null ? void 0 : s.selectAll);
  d.current = s == null ? void 0 : s.selectAll;
  const f = v(!1);
  f.current || (f.current = !0, o.current = (h) => {
    if (!a.current || u.current) return;
    const m = r.current;
    if (m && m.contains(h.target)) return;
    if (d.current && (h.metaKey || h.ctrlKey) && h.key.toLowerCase() === "a") {
      h.preventDefault(), h.stopImmediatePropagation(), t.current(h);
      return;
    }
    if (c.current) {
      const b = h.target;
      if (b && b.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(h.key === "ArrowDown" || h.key === "ArrowUp" || h.key === "ArrowLeft" || h.key === "ArrowRight" || h.key === "Enter" || h.key === " " || h.key.length === 1 && !h.ctrlKey && !h.metaKey && !h.altKey) || (h.preventDefault(), h.stopImmediatePropagation(), t.current(h));
  });
}
function Ki(n, e) {
  const t = v(n);
  t.current = n;
  const r = v(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Zr({
  open: n,
  onClose: e,
  onOpenChange: t,
  trigger: r,
  align: i = "left",
  width: o,
  theme: s,
  children: l,
  morph: a = !0,
  contentClassName: u,
  maxMenuHeight: c,
  initialHighlightIndex: d,
  searchable: f = !1,
  searchPlaceholder: h,
  searchFilter: m,
  searchValue: g,
  onSearchValueChange: b,
  multiple: x
}) {
  const L = Ot(), w = ms(s, L), k = w.theme, [N, C] = re([]), [W, J] = re(null), E = Yn(), V = Ii(), R = v(null), ne = v(null), ie = v(n);
  ie.current = n;
  const [H, K] = re(n), [I, U] = re(""), q = f && g !== void 0, O = q ? g : I, G = q ? b ?? (() => {
  }) : U, M = v(g ?? "");
  ae(() => {
    n || (M.current = g ?? "");
  }, [n, g]);
  const ye = q && O === M.current ? "" : O, ve = Vl(), xe = v(null), me = We(), te = {
    padding: `${F(8, 12, me)}px ${F(12, 16, me)}px`,
    fontSize: `${F(12, 14, me)}px`
  }, [be, le] = re(0), _ = f && !q;
  ae(() => {
    var Qe;
    if (!_ || !n) return;
    const $ = (Qe = ne.current) == null ? void 0 : Qe.querySelector("[data-menu-items]");
    if (!$) return;
    const X = () => le($.offsetWidth - $.clientWidth);
    X();
    const pe = new ResizeObserver(X);
    return pe.observe($), () => pe.disconnect();
  }, [n, _, O]);
  const D = st(() => {
    if (!f) return;
    const $ = ye.trim().toLowerCase();
    return $ ? (X) => {
      var pe;
      return m ? m($, X.label, X.group) : X.label.toLowerCase().includes($) || (((pe = X.group) == null ? void 0 : pe.toLowerCase().includes($)) ?? !1);
    } : nc;
  }, [ye, f, m]), j = Qr(D), Re = f && ye.trim() !== "" && j.items.length === 0, ke = !!x, he = j.allItems.map(($) => $.itemId).filter(($) => !!$), De = j.items.map(($) => $.itemId).filter(($) => !!$), Ce = ys({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? bs,
    itemIds: he,
    visibleIds: De,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), ze = v(Ce.reset);
  ze.current = Ce.reset;
  const z = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Ce.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Ce.count}`;
  ae(() => {
    if (n)
      return K(!0), q || U(""), j.setHighlighted(d ?? -1, "keyboard"), ze.current(), hs(() => {
        t == null || t(!1), e == null || e();
      });
    C([]);
  }, [n, d, t, e]), ae(() => {
    if (!n || !V) return;
    const $ = (X) => {
      if (X.pointerType !== "touch") return;
      const pe = X.target;
      pe && (ne.current && ne.current.contains(pe) || R.current && R.current.contains(pe) || pe instanceof Element && pe.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') || (t == null || t(!1), e == null || e()));
    };
    return V.addEventListener("pointerdown", $, { capture: !0 }), () => V.removeEventListener("pointerdown", $, { capture: !0 });
  }, [n, V, t, e]);
  const S = se(() => {
    const $ = R.current;
    if (!$) return null;
    const X = $.getBoundingClientRect();
    return { left: X.left, top: X.top, width: X.width, height: X.height };
  }, []), ge = Ur({
    visible: n,
    morph: a,
    anchor: S,
    onClosed: () => K(!1)
  }), we = v(() => {
  }), $e = v(() => {
  }), at = v(() => {
  }), Se = se(($) => {
    if ($.key === "Enter") {
      const X = j.highlightedIndex, pe = j.items[X >= 0 ? X : 0];
      return pe == null || pe.activate(), !0;
    }
    return $.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [j, t, e]);
  Wi(n && N.length === 0, j, we, {
    onFieldKey: Se,
    onSelectAll: ke ? () => Ce.setAll(!0) : void 0
  }), Ki(n, $e), qi(n, j, we, ne, N.length > 0, at, {
    ignoreFields: q,
    selectAll: ke
  });
  const je = v(null), Ge = se(($) => {
    var X;
    if ($) {
      $.addEventListener("keydown", we.current, { capture: !0 }), $.addEventListener("wheel", $e.current, { passive: !1 });
      const pe = $.ownerDocument;
      je.current = pe, pe.addEventListener("keydown", at.current, { capture: !0 }), Le(!0);
    } else
      (X = je.current) == null || X.removeEventListener("keydown", at.current, { capture: !0 }), je.current = null, Le(!1);
    ne.current = $, ge($);
  }, [ge]), [Me, Zt] = re({ top: 0, left: 0, maxH: as, side: "bottom", ready: !1 }), [Jt, Ht] = re(0), [Et, Le] = re(!1);
  ae(() => {
    n && R.current && Ht(R.current.getBoundingClientRect().width);
  }, [n]), cs({
    anchorRef: R,
    panelRef: ne,
    open: n && Et,
    maxHeight: c,
    onPosition: Zt
  }), ae(() => {
    var $;
    if (Me.ready && n) {
      if (f) {
        ($ = xe.current ?? R.current) == null || $.focus();
        return;
      }
      const X = ne.current;
      X && X.ownerDocument.activeElement !== X && !X.contains(X.ownerDocument.activeElement) && X.focus();
    }
  }, [Me.ready, n, f]), ae(() => {
    if (!n || !f) return;
    if (j.items.length === 0) {
      j.highlightedIndex !== -1 && j.setHighlighted(-1, "keyboard");
      return;
    }
    const $ = j.highlightedIndex;
    ($ < 0 || $ >= j.items.length) && j.setHighlighted(0, "keyboard");
  }, [n, O, f, j.items.length]), tt(() => {
    var X;
    if (!n || j.highlightedIndex < 0 || j.pointerDriven) return;
    const $ = (X = ne.current) == null ? void 0 : X.querySelector(`[data-ei="${j.highlightedIndex}"]`);
    sn($, "nearest");
  }, [n, j.highlightedIndex, j.pointerDriven]);
  const Ve = se(($) => {
    if (!(!$ && !ie.current)) {
      if (!$ && It.current) {
        if (q) return;
        nt.current = !0;
      }
      t ? t($) : $ || e == null || e();
    }
  }, [t, e]), gt = v(H);
  gt.current = H;
  const It = v(!1), nt = v(!1), Dt = se(() => {
    if (!ie.current && gt.current) {
      if (nt.current) {
        nt.current = !1, It.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), qe = ct.isValidElement(r) ? r : null, rt = v(!1), $t = se(() => {
    const $ = R.current;
    $ && (rt.current = !0, $.focus(), setTimeout(() => {
      rt.current = !1;
    }, 0));
  }, []), yt = qe ? ct.cloneElement(qe, {
    ref: ($) => {
      R.current = $;
      const X = qe.props.ref;
      typeof X == "function" ? X($) : X && (X.current = $);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...q ? { type: qe.props.type ?? "text" } : {},
    ...q ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${ve}-content` : void 0,
      "aria-activedescendant": n && j.highlightedIndex >= 0 ? `${ve}-opt-${j.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: ($) => {
      var X, pe;
      (pe = (X = qe.props).onPointerDownCapture) == null || pe.call(X, $), It.current = !0, nt.current = !1, setTimeout(() => {
        It.current = !1;
      }, 0);
    },
    onPointerDown: ($) => {
      var X, pe;
      if ((pe = (X = qe.props).onPointerDown) == null || pe.call(X, $), q) {
        $.preventDefault();
        const Qe = ie.current;
        Qe || t == null || t(!0);
        const it = R.current;
        it == null || it.focus(), !Qe && it instanceof HTMLInputElement && it.select();
      } else !ie.current && gt.current && !nt.current && (t == null || t(!0));
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: ($) => {
      var X, pe;
      (pe = (X = qe.props).onKeyDownCapture) == null || pe.call(X, $), q && $.key === " " && $.stopPropagation();
    },
    onClick: ($) => {
      var X, pe;
      (pe = (X = qe.props).onClick) == null || pe.call(X, $), Dt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: ($) => {
      var X, pe;
      if (rt.current) {
        rt.current = !1;
        return;
      }
      (pe = (X = qe.props).onFocus) == null || pe.call(X, $);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: ($) => {
      var pe, Qe, it, St;
      if ((Qe = (pe = qe.props).onBlur) == null || Qe.call(pe, $), !q || !ie.current) return;
      const X = $.relatedTarget;
      X && ((it = ne.current) != null && it.contains(X) || (St = R.current) != null && St.contains(X)) || setTimeout(() => {
        var Z;
        const At = R.current;
        if (!At || !ie.current) return;
        const T = At.ownerDocument.activeElement;
        T && (At.contains(T) || (Z = ne.current) != null && Z.contains(T)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: ($) => {
      var X, pe;
      if ((pe = (X = qe.props).onKeyDown) == null || pe.call(X, $), !(!q || !ie.current)) {
        if ($.key === "ArrowDown" || $.key === "ArrowUp") {
          $.preventDefault();
          const Qe = j.items;
          if (Qe.length === 0) return;
          const it = $.key === "ArrowDown" ? 1 : -1, St = (j.highlightedIndex + it + Qe.length) % Qe.length;
          j.setHighlighted(St, "keyboard");
        } else if ($.key === "Enter") {
          $.preventDefault();
          const Qe = j.highlightedIndex, it = j.items[Qe >= 0 ? Qe : 0];
          it == null || it.activate();
        }
      }
    }
  }) : r, Mt = /* @__PURE__ */ A("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ A("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      ye.trim(),
      "”"
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), _t = _ || ke, Ke = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${_t ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ A(_e.Root, { open: n || H, onOpenChange: Ve, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: yt }),
    /* @__PURE__ */ p(_e.Portal, { container: E ?? void 0, children: /* @__PURE__ */ p(Fi.Provider, { value: k, children: /* @__PURE__ */ p(Bi.Provider, { value: w.attrs, children: /* @__PURE__ */ p(_i.Provider, { value: { chain: N, setChain: C, morph: a, keyboardOpened: W, setKeyboardOpened: J }, children: /* @__PURE__ */ p(ur.Provider, { value: j, children: /* @__PURE__ */ p(Ts.Provider, { value: { query: O, setQuery: G }, children: /* @__PURE__ */ p(xs.Provider, { value: ke ? Ce : null, children: /* @__PURE__ */ p(Cs.Provider, { value: ve, children: /* @__PURE__ */ A(
      _e.Content,
      {
        id: `${ve}-content`,
        ref: Ge,
        tabIndex: q ? void 0 : -1,
        ...w.attrs,
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
          minWidth: o ? void 0 : Jt || void 0,
          maxHeight: Me.maxH,
          visibility: Me.ready ? "visible" : "hidden"
        },
        onPointerLeave: j.pointerLeave,
        onPointerDownOutside: ($) => {
          const X = $.target;
          X != null && X.closest('[role="menu"], [data-radix-menu-content]') && $.preventDefault(), X && R.current && R.current.contains(X) && $.preventDefault();
        },
        onInteractOutside: ($) => {
          $.type === "dismissableLayer.focusOutside" && N.length > 0 && $.preventDefault();
        },
        onFocusCapture: q ? ($) => {
          $.target === $.currentTarget && ($.stopPropagation(), $t());
        } : void 0,
        onFocusOutside: q ? ($) => {
          var pe;
          const X = $.target;
          X && (X === R.current || (pe = R.current) != null && pe.contains(X)) && $.preventDefault();
        } : void 0,
        onCloseAutoFocus: q ? ($) => {
          $.preventDefault(), $t();
        } : void 0,
        children: [
          _ && /* @__PURE__ */ p("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: be }, children: /* @__PURE__ */ A("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: te, children: [
            /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: xe,
                value: O,
                onChange: ($) => G($.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            O ? /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: ($) => $.stopPropagation(),
                onClick: () => {
                  var $;
                  G(""), ($ = xe.current) == null || $.focus();
                },
                children: /* @__PURE__ */ p(Tn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ p("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          _t ? /* @__PURE__ */ A("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Re && Mt
          ] }) : /* @__PURE__ */ A(ut, { children: [
            l,
            Re && Mt
          ] }),
          ke && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ p(
            ws,
            {
              count: Ce.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Ce.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: k,
              onClear: Ce.clear,
              hero: {
                label: z,
                onClick: () => {
                  Ce.commit(), Ve(!1);
                },
                disabled: Ce.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function rc({
  item: n,
  isActive: e,
  itemSize: t,
  itemRender: r,
  closeOnSelect: i,
  onSelect: o,
  d: s
}) {
  const l = Li(() => o(n.id));
  return /* @__PURE__ */ p(
    _e.Item,
    {
      style: t,
      className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${s.rowText} ${e ? "" : s.rowTextHover}`,
      onSelect: (a) => {
        if (l.takeGhost()) {
          a.preventDefault();
          return;
        }
        if (l.suppressSelect()) {
          i || a.preventDefault();
          return;
        }
        i || a.preventDefault(), o(n.id);
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
function Oh({
  open: n,
  onClose: e,
  items: t,
  activeId: r,
  onSelect: i,
  onRename: o,
  onDuplicate: s,
  onDelete: l,
  onCreate: a,
  onImport: u,
  onExport: c,
  onReset: d,
  onTrash: f,
  closeOnSelect: h,
  readOnly: m = !1,
  theme: g,
  align: b,
  label: x,
  header: L,
  itemLabel: w,
  trigger: k,
  minItems: N = 1,
  itemRender: C,
  morph: W = !0,
  contentClassName: J
}) {
  const E = Gr(), V = Hi(), [R, ne] = re(null), [ie, H] = re(""), K = v(ie);
  K.current = ie;
  const I = v(null), U = v(null), [q, O] = re(null), G = se((te) => {
    U.current = te, O(te);
  }, []), M = gs({
    open: n,
    scroller: () => U.current,
    row: () => {
      var te;
      return ((te = U.current) == null ? void 0 : te.querySelector('[data-active="1"]')) ?? null;
    }
  });
  ae(() => {
    if (!n) return;
    const te = (le) => {
      var De, Ce;
      const _ = le.target;
      if (_ && _.closest("input, textarea, [contenteditable]")) {
        R && _ === I.current && (le.key === "Enter" ? (le.preventDefault(), le.stopImmediatePropagation(), ve()) : le.key === "Escape" && (le.preventDefault(), le.stopImmediatePropagation(), xe()));
        return;
      }
      const D = (De = U.current) == null ? void 0 : De.closest(".ui-menu");
      if (!D || !D.contains(le.target)) return;
      const j = D.ownerDocument, Re = [...D.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], ke = [...D.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], he = [...Re, ...ke];
      if (le.key === "ArrowDown" || le.key === "ArrowUp") {
        le.preventDefault(), le.stopImmediatePropagation();
        const ze = j.activeElement;
        let z = ze ? he.indexOf(ze) : -1;
        if (z < 0 && ze) {
          const $e = ze.closest("[data-im-row]"), at = $e == null ? void 0 : $e.querySelector('[role="menuitem"]:first-child');
          at && (z = Re.indexOf(at));
        }
        const S = le.key === "ArrowDown" ? 1 : -1, ge = z < 0 ? S === 1 ? 0 : he.length - 1 : (z + S + he.length) % he.length, we = he[ge];
        we == null || we.focus({ preventScroll: !0 }), sn((we == null ? void 0 : we.closest("[data-im-row]")) ?? we, "nearest", U.current);
        return;
      }
      if (le.key === "ArrowLeft" || le.key === "ArrowRight") {
        const ze = j.activeElement, z = ze == null ? void 0 : ze.closest("[data-im-row]");
        if (!z) return;
        le.preventDefault(), le.stopImmediatePropagation();
        const S = [...z.querySelectorAll('[role="menuitem"]')].slice(1);
        if (S.length === 0) return;
        const ge = ze && z.contains(ze) ? S.indexOf(ze) : -1, we = le.key === "ArrowRight" ? 1 : -1, $e = ge < 0 ? 0 : (ge + we + S.length) % S.length;
        (Ce = S[$e]) == null || Ce.focus({ preventScroll: !0 });
        return;
      }
    }, be = (q == null ? void 0 : q.ownerDocument) ?? null;
    return be == null || be.addEventListener("keydown", te, { capture: !0 }), () => be == null ? void 0 : be.removeEventListener("keydown", te, { capture: !0 });
  }, [n, R, q]), ae(() => {
    if (!R) return;
    const te = t.find((D) => D.id === R);
    te && !ie && H(te.name);
    const be = requestAnimationFrame(() => {
      const D = I.current;
      D && (D.focus(), D.select());
    });
    let le = 0;
    const _ = window.setInterval(() => {
      const D = I.current;
      if (le++, !D || le > 12) {
        clearInterval(_);
        return;
      }
      D.ownerDocument.activeElement !== D && (D.focus(), D.select());
    }, 50);
    return () => {
      cancelAnimationFrame(be), clearInterval(_);
    };
  }, [R]), ae(() => {
    if (R) {
      const te = t.find((be) => be.id === R);
      te && !ie && H(te.name);
    }
  }, [R, t]);
  const ye = (te, be) => {
    ne(te), H(be);
  }, ve = () => {
    R && K.current.trim() && o(R, K.current.trim()), ne(null);
  }, xe = () => {
    ne(null);
  }, me = w || L.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ A(Zr, { open: n, onOpenChange: (te) => {
    te ? (ne(null), H("")) : (R && ie.trim() && o(R, ie.trim()), ne(null), H("")), (!te || !m) && e(te);
  }, width: "w-80", theme: g, align: b, trigger: k, morph: W, contentClassName: J, children: [
    /* @__PURE__ */ p("div", { className: `shrink-0 ${E.headerText}`, children: L }),
    /* @__PURE__ */ p("div", { ref: G, "data-im-list": !0, onPointerEnter: M.engage, onPointerDown: M.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((te) => {
      const be = te.id === r, le = R === te.id;
      return /* @__PURE__ */ p("div", { "data-im-row": te.id, "data-active": be ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${be || le ? E.rowActiveBg : E.rowHoverBg} ${R && !le ? "opacity-40 pointer-events-none" : ""}`, children: le ? /* @__PURE__ */ A(ut, { children: [
        /* @__PURE__ */ p("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ p(
          "input",
          {
            ref: I,
            autoFocus: !0,
            value: ie,
            onChange: (_) => H(_.target.value),
            onKeyDown: (_) => {
              _.key === "Enter" && (_.preventDefault(), _.stopPropagation(), ve()), _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), xe());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: V
          }
        ) }),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${E.editConfirm}`,
            onSelect: (_) => {
              _.preventDefault(), ve();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(ar, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${E.editCancel}`,
            onSelect: (_) => {
              _.preventDefault(), xe();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(Tn, { className: E.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ A(ut, { children: [
        /* @__PURE__ */ p(
          rc,
          {
            item: te,
            isActive: be,
            itemSize: V,
            itemRender: C,
            closeOnSelect: h,
            onSelect: i,
            d: E
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${be ? E.btnActive : E.btnBase}`,
            onSelect: (_) => {
              _.preventDefault(), ye(te.id, te.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Ul, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${be ? E.btnActive : E.btnBase}`,
            onSelect: (_) => {
              _.preventDefault();
              const D = s(te.id);
              D && ye(D, `${te.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Jo, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= N ? E.btnDisabled : be ? E.btnDangerActive : E.btnDanger}`,
            onSelect: (_) => {
              _.preventDefault(), l(te.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= N,
            children: /* @__PURE__ */ p(xi, { className: E.btnIcon })
          }
        )
      ] }) }, te.id);
    }) }),
    /* @__PURE__ */ A("div", { className: `shrink-0 ${R ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ A(ut, { children: [
        /* @__PURE__ */ p(_e.Separator, { className: E.separator }),
        /* @__PURE__ */ A(
          _e.Item,
          {
            className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
            onSelect: (te) => {
              te.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ p(Vo, { className: `${E.btnIcon} ${E.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || u || c || f) && /* @__PURE__ */ p(_e.Separator, { className: E.separator }),
      a && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (te) => {
            te.preventDefault();
            const be = a();
            be && ye(be, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(Jr, { className: `${E.btnIcon} ${E.icon}` }),
            "New ",
            me
          ]
        }
      ),
      u && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (te) => {
            te.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ A("svg", { className: `${E.btnIcon} ${E.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      c && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (te) => {
            te.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ A("svg", { className: `${E.btnIcon} ${E.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ A(
        _e.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (te) => {
            te.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(xi, { className: `${E.btnIcon} ${E.icon}` }),
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
  rightAction: a,
  trailing: u,
  group: c,
  itemId: d
}) {
  var O;
  ks();
  const f = Gr(), h = Hi(), m = Ss(), g = v(!1), b = v(null), x = ja(), L = !!x && d !== void 0, w = x && d !== void 0 ? x.isSelected(d) : l, k = t || (x && d !== void 0 ? !x.canToggle(d) : !1), N = () => {
    k || (x && d !== void 0 ? x.toggle(d) : n());
  }, C = Li(N, k), { myIndex: W, highlighted: J, setPointer: E, api: V } = Es({
    label: () => Ns(o),
    activate: N,
    disabled: k,
    group: c,
    itemId: d
  }), { query: R } = ec(), ne = R.trim() !== "" && W < 0, ie = tc(), H = c == null ? void 0 : c.trim(), K = !!H && W >= 0 && (W === 0 || ((O = V == null ? void 0 : V.items[W - 1]) == null ? void 0 : O.group) !== H), I = H && x ? ((V == null ? void 0 : V.items) ?? []).filter((G) => G.group === H && G.itemId).map((G) => G.itemId).filter((G) => !x.isDisabled(G)) : [], U = x && I.length > 0 ? x.groupState(I) : "none", q = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ A(ut, { children: [
    K && /* @__PURE__ */ p(
      "div",
      {
        "data-menu-group": H,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && I.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && I.length > 0 ? /* @__PURE__ */ A("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${H}`,
              onMouseDown: (G) => G.preventDefault(),
              onClick: () => x.toggleGroup(I),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ p(
                Pr,
                {
                  checked: U === "all",
                  indeterminate: U === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: H })
        ] }) : H
      }
    ),
    /* @__PURE__ */ A(
      _e.Item,
      {
        ref: b,
        id: ie && W >= 0 ? `${ie}-opt-${W}` : void 0,
        "data-ei": W >= 0 ? W : void 0,
        ...L ? { role: "menuitemcheckbox", "aria-checked": w } : {},
        style: { ...h, display: ne ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${q} ${L ? "" : l ? "ui-item-selected" : ""} ${J ? "ui-item-highlighted" : ""} ${k ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (G) => {
          if (g.current) {
            g.current = !1;
            return;
          }
          if (C.takeGhost()) {
            G.preventDefault();
            return;
          }
          if (C.suppressSelect()) {
            (s || L) && G.preventDefault();
            return;
          }
          if (L) {
            G.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && G.preventDefault(), n();
        },
        onClick: C.onClick,
        onPointerDown: C.onPointerDown,
        onPointerUp: C.onPointerUp,
        onPointerCancel: C.onPointerCancel,
        onPointerEnter: () => {
          E(W);
        },
        onTouchStart: () => {
        },
        disabled: k,
        children: [
          L && /* @__PURE__ */ p(Pr, { checked: w, disabled: k, indicator: x.indicator }),
          e && /* @__PURE__ */ p("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: o }),
          u && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: u }),
          a && /* @__PURE__ */ p(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: a.title,
              onPointerDown: (G) => {
                G.stopPropagation(), G.preventDefault(), g.current = !0, a.onClick();
              },
              onPointerUp: (G) => G.stopPropagation(),
              onClick: (G) => {
                G.stopPropagation(), G.preventDefault();
              },
              children: a.icon
            }
          )
        ]
      }
    )
  ] });
}
function ic({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s, touchPresentation: l }) {
  const { chain: a, setChain: u, morph: c, keyboardOpened: d, setKeyboardOpened: f } = Qt(_i), h = a.includes(n), m = l ?? "replace", g = He && m === "accordion", b = He && m === "replace", x = a[a.length - 1] === n;
  ks();
  const L = Ga(), w = Yn(), k = v(null), N = v(null), C = v(null), W = v(0), J = v(0), E = v(null), [V, R] = re(h), [ne, ie] = re(!1), H = !h && V;
  ae(() => {
    h && R(!0);
  }, [h]);
  const K = () => u((z) => {
    const S = z.indexOf(n);
    return S >= 0 ? z.slice(0, S) : z;
  }), I = (z, S) => {
    var je;
    const ge = (je = k.current) == null ? void 0 : je.ownerDocument;
    if (!ge) return;
    let we = 0;
    const $e = () => {
      ge.removeEventListener("click", at, !0), ge.removeEventListener("pointerdown", Se, !0), we && window.clearTimeout(we);
    }, at = (Ge) => {
      if (Math.hypot(Ge.clientX - z, Ge.clientY - S) > 14) {
        $e();
        return;
      }
      const Me = Ge.target;
      if (Me != null && Me.closest('[role="menuitem"]')) {
        $e();
        return;
      }
      Ge.preventDefault(), Ge.stopImmediatePropagation(), $e();
    }, Se = () => $e();
    ge.addEventListener("click", at, !0), ge.addEventListener("pointerdown", Se, !0), we = window.setTimeout($e, 600);
  }, U = () => {
    if (b && Hn(c)) {
      const z = N.current, S = C.current;
      if (z && S && z.isConnected && S.isConnected) {
        const ge = z.getBoundingClientRect();
        delete S.dataset.submenuOpen, delete S.dataset.submenuInert, z.style.visibility = "hidden", Lr(J, S, ge);
      }
    }
    K();
  }, q = Qr(), O = ji(), G = v(O);
  G.current = O;
  const M = v(null);
  ae(() => {
    var S;
    const z = {
      label: e,
      activate: () => {
        f(n), u((ge) => ge.includes(n) ? ge : [...ge, n]);
      },
      submenu: !0
    };
    return M.current = z, (S = G.current) == null ? void 0 : S.register(z);
  }, []);
  const ye = O && M.current ? O.items.indexOf(M.current) : -1, ve = ye >= 0 && ye === O.highlightedIndex, xe = se(() => {
    const z = k.current;
    if (!z) return null;
    const S = z.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), me = Ur({
    visible: h,
    /* Replace owns the transition (FLIP via playRectMorph on both edges);
       the generic scale/fade would fight it. Desktop side flyouts keep it. */
    morph: c && !b,
    anchor: xe,
    onClosed: () => R(!1)
  }), te = v(() => {
  }), be = v(() => {
  }), le = v(() => {
  });
  Wi(h && x, q, te, {
    onCloseSub: () => {
      U(), O && ye >= 0 && O.setHighlighted(ye, "keyboard");
    }
  });
  const _ = v(d);
  _.current = d, ae(() => {
    h && (_.current === n ? (q.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var z;
      return (z = N.current) == null ? void 0 : z.focus();
    }), f(null)) : q.setHighlighted(-1, "keyboard"));
  }, [h]), Ki(h, be), qi(h, q, te, N, !x, le), ae(() => {
    if (!g || !h) return;
    const z = k.current, S = (z == null ? void 0 : z.closest("[data-submenu-panel]")) ?? (z == null ? void 0 : z.closest('[role="menu"]'));
    if (S)
      return S.dataset.submenuOpen = "accordion", () => {
        delete S.dataset.submenuOpen;
      };
  }, [g, h]);
  const [D, j] = re(null);
  tt(() => {
    if (!h || !He || g) {
      j(null);
      return;
    }
    const z = k.current, S = z == null ? void 0 : z.closest('[role="menu"]');
    if (!z || !S) return;
    C.current = S;
    const ge = z.getBoundingClientRect(), we = S.getBoundingClientRect(), $e = parseInt(getComputedStyle(S).zIndex, 10) || 0;
    j({
      presentation: "replace",
      sideOffset: we.left - ge.right,
      alignOffset: we.top - ge.top,
      width: we.width,
      childZ: $e + 2
    }), S.dataset.submenuOpen = "replace", N.current && Hn(c) && (N.current.style.visibility = "hidden");
    const at = window.setTimeout(() => {
      S.isConnected && (S.dataset.submenuInert = "replace");
    }, 320);
    return () => {
      window.clearTimeout(at), delete S.dataset.submenuOpen, delete S.dataset.submenuInert, C.current === S && (C.current = null);
    };
  }, [h, m]), tt(() => {
    if (!h || !b || !D || !ne || !Hn(c)) return;
    const z = N.current, S = C.current;
    if (!z || !S) return;
    z.style.visibility = "hidden";
    let ge = 0, we = 0;
    return ge = requestAnimationFrame(() => {
      we = requestAnimationFrame(() => {
        if (!z.isConnected || !S.isConnected) return;
        const $e = S.getBoundingClientRect();
        !$e.width || !$e.height || (z.style.visibility = "visible", Lr(W, z, $e));
      });
    }), () => {
      cancelAnimationFrame(ge), cancelAnimationFrame(we);
    };
  }, [h, b, D, ne]), ct.useLayoutEffect(() => {
    var S;
    if (!h || q.highlightedIndex < 0 || q.pointerDriven) return;
    const z = (S = N.current) == null ? void 0 : S.querySelector(`[data-ei="${q.highlightedIndex}"]`);
    sn(z, "nearest", N.current);
  }, [h, q.highlightedIndex, q.pointerDriven]);
  const Re = v(null), ke = se((z) => {
    var S;
    if (z) {
      z.addEventListener("keydown", te.current, { capture: !0 }), z.addEventListener("wheel", be.current, { passive: !1 });
      const ge = z.ownerDocument;
      Re.current = ge, ge.addEventListener("keydown", le.current, { capture: !0 });
    } else
      (S = Re.current) == null || S.removeEventListener("keydown", le.current, { capture: !0 }), Re.current = null;
    N.current = z, ie(!!z), me(z);
  }, [me]), he = We(), De = { padding: `${F(8, 12, he)}px ${F(12, 16, he)}px`, fontSize: F(12, 14, he) }, Ce = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${ve ? " ui-item-highlighted" : ""}${H ? " ui-sub-closing" : ""}`, ze = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ A(_e.Sub, { open: h || V, onOpenChange: (z) => u((S) => {
    if (!z) {
      const ge = S.indexOf(n);
      return ge >= 0 ? S.slice(0, ge) : S;
    }
    return S.includes(n) ? S : [...S, n];
  }), children: [
    /* @__PURE__ */ A(
      _e.SubTrigger,
      {
        ref: k,
        "data-ei": ye >= 0 ? ye : void 0,
        "data-submenu-header": He ? "true" : void 0,
        style: De,
        className: Ce,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          O && ye >= 0 && O.setHighlighted(ye, "pointer");
        },
        onPointerDown: (z) => {
          z.pointerType === "pen" ? (z.preventDefault(), u((S) => h ? S.slice(0, S.indexOf(n)) : [...S, n])) : b && z.pointerType === "touch" && (E.current = { x: z.clientX, y: z.clientY });
        },
        onPointerUp: (z) => {
          if (!b || z.pointerType !== "touch") return;
          const S = E.current;
          E.current = null, !(!S || h) && (Math.hypot(z.clientX - S.x, z.clientY - S.y) > 8 || (f(null), I(z.clientX, z.clientY), u((ge) => ge.includes(n) ? ge : [...ge, n])));
        },
        onPointerCancel: () => {
          E.current = null;
        },
        onClick: (z) => {
          if (ds(z.currentTarget, z)) {
            z.preventDefault();
            return;
          }
          !g || !h || (z.preventDefault(), z.stopPropagation(), U());
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
    g && h && /* The accordion body: rendered INLINE in the parent card, below the
    reordered header row. No portal, no positioning — the card simply
    grows and the panel fades/slides in. */
    /* @__PURE__ */ p("div", { "data-submenu-panel": !0, className: "ui-submenu-panel", children: o }),
    !g && /* @__PURE__ */ p(_e.Portal, { container: w ?? void 0, children: /* @__PURE__ */ p(
      _e.SubContent,
      {
        ref: ke,
        ...L,
        "data-submenu-presentation": D == null ? void 0 : D.presentation,
        className: ze,
        align: D ? "start" : void 0,
        sideOffset: D ? D.sideOffset : 8,
        alignOffset: D ? D.alignOffset : -4,
        collisionPadding: 8,
        style: D ? { width: D.width, zIndex: D.childZ } : void 0,
        onPointerLeave: q.pointerLeave,
        onFocusOutside: (z) => {
          const S = z.target;
          S != null && S.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') && z.preventDefault();
        },
        children: /* @__PURE__ */ A(ur.Provider, { value: q, children: [
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
                  onClick: U,
                  icon: /* @__PURE__ */ p(Yo, { className: "h-3.5 w-3.5 shrink-0" }),
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
const Dn = 8, zh = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const a = Ot(), u = s ? { theme: s, attrs: { "data-theme": s } } : a ? ms(void 0, a) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: c } = u, d = We(), f = F(12, 14, d), h = v(null), m = cr(), [g, b] = re(!1), [x, L] = re([]), [w, k] = re(null), N = Qr();
  ae(() => {
    if (n)
      return N.setHighlighted(-1, "keyboard"), hs(r);
  }, [n, r]);
  const C = v({ left: e, top: t });
  n && (C.current = { left: e, top: t });
  const W = se(() => ({ left: C.current.left, top: C.current.top, width: 0, height: 0 }), []), J = Ur({
    visible: !0,
    morph: l,
    anchor: W,
    cloneOnUnmount: !0
  }), E = v(() => {
  }), V = v(() => {
  }), R = v(() => {
  });
  Wi(n, N, E), tt(() => {
    if (!n || N.highlightedIndex < 0 || N.pointerDriven) return;
    const I = h.current;
    sn(
      I == null ? void 0 : I.querySelector(`[data-ei="${N.highlightedIndex}"]`),
      "nearest",
      I
    );
  }, [n, N.highlightedIndex, N.pointerDriven]), Ki(n, V), qi(n, N, E, h, x.length > 0, R);
  const ne = v(null), ie = se((I) => {
    var U;
    if (I) {
      I.addEventListener("keydown", E.current, { capture: !0 }), I.addEventListener("wheel", V.current, { passive: !1 });
      const q = I.ownerDocument;
      ne.current = q, q.addEventListener("keydown", R.current, { capture: !0 });
    } else
      (U = ne.current) == null || U.removeEventListener("keydown", R.current, { capture: !0 }), ne.current = null;
    h.current = I, b(!!I), J(I);
  }, [J]), [H, K] = re(null);
  return tt(() => {
    var _;
    if (!n || !g || !h.current) return;
    const I = h.current, U = I.offsetWidth, q = I.offsetHeight, O = m ?? null, G = O ? ss(O) : { x: 0, y: 0, width: 0, height: 0 }, M = O ? ls(O.document) : { left: 0, right: 0, top: 0, bottom: 0 }, ye = (_ = o == null ? void 0 : o.current) == null ? void 0 : _.getBoundingClientRect(), ve = (ye ? ye.right : G.x + G.width) - M.right, xe = (ye ? ye.bottom : G.y + G.height) - M.bottom, me = (ye ? ye.left : G.x) + M.left, te = (ye ? ye.top : G.y) + M.top;
    let be = Math.max(te + Dn, C.current.top), le = Math.max(me + Dn, C.current.left);
    le + U > ve && (le = Math.max(me + Dn, ve - U - Dn)), be + q > xe && (be = Math.max(te + Dn, xe - q - Dn)), K({ left: le, top: be });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ A(_e.Root, { open: n, onOpenChange: (I) => {
    I || r();
  }, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: /* @__PURE__ */ p("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ p(_e.Portal, { children: /* @__PURE__ */ p(Fi.Provider, { value: c, children: /* @__PURE__ */ p(Bi.Provider, { value: u.attrs, children: /* @__PURE__ */ p(_i.Provider, { value: { chain: x, setChain: L, morph: l, keyboardOpened: w, setKeyboardOpened: k }, children: /* @__PURE__ */ p(ur.Provider, { value: N, children: /* @__PURE__ */ p(
      _e.Content,
      {
        ref: ie,
        ...u.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: {
          fontSize: f,
          left: (H == null ? void 0 : H.left) ?? C.current.left,
          top: (H == null ? void 0 : H.top) ?? C.current.top,
          touchAction: "manipulation"
        },
        onPointerLeave: N.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, Fh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = We(), a = { padding: `${F(8, 12, l)}px ${F(12, 16, l)}px`, fontSize: F(12, 14, l) }, u = ji(), c = v(u);
  c.current = u;
  const d = v(null), f = fs();
  ae(() => {
    var b;
    const g = { label: Ns(s), activate: () => {
      r || n();
    } };
    return d.current = g, (b = c.current) == null ? void 0 : b.register(g);
  }, []);
  const h = u && d.current ? u.items.indexOf(d.current) : -1, m = !r && h >= 0 && h === u.highlightedIndex;
  return /* @__PURE__ */ A(
    _e.Item,
    {
      "data-ei": h >= 0 ? h : void 0,
      onClick: (g) => {
        if (!r) {
          if (f.takeGhost()) {
            g.preventDefault();
            return;
          }
          n();
        }
      },
      onPointerEnter: () => {
        !r && u && h >= 0 && u.setHighlighted(h, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: a,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${m ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Bh = () => /* @__PURE__ */ p(_e.Separator, { className: "ui-sep my-1" }), Hh = (n) => /* @__PURE__ */ p(ic, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Be = 8, As = "[data-modal-stack]", Mr = 0.94;
function $n() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function fn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function oc(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Mr})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${kt}ms ${xn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, kt + 60));
    });
  });
}
function po(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Mr, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Mr, height: i.height * Mr };
  e.style.transition = `transform ${kt}ms ${xn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ns(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, kt + 60);
}
function li(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(As) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function xr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(As) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function sc({
  open: n,
  onClose: e,
  title: t,
  icon: r,
  width: i,
  footer: o,
  children: s,
  onReset: l,
  morph: a = !0,
  flat: u = !1,
  closable: c = !0,
  dismissOnBackdrop: d = !0,
  theme: f,
  surface: h,
  accent: m
}) {
  const g = Ot(), b = Pi(
    { mode: f, accent: m, surface: h, context: "surface" },
    g
  ), x = b.mode, L = b.surface, w = b.accent, k = v(null), N = v(null), C = v(null), W = We(), J = F(20, 24, W), E = F(10, 12, W), V = F(12, 14, W), R = F(14, 16, W), ne = F(20, 24, W), ie = F(20, 24, W), H = F(20, 24, W), K = F(14, 16, W), I = F(16, 20, W), U = F(10, 12, W), q = F(12, 14, W), O = F(8, 10, W), G = F(4, 6, W), M = { padding: `${E}px ${J}px` }, ye = { fontSize: V }, ve = { padding: `${ie}px ${ne}px 16px ${ne}px` }, xe = { fontSize: R }, me = { padding: `0 ${ne}px 16px` }, te = { padding: `${H}px ${ne}px` }, be = { fontSize: U, padding: `${G}px ${O}px` }, [le, _] = re(!1), D = se((T) => {
    k.current = T, _(T !== null);
  }, []), j = Yn(), Re = cr(), ke = v(Re);
  ke.current = Re;
  const [he, De] = re(null), Ce = v(null), ze = v(!1), z = v(!1), S = v(0), ge = v({ w: 0, h: 0 }), we = v(!1), [$e, at] = re(!1), [Se, je] = re(!1), Ge = v(0), Me = v(!1), [Zt, Jt] = re(!1), Ht = v(a);
  Ht.current = a;
  const Et = v(!1), Le = v(!1), Ve = () => {
    Le.current = !0, at(!0);
  }, gt = () => {
    Le.current = !1, at(!1);
  };
  ae(() => {
    n || (De(null), we.current = !1, ze.current = !1, je(!1));
  }, [n]), tt(() => {
    if (!n || we.current || !le || !k.current) return;
    we.current = !0;
    const T = k.current.getBoundingClientRect(), Z = ke.current ?? null, ce = (Z == null ? void 0 : Z.innerWidth) ?? 0, oe = fn(Z);
    De({
      left: Math.max(Be, Math.min((ce - T.width) / 2, ce - T.width - Be)),
      top: Math.max(oe.top + Be, Math.min(oe.top + (oe.height - T.height) / 2, oe.bottom - T.height - Be))
    });
  }, [n, le]), tt(() => {
    if (!n || !le || !a || $n() || !k.current) return;
    const T = k.current, Z = li(T), ce = Z[Z.length - 1];
    Ve(), ce ? Lr(Ge, T, ce.getBoundingClientRect(), gt) : oc(Ge, T, gt);
  }, [n, le]);
  const It = se(() => {
    if (!c || Me.current) return;
    const T = k.current, Z = !!T && li(T).length > 0;
    if (!T || !a || $n() || Z) {
      e();
      return;
    }
    Me.current = !0, Jt(!0), Et.current = !0, Ve(), po(Ge, T, () => {
      Me.current = !1, Jt(!1), gt(), e();
    });
  }, [a, e, c]), nt = se(() => {
    const T = k.current;
    if (!T || Et.current || !Ht.current || $n() || li(T).length > 0) return;
    const Z = T.ownerDocument, ce = T.cloneNode(!0);
    ce.removeAttribute("data-modal-stack"), ce.removeAttribute("data-state"), ce.removeAttribute("role"), ce.removeAttribute("data-aria-hidden"), ce.removeAttribute("tabindex"), ce.setAttribute("aria-hidden", "true"), ce.style.pointerEvents = "none", Z.body.appendChild(ce), po({ current: 0 }, ce, () => {
      ce.isConnected && ce.remove();
    });
  }, []);
  tt(() => () => nt(), [nt]);
  const Dt = v(n);
  tt(() => {
    const T = Dt.current;
    Dt.current = n, T && !n && nt();
  }, [n, le, nt]), ae(() => {
    if (!n || !le || !a || !k.current) return;
    const T = k.current, Z = T.parentNode;
    if (!Z) return;
    let ce = 0, oe = null, Te = !1;
    const Pe = () => {
      ce = 0;
      const Oe = xr(T);
      if (Oe.length > 0)
        T.style.opacity = "", T.style.pointerEvents = "", oe = Oe[Oe.length - 1].getBoundingClientRect(), Te = !0, ce = requestAnimationFrame(Pe);
      else if (Te) {
        Te = !1, oe && !$n() && (Ve(), Lr(Ge, T, oe, gt)), oe = null;
        const Ie = ke.current ?? null;
        Ie == null || Ie.setTimeout(() => {
          !T || !T.isConnected || getComputedStyle(T).opacity !== "1" && (T.style.opacity = "1", T.style.pointerEvents = "");
        }, 240);
      }
    }, Je = new MutationObserver(() => {
      !ce && xr(T).length > 0 && (ce = requestAnimationFrame(Pe));
    });
    return Je.observe(Z, { childList: !0 }), () => {
      Je.disconnect(), ce && cancelAnimationFrame(ce);
    };
  }, [n, le]), ae(() => {
    if (!le || !a || $n() || !k.current) return;
    const T = k.current;
    let Z = Math.round(T.getBoundingClientRect().height), ce = !1;
    const oe = new ResizeObserver(() => {
      if (!T.isConnected) return;
      const Te = Math.round(T.getBoundingClientRect().height);
      if (!ce) {
        ce = !0, Z = Te;
        return;
      }
      if (Math.abs(Te - Z) < 1) return;
      if (Ce.current || Me.current || xr(T).length > 0) {
        Z = Te;
        return;
      }
      if (Le.current) return;
      const Pe = Z;
      Z = Te, Ve();
      const Je = T.getBoundingClientRect(), Oe = fn(ke.current ?? null), Ie = !ze.current && !z.current, ht = Ie ? Oe.top + (Oe.height - Pe) / 2 : Je.top, ot = Ie ? Oe.top + (Oe.height - Te) / 2 : Je.top;
      T.style.transition = "none", T.style.height = `${Pe}px`, Ie && (T.style.top = `${ht}px`), N.current && (N.current.style.overflow = "hidden"), T.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          T.style.height === `${Pe}px` && (T.style.transition = `height ${kt}ms ${xn}${Ie ? `, top ${kt}ms ${xn}` : ""}`, T.style.height = `${Te}px`, Ie && (T.style.top = `${ot}px`), window.setTimeout(() => {
            T.style.height === `${Te}px` && (T.style.transition = "", T.style.height = "", N.current && (N.current.style.overflow = ""), Ie && De({ left: Je.left, top: ot }), gt());
          }, kt + 60));
        });
      });
    });
    return oe.observe(T), () => oe.disconnect();
  }, [le]), ae(() => {
    if (!le || !k.current || a && !$n()) return;
    const T = k.current, Z = new ResizeObserver(() => {
      if (!T.isConnected || Ce.current || Me.current || z.current || xr(T).length > 0) return;
      const ce = ke.current ?? null, oe = fn(ce), Te = (ce == null ? void 0 : ce.innerWidth) ?? 0, Pe = T.getBoundingClientRect(), Je = Math.max(oe.top + Be, Math.min(Pe.top, oe.bottom - Pe.height - Be)), Oe = Math.max(Be, Math.min(Pe.left, Te - Pe.width - Be));
      (Math.abs(Je - Pe.top) > 0.5 || Math.abs(Oe - Pe.left) > 0.5) && De({ left: Oe, top: Je });
    });
    return Z.observe(T), () => Z.disconnect();
  }, [le, a]);
  const qe = se(() => {
    const T = k.current;
    if (!T) return null;
    const Z = T.getBoundingClientRect();
    return { left: Z.left, top: Z.top, width: Z.width, height: Z.height };
  }, []), rt = se((T, Z) => {
    const ce = ke.current ?? null, oe = (ce == null ? void 0 : ce.innerWidth) ?? 0, Te = fn(ce), Pe = qe(), Je = Pe ? Pe.width : Math.min(oe - Be * 2, 576), Oe = Pe ? Pe.height : Math.min(Te.height - Be * 2, 400);
    return {
      left: Math.max(Be, Math.min(T, oe - Je - Be)),
      top: Math.max(Te.top + Be, Math.min(Z, Te.bottom - Oe - Be))
    };
  }, [qe]);
  ae(() => {
    if (!n) return;
    const T = ke.current ?? null, Z = (T == null ? void 0 : T.visualViewport) ?? null;
    if (!T || !Z) return;
    const ce = 120;
    z.current = !1, ge.current = { w: T.innerWidth, h: T.innerHeight };
    let oe = 0;
    const Te = () => {
      if (Me.current || Ce.current) return;
      const Je = (T == null ? void 0 : T.innerHeight) ?? 0, Oe = (T == null ? void 0 : T.innerWidth) ?? 0, ht = fn(T).height < Je - ce, ot = Je < ge.current.h - ce && Oe === ge.current.w;
      ht || ot ? (z.current = !0, S.current && (clearTimeout(S.current), S.current = 0)) : S.current || (S.current = (T == null ? void 0 : T.setTimeout(() => {
        z.current = !1, S.current = 0, je(!1);
      }, 600)) ?? 0), je(z.current), !oe && (oe = requestAnimationFrame(() => {
        var An;
        oe = 0;
        const Rt = k.current;
        if (!Rt) return;
        const xt = fn(ke.current ?? null), Fe = Rt.getBoundingClientRect(), Xt = ((An = ke.current) == null ? void 0 : An.innerWidth) ?? 0, en = (T == null ? void 0 : T.innerHeight) ?? 0, vn = xt.height < en - ce || en < ge.current.h - ce && (T == null ? void 0 : T.innerWidth) === ge.current.w;
        ge.current = { w: (T == null ? void 0 : T.innerWidth) ?? 0, h: en };
        const Ae = Fe.top >= xt.top + Be && Fe.bottom <= xt.bottom - Be, an = () => {
          De({
            left: Math.max(Be, Math.min((Xt - Fe.width) / 2, Xt - Fe.width - Be)),
            top: Math.max(xt.top + Be, Math.min(xt.top + (xt.height - Fe.height) / 2, xt.bottom - Fe.height - Be))
          });
        };
        if (vn && !He) {
          if (ze.current) {
            Ae || De(rt(Fe.left, Fe.top));
            return;
          }
          if (Ae) return;
          an();
          return;
        }
        if (!z.current) {
          if (ze.current) {
            Ae || De(rt(Fe.left, Fe.top));
            return;
          }
          Ae || an();
        }
      }));
    };
    Z.addEventListener("resize", Te), Z.addEventListener("scroll", Te);
    const Pe = () => {
      Me.current || Ce.current || oe || (oe = requestAnimationFrame(() => {
        oe = 0;
        const Je = k.current;
        if (!Je) return;
        const Oe = ke.current ?? null, Ie = fn(Oe), ht = (Oe == null ? void 0 : Oe.innerWidth) ?? 0, ot = Je.getBoundingClientRect();
        if (ze.current) {
          De(rt(ot.left, ot.top));
          return;
        }
        De({
          left: Math.max(Be, Math.min((ht - ot.width) / 2, ht - ot.width - Be)),
          top: Math.max(Ie.top + Be, Math.min(Ie.top + (Ie.height - ot.height) / 2, Ie.bottom - ot.height - Be))
        });
      }));
    };
    return T.addEventListener("orientationchange", Pe), () => {
      Z.removeEventListener("resize", Te), Z.removeEventListener("scroll", Te), T.removeEventListener("orientationchange", Pe), oe && cancelAnimationFrame(oe), S.current && clearTimeout(S.current);
    };
  }, [n, rt]);
  const $t = se((T) => {
    if (T.target.closest("button")) return;
    ze.current = !0;
    const Z = qe();
    Z && (De(rt(Z.left, Z.top)), Ce.current = { startX: T.clientX, startY: T.clientY, posX: Z.left, posY: Z.top }, T.target.setPointerCapture(T.pointerId));
  }, [qe, rt]), yt = se((T) => {
    const Z = Ce.current;
    Z && (T.preventDefault(), De(rt(Z.posX + T.clientX - Z.startX, Z.posY + T.clientY - Z.startY)));
  }, [rt]), Mt = se(() => {
    Ce.current = null;
  }, []), _t = Ce.current !== null, Ke = se(() => {
    ze.current = !1;
    const T = ke.current ?? null, Z = fn(T), ce = (T == null ? void 0 : T.innerWidth) ?? 0, oe = k.current, Te = oe ? oe.getBoundingClientRect() : { width: 0, height: 0 };
    De({
      left: Math.max(Be, Math.min((ce - Te.width) / 2, ce - Te.width - Be)),
      top: Math.max(Z.top + Be, Math.min(Z.top + (Z.height - Te.height) / 2, Z.bottom - Te.height - Be))
    });
  }, []), $ = v(0), X = se(() => {
    const T = Date.now();
    T - $.current < 300 ? ($.current = 0, Ke()) : $.current = T;
  }, [Ke]), pe = he !== null, Qe = pe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", it = `${i ? `${i} w-full` : "max-w-xl w-full"}`, St = {
    ...pe ? { left: he.left, top: he.top } : {},
    width: `min(100%, calc(100dvw - ${Be * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Se ? {} : { maxHeight: `calc(100dvh - ${Be * 2}px)` }
  }, At = se((T) => {
    if (T.key !== "Enter" || T.shiftKey || T.metaKey || T.ctrlKey || T.altKey) return;
    const Z = T.target, ce = C.current;
    if (!(!!Z.closest("[data-modal-close]") || !!ce && ce.contains(Z) && !!Z.closest('button, a, [role="button"]')) && Z.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ce) return;
    const Te = Array.from(ce.querySelectorAll("button[data-modal-confirm]")), Pe = Te.length > 0 ? Te : Array.from(ce.querySelectorAll("button")), Je = Pe[Pe.length - 1];
    !Je || Je.disabled || (T.preventDefault(), Je.click());
  }, []);
  return /* @__PURE__ */ p(Oi, { theme: b, children: /* @__PURE__ */ p(dn.Root, { open: n, onOpenChange: (T) => {
    T || It();
  }, children: /* @__PURE__ */ A(dn.Portal, { container: j ?? void 0, children: [
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
        onKeyDown: At,
        onInteractOutside: (T) => {
          d || T.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": w,
        "data-surface": L,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Qe} ${it}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(St).length > 0 ? St : {} },
        children: [
          u ? /* @__PURE__ */ A(
            "div",
            {
              style: ve,
              className: `flex items-center justify-between ${_t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (T) => {
                $e || $t(T);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: X,
              children: [
                /* @__PURE__ */ p(dn.Title, { style: xe, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                c && /* @__PURE__ */ p(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Tn, { style: { width: I, height: I } }) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "div",
            {
              style: M,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${_t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (T) => {
                $e || $t(T);
              },
              onPointerMove: yt,
              onPointerUp: Mt,
              onClick: X,
              children: [
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ p(dn.Title, { style: ye, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ A("button", { onClick: l, style: be, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ p(Vo, { style: { width: q, height: q } }),
                    "Reset"
                  ] }),
                  c && /* @__PURE__ */ p(dn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Tn, { style: { width: K, height: K } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p("div", { ref: N, "data-testid": "modal-body", style: u ? me : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ p("div", { ref: C, style: u ? te : void 0, className: u ? "" : "shrink-0", children: u ? /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function _h({ children: n }) {
  const e = We(), t = F(20, 24, e), r = F(8, 12, e);
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const lc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", ac = {
  zinc: "bg-[var(--ui-btn-solid-bg)] text-[color:var(--ui-btn-solid-text)] font-semibold border border-[color:var(--ui-btn-solid-border)] hover:bg-[var(--ui-btn-solid-hover-bg)] hover:border-[color:var(--ui-btn-solid-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, cc = {
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
      className: `${lc} ${n === "hero" ? ac[e] : cc[n]} ${t}`,
      ...i
    }
  );
}
function Or(n = "md") {
  const e = He && Qo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function Rs(n = "md") {
  return n === "sm" ? gn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : gn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Is = Gt(null);
function jh() {
  const n = Qt(Is);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Wh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = re(null), [s, l] = re(!1), a = v(null), u = We(), c = F(16, 20, u), d = F(12, 14, u), f = Rs(), h = v(i);
  h.current = i;
  const m = se(() => {
    const N = h.current;
    N && (N.kind === "confirm" ? N.resolve(!1) : N.kind === "prompt" ? N.resolve(null) : N.resolve());
  }, []), g = se((N) => {
    if (N.suppressKey) {
      const C = localStorage.getItem(N.suppressKey);
      if (C && Date.now() < parseInt(C, 10))
        return Promise.resolve(!0);
    }
    return new Promise((C) => {
      m(), l(!1), o({ kind: "confirm", options: N, resolve: C });
    });
  }, [m]), b = se((N) => new Promise((C) => {
    m(), o({ kind: "prompt", options: N, resolve: C });
  }), [m]), x = se((N) => new Promise((C) => {
    m(), o({ kind: "alert", options: N, resolve: C });
  }), [m]);
  ae(() => {
    if (i) {
      const N = setTimeout(() => {
        var C;
        return (C = a.current) == null ? void 0 : C.focus();
      }, 50);
      return () => clearTimeout(N);
    }
  }, [i]);
  const L = se(() => {
    var N, C;
    if (i) {
      if (i.kind === "confirm") {
        const W = i.options;
        W.suppressKey && s && localStorage.setItem(W.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((C = (N = a.current) == null ? void 0 : N.value) == null ? void 0 : C.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), w = i !== null;
  ae(() => {
    if (!w) return;
    const N = (C) => {
      C.key !== "Enter" || C.shiftKey || C.metaKey || C.ctrlKey || C.altKey || C.isComposing || (C.preventDefault(), C.stopImmediatePropagation(), L());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [w, L]);
  const k = se(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ A(Is.Provider, { value: { confirm: g, prompt: b, alert: x }, children: [
    n,
    w && /* @__PURE__ */ p(
      sc,
      {
        open: !0,
        onClose: k,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ A(ut, { children: [
          i.kind !== "alert" && /* @__PURE__ */ p(br, { variant: "ghost", onClick: k, children: "Cancel" }),
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
        children: /* @__PURE__ */ A("div", { className: "flex flex-col", style: { gap: c }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ p("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ p(
            Wa,
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
              ref: a,
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
const uc = 500, dc = 250, fc = 5, jt = 88, mo = 4;
function hc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function pc({ x: n, y: e, ms: t }) {
  const r = v(null), i = Yn();
  return ae(() => {
    r.current && hc(r.current, t);
  }, [t]), Vr(
    /* @__PURE__ */ p(
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
        children: /* @__PURE__ */ A("svg", { ref: r, width: jt, height: jt, viewBox: `0 0 ${jt} ${jt}`, children: [
          /* @__PURE__ */ p(
            "circle",
            {
              cx: jt / 2,
              cy: jt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: mo + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ p(
            "circle",
            {
              cx: jt / 2,
              cy: jt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: mo,
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
function mc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Kh({
  children: n,
  showRing: e = !0,
  longPressMs: t = uc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = re(null), a = Ii(), u = v(null), c = v(null), d = v({ x: 0, y: 0, target: null }), f = v(!1), h = Math.min(dc, t * 0.5), m = v(i);
  m.current = i;
  const g = v(o);
  return g.current = o, ae(() => {
    if (!He || !a) return;
    const b = (k) => {
      if (!bi(k.pointerType) || k.button !== 0) return;
      const N = k.target;
      if (!N.closest(r) || (m.current ? !m.current(N) : mc(N))) return;
      const C = k.clientX, W = k.clientY;
      d.current = { x: C, y: W, target: k.target }, f.current = !0, e && (c.current = setTimeout(() => l({ x: C, y: W }), h)), u.current = setTimeout(() => {
        if (!f.current) return;
        c.current && (clearTimeout(c.current), c.current = null), l(null);
        const J = d.current.target;
        if (!J) return;
        const E = g.current;
        if (E) {
          E(J, C, W);
          return;
        }
        const V = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: C,
          clientY: W,
          button: 2,
          view: window
        });
        J.dispatchEvent(V);
      }, t);
    }, x = (k) => {
      if (!f.current || u.current === null) return;
      const N = k.clientX - d.current.x, C = k.clientY - d.current.y;
      Math.sqrt(N * N + C * C) > fc && (clearTimeout(u.current), u.current = null, c.current && (clearTimeout(c.current), c.current = null), f.current = !1, l(null));
    }, L = () => {
      u.current !== null && (clearTimeout(u.current), u.current = null), c.current !== null && (clearTimeout(c.current), c.current = null), f.current = !1, l(null);
    }, w = (k) => {
      bi(k.pointerType) && (u.current !== null && (clearTimeout(u.current), u.current = null), c.current !== null && (clearTimeout(c.current), c.current = null), f.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", b), a.addEventListener("pointermove", x), a.addEventListener("pointerup", L), a.addEventListener("pointercancel", L), a.addEventListener("pointerleave", w), () => {
      a.removeEventListener("pointerdown", b), a.removeEventListener("pointermove", x), a.removeEventListener("pointerup", L), a == null || a.removeEventListener("pointercancel", L), a == null || a.removeEventListener("pointerleave", w), u.current !== null && clearTimeout(u.current), c.current !== null && clearTimeout(c.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ A(ut, { children: [
    n,
    e && s && /* @__PURE__ */ p(pc, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function Jh() {
  const n = Ma();
  return Ea ? n === null || bi(n) : !1;
}
const gc = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, yc = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, xc = {
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
        ...e ? xc : n ? yc : gc,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const bc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], vc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ai = 1900, ci = 2100;
function wc(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function kc(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Yh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Ot(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), u = (() => {
    if (!o) return a;
    const D = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(D.getTime()) ? a : D;
  })(), [c, d] = re(u.getFullYear()), [f, h] = re(u.getMonth()), [m, g] = re("days"), [b, x] = re(null), L = st(() => new Set(n), [n]), w = (D) => {
    L.has(D) ? e(n.filter((j) => j !== D)) : e([...n, D]);
  }, k = st(() => {
    const D = wc(c, f), j = new Date(c, f, 1).getDay(), Re = [];
    for (let ke = 0; ke < j; ke++) Re.push({ key: `pad-${ke}`, day: 0, empty: !0 });
    for (let ke = 1; ke <= D; ke++) Re.push({ key: kc(c, f, ke), day: ke, empty: !1 });
    return Re;
  }, [c, f]), N = (D) => d((j) => Math.max(ai, Math.min(ci, j + D))), C = (D) => {
    f + D < 0 ? (d((j) => Math.max(ai, j - 1)), h(11)) : f + D > 11 ? (d((j) => Math.min(ci, j + 1)), h(0)) : h((j) => j + D);
  }, W = () => {
    if (b === null) return;
    const D = parseInt(b, 10);
    !isNaN(D) && D >= ai && D <= ci && d(D), x(null);
  }, J = (D) => n.some((j) => j.startsWith(`${c}-${String(D + 1).padStart(2, "0")}`)), E = We(), V = F(4, 8, E), R = F(16, 20, E), ne = F(10, 11, E), ie = F(6, 8, E), H = F(12, 14, E), K = F(6, 10, E), I = F(12, 14, E), U = F(8, 12, E), q = F(10, 12, E), O = F(6, 10, E), G = F(2, 6, E), M = F(64, 80, E), ye = { padding: V }, ve = { width: R, height: R }, xe = { fontSize: ne, paddingTop: ie, paddingBottom: ie }, me = { fontSize: H, paddingTop: K, paddingBottom: K }, te = { fontSize: I, paddingTop: U, paddingBottom: U }, be = { fontSize: q, padding: `${G}px ${O}px` }, le = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", _ = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ A("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(-1) : C(-1),
          style: ye,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ p(Yo, { style: ve })
        }
      ),
      m === "days" ? /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(c, f).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ p(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: b ?? String(c),
          onChange: (D) => x(D.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (D) => D.target.select(),
          onBlur: W,
          onKeyDown: (D) => {
            D.key === "Enter" && (D.preventDefault(), W()), D.key === "Escape" && x(null);
          },
          style: { width: M },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(1) : C(1),
          style: ye,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ p(Dr, { style: ve })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-3 text-center", children: vc.map((D, j) => /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => {
            h(j), g("days");
          },
          style: te,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${j === f ? le : _}`,
          children: [
            D,
            J(j) && /* @__PURE__ */ p("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${j === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        D
      )) }),
      /* @__PURE__ */ p("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => {
            d(a.getFullYear()), h(a.getMonth()), g("days");
          },
          style: { paddingTop: K, paddingBottom: K, fontSize: H },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ A("div", { className: "grid grid-cols-7 text-center", children: [
      bc.map((D) => /* @__PURE__ */ p("div", { style: xe, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: D }, D)),
      k.map((D) => D.empty ? /* @__PURE__ */ p("div", {}, D.key) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => w(D.key),
          style: me,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${L.has(D.key) ? le : _}`,
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
        const j = /* @__PURE__ */ new Date(D + "T00:00:00"), Re = j.getFullYear() === a.getFullYear() ? j.toLocaleString("default", { month: "short", day: "numeric" }) : j.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            onClick: () => w(D),
            "aria-label": `Remove ${Re}`,
            style: be,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Re,
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
  maxHeight: a,
  disabled: u = !1,
  checkPosition: c = "leading",
  theme: d,
  className: f = ""
}) {
  const h = (k) => e instanceof Set ? e.has(k) : e.includes(k), m = We(), g = F(12, 16, m), b = F(8, 12, m), x = F(12, 14, m), L = F(16, 20, m), w = r != null || i != null;
  return /* @__PURE__ */ A("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    w && /* @__PURE__ */ A("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ p("button", { type: "button", disabled: u, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((k) => {
            const N = h(k.id), C = /* @__PURE__ */ p(zi, { checked: N, size: L });
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => t(k.id),
                "aria-pressed": N,
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${g}px`, fontSize: x },
                ...k.dataProps,
                children: [
                  c === "leading" && C,
                  k.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: k.secondary }),
                  c === "trailing" && /* @__PURE__ */ p("span", { className: "ml-auto flex shrink-0", children: C })
                ]
              },
              k.id
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
  theme: a,
  className: u = ""
}) {
  const c = We(), d = s ? 10 : F(12, 16, c), f = s ? 6 : F(8, 12, c), h = s ? 12 : F(12, 14, c), m = s ? 14 : F(16, 20, c);
  return /* @__PURE__ */ A("div", { className: u, ...a ? { "data-theme": a } : {}, children: [
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
                style: { padding: `${f}px ${d}px`, fontSize: h },
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
  const s = cr(), { refs: l, floatingStyles: a } = sa({
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
          const c = (L = u.elements.floating.ownerDocument) == null ? void 0 : L.defaultView;
          if (!c) return {};
          const d = u.rects.reference, f = Math.max(d.x, 0), h = Math.max(d.y, 0), m = Math.min(d.x + d.width, c.innerWidth), g = Math.min(d.y + d.height, c.innerHeight);
          if (m <= f || g <= h) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? h - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: u.x + b, y: u.y + x };
        }
      },
      Uo(o),
      Xo({ padding: 8 }),
      Go({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (u) => {
          var g;
          const c = (g = u.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!c) return {};
          const d = u.rects.floating.width, f = u.rects.floating.height, h = Math.max(8, Math.min(u.x, c.innerWidth - d - 8)), m = Math.max(8, Math.min(u.y, c.innerHeight - f - 8));
          return { x: h, y: m };
        }
      }
    ],
    whileElementsMounted: la
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
          style: a,
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
function Sc(n, e) {
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
  const t = Ot(), r = We(), i = F(10, 12, r), o = F(6, 6, r), s = F(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = Yn(), u = cr(), [c, d] = re(!1), [f, h] = re({ x: 0, y: 0 }), m = v(null), g = v(null), b = () => {
    if (!m.current) return;
    const w = m.current.getBoundingClientRect();
    h({ x: w.left + w.width / 2, y: w.top });
  };
  ae(() => () => {
    g.current && clearTimeout(g.current);
  }, []), ae(() => (c && u && (b(), u.addEventListener("scroll", b, !0)), () => u == null ? void 0 : u.removeEventListener("scroll", b, !0)), [c]), ae(() => {
    var N;
    if (!c) return;
    const w = ((N = m.current) == null ? void 0 : N.ownerDocument) ?? document, k = (C) => {
      m.current && !m.current.contains(C.target) && d(!1);
    };
    return w.addEventListener("pointerdown", k, !0), () => w.removeEventListener("pointerdown", k, !0);
  }, [c]);
  const x = Sc(e, n), L = Object.keys(x).length > 0 ? ct.cloneElement(e, x) : e;
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
        c && Vr(
          /* @__PURE__ */ A(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: f.x, top: f.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((w, k) => /* @__PURE__ */ p("div", { className: k > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: w }, k)),
                /* @__PURE__ */ p("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          a ?? document.body
        )
      ]
    }
  );
}, Nc = 250;
function Tc(n, e, t) {
  const [r, i] = ct.useState(null), [o, s] = ct.useState(!1), l = ct.useRef(null), a = ct.useRef(t);
  a.current = t;
  const u = ct.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[a.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  ct.useLayoutEffect(() => {
    u();
  }, [t, u]), ct.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Nc), u();
    }, h = new ResizeObserver(f);
    h.observe(d);
    for (const m of e.current ?? []) m && h.observe(m);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, u]);
  const c = ct.useMemo(
    () => {
      var d;
      return typeof window < "u" && !!((d = window.matchMedia) != null && d.call(window, "(prefers-reduced-motion: reduce)").matches);
    },
    []
  );
  return {
    style: r ? { left: 0, width: r.width, transform: `translateX(${r.left}px)` } : null,
    motionClass: c || o ? "" : "transition-[transform,width] duration-200 ease-out"
  };
}
function ei() {
  const n = We(), e = He, t = e ? F(28, 40, n) : 28, r = e ? F(28, 40, n) : 28, i = e ? F(10, 14, n) : 10, o = e ? F(10, 14, n) : 10, s = e ? F(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Qh = He ? "text-xs font-semibold text-[color:var(--ui-label)] uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-[color:var(--ui-label)] uppercase tracking-wider shrink-0 w-16", Cc = He ? "h-10 px-3.5 text-sm font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-30 flex items-center gap-1.5 transition-colors", vr = He ? "h-10 px-3 text-sm font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ec = "hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)]", Zh = He ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", ep = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", tp = "bg-[var(--ui-btn-bg)] border-[color:var(--ui-input-border)] text-[color:var(--ui-text-faint)] hover:bg-[var(--ui-item-hover-bg)]", Mc = He ? "h-10 px-2.5 text-sm bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-[color:var(--ui-input-text)] placeholder:text-[color:var(--ui-text-disabled)] outline-none focus:border-[var(--ui-input-focus-border)] disabled:opacity-30" : "h-7 px-2 text-[10px] bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-[color:var(--ui-input-text)] placeholder:text-[color:var(--ui-text-disabled)] outline-none focus:border-[var(--ui-input-focus-border)] disabled:opacity-30", np = He ? "w-14 h-9 bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-sm text-center text-[color:var(--ui-input-text)] outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-[11px] text-center text-[color:var(--ui-input-text)] outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", Ds = He ? "w-px h-7 bg-[var(--ui-sep)] mx-1" : "w-px h-5 bg-[var(--ui-sep)] mx-0.5", Ac = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", Rc = He ? "h-10 px-3 text-sm rounded bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-input-text)] hover:border-[var(--ui-input-focus-border)] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-input-text)] hover:border-[var(--ui-input-focus-border)] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", wr = ({ onClick: n, disabled: e, title: t, className: r = Cc, children: i }) => {
  const o = ei();
  return /* @__PURE__ */ p(Pn, { content: t, children: /* @__PURE__ */ p("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, kr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, rp = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: u, iconCollapse: c = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const h = Ot(), m = a ?? Oa(h), g = a === "blue" || a === "emerald" ? a : (h == null ? void 0 : h.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": g }, x = ei(), L = We(), w = s && !He ? 24 : x.control.height, k = gn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), N = He ? k : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, C = (R) => i ? i(R) : n === R, W = ct.useRef(null), J = ct.useRef([]), E = Math.max(0, e.findIndex((R) => C(R.v))), V = Tc(W, J, E);
  return l === "track" ? /* @__PURE__ */ A(
    "div",
    {
      ref: W,
      role: u ? "tablist" : "group",
      "aria-label": f,
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
        e.map((R, ne) => {
          const ie = C(R.v), H = c && !!R.icon;
          return /* @__PURE__ */ p(
            "button",
            {
              ref: (K) => {
                J.current[ne] = K;
              },
              ...R.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(R.v),
              title: R.title,
              role: u ? "tab" : void 0,
              "aria-selected": u ? ie : void 0,
              "aria-pressed": u ? void 0 : ie,
              "aria-label": R.ariaLabel ?? (R.l ? void 0 : R.title),
              style: N,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${H ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${ie ? kr.active : kr.idle}`,
              children: /* @__PURE__ */ p(
                vs,
                {
                  icon: R.icon,
                  collapse: H,
                  iconWithLabel: d,
                  active: ie,
                  gap: F(6, 8, L),
                  children: R.l
                }
              )
            },
            R.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ A("div", { ref: W, className: `relative ${Ac} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    V.style && /* @__PURE__ */ p(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${V.motionClass}`,
        style: { ...V.style, top: 0, bottom: 0 }
      }
    ),
    e.map((R, ne) => {
      const ie = C(R.v);
      return /* @__PURE__ */ A(
        "button",
        {
          ref: (H) => {
            J.current[ne] = H;
          },
          ...R.dataProps,
          disabled: r,
          onClick: () => t(R.v),
          title: R.title,
          style: { ...x.control, height: w },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${ie ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${R.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            R.icon,
            R.l
          ]
        },
        R.v
      );
    })
  ] });
}, ip = ({ children: n }) => /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ p("span", { className: He ? "text-xs font-semibold text-[color:var(--ui-label)] uppercase tracking-wider" : "text-[9px] font-semibold text-[color:var(--ui-label)] uppercase tracking-wider", children: n }),
  /* @__PURE__ */ p("div", { className: "h-px bg-[var(--ui-sep)]", style: { minWidth: 24, flex: 1 } })
] }), Ic = "text-[10px] font-medium text-[color:var(--ui-label)] uppercase tracking-wider mb-1", Dc = "text-[10px] font-medium text-[color:var(--ui-label)] uppercase tracking-wider w-28 shrink-0", op = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ A("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ p("span", { className: t ? Ic : Dc, children: n }),
  e
] }), sp = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--ui-card-bg)] border border-[color:var(--ui-card-border)] min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ p("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), lp = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ A("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ p(wr, { onClick: () => r(-1), disabled: n, title: "Move up", className: vr, children: /* @__PURE__ */ p(Xl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(wr, { onClick: () => r(1), disabled: n, title: "Move down", className: vr, children: /* @__PURE__ */ p(Gl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(wr, { onClick: e, disabled: n, title: "Duplicate", className: vr, children: /* @__PURE__ */ p(Jo, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p("div", { className: Ds }),
    /* @__PURE__ */ p(wr, { onClick: t, disabled: n, title: "Delete", className: `${vr} ${Ec}`, children: /* @__PURE__ */ p(xi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var go = Object.defineProperty, $c = (n, e) => {
  let t = {};
  for (var r in n) go(t, r, {
    get: n[r],
    enumerable: !0
  });
  return go(t, Symbol.toStringTag, { value: "Module" }), t;
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
      let s = i.text, l = o.text, a = 0;
      for (; s[a] == l[a]; a++)
        t++;
      return a && a < s.length && a < l.length && Os(s.charCodeAt(a - 1)) && Ps(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = $s(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Ls(n, e, t, r) {
  for (let i = n.childCount, o = e.childCount; ; ) {
    if (i == 0 || o == 0)
      return i == o ? null : { a: t, b: r };
    let s = n.child(--i), l = e.child(--o), a = s.nodeSize;
    if (s == l) {
      t -= a, r -= a;
      continue;
    }
    if (!s.sameMarkup(l))
      return { a: t, b: r };
    if (s.isText && s.text != l.text) {
      let u = s.text, c = l.text, d = u.length, f = c.length;
      for (; d > 0 && f > 0 && u[d - 1] == c[f - 1]; )
        d--, f--, t--, r--;
      return d && f && d < u.length && Os(u.charCodeAt(d - 1)) && Ps(u.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let u = Ls(s.content, l.content, t - 1, r - 1);
      if (u)
        return u;
    }
    t -= a, r -= a;
  }
}
function Ps(n) {
  return n >= 56320 && n < 57344;
}
function Os(n) {
  return n >= 55296 && n < 56320;
}
class Y {
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
      let a = this.content[s], u = l + a.nodeSize;
      if (u > e && r(a, i + l, o || null, s) !== !1 && a.content.size) {
        let c = l + 1;
        a.nodesBetween(Math.max(0, e - c), Math.min(a.content.size, t - c), r, i + c);
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
    return this.nodesBetween(e, t, (l, a) => {
      let u = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
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
    return new Y(i, this.size + e.size);
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
        let l = this.content[o], a = s + l.nodeSize;
        a > e && ((s < e || a > t) && (l.isText ? l = l.cut(Math.max(0, e - s), Math.min(l.text.length, t - s)) : l = l.cut(Math.max(0, e - s - 1), Math.min(l.content.size, t - s - 1))), r.push(l), i += l.nodeSize), s = a;
      }
    return new Y(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? Y.empty : e == 0 && t == this.content.length ? this : new Y(this.content.slice(e, t));
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
    return i[e] = t, new Y(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new Y([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new Y(this.content.concat(e), this.size + e.nodeSize);
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
    return Ls(this, e, t, r);
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
      return Y.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return Y.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return Y.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new Y(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return Y.empty;
    if (e instanceof Y)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new Y([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
Y.empty = new Y([], 0);
const ui = { index: 0, offset: 0 };
function Sr(n, e) {
  return ui.index = n, ui.offset = e, ui;
}
function zr(n, e) {
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
      if (!zr(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !zr(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ue = class ki {
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
    return this == e || this.type == e.type && zr(this.attrs, e.attrs);
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
      return ki.none;
    if (e instanceof ki)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Ue.none = [];
class rr extends Error {
}
class ue {
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
    return r && new ue(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new ue(zs(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return ue.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new ue(Y.fromJSON(e, t.content), r, i);
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
    return new ue(e, r, i);
  }
}
ue.empty = new ue(Y.empty, 0, 0);
function zs(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(zs(o.content, e - i - 1, t - i - 1)));
}
function Fs(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let u = Fs(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return u && n.replaceChild(s, a.copy(u));
}
function Lc(n, e, t) {
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
      let { start: s, end: l } = Pc(t, n);
      return Nn(o, _s(n, s, l, e, r));
    }
  else return Nn(o, Fr(n, e, r));
}
function Hs(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new rr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Si(n, e, t) {
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
  let o = n.depth > i && Si(n, e, i + 1), s = r.depth > i && Si(t, r, i + 1), l = [];
  return er(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Hs(o, s), Sn(Nn(o, _s(n, e, t, r, i + 1)), l)) : (o && Sn(Nn(o, Fr(n, e, i + 1)), l), er(e, t, i, l), s && Sn(Nn(s, Fr(t, r, i + 1)), l)), er(r, null, i, l), new Y(l);
}
function Fr(n, e, t) {
  let r = [];
  if (er(null, n, t, r), n.depth > t) {
    let i = Si(n, e, t + 1);
    Sn(Nn(i, Fr(n, e, t + 1)), r);
  }
  return er(e, null, t, r), new Y(r);
}
function Pc(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(Y.from(i));
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
      let { index: l, offset: a } = s.content.findIndex(o), u = o - a;
      if (r.push(s, l, i + a), !u || (s = s.child(l), s.isText))
        break;
      o = u - 1, i += a + 1;
    }
    return new ir(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = yo.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      yo.set(e, r = new Oc());
    let i = r.elts[r.i] = ir.resolve(e, t);
    return r.i = (r.i + 1) % zc, i;
  }
}
class Oc {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const zc = 12, yo = /* @__PURE__ */ new WeakMap();
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
const Fc = /* @__PURE__ */ Object.create(null);
let _n = class Ni {
  /**
  @internal
  */
  constructor(e, t, r, i = Ue.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || Y.empty;
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
    return this.type == e && zr(this.attrs, t || e.defaultAttrs || Fc) && Ue.sameSet(this.marks, r || Ue.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Ni(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Ni(this.type, this.attrs, this.content, e);
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
      return ue.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), u = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new ue(u, i.depth - s, o.depth - s);
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
    return Lc(this.resolve(e), this.resolve(t), r);
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
  canReplace(e, t, r = Y.empty, i = 0, o = r.childCount) {
    let s = this.contentMatchAt(e).matchFragment(r, i, o), l = s && s.matchFragment(this.content, t);
    if (!l || !l.validEnd)
      return !1;
    for (let a = i; a < o; a++)
      if (!this.type.allowsMarks(r.child(a).marks))
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
    this.type.checkContent(this.content), xo(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ue.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      xo(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
    let i = Y.fromJSON(e, t.content);
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
function xo(n, e, t, r) {
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
    let r = new Bc(e, t);
    if (r.next == null)
      return Cn.empty;
    let i = Ws(r);
    r.next && r.err("Unexpected trailing text");
    let o = Jc(Kc(i));
    return Vc(o, r), o;
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
      let a = s.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return Y.from(l.map((u) => u.createAndFill()));
      for (let u = 0; u < s.next.length; u++) {
        let { type: c, next: d } = s.next[u];
        if (!(c.isText || c.hasRequiredAttrs()) && i.indexOf(d) == -1) {
          i.push(d);
          let f = o(d, l.concat(c));
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
        let { type: l, next: a } = o.next[s];
        !l.isLeaf && !l.hasRequiredAttrs() && !(l.name in t) && (!i.type || a.validEnd) && (r.push({ match: l.contentMatch, type: l, via: i }), t[l.name] = !0);
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
class Bc {
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
    e.push(Hc(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Hc(n) {
  let e = [];
  do
    e.push(_c(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function _c(n) {
  let e = qc(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = jc(n, e);
    else
      break;
  return e;
}
function bo(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function jc(n, e) {
  let t = bo(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = bo(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Wc(n, e) {
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
function qc(n) {
  if (n.eat("(")) {
    let e = Ws(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Wc(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Kc(n) {
  let e = [[]];
  return i(o(n, 0), t()), e;
  function t() {
    return e.push([]) - 1;
  }
  function r(s, l, a) {
    let u = { term: a, to: l };
    return e[s].push(u), u;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, u) => a.concat(o(u, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let u = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return u;
        i(u, l = t());
      }
    else if (s.type == "star") {
      let a = t();
      return r(l, a), i(o(s.expr, a), a), [r(a)];
    } else if (s.type == "plus") {
      let a = t();
      return i(o(s.expr, l), a), i(o(s.expr, a), a), [r(a)];
    } else {
      if (s.type == "opt")
        return [r(l)].concat(o(s.expr, l));
      if (s.type == "range") {
        let a = l;
        for (let u = 0; u < s.min; u++) {
          let c = t();
          i(o(s.expr, a), c), a = c;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let u = s.min; u < s.max; u++) {
            let c = t();
            r(a, c), i(o(s.expr, a), c), a = c;
          }
        return [r(a)];
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
function vo(n, e) {
  let t = [];
  return r(e), t.sort(qs);
  function r(i) {
    let o = n[i];
    if (o.length == 1 && !o[0].term)
      return r(o[0].to);
    t.push(i);
    for (let s = 0; s < o.length; s++) {
      let { term: l, to: a } = o[s];
      !l && t.indexOf(a) == -1 && r(a);
    }
  }
}
function Jc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(vo(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let u;
        for (let c = 0; c < i.length; c++)
          i[c][0] == l && (u = i[c][1]);
        vo(n, a).forEach((c) => {
          u || i.push([l, u = []]), u.indexOf(c) == -1 && u.push(c);
        });
      });
    });
    let o = e[r.join(",")] = new Cn(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(qs);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Vc(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: u } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(u) == -1 && r.push(u);
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
      t[r] = new Uc(n, r, e[r]);
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
    return new _n(this, this.computeAttrs(e), Y.from(t), Ue.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = Y.from(t), this.checkContent(t), new _n(this, this.computeAttrs(e), t, Ue.setFrom(r));
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
    if (e = this.computeAttrs(e), t = Y.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(Y.empty, !0);
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
function Yc(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Uc {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Yc(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ti {
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
    return e.forEach((o, s) => r[o] = new ti(o, i++, t, s)), r;
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
class Xc {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = wt.from(e.nodes), t.marks = wt.from(e.marks || {}), this.nodes = _r.compile(this.spec.nodes, this), this.marks = ti.compile(this.spec.marks, this);
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
      o.markSet = l == "_" ? null : l ? wo(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : wo(this, s.split(" "));
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
function wo(n, e) {
  let t = [];
  for (let r = 0; r < e.length; r++) {
    let i = e[r], o = n.marks[i], s = o;
    if (o)
      t.push(o);
    else
      for (let l in n.marks) {
        let a = n.marks[l];
        (i == "_" || a.spec.group && a.spec.group.split(" ").indexOf(i) > -1) && t.push(s = a);
      }
    if (!s)
      throw new SyntaxError("Unknown mark type: '" + e[r] + "'");
  }
  return t;
}
function Gc(n) {
  return n.tag != null;
}
function Qc(n) {
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
      if (Gc(i))
        this.tags.push(i);
      else if (Qc(i)) {
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
    let r = new So(this, t, !1);
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
    let r = new So(this, t, !0);
    return r.addAll(e, Ue.none, t.from, t.to), ue.maxOpen(r.finish());
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
          let a = s.getAttrs(t);
          if (a === !1)
            continue;
          s.attrs = a || void 0;
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
        r(s = No(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = No(s)), s.node || s.ignore || s.mark || (s.node = i);
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
}, Zc = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Us = { ol: !0, ul: !0 }, or = 1, Ti = 2, tr = 4;
function ko(n, e, t) {
  return e != null ? (e ? or : 0) | (e === "full" ? Ti : 0) : n && n.whitespace == "pre" ? or | Ti : t & ~tr;
}
class Nr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ue.none, this.match = o || (s & tr ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(Y.from(e));
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
    let t = Y.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(Y.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ys.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class So {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = ko(null, t.preserveWhitespace, 0) | (r ? tr : 0);
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
    let r = e.nodeValue, i = this.top, o = i.options & Ti ? "full" : this.localPreserveWS || (i.options & or) > 0, { schema: s } = this.parser;
    if (o === "full" || i.inlineContext(e) || /[^ \t\r\n\u000c]/.test(r)) {
      if (o)
        if (o === "full")
          r = r.replace(/\r\n?/g, `
`);
        else if (s.linebreakReplacement && /[\r\n]/.test(r) && this.top.findWrapping(s.linebreakReplacement.create())) {
          let l = r.split(/\r?\n|\r/);
          for (let a = 0; a < l.length; a++)
            a && this.insertNode(s.linebreakReplacement.create(), t, !0), l[a] && this.insertNode(s.text(l[a]), t, !/\S/.test(l[a]));
          r = "";
        } else
          r = r.replace(/\r?\n|\r/g, " ");
      else if (r = r.replace(/[ \t\r\n\u000c]+/g, " "), /^[ \t\r\n\u000c]/.test(r) && this.open == this.nodes.length - 1) {
        let l = i.content[i.content.length - 1], a = e.previousSibling;
        (!l || a && a.nodeName == "BR" || l.isText && /[ \t\r\n\u000c]$/.test(l.text)) && (r = r.slice(1));
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
    Us.hasOwnProperty(s) && this.parser.normalizeLists && eu(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Zc.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let u, c = this.needsBlock;
      if (Ys.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), u = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = a && a.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), u && this.sync(o), this.needsBlock = c;
    } else {
      let u = this.readStyles(e, t);
      u && this.addElementByRule(e, a, u, a.consuming === !1 ? l : void 0);
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
            let a = this.parser.matchStyle(o, s, this, l);
            if (!a)
              break;
            if (a.ignore)
              return null;
            if (a.clearMark ? t = t.filter((u) => !a.clearMark(u)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
              l = a;
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
        let a = this.enter(s, t.attrs || null, r, t.preserveWhitespace);
        a && (o = !0, r = a);
      }
    else {
      let a = this.parser.schema.marks[t.mark];
      r = r.concat(a.create(t.attrs));
    }
    let l = this.top;
    if (s && s.isLeaf)
      this.findInside(e);
    else if (i)
      this.addElement(e, r, i);
    else if (t.getContent)
      this.findInside(e), t.getContent(e, this.parser.schema).forEach((a) => this.insertNode(a, r, !1));
    else {
      let a = e;
      typeof t.contentElement == "string" ? a = e.querySelector(t.contentElement) : typeof t.contentElement == "function" ? a = t.contentElement(e) : t.contentElement && (a = t.contentElement), this.findAround(e, a, !0), this.addAll(a, r), this.findAround(e, a, !1);
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
      let a = this.nodes[s], u = a.findWrapping(e);
      if (u && (!i || i.length > u.length + l) && (i = u, o = a, !u.length))
        break;
      if (a.solid) {
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
    let l = ko(e, o, s.options);
    s.options & tr && s.content.length == 0 && (l |= tr);
    let a = Ue.none;
    return r = r.filter((u) => (s.type ? s.type.allowsMarkType(u.type) : To(u.type, e)) ? (a = u.addToSet(a), !1) : !0), this.nodes.push(new Nr(e, t, a, i, null, l)), this.open++, r;
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
    let t = e.split("/"), r = this.options.context, i = !this.isOpen && (!r || r.parent.type == this.nodes[0].type), o = -(r ? r.depth + 1 : 0) + (i ? 0 : 1), s = (l, a) => {
      for (; l >= 0; l--) {
        let u = t[l];
        if (u == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let c = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= o ? r.node(a - o).type : null;
          if (!c || c.name != u && !c.isInGroup(u))
            return !1;
          a--;
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
    r && Us.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function tu(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function No(n) {
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
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: u, next: c } = l.edge(a);
        if (u == e || o.indexOf(c) < 0 && s(c))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
const Xs = 65535, Gs = Math.pow(2, 16);
function nu(n, e) {
  return n + e * Gs;
}
function Co(n) {
  return n & Xs;
}
function ru(n) {
  return (n - (n & Xs)) / Gs;
}
const Qs = 1, Zs = 2, Ar = 4, el = 8;
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
    return (this.delInfo & (Qs | Ar)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Zs | Ar)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Ar) > 0;
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
    let t = 0, r = Co(e);
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
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let u = this.ranges[l + o], c = this.ranges[l + s], d = a + u;
      if (e <= d) {
        let f = u ? e == a ? -1 : e == d ? 1 : t : t, h = a + i + (f < 0 ? 0 : c);
        if (r)
          return h;
        let m = e == (t < 0 ? a : d) ? null : nu(l / 3, e - a), g = e == a ? Zs : e == d ? Qs : Ar;
        return (t < 0 ? e != a : e != d) && (g |= el), new Ci(h, g, m);
      }
      i += c - u;
    }
    return r ? e + i : new Ci(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Co(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let u = this.ranges[l + o], c = a + u;
      if (e <= c && l == i * 3)
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
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), u = this.ranges[i + t], c = this.ranges[i + r];
      e(l, l + u, a, a + c), o += c - u;
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
        let a = this.getMirror(o);
        if (a != null && a > o && a < this.to) {
          o = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Ci(e, i, null);
  }
}
const di = /* @__PURE__ */ Object.create(null);
class Ct {
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
    let r = di[t.stepType];
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
    if (e in di)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return di[e] = t, t.prototype.jsonID = e, t;
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
function Ji(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Ji(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return Y.fromArray(r);
}
class hn extends Ct {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new ue(Ji(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ft.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Vt(this.from, this.to, this.mark);
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
class Vt extends Ct {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new ue(Ji(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ft.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new hn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Vt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Vt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Vt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Vt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ct.jsonID("removeMark", Vt);
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
    return ft.fromReplace(e, this.pos, this.pos + 1, new ue(Y.from(r), 0, t.isLeaf ? 0 : 1));
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
    return ft.fromReplace(e, this.pos, this.pos + 1, new ue(Y.from(r), 0, t.isLeaf ? 0 : 1));
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
    return this.structure && Ei(e, this.from, this.to) ? ft.fail("Structure replace would overwrite content") : ft.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Bt([this.from, this.to - this.from, this.slice.size]);
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
      let t = this.slice.size + e.slice.size == 0 ? ue.empty : new ue(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new dt(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? ue.empty : new ue(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
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
    return new dt(t.from, t.to, ue.fromJSON(e, t.slice), !!t.structure);
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
    if (this.structure && (Ei(e, this.from, this.gapFrom) || Ei(e, this.gapTo, this.to)))
      return ft.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ft.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ft.fromReplace(e, this.from, this.to, r) : ft.fail("Content does not fit in gap");
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
    return new mt(t.from, t.to, t.gapFrom, t.gapTo, ue.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ct.jsonID("replaceAround", mt);
function Ei(n, e, t) {
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
  n.doc.nodesBetween(e, t, (a, u, c) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && c.type.allowsMarkType(r.type)) {
      let f = Math.max(u, e), h = Math.min(u + a.nodeSize, t), m = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(m) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = h : i.push(s = new Vt(f, h, d[g])));
      l && l.to == f ? l.to = h : o.push(l = new hn(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function ou(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof ti) {
      let u = s.marks, c;
      for (; c = r.isInSet(u); )
        (a || (a = [])).push(c), u = c.removeFromSet(u);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let u = Math.min(l + s.nodeSize, t);
      for (let c = 0; c < a.length; c++) {
        let d = a[c], f;
        for (let h = 0; h < i.length; h++) {
          let m = i[h];
          m.step == o - 1 && d.eq(i[h].style) && (f = m);
        }
        f ? (f.to = u, f.step = o) : i.push({ style: d, from: Math.max(l, e), to: u, step: o });
      }
    }
  }), i.forEach((s) => n.step(new Vt(s.from, s.to, s.style)));
}
function Vi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let u = o.child(a), c = l + u.nodeSize, d = r.matchType(u.type);
    if (!d)
      s.push(new dt(l, c, ue.empty));
    else {
      r = d;
      for (let f = 0; f < u.marks.length; f++)
        t.allowsMarkType(u.marks[f].type) || n.step(new Vt(l, c, u.marks[f]));
      if (i && u.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, m;
        for (; f = h.exec(u.text); )
          m || (m = new ue(Y.from(t.schema.text(" ", t.allowedMarks(u.marks))), 0, 0)), s.push(new dt(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = c;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(Y.empty, !0);
    n.replace(l, l, new ue(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function su(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Xn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !su(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function lu(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, u = l, c = Y.empty, d = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, c = Y.from(r.node(m).copy(c)), d++) : a--;
  let f = Y.empty, h = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, f = Y.from(i.node(m).copy(f)), h++) : u++;
  n.step(new mt(a, u, s, l, new ue(c.append(f), d, h), c.size - d, !0));
}
function tl(n, e, t = null, r = n) {
  let i = au(n, e), o = i && cu(r, e);
  return o ? i.map(Eo).concat({ type: e, attrs: t }).concat(o.map(Eo)) : null;
}
function Eo(n) {
  return { type: n, attrs: null };
}
function au(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function cu(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let u = r; a && u < i; u++)
    a = a.matchType(t.child(u).type);
  return !a || !a.validEnd ? null : s;
}
function uu(n, e, t) {
  let r = Y.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = Y.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new mt(i, o, i, o, new ue(r, 0, 0), t.length, !0));
}
function du(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && fu(n.doc, n.mapping.slice(o).map(l), r)) {
      let u = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !m ? u = !1 : !h && m && (u = !0);
      }
      u === !1 && rl(n, s, l, o), Vi(n, n.mapping.slice(o).map(l, 1), r, void 0, u === null);
      let c = n.mapping.slice(o), d = c.map(l, 1), f = c.map(l + s.nodeSize, 1);
      return n.step(new mt(d, f, d + 1, f - 1, new ue(Y.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), u === !0 && nl(n, s, l, o), !1;
    }
  });
}
function nl(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.isText) {
      let s, l = /\r?\n|\r/g;
      for (; s = l.exec(i.text); ) {
        let a = n.mapping.slice(r).map(t + 1 + o + s.index);
        n.replaceWith(a, a + 1, e.type.schema.linebreakReplacement.create());
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
  n.step(new mt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new ue(Y.from(s), 0, 0), 1, !0));
}
function on(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let u = i.depth - 1, c = t - 2; u > o; u--, c--) {
    let d = i.node(u), f = i.index(u);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), m = r && r[c + 1];
    m && (h = h.replaceChild(0, m.type.create(m.attrs)));
    let g = r && r[c] || d;
    if (!d.canReplace(f + 1, d.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function pu(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = Y.empty, s = Y.empty;
  for (let l = i.depth, a = i.depth - t, u = t - 1; l > a; l--, u--) {
    o = Y.from(i.node(l).copy(o));
    let c = r && r[u];
    s = Y.from(c ? c.type.create(c.attrs, s) : i.node(l).copy(s));
  }
  n.step(new dt(e, e, new ue(o.append(s), t, t), !0));
}
function Mn(n, e) {
  let t = n.resolve(e), r = t.index();
  return il(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
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
function il(n, e) {
  return !!(n && e && !n.isLeaf && mu(n, e));
}
function ni(n, e, t = -1) {
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
function gu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let c = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    c && !d ? r = !1 : !c && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let c = n.doc.resolve(e + t);
    rl(n, c.node(), c.before(), l);
  }
  s.inlineContent && Vi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), u = a.map(e - t);
  if (n.step(new dt(u, a.map(e + t, -1), ue.empty, !0)), r === !0) {
    let c = n.doc.resolve(u);
    nl(n, c.node(), c.before(), n.steps.length);
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
function ri(n, e, t = e, r = ue.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return ol(i, o, r) ? new dt(e, t, r) : new xu(i, o, r).fit();
}
function ol(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class xu {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = Y.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = Y.from(e.node(i).copy(this.placed));
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
    let a = new ue(o, s, l);
    return e > -1 ? new mt(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new dt(r.pos, i.pos, a) : null;
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
        r ? (o = fi(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: u } = this.frontier[l], c, d = null;
          if (t == 1 && (s ? u.matchType(s.type) || (d = u.fillBefore(Y.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (c = u.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: c };
          if (o && u.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = fi(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new ue(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = fi(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new ue(Qn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new ue(Qn(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, u = 0, c = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        c.push(i.child(g));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; u < l.childCount; ) {
      let g = l.child(u), b = d.matchType(g.type);
      if (!b)
        break;
      u++, (u > 1 || a == 0 || g.content.size) && (d = b, c.push(sl(g.mark(f.allowedMarks(g.marks)), u == 1 ? a : 0, u == l.childCount ? h : -1)));
    }
    let m = u == l.childCount;
    m || (h = -1), this.placed = Zn(this.placed, t, Y.from(c)), this.frontier[t].match = d, m && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, b = l; g < h; g++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? ue.empty : new ue(Qn(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new ue(Qn(s.content, e, u), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !hi(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = hi(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: u } = this.frontier[l], c = hi(e, l, u, a, !0);
          if (!c || c.childCount)
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
    i.match = i.match.matchType(e), this.placed = Zn(this.placed, this.depth, Y.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(Y.empty, !0);
    t.childCount && (this.placed = Zn(this.placed, this.frontier.length, t));
  }
}
function Qn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Qn(n.firstChild.content, e - 1, t)));
}
function Zn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Zn(n.lastChild.content, e - 1, t)));
}
function fi(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function sl(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, sl(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(Y.empty, !0)))), n.copy(r);
}
function hi(n, e, t, r, i) {
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
  if (ol(i, o, r))
    return n.step(new dt(e, t, r));
  let s = al(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let m = i.node(f).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == h && s.splice(1, 0, -f);
  }
  let a = s.indexOf(l), u = [], c = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let m = f.firstChild;
    if (u.push(m), h == r.openStart)
      break;
    f = m.content;
  }
  for (let f = c - 1; f >= 0; f--) {
    let h = u[f], m = vu(h.type);
    if (m && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      c = f;
    else if (m || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + c + 1) % (r.openStart + 1), m = u[h];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let b = s[(g + a) % s.length], x = !0;
        b < 0 && (x = !1, b = -b);
        let L = i.node(b - 1), w = i.index(b - 1);
        if (L.canReplaceWith(w, w, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new ue(ll(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function ll(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(ll(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(Y.empty, !0));
  }
  return n;
}
function ku(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = yu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new ue(Y.from(r), 0, 0));
}
function Su(n, e, t) {
  let r = n.doc.resolve(e), i = n.doc.resolve(t);
  if (r.parent.isTextblock && i.parent.isTextblock && r.start() != i.start() && r.parentOffset == 0 && i.parentOffset == 0) {
    let s = r.sharedDepth(t), l = !1;
    for (let a = r.depth; a > s; a--)
      r.node(a).type.spec.isolating && (l = !0);
    for (let a = i.depth; a > s; a--)
      i.node(a).type.spec.isolating && (l = !0);
    if (!l) {
      for (let a = r.depth; a > 0 && e == r.start(a); a--)
        e = r.before(a);
      for (let a = i.depth; a > 0 && t == i.start(a); a--)
        t = i.before(a);
      r = n.doc.resolve(e), i = n.doc.resolve(t);
    }
  }
  let o = al(r, i);
  for (let s = 0; s < o.length; s++) {
    let l = o[s], a = s == o.length - 1;
    if (a && l == 0 || r.node(l).type.contentMatch.validEnd)
      return n.delete(r.start(l), i.end(l));
    if (l > 0 && (a || r.node(l - 1).canReplace(r.index(l - 1), i.indexAfter(l - 1))))
      return n.delete(r.before(l), i.after(l));
  }
  for (let s = 1; s <= r.depth && s <= i.depth; s++)
    if (e - r.start(s) == r.depth - s && t > r.end(s) && i.end(s) - t != i.depth - s && r.start(s - 1) == i.start(s - 1) && r.node(s - 1).canReplace(r.index(s - 1), i.index(s - 1)))
      return n.delete(r.before(s), t);
  n.delete(e, t);
}
function al(n, e) {
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
    return ft.fromReplace(e, this.pos, this.pos + 1, new ue(Y.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Bt.empty;
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
    return Bt.empty;
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
      r && (e = i.map(e, 1), t = i.map(t, -1)), i.forEach((o, s, l, a) => {
        e = Math.min(e, l), t = Math.max(t, a);
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
  replace(e, t = e, r = ue.empty) {
    let i = ri(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new ue(Y.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, ue.empty);
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
    return Vi(this, e, t, r), this;
  }
}
const pi = /* @__PURE__ */ Object.create(null);
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
  replace(e, t = ue.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: u } = s[l], c = e.mapping.slice(o);
      e.replaceRange(c.map(a.pos), c.map(u.pos), l ? ue.empty : t), l == 0 && Ro(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(r), u = a.map(s.pos), c = a.map(l.pos);
      o ? e.deleteRange(u, c) : (e.replaceRangeWith(u, c, t), Ro(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Pt(e) : On(e.node(0), e.parent, e.pos, e.index(), t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Yt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return On(e, e, 0, 0, 1) || new Yt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return On(e, e, e.content.size, e.childCount, -1) || new Yt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = pi[t.type];
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
    if (e in pi)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return pi[e] = t, t.prototype.jsonID = e, t;
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
lt.prototype.visible = !0;
class Tu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Mo = !1;
function Ao(n) {
  !Mo && !n.parent.inlineContent && (Mo = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Pt extends lt {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Ao(e), Ao(t), super(e, t);
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
    return new Pt(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = ue.empty) {
    if (super.replace(e, t), t == ue.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Pt && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ii(this.anchor, this.head);
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
      let o = lt.findFrom(t, r, !0) || lt.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return lt.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (lt.findFrom(e, -r, !0) || lt.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Pt(e, t);
  }
}
lt.jsonID("text", Pt);
class ii {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ii(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Pt.between(e.resolve(this.anchor), e.resolve(this.head));
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
    return new ue(Y.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Xe && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Yi(this.anchor);
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
class Yi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ii(r, r) : new Yi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Xe.isSelectable(r) ? new Xe(t) : lt.near(t);
  }
}
class Yt extends lt {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = ue.empty) {
    if (t == ue.empty) {
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
    return new Yt(e);
  }
  map(e) {
    return new Yt(e);
  }
  eq(e) {
    return e instanceof Yt;
  }
  getBookmark() {
    return Cu;
  }
}
lt.jsonID("all", Yt);
const Cu = {
  map() {
    return this;
  },
  resolve(n) {
    return new Yt(n);
  }
};
function On(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Pt.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Xe.isSelectable(l))
        return Xe.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = On(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
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
  o.forEach((l, a, u, c) => {
    s == null && (s = c);
  }), n.setSelection(lt.near(n.doc.resolve(s), t));
}
function Io(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Tr {
  constructor(e, t, r) {
    this.name = e, this.init = Io(t.init, r), this.apply = Io(t.apply, r);
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
function ul(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const dl = (n, e, t) => {
  let r = ul(n, t);
  if (!r)
    return !1;
  let i = Ui(r);
  if (!i) {
    let s = r.blockRange(), l = s && Xn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (vl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "end") || Xe.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = ri(n.doc, r.before(s), r.after(s), ue.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Jn(o, "end") ? lt.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : Xe.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Eu = (n, e, t) => {
  let r = ul(n, t);
  if (!r)
    return !1;
  let i = Ui(r);
  return i ? fl(n, i, e) : !1;
}, Mu = (n, e, t) => {
  let r = pl(n, t);
  if (!r)
    return !1;
  let i = Xi(r);
  return i ? fl(n, i, e) : !1;
};
function fl(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let c = i.lastChild;
    if (!c)
      return !1;
    i = c;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let c = l.firstChild;
    if (!c)
      return !1;
    l = c;
  }
  let u = ri(n.doc, o, a, ue.empty);
  if (!u || u.from != o || u instanceof dt && u.slice.size >= a - o)
    return !1;
  if (t) {
    let c = n.tr.step(u);
    c.setSelection(Pt.create(c.doc, o)), t(c.scrollIntoView());
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
    o = Ui(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Xe.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Xe.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Ui(n) {
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
  let i = Xi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (vl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "start") || Xe.isSelectable(o))) {
    let s = ri(n.doc, r.before(), r.after(), ue.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Jn(o, "start") ? lt.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Xe.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
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
    o = Xi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Xe.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Xe.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Xi(n) {
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
const Au = (n, e) => {
  let t = n.selection, r = t instanceof Xe, i;
  if (r) {
    if (t.node.isTextblock || !Mn(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = ni(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Xe.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Ru = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Xe) {
    if (t.node.isTextblock || !Mn(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ni(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Iu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Xn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, yl = (n, e) => {
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
const Du = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Gi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(lt.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, xl = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Yt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Gi(i.parent.contentMatchAt(i.indexAfter()));
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
  let r = t.blockRange(), i = r && Xn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function $u(n) {
  return (e, t) => {
    if (e.selection instanceof Xe && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !on(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Pt || e.selection instanceof Yt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, u = !1, c = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        u = i.end(h) == i.pos + (i.depth - h), c = i.start(h) == i.pos - (i.depth - h), a = Gi(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(u && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = on(r.doc, d, s.length, s);
    if (f || (s[0] = a ? { type: a } : null, f = on(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !u && c && i.node(l).type != a) {
      let h = r.mapping.slice(o), m = h.map(i.before(l)), g = r.doc.resolve(m);
      a && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Lu = $u(), Pu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Xe.create(n.doc, i))), !0);
};
function Ou(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Mn(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function vl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && Ou(n, e, t))
    return !0;
  let u = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (u && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, m = Y.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = Y.from(s[x].create(null, m));
      m = Y.from(i.copy(m));
      let g = n.tr.step(new mt(e.pos - 1, h, e.pos, h, new ue(m, 1, 0), s.length, !0)), b = g.doc.resolve(h + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && Mn(g.doc, b.pos) && g.join(b.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let c = o.type.spec.isolating || r > 0 && a ? null : lt.findFrom(e, 1), d = c && c.$from.blockRange(c.$to), f = d && Xn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (u && Jn(o, "start", !0) && Jn(i, "end")) {
    let h = i, m = [];
    for (; m.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, b = 1;
    for (; !g.isTextblock; g = g.firstChild)
      b++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let x = Y.empty;
        for (let w = m.length - 1; w >= 0; w--)
          x = Y.from(m[w].copy(x));
        let L = n.tr.step(new mt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new ue(x, m.length, 0), 0, !0));
        t(L.scrollIntoView());
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
const zu = wl(-1), Fu = wl(1);
function Bu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && tl(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Do(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (a, u) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let c = t.doc.resolve(u), d = c.index();
            i = c.parent.canReplaceWith(d, d + 1, n);
          }
      });
    }
    if (!i)
      return !1;
    if (r) {
      let o = t.tr;
      for (let s = 0; s < t.selection.ranges.length; s++) {
        let { $from: { pos: l }, $to: { pos: a } } = t.selection.ranges[s];
        o.setBlockType(l, a, n, e);
      }
      r(o.scrollIntoView());
    }
    return !0;
  };
}
function Qi(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Qi(cl, dl, hl);
Qi(cl, ml, gl);
Qi(yl, xl, bl, Lu);
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
    let a = s.resolve(e.start - 2);
    o = new Br(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Br(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = tl(o, t, r, e);
  return l ? (n && ju(n, e, l, i, t), !0) : !1;
}
function ju(n, e, t, r, i) {
  let o = Y.empty;
  for (let c = t.length - 1; c >= 0; c--)
    o = Y.from(t[c].type.create(t[c].attrs, o));
  n.step(new mt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new ue(o, 0, 0), t.length, !0));
  let s = 0;
  for (let c = 0; c < t.length; c++)
    t[c].type == i && (s = c + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), u = e.parent;
  for (let c = e.startIndex, d = e.endIndex, f = !0; c < d; c++, f = !1)
    !f && on(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += u.child(c).nodeSize;
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
  o < s && (i.step(new mt(o - 1, s, o, s, new ue(Y.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Br(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Xn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Mn(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function Ku(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    h -= i.child(m).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, u = o.node(-1), c = o.index(-1);
  if (!u.canReplace(c + (l ? 0 : 1), c + 1, s.content.append(a ? Y.empty : Y.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new mt(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new ue((l ? Y.empty : Y.from(i.copy(Y.empty))).append(a ? Y.empty : Y.from(i.copy(Y.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Ju(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (u) => u.childCount > 0 && u.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let u = a.lastChild && a.lastChild.type == l.type, c = Y.from(u ? n.create() : null), d = new ue(Y.from(n.create(null, Y.from(l.type.create(null, c)))), u ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new mt(f - (u ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
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
var Vu = class Sl {
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
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...c) => {
      const d = a(...c)(s);
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
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], a = !!e, u = e || o.tr, c = () => (!a && t && !u.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(u), l.every((f) => f === !0)), d = {
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...g) => {
        const b = this.buildProps(u, t), x = h(...g)(b);
        return l.push(x), d;
      }])),
      run: c
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
      ...Object.fromEntries(Object.entries(t).map(([l, a]) => [l, (...u) => a(...u)({
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
        return Object.fromEntries(Object.entries(r).map(([a, u]) => [a, (...c) => u(...c)(l)]));
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
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: u, mapping: c } = e, d = u.resolve(c.map(a)), f = u.resolve(c.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h) return;
      const m = Xn(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, g);
      }
      (m || m === 0) && e.lift(h, m);
    });
  }), !0;
}, Gu = (n) => (e) => n(e), Qu = () => ({ state: n, dispatch: e }) => xl(n, e), Zu = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new qt(r.doc.resolve(Math.max(s - 1, 0)))), !0;
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
      const l = o.before(s), a = o.after(s);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, nd = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, rd = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, $o = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return rd(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, id = (n, e, t) => ({
  from: $o(n, t, "left"),
  to: $o(e, t, "right")
}), od = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: u, to: c } = id(l, a, n.schema);
      t.deleteRange(u, c);
    }), t.selection.empty || t.setSelection(qt.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, sd = () => ({ commands: n }) => n.keyboardShortcut("Enter"), ld = () => ({ state: n, dispatch: e }) => Du(n, e);
function ad(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Wr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : ad(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Nl(n, e, t = {}) {
  return n.find((r) => r.type === e && Wr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Lo(n, e, t = {}) {
  return !!Nl(n, e, t);
}
function Tl(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((u) => u.type === e);
    a && (t = a.attrs);
  }
  if (!Nl([...r.node.marks], e, t)) return;
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
const cd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = bn(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: u, to: c } = l;
  if (i) {
    const d = Tl(a, o, e);
    if (d && d.from <= u && d.to >= c) {
      const f = qt.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, ud = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function Cl(n) {
  return n instanceof qt;
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
  return e === "all" ? qt.create(n, kn(0, i, o), kn(n.content.size, i, o)) : qt.create(n, kn(e, i, o), kn(e, i, o));
}
function Po() {
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
    (qr() || Po()) && r.dom.focus(), fd() && !qr() && !Po() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !Cl(t.state.selection))
    return s(), !0;
  const l = dd(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, pd = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), md = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
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
function Cr(n) {
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
    if (Array.isArray(n) && n.length > 0) return Y.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Vn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new Xc({
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
      if (t.slice ? jn.fromSchema(a).parseSlice(Cr(n), t.parseOptions) : jn.fromSchema(a).parse(Cr(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = jn.fromSchema(e);
    return t.slice ? o.parseSlice(Cr(n), t.parseOptions).content : o.parse(Cr(n), t.parseOptions);
  }
  return Vn("", e, t);
}
function Al(n) {
  return !("type" in n);
}
function Rl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof dt || i instanceof mt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, u, c) => {
    s === 0 && (s = c);
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
    const a = (b) => {
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
      a(b);
    }
    try {
      var s;
      l = Vn(e, o.schema, {
        parseOptions: u,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (b) {
      return a(b), !1;
    }
    let { from: c, to: d } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, f = !0, h = !0;
    const m = Al(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, h = h ? b.isBlock : !1;
    }), c === d && h) {
      const { parent: b } = r.doc.resolve(c);
      b.isTextblock && !b.type.spec.code && !b.childCount && (c -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((b) => b.text || "").join("") : Ml(e) ? g = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, c, d);
    else {
      g = Y.from(m);
      const b = r.doc.resolve(c), x = b.node(), L = b.parentOffset === 0, w = x.isText || x.isTextblock, k = x.content.size > 0;
      L && w && k && h && (c = Math.max(0, c - 1)), r.replaceWith(c, d, m);
    }
    t.updateSelection && Rl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: c,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: c,
      text: g
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
const yd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const u = Il(a.parent.contentMatchAt(a.index()));
  if (!u) return !1;
  const c = Object.keys(u.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => c.includes(h))) : {};
  let f;
  if (s) {
    const h = Vn(s, r.schema);
    f = u.createAndFill(d, h);
  } else f = u.createAndFill(d);
  return f ? (t && (e.insert(a.pos, f), l && Rl(e, e.steps.length - 1, -1)), !0) : !1;
}, xd = () => ({ state: n, dispatch: e }) => Au(n, e), bd = () => ({ state: n, dispatch: e }) => Ru(n, e), vd = () => ({ state: n, dispatch: e }) => dl(n, e), wd = () => ({ state: n, dispatch: e }) => ml(n, e), kd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ni(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Sd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ni(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Nd = () => ({ state: n, dispatch: e }) => Eu(n, e), Td = () => ({ state: n, dispatch: e }) => Mu(n, e);
function Dl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Cd(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a)) s = !0;
    else if (/^a(lt)?$/i.test(a)) r = !0;
    else if (/^(c|ctrl|control)$/i.test(a)) i = !0;
    else if (/^s(hift)?$/i.test(a)) o = !0;
    else if (/^mod$/i.test(a))
      qr() || Dl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
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
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (u) => u(t, l));
  });
  return a == null || a.steps.forEach((u) => {
    const c = u.map(r.mapping);
    c && i && r.maybeStep(c);
  }), !0;
};
function Zi(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Tt(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (c, d) => {
    if (c.isText) return;
    const f = Math.max(r, d), h = Math.min(i, d + c.nodeSize);
    l.push({
      node: c,
      from: f,
      to: h
    });
  });
  const a = i - r, u = l.filter((c) => s ? s.name === c.node.type.name : !0).filter((c) => Wr(c.node.attrs, t, { strict: !1 }));
  return o ? !!u.length : u.reduce((c, d) => c + d.to - d.from, 0) >= a;
}
const Md = (n, e = {}) => ({ state: t, dispatch: r }) => Zi(t, Tt(n, t.schema), e) ? Iu(t, r) : !1, Ad = () => ({ state: n, dispatch: e }) => bl(n, e), Rd = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Wu(r)(e, t);
}, Id = () => ({ state: n, dispatch: e }) => yl(n, e);
function $l(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Oo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Dd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = $l(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((u) => {
    r.doc.nodesBetween(u.$from.pos, u.$to.pos, (c, d) => {
      o && o === c.type && (a = !0, i && t.setNodeMarkup(d, void 0, Oo(c.attrs, e))), s && c.marks.length && c.marks.forEach((f) => {
        s === f.type && (a = !0, i && t.addMark(d, d + c.nodeSize, s.create(Oo(f.attrs, e))));
      });
    });
  }), a;
}, $d = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Ld = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new ha(n.doc);
    n.setSelection(t);
  }
  return !0;
}, Pd = () => ({ state: n, dispatch: e }) => hl(n, e), Od = () => ({ state: n, dispatch: e }) => gl(n, e), zd = () => ({ state: n, dispatch: e }) => Pu(n, e), Fd = () => ({ state: n, dispatch: e }) => Fu(n, e), Bd = () => ({ state: n, dispatch: e }) => zu(n, e);
function Hd(n, e, t = {}, r = {}) {
  return Vn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const _d = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const u = Hd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const c = Al(u) ? u.content : [u];
      o.replaceWith(0, a.content.size, c).setMeta("preventUpdate", !t);
    }
    return !0;
  }
  return s && o.setMeta("preventUpdate", !t), l.insertContentAt({
    from: 0,
    to: a.content.size
  }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function jd(n, e) {
  const t = bn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
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
function eo(n) {
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
function Mi(n, e = void 0, ...t) {
  return Kd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Ll(n) {
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
  return n.nodesBetween(r, i, (a, u, c, d) => {
    a.isBlock && u > r && (l += o);
    const f = s == null ? void 0 : s[a.type.name];
    if (f)
      return c && (l += f({
        node: a,
        pos: u,
        parent: c,
        index: d,
        range: e
      })), !1;
    if (a.isText) {
      var h;
      l += a == null || (h = a.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, u) - u, i - u);
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
      i.forEach((l, a) => {
        s.push({
          from: l,
          to: a
        });
      });
    else {
      const { from: l, to: a } = t[o];
      if (l === void 0 || a === void 0) return;
      s.push({
        from: l,
        to: a
      });
    }
    s.forEach(({ from: l, to: a }) => {
      const u = e.slice(o).map(l, -1), c = e.slice(o).map(a), d = e.invert().map(u, -1), f = e.invert().map(c);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: u,
          to: c
        }
      });
    });
  }), Ud(r);
}
function Rr(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Gd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? bn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((c) => o ? o.name === c.type.name : !0).find((c) => Wr(c.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: c, $to: d }) => {
    const f = c.pos, h = d.pos;
    n.doc.nodesBetween(f, h, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, g), x = Math.min(h, g + m.nodeSize), L = x - b;
      s += L, l.push(...m.marks.map((w) => ({
        mark: w,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((c) => o ? o.name === c.mark.type.name : !0).filter((c) => Wr(c.mark.attrs, t, { strict: !1 })).reduce((c, d) => c + d.to - d.from, 0), u = l.filter((c) => o ? c.mark.type !== o && c.mark.type.excludes(o) : !0).reduce((c, d) => c + d.to - d.from, 0);
  return (a > 0 ? a + u : a) >= s;
}
function mi(n, e) {
  const { nodeExtensions: t } = Ll(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Mi(lr(r, "group", {
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
function Qd(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (Cl(r) && (i = r.$cursor), i) {
    var o;
    const l = (o = n.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((a) => a.type.excludes(t)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: l, $to: a }) => {
    let u = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (c, d, f) => {
      if (u) return !1;
      if (c.isInline) {
        const h = !f || f.type.allowsMarkType(t), m = !!t.isInSet(c.marks) || !c.marks.some((g) => g.type.excludes(t));
        u = h && m;
      }
      return !u;
    }), u;
  });
}
const Zd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = bn(n, r.schema);
  if (i)
    if (s) {
      const u = jd(r, a);
      t.addStoredMark(a.create({
        ...u,
        ...e
      }));
    } else l.forEach((u) => {
      const c = u.$from.pos, d = u.$to.pos;
      r.doc.nodesBetween(c, d, (f, h) => {
        const m = Math.max(h, c), g = Math.min(h + f.nodeSize, d);
        f.marks.find((b) => b.type === a) ? f.marks.forEach((b) => {
          a === b.type && t.addMark(m, g, a.create({
            ...b.attrs,
            ...e
          }));
        }) : t.addMark(m, g, a.create(e));
      });
    });
  return Qd(r, t, a);
}, ef = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), tf = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Tt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Do(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Do(o, {
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
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, u) => {
    a.isText || t.setNodeMarkup(u, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, of = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = qt.atStart(r).from, l = qt.atEnd(r).to, a = kn(i, s, l), u = kn(o, s, l), c = qt.create(r, a, u);
    e.setSelection(c);
  }
  return !0;
}, sf = (n) => ({ state: e, dispatch: t }) => {
  const r = Tt(n, e.schema);
  return Ju(r)(e, t);
};
function zo(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const lf = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, u = i.extensionManager.attributes, c = Rr(u, l.node().type.name, l.node().attrs);
  if (o instanceof qn && o.node.isBlock)
    return !l.parentOffset || !on(s, l.pos) ? !1 : (r && (n && zo(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : Il(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [{
    type: f,
    attrs: c
  }] : void 0, m = on(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !m && on(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, h = f ? [{
    type: f,
    attrs: c
  }] : void 0), r) {
    if (m && (o instanceof qt && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), b = e.doc.resolve(g);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && zo(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, af = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Tt(n, r.schema), { $from: l, $to: a } = r.selection, u = r.selection.node;
  if (u && u.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const c = l.node(-1);
  if (c.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = Y.empty;
      const L = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let J = l.depth - L; J >= l.depth - 3; J -= 1) x = Y.from(l.node(J).copy(x));
      const w = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, k = {
        ...Rr(d, l.node().type.name, l.node().attrs),
        ...e
      }, N = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(k)) || void 0;
      x = x.append(Y.from(s.createAndFill(null, N) || void 0));
      const C = l.before(l.depth - (L - 1));
      t.replace(C, l.after(-w), new ue(x, 4 - L, 0));
      let W = -1;
      t.doc.nodesBetween(C, t.doc.content.size, (J, E) => {
        if (W > -1) return !1;
        J.isTextblock && J.content.size === 0 && (W = E + 1);
      }), W > -1 && t.setSelection(qt.near(t.doc.resolve(W))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? c.contentMatchAt(0).defaultType : null, m = {
    ...Rr(d, c.type.name, c.attrs),
    ...e
  }, g = {
    ...Rr(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const b = h ? [{
    type: s,
    attrs: m
  }, {
    type: h,
    attrs: g
  }] : [{
    type: s,
    attrs: m
  }];
  if (!on(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: L } = r, { splittableMarks: w } = o.extensionManager, k = L || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !k || !i) return !0;
    const N = k.filter((C) => w.includes(C.type.name));
    t.ensureMarks(N);
  }
  return !0;
};
function Fo(n) {
  return !n || n === "1" ? null : n;
}
function Ol(n, e) {
  return Fo(n) === Fo(e);
}
const gi = (n, e) => {
  const t = eo((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, t.pos)) || !Ol(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, yi = (n, e) => {
  const t = eo((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Mn(n.doc, r)) || !Ol(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function cf(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return qt.between(r, i);
}
const uf = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: u, can: c }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Tt(n, s.schema), m = Tt(e, s.schema), { selection: g, storedMarks: b } = s, { $from: x, $to: L } = g, w = x.blockRange(L), k = b || g.$to.parentOffset && g.$from.marks();
  if (!w) return !1;
  const N = eo((ie) => mi(ie.type.name, d))(g), C = g.from === 0 && g.to === s.doc.content.size, W = s.doc.content.content, J = W.length === 1 ? W[0] : null, E = C && J && mi(J.type.name, d) ? {
    node: J,
    pos: 0
  } : null, V = N ?? E, R = !!N && w.depth >= 1 && w.depth - N.depth <= 1, ne = !!E;
  if ((R || ne) && V) {
    if (V.node.type === h)
      return C && ne ? a().command(({ tr: ie, dispatch: H }) => {
        const K = cf(ie);
        return K ? (ie.setSelection(K), H && H(ie), !0) : !1;
      }).liftListItem(m).run() : u.liftListItem(m);
    if (mi(V.node.type.name, d) && h.validContent(V.node.content)) return a().command(() => (o.setNodeMarkup(V.pos, h), !0)).command(() => gi(o, h)).command(() => yi(o, h)).run();
  }
  return !t || !k || !l ? a().command(() => c().wrapInList(h, r) ? !0 : u.clearNodes()).wrapInList(h, r).command(() => gi(o, h)).command(() => yi(o, h)).run() : a().command(() => {
    const ie = c().wrapInList(h, r), H = k.filter((K) => f.includes(K.type.name));
    return o.ensureMarks(H), ie ? !0 : u.clearNodes();
  }).wrapInList(h, r).command(() => gi(o, h)).command(() => yi(o, h)).run();
}, df = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = bn(n, r.schema);
  return Gd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, ff = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Tt(n, r.schema), s = Tt(e, r.schema), l = Zi(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, hf = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Tt(n, t.schema);
  return Zi(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, pf = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(n))) {
      if (e) {
        const s = n.tr, l = o.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1) s.step(l.steps[a].invert(l.docs[a]));
        if (o.text) {
          const a = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, n.schema.text(o.text, a));
        } else s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, mf = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s) return !0;
  const { nonClearableMarks: a } = r.extensionManager;
  if (t) {
    const u = Object.values(r.schema.marks).filter((c) => i || !a.includes(c.name));
    l.forEach((c) => {
      for (const d of u) e.removeMark(c.$from.pos, c.$to.pos, d);
    });
  }
  return !0;
}, gf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = bn(n, r.schema), { $from: a, empty: u, ranges: c } = s;
  if (!i) return !0;
  if (u && o) {
    var d;
    let { from: f, to: h } = s;
    const m = Tl(a, l, (d = a.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, h = m.to), t.removeMark(f, h, l);
  } else c.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, yf = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText) return;
    const u = { ...l.attrs };
    delete u.dir, e.setNodeMarkup(a, void 0, u);
  }), !0;
}, xf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = $l(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Tt(n, r.schema)), l === "mark" && (s = bn(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((u) => {
    const c = u.$from.pos, d = u.$to.pos;
    let f, h, m, g;
    t.selection.empty ? r.doc.nodesBetween(c, d, (b, x) => {
      o && o === b.type && (a = !0, m = Math.max(x, c), g = Math.min(x + b.nodeSize, d), f = x, h = b);
    }) : r.doc.nodesBetween(c, d, (b, x) => {
      x < c && o && o === b.type && (a = !0, m = Math.max(x, c), g = Math.min(x + b.nodeSize, d), f = x, h = b), x >= c && x <= d && (o && o === b.type && (a = !0, i && t.setNodeMarkup(x, void 0, {
        ...b.attrs,
        ...e
      })), s && b.marks.length && b.marks.forEach((L) => {
        if (s === L.type && (a = !0, i)) {
          const w = Math.max(x, c), k = Math.min(x + b.nodeSize, d);
          t.addMark(w, k, s.create({
            ...L.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((b) => {
      s === b.type && i && t.addMark(m, g, s.create({
        ...b.attrs,
        ...e
      }));
    }));
  }), a;
}, bf = new Ut("__tiptap_decorations__"), vf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(bf, {
  type: "force",
  name: n
}), !0), wf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return Bu(i, e)(t, r);
}, kf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Tt(n, t.schema);
  return Hu(i, e)(t, r);
};
var Sf = /* @__PURE__ */ $c({
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
  extendMarkRange: () => cd,
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
  liftEmptyBlock: () => Ad,
  liftListItem: () => Rd,
  newlineInCode: () => Id,
  resetAttributes: () => Dd,
  scrollIntoView: () => $d,
  selectAll: () => Ld,
  selectNodeBackward: () => Pd,
  selectNodeForward: () => Od,
  selectParentNode: () => zd,
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
  splitListItem: () => af,
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
function zl(n, e) {
  const t = { ...n };
  return Er(n) && Er(e) && Object.keys(e).forEach((r) => {
    Er(e[r]) && Er(n[r]) ? t[r] = zl(n[r], e[r]) : t[r] = e[r];
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
    return { ...Mi(lr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Mi(lr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => zl(this.options, n)
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
}, Tf = class Bl extends Fl {
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
}, Kt = class Hl extends Fl {
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
Kt.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Ut("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Vd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((a, u) => a.$from.pos - u.$from.pos).map(({ $from: a, $to: u }) => Jd(r, {
          from: a.pos,
          to: u.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Kt.create({
  name: "commands",
  addCommands() {
    return { ...Sf };
  }
});
Kt.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const a = Wd(n.before, [n, ...e]);
      Xd(a).forEach((c) => {
        a.mapping.mapResult(c.oldRange.from).deletedAfter && a.mapping.mapResult(c.oldRange.to).deletedBefore && a.before.nodesBetween(c.oldRange.from, c.oldRange.to, (d, f) => {
          const h = f + d.nodeSize - 2, m = c.oldRange.from <= f && h <= c.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: f,
            to: h,
            newFrom: a.mapping.map(f),
            newTo: a.mapping.map(h),
            deletedRange: c.oldRange,
            newRange: c.newRange,
            partial: !m,
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        });
      });
      const u = a.mapping;
      a.steps.forEach((c, d) => {
        if (c instanceof Vt) {
          var f, h;
          const m = u.slice(d).map(c.from, -1), g = u.slice(d).map(c.to), b = u.invert().map(m, -1), x = u.invert().map(g), L = m > 0 ? (f = a.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((k) => k.eq(c.mark)) : !1, w = (h = a.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((k) => k.eq(c.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: c.mark,
            from: c.from,
            to: c.to,
            deletedRange: {
              from: b,
              to: x
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(w || L),
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        }
      });
    };
    !((t = (r = this.editor.options.coreExtensionOptions) === null || r === void 0 || (r = r.delete) === null || r === void 0 ? void 0 : r.async) !== null && t !== void 0) || t ? setTimeout(i, 0) : i();
  }
});
Kt.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new ln({
      key: new Ut("tiptapDrop"),
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
Kt.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new ln({
      key: new Ut("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Cf = new Ut("focusEvents");
Kt.create({
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
Kt.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: u } = l, { empty: c, $anchor: d } = a, { pos: f, parent: h } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = g && m.parent.childCount === 1 ? b === d.pos : Bn.atStart(u).from === f;
        return !c || !h.type.isTextblock || h.textContent.length || !x || x && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
      key: new Ut("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = Bn.atStart(e.doc).from, u = Bn.atEnd(e.doc).to;
        if (o || !(s === a && l === u) || !Pl(t.doc)) return;
        const c = t.tr, d = kl({
          state: t,
          transaction: c
        }), { commands: f } = new Vu({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!c.steps.length)
          return c;
      }
    })];
  }
});
Kt.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new ln({
      key: new Ut("tiptapPaste"),
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
Kt.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new ln({
      key: new Ut("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Kt.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = Ll(this.extensions);
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
      key: new Ut("textDirection"),
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
]), Af = /^(https?:\/\/|mailto:)/i;
function Rf(n) {
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
function Ai(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(Ai(a));
    return l;
  };
  if (!Ef.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Af.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Rf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Ai(l));
  return i;
}
function _l(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function If(n) {
  const e = _l(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Ai(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function ap(n) {
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
function Df(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Bo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const $f = { text: "#52525b" }, Lf = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, a = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, u = (a == null ? void 0 : a.color) ?? $f, c = (a == null ? void 0 : a.label) ?? `{{${s}}}`, d = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ p(
    ua,
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
      onMouseDown: (h) => {
        var x;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), b = g.nodeAfter;
        b && qn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new qn(g))), (x = l.onTokenClick) == null || x.call(l, s, h.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ p("span", { className: "rt-token-nested", children: c }) : c
    }
  );
}, Pf = Na.extend({
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
    return ca(Lf);
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
    return ["span", aa({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), Of = 240, zf = 280, Ff = ({ props: n, onApi: e }) => {
  const t = Qr(), r = v(e);
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
      style: { width: zf, maxHeight: Of },
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
}, Ho = () => {
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
        var c, d;
        if (!n) return;
        const a = (d = (c = n.props) == null ? void 0 : c.clientRect) == null ? void 0 : d.call(c), u = a && !s.endsWith("-end") ? a.width : 0;
        n.holder.style.position = l, n.holder.style.left = `${i + u}px`, n.holder.style.top = `${o}px`;
      }
    }));
  };
  return {
    onStart(r) {
      const i = document.createElement("div");
      i.style.zIndex = "10002";
      const o = Ta(i);
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
        const a = s.highlightedIndex, u = l === "ArrowDown" ? 1 : -1;
        return s.setHighlighted((a + u + i.length) % i.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        r.preventDefault();
        const a = s.highlightedIndex, u = a >= 0 ? a : 0, c = s.items[u];
        return c ? c.activate() : i[u] && o({ field: i[u].key }), !0;
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
}), Ir = new Ut("retainedSelectionHighlight"), _f = Kt.create({
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
              decorations: s ? gr.empty : gr.create(n.doc, [pa.inline(i, o, { class: "rt-retained-selection" })])
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
function jl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function jf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = jl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Wf = ct.forwardRef(({
  value: n,
  onChange: e,
  placeholder: t,
  disabled: r,
  className: i,
  onStateChange: o,
  resolveToken: s,
  suggestionItems: l,
  attributeItems: a,
  onTokenClick: u,
  onSelectionChange: c
}, d) => {
  const f = Ot(), h = (f == null ? void 0 : f.mode) ?? "dark", m = (f == null ? void 0 : f.accent) ?? "zinc", g = v(s);
  g.current = s;
  const b = v(l);
  b.current = l;
  const x = v(a);
  x.current = a;
  const L = v(u);
  L.current = u;
  const w = v(c);
  w.current = c;
  const k = v(null), N = v(null), C = v(e);
  C.current = e;
  const W = v(r);
  W.current = r;
  const J = v(o);
  J.current = o;
  const E = v(null), V = (K) => {
    var te;
    const I = K.getAttributes("textStyle"), U = K.getAttributes("reportTextStyle"), { from: q, to: O, empty: G } = K.state.selection;
    let M = !1, ye = !1, ve = !1;
    if (!G) {
      const be = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Set(), _ = /* @__PURE__ */ new Set();
      K.state.doc.nodesBetween(q, O, (D) => {
        if (!D.isText) return;
        const j = D.marks.find((ke) => ke.type.name === "textStyle");
        be.add((j == null ? void 0 : j.attrs.fontFamily) || ""), le.add((j == null ? void 0 : j.attrs.fontSize) || "");
        const Re = D.marks.find((ke) => ke.type.name === "reportTextStyle");
        _.add((Re == null ? void 0 : Re.attrs.styleId) || "");
      }), M = be.size > 1, ye = le.size > 1, ve = _.size > 1;
    }
    const xe = {
      bold: K.isActive("bold"),
      italic: K.isActive("italic"),
      underline: K.isActive("underline"),
      strike: K.isActive("strike"),
      link: K.isActive("link"),
      color: I.color || "",
      fontFamily: I.fontFamily || "",
      fontSize: I.fontSize || "",
      textStyle: U.styleId || "",
      hasSelection: !G,
      fontFamilyMixed: M,
      fontSizeMixed: ye,
      textStyleMixed: ve
    }, me = E.current;
    me && me.bold === xe.bold && me.italic === xe.italic && me.underline === xe.underline && me.strike === xe.strike && me.link === xe.link && me.color === xe.color && me.fontFamily === xe.fontFamily && me.fontSize === xe.fontSize && me.textStyle === xe.textStyle && me.hasSelection === xe.hasSelection && me.fontFamilyMixed === xe.fontFamilyMixed && me.fontSizeMixed === xe.fontSizeMixed && me.textStyleMixed === xe.textStyleMixed || (E.current = xe, (te = J.current) == null || te.call(J, xe));
  }, R = (K) => {
    var G;
    const I = K.state.selection;
    let U = null;
    I instanceof qn && I.node.type.name === "token" ? (U = { key: I.node.attrs.field ?? "", pos: I.from }, k.current = I.from) : k.current != null && (k.current = K.state.tr.mapping.map(k.current));
    const q = N.current, O = q && U && q.key === U.key && q.pos === U.pos;
    !q && !U || O || (N.current = U, (G = w.current) == null || G.call(w, U));
  }, ne = (K) => {
    const I = If(Df(K));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(I) ? "" : I;
  }, ie = ct.useMemo(() => {
    const K = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: q }) => {
        var O;
        return ((O = b.current) == null ? void 0 : O.call(b, q)) ?? [];
      },
      command: ({ editor: q, range: O, props: G }) => {
        q.chain().focus().insertContentAt(O, { type: "token", attrs: { field: G.field } }).run();
      },
      render: Ho
    }, I = Pf.configure({
      resolve: g.current ?? null,
      suggestion: K,
      onTokenClick: (q, O, G) => {
        var M;
        k.current = G, (M = L.current) == null || M.call(L, q, O, G);
      }
    }), U = Kt.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Sa({
            pluginKey: new Ut("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: q, range: O }) => jl(q, O.from) != null,
            items: ({ editor: q, query: O }) => {
              var M;
              const G = jf(q);
              return G ? ((M = x.current) == null ? void 0 : M.call(x, G.chipKey, O)) ?? [] : [];
            },
            command: ({ editor: q, range: O, props: G }) => {
              q.chain().focus().insertContentAt(O, { type: "token", attrs: { field: G.field } }).run();
            },
            render: Ho
          })
        ];
      }
    });
    return [I, U];
  }, []), H = da({
    immediatelyRender: !1,
    extensions: [
      ma,
      ga.configure({ placeholder: t }),
      ya,
      xa,
      ba,
      Hf,
      _f,
      va,
      ka,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      wa.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...ie
    ],
    content: Bo(n || ""),
    editable: !r,
    onUpdate: ({ editor: K }) => {
      C.current(ne(K.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: K }) => {
      V(K), R(K);
    }
  });
  return ae(() => {
    if (!H || H.isFocused) return;
    ne(H.getHTML()) !== n && (E.current = null, H.commands.setContent(Bo(n || ""), { emitUpdate: !1 }), V(H));
  }, [n, H]), ae(() => {
    H && H.setEditable(!r);
  }, [r, H]), ae(() => {
    H && (E.current = null, V(H), R(H));
  }, [H]), Ko(d, () => ({
    exec: (K, I, U) => {
      if (!H || W.current) return;
      const q = H.chain(), O = (U == null ? void 0 : U.focus) === !1 ? q : q.focus();
      switch (K) {
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
    focus: (K) => H == null ? void 0 : H.commands.focus(K),
    insertToken: (K) => {
      !H || W.current || H.chain().focus().insertContent({ type: "token", attrs: { field: K } }).run();
    },
    replaceToken: (K) => {
      if (!H || W.current) return;
      const I = k.current;
      I != null && H.commands.command(({ tr: U }) => {
        const q = U.doc.nodeAt(I);
        if (!q || q.type.name !== "token") return !1;
        U.setNodeMarkup(I, void 0, { field: K });
        const O = U.doc.resolve(I);
        return O.nodeAfter && O.nodeAfter.type.name === "token" && U.setSelection(new qn(O)), !0;
      });
    },
    holdSelectionHighlight: (K) => {
      !H || H.isDestroyed || H.view.dispatch(H.state.tr.setMeta(Ir, { held: K }));
    }
  }), [H]), /* @__PURE__ */ p("div", { "data-mode": h, "data-accent": m, className: "contents", children: /* @__PURE__ */ p(fa, { editor: H, className: `richtext-editor ${i || ""}` }) });
});
Wf.displayName = "RichTextEditor";
const qf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Kf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], _o = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ p("span", { className: `${n} rounded-full border border-[color:var(--ui-input-border)] relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ p("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[var(--ui-text-muted)] -rotate-45" }) }), Jf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = re(!1), s = Ot();
  s == null || s.mode;
  const l = Xr(s);
  return /* @__PURE__ */ p(
    Zr,
    {
      open: i,
      onOpenChange: o,
      theme: l,
      width: "w-44",
      trigger: /* @__PURE__ */ A("button", { type: "button", disabled: e, className: `${Rc} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ p("span", { className: "truncate italic text-[color:var(--ui-text-faint)]", children: "Mixed" }) : /* @__PURE__ */ p("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ p(mn, { className: "w-3 h-3 text-[color:var(--ui-text-faint)] shrink-0" })
      ] }),
      children: qf.map((a) => /* @__PURE__ */ p(Ms, { onClick: () => {
        t(a), o(!1);
      }, icon: !r && a === n ? /* @__PURE__ */ p(ar, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ p("span", { style: { fontFamily: a }, children: a }) }, a))
    }
  );
}, Vf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = re(!1), o = ei(), s = Ot(), l = (s == null ? void 0 : s.mode) ?? "dark", a = Xr(s), [u, c] = re(""), d = () => {
    var h;
    const f = u.trim();
    f && ((h = n.current) == null || h.exec("link", f), i(!1));
  };
  return /* @__PURE__ */ p(
    Zr,
    {
      open: r,
      onOpenChange: i,
      theme: a,
      width: "w-64",
      trigger: /* @__PURE__ */ p(
        Lt,
        {
          theme: l,
          active: t,
          disabled: e,
          onMouseDown: (f) => f.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ p(ta, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ A("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ p(
          "input",
          {
            value: u,
            onChange: (f) => c(f.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (f) => {
              f.key === "Enter" && (f.preventDefault(), d());
            },
            style: o.input,
            className: Mc + " w-full"
          }
        ),
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(Lt, { theme: l, onClick: d, style: o.control, disabled: !u.trim(), children: "Apply" }),
          /* @__PURE__ */ p(
            Lt,
            {
              theme: l,
              onClick: () => {
                var f;
                (f = n.current) == null || f.exec("unlink"), i(!1);
              },
              style: o.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, dp = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: a = !0 }) => {
  const [u, c] = re(!1), d = (w, k) => {
    var N;
    return (N = n.current) == null ? void 0 : N.exec(w, k);
  }, f = ei(), h = Ot(), m = (h == null ? void 0 : h.mode) ?? "dark", g = Xr(h), b = (w) => !!(r != null && r[w]), x = "flex items-center gap-1 shrink-0", L = a ? /* @__PURE__ */ p("div", { className: Ds }) : null;
  return /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ A("div", { className: x, children: [
      /* @__PURE__ */ p(Pn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || b("bold"), disabled: e || b("bold"), onMouseDown: (w) => w.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ p(Pn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || b("italic"), disabled: e || b("italic"), onMouseDown: (w) => w.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ p(Pn, { content: "Underline", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (w) => w.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Ql, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ p(Pn, { content: "Strikethrough", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (w) => w.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Zl, { className: "w-3 h-3" }) }) })
    ] }),
    L,
    /* @__PURE__ */ p("div", { className: x, children: /* @__PURE__ */ p(Vf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    L,
    /* @__PURE__ */ p("div", { className: x, children: /* @__PURE__ */ p(
      Zr,
      {
        open: u,
        onOpenChange: c,
        theme: g,
        width: "w-36",
        trigger: /* @__PURE__ */ A(Lt, { theme: m, disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ p("span", { className: "w-3 h-3 rounded-full border border-[color:var(--ui-input-border)] shrink-0", style: { background: t.color } }) : /* @__PURE__ */ p(_o, {}),
          /* @__PURE__ */ p(mn, { className: "w-3 h-3 text-[color:var(--ui-text-faint)]" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                d("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-[color:var(--ui-input-border)] hover:border-[var(--ui-input-focus-border)] transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-[var(--ui-check-ring)]"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ p(_o, { className: "w-3.5 h-3.5" })
            }
          ),
          Kf.map((w) => /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                d("foreColor", w), c(!1);
              },
              className: `w-7 h-7 rounded border border-[color:var(--ui-input-border)] hover:border-[var(--ui-input-focus-border)] transition-colors ${w === (t == null ? void 0 : t.color) ? "ring-2 ring-[var(--ui-check-ring)]" : ""}`,
              style: { background: w },
              title: w
            },
            w
          ))
        ] })
      }
    ) }),
    (o || s || l) && /* @__PURE__ */ A(ut, { children: [
      L,
      /* @__PURE__ */ A("div", { className: x, children: [
        o && /* @__PURE__ */ p(Jf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ p(Pn, { content: "Clear formatting", children: /* @__PURE__ */ p(
          Lt,
          {
            theme: m,
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (w) => w.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ p(ea, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ A(ut, { children: [
      L,
      /* @__PURE__ */ p("div", { className: x, children: i })
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
function Xf(n, e, t, r, i) {
  return to(n + Math.trunc(e / Uf) * i, t, r);
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
  ariaLabel: a,
  className: u,
  title: c,
  placeholder: d,
  theme: f
}) {
  const [h, m] = re(null), [g, b] = re(!1), x = v(!1), L = v(null), w = v(null), k = v(null), N = We(), C = Rs(), W = u === void 0;
  ae(() => () => {
    var I;
    return (I = L.current) == null ? void 0 : I.call(L);
  }, []), tt(() => {
    const I = k.current, U = w.current;
    !W && I && U && (U.style.color = getComputedStyle(I).color);
  }, [W, u]), ae(() => {
    x.current || m(null);
  }, [n]);
  const J = n ?? r, E = h !== null ? h : n != null ? String(n) : d ? "" : String(r), V = (I) => to(I, e, t), R = (I) => {
    const U = Yf(J, I, e, t, o);
    U !== J && (x.current && m(String(U)), i(U));
  }, ne = (I) => {
    if (l || s || I.pointerType !== "mouse" || I.button !== 0) return;
    const U = I.currentTarget, q = I.clientY, O = J;
    let G = O, M = !1;
    const ye = (xe) => {
      const me = q - xe.clientY;
      if (!M) {
        if (Math.abs(me) < Gf) return;
        M = !0, U.blur(), U.style.userSelect = "none";
      }
      const te = Xf(O, me, e, t, o);
      te !== G && (G = te, i(te));
    }, ve = () => {
      L.current = null, window.removeEventListener("pointermove", ye), window.removeEventListener("pointerup", ve), window.removeEventListener("pointercancel", ve), U.style.userSelect = "", M && U.blur();
    };
    L.current = ve, window.addEventListener("pointermove", ye), window.addEventListener("pointerup", ve), window.addEventListener("pointercancel", ve);
  }, ie = (I) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": I === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (I === 1 ? J >= t : J <= e),
    /* Keep the input's focus (desktop) WITHOUT killing the tap: WebKit
       suppresses the click when a pointerdown's default is cancelled, so an
       iPhone/iPad stepper tap went dead. `mousedown` preserves the focus but
       does not cancel the click. */
    onMouseDown: (U) => U.preventDefault(),
    onClick: () => R(I)
  }), H = W ? F(22, 30, N) : F(16, 22, N), K = W ? F(14, 18, N) : F(11, 15, N);
  return /* @__PURE__ */ A(
    "span",
    {
      ref: w,
      className: `ui-number ${W ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            ref: k,
            type: "number",
            "aria-label": a,
            title: c,
            placeholder: d,
            value: E,
            readOnly: s,
            disabled: l,
            className: u ?? "ui-input w-20",
            style: {
              ...W ? { ...C, minHeight: F(28, 36, N) } : {},
              paddingRight: H + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (I) => {
              const U = I.target.value;
              m(U);
              const q = parseInt(U, 10);
              U !== "" && !Number.isNaN(q) && i(V(q));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), h === null) return;
              const I = parseInt(h, 10);
              Number.isNaN(I) || i(V(I)), m(null);
            },
            onKeyDown: (I) => {
              I.key === "Enter" && I.target.blur(), I.key === "Escape" && (m(null), I.target.blur()), !s && !l && (I.key === "ArrowUp" || I.key === "ArrowDown") && (I.preventDefault(), R(I.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: ne
          }
        ),
        /* @__PURE__ */ A("span", { className: "ui-number-steppers", style: { width: H }, children: [
          /* @__PURE__ */ p("button", { ...ie(1), className: "ui-number-step", children: /* @__PURE__ */ p(na, { style: { width: K, height: K } }) }),
          /* @__PURE__ */ p("button", { ...ie(-1), className: "ui-number-step", children: /* @__PURE__ */ p(mn, { style: { width: K, height: K } }) })
        ] })
      ]
    }
  );
}
function hp({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: u, children: c }) {
  const d = We(), f = gn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = F(14, 16, d), m = { width: h, height: h }, g = F(10, 12, d);
  return /* @__PURE__ */ A("div", { ...u, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ A("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
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
    !i && c && /* @__PURE__ */ p("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: c })
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
  className: a = "",
  style: u,
  ...c
}) {
  const d = v(null), f = v(null), [h, m] = re(null), g = (C) => {
    d.current = C, typeof o == "function" ? o(C) : o && (o.current = C);
  };
  tt(() => {
    if (n) return;
    const C = d.current;
    if (!C || (f.current = C.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const W = new ResizeObserver(() => {
      f.current = C.getBoundingClientRect().width;
    });
    return W.observe(C), () => W.disconnect();
  }, [n]), tt(() => {
    if (!n || e !== "auto") {
      m(null);
      return;
    }
    m(f.current);
    const C = requestAnimationFrame(() => m(null));
    return () => cancelAnimationFrame(C);
  }, [n, e]);
  const [b, x] = re(!1), [L, w] = re(null), k = v(!1);
  tt(() => {
    if (n) {
      k.current = !0, x(!1), w(null);
      return;
    }
    if (!k.current || e !== "auto") return;
    k.current = !1, x(!0);
    let C = 0, W = 0;
    return (() => {
      var R;
      const E = (R = d.current) == null ? void 0 : R.firstElementChild, V = (E == null ? void 0 : E.getBoundingClientRect().width) ?? 0;
      V > 0 ? (C = requestAnimationFrame(() => w(V)), W = window.setTimeout(() => {
        x(!1), w(null);
      }, kt + 30)) : x(!1);
    })(), () => {
      cancelAnimationFrame(C), window.clearTimeout(W);
    };
  }, [n, e]);
  const N = n ? h ?? t : b ? L ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ A(
    "div",
    {
      ...c,
      ref: g,
      className: `relative ${l ? "flex" : "inline-flex"} ${s ? "shrink-0" : ""} ${a}`,
      style: {
        ...u,
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
function Qf({
  value: n,
  onChange: e,
  triggerLabel: t = "Filter",
  triggerIcon: r,
  placeholder: i = "Filter…",
  collapsedWidth: o = 88,
  expandedWidth: s = 200,
  variant: l = "subtle",
  triggerCollapse: a = !1,
  iconWithLabel: u = !0,
  triggerReveal: c = !1,
  theme: d,
  active: f = !1,
  autoFocus: h = !1,
  onExpandedChange: m,
  stretch: g = !1,
  actions: b,
  leadingIcon: x,
  showClear: L = !0,
  onSubmit: w,
  onCancel: k,
  cancelOnEscape: N = !1,
  cancelOnOutside: C = !1,
  className: W = "",
  "aria-label": J
}) {
  const [E, V] = re(h), R = v(E);
  R.current = E;
  const ne = v(null), ie = v(null), H = v(null), K = Zo(), I = We(), U = F(9, 13, I), q = se((_) => {
    R.current !== _ && (R.current = _, V(_), m == null || m(_));
  }, [m]), O = se((_ = !1) => {
    var D;
    q(!1), (D = ie.current) == null || D.blur(), _ && requestAnimationFrame(() => {
      var j;
      return (j = H.current) == null ? void 0 : j.focus();
    });
  }, [q]), G = se(() => {
    q(!0);
    const _ = ie.current;
    if (_) {
      _.focus({ preventScroll: !0 });
      const D = _.value.length;
      _.setSelectionRange(D, D);
    }
  }, [q]);
  ae(() => {
    h && G();
  }, [h, G]), ae(() => {
    var j;
    if (!E) return;
    const _ = ((j = ne.current) == null ? void 0 : j.ownerDocument) ?? document, D = (Re) => {
      var he;
      const ke = Re.target;
      ke && ((he = ne.current) != null && he.contains(ke) || (C && (k == null || k()), O()));
    };
    return _.addEventListener("pointerdown", D, !0), () => _.removeEventListener("pointerdown", D, !0);
  }, [E, O, C, k]);
  const M = se((_) => {
    var j;
    if (!E) return;
    const D = _.relatedTarget;
    D && ((j = ne.current) != null && j.contains(D)) || (C && (k == null || k()), O());
  }, [E, O, C, k]), ye = se((_) => {
    if (_.key === "Enter") {
      _.preventDefault(), w == null || w(n), O(!0);
      return;
    }
    _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), N ? k == null || k() : e(""), O(!0));
  }, [e, O, N, k, w, n]), ve = r === void 0 ? /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5" }) : r, xe = x === void 0 ? ve : x, be = 8 + (((b == null ? void 0 : b.length) || 0) + (L && n ? 1 : 0)) * (K.box + 2), le = (_) => /* @__PURE__ */ p(
    "span",
    {
      style: { width: K.icon, height: K.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: _
    }
  );
  return /* @__PURE__ */ p(
    no,
    {
      expanded: E,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: ne,
      shrink: !0,
      stretch: g,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": E ? "true" : "false",
      className: W,
      onBlur: M,
      trigger: /* @__PURE__ */ p(
        Lt,
        {
          ref: H,
          type: "button",
          variant: l,
          size: "minimal",
          theme: d,
          icon: ve,
          collapse: a,
          iconWithLabel: u,
          revealOnHover: c,
          active: f,
          keepLabelOnActive: !0,
          onClick: G,
          className: `${a ? "w-auto" : "w-full"} ${g ? "justify-center" : "justify-start"} ${E ? "pointer-events-none" : ""}`,
          tabIndex: E ? -1 : 0,
          "aria-expanded": E,
          "aria-label": J || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: `min-w-0 ${a ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ A(ut, { children: [
        xe && /* @__PURE__ */ p(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: U, width: K.icon, height: K.icon },
            children: le(xe)
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            ref: ie,
            value: n,
            onChange: (_) => e(_.target.value),
            onKeyDown: ye,
            placeholder: i,
            "aria-label": J || i,
            tabIndex: E ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: xe ? U + K.icon + 6 : 10, paddingRight: be },
            className: `${Or("sm")} w-full`
          }
        ),
        /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          b == null ? void 0 : b.map((_) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": _.label,
              title: _.label,
              tabIndex: E ? 0 : -1,
              onMouseDown: (D) => D.preventDefault(),
              onClick: () => {
                _.onClick(n, { close: () => O(!0) }), _.keepOpen || O(!0);
              },
              style: { width: K.box, height: K.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": _.key,
              children: le(_.icon)
            },
            _.key
          )),
          L && n && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: E ? 0 : -1,
              onClick: () => {
                var _;
                e(""), (_ = ie.current) == null || _.focus({ preventScroll: !0 });
              },
              style: { width: K.box, height: K.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ p(Tn, { size: K.icon })
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
  onChange: a,
  value: u,
  variant: c = "primary",
  triggerCollapse: d = !1,
  iconWithLabel: f = !0,
  ...h
}) {
  const m = (x) => {
    i == null || i(x), s && a("");
  }, g = () => {
    o == null || o(), l && a("");
  }, b = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ p(ar, { className: "w-3.5 h-3.5" }),
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
      ...h,
      value: u,
      onChange: a,
      triggerLabel: n,
      triggerIcon: e,
      triggerCollapse: d,
      iconWithLabel: f,
      leadingIcon: t,
      actions: b,
      showClear: !1,
      variant: c,
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
    ...s.map((a) => a.value.toLowerCase())
  ].join(`
`);
  if (!t.every((a) => l.includes(a))) return { matched: !1 };
  if (t.every((a) => r.includes(a) || o.includes(a))) return { matched: !0 };
  for (const a of t) {
    const u = s.find((c) => c.value.toLowerCase().includes(a));
    if (u) {
      const c = u.value.trim();
      return { matched: !0, detail: `${u.label}: ${c.length > 48 ? `${c.slice(0, 47)}…` : c}` };
    }
    if (i.includes(a)) return { matched: !0, detail: n.detail };
  }
  return { matched: !0 };
}
function Wl(n, e, t) {
  const r = Zf(t), i = r.length > 0, o = new Map(e.map((u) => [u.key, u])), s = [];
  for (const u of n) {
    const { matched: c, detail: d } = eh(u, u.group ? o.get(u.group) : void 0, r);
    c && s.push({ item: u, detail: d });
  }
  const l = new Set(s.map((u) => u.item.group).filter(Boolean)), a = i ? e.filter((u) => l.has(u.key) || u.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: a, hasQuery: i };
}
function th(n) {
  var c;
  const { hits: e, visibleGroups: t, hasQuery: r } = Wl(n.items, n.groups, n.query), i = [];
  n.query.trim();
  const o = n.items.filter((d) => d.pinned), s = n.items.filter((d) => !d.pinned), l = e.filter((d) => d.item.pinned), a = e.filter((d) => !d.item.pinned);
  if (!r) {
    for (const d of o) i.push({ kind: "item", hit: { item: d } });
    if (n.browseAll) {
      for (const d of s) i.push({ kind: "item", hit: { item: d } });
      return i;
    }
    if (n.browseGroups !== !1)
      for (const d of t) {
        i.push({ kind: "group", group: d });
        const f = ((c = n.expandedGroups) == null ? void 0 : c.has(d.key)) ?? !1;
        if (n.includeGroupItems)
          for (const h of s)
            h.group === d.key && i.push({ kind: "item", hit: { item: h }, hidden: !f });
        else if (f)
          for (const h of s)
            h.group === d.key && i.push({ kind: "item", hit: { item: h } });
      }
    return i;
  }
  for (const d of l) i.push({ kind: "item", hit: d });
  const u = /* @__PURE__ */ new Set();
  for (const d of t) {
    i.push({ kind: "group", group: d }), u.add(d.key);
    for (const f of a)
      f.item.group === d.key && i.push({ kind: "item", hit: f });
  }
  for (const d of a)
    (!d.item.group || !u.has(d.item.group)) && i.push({ kind: "item", hit: d });
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
  query: a,
  onQueryChange: u,
  onSelect: c,
  onSelectGroup: d,
  onClose: f,
  closeOnSelect: h = !0,
  openOnFocus: m = !0,
  expandableGroups: g = !1,
  browseExpanded: b = !1,
  groupExpandMode: x = "multiple",
  browseAll: L = !1,
  selectedId: w,
  autoFocus: k = !0,
  collapsedWidth: N = 128,
  expandedWidth: C = 288,
  panelWidth: W,
  panelMinWidth: J,
  keepAllRows: E = !1,
  maxMenuHeight: V = 420,
  theme: R = "light",
  morph: ne = !0,
  emptyTitle: ie,
  emptyHint: H,
  renderEmpty: K,
  emptyActions: I,
  leadingActions: U,
  hideLeadingOnEmpty: q = !1,
  footerActions: O,
  fieldActions: G,
  multiple: M,
  open: ye,
  onOpenChange: ve,
  hideTrigger: xe = !1,
  anchorRef: me,
  portalTarget: te,
  renderTrigger: be,
  renderItem: le,
  highlightOnOpen: _ = !0,
  ref: D
}) {
  const j = a !== void 0, [Re, ke] = re(""), he = j ? a : Re, De = se((y) => {
    j || ke(y), u == null || u(y);
  }, [j, u]), Ce = ye !== void 0, [ze, z] = re(!1), S = Ce ? ye : ze, ge = se((y) => {
    Ce || z(y), ve == null || ve(y);
  }, [Ce, ve]), [we, $e] = re(t === "inline"), at = st(() => e.map((y) => y.key).join("\0"), [e]), Se = st(() => new Set(at ? at.split("\0") : []), [at]), [je, Ge] = re(() => b ? Se : /* @__PURE__ */ new Set()), [Me, Zt] = re(0), Jt = v(!1), Ht = v(null), Et = v(null), Le = se((y, P = "keyboard") => {
    Jt.current = P === "pointer", Zt(y);
  }, []), Ve = v(null), gt = v(null), It = v(null), nt = v(null), Dt = v(null), qe = v(0), rt = Ii(), $t = Yn(), yt = Gr(), Mt = Hi(), _t = Ss(), Ke = Zo(), X = 8 + (((G == null ? void 0 : G.length) || 0) + (he ? 1 : 0)) * (Ke.box + 2), [pe, Qe] = re({ top: 0, left: 0, maxH: 288, ready: !1 }), [it, St] = re(0);
  cs({
    anchorRef: me ?? Ve,
    panelRef: nt,
    open: S,
    maxHeight: V,
    anchorRectRef: Dt,
    onPosition: (y) => Qe({ top: y.top, left: y.left, maxH: y.maxH, ready: y.ready })
  }), ae(() => {
    const y = (me == null ? void 0 : me.current) ?? Ve.current;
    !S || !y || St(y.getBoundingClientRect().width);
  }, [S, we, me]);
  const [At, T] = re(!1);
  ae(() => {
    S && T(!0);
  }, [S]);
  const Z = Ur({
    visible: S,
    morph: ne,
    anchor: () => {
      var y;
      return ((y = (me == null ? void 0 : me.current) ?? Ve.current) == null ? void 0 : y.getBoundingClientRect()) ?? null;
    },
    ref: nt,
    cloneOnUnmount: !0,
    onClosed: () => T(!1)
  }), ce = (I || []).map(
    (y) => typeof y.label == "function" ? y.label(he) : y.label
  ), oe = st(
    () => th({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: E ? "" : he,
      browseGroups: m || b || g,
      browseAll: L,
      expandedGroups: je,
      emptyActionLabels: ce
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, he, E, m, b, g, L, je, ce.join("\0")]
  ), Te = st(
    () => (U || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(he) : y.label,
      actionIndex: P,
      source: "leading"
    })),
    [U, he]
  ), Pe = st(
    () => (O || []).map((y, P) => ({
      kind: "action",
      label: typeof y.label == "function" ? y.label(he) : y.label,
      actionIndex: P,
      source: "footer"
    })),
    [O, he]
  ), Je = oe.some((y) => y.kind === "empty"), Oe = Te.length > 0 && !(q && Je), Ie = Oe ? Te.length : 0, ht = st(
    () => [...Oe ? Te : [], ...oe, ...Pe],
    [Oe, Te, oe, Pe]
  ), ot = !!d || g && !he.trim(), Rt = st(
    () => ht.map((y, P) => ({ row: y, index: P })).filter((y) => !(y.row.kind === "empty" || y.row.kind === "item" && y.row.hidden || y.row.kind === "group" && !ot)),
    [ht, ot]
  ), xt = (g || b) && !he.trim(), Fe = !!M, Xt = st(
    () => n.filter((y) => y.checkable !== !1).map((y) => y.id),
    [n]
  ), en = st(() => he.trim() ? Wl(n, e, he).hits.filter((y) => y.item.checkable !== !1).map((y) => y.item.id) : Xt, [n, e, he, Xt]), vn = st(() => new Set(en), [en]), Ae = ys({
    mode: (M == null ? void 0 : M.mode) ?? "draft",
    selectedIds: (M == null ? void 0 : M.selectedIds) ?? bs,
    itemIds: Xt,
    visibleIds: en,
    max: M == null ? void 0 : M.max,
    disabledIds: M == null ? void 0 : M.disabledIds,
    indicator: M == null ? void 0 : M.indicator,
    onCommit: M == null ? void 0 : M.onCommit,
    onDraftChange: M == null ? void 0 : M.onDraftChange,
    onToggle: M == null ? void 0 : M.onToggle
  }), an = v(Ae.reset);
  an.current = Ae.reset;
  const An = typeof (M == null ? void 0 : M.commitLabel) == "function" ? M.commitLabel(Ae.count) : (M == null ? void 0 : M.commitLabel) ?? `Select ${Ae.count}`, Nt = se(() => {
    var y;
    ge(!1), t === "expandable" && ((y = gt.current) == null || y.blur(), $e(!1), requestAnimationFrame(() => {
      var P;
      return (P = It.current) == null ? void 0 : P.focus();
    })), Ce || De(""), Le(0), Ge(b ? Se : /* @__PURE__ */ new Set()), f == null || f();
  }, [t, f, De, b, Se, Ce, ge]);
  ae(() => {
    if (he.trim() || !b) {
      Ge((y) => y.size ? /* @__PURE__ */ new Set() : y);
      return;
    }
    Ge((y) => y.size === Se.size && [...Se].every((P) => y.has(P)) ? y : Se);
  }, [he, b, Se]);
  const cn = v(!1), pt = v(!1);
  ae(() => {
    if (!S) {
      cn.current = !1;
      return;
    }
    if (cn.current || !g || he.trim()) return;
    const y = w ? [w] : [...(M == null ? void 0 : M.selectedIds) ?? []], P = new Set(y), Q = P.size ? e.filter((fe) => n.some((Ee) => Ee.group === fe.key && P.has(Ee.id))).map((fe) => fe.key) : [];
    if (Q.length === 0) {
      cn.current = !0;
      return;
    }
    const ee = x === "single" ? Q.slice(0, 1) : Q;
    if (!ee.every((fe) => je.has(fe))) {
      pt.current = !0, Ge(new Set(ee));
      return;
    }
    if (_ && w) {
      const fe = ht.findIndex((Ee) => Ee.kind === "item" && Ee.hit.item.id === w);
      fe >= 0 && Le(fe);
    }
    cn.current = !0;
  }, [S, g, he, e, n, w, M == null ? void 0 : M.selectedIds, x, je, ht, _, Le]);
  const zt = se((y) => {
    Ge((P) => {
      const Q = new Set(P);
      return Q.has(y) ? Q.delete(y) : (x === "single" && Q.clear(), Q.add(y)), Q;
    });
  }, [x]), Ft = se(() => {
    var P;
    if (S) {
      (P = gt.current) == null || P.focus();
      return;
    }
    if (an.current(), t === "expandable" && !we) {
      const Q = Ve.current;
      if (Q) {
        const ee = Q.style.transition, fe = Q.style.width;
        Q.style.transition = "none", Q.style.width = `${C}px`;
        const Ee = Q.getBoundingClientRect();
        Dt.current = { left: Ee.left, top: Ee.top, width: Ee.width, height: Ee.height }, Q.style.width = fe, Q.offsetWidth, Q.style.transition = ee, window.clearTimeout(qe.current), qe.current = window.setTimeout(() => {
          Dt.current = null;
        }, kt + 80);
      }
    }
    $e(!0), ge(!0);
    const y = w ? oe.findIndex((Q) => Q.kind === "item" && Q.hit.item.id === w) : -1;
    Le(y >= 0 ? Ie + y : _ ? Ie : -1);
  }, [S, t, we, C, Ie, oe, w, _]);
  ae(() => () => {
    window.clearTimeout(qe.current), Dt.current = null;
  }, []), ae(() => {
    S || (Ht.current = null), Et.current = null;
  }, [S, he]), tt(() => {
    var y;
    t !== "expandable" || !we || !S || !k || (y = gt.current) == null || y.focus({ preventScroll: !0 });
  }, [t, we, S, k]), ae(() => {
    var Q;
    if (!S) return;
    const y = ((Q = Ve.current) == null ? void 0 : Q.ownerDocument) ?? rt;
    if (!y) return;
    const P = (ee) => {
      var Ee, bt, vt, rn;
      const fe = ((Ee = ee.composedPath) == null ? void 0 : Ee.call(ee)[0]) ?? ee.target;
      !fe || typeof fe.nodeType != "number" || (bt = Ve.current) != null && bt.contains(fe) || (vt = nt.current) != null && vt.contains(fe) || (rn = me == null ? void 0 : me.current) != null && rn.contains(fe) || Nt();
    };
    return y.addEventListener("pointerdown", P, !0), () => y.removeEventListener("pointerdown", P, !0);
  }, [S, Nt, rt, me]);
  const tn = se((y) => {
    var P;
    if (y.kind === "item" ? Ht.current = y.hit.item.id : (y.kind === "group" || y.kind === "action") && (Ht.current = null), y.kind === "group") {
      if (Fe) {
        const Q = (P = M == null ? void 0 : M.groupToken) == null ? void 0 : P.call(M, y.group.key);
        if (Q) {
          Ae.canToggle(Q) && Ae.toggle(Q);
          return;
        }
        const ee = n.filter((fe) => fe.group === y.group.key && fe.checkable !== !1 && vn.has(fe.id) && !Ae.isDisabled(fe.id)).map((fe) => fe.id);
        ee.length && Ae.toggleGroup(ee);
        return;
      }
      d ? (d(y.group), h && Nt()) : ot && zt(y.group.key);
      return;
    }
    if (y.kind === "item") {
      if (Fe) {
        if (Ae.canToggle(y.hit.item.id)) {
          const Q = Rt.findIndex((fe) => fe.row === y), ee = (fe) => {
            const Ee = Rt[fe];
            return (Ee == null ? void 0 : Ee.row.kind) === "item" ? Ee.row.hit.item.id : null;
          };
          Et.current = Q < 0 ? null : { up: ee(Q - 1), down: ee(Q + 1) }, Ae.toggle(y.hit.item.id), Le(-1, "keyboard");
        }
        return;
      }
      c(y.hit.item), h && Nt();
      return;
    }
    if (y.kind === "action") {
      const Q = y.source === "leading" ? U : y.source === "footer" ? O : I, ee = Q == null ? void 0 : Q[y.actionIndex];
      ee && ee.onClick(he), h && Nt();
    }
  }, [Nt, h, I, O, ot, n, U, M, Fe, Rt, c, d, he, Ae, Le, zt, vn]), Gn = (y) => {
    if (Rt.length === 0) return;
    const P = Et.current, Q = y === 1 ? P == null ? void 0 : P.down : P == null ? void 0 : P.up;
    if (Q != null) {
      const bt = Rt.find(
        (vt) => vt.row.kind === "item" && vt.row.hit.item.id === Q
      );
      if (bt) {
        Et.current = null, Le(bt.index);
        return;
      }
    }
    let ee = Me;
    if (ee < 0 && Ht.current) {
      const bt = Rt.find(
        (vt) => vt.row.kind === "item" && vt.row.hit.item.id === Ht.current
      );
      bt && (ee = bt.index);
    }
    const fe = Rt.findIndex((bt) => bt.index === ee), Ee = fe < 0 ? 0 : (fe + y + Rt.length) % Rt.length;
    Le(Rt[Ee].index);
  };
  Ko(D, () => ({
    moveHighlight: Gn,
    activateHighlighted: () => {
      if (Jt.current) return !1;
      const y = Me >= 0 ? ht[Me] : void 0;
      return y ? (tn(y), Le(-1, "keyboard"), !0) : !1;
    },
    close: Nt,
    selectAll: () => {
      Fe && Ae.setAll(!0);
    },
    setSelection: (y) => {
      Ae.reset(y);
    }
  }), [ht, Me, tn, Nt, Fe, Ae]);
  const Rn = (y) => {
    if (Fe && (y.metaKey || y.ctrlKey) && y.key.toLowerCase() === "a") {
      y.preventDefault(), y.stopPropagation(), Ae.setAll(!0);
      return;
    }
    if (y.key === "ArrowDown")
      y.preventDefault(), S ? Gn(1) : Ft();
    else if (y.key === "ArrowUp")
      y.preventDefault(), Gn(-1);
    else if ((y.key === "ArrowRight" || y.key === "ArrowLeft") && g && S && !he.trim()) {
      const P = ht[Me];
      if ((P == null ? void 0 : P.kind) === "group") {
        const Q = je.has(P.group.key);
        (y.key === "ArrowRight" || Q) && (y.preventDefault(), zt(P.group.key));
      } else if ((P == null ? void 0 : P.kind) === "item" && y.key === "ArrowLeft" && P.hit.item.group) {
        y.preventDefault();
        const Q = P.hit.item.group;
        je.has(Q) && zt(Q);
        const ee = ht.findIndex((fe) => fe.kind === "group" && fe.group.key === Q);
        ee >= 0 && Le(ee);
      }
    } else if (y.key === "Enter") {
      y.preventDefault();
      const P = ht[Me] ?? ht[0];
      P && tn(P);
    } else y.key === "Escape" && (y.preventDefault(), Nt());
  }, dr = (y) => {
    t === "expandable" && !we || (De(y), S || ge(!0));
  };
  ae(() => {
    if (E) {
      const P = he.trim().toLowerCase();
      if (!P) {
        const ee = w ? oe.findIndex((fe) => fe.kind === "item" && fe.hit.item.id === w) : -1;
        Le(ee >= 0 ? Ie + ee : -1);
        return;
      }
      const Q = oe.findIndex((ee) => ee.kind === "item" && ee.hit.item.label.toLowerCase().includes(P));
      Le(Q >= 0 ? Ie + Q : -1);
      return;
    }
    if (Ce) {
      const P = he.trim().toLowerCase();
      if (!!P && n.some((ee) => ee.id.toLowerCase() === P || ee.label.toLowerCase() === P)) {
        Le(-1);
        return;
      }
      if (!Fe) {
        const ee = oe.findIndex((fe) => fe.kind === "item" && fe.hit.item.tone !== "create");
        if (ee >= 0) {
          Le(Ie + ee);
          return;
        }
      }
    }
    const y = oe.findIndex((P) => P.kind === "item");
    Le(y >= 0 ? Ie + y : Ie);
  }, [he]), ae(() => {
    if (!S || he.trim()) return;
    const y = w ? oe.findIndex((P) => P.kind === "item" && P.hit.item.id === w) : -1;
    Le(y >= 0 ? Ie + y : _ ? Ie : -1);
  }, [S]), tt(() => {
    S && an.current();
  }, [S]);
  const fr = (y) => /* @__PURE__ */ A("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    G == null ? void 0 : G.map((P) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": P.label,
        title: P.label,
        tabIndex: we ? 0 : -1,
        onMouseDown: (Q) => Q.preventDefault(),
        onClick: () => {
          P.onClick(he, { close: Nt }), P.keepOpen || Nt();
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
    he && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: we ? 0 : -1,
        onMouseDown: (P) => P.preventDefault(),
        onClick: y,
        style: { width: Ke.box, height: Ke.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(Tn, { size: Ke.icon })
      }
    )
  ] }), hr = /* @__PURE__ */ A("div", { className: "relative w-full", children: [
    /* @__PURE__ */ p(zn, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: gt,
        value: he,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": S,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => dr(y.target.value),
        onFocus: () => {
          m && Ft();
        },
        onClick: () => {
          m && Ft();
        },
        onKeyDown: Rn,
        placeholder: l,
        style: { paddingRight: X },
        className: `${Or("sm")} w-full pl-8`
      }
    ),
    fr(() => {
      De(""), S || Ft();
    })
  ] }), pr = /* @__PURE__ */ A("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ p(zn, { size: Ke.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: gt,
        value: he,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": S,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (y) => dr(y.target.value),
        onFocus: () => {
          m && we && Ft();
        },
        onClick: () => {
          m && we && Ft();
        },
        onKeyDown: Rn,
        placeholder: l,
        tabIndex: we ? 0 : -1,
        style: { paddingRight: X },
        className: `${Or("sm")} h-full w-full pl-8`
      }
    ),
    fr(() => {
      De(""), !S && we && Ft();
    })
  ] });
  ae(() => {
    if (!S || Jt.current) return;
    const y = nt.current;
    sn(
      y == null ? void 0 : y.querySelector(`[data-search-row="${Me}"]`),
      "nearest",
      (y == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null
    );
  }, [S, Me]);
  const un = v(oe);
  un.current = oe;
  const B = v(w);
  B.current = w;
  const de = v(M == null ? void 0 : M.selectedIds);
  de.current = M == null ? void 0 : M.selectedIds, tt(() => {
    if (!S || !pt.current) return;
    const y = nt.current;
    if (!y) return;
    const P = w;
    if (!P) {
      pt.current = !1;
      return;
    }
    const Q = oe.findIndex((fe) => fe.kind === "item" && fe.hit.item.id === P);
    if (Q < 0) {
      pt.current = !1;
      return;
    }
    const ee = y.querySelector(`[data-search-row="${Q}"]`);
    ee && (sn(ee, "center", y.querySelector("[data-search-scroller]") ?? null), pt.current = !1);
  }, [S, je, oe, w]);
  const Ne = gs({
    open: S,
    block: "center",
    ready: pe.ready,
    scroller: () => {
      var y;
      return ((y = nt.current) == null ? void 0 : y.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Q;
      let y = -1;
      const P = B.current;
      if (P)
        y = un.current.findIndex((ee) => ee.kind === "item" && ee.hit.item.id === P);
      else {
        const ee = de.current;
        if (ee && ee.length) {
          const fe = new Set(ee);
          y = un.current.findIndex((Ee) => Ee.kind === "item" && fe.has(Ee.hit.item.id));
        }
      }
      return y < 0 ? null : ((Q = nt.current) == null ? void 0 : Q.querySelector(`[data-search-row="${y}"]`)) ?? null;
    }
  }), Ze = (y, P) => {
    const Q = Me === P, ee = !Fe && w !== void 0 && y.hit.item.id === w, fe = Fe ? Ae.isSelected(y.hit.item.id) : ee, Ee = !!y.hit.item.disabled || Fe && !Ae.canToggle(y.hit.item.id), bt = y.hit.item.tone === "create" ? R === "light" ? { background: Q ? "#d1fae5" : "#ecfdf5", color: Q ? "#065f46" : "#047857" } : { background: Q ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Q ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": fe,
        tabIndex: -1,
        "data-search-item": y.hit.item.id,
        "data-search-row": P,
        "data-search-create": y.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (vt) => vt.preventDefault(),
        onMouseEnter: () => Le(P, "pointer"),
        onClick: () => tn(y),
        style: { ...Mt, ...y.hit.item.rowStyle, ...bt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${y.hit.item.rowClassName ?? ""} ${ee ? "ui-item-selected" : ""} ${Q ? "ui-item-highlighted" : ""} ${Ee ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          Fe && y.hit.item.checkable !== !1 && /* @__PURE__ */ p(Pr, { checked: fe, disabled: Ee, indicator: M == null ? void 0 : M.indicator }),
          le ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: le(y.hit.item, { checked: fe, disabled: Ee }) }) : /* @__PURE__ */ A(ut, { children: [
            y.hit.item.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.hit.item.icon }),
            /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.hit.item.label }),
            (y.hit.detail || y.hit.item.detail) && /* @__PURE__ */ p("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: y.hit.detail || y.hit.item.detail }),
            ee && /* @__PURE__ */ p(ar, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${y.hit.item.id}`
    );
  }, Ye = (y, P) => {
    var lo;
    const Q = je.has(y.group.key), ee = g && !he.trim(), fe = ot, Ee = fe && Me === P, bt = Fe ? n.filter((et) => et.group === y.group.key && vn.has(et.id) && et.checkable !== !1) : [], vt = bt.filter((et) => !Ae.isDisabled(et.id)).map((et) => et.id), rn = Fe ? (lo = M == null ? void 0 : M.groupToken) == null ? void 0 : lo.call(M, y.group.key) : void 0, ro = !!rn && Ae.isSelected(rn), io = ro ? "all" : vt.length > 0 ? Ae.groupState(vt) : "none", Kl = ro ? bt.length : bt.reduce((et, Jl) => et + (Ae.isSelected(Jl.id) ? 1 : 0), 0), oo = Fe && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${y.group.label}`,
        onMouseDown: (et) => et.preventDefault(),
        onClick: (et) => {
          et.stopPropagation(), rn ? Ae.toggle(rn) : vt.length && Ae.toggleGroup(vt);
        },
        className: `shrink-0 flex items-center justify-center rounded ${rn || vt.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ p(
          Pr,
          {
            checked: io === "all",
            indeterminate: io === "some",
            disabled: !rn && vt.length === 0,
            indicator: M == null ? void 0 : M.indicator
          }
        )
      }
    ), so = Fe ? /* @__PURE__ */ A("span", { className: `shrink-0 tabular-nums text-[10px] ${fe ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Kl,
      "/",
      bt.length
    ] }) : y.group.count !== void 0 && /* @__PURE__ */ p("span", { className: `shrink-0 tabular-nums ${fe ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: y.group.count });
    return fe ? /* @__PURE__ */ A(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": ee ? Q : void 0,
        "data-search-group": y.group.key,
        onMouseDown: (et) => et.preventDefault(),
        onMouseEnter: () => Le(P, "pointer"),
        onClick: () => {
          ee && zt(y.group.key);
        },
        style: Mt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${yt.itemDefault} ${Ee ? "ui-item-highlighted" : ""}`,
        children: [
          oo,
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
          so,
          ee && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Q ? "Collapse" : "Expand"} ${y.group.label}`,
              "aria-expanded": Q,
              onMouseDown: (et) => et.preventDefault(),
              onClick: (et) => {
                et.stopPropagation(), zt(y.group.key);
              },
              style: { width: Ke.box, height: Ke.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ p(
                mn,
                {
                  size: Ke.icon,
                  className: `transition-transform duration-200 ${Q ? "rotate-180" : ""}`
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
        style: _t,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          oo,
          y.group.icon && /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: y.group.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.group.label }),
          so
        ]
      },
      `group:${y.group.key}`
    );
  }, nn = (y, P) => {
    var fe;
    const Q = Me === P, ee = y.source === "leading" ? U : y.source === "footer" ? O : I;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": y.source || "empty",
        "data-search-row": P,
        onMouseDown: (Ee) => Ee.preventDefault(),
        onMouseEnter: () => Le(P, "pointer"),
        onClick: () => tn(y),
        style: Mt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${yt.itemDefault} ${Q ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ p("span", { className: `${yt.icon} shrink-0`, children: ((fe = ee == null ? void 0 : ee[y.actionIndex]) == null ? void 0 : fe.icon) || /* @__PURE__ */ p(Jr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: y.label })
        ]
      },
      `${y.source || "empty"}:${y.actionIndex}`
    );
  }, oi = () => /* @__PURE__ */ p("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: K ? K({ query: he, close: Nt }) : /* @__PURE__ */ A(ut, { children: [
    /* @__PURE__ */ p("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ p("div", { className: "text-xs font-medium text-zinc-500", children: ie || `No matches for “${he.trim()}”` }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: H || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), mr = [];
  for (let y = 0; y < oe.length; y++) {
    const P = oe[y];
    if (P.kind === "group") {
      const Q = [];
      let ee = y + 1;
      for (; ee < oe.length && oe[ee].kind === "item" && oe[ee].hit.item.group === P.group.key; )
        Q.push({ row: oe[ee], index: ee }), ee++;
      mr.push({ group: P, index: y, items: Q }), y = ee - 1;
    } else P.kind === "item" ? mr.push({ row: P, index: y }) : mr.push({ row: P, index: y });
  }
  const si = S || At ? Vr(
    /* @__PURE__ */ A(
      "div",
      {
        ref: Z,
        id: "search-menu-panel",
        "data-theme": R,
        role: "listbox",
        "aria-label": l,
        "aria-multiselectable": Fe ? !0 : void 0,
        onPointerEnter: Ne.engage,
        onPointerDown: (y) => {
          y.stopPropagation(), Ne.engage();
        },
        onMouseDown: (y) => y.stopPropagation(),
        onClick: (y) => y.stopPropagation(),
        onPointerLeave: () => {
          Jt.current && Le(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: pe.left,
          top: pe.top,
          width: W ?? (t === "expandable" ? C : it || void 0),
          minWidth: J,
          maxHeight: pe.maxH,
          visibility: pe.ready ? "visible" : "hidden"
        },
        children: [
          Oe && /* @__PURE__ */ A("div", { className: "shrink-0 pb-1", children: [
            Te.map((y, P) => nn(y, P)),
            oe.length > 0 && /* @__PURE__ */ p("div", { className: yt.separator })
          ] }),
          /* @__PURE__ */ A("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            oe.length === 0 && /* @__PURE__ */ p("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: K ? K({ query: he, close: Nt }) : /* @__PURE__ */ p(ut, { children: "Type to search…" }) }),
            mr.map((y) => {
              if (y.group) {
                const ee = je.has(y.group.group.key), fe = y.items || [];
                return /* @__PURE__ */ A(ct.Fragment, { children: [
                  Ye(y.group, Ie + y.index),
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
                      children: /* @__PURE__ */ p("div", { className: "overflow-hidden flex flex-col", children: fe.map((Ee) => Ze(Ee.row, Ie + Ee.index)) })
                    }
                  ),
                  !xt && fe.map((Ee) => Ze(Ee.row, Ie + Ee.index))
                ] }, `group:${y.group.group.key}`);
              }
              const P = y.row, Q = Ie + y.index;
              return P.kind === "empty" ? oi() : P.kind === "action" ? nn(P, Q) : P.kind === "item" ? Ze(P, Q) : null;
            })
          ] }),
          Pe.length > 0 && /* @__PURE__ */ A("div", { className: "shrink-0", children: [
            /* @__PURE__ */ p("div", { className: yt.separator }),
            Pe.map((y, P) => nn(y, Ie + oe.length + P))
          ] }),
          Fe && (M == null ? void 0 : M.footer) !== !1 && /* @__PURE__ */ p(
            ws,
            {
              count: Ae.count,
              max: M == null ? void 0 : M.max,
              hiddenCount: (M == null ? void 0 : M.hiddenNote) === !1 ? 0 : Ae.hiddenCount,
              clear: (M == null ? void 0 : M.clear) !== !1,
              theme: R,
              onClear: Ae.clear,
              hero: (M == null ? void 0 : M.mode) === "live" ? void 0 : {
                label: An,
                onClick: () => {
                  Ae.commit(), Nt();
                },
                disabled: Ae.count === 0
              }
            }
          )
        ]
      }
    ),
    te ?? $t ?? (rt == null ? void 0 : rt.body) ?? document.body
  ) : null;
  return xe ? /* @__PURE__ */ A(ut, { children: [
    /* @__PURE__ */ p("div", { ref: Ve, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    si
  ] }) : t === "inline" ? /* @__PURE__ */ A("div", { ref: Ve, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    hr,
    si
  ] }) : /* @__PURE__ */ p(
    no,
    {
      expanded: we,
      collapsedWidth: N,
      expandedWidth: C,
      rootRef: Ve,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: be ? be({ open: S, expanded: we, toggle: Ft }) : /* @__PURE__ */ p(
        Lt,
        {
          ref: It,
          type: "button",
          variant: o,
          size: "minimal",
          theme: R === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5" }) : i,
          onClick: Ft,
          className: `w-full justify-start ${we ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: we ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ A(ut, { children: [
        pr,
        si
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
function jo(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of rh(n)) {
    const s = Kr(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function oh(n, e, t, r, i) {
  if (i) return jo(n, e, t);
  const o = new Set(e.map((l) => yn(l, t))), s = jo(n, e, t).filter((l) => o.has(l));
  return s.length === 0 && n.trim() !== "" ? [...r] : s;
}
function sh(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const a = Kr(l, e, t);
    !a || o.has(a) || (o.add(a), s.push(a));
  }
  return s;
}
function lh(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => yn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function ah(n, e, t = "id") {
  const r = new Set(e.map((i) => yn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Wo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => ql(o, e, t)).join(", ");
}
const ch = () => {
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
  formatDisplay: a,
  formatEditing: u,
  renderTrigger: c,
  renderItem: d,
  badge: f,
  trailing: h,
  anchoredKeys: m,
  anchoredLabel: g = "Element link anchor",
  placeholder: b = "Select…",
  readOnly: x = !1,
  inputReadOnly: L = !1,
  disabled: w = !1,
  autoFocus: k = !1,
  defaultOpen: N = !1,
  selectAllOnOpen: C = !0,
  uppercase: W = !1,
  allowFreeText: J = !0,
  theme: E,
  className: V = "",
  style: R,
  panelWidth: ne,
  panelMinWidth: ie,
  initialQuery: H,
  keepAllRows: K = !1,
  maxMenuHeight: I,
  portalTarget: U,
  autoGrow: q = !1,
  skipComma: O = !1,
  collapsedWidth: G = 140,
  expandedWidth: M = 280,
  createLabel: ye,
  onCreateItem: ve,
  onExit: xe,
  onEscape: me,
  onTabExit: te,
  loadItems: be,
  emptyTitle: le,
  emptyHint: _,
  sortItems: D,
  max: j,
  disabledIds: Re,
  indicator: ke,
  browse: he,
  groupToken: De
}) {
  const Ce = Ot(), ze = E ?? (Ce == null ? void 0 : Ce.mode) ?? "light", z = We(), S = se((B) => yn(B, i), [i]), ge = st(() => t.map(S), [t, S]), we = st(() => new Map(t.map((B) => [S(B), B])), [t, S]), $e = se((B) => ql(B, t, i), [t, i]), at = st(() => new Set([...m ?? []].map((B) => B.toLowerCase())), [m]), [Se, je] = re(!1), [Ge, Me] = re(""), [Zt, Jt] = re(() => {
    const B = H ?? "";
    return W ? B.toUpperCase() : B;
  }), [Ht, Et] = re(Zt), [Le, Ve] = re(() => [...n]), [gt, It] = re(null), [nt, Dt] = re(!1), qe = v(null), rt = v(null), $t = v(null), yt = v(null), Mt = v(null), _t = v(n.join("\0")), Ke = v(!1), $ = v(/* @__PURE__ */ new Set()), X = v(!1), pe = v(!1), Qe = v(!1), it = v(0), St = v(""), At = v([...n]), T = n.join("\0"), Z = st(
    () => Wo(n, t, i, l, a),
    [n, t, i, l, a]
  ), ce = se((B) => {
    if (u) return u([...B], t);
    if (o === "single") return B[0] ? $e(B[0]) : "";
    const de = B.map($e).join(", ");
    return O ? de : B.length ? `${de}, ` : "";
  }, [u, t, o, $e, O]);
  ae(() => {
    Se || (Ve([...n]), At.current = [...n], _t.current = T);
  }, [T, Se]);
  const oe = se(() => {
    if (Se || x || w) return;
    Ke.current = !1, X.current = !0;
    const B = ce(n);
    St.current = B, At.current = [...n], Ve([...n]), Me(B), Et(Zt), Jt(""), je(!0);
  }, [Se, x, w, n, ce, Zt]);
  tt(() => {
    if (!Se) return;
    const B = qe.current ?? rt.current;
    B && (B.focus(), (B instanceof HTMLInputElement || B instanceof HTMLTextAreaElement) && (o === "single" && C ? B.setSelectionRange(0, B.value.length) : B.setSelectionRange(B.value.length, B.value.length)));
  }, [Se]), tt(() => {
    if (!Qe.current) return;
    Qe.current = !1;
    const B = qe.current;
    B && (B.focus(), B.setSelectionRange(B.value.length, B.value.length));
  }, [Ge]), ae(() => {
    (N || k) && oe();
  }, []);
  const Te = o === "single" ? Ht : ih(Ge), Pe = be ? gt ?? [] : t, Je = st(
    () => D ? D(Pe, Le) : Pe,
    [Pe, D, Le]
  ), Oe = Te.trim(), Ie = !!ve && J && !nt && !!Oe && !lh(Oe, Pe, i);
  ae(() => {
    if (!be || !Se) return;
    const B = Te.trim();
    if (!B) {
      It(null), Dt(!1);
      return;
    }
    Dt(!0);
    const de = ++it.current, Ne = setTimeout(() => {
      be(B).then((Ze) => {
        it.current === de && (It(Ze), Dt(!1));
      }).catch(() => {
        it.current === de && (It([]), Dt(!1));
      });
    }, 400);
    return () => clearTimeout(Ne);
  }, [be, Se, Te]);
  const ht = st(() => {
    const B = Je.filter((de) => !de.hidden).map((de) => ({
      id: S(de),
      label: de.label,
      group: de.group,
      detail: de.detail,
      icon: de.icon,
      disabled: !!de.disabled || !!(Re != null && Re.includes(S(de))),
      fields: de.fields,
      keywords: de.keywords,
      rowClassName: de.rowClassName,
      rowStyle: de.rowStyle
    }));
    return Ie && B.unshift({
      id: Oe,
      label: ye ? ye(Oe) : `Add “${Oe}”…`,
      keywords: Oe,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), B;
  }, [Je, S, Re, Ie, Oe, ye]), ot = se((B) => {
    const de = B.join("\0");
    if (de !== _t.current) {
      if (wn(B, n)) {
        _t.current = de;
        return;
      }
      if (_t.current = de, e(B), ve)
        for (const Ne of ah(B, t, i))
          $.current.has(Ne) || ($.current.add(Ne), ve(Ne));
    }
  }, [n, e, ve, t, i]), Rt = se((B, de) => {
    !de || !ve || !J || t.some((Ne) => S(Ne) === B) || $.current.has(B) || ($.current.add(B), ve(B));
  }, [ve, J, t, S]), xt = se((B = !0) => {
    if (!X.current || (X.current = !1, x || w)) return;
    if (Ke.current) {
      Ke.current = !1;
      return;
    }
    const de = St.current, Ne = new Set(ge), Ze = o === "single" ? (() => {
      const Ye = de.trim();
      if (!Ye) return J ? [] : n;
      const nn = Kr(Ye, t, i);
      return !J && !Ne.has(nn) ? n : [nn];
    })() : Wt(
      oh(de, t, i, n, J),
      ge
    );
    At.current = Ze, Ve(Ze), Et(""), je(!1), ot(Ze), B && !pe.current && (xe == null || xe());
  }, [x, w, o, t, i, ge, J, n, ot, xe]), Fe = se((B) => {
    je(B), B || xt();
  }, [xt]), Xt = se(() => {
    Ke.current = !0, X.current = !1;
    const B = ce(n);
    St.current = B, At.current = [...n], Ve([...n]), Me(B), Et(""), je(!1), me == null || me();
  }, [n, ce, me]);
  ae(() => {
    var Ze;
    if (!Se) return;
    const de = (((Ze = $t.current) == null ? void 0 : Ze.ownerDocument) ?? document).defaultView;
    if (!de) return;
    const Ne = (Ye) => {
      Ye.key === "Escape" && (Ye.preventDefault(), Ye.stopImmediatePropagation(), Xt());
    };
    return de.addEventListener("keydown", Ne, !0), () => de.removeEventListener("keydown", Ne, !0);
  }, [Se, Xt]);
  const en = se((B) => {
    const de = Wt(B, ge), Ne = ce(de);
    At.current = de, St.current = Ne, Ve(de), Qe.current = !0, Me(Ne);
  }, [ge, ce]), vn = se((B) => {
    const de = B.id;
    X.current = !1;
    const Ne = $e(de);
    At.current = [de], St.current = Ne, Ve([de]), Me(Ne), Et(""), je(!1), ot([de]), pe.current || xe == null || xe();
  }, [$e, ot, xe]), Ae = (B) => {
    var de, Ne, Ze, Ye, nn;
    if (B.key === "Escape") {
      B.preventDefault(), Xt();
      return;
    }
    if (B.key === "Tab") {
      if (B.preventDefault(), o === "single" && Se) {
        pe.current = !0;
        const oi = (de = Mt.current) == null ? void 0 : de.activateHighlighted();
        if (pe.current = !1, oi) {
          (Ne = te ?? xe) == null || Ne(qe.current ?? void 0);
          return;
        }
      }
      Se && xt(!1), (Ze = te ?? xe) == null || Ze(qe.current ?? void 0);
      return;
    }
    if (B.key === "ArrowDown" || B.key === "ArrowUp") {
      if (B.preventDefault(), !Se) {
        oe();
        return;
      }
      (Ye = Mt.current) == null || Ye.moveHighlight(B.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (B.key === "Enter") {
      if (B.preventDefault(), B.stopPropagation(), Se && ((nn = Mt.current) != null && nn.activateHighlighted())) return;
      xt();
      return;
    }
  }, an = (B) => {
    var Ne;
    const de = W ? B.target.value.toUpperCase() : B.target.value;
    if (St.current = de, Me(de), o === "single" && Et(de), Se || (X.current = !0, Ke.current = !1, je(!0)), o === "multiple") {
      const Ze = Wt(sh(de, t, i), ge);
      At.current = Ze, Ve(Ze), (Ne = Mt.current) == null || Ne.setSelection(Ze);
    }
  }, An = () => {
    if (X.current) {
      if (Ke.current) {
        Ke.current = !1;
        return;
      }
      xt();
    }
  }, Nt = se((B, de) => {
    const Ne = we.get(B.id);
    if (!Ne)
      return /* @__PURE__ */ A(ut, { children: [
        /* @__PURE__ */ p(Jr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: B.label })
      ] });
    const Ze = !!m && (i === "label" ? at.has(Ne.label.toLowerCase()) : m.has(S(Ne))), Ye = (f == null ? void 0 : f(Ne)) ?? Ne.badge ?? null;
    return /* @__PURE__ */ A(ut, { children: [
      d ? d(Ne, de.checked) : /* @__PURE__ */ A(ut, { children: [
        Ne.icon && /* @__PURE__ */ p("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: Ne.icon }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: Ne.label }),
        Ye && /* @__PURE__ */ p("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Ye }),
        h == null ? void 0 : h(Ne)
      ] }),
      Ze && /* @__PURE__ */ p("span", { className: "shrink-0 inline-flex", title: g, "aria-label": g, children: /* @__PURE__ */ p(ra, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [we, m, at, i, S, f, d, h, g]), cn = /* @__PURE__ */ p(
    nh,
    {
      ref: Mt,
      mode: "inline",
      hideTrigger: !0,
      open: Se,
      onOpenChange: Fe,
      anchorRef: s === "morph" ? yt : $t,
      items: ht,
      groups: r,
      query: Te,
      onSelect: vn,
      closeOnSelect: o === "single",
      selectedId: o === "single" && Le[0] !== void 0 ? Kr(Le[0], t, i) : void 0,
      multiple: o === "multiple" ? {
        selectedIds: Le,
        mode: "live",
        onDraftChange: en,
        onToggle: Rt,
        onCommit: ch,
        max: j,
        disabledIds: Re,
        indicator: ke,
        groupToken: De
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (he ?? "open") === "open",
      expandableGroups: r.length > 0 && he === "accordion",
      groupExpandMode: "single",
      renderItem: Nt,
      emptyTitle: nt ? "Searching…" : le,
      emptyHint: nt ? "Fetching matching records." : _,
      theme: ze,
      panelWidth: ne,
      panelMinWidth: ie,
      keepAllRows: K,
      maxMenuHeight: I,
      portalTarget: U
    }
  ), pt = s === "chip", zt = s === "wrap", Ft = !pt && !zt && q, tn = !Se && !Z, Gn = Se ? Ge : Z, Rn = {
    ref: qe,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: Se ? Ge : pt ? n.join(", ") : Z,
    disabled: w,
    readOnly: L,
    placeholder: "",
    onFocus: oe,
    onClick: oe,
    onChange: an,
    onBlur: An,
    onKeyDown: Ae,
    autoComplete: "off",
    spellCheck: !1
  }, dr = F(5, 7, z), fr = F(9, 12, z), hr = F(12, 14, z);
  if (s === "button") {
    const B = (Ye) => Ae(Ye), de = Se ? Le : n, Ne = Wo(de, t, i, l, a), Ze = !Ne;
    return /* @__PURE__ */ A(
      "div",
      {
        ref: $t,
        "data-picker-field": !0,
        className: `relative ${V}`,
        style: R,
        onMouseDown: (Ye) => Ye.stopPropagation(),
        onContextMenu: (Ye) => {
          Ye.preventDefault(), Ye.stopPropagation();
        },
        children: [
          c ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: c({ values: [...de], items: t, display: Ne, open: Se, toggle: oe }) }) : /* @__PURE__ */ A(
            Lt,
            {
              ref: rt,
              variant: "outline",
              theme: ze === "dark" ? "dark" : "light",
              disabled: w,
              onClick: x ? void 0 : () => Se ? xt() : oe(),
              onKeyDown: B,
              "data-state": Se ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": Se,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && de.length > 0 ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: de.map((Ye) => /* @__PURE__ */ p(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: $e(Ye)
                  },
                  Ye
                )) }) : /* @__PURE__ */ p("span", { className: `min-w-0 flex-1 truncate text-left ${Ze ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: Ne || b }),
                /* @__PURE__ */ p(mn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          cn
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ p(
      no,
      {
        expanded: Se,
        collapsedWidth: G,
        expandedWidth: M,
        rootRef: $t,
        "data-picker-field": !0,
        className: V,
        style: R,
        trigger: c ? c({ values: [...n], items: t, display: Z, open: Se, toggle: oe }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ A(
            "button",
            {
              type: "button",
              disabled: w,
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
              ...Rn,
              className: `${Or("sm")} h-full w-full`
            }
          ),
          cn
        ] })
      }
    );
  const pr = pt ? F(5, 7, z) : 0, un = pt ? F(9, 12, z) : 0;
  return x ? /* @__PURE__ */ p(
    "div",
    {
      ref: $t,
      "data-picker-field": !0,
      className: `relative ${pt ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : zt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${V}`,
      style: pt ? { padding: `${pr}px ${un}px`, fontSize: F(12, 14, z), ...R } : R,
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
      className: `relative ${pt ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : zt ? "min-h-[1lh] w-full pb-[1lh]" : Ft ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${V}`,
      style: pt ? { padding: `${pr}px ${un}px`, fontSize: hr, ...R } : R,
      onMouseDown: (B) => B.stopPropagation(),
      onContextMenu: (B) => {
        B.preventDefault(), B.stopPropagation();
      },
      onAuxClick: oe,
      children: [
        pt && c ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: c({ values: [...n], items: t, display: Z, open: Se, toggle: oe }) }) : l === "chips" && !Se ? /* @__PURE__ */ A("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((B) => /* @__PURE__ */ p(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: $e(B)
            },
            B
          )),
          n.length === 0 && /* @__PURE__ */ p("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ p(
          "span",
          {
            className: `pointer-events-none text-left ${pt ? "min-w-0 flex-1 truncate" : zt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${tn ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: Gn || b
          }
        ),
        zt ? /* @__PURE__ */ p(
          "textarea",
          {
            ...Rn,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ p(
          "input",
          {
            ...Rn,
            className: Ft ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: Ft ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : pt ? { caretColor: "#2563eb", color: "transparent", paddingLeft: un, paddingRight: un + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        pt && /* @__PURE__ */ p(mn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        cn
      ]
    }
  );
}
export {
  Lt as Button,
  hp as CardSection,
  zi as CheckMark,
  Wa as Checkbox,
  Uh as Checklist,
  sp as ChromeHeader,
  op as ContentRow,
  zh as ContextMenu,
  Bh as ContextMenuDivider,
  Fh as ContextMenuItem,
  Hh as ContextMenuSub,
  as as DROPDOWN_MAX_HEIGHT,
  Yh as DatePicker,
  Wh as DialogProvider,
  Ms as DropdownItem,
  Zr as DropdownMenu,
  ic as DropdownSubmenu,
  Fi as DropdownThemeContext,
  qf as FONTS,
  Gh as FloatingChrome,
  Vh as FloatingToggle,
  Jf as FontMenu,
  dp as FormatToolbar,
  He as IS_COARSE,
  Ea as IS_TOUCH_CAPABLE,
  Oh as ItemManagerDropdown,
  Kh as LongPressMenuProvider,
  xn as MORPH_EASE,
  kt as MORPH_MS,
  Di as MORPH_OPACITY_MS,
  ur as MenuHighlightContext,
  Ts as MenuSearchContext,
  sc as Modal,
  _h as ModalFooter,
  br as ModalFooterButton,
  pp as MorphActionField,
  Qf as MorphSearchField,
  bs as NO_SELECTION_IDS,
  fp as NumberInput,
  mp as PickerField,
  Ca as PopoutWindowContext,
  up as RICH_TEXT_STATE_IDLE,
  Xh as RadioList,
  Wf as RichTextEditor,
  Uf as SCRUB_PX_PER_STEP,
  nh as SearchMenu,
  ip as SectionHeader,
  rp as Seg,
  Pr as SelectionCheck,
  xs as SelectionContext,
  ws as SelectionFooter,
  lp as StructureControls,
  _i as SubmenuContext,
  Ph as TAB_PILL,
  Cc as TB_BTN,
  vr as TB_BTN_ICON,
  Ec as TB_DANGER,
  Ds as TB_DIVIDER,
  Mc as TB_INPUT,
  np as TB_NUM,
  Rc as TB_PICKER,
  Qh as TB_ROW_LABEL,
  Ac as TB_SEG,
  Zh as TB_TOGGLE,
  tp as TB_TOGGLE_OFF,
  ep as TB_TOGGLE_ON,
  vs as TabFace,
  $h as ThemeProvider,
  Lh as ThemeScope,
  Pf as Token,
  Lf as TokenChipView,
  wr as ToolButton,
  Pn as Tooltip,
  $i as ZOOM_FROM,
  th as buildSearchMenuRows,
  za as buttonCloudOf,
  to as clampNumber,
  Ia as cloneOverlayClose,
  F as coarsePx,
  _a as countHidden,
  cp as escapeHtml,
  Wo as formatPickerValues,
  Qo as getCoarseScale,
  Gr as getDropdownClasses,
  Ih as getHardwareKeyboard,
  Rh as getLastPointerType,
  uo as groupSelectionState,
  lh as hasPickerMatch,
  Or as inputCls,
  mc as isInteractiveElement,
  Eh as isPhoneViewport,
  bi as isTouchLike,
  ih as lastPickerSegment,
  eh as matchSearchItem,
  ms as menuAttributesOf,
  Xr as menuThemeOf,
  rs as nearestOverlayOrigin,
  _l as normalizeSpaces,
  Wt as orderByCatalogue,
  Hn as overlayMorphEnabled,
  Zf as parseSearchTags,
  sh as pickerCommittedKeys,
  yn as pickerItemKey,
  ql as pickerItemLabel,
  rh as pickerSegments,
  Ra as playOverlayClose,
  Aa as playOverlayOpen,
  Bo as preprocessTokenHtml,
  Kr as resolvePickerSegment,
  jo as resolvePickerText,
  sn as revealRowInScroller,
  ls as safeAreaInsets,
  wn as sameSelection,
  If as sanitizeRichText,
  Xf as scrubbedValue,
  Wl as searchMenuContent,
  Oa as segModeOf,
  Mh as setCoarseScale,
  co as setSelected,
  Yf as steppedValue,
  ap as stripRichText,
  Df as stripTokenWrappers,
  Ha as toggleSelected,
  ah as unknownPickerValues,
  Ah as useCoarse,
  Li as useCoarseItemTap,
  We as useCoarseScale,
  gn as useCoarseSize,
  Ii as useCurrentDocument,
  cr as useCurrentWindow,
  jh as useDialog,
  cs as useDropdownPosition,
  ks as useDropdownTheme,
  Dh as useHardwareKeyboard,
  Rs as useInputSize,
  Hi as useItemSize,
  Ot as useKitTheme,
  Ma as useLastPointerType,
  qh as useLongPressOptOut,
  ji as useMenuHighlight,
  ec as useMenuSearch,
  Ur as useOverlayMorph,
  Ri as usePopoutWindow,
  Yn as usePortalTarget,
  gs as useRevealRowOnOpen,
  ys as useSelection,
  ja as useSelectionContext,
  Tc as useSlidingPill,
  Jh as useTouchMode,
  ss as visualViewportBox
};
