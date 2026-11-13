"use client";
import { jsx as p, jsxs as R, Fragment as dt } from "react/jsx-runtime";
import Xe, { createContext as Zt, useContext as en, useState as se, useEffect as ce, useRef as v, useCallback as ae, useLayoutEffect as rt, useMemo as lt, useId as $i, useImperativeHandle as Yo } from "react";
import * as _e from "@radix-ui/react-dropdown-menu";
import { Minus as Gl, Check as fr, Search as zn, X as Cn, Pencil as Ql, CopyPlus as Uo, Trash2 as vi, RotateCcw as Xo, Plus as Vr, ChevronRight as Dr, ChevronLeft as Go, ArrowUp as Zl, ArrowDown as ea, ChevronDown as gn, Underline as ta, Strikethrough as na, RemoveFormatting as ra, Link as ia, ChevronUp as oa, Anchor as sa } from "lucide-react";
import { computePosition as la, offset as Qo, flip as Zo, shift as es, size as aa, useFloating as ca, autoUpdate as ua } from "@floating-ui/react-dom";
import * as fn from "@radix-ui/react-dialog";
import { createPortal as Yr } from "react-dom";
import { mergeAttributes as da, ReactNodeViewRenderer as fa, NodeViewWrapper as ha, useEditor as pa, EditorContent as ma } from "@tiptap/react";
import { PluginKey as Yt, Plugin as cn, Selection as Bn, TextSelection as Ht, NodeSelection as qn, AllSelection as ga } from "@tiptap/pm/state";
import { DecorationSet as yr, Decoration as ya } from "@tiptap/pm/view";
import xa from "@tiptap/starter-kit";
import ba from "@tiptap/extension-placeholder";
import { TextStyle as va, FontFamily as wa, FontSize as ka } from "@tiptap/extension-text-style";
import Sa from "@tiptap/extension-color";
import Na from "@tiptap/extension-link";
import Ta from "@tiptap/extension-underline";
import Ca from "@tiptap/suggestion";
import { Mention as Ea } from "@tiptap/extension-mention";
import { createRoot as Ma } from "react-dom/client";
const Aa = Zt(null);
function Di() {
  return en(Aa);
}
function Yn() {
  const n = Di();
  return n ? n.document.body : null;
}
function Li() {
  const n = Di();
  return n ? n.document : typeof document < "u" ? document : null;
}
function hr() {
  return Di() ?? (typeof window < "u" ? window : null);
}
const Un = typeof window < "u", ze = Un && window.matchMedia("(pointer: coarse)").matches, Ra = Un && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ih() {
  return Un && window.matchMedia("(max-width: 600px)").matches;
}
let Ur = 0.5;
const sr = /* @__PURE__ */ new Set();
function $h(n) {
  Ur = Math.max(0, Math.min(1, n)), sr.forEach((e) => e());
}
function ts() {
  return Ur;
}
function Dh() {
  const [, n] = se(0);
  return ce(() => {
    const e = () => n((t) => t + 1);
    return sr.add(e), () => {
      sr.delete(e);
    };
  }, []), ze && Ur > 0;
}
function Je() {
  const [, n] = se(0);
  return ce(() => {
    const e = () => n((t) => t + 1);
    return sr.add(e), () => {
      sr.delete(e);
    };
  }, []), Ur;
}
function _(n, e, t) {
  return ze ? Math.round(n + (e - n) * t) : n;
}
function yn(n, e) {
  const t = Je();
  return ze && t > 0 ? {
    padding: `${_(n.py, e.py, t)}px ${_(n.px, e.px, t)}px`,
    fontSize: `${_(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function ns() {
  const n = Je(), e = ze && n > 0;
  return {
    box: e ? _(28, 36, n) : 20,
    icon: e ? _(16, 20, n) : 14
  };
}
function wi(n) {
  return n === "touch" || n === "pen";
}
let Fn = null;
const ki = /* @__PURE__ */ new Set();
Un && window.addEventListener("pointerdown", (n) => {
  Fn = n.pointerType, ki.forEach((e) => e());
}, !0);
function Lh() {
  return Fn;
}
function Ia() {
  const [, n] = se(0), e = v(Fn);
  return ce(() => {
    const t = () => {
      e.current !== Fn && (e.current = Fn, n((r) => r + 1));
    };
    return ki.add(t), () => {
      ki.delete(t);
    };
  }, []), Fn;
}
const rs = ["(any-hover: hover)", "(any-pointer: fine)"];
function is() {
  return Un ? rs.some((n) => window.matchMedia(n).matches) : !1;
}
let Lr = is();
const Si = /* @__PURE__ */ new Set();
function fo(n) {
  Lr !== n && (Lr = n, Si.forEach((e) => e()));
}
var Vo;
if (Un) {
  const n = () => fo(is());
  for (const s of rs) {
    const l = window.matchMedia(s);
    (Vo = l.addEventListener) == null || Vo.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || fo(!0));
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
function Ph() {
  return Lr;
}
function Oh() {
  const [, n] = se(0);
  return ce(() => {
    const e = () => n((t) => t + 1);
    return Si.add(e), () => {
      Si.delete(e);
    };
  }, []), Lr;
}
const Tt = 220, bn = "cubic-bezier(0.32, 0.72, 0, 1)", Pi = 170, Oi = 0.94;
function ss(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Hn(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Pr(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ss(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Tt}ms ${bn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r == null || r());
      }, Tt + 80));
    });
  });
}
function ls(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function as(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return ls({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function $a(n, e, t, r) {
  const i = ++n.current;
  e.style.visibility = "", e.style.pointerEvents = "", e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Oi})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const o = as(e, t);
      e.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, e.style.transition = `transform ${Tt}ms ${bn}, opacity ${Pi}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", r == null || r());
      }, Tt + 60);
    });
  });
}
function Da(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = as(e, t);
  e.style.transition = `transform ${Tt}ms ${bn}, opacity ${Pi}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Oi})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Tt + 60);
}
function La(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? ls({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Tt}ms ${bn}, opacity ${Pi}ms ease`, r.style.transform = `scale(${Oi})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Tt + 60));
    });
  });
}
function Xr(n) {
  const e = v(null), [t, r] = se(!1), i = v(null), o = v(0), s = ae((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const x = m.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const y = e.current, b = ++o.current;
    queueMicrotask(() => {
      b === o.current && e.current === y && (e.current = null, r(!1), !(!y || !n.cloneOnUnmount || !a.current) && y.style.visibility !== "hidden" && Hn(f.current) && La(y, c.current, i.current));
    });
  }, []), l = ae(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const y = m.getBoundingClientRect();
    (y.width > 0 || y.height > 0) && (i.current = { left: y.left, top: y.top, width: y.width, height: y.height });
  }, []), a = v(n.visible);
  a.current = n.visible;
  const u = v(n.visible), c = v(n.anchor ?? null);
  c.current = n.anchor ?? null;
  const d = v(n.onClosed);
  d.current = n.onClosed;
  const f = v(n.morph !== !1);
  f.current = n.morph !== !1;
  const h = v(0);
  return rt(() => {
    if (!t || !a.current || !Hn(f.current)) return;
    const m = e.current;
    m && $a(h, m, c.current);
  }, [t, n.visible]), ce(() => {
    if (!t || !a.current) return;
    let m = 0;
    const y = () => {
      m = 0, l(), m = requestAnimationFrame(y);
    };
    return m = requestAnimationFrame(y), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), rt(() => {
    var b;
    const m = u.current;
    if (u.current = n.visible, n.visible || !m) return;
    const y = e.current;
    if (!y || !Hn(f.current)) {
      (b = d.current) == null || b.call(d);
      return;
    }
    Da(h, y, c.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), ce(() => {
    if (!t || !a.current) return;
    const m = (y) => {
      const b = e.current;
      b && b.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), ce(() => {
    if (!t || !a.current) return;
    const m = (y) => {
      const b = e.current;
      b && b.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
function cs(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function xr(n, e) {
  const t = getComputedStyle(n.documentElement).getPropertyValue(e).trim(), r = Number.parseFloat(t);
  return Number.isFinite(r) ? r : 0;
}
function us(n) {
  return n ? {
    left: xr(n, "--ui-safe-area-left"),
    right: xr(n, "--ui-safe-area-right"),
    top: xr(n, "--ui-safe-area-top"),
    bottom: xr(n, "--ui-safe-area-bottom")
  } : { left: 0, right: 0, top: 0, bottom: 0 };
}
const ds = 384, Pa = cs;
function fs({
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
  const c = hr(), d = v(c);
  d.current = c;
  const f = v(u);
  f.current = u, rt(() => {
    if (!t) return;
    let h = 0, m = !1;
    const y = () => {
      h || (h = requestAnimationFrame(b));
    }, b = () => {
      if (h = 0, m) return;
      const B = d.current, K = n.current, N = e.current;
      if (!B || !K || !N || !N.isConnected) return;
      const W = (r == null ? void 0 : r.current) ?? N, I = Pa(B), Z = us(B.document), te = {
        x: I.x + Z.left,
        y: I.y + Z.top,
        width: Math.max(0, I.width - Z.left - Z.right),
        height: Math.max(0, I.height - Z.top - Z.bottom)
      }, U = l ?? ds, re = Math.min(a, U), ke = Math.max(0, N.offsetHeight - W.offsetHeight), ue = Math.max(re, Math.ceil(W.scrollHeight + ke)), M = Math.min(ue, U);
      N.style.maxHeight = `${M}px`;
      let D = M;
      const F = i == null ? void 0 : i.current;
      la(F ? {
        getBoundingClientRect: () => ({
          left: F.left,
          top: F.top,
          width: F.width,
          height: F.height,
          right: F.left + F.width,
          bottom: F.top + F.height,
          x: F.left,
          y: F.top,
          toJSON: () => {
          }
        })
      } : K, N, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Qo(o),
          Zo({ boundary: te, padding: s, fallbackStrategy: "bestFit" }),
          es({ boundary: te, padding: s, mainAxis: !1 }),
          aa({
            boundary: te,
            padding: s,
            apply({ availableHeight: ee }) {
              D = Math.max(re, Math.floor(Math.min(U, ee))), N.style.maxHeight = `${D}px`;
            }
          })
        ]
      }).then(({ x: ee, y: J, placement: ge }) => {
        m || !Number.isFinite(ee) || !Number.isFinite(J) || f.current({
          top: Math.round(J),
          left: Math.round(ee),
          maxH: D,
          side: ge.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    b();
    const x = d.current, O = (x == null ? void 0 : x.document) ?? null, w = (x == null ? void 0 : x.visualViewport) ?? null, k = () => y(), C = (B) => {
      var N, W;
      const K = B.target;
      K && ((N = e.current) != null && N.contains(K) || (W = r == null ? void 0 : r.current) != null && W.contains(K)) || y();
    };
    w == null || w.addEventListener("resize", k), w == null || w.addEventListener("scroll", k), x == null || x.addEventListener("resize", k), O == null || O.addEventListener("scroll", C, { capture: !0, passive: !0 });
    let S = null;
    return typeof ResizeObserver < "u" && (S = new ResizeObserver(k), n.current && S.observe(n.current), e.current && S.observe(e.current), r != null && r.current && S.observe(r.current)), () => {
      m = !0, h && cancelAnimationFrame(h), w == null || w.removeEventListener("resize", k), w == null || w.removeEventListener("scroll", k), x == null || x.removeEventListener("resize", k), O == null || O.removeEventListener("scroll", C, { capture: !0 }), S == null || S.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, a]);
}
const Oa = 14, za = 900, hs = 1e3;
let Ln = { at: 0, target: null, x: 0, y: 0 };
typeof document < "u" && document.addEventListener("pointerdown", (n) => {
  Ln = { at: Date.now(), target: n.target, x: n.clientX, y: n.clientY };
}, !0);
const Fa = 12;
function ps(n, e) {
  const t = Date.now() - Ln.at < hs, r = Math.hypot(e.clientX - Ln.x, e.clientY - Ln.y) <= Fa, i = !!Ln.target && n.contains(Ln.target);
  return ze && t && r && !i;
}
function ms() {
  const n = v(!1);
  return { onClick: (r) => {
    const i = r.currentTarget;
    n.current = !!i && ps(i, r);
  }, takeGhost: () => {
    const r = n.current;
    return n.current = !1, r;
  } };
}
function zi(n, e = !1) {
  const t = ms(), r = v(null), i = v(0), o = (c, d, f) => {
    let h = 0;
    const m = () => {
      c.removeEventListener("click", y, !0), c.removeEventListener("pointerdown", b, !0), h && window.clearTimeout(h);
    }, y = (x) => {
      if (Math.hypot(x.clientX - d, x.clientY - f) > 14) {
        m();
        return;
      }
      x.preventDefault(), x.stopImmediatePropagation(), m();
    }, b = () => m();
    c.addEventListener("click", y, !0), c.addEventListener("pointerdown", b, !0), h = window.setTimeout(m, 600);
  }, s = (c) => {
    !ze || e || c.pointerType !== "touch" || (r.current = { x: c.clientX, y: c.clientY, t: Date.now(), doc: c.currentTarget.ownerDocument });
  }, l = (c) => {
    if (!ze || e || c.pointerType !== "touch") return;
    const d = r.current;
    if (r.current = null, !d) return;
    if (Math.hypot(c.clientX - d.x, c.clientY - d.y) > Oa) {
      o(d.doc, c.clientX, c.clientY);
      return;
    }
    if (Date.now() - d.t > za) return;
    i.current = Date.now();
    const f = c.currentTarget;
    n(), f.click(), o(d.doc, c.clientX, c.clientY);
  }, a = () => {
    r.current = null;
  }, u = () => Date.now() - i.current < hs;
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
function gs(n) {
  return In == null || In(), In = n, () => {
    In === n && (In = null);
  };
}
const ys = Zt(null);
function Fi(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.identityAccent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", identityAccent: o, surface: r, context: i };
}
function Bi({ theme: n, children: e }) {
  return /* @__PURE__ */ p(ys.Provider, { value: n, children: e });
}
function zh({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = Ot();
  return /* @__PURE__ */ p(Bi, { theme: Fi({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Fh({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = Ot(), a = Fi({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ p(Bi, { theme: a, children: /* @__PURE__ */ p(
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
  return en(ys);
}
function Gr(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function xs(n, e) {
  if (n)
    return (n === "light" || n === "dark") && e ? {
      theme: n,
      attrs: { "data-theme": n, "data-mode": n, "data-accent": e.accent }
    } : { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = Gr(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function Ba(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function Ha(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function _a(n) {
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
  const r = t ?? _a(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  const s = getComputedStyle(n), l = parseFloat(s.scrollMarginBlockStart || s.scrollMarginTop || "0") || 0, a = parseFloat(s.scrollMarginBlockEnd || s.scrollMarginBottom || "0") || 0;
  i.top - l < o.top ? r.scrollTop -= o.top - (i.top - l) : i.bottom + a > o.bottom && (r.scrollTop += i.bottom + a - o.bottom);
}
function bs({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = v(!1), s = v(!1), l = v(!1), a = v({ row: e, scroller: r, block: t });
  a.current = { row: e, scroller: r, block: t };
  const u = ae(() => {
    o.current = !0;
  }, []);
  return rt(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: c, scroller: d, block: f } = a.current, h = c();
    h && (an(h, f, (d == null ? void 0 : d()) ?? null), l.current = !0);
  }, [n]), ce(() => {
    if (!n || i !== !0 || !l.current) return;
    const c = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: d, scroller: f } = a.current;
      an(d(), "nearest", (f == null ? void 0 : f()) ?? null);
    });
    return () => cancelAnimationFrame(c);
  }, [n, i]), { engagedRef: o, engage: u };
}
const ja = [];
function Bt(n, e) {
  const t = /* @__PURE__ */ new Map();
  e.forEach((s, l) => t.set(s, l));
  const r = [], i = [], o = /* @__PURE__ */ new Set();
  for (const s of n)
    o.has(s) || (o.add(s), t.has(s) ? r.push(s) : i.push(s));
  return r.sort((s, l) => t.get(s) - t.get(l)), [...r, ...i];
}
function kn(n, e) {
  if (n.length !== e.length) return !1;
  const t = new Set(n);
  return e.every((r) => t.has(r));
}
function Wa(n, e, t, r = {}) {
  var o;
  const i = Bt(n, t);
  return (o = r.disabledIds) != null && o.includes(e) ? i : i.includes(e) ? i.filter((s) => s !== e) : r.max !== void 0 && i.length >= r.max ? i : Bt([...i, e], t);
}
function ho(n, e, t, r, i = {}) {
  const o = Bt(n, r), s = new Set(e);
  if (!t) return o.filter((d) => !s.has(d));
  const l = new Set(r), a = new Set(i.disabledIds ?? []), u = i.max === void 0 ? 1 / 0 : Math.max(0, i.max - o.length), c = Bt([...s], r).filter((d) => l.has(d) && !o.includes(d) && !a.has(d)).slice(0, u);
  return c.length === 0 ? o : Bt([...o, ...c], r);
}
function po(n, e) {
  if (e.length === 0) return "none";
  const t = new Set(n), r = e.reduce((i, o) => i + (t.has(o) ? 1 : 0), 0);
  return r === 0 ? "none" : r === e.length ? "all" : "some";
}
function qa(n, e, t) {
  if (!t) return 0;
  const r = new Set(e), i = new Set(t);
  return n.reduce((o, s) => o + (r.has(s) && !i.has(s) ? 1 : 0), 0);
}
function vs(n) {
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
  } = n, [f, h] = se(() => Bt(t, r)), m = lt(() => new Set(s ?? []), [s]), y = lt(() => new Set(f), [f]), b = o !== void 0 && f.length >= o, x = !kn(f, t), O = ae((W) => {
    if (m.has(W)) return;
    const I = y.has(W), Z = Wa(f, W, r, { max: o, disabledIds: s });
    kn(Z, f) || (h(Z), d == null || d(Z), c == null || c(W, !I));
  }, [f, y, m, r, o, s, c, d]), w = ae((W) => {
    const I = W.filter((U) => !m.has(U)), Z = po(f, I), te = ho(f, I, Z !== "all", r, { max: o, disabledIds: s });
    kn(te, f) || (h(te), d == null || d(te));
  }, [f, m, r, o, s, d]), k = ae((W, I = i ?? r) => {
    const Z = ho(f, I, W, r, { max: o, disabledIds: s });
    kn(Z, f) || (h(Z), d == null || d(Z));
  }, [f, i, r, o, s, d]), C = ae(() => {
    f.length !== 0 && (h([]), d == null || d([]));
  }, [f, d]), S = ae((W) => {
    h(Bt(W ?? t, r));
  }, [t, r]), B = ae(() => !u || kn(f, t) ? !1 : (u(Bt(f, r)), !0), [u, f, t, r]), K = ae(() => !a || kn(f, t) ? !1 : (a(Bt(f, r)), !0), [a, f, t, r]), N = ae((W) => po(f, W), [f]);
  return {
    mode: e,
    indicator: l,
    draft: f,
    count: f.length,
    max: o,
    atMax: b,
    dirty: x,
    hiddenCount: qa(f, r, i),
    isSelected: (W) => y.has(W),
    isDisabled: (W) => m.has(W),
    canToggle: (W) => !m.has(W) && (y.has(W) || !b),
    toggle: O,
    toggleGroup: w,
    setAll: k,
    clear: C,
    reset: S,
    commit: B,
    flush: K,
    cancel: S,
    groupState: N
  };
}
const ws = Zt(null), Ka = () => en(ws), ks = ja;
function Hi({ checked: n, size: e, tone: t = "accent", indeterminate: r = !1 }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: `ui-check-indicator ${n || r ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: r ? /* @__PURE__ */ R("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8 H11.5", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", fill: "none" })
      ] }) : n ? /* @__PURE__ */ R("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ p("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Ja({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: u = "accent", block: c = !1 }) {
  const d = a !== "plain", f = Je(), h = _(16, 20, f), m = _(12, 14, f), y = _(12, 14, f), b = _(12, 16, f), x = _(10, 12, f), O = _(8, 10, f);
  return /* @__PURE__ */ R(
    "label",
    {
      className: `ui-press ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${u === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: c ? "flex" : "inline-flex", alignItems: "center", gap: O, padding: d ? `${x}px ${b}px` : void 0 },
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
        d ? /* @__PURE__ */ p(Hi, { checked: n, size: h, tone: u }) : /* @__PURE__ */ p("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ p("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ p("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ p("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: y }, children: r })
      ]
    }
  );
}
const mo = "transition-[grid-template-columns] ease-out duration-150 motion-reduce:transition-none", Va = "group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr] fine:group-hover:grid-cols-[1fr] fine:group-active:grid-cols-[1fr]", Ya = "group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr] fine:group-hover:grid-cols-[0fr] fine:group-active:grid-cols-[0fr]", Ua = "group-focus-visible:opacity-100 group-data-[state=open]:opacity-100 fine:group-hover:opacity-100 fine:group-active:opacity-100", Xa = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-active:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Ga = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-active:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Qa = "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100 group-data-[state=open]:opacity-100";
function Za(n) {
  if (!Xe.isValidElement(n)) return String(n ?? "");
  const e = n.type, t = typeof e == "string" ? e : e.displayName || e.name || "icon", r = n.props;
  return `${t}|${r.className ?? ""}|${r.size ?? ""}`;
}
function Ss({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, reserve: o, roll: s = "up", coarseReveal: l = !1, children: a }) {
  const u = !!n, c = l && ze, d = c ? " delay-200" : "", f = c ? Xa : Va, h = c ? Ga : Ya, m = c ? Qa : Ua, y = u && !t, b = !!e, x = r || !b, O = !y || b && !r, w = Za(n), [k, C] = se({ sig: w, node: n }), [S, B] = se(null);
  w !== k.sig && (C({ sig: w, node: n }), B(k.node)), ce(() => {
    if (S == null) return;
    const N = window.setTimeout(() => B(null), 200);
    return () => window.clearTimeout(N);
  }, [S]);
  const K = S == null ? n : /* @__PURE__ */ R("span", { className: "relative inline-flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ p("span", { "aria-hidden": !0, className: `ui-icon-roll-out${s === "down" ? "-down" : ""} absolute inset-0 inline-flex items-center justify-center`, children: S }, `out:${k.sig}`),
    /* @__PURE__ */ p("span", { className: `ui-icon-roll-in${s === "down" ? "-down" : ""} inline-flex items-center justify-center`, children: n }, `in:${w}`)
  ] });
  return u ? /* @__PURE__ */ R(dt, { children: [
    y ? /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: `grid min-w-0 ${mo}${d} ${O ? `grid-cols-[1fr] ${h}` : "grid-cols-[0fr]"}`, children: /* @__PURE__ */ p("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: K }) }) : /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: K }),
    /* @__PURE__ */ p("span", { "data-kit-label": !0, className: `grid min-w-0 ${mo}${d} ${x ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${f}`}`, children: /* @__PURE__ */ p("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ p(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${x ? "opacity-100" : `opacity-0 ${m}`} ${y ? `pl-[var(--kit-collapse-gap)] group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${c ? "group-hover:pl-0! group-active:pl-0!" : "fine:group-hover:pl-0! fine:group-active:pl-0!"} ${x ? "pl-0!" : ""}` : ""}`,
        style: y ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o ? /* @__PURE__ */ R("span", { className: "inline-grid min-w-0", children: [
          /* @__PURE__ */ p("span", { "aria-hidden": !0, className: "invisible col-start-1 row-start-1 whitespace-nowrap", children: o }),
          /* @__PURE__ */ p("span", { className: "col-start-1 row-start-1", children: a })
        ] }) : a
      }
    ) }) })
  ] }) : /* @__PURE__ */ p(dt, { children: a });
}
const Bh = {
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
  className: y = "",
  type: b = "button",
  children: x,
  onClick: O,
  onPointerDown: w,
  onPointerUp: k,
  onPointerCancel: C,
  disabled: S,
  ...B
}) {
  const K = Ot(), N = e ?? (K == null ? void 0 : K.mode) ?? "light", W = t ?? Ha(K), I = yn({ px: 10, py: 6, fs: 12 }, { px: 14, py: 9, fs: 14 }), Z = yn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 9, fs: 14 }), te = yn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), U = "", re = "", ke = `${l ? "ui-reveal " : ""}ui-press inline-flex items-center font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed`, ue = "rounded", M = "rounded-[var(--ui-radius-btn)]", D = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, F = {
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
  }, E = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, ee = {
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
  }, J = { base: `${re} bg-[var(--ui-btn-solid-bg)] hover:bg-[var(--ui-btn-solid-hover-bg)] border border-[color:var(--ui-btn-solid-border)] hover:border-[color:var(--ui-btn-solid-hover-border)] text-[color:var(--ui-btn-solid-text)]`, open: "bg-[var(--ui-btn-solid-hover-bg)]!" }, ge = {
    light: {
      subtle: { base: `${U} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      /* The primary fill is the identity header step, mode-independent (the
         app header is always dark chrome). Read from the `data-identity-accent`
         block the button carries, so a neutral modal keeps its project CTA. */
      primary: { base: `${re} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: J,
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
      primary: { base: `${re} bg-[var(--ui-btn-primary-bg)] hover:bg-[var(--ui-btn-primary-hover-bg)] text-white`, open: "bg-[var(--ui-btn-primary-hover-bg)]!" },
      solid: J,
      outline: {
        base: `${U} text-zinc-300 shadow-[inset_0_0_0_1px_var(--ui-border-strong)] hover:bg-[var(--ui-btn-hover-bg)] hover:text-zinc-100`,
        open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-100"
      },
      "danger-ghost": { base: `${U} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, xe = B["data-state"] === "open", le = ge[N][n], be = n === "primary" || n === "solid" ? Z : n.startsWith("tab") ? te : I, X = ze ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, P = _(6, 8, Je()), $ = _(28, 40, Je()), q = W === "emerald" ? "emerald" : W ? "blue" : null, Ce = t === "emerald" ? "emerald" : t ? "blue" : (K == null ? void 0 : K.identityAccent) ?? "zinc", Ne = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!", Fe = {
    info: "bg-blue-600! hover:bg-blue-500! text-white!",
    success: "bg-emerald-600! hover:bg-emerald-500! text-white!",
    warning: "bg-amber-500! hover:bg-amber-400! text-zinc-950!",
    danger: "bg-rose-600! hover:bg-rose-500! text-white!"
  };
  let oe;
  if (n === "tab") {
    const L = D[N];
    oe = `${ue} ${r ? q ? F[q].active : L.active : q ? F[q][N === "light" ? "inactiveLight" : "inactiveDark"] : L.inactive}`;
  } else if (n === "tab-header") {
    const L = q ? r ? ee[q].active : ee[q].inactive : r ? E.active : E.inactive;
    oe = `${ue} ${L} ${xe ? q ? ee[q].open : E.open : ""}`;
  } else
    oe = `${M} ${le.base} ${xe ? le.open : ""}`, r && (oe = `${oe} ${i === "neutral" ? Ne : Fe[i]}`);
  const Se = !!d && !o, Ee = o ? { width: $, height: $, padding: 0, gap: 0 } : s === "minimal" ? { ...X, gap: Se ? 0 : P } : { ...be, gap: Se ? 0 : P }, H = zi(() => {
  }, S);
  return /* @__PURE__ */ p(
    "button",
    {
      type: b,
      "data-mode": N,
      "data-accent": K == null ? void 0 : K.accent,
      "data-surface": K == null ? void 0 : K.surface,
      "data-identity-accent": Ce,
      className: `${ke} ${o ? "justify-center" : ""} ${Se ? "group" : ""} ${oe} ${y}`,
      "aria-pressed": r && !n.startsWith("tab") ? !0 : void 0,
      "data-active": r || void 0,
      style: Ee,
      disabled: S,
      onPointerDown: (L) => {
        H.onPointerDown(L), w == null || w(L);
      },
      onPointerUp: (L) => {
        H.onPointerUp(L), k == null || k(L);
      },
      onPointerCancel: (L) => {
        H.onPointerCancel(), C == null || C(L);
      },
      onClick: (L) => O == null ? void 0 : O(L),
      ...B,
      children: o ? x : /* @__PURE__ */ p(
        Ss,
        {
          icon: d,
          collapse: f,
          iconWithLabel: h,
          coarseReveal: m,
          active: r && (n.startsWith("tab") || a),
          gap: P,
          reserve: u,
          roll: c,
          children: x
        }
      )
    }
  );
}
function Or({
  checked: n,
  indeterminate: e = !1,
  disabled: t = !1,
  indicator: r = "box",
  size: i,
  className: o = ""
}) {
  const s = Je(), l = i ?? _(14, 18, s);
  return r === "check" ? /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "check",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      style: { width: l, height: l },
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ p(Gl, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : n ? /* @__PURE__ */ p(fr, { size: l, strokeWidth: 2.5, className: "text-[color:var(--ui-check-accent)]" }) : null
    }
  ) : /* @__PURE__ */ p(
    "span",
    {
      "data-selection-check": "box",
      className: `inline-flex shrink-0 items-center justify-center ${t ? "opacity-40" : ""} ${o}`,
      "aria-hidden": !0,
      children: /* @__PURE__ */ p(Hi, { checked: n, indeterminate: e, size: l })
    }
  );
}
function Ns({
  count: n,
  max: e,
  hiddenCount: t = 0,
  onClear: r,
  hero: i,
  clear: o = !0,
  theme: s,
  className: l = ""
}) {
  const a = Je(), u = _(10, 14, a), c = _(6, 9, a), d = _(11, 13, a), f = s === "light" ? "light" : "dark", h = s === "emerald" ? "emerald" : s === "blue" ? !0 : void 0, m = e !== void 0 ? `${n} of ${e} selected` : `${n} selected`;
  return /* @__PURE__ */ R(
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
        /* @__PURE__ */ R(
          "span",
          {
            "data-selection-count": !0,
            className: "min-w-0 flex-1 truncate tabular-nums text-[color:var(--ui-text-muted)]",
            style: { fontSize: d },
            children: [
              m,
              t > 0 && /* @__PURE__ */ R("span", { className: "text-[color:var(--ui-text-faint)]", children: [
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
            onMouseDown: (y) => y.preventDefault(),
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
function Vt(n) {
  return !!n.isComposing || n.keyCode === 229;
}
const _i = Zt("dark"), Ts = () => en(_i), ji = Zt({ "data-theme": "dark" }), ec = () => en(ji);
function Wi() {
  const n = Je();
  return {
    padding: `${_(8, 12, n)}px ${_(12, 16, n)}px`,
    fontSize: `${_(12, 14, n)}px`,
    lineHeight: `${_(18, 22, n)}px`
  };
}
function Cs() {
  const n = Je();
  return {
    padding: `${_(6, 9, n)}px ${_(12, 16, n)}px ${_(2, 3, n)}px`,
    fontSize: `${_(10, 11, n)}px`,
    lineHeight: `${_(14, 16, n)}px`
  };
}
const tc = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", go = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", nc = (n) => n ? "text-xs" : "text-[10px]";
function Qr(n) {
  const e = ze && ts() > 0;
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
    headerPad: go(e),
    headerText: `${go(e)} font-semibold uppercase tracking-wider ${nc(e)} ui-label`,
    // Item padding
    itemPad: tc(e),
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
function Es(n) {
  const e = [];
  return Xe.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Xe.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const qi = Zt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), pr = Zt(null), Ki = () => en(pr), Ms = Zt({ query: "", setQuery: () => {
} }), rc = () => en(Ms), As = Zt(null), ic = () => en(As), oc = () => !0;
function Zr(n) {
  const e = v([]), [t, r] = se(-1), [i, o] = se(!1), [s, l] = se(0), a = ae((f) => (e.current = [...e.current, f], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), l((h) => h + 1);
  }), []), u = ae((f, h) => {
    r(f), o(h === "pointer");
  }, []), c = ae(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return lt(() => ({
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
function Rs(n) {
  const e = Ki(), t = v(e);
  t.current = e;
  const r = v(null);
  ce(() => {
    var a, u;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0, itemId: n.itemId };
    return r.current = l, (u = t.current) == null ? void 0 : u.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Ji(n, e, t, r) {
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
    var y, b, x, O, w, k;
    if (!s.current) return;
    const d = (y = l.current) == null ? void 0 : y.onSelectAll;
    if (d && (c.metaKey || c.ctrlKey) && c.key.toLowerCase() === "a") {
      c.preventDefault(), c.stopImmediatePropagation(), d();
      return;
    }
    const f = c.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (c.key.length === 1 || c.key === "Enter" || c.key === "Escape")) {
      const C = (x = (b = l.current) == null ? void 0 : b.onFieldKey) == null ? void 0 : x.call(b, c);
      (!!((O = l.current) != null && O.onFieldKey) || o.current.items.length > 0) && (c.stopImmediatePropagation(), C && c.preventDefault());
      return;
    }
    const m = o.current.items;
    if (m.length !== 0) {
      if (c.key === "ArrowDown" || c.key === "ArrowUp") {
        c.preventDefault(), c.stopImmediatePropagation();
        const C = c.key === "ArrowDown" ? 1 : -1, S = (i.current + C + m.length) % m.length;
        o.current.setHighlighted(S, "keyboard");
      } else if (c.key === "ArrowRight") {
        c.preventDefault(), c.stopImmediatePropagation();
        const C = i.current;
        C >= 0 && C < m.length && m[C].submenu && m[C].activate();
      } else if (c.key === "ArrowLeft")
        c.preventDefault(), c.stopImmediatePropagation(), (k = (w = l.current) == null ? void 0 : w.onCloseSub) == null || k.call(w);
      else if (c.key === "Enter" || c.key === " ") {
        c.preventDefault(), c.stopImmediatePropagation();
        const C = i.current;
        C >= 0 && C < m.length && m[C].activate();
      } else if (c.key.length === 1 && !c.ctrlKey && !c.metaKey && !c.altKey) {
        c.preventDefault(), c.stopImmediatePropagation();
        const C = Date.now(), S = (C - a.current.time > 500 ? "" : a.current.text) + c.key.toLowerCase();
        if (a.current = { text: S, time: C }, !S) return;
        const B = i.current + 1;
        for (let K = 0; K < m.length; K++) {
          const N = (B + K) % m.length;
          if (m[N].label.toLowerCase().startsWith(S)) {
            o.current.setHighlighted(N, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Vi(n, e, t, r, i, o, s) {
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
function Yi(n, e) {
  const t = v(n);
  t.current = n;
  const r = v(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function ei({
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
  searchValue: y,
  onSearchValueChange: b,
  multiple: x
}) {
  const O = Ot(), w = xs(s, O), k = w.theme, [C, S] = se([]), [B, K] = se(null), N = Yn(), W = Li(), I = v(null), Z = v(null), te = v(n);
  te.current = n;
  const [U, re] = se(n), [ke, ue] = se(""), M = f && y !== void 0, D = M ? y : ke, F = M ? b ?? (() => {
  }) : ue, E = v(y ?? "");
  ce(() => {
    n || (E.current = y ?? "");
  }, [n, y]);
  const ee = M && D === E.current ? "" : D, J = $i(), ge = v(null), xe = Je(), le = {
    padding: `${_(8, 12, xe)}px ${_(12, 16, xe)}px`,
    fontSize: `${_(12, 14, xe)}px`
  }, [be, X] = se(0), P = f && !M;
  ce(() => {
    var qe;
    if (!P || !n) return;
    const A = (qe = Z.current) == null ? void 0 : qe.querySelector("[data-menu-items]");
    if (!A) return;
    const G = () => X(A.offsetWidth - A.clientWidth);
    G();
    const ye = new ResizeObserver(G);
    return ye.observe(A), () => ye.disconnect();
  }, [n, P, D]);
  const $ = lt(() => {
    if (!f) return;
    const A = ee.trim().toLowerCase();
    return A ? (G) => {
      var ye;
      return m ? m(A, G.label, G.group) : G.label.toLowerCase().includes(A) || (((ye = G.group) == null ? void 0 : ye.toLowerCase().includes(A)) ?? !1);
    } : oc;
  }, [ee, f, m]), q = Zr($), Ce = f && ee.trim() !== "" && q.items.length === 0, Ne = !!x, Fe = q.allItems.map((A) => A.itemId).filter((A) => !!A), oe = q.items.map((A) => A.itemId).filter((A) => !!A), Se = vs({
    mode: "draft",
    selectedIds: (x == null ? void 0 : x.selectedIds) ?? ks,
    itemIds: Fe,
    visibleIds: oe,
    max: x == null ? void 0 : x.max,
    disabledIds: x == null ? void 0 : x.disabledIds,
    indicator: x == null ? void 0 : x.indicator,
    onCommit: x == null ? void 0 : x.onCommit
  }), Ee = v(Se.reset);
  Ee.current = Se.reset;
  const H = typeof (x == null ? void 0 : x.commitLabel) == "function" ? x.commitLabel(Se.count) : (x == null ? void 0 : x.commitLabel) ?? `Select ${Se.count}`;
  ce(() => {
    if (n)
      return re(!0), M || ue(""), q.setHighlighted(d ?? -1, "keyboard"), Ee.current(), gs(() => {
        t == null || t(!1), e == null || e();
      });
    S([]);
  }, [n, d, t, e]), ce(() => {
    if (!n || !W) return;
    const A = (G) => {
      if (G.pointerType !== "touch") return;
      const ye = G.target;
      ye && (Z.current && Z.current.contains(ye) || I.current && I.current.contains(ye) || ye instanceof Element && ye.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') || (t == null || t(!1), e == null || e()));
    };
    return W.addEventListener("pointerdown", A, { capture: !0 }), () => W.removeEventListener("pointerdown", A, { capture: !0 });
  }, [n, W, t, e]);
  const L = ae(() => {
    const A = I.current;
    if (!A) return null;
    const G = A.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), Y = Xr({
    visible: n,
    morph: a,
    anchor: L,
    onClosed: () => re(!1)
  }), Re = v(() => {
  }), ve = v(() => {
  }), ft = v(() => {
  }), Me = ae((A) => {
    if (A.key === "Enter") {
      if (Vt(A)) return !0;
      const G = q.highlightedIndex, ye = q.items[G >= 0 ? G : 0];
      return ye == null || ye.activate(), !0;
    }
    return A.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [q, t, e]);
  Ji(n && C.length === 0, q, Re, {
    onFieldKey: Me,
    onSelectAll: Ne ? () => Se.setAll(!0) : void 0
  }), Yi(n, ve), Vi(n, q, Re, Z, C.length > 0, ft, {
    ignoreFields: M,
    selectAll: Ne
  });
  const Ye = v(null), je = ae((A) => {
    var G;
    if (A) {
      A.addEventListener("keydown", Re.current, { capture: !0 }), A.addEventListener("wheel", ve.current, { passive: !1 });
      const ye = A.ownerDocument;
      Ye.current = ye, ye.addEventListener("keydown", ft.current, { capture: !0 }), gt(!0);
    } else
      (G = Ye.current) == null || G.removeEventListener("keydown", ft.current, { capture: !0 }), Ye.current = null, gt(!1);
    Z.current = A, Y(A);
  }, [Y]), [Le, it] = se({ top: 0, left: 0, maxH: ds, side: "bottom", ready: !1 }), [un, jt] = se(0), [Ct, gt] = se(!1);
  ce(() => {
    n && I.current && jt(I.current.getBoundingClientRect().width);
  }, [n]), fs({
    anchorRef: I,
    panelRef: Z,
    open: n && Ct,
    maxHeight: c,
    onPosition: it
  }), ce(() => {
    var A;
    if (Le.ready && n) {
      if (f) {
        (A = ge.current ?? I.current) == null || A.focus();
        return;
      }
      const G = Z.current;
      G && G.ownerDocument.activeElement !== G && !G.contains(G.ownerDocument.activeElement) && G.focus();
    }
  }, [Le.ready, n, f]), ce(() => {
    if (!n || !f) return;
    if (q.items.length === 0) {
      q.highlightedIndex !== -1 && q.setHighlighted(-1, "keyboard");
      return;
    }
    const A = q.highlightedIndex;
    (A < 0 || A >= q.items.length) && q.setHighlighted(0, "keyboard");
  }, [n, D, f, q.items.length]), rt(() => {
    var G;
    if (!n || q.highlightedIndex < 0 || q.pointerDriven) return;
    const A = (G = Z.current) == null ? void 0 : G.querySelector(`[data-ei="${q.highlightedIndex}"]`);
    an(A, "nearest");
  }, [n, q.highlightedIndex, q.pointerDriven]);
  const Ie = ae((A) => {
    if (!(!A && !te.current)) {
      if (!A && bt.current) {
        if (M) return;
        vt.current = !0;
      }
      t ? t(A) : A || e == null || e();
    }
  }, [t, e]), ct = v(U);
  ct.current = U;
  const bt = v(!1), vt = v(!1), wt = ae(() => {
    if (!te.current && ct.current) {
      if (vt.current) {
        vt.current = !1, bt.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), We = Xe.isValidElement(r) ? r : null, ht = v(!1), yt = ae(() => {
    const A = I.current;
    A && (ht.current = !0, A.focus(), setTimeout(() => {
      ht.current = !1;
    }, 0));
  }, []), tn = We ? Xe.cloneElement(We, {
    ref: (A) => {
      I.current = A;
      const G = We.props.ref;
      typeof G == "function" ? G(A) : G && (G.current = A);
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...M ? { type: We.props.type ?? "text" } : {},
    ...M ? {
      /* A text field that opens a list IS a combobox, and the highlighted
         row must be announced — the field is outside the popup, so the
         only link screen readers get is `aria-activedescendant`. */
      role: "combobox",
      "aria-autocomplete": "list",
      "aria-controls": n ? `${J}-content` : void 0,
      "aria-activedescendant": n && q.highlightedIndex >= 0 ? `${J}-opt-${q.highlightedIndex}` : void 0
    } : {},
    onPointerDownCapture: (A) => {
      var G, ye;
      (ye = (G = We.props).onPointerDownCapture) == null || ye.call(G, A), bt.current = !0, vt.current = !1, setTimeout(() => {
        bt.current = !1;
      }, 0);
    },
    onPointerDown: (A) => {
      var G, ye;
      if ((ye = (G = We.props).onPointerDown) == null || ye.call(G, A), M) {
        A.preventDefault();
        const qe = te.current;
        qe || t == null || t(!0);
        const ot = I.current;
        ot == null || ot.focus(), !qe && ot instanceof HTMLInputElement && ot.select();
      } else !te.current && ct.current && !vt.current && (t == null || t(!0));
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (A) => {
      var G, ye;
      (ye = (G = We.props).onKeyDownCapture) == null || ye.call(G, A), M && A.key === " " && A.stopPropagation();
    },
    onClick: (A) => {
      var G, ye;
      (ye = (G = We.props).onClick) == null || ye.call(G, A), wt();
    },
    /* A kit-driven focus restore is not a user focus (see above). */
    onFocus: (A) => {
      var G, ye;
      if (ht.current) {
        ht.current = !1;
        return;
      }
      (ye = (G = We.props).onFocus) == null || ye.call(G, A);
    },
    /* Focus leaving the field ends the search session: Tab (or any focus
       move that does not land in the panel) must close the list, not leave
       an orphan panel floating with the keyboard elsewhere. The panel's
       own focused row is legitimate — keep it open for the pending click. */
    onBlur: (A) => {
      var ye, qe, ot, Et;
      if ((qe = (ye = We.props).onBlur) == null || qe.call(ye, A), !M || !te.current) return;
      const G = A.relatedTarget;
      G && ((ot = Z.current) != null && ot.contains(G) || (Et = I.current) != null && Et.contains(G)) || setTimeout(() => {
        var ne;
        const Rt = I.current;
        if (!Rt || !te.current) return;
        const T = Rt.ownerDocument.activeElement;
        T && (Rt.contains(T) || (ne = Z.current) != null && ne.contains(T)) || (t == null || t(!1), e == null || e());
      }, 0);
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight and Enter activates the highlighted (or first visible)
       row. Filtering itself follows the VALUE (see filterQuery), so no
       input method is special-cased here. */
    onKeyDown: (A) => {
      var G, ye;
      if ((ye = (G = We.props).onKeyDown) == null || ye.call(G, A), !(!M || !te.current)) {
        if (A.key === "ArrowDown" || A.key === "ArrowUp") {
          A.preventDefault();
          const qe = q.items;
          if (qe.length === 0) return;
          const ot = A.key === "ArrowDown" ? 1 : -1, Et = (q.highlightedIndex + ot + qe.length) % qe.length;
          q.setHighlighted(Et, "keyboard");
        } else if (A.key === "Enter") {
          if (A.preventDefault(), Vt(A)) return;
          const qe = q.highlightedIndex, ot = q.items[qe >= 0 ? qe : 0];
          ot == null || ot.activate();
        }
      }
    }
  }) : r, ut = /* @__PURE__ */ R("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ R("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      ee.trim(),
      "”"
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), $t = P || Ne, Dt = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${$t ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ R(_e.Root, { open: n || U, onOpenChange: Ie, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: tn }),
    /* @__PURE__ */ p(_e.Portal, { container: N ?? void 0, children: /* @__PURE__ */ p(_i.Provider, { value: k, children: /* @__PURE__ */ p(ji.Provider, { value: w.attrs, children: /* @__PURE__ */ p(qi.Provider, { value: { chain: C, setChain: S, morph: a, keyboardOpened: B, setKeyboardOpened: K }, children: /* @__PURE__ */ p(pr.Provider, { value: q, children: /* @__PURE__ */ p(Ms.Provider, { value: { query: D, setQuery: F }, children: /* @__PURE__ */ p(ws.Provider, { value: Ne ? Se : null, children: /* @__PURE__ */ p(As.Provider, { value: J, children: /* @__PURE__ */ R(
      _e.Content,
      {
        id: `${J}-content`,
        ref: je,
        tabIndex: M ? void 0 : -1,
        ...w.attrs,
        "data-ui-fixed": !0,
        className: `${Dt} ${o || ""} ${u || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Le.left,
          top: Le.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : un || void 0,
          maxHeight: Le.maxH,
          visibility: Le.ready ? "visible" : "hidden"
        },
        onPointerLeave: q.pointerLeave,
        onPointerDownOutside: (A) => {
          const G = A.target;
          G != null && G.closest('[role="menu"], [data-radix-menu-content]') && A.preventDefault(), G && I.current && I.current.contains(G) && A.preventDefault();
        },
        onInteractOutside: (A) => {
          A.type === "dismissableLayer.focusOutside" && C.length > 0 && A.preventDefault();
        },
        onFocusCapture: M ? (A) => {
          A.target === A.currentTarget && (A.stopPropagation(), yt());
        } : void 0,
        onFocusOutside: M ? (A) => {
          var ye;
          const G = A.target;
          G && (G === I.current || (ye = I.current) != null && ye.contains(G)) && A.preventDefault();
        } : void 0,
        onCloseAutoFocus: M ? (A) => {
          A.preventDefault(), yt();
        } : void 0,
        children: [
          P && /* @__PURE__ */ p("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: be }, children: /* @__PURE__ */ R("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: le, children: [
            /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: ge,
                value: D,
                onChange: (A) => F(A.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            D ? /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (A) => A.stopPropagation(),
                onClick: () => {
                  var A;
                  F(""), (A = ge.current) == null || A.focus();
                },
                children: /* @__PURE__ */ p(Cn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ p("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          $t ? /* @__PURE__ */ R("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            Ce && ut
          ] }) : /* @__PURE__ */ R(dt, { children: [
            l,
            Ce && ut
          ] }),
          Ne && (x == null ? void 0 : x.footer) !== !1 && /* @__PURE__ */ p(
            Ns,
            {
              count: Se.count,
              max: x == null ? void 0 : x.max,
              hiddenCount: (x == null ? void 0 : x.hiddenNote) === !1 ? 0 : Se.hiddenCount,
              clear: (x == null ? void 0 : x.clear) !== !1,
              theme: k,
              onClear: Se.clear,
              hero: {
                label: H,
                onClick: () => {
                  Se.commit(), Ie(!1);
                },
                disabled: Se.count === 0
              }
            }
          )
        ]
      }
    ) }) }) }) }) }) }) }) })
  ] });
}
function sc({
  item: n,
  isActive: e,
  itemSize: t,
  itemRender: r,
  closeOnSelect: i,
  onSelect: o,
  d: s
}) {
  const l = zi(() => o(n.id));
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
function Hh({
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
  theme: y,
  align: b,
  label: x,
  header: O,
  itemLabel: w,
  trigger: k,
  minItems: C = 1,
  itemRender: S,
  morph: B = !0,
  contentClassName: K
}) {
  const N = Qr(), W = Wi(), [I, Z] = se(null), [te, U] = se(""), re = v(te);
  re.current = te;
  const ke = v(null), ue = v(null), [M, D] = se(null), F = ae((le) => {
    ue.current = le, D(le);
  }, []), E = bs({
    open: n,
    scroller: () => ue.current,
    row: () => {
      var le;
      return ((le = ue.current) == null ? void 0 : le.querySelector('[data-active="1"]')) ?? null;
    }
  });
  ce(() => {
    if (!n) return;
    const le = (X) => {
      var oe, Se;
      const P = X.target;
      if (P && P.closest("input, textarea, [contenteditable]")) {
        if (I && P === ke.current)
          if (X.key === "Enter") {
            if (X.preventDefault(), X.stopImmediatePropagation(), Vt(X)) return;
            J();
          } else X.key === "Escape" && (X.preventDefault(), X.stopImmediatePropagation(), ge());
        return;
      }
      const $ = (oe = ue.current) == null ? void 0 : oe.closest(".ui-menu");
      if (!$ || !$.contains(X.target)) return;
      const q = $.ownerDocument, Ce = [...$.querySelectorAll('[data-im-row] > [role="menuitem"]:first-child')], Ne = [...$.querySelectorAll(':scope > div:last-child > [role="menuitem"]')], Fe = [...Ce, ...Ne];
      if (X.key === "ArrowDown" || X.key === "ArrowUp") {
        X.preventDefault(), X.stopImmediatePropagation();
        const Ee = q.activeElement;
        let H = Ee ? Fe.indexOf(Ee) : -1;
        if (H < 0 && Ee) {
          const ve = Ee.closest("[data-im-row]"), ft = ve == null ? void 0 : ve.querySelector('[role="menuitem"]:first-child');
          ft && (H = Ce.indexOf(ft));
        }
        const L = X.key === "ArrowDown" ? 1 : -1, Y = H < 0 ? L === 1 ? 0 : Fe.length - 1 : (H + L + Fe.length) % Fe.length, Re = Fe[Y];
        Re == null || Re.focus({ preventScroll: !0 }), an((Re == null ? void 0 : Re.closest("[data-im-row]")) ?? Re, "nearest", ue.current);
        return;
      }
      if (X.key === "ArrowLeft" || X.key === "ArrowRight") {
        const Ee = q.activeElement, H = Ee == null ? void 0 : Ee.closest("[data-im-row]");
        if (!H) return;
        X.preventDefault(), X.stopImmediatePropagation();
        const L = [...H.querySelectorAll('[role="menuitem"]')].slice(1);
        if (L.length === 0) return;
        const Y = Ee && H.contains(Ee) ? L.indexOf(Ee) : -1, Re = X.key === "ArrowRight" ? 1 : -1, ve = Y < 0 ? 0 : (Y + Re + L.length) % L.length;
        (Se = L[ve]) == null || Se.focus({ preventScroll: !0 });
        return;
      }
    }, be = (M == null ? void 0 : M.ownerDocument) ?? null;
    return be == null || be.addEventListener("keydown", le, { capture: !0 }), () => be == null ? void 0 : be.removeEventListener("keydown", le, { capture: !0 });
  }, [n, I, M]), ce(() => {
    if (!I) return;
    const le = t.find(($) => $.id === I);
    le && !te && U(le.name);
    const be = requestAnimationFrame(() => {
      const $ = ke.current;
      $ && ($.focus(), $.select());
    });
    let X = 0;
    const P = window.setInterval(() => {
      const $ = ke.current;
      if (X++, !$ || X > 12) {
        clearInterval(P);
        return;
      }
      $.ownerDocument.activeElement !== $ && ($.focus(), $.select());
    }, 50);
    return () => {
      cancelAnimationFrame(be), clearInterval(P);
    };
  }, [I]), ce(() => {
    if (I) {
      const le = t.find((be) => be.id === I);
      le && !te && U(le.name);
    }
  }, [I, t]);
  const ee = (le, be) => {
    Z(le), U(be);
  }, J = () => {
    I && re.current.trim() && o(I, re.current.trim()), Z(null);
  }, ge = () => {
    Z(null);
  }, xe = w || O.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ R(ei, { open: n, onOpenChange: (le) => {
    le ? (Z(null), U("")) : (I && te.trim() && o(I, te.trim()), Z(null), U("")), (!le || !m) && e(le);
  }, width: "w-80", theme: y, align: b, trigger: k, morph: B, contentClassName: K, children: [
    /* @__PURE__ */ p("div", { className: `shrink-0 ${N.headerText}`, children: O }),
    /* @__PURE__ */ p("div", { ref: F, "data-im-list": !0, onPointerEnter: E.engage, onPointerDown: E.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((le) => {
      const be = le.id === r, X = I === le.id;
      return /* @__PURE__ */ p("div", { "data-im-row": le.id, "data-active": be ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${be || X ? N.rowActiveBg : N.rowHoverBg} ${I && !X ? "opacity-40 pointer-events-none" : ""}`, children: X ? /* @__PURE__ */ R(dt, { children: [
        /* @__PURE__ */ p("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ p(
          "input",
          {
            ref: ke,
            autoFocus: !0,
            value: te,
            onChange: (P) => U(P.target.value),
            onKeyDown: (P) => {
              if (P.key === "Enter") {
                if (P.preventDefault(), P.stopPropagation(), Vt(P)) return;
                J();
              }
              P.key === "Escape" && (P.preventDefault(), P.stopPropagation(), ge());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: W
          }
        ) }),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${N.editConfirm}`,
            onSelect: (P) => {
              P.preventDefault(), J();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(fr, { className: N.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${N.editCancel}`,
            onSelect: (P) => {
              P.preventDefault(), ge();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(Cn, { className: N.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ R(dt, { children: [
        /* @__PURE__ */ p(
          sc,
          {
            item: le,
            isActive: be,
            itemSize: W,
            itemRender: S,
            closeOnSelect: h,
            onSelect: i,
            d: N
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${be ? N.btnActive : N.btnBase}`,
            onSelect: (P) => {
              P.preventDefault(), ee(le.id, le.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Ql, { className: N.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${be ? N.btnActive : N.btnBase}`,
            onSelect: (P) => {
              P.preventDefault();
              const $ = s(le.id);
              $ && ee($, `${le.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Uo, { className: N.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          _e.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= C ? N.btnDisabled : be ? N.btnDangerActive : N.btnDanger}`,
            onSelect: (P) => {
              P.preventDefault(), l(le.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= C,
            children: /* @__PURE__ */ p(vi, { className: N.btnIcon })
          }
        )
      ] }) }, le.id);
    }) }),
    /* @__PURE__ */ R("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ R(dt, { children: [
        /* @__PURE__ */ p(_e.Separator, { className: N.separator }),
        /* @__PURE__ */ R(
          _e.Item,
          {
            className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
            onSelect: (le) => {
              le.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ p(Xo, { className: `${N.btnIcon} ${N.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || u || c || f) && /* @__PURE__ */ p(_e.Separator, { className: N.separator }),
      a && /* @__PURE__ */ R(
        _e.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (le) => {
            le.preventDefault();
            const be = a();
            be && ee(be, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(Vr, { className: `${N.btnIcon} ${N.icon}` }),
            "New ",
            xe
          ]
        }
      ),
      u && /* @__PURE__ */ R(
        _e.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (le) => {
            le.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ R("svg", { className: `${N.btnIcon} ${N.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      c && /* @__PURE__ */ R(
        _e.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (le) => {
            le.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ R("svg", { className: `${N.btnIcon} ${N.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ R(
        _e.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (le) => {
            le.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(vi, { className: `${N.btnIcon} ${N.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Is({
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
  var D;
  Ts();
  const f = Qr(), h = Wi(), m = Cs(), y = v(!1), b = v(null), x = Ka(), O = !!x && d !== void 0, w = x && d !== void 0 ? x.isSelected(d) : l, k = t || (x && d !== void 0 ? !x.canToggle(d) : !1), C = () => {
    k || (x && d !== void 0 ? x.toggle(d) : n());
  }, S = zi(C, k), { myIndex: B, highlighted: K, setPointer: N, api: W } = Rs({
    label: () => Es(o),
    activate: C,
    disabled: k,
    group: c,
    itemId: d
  }), { query: I } = rc(), Z = I.trim() !== "" && B < 0, te = ic(), U = c == null ? void 0 : c.trim(), re = !!U && B >= 0 && (B === 0 || ((D = W == null ? void 0 : W.items[B - 1]) == null ? void 0 : D.group) !== U), ke = U && x ? ((W == null ? void 0 : W.items) ?? []).filter((F) => F.group === U && F.itemId).map((F) => F.itemId).filter((F) => !x.isDisabled(F)) : [], ue = x && ke.length > 0 ? x.groupState(ke) : "none", M = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ R(dt, { children: [
    re && /* @__PURE__ */ p(
      "div",
      {
        "data-menu-group": U,
        role: "presentation",
        className: `ui-label shrink-0 select-none font-semibold uppercase tracking-wider ${x && ke.length > 0 ? "" : "pointer-events-none"}`,
        style: m,
        children: x && ke.length > 0 ? /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `Select all ${U}`,
              onMouseDown: (F) => F.preventDefault(),
              onClick: () => x.toggleGroup(ke),
              className: "flex shrink-0 cursor-pointer items-center justify-center rounded pointer-events-auto",
              children: /* @__PURE__ */ p(
                Or,
                {
                  checked: ue === "all",
                  indeterminate: ue === "some",
                  indicator: x.indicator
                }
              )
            }
          ),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: U })
        ] }) : U
      }
    ),
    /* @__PURE__ */ R(
      _e.Item,
      {
        ref: b,
        id: te && B >= 0 ? `${te}-opt-${B}` : void 0,
        "data-ei": B >= 0 ? B : void 0,
        ...O ? { role: "menuitemcheckbox", "aria-checked": w } : {},
        style: { ...h, display: Z ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${M} ${O ? "" : l ? "ui-item-selected" : ""} ${K ? "ui-item-highlighted" : ""} ${k ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (F) => {
          if (y.current) {
            y.current = !1;
            return;
          }
          if (S.takeGhost()) {
            F.preventDefault();
            return;
          }
          if (S.suppressSelect()) {
            (s || O) && F.preventDefault();
            return;
          }
          if (O) {
            F.preventDefault(), x && d !== void 0 && x.toggle(d);
            return;
          }
          s && F.preventDefault(), n();
        },
        onClick: S.onClick,
        onPointerDown: S.onPointerDown,
        onPointerUp: S.onPointerUp,
        onPointerCancel: S.onPointerCancel,
        onPointerEnter: () => {
          N(B);
        },
        onTouchStart: () => {
        },
        disabled: k,
        children: [
          O && /* @__PURE__ */ p(Or, { checked: w, disabled: k, indicator: x.indicator }),
          e && /* @__PURE__ */ p("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: o }),
          u && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: u }),
          a && /* @__PURE__ */ p(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: a.title,
              onPointerDown: (F) => {
                F.stopPropagation(), F.preventDefault(), y.current = !0, a.onClick();
              },
              onPointerUp: (F) => F.stopPropagation(),
              onClick: (F) => {
                F.stopPropagation(), F.preventDefault();
              },
              children: a.icon
            }
          )
        ]
      }
    )
  ] });
}
function lc({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s, touchPresentation: l }) {
  const { chain: a, setChain: u, morph: c, keyboardOpened: d, setKeyboardOpened: f } = en(qi), h = a.includes(n), m = l ?? "replace", y = ze && m === "accordion", b = ze && m === "replace", x = a[a.length - 1] === n;
  Ts();
  const O = ec(), w = Yn(), k = v(null), C = v(null), S = v(null), B = v(0), K = v(0), N = v(null), [W, I] = se(h), [Z, te] = se(!1), U = !h && W;
  ce(() => {
    h && I(!0);
  }, [h]);
  const re = () => u((H) => {
    const L = H.indexOf(n);
    return L >= 0 ? H.slice(0, L) : H;
  }), ke = (H, L) => {
    var Ye;
    const Y = (Ye = k.current) == null ? void 0 : Ye.ownerDocument;
    if (!Y) return;
    let Re = 0;
    const ve = () => {
      Y.removeEventListener("click", ft, !0), Y.removeEventListener("pointerdown", Me, !0), Re && window.clearTimeout(Re);
    }, ft = (je) => {
      if (Math.hypot(je.clientX - H, je.clientY - L) > 14) {
        ve();
        return;
      }
      const Le = je.target;
      if (Le != null && Le.closest('[role="menuitem"]')) {
        ve();
        return;
      }
      je.preventDefault(), je.stopImmediatePropagation(), ve();
    }, Me = () => ve();
    Y.addEventListener("click", ft, !0), Y.addEventListener("pointerdown", Me, !0), Re = window.setTimeout(ve, 600);
  }, ue = () => {
    if (b && Hn(c)) {
      const H = C.current, L = S.current;
      if (H && L && H.isConnected && L.isConnected) {
        const Y = H.getBoundingClientRect();
        delete L.dataset.submenuOpen, delete L.dataset.submenuInert, H.style.visibility = "hidden", Pr(K, L, Y);
      }
    }
    re();
  }, M = Zr(), D = Ki(), F = v(D);
  F.current = D;
  const E = v(null);
  ce(() => {
    var L;
    const H = {
      label: e,
      activate: () => {
        f(n), u((Y) => Y.includes(n) ? Y : [...Y, n]);
      },
      submenu: !0
    };
    return E.current = H, (L = F.current) == null ? void 0 : L.register(H);
  }, []);
  const ee = D && E.current ? D.items.indexOf(E.current) : -1, J = ee >= 0 && ee === D.highlightedIndex, ge = ae(() => {
    const H = k.current;
    if (!H) return null;
    const L = H.getBoundingClientRect();
    return { left: L.left, top: L.top, width: L.width, height: L.height };
  }, []), xe = Xr({
    visible: h,
    /* Replace owns the transition (FLIP via playRectMorph on both edges);
       the generic scale/fade would fight it. Desktop side flyouts keep it. */
    morph: c && !b,
    anchor: ge,
    onClosed: () => I(!1)
  }), le = v(() => {
  }), be = v(() => {
  }), X = v(() => {
  });
  Ji(h && x, M, le, {
    onCloseSub: () => {
      ue(), D && ee >= 0 && D.setHighlighted(ee, "keyboard");
    }
  });
  const P = v(d);
  P.current = d, ce(() => {
    h && (P.current === n ? (M.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var H;
      return (H = C.current) == null ? void 0 : H.focus();
    }), f(null)) : M.setHighlighted(-1, "keyboard"));
  }, [h]), Yi(h, be), Vi(h, M, le, C, !x, X), ce(() => {
    if (!y || !h) return;
    const H = k.current, L = (H == null ? void 0 : H.closest("[data-submenu-panel]")) ?? (H == null ? void 0 : H.closest('[role="menu"]'));
    if (L)
      return L.dataset.submenuOpen = "accordion", () => {
        delete L.dataset.submenuOpen;
      };
  }, [y, h]);
  const [$, q] = se(null);
  rt(() => {
    if (!h || !ze || y) {
      q(null);
      return;
    }
    const H = k.current, L = H == null ? void 0 : H.closest('[role="menu"]');
    if (!H || !L) return;
    S.current = L;
    const Y = H.getBoundingClientRect(), Re = L.getBoundingClientRect(), ve = parseInt(getComputedStyle(L).zIndex, 10) || 0;
    q({
      presentation: "replace",
      sideOffset: Re.left - Y.right,
      alignOffset: Re.top - Y.top,
      width: Re.width,
      childZ: ve + 2
    }), L.dataset.submenuOpen = "replace", C.current && Hn(c) && (C.current.style.visibility = "hidden");
    const ft = window.setTimeout(() => {
      L.isConnected && (L.dataset.submenuInert = "replace");
    }, 320);
    return () => {
      window.clearTimeout(ft), delete L.dataset.submenuOpen, delete L.dataset.submenuInert, S.current === L && (S.current = null);
    };
  }, [h, m]), rt(() => {
    if (!h || !b || !$ || !Z || !Hn(c)) return;
    const H = C.current, L = S.current;
    if (!H || !L) return;
    H.style.visibility = "hidden";
    let Y = 0, Re = 0;
    return Y = requestAnimationFrame(() => {
      Re = requestAnimationFrame(() => {
        if (!H.isConnected || !L.isConnected) return;
        const ve = L.getBoundingClientRect();
        !ve.width || !ve.height || (H.style.visibility = "visible", Pr(B, H, ve));
      });
    }), () => {
      cancelAnimationFrame(Y), cancelAnimationFrame(Re);
    };
  }, [h, b, $, Z]), Xe.useLayoutEffect(() => {
    var L;
    if (!h || M.highlightedIndex < 0 || M.pointerDriven) return;
    const H = (L = C.current) == null ? void 0 : L.querySelector(`[data-ei="${M.highlightedIndex}"]`);
    an(H, "nearest", C.current);
  }, [h, M.highlightedIndex, M.pointerDriven]);
  const Ce = v(null), Ne = ae((H) => {
    var L;
    if (H) {
      H.addEventListener("keydown", le.current, { capture: !0 }), H.addEventListener("wheel", be.current, { passive: !1 });
      const Y = H.ownerDocument;
      Ce.current = Y, Y.addEventListener("keydown", X.current, { capture: !0 });
    } else
      (L = Ce.current) == null || L.removeEventListener("keydown", X.current, { capture: !0 }), Ce.current = null;
    C.current = H, te(!!H), xe(H);
  }, [xe]), Fe = Je(), oe = { padding: `${_(8, 12, Fe)}px ${_(12, 16, Fe)}px`, fontSize: _(12, 14, Fe) }, Se = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${J ? " ui-item-highlighted" : ""}${U ? " ui-sub-closing" : ""}`, Ee = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ R(_e.Sub, { open: h || W, onOpenChange: (H) => u((L) => {
    if (!H) {
      const Y = L.indexOf(n);
      return Y >= 0 ? L.slice(0, Y) : L;
    }
    return L.includes(n) ? L : [...L, n];
  }), children: [
    /* @__PURE__ */ R(
      _e.SubTrigger,
      {
        ref: k,
        "data-ei": ee >= 0 ? ee : void 0,
        "data-submenu-header": ze ? "true" : void 0,
        style: oe,
        className: Se,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          D && ee >= 0 && D.setHighlighted(ee, "pointer");
        },
        onPointerDown: (H) => {
          H.pointerType === "pen" ? (H.preventDefault(), u((L) => h ? L.slice(0, L.indexOf(n)) : [...L, n])) : b && H.pointerType === "touch" && (N.current = { x: H.clientX, y: H.clientY });
        },
        onPointerUp: (H) => {
          if (!b || H.pointerType !== "touch") return;
          const L = N.current;
          N.current = null, !(!L || h) && (Math.hypot(H.clientX - L.x, H.clientY - L.y) > 8 || (f(null), ke(H.clientX, H.clientY), u((Y) => Y.includes(n) ? Y : [...Y, n])));
        },
        onPointerCancel: () => {
          N.current = null;
        },
        onClick: (H) => {
          if (ps(H.currentTarget, H)) {
            H.preventDefault();
            return;
          }
          !y || !h || (H.preventDefault(), H.stopPropagation(), ue());
        },
        children: [
          i === "left" && /* @__PURE__ */ p(Dr, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ p("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ p(Dr, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    y && h && /* The accordion body: rendered INLINE in the parent card, below the
    reordered header row. No portal, no positioning — the card simply
    grows and the panel fades/slides in. */
    /* @__PURE__ */ p("div", { "data-submenu-panel": !0, className: "ui-submenu-panel", children: o }),
    !y && /* @__PURE__ */ p(_e.Portal, { container: w ?? void 0, children: /* @__PURE__ */ p(
      _e.SubContent,
      {
        ref: Ne,
        ...O,
        "data-submenu-presentation": $ == null ? void 0 : $.presentation,
        className: Ee,
        align: $ ? "start" : void 0,
        sideOffset: $ ? $.sideOffset : 8,
        alignOffset: $ ? $.alignOffset : -4,
        collisionPadding: 8,
        style: $ ? { width: $.width, zIndex: $.childZ } : void 0,
        onPointerLeave: M.pointerLeave,
        onFocusOutside: (H) => {
          const L = H.target;
          L != null && L.closest('[role="menu"], [data-radix-menu-content], [data-radix-popper-content-wrapper]') && H.preventDefault();
        },
        children: /* @__PURE__ */ R(pr.Provider, { value: M, children: [
          $ && /* Back is a NORMAL menu item (same row height/padding as every
          other row), pinned above the scrolling list with the standard
          divider beneath it. It names the immediate parent. */
          /* @__PURE__ */ p(
            "div",
            {
              "data-submenu-back": !0,
              className: "sticky -top-1 z-10 -mx-1 -mt-1 mb-1 shrink-0 border-b border-[color:var(--ui-sep)] bg-[var(--ui-menu-bg)]",
              children: /* @__PURE__ */ p(
                Is,
                {
                  keepOpen: !0,
                  onClick: ue,
                  icon: /* @__PURE__ */ p(Go, { className: "h-3.5 w-3.5 shrink-0" }),
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
const $n = 8, _h = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, label: s = "Context menu", theme: l, morph: a = !0 }) => {
  const u = Ot(), c = l ? { theme: l, attrs: { "data-theme": l } } : u ? xs(void 0, u) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: d } = c, f = Je(), h = _(12, 14, f), m = v(null), y = hr(), [b, x] = se(!1), [O, w] = se([]), [k, C] = se(null), S = Zr();
  ce(() => {
    if (n)
      return S.setHighlighted(-1, "keyboard"), gs(r);
  }, [n, r]);
  const B = v({ left: e, top: t });
  n && (B.current = { left: e, top: t });
  const K = ae(() => ({ left: B.current.left, top: B.current.top, width: 0, height: 0 }), []), N = Xr({
    visible: !0,
    morph: a,
    anchor: K,
    cloneOnUnmount: !0
  }), W = v(() => {
  }), I = v(() => {
  }), Z = v(() => {
  });
  Ji(n, S, W), rt(() => {
    if (!n || S.highlightedIndex < 0 || S.pointerDriven) return;
    const ue = m.current;
    an(
      ue == null ? void 0 : ue.querySelector(`[data-ei="${S.highlightedIndex}"]`),
      "nearest",
      ue
    );
  }, [n, S.highlightedIndex, S.pointerDriven]), Yi(n, I), Vi(n, S, W, m, O.length > 0, Z);
  const te = v(null), U = ae((ue) => {
    var M;
    if (ue) {
      ue.addEventListener("keydown", W.current, { capture: !0 }), ue.addEventListener("wheel", I.current, { passive: !1 });
      const D = ue.ownerDocument;
      te.current = D, D.addEventListener("keydown", Z.current, { capture: !0 });
    } else
      (M = te.current) == null || M.removeEventListener("keydown", Z.current, { capture: !0 }), te.current = null;
    m.current = ue, x(!!ue), N(ue);
  }, [N]), [re, ke] = se(null);
  return rt(() => {
    var $;
    if (!n || !b || !m.current) return;
    const ue = m.current, M = ue.offsetWidth, D = ue.offsetHeight, F = y ?? null, E = F ? cs(F) : { x: 0, y: 0, width: 0, height: 0 }, ee = F ? us(F.document) : { left: 0, right: 0, top: 0, bottom: 0 }, J = ($ = o == null ? void 0 : o.current) == null ? void 0 : $.getBoundingClientRect(), ge = (J ? J.right : E.x + E.width) - ee.right, xe = (J ? J.bottom : E.y + E.height) - ee.bottom, le = (J ? J.left : E.x) + ee.left, be = (J ? J.top : E.y) + ee.top;
    let X = Math.max(be + $n, B.current.top), P = Math.max(le + $n, B.current.left);
    P + M > ge && (P = Math.max(le + $n, ge - M - $n)), X + D > xe && (X = Math.max(be + $n, xe - D - $n)), ke({ left: P, top: X });
  }, [n, b, e, t, o]), n ? /* @__PURE__ */ R(_e.Root, { open: n, onOpenChange: (ue) => {
    ue || r();
  }, modal: !1, children: [
    /* @__PURE__ */ p(_e.Trigger, { asChild: !0, children: /* @__PURE__ */ p("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ p(_e.Portal, { children: /* @__PURE__ */ p(_i.Provider, { value: d, children: /* @__PURE__ */ p(ji.Provider, { value: c.attrs, children: /* @__PURE__ */ p(qi.Provider, { value: { chain: O, setChain: w, morph: a, keyboardOpened: k, setKeyboardOpened: C }, children: /* @__PURE__ */ p(pr.Provider, { value: S, children: /* @__PURE__ */ p(
      _e.Content,
      {
        ref: U,
        ...c.attrs,
        "aria-label": s,
        "aria-labelledby": void 0,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: {
          fontSize: h,
          left: (re == null ? void 0 : re.left) ?? B.current.left,
          top: (re == null ? void 0 : re.top) ?? B.current.top,
          touchAction: "manipulation"
        },
        onPointerLeave: S.pointerLeave,
        children: i
      }
    ) }) }) }) }) })
  ] }) : null;
}, jh = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Je(), a = { padding: `${_(8, 12, l)}px ${_(12, 16, l)}px`, fontSize: _(12, 14, l) }, u = Ki(), c = v(u);
  c.current = u;
  const d = v(null), f = ms();
  ce(() => {
    var b;
    const y = { label: Es(s), activate: () => {
      r || n();
    } };
    return d.current = y, (b = c.current) == null ? void 0 : b.register(y);
  }, []);
  const h = u && d.current ? u.items.indexOf(d.current) : -1, m = !r && h >= 0 && h === u.highlightedIndex;
  return /* @__PURE__ */ R(
    _e.Item,
    {
      "data-ei": h >= 0 ? h : void 0,
      onClick: (y) => {
        if (!r) {
          if (f.takeGhost()) {
            y.preventDefault();
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
}, Wh = () => /* @__PURE__ */ p(_e.Separator, { className: "ui-sep my-1" }), qh = (n) => /* @__PURE__ */ p(lc, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Oe = 8, $s = "[data-modal-stack]", Ar = 0.94;
function Dn() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function hn(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function ac(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Ar})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Tt}ms ${bn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Tt + 60));
    });
  });
}
function yo(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Ar, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Ar, height: i.height * Ar };
  e.style.transition = `transform ${Tt}ms ${bn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ss(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, Tt + 60);
}
function ci(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches($s) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function br(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches($s) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function cc({
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
  const y = Ot(), b = Fi(
    { mode: f, accent: m, surface: h, context: "surface" },
    y
  ), x = b.mode, O = b.surface, w = b.accent, k = v(null), C = v(null), S = v(null), B = Je(), K = _(20, 24, B), N = _(10, 12, B), W = _(12, 14, B), I = _(14, 16, B), Z = _(20, 24, B), te = _(20, 24, B), U = _(20, 24, B), re = _(14, 16, B), ke = _(16, 20, B), ue = _(10, 12, B), M = _(12, 14, B), D = _(8, 10, B), F = _(4, 6, B), E = { padding: `${N}px ${K}px` }, ee = { fontSize: W }, J = { padding: `${te}px ${Z}px 16px ${Z}px` }, ge = { fontSize: I }, xe = { padding: `0 ${Z}px 16px` }, le = { padding: `${U}px ${Z}px` }, be = { fontSize: ue, padding: `${F}px ${D}px` }, [X, P] = se(!1), $ = ae((T) => {
    k.current = T, P(T !== null);
  }, []), q = Yn(), Ce = hr(), Ne = v(Ce);
  Ne.current = Ce;
  const [Fe, oe] = se(null), Se = v(null), Ee = v(!1), H = v(!1), L = v(0), Y = v({ w: 0, h: 0 }), Re = v(!1), [ve, ft] = se(!1), [Me, Ye] = se(!1), je = v(0), Le = v(!1), [it, un] = se(!1), jt = v(a);
  jt.current = a;
  const Ct = v(!1), gt = v(!1), Ie = () => {
    gt.current = !0, ft(!0);
  }, ct = () => {
    gt.current = !1, ft(!1);
  };
  ce(() => {
    n || (oe(null), Re.current = !1, Ee.current = !1, Ye(!1));
  }, [n]), rt(() => {
    if (!n || Re.current || !X || !k.current) return;
    Re.current = !0;
    const T = k.current.getBoundingClientRect(), ne = Ne.current ?? null, fe = (ne == null ? void 0 : ne.innerWidth) ?? 0, we = hn(ne);
    oe({
      left: Math.max(Oe, Math.min((fe - T.width) / 2, fe - T.width - Oe)),
      top: Math.max(we.top + Oe, Math.min(we.top + (we.height - T.height) / 2, we.bottom - T.height - Oe))
    });
  }, [n, X]), rt(() => {
    if (!n || !X || !a || Dn() || !k.current) return;
    const T = k.current, ne = ci(T), fe = ne[ne.length - 1];
    Ie(), fe ? Pr(je, T, fe.getBoundingClientRect(), ct) : ac(je, T, ct);
  }, [n, X]);
  const bt = ae(() => {
    if (!c || Le.current) return;
    const T = k.current, ne = !!T && ci(T).length > 0;
    if (!T || !a || Dn() || ne) {
      e();
      return;
    }
    Le.current = !0, un(!0), Ct.current = !0, Ie(), yo(je, T, () => {
      Le.current = !1, un(!1), ct(), e();
    });
  }, [a, e, c]), vt = ae(() => {
    const T = k.current;
    if (!T || Ct.current || !jt.current || Dn() || ci(T).length > 0) return;
    const ne = T.ownerDocument, fe = T.cloneNode(!0);
    fe.removeAttribute("data-modal-stack"), fe.removeAttribute("data-state"), fe.removeAttribute("role"), fe.removeAttribute("data-aria-hidden"), fe.removeAttribute("tabindex"), fe.setAttribute("aria-hidden", "true"), fe.style.pointerEvents = "none", ne.body.appendChild(fe), yo({ current: 0 }, fe, () => {
      fe.isConnected && fe.remove();
    });
  }, []);
  rt(() => () => vt(), [vt]);
  const wt = v(n);
  rt(() => {
    const T = wt.current;
    wt.current = n, T && !n && vt();
  }, [n, X, vt]), ce(() => {
    if (!n || !X || !a || !k.current) return;
    const T = k.current, ne = T.parentNode;
    if (!ne) return;
    let fe = 0, we = null, pe = !1;
    const $e = () => {
      fe = 0;
      const Pe = br(T);
      if (Pe.length > 0)
        T.style.opacity = "", T.style.pointerEvents = "", we = Pe[Pe.length - 1].getBoundingClientRect(), pe = !0, fe = requestAnimationFrame($e);
      else if (pe) {
        pe = !1, we && !Dn() && (Ie(), Pr(je, T, we, ct)), we = null;
        const Ge = Ne.current ?? null;
        Ge == null || Ge.setTimeout(() => {
          !T || !T.isConnected || getComputedStyle(T).opacity !== "1" && (T.style.opacity = "1", T.style.pointerEvents = "");
        }, 240);
      }
    }, Be = new MutationObserver(() => {
      !fe && br(T).length > 0 && (fe = requestAnimationFrame($e));
    });
    return Be.observe(ne, { childList: !0 }), () => {
      Be.disconnect(), fe && cancelAnimationFrame(fe);
    };
  }, [n, X]), ce(() => {
    if (!X || !a || Dn() || !k.current) return;
    const T = k.current;
    let ne = Math.round(T.getBoundingClientRect().height), fe = !1;
    const we = new ResizeObserver(() => {
      if (!T.isConnected) return;
      const pe = Math.round(T.getBoundingClientRect().height);
      if (!fe) {
        fe = !0, ne = pe;
        return;
      }
      if (Math.abs(pe - ne) < 1) return;
      if (Se.current || Le.current || br(T).length > 0) {
        ne = pe;
        return;
      }
      if (gt.current) return;
      const $e = ne;
      ne = pe, Ie();
      const Be = T.getBoundingClientRect(), Pe = hn(Ne.current ?? null), Ge = !Ee.current && !H.current, Qe = Ge ? Pe.top + (Pe.height - $e) / 2 : Be.top, Ke = Ge ? Pe.top + (Pe.height - pe) / 2 : Be.top;
      T.style.transition = "none", T.style.height = `${$e}px`, Ge && (T.style.top = `${Qe}px`), C.current && (C.current.style.overflow = "hidden"), T.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          T.style.height === `${$e}px` && (T.style.transition = `height ${Tt}ms ${bn}${Ge ? `, top ${Tt}ms ${bn}` : ""}`, T.style.height = `${pe}px`, Ge && (T.style.top = `${Ke}px`), window.setTimeout(() => {
            T.style.height === `${pe}px` && (T.style.transition = "", T.style.height = "", C.current && (C.current.style.overflow = ""), Ge && oe({ left: Be.left, top: Ke }), ct());
          }, Tt + 60));
        });
      });
    });
    return we.observe(T), () => we.disconnect();
  }, [X]), ce(() => {
    if (!X || !k.current || a && !Dn()) return;
    const T = k.current, ne = new ResizeObserver(() => {
      if (!T.isConnected || Se.current || Le.current || H.current || br(T).length > 0) return;
      const fe = Ne.current ?? null, we = hn(fe), pe = (fe == null ? void 0 : fe.innerWidth) ?? 0, $e = T.getBoundingClientRect(), Be = Math.max(we.top + Oe, Math.min($e.top, we.bottom - $e.height - Oe)), Pe = Math.max(Oe, Math.min($e.left, pe - $e.width - Oe));
      (Math.abs(Be - $e.top) > 0.5 || Math.abs(Pe - $e.left) > 0.5) && oe({ left: Pe, top: Be });
    });
    return ne.observe(T), () => ne.disconnect();
  }, [X, a]);
  const We = ae(() => {
    const T = k.current;
    if (!T) return null;
    const ne = T.getBoundingClientRect();
    return { left: ne.left, top: ne.top, width: ne.width, height: ne.height };
  }, []), ht = ae((T, ne) => {
    const fe = Ne.current ?? null, we = (fe == null ? void 0 : fe.innerWidth) ?? 0, pe = hn(fe), $e = We(), Be = $e ? $e.width : Math.min(we - Oe * 2, 576), Pe = $e ? $e.height : Math.min(pe.height - Oe * 2, 400);
    return {
      left: Math.max(Oe, Math.min(T, we - Be - Oe)),
      top: Math.max(pe.top + Oe, Math.min(ne, pe.bottom - Pe - Oe))
    };
  }, [We]);
  ce(() => {
    if (!n) return;
    const T = Ne.current ?? null, ne = (T == null ? void 0 : T.visualViewport) ?? null;
    if (!T || !ne) return;
    const fe = 120;
    H.current = !1, Y.current = { w: T.innerWidth, h: T.innerHeight };
    let we = 0;
    const pe = () => {
      if (Le.current || Se.current) return;
      const Be = (T == null ? void 0 : T.innerHeight) ?? 0, Pe = (T == null ? void 0 : T.innerWidth) ?? 0, Qe = hn(T).height < Be - fe, Ke = Be < Y.current.h - fe && Pe === Y.current.w;
      Qe || Ke ? (H.current = !0, L.current && (clearTimeout(L.current), L.current = 0)) : L.current || (L.current = (T == null ? void 0 : T.setTimeout(() => {
        H.current = !1, L.current = 0, Ye(!1);
      }, 600)) ?? 0), Ye(H.current), !we && (we = requestAnimationFrame(() => {
        var De;
        we = 0;
        const Ut = k.current;
        if (!Ut) return;
        const Ve = hn(Ne.current ?? null), It = Ut.getBoundingClientRect(), nn = ((De = Ne.current) == null ? void 0 : De.innerWidth) ?? 0, tt = (T == null ? void 0 : T.innerHeight) ?? 0, wn = Ve.height < tt - fe || tt < Y.current.h - fe && (T == null ? void 0 : T.innerWidth) === Y.current.w;
        Y.current = { w: (T == null ? void 0 : T.innerWidth) ?? 0, h: tt };
        const Wt = It.top >= Ve.top + Oe && It.bottom <= Ve.bottom - Oe, dn = () => {
          oe({
            left: Math.max(Oe, Math.min((nn - It.width) / 2, nn - It.width - Oe)),
            top: Math.max(Ve.top + Oe, Math.min(Ve.top + (Ve.height - It.height) / 2, Ve.bottom - It.height - Oe))
          });
        };
        if (wn && !ze) {
          if (Ee.current) {
            Wt || oe(ht(It.left, It.top));
            return;
          }
          if (Wt) return;
          dn();
          return;
        }
        if (!H.current) {
          if (Ee.current) {
            Wt || oe(ht(It.left, It.top));
            return;
          }
          Wt || dn();
        }
      }));
    };
    ne.addEventListener("resize", pe), ne.addEventListener("scroll", pe);
    const $e = () => {
      Le.current || Se.current || we || (we = requestAnimationFrame(() => {
        we = 0;
        const Be = k.current;
        if (!Be) return;
        const Pe = Ne.current ?? null, Ge = hn(Pe), Qe = (Pe == null ? void 0 : Pe.innerWidth) ?? 0, Ke = Be.getBoundingClientRect();
        if (Ee.current) {
          oe(ht(Ke.left, Ke.top));
          return;
        }
        oe({
          left: Math.max(Oe, Math.min((Qe - Ke.width) / 2, Qe - Ke.width - Oe)),
          top: Math.max(Ge.top + Oe, Math.min(Ge.top + (Ge.height - Ke.height) / 2, Ge.bottom - Ke.height - Oe))
        });
      }));
    };
    return T.addEventListener("orientationchange", $e), () => {
      ne.removeEventListener("resize", pe), ne.removeEventListener("scroll", pe), T.removeEventListener("orientationchange", $e), we && cancelAnimationFrame(we), L.current && clearTimeout(L.current);
    };
  }, [n, ht]);
  const yt = ae((T) => {
    if (T.target.closest("button")) return;
    Ee.current = !0;
    const ne = We();
    ne && (oe(ht(ne.left, ne.top)), Se.current = { startX: T.clientX, startY: T.clientY, posX: ne.left, posY: ne.top }, T.target.setPointerCapture(T.pointerId));
  }, [We, ht]), tn = ae((T) => {
    const ne = Se.current;
    ne && (T.preventDefault(), oe(ht(ne.posX + T.clientX - ne.startX, ne.posY + T.clientY - ne.startY)));
  }, [ht]), ut = ae(() => {
    Se.current = null;
  }, []), $t = Se.current !== null, Dt = ae(() => {
    Ee.current = !1;
    const T = Ne.current ?? null, ne = hn(T), fe = (T == null ? void 0 : T.innerWidth) ?? 0, we = k.current, pe = we ? we.getBoundingClientRect() : { width: 0, height: 0 };
    oe({
      left: Math.max(Oe, Math.min((fe - pe.width) / 2, fe - pe.width - Oe)),
      top: Math.max(ne.top + Oe, Math.min(ne.top + (ne.height - pe.height) / 2, ne.bottom - pe.height - Oe))
    });
  }, []), A = v(0), G = ae(() => {
    const T = Date.now();
    T - A.current < 300 ? (A.current = 0, Dt()) : A.current = T;
  }, [Dt]), ye = Fe !== null, qe = ye ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ot = `${i ? `${i} w-full` : "max-w-xl w-full"}`, Et = {
    ...ye ? { left: Fe.left, top: Fe.top } : {},
    width: `min(100%, calc(100dvw - ${Oe * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Me ? {} : { maxHeight: `calc(100dvh - ${Oe * 2}px)` }
  }, Rt = ae((T) => {
    if (T.key !== "Enter" || T.shiftKey || T.metaKey || T.ctrlKey || T.altKey) return;
    const ne = T.target, fe = S.current;
    if (!(!!ne.closest("[data-modal-close]") || !!fe && fe.contains(ne) && !!ne.closest('button, a, [role="button"]')) && ne.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !fe) return;
    const pe = Array.from(fe.querySelectorAll("button[data-modal-confirm]")), $e = pe.length > 0 ? pe : Array.from(fe.querySelectorAll("button")), Be = $e[$e.length - 1];
    !Be || Be.disabled || (T.preventDefault(), Be.click());
  }, []);
  return /* @__PURE__ */ p(Bi, { theme: b, children: /* @__PURE__ */ p(fn.Root, { open: n, onOpenChange: (T) => {
    T || bt();
  }, children: /* @__PURE__ */ R(fn.Portal, { container: q ?? void 0, children: [
    /* @__PURE__ */ p(
      fn.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${it ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (T) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (T.preventDefault(), d && bt());
        }
      }
    ),
    /* @__PURE__ */ R(
      fn.Content,
      {
        ref: $,
        onKeyDown: Rt,
        onInteractOutside: (T) => {
          d || T.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": w,
        "data-surface": O,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${qe} ${ot}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(Et).length > 0 ? Et : {} },
        children: [
          u ? /* @__PURE__ */ R(
            "div",
            {
              style: J,
              className: `flex items-center justify-between ${$t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (T) => {
                ve || yt(T);
              },
              onPointerMove: tn,
              onPointerUp: ut,
              onClick: G,
              children: [
                /* @__PURE__ */ p(fn.Title, { style: ge, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                c && /* @__PURE__ */ p(fn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Cn, { style: { width: ke, height: ke } }) })
              ]
            }
          ) : /* @__PURE__ */ R(
            "div",
            {
              style: E,
              className: `ui-modal-header flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${$t ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (T) => {
                ve || yt(T);
              },
              onPointerMove: tn,
              onPointerUp: ut,
              onClick: G,
              children: [
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ p(fn.Title, { style: ee, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ R("button", { onClick: l, style: be, className: "cursor-pointer flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ p(Xo, { style: { width: M, height: M } }),
                    "Reset"
                  ] }),
                  c && /* @__PURE__ */ p(fn.Close, { "data-modal-close": !0, className: "cursor-pointer text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(Cn, { style: { width: re, height: re } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p("div", { ref: C, "data-testid": "modal-body", style: u ? xe : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ p("div", { ref: S, style: u ? le : void 0, className: u ? "" : "shrink-0", children: u ? /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function Kh({ children: n }) {
  const e = Je(), t = _(20, 24, e), r = _(8, 12, e);
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const uc = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", dc = {
  zinc: "bg-[var(--ui-btn-solid-bg)] text-[color:var(--ui-btn-solid-text)] font-semibold border border-[color:var(--ui-btn-solid-border)] hover:bg-[var(--ui-btn-solid-hover-bg)] hover:border-[color:var(--ui-btn-solid-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, fc = {
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
  const o = yn({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ p(
    "button",
    {
      type: r,
      style: o,
      className: `${uc} ${n === "hero" ? dc[e] : fc[n]} ${t}`,
      ...i
    }
  );
}
function zr(n = "md") {
  const e = ze && ts() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-1.5 text-xs"} ui-input`;
}
function Ds(n = "md") {
  return n === "sm" ? yn({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : yn({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Ls = Zt(null);
function Jh() {
  const n = en(Ls);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Vh({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = se(null), [s, l] = se(!1), a = v(null), u = Je(), c = _(16, 20, u), d = _(12, 14, u), f = Ds(), h = v(i);
  h.current = i;
  const m = ae(() => {
    const C = h.current;
    C && (C.kind === "confirm" ? C.resolve(!1) : C.kind === "prompt" ? C.resolve(null) : C.resolve());
  }, []), y = ae((C) => {
    if (C.suppressKey) {
      const S = localStorage.getItem(C.suppressKey);
      if (S && Date.now() < parseInt(S, 10))
        return Promise.resolve(!0);
    }
    return new Promise((S) => {
      m(), l(!1), o({ kind: "confirm", options: C, resolve: S });
    });
  }, [m]), b = ae((C) => new Promise((S) => {
    m(), o({ kind: "prompt", options: C, resolve: S });
  }), [m]), x = ae((C) => new Promise((S) => {
    m(), o({ kind: "alert", options: C, resolve: S });
  }), [m]);
  ce(() => {
    if (i) {
      const C = setTimeout(() => {
        var S;
        return (S = a.current) == null ? void 0 : S.focus();
      }, 50);
      return () => clearTimeout(C);
    }
  }, [i]);
  const O = ae(() => {
    var C, S;
    if (i) {
      if (i.kind === "confirm") {
        const B = i.options;
        B.suppressKey && s && localStorage.setItem(B.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((S = (C = a.current) == null ? void 0 : C.value) == null ? void 0 : S.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), w = i !== null;
  ce(() => {
    if (!w) return;
    const C = (S) => {
      S.key !== "Enter" || S.shiftKey || S.metaKey || S.ctrlKey || S.altKey || (S.preventDefault(), S.stopImmediatePropagation(), !Vt(S) && O());
    };
    return document.addEventListener("keydown", C, !0), () => document.removeEventListener("keydown", C, !0);
  }, [w, O]);
  const k = ae(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ R(Ls.Provider, { value: { confirm: y, prompt: b, alert: x }, children: [
    n,
    w && /* @__PURE__ */ p(
      cc,
      {
        open: !0,
        onClose: k,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ R(dt, { children: [
          i.kind !== "alert" && /* @__PURE__ */ p(vr, { variant: "ghost", onClick: k, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ p(vr, { onClick: O, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ p(
            vr,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: O,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ p(vr, { "data-modal-confirm": !0, onClick: O, children: "Save" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "flex flex-col", style: { gap: c }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ p("p", { style: { fontSize: d }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ p(
            Ja,
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
const hc = 500, pc = 250, mc = 5, Ft = 88, xo = 4;
function gc(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function yc({ x: n, y: e, ms: t }) {
  const r = v(null), i = Yn();
  return ce(() => {
    r.current && gc(r.current, t);
  }, [t]), Yr(
    /* @__PURE__ */ p(
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
        children: /* @__PURE__ */ R("svg", { ref: r, width: Ft, height: Ft, viewBox: `0 0 ${Ft} ${Ft}`, children: [
          /* @__PURE__ */ p(
            "circle",
            {
              cx: Ft / 2,
              cy: Ft / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: xo + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ p(
            "circle",
            {
              cx: Ft / 2,
              cy: Ft / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: xo,
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
function Yh() {
  return { "data-no-longpress": "true" };
}
function xc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Uh({
  children: n,
  showRing: e = !0,
  longPressMs: t = hc,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = se(null), a = Li(), u = v(null), c = v(null), d = v({ x: 0, y: 0, target: null }), f = v(!1), h = Math.min(pc, t * 0.5), m = v(i);
  m.current = i;
  const y = v(o);
  return y.current = o, ce(() => {
    if (!ze || !a) return;
    const b = (k) => {
      if (!wi(k.pointerType) || k.button !== 0) return;
      const C = k.target;
      if (!C.closest(r) || (m.current ? !m.current(C) : xc(C))) return;
      const S = k.clientX, B = k.clientY;
      d.current = { x: S, y: B, target: k.target }, f.current = !0, e && (c.current = setTimeout(() => l({ x: S, y: B }), h)), u.current = setTimeout(() => {
        if (!f.current) return;
        c.current && (clearTimeout(c.current), c.current = null), l(null);
        const K = d.current.target;
        if (!K) return;
        const N = y.current;
        if (N) {
          N(K, S, B);
          return;
        }
        const W = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: S,
          clientY: B,
          button: 2,
          view: window
        });
        K.dispatchEvent(W);
      }, t);
    }, x = (k) => {
      if (!f.current || u.current === null) return;
      const C = k.clientX - d.current.x, S = k.clientY - d.current.y;
      Math.sqrt(C * C + S * S) > mc && (clearTimeout(u.current), u.current = null, c.current && (clearTimeout(c.current), c.current = null), f.current = !1, l(null));
    }, O = () => {
      u.current !== null && (clearTimeout(u.current), u.current = null), c.current !== null && (clearTimeout(c.current), c.current = null), f.current = !1, l(null);
    }, w = (k) => {
      wi(k.pointerType) && (u.current !== null && (clearTimeout(u.current), u.current = null), c.current !== null && (clearTimeout(c.current), c.current = null), f.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", b), a.addEventListener("pointermove", x), a.addEventListener("pointerup", O), a.addEventListener("pointercancel", O), a.addEventListener("pointerleave", w), () => {
      a.removeEventListener("pointerdown", b), a.removeEventListener("pointermove", x), a.removeEventListener("pointerup", O), a == null || a.removeEventListener("pointercancel", O), a == null || a.removeEventListener("pointerleave", w), u.current !== null && clearTimeout(u.current), c.current !== null && clearTimeout(c.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ R(dt, { children: [
    n,
    e && s && /* @__PURE__ */ p(yc, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function Xh() {
  const n = Ia();
  return Ra ? n === null || wi(n) : !1;
}
const bc = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, vc = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, wc = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Gh({
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
        ...e ? wc : n ? vc : bc,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const kc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Sc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ui = 1900, di = 2100;
function Nc(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Tc(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Qh({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = Ot(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), u = (() => {
    if (!o) return a;
    const $ = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN($.getTime()) ? a : $;
  })(), [c, d] = se(u.getFullYear()), [f, h] = se(u.getMonth()), [m, y] = se("days"), [b, x] = se(null), O = lt(() => new Set(n), [n]), w = ($) => {
    O.has($) ? e(n.filter((q) => q !== $)) : e([...n, $]);
  }, k = lt(() => {
    const $ = Nc(c, f), q = new Date(c, f, 1).getDay(), Ce = [];
    for (let Ne = 0; Ne < q; Ne++) Ce.push({ key: `pad-${Ne}`, day: 0, empty: !0 });
    for (let Ne = 1; Ne <= $; Ne++) Ce.push({ key: Tc(c, f, Ne), day: Ne, empty: !1 });
    return Ce;
  }, [c, f]), C = ($) => d((q) => Math.max(ui, Math.min(di, q + $))), S = ($) => {
    f + $ < 0 ? (d((q) => Math.max(ui, q - 1)), h(11)) : f + $ > 11 ? (d((q) => Math.min(di, q + 1)), h(0)) : h((q) => q + $);
  }, B = () => {
    if (b === null) return;
    const $ = parseInt(b, 10);
    !isNaN($) && $ >= ui && $ <= di && d($), x(null);
  }, K = ($) => n.some((q) => q.startsWith(`${c}-${String($ + 1).padStart(2, "0")}`)), N = Je(), W = _(4, 8, N), I = _(16, 20, N), Z = _(10, 11, N), te = _(6, 8, N), U = _(12, 14, N), re = _(6, 10, N), ke = _(12, 14, N), ue = _(8, 12, N), M = _(10, 12, N), D = _(6, 10, N), F = _(2, 6, N), E = _(64, 80, N), ee = { padding: W }, J = { width: I, height: I }, ge = { fontSize: Z, paddingTop: te, paddingBottom: te }, xe = { fontSize: U, paddingTop: re, paddingBottom: re }, le = { fontSize: ke, paddingTop: ue, paddingBottom: ue }, be = { fontSize: M, padding: `${F}px ${D}px` }, X = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", P = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ R("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ R("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? C(-1) : S(-1),
          style: ee,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ p(Go, { style: J })
        }
      ),
      m === "days" ? /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => y("months"),
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
          onChange: ($) => x($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: B,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), B()), $.key === "Escape" && x(null);
          },
          style: { width: E },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? C(1) : S(1),
          style: ee,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ p(Dr, { style: J })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-3 text-center", children: Sc.map(($, q) => /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: () => {
            h(q), y("days");
          },
          style: le,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${q === f ? X : P}`,
          children: [
            $,
            K(q) && /* @__PURE__ */ p("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${q === f ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ p("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => {
            d(a.getFullYear()), h(a.getMonth()), y("days");
          },
          style: { paddingTop: re, paddingBottom: re, fontSize: U },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ R("div", { className: "grid grid-cols-7 text-center", children: [
      kc.map(($) => /* @__PURE__ */ p("div", { style: ge, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: $ }, $)),
      k.map(($) => $.empty ? /* @__PURE__ */ p("div", {}, $.key) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => w($.key),
          style: xe,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${O.has($.key) ? X : P}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ R("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ R("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ p("div", { className: "flex flex-wrap gap-1", children: n.map(($) => {
        const q = /* @__PURE__ */ new Date($ + "T00:00:00"), Ce = q.getFullYear() === a.getFullYear() ? q.toLocaleString("default", { month: "short", day: "numeric" }) : q.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ R(
          "button",
          {
            type: "button",
            onClick: () => w($),
            "aria-label": `Remove ${Ce}`,
            style: be,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Ce,
              /* @__PURE__ */ p("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function Zh({
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
  const h = (k) => e instanceof Set ? e.has(k) : e.includes(k), m = Je(), y = _(12, 16, m), b = _(8, 12, m), x = _(12, 14, m), O = _(16, 20, m), w = r != null || i != null;
  return /* @__PURE__ */ R("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    w && /* @__PURE__ */ R("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ p("button", { type: "button", disabled: u, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((k) => {
            const C = h(k.id), S = /* @__PURE__ */ p(Hi, { checked: C, size: O });
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => t(k.id),
                "aria-pressed": C,
                className: `ui-checklist-item ${C ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${b}px ${y}px`, fontSize: x },
                ...k.dataProps,
                children: [
                  c === "leading" && S,
                  k.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: k.secondary }),
                  c === "trailing" && /* @__PURE__ */ p("span", { className: "ml-auto flex shrink-0", children: S })
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
function ep({
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
  const c = Je(), d = s ? 10 : _(12, 16, c), f = s ? 6 : _(8, 12, c), h = s ? 12 : _(12, 14, c), m = s ? 14 : _(16, 20, c);
  return /* @__PURE__ */ R("div", { className: u, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ p("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((y) => {
            const b = e === y.id;
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(y.id),
                className: `ui-checklist-item ${b ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ p("span", { className: "ui-radio-circle", style: { width: m, height: m }, "aria-hidden": !0, children: b && /* @__PURE__ */ p("span", { className: "ui-radio-dot" }) }),
                  y.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: y.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: y.label }),
                  y.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: y.secondary })
                ]
              },
              y.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ p("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const tp = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = hr(), { refs: l, floatingStyles: a } = ca({
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
          var O;
          if (i !== "visible") return {};
          const c = (O = u.elements.floating.ownerDocument) == null ? void 0 : O.defaultView;
          if (!c) return {};
          const d = u.rects.reference, f = Math.max(d.x, 0), h = Math.max(d.y, 0), m = Math.min(d.x + d.width, c.innerWidth), y = Math.min(d.y + d.height, c.innerHeight);
          if (m <= f || y <= h) return {};
          const b = r === "left" ? m - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? h - d.y : r === "bottom" ? y - (d.y + d.height) : 0;
          return { x: u.x + b, y: u.y + x };
        }
      },
      Qo(o),
      Zo({ padding: 8 }),
      es({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (u) => {
          var y;
          const c = (y = u.elements.floating.ownerDocument) == null ? void 0 : y.defaultView;
          if (!c) return {};
          const d = u.rects.floating.width, f = u.rects.floating.height, h = Math.max(8, Math.min(u.x, c.innerWidth - d - 8)), m = Math.max(8, Math.min(u.y, c.innerHeight - f - 8));
          return { x: h, y: m };
        }
      }
    ],
    whileElementsMounted: ua
  });
  return rt(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ R(dt, { children: [
    !t && /* @__PURE__ */ p("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Yr(
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
}, Cc = 100;
function Ec(n, e) {
  if (!e || !Xe.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Pn = ({ content: n, children: e }) => {
  const t = Ot(), r = Je(), i = _(10, 12, r), o = _(6, 6, r), s = _(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = Yn(), u = hr(), c = $i(), [d, f] = se(!1), [h, m] = se({ x: 0, y: 0 }), [y, b] = se(!1), x = v(null), O = v(null), w = v(null), k = v(!1), C = v(!1);
  ce(() => {
    b(!0);
  }, []);
  const S = () => {
    if (!x.current) return;
    const U = x.current.getBoundingClientRect();
    m({ x: U.left + U.width / 2, y: U.top });
  }, B = () => {
    w.current && (clearTimeout(w.current), w.current = null);
  }, K = () => {
    B(), S(), f(!0);
  }, N = () => {
    B(), w.current = setTimeout(() => {
      w.current = null, !k.current && !C.current && f(!1);
    }, Cc);
  };
  ce(() => () => {
    w.current && clearTimeout(w.current);
  }, []), ce(() => (d && u && (S(), u.addEventListener("scroll", S, !0)), () => u == null ? void 0 : u.removeEventListener("scroll", S, !0)), [d]), ce(() => {
    var ke;
    if (!d) return;
    const U = ((ke = x.current) == null ? void 0 : ke.ownerDocument) ?? document, re = (ue) => {
      var D, F;
      const M = ue.target;
      M && ((D = x.current) != null && D.contains(M) || (F = O.current) != null && F.contains(M) || (k.current = !1, C.current = !1, B(), f(!1)));
    };
    return U.addEventListener("pointerdown", re, !0), () => U.removeEventListener("pointerdown", re, !0);
  }, [d]);
  const W = Ec(e, n), I = Xe.isValidElement(e) ? e.props : null, Z = n && Object.keys(W).length === 0 && !(I != null && I["aria-describedby"]) ? { "aria-describedby": c } : {}, te = Xe.isValidElement(e) ? Xe.cloneElement(e, { ...W, ...Z }) : e;
  return /* @__PURE__ */ R(
    "div",
    {
      ref: x,
      className: "inline-flex",
      onMouseEnter: () => {
        k.current = !0, K();
      },
      onMouseLeave: () => {
        k.current = !1, N();
      },
      onFocusCapture: (U) => {
        U.target !== U.currentTarget && (C.current = !0, K());
      },
      onBlurCapture: (U) => {
        U.relatedTarget && U.currentTarget.contains(U.relatedTarget) || (C.current = !1, N());
      },
      onKeyDown: (U) => {
        U.key !== "Escape" || U.defaultPrevented || (B(), k.current = !1, f(!1));
      },
      children: [
        te,
        y && Yr(
          /* @__PURE__ */ R(
            "div",
            {
              ref: O,
              id: c,
              role: "tooltip",
              hidden: !d,
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-auto",
              style: { ...l, left: h.x, top: h.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              onMouseEnter: () => {
                k.current = !0, B();
              },
              onMouseLeave: () => {
                k.current = !1, N();
              },
              children: [
                n.split(`
• `).map((U, re) => /* @__PURE__ */ p("div", { className: re > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: U }, re)),
                /* @__PURE__ */ p("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          a ?? document.body
        )
      ]
    }
  );
}, Mc = 250;
function Ac(n, e, t) {
  const [r, i] = Xe.useState(null), [o, s] = Xe.useState(!1), l = Xe.useRef(null), a = Xe.useRef(t);
  a.current = t;
  const u = Xe.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[a.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  Xe.useLayoutEffect(() => {
    u();
  }, [t, u]), Xe.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Mc), u();
    }, h = new ResizeObserver(f);
    h.observe(d);
    for (const m of e.current ?? []) m && h.observe(m);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, u]);
  const c = Xe.useMemo(
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
function ti() {
  const n = Je(), e = ze, t = e ? _(28, 40, n) : 28, r = e ? _(28, 40, n) : 28, i = e ? _(10, 14, n) : 10, o = e ? _(10, 14, n) : 10, s = e ? _(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const np = ze ? "text-xs font-semibold text-[color:var(--ui-label)] uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-[color:var(--ui-label)] uppercase tracking-wider shrink-0 w-16", Rc = ze ? "h-10 px-3.5 text-sm font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-30 flex items-center gap-1.5 transition-colors", wr = ze ? "h-10 px-3 text-sm font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-[var(--ui-btn-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-item-hover-bg)] disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ic = "hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)]", rp = ze ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", ip = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", op = "bg-[var(--ui-btn-bg)] border-[color:var(--ui-input-border)] text-[color:var(--ui-text-faint)] hover:bg-[var(--ui-item-hover-bg)]", $c = ze ? "h-10 px-2.5 text-sm bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-[color:var(--ui-input-text)] placeholder:text-[color:var(--ui-text-disabled)] outline-none focus:border-[var(--ui-input-focus-border)] disabled:opacity-30" : "h-7 px-2 text-[10px] bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-[color:var(--ui-input-text)] placeholder:text-[color:var(--ui-text-disabled)] outline-none focus:border-[var(--ui-input-focus-border)] disabled:opacity-30", sp = ze ? "w-14 h-9 bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-sm text-center text-[color:var(--ui-input-text)] outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] rounded text-[11px] text-center text-[color:var(--ui-input-text)] outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", Ps = ze ? "w-px h-7 bg-[var(--ui-sep)] mx-1" : "w-px h-5 bg-[var(--ui-sep)] mx-0.5", Dc = "inline-flex rounded-[var(--ui-radius-btn)] overflow-hidden border border-[var(--ui-border-strong)]", Lc = ze ? "h-10 px-3 text-sm rounded bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-input-text)] hover:border-[var(--ui-input-focus-border)] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-[var(--ui-input-bg)] border border-[color:var(--ui-input-border)] text-[color:var(--ui-input-text)] hover:border-[var(--ui-input-focus-border)] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", kr = ({ onClick: n, disabled: e, title: t, className: r = Rc, children: i }) => {
  const o = ti();
  return /* @__PURE__ */ p(Pn, { content: t, children: /* @__PURE__ */ p("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Sr = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, lp = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: u, iconCollapse: c = !1, iconWithLabel: d = !0, ariaLabel: f }) => {
  const h = Ot(), m = a ?? Ba(h), y = a === "blue" || a === "emerald" ? a : (h == null ? void 0 : h.accent) ?? "zinc", b = { "data-mode": m === "dark" ? "dark" : "light", "data-accent": y }, x = ti(), O = Je(), w = s && !ze ? 24 : x.control.height, k = yn({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), C = ze ? k : { padding: "0 12px", fontSize: 12, height: s ? 20 : 24 }, S = (I) => i ? i(I) : n === I, B = Xe.useRef(null), K = Xe.useRef([]), N = Math.max(0, e.findIndex((I) => S(I.v))), W = Ac(B, K, N);
  return l === "track" ? /* @__PURE__ */ R(
    "div",
    {
      ref: B,
      role: u ? "tablist" : "group",
      "aria-label": f,
      ...b,
      className: `relative inline-flex items-center rounded-[var(--ui-radius-btn)] border p-0.5 ${ze ? "" : s ? "h-[26px]" : "h-[30px]"} ${o ? "w-full" : ""} ${Sr.wrap}`,
      children: [
        W.style && /* @__PURE__ */ p(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded-[var(--ui-radius-inset)] ${Sr.pill} ${W.motionClass}`,
            style: { ...W.style, top: 2, bottom: 2 }
          }
        ),
        e.map((I, Z) => {
          const te = S(I.v), U = c && !!I.icon;
          return /* @__PURE__ */ p(
            "button",
            {
              ref: (re) => {
                K.current[Z] = re;
              },
              ...I.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(I.v),
              title: I.title,
              role: u ? "tab" : void 0,
              "aria-selected": u ? te : void 0,
              "aria-pressed": u ? void 0 : te,
              "aria-label": I.ariaLabel ?? (I.l ? void 0 : I.title),
              style: C,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[var(--ui-radius-inset)] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${U ? "group gap-0" : "gap-1.5"} ${o ? "flex-1" : ""} ${te ? Sr.active : Sr.idle}`,
              children: /* @__PURE__ */ p(
                Ss,
                {
                  icon: I.icon,
                  collapse: U,
                  iconWithLabel: d,
                  active: te,
                  gap: _(6, 8, O),
                  children: I.l
                }
              )
            },
            I.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ R("div", { ref: B, className: `relative ${Dc} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    W.style && /* @__PURE__ */ p(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${W.motionClass}`,
        style: { ...W.style, top: 0, bottom: 0 }
      }
    ),
    e.map((I, Z) => {
      const te = S(I.v);
      return /* @__PURE__ */ R(
        "button",
        {
          ref: (U) => {
            K.current[Z] = U;
          },
          ...I.dataProps,
          disabled: r,
          onClick: () => t(I.v),
          title: I.title,
          style: { ...x.control, height: w },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${te ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${I.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            I.icon,
            I.l
          ]
        },
        I.v
      );
    })
  ] });
}, ap = ({ children: n }) => /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ p("span", { className: ze ? "text-xs font-semibold text-[color:var(--ui-label)] uppercase tracking-wider" : "text-[9px] font-semibold text-[color:var(--ui-label)] uppercase tracking-wider", children: n }),
  /* @__PURE__ */ p("div", { className: "h-px bg-[var(--ui-sep)]", style: { minWidth: 24, flex: 1 } })
] }), Pc = "text-[10px] font-medium text-[color:var(--ui-label)] uppercase tracking-wider mb-1", Oc = "text-[10px] font-medium text-[color:var(--ui-label)] uppercase tracking-wider w-28 shrink-0", cp = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ R("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ p("span", { className: t ? Pc : Oc, children: n }),
  e
] }), up = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[var(--ui-card-bg)] border border-[color:var(--ui-card-border)] min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ p("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), dp = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ R("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ p(kr, { onClick: () => r(-1), disabled: n, title: "Move up", className: wr, children: /* @__PURE__ */ p(Zl, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(kr, { onClick: () => r(1), disabled: n, title: "Move down", className: wr, children: /* @__PURE__ */ p(ea, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(kr, { onClick: e, disabled: n, title: "Duplicate", className: wr, children: /* @__PURE__ */ p(Uo, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p("div", { className: Ps }),
    /* @__PURE__ */ p(kr, { onClick: t, disabled: n, title: "Delete", className: `${wr} ${Ic}`, children: /* @__PURE__ */ p(vi, { className: "w-2.5 h-2.5" }) })
  ] })
);
var bo = Object.defineProperty, zc = (n, e) => {
  let t = {};
  for (var r in n) bo(t, r, {
    get: n[r],
    enumerable: !0
  });
  return bo(t, Symbol.toStringTag, { value: "Module" }), t;
};
function Nt(n) {
  this.content = n;
}
Nt.prototype = {
  constructor: Nt,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Nt(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Nt(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Nt([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Nt(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Nt(i);
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
    return n = Nt.from(n), n.size ? new Nt(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Nt.from(n), n.size ? new Nt(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Nt.from(n);
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
Nt.from = function(n) {
  if (n instanceof Nt) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Nt(e);
};
function Os(n, e, t) {
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
      return a && a < s.length && a < l.length && Bs(s.charCodeAt(a - 1)) && Fs(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = Os(i.content, o.content, t + 1);
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
      return d && f && d < u.length && Bs(u.charCodeAt(d - 1)) && Fs(u.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let u = zs(s.content, l.content, t - 1, r - 1);
      if (u)
        return u;
    }
    t -= a, r -= a;
  }
}
function Fs(n) {
  return n >= 56320 && n < 57344;
}
function Bs(n) {
  return n >= 55296 && n < 56320;
}
class V {
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
    return new V(i, this.size + e.size);
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
    return new V(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? V.empty : e == 0 && t == this.content.length ? this : new V(this.content.slice(e, t));
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
    return i[e] = t, new V(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new V([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new V(this.content.concat(e), this.size + e.nodeSize);
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
    return Os(this, e, t);
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
      return V.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return V.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return V.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new V(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return V.empty;
    if (e instanceof V)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new V([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
V.empty = new V([], 0);
const fi = { index: 0, offset: 0 };
function Nr(n, e) {
  return fi.index = n, fi.offset = e, fi;
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
let Ze = class Ni {
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
      return Ni.none;
    if (e instanceof Ni)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Ze.none = [];
class lr extends Error {
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
    let r = _s(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new de(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new de(Hs(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
    return new de(V.fromJSON(e, t.content), r, i);
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
de.empty = new de(V.empty, 0, 0);
function Hs(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Hs(o.content, e - i - 1, t - i - 1)));
}
function _s(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let u = _s(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return u && n.replaceChild(s, a.copy(u));
}
function Fc(n, e, t) {
  if (t.openStart > n.depth)
    throw new lr("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new lr("Inconsistent open depths");
  return js(n, e, t, 0);
}
function js(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = js(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Tn(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Bc(t, n);
      return Tn(o, qs(n, s, l, e, r));
    }
  else return Tn(o, Br(n, e, r));
}
function Ws(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new lr("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Ti(n, e, t) {
  let r = n.node(t);
  return Ws(r, e.node(t)), r;
}
function Nn(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function ir(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (Nn(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Nn(i.child(l), r);
  e && e.depth == t && e.textOffset && Nn(e.nodeBefore, r);
}
function Tn(n, e) {
  if (!n.type.validContent(e))
    throw new lr("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function qs(n, e, t, r, i) {
  let o = n.depth > i && Ti(n, e, i + 1), s = r.depth > i && Ti(t, r, i + 1), l = [];
  return ir(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Ws(o, s), Nn(Tn(o, qs(n, e, t, r, i + 1)), l)) : (o && Nn(Tn(o, Br(n, e, i + 1)), l), ir(e, t, i, l), s && Nn(Tn(s, Br(t, r, i + 1)), l)), ir(r, null, i, l), new V(l);
}
function Br(n, e, t) {
  let r = [];
  if (ir(null, n, t, r), n.depth > t) {
    let i = Ti(n, e, t + 1);
    Nn(Tn(i, Br(n, e, t + 1)), r);
  }
  return ir(e, null, t, r), new V(r);
}
function Bc(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(V.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class ar {
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
      return Ze.none;
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
        return new Hr(this, e, r);
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
    return new ar(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = vo.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      vo.set(e, r = new Hc());
    let i = r.elts[r.i] = ar.resolve(e, t);
    return r.i = (r.i + 1) % _c, i;
  }
}
class Hc {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const _c = 12, vo = /* @__PURE__ */ new WeakMap();
class Hr {
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
const jc = /* @__PURE__ */ Object.create(null);
let _n = class Ci {
  /**
  @internal
  */
  constructor(e, t, r, i = Ze.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || V.empty;
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
    return this.type == e && Fr(this.attrs, t || e.defaultAttrs || jc) && Ze.sameSet(this.marks, r || Ze.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Ci(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Ci(this.type, this.attrs, this.content, e);
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
    return Fc(this.resolve(e), this.resolve(t), r);
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
    return ar.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return ar.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Ks(this.marks, e);
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
  canReplace(e, t, r = V.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), wo(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ze.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      wo(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Ze.sameSet(e, this.marks))
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
    let i = V.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
_n.prototype.text = void 0;
class _r extends _n {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Ks(this.marks, JSON.stringify(this.text));
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
function Ks(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function wo(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class En {
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
    let r = new Wc(e, t);
    if (r.next == null)
      return En.empty;
    let i = Js(r);
    r.next && r.err("Unexpected trailing text");
    let o = Xc(Uc(i));
    return Gc(o, r), o;
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
        return V.from(l.map((u) => u.createAndFill()));
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
En.empty = new En(!0);
class Wc {
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
function Js(n) {
  let e = [];
  do
    e.push(qc(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function qc(n) {
  let e = [];
  do
    e.push(Kc(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Kc(n) {
  let e = Yc(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Jc(n, e);
    else
      break;
  return e;
}
function ko(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Jc(n, e) {
  let t = ko(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = ko(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Vc(n, e) {
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
function Yc(n) {
  if (n.eat("(")) {
    let e = Js(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Vc(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Uc(n) {
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
function Vs(n, e) {
  return e - n;
}
function So(n, e) {
  let t = [];
  return r(e), t.sort(Vs);
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
function Xc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(So(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let u;
        for (let c = 0; c < i.length; c++)
          i[c][0] == l && (u = i[c][1]);
        So(n, a).forEach((c) => {
          u || i.push([l, u = []]), u.indexOf(c) == -1 && u.push(c);
        });
      });
    });
    let o = e[r.join(",")] = new En(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Vs);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Gc(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: u } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(u) == -1 && r.push(u);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ys(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Us(n, e) {
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
function Xs(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Zc(n, r, e[r]);
  return t;
}
class jr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Xs(e, r.attrs), this.defaultAttrs = Ys(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == En.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Us(this.attrs, e);
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
    return new _n(this, this.computeAttrs(e), V.from(t), Ze.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = V.from(t), this.checkContent(t), new _n(this, this.computeAttrs(e), t, Ze.setFrom(r));
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
    if (e = this.computeAttrs(e), t = V.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(V.empty, !0);
    return o ? new _n(this, e, t.append(o), Ze.setFrom(r)) : null;
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
    return t ? t.length ? t : Ze.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new jr(o, t, s));
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
function Qc(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Zc {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Qc(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class ni {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Xs(e, i.attrs), this.excluded = null;
    let o = Ys(this.attrs);
    this.instance = o ? new Ze(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ze(this, Us(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new ni(o, i++, t, s)), r;
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
class eu {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Nt.from(e.nodes), t.marks = Nt.from(e.marks || {}), this.nodes = jr.compile(this.spec.nodes, this), this.marks = ni.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = En.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? No(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : No(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => _n.fromJSON(this, i), this.markFromJSON = (i) => Ze.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof jr) {
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
    return new _r(r, r.defaultAttrs, e, Ze.setFrom(t));
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
function No(n, e) {
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
function tu(n) {
  return n.tag != null;
}
function nu(n) {
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
      if (tu(i))
        this.tags.push(i);
      else if (nu(i)) {
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
    let r = new Co(this, t, !1);
    return r.addAll(e, Ze.none, t.from, t.to), r.finish();
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
    let r = new Co(this, t, !0);
    return r.addAll(e, Ze.none, t.from, t.to), de.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (ou(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = Eo(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = Eo(s)), s.node || s.ignore || s.mark || (s.node = i);
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
const Gs = {
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
}, ru = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Qs = { ol: !0, ul: !0 }, cr = 1, Ei = 2, or = 4;
function To(n, e, t) {
  return e != null ? (e ? cr : 0) | (e === "full" ? Ei : 0) : n && n.whitespace == "pre" ? cr | Ei : t & ~or;
}
class Tr {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ze.none, this.match = o || (s & or ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(V.from(e));
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
    if (!(this.options & cr)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = V.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(V.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Gs.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Co {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = To(null, t.preserveWhitespace, 0) | (r ? or : 0);
    i ? o = new Tr(i.type, i.attrs, Ze.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Tr(null, null, Ze.none, !0, null, s) : o = new Tr(e.schema.topNodeType, null, Ze.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Ei ? "full" : this.localPreserveWS || (i.options & cr) > 0, { schema: s } = this.parser;
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
    Qs.hasOwnProperty(s) && this.parser.normalizeLists && iu(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : ru.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let u, c = this.needsBlock;
      if (Gs.hasOwnProperty(s))
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
      let s = Ze.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : Mo(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = To(e, o, s.options);
    s.options & or && s.content.length == 0 && (l |= or);
    let a = Ze.none;
    return r = r.filter((u) => (s.type ? s.type.allowsMarkType(u.type) : Mo(u.type, e)) ? (a = u.addToSet(a), !1) : !0), this.nodes.push(new Tr(e, t, a, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= cr);
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
function iu(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Qs.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function ou(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Eo(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Mo(n, e) {
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
const Zs = 65535, el = Math.pow(2, 16);
function su(n, e) {
  return n + e * el;
}
function Ao(n) {
  return n & Zs;
}
function lu(n) {
  return (n - (n & Zs)) / el;
}
const tl = 1, nl = 2, Rr = 4, rl = 8;
class Mi {
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
    return (this.delInfo & rl) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (tl | Rr)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (nl | Rr)) > 0;
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
    let t = 0, r = Ao(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + lu(e);
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
        let m = e == (t < 0 ? a : d) ? null : su(l / 3, e - a), y = e == a ? nl : e == d ? tl : Rr;
        return (t < 0 ? e != a : e != d) && (y |= rl), new Mi(h, y, m);
      }
      i += c - u;
    }
    return r ? e + i : new Mi(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Ao(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
        let a = this.getMirror(o);
        if (a != null && a > o && a < this.to) {
          o = a, e = this._maps[a].recover(l.recover);
          continue;
        }
      }
      i |= l.delInfo, e = l.pos;
    }
    return r ? e : new Mi(e, i, null);
  }
}
const hi = /* @__PURE__ */ Object.create(null);
class At {
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
    let r = hi[t.stepType];
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
    if (e in hi)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return hi[e] = t, t.prototype.jsonID = e, t;
  }
}
class mt {
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
    return new mt(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new mt(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return mt.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof lr)
        return mt.fail(o.message);
      throw o;
    }
  }
}
function Ui(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Ui(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return V.fromArray(r);
}
class pn extends At {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new de(Ui(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return mt.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Kt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new pn(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof pn && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new pn(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new pn(t.from, t.to, e.markFromJSON(t.mark));
  }
}
At.jsonID("addMark", pn);
class Kt extends At {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new de(Ui(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return mt.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new pn(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Kt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Kt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Kt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Kt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
At.jsonID("removeMark", Kt);
class mn extends At {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return mt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return mt.fromReplace(e, this.pos, this.pos + 1, new de(V.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new mn(this.pos, t.marks[i]);
        return new mn(this.pos, this.mark);
      }
    }
    return new Mn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new mn(t.pos, this.mark);
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
    return new mn(t.pos, e.markFromJSON(t.mark));
  }
}
At.jsonID("addNodeMark", mn);
class Mn extends At {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return mt.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return mt.fromReplace(e, this.pos, this.pos + 1, new de(V.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new mn(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Mn(t.pos, this.mark);
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
    return new Mn(t.pos, e.markFromJSON(t.mark));
  }
}
At.jsonID("removeNodeMark", Mn);
class pt extends At {
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
    return this.structure && Ai(e, this.from, this.to) ? mt.fail("Structure replace would overwrite content") : mt.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new zt([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new pt(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && pt.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new pt(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof pt) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? de.empty : new de(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new pt(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? de.empty : new de(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new pt(e.from, this.to, t, this.structure);
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
    return new pt(t.from, t.to, de.fromJSON(e, t.slice), !!t.structure);
  }
}
pt.MAP_BIAS = 1;
At.jsonID("replace", pt);
class xt extends At {
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
    if (this.structure && (Ai(e, this.from, this.gapFrom) || Ai(e, this.gapTo, this.to)))
      return mt.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return mt.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? mt.fromReplace(e, this.from, this.to, r) : mt.fail("Content does not fit in gap");
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
    return new xt(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new xt(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new xt(t.from, t.to, t.gapFrom, t.gapTo, de.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
At.jsonID("replaceAround", xt);
function Ai(n, e, t) {
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
function au(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, u, c) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && c.type.allowsMarkType(r.type)) {
      let f = Math.max(u, e), h = Math.min(u + a.nodeSize, t), m = r.addToSet(d);
      for (let y = 0; y < d.length; y++)
        d[y].isInSet(m) || (s && s.to == f && s.mark.eq(d[y]) ? s.to = h : i.push(s = new Kt(f, h, d[y])));
      l && l.to == f ? l.to = h : o.push(l = new pn(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function cu(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof ni) {
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
  }), i.forEach((s) => n.step(new Kt(s.from, s.to, s.style)));
}
function Xi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let u = o.child(a), c = l + u.nodeSize, d = r.matchType(u.type);
    if (!d)
      s.push(new pt(l, c, de.empty));
    else {
      r = d;
      for (let f = 0; f < u.marks.length; f++)
        t.allowsMarkType(u.marks[f].type) || n.step(new Kt(l, c, u.marks[f]));
      if (i && u.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, m;
        for (; f = h.exec(u.text); )
          m || (m = new de(V.from(t.schema.text(" ", t.allowedMarks(u.marks))), 0, 0)), s.push(new pt(l + f.index, l + f.index + f[0].length, m));
      }
    }
    l = c;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(V.empty, !0);
    n.replace(l, l, new de(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function uu(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Xn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !uu(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function du(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, u = l, c = V.empty, d = 0;
  for (let m = o, y = !1; m > t; m--)
    y || r.index(m) > 0 ? (y = !0, c = V.from(r.node(m).copy(c)), d++) : a--;
  let f = V.empty, h = 0;
  for (let m = o, y = !1; m > t; m--)
    y || i.after(m + 1) < i.end(m) ? (y = !0, f = V.from(i.node(m).copy(f)), h++) : u++;
  n.step(new xt(a, u, s, l, new de(c.append(f), d, h), c.size - d, !0));
}
function il(n, e, t = null, r = n) {
  let i = fu(n, e), o = i && hu(r, e);
  return o ? i.map(Ro).concat({ type: e, attrs: t }).concat(o.map(Ro)) : null;
}
function Ro(n) {
  return { type: n, attrs: null };
}
function fu(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function hu(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let u = r; a && u < i; u++)
    a = a.matchType(t.child(u).type);
  return !a || !a.validEnd ? null : s;
}
function pu(n, e, t) {
  let r = V.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = V.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new xt(i, o, i, o, new de(r, 0, 0), t.length, !0));
}
function mu(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && gu(n.doc, n.mapping.slice(o).map(l), r)) {
      let u = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !m ? u = !1 : !h && m && (u = !0);
      }
      u === !1 && sl(n, s, l, o), Xi(n, n.mapping.slice(o).map(l, 1), r, void 0, u === null);
      let c = n.mapping.slice(o), d = c.map(l, 1), f = c.map(l + s.nodeSize, 1);
      return n.step(new xt(d, f, d + 1, f - 1, new de(V.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), u === !0 && ol(n, s, l, o), !1;
    }
  });
}
function ol(n, e, t, r) {
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
function sl(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function gu(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function yu(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new xt(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new de(V.from(s), 0, 0), 1, !0));
}
function ln(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let u = i.depth - 1, c = t - 2; u > o; u--, c--) {
    let d = i.node(u), f = i.index(u);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), m = r && r[c + 1];
    m && (h = h.replaceChild(0, m.type.create(m.attrs)));
    let y = r && r[c] || d;
    if (!d.canReplace(f + 1, d.childCount) || !y.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function xu(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = V.empty, s = V.empty;
  for (let l = i.depth, a = i.depth - t, u = t - 1; l > a; l--, u--) {
    o = V.from(i.node(l).copy(o));
    let c = r && r[u];
    s = V.from(c ? c.type.create(c.attrs, s) : i.node(l).copy(s));
  }
  n.step(new pt(e, e, new de(o.append(s), t, t), !0));
}
function An(n, e) {
  let t = n.resolve(e), r = t.index();
  return ll(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function bu(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function ll(n, e) {
  return !!(n && e && !n.isLeaf && bu(n, e));
}
function ri(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && ll(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function vu(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let c = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    c && !d ? r = !1 : !c && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let c = n.doc.resolve(e + t);
    sl(n, c.node(), c.before(), l);
  }
  s.inlineContent && Xi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), u = a.map(e - t);
  if (n.step(new pt(u, a.map(e + t, -1), de.empty, !0)), r === !0) {
    let c = n.doc.resolve(u);
    ol(n, c.node(), c.before(), n.steps.length);
  }
  return n;
}
function wu(n, e, t) {
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
function ii(n, e, t = e, r = de.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return al(i, o, r) ? new pt(e, t, r) : new ku(i, o, r).fit();
}
function al(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class ku {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = V.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = V.from(e.node(i).copy(this.placed));
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
    let a = new de(o, s, l);
    return e > -1 ? new xt(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new pt(r.pos, i.pos, a) : null;
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
        r ? (o = pi(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: u } = this.frontier[l], c, d = null;
          if (t == 1 && (s ? u.matchType(s.type) || (d = u.fillBefore(V.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (c = u.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: c };
          if (o && u.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = pi(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new de(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = pi(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new de(nr(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new de(nr(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, u = 0, c = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let y = 0; y < i.childCount; y++)
        c.push(i.child(y));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; u < l.childCount; ) {
      let y = l.child(u), b = d.matchType(y.type);
      if (!b)
        break;
      u++, (u > 1 || a == 0 || y.content.size) && (d = b, c.push(cl(y.mark(f.allowedMarks(y.marks)), u == 1 ? a : 0, u == l.childCount ? h : -1)));
    }
    let m = u == l.childCount;
    m || (h = -1), this.placed = rr(this.placed, t, V.from(c)), this.frontier[t].match = d, m && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let y = 0, b = l; y < h; y++) {
      let x = b.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), b = x.content;
    }
    this.unplaced = m ? e == 0 ? de.empty : new de(nr(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new de(nr(s.content, e, u), s.openStart, s.openEnd);
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
          let { match: a, type: u } = this.frontier[l], c = mi(e, l, u, a, !0);
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
    t.fit.childCount && (this.placed = rr(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = rr(this.placed, this.depth, V.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(V.empty, !0);
    t.childCount && (this.placed = rr(this.placed, this.frontier.length, t));
  }
}
function nr(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(nr(n.firstChild.content, e - 1, t)));
}
function rr(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(rr(n.lastChild.content, e - 1, t)));
}
function pi(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function cl(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, cl(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(V.empty, !0)))), n.copy(r);
}
function mi(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !Su(t, o.content, s) ? l : null;
}
function Su(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Nu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Tu(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (al(i, o, r))
    return n.step(new pt(e, t, r));
  let s = dl(i, o);
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
    let h = u[f], m = Nu(h.type);
    if (m && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      c = f;
    else if (m || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + c + 1) % (r.openStart + 1), m = u[h];
    if (m)
      for (let y = 0; y < s.length; y++) {
        let b = s[(y + a) % s.length], x = !0;
        b < 0 && (x = !1, b = -b);
        let O = i.node(b - 1), w = i.index(b - 1);
        if (O.canReplaceWith(w, w, m.type, m.marks))
          return n.replace(i.before(b), x ? o.after(b) : t, new de(ul(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function ul(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(ul(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(V.empty, !0));
  }
  return n;
}
function Cu(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = wu(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new de(V.from(r), 0, 0));
}
function Eu(n, e, t) {
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
  let o = dl(r, i);
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
function dl(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Wn extends At {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return mt.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return mt.fromReplace(e, this.pos, this.pos + 1, new de(V.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return zt.empty;
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
At.jsonID("attr", Wn);
class ur extends At {
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
    return mt.ok(r);
  }
  getMap() {
    return zt.empty;
  }
  invert(e) {
    return new ur(this.attr, e.attrs[this.attr]);
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
    return new ur(t.attr, t.value);
  }
}
At.jsonID("docAttr", ur);
let Kn = class extends Error {
};
Kn = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Kn.prototype = Object.create(Error.prototype);
Kn.prototype.constructor = Kn;
Kn.prototype.name = "TransformError";
class Mu {
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
  replace(e, t = e, r = de.empty) {
    let i = ii(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new de(V.from(r), 0, 0));
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
    return Tu(this, e, t, r), this;
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
    return Cu(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Eu(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return du(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return vu(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return pu(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return mu(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return yu(this, e, t, r, i), this;
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
    return this.step(new ur(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new mn(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof Ze)
      t.isInSet(r.marks) && this.step(new Mn(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new Mn(e, o)), i = o.removeFromSet(i);
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
    return xu(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return au(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return cu(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Xi(this, e, t, r), this;
  }
}
const gi = /* @__PURE__ */ Object.create(null);
class at {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Au(e.min(t), e.max(t))];
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
      let { $from: a, $to: u } = s[l], c = e.mapping.slice(o);
      e.replaceRange(c.map(a.pos), c.map(u.pos), l ? de.empty : t), l == 0 && Do(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(u, c) : (e.replaceRangeWith(u, c, t), Do(e, r, t.isInline ? -1 : 1));
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
    return Pt.between(this.$anchor, this.$head).getBookmark();
  }
}
at.prototype.visible = !0;
class Au {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Io = !1;
function $o(n) {
  !Io && !n.parent.inlineContent && (Io = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Pt extends at {
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
      return at.near(r);
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
    return new oi(this.anchor, this.head);
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
      let o = at.findFrom(t, r, !0) || at.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return at.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (at.findFrom(e, -r, !0) || at.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Pt(e, t);
  }
}
at.jsonID("text", Pt);
class oi {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new oi(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Pt.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class et extends at {
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
    return r ? at.near(o) : new et(o);
  }
  content() {
    return new de(V.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof et && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Gi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new et(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new et(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
et.prototype.visible = !1;
at.jsonID("node", et);
class Gi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new oi(r, r) : new Gi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && et.isSelectable(r) ? new et(t) : at.near(t);
  }
}
class Jt extends at {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = de.empty) {
    if (t == de.empty) {
      e.delete(0, e.doc.content.size);
      let r = at.atStart(e.doc);
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
    return Ru;
  }
}
at.jsonID("all", Jt);
const Ru = {
  map() {
    return this;
  },
  resolve(n) {
    return new Jt(n);
  }
};
function On(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Pt.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && et.isSelectable(l))
        return et.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = On(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Do(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof pt || i instanceof xt))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, u, c) => {
    s == null && (s = c);
  }), n.setSelection(at.near(n.doc.resolve(s), t));
}
function Lo(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Cr {
  constructor(e, t, r) {
    this.name = e, this.init = Lo(t.init, r), this.apply = Lo(t.apply, r);
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
    return n.selection || at.atStart(e.doc);
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
const fl = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function hl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const pl = (n, e, t) => {
  let r = hl(n, t);
  if (!r)
    return !1;
  let i = Qi(r);
  if (!i) {
    let s = r.blockRange(), l = s && Xn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Sl(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "end") || et.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = ii(n.doc, r.before(s), r.after(s), de.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Jn(o, "end") ? at.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : et.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Iu = (n, e, t) => {
  let r = hl(n, t);
  if (!r)
    return !1;
  let i = Qi(r);
  return i ? ml(n, i, e) : !1;
}, $u = (n, e, t) => {
  let r = yl(n, t);
  if (!r)
    return !1;
  let i = Zi(r);
  return i ? ml(n, i, e) : !1;
};
function ml(n, e, t) {
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
  let u = ii(n.doc, o, a, de.empty);
  if (!u || u.from != o || u instanceof pt && u.slice.size >= a - o)
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
const gl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Qi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !et.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(et.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Qi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function yl(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const xl = (n, e, t) => {
  let r = yl(n, t);
  if (!r)
    return !1;
  let i = Zi(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Sl(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Jn(o, "start") || et.isSelectable(o))) {
    let s = ii(n.doc, r.before(), r.after(), de.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Jn(o, "start") ? at.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : et.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, bl = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Zi(r);
  }
  let s = o && o.nodeAfter;
  return !s || !et.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(et.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Zi(n) {
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
const Du = (n, e) => {
  let t = n.selection, r = t instanceof et, i;
  if (r) {
    if (t.node.isTextblock || !An(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = ri(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(et.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, Lu = (n, e) => {
  let t = n.selection, r;
  if (t instanceof et) {
    if (t.node.isTextblock || !An(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = ri(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Pu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Xn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, vl = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function eo(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Ou = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = eo(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(at.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, wl = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Jt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = eo(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Pt.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, kl = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (ln(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Xn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function zu(n) {
  return (e, t) => {
    if (e.selection instanceof et && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !ln(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Pt || e.selection instanceof Jt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, u = !1, c = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        u = i.end(h) == i.pos + (i.depth - h), c = i.start(h) == i.pos - (i.depth - h), a = eo(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(u && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = ln(r.doc, d, s.length, s);
    if (f || (s[0] = a ? { type: a } : null, f = ln(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !u && c && i.node(l).type != a) {
      let h = r.mapping.slice(o), m = h.map(i.before(l)), y = r.doc.resolve(m);
      a && i.node(l - 1).canReplaceWith(y.index(), y.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Fu = zu(), Bu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(et.create(n.doc, i))), !0);
};
function Hu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || An(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Sl(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && Hu(n, e, t))
    return !0;
  let u = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (u && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, m = V.empty;
      for (let x = s.length - 1; x >= 0; x--)
        m = V.from(s[x].create(null, m));
      m = V.from(i.copy(m));
      let y = n.tr.step(new xt(e.pos - 1, h, e.pos, h, new de(m, 1, 0), s.length, !0)), b = y.doc.resolve(h + 2 * s.length);
      b.nodeAfter && b.nodeAfter.type == i.type && An(y.doc, b.pos) && y.join(b.pos), t(y.scrollIntoView());
    }
    return !0;
  }
  let c = o.type.spec.isolating || r > 0 && a ? null : at.findFrom(e, 1), d = c && c.$from.blockRange(c.$to), f = d && Xn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (u && Jn(o, "start", !0) && Jn(i, "end")) {
    let h = i, m = [];
    for (; m.push(h), !h.isTextblock; )
      h = h.lastChild;
    let y = o, b = 1;
    for (; !y.isTextblock; y = y.firstChild)
      b++;
    if (h.canReplace(h.childCount, h.childCount, y.content)) {
      if (t) {
        let x = V.empty;
        for (let w = m.length - 1; w >= 0; w--)
          x = V.from(m[w].copy(x));
        let O = n.tr.step(new xt(e.pos - m.length, e.pos + o.nodeSize, e.pos + b, e.pos + o.nodeSize - b, new de(x, m.length, 0), 0, !0));
        t(O.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Nl(n) {
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
const _u = Nl(-1), ju = Nl(1);
function Wu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && il(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Po(n, e = null) {
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
function to(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
to(fl, pl, gl);
to(fl, xl, bl);
to(vl, wl, kl, Fu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function qu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Ku(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Ku(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new Hr(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Hr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = il(o, t, r, e);
  return l ? (n && Ju(n, e, l, i, t), !0) : !1;
}
function Ju(n, e, t, r, i) {
  let o = V.empty;
  for (let c = t.length - 1; c >= 0; c--)
    o = V.from(t[c].type.create(t[c].attrs, o));
  n.step(new xt(e.start - (r ? 2 : 0), e.end, e.start, e.end, new de(o, 0, 0), t.length, !0));
  let s = 0;
  for (let c = 0; c < t.length; c++)
    t[c].type == i && (s = c + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), u = e.parent;
  for (let c = e.startIndex, d = e.endIndex, f = !0; c < d; c++, f = !1)
    !f && ln(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += u.child(c).nodeSize;
  return n;
}
function Vu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Yu(e, t, n, o) : Uu(e, t, o) : !0 : !1;
  };
}
function Yu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new xt(o - 1, s, o, s, new de(V.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Hr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Xn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return An(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function Uu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, m = t.endIndex - 1, y = t.startIndex; m > y; m--)
    h -= i.child(m).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, u = o.node(-1), c = o.index(-1);
  if (!u.canReplace(c + (l ? 0 : 1), c + 1, s.content.append(a ? V.empty : V.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new xt(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new de((l ? V.empty : V.from(i.copy(V.empty))).append(a ? V.empty : V.from(i.copy(V.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Xu(n) {
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
      let u = a.lastChild && a.lastChild.type == l.type, c = V.from(u ? n.create() : null), d = new de(V.from(n.create(null, V.from(l.type.create(null, c)))), u ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new xt(f - (u ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Tl(n) {
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
var Gu = class Cl {
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
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...y) => {
        const b = this.buildProps(u, t), x = h(...y)(b);
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
    const e = Cl.createFakeChain();
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
      state: Tl({
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
const Qu = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Zu = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), ed = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: u, mapping: c } = e, d = u.resolve(c.map(a)), f = u.resolve(c.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h) return;
      const m = Xn(h);
      if (l.type.isTextblock) {
        const { defaultType: y } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, y);
      }
      (m || m === 0) && e.lift(h, m);
    });
  }), !0;
}, td = (n) => (e) => n(e), nd = () => ({ state: n, dispatch: e }) => wl(n, e), rd = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Ht(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, id = () => ({ tr: n, dispatch: e }) => {
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
function Mt(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const od = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Mt(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), a = o.after(s);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, sd = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, ld = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Oo = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return ld(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, ad = (n, e, t) => ({
  from: Oo(n, t, "left"),
  to: Oo(e, t, "right")
}), cd = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: u, to: c } = ad(l, a, n.schema);
      t.deleteRange(u, c);
    }), t.selection.empty || t.setSelection(Ht.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, ud = () => ({ commands: n }) => n.keyboardShortcut("Enter"), dd = () => ({ state: n, dispatch: e }) => Ou(n, e);
function fd(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function qr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : fd(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function El(n, e, t = {}) {
  return n.find((r) => r.type === e && qr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function zo(n, e, t = {}) {
  return !!El(n, e, t);
}
function Ml(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((u) => u.type === e);
    a && (t = a.attrs);
  }
  if (!El([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && zo([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && zo([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function vn(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const hd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = vn(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: u, to: c } = l;
  if (i) {
    const d = Ml(a, o, e);
    if (d && d.from <= u && d.to >= c) {
      const f = Ht.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, pd = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function Al(n) {
  return n instanceof Ht;
}
function Sn(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function md(n, e = null) {
  if (!e) return null;
  const t = Bn.atStart(n), r = Bn.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Ht.create(n, Sn(0, i, o), Sn(n.content.size, i, o)) : Ht.create(n, Sn(e, i, o), Sn(e, i, o));
}
function Fo() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Kr() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function gd() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const yd = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Kr() || Fo()) && r.dom.focus(), gd() && !Kr() && !Fo() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !Al(t.state.selection))
    return s(), !0;
  const l = md(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, xd = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), bd = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), Rl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Rl(r);
  }
  return n;
};
function Er(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Rl(t);
}
function Il(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Vn(n, e, t) {
  if (Il(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return V.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Vn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new eu({
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
      if (t.slice ? jn.fromSchema(a).parseSlice(Er(n), t.parseOptions) : jn.fromSchema(a).parse(Er(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = jn.fromSchema(e);
    return t.slice ? o.parseSlice(Er(n), t.parseOptions).content : o.parse(Er(n), t.parseOptions);
  }
  return Vn("", e, t);
}
function $l(n) {
  return !("type" in n);
}
function Dl(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof pt || i instanceof xt)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, u, c) => {
    s === 0 && (s = c);
  }), n.setSelection(Bn.near(n.doc.resolve(s), t));
}
const vd = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
    const m = $l(l) ? l.content : [l];
    if (m.forEach((b) => {
      b.check(), f = f ? b.isText && b.marks.length === 0 : !1, h = h ? b.isBlock : !1;
    }), c === d && h) {
      const { parent: b } = r.doc.resolve(c);
      b.isTextblock && !b.type.spec.code && !b.childCount && (c -= 1, d += 1);
    }
    let y;
    if (f)
      Array.isArray(e) ? y = e.map((b) => b.text || "").join("") : Il(e) ? y = m.map((b) => {
        var x;
        return (x = b.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? y = e.text : y = e, r.insertText(y, c, d);
    else {
      y = V.from(m);
      const b = r.doc.resolve(c), x = b.node(), O = b.parentOffset === 0, w = x.isText || x.isTextblock, k = x.content.size > 0;
      O && w && k && h && (c = Math.max(0, c - 1)), r.replaceWith(c, d, m);
    }
    t.updateSelection && Dl(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: c,
      text: y
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: c,
      text: y
    });
  }
  return !0;
};
function Ll(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const wd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const u = Ll(a.parent.contentMatchAt(a.index()));
  if (!u) return !1;
  const c = Object.keys(u.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => c.includes(h))) : {};
  let f;
  if (s) {
    const h = Vn(s, r.schema);
    f = u.createAndFill(d, h);
  } else f = u.createAndFill(d);
  return f ? (t && (e.insert(a.pos, f), l && Dl(e, e.steps.length - 1, -1)), !0) : !1;
}, kd = () => ({ state: n, dispatch: e }) => Du(n, e), Sd = () => ({ state: n, dispatch: e }) => Lu(n, e), Nd = () => ({ state: n, dispatch: e }) => pl(n, e), Td = () => ({ state: n, dispatch: e }) => xl(n, e), Cd = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ri(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Ed = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = ri(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Md = () => ({ state: n, dispatch: e }) => Iu(n, e), Ad = () => ({ state: n, dispatch: e }) => $u(n, e);
function Pl() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Rd(n) {
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
      Kr() || Pl() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Id = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Rd(n).split(/-(?!$)/), s = o.find((u) => ![
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
function no(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Mt(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (c, d) => {
    if (c.isText) return;
    const f = Math.max(r, d), h = Math.min(i, d + c.nodeSize);
    l.push({
      node: c,
      from: f,
      to: h
    });
  });
  const a = i - r, u = l.filter((c) => s ? s.name === c.node.type.name : !0).filter((c) => qr(c.node.attrs, t, { strict: !1 }));
  return o ? !!u.length : u.reduce((c, d) => c + d.to - d.from, 0) >= a;
}
const $d = (n, e = {}) => ({ state: t, dispatch: r }) => no(t, Mt(n, t.schema), e) ? Pu(t, r) : !1, Dd = () => ({ state: n, dispatch: e }) => kl(n, e), Ld = (n) => ({ state: e, dispatch: t }) => {
  const r = Mt(n, e.schema);
  return Vu(r)(e, t);
}, Pd = () => ({ state: n, dispatch: e }) => vl(n, e);
function Ol(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Bo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Od = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ol(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Mt(n, r.schema)), l === "mark" && (s = vn(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((u) => {
    r.doc.nodesBetween(u.$from.pos, u.$to.pos, (c, d) => {
      o && o === c.type && (a = !0, i && t.setNodeMarkup(d, void 0, Bo(c.attrs, e))), s && c.marks.length && c.marks.forEach((f) => {
        s === f.type && (a = !0, i && t.addMark(d, d + c.nodeSize, s.create(Bo(f.attrs, e))));
      });
    });
  }), a;
}, zd = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Fd = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new ga(n.doc);
    n.setSelection(t);
  }
  return !0;
}, Bd = () => ({ state: n, dispatch: e }) => gl(n, e), Hd = () => ({ state: n, dispatch: e }) => bl(n, e), _d = () => ({ state: n, dispatch: e }) => Bu(n, e), jd = () => ({ state: n, dispatch: e }) => ju(n, e), Wd = () => ({ state: n, dispatch: e }) => _u(n, e);
function qd(n, e, t = {}, r = {}) {
  return Vn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Kd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const u = qd(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const c = $l(u) ? u.content : [u];
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
function Jd(n, e) {
  const t = vn(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Vd(n, e) {
  const t = new Mu(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Yd(n, e) {
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
function ro(n) {
  return (e) => Yd(e.$from, n);
}
function dr(n, e, t) {
  return n.config[e] === void 0 && n.parent ? dr(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? dr(n.parent, e, t) : null
  }) : n.config[e];
}
function Ud(n) {
  return typeof n == "function";
}
function Ri(n, e = void 0, ...t) {
  return Ud(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function zl(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Xd(n, e, t) {
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
function Gd(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Qd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Zd(n) {
  const e = Qd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function ef(n) {
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
  }), Zd(r);
}
function Ir(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function tf(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? vn(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((c) => o ? o.name === c.type.name : !0).find((c) => qr(c.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: c, $to: d }) => {
    const f = c.pos, h = d.pos;
    n.doc.nodesBetween(f, h, (m, y) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const b = Math.max(f, y), x = Math.min(h, y + m.nodeSize), O = x - b;
      s += O, l.push(...m.marks.map((w) => ({
        mark: w,
        from: b,
        to: x
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((c) => o ? o.name === c.mark.type.name : !0).filter((c) => qr(c.mark.attrs, t, { strict: !1 })).reduce((c, d) => c + d.to - d.from, 0), u = l.filter((c) => o ? c.mark.type !== o && c.mark.type.excludes(o) : !0).reduce((c, d) => c + d.to - d.from, 0);
  return (a > 0 ? a + u : a) >= s;
}
function yi(n, e) {
  const { nodeExtensions: t } = zl(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Ri(dr(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Fl(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Fl(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function nf(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (Al(r) && (i = r.$cursor), i) {
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
        const h = !f || f.type.allowsMarkType(t), m = !!t.isInSet(c.marks) || !c.marks.some((y) => y.type.excludes(t));
        u = h && m;
      }
      return !u;
    }), u;
  });
}
const rf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = vn(n, r.schema);
  if (i)
    if (s) {
      const u = Jd(r, a);
      t.addStoredMark(a.create({
        ...u,
        ...e
      }));
    } else l.forEach((u) => {
      const c = u.$from.pos, d = u.$to.pos;
      r.doc.nodesBetween(c, d, (f, h) => {
        const m = Math.max(h, c), y = Math.min(h + f.nodeSize, d);
        f.marks.find((b) => b.type === a) ? f.marks.forEach((b) => {
          a === b.type && t.addMark(m, y, a.create({
            ...b.attrs,
            ...e
          }));
        }) : t.addMark(m, y, a.create(e));
      });
    });
  return nf(r, t, a);
}, of = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), sf = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Mt(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Po(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Po(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, lf = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Sn(n, 0, r.content.size), o = qn.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, af = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, u) => {
    a.isText || t.setNodeMarkup(u, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, cf = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Ht.atStart(r).from, l = Ht.atEnd(r).to, a = Sn(i, s, l), u = Sn(o, s, l), c = Ht.create(r, a, u);
    e.setSelection(c);
  }
  return !0;
}, uf = (n) => ({ state: e, dispatch: t }) => {
  const r = Mt(n, e.schema);
  return Xu(r)(e, t);
};
function Ho(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const df = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, u = i.extensionManager.attributes, c = Ir(u, l.node().type.name, l.node().attrs);
  if (o instanceof qn && o.node.isBlock)
    return !l.parentOffset || !ln(s, l.pos) ? !1 : (r && (n && Ho(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : Ll(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [{
    type: f,
    attrs: c
  }] : void 0, m = ln(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !m && ln(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (m = !0, h = f ? [{
    type: f,
    attrs: c
  }] : void 0), r) {
    if (m && (o instanceof Ht && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const y = e.mapping.map(l.before()), b = e.doc.resolve(y);
      l.node(-1).canReplaceWith(b.index(), b.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Ho(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, ff = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Mt(n, r.schema), { $from: l, $to: a } = r.selection, u = r.selection.node;
  if (u && u.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const c = l.node(-1);
  if (c.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = V.empty;
      const O = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let K = l.depth - O; K >= l.depth - 3; K -= 1) x = V.from(l.node(K).copy(x));
      const w = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, k = {
        ...Ir(d, l.node().type.name, l.node().attrs),
        ...e
      }, C = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(k)) || void 0;
      x = x.append(V.from(s.createAndFill(null, C) || void 0));
      const S = l.before(l.depth - (O - 1));
      t.replace(S, l.after(-w), new de(x, 4 - O, 0));
      let B = -1;
      t.doc.nodesBetween(S, t.doc.content.size, (K, N) => {
        if (B > -1) return !1;
        K.isTextblock && K.content.size === 0 && (B = N + 1);
      }), B > -1 && t.setSelection(Ht.near(t.doc.resolve(B))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? c.contentMatchAt(0).defaultType : null, m = {
    ...Ir(d, c.type.name, c.attrs),
    ...e
  }, y = {
    ...Ir(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const b = h ? [{
    type: s,
    attrs: m
  }, {
    type: h,
    attrs: y
  }] : [{
    type: s,
    attrs: m
  }];
  if (!ln(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: O } = r, { splittableMarks: w } = o.extensionManager, k = O || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, b).scrollIntoView(), !k || !i) return !0;
    const C = k.filter((S) => w.includes(S.type.name));
    t.ensureMarks(C);
  }
  return !0;
};
function _o(n) {
  return !n || n === "1" ? null : n;
}
function Bl(n, e) {
  return _o(n) === _o(e);
}
const xi = (n, e) => {
  const t = ro((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && An(n.doc, t.pos)) || !Bl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, bi = (n, e) => {
  const t = ro((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && An(n.doc, r)) || !Bl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function hf(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Ht.between(r, i);
}
const pf = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: u, can: c }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Mt(n, s.schema), m = Mt(e, s.schema), { selection: y, storedMarks: b } = s, { $from: x, $to: O } = y, w = x.blockRange(O), k = b || y.$to.parentOffset && y.$from.marks();
  if (!w) return !1;
  const C = ro((te) => yi(te.type.name, d))(y), S = y.from === 0 && y.to === s.doc.content.size, B = s.doc.content.content, K = B.length === 1 ? B[0] : null, N = S && K && yi(K.type.name, d) ? {
    node: K,
    pos: 0
  } : null, W = C ?? N, I = !!C && w.depth >= 1 && w.depth - C.depth <= 1, Z = !!N;
  if ((I || Z) && W) {
    if (W.node.type === h)
      return S && Z ? a().command(({ tr: te, dispatch: U }) => {
        const re = hf(te);
        return re ? (te.setSelection(re), U && U(te), !0) : !1;
      }).liftListItem(m).run() : u.liftListItem(m);
    if (yi(W.node.type.name, d) && h.validContent(W.node.content)) return a().command(() => (o.setNodeMarkup(W.pos, h), !0)).command(() => xi(o, h)).command(() => bi(o, h)).run();
  }
  return !t || !k || !l ? a().command(() => c().wrapInList(h, r) ? !0 : u.clearNodes()).wrapInList(h, r).command(() => xi(o, h)).command(() => bi(o, h)).run() : a().command(() => {
    const te = c().wrapInList(h, r), U = k.filter((re) => f.includes(re.type.name));
    return o.ensureMarks(U), te ? !0 : u.clearNodes();
  }).wrapInList(h, r).command(() => xi(o, h)).command(() => bi(o, h)).run();
}, mf = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = vn(n, r.schema);
  return tf(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, gf = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Mt(n, r.schema), s = Mt(e, r.schema), l = no(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, yf = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Mt(n, t.schema);
  return no(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, xf = () => ({ state: n, dispatch: e }) => {
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
}, bf = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, vf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = vn(n, r.schema), { $from: a, empty: u, ranges: c } = s;
  if (!i) return !0;
  if (u && o) {
    var d;
    let { from: f, to: h } = s;
    const m = Ml(a, l, (d = a.marks().find((y) => y.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    m && (f = m.from, h = m.to), t.removeMark(f, h, l);
  } else c.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, wf = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText) return;
    const u = { ...l.attrs };
    delete u.dir, e.setNodeMarkup(a, void 0, u);
  }), !0;
}, kf = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ol(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Mt(n, r.schema)), l === "mark" && (s = vn(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((u) => {
    const c = u.$from.pos, d = u.$to.pos;
    let f, h, m, y;
    t.selection.empty ? r.doc.nodesBetween(c, d, (b, x) => {
      o && o === b.type && (a = !0, m = Math.max(x, c), y = Math.min(x + b.nodeSize, d), f = x, h = b);
    }) : r.doc.nodesBetween(c, d, (b, x) => {
      x < c && o && o === b.type && (a = !0, m = Math.max(x, c), y = Math.min(x + b.nodeSize, d), f = x, h = b), x >= c && x <= d && (o && o === b.type && (a = !0, i && t.setNodeMarkup(x, void 0, {
        ...b.attrs,
        ...e
      })), s && b.marks.length && b.marks.forEach((O) => {
        if (s === O.type && (a = !0, i)) {
          const w = Math.max(x, c), k = Math.min(x + b.nodeSize, d);
          t.addMark(w, k, s.create({
            ...O.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((b) => {
      s === b.type && i && t.addMark(m, y, s.create({
        ...b.attrs,
        ...e
      }));
    }));
  }), a;
}, Sf = new Yt("__tiptap_decorations__"), Nf = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Sf, {
  type: "force",
  name: n
}), !0), Tf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Mt(n, t.schema);
  return Wu(i, e)(t, r);
}, Cf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Mt(n, t.schema);
  return qu(i, e)(t, r);
};
var Ef = /* @__PURE__ */ zc({
  blur: () => Qu,
  clearContent: () => Zu,
  clearNodes: () => ed,
  command: () => td,
  createParagraphNear: () => nd,
  cut: () => rd,
  deleteCurrentNode: () => id,
  deleteNode: () => od,
  deleteRange: () => sd,
  deleteSelection: () => cd,
  enter: () => ud,
  exitCode: () => dd,
  extendMarkRange: () => hd,
  first: () => pd,
  focus: () => yd,
  forEach: () => xd,
  insertContent: () => bd,
  insertContentAt: () => vd,
  insertDefaultBlock: () => wd,
  joinBackward: () => Nd,
  joinDown: () => Sd,
  joinForward: () => Td,
  joinItemBackward: () => Cd,
  joinItemForward: () => Ed,
  joinTextblockBackward: () => Md,
  joinTextblockForward: () => Ad,
  joinUp: () => kd,
  keyboardShortcut: () => Id,
  lift: () => $d,
  liftEmptyBlock: () => Dd,
  liftListItem: () => Ld,
  newlineInCode: () => Pd,
  resetAttributes: () => Od,
  scrollIntoView: () => zd,
  selectAll: () => Fd,
  selectNodeBackward: () => Bd,
  selectNodeForward: () => Hd,
  selectParentNode: () => _d,
  selectTextblockEnd: () => jd,
  selectTextblockStart: () => Wd,
  setContent: () => Kd,
  setMark: () => rf,
  setMeta: () => of,
  setNode: () => sf,
  setNodeSelection: () => lf,
  setTextDirection: () => af,
  setTextSelection: () => cf,
  sinkListItem: () => uf,
  splitBlock: () => df,
  splitListItem: () => ff,
  toggleList: () => pf,
  toggleMark: () => mf,
  toggleNode: () => gf,
  toggleWrap: () => yf,
  undoInputRule: () => xf,
  unsetAllMarks: () => bf,
  unsetMark: () => vf,
  unsetTextDirection: () => wf,
  updateAttributes: () => kf,
  updateDecorations: () => Nf,
  wrapIn: () => Tf,
  wrapInList: () => Cf
});
typeof process < "u" && process.env.NODE_ENV;
function Mf(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Mr(n) {
  return Mf(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Hl(n, e) {
  const t = { ...n };
  return Mr(n) && Mr(e) && Object.keys(e).forEach((r) => {
    Mr(e[r]) && Mr(n[r]) ? t[r] = Hl(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var _l = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Ri(dr(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Ri(dr(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Hl(this.options, n)
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
}, Af = class jl extends _l {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new jl(t);
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
}, _t = class Wl extends _l {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Wl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
_t.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new cn({
      key: new Yt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Gd(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((a, u) => a.$from.pos - u.$from.pos).map(({ $from: a, $to: u }) => Xd(r, {
          from: a.pos,
          to: u.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
_t.create({
  name: "commands",
  addCommands() {
    return { ...Ef };
  }
});
_t.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const a = Vd(n.before, [n, ...e]);
      ef(a).forEach((c) => {
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
        if (c instanceof Kt) {
          var f, h;
          const m = u.slice(d).map(c.from, -1), y = u.slice(d).map(c.to), b = u.invert().map(m, -1), x = u.invert().map(y), O = m > 0 ? (f = a.doc.nodeAt(m - 1)) === null || f === void 0 ? void 0 : f.marks.some((k) => k.eq(c.mark)) : !1, w = (h = a.doc.nodeAt(y)) === null || h === void 0 ? void 0 : h.marks.some((k) => k.eq(c.mark));
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
              to: y
            },
            partial: !!(w || O),
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
_t.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new cn({
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
_t.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new cn({
      key: new Yt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Rf = new Yt("focusEvents");
_t.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new cn({
      key: Rf,
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
_t.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: u } = l, { empty: c, $anchor: d } = a, { pos: f, parent: h } = d, m = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, y = m.parent.type.spec.isolating, b = d.pos - d.parentOffset, x = y && m.parent.childCount === 1 ? b === d.pos : Bn.atStart(u).from === f;
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
    return Kr() || Pl() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new cn({
      key: new Yt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = Bn.atStart(e.doc).from, u = Bn.atEnd(e.doc).to;
        if (o || !(s === a && l === u) || !Fl(t.doc)) return;
        const c = t.tr, d = Tl({
          state: t,
          transaction: c
        }), { commands: f } = new Gu({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!c.steps.length)
          return c;
      }
    })];
  }
});
_t.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new cn({
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
_t.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new cn({
      key: new Yt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
_t.create({
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
      key: new Yt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const If = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), $f = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Df = /^(https?:\/\/|mailto:)/i;
function Lf(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    $f.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function Ii(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(Ii(a));
    return l;
  };
  if (!If.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Df.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Lf(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Ii(l));
  return i;
}
function ql(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Pf(n) {
  const e = ql(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Ii(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function fp(n) {
  const e = ql(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function hp(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Of(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function jo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const zf = { text: "#52525b" }, Ff = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, a = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, u = (a == null ? void 0 : a.color) ?? zf, c = (a == null ? void 0 : a.label) ?? `{{${s}}}`, d = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ p(
    ha,
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
        const y = i.state.doc.resolve(m), b = y.nodeAfter;
        b && qn.isSelectable(b) && i.dispatch(i.state.tr.setSelection(new qn(y))), (x = l.onTokenClick) == null || x.call(l, s, h.currentTarget.getBoundingClientRect(), m);
      },
      children: d ? /* @__PURE__ */ p("span", { className: "rt-token-nested", children: c }) : c
    }
  );
}, Bf = Ea.extend({
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
    return fa(Ff);
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
    return ["span", da({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), Hf = 240, _f = 280, jf = ({ props: n, onApi: e }) => {
  const t = Zr(), r = v(e);
  r.current = e, ce(() => {
    r.current(t);
  }, [t]);
  const i = v(null);
  ce(() => {
    var s;
    t.pointerDriven || an((s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"));
  }, [t.highlightedIndex, t.pointerDriven]), ce(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Qr();
  return /* @__PURE__ */ p(pr.Provider, { value: t, children: /* @__PURE__ */ p(
    "div",
    {
      role: "listbox",
      "data-token-popup": !0,
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: _f, maxHeight: Hf },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ p("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ p(
        Wf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Wf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Rs({
    label: () => n.label,
    activate: t
  }), s = Je(), l = { padding: `${_(8, 12, s)}px ${_(12, 16, s)}px`, fontSize: _(12, 14, s) };
  return /* @__PURE__ */ R(
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
}, Wo = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ p(jf, { props: r, onApi: (i) => {
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
      const o = Ma(i);
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
        if (l === "Enter" && Vt(r)) return !1;
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
}, qf = Af.create({
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
}), $r = new Yt("retainedSelectionHighlight"), Kf = _t.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new cn({
        key: $r,
        state: {
          init: () => ({ held: !1, decorations: yr.empty }),
          apply(n, e) {
            const t = n.getMeta($r), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: yr.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? yr.empty : yr.create(n.doc, [ya.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = $r.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), pp = {
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
function Kl(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Jf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Kl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Vf = Xe.forwardRef(({
  value: n,
  onChange: e,
  placeholder: t,
  disabled: r,
  className: i,
  label: o,
  labelledBy: s,
  onStateChange: l,
  resolveToken: a,
  suggestionItems: u,
  attributeItems: c,
  onTokenClick: d,
  onSelectionChange: f
}, h) => {
  const m = Ot(), y = (m == null ? void 0 : m.mode) ?? "dark", b = (m == null ? void 0 : m.accent) ?? "zinc", x = v(a);
  x.current = a;
  const O = v(u);
  O.current = u;
  const w = v(c);
  w.current = c;
  const k = v(d);
  k.current = d;
  const C = v(f);
  C.current = f;
  const S = v(null), B = v(null), K = v(e);
  K.current = e;
  const N = v(r);
  N.current = r;
  const W = v(l);
  W.current = l;
  const I = v(null), Z = (D) => {
    var $;
    const F = D.getAttributes("textStyle"), E = D.getAttributes("reportTextStyle"), { from: ee, to: J, empty: ge } = D.state.selection;
    let xe = !1, le = !1, be = !1;
    if (!ge) {
      const q = /* @__PURE__ */ new Set(), Ce = /* @__PURE__ */ new Set(), Ne = /* @__PURE__ */ new Set();
      D.state.doc.nodesBetween(ee, J, (Fe) => {
        if (!Fe.isText) return;
        const oe = Fe.marks.find((Ee) => Ee.type.name === "textStyle");
        q.add((oe == null ? void 0 : oe.attrs.fontFamily) || ""), Ce.add((oe == null ? void 0 : oe.attrs.fontSize) || "");
        const Se = Fe.marks.find((Ee) => Ee.type.name === "reportTextStyle");
        Ne.add((Se == null ? void 0 : Se.attrs.styleId) || "");
      }), xe = q.size > 1, le = Ce.size > 1, be = Ne.size > 1;
    }
    const X = {
      bold: D.isActive("bold"),
      italic: D.isActive("italic"),
      underline: D.isActive("underline"),
      strike: D.isActive("strike"),
      link: D.isActive("link"),
      color: F.color || "",
      fontFamily: F.fontFamily || "",
      fontSize: F.fontSize || "",
      textStyle: E.styleId || "",
      hasSelection: !ge,
      fontFamilyMixed: xe,
      fontSizeMixed: le,
      textStyleMixed: be
    }, P = I.current;
    P && P.bold === X.bold && P.italic === X.italic && P.underline === X.underline && P.strike === X.strike && P.link === X.link && P.color === X.color && P.fontFamily === X.fontFamily && P.fontSize === X.fontSize && P.textStyle === X.textStyle && P.hasSelection === X.hasSelection && P.fontFamilyMixed === X.fontFamilyMixed && P.fontSizeMixed === X.fontSizeMixed && P.textStyleMixed === X.textStyleMixed || (I.current = X, ($ = W.current) == null || $.call(W, X));
  }, te = (D) => {
    var ge;
    const F = D.state.selection;
    let E = null;
    F instanceof qn && F.node.type.name === "token" ? (E = { key: F.node.attrs.field ?? "", pos: F.from }, S.current = F.from) : S.current != null && (S.current = D.state.tr.mapping.map(S.current));
    const ee = B.current, J = ee && E && ee.key === E.key && ee.pos === E.pos;
    !ee && !E || J || (B.current = E, (ge = C.current) == null || ge.call(C, E));
  }, U = (D) => {
    const F = Pf(Of(D));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(F) ? "" : F;
  }, re = Xe.useMemo(() => {
    const D = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: ee }) => {
        var J;
        return ((J = O.current) == null ? void 0 : J.call(O, ee)) ?? [];
      },
      command: ({ editor: ee, range: J, props: ge }) => {
        ee.chain().focus().insertContentAt(J, { type: "token", attrs: { field: ge.field } }).run();
      },
      render: Wo
    }, F = Bf.configure({
      resolve: x.current ?? null,
      suggestion: D,
      onTokenClick: (ee, J, ge) => {
        var xe;
        S.current = ge, (xe = k.current) == null || xe.call(k, ee, J, ge);
      }
    }), E = _t.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Ca({
            pluginKey: new Yt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: ee, range: J }) => Kl(ee, J.from) != null,
            items: ({ editor: ee, query: J }) => {
              var xe;
              const ge = Jf(ee);
              return ge ? ((xe = w.current) == null ? void 0 : xe.call(w, ge.chipKey, J)) ?? [] : [];
            },
            command: ({ editor: ee, range: J, props: ge }) => {
              ee.chain().focus().insertContentAt(J, { type: "token", attrs: { field: ge.field } }).run();
            },
            render: Wo
          })
        ];
      }
    });
    return [F, E];
  }, []), ke = Xe.useMemo(() => {
    if (!(!o && !s))
      return {
        role: "textbox",
        "aria-multiline": "true",
        ...s ? { "aria-labelledby": s } : { "aria-label": o ?? "" }
      };
  }, [o, s]), ue = Xe.useMemo(
    () => ke ? { attributes: ke } : void 0,
    [ke]
  ), M = pa({
    immediatelyRender: !1,
    /* TipTap owns the editable node; `editorProps.attributes` is its supported
       hook for ARIA. An unnamed rich-text region is announced as a bare
       "textbox" — consumers pass the block's name ("Notes", "Call sheet
       prose"). */
    ...ue ? { editorProps: ue } : {},
    extensions: [
      xa,
      ba.configure({ placeholder: t }),
      va,
      wa,
      ka,
      qf,
      Kf,
      Sa,
      Ta,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Na.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...re
    ],
    content: jo(n || ""),
    editable: !r,
    onUpdate: ({ editor: D }) => {
      K.current(U(D.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: D }) => {
      Z(D), te(D);
    }
  });
  return ce(() => {
    if (!M || M.isFocused) return;
    U(M.getHTML()) !== n && (I.current = null, M.commands.setContent(jo(n || ""), { emitUpdate: !1 }), Z(M));
  }, [n, M]), ce(() => {
    M && M.setEditable(!r);
  }, [r, M]), ce(() => {
    M && (I.current = null, Z(M), te(M));
  }, [M]), Yo(h, () => ({
    exec: (D, F, E) => {
      if (!M || N.current) return;
      const ee = M.chain(), J = (E == null ? void 0 : E.focus) === !1 ? ee : ee.focus();
      switch (D) {
        case "bold":
          J.toggleBold().run();
          break;
        case "italic":
          J.toggleItalic().run();
          break;
        case "underline":
          J.toggleUnderline().run();
          break;
        case "strikeThrough":
          J.toggleStrike().run();
          break;
        case "foreColor":
          F && J.setColor(F).run();
          break;
        case "unsetColor":
          J.unsetColor().run();
          break;
        case "fontFamily":
          F && J.setFontFamily(F).run();
          break;
        case "unsetFontFamily":
          J.unsetFontFamily().run();
          break;
        case "fontSize":
          F && J.setFontSize(F).run();
          break;
        case "unsetFontSize":
          J.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          F && J.setMark("reportTextStyle", { styleId: F }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          J.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          J.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          F && J.extendMarkRange("link").setLink({ href: F }).run();
          break;
        case "unlink":
          J.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (D) => M == null ? void 0 : M.commands.focus(D),
    insertToken: (D) => {
      !M || N.current || M.chain().focus().insertContent({ type: "token", attrs: { field: D } }).run();
    },
    replaceToken: (D) => {
      if (!M || N.current) return;
      const F = S.current;
      F != null && M.commands.command(({ tr: E }) => {
        const ee = E.doc.nodeAt(F);
        if (!ee || ee.type.name !== "token") return !1;
        E.setNodeMarkup(F, void 0, { field: D });
        const J = E.doc.resolve(F);
        return J.nodeAfter && J.nodeAfter.type.name === "token" && E.setSelection(new qn(J)), !0;
      });
    },
    holdSelectionHighlight: (D) => {
      !M || M.isDestroyed || M.view.dispatch(M.state.tr.setMeta($r, { held: D }));
    }
  }), [M]), /* @__PURE__ */ p("div", { "data-mode": y, "data-accent": b, className: "contents", children: /* @__PURE__ */ p(ma, { editor: M, className: `richtext-editor ${i || ""}` }) });
});
Vf.displayName = "RichTextEditor";
const Yf = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Uf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], qo = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ p("span", { className: `${n} rounded-full border border-[color:var(--ui-input-border)] relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ p("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-[var(--ui-text-muted)] -rotate-45" }) }), Xf = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = se(!1), s = Ot();
  s == null || s.mode;
  const l = Gr(s);
  return /* @__PURE__ */ p(
    ei,
    {
      open: i,
      onOpenChange: o,
      theme: l,
      width: "w-44",
      trigger: /* @__PURE__ */ R("button", { type: "button", disabled: e, className: `${Lc} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ p("span", { className: "truncate italic text-[color:var(--ui-text-faint)]", children: "Mixed" }) : /* @__PURE__ */ p("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ p(gn, { className: "w-3 h-3 text-[color:var(--ui-text-faint)] shrink-0" })
      ] }),
      children: Yf.map((a) => /* @__PURE__ */ p(Is, { onClick: () => {
        t(a), o(!1);
      }, icon: !r && a === n ? /* @__PURE__ */ p(fr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ p("span", { style: { fontFamily: a }, children: a }) }, a))
    }
  );
}, Gf = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = se(!1), o = ti(), s = Ot(), l = (s == null ? void 0 : s.mode) ?? "dark", a = Gr(s), [u, c] = se(""), d = () => {
    var h;
    const f = u.trim();
    f && ((h = n.current) == null || h.exec("link", f), i(!1));
  };
  return /* @__PURE__ */ p(
    ei,
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
          children: /* @__PURE__ */ p(ia, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ R("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ p(
          "input",
          {
            value: u,
            onChange: (f) => c(f.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (f) => {
              if (f.key === "Enter") {
                if (f.preventDefault(), Vt(f)) return;
                d();
              }
            },
            style: o.input,
            className: $c + " w-full"
          }
        ),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
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
}, mp = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: a = !0 }) => {
  const [u, c] = se(!1), d = (w, k) => {
    var C;
    return (C = n.current) == null ? void 0 : C.exec(w, k);
  }, f = ti(), h = Ot(), m = (h == null ? void 0 : h.mode) ?? "dark", y = Gr(h), b = (w) => !!(r != null && r[w]), x = "flex items-center gap-1 shrink-0", O = a ? /* @__PURE__ */ p("div", { className: Ps }) : null;
  return /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ R("div", { className: x, children: [
      /* @__PURE__ */ p(Pn, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || b("bold"), disabled: e || b("bold"), onMouseDown: (w) => w.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ p(Pn, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || b("italic"), disabled: e || b("italic"), onMouseDown: (w) => w.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ p(Pn, { content: "Underline", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (w) => w.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(ta, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ p(Pn, { content: "Strikethrough", children: /* @__PURE__ */ p(Lt, { theme: m, "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (w) => w.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(na, { className: "w-3 h-3" }) }) })
    ] }),
    O,
    /* @__PURE__ */ p("div", { className: x, children: /* @__PURE__ */ p(Gf, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    O,
    /* @__PURE__ */ p("div", { className: x, children: /* @__PURE__ */ p(
      ei,
      {
        open: u,
        onOpenChange: c,
        theme: y,
        width: "w-36",
        trigger: /* @__PURE__ */ R(Lt, { theme: m, disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ p("span", { className: "w-3 h-3 rounded-full border border-[color:var(--ui-input-border)] shrink-0", style: { background: t.color } }) : /* @__PURE__ */ p(qo, {}),
          /* @__PURE__ */ p(gn, { className: "w-3 h-3 text-[color:var(--ui-text-faint)]" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                d("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-[color:var(--ui-input-border)] hover:border-[var(--ui-input-focus-border)] transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-[var(--ui-check-ring)]"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ p(qo, { className: "w-3.5 h-3.5" })
            }
          ),
          Uf.map((w) => /* @__PURE__ */ p(
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
    (o || s || l) && /* @__PURE__ */ R(dt, { children: [
      O,
      /* @__PURE__ */ R("div", { className: x, children: [
        o && /* @__PURE__ */ p(Xf, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
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
            children: /* @__PURE__ */ p(ra, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ R(dt, { children: [
      O,
      /* @__PURE__ */ p("div", { className: x, children: i })
    ] })
  ] });
};
function io(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Qf(n, e, t, r, i) {
  return io(n + e * i, t, r);
}
const Zf = 2;
function eh(n, e, t, r, i) {
  return io(n + Math.trunc(e / Zf) * i, t, r);
}
const th = 3;
function gp({
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
  const [h, m] = se(null), [y, b] = se(!1), x = v(!1), O = v(null), w = v(null), k = v(null), C = Je(), S = Ds(), B = u === void 0;
  ce(() => () => {
    var M;
    return (M = O.current) == null ? void 0 : M.call(O);
  }, []), rt(() => {
    const M = k.current, D = w.current;
    !B && M && D && (D.style.color = getComputedStyle(M).color);
  }, [B, u]), ce(() => {
    x.current || m(null);
  }, [n]);
  const K = n ?? r, N = h !== null ? h : n != null ? String(n) : d ? "" : String(r), W = (M) => io(M, e, t), I = (M) => {
    const D = Qf(K, M, e, t, o);
    D !== K && (x.current && m(String(D)), i(D));
  }, Z = (M) => {
    if (l || s || M.pointerType !== "mouse" || M.button !== 0) return;
    const D = M.currentTarget, F = M.clientY, E = K;
    let ee = E, J = !1;
    const ge = (le) => {
      const be = F - le.clientY;
      if (!J) {
        if (Math.abs(be) < th) return;
        J = !0, D.blur(), D.style.userSelect = "none";
      }
      const X = eh(E, be, e, t, o);
      X !== ee && (ee = X, i(X));
    }, xe = () => {
      O.current = null, window.removeEventListener("pointermove", ge), window.removeEventListener("pointerup", xe), window.removeEventListener("pointercancel", xe), D.style.userSelect = "", J && D.blur();
    };
    O.current = xe, window.addEventListener("pointermove", ge), window.addEventListener("pointerup", xe), window.addEventListener("pointercancel", xe);
  }, te = (M) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": M === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (M === 1 ? K >= t : K <= e),
    /* Keep the input's focus (desktop) WITHOUT killing the tap: WebKit
       suppresses the click when a pointerdown's default is cancelled, so an
       iPhone/iPad stepper tap went dead. `mousedown` preserves the focus but
       does not cancel the click. */
    onMouseDown: (D) => D.preventDefault(),
    onClick: () => I(M)
  }), U = B ? _(22, 30, C) : _(16, 22, C), re = B ? _(14, 18, C) : _(11, 15, C), ke = Math.max(0, Math.ceil((24 - (U - 2)) / 2)), ue = Math.round(_(11, 5, C));
  return /* @__PURE__ */ R(
    "span",
    {
      ref: w,
      className: `ui-number ${B ? "ui-number-box" : ""}`,
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
            value: N,
            readOnly: s,
            disabled: l,
            className: u ?? "ui-input w-20",
            style: {
              ...B ? { ...S, minHeight: _(28, 36, C) } : {},
              paddingRight: U + 2,
              cursor: l || s ? void 0 : y ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, b(!0);
            },
            onChange: (M) => {
              const D = M.target.value;
              m(D);
              const F = parseInt(D, 10);
              D !== "" && !Number.isNaN(F) && i(W(F));
            },
            onBlur: () => {
              if (x.current = !1, b(!1), h === null) return;
              const M = parseInt(h, 10);
              Number.isNaN(M) || i(W(M)), m(null);
            },
            onKeyDown: (M) => {
              if (M.key === "Enter") {
                if (Vt(M)) return;
                M.target.blur();
              }
              M.key === "Escape" && (m(null), M.target.blur()), !s && !l && (M.key === "ArrowUp" || M.key === "ArrowDown") && (M.preventDefault(), I(M.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: Z
          }
        ),
        /* @__PURE__ */ R(
          "span",
          {
            className: "ui-number-steppers",
            style: {
              width: U,
              "--ui-number-step-hit-x": `${ke}px`,
              "--ui-number-step-overhang": `${ue}px`
            },
            children: [
              /* @__PURE__ */ p("button", { ...te(1), className: "ui-number-step", children: /* @__PURE__ */ p(oa, { style: { width: re, height: re } }) }),
              /* @__PURE__ */ p("button", { ...te(-1), className: "ui-number-step", children: /* @__PURE__ */ p(gn, { style: { width: re, height: re } }) })
            ]
          }
        )
      ]
    }
  );
}
function yp({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: u, children: c }) {
  const d = Je(), f = yn({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = _(14, 16, d), m = { width: h, height: h }, y = _(10, 12, d);
  return /* @__PURE__ */ R("div", { ...u, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: f, children: [
      /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ p(Dr, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ p(gn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
            e && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ p("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: n }),
            t && /* @__PURE__ */ p("span", { className: "ui-card-count shrink-0", style: { fontSize: y }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "shrink-0", children: s })
    ] }),
    !i && c && /* @__PURE__ */ p("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: c })
  ] });
}
function oo({
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
  const d = v(null), f = v(null), [h, m] = se(null), y = (S) => {
    d.current = S, typeof o == "function" ? o(S) : o && (o.current = S);
  };
  rt(() => {
    if (n) return;
    const S = d.current;
    if (!S || (f.current = S.getBoundingClientRect().width, typeof ResizeObserver > "u")) return;
    const B = new ResizeObserver(() => {
      f.current = S.getBoundingClientRect().width;
    });
    return B.observe(S), () => B.disconnect();
  }, [n]), rt(() => {
    if (!n || e !== "auto") {
      m(null);
      return;
    }
    m(f.current);
    const S = requestAnimationFrame(() => m(null));
    return () => cancelAnimationFrame(S);
  }, [n, e]);
  const [b, x] = se(!1), [O, w] = se(null), k = v(!1);
  rt(() => {
    if (n) {
      k.current = !0, x(!1), w(null);
      return;
    }
    if (!k.current || e !== "auto") return;
    k.current = !1, x(!0);
    let S = 0, B = 0;
    return (() => {
      var I;
      const N = (I = d.current) == null ? void 0 : I.firstElementChild, W = (N == null ? void 0 : N.getBoundingClientRect().width) ?? 0;
      W > 0 ? (S = requestAnimationFrame(() => w(W)), B = window.setTimeout(() => {
        x(!1), w(null);
      }, Tt + 30)) : x(!1);
    })(), () => {
      cancelAnimationFrame(S), window.clearTimeout(B);
    };
  }, [n, e]);
  const C = n ? h ?? t : b ? O ?? t : e === "auto" ? "auto" : e;
  return /* @__PURE__ */ R(
    "div",
    {
      ...c,
      ref: y,
      className: `relative ${l ? "flex" : "inline-flex"} ${s ? "shrink-0" : ""} ${a}`,
      style: {
        ...u,
        width: l ? "100%" : C,
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
function nh({
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
  stretch: y = !1,
  actions: b,
  leadingIcon: x,
  showClear: O = !0,
  onSubmit: w,
  onCancel: k,
  cancelOnEscape: C = !1,
  cancelOnOutside: S = !1,
  className: B = "",
  "aria-label": K
}) {
  const [N, W] = se(h), I = v(N);
  I.current = N;
  const Z = v(null), te = v(null), U = v(null), re = ns(), ke = Je(), ue = _(9, 13, ke), M = ae((P) => {
    I.current !== P && (I.current = P, W(P), m == null || m(P));
  }, [m]), D = ae((P = !1) => {
    var $;
    M(!1), ($ = te.current) == null || $.blur(), P && requestAnimationFrame(() => {
      var q;
      return (q = U.current) == null ? void 0 : q.focus();
    });
  }, [M]), F = ae(() => {
    M(!0);
    const P = te.current;
    if (P) {
      P.focus({ preventScroll: !0 });
      const $ = P.value.length;
      P.setSelectionRange($, $);
    }
  }, [M]);
  ce(() => {
    h && F();
  }, [h, F]), ce(() => {
    var q;
    if (!N) return;
    const P = ((q = Z.current) == null ? void 0 : q.ownerDocument) ?? document, $ = (Ce) => {
      var Fe;
      const Ne = Ce.target;
      Ne && ((Fe = Z.current) != null && Fe.contains(Ne) || (S && (k == null || k()), D()));
    };
    return P.addEventListener("pointerdown", $, !0), () => P.removeEventListener("pointerdown", $, !0);
  }, [N, D, S, k]);
  const E = ae((P) => {
    var q;
    if (!N) return;
    const $ = P.relatedTarget;
    $ && ((q = Z.current) != null && q.contains($)) || (S && (k == null || k()), D());
  }, [N, D, S, k]), ee = ae((P) => {
    if (P.key === "Enter") {
      if (P.preventDefault(), Vt(P)) return;
      w == null || w(n), D(!0);
      return;
    }
    P.key === "Escape" && (P.preventDefault(), P.stopPropagation(), C ? k == null || k() : e(""), D(!0));
  }, [e, D, C, k, w, n]), J = r === void 0 ? /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5" }) : r, ge = x === void 0 ? J : x, be = 8 + (((b == null ? void 0 : b.length) || 0) + (O && n ? 1 : 0)) * (re.box + 2), X = (P) => /* @__PURE__ */ p(
    "span",
    {
      style: { width: re.icon, height: re.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: P
    }
  );
  return /* @__PURE__ */ p(
    oo,
    {
      expanded: N,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: Z,
      shrink: !0,
      stretch: y,
      "data-morph-search": !0,
      "data-theme": d,
      "data-expanded": N ? "true" : "false",
      className: B,
      onBlur: E,
      trigger: /* @__PURE__ */ p(
        Lt,
        {
          ref: U,
          type: "button",
          variant: l,
          size: "minimal",
          theme: d,
          icon: J,
          collapse: a,
          iconWithLabel: u,
          revealOnHover: c,
          active: f,
          keepLabelOnActive: !0,
          onClick: F,
          className: `${a ? "w-auto" : "w-full"} ${y ? "justify-center" : "justify-start"} ${N ? "pointer-events-none" : ""}`,
          tabIndex: N ? -1 : 0,
          "aria-expanded": N,
          "aria-label": K || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: `min-w-0 ${a ? "" : "truncate"}`, children: t })
        }
      ),
      field: /* @__PURE__ */ R(dt, { children: [
        ge && /* @__PURE__ */ p(
          "span",
          {
            className: "ui-icon absolute top-1/2 -translate-y-1/2 pointer-events-none",
            style: { left: ue, width: re.icon, height: re.icon },
            children: X(ge)
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            ref: te,
            value: n,
            onChange: (P) => e(P.target.value),
            onKeyDown: ee,
            placeholder: i,
            "aria-label": K || i,
            tabIndex: N ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: ge ? ue + re.icon + 6 : 10, paddingRight: be },
            className: `${zr("sm")} w-full`
          }
        ),
        /* @__PURE__ */ R("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          b == null ? void 0 : b.map((P) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": P.label,
              title: P.label,
              tabIndex: N ? 0 : -1,
              onMouseDown: ($) => $.preventDefault(),
              onClick: () => {
                P.onClick(n, { close: () => D(!0) }), P.keepOpen || D(!0);
              },
              style: { width: re.box, height: re.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": P.key,
              children: X(P.icon)
            },
            P.key
          )),
          O && n && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: N ? 0 : -1,
              onClick: () => {
                var P;
                e(""), (P = te.current) == null || P.focus({ preventScroll: !0 });
              },
              style: { width: re.box, height: re.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ p(Cn, { size: re.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function xp({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ p(Vr, { className: "w-3.5 h-3.5" }),
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
  }, y = () => {
    o == null || o(), l && a("");
  }, b = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ p(fr, { className: "w-3.5 h-3.5" }),
      onClick: m
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ p(Cn, { className: "w-3.5 h-3.5" }),
      onClick: y
    }] : []
  ];
  return /* @__PURE__ */ p(
    nh,
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
      onCancel: o ? y : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function rh(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function ih(n, e, t) {
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
function Jl(n, e, t) {
  const r = rh(t), i = r.length > 0, o = new Map(e.map((u) => [u.key, u])), s = [];
  for (const u of n) {
    const { matched: c, detail: d } = ih(u, u.group ? o.get(u.group) : void 0, r);
    c && s.push({ item: u, detail: d });
  }
  const l = new Set(s.map((u) => u.item.group).filter(Boolean)), a = i ? e.filter((u) => l.has(u.key) || u.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: a, hasQuery: i };
}
function oh(n) {
  var c;
  const { hits: e, visibleGroups: t, hasQuery: r } = Jl(n.items, n.groups, n.query), i = [];
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
function sh({
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
  expandableGroups: y = !1,
  browseExpanded: b = !1,
  groupExpandMode: x = "multiple",
  browseAll: O = !1,
  selectedId: w,
  autoFocus: k = !0,
  collapsedWidth: C = 128,
  expandedWidth: S = 288,
  panelWidth: B,
  panelMinWidth: K,
  keepAllRows: N = !1,
  maxMenuHeight: W = 420,
  theme: I = "light",
  morph: Z = !0,
  emptyTitle: te,
  emptyHint: U,
  renderEmpty: re,
  emptyActions: ke,
  leadingActions: ue,
  hideLeadingOnEmpty: M = !1,
  footerActions: D,
  fieldActions: F,
  multiple: E,
  open: ee,
  onOpenChange: J,
  hideTrigger: ge = !1,
  anchorRef: xe,
  portalTarget: le,
  renderTrigger: be,
  renderItem: X,
  highlightOnOpen: P = !0,
  ref: $
}) {
  const q = a !== void 0, Ce = $i(), [Ne, Fe] = se(""), oe = q ? a : Ne, Se = ae((g) => {
    q || Fe(g), u == null || u(g);
  }, [q, u]), Ee = ee !== void 0, [H, L] = se(!1), Y = Ee ? ee : H, Re = ae((g) => {
    Ee || L(g), J == null || J(g);
  }, [Ee, J]), [ve, ft] = se(t === "inline"), Me = lt(() => e.map((g) => g.key).join("\0"), [e]), Ye = lt(() => new Set(Me ? Me.split("\0") : []), [Me]), [je, Le] = se(() => b ? Ye : /* @__PURE__ */ new Set()), [it, un] = se(0), jt = v(!1), Ct = v(null), gt = v(null), Ie = ae((g, z = "keyboard") => {
    jt.current = z === "pointer", un(g);
  }, []), ct = v(null), bt = v(null), vt = v(null), wt = v(null), We = v(null), ht = v(0), yt = Li(), tn = Yn(), ut = Qr(), $t = Wi(), Dt = Cs(), A = ns(), ye = 8 + (((F == null ? void 0 : F.length) || 0) + (oe ? 1 : 0)) * (A.box + 2), [qe, ot] = se({ top: 0, left: 0, maxH: 288, ready: !1 }), [Et, Rt] = se(0);
  fs({
    anchorRef: xe ?? ct,
    panelRef: wt,
    open: Y,
    maxHeight: W,
    anchorRectRef: We,
    onPosition: (g) => ot({ top: g.top, left: g.left, maxH: g.maxH, ready: g.ready })
  }), ce(() => {
    const g = (xe == null ? void 0 : xe.current) ?? ct.current;
    !Y || !g || Rt(g.getBoundingClientRect().width);
  }, [Y, ve, xe]);
  const [T, ne] = se(!1);
  ce(() => {
    Y && ne(!0);
  }, [Y]);
  const fe = Xr({
    visible: Y,
    morph: Z,
    anchor: () => {
      var g;
      return ((g = (xe == null ? void 0 : xe.current) ?? ct.current) == null ? void 0 : g.getBoundingClientRect()) ?? null;
    },
    ref: wt,
    cloneOnUnmount: !0,
    onClosed: () => ne(!1)
  }), we = (ke || []).map(
    (g) => typeof g.label == "function" ? g.label(oe) : g.label
  ), pe = lt(
    () => oh({
      items: n,
      groups: e,
      /* show-all mode: the query only moves the highlight, every option stays
         in the list (the old I/E + D/N autocomplete contract). */
      query: N ? "" : oe,
      browseGroups: m || b || y,
      browseAll: O,
      expandedGroups: je,
      emptyActionLabels: we
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, oe, N, m, b, y, O, je, we.join("\0")]
  ), $e = lt(
    () => (ue || []).map((g, z) => ({
      kind: "action",
      label: typeof g.label == "function" ? g.label(oe) : g.label,
      actionIndex: z,
      source: "leading"
    })),
    [ue, oe]
  ), Be = lt(
    () => (D || []).map((g, z) => ({
      kind: "action",
      label: typeof g.label == "function" ? g.label(oe) : g.label,
      actionIndex: z,
      source: "footer"
    })),
    [D, oe]
  ), Pe = pe.some((g) => g.kind === "empty"), Ge = $e.length > 0 && !(M && Pe), Qe = Ge ? $e.length : 0, Ke = lt(
    () => [...Ge ? $e : [], ...pe, ...Be],
    [Ge, $e, pe, Be]
  ), Ut = !!d || y && !oe.trim(), Ve = lt(
    () => Ke.map((g, z) => ({ row: g, index: z })).filter((g) => !(g.row.kind === "empty" || g.row.kind === "item" && g.row.hidden || g.row.kind === "group" && !Ut)),
    [Ke, Ut]
  ), It = (y || b) && !oe.trim(), nn = Y && it >= 0 && Ve.some((g) => g.index === it) ? `${Ce}-opt-${it}` : void 0, tt = !!E, wn = lt(
    () => n.filter((g) => g.checkable !== !1).map((g) => g.id),
    [n]
  ), Wt = lt(() => oe.trim() ? Jl(n, e, oe).hits.filter((g) => g.item.checkable !== !1).map((g) => g.item.id) : wn, [n, e, oe, wn]), dn = lt(() => new Set(Wt), [Wt]), De = vs({
    mode: (E == null ? void 0 : E.mode) ?? "draft",
    selectedIds: (E == null ? void 0 : E.selectedIds) ?? ks,
    itemIds: wn,
    visibleIds: Wt,
    max: E == null ? void 0 : E.max,
    disabledIds: E == null ? void 0 : E.disabledIds,
    indicator: E == null ? void 0 : E.indicator,
    onCommit: E == null ? void 0 : E.onCommit,
    onDraftChange: E == null ? void 0 : E.onDraftChange,
    onToggle: E == null ? void 0 : E.onToggle
  }), Gn = v(De.reset);
  Gn.current = De.reset;
  const Qn = typeof (E == null ? void 0 : E.commitLabel) == "function" ? E.commitLabel(De.count) : (E == null ? void 0 : E.commitLabel) ?? `Select ${De.count}`, He = ae(() => {
    var g;
    Re(!1), t === "expandable" && ((g = bt.current) == null || g.blur(), ft(!1), requestAnimationFrame(() => {
      var z;
      return (z = vt.current) == null ? void 0 : z.focus();
    })), Ee || Se(""), Ie(0), Le(b ? Ye : /* @__PURE__ */ new Set()), f == null || f();
  }, [t, f, Se, b, Ye, Ee, Re]);
  ce(() => {
    if (oe.trim() || !b) {
      Le((g) => g.size ? /* @__PURE__ */ new Set() : g);
      return;
    }
    Le((g) => g.size === Ye.size && [...Ye].every((z) => g.has(z)) ? g : Ye);
  }, [oe, b, Ye]);
  const Xt = v(!1), rn = v(!1);
  ce(() => {
    if (!Y) {
      Xt.current = !1;
      return;
    }
    if (Xt.current || !y || oe.trim()) return;
    const g = w ? [w] : [...(E == null ? void 0 : E.selectedIds) ?? []], z = new Set(g), Q = z.size ? e.filter((me) => n.some((Ae) => Ae.group === me.key && z.has(Ae.id))).map((me) => me.key) : [];
    if (Q.length === 0) {
      Xt.current = !0;
      return;
    }
    const ie = x === "single" ? Q.slice(0, 1) : Q;
    if (!ie.every((me) => je.has(me))) {
      rn.current = !0, Le(new Set(ie));
      return;
    }
    if (P && w) {
      const me = Ke.findIndex((Ae) => Ae.kind === "item" && Ae.hit.item.id === w);
      me >= 0 && Ie(me);
    }
    Xt.current = !0;
  }, [Y, y, oe, e, n, w, E == null ? void 0 : E.selectedIds, x, je, Ke, P, Ie]);
  const Gt = ae((g) => {
    Le((z) => {
      const Q = new Set(z);
      return Q.has(g) ? Q.delete(g) : (x === "single" && Q.clear(), Q.add(g)), Q;
    });
  }, [x]), qt = ae(() => {
    var z;
    if (Y) {
      (z = bt.current) == null || z.focus();
      return;
    }
    if (Gn.current(), t === "expandable" && !ve) {
      const Q = ct.current;
      if (Q) {
        const ie = Q.style.transition, me = Q.style.width;
        Q.style.transition = "none", Q.style.width = `${S}px`;
        const Ae = Q.getBoundingClientRect();
        We.current = { left: Ae.left, top: Ae.top, width: Ae.width, height: Ae.height }, Q.style.width = me, Q.offsetWidth, Q.style.transition = ie, window.clearTimeout(ht.current), ht.current = window.setTimeout(() => {
          We.current = null;
        }, Tt + 80);
      }
    }
    ft(!0), Re(!0);
    const g = w ? pe.findIndex((Q) => Q.kind === "item" && Q.hit.item.id === w) : -1;
    Ie(g >= 0 ? Qe + g : P ? Qe : -1);
  }, [Y, t, ve, S, Qe, pe, w, P]);
  ce(() => () => {
    window.clearTimeout(ht.current), We.current = null;
  }, []), ce(() => {
    Y || (Ct.current = null), gt.current = null;
  }, [Y, oe]), rt(() => {
    var g;
    t !== "expandable" || !ve || !Y || !k || (g = bt.current) == null || g.focus({ preventScroll: !0 });
  }, [t, ve, Y, k]), ce(() => {
    var Q;
    if (!Y) return;
    const g = ((Q = ct.current) == null ? void 0 : Q.ownerDocument) ?? yt;
    if (!g) return;
    const z = (ie) => {
      var Ae, kt, St, sn;
      const me = ((Ae = ie.composedPath) == null ? void 0 : Ae.call(ie)[0]) ?? ie.target;
      !me || typeof me.nodeType != "number" || (kt = ct.current) != null && kt.contains(me) || (St = wt.current) != null && St.contains(me) || (sn = xe == null ? void 0 : xe.current) != null && sn.contains(me) || He();
    };
    return g.addEventListener("pointerdown", z, !0), () => g.removeEventListener("pointerdown", z, !0);
  }, [Y, He, yt, xe]);
  const Qt = ae((g) => {
    var z;
    if (g.kind === "item" ? Ct.current = g.hit.item.id : (g.kind === "group" || g.kind === "action") && (Ct.current = null), g.kind === "group") {
      if (tt) {
        const Q = (z = E == null ? void 0 : E.groupToken) == null ? void 0 : z.call(E, g.group.key);
        if (Q) {
          De.canToggle(Q) && De.toggle(Q);
          return;
        }
        const ie = n.filter((me) => me.group === g.group.key && me.checkable !== !1 && dn.has(me.id) && !De.isDisabled(me.id)).map((me) => me.id);
        ie.length && De.toggleGroup(ie);
        return;
      }
      d ? (d(g.group), h && He()) : Ut && Gt(g.group.key);
      return;
    }
    if (g.kind === "item") {
      if (tt) {
        if (De.canToggle(g.hit.item.id)) {
          const Q = Ve.findIndex((me) => me.row === g), ie = (me) => {
            const Ae = Ve[me];
            return (Ae == null ? void 0 : Ae.row.kind) === "item" ? Ae.row.hit.item.id : null;
          };
          gt.current = Q < 0 ? null : { up: ie(Q - 1), down: ie(Q + 1) }, De.toggle(g.hit.item.id), Ie(-1, "keyboard");
        }
        return;
      }
      c(g.hit.item), h && He();
      return;
    }
    if (g.kind === "action") {
      const Q = g.source === "leading" ? ue : g.source === "footer" ? D : ke, ie = Q == null ? void 0 : Q[g.actionIndex];
      ie && ie.onClick(oe), h && He();
    }
  }, [He, h, ke, D, Ut, n, ue, E, tt, Ve, c, d, oe, De, Ie, Gt, dn]), Zn = (g) => {
    if (Ve.length === 0) return;
    const z = gt.current, Q = g === 1 ? z == null ? void 0 : z.down : z == null ? void 0 : z.up;
    if (Q != null) {
      const kt = Ve.find(
        (St) => St.row.kind === "item" && St.row.hit.item.id === Q
      );
      if (kt) {
        gt.current = null, Ie(kt.index);
        return;
      }
    }
    let ie = it;
    if (ie < 0 && Ct.current) {
      const kt = Ve.find(
        (St) => St.row.kind === "item" && St.row.hit.item.id === Ct.current
      );
      kt && (ie = kt.index);
    }
    const me = Ve.findIndex((kt) => kt.index === ie), Ae = me < 0 ? 0 : (me + g + Ve.length) % Ve.length;
    Ie(Ve[Ae].index);
  };
  Yo($, () => ({
    moveHighlight: Zn,
    activateHighlighted: () => {
      if (jt.current) return !1;
      const g = it >= 0 ? Ke[it] : void 0;
      return g ? (Qt(g), Ie(-1, "keyboard"), !0) : !1;
    },
    close: He,
    selectAll: () => {
      tt && De.setAll(!0);
    },
    setSelection: (g) => {
      De.reset(g);
    }
  }), [Ke, it, Qt, He, tt, De]);
  const mr = (g) => {
    if (tt && (g.metaKey || g.ctrlKey) && g.key.toLowerCase() === "a") {
      g.preventDefault(), g.stopPropagation(), De.setAll(!0);
      return;
    }
    if (g.key === "ArrowDown")
      g.preventDefault(), Y ? Zn(1) : qt();
    else if (g.key === "ArrowUp")
      g.preventDefault(), Zn(-1);
    else if ((g.key === "ArrowRight" || g.key === "ArrowLeft") && y && Y && !oe.trim()) {
      const z = Ke[it];
      if ((z == null ? void 0 : z.kind) === "group") {
        const Q = je.has(z.group.key);
        (g.key === "ArrowRight" || Q) && (g.preventDefault(), Gt(z.group.key));
      } else if ((z == null ? void 0 : z.kind) === "item" && g.key === "ArrowLeft" && z.hit.item.group) {
        g.preventDefault();
        const Q = z.hit.item.group;
        je.has(Q) && Gt(Q);
        const ie = Ke.findIndex((me) => me.kind === "group" && me.group.key === Q);
        ie >= 0 && Ie(ie);
      }
    } else if (g.key === "Enter") {
      if (g.preventDefault(), Vt(g)) return;
      const z = Ke[it] ?? Ke[0];
      z && Qt(z);
    } else g.key === "Escape" && (g.preventDefault(), He());
  }, er = (g) => {
    t === "expandable" && !ve || (Se(g), Y || Re(!0));
  };
  ce(() => {
    if (N) {
      const z = oe.trim().toLowerCase();
      if (!z) {
        const ie = w ? pe.findIndex((me) => me.kind === "item" && me.hit.item.id === w) : -1;
        Ie(ie >= 0 ? Qe + ie : -1);
        return;
      }
      const Q = pe.findIndex((ie) => ie.kind === "item" && ie.hit.item.label.toLowerCase().includes(z));
      Ie(Q >= 0 ? Qe + Q : -1);
      return;
    }
    if (Ee) {
      const z = oe.trim().toLowerCase();
      if (!!z && n.some((ie) => ie.id.toLowerCase() === z || ie.label.toLowerCase() === z)) {
        Ie(-1);
        return;
      }
      if (!tt) {
        const ie = pe.findIndex((me) => me.kind === "item" && me.hit.item.tone !== "create");
        if (ie >= 0) {
          Ie(Qe + ie);
          return;
        }
      }
    }
    const g = pe.findIndex((z) => z.kind === "item");
    Ie(g >= 0 ? Qe + g : Qe);
  }, [oe]), ce(() => {
    if (!Y || oe.trim()) return;
    const g = w ? pe.findIndex((z) => z.kind === "item" && z.hit.item.id === w) : -1;
    Ie(g >= 0 ? Qe + g : P ? Qe : -1);
  }, [Y]), rt(() => {
    Y && Gn.current();
  }, [Y]);
  const tr = (g) => /* @__PURE__ */ R("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    F == null ? void 0 : F.map((z) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": z.label,
        title: z.label,
        tabIndex: ve ? 0 : -1,
        onMouseDown: (Q) => Q.preventDefault(),
        onClick: () => {
          z.onClick(oe, { close: He }), z.keepOpen || He();
        },
        style: { width: A.box, height: A.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": z.key,
        children: /* @__PURE__ */ p(
          "span",
          {
            style: { width: A.icon, height: A.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: z.icon
          }
        )
      },
      z.key
    )),
    oe && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: ve ? 0 : -1,
        onMouseDown: (z) => z.preventDefault(),
        onClick: g,
        style: { width: A.box, height: A.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(Cn, { size: A.icon })
      }
    )
  ] }), Rn = /* @__PURE__ */ R("div", { className: "relative w-full", children: [
    /* @__PURE__ */ p(zn, { size: A.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: bt,
        value: oe,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": Y,
        "aria-controls": `${Ce}-panel`,
        "aria-activedescendant": nn,
        "aria-autocomplete": "list",
        onChange: (g) => er(g.target.value),
        onFocus: () => {
          m && qt();
        },
        onClick: () => {
          m && qt();
        },
        onKeyDown: mr,
        placeholder: l,
        style: { paddingRight: ye },
        className: `${zr("sm")} w-full pl-8`
      }
    ),
    tr(() => {
      Se(""), Y || qt();
    })
  ] }), j = /* @__PURE__ */ R("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ p(zn, { size: A.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: bt,
        value: oe,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": Y,
        "aria-controls": `${Ce}-panel`,
        "aria-activedescendant": nn,
        "aria-autocomplete": "list",
        onChange: (g) => er(g.target.value),
        onFocus: () => {
          m && ve && qt();
        },
        onClick: () => {
          m && ve && qt();
        },
        onKeyDown: mr,
        placeholder: l,
        tabIndex: ve ? 0 : -1,
        style: { paddingRight: ye },
        className: `${zr("sm")} h-full w-full pl-8`
      }
    ),
    tr(() => {
      Se(""), !Y && ve && qt();
    })
  ] });
  ce(() => {
    if (!Y || jt.current) return;
    const g = wt.current;
    an(
      g == null ? void 0 : g.querySelector(`[data-search-row="${it}"]`),
      "nearest",
      (g == null ? void 0 : g.querySelector("[data-search-scroller]")) ?? null
    );
  }, [Y, it]);
  const he = v(pe);
  he.current = pe;
  const Te = v(w);
  Te.current = w;
  const st = v(E == null ? void 0 : E.selectedIds);
  st.current = E == null ? void 0 : E.selectedIds, rt(() => {
    if (!Y || !rn.current) return;
    const g = wt.current;
    if (!g) return;
    const z = w;
    if (!z) {
      rn.current = !1;
      return;
    }
    const Q = pe.findIndex((me) => me.kind === "item" && me.hit.item.id === z);
    if (Q < 0) {
      rn.current = !1;
      return;
    }
    const ie = g.querySelector(`[data-search-row="${Q}"]`);
    ie && (an(ie, "center", g.querySelector("[data-search-scroller]") ?? null), rn.current = !1);
  }, [Y, je, pe, w]);
  const Ue = bs({
    open: Y,
    block: "center",
    ready: qe.ready,
    scroller: () => {
      var g;
      return ((g = wt.current) == null ? void 0 : g.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Q;
      let g = -1;
      const z = Te.current;
      if (z)
        g = he.current.findIndex((ie) => ie.kind === "item" && ie.hit.item.id === z);
      else {
        const ie = st.current;
        if (ie && ie.length) {
          const me = new Set(ie);
          g = he.current.findIndex((Ae) => Ae.kind === "item" && me.has(Ae.hit.item.id));
        }
      }
      return g < 0 ? null : ((Q = wt.current) == null ? void 0 : Q.querySelector(`[data-search-row="${g}"]`)) ?? null;
    }
  }), on = (g, z) => {
    const Q = it === z, ie = !tt && w !== void 0 && g.hit.item.id === w, me = tt ? De.isSelected(g.hit.item.id) : ie, Ae = !!g.hit.item.disabled || tt && !De.canToggle(g.hit.item.id), kt = g.hit.item.tone === "create" ? I === "light" ? { background: Q ? "#d1fae5" : "#ecfdf5", color: Q ? "#065f46" : "#047857" } : { background: Q ? "rgba(6, 95, 70, 0.7)" : "rgba(6, 78, 59, 0.4)", color: Q ? "#d1fae5" : "#6ee7b7" } : void 0;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        id: `${Ce}-opt-${z}`,
        "aria-selected": me,
        tabIndex: -1,
        "data-search-item": g.hit.item.id,
        "data-search-row": z,
        "data-search-create": g.hit.item.tone === "create" ? "" : void 0,
        onMouseDown: (St) => St.preventDefault(),
        onMouseEnter: () => Ie(z, "pointer"),
        onClick: () => Qt(g),
        style: { ...$t, ...g.hit.item.rowStyle, ...kt },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ut.itemDefault} ${g.hit.item.rowClassName ?? ""} ${ie ? "ui-item-selected" : ""} ${Q ? "ui-item-highlighted" : ""} ${Ae ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          tt && g.hit.item.checkable !== !1 && /* @__PURE__ */ p(Or, { checked: me, disabled: Ae, indicator: E == null ? void 0 : E.indicator }),
          X ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: X(g.hit.item, { checked: me, disabled: Ae }) }) : /* @__PURE__ */ R(dt, { children: [
            g.hit.item.icon && /* @__PURE__ */ p("span", { className: `${ut.icon} shrink-0`, children: g.hit.item.icon }),
            /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: g.hit.item.label }),
            (g.hit.detail || g.hit.item.detail) && /* @__PURE__ */ p("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: g.hit.detail || g.hit.item.detail }),
            ie && /* @__PURE__ */ p(fr, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
          ] })
        ]
      },
      `item:${g.hit.item.id}`
    );
  }, si = (g, z) => {
    var uo;
    const Q = je.has(g.group.key), ie = y && !oe.trim(), me = Ut, Ae = me && it === z, kt = tt ? n.filter((nt) => nt.group === g.group.key && dn.has(nt.id) && nt.checkable !== !1) : [], St = kt.filter((nt) => !De.isDisabled(nt.id)).map((nt) => nt.id), sn = tt ? (uo = E == null ? void 0 : E.groupToken) == null ? void 0 : uo.call(E, g.group.key) : void 0, so = !!sn && De.isSelected(sn), lo = so ? "all" : St.length > 0 ? De.groupState(St) : "none", Ul = so ? kt.length : kt.reduce((nt, Xl) => nt + (De.isSelected(Xl.id) ? 1 : 0), 0), ao = tt && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        tabIndex: -1,
        "aria-label": `Select all ${g.group.label}`,
        onMouseDown: (nt) => nt.preventDefault(),
        onClick: (nt) => {
          nt.stopPropagation(), sn ? De.toggle(sn) : St.length && De.toggleGroup(St);
        },
        className: `shrink-0 flex items-center justify-center rounded ${sn || St.length ? "cursor-pointer" : "cursor-not-allowed"}`,
        children: /* @__PURE__ */ p(
          Or,
          {
            checked: lo === "all",
            indeterminate: lo === "some",
            disabled: !sn && St.length === 0,
            indicator: E == null ? void 0 : E.indicator
          }
        )
      }
    ), co = tt ? /* @__PURE__ */ R("span", { className: `shrink-0 tabular-nums text-[10px] ${me ? "text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: [
      Ul,
      "/",
      kt.length
    ] }) : g.group.count !== void 0 && /* @__PURE__ */ p("span", { className: `shrink-0 tabular-nums ${me ? "text-[10px] text-[color:var(--ui-text-faint)]" : "opacity-70"}`, children: g.group.count });
    return me ? /* @__PURE__ */ R(
      "div",
      {
        role: "option",
        id: `${Ce}-opt-${z}`,
        "aria-selected": !1,
        "aria-expanded": ie ? Q : void 0,
        "data-search-group": g.group.key,
        onMouseDown: (nt) => nt.preventDefault(),
        onMouseEnter: () => Ie(z, "pointer"),
        onClick: () => {
          ie && Gt(g.group.key);
        },
        style: $t,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${ut.itemDefault} ${Ae ? "ui-item-highlighted" : ""}`,
        children: [
          ao,
          /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (nt) => nt.preventDefault(),
              onClick: (nt) => {
                nt.stopPropagation(), Qt(g);
              },
              className: "flex w-auto min-w-0 max-w-full cursor-pointer items-center gap-2 text-left",
              children: [
                g.group.icon && /* @__PURE__ */ p("span", { className: `${ut.icon} shrink-0`, children: g.group.icon }),
                /* @__PURE__ */ p("span", { className: "truncate", children: g.group.label })
              ]
            }
          ),
          /* @__PURE__ */ p("span", { className: "min-w-0 flex-1" }),
          co,
          ie && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Q ? "Collapse" : "Expand"} ${g.group.label}`,
              "aria-expanded": Q,
              onMouseDown: (nt) => nt.preventDefault(),
              onClick: (nt) => {
                nt.stopPropagation(), Gt(g.group.key);
              },
              style: { width: A.box, height: A.box },
              className: "shrink-0 flex cursor-pointer items-center justify-center rounded text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text)]",
              children: /* @__PURE__ */ p(
                gn,
                {
                  size: A.icon,
                  className: `transition-transform duration-200 ${Q ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${g.group.key}`
    ) : /* @__PURE__ */ R(
      "div",
      {
        role: "presentation",
        "data-search-group": g.group.key,
        "data-search-row": z,
        style: Dt,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          ao,
          g.group.icon && /* @__PURE__ */ p("span", { className: `${ut.icon} shrink-0`, children: g.group.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: g.group.label }),
          co
        ]
      },
      `group:${g.group.key}`
    );
  }, li = (g, z) => {
    var me;
    const Q = it === z, ie = g.source === "leading" ? ue : g.source === "footer" ? D : ke;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        id: `${Ce}-opt-${z}`,
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": g.source || "empty",
        "data-search-row": z,
        onMouseDown: (Ae) => Ae.preventDefault(),
        onMouseEnter: () => Ie(z, "pointer"),
        onClick: () => Qt(g),
        style: $t,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ut.itemDefault} ${Q ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ p("span", { className: `${ut.icon} shrink-0`, children: ((me = ie == null ? void 0 : ie[g.actionIndex]) == null ? void 0 : me.icon) || /* @__PURE__ */ p(Vr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: g.label })
        ]
      },
      `${g.source || "empty"}:${g.actionIndex}`
    );
  }, Yl = () => /* @__PURE__ */ p("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: re ? re({ query: oe, close: He }) : /* @__PURE__ */ R(dt, { children: [
    /* @__PURE__ */ p("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ p("div", { className: "text-xs font-medium text-zinc-500", children: te || `No matches for “${oe.trim()}”` }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: U || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), gr = [];
  for (let g = 0; g < pe.length; g++) {
    const z = pe[g];
    if (z.kind === "group") {
      const Q = [];
      let ie = g + 1;
      for (; ie < pe.length && pe[ie].kind === "item" && pe[ie].hit.item.group === z.group.key; )
        Q.push({ row: pe[ie], index: ie }), ie++;
      gr.push({ group: z, index: g, items: Q }), g = ie - 1;
    } else z.kind === "item" ? gr.push({ row: z, index: g }) : gr.push({ row: z, index: g });
  }
  const ai = Y || T ? Yr(
    /* @__PURE__ */ R(
      "div",
      {
        ref: fe,
        id: `${Ce}-panel`,
        "data-search-panel": !0,
        "data-theme": I,
        role: "listbox",
        "aria-label": l,
        "aria-multiselectable": tt ? !0 : void 0,
        onPointerEnter: Ue.engage,
        onPointerDown: (g) => {
          g.stopPropagation(), Ue.engage();
        },
        onMouseDown: (g) => g.stopPropagation(),
        onClick: (g) => g.stopPropagation(),
        onPointerLeave: () => {
          jt.current && Ie(-1, "pointer");
        },
        className: "click-outside-ignore ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden pointer-events-auto",
        style: {
          position: "fixed",
          left: qe.left,
          top: qe.top,
          width: B ?? (t === "expandable" ? S : Et || void 0),
          minWidth: K,
          maxHeight: qe.maxH,
          visibility: qe.ready ? "visible" : "hidden"
        },
        children: [
          Ge && /* @__PURE__ */ R("div", { className: "shrink-0 pb-1", children: [
            $e.map((g, z) => li(g, z)),
            pe.length > 0 && /* @__PURE__ */ p("div", { className: ut.separator })
          ] }),
          /* @__PURE__ */ R("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            pe.length === 0 && /* @__PURE__ */ p("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: re ? re({ query: oe, close: He }) : /* @__PURE__ */ p(dt, { children: "Type to search…" }) }),
            gr.map((g) => {
              if (g.group) {
                const ie = je.has(g.group.group.key), me = g.items || [];
                return /* @__PURE__ */ R(Xe.Fragment, { children: [
                  si(g.group, Qe + g.index),
                  It && /* @__PURE__ */ p(
                    "div",
                    {
                      "data-search-group-items": g.group.group.key,
                      "aria-hidden": !ie,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: ie ? "1fr" : "0fr",
                        opacity: ie ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ p("div", { className: "overflow-hidden flex flex-col", children: me.map((Ae) => on(Ae.row, Qe + Ae.index)) })
                    }
                  ),
                  !It && me.map((Ae) => on(Ae.row, Qe + Ae.index))
                ] }, `group:${g.group.group.key}`);
              }
              const z = g.row, Q = Qe + g.index;
              return z.kind === "empty" ? Yl() : z.kind === "action" ? li(z, Q) : z.kind === "item" ? on(z, Q) : null;
            })
          ] }),
          Be.length > 0 && /* @__PURE__ */ R("div", { className: "shrink-0", children: [
            /* @__PURE__ */ p("div", { className: ut.separator }),
            Be.map((g, z) => li(g, Qe + pe.length + z))
          ] }),
          tt && (E == null ? void 0 : E.footer) !== !1 && /* @__PURE__ */ p(
            Ns,
            {
              count: De.count,
              max: E == null ? void 0 : E.max,
              hiddenCount: (E == null ? void 0 : E.hiddenNote) === !1 ? 0 : De.hiddenCount,
              clear: (E == null ? void 0 : E.clear) !== !1,
              theme: I,
              onClear: De.clear,
              hero: (E == null ? void 0 : E.mode) === "live" ? void 0 : {
                label: Qn,
                onClick: () => {
                  De.commit(), He();
                },
                disabled: De.count === 0
              }
            }
          )
        ]
      }
    ),
    le ?? tn ?? (yt == null ? void 0 : yt.body) ?? document.body
  ) : null;
  return ge ? /* @__PURE__ */ R(dt, { children: [
    /* @__PURE__ */ p("div", { ref: ct, "data-search-menu": !0, "data-mode": "hidden", className: "hidden", "aria-hidden": !0 }),
    ai
  ] }) : t === "inline" ? /* @__PURE__ */ R("div", { ref: ct, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    Rn,
    ai
  ] }) : /* @__PURE__ */ p(
    oo,
    {
      expanded: ve,
      collapsedWidth: C,
      expandedWidth: S,
      rootRef: ct,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: be ? be({ open: Y, expanded: ve, toggle: qt }) : /* @__PURE__ */ p(
        Lt,
        {
          ref: vt,
          type: "button",
          variant: o,
          size: "minimal",
          theme: I === "dark" ? "dark" : "light",
          icon: i === void 0 ? /* @__PURE__ */ p(zn, { className: "w-3.5 h-3.5" }) : i,
          onClick: qt,
          className: `w-full justify-start ${ve ? "pointer-events-none" : ""} ${s ?? ""}`,
          tabIndex: ve ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: "min-w-0 truncate", children: r })
        }
      ),
      field: /* @__PURE__ */ R(dt, { children: [
        j,
        ai
      ] })
    }
  );
}
function xn(n, e = "id") {
  return e === "label" ? n.label : n.id;
}
function Vl(n, e, t = "id") {
  const r = e.find((i) => xn(i, t) === n);
  return (r == null ? void 0 : r.label) || n;
}
function lh(n) {
  return n.split(",").map((e) => e.trim()).filter(Boolean);
}
function ah(n) {
  const e = n.split(",");
  return (e[e.length - 1] || "").trim();
}
function Jr(n, e, t = "id") {
  const r = n.trim();
  if (!r) return "";
  const i = e.find((l) => xn(l, t) === r);
  if (i) return xn(i, t);
  const o = r.toLowerCase(), s = e.find((l) => l.label.toLowerCase() === o);
  return s ? xn(s, t) : r;
}
function Ko(n, e, t = "id") {
  const r = /* @__PURE__ */ new Set(), i = [];
  for (const o of lh(n)) {
    const s = Jr(o, e, t);
    !s || r.has(s) || (r.add(s), i.push(s));
  }
  return i;
}
function ch(n, e, t, r, i) {
  if (i) return Ko(n, e, t);
  const o = new Set(e.map((l) => xn(l, t))), s = Ko(n, e, t).filter((l) => o.has(l));
  return s.length === 0 && n.trim() !== "" ? [...r] : s;
}
function uh(n, e, t = "id") {
  const r = n.split(",").map((l) => l.trim()).filter(Boolean), i = n.trimEnd().endsWith(",") ? r : r.slice(0, -1), o = /* @__PURE__ */ new Set(), s = [];
  for (const l of i) {
    const a = Jr(l, e, t);
    !a || o.has(a) || (o.add(a), s.push(a));
  }
  return s;
}
function dh(n, e, t = "id") {
  const r = n.trim();
  if (!r) return !0;
  const i = r.toLowerCase();
  return e.some((o) => xn(o, t).toLowerCase() === i || o.label.toLowerCase() === i);
}
function fh(n, e, t = "id") {
  const r = new Set(e.map((i) => xn(i, t)));
  return n.filter((i) => !r.has(i));
}
function Jo(n, e, t, r, i) {
  return i ? i([...n], [...e]) : r === "count" ? n.length ? `${n.length} selected` : "" : r === "chips" ? "" : n.map((o) => Vl(o, e, t)).join(", ");
}
const hh = () => {
};
function bp({
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
  anchoredLabel: y = "Element link anchor",
  placeholder: b = "Select…",
  readOnly: x = !1,
  inputReadOnly: O = !1,
  disabled: w = !1,
  autoFocus: k = !1,
  defaultOpen: C = !1,
  selectAllOnOpen: S = !0,
  uppercase: B = !1,
  allowFreeText: K = !0,
  theme: N,
  className: W = "",
  style: I,
  panelWidth: Z,
  panelMinWidth: te,
  initialQuery: U,
  keepAllRows: re = !1,
  maxMenuHeight: ke,
  portalTarget: ue,
  autoGrow: M = !1,
  skipComma: D = !1,
  collapsedWidth: F = 140,
  expandedWidth: E = 280,
  createLabel: ee,
  onCreateItem: J,
  onExit: ge,
  onEscape: xe,
  onTabExit: le,
  loadItems: be,
  emptyTitle: X,
  emptyHint: P,
  sortItems: $,
  max: q,
  disabledIds: Ce,
  indicator: Ne,
  browse: Fe,
  groupToken: oe
}) {
  const Se = Ot(), Ee = N ?? (Se == null ? void 0 : Se.mode) ?? "light", H = Je(), L = ae((j) => xn(j, i), [i]), Y = lt(() => t.map(L), [t, L]), Re = lt(() => new Map(t.map((j) => [L(j), j])), [t, L]), ve = ae((j) => Vl(j, t, i), [t, i]), ft = lt(() => new Set([...m ?? []].map((j) => j.toLowerCase())), [m]), [Me, Ye] = se(!1), [je, Le] = se(""), [it, un] = se(() => {
    const j = U ?? "";
    return B ? j.toUpperCase() : j;
  }), [jt, Ct] = se(it), [gt, Ie] = se(() => [...n]), [ct, bt] = se(null), [vt, wt] = se(!1), We = v(null), ht = v(null), yt = v(null), tn = v(null), ut = v(null), $t = v(n.join("\0")), Dt = v(!1), A = v(/* @__PURE__ */ new Set()), G = v(!1), ye = v(!1), qe = v(!1), ot = v(0), Et = v(""), Rt = v([...n]), T = n.join("\0"), ne = lt(
    () => Jo(n, t, i, l, a),
    [n, t, i, l, a]
  ), fe = ae((j) => {
    if (u) return u([...j], t);
    if (o === "single") return j[0] ? ve(j[0]) : "";
    const he = j.map(ve).join(", ");
    return D ? he : j.length ? `${he}, ` : "";
  }, [u, t, o, ve, D]);
  ce(() => {
    Me || (Ie([...n]), Rt.current = [...n], $t.current = T);
  }, [T, Me]);
  const we = ae(() => {
    if (Me || x || w) return;
    Dt.current = !1, G.current = !0;
    const j = fe(n);
    Et.current = j, Rt.current = [...n], Ie([...n]), Le(j), Ct(it), un(""), Ye(!0);
  }, [Me, x, w, n, fe, it]);
  rt(() => {
    if (!Me) return;
    const j = We.current ?? ht.current;
    j && (j.focus(), (j instanceof HTMLInputElement || j instanceof HTMLTextAreaElement) && (o === "single" && S ? j.setSelectionRange(0, j.value.length) : j.setSelectionRange(j.value.length, j.value.length)));
  }, [Me]), rt(() => {
    if (!qe.current) return;
    qe.current = !1;
    const j = We.current;
    j && (j.focus(), j.setSelectionRange(j.value.length, j.value.length));
  }, [je]), ce(() => {
    (C || k) && we();
  }, []);
  const pe = o === "single" ? jt : ah(je), $e = be ? ct ?? [] : t, Be = lt(
    () => $ ? $($e, gt) : $e,
    [$e, $, gt]
  ), Pe = pe.trim(), Ge = !!J && K && !vt && !!Pe && !dh(Pe, $e, i);
  ce(() => {
    if (!be || !Me) return;
    const j = pe.trim();
    if (!j) {
      bt(null), wt(!1);
      return;
    }
    wt(!0);
    const he = ++ot.current, Te = setTimeout(() => {
      be(j).then((st) => {
        ot.current === he && (bt(st), wt(!1));
      }).catch(() => {
        ot.current === he && (bt([]), wt(!1));
      });
    }, 400);
    return () => clearTimeout(Te);
  }, [be, Me, pe]);
  const Qe = lt(() => {
    const j = Be.filter((he) => !he.hidden).map((he) => ({
      id: L(he),
      label: he.label,
      group: he.group,
      detail: he.detail,
      icon: he.icon,
      disabled: !!he.disabled || !!(Ce != null && Ce.includes(L(he))),
      fields: he.fields,
      keywords: he.keywords,
      rowClassName: he.rowClassName,
      rowStyle: he.rowStyle
    }));
    return Ge && j.unshift({
      id: Pe,
      label: ee ? ee(Pe) : `Add “${Pe}”…`,
      keywords: Pe,
      checkable: !1,
      tone: "create",
      pinned: !0
    }), j;
  }, [Be, L, Ce, Ge, Pe, ee]), Ke = ae((j) => {
    const he = j.join("\0");
    if (he !== $t.current) {
      if (kn(j, n)) {
        $t.current = he;
        return;
      }
      if ($t.current = he, e(j), J)
        for (const Te of fh(j, t, i))
          A.current.has(Te) || (A.current.add(Te), J(Te));
    }
  }, [n, e, J, t, i]), Ut = ae((j, he) => {
    !he || !J || !K || t.some((Te) => L(Te) === j) || A.current.has(j) || (A.current.add(j), J(j));
  }, [J, K, t, L]), Ve = ae((j = !0) => {
    if (!G.current || (G.current = !1, x || w)) return;
    if (Dt.current) {
      Dt.current = !1;
      return;
    }
    const he = Et.current, Te = new Set(Y), st = o === "single" ? (() => {
      const Ue = he.trim();
      if (!Ue) return K ? [] : n;
      const on = Jr(Ue, t, i);
      return !K && !Te.has(on) ? n : [on];
    })() : Bt(
      ch(he, t, i, n, K),
      Y
    );
    Rt.current = st, Ie(st), Ct(""), Ye(!1), Ke(st), j && !ye.current && (ge == null || ge());
  }, [x, w, o, t, i, Y, K, n, Ke, ge]), It = ae((j) => {
    Ye(j), j || Ve();
  }, [Ve]), nn = ae(() => {
    Dt.current = !0, G.current = !1;
    const j = fe(n);
    Et.current = j, Rt.current = [...n], Ie([...n]), Le(j), Ct(""), Ye(!1), xe == null || xe();
  }, [n, fe, xe]);
  ce(() => {
    var st;
    if (!Me) return;
    const he = (((st = yt.current) == null ? void 0 : st.ownerDocument) ?? document).defaultView;
    if (!he) return;
    const Te = (Ue) => {
      Ue.key === "Escape" && (Ue.preventDefault(), Ue.stopImmediatePropagation(), nn());
    };
    return he.addEventListener("keydown", Te, !0), () => he.removeEventListener("keydown", Te, !0);
  }, [Me, nn]);
  const tt = ae((j) => {
    const he = Bt(j, Y), Te = fe(he);
    Rt.current = he, Et.current = Te, Ie(he), qe.current = !0, Le(Te);
  }, [Y, fe]), wn = ae((j) => {
    const he = j.id;
    G.current = !1;
    const Te = ve(he);
    Rt.current = [he], Et.current = Te, Ie([he]), Le(Te), Ct(""), Ye(!1), Ke([he]), ye.current || ge == null || ge();
  }, [ve, Ke, ge]), Wt = (j) => {
    var he, Te, st, Ue, on;
    if (j.key === "Escape") {
      j.preventDefault(), nn();
      return;
    }
    if (j.key === "Tab") {
      if (j.preventDefault(), o === "single" && Me) {
        ye.current = !0;
        const si = (he = ut.current) == null ? void 0 : he.activateHighlighted();
        if (ye.current = !1, si) {
          (Te = le ?? ge) == null || Te(We.current ?? void 0);
          return;
        }
      }
      Me && Ve(!1), (st = le ?? ge) == null || st(We.current ?? void 0);
      return;
    }
    if (j.key === "ArrowDown" || j.key === "ArrowUp") {
      if (j.preventDefault(), !Me) {
        we();
        return;
      }
      (Ue = ut.current) == null || Ue.moveHighlight(j.key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (j.key === "Enter") {
      if (j.preventDefault(), j.stopPropagation(), Vt(j) || Me && ((on = ut.current) != null && on.activateHighlighted())) return;
      Ve();
      return;
    }
  }, dn = (j) => {
    var Te;
    const he = B ? j.target.value.toUpperCase() : j.target.value;
    if (Et.current = he, Le(he), o === "single" && Ct(he), Me || (G.current = !0, Dt.current = !1, Ye(!0)), o === "multiple") {
      const st = Bt(uh(he, t, i), Y);
      Rt.current = st, Ie(st), (Te = ut.current) == null || Te.setSelection(st);
    }
  }, De = () => {
    if (G.current) {
      if (Dt.current) {
        Dt.current = !1;
        return;
      }
      Ve();
    }
  }, Gn = ae((j, he) => {
    const Te = Re.get(j.id);
    if (!Te)
      return /* @__PURE__ */ R(dt, { children: [
        /* @__PURE__ */ p(Vr, { className: "h-3.5 w-3.5 shrink-0" }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: j.label })
      ] });
    const st = !!m && (i === "label" ? ft.has(Te.label.toLowerCase()) : m.has(L(Te))), Ue = (f == null ? void 0 : f(Te)) ?? Te.badge ?? null;
    return /* @__PURE__ */ R(dt, { children: [
      d ? d(Te, he.checked) : /* @__PURE__ */ R(dt, { children: [
        Te.icon && /* @__PURE__ */ p("span", { className: "shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5", children: Te.icon }),
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: Te.label }),
        Ue && /* @__PURE__ */ p("span", { className: "shrink-0 text-[10px] text-[color:var(--ui-text-faint)]", children: Ue }),
        h == null ? void 0 : h(Te)
      ] }),
      st && /* @__PURE__ */ p("span", { className: "shrink-0 inline-flex", title: y, "aria-label": y, children: /* @__PURE__ */ p(sa, { className: "h-3.5 w-3.5 text-amber-500" }) })
    ] });
  }, [Re, m, ft, i, L, f, d, h, y]), Qn = /* @__PURE__ */ p(
    sh,
    {
      ref: ut,
      mode: "inline",
      hideTrigger: !0,
      open: Me,
      onOpenChange: It,
      anchorRef: s === "morph" ? tn : yt,
      items: Qe,
      groups: r,
      query: pe,
      onSelect: wn,
      closeOnSelect: o === "single",
      selectedId: o === "single" && gt[0] !== void 0 ? Jr(gt[0], t, i) : void 0,
      multiple: o === "multiple" ? {
        selectedIds: gt,
        mode: "live",
        onDraftChange: tt,
        onToggle: Ut,
        onCommit: hh,
        max: q,
        disabledIds: Ce,
        indicator: Ne,
        groupToken: oe
      } : void 0,
      openOnFocus: !1,
      autoFocus: !1,
      highlightOnOpen: o === "single",
      browseAll: r.length === 0,
      browseExpanded: r.length > 0 && (Fe ?? "open") === "open",
      expandableGroups: r.length > 0 && Fe === "accordion",
      groupExpandMode: "single",
      renderItem: Gn,
      emptyTitle: vt ? "Searching…" : X,
      emptyHint: vt ? "Fetching matching records." : P,
      theme: Ee,
      panelWidth: Z,
      panelMinWidth: te,
      keepAllRows: re,
      maxMenuHeight: ke,
      portalTarget: ue
    }
  ), He = s === "chip", Xt = s === "wrap", rn = !He && !Xt && M, Gt = !Me && !ne, qt = Me ? je : ne, Qt = {
    ref: We,
    /* Chip: the INPUT holds the committed keys (cast reads "1") while the
       overlay renders the resolved face ("1. GEORGE") — the old
       EntityDropdown's transparent-input contract. */
    value: Me ? je : He ? n.join(", ") : ne,
    disabled: w,
    readOnly: O,
    placeholder: "",
    onFocus: we,
    onClick: we,
    onChange: dn,
    onBlur: De,
    onKeyDown: Wt,
    autoComplete: "off",
    spellCheck: !1
  }, Zn = _(5, 7, H), mr = _(9, 12, H), er = _(12, 14, H);
  if (s === "button") {
    const j = (Ue) => Wt(Ue), he = Me ? gt : n, Te = Jo(he, t, i, l, a), st = !Te;
    return /* @__PURE__ */ R(
      "div",
      {
        ref: yt,
        "data-picker-field": !0,
        className: `relative ${W}`,
        style: I,
        onMouseDown: (Ue) => Ue.stopPropagation(),
        onContextMenu: (Ue) => {
          Ue.preventDefault(), Ue.stopPropagation();
        },
        children: [
          c ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex w-full min-w-0 items-center", children: c({ values: [...he], items: t, display: Te, open: Me, toggle: we }) }) : /* @__PURE__ */ R(
            Lt,
            {
              ref: ht,
              variant: "outline",
              theme: Ee === "dark" ? "dark" : "light",
              disabled: w,
              onClick: x ? void 0 : () => Me ? Ve() : we(),
              onKeyDown: j,
              "data-state": Me ? "open" : "closed",
              "aria-haspopup": "listbox",
              "aria-expanded": Me,
              className: "w-full justify-between gap-2",
              children: [
                l === "chips" && he.length > 0 ? /* @__PURE__ */ p("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 overflow-hidden", children: he.map((Ue) => /* @__PURE__ */ p(
                  "span",
                  {
                    className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
                    children: ve(Ue)
                  },
                  Ue
                )) }) : /* @__PURE__ */ p("span", { className: `min-w-0 flex-1 truncate text-left ${st ? "italic text-[color:var(--ui-text-faint)]" : ""}`, children: Te || b }),
                /* @__PURE__ */ p(gn, { className: "h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          ),
          Qn
        ]
      }
    );
  }
  if (s === "morph")
    return /* @__PURE__ */ p(
      oo,
      {
        expanded: Me,
        collapsedWidth: F,
        expandedWidth: E,
        rootRef: yt,
        "data-picker-field": !0,
        className: W,
        style: I,
        trigger: c ? c({ values: [...n], items: t, display: ne, open: Me, toggle: we }) : (
          /* The collapsed face IS the chip: one trigger recipe for both
             faces, so a morph picker matches every other value field. */
          /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              disabled: w,
              onClick: we,
              className: "ui-press flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none transition-colors hover:border-[color:var(--ui-input-focus-border)] disabled:cursor-default disabled:opacity-50",
              style: { padding: `${Zn}px ${mr}px`, fontSize: er },
              children: [
                /* @__PURE__ */ p("span", { className: `min-w-0 flex-1 truncate ${Gt ? "italic text-[color:var(--ui-text-muted)]" : ""}`, children: ne || b }),
                /* @__PURE__ */ p(gn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" })
              ]
            }
          )
        ),
        field: /* @__PURE__ */ R("div", { ref: tn, className: "relative h-full", children: [
          /* @__PURE__ */ p(
            "input",
            {
              ...Qt,
              className: `${zr("sm")} h-full w-full`
            }
          ),
          Qn
        ] })
      }
    );
  const tr = He ? _(5, 7, H) : 0, Rn = He ? _(9, 12, H) : 0;
  return x ? /* @__PURE__ */ p(
    "div",
    {
      ref: yt,
      "data-picker-field": !0,
      className: `relative ${He ? "flex w-full items-center gap-1.5 rounded border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left" : Xt ? "min-h-[1lh] w-full pb-[1lh]" : "h-[1lh] w-full"} ${W}`,
      style: He ? { padding: `${tr}px ${Rn}px`, fontSize: _(12, 14, H), ...I } : I,
      children: /* @__PURE__ */ p(
        "input",
        {
          readOnly: !0,
          tabIndex: -1,
          value: ne,
          className: He ? "w-full min-w-0 bg-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-inherit outline-none",
          style: { color: "inherit", caretColor: "transparent" }
        }
      )
    }
  ) : /* @__PURE__ */ R(
    "div",
    {
      ref: yt,
      "data-picker-field": !0,
      className: `relative ${He ? "ui-press flex w-full items-center gap-1.5 rounded-[var(--ui-radius-btn)] border border-[color:var(--ui-border-strong)] bg-[var(--ui-panel-bg)] text-left outline-none focus-within:border-[color:var(--ui-input-focus-border)]" : Xt ? "min-h-[1lh] w-full pb-[1lh]" : rn ? "w-max max-w-[400px] min-w-[72px]" : "h-[1lh] w-full"} ${W}`,
      style: He ? { padding: `${tr}px ${Rn}px`, fontSize: er, ...I } : I,
      onMouseDown: (j) => j.stopPropagation(),
      onContextMenu: (j) => {
        j.preventDefault(), j.stopPropagation();
      },
      onAuxClick: we,
      children: [
        He && c ? /* @__PURE__ */ p("span", { className: "pointer-events-none flex min-w-0 flex-1 items-center", children: c({ values: [...n], items: t, display: ne, open: Me, toggle: we }) }) : l === "chips" && !Me ? /* @__PURE__ */ R("span", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1", children: [
          n.map((j) => /* @__PURE__ */ p(
            "span",
            {
              className: "inline-flex items-center rounded border border-[color:var(--ui-border)] bg-[var(--ui-card-bg)] px-1.5 py-0.5 text-[10px] text-[color:var(--ui-text)]",
              children: ve(j)
            },
            j
          )),
          n.length === 0 && /* @__PURE__ */ p("span", { className: "italic text-[color:var(--ui-text-muted)]", children: b })
        ] }) : /* @__PURE__ */ p(
          "span",
          {
            className: `pointer-events-none text-left ${He ? "min-w-0 flex-1 truncate" : Xt ? "block whitespace-pre-wrap break-words leading-relaxed" : "absolute inset-y-0 inset-x-0 flex items-center truncate whitespace-nowrap"} ${Gt ? "italic text-[color:var(--ui-text-muted)]" : ""}`,
            children: qt || b
          }
        ),
        Xt ? /* @__PURE__ */ p(
          "textarea",
          {
            ...Qt,
            rows: 1,
            className: "absolute inset-0 h-full w-full resize-none overflow-hidden whitespace-pre-wrap break-words bg-transparent text-transparent outline-none",
            style: { caretColor: "#2563eb", color: "transparent" }
          }
        ) : /* @__PURE__ */ p(
          "input",
          {
            ...Qt,
            className: rn ? "block w-full bg-transparent text-transparent outline-none" : "absolute inset-0 h-full w-full bg-transparent text-transparent outline-none",
            style: rn ? { fieldSizing: "content", width: "auto", minWidth: 72, maxWidth: 400, caretColor: "#2563eb", color: "transparent" } : He ? { caretColor: "#2563eb", color: "transparent", paddingLeft: Rn, paddingRight: Rn + 16 } : { caretColor: "#2563eb", color: "transparent" }
          }
        ),
        He && /* @__PURE__ */ p(gn, { className: "pointer-events-none h-3 w-3 shrink-0 text-[color:var(--ui-text-faint)]" }),
        Qn
      ]
    }
  );
}
export {
  Lt as Button,
  yp as CardSection,
  Hi as CheckMark,
  Ja as Checkbox,
  Zh as Checklist,
  up as ChromeHeader,
  cp as ContentRow,
  _h as ContextMenu,
  Wh as ContextMenuDivider,
  jh as ContextMenuItem,
  qh as ContextMenuSub,
  ds as DROPDOWN_MAX_HEIGHT,
  Qh as DatePicker,
  Vh as DialogProvider,
  Is as DropdownItem,
  ei as DropdownMenu,
  lc as DropdownSubmenu,
  _i as DropdownThemeContext,
  Yf as FONTS,
  tp as FloatingChrome,
  Gh as FloatingToggle,
  Xf as FontMenu,
  mp as FormatToolbar,
  ze as IS_COARSE,
  Ra as IS_TOUCH_CAPABLE,
  Hh as ItemManagerDropdown,
  Uh as LongPressMenuProvider,
  bn as MORPH_EASE,
  Tt as MORPH_MS,
  Pi as MORPH_OPACITY_MS,
  pr as MenuHighlightContext,
  Ms as MenuSearchContext,
  cc as Modal,
  Kh as ModalFooter,
  vr as ModalFooterButton,
  xp as MorphActionField,
  nh as MorphSearchField,
  ks as NO_SELECTION_IDS,
  gp as NumberInput,
  bp as PickerField,
  Aa as PopoutWindowContext,
  pp as RICH_TEXT_STATE_IDLE,
  ep as RadioList,
  Vf as RichTextEditor,
  Zf as SCRUB_PX_PER_STEP,
  sh as SearchMenu,
  ap as SectionHeader,
  lp as Seg,
  Or as SelectionCheck,
  ws as SelectionContext,
  Ns as SelectionFooter,
  dp as StructureControls,
  qi as SubmenuContext,
  Bh as TAB_PILL,
  Rc as TB_BTN,
  wr as TB_BTN_ICON,
  Ic as TB_DANGER,
  Ps as TB_DIVIDER,
  $c as TB_INPUT,
  sp as TB_NUM,
  Lc as TB_PICKER,
  np as TB_ROW_LABEL,
  Dc as TB_SEG,
  rp as TB_TOGGLE,
  op as TB_TOGGLE_OFF,
  ip as TB_TOGGLE_ON,
  Ss as TabFace,
  zh as ThemeProvider,
  Fh as ThemeScope,
  Bf as Token,
  Ff as TokenChipView,
  kr as ToolButton,
  Pn as Tooltip,
  Oi as ZOOM_FROM,
  oh as buildSearchMenuRows,
  Ha as buttonCloudOf,
  io as clampNumber,
  La as cloneOverlayClose,
  _ as coarsePx,
  qa as countHidden,
  hp as escapeHtml,
  Jo as formatPickerValues,
  ts as getCoarseScale,
  Qr as getDropdownClasses,
  Ph as getHardwareKeyboard,
  Lh as getLastPointerType,
  po as groupSelectionState,
  dh as hasPickerMatch,
  zr as inputCls,
  Vt as isImeConfirm,
  xc as isInteractiveElement,
  Ih as isPhoneViewport,
  wi as isTouchLike,
  ah as lastPickerSegment,
  ih as matchSearchItem,
  xs as menuAttributesOf,
  Gr as menuThemeOf,
  ls as nearestOverlayOrigin,
  ql as normalizeSpaces,
  Bt as orderByCatalogue,
  Hn as overlayMorphEnabled,
  rh as parseSearchTags,
  uh as pickerCommittedKeys,
  xn as pickerItemKey,
  Vl as pickerItemLabel,
  lh as pickerSegments,
  Da as playOverlayClose,
  $a as playOverlayOpen,
  jo as preprocessTokenHtml,
  Jr as resolvePickerSegment,
  Ko as resolvePickerText,
  an as revealRowInScroller,
  us as safeAreaInsets,
  kn as sameSelection,
  Pf as sanitizeRichText,
  eh as scrubbedValue,
  Jl as searchMenuContent,
  Ba as segModeOf,
  $h as setCoarseScale,
  ho as setSelected,
  Qf as steppedValue,
  fp as stripRichText,
  Of as stripTokenWrappers,
  Wa as toggleSelected,
  fh as unknownPickerValues,
  Dh as useCoarse,
  zi as useCoarseItemTap,
  Je as useCoarseScale,
  yn as useCoarseSize,
  Li as useCurrentDocument,
  hr as useCurrentWindow,
  Jh as useDialog,
  fs as useDropdownPosition,
  Ts as useDropdownTheme,
  Oh as useHardwareKeyboard,
  Ds as useInputSize,
  Wi as useItemSize,
  Ot as useKitTheme,
  Ia as useLastPointerType,
  Yh as useLongPressOptOut,
  Ki as useMenuHighlight,
  rc as useMenuSearch,
  Xr as useOverlayMorph,
  Di as usePopoutWindow,
  Yn as usePortalTarget,
  bs as useRevealRowOnOpen,
  vs as useSelection,
  Ka as useSelectionContext,
  Ac as useSlidingPill,
  Xh as useTouchMode,
  cs as visualViewportBox
};
