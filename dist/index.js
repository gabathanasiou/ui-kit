"use client";
import { jsxs as O, jsx as g, Fragment as lt } from "react/jsx-runtime";
import He, { createContext as Dt, useContext as Pt, useState as G, useEffect as Z, useRef as S, useCallback as oe, useLayoutEffect as We, useMemo as vn, useImperativeHandle as hs } from "react";
import * as ce from "@radix-ui/react-dropdown-menu";
import { Search as ps, X as kn, Check as Ei, Pencil as ms, Copy as Ci, Trash2 as nr, RotateCcw as Ti, Plus as gs, ChevronRight as Sn, ChevronLeft as ys, ArrowUp as xs, ArrowDown as bs, ChevronDown as $n, Underline as ws, Strikethrough as vs, RemoveFormatting as ks, Link as Ss, ChevronUp as Es } from "lucide-react";
import { computePosition as Cs, offset as Mi, flip as Ni, shift as Ai, size as Ts, useFloating as Ms, autoUpdate as Ns } from "@floating-ui/react-dom";
import * as rt from "@radix-ui/react-dialog";
import { createPortal as pr } from "react-dom";
import { mergeAttributes as As, ReactNodeViewRenderer as zs, NodeViewWrapper as Rs, useEditor as Is, EditorContent as $s } from "@tiptap/react";
import { PluginKey as qe, Plugin as Ze, Selection as Tt, TextSelection as Le, AllSelection as Os, NodeSelection as zt } from "@tiptap/pm/state";
import { DecorationSet as ln, Decoration as Ds } from "@tiptap/pm/view";
import Ps from "@tiptap/starter-kit";
import Ls from "@tiptap/extension-placeholder";
import { TextStyle as Bs, FontFamily as Fs, FontSize as _s } from "@tiptap/extension-text-style";
import Hs from "@tiptap/extension-color";
import Ws from "@tiptap/extension-link";
import js from "@tiptap/extension-underline";
import Js from "@tiptap/suggestion";
import { Mention as qs } from "@tiptap/extension-mention";
import { createRoot as Ks } from "react-dom/client";
const Vs = Dt(null);
function mr() {
  return Pt(Vs);
}
function Qt() {
  const n = mr();
  return n ? n.document.body : null;
}
function zi() {
  const n = mr();
  return n ? n.document : typeof document < "u" ? document : null;
}
function Zt() {
  return mr() ?? (typeof window < "u" ? window : null);
}
const en = typeof window < "u", Se = en && window.matchMedia("(pointer: coarse)").matches, Ys = en && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let On = 0.5;
const qt = /* @__PURE__ */ new Set();
function Of(n) {
  On = Math.max(0, Math.min(1, n)), qt.forEach((e) => e());
}
function Ri() {
  return On;
}
function Df() {
  const [, n] = G(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return qt.add(e), () => {
      qt.delete(e);
    };
  }, []), Se && On > 0;
}
function ke() {
  const [, n] = G(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return qt.add(e), () => {
      qt.delete(e);
    };
  }, []), On;
}
function z(n, e, t) {
  return Se ? Math.round(n + (e - n) * t) : n;
}
function Xe(n, e) {
  const t = ke();
  return Se && t > 0 ? {
    padding: `${z(n.py, e.py, t)}px ${z(n.px, e.px, t)}px`,
    fontSize: `${z(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function rr(n) {
  return n === "touch" || n === "pen";
}
let Ct = null;
const ir = /* @__PURE__ */ new Set();
en && window.addEventListener("pointerdown", (n) => {
  Ct = n.pointerType, ir.forEach((e) => e());
}, !0);
function Pf() {
  return Ct;
}
function Us() {
  const [, n] = G(0), e = S(Ct);
  return Z(() => {
    const t = () => {
      e.current !== Ct && (e.current = Ct, n((r) => r + 1));
    };
    return ir.add(t), () => {
      ir.delete(t);
    };
  }, []), Ct;
}
const Ii = ["(any-hover: hover)", "(any-pointer: fine)"];
function $i() {
  return en ? Ii.some((n) => window.matchMedia(n).matches) : !1;
}
let En = $i();
const or = /* @__PURE__ */ new Set();
function Yr(n) {
  En !== n && (En = n, or.forEach((e) => e()));
}
var Si;
if (en) {
  const n = () => Yr($i());
  for (const s of Ii) {
    const l = window.matchMedia(s);
    (Si = l.addEventListener) == null || Si.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || Yr(!0));
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
function Lf() {
  return En;
}
function Bf() {
  const [, n] = G(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return or.add(e), () => {
      or.delete(e);
    };
  }, []), En;
}
const Rt = 220, gr = "cubic-bezier(0.32, 0.72, 0, 1)", yr = 170, xr = 0.94;
function Jn(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Oi(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Di(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Oi({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Xs(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${xr})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Di(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Rt}ms ${gr}, opacity ${yr}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Rt + 60);
    });
  });
}
function Gs(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Di(e, t);
  e.style.transition = `transform ${Rt}ms ${gr}, opacity ${yr}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${xr})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Rt + 60);
}
function Qs(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Oi({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Rt}ms ${gr}, opacity ${yr}ms ease`, r.style.transform = `scale(${xr})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Rt + 60));
    });
  });
}
function br(n) {
  const e = S(null), [t, r] = G(!1), i = S(null), o = S(0), s = oe((p) => {
    if (n.ref && (n.ref.current = p), p) {
      o.current = 0, e.current = p;
      const x = p.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const m = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === m && (e.current = null, r(!1), !(!m || !n.cloneOnUnmount || !c.current) && m.style.visibility !== "hidden" && Jn(f.current) && Qs(m, u.current, i.current));
    });
  }, []), l = oe(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const m = p.getBoundingClientRect();
    (m.width > 0 || m.height > 0) && (i.current = { left: m.left, top: m.top, width: m.width, height: m.height });
  }, []), c = S(n.visible);
  c.current = n.visible;
  const a = S(n.visible), u = S(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const d = S(n.onClosed);
  d.current = n.onClosed;
  const f = S(n.morph !== !1);
  f.current = n.morph !== !1;
  const h = S(0);
  return We(() => {
    if (!t || !c.current || !Jn(f.current)) return;
    const p = e.current;
    p && Xs(h, p, u.current);
  }, [t, n.visible]), Z(() => {
    if (!t || !c.current) return;
    let p = 0;
    const m = () => {
      p = 0, l(), p = requestAnimationFrame(m);
    };
    return p = requestAnimationFrame(m), () => {
      p && cancelAnimationFrame(p);
    };
  }, [t, l]), We(() => {
    var y;
    const p = a.current;
    if (a.current = n.visible, n.visible || !p) return;
    const m = e.current;
    if (!m || !Jn(f.current)) {
      (y = d.current) == null || y.call(d);
      return;
    }
    Gs(h, m, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), Z(() => {
    if (!t || !c.current) return;
    const p = (m) => {
      const y = e.current;
      y && y.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [t]), Z(() => {
    if (!t || !c.current) return;
    const p = (m) => {
      const y = e.current;
      y && y.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [t]), s;
}
const Pi = 384;
function Zs(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function el({
  anchorRef: n,
  panelRef: e,
  open: t,
  contentRef: r,
  gap: i = 4,
  padding: o = 8,
  maxHeight: s,
  minHeight: l = 32,
  onPosition: c
}) {
  const a = Zt(), u = S(a);
  u.current = a;
  const d = S(c);
  d.current = c, We(() => {
    if (!t) return;
    let f = 0, h = !1;
    const p = () => {
      f || (f = requestAnimationFrame(m));
    }, m = () => {
      if (f = 0, h) return;
      const D = u.current, N = n.current, C = e.current;
      if (!D || !N || !C || !C.isConnected) return;
      const R = (r == null ? void 0 : r.current) ?? C, E = Zs(D), q = s ?? Pi, I = Math.min(l, q), W = Math.max(0, C.offsetHeight - R.offsetHeight), $ = Math.max(I, Math.ceil(R.scrollHeight + W)), P = Math.min($, q);
      C.style.maxHeight = `${P}px`;
      let L = P;
      Cs(N, C, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Mi(i),
          Ni({ boundary: E, padding: o, fallbackStrategy: "bestFit" }),
          Ai({ boundary: E, padding: o, mainAxis: !1 }),
          Ts({
            boundary: E,
            padding: o,
            apply({ availableHeight: T }) {
              L = Math.max(I, Math.floor(Math.min(q, T))), C.style.maxHeight = `${L}px`;
            }
          })
        ]
      }).then(({ x: T, y: J, placement: ne }) => {
        h || d.current({
          top: Math.round(J),
          left: Math.round(T),
          maxH: L,
          side: ne.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    m();
    const y = u.current, x = (y == null ? void 0 : y.document) ?? null, w = (y == null ? void 0 : y.visualViewport) ?? null, v = () => p();
    w == null || w.addEventListener("resize", v), w == null || w.addEventListener("scroll", v), y == null || y.addEventListener("resize", v), x == null || x.addEventListener("scroll", v, { capture: !0, passive: !0 });
    let k = null;
    return typeof ResizeObserver < "u" && (k = new ResizeObserver(v), e.current && k.observe(e.current), r != null && r.current && k.observe(r.current)), () => {
      h = !0, f && cancelAnimationFrame(f), w == null || w.removeEventListener("resize", v), w == null || w.removeEventListener("scroll", v), y == null || y.removeEventListener("resize", v), x == null || x.removeEventListener("scroll", v, { capture: !0 }), k == null || k.disconnect();
    };
  }, [t, n, e, r, i, o, s, l]);
}
let vt = null;
function Li(n) {
  return vt == null || vt(), vt = n, () => {
    vt === n && (vt = null);
  };
}
const wr = Dt("dark"), Bi = () => Pt(wr);
function Fi() {
  const n = ke();
  return {
    padding: `${z(8, 12, n)}px ${z(12, 16, n)}px`,
    fontSize: `${z(12, 14, n)}px`,
    lineHeight: `${z(18, 22, n)}px`
  };
}
const tl = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ur = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", nl = (n) => n ? "text-xs" : "text-[10px]";
function vr(n) {
  const e = Se && Ri() > 0;
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
    headerPad: Ur(e),
    headerText: `${Ur(e)} font-semibold uppercase tracking-wider ${nl(e)} ui-label`,
    // Item padding
    itemPad: tl(e),
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
function _i(n) {
  const e = [];
  return He.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (He.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const kr = Dt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), tn = Dt(null), Sr = () => Pt(tn), Hi = Dt({ query: "", setQuery: () => {
} }), rl = () => Pt(Hi), il = () => !0;
function Dn(n) {
  const e = S([]), [t, r] = G(-1), [i, o] = G(!1), [s, l] = G(0), c = oe((f) => (e.current = [...e.current, f], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), l((h) => h + 1);
  }), []), a = oe((f, h) => {
    r(f), o(h === "pointer");
  }, []), u = oe(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return vn(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: n ? e.current.filter(n) : e.current,
    highlightedIndex: t,
    pointerDriven: i,
    register: c,
    setHighlighted: a,
    pointerLeave: u
  }), [t, i, s, c, a, u, n]);
}
function Wi(n) {
  const e = Sr(), t = S(e);
  t.current = e;
  const r = S(null);
  Z(() => {
    var c;
    const l = { label: n.label(), activate: n.activate };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function Er(n, e, t, r) {
  const i = S(-1);
  i.current = e.highlightedIndex;
  const o = S(e);
  o.current = e;
  const s = S(n);
  s.current = n;
  const l = S(r);
  l.current = r;
  const c = S({ text: "", time: 0 }), a = S(!1);
  a.current || (a.current = !0, t.current = (u) => {
    var p, m, y, x, w;
    if (!s.current) return;
    const d = u.target;
    if (!!d && !!d.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const v = (m = (p = l.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : m.call(p, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), v && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = u.key === "ArrowDown" ? 1 : -1, k = (i.current + v + h.length) % h.length;
        o.current.setHighlighted(k, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < h.length && h[v].submenu && h[v].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (w = (x = l.current) == null ? void 0 : x.onCloseSub) == null || w.call(x);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = i.current;
        v >= 0 && v < h.length && h[v].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const v = Date.now(), k = (v - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: k, time: v }, !k) return;
        const D = i.current + 1;
        for (let N = 0; N < h.length; N++) {
          const C = (D + N) % h.length;
          if (h[C].label.toLowerCase().startsWith(k)) {
            o.current.setHighlighted(C, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Cr(n, e, t, r, i, o, s) {
  const l = S(e);
  l.current = e;
  const c = S(n);
  c.current = n;
  const a = S(i);
  a.current = i;
  const u = S(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = S(!1);
  d.current || (d.current = !0, o.current = (f) => {
    if (!c.current || a.current) return;
    const h = r.current;
    if (h && h.contains(f.target)) return;
    if (u.current) {
      const m = f.target;
      if (m && m.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(f.key === "ArrowDown" || f.key === "ArrowUp" || f.key === "ArrowLeft" || f.key === "ArrowRight" || f.key === "Enter" || f.key === " " || f.key.length === 1 && !f.ctrlKey && !f.metaKey && !f.altKey) || (f.preventDefault(), f.stopImmediatePropagation(), t.current(f));
  });
}
function Tr(n, e) {
  const t = S(n);
  t.current = n;
  const r = S(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Pn({
  open: n,
  onClose: e,
  onOpenChange: t,
  trigger: r,
  align: i = "left",
  width: o,
  theme: s = "dark",
  children: l,
  morph: c = !0,
  contentClassName: a,
  maxMenuHeight: u,
  initialHighlightIndex: d,
  searchable: f = !1,
  searchPlaceholder: h,
  searchFilter: p,
  searchValue: m,
  onSearchValueChange: y
}) {
  const [x, w] = G([]), [v, k] = G(null), D = Qt(), N = zi(), C = S(null), R = S(null), E = S(n);
  E.current = n;
  const [q, I] = G(n), [W, $] = G(""), P = f && m !== void 0, L = P ? m : W, T = P ? y ?? (() => {
  }) : $, [J, ne] = G(!1), xe = P && !J ? "" : L, re = S(null), te = ke(), B = {
    padding: `${z(8, 12, te)}px ${z(12, 16, te)}px`,
    fontSize: `${z(12, 14, te)}px`
  }, [U, Y] = G(0), M = f && !P;
  Z(() => {
    var De;
    if (!M || !n) return;
    const F = (De = R.current) == null ? void 0 : De.querySelector("[data-menu-items]");
    if (!F) return;
    const X = () => Y(F.offsetWidth - F.clientWidth);
    X();
    const ue = new ResizeObserver(X);
    return ue.observe(F), () => ue.disconnect();
  }, [n, M, L]);
  const Q = vn(() => {
    if (!f) return;
    const F = xe.trim().toLowerCase();
    return F ? (X) => p ? p(F, X.label) : X.label.toLowerCase().includes(F) : il;
  }, [xe, f, p]), K = Dn(Q);
  Z(() => {
    if (n)
      return I(!0), P || $(""), ne(!1), K.setHighlighted(d ?? -1, "keyboard"), Li(() => {
        t == null || t(!1), e == null || e();
      });
    w([]), ne(!1);
  }, [n, d, t, e]), Z(() => {
    if (!n || !N) return;
    const F = (X) => {
      if (X.pointerType !== "touch") return;
      const ue = X.target;
      ue && (R.current && R.current.contains(ue) || C.current && C.current.contains(ue) || ue instanceof Element && ue.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return N.addEventListener("pointerdown", F, { capture: !0 }), () => N.removeEventListener("pointerdown", F, { capture: !0 });
  }, [n, N, t, e]);
  const pe = oe(() => {
    const F = C.current;
    if (!F) return null;
    const X = F.getBoundingClientRect();
    return { left: X.left, top: X.top, width: X.width, height: X.height };
  }, []), _ = br({
    visible: n,
    morph: c,
    anchor: pe,
    onClosed: () => I(!1)
  }), ee = S(() => {
  }), ae = S(() => {
  }), me = S(() => {
  }), et = oe((F) => {
    if (F.key === "Enter") {
      const X = K.highlightedIndex, ue = K.items[X >= 0 ? X : 0];
      return ue == null || ue.activate(), !0;
    }
    return F.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [K, t, e]);
  Er(n && x.length === 0, K, ee, { onFieldKey: et }), Tr(n, ae), Cr(n, K, ee, R, x.length > 0, me, { ignoreFields: P });
  const Ve = S(null), Me = oe((F) => {
    var X;
    if (F) {
      F.addEventListener("keydown", ee.current, { capture: !0 }), F.addEventListener("wheel", ae.current, { passive: !1 });
      const ue = F.ownerDocument;
      Ve.current = ue, ue.addEventListener("keydown", me.current, { capture: !0 }), Bt(!0);
    } else
      (X = Ve.current) == null || X.removeEventListener("keydown", me.current, { capture: !0 }), Ve.current = null, Bt(!1);
    R.current = F, _(F);
  }, [_]), [Ce, Ie] = G({ top: 0, left: 0, maxH: Pi, side: "bottom", ready: !1 }), [Fe, Re] = G(0), [tt, Bt] = G(!1);
  Z(() => {
    n && C.current && Re(C.current.getBoundingClientRect().width);
  }, [n]), el({
    anchorRef: C,
    panelRef: R,
    open: n && tt,
    maxHeight: u,
    onPosition: Ie
  }), Z(() => {
    var F;
    if (Ce.ready && n) {
      if (f) {
        (F = re.current) == null || F.focus();
        return;
      }
      const X = R.current;
      X && X.ownerDocument.activeElement !== X && !X.contains(X.ownerDocument.activeElement) && X.focus();
    }
  }, [Ce.ready, n, f]), Z(() => {
    if (!n || !f) return;
    if (K.items.length === 0) {
      K.highlightedIndex !== -1 && K.setHighlighted(-1, "keyboard");
      return;
    }
    const F = K.highlightedIndex;
    (F < 0 || F >= K.items.length) && K.setHighlighted(0, "keyboard");
  }, [n, L, f, K.items.length]), We(() => {
    var X;
    if (!n || K.highlightedIndex < 0 || K.pointerDriven) return;
    const F = (X = R.current) == null ? void 0 : X.querySelector(`[data-ei="${K.highlightedIndex}"]`);
    F == null || F.scrollIntoView({ block: "nearest" });
  }, [n, K.highlightedIndex, K.pointerDriven]);
  const nn = oe((F) => {
    !F && !E.current || (!F && at.current && (Ye.current = !0), t ? t(F) : F || e == null || e());
  }, [t, e]), Ft = S(q);
  Ft.current = q;
  const at = S(!1), Ye = S(!1), ut = oe(() => {
    if (!E.current && Ft.current) {
      if (Ye.current) {
        Ye.current = !1, at.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), ft = He.isValidElement(r) ? r : null, bt = ft ? He.cloneElement(ft, {
    ref: (F) => {
      C.current = F;
    },
    onPointerDown: () => {
      at.current = !0, Ye.current = !1;
    },
    onClick: (F) => {
      var X, ue;
      (ue = (X = ft.props).onClick) == null || ue.call(X, F), ut();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (F) => {
      var X, ue;
      if ((ue = (X = ft.props).onKeyDown) == null || ue.call(X, F), !(!P || !E.current)) {
        if (F.key.length === 1 && !F.ctrlKey && !F.metaKey && !F.altKey)
          ne(!0);
        else if (F.key === "ArrowDown" || F.key === "ArrowUp") {
          F.preventDefault();
          const De = K.items;
          if (De.length === 0) return;
          const nt = F.key === "ArrowDown" ? 1 : -1, on = (K.highlightedIndex + nt + De.length) % De.length;
          K.setHighlighted(on, "keyboard");
        } else if (F.key === "Enter") {
          F.preventDefault();
          const De = K.highlightedIndex, nt = K.items[De >= 0 ? De : 0];
          nt == null || nt.activate();
        }
      }
    }
  }) : r, rn = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${M ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ O(ce.Root, { open: n || q, onOpenChange: nn, modal: !1, children: [
    /* @__PURE__ */ g(ce.Trigger, { asChild: !0, children: bt }),
    /* @__PURE__ */ g(ce.Portal, { container: D ?? void 0, children: /* @__PURE__ */ g(wr.Provider, { value: s, children: /* @__PURE__ */ g(kr.Provider, { value: { chain: x, setChain: w, morph: c, keyboardOpened: v, setKeyboardOpened: k }, children: /* @__PURE__ */ g(tn.Provider, { value: K, children: /* @__PURE__ */ g(Hi.Provider, { value: { query: L, setQuery: T }, children: /* @__PURE__ */ O(
      ce.Content,
      {
        ref: Me,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: `${rn} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ce.left,
          top: Ce.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Fe || void 0,
          maxHeight: Ce.maxH,
          visibility: Ce.ready ? "visible" : "hidden"
        },
        onPointerLeave: K.pointerLeave,
        children: [
          M && /* @__PURE__ */ g("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: U }, children: /* @__PURE__ */ O("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: B, children: [
            /* @__PURE__ */ g(ps, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ g(
              "input",
              {
                ref: re,
                value: L,
                onChange: (F) => T(F.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            L ? /* @__PURE__ */ g(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (F) => F.stopPropagation(),
                onClick: () => {
                  var F;
                  T(""), (F = re.current) == null || F.focus();
                },
                children: /* @__PURE__ */ g(kn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ g("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          M ? /* @__PURE__ */ g("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: l }) : l
        ]
      }
    ) }) }) }) }) })
  ] });
}
function Ff({
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
  closeOnSelect: h,
  readOnly: p = !1,
  theme: m,
  align: y,
  label: x,
  header: w,
  itemLabel: v,
  trigger: k,
  minItems: D = 1,
  itemRender: N,
  morph: C = !0,
  contentClassName: R
}) {
  const E = vr(), q = Fi(), [I, W] = G(null), [$, P] = G(""), L = S($);
  L.current = $;
  const T = S(null), J = S(null);
  Z(() => {
    n && requestAnimationFrame(() => {
      var B, U;
      (U = (B = J.current) == null ? void 0 : B.querySelector('[data-active="1"]')) == null || U.scrollIntoView({ block: "nearest" });
    });
  }, [n]), Z(() => {
    var Y;
    if (!n) return;
    const B = (M) => {
      var me, et, Ve;
      const Q = M.target;
      if (Q && Q.closest("input, textarea, [contenteditable]")) {
        I && Q === T.current && (M.key === "Enter" ? (M.preventDefault(), M.stopImmediatePropagation(), xe()) : M.key === "Escape" && (M.preventDefault(), M.stopImmediatePropagation(), re()));
        return;
      }
      const K = (me = J.current) == null ? void 0 : me.closest(".ui-menu");
      if (!K || !K.contains(M.target)) return;
      const pe = K.ownerDocument, _ = [...K.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], ee = [...K.querySelectorAll('div:last-child > [role="menuitem"]')], ae = [..._, ...ee];
      if (M.key === "ArrowDown" || M.key === "ArrowUp") {
        M.preventDefault(), M.stopImmediatePropagation();
        const Me = pe.activeElement;
        let Ce = Me ? ae.indexOf(Me) : -1;
        if (Ce < 0 && Me) {
          const Re = Me.closest("[data-active]"), tt = Re == null ? void 0 : Re.querySelector('[role="menuitem"]:first-child');
          tt && (Ce = _.indexOf(tt));
        }
        const Ie = M.key === "ArrowDown" ? 1 : -1, Fe = Ce < 0 ? Ie === 1 ? 0 : ae.length - 1 : (Ce + Ie + ae.length) % ae.length;
        (et = ae[Fe]) == null || et.focus({ preventScroll: !0 });
        return;
      }
      if (M.key === "ArrowLeft" || M.key === "ArrowRight") {
        const Me = pe.activeElement, Ce = Me == null ? void 0 : Me.closest("[data-active]");
        if (!Ce) return;
        M.preventDefault(), M.stopImmediatePropagation();
        const Ie = [...Ce.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Ie.length === 0) return;
        const Fe = Me && Ce.contains(Me) ? Ie.indexOf(Me) : -1, Re = M.key === "ArrowRight" ? 1 : -1, tt = Fe < 0 ? 0 : (Fe + Re + Ie.length) % Ie.length;
        (Ve = Ie[tt]) == null || Ve.focus({ preventScroll: !0 });
        return;
      }
    }, U = ((Y = J.current) == null ? void 0 : Y.ownerDocument) ?? null;
    return U == null || U.addEventListener("keydown", B, { capture: !0 }), () => U == null ? void 0 : U.removeEventListener("keydown", B, { capture: !0 });
  }, [n, I]), Z(() => {
    if (!I) return;
    const B = t.find((Q) => Q.id === I);
    B && !$ && P(B.name);
    const U = requestAnimationFrame(() => {
      const Q = T.current;
      Q && (Q.focus(), Q.select());
    });
    let Y = 0;
    const M = window.setInterval(() => {
      const Q = T.current;
      if (Y++, !Q || Y > 12) {
        clearInterval(M);
        return;
      }
      Q.ownerDocument.activeElement !== Q && (Q.focus(), Q.select());
    }, 50);
    return () => {
      cancelAnimationFrame(U), clearInterval(M);
    };
  }, [I]), Z(() => {
    if (I) {
      const B = t.find((U) => U.id === I);
      B && !$ && P(B.name);
    }
  }, [I, t]);
  const ne = (B, U) => {
    W(B), P(U);
  }, xe = () => {
    I && L.current.trim() && o(I, L.current.trim()), W(null);
  }, re = () => {
    W(null);
  }, te = v || w.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ O(Pn, { open: n, onOpenChange: (B) => {
    B ? (W(null), P("")) : (I && $.trim() && o(I, $.trim()), W(null), P("")), (!B || !p) && e(B);
  }, width: "w-80", theme: m, align: y, trigger: k, morph: C, contentClassName: R, children: [
    /* @__PURE__ */ g("div", { className: `shrink-0 ${E.headerText}`, children: w }),
    /* @__PURE__ */ g("div", { ref: J, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((B) => {
      const U = B.id === r, Y = I === B.id;
      return /* @__PURE__ */ g("div", { "data-active": U ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${U || Y ? E.rowActiveBg : E.rowHoverBg} ${I && !Y ? "opacity-40 pointer-events-none" : ""}`, children: Y ? /* @__PURE__ */ O(lt, { children: [
        /* @__PURE__ */ g("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ g(
          "input",
          {
            ref: T,
            autoFocus: !0,
            value: $,
            onChange: (M) => P(M.target.value),
            onKeyDown: (M) => {
              M.key === "Enter" && (M.preventDefault(), M.stopPropagation(), xe()), M.key === "Escape" && (M.preventDefault(), M.stopPropagation(), re());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: q
          }
        ) }),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${E.editConfirm}`,
            onSelect: (M) => {
              M.preventDefault(), xe();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g(Ei, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${E.editCancel}`,
            onSelect: (M) => {
              M.preventDefault(), re();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g(kn, { className: E.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ O(lt, { children: [
        /* @__PURE__ */ g(
          ce.Item,
          {
            style: q,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${E.rowText} ${U ? "" : E.rowTextHover}`,
            onSelect: h ? () => {
              i(B.id);
            } : (M) => {
              M.preventDefault(), i(B.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g("span", { className: `truncate ${U ? E.rowActiveText : ""}`, children: N ? N(B) : B.name })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${U ? E.btnActive : E.btnBase}`,
            onSelect: (M) => {
              M.preventDefault(), ne(B.id, B.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ g(ms, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${U ? E.btnActive : E.btnBase}`,
            onSelect: (M) => {
              M.preventDefault();
              const Q = s(B.id);
              Q && ne(Q, `${B.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ g(Ci, { className: E.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${E.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= D ? E.btnDisabled : U ? E.btnDangerActive : E.btnDanger}`,
            onSelect: (M) => {
              M.preventDefault(), l(B.id);
            },
            onTouchStart: () => {
            },
            disabled: p || t.length <= D,
            children: /* @__PURE__ */ g(nr, { className: E.btnIcon })
          }
        )
      ] }) }, B.id);
    }) }),
    /* @__PURE__ */ O("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ O(lt, { children: [
        /* @__PURE__ */ g(ce.Separator, { className: E.separator }),
        /* @__PURE__ */ O(
          ce.Item,
          {
            className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
            onSelect: (B) => {
              B.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ g(Ti, { className: `${E.btnIcon} ${E.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ g(ce.Separator, { className: E.separator }),
      c && /* @__PURE__ */ O(
        ce.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (B) => {
            B.preventDefault();
            const U = c();
            U && ne(U, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ g(gs, { className: `${E.btnIcon} ${E.icon}` }),
            "New ",
            te
          ]
        }
      ),
      a && /* @__PURE__ */ O(
        ce.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (B) => {
            B.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ O("svg", { className: `${E.btnIcon} ${E.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ g("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ g("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ g("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ O(
        ce.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (B) => {
            B.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ O("svg", { className: `${E.btnIcon} ${E.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ g("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ g("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ g("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ O(
        ce.Item,
        {
          className: `w-full text-left ${E.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${E.itemDefault} ui-row`,
          onSelect: (B) => {
            B.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ g(nr, { className: `${E.btnIcon} ${E.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function ol({
  onClick: n,
  icon: e,
  disabled: t = !1,
  variant: r = "default",
  className: i = "",
  children: o,
  keepOpen: s = !1,
  selected: l = !1,
  rightAction: c,
  trailing: a
}) {
  Bi();
  const u = vr(), d = Fi(), f = S(!1), h = S(null), { myIndex: p, highlighted: m, setPointer: y } = Wi({
    label: () => _i(o),
    activate: () => {
      t || n();
    },
    disabled: t
  }), { query: x } = rl(), w = x.trim() !== "" && p < 0, v = r === "danger" ? u.itemDanger : u.itemDefault;
  return /* @__PURE__ */ O(
    ce.Item,
    {
      ref: h,
      "data-ei": p >= 0 ? p : void 0,
      style: { ...d, display: w ? "none" : void 0 },
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${v} ${l ? "ui-item-selected" : ""} ${m ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (k) => {
        if (f.current) {
          f.current = !1;
          return;
        }
        s && k.preventDefault(), n();
      },
      onPointerEnter: () => {
        y(p);
      },
      onTouchStart: () => {
      },
      disabled: t,
      children: [
        e && /* @__PURE__ */ g("span", { className: `${u.icon} shrink-0`, children: e }),
        /* @__PURE__ */ g("span", { className: "flex-1 truncate", children: o }),
        a && /* @__PURE__ */ g("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
        c && /* @__PURE__ */ g(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${u.rightAction}`,
            title: c.title,
            onPointerDown: (k) => {
              k.stopPropagation(), k.preventDefault(), f.current = !0, c.onClick();
            },
            onClick: (k) => {
              k.stopPropagation(), k.preventDefault();
            },
            children: c.icon
          }
        )
      ]
    }
  );
}
function sl({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Pt(kr), f = l.includes(n), h = l[l.length - 1] === n, p = Bi(), m = Qt(), y = S(null), x = S(null), [w, v] = G(f), k = !f && w;
  Z(() => {
    f && v(!0);
  }, [f]);
  const D = () => c((Y) => {
    const M = Y.indexOf(n);
    return M >= 0 ? Y.slice(0, M) : Y;
  }), N = Dn(), C = Sr(), R = S(C);
  R.current = C;
  const E = S(null);
  Z(() => {
    var M;
    const Y = {
      label: e,
      activate: () => {
        d(n), c((Q) => Q.includes(n) ? Q : [...Q, n]);
      },
      submenu: !0
    };
    return E.current = Y, (M = R.current) == null ? void 0 : M.register(Y);
  }, []);
  const q = C && E.current ? C.items.indexOf(E.current) : -1, I = q >= 0 && q === C.highlightedIndex, W = oe(() => {
    const Y = y.current;
    if (!Y) return null;
    const M = Y.getBoundingClientRect();
    return { left: M.left, top: M.top, width: M.width, height: M.height };
  }, []), $ = br({
    visible: f,
    morph: a,
    anchor: W,
    onClosed: () => v(!1)
  }), P = S(() => {
  }), L = S(() => {
  }), T = S(() => {
  });
  Er(f && h, N, P, {
    onCloseSub: () => {
      D(), C && q >= 0 && C.setHighlighted(q, "keyboard");
    }
  });
  const J = S(u);
  J.current = u, Z(() => {
    f && (J.current === n ? (N.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var Y;
      return (Y = x.current) == null ? void 0 : Y.focus();
    }), d(null)) : N.setHighlighted(-1, "keyboard"));
  }, [f]), Tr(f, L), Cr(f, N, P, x, !h, T), He.useLayoutEffect(() => {
    var M;
    if (!f || N.highlightedIndex < 0 || N.pointerDriven) return;
    const Y = (M = x.current) == null ? void 0 : M.querySelector(`[data-ei="${N.highlightedIndex}"]`);
    Y == null || Y.scrollIntoView({ block: "nearest" });
  }, [f, N.highlightedIndex, N.pointerDriven]);
  const ne = S(null), xe = oe((Y) => {
    var M;
    if (Y) {
      Y.addEventListener("keydown", P.current, { capture: !0 }), Y.addEventListener("wheel", L.current, { passive: !1 });
      const Q = Y.ownerDocument;
      ne.current = Q, Q.addEventListener("keydown", T.current, { capture: !0 });
    } else
      (M = ne.current) == null || M.removeEventListener("keydown", T.current, { capture: !0 }), ne.current = null;
    x.current = Y, $(Y);
  }, [$]), re = ke(), te = { padding: `${z(8, 12, re)}px ${z(12, 16, re)}px`, fontSize: z(12, 14, re) }, B = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${I ? " ui-item-highlighted" : ""}${k ? " ui-sub-closing" : ""}`, U = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ O(ce.Sub, { open: f || w, onOpenChange: (Y) => c((M) => {
    if (!Y) {
      const Q = M.indexOf(n);
      return Q >= 0 ? M.slice(0, Q) : M;
    }
    return M.includes(n) ? M : [...M, n];
  }), children: [
    /* @__PURE__ */ O(
      ce.SubTrigger,
      {
        ref: y,
        "data-ei": q >= 0 ? q : void 0,
        style: te,
        className: B,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          C && q >= 0 && C.setHighlighted(q, "pointer");
        },
        onPointerDown: (Y) => {
          Y.pointerType === "pen" && (Y.preventDefault(), c((M) => f ? M.slice(0, M.indexOf(n)) : [...M, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ g(Sn, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ O("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ g("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ g(Sn, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ g(ce.Portal, { container: m ?? void 0, children: /* @__PURE__ */ g(
      ce.SubContent,
      {
        ref: xe,
        "data-theme": p,
        className: U,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: N.pointerLeave,
        children: /* @__PURE__ */ g(tn.Provider, { value: N, children: o })
      }
    ) })
  ] });
}
const _t = 8, _f = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s = "light", morph: l = !0 }) => {
  const c = ke(), a = z(12, 14, c), u = S(null), d = Zt(), [f, h] = G(!1), [p, m] = G([]), [y, x] = G(null), w = Dn();
  Z(() => {
    if (n)
      return w.setHighlighted(-1, "keyboard"), Li(r);
  }, [n, r]);
  const v = S({ left: e, top: t });
  n && (v.current = { left: e, top: t });
  const k = oe(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), D = br({
    visible: !0,
    morph: l,
    anchor: k,
    cloneOnUnmount: !0
  }), N = S(() => {
  }), C = S(() => {
  }), R = S(() => {
  });
  Er(n, w, N), Tr(n, C), Cr(n, w, N, u, p.length > 0, R);
  const E = S(null), q = oe(($) => {
    var P;
    if ($) {
      $.addEventListener("keydown", N.current, { capture: !0 }), $.addEventListener("wheel", C.current, { passive: !1 });
      const L = $.ownerDocument;
      E.current = L, L.addEventListener("keydown", R.current, { capture: !0 });
    } else
      (P = E.current) == null || P.removeEventListener("keydown", R.current, { capture: !0 }), E.current = null;
    u.current = $, h(!!$), D($);
  }, [D]), [I, W] = G(null);
  return We(() => {
    var U;
    if (!n || !f || !u.current) return;
    const $ = u.current, P = $.offsetWidth, L = $.offsetHeight, T = (U = o == null ? void 0 : o.current) == null ? void 0 : U.getBoundingClientRect(), J = T ? T.right : (d == null ? void 0 : d.innerWidth) ?? 0, ne = T ? T.bottom : (d == null ? void 0 : d.innerHeight) ?? 0, xe = T ? T.left : 0, re = T ? T.top : 0;
    let te = Math.max(re + _t, v.current.top), B = Math.max(xe + _t, v.current.left);
    B + P > J && (B = J - P - _t), te + L > ne && (te = Math.max(re + _t, ne - L - _t)), W({ left: B, top: te });
  }, [n, f, e, t, o]), n ? /* @__PURE__ */ O(ce.Root, { open: n, onOpenChange: ($) => {
    $ || r();
  }, modal: !1, children: [
    /* @__PURE__ */ g(ce.Trigger, { asChild: !0, children: /* @__PURE__ */ g("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ g(ce.Portal, { children: /* @__PURE__ */ g(wr.Provider, { value: s, children: /* @__PURE__ */ g(kr.Provider, { value: { chain: p, setChain: m, morph: l, keyboardOpened: y, setKeyboardOpened: x }, children: /* @__PURE__ */ g(tn.Provider, { value: w, children: /* @__PURE__ */ g(
      ce.Content,
      {
        ref: q,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: a, left: (I == null ? void 0 : I.left) ?? v.current.left, top: (I == null ? void 0 : I.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, Hf = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = ke(), c = { padding: `${z(8, 12, l)}px ${z(12, 16, l)}px`, fontSize: z(12, 14, l) }, a = Sr(), u = S(a);
  u.current = a;
  const d = S(null);
  Z(() => {
    var m;
    const p = { label: _i(s), activate: () => {
      r || n();
    } };
    return d.current = p, (m = u.current) == null ? void 0 : m.register(p);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ O(
    ce.Item,
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
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ g("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ g("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Wf = () => /* @__PURE__ */ g(ce.Separator, { className: "ui-sep my-1" }), jf = (n) => /* @__PURE__ */ g(sl, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), le = 8, ji = "[data-modal-stack]", Ge = 220, Kt = "cubic-bezier(0.32, 0.72, 0, 1)", yn = 0.94;
function kt() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function it(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function Ji(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Xr(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = Ji(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Ge}ms ${Kt}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, Ge + 80));
    });
  });
}
function ll(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${yn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Ge}ms ${Kt}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Ge + 60));
    });
  });
}
function Gr(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - yn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * yn, height: i.height * yn };
  e.style.transition = `transform ${Ge}ms ${Kt}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Ji(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, Ge + 60);
}
function qn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ji) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function cn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ji) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function cl({
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
  dismissOnBackdrop: d = !0
}) {
  const f = S(null), h = S(null), p = S(null), m = ke(), y = z(20, 24, m), x = z(10, 12, m), w = z(12, 14, m), v = z(14, 16, m), k = z(20, 24, m), D = z(20, 24, m), N = z(20, 24, m), C = z(14, 16, m), R = z(16, 20, m), E = z(10, 12, m), q = z(12, 14, m), I = z(8, 10, m), W = z(4, 6, m), $ = { padding: `${x}px ${y}px` }, P = { fontSize: w }, L = { padding: `${D}px ${k}px 16px ${k}px` }, T = { fontSize: v }, J = { padding: `0 ${k}px 16px` }, ne = { padding: `${N}px ${k}px` }, xe = { fontSize: E, padding: `${W}px ${I}px` }, [re, te] = G(!1), B = oe((b) => {
    f.current = b, te(b !== null);
  }, []), U = Qt(), Y = Zt(), M = S(Y);
  M.current = Y;
  const [Q, K] = G(null), pe = S(null), _ = S(!1), ee = S(!1), ae = S(0), me = S({ w: 0, h: 0 }), et = S(!1), [Ve, Me] = G(!1), [Ce, Ie] = G(!1), Fe = S(0), Re = S(!1), [tt, Bt] = G(!1), nn = S(c);
  nn.current = c;
  const Ft = S(!1), at = S(!1), Ye = () => {
    at.current = !0, Me(!0);
  }, ut = () => {
    at.current = !1, Me(!1);
  };
  Z(() => {
    n || (K(null), et.current = !1, _.current = !1, Ie(!1));
  }, [n]), We(() => {
    if (!n || et.current || !re || !f.current) return;
    et.current = !0;
    const b = f.current.getBoundingClientRect(), j = M.current ?? null, V = (j == null ? void 0 : j.innerWidth) ?? 0, ie = it(j);
    K({
      left: Math.max(le, Math.min((V - b.width) / 2, V - b.width - le)),
      top: Math.max(ie.top + le, Math.min(ie.top + (ie.height - b.height) / 2, ie.bottom - b.height - le))
    });
  }, [n, re]), We(() => {
    if (!n || !re || !c || kt() || !f.current) return;
    const b = f.current, j = qn(b), V = j[j.length - 1];
    Ye(), V ? Xr(Fe, b, V.getBoundingClientRect(), ut) : ll(Fe, b, ut);
  }, [n, re]);
  const ft = oe(() => {
    if (!u || Re.current) return;
    const b = f.current, j = !!b && qn(b).length > 0;
    if (!b || !c || kt() || j) {
      e();
      return;
    }
    Re.current = !0, Bt(!0), Ft.current = !0, Ye(), Gr(Fe, b, () => {
      Re.current = !1, Bt(!1), ut(), e();
    });
  }, [c, e, u]), bt = oe(() => {
    const b = f.current;
    if (!b || Ft.current || !nn.current || kt() || qn(b).length > 0) return;
    const j = b.ownerDocument, V = b.cloneNode(!0);
    V.removeAttribute("data-modal-stack"), V.removeAttribute("data-state"), V.removeAttribute("role"), V.removeAttribute("data-aria-hidden"), V.removeAttribute("tabindex"), V.setAttribute("aria-hidden", "true"), V.style.pointerEvents = "none", j.body.appendChild(V), Gr({ current: 0 }, V, () => {
      V.isConnected && V.remove();
    });
  }, []);
  We(() => () => bt(), [bt]);
  const rn = S(n);
  We(() => {
    const b = rn.current;
    rn.current = n, b && !n && bt();
  }, [n, re, bt]), Z(() => {
    if (!n || !re || !c || !f.current) return;
    const b = f.current, j = b.parentNode;
    if (!j) return;
    let V = 0, ie = null, se = !1;
    const fe = () => {
      V = 0;
      const be = cn(b);
      if (be.length > 0)
        b.style.opacity = "", b.style.pointerEvents = "", ie = be[be.length - 1].getBoundingClientRect(), se = !0, V = requestAnimationFrame(fe);
      else if (se) {
        se = !1, ie && !kt() && (Ye(), Xr(Fe, b, ie, ut)), ie = null;
        const Ne = M.current ?? null;
        Ne == null || Ne.setTimeout(() => {
          !b || !b.isConnected || getComputedStyle(b).opacity !== "1" && (b.style.opacity = "1", b.style.pointerEvents = "");
        }, 240);
      }
    }, ye = new MutationObserver(() => {
      !V && cn(b).length > 0 && (V = requestAnimationFrame(fe));
    });
    return ye.observe(j, { childList: !0 }), () => {
      ye.disconnect(), V && cancelAnimationFrame(V);
    };
  }, [n, re]), Z(() => {
    if (!re || !c || kt() || !f.current) return;
    const b = f.current;
    let j = Math.round(b.getBoundingClientRect().height), V = !1;
    const ie = new ResizeObserver(() => {
      if (!b.isConnected) return;
      const se = Math.round(b.getBoundingClientRect().height);
      if (!V) {
        V = !0, j = se;
        return;
      }
      if (Math.abs(se - j) < 1) return;
      if (pe.current || Re.current || cn(b).length > 0) {
        j = se;
        return;
      }
      if (at.current) return;
      const fe = j;
      j = se, Ye();
      const ye = b.getBoundingClientRect(), be = it(M.current ?? null), Ne = !_.current && !ee.current, wt = Ne ? be.top + (be.height - fe) / 2 : ye.top, _e = Ne ? be.top + (be.height - se) / 2 : ye.top;
      b.style.transition = "none", b.style.height = `${fe}px`, Ne && (b.style.top = `${wt}px`), h.current && (h.current.style.overflow = "hidden"), b.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.style.height === `${fe}px` && (b.style.transition = `height ${Ge}ms ${Kt}${Ne ? `, top ${Ge}ms ${Kt}` : ""}`, b.style.height = `${se}px`, Ne && (b.style.top = `${_e}px`), window.setTimeout(() => {
            b.style.height === `${se}px` && (b.style.transition = "", b.style.height = "", h.current && (h.current.style.overflow = ""), Ne && K({ left: ye.left, top: _e }), ut());
          }, Ge + 60));
        });
      });
    });
    return ie.observe(b), () => ie.disconnect();
  }, [re]), Z(() => {
    if (!re || !f.current || c && !kt()) return;
    const b = f.current, j = new ResizeObserver(() => {
      if (!b.isConnected || pe.current || Re.current || ee.current || cn(b).length > 0) return;
      const V = M.current ?? null, ie = it(V), se = (V == null ? void 0 : V.innerWidth) ?? 0, fe = b.getBoundingClientRect(), ye = Math.max(ie.top + le, Math.min(fe.top, ie.bottom - fe.height - le)), be = Math.max(le, Math.min(fe.left, se - fe.width - le));
      (Math.abs(ye - fe.top) > 0.5 || Math.abs(be - fe.left) > 0.5) && K({ left: be, top: ye });
    });
    return j.observe(b), () => j.disconnect();
  }, [re, c]);
  const F = oe(() => {
    const b = f.current;
    if (!b) return null;
    const j = b.getBoundingClientRect();
    return { left: j.left, top: j.top, width: j.width, height: j.height };
  }, []), X = oe((b, j) => {
    const V = M.current ?? null, ie = (V == null ? void 0 : V.innerWidth) ?? 0, se = it(V), fe = F(), ye = fe ? fe.width : Math.min(ie - le * 2, 576), be = fe ? fe.height : Math.min(se.height - le * 2, 400);
    return {
      left: Math.max(le, Math.min(b, ie - ye - le)),
      top: Math.max(se.top + le, Math.min(j, se.bottom - be - le))
    };
  }, [F]);
  Z(() => {
    if (!n) return;
    const b = M.current ?? null, j = (b == null ? void 0 : b.visualViewport) ?? null;
    if (!b || !j) return;
    const V = 120;
    ee.current = !1, me.current = { w: b.innerWidth, h: b.innerHeight };
    let ie = 0;
    const se = () => {
      if (Re.current || pe.current) return;
      const ye = (b == null ? void 0 : b.innerHeight) ?? 0, be = (b == null ? void 0 : b.innerWidth) ?? 0, wt = it(b).height < ye - V, _e = ye < me.current.h - V && be === me.current.w;
      wt || _e ? (ee.current = !0, ae.current && (clearTimeout(ae.current), ae.current = 0)) : ae.current || (ae.current = (b == null ? void 0 : b.setTimeout(() => {
        ee.current = !1, ae.current = 0, Ie(!1);
      }, 600)) ?? 0), Ie(ee.current), !ie && (ie = requestAnimationFrame(() => {
        var Vr;
        ie = 0;
        const Jr = f.current;
        if (!Jr) return;
        const dt = it(M.current ?? null), Ke = Jr.getBoundingClientRect(), qr = ((Vr = M.current) == null ? void 0 : Vr.innerWidth) ?? 0, jn = (b == null ? void 0 : b.innerHeight) ?? 0, ds = dt.height < jn - V || jn < me.current.h - V && (b == null ? void 0 : b.innerWidth) === me.current.w;
        me.current = { w: (b == null ? void 0 : b.innerWidth) ?? 0, h: jn };
        const sn = Ke.top >= dt.top + le && Ke.bottom <= dt.bottom - le, Kr = () => {
          K({
            left: Math.max(le, Math.min((qr - Ke.width) / 2, qr - Ke.width - le)),
            top: Math.max(dt.top + le, Math.min(dt.top + (dt.height - Ke.height) / 2, dt.bottom - Ke.height - le))
          });
        };
        if (ds && !Se) {
          if (_.current) {
            sn || K(X(Ke.left, Ke.top));
            return;
          }
          if (sn) return;
          Kr();
          return;
        }
        if (!ee.current) {
          if (_.current) {
            sn || K(X(Ke.left, Ke.top));
            return;
          }
          sn || Kr();
        }
      }));
    };
    j.addEventListener("resize", se), j.addEventListener("scroll", se);
    const fe = () => {
      Re.current || pe.current || ie || (ie = requestAnimationFrame(() => {
        ie = 0;
        const ye = f.current;
        if (!ye) return;
        const be = M.current ?? null, Ne = it(be), wt = (be == null ? void 0 : be.innerWidth) ?? 0, _e = ye.getBoundingClientRect();
        if (_.current) {
          K(X(_e.left, _e.top));
          return;
        }
        K({
          left: Math.max(le, Math.min((wt - _e.width) / 2, wt - _e.width - le)),
          top: Math.max(Ne.top + le, Math.min(Ne.top + (Ne.height - _e.height) / 2, Ne.bottom - _e.height - le))
        });
      }));
    };
    return b.addEventListener("orientationchange", fe), () => {
      j.removeEventListener("resize", se), j.removeEventListener("scroll", se), b.removeEventListener("orientationchange", fe), ie && cancelAnimationFrame(ie), ae.current && clearTimeout(ae.current);
    };
  }, [n, X]);
  const ue = oe((b) => {
    if (b.target.closest("button")) return;
    _.current = !0;
    const j = F();
    j && (K(X(j.left, j.top)), pe.current = { startX: b.clientX, startY: b.clientY, posX: j.left, posY: j.top }, b.target.setPointerCapture(b.pointerId));
  }, [F, X]), De = oe((b) => {
    const j = pe.current;
    j && (b.preventDefault(), K(X(j.posX + b.clientX - j.startX, j.posY + b.clientY - j.startY)));
  }, [X]), nt = oe(() => {
    pe.current = null;
  }, []), on = pe.current !== null, _r = oe(() => {
    _.current = !1;
    const b = M.current ?? null, j = it(b), V = (b == null ? void 0 : b.innerWidth) ?? 0, ie = f.current, se = ie ? ie.getBoundingClientRect() : { width: 0, height: 0 };
    K({
      left: Math.max(le, Math.min((V - se.width) / 2, V - se.width - le)),
      top: Math.max(j.top + le, Math.min(j.top + (j.height - se.height) / 2, j.bottom - se.height - le))
    });
  }, []), Wn = S(0), Hr = oe(() => {
    const b = Date.now();
    b - Wn.current < 300 ? (Wn.current = 0, _r()) : Wn.current = b;
  }, [_r]), Wr = Q !== null, as = Wr ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", us = `${i ? `${i} w-full` : "max-w-xl w-full"}`, jr = {
    ...Wr ? { left: Q.left, top: Q.top } : {},
    width: `min(100%, calc(100dvw - ${le * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Ce ? {} : { maxHeight: `calc(100dvh - ${le * 2}px)` }
  }, fs = oe((b) => {
    if (b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey) return;
    const j = b.target, V = p.current;
    if (!(!!j.closest("[data-modal-close]") || !!V && V.contains(j) && !!j.closest('button, a, [role="button"]')) && j.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !V) return;
    const se = Array.from(V.querySelectorAll("button[data-modal-confirm]")), fe = se.length > 0 ? se : Array.from(V.querySelectorAll("button")), ye = fe[fe.length - 1];
    !ye || ye.disabled || (b.preventDefault(), ye.click());
  }, []);
  return /* @__PURE__ */ g(rt.Root, { open: n, onOpenChange: (b) => {
    b || ft();
  }, children: /* @__PURE__ */ O(rt.Portal, { container: U ?? void 0, children: [
    /* @__PURE__ */ g(
      rt.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${tt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (b) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (b.preventDefault(), d && ft());
        }
      }
    ),
    /* @__PURE__ */ O(
      rt.Content,
      {
        ref: B,
        onKeyDown: fs,
        onInteractOutside: (b) => {
          d || b.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${as} ${us}`,
        style: { touchAction: "manipulation", ...Object.keys(jr).length > 0 ? jr : {} },
        children: [
          a ? /* @__PURE__ */ O(
            "div",
            {
              style: L,
              className: `flex items-center justify-between ${on ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (b) => {
                Ve || ue(b);
              },
              onPointerMove: De,
              onPointerUp: nt,
              onClick: Hr,
              children: [
                /* @__PURE__ */ g(rt.Title, { style: T, className: "font-bold text-white truncate", children: t }),
                u && /* @__PURE__ */ g(rt.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ g(kn, { style: { width: R, height: R } }) })
              ]
            }
          ) : /* @__PURE__ */ O(
            "div",
            {
              style: $,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${on ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (b) => {
                Ve || ue(b);
              },
              onPointerMove: De,
              onPointerUp: nt,
              onClick: Hr,
              children: [
                /* @__PURE__ */ O("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ g("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ g(rt.Title, { style: P, className: "font-bold text-white truncate", children: t })
                ] }),
                /* @__PURE__ */ O("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ O("button", { onClick: l, style: xe, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ g(Ti, { style: { width: q, height: q } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ g(rt.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ g(kn, { style: { width: C, height: C } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ g("div", { ref: h, style: a ? J : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: s }),
          o && /* @__PURE__ */ g("div", { ref: p, style: a ? ne : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ g("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) });
}
function Jf({ children: n }) {
  const e = ke(), t = z(20, 24, e), r = z(8, 12, e);
  return /* @__PURE__ */ g("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${t}px` }, children: n });
}
const al = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", ul = {
  zinc: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-blue-600 text-white font-semibold border border-blue-500 hover:bg-blue-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-red-600 text-white font-semibold border border-red-500 hover:bg-red-500 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
}, fl = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "border border-transparent text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "border border-transparent bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function an({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = Xe({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ g(
    "button",
    {
      type: r,
      style: o,
      className: `${al} ${n === "hero" ? ul[e] : fl[n]} ${t}`,
      ...i
    }
  );
}
function qi({ checked: n, size: e, tone: t = "accent" }) {
  return /* @__PURE__ */ g(
    "span",
    {
      className: `ui-check-indicator ${n ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: n ? /* @__PURE__ */ O("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ g("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
        /* @__PURE__ */ g("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ g("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ g("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function dl({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = ke(), h = z(16, 20, f), p = z(12, 14, f), m = z(12, 14, f), y = z(12, 16, f), x = z(10, 12, f), w = z(8, 10, f);
  return /* @__PURE__ */ O(
    "label",
    {
      className: `ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: w, padding: d ? `${x}px ${y}px` : void 0 },
      onClick: (k) => k.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ g(
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
        d ? /* @__PURE__ */ g(qi, { checked: n, size: h, tone: a }) : /* @__PURE__ */ g("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ g("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ g("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ g("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: m }, children: r })
      ]
    }
  );
}
function qf(n = "md") {
  const e = Se && Ri() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function Ki(n = "md") {
  return n === "sm" ? Xe({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : Xe({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Vi = Dt(null);
function Kf() {
  const n = Pt(Vi);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Vf({ children: n }) {
  const [e, t] = G(null), [r, i] = G(!1), o = S(null), s = ke(), l = z(16, 20, s), c = z(12, 14, s), a = Ki(), u = S(e);
  u.current = e;
  const d = oe(() => {
    const w = u.current;
    w && (w.kind === "confirm" ? w.resolve(!1) : w.kind === "prompt" ? w.resolve(null) : w.resolve());
  }, []), f = oe((w) => {
    if (w.suppressKey) {
      const v = localStorage.getItem(w.suppressKey);
      if (v && Date.now() < parseInt(v, 10))
        return Promise.resolve(!0);
    }
    return new Promise((v) => {
      d(), i(!1), t({ kind: "confirm", options: w, resolve: v });
    });
  }, [d]), h = oe((w) => new Promise((v) => {
    d(), t({ kind: "prompt", options: w, resolve: v });
  }), [d]), p = oe((w) => new Promise((v) => {
    d(), t({ kind: "alert", options: w, resolve: v });
  }), [d]);
  Z(() => {
    if (e) {
      const w = setTimeout(() => {
        var v;
        return (v = o.current) == null ? void 0 : v.focus();
      }, 50);
      return () => clearTimeout(w);
    }
  }, [e]);
  const m = oe(() => {
    var w, v;
    if (e) {
      if (e.kind === "confirm") {
        const k = e.options;
        k.suppressKey && r && localStorage.setItem(k.suppressKey, String(Date.now() + 864e5)), e.resolve(!0);
      } else e.kind === "prompt" ? e.resolve(((v = (w = o.current) == null ? void 0 : w.value) == null ? void 0 : v.trim()) || null) : e.resolve();
      t(null);
    }
  }, [e, r]), y = e !== null;
  Z(() => {
    if (!y) return;
    const w = (v) => {
      v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey || v.isComposing || (v.preventDefault(), v.stopImmediatePropagation(), m());
    };
    return document.addEventListener("keydown", w, !0), () => document.removeEventListener("keydown", w, !0);
  }, [y, m]);
  const x = oe(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), t(null));
  }, [e]);
  return /* @__PURE__ */ O(Vi.Provider, { value: { confirm: f, prompt: h, alert: p }, children: [
    n,
    y && /* @__PURE__ */ g(
      cl,
      {
        open: !0,
        onClose: x,
        closable: (e == null ? void 0 : e.kind) !== "alert",
        dismissOnBackdrop: (e == null ? void 0 : e.kind) !== "alert",
        title: (e == null ? void 0 : e.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: e && /* @__PURE__ */ O(lt, { children: [
          e.kind !== "alert" && /* @__PURE__ */ g(an, { variant: "ghost", onClick: x, children: "Cancel" }),
          e.kind === "alert" ? /* @__PURE__ */ g(an, { onClick: m, children: "OK" }) : e.kind === "confirm" ? /* @__PURE__ */ g(
            an,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: m,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ g(an, { "data-modal-confirm": !0, onClick: m, children: "Save" })
        ] }),
        children: /* @__PURE__ */ O("div", { className: "flex flex-col", style: { gap: l }, children: [
          (e == null ? void 0 : e.options.message) && /* @__PURE__ */ g("p", { style: { fontSize: c }, className: "text-zinc-400 leading-relaxed", children: e.options.message }),
          (e == null ? void 0 : e.kind) === "confirm" && e.options.suppressKey && /* @__PURE__ */ g(
            dl,
            {
              block: !0,
              checked: r,
              onChange: i,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (e == null ? void 0 : e.kind) === "prompt" && /* @__PURE__ */ g(
            "input",
            {
              ref: o,
              type: "text",
              defaultValue: e.options.defaultValue || "",
              placeholder: e.options.placeholder,
              style: a,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const hl = 500, pl = 250, ml = 5, Pe = 88, Qr = 4;
function gl(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function yl({ x: n, y: e, ms: t }) {
  const r = S(null), i = Qt();
  return Z(() => {
    r.current && gl(r.current, t);
  }, [t]), pr(
    /* @__PURE__ */ g(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Pe / 2,
          top: e - Pe / 2,
          width: Pe,
          height: Pe,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ O("svg", { ref: r, width: Pe, height: Pe, viewBox: `0 0 ${Pe} ${Pe}`, children: [
          /* @__PURE__ */ g(
            "circle",
            {
              cx: Pe / 2,
              cy: Pe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Qr + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ g(
            "circle",
            {
              cx: Pe / 2,
              cy: Pe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: Qr,
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
function Yf() {
  return { "data-no-longpress": "true" };
}
function xl(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Uf({
  children: n,
  showRing: e = !0,
  longPressMs: t = hl,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = G(null), c = zi(), a = S(null), u = S(null), d = S({ x: 0, y: 0, target: null }), f = S(!1), h = Math.min(pl, t * 0.5), p = S(i);
  p.current = i;
  const m = S(o);
  return m.current = o, Z(() => {
    if (!Se || !c) return;
    const y = (k) => {
      if (!rr(k.pointerType) || k.button !== 0) return;
      const D = k.target;
      if (!D.closest(r) || (p.current ? !p.current(D) : xl(D))) return;
      const N = k.clientX, C = k.clientY;
      d.current = { x: N, y: C, target: k.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: N, y: C }), h)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const R = d.current.target;
        if (!R) return;
        const E = m.current;
        if (E) {
          E(R, N, C);
          return;
        }
        const q = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: N,
          clientY: C,
          button: 2,
          view: window
        });
        R.dispatchEvent(q);
      }, t);
    }, x = (k) => {
      if (!f.current || a.current === null) return;
      const D = k.clientX - d.current.x, N = k.clientY - d.current.y;
      Math.sqrt(D * D + N * N) > ml && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, w = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, v = (k) => {
      rr(k.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", y), c.addEventListener("pointermove", x), c.addEventListener("pointerup", w), c.addEventListener("pointercancel", w), c.addEventListener("pointerleave", v), () => {
      c.removeEventListener("pointerdown", y), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", w), c == null || c.removeEventListener("pointercancel", w), c == null || c.removeEventListener("pointerleave", v), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ O(lt, { children: [
    n,
    e && s && /* @__PURE__ */ g(yl, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function Xf() {
  const n = Us();
  return Ys ? n === null || rr(n) : !1;
}
function Ue({
  variant: n = "subtle",
  theme: e = "light",
  cloud: t = !1,
  active: r = !1,
  iconOnly: i = !1,
  className: o = "",
  type: s = "button",
  ...l
}) {
  const c = Xe({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), a = Xe({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), u = Xe({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), d = "", f = "", h = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", p = {
    light: {
      active: "bg-zinc-950 text-white",
      inactive: "text-zinc-500 hover:text-zinc-900",
      cloudActive: "bg-blue-950 text-blue-50",
      cloudInactive: "text-blue-950 hover:bg-blue-950/10 hover:text-blue-950"
    },
    dark: {
      active: "bg-zinc-950 text-white",
      inactive: "text-zinc-500 hover:text-zinc-300",
      cloudActive: "bg-blue-950 text-blue-50",
      cloudInactive: "text-zinc-500 hover:text-zinc-300"
    }
  }, m = {
    active: "bg-white text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white",
    cloudActive: "bg-white text-blue-950",
    cloudInactive: "text-white/70 hover:text-white hover:bg-blue-900/60",
    cloudOpen: "bg-blue-900/60! text-white"
  }, y = {
    light: {
      subtle: { base: `${d} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${f} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${d} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${d} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${f} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${d} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, x = `${f} bg-blue-950 hover:bg-blue-900 text-white`, w = "bg-blue-900!", v = l["data-state"] === "open", k = y[e][n], D = n === "primary" ? a : n.startsWith("tab") ? u : c, N = z(6, 8, ke()), C = z(28, 40, ke()), R = e === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let E;
  if (n === "tab") {
    const I = p[e];
    E = r ? t ? I.cloudActive : I.active : t ? I.cloudInactive : I.inactive;
  } else n === "tab-header" ? E = `${r ? t ? m.cloudActive : m.active : t ? m.cloudInactive : m.inactive} ${v ? t ? m.cloudOpen : m.open : ""}` : (E = `${k.base} ${v ? k.open : ""}`, r && (E = `${E} ${R}`), n === "primary" && e === "light" && t && (E = v ? `${x} ${w}` : x));
  const q = i ? { width: C, height: C, padding: 0, gap: 0 } : { ...D, gap: N };
  return /* @__PURE__ */ g("button", { type: s, className: `${h} ${i ? "justify-center" : ""} ${E} ${o}`, style: q, ...l });
}
const bl = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, wl = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, vl = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Gf({
  active: n = !1,
  warn: e = !1,
  style: t,
  className: r = "",
  type: i = "button",
  children: o,
  ...s
}) {
  return /* @__PURE__ */ g(
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
        ...e ? vl : n ? wl : bl,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const kl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Sl = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Kn = 1900, Vn = 2100;
function El(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Cl(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Qf({ selected: n, onChange: e, theme: t = "light", showChips: r = !0, className: i = "", initialView: o }) {
  const s = /* @__PURE__ */ new Date(), l = (() => {
    if (!o) return s;
    const _ = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(_.getTime()) ? s : _;
  })(), [c, a] = G(l.getFullYear()), [u, d] = G(l.getMonth()), [f, h] = G("days"), [p, m] = G(null), y = vn(() => new Set(n), [n]), x = (_) => {
    y.has(_) ? e(n.filter((ee) => ee !== _)) : e([...n, _]);
  }, w = vn(() => {
    const _ = El(c, u), ee = new Date(c, u, 1).getDay(), ae = [];
    for (let me = 0; me < ee; me++) ae.push({ key: `pad-${me}`, day: 0, empty: !0 });
    for (let me = 1; me <= _; me++) ae.push({ key: Cl(c, u, me), day: me, empty: !1 });
    return ae;
  }, [c, u]), v = (_) => a((ee) => Math.max(Kn, Math.min(Vn, ee + _))), k = (_) => {
    u + _ < 0 ? (a((ee) => Math.max(Kn, ee - 1)), d(11)) : u + _ > 11 ? (a((ee) => Math.min(Vn, ee + 1)), d(0)) : d((ee) => ee + _);
  }, D = () => {
    if (p === null) return;
    const _ = parseInt(p, 10);
    !isNaN(_) && _ >= Kn && _ <= Vn && a(_), m(null);
  }, N = (_) => n.some((ee) => ee.startsWith(`${c}-${String(_ + 1).padStart(2, "0")}`)), C = t === "dark", R = ke(), E = z(4, 8, R), q = z(16, 20, R), I = z(10, 11, R), W = z(6, 8, R), $ = z(12, 14, R), P = z(6, 10, R), L = z(12, 14, R), T = z(8, 12, R), J = z(10, 12, R), ne = z(6, 10, R), xe = z(2, 6, R), re = z(64, 80, R), te = { padding: E }, B = { width: q, height: q }, U = { fontSize: I, paddingTop: W, paddingBottom: W }, Y = { fontSize: $, paddingTop: P, paddingBottom: P }, M = { fontSize: L, paddingTop: T, paddingBottom: T }, Q = { fontSize: J, padding: `${xe}px ${ne}px` }, K = C ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", pe = C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ O("div", { className: `border rounded-lg overflow-hidden w-full ${C ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ O("div", { className: `flex items-center justify-between px-3 py-2 border-b ${C ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? v(-1) : k(-1),
          style: te,
          className: `rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ g(ys, { style: B })
        }
      ),
      f === "days" ? /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => h("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${C ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(c, u).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ g(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(c),
          onChange: (_) => m(_.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (_) => _.target.select(),
          onBlur: D,
          onKeyDown: (_) => {
            _.key === "Enter" && (_.preventDefault(), D()), _.key === "Escape" && m(null);
          },
          style: { width: re },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? v(1) : k(1),
          style: te,
          className: `rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ g(Sn, { style: B })
        }
      )
    ] }),
    f === "months" ? /* @__PURE__ */ O("div", { children: [
      /* @__PURE__ */ g("div", { className: "grid grid-cols-3 text-center", children: Sl.map((_, ee) => /* @__PURE__ */ O(
        "button",
        {
          type: "button",
          onClick: () => {
            d(ee), h("days");
          },
          style: M,
          className: `relative font-medium transition-colors border-b ${ee === u ? K : pe} ${C ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            _,
            N(ee) && /* @__PURE__ */ g("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${ee === u ? "bg-white" : C ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        _
      )) }),
      /* @__PURE__ */ g("div", { className: `text-center border-t ${C ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => {
            a(s.getFullYear()), d(s.getMonth()), h("days");
          },
          style: { paddingTop: P, paddingBottom: P, fontSize: $ },
          className: `px-3 font-semibold rounded transition-colors ${C ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ O("div", { className: "grid grid-cols-7 text-center", children: [
      kl.map((_) => /* @__PURE__ */ g("div", { style: U, className: `font-semibold uppercase tracking-wider border-b ${C ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: _ }, _)),
      w.map((_) => _.empty ? /* @__PURE__ */ g("div", {}, _.key) : /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => x(_.key),
          style: Y,
          className: `font-medium transition-colors border-b ${C ? "border-zinc-800/60" : "border-zinc-50"} ${y.has(_.key) ? K : C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: _.day
        },
        _.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ O("div", { className: `px-3 py-2 border-t ${C ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ O("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ g("div", { className: "flex flex-wrap gap-1", children: n.map((_) => {
        const ee = /* @__PURE__ */ new Date(_ + "T00:00:00"), ae = ee.getFullYear() === s.getFullYear() ? ee.toLocaleString("default", { month: "short", day: "numeric" }) : ee.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ O(
          "button",
          {
            type: "button",
            onClick: () => x(_),
            "aria-label": `Remove ${ae}`,
            style: Q,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${C ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              ae,
              /* @__PURE__ */ g("span", { className: `leading-none ${C ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          _
        );
      }) })
    ] })
  ] });
}
function Zf({
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
  const h = (k) => e instanceof Set ? e.has(k) : e.includes(k), p = ke(), m = z(12, 16, p), y = z(8, 12, p), x = z(12, 14, p), w = z(16, 20, p), v = r != null || i != null;
  return /* @__PURE__ */ O("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    v && /* @__PURE__ */ O("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ g("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ g("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ O(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((k) => {
            const D = h(k.id), N = /* @__PURE__ */ g(qi, { checked: D, size: w });
            return /* @__PURE__ */ O(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(k.id),
                "aria-pressed": D,
                className: `ui-checklist-item ${D ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${m}px`, fontSize: x },
                ...k.dataProps,
                children: [
                  u === "leading" && N,
                  k.leading != null && /* @__PURE__ */ g("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ g("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ g("span", { className: "ui-checklist-secondary", children: k.secondary }),
                  u === "trailing" && /* @__PURE__ */ g("span", { className: "ml-auto flex shrink-0", children: N })
                ]
              },
              k.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ g("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function ed({
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
  const u = ke(), d = s ? 10 : z(12, 16, u), f = s ? 6 : z(8, 12, u), h = s ? 12 : z(12, 14, u), p = s ? 14 : z(16, 20, u);
  return /* @__PURE__ */ O("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ g("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ g("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ O(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((m) => {
            const y = e === m.id;
            return /* @__PURE__ */ O(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(m.id),
                className: `ui-checklist-item ${y ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: h },
                children: [
                  /* @__PURE__ */ g("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: y && /* @__PURE__ */ g("span", { className: "ui-radio-dot" }) }),
                  m.leading != null && /* @__PURE__ */ g("span", { className: "ui-checklist-leading", children: m.leading }),
                  /* @__PURE__ */ g("span", { className: "ui-checklist-label", children: m.label }),
                  m.secondary != null && /* @__PURE__ */ g("span", { className: "ui-checklist-secondary", children: m.secondary })
                ]
              },
              m.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ g("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const td = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = Zt(), { refs: l, floatingStyles: c } = Ms({
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
          var w;
          if (i !== "visible") return {};
          const u = (w = a.elements.floating.ownerDocument) == null ? void 0 : w.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), h = Math.max(d.y, 0), p = Math.min(d.x + d.width, u.innerWidth), m = Math.min(d.y + d.height, u.innerHeight);
          if (p <= f || m <= h) return {};
          const y = r === "left" ? p - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? h - d.y : r === "bottom" ? m - (d.y + d.height) : 0;
          return { x: a.x + y, y: a.y + x };
        }
      },
      Mi(o),
      Ni({ padding: 8 }),
      Ai({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (a) => {
          var m;
          const u = (m = a.elements.floating.ownerDocument) == null ? void 0 : m.defaultView;
          if (!u) return {};
          const d = a.rects.floating.width, f = a.rects.floating.height, h = Math.max(8, Math.min(a.x, u.innerWidth - d - 8)), p = Math.max(8, Math.min(a.y, u.innerHeight - f - 8));
          return { x: h, y: p };
        }
      }
    ],
    whileElementsMounted: Ns
  });
  return We(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ O(lt, { children: [
    !t && /* @__PURE__ */ g("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && pr(
      /* @__PURE__ */ g(
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
}, St = ({ content: n, children: e }) => {
  const t = ke(), r = z(10, 12, t), i = z(6, 6, t), o = z(10, 12, t), s = { padding: `${i}px ${r}px`, fontSize: o }, l = Qt(), c = Zt(), [a, u] = G(!1), [d, f] = G({ x: 0, y: 0 }), h = S(null), p = S(null), m = () => {
    if (!h.current) return;
    const y = h.current.getBoundingClientRect();
    f({ x: y.left + y.width / 2, y: y.top });
  };
  return Z(() => () => {
    p.current && clearTimeout(p.current);
  }, []), Z(() => (a && c && (m(), c.addEventListener("scroll", m, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", m, !0)), [a]), /* @__PURE__ */ O(
    "div",
    {
      ref: h,
      className: "inline-flex",
      onMouseEnter: () => {
        p.current && clearTimeout(p.current), m(), u(!0);
      },
      onMouseLeave: () => {
        p.current = setTimeout(() => u(!1), 60);
      },
      children: [
        e,
        a && pr(
          /* @__PURE__ */ O(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white pointer-events-none",
              style: { ...s, left: d.x, top: d.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((y, x) => /* @__PURE__ */ g("div", { className: x > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: y }, x)),
                /* @__PURE__ */ g("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          l ?? document.body
        )
      ]
    }
  );
};
function Ln() {
  const n = ke(), e = Se, t = e ? z(28, 40, n) : 28, r = e ? z(28, 40, n) : 28, i = e ? z(10, 14, n) : 10, o = e ? z(10, 14, n) : 10, s = e ? z(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const nd = Se ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Tl = Se ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", un = Se ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ml = "hover:bg-red-950/50", rd = Se ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", id = "bg-blue-900/50 border-blue-700 text-blue-300", od = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Nl = Se ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", sd = Se ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Yi = Se ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Al = "inline-flex rounded overflow-hidden border border-zinc-700", zl = Se ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", fn = ({ onClick: n, disabled: e, title: t, className: r = Tl, children: i }) => {
  const o = Ln();
  return /* @__PURE__ */ g(St, { content: t, children: /* @__PURE__ */ g("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Rl = {
  light: {
    wrap: "border-zinc-200",
    pill: "bg-zinc-950",
    active: "text-white",
    idle: "text-zinc-500 hover:text-zinc-900"
  },
  dark: {
    wrap: "border-zinc-700 bg-zinc-950",
    pill: "bg-zinc-800",
    active: "text-white",
    idle: "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
  }
}, ld = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c = "light", tablist: a, ariaLabel: u }) => {
  var D;
  const d = Ln(), f = s && !Se ? 24 : d.control.height, h = Xe({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), p = Xe({ px: 12, py: 2, fs: 12 }, { px: 16, py: 10, fs: 14 }), m = (N) => i ? i(N) : n === N, y = He.useRef(null), x = He.useRef([]), w = Math.max(0, e.findIndex((N) => m(N.v))), [v, k] = He.useState(null);
  if (He.useLayoutEffect(() => {
    if (l !== "track") return;
    const N = () => {
      const E = x.current[w];
      E && k({ left: E.offsetLeft, width: E.offsetWidth });
    };
    N();
    const C = y.current;
    if (!C) return;
    const R = new ResizeObserver(N);
    return R.observe(C), () => R.disconnect();
  }, [l, w, e.length]), l === "track") {
    const N = Rl[c], C = typeof window < "u" && !!((D = window.matchMedia) != null && D.call(window, "(prefers-reduced-motion: reduce)").matches);
    return /* @__PURE__ */ O(
      "div",
      {
        ref: y,
        role: a ? "tablist" : "group",
        "aria-label": u,
        className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${N.wrap}`,
        children: [
          v && /* @__PURE__ */ g(
            "span",
            {
              "aria-hidden": !0,
              className: `absolute rounded ${N.pill} ${C ? "" : "transition-[transform,width] duration-200 ease-out"}`,
              style: { left: 0, top: 2, bottom: 2, width: v.width, transform: `translateX(${v.left}px)` }
            }
          ),
          e.map((R, E) => {
            const q = m(R.v);
            return /* @__PURE__ */ O(
              "button",
              {
                ref: (I) => {
                  x.current[E] = I;
                },
                type: "button",
                disabled: r,
                onClick: () => t(R.v),
                title: R.title,
                role: a ? "tab" : void 0,
                "aria-selected": a ? q : void 0,
                "aria-pressed": a ? void 0 : q,
                "aria-label": R.ariaLabel ?? (R.l ? void 0 : R.title),
                style: s && !Se ? p : h,
                className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${q ? N.active : N.idle}`,
                children: [
                  R.icon,
                  R.l
                ]
              },
              R.v
            );
          })
        ]
      }
    );
  }
  return /* @__PURE__ */ g("div", { className: `${Al}${o ? " w-full" : ""}`, children: e.map((N) => {
    const C = m(N.v);
    return /* @__PURE__ */ O(
      "button",
      {
        disabled: r,
        onClick: () => t(N.v),
        title: N.title,
        style: { ...d.control, height: f },
        className: `font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${C ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${N.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
        children: [
          N.icon,
          N.l
        ]
      },
      N.v
    );
  }) });
}, cd = ({ children: n }) => /* @__PURE__ */ O("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ g("span", { className: Se ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ g("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Il = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", $l = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", ad = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ O("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ g("span", { className: t ? Il : $l, children: n }),
  e
] }), ud = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ O("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ g("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), fd = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ O("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ g(fn, { onClick: () => r(-1), disabled: n, title: "Move up", className: un, children: /* @__PURE__ */ g(xs, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ g(fn, { onClick: () => r(1), disabled: n, title: "Move down", className: un, children: /* @__PURE__ */ g(bs, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ g(fn, { onClick: e, disabled: n, title: "Duplicate", className: un, children: /* @__PURE__ */ g(Ci, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ g("div", { className: Yi }),
    /* @__PURE__ */ g(fn, { onClick: t, disabled: n, title: "Delete", className: `${un} ${Ml}`, children: /* @__PURE__ */ g(nr, { className: "w-2.5 h-2.5" }) })
  ] })
);
function Te(n) {
  this.content = n;
}
Te.prototype = {
  constructor: Te,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Te(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Te(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Te([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Te(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Te(i);
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
    return n = Te.from(n), n.size ? new Te(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Te.from(n), n.size ? new Te(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Te.from(n);
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
Te.from = function(n) {
  if (n instanceof Te) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Te(e);
};
function Ui(n, e, t) {
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
      return c && c < s.length && c < l.length && Qi(s.charCodeAt(c - 1)) && Gi(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = Ui(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Xi(n, e, t, r) {
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
      return d && f && d < a.length && Qi(a.charCodeAt(d - 1)) && Gi(a.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = Xi(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function Gi(n) {
  return n >= 56320 && n < 57344;
}
function Qi(n) {
  return n >= 55296 && n < 56320;
}
class A {
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
    return new A(i, this.size + e.size);
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
    return new A(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? A.empty : e == 0 && t == this.content.length ? this : new A(this.content.slice(e, t));
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
    return i[e] = t, new A(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new A([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new A(this.content.concat(e), this.size + e.nodeSize);
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
    return Ui(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Xi(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return dn(0, e);
    if (e == this.size)
      return dn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? dn(t + 1, o) : dn(t, r);
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
      return A.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return A.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return A.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new A(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return A.empty;
    if (e instanceof A)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new A([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
A.empty = new A([], 0);
const Yn = { index: 0, offset: 0 };
function dn(n, e) {
  return Yn.index = n, Yn.offset = e, Yn;
}
function Cn(n, e) {
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
      if (!Cn(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Cn(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let de = class sr {
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
    return this == e || this.type == e.type && Cn(this.attrs, e.attrs);
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
    let i = r.create(t.attrs);
    return r.checkAttrs(i.attrs), i;
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
      return sr.none;
    if (e instanceof sr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
de.none = [];
class Vt extends Error {
}
class H {
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
    let r = eo(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new H(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new H(Zi(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return H.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new H(A.fromJSON(e, t.content), r, i);
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
    return new H(e, r, i);
  }
}
H.empty = new H(A.empty, 0, 0);
function Zi(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Zi(o.content, e - i - 1, t - i - 1)));
}
function eo(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = eo(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function Ol(n, e, t) {
  if (t.openStart > n.depth)
    throw new Vt("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Vt("Inconsistent open depths");
  return to(n, e, t, 0);
}
function to(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = to(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return mt(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = Dl(t, n);
      return mt(o, ro(n, s, l, e, r));
    }
  else return mt(o, Tn(n, e, r));
}
function no(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Vt("Cannot join " + e.type.name + " onto " + n.type.name);
}
function lr(n, e, t) {
  let r = n.node(t);
  return no(r, e.node(t)), r;
}
function pt(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function jt(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (pt(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    pt(i.child(l), r);
  e && e.depth == t && e.textOffset && pt(e.nodeBefore, r);
}
function mt(n, e) {
  if (!n.type.validContent(e))
    throw new Vt("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function ro(n, e, t, r, i) {
  let o = n.depth > i && lr(n, e, i + 1), s = r.depth > i && lr(t, r, i + 1), l = [];
  return jt(null, n, i, l), o && s && e.index(i) == t.index(i) ? (no(o, s), pt(mt(o, ro(n, e, t, r, i + 1)), l)) : (o && pt(mt(o, Tn(n, e, i + 1)), l), jt(e, t, i, l), s && pt(mt(s, Tn(t, r, i + 1)), l)), jt(r, null, i, l), new A(l);
}
function Tn(n, e, t) {
  let r = [];
  if (jt(null, n, t, r), n.depth > t) {
    let i = lr(n, e, t + 1);
    pt(mt(i, Tn(n, e, t + 1)), r);
  }
  return jt(e, null, t, r), new A(r);
}
function Dl(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(A.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Yt {
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
      return de.none;
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
        return new Mn(this, e, r);
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
    return new Yt(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = Zr.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      Zr.set(e, r = new Pl());
    let i = r.elts[r.i] = Yt.resolve(e, t);
    return r.i = (r.i + 1) % Ll, i;
  }
}
class Pl {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Ll = 12, Zr = /* @__PURE__ */ new WeakMap();
class Mn {
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
const Bl = /* @__PURE__ */ Object.create(null);
let Mt = class cr {
  /**
  @internal
  */
  constructor(e, t, r, i = de.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || A.empty;
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
    return this.type == e && Cn(this.attrs, t || e.defaultAttrs || Bl) && de.sameSet(this.marks, r || de.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new cr(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new cr(this.type, this.attrs, this.content, e);
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
      return H.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new H(a, i.depth - s, o.depth - s);
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
    return Ol(this.resolve(e), this.resolve(t), r);
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
    return Yt.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Yt.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), io(this.marks, e);
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
  canReplace(e, t, r = A.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = de.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!de.sameSet(e, this.marks))
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
    let i = A.fromJSON(e, t.content), o = e.nodeType(t.type).create(t.attrs, i, r);
    return o.type.checkAttrs(o.attrs), o;
  }
};
Mt.prototype.text = void 0;
class Nn extends Mt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : io(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new Nn(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Nn(this.type, this.attrs, e, this.marks);
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
function io(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class gt {
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
    let r = new Fl(e, t);
    if (r.next == null)
      return gt.empty;
    let i = oo(r);
    r.next && r.err("Unexpected trailing text");
    let o = Kl(ql(i));
    return Vl(o, r), o;
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
        return A.from(l.map((a) => a.createAndFill()));
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
gt.empty = new gt(!0);
class Fl {
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
function oo(n) {
  let e = [];
  do
    e.push(_l(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function _l(n) {
  let e = [];
  do
    e.push(Hl(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Hl(n) {
  let e = Jl(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Wl(n, e);
    else
      break;
  return e;
}
function ei(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Wl(n, e) {
  let t = ei(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = ei(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function jl(n, e) {
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
function Jl(n) {
  if (n.eat("(")) {
    let e = oo(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = jl(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function ql(n) {
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
function so(n, e) {
  return e - n;
}
function ti(n, e) {
  let t = [];
  return r(e), t.sort(so);
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
function Kl(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(ti(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        ti(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new gt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(so);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Vl(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function lo(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function co(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let r in n) {
    let i = e && e[r];
    if (i === void 0) {
      let o = n[r];
      if (o.hasDefault)
        i = o.default;
      else
        throw new RangeError("No value supplied for attribute " + r);
    }
    t[r] = i;
  }
  return t;
}
function ao(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
function uo(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Ul(n, r, e[r]);
  return t;
}
class An {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = uo(e, r.attrs), this.defaultAttrs = lo(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == gt.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : co(this.attrs, e);
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
    return new Mt(this, this.computeAttrs(e), A.from(t), de.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = A.from(t), this.checkContent(t), new Mt(this, this.computeAttrs(e), t, de.setFrom(r));
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
    if (e = this.computeAttrs(e), t = A.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(A.empty, !0);
    return o ? new Mt(this, e, t.append(o), de.setFrom(r)) : null;
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
  @internal
  */
  checkAttrs(e) {
    ao(this.attrs, e, "node", this.name);
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
    return t ? t.length ? t : de.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new An(o, t, s));
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
function Yl(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Ul {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Yl(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Bn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = uo(e, i.attrs), this.excluded = null;
    let o = lo(this.attrs);
    this.instance = o ? new de(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new de(this, co(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Bn(o, i++, t, s)), r;
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
  @internal
  */
  checkAttrs(e) {
    ao(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Xl {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Te.from(e.nodes), t.marks = Te.from(e.marks || {}), this.nodes = An.compile(this.spec.nodes, this), this.marks = Bn.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = gt.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? ni(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : ni(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Mt.fromJSON(this, i), this.markFromJSON = (i) => de.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof An) {
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
    return new Nn(r, r.defaultAttrs, e, de.setFrom(t));
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
function ni(n, e) {
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
function Gl(n) {
  return n.tag != null;
}
function Ql(n) {
  return n.style != null;
}
class Nt {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (Gl(i))
        this.tags.push(i);
      else if (Ql(i)) {
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
    let r = new ii(this, t, !1);
    return r.addAll(e, de.none, t.from, t.to), r.finish();
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
    let r = new ii(this, t, !0);
    return r.addAll(e, de.none, t.from, t.to), H.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (tc(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = oi(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = oi(s)), s.node || s.ignore || s.mark || (s.node = i);
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
    return e.cached.domParser || (e.cached.domParser = new Nt(e, Nt.schemaRules(e)));
  }
}
const fo = {
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
}, Zl = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, ho = { ol: !0, ul: !0 }, Ut = 1, ar = 2, Jt = 4;
function ri(n, e, t) {
  return e != null ? (e ? Ut : 0) | (e === "full" ? ar : 0) : n && n.whitespace == "pre" ? Ut | ar : t & ~Jt;
}
class hn {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = de.none, this.match = o || (s & Jt ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(A.from(e));
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
    if (!(this.options & Ut)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = A.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(A.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !fo.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ii {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = ri(null, t.preserveWhitespace, 0) | (r ? Jt : 0);
    i ? o = new hn(i.type, i.attrs, de.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new hn(null, null, de.none, !0, null, s) : o = new hn(e.schema.topNodeType, null, de.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & ar ? "full" : this.localPreserveWS || (i.options & Ut) > 0, { schema: s } = this.parser;
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
    ho.hasOwnProperty(s) && this.parser.normalizeLists && ec(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : Zl.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (fo.hasOwnProperty(s))
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
      let s = de.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : si(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = ri(e, o, s.options);
    s.options & Jt && s.content.length == 0 && (l |= Jt);
    let c = de.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : si(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new hn(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= Ut);
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
function ec(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && ho.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function tc(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function oi(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function si(n, e) {
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
const po = 65535, mo = Math.pow(2, 16);
function nc(n, e) {
  return n + e * mo;
}
function li(n) {
  return n & po;
}
function rc(n) {
  return (n - (n & po)) / mo;
}
const go = 1, yo = 2, xn = 4, xo = 8;
class ur {
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
    return (this.delInfo & xo) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (go | xn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (yo | xn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & xn) > 0;
  }
}
class Oe {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Oe.empty)
      return Oe.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = li(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + rc(e);
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
        let f = a ? e == c ? -1 : e == d ? 1 : t : t, h = c + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? c : d) ? null : nc(l / 3, e - c), m = e == c ? yo : e == d ? go : xn;
        return (t < 0 ? e != c : e != d) && (m |= xo), new ur(h, m, p);
      }
      i += u - a;
    }
    return r ? e + i : new ur(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = li(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Oe(this.ranges, !this.inverted);
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
    return e == 0 ? Oe.empty : new Oe(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Oe.empty = new Oe([]);
class zn {
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
    return new zn(this._maps, this.mirror, e, t);
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
    let e = new zn();
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
    return r ? e : new ur(e, i, null);
  }
}
const Un = /* @__PURE__ */ Object.create(null);
class ze {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Oe.empty;
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
    let r = Un[t.stepType];
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
    if (e in Un)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Un[e] = t, t.prototype.jsonID = e, t;
  }
}
class ve {
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
    return new ve(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new ve(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return ve.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof Vt)
        return ve.fail(o.message);
      throw o;
    }
  }
}
function Mr(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Mr(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return A.fromArray(r);
}
class ot extends ze {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new H(Mr(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ve.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new je(this.from, this.to, this.mark);
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
    return new ot(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ze.jsonID("addMark", ot);
class je extends ze {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new H(Mr(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ve.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new ot(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new je(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof je && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new je(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new je(t.from, t.to, e.markFromJSON(t.mark));
  }
}
ze.jsonID("removeMark", je);
class st extends ze {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ve.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return ve.fromReplace(e, this.pos, this.pos + 1, new H(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new st(this.pos, t.marks[i]);
        return new st(this.pos, this.mark);
      }
    }
    return new yt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new st(t.pos, this.mark);
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
    return new st(t.pos, e.markFromJSON(t.mark));
  }
}
ze.jsonID("addNodeMark", st);
class yt extends ze {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ve.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return ve.fromReplace(e, this.pos, this.pos + 1, new H(A.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new st(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new yt(t.pos, this.mark);
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
    return new yt(t.pos, e.markFromJSON(t.mark));
  }
}
ze.jsonID("removeNodeMark", yt);
class we extends ze {
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
    return this.structure && fr(e, this.from, this.to) ? ve.fail("Structure replace would overwrite content") : ve.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Oe([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new we(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && we.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new we(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof we) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? H.empty : new H(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new we(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? H.empty : new H(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new we(e.from, this.to, t, this.structure);
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
    return new we(t.from, t.to, H.fromJSON(e, t.slice), !!t.structure);
  }
}
we.MAP_BIAS = 1;
ze.jsonID("replace", we);
class Ee extends ze {
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
    if (this.structure && (fr(e, this.from, this.gapFrom) || fr(e, this.gapTo, this.to)))
      return ve.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ve.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ve.fromReplace(e, this.from, this.to, r) : ve.fail("Content does not fit in gap");
  }
  getMap() {
    return new Oe([
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
    return new Ee(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new Ee(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new Ee(t.from, t.to, t.gapFrom, t.gapTo, H.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
ze.jsonID("replaceAround", Ee);
function fr(n, e, t) {
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
function ic(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), h = Math.min(a + c.nodeSize, t), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (s && s.to == f && s.mark.eq(d[m]) ? s.to = h : i.push(s = new je(f, h, d[m])));
      l && l.to == f ? l.to = h : o.push(l = new ot(f, h, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function oc(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Bn) {
      let a = s.marks, u;
      for (; u = r.isInSet(a); )
        (c || (c = [])).push(u), a = u.removeFromSet(a);
    } else r ? r.isInSet(s.marks) && (c = [r]) : c = s.marks;
    if (c && c.length) {
      let a = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < c.length; u++) {
        let d = c[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == o - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = a, f.step = o) : i.push({ style: d, from: Math.max(l, e), to: a, step: o });
      }
    }
  }), i.forEach((s) => n.step(new je(s.from, s.to, s.style)));
}
function Nr(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new we(l, u, H.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new je(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(a.text); )
          p || (p = new H(A.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new we(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(A.empty, !0);
    n.replace(l, l, new H(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function sc(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Lt(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !sc(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function lc(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = A.empty, d = 0;
  for (let p = o, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = A.from(r.node(p).copy(u)), d++) : c--;
  let f = A.empty, h = 0;
  for (let p = o, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = A.from(i.node(p).copy(f)), h++) : a++;
  n.step(new Ee(c, a, s, l, new H(u.append(f), d, h), u.size - d, !0));
}
function bo(n, e, t = null, r = n) {
  let i = cc(n, e), o = i && ac(r, e);
  return o ? i.map(ci).concat({ type: e, attrs: t }).concat(o.map(ci)) : null;
}
function ci(n) {
  return { type: n, attrs: null };
}
function cc(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function ac(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function uc(n, e, t) {
  let r = A.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = A.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new Ee(i, o, i, o, new H(r, 0, 0), t.length, !0));
}
function fc(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && dc(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? a = !1 : !h && p && (a = !0);
      }
      a === !1 && vo(n, s, l, o), Nr(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new Ee(d, f, d + 1, f - 1, new H(A.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && wo(n, s, l, o), !1;
    }
  });
}
function wo(n, e, t, r) {
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
function vo(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function dc(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function hc(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new Ee(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new H(A.from(s), 0, 0), 1, !0));
}
function Qe(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let a = i.depth - 1, u = t - 2; a > o; a--, u--) {
    let d = i.node(a), f = i.index(a);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function pc(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = A.empty, s = A.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = A.from(i.node(l).copy(o));
    let u = r && r[a];
    s = A.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new we(e, e, new H(o.append(s), t, t), !0));
}
function xt(n, e) {
  let t = n.resolve(e), r = t.index();
  return ko(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function mc(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function ko(n, e) {
  return !!(n && e && !n.isLeaf && mc(n, e));
}
function Fn(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && ko(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function gc(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    vo(n, u.node(), u.before(), l);
  }
  s.inlineContent && Nr(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new we(a, c.map(e + t, -1), H.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    wo(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function yc(n, e, t) {
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
function _n(n, e, t = e, r = H.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return So(i, o, r) ? new we(e, t, r) : new xc(i, o, r).fit();
}
function So(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class xc {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = A.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = A.from(e.node(i).copy(this.placed));
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
    let c = new H(o, s, l);
    return e > -1 ? new Ee(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new we(r.pos, i.pos, c) : null;
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
        r ? (o = Xn(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(A.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Xn(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new H(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Xn(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new H(Ht(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new H(Ht(e, t, 1), t, r);
  }
  // Move content from the unplaced slice at `sliceDepth` to the
  // frontier node at `frontierDepth`. Close that frontier node when
  // applicable.
  placeNodes({ sliceDepth: e, frontierDepth: t, parent: r, inject: i, wrap: o }) {
    for (; this.depth > t; )
      this.closeFrontierNode();
    if (o)
      for (let m = 0; m < o.length; m++)
        this.openFrontierNode(o[m]);
    let s = this.unplaced, l = r ? r.content : s.content, c = s.openStart - e, a = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; a < l.childCount; ) {
      let m = l.child(a), y = d.matchType(m.type);
      if (!y)
        break;
      a++, (a > 1 || c == 0 || m.content.size) && (d = y, u.push(Eo(m.mark(f.allowedMarks(m.marks)), a == 1 ? c : 0, a == l.childCount ? h : -1)));
    }
    let p = a == l.childCount;
    p || (h = -1), this.placed = Wt(this.placed, t, A.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, y = l; m < h; m++) {
      let x = y.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), y = x.content;
    }
    this.unplaced = p ? e == 0 ? H.empty : new H(Ht(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new H(Ht(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Gn(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Gn(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = Gn(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Wt(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Wt(this.placed, this.depth, A.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(A.empty, !0);
    t.childCount && (this.placed = Wt(this.placed, this.frontier.length, t));
  }
}
function Ht(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(Ht(n.firstChild.content, e - 1, t)));
}
function Wt(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Wt(n.lastChild.content, e - 1, t)));
}
function Xn(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Eo(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Eo(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(A.empty, !0)))), n.copy(r);
}
function Gn(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !bc(t, o.content, s) ? l : null;
}
function bc(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function wc(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function vc(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (So(i, o, r))
    return n.step(new we(e, t, r));
  let s = To(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == h && s.splice(1, 0, -f);
  }
  let c = s.indexOf(l), a = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (a.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = a[f], p = wc(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = a[h];
    if (p)
      for (let m = 0; m < s.length; m++) {
        let y = s[(m + c) % s.length], x = !0;
        y < 0 && (x = !1, y = -y);
        let w = i.node(y - 1), v = i.index(y - 1);
        if (w.canReplaceWith(v, v, p.type, p.marks))
          return n.replace(i.before(y), x ? o.after(y) : t, new H(Co(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Co(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Co(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(A.empty, !0));
  }
  return n;
}
function kc(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = yc(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new H(A.from(r), 0, 0));
}
function Sc(n, e, t) {
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
  let o = To(r, i);
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
function To(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class At extends ze {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return ve.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return ve.fromReplace(e, this.pos, this.pos + 1, new H(A.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Oe.empty;
  }
  invert(e) {
    return new At(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new At(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new At(t.pos, t.attr, t.value);
  }
}
ze.jsonID("attr", At);
class Xt extends ze {
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
    return ve.ok(r);
  }
  getMap() {
    return Oe.empty;
  }
  invert(e) {
    return new Xt(this.attr, e.attrs[this.attr]);
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
    return new Xt(t.attr, t.value);
  }
}
ze.jsonID("docAttr", Xt);
let It = class extends Error {
};
It = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
It.prototype = Object.create(Error.prototype);
It.prototype.constructor = It;
It.prototype.name = "TransformError";
class Ec {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new zn();
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
      throw new It(t.failed);
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
  replace(e, t = e, r = H.empty) {
    let i = _n(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new H(A.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, H.empty);
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
    return vc(this, e, t, r), this;
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
    return kc(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return Sc(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return lc(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return gc(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return uc(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return fc(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return hc(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new At(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new Xt(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new st(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof de)
      t.isInSet(r.marks) && this.step(new yt(e, t));
    else {
      let i = r.marks, o, s = [];
      for (; o = t.isInSet(i); )
        s.push(new yt(e, o)), i = o.removeFromSet(i);
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
    return pc(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return ic(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return oc(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Nr(this, e, t, r), this;
  }
}
const Qn = /* @__PURE__ */ Object.create(null);
class ge {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new Cc(e.min(t), e.max(t))];
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
  replace(e, t = H.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? H.empty : t), l == 0 && fi(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), fi(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new $e(e) : Et(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Et(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Et(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new Je(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Et(e, e, 0, 0, 1) || new Je(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Et(e, e, e.content.size, e.childCount, -1) || new Je(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Qn[t.type];
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
    if (e in Qn)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Qn[e] = t, t.prototype.jsonID = e, t;
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
    return $e.between(this.$anchor, this.$head).getBookmark();
  }
}
ge.prototype.visible = !0;
class Cc {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let ai = !1;
function ui(n) {
  !ai && !n.parent.inlineContent && (ai = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class $e extends ge {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    ui(e), ui(t), super(e, t);
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
      return ge.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new $e(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = H.empty) {
    if (super.replace(e, t), t == H.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof $e && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Hn(this.anchor, this.head);
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
    return new $e(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = ge.findFrom(t, r, !0) || ge.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return ge.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (ge.findFrom(e, -r, !0) || ge.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new $e(e, t);
  }
}
ge.jsonID("text", $e);
class Hn {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Hn(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return $e.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class he extends ge {
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
    return r ? ge.near(o) : new he(o);
  }
  content() {
    return new H(A.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof he && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Ar(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new he(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new he(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
he.prototype.visible = !1;
ge.jsonID("node", he);
class Ar {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Hn(r, r) : new Ar(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && he.isSelectable(r) ? new he(t) : ge.near(t);
  }
}
class Je extends ge {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = H.empty) {
    if (t == H.empty) {
      e.delete(0, e.doc.content.size);
      let r = ge.atStart(e.doc);
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
    return new Je(e);
  }
  map(e) {
    return new Je(e);
  }
  eq(e) {
    return e instanceof Je;
  }
  getBookmark() {
    return Tc;
  }
}
ge.jsonID("all", Je);
const Tc = {
  map() {
    return this;
  },
  resolve(n) {
    return new Je(n);
  }
};
function Et(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return $e.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && he.isSelectable(l))
        return he.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Et(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function fi(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof we || i instanceof Ee))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(ge.near(n.doc.resolve(s), t));
}
function di(n, e) {
  return !e || !n ? n : n.bind(e);
}
class pn {
  constructor(e, t, r) {
    this.name = e, this.init = di(t.init, r), this.apply = di(t.apply, r);
  }
}
new pn("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new pn("selection", {
  init(n, e) {
    return n.selection || ge.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new pn("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new pn("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Mo = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function No(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Ao = (n, e, t) => {
  let r = No(n, t);
  if (!r)
    return !1;
  let i = zr(r);
  if (!i) {
    let s = r.blockRange(), l = s && Lt(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Bo(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && ($t(o, "end") || he.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = _n(n.doc, r.before(s), r.after(s), H.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection($t(o, "end") ? ge.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : he.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, Mc = (n, e, t) => {
  let r = No(n, t);
  if (!r)
    return !1;
  let i = zr(r);
  return i ? zo(n, i, e) : !1;
}, Nc = (n, e, t) => {
  let r = Io(n, t);
  if (!r)
    return !1;
  let i = Rr(r);
  return i ? zo(n, i, e) : !1;
};
function zo(n, e, t) {
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
  let a = _n(n.doc, o, c, H.empty);
  if (!a || a.from != o || a instanceof we && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection($e.create(u.doc, o)), t(u.scrollIntoView());
  }
  return !0;
}
function $t(n, e, t = !1) {
  for (let r = n; r; r = e == "start" ? r.firstChild : r.lastChild) {
    if (r.isTextblock)
      return !0;
    if (t && r.childCount != 1)
      return !1;
  }
  return !1;
}
const Ro = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = zr(r);
  }
  let s = o && o.nodeBefore;
  return !s || !he.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(he.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function zr(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Io(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const $o = (n, e, t) => {
  let r = Io(n, t);
  if (!r)
    return !1;
  let i = Rr(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Bo(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && ($t(o, "start") || he.isSelectable(o))) {
    let s = _n(n.doc, r.before(), r.after(), H.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection($t(o, "start") ? ge.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : he.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Oo = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Rr(r);
  }
  let s = o && o.nodeAfter;
  return !s || !he.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(he.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Rr(n) {
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
const Ac = (n, e) => {
  let t = n.selection, r = t instanceof he, i;
  if (r) {
    if (t.node.isTextblock || !xt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Fn(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(he.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, zc = (n, e) => {
  let t = n.selection, r;
  if (t instanceof he) {
    if (t.node.isTextblock || !xt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Fn(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Rc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Lt(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Do = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function Ir(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const Ic = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = Ir(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(ge.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, Po = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Je || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ir(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection($e.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Lo = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (Qe(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Lt(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function $c(n) {
  return (e, t) => {
    if (e.selection instanceof he && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !Qe(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof $e || e.selection instanceof Je) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        a = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), c = Ir(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(a && c ? { type: c } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = Qe(r.doc, d, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = Qe(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !a && u && i.node(l).type != c) {
      let h = r.mapping.slice(o), p = h.map(i.before(l)), m = r.doc.resolve(p);
      c && i.node(l - 1).canReplaceWith(m.index(), m.index() + 1, c) && r.setNodeMarkup(h.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Oc = $c(), Dc = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(he.create(n.doc, i))), !0);
};
function Pc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || xt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Bo(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && Pc(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, p = A.empty;
      for (let x = s.length - 1; x >= 0; x--)
        p = A.from(s[x].create(null, p));
      p = A.from(i.copy(p));
      let m = n.tr.step(new Ee(e.pos - 1, h, e.pos, h, new H(p, 1, 0), s.length, !0)), y = m.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && xt(m.doc, y.pos) && m.join(y.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : ge.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && Lt(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (a && $t(o, "start", !0) && $t(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = o, y = 1;
    for (; !m.isTextblock; m = m.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (t) {
        let x = A.empty;
        for (let v = p.length - 1; v >= 0; v--)
          x = A.from(p[v].copy(x));
        let w = n.tr.step(new Ee(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new H(x, p.length, 0), 0, !0));
        t(w.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Fo(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection($e.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const Lc = Fo(-1), Bc = Fo(1);
function Fc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && bo(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function hi(n, e = null) {
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
function $r(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
$r(Mo, Ao, Ro);
$r(Mo, $o, Oo);
$r(Do, Po, Lo, Oc);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function _c(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Hc(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Hc(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Mn(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Mn(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = bo(o, t, r, e);
  return l ? (n && Wc(n, e, l, i, t), !0) : !1;
}
function Wc(n, e, t, r, i) {
  let o = A.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = A.from(t[u].type.create(t[u].attrs, o));
  n.step(new Ee(e.start - (r ? 2 : 0), e.end, e.start, e.end, new H(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Qe(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function jc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Jc(e, t, n, o) : qc(e, t, o) : !0 : !1;
  };
}
function Jc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Ee(o - 1, s, o, s, new H(A.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Mn(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Lt(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return xt(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function qc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? A.empty : A.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new Ee(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new H((l ? A.empty : A.from(i.copy(A.empty))).append(c ? A.empty : A.from(i.copy(A.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Kc(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = A.from(a ? n.create() : null), d = new H(A.from(n.create(null, A.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new Ee(f - (a ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
var Vc = Object.defineProperty, Or = (n, e) => {
  for (var t in e)
    Vc(n, t, { get: e[t], enumerable: !0 });
};
function _o(n) {
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
var Yc = class {
  constructor(n) {
    this.editor = n.editor, this.rawCommands = this.editor.extensionManager.commands, this.customState = n.state;
  }
  get hasCustomState() {
    return !!this.customState;
  }
  get state() {
    return this.customState || this.editor.state;
  }
  get commands() {
    const { rawCommands: n, editor: e, state: t } = this, { view: r } = e, { tr: i } = t, o = this.buildProps(i);
    return Object.fromEntries(
      Object.entries(n).map(([s, l]) => [s, (...a) => {
        const u = l(...a)(o);
        return !i.getMeta("preventDispatch") && !this.hasCustomState && r.dispatch(i), u;
      }])
    );
  }
  get chain() {
    return () => this.createChain();
  }
  get can() {
    return () => this.createCan();
  }
  createChain(n, e = !0) {
    const { rawCommands: t, editor: r, state: i } = this, { view: o } = r, s = [], l = !!n, c = n || i.tr, a = () => (!l && e && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c), s.every((d) => d === !0)), u = {
      ...Object.fromEntries(
        Object.entries(t).map(([d, f]) => [d, (...p) => {
          const m = this.buildProps(c, e), y = f(...p)(m);
          return s.push(y), u;
        }])
      ),
      run: a
    };
    return u;
  }
  createCan(n) {
    const { rawCommands: e, state: t } = this, r = !1, i = n || t.tr, o = this.buildProps(i, r);
    return {
      ...Object.fromEntries(
        Object.entries(e).map(([l, c]) => [l, (...a) => c(...a)({ ...o, dispatch: void 0 })])
      ),
      chain: () => this.createChain(i, r)
    };
  }
  buildProps(n, e = !0) {
    const { rawCommands: t, editor: r, state: i } = this, { view: o } = r, s = {
      tr: n,
      editor: r,
      view: o,
      state: _o({
        state: i,
        transaction: n
      }),
      dispatch: e ? () => {
      } : void 0,
      chain: () => this.createChain(n, e),
      can: () => this.createCan(n),
      get commands() {
        return Object.fromEntries(
          Object.entries(t).map(([l, c]) => [l, (...a) => c(...a)(s)])
        );
      }
    };
    return s;
  }
}, Ho = {};
Or(Ho, {
  blur: () => Uc,
  clearContent: () => Xc,
  clearNodes: () => Gc,
  command: () => Qc,
  createParagraphNear: () => Zc,
  cut: () => ea,
  deleteCurrentNode: () => ta,
  deleteNode: () => na,
  deleteRange: () => ra,
  deleteSelection: () => sa,
  enter: () => la,
  exitCode: () => ca,
  extendMarkRange: () => ua,
  first: () => fa,
  focus: () => pa,
  forEach: () => ma,
  insertContent: () => ga,
  insertContentAt: () => ya,
  insertDefaultBlock: () => xa,
  joinBackward: () => va,
  joinDown: () => wa,
  joinForward: () => ka,
  joinItemBackward: () => Sa,
  joinItemForward: () => Ea,
  joinTextblockBackward: () => Ca,
  joinTextblockForward: () => Ta,
  joinUp: () => ba,
  keyboardShortcut: () => Na,
  lift: () => Aa,
  liftEmptyBlock: () => za,
  liftListItem: () => Ra,
  newlineInCode: () => Ia,
  resetAttributes: () => $a,
  scrollIntoView: () => Oa,
  selectAll: () => Da,
  selectNodeBackward: () => Pa,
  selectNodeForward: () => La,
  selectParentNode: () => Ba,
  selectTextblockEnd: () => Fa,
  selectTextblockStart: () => _a,
  setContent: () => Wa,
  setMark: () => eu,
  setMeta: () => tu,
  setNode: () => nu,
  setNodeSelection: () => ru,
  setTextDirection: () => iu,
  setTextSelection: () => ou,
  sinkListItem: () => su,
  splitBlock: () => lu,
  splitListItem: () => cu,
  toggleList: () => uu,
  toggleMark: () => fu,
  toggleNode: () => du,
  toggleWrap: () => hu,
  undoInputRule: () => pu,
  unsetAllMarks: () => mu,
  unsetMark: () => gu,
  unsetTextDirection: () => yu,
  updateAttributes: () => xu,
  updateDecorations: () => vu,
  wrapIn: () => ku,
  wrapInList: () => Su
});
var Uc = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) == null || t.removeAllRanges());
}), !0), Xc = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Gc = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText)
        return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = Lt(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, Qc = (n) => (e) => n(e), Zc = () => ({ state: n, dispatch: e }) => Po(n, e), ea = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Le(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, ta = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1)
    if (i.node(o).type === r.type) {
      if (e) {
        const l = i.before(o), c = i.after(o);
        n.delete(l, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
};
function Ae(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(
        `There is no node type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.nodes[n];
  }
  return n;
}
var na = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Ae(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === i) {
      if (r) {
        const c = o.before(s), a = o.after(s);
        e.delete(c, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, ra = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, ia = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, pi = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end())
    return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return ia(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, oa = (n, e, t) => {
  const r = pi(n, t, "left"), i = pi(e, t, "right");
  return { from: r, to: i };
}, sa = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty)
    return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = oa(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Le.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, la = () => ({ commands: n }) => n.keyboardShortcut("Enter"), ca = () => ({ state: n, dispatch: e }) => Ic(n, e);
function aa(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Rn(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : aa(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Wo(n, e, t = {}) {
  return n.find((r) => r.type === e && Rn(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])),
    t
  ));
}
function mi(n, e, t = {}) {
  return !!Wo(n, e, t);
}
function jo(n, e, t) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e))
    return;
  if (!t) {
    const a = r.node.marks.find((u) => u.type === e);
    a && (t = a.attrs);
  }
  if (!Wo([...r.node.marks], e, t))
    return;
  let o = r.index, s = n.start() + r.offset, l = o + 1, c = s + r.node.nodeSize;
  for (; o > 0 && mi([...n.parent.child(o - 1).marks], e, t); )
    o -= 1, s -= n.parent.child(o).nodeSize;
  for (; l < n.parent.childCount && mi([...n.parent.child(l).marks], e, t); )
    c += n.parent.child(l).nodeSize, l += 1;
  return {
    from: s,
    to: c
  };
}
function ct(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(
        `There is no mark type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.marks[n];
  }
  return n;
}
var ua = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = ct(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = jo(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Le.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, fa = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function Jo(n) {
  return n instanceof Le;
}
function ht(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function da(n, e = null) {
  if (!e)
    return null;
  const t = Tt.atStart(n), r = Tt.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, o = r.to;
  return e === "all" ? Le.create(
    n,
    ht(0, i, o),
    ht(n.content.size, i, o)
  ) : Le.create(
    n,
    ht(e, i, o),
    ht(e, i, o)
  );
}
function gi() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function In() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
    navigator.platform
  ) || // iPad on iOS 13 detection
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function ha() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
var pa = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (In() || gi()) && r.dom.focus(), ha() && !In() && !gi() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1)
      return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !Jo(t.state.selection))
    return s(), !0;
  const l = da(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, ma = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), ga = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt(
  { from: t.selection.from, to: t.selection.to },
  n,
  e
), qo = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && qo(r);
  }
  return n;
};
function mn(n) {
  if (typeof window > "u")
    throw new Error(
      "[tiptap error]: there is no window object available, so this function cannot be used"
    );
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return qo(t);
}
function Ko(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Ot(n, e, t) {
  if (Ko(n))
    return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r)
    try {
      if (Array.isArray(n) && n.length > 0)
        return A.fromArray(n.map((l) => e.nodeFromJSON(l)));
      const s = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && s.check(), s;
    } catch (o) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Ot("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new Xl({
        topNode: e.spec.topNode,
        marks: e.spec.marks,
        // Prosemirror's schemas are executed such that: the last to execute, matches last
        // This means that we can add a catch-all node at the end of the schema to catch any content that we don't know how to handle
        nodes: e.spec.nodes.append({
          __tiptap__private__unknown__catch__all__node: {
            content: "inline*",
            group: "block",
            parseDOM: [
              {
                tag: "*",
                getAttrs: (a) => (s = !0, l = typeof a == "string" ? a : a.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? Nt.fromSchema(c).parseSlice(
        mn(n),
        t.parseOptions
      ) : Nt.fromSchema(c).parse(
        mn(n),
        t.parseOptions
      ), t.errorOnInvalidContent && s)
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error(`Invalid element found: ${l}`)
        });
    }
    const o = Nt.fromSchema(e);
    return t.slice ? o.parseSlice(mn(n), t.parseOptions).content : o.parse(mn(n), t.parseOptions);
  }
  return Ot("", e, t);
}
function Vo(n) {
  return !("type" in n);
}
function Yo(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof we || i instanceof Ee))
    return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Tt.near(n.doc.resolve(s), t));
}
var ya = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
  var s;
  if (i) {
    t = {
      parseOptions: o.options.parseOptions,
      updateSelection: !0,
      applyInputRules: !1,
      applyPasteRules: !1,
      ...t
    };
    let l;
    const c = (y) => {
      o.emit("contentError", {
        editor: o,
        error: y,
        disableCollaboration: () => {
          "collaboration" in o.storage && typeof o.storage.collaboration == "object" && o.storage.collaboration && (o.storage.collaboration.isDisabled = !0);
        }
      });
    }, a = {
      preserveWhitespace: "full",
      ...t.parseOptions
    };
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError)
      try {
        Ot(e, o.schema, {
          parseOptions: a,
          errorOnInvalidContent: !0
        });
      } catch (y) {
        c(y);
      }
    try {
      l = Ot(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) != null ? s : o.options.enableContentCheck
      });
    } catch (y) {
      return c(y), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, f = !0, h = !0;
    const p = Vo(l) ? l.content : [l];
    if (p.forEach((y) => {
      y.check(), f = f ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === d && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, d += 1);
    }
    let m;
    if (f)
      Array.isArray(e) ? m = e.map((y) => y.text || "").join("") : Ko(e) ? m = p.map((y) => {
        var x;
        return (x = y.text) != null ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? m = e.text : m = e, r.insertText(m, u, d);
    else {
      m = A.from(p);
      const y = r.doc.resolve(u), x = y.node(), w = y.parentOffset === 0, v = x.isText || x.isTextblock, k = x.content.size > 0;
      w && v && k && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
    }
    t.updateSelection && Yo(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: u, text: m }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: u, text: m });
  }
  return !0;
};
function Uo(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
var xa = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = Uo(c.parent.contentMatchAt(c.index()));
  if (!a)
    return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let f;
  if (s) {
    const h = Ot(s, r.schema);
    f = a.createAndFill(d, h);
  } else
    f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && Yo(e, e.steps.length - 1, -1)), !0) : !1;
}, ba = () => ({ state: n, dispatch: e }) => Ac(n, e), wa = () => ({ state: n, dispatch: e }) => zc(n, e), va = () => ({ state: n, dispatch: e }) => Ao(n, e), ka = () => ({ state: n, dispatch: e }) => $o(n, e), Sa = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Fn(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Ea = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Fn(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Ca = () => ({ state: n, dispatch: e }) => Mc(n, e), Ta = () => ({ state: n, dispatch: e }) => Nc(n, e);
function Xo() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Ma(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const c = e[l];
    if (/^(cmd|meta|m)$/i.test(c))
      s = !0;
    else if (/^a(lt)?$/i.test(c))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(c))
      i = !0;
    else if (/^s(hift)?$/i.test(c))
      o = !0;
    else if (/^mod$/i.test(c))
      In() || Xo() ? s = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
var Na = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Ma(n).split(/-(?!$)/), s = o.find((a) => !["Alt", "Ctrl", "Meta", "Shift"].includes(a)), l = new KeyboardEvent("keydown", {
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
function Dr(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Ae(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (d, f) => {
    if (d.isText)
      return;
    const h = Math.max(r, f), p = Math.min(i, f + d.nodeSize);
    l.push({
      node: d,
      from: h,
      to: p
    });
  });
  const c = i - r, a = l.filter((d) => s ? s.name === d.node.type.name : !0).filter((d) => Rn(d.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((d, f) => d + f.to - f.from, 0) >= c;
}
var Aa = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ae(n, t.schema);
  return Dr(t, i, e) ? Rc(t, r) : !1;
}, za = () => ({ state: n, dispatch: e }) => Lo(n, e), Ra = (n) => ({ state: e, dispatch: t }) => {
  const r = Ae(n, e.schema);
  return jc(r)(e, t);
}, Ia = () => ({ state: n, dispatch: e }) => Do(n, e);
function Go(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function yi(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
var $a = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Go(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (o = Ae(n, r.schema)), l === "mark" && (s = ct(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, yi(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(
          d,
          d + u.nodeSize,
          s.create(yi(f.attrs, e))
        ));
      });
    });
  }), c;
}, Oa = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Da = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Os(n.doc);
    n.setSelection(t);
  }
  return !0;
}, Pa = () => ({ state: n, dispatch: e }) => Ro(n, e), La = () => ({ state: n, dispatch: e }) => Oo(n, e), Ba = () => ({ state: n, dispatch: e }) => Dc(n, e), Fa = () => ({ state: n, dispatch: e }) => Bc(n, e), _a = () => ({ state: n, dispatch: e }) => Lc(n, e);
function Ha(n, e, t = {}, r = {}) {
  return Ot(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
var Wa = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Ha(n, i.schema, r, {
      errorOnInvalidContent: e ?? i.options.enableContentCheck
    });
    if (s) {
      const u = Vo(a) ? a.content : [a];
      o.replaceWith(0, c.content.size, u).setMeta("preventUpdate", !t);
    }
    return !0;
  }
  return s && o.setMeta("preventUpdate", !t), l.insertContentAt({ from: 0, to: c.content.size }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function ja(n, e) {
  const t = ct(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Ja(n, e) {
  const t = new Ec(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function qa(n, e) {
  for (let t = n.depth; t > 0; t -= 1) {
    const r = n.node(t);
    if (e(r))
      return {
        pos: t > 0 ? n.before(t) : 0,
        start: n.start(t),
        depth: t,
        node: r
      };
  }
}
function Pr(n) {
  return (e) => qa(e.$from, n);
}
function Gt(n, e, t) {
  return n.config[e] === void 0 && n.parent ? Gt(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? Gt(n.parent, e, t) : null
  }) : n.config[e];
}
function Ka(n) {
  return typeof n == "function";
}
function dr(n, e = void 0, ...t) {
  return Ka(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Qo(n) {
  const e = n.filter(
    (i) => i.type === "extension"
  ), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function Va(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (c, a, u, d) => {
    var f;
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
    c.isText && (l += (f = c == null ? void 0 : c.text) == null ? void 0 : f.slice(Math.max(r, a) - a, i - a));
  }), l;
}
function Ya(n) {
  return Object.fromEntries(
    Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText])
  );
}
function Ua(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function Xa(n) {
  const e = Ua(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((o, s) => s !== r).some((o) => t.oldRange.from >= o.oldRange.from && t.oldRange.to <= o.oldRange.to && t.newRange.from >= o.newRange.from && t.newRange.to <= o.newRange.to));
}
function Ga(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, o) => {
    const s = [];
    if (i.ranges.length)
      i.forEach((l, c) => {
        s.push({ from: l, to: c });
      });
    else {
      const { from: l, to: c } = t[o];
      if (l === void 0 || c === void 0)
        return;
      s.push({ from: l, to: c });
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
  }), Xa(r);
}
function bn(n, e, t) {
  return Object.fromEntries(
    Object.entries(t).filter(([r]) => {
      const i = n.find((o) => o.type === e && o.name === r);
      return i ? i.attribute.keepOnSplit : !1;
    })
  );
}
function Qa(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? ct(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => o ? o.name === d.type.name : !0).find((d) => Rn(d.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    n.doc.nodesBetween(h, p, (m, y) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o))
        return !1;
      if (!m.isText && !m.marks.length)
        return;
      const x = Math.max(h, y), w = Math.min(p, y + m.nodeSize), v = w - x;
      s += v, l.push(
        ...m.marks.map((k) => ({
          mark: k,
          from: x,
          to: w
        }))
      );
    });
  }), s === 0)
    return !1;
  const c = l.filter((d) => o ? o.name === d.mark.type.name : !0).filter((d) => Rn(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), a = l.filter((d) => o ? d.mark.type !== o && d.mark.type.excludes(o) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function Zn(n, e) {
  const { nodeExtensions: t } = Qo(e), r = t.find((s) => s.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = dr(Gt(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function Zo(n, {
  checkChildren: e = !0,
  ignoreWhitespace: t = !1
} = {}) {
  var r;
  if (t) {
    if (n.type.name === "hardBreak")
      return !0;
    if (n.isText)
      return !/\S/.test((r = n.text) != null ? r : "");
  }
  if (n.isText)
    return !n.text;
  if (n.isAtom || n.isLeaf)
    return !1;
  if (n.content.childCount === 0)
    return !0;
  if (e) {
    let i = !0;
    return n.content.forEach((o) => {
      i !== !1 && (Zo(o, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function Za(n, e, t) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (Jo(i) && (o = i.$cursor), o) {
    const l = (r = n.storedMarks) != null ? r : o.marks();
    return o.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((a) => a.type.excludes(t)));
  }
  const { ranges: s } = i;
  return s.some(({ $from: l, $to: c }) => {
    let a = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, c.pos, (u, d, f) => {
      if (a)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        a = h && p;
      }
      return !a;
    }), a;
  });
}
var eu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = ct(n, r.schema);
  if (i)
    if (s) {
      const a = ja(r, c);
      t.addStoredMark(
        c.create({
          ...a,
          ...e
        })
      );
    } else
      l.forEach((a) => {
        const u = a.$from.pos, d = a.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((x) => x.type === c) ? f.marks.forEach((x) => {
            c === x.type && t.addMark(
              p,
              m,
              c.create({
                ...x.attrs,
                ...e
              })
            );
          }) : t.addMark(p, m, c.create(e));
        });
      });
  return Za(r, t, c);
}, tu = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), nu = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Ae(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => hi(o, { ...s, ...e })(t) ? !0 : l.clearNodes()).command(({ state: l }) => hi(o, { ...s, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, ru = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = ht(n, 0, r.content.size), o = zt.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, iu = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, ou = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? { from: n, to: n } : n, s = Le.atStart(r).from, l = Le.atEnd(r).to, c = ht(i, s, l), a = ht(o, s, l), u = Le.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, su = (n) => ({ state: e, dispatch: t }) => {
  const r = Ae(n, e.schema);
  return Kc(r)(e, t);
};
function xi(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
var lu = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = bn(
    a,
    l.node().type.name,
    l.node().attrs
  );
  if (o instanceof zt && o.node.isBlock)
    return !l.parentOffset || !Qe(s, l.pos) ? !1 : (r && (n && xi(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : Uo(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = Qe(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && Qe(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (o instanceof Le && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), y = e.doc.resolve(m);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && xi(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, cu = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  var s;
  const l = Ae(n, r.schema), { $from: c, $to: a } = r.selection, u = r.selection.node;
  if (u && u.isBlock || c.depth < 2 || !c.sameParent(a))
    return !1;
  const d = c.node(-1);
  if (d.type !== l)
    return !1;
  const f = o.extensionManager.attributes;
  if (c.parent.content.size === 0 && c.node(-1).childCount === c.indexAfter(-1)) {
    if (c.depth === 2 || c.node(-3).type !== l || c.index(-2) !== c.node(-2).childCount - 1)
      return !1;
    if (i) {
      let x = A.empty;
      const w = c.index(-1) ? 1 : c.index(-2) ? 2 : 3;
      for (let R = c.depth - w; R >= c.depth - 3; R -= 1)
        x = A.from(c.node(R).copy(x));
      const v = (
        // oxlint-disable-next-line no-nested-ternary
        c.indexAfter(-1) < c.node(-2).childCount ? 1 : c.indexAfter(-2) < c.node(-3).childCount ? 2 : 3
      ), k = {
        ...bn(f, c.node().type.name, c.node().attrs),
        ...e
      }, D = ((s = l.contentMatch.defaultType) == null ? void 0 : s.createAndFill(k)) || void 0;
      x = x.append(A.from(l.createAndFill(null, D) || void 0));
      const N = c.before(c.depth - (w - 1));
      t.replace(N, c.after(-v), new H(x, 4 - w, 0));
      let C = -1;
      t.doc.nodesBetween(N, t.doc.content.size, (R, E) => {
        if (C > -1)
          return !1;
        R.isTextblock && R.content.size === 0 && (C = E + 1);
      }), C > -1 && t.setSelection(Le.near(t.doc.resolve(C))), t.scrollIntoView();
    }
    return !0;
  }
  const h = a.pos === c.end() ? d.contentMatchAt(0).defaultType : null, p = {
    ...bn(f, d.type.name, d.attrs),
    ...e
  }, m = {
    ...bn(f, c.node().type.name, c.node().attrs),
    ...e
  };
  t.delete(c.pos, a.pos);
  const y = h ? [
    { type: l, attrs: p },
    { type: h, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!Qe(t.doc, c.pos, 2))
    return !1;
  if (i) {
    const { selection: x, storedMarks: w } = r, { splittableMarks: v } = o.extensionManager, k = w || x.$to.parentOffset && x.$from.marks();
    if (t.split(c.pos, 2, y).scrollIntoView(), !k || !i)
      return !0;
    const D = k.filter((N) => v.includes(N.type.name));
    t.ensureMarks(D);
  }
  return !0;
};
function bi(n) {
  return !n || n === "1" ? null : n;
}
function es(n, e) {
  return bi(n) === bi(e);
}
var er = (n, e) => {
  const t = Pr((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && xt(n.doc, t.pos)) || !es(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, tr = (n, e) => {
  const t = Pr((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && xt(n.doc, r)) || !es(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function au(n) {
  const e = n.doc, t = e.firstChild;
  if (!t)
    return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Le.between(r, i);
}
var uu = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Ae(n, s.schema), p = Ae(e, s.schema), { selection: m, storedMarks: y } = s, { $from: x, $to: w } = m, v = x.blockRange(w), k = y || m.$to.parentOffset && m.$from.marks();
  if (!v)
    return !1;
  const D = Pr(($) => Zn($.type.name, d))(m), N = m.from === 0 && m.to === s.doc.content.size, C = s.doc.content.content, R = C.length === 1 ? C[0] : null, E = N && R && Zn(R.type.name, d) ? {
    node: R,
    pos: 0
  } : null, q = D ?? E, I = !!D && v.depth >= 1 && v.depth - D.depth <= 1, W = !!E;
  if ((I || W) && q) {
    if (q.node.type === h)
      return N && W ? c().command(({ tr: $, dispatch: P }) => {
        const L = au($);
        return L ? ($.setSelection(L), P && P($), !0) : !1;
      }).liftListItem(p).run() : a.liftListItem(p);
    if (Zn(q.node.type.name, d) && h.validContent(q.node.content))
      return c().command(() => (o.setNodeMarkup(q.pos, h), !0)).command(() => er(o, h)).command(() => tr(o, h)).run();
  }
  return !t || !k || !l ? c().command(() => u().wrapInList(h, r) ? !0 : a.clearNodes()).wrapInList(h, r).command(() => er(o, h)).command(() => tr(o, h)).run() : c().command(() => {
    const $ = u().wrapInList(h, r), P = k.filter((L) => f.includes(L.type.name));
    return o.ensureMarks(P), $ ? !0 : a.clearNodes();
  }).wrapInList(h, r).command(() => er(o, h)).command(() => tr(o, h)).run();
}, fu = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = ct(n, r.schema);
  return Qa(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, du = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Ae(n, r.schema), s = Ae(e, r.schema), l = Dr(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, { ...c, ...t });
}, hu = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Ae(n, t.schema);
  return Dr(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, pu = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(n))) {
      if (e) {
        const s = n.tr, l = o.transform;
        for (let c = l.steps.length - 1; c >= 0; c -= 1)
          s.step(l.steps[c].invert(l.docs[c]));
        if (o.text) {
          const c = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, n.schema.text(o.text, c));
        } else
          s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, mu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s)
    return !0;
  const { nonClearableMarks: c } = r.extensionManager;
  if (t) {
    const a = Object.values(r.schema.marks).filter(
      (u) => i || !c.includes(u.name)
    );
    l.forEach((u) => {
      for (const d of a)
        e.removeMark(u.$from.pos, u.$to.pos, d);
    });
  }
  return !0;
}, gu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: s = !1 } = e, { selection: l } = t, c = ct(n, r.schema), { $from: a, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && s) {
    let { from: f, to: h } = l;
    const p = (o = a.marks().find((y) => y.type === c)) == null ? void 0 : o.attrs, m = jo(a, c, p);
    m && (f = m.from, h = m.to), t.removeMark(f, h, c);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, c);
    });
  return t.removeStoredMark(c), !0;
}, yu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText)
      return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, xu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Go(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (o = Ae(n, r.schema)), l === "mark" && (s = ct(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    const u = a.$from.pos, d = a.$to.pos;
    let f, h, p, m;
    t.selection.empty ? r.doc.nodesBetween(u, d, (y, x) => {
      o && o === y.type && (c = !0, p = Math.max(x, u), m = Math.min(x + y.nodeSize, d), f = x, h = y);
    }) : r.doc.nodesBetween(u, d, (y, x) => {
      x < u && o && o === y.type && (c = !0, p = Math.max(x, u), m = Math.min(x + y.nodeSize, d), f = x, h = y), x >= u && x <= d && (o && o === y.type && (c = !0, i && t.setNodeMarkup(x, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((w) => {
        if (s === w.type && (c = !0, i)) {
          const v = Math.max(x, u), k = Math.min(x + y.nodeSize, d);
          t.addMark(
            v,
            k,
            s.create({
              ...w.attrs,
              ...e
            })
          );
        }
      }));
    }), h && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((y) => {
      s === y.type && i && t.addMark(
        p,
        m,
        s.create({
          ...y.attrs,
          ...e
        })
      );
    }));
  }), c;
}, bu = "__tiptap_decorations__", wu = new qe(
  bu
), vu = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(wu, { type: "force", name: n }), !0), ku = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ae(n, t.schema);
  return Fc(i, e)(t, r);
}, Su = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ae(n, t.schema);
  return _c(i, e)(t, r);
};
typeof process < "u" && process.env.NODE_ENV;
function Eu(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function gn(n) {
  return Eu(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
var Cu = {};
Or(Cu, {
  createAtomBlockMarkdownSpec: () => Tu,
  createBlockMarkdownSpec: () => Mu,
  createInlineMarkdownSpec: () => zu,
  parseAttributes: () => Lr,
  parseIndentedBlocks: () => Ru,
  renderNestedMarkdownContent: () => Iu,
  serializeAttributes: () => Br
});
function Lr(n) {
  if (!(n != null && n.trim()))
    return {};
  const e = {}, t = [], r = n.replace(/["']([^"']*)["']/g, (a) => (t.push(a), `__QUOTED_${t.length - 1}__`)), i = r.match(/(?:^|\s)\.([\w-]+)/g);
  if (i) {
    const a = i.map((u) => u.trim().slice(1));
    e.class = a.join(" ");
  }
  const o = r.match(/(?:^|\s)#([\w-]+)/);
  o && (e.id = o[1]);
  const s = /([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g;
  Array.from(r.matchAll(s)).forEach(([, a, u]) => {
    var d;
    const f = parseInt(((d = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : d[1]) || "0", 10), h = t[f];
    h && (e[a] = h.slice(1, -1));
  });
  const c = r.replace(/(?:^|\s)\.([\w-]+)/g, "").replace(/(?:^|\s)#([\w-]+)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return c && c.split(/\s+/).filter(Boolean).forEach((u) => {
    u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
  }), e;
}
function Br(n) {
  if (!n || Object.keys(n).length === 0)
    return "";
  const e = [];
  return n.class && String(n.class).split(/\s+/).filter(Boolean).forEach((r) => e.push(`.${r}`)), n.id && e.push(`#${n.id}`), Object.entries(n).forEach(([t, r]) => {
    t === "class" || t === "id" || (r === !0 ? e.push(t) : r !== !1 && r != null && e.push(`${t}="${String(r)}"`));
  }), e.join(" ");
}
function Tu(n) {
  const {
    nodeName: e,
    name: t,
    parseAttributes: r = Lr,
    serializeAttributes: i = Br,
    defaultAttributes: o = {},
    requiredAttributes: s = [],
    allowedAttributes: l
  } = n, c = t || e, a = (u) => {
    if (!l)
      return u;
    const d = {};
    return l.forEach((f) => {
      f in u && (d[f] = u[f]);
    }), d;
  };
  return {
    parseMarkdown: (u, d) => {
      const f = { ...o, ...u.attributes };
      return d.createNode(e, f, []);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(u) {
        var d;
        const f = new RegExp(`^:::${c}(?:\\s|$)`, "m"), h = (d = u.match(f)) == null ? void 0 : d.index;
        return h !== void 0 ? h : -1;
      },
      tokenize(u, d, f) {
        const h = new RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), p = u.match(h);
        if (!p)
          return;
        const m = p[1] || "", y = r(m);
        if (!s.find((w) => !(w in y)))
          return {
            type: e,
            raw: p[0],
            attributes: y
          };
      }
    },
    renderMarkdown: (u) => {
      const d = a(u.attrs || {}), f = i(d), h = f ? ` {${f}}` : "";
      return `:::${c}${h} :::`;
    }
  };
}
function Mu(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: i = Lr,
    serializeAttributes: o = Br,
    defaultAttributes: s = {},
    content: l = "block",
    allowedAttributes: c
  } = n, a = t || e, u = (d) => {
    if (!c)
      return d;
    const f = {};
    return c.forEach((h) => {
      h in d && (f[h] = d[h]);
    }), f;
  };
  return {
    parseMarkdown: (d, f) => {
      let h;
      if (r) {
        const m = r(d);
        h = typeof m == "string" ? [{ type: "text", text: m }] : m;
      } else l === "block" ? h = f.parseChildren(d.tokens || []) : h = f.parseInline(d.tokens || []);
      const p = { ...s, ...d.attributes };
      return f.createNode(e, p, h);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(d) {
        var f;
        const h = new RegExp(`^:::${a}`, "m"), p = (f = d.match(h)) == null ? void 0 : f.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(d, f, h) {
        var p;
        const m = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), y = d.match(m);
        if (!y)
          return;
        const [x, w = ""] = y, v = i(w);
        let k = 1;
        const D = x.length;
        let N = "";
        const C = /^:::([\w-]*)(\s.*)?/gm, R = d.slice(D);
        for (C.lastIndex = 0; ; ) {
          const E = C.exec(R);
          if (E === null)
            break;
          const q = E.index, I = E[1];
          if (!((p = E[2]) != null && p.endsWith(":::"))) {
            if (I)
              k += 1;
            else if (k -= 1, k === 0) {
              const W = R.slice(0, q);
              N = W.trim();
              const $ = d.slice(0, D + q + E[0].length);
              let P = [];
              if (N)
                if (l === "block")
                  for (P = h.blockTokens(W), P.forEach((L) => {
                    L.text && (!L.tokens || L.tokens.length === 0) && (L.tokens = h.inlineTokens(L.text));
                  }); P.length > 0; ) {
                    const L = P[P.length - 1];
                    if (L.type === "paragraph" && (!L.text || L.text.trim() === ""))
                      P.pop();
                    else
                      break;
                  }
                else
                  P = h.inlineTokens(N);
              return {
                type: e,
                raw: $,
                attributes: v,
                content: N,
                tokens: P
              };
            }
          }
        }
      }
    },
    renderMarkdown: (d, f) => {
      const h = u(d.attrs || {}), p = o(h), m = p ? ` {${p}}` : "", y = f.renderChildren(d.content || [], `

`);
      return `:::${a}${m}

${y}

:::`;
    }
  };
}
function Nu(n) {
  if (!n.trim())
    return {};
  const e = {}, t = /(\w+)=(?:"([^"]*)"|'([^']*)')/g;
  let r = t.exec(n);
  for (; r !== null; ) {
    const [, i, o, s] = r;
    e[i] = o || s, r = t.exec(n);
  }
  return e;
}
function Au(n) {
  return Object.entries(n).filter(([, e]) => e != null).map(([e, t]) => `${e}="${t}"`).join(" ");
}
function zu(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: i = Nu,
    serializeAttributes: o = Au,
    defaultAttributes: s = {},
    selfClosing: l = !1,
    allowedAttributes: c
  } = n, a = t || e, u = (f) => {
    if (!c)
      return f;
    const h = {};
    return c.forEach((p) => {
      const m = typeof p == "string" ? p : p.name, y = typeof p == "string" ? void 0 : p.skipIfDefault;
      if (m in f) {
        const x = f[m];
        if (y !== void 0 && x === y)
          return;
        h[m] = x;
      }
    }), h;
  }, d = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    parseMarkdown: (f, h) => {
      const p = { ...s, ...f.attributes };
      if (l)
        return h.createNode(e, p);
      const m = r ? r(f) : f.content || "";
      return m ? h.createNode(e, p, [h.createTextNode(m)]) : h.createNode(e, p, []);
    },
    markdownTokenizer: {
      name: e,
      level: "inline",
      start(f) {
        const h = l ? new RegExp(`\\[${d}\\s*[^\\]]*\\]`) : new RegExp(`\\[${d}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${d}\\]`), p = f.match(h), m = p == null ? void 0 : p.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(f, h, p) {
        const m = l ? new RegExp(`^\\[${d}\\s*([^\\]]*)\\]`) : new RegExp(
          `^\\[${d}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${d}\\]`
        ), y = f.match(m);
        if (!y)
          return;
        let x = "", w = "";
        if (l) {
          const [, k] = y;
          w = k;
        } else {
          const [, k, D] = y;
          w = k, x = D || "";
        }
        const v = i(w.trim());
        return {
          type: e,
          raw: y[0],
          content: x.trim(),
          attributes: v
        };
      }
    },
    renderMarkdown: (f) => {
      let h = "";
      r ? h = r(f) : f.content && f.content.length > 0 && (h = f.content.filter((x) => x.type === "text").map((x) => x.text).join(""));
      const p = u(f.attrs || {}), m = o(p), y = m ? ` ${m}` : "";
      return l ? `[${a}${y}]` : `[${a}${y}]${h}[/${a}]`;
    }
  };
}
function Ru(n, e, t) {
  var r, i, o, s;
  const l = n.split(`
`), c = [];
  let a = "", u = 0;
  const d = e.baseIndentSize || 2;
  for (; u < l.length; ) {
    const f = l[u], h = f.match(e.itemPattern);
    if (!h) {
      if (c.length > 0)
        break;
      if (f.trim() === "") {
        u += 1, a = `${a}${f}
`;
        continue;
      } else
        return;
    }
    const p = e.extractItemData(h), { indentLevel: m, mainContent: y } = p;
    a = `${a}${f}
`;
    const x = [y];
    for (u += 1; u < l.length; ) {
      const D = l[u];
      if (D.trim() === "") {
        const C = l.slice(u + 1).findIndex((q) => q.trim() !== "");
        if (C === -1)
          break;
        if ((((i = (r = l[u + 1 + C].match(/^(\s*)/)) == null ? void 0 : r[1]) == null ? void 0 : i.length) || 0) > m) {
          x.push(D), a = `${a}${D}
`, u += 1;
          continue;
        } else
          break;
      }
      if ((((s = (o = D.match(/^(\s*)/)) == null ? void 0 : o[1]) == null ? void 0 : s.length) || 0) > m)
        x.push(D), a = `${a}${D}
`, u += 1;
      else
        break;
    }
    let w;
    const v = x.slice(1);
    if (v.length > 0) {
      const D = v.map((N) => N.slice(m + d)).join(`
`);
      D.trim() && (e.customNestedParser ? w = e.customNestedParser(D) : w = t.blockTokens(D));
    }
    const k = e.createToken(p, w);
    c.push(k);
  }
  if (c.length !== 0)
    return {
      items: c,
      raw: a
    };
}
function Iu(n, e, t, r) {
  if (!n || !Array.isArray(n.content))
    return "";
  const i = typeof t == "function" ? t(r) : t, [o, ...s] = n.content, l = e.renderChildren([o]);
  let c = `${i}${l}`;
  return s && s.length > 0 && s.forEach((a, u) => {
    var d, f;
    const h = (f = (d = e.renderChild) == null ? void 0 : d.call(e, a, u + 1)) != null ? f : e.renderChildren([a]);
    if (h != null) {
      const p = h.split(`
`).map((m) => m ? e.indent(m) : e.indent("")).join(`
`);
      c += a.type === "paragraph" ? `

${p}` : `
${p}`;
    }
  }), c;
}
function ts(n, e) {
  const t = { ...n };
  return gn(n) && gn(e) && Object.keys(e).forEach((r) => {
    gn(e[r]) && gn(n[r]) ? t[r] = ts(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var ns = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = {
      name: this.name
    }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return {
      ...dr(
        Gt(this, "addOptions", {
          name: this.name
        })
      )
    };
  }
  get storage() {
    return {
      ...dr(
        Gt(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      )
    };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => ts(this.options, n)
    });
    return e.name = this.name, e.parent = this.parent, this.child = null, e;
  }
  extend(n = {}) {
    const e = new this.constructor({ ...this.config, ...n });
    return e.parent = this, this.child = e, e.name = "name" in n ? n.name : e.parent.name, e;
  }
}, $u = class rs extends ns {
  constructor() {
    super(...arguments), this.type = "mark";
  }
  /**
   * Create a new Mark instance
   * @param config - Mark configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new rs(t);
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const s = i.marks();
      if (!!!s.find((a) => (a == null ? void 0 : a.type.name) === t.name))
        return !1;
      const c = s.find((a) => (a == null ? void 0 : a.type.name) === t.name);
      return c && r.removeStoredMark(c), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
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
}, Ou = {};
Or(Ou, {
  ClipboardTextSerializer: () => Du,
  Commands: () => Pu,
  Delete: () => Lu,
  Drop: () => Bu,
  Editable: () => Fu,
  FocusEvents: () => _u,
  Keymap: () => Hu,
  Paste: () => Wu,
  Tabindex: () => ju,
  TextDirection: () => Ju,
  focusEventsPluginKey: () => ss
});
var Be = class is extends ns {
  constructor() {
    super(...arguments), this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new is(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, Du = Be.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new Ze({
        key: new qe("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Ya(t), { blockSeparator: s } = this.options, l = {
              ...s !== void 0 ? { blockSeparator: s } : {},
              textSerializers: o
            };
            return [...i.ranges].sort((a, u) => a.$from.pos - u.$from.pos).map(
              ({ $from: a, $to: u }) => Va(r, { from: a.pos, to: u.pos }, l)
            ).join(s ?? `

`);
          }
        }
      })
    ];
  }
}), Pu = Be.create({
  name: "commands",
  addCommands() {
    return {
      ...Ho
    };
  }
}), Lu = Be.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r, i;
    const o = () => {
      var s, l, c, a;
      if ((a = (c = (l = (s = this.editor.options.coreExtensionOptions) == null ? void 0 : s.delete) == null ? void 0 : l.filterTransaction) == null ? void 0 : c.call(l, n)) != null ? a : n.getMeta("y-sync$"))
        return;
      const u = Ja(n.before, [
        n,
        ...e
      ]);
      Ga(u).forEach((h) => {
        u.mapping.mapResult(h.oldRange.from).deletedAfter && u.mapping.mapResult(h.oldRange.to).deletedBefore && u.before.nodesBetween(
          h.oldRange.from,
          h.oldRange.to,
          (p, m) => {
            const y = m + p.nodeSize - 2, x = h.oldRange.from <= m && y <= h.oldRange.to;
            this.editor.emit("delete", {
              type: "node",
              node: p,
              from: m,
              to: y,
              newFrom: u.mapping.map(m),
              newTo: u.mapping.map(y),
              deletedRange: h.oldRange,
              newRange: h.newRange,
              partial: !x,
              editor: this.editor,
              transaction: n,
              combinedTransform: u
            });
          }
        );
      });
      const f = u.mapping;
      u.steps.forEach((h, p) => {
        var m, y;
        if (h instanceof je) {
          const x = f.slice(p).map(h.from, -1), w = f.slice(p).map(h.to), v = f.invert().map(x, -1), k = f.invert().map(w), D = x > 0 ? (m = u.doc.nodeAt(x - 1)) == null ? void 0 : m.marks.some((C) => C.eq(h.mark)) : !1, N = (y = u.doc.nodeAt(w)) == null ? void 0 : y.marks.some((C) => C.eq(h.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: h.mark,
            from: h.from,
            to: h.to,
            deletedRange: {
              from: v,
              to: k
            },
            newRange: {
              from: x,
              to: w
            },
            partial: !!(N || D),
            editor: this.editor,
            transaction: n,
            combinedTransform: u
          });
        }
      });
    };
    (i = (r = (t = this.editor.options.coreExtensionOptions) == null ? void 0 : t.delete) == null ? void 0 : r.async) == null || i ? setTimeout(o, 0) : o();
  }
}), Bu = Be.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new Ze({
        key: new qe("tiptapDrop"),
        props: {
          handleDrop: (n, e, t, r) => {
            this.editor.emit("drop", {
              editor: this.editor,
              event: e,
              slice: t,
              moved: r
            });
          }
        }
      })
    ];
  }
}), Fu = Be.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new Ze({
        key: new qe("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), ss = new qe("focusEvents"), _u = Be.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new Ze({
        key: ss,
        props: {
          handleDOMEvents: {
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
          }
        }
      })
    ];
  }
}), Hu = Be.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      // maybe convert first text block node to default node
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, y = d.pos - d.parentOffset, x = m && p.parent.childCount === 1 ? y === d.pos : Tt.atStart(a).from === f;
        return !u || !h.type.isTextblock || h.textContent.length || !x || x && d.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    }, i = {
      ...r
    }, o = {
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
    return In() || Xo() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new Ze({
        key: new qe("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (n.some((m) => m.getMeta("composition")))
            return;
          const r = n.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = n.some(
            (m) => m.getMeta("preventClearDocument")
          );
          if (!r || i)
            return;
          const { empty: o, from: s, to: l } = e.selection, c = Tt.atStart(e.doc).from, a = Tt.atEnd(e.doc).to;
          if (o || !(s === c && l === a) || !Zo(t.doc))
            return;
          const f = t.tr, h = _o({
            state: t,
            transaction: f
          }), { commands: p } = new Yc({
            editor: this.editor,
            state: h
          });
          if (p.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), Wu = Be.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new Ze({
        key: new qe("tiptapPaste"),
        props: {
          handlePaste: (n, e, t) => {
            this.editor.emit("paste", {
              editor: this.editor,
              event: e,
              slice: t
            });
          }
        }
      })
    ];
  }
}), ju = Be.create({
  name: "tabindex",
  addOptions() {
    return {
      value: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new Ze({
        key: new qe("tabindex"),
        props: {
          attributes: () => {
            var n;
            return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) != null ? n : "0" };
          }
        }
      })
    ];
  }
}), Ju = Be.create({
  name: "textDirection",
  addOptions() {
    return {
      direction: void 0
    };
  },
  addGlobalAttributes() {
    if (!this.options.direction)
      return [];
    const { nodeExtensions: n } = Qo(this.extensions);
    return [
      {
        types: n.filter((e) => e.name !== "text").map((e) => e.name),
        attributes: {
          dir: {
            default: this.options.direction,
            parseHTML: (e) => {
              const t = e.getAttribute("dir");
              return t && (t === "ltr" || t === "rtl" || t === "auto") ? t : this.options.direction;
            },
            renderHTML: (e) => e.dir ? {
              dir: e.dir
            } : {}
          }
        }
      }
    ];
  },
  addProseMirrorPlugins() {
    return [
      new Ze({
        key: new qe("textDirection"),
        props: {
          attributes: () => {
            const n = this.options.direction;
            return n ? {
              dir: n
            } : {};
          }
        }
      })
    ];
  }
});
const qu = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Ku = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Vu = /^(https?:\/\/|mailto:)/i;
function Yu(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    Ku.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function hr(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(hr(c));
    return l;
  };
  if (!qu.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Vu.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Yu(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(hr(l));
  return i;
}
function ls(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Uu(n) {
  const e = ls(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(hr(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function dd(n) {
  const e = ls(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function hd(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Xu(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function wi(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const Gu = { text: "#52525b" }, Qu = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? Gu, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ g(
    Rs,
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
      onMouseDown: (h) => {
        var x;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof o == "function" ? o() : null;
        if (p == null) return;
        const m = i.state.doc.resolve(p), y = m.nodeAfter;
        y && zt.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new zt(m))), (x = l.onTokenClick) == null || x.call(l, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: d ? /* @__PURE__ */ g("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, Zu = qs.extend({
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
    return zs(Qu);
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
    return ["span", As({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), ef = 240, tf = 280, nf = ({ props: n, onApi: e }) => {
  const t = Dn(), r = S(e);
  r.current = e, Z(() => {
    r.current(t);
  }, [t]);
  const i = S(null);
  Z(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), Z(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = vr();
  return /* @__PURE__ */ g(tn.Provider, { value: t, children: /* @__PURE__ */ g(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: tf, maxHeight: ef },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ g("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ g(
        rf,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, rf = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Wi({
    label: () => n.label,
    activate: t
  }), s = ke(), l = { padding: `${z(8, 12, s)}px ${z(12, 16, s)}px`, fontSize: z(12, 14, s) };
  return /* @__PURE__ */ O(
    "div",
    {
      role: "option",
      style: l,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${e.itemDefault} ${i ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: t,
      children: [
        /* @__PURE__ */ g("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ g("span", { className: "block w-2 h-2 rounded-full", style: { background: n.color.text } }) }),
        /* @__PURE__ */ g("span", { className: "flex-1 truncate", children: n.label }),
        n.group && /* @__PURE__ */ g("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: n.color.text }, children: n.group })
      ]
    }
  );
}, vi = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ g(nf, { props: r, onApi: (i) => {
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
      const o = Ks(i);
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
}, of = $u.create({
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
}), wn = new qe("retainedSelectionHighlight"), sf = Be.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new Ze({
        key: wn,
        state: {
          init: () => ({ held: !1, decorations: ln.empty }),
          apply(n, e) {
            const t = n.getMeta(wn), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: ln.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? ln.empty : ln.create(n.doc, [Ds.inline(i, o, { class: "rt-retained-selection" })])
            };
          }
        },
        props: {
          decorations(n) {
            var e;
            return (e = wn.getState(n)) == null ? void 0 : e.decorations;
          }
        }
      })
    ];
  }
}), pd = {
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
function cs(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function lf(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = cs(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const cf = He.forwardRef(({
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
  const f = S(s);
  f.current = s;
  const h = S(l);
  h.current = l;
  const p = S(c);
  p.current = c;
  const m = S(a);
  m.current = a;
  const y = S(u);
  y.current = u;
  const x = S(null), w = S(null), v = S(e);
  v.current = e;
  const k = S(r);
  k.current = r;
  const D = S(o);
  D.current = o;
  const N = S(null), C = (W) => {
    var U;
    const $ = W.getAttributes("textStyle"), P = W.getAttributes("reportTextStyle"), { from: L, to: T, empty: J } = W.state.selection;
    let ne = !1, xe = !1, re = !1;
    if (!J) {
      const Y = /* @__PURE__ */ new Set(), M = /* @__PURE__ */ new Set(), Q = /* @__PURE__ */ new Set();
      W.state.doc.nodesBetween(L, T, (K) => {
        if (!K.isText) return;
        const pe = K.marks.find((ee) => ee.type.name === "textStyle");
        Y.add((pe == null ? void 0 : pe.attrs.fontFamily) || ""), M.add((pe == null ? void 0 : pe.attrs.fontSize) || "");
        const _ = K.marks.find((ee) => ee.type.name === "reportTextStyle");
        Q.add((_ == null ? void 0 : _.attrs.styleId) || "");
      }), ne = Y.size > 1, xe = M.size > 1, re = Q.size > 1;
    }
    const te = {
      bold: W.isActive("bold"),
      italic: W.isActive("italic"),
      underline: W.isActive("underline"),
      strike: W.isActive("strike"),
      link: W.isActive("link"),
      color: $.color || "",
      fontFamily: $.fontFamily || "",
      fontSize: $.fontSize || "",
      textStyle: P.styleId || "",
      hasSelection: !J,
      fontFamilyMixed: ne,
      fontSizeMixed: xe,
      textStyleMixed: re
    }, B = N.current;
    B && B.bold === te.bold && B.italic === te.italic && B.underline === te.underline && B.strike === te.strike && B.link === te.link && B.color === te.color && B.fontFamily === te.fontFamily && B.fontSize === te.fontSize && B.textStyle === te.textStyle && B.hasSelection === te.hasSelection && B.fontFamilyMixed === te.fontFamilyMixed && B.fontSizeMixed === te.fontSizeMixed && B.textStyleMixed === te.textStyleMixed || (N.current = te, (U = D.current) == null || U.call(D, te));
  }, R = (W) => {
    var J;
    const $ = W.state.selection;
    let P = null;
    $ instanceof zt && $.node.type.name === "token" ? (P = { key: $.node.attrs.field ?? "", pos: $.from }, x.current = $.from) : x.current != null && (x.current = W.state.tr.mapping.map(x.current));
    const L = w.current, T = L && P && L.key === P.key && L.pos === P.pos;
    !L && !P || T || (w.current = P, (J = y.current) == null || J.call(y, P));
  }, E = (W) => {
    const $ = Uu(Xu(W));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test($) ? "" : $;
  }, q = He.useMemo(() => {
    const W = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: L }) => {
        var T;
        return ((T = h.current) == null ? void 0 : T.call(h, L)) ?? [];
      },
      command: ({ editor: L, range: T, props: J }) => {
        L.chain().focus().insertContentAt(T, { type: "token", attrs: { field: J.field } }).run();
      },
      render: vi
    }, $ = Zu.configure({
      resolve: f.current ?? null,
      suggestion: W,
      onTokenClick: (L, T, J) => {
        var ne;
        x.current = J, (ne = m.current) == null || ne.call(m, L, T, J);
      }
    }), P = Be.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Js({
            pluginKey: new qe("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: L, range: T }) => cs(L, T.from) != null,
            items: ({ editor: L, query: T }) => {
              var ne;
              const J = lf(L);
              return J ? ((ne = p.current) == null ? void 0 : ne.call(p, J.chipKey, T)) ?? [] : [];
            },
            command: ({ editor: L, range: T, props: J }) => {
              L.chain().focus().insertContentAt(T, { type: "token", attrs: { field: J.field } }).run();
            },
            render: vi
          })
        ];
      }
    });
    return [$, P];
  }, []), I = Is({
    immediatelyRender: !1,
    extensions: [
      Ps,
      Ls.configure({ placeholder: t }),
      Bs,
      Fs,
      _s,
      of,
      sf,
      Hs,
      js,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Ws.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...q
    ],
    content: wi(n || ""),
    editable: !r,
    onUpdate: ({ editor: W }) => {
      v.current(E(W.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: W }) => {
      C(W), R(W);
    }
  });
  return Z(() => {
    if (!I || I.isFocused) return;
    E(I.getHTML()) !== n && (N.current = null, I.commands.setContent(wi(n || ""), { emitUpdate: !1 }), C(I));
  }, [n, I]), Z(() => {
    I && I.setEditable(!r);
  }, [r, I]), Z(() => {
    I && (N.current = null, C(I), R(I));
  }, [I]), hs(d, () => ({
    exec: (W, $, P) => {
      if (!I || k.current) return;
      const L = I.chain(), T = (P == null ? void 0 : P.focus) === !1 ? L : L.focus();
      switch (W) {
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
          $ && T.setColor($).run();
          break;
        case "unsetColor":
          T.unsetColor().run();
          break;
        case "fontFamily":
          $ && T.setFontFamily($).run();
          break;
        case "unsetFontFamily":
          T.unsetFontFamily().run();
          break;
        case "fontSize":
          $ && T.setFontSize($).run();
          break;
        case "unsetFontSize":
          T.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          $ && T.setMark("reportTextStyle", { styleId: $ }).unsetFontFamily().unsetFontSize().run();
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
          $ && T.extendMarkRange("link").setLink({ href: $ }).run();
          break;
        case "unlink":
          T.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (W) => I == null ? void 0 : I.commands.focus(W),
    insertToken: (W) => {
      !I || k.current || I.chain().focus().insertContent({ type: "token", attrs: { field: W } }).run();
    },
    replaceToken: (W) => {
      if (!I || k.current) return;
      const $ = x.current;
      $ != null && I.commands.command(({ tr: P }) => {
        const L = P.doc.nodeAt($);
        if (!L || L.type.name !== "token") return !1;
        P.setNodeMarkup($, void 0, { field: W });
        const T = P.doc.resolve($);
        return T.nodeAfter && T.nodeAfter.type.name === "token" && P.setSelection(new zt(T)), !0;
      });
    },
    holdSelectionHighlight: (W) => {
      !I || I.isDestroyed || I.view.dispatch(I.state.tr.setMeta(wn, { held: W }));
    }
  }), [I]), /* @__PURE__ */ g($s, { editor: I, className: `richtext-editor ${i || ""}` });
});
cf.displayName = "RichTextEditor";
const af = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], uf = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], ki = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ g("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ g("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), ff = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = G(!1);
  return /* @__PURE__ */ g(
    Pn,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ O("button", { type: "button", disabled: e, className: `${zl} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ g("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ g("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ g($n, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: af.map((s) => /* @__PURE__ */ g(ol, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ g(Ei, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ g("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, df = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = G(!1), o = Ln(), [s, l] = G(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ g(
    Pn,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ g(
        Ue,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ g(Ss, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ O("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ g(
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
            className: Nl + " w-full"
          }
        ),
        /* @__PURE__ */ O("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ g(Ue, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ g(
            Ue,
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
}, md = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = G(!1), d = (y, x) => {
    var w;
    return (w = n.current) == null ? void 0 : w.exec(y, x);
  }, f = Ln(), h = (y) => !!(r != null && r[y]), p = "flex items-center gap-1 shrink-0", m = c ? /* @__PURE__ */ g("div", { className: Yi }) : null;
  return /* @__PURE__ */ O("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ O("div", { className: p, children: [
      /* @__PURE__ */ g(St, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ g(Ue, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ g(St, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ g(Ue, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ g(St, { content: "Underline", children: /* @__PURE__ */ g(Ue, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ g(ws, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ g(St, { content: "Strikethrough", children: /* @__PURE__ */ g(Ue, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ g(vs, { className: "w-3 h-3" }) }) })
    ] }),
    m,
    /* @__PURE__ */ g("div", { className: p, children: /* @__PURE__ */ g(df, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    m,
    /* @__PURE__ */ g("div", { className: p, children: /* @__PURE__ */ g(
      Pn,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ O(Ue, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ g("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ g(ki, {}),
          /* @__PURE__ */ g($n, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ O("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ g(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ g(ki, { className: "w-3.5 h-3.5" })
            }
          ),
          uf.map((y) => /* @__PURE__ */ g(
            "button",
            {
              onClick: () => {
                d("foreColor", y), u(!1);
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
    (o || s || l) && /* @__PURE__ */ O(lt, { children: [
      m,
      /* @__PURE__ */ O("div", { className: p, children: [
        o && /* @__PURE__ */ g(ff, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ g(St, { content: "Clear formatting", children: /* @__PURE__ */ g(
          Ue,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ g(ks, { className: "w-3 h-3" })
          }
        ) })
      ] })
    ] }),
    i && /* @__PURE__ */ O(lt, { children: [
      m,
      /* @__PURE__ */ g("div", { className: p, children: i })
    ] })
  ] });
};
function Fr(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function hf(n, e, t, r, i) {
  return Fr(n + e * i, t, r);
}
const pf = 2;
function mf(n, e, t, r, i) {
  return Fr(n + Math.trunc(e / pf) * i, t, r);
}
const gf = 3;
function gd({
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
  const [h, p] = G(null), [m, y] = G(!1), x = S(!1), w = S(null), v = S(null), k = S(null), D = ke(), N = Ki(), C = a === void 0;
  Z(() => () => {
    var T;
    return (T = w.current) == null ? void 0 : T.call(w);
  }, []), We(() => {
    const T = k.current, J = v.current;
    !C && T && J && (J.style.color = getComputedStyle(T).color);
  }, [C, a]), Z(() => {
    x.current || p(null);
  }, [n]);
  const R = n ?? r, E = h !== null ? h : n != null ? String(n) : d ? "" : String(r), q = (T) => Fr(T, e, t), I = (T) => {
    const J = hf(R, T, e, t, o);
    J !== R && (x.current && p(String(J)), i(J));
  }, W = (T) => {
    if (l || s || T.pointerType !== "mouse" || T.button !== 0) return;
    const J = T.currentTarget, ne = T.clientY, xe = R;
    let re = xe, te = !1;
    const B = (Y) => {
      const M = ne - Y.clientY;
      if (!te) {
        if (Math.abs(M) < gf) return;
        te = !0, J.blur(), J.style.userSelect = "none";
      }
      const Q = mf(xe, M, e, t, o);
      Q !== re && (re = Q, i(Q));
    }, U = () => {
      w.current = null, window.removeEventListener("pointermove", B), window.removeEventListener("pointerup", U), window.removeEventListener("pointercancel", U), J.style.userSelect = "", te && J.blur();
    };
    w.current = U, window.addEventListener("pointermove", B), window.addEventListener("pointerup", U), window.addEventListener("pointercancel", U);
  }, $ = (T) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": T === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (T === 1 ? R >= t : R <= e),
    onPointerDown: (J) => J.preventDefault(),
    onClick: () => I(T)
  }), P = C ? z(22, 30, D) : z(16, 22, D), L = C ? z(14, 18, D) : z(11, 15, D);
  return /* @__PURE__ */ O(
    "span",
    {
      ref: v,
      className: `ui-number ${C ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            ref: k,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: E,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...C ? { ...N, minHeight: z(30, 38, D) } : {},
              paddingRight: P + 2,
              cursor: l || s ? void 0 : m ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, y(!0);
            },
            onChange: (T) => {
              const J = T.target.value;
              p(J);
              const ne = parseInt(J, 10);
              J !== "" && !Number.isNaN(ne) && i(q(ne));
            },
            onBlur: () => {
              if (x.current = !1, y(!1), h === null) return;
              const T = parseInt(h, 10);
              Number.isNaN(T) || i(q(T)), p(null);
            },
            onKeyDown: (T) => {
              T.key === "Enter" && T.target.blur(), T.key === "Escape" && (p(null), T.target.blur()), !s && !l && (T.key === "ArrowUp" || T.key === "ArrowDown") && (T.preventDefault(), I(T.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: W
          }
        ),
        /* @__PURE__ */ O("span", { className: "ui-number-steppers", style: { width: P }, children: [
          /* @__PURE__ */ g("button", { ...$(1), className: "ui-number-step", children: /* @__PURE__ */ g(Es, { style: { width: L, height: L } }) }),
          /* @__PURE__ */ g("button", { ...$(-1), className: "ui-number-step", children: /* @__PURE__ */ g($n, { style: { width: L, height: L } }) })
        ] })
      ]
    }
  );
}
function yd({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = ke(), f = Xe({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = z(14, 16, d), p = { width: h, height: h }, m = z(10, 12, d);
  return /* @__PURE__ */ O("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ O("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: f, children: [
      /* @__PURE__ */ O(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ g(Sn, { className: "text-zinc-400 shrink-0", style: p }) : /* @__PURE__ */ g($n, { className: "text-zinc-400 shrink-0", style: p }),
            e,
            /* @__PURE__ */ g("span", { className: "font-semibold text-zinc-200 truncate", children: n }),
            t && /* @__PURE__ */ g("span", { className: "text-zinc-500 shrink-0", style: { fontSize: m }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ g("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ g("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
export {
  Ue as Button,
  yd as CardSection,
  qi as CheckMark,
  dl as Checkbox,
  Zf as Checklist,
  ud as ChromeHeader,
  ad as ContentRow,
  _f as ContextMenu,
  Wf as ContextMenuDivider,
  Hf as ContextMenuItem,
  jf as ContextMenuSub,
  Pi as DROPDOWN_MAX_HEIGHT,
  Qf as DatePicker,
  Vf as DialogProvider,
  ol as DropdownItem,
  Pn as DropdownMenu,
  sl as DropdownSubmenu,
  wr as DropdownThemeContext,
  af as FONTS,
  td as FloatingChrome,
  Gf as FloatingToggle,
  ff as FontMenu,
  md as FormatToolbar,
  Se as IS_COARSE,
  Ys as IS_TOUCH_CAPABLE,
  Ff as ItemManagerDropdown,
  Uf as LongPressMenuProvider,
  gr as MORPH_EASE,
  Rt as MORPH_MS,
  yr as MORPH_OPACITY_MS,
  tn as MenuHighlightContext,
  Hi as MenuSearchContext,
  cl as Modal,
  Jf as ModalFooter,
  an as ModalFooterButton,
  gd as NumberInput,
  Vs as PopoutWindowContext,
  pd as RICH_TEXT_STATE_IDLE,
  ed as RadioList,
  cf as RichTextEditor,
  pf as SCRUB_PX_PER_STEP,
  cd as SectionHeader,
  ld as Seg,
  fd as StructureControls,
  kr as SubmenuContext,
  Tl as TB_BTN,
  un as TB_BTN_ICON,
  Ml as TB_DANGER,
  Yi as TB_DIVIDER,
  Nl as TB_INPUT,
  sd as TB_NUM,
  zl as TB_PICKER,
  nd as TB_ROW_LABEL,
  Al as TB_SEG,
  rd as TB_TOGGLE,
  od as TB_TOGGLE_OFF,
  id as TB_TOGGLE_ON,
  Zu as Token,
  Qu as TokenChipView,
  fn as ToolButton,
  St as Tooltip,
  xr as ZOOM_FROM,
  Fr as clampNumber,
  Qs as cloneOverlayClose,
  z as coarsePx,
  hd as escapeHtml,
  Ri as getCoarseScale,
  vr as getDropdownClasses,
  Lf as getHardwareKeyboard,
  Pf as getLastPointerType,
  qf as inputCls,
  xl as isInteractiveElement,
  rr as isTouchLike,
  Oi as nearestOverlayOrigin,
  ls as normalizeSpaces,
  Jn as overlayMorphEnabled,
  Gs as playOverlayClose,
  Xs as playOverlayOpen,
  wi as preprocessTokenHtml,
  Uu as sanitizeRichText,
  mf as scrubbedValue,
  Of as setCoarseScale,
  hf as steppedValue,
  dd as stripRichText,
  Xu as stripTokenWrappers,
  Df as useCoarse,
  ke as useCoarseScale,
  Xe as useCoarseSize,
  zi as useCurrentDocument,
  Zt as useCurrentWindow,
  Kf as useDialog,
  el as useDropdownPosition,
  Bi as useDropdownTheme,
  Bf as useHardwareKeyboard,
  Ki as useInputSize,
  Fi as useItemSize,
  Us as useLastPointerType,
  Yf as useLongPressOptOut,
  Sr as useMenuHighlight,
  rl as useMenuSearch,
  br as useOverlayMorph,
  mr as usePopoutWindow,
  Qt as usePortalTarget,
  Xf as useTouchMode
};
