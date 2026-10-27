"use client";
import { jsx as p, jsxs as C, Fragment as Ke } from "react/jsx-runtime";
import Pe, { createContext as Jt, useContext as Kt, useState as ne, useEffect as ie, useRef as k, useCallback as oe, useLayoutEffect as rt, useMemo as ut, useImperativeHandle as Ds } from "react";
import * as ye from "@radix-ui/react-dropdown-menu";
import { Search as Lt, X as _t, Check as or, Pencil as Os, Copy as Vi, Trash2 as Rr, RotateCcw as Yi, Plus as jr, ChevronRight as Un, ChevronLeft as Ps, ArrowUp as Ls, ArrowDown as Bs, ChevronDown as Cn, Underline as Fs, Strikethrough as Hs, RemoveFormatting as _s, Link as js, ChevronUp as Ws } from "lucide-react";
import { computePosition as qs, offset as Ui, flip as Gi, shift as Xi, size as Js, useFloating as Ks, autoUpdate as Vs } from "@floating-ui/react-dom";
import * as Mt from "@radix-ui/react-dialog";
import { createPortal as sr } from "react-dom";
import { mergeAttributes as Ys, ReactNodeViewRenderer as Us, NodeViewWrapper as Gs, useEditor as Xs, EditorContent as Qs } from "@tiptap/react";
import { PluginKey as pt, Plugin as kt, Selection as en, TextSelection as it, NodeSelection as on, AllSelection as Zs } from "@tiptap/pm/state";
import { DecorationSet as Dn, Decoration as el } from "@tiptap/pm/view";
import tl from "@tiptap/starter-kit";
import nl from "@tiptap/extension-placeholder";
import { TextStyle as rl, FontFamily as il, FontSize as ol } from "@tiptap/extension-text-style";
import sl from "@tiptap/extension-color";
import ll from "@tiptap/extension-link";
import al from "@tiptap/extension-underline";
import cl from "@tiptap/suggestion";
import { Mention as ul } from "@tiptap/extension-mention";
import { createRoot as dl } from "react-dom/client";
const fl = Jt(null);
function Wr() {
  return Kt(fl);
}
function un() {
  const n = Wr();
  return n ? n.document.body : null;
}
function qr() {
  const n = Wr();
  return n ? n.document : typeof document < "u" ? document : null;
}
function Mn() {
  return Wr() ?? (typeof window < "u" ? window : null);
}
const Rn = typeof window < "u", ze = Rn && window.matchMedia("(pointer: coarse)").matches, hl = Rn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let lr = 0.5;
const vn = /* @__PURE__ */ new Set();
function Yd(n) {
  lr = Math.max(0, Math.min(1, n)), vn.forEach((e) => e());
}
function Qi() {
  return lr;
}
function Ud() {
  const [, n] = ne(0);
  return ie(() => {
    const e = () => n((t) => t + 1);
    return vn.add(e), () => {
      vn.delete(e);
    };
  }, []), ze && lr > 0;
}
function Ie() {
  const [, n] = ne(0);
  return ie(() => {
    const e = () => n((t) => t + 1);
    return vn.add(e), () => {
      vn.delete(e);
    };
  }, []), lr;
}
function L(n, e, t) {
  return ze ? Math.round(n + (e - n) * t) : n;
}
function zt(n, e) {
  const t = Ie();
  return ze && t > 0 ? {
    padding: `${L(n.py, e.py, t)}px ${L(n.px, e.px, t)}px`,
    fontSize: `${L(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Zi() {
  const n = Ie(), e = ze && n > 0;
  return {
    box: e ? L(28, 36, n) : 20,
    icon: e ? L(16, 20, n) : 14
  };
}
function Ar(n) {
  return n === "touch" || n === "pen";
}
let Zt = null;
const Ir = /* @__PURE__ */ new Set();
Rn && window.addEventListener("pointerdown", (n) => {
  Zt = n.pointerType, Ir.forEach((e) => e());
}, !0);
function Gd() {
  return Zt;
}
function pl() {
  const [, n] = ne(0), e = k(Zt);
  return ie(() => {
    const t = () => {
      e.current !== Zt && (e.current = Zt, n((r) => r + 1));
    };
    return Ir.add(t), () => {
      Ir.delete(t);
    };
  }, []), Zt;
}
const eo = ["(any-hover: hover)", "(any-pointer: fine)"];
function to() {
  return Rn ? eo.some((n) => window.matchMedia(n).matches) : !1;
}
let Gn = to();
const zr = /* @__PURE__ */ new Set();
function pi(n) {
  Gn !== n && (Gn = n, zr.forEach((e) => e()));
}
var Ki;
if (Rn) {
  const n = () => pi(to());
  for (const s of eo) {
    const l = window.matchMedia(s);
    (Ki = l.addEventListener) == null || Ki.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || pi(!0));
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
    const c = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    c[i] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, a.dispatchEvent(c);
  }, !0), window.addEventListener("click", (s) => {
    s[i] || r && Date.now() - r.time < 1e3 && Math.hypot(s.clientX - r.x, s.clientY - r.y) < 12 && (s.preventDefault(), s.stopPropagation());
  }, !0);
}
function Xd() {
  return Gn;
}
function Qd() {
  const [, n] = ne(0);
  return ie(() => {
    const e = () => n((t) => t + 1);
    return zr.add(e), () => {
      zr.delete(e);
    };
  }, []), Gn;
}
const jt = 220, Jr = "cubic-bezier(0.32, 0.72, 0, 1)", Kr = 170, Vr = 0.94;
function yr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function no(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function ro(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return no({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function ml(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Vr})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = ro(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${jt}ms ${Jr}, opacity ${Kr}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, jt + 60);
    });
  });
}
function gl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = ro(e, t);
  e.style.transition = `transform ${jt}ms ${Jr}, opacity ${Kr}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Vr})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, jt + 60);
}
function yl(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? no({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${jt}ms ${Jr}, opacity ${Kr}ms ease`, r.style.transform = `scale(${Vr})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, jt + 60));
    });
  });
}
function ar(n) {
  const e = k(null), [t, r] = ne(!1), i = k(null), o = k(0), s = oe((m) => {
    if (n.ref && (n.ref.current = m), m) {
      o.current = 0, e.current = m;
      const b = m.getBoundingClientRect();
      (b.width > 0 || b.height > 0) && (i.current = { left: b.left, top: b.top, width: b.width, height: b.height }), r(!0);
      return;
    }
    const g = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && yr(d.current) && yl(g, u.current, i.current));
    });
  }, []), l = oe(() => {
    const m = e.current;
    if (!m || getComputedStyle(m).transform !== "none") return;
    const g = m.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), a = k(n.visible);
  a.current = n.visible;
  const c = k(n.visible), u = k(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const f = k(n.onClosed);
  f.current = n.onClosed;
  const d = k(n.morph !== !1);
  d.current = n.morph !== !1;
  const h = k(0);
  return rt(() => {
    if (!t || !a.current || !yr(d.current)) return;
    const m = e.current;
    m && ml(h, m, u.current);
  }, [t, n.visible]), ie(() => {
    if (!t || !a.current) return;
    let m = 0;
    const g = () => {
      m = 0, l(), m = requestAnimationFrame(g);
    };
    return m = requestAnimationFrame(g), () => {
      m && cancelAnimationFrame(m);
    };
  }, [t, l]), rt(() => {
    var y;
    const m = c.current;
    if (c.current = n.visible, n.visible || !m) return;
    const g = e.current;
    if (!g || !yr(d.current)) {
      (y = f.current) == null || y.call(f);
      return;
    }
    gl(h, g, u.current, () => {
      var b;
      return (b = f.current) == null ? void 0 : b.call(f);
    });
  }, [n.visible]), ie(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", m, { capture: !0 }), () => document.removeEventListener("wheel", m, { capture: !0 });
  }, [t]), ie(() => {
    if (!t || !a.current) return;
    const m = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", m, { capture: !0 }), () => document.removeEventListener("touchmove", m, { capture: !0 });
  }, [t]), s;
}
const io = 384;
function xl(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function oo({
  anchorRef: n,
  panelRef: e,
  open: t,
  contentRef: r,
  anchorRectRef: i,
  gap: o = 4,
  padding: s = 8,
  maxHeight: l,
  minHeight: a = 32,
  onPosition: c
}) {
  const u = Mn(), f = k(u);
  f.current = u;
  const d = k(c);
  d.current = c, rt(() => {
    if (!t) return;
    let h = 0, m = !1;
    const g = () => {
      h || (h = requestAnimationFrame(y));
    }, y = () => {
      if (h = 0, m) return;
      const M = f.current, F = n.current, _ = e.current;
      if (!M || !F || !_ || !_.isConnected) return;
      const T = (r == null ? void 0 : r.current) ?? _, J = xl(M), R = l ?? io, W = Math.min(a, R), H = Math.max(0, _.offsetHeight - T.offsetHeight), V = Math.max(W, Math.ceil(T.scrollHeight + H)), K = Math.min(V, R);
      _.style.maxHeight = `${K}px`;
      let S = K;
      const O = i == null ? void 0 : i.current;
      qs(O ? {
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
      } : F, _, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Ui(o),
          Gi({ boundary: J, padding: s, fallbackStrategy: "bestFit" }),
          Xi({ boundary: J, padding: s, mainAxis: !1 }),
          Js({
            boundary: J,
            padding: s,
            apply({ availableHeight: ae }) {
              S = Math.max(W, Math.floor(Math.min(R, ae))), _.style.maxHeight = `${S}px`;
            }
          })
        ]
      }).then(({ x: ae, y: X, placement: re }) => {
        m || d.current({
          top: Math.round(X),
          left: Math.round(ae),
          maxH: S,
          side: re.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    y();
    const b = f.current, z = (b == null ? void 0 : b.document) ?? null, E = (b == null ? void 0 : b.visualViewport) ?? null, w = () => g();
    E == null || E.addEventListener("resize", w), E == null || E.addEventListener("scroll", w), b == null || b.addEventListener("resize", w), z == null || z.addEventListener("scroll", w, { capture: !0, passive: !0 });
    let N = null;
    return typeof ResizeObserver < "u" && (N = new ResizeObserver(w), e.current && N.observe(e.current), r != null && r.current && N.observe(r.current)), () => {
      m = !0, h && cancelAnimationFrame(h), E == null || E.removeEventListener("resize", w), E == null || E.removeEventListener("scroll", w), b == null || b.removeEventListener("resize", w), z == null || z.removeEventListener("scroll", w, { capture: !0 }), N == null || N.disconnect();
    };
  }, [t, n, e, r, i, o, s, l, a]);
}
let Ut = null;
function so(n) {
  return Ut == null || Ut(), Ut = n, () => {
    Ut === n && (Ut = null);
  };
}
const lo = Jt(null);
function Yr(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Ur({ theme: n, children: e }) {
  return /* @__PURE__ */ p(lo.Provider, { value: n, children: e });
}
function Zd({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = St();
  return /* @__PURE__ */ p(Ur, { theme: Yr({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function ef({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = St(), a = Yr({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ p(Ur, { theme: a, children: /* @__PURE__ */ p(
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
function St() {
  return Kt(lo);
}
function bl(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function ao(n, e) {
  if (n) return { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = bl(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function vl(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function wl(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
function kl(n) {
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
  const r = t ?? kl(n);
  if (!r || !r.contains(n)) return;
  const i = n.getBoundingClientRect(), o = r.getBoundingClientRect();
  if (e === "center") {
    r.scrollTop += i.top + i.height / 2 - (o.top + o.height / 2);
    return;
  }
  i.top < o.top ? r.scrollTop -= o.top - i.top : i.bottom > o.bottom && (r.scrollTop += i.bottom - o.bottom);
}
function co({
  open: n,
  row: e,
  block: t = "nearest",
  scroller: r,
  ready: i
}) {
  const o = k(!1), s = k(!1), l = k(!1), a = k({ row: e, scroller: r, block: t });
  a.current = { row: e, scroller: r, block: t };
  const c = oe(() => {
    o.current = !0;
  }, []);
  return rt(() => {
    if (!n) {
      s.current = !1, l.current = !1, o.current = !1;
      return;
    }
    if (s.current) return;
    s.current = !0;
    const { row: u, scroller: f, block: d } = a.current, h = u();
    h && (sn(h, d, (f == null ? void 0 : f()) ?? null), l.current = !0);
  }, [n]), ie(() => {
    if (!n || i !== !0 || !l.current) return;
    const u = requestAnimationFrame(() => {
      if (!l.current || (l.current = !1, o.current)) return;
      const { row: f, scroller: d } = a.current;
      sn(f(), "nearest", (d == null ? void 0 : d()) ?? null);
    });
    return () => cancelAnimationFrame(u);
  }, [n, i]), { engagedRef: o, engage: c };
}
const Gr = Jt("dark"), uo = () => Kt(Gr);
function Xr() {
  const n = Ie();
  return {
    padding: `${L(8, 12, n)}px ${L(12, 16, n)}px`,
    fontSize: `${L(12, 14, n)}px`,
    lineHeight: `${L(18, 22, n)}px`
  };
}
function fo() {
  const n = Ie();
  return {
    padding: `${L(6, 9, n)}px ${L(12, 16, n)}px ${L(2, 3, n)}px`,
    fontSize: `${L(10, 11, n)}px`,
    lineHeight: `${L(14, 16, n)}px`
  };
}
const Sl = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", mi = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Nl = (n) => n ? "text-xs" : "text-[10px]";
function cr(n) {
  const e = ze && Qi() > 0;
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
    headerPad: mi(e),
    headerText: `${mi(e)} font-semibold uppercase tracking-wider ${Nl(e)} ui-label`,
    // Item padding
    itemPad: Sl(e),
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
function ho(n) {
  const e = [];
  return Pe.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Pe.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Qr = Jt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), An = Jt(null), Zr = () => Kt(An), po = Jt({ query: "", setQuery: () => {
} }), Tl = () => Kt(po), El = () => !0;
function ur(n) {
  const e = k([]), [t, r] = ne(-1), [i, o] = ne(!1), [s, l] = ne(0), a = oe((d) => (e.current = [...e.current, d], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== d), l((h) => h + 1);
  }), []), c = oe((d, h) => {
    r(d), o(h === "pointer");
  }, []), u = oe(() => {
    o((d) => d && (r(-1), !1));
  }, []);
  return ut(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: n ? e.current.filter(n) : e.current,
    highlightedIndex: t,
    pointerDriven: i,
    register: a,
    setHighlighted: c,
    pointerLeave: u
  }), [t, i, s, a, c, u, n]);
}
function mo(n) {
  const e = Zr(), t = k(e);
  t.current = e;
  const r = k(null);
  ie(() => {
    var a, c;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0 };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function ei(n, e, t, r) {
  const i = k(-1);
  i.current = e.highlightedIndex;
  const o = k(e);
  o.current = e;
  const s = k(n);
  s.current = n;
  const l = k(r);
  l.current = r;
  const a = k({ text: "", time: 0 }), c = k(!1);
  c.current || (c.current = !0, t.current = (u) => {
    var m, g, y, b, z;
    if (!s.current) return;
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const E = (g = (m = l.current) == null ? void 0 : m.onFieldKey) == null ? void 0 : g.call(m, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), E && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const E = u.key === "ArrowDown" ? 1 : -1, w = (i.current + E + h.length) % h.length;
        o.current.setHighlighted(w, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const E = i.current;
        E >= 0 && E < h.length && h[E].submenu && h[E].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (z = (b = l.current) == null ? void 0 : b.onCloseSub) == null || z.call(b);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const E = i.current;
        E >= 0 && E < h.length && h[E].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const E = Date.now(), w = (E - a.current.time > 500 ? "" : a.current.text) + u.key.toLowerCase();
        if (a.current = { text: w, time: E }, !w) return;
        const N = i.current + 1;
        for (let M = 0; M < h.length; M++) {
          const F = (N + M) % h.length;
          if (h[F].label.toLowerCase().startsWith(w)) {
            o.current.setHighlighted(F, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ti(n, e, t, r, i, o, s) {
  const l = k(e);
  l.current = e;
  const a = k(n);
  a.current = n;
  const c = k(i);
  c.current = i;
  const u = k(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const f = k(!1);
  f.current || (f.current = !0, o.current = (d) => {
    if (!a.current || c.current) return;
    const h = r.current;
    if (h && h.contains(d.target)) return;
    if (u.current) {
      const g = d.target;
      if (g && g.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(d.key === "ArrowDown" || d.key === "ArrowUp" || d.key === "ArrowLeft" || d.key === "ArrowRight" || d.key === "Enter" || d.key === " " || d.key.length === 1 && !d.ctrlKey && !d.metaKey && !d.altKey) || (d.preventDefault(), d.stopImmediatePropagation(), t.current(d));
  });
}
function ni(n, e) {
  const t = k(n);
  t.current = n;
  const r = k(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function dr({
  open: n,
  onClose: e,
  onOpenChange: t,
  trigger: r,
  align: i = "left",
  width: o,
  theme: s,
  children: l,
  morph: a = !0,
  contentClassName: c,
  maxMenuHeight: u,
  initialHighlightIndex: f,
  searchable: d = !1,
  searchPlaceholder: h,
  searchFilter: m,
  searchValue: g,
  onSearchValueChange: y
}) {
  const b = St(), z = ao(s, b), E = z.theme, [w, N] = ne([]), [M, F] = ne(null), _ = un(), T = qr(), J = k(null), R = k(null), W = k(n);
  W.current = n;
  const [H, V] = ne(n), [K, S] = ne(""), O = d && g !== void 0, ee = O ? g : K, ae = O ? y ?? (() => {
  }) : S, [X, re] = ne(!1), I = O && !X ? "" : ee, P = k(null), $ = Ie(), Q = {
    padding: `${L(8, 12, $)}px ${L(12, 16, $)}px`,
    fontSize: `${L(12, 14, $)}px`
  }, [q, le] = ne(0), se = d && !O;
  ie(() => {
    var He;
    if (!se || !n) return;
    const j = (He = R.current) == null ? void 0 : He.querySelector("[data-menu-items]");
    if (!j) return;
    const Z = () => le(j.offsetWidth - j.clientWidth);
    Z();
    const me = new ResizeObserver(Z);
    return me.observe(j), () => me.disconnect();
  }, [n, se, ee]);
  const _e = ut(() => {
    if (!d) return;
    const j = I.trim().toLowerCase();
    return j ? (Z) => {
      var me;
      return m ? m(j, Z.label, Z.group) : Z.label.toLowerCase().includes(j) || (((me = Z.group) == null ? void 0 : me.toLowerCase().includes(j)) ?? !1);
    } : El;
  }, [I, d, m]), D = ur(_e), he = d && I.trim() !== "" && D.items.length === 0;
  ie(() => {
    if (n)
      return V(!0), O || S(""), re(!1), D.setHighlighted(f ?? -1, "keyboard"), so(() => {
        t == null || t(!1), e == null || e();
      });
    N([]), re(!1);
  }, [n, f, t, e]), ie(() => {
    if (!n || !T) return;
    const j = (Z) => {
      if (Z.pointerType !== "touch") return;
      const me = Z.target;
      me && (R.current && R.current.contains(me) || J.current && J.current.contains(me) || me instanceof Element && me.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return T.addEventListener("pointerdown", j, { capture: !0 }), () => T.removeEventListener("pointerdown", j, { capture: !0 });
  }, [n, T, t, e]);
  const $e = oe(() => {
    const j = J.current;
    if (!j) return null;
    const Z = j.getBoundingClientRect();
    return { left: Z.left, top: Z.top, width: Z.width, height: Z.height };
  }, []), ue = ar({
    visible: n,
    morph: a,
    anchor: $e,
    onClosed: () => V(!1)
  }), De = k(() => {
  }), Ne = k(() => {
  }), xe = k(() => {
  }), be = oe((j) => {
    if (j.key === "Enter") {
      const Z = D.highlightedIndex, me = D.items[Z >= 0 ? Z : 0];
      return me == null || me.activate(), !0;
    }
    return j.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [D, t, e]);
  ei(n && w.length === 0, D, De, { onFieldKey: be }), ni(n, Ne), ti(n, D, De, R, w.length > 0, xe, { ignoreFields: O });
  const ve = k(null), Fe = oe((j) => {
    var Z;
    if (j) {
      j.addEventListener("keydown", De.current, { capture: !0 }), j.addEventListener("wheel", Ne.current, { passive: !1 });
      const me = j.ownerDocument;
      ve.current = me, me.addEventListener("keydown", xe.current, { capture: !0 }), Oe(!0);
    } else
      (Z = ve.current) == null || Z.removeEventListener("keydown", xe.current, { capture: !0 }), ve.current = null, Oe(!1);
    R.current = j, ue(j);
  }, [ue]), [we, tt] = ne({ top: 0, left: 0, maxH: io, side: "bottom", ready: !1 }), [Ue, Nt] = ne(0), [fn, Oe] = ne(!1);
  ie(() => {
    n && J.current && Nt(J.current.getBoundingClientRect().width);
  }, [n]), oo({
    anchorRef: J,
    panelRef: R,
    open: n && fn,
    maxHeight: u,
    onPosition: tt
  }), ie(() => {
    var j;
    if (we.ready && n) {
      if (d) {
        (j = P.current ?? J.current) == null || j.focus();
        return;
      }
      const Z = R.current;
      Z && Z.ownerDocument.activeElement !== Z && !Z.contains(Z.ownerDocument.activeElement) && Z.focus();
    }
  }, [we.ready, n, d]), ie(() => {
    if (!n || !d) return;
    if (D.items.length === 0) {
      D.highlightedIndex !== -1 && D.setHighlighted(-1, "keyboard");
      return;
    }
    const j = D.highlightedIndex;
    (j < 0 || j >= D.items.length) && D.setHighlighted(0, "keyboard");
  }, [n, ee, d, D.items.length]), rt(() => {
    var Z;
    if (!n || D.highlightedIndex < 0 || D.pointerDriven) return;
    const j = (Z = R.current) == null ? void 0 : Z.querySelector(`[data-ei="${D.highlightedIndex}"]`);
    sn(j, "nearest", R.current);
  }, [n, D.highlightedIndex, D.pointerDriven]);
  const Dt = oe((j) => {
    !j && !W.current || (!j && st.current && (bt.current = !0), t ? t(j) : j || e == null || e());
  }, [t, e]), Ze = k(H);
  Ze.current = H;
  const st = k(!1), bt = k(!1), Yt = oe(() => {
    if (!W.current && Ze.current) {
      if (bt.current) {
        bt.current = !1, st.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), mt = Pe.isValidElement(r) ? r : null, Ot = mt ? Pe.cloneElement(mt, {
    ref: (j) => {
      J.current = j;
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...O ? { type: mt.props.type ?? "text" } : {},
    onPointerDown: (j) => {
      var Z;
      st.current = !0, bt.current = !1, O && (j.preventDefault(), W.current || t == null || t(!0), (Z = J.current) == null || Z.focus());
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (j) => {
      O && j.key === " " && j.stopPropagation();
    },
    onClick: (j) => {
      var Z, me;
      (me = (Z = mt.props).onClick) == null || me.call(Z, j), Yt();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (j) => {
      var Z, me;
      if ((me = (Z = mt.props).onKeyDown) == null || me.call(Z, j), !(!O || !W.current)) {
        if (j.key.length === 1 && !j.ctrlKey && !j.metaKey && !j.altKey)
          re(!0);
        else if (j.key === "ArrowDown" || j.key === "ArrowUp") {
          j.preventDefault();
          const He = D.items;
          if (He.length === 0) return;
          const Se = j.key === "ArrowDown" ? 1 : -1, lt = (D.highlightedIndex + Se + He.length) % He.length;
          D.setHighlighted(lt, "keyboard");
        } else if (j.key === "Enter") {
          j.preventDefault();
          const He = D.highlightedIndex, Se = D.items[He >= 0 ? He : 0];
          Se == null || Se.activate();
        }
      }
    }
  }) : r, gt = /* @__PURE__ */ C("div", { "data-menu-search-empty": !0, className: "px-3 py-3 text-center", children: [
    /* @__PURE__ */ C("div", { className: "text-xs font-medium text-[color:var(--ui-text-muted)]", children: [
      "No matches for “",
      I.trim(),
      "”"
    ] }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-[color:var(--ui-text-faint)]", children: "Try a different search." })
  ] }), ke = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${se ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ C(ye.Root, { open: n || H, onOpenChange: Dt, modal: !1, children: [
    /* @__PURE__ */ p(ye.Trigger, { asChild: !0, children: Ot }),
    /* @__PURE__ */ p(ye.Portal, { container: _ ?? void 0, children: /* @__PURE__ */ p(Gr.Provider, { value: E, children: /* @__PURE__ */ p(Qr.Provider, { value: { chain: w, setChain: N, morph: a, keyboardOpened: M, setKeyboardOpened: F }, children: /* @__PURE__ */ p(An.Provider, { value: D, children: /* @__PURE__ */ p(po.Provider, { value: { query: ee, setQuery: ae }, children: /* @__PURE__ */ C(
      ye.Content,
      {
        ref: Fe,
        ...z.attrs,
        "data-ui-fixed": !0,
        className: `${ke} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: we.left,
          top: we.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Ue || void 0,
          maxHeight: we.maxH,
          visibility: we.ready ? "visible" : "hidden"
        },
        onPointerLeave: D.pointerLeave,
        onFocus: O ? (j) => {
          if (j.target !== j.currentTarget) return;
          const Z = J.current;
          Z && Z.ownerDocument.activeElement !== Z && Z.focus();
        } : void 0,
        onCloseAutoFocus: O ? (j) => {
          var Z;
          j.preventDefault(), (Z = J.current) == null || Z.focus();
        } : void 0,
        children: [
          se && /* @__PURE__ */ p("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: q }, children: /* @__PURE__ */ C("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: Q, children: [
            /* @__PURE__ */ p(Lt, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ p(
              "input",
              {
                ref: P,
                value: ee,
                onChange: (j) => ae(j.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            ee ? /* @__PURE__ */ p(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (j) => j.stopPropagation(),
                onClick: () => {
                  var j;
                  ae(""), (j = P.current) == null || j.focus();
                },
                children: /* @__PURE__ */ p(_t, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ p("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          se ? /* @__PURE__ */ C("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: [
            l,
            he && gt
          ] }) : /* @__PURE__ */ C(Ke, { children: [
            l,
            he && gt
          ] })
        ]
      }
    ) }) }) }) }) })
  ] });
}
function tf({
  open: n,
  onClose: e,
  items: t,
  activeId: r,
  onSelect: i,
  onRename: o,
  onDuplicate: s,
  onDelete: l,
  onCreate: a,
  onImport: c,
  onExport: u,
  onReset: f,
  onTrash: d,
  closeOnSelect: h,
  readOnly: m = !1,
  theme: g,
  align: y,
  label: b,
  header: z,
  itemLabel: E,
  trigger: w,
  minItems: N = 1,
  itemRender: M,
  morph: F = !0,
  contentClassName: _
}) {
  const T = cr(), J = Xr(), [R, W] = ne(null), [H, V] = ne(""), K = k(H);
  K.current = H;
  const S = k(null), O = k(null), ee = co({
    open: n,
    scroller: () => O.current,
    row: () => {
      var P;
      return ((P = O.current) == null ? void 0 : P.querySelector('[data-active="1"]')) ?? null;
    }
  });
  ie(() => {
    var Q;
    if (!n) return;
    const P = (q) => {
      var ue, De, Ne;
      const le = q.target;
      if (le && le.closest("input, textarea, [contenteditable]")) {
        R && le === S.current && (q.key === "Enter" ? (q.preventDefault(), q.stopImmediatePropagation(), X()) : q.key === "Escape" && (q.preventDefault(), q.stopImmediatePropagation(), re()));
        return;
      }
      const se = (ue = O.current) == null ? void 0 : ue.closest(".ui-menu");
      if (!se || !se.contains(q.target)) return;
      const _e = se.ownerDocument, D = [...se.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], he = [...se.querySelectorAll('div:last-child > [role="menuitem"]')], $e = [...D, ...he];
      if (q.key === "ArrowDown" || q.key === "ArrowUp") {
        q.preventDefault(), q.stopImmediatePropagation();
        const xe = _e.activeElement;
        let be = xe ? $e.indexOf(xe) : -1;
        if (be < 0 && xe) {
          const we = xe.closest("[data-active]"), tt = we == null ? void 0 : we.querySelector('[role="menuitem"]:first-child');
          tt && (be = D.indexOf(tt));
        }
        const ve = q.key === "ArrowDown" ? 1 : -1, Fe = be < 0 ? ve === 1 ? 0 : $e.length - 1 : (be + ve + $e.length) % $e.length;
        (De = $e[Fe]) == null || De.focus({ preventScroll: !0 });
        return;
      }
      if (q.key === "ArrowLeft" || q.key === "ArrowRight") {
        const xe = _e.activeElement, be = xe == null ? void 0 : xe.closest("[data-active]");
        if (!be) return;
        q.preventDefault(), q.stopImmediatePropagation();
        const ve = [...be.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ve.length === 0) return;
        const Fe = xe && be.contains(xe) ? ve.indexOf(xe) : -1, we = q.key === "ArrowRight" ? 1 : -1, tt = Fe < 0 ? 0 : (Fe + we + ve.length) % ve.length;
        (Ne = ve[tt]) == null || Ne.focus({ preventScroll: !0 });
        return;
      }
    }, $ = ((Q = O.current) == null ? void 0 : Q.ownerDocument) ?? null;
    return $ == null || $.addEventListener("keydown", P, { capture: !0 }), () => $ == null ? void 0 : $.removeEventListener("keydown", P, { capture: !0 });
  }, [n, R]), ie(() => {
    if (!R) return;
    const P = t.find((le) => le.id === R);
    P && !H && V(P.name);
    const $ = requestAnimationFrame(() => {
      const le = S.current;
      le && (le.focus(), le.select());
    });
    let Q = 0;
    const q = window.setInterval(() => {
      const le = S.current;
      if (Q++, !le || Q > 12) {
        clearInterval(q);
        return;
      }
      le.ownerDocument.activeElement !== le && (le.focus(), le.select());
    }, 50);
    return () => {
      cancelAnimationFrame($), clearInterval(q);
    };
  }, [R]), ie(() => {
    if (R) {
      const P = t.find(($) => $.id === R);
      P && !H && V(P.name);
    }
  }, [R, t]);
  const ae = (P, $) => {
    W(P), V($);
  }, X = () => {
    R && K.current.trim() && o(R, K.current.trim()), W(null);
  }, re = () => {
    W(null);
  }, I = E || z.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ C(dr, { open: n, onOpenChange: (P) => {
    P ? (W(null), V("")) : (R && H.trim() && o(R, H.trim()), W(null), V("")), (!P || !m) && e(P);
  }, width: "w-80", theme: g, align: y, trigger: w, morph: F, contentClassName: _, children: [
    /* @__PURE__ */ p("div", { className: `shrink-0 ${T.headerText}`, children: z }),
    /* @__PURE__ */ p("div", { ref: O, onPointerEnter: ee.engage, onPointerDown: ee.engage, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((P) => {
      const $ = P.id === r, Q = R === P.id;
      return /* @__PURE__ */ p("div", { "data-active": $ ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${$ || Q ? T.rowActiveBg : T.rowHoverBg} ${R && !Q ? "opacity-40 pointer-events-none" : ""}`, children: Q ? /* @__PURE__ */ C(Ke, { children: [
        /* @__PURE__ */ p("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ p(
          "input",
          {
            ref: S,
            autoFocus: !0,
            value: H,
            onChange: (q) => V(q.target.value),
            onKeyDown: (q) => {
              q.key === "Enter" && (q.preventDefault(), q.stopPropagation(), X()), q.key === "Escape" && (q.preventDefault(), q.stopPropagation(), re());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: J
          }
        ) }),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${T.editConfirm}`,
            onSelect: (q) => {
              q.preventDefault(), X();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(or, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${T.editCancel}`,
            onSelect: (q) => {
              q.preventDefault(), re();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p(_t, { className: T.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ C(Ke, { children: [
        /* @__PURE__ */ p(
          ye.Item,
          {
            style: J,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${T.rowText} ${$ ? "" : T.rowTextHover}`,
            onSelect: h ? () => {
              i(P.id);
            } : (q) => {
              q.preventDefault(), i(P.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ p("span", { className: `truncate ${$ ? T.rowActiveText : ""}`, children: M ? M(P) : P.name })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${$ ? T.btnActive : T.btnBase}`,
            onSelect: (q) => {
              q.preventDefault(), ae(P.id, P.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Os, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${$ ? T.btnActive : T.btnBase}`,
            onSelect: (q) => {
              q.preventDefault();
              const le = s(P.id);
              le && ae(le, `${P.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ p(Vi, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ p(
          ye.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= N ? T.btnDisabled : $ ? T.btnDangerActive : T.btnDanger}`,
            onSelect: (q) => {
              q.preventDefault(), l(P.id);
            },
            onTouchStart: () => {
            },
            disabled: m || t.length <= N,
            children: /* @__PURE__ */ p(Rr, { className: T.btnIcon })
          }
        )
      ] }) }, P.id);
    }) }),
    /* @__PURE__ */ C("div", { className: `shrink-0 ${R ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ C(Ke, { children: [
        /* @__PURE__ */ p(ye.Separator, { className: T.separator }),
        /* @__PURE__ */ C(
          ye.Item,
          {
            className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
            onSelect: (P) => {
              P.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ p(Yi, { className: `${T.btnIcon} ${T.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || c || u || d) && /* @__PURE__ */ p(ye.Separator, { className: T.separator }),
      a && /* @__PURE__ */ C(
        ye.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault();
            const $ = a();
            $ && ae($, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(jr, { className: `${T.btnIcon} ${T.icon}` }),
            "New ",
            I
          ]
        }
      ),
      c && /* @__PURE__ */ C(
        ye.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ C(
        ye.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ C("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ p("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ p("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ p("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ C(
        ye.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (P) => {
            P.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ p(Rr, { className: `${T.btnIcon} ${T.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Cl({
  onClick: n,
  icon: e,
  disabled: t = !1,
  variant: r = "default",
  className: i = "",
  children: o,
  keepOpen: s = !1,
  selected: l = !1,
  rightAction: a,
  trailing: c,
  group: u
}) {
  var T;
  uo();
  const f = cr(), d = Xr(), h = fo(), m = k(!1), g = k(null), { myIndex: y, highlighted: b, setPointer: z, api: E } = mo({
    label: () => ho(o),
    activate: () => {
      t || n();
    },
    disabled: t,
    group: u
  }), { query: w } = Tl(), N = w.trim() !== "" && y < 0, M = u == null ? void 0 : u.trim(), F = !!M && y >= 0 && (y === 0 || ((T = E == null ? void 0 : E.items[y - 1]) == null ? void 0 : T.group) !== M), _ = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ C(Ke, { children: [
    F && /* @__PURE__ */ p(
      "div",
      {
        "data-menu-group": M,
        role: "presentation",
        className: "ui-label shrink-0 select-none font-semibold uppercase tracking-wider pointer-events-none",
        style: h,
        children: M
      }
    ),
    /* @__PURE__ */ C(
      ye.Item,
      {
        ref: g,
        "data-ei": y >= 0 ? y : void 0,
        style: { ...d, display: N ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${_} ${l ? "ui-item-selected" : ""} ${b ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (J) => {
          if (m.current) {
            m.current = !1;
            return;
          }
          s && J.preventDefault(), n();
        },
        onPointerEnter: () => {
          z(y);
        },
        onTouchStart: () => {
        },
        disabled: t,
        children: [
          e && /* @__PURE__ */ p("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: o }),
          c && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
          a && /* @__PURE__ */ p(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: a.title,
              onPointerDown: (J) => {
                J.stopPropagation(), J.preventDefault(), m.current = !0, a.onClick();
              },
              onClick: (J) => {
                J.stopPropagation(), J.preventDefault();
              },
              children: a.icon
            }
          )
        ]
      }
    )
  ] });
}
function Ml({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: a, morph: c, keyboardOpened: u, setKeyboardOpened: f } = Kt(Qr), d = l.includes(n), h = l[l.length - 1] === n, m = uo(), g = un(), y = k(null), b = k(null), [z, E] = ne(d), w = !d && z;
  ie(() => {
    d && E(!0);
  }, [d]);
  const N = () => a(($) => {
    const Q = $.indexOf(n);
    return Q >= 0 ? $.slice(0, Q) : $;
  }), M = ur(), F = Zr(), _ = k(F);
  _.current = F;
  const T = k(null);
  ie(() => {
    var Q;
    const $ = {
      label: e,
      activate: () => {
        f(n), a((q) => q.includes(n) ? q : [...q, n]);
      },
      submenu: !0
    };
    return T.current = $, (Q = _.current) == null ? void 0 : Q.register($);
  }, []);
  const J = F && T.current ? F.items.indexOf(T.current) : -1, R = J >= 0 && J === F.highlightedIndex, W = oe(() => {
    const $ = y.current;
    if (!$) return null;
    const Q = $.getBoundingClientRect();
    return { left: Q.left, top: Q.top, width: Q.width, height: Q.height };
  }, []), H = ar({
    visible: d,
    morph: c,
    anchor: W,
    onClosed: () => E(!1)
  }), V = k(() => {
  }), K = k(() => {
  }), S = k(() => {
  });
  ei(d && h, M, V, {
    onCloseSub: () => {
      N(), F && J >= 0 && F.setHighlighted(J, "keyboard");
    }
  });
  const O = k(u);
  O.current = u, ie(() => {
    d && (O.current === n ? (M.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var $;
      return ($ = b.current) == null ? void 0 : $.focus();
    }), f(null)) : M.setHighlighted(-1, "keyboard"));
  }, [d]), ni(d, K), ti(d, M, V, b, !h, S), Pe.useLayoutEffect(() => {
    var Q;
    if (!d || M.highlightedIndex < 0 || M.pointerDriven) return;
    const $ = (Q = b.current) == null ? void 0 : Q.querySelector(`[data-ei="${M.highlightedIndex}"]`);
    sn($, "nearest", b.current);
  }, [d, M.highlightedIndex, M.pointerDriven]);
  const ee = k(null), ae = oe(($) => {
    var Q;
    if ($) {
      $.addEventListener("keydown", V.current, { capture: !0 }), $.addEventListener("wheel", K.current, { passive: !1 });
      const q = $.ownerDocument;
      ee.current = q, q.addEventListener("keydown", S.current, { capture: !0 });
    } else
      (Q = ee.current) == null || Q.removeEventListener("keydown", S.current, { capture: !0 }), ee.current = null;
    b.current = $, H($);
  }, [H]), X = Ie(), re = { padding: `${L(8, 12, X)}px ${L(12, 16, X)}px`, fontSize: L(12, 14, X) }, I = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${R ? " ui-item-highlighted" : ""}${w ? " ui-sub-closing" : ""}`, P = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ C(ye.Sub, { open: d || z, onOpenChange: ($) => a((Q) => {
    if (!$) {
      const q = Q.indexOf(n);
      return q >= 0 ? Q.slice(0, q) : Q;
    }
    return Q.includes(n) ? Q : [...Q, n];
  }), children: [
    /* @__PURE__ */ C(
      ye.SubTrigger,
      {
        ref: y,
        "data-ei": J >= 0 ? J : void 0,
        style: re,
        className: I,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          F && J >= 0 && F.setHighlighted(J, "pointer");
        },
        onPointerDown: ($) => {
          $.pointerType === "pen" && ($.preventDefault(), a((Q) => d ? Q.slice(0, Q.indexOf(n)) : [...Q, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ p(Un, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ p("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ p(Un, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ p(ye.Portal, { container: g ?? void 0, children: /* @__PURE__ */ p(
      ye.SubContent,
      {
        ref: ae,
        "data-theme": m,
        className: P,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: M.pointerLeave,
        children: /* @__PURE__ */ p(An.Provider, { value: M, children: o })
      }
    ) })
  ] });
}
const mn = 8, nf = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const a = St(), c = s ? { theme: s, attrs: { "data-theme": s } } : a ? ao(void 0, a) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, f = Ie(), d = L(12, 14, f), h = k(null), m = Mn(), [g, y] = ne(!1), [b, z] = ne([]), [E, w] = ne(null), N = ur();
  ie(() => {
    if (n)
      return N.setHighlighted(-1, "keyboard"), so(r);
  }, [n, r]);
  const M = k({ left: e, top: t });
  n && (M.current = { left: e, top: t });
  const F = oe(() => ({ left: M.current.left, top: M.current.top, width: 0, height: 0 }), []), _ = ar({
    visible: !0,
    morph: l,
    anchor: F,
    cloneOnUnmount: !0
  }), T = k(() => {
  }), J = k(() => {
  }), R = k(() => {
  });
  ei(n, N, T), ni(n, J), ti(n, N, T, h, b.length > 0, R);
  const W = k(null), H = oe((S) => {
    var O;
    if (S) {
      S.addEventListener("keydown", T.current, { capture: !0 }), S.addEventListener("wheel", J.current, { passive: !1 });
      const ee = S.ownerDocument;
      W.current = ee, ee.addEventListener("keydown", R.current, { capture: !0 });
    } else
      (O = W.current) == null || O.removeEventListener("keydown", R.current, { capture: !0 }), W.current = null;
    h.current = S, y(!!S), _(S);
  }, [_]), [V, K] = ne(null);
  return rt(() => {
    var q;
    if (!n || !g || !h.current) return;
    const S = h.current, O = S.offsetWidth, ee = S.offsetHeight, ae = (q = o == null ? void 0 : o.current) == null ? void 0 : q.getBoundingClientRect(), X = ae ? ae.right : (m == null ? void 0 : m.innerWidth) ?? 0, re = ae ? ae.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, I = ae ? ae.left : 0, P = ae ? ae.top : 0;
    let $ = Math.max(P + mn, M.current.top), Q = Math.max(I + mn, M.current.left);
    Q + O > X && (Q = X - O - mn), $ + ee > re && ($ = Math.max(P + mn, re - ee - mn)), K({ left: Q, top: $ });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ C(ye.Root, { open: n, onOpenChange: (S) => {
    S || r();
  }, modal: !1, children: [
    /* @__PURE__ */ p(ye.Trigger, { asChild: !0, children: /* @__PURE__ */ p("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ p(ye.Portal, { children: /* @__PURE__ */ p(Gr.Provider, { value: u, children: /* @__PURE__ */ p(Qr.Provider, { value: { chain: b, setChain: z, morph: l, keyboardOpened: E, setKeyboardOpened: w }, children: /* @__PURE__ */ p(An.Provider, { value: N, children: /* @__PURE__ */ p(
      ye.Content,
      {
        ref: H,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: d, left: (V == null ? void 0 : V.left) ?? M.current.left, top: (V == null ? void 0 : V.top) ?? M.current.top, touchAction: "manipulation" },
        onPointerLeave: N.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, rf = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Ie(), a = { padding: `${L(8, 12, l)}px ${L(12, 16, l)}px`, fontSize: L(12, 14, l) }, c = Zr(), u = k(c);
  u.current = c;
  const f = k(null);
  ie(() => {
    var g;
    const m = { label: ho(s), activate: () => {
      r || n();
    } };
    return f.current = m, (g = u.current) == null ? void 0 : g.register(m);
  }, []);
  const d = c && f.current ? c.items.indexOf(f.current) : -1, h = !r && d >= 0 && d === c.highlightedIndex;
  return /* @__PURE__ */ C(
    ye.Item,
    {
      "data-ei": d >= 0 ? d : void 0,
      onClick: r ? void 0 : n,
      onPointerEnter: () => {
        !r && c && d >= 0 && c.setHighlighted(d, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: a,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ p("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, of = () => /* @__PURE__ */ p(ye.Separator, { className: "ui-sep my-1" }), sf = (n) => /* @__PURE__ */ p(Ml, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), pe = 8, go = "[data-modal-stack]", vt = 220, wn = "cubic-bezier(0.32, 0.72, 0, 1)", Jn = 0.94;
function Gt() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Rt(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function yo(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function gi(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = yo(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${vt}ms ${wn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, vt + 80));
    });
  });
}
function Rl(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Jn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${vt}ms ${wn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, vt + 60));
    });
  });
}
function yi(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Jn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Jn, height: i.height * Jn };
  e.style.transition = `transform ${vt}ms ${wn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = yo(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, vt + 60);
}
function xr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(go) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function On(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(go) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Al({
  open: n,
  onClose: e,
  title: t,
  icon: r,
  width: i,
  footer: o,
  children: s,
  onReset: l,
  morph: a = !0,
  flat: c = !1,
  closable: u = !0,
  dismissOnBackdrop: f = !0,
  theme: d,
  surface: h,
  accent: m
}) {
  const g = St(), y = Yr(
    { mode: d, accent: m, surface: h, context: "surface" },
    g
  ), b = y.mode, z = y.surface, E = y.accent, w = k(null), N = k(null), M = k(null), F = Ie(), _ = L(20, 24, F), T = L(10, 12, F), J = L(12, 14, F), R = L(14, 16, F), W = L(20, 24, F), H = L(20, 24, F), V = L(20, 24, F), K = L(14, 16, F), S = L(16, 20, F), O = L(10, 12, F), ee = L(12, 14, F), ae = L(8, 10, F), X = L(4, 6, F), re = { padding: `${T}px ${_}px` }, I = { fontSize: J }, P = { padding: `${H}px ${W}px 16px ${W}px` }, $ = { fontSize: R }, Q = { padding: `0 ${W}px 16px` }, q = { padding: `${V}px ${W}px` }, le = { fontSize: O, padding: `${X}px ${ae}px` }, [se, _e] = ne(!1), D = oe((v) => {
    w.current = v, _e(v !== null);
  }, []), he = un(), $e = Mn(), ue = k($e);
  ue.current = $e;
  const [De, Ne] = ne(null), xe = k(null), be = k(!1), ve = k(!1), Fe = k(0), we = k({ w: 0, h: 0 }), tt = k(!1), [Ue, Nt] = ne(!1), [fn, Oe] = ne(!1), Dt = k(0), Ze = k(!1), [st, bt] = ne(!1), Yt = k(a);
  Yt.current = a;
  const mt = k(!1), Ot = k(!1), gt = () => {
    Ot.current = !0, Nt(!0);
  }, ke = () => {
    Ot.current = !1, Nt(!1);
  };
  ie(() => {
    n || (Ne(null), tt.current = !1, be.current = !1, Oe(!1));
  }, [n]), rt(() => {
    if (!n || tt.current || !se || !w.current) return;
    tt.current = !0;
    const v = w.current.getBoundingClientRect(), G = ue.current ?? null, te = (G == null ? void 0 : G.innerWidth) ?? 0, de = Rt(G);
    Ne({
      left: Math.max(pe, Math.min((te - v.width) / 2, te - v.width - pe)),
      top: Math.max(de.top + pe, Math.min(de.top + (de.height - v.height) / 2, de.bottom - v.height - pe))
    });
  }, [n, se]), rt(() => {
    if (!n || !se || !a || Gt() || !w.current) return;
    const v = w.current, G = xr(v), te = G[G.length - 1];
    gt(), te ? gi(Dt, v, te.getBoundingClientRect(), ke) : Rl(Dt, v, ke);
  }, [n, se]);
  const j = oe(() => {
    if (!u || Ze.current) return;
    const v = w.current, G = !!v && xr(v).length > 0;
    if (!v || !a || Gt() || G) {
      e();
      return;
    }
    Ze.current = !0, bt(!0), mt.current = !0, gt(), yi(Dt, v, () => {
      Ze.current = !1, bt(!1), ke(), e();
    });
  }, [a, e, u]), Z = oe(() => {
    const v = w.current;
    if (!v || mt.current || !Yt.current || Gt() || xr(v).length > 0) return;
    const G = v.ownerDocument, te = v.cloneNode(!0);
    te.removeAttribute("data-modal-stack"), te.removeAttribute("data-state"), te.removeAttribute("role"), te.removeAttribute("data-aria-hidden"), te.removeAttribute("tabindex"), te.setAttribute("aria-hidden", "true"), te.style.pointerEvents = "none", G.body.appendChild(te), yi({ current: 0 }, te, () => {
      te.isConnected && te.remove();
    });
  }, []);
  rt(() => () => Z(), [Z]);
  const me = k(n);
  rt(() => {
    const v = me.current;
    me.current = n, v && !n && Z();
  }, [n, se, Z]), ie(() => {
    if (!n || !se || !a || !w.current) return;
    const v = w.current, G = v.parentNode;
    if (!G) return;
    let te = 0, de = null, fe = !1;
    const ge = () => {
      te = 0;
      const Te = On(v);
      if (Te.length > 0)
        v.style.opacity = "", v.style.pointerEvents = "", de = Te[Te.length - 1].getBoundingClientRect(), fe = !0, te = requestAnimationFrame(ge);
      else if (fe) {
        fe = !1, de && !Gt() && (gt(), gi(Dt, v, de, ke)), de = null;
        const je = ue.current ?? null;
        je == null || je.setTimeout(() => {
          !v || !v.isConnected || getComputedStyle(v).opacity !== "1" && (v.style.opacity = "1", v.style.pointerEvents = "");
        }, 240);
      }
    }, Re = new MutationObserver(() => {
      !te && On(v).length > 0 && (te = requestAnimationFrame(ge));
    });
    return Re.observe(G, { childList: !0 }), () => {
      Re.disconnect(), te && cancelAnimationFrame(te);
    };
  }, [n, se]), ie(() => {
    if (!se || !a || Gt() || !w.current) return;
    const v = w.current;
    let G = Math.round(v.getBoundingClientRect().height), te = !1;
    const de = new ResizeObserver(() => {
      if (!v.isConnected) return;
      const fe = Math.round(v.getBoundingClientRect().height);
      if (!te) {
        te = !0, G = fe;
        return;
      }
      if (Math.abs(fe - G) < 1) return;
      if (xe.current || Ze.current || On(v).length > 0) {
        G = fe;
        return;
      }
      if (Ot.current) return;
      const ge = G;
      G = fe, gt();
      const Re = v.getBoundingClientRect(), Te = Rt(ue.current ?? null), je = !be.current && !ve.current, ct = je ? Te.top + (Te.height - ge) / 2 : Re.top, Xe = je ? Te.top + (Te.height - fe) / 2 : Re.top;
      v.style.transition = "none", v.style.height = `${ge}px`, je && (v.style.top = `${ct}px`), N.current && (N.current.style.overflow = "hidden"), v.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          v.style.height === `${ge}px` && (v.style.transition = `height ${vt}ms ${wn}${je ? `, top ${vt}ms ${wn}` : ""}`, v.style.height = `${fe}px`, je && (v.style.top = `${Xe}px`), window.setTimeout(() => {
            v.style.height === `${fe}px` && (v.style.transition = "", v.style.height = "", N.current && (N.current.style.overflow = ""), je && Ne({ left: Re.left, top: Xe }), ke());
          }, vt + 60));
        });
      });
    });
    return de.observe(v), () => de.disconnect();
  }, [se]), ie(() => {
    if (!se || !w.current || a && !Gt()) return;
    const v = w.current, G = new ResizeObserver(() => {
      if (!v.isConnected || xe.current || Ze.current || ve.current || On(v).length > 0) return;
      const te = ue.current ?? null, de = Rt(te), fe = (te == null ? void 0 : te.innerWidth) ?? 0, ge = v.getBoundingClientRect(), Re = Math.max(de.top + pe, Math.min(ge.top, de.bottom - ge.height - pe)), Te = Math.max(pe, Math.min(ge.left, fe - ge.width - pe));
      (Math.abs(Re - ge.top) > 0.5 || Math.abs(Te - ge.left) > 0.5) && Ne({ left: Te, top: Re });
    });
    return G.observe(v), () => G.disconnect();
  }, [se, a]);
  const He = oe(() => {
    const v = w.current;
    if (!v) return null;
    const G = v.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), Se = oe((v, G) => {
    const te = ue.current ?? null, de = (te == null ? void 0 : te.innerWidth) ?? 0, fe = Rt(te), ge = He(), Re = ge ? ge.width : Math.min(de - pe * 2, 576), Te = ge ? ge.height : Math.min(fe.height - pe * 2, 400);
    return {
      left: Math.max(pe, Math.min(v, de - Re - pe)),
      top: Math.max(fe.top + pe, Math.min(G, fe.bottom - Te - pe))
    };
  }, [He]);
  ie(() => {
    if (!n) return;
    const v = ue.current ?? null, G = (v == null ? void 0 : v.visualViewport) ?? null;
    if (!v || !G) return;
    const te = 120;
    ve.current = !1, we.current = { w: v.innerWidth, h: v.innerHeight };
    let de = 0;
    const fe = () => {
      if (Ze.current || xe.current) return;
      const Re = (v == null ? void 0 : v.innerHeight) ?? 0, Te = (v == null ? void 0 : v.innerWidth) ?? 0, ct = Rt(v).height < Re - te, Xe = Re < we.current.h - te && Te === we.current.w;
      ct || Xe ? (ve.current = !0, Fe.current && (clearTimeout(Fe.current), Fe.current = 0)) : Fe.current || (Fe.current = (v == null ? void 0 : v.setTimeout(() => {
        ve.current = !1, Fe.current = 0, Oe(!1);
      }, 600)) ?? 0), Oe(ve.current), !de && (de = requestAnimationFrame(() => {
        var hi;
        de = 0;
        const x = w.current;
        if (!x) return;
        const A = Rt(ue.current ?? null), Y = x.getBoundingClientRect(), ce = ((hi = ue.current) == null ? void 0 : hi.innerWidth) ?? 0, Ee = (v == null ? void 0 : v.innerHeight) ?? 0, qe = A.height < Ee - te || Ee < we.current.h - te && (v == null ? void 0 : v.innerWidth) === we.current.w;
        we.current = { w: (v == null ? void 0 : v.innerWidth) ?? 0, h: Ee };
        const xt = Y.top >= A.top + pe && Y.bottom <= A.bottom - pe, Ct = () => {
          Ne({
            left: Math.max(pe, Math.min((ce - Y.width) / 2, ce - Y.width - pe)),
            top: Math.max(A.top + pe, Math.min(A.top + (A.height - Y.height) / 2, A.bottom - Y.height - pe))
          });
        };
        if (qe && !ze) {
          if (be.current) {
            xt || Ne(Se(Y.left, Y.top));
            return;
          }
          if (xt) return;
          Ct();
          return;
        }
        if (!ve.current) {
          if (be.current) {
            xt || Ne(Se(Y.left, Y.top));
            return;
          }
          xt || Ct();
        }
      }));
    };
    G.addEventListener("resize", fe), G.addEventListener("scroll", fe);
    const ge = () => {
      Ze.current || xe.current || de || (de = requestAnimationFrame(() => {
        de = 0;
        const Re = w.current;
        if (!Re) return;
        const Te = ue.current ?? null, je = Rt(Te), ct = (Te == null ? void 0 : Te.innerWidth) ?? 0, Xe = Re.getBoundingClientRect();
        if (be.current) {
          Ne(Se(Xe.left, Xe.top));
          return;
        }
        Ne({
          left: Math.max(pe, Math.min((ct - Xe.width) / 2, ct - Xe.width - pe)),
          top: Math.max(je.top + pe, Math.min(je.top + (je.height - Xe.height) / 2, je.bottom - Xe.height - pe))
        });
      }));
    };
    return v.addEventListener("orientationchange", ge), () => {
      G.removeEventListener("resize", fe), G.removeEventListener("scroll", fe), v.removeEventListener("orientationchange", ge), de && cancelAnimationFrame(de), Fe.current && clearTimeout(Fe.current);
    };
  }, [n, Se]);
  const lt = oe((v) => {
    if (v.target.closest("button")) return;
    be.current = !0;
    const G = He();
    G && (Ne(Se(G.left, G.top)), xe.current = { startX: v.clientX, startY: v.clientY, posX: G.left, posY: G.top }, v.target.setPointerCapture(v.pointerId));
  }, [He, Se]), Tt = oe((v) => {
    const G = xe.current;
    G && (v.preventDefault(), Ne(Se(G.posX + v.clientX - G.startX, G.posY + v.clientY - G.startY)));
  }, [Se]), Et = oe(() => {
    xe.current = null;
  }, []), hn = xe.current !== null, Ge = oe(() => {
    be.current = !1;
    const v = ue.current ?? null, G = Rt(v), te = (v == null ? void 0 : v.innerWidth) ?? 0, de = w.current, fe = de ? de.getBoundingClientRect() : { width: 0, height: 0 };
    Ne({
      left: Math.max(pe, Math.min((te - fe.width) / 2, te - fe.width - pe)),
      top: Math.max(G.top + pe, Math.min(G.top + (G.height - fe.height) / 2, G.bottom - fe.height - pe))
    });
  }, []), yt = k(0), at = oe(() => {
    const v = Date.now();
    v - yt.current < 300 ? (yt.current = 0, Ge()) : yt.current = v;
  }, [Ge]), Pt = De !== null, In = Pt ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", zn = `${i ? `${i} w-full` : "max-w-xl w-full"}`, pn = {
    ...Pt ? { left: De.left, top: De.top } : {},
    width: `min(100%, calc(100dvw - ${pe * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...fn ? {} : { maxHeight: `calc(100dvh - ${pe * 2}px)` }
  }, $n = oe((v) => {
    if (v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey) return;
    const G = v.target, te = M.current;
    if (!(!!G.closest("[data-modal-close]") || !!te && te.contains(G) && !!G.closest('button, a, [role="button"]')) && G.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !te) return;
    const fe = Array.from(te.querySelectorAll("button[data-modal-confirm]")), ge = fe.length > 0 ? fe : Array.from(te.querySelectorAll("button")), Re = ge[ge.length - 1];
    !Re || Re.disabled || (v.preventDefault(), Re.click());
  }, []);
  return /* @__PURE__ */ p(Ur, { theme: y, children: /* @__PURE__ */ p(Mt.Root, { open: n, onOpenChange: (v) => {
    v || j();
  }, children: /* @__PURE__ */ C(Mt.Portal, { container: he ?? void 0, children: [
    /* @__PURE__ */ p(
      Mt.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${st ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (v) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (v.preventDefault(), f && j());
        }
      }
    ),
    /* @__PURE__ */ C(
      Mt.Content,
      {
        ref: D,
        onKeyDown: $n,
        onInteractOutside: (v) => {
          f || v.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": b,
        "data-accent": E,
        "data-surface": z,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${In} ${zn}`,
        style: { touchAction: "manipulation", colorScheme: b, ...Object.keys(pn).length > 0 ? pn : {} },
        children: [
          c ? /* @__PURE__ */ C(
            "div",
            {
              style: P,
              className: `flex items-center justify-between ${hn ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                Ue || lt(v);
              },
              onPointerMove: Tt,
              onPointerUp: Et,
              onClick: at,
              children: [
                /* @__PURE__ */ p(Mt.Title, { style: $, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ p(Mt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(_t, { style: { width: S, height: S } }) })
              ]
            }
          ) : /* @__PURE__ */ C(
            "div",
            {
              style: re,
              className: `flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${hn ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (v) => {
                Ue || lt(v);
              },
              onPointerMove: Tt,
              onPointerUp: Et,
              onClick: at,
              children: [
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ p("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ p(Mt.Title, { style: I, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ C("button", { onClick: l, style: le, className: "flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ p(Yi, { style: { width: ee, height: ee } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ p(Mt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ p(_t, { style: { width: K, height: K } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ p("div", { ref: N, "data-testid": "modal-body", style: c ? Q : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ p("div", { ref: M, style: c ? q : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function lf({ children: n }) {
  const e = Ie(), t = L(20, 24, e), r = L(8, 12, e);
  return /* @__PURE__ */ p("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Il = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", zl = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, $l = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function Pn({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = zt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ p(
    "button",
    {
      type: r,
      style: o,
      className: `${Il} ${n === "hero" ? zl[e] : $l[n]} ${t}`,
      ...i
    }
  );
}
function xo({ checked: n, size: e, tone: t = "accent" }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: `ui-check-indicator ${n ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: n ? /* @__PURE__ */ C("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor", stroke: "var(--ui-check-ring)", strokeWidth: 1 }),
        /* @__PURE__ */ p("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "var(--ui-check-check)", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ p("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ p("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Dl({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: c = "accent", block: u = !1 }) {
  const f = a !== "plain", d = Ie(), h = L(16, 20, d), m = L(12, 14, d), g = L(12, 14, d), y = L(12, 16, d), b = L(10, 12, d), z = L(8, 10, d);
  return /* @__PURE__ */ C(
    "label",
    {
      className: `ui-checkbox ${f ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: z, padding: f ? `${b}px ${y}px` : void 0 },
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
        f ? /* @__PURE__ */ p(xo, { checked: n, size: h, tone: c }) : /* @__PURE__ */ p("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ p("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: m, height: m }, "aria-hidden": !0, children: /* @__PURE__ */ p("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ p("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function $r(n = "md") {
  const e = ze && Qi() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function bo(n = "md") {
  return n === "sm" ? zt({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : zt({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const vo = Jt(null);
function af() {
  const n = Kt(vo);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function cf({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = ne(null), [s, l] = ne(!1), a = k(null), c = Ie(), u = L(16, 20, c), f = L(12, 14, c), d = bo(), h = k(i);
  h.current = i;
  const m = oe(() => {
    const N = h.current;
    N && (N.kind === "confirm" ? N.resolve(!1) : N.kind === "prompt" ? N.resolve(null) : N.resolve());
  }, []), g = oe((N) => {
    if (N.suppressKey) {
      const M = localStorage.getItem(N.suppressKey);
      if (M && Date.now() < parseInt(M, 10))
        return Promise.resolve(!0);
    }
    return new Promise((M) => {
      m(), l(!1), o({ kind: "confirm", options: N, resolve: M });
    });
  }, [m]), y = oe((N) => new Promise((M) => {
    m(), o({ kind: "prompt", options: N, resolve: M });
  }), [m]), b = oe((N) => new Promise((M) => {
    m(), o({ kind: "alert", options: N, resolve: M });
  }), [m]);
  ie(() => {
    if (i) {
      const N = setTimeout(() => {
        var M;
        return (M = a.current) == null ? void 0 : M.focus();
      }, 50);
      return () => clearTimeout(N);
    }
  }, [i]);
  const z = oe(() => {
    var N, M;
    if (i) {
      if (i.kind === "confirm") {
        const F = i.options;
        F.suppressKey && s && localStorage.setItem(F.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((M = (N = a.current) == null ? void 0 : N.value) == null ? void 0 : M.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), E = i !== null;
  ie(() => {
    if (!E) return;
    const N = (M) => {
      M.key !== "Enter" || M.shiftKey || M.metaKey || M.ctrlKey || M.altKey || M.isComposing || (M.preventDefault(), M.stopImmediatePropagation(), z());
    };
    return document.addEventListener("keydown", N, !0), () => document.removeEventListener("keydown", N, !0);
  }, [E, z]);
  const w = oe(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ C(vo.Provider, { value: { confirm: g, prompt: y, alert: b }, children: [
    n,
    E && /* @__PURE__ */ p(
      Al,
      {
        open: !0,
        onClose: w,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ C(Ke, { children: [
          i.kind !== "alert" && /* @__PURE__ */ p(Pn, { variant: "ghost", onClick: w, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ p(Pn, { onClick: z, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ p(
            Pn,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: z,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ p(Pn, { "data-modal-confirm": !0, onClick: z, children: "Save" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ p("p", { style: { fontSize: f }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ p(
            Dl,
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
              style: d,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const Ol = 500, Pl = 250, Ll = 5, nt = 88, xi = 4;
function Bl(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Fl({ x: n, y: e, ms: t }) {
  const r = k(null), i = un();
  return ie(() => {
    r.current && Bl(r.current, t);
  }, [t]), sr(
    /* @__PURE__ */ p(
      "div",
      {
        style: {
          position: "fixed",
          left: n - nt / 2,
          top: e - nt / 2,
          width: nt,
          height: nt,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ C("svg", { ref: r, width: nt, height: nt, viewBox: `0 0 ${nt} ${nt}`, children: [
          /* @__PURE__ */ p(
            "circle",
            {
              cx: nt / 2,
              cy: nt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: xi + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ p(
            "circle",
            {
              cx: nt / 2,
              cy: nt / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: xi,
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
function uf() {
  return { "data-no-longpress": "true" };
}
function Hl(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function df({
  children: n,
  showRing: e = !0,
  longPressMs: t = Ol,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = ne(null), a = qr(), c = k(null), u = k(null), f = k({ x: 0, y: 0, target: null }), d = k(!1), h = Math.min(Pl, t * 0.5), m = k(i);
  m.current = i;
  const g = k(o);
  return g.current = o, ie(() => {
    if (!ze || !a) return;
    const y = (w) => {
      if (!Ar(w.pointerType) || w.button !== 0) return;
      const N = w.target;
      if (!N.closest(r) || (m.current ? !m.current(N) : Hl(N))) return;
      const M = w.clientX, F = w.clientY;
      f.current = { x: M, y: F, target: w.target }, d.current = !0, e && (u.current = setTimeout(() => l({ x: M, y: F }), h)), c.current = setTimeout(() => {
        if (!d.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const _ = f.current.target;
        if (!_) return;
        const T = g.current;
        if (T) {
          T(_, M, F);
          return;
        }
        const J = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: M,
          clientY: F,
          button: 2,
          view: window
        });
        _.dispatchEvent(J);
      }, t);
    }, b = (w) => {
      if (!d.current || c.current === null) return;
      const N = w.clientX - f.current.x, M = w.clientY - f.current.y;
      Math.sqrt(N * N + M * M) > Ll && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    }, z = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null);
    }, E = (w) => {
      Ar(w.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", y), a.addEventListener("pointermove", b), a.addEventListener("pointerup", z), a.addEventListener("pointercancel", z), a.addEventListener("pointerleave", E), () => {
      a.removeEventListener("pointerdown", y), a.removeEventListener("pointermove", b), a.removeEventListener("pointerup", z), a == null || a.removeEventListener("pointercancel", z), a == null || a.removeEventListener("pointerleave", E), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ C(Ke, { children: [
    n,
    e && s && /* @__PURE__ */ p(Fl, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function ff() {
  const n = pl();
  return hl ? n === null || Ar(n) : !1;
}
const bi = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", _l = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", jl = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Wl = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function ql({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, a = !!n && (t || s);
  return s ? /* @__PURE__ */ C(Ke, { children: [
    a && (l ? /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: `grid min-w-0 ${bi} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${jl}`}`, children: /* @__PURE__ */ p("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ p("span", { "data-kit-label": !0, className: `grid min-w-0 ${bi} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${_l}`}`, children: /* @__PURE__ */ p("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ p(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Wl}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ C(Ke, { children: [
    a && /* @__PURE__ */ p("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const hf = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function dt({
  variant: n = "subtle",
  theme: e,
  cloud: t,
  active: r = !1,
  iconOnly: i = !1,
  size: o = "default",
  icon: s,
  collapse: l = !1,
  iconWithLabel: a = !0,
  className: c = "",
  type: u = "button",
  children: f,
  ...d
}) {
  const h = St(), m = e ?? (h == null ? void 0 : h.mode) ?? "light", g = t ?? wl(h), y = zt({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), b = zt({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), z = zt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), E = "", w = "", N = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", M = {
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
  }, _ = {
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
  }, J = {
    light: {
      subtle: { base: `${E} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${w} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${E} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${E} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${w} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${E} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, R = {
    blue: { base: `${w} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${w} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, W = d["data-state"] === "open", H = J[m][n], V = n === "primary" ? b : n.startsWith("tab") ? z : y, K = ze ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, S = L(6, 8, Ie()), O = L(28, 40, Ie()), ee = g === "emerald" ? "emerald" : g ? "blue" : null, ae = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let X;
  if (n === "tab") {
    const P = M[m];
    X = r ? ee ? F[ee].active : P.active : ee ? F[ee][m === "light" ? "inactiveLight" : "inactiveDark"] : P.inactive;
  } else if (n === "tab-header")
    X = `${ee ? r ? T[ee].active : T[ee].inactive : r ? _.active : _.inactive} ${W ? ee ? T[ee].open : _.open : ""}`;
  else if (X = `${H.base} ${W ? H.open : ""}`, r && (X = `${X} ${ae}`), n === "primary" && ee) {
    const P = R[ee];
    X = W ? `${P.base} ${P.open}` : P.base;
  }
  const re = !!l && !!s && !i, I = i ? { width: O, height: O, padding: 0, gap: 0 } : o === "minimal" ? { ...K, gap: re ? 0 : S } : { ...V, gap: re ? 0 : S };
  return /* @__PURE__ */ p(
    "button",
    {
      type: u,
      "data-mode": m,
      "data-accent": h == null ? void 0 : h.accent,
      className: `${N} ${i ? "justify-center" : ""} ${re ? "group" : ""} ${X} ${c}`,
      style: I,
      ...d,
      children: i ? f : /* @__PURE__ */ p(ql, { icon: s, collapse: l, iconWithLabel: a, active: r, gap: S, children: f })
    }
  );
}
const Jl = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, Kl = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, Vl = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function pf({
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
        ...e ? Vl : n ? Kl : Jl,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const Yl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Ul = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], br = 1900, vr = 2100;
function Gl(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Xl(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function mf({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = St(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return a;
    const D = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(D.getTime()) ? a : D;
  })(), [u, f] = ne(c.getFullYear()), [d, h] = ne(c.getMonth()), [m, g] = ne("days"), [y, b] = ne(null), z = ut(() => new Set(n), [n]), E = (D) => {
    z.has(D) ? e(n.filter((he) => he !== D)) : e([...n, D]);
  }, w = ut(() => {
    const D = Gl(u, d), he = new Date(u, d, 1).getDay(), $e = [];
    for (let ue = 0; ue < he; ue++) $e.push({ key: `pad-${ue}`, day: 0, empty: !0 });
    for (let ue = 1; ue <= D; ue++) $e.push({ key: Xl(u, d, ue), day: ue, empty: !1 });
    return $e;
  }, [u, d]), N = (D) => f((he) => Math.max(br, Math.min(vr, he + D))), M = (D) => {
    d + D < 0 ? (f((he) => Math.max(br, he - 1)), h(11)) : d + D > 11 ? (f((he) => Math.min(vr, he + 1)), h(0)) : h((he) => he + D);
  }, F = () => {
    if (y === null) return;
    const D = parseInt(y, 10);
    !isNaN(D) && D >= br && D <= vr && f(D), b(null);
  }, _ = (D) => n.some((he) => he.startsWith(`${u}-${String(D + 1).padStart(2, "0")}`)), T = Ie(), J = L(4, 8, T), R = L(16, 20, T), W = L(10, 11, T), H = L(6, 8, T), V = L(12, 14, T), K = L(6, 10, T), S = L(12, 14, T), O = L(8, 12, T), ee = L(10, 12, T), ae = L(6, 10, T), X = L(2, 6, T), re = L(64, 80, T), I = { padding: J }, P = { width: R, height: R }, $ = { fontSize: W, paddingTop: H, paddingBottom: H }, Q = { fontSize: V, paddingTop: K, paddingBottom: K }, q = { fontSize: S, paddingTop: O, paddingBottom: O }, le = { fontSize: ee, padding: `${X}px ${ae}px` }, se = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", _e = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ C("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ C("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(-1) : M(-1),
          style: I,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ p(Ps, { style: P })
        }
      ),
      m === "days" ? /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, d).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ p(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: y ?? String(u),
          onChange: (D) => b(D.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (D) => D.target.select(),
          onBlur: F,
          onKeyDown: (D) => {
            D.key === "Enter" && (D.preventDefault(), F()), D.key === "Escape" && b(null);
          },
          style: { width: re },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => m === "months" ? N(1) : M(1),
          style: I,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": m === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ p(Un, { style: P })
        }
      )
    ] }),
    m === "months" ? /* @__PURE__ */ C("div", { children: [
      /* @__PURE__ */ p("div", { className: "grid grid-cols-3 text-center", children: Ul.map((D, he) => /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: () => {
            h(he), g("days");
          },
          style: q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${he === d ? se : _e}`,
          children: [
            D,
            _(he) && /* @__PURE__ */ p("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${he === d ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        D
      )) }),
      /* @__PURE__ */ p("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => {
            f(a.getFullYear()), h(a.getMonth()), g("days");
          },
          style: { paddingTop: K, paddingBottom: K, fontSize: V },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ C("div", { className: "grid grid-cols-7 text-center", children: [
      Yl.map((D) => /* @__PURE__ */ p("div", { style: $, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: D }, D)),
      w.map((D) => D.empty ? /* @__PURE__ */ p("div", {}, D.key) : /* @__PURE__ */ p(
        "button",
        {
          type: "button",
          onClick: () => E(D.key),
          style: Q,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${z.has(D.key) ? se : _e}`,
          children: D.day
        },
        D.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ C("div", { className: "px-3 py-2 border-t border-[color:var(--ui-border)] bg-[var(--ui-date-footer-bg)]", children: [
      /* @__PURE__ */ C("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-[color:var(--ui-text-muted)]", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ p("div", { className: "flex flex-wrap gap-1", children: n.map((D) => {
        const he = /* @__PURE__ */ new Date(D + "T00:00:00"), $e = he.getFullYear() === a.getFullYear() ? he.toLocaleString("default", { month: "short", day: "numeric" }) : he.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            onClick: () => E(D),
            "aria-label": `Remove ${$e}`,
            style: le,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              $e,
              /* @__PURE__ */ p("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          D
        );
      }) })
    ] })
  ] });
}
function gf({
  items: n,
  selected: e,
  onToggle: t,
  title: r,
  onToggleAll: i,
  allSelected: o = !1,
  toggleAllLabel: s,
  emptyHint: l = "Nothing here",
  maxHeight: a,
  disabled: c = !1,
  checkPosition: u = "leading",
  theme: f,
  className: d = ""
}) {
  const h = (w) => e instanceof Set ? e.has(w) : e.includes(w), m = Ie(), g = L(12, 16, m), y = L(8, 12, m), b = L(12, 14, m), z = L(16, 20, m), E = r != null || i != null;
  return /* @__PURE__ */ C("div", { className: d, ...f ? { "data-theme": f } : {}, children: [
    E && /* @__PURE__ */ C("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ p("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((w) => {
            const N = h(w.id), M = /* @__PURE__ */ p(xo, { checked: N, size: z });
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => t(w.id),
                "aria-pressed": N,
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${g}px`, fontSize: b },
                ...w.dataProps,
                children: [
                  u === "leading" && M,
                  w.leading != null && /* @__PURE__ */ p("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ p("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ p("span", { className: "ui-checklist-secondary", children: w.secondary }),
                  u === "trailing" && /* @__PURE__ */ p("span", { className: "ml-auto flex shrink-0", children: M })
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
function yf({
  items: n,
  value: e,
  onChange: t,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: o,
  compact: s = !1,
  disabled: l = !1,
  theme: a,
  className: c = ""
}) {
  const u = Ie(), f = s ? 10 : L(12, 16, u), d = s ? 6 : L(8, 12, u), h = s ? 12 : L(12, 14, u), m = s ? 14 : L(16, 20, u);
  return /* @__PURE__ */ C("div", { className: c, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ p("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ p("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const y = e === g.id;
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${y ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${d}px ${f}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ p("span", { className: "ui-radio-circle", style: { width: m, height: m }, "aria-hidden": !0, children: y && /* @__PURE__ */ p("span", { className: "ui-radio-dot" }) }),
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
const xf = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = Mn(), { refs: l, floatingStyles: a } = Ks({
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
          var z;
          if (i !== "visible") return {};
          const u = (z = c.elements.floating.ownerDocument) == null ? void 0 : z.defaultView;
          if (!u) return {};
          const f = c.rects.reference, d = Math.max(f.x, 0), h = Math.max(f.y, 0), m = Math.min(f.x + f.width, u.innerWidth), g = Math.min(f.y + f.height, u.innerHeight);
          if (m <= d || g <= h) return {};
          const y = r === "left" ? m - (f.x + f.width) : r === "right" ? d - f.x : 0, b = r === "top" ? h - f.y : r === "bottom" ? g - (f.y + f.height) : 0;
          return { x: c.x + y, y: c.y + b };
        }
      },
      Ui(o),
      Gi({ padding: 8 }),
      Xi({ padding: 8 }),
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
          const f = c.rects.floating.width, d = c.rects.floating.height, h = Math.max(8, Math.min(c.x, u.innerWidth - f - 8)), m = Math.max(8, Math.min(c.y, u.innerHeight - d - 8));
          return { x: h, y: m };
        }
      }
    ],
    whileElementsMounted: Vs
  });
  return rt(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ C(Ke, { children: [
    !t && /* @__PURE__ */ p("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && sr(
      /* @__PURE__ */ p(
        "div",
        {
          ref: l.setFloating,
          className: `ui-chrome ${n}`,
          style: a,
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
function Ql(n, e) {
  if (!e || !Pe.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const Xt = ({ content: n, children: e }) => {
  const t = St(), r = Ie(), i = L(10, 12, r), o = L(6, 6, r), s = L(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = un(), c = Mn(), [u, f] = ne(!1), [d, h] = ne({ x: 0, y: 0 }), m = k(null), g = k(null), y = () => {
    if (!m.current) return;
    const E = m.current.getBoundingClientRect();
    h({ x: E.left + E.width / 2, y: E.top });
  };
  ie(() => () => {
    g.current && clearTimeout(g.current);
  }, []), ie(() => (u && c && (y(), c.addEventListener("scroll", y, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", y, !0)), [u]);
  const b = Ql(e, n), z = Object.keys(b).length > 0 ? Pe.cloneElement(e, b) : e;
  return /* @__PURE__ */ C(
    "div",
    {
      ref: m,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), y(), f(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => f(!1), 60);
      },
      children: [
        z,
        u && sr(
          /* @__PURE__ */ C(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: d.x, top: d.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((E, w) => /* @__PURE__ */ p("div", { className: w > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: E }, w)),
                /* @__PURE__ */ p("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          a ?? document.body
        )
      ]
    }
  );
}, Zl = 250;
function ea(n, e, t) {
  const [r, i] = Pe.useState(null), [o, s] = Pe.useState(!1), l = Pe.useRef(null), a = Pe.useRef(t);
  a.current = t;
  const c = Pe.useCallback(() => {
    var d;
    const f = (d = e.current) == null ? void 0 : d[a.current];
    f && i({ left: f.offsetLeft, width: f.offsetWidth });
  }, [e]);
  Pe.useLayoutEffect(() => {
    c();
  }, [t, c]), Pe.useLayoutEffect(() => {
    const f = n.current;
    if (!f) return;
    const d = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Zl), c();
    }, h = new ResizeObserver(d);
    h.observe(f);
    for (const m of e.current ?? []) m && h.observe(m);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, c]);
  const u = Pe.useMemo(
    () => {
      var f;
      return typeof window < "u" && !!((f = window.matchMedia) != null && f.call(window, "(prefers-reduced-motion: reduce)").matches);
    },
    []
  );
  return {
    style: r ? { left: 0, width: r.width, transform: `translateX(${r.left}px)` } : null,
    motionClass: u || o ? "" : "transition-[transform,width] duration-200 ease-out"
  };
}
function fr() {
  const n = Ie(), e = ze, t = e ? L(28, 40, n) : 28, r = e ? L(28, 40, n) : 28, i = e ? L(10, 14, n) : 10, o = e ? L(10, 14, n) : 10, s = e ? L(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const bf = ze ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", ta = ze ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Ln = ze ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", na = "hover:bg-red-950/50", vf = ze ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", wf = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", kf = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ra = ze ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Sf = ze ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", wo = ze ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", ia = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", oa = ze ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Bn = ({ onClick: n, disabled: e, title: t, className: r = ta, children: i }) => {
  const o = fr();
  return /* @__PURE__ */ p(Xt, { content: t, children: /* @__PURE__ */ p("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Fn = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, Nf = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: c, ariaLabel: u }) => {
  const f = St(), d = a ?? vl(f), h = a === "blue" || a === "emerald" ? a : (f == null ? void 0 : f.accent) ?? "zinc", m = { "data-mode": d === "dark" ? "dark" : "light", "data-accent": h }, g = fr(), y = s && !ze ? 24 : g.control.height, b = zt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), z = ze ? b : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, E = (_) => i ? i(_) : n === _, w = Pe.useRef(null), N = Pe.useRef([]), M = Math.max(0, e.findIndex((_) => E(_.v))), F = ea(w, N, M);
  return l === "track" ? /* @__PURE__ */ C(
    "div",
    {
      ref: w,
      role: c ? "tablist" : "group",
      "aria-label": u,
      ...m,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${Fn.wrap}`,
      children: [
        F.style && /* @__PURE__ */ p(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${Fn.pill} ${F.motionClass}`,
            style: { ...F.style, top: 2, bottom: 2 }
          }
        ),
        e.map((_, T) => {
          const J = E(_.v);
          return /* @__PURE__ */ C(
            "button",
            {
              ref: (R) => {
                N.current[T] = R;
              },
              ..._.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(_.v),
              title: _.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? J : void 0,
              "aria-pressed": c ? void 0 : J,
              "aria-label": _.ariaLabel ?? (_.l ? void 0 : _.title),
              style: z,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? Fn.active : Fn.idle}`,
              children: [
                _.icon,
                _.l
              ]
            },
            _.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ C("div", { ref: w, className: `relative ${ia} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    F.style && /* @__PURE__ */ p(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${F.motionClass}`,
        style: { ...F.style, top: 0, bottom: 0 }
      }
    ),
    e.map((_, T) => {
      const J = E(_.v);
      return /* @__PURE__ */ C(
        "button",
        {
          ref: (R) => {
            N.current[T] = R;
          },
          ..._.dataProps,
          disabled: r,
          onClick: () => t(_.v),
          title: _.title,
          style: { ...g.control, height: y },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${J ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${_.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            _.icon,
            _.l
          ]
        },
        _.v
      );
    })
  ] });
}, Tf = ({ children: n }) => /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ p("span", { className: ze ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ p("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), sa = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", la = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Ef = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ C("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ p("span", { className: t ? sa : la, children: n }),
  e
] }), Cf = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ p("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Mf = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ C("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ p(Bn, { onClick: () => r(-1), disabled: n, title: "Move up", className: Ln, children: /* @__PURE__ */ p(Ls, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(Bn, { onClick: () => r(1), disabled: n, title: "Move down", className: Ln, children: /* @__PURE__ */ p(Bs, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p(Bn, { onClick: e, disabled: n, title: "Duplicate", className: Ln, children: /* @__PURE__ */ p(Vi, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ p("div", { className: wo }),
    /* @__PURE__ */ p(Bn, { onClick: t, disabled: n, title: "Delete", className: `${Ln} ${na}`, children: /* @__PURE__ */ p(Rr, { className: "w-2.5 h-2.5" }) })
  ] })
);
var vi = Object.defineProperty, aa = (n, e) => {
  let t = {};
  for (var r in n) vi(t, r, {
    get: n[r],
    enumerable: !0
  });
  return vi(t, Symbol.toStringTag, { value: "Module" }), t;
};
function Je(n) {
  this.content = n;
}
Je.prototype = {
  constructor: Je,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Je(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Je(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Je([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Je(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Je(i);
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
    return n = Je.from(n), n.size ? new Je(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Je.from(n), n.size ? new Je(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Je.from(n);
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
Je.from = function(n) {
  if (n instanceof Je) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Je(e);
};
function ko(n, e, t) {
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
      return a && a < s.length && a < l.length && To(s.charCodeAt(a - 1)) && No(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = ko(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function So(n, e, t, r) {
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
      let c = s.text, u = l.text, f = c.length, d = u.length;
      for (; f > 0 && d > 0 && c[f - 1] == u[d - 1]; )
        f--, d--, t--, r--;
      return f && d && f < c.length && To(c.charCodeAt(f - 1)) && No(c.charCodeAt(f)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = So(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function No(n) {
  return n >= 56320 && n < 57344;
}
function To(n) {
  return n >= 55296 && n < 56320;
}
class B {
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
      let a = this.content[s], c = l + a.nodeSize;
      if (c > e && r(a, i + l, o || null, s) !== !1 && a.content.size) {
        let u = l + 1;
        a.nodesBetween(Math.max(0, e - u), Math.min(a.content.size, t - u), r, i + u);
      }
      l = c;
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
      let c = l.isText ? l.text.slice(Math.max(e, a) - a, t - a) : l.isLeaf ? i ? typeof i == "function" ? i(l) : i : l.type.spec.leafText ? l.type.spec.leafText(l) : "" : "";
      l.isBlock && (l.isLeaf && c || l.isTextblock) && r && (s ? s = !1 : o += r), o += c;
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
    return new B(i, this.size + e.size);
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
    return new B(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? B.empty : e == 0 && t == this.content.length ? this : new B(this.content.slice(e, t));
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
    return i[e] = t, new B(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new B([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new B(this.content.concat(e), this.size + e.nodeSize);
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
    return ko(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return So(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Hn(0, e);
    if (e == this.size)
      return Hn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Hn(t + 1, o) : Hn(t, r);
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
      return B.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return B.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return B.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new B(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return B.empty;
    if (e instanceof B)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new B([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
B.empty = new B([], 0);
const wr = { index: 0, offset: 0 };
function Hn(n, e) {
  return wr.index = n, wr.offset = e, wr;
}
function Xn(n, e) {
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
      if (!Xn(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Xn(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let Ce = class Dr {
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
    return this == e || this.type == e.type && Xn(this.attrs, e.attrs);
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
      return Dr.none;
    if (e instanceof Dr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
Ce.none = [];
class kn extends Error {
}
class U {
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
    let r = Co(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new U(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new U(Eo(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return U.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new U(B.fromJSON(e, t.content), r, i);
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
    return new U(e, r, i);
  }
}
U.empty = new U(B.empty, 0, 0);
function Eo(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Eo(o.content, e - i - 1, t - i - 1)));
}
function Co(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = Co(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(s, a.copy(c));
}
function ca(n, e, t) {
  if (t.openStart > n.depth)
    throw new kn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new kn("Inconsistent open depths");
  return Mo(n, e, t, 0);
}
function Mo(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Mo(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Ht(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = ua(t, n);
      return Ht(o, Ao(n, s, l, e, r));
    }
  else return Ht(o, Qn(n, e, r));
}
function Ro(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new kn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Or(n, e, t) {
  let r = n.node(t);
  return Ro(r, e.node(t)), r;
}
function Ft(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function xn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (Ft(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Ft(i.child(l), r);
  e && e.depth == t && e.textOffset && Ft(e.nodeBefore, r);
}
function Ht(n, e) {
  if (!n.type.validContent(e))
    throw new kn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Ao(n, e, t, r, i) {
  let o = n.depth > i && Or(n, e, i + 1), s = r.depth > i && Or(t, r, i + 1), l = [];
  return xn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Ro(o, s), Ft(Ht(o, Ao(n, e, t, r, i + 1)), l)) : (o && Ft(Ht(o, Qn(n, e, i + 1)), l), xn(e, t, i, l), s && Ft(Ht(s, Qn(t, r, i + 1)), l)), xn(r, null, i, l), new B(l);
}
function Qn(n, e, t) {
  let r = [];
  if (xn(null, n, t, r), n.depth > t) {
    let i = Or(n, e, t + 1);
    Ft(Ht(i, Qn(n, e, t + 1)), r);
  }
  return xn(e, null, t, r), new B(r);
}
function ua(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(B.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Sn {
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
      return Ce.none;
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
        return new Zn(this, e, r);
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
      let { index: l, offset: a } = s.content.findIndex(o), c = o - a;
      if (r.push(s, l, i + a), !c || (s = s.child(l), s.isText))
        break;
      o = c - 1, i += a + 1;
    }
    return new Sn(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = wi.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      wi.set(e, r = new da());
    let i = r.elts[r.i] = Sn.resolve(e, t);
    return r.i = (r.i + 1) % fa, i;
  }
}
class da {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const fa = 12, wi = /* @__PURE__ */ new WeakMap();
class Zn {
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
let tn = class Pr {
  /**
  @internal
  */
  constructor(e, t, r, i = Ce.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || B.empty;
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
    return this.type == e && Xn(this.attrs, t || e.defaultAttrs || ha) && Ce.sameSet(this.marks, r || Ce.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Pr(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Pr(this.type, this.attrs, this.content, e);
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
      return U.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new U(c, i.depth - s, o.depth - s);
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
    return ca(this.resolve(e), this.resolve(t), r);
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
    return Sn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Sn.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Io(this.marks, e);
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
  canReplace(e, t, r = B.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), ki(this.type.attrs, this.attrs, "node", this.type.name);
    let e = Ce.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      ki(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!Ce.sameSet(e, this.marks))
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
    let i = B.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
tn.prototype.text = void 0;
class er extends tn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Io(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new er(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new er(this.type, this.attrs, e, this.marks);
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
function Io(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function ki(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Wt {
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
      return Wt.empty;
    let i = zo(r);
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
      let a = s.matchFragment(e, r);
      if (a && (!t || a.validEnd))
        return B.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: f } = s.next[c];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(f) == -1) {
          i.push(f);
          let d = o(f, l.concat(u));
          if (d)
            return d;
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
Wt.empty = new Wt(!0);
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
function zo(n) {
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
function Si(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function ya(n, e) {
  let t = Si(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Si(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
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
    let e = zo(n);
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
  function r(s, l, a) {
    let c = { term: a, to: l };
    return e[s].push(c), c;
  }
  function i(s, l) {
    s.forEach((a) => a.to = l);
  }
  function o(s, l) {
    if (s.type == "choice")
      return s.exprs.reduce((a, c) => a.concat(o(c, l)), []);
    if (s.type == "seq")
      for (let a = 0; ; a++) {
        let c = o(s.exprs[a], l);
        if (a == s.exprs.length - 1)
          return c;
        i(c, l = t());
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
        for (let c = 0; c < s.min; c++) {
          let u = t();
          i(o(s.expr, a), u), a = u;
        }
        if (s.max == -1)
          i(o(s.expr, a), a);
        else
          for (let c = s.min; c < s.max; c++) {
            let u = t();
            r(a, u), i(o(s.expr, a), u), a = u;
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
function $o(n, e) {
  return e - n;
}
function Ni(n, e) {
  let t = [];
  return r(e), t.sort($o);
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
function wa(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Ni(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Ni(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Wt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort($o);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function ka(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Do(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Oo(n, e) {
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
function Po(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Na(n, r, e[r]);
  return t;
}
class tr {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Po(e, r.attrs), this.defaultAttrs = Do(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Wt.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Oo(this.attrs, e);
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
    return new tn(this, this.computeAttrs(e), B.from(t), Ce.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = B.from(t), this.checkContent(t), new tn(this, this.computeAttrs(e), t, Ce.setFrom(r));
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
    if (e = this.computeAttrs(e), t = B.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(B.empty, !0);
    return o ? new tn(this, e, t.append(o), Ce.setFrom(r)) : null;
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
    return t ? t.length ? t : Ce.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new tr(o, t, s));
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
class hr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Po(e, i.attrs), this.excluded = null;
    let o = Do(this.attrs);
    this.instance = o ? new Ce(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new Ce(this, Oo(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new hr(o, i++, t, s)), r;
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
    t.nodes = Je.from(e.nodes), t.marks = Je.from(e.marks || {}), this.nodes = tr.compile(this.spec.nodes, this), this.marks = hr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Wt.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? Ti(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : Ti(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => tn.fromJSON(this, i), this.markFromJSON = (i) => Ce.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof tr) {
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
    return new er(r, r.defaultAttrs, e, Ce.setFrom(t));
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
function Ti(n, e) {
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
function Ea(n) {
  return n.tag != null;
}
function Ca(n) {
  return n.style != null;
}
class nn {
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
      else if (Ca(i)) {
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
    let r = new Ci(this, t, !1);
    return r.addAll(e, Ce.none, t.from, t.to), r.finish();
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
    let r = new Ci(this, t, !0);
    return r.addAll(e, Ce.none, t.from, t.to), U.maxOpen(r.finish());
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
        r(s = Mi(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = Mi(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new nn(e, nn.schemaRules(e)));
  }
}
const Lo = {
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
}, Bo = { ol: !0, ul: !0 }, Nn = 1, Lr = 2, bn = 4;
function Ei(n, e, t) {
  return e != null ? (e ? Nn : 0) | (e === "full" ? Lr : 0) : n && n.whitespace == "pre" ? Nn | Lr : t & ~bn;
}
class _n {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = Ce.none, this.match = o || (s & bn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(B.from(e));
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
    if (!(this.options & Nn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = B.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(B.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Lo.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Ci {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = Ei(null, t.preserveWhitespace, 0) | (r ? bn : 0);
    i ? o = new _n(i.type, i.attrs, Ce.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new _n(null, null, Ce.none, !0, null, s) : o = new _n(e.schema.topNodeType, null, Ce.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Lr ? "full" : this.localPreserveWS || (i.options & Nn) > 0, { schema: s } = this.parser;
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
    Bo.hasOwnProperty(s) && this.parser.normalizeLists && Ra(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Ma.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Lo.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let f = a && a.skip ? t : this.readStyles(e, t);
      f && this.addAll(e, f), c && this.sync(o), this.needsBlock = u;
    } else {
      let c = this.readStyles(e, t);
      c && this.addElementByRule(e, a, c, a.consuming === !1 ? l : void 0);
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
            if (a.clearMark ? t = t.filter((c) => !a.clearMark(c)) : t = t.concat(this.parser.schema.marks[a.mark].create(a.attrs)), a.consuming === !1)
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
      let a = this.nodes[s], c = a.findWrapping(e);
      if (c && (!i || i.length > c.length + l) && (i = c, o = a, !c.length))
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
      let s = Ce.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : Ri(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = Ei(e, o, s.options);
    s.options & bn && s.content.length == 0 && (l |= bn);
    let a = Ce.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : Ri(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new _n(e, t, a, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= Nn);
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
        let c = t[l];
        if (c == "") {
          if (l == t.length - 1 || l == 0)
            continue;
          for (; a >= o; a--)
            if (s(l - 1, a))
              return !0;
          return !1;
        } else {
          let u = a > 0 || a == 0 && i ? this.nodes[a].type : r && a >= o ? r.node(a - o).type : null;
          if (!u || u.name != c && !u.isInGroup(c))
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
function Ra(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Bo.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Aa(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Mi(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Ri(n, e) {
  let t = e.schema.nodes;
  for (let r in t) {
    let i = t[r];
    if (!i.allowsMarkType(n))
      continue;
    let o = [], s = (l) => {
      o.push(l);
      for (let a = 0; a < l.edgeCount; a++) {
        let { type: c, next: u } = l.edge(a);
        if (c == e || o.indexOf(u) < 0 && s(u))
          return !0;
      }
    };
    if (s(i.contentMatch))
      return !0;
  }
}
const Fo = 65535, Ho = Math.pow(2, 16);
function Ia(n, e) {
  return n + e * Ho;
}
function Ai(n) {
  return n & Fo;
}
function za(n) {
  return (n - (n & Fo)) / Ho;
}
const _o = 1, jo = 2, Kn = 4, Wo = 8;
class Br {
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
    return (this.delInfo & Wo) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (_o | Kn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (jo | Kn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Kn) > 0;
  }
}
class et {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && et.empty)
      return et.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Ai(e);
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
      let a = this.ranges[l] - (this.inverted ? i : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = this.ranges[l + s], f = a + c;
      if (e <= f) {
        let d = c ? e == a ? -1 : e == f ? 1 : t : t, h = a + i + (d < 0 ? 0 : u);
        if (r)
          return h;
        let m = e == (t < 0 ? a : f) ? null : Ia(l / 3, e - a), g = e == a ? jo : e == f ? _o : Kn;
        return (t < 0 ? e != a : e != f) && (g |= Wo), new Br(h, g, m);
      }
      i += u - c;
    }
    return r ? e + i : new Br(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Ai(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
    for (let l = 0; l < this.ranges.length; l += 3) {
      let a = this.ranges[l] - (this.inverted ? r : 0);
      if (a > e)
        break;
      let c = this.ranges[l + o], u = a + c;
      if (e <= u && l == i * 3)
        return !0;
      r += this.ranges[l + s] - c;
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
      let s = this.ranges[i], l = s - (this.inverted ? o : 0), a = s + (this.inverted ? 0 : o), c = this.ranges[i + t], u = this.ranges[i + r];
      e(l, l + c, a, a + u), o += u - c;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new et(this.ranges, !this.inverted);
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
    return e == 0 ? et.empty : new et(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
et.empty = new et([]);
class nr {
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
    return new nr(this._maps, this.mirror, e, t);
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
    let e = new nr();
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
    return r ? e : new Br(e, i, null);
  }
}
const kr = /* @__PURE__ */ Object.create(null);
class Ye {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return et.empty;
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
    let r = kr[t.stepType];
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
    if (e in kr)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return kr[e] = t, t.prototype.jsonID = e, t;
  }
}
class Be {
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
    return new Be(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Be(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return Be.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof kn)
        return Be.fail(o.message);
      throw o;
    }
  }
}
function ri(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(ri(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return B.fromArray(r);
}
class At extends Ye {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new U(ri(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return Be.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new ft(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new At(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof At && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new At(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new At(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ye.jsonID("addMark", At);
class ft extends Ye {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new U(ri(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return Be.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new At(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ft(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ft && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ft(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new ft(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ye.jsonID("removeMark", ft);
class It extends Ye {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Be.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Be.fromReplace(e, this.pos, this.pos + 1, new U(B.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new It(this.pos, t.marks[i]);
        return new It(this.pos, this.mark);
      }
    }
    return new qt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new It(t.pos, this.mark);
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
    return new It(t.pos, e.markFromJSON(t.mark));
  }
}
Ye.jsonID("addNodeMark", It);
class qt extends Ye {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Be.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Be.fromReplace(e, this.pos, this.pos + 1, new U(B.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new It(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new qt(t.pos, this.mark);
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
    return new qt(t.pos, e.markFromJSON(t.mark));
  }
}
Ye.jsonID("removeNodeMark", qt);
class Le extends Ye {
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
    return this.structure && Fr(e, this.from, this.to) ? Be.fail("Structure replace would overwrite content") : Be.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new et([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Le(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && Le.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new Le(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof Le) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? U.empty : new U(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Le(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? U.empty : new U(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Le(e.from, this.to, t, this.structure);
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
    return new Le(t.from, t.to, U.fromJSON(e, t.slice), !!t.structure);
  }
}
Le.MAP_BIAS = 1;
Ye.jsonID("replace", Le);
class We extends Ye {
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
    if (this.structure && (Fr(e, this.from, this.gapFrom) || Fr(e, this.gapTo, this.to)))
      return Be.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return Be.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? Be.fromReplace(e, this.from, this.to, r) : Be.fail("Content does not fit in gap");
  }
  getMap() {
    return new et([
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
    return new We(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new We(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new We(t.from, t.to, t.gapFrom, t.gapTo, U.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ye.jsonID("replaceAround", We);
function Fr(n, e, t) {
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
function $a(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let f = a.marks;
    if (!r.isInSet(f) && u.type.allowsMarkType(r.type)) {
      let d = Math.max(c, e), h = Math.min(c + a.nodeSize, t), m = r.addToSet(f);
      for (let g = 0; g < f.length; g++)
        f[g].isInSet(m) || (s && s.to == d && s.mark.eq(f[g]) ? s.to = h : i.push(s = new ft(d, h, f[g])));
      l && l.to == d ? l.to = h : o.push(l = new At(d, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function Da(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof hr) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let f = a[u], d;
        for (let h = 0; h < i.length; h++) {
          let m = i[h];
          m.step == o - 1 && f.eq(i[h].style) && (d = m);
        }
        d ? (d.to = c, d.step = o) : i.push({ style: f, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new ft(s.from, s.to, s.style)));
}
function ii(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, f = r.matchType(c.type);
    if (!f)
      s.push(new Le(l, u, U.empty));
    else {
      r = f;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new ft(l, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d, h = /\r?\n|\r/g, m;
        for (; d = h.exec(c.text); )
          m || (m = new U(B.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new Le(l + d.index, l + d.index + d[0].length, m));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(B.empty, !0);
    n.replace(l, l, new U(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function Oa(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function dn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Oa(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function Pa(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = B.empty, f = 0;
  for (let m = o, g = !1; m > t; m--)
    g || r.index(m) > 0 ? (g = !0, u = B.from(r.node(m).copy(u)), f++) : a--;
  let d = B.empty, h = 0;
  for (let m = o, g = !1; m > t; m--)
    g || i.after(m + 1) < i.end(m) ? (g = !0, d = B.from(i.node(m).copy(d)), h++) : c++;
  n.step(new We(a, c, s, l, new U(u.append(d), f, h), u.size - f, !0));
}
function qo(n, e, t = null, r = n) {
  let i = La(n, e), o = i && Ba(r, e);
  return o ? i.map(Ii).concat({ type: e, attrs: t }).concat(o.map(Ii)) : null;
}
function Ii(n) {
  return { type: n, attrs: null };
}
function La(n, e) {
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
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Fa(n, e, t) {
  let r = B.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = B.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new We(i, o, i, o, new U(r, 0, 0), t.length, !0));
}
function Ha(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && _a(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", m = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !m ? c = !1 : !h && m && (c = !0);
      }
      c === !1 && Ko(n, s, l, o), ii(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(o), f = u.map(l, 1), d = u.map(l + s.nodeSize, 1);
      return n.step(new We(f, d, f + 1, d - 1, new U(B.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Jo(n, s, l, o), !1;
    }
  });
}
function Jo(n, e, t, r) {
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
function Ko(n, e, t, r) {
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
  n.step(new We(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new U(B.from(s), 0, 0), 1, !0));
}
function wt(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let f = i.node(c), d = i.index(c);
    if (f.type.spec.isolating)
      return !1;
    let h = f.content.cutByIndex(d, f.childCount), m = r && r[u + 1];
    m && (h = h.replaceChild(0, m.type.create(m.attrs)));
    let g = r && r[u] || f;
    if (!f.canReplace(d + 1, f.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function Wa(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = B.empty, s = B.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = B.from(i.node(l).copy(o));
    let u = r && r[c];
    s = B.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new Le(e, e, new U(o.append(s), t, t), !0));
}
function Vt(n, e) {
  let t = n.resolve(e), r = t.index();
  return Vo(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
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
function Vo(n, e) {
  return !!(n && e && !n.isLeaf && qa(n, e));
}
function pr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Vo(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Ja(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", f = !!s.contentMatch.matchType(i);
    u && !f ? r = !1 : !u && f && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Ko(n, u.node(), u.before(), l);
  }
  s.inlineContent && ii(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new Le(c, a.map(e + t, -1), U.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    Jo(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Ka(n, e, t) {
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
function mr(n, e, t = e, r = U.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Yo(i, o, r) ? new Le(e, t, r) : new Va(i, o, r).fit();
}
function Yo(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Va {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = B.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = B.from(e.node(i).copy(this.placed));
  }
  get depth() {
    return this.frontier.length - 1;
  }
  fit() {
    for (; this.unplaced.size; ) {
      let c = this.findFittable();
      c ? this.placeNodes(c) : this.openMore() || this.dropNode();
    }
    let e = this.mustMoveInline(), t = this.placed.size - this.depth - this.$from.depth, r = this.$from, i = this.close(e < 0 ? this.$to : r.doc.resolve(e));
    if (!i)
      return null;
    let o = this.placed, s = r.depth, l = i.depth;
    for (; s && l && o.childCount == 1; )
      o = o.firstChild.content, s--, l--;
    let a = new U(o, s, l);
    return e > -1 ? new We(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new Le(r.pos, i.pos, a) : null;
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
        r ? (o = Sr(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, f = null;
          if (t == 1 && (s ? c.matchType(s.type) || (f = c.fillBefore(B.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: f };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Sr(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new U(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Sr(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new U(gn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new U(gn(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, u = [], { match: f, type: d } = this.frontier[t];
    if (i) {
      for (let g = 0; g < i.childCount; g++)
        u.push(i.child(g));
      f = f.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let g = l.child(c), y = f.matchType(g.type);
      if (!y)
        break;
      c++, (c > 1 || a == 0 || g.content.size) && (f = y, u.push(Uo(g.mark(d.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let m = c == l.childCount;
    m || (h = -1), this.placed = yn(this.placed, t, B.from(u)), this.frontier[t].match = f, m && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = l; g < h; g++) {
      let b = y.lastChild;
      this.frontier.push({ type: b.type, match: b.contentMatchAt(b.childCount) }), y = b.content;
    }
    this.unplaced = m ? e == 0 ? U.empty : new U(gn(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new U(gn(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Nr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Nr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = Nr(e, l, c, a, !0);
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
    t.fit.childCount && (this.placed = yn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = yn(this.placed, this.depth, B.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(B.empty, !0);
    t.childCount && (this.placed = yn(this.placed, this.frontier.length, t));
  }
}
function gn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(gn(n.firstChild.content, e - 1, t)));
}
function yn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(yn(n.lastChild.content, e - 1, t)));
}
function Sr(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Uo(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Uo(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(B.empty, !0)))), n.copy(r);
}
function Nr(n, e, t, r, i) {
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
function Ga(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (Yo(i, o, r))
    return n.step(new Le(e, t, r));
  let s = Xo(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let d = i.depth, h = i.pos - 1; d > 0; d--, h--) {
    let m = i.node(d).type.spec;
    if (m.defining || m.definingAsContext || m.isolating)
      break;
    s.indexOf(d) > -1 ? l = d : i.before(d) == h && s.splice(1, 0, -d);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let d = r.content, h = 0; ; h++) {
    let m = d.firstChild;
    if (c.push(m), h == r.openStart)
      break;
    d = m.content;
  }
  for (let d = u - 1; d >= 0; d--) {
    let h = c[d], m = Ua(h.type);
    if (m && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = d;
    else if (m || !h.type.isTextblock)
      break;
  }
  for (let d = r.openStart; d >= 0; d--) {
    let h = (d + u + 1) % (r.openStart + 1), m = c[h];
    if (m)
      for (let g = 0; g < s.length; g++) {
        let y = s[(g + a) % s.length], b = !0;
        y < 0 && (b = !1, y = -y);
        let z = i.node(y - 1), E = i.index(y - 1);
        if (z.canReplaceWith(E, E, m.type, m.marks))
          return n.replace(i.before(y), b ? o.after(y) : t, new U(Go(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let f = n.steps.length;
  for (let d = s.length - 1; d >= 0 && (n.replace(e, t, r), !(n.steps.length > f)); d--) {
    let h = s[d];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Go(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Go(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(B.empty, !0));
  }
  return n;
}
function Xa(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Ka(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new U(B.from(r), 0, 0));
}
function Qa(n, e, t) {
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
  let o = Xo(r, i);
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
function Xo(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class rn extends Ye {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Be.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return Be.fromReplace(e, this.pos, this.pos + 1, new U(B.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return et.empty;
  }
  invert(e) {
    return new rn(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new rn(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new rn(t.pos, t.attr, t.value);
  }
}
Ye.jsonID("attr", rn);
class Tn extends Ye {
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
    return Be.ok(r);
  }
  getMap() {
    return et.empty;
  }
  invert(e) {
    return new Tn(this.attr, e.attrs[this.attr]);
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
    return new Tn(t.attr, t.value);
  }
}
Ye.jsonID("docAttr", Tn);
let ln = class extends Error {
};
ln = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
ln.prototype = Object.create(Error.prototype);
ln.prototype.constructor = ln;
ln.prototype.name = "TransformError";
class Za {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new nr();
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
      throw new ln(t.failed);
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
  replace(e, t = e, r = U.empty) {
    let i = mr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new U(B.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, U.empty);
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
    return Xa(this, e, t, r), this;
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
    return Pa(this, e, t), this;
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
    return this.step(new rn(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Tn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new It(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof Ce)
      t.isInSet(r.marks) && this.step(new qt(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new qt(e, o)), i = o.removeFromSet(i);
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
    return $a(this, e, t, r), this;
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
    return ii(this, e, t, r), this;
  }
}
const Tr = /* @__PURE__ */ Object.create(null);
class Ae {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new ec(e.min(t), e.max(t))];
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
  replace(e, t = U.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? U.empty : t), l == 0 && Di(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(e, t) {
    let r = e.steps.length, i = this.ranges;
    for (let o = 0; o < i.length; o++) {
      let { $from: s, $to: l } = i[o], a = e.mapping.slice(r), c = a.map(s.pos), u = a.map(l.pos);
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Di(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Qe(e) : Qt(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Qt(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Qt(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new ht(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Qt(e, e, 0, 0, 1) || new ht(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Qt(e, e, e.content.size, e.childCount, -1) || new ht(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Tr[t.type];
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
    if (e in Tr)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Tr[e] = t, t.prototype.jsonID = e, t;
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
    return Qe.between(this.$anchor, this.$head).getBookmark();
  }
}
Ae.prototype.visible = !0;
class ec {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let zi = !1;
function $i(n) {
  !zi && !n.parent.inlineContent && (zi = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Qe extends Ae {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    $i(e), $i(t), super(e, t);
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
      return Ae.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Qe(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = U.empty) {
    if (super.replace(e, t), t == U.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Qe && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new gr(this.anchor, this.head);
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
    return new Qe(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = Ae.findFrom(t, r, !0) || Ae.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ae.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ae.findFrom(e, -r, !0) || Ae.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Qe(e, t);
  }
}
Ae.jsonID("text", Qe);
class gr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new gr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Qe.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class Me extends Ae {
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
    return r ? Ae.near(o) : new Me(o);
  }
  content() {
    return new U(B.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof Me && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new oi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new Me(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new Me(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
Me.prototype.visible = !1;
Ae.jsonID("node", Me);
class oi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new gr(r, r) : new oi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && Me.isSelectable(r) ? new Me(t) : Ae.near(t);
  }
}
class ht extends Ae {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = U.empty) {
    if (t == U.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ae.atStart(e.doc);
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
    return new ht(e);
  }
  map(e) {
    return new ht(e);
  }
  eq(e) {
    return e instanceof ht;
  }
  getBookmark() {
    return tc;
  }
}
Ae.jsonID("all", ht);
const tc = {
  map() {
    return this;
  },
  resolve(n) {
    return new ht(n);
  }
};
function Qt(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Qe.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && Me.isSelectable(l))
        return Me.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = Qt(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Di(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof Le || i instanceof We))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(Ae.near(n.doc.resolve(s), t));
}
function Oi(n, e) {
  return !e || !n ? n : n.bind(e);
}
class jn {
  constructor(e, t, r) {
    this.name = e, this.init = Oi(t.init, r), this.apply = Oi(t.apply, r);
  }
}
new jn("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new jn("selection", {
  init(n, e) {
    return n.selection || Ae.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new jn("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new jn("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Qo = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Zo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const es = (n, e, t) => {
  let r = Zo(n, t);
  if (!r)
    return !1;
  let i = si(r);
  if (!i) {
    let s = r.blockRange(), l = s && dn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (us(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (an(o, "end") || Me.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = mr(n.doc, r.before(s), r.after(s), U.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(an(o, "end") ? Ae.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : Me.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, nc = (n, e, t) => {
  let r = Zo(n, t);
  if (!r)
    return !1;
  let i = si(r);
  return i ? ts(n, i, e) : !1;
}, rc = (n, e, t) => {
  let r = rs(n, t);
  if (!r)
    return !1;
  let i = li(r);
  return i ? ts(n, i, e) : !1;
};
function ts(n, e, t) {
  let r = e.nodeBefore, i = r, o = e.pos - 1;
  for (; !i.isTextblock; o--) {
    if (i.type.spec.isolating)
      return !1;
    let u = i.lastChild;
    if (!u)
      return !1;
    i = u;
  }
  let s = e.nodeAfter, l = s, a = e.pos + 1;
  for (; !l.isTextblock; a++) {
    if (l.type.spec.isolating)
      return !1;
    let u = l.firstChild;
    if (!u)
      return !1;
    l = u;
  }
  let c = mr(n.doc, o, a, U.empty);
  if (!c || c.from != o || c instanceof Le && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(Qe.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function an(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const ns = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = si(r);
  }
  let s = o && o.nodeBefore;
  return !s || !Me.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Me.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function si(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function rs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const is = (n, e, t) => {
  let r = rs(n, t);
  if (!r)
    return !1;
  let i = li(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (us(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (an(o, "start") || Me.isSelectable(o))) {
    let s = mr(n.doc, r.before(), r.after(), U.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(an(o, "start") ? Ae.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : Me.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, ss = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = li(r);
  }
  let s = o && o.nodeAfter;
  return !s || !Me.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(Me.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function li(n) {
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
const ic = (n, e) => {
  let t = n.selection, r = t instanceof Me, i;
  if (r) {
    if (t.node.isTextblock || !Vt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = pr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(Me.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, oc = (n, e) => {
  let t = n.selection, r;
  if (t instanceof Me) {
    if (t.node.isTextblock || !Vt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = pr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, sc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && dn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, ls = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function ai(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const lc = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = ai(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(Ae.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, as = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof ht || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = ai(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Qe.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, cs = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (wt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && dn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function ac(n) {
  return (e, t) => {
    if (e.selection instanceof Me && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !wt(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Qe || e.selection instanceof ht) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = ai(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let f = i.pos, d = wt(r.doc, f, s.length, s);
    if (d || (s[0] = a ? { type: a } : null, d = wt(r.doc, f, s.length, s)), !d)
      return !1;
    if (r.split(f, s.length, s), !c && u && i.node(l).type != a) {
      let h = r.mapping.slice(o), m = h.map(i.before(l)), g = r.doc.resolve(m);
      a && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const cc = ac(), uc = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(Me.create(n.doc, i))), !0);
};
function dc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Vt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function us(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && dc(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, m = B.empty;
      for (let b = s.length - 1; b >= 0; b--)
        m = B.from(s[b].create(null, m));
      m = B.from(i.copy(m));
      let g = n.tr.step(new We(e.pos - 1, h, e.pos, h, new U(m, 1, 0), s.length, !0)), y = g.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && Vt(g.doc, y.pos) && g.join(y.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : Ae.findFrom(e, 1), f = u && u.$from.blockRange(u.$to), d = f && dn(f);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(f, d).scrollIntoView()), !0;
  if (c && an(o, "start", !0) && an(i, "end")) {
    let h = i, m = [];
    for (; m.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, y = 1;
    for (; !g.isTextblock; g = g.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let b = B.empty;
        for (let E = m.length - 1; E >= 0; E--)
          b = B.from(m[E].copy(b));
        let z = n.tr.step(new We(e.pos - m.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new U(b, m.length, 0), 0, !0));
        t(z.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function ds(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Qe.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const fc = ds(-1), hc = ds(1);
function pc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && qo(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Pi(n, e = null) {
  return function(t, r) {
    let i = !1;
    for (let o = 0; o < t.selection.ranges.length && !i; o++) {
      let { $from: { pos: s }, $to: { pos: l } } = t.selection.ranges[o];
      t.doc.nodesBetween(s, l, (a, c) => {
        if (i)
          return !1;
        if (!(!a.isTextblock || a.hasMarkup(n, e)))
          if (a.type == n)
            i = !0;
          else {
            let u = t.doc.resolve(c), f = u.index();
            i = u.parent.canReplaceWith(f, f + 1, n);
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
function ci(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
ci(Qo, es, ns);
ci(Qo, is, ss);
ci(ls, as, cs, cc);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function mc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return gc(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function gc(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new Zn(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Zn(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = qo(o, t, r, e);
  return l ? (n && yc(n, e, l, i, t), !0) : !1;
}
function yc(n, e, t, r, i) {
  let o = B.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = B.from(t[u].type.create(t[u].attrs, o));
  n.step(new We(e.start - (r ? 2 : 0), e.end, e.start, e.end, new U(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, f = e.endIndex, d = !0; u < f; u++, d = !1)
    !d && wt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function xc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? bc(e, t, n, o) : vc(e, t, o) : !0 : !1;
  };
}
function bc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new We(o - 1, s, o, s, new U(B.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Zn(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = dn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Vt(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function vc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, m = t.endIndex - 1, g = t.startIndex; m > g; m--)
    h -= i.child(m).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? B.empty : B.from(i))))
    return !1;
  let f = o.pos, d = f + s.nodeSize;
  return r.step(new We(f - (l ? 1 : 0), d + (a ? 1 : 0), f + 1, d - 1, new U((l ? B.empty : B.from(i.copy(B.empty))).append(a ? B.empty : B.from(i.copy(B.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function wc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (c) => c.childCount > 0 && c.firstChild.type == n);
    if (!o)
      return !1;
    let s = o.startIndex;
    if (s == 0)
      return !1;
    let l = o.parent, a = l.child(s - 1);
    if (a.type != n)
      return !1;
    if (t) {
      let c = a.lastChild && a.lastChild.type == l.type, u = B.from(c ? n.create() : null), f = new U(B.from(n.create(null, B.from(l.type.create(null, u)))), c ? 3 : 1, 0), d = o.start, h = o.end;
      t(e.tr.step(new We(d - (c ? 3 : 1), h, d, h, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function fs(n) {
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
var kc = class hs {
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
    return Object.fromEntries(Object.entries(e).map(([l, a]) => [l, (...u) => {
      const f = a(...u)(s);
      return !o.getMeta("preventDispatch") && !this.hasCustomState && i.dispatch(o), f;
    }]));
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(e, t = !0) {
    const { rawCommands: r, editor: i, state: o } = this, { view: s } = i, l = [], a = !!e, c = e || o.tr, u = () => (!a && t && !c.getMeta("preventDispatch") && !this.hasCustomState && s.dispatch(c), l.every((d) => d === !0)), f = {
      ...Object.fromEntries(Object.entries(r).map(([d, h]) => [d, (...g) => {
        const y = this.buildProps(c, t), b = h(...g)(y);
        return l.push(b), f;
      }])),
      run: u
    };
    return f;
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
      ...Object.fromEntries(Object.entries(t).map(([l, a]) => [l, (...c) => a(...c)({
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
    const e = hs.createFakeChain();
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
      state: fs({
        state: o,
        transaction: e
      }),
      dispatch: t ? () => {
      } : void 0,
      chain: () => this.createChain(e, t),
      can: () => this.createCan(e),
      get commands() {
        return Object.fromEntries(Object.entries(r).map(([a, c]) => [a, (...u) => c(...u)(l)]));
      }
    };
    return l;
  }
};
const Sc = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), Nc = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Tc = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: c, mapping: u } = e, f = c.resolve(u.map(a)), d = c.resolve(u.map(a + l.nodeSize)), h = f.blockRange(d);
      if (!h) return;
      const m = dn(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(h.start, g);
      }
      (m || m === 0) && e.lift(h, m);
    });
  }), !0;
}, Ec = (n) => (e) => n(e), Cc = () => ({ state: n, dispatch: e }) => as(n, e), Mc = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new it(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Rc = () => ({ tr: n, dispatch: e }) => {
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
function Ve(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Ac = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Ve(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), a = o.after(s);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Ic = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, zc = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Li = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return zc(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, $c = (n, e, t) => ({
  from: Li(n, t, "left"),
  to: Li(e, t, "right")
}), Dc = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = $c(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(it.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Oc = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Pc = () => ({ state: n, dispatch: e }) => lc(n, e);
function Lc(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function rr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Lc(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function ps(n, e, t = {}) {
  return n.find((r) => r.type === e && rr(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Bi(n, e, t = {}) {
  return !!ps(n, e, t);
}
function ms(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((c) => c.type === e);
    a && (t = a.attrs);
  }
  if (!ps([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Bi([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Bi([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function $t(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const Bc = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = $t(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const f = ms(a, o, e);
    if (f && f.from <= c && f.to >= u) {
      const d = it.create(s, f.from, f.to);
      t.setSelection(d);
    }
  }
  return !0;
}, Fc = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function gs(n) {
  return n instanceof it;
}
function Bt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Hc(n, e = null) {
  if (!e) return null;
  const t = en.atStart(n), r = en.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? it.create(n, Bt(0, i, o), Bt(n.content.size, i, o)) : it.create(n, Bt(e, i, o), Bt(e, i, o));
}
function Fi() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function ir() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function _c() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const jc = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (ir() || Fi()) && r.dom.focus(), _c() && !ir() && !Fi() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !gs(t.state.selection))
    return s(), !0;
  const l = Hc(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Wc = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), qc = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), ys = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && ys(r);
  }
  return n;
};
function Wn(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return ys(t);
}
function xs(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function cn(n, e, t) {
  if (xs(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return B.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), cn("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new Ta({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        nodes: e.spec.nodes.append({ __tiptap__private__unknown__catch__all__node: {
          content: "inline*",
          group: "block",
          parseDOM: [{
            tag: "*",
            getAttrs: (c) => (s = !0, l = typeof c == "string" ? c : c.outerHTML, null)
          }]
        } })
      });
      if (t.slice ? nn.fromSchema(a).parseSlice(Wn(n), t.parseOptions) : nn.fromSchema(a).parse(Wn(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = nn.fromSchema(e);
    return t.slice ? o.parseSlice(Wn(n), t.parseOptions).content : o.parse(Wn(n), t.parseOptions);
  }
  return cn("", e, t);
}
function bs(n) {
  return !("type" in n);
}
function vs(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof Le || i instanceof We)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(en.near(n.doc.resolve(s), t));
}
const Jc = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const a = (y) => {
      o.emit("contentError", {
        editor: o,
        error: y,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      cn(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (y) {
      a(y);
    }
    try {
      var s;
      l = cn(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (y) {
      return a(y), !1;
    }
    let { from: u, to: f } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, d = !0, h = !0;
    const m = bs(l) ? l.content : [l];
    if (m.forEach((y) => {
      y.check(), d = d ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === f && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, f += 1);
    }
    let g;
    if (d)
      Array.isArray(e) ? g = e.map((y) => y.text || "").join("") : xs(e) ? g = m.map((y) => {
        var b;
        return (b = y.text) !== null && b !== void 0 ? b : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, f);
    else {
      g = B.from(m);
      const y = r.doc.resolve(u), b = y.node(), z = y.parentOffset === 0, E = b.isText || b.isTextblock, w = b.content.size > 0;
      z && E && w && h && (u = Math.max(0, u - 1)), r.replaceWith(u, f, m);
    }
    t.updateSelection && vs(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function ws(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Kc = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const c = ws(a.parent.contentMatchAt(a.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), f = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let d;
  if (s) {
    const h = cn(s, r.schema);
    d = c.createAndFill(f, h);
  } else d = c.createAndFill(f);
  return d ? (t && (e.insert(a.pos, d), l && vs(e, e.steps.length - 1, -1)), !0) : !1;
}, Vc = () => ({ state: n, dispatch: e }) => ic(n, e), Yc = () => ({ state: n, dispatch: e }) => oc(n, e), Uc = () => ({ state: n, dispatch: e }) => es(n, e), Gc = () => ({ state: n, dispatch: e }) => is(n, e), Xc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = pr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Qc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = pr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Zc = () => ({ state: n, dispatch: e }) => nc(n, e), eu = () => ({ state: n, dispatch: e }) => rc(n, e);
function ks() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function tu(n) {
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
      ir() || ks() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const nu = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = tu(n).split(/-(?!$)/), s = o.find((c) => ![
    "Alt",
    "Ctrl",
    "Meta",
    "Shift"
  ].includes(c)), l = new KeyboardEvent("keydown", {
    key: s === "Space" ? " " : s,
    altKey: o.includes("Alt"),
    ctrlKey: o.includes("Ctrl"),
    metaKey: o.includes("Meta"),
    shiftKey: o.includes("Shift"),
    bubbles: !0,
    cancelable: !0
  }), a = e.captureTransaction(() => {
    t.someProp("handleKeyDown", (c) => c(t, l));
  });
  return a == null || a.steps.forEach((c) => {
    const u = c.map(r.mapping);
    u && i && r.maybeStep(u);
  }), !0;
};
function ui(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Ve(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, f) => {
    if (u.isText) return;
    const d = Math.max(r, f), h = Math.min(i, f + u.nodeSize);
    l.push({
      node: u,
      from: d,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => rr(u.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, f) => u + f.to - f.from, 0) >= a;
}
const ru = (n, e = {}) => ({ state: t, dispatch: r }) => ui(t, Ve(n, t.schema), e) ? sc(t, r) : !1, iu = () => ({ state: n, dispatch: e }) => cs(n, e), ou = (n) => ({ state: e, dispatch: t }) => {
  const r = Ve(n, e.schema);
  return xc(r)(e, t);
}, su = () => ({ state: n, dispatch: e }) => ls(n, e);
function Ss(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Hi(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const lu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ss(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ve(n, r.schema)), l === "mark" && (s = $t(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, f) => {
      o && o === u.type && (a = !0, i && t.setNodeMarkup(f, void 0, Hi(u.attrs, e))), s && u.marks.length && u.marks.forEach((d) => {
        s === d.type && (a = !0, i && t.addMark(f, f + u.nodeSize, s.create(Hi(d.attrs, e))));
      });
    });
  }), a;
}, au = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), cu = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Zs(n.doc);
    n.setSelection(t);
  }
  return !0;
}, uu = () => ({ state: n, dispatch: e }) => ns(n, e), du = () => ({ state: n, dispatch: e }) => ss(n, e), fu = () => ({ state: n, dispatch: e }) => uc(n, e), hu = () => ({ state: n, dispatch: e }) => hc(n, e), pu = () => ({ state: n, dispatch: e }) => fc(n, e);
function mu(n, e, t = {}, r = {}) {
  return cn(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const gu = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const c = mu(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = bs(c) ? c.content : [c];
      o.replaceWith(0, a.content.size, u).setMeta("preventUpdate", !t);
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
function yu(n, e) {
  const t = $t(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function xu(n, e) {
  const t = new Za(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function bu(n, e) {
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
function di(n) {
  return (e) => bu(e.$from, n);
}
function En(n, e, t) {
  return n.config[e] === void 0 && n.parent ? En(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? En(n.parent, e, t) : null
  }) : n.config[e];
}
function vu(n) {
  return typeof n == "function";
}
function Hr(n, e = void 0, ...t) {
  return vu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Ns(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function wu(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, f) => {
    a.isBlock && c > r && (l += o);
    const d = s == null ? void 0 : s[a.type.name];
    if (d)
      return u && (l += d({
        node: a,
        pos: c,
        parent: u,
        index: f,
        range: e
      })), !1;
    if (a.isText) {
      var h;
      l += a == null || (h = a.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, c) - c, i - c);
    }
  }), l;
}
function ku(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function Su(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Nu(n) {
  const e = Su(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function Tu(n) {
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
      const c = e.slice(o).map(l, -1), u = e.slice(o).map(a), f = e.invert().map(c, -1), d = e.invert().map(u);
      r.push({
        oldRange: {
          from: f,
          to: d
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), Nu(r);
}
function Vn(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function Eu(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? $t(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => rr(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: f }) => {
    const d = u.pos, h = f.pos;
    n.doc.nodesBetween(d, h, (m, g) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o)) return !1;
      if (!m.isText && !m.marks.length) return;
      const y = Math.max(d, g), b = Math.min(h, g + m.nodeSize), z = b - y;
      s += z, l.push(...m.marks.map((E) => ({
        mark: E,
        from: y,
        to: b
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => rr(u.mark.attrs, t, { strict: !1 })).reduce((u, f) => u + f.to - f.from, 0), c = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, f) => u + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function Er(n, e) {
  const { nodeExtensions: t } = Ns(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Hr(En(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Ts(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Ts(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function Cu(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (gs(r) && (i = r.$cursor), i) {
    var o;
    const l = (o = n.storedMarks) !== null && o !== void 0 ? o : i.marks();
    return i.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((a) => a.type.excludes(t)));
  }
  const { ranges: s } = r;
  return s.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, f, d) => {
      if (c) return !1;
      if (u.isInline) {
        const h = !d || d.type.allowsMarkType(t), m = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        c = h && m;
      }
      return !c;
    }), c;
  });
}
const Mu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = $t(n, r.schema);
  if (i)
    if (s) {
      const c = yu(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else l.forEach((c) => {
      const u = c.$from.pos, f = c.$to.pos;
      r.doc.nodesBetween(u, f, (d, h) => {
        const m = Math.max(h, u), g = Math.min(h + d.nodeSize, f);
        d.marks.find((y) => y.type === a) ? d.marks.forEach((y) => {
          a === y.type && t.addMark(m, g, a.create({
            ...y.attrs,
            ...e
          }));
        }) : t.addMark(m, g, a.create(e));
      });
    });
  return Cu(r, t, a);
}, Ru = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Au = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Ve(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Pi(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Pi(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Iu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Bt(n, 0, r.content.size), o = on.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, zu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, $u = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = it.atStart(r).from, l = it.atEnd(r).to, a = Bt(i, s, l), c = Bt(o, s, l), u = it.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, Du = (n) => ({ state: e, dispatch: t }) => {
  const r = Ve(n, e.schema);
  return wc(r)(e, t);
};
function _i(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Ou = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = Vn(c, l.node().type.name, l.node().attrs);
  if (o instanceof on && o.node.isBlock)
    return !l.parentOffset || !wt(s, l.pos) ? !1 : (r && (n && _i(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const f = a.parentOffset === a.parent.content.size, d = l.depth === 0 ? void 0 : ws(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = f && d ? [{
    type: d,
    attrs: u
  }] : void 0, m = wt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !m && wt(e.doc, e.mapping.map(l.pos), 1, d ? [{ type: d }] : void 0) && (m = !0, h = d ? [{
    type: d,
    attrs: u
  }] : void 0), r) {
    if (m && (o instanceof it && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), d && !f && !l.parentOffset && l.parent.type !== d)) {
      const g = e.mapping.map(l.before()), y = e.doc.resolve(g);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, d) && e.setNodeMarkup(e.mapping.map(l.before()), d);
    }
    n && _i(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return m;
}, Pu = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Ve(n, r.schema), { $from: l, $to: a } = r.selection, c = r.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const f = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var d;
      let b = B.empty;
      const z = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let _ = l.depth - z; _ >= l.depth - 3; _ -= 1) b = B.from(l.node(_).copy(b));
      const E = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, w = {
        ...Vn(f, l.node().type.name, l.node().attrs),
        ...e
      }, N = ((d = s.contentMatch.defaultType) === null || d === void 0 ? void 0 : d.createAndFill(w)) || void 0;
      b = b.append(B.from(s.createAndFill(null, N) || void 0));
      const M = l.before(l.depth - (z - 1));
      t.replace(M, l.after(-E), new U(b, 4 - z, 0));
      let F = -1;
      t.doc.nodesBetween(M, t.doc.content.size, (_, T) => {
        if (F > -1) return !1;
        _.isTextblock && _.content.size === 0 && (F = T + 1);
      }), F > -1 && t.setSelection(it.near(t.doc.resolve(F))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, m = {
    ...Vn(f, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Vn(f, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const y = h ? [{
    type: s,
    attrs: m
  }, {
    type: h,
    attrs: g
  }] : [{
    type: s,
    attrs: m
  }];
  if (!wt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: b, storedMarks: z } = r, { splittableMarks: E } = o.extensionManager, w = z || b.$to.parentOffset && b.$from.marks();
    if (t.split(l.pos, 2, y).scrollIntoView(), !w || !i) return !0;
    const N = w.filter((M) => E.includes(M.type.name));
    t.ensureMarks(N);
  }
  return !0;
};
function ji(n) {
  return !n || n === "1" ? null : n;
}
function Es(n, e) {
  return ji(n) === ji(e);
}
const Cr = (n, e) => {
  const t = di((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Vt(n.doc, t.pos)) || !Es(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, Mr = (n, e) => {
  const t = di((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Vt(n.doc, r)) || !Es(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Lu(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return it.between(r, i);
}
const Bu = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: f, splittableMarks: d } = i.extensionManager, h = Ve(n, s.schema), m = Ve(e, s.schema), { selection: g, storedMarks: y } = s, { $from: b, $to: z } = g, E = b.blockRange(z), w = y || g.$to.parentOffset && g.$from.marks();
  if (!E) return !1;
  const N = di((H) => Er(H.type.name, f))(g), M = g.from === 0 && g.to === s.doc.content.size, F = s.doc.content.content, _ = F.length === 1 ? F[0] : null, T = M && _ && Er(_.type.name, f) ? {
    node: _,
    pos: 0
  } : null, J = N ?? T, R = !!N && E.depth >= 1 && E.depth - N.depth <= 1, W = !!T;
  if ((R || W) && J) {
    if (J.node.type === h)
      return M && W ? a().command(({ tr: H, dispatch: V }) => {
        const K = Lu(H);
        return K ? (H.setSelection(K), V && V(H), !0) : !1;
      }).liftListItem(m).run() : c.liftListItem(m);
    if (Er(J.node.type.name, f) && h.validContent(J.node.content)) return a().command(() => (o.setNodeMarkup(J.pos, h), !0)).command(() => Cr(o, h)).command(() => Mr(o, h)).run();
  }
  return !t || !w || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => Cr(o, h)).command(() => Mr(o, h)).run() : a().command(() => {
    const H = u().wrapInList(h, r), V = w.filter((K) => d.includes(K.type.name));
    return o.ensureMarks(V), H ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => Cr(o, h)).command(() => Mr(o, h)).run();
}, Fu = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = $t(n, r.schema);
  return Eu(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Hu = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Ve(n, r.schema), s = Ve(e, r.schema), l = ui(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, _u = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Ve(n, t.schema);
  return ui(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, ju = () => ({ state: n, dispatch: e }) => {
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
}, Wu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s) return !0;
  const { nonClearableMarks: a } = r.extensionManager;
  if (t) {
    const c = Object.values(r.schema.marks).filter((u) => i || !a.includes(u.name));
    l.forEach((u) => {
      for (const f of c) e.removeMark(u.$from.pos, u.$to.pos, f);
    });
  }
  return !0;
}, qu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = $t(n, r.schema), { $from: a, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var f;
    let { from: d, to: h } = s;
    const m = ms(a, l, (f = a.marks().find((g) => g.type === l)) === null || f === void 0 ? void 0 : f.attrs);
    m && (d = m.from, h = m.to), t.removeMark(d, h, l);
  } else u.forEach((d) => {
    t.removeMark(d.$from.pos, d.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Ju = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText) return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, Ku = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Ss(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ve(n, r.schema)), l === "mark" && (s = $t(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, f = c.$to.pos;
    let d, h, m, g;
    t.selection.empty ? r.doc.nodesBetween(u, f, (y, b) => {
      o && o === y.type && (a = !0, m = Math.max(b, u), g = Math.min(b + y.nodeSize, f), d = b, h = y);
    }) : r.doc.nodesBetween(u, f, (y, b) => {
      b < u && o && o === y.type && (a = !0, m = Math.max(b, u), g = Math.min(b + y.nodeSize, f), d = b, h = y), b >= u && b <= f && (o && o === y.type && (a = !0, i && t.setNodeMarkup(b, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((z) => {
        if (s === z.type && (a = !0, i)) {
          const E = Math.max(b, u), w = Math.min(b + y.nodeSize, f);
          t.addMark(E, w, s.create({
            ...z.attrs,
            ...e
          }));
        }
      }));
    }), h && (d !== void 0 && i && t.setNodeMarkup(d, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((y) => {
      s === y.type && i && t.addMark(m, g, s.create({
        ...y.attrs,
        ...e
      }));
    }));
  }), a;
}, Vu = new pt("__tiptap_decorations__"), Yu = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Vu, {
  type: "force",
  name: n
}), !0), Uu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ve(n, t.schema);
  return pc(i, e)(t, r);
}, Gu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ve(n, t.schema);
  return mc(i, e)(t, r);
};
var Xu = /* @__PURE__ */ aa({
  blur: () => Sc,
  clearContent: () => Nc,
  clearNodes: () => Tc,
  command: () => Ec,
  createParagraphNear: () => Cc,
  cut: () => Mc,
  deleteCurrentNode: () => Rc,
  deleteNode: () => Ac,
  deleteRange: () => Ic,
  deleteSelection: () => Dc,
  enter: () => Oc,
  exitCode: () => Pc,
  extendMarkRange: () => Bc,
  first: () => Fc,
  focus: () => jc,
  forEach: () => Wc,
  insertContent: () => qc,
  insertContentAt: () => Jc,
  insertDefaultBlock: () => Kc,
  joinBackward: () => Uc,
  joinDown: () => Yc,
  joinForward: () => Gc,
  joinItemBackward: () => Xc,
  joinItemForward: () => Qc,
  joinTextblockBackward: () => Zc,
  joinTextblockForward: () => eu,
  joinUp: () => Vc,
  keyboardShortcut: () => nu,
  lift: () => ru,
  liftEmptyBlock: () => iu,
  liftListItem: () => ou,
  newlineInCode: () => su,
  resetAttributes: () => lu,
  scrollIntoView: () => au,
  selectAll: () => cu,
  selectNodeBackward: () => uu,
  selectNodeForward: () => du,
  selectParentNode: () => fu,
  selectTextblockEnd: () => hu,
  selectTextblockStart: () => pu,
  setContent: () => gu,
  setMark: () => Mu,
  setMeta: () => Ru,
  setNode: () => Au,
  setNodeSelection: () => Iu,
  setTextDirection: () => zu,
  setTextSelection: () => $u,
  sinkListItem: () => Du,
  splitBlock: () => Ou,
  splitListItem: () => Pu,
  toggleList: () => Bu,
  toggleMark: () => Fu,
  toggleNode: () => Hu,
  toggleWrap: () => _u,
  undoInputRule: () => ju,
  unsetAllMarks: () => Wu,
  unsetMark: () => qu,
  unsetTextDirection: () => Ju,
  updateAttributes: () => Ku,
  updateDecorations: () => Yu,
  wrapIn: () => Uu,
  wrapInList: () => Gu
});
typeof process < "u" && process.env.NODE_ENV;
function Qu(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function qn(n) {
  return Qu(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Cs(n, e) {
  const t = { ...n };
  return qn(n) && qn(e) && Object.keys(e).forEach((r) => {
    qn(e[r]) && qn(n[r]) ? t[r] = Cs(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Ms = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Hr(En(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Hr(En(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Cs(this.options, n)
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
}, Zu = class Rs extends Ms {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Rs(t);
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
}, ot = class As extends Ms {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new As(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
ot.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new kt({
      key: new pt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = ku(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((a, c) => a.$from.pos - c.$from.pos).map(({ $from: a, $to: c }) => wu(r, {
          from: a.pos,
          to: c.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
ot.create({
  name: "commands",
  addCommands() {
    return { ...Xu };
  }
});
ot.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const a = xu(n.before, [n, ...e]);
      Tu(a).forEach((u) => {
        a.mapping.mapResult(u.oldRange.from).deletedAfter && a.mapping.mapResult(u.oldRange.to).deletedBefore && a.before.nodesBetween(u.oldRange.from, u.oldRange.to, (f, d) => {
          const h = d + f.nodeSize - 2, m = u.oldRange.from <= d && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: f,
            from: d,
            to: h,
            newFrom: a.mapping.map(d),
            newTo: a.mapping.map(h),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !m,
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        });
      });
      const c = a.mapping;
      a.steps.forEach((u, f) => {
        if (u instanceof ft) {
          var d, h;
          const m = c.slice(f).map(u.from, -1), g = c.slice(f).map(u.to), y = c.invert().map(m, -1), b = c.invert().map(g), z = m > 0 ? (d = a.doc.nodeAt(m - 1)) === null || d === void 0 ? void 0 : d.marks.some((w) => w.eq(u.mark)) : !1, E = (h = a.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((w) => w.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: y,
              to: b
            },
            newRange: {
              from: m,
              to: g
            },
            partial: !!(E || z),
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
ot.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new kt({
      key: new pt("tiptapDrop"),
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
ot.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new kt({
      key: new pt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const ed = new pt("focusEvents");
ot.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new kt({
      key: ed,
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
ot.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: f } = a, { pos: d, parent: h } = f, m = f.parent.isTextblock && d > 0 ? l.doc.resolve(d - 1) : f, g = m.parent.type.spec.isolating, y = f.pos - f.parentOffset, b = g && m.parent.childCount === 1 ? y === f.pos : en.atStart(c).from === d;
        return !u || !h.type.isTextblock || h.textContent.length || !b || b && f.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return ir() || ks() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new kt({
      key: new pt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = en.atStart(e.doc).from, c = en.atEnd(e.doc).to;
        if (o || !(s === a && l === c) || !Ts(t.doc)) return;
        const u = t.tr, f = fs({
          state: t,
          transaction: u
        }), { commands: d } = new kc({
          editor: this.editor,
          state: f
        });
        if (d.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
ot.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new kt({
      key: new pt("tiptapPaste"),
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
ot.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new kt({
      key: new pt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
ot.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = Ns(this.extensions);
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
    return [new kt({
      key: new pt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const td = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), nd = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), rd = /^(https?:\/\/|mailto:)/i;
function id(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    nd.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function _r(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(_r(a));
    return l;
  };
  if (!td.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!rd.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = id(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(_r(l));
  return i;
}
function Is(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function od(n) {
  const e = Is(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(_r(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Rf(n) {
  const e = Is(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Af(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function sd(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Wi(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const ld = { text: "#52525b" }, ad = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var d;
  const s = n.attrs.field ?? "", l = t.options, a = ((d = l.resolve) == null ? void 0 : d.call(l, s)) ?? null, c = (a == null ? void 0 : a.color) ?? ld, u = (a == null ? void 0 : a.label) ?? `{{${s}}}`, f = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ p(
    Gs,
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
        var b;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const m = typeof o == "function" ? o() : null;
        if (m == null) return;
        const g = i.state.doc.resolve(m), y = g.nodeAfter;
        y && on.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new on(g))), (b = l.onTokenClick) == null || b.call(l, s, h.currentTarget.getBoundingClientRect(), m);
      },
      children: f ? /* @__PURE__ */ p("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, cd = ul.extend({
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
    return Us(ad);
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
    return ["span", Ys({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), ud = 240, dd = 280, fd = ({ props: n, onApi: e }) => {
  const t = ur(), r = k(e);
  r.current = e, ie(() => {
    r.current(t);
  }, [t]);
  const i = k(null);
  ie(() => {
    var s;
    t.pointerDriven || sn(
      (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted"),
      "nearest",
      i.current
    );
  }, [t.highlightedIndex, t.pointerDriven]), ie(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = cr();
  return /* @__PURE__ */ p(An.Provider, { value: t, children: /* @__PURE__ */ p(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: dd, maxHeight: ud },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ p("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ p(
        hd,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, hd = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = mo({
    label: () => n.label,
    activate: t
  }), s = Ie(), l = { padding: `${L(8, 12, s)}px ${L(12, 16, s)}px`, fontSize: L(12, 14, s) };
  return /* @__PURE__ */ C(
    "div",
    {
      role: "option",
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
}, qi = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ p(fd, { props: r, onApi: (i) => {
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
        var u, f;
        if (!n) return;
        const a = (f = (u = n.props) == null ? void 0 : u.clientRect) == null ? void 0 : f.call(u), c = a && !s.endsWith("-end") ? a.width : 0;
        n.holder.style.position = l, n.holder.style.left = `${i + c}px`, n.holder.style.top = `${o}px`;
      }
    }));
  };
  return {
    onStart(r) {
      const i = document.createElement("div");
      i.style.zIndex = "10002";
      const o = dl(i);
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
        const a = s.highlightedIndex, c = l === "ArrowDown" ? 1 : -1;
        return s.setHighlighted((a + c + i.length) % i.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        r.preventDefault();
        const a = s.highlightedIndex, c = a >= 0 ? a : 0, u = s.items[c];
        return u ? u.activate() : i[c] && o({ field: i[c].key }), !0;
      }
      return !1;
    },
    onExit() {
      var r;
      n && ((r = n.unmount) == null || r.call(n), n.root.unmount(), n.holder.remove(), n = null);
    }
  };
}, pd = Zu.create({
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
}), Yn = new pt("retainedSelectionHighlight"), md = ot.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new kt({
        key: Yn,
        state: {
          init: () => ({ held: !1, decorations: Dn.empty }),
          apply(n, e) {
            const t = n.getMeta(Yn), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: Dn.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? Dn.empty : Dn.create(n.doc, [el.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Yn.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), If = {
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
function zs(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function gd(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = zs(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const yd = Pe.forwardRef(({
  value: n,
  onChange: e,
  placeholder: t,
  disabled: r,
  className: i,
  onStateChange: o,
  resolveToken: s,
  suggestionItems: l,
  attributeItems: a,
  onTokenClick: c,
  onSelectionChange: u
}, f) => {
  const d = k(s);
  d.current = s;
  const h = k(l);
  h.current = l;
  const m = k(a);
  m.current = a;
  const g = k(c);
  g.current = c;
  const y = k(u);
  y.current = u;
  const b = k(null), z = k(null), E = k(e);
  E.current = e;
  const w = k(r);
  w.current = r;
  const N = k(o);
  N.current = o;
  const M = k(null), F = (W) => {
    var P;
    const H = W.getAttributes("textStyle"), V = W.getAttributes("reportTextStyle"), { from: K, to: S, empty: O } = W.state.selection;
    let ee = !1, ae = !1, X = !1;
    if (!O) {
      const $ = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set(), q = /* @__PURE__ */ new Set();
      W.state.doc.nodesBetween(K, S, (le) => {
        if (!le.isText) return;
        const se = le.marks.find((D) => D.type.name === "textStyle");
        $.add((se == null ? void 0 : se.attrs.fontFamily) || ""), Q.add((se == null ? void 0 : se.attrs.fontSize) || "");
        const _e = le.marks.find((D) => D.type.name === "reportTextStyle");
        q.add((_e == null ? void 0 : _e.attrs.styleId) || "");
      }), ee = $.size > 1, ae = Q.size > 1, X = q.size > 1;
    }
    const re = {
      bold: W.isActive("bold"),
      italic: W.isActive("italic"),
      underline: W.isActive("underline"),
      strike: W.isActive("strike"),
      link: W.isActive("link"),
      color: H.color || "",
      fontFamily: H.fontFamily || "",
      fontSize: H.fontSize || "",
      textStyle: V.styleId || "",
      hasSelection: !O,
      fontFamilyMixed: ee,
      fontSizeMixed: ae,
      textStyleMixed: X
    }, I = M.current;
    I && I.bold === re.bold && I.italic === re.italic && I.underline === re.underline && I.strike === re.strike && I.link === re.link && I.color === re.color && I.fontFamily === re.fontFamily && I.fontSize === re.fontSize && I.textStyle === re.textStyle && I.hasSelection === re.hasSelection && I.fontFamilyMixed === re.fontFamilyMixed && I.fontSizeMixed === re.fontSizeMixed && I.textStyleMixed === re.textStyleMixed || (M.current = re, (P = N.current) == null || P.call(N, re));
  }, _ = (W) => {
    var O;
    const H = W.state.selection;
    let V = null;
    H instanceof on && H.node.type.name === "token" ? (V = { key: H.node.attrs.field ?? "", pos: H.from }, b.current = H.from) : b.current != null && (b.current = W.state.tr.mapping.map(b.current));
    const K = z.current, S = K && V && K.key === V.key && K.pos === V.pos;
    !K && !V || S || (z.current = V, (O = y.current) == null || O.call(y, V));
  }, T = (W) => {
    const H = od(sd(W));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(H) ? "" : H;
  }, J = Pe.useMemo(() => {
    const W = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: K }) => {
        var S;
        return ((S = h.current) == null ? void 0 : S.call(h, K)) ?? [];
      },
      command: ({ editor: K, range: S, props: O }) => {
        K.chain().focus().insertContentAt(S, { type: "token", attrs: { field: O.field } }).run();
      },
      render: qi
    }, H = cd.configure({
      resolve: d.current ?? null,
      suggestion: W,
      onTokenClick: (K, S, O) => {
        var ee;
        b.current = O, (ee = g.current) == null || ee.call(g, K, S, O);
      }
    }), V = ot.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          cl({
            pluginKey: new pt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: K, range: S }) => zs(K, S.from) != null,
            items: ({ editor: K, query: S }) => {
              var ee;
              const O = gd(K);
              return O ? ((ee = m.current) == null ? void 0 : ee.call(m, O.chipKey, S)) ?? [] : [];
            },
            command: ({ editor: K, range: S, props: O }) => {
              K.chain().focus().insertContentAt(S, { type: "token", attrs: { field: O.field } }).run();
            },
            render: qi
          })
        ];
      }
    });
    return [H, V];
  }, []), R = Xs({
    immediatelyRender: !1,
    extensions: [
      tl,
      nl.configure({ placeholder: t }),
      rl,
      il,
      ol,
      pd,
      md,
      sl,
      al,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      ll.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...J
    ],
    content: Wi(n || ""),
    editable: !r,
    onUpdate: ({ editor: W }) => {
      E.current(T(W.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: W }) => {
      F(W), _(W);
    }
  });
  return ie(() => {
    if (!R || R.isFocused) return;
    T(R.getHTML()) !== n && (M.current = null, R.commands.setContent(Wi(n || ""), { emitUpdate: !1 }), F(R));
  }, [n, R]), ie(() => {
    R && R.setEditable(!r);
  }, [r, R]), ie(() => {
    R && (M.current = null, F(R), _(R));
  }, [R]), Ds(f, () => ({
    exec: (W, H, V) => {
      if (!R || w.current) return;
      const K = R.chain(), S = (V == null ? void 0 : V.focus) === !1 ? K : K.focus();
      switch (W) {
        case "bold":
          S.toggleBold().run();
          break;
        case "italic":
          S.toggleItalic().run();
          break;
        case "underline":
          S.toggleUnderline().run();
          break;
        case "strikeThrough":
          S.toggleStrike().run();
          break;
        case "foreColor":
          H && S.setColor(H).run();
          break;
        case "unsetColor":
          S.unsetColor().run();
          break;
        case "fontFamily":
          H && S.setFontFamily(H).run();
          break;
        case "unsetFontFamily":
          S.unsetFontFamily().run();
          break;
        case "fontSize":
          H && S.setFontSize(H).run();
          break;
        case "unsetFontSize":
          S.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          H && S.setMark("reportTextStyle", { styleId: H }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          S.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          S.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          H && S.extendMarkRange("link").setLink({ href: H }).run();
          break;
        case "unlink":
          S.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (W) => R == null ? void 0 : R.commands.focus(W),
    insertToken: (W) => {
      !R || w.current || R.chain().focus().insertContent({ type: "token", attrs: { field: W } }).run();
    },
    replaceToken: (W) => {
      if (!R || w.current) return;
      const H = b.current;
      H != null && R.commands.command(({ tr: V }) => {
        const K = V.doc.nodeAt(H);
        if (!K || K.type.name !== "token") return !1;
        V.setNodeMarkup(H, void 0, { field: W });
        const S = V.doc.resolve(H);
        return S.nodeAfter && S.nodeAfter.type.name === "token" && V.setSelection(new on(S)), !0;
      });
    },
    holdSelectionHighlight: (W) => {
      !R || R.isDestroyed || R.view.dispatch(R.state.tr.setMeta(Yn, { held: W }));
    }
  }), [R]), /* @__PURE__ */ p(Qs, { editor: R, className: `richtext-editor ${i || ""}` });
});
yd.displayName = "RichTextEditor";
const xd = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], bd = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Ji = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ p("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ p("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), vd = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = ne(!1);
  return /* @__PURE__ */ p(
    dr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ C("button", { type: "button", disabled: e, className: `${oa} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ p("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ p("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ p(Cn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: xd.map((s) => /* @__PURE__ */ p(Cl, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ p(or, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ p("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, wd = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = ne(!1), o = fr(), [s, l] = ne(""), a = () => {
    var u;
    const c = s.trim();
    c && ((u = n.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ p(
    dr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ p(
        dt,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ p(js, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ C("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ p(
          "input",
          {
            value: s,
            onChange: (c) => l(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), a());
            },
            style: o.input,
            className: ra + " w-full"
          }
        ),
        /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ p(dt, { theme: "dark", onClick: a, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ p(
            dt,
            {
              theme: "dark",
              onClick: () => {
                var c;
                (c = n.current) == null || c.exec("unlink"), i(!1);
              },
              style: o.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, zf = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: a = !0 }) => {
  const [c, u] = ne(!1), f = (y, b) => {
    var z;
    return (z = n.current) == null ? void 0 : z.exec(y, b);
  }, d = fr(), h = (y) => !!(r != null && r[y]), m = "flex items-center gap-1 shrink-0", g = a ? /* @__PURE__ */ p("div", { className: wo }) : null;
  return /* @__PURE__ */ C("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ C("div", { className: m, children: [
      /* @__PURE__ */ p(Xt, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ p(dt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("bold"), style: { ...d.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ p(Xt, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ p(dt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("italic"), style: { ...d.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ p(Xt, { content: "Underline", children: /* @__PURE__ */ p(dt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("underline"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Fs, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ p(Xt, { content: "Strikethrough", children: /* @__PURE__ */ p(dt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("strikeThrough"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ p(Hs, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(wd, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ p("div", { className: m, children: /* @__PURE__ */ p(
      dr,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ C(dt, { theme: "dark", disabled: e, style: d.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ p("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ p(Ji, {}),
          /* @__PURE__ */ p(Cn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                f("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ p(Ji, { className: "w-3.5 h-3.5" })
            }
          ),
          bd.map((y) => /* @__PURE__ */ p(
            "button",
            {
              onClick: () => {
                f("foreColor", y), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${y === (t == null ? void 0 : t.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: y },
              title: y
            },
            y
          ))
        ] })
      }
    ) }),
    (o || s || l) && /* @__PURE__ */ C(Ke, { children: [
      g,
      /* @__PURE__ */ C("div", { className: m, children: [
        o && /* @__PURE__ */ p(vd, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ p(Xt, { content: "Clear formatting", children: /* @__PURE__ */ p(
          dt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => f("clearFormatting"),
            style: { ...d.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ p(_s, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ C(Ke, { children: [
      g,
      /* @__PURE__ */ p("div", { className: m, children: i })
    ] })
  ] });
};
function fi(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function kd(n, e, t, r, i) {
  return fi(n + e * i, t, r);
}
const Sd = 2;
function Nd(n, e, t, r, i) {
  return fi(n + Math.trunc(e / Sd) * i, t, r);
}
const Td = 3;
function $f({
  value: n,
  min: e,
  max: t,
  fallback: r,
  onCommit: i,
  step: o = 1,
  readOnly: s,
  disabled: l,
  ariaLabel: a,
  className: c,
  title: u,
  placeholder: f,
  theme: d
}) {
  const [h, m] = ne(null), [g, y] = ne(!1), b = k(!1), z = k(null), E = k(null), w = k(null), N = Ie(), M = bo(), F = c === void 0;
  ie(() => () => {
    var S;
    return (S = z.current) == null ? void 0 : S.call(z);
  }, []), rt(() => {
    const S = w.current, O = E.current;
    !F && S && O && (O.style.color = getComputedStyle(S).color);
  }, [F, c]), ie(() => {
    b.current || m(null);
  }, [n]);
  const _ = n ?? r, T = h !== null ? h : n != null ? String(n) : f ? "" : String(r), J = (S) => fi(S, e, t), R = (S) => {
    const O = kd(_, S, e, t, o);
    O !== _ && (b.current && m(String(O)), i(O));
  }, W = (S) => {
    if (l || s || S.pointerType !== "mouse" || S.button !== 0) return;
    const O = S.currentTarget, ee = S.clientY, ae = _;
    let X = ae, re = !1;
    const I = ($) => {
      const Q = ee - $.clientY;
      if (!re) {
        if (Math.abs(Q) < Td) return;
        re = !0, O.blur(), O.style.userSelect = "none";
      }
      const q = Nd(ae, Q, e, t, o);
      q !== X && (X = q, i(q));
    }, P = () => {
      z.current = null, window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P), O.style.userSelect = "", re && O.blur();
    };
    z.current = P, window.addEventListener("pointermove", I), window.addEventListener("pointerup", P), window.addEventListener("pointercancel", P);
  }, H = (S) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": S === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (S === 1 ? _ >= t : _ <= e),
    onPointerDown: (O) => O.preventDefault(),
    onClick: () => R(S)
  }), V = F ? L(22, 30, N) : L(16, 22, N), K = F ? L(14, 18, N) : L(11, 15, N);
  return /* @__PURE__ */ C(
    "span",
    {
      ref: E,
      className: `ui-number ${F ? "ui-number-box" : ""}`,
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ p(
          "input",
          {
            ref: w,
            type: "number",
            "aria-label": a,
            title: u,
            placeholder: f,
            value: T,
            readOnly: s,
            disabled: l,
            className: c ?? "ui-input w-20",
            style: {
              ...F ? { ...M, minHeight: L(30, 38, N) } : {},
              paddingRight: V + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              b.current = !0, y(!0);
            },
            onChange: (S) => {
              const O = S.target.value;
              m(O);
              const ee = parseInt(O, 10);
              O !== "" && !Number.isNaN(ee) && i(J(ee));
            },
            onBlur: () => {
              if (b.current = !1, y(!1), h === null) return;
              const S = parseInt(h, 10);
              Number.isNaN(S) || i(J(S)), m(null);
            },
            onKeyDown: (S) => {
              S.key === "Enter" && S.target.blur(), S.key === "Escape" && (m(null), S.target.blur()), !s && !l && (S.key === "ArrowUp" || S.key === "ArrowDown") && (S.preventDefault(), R(S.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: W
          }
        ),
        /* @__PURE__ */ C("span", { className: "ui-number-steppers", style: { width: V }, children: [
          /* @__PURE__ */ p("button", { ...H(1), className: "ui-number-step", children: /* @__PURE__ */ p(Ws, { style: { width: K, height: K } }) }),
          /* @__PURE__ */ p("button", { ...H(-1), className: "ui-number-step", children: /* @__PURE__ */ p(Cn, { style: { width: K, height: K } }) })
        ] })
      ]
    }
  );
}
function Df({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: c, children: u }) {
  const f = Ie(), d = zt({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = L(14, 16, f), m = { width: h, height: h }, g = L(10, 12, f);
  return /* @__PURE__ */ C("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ C("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: d, children: [
      /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ p(Un, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }) : /* @__PURE__ */ p(Cn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: m }),
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
function $s({
  expanded: n,
  collapsedWidth: e,
  expandedWidth: t,
  trigger: r,
  field: i,
  rootRef: o,
  shrink: s = !1,
  className: l = "",
  style: a,
  ...c
}) {
  return /* @__PURE__ */ C(
    "div",
    {
      ...c,
      ref: o,
      className: `relative inline-flex ${s ? "shrink-0" : ""} ${l}`,
      style: {
        ...a,
        width: n ? t : e,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      children: [
        /* @__PURE__ */ p(
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
function Ed({
  value: n,
  onChange: e,
  triggerLabel: t = "Filter",
  triggerIcon: r,
  placeholder: i = "Filter…",
  collapsedWidth: o = 88,
  expandedWidth: s = 200,
  variant: l = "subtle",
  theme: a,
  active: c = !1,
  autoFocus: u = !1,
  onExpandedChange: f,
  actions: d,
  leadingIcon: h,
  showClear: m = !0,
  onSubmit: g,
  onCancel: y,
  cancelOnEscape: b = !1,
  cancelOnOutside: z = !1,
  className: E = "",
  "aria-label": w
}) {
  const [N, M] = ne(u), F = k(N);
  F.current = N;
  const _ = k(null), T = k(null), J = k(null), R = Zi(), W = oe((I) => {
    F.current !== I && (F.current = I, M(I), f == null || f(I));
  }, [f]), H = oe((I = !1) => {
    var P;
    W(!1), (P = T.current) == null || P.blur(), I && requestAnimationFrame(() => {
      var $;
      return ($ = J.current) == null ? void 0 : $.focus();
    });
  }, [W]), V = oe(() => {
    W(!0), requestAnimationFrame(() => {
      const I = T.current;
      if (!I) return;
      I.focus();
      const P = I.value.length;
      I.setSelectionRange(P, P);
    });
  }, [W]);
  ie(() => {
    u && V();
  }, [u, V]), ie(() => {
    var $;
    if (!N) return;
    const I = (($ = _.current) == null ? void 0 : $.ownerDocument) ?? document, P = (Q) => {
      var le;
      const q = Q.target;
      q && ((le = _.current) != null && le.contains(q) || (z && (y == null || y()), H()));
    };
    return I.addEventListener("pointerdown", P, !0), () => I.removeEventListener("pointerdown", P, !0);
  }, [N, H, z, y]);
  const K = oe((I) => {
    var $;
    if (!N) return;
    const P = I.relatedTarget;
    P && (($ = _.current) != null && $.contains(P)) || (z && (y == null || y()), H());
  }, [N, H, z, y]), S = oe((I) => {
    if (I.key === "Enter" && g) {
      I.preventDefault(), g(n), H(!0);
      return;
    }
    I.key === "Escape" && (I.preventDefault(), I.stopPropagation(), b ? y == null || y() : e(""), H(!0));
  }, [e, H, b, y, g, n]), O = h === void 0 ? r ?? /* @__PURE__ */ p(Lt, { className: "w-3.5 h-3.5" }) : h, X = 8 + (((d == null ? void 0 : d.length) || 0) + (m && n ? 1 : 0)) * (R.box + 2), re = (I) => /* @__PURE__ */ p(
    "span",
    {
      style: { width: R.icon, height: R.icon },
      className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
      children: I
    }
  );
  return /* @__PURE__ */ p(
    $s,
    {
      expanded: N,
      collapsedWidth: o,
      expandedWidth: s,
      rootRef: _,
      shrink: !0,
      "data-morph-search": !0,
      "data-theme": a,
      "data-expanded": N ? "true" : "false",
      className: E,
      onBlur: K,
      trigger: /* @__PURE__ */ p(
        dt,
        {
          ref: J,
          type: "button",
          variant: l,
          size: "minimal",
          theme: a,
          icon: r ?? /* @__PURE__ */ p(Lt, { className: "w-3.5 h-3.5" }),
          active: c,
          onClick: V,
          className: `w-full justify-start ${N ? "pointer-events-none" : ""}`,
          tabIndex: N ? -1 : 0,
          "aria-expanded": N,
          "aria-label": w || t,
          "data-morph-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { className: "min-w-0 truncate", children: t })
        }
      ),
      field: /* @__PURE__ */ C(Ke, { children: [
        O && /* @__PURE__ */ p(
          "span",
          {
            className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
            style: { width: R.icon, height: R.icon },
            children: re(O)
          }
        ),
        /* @__PURE__ */ p(
          "input",
          {
            ref: T,
            value: n,
            onChange: (I) => e(I.target.value),
            onKeyDown: S,
            placeholder: i,
            "aria-label": w || i,
            tabIndex: N ? 0 : -1,
            "data-morph-search-input": !0,
            style: { paddingLeft: O ? R.icon + 16 : 10, paddingRight: X },
            className: `${$r("sm")} w-full`
          }
        ),
        /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
          d == null ? void 0 : d.map((I) => /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": I.label,
              title: I.label,
              tabIndex: N ? 0 : -1,
              onMouseDown: (P) => P.preventDefault(),
              onClick: () => {
                I.onClick(n, { close: () => H(!0) }), I.keepOpen || H(!0);
              },
              style: { width: R.box, height: R.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-action": I.key,
              children: re(I.icon)
            },
            I.key
          )),
          m && n && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              "aria-label": "Clear",
              tabIndex: N ? 0 : -1,
              onClick: () => {
                e(""), requestAnimationFrame(() => {
                  var I;
                  return (I = T.current) == null ? void 0 : I.focus();
                });
              },
              style: { width: R.box, height: R.box },
              className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              "data-morph-search-clear": !0,
              children: /* @__PURE__ */ p(_t, { size: R.icon })
            }
          )
        ] })
      ] })
    }
  );
}
function Of({
  triggerLabel: n,
  triggerIcon: e = /* @__PURE__ */ p(jr, { className: "w-3.5 h-3.5" }),
  fieldIcon: t = null,
  actions: r = [],
  onSubmit: i,
  onCancel: o,
  clearOnSubmit: s = !0,
  clearOnCancel: l = !0,
  onChange: a,
  value: c,
  variant: u = "primary",
  ...f
}) {
  const d = (g) => {
    i == null || i(g), s && a("");
  }, h = () => {
    o == null || o(), l && a("");
  }, m = [
    ...r,
    ...i ? [{
      key: "submit",
      label: "Submit",
      icon: /* @__PURE__ */ p(or, { className: "w-3.5 h-3.5" }),
      onClick: d
    }] : [],
    ...o ? [{
      key: "cancel",
      label: "Cancel",
      icon: /* @__PURE__ */ p(_t, { className: "w-3.5 h-3.5" }),
      onClick: h
    }] : []
  ];
  return /* @__PURE__ */ p(
    Ed,
    {
      ...f,
      value: c,
      onChange: a,
      triggerLabel: n,
      triggerIcon: e,
      leadingIcon: t,
      actions: m,
      showClear: !1,
      variant: u,
      onSubmit: i ? d : void 0,
      onCancel: o ? h : void 0,
      cancelOnEscape: !!o,
      cancelOnOutside: !!o
    }
  );
}
function Cd(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function Md(n, e, t) {
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
    const c = s.find((u) => u.value.toLowerCase().includes(a));
    if (c) {
      const u = c.value.trim();
      return { matched: !0, detail: `${c.label}: ${u.length > 48 ? `${u.slice(0, 47)}…` : u}` };
    }
    if (i.includes(a)) return { matched: !0, detail: n.detail };
  }
  return { matched: !0 };
}
function Rd(n, e, t) {
  const r = Cd(t), i = r.length > 0, o = new Map(e.map((c) => [c.key, c])), s = [];
  for (const c of n) {
    const { matched: u, detail: f } = Md(c, c.group ? o.get(c.group) : void 0, r);
    u && s.push({ item: c, detail: f });
  }
  const l = new Set(s.map((c) => c.item.group).filter(Boolean)), a = i ? e.filter((c) => l.has(c.key) || c.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: a, hasQuery: i };
}
function Ad(n) {
  var s;
  const { hits: e, visibleGroups: t, hasQuery: r } = Rd(n.items, n.groups, n.query), i = [];
  if (n.query.trim(), !r) {
    if (n.browseAll) {
      for (const l of n.items) i.push({ kind: "item", hit: { item: l } });
      return i;
    }
    if (n.browseGroups !== !1)
      for (const l of t) {
        i.push({ kind: "group", group: l });
        const a = ((s = n.expandedGroups) == null ? void 0 : s.has(l.key)) ?? !1;
        if (n.includeGroupItems)
          for (const c of n.items)
            c.group === l.key && i.push({ kind: "item", hit: { item: c }, hidden: !a });
        else if (a)
          for (const c of n.items)
            c.group === l.key && i.push({ kind: "item", hit: { item: c } });
      }
    return i;
  }
  const o = /* @__PURE__ */ new Set();
  for (const l of t) {
    i.push({ kind: "group", group: l }), o.add(l.key);
    for (const a of e)
      a.item.group === l.key && i.push({ kind: "item", hit: a });
  }
  for (const l of e)
    (!l.item.group || !o.has(l.item.group)) && i.push({ kind: "item", hit: l });
  return i.length === 0 && (i.push({ kind: "empty" }), (n.emptyActionLabels || []).forEach((l, a) => {
    i.push({ kind: "action", label: l, actionIndex: a });
  })), i;
}
function Pf({
  items: n,
  groups: e = [],
  mode: t = "expandable",
  triggerLabel: r = "Search",
  triggerIcon: i,
  placeholder: o = "Search…",
  query: s,
  onQueryChange: l,
  onSelect: a,
  onSelectGroup: c,
  onClose: u,
  closeOnSelect: f = !0,
  openOnFocus: d = !0,
  expandableGroups: h = !1,
  browseExpanded: m = !1,
  groupExpandMode: g = "multiple",
  browseAll: y = !1,
  selectedId: b,
  autoFocus: z = !0,
  collapsedWidth: E = 128,
  expandedWidth: w = 288,
  panelWidth: N,
  maxMenuHeight: M = 420,
  theme: F = "light",
  morph: _ = !0,
  emptyTitle: T,
  emptyHint: J,
  renderEmpty: R,
  emptyActions: W,
  leadingActions: H,
  hideLeadingOnEmpty: V = !1,
  footerActions: K,
  fieldActions: S
}) {
  const O = s !== void 0, [ee, ae] = ne(""), X = O ? s : ee, re = oe((x) => {
    O || ae(x), l == null || l(x);
  }, [O, l]), [I, P] = ne(!1), [$, Q] = ne(t === "inline"), q = ut(() => e.map((x) => x.key).join("\0"), [e]), le = ut(() => new Set(q ? q.split("\0") : []), [q]), [se, _e] = ne(() => m ? le : /* @__PURE__ */ new Set()), [D, he] = ne(0), $e = k(!1), ue = oe((x, A = "keyboard") => {
    $e.current = A === "pointer", he(x);
  }, []), De = k(null), Ne = k(null), xe = k(null), be = k(null), ve = k(null), Fe = k(0), we = qr(), tt = un(), Ue = cr(), Nt = Xr(), fn = fo(), Oe = Zi(), Ze = 8 + (((S == null ? void 0 : S.length) || 0) + (X ? 1 : 0)) * (Oe.box + 2), [st, bt] = ne({ top: 0, left: 0, maxH: 288, ready: !1 }), [Yt, mt] = ne(0);
  oo({
    anchorRef: De,
    panelRef: be,
    open: I,
    maxHeight: M,
    anchorRectRef: ve,
    onPosition: (x) => bt({ top: x.top, left: x.left, maxH: x.maxH, ready: x.ready })
  }), ie(() => {
    !I || !De.current || mt(De.current.getBoundingClientRect().width);
  }, [I, $]);
  const Ot = ar({
    visible: I,
    morph: _,
    anchor: () => {
      var x;
      return ((x = De.current) == null ? void 0 : x.getBoundingClientRect()) ?? null;
    },
    ref: be,
    cloneOnUnmount: !0
  }), gt = (W || []).map(
    (x) => typeof x.label == "function" ? x.label(X) : x.label
  ), ke = ut(
    () => Ad({
      items: n,
      groups: e,
      query: X,
      browseGroups: d || m,
      browseAll: y,
      expandedGroups: se,
      emptyActionLabels: gt
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, X, d, m, y, se, gt.join("\0")]
  ), j = ut(
    () => (H || []).map((x, A) => ({
      kind: "action",
      label: typeof x.label == "function" ? x.label(X) : x.label,
      actionIndex: A,
      source: "leading"
    })),
    [H, X]
  ), Z = ut(
    () => (K || []).map((x, A) => ({
      kind: "action",
      label: typeof x.label == "function" ? x.label(X) : x.label,
      actionIndex: A,
      source: "footer"
    })),
    [K, X]
  ), me = ke.some((x) => x.kind === "empty"), He = j.length > 0 && !(V && me), Se = He ? j.length : 0, lt = ut(
    () => [...He ? j : [], ...ke, ...Z],
    [He, j, ke, Z]
  ), Tt = !!c || h && !X.trim(), Et = ut(
    () => lt.map((x, A) => ({ row: x, index: A })).filter((x) => !(x.row.kind === "empty" || x.row.kind === "item" && x.row.hidden || x.row.kind === "group" && !Tt)),
    [lt, Tt]
  ), hn = (h || m) && !X.trim(), Ge = oe(() => {
    var x;
    P(!1), t === "expandable" && ((x = Ne.current) == null || x.blur(), Q(!1), requestAnimationFrame(() => {
      var A;
      return (A = xe.current) == null ? void 0 : A.focus();
    })), re(""), ue(0), _e(m ? le : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, re, m, le]);
  ie(() => {
    if (X.trim() || !m) {
      _e((x) => x.size ? /* @__PURE__ */ new Set() : x);
      return;
    }
    _e((x) => x.size === le.size && [...le].every((A) => x.has(A)) ? x : le);
  }, [X, m, le]);
  const yt = oe((x) => {
    _e((A) => {
      const Y = new Set(A);
      return Y.has(x) ? Y.delete(x) : (g === "single" && Y.clear(), Y.add(x)), Y;
    });
  }, [g]), at = oe(() => {
    var A;
    if (I) {
      (A = Ne.current) == null || A.focus();
      return;
    }
    if (t === "expandable" && !$) {
      const Y = De.current;
      if (Y) {
        const ce = Y.style.transition, Ee = Y.style.width;
        Y.style.transition = "none", Y.style.width = `${w}px`;
        const qe = Y.getBoundingClientRect();
        ve.current = { left: qe.left, top: qe.top, width: qe.width, height: qe.height }, Y.style.width = Ee, Y.offsetWidth, Y.style.transition = ce, window.clearTimeout(Fe.current), Fe.current = window.setTimeout(() => {
          ve.current = null;
        }, jt + 80);
      }
    }
    Q(!0), P(!0);
    const x = b ? ke.findIndex((Y) => Y.kind === "item" && Y.hit.item.id === b) : -1;
    ue(x >= 0 ? Se + x : Se);
  }, [I, t, $, w, Se, ke, b]);
  ie(() => () => {
    window.clearTimeout(Fe.current), ve.current = null;
  }, []), ie(() => {
    if (t !== "expandable" || !$ || !I || !z) return;
    const x = requestAnimationFrame(() => {
      var A;
      return (A = Ne.current) == null ? void 0 : A.focus();
    });
    return () => cancelAnimationFrame(x);
  }, [t, $, I, z]), ie(() => {
    var Y;
    if (!I) return;
    const x = ((Y = De.current) == null ? void 0 : Y.ownerDocument) ?? we;
    if (!x) return;
    const A = (ce) => {
      var qe, xt;
      const Ee = ce.target;
      Ee && ((qe = De.current) != null && qe.contains(Ee) || (xt = be.current) != null && xt.contains(Ee) || Ge());
    };
    return x.addEventListener("pointerdown", A, !0), () => x.removeEventListener("pointerdown", A, !0);
  }, [I, Ge, we]);
  const Pt = oe((x) => {
    if (x.kind === "group") {
      c ? (c(x.group), f && Ge()) : Tt && yt(x.group.key);
      return;
    }
    if (x.kind === "item") {
      a(x.hit.item), f && Ge();
      return;
    }
    if (x.kind === "action") {
      const A = x.source === "leading" ? H : x.source === "footer" ? K : W, Y = A == null ? void 0 : A[x.actionIndex];
      Y && Y.onClick(X), f && Ge();
    }
  }, [Ge, f, W, K, Tt, H, a, c, X, yt]), In = (x) => {
    if (Et.length === 0) return;
    const A = Et.findIndex((ce) => ce.index === D), Y = A < 0 ? 0 : (A + x + Et.length) % Et.length;
    ue(Et[Y].index);
  }, zn = (x) => {
    if (x.key === "ArrowDown")
      x.preventDefault(), I ? In(1) : at();
    else if (x.key === "ArrowUp")
      x.preventDefault(), In(-1);
    else if ((x.key === "ArrowRight" || x.key === "ArrowLeft") && h && I && !X.trim()) {
      const A = lt[D];
      if ((A == null ? void 0 : A.kind) === "group") {
        const Y = se.has(A.group.key);
        (x.key === "ArrowRight" || Y) && (x.preventDefault(), yt(A.group.key));
      } else if ((A == null ? void 0 : A.kind) === "item" && x.key === "ArrowLeft" && A.hit.item.group) {
        x.preventDefault();
        const Y = A.hit.item.group;
        se.has(Y) && yt(Y);
        const ce = lt.findIndex((Ee) => Ee.kind === "group" && Ee.group.key === Y);
        ce >= 0 && ue(ce);
      }
    } else if (x.key === "Enter") {
      x.preventDefault();
      const A = lt[D] ?? lt[0];
      A && Pt(A);
    } else x.key === "Escape" && (x.preventDefault(), Ge());
  }, pn = (x) => {
    t === "expandable" && !$ || (re(x), I || P(!0));
  };
  ie(() => {
    const x = ke.findIndex((A) => A.kind === "item");
    ue(x >= 0 ? Se + x : Se);
  }, [X]);
  const $n = (x) => /* @__PURE__ */ C("span", { className: "absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5", children: [
    S == null ? void 0 : S.map((A) => /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": A.label,
        title: A.label,
        tabIndex: $ ? 0 : -1,
        onMouseDown: (Y) => Y.preventDefault(),
        onClick: () => {
          A.onClick(X, { close: Ge }), A.keepOpen || Ge();
        },
        style: { width: Oe.box, height: Oe.box },
        className: "flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
        "data-search-field-action": A.key,
        children: /* @__PURE__ */ p(
          "span",
          {
            style: { width: Oe.icon, height: Oe.icon },
            className: "flex items-center justify-center [&>svg]:w-full [&>svg]:h-full",
            children: A.icon
          }
        )
      },
      A.key
    )),
    X && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        tabIndex: $ ? 0 : -1,
        onPointerDown: (A) => A.preventDefault(),
        onClick: x,
        style: { width: Oe.box, height: Oe.box },
        className: "ui-icon-btn flex items-center justify-center rounded",
        children: /* @__PURE__ */ p(_t, { size: Oe.icon })
      }
    )
  ] }), v = /* @__PURE__ */ C("div", { className: "relative w-full", children: [
    /* @__PURE__ */ p(Lt, { size: Oe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: Ne,
        value: X,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": I,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (x) => pn(x.target.value),
        onFocus: () => {
          d && at();
        },
        onClick: () => {
          d && at();
        },
        onKeyDown: zn,
        placeholder: o,
        style: { paddingRight: Ze },
        className: `${$r("sm")} w-full pl-8`
      }
    ),
    $n(() => {
      re(""), I || at();
    })
  ] }), G = /* @__PURE__ */ C("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ p(Lt, { size: Oe.icon, className: "ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ p(
      "input",
      {
        ref: Ne,
        value: X,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": I,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (x) => pn(x.target.value),
        onFocus: () => {
          d && $ && at();
        },
        onClick: () => {
          d && $ && at();
        },
        onKeyDown: zn,
        placeholder: o,
        tabIndex: $ ? 0 : -1,
        style: { paddingRight: Ze },
        className: `${$r("sm")} h-full w-full pl-8`
      }
    ),
    $n(() => {
      re(""), !I && $ && at();
    })
  ] });
  ie(() => {
    if (!I || $e.current) return;
    const x = be.current;
    sn(
      x == null ? void 0 : x.querySelector(`[data-search-row="${D}"]`),
      "nearest",
      (x == null ? void 0 : x.querySelector("[data-search-scroller]")) ?? null
    );
  }, [I, D]);
  const te = k(ke);
  te.current = ke;
  const de = k(b);
  de.current = b;
  const fe = co({
    open: I,
    block: "center",
    ready: st.ready,
    scroller: () => {
      var x;
      return ((x = be.current) == null ? void 0 : x.querySelector("[data-search-scroller]")) ?? null;
    },
    row: () => {
      var Y;
      const x = de.current;
      if (!x) return null;
      const A = te.current.findIndex((ce) => ce.kind === "item" && ce.hit.item.id === x);
      return A < 0 ? null : ((Y = be.current) == null ? void 0 : Y.querySelector(`[data-search-row="${A}"]`)) ?? null;
    }
  }), ge = (x, A) => {
    const Y = D === A, ce = b !== void 0 && x.hit.item.id === b;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": ce,
        tabIndex: -1,
        "data-search-item": x.hit.item.id,
        "data-search-row": A,
        onMouseDown: (Ee) => Ee.preventDefault(),
        onMouseEnter: () => ue(A, "pointer"),
        onClick: () => Pt(x),
        style: Nt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ue.itemDefault} ${ce ? "ui-item-selected" : ""} ${Y ? "ui-item-highlighted" : ""} ${x.hit.item.disabled ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          x.hit.item.icon && /* @__PURE__ */ p("span", { className: `${Ue.icon} shrink-0`, children: x.hit.item.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.hit.item.label }),
          (x.hit.detail || x.hit.item.detail) && /* @__PURE__ */ p("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: x.hit.detail || x.hit.item.detail }),
          ce && /* @__PURE__ */ p(or, { className: "ui-icon w-3.5 h-3.5 shrink-0", "aria-hidden": !0 })
        ]
      },
      `item:${x.hit.item.id}`
    );
  }, Re = (x, A) => {
    const Y = se.has(x.group.key), ce = h && !X.trim(), Ee = Tt, qe = Ee && D === A, xt = x.group.count !== void 0 && /* @__PURE__ */ p("span", { className: `shrink-0 tabular-nums ${Ee ? "text-[10px] text-zinc-400" : "opacity-70"}`, children: x.group.count });
    return Ee ? /* @__PURE__ */ C(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": ce ? Y : void 0,
        "data-search-group": x.group.key,
        onMouseEnter: () => ue(A, "pointer"),
        style: Nt,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${Ue.itemDefault} ${qe ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ C(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (Ct) => Ct.preventDefault(),
              onClick: () => Pt(x),
              className: "flex min-w-0 flex-1 items-center gap-2 text-left",
              children: [
                x.group.icon && /* @__PURE__ */ p("span", { className: `${Ue.icon} shrink-0`, children: x.group.icon }),
                /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.group.label }),
                xt
              ]
            }
          ),
          ce && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${Y ? "Collapse" : "Expand"} ${x.group.label}`,
              "aria-expanded": Y,
              onMouseDown: (Ct) => Ct.preventDefault(),
              onClick: (Ct) => {
                Ct.stopPropagation(), yt(x.group.key);
              },
              style: { width: Oe.box, height: Oe.box },
              className: "shrink-0 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ p(
                Cn,
                {
                  size: Oe.icon,
                  className: `transition-transform duration-200 ${Y ? "rotate-180" : ""}`
                }
              )
            }
          )
        ]
      },
      `group:${x.group.key}`
    ) : /* @__PURE__ */ C(
      "div",
      {
        role: "presentation",
        "data-search-group": x.group.key,
        "data-search-row": A,
        style: fn,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          x.group.icon && /* @__PURE__ */ p("span", { className: `${Ue.icon} shrink-0`, children: x.group.icon }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.group.label }),
          xt
        ]
      },
      `group:${x.group.key}`
    );
  }, Te = (x, A) => {
    var Ee;
    const Y = D === A, ce = x.source === "leading" ? H : x.source === "footer" ? K : W;
    return /* @__PURE__ */ C(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": x.source || "empty",
        "data-search-row": A,
        onMouseEnter: () => ue(A, "pointer"),
        onClick: () => Pt(x),
        style: Nt,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${Ue.itemDefault} ${Y ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ p("span", { className: `${Ue.icon} shrink-0`, children: ((Ee = ce == null ? void 0 : ce[x.actionIndex]) == null ? void 0 : Ee.icon) || /* @__PURE__ */ p(jr, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ p("span", { className: "flex-1 truncate", children: x.label })
        ]
      },
      `${x.source || "empty"}:${x.actionIndex}`
    );
  }, je = () => /* @__PURE__ */ p("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: R ? R({ query: X, close: Ge }) : /* @__PURE__ */ C(Ke, { children: [
    /* @__PURE__ */ p("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ p(Lt, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ p("div", { className: "text-xs font-medium text-zinc-500", children: T || `No matches for “${X.trim()}”` }),
    /* @__PURE__ */ p("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: J || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), ct = [];
  for (let x = 0; x < ke.length; x++) {
    const A = ke[x];
    if (A.kind === "group") {
      const Y = [];
      let ce = x + 1;
      for (; ce < ke.length && ke[ce].kind === "item" && ke[ce].hit.item.group === A.group.key; )
        Y.push({ row: ke[ce], index: ce }), ce++;
      ct.push({ group: A, index: x, items: Y }), x = ce - 1;
    } else A.kind === "item" ? ct.push({ row: A, index: x }) : ct.push({ row: A, index: x });
  }
  const Xe = I ? sr(
    /* @__PURE__ */ C(
      "div",
      {
        ref: Ot,
        id: "search-menu-panel",
        "data-theme": F,
        role: "listbox",
        "aria-label": o,
        onPointerEnter: fe.engage,
        onPointerDown: fe.engage,
        className: "ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden",
        style: {
          position: "fixed",
          left: st.left,
          top: st.top,
          width: N ?? (t === "expandable" ? w : Yt || void 0),
          maxHeight: st.maxH,
          visibility: st.ready ? "visible" : "hidden"
        },
        children: [
          He && /* @__PURE__ */ C("div", { className: "shrink-0 pb-1", children: [
            j.map((x, A) => Te(x, A)),
            ke.length > 0 && /* @__PURE__ */ p("div", { className: Ue.separator })
          ] }),
          /* @__PURE__ */ C("div", { "data-search-scroller": !0, className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            ke.length === 0 && /* @__PURE__ */ p("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: R ? R({ query: X, close: Ge }) : /* @__PURE__ */ p(Ke, { children: "Type to search…" }) }),
            ct.map((x) => {
              if (x.group) {
                const ce = se.has(x.group.group.key), Ee = x.items || [];
                return /* @__PURE__ */ C(Pe.Fragment, { children: [
                  Re(x.group, Se + x.index),
                  hn && /* @__PURE__ */ p(
                    "div",
                    {
                      "data-search-group-items": x.group.group.key,
                      "aria-hidden": !ce,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: ce ? "1fr" : "0fr",
                        opacity: ce ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ p("div", { className: "overflow-hidden flex flex-col", children: Ee.map((qe) => ge(qe.row, Se + qe.index)) })
                    }
                  ),
                  !hn && Ee.map((qe) => ge(qe.row, Se + qe.index))
                ] }, `group:${x.group.group.key}`);
              }
              const A = x.row, Y = Se + x.index;
              return A.kind === "empty" ? je() : A.kind === "action" ? Te(A, Y) : A.kind === "item" ? ge(A, Y) : null;
            })
          ] }),
          Z.length > 0 && /* @__PURE__ */ C("div", { className: "shrink-0", children: [
            /* @__PURE__ */ p("div", { className: Ue.separator }),
            Z.map((x, A) => Te(x, Se + ke.length + A))
          ] })
        ]
      }
    ),
    tt ?? (we == null ? void 0 : we.body) ?? document.body
  ) : null;
  return t === "inline" ? /* @__PURE__ */ C("div", { ref: De, "data-search-menu": !0, "data-mode": t, className: "relative inline-flex", style: { width: "100%" }, children: [
    v,
    Xe
  ] }) : /* @__PURE__ */ p(
    $s,
    {
      expanded: $,
      collapsedWidth: E,
      expandedWidth: w,
      rootRef: De,
      "data-search-menu": !0,
      "data-mode": t,
      trigger: /* @__PURE__ */ p(
        dt,
        {
          ref: xe,
          type: "button",
          variant: "primary",
          size: "minimal",
          theme: F === "dark" ? "dark" : "light",
          icon: i ?? /* @__PURE__ */ p(Lt, { className: "w-3.5 h-3.5" }),
          onClick: at,
          className: `w-full justify-start ${$ ? "pointer-events-none" : ""}`,
          tabIndex: $ ? -1 : 0,
          "data-search-trigger": !0,
          children: /* @__PURE__ */ p("span", { children: r })
        }
      ),
      field: /* @__PURE__ */ C(Ke, { children: [
        G,
        Xe
      ] })
    }
  );
}
export {
  dt as Button,
  Df as CardSection,
  xo as CheckMark,
  Dl as Checkbox,
  gf as Checklist,
  Cf as ChromeHeader,
  Ef as ContentRow,
  nf as ContextMenu,
  of as ContextMenuDivider,
  rf as ContextMenuItem,
  sf as ContextMenuSub,
  io as DROPDOWN_MAX_HEIGHT,
  mf as DatePicker,
  cf as DialogProvider,
  Cl as DropdownItem,
  dr as DropdownMenu,
  Ml as DropdownSubmenu,
  Gr as DropdownThemeContext,
  xd as FONTS,
  xf as FloatingChrome,
  pf as FloatingToggle,
  vd as FontMenu,
  zf as FormatToolbar,
  ze as IS_COARSE,
  hl as IS_TOUCH_CAPABLE,
  tf as ItemManagerDropdown,
  df as LongPressMenuProvider,
  Jr as MORPH_EASE,
  jt as MORPH_MS,
  Kr as MORPH_OPACITY_MS,
  An as MenuHighlightContext,
  po as MenuSearchContext,
  Al as Modal,
  lf as ModalFooter,
  Pn as ModalFooterButton,
  Of as MorphActionField,
  Ed as MorphSearchField,
  $f as NumberInput,
  fl as PopoutWindowContext,
  If as RICH_TEXT_STATE_IDLE,
  yf as RadioList,
  yd as RichTextEditor,
  Sd as SCRUB_PX_PER_STEP,
  Pf as SearchMenu,
  Tf as SectionHeader,
  Nf as Seg,
  Mf as StructureControls,
  Qr as SubmenuContext,
  hf as TAB_PILL,
  ta as TB_BTN,
  Ln as TB_BTN_ICON,
  na as TB_DANGER,
  wo as TB_DIVIDER,
  ra as TB_INPUT,
  Sf as TB_NUM,
  oa as TB_PICKER,
  bf as TB_ROW_LABEL,
  ia as TB_SEG,
  vf as TB_TOGGLE,
  kf as TB_TOGGLE_OFF,
  wf as TB_TOGGLE_ON,
  ql as TabFace,
  Zd as ThemeProvider,
  ef as ThemeScope,
  cd as Token,
  ad as TokenChipView,
  Bn as ToolButton,
  Xt as Tooltip,
  Vr as ZOOM_FROM,
  Ad as buildSearchMenuRows,
  wl as buttonCloudOf,
  fi as clampNumber,
  yl as cloneOverlayClose,
  L as coarsePx,
  Af as escapeHtml,
  Qi as getCoarseScale,
  cr as getDropdownClasses,
  Xd as getHardwareKeyboard,
  Gd as getLastPointerType,
  $r as inputCls,
  Hl as isInteractiveElement,
  Ar as isTouchLike,
  Md as matchSearchItem,
  ao as menuAttributesOf,
  bl as menuThemeOf,
  no as nearestOverlayOrigin,
  Is as normalizeSpaces,
  yr as overlayMorphEnabled,
  Cd as parseSearchTags,
  gl as playOverlayClose,
  ml as playOverlayOpen,
  Wi as preprocessTokenHtml,
  sn as revealRowInScroller,
  od as sanitizeRichText,
  Nd as scrubbedValue,
  Rd as searchMenuContent,
  vl as segModeOf,
  Yd as setCoarseScale,
  kd as steppedValue,
  Rf as stripRichText,
  sd as stripTokenWrappers,
  Ud as useCoarse,
  Ie as useCoarseScale,
  zt as useCoarseSize,
  qr as useCurrentDocument,
  Mn as useCurrentWindow,
  af as useDialog,
  oo as useDropdownPosition,
  uo as useDropdownTheme,
  Qd as useHardwareKeyboard,
  bo as useInputSize,
  Xr as useItemSize,
  St as useKitTheme,
  pl as useLastPointerType,
  uf as useLongPressOptOut,
  Zr as useMenuHighlight,
  Tl as useMenuSearch,
  ar as useOverlayMorph,
  Wr as usePopoutWindow,
  un as usePortalTarget,
  co as useRevealRowOnOpen,
  ea as useSlidingPill,
  ff as useTouchMode
};
