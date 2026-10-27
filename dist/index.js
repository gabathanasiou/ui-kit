"use client";
import { jsx as m, jsxs as R, Fragment as Ke } from "react/jsx-runtime";
import Re, { createContext as It, useContext as zt, useState as te, useEffect as ne, useRef as S, useCallback as oe, useLayoutEffect as it, useMemo as nt, useImperativeHandle as As } from "react";
import * as me from "@radix-ui/react-dropdown-menu";
import { Search as St, X as Et, Check as Lr, Pencil as Is, Copy as qi, Trash2 as Sr, RotateCcw as Ji, Plus as Ki, ChevronRight as Wn, ChevronLeft as zs, ArrowUp as $s, ArrowDown as Ds, ChevronDown as xn, Underline as Os, Strikethrough as Ls, RemoveFormatting as Ps, Link as Bs, ChevronUp as Fs } from "lucide-react";
import { computePosition as Hs, offset as Vi, flip as Yi, shift as Ui, size as _s, useFloating as Ws, autoUpdate as js } from "@floating-ui/react-dom";
import * as pt from "@radix-ui/react-dialog";
import { createPortal as Qn } from "react-dom";
import { mergeAttributes as qs, ReactNodeViewRenderer as Js, NodeViewWrapper as Ks, useEditor as Vs, EditorContent as Ys } from "@tiptap/react";
import { PluginKey as lt, Plugin as dt, Selection as Kt, TextSelection as Qe, NodeSelection as Xt, AllSelection as Us } from "@tiptap/pm/state";
import { DecorationSet as En, Decoration as Xs } from "@tiptap/pm/view";
import Gs from "@tiptap/starter-kit";
import Qs from "@tiptap/extension-placeholder";
import { TextStyle as Zs, FontFamily as el, FontSize as tl } from "@tiptap/extension-text-style";
import nl from "@tiptap/extension-color";
import rl from "@tiptap/extension-link";
import il from "@tiptap/extension-underline";
import ol from "@tiptap/suggestion";
import { Mention as sl } from "@tiptap/extension-mention";
import { createRoot as ll } from "react-dom/client";
const al = It(null);
function Pr() {
  return zt(al);
}
function en() {
  const n = Pr();
  return n ? n.document.body : null;
}
function Br() {
  const n = Pr();
  return n ? n.document : typeof document < "u" ? document : null;
}
function bn() {
  return Pr() ?? (typeof window < "u" ? window : null);
}
const vn = typeof window < "u", ze = vn && window.matchMedia("(pointer: coarse)").matches, cl = vn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Zn = 0.5;
const dn = /* @__PURE__ */ new Set();
function Wd(n) {
  Zn = Math.max(0, Math.min(1, n)), dn.forEach((e) => e());
}
function Xi() {
  return Zn;
}
function jd() {
  const [, n] = te(0);
  return ne(() => {
    const e = () => n((t) => t + 1);
    return dn.add(e), () => {
      dn.delete(e);
    };
  }, []), ze && Zn > 0;
}
function Te() {
  const [, n] = te(0);
  return ne(() => {
    const e = () => n((t) => t + 1);
    return dn.add(e), () => {
      dn.delete(e);
    };
  }, []), Zn;
}
function L(n, e, t) {
  return ze ? Math.round(n + (e - n) * t) : n;
}
function xt(n, e) {
  const t = Te();
  return ze && t > 0 ? {
    padding: `${L(n.py, e.py, t)}px ${L(n.px, e.px, t)}px`,
    fontSize: `${L(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Nr(n) {
  return n === "touch" || n === "pen";
}
let Jt = null;
const Tr = /* @__PURE__ */ new Set();
vn && window.addEventListener("pointerdown", (n) => {
  Jt = n.pointerType, Tr.forEach((e) => e());
}, !0);
function qd() {
  return Jt;
}
function ul() {
  const [, n] = te(0), e = S(Jt);
  return ne(() => {
    const t = () => {
      e.current !== Jt && (e.current = Jt, n((r) => r + 1));
    };
    return Tr.add(t), () => {
      Tr.delete(t);
    };
  }, []), Jt;
}
const Gi = ["(any-hover: hover)", "(any-pointer: fine)"];
function Qi() {
  return vn ? Gi.some((n) => window.matchMedia(n).matches) : !1;
}
let jn = Qi();
const Cr = /* @__PURE__ */ new Set();
function di(n) {
  jn !== n && (jn = n, Cr.forEach((e) => e()));
}
var ji;
if (vn) {
  const n = () => di(Qi());
  for (const s of Gi) {
    const l = window.matchMedia(s);
    (ji = l.addEventListener) == null || ji.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || di(!0));
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
function Jd() {
  return jn;
}
function Kd() {
  const [, n] = te(0);
  return ne(() => {
    const e = () => n((t) => t + 1);
    return Cr.add(e), () => {
      Cr.delete(e);
    };
  }, []), jn;
}
const Mt = 220, Fr = "cubic-bezier(0.32, 0.72, 0, 1)", Hr = 170, _r = 0.94;
function dr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Zi(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function eo(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Zi({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function dl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${_r})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = eo(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Mt}ms ${Fr}, opacity ${Hr}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Mt + 60);
    });
  });
}
function fl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = eo(e, t);
  e.style.transition = `transform ${Mt}ms ${Fr}, opacity ${Hr}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${_r})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Mt + 60);
}
function hl(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Zi({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Mt}ms ${Fr}, opacity ${Hr}ms ease`, r.style.transform = `scale(${_r})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Mt + 60));
    });
  });
}
function er(n) {
  const e = S(null), [t, r] = te(!1), i = S(null), o = S(0), s = oe((p) => {
    if (n.ref && (n.ref.current = p), p) {
      o.current = 0, e.current = p;
      const v = p.getBoundingClientRect();
      (v.width > 0 || v.height > 0) && (i.current = { left: v.left, top: v.top, width: v.width, height: v.height }), r(!0);
      return;
    }
    const g = e.current, x = ++o.current;
    queueMicrotask(() => {
      x === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && dr(d.current) && hl(g, u.current, i.current));
    });
  }, []), l = oe(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), a = S(n.visible);
  a.current = n.visible;
  const c = S(n.visible), u = S(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const f = S(n.onClosed);
  f.current = n.onClosed;
  const d = S(n.morph !== !1);
  d.current = n.morph !== !1;
  const h = S(0);
  return it(() => {
    if (!t || !a.current || !dr(d.current)) return;
    const p = e.current;
    p && dl(h, p, u.current);
  }, [t, n.visible]), ne(() => {
    if (!t || !a.current) return;
    let p = 0;
    const g = () => {
      p = 0, l(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [t, l]), it(() => {
    var x;
    const p = c.current;
    if (c.current = n.visible, n.visible || !p) return;
    const g = e.current;
    if (!g || !dr(d.current)) {
      (x = f.current) == null || x.call(f);
      return;
    }
    fl(h, g, u.current, () => {
      var v;
      return (v = f.current) == null ? void 0 : v.call(f);
    });
  }, [n.visible]), ne(() => {
    if (!t || !a.current) return;
    const p = (g) => {
      const x = e.current;
      x && x.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [t]), ne(() => {
    if (!t || !a.current) return;
    const p = (g) => {
      const x = e.current;
      x && x.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [t]), s;
}
const to = 384;
function pl(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function no({
  anchorRef: n,
  panelRef: e,
  open: t,
  contentRef: r,
  gap: i = 4,
  padding: o = 8,
  maxHeight: s,
  minHeight: l = 32,
  onPosition: a
}) {
  const c = bn(), u = S(c);
  u.current = c;
  const f = S(a);
  f.current = a, it(() => {
    if (!t) return;
    let d = 0, h = !1;
    const p = () => {
      d || (d = requestAnimationFrame(g));
    }, g = () => {
      if (d = 0, h) return;
      const E = u.current, C = n.current, D = e.current;
      if (!E || !C || !D || !D.isConnected) return;
      const W = (r == null ? void 0 : r.current) ?? D, w = pl(E), F = s ?? to, I = Math.min(l, F), j = Math.max(0, D.offsetHeight - W.offsetHeight), H = Math.max(I, Math.ceil(W.scrollHeight + j)), V = Math.min(H, F);
      D.style.maxHeight = `${V}px`;
      let K = V;
      Hs(C, D, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Vi(i),
          Yi({ boundary: w, padding: o, fallbackStrategy: "bestFit" }),
          Ui({ boundary: w, padding: o, mainAxis: !1 }),
          _s({
            boundary: w,
            padding: o,
            apply({ availableHeight: N }) {
              K = Math.max(I, Math.floor(Math.min(F, N))), D.style.maxHeight = `${K}px`;
            }
          })
        ]
      }).then(({ x: N, y: J, placement: Q }) => {
        h || f.current({
          top: Math.round(J),
          left: Math.round(N),
          maxH: K,
          side: Q.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    g();
    const x = u.current, v = (x == null ? void 0 : x.document) ?? null, M = (x == null ? void 0 : x.visualViewport) ?? null, T = () => p();
    M == null || M.addEventListener("resize", T), M == null || M.addEventListener("scroll", T), x == null || x.addEventListener("resize", T), v == null || v.addEventListener("scroll", T, { capture: !0, passive: !0 });
    let k = null;
    return typeof ResizeObserver < "u" && (k = new ResizeObserver(T), n.current && k.observe(n.current), e.current && k.observe(e.current), r != null && r.current && k.observe(r.current)), () => {
      h = !0, d && cancelAnimationFrame(d), M == null || M.removeEventListener("resize", T), M == null || M.removeEventListener("scroll", T), x == null || x.removeEventListener("resize", T), v == null || v.removeEventListener("scroll", T, { capture: !0 }), k == null || k.disconnect();
    };
  }, [t, n, e, r, i, o, s, l]);
}
let _t = null;
function ro(n) {
  return _t == null || _t(), _t = n, () => {
    _t === n && (_t = null);
  };
}
const io = It(null);
function Wr(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function jr({ theme: n, children: e }) {
  return /* @__PURE__ */ m(io.Provider, { value: n, children: e });
}
function Vd({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = ft();
  return /* @__PURE__ */ m(jr, { theme: Wr({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Yd({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = ft(), a = Wr({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ m(jr, { theme: a, children: /* @__PURE__ */ m(
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
function ft() {
  return zt(io);
}
function ml(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function oo(n, e) {
  if (n) return { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = ml(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function gl(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function yl(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
const qr = It("dark"), so = () => zt(qr);
function Jr() {
  const n = Te();
  return {
    padding: `${L(8, 12, n)}px ${L(12, 16, n)}px`,
    fontSize: `${L(12, 14, n)}px`,
    lineHeight: `${L(18, 22, n)}px`
  };
}
function lo() {
  const n = Te();
  return {
    padding: `${L(6, 9, n)}px ${L(12, 16, n)}px ${L(2, 3, n)}px`,
    fontSize: `${L(10, 11, n)}px`,
    lineHeight: `${L(14, 16, n)}px`
  };
}
const xl = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", fi = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", bl = (n) => n ? "text-xs" : "text-[10px]";
function tr(n) {
  const e = ze && Xi() > 0;
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
    headerPad: fi(e),
    headerText: `${fi(e)} font-semibold uppercase tracking-wider ${bl(e)} ui-label`,
    // Item padding
    itemPad: xl(e),
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
function ao(n) {
  const e = [];
  return Re.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Re.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Kr = It({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), wn = It(null), Vr = () => zt(wn), co = It({ query: "", setQuery: () => {
} }), vl = () => zt(co), wl = () => !0;
function nr(n) {
  const e = S([]), [t, r] = te(-1), [i, o] = te(!1), [s, l] = te(0), a = oe((d) => (e.current = [...e.current, d], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== d), l((h) => h + 1);
  }), []), c = oe((d, h) => {
    r(d), o(h === "pointer");
  }, []), u = oe(() => {
    o((d) => d && (r(-1), !1));
  }, []);
  return nt(() => ({
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
function uo(n) {
  const e = Vr(), t = S(e);
  t.current = e;
  const r = S(null);
  ne(() => {
    var a, c;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0 };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Yr(n, e, t, r) {
  const i = S(-1);
  i.current = e.highlightedIndex;
  const o = S(e);
  o.current = e;
  const s = S(n);
  s.current = n;
  const l = S(r);
  l.current = r;
  const a = S({ text: "", time: 0 }), c = S(!1);
  c.current || (c.current = !0, t.current = (u) => {
    var p, g, x, v, M;
    if (!s.current) return;
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const T = (g = (p = l.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : g.call(p, u);
      (!!((x = l.current) != null && x.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), T && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = u.key === "ArrowDown" ? 1 : -1, k = (i.current + T + h.length) % h.length;
        o.current.setHighlighted(k, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = i.current;
        T >= 0 && T < h.length && h[T].submenu && h[T].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (M = (v = l.current) == null ? void 0 : v.onCloseSub) == null || M.call(v);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = i.current;
        T >= 0 && T < h.length && h[T].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = Date.now(), k = (T - a.current.time > 500 ? "" : a.current.text) + u.key.toLowerCase();
        if (a.current = { text: k, time: T }, !k) return;
        const E = i.current + 1;
        for (let C = 0; C < h.length; C++) {
          const D = (E + C) % h.length;
          if (h[D].label.toLowerCase().startsWith(k)) {
            o.current.setHighlighted(D, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Ur(n, e, t, r, i, o, s) {
  const l = S(e);
  l.current = e;
  const a = S(n);
  a.current = n;
  const c = S(i);
  c.current = i;
  const u = S(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const f = S(!1);
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
function Xr(n, e) {
  const t = S(n);
  t.current = n;
  const r = S(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function rr({
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
  searchFilter: p,
  searchValue: g,
  onSearchValueChange: x
}) {
  const v = ft(), M = oo(s, v), T = M.theme, [k, E] = te([]), [C, D] = te(null), W = en(), w = Br(), F = S(null), I = S(null), j = S(n);
  j.current = n;
  const [H, V] = te(n), [K, N] = te(""), J = d && g !== void 0, Q = J ? g : K, Z = J ? x ?? (() => {
  }) : N, [le, G] = te(!1), _ = J && !le ? "" : Q, q = S(null), X = Te(), z = {
    padding: `${L(8, 12, X)}px ${L(12, 16, X)}px`,
    fontSize: `${L(12, 14, X)}px`
  }, [ee, we] = te(0), ae = d && !J;
  ne(() => {
    var ye;
    if (!ae || !n) return;
    const P = (ye = I.current) == null ? void 0 : ye.querySelector("[data-menu-items]");
    if (!P) return;
    const U = () => we(P.offsetWidth - P.clientWidth);
    U();
    const fe = new ResizeObserver(U);
    return fe.observe(P), () => fe.disconnect();
  }, [n, ae, Q]);
  const Ce = nt(() => {
    if (!d) return;
    const P = _.trim().toLowerCase();
    return P ? (U) => {
      var fe;
      return p ? p(P, U.label, U.group) : U.label.toLowerCase().includes(P) || (((fe = U.group) == null ? void 0 : fe.toLowerCase().includes(P)) ?? !1);
    } : wl;
  }, [_, d, p]), $ = nr(Ce);
  ne(() => {
    if (n)
      return V(!0), J || N(""), G(!1), $.setHighlighted(f ?? -1, "keyboard"), ro(() => {
        t == null || t(!1), e == null || e();
      });
    E([]), G(!1);
  }, [n, f, t, e]), ne(() => {
    if (!n || !w) return;
    const P = (U) => {
      if (U.pointerType !== "touch") return;
      const fe = U.target;
      fe && (I.current && I.current.contains(fe) || F.current && F.current.contains(fe) || fe instanceof Element && fe.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return w.addEventListener("pointerdown", P, { capture: !0 }), () => w.removeEventListener("pointerdown", P, { capture: !0 });
  }, [n, w, t, e]);
  const se = oe(() => {
    const P = F.current;
    if (!P) return null;
    const U = P.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), Ee = er({
    visible: n,
    morph: a,
    anchor: se,
    onClosed: () => V(!1)
  }), de = S(() => {
  }), je = S(() => {
  }), ce = S(() => {
  }), Se = oe((P) => {
    if (P.key === "Enter") {
      const U = $.highlightedIndex, fe = $.items[U >= 0 ? U : 0];
      return fe == null || fe.activate(), !0;
    }
    return P.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [$, t, e]);
  Yr(n && k.length === 0, $, de, { onFieldKey: Se }), Xr(n, je), Ur(n, $, de, I, k.length > 0, ce, { ignoreFields: J });
  const ue = S(null), $e = oe((P) => {
    var U;
    if (P) {
      P.addEventListener("keydown", de.current, { capture: !0 }), P.addEventListener("wheel", je.current, { passive: !1 });
      const fe = P.ownerDocument;
      ue.current = fe, fe.addEventListener("keydown", ce.current, { capture: !0 }), Lt(!0);
    } else
      (U = ue.current) == null || U.removeEventListener("keydown", ce.current, { capture: !0 }), ue.current = null, Lt(!1);
    I.current = P, Ee(P);
  }, [Ee]), [ve, De] = te({ top: 0, left: 0, maxH: to, side: "bottom", ready: !1 }), [vt, Dt] = te(0), [Ot, Lt] = te(!1);
  ne(() => {
    n && F.current && Dt(F.current.getBoundingClientRect().width);
  }, [n]), no({
    anchorRef: F,
    panelRef: I,
    open: n && Ot,
    maxHeight: u,
    onPosition: De
  }), ne(() => {
    var P;
    if (ve.ready && n) {
      if (d) {
        (P = q.current ?? F.current) == null || P.focus();
        return;
      }
      const U = I.current;
      U && U.ownerDocument.activeElement !== U && !U.contains(U.ownerDocument.activeElement) && U.focus();
    }
  }, [ve.ready, n, d]), ne(() => {
    if (!n || !d) return;
    if ($.items.length === 0) {
      $.highlightedIndex !== -1 && $.setHighlighted(-1, "keyboard");
      return;
    }
    const P = $.highlightedIndex;
    (P < 0 || P >= $.items.length) && $.setHighlighted(0, "keyboard");
  }, [n, Q, d, $.items.length]), it(() => {
    var U;
    if (!n || $.highlightedIndex < 0 || $.pointerDriven) return;
    const P = (U = I.current) == null ? void 0 : U.querySelector(`[data-ei="${$.highlightedIndex}"]`);
    P == null || P.scrollIntoView({ block: "nearest" });
  }, [n, $.highlightedIndex, $.pointerDriven]);
  const ht = oe((P) => {
    !P && !j.current || (!P && Le.current && (et.current = !0), t ? t(P) : P || e == null || e());
  }, [t, e]), Ne = S(H);
  Ne.current = H;
  const Le = S(!1), et = S(!1), Pt = oe(() => {
    if (!j.current && Ne.current) {
      if (et.current) {
        et.current = !1, Le.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), Ve = Re.isValidElement(r) ? r : null, qe = Ve ? Re.cloneElement(Ve, {
    ref: (P) => {
      F.current = P;
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ...J ? { type: Ve.props.type ?? "text" } : {},
    onPointerDown: (P) => {
      var U;
      Le.current = !0, et.current = !1, J && (P.preventDefault(), j.current || t == null || t(!0), (U = F.current) == null || U.focus());
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (P) => {
      J && P.key === " " && P.stopPropagation();
    },
    onClick: (P) => {
      var U, fe;
      (fe = (U = Ve.props).onClick) == null || fe.call(U, P), Pt();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (P) => {
      var U, fe;
      if ((fe = (U = Ve.props).onKeyDown) == null || fe.call(U, P), !(!J || !j.current)) {
        if (P.key.length === 1 && !P.ctrlKey && !P.metaKey && !P.altKey)
          G(!0);
        else if (P.key === "ArrowDown" || P.key === "ArrowUp") {
          P.preventDefault();
          const ye = $.items;
          if (ye.length === 0) return;
          const _e = P.key === "ArrowDown" ? 1 : -1, We = ($.highlightedIndex + _e + ye.length) % ye.length;
          $.setHighlighted(We, "keyboard");
        } else if (P.key === "Enter") {
          P.preventDefault();
          const ye = $.highlightedIndex, _e = $.items[ye >= 0 ? ye : 0];
          _e == null || _e.activate();
        }
      }
    }
  }) : r, Xe = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${ae ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ R(me.Root, { open: n || H, onOpenChange: ht, modal: !1, children: [
    /* @__PURE__ */ m(me.Trigger, { asChild: !0, children: qe }),
    /* @__PURE__ */ m(me.Portal, { container: W ?? void 0, children: /* @__PURE__ */ m(qr.Provider, { value: T, children: /* @__PURE__ */ m(Kr.Provider, { value: { chain: k, setChain: E, morph: a, keyboardOpened: C, setKeyboardOpened: D }, children: /* @__PURE__ */ m(wn.Provider, { value: $, children: /* @__PURE__ */ m(co.Provider, { value: { query: Q, setQuery: Z }, children: /* @__PURE__ */ R(
      me.Content,
      {
        ref: $e,
        ...M.attrs,
        "data-ui-fixed": !0,
        className: `${Xe} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: ve.left,
          top: ve.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : vt || void 0,
          maxHeight: ve.maxH,
          visibility: ve.ready ? "visible" : "hidden"
        },
        onPointerLeave: $.pointerLeave,
        onFocus: J ? (P) => {
          if (P.target !== P.currentTarget) return;
          const U = F.current;
          U && U.ownerDocument.activeElement !== U && U.focus();
        } : void 0,
        onCloseAutoFocus: J ? (P) => {
          var U;
          P.preventDefault(), (U = F.current) == null || U.focus();
        } : void 0,
        children: [
          ae && /* @__PURE__ */ m("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: ee }, children: /* @__PURE__ */ R("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: z, children: [
            /* @__PURE__ */ m(St, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: q,
                value: Q,
                onChange: (P) => Z(P.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            Q ? /* @__PURE__ */ m(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (P) => P.stopPropagation(),
                onClick: () => {
                  var P;
                  Z(""), (P = q.current) == null || P.focus();
                },
                children: /* @__PURE__ */ m(Et, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ m("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          ae ? /* @__PURE__ */ m("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: l }) : l
        ]
      }
    ) }) }) }) }) })
  ] });
}
function Ud({
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
  readOnly: p = !1,
  theme: g,
  align: x,
  label: v,
  header: M,
  itemLabel: T,
  trigger: k,
  minItems: E = 1,
  itemRender: C,
  morph: D = !0,
  contentClassName: W
}) {
  const w = tr(), F = Jr(), [I, j] = te(null), [H, V] = te(""), K = S(H);
  K.current = H;
  const N = S(null), J = S(null);
  ne(() => {
    n && requestAnimationFrame(() => {
      var _, q;
      (q = (_ = J.current) == null ? void 0 : _.querySelector('[data-active="1"]')) == null || q.scrollIntoView({ block: "nearest" });
    });
  }, [n]), ne(() => {
    var X;
    if (!n) return;
    const _ = (z) => {
      var Ee, de, je;
      const ee = z.target;
      if (ee && ee.closest("input, textarea, [contenteditable]")) {
        I && ee === N.current && (z.key === "Enter" ? (z.preventDefault(), z.stopImmediatePropagation(), Z()) : z.key === "Escape" && (z.preventDefault(), z.stopImmediatePropagation(), le()));
        return;
      }
      const we = (Ee = J.current) == null ? void 0 : Ee.closest(".ui-menu");
      if (!we || !we.contains(z.target)) return;
      const ae = we.ownerDocument, Ce = [...we.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], $ = [...we.querySelectorAll('div:last-child > [role="menuitem"]')], se = [...Ce, ...$];
      if (z.key === "ArrowDown" || z.key === "ArrowUp") {
        z.preventDefault(), z.stopImmediatePropagation();
        const ce = ae.activeElement;
        let Se = ce ? se.indexOf(ce) : -1;
        if (Se < 0 && ce) {
          const ve = ce.closest("[data-active]"), De = ve == null ? void 0 : ve.querySelector('[role="menuitem"]:first-child');
          De && (Se = Ce.indexOf(De));
        }
        const ue = z.key === "ArrowDown" ? 1 : -1, $e = Se < 0 ? ue === 1 ? 0 : se.length - 1 : (Se + ue + se.length) % se.length;
        (de = se[$e]) == null || de.focus({ preventScroll: !0 });
        return;
      }
      if (z.key === "ArrowLeft" || z.key === "ArrowRight") {
        const ce = ae.activeElement, Se = ce == null ? void 0 : ce.closest("[data-active]");
        if (!Se) return;
        z.preventDefault(), z.stopImmediatePropagation();
        const ue = [...Se.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ue.length === 0) return;
        const $e = ce && Se.contains(ce) ? ue.indexOf(ce) : -1, ve = z.key === "ArrowRight" ? 1 : -1, De = $e < 0 ? 0 : ($e + ve + ue.length) % ue.length;
        (je = ue[De]) == null || je.focus({ preventScroll: !0 });
        return;
      }
    }, q = ((X = J.current) == null ? void 0 : X.ownerDocument) ?? null;
    return q == null || q.addEventListener("keydown", _, { capture: !0 }), () => q == null ? void 0 : q.removeEventListener("keydown", _, { capture: !0 });
  }, [n, I]), ne(() => {
    if (!I) return;
    const _ = t.find((ee) => ee.id === I);
    _ && !H && V(_.name);
    const q = requestAnimationFrame(() => {
      const ee = N.current;
      ee && (ee.focus(), ee.select());
    });
    let X = 0;
    const z = window.setInterval(() => {
      const ee = N.current;
      if (X++, !ee || X > 12) {
        clearInterval(z);
        return;
      }
      ee.ownerDocument.activeElement !== ee && (ee.focus(), ee.select());
    }, 50);
    return () => {
      cancelAnimationFrame(q), clearInterval(z);
    };
  }, [I]), ne(() => {
    if (I) {
      const _ = t.find((q) => q.id === I);
      _ && !H && V(_.name);
    }
  }, [I, t]);
  const Q = (_, q) => {
    j(_), V(q);
  }, Z = () => {
    I && K.current.trim() && o(I, K.current.trim()), j(null);
  }, le = () => {
    j(null);
  }, G = T || M.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ R(rr, { open: n, onOpenChange: (_) => {
    _ ? (j(null), V("")) : (I && H.trim() && o(I, H.trim()), j(null), V("")), (!_ || !p) && e(_);
  }, width: "w-80", theme: g, align: x, trigger: k, morph: D, contentClassName: W, children: [
    /* @__PURE__ */ m("div", { className: `shrink-0 ${w.headerText}`, children: M }),
    /* @__PURE__ */ m("div", { ref: J, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((_) => {
      const q = _.id === r, X = I === _.id;
      return /* @__PURE__ */ m("div", { "data-active": q ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${q || X ? w.rowActiveBg : w.rowHoverBg} ${I && !X ? "opacity-40 pointer-events-none" : ""}`, children: X ? /* @__PURE__ */ R(Ke, { children: [
        /* @__PURE__ */ m("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ m(
          "input",
          {
            ref: N,
            autoFocus: !0,
            value: H,
            onChange: (z) => V(z.target.value),
            onKeyDown: (z) => {
              z.key === "Enter" && (z.preventDefault(), z.stopPropagation(), Z()), z.key === "Escape" && (z.preventDefault(), z.stopPropagation(), le());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: F
          }
        ) }),
        /* @__PURE__ */ m(
          me.Item,
          {
            className: `shrink-0 ${w.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${w.editConfirm}`,
            onSelect: (z) => {
              z.preventDefault(), Z();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m(Lr, { className: w.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          me.Item,
          {
            className: `shrink-0 ${w.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${w.editCancel}`,
            onSelect: (z) => {
              z.preventDefault(), le();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m(Et, { className: w.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ R(Ke, { children: [
        /* @__PURE__ */ m(
          me.Item,
          {
            style: F,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${w.rowText} ${q ? "" : w.rowTextHover}`,
            onSelect: h ? () => {
              i(_.id);
            } : (z) => {
              z.preventDefault(), i(_.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m("span", { className: `truncate ${q ? w.rowActiveText : ""}`, children: C ? C(_) : _.name })
          }
        ),
        /* @__PURE__ */ m(
          me.Item,
          {
            className: `shrink-0 ${w.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${q ? w.btnActive : w.btnBase}`,
            onSelect: (z) => {
              z.preventDefault(), Q(_.id, _.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m(Is, { className: w.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          me.Item,
          {
            className: `shrink-0 ${w.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${q ? w.btnActive : w.btnBase}`,
            onSelect: (z) => {
              z.preventDefault();
              const ee = s(_.id);
              ee && Q(ee, `${_.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m(qi, { className: w.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          me.Item,
          {
            className: `shrink-0 ${w.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= E ? w.btnDisabled : q ? w.btnDangerActive : w.btnDanger}`,
            onSelect: (z) => {
              z.preventDefault(), l(_.id);
            },
            onTouchStart: () => {
            },
            disabled: p || t.length <= E,
            children: /* @__PURE__ */ m(Sr, { className: w.btnIcon })
          }
        )
      ] }) }, _.id);
    }) }),
    /* @__PURE__ */ R("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ R(Ke, { children: [
        /* @__PURE__ */ m(me.Separator, { className: w.separator }),
        /* @__PURE__ */ R(
          me.Item,
          {
            className: `w-full text-left ${w.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${w.itemDefault} ui-row`,
            onSelect: (_) => {
              _.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ m(Ji, { className: `${w.btnIcon} ${w.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || c || u || d) && /* @__PURE__ */ m(me.Separator, { className: w.separator }),
      a && /* @__PURE__ */ R(
        me.Item,
        {
          className: `w-full text-left ${w.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${w.itemDefault} ui-row`,
          onSelect: (_) => {
            _.preventDefault();
            const q = a();
            q && Q(q, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(Ki, { className: `${w.btnIcon} ${w.icon}` }),
            "New ",
            G
          ]
        }
      ),
      c && /* @__PURE__ */ R(
        me.Item,
        {
          className: `w-full text-left ${w.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${w.itemDefault} ui-row`,
          onSelect: (_) => {
            _.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${w.btnIcon} ${w.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ R(
        me.Item,
        {
          className: `w-full text-left ${w.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${w.itemDefault} ui-row`,
          onSelect: (_) => {
            _.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${w.btnIcon} ${w.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ R(
        me.Item,
        {
          className: `w-full text-left ${w.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${w.itemDefault} ui-row`,
          onSelect: (_) => {
            _.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(Sr, { className: `${w.btnIcon} ${w.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function kl({
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
  var w;
  so();
  const f = tr(), d = Jr(), h = lo(), p = S(!1), g = S(null), { myIndex: x, highlighted: v, setPointer: M, api: T } = uo({
    label: () => ao(o),
    activate: () => {
      t || n();
    },
    disabled: t,
    group: u
  }), { query: k } = vl(), E = k.trim() !== "" && x < 0, C = u == null ? void 0 : u.trim(), D = !!C && x >= 0 && (x === 0 || ((w = T == null ? void 0 : T.items[x - 1]) == null ? void 0 : w.group) !== C), W = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ R(Ke, { children: [
    D && /* @__PURE__ */ m(
      "div",
      {
        "data-menu-group": C,
        role: "presentation",
        className: "ui-label shrink-0 select-none font-semibold uppercase tracking-wider pointer-events-none",
        style: h,
        children: C
      }
    ),
    /* @__PURE__ */ R(
      me.Item,
      {
        ref: g,
        "data-ei": x >= 0 ? x : void 0,
        style: { ...d, display: E ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${W} ${l ? "ui-item-selected" : ""} ${v ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (F) => {
          if (p.current) {
            p.current = !1;
            return;
          }
          s && F.preventDefault(), n();
        },
        onPointerEnter: () => {
          M(x);
        },
        onTouchStart: () => {
        },
        disabled: t,
        children: [
          e && /* @__PURE__ */ m("span", { className: `${f.icon} shrink-0`, children: e }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: o }),
          c && /* @__PURE__ */ m("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
          a && /* @__PURE__ */ m(
            "span",
            {
              className: `shrink-0 ml-1 p-0.5 rounded ${f.rightAction}`,
              title: a.title,
              onPointerDown: (F) => {
                F.stopPropagation(), F.preventDefault(), p.current = !0, a.onClick();
              },
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
function Sl({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: a, morph: c, keyboardOpened: u, setKeyboardOpened: f } = zt(Kr), d = l.includes(n), h = l[l.length - 1] === n, p = so(), g = en(), x = S(null), v = S(null), [M, T] = te(d), k = !d && M;
  ne(() => {
    d && T(!0);
  }, [d]);
  const E = () => a((X) => {
    const z = X.indexOf(n);
    return z >= 0 ? X.slice(0, z) : X;
  }), C = nr(), D = Vr(), W = S(D);
  W.current = D;
  const w = S(null);
  ne(() => {
    var z;
    const X = {
      label: e,
      activate: () => {
        f(n), a((ee) => ee.includes(n) ? ee : [...ee, n]);
      },
      submenu: !0
    };
    return w.current = X, (z = W.current) == null ? void 0 : z.register(X);
  }, []);
  const F = D && w.current ? D.items.indexOf(w.current) : -1, I = F >= 0 && F === D.highlightedIndex, j = oe(() => {
    const X = x.current;
    if (!X) return null;
    const z = X.getBoundingClientRect();
    return { left: z.left, top: z.top, width: z.width, height: z.height };
  }, []), H = er({
    visible: d,
    morph: c,
    anchor: j,
    onClosed: () => T(!1)
  }), V = S(() => {
  }), K = S(() => {
  }), N = S(() => {
  });
  Yr(d && h, C, V, {
    onCloseSub: () => {
      E(), D && F >= 0 && D.setHighlighted(F, "keyboard");
    }
  });
  const J = S(u);
  J.current = u, ne(() => {
    d && (J.current === n ? (C.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var X;
      return (X = v.current) == null ? void 0 : X.focus();
    }), f(null)) : C.setHighlighted(-1, "keyboard"));
  }, [d]), Xr(d, K), Ur(d, C, V, v, !h, N), Re.useLayoutEffect(() => {
    var z;
    if (!d || C.highlightedIndex < 0 || C.pointerDriven) return;
    const X = (z = v.current) == null ? void 0 : z.querySelector(`[data-ei="${C.highlightedIndex}"]`);
    X == null || X.scrollIntoView({ block: "nearest" });
  }, [d, C.highlightedIndex, C.pointerDriven]);
  const Q = S(null), Z = oe((X) => {
    var z;
    if (X) {
      X.addEventListener("keydown", V.current, { capture: !0 }), X.addEventListener("wheel", K.current, { passive: !1 });
      const ee = X.ownerDocument;
      Q.current = ee, ee.addEventListener("keydown", N.current, { capture: !0 });
    } else
      (z = Q.current) == null || z.removeEventListener("keydown", N.current, { capture: !0 }), Q.current = null;
    v.current = X, H(X);
  }, [H]), le = Te(), G = { padding: `${L(8, 12, le)}px ${L(12, 16, le)}px`, fontSize: L(12, 14, le) }, _ = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${I ? " ui-item-highlighted" : ""}${k ? " ui-sub-closing" : ""}`, q = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ R(me.Sub, { open: d || M, onOpenChange: (X) => a((z) => {
    if (!X) {
      const ee = z.indexOf(n);
      return ee >= 0 ? z.slice(0, ee) : z;
    }
    return z.includes(n) ? z : [...z, n];
  }), children: [
    /* @__PURE__ */ R(
      me.SubTrigger,
      {
        ref: x,
        "data-ei": F >= 0 ? F : void 0,
        style: G,
        className: _,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          D && F >= 0 && D.setHighlighted(F, "pointer");
        },
        onPointerDown: (X) => {
          X.pointerType === "pen" && (X.preventDefault(), a((z) => d ? z.slice(0, z.indexOf(n)) : [...z, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ m(Wn, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ m("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ m(Wn, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ m(me.Portal, { container: g ?? void 0, children: /* @__PURE__ */ m(
      me.SubContent,
      {
        ref: Z,
        "data-theme": p,
        className: q,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: C.pointerLeave,
        children: /* @__PURE__ */ m(wn.Provider, { value: C, children: o })
      }
    ) })
  ] });
}
const sn = 8, Xd = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const a = ft(), c = s ? { theme: s, attrs: { "data-theme": s } } : a ? oo(void 0, a) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, f = Te(), d = L(12, 14, f), h = S(null), p = bn(), [g, x] = te(!1), [v, M] = te([]), [T, k] = te(null), E = nr();
  ne(() => {
    if (n)
      return E.setHighlighted(-1, "keyboard"), ro(r);
  }, [n, r]);
  const C = S({ left: e, top: t });
  n && (C.current = { left: e, top: t });
  const D = oe(() => ({ left: C.current.left, top: C.current.top, width: 0, height: 0 }), []), W = er({
    visible: !0,
    morph: l,
    anchor: D,
    cloneOnUnmount: !0
  }), w = S(() => {
  }), F = S(() => {
  }), I = S(() => {
  });
  Yr(n, E, w), Xr(n, F), Ur(n, E, w, h, v.length > 0, I);
  const j = S(null), H = oe((N) => {
    var J;
    if (N) {
      N.addEventListener("keydown", w.current, { capture: !0 }), N.addEventListener("wheel", F.current, { passive: !1 });
      const Q = N.ownerDocument;
      j.current = Q, Q.addEventListener("keydown", I.current, { capture: !0 });
    } else
      (J = j.current) == null || J.removeEventListener("keydown", I.current, { capture: !0 }), j.current = null;
    h.current = N, x(!!N), W(N);
  }, [W]), [V, K] = te(null);
  return it(() => {
    var ee;
    if (!n || !g || !h.current) return;
    const N = h.current, J = N.offsetWidth, Q = N.offsetHeight, Z = (ee = o == null ? void 0 : o.current) == null ? void 0 : ee.getBoundingClientRect(), le = Z ? Z.right : (p == null ? void 0 : p.innerWidth) ?? 0, G = Z ? Z.bottom : (p == null ? void 0 : p.innerHeight) ?? 0, _ = Z ? Z.left : 0, q = Z ? Z.top : 0;
    let X = Math.max(q + sn, C.current.top), z = Math.max(_ + sn, C.current.left);
    z + J > le && (z = le - J - sn), X + Q > G && (X = Math.max(q + sn, G - Q - sn)), K({ left: z, top: X });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ R(me.Root, { open: n, onOpenChange: (N) => {
    N || r();
  }, modal: !1, children: [
    /* @__PURE__ */ m(me.Trigger, { asChild: !0, children: /* @__PURE__ */ m("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ m(me.Portal, { children: /* @__PURE__ */ m(qr.Provider, { value: u, children: /* @__PURE__ */ m(Kr.Provider, { value: { chain: v, setChain: M, morph: l, keyboardOpened: T, setKeyboardOpened: k }, children: /* @__PURE__ */ m(wn.Provider, { value: E, children: /* @__PURE__ */ m(
      me.Content,
      {
        ref: H,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: d, left: (V == null ? void 0 : V.left) ?? C.current.left, top: (V == null ? void 0 : V.top) ?? C.current.top, touchAction: "manipulation" },
        onPointerLeave: E.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, Gd = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Te(), a = { padding: `${L(8, 12, l)}px ${L(12, 16, l)}px`, fontSize: L(12, 14, l) }, c = Vr(), u = S(c);
  u.current = c;
  const f = S(null);
  ne(() => {
    var g;
    const p = { label: ao(s), activate: () => {
      r || n();
    } };
    return f.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const d = c && f.current ? c.items.indexOf(f.current) : -1, h = !r && d >= 0 && d === c.highlightedIndex;
  return /* @__PURE__ */ R(
    me.Item,
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
        /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ m("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Qd = () => /* @__PURE__ */ m(me.Separator, { className: "ui-sep my-1" }), Zd = (n) => /* @__PURE__ */ m(Sl, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), pe = 8, fo = "[data-modal-stack]", ct = 220, fn = "cubic-bezier(0.32, 0.72, 0, 1)", Bn = 0.94;
function Wt() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function mt(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function ho(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function hi(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ho(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${ct}ms ${fn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, ct + 80));
    });
  });
}
function Nl(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Bn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${ct}ms ${fn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, ct + 60));
    });
  });
}
function pi(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - Bn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * Bn, height: i.height * Bn };
  e.style.transition = `transform ${ct}ms ${fn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ho(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, ct + 60);
}
function fr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(fo) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Mn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(fo) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Tl({
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
  accent: p
}) {
  const g = ft(), x = Wr(
    { mode: d, accent: p, surface: h, context: "surface" },
    g
  ), v = x.mode, M = x.surface, T = x.accent, k = S(null), E = S(null), C = S(null), D = Te(), W = L(20, 24, D), w = L(10, 12, D), F = L(12, 14, D), I = L(14, 16, D), j = L(20, 24, D), H = L(20, 24, D), V = L(20, 24, D), K = L(14, 16, D), N = L(16, 20, D), J = L(10, 12, D), Q = L(12, 14, D), Z = L(8, 10, D), le = L(4, 6, D), G = { padding: `${w}px ${W}px` }, _ = { fontSize: F }, q = { padding: `${H}px ${j}px 16px ${j}px` }, X = { fontSize: I }, z = { padding: `0 ${j}px 16px` }, ee = { padding: `${V}px ${j}px` }, we = { fontSize: J, padding: `${le}px ${Z}px` }, [ae, Ce] = te(!1), $ = oe((y) => {
    k.current = y, Ce(y !== null);
  }, []), se = en(), Ee = bn(), de = S(Ee);
  de.current = Ee;
  const [je, ce] = te(null), Se = S(null), ue = S(!1), $e = S(!1), ve = S(0), De = S({ w: 0, h: 0 }), vt = S(!1), [Dt, Ot] = te(!1), [Lt, ht] = te(!1), Ne = S(0), Le = S(!1), [et, Pt] = te(!1), Ve = S(a);
  Ve.current = a;
  const qe = S(!1), Xe = S(!1), P = () => {
    Xe.current = !0, Ot(!0);
  }, U = () => {
    Xe.current = !1, Ot(!1);
  };
  ne(() => {
    n || (ce(null), vt.current = !1, ue.current = !1, ht(!1));
  }, [n]), it(() => {
    if (!n || vt.current || !ae || !k.current) return;
    vt.current = !0;
    const y = k.current.getBoundingClientRect(), A = de.current ?? null, B = (A == null ? void 0 : A.innerWidth) ?? 0, re = mt(A);
    ce({
      left: Math.max(pe, Math.min((B - y.width) / 2, B - y.width - pe)),
      top: Math.max(re.top + pe, Math.min(re.top + (re.height - y.height) / 2, re.bottom - y.height - pe))
    });
  }, [n, ae]), it(() => {
    if (!n || !ae || !a || Wt() || !k.current) return;
    const y = k.current, A = fr(y), B = A[A.length - 1];
    P(), B ? hi(Ne, y, B.getBoundingClientRect(), U) : Nl(Ne, y, U);
  }, [n, ae]);
  const fe = oe(() => {
    if (!u || Le.current) return;
    const y = k.current, A = !!y && fr(y).length > 0;
    if (!y || !a || Wt() || A) {
      e();
      return;
    }
    Le.current = !0, Pt(!0), qe.current = !0, P(), pi(Ne, y, () => {
      Le.current = !1, Pt(!1), U(), e();
    });
  }, [a, e, u]), ye = oe(() => {
    const y = k.current;
    if (!y || qe.current || !Ve.current || Wt() || fr(y).length > 0) return;
    const A = y.ownerDocument, B = y.cloneNode(!0);
    B.removeAttribute("data-modal-stack"), B.removeAttribute("data-state"), B.removeAttribute("role"), B.removeAttribute("data-aria-hidden"), B.removeAttribute("tabindex"), B.setAttribute("aria-hidden", "true"), B.style.pointerEvents = "none", A.body.appendChild(B), pi({ current: 0 }, B, () => {
      B.isConnected && B.remove();
    });
  }, []);
  it(() => () => ye(), [ye]);
  const _e = S(n);
  it(() => {
    const y = _e.current;
    _e.current = n, y && !n && ye();
  }, [n, ae, ye]), ne(() => {
    if (!n || !ae || !a || !k.current) return;
    const y = k.current, A = y.parentNode;
    if (!A) return;
    let B = 0, re = null, ie = !1;
    const he = () => {
      B = 0;
      const Me = Mn(y);
      if (Me.length > 0)
        y.style.opacity = "", y.style.pointerEvents = "", re = Me[Me.length - 1].getBoundingClientRect(), ie = !0, B = requestAnimationFrame(he);
      else if (ie) {
        ie = !1, re && !Wt() && (P(), hi(Ne, y, re, U)), re = null;
        const Be = de.current ?? null;
        Be == null || Be.setTimeout(() => {
          !y || !y.isConnected || getComputedStyle(y).opacity !== "1" && (y.style.opacity = "1", y.style.pointerEvents = "");
        }, 240);
      }
    }, ge = new MutationObserver(() => {
      !B && Mn(y).length > 0 && (B = requestAnimationFrame(he));
    });
    return ge.observe(A, { childList: !0 }), () => {
      ge.disconnect(), B && cancelAnimationFrame(B);
    };
  }, [n, ae]), ne(() => {
    if (!ae || !a || Wt() || !k.current) return;
    const y = k.current;
    let A = Math.round(y.getBoundingClientRect().height), B = !1;
    const re = new ResizeObserver(() => {
      if (!y.isConnected) return;
      const ie = Math.round(y.getBoundingClientRect().height);
      if (!B) {
        B = !0, A = ie;
        return;
      }
      if (Math.abs(ie - A) < 1) return;
      if (Se.current || Le.current || Mn(y).length > 0) {
        A = ie;
        return;
      }
      if (Xe.current) return;
      const he = A;
      A = ie, P();
      const ge = y.getBoundingClientRect(), Me = mt(de.current ?? null), Be = !ue.current && !$e.current, Ht = Be ? Me.top + (Me.height - he) / 2 : ge.top, tt = Be ? Me.top + (Me.height - ie) / 2 : ge.top;
      y.style.transition = "none", y.style.height = `${he}px`, Be && (y.style.top = `${Ht}px`), E.current && (E.current.style.overflow = "hidden"), y.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          y.style.height === `${he}px` && (y.style.transition = `height ${ct}ms ${fn}${Be ? `, top ${ct}ms ${fn}` : ""}`, y.style.height = `${ie}px`, Be && (y.style.top = `${tt}px`), window.setTimeout(() => {
            y.style.height === `${ie}px` && (y.style.transition = "", y.style.height = "", E.current && (E.current.style.overflow = ""), Be && ce({ left: ge.left, top: tt }), U());
          }, ct + 60));
        });
      });
    });
    return re.observe(y), () => re.disconnect();
  }, [ae]), ne(() => {
    if (!ae || !k.current || a && !Wt()) return;
    const y = k.current, A = new ResizeObserver(() => {
      if (!y.isConnected || Se.current || Le.current || $e.current || Mn(y).length > 0) return;
      const B = de.current ?? null, re = mt(B), ie = (B == null ? void 0 : B.innerWidth) ?? 0, he = y.getBoundingClientRect(), ge = Math.max(re.top + pe, Math.min(he.top, re.bottom - he.height - pe)), Me = Math.max(pe, Math.min(he.left, ie - he.width - pe));
      (Math.abs(ge - he.top) > 0.5 || Math.abs(Me - he.left) > 0.5) && ce({ left: Me, top: ge });
    });
    return A.observe(y), () => A.disconnect();
  }, [ae, a]);
  const We = oe(() => {
    const y = k.current;
    if (!y) return null;
    const A = y.getBoundingClientRect();
    return { left: A.left, top: A.top, width: A.width, height: A.height };
  }, []), Ye = oe((y, A) => {
    const B = de.current ?? null, re = (B == null ? void 0 : B.innerWidth) ?? 0, ie = mt(B), he = We(), ge = he ? he.width : Math.min(re - pe * 2, 576), Me = he ? he.height : Math.min(ie.height - pe * 2, 400);
    return {
      left: Math.max(pe, Math.min(y, re - ge - pe)),
      top: Math.max(ie.top + pe, Math.min(A, ie.bottom - Me - pe))
    };
  }, [We]);
  ne(() => {
    if (!n) return;
    const y = de.current ?? null, A = (y == null ? void 0 : y.visualViewport) ?? null;
    if (!y || !A) return;
    const B = 120;
    $e.current = !1, De.current = { w: y.innerWidth, h: y.innerHeight };
    let re = 0;
    const ie = () => {
      if (Le.current || Se.current) return;
      const ge = (y == null ? void 0 : y.innerHeight) ?? 0, Me = (y == null ? void 0 : y.innerWidth) ?? 0, Ht = mt(y).height < ge - B, tt = ge < De.current.h - B && Me === De.current.w;
      Ht || tt ? ($e.current = !0, ve.current && (clearTimeout(ve.current), ve.current = 0)) : ve.current || (ve.current = (y == null ? void 0 : y.setTimeout(() => {
        $e.current = !1, ve.current = 0, ht(!1);
      }, 600)) ?? 0), ht($e.current), !re && (re = requestAnimationFrame(() => {
        var ui;
        re = 0;
        const li = k.current;
        if (!li) return;
        const kt = mt(de.current ?? null), at = li.getBoundingClientRect(), ai = ((ui = de.current) == null ? void 0 : ui.innerWidth) ?? 0, ur = (y == null ? void 0 : y.innerHeight) ?? 0, Rs = kt.height < ur - B || ur < De.current.h - B && (y == null ? void 0 : y.innerWidth) === De.current.w;
        De.current = { w: (y == null ? void 0 : y.innerWidth) ?? 0, h: ur };
        const Cn = at.top >= kt.top + pe && at.bottom <= kt.bottom - pe, ci = () => {
          ce({
            left: Math.max(pe, Math.min((ai - at.width) / 2, ai - at.width - pe)),
            top: Math.max(kt.top + pe, Math.min(kt.top + (kt.height - at.height) / 2, kt.bottom - at.height - pe))
          });
        };
        if (Rs && !ze) {
          if (ue.current) {
            Cn || ce(Ye(at.left, at.top));
            return;
          }
          if (Cn) return;
          ci();
          return;
        }
        if (!$e.current) {
          if (ue.current) {
            Cn || ce(Ye(at.left, at.top));
            return;
          }
          Cn || ci();
        }
      }));
    };
    A.addEventListener("resize", ie), A.addEventListener("scroll", ie);
    const he = () => {
      Le.current || Se.current || re || (re = requestAnimationFrame(() => {
        re = 0;
        const ge = k.current;
        if (!ge) return;
        const Me = de.current ?? null, Be = mt(Me), Ht = (Me == null ? void 0 : Me.innerWidth) ?? 0, tt = ge.getBoundingClientRect();
        if (ue.current) {
          ce(Ye(tt.left, tt.top));
          return;
        }
        ce({
          left: Math.max(pe, Math.min((Ht - tt.width) / 2, Ht - tt.width - pe)),
          top: Math.max(Be.top + pe, Math.min(Be.top + (Be.height - tt.height) / 2, Be.bottom - tt.height - pe))
        });
      }));
    };
    return y.addEventListener("orientationchange", he), () => {
      A.removeEventListener("resize", ie), A.removeEventListener("scroll", ie), y.removeEventListener("orientationchange", he), re && cancelAnimationFrame(re), ve.current && clearTimeout(ve.current);
    };
  }, [n, Ye]);
  const nn = oe((y) => {
    if (y.target.closest("button")) return;
    ue.current = !0;
    const A = We();
    A && (ce(Ye(A.left, A.top)), Se.current = { startX: y.clientX, startY: y.clientY, posX: A.left, posY: A.top }, y.target.setPointerCapture(y.pointerId));
  }, [We, Ye]), rn = oe((y) => {
    const A = Se.current;
    A && (y.preventDefault(), ce(Ye(A.posX + y.clientX - A.startX, A.posY + y.clientY - A.startY)));
  }, [Ye]), on = oe(() => {
    Se.current = null;
  }, []), kn = Se.current !== null, Sn = oe(() => {
    ue.current = !1;
    const y = de.current ?? null, A = mt(y), B = (y == null ? void 0 : y.innerWidth) ?? 0, re = k.current, ie = re ? re.getBoundingClientRect() : { width: 0, height: 0 };
    ce({
      left: Math.max(pe, Math.min((B - ie.width) / 2, B - ie.width - pe)),
      top: Math.max(A.top + pe, Math.min(A.top + (A.height - ie.height) / 2, A.bottom - ie.height - pe))
    });
  }, []), wt = S(0), Nn = oe(() => {
    const y = Date.now();
    y - wt.current < 300 ? (wt.current = 0, Sn()) : wt.current = y;
  }, [Sn]), Bt = je !== null, cr = Bt ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Ft = `${i ? `${i} w-full` : "max-w-xl w-full"}`, Tn = {
    ...Bt ? { left: je.left, top: je.top } : {},
    width: `min(100%, calc(100dvw - ${pe * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Lt ? {} : { maxHeight: `calc(100dvh - ${pe * 2}px)` }
  }, b = oe((y) => {
    if (y.key !== "Enter" || y.shiftKey || y.metaKey || y.ctrlKey || y.altKey) return;
    const A = y.target, B = C.current;
    if (!(!!A.closest("[data-modal-close]") || !!B && B.contains(A) && !!A.closest('button, a, [role="button"]')) && A.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !B) return;
    const ie = Array.from(B.querySelectorAll("button[data-modal-confirm]")), he = ie.length > 0 ? ie : Array.from(B.querySelectorAll("button")), ge = he[he.length - 1];
    !ge || ge.disabled || (y.preventDefault(), ge.click());
  }, []);
  return /* @__PURE__ */ m(jr, { theme: x, children: /* @__PURE__ */ m(pt.Root, { open: n, onOpenChange: (y) => {
    y || fe();
  }, children: /* @__PURE__ */ R(pt.Portal, { container: se ?? void 0, children: [
    /* @__PURE__ */ m(
      pt.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${et ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (y) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (y.preventDefault(), f && fe());
        }
      }
    ),
    /* @__PURE__ */ R(
      pt.Content,
      {
        ref: $,
        onKeyDown: b,
        onInteractOutside: (y) => {
          f || y.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": v,
        "data-accent": T,
        "data-surface": M,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${cr} ${Ft}`,
        style: { touchAction: "manipulation", colorScheme: v, ...Object.keys(Tn).length > 0 ? Tn : {} },
        children: [
          c ? /* @__PURE__ */ R(
            "div",
            {
              style: q,
              className: `flex items-center justify-between ${kn ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (y) => {
                Dt || nn(y);
              },
              onPointerMove: rn,
              onPointerUp: on,
              onClick: Nn,
              children: [
                /* @__PURE__ */ m(pt.Title, { style: X, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ m(pt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ m(Et, { style: { width: N, height: N } }) })
              ]
            }
          ) : /* @__PURE__ */ R(
            "div",
            {
              style: G,
              className: `flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${kn ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (y) => {
                Dt || nn(y);
              },
              onPointerMove: rn,
              onPointerUp: on,
              onClick: Nn,
              children: [
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ m("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ m(pt.Title, { style: _, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ R("button", { onClick: l, style: we, className: "flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ m(Ji, { style: { width: Q, height: Q } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ m(pt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ m(Et, { style: { width: K, height: K } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ m("div", { ref: E, "data-testid": "modal-body", style: c ? z : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ m("div", { ref: C, style: c ? ee : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ m("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function ef({ children: n }) {
  const e = Te(), t = L(20, 24, e), r = L(8, 12, e);
  return /* @__PURE__ */ m("div", { className: "flex items-center justify-end gap-3 border-t border-[color:var(--ui-modal-border)] bg-[var(--ui-modal-footer-bg)]", style: { padding: `${r}px ${t}px` }, children: n });
}
const Cl = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", El = {
  zinc: "bg-[var(--ui-footer-hero-bg)] text-[color:var(--ui-footer-hero-text)] font-semibold border border-[color:var(--ui-footer-hero-border)] hover:bg-[var(--ui-footer-hero-hover-bg)] hover:border-[color:var(--ui-footer-hero-hover-border)] disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-[var(--ui-accent-solid)] text-[color:var(--ui-accent-action-text)] font-semibold border border-transparent hover:bg-[var(--ui-accent-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-[var(--ui-danger-solid)] text-white font-semibold border border-[color:var(--ui-danger-solid)] hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
}, Ml = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-[color:var(--ui-text-muted)] font-medium hover:bg-[var(--ui-footer-ghost-hover-bg)] hover:text-[color:var(--ui-text-strong)] disabled:opacity-50",
  danger: "border border-transparent text-[color:var(--ui-danger-text)] font-medium hover:bg-[var(--ui-danger-hover-bg)] hover:text-[color:var(--ui-danger-hover-text)] disabled:opacity-50",
  "danger-solid": "border border-transparent bg-[var(--ui-danger-solid)] text-white font-semibold hover:bg-[var(--ui-danger-solid-hover)] disabled:opacity-40 disabled:cursor-not-allowed"
};
function Rn({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = xt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ m(
    "button",
    {
      type: r,
      style: o,
      className: `${Cl} ${n === "hero" ? El[e] : Ml[n]} ${t}`,
      ...i
    }
  );
}
function po({ checked: n, size: e, tone: t = "accent" }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: `ui-check-indicator ${n ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: n ? /* @__PURE__ */ R("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ m("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
        /* @__PURE__ */ m("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ m("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ m("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Rl({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: c = "accent", block: u = !1 }) {
  const f = a !== "plain", d = Te(), h = L(16, 20, d), p = L(12, 14, d), g = L(12, 14, d), x = L(12, 16, d), v = L(10, 12, d), M = L(8, 10, d);
  return /* @__PURE__ */ R(
    "label",
    {
      className: `ui-checkbox ${f ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: M, padding: f ? `${v}px ${x}px` : void 0 },
      onClick: (k) => k.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ m(
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
        f ? /* @__PURE__ */ m(po, { checked: n, size: h, tone: c }) : /* @__PURE__ */ m("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ m("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ m("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ m("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function Er(n = "md") {
  const e = ze && Xi() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function mo(n = "md") {
  return n === "sm" ? xt({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : xt({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const go = It(null);
function tf() {
  const n = zt(go);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function nf({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = te(null), [s, l] = te(!1), a = S(null), c = Te(), u = L(16, 20, c), f = L(12, 14, c), d = mo(), h = S(i);
  h.current = i;
  const p = oe(() => {
    const E = h.current;
    E && (E.kind === "confirm" ? E.resolve(!1) : E.kind === "prompt" ? E.resolve(null) : E.resolve());
  }, []), g = oe((E) => {
    if (E.suppressKey) {
      const C = localStorage.getItem(E.suppressKey);
      if (C && Date.now() < parseInt(C, 10))
        return Promise.resolve(!0);
    }
    return new Promise((C) => {
      p(), l(!1), o({ kind: "confirm", options: E, resolve: C });
    });
  }, [p]), x = oe((E) => new Promise((C) => {
    p(), o({ kind: "prompt", options: E, resolve: C });
  }), [p]), v = oe((E) => new Promise((C) => {
    p(), o({ kind: "alert", options: E, resolve: C });
  }), [p]);
  ne(() => {
    if (i) {
      const E = setTimeout(() => {
        var C;
        return (C = a.current) == null ? void 0 : C.focus();
      }, 50);
      return () => clearTimeout(E);
    }
  }, [i]);
  const M = oe(() => {
    var E, C;
    if (i) {
      if (i.kind === "confirm") {
        const D = i.options;
        D.suppressKey && s && localStorage.setItem(D.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((C = (E = a.current) == null ? void 0 : E.value) == null ? void 0 : C.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), T = i !== null;
  ne(() => {
    if (!T) return;
    const E = (C) => {
      C.key !== "Enter" || C.shiftKey || C.metaKey || C.ctrlKey || C.altKey || C.isComposing || (C.preventDefault(), C.stopImmediatePropagation(), M());
    };
    return document.addEventListener("keydown", E, !0), () => document.removeEventListener("keydown", E, !0);
  }, [T, M]);
  const k = oe(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ R(go.Provider, { value: { confirm: g, prompt: x, alert: v }, children: [
    n,
    T && /* @__PURE__ */ m(
      Tl,
      {
        open: !0,
        onClose: k,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ R(Ke, { children: [
          i.kind !== "alert" && /* @__PURE__ */ m(Rn, { variant: "ghost", onClick: k, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ m(Rn, { onClick: M, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ m(
            Rn,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: M,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ m(Rn, { "data-modal-confirm": !0, onClick: M, children: "Save" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "flex flex-col", style: { gap: u }, children: [
          (i == null ? void 0 : i.options.message) && /* @__PURE__ */ m("p", { style: { fontSize: f }, className: "text-[color:var(--ui-text-muted)] leading-relaxed", children: i.options.message }),
          (i == null ? void 0 : i.kind) === "confirm" && i.options.suppressKey && /* @__PURE__ */ m(
            Rl,
            {
              block: !0,
              checked: s,
              onChange: l,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (i == null ? void 0 : i.kind) === "prompt" && /* @__PURE__ */ m(
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
const Al = 500, Il = 250, zl = 5, Ge = 88, mi = 4;
function $l(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Dl({ x: n, y: e, ms: t }) {
  const r = S(null), i = en();
  return ne(() => {
    r.current && $l(r.current, t);
  }, [t]), Qn(
    /* @__PURE__ */ m(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Ge / 2,
          top: e - Ge / 2,
          width: Ge,
          height: Ge,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ R("svg", { ref: r, width: Ge, height: Ge, viewBox: `0 0 ${Ge} ${Ge}`, children: [
          /* @__PURE__ */ m(
            "circle",
            {
              cx: Ge / 2,
              cy: Ge / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: mi + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ m(
            "circle",
            {
              cx: Ge / 2,
              cy: Ge / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: mi,
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
function rf() {
  return { "data-no-longpress": "true" };
}
function Ol(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function of({
  children: n,
  showRing: e = !0,
  longPressMs: t = Al,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = te(null), a = Br(), c = S(null), u = S(null), f = S({ x: 0, y: 0, target: null }), d = S(!1), h = Math.min(Il, t * 0.5), p = S(i);
  p.current = i;
  const g = S(o);
  return g.current = o, ne(() => {
    if (!ze || !a) return;
    const x = (k) => {
      if (!Nr(k.pointerType) || k.button !== 0) return;
      const E = k.target;
      if (!E.closest(r) || (p.current ? !p.current(E) : Ol(E))) return;
      const C = k.clientX, D = k.clientY;
      f.current = { x: C, y: D, target: k.target }, d.current = !0, e && (u.current = setTimeout(() => l({ x: C, y: D }), h)), c.current = setTimeout(() => {
        if (!d.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const W = f.current.target;
        if (!W) return;
        const w = g.current;
        if (w) {
          w(W, C, D);
          return;
        }
        const F = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: C,
          clientY: D,
          button: 2,
          view: window
        });
        W.dispatchEvent(F);
      }, t);
    }, v = (k) => {
      if (!d.current || c.current === null) return;
      const E = k.clientX - f.current.x, C = k.clientY - f.current.y;
      Math.sqrt(E * E + C * C) > zl && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    }, M = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null);
    }, T = (k) => {
      Nr(k.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", x), a.addEventListener("pointermove", v), a.addEventListener("pointerup", M), a.addEventListener("pointercancel", M), a.addEventListener("pointerleave", T), () => {
      a.removeEventListener("pointerdown", x), a.removeEventListener("pointermove", v), a.removeEventListener("pointerup", M), a == null || a.removeEventListener("pointercancel", M), a == null || a.removeEventListener("pointerleave", T), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ R(Ke, { children: [
    n,
    e && s && /* @__PURE__ */ m(Dl, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function sf() {
  const n = ul();
  return cl ? n === null || Nr(n) : !1;
}
const gi = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Ll = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Pl = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Bl = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Fl({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, a = !!n && (t || s);
  return s ? /* @__PURE__ */ R(Ke, { children: [
    a && (l ? /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: `grid min-w-0 ${gi} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Pl}`}`, children: /* @__PURE__ */ m("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ m("span", { "data-kit-label": !0, className: `grid min-w-0 ${gi} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Ll}`}`, children: /* @__PURE__ */ m("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ m(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Bl}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ R(Ke, { children: [
    a && /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const lf = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function rt({
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
  const h = ft(), p = e ?? (h == null ? void 0 : h.mode) ?? "light", g = t ?? yl(h), x = xt({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), v = xt({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), M = xt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), T = "", k = "", E = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", C = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, D = {
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
  }, W = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, w = {
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
  }, F = {
    light: {
      subtle: { base: `${T} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${k} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${T} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${T} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${k} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${T} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, I = {
    blue: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${k} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, j = d["data-state"] === "open", H = F[p][n], V = n === "primary" ? v : n.startsWith("tab") ? M : x, K = ze ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, N = L(6, 8, Te()), J = L(28, 40, Te()), Q = g === "emerald" ? "emerald" : g ? "blue" : null, Z = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let le;
  if (n === "tab") {
    const q = C[p];
    le = r ? Q ? D[Q].active : q.active : Q ? D[Q][p === "light" ? "inactiveLight" : "inactiveDark"] : q.inactive;
  } else if (n === "tab-header")
    le = `${Q ? r ? w[Q].active : w[Q].inactive : r ? W.active : W.inactive} ${j ? Q ? w[Q].open : W.open : ""}`;
  else if (le = `${H.base} ${j ? H.open : ""}`, r && (le = `${le} ${Z}`), n === "primary" && Q) {
    const q = I[Q];
    le = j ? `${q.base} ${q.open}` : q.base;
  }
  const G = !!l && !!s && !i, _ = i ? { width: J, height: J, padding: 0, gap: 0 } : o === "minimal" ? { ...K, gap: G ? 0 : N } : { ...V, gap: G ? 0 : N };
  return /* @__PURE__ */ m(
    "button",
    {
      type: u,
      "data-mode": p,
      "data-accent": h == null ? void 0 : h.accent,
      className: `${E} ${i ? "justify-center" : ""} ${G ? "group" : ""} ${le} ${c}`,
      style: _,
      ...d,
      children: i ? f : /* @__PURE__ */ m(Fl, { icon: s, collapse: l, iconWithLabel: a, active: r, gap: N, children: f })
    }
  );
}
const Hl = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, _l = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, Wl = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function af({
  active: n = !1,
  warn: e = !1,
  style: t,
  className: r = "",
  type: i = "button",
  children: o,
  ...s
}) {
  return /* @__PURE__ */ m(
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
        ...e ? Wl : n ? _l : Hl,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const jl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ql = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], hr = 1900, pr = 2100;
function Jl(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Kl(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function cf({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = ft(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return a;
    const $ = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN($.getTime()) ? a : $;
  })(), [u, f] = te(c.getFullYear()), [d, h] = te(c.getMonth()), [p, g] = te("days"), [x, v] = te(null), M = nt(() => new Set(n), [n]), T = ($) => {
    M.has($) ? e(n.filter((se) => se !== $)) : e([...n, $]);
  }, k = nt(() => {
    const $ = Jl(u, d), se = new Date(u, d, 1).getDay(), Ee = [];
    for (let de = 0; de < se; de++) Ee.push({ key: `pad-${de}`, day: 0, empty: !0 });
    for (let de = 1; de <= $; de++) Ee.push({ key: Kl(u, d, de), day: de, empty: !1 });
    return Ee;
  }, [u, d]), E = ($) => f((se) => Math.max(hr, Math.min(pr, se + $))), C = ($) => {
    d + $ < 0 ? (f((se) => Math.max(hr, se - 1)), h(11)) : d + $ > 11 ? (f((se) => Math.min(pr, se + 1)), h(0)) : h((se) => se + $);
  }, D = () => {
    if (x === null) return;
    const $ = parseInt(x, 10);
    !isNaN($) && $ >= hr && $ <= pr && f($), v(null);
  }, W = ($) => n.some((se) => se.startsWith(`${u}-${String($ + 1).padStart(2, "0")}`)), w = Te(), F = L(4, 8, w), I = L(16, 20, w), j = L(10, 11, w), H = L(6, 8, w), V = L(12, 14, w), K = L(6, 10, w), N = L(12, 14, w), J = L(8, 12, w), Q = L(10, 12, w), Z = L(6, 10, w), le = L(2, 6, w), G = L(64, 80, w), _ = { padding: F }, q = { width: I, height: I }, X = { fontSize: j, paddingTop: H, paddingBottom: H }, z = { fontSize: V, paddingTop: K, paddingBottom: K }, ee = { fontSize: N, paddingTop: J, paddingBottom: J }, we = { fontSize: Q, padding: `${le}px ${Z}px` }, ae = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", Ce = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ R("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ R("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? E(-1) : C(-1),
          style: _,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ m(zs, { style: q })
        }
      ),
      p === "days" ? /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => g("months"),
          "aria-label": "Select year and month",
          className: "text-sm font-semibold rounded px-2 py-0.5 transition-colors text-[color:var(--ui-date-header-text)] hover:bg-[var(--ui-date-header-hover)]",
          children: new Date(u, d).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ m(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: x ?? String(u),
          onChange: ($) => v($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: D,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), D()), $.key === "Escape" && v(null);
          },
          style: { width: G },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? E(1) : C(1),
          style: _,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ m(Wn, { style: q })
        }
      )
    ] }),
    p === "months" ? /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ m("div", { className: "grid grid-cols-3 text-center", children: ql.map(($, se) => /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: () => {
            h(se), g("days");
          },
          style: ee,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${se === d ? ae : Ce}`,
          children: [
            $,
            W(se) && /* @__PURE__ */ m("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${se === d ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ m("div", { className: "text-center border-t border-[color:var(--ui-border)]", children: /* @__PURE__ */ m(
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
    ] }) : /* @__PURE__ */ R("div", { className: "grid grid-cols-7 text-center", children: [
      jl.map(($) => /* @__PURE__ */ m("div", { style: X, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: $ }, $)),
      k.map(($) => $.empty ? /* @__PURE__ */ m("div", {}, $.key) : /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => T($.key),
          style: z,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${M.has($.key) ? ae : Ce}`,
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
      /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-1", children: n.map(($) => {
        const se = /* @__PURE__ */ new Date($ + "T00:00:00"), Ee = se.getFullYear() === a.getFullYear() ? se.toLocaleString("default", { month: "short", day: "numeric" }) : se.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ R(
          "button",
          {
            type: "button",
            onClick: () => T($),
            "aria-label": `Remove ${Ee}`,
            style: we,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              Ee,
              /* @__PURE__ */ m("span", { className: "leading-none text-[color:var(--ui-text-muted)]", "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function uf({
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
  const h = (k) => e instanceof Set ? e.has(k) : e.includes(k), p = Te(), g = L(12, 16, p), x = L(8, 12, p), v = L(12, 14, p), M = L(16, 20, p), T = r != null || i != null;
  return /* @__PURE__ */ R("div", { className: d, ...f ? { "data-theme": f } : {}, children: [
    T && /* @__PURE__ */ R("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ m("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((k) => {
            const E = h(k.id), C = /* @__PURE__ */ m(po, { checked: E, size: M });
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => t(k.id),
                "aria-pressed": E,
                className: `ui-checklist-item ${E ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${x}px ${g}px`, fontSize: v },
                ...k.dataProps,
                children: [
                  u === "leading" && C,
                  k.leading != null && /* @__PURE__ */ m("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ m("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ m("span", { className: "ui-checklist-secondary", children: k.secondary }),
                  u === "trailing" && /* @__PURE__ */ m("span", { className: "ml-auto flex shrink-0", children: C })
                ]
              },
              k.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ m("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function df({
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
  const u = Te(), f = s ? 10 : L(12, 16, u), d = s ? 6 : L(8, 12, u), h = s ? 12 : L(12, 14, u), p = s ? 14 : L(16, 20, u);
  return /* @__PURE__ */ R("div", { className: c, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ m("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const x = e === g.id;
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${x ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${d}px ${f}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ m("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: x && /* @__PURE__ */ m("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ m("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ m("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ m("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ m("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const ff = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = bn(), { refs: l, floatingStyles: a } = Ws({
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
          var M;
          if (i !== "visible") return {};
          const u = (M = c.elements.floating.ownerDocument) == null ? void 0 : M.defaultView;
          if (!u) return {};
          const f = c.rects.reference, d = Math.max(f.x, 0), h = Math.max(f.y, 0), p = Math.min(f.x + f.width, u.innerWidth), g = Math.min(f.y + f.height, u.innerHeight);
          if (p <= d || g <= h) return {};
          const x = r === "left" ? p - (f.x + f.width) : r === "right" ? d - f.x : 0, v = r === "top" ? h - f.y : r === "bottom" ? g - (f.y + f.height) : 0;
          return { x: c.x + x, y: c.y + v };
        }
      },
      Vi(o),
      Yi({ padding: 8 }),
      Ui({ padding: 8 }),
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
          const f = c.rects.floating.width, d = c.rects.floating.height, h = Math.max(8, Math.min(c.x, u.innerWidth - f - 8)), p = Math.max(8, Math.min(c.y, u.innerHeight - d - 8));
          return { x: h, y: p };
        }
      }
    ],
    whileElementsMounted: js
  });
  return it(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ R(Ke, { children: [
    !t && /* @__PURE__ */ m("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Qn(
      /* @__PURE__ */ m(
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
function Vl(n, e) {
  if (!e || !Re.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const jt = ({ content: n, children: e }) => {
  const t = ft(), r = Te(), i = L(10, 12, r), o = L(6, 6, r), s = L(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = en(), c = bn(), [u, f] = te(!1), [d, h] = te({ x: 0, y: 0 }), p = S(null), g = S(null), x = () => {
    if (!p.current) return;
    const T = p.current.getBoundingClientRect();
    h({ x: T.left + T.width / 2, y: T.top });
  };
  ne(() => () => {
    g.current && clearTimeout(g.current);
  }, []), ne(() => (u && c && (x(), c.addEventListener("scroll", x, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", x, !0)), [u]);
  const v = Vl(e, n), M = Object.keys(v).length > 0 ? Re.cloneElement(e, v) : e;
  return /* @__PURE__ */ R(
    "div",
    {
      ref: p,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), x(), f(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => f(!1), 60);
      },
      children: [
        M,
        u && Qn(
          /* @__PURE__ */ R(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: d.x, top: d.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((T, k) => /* @__PURE__ */ m("div", { className: k > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: T }, k)),
                /* @__PURE__ */ m("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[color:var(--ui-tooltip-bg)]" })
              ]
            }
          ),
          a ?? document.body
        )
      ]
    }
  );
}, Yl = 250;
function Ul(n, e, t) {
  const [r, i] = Re.useState(null), [o, s] = Re.useState(!1), l = Re.useRef(null), a = Re.useRef(t);
  a.current = t;
  const c = Re.useCallback(() => {
    var d;
    const f = (d = e.current) == null ? void 0 : d[a.current];
    f && i({ left: f.offsetLeft, width: f.offsetWidth });
  }, [e]);
  Re.useLayoutEffect(() => {
    c();
  }, [t, c]), Re.useLayoutEffect(() => {
    const f = n.current;
    if (!f) return;
    const d = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), Yl), c();
    }, h = new ResizeObserver(d);
    h.observe(f);
    for (const p of e.current ?? []) p && h.observe(p);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, c]);
  const u = Re.useMemo(
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
function ir() {
  const n = Te(), e = ze, t = e ? L(28, 40, n) : 28, r = e ? L(28, 40, n) : 28, i = e ? L(10, 14, n) : 10, o = e ? L(10, 14, n) : 10, s = e ? L(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const hf = ze ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Xl = ze ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", An = ze ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Gl = "hover:bg-red-950/50", pf = ze ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", mf = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", gf = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ql = ze ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", yf = ze ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", yo = ze ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Zl = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", ea = ze ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", In = ({ onClick: n, disabled: e, title: t, className: r = Xl, children: i }) => {
  const o = ir();
  return /* @__PURE__ */ m(jt, { content: t, children: /* @__PURE__ */ m("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, zn = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, xf = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: c, ariaLabel: u }) => {
  const f = ft(), d = a ?? gl(f), h = a === "blue" || a === "emerald" ? a : (f == null ? void 0 : f.accent) ?? "zinc", p = { "data-mode": d === "dark" ? "dark" : "light", "data-accent": h }, g = ir(), x = s && !ze ? 24 : g.control.height, v = xt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), M = ze ? v : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, T = (W) => i ? i(W) : n === W, k = Re.useRef(null), E = Re.useRef([]), C = Math.max(0, e.findIndex((W) => T(W.v))), D = Ul(k, E, C);
  return l === "track" ? /* @__PURE__ */ R(
    "div",
    {
      ref: k,
      role: c ? "tablist" : "group",
      "aria-label": u,
      ...p,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${zn.wrap}`,
      children: [
        D.style && /* @__PURE__ */ m(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${zn.pill} ${D.motionClass}`,
            style: { ...D.style, top: 2, bottom: 2 }
          }
        ),
        e.map((W, w) => {
          const F = T(W.v);
          return /* @__PURE__ */ R(
            "button",
            {
              ref: (I) => {
                E.current[w] = I;
              },
              ...W.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(W.v),
              title: W.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? F : void 0,
              "aria-pressed": c ? void 0 : F,
              "aria-label": W.ariaLabel ?? (W.l ? void 0 : W.title),
              style: M,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${F ? zn.active : zn.idle}`,
              children: [
                W.icon,
                W.l
              ]
            },
            W.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ R("div", { ref: k, className: `relative ${Zl} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    D.style && /* @__PURE__ */ m(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${D.motionClass}`,
        style: { ...D.style, top: 0, bottom: 0 }
      }
    ),
    e.map((W, w) => {
      const F = T(W.v);
      return /* @__PURE__ */ R(
        "button",
        {
          ref: (I) => {
            E.current[w] = I;
          },
          ...W.dataProps,
          disabled: r,
          onClick: () => t(W.v),
          title: W.title,
          style: { ...g.control, height: x },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${F ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${W.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            W.icon,
            W.l
          ]
        },
        W.v
      );
    })
  ] });
}, bf = ({ children: n }) => /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ m("span", { className: ze ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ m("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), ta = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", na = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", vf = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ R("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ m("span", { className: t ? ta : na, children: n }),
  e
] }), wf = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ m("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), kf = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ R("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ m(In, { onClick: () => r(-1), disabled: n, title: "Move up", className: An, children: /* @__PURE__ */ m($s, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(In, { onClick: () => r(1), disabled: n, title: "Move down", className: An, children: /* @__PURE__ */ m(Ds, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(In, { onClick: e, disabled: n, title: "Duplicate", className: An, children: /* @__PURE__ */ m(qi, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m("div", { className: yo }),
    /* @__PURE__ */ m(In, { onClick: t, disabled: n, title: "Delete", className: `${An} ${Gl}`, children: /* @__PURE__ */ m(Sr, { className: "w-2.5 h-2.5" }) })
  ] })
);
var yi = Object.defineProperty, ra = (n, e) => {
  let t = {};
  for (var r in n) yi(t, r, {
    get: n[r],
    enumerable: !0
  });
  return yi(t, Symbol.toStringTag, { value: "Module" }), t;
};
function Pe(n) {
  this.content = n;
}
Pe.prototype = {
  constructor: Pe,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Pe(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Pe(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Pe([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Pe(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Pe(i);
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
    return n = Pe.from(n), n.size ? new Pe(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Pe.from(n), n.size ? new Pe(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Pe.from(n);
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
Pe.from = function(n) {
  if (n instanceof Pe) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Pe(e);
};
function xo(n, e, t) {
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
      return a && a < s.length && a < l.length && wo(s.charCodeAt(a - 1)) && vo(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = xo(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function bo(n, e, t, r) {
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
      return f && d && f < c.length && wo(c.charCodeAt(f - 1)) && vo(c.charCodeAt(f)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = bo(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function vo(n) {
  return n >= 56320 && n < 57344;
}
function wo(n) {
  return n >= 55296 && n < 56320;
}
class O {
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
    return new O(i, this.size + e.size);
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
    return new O(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? O.empty : e == 0 && t == this.content.length ? this : new O(this.content.slice(e, t));
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
    return i[e] = t, new O(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new O([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new O(this.content.concat(e), this.size + e.nodeSize);
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
    return xo(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return bo(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return $n(0, e);
    if (e == this.size)
      return $n(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? $n(t + 1, o) : $n(t, r);
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
      return O.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return O.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return O.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new O(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return O.empty;
    if (e instanceof O)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new O([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
O.empty = new O([], 0);
const mr = { index: 0, offset: 0 };
function $n(n, e) {
  return mr.index = n, mr.offset = e, mr;
}
function qn(n, e) {
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
      if (!qn(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !qn(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let xe = class Mr {
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
    return this == e || this.type == e.type && qn(this.attrs, e.attrs);
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
      return Mr.none;
    if (e instanceof Mr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
xe.none = [];
class hn extends Error {
}
class Y {
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
    let r = So(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new Y(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new Y(ko(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return Y.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new Y(O.fromJSON(e, t.content), r, i);
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
    return new Y(e, r, i);
  }
}
Y.empty = new Y(O.empty, 0, 0);
function ko(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(ko(o.content, e - i - 1, t - i - 1)));
}
function So(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = So(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(s, a.copy(c));
}
function ia(n, e, t) {
  if (t.openStart > n.depth)
    throw new hn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new hn("Inconsistent open depths");
  return No(n, e, t, 0);
}
function No(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = No(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Ct(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = oa(t, n);
      return Ct(o, Co(n, s, l, e, r));
    }
  else return Ct(o, Jn(n, e, r));
}
function To(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new hn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Rr(n, e, t) {
  let r = n.node(t);
  return To(r, e.node(t)), r;
}
function Tt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function cn(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (Tt(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Tt(i.child(l), r);
  e && e.depth == t && e.textOffset && Tt(e.nodeBefore, r);
}
function Ct(n, e) {
  if (!n.type.validContent(e))
    throw new hn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Co(n, e, t, r, i) {
  let o = n.depth > i && Rr(n, e, i + 1), s = r.depth > i && Rr(t, r, i + 1), l = [];
  return cn(null, n, i, l), o && s && e.index(i) == t.index(i) ? (To(o, s), Tt(Ct(o, Co(n, e, t, r, i + 1)), l)) : (o && Tt(Ct(o, Jn(n, e, i + 1)), l), cn(e, t, i, l), s && Tt(Ct(s, Jn(t, r, i + 1)), l)), cn(r, null, i, l), new O(l);
}
function Jn(n, e, t) {
  let r = [];
  if (cn(null, n, t, r), n.depth > t) {
    let i = Rr(n, e, t + 1);
    Tt(Ct(i, Jn(n, e, t + 1)), r);
  }
  return cn(e, null, t, r), new O(r);
}
function oa(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(O.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class pn {
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
      return xe.none;
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
        return new Kn(this, e, r);
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
    return new pn(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = xi.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      xi.set(e, r = new sa());
    let i = r.elts[r.i] = pn.resolve(e, t);
    return r.i = (r.i + 1) % la, i;
  }
}
class sa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const la = 12, xi = /* @__PURE__ */ new WeakMap();
class Kn {
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
const aa = /* @__PURE__ */ Object.create(null);
let Vt = class Ar {
  /**
  @internal
  */
  constructor(e, t, r, i = xe.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || O.empty;
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
    return this.type == e && qn(this.attrs, t || e.defaultAttrs || aa) && xe.sameSet(this.marks, r || xe.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Ar(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Ar(this.type, this.attrs, this.content, e);
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
      return Y.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new Y(c, i.depth - s, o.depth - s);
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
    return ia(this.resolve(e), this.resolve(t), r);
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
    return pn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return pn.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), Eo(this.marks, e);
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
  canReplace(e, t, r = O.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), bi(this.type.attrs, this.attrs, "node", this.type.name);
    let e = xe.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      bi(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!xe.sameSet(e, this.marks))
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
    let i = O.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Vt.prototype.text = void 0;
class Vn extends Vt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : Eo(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Vn(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Vn(this.type, this.attrs, e, this.marks);
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
function Eo(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function bi(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Rt {
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
    let r = new ca(e, t);
    if (r.next == null)
      return Rt.empty;
    let i = Mo(r);
    r.next && r.err("Unexpected trailing text");
    let o = ga(ma(i));
    return ya(o, r), o;
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
        return O.from(l.map((c) => c.createAndFill()));
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
Rt.empty = new Rt(!0);
class ca {
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
function Mo(n) {
  let e = [];
  do
    e.push(ua(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function ua(n) {
  let e = [];
  do
    e.push(da(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function da(n) {
  let e = pa(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = fa(n, e);
    else
      break;
  return e;
}
function vi(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function fa(n, e) {
  let t = vi(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = vi(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function ha(n, e) {
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
function pa(n) {
  if (n.eat("(")) {
    let e = Mo(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = ha(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function ma(n) {
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
function Ro(n, e) {
  return e - n;
}
function wi(n, e) {
  let t = [];
  return r(e), t.sort(Ro);
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
function ga(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(wi(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        wi(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Rt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(Ro);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function ya(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function Ao(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Io(n, e) {
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
function zo(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new ba(n, r, e[r]);
  return t;
}
class Yn {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = zo(e, r.attrs), this.defaultAttrs = Ao(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Rt.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Io(this.attrs, e);
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
    return new Vt(this, this.computeAttrs(e), O.from(t), xe.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = O.from(t), this.checkContent(t), new Vt(this, this.computeAttrs(e), t, xe.setFrom(r));
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
    if (e = this.computeAttrs(e), t = O.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(O.empty, !0);
    return o ? new Vt(this, e, t.append(o), xe.setFrom(r)) : null;
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
    return t ? t.length ? t : xe.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Yn(o, t, s));
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
function xa(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class ba {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? xa(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class or {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = zo(e, i.attrs), this.excluded = null;
    let o = Ao(this.attrs);
    this.instance = o ? new xe(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new xe(this, Io(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new or(o, i++, t, s)), r;
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
class va {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Pe.from(e.nodes), t.marks = Pe.from(e.marks || {}), this.nodes = Yn.compile(this.spec.nodes, this), this.marks = or.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Rt.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? ki(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : ki(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Vt.fromJSON(this, i), this.markFromJSON = (i) => xe.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Yn) {
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
    return new Vn(r, r.defaultAttrs, e, xe.setFrom(t));
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
function ki(n, e) {
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
function wa(n) {
  return n.tag != null;
}
function ka(n) {
  return n.style != null;
}
class Yt {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (wa(i))
        this.tags.push(i);
      else if (ka(i)) {
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
    let r = new Ni(this, t, !1);
    return r.addAll(e, xe.none, t.from, t.to), r.finish();
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
    let r = new Ni(this, t, !0);
    return r.addAll(e, xe.none, t.from, t.to), Y.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Ta(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = Ti(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = Ti(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new Yt(e, Yt.schemaRules(e)));
  }
}
const $o = {
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
}, Sa = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Do = { ol: !0, ul: !0 }, mn = 1, Ir = 2, un = 4;
function Si(n, e, t) {
  return e != null ? (e ? mn : 0) | (e === "full" ? Ir : 0) : n && n.whitespace == "pre" ? mn | Ir : t & ~un;
}
class Dn {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = xe.none, this.match = o || (s & un ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(O.from(e));
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
    if (!(this.options & mn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = O.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(O.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !$o.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class Ni {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = Si(null, t.preserveWhitespace, 0) | (r ? un : 0);
    i ? o = new Dn(i.type, i.attrs, xe.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Dn(null, null, xe.none, !0, null, s) : o = new Dn(e.schema.topNodeType, null, xe.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Ir ? "full" : this.localPreserveWS || (i.options & mn) > 0, { schema: s } = this.parser;
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
    Do.hasOwnProperty(s) && this.parser.normalizeLists && Na(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Sa.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if ($o.hasOwnProperty(s))
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
      let s = xe.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : Ci(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = Si(e, o, s.options);
    s.options & un && s.content.length == 0 && (l |= un);
    let a = xe.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : Ci(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Dn(e, t, a, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= mn);
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
function Na(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Do.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ta(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function Ti(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function Ci(n, e) {
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
const Oo = 65535, Lo = Math.pow(2, 16);
function Ca(n, e) {
  return n + e * Lo;
}
function Ei(n) {
  return n & Oo;
}
function Ea(n) {
  return (n - (n & Oo)) / Lo;
}
const Po = 1, Bo = 2, Fn = 4, Fo = 8;
class zr {
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
    return (this.delInfo & Fo) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Po | Fn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Bo | Fn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Fn) > 0;
  }
}
class Ue {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Ue.empty)
      return Ue.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Ei(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Ea(e);
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
        let p = e == (t < 0 ? a : f) ? null : Ca(l / 3, e - a), g = e == a ? Bo : e == f ? Po : Fn;
        return (t < 0 ? e != a : e != f) && (g |= Fo), new zr(h, g, p);
      }
      i += u - c;
    }
    return r ? e + i : new zr(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Ei(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Ue(this.ranges, !this.inverted);
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
    return e == 0 ? Ue.empty : new Ue(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Ue.empty = new Ue([]);
class Un {
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
    return new Un(this._maps, this.mirror, e, t);
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
    let e = new Un();
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
    return r ? e : new zr(e, i, null);
  }
}
const gr = /* @__PURE__ */ Object.create(null);
class He {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Ue.empty;
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
    let r = gr[t.stepType];
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
    if (e in gr)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return gr[e] = t, t.prototype.jsonID = e, t;
  }
}
class Ie {
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
    return new Ie(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new Ie(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return Ie.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof hn)
        return Ie.fail(o.message);
      throw o;
    }
  }
}
function Gr(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Gr(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return O.fromArray(r);
}
class gt extends He {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new Y(Gr(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return Ie.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new ot(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new gt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof gt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new gt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new gt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
He.jsonID("addMark", gt);
class ot extends He {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new Y(Gr(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return Ie.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new gt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ot(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ot && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ot(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new ot(t.from, t.to, e.markFromJSON(t.mark));
  }
}
He.jsonID("removeMark", ot);
class yt extends He {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Ie.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return Ie.fromReplace(e, this.pos, this.pos + 1, new Y(O.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new yt(this.pos, t.marks[i]);
        return new yt(this.pos, this.mark);
      }
    }
    return new At(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new yt(t.pos, this.mark);
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
    return new yt(t.pos, e.markFromJSON(t.mark));
  }
}
He.jsonID("addNodeMark", yt);
class At extends He {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Ie.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return Ie.fromReplace(e, this.pos, this.pos + 1, new Y(O.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new yt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new At(t.pos, this.mark);
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
    return new At(t.pos, e.markFromJSON(t.mark));
  }
}
He.jsonID("removeNodeMark", At);
class Ae extends He {
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
    return this.structure && $r(e, this.from, this.to) ? Ie.fail("Structure replace would overwrite content") : Ie.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Ue([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Ae(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && Ae.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new Ae(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof Ae) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? Y.empty : new Y(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Ae(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? Y.empty : new Y(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Ae(e.from, this.to, t, this.structure);
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
    return new Ae(t.from, t.to, Y.fromJSON(e, t.slice), !!t.structure);
  }
}
Ae.MAP_BIAS = 1;
He.jsonID("replace", Ae);
class Oe extends He {
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
    if (this.structure && ($r(e, this.from, this.gapFrom) || $r(e, this.gapTo, this.to)))
      return Ie.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return Ie.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? Ie.fromReplace(e, this.from, this.to, r) : Ie.fail("Content does not fit in gap");
  }
  getMap() {
    return new Ue([
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
    return new Oe(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new Oe(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new Oe(t.from, t.to, t.gapFrom, t.gapTo, Y.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
He.jsonID("replaceAround", Oe);
function $r(n, e, t) {
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
function Ma(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let f = a.marks;
    if (!r.isInSet(f) && u.type.allowsMarkType(r.type)) {
      let d = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(f);
      for (let g = 0; g < f.length; g++)
        f[g].isInSet(p) || (s && s.to == d && s.mark.eq(f[g]) ? s.to = h : i.push(s = new ot(d, h, f[g])));
      l && l.to == d ? l.to = h : o.push(l = new gt(d, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function Ra(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof or) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let f = a[u], d;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == o - 1 && f.eq(i[h].style) && (d = p);
        }
        d ? (d.to = c, d.step = o) : i.push({ style: f, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new ot(s.from, s.to, s.style)));
}
function Qr(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, f = r.matchType(c.type);
    if (!f)
      s.push(new Ae(l, u, Y.empty));
    else {
      r = f;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new ot(l, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d, h = /\r?\n|\r/g, p;
        for (; d = h.exec(c.text); )
          p || (p = new Y(O.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new Ae(l + d.index, l + d.index + d[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(O.empty, !0);
    n.replace(l, l, new Y(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function Aa(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function tn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Aa(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function Ia(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = O.empty, f = 0;
  for (let p = o, g = !1; p > t; p--)
    g || r.index(p) > 0 ? (g = !0, u = O.from(r.node(p).copy(u)), f++) : a--;
  let d = O.empty, h = 0;
  for (let p = o, g = !1; p > t; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, d = O.from(i.node(p).copy(d)), h++) : c++;
  n.step(new Oe(a, c, s, l, new Y(u.append(d), f, h), u.size - f, !0));
}
function Ho(n, e, t = null, r = n) {
  let i = za(n, e), o = i && $a(r, e);
  return o ? i.map(Mi).concat({ type: e, attrs: t }).concat(o.map(Mi)) : null;
}
function Mi(n) {
  return { type: n, attrs: null };
}
function za(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function $a(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Da(n, e, t) {
  let r = O.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = O.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new Oe(i, o, i, o, new Y(r, 0, 0), t.length, !0));
}
function Oa(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && La(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Wo(n, s, l, o), Qr(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(o), f = u.map(l, 1), d = u.map(l + s.nodeSize, 1);
      return n.step(new Oe(f, d, f + 1, d - 1, new Y(O.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && _o(n, s, l, o), !1;
    }
  });
}
function _o(n, e, t, r) {
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
function Wo(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function La(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Pa(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new Oe(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new Y(O.from(s), 0, 0), 1, !0));
}
function ut(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let f = i.node(c), d = i.index(c);
    if (f.type.spec.isolating)
      return !1;
    let h = f.content.cutByIndex(d, f.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let g = r && r[u] || f;
    if (!f.canReplace(d + 1, f.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function Ba(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = O.empty, s = O.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = O.from(i.node(l).copy(o));
    let u = r && r[c];
    s = O.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new Ae(e, e, new Y(o.append(s), t, t), !0));
}
function $t(n, e) {
  let t = n.resolve(e), r = t.index();
  return jo(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Fa(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function jo(n, e) {
  return !!(n && e && !n.isLeaf && Fa(n, e));
}
function sr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && jo(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Ha(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", f = !!s.contentMatch.matchType(i);
    u && !f ? r = !1 : !u && f && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Wo(n, u.node(), u.before(), l);
  }
  s.inlineContent && Qr(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new Ae(c, a.map(e + t, -1), Y.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    _o(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function _a(n, e, t) {
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
function lr(n, e, t = e, r = Y.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return qo(i, o, r) ? new Ae(e, t, r) : new Wa(i, o, r).fit();
}
function qo(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Wa {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = O.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = O.from(e.node(i).copy(this.placed));
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
    let a = new Y(o, s, l);
    return e > -1 ? new Oe(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new Ae(r.pos, i.pos, a) : null;
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
        r ? (o = yr(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, f = null;
          if (t == 1 && (s ? c.matchType(s.type) || (f = c.fillBefore(O.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: f };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = yr(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new Y(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = yr(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new Y(ln(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new Y(ln(e, t, 1), t, r);
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
      let g = l.child(c), x = f.matchType(g.type);
      if (!x)
        break;
      c++, (c > 1 || a == 0 || g.content.size) && (f = x, u.push(Jo(g.mark(d.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = an(this.placed, t, O.from(u)), this.frontier[t].match = f, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, x = l; g < h; g++) {
      let v = x.lastChild;
      this.frontier.push({ type: v.type, match: v.contentMatchAt(v.childCount) }), x = v.content;
    }
    this.unplaced = p ? e == 0 ? Y.empty : new Y(ln(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new Y(ln(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !xr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = xr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = xr(e, l, c, a, !0);
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
    t.fit.childCount && (this.placed = an(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = an(this.placed, this.depth, O.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(O.empty, !0);
    t.childCount && (this.placed = an(this.placed, this.frontier.length, t));
  }
}
function ln(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(ln(n.firstChild.content, e - 1, t)));
}
function an(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(an(n.lastChild.content, e - 1, t)));
}
function yr(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Jo(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Jo(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(O.empty, !0)))), n.copy(r);
}
function xr(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !ja(t, o.content, s) ? l : null;
}
function ja(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function qa(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Ja(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (qo(i, o, r))
    return n.step(new Ae(e, t, r));
  let s = Vo(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let d = i.depth, h = i.pos - 1; d > 0; d--, h--) {
    let p = i.node(d).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(d) > -1 ? l = d : i.before(d) == h && s.splice(1, 0, -d);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let d = r.content, h = 0; ; h++) {
    let p = d.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    d = p.content;
  }
  for (let d = u - 1; d >= 0; d--) {
    let h = c[d], p = qa(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = d;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let d = r.openStart; d >= 0; d--) {
    let h = (d + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let g = 0; g < s.length; g++) {
        let x = s[(g + a) % s.length], v = !0;
        x < 0 && (v = !1, x = -x);
        let M = i.node(x - 1), T = i.index(x - 1);
        if (M.canReplaceWith(T, T, p.type, p.marks))
          return n.replace(i.before(x), v ? o.after(x) : t, new Y(Ko(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let f = n.steps.length;
  for (let d = s.length - 1; d >= 0 && (n.replace(e, t, r), !(n.steps.length > f)); d--) {
    let h = s[d];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Ko(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Ko(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(O.empty, !0));
  }
  return n;
}
function Ka(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = _a(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new Y(O.from(r), 0, 0));
}
function Va(n, e, t) {
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
  let o = Vo(r, i);
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
function Vo(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Ut extends He {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return Ie.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return Ie.fromReplace(e, this.pos, this.pos + 1, new Y(O.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Ue.empty;
  }
  invert(e) {
    return new Ut(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ut(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Ut(t.pos, t.attr, t.value);
  }
}
He.jsonID("attr", Ut);
class gn extends He {
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
    return Ie.ok(r);
  }
  getMap() {
    return Ue.empty;
  }
  invert(e) {
    return new gn(this.attr, e.attrs[this.attr]);
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
    return new gn(t.attr, t.value);
  }
}
He.jsonID("docAttr", gn);
let Gt = class extends Error {
};
Gt = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Gt.prototype = Object.create(Error.prototype);
Gt.prototype.constructor = Gt;
Gt.prototype.name = "TransformError";
class Ya {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new Un();
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
      throw new Gt(t.failed);
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
  replace(e, t = e, r = Y.empty) {
    let i = lr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new Y(O.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, Y.empty);
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
    return Ja(this, e, t, r), this;
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
    return Ka(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Va(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Ia(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Ha(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Da(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Oa(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Pa(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Ut(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new gn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new yt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof xe)
      t.isInSet(r.marks) && this.step(new At(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new At(e, o)), i = o.removeFromSet(i);
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
    return Ba(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Ma(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Ra(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Qr(this, e, t, r), this;
  }
}
const br = /* @__PURE__ */ Object.create(null);
class ke {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Ua(e.min(t), e.max(t))];
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
  replace(e, t = Y.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? Y.empty : t), l == 0 && Ii(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Ii(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Je(e) : qt(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? qt(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : qt(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new st(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return qt(e, e, 0, 0, 1) || new st(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return qt(e, e, e.content.size, e.childCount, -1) || new st(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = br[t.type];
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
    if (e in br)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return br[e] = t, t.prototype.jsonID = e, t;
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
    return Je.between(this.$anchor, this.$head).getBookmark();
  }
}
ke.prototype.visible = !0;
class Ua {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Ri = !1;
function Ai(n) {
  !Ri && !n.parent.inlineContent && (Ri = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Je extends ke {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Ai(e), Ai(t), super(e, t);
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
      return ke.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Je(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = Y.empty) {
    if (super.replace(e, t), t == Y.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Je && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new ar(this.anchor, this.head);
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
    return new Je(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = ke.findFrom(t, r, !0) || ke.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return ke.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (ke.findFrom(e, -r, !0) || ke.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Je(e, t);
  }
}
ke.jsonID("text", Je);
class ar {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new ar(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Je.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class be extends ke {
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
    return r ? ke.near(o) : new be(o);
  }
  content() {
    return new Y(O.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof be && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Zr(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new be(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new be(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
be.prototype.visible = !1;
ke.jsonID("node", be);
class Zr {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new ar(r, r) : new Zr(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && be.isSelectable(r) ? new be(t) : ke.near(t);
  }
}
class st extends ke {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = Y.empty) {
    if (t == Y.empty) {
      e.delete(0, e.doc.content.size);
      let r = ke.atStart(e.doc);
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
    return new st(e);
  }
  map(e) {
    return new st(e);
  }
  eq(e) {
    return e instanceof st;
  }
  getBookmark() {
    return Xa;
  }
}
ke.jsonID("all", st);
const Xa = {
  map() {
    return this;
  },
  resolve(n) {
    return new st(n);
  }
};
function qt(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Je.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && be.isSelectable(l))
        return be.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = qt(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Ii(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof Ae || i instanceof Oe))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(ke.near(n.doc.resolve(s), t));
}
function zi(n, e) {
  return !e || !n ? n : n.bind(e);
}
class On {
  constructor(e, t, r) {
    this.name = e, this.init = zi(t.init, r), this.apply = zi(t.apply, r);
  }
}
new On("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new On("selection", {
  init(n, e) {
    return n.selection || ke.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new On("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new On("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Yo = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Uo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Xo = (n, e, t) => {
  let r = Uo(n, t);
  if (!r)
    return !1;
  let i = ei(r);
  if (!i) {
    let s = r.blockRange(), l = s && tn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (ss(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Qt(o, "end") || be.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = lr(n.doc, r.before(s), r.after(s), Y.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Qt(o, "end") ? ke.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : be.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Ga = (n, e, t) => {
  let r = Uo(n, t);
  if (!r)
    return !1;
  let i = ei(r);
  return i ? Go(n, i, e) : !1;
}, Qa = (n, e, t) => {
  let r = Zo(n, t);
  if (!r)
    return !1;
  let i = ti(r);
  return i ? Go(n, i, e) : !1;
};
function Go(n, e, t) {
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
  let c = lr(n.doc, o, a, Y.empty);
  if (!c || c.from != o || c instanceof Ae && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(Je.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Qt(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Qo = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = ei(r);
  }
  let s = o && o.nodeBefore;
  return !s || !be.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(be.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function ei(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Zo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const es = (n, e, t) => {
  let r = Zo(n, t);
  if (!r)
    return !1;
  let i = ti(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (ss(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Qt(o, "start") || be.isSelectable(o))) {
    let s = lr(n.doc, r.before(), r.after(), Y.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Qt(o, "start") ? ke.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : be.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, ts = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = ti(r);
  }
  let s = o && o.nodeAfter;
  return !s || !be.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(be.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function ti(n) {
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
const Za = (n, e) => {
  let t = n.selection, r = t instanceof be, i;
  if (r) {
    if (t.node.isTextblock || !$t(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = sr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(be.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, ec = (n, e) => {
  let t = n.selection, r;
  if (t instanceof be) {
    if (t.node.isTextblock || !$t(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = sr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, tc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && tn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, ns = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function ni(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const nc = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = ni(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(ke.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, rs = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof st || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = ni(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Je.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, is = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (ut(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && tn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function rc(n) {
  return (e, t) => {
    if (e.selection instanceof be && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !ut(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Je || e.selection instanceof st) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = ni(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let f = i.pos, d = ut(r.doc, f, s.length, s);
    if (d || (s[0] = a ? { type: a } : null, d = ut(r.doc, f, s.length, s)), !d)
      return !1;
    if (r.split(f, s.length, s), !c && u && i.node(l).type != a) {
      let h = r.mapping.slice(o), p = h.map(i.before(l)), g = r.doc.resolve(p);
      a && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const ic = rc(), oc = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(be.create(n.doc, i))), !0);
};
function sc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || $t(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function ss(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && sc(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, p = O.empty;
      for (let v = s.length - 1; v >= 0; v--)
        p = O.from(s[v].create(null, p));
      p = O.from(i.copy(p));
      let g = n.tr.step(new Oe(e.pos - 1, h, e.pos, h, new Y(p, 1, 0), s.length, !0)), x = g.doc.resolve(h + 2 * s.length);
      x.nodeAfter && x.nodeAfter.type == i.type && $t(g.doc, x.pos) && g.join(x.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : ke.findFrom(e, 1), f = u && u.$from.blockRange(u.$to), d = f && tn(f);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(f, d).scrollIntoView()), !0;
  if (c && Qt(o, "start", !0) && Qt(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, x = 1;
    for (; !g.isTextblock; g = g.firstChild)
      x++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let v = O.empty;
        for (let T = p.length - 1; T >= 0; T--)
          v = O.from(p[T].copy(v));
        let M = n.tr.step(new Oe(e.pos - p.length, e.pos + o.nodeSize, e.pos + x, e.pos + o.nodeSize - x, new Y(v, p.length, 0), 0, !0));
        t(M.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function ls(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Je.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const lc = ls(-1), ac = ls(1);
function cc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Ho(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function $i(n, e = null) {
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
function ri(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
ri(Yo, Xo, Qo);
ri(Yo, es, ts);
ri(ns, rs, is, ic);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function uc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return dc(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function dc(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new Kn(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new Kn(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Ho(o, t, r, e);
  return l ? (n && fc(n, e, l, i, t), !0) : !1;
}
function fc(n, e, t, r, i) {
  let o = O.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = O.from(t[u].type.create(t[u].attrs, o));
  n.step(new Oe(e.start - (r ? 2 : 0), e.end, e.start, e.end, new Y(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, f = e.endIndex, d = !0; u < f; u++, d = !1)
    !d && ut(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function hc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? pc(e, t, n, o) : mc(e, t, o) : !0 : !1;
  };
}
function pc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Oe(o - 1, s, o, s, new Y(O.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Kn(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = tn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return $t(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function mc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, g = t.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? O.empty : O.from(i))))
    return !1;
  let f = o.pos, d = f + s.nodeSize;
  return r.step(new Oe(f - (l ? 1 : 0), d + (a ? 1 : 0), f + 1, d - 1, new Y((l ? O.empty : O.from(i.copy(O.empty))).append(a ? O.empty : O.from(i.copy(O.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function gc(n) {
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
      let c = a.lastChild && a.lastChild.type == l.type, u = O.from(c ? n.create() : null), f = new Y(O.from(n.create(null, O.from(l.type.create(null, u)))), c ? 3 : 1, 0), d = o.start, h = o.end;
      t(e.tr.step(new Oe(d - (c ? 3 : 1), h, d, h, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function as(n) {
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
var yc = class cs {
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
        const x = this.buildProps(c, t), v = h(...g)(x);
        return l.push(v), f;
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
    const e = cs.createFakeChain();
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
      state: as({
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
const xc = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), bc = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), vc = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText) return;
      const { doc: c, mapping: u } = e, f = c.resolve(u.map(a)), d = c.resolve(u.map(a + l.nodeSize)), h = f.blockRange(d);
      if (!h) return;
      const p = tn(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(h.start, g);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, wc = (n) => (e) => n(e), kc = () => ({ state: n, dispatch: e }) => rs(n, e), Sc = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Qe(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Nc = () => ({ tr: n, dispatch: e }) => {
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
function Fe(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Tc = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Fe(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), a = o.after(s);
      e.delete(l, a).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, Cc = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Ec = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Di = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Ec(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Mc = (n, e, t) => ({
  from: Di(n, t, "left"),
  to: Di(e, t, "right")
}), Rc = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = Mc(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(Qe.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Ac = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Ic = () => ({ state: n, dispatch: e }) => nc(n, e);
function zc(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Xn(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : zc(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function us(n, e, t = {}) {
  return n.find((r) => r.type === e && Xn(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Oi(n, e, t = {}) {
  return !!us(n, e, t);
}
function ds(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((c) => c.type === e);
    a && (t = a.attrs);
  }
  if (!us([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Oi([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Oi([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function bt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const $c = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = bt(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const f = ds(a, o, e);
    if (f && f.from <= c && f.to >= u) {
      const d = Qe.create(s, f.from, f.to);
      t.setSelection(d);
    }
  }
  return !0;
}, Dc = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function fs(n) {
  return n instanceof Qe;
}
function Nt(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Oc(n, e = null) {
  if (!e) return null;
  const t = Kt.atStart(n), r = Kt.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Qe.create(n, Nt(0, i, o), Nt(n.content.size, i, o)) : Qe.create(n, Nt(e, i, o), Nt(e, i, o));
}
function Li() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Gn() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Lc() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const Pc = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (Gn() || Li()) && r.dom.focus(), Lc() && !Gn() && !Li() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !fs(t.state.selection))
    return s(), !0;
  const l = Oc(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Bc = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), Fc = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), hs = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && hs(r);
  }
  return n;
};
function Ln(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return hs(t);
}
function ps(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Zt(n, e, t) {
  if (ps(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return O.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Zt("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new va({
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
      if (t.slice ? Yt.fromSchema(a).parseSlice(Ln(n), t.parseOptions) : Yt.fromSchema(a).parse(Ln(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Yt.fromSchema(e);
    return t.slice ? o.parseSlice(Ln(n), t.parseOptions).content : o.parse(Ln(n), t.parseOptions);
  }
  return Zt("", e, t);
}
function ms(n) {
  return !("type" in n);
}
function gs(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof Ae || i instanceof Oe)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Kt.near(n.doc.resolve(s), t));
}
const Hc = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const a = (x) => {
      o.emit("contentError", {
        editor: o,
        error: x,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, c = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      Zt(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (x) {
      a(x);
    }
    try {
      var s;
      l = Zt(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (x) {
      return a(x), !1;
    }
    let { from: u, to: f } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, d = !0, h = !0;
    const p = ms(l) ? l.content : [l];
    if (p.forEach((x) => {
      x.check(), d = d ? x.isText && x.marks.length === 0 : !1, h = h ? x.isBlock : !1;
    }), u === f && h) {
      const { parent: x } = r.doc.resolve(u);
      x.isTextblock && !x.type.spec.code && !x.childCount && (u -= 1, f += 1);
    }
    let g;
    if (d)
      Array.isArray(e) ? g = e.map((x) => x.text || "").join("") : ps(e) ? g = p.map((x) => {
        var v;
        return (v = x.text) !== null && v !== void 0 ? v : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, f);
    else {
      g = O.from(p);
      const x = r.doc.resolve(u), v = x.node(), M = x.parentOffset === 0, T = v.isText || v.isTextblock, k = v.content.size > 0;
      M && T && k && h && (u = Math.max(0, u - 1)), r.replaceWith(u, f, p);
    }
    t.updateSelection && gs(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function ys(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const _c = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const c = ys(a.parent.contentMatchAt(a.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), f = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let d;
  if (s) {
    const h = Zt(s, r.schema);
    d = c.createAndFill(f, h);
  } else d = c.createAndFill(f);
  return d ? (t && (e.insert(a.pos, d), l && gs(e, e.steps.length - 1, -1)), !0) : !1;
}, Wc = () => ({ state: n, dispatch: e }) => Za(n, e), jc = () => ({ state: n, dispatch: e }) => ec(n, e), qc = () => ({ state: n, dispatch: e }) => Xo(n, e), Jc = () => ({ state: n, dispatch: e }) => es(n, e), Kc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = sr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Vc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = sr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Yc = () => ({ state: n, dispatch: e }) => Ga(n, e), Uc = () => ({ state: n, dispatch: e }) => Qa(n, e);
function xs() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Xc(n) {
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
      Gn() || xs() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const Gc = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Xc(n).split(/-(?!$)/), s = o.find((c) => ![
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
function ii(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Fe(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, f) => {
    if (u.isText) return;
    const d = Math.max(r, f), h = Math.min(i, f + u.nodeSize);
    l.push({
      node: u,
      from: d,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Xn(u.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, f) => u + f.to - f.from, 0) >= a;
}
const Qc = (n, e = {}) => ({ state: t, dispatch: r }) => ii(t, Fe(n, t.schema), e) ? tc(t, r) : !1, Zc = () => ({ state: n, dispatch: e }) => is(n, e), eu = (n) => ({ state: e, dispatch: t }) => {
  const r = Fe(n, e.schema);
  return hc(r)(e, t);
}, tu = () => ({ state: n, dispatch: e }) => ns(n, e);
function bs(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function Pi(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const nu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = bs(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Fe(n, r.schema)), l === "mark" && (s = bt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, f) => {
      o && o === u.type && (a = !0, i && t.setNodeMarkup(f, void 0, Pi(u.attrs, e))), s && u.marks.length && u.marks.forEach((d) => {
        s === d.type && (a = !0, i && t.addMark(f, f + u.nodeSize, s.create(Pi(d.attrs, e))));
      });
    });
  }), a;
}, ru = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), iu = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Us(n.doc);
    n.setSelection(t);
  }
  return !0;
}, ou = () => ({ state: n, dispatch: e }) => Qo(n, e), su = () => ({ state: n, dispatch: e }) => ts(n, e), lu = () => ({ state: n, dispatch: e }) => oc(n, e), au = () => ({ state: n, dispatch: e }) => ac(n, e), cu = () => ({ state: n, dispatch: e }) => lc(n, e);
function uu(n, e, t = {}, r = {}) {
  return Zt(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const du = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const c = uu(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = ms(c) ? c.content : [c];
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
function fu(n, e) {
  const t = bt(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function hu(n, e) {
  const t = new Ya(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function pu(n, e) {
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
function oi(n) {
  return (e) => pu(e.$from, n);
}
function yn(n, e, t) {
  return n.config[e] === void 0 && n.parent ? yn(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? yn(n.parent, e, t) : null
  }) : n.config[e];
}
function mu(n) {
  return typeof n == "function";
}
function Dr(n, e = void 0, ...t) {
  return mu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function vs(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function gu(n, e, t) {
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
function yu(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function xu(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function bu(n) {
  const e = xu(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function vu(n) {
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
  }), bu(r);
}
function Hn(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function wu(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? bt(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Xn(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: f }) => {
    const d = u.pos, h = f.pos;
    n.doc.nodesBetween(d, h, (p, g) => {
      if (o && p.inlineContent && !p.type.allowsMarkType(o)) return !1;
      if (!p.isText && !p.marks.length) return;
      const x = Math.max(d, g), v = Math.min(h, g + p.nodeSize), M = v - x;
      s += M, l.push(...p.marks.map((T) => ({
        mark: T,
        from: x,
        to: v
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Xn(u.mark.attrs, t, { strict: !1 })).reduce((u, f) => u + f.to - f.from, 0), c = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, f) => u + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function vr(n, e) {
  const { nodeExtensions: t } = vs(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Dr(yn(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function ws(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (ws(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function ku(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (fs(r) && (i = r.$cursor), i) {
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
        const h = !d || d.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
const Su = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = bt(n, r.schema);
  if (i)
    if (s) {
      const c = fu(r, a);
      t.addStoredMark(a.create({
        ...c,
        ...e
      }));
    } else l.forEach((c) => {
      const u = c.$from.pos, f = c.$to.pos;
      r.doc.nodesBetween(u, f, (d, h) => {
        const p = Math.max(h, u), g = Math.min(h + d.nodeSize, f);
        d.marks.find((x) => x.type === a) ? d.marks.forEach((x) => {
          a === x.type && t.addMark(p, g, a.create({
            ...x.attrs,
            ...e
          }));
        }) : t.addMark(p, g, a.create(e));
      });
    });
  return ku(r, t, a);
}, Nu = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Tu = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Fe(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => $i(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => $i(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Cu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Nt(n, 0, r.content.size), o = Xt.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Eu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, Mu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Qe.atStart(r).from, l = Qe.atEnd(r).to, a = Nt(i, s, l), c = Nt(o, s, l), u = Qe.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, Ru = (n) => ({ state: e, dispatch: t }) => {
  const r = Fe(n, e.schema);
  return gc(r)(e, t);
};
function Bi(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Au = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = Hn(c, l.node().type.name, l.node().attrs);
  if (o instanceof Xt && o.node.isBlock)
    return !l.parentOffset || !ut(s, l.pos) ? !1 : (r && (n && Bi(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const f = a.parentOffset === a.parent.content.size, d = l.depth === 0 ? void 0 : ys(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = f && d ? [{
    type: d,
    attrs: u
  }] : void 0, p = ut(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && ut(e.doc, e.mapping.map(l.pos), 1, d ? [{ type: d }] : void 0) && (p = !0, h = d ? [{
    type: d,
    attrs: u
  }] : void 0), r) {
    if (p && (o instanceof Qe && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), d && !f && !l.parentOffset && l.parent.type !== d)) {
      const g = e.mapping.map(l.before()), x = e.doc.resolve(g);
      l.node(-1).canReplaceWith(x.index(), x.index() + 1, d) && e.setNodeMarkup(e.mapping.map(l.before()), d);
    }
    n && Bi(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, Iu = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Fe(n, r.schema), { $from: l, $to: a } = r.selection, c = r.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const f = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var d;
      let v = O.empty;
      const M = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let W = l.depth - M; W >= l.depth - 3; W -= 1) v = O.from(l.node(W).copy(v));
      const T = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, k = {
        ...Hn(f, l.node().type.name, l.node().attrs),
        ...e
      }, E = ((d = s.contentMatch.defaultType) === null || d === void 0 ? void 0 : d.createAndFill(k)) || void 0;
      v = v.append(O.from(s.createAndFill(null, E) || void 0));
      const C = l.before(l.depth - (M - 1));
      t.replace(C, l.after(-T), new Y(v, 4 - M, 0));
      let D = -1;
      t.doc.nodesBetween(C, t.doc.content.size, (W, w) => {
        if (D > -1) return !1;
        W.isTextblock && W.content.size === 0 && (D = w + 1);
      }), D > -1 && t.setSelection(Qe.near(t.doc.resolve(D))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, p = {
    ...Hn(f, u.type.name, u.attrs),
    ...e
  }, g = {
    ...Hn(f, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const x = h ? [{
    type: s,
    attrs: p
  }, {
    type: h,
    attrs: g
  }] : [{
    type: s,
    attrs: p
  }];
  if (!ut(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: v, storedMarks: M } = r, { splittableMarks: T } = o.extensionManager, k = M || v.$to.parentOffset && v.$from.marks();
    if (t.split(l.pos, 2, x).scrollIntoView(), !k || !i) return !0;
    const E = k.filter((C) => T.includes(C.type.name));
    t.ensureMarks(E);
  }
  return !0;
};
function Fi(n) {
  return !n || n === "1" ? null : n;
}
function ks(n, e) {
  return Fi(n) === Fi(e);
}
const wr = (n, e) => {
  const t = oi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && $t(n.doc, t.pos)) || !ks(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, kr = (n, e) => {
  const t = oi((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && $t(n.doc, r)) || !ks(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function zu(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Qe.between(r, i);
}
const $u = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: f, splittableMarks: d } = i.extensionManager, h = Fe(n, s.schema), p = Fe(e, s.schema), { selection: g, storedMarks: x } = s, { $from: v, $to: M } = g, T = v.blockRange(M), k = x || g.$to.parentOffset && g.$from.marks();
  if (!T) return !1;
  const E = oi((H) => vr(H.type.name, f))(g), C = g.from === 0 && g.to === s.doc.content.size, D = s.doc.content.content, W = D.length === 1 ? D[0] : null, w = C && W && vr(W.type.name, f) ? {
    node: W,
    pos: 0
  } : null, F = E ?? w, I = !!E && T.depth >= 1 && T.depth - E.depth <= 1, j = !!w;
  if ((I || j) && F) {
    if (F.node.type === h)
      return C && j ? a().command(({ tr: H, dispatch: V }) => {
        const K = zu(H);
        return K ? (H.setSelection(K), V && V(H), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (vr(F.node.type.name, f) && h.validContent(F.node.content)) return a().command(() => (o.setNodeMarkup(F.pos, h), !0)).command(() => wr(o, h)).command(() => kr(o, h)).run();
  }
  return !t || !k || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => wr(o, h)).command(() => kr(o, h)).run() : a().command(() => {
    const H = u().wrapInList(h, r), V = k.filter((K) => d.includes(K.type.name));
    return o.ensureMarks(V), H ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => wr(o, h)).command(() => kr(o, h)).run();
}, Du = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = bt(n, r.schema);
  return wu(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Ou = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Fe(n, r.schema), s = Fe(e, r.schema), l = ii(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, Lu = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Fe(n, t.schema);
  return ii(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Pu = () => ({ state: n, dispatch: e }) => {
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
}, Bu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, Fu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = bt(n, r.schema), { $from: a, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var f;
    let { from: d, to: h } = s;
    const p = ds(a, l, (f = a.marks().find((g) => g.type === l)) === null || f === void 0 ? void 0 : f.attrs);
    p && (d = p.from, h = p.to), t.removeMark(d, h, l);
  } else u.forEach((d) => {
    t.removeMark(d.$from.pos, d.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, Hu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText) return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, _u = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = bs(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Fe(n, r.schema)), l === "mark" && (s = bt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, f = c.$to.pos;
    let d, h, p, g;
    t.selection.empty ? r.doc.nodesBetween(u, f, (x, v) => {
      o && o === x.type && (a = !0, p = Math.max(v, u), g = Math.min(v + x.nodeSize, f), d = v, h = x);
    }) : r.doc.nodesBetween(u, f, (x, v) => {
      v < u && o && o === x.type && (a = !0, p = Math.max(v, u), g = Math.min(v + x.nodeSize, f), d = v, h = x), v >= u && v <= f && (o && o === x.type && (a = !0, i && t.setNodeMarkup(v, void 0, {
        ...x.attrs,
        ...e
      })), s && x.marks.length && x.marks.forEach((M) => {
        if (s === M.type && (a = !0, i)) {
          const T = Math.max(v, u), k = Math.min(v + x.nodeSize, f);
          t.addMark(T, k, s.create({
            ...M.attrs,
            ...e
          }));
        }
      }));
    }), h && (d !== void 0 && i && t.setNodeMarkup(d, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((x) => {
      s === x.type && i && t.addMark(p, g, s.create({
        ...x.attrs,
        ...e
      }));
    }));
  }), a;
}, Wu = new lt("__tiptap_decorations__"), ju = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Wu, {
  type: "force",
  name: n
}), !0), qu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Fe(n, t.schema);
  return cc(i, e)(t, r);
}, Ju = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Fe(n, t.schema);
  return uc(i, e)(t, r);
};
var Ku = /* @__PURE__ */ ra({
  blur: () => xc,
  clearContent: () => bc,
  clearNodes: () => vc,
  command: () => wc,
  createParagraphNear: () => kc,
  cut: () => Sc,
  deleteCurrentNode: () => Nc,
  deleteNode: () => Tc,
  deleteRange: () => Cc,
  deleteSelection: () => Rc,
  enter: () => Ac,
  exitCode: () => Ic,
  extendMarkRange: () => $c,
  first: () => Dc,
  focus: () => Pc,
  forEach: () => Bc,
  insertContent: () => Fc,
  insertContentAt: () => Hc,
  insertDefaultBlock: () => _c,
  joinBackward: () => qc,
  joinDown: () => jc,
  joinForward: () => Jc,
  joinItemBackward: () => Kc,
  joinItemForward: () => Vc,
  joinTextblockBackward: () => Yc,
  joinTextblockForward: () => Uc,
  joinUp: () => Wc,
  keyboardShortcut: () => Gc,
  lift: () => Qc,
  liftEmptyBlock: () => Zc,
  liftListItem: () => eu,
  newlineInCode: () => tu,
  resetAttributes: () => nu,
  scrollIntoView: () => ru,
  selectAll: () => iu,
  selectNodeBackward: () => ou,
  selectNodeForward: () => su,
  selectParentNode: () => lu,
  selectTextblockEnd: () => au,
  selectTextblockStart: () => cu,
  setContent: () => du,
  setMark: () => Su,
  setMeta: () => Nu,
  setNode: () => Tu,
  setNodeSelection: () => Cu,
  setTextDirection: () => Eu,
  setTextSelection: () => Mu,
  sinkListItem: () => Ru,
  splitBlock: () => Au,
  splitListItem: () => Iu,
  toggleList: () => $u,
  toggleMark: () => Du,
  toggleNode: () => Ou,
  toggleWrap: () => Lu,
  undoInputRule: () => Pu,
  unsetAllMarks: () => Bu,
  unsetMark: () => Fu,
  unsetTextDirection: () => Hu,
  updateAttributes: () => _u,
  updateDecorations: () => ju,
  wrapIn: () => qu,
  wrapInList: () => Ju
});
typeof process < "u" && process.env.NODE_ENV;
function Vu(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function Pn(n) {
  return Vu(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function Ss(n, e) {
  const t = { ...n };
  return Pn(n) && Pn(e) && Object.keys(e).forEach((r) => {
    Pn(e[r]) && Pn(n[r]) ? t[r] = Ss(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Ns = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Dr(yn(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Dr(yn(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Ss(this.options, n)
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
}, Yu = class Ts extends Ns {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Ts(t);
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
}, Ze = class Cs extends Ns {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Cs(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
Ze.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new dt({
      key: new lt("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = yu(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((a, c) => a.$from.pos - c.$from.pos).map(({ $from: a, $to: c }) => gu(r, {
          from: a.pos,
          to: c.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Ze.create({
  name: "commands",
  addCommands() {
    return { ...Ku };
  }
});
Ze.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const a = hu(n.before, [n, ...e]);
      vu(a).forEach((u) => {
        a.mapping.mapResult(u.oldRange.from).deletedAfter && a.mapping.mapResult(u.oldRange.to).deletedBefore && a.before.nodesBetween(u.oldRange.from, u.oldRange.to, (f, d) => {
          const h = d + f.nodeSize - 2, p = u.oldRange.from <= d && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: f,
            from: d,
            to: h,
            newFrom: a.mapping.map(d),
            newTo: a.mapping.map(h),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !p,
            editor: this.editor,
            transaction: n,
            combinedTransform: a
          });
        });
      });
      const c = a.mapping;
      a.steps.forEach((u, f) => {
        if (u instanceof ot) {
          var d, h;
          const p = c.slice(f).map(u.from, -1), g = c.slice(f).map(u.to), x = c.invert().map(p, -1), v = c.invert().map(g), M = p > 0 ? (d = a.doc.nodeAt(p - 1)) === null || d === void 0 ? void 0 : d.marks.some((k) => k.eq(u.mark)) : !1, T = (h = a.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((k) => k.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: x,
              to: v
            },
            newRange: {
              from: p,
              to: g
            },
            partial: !!(T || M),
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
Ze.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new dt({
      key: new lt("tiptapDrop"),
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
Ze.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new dt({
      key: new lt("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Uu = new lt("focusEvents");
Ze.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new dt({
      key: Uu,
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
Ze.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: f } = a, { pos: d, parent: h } = f, p = f.parent.isTextblock && d > 0 ? l.doc.resolve(d - 1) : f, g = p.parent.type.spec.isolating, x = f.pos - f.parentOffset, v = g && p.parent.childCount === 1 ? x === f.pos : Kt.atStart(c).from === d;
        return !u || !h.type.isTextblock || h.textContent.length || !v || v && f.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return Gn() || xs() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new dt({
      key: new lt("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = Kt.atStart(e.doc).from, c = Kt.atEnd(e.doc).to;
        if (o || !(s === a && l === c) || !ws(t.doc)) return;
        const u = t.tr, f = as({
          state: t,
          transaction: u
        }), { commands: d } = new yc({
          editor: this.editor,
          state: f
        });
        if (d.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
Ze.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new dt({
      key: new lt("tiptapPaste"),
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
Ze.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new dt({
      key: new lt("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Ze.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = vs(this.extensions);
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
    return [new dt({
      key: new lt("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Xu = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Gu = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Qu = /^(https?:\/\/|mailto:)/i;
function Zu(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Gu.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function Or(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(Or(a));
    return l;
  };
  if (!Xu.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Qu.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Zu(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(Or(l));
  return i;
}
function Es(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function ed(n) {
  const e = Es(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Or(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Sf(n) {
  const e = Es(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Nf(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function td(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Hi(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const nd = { text: "#52525b" }, rd = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var d;
  const s = n.attrs.field ?? "", l = t.options, a = ((d = l.resolve) == null ? void 0 : d.call(l, s)) ?? null, c = (a == null ? void 0 : a.color) ?? nd, u = (a == null ? void 0 : a.label) ?? `{{${s}}}`, f = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ m(
    Ks,
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
        var v;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof o == "function" ? o() : null;
        if (p == null) return;
        const g = i.state.doc.resolve(p), x = g.nodeAfter;
        x && Xt.isSelectable(x) && i.dispatch(i.state.tr.setSelection(new Xt(g))), (v = l.onTokenClick) == null || v.call(l, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: f ? /* @__PURE__ */ m("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, id = sl.extend({
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
    return Js(rd);
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
    return ["span", qs({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), od = 240, sd = 280, ld = ({ props: n, onApi: e }) => {
  const t = nr(), r = S(e);
  r.current = e, ne(() => {
    r.current(t);
  }, [t]);
  const i = S(null);
  ne(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), ne(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = tr();
  return /* @__PURE__ */ m(wn.Provider, { value: t, children: /* @__PURE__ */ m(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: sd, maxHeight: od },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ m("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ m(
        ad,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, ad = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = uo({
    label: () => n.label,
    activate: t
  }), s = Te(), l = { padding: `${L(8, 12, s)}px ${L(12, 16, s)}px`, fontSize: L(12, 14, s) };
  return /* @__PURE__ */ R(
    "div",
    {
      role: "option",
      style: l,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${e.itemDefault} ${i ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: t,
      children: [
        /* @__PURE__ */ m("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ m("span", { className: "block w-2 h-2 rounded-full", style: { background: n.color.text } }) }),
        /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: n.label }),
        n.group && /* @__PURE__ */ m("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: n.color.text }, children: n.group })
      ]
    }
  );
}, _i = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ m(ld, { props: r, onApi: (i) => {
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
      const o = ll(i);
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
}, cd = Yu.create({
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
}), _n = new lt("retainedSelectionHighlight"), ud = Ze.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new dt({
        key: _n,
        state: {
          init: () => ({ held: !1, decorations: En.empty }),
          apply(n, e) {
            const t = n.getMeta(_n), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: En.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? En.empty : En.create(n.doc, [Xs.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = _n.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), Tf = {
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
function Ms(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function dd(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Ms(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const fd = Re.forwardRef(({
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
  const d = S(s);
  d.current = s;
  const h = S(l);
  h.current = l;
  const p = S(a);
  p.current = a;
  const g = S(c);
  g.current = c;
  const x = S(u);
  x.current = u;
  const v = S(null), M = S(null), T = S(e);
  T.current = e;
  const k = S(r);
  k.current = r;
  const E = S(o);
  E.current = o;
  const C = S(null), D = (j) => {
    var q;
    const H = j.getAttributes("textStyle"), V = j.getAttributes("reportTextStyle"), { from: K, to: N, empty: J } = j.state.selection;
    let Q = !1, Z = !1, le = !1;
    if (!J) {
      const X = /* @__PURE__ */ new Set(), z = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Set();
      j.state.doc.nodesBetween(K, N, (we) => {
        if (!we.isText) return;
        const ae = we.marks.find(($) => $.type.name === "textStyle");
        X.add((ae == null ? void 0 : ae.attrs.fontFamily) || ""), z.add((ae == null ? void 0 : ae.attrs.fontSize) || "");
        const Ce = we.marks.find(($) => $.type.name === "reportTextStyle");
        ee.add((Ce == null ? void 0 : Ce.attrs.styleId) || "");
      }), Q = X.size > 1, Z = z.size > 1, le = ee.size > 1;
    }
    const G = {
      bold: j.isActive("bold"),
      italic: j.isActive("italic"),
      underline: j.isActive("underline"),
      strike: j.isActive("strike"),
      link: j.isActive("link"),
      color: H.color || "",
      fontFamily: H.fontFamily || "",
      fontSize: H.fontSize || "",
      textStyle: V.styleId || "",
      hasSelection: !J,
      fontFamilyMixed: Q,
      fontSizeMixed: Z,
      textStyleMixed: le
    }, _ = C.current;
    _ && _.bold === G.bold && _.italic === G.italic && _.underline === G.underline && _.strike === G.strike && _.link === G.link && _.color === G.color && _.fontFamily === G.fontFamily && _.fontSize === G.fontSize && _.textStyle === G.textStyle && _.hasSelection === G.hasSelection && _.fontFamilyMixed === G.fontFamilyMixed && _.fontSizeMixed === G.fontSizeMixed && _.textStyleMixed === G.textStyleMixed || (C.current = G, (q = E.current) == null || q.call(E, G));
  }, W = (j) => {
    var J;
    const H = j.state.selection;
    let V = null;
    H instanceof Xt && H.node.type.name === "token" ? (V = { key: H.node.attrs.field ?? "", pos: H.from }, v.current = H.from) : v.current != null && (v.current = j.state.tr.mapping.map(v.current));
    const K = M.current, N = K && V && K.key === V.key && K.pos === V.pos;
    !K && !V || N || (M.current = V, (J = x.current) == null || J.call(x, V));
  }, w = (j) => {
    const H = ed(td(j));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(H) ? "" : H;
  }, F = Re.useMemo(() => {
    const j = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: K }) => {
        var N;
        return ((N = h.current) == null ? void 0 : N.call(h, K)) ?? [];
      },
      command: ({ editor: K, range: N, props: J }) => {
        K.chain().focus().insertContentAt(N, { type: "token", attrs: { field: J.field } }).run();
      },
      render: _i
    }, H = id.configure({
      resolve: d.current ?? null,
      suggestion: j,
      onTokenClick: (K, N, J) => {
        var Q;
        v.current = J, (Q = g.current) == null || Q.call(g, K, N, J);
      }
    }), V = Ze.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          ol({
            pluginKey: new lt("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: K, range: N }) => Ms(K, N.from) != null,
            items: ({ editor: K, query: N }) => {
              var Q;
              const J = dd(K);
              return J ? ((Q = p.current) == null ? void 0 : Q.call(p, J.chipKey, N)) ?? [] : [];
            },
            command: ({ editor: K, range: N, props: J }) => {
              K.chain().focus().insertContentAt(N, { type: "token", attrs: { field: J.field } }).run();
            },
            render: _i
          })
        ];
      }
    });
    return [H, V];
  }, []), I = Vs({
    immediatelyRender: !1,
    extensions: [
      Gs,
      Qs.configure({ placeholder: t }),
      Zs,
      el,
      tl,
      cd,
      ud,
      nl,
      il,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      rl.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...F
    ],
    content: Hi(n || ""),
    editable: !r,
    onUpdate: ({ editor: j }) => {
      T.current(w(j.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: j }) => {
      D(j), W(j);
    }
  });
  return ne(() => {
    if (!I || I.isFocused) return;
    w(I.getHTML()) !== n && (C.current = null, I.commands.setContent(Hi(n || ""), { emitUpdate: !1 }), D(I));
  }, [n, I]), ne(() => {
    I && I.setEditable(!r);
  }, [r, I]), ne(() => {
    I && (C.current = null, D(I), W(I));
  }, [I]), As(f, () => ({
    exec: (j, H, V) => {
      if (!I || k.current) return;
      const K = I.chain(), N = (V == null ? void 0 : V.focus) === !1 ? K : K.focus();
      switch (j) {
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
          H && N.setColor(H).run();
          break;
        case "unsetColor":
          N.unsetColor().run();
          break;
        case "fontFamily":
          H && N.setFontFamily(H).run();
          break;
        case "unsetFontFamily":
          N.unsetFontFamily().run();
          break;
        case "fontSize":
          H && N.setFontSize(H).run();
          break;
        case "unsetFontSize":
          N.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          H && N.setMark("reportTextStyle", { styleId: H }).unsetFontFamily().unsetFontSize().run();
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
          H && N.extendMarkRange("link").setLink({ href: H }).run();
          break;
        case "unlink":
          N.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (j) => I == null ? void 0 : I.commands.focus(j),
    insertToken: (j) => {
      !I || k.current || I.chain().focus().insertContent({ type: "token", attrs: { field: j } }).run();
    },
    replaceToken: (j) => {
      if (!I || k.current) return;
      const H = v.current;
      H != null && I.commands.command(({ tr: V }) => {
        const K = V.doc.nodeAt(H);
        if (!K || K.type.name !== "token") return !1;
        V.setNodeMarkup(H, void 0, { field: j });
        const N = V.doc.resolve(H);
        return N.nodeAfter && N.nodeAfter.type.name === "token" && V.setSelection(new Xt(N)), !0;
      });
    },
    holdSelectionHighlight: (j) => {
      !I || I.isDestroyed || I.view.dispatch(I.state.tr.setMeta(_n, { held: j }));
    }
  }), [I]), /* @__PURE__ */ m(Ys, { editor: I, className: `richtext-editor ${i || ""}` });
});
fd.displayName = "RichTextEditor";
const hd = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], pd = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Wi = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ m("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ m("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), md = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = te(!1);
  return /* @__PURE__ */ m(
    rr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ R("button", { type: "button", disabled: e, className: `${ea} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ m("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ m("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ m(xn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: hd.map((s) => /* @__PURE__ */ m(kl, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ m(Lr, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ m("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, gd = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = te(!1), o = ir(), [s, l] = te(""), a = () => {
    var u;
    const c = s.trim();
    c && ((u = n.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ m(
    rr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ m(
        rt,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ m(Bs, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ R("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ m(
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
            className: Ql + " w-full"
          }
        ),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ m(rt, { theme: "dark", onClick: a, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ m(
            rt,
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
}, Cf = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: a = !0 }) => {
  const [c, u] = te(!1), f = (x, v) => {
    var M;
    return (M = n.current) == null ? void 0 : M.exec(x, v);
  }, d = ir(), h = (x) => !!(r != null && r[x]), p = "flex items-center gap-1 shrink-0", g = a ? /* @__PURE__ */ m("div", { className: yo }) : null;
  return /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ R("div", { className: p, children: [
      /* @__PURE__ */ m(jt, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ m(rt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (x) => x.preventDefault(), onClick: () => f("bold"), style: { ...d.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ m(jt, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ m(rt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (x) => x.preventDefault(), onClick: () => f("italic"), style: { ...d.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ m(jt, { content: "Underline", children: /* @__PURE__ */ m(rt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (x) => x.preventDefault(), onClick: () => f("underline"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(Os, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ m(jt, { content: "Strikethrough", children: /* @__PURE__ */ m(rt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (x) => x.preventDefault(), onClick: () => f("strikeThrough"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(Ls, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(gd, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(
      rr,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ R(rt, { theme: "dark", disabled: e, style: d.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ m("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ m(Wi, {}),
          /* @__PURE__ */ m(xn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => {
                f("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ m(Wi, { className: "w-3.5 h-3.5" })
            }
          ),
          pd.map((x) => /* @__PURE__ */ m(
            "button",
            {
              onClick: () => {
                f("foreColor", x), u(!1);
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
    (o || s || l) && /* @__PURE__ */ R(Ke, { children: [
      g,
      /* @__PURE__ */ R("div", { className: p, children: [
        o && /* @__PURE__ */ m(md, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ m(jt, { content: "Clear formatting", children: /* @__PURE__ */ m(
          rt,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (x) => x.preventDefault(),
            onClick: () => f("clearFormatting"),
            style: { ...d.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ m(Ps, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ R(Ke, { children: [
      g,
      /* @__PURE__ */ m("div", { className: p, children: i })
    ] })
  ] });
};
function si(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function yd(n, e, t, r, i) {
  return si(n + e * i, t, r);
}
const xd = 2;
function bd(n, e, t, r, i) {
  return si(n + Math.trunc(e / xd) * i, t, r);
}
const vd = 3;
function Ef({
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
  const [h, p] = te(null), [g, x] = te(!1), v = S(!1), M = S(null), T = S(null), k = S(null), E = Te(), C = mo(), D = c === void 0;
  ne(() => () => {
    var N;
    return (N = M.current) == null ? void 0 : N.call(M);
  }, []), it(() => {
    const N = k.current, J = T.current;
    !D && N && J && (J.style.color = getComputedStyle(N).color);
  }, [D, c]), ne(() => {
    v.current || p(null);
  }, [n]);
  const W = n ?? r, w = h !== null ? h : n != null ? String(n) : f ? "" : String(r), F = (N) => si(N, e, t), I = (N) => {
    const J = yd(W, N, e, t, o);
    J !== W && (v.current && p(String(J)), i(J));
  }, j = (N) => {
    if (l || s || N.pointerType !== "mouse" || N.button !== 0) return;
    const J = N.currentTarget, Q = N.clientY, Z = W;
    let le = Z, G = !1;
    const _ = (X) => {
      const z = Q - X.clientY;
      if (!G) {
        if (Math.abs(z) < vd) return;
        G = !0, J.blur(), J.style.userSelect = "none";
      }
      const ee = bd(Z, z, e, t, o);
      ee !== le && (le = ee, i(ee));
    }, q = () => {
      M.current = null, window.removeEventListener("pointermove", _), window.removeEventListener("pointerup", q), window.removeEventListener("pointercancel", q), J.style.userSelect = "", G && J.blur();
    };
    M.current = q, window.addEventListener("pointermove", _), window.addEventListener("pointerup", q), window.addEventListener("pointercancel", q);
  }, H = (N) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": N === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (N === 1 ? W >= t : W <= e),
    onPointerDown: (J) => J.preventDefault(),
    onClick: () => I(N)
  }), V = D ? L(22, 30, E) : L(16, 22, E), K = D ? L(14, 18, E) : L(11, 15, E);
  return /* @__PURE__ */ R(
    "span",
    {
      ref: T,
      className: `ui-number ${D ? "ui-number-box" : ""}`,
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ m(
          "input",
          {
            ref: k,
            type: "number",
            "aria-label": a,
            title: u,
            placeholder: f,
            value: w,
            readOnly: s,
            disabled: l,
            className: c ?? "ui-input w-20",
            style: {
              ...D ? { ...C, minHeight: L(30, 38, E) } : {},
              paddingRight: V + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              v.current = !0, x(!0);
            },
            onChange: (N) => {
              const J = N.target.value;
              p(J);
              const Q = parseInt(J, 10);
              J !== "" && !Number.isNaN(Q) && i(F(Q));
            },
            onBlur: () => {
              if (v.current = !1, x(!1), h === null) return;
              const N = parseInt(h, 10);
              Number.isNaN(N) || i(F(N)), p(null);
            },
            onKeyDown: (N) => {
              N.key === "Enter" && N.target.blur(), N.key === "Escape" && (p(null), N.target.blur()), !s && !l && (N.key === "ArrowUp" || N.key === "ArrowDown") && (N.preventDefault(), I(N.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: j
          }
        ),
        /* @__PURE__ */ R("span", { className: "ui-number-steppers", style: { width: V }, children: [
          /* @__PURE__ */ m("button", { ...H(1), className: "ui-number-step", children: /* @__PURE__ */ m(Fs, { style: { width: K, height: K } }) }),
          /* @__PURE__ */ m("button", { ...H(-1), className: "ui-number-step", children: /* @__PURE__ */ m(xn, { style: { width: K, height: K } }) })
        ] })
      ]
    }
  );
}
function Mf({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: c, children: u }) {
  const f = Te(), d = xt({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = L(14, 16, f), p = { width: h, height: h }, g = L(10, 12, f);
  return /* @__PURE__ */ R("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: d, children: [
      /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ m(Wn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }) : /* @__PURE__ */ m(xn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }),
            e && /* @__PURE__ */ m("span", { className: "text-[color:var(--ui-card-header-icon)] shrink-0 inline-flex", children: e }),
            /* @__PURE__ */ m("span", { className: "font-semibold text-[color:var(--ui-card-header-text)] truncate", children: n }),
            t && /* @__PURE__ */ m("span", { className: "ui-card-count shrink-0", style: { fontSize: g }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ m("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
function Rf({
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
  className: d = "",
  "aria-label": h
}) {
  const [p, g] = te(u), x = S(p);
  x.current = p;
  const v = S(null), M = S(null), T = S(null), k = oe((w) => {
    x.current !== w && (x.current = w, g(w), f == null || f(w));
  }, [f]), E = oe((w = !1) => {
    var F;
    k(!1), (F = M.current) == null || F.blur(), w && requestAnimationFrame(() => {
      var I;
      return (I = T.current) == null ? void 0 : I.focus();
    });
  }, [k]), C = oe(() => {
    k(!0), requestAnimationFrame(() => {
      const w = M.current;
      if (!w) return;
      w.focus();
      const F = w.value.length;
      w.setSelectionRange(F, F);
    });
  }, [k]);
  ne(() => {
    u && C();
  }, [u, C]), ne(() => {
    var I;
    if (!p) return;
    const w = ((I = v.current) == null ? void 0 : I.ownerDocument) ?? document, F = (j) => {
      var V;
      const H = j.target;
      H && ((V = v.current) != null && V.contains(H) || E());
    };
    return w.addEventListener("pointerdown", F, !0), () => w.removeEventListener("pointerdown", F, !0);
  }, [p, E]);
  const D = oe((w) => {
    var I;
    if (!p) return;
    const F = w.relatedTarget;
    F && ((I = v.current) != null && I.contains(F)) || E();
  }, [p, E]), W = oe((w) => {
    w.key === "Escape" && (w.preventDefault(), w.stopPropagation(), e(""), E(!0));
  }, [e, E]);
  return /* @__PURE__ */ R(
    "div",
    {
      ref: v,
      "data-morph-search": !0,
      "data-expanded": p ? "true" : "false",
      className: `relative inline-flex shrink-0 ${d}`,
      style: {
        width: p ? s : o,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      onBlur: D,
      children: [
        /* @__PURE__ */ m(
          "div",
          {
            className: `w-full origin-left ${p ? "opacity-0 pointer-events-none" : "opacity-100"} motion-reduce:transition-none`,
            style: {
              transform: p ? "scaleX(0.98)" : "scaleX(1)",
              transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
            },
            "aria-hidden": p,
            children: /* @__PURE__ */ m(
              rt,
              {
                ref: T,
                type: "button",
                variant: l,
                size: "minimal",
                theme: a,
                icon: r ?? /* @__PURE__ */ m(St, { className: "w-3.5 h-3.5" }),
                active: c,
                onClick: C,
                className: `w-full justify-start ${p ? "pointer-events-none" : ""}`,
                tabIndex: p ? -1 : 0,
                "aria-expanded": p,
                "aria-label": h || t,
                "data-morph-search-trigger": !0,
                children: /* @__PURE__ */ m("span", { className: "min-w-0 truncate", children: t })
              }
            )
          }
        ),
        /* @__PURE__ */ R(
          "div",
          {
            className: `absolute inset-0 origin-left ${p ? "opacity-100" : "opacity-0 pointer-events-none"} motion-reduce:transition-none`,
            style: {
              transform: p ? "scaleX(1)" : "scaleX(0.96)",
              transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
            },
            "aria-hidden": !p,
            children: [
              /* @__PURE__ */ m("span", { className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none", children: r ?? /* @__PURE__ */ m(St, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ m(
                "input",
                {
                  ref: M,
                  value: n,
                  onChange: (w) => e(w.target.value),
                  onKeyDown: W,
                  placeholder: i,
                  "aria-label": h || i,
                  tabIndex: p ? 0 : -1,
                  "data-morph-search-input": !0,
                  className: `${Er("sm")} w-full pl-7 pr-7`
                }
              ),
              n && /* @__PURE__ */ m(
                "button",
                {
                  type: "button",
                  "aria-label": "Clear",
                  tabIndex: p ? 0 : -1,
                  onClick: () => {
                    e(""), requestAnimationFrame(() => {
                      var w;
                      return (w = M.current) == null ? void 0 : w.focus();
                    });
                  },
                  className: "absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-700",
                  "data-morph-search-clear": !0,
                  children: /* @__PURE__ */ m(Et, { className: "w-3 h-3" })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function wd(n) {
  return n.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function kd(n, e, t) {
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
function Sd(n, e, t) {
  const r = wd(t), i = r.length > 0, o = new Map(e.map((c) => [c.key, c])), s = [];
  for (const c of n) {
    const { matched: u, detail: f } = kd(c, c.group ? o.get(c.group) : void 0, r);
    u && s.push({ item: c, detail: f });
  }
  const l = new Set(s.map((c) => c.item.group).filter(Boolean)), a = i ? e.filter((c) => l.has(c.key) || c.label.toLowerCase().includes(t.trim().toLowerCase())) : e;
  return { hits: s, visibleGroups: a, hasQuery: i };
}
function Nd(n) {
  var s;
  const { hits: e, visibleGroups: t, hasQuery: r } = Sd(n.items, n.groups, n.query), i = [];
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
function Af({
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
  browseExpanded: p = !1,
  groupExpandMode: g = "multiple",
  browseAll: x = !1,
  selectedId: v,
  autoFocus: M = !0,
  collapsedWidth: T = 128,
  expandedWidth: k = 288,
  panelWidth: E,
  maxMenuHeight: C = 420,
  theme: D = "light",
  morph: W = !0,
  emptyTitle: w,
  emptyHint: F,
  renderEmpty: I,
  emptyActions: j,
  leadingActions: H,
  hideLeadingOnEmpty: V = !1,
  footerActions: K
}) {
  const N = s !== void 0, [J, Q] = te(""), Z = N ? s : J, le = oe((b) => {
    N || Q(b), l == null || l(b);
  }, [N, l]), [G, _] = te(!1), [q, X] = te(t === "inline"), z = nt(() => e.map((b) => b.key).join("\0"), [e]), ee = nt(() => new Set(z ? z.split("\0") : []), [z]), [we, ae] = te(() => p ? ee : /* @__PURE__ */ new Set()), [Ce, $] = te(0), se = S(null), Ee = S(null), de = S(null), je = S(null), ce = Br(), Se = en(), ue = tr(), $e = Jr(), ve = lo(), [De, vt] = te({ top: 0, left: 0, maxH: 288, ready: !1 }), [Dt, Ot] = te(0);
  no({
    anchorRef: se,
    panelRef: je,
    open: G,
    maxHeight: C,
    onPosition: (b) => vt({ top: b.top, left: b.left, maxH: b.maxH, ready: b.ready })
  }), ne(() => {
    !G || !se.current || Ot(se.current.getBoundingClientRect().width);
  }, [G, q]);
  const Lt = er({
    visible: G,
    morph: W,
    anchor: () => {
      var b;
      return ((b = se.current) == null ? void 0 : b.getBoundingClientRect()) ?? null;
    },
    ref: je,
    cloneOnUnmount: !0
  }), ht = (j || []).map(
    (b) => typeof b.label == "function" ? b.label(Z) : b.label
  ), Ne = nt(
    () => Nd({
      items: n,
      groups: e,
      query: Z,
      browseGroups: d || p,
      browseAll: x,
      expandedGroups: we,
      emptyActionLabels: ht
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, Z, d, p, x, we, ht.join("\0")]
  ), Le = nt(
    () => (H || []).map((b, y) => ({
      kind: "action",
      label: typeof b.label == "function" ? b.label(Z) : b.label,
      actionIndex: y,
      source: "leading"
    })),
    [H, Z]
  ), et = nt(
    () => (K || []).map((b, y) => ({
      kind: "action",
      label: typeof b.label == "function" ? b.label(Z) : b.label,
      actionIndex: y,
      source: "footer"
    })),
    [K, Z]
  ), Pt = Ne.some((b) => b.kind === "empty"), Ve = Le.length > 0 && !(V && Pt), qe = Ve ? Le.length : 0, Xe = nt(
    () => [...Ve ? Le : [], ...Ne, ...et],
    [Ve, Le, Ne, et]
  ), P = !!c || h && !Z.trim(), U = nt(
    () => Xe.map((b, y) => ({ row: b, index: y })).filter((b) => !(b.row.kind === "empty" || b.row.kind === "item" && b.row.hidden || b.row.kind === "group" && !P)),
    [Xe, P]
  ), fe = (h || p) && !Z.trim(), ye = oe(() => {
    var b;
    _(!1), t === "expandable" && ((b = Ee.current) == null || b.blur(), X(!1), requestAnimationFrame(() => {
      var y;
      return (y = de.current) == null ? void 0 : y.focus();
    })), le(""), $(0), ae(p ? ee : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, le, p, ee]);
  ne(() => {
    if (Z.trim() || !p) {
      ae((b) => b.size ? /* @__PURE__ */ new Set() : b);
      return;
    }
    ae((b) => b.size === ee.size && [...ee].every((y) => b.has(y)) ? b : ee);
  }, [Z, p, ee]);
  const _e = oe((b) => {
    ae((y) => {
      const A = new Set(y);
      return A.has(b) ? A.delete(b) : (g === "single" && A.clear(), A.add(b)), A;
    });
  }, [g]), We = oe(() => {
    X(!0), _(!0), $(qe);
  }, [qe]);
  ne(() => {
    if (t !== "expandable" || !q || !G || !M) return;
    const b = requestAnimationFrame(() => {
      var y;
      return (y = Ee.current) == null ? void 0 : y.focus();
    });
    return () => cancelAnimationFrame(b);
  }, [t, q, G, M]), ne(() => {
    var A;
    if (!G) return;
    const b = ((A = se.current) == null ? void 0 : A.ownerDocument) ?? ce;
    if (!b) return;
    const y = (B) => {
      var ie, he;
      const re = B.target;
      re && ((ie = se.current) != null && ie.contains(re) || (he = je.current) != null && he.contains(re) || ye());
    };
    return b.addEventListener("pointerdown", y, !0), () => b.removeEventListener("pointerdown", y, !0);
  }, [G, ye, ce]);
  const Ye = oe((b) => {
    if (b.kind === "group") {
      c ? (c(b.group), f && ye()) : P && _e(b.group.key);
      return;
    }
    if (b.kind === "item") {
      a(b.hit.item), f && ye();
      return;
    }
    if (b.kind === "action") {
      const y = b.source === "leading" ? H : b.source === "footer" ? K : j, A = y == null ? void 0 : y[b.actionIndex];
      A && A.onClick(Z), f && ye();
    }
  }, [ye, f, j, K, P, H, a, c, Z, _e]), nn = (b) => {
    if (U.length === 0) return;
    const y = U.findIndex((B) => B.index === Ce), A = y < 0 ? 0 : (y + b + U.length) % U.length;
    $(U[A].index);
  }, rn = (b) => {
    if (b.key === "ArrowDown")
      b.preventDefault(), G ? nn(1) : We();
    else if (b.key === "ArrowUp")
      b.preventDefault(), nn(-1);
    else if ((b.key === "ArrowRight" || b.key === "ArrowLeft") && h && G && !Z.trim()) {
      const y = Xe[Ce];
      if ((y == null ? void 0 : y.kind) === "group") {
        const A = we.has(y.group.key);
        (b.key === "ArrowRight" || A) && (b.preventDefault(), _e(y.group.key));
      } else if ((y == null ? void 0 : y.kind) === "item" && b.key === "ArrowLeft" && y.hit.item.group) {
        b.preventDefault();
        const A = y.hit.item.group;
        we.has(A) && _e(A);
        const B = Xe.findIndex((re) => re.kind === "group" && re.group.key === A);
        B >= 0 && $(B);
      }
    } else if (b.key === "Enter") {
      b.preventDefault();
      const y = Xe[Ce] ?? Xe[0];
      y && Ye(y);
    } else b.key === "Escape" && (b.preventDefault(), ye());
  }, on = (b) => {
    t === "expandable" && !q || (le(b), G || _(!0));
  };
  ne(() => {
    const b = Ne.findIndex((y) => y.kind === "item");
    $(b >= 0 ? qe + b : qe);
  }, [Z]);
  const kn = /* @__PURE__ */ R("div", { className: "relative w-full", children: [
    /* @__PURE__ */ m(St, { className: "w-3.5 h-3.5 ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ m(
      "input",
      {
        ref: Ee,
        value: Z,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": G,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (b) => on(b.target.value),
        onFocus: () => {
          d && We();
        },
        onClick: () => {
          d && We();
        },
        onKeyDown: rn,
        placeholder: o,
        className: `${Er("sm")} w-full pl-8 pr-7`
      }
    ),
    Z && /* @__PURE__ */ m(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        className: "ui-icon-btn absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5",
        onPointerDown: (b) => b.preventDefault(),
        onClick: () => {
          le(""), G || We();
        },
        children: /* @__PURE__ */ m(Et, { className: "w-3.5 h-3.5" })
      }
    )
  ] }), Sn = /* @__PURE__ */ R("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ m(St, { className: "w-3.5 h-3.5 ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ m(
      "input",
      {
        ref: Ee,
        value: Z,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": G,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (b) => on(b.target.value),
        onFocus: () => {
          d && q && We();
        },
        onClick: () => {
          d && q && We();
        },
        onKeyDown: rn,
        placeholder: o,
        tabIndex: q ? 0 : -1,
        className: `${Er("sm")} h-full w-full pl-8 pr-7`
      }
    ),
    Z && /* @__PURE__ */ m(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        className: "ui-icon-btn absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5",
        onPointerDown: (b) => b.preventDefault(),
        onClick: () => {
          le(""), !G && q && We();
        },
        children: /* @__PURE__ */ m(Et, { className: "w-3.5 h-3.5" })
      }
    )
  ] });
  ne(() => {
    if (!G || !v) return;
    const b = requestAnimationFrame(() => {
      var A;
      const y = Array.from(((A = je.current) == null ? void 0 : A.querySelectorAll("[data-search-item]")) ?? []).find((B) => B.getAttribute("data-search-item") === v);
      y == null || y.scrollIntoView({ block: "center" });
    });
    return () => cancelAnimationFrame(b);
  }, [G, v]);
  const wt = (b, y) => {
    const A = Ce === y, B = v !== void 0 && b.hit.item.id === v;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": B,
        tabIndex: -1,
        "data-search-item": b.hit.item.id,
        onMouseEnter: () => $(y),
        onClick: () => Ye(b),
        style: $e,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ue.itemDefault} ${B ? "ui-item-selected" : ""} ${A ? "ui-item-highlighted" : ""} ${b.hit.item.disabled ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          b.hit.item.icon && /* @__PURE__ */ m("span", { className: `${ue.icon} shrink-0`, children: b.hit.item.icon }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: b.hit.item.label }),
          (b.hit.detail || b.hit.item.detail) && /* @__PURE__ */ m("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: b.hit.detail || b.hit.item.detail }),
          B && /* @__PURE__ */ m(Lr, { className: `${ue.icon} shrink-0`, "aria-hidden": !0 })
        ]
      },
      `item:${b.hit.item.id}`
    );
  }, Nn = (b, y) => {
    const A = we.has(b.group.key), B = h && !Z.trim(), re = P, ie = re && Ce === y, he = b.group.count !== void 0 && /* @__PURE__ */ m("span", { className: `shrink-0 tabular-nums ${re ? "text-[10px] text-zinc-400" : "opacity-70"}`, children: b.group.count });
    return re ? /* @__PURE__ */ R(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": B ? A : void 0,
        "data-search-group": b.group.key,
        onMouseEnter: () => $(y),
        style: $e,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${ue.itemDefault} ${ie ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ R(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onMouseDown: (ge) => ge.preventDefault(),
              onClick: () => Ye(b),
              className: "flex min-w-0 flex-1 items-center gap-2 text-left",
              children: [
                b.group.icon && /* @__PURE__ */ m("span", { className: `${ue.icon} shrink-0`, children: b.group.icon }),
                /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: b.group.label }),
                he
              ]
            }
          ),
          B && /* @__PURE__ */ m(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${A ? "Collapse" : "Expand"} ${b.group.label}`,
              "aria-expanded": A,
              onMouseDown: (ge) => ge.preventDefault(),
              onClick: (ge) => {
                ge.stopPropagation(), _e(b.group.key);
              },
              className: "shrink-0 rounded p-0.5 text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ m(xn, { className: `w-3.5 h-3.5 transition-transform duration-200 ${A ? "rotate-180" : ""}` })
            }
          )
        ]
      },
      `group:${b.group.key}`
    ) : /* @__PURE__ */ R(
      "div",
      {
        role: "presentation",
        "data-search-group": b.group.key,
        style: ve,
        className: "w-full flex items-center gap-2 select-none font-semibold uppercase tracking-wider ui-label",
        children: [
          b.group.icon && /* @__PURE__ */ m("span", { className: `${ue.icon} shrink-0`, children: b.group.icon }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: b.group.label }),
          he
        ]
      },
      `group:${b.group.key}`
    );
  }, Bt = (b, y) => {
    var re;
    const A = Ce === y, B = b.source === "leading" ? H : b.source === "footer" ? K : j;
    return /* @__PURE__ */ R(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": b.source || "empty",
        onMouseEnter: () => $(y),
        onClick: () => Ye(b),
        style: $e,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ue.itemDefault} ${A ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ m("span", { className: `${ue.icon} shrink-0`, children: ((re = B == null ? void 0 : B[b.actionIndex]) == null ? void 0 : re.icon) || /* @__PURE__ */ m(Ki, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: b.label })
        ]
      },
      `${b.source || "empty"}:${b.actionIndex}`
    );
  }, cr = () => /* @__PURE__ */ m("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: I ? I({ query: Z, close: ye }) : /* @__PURE__ */ R(Ke, { children: [
    /* @__PURE__ */ m("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ m(St, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ m("div", { className: "text-xs font-medium text-zinc-500", children: w || `No matches for “${Z.trim()}”` }),
    /* @__PURE__ */ m("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: F || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), Ft = [];
  for (let b = 0; b < Ne.length; b++) {
    const y = Ne[b];
    if (y.kind === "group") {
      const A = [];
      let B = b + 1;
      for (; B < Ne.length && Ne[B].kind === "item" && Ne[B].hit.item.group === y.group.key; )
        A.push({ row: Ne[B], index: B }), B++;
      Ft.push({ group: y, index: b, items: A }), b = B - 1;
    } else y.kind === "item" ? Ft.push({ row: y, index: b }) : Ft.push({ row: y, index: b });
  }
  const Tn = G ? Qn(
    /* @__PURE__ */ R(
      "div",
      {
        ref: Lt,
        id: "search-menu-panel",
        "data-theme": D,
        role: "listbox",
        "aria-label": o,
        className: "ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden",
        style: {
          position: "fixed",
          left: De.left,
          top: De.top,
          width: E ?? (t === "expandable" ? k : Dt || void 0),
          maxHeight: De.maxH,
          visibility: De.ready ? "visible" : "hidden"
        },
        children: [
          Ve && /* @__PURE__ */ R("div", { className: "shrink-0 pb-1", children: [
            Le.map((b, y) => Bt(b, y)),
            Ne.length > 0 && /* @__PURE__ */ m("div", { className: ue.separator })
          ] }),
          /* @__PURE__ */ R("div", { className: "overflow-y-auto scrollbar-custom flex flex-col min-h-0", children: [
            Ne.length === 0 && /* @__PURE__ */ m("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: I ? I({ query: Z, close: ye }) : /* @__PURE__ */ m(Ke, { children: "Type to search…" }) }),
            Ft.map((b) => {
              if (b.group) {
                const B = we.has(b.group.group.key), re = b.items || [];
                return /* @__PURE__ */ R(Re.Fragment, { children: [
                  Nn(b.group, qe + b.index),
                  fe && /* @__PURE__ */ m(
                    "div",
                    {
                      "data-search-group-items": b.group.group.key,
                      "aria-hidden": !B,
                      className: "motion-reduce:transition-none",
                      style: {
                        display: "grid",
                        gridTemplateRows: B ? "1fr" : "0fr",
                        opacity: B ? 1 : 0,
                        transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                      },
                      children: /* @__PURE__ */ m("div", { className: "overflow-hidden flex flex-col", children: re.map((ie) => wt(ie.row, qe + ie.index)) })
                    }
                  ),
                  !fe && re.map((ie) => wt(ie.row, qe + ie.index))
                ] }, `group:${b.group.group.key}`);
              }
              const y = b.row, A = qe + b.index;
              return y.kind === "empty" ? cr() : y.kind === "action" ? Bt(y, A) : y.kind === "item" ? wt(y, A) : null;
            })
          ] }),
          et.length > 0 && /* @__PURE__ */ R("div", { className: "shrink-0", children: [
            /* @__PURE__ */ m("div", { className: ue.separator }),
            et.map((b, y) => Bt(b, qe + Ne.length + y))
          ] })
        ]
      }
    ),
    Se ?? (ce == null ? void 0 : ce.body) ?? document.body
  ) : null;
  return /* @__PURE__ */ R(
    "div",
    {
      ref: se,
      "data-search-menu": !0,
      "data-mode": t,
      className: "relative inline-flex",
      style: t === "inline" ? { width: "100%" } : { width: q ? k : T, transition: `width ${Mt}ms cubic-bezier(0.32, 0.72, 0, 1)` },
      children: [
        t === "inline" ? kn : /* @__PURE__ */ R(Ke, { children: [
          /* @__PURE__ */ m(
            "div",
            {
              className: `w-full origin-left ${q ? "opacity-0 pointer-events-none" : "opacity-100"}`,
              style: {
                transform: q ? "scaleX(0.98)" : "scaleX(1)",
                transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
              },
              children: /* @__PURE__ */ m(
                rt,
                {
                  ref: de,
                  type: "button",
                  variant: "primary",
                  size: "minimal",
                  theme: D === "dark" ? "dark" : "light",
                  icon: i ?? /* @__PURE__ */ m(St, { className: "w-3.5 h-3.5" }),
                  onClick: We,
                  className: `w-full justify-start ${q ? "pointer-events-none" : ""}`,
                  tabIndex: q ? -1 : 0,
                  "data-search-trigger": !0,
                  children: /* @__PURE__ */ m("span", { children: r })
                }
              )
            }
          ),
          /* @__PURE__ */ m(
            "div",
            {
              className: `absolute inset-0 origin-left ${q ? "opacity-100" : "opacity-0 pointer-events-none"}`,
              "aria-hidden": !q,
              style: {
                transform: q ? "scaleX(1)" : "scaleX(0.96)",
                transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
              },
              children: Sn
            }
          )
        ] }),
        Tn
      ]
    }
  );
}
export {
  rt as Button,
  Mf as CardSection,
  po as CheckMark,
  Rl as Checkbox,
  uf as Checklist,
  wf as ChromeHeader,
  vf as ContentRow,
  Xd as ContextMenu,
  Qd as ContextMenuDivider,
  Gd as ContextMenuItem,
  Zd as ContextMenuSub,
  to as DROPDOWN_MAX_HEIGHT,
  cf as DatePicker,
  nf as DialogProvider,
  kl as DropdownItem,
  rr as DropdownMenu,
  Sl as DropdownSubmenu,
  qr as DropdownThemeContext,
  hd as FONTS,
  ff as FloatingChrome,
  af as FloatingToggle,
  md as FontMenu,
  Cf as FormatToolbar,
  ze as IS_COARSE,
  cl as IS_TOUCH_CAPABLE,
  Ud as ItemManagerDropdown,
  of as LongPressMenuProvider,
  Fr as MORPH_EASE,
  Mt as MORPH_MS,
  Hr as MORPH_OPACITY_MS,
  wn as MenuHighlightContext,
  co as MenuSearchContext,
  Tl as Modal,
  ef as ModalFooter,
  Rn as ModalFooterButton,
  Rf as MorphSearchField,
  Ef as NumberInput,
  al as PopoutWindowContext,
  Tf as RICH_TEXT_STATE_IDLE,
  df as RadioList,
  fd as RichTextEditor,
  xd as SCRUB_PX_PER_STEP,
  Af as SearchMenu,
  bf as SectionHeader,
  xf as Seg,
  kf as StructureControls,
  Kr as SubmenuContext,
  lf as TAB_PILL,
  Xl as TB_BTN,
  An as TB_BTN_ICON,
  Gl as TB_DANGER,
  yo as TB_DIVIDER,
  Ql as TB_INPUT,
  yf as TB_NUM,
  ea as TB_PICKER,
  hf as TB_ROW_LABEL,
  Zl as TB_SEG,
  pf as TB_TOGGLE,
  gf as TB_TOGGLE_OFF,
  mf as TB_TOGGLE_ON,
  Fl as TabFace,
  Vd as ThemeProvider,
  Yd as ThemeScope,
  id as Token,
  rd as TokenChipView,
  In as ToolButton,
  jt as Tooltip,
  _r as ZOOM_FROM,
  Nd as buildSearchMenuRows,
  yl as buttonCloudOf,
  si as clampNumber,
  hl as cloneOverlayClose,
  L as coarsePx,
  Nf as escapeHtml,
  Xi as getCoarseScale,
  tr as getDropdownClasses,
  Jd as getHardwareKeyboard,
  qd as getLastPointerType,
  Er as inputCls,
  Ol as isInteractiveElement,
  Nr as isTouchLike,
  kd as matchSearchItem,
  oo as menuAttributesOf,
  ml as menuThemeOf,
  Zi as nearestOverlayOrigin,
  Es as normalizeSpaces,
  dr as overlayMorphEnabled,
  wd as parseSearchTags,
  fl as playOverlayClose,
  dl as playOverlayOpen,
  Hi as preprocessTokenHtml,
  ed as sanitizeRichText,
  bd as scrubbedValue,
  Sd as searchMenuContent,
  gl as segModeOf,
  Wd as setCoarseScale,
  yd as steppedValue,
  Sf as stripRichText,
  td as stripTokenWrappers,
  jd as useCoarse,
  Te as useCoarseScale,
  xt as useCoarseSize,
  Br as useCurrentDocument,
  bn as useCurrentWindow,
  tf as useDialog,
  no as useDropdownPosition,
  so as useDropdownTheme,
  Kd as useHardwareKeyboard,
  mo as useInputSize,
  Jr as useItemSize,
  ft as useKitTheme,
  ul as useLastPointerType,
  rf as useLongPressOptOut,
  Vr as useMenuHighlight,
  vl as useMenuSearch,
  er as useOverlayMorph,
  Pr as usePopoutWindow,
  en as usePortalTarget,
  Ul as useSlidingPill,
  sf as useTouchMode
};
