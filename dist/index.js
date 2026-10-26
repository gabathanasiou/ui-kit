"use client";
import { jsx as m, jsxs as A, Fragment as We } from "react/jsx-runtime";
import Ae, { createContext as Lt, useContext as Pt, useState as Z, useEffect as te, useRef as N, useCallback as re, useLayoutEffect as ot, useMemo as wt, useImperativeHandle as Rs } from "react";
import * as ge from "@radix-ui/react-dropdown-menu";
import { Search as Rt, X as $t, Check as Hi, Pencil as As, Copy as _i, Trash2 as yr, RotateCcw as Wi, Plus as ji, ChevronRight as Pn, ChevronLeft as Is, ArrowUp as zs, ArrowDown as $s, ChevronDown as yn, Underline as Ds, Strikethrough as Os, RemoveFormatting as Ls, Link as Ps, ChevronUp as Bs } from "lucide-react";
import { computePosition as Fs, offset as qi, flip as Ji, shift as Ki, size as Hs, useFloating as _s, autoUpdate as Ws } from "@floating-ui/react-dom";
import * as bt from "@radix-ui/react-dialog";
import { createPortal as Vn } from "react-dom";
import { mergeAttributes as js, ReactNodeViewRenderer as qs, NodeViewWrapper as Js, useEditor as Ks, EditorContent as Vs } from "@tiptap/react";
import { PluginKey as at, Plugin as gt, Selection as Kt, TextSelection as Ze, NodeSelection as Xt, AllSelection as Ys } from "@tiptap/pm/state";
import { DecorationSet as kn, Decoration as Us } from "@tiptap/pm/view";
import Xs from "@tiptap/starter-kit";
import Gs from "@tiptap/extension-placeholder";
import { TextStyle as Qs, FontFamily as Zs, FontSize as el } from "@tiptap/extension-text-style";
import tl from "@tiptap/extension-color";
import nl from "@tiptap/extension-link";
import rl from "@tiptap/extension-underline";
import il from "@tiptap/suggestion";
import { Mention as ol } from "@tiptap/extension-mention";
import { createRoot as sl } from "react-dom/client";
const ll = Lt(null);
function Ar() {
  return Pt(ll);
}
function tn() {
  const n = Ar();
  return n ? n.document.body : null;
}
function Ir() {
  const n = Ar();
  return n ? n.document : typeof document < "u" ? document : null;
}
function xn() {
  return Ar() ?? (typeof window < "u" ? window : null);
}
const bn = typeof window < "u", $e = bn && window.matchMedia("(pointer: coarse)").matches, al = bn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Yn = 0.5;
const un = /* @__PURE__ */ new Set();
function Wd(n) {
  Yn = Math.max(0, Math.min(1, n)), un.forEach((e) => e());
}
function Vi() {
  return Yn;
}
function jd() {
  const [, n] = Z(0);
  return te(() => {
    const e = () => n((t) => t + 1);
    return un.add(e), () => {
      un.delete(e);
    };
  }, []), $e && Yn > 0;
}
function Ee() {
  const [, n] = Z(0);
  return te(() => {
    const e = () => n((t) => t + 1);
    return un.add(e), () => {
      un.delete(e);
    };
  }, []), Yn;
}
function O(n, e, t) {
  return $e ? Math.round(n + (e - n) * t) : n;
}
function Nt(n, e) {
  const t = Ee();
  return $e && t > 0 ? {
    padding: `${O(n.py, e.py, t)}px ${O(n.px, e.px, t)}px`,
    fontSize: `${O(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function xr(n) {
  return n === "touch" || n === "pen";
}
let Jt = null;
const br = /* @__PURE__ */ new Set();
bn && window.addEventListener("pointerdown", (n) => {
  Jt = n.pointerType, br.forEach((e) => e());
}, !0);
function qd() {
  return Jt;
}
function cl() {
  const [, n] = Z(0), e = N(Jt);
  return te(() => {
    const t = () => {
      e.current !== Jt && (e.current = Jt, n((r) => r + 1));
    };
    return br.add(t), () => {
      br.delete(t);
    };
  }, []), Jt;
}
const Yi = ["(any-hover: hover)", "(any-pointer: fine)"];
function Ui() {
  return bn ? Yi.some((n) => window.matchMedia(n).matches) : !1;
}
let Bn = Ui();
const vr = /* @__PURE__ */ new Set();
function li(n) {
  Bn !== n && (Bn = n, vr.forEach((e) => e()));
}
var Fi;
if (bn) {
  const n = () => li(Ui());
  for (const s of Yi) {
    const l = window.matchMedia(s);
    (Fi = l.addEventListener) == null || Fi.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || li(!0));
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
  return Bn;
}
function Kd() {
  const [, n] = Z(0);
  return te(() => {
    const e = () => n((t) => t + 1);
    return vr.add(e), () => {
      vr.delete(e);
    };
  }, []), Bn;
}
const Gt = 220, zr = "cubic-bezier(0.32, 0.72, 0, 1)", $r = 170, Dr = 0.94;
function or(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Xi(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Gi(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Xi({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function ul(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Dr})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Gi(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Gt}ms ${zr}, opacity ${$r}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Gt + 60);
    });
  });
}
function dl(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Gi(e, t);
  e.style.transition = `transform ${Gt}ms ${zr}, opacity ${$r}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${Dr})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Gt + 60);
}
function fl(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Xi({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Gt}ms ${zr}, opacity ${$r}ms ease`, r.style.transform = `scale(${Dr})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Gt + 60));
    });
  });
}
function Un(n) {
  const e = N(null), [t, r] = Z(!1), i = N(null), o = N(0), s = re((p) => {
    if (n.ref && (n.ref.current = p), p) {
      o.current = 0, e.current = p;
      const x = p.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && or(d.current) && fl(g, u.current, i.current));
    });
  }, []), l = re(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), a = N(n.visible);
  a.current = n.visible;
  const c = N(n.visible), u = N(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const f = N(n.onClosed);
  f.current = n.onClosed;
  const d = N(n.morph !== !1);
  d.current = n.morph !== !1;
  const h = N(0);
  return ot(() => {
    if (!t || !a.current || !or(d.current)) return;
    const p = e.current;
    p && ul(h, p, u.current);
  }, [t, n.visible]), te(() => {
    if (!t || !a.current) return;
    let p = 0;
    const g = () => {
      p = 0, l(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [t, l]), ot(() => {
    var y;
    const p = c.current;
    if (c.current = n.visible, n.visible || !p) return;
    const g = e.current;
    if (!g || !or(d.current)) {
      (y = f.current) == null || y.call(f);
      return;
    }
    dl(h, g, u.current, () => {
      var x;
      return (x = f.current) == null ? void 0 : x.call(f);
    });
  }, [n.visible]), te(() => {
    if (!t || !a.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [t]), te(() => {
    if (!t || !a.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [t]), s;
}
const Qi = 384;
function hl(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Zi({
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
  const c = xn(), u = N(c);
  u.current = c;
  const f = N(a);
  f.current = a, ot(() => {
    if (!t) return;
    let d = 0, h = !1;
    const p = () => {
      d || (d = requestAnimationFrame(g));
    }, g = () => {
      if (d = 0, h) return;
      const E = u.current, C = n.current, z = e.current;
      if (!E || !C || !z || !z.isConnected) return;
      const H = (r == null ? void 0 : r.current) ?? z, v = hl(E), L = s ?? Qi, I = Math.min(l, L), j = Math.max(0, z.offsetHeight - H.offsetHeight), W = Math.max(I, Math.ceil(H.scrollHeight + j)), P = Math.min(W, L);
      z.style.maxHeight = `${P}px`;
      let K = P;
      Fs(C, z, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          qi(i),
          Ji({ boundary: v, padding: o, fallbackStrategy: "bestFit" }),
          Ki({ boundary: v, padding: o, mainAxis: !1 }),
          Hs({
            boundary: v,
            padding: o,
            apply({ availableHeight: k }) {
              K = Math.max(I, Math.floor(Math.min(L, k))), z.style.maxHeight = `${K}px`;
            }
          })
        ]
      }).then(({ x: k, y: _, placement: q }) => {
        h || f.current({
          top: Math.round(_),
          left: Math.round(k),
          maxH: K,
          side: q.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    g();
    const y = u.current, x = (y == null ? void 0 : y.document) ?? null, M = (y == null ? void 0 : y.visualViewport) ?? null, T = () => p();
    M == null || M.addEventListener("resize", T), M == null || M.addEventListener("scroll", T), y == null || y.addEventListener("resize", T), x == null || x.addEventListener("scroll", T, { capture: !0, passive: !0 });
    let S = null;
    return typeof ResizeObserver < "u" && (S = new ResizeObserver(T), e.current && S.observe(e.current), r != null && r.current && S.observe(r.current)), () => {
      h = !0, d && cancelAnimationFrame(d), M == null || M.removeEventListener("resize", T), M == null || M.removeEventListener("scroll", T), y == null || y.removeEventListener("resize", T), x == null || x.removeEventListener("scroll", T, { capture: !0 }), S == null || S.disconnect();
    };
  }, [t, n, e, r, i, o, s, l]);
}
let _t = null;
function eo(n) {
  return _t == null || _t(), _t = n, () => {
    _t === n && (_t = null);
  };
}
const to = Lt(null);
function Or(n, e) {
  const t = n.mode ?? (e == null ? void 0 : e.mode) ?? "dark", r = n.surface ?? (e == null ? void 0 : e.surface) ?? "neutral", i = n.context ?? (e == null ? void 0 : e.context) ?? "surface", o = n.accent ?? (e == null ? void 0 : e.accent) ?? "zinc", s = n.accent !== void 0 && n.surface === void 0 && n.context === void 0;
  return { mode: t, accent: i === "chrome" || r === "accent" || s ? o : "zinc", surface: r, context: i };
}
function Lr({ theme: n, children: e }) {
  return /* @__PURE__ */ m(to.Provider, { value: n, children: e });
}
function Vd({ mode: n, accent: e, surface: t, context: r, children: i }) {
  const o = yt();
  return /* @__PURE__ */ m(Lr, { theme: Or({ mode: n, accent: e, surface: t, context: r }, o), children: i });
}
function Yd({ mode: n, accent: e, surface: t, context: r, children: i, className: o, style: s }) {
  const l = yt(), a = Or({ mode: n, accent: e, surface: t, context: r }, l);
  return /* @__PURE__ */ m(Lr, { theme: a, children: /* @__PURE__ */ m(
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
function yt() {
  return Pt(to);
}
function pl(n, e = "dark") {
  return n ? n.context === "surface" ? n.mode : n.mode === "light" ? "light" : n.accent === "emerald" ? "emerald" : n.accent === "blue" ? "blue" : "dark" : e;
}
function no(n, e) {
  if (n) return { theme: n, attrs: { "data-theme": n } };
  if (!e) return { theme: "dark", attrs: { "data-theme": "dark" } };
  if (e.context === "chrome") {
    const t = pl(e);
    return { theme: t, attrs: { "data-theme": t } };
  }
  return { theme: e.mode, attrs: { "data-mode": e.mode, "data-accent": e.accent } };
}
function ml(n, e = "light") {
  return (n == null ? void 0 : n.mode) ?? e;
}
function gl(n) {
  return !n || n.context !== "chrome" && n.surface !== "accent" ? !1 : n.accent === "emerald" ? "emerald" : n.accent === "blue";
}
const Pr = Lt("dark"), ro = () => Pt(Pr);
function Br() {
  const n = Ee();
  return {
    padding: `${O(8, 12, n)}px ${O(12, 16, n)}px`,
    fontSize: `${O(12, 14, n)}px`,
    lineHeight: `${O(18, 22, n)}px`
  };
}
function yl() {
  const n = Ee();
  return {
    padding: `${O(6, 9, n)}px ${O(12, 16, n)}px ${O(2, 3, n)}px`,
    fontSize: `${O(10, 11, n)}px`,
    lineHeight: `${O(14, 16, n)}px`
  };
}
const xl = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", ai = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", bl = (n) => n ? "text-xs" : "text-[10px]";
function Xn(n) {
  const e = $e && Vi() > 0;
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
    headerPad: ai(e),
    headerText: `${ai(e)} font-semibold uppercase tracking-wider ${bl(e)} ui-label`,
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
function io(n) {
  const e = [];
  return Ae.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Ae.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const Fr = Lt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), vn = Lt(null), Hr = () => Pt(vn), oo = Lt({ query: "", setQuery: () => {
} }), vl = () => Pt(oo), wl = () => !0;
function Gn(n) {
  const e = N([]), [t, r] = Z(-1), [i, o] = Z(!1), [s, l] = Z(0), a = re((d) => (e.current = [...e.current, d], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== d), l((h) => h + 1);
  }), []), c = re((d, h) => {
    r(d), o(h === "pointer");
  }, []), u = re(() => {
    o((d) => d && (r(-1), !1));
  }, []);
  return wt(() => ({
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
function so(n) {
  const e = Hr(), t = N(e);
  t.current = e;
  const r = N(null);
  te(() => {
    var a, c;
    const l = { label: n.label(), activate: n.activate, group: ((a = n.group) == null ? void 0 : a.trim()) || void 0 };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function _r(n, e, t, r) {
  const i = N(-1);
  i.current = e.highlightedIndex;
  const o = N(e);
  o.current = e;
  const s = N(n);
  s.current = n;
  const l = N(r);
  l.current = r;
  const a = N({ text: "", time: 0 }), c = N(!1);
  c.current || (c.current = !0, t.current = (u) => {
    var p, g, y, x, M;
    if (!s.current) return;
    const f = u.target;
    if (!!f && !!f.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const T = (g = (p = l.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : g.call(p, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), T && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = u.key === "ArrowDown" ? 1 : -1, S = (i.current + T + h.length) % h.length;
        o.current.setHighlighted(S, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = i.current;
        T >= 0 && T < h.length && h[T].submenu && h[T].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (M = (x = l.current) == null ? void 0 : x.onCloseSub) == null || M.call(x);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = i.current;
        T >= 0 && T < h.length && h[T].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const T = Date.now(), S = (T - a.current.time > 500 ? "" : a.current.text) + u.key.toLowerCase();
        if (a.current = { text: S, time: T }, !S) return;
        const E = i.current + 1;
        for (let C = 0; C < h.length; C++) {
          const z = (E + C) % h.length;
          if (h[z].label.toLowerCase().startsWith(S)) {
            o.current.setHighlighted(z, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Wr(n, e, t, r, i, o, s) {
  const l = N(e);
  l.current = e;
  const a = N(n);
  a.current = n;
  const c = N(i);
  c.current = i;
  const u = N(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const f = N(!1);
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
function jr(n, e) {
  const t = N(n);
  t.current = n;
  const r = N(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Qn({
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
  onSearchValueChange: y
}) {
  const x = yt(), M = no(s, x), T = M.theme, [S, E] = Z([]), [C, z] = Z(null), H = tn(), v = Ir(), L = N(null), I = N(null), j = N(n);
  j.current = n;
  const [W, P] = Z(n), [K, k] = Z(""), _ = d && g !== void 0, q = _ ? g : K, le = _ ? y ?? (() => {
  }) : k, [ie, ne] = Z(!1), F = _ && !ie ? "" : q, V = N(null), Y = Ee(), R = {
    padding: `${O(8, 12, Y)}px ${O(12, 16, Y)}px`,
    fontSize: `${O(12, 14, Y)}px`
  }, [Q, Me] = Z(0), ae = d && !_;
  te(() => {
    var De;
    if (!ae || !n) return;
    const B = (De = I.current) == null ? void 0 : De.querySelector("[data-menu-items]");
    if (!B) return;
    const G = () => Me(B.offsetWidth - B.clientWidth);
    G();
    const pe = new ResizeObserver(G);
    return pe.observe(B), () => pe.disconnect();
  }, [n, ae, q]);
  const Le = wt(() => {
    if (!d) return;
    const B = F.trim().toLowerCase();
    return B ? (G) => {
      var pe;
      return p ? p(B, G.label, G.group) : G.label.toLowerCase().includes(B) || (((pe = G.group) == null ? void 0 : pe.toLowerCase().includes(B)) ?? !1);
    } : wl;
  }, [F, d, p]), $ = Gn(Le);
  te(() => {
    if (n)
      return P(!0), _ || k(""), ne(!1), $.setHighlighted(f ?? -1, "keyboard"), eo(() => {
        t == null || t(!1), e == null || e();
      });
    E([]), ne(!1);
  }, [n, f, t, e]), te(() => {
    if (!n || !v) return;
    const B = (G) => {
      if (G.pointerType !== "touch") return;
      const pe = G.target;
      pe && (I.current && I.current.contains(pe) || L.current && L.current.contains(pe) || pe instanceof Element && pe.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return v.addEventListener("pointerdown", B, { capture: !0 }), () => v.removeEventListener("pointerdown", B, { capture: !0 });
  }, [n, v, t, e]);
  const oe = re(() => {
    const B = L.current;
    if (!B) return null;
    const G = B.getBoundingClientRect();
    return { left: G.left, top: G.top, width: G.width, height: G.height };
  }, []), ke = Un({
    visible: n,
    morph: a,
    anchor: oe,
    onClosed: () => P(!1)
  }), ce = N(() => {
  }), je = N(() => {
  }), de = N(() => {
  }), Te = re((B) => {
    if (B.key === "Enter") {
      const G = $.highlightedIndex, pe = $.items[G >= 0 ? G : 0];
      return pe == null || pe.activate(), !0;
    }
    return B.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [$, t, e]);
  _r(n && S.length === 0, $, ce, { onFieldKey: Te }), jr(n, je), Wr(n, $, ce, I, S.length > 0, de, { ignoreFields: _ });
  const Se = N(null), Be = re((B) => {
    var G;
    if (B) {
      B.addEventListener("keydown", ce.current, { capture: !0 }), B.addEventListener("wheel", je.current, { passive: !1 });
      const pe = B.ownerDocument;
      Se.current = pe, pe.addEventListener("keydown", de.current, { capture: !0 }), nt(!0);
    } else
      (G = Se.current) == null || G.removeEventListener("keydown", de.current, { capture: !0 }), Se.current = null, nt(!1);
    I.current = B, ke(B);
  }, [ke]), [xe, me] = Z({ top: 0, left: 0, maxH: Qi, side: "bottom", ready: !1 }), [tt, Ct] = Z(0), [qe, nt] = Z(!1);
  te(() => {
    n && L.current && Ct(L.current.getBoundingClientRect().width);
  }, [n]), Zi({
    anchorRef: L,
    panelRef: I,
    open: n && qe,
    maxHeight: u,
    onPosition: me
  }), te(() => {
    var B;
    if (xe.ready && n) {
      if (d) {
        (B = V.current ?? L.current) == null || B.focus();
        return;
      }
      const G = I.current;
      G && G.ownerDocument.activeElement !== G && !G.contains(G.ownerDocument.activeElement) && G.focus();
    }
  }, [xe.ready, n, d]), te(() => {
    if (!n || !d) return;
    if ($.items.length === 0) {
      $.highlightedIndex !== -1 && $.setHighlighted(-1, "keyboard");
      return;
    }
    const B = $.highlightedIndex;
    (B < 0 || B >= $.items.length) && $.setHighlighted(0, "keyboard");
  }, [n, q, d, $.items.length]), ot(() => {
    var G;
    if (!n || $.highlightedIndex < 0 || $.pointerDriven) return;
    const B = (G = I.current) == null ? void 0 : G.querySelector(`[data-ei="${$.highlightedIndex}"]`);
    B == null || B.scrollIntoView({ block: "nearest" });
  }, [n, $.highlightedIndex, $.pointerDriven]);
  const Je = re((B) => {
    !B && !j.current || (!B && Ke.current && (ft.current = !0), t ? t(B) : B || e == null || e());
  }, [t, e]), Ge = N(W);
  Ge.current = W;
  const Ke = N(!1), ft = N(!1), Et = re(() => {
    if (!j.current && Ge.current) {
      if (ft.current) {
        ft.current = !1, Ke.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), ct = Ae.isValidElement(r) ? r : null, Ft = ct ? Ae.cloneElement(ct, {
    ref: (B) => {
      L.current = B;
    },
    /* Radix's trigger primitive merges `type="button"` onto the child; a
       text field trigger-as-search must stay a text field. */
    ..._ ? { type: ct.props.type ?? "text" } : {},
    onPointerDown: (B) => {
      var G;
      Ke.current = !0, ft.current = !1, _ && (B.preventDefault(), j.current || t == null || t(!0), (G = L.current) == null || G.focus());
    },
    /* Space is a printable search character, but Radix treats it as the
       trigger's open/close key. Keep it in the field. */
    onKeyDownCapture: (B) => {
      _ && B.key === " " && B.stopPropagation();
    },
    onClick: (B) => {
      var G, pe;
      (pe = (G = ct.props).onClick) == null || pe.call(G, B), Et();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (B) => {
      var G, pe;
      if ((pe = (G = ct.props).onKeyDown) == null || pe.call(G, B), !(!_ || !j.current)) {
        if (B.key.length === 1 && !B.ctrlKey && !B.metaKey && !B.altKey)
          ne(!0);
        else if (B.key === "ArrowDown" || B.key === "ArrowUp") {
          B.preventDefault();
          const De = $.items;
          if (De.length === 0) return;
          const ut = B.key === "ArrowDown" ? 1 : -1, b = ($.highlightedIndex + ut + De.length) % De.length;
          $.setHighlighted(b, "keyboard");
        } else if (B.key === "Enter") {
          B.preventDefault();
          const De = $.highlightedIndex, ut = $.items[De >= 0 ? De : 0];
          ut == null || ut.activate();
        }
      }
    }
  }) : r, ht = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${ae ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ A(ge.Root, { open: n || W, onOpenChange: Je, modal: !1, children: [
    /* @__PURE__ */ m(ge.Trigger, { asChild: !0, children: Ft }),
    /* @__PURE__ */ m(ge.Portal, { container: H ?? void 0, children: /* @__PURE__ */ m(Pr.Provider, { value: T, children: /* @__PURE__ */ m(Fr.Provider, { value: { chain: S, setChain: E, morph: a, keyboardOpened: C, setKeyboardOpened: z }, children: /* @__PURE__ */ m(vn.Provider, { value: $, children: /* @__PURE__ */ m(oo.Provider, { value: { query: q, setQuery: le }, children: /* @__PURE__ */ A(
      ge.Content,
      {
        ref: Be,
        ...M.attrs,
        "data-ui-fixed": !0,
        className: `${ht} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: xe.left,
          top: xe.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : tt || void 0,
          maxHeight: xe.maxH,
          visibility: xe.ready ? "visible" : "hidden"
        },
        onPointerLeave: $.pointerLeave,
        onFocus: _ ? (B) => {
          if (B.target !== B.currentTarget) return;
          const G = L.current;
          G && G.ownerDocument.activeElement !== G && G.focus();
        } : void 0,
        onCloseAutoFocus: _ ? (B) => {
          var G;
          B.preventDefault(), (G = L.current) == null || G.focus();
        } : void 0,
        children: [
          ae && /* @__PURE__ */ m("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: Q }, children: /* @__PURE__ */ A("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: R, children: [
            /* @__PURE__ */ m(Rt, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: V,
                value: q,
                onChange: (B) => le(B.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            q ? /* @__PURE__ */ m(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (B) => B.stopPropagation(),
                onClick: () => {
                  var B;
                  le(""), (B = V.current) == null || B.focus();
                },
                children: /* @__PURE__ */ m($t, { className: "w-3.5 h-3.5" })
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
  align: y,
  label: x,
  header: M,
  itemLabel: T,
  trigger: S,
  minItems: E = 1,
  itemRender: C,
  morph: z = !0,
  contentClassName: H
}) {
  const v = Xn(), L = Br(), [I, j] = Z(null), [W, P] = Z(""), K = N(W);
  K.current = W;
  const k = N(null), _ = N(null);
  te(() => {
    n && requestAnimationFrame(() => {
      var F, V;
      (V = (F = _.current) == null ? void 0 : F.querySelector('[data-active="1"]')) == null || V.scrollIntoView({ block: "nearest" });
    });
  }, [n]), te(() => {
    var Y;
    if (!n) return;
    const F = (R) => {
      var ke, ce, je;
      const Q = R.target;
      if (Q && Q.closest("input, textarea, [contenteditable]")) {
        I && Q === k.current && (R.key === "Enter" ? (R.preventDefault(), R.stopImmediatePropagation(), le()) : R.key === "Escape" && (R.preventDefault(), R.stopImmediatePropagation(), ie()));
        return;
      }
      const Me = (ke = _.current) == null ? void 0 : ke.closest(".ui-menu");
      if (!Me || !Me.contains(R.target)) return;
      const ae = Me.ownerDocument, Le = [...Me.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], $ = [...Me.querySelectorAll('div:last-child > [role="menuitem"]')], oe = [...Le, ...$];
      if (R.key === "ArrowDown" || R.key === "ArrowUp") {
        R.preventDefault(), R.stopImmediatePropagation();
        const de = ae.activeElement;
        let Te = de ? oe.indexOf(de) : -1;
        if (Te < 0 && de) {
          const xe = de.closest("[data-active]"), me = xe == null ? void 0 : xe.querySelector('[role="menuitem"]:first-child');
          me && (Te = Le.indexOf(me));
        }
        const Se = R.key === "ArrowDown" ? 1 : -1, Be = Te < 0 ? Se === 1 ? 0 : oe.length - 1 : (Te + Se + oe.length) % oe.length;
        (ce = oe[Be]) == null || ce.focus({ preventScroll: !0 });
        return;
      }
      if (R.key === "ArrowLeft" || R.key === "ArrowRight") {
        const de = ae.activeElement, Te = de == null ? void 0 : de.closest("[data-active]");
        if (!Te) return;
        R.preventDefault(), R.stopImmediatePropagation();
        const Se = [...Te.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Se.length === 0) return;
        const Be = de && Te.contains(de) ? Se.indexOf(de) : -1, xe = R.key === "ArrowRight" ? 1 : -1, me = Be < 0 ? 0 : (Be + xe + Se.length) % Se.length;
        (je = Se[me]) == null || je.focus({ preventScroll: !0 });
        return;
      }
    }, V = ((Y = _.current) == null ? void 0 : Y.ownerDocument) ?? null;
    return V == null || V.addEventListener("keydown", F, { capture: !0 }), () => V == null ? void 0 : V.removeEventListener("keydown", F, { capture: !0 });
  }, [n, I]), te(() => {
    if (!I) return;
    const F = t.find((Q) => Q.id === I);
    F && !W && P(F.name);
    const V = requestAnimationFrame(() => {
      const Q = k.current;
      Q && (Q.focus(), Q.select());
    });
    let Y = 0;
    const R = window.setInterval(() => {
      const Q = k.current;
      if (Y++, !Q || Y > 12) {
        clearInterval(R);
        return;
      }
      Q.ownerDocument.activeElement !== Q && (Q.focus(), Q.select());
    }, 50);
    return () => {
      cancelAnimationFrame(V), clearInterval(R);
    };
  }, [I]), te(() => {
    if (I) {
      const F = t.find((V) => V.id === I);
      F && !W && P(F.name);
    }
  }, [I, t]);
  const q = (F, V) => {
    j(F), P(V);
  }, le = () => {
    I && K.current.trim() && o(I, K.current.trim()), j(null);
  }, ie = () => {
    j(null);
  }, ne = T || M.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ A(Qn, { open: n, onOpenChange: (F) => {
    F ? (j(null), P("")) : (I && W.trim() && o(I, W.trim()), j(null), P("")), (!F || !p) && e(F);
  }, width: "w-80", theme: g, align: y, trigger: S, morph: z, contentClassName: H, children: [
    /* @__PURE__ */ m("div", { className: `shrink-0 ${v.headerText}`, children: M }),
    /* @__PURE__ */ m("div", { ref: _, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((F) => {
      const V = F.id === r, Y = I === F.id;
      return /* @__PURE__ */ m("div", { "data-active": V ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${V || Y ? v.rowActiveBg : v.rowHoverBg} ${I && !Y ? "opacity-40 pointer-events-none" : ""}`, children: Y ? /* @__PURE__ */ A(We, { children: [
        /* @__PURE__ */ m("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ m(
          "input",
          {
            ref: k,
            autoFocus: !0,
            value: W,
            onChange: (R) => P(R.target.value),
            onKeyDown: (R) => {
              R.key === "Enter" && (R.preventDefault(), R.stopPropagation(), le()), R.key === "Escape" && (R.preventDefault(), R.stopPropagation(), ie());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: L
          }
        ) }),
        /* @__PURE__ */ m(
          ge.Item,
          {
            className: `shrink-0 ${v.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${v.editConfirm}`,
            onSelect: (R) => {
              R.preventDefault(), le();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m(Hi, { className: v.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ge.Item,
          {
            className: `shrink-0 ${v.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${v.editCancel}`,
            onSelect: (R) => {
              R.preventDefault(), ie();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m($t, { className: v.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ A(We, { children: [
        /* @__PURE__ */ m(
          ge.Item,
          {
            style: L,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${v.rowText} ${V ? "" : v.rowTextHover}`,
            onSelect: h ? () => {
              i(F.id);
            } : (R) => {
              R.preventDefault(), i(F.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m("span", { className: `truncate ${V ? v.rowActiveText : ""}`, children: C ? C(F) : F.name })
          }
        ),
        /* @__PURE__ */ m(
          ge.Item,
          {
            className: `shrink-0 ${v.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${V ? v.btnActive : v.btnBase}`,
            onSelect: (R) => {
              R.preventDefault(), q(F.id, F.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m(As, { className: v.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ge.Item,
          {
            className: `shrink-0 ${v.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${V ? v.btnActive : v.btnBase}`,
            onSelect: (R) => {
              R.preventDefault();
              const Q = s(F.id);
              Q && q(Q, `${F.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m(_i, { className: v.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ge.Item,
          {
            className: `shrink-0 ${v.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= E ? v.btnDisabled : V ? v.btnDangerActive : v.btnDanger}`,
            onSelect: (R) => {
              R.preventDefault(), l(F.id);
            },
            onTouchStart: () => {
            },
            disabled: p || t.length <= E,
            children: /* @__PURE__ */ m(yr, { className: v.btnIcon })
          }
        )
      ] }) }, F.id);
    }) }),
    /* @__PURE__ */ A("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ A(We, { children: [
        /* @__PURE__ */ m(ge.Separator, { className: v.separator }),
        /* @__PURE__ */ A(
          ge.Item,
          {
            className: `w-full text-left ${v.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${v.itemDefault} ui-row`,
            onSelect: (F) => {
              F.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ m(Wi, { className: `${v.btnIcon} ${v.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || c || u || d) && /* @__PURE__ */ m(ge.Separator, { className: v.separator }),
      a && /* @__PURE__ */ A(
        ge.Item,
        {
          className: `w-full text-left ${v.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${v.itemDefault} ui-row`,
          onSelect: (F) => {
            F.preventDefault();
            const V = a();
            V && q(V, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(ji, { className: `${v.btnIcon} ${v.icon}` }),
            "New ",
            ne
          ]
        }
      ),
      c && /* @__PURE__ */ A(
        ge.Item,
        {
          className: `w-full text-left ${v.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${v.itemDefault} ui-row`,
          onSelect: (F) => {
            F.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ A("svg", { className: `${v.btnIcon} ${v.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ A(
        ge.Item,
        {
          className: `w-full text-left ${v.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${v.itemDefault} ui-row`,
          onSelect: (F) => {
            F.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ A("svg", { className: `${v.btnIcon} ${v.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ A(
        ge.Item,
        {
          className: `w-full text-left ${v.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${v.itemDefault} ui-row`,
          onSelect: (F) => {
            F.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(yr, { className: `${v.btnIcon} ${v.icon}` }),
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
  var v;
  ro();
  const f = Xn(), d = Br(), h = yl(), p = N(!1), g = N(null), { myIndex: y, highlighted: x, setPointer: M, api: T } = so({
    label: () => io(o),
    activate: () => {
      t || n();
    },
    disabled: t,
    group: u
  }), { query: S } = vl(), E = S.trim() !== "" && y < 0, C = u == null ? void 0 : u.trim(), z = !!C && y >= 0 && (y === 0 || ((v = T == null ? void 0 : T.items[y - 1]) == null ? void 0 : v.group) !== C), H = r === "danger" ? f.itemDanger : f.itemDefault;
  return /* @__PURE__ */ A(We, { children: [
    z && /* @__PURE__ */ m(
      "div",
      {
        "data-menu-group": C,
        role: "presentation",
        className: "ui-label shrink-0 select-none font-semibold uppercase tracking-wider pointer-events-none",
        style: h,
        children: C
      }
    ),
    /* @__PURE__ */ A(
      ge.Item,
      {
        ref: g,
        "data-ei": y >= 0 ? y : void 0,
        style: { ...d, display: E ? "none" : void 0 },
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${H} ${l ? "ui-item-selected" : ""} ${x ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
        onSelect: (L) => {
          if (p.current) {
            p.current = !1;
            return;
          }
          s && L.preventDefault(), n();
        },
        onPointerEnter: () => {
          M(y);
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
              onPointerDown: (L) => {
                L.stopPropagation(), L.preventDefault(), p.current = !0, a.onClick();
              },
              onClick: (L) => {
                L.stopPropagation(), L.preventDefault();
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
  const { chain: l, setChain: a, morph: c, keyboardOpened: u, setKeyboardOpened: f } = Pt(Fr), d = l.includes(n), h = l[l.length - 1] === n, p = ro(), g = tn(), y = N(null), x = N(null), [M, T] = Z(d), S = !d && M;
  te(() => {
    d && T(!0);
  }, [d]);
  const E = () => a((Y) => {
    const R = Y.indexOf(n);
    return R >= 0 ? Y.slice(0, R) : Y;
  }), C = Gn(), z = Hr(), H = N(z);
  H.current = z;
  const v = N(null);
  te(() => {
    var R;
    const Y = {
      label: e,
      activate: () => {
        f(n), a((Q) => Q.includes(n) ? Q : [...Q, n]);
      },
      submenu: !0
    };
    return v.current = Y, (R = H.current) == null ? void 0 : R.register(Y);
  }, []);
  const L = z && v.current ? z.items.indexOf(v.current) : -1, I = L >= 0 && L === z.highlightedIndex, j = re(() => {
    const Y = y.current;
    if (!Y) return null;
    const R = Y.getBoundingClientRect();
    return { left: R.left, top: R.top, width: R.width, height: R.height };
  }, []), W = Un({
    visible: d,
    morph: c,
    anchor: j,
    onClosed: () => T(!1)
  }), P = N(() => {
  }), K = N(() => {
  }), k = N(() => {
  });
  _r(d && h, C, P, {
    onCloseSub: () => {
      E(), z && L >= 0 && z.setHighlighted(L, "keyboard");
    }
  });
  const _ = N(u);
  _.current = u, te(() => {
    d && (_.current === n ? (C.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var Y;
      return (Y = x.current) == null ? void 0 : Y.focus();
    }), f(null)) : C.setHighlighted(-1, "keyboard"));
  }, [d]), jr(d, K), Wr(d, C, P, x, !h, k), Ae.useLayoutEffect(() => {
    var R;
    if (!d || C.highlightedIndex < 0 || C.pointerDriven) return;
    const Y = (R = x.current) == null ? void 0 : R.querySelector(`[data-ei="${C.highlightedIndex}"]`);
    Y == null || Y.scrollIntoView({ block: "nearest" });
  }, [d, C.highlightedIndex, C.pointerDriven]);
  const q = N(null), le = re((Y) => {
    var R;
    if (Y) {
      Y.addEventListener("keydown", P.current, { capture: !0 }), Y.addEventListener("wheel", K.current, { passive: !1 });
      const Q = Y.ownerDocument;
      q.current = Q, Q.addEventListener("keydown", k.current, { capture: !0 });
    } else
      (R = q.current) == null || R.removeEventListener("keydown", k.current, { capture: !0 }), q.current = null;
    x.current = Y, W(Y);
  }, [W]), ie = Ee(), ne = { padding: `${O(8, 12, ie)}px ${O(12, 16, ie)}px`, fontSize: O(12, 14, ie) }, F = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${I ? " ui-item-highlighted" : ""}${S ? " ui-sub-closing" : ""}`, V = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ A(ge.Sub, { open: d || M, onOpenChange: (Y) => a((R) => {
    if (!Y) {
      const Q = R.indexOf(n);
      return Q >= 0 ? R.slice(0, Q) : R;
    }
    return R.includes(n) ? R : [...R, n];
  }), children: [
    /* @__PURE__ */ A(
      ge.SubTrigger,
      {
        ref: y,
        "data-ei": L >= 0 ? L : void 0,
        style: ne,
        className: F,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          z && L >= 0 && z.setHighlighted(L, "pointer");
        },
        onPointerDown: (Y) => {
          Y.pointerType === "pen" && (Y.preventDefault(), a((R) => d ? R.slice(0, R.indexOf(n)) : [...R, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ m(Pn, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ A("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ m("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ m(Pn, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ m(ge.Portal, { container: g ?? void 0, children: /* @__PURE__ */ m(
      ge.SubContent,
      {
        ref: le,
        "data-theme": p,
        className: V,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: C.pointerLeave,
        children: /* @__PURE__ */ m(vn.Provider, { value: C, children: o })
      }
    ) })
  ] });
}
const on = 8, Xd = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s, morph: l = !0 }) => {
  const a = yt(), c = s ? { theme: s, attrs: { "data-theme": s } } : a ? no(void 0, a) : { theme: "light", attrs: { "data-theme": "light" } }, { theme: u } = c, f = Ee(), d = O(12, 14, f), h = N(null), p = xn(), [g, y] = Z(!1), [x, M] = Z([]), [T, S] = Z(null), E = Gn();
  te(() => {
    if (n)
      return E.setHighlighted(-1, "keyboard"), eo(r);
  }, [n, r]);
  const C = N({ left: e, top: t });
  n && (C.current = { left: e, top: t });
  const z = re(() => ({ left: C.current.left, top: C.current.top, width: 0, height: 0 }), []), H = Un({
    visible: !0,
    morph: l,
    anchor: z,
    cloneOnUnmount: !0
  }), v = N(() => {
  }), L = N(() => {
  }), I = N(() => {
  });
  _r(n, E, v), jr(n, L), Wr(n, E, v, h, x.length > 0, I);
  const j = N(null), W = re((k) => {
    var _;
    if (k) {
      k.addEventListener("keydown", v.current, { capture: !0 }), k.addEventListener("wheel", L.current, { passive: !1 });
      const q = k.ownerDocument;
      j.current = q, q.addEventListener("keydown", I.current, { capture: !0 });
    } else
      (_ = j.current) == null || _.removeEventListener("keydown", I.current, { capture: !0 }), j.current = null;
    h.current = k, y(!!k), H(k);
  }, [H]), [P, K] = Z(null);
  return ot(() => {
    var Q;
    if (!n || !g || !h.current) return;
    const k = h.current, _ = k.offsetWidth, q = k.offsetHeight, le = (Q = o == null ? void 0 : o.current) == null ? void 0 : Q.getBoundingClientRect(), ie = le ? le.right : (p == null ? void 0 : p.innerWidth) ?? 0, ne = le ? le.bottom : (p == null ? void 0 : p.innerHeight) ?? 0, F = le ? le.left : 0, V = le ? le.top : 0;
    let Y = Math.max(V + on, C.current.top), R = Math.max(F + on, C.current.left);
    R + _ > ie && (R = ie - _ - on), Y + q > ne && (Y = Math.max(V + on, ne - q - on)), K({ left: R, top: Y });
  }, [n, g, e, t, o]), n ? /* @__PURE__ */ A(ge.Root, { open: n, onOpenChange: (k) => {
    k || r();
  }, modal: !1, children: [
    /* @__PURE__ */ m(ge.Trigger, { asChild: !0, children: /* @__PURE__ */ m("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ m(ge.Portal, { children: /* @__PURE__ */ m(Pr.Provider, { value: u, children: /* @__PURE__ */ m(Fr.Provider, { value: { chain: x, setChain: M, morph: l, keyboardOpened: T, setKeyboardOpened: S }, children: /* @__PURE__ */ m(vn.Provider, { value: E, children: /* @__PURE__ */ m(
      ge.Content,
      {
        ref: W,
        ...c.attrs,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: d, left: (P == null ? void 0 : P.left) ?? C.current.left, top: (P == null ? void 0 : P.top) ?? C.current.top, touchAction: "manipulation" },
        onPointerLeave: E.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, Gd = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Ee(), a = { padding: `${O(8, 12, l)}px ${O(12, 16, l)}px`, fontSize: O(12, 14, l) }, c = Hr(), u = N(c);
  u.current = c;
  const f = N(null);
  te(() => {
    var g;
    const p = { label: io(s), activate: () => {
      r || n();
    } };
    return f.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const d = c && f.current ? c.items.indexOf(f.current) : -1, h = !r && d >= 0 && d === c.highlightedIndex;
  return /* @__PURE__ */ A(
    ge.Item,
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
}, Qd = () => /* @__PURE__ */ m(ge.Separator, { className: "ui-sep my-1" }), Zd = (n) => /* @__PURE__ */ m(Sl, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), he = 8, lo = "[data-modal-stack]", pt = 220, dn = "cubic-bezier(0.32, 0.72, 0, 1)", $n = 0.94;
function Wt() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function vt(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function ao(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function ci(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = ao(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${pt}ms ${dn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, pt + 80));
    });
  });
}
function Nl(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${$n})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${pt}ms ${dn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, pt + 60));
    });
  });
}
function ui(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - $n, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * $n, height: i.height * $n };
  e.style.transition = `transform ${pt}ms ${dn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = ao(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, pt + 60);
}
function sr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(lo) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Sn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(lo) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
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
  const g = yt(), y = Or(
    { mode: d, accent: p, surface: h, context: "surface" },
    g
  ), x = y.mode, M = y.surface, T = y.accent, S = N(null), E = N(null), C = N(null), z = Ee(), H = O(20, 24, z), v = O(10, 12, z), L = O(12, 14, z), I = O(14, 16, z), j = O(20, 24, z), W = O(20, 24, z), P = O(20, 24, z), K = O(14, 16, z), k = O(16, 20, z), _ = O(10, 12, z), q = O(12, 14, z), le = O(8, 10, z), ie = O(4, 6, z), ne = { padding: `${v}px ${H}px` }, F = { fontSize: L }, V = { padding: `${W}px ${j}px 16px ${j}px` }, Y = { fontSize: I }, R = { padding: `0 ${j}px 16px` }, Q = { padding: `${P}px ${j}px` }, Me = { fontSize: _, padding: `${ie}px ${le}px` }, [ae, Le] = Z(!1), $ = re((w) => {
    S.current = w, Le(w !== null);
  }, []), oe = tn(), ke = xn(), ce = N(ke);
  ce.current = ke;
  const [je, de] = Z(null), Te = N(null), Se = N(!1), Be = N(!1), xe = N(0), me = N({ w: 0, h: 0 }), tt = N(!1), [Ct, qe] = Z(!1), [nt, Je] = Z(!1), Ge = N(0), Ke = N(!1), [ft, Et] = Z(!1), ct = N(a);
  ct.current = a;
  const Ft = N(!1), ht = N(!1), B = () => {
    ht.current = !0, qe(!0);
  }, G = () => {
    ht.current = !1, qe(!1);
  };
  te(() => {
    n || (de(null), tt.current = !1, Se.current = !1, Je(!1));
  }, [n]), ot(() => {
    if (!n || tt.current || !ae || !S.current) return;
    tt.current = !0;
    const w = S.current.getBoundingClientRect(), X = ce.current ?? null, ee = (X == null ? void 0 : X.innerWidth) ?? 0, ue = vt(X);
    de({
      left: Math.max(he, Math.min((ee - w.width) / 2, ee - w.width - he)),
      top: Math.max(ue.top + he, Math.min(ue.top + (ue.height - w.height) / 2, ue.bottom - w.height - he))
    });
  }, [n, ae]), ot(() => {
    if (!n || !ae || !a || Wt() || !S.current) return;
    const w = S.current, X = sr(w), ee = X[X.length - 1];
    B(), ee ? ci(Ge, w, ee.getBoundingClientRect(), G) : Nl(Ge, w, G);
  }, [n, ae]);
  const pe = re(() => {
    if (!u || Ke.current) return;
    const w = S.current, X = !!w && sr(w).length > 0;
    if (!w || !a || Wt() || X) {
      e();
      return;
    }
    Ke.current = !0, Et(!0), Ft.current = !0, B(), ui(Ge, w, () => {
      Ke.current = !1, Et(!1), G(), e();
    });
  }, [a, e, u]), De = re(() => {
    const w = S.current;
    if (!w || Ft.current || !ct.current || Wt() || sr(w).length > 0) return;
    const X = w.ownerDocument, ee = w.cloneNode(!0);
    ee.removeAttribute("data-modal-stack"), ee.removeAttribute("data-state"), ee.removeAttribute("role"), ee.removeAttribute("data-aria-hidden"), ee.removeAttribute("tabindex"), ee.setAttribute("aria-hidden", "true"), ee.style.pointerEvents = "none", X.body.appendChild(ee), ui({ current: 0 }, ee, () => {
      ee.isConnected && ee.remove();
    });
  }, []);
  ot(() => () => De(), [De]);
  const ut = N(n);
  ot(() => {
    const w = ut.current;
    ut.current = n, w && !n && De();
  }, [n, ae, De]), te(() => {
    if (!n || !ae || !a || !S.current) return;
    const w = S.current, X = w.parentNode;
    if (!X) return;
    let ee = 0, ue = null, fe = !1;
    const be = () => {
      ee = 0;
      const Re = Sn(w);
      if (Re.length > 0)
        w.style.opacity = "", w.style.pointerEvents = "", ue = Re[Re.length - 1].getBoundingClientRect(), fe = !0, ee = requestAnimationFrame(be);
      else if (fe) {
        fe = !1, ue && !Wt() && (B(), ci(Ge, w, ue, G)), ue = null;
        const Fe = ce.current ?? null;
        Fe == null || Fe.setTimeout(() => {
          !w || !w.isConnected || getComputedStyle(w).opacity !== "1" && (w.style.opacity = "1", w.style.pointerEvents = "");
        }, 240);
      }
    }, Ce = new MutationObserver(() => {
      !ee && Sn(w).length > 0 && (ee = requestAnimationFrame(be));
    });
    return Ce.observe(X, { childList: !0 }), () => {
      Ce.disconnect(), ee && cancelAnimationFrame(ee);
    };
  }, [n, ae]), te(() => {
    if (!ae || !a || Wt() || !S.current) return;
    const w = S.current;
    let X = Math.round(w.getBoundingClientRect().height), ee = !1;
    const ue = new ResizeObserver(() => {
      if (!w.isConnected) return;
      const fe = Math.round(w.getBoundingClientRect().height);
      if (!ee) {
        ee = !0, X = fe;
        return;
      }
      if (Math.abs(fe - X) < 1) return;
      if (Te.current || Ke.current || Sn(w).length > 0) {
        X = fe;
        return;
      }
      if (ht.current) return;
      const be = X;
      X = fe, B();
      const Ce = w.getBoundingClientRect(), Re = vt(ce.current ?? null), Fe = !Se.current && !Be.current, Ht = Fe ? Re.top + (Re.height - be) / 2 : Ce.top, rt = Fe ? Re.top + (Re.height - fe) / 2 : Ce.top;
      w.style.transition = "none", w.style.height = `${be}px`, Fe && (w.style.top = `${Ht}px`), E.current && (E.current.style.overflow = "hidden"), w.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          w.style.height === `${be}px` && (w.style.transition = `height ${pt}ms ${dn}${Fe ? `, top ${pt}ms ${dn}` : ""}`, w.style.height = `${fe}px`, Fe && (w.style.top = `${rt}px`), window.setTimeout(() => {
            w.style.height === `${fe}px` && (w.style.transition = "", w.style.height = "", E.current && (E.current.style.overflow = ""), Fe && de({ left: Ce.left, top: rt }), G());
          }, pt + 60));
        });
      });
    });
    return ue.observe(w), () => ue.disconnect();
  }, [ae]), te(() => {
    if (!ae || !S.current || a && !Wt()) return;
    const w = S.current, X = new ResizeObserver(() => {
      if (!w.isConnected || Te.current || Ke.current || Be.current || Sn(w).length > 0) return;
      const ee = ce.current ?? null, ue = vt(ee), fe = (ee == null ? void 0 : ee.innerWidth) ?? 0, be = w.getBoundingClientRect(), Ce = Math.max(ue.top + he, Math.min(be.top, ue.bottom - be.height - he)), Re = Math.max(he, Math.min(be.left, fe - be.width - he));
      (Math.abs(Ce - be.top) > 0.5 || Math.abs(Re - be.left) > 0.5) && de({ left: Re, top: Ce });
    });
    return X.observe(w), () => X.disconnect();
  }, [ae, a]);
  const b = re(() => {
    const w = S.current;
    if (!w) return null;
    const X = w.getBoundingClientRect();
    return { left: X.left, top: X.top, width: X.width, height: X.height };
  }, []), J = re((w, X) => {
    const ee = ce.current ?? null, ue = (ee == null ? void 0 : ee.innerWidth) ?? 0, fe = vt(ee), be = b(), Ce = be ? be.width : Math.min(ue - he * 2, 576), Re = be ? be.height : Math.min(fe.height - he * 2, 400);
    return {
      left: Math.max(he, Math.min(w, ue - Ce - he)),
      top: Math.max(fe.top + he, Math.min(X, fe.bottom - Re - he))
    };
  }, [b]);
  te(() => {
    if (!n) return;
    const w = ce.current ?? null, X = (w == null ? void 0 : w.visualViewport) ?? null;
    if (!w || !X) return;
    const ee = 120;
    Be.current = !1, me.current = { w: w.innerWidth, h: w.innerHeight };
    let ue = 0;
    const fe = () => {
      if (Ke.current || Te.current) return;
      const Ce = (w == null ? void 0 : w.innerHeight) ?? 0, Re = (w == null ? void 0 : w.innerWidth) ?? 0, Ht = vt(w).height < Ce - ee, rt = Ce < me.current.h - ee && Re === me.current.w;
      Ht || rt ? (Be.current = !0, xe.current && (clearTimeout(xe.current), xe.current = 0)) : xe.current || (xe.current = (w == null ? void 0 : w.setTimeout(() => {
        Be.current = !1, xe.current = 0, Je(!1);
      }, 600)) ?? 0), Je(Be.current), !ue && (ue = requestAnimationFrame(() => {
        var si;
        ue = 0;
        const ri = S.current;
        if (!ri) return;
        const Mt = vt(ce.current ?? null), dt = ri.getBoundingClientRect(), ii = ((si = ce.current) == null ? void 0 : si.innerWidth) ?? 0, ir = (w == null ? void 0 : w.innerHeight) ?? 0, Ms = Mt.height < ir - ee || ir < me.current.h - ee && (w == null ? void 0 : w.innerWidth) === me.current.w;
        me.current = { w: (w == null ? void 0 : w.innerWidth) ?? 0, h: ir };
        const wn = dt.top >= Mt.top + he && dt.bottom <= Mt.bottom - he, oi = () => {
          de({
            left: Math.max(he, Math.min((ii - dt.width) / 2, ii - dt.width - he)),
            top: Math.max(Mt.top + he, Math.min(Mt.top + (Mt.height - dt.height) / 2, Mt.bottom - dt.height - he))
          });
        };
        if (Ms && !$e) {
          if (Se.current) {
            wn || de(J(dt.left, dt.top));
            return;
          }
          if (wn) return;
          oi();
          return;
        }
        if (!Be.current) {
          if (Se.current) {
            wn || de(J(dt.left, dt.top));
            return;
          }
          wn || oi();
        }
      }));
    };
    X.addEventListener("resize", fe), X.addEventListener("scroll", fe);
    const be = () => {
      Ke.current || Te.current || ue || (ue = requestAnimationFrame(() => {
        ue = 0;
        const Ce = S.current;
        if (!Ce) return;
        const Re = ce.current ?? null, Fe = vt(Re), Ht = (Re == null ? void 0 : Re.innerWidth) ?? 0, rt = Ce.getBoundingClientRect();
        if (Se.current) {
          de(J(rt.left, rt.top));
          return;
        }
        de({
          left: Math.max(he, Math.min((Ht - rt.width) / 2, Ht - rt.width - he)),
          top: Math.max(Fe.top + he, Math.min(Fe.top + (Fe.height - rt.height) / 2, Fe.bottom - rt.height - he))
        });
      }));
    };
    return w.addEventListener("orientationchange", be), () => {
      X.removeEventListener("resize", fe), X.removeEventListener("scroll", fe), w.removeEventListener("orientationchange", be), ue && cancelAnimationFrame(ue), xe.current && clearTimeout(xe.current);
    };
  }, [n, J]);
  const se = re((w) => {
    if (w.target.closest("button")) return;
    Se.current = !0;
    const X = b();
    X && (de(J(X.left, X.top)), Te.current = { startX: w.clientX, startY: w.clientY, posX: X.left, posY: X.top }, w.target.setPointerCapture(w.pointerId));
  }, [b, J]), ye = re((w) => {
    const X = Te.current;
    X && (w.preventDefault(), de(J(X.posX + w.clientX - X.startX, X.posY + w.clientY - X.startY)));
  }, [J]), Ve = re(() => {
    Te.current = null;
  }, []), Ue = Te.current !== null, xt = re(() => {
    Se.current = !1;
    const w = ce.current ?? null, X = vt(w), ee = (w == null ? void 0 : w.innerWidth) ?? 0, ue = S.current, fe = ue ? ue.getBoundingClientRect() : { width: 0, height: 0 };
    de({
      left: Math.max(he, Math.min((ee - fe.width) / 2, ee - fe.width - he)),
      top: Math.max(X.top + he, Math.min(X.top + (X.height - fe.height) / 2, X.bottom - fe.height - he))
    });
  }, []), rn = N(0), ei = re(() => {
    const w = Date.now();
    w - rn.current < 300 ? (rn.current = 0, xt()) : rn.current = w;
  }, [xt]), ti = je !== null, Ts = ti ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Cs = `${i ? `${i} w-full` : "max-w-xl w-full"}`, ni = {
    ...ti ? { left: je.left, top: je.top } : {},
    width: `min(100%, calc(100dvw - ${he * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...nt ? {} : { maxHeight: `calc(100dvh - ${he * 2}px)` }
  }, Es = re((w) => {
    if (w.key !== "Enter" || w.shiftKey || w.metaKey || w.ctrlKey || w.altKey) return;
    const X = w.target, ee = C.current;
    if (!(!!X.closest("[data-modal-close]") || !!ee && ee.contains(X) && !!X.closest('button, a, [role="button"]')) && X.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !ee) return;
    const fe = Array.from(ee.querySelectorAll("button[data-modal-confirm]")), be = fe.length > 0 ? fe : Array.from(ee.querySelectorAll("button")), Ce = be[be.length - 1];
    !Ce || Ce.disabled || (w.preventDefault(), Ce.click());
  }, []);
  return /* @__PURE__ */ m(Lr, { theme: y, children: /* @__PURE__ */ m(bt.Root, { open: n, onOpenChange: (w) => {
    w || pe();
  }, children: /* @__PURE__ */ A(bt.Portal, { container: oe ?? void 0, children: [
    /* @__PURE__ */ m(
      bt.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${ft ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (w) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (w.preventDefault(), f && pe());
        }
      }
    ),
    /* @__PURE__ */ A(
      bt.Content,
      {
        ref: $,
        onKeyDown: Es,
        onInteractOutside: (w) => {
          f || w.preventDefault();
        },
        "data-modal-stack": !0,
        "data-mode": x,
        "data-accent": T,
        "data-surface": M,
        className: `ui-modal fixed z-[10000] bg-[var(--ui-modal-bg)] border border-[color:var(--ui-modal-border)] rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Ts} ${Cs}`,
        style: { touchAction: "manipulation", colorScheme: x, ...Object.keys(ni).length > 0 ? ni : {} },
        children: [
          c ? /* @__PURE__ */ A(
            "div",
            {
              style: V,
              className: `flex items-center justify-between ${Ue ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (w) => {
                Ct || se(w);
              },
              onPointerMove: ye,
              onPointerUp: Ve,
              onClick: ei,
              children: [
                /* @__PURE__ */ m(bt.Title, { style: Y, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t }),
                u && /* @__PURE__ */ m(bt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ m($t, { style: { width: k, height: k } }) })
              ]
            }
          ) : /* @__PURE__ */ A(
            "div",
            {
              style: ne,
              className: `flex items-center justify-between border-b border-[color:var(--ui-modal-header-border)] shrink-0 bg-[var(--ui-modal-header-bg)] ${Ue ? "cursor-grabbing" : "cursor-grab"}`,
              "data-testid": "modal-header",
              onPointerDown: (w) => {
                Ct || se(w);
              },
              onPointerMove: ye,
              onPointerUp: Ve,
              onClick: ei,
              children: [
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ m("span", { className: "text-[color:var(--ui-modal-icon)] shrink-0", children: r }),
                  /* @__PURE__ */ m(bt.Title, { style: F, className: "font-bold text-[color:var(--ui-modal-title)] truncate", children: t })
                ] }),
                /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ A("button", { onClick: l, style: Me, className: "flex items-center gap-1 text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-muted-hover)] transition-colors bg-[var(--ui-modal-control-bg)] hover:bg-[var(--ui-modal-control-hover-bg)] rounded shrink-0", children: [
                    /* @__PURE__ */ m(Wi, { style: { width: q, height: q } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ m(bt.Close, { "data-modal-close": !0, className: "text-[color:var(--ui-modal-muted)] hover:text-[color:var(--ui-modal-title)] transition-colors shrink-0", children: /* @__PURE__ */ m($t, { style: { width: K, height: K } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ m("div", { ref: E, "data-testid": "modal-body", style: c ? R : void 0, className: "overflow-y-auto flex-1 bg-[var(--ui-modal-body-bg)] text-[color:var(--ui-modal-body-text)]", children: s }),
          o && /* @__PURE__ */ m("div", { ref: C, style: c ? Q : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ m("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) }) });
}
function ef({ children: n }) {
  const e = Ee(), t = O(20, 24, e), r = O(8, 12, e);
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
function Nn({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = Nt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
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
function co({ checked: n, size: e, tone: t = "accent" }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: `ui-check-indicator ${n ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: n ? /* @__PURE__ */ A("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ m("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
        /* @__PURE__ */ m("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ m("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ m("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Rl({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: c = "accent", block: u = !1 }) {
  const f = a !== "plain", d = Ee(), h = O(16, 20, d), p = O(12, 14, d), g = O(12, 14, d), y = O(12, 16, d), x = O(10, 12, d), M = O(8, 10, d);
  return /* @__PURE__ */ A(
    "label",
    {
      className: `ui-checkbox ${f ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: M, padding: f ? `${x}px ${y}px` : void 0 },
      onClick: (S) => S.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ m(
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
        f ? /* @__PURE__ */ m(co, { checked: n, size: h, tone: c }) : /* @__PURE__ */ m("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ m("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ m("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ m("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function wr(n = "md") {
  const e = $e && Vi() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function uo(n = "md") {
  return n === "sm" ? Nt({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : Nt({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const fo = Lt(null);
function tf() {
  const n = Pt(fo);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function nf({ children: n, theme: e, accent: t, surface: r }) {
  const [i, o] = Z(null), [s, l] = Z(!1), a = N(null), c = Ee(), u = O(16, 20, c), f = O(12, 14, c), d = uo(), h = N(i);
  h.current = i;
  const p = re(() => {
    const E = h.current;
    E && (E.kind === "confirm" ? E.resolve(!1) : E.kind === "prompt" ? E.resolve(null) : E.resolve());
  }, []), g = re((E) => {
    if (E.suppressKey) {
      const C = localStorage.getItem(E.suppressKey);
      if (C && Date.now() < parseInt(C, 10))
        return Promise.resolve(!0);
    }
    return new Promise((C) => {
      p(), l(!1), o({ kind: "confirm", options: E, resolve: C });
    });
  }, [p]), y = re((E) => new Promise((C) => {
    p(), o({ kind: "prompt", options: E, resolve: C });
  }), [p]), x = re((E) => new Promise((C) => {
    p(), o({ kind: "alert", options: E, resolve: C });
  }), [p]);
  te(() => {
    if (i) {
      const E = setTimeout(() => {
        var C;
        return (C = a.current) == null ? void 0 : C.focus();
      }, 50);
      return () => clearTimeout(E);
    }
  }, [i]);
  const M = re(() => {
    var E, C;
    if (i) {
      if (i.kind === "confirm") {
        const z = i.options;
        z.suppressKey && s && localStorage.setItem(z.suppressKey, String(Date.now() + 864e5)), i.resolve(!0);
      } else i.kind === "prompt" ? i.resolve(((C = (E = a.current) == null ? void 0 : E.value) == null ? void 0 : C.trim()) || null) : i.resolve();
      o(null);
    }
  }, [i, s]), T = i !== null;
  te(() => {
    if (!T) return;
    const E = (C) => {
      C.key !== "Enter" || C.shiftKey || C.metaKey || C.ctrlKey || C.altKey || C.isComposing || (C.preventDefault(), C.stopImmediatePropagation(), M());
    };
    return document.addEventListener("keydown", E, !0), () => document.removeEventListener("keydown", E, !0);
  }, [T, M]);
  const S = re(() => {
    i && (i.kind === "confirm" ? i.resolve(!1) : i.kind === "prompt" ? i.resolve(null) : i.resolve(), o(null));
  }, [i]);
  return /* @__PURE__ */ A(fo.Provider, { value: { confirm: g, prompt: y, alert: x }, children: [
    n,
    T && /* @__PURE__ */ m(
      Tl,
      {
        open: !0,
        onClose: S,
        closable: (i == null ? void 0 : i.kind) !== "alert",
        dismissOnBackdrop: (i == null ? void 0 : i.kind) !== "alert",
        title: (i == null ? void 0 : i.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: i && /* @__PURE__ */ A(We, { children: [
          i.kind !== "alert" && /* @__PURE__ */ m(Nn, { variant: "ghost", onClick: S, children: "Cancel" }),
          i.kind === "alert" ? /* @__PURE__ */ m(Nn, { onClick: M, children: "OK" }) : i.kind === "confirm" ? /* @__PURE__ */ m(
            Nn,
            {
              "data-modal-confirm": !0,
              variant: i.options.danger ? "danger-solid" : "hero",
              onClick: M,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ m(Nn, { "data-modal-confirm": !0, onClick: M, children: "Save" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "flex flex-col", style: { gap: u }, children: [
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
const Al = 500, Il = 250, zl = 5, Qe = 88, di = 4;
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
  const r = N(null), i = tn();
  return te(() => {
    r.current && $l(r.current, t);
  }, [t]), Vn(
    /* @__PURE__ */ m(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Qe / 2,
          top: e - Qe / 2,
          width: Qe,
          height: Qe,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ A("svg", { ref: r, width: Qe, height: Qe, viewBox: `0 0 ${Qe} ${Qe}`, children: [
          /* @__PURE__ */ m(
            "circle",
            {
              cx: Qe / 2,
              cy: Qe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: di + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ m(
            "circle",
            {
              cx: Qe / 2,
              cy: Qe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: di,
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
  const [s, l] = Z(null), a = Ir(), c = N(null), u = N(null), f = N({ x: 0, y: 0, target: null }), d = N(!1), h = Math.min(Il, t * 0.5), p = N(i);
  p.current = i;
  const g = N(o);
  return g.current = o, te(() => {
    if (!$e || !a) return;
    const y = (S) => {
      if (!xr(S.pointerType) || S.button !== 0) return;
      const E = S.target;
      if (!E.closest(r) || (p.current ? !p.current(E) : Ol(E))) return;
      const C = S.clientX, z = S.clientY;
      f.current = { x: C, y: z, target: S.target }, d.current = !0, e && (u.current = setTimeout(() => l({ x: C, y: z }), h)), c.current = setTimeout(() => {
        if (!d.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const H = f.current.target;
        if (!H) return;
        const v = g.current;
        if (v) {
          v(H, C, z);
          return;
        }
        const L = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: C,
          clientY: z,
          button: 2,
          view: window
        });
        H.dispatchEvent(L);
      }, t);
    }, x = (S) => {
      if (!d.current || c.current === null) return;
      const E = S.clientX - f.current.x, C = S.clientY - f.current.y;
      Math.sqrt(E * E + C * C) > zl && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    }, M = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null);
    }, T = (S) => {
      xr(S.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), d.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", y), a.addEventListener("pointermove", x), a.addEventListener("pointerup", M), a.addEventListener("pointercancel", M), a.addEventListener("pointerleave", T), () => {
      a.removeEventListener("pointerdown", y), a.removeEventListener("pointermove", x), a.removeEventListener("pointerup", M), a == null || a.removeEventListener("pointercancel", M), a == null || a.removeEventListener("pointerleave", T), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ A(We, { children: [
    n,
    e && s && /* @__PURE__ */ m(Dl, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function sf() {
  const n = cl();
  return al ? n === null || xr(n) : !1;
}
const fi = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", Ll = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", Pl = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", Bl = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function Fl({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, a = !!n && (t || s);
  return s ? /* @__PURE__ */ A(We, { children: [
    a && (l ? /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: `grid min-w-0 ${fi} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${Pl}`}`, children: /* @__PURE__ */ m("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ m("span", { "data-kit-label": !0, className: `grid min-w-0 ${fi} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${Ll}`}`, children: /* @__PURE__ */ m("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ m(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${Bl}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ A(We, { children: [
    a && /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const lf = {
  light: { plain: "bg-zinc-950", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" },
  dark: { plain: "bg-white", blue: "bg-[var(--ui-tab-pill-accent)]", emerald: "bg-[var(--ui-tab-pill-accent)]" }
};
function it({
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
  const h = yt(), p = e ?? (h == null ? void 0 : h.mode) ?? "light", g = t ?? gl(h), y = Nt({ px: 10, py: 7, fs: 12 }, { px: 14, py: 9, fs: 14 }), x = Nt({ px: 12, py: 7, fs: 12 }, { px: 16, py: 9, fs: 14 }), M = Nt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), T = "", S = "", E = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", C = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-400 hover:text-zinc-200"
    }
  }, z = {
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
  }, H = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, v = {
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
  }, L = {
    light: {
      subtle: { base: `${T} text-zinc-600 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-900" },
      primary: { base: `${S} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${T} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${T} text-zinc-400 hover:text-zinc-200 hover:bg-[var(--ui-btn-hover-bg)]`, open: "bg-[var(--ui-btn-hover-bg)]! text-zinc-200" },
      primary: { base: `${S} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${T} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, I = {
    blue: { base: `${S} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" },
    emerald: { base: `${S} bg-[var(--ui-accent-solid)] hover:bg-[var(--ui-accent-solid-hover)] text-[color:var(--ui-accent-action-text)]`, open: "bg-[var(--ui-accent-solid-hover)]!" }
  }, j = d["data-state"] === "open", W = L[p][n], P = n === "primary" ? x : n.startsWith("tab") ? M : y, K = $e ? { padding: "8px 12px", fontSize: "14px", lineHeight: "20px", border: "1px solid transparent" } : { padding: "6px 8px", fontSize: "12px", lineHeight: "16px", border: "1px solid transparent" }, k = O(6, 8, Ee()), _ = O(28, 40, Ee()), q = g === "emerald" ? "emerald" : g ? "blue" : null, le = "bg-[var(--ui-btn-active-bg)]! text-[color:var(--ui-btn-active-text)]!";
  let ie;
  if (n === "tab") {
    const V = C[p];
    ie = r ? q ? z[q].active : V.active : q ? z[q][p === "light" ? "inactiveLight" : "inactiveDark"] : V.inactive;
  } else if (n === "tab-header")
    ie = `${q ? r ? v[q].active : v[q].inactive : r ? H.active : H.inactive} ${j ? q ? v[q].open : H.open : ""}`;
  else if (ie = `${W.base} ${j ? W.open : ""}`, r && (ie = `${ie} ${le}`), n === "primary" && q) {
    const V = I[q];
    ie = j ? `${V.base} ${V.open}` : V.base;
  }
  const ne = !!l && !!s && !i, F = i ? { width: _, height: _, padding: 0, gap: 0 } : o === "minimal" ? { ...K, gap: ne ? 0 : k } : { ...P, gap: ne ? 0 : k };
  return /* @__PURE__ */ m(
    "button",
    {
      type: u,
      "data-mode": p,
      "data-accent": h == null ? void 0 : h.accent,
      className: `${E} ${i ? "justify-center" : ""} ${ne ? "group" : ""} ${ie} ${c}`,
      style: F,
      ...d,
      children: i ? f : /* @__PURE__ */ m(Fl, { icon: s, collapse: l, iconWithLabel: a, active: r, gap: k, children: f })
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
const jl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ql = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], lr = 1900, ar = 2100;
function Jl(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Kl(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function cf({ selected: n, onChange: e, theme: t, showChips: r = !0, className: i = "", initialView: o }) {
  const s = yt(), l = t ?? (s == null ? void 0 : s.mode) ?? "light", a = /* @__PURE__ */ new Date(), c = (() => {
    if (!o) return a;
    const $ = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN($.getTime()) ? a : $;
  })(), [u, f] = Z(c.getFullYear()), [d, h] = Z(c.getMonth()), [p, g] = Z("days"), [y, x] = Z(null), M = wt(() => new Set(n), [n]), T = ($) => {
    M.has($) ? e(n.filter((oe) => oe !== $)) : e([...n, $]);
  }, S = wt(() => {
    const $ = Jl(u, d), oe = new Date(u, d, 1).getDay(), ke = [];
    for (let ce = 0; ce < oe; ce++) ke.push({ key: `pad-${ce}`, day: 0, empty: !0 });
    for (let ce = 1; ce <= $; ce++) ke.push({ key: Kl(u, d, ce), day: ce, empty: !1 });
    return ke;
  }, [u, d]), E = ($) => f((oe) => Math.max(lr, Math.min(ar, oe + $))), C = ($) => {
    d + $ < 0 ? (f((oe) => Math.max(lr, oe - 1)), h(11)) : d + $ > 11 ? (f((oe) => Math.min(ar, oe + 1)), h(0)) : h((oe) => oe + $);
  }, z = () => {
    if (y === null) return;
    const $ = parseInt(y, 10);
    !isNaN($) && $ >= lr && $ <= ar && f($), x(null);
  }, H = ($) => n.some((oe) => oe.startsWith(`${u}-${String($ + 1).padStart(2, "0")}`)), v = Ee(), L = O(4, 8, v), I = O(16, 20, v), j = O(10, 11, v), W = O(6, 8, v), P = O(12, 14, v), K = O(6, 10, v), k = O(12, 14, v), _ = O(8, 12, v), q = O(10, 12, v), le = O(6, 10, v), ie = O(2, 6, v), ne = O(64, 80, v), F = { padding: L }, V = { width: I, height: I }, Y = { fontSize: j, paddingTop: W, paddingBottom: W }, R = { fontSize: P, paddingTop: K, paddingBottom: K }, Q = { fontSize: k, paddingTop: _, paddingBottom: _ }, Me = { fontSize: q, padding: `${ie}px ${le}px` }, ae = "bg-[var(--ui-date-selected-bg)] text-[color:var(--ui-date-selected-text)] hover:bg-[var(--ui-date-selected-hover-bg)]", Le = "text-[color:var(--ui-text)] hover:bg-[var(--ui-card-hover)]";
  return /* @__PURE__ */ A("div", { "data-mode": l, "data-accent": s == null ? void 0 : s.accent, "data-surface": s == null ? void 0 : s.surface, className: `border rounded-lg overflow-hidden w-full border-[color:var(--ui-border-strong)] bg-[var(--ui-date-body-bg)] text-[color:var(--ui-text)] ${i}`, children: [
    /* @__PURE__ */ A("div", { className: "flex items-center justify-between px-3 py-2 border-b bg-[var(--ui-date-header-bg)] text-[color:var(--ui-date-header-text)] border-[color:var(--ui-border)]", children: [
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? E(-1) : C(-1),
          style: F,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ m(Is, { style: V })
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
          value: y ?? String(u),
          onChange: ($) => x($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: z,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), z()), $.key === "Escape" && x(null);
          },
          style: { width: ne },
          className: "text-sm text-center font-semibold rounded outline-none py-0.5 bg-[var(--ui-date-header-hover)] text-[color:var(--ui-date-header-text)]"
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => p === "months" ? E(1) : C(1),
          style: F,
          className: "rounded transition-colors text-[color:var(--ui-date-header-muted)] hover:bg-[var(--ui-date-header-hover)] hover:text-[color:var(--ui-date-header-text)]",
          "aria-label": p === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ m(Pn, { style: V })
        }
      )
    ] }),
    p === "months" ? /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ m("div", { className: "grid grid-cols-3 text-center", children: ql.map(($, oe) => /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: () => {
            h(oe), g("days");
          },
          style: Q,
          className: `relative font-medium transition-colors border-b border-[color:var(--ui-border)] ${oe === d ? ae : Le}`,
          children: [
            $,
            H(oe) && /* @__PURE__ */ m("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${oe === d ? "bg-[var(--ui-date-selected-text)]" : "bg-[var(--ui-accent-solid)]"}` })
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
          style: { paddingTop: K, paddingBottom: K, fontSize: P },
          className: "px-3 font-semibold rounded transition-colors text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-card-hover)]",
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ A("div", { className: "grid grid-cols-7 text-center", children: [
      jl.map(($) => /* @__PURE__ */ m("div", { style: Y, className: "font-semibold uppercase tracking-wider border-b text-[color:var(--ui-text-faint)] border-[color:var(--ui-border)]", children: $ }, $)),
      S.map(($) => $.empty ? /* @__PURE__ */ m("div", {}, $.key) : /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => T($.key),
          style: R,
          className: `font-medium transition-colors border-b border-[color:var(--ui-border)] ${M.has($.key) ? ae : Le}`,
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
      /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-1", children: n.map(($) => {
        const oe = /* @__PURE__ */ new Date($ + "T00:00:00"), ke = oe.getFullYear() === a.getFullYear() ? oe.toLocaleString("default", { month: "short", day: "numeric" }) : oe.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ A(
          "button",
          {
            type: "button",
            onClick: () => T($),
            "aria-label": `Remove ${ke}`,
            style: Me,
            className: "inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors bg-[var(--ui-date-chip-bg)] text-[color:var(--ui-date-chip-text)] hover:bg-[var(--ui-date-chip-hover-bg)]",
            children: [
              ke,
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
  const h = (S) => e instanceof Set ? e.has(S) : e.includes(S), p = Ee(), g = O(12, 16, p), y = O(8, 12, p), x = O(12, 14, p), M = O(16, 20, p), T = r != null || i != null;
  return /* @__PURE__ */ A("div", { className: d, ...f ? { "data-theme": f } : {}, children: [
    T && /* @__PURE__ */ A("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ m("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((S) => {
            const E = h(S.id), C = /* @__PURE__ */ m(co, { checked: E, size: M });
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => t(S.id),
                "aria-pressed": E,
                className: `ui-checklist-item ${E ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${g}px`, fontSize: x },
                ...S.dataProps,
                children: [
                  u === "leading" && C,
                  S.leading != null && /* @__PURE__ */ m("span", { className: "ui-checklist-leading", children: S.leading }),
                  /* @__PURE__ */ m("span", { className: "ui-checklist-label", children: S.label }),
                  S.secondary != null && /* @__PURE__ */ m("span", { className: "ui-checklist-secondary", children: S.secondary }),
                  u === "trailing" && /* @__PURE__ */ m("span", { className: "ml-auto flex shrink-0", children: C })
                ]
              },
              S.id
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
  const u = Ee(), f = s ? 10 : O(12, 16, u), d = s ? 6 : O(8, 12, u), h = s ? 12 : O(12, 14, u), p = s ? 14 : O(16, 20, u);
  return /* @__PURE__ */ A("div", { className: c, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ m("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ A(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const y = e === g.id;
            return /* @__PURE__ */ A(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${y ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${d}px ${f}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ m("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: y && /* @__PURE__ */ m("span", { className: "ui-radio-dot" }) }),
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
  const s = xn(), { refs: l, floatingStyles: a } = _s({
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
          const y = r === "left" ? p - (f.x + f.width) : r === "right" ? d - f.x : 0, x = r === "top" ? h - f.y : r === "bottom" ? g - (f.y + f.height) : 0;
          return { x: c.x + y, y: c.y + x };
        }
      },
      qi(o),
      Ji({ padding: 8 }),
      Ki({ padding: 8 }),
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
    whileElementsMounted: Ws
  });
  return ot(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ A(We, { children: [
    !t && /* @__PURE__ */ m("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Vn(
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
  if (!e || !Ae.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const jt = ({ content: n, children: e }) => {
  const t = yt(), r = Ee(), i = O(10, 12, r), o = O(6, 6, r), s = O(10, 12, r), l = { padding: `${o}px ${i}px`, fontSize: s }, a = tn(), c = xn(), [u, f] = Z(!1), [d, h] = Z({ x: 0, y: 0 }), p = N(null), g = N(null), y = () => {
    if (!p.current) return;
    const T = p.current.getBoundingClientRect();
    h({ x: T.left + T.width / 2, y: T.top });
  };
  te(() => () => {
    g.current && clearTimeout(g.current);
  }, []), te(() => (u && c && (y(), c.addEventListener("scroll", y, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", y, !0)), [u]);
  const x = Vl(e, n), M = Object.keys(x).length > 0 ? Ae.cloneElement(e, x) : e;
  return /* @__PURE__ */ A(
    "div",
    {
      ref: p,
      className: "inline-flex",
      onMouseEnter: () => {
        g.current && clearTimeout(g.current), y(), f(!0);
      },
      onMouseLeave: () => {
        g.current = setTimeout(() => f(!1), 60);
      },
      children: [
        M,
        u && Vn(
          /* @__PURE__ */ A(
            "div",
            {
              "data-mode": t == null ? void 0 : t.mode,
              "data-accent": t == null ? void 0 : t.accent,
              className: "ui-tooltip fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-[color:var(--ui-tooltip-border)] bg-[var(--ui-tooltip-bg)] text-[color:var(--ui-tooltip-text)] pointer-events-none",
              style: { ...l, left: d.x, top: d.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((T, S) => /* @__PURE__ */ m("div", { className: S > 0 ? "mt-0.5 pt-0.5 border-t border-[color:var(--ui-tooltip-sep)]" : "", children: T }, S)),
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
  const [r, i] = Ae.useState(null), [o, s] = Ae.useState(!1), l = Ae.useRef(null), a = Ae.useRef(t);
  a.current = t;
  const c = Ae.useCallback(() => {
    var d;
    const f = (d = e.current) == null ? void 0 : d[a.current];
    f && i({ left: f.offsetLeft, width: f.offsetWidth });
  }, [e]);
  Ae.useLayoutEffect(() => {
    c();
  }, [t, c]), Ae.useLayoutEffect(() => {
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
  const u = Ae.useMemo(
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
function Zn() {
  const n = Ee(), e = $e, t = e ? O(28, 40, n) : 28, r = e ? O(28, 40, n) : 28, i = e ? O(10, 14, n) : 10, o = e ? O(10, 14, n) : 10, s = e ? O(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const hf = $e ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Xl = $e ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Tn = $e ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Gl = "hover:bg-red-950/50", pf = $e ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", mf = "bg-[var(--ui-accent-selected-bg)] border-[var(--ui-border-strong)] text-[color:var(--ui-accent-selected-text)]", gf = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ql = $e ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", yf = $e ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-[var(--ui-input-focus-border)] shrink-0 read-only:opacity-50", ho = $e ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Zl = "inline-flex rounded overflow-hidden border border-[var(--ui-border-strong)]", ea = $e ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Cn = ({ onClick: n, disabled: e, title: t, className: r = Xl, children: i }) => {
  const o = Zn();
  return /* @__PURE__ */ m(jt, { content: t, children: /* @__PURE__ */ m("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, En = {
  wrap: "border-[color:var(--ui-border-strong)] bg-[var(--ui-seg-track-bg)]",
  pill: "bg-[var(--ui-seg-pill)]",
  active: "text-[color:var(--ui-accent-pill-text)]",
  idle: "text-[color:var(--ui-text-muted)] hover:text-[color:var(--ui-text-strong)] hover:bg-[var(--ui-seg-hover)]"
}, xf = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: a, tablist: c, ariaLabel: u }) => {
  const f = yt(), d = a ?? ml(f), h = a === "blue" || a === "emerald" ? a : (f == null ? void 0 : f.accent) ?? "zinc", p = { "data-mode": d === "dark" ? "dark" : "light", "data-accent": h }, g = Zn(), y = s && !$e ? 24 : g.control.height, x = Nt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), M = $e ? x : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, T = (H) => i ? i(H) : n === H, S = Ae.useRef(null), E = Ae.useRef([]), C = Math.max(0, e.findIndex((H) => T(H.v))), z = Ul(S, E, C);
  return l === "track" ? /* @__PURE__ */ A(
    "div",
    {
      ref: S,
      role: c ? "tablist" : "group",
      "aria-label": u,
      ...p,
      className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${En.wrap}`,
      children: [
        z.style && /* @__PURE__ */ m(
          "span",
          {
            "aria-hidden": !0,
            className: `absolute rounded ${En.pill} ${z.motionClass}`,
            style: { ...z.style, top: 2, bottom: 2 }
          }
        ),
        e.map((H, v) => {
          const L = T(H.v);
          return /* @__PURE__ */ A(
            "button",
            {
              ref: (I) => {
                E.current[v] = I;
              },
              ...H.dataProps,
              type: "button",
              disabled: r,
              onClick: () => t(H.v),
              title: H.title,
              role: c ? "tab" : void 0,
              "aria-selected": c ? L : void 0,
              "aria-pressed": c ? void 0 : L,
              "aria-label": H.ariaLabel ?? (H.l ? void 0 : H.title),
              style: M,
              className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${L ? En.active : En.idle}`,
              children: [
                H.icon,
                H.l
              ]
            },
            H.v
          );
        })
      ]
    }
  ) : /* @__PURE__ */ A("div", { ref: S, className: `relative ${Zl} bg-[var(--ui-seg-track-bg)]${o ? " w-full" : ""}`, children: [
    z.style && /* @__PURE__ */ m(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-[var(--ui-accent-pill-bg)] ${z.motionClass}`,
        style: { ...z.style, top: 0, bottom: 0 }
      }
    ),
    e.map((H, v) => {
      const L = T(H.v);
      return /* @__PURE__ */ A(
        "button",
        {
          ref: (I) => {
            E.current[v] = I;
          },
          ...H.dataProps,
          disabled: r,
          onClick: () => t(H.v),
          title: H.title,
          style: { ...g.control, height: y },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${L ? "text-[color:var(--ui-accent-pill-text)]" : "text-[color:var(--ui-text-muted)] hover:bg-[var(--ui-accent-hover-bg)]"} ${H.v !== e[e.length - 1].v ? "border-r border-[var(--ui-border)]" : ""}`,
          children: [
            H.icon,
            H.l
          ]
        },
        H.v
      );
    })
  ] });
}, bf = ({ children: n }) => /* @__PURE__ */ A("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ m("span", { className: $e ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ m("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), ta = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", na = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", vf = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ A("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ m("span", { className: t ? ta : na, children: n }),
  e
] }), wf = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ m("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), kf = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ A("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ m(Cn, { onClick: () => r(-1), disabled: n, title: "Move up", className: Tn, children: /* @__PURE__ */ m(zs, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(Cn, { onClick: () => r(1), disabled: n, title: "Move down", className: Tn, children: /* @__PURE__ */ m($s, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(Cn, { onClick: e, disabled: n, title: "Duplicate", className: Tn, children: /* @__PURE__ */ m(_i, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m("div", { className: ho }),
    /* @__PURE__ */ m(Cn, { onClick: t, disabled: n, title: "Delete", className: `${Tn} ${Gl}`, children: /* @__PURE__ */ m(yr, { className: "w-2.5 h-2.5" }) })
  ] })
);
var hi = Object.defineProperty, ra = (n, e) => {
  let t = {};
  for (var r in n) hi(t, r, {
    get: n[r],
    enumerable: !0
  });
  return hi(t, Symbol.toStringTag, { value: "Module" }), t;
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
function po(n, e, t) {
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
      return a && a < s.length && a < l.length && yo(s.charCodeAt(a - 1)) && go(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = po(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function mo(n, e, t, r) {
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
      return f && d && f < c.length && yo(c.charCodeAt(f - 1)) && go(c.charCodeAt(f)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = mo(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function go(n) {
  return n >= 56320 && n < 57344;
}
function yo(n) {
  return n >= 55296 && n < 56320;
}
class D {
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
    return new D(i, this.size + e.size);
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
    return new D(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? D.empty : e == 0 && t == this.content.length ? this : new D(this.content.slice(e, t));
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
    return i[e] = t, new D(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new D([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new D(this.content.concat(e), this.size + e.nodeSize);
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
    return po(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return mo(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Mn(0, e);
    if (e == this.size)
      return Mn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Mn(t + 1, o) : Mn(t, r);
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
      return D.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return D.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return D.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new D(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return D.empty;
    if (e instanceof D)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new D([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
D.empty = new D([], 0);
const cr = { index: 0, offset: 0 };
function Mn(n, e) {
  return cr.index = n, cr.offset = e, cr;
}
function Fn(n, e) {
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
      if (!Fn(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Fn(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let ve = class kr {
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
    return this == e || this.type == e.type && Fn(this.attrs, e.attrs);
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
      return kr.none;
    if (e instanceof kr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
ve.none = [];
class fn extends Error {
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
    let r = bo(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new U(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new U(xo(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
    return new U(D.fromJSON(e, t.content), r, i);
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
U.empty = new U(D.empty, 0, 0);
function xo(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(xo(o.content, e - i - 1, t - i - 1)));
}
function bo(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = bo(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(s, a.copy(c));
}
function ia(n, e, t) {
  if (t.openStart > n.depth)
    throw new fn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new fn("Inconsistent open depths");
  return vo(n, e, t, 0);
}
function vo(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = vo(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return zt(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = oa(t, n);
      return zt(o, ko(n, s, l, e, r));
    }
  else return zt(o, Hn(n, e, r));
}
function wo(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new fn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Sr(n, e, t) {
  let r = n.node(t);
  return wo(r, e.node(t)), r;
}
function It(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function an(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (It(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    It(i.child(l), r);
  e && e.depth == t && e.textOffset && It(e.nodeBefore, r);
}
function zt(n, e) {
  if (!n.type.validContent(e))
    throw new fn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function ko(n, e, t, r, i) {
  let o = n.depth > i && Sr(n, e, i + 1), s = r.depth > i && Sr(t, r, i + 1), l = [];
  return an(null, n, i, l), o && s && e.index(i) == t.index(i) ? (wo(o, s), It(zt(o, ko(n, e, t, r, i + 1)), l)) : (o && It(zt(o, Hn(n, e, i + 1)), l), an(e, t, i, l), s && It(zt(s, Hn(t, r, i + 1)), l)), an(r, null, i, l), new D(l);
}
function Hn(n, e, t) {
  let r = [];
  if (an(null, n, t, r), n.depth > t) {
    let i = Sr(n, e, t + 1);
    It(zt(i, Hn(n, e, t + 1)), r);
  }
  return an(e, null, t, r), new D(r);
}
function oa(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(D.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class hn {
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
      return ve.none;
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
        return new _n(this, e, r);
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
    return new hn(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = pi.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      pi.set(e, r = new sa());
    let i = r.elts[r.i] = hn.resolve(e, t);
    return r.i = (r.i + 1) % la, i;
  }
}
class sa {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const la = 12, pi = /* @__PURE__ */ new WeakMap();
class _n {
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
let Vt = class Nr {
  /**
  @internal
  */
  constructor(e, t, r, i = ve.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || D.empty;
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
    return this.type == e && Fn(this.attrs, t || e.defaultAttrs || aa) && ve.sameSet(this.marks, r || ve.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new Nr(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new Nr(this.type, this.attrs, this.content, e);
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
    return hn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return hn.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), So(this.marks, e);
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
  canReplace(e, t, r = D.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), mi(this.type.attrs, this.attrs, "node", this.type.name);
    let e = ve.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      mi(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
    }
    if (!ve.sameSet(e, this.marks))
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
    let i = D.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Vt.prototype.text = void 0;
class Wn extends Vt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : So(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Wn(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Wn(this.type, this.attrs, e, this.marks);
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
function So(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
function mi(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
class Dt {
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
      return Dt.empty;
    let i = No(r);
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
        return D.from(l.map((c) => c.createAndFill()));
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
Dt.empty = new Dt(!0);
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
function No(n) {
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
function gi(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function fa(n, e) {
  let t = gi(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = gi(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
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
    let e = No(n);
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
function To(n, e) {
  return e - n;
}
function yi(n, e) {
  let t = [];
  return r(e), t.sort(To);
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
  return t(yi(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        yi(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new Dt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(To);
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
function Co(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function Eo(n, e) {
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
function Mo(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new ba(n, r, e[r]);
  return t;
}
class jn {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = Mo(e, r.attrs), this.defaultAttrs = Co(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == Dt.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : Eo(this.attrs, e);
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
    return new Vt(this, this.computeAttrs(e), D.from(t), ve.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = D.from(t), this.checkContent(t), new Vt(this, this.computeAttrs(e), t, ve.setFrom(r));
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
    if (e = this.computeAttrs(e), t = D.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(D.empty, !0);
    return o ? new Vt(this, e, t.append(o), ve.setFrom(r)) : null;
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
    return t ? t.length ? t : ve.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new jn(o, t, s));
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
class er {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = Mo(e, i.attrs), this.excluded = null;
    let o = Co(this.attrs);
    this.instance = o ? new ve(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new ve(this, Eo(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new er(o, i++, t, s)), r;
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
    t.nodes = Pe.from(e.nodes), t.marks = Pe.from(e.marks || {}), this.nodes = jn.compile(this.spec.nodes, this), this.marks = er.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = Dt.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? xi(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : xi(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Vt.fromJSON(this, i), this.markFromJSON = (i) => ve.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof jn) {
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
    return new Wn(r, r.defaultAttrs, e, ve.setFrom(t));
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
function xi(n, e) {
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
    let r = new vi(this, t, !1);
    return r.addAll(e, ve.none, t.from, t.to), r.finish();
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
    let r = new vi(this, t, !0);
    return r.addAll(e, ve.none, t.from, t.to), U.maxOpen(r.finish());
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
        r(s = wi(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = wi(s)), s.node || s.ignore || s.mark || (s.node = i);
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
const Ro = {
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
}, Ao = { ol: !0, ul: !0 }, pn = 1, Tr = 2, cn = 4;
function bi(n, e, t) {
  return e != null ? (e ? pn : 0) | (e === "full" ? Tr : 0) : n && n.whitespace == "pre" ? pn | Tr : t & ~cn;
}
class Rn {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = ve.none, this.match = o || (s & cn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(D.from(e));
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
    if (!(this.options & pn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = D.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(D.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Ro.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class vi {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = bi(null, t.preserveWhitespace, 0) | (r ? cn : 0);
    i ? o = new Rn(i.type, i.attrs, ve.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Rn(null, null, ve.none, !0, null, s) : o = new Rn(e.schema.topNodeType, null, ve.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & Tr ? "full" : this.localPreserveWS || (i.options & pn) > 0, { schema: s } = this.parser;
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
    Ao.hasOwnProperty(s) && this.parser.normalizeLists && Na(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Sa.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Ro.hasOwnProperty(s))
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
      let s = ve.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : ki(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = bi(e, o, s.options);
    s.options & cn && s.content.length == 0 && (l |= cn);
    let a = ve.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : ki(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Rn(e, t, a, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= pn);
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
    r && Ao.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Ta(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function wi(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function ki(n, e) {
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
const Io = 65535, zo = Math.pow(2, 16);
function Ca(n, e) {
  return n + e * zo;
}
function Si(n) {
  return n & Io;
}
function Ea(n) {
  return (n - (n & Io)) / zo;
}
const $o = 1, Do = 2, Dn = 4, Oo = 8;
class Cr {
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
    return (this.delInfo & Oo) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & ($o | Dn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (Do | Dn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & Dn) > 0;
  }
}
class Xe {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Xe.empty)
      return Xe.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = Si(e);
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
        let p = e == (t < 0 ? a : f) ? null : Ca(l / 3, e - a), g = e == a ? Do : e == f ? $o : Dn;
        return (t < 0 ? e != a : e != f) && (g |= Oo), new Cr(h, g, p);
      }
      i += u - c;
    }
    return r ? e + i : new Cr(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = Si(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Xe(this.ranges, !this.inverted);
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
    return e == 0 ? Xe.empty : new Xe(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Xe.empty = new Xe([]);
class qn {
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
    return new qn(this._maps, this.mirror, e, t);
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
    let e = new qn();
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
    return r ? e : new Cr(e, i, null);
  }
}
const ur = /* @__PURE__ */ Object.create(null);
class _e {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Xe.empty;
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
    let r = ur[t.stepType];
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
    if (e in ur)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return ur[e] = t, t.prototype.jsonID = e, t;
  }
}
class ze {
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
    return new ze(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ze(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return ze.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof fn)
        return ze.fail(o.message);
      throw o;
    }
  }
}
function qr(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(qr(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return D.fromArray(r);
}
class kt extends _e {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new U(qr(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ze.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new st(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new kt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof kt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new kt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new kt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
_e.jsonID("addMark", kt);
class st extends _e {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new U(qr(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ze.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new kt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new st(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof st && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new st(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new st(t.from, t.to, e.markFromJSON(t.mark));
  }
}
_e.jsonID("removeMark", st);
class St extends _e {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ze.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ze.fromReplace(e, this.pos, this.pos + 1, new U(D.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new St(this.pos, t.marks[i]);
        return new St(this.pos, this.mark);
      }
    }
    return new Ot(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new St(t.pos, this.mark);
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
    return new St(t.pos, e.markFromJSON(t.mark));
  }
}
_e.jsonID("addNodeMark", St);
class Ot extends _e {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ze.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ze.fromReplace(e, this.pos, this.pos + 1, new U(D.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new St(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Ot(t.pos, this.mark);
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
    return new Ot(t.pos, e.markFromJSON(t.mark));
  }
}
_e.jsonID("removeNodeMark", Ot);
class Ie extends _e {
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
    return this.structure && Er(e, this.from, this.to) ? ze.fail("Structure replace would overwrite content") : ze.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Xe([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new Ie(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && Ie.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new Ie(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof Ie) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? U.empty : new U(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new Ie(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? U.empty : new U(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new Ie(e.from, this.to, t, this.structure);
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
    return new Ie(t.from, t.to, U.fromJSON(e, t.slice), !!t.structure);
  }
}
Ie.MAP_BIAS = 1;
_e.jsonID("replace", Ie);
class Oe extends _e {
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
    if (this.structure && (Er(e, this.from, this.gapFrom) || Er(e, this.gapTo, this.to)))
      return ze.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ze.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ze.fromReplace(e, this.from, this.to, r) : ze.fail("Content does not fit in gap");
  }
  getMap() {
    return new Xe([
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
    return new Oe(t.from, t.to, t.gapFrom, t.gapTo, U.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
_e.jsonID("replaceAround", Oe);
function Er(n, e, t) {
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
        f[g].isInSet(p) || (s && s.to == d && s.mark.eq(f[g]) ? s.to = h : i.push(s = new st(d, h, f[g])));
      l && l.to == d ? l.to = h : o.push(l = new kt(d, h, r));
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
    if (r instanceof er) {
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
  }), i.forEach((s) => n.step(new st(s.from, s.to, s.style)));
}
function Jr(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, f = r.matchType(c.type);
    if (!f)
      s.push(new Ie(l, u, U.empty));
    else {
      r = f;
      for (let d = 0; d < c.marks.length; d++)
        t.allowsMarkType(c.marks[d].type) || n.step(new st(l, u, c.marks[d]));
      if (i && c.isText && t.whitespace != "pre") {
        let d, h = /\r?\n|\r/g, p;
        for (; d = h.exec(c.text); )
          p || (p = new U(D.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new Ie(l + d.index, l + d.index + d[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(D.empty, !0);
    n.replace(l, l, new U(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function Aa(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function nn(n) {
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
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = D.empty, f = 0;
  for (let p = o, g = !1; p > t; p--)
    g || r.index(p) > 0 ? (g = !0, u = D.from(r.node(p).copy(u)), f++) : a--;
  let d = D.empty, h = 0;
  for (let p = o, g = !1; p > t; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, d = D.from(i.node(p).copy(d)), h++) : c++;
  n.step(new Oe(a, c, s, l, new U(u.append(d), f, h), u.size - f, !0));
}
function Lo(n, e, t = null, r = n) {
  let i = za(n, e), o = i && $a(r, e);
  return o ? i.map(Ni).concat({ type: e, attrs: t }).concat(o.map(Ni)) : null;
}
function Ni(n) {
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
  let r = D.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = D.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new Oe(i, o, i, o, new U(r, 0, 0), t.length, !0));
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
      c === !1 && Bo(n, s, l, o), Jr(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(o), f = u.map(l, 1), d = u.map(l + s.nodeSize, 1);
      return n.step(new Oe(f, d, f + 1, d - 1, new U(D.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Po(n, s, l, o), !1;
    }
  });
}
function Po(n, e, t, r) {
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
function Bo(n, e, t, r) {
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
  n.step(new Oe(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new U(D.from(s), 0, 0), 1, !0));
}
function mt(n, e, t = 1, r) {
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
  let i = n.doc.resolve(e), o = D.empty, s = D.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = D.from(i.node(l).copy(o));
    let u = r && r[c];
    s = D.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new Ie(e, e, new U(o.append(s), t, t), !0));
}
function Bt(n, e) {
  let t = n.resolve(e), r = t.index();
  return Fo(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
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
function Fo(n, e) {
  return !!(n && e && !n.isLeaf && Fa(n, e));
}
function tr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Fo(o, s) && r.node(i).canReplace(l, l + 1))
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
    Bo(n, u.node(), u.before(), l);
  }
  s.inlineContent && Jr(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new Ie(c, a.map(e + t, -1), U.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    Po(n, u.node(), u.before(), n.steps.length);
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
function nr(n, e, t = e, r = U.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return Ho(i, o, r) ? new Ie(e, t, r) : new Wa(i, o, r).fit();
}
function Ho(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Wa {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = D.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = D.from(e.node(i).copy(this.placed));
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
    return e > -1 ? new Oe(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new Ie(r.pos, i.pos, a) : null;
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
        r ? (o = dr(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, f = null;
          if (t == 1 && (s ? c.matchType(s.type) || (f = c.fillBefore(D.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: f };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = dr(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new U(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = dr(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new U(sn(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new U(sn(e, t, 1), t, r);
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
      c++, (c > 1 || a == 0 || g.content.size) && (f = y, u.push(_o(g.mark(d.allowedMarks(g.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = ln(this.placed, t, D.from(u)), this.frontier[t].match = f, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = l; g < h; g++) {
      let x = y.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), y = x.content;
    }
    this.unplaced = p ? e == 0 ? U.empty : new U(sn(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new U(sn(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !fr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = fr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = fr(e, l, c, a, !0);
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
    t.fit.childCount && (this.placed = ln(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = ln(this.placed, this.depth, D.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(D.empty, !0);
    t.childCount && (this.placed = ln(this.placed, this.frontier.length, t));
  }
}
function sn(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(sn(n.firstChild.content, e - 1, t)));
}
function ln(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(ln(n.lastChild.content, e - 1, t)));
}
function dr(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function _o(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, _o(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(D.empty, !0)))), n.copy(r);
}
function fr(n, e, t, r, i) {
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
  if (Ho(i, o, r))
    return n.step(new Ie(e, t, r));
  let s = jo(i, o);
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
        let y = s[(g + a) % s.length], x = !0;
        y < 0 && (x = !1, y = -y);
        let M = i.node(y - 1), T = i.index(y - 1);
        if (M.canReplaceWith(T, T, p.type, p.marks))
          return n.replace(i.before(y), x ? o.after(y) : t, new U(Wo(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let f = n.steps.length;
  for (let d = s.length - 1; d >= 0 && (n.replace(e, t, r), !(n.steps.length > f)); d--) {
    let h = s[d];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Wo(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Wo(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(D.empty, !0));
  }
  return n;
}
function Ka(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = _a(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new U(D.from(r), 0, 0));
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
  let o = jo(r, i);
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
function jo(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Ut extends _e {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ze.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return ze.fromReplace(e, this.pos, this.pos + 1, new U(D.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Xe.empty;
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
_e.jsonID("attr", Ut);
class mn extends _e {
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
    return ze.ok(r);
  }
  getMap() {
    return Xe.empty;
  }
  invert(e) {
    return new mn(this.attr, e.attrs[this.attr]);
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
    return new mn(t.attr, t.value);
  }
}
_e.jsonID("docAttr", mn);
let Qt = class extends Error {
};
Qt = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Qt.prototype = Object.create(Error.prototype);
Qt.prototype.constructor = Qt;
Qt.prototype.name = "TransformError";
class Ya {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new qn();
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
      throw new Qt(t.failed);
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
    let i = nr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new U(D.from(r), 0, 0));
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
    return this.step(new mn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new St(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof ve)
      t.isInSet(r.marks) && this.step(new Ot(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new Ot(e, o)), i = o.removeFromSet(i);
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
    return Jr(this, e, t, r), this;
  }
}
const hr = /* @__PURE__ */ Object.create(null);
class Ne {
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
  replace(e, t = U.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? U.empty : t), l == 0 && Ei(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), Ei(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new Ye(e) : qt(e.node(0), e.parent, e.pos, e.index(), t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new lt(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return qt(e, e, 0, 0, 1) || new lt(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return qt(e, e, e.content.size, e.childCount, -1) || new lt(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = hr[t.type];
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
    if (e in hr)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return hr[e] = t, t.prototype.jsonID = e, t;
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
    return Ye.between(this.$anchor, this.$head).getBookmark();
  }
}
Ne.prototype.visible = !0;
class Ua {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let Ti = !1;
function Ci(n) {
  !Ti && !n.parent.inlineContent && (Ti = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class Ye extends Ne {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    Ci(e), Ci(t), super(e, t);
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
      return Ne.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new Ye(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = U.empty) {
    if (super.replace(e, t), t == U.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Ye && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new rr(this.anchor, this.head);
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
    return new Ye(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = Ne.findFrom(t, r, !0) || Ne.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return Ne.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (Ne.findFrom(e, -r, !0) || Ne.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Ye(e, t);
  }
}
Ne.jsonID("text", Ye);
class rr {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new rr(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Ye.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class we extends Ne {
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
    return r ? Ne.near(o) : new we(o);
  }
  content() {
    return new U(D.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof we && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Kr(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new we(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new we(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
we.prototype.visible = !1;
Ne.jsonID("node", we);
class Kr {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new rr(r, r) : new Kr(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && we.isSelectable(r) ? new we(t) : Ne.near(t);
  }
}
class lt extends Ne {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = U.empty) {
    if (t == U.empty) {
      e.delete(0, e.doc.content.size);
      let r = Ne.atStart(e.doc);
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
    return new lt(e);
  }
  map(e) {
    return new lt(e);
  }
  eq(e) {
    return e instanceof lt;
  }
  getBookmark() {
    return Xa;
  }
}
Ne.jsonID("all", lt);
const Xa = {
  map() {
    return this;
  },
  resolve(n) {
    return new lt(n);
  }
};
function qt(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Ye.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && we.isSelectable(l))
        return we.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = qt(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function Ei(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof Ie || i instanceof Oe))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(Ne.near(n.doc.resolve(s), t));
}
function Mi(n, e) {
  return !e || !n ? n : n.bind(e);
}
class An {
  constructor(e, t, r) {
    this.name = e, this.init = Mi(t.init, r), this.apply = Mi(t.apply, r);
  }
}
new An("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new An("selection", {
  init(n, e) {
    return n.selection || Ne.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new An("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new An("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const qo = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Jo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Ko = (n, e, t) => {
  let r = Jo(n, t);
  if (!r)
    return !1;
  let i = Vr(r);
  if (!i) {
    let s = r.blockRange(), l = s && nn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (ts(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Zt(o, "end") || we.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = nr(n.doc, r.before(s), r.after(s), U.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Zt(o, "end") ? Ne.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : we.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Ga = (n, e, t) => {
  let r = Jo(n, t);
  if (!r)
    return !1;
  let i = Vr(r);
  return i ? Vo(n, i, e) : !1;
}, Qa = (n, e, t) => {
  let r = Uo(n, t);
  if (!r)
    return !1;
  let i = Yr(r);
  return i ? Vo(n, i, e) : !1;
};
function Vo(n, e, t) {
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
  let c = nr(n.doc, o, a, U.empty);
  if (!c || c.from != o || c instanceof Ie && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(Ye.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function Zt(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Yo = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Vr(r);
  }
  let s = o && o.nodeBefore;
  return !s || !we.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(we.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Vr(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Uo(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Xo = (n, e, t) => {
  let r = Uo(n, t);
  if (!r)
    return !1;
  let i = Yr(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (ts(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Zt(o, "start") || we.isSelectable(o))) {
    let s = nr(n.doc, r.before(), r.after(), U.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Zt(o, "start") ? Ne.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : we.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Go = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Yr(r);
  }
  let s = o && o.nodeAfter;
  return !s || !we.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(we.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Yr(n) {
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
  let t = n.selection, r = t instanceof we, i;
  if (r) {
    if (t.node.isTextblock || !Bt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = tr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(we.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, ec = (n, e) => {
  let t = n.selection, r;
  if (t instanceof we) {
    if (t.node.isTextblock || !Bt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = tr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, tc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && nn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Qo = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ur(n) {
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
  let i = t.node(-1), o = t.indexAfter(-1), s = Ur(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(Ne.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Zo = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof lt || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ur(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Ye.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, es = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (mt(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && nn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function rc(n) {
  return (e, t) => {
    if (e.selection instanceof we && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !mt(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Ye || e.selection instanceof lt) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = Ur(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let f = i.pos, d = mt(r.doc, f, s.length, s);
    if (d || (s[0] = a ? { type: a } : null, d = mt(r.doc, f, s.length, s)), !d)
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
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(we.create(n.doc, i))), !0);
};
function sc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Bt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function ts(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && sc(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, p = D.empty;
      for (let x = s.length - 1; x >= 0; x--)
        p = D.from(s[x].create(null, p));
      p = D.from(i.copy(p));
      let g = n.tr.step(new Oe(e.pos - 1, h, e.pos, h, new U(p, 1, 0), s.length, !0)), y = g.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && Bt(g.doc, y.pos) && g.join(y.pos), t(g.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : Ne.findFrom(e, 1), f = u && u.$from.blockRange(u.$to), d = f && nn(f);
  if (d != null && d >= e.depth)
    return t && t(n.tr.lift(f, d).scrollIntoView()), !0;
  if (c && Zt(o, "start", !0) && Zt(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let g = o, y = 1;
    for (; !g.isTextblock; g = g.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let x = D.empty;
        for (let T = p.length - 1; T >= 0; T--)
          x = D.from(p[T].copy(x));
        let M = n.tr.step(new Oe(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new U(x, p.length, 0), 0, !0));
        t(M.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function ns(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Ye.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const lc = ns(-1), ac = ns(1);
function cc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Lo(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function Ri(n, e = null) {
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
function Xr(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Xr(qo, Ko, Yo);
Xr(qo, Xo, Go);
Xr(Qo, Zo, es, ic);
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
    o = new _n(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new _n(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Lo(o, t, r, e);
  return l ? (n && fc(n, e, l, i, t), !0) : !1;
}
function fc(n, e, t, r, i) {
  let o = D.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = D.from(t[u].type.create(t[u].attrs, o));
  n.step(new Oe(e.start - (r ? 2 : 0), e.end, e.start, e.end, new U(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, f = e.endIndex, d = !0; u < f; u++, d = !1)
    !d && mt(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
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
  o < s && (i.step(new Oe(o - 1, s, o, s, new U(D.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new _n(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = nn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Bt(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function mc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, g = t.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? D.empty : D.from(i))))
    return !1;
  let f = o.pos, d = f + s.nodeSize;
  return r.step(new Oe(f - (l ? 1 : 0), d + (a ? 1 : 0), f + 1, d - 1, new U((l ? D.empty : D.from(i.copy(D.empty))).append(a ? D.empty : D.from(i.copy(D.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
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
      let c = a.lastChild && a.lastChild.type == l.type, u = D.from(c ? n.create() : null), f = new U(D.from(n.create(null, D.from(l.type.create(null, u)))), c ? 3 : 1, 0), d = o.start, h = o.end;
      t(e.tr.step(new Oe(d - (c ? 3 : 1), h, d, h, f, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function rs(n) {
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
var yc = class is {
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
        const y = this.buildProps(c, t), x = h(...g)(y);
        return l.push(x), f;
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
    const e = is.createFakeChain();
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
      state: rs({
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
      const p = nn(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = f.parent.contentMatchAt(f.index());
        e.setNodeMarkup(h.start, g);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, wc = (n) => (e) => n(e), kc = () => ({ state: n, dispatch: e }) => Zo(n, e), Sc = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Ze(r.doc.resolve(Math.max(s - 1, 0)))), !0;
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
function He(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const Tc = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = He(n, t.schema), o = e.selection.$anchor;
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
}, Ec = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, Ai = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Ec(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Mc = (n, e, t) => ({
  from: Ai(n, t, "left"),
  to: Ai(e, t, "right")
}), Rc = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = Mc(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(Ze.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Ac = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Ic = () => ({ state: n, dispatch: e }) => nc(n, e);
function zc(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Jn(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : zc(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function ss(n, e, t = {}) {
  return n.find((r) => r.type === e && Jn(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function Ii(n, e, t = {}) {
  return !!ss(n, e, t);
}
function ls(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e)) return;
  if (!t) {
    const a = r.node.marks.find((c) => c.type === e);
    a && (t = a.attrs);
  }
  if (!ss([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && Ii([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && Ii([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function Tt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const $c = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = Tt(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const f = ls(a, o, e);
    if (f && f.from <= c && f.to >= u) {
      const d = Ze.create(s, f.from, f.to);
      t.setSelection(d);
    }
  }
  return !0;
}, Dc = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function as(n) {
  return n instanceof Ze;
}
function At(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Oc(n, e = null) {
  if (!e) return null;
  const t = Kt.atStart(n), r = Kt.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Ze.create(n, At(0, i, o), At(n.content.size, i, o)) : Ze.create(n, At(e, i, o), At(e, i, o));
}
function zi() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function Kn() {
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
    (Kn() || zi()) && r.dom.focus(), Lc() && !Kn() && !zi() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !as(t.state.selection))
    return s(), !0;
  const l = Oc(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Bc = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), Fc = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), cs = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && cs(r);
  }
  return n;
};
function In(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return cs(t);
}
function us(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function en(n, e, t) {
  if (us(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return D.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), en("", e, t);
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
      if (t.slice ? Yt.fromSchema(a).parseSlice(In(n), t.parseOptions) : Yt.fromSchema(a).parse(In(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Yt.fromSchema(e);
    return t.slice ? o.parseSlice(In(n), t.parseOptions).content : o.parse(In(n), t.parseOptions);
  }
  return en("", e, t);
}
function ds(n) {
  return !("type" in n);
}
function fs(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof Ie || i instanceof Oe)) return;
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
      en(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: !0
      });
    } catch (y) {
      a(y);
    }
    try {
      var s;
      l = en(e, o.schema, {
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
    const p = ds(l) ? l.content : [l];
    if (p.forEach((y) => {
      y.check(), d = d ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === f && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, f += 1);
    }
    let g;
    if (d)
      Array.isArray(e) ? g = e.map((y) => y.text || "").join("") : us(e) ? g = p.map((y) => {
        var x;
        return (x = y.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, f);
    else {
      g = D.from(p);
      const y = r.doc.resolve(u), x = y.node(), M = y.parentOffset === 0, T = x.isText || x.isTextblock, S = x.content.size > 0;
      M && T && S && h && (u = Math.max(0, u - 1)), r.replaceWith(u, f, p);
    }
    t.updateSelection && fs(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function hs(n) {
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
  const c = hs(a.parent.contentMatchAt(a.index()));
  if (!c) return !1;
  const u = Object.keys(c.spec.attrs || {}), f = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let d;
  if (s) {
    const h = en(s, r.schema);
    d = c.createAndFill(f, h);
  } else d = c.createAndFill(f);
  return d ? (t && (e.insert(a.pos, d), l && fs(e, e.steps.length - 1, -1)), !0) : !1;
}, Wc = () => ({ state: n, dispatch: e }) => Za(n, e), jc = () => ({ state: n, dispatch: e }) => ec(n, e), qc = () => ({ state: n, dispatch: e }) => Ko(n, e), Jc = () => ({ state: n, dispatch: e }) => Xo(n, e), Kc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = tr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Vc = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = tr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Yc = () => ({ state: n, dispatch: e }) => Ga(n, e), Uc = () => ({ state: n, dispatch: e }) => Qa(n, e);
function ps() {
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
      Kn() || ps() ? s = !0 : i = !0;
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
function Gr(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? He(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, f) => {
    if (u.isText) return;
    const d = Math.max(r, f), h = Math.min(i, f + u.nodeSize);
    l.push({
      node: u,
      from: d,
      to: h
    });
  });
  const a = i - r, c = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Jn(u.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((u, f) => u + f.to - f.from, 0) >= a;
}
const Qc = (n, e = {}) => ({ state: t, dispatch: r }) => Gr(t, He(n, t.schema), e) ? tc(t, r) : !1, Zc = () => ({ state: n, dispatch: e }) => es(n, e), eu = (n) => ({ state: e, dispatch: t }) => {
  const r = He(n, e.schema);
  return hc(r)(e, t);
}, tu = () => ({ state: n, dispatch: e }) => Qo(n, e);
function ms(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function $i(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const nu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = ms(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = He(n, r.schema)), l === "mark" && (s = Tt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, f) => {
      o && o === u.type && (a = !0, i && t.setNodeMarkup(f, void 0, $i(u.attrs, e))), s && u.marks.length && u.marks.forEach((d) => {
        s === d.type && (a = !0, i && t.addMark(f, f + u.nodeSize, s.create($i(d.attrs, e))));
      });
    });
  }), a;
}, ru = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), iu = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Ys(n.doc);
    n.setSelection(t);
  }
  return !0;
}, ou = () => ({ state: n, dispatch: e }) => Yo(n, e), su = () => ({ state: n, dispatch: e }) => Go(n, e), lu = () => ({ state: n, dispatch: e }) => oc(n, e), au = () => ({ state: n, dispatch: e }) => ac(n, e), cu = () => ({ state: n, dispatch: e }) => lc(n, e);
function uu(n, e, t = {}, r = {}) {
  return en(n, e, {
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
      const u = ds(c) ? c.content : [c];
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
  const t = Tt(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
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
function Qr(n) {
  return (e) => pu(e.$from, n);
}
function gn(n, e, t) {
  return n.config[e] === void 0 && n.parent ? gn(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? gn(n.parent, e, t) : null
  }) : n.config[e];
}
function mu(n) {
  return typeof n == "function";
}
function Mr(n, e = void 0, ...t) {
  return mu(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function gs(n) {
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
function On(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function wu(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? Tt(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Jn(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: f }) => {
    const d = u.pos, h = f.pos;
    n.doc.nodesBetween(d, h, (p, g) => {
      if (o && p.inlineContent && !p.type.allowsMarkType(o)) return !1;
      if (!p.isText && !p.marks.length) return;
      const y = Math.max(d, g), x = Math.min(h, g + p.nodeSize), M = x - y;
      s += M, l.push(...p.marks.map((T) => ({
        mark: T,
        from: y,
        to: x
      })));
    });
  }), s === 0) return !1;
  const a = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Jn(u.mark.attrs, t, { strict: !1 })).reduce((u, f) => u + f.to - f.from, 0), c = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, f) => u + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function pr(n, e) {
  const { nodeExtensions: t } = gs(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = Mr(gn(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function ys(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (ys(o, {
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
  if (as(r) && (i = r.$cursor), i) {
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
  const { selection: o } = t, { empty: s, ranges: l } = o, a = Tt(n, r.schema);
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
        d.marks.find((y) => y.type === a) ? d.marks.forEach((y) => {
          a === y.type && t.addMark(p, g, a.create({
            ...y.attrs,
            ...e
          }));
        }) : t.addMark(p, g, a.create(e));
      });
    });
  return ku(r, t, a);
}, Nu = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Tu = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = He(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => Ri(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => Ri(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Cu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = At(n, 0, r.content.size), o = Xt.create(r, i);
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
    } : n, s = Ze.atStart(r).from, l = Ze.atEnd(r).to, a = At(i, s, l), c = At(o, s, l), u = Ze.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, Ru = (n) => ({ state: e, dispatch: t }) => {
  const r = He(n, e.schema);
  return gc(r)(e, t);
};
function Di(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const Au = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = On(c, l.node().type.name, l.node().attrs);
  if (o instanceof Xt && o.node.isBlock)
    return !l.parentOffset || !mt(s, l.pos) ? !1 : (r && (n && Di(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const f = a.parentOffset === a.parent.content.size, d = l.depth === 0 ? void 0 : hs(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = f && d ? [{
    type: d,
    attrs: u
  }] : void 0, p = mt(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && mt(e.doc, e.mapping.map(l.pos), 1, d ? [{ type: d }] : void 0) && (p = !0, h = d ? [{
    type: d,
    attrs: u
  }] : void 0), r) {
    if (p && (o instanceof Ze && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), d && !f && !l.parentOffset && l.parent.type !== d)) {
      const g = e.mapping.map(l.before()), y = e.doc.resolve(g);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, d) && e.setNodeMarkup(e.mapping.map(l.before()), d);
    }
    n && Di(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, Iu = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = He(n, r.schema), { $from: l, $to: a } = r.selection, c = r.selection.node;
  if (c && c.isBlock || l.depth < 2 || !l.sameParent(a)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const f = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var d;
      let x = D.empty;
      const M = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let H = l.depth - M; H >= l.depth - 3; H -= 1) x = D.from(l.node(H).copy(x));
      const T = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, S = {
        ...On(f, l.node().type.name, l.node().attrs),
        ...e
      }, E = ((d = s.contentMatch.defaultType) === null || d === void 0 ? void 0 : d.createAndFill(S)) || void 0;
      x = x.append(D.from(s.createAndFill(null, E) || void 0));
      const C = l.before(l.depth - (M - 1));
      t.replace(C, l.after(-T), new U(x, 4 - M, 0));
      let z = -1;
      t.doc.nodesBetween(C, t.doc.content.size, (H, v) => {
        if (z > -1) return !1;
        H.isTextblock && H.content.size === 0 && (z = v + 1);
      }), z > -1 && t.setSelection(Ze.near(t.doc.resolve(z))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === l.end() ? u.contentMatchAt(0).defaultType : null, p = {
    ...On(f, u.type.name, u.attrs),
    ...e
  }, g = {
    ...On(f, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, a.pos);
  const y = h ? [{
    type: s,
    attrs: p
  }, {
    type: h,
    attrs: g
  }] : [{
    type: s,
    attrs: p
  }];
  if (!mt(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: M } = r, { splittableMarks: T } = o.extensionManager, S = M || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, y).scrollIntoView(), !S || !i) return !0;
    const E = S.filter((C) => T.includes(C.type.name));
    t.ensureMarks(E);
  }
  return !0;
};
function Oi(n) {
  return !n || n === "1" ? null : n;
}
function xs(n, e) {
  return Oi(n) === Oi(e);
}
const mr = (n, e) => {
  const t = Qr((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Bt(n.doc, t.pos)) || !xs(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, gr = (n, e) => {
  const t = Qr((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Bt(n.doc, r)) || !xs(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function zu(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Ze.between(r, i);
}
const $u = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: f, splittableMarks: d } = i.extensionManager, h = He(n, s.schema), p = He(e, s.schema), { selection: g, storedMarks: y } = s, { $from: x, $to: M } = g, T = x.blockRange(M), S = y || g.$to.parentOffset && g.$from.marks();
  if (!T) return !1;
  const E = Qr((W) => pr(W.type.name, f))(g), C = g.from === 0 && g.to === s.doc.content.size, z = s.doc.content.content, H = z.length === 1 ? z[0] : null, v = C && H && pr(H.type.name, f) ? {
    node: H,
    pos: 0
  } : null, L = E ?? v, I = !!E && T.depth >= 1 && T.depth - E.depth <= 1, j = !!v;
  if ((I || j) && L) {
    if (L.node.type === h)
      return C && j ? a().command(({ tr: W, dispatch: P }) => {
        const K = zu(W);
        return K ? (W.setSelection(K), P && P(W), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (pr(L.node.type.name, f) && h.validContent(L.node.content)) return a().command(() => (o.setNodeMarkup(L.pos, h), !0)).command(() => mr(o, h)).command(() => gr(o, h)).run();
  }
  return !t || !S || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => mr(o, h)).command(() => gr(o, h)).run() : a().command(() => {
    const W = u().wrapInList(h, r), P = S.filter((K) => d.includes(K.type.name));
    return o.ensureMarks(P), W ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => mr(o, h)).command(() => gr(o, h)).run();
}, Du = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = Tt(n, r.schema);
  return wu(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Ou = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = He(n, r.schema), s = He(e, r.schema), l = Gr(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, {
    ...a,
    ...t
  });
}, Lu = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = He(n, t.schema);
  return Gr(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
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
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = Tt(n, r.schema), { $from: a, empty: c, ranges: u } = s;
  if (!i) return !0;
  if (c && o) {
    var f;
    let { from: d, to: h } = s;
    const p = ls(a, l, (f = a.marks().find((g) => g.type === l)) === null || f === void 0 ? void 0 : f.attrs);
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
  const l = ms(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = He(n, r.schema)), l === "mark" && (s = Tt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, f = c.$to.pos;
    let d, h, p, g;
    t.selection.empty ? r.doc.nodesBetween(u, f, (y, x) => {
      o && o === y.type && (a = !0, p = Math.max(x, u), g = Math.min(x + y.nodeSize, f), d = x, h = y);
    }) : r.doc.nodesBetween(u, f, (y, x) => {
      x < u && o && o === y.type && (a = !0, p = Math.max(x, u), g = Math.min(x + y.nodeSize, f), d = x, h = y), x >= u && x <= f && (o && o === y.type && (a = !0, i && t.setNodeMarkup(x, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((M) => {
        if (s === M.type && (a = !0, i)) {
          const T = Math.max(x, u), S = Math.min(x + y.nodeSize, f);
          t.addMark(T, S, s.create({
            ...M.attrs,
            ...e
          }));
        }
      }));
    }), h && (d !== void 0 && i && t.setNodeMarkup(d, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((y) => {
      s === y.type && i && t.addMark(p, g, s.create({
        ...y.attrs,
        ...e
      }));
    }));
  }), a;
}, Wu = new at("__tiptap_decorations__"), ju = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Wu, {
  type: "force",
  name: n
}), !0), qu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = He(n, t.schema);
  return cc(i, e)(t, r);
}, Ju = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = He(n, t.schema);
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
function zn(n) {
  return Vu(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function bs(n, e) {
  const t = { ...n };
  return zn(n) && zn(e) && Object.keys(e).forEach((r) => {
    zn(e[r]) && zn(n[r]) ? t[r] = bs(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var vs = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...Mr(gn(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...Mr(gn(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => bs(this.options, n)
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
}, Yu = class ws extends vs {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new ws(t);
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
}, et = class ks extends vs {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new ks(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
et.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new gt({
      key: new at("clipboardTextSerializer"),
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
et.create({
  name: "commands",
  addCommands() {
    return { ...Ku };
  }
});
et.create({
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
        if (u instanceof st) {
          var d, h;
          const p = c.slice(f).map(u.from, -1), g = c.slice(f).map(u.to), y = c.invert().map(p, -1), x = c.invert().map(g), M = p > 0 ? (d = a.doc.nodeAt(p - 1)) === null || d === void 0 ? void 0 : d.marks.some((S) => S.eq(u.mark)) : !1, T = (h = a.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((S) => S.eq(u.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: u.mark,
            from: u.from,
            to: u.to,
            deletedRange: {
              from: y,
              to: x
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
et.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new gt({
      key: new at("tiptapDrop"),
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
et.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new gt({
      key: new at("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Uu = new at("focusEvents");
et.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new gt({
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
et.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: f } = a, { pos: d, parent: h } = f, p = f.parent.isTextblock && d > 0 ? l.doc.resolve(d - 1) : f, g = p.parent.type.spec.isolating, y = f.pos - f.parentOffset, x = g && p.parent.childCount === 1 ? y === f.pos : Kt.atStart(c).from === d;
        return !u || !h.type.isTextblock || h.textContent.length || !x || x && f.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return Kn() || ps() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new gt({
      key: new at("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, a = Kt.atStart(e.doc).from, c = Kt.atEnd(e.doc).to;
        if (o || !(s === a && l === c) || !ys(t.doc)) return;
        const u = t.tr, f = rs({
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
et.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new gt({
      key: new at("tiptapPaste"),
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
et.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new gt({
      key: new at("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
et.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = gs(this.extensions);
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
    return [new gt({
      key: new at("textDirection"),
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
function Rr(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(Rr(a));
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
  for (const l of Array.from(e.childNodes)) i.appendChild(Rr(l));
  return i;
}
function Ss(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function ed(n) {
  const e = Ss(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(Rr(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Sf(n) {
  const e = Ss(n);
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
function Li(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const nd = { text: "#52525b" }, rd = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var d;
  const s = n.attrs.field ?? "", l = t.options, a = ((d = l.resolve) == null ? void 0 : d.call(l, s)) ?? null, c = (a == null ? void 0 : a.color) ?? nd, u = (a == null ? void 0 : a.label) ?? `{{${s}}}`, f = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ m(
    Js,
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
        var x;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof o == "function" ? o() : null;
        if (p == null) return;
        const g = i.state.doc.resolve(p), y = g.nodeAfter;
        y && Xt.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new Xt(g))), (x = l.onTokenClick) == null || x.call(l, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: f ? /* @__PURE__ */ m("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, id = ol.extend({
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
    return qs(rd);
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
    return ["span", js({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), od = 240, sd = 280, ld = ({ props: n, onApi: e }) => {
  const t = Gn(), r = N(e);
  r.current = e, te(() => {
    r.current(t);
  }, [t]);
  const i = N(null);
  te(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), te(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = Xn();
  return /* @__PURE__ */ m(vn.Provider, { value: t, children: /* @__PURE__ */ m(
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
  const { myIndex: r, highlighted: i, setPointer: o } = so({
    label: () => n.label,
    activate: t
  }), s = Ee(), l = { padding: `${O(8, 12, s)}px ${O(12, 16, s)}px`, fontSize: O(12, 14, s) };
  return /* @__PURE__ */ A(
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
}, Pi = () => {
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
      const o = sl(i);
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
}), Ln = new at("retainedSelectionHighlight"), ud = et.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new gt({
        key: Ln,
        state: {
          init: () => ({ held: !1, decorations: kn.empty }),
          apply(n, e) {
            const t = n.getMeta(Ln), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: kn.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? kn.empty : kn.create(n.doc, [Us.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = Ln.getState(n)) == null ? void 0 : e.decorations;
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
function Ns(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function dd(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Ns(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const fd = Ae.forwardRef(({
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
  const d = N(s);
  d.current = s;
  const h = N(l);
  h.current = l;
  const p = N(a);
  p.current = a;
  const g = N(c);
  g.current = c;
  const y = N(u);
  y.current = u;
  const x = N(null), M = N(null), T = N(e);
  T.current = e;
  const S = N(r);
  S.current = r;
  const E = N(o);
  E.current = o;
  const C = N(null), z = (j) => {
    var V;
    const W = j.getAttributes("textStyle"), P = j.getAttributes("reportTextStyle"), { from: K, to: k, empty: _ } = j.state.selection;
    let q = !1, le = !1, ie = !1;
    if (!_) {
      const Y = /* @__PURE__ */ new Set(), R = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
      j.state.doc.nodesBetween(K, k, (Me) => {
        if (!Me.isText) return;
        const ae = Me.marks.find(($) => $.type.name === "textStyle");
        Y.add((ae == null ? void 0 : ae.attrs.fontFamily) || ""), R.add((ae == null ? void 0 : ae.attrs.fontSize) || "");
        const Le = Me.marks.find(($) => $.type.name === "reportTextStyle");
        Q.add((Le == null ? void 0 : Le.attrs.styleId) || "");
      }), q = Y.size > 1, le = R.size > 1, ie = Q.size > 1;
    }
    const ne = {
      bold: j.isActive("bold"),
      italic: j.isActive("italic"),
      underline: j.isActive("underline"),
      strike: j.isActive("strike"),
      link: j.isActive("link"),
      color: W.color || "",
      fontFamily: W.fontFamily || "",
      fontSize: W.fontSize || "",
      textStyle: P.styleId || "",
      hasSelection: !_,
      fontFamilyMixed: q,
      fontSizeMixed: le,
      textStyleMixed: ie
    }, F = C.current;
    F && F.bold === ne.bold && F.italic === ne.italic && F.underline === ne.underline && F.strike === ne.strike && F.link === ne.link && F.color === ne.color && F.fontFamily === ne.fontFamily && F.fontSize === ne.fontSize && F.textStyle === ne.textStyle && F.hasSelection === ne.hasSelection && F.fontFamilyMixed === ne.fontFamilyMixed && F.fontSizeMixed === ne.fontSizeMixed && F.textStyleMixed === ne.textStyleMixed || (C.current = ne, (V = E.current) == null || V.call(E, ne));
  }, H = (j) => {
    var _;
    const W = j.state.selection;
    let P = null;
    W instanceof Xt && W.node.type.name === "token" ? (P = { key: W.node.attrs.field ?? "", pos: W.from }, x.current = W.from) : x.current != null && (x.current = j.state.tr.mapping.map(x.current));
    const K = M.current, k = K && P && K.key === P.key && K.pos === P.pos;
    !K && !P || k || (M.current = P, (_ = y.current) == null || _.call(y, P));
  }, v = (j) => {
    const W = ed(td(j));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(W) ? "" : W;
  }, L = Ae.useMemo(() => {
    const j = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: K }) => {
        var k;
        return ((k = h.current) == null ? void 0 : k.call(h, K)) ?? [];
      },
      command: ({ editor: K, range: k, props: _ }) => {
        K.chain().focus().insertContentAt(k, { type: "token", attrs: { field: _.field } }).run();
      },
      render: Pi
    }, W = id.configure({
      resolve: d.current ?? null,
      suggestion: j,
      onTokenClick: (K, k, _) => {
        var q;
        x.current = _, (q = g.current) == null || q.call(g, K, k, _);
      }
    }), P = et.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          il({
            pluginKey: new at("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: K, range: k }) => Ns(K, k.from) != null,
            items: ({ editor: K, query: k }) => {
              var q;
              const _ = dd(K);
              return _ ? ((q = p.current) == null ? void 0 : q.call(p, _.chipKey, k)) ?? [] : [];
            },
            command: ({ editor: K, range: k, props: _ }) => {
              K.chain().focus().insertContentAt(k, { type: "token", attrs: { field: _.field } }).run();
            },
            render: Pi
          })
        ];
      }
    });
    return [W, P];
  }, []), I = Ks({
    immediatelyRender: !1,
    extensions: [
      Xs,
      Gs.configure({ placeholder: t }),
      Qs,
      Zs,
      el,
      cd,
      ud,
      tl,
      rl,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      nl.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...L
    ],
    content: Li(n || ""),
    editable: !r,
    onUpdate: ({ editor: j }) => {
      T.current(v(j.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: j }) => {
      z(j), H(j);
    }
  });
  return te(() => {
    if (!I || I.isFocused) return;
    v(I.getHTML()) !== n && (C.current = null, I.commands.setContent(Li(n || ""), { emitUpdate: !1 }), z(I));
  }, [n, I]), te(() => {
    I && I.setEditable(!r);
  }, [r, I]), te(() => {
    I && (C.current = null, z(I), H(I));
  }, [I]), Rs(f, () => ({
    exec: (j, W, P) => {
      if (!I || S.current) return;
      const K = I.chain(), k = (P == null ? void 0 : P.focus) === !1 ? K : K.focus();
      switch (j) {
        case "bold":
          k.toggleBold().run();
          break;
        case "italic":
          k.toggleItalic().run();
          break;
        case "underline":
          k.toggleUnderline().run();
          break;
        case "strikeThrough":
          k.toggleStrike().run();
          break;
        case "foreColor":
          W && k.setColor(W).run();
          break;
        case "unsetColor":
          k.unsetColor().run();
          break;
        case "fontFamily":
          W && k.setFontFamily(W).run();
          break;
        case "unsetFontFamily":
          k.unsetFontFamily().run();
          break;
        case "fontSize":
          W && k.setFontSize(W).run();
          break;
        case "unsetFontSize":
          k.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          W && k.setMark("reportTextStyle", { styleId: W }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          k.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          k.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          W && k.extendMarkRange("link").setLink({ href: W }).run();
          break;
        case "unlink":
          k.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (j) => I == null ? void 0 : I.commands.focus(j),
    insertToken: (j) => {
      !I || S.current || I.chain().focus().insertContent({ type: "token", attrs: { field: j } }).run();
    },
    replaceToken: (j) => {
      if (!I || S.current) return;
      const W = x.current;
      W != null && I.commands.command(({ tr: P }) => {
        const K = P.doc.nodeAt(W);
        if (!K || K.type.name !== "token") return !1;
        P.setNodeMarkup(W, void 0, { field: j });
        const k = P.doc.resolve(W);
        return k.nodeAfter && k.nodeAfter.type.name === "token" && P.setSelection(new Xt(k)), !0;
      });
    },
    holdSelectionHighlight: (j) => {
      !I || I.isDestroyed || I.view.dispatch(I.state.tr.setMeta(Ln, { held: j }));
    }
  }), [I]), /* @__PURE__ */ m(Vs, { editor: I, className: `richtext-editor ${i || ""}` });
});
fd.displayName = "RichTextEditor";
const hd = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], pd = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Bi = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ m("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ m("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), md = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = Z(!1);
  return /* @__PURE__ */ m(
    Qn,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ A("button", { type: "button", disabled: e, className: `${ea} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ m("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ m("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ m(yn, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: hd.map((s) => /* @__PURE__ */ m(kl, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ m(Hi, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ m("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, gd = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = Z(!1), o = Zn(), [s, l] = Z(""), a = () => {
    var u;
    const c = s.trim();
    c && ((u = n.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ m(
    Qn,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ m(
        it,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ m(Ps, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ A("div", { className: "p-2 flex flex-col gap-2", children: [
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
        /* @__PURE__ */ A("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ m(it, { theme: "dark", onClick: a, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ m(
            it,
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
  const [c, u] = Z(!1), f = (y, x) => {
    var M;
    return (M = n.current) == null ? void 0 : M.exec(y, x);
  }, d = Zn(), h = (y) => !!(r != null && r[y]), p = "flex items-center gap-1 shrink-0", g = a ? /* @__PURE__ */ m("div", { className: ho }) : null;
  return /* @__PURE__ */ A("div", { className: `flex flex-wrap items-center ${a ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ A("div", { className: p, children: [
      /* @__PURE__ */ m(jt, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ m(it, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("bold"), style: { ...d.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ m(jt, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ m(it, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => f("italic"), style: { ...d.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ m(jt, { content: "Underline", children: /* @__PURE__ */ m(it, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("underline"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(Ds, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ m(jt, { content: "Strikethrough", children: /* @__PURE__ */ m(it, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => f("strikeThrough"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(Os, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(gd, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(
      Qn,
      {
        open: c,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ A(it, { theme: "dark", disabled: e, style: d.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ m("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ m(Bi, {}),
          /* @__PURE__ */ m(yn, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ A("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => {
                f("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ m(Bi, { className: "w-3.5 h-3.5" })
            }
          ),
          pd.map((y) => /* @__PURE__ */ m(
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
    (o || s || l) && /* @__PURE__ */ A(We, { children: [
      g,
      /* @__PURE__ */ A("div", { className: p, children: [
        o && /* @__PURE__ */ m(md, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ m(jt, { content: "Clear formatting", children: /* @__PURE__ */ m(
          it,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => f("clearFormatting"),
            style: { ...d.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ m(Ls, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ A(We, { children: [
      g,
      /* @__PURE__ */ m("div", { className: p, children: i })
    ] })
  ] });
};
function Zr(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function yd(n, e, t, r, i) {
  return Zr(n + e * i, t, r);
}
const xd = 2;
function bd(n, e, t, r, i) {
  return Zr(n + Math.trunc(e / xd) * i, t, r);
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
  const [h, p] = Z(null), [g, y] = Z(!1), x = N(!1), M = N(null), T = N(null), S = N(null), E = Ee(), C = uo(), z = c === void 0;
  te(() => () => {
    var k;
    return (k = M.current) == null ? void 0 : k.call(M);
  }, []), ot(() => {
    const k = S.current, _ = T.current;
    !z && k && _ && (_.style.color = getComputedStyle(k).color);
  }, [z, c]), te(() => {
    x.current || p(null);
  }, [n]);
  const H = n ?? r, v = h !== null ? h : n != null ? String(n) : f ? "" : String(r), L = (k) => Zr(k, e, t), I = (k) => {
    const _ = yd(H, k, e, t, o);
    _ !== H && (x.current && p(String(_)), i(_));
  }, j = (k) => {
    if (l || s || k.pointerType !== "mouse" || k.button !== 0) return;
    const _ = k.currentTarget, q = k.clientY, le = H;
    let ie = le, ne = !1;
    const F = (Y) => {
      const R = q - Y.clientY;
      if (!ne) {
        if (Math.abs(R) < vd) return;
        ne = !0, _.blur(), _.style.userSelect = "none";
      }
      const Q = bd(le, R, e, t, o);
      Q !== ie && (ie = Q, i(Q));
    }, V = () => {
      M.current = null, window.removeEventListener("pointermove", F), window.removeEventListener("pointerup", V), window.removeEventListener("pointercancel", V), _.style.userSelect = "", ne && _.blur();
    };
    M.current = V, window.addEventListener("pointermove", F), window.addEventListener("pointerup", V), window.addEventListener("pointercancel", V);
  }, W = (k) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": k === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (k === 1 ? H >= t : H <= e),
    onPointerDown: (_) => _.preventDefault(),
    onClick: () => I(k)
  }), P = z ? O(22, 30, E) : O(16, 22, E), K = z ? O(14, 18, E) : O(11, 15, E);
  return /* @__PURE__ */ A(
    "span",
    {
      ref: T,
      className: `ui-number ${z ? "ui-number-box" : ""}`,
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ m(
          "input",
          {
            ref: S,
            type: "number",
            "aria-label": a,
            title: u,
            placeholder: f,
            value: v,
            readOnly: s,
            disabled: l,
            className: c ?? "ui-input w-20",
            style: {
              ...z ? { ...C, minHeight: O(30, 38, E) } : {},
              paddingRight: P + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, y(!0);
            },
            onChange: (k) => {
              const _ = k.target.value;
              p(_);
              const q = parseInt(_, 10);
              _ !== "" && !Number.isNaN(q) && i(L(q));
            },
            onBlur: () => {
              if (x.current = !1, y(!1), h === null) return;
              const k = parseInt(h, 10);
              Number.isNaN(k) || i(L(k)), p(null);
            },
            onKeyDown: (k) => {
              k.key === "Enter" && k.target.blur(), k.key === "Escape" && (p(null), k.target.blur()), !s && !l && (k.key === "ArrowUp" || k.key === "ArrowDown") && (k.preventDefault(), I(k.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: j
          }
        ),
        /* @__PURE__ */ A("span", { className: "ui-number-steppers", style: { width: P }, children: [
          /* @__PURE__ */ m("button", { ...W(1), className: "ui-number-step", children: /* @__PURE__ */ m(Bs, { style: { width: K, height: K } }) }),
          /* @__PURE__ */ m("button", { ...W(-1), className: "ui-number-step", children: /* @__PURE__ */ m(yn, { style: { width: K, height: K } }) })
        ] })
      ]
    }
  );
}
function Mf({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: c, children: u }) {
  const f = Ee(), d = Nt({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = O(14, 16, f), p = { width: h, height: h }, g = O(10, 12, f);
  return /* @__PURE__ */ A("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ A("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 bg-[var(--ui-card-header-bg)] text-[color:var(--ui-card-header-text)] hover:bg-[var(--ui-card-header-hover)] transition-colors", style: d, children: [
      /* @__PURE__ */ A(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ m(Pn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }) : /* @__PURE__ */ m(yn, { className: "text-[color:var(--ui-card-header-muted)] shrink-0", style: p }),
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
  const [p, g] = Z(u), y = N(p);
  y.current = p;
  const x = N(null), M = N(null), T = N(null), S = re((v) => {
    y.current !== v && (y.current = v, g(v), f == null || f(v));
  }, [f]), E = re((v = !1) => {
    var L;
    S(!1), (L = M.current) == null || L.blur(), v && requestAnimationFrame(() => {
      var I;
      return (I = T.current) == null ? void 0 : I.focus();
    });
  }, [S]), C = re(() => {
    S(!0), requestAnimationFrame(() => {
      const v = M.current;
      if (!v) return;
      v.focus();
      const L = v.value.length;
      v.setSelectionRange(L, L);
    });
  }, [S]);
  te(() => {
    u && C();
  }, [u, C]), te(() => {
    var I;
    if (!p) return;
    const v = ((I = x.current) == null ? void 0 : I.ownerDocument) ?? document, L = (j) => {
      var P;
      const W = j.target;
      W && ((P = x.current) != null && P.contains(W) || E());
    };
    return v.addEventListener("pointerdown", L, !0), () => v.removeEventListener("pointerdown", L, !0);
  }, [p, E]);
  const z = re((v) => {
    var I;
    if (!p) return;
    const L = v.relatedTarget;
    L && ((I = x.current) != null && I.contains(L)) || E();
  }, [p, E]), H = re((v) => {
    v.key === "Escape" && (v.preventDefault(), v.stopPropagation(), e(""), E(!0));
  }, [e, E]);
  return /* @__PURE__ */ A(
    "div",
    {
      ref: x,
      "data-morph-search": !0,
      "data-expanded": p ? "true" : "false",
      className: `relative inline-flex shrink-0 ${d}`,
      style: {
        width: p ? s : o,
        transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)"
      },
      onBlur: z,
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
              it,
              {
                ref: T,
                type: "button",
                variant: l,
                size: "minimal",
                theme: a,
                icon: r ?? /* @__PURE__ */ m(Rt, { className: "w-3.5 h-3.5" }),
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
        /* @__PURE__ */ A(
          "div",
          {
            className: `absolute inset-0 origin-left ${p ? "opacity-100" : "opacity-0 pointer-events-none"} motion-reduce:transition-none`,
            style: {
              transform: p ? "scaleX(1)" : "scaleX(0.96)",
              transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
            },
            "aria-hidden": !p,
            children: [
              /* @__PURE__ */ m("span", { className: "ui-icon absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none", children: r ?? /* @__PURE__ */ m(Rt, { className: "w-3.5 h-3.5" }) }),
              /* @__PURE__ */ m(
                "input",
                {
                  ref: M,
                  value: n,
                  onChange: (v) => e(v.target.value),
                  onKeyDown: H,
                  placeholder: i,
                  "aria-label": h || i,
                  tabIndex: p ? 0 : -1,
                  "data-morph-search-input": !0,
                  className: `${wr("sm")} w-full pl-7 pr-7`
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
                      var v;
                      return (v = M.current) == null ? void 0 : v.focus();
                    });
                  },
                  className: "absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-700",
                  "data-morph-search-clear": !0,
                  children: /* @__PURE__ */ m($t, { className: "w-3 h-3" })
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
  autoFocus: y = !0,
  collapsedWidth: x = 128,
  expandedWidth: M = 288,
  panelWidth: T,
  maxMenuHeight: S = 420,
  theme: E = "light",
  morph: C = !0,
  emptyTitle: z,
  emptyHint: H,
  renderEmpty: v,
  emptyActions: L
}) {
  const I = s !== void 0, [j, W] = Z(""), P = I ? s : j, K = re((b) => {
    I || W(b), l == null || l(b);
  }, [I, l]), [k, _] = Z(!1), [q, le] = Z(t === "inline"), ie = wt(() => e.map((b) => b.key).join("\0"), [e]), ne = wt(() => new Set(ie ? ie.split("\0") : []), [ie]), [F, V] = Z(() => p ? ne : /* @__PURE__ */ new Set()), [Y, R] = Z(0), Q = N(null), Me = N(null), ae = N(null), Le = N(null), $ = Ir(), oe = tn(), ke = Xn(), ce = Br(), [je, de] = Z({ top: 0, left: 0, maxH: 288, ready: !1 }), [Te, Se] = Z(0);
  Zi({
    anchorRef: Q,
    panelRef: Le,
    open: k,
    maxHeight: S,
    onPosition: (b) => de({ top: b.top, left: b.left, maxH: b.maxH, ready: b.ready })
  }), te(() => {
    !k || !Q.current || Se(Q.current.getBoundingClientRect().width);
  }, [k, q]);
  const Be = Un({
    visible: k,
    morph: C,
    anchor: () => {
      var b;
      return ((b = Q.current) == null ? void 0 : b.getBoundingClientRect()) ?? null;
    },
    ref: Le,
    cloneOnUnmount: !0
  }), xe = (L || []).map(
    (b) => typeof b.label == "function" ? b.label(P) : b.label
  ), me = wt(
    () => Nd({
      items: n,
      groups: e,
      query: P,
      browseGroups: d || p,
      expandedGroups: F,
      emptyActionLabels: xe
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [n, e, P, d, p, F, xe.join("\0")]
  ), tt = wt(
    () => me.map((b, J) => ({ row: b, index: J })).filter((b) => !(b.row.kind === "empty" || b.row.kind === "item" && b.row.hidden || b.row.kind === "group" && !c && !h)),
    [me, c, h]
  ), Ct = (h || p) && !P.trim(), qe = re(() => {
    var b;
    _(!1), t === "expandable" && ((b = Me.current) == null || b.blur(), le(!1), requestAnimationFrame(() => {
      var J;
      return (J = ae.current) == null ? void 0 : J.focus();
    })), K(""), R(0), V(p ? ne : /* @__PURE__ */ new Set()), u == null || u();
  }, [t, u, K, p, ne]);
  te(() => {
    if (P.trim() || !p) {
      V((b) => b.size ? /* @__PURE__ */ new Set() : b);
      return;
    }
    V((b) => b.size === ne.size && [...ne].every((J) => b.has(J)) ? b : ne);
  }, [P, p, ne]);
  const nt = re((b) => {
    V((J) => {
      const se = new Set(J);
      return se.has(b) ? se.delete(b) : (g === "single" && se.clear(), se.add(b)), se;
    });
  }, [g]), Je = re(() => {
    le(!0), _(!0), R(0);
  }, []);
  te(() => {
    if (t !== "expandable" || !q || !k || !y) return;
    const b = requestAnimationFrame(() => {
      var J;
      return (J = Me.current) == null ? void 0 : J.focus();
    });
    return () => cancelAnimationFrame(b);
  }, [t, q, k, y]), te(() => {
    var se;
    if (!k) return;
    const b = ((se = Q.current) == null ? void 0 : se.ownerDocument) ?? $;
    if (!b) return;
    const J = (ye) => {
      var Ue, xt;
      const Ve = ye.target;
      Ve && ((Ue = Q.current) != null && Ue.contains(Ve) || (xt = Le.current) != null && xt.contains(Ve) || qe());
    };
    return b.addEventListener("pointerdown", J, !0), () => b.removeEventListener("pointerdown", J, !0);
  }, [k, qe, $]);
  const Ge = re((b) => {
    if (b.kind === "group") {
      c ? (c(b.group), f && qe()) : h && nt(b.group.key);
      return;
    }
    if (b.kind === "item") {
      a(b.hit.item), f && qe();
      return;
    }
    if (b.kind === "action") {
      const J = L == null ? void 0 : L[b.actionIndex];
      J && J.onClick(P), f && qe();
    }
  }, [qe, f, L, h, a, c, P, nt]), Ke = (b) => {
    if (tt.length === 0) return;
    const J = tt.findIndex((ye) => ye.index === Y), se = J < 0 ? 0 : (J + b + tt.length) % tt.length;
    R(tt[se].index);
  }, ft = (b) => {
    if (b.key === "ArrowDown")
      b.preventDefault(), k ? Ke(1) : Je();
    else if (b.key === "ArrowUp")
      b.preventDefault(), Ke(-1);
    else if ((b.key === "ArrowRight" || b.key === "ArrowLeft") && h && k && !P.trim()) {
      const J = me[Y];
      if ((J == null ? void 0 : J.kind) === "group") {
        const se = F.has(J.group.key);
        (b.key === "ArrowRight" || se) && (b.preventDefault(), nt(J.group.key));
      } else if ((J == null ? void 0 : J.kind) === "item" && b.key === "ArrowLeft" && J.hit.item.group) {
        b.preventDefault();
        const se = J.hit.item.group;
        F.has(se) && nt(se);
        const ye = me.findIndex((Ve) => Ve.kind === "group" && Ve.group.key === se);
        ye >= 0 && R(ye);
      }
    } else if (b.key === "Enter") {
      b.preventDefault();
      const J = me[Y] ?? me[0];
      J && Ge(J);
    } else b.key === "Escape" && (b.preventDefault(), qe());
  }, Et = (b) => {
    t === "expandable" && !q || (K(b), k || _(!0));
  };
  te(() => {
    const b = me.findIndex((J) => J.kind === "item");
    R(b >= 0 ? b : 0);
  }, [P]);
  const ct = /* @__PURE__ */ A("div", { className: "relative w-full", children: [
    /* @__PURE__ */ m(Rt, { className: "w-3.5 h-3.5 ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ m(
      "input",
      {
        ref: Me,
        value: P,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": k,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (b) => Et(b.target.value),
        onFocus: () => {
          d && Je();
        },
        onClick: () => {
          d && Je();
        },
        onKeyDown: ft,
        placeholder: o,
        className: `${wr("sm")} w-full pl-8 pr-7`
      }
    ),
    P && /* @__PURE__ */ m(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        className: "ui-icon-btn absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5",
        onPointerDown: (b) => b.preventDefault(),
        onClick: () => {
          K(""), k || Je();
        },
        children: /* @__PURE__ */ m($t, { className: "w-3.5 h-3.5" })
      }
    )
  ] }), Ft = /* @__PURE__ */ A("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ m(Rt, { className: "w-3.5 h-3.5 ui-icon absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
    /* @__PURE__ */ m(
      "input",
      {
        ref: Me,
        value: P,
        "data-search-input": !0,
        role: "combobox",
        "aria-expanded": k,
        "aria-controls": "search-menu-panel",
        "aria-autocomplete": "list",
        onChange: (b) => Et(b.target.value),
        onFocus: () => {
          d && q && Je();
        },
        onClick: () => {
          d && q && Je();
        },
        onKeyDown: ft,
        placeholder: o,
        tabIndex: q ? 0 : -1,
        className: `${wr("sm")} h-full w-full pl-8 pr-7`
      }
    ),
    P && /* @__PURE__ */ m(
      "button",
      {
        type: "button",
        "aria-label": "Clear search",
        className: "ui-icon-btn absolute right-1 top-1/2 -translate-y-1/2 rounded p-0.5",
        onPointerDown: (b) => b.preventDefault(),
        onClick: () => {
          K(""), !k && q && Je();
        },
        children: /* @__PURE__ */ m($t, { className: "w-3.5 h-3.5" })
      }
    )
  ] }), ht = (b, J) => {
    const se = Y === J;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-item": b.hit.item.id,
        onMouseEnter: () => R(J),
        onClick: () => Ge(b),
        style: ce,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ke.itemDefault} ${se ? "ui-item-highlighted" : ""} ${b.hit.item.disabled ? "opacity-30 pointer-events-none" : ""}`,
        children: [
          b.hit.item.icon && /* @__PURE__ */ m("span", { className: `${ke.icon} shrink-0`, children: b.hit.item.icon }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: b.hit.item.label }),
          (b.hit.detail || b.hit.item.detail) && /* @__PURE__ */ m("span", { className: "shrink-0 max-w-[55%] truncate text-[10px] text-zinc-400", children: b.hit.detail || b.hit.item.detail })
        ]
      },
      `item:${b.hit.item.id}`
    );
  }, B = (b, J) => {
    const se = F.has(b.group.key), ye = h && !P.trim(), Ve = !!c || h, Ue = Y === J, xt = /* @__PURE__ */ A(We, { children: [
      b.group.icon && /* @__PURE__ */ m("span", { className: `${ke.icon} shrink-0`, children: b.group.icon }),
      /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: b.group.label }),
      b.group.count !== void 0 && /* @__PURE__ */ m("span", { className: "shrink-0 text-[10px] tabular-nums text-zinc-400", children: b.group.count })
    ] });
    return /* @__PURE__ */ A(
      "div",
      {
        role: "option",
        "aria-selected": !1,
        "aria-expanded": ye ? se : void 0,
        "data-search-group": b.group.key,
        onMouseEnter: () => R(J),
        style: ce,
        className: `w-full rounded flex items-center gap-1 outline-none select-none font-medium ${ke.itemDefault} ${Ue ? "ui-item-highlighted" : ""}`,
        children: [
          Ve ? /* @__PURE__ */ m(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onClick: () => Ge(b),
              className: "flex min-w-0 flex-1 items-center gap-2 text-left",
              children: xt
            }
          ) : /* @__PURE__ */ m("span", { className: "flex min-w-0 flex-1 items-center gap-2", children: xt }),
          ye && /* @__PURE__ */ m(
            "button",
            {
              type: "button",
              tabIndex: -1,
              "aria-label": `${se ? "Collapse" : "Expand"} ${b.group.label}`,
              "aria-expanded": se,
              onClick: (rn) => {
                rn.stopPropagation(), nt(b.group.key);
              },
              className: "shrink-0 rounded p-0.5 text-zinc-400 hover:text-zinc-700",
              children: /* @__PURE__ */ m(yn, { className: `w-3.5 h-3.5 transition-transform duration-200 ${se ? "rotate-180" : ""}` })
            }
          )
        ]
      },
      `group:${b.group.key}`
    );
  }, G = (b, J) => {
    var ye;
    const se = Y === J;
    return /* @__PURE__ */ A(
      "button",
      {
        type: "button",
        role: "option",
        "aria-selected": !1,
        tabIndex: -1,
        "data-search-action": !0,
        onMouseEnter: () => R(J),
        onClick: () => Ge(b),
        style: ce,
        className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${ke.itemDefault} ${se ? "ui-item-highlighted" : ""}`,
        children: [
          /* @__PURE__ */ m("span", { className: `${ke.icon} shrink-0`, children: ((ye = L == null ? void 0 : L[b.actionIndex]) == null ? void 0 : ye.icon) || /* @__PURE__ */ m(ji, { className: "w-3.5 h-3.5" }) }),
          /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: b.label })
        ]
      },
      `action:${b.actionIndex}`
    );
  }, pe = () => /* @__PURE__ */ m("div", { className: "px-3 py-3 text-center", "data-search-empty": !0, children: v ? v({ query: P, close: qe }) : /* @__PURE__ */ A(We, { children: [
    /* @__PURE__ */ m("div", { className: "mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-400", children: /* @__PURE__ */ m(Rt, { className: "w-3.5 h-3.5" }) }),
    /* @__PURE__ */ m("div", { className: "text-xs font-medium text-zinc-500", children: z || `No matches for “${P.trim()}”` }),
    /* @__PURE__ */ m("div", { className: "mt-0.5 text-[10px] text-zinc-400", children: H || "Try a name, phone number, board ID or category." })
  ] }) }, "__empty"), De = [];
  for (let b = 0; b < me.length; b++) {
    const J = me[b];
    if (J.kind === "group") {
      const se = [];
      let ye = b + 1;
      for (; ye < me.length && me[ye].kind === "item" && me[ye].hit.item.group === J.group.key; )
        se.push({ row: me[ye], index: ye }), ye++;
      De.push({ group: J, index: b, items: se }), b = ye - 1;
    } else J.kind === "item" ? De.push({ row: J, index: b }) : De.push({ row: J, index: b });
  }
  const ut = k ? Vn(
    /* @__PURE__ */ m(
      "div",
      {
        ref: Be,
        id: "search-menu-panel",
        "data-theme": E,
        role: "listbox",
        "aria-label": o,
        className: "ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none min-w-0 overflow-hidden",
        style: {
          position: "fixed",
          left: je.left,
          top: je.top,
          width: T ?? (t === "expandable" ? M : Te || void 0),
          maxHeight: je.maxH,
          visibility: je.ready ? "visible" : "hidden"
        },
        children: /* @__PURE__ */ A("div", { className: "overflow-y-auto scrollbar-custom flex flex-col", children: [
          me.length === 0 && /* @__PURE__ */ m("div", { className: "px-3 py-3 text-xs text-zinc-400", "data-search-empty": !0, children: v ? v({ query: P, close: qe }) : /* @__PURE__ */ m(We, { children: "Type to search…" }) }),
          De.map((b) => {
            if (b.group) {
              const ye = F.has(b.group.group.key), Ve = b.items || [];
              return /* @__PURE__ */ A(Ae.Fragment, { children: [
                B(b.group, b.index),
                Ct && /* @__PURE__ */ m(
                  "div",
                  {
                    "data-search-group-items": b.group.group.key,
                    "aria-hidden": !ye,
                    className: "motion-reduce:transition-none",
                    style: {
                      display: "grid",
                      gridTemplateRows: ye ? "1fr" : "0fr",
                      opacity: ye ? 1 : 0,
                      transition: "grid-template-rows 220ms cubic-bezier(0.32, 0.72, 0, 1), opacity 150ms ease"
                    },
                    children: /* @__PURE__ */ m("div", { className: "overflow-hidden flex flex-col", children: Ve.map((Ue) => ht(Ue.row, Ue.index)) })
                  }
                ),
                !Ct && Ve.map((Ue) => ht(Ue.row, Ue.index))
              ] }, `group:${b.group.group.key}`);
            }
            const J = b.row, se = b.index;
            return J.kind === "empty" ? pe() : J.kind === "action" ? G(J, se) : J.kind === "item" ? ht(J, se) : null;
          })
        ] })
      }
    ),
    oe ?? ($ == null ? void 0 : $.body) ?? document.body
  ) : null;
  return /* @__PURE__ */ A(
    "div",
    {
      ref: Q,
      "data-search-menu": !0,
      "data-mode": t,
      className: "relative inline-flex",
      style: t === "inline" ? { width: "100%" } : { width: q ? M : x, transition: "width 220ms cubic-bezier(0.32, 0.72, 0, 1)" },
      children: [
        t === "inline" ? ct : /* @__PURE__ */ A(We, { children: [
          /* @__PURE__ */ m(
            "div",
            {
              className: `w-full origin-left ${q ? "opacity-0 pointer-events-none" : "opacity-100"}`,
              style: {
                transform: q ? "scaleX(0.98)" : "scaleX(1)",
                transition: "opacity 150ms ease, transform 220ms cubic-bezier(0.32, 0.72, 0, 1)"
              },
              children: /* @__PURE__ */ m(
                it,
                {
                  ref: ae,
                  type: "button",
                  variant: "primary",
                  size: "minimal",
                  theme: E === "dark" ? "dark" : "light",
                  icon: i ?? /* @__PURE__ */ m(Rt, { className: "w-3.5 h-3.5" }),
                  onClick: Je,
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
              children: Ft
            }
          )
        ] }),
        ut
      ]
    }
  );
}
export {
  it as Button,
  Mf as CardSection,
  co as CheckMark,
  Rl as Checkbox,
  uf as Checklist,
  wf as ChromeHeader,
  vf as ContentRow,
  Xd as ContextMenu,
  Qd as ContextMenuDivider,
  Gd as ContextMenuItem,
  Zd as ContextMenuSub,
  Qi as DROPDOWN_MAX_HEIGHT,
  cf as DatePicker,
  nf as DialogProvider,
  kl as DropdownItem,
  Qn as DropdownMenu,
  Sl as DropdownSubmenu,
  Pr as DropdownThemeContext,
  hd as FONTS,
  ff as FloatingChrome,
  af as FloatingToggle,
  md as FontMenu,
  Cf as FormatToolbar,
  $e as IS_COARSE,
  al as IS_TOUCH_CAPABLE,
  Ud as ItemManagerDropdown,
  of as LongPressMenuProvider,
  zr as MORPH_EASE,
  Gt as MORPH_MS,
  $r as MORPH_OPACITY_MS,
  vn as MenuHighlightContext,
  oo as MenuSearchContext,
  Tl as Modal,
  ef as ModalFooter,
  Nn as ModalFooterButton,
  Rf as MorphSearchField,
  Ef as NumberInput,
  ll as PopoutWindowContext,
  Tf as RICH_TEXT_STATE_IDLE,
  df as RadioList,
  fd as RichTextEditor,
  xd as SCRUB_PX_PER_STEP,
  Af as SearchMenu,
  bf as SectionHeader,
  xf as Seg,
  kf as StructureControls,
  Fr as SubmenuContext,
  lf as TAB_PILL,
  Xl as TB_BTN,
  Tn as TB_BTN_ICON,
  Gl as TB_DANGER,
  ho as TB_DIVIDER,
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
  Cn as ToolButton,
  jt as Tooltip,
  Dr as ZOOM_FROM,
  Nd as buildSearchMenuRows,
  gl as buttonCloudOf,
  Zr as clampNumber,
  fl as cloneOverlayClose,
  O as coarsePx,
  Nf as escapeHtml,
  Vi as getCoarseScale,
  Xn as getDropdownClasses,
  Jd as getHardwareKeyboard,
  qd as getLastPointerType,
  wr as inputCls,
  Ol as isInteractiveElement,
  xr as isTouchLike,
  kd as matchSearchItem,
  no as menuAttributesOf,
  pl as menuThemeOf,
  Xi as nearestOverlayOrigin,
  Ss as normalizeSpaces,
  or as overlayMorphEnabled,
  wd as parseSearchTags,
  dl as playOverlayClose,
  ul as playOverlayOpen,
  Li as preprocessTokenHtml,
  ed as sanitizeRichText,
  bd as scrubbedValue,
  Sd as searchMenuContent,
  ml as segModeOf,
  Wd as setCoarseScale,
  yd as steppedValue,
  Sf as stripRichText,
  td as stripTokenWrappers,
  jd as useCoarse,
  Ee as useCoarseScale,
  Nt as useCoarseSize,
  Ir as useCurrentDocument,
  xn as useCurrentWindow,
  tf as useDialog,
  Zi as useDropdownPosition,
  ro as useDropdownTheme,
  Kd as useHardwareKeyboard,
  uo as useInputSize,
  Br as useItemSize,
  yt as useKitTheme,
  cl as useLastPointerType,
  rf as useLongPressOptOut,
  Hr as useMenuHighlight,
  vl as useMenuSearch,
  Un as useOverlayMorph,
  Ar as usePopoutWindow,
  tn as usePortalTarget,
  Ul as useSlidingPill,
  sf as useTouchMode
};
