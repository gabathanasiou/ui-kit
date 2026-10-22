"use client";
import { jsxs as R, jsx as m, Fragment as Ke } from "react/jsx-runtime";
import Se, { createContext as Dt, useContext as Pt, useState as X, useEffect as ee, useRef as S, useCallback as oe, useLayoutEffect as We, useMemo as vn, useImperativeHandle as fs } from "react";
import * as ce from "@radix-ui/react-dropdown-menu";
import { Search as ds, X as kn, Check as Ei, Pencil as hs, Copy as Ti, Trash2 as nr, RotateCcw as Ci, Plus as ps, ChevronRight as Sn, ChevronLeft as ms, ArrowUp as gs, ArrowDown as ys, ChevronDown as $n, Underline as xs, Strikethrough as bs, RemoveFormatting as ws, Link as vs, ChevronUp as ks } from "lucide-react";
import { computePosition as Ss, offset as Ni, flip as Mi, shift as zi, size as Es, useFloating as Ts, autoUpdate as Cs } from "@floating-ui/react-dom";
import * as rt from "@radix-ui/react-dialog";
import { createPortal as pr } from "react-dom";
import { mergeAttributes as Ns, ReactNodeViewRenderer as Ms, NodeViewWrapper as zs, useEditor as As, EditorContent as Rs } from "@tiptap/react";
import { PluginKey as qe, Plugin as Ze, Selection as Ct, TextSelection as Be, NodeSelection as At, AllSelection as Is } from "@tiptap/pm/state";
import { DecorationSet as ln, Decoration as $s } from "@tiptap/pm/view";
import Os from "@tiptap/starter-kit";
import Ds from "@tiptap/extension-placeholder";
import { TextStyle as Ps, FontFamily as Ls, FontSize as Bs } from "@tiptap/extension-text-style";
import Fs from "@tiptap/extension-color";
import Hs from "@tiptap/extension-link";
import _s from "@tiptap/extension-underline";
import Ws from "@tiptap/suggestion";
import { Mention as js } from "@tiptap/extension-mention";
import { createRoot as Js } from "react-dom/client";
const qs = Dt(null);
function mr() {
  return Pt(qs);
}
function Qt() {
  const n = mr();
  return n ? n.document.body : null;
}
function Ai() {
  const n = mr();
  return n ? n.document : typeof document < "u" ? document : null;
}
function Zt() {
  return mr() ?? (typeof window < "u" ? window : null);
}
const en = typeof window < "u", Ee = en && window.matchMedia("(pointer: coarse)").matches, Vs = en && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let On = 0.5;
const qt = /* @__PURE__ */ new Set();
function vf(n) {
  On = Math.max(0, Math.min(1, n)), qt.forEach((e) => e());
}
function Ri() {
  return On;
}
function kf() {
  const [, n] = X(0);
  return ee(() => {
    const e = () => n((t) => t + 1);
    return qt.add(e), () => {
      qt.delete(e);
    };
  }, []), Ee && On > 0;
}
function ke() {
  const [, n] = X(0);
  return ee(() => {
    const e = () => n((t) => t + 1);
    return qt.add(e), () => {
      qt.delete(e);
    };
  }, []), On;
}
function A(n, e, t) {
  return Ee ? Math.round(n + (e - n) * t) : n;
}
function lt(n, e) {
  const t = ke();
  return Ee && t > 0 ? {
    padding: `${A(n.py, e.py, t)}px ${A(n.px, e.px, t)}px`,
    fontSize: `${A(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function rr(n) {
  return n === "touch" || n === "pen";
}
let Tt = null;
const ir = /* @__PURE__ */ new Set();
en && window.addEventListener("pointerdown", (n) => {
  Tt = n.pointerType, ir.forEach((e) => e());
}, !0);
function Sf() {
  return Tt;
}
function Ks() {
  const [, n] = X(0), e = S(Tt);
  return ee(() => {
    const t = () => {
      e.current !== Tt && (e.current = Tt, n((r) => r + 1));
    };
    return ir.add(t), () => {
      ir.delete(t);
    };
  }, []), Tt;
}
const Ii = ["(any-hover: hover)", "(any-pointer: fine)"];
function $i() {
  return en ? Ii.some((n) => window.matchMedia(n).matches) : !1;
}
let En = $i();
const or = /* @__PURE__ */ new Set();
function qr(n) {
  En !== n && (En = n, or.forEach((e) => e()));
}
var Si;
if (en) {
  const n = () => qr($i());
  for (const s of Ii) {
    const l = window.matchMedia(s);
    (Si = l.addEventListener) == null || Si.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || qr(!0));
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
function Ef() {
  return En;
}
function Tf() {
  const [, n] = X(0);
  return ee(() => {
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
function Ys(n, e, t, r) {
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
function Us(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Di(e, t);
  e.style.transition = `transform ${Rt}ms ${gr}, opacity ${yr}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${xr})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Rt + 60);
}
function Xs(n, e, t) {
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
  const e = S(null), [t, r] = X(!1), i = S(null), o = S(0), s = oe((p) => {
    if (n.ref && (n.ref.current = p), p) {
      o.current = 0, e.current = p;
      const x = p.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const g = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === g && (e.current = null, r(!1), !(!g || !n.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && Jn(f.current) && Xs(g, u.current, i.current));
    });
  }, []), l = oe(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (i.current = { left: g.left, top: g.top, width: g.width, height: g.height });
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
    p && Ys(h, p, u.current);
  }, [t, n.visible]), ee(() => {
    if (!t || !c.current) return;
    let p = 0;
    const g = () => {
      p = 0, l(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [t, l]), We(() => {
    var y;
    const p = a.current;
    if (a.current = n.visible, n.visible || !p) return;
    const g = e.current;
    if (!g || !Jn(f.current)) {
      (y = d.current) == null || y.call(d);
      return;
    }
    Us(h, g, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), ee(() => {
    if (!t || !c.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [t]), ee(() => {
    if (!t || !c.current) return;
    const p = (g) => {
      const y = e.current;
      y && y.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [t]), s;
}
const Pi = 384;
function Gs(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Qs({
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
      f || (f = requestAnimationFrame(g));
    }, g = () => {
      if (f = 0, h) return;
      const D = u.current, L = n.current, C = e.current;
      if (!D || !L || !C || !C.isConnected) return;
      const B = (r == null ? void 0 : r.current) ?? C, z = Gs(D), Q = s ?? Pi, I = Math.min(l, Q), W = Math.max(0, C.offsetHeight - B.offsetHeight), N = Math.max(I, Math.ceil(B.scrollHeight + W)), F = Math.min(N, Q);
      C.style.maxHeight = `${F}px`;
      let O = F;
      Ss(L, C, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Ni(i),
          Mi({ boundary: z, padding: o, fallbackStrategy: "bestFit" }),
          zi({ boundary: z, padding: o, mainAxis: !1 }),
          Es({
            boundary: z,
            padding: o,
            apply({ availableHeight: E }) {
              O = Math.max(I, Math.floor(Math.min(Q, E))), C.style.maxHeight = `${O}px`;
            }
          })
        ]
      }).then(({ x: E, y: J, placement: Z }) => {
        h || d.current({
          top: Math.round(J),
          left: Math.round(E),
          maxH: O,
          side: Z.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    g();
    const y = u.current, x = (y == null ? void 0 : y.document) ?? null, k = (y == null ? void 0 : y.visualViewport) ?? null, w = () => p();
    k == null || k.addEventListener("resize", w), k == null || k.addEventListener("scroll", w), y == null || y.addEventListener("resize", w), x == null || x.addEventListener("scroll", w, { capture: !0, passive: !0 });
    let v = null;
    return typeof ResizeObserver < "u" && (v = new ResizeObserver(w), e.current && v.observe(e.current), r != null && r.current && v.observe(r.current)), () => {
      h = !0, f && cancelAnimationFrame(f), k == null || k.removeEventListener("resize", w), k == null || k.removeEventListener("scroll", w), y == null || y.removeEventListener("resize", w), x == null || x.removeEventListener("scroll", w, { capture: !0 }), v == null || v.disconnect();
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
    padding: `${A(8, 12, n)}px ${A(12, 16, n)}px`,
    fontSize: `${A(12, 14, n)}px`,
    lineHeight: `${A(18, 22, n)}px`
  };
}
const Zs = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Vr = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", el = (n) => n ? "text-xs" : "text-[10px]";
function vr(n) {
  const e = Ee && Ri() > 0;
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
    headerPad: Vr(e),
    headerText: `${Vr(e)} font-semibold uppercase tracking-wider ${el(e)} ui-label`,
    // Item padding
    itemPad: Zs(e),
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
function Hi(n) {
  const e = [];
  return Se.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Se.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const kr = Dt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), tn = Dt(null), Sr = () => Pt(tn), _i = Dt({ query: "", setQuery: () => {
} }), tl = () => Pt(_i), nl = () => !0;
function Dn(n) {
  const e = S([]), [t, r] = X(-1), [i, o] = X(!1), [s, l] = X(0), c = oe((f) => (e.current = [...e.current, f], l((h) => h + 1), () => {
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
  ee(() => {
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
    var p, g, y, x, k;
    if (!s.current) return;
    const d = u.target;
    if (!!d && !!d.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const w = (g = (p = l.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : g.call(p, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), w && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = u.key === "ArrowDown" ? 1 : -1, v = (i.current + w + h.length) % h.length;
        o.current.setHighlighted(v, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < h.length && h[w].submenu && h[w].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (k = (x = l.current) == null ? void 0 : x.onCloseSub) == null || k.call(x);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = i.current;
        w >= 0 && w < h.length && h[w].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const w = Date.now(), v = (w - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: v, time: w }, !v) return;
        const D = i.current + 1;
        for (let L = 0; L < h.length; L++) {
          const C = (D + L) % h.length;
          if (h[C].label.toLowerCase().startsWith(v)) {
            o.current.setHighlighted(C, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Tr(n, e, t, r, i, o, s) {
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
      const g = f.target;
      if (g && g.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(f.key === "ArrowDown" || f.key === "ArrowUp" || f.key === "ArrowLeft" || f.key === "ArrowRight" || f.key === "Enter" || f.key === " " || f.key.length === 1 && !f.ctrlKey && !f.metaKey && !f.altKey) || (f.preventDefault(), f.stopImmediatePropagation(), t.current(f));
  });
}
function Cr(n, e) {
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
  searchValue: g,
  onSearchValueChange: y
}) {
  const [x, k] = X([]), [w, v] = X(null), D = Qt(), L = Ai(), C = S(null), B = S(null), z = S(n);
  z.current = n;
  const [Q, I] = X(n), [W, N] = X(""), F = f && g !== void 0, O = F ? g : W, E = F ? y ?? (() => {
  }) : N, [J, Z] = X(!1), xe = F && !J ? "" : O, re = S(null), ne = ke(), $ = {
    padding: `${A(8, 12, ne)}px ${A(12, 16, ne)}px`,
    fontSize: `${A(12, 14, ne)}px`
  }, [Y, K] = X(0), T = f && !F;
  ee(() => {
    var Pe;
    if (!T || !n) return;
    const P = (Pe = B.current) == null ? void 0 : Pe.querySelector("[data-menu-items]");
    if (!P) return;
    const U = () => K(P.offsetWidth - P.clientWidth);
    U();
    const ue = new ResizeObserver(U);
    return ue.observe(P), () => ue.disconnect();
  }, [n, T, O]);
  const G = vn(() => {
    if (!f) return;
    const P = xe.trim().toLowerCase();
    return P ? (U) => p ? p(P, U.label) : U.label.toLowerCase().includes(P) : nl;
  }, [xe, f, p]), q = Dn(G);
  ee(() => {
    if (n)
      return I(!0), F || N(""), Z(!1), q.setHighlighted(d ?? -1, "keyboard"), Li(() => {
        t == null || t(!1), e == null || e();
      });
    k([]), Z(!1);
  }, [n, d, t, e]), ee(() => {
    if (!n || !L) return;
    const P = (U) => {
      if (U.pointerType !== "touch") return;
      const ue = U.target;
      ue && (B.current && B.current.contains(ue) || C.current && C.current.contains(ue) || ue instanceof Element && ue.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return L.addEventListener("pointerdown", P, { capture: !0 }), () => L.removeEventListener("pointerdown", P, { capture: !0 });
  }, [n, L, t, e]);
  const pe = oe(() => {
    const P = C.current;
    if (!P) return null;
    const U = P.getBoundingClientRect();
    return { left: U.left, top: U.top, width: U.width, height: U.height };
  }, []), H = br({
    visible: n,
    morph: c,
    anchor: pe,
    onClosed: () => I(!1)
  }), te = S(() => {
  }), ae = S(() => {
  }), me = S(() => {
  }), et = oe((P) => {
    if (P.key === "Enter") {
      const U = q.highlightedIndex, ue = q.items[U >= 0 ? U : 0];
      return ue == null || ue.activate(), !0;
    }
    return P.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [q, t, e]);
  Er(n && x.length === 0, q, te, { onFieldKey: et }), Cr(n, ae), Tr(n, q, te, B, x.length > 0, me, { ignoreFields: F });
  const Ye = S(null), Me = oe((P) => {
    var U;
    if (P) {
      P.addEventListener("keydown", te.current, { capture: !0 }), P.addEventListener("wheel", ae.current, { passive: !1 });
      const ue = P.ownerDocument;
      Ye.current = ue, ue.addEventListener("keydown", me.current, { capture: !0 }), Bt(!0);
    } else
      (U = Ye.current) == null || U.removeEventListener("keydown", me.current, { capture: !0 }), Ye.current = null, Bt(!1);
    B.current = P, H(P);
  }, [H]), [Ce, $e] = X({ top: 0, left: 0, maxH: Pi, side: "bottom", ready: !1 }), [He, Ie] = X(0), [tt, Bt] = X(!1);
  ee(() => {
    n && C.current && Ie(C.current.getBoundingClientRect().width);
  }, [n]), Qs({
    anchorRef: C,
    panelRef: B,
    open: n && tt,
    maxHeight: u,
    onPosition: $e
  }), ee(() => {
    var P;
    if (Ce.ready && n) {
      if (f) {
        (P = re.current) == null || P.focus();
        return;
      }
      const U = B.current;
      U && U.ownerDocument.activeElement !== U && !U.contains(U.ownerDocument.activeElement) && U.focus();
    }
  }, [Ce.ready, n, f]), ee(() => {
    if (!n || !f) return;
    if (q.items.length === 0) {
      q.highlightedIndex !== -1 && q.setHighlighted(-1, "keyboard");
      return;
    }
    const P = q.highlightedIndex;
    (P < 0 || P >= q.items.length) && q.setHighlighted(0, "keyboard");
  }, [n, O, f, q.items.length]), We(() => {
    var U;
    if (!n || q.highlightedIndex < 0 || q.pointerDriven) return;
    const P = (U = B.current) == null ? void 0 : U.querySelector(`[data-ei="${q.highlightedIndex}"]`);
    P == null || P.scrollIntoView({ block: "nearest" });
  }, [n, q.highlightedIndex, q.pointerDriven]);
  const nn = oe((P) => {
    !P && !z.current || (!P && at.current && (Ue.current = !0), t ? t(P) : P || e == null || e());
  }, [t, e]), Ft = S(Q);
  Ft.current = Q;
  const at = S(!1), Ue = S(!1), ut = oe(() => {
    if (!z.current && Ft.current) {
      if (Ue.current) {
        Ue.current = !1, at.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), ft = Se.isValidElement(r) ? r : null, bt = ft ? Se.cloneElement(ft, {
    ref: (P) => {
      C.current = P;
    },
    onPointerDown: () => {
      at.current = !0, Ue.current = !1;
    },
    onClick: (P) => {
      var U, ue;
      (ue = (U = ft.props).onClick) == null || ue.call(U, P), ut();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (P) => {
      var U, ue;
      if ((ue = (U = ft.props).onKeyDown) == null || ue.call(U, P), !(!F || !z.current)) {
        if (P.key.length === 1 && !P.ctrlKey && !P.metaKey && !P.altKey)
          Z(!0);
        else if (P.key === "ArrowDown" || P.key === "ArrowUp") {
          P.preventDefault();
          const Pe = q.items;
          if (Pe.length === 0) return;
          const nt = P.key === "ArrowDown" ? 1 : -1, on = (q.highlightedIndex + nt + Pe.length) % Pe.length;
          q.setHighlighted(on, "keyboard");
        } else if (P.key === "Enter") {
          P.preventDefault();
          const Pe = q.highlightedIndex, nt = q.items[Pe >= 0 ? Pe : 0];
          nt == null || nt.activate();
        }
      }
    }
  }) : r, rn = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${T ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ R(ce.Root, { open: n || Q, onOpenChange: nn, modal: !1, children: [
    /* @__PURE__ */ m(ce.Trigger, { asChild: !0, children: bt }),
    /* @__PURE__ */ m(ce.Portal, { container: D ?? void 0, children: /* @__PURE__ */ m(wr.Provider, { value: s, children: /* @__PURE__ */ m(kr.Provider, { value: { chain: x, setChain: k, morph: c, keyboardOpened: w, setKeyboardOpened: v }, children: /* @__PURE__ */ m(tn.Provider, { value: q, children: /* @__PURE__ */ m(_i.Provider, { value: { query: O, setQuery: E }, children: /* @__PURE__ */ R(
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
          minWidth: o ? void 0 : He || void 0,
          maxHeight: Ce.maxH,
          visibility: Ce.ready ? "visible" : "hidden"
        },
        onPointerLeave: q.pointerLeave,
        children: [
          T && /* @__PURE__ */ m("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: Y }, children: /* @__PURE__ */ R("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: $, children: [
            /* @__PURE__ */ m(ds, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ m(
              "input",
              {
                ref: re,
                value: O,
                onChange: (P) => E(P.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            O ? /* @__PURE__ */ m(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (P) => P.stopPropagation(),
                onClick: () => {
                  var P;
                  E(""), (P = re.current) == null || P.focus();
                },
                children: /* @__PURE__ */ m(kn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ m("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          T ? /* @__PURE__ */ m("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: l }) : l
        ]
      }
    ) }) }) }) }) })
  ] });
}
function Cf({
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
  theme: g,
  align: y,
  label: x,
  header: k,
  itemLabel: w,
  trigger: v,
  minItems: D = 1,
  itemRender: L,
  morph: C = !0,
  contentClassName: B
}) {
  const z = vr(), Q = Fi(), [I, W] = X(null), [N, F] = X(""), O = S(N);
  O.current = N;
  const E = S(null), J = S(null);
  ee(() => {
    n && requestAnimationFrame(() => {
      var $, Y;
      (Y = ($ = J.current) == null ? void 0 : $.querySelector('[data-active="1"]')) == null || Y.scrollIntoView({ block: "nearest" });
    });
  }, [n]), ee(() => {
    var K;
    if (!n) return;
    const $ = (T) => {
      var me, et, Ye;
      const G = T.target;
      if (G && G.closest("input, textarea, [contenteditable]")) {
        I && G === E.current && (T.key === "Enter" ? (T.preventDefault(), T.stopImmediatePropagation(), xe()) : T.key === "Escape" && (T.preventDefault(), T.stopImmediatePropagation(), re()));
        return;
      }
      const q = (me = J.current) == null ? void 0 : me.closest(".ui-menu");
      if (!q || !q.contains(T.target)) return;
      const pe = q.ownerDocument, H = [...q.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], te = [...q.querySelectorAll('div:last-child > [role="menuitem"]')], ae = [...H, ...te];
      if (T.key === "ArrowDown" || T.key === "ArrowUp") {
        T.preventDefault(), T.stopImmediatePropagation();
        const Me = pe.activeElement;
        let Ce = Me ? ae.indexOf(Me) : -1;
        if (Ce < 0 && Me) {
          const Ie = Me.closest("[data-active]"), tt = Ie == null ? void 0 : Ie.querySelector('[role="menuitem"]:first-child');
          tt && (Ce = H.indexOf(tt));
        }
        const $e = T.key === "ArrowDown" ? 1 : -1, He = Ce < 0 ? $e === 1 ? 0 : ae.length - 1 : (Ce + $e + ae.length) % ae.length;
        (et = ae[He]) == null || et.focus({ preventScroll: !0 });
        return;
      }
      if (T.key === "ArrowLeft" || T.key === "ArrowRight") {
        const Me = pe.activeElement, Ce = Me == null ? void 0 : Me.closest("[data-active]");
        if (!Ce) return;
        T.preventDefault(), T.stopImmediatePropagation();
        const $e = [...Ce.querySelectorAll('[role="menuitem"]')].slice(1);
        if ($e.length === 0) return;
        const He = Me && Ce.contains(Me) ? $e.indexOf(Me) : -1, Ie = T.key === "ArrowRight" ? 1 : -1, tt = He < 0 ? 0 : (He + Ie + $e.length) % $e.length;
        (Ye = $e[tt]) == null || Ye.focus({ preventScroll: !0 });
        return;
      }
    }, Y = ((K = J.current) == null ? void 0 : K.ownerDocument) ?? null;
    return Y == null || Y.addEventListener("keydown", $, { capture: !0 }), () => Y == null ? void 0 : Y.removeEventListener("keydown", $, { capture: !0 });
  }, [n, I]), ee(() => {
    if (!I) return;
    const $ = t.find((G) => G.id === I);
    $ && !N && F($.name);
    const Y = requestAnimationFrame(() => {
      const G = E.current;
      G && (G.focus(), G.select());
    });
    let K = 0;
    const T = window.setInterval(() => {
      const G = E.current;
      if (K++, !G || K > 12) {
        clearInterval(T);
        return;
      }
      G.ownerDocument.activeElement !== G && (G.focus(), G.select());
    }, 50);
    return () => {
      cancelAnimationFrame(Y), clearInterval(T);
    };
  }, [I]), ee(() => {
    if (I) {
      const $ = t.find((Y) => Y.id === I);
      $ && !N && F($.name);
    }
  }, [I, t]);
  const Z = ($, Y) => {
    W($), F(Y);
  }, xe = () => {
    I && O.current.trim() && o(I, O.current.trim()), W(null);
  }, re = () => {
    W(null);
  }, ne = w || k.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ R(Pn, { open: n, onOpenChange: ($) => {
    $ ? (W(null), F("")) : (I && N.trim() && o(I, N.trim()), W(null), F("")), (!$ || !p) && e($);
  }, width: "w-80", theme: g, align: y, trigger: v, morph: C, contentClassName: B, children: [
    /* @__PURE__ */ m("div", { className: `shrink-0 ${z.headerText}`, children: k }),
    /* @__PURE__ */ m("div", { ref: J, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map(($) => {
      const Y = $.id === r, K = I === $.id;
      return /* @__PURE__ */ m("div", { "data-active": Y ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${Y || K ? z.rowActiveBg : z.rowHoverBg} ${I && !K ? "opacity-40 pointer-events-none" : ""}`, children: K ? /* @__PURE__ */ R(Ke, { children: [
        /* @__PURE__ */ m("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ m(
          "input",
          {
            ref: E,
            autoFocus: !0,
            value: N,
            onChange: (T) => F(T.target.value),
            onKeyDown: (T) => {
              T.key === "Enter" && (T.preventDefault(), T.stopPropagation(), xe()), T.key === "Escape" && (T.preventDefault(), T.stopPropagation(), re());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: Q
          }
        ) }),
        /* @__PURE__ */ m(
          ce.Item,
          {
            className: `shrink-0 ${z.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${z.editConfirm}`,
            onSelect: (T) => {
              T.preventDefault(), xe();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m(Ei, { className: z.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ce.Item,
          {
            className: `shrink-0 ${z.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${z.editCancel}`,
            onSelect: (T) => {
              T.preventDefault(), re();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m(kn, { className: z.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ R(Ke, { children: [
        /* @__PURE__ */ m(
          ce.Item,
          {
            style: Q,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${z.rowText} ${Y ? "" : z.rowTextHover}`,
            onSelect: h ? () => {
              i($.id);
            } : (T) => {
              T.preventDefault(), i($.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ m("span", { className: `truncate ${Y ? z.rowActiveText : ""}`, children: L ? L($) : $.name })
          }
        ),
        /* @__PURE__ */ m(
          ce.Item,
          {
            className: `shrink-0 ${z.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Y ? z.btnActive : z.btnBase}`,
            onSelect: (T) => {
              T.preventDefault(), Z($.id, $.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m(hs, { className: z.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ce.Item,
          {
            className: `shrink-0 ${z.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${Y ? z.btnActive : z.btnBase}`,
            onSelect: (T) => {
              T.preventDefault();
              const G = s($.id);
              G && Z(G, `${$.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ m(Ti, { className: z.btnIcon })
          }
        ),
        /* @__PURE__ */ m(
          ce.Item,
          {
            className: `shrink-0 ${z.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= D ? z.btnDisabled : Y ? z.btnDangerActive : z.btnDanger}`,
            onSelect: (T) => {
              T.preventDefault(), l($.id);
            },
            onTouchStart: () => {
            },
            disabled: p || t.length <= D,
            children: /* @__PURE__ */ m(nr, { className: z.btnIcon })
          }
        )
      ] }) }, $.id);
    }) }),
    /* @__PURE__ */ R("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ R(Ke, { children: [
        /* @__PURE__ */ m(ce.Separator, { className: z.separator }),
        /* @__PURE__ */ R(
          ce.Item,
          {
            className: `w-full text-left ${z.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${z.itemDefault} ui-row`,
            onSelect: ($) => {
              $.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ m(Ci, { className: `${z.btnIcon} ${z.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ m(ce.Separator, { className: z.separator }),
      c && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${z.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${z.itemDefault} ui-row`,
          onSelect: ($) => {
            $.preventDefault();
            const Y = c();
            Y && Z(Y, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(ps, { className: `${z.btnIcon} ${z.icon}` }),
            "New ",
            ne
          ]
        }
      ),
      a && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${z.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${z.itemDefault} ui-row`,
          onSelect: ($) => {
            $.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${z.btnIcon} ${z.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${z.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${z.itemDefault} ui-row`,
          onSelect: ($) => {
            $.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${z.btnIcon} ${z.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ m("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ m("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ m("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${z.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${z.itemDefault} ui-row`,
          onSelect: ($) => {
            $.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ m(nr, { className: `${z.btnIcon} ${z.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function rl({
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
  const u = vr(), d = Fi(), f = S(!1), h = S(null), { myIndex: p, highlighted: g, setPointer: y } = Wi({
    label: () => Hi(o),
    activate: () => {
      t || n();
    },
    disabled: t
  }), { query: x } = tl(), k = x.trim() !== "" && p < 0, w = r === "danger" ? u.itemDanger : u.itemDefault;
  return /* @__PURE__ */ R(
    ce.Item,
    {
      ref: h,
      "data-ei": p >= 0 ? p : void 0,
      style: { ...d, display: k ? "none" : void 0 },
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${w} ${l ? "ui-item-selected" : ""} ${g ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (v) => {
        if (f.current) {
          f.current = !1;
          return;
        }
        s && v.preventDefault(), n();
      },
      onPointerEnter: () => {
        y(p);
      },
      onTouchStart: () => {
      },
      disabled: t,
      children: [
        e && /* @__PURE__ */ m("span", { className: `${u.icon} shrink-0`, children: e }),
        /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: o }),
        a && /* @__PURE__ */ m("span", { className: "shrink-0 ml-1 flex items-center", children: a }),
        c && /* @__PURE__ */ m(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${u.rightAction}`,
            title: c.title,
            onPointerDown: (v) => {
              v.stopPropagation(), v.preventDefault(), f.current = !0, c.onClick();
            },
            onClick: (v) => {
              v.stopPropagation(), v.preventDefault();
            },
            children: c.icon
          }
        )
      ]
    }
  );
}
function il({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: d } = Pt(kr), f = l.includes(n), h = l[l.length - 1] === n, p = Bi(), g = Qt(), y = S(null), x = S(null), [k, w] = X(f), v = !f && k;
  ee(() => {
    f && w(!0);
  }, [f]);
  const D = () => c((K) => {
    const T = K.indexOf(n);
    return T >= 0 ? K.slice(0, T) : K;
  }), L = Dn(), C = Sr(), B = S(C);
  B.current = C;
  const z = S(null);
  ee(() => {
    var T;
    const K = {
      label: e,
      activate: () => {
        d(n), c((G) => G.includes(n) ? G : [...G, n]);
      },
      submenu: !0
    };
    return z.current = K, (T = B.current) == null ? void 0 : T.register(K);
  }, []);
  const Q = C && z.current ? C.items.indexOf(z.current) : -1, I = Q >= 0 && Q === C.highlightedIndex, W = oe(() => {
    const K = y.current;
    if (!K) return null;
    const T = K.getBoundingClientRect();
    return { left: T.left, top: T.top, width: T.width, height: T.height };
  }, []), N = br({
    visible: f,
    morph: a,
    anchor: W,
    onClosed: () => w(!1)
  }), F = S(() => {
  }), O = S(() => {
  }), E = S(() => {
  });
  Er(f && h, L, F, {
    onCloseSub: () => {
      D(), C && Q >= 0 && C.setHighlighted(Q, "keyboard");
    }
  });
  const J = S(u);
  J.current = u, ee(() => {
    f && (J.current === n ? (L.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var K;
      return (K = x.current) == null ? void 0 : K.focus();
    }), d(null)) : L.setHighlighted(-1, "keyboard"));
  }, [f]), Cr(f, O), Tr(f, L, F, x, !h, E), Se.useLayoutEffect(() => {
    var T;
    if (!f || L.highlightedIndex < 0 || L.pointerDriven) return;
    const K = (T = x.current) == null ? void 0 : T.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    K == null || K.scrollIntoView({ block: "nearest" });
  }, [f, L.highlightedIndex, L.pointerDriven]);
  const Z = S(null), xe = oe((K) => {
    var T;
    if (K) {
      K.addEventListener("keydown", F.current, { capture: !0 }), K.addEventListener("wheel", O.current, { passive: !1 });
      const G = K.ownerDocument;
      Z.current = G, G.addEventListener("keydown", E.current, { capture: !0 });
    } else
      (T = Z.current) == null || T.removeEventListener("keydown", E.current, { capture: !0 }), Z.current = null;
    x.current = K, N(K);
  }, [N]), re = ke(), ne = { padding: `${A(8, 12, re)}px ${A(12, 16, re)}px`, fontSize: A(12, 14, re) }, $ = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${I ? " ui-item-highlighted" : ""}${v ? " ui-sub-closing" : ""}`, Y = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ R(ce.Sub, { open: f || k, onOpenChange: (K) => c((T) => {
    if (!K) {
      const G = T.indexOf(n);
      return G >= 0 ? T.slice(0, G) : T;
    }
    return T.includes(n) ? T : [...T, n];
  }), children: [
    /* @__PURE__ */ R(
      ce.SubTrigger,
      {
        ref: y,
        "data-ei": Q >= 0 ? Q : void 0,
        style: ne,
        className: $,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          C && Q >= 0 && C.setHighlighted(Q, "pointer");
        },
        onPointerDown: (K) => {
          K.pointerType === "pen" && (K.preventDefault(), c((T) => f ? T.slice(0, T.indexOf(n)) : [...T, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ m(Sn, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ m("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ m(Sn, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ m(ce.Portal, { container: g ?? void 0, children: /* @__PURE__ */ m(
      ce.SubContent,
      {
        ref: xe,
        "data-theme": p,
        className: Y,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: L.pointerLeave,
        children: /* @__PURE__ */ m(tn.Provider, { value: L, children: o })
      }
    ) })
  ] });
}
const Ht = 8, Nf = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s = "light", morph: l = !0 }) => {
  const c = ke(), a = A(12, 14, c), u = S(null), d = Zt(), [f, h] = X(!1), [p, g] = X([]), [y, x] = X(null), k = Dn();
  ee(() => {
    if (n)
      return k.setHighlighted(-1, "keyboard"), Li(r);
  }, [n, r]);
  const w = S({ left: e, top: t });
  n && (w.current = { left: e, top: t });
  const v = oe(() => ({ left: w.current.left, top: w.current.top, width: 0, height: 0 }), []), D = br({
    visible: !0,
    morph: l,
    anchor: v,
    cloneOnUnmount: !0
  }), L = S(() => {
  }), C = S(() => {
  }), B = S(() => {
  });
  Er(n, k, L), Cr(n, C), Tr(n, k, L, u, p.length > 0, B);
  const z = S(null), Q = oe((N) => {
    var F;
    if (N) {
      N.addEventListener("keydown", L.current, { capture: !0 }), N.addEventListener("wheel", C.current, { passive: !1 });
      const O = N.ownerDocument;
      z.current = O, O.addEventListener("keydown", B.current, { capture: !0 });
    } else
      (F = z.current) == null || F.removeEventListener("keydown", B.current, { capture: !0 }), z.current = null;
    u.current = N, h(!!N), D(N);
  }, [D]), [I, W] = X(null);
  return We(() => {
    var Y;
    if (!n || !f || !u.current) return;
    const N = u.current, F = N.offsetWidth, O = N.offsetHeight, E = (Y = o == null ? void 0 : o.current) == null ? void 0 : Y.getBoundingClientRect(), J = E ? E.right : (d == null ? void 0 : d.innerWidth) ?? 0, Z = E ? E.bottom : (d == null ? void 0 : d.innerHeight) ?? 0, xe = E ? E.left : 0, re = E ? E.top : 0;
    let ne = Math.max(re + Ht, w.current.top), $ = Math.max(xe + Ht, w.current.left);
    $ + F > J && ($ = J - F - Ht), ne + O > Z && (ne = Math.max(re + Ht, Z - O - Ht)), W({ left: $, top: ne });
  }, [n, f, e, t, o]), n ? /* @__PURE__ */ R(ce.Root, { open: n, onOpenChange: (N) => {
    N || r();
  }, modal: !1, children: [
    /* @__PURE__ */ m(ce.Trigger, { asChild: !0, children: /* @__PURE__ */ m("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ m(ce.Portal, { children: /* @__PURE__ */ m(wr.Provider, { value: s, children: /* @__PURE__ */ m(kr.Provider, { value: { chain: p, setChain: g, morph: l, keyboardOpened: y, setKeyboardOpened: x }, children: /* @__PURE__ */ m(tn.Provider, { value: k, children: /* @__PURE__ */ m(
      ce.Content,
      {
        ref: Q,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: a, left: (I == null ? void 0 : I.left) ?? w.current.left, top: (I == null ? void 0 : I.top) ?? w.current.top, touchAction: "manipulation" },
        onPointerLeave: k.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, Mf = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = ke(), c = { padding: `${A(8, 12, l)}px ${A(12, 16, l)}px`, fontSize: A(12, 14, l) }, a = Sr(), u = S(a);
  u.current = a;
  const d = S(null);
  ee(() => {
    var g;
    const p = { label: Hi(s), activate: () => {
      r || n();
    } };
    return d.current = p, (g = u.current) == null ? void 0 : g.register(p);
  }, []);
  const f = a && d.current ? a.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === a.highlightedIndex;
  return /* @__PURE__ */ R(
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
        /* @__PURE__ */ m("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ m("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, zf = () => /* @__PURE__ */ m(ce.Separator, { className: "ui-sep my-1" }), Af = (n) => /* @__PURE__ */ m(il, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), le = 8, ji = "[data-modal-stack]", Ge = 220, Vt = "cubic-bezier(0.32, 0.72, 0, 1)", yn = 0.94;
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
function Kr(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = Ji(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Ge}ms ${Vt}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, Ge + 80));
    });
  });
}
function ol(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${yn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Ge}ms ${Vt}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Ge + 60));
    });
  });
}
function Yr(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - yn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * yn, height: i.height * yn };
  e.style.transition = `transform ${Ge}ms ${Vt}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Ji(i, s), e.style.opacity = "0", window.setTimeout(() => {
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
function sl({
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
  const f = S(null), h = S(null), p = S(null), g = ke(), y = A(20, 24, g), x = A(10, 12, g), k = A(12, 14, g), w = A(14, 16, g), v = A(20, 24, g), D = A(20, 24, g), L = A(20, 24, g), C = A(14, 16, g), B = A(16, 20, g), z = A(10, 12, g), Q = A(12, 14, g), I = A(8, 10, g), W = A(4, 6, g), N = { padding: `${x}px ${y}px` }, F = { fontSize: k }, O = { padding: `${D}px ${v}px 16px ${v}px` }, E = { fontSize: w }, J = { padding: `0 ${v}px 16px` }, Z = { padding: `${L}px ${v}px` }, xe = { fontSize: z, padding: `${W}px ${I}px` }, [re, ne] = X(!1), $ = oe((b) => {
    f.current = b, ne(b !== null);
  }, []), Y = Qt(), K = Zt(), T = S(K);
  T.current = K;
  const [G, q] = X(null), pe = S(null), H = S(!1), te = S(!1), ae = S(0), me = S({ w: 0, h: 0 }), et = S(!1), [Ye, Me] = X(!1), [Ce, $e] = X(!1), He = S(0), Ie = S(!1), [tt, Bt] = X(!1), nn = S(c);
  nn.current = c;
  const Ft = S(!1), at = S(!1), Ue = () => {
    at.current = !0, Me(!0);
  }, ut = () => {
    at.current = !1, Me(!1);
  };
  ee(() => {
    n || (q(null), et.current = !1, H.current = !1, $e(!1));
  }, [n]), We(() => {
    if (!n || et.current || !re || !f.current) return;
    et.current = !0;
    const b = f.current.getBoundingClientRect(), j = T.current ?? null, V = (j == null ? void 0 : j.innerWidth) ?? 0, ie = it(j);
    q({
      left: Math.max(le, Math.min((V - b.width) / 2, V - b.width - le)),
      top: Math.max(ie.top + le, Math.min(ie.top + (ie.height - b.height) / 2, ie.bottom - b.height - le))
    });
  }, [n, re]), We(() => {
    if (!n || !re || !c || kt() || !f.current) return;
    const b = f.current, j = qn(b), V = j[j.length - 1];
    Ue(), V ? Kr(He, b, V.getBoundingClientRect(), ut) : ol(He, b, ut);
  }, [n, re]);
  const ft = oe(() => {
    if (!u || Ie.current) return;
    const b = f.current, j = !!b && qn(b).length > 0;
    if (!b || !c || kt() || j) {
      e();
      return;
    }
    Ie.current = !0, Bt(!0), Ft.current = !0, Ue(), Yr(He, b, () => {
      Ie.current = !1, Bt(!1), ut(), e();
    });
  }, [c, e, u]), bt = oe(() => {
    const b = f.current;
    if (!b || Ft.current || !nn.current || kt() || qn(b).length > 0) return;
    const j = b.ownerDocument, V = b.cloneNode(!0);
    V.removeAttribute("data-modal-stack"), V.removeAttribute("data-state"), V.removeAttribute("role"), V.removeAttribute("data-aria-hidden"), V.removeAttribute("tabindex"), V.setAttribute("aria-hidden", "true"), V.style.pointerEvents = "none", j.body.appendChild(V), Yr({ current: 0 }, V, () => {
      V.isConnected && V.remove();
    });
  }, []);
  We(() => () => bt(), [bt]);
  const rn = S(n);
  We(() => {
    const b = rn.current;
    rn.current = n, b && !n && bt();
  }, [n, re, bt]), ee(() => {
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
        se = !1, ie && !kt() && (Ue(), Kr(He, b, ie, ut)), ie = null;
        const ze = T.current ?? null;
        ze == null || ze.setTimeout(() => {
          !b || !b.isConnected || getComputedStyle(b).opacity !== "1" && (b.style.opacity = "1", b.style.pointerEvents = "");
        }, 240);
      }
    }, ye = new MutationObserver(() => {
      !V && cn(b).length > 0 && (V = requestAnimationFrame(fe));
    });
    return ye.observe(j, { childList: !0 }), () => {
      ye.disconnect(), V && cancelAnimationFrame(V);
    };
  }, [n, re]), ee(() => {
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
      if (pe.current || Ie.current || cn(b).length > 0) {
        j = se;
        return;
      }
      if (at.current) return;
      const fe = j;
      j = se, Ue();
      const ye = b.getBoundingClientRect(), be = it(T.current ?? null), ze = !H.current && !te.current, wt = ze ? be.top + (be.height - fe) / 2 : ye.top, _e = ze ? be.top + (be.height - se) / 2 : ye.top;
      b.style.transition = "none", b.style.height = `${fe}px`, ze && (b.style.top = `${wt}px`), h.current && (h.current.style.overflow = "hidden"), b.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.style.height === `${fe}px` && (b.style.transition = `height ${Ge}ms ${Vt}${ze ? `, top ${Ge}ms ${Vt}` : ""}`, b.style.height = `${se}px`, ze && (b.style.top = `${_e}px`), window.setTimeout(() => {
            b.style.height === `${se}px` && (b.style.transition = "", b.style.height = "", h.current && (h.current.style.overflow = ""), ze && q({ left: ye.left, top: _e }), ut());
          }, Ge + 60));
        });
      });
    });
    return ie.observe(b), () => ie.disconnect();
  }, [re]), ee(() => {
    if (!re || !f.current || c && !kt()) return;
    const b = f.current, j = new ResizeObserver(() => {
      if (!b.isConnected || pe.current || Ie.current || te.current || cn(b).length > 0) return;
      const V = T.current ?? null, ie = it(V), se = (V == null ? void 0 : V.innerWidth) ?? 0, fe = b.getBoundingClientRect(), ye = Math.max(ie.top + le, Math.min(fe.top, ie.bottom - fe.height - le)), be = Math.max(le, Math.min(fe.left, se - fe.width - le));
      (Math.abs(ye - fe.top) > 0.5 || Math.abs(be - fe.left) > 0.5) && q({ left: be, top: ye });
    });
    return j.observe(b), () => j.disconnect();
  }, [re, c]);
  const P = oe(() => {
    const b = f.current;
    if (!b) return null;
    const j = b.getBoundingClientRect();
    return { left: j.left, top: j.top, width: j.width, height: j.height };
  }, []), U = oe((b, j) => {
    const V = T.current ?? null, ie = (V == null ? void 0 : V.innerWidth) ?? 0, se = it(V), fe = P(), ye = fe ? fe.width : Math.min(ie - le * 2, 576), be = fe ? fe.height : Math.min(se.height - le * 2, 400);
    return {
      left: Math.max(le, Math.min(b, ie - ye - le)),
      top: Math.max(se.top + le, Math.min(j, se.bottom - be - le))
    };
  }, [P]);
  ee(() => {
    if (!n) return;
    const b = T.current ?? null, j = (b == null ? void 0 : b.visualViewport) ?? null;
    if (!b || !j) return;
    const V = 120;
    te.current = !1, me.current = { w: b.innerWidth, h: b.innerHeight };
    let ie = 0;
    const se = () => {
      if (Ie.current || pe.current) return;
      const ye = (b == null ? void 0 : b.innerHeight) ?? 0, be = (b == null ? void 0 : b.innerWidth) ?? 0, wt = it(b).height < ye - V, _e = ye < me.current.h - V && be === me.current.w;
      wt || _e ? (te.current = !0, ae.current && (clearTimeout(ae.current), ae.current = 0)) : ae.current || (ae.current = (b == null ? void 0 : b.setTimeout(() => {
        te.current = !1, ae.current = 0, $e(!1);
      }, 600)) ?? 0), $e(te.current), !ie && (ie = requestAnimationFrame(() => {
        var Jr;
        ie = 0;
        const _r = f.current;
        if (!_r) return;
        const dt = it(T.current ?? null), Ve = _r.getBoundingClientRect(), Wr = ((Jr = T.current) == null ? void 0 : Jr.innerWidth) ?? 0, jn = (b == null ? void 0 : b.innerHeight) ?? 0, us = dt.height < jn - V || jn < me.current.h - V && (b == null ? void 0 : b.innerWidth) === me.current.w;
        me.current = { w: (b == null ? void 0 : b.innerWidth) ?? 0, h: jn };
        const sn = Ve.top >= dt.top + le && Ve.bottom <= dt.bottom - le, jr = () => {
          q({
            left: Math.max(le, Math.min((Wr - Ve.width) / 2, Wr - Ve.width - le)),
            top: Math.max(dt.top + le, Math.min(dt.top + (dt.height - Ve.height) / 2, dt.bottom - Ve.height - le))
          });
        };
        if (us && !Ee) {
          if (H.current) {
            sn || q(U(Ve.left, Ve.top));
            return;
          }
          if (sn) return;
          jr();
          return;
        }
        if (!te.current) {
          if (H.current) {
            sn || q(U(Ve.left, Ve.top));
            return;
          }
          sn || jr();
        }
      }));
    };
    j.addEventListener("resize", se), j.addEventListener("scroll", se);
    const fe = () => {
      Ie.current || pe.current || ie || (ie = requestAnimationFrame(() => {
        ie = 0;
        const ye = f.current;
        if (!ye) return;
        const be = T.current ?? null, ze = it(be), wt = (be == null ? void 0 : be.innerWidth) ?? 0, _e = ye.getBoundingClientRect();
        if (H.current) {
          q(U(_e.left, _e.top));
          return;
        }
        q({
          left: Math.max(le, Math.min((wt - _e.width) / 2, wt - _e.width - le)),
          top: Math.max(ze.top + le, Math.min(ze.top + (ze.height - _e.height) / 2, ze.bottom - _e.height - le))
        });
      }));
    };
    return b.addEventListener("orientationchange", fe), () => {
      j.removeEventListener("resize", se), j.removeEventListener("scroll", se), b.removeEventListener("orientationchange", fe), ie && cancelAnimationFrame(ie), ae.current && clearTimeout(ae.current);
    };
  }, [n, U]);
  const ue = oe((b) => {
    if (b.target.closest("button")) return;
    H.current = !0;
    const j = P();
    j && (q(U(j.left, j.top)), pe.current = { startX: b.clientX, startY: b.clientY, posX: j.left, posY: j.top }, b.target.setPointerCapture(b.pointerId));
  }, [P, U]), Pe = oe((b) => {
    const j = pe.current;
    j && (b.preventDefault(), q(U(j.posX + b.clientX - j.startX, j.posY + b.clientY - j.startY)));
  }, [U]), nt = oe(() => {
    pe.current = null;
  }, []), on = pe.current !== null, Lr = oe(() => {
    H.current = !1;
    const b = T.current ?? null, j = it(b), V = (b == null ? void 0 : b.innerWidth) ?? 0, ie = f.current, se = ie ? ie.getBoundingClientRect() : { width: 0, height: 0 };
    q({
      left: Math.max(le, Math.min((V - se.width) / 2, V - se.width - le)),
      top: Math.max(j.top + le, Math.min(j.top + (j.height - se.height) / 2, j.bottom - se.height - le))
    });
  }, []), Wn = S(0), Br = oe(() => {
    const b = Date.now();
    b - Wn.current < 300 ? (Wn.current = 0, Lr()) : Wn.current = b;
  }, [Lr]), Fr = G !== null, ls = Fr ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", cs = `${i ? `${i} w-full` : "max-w-xl w-full"}`, Hr = {
    ...Fr ? { left: G.left, top: G.top } : {},
    width: `min(100%, calc(100dvw - ${le * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Ce ? {} : { maxHeight: `calc(100dvh - ${le * 2}px)` }
  }, as = oe((b) => {
    if (b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey) return;
    const j = b.target, V = p.current;
    if (!(!!j.closest("[data-modal-close]") || !!V && V.contains(j) && !!j.closest('button, a, [role="button"]')) && j.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !V) return;
    const se = Array.from(V.querySelectorAll("button[data-modal-confirm]")), fe = se.length > 0 ? se : Array.from(V.querySelectorAll("button")), ye = fe[fe.length - 1];
    !ye || ye.disabled || (b.preventDefault(), ye.click());
  }, []);
  return /* @__PURE__ */ m(rt.Root, { open: n, onOpenChange: (b) => {
    b || ft();
  }, children: /* @__PURE__ */ R(rt.Portal, { container: Y ?? void 0, children: [
    /* @__PURE__ */ m(
      rt.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${tt ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (b) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (b.preventDefault(), d && ft());
        }
      }
    ),
    /* @__PURE__ */ R(
      rt.Content,
      {
        ref: $,
        onKeyDown: as,
        onInteractOutside: (b) => {
          d || b.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ls} ${cs}`,
        style: { touchAction: "manipulation", ...Object.keys(Hr).length > 0 ? Hr : {} },
        children: [
          a ? /* @__PURE__ */ R(
            "div",
            {
              style: O,
              className: `flex items-center justify-between ${on ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (b) => {
                Ye || ue(b);
              },
              onPointerMove: Pe,
              onPointerUp: nt,
              onClick: Br,
              children: [
                /* @__PURE__ */ m(rt.Title, { style: E, className: "font-bold text-white truncate", children: t }),
                u && /* @__PURE__ */ m(rt.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ m(kn, { style: { width: B, height: B } }) })
              ]
            }
          ) : /* @__PURE__ */ R(
            "div",
            {
              style: N,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${on ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (b) => {
                Ye || ue(b);
              },
              onPointerMove: Pe,
              onPointerUp: nt,
              onClick: Br,
              children: [
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ m("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ m(rt.Title, { style: F, className: "font-bold text-white truncate", children: t })
                ] }),
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ R("button", { onClick: l, style: xe, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ m(Ci, { style: { width: Q, height: Q } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ m(rt.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ m(kn, { style: { width: C, height: C } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ m("div", { ref: h, style: a ? J : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: s }),
          o && /* @__PURE__ */ m("div", { ref: p, style: a ? Z : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ m("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) });
}
function Rf({ children: n }) {
  const e = ke(), t = A(20, 24, e), r = A(8, 12, e);
  return /* @__PURE__ */ m("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${t}px` }, children: n });
}
const ll = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", cl = {
  zinc: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-blue-600 text-white font-semibold border border-blue-500 hover:bg-blue-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-red-600 text-white font-semibold border border-red-500 hover:bg-red-500 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
}, al = {
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
  const o = lt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ m(
    "button",
    {
      type: r,
      style: o,
      className: `${ll} ${n === "hero" ? cl[e] : al[n]} ${t}`,
      ...i
    }
  );
}
function qi({ checked: n, size: e, tone: t = "accent" }) {
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
function ul({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const d = c !== "plain", f = ke(), h = A(16, 20, f), p = A(12, 14, f), g = A(12, 14, f), y = A(12, 16, f), x = A(10, 12, f), k = A(8, 10, f);
  return /* @__PURE__ */ R(
    "label",
    {
      className: `ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: k, padding: d ? `${x}px ${y}px` : void 0 },
      onClick: (v) => v.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ m(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (v) => e(v.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ m(qi, { checked: n, size: h, tone: a }) : /* @__PURE__ */ m("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ m("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ m("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ m("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function If(n = "md") {
  const e = Ee && Ri() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function Vi(n = "md") {
  return n === "sm" ? lt({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : lt({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Ki = Dt(null);
function $f() {
  const n = Pt(Ki);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Of({ children: n }) {
  const [e, t] = X(null), [r, i] = X(!1), o = S(null), s = ke(), l = A(16, 20, s), c = A(12, 14, s), a = Vi(), u = S(e);
  u.current = e;
  const d = oe(() => {
    const k = u.current;
    k && (k.kind === "confirm" ? k.resolve(!1) : k.kind === "prompt" ? k.resolve(null) : k.resolve());
  }, []), f = oe((k) => {
    if (k.suppressKey) {
      const w = localStorage.getItem(k.suppressKey);
      if (w && Date.now() < parseInt(w, 10))
        return Promise.resolve(!0);
    }
    return new Promise((w) => {
      d(), i(!1), t({ kind: "confirm", options: k, resolve: w });
    });
  }, [d]), h = oe((k) => new Promise((w) => {
    d(), t({ kind: "prompt", options: k, resolve: w });
  }), [d]), p = oe((k) => new Promise((w) => {
    d(), t({ kind: "alert", options: k, resolve: w });
  }), [d]);
  ee(() => {
    if (e) {
      const k = setTimeout(() => {
        var w;
        return (w = o.current) == null ? void 0 : w.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [e]);
  const g = oe(() => {
    var k, w;
    if (e) {
      if (e.kind === "confirm") {
        const v = e.options;
        v.suppressKey && r && localStorage.setItem(v.suppressKey, String(Date.now() + 864e5)), e.resolve(!0);
      } else e.kind === "prompt" ? e.resolve(((w = (k = o.current) == null ? void 0 : k.value) == null ? void 0 : w.trim()) || null) : e.resolve();
      t(null);
    }
  }, [e, r]), y = e !== null;
  ee(() => {
    if (!y) return;
    const k = (w) => {
      w.key !== "Enter" || w.shiftKey || w.metaKey || w.ctrlKey || w.altKey || w.isComposing || (w.preventDefault(), w.stopImmediatePropagation(), g());
    };
    return document.addEventListener("keydown", k, !0), () => document.removeEventListener("keydown", k, !0);
  }, [y, g]);
  const x = oe(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), t(null));
  }, [e]);
  return /* @__PURE__ */ R(Ki.Provider, { value: { confirm: f, prompt: h, alert: p }, children: [
    n,
    y && /* @__PURE__ */ m(
      sl,
      {
        open: !0,
        onClose: x,
        closable: (e == null ? void 0 : e.kind) !== "alert",
        dismissOnBackdrop: (e == null ? void 0 : e.kind) !== "alert",
        title: (e == null ? void 0 : e.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: e && /* @__PURE__ */ R(Ke, { children: [
          e.kind !== "alert" && /* @__PURE__ */ m(an, { variant: "ghost", onClick: x, children: "Cancel" }),
          e.kind === "alert" ? /* @__PURE__ */ m(an, { onClick: g, children: "OK" }) : e.kind === "confirm" ? /* @__PURE__ */ m(
            an,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: g,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ m(an, { "data-modal-confirm": !0, onClick: g, children: "Save" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "flex flex-col", style: { gap: l }, children: [
          (e == null ? void 0 : e.options.message) && /* @__PURE__ */ m("p", { style: { fontSize: c }, className: "text-zinc-400 leading-relaxed", children: e.options.message }),
          (e == null ? void 0 : e.kind) === "confirm" && e.options.suppressKey && /* @__PURE__ */ m(
            ul,
            {
              block: !0,
              checked: r,
              onChange: i,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (e == null ? void 0 : e.kind) === "prompt" && /* @__PURE__ */ m(
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
const fl = 500, dl = 250, hl = 5, Le = 88, Ur = 4;
function pl(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function ml({ x: n, y: e, ms: t }) {
  const r = S(null), i = Qt();
  return ee(() => {
    r.current && pl(r.current, t);
  }, [t]), pr(
    /* @__PURE__ */ m(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Le / 2,
          top: e - Le / 2,
          width: Le,
          height: Le,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ R("svg", { ref: r, width: Le, height: Le, viewBox: `0 0 ${Le} ${Le}`, children: [
          /* @__PURE__ */ m(
            "circle",
            {
              cx: Le / 2,
              cy: Le / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Ur + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ m(
            "circle",
            {
              cx: Le / 2,
              cy: Le / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: Ur,
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
function Df() {
  return { "data-no-longpress": "true" };
}
function gl(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function Pf({
  children: n,
  showRing: e = !0,
  longPressMs: t = fl,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = X(null), c = Ai(), a = S(null), u = S(null), d = S({ x: 0, y: 0, target: null }), f = S(!1), h = Math.min(dl, t * 0.5), p = S(i);
  p.current = i;
  const g = S(o);
  return g.current = o, ee(() => {
    if (!Ee || !c) return;
    const y = (v) => {
      if (!rr(v.pointerType) || v.button !== 0) return;
      const D = v.target;
      if (!D.closest(r) || (p.current ? !p.current(D) : gl(D))) return;
      const L = v.clientX, C = v.clientY;
      d.current = { x: L, y: C, target: v.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: L, y: C }), h)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const B = d.current.target;
        if (!B) return;
        const z = g.current;
        if (z) {
          z(B, L, C);
          return;
        }
        const Q = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: L,
          clientY: C,
          button: 2,
          view: window
        });
        B.dispatchEvent(Q);
      }, t);
    }, x = (v) => {
      if (!f.current || a.current === null) return;
      const D = v.clientX - d.current.x, L = v.clientY - d.current.y;
      Math.sqrt(D * D + L * L) > hl && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, k = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, w = (v) => {
      rr(v.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", y), c.addEventListener("pointermove", x), c.addEventListener("pointerup", k), c.addEventListener("pointercancel", k), c.addEventListener("pointerleave", w), () => {
      c.removeEventListener("pointerdown", y), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", k), c == null || c.removeEventListener("pointercancel", k), c == null || c.removeEventListener("pointerleave", w), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ R(Ke, { children: [
    n,
    e && s && /* @__PURE__ */ m(ml, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function Lf() {
  const n = Ks();
  return Vs ? n === null || rr(n) : !1;
}
const Xr = "transition-[grid-template-columns] ease-out duration-150 group-hover:duration-200 motion-reduce:transition-none", yl = "group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr] group-data-[state=open]:grid-cols-[1fr]", xl = "group-hover:grid-cols-[0fr] group-focus-visible:grid-cols-[0fr] group-data-[state=open]:grid-cols-[0fr]", bl = "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=open]:opacity-100";
function wl({ icon: n, collapse: e = !1, iconWithLabel: t = !0, active: r = !1, gap: i = 6, children: o }) {
  const s = !!e && !!n, l = s && !t, c = !!n && (t || s);
  return s ? /* @__PURE__ */ R(Ke, { children: [
    c && (l ? /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: `grid min-w-0 ${Xr} ${r ? "grid-cols-[0fr]" : `grid-cols-[1fr] ${xl}`}`, children: /* @__PURE__ */ m("span", { className: "inline-flex min-w-0 items-center overflow-hidden", children: n }) }) : /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n })),
    /* @__PURE__ */ m("span", { "data-kit-label": !0, className: `grid min-w-0 ${Xr} ${r ? "grid-cols-[1fr]" : `grid-cols-[0fr] ${yl}`}`, children: /* @__PURE__ */ m("span", { className: "min-w-0 overflow-hidden", children: /* @__PURE__ */ m(
      "span",
      {
        className: `flex min-w-0 items-center whitespace-nowrap transition-[opacity,padding-left] duration-100 group-hover:duration-150 motion-reduce:transition-none ${r ? "opacity-100" : `opacity-0 ${bl}`} ${l ? `pl-[var(--kit-collapse-gap)] group-hover:pl-0! group-focus-visible:pl-0! group-data-[state=open]:pl-0! ${r ? "pl-0!" : ""}` : ""}`,
        style: l ? { "--kit-collapse-gap": `${i}px` } : { paddingLeft: i },
        children: o
      }
    ) }) })
  ] }) : /* @__PURE__ */ R(Ke, { children: [
    c && /* @__PURE__ */ m("span", { "data-kit-icon": !0, className: "shrink-0 inline-flex items-center justify-center", children: n }),
    o
  ] });
}
const Bf = {
  light: { plain: "bg-zinc-950", blue: "bg-blue-950", emerald: "bg-emerald-950" },
  dark: { plain: "bg-white", blue: "bg-blue-950", emerald: "bg-emerald-950" }
};
function Xe({
  variant: n = "subtle",
  theme: e = "light",
  cloud: t = !1,
  active: r = !1,
  iconOnly: i = !1,
  icon: o,
  collapse: s = !1,
  iconWithLabel: l = !0,
  className: c = "",
  type: a = "button",
  children: u,
  ...d
}) {
  const f = lt({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), h = lt({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), p = lt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), g = "", y = "", x = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", k = {
    light: {
      active: "text-white",
      inactive: "text-zinc-500 hover:text-zinc-900"
    },
    dark: {
      active: "text-zinc-900",
      inactive: "text-zinc-500 hover:text-zinc-300"
    }
  }, w = {
    blue: {
      active: "text-blue-50",
      inactiveLight: "text-blue-950 hover:bg-blue-950/10 hover:text-blue-950",
      inactiveDark: "text-zinc-500 hover:text-zinc-300"
    },
    emerald: {
      active: "text-emerald-50",
      inactiveLight: "text-emerald-950 hover:bg-emerald-950/10 hover:text-emerald-950",
      inactiveDark: "text-zinc-500 hover:text-zinc-300"
    }
  }, v = {
    active: "text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white"
  }, D = {
    blue: {
      active: "text-blue-950",
      inactive: "text-white/70 hover:text-white hover:bg-blue-900/60",
      open: "bg-blue-900/60! text-white"
    },
    emerald: {
      active: "text-emerald-950",
      inactive: "text-white/70 hover:text-white hover:bg-emerald-900/60",
      open: "bg-emerald-900/60! text-white"
    }
  }, L = {
    light: {
      subtle: { base: `${g} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${y} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${g} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${g} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${y} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${g} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, C = {
    blue: { base: `${y} bg-blue-950 hover:bg-blue-900 text-white`, open: "bg-blue-900!" },
    emerald: { base: `${y} bg-emerald-950 hover:bg-emerald-900 text-white`, open: "bg-emerald-900!" }
  }, B = d["data-state"] === "open", z = L[e][n], Q = n === "primary" ? h : n.startsWith("tab") ? p : f, I = A(6, 8, ke()), W = A(28, 40, ke()), N = t === "emerald" ? "emerald" : t ? "blue" : null, F = e === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let O;
  if (n === "tab") {
    const Z = k[e];
    O = r ? N ? w[N].active : Z.active : N ? w[N][e === "light" ? "inactiveLight" : "inactiveDark"] : Z.inactive;
  } else if (n === "tab-header")
    O = `${N ? r ? D[N].active : D[N].inactive : r ? v.active : v.inactive} ${B ? N ? D[N].open : v.open : ""}`;
  else if (O = `${z.base} ${B ? z.open : ""}`, r && (O = `${O} ${F}`), n === "primary" && e === "light" && N) {
    const Z = C[N];
    O = B ? `${Z.base} ${Z.open}` : Z.base;
  }
  const E = !!s && !!o && !i, J = i ? { width: W, height: W, padding: 0, gap: 0 } : { ...Q, gap: E ? 0 : I };
  return /* @__PURE__ */ m(
    "button",
    {
      type: a,
      className: `${x} ${i ? "justify-center" : ""} ${E ? "group" : ""} ${O} ${c}`,
      style: J,
      ...d,
      children: i ? u : /* @__PURE__ */ m(wl, { icon: o, collapse: s, iconWithLabel: l, active: r, gap: I, children: u })
    }
  );
}
const vl = {
  border: "1px solid #d4d4d8",
  background: "rgba(255,255,255,0.94)",
  color: "#52525b",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
}, kl = {
  border: "2px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  boxShadow: "0 4px 16px rgba(37,99,235,0.4)"
}, Sl = {
  border: "1px solid #f59e0b",
  background: "rgba(255, 251, 235, 0.94)",
  color: "#b45309",
  boxShadow: "0 2px 8px rgba(0,0,0,0.14)"
};
function Ff({
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
        ...e ? Sl : n ? kl : vl,
        ...t
      },
      ...s,
      children: o
    }
  );
}
const El = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Tl = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Vn = 1900, Kn = 2100;
function Cl(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function Nl(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function Hf({ selected: n, onChange: e, theme: t = "light", showChips: r = !0, className: i = "", initialView: o }) {
  const s = /* @__PURE__ */ new Date(), l = (() => {
    if (!o) return s;
    const H = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(H.getTime()) ? s : H;
  })(), [c, a] = X(l.getFullYear()), [u, d] = X(l.getMonth()), [f, h] = X("days"), [p, g] = X(null), y = vn(() => new Set(n), [n]), x = (H) => {
    y.has(H) ? e(n.filter((te) => te !== H)) : e([...n, H]);
  }, k = vn(() => {
    const H = Cl(c, u), te = new Date(c, u, 1).getDay(), ae = [];
    for (let me = 0; me < te; me++) ae.push({ key: `pad-${me}`, day: 0, empty: !0 });
    for (let me = 1; me <= H; me++) ae.push({ key: Nl(c, u, me), day: me, empty: !1 });
    return ae;
  }, [c, u]), w = (H) => a((te) => Math.max(Vn, Math.min(Kn, te + H))), v = (H) => {
    u + H < 0 ? (a((te) => Math.max(Vn, te - 1)), d(11)) : u + H > 11 ? (a((te) => Math.min(Kn, te + 1)), d(0)) : d((te) => te + H);
  }, D = () => {
    if (p === null) return;
    const H = parseInt(p, 10);
    !isNaN(H) && H >= Vn && H <= Kn && a(H), g(null);
  }, L = (H) => n.some((te) => te.startsWith(`${c}-${String(H + 1).padStart(2, "0")}`)), C = t === "dark", B = ke(), z = A(4, 8, B), Q = A(16, 20, B), I = A(10, 11, B), W = A(6, 8, B), N = A(12, 14, B), F = A(6, 10, B), O = A(12, 14, B), E = A(8, 12, B), J = A(10, 12, B), Z = A(6, 10, B), xe = A(2, 6, B), re = A(64, 80, B), ne = { padding: z }, $ = { width: Q, height: Q }, Y = { fontSize: I, paddingTop: W, paddingBottom: W }, K = { fontSize: N, paddingTop: F, paddingBottom: F }, T = { fontSize: O, paddingTop: E, paddingBottom: E }, G = { fontSize: J, padding: `${xe}px ${Z}px` }, q = C ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", pe = C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ R("div", { className: `border rounded-lg overflow-hidden w-full ${C ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ R("div", { className: `flex items-center justify-between px-3 py-2 border-b ${C ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? w(-1) : v(-1),
          style: ne,
          className: `rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ m(ms, { style: $ })
        }
      ),
      f === "days" ? /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => h("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${C ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(c, u).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ m(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(c),
          onChange: (H) => g(H.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (H) => H.target.select(),
          onBlur: D,
          onKeyDown: (H) => {
            H.key === "Enter" && (H.preventDefault(), D()), H.key === "Escape" && g(null);
          },
          style: { width: re },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? w(1) : v(1),
          style: ne,
          className: `rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ m(Sn, { style: $ })
        }
      )
    ] }),
    f === "months" ? /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ m("div", { className: "grid grid-cols-3 text-center", children: Tl.map((H, te) => /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: () => {
            d(te), h("days");
          },
          style: T,
          className: `relative font-medium transition-colors border-b ${te === u ? q : pe} ${C ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            H,
            L(te) && /* @__PURE__ */ m("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${te === u ? "bg-white" : C ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        H
      )) }),
      /* @__PURE__ */ m("div", { className: `text-center border-t ${C ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => {
            a(s.getFullYear()), d(s.getMonth()), h("days");
          },
          style: { paddingTop: F, paddingBottom: F, fontSize: N },
          className: `px-3 font-semibold rounded transition-colors ${C ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ R("div", { className: "grid grid-cols-7 text-center", children: [
      El.map((H) => /* @__PURE__ */ m("div", { style: Y, className: `font-semibold uppercase tracking-wider border-b ${C ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: H }, H)),
      k.map((H) => H.empty ? /* @__PURE__ */ m("div", {}, H.key) : /* @__PURE__ */ m(
        "button",
        {
          type: "button",
          onClick: () => x(H.key),
          style: K,
          className: `font-medium transition-colors border-b ${C ? "border-zinc-800/60" : "border-zinc-50"} ${y.has(H.key) ? q : C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: H.day
        },
        H.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ R("div", { className: `px-3 py-2 border-t ${C ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ R("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-1", children: n.map((H) => {
        const te = /* @__PURE__ */ new Date(H + "T00:00:00"), ae = te.getFullYear() === s.getFullYear() ? te.toLocaleString("default", { month: "short", day: "numeric" }) : te.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ R(
          "button",
          {
            type: "button",
            onClick: () => x(H),
            "aria-label": `Remove ${ae}`,
            style: G,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${C ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              ae,
              /* @__PURE__ */ m("span", { className: `leading-none ${C ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          H
        );
      }) })
    ] })
  ] });
}
function _f({
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
  const h = (v) => e instanceof Set ? e.has(v) : e.includes(v), p = ke(), g = A(12, 16, p), y = A(8, 12, p), x = A(12, 14, p), k = A(16, 20, p), w = r != null || i != null;
  return /* @__PURE__ */ R("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    w && /* @__PURE__ */ R("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ m("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((v) => {
            const D = h(v.id), L = /* @__PURE__ */ m(qi, { checked: D, size: k });
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(v.id),
                "aria-pressed": D,
                className: `ui-checklist-item ${D ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${y}px ${g}px`, fontSize: x },
                ...v.dataProps,
                children: [
                  u === "leading" && L,
                  v.leading != null && /* @__PURE__ */ m("span", { className: "ui-checklist-leading", children: v.leading }),
                  /* @__PURE__ */ m("span", { className: "ui-checklist-label", children: v.label }),
                  v.secondary != null && /* @__PURE__ */ m("span", { className: "ui-checklist-secondary", children: v.secondary }),
                  u === "trailing" && /* @__PURE__ */ m("span", { className: "ml-auto flex shrink-0", children: L })
                ]
              },
              v.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ m("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function Wf({
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
  const u = ke(), d = s ? 10 : A(12, 16, u), f = s ? 6 : A(8, 12, u), h = s ? 12 : A(12, 14, u), p = s ? 14 : A(16, 20, u);
  return /* @__PURE__ */ R("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ m("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ m("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((g) => {
            const y = e === g.id;
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => t(g.id),
                className: `ui-checklist-item ${y ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${f}px ${d}px`, fontSize: h },
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
const jf = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = Zt(), { refs: l, floatingStyles: c } = Ts({
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
          var k;
          if (i !== "visible") return {};
          const u = (k = a.elements.floating.ownerDocument) == null ? void 0 : k.defaultView;
          if (!u) return {};
          const d = a.rects.reference, f = Math.max(d.x, 0), h = Math.max(d.y, 0), p = Math.min(d.x + d.width, u.innerWidth), g = Math.min(d.y + d.height, u.innerHeight);
          if (p <= f || g <= h) return {};
          const y = r === "left" ? p - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? h - d.y : r === "bottom" ? g - (d.y + d.height) : 0;
          return { x: a.x + y, y: a.y + x };
        }
      },
      Ni(o),
      Mi({ padding: 8 }),
      zi({ padding: 8 }),
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
          const d = a.rects.floating.width, f = a.rects.floating.height, h = Math.max(8, Math.min(a.x, u.innerWidth - d - 8)), p = Math.max(8, Math.min(a.y, u.innerHeight - f - 8));
          return { x: h, y: p };
        }
      }
    ],
    whileElementsMounted: Cs
  });
  return We(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ R(Ke, { children: [
    !t && /* @__PURE__ */ m("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && pr(
      /* @__PURE__ */ m(
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
function Ml(n, e) {
  if (!e || !Se.isValidElement(n)) return {};
  const t = n.props;
  if (t["aria-label"] || t.title) return {};
  const r = t.children;
  if (typeof r == "string" ? r.trim().length > 0 : Array.isArray(r) ? r.some((s) => typeof s == "string" && s.trim().length > 0) : !1) return {};
  const o = e.split(`
`)[0].replace(/^•\s*/, "").trim().slice(0, 80);
  return o ? { "aria-label": o } : {};
}
const St = ({ content: n, children: e }) => {
  const t = ke(), r = A(10, 12, t), i = A(6, 6, t), o = A(10, 12, t), s = { padding: `${i}px ${r}px`, fontSize: o }, l = Qt(), c = Zt(), [a, u] = X(!1), [d, f] = X({ x: 0, y: 0 }), h = S(null), p = S(null), g = () => {
    if (!h.current) return;
    const k = h.current.getBoundingClientRect();
    f({ x: k.left + k.width / 2, y: k.top });
  };
  ee(() => () => {
    p.current && clearTimeout(p.current);
  }, []), ee(() => (a && c && (g(), c.addEventListener("scroll", g, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", g, !0)), [a]);
  const y = Ml(e, n), x = Object.keys(y).length > 0 ? Se.cloneElement(e, y) : e;
  return /* @__PURE__ */ R(
    "div",
    {
      ref: h,
      className: "inline-flex",
      onMouseEnter: () => {
        p.current && clearTimeout(p.current), g(), u(!0);
      },
      onMouseLeave: () => {
        p.current = setTimeout(() => u(!1), 60);
      },
      children: [
        x,
        a && pr(
          /* @__PURE__ */ R(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white pointer-events-none",
              style: { ...s, left: d.x, top: d.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                n.split(`
• `).map((k, w) => /* @__PURE__ */ m("div", { className: w > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: k }, w)),
                /* @__PURE__ */ m("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          l ?? document.body
        )
      ]
    }
  );
}, zl = 250;
function Al(n, e, t) {
  const [r, i] = Se.useState(null), [o, s] = Se.useState(!1), l = Se.useRef(null), c = Se.useRef(t);
  c.current = t;
  const a = Se.useCallback(() => {
    var f;
    const d = (f = e.current) == null ? void 0 : f[c.current];
    d && i({ left: d.offsetLeft, width: d.offsetWidth });
  }, [e]);
  Se.useLayoutEffect(() => {
    a();
  }, [t, a]), Se.useLayoutEffect(() => {
    const d = n.current;
    if (!d) return;
    const f = () => {
      s(!0), l.current && clearTimeout(l.current), l.current = setTimeout(() => s(!1), zl), a();
    }, h = new ResizeObserver(f);
    h.observe(d);
    for (const p of e.current ?? []) p && h.observe(p);
    return () => {
      h.disconnect(), l.current && (clearTimeout(l.current), l.current = null);
    };
  }, [n, e, a]);
  const u = Se.useMemo(
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
function Ln() {
  const n = ke(), e = Ee, t = e ? A(28, 40, n) : 28, r = e ? A(28, 40, n) : 28, i = e ? A(10, 14, n) : 10, o = e ? A(10, 14, n) : 10, s = e ? A(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Jf = Ee ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Rl = Ee ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", un = Ee ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Il = "hover:bg-red-950/50", qf = Ee ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Vf = "bg-blue-900/50 border-blue-700 text-blue-300", Kf = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", $l = Ee ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Yf = Ee ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Yi = Ee ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ol = "inline-flex rounded overflow-hidden border border-zinc-700", Dl = Ee ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", fn = ({ onClick: n, disabled: e, title: t, className: r = Rl, children: i }) => {
  const o = Ln();
  return /* @__PURE__ */ m(St, { content: t, children: /* @__PURE__ */ m("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Pl = {
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
  },
  blue: {
    wrap: "border-blue-200",
    pill: "bg-blue-950",
    active: "text-blue-50",
    idle: "text-blue-950/60 hover:text-blue-950 hover:bg-blue-950/10"
  },
  emerald: {
    wrap: "border-emerald-200",
    pill: "bg-emerald-950",
    active: "text-emerald-50",
    idle: "text-emerald-950/60 hover:text-emerald-950 hover:bg-emerald-950/10"
  }
}, Uf = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o, dense: s, variant: l = "chrome", theme: c = "light", tablist: a, ariaLabel: u }) => {
  const d = Ln(), f = s && !Ee ? 24 : d.control.height, h = lt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), p = Ee ? h : { padding: "0 12px", fontSize: 12, height: s ? 20 : 30 }, g = (v) => i ? i(v) : n === v, y = Se.useRef(null), x = Se.useRef([]), k = Math.max(0, e.findIndex((v) => g(v.v))), w = Al(y, x, k);
  if (l === "track") {
    const v = Pl[c];
    return /* @__PURE__ */ R(
      "div",
      {
        ref: y,
        role: a ? "tablist" : "group",
        "aria-label": u,
        className: `relative inline-flex items-center rounded border p-0.5 ${o ? "w-full" : ""} ${v.wrap}`,
        children: [
          w.style && /* @__PURE__ */ m(
            "span",
            {
              "aria-hidden": !0,
              className: `absolute rounded ${v.pill} ${w.motionClass}`,
              style: { ...w.style, top: 2, bottom: 2 }
            }
          ),
          e.map((D, L) => {
            const C = g(D.v);
            return /* @__PURE__ */ R(
              "button",
              {
                ref: (B) => {
                  x.current[L] = B;
                },
                ...D.dataProps,
                type: "button",
                disabled: r,
                onClick: () => t(D.v),
                title: D.title,
                role: a ? "tab" : void 0,
                "aria-selected": a ? C : void 0,
                "aria-pressed": a ? void 0 : C,
                "aria-label": D.ariaLabel ?? (D.l ? void 0 : D.title),
                style: p,
                className: `relative z-10 inline-flex cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${o ? "flex-1" : ""} ${C ? v.active : v.idle}`,
                children: [
                  D.icon,
                  D.l
                ]
              },
              D.v
            );
          })
        ]
      }
    );
  }
  return /* @__PURE__ */ R("div", { ref: y, className: `relative ${Ol} bg-zinc-800${o ? " w-full" : ""}`, children: [
    w.style && /* @__PURE__ */ m(
      "span",
      {
        "aria-hidden": !0,
        className: `absolute bg-blue-900/50 ${w.motionClass}`,
        style: { ...w.style, top: 0, bottom: 0 }
      }
    ),
    e.map((v, D) => {
      const L = g(v.v);
      return /* @__PURE__ */ R(
        "button",
        {
          ref: (C) => {
            x.current[D] = C;
          },
          ...v.dataProps,
          disabled: r,
          onClick: () => t(v.v),
          title: v.title,
          style: { ...d.control, height: f },
          className: `relative z-10 font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${L ? "text-blue-300" : "text-zinc-500 hover:bg-zinc-700"} ${v.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
          children: [
            v.icon,
            v.l
          ]
        },
        v.v
      );
    })
  ] });
}, Xf = ({ children: n }) => /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ m("span", { className: Ee ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ m("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Ll = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Bl = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Gf = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ R("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ m("span", { className: t ? Ll : Bl, children: n }),
  e
] }), Qf = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-0 ${t}`, children: [
  n,
  e && /* @__PURE__ */ m("div", { className: "ml-auto flex flex-wrap items-center justify-end gap-1", children: e })
] }), Zf = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => (
  // One unbreakable cluster: when a header's trailing wraps, the move pair and
  // the duplicate/delete pair stay together (no orphaned icons on a line).
  /* @__PURE__ */ R("div", { className: "flex items-center gap-1 shrink-0", children: [
    /* @__PURE__ */ m(fn, { onClick: () => r(-1), disabled: n, title: "Move up", className: un, children: /* @__PURE__ */ m(gs, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(fn, { onClick: () => r(1), disabled: n, title: "Move down", className: un, children: /* @__PURE__ */ m(ys, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m(fn, { onClick: e, disabled: n, title: "Duplicate", className: un, children: /* @__PURE__ */ m(Ti, { className: "w-2.5 h-2.5" }) }),
    /* @__PURE__ */ m("div", { className: Yi }),
    /* @__PURE__ */ m(fn, { onClick: t, disabled: n, title: "Delete", className: `${un} ${Il}`, children: /* @__PURE__ */ m(nr, { className: "w-2.5 h-2.5" }) })
  ] })
);
var Gr = Object.defineProperty, Fl = (n, e) => {
  let t = {};
  for (var r in n) Gr(t, r, {
    get: n[r],
    enumerable: !0
  });
  return Gr(t, Symbol.toStringTag, { value: "Module" }), t;
};
function Ne(n) {
  this.content = n;
}
Ne.prototype = {
  constructor: Ne,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Ne(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Ne(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Ne([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Ne(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Ne(i);
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
    return n = Ne.from(n), n.size ? new Ne(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Ne.from(n), n.size ? new Ne(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Ne.from(n);
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
Ne.from = function(n) {
  if (n instanceof Ne) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Ne(e);
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
class M {
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
    return new M(i, this.size + e.size);
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
    return new M(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? M.empty : e == 0 && t == this.content.length ? this : new M(this.content.slice(e, t));
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
    return i[e] = t, new M(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new M([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new M(this.content.concat(e), this.size + e.nodeSize);
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
      return M.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return M.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return M.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new M(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return M.empty;
    if (e instanceof M)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new M([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
M.empty = new M([], 0);
const Yn = { index: 0, offset: 0 };
function dn(n, e) {
  return Yn.index = n, Yn.offset = e, Yn;
}
function Tn(n, e) {
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
      if (!Tn(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Tn(n[r], e[r]))
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
    return this == e || this.type == e.type && Tn(this.attrs, e.attrs);
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
      return sr.none;
    if (e instanceof sr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
de.none = [];
class Kt extends Error {
}
class _ {
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
    return r && new _(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new _(Zi(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return _.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new _(M.fromJSON(e, t.content), r, i);
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
    return new _(e, r, i);
  }
}
_.empty = new _(M.empty, 0, 0);
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
function Hl(n, e, t) {
  if (t.openStart > n.depth)
    throw new Kt("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Kt("Inconsistent open depths");
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
      let { start: s, end: l } = _l(t, n);
      return mt(o, ro(n, s, l, e, r));
    }
  else return mt(o, Cn(n, e, r));
}
function no(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Kt("Cannot join " + e.type.name + " onto " + n.type.name);
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
    throw new Kt("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function ro(n, e, t, r, i) {
  let o = n.depth > i && lr(n, e, i + 1), s = r.depth > i && lr(t, r, i + 1), l = [];
  return jt(null, n, i, l), o && s && e.index(i) == t.index(i) ? (no(o, s), pt(mt(o, ro(n, e, t, r, i + 1)), l)) : (o && pt(mt(o, Cn(n, e, i + 1)), l), jt(e, t, i, l), s && pt(mt(s, Cn(t, r, i + 1)), l)), jt(r, null, i, l), new M(l);
}
function Cn(n, e, t) {
  let r = [];
  if (jt(null, n, t, r), n.depth > t) {
    let i = lr(n, e, t + 1);
    pt(mt(i, Cn(n, e, t + 1)), r);
  }
  return jt(e, null, t, r), new M(r);
}
function _l(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(M.from(i));
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
        return new Nn(this, e, r);
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
    let r = Qr.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      Qr.set(e, r = new Wl());
    let i = r.elts[r.i] = Yt.resolve(e, t);
    return r.i = (r.i + 1) % jl, i;
  }
}
class Wl {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const jl = 12, Qr = /* @__PURE__ */ new WeakMap();
class Nn {
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
const Jl = /* @__PURE__ */ Object.create(null);
let Nt = class cr {
  /**
  @internal
  */
  constructor(e, t, r, i = de.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || M.empty;
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
    return this.type == e && Tn(this.attrs, t || e.defaultAttrs || Jl) && de.sameSet(this.marks, r || de.none);
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
      return _.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new _(a, i.depth - s, o.depth - s);
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
    return Hl(this.resolve(e), this.resolve(t), r);
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
  canReplace(e, t, r = M.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), Zr(this.type.attrs, this.attrs, "node", this.type.name);
    let e = de.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      Zr(r.type.attrs, r.attrs, "mark", r.type.name), e = r.addToSet(e);
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
    let i = M.fromJSON(e, t.content);
    return e.nodeType(t.type).create(t.attrs, i, r);
  }
};
Nt.prototype.text = void 0;
class Mn extends Nt {
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
    return e == this.marks ? this : new Mn(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new Mn(this.type, this.attrs, e, this.marks);
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
function Zr(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
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
    let r = new ql(e, t);
    if (r.next == null)
      return gt.empty;
    let i = oo(r);
    r.next && r.err("Unexpected trailing text");
    let o = Ql(Gl(i));
    return Zl(o, r), o;
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
        return M.from(l.map((a) => a.createAndFill()));
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
class ql {
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
    e.push(Vl(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Vl(n) {
  let e = [];
  do
    e.push(Kl(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Kl(n) {
  let e = Xl(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Yl(n, e);
    else
      break;
  return e;
}
function ei(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Yl(n, e) {
  let t = ei(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = ei(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function Ul(n, e) {
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
function Xl(n) {
  if (n.eat("(")) {
    let e = oo(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = Ul(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Gl(n) {
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
function Ql(n) {
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
function Zl(n, e) {
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
function ao(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new tc(n, r, e[r]);
  return t;
}
class zn {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = ao(e, r.attrs), this.defaultAttrs = lo(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return new Nt(this, this.computeAttrs(e), M.from(t), de.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = M.from(t), this.checkContent(t), new Nt(this, this.computeAttrs(e), t, de.setFrom(r));
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
    if (e = this.computeAttrs(e), t = M.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(M.empty, !0);
    return o ? new Nt(this, e, t.append(o), de.setFrom(r)) : null;
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
    return t ? t.length ? t : de.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new zn(o, t, s));
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
function ec(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class tc {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? ec(e, t, r.validate) : r.validate;
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
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = ao(e, i.attrs), this.excluded = null;
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
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class nc {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Ne.from(e.nodes), t.marks = Ne.from(e.marks || {}), this.nodes = zn.compile(this.spec.nodes, this), this.marks = Bn.compile(this.spec.marks, this);
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
    this.nodeFromJSON = (i) => Nt.fromJSON(this, i), this.markFromJSON = (i) => de.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof zn) {
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
    return new Mn(r, r.defaultAttrs, e, de.setFrom(t));
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
function rc(n) {
  return n.tag != null;
}
function ic(n) {
  return n.style != null;
}
class Mt {
  /**
  Create a parser that targets the given schema, using the given
  parsing rules.
  */
  constructor(e, t) {
    this.schema = e, this.rules = t, this.tags = [], this.styles = [];
    let r = this.matchedStyles = [];
    t.forEach((i) => {
      if (rc(i))
        this.tags.push(i);
      else if (ic(i)) {
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
    return r.addAll(e, de.none, t.from, t.to), _.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (lc(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
    return e.cached.domParser || (e.cached.domParser = new Mt(e, Mt.schemaRules(e)));
  }
}
const uo = {
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
}, oc = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, fo = { ol: !0, ul: !0 }, Ut = 1, ar = 2, Jt = 4;
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
      let t = this.type.contentMatch.fillBefore(M.from(e));
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
    let t = M.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(M.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !uo.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
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
    fo.hasOwnProperty(s) && this.parser.normalizeLists && sc(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : oc.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (uo.hasOwnProperty(s))
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
function sc(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && fo.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function lc(n, e) {
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
const ho = 65535, po = Math.pow(2, 16);
function cc(n, e) {
  return n + e * po;
}
function li(n) {
  return n & ho;
}
function ac(n) {
  return (n - (n & ho)) / po;
}
const mo = 1, go = 2, xn = 4, yo = 8;
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
    return (this.delInfo & yo) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (mo | xn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (go | xn)) > 0;
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
class De {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && De.empty)
      return De.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = li(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + ac(e);
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
        let p = e == (t < 0 ? c : d) ? null : cc(l / 3, e - c), g = e == c ? go : e == d ? mo : xn;
        return (t < 0 ? e != c : e != d) && (g |= yo), new ur(h, g, p);
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
    return new De(this.ranges, !this.inverted);
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
    return e == 0 ? De.empty : new De(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
De.empty = new De([]);
class An {
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
    return new An(this._maps, this.mirror, e, t);
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
    let e = new An();
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
class Re {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return De.empty;
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
      if (o instanceof Kt)
        return ve.fail(o.message);
      throw o;
    }
  }
}
function Nr(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Nr(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return M.fromArray(r);
}
class ot extends Re {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new _(Nr(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
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
Re.jsonID("addMark", ot);
class je extends Re {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new _(Nr(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
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
Re.jsonID("removeMark", je);
class st extends Re {
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
    return ve.fromReplace(e, this.pos, this.pos + 1, new _(M.from(r), 0, t.isLeaf ? 0 : 1));
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
Re.jsonID("addNodeMark", st);
class yt extends Re {
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
    return ve.fromReplace(e, this.pos, this.pos + 1, new _(M.from(r), 0, t.isLeaf ? 0 : 1));
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
Re.jsonID("removeNodeMark", yt);
class we extends Re {
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
    return new De([this.from, this.to - this.from, this.slice.size]);
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
      let t = this.slice.size + e.slice.size == 0 ? _.empty : new _(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new we(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? _.empty : new _(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
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
    return new we(t.from, t.to, _.fromJSON(e, t.slice), !!t.structure);
  }
}
we.MAP_BIAS = 1;
Re.jsonID("replace", we);
class Te extends Re {
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
    return new De([
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
    return new Te(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new Te(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new Te(t.from, t.to, t.gapFrom, t.gapTo, _.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Re.jsonID("replaceAround", Te);
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
function uc(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let d = c.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), h = Math.min(a + c.nodeSize, t), p = r.addToSet(d);
      for (let g = 0; g < d.length; g++)
        d[g].isInSet(p) || (s && s.to == f && s.mark.eq(d[g]) ? s.to = h : i.push(s = new je(f, h, d[g])));
      l && l.to == f ? l.to = h : o.push(l = new ot(f, h, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function fc(n, e, t, r) {
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
function Mr(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, d = r.matchType(a.type);
    if (!d)
      s.push(new we(l, u, _.empty));
    else {
      r = d;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new je(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(a.text); )
          p || (p = new _(M.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new we(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(M.empty, !0);
    n.replace(l, l, new _(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function dc(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Lt(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !dc(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function hc(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = M.empty, d = 0;
  for (let p = o, g = !1; p > t; p--)
    g || r.index(p) > 0 ? (g = !0, u = M.from(r.node(p).copy(u)), d++) : c--;
  let f = M.empty, h = 0;
  for (let p = o, g = !1; p > t; p--)
    g || i.after(p + 1) < i.end(p) ? (g = !0, f = M.from(i.node(p).copy(f)), h++) : a++;
  n.step(new Te(c, a, s, l, new _(u.append(f), d, h), u.size - d, !0));
}
function xo(n, e, t = null, r = n) {
  let i = pc(n, e), o = i && mc(r, e);
  return o ? i.map(ci).concat({ type: e, attrs: t }).concat(o.map(ci)) : null;
}
function ci(n) {
  return { type: n, attrs: null };
}
function pc(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function mc(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function gc(n, e, t) {
  let r = M.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = M.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new Te(i, o, i, o, new _(r, 0, 0), t.length, !0));
}
function yc(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && xc(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? a = !1 : !h && p && (a = !0);
      }
      a === !1 && wo(n, s, l, o), Mr(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new Te(d, f, d + 1, f - 1, new _(M.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && bo(n, s, l, o), !1;
    }
  });
}
function bo(n, e, t, r) {
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
function wo(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function xc(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function bc(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new Te(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new _(M.from(s), 0, 0), 1, !0));
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
    let g = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !g.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function wc(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = M.empty, s = M.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = M.from(i.node(l).copy(o));
    let u = r && r[a];
    s = M.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new we(e, e, new _(o.append(s), t, t), !0));
}
function xt(n, e) {
  let t = n.resolve(e), r = t.index();
  return vo(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function vc(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function vo(n, e) {
  return !!(n && e && !n.isLeaf && vc(n, e));
}
function Fn(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && vo(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function kc(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    wo(n, u.node(), u.before(), l);
  }
  s.inlineContent && Mr(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new we(a, c.map(e + t, -1), _.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    bo(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Sc(n, e, t) {
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
function Hn(n, e, t = e, r = _.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return ko(i, o, r) ? new we(e, t, r) : new Ec(i, o, r).fit();
}
function ko(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class Ec {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = M.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = M.from(e.node(i).copy(this.placed));
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
    let c = new _(o, s, l);
    return e > -1 ? new Te(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new we(r.pos, i.pos, c) : null;
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
          if (t == 1 && (s ? a.matchType(s.type) || (d = a.fillBefore(M.from(s), !1)) : o && c.compatibleContent(o.type)))
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
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new _(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Xn(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new _(_t(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new _(_t(e, t, 1), t, r);
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
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; a < l.childCount; ) {
      let g = l.child(a), y = d.matchType(g.type);
      if (!y)
        break;
      a++, (a > 1 || c == 0 || g.content.size) && (d = y, u.push(So(g.mark(f.allowedMarks(g.marks)), a == 1 ? c : 0, a == l.childCount ? h : -1)));
    }
    let p = a == l.childCount;
    p || (h = -1), this.placed = Wt(this.placed, t, M.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let g = 0, y = l; g < h; g++) {
      let x = y.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), y = x.content;
    }
    this.unplaced = p ? e == 0 ? _.empty : new _(_t(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new _(_t(s.content, e, a), s.openStart, s.openEnd);
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
    i.match = i.match.matchType(e), this.placed = Wt(this.placed, this.depth, M.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(M.empty, !0);
    t.childCount && (this.placed = Wt(this.placed, this.frontier.length, t));
  }
}
function _t(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(_t(n.firstChild.content, e - 1, t)));
}
function Wt(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Wt(n.lastChild.content, e - 1, t)));
}
function Xn(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function So(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, So(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(M.empty, !0)))), n.copy(r);
}
function Gn(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !Tc(t, o.content, s) ? l : null;
}
function Tc(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function Cc(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function Nc(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (ko(i, o, r))
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
    let h = a[f], p = Cc(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = a[h];
    if (p)
      for (let g = 0; g < s.length; g++) {
        let y = s[(g + c) % s.length], x = !0;
        y < 0 && (x = !1, y = -y);
        let k = i.node(y - 1), w = i.index(y - 1);
        if (k.canReplaceWith(w, w, p.type, p.marks))
          return n.replace(i.before(y), x ? o.after(y) : t, new _(Eo(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Eo(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Eo(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(M.empty, !0));
  }
  return n;
}
function Mc(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Sc(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new _(M.from(r), 0, 0));
}
function zc(n, e, t) {
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
class zt extends Re {
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
    return ve.fromReplace(e, this.pos, this.pos + 1, new _(M.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return De.empty;
  }
  invert(e) {
    return new zt(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new zt(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new zt(t.pos, t.attr, t.value);
  }
}
Re.jsonID("attr", zt);
class Xt extends Re {
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
    return De.empty;
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
Re.jsonID("docAttr", Xt);
let It = class extends Error {
};
It = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
It.prototype = Object.create(Error.prototype);
It.prototype.constructor = It;
It.prototype.name = "TransformError";
class Ac {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new An();
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
  replace(e, t = e, r = _.empty) {
    let i = Hn(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new _(M.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, _.empty);
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
    return Nc(this, e, t, r), this;
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
    return Mc(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return zc(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return hc(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return kc(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return gc(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return yc(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return bc(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new zt(e, t, r)), this;
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
    return wc(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return uc(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return fc(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Mr(this, e, t, r), this;
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
    this.$anchor = e, this.$head = t, this.ranges = r || [new Rc(e.min(t), e.max(t))];
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
  replace(e, t = _.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? _.empty : t), l == 0 && fi(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
    let i = e.parent.inlineContent ? new Oe(e) : Et(e.node(0), e.parent, e.pos, e.index(), t, r);
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
    return Oe.between(this.$anchor, this.$head).getBookmark();
  }
}
ge.prototype.visible = !0;
class Rc {
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
class Oe extends ge {
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
    return new Oe(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = _.empty) {
    if (super.replace(e, t), t == _.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof Oe && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new _n(this.anchor, this.head);
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
    return new Oe(e.resolve(t.anchor), e.resolve(t.head));
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
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (ge.findFrom(e, -r, !0) || ge.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new Oe(e, t);
  }
}
ge.jsonID("text", Oe);
class _n {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new _n(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return Oe.between(e.resolve(this.anchor), e.resolve(this.head));
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
    return new _(M.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof he && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new zr(this.anchor);
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
class zr {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new _n(r, r) : new zr(r);
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
  replace(e, t = _.empty) {
    if (t == _.empty) {
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
    return Ic;
  }
}
ge.jsonID("all", Je);
const Ic = {
  map() {
    return this;
  },
  resolve(n) {
    return new Je(n);
  }
};
function Et(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return Oe.create(n, t);
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
  if (!(i instanceof we || i instanceof Te))
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
const Co = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function No(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Mo = (n, e, t) => {
  let r = No(n, t);
  if (!r)
    return !1;
  let i = Ar(r);
  if (!i) {
    let s = r.blockRange(), l = s && Lt(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Lo(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && ($t(o, "end") || he.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Hn(n.doc, r.before(s), r.after(s), _.empty);
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
}, $c = (n, e, t) => {
  let r = No(n, t);
  if (!r)
    return !1;
  let i = Ar(r);
  return i ? zo(n, i, e) : !1;
}, Oc = (n, e, t) => {
  let r = Ro(n, t);
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
  let a = Hn(n.doc, o, c, _.empty);
  if (!a || a.from != o || a instanceof we && a.slice.size >= c - o)
    return !1;
  if (t) {
    let u = n.tr.step(a);
    u.setSelection(Oe.create(u.doc, o)), t(u.scrollIntoView());
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
const Ao = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Ar(r);
  }
  let s = o && o.nodeBefore;
  return !s || !he.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(he.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Ar(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function Ro(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Io = (n, e, t) => {
  let r = Ro(n, t);
  if (!r)
    return !1;
  let i = Rr(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Lo(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && ($t(o, "start") || he.isSelectable(o))) {
    let s = Hn(n.doc, r.before(), r.after(), _.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection($t(o, "start") ? ge.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : he.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, $o = (n, e, t) => {
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
const Dc = (n, e) => {
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
}, Pc = (n, e) => {
  let t = n.selection, r;
  if (t instanceof he) {
    if (t.node.isTextblock || !xt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Fn(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, Lc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Lt(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Oo = (n, e) => {
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
const Bc = (n, e) => {
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
}, Do = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof Je || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = Ir(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(Oe.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Po = (n, e) => {
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
function Fc(n) {
  return (e, t) => {
    if (e.selection instanceof he && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !Qe(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof Oe || e.selection instanceof Je) && r.deleteSelection();
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
      let h = r.mapping.slice(o), p = h.map(i.before(l)), g = r.doc.resolve(p);
      c && i.node(l - 1).canReplaceWith(g.index(), g.index() + 1, c) && r.setNodeMarkup(h.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const Hc = Fc(), _c = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(he.create(n.doc, i))), !0);
};
function Wc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || xt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Lo(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && Wc(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, p = M.empty;
      for (let x = s.length - 1; x >= 0; x--)
        p = M.from(s[x].create(null, p));
      p = M.from(i.copy(p));
      let g = n.tr.step(new Te(e.pos - 1, h, e.pos, h, new _(p, 1, 0), s.length, !0)), y = g.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && xt(g.doc, y.pos) && g.join(y.pos), t(g.scrollIntoView());
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
    let g = o, y = 1;
    for (; !g.isTextblock; g = g.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, g.content)) {
      if (t) {
        let x = M.empty;
        for (let w = p.length - 1; w >= 0; w--)
          x = M.from(p[w].copy(x));
        let k = n.tr.step(new Te(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new _(x, p.length, 0), 0, !0));
        t(k.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Bo(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(Oe.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const jc = Bo(-1), Jc = Bo(1);
function qc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && xo(s, n, e);
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
$r(Co, Mo, Ao);
$r(Co, Io, $o);
$r(Oo, Do, Po, Hc);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Vc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Kc(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Kc(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Nn(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Nn(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = xo(o, t, r, e);
  return l ? (n && Yc(n, e, l, i, t), !0) : !1;
}
function Yc(n, e, t, r, i) {
  let o = M.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = M.from(t[u].type.create(t[u].attrs, o));
  n.step(new Te(e.start - (r ? 2 : 0), e.end, e.start, e.end, new _(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && Qe(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function Uc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Xc(e, t, n, o) : Gc(e, t, o) : !0 : !1;
  };
}
function Xc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Te(o - 1, s, o, s, new _(M.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Nn(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Lt(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return xt(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Gc(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, g = t.startIndex; p > g; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? M.empty : M.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new Te(d - (l ? 1 : 0), f + (c ? 1 : 0), d + 1, f - 1, new _((l ? M.empty : M.from(i.copy(M.empty))).append(c ? M.empty : M.from(i.copy(M.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Qc(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = M.from(a ? n.create() : null), d = new _(M.from(n.create(null, M.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new Te(f - (a ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
function Fo(n) {
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
var Zc = class Ho {
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
      ...Object.fromEntries(Object.entries(r).map(([f, h]) => [f, (...g) => {
        const y = this.buildProps(a, t), x = h(...g)(y);
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
    const e = Ho.createFakeChain();
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
      state: Fo({
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
const ea = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  if (!n.isDestroyed) {
    var t;
    e.dom.blur(), (t = window) === null || t === void 0 || (t = t.getSelection()) === null || t === void 0 || t.removeAllRanges();
  }
}), !0), ta = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), na = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText) return;
      const { doc: a, mapping: u } = e, d = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), h = d.blockRange(f);
      if (!h) return;
      const p = Lt(h);
      if (l.type.isTextblock) {
        const { defaultType: g } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, g);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, ra = (n) => (e) => n(e), ia = () => ({ state: n, dispatch: e }) => Do(n, e), oa = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Be(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, sa = () => ({ tr: n, dispatch: e }) => {
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
function Ae(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n]) throw Error(`There is no node type named '${n}'. Maybe you forgot to add the extension?`);
    return e.nodes[n];
  }
  return n;
}
const la = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Ae(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1) if (o.node(s).type === i) {
    if (r) {
      const l = o.before(s), c = o.after(s);
      e.delete(l, c).scrollIntoView();
    }
    return !0;
  }
  return !1;
}, ca = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, aa = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, pi = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end()) return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return aa(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, ua = (n, e, t) => ({
  from: pi(n, t, "left"),
  to: pi(e, t, "right")
}), fa = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty) return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = ua(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Be.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, da = () => ({ commands: n }) => n.keyboardShortcut("Enter"), ha = () => ({ state: n, dispatch: e }) => Bc(n, e);
function pa(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Rn(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : pa(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function _o(n, e, t = {}) {
  return n.find((r) => r.type === e && Rn(Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])), t));
}
function mi(n, e, t = {}) {
  return !!_o(n, e, t);
}
function Wo(n, e, t) {
  if (!n || !e) return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e)) return;
  if (!t) {
    const c = r.node.marks.find((a) => a.type === e);
    c && (t = c.attrs);
  }
  if (!_o([...r.node.marks], e, t)) return;
  let i = r.index, o = n.start() + r.offset, s = i + 1, l = o + r.node.nodeSize;
  for (; i > 0 && mi([...n.parent.child(i - 1).marks], e, t); )
    i -= 1, o -= n.parent.child(i).nodeSize;
  for (; s < n.parent.childCount && mi([...n.parent.child(s).marks], e, t); )
    l += n.parent.child(s).nodeSize, s += 1;
  return {
    from: o,
    to: l
  };
}
function ct(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n]) throw Error(`There is no mark type named '${n}'. Maybe you forgot to add the extension?`);
    return e.marks[n];
  }
  return n;
}
const ma = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = ct(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const d = Wo(c, o, e);
    if (d && d.from <= a && d.to >= u) {
      const f = Be.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, ga = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1) if (t[r](e)) return !0;
  return !1;
};
function jo(n) {
  return n instanceof Be;
}
function ht(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function ya(n, e = null) {
  if (!e) return null;
  const t = Ct.atStart(n), r = Ct.atEnd(n);
  if (e === "start" || e === !0) return t;
  if (e === "end") return r;
  const i = t.from, o = r.to;
  return e === "all" ? Be.create(n, ht(0, i, o), ht(n.content.size, i, o)) : Be.create(n, ht(e, i, o), ht(e, i, o));
}
function gi() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function In() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function xa() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
const ba = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (In() || gi()) && r.dom.focus(), xa() && !In() && !gi() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1) return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !jo(t.state.selection))
    return s(), !0;
  const l = ya(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, wa = (n, e) => (t) => n.every((r, i) => e(r, {
  ...t,
  index: i
})), va = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt({
  from: t.selection.from,
  to: t.selection.to
}, n, e), Jo = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Jo(r);
  }
  return n;
};
function mn(n) {
  if (typeof window > "u") throw new Error("[tiptap error]: there is no window object available, so this function cannot be used");
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Jo(t);
}
function qo(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Ot(n, e, t) {
  if (qo(n)) return n;
  const r = typeof n == "object" && n !== null;
  t = {
    slice: !0,
    parseOptions: {},
    ...t
  };
  const i = typeof n == "string";
  if (r) try {
    if (Array.isArray(n) && n.length > 0) return M.fromArray(n.map((s) => e.nodeFromJSON(s)));
    const o = e.nodeFromJSON(n);
    return t.errorOnInvalidContent && o.check(), o;
  } catch (o) {
    if (t.errorOnInvalidContent) throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
    return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Ot("", e, t);
  }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const c = new nc({
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
      if (t.slice ? Mt.fromSchema(c).parseSlice(mn(n), t.parseOptions) : Mt.fromSchema(c).parse(mn(n), t.parseOptions), t.errorOnInvalidContent && s) throw new Error("[tiptap error]: Invalid HTML content", { cause: /* @__PURE__ */ new Error(`Invalid element found: ${l}`) });
    }
    const o = Mt.fromSchema(e);
    return t.slice ? o.parseSlice(mn(n), t.parseOptions).content : o.parse(mn(n), t.parseOptions);
  }
  return Ot("", e, t);
}
function Vo(n) {
  return !("type" in n);
}
function Ko(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e) return;
  const i = n.steps[r];
  if (!(i instanceof we || i instanceof Te)) return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Ct.near(n.doc.resolve(s), t));
}
const ka = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError) try {
      Ot(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: !0
      });
    } catch (y) {
      c(y);
    }
    try {
      var s;
      l = Ot(e, o.schema, {
        parseOptions: a,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) !== null && s !== void 0 ? s : o.options.enableContentCheck
      });
    } catch (y) {
      return c(y), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? {
      from: n,
      to: n
    } : {
      from: n.from,
      to: n.to
    }, f = !0, h = !0;
    const p = Vo(l) ? l.content : [l];
    if (p.forEach((y) => {
      y.check(), f = f ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === d && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, d += 1);
    }
    let g;
    if (f)
      Array.isArray(e) ? g = e.map((y) => y.text || "").join("") : qo(e) ? g = p.map((y) => {
        var x;
        return (x = y.text) !== null && x !== void 0 ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? g = e.text : g = e, r.insertText(g, u, d);
    else {
      g = M.from(p);
      const y = r.doc.resolve(u), x = y.node(), k = y.parentOffset === 0, w = x.isText || x.isTextblock, v = x.content.size > 0;
      k && w && v && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
    }
    t.updateSelection && Ko(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", {
      from: u,
      text: g
    }), t.applyPasteRules && r.setMeta("applyPasteRules", {
      from: u,
      text: g
    });
  }
  return !0;
};
function Yo(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs()) return t;
  }
  return null;
}
const Sa = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = Yo(c.parent.contentMatchAt(c.index()));
  if (!a) return !1;
  const u = Object.keys(a.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let f;
  if (s) {
    const h = Ot(s, r.schema);
    f = a.createAndFill(d, h);
  } else f = a.createAndFill(d);
  return f ? (t && (e.insert(c.pos, f), l && Ko(e, e.steps.length - 1, -1)), !0) : !1;
}, Ea = () => ({ state: n, dispatch: e }) => Dc(n, e), Ta = () => ({ state: n, dispatch: e }) => Pc(n, e), Ca = () => ({ state: n, dispatch: e }) => Mo(n, e), Na = () => ({ state: n, dispatch: e }) => Io(n, e), Ma = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Fn(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, za = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Fn(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Aa = () => ({ state: n, dispatch: e }) => $c(n, e), Ra = () => ({ state: n, dispatch: e }) => Oc(n, e);
function Uo() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Ia(n) {
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
      In() || Uo() ? s = !0 : i = !0;
    else throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
const $a = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Ia(n).split(/-(?!$)/), s = o.find((a) => ![
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
function Or(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Ae(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (u, d) => {
    if (u.isText) return;
    const f = Math.max(r, d), h = Math.min(i, d + u.nodeSize);
    l.push({
      node: u,
      from: f,
      to: h
    });
  });
  const c = i - r, a = l.filter((u) => s ? s.name === u.node.type.name : !0).filter((u) => Rn(u.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((u, d) => u + d.to - d.from, 0) >= c;
}
const Oa = (n, e = {}) => ({ state: t, dispatch: r }) => Or(t, Ae(n, t.schema), e) ? Lc(t, r) : !1, Da = () => ({ state: n, dispatch: e }) => Po(n, e), Pa = (n) => ({ state: e, dispatch: t }) => {
  const r = Ae(n, e.schema);
  return Uc(r)(e, t);
}, La = () => ({ state: n, dispatch: e }) => Oo(n, e);
function Xo(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function yi(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
const Ba = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Xo(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ae(n, r.schema)), l === "mark" && (s = ct(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, d) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(d, void 0, yi(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(d, d + u.nodeSize, s.create(yi(f.attrs, e))));
      });
    });
  }), c;
}, Fa = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), Ha = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Is(n.doc);
    n.setSelection(t);
  }
  return !0;
}, _a = () => ({ state: n, dispatch: e }) => Ao(n, e), Wa = () => ({ state: n, dispatch: e }) => $o(n, e), ja = () => ({ state: n, dispatch: e }) => _c(n, e), Ja = () => ({ state: n, dispatch: e }) => Jc(n, e), qa = () => ({ state: n, dispatch: e }) => jc(n, e);
function Va(n, e, t = {}, r = {}) {
  return Ot(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
const Ka = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Va(n, i.schema, r, { errorOnInvalidContent: e ?? i.options.enableContentCheck });
    if (s) {
      const u = Vo(a) ? a.content : [a];
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
function Ya(n, e) {
  const t = ct(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Ua(n, e) {
  const t = new Ac(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Xa(n, e) {
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
function Dr(n) {
  return (e) => Xa(e.$from, n);
}
function Gt(n, e, t) {
  return n.config[e] === void 0 && n.parent ? Gt(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? Gt(n.parent, e, t) : null
  }) : n.config[e];
}
function Ga(n) {
  return typeof n == "function";
}
function dr(n, e = void 0, ...t) {
  return Ga(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Go(n) {
  return {
    baseExtensions: n.filter((e) => e.type === "extension"),
    nodeExtensions: n.filter((e) => e.type === "node"),
    markExtensions: n.filter((e) => e.type === "mark")
  };
}
function Qa(n, e, t) {
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
      var h;
      l += c == null || (h = c.text) === null || h === void 0 ? void 0 : h.slice(Math.max(r, a) - a, i - a);
    }
  }), l;
}
function Za(n) {
  return Object.fromEntries(Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText]));
}
function eu(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function tu(n) {
  const e = eu(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((i, o) => o !== r).some((i) => t.oldRange.from >= i.oldRange.from && t.oldRange.to <= i.oldRange.to && t.newRange.from >= i.newRange.from && t.newRange.to <= i.newRange.to));
}
function nu(n) {
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
  }), tu(r);
}
function bn(n, e, t) {
  return Object.fromEntries(Object.entries(t).filter(([r]) => {
    const i = n.find((o) => o.type === e && o.name === r);
    return i ? i.attribute.keepOnSplit : !1;
  }));
}
function ru(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? ct(e, n.schema) : null;
  if (r) return !!(n.storedMarks || n.selection.$from.marks()).filter((u) => o ? o.name === u.type.name : !0).find((u) => Rn(u.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: u, $to: d }) => {
    const f = u.pos, h = d.pos;
    n.doc.nodesBetween(f, h, (p, g) => {
      if (o && p.inlineContent && !p.type.allowsMarkType(o)) return !1;
      if (!p.isText && !p.marks.length) return;
      const y = Math.max(f, g), x = Math.min(h, g + p.nodeSize), k = x - y;
      s += k, l.push(...p.marks.map((w) => ({
        mark: w,
        from: y,
        to: x
      })));
    });
  }), s === 0) return !1;
  const c = l.filter((u) => o ? o.name === u.mark.type.name : !0).filter((u) => Rn(u.mark.attrs, t, { strict: !1 })).reduce((u, d) => u + d.to - d.from, 0), a = l.filter((u) => o ? u.mark.type !== o && u.mark.type.excludes(o) : !0).reduce((u, d) => u + d.to - d.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function Zn(n, e) {
  const { nodeExtensions: t } = Go(e), r = t.find((o) => o.name === n);
  if (!r) return !1;
  const i = dr(Gt(r, "group", {
    name: r.name,
    options: r.options,
    storage: r.storage
  }));
  return typeof i != "string" ? !1 : i.split(" ").includes("list");
}
function Qo(n, { checkChildren: e = !0, ignoreWhitespace: t = !1 } = {}) {
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
      i !== !1 && (Qo(o, {
        ignoreWhitespace: t,
        checkChildren: e
      }) || (i = !1));
    }), i;
  }
  return !1;
}
function iu(n, e, t) {
  const { selection: r } = e;
  let i = null;
  if (jo(r) && (i = r.$cursor), i) {
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
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((g) => g.type.excludes(t));
        a = h && p;
      }
      return !a;
    }), a;
  });
}
const ou = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = ct(n, r.schema);
  if (i)
    if (s) {
      const a = Ya(r, c);
      t.addStoredMark(c.create({
        ...a,
        ...e
      }));
    } else l.forEach((a) => {
      const u = a.$from.pos, d = a.$to.pos;
      r.doc.nodesBetween(u, d, (f, h) => {
        const p = Math.max(h, u), g = Math.min(h + f.nodeSize, d);
        f.marks.find((y) => y.type === c) ? f.marks.forEach((y) => {
          c === y.type && t.addMark(p, g, c.create({
            ...y.attrs,
            ...e
          }));
        }) : t.addMark(p, g, c.create(e));
      });
    });
  return iu(r, t, c);
}, su = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), lu = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Ae(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => hi(o, {
    ...s,
    ...e
  })(t) ? !0 : l.clearNodes()).command(({ state: l }) => hi(o, {
    ...s,
    ...e
  })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, cu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = ht(n, 0, r.content.size), o = At.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, au = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, uu = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? {
      from: n,
      to: n
    } : n, s = Be.atStart(r).from, l = Be.atEnd(r).to, c = ht(i, s, l), a = ht(o, s, l), u = Be.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, fu = (n) => ({ state: e, dispatch: t }) => {
  const r = Ae(n, e.schema);
  return Qc(r)(e, t);
};
function xi(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
const du = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = bn(a, l.node().type.name, l.node().attrs);
  if (o instanceof At && o.node.isBlock)
    return !l.parentOffset || !Qe(s, l.pos) ? !1 : (r && (n && xi(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock) return !1;
  const d = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : Yo(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [{
    type: f,
    attrs: u
  }] : void 0, p = Qe(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && Qe(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [{
    type: f,
    attrs: u
  }] : void 0), r) {
    if (p && (o instanceof Be && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const g = e.mapping.map(l.before()), y = e.doc.resolve(g);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && xi(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, hu = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  const s = Ae(n, r.schema), { $from: l, $to: c } = r.selection, a = r.selection.node;
  if (a && a.isBlock || l.depth < 2 || !l.sameParent(c)) return !1;
  const u = l.node(-1);
  if (u.type !== s) return !1;
  const d = o.extensionManager.attributes;
  if (l.parent.content.size === 0 && l.node(-1).childCount === l.indexAfter(-1)) {
    if (l.depth === 2 || l.node(-3).type !== s || l.index(-2) !== l.node(-2).childCount - 1) return !1;
    if (i) {
      var f;
      let x = M.empty;
      const k = l.index(-1) ? 1 : l.index(-2) ? 2 : 3;
      for (let B = l.depth - k; B >= l.depth - 3; B -= 1) x = M.from(l.node(B).copy(x));
      const w = l.indexAfter(-1) < l.node(-2).childCount ? 1 : l.indexAfter(-2) < l.node(-3).childCount ? 2 : 3, v = {
        ...bn(d, l.node().type.name, l.node().attrs),
        ...e
      }, D = ((f = s.contentMatch.defaultType) === null || f === void 0 ? void 0 : f.createAndFill(v)) || void 0;
      x = x.append(M.from(s.createAndFill(null, D) || void 0));
      const L = l.before(l.depth - (k - 1));
      t.replace(L, l.after(-w), new _(x, 4 - k, 0));
      let C = -1;
      t.doc.nodesBetween(L, t.doc.content.size, (B, z) => {
        if (C > -1) return !1;
        B.isTextblock && B.content.size === 0 && (C = z + 1);
      }), C > -1 && t.setSelection(Be.near(t.doc.resolve(C))), t.scrollIntoView();
    }
    return !0;
  }
  const h = c.pos === l.end() ? u.contentMatchAt(0).defaultType : null, p = {
    ...bn(d, u.type.name, u.attrs),
    ...e
  }, g = {
    ...bn(d, l.node().type.name, l.node().attrs),
    ...e
  };
  t.delete(l.pos, c.pos);
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
  if (!Qe(t.doc, l.pos, 2)) return !1;
  if (i) {
    const { selection: x, storedMarks: k } = r, { splittableMarks: w } = o.extensionManager, v = k || x.$to.parentOffset && x.$from.marks();
    if (t.split(l.pos, 2, y).scrollIntoView(), !v || !i) return !0;
    const D = v.filter((L) => w.includes(L.type.name));
    t.ensureMarks(D);
  }
  return !0;
};
function bi(n) {
  return !n || n === "1" ? null : n;
}
function Zo(n, e) {
  return bi(n) === bi(e);
}
const er = (n, e) => {
  const t = Dr((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && xt(n.doc, t.pos)) || !Zo(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, tr = (n, e) => {
  const t = Dr((o) => o.type === e)(n.selection);
  if (!t) return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0) return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && xt(n.doc, r)) || !Zo(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function pu(n) {
  const e = n.doc, t = e.firstChild;
  if (!t) return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Be.between(r, i);
}
const mu = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Ae(n, s.schema), p = Ae(e, s.schema), { selection: g, storedMarks: y } = s, { $from: x, $to: k } = g, w = x.blockRange(k), v = y || g.$to.parentOffset && g.$from.marks();
  if (!w) return !1;
  const D = Dr((N) => Zn(N.type.name, d))(g), L = g.from === 0 && g.to === s.doc.content.size, C = s.doc.content.content, B = C.length === 1 ? C[0] : null, z = L && B && Zn(B.type.name, d) ? {
    node: B,
    pos: 0
  } : null, Q = D ?? z, I = !!D && w.depth >= 1 && w.depth - D.depth <= 1, W = !!z;
  if ((I || W) && Q) {
    if (Q.node.type === h)
      return L && W ? c().command(({ tr: N, dispatch: F }) => {
        const O = pu(N);
        return O ? (N.setSelection(O), F && F(N), !0) : !1;
      }).liftListItem(p).run() : a.liftListItem(p);
    if (Zn(Q.node.type.name, d) && h.validContent(Q.node.content)) return c().command(() => (o.setNodeMarkup(Q.pos, h), !0)).command(() => er(o, h)).command(() => tr(o, h)).run();
  }
  return !t || !v || !l ? c().command(() => u().wrapInList(h, r) ? !0 : a.clearNodes()).wrapInList(h, r).command(() => er(o, h)).command(() => tr(o, h)).run() : c().command(() => {
    const N = u().wrapInList(h, r), F = v.filter((O) => f.includes(O.type.name));
    return o.ensureMarks(F), N ? !0 : a.clearNodes();
  }).wrapInList(h, r).command(() => er(o, h)).command(() => tr(o, h)).run();
}, gu = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = ct(n, r.schema);
  return ru(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, yu = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Ae(n, r.schema), s = Ae(e, r.schema), l = Or(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, {
    ...c,
    ...t
  });
}, xu = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Ae(n, t.schema);
  return Or(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, bu = () => ({ state: n, dispatch: e }) => {
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
}, wu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
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
}, vu = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { extendEmptyMarkRange: o = !1 } = e, { selection: s } = t, l = ct(n, r.schema), { $from: c, empty: a, ranges: u } = s;
  if (!i) return !0;
  if (a && o) {
    var d;
    let { from: f, to: h } = s;
    const p = Wo(c, l, (d = c.marks().find((g) => g.type === l)) === null || d === void 0 ? void 0 : d.attrs);
    p && (f = p.from, h = p.to), t.removeMark(f, h, l);
  } else u.forEach((f) => {
    t.removeMark(f.$from.pos, f.$to.pos, l);
  });
  return t.removeStoredMark(l), !0;
}, ku = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText) return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, Su = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Xo(typeof n == "string" ? n : n.name, r.schema);
  if (!l) return !1;
  l === "node" && (o = Ae(n, r.schema)), l === "mark" && (s = ct(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    const u = a.$from.pos, d = a.$to.pos;
    let f, h, p, g;
    t.selection.empty ? r.doc.nodesBetween(u, d, (y, x) => {
      o && o === y.type && (c = !0, p = Math.max(x, u), g = Math.min(x + y.nodeSize, d), f = x, h = y);
    }) : r.doc.nodesBetween(u, d, (y, x) => {
      x < u && o && o === y.type && (c = !0, p = Math.max(x, u), g = Math.min(x + y.nodeSize, d), f = x, h = y), x >= u && x <= d && (o && o === y.type && (c = !0, i && t.setNodeMarkup(x, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((k) => {
        if (s === k.type && (c = !0, i)) {
          const w = Math.max(x, u), v = Math.min(x + y.nodeSize, d);
          t.addMark(w, v, s.create({
            ...k.attrs,
            ...e
          }));
        }
      }));
    }), h && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...h.attrs,
      ...e
    }), s && h.marks.length && h.marks.forEach((y) => {
      s === y.type && i && t.addMark(p, g, s.create({
        ...y.attrs,
        ...e
      }));
    }));
  }), c;
}, Eu = new qe("__tiptap_decorations__"), Tu = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(Eu, {
  type: "force",
  name: n
}), !0), Cu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ae(n, t.schema);
  return qc(i, e)(t, r);
}, Nu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ae(n, t.schema);
  return Vc(i, e)(t, r);
};
var Mu = /* @__PURE__ */ Fl({
  blur: () => ea,
  clearContent: () => ta,
  clearNodes: () => na,
  command: () => ra,
  createParagraphNear: () => ia,
  cut: () => oa,
  deleteCurrentNode: () => sa,
  deleteNode: () => la,
  deleteRange: () => ca,
  deleteSelection: () => fa,
  enter: () => da,
  exitCode: () => ha,
  extendMarkRange: () => ma,
  first: () => ga,
  focus: () => ba,
  forEach: () => wa,
  insertContent: () => va,
  insertContentAt: () => ka,
  insertDefaultBlock: () => Sa,
  joinBackward: () => Ca,
  joinDown: () => Ta,
  joinForward: () => Na,
  joinItemBackward: () => Ma,
  joinItemForward: () => za,
  joinTextblockBackward: () => Aa,
  joinTextblockForward: () => Ra,
  joinUp: () => Ea,
  keyboardShortcut: () => $a,
  lift: () => Oa,
  liftEmptyBlock: () => Da,
  liftListItem: () => Pa,
  newlineInCode: () => La,
  resetAttributes: () => Ba,
  scrollIntoView: () => Fa,
  selectAll: () => Ha,
  selectNodeBackward: () => _a,
  selectNodeForward: () => Wa,
  selectParentNode: () => ja,
  selectTextblockEnd: () => Ja,
  selectTextblockStart: () => qa,
  setContent: () => Ka,
  setMark: () => ou,
  setMeta: () => su,
  setNode: () => lu,
  setNodeSelection: () => cu,
  setTextDirection: () => au,
  setTextSelection: () => uu,
  sinkListItem: () => fu,
  splitBlock: () => du,
  splitListItem: () => hu,
  toggleList: () => mu,
  toggleMark: () => gu,
  toggleNode: () => yu,
  toggleWrap: () => xu,
  undoInputRule: () => bu,
  unsetAllMarks: () => wu,
  unsetMark: () => vu,
  unsetTextDirection: () => ku,
  updateAttributes: () => Su,
  updateDecorations: () => Tu,
  wrapIn: () => Cu,
  wrapInList: () => Nu
});
typeof process < "u" && process.env.NODE_ENV;
function zu(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function gn(n) {
  return zu(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
function es(n, e) {
  const t = { ...n };
  return gn(n) && gn(e) && Object.keys(e).forEach((r) => {
    gn(e[r]) && gn(n[r]) ? t[r] = es(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var ts = class {
  constructor(n = {}) {
    this.type = "extendable", this.parent = null, this.child = null, this.name = "", this.config = { name: this.name }, this.config = {
      ...this.config,
      ...n
    }, this.name = this.config.name;
  }
  get options() {
    return { ...dr(Gt(this, "addOptions", { name: this.name })) };
  }
  get storage() {
    return { ...dr(Gt(this, "addStorage", {
      name: this.name,
      options: this.options
    })) };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => es(this.options, n)
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
}, Au = class ns extends ts {
  constructor(...e) {
    super(...e), this.type = "mark";
  }
  /**
  * Create a new Mark instance
  * @param config - Mark configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new ns(t);
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
}, Fe = class rs extends ts {
  constructor(...e) {
    super(...e), this.type = "extension";
  }
  /**
  * Create a new Extension instance
  * @param config - Extension configuration object or a function that returns a configuration object
  */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new rs(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
};
Fe.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return { blockSeparator: void 0 };
  },
  addProseMirrorPlugins() {
    return [new Ze({
      key: new qe("clipboardTextSerializer"),
      props: { clipboardTextSerializer: () => {
        const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Za(t), { blockSeparator: s } = this.options, l = {
          ...s !== void 0 ? { blockSeparator: s } : {},
          textSerializers: o
        };
        return [...i.ranges].sort((c, a) => c.$from.pos - a.$from.pos).map(({ $from: c, $to: a }) => Qa(r, {
          from: c.pos,
          to: a.pos
        }, l)).join(s ?? `

`);
      } }
    })];
  }
});
Fe.create({
  name: "commands",
  addCommands() {
    return { ...Mu };
  }
});
Fe.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r;
    const i = () => {
      var o, s, l;
      if ((o = (s = this.editor.options.coreExtensionOptions) === null || s === void 0 || (s = s.delete) === null || s === void 0 || (l = s.filterTransaction) === null || l === void 0 ? void 0 : l.call(s, n)) !== null && o !== void 0 ? o : n.getMeta("y-sync$")) return;
      const c = Ua(n.before, [n, ...e]);
      nu(c).forEach((u) => {
        c.mapping.mapResult(u.oldRange.from).deletedAfter && c.mapping.mapResult(u.oldRange.to).deletedBefore && c.before.nodesBetween(u.oldRange.from, u.oldRange.to, (d, f) => {
          const h = f + d.nodeSize - 2, p = u.oldRange.from <= f && h <= u.oldRange.to;
          this.editor.emit("delete", {
            type: "node",
            node: d,
            from: f,
            to: h,
            newFrom: c.mapping.map(f),
            newTo: c.mapping.map(h),
            deletedRange: u.oldRange,
            newRange: u.newRange,
            partial: !p,
            editor: this.editor,
            transaction: n,
            combinedTransform: c
          });
        });
      });
      const a = c.mapping;
      c.steps.forEach((u, d) => {
        if (u instanceof je) {
          var f, h;
          const p = a.slice(d).map(u.from, -1), g = a.slice(d).map(u.to), y = a.invert().map(p, -1), x = a.invert().map(g), k = p > 0 ? (f = c.doc.nodeAt(p - 1)) === null || f === void 0 ? void 0 : f.marks.some((v) => v.eq(u.mark)) : !1, w = (h = c.doc.nodeAt(g)) === null || h === void 0 ? void 0 : h.marks.some((v) => v.eq(u.mark));
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
            partial: !!(w || k),
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
Fe.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [new Ze({
      key: new qe("tiptapDrop"),
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
Fe.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [new Ze({
      key: new qe("editable"),
      props: { editable: () => this.editor.options.editable }
    })];
  }
});
const Ru = new qe("focusEvents");
Fe.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [new Ze({
      key: Ru,
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
Fe.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: d } = c, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, g = p.parent.type.spec.isolating, y = d.pos - d.parentOffset, x = g && p.parent.childCount === 1 ? y === d.pos : Ct.atStart(a).from === f;
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
    return In() || Uo() ? o : i;
  },
  addProseMirrorPlugins() {
    return [new Ze({
      key: new qe("clearDocument"),
      appendTransaction: (n, e, t) => {
        if (n.some((h) => h.getMeta("composition"))) return;
        const r = n.some((h) => h.docChanged) && !e.doc.eq(t.doc), i = n.some((h) => h.getMeta("preventClearDocument"));
        if (!r || i) return;
        const { empty: o, from: s, to: l } = e.selection, c = Ct.atStart(e.doc).from, a = Ct.atEnd(e.doc).to;
        if (o || !(s === c && l === a) || !Qo(t.doc)) return;
        const u = t.tr, d = Fo({
          state: t,
          transaction: u
        }), { commands: f } = new Zc({
          editor: this.editor,
          state: d
        });
        if (f.clearNodes(), !!u.steps.length)
          return u;
      }
    })];
  }
});
Fe.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [new Ze({
      key: new qe("tiptapPaste"),
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
Fe.create({
  name: "tabindex",
  addOptions() {
    return { value: void 0 };
  },
  addProseMirrorPlugins() {
    return [new Ze({
      key: new qe("tabindex"),
      props: { attributes: () => {
        var n;
        return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) !== null && n !== void 0 ? n : "0" };
      } }
    })];
  }
});
Fe.create({
  name: "textDirection",
  addOptions() {
    return { direction: void 0 };
  },
  addGlobalAttributes() {
    if (!this.options.direction) return [];
    const { nodeExtensions: n } = Go(this.extensions);
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
    return [new Ze({
      key: new qe("textDirection"),
      props: { attributes: () => {
        const n = this.options.direction;
        return n ? { dir: n } : {};
      } }
    })];
  }
});
const Iu = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), $u = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Ou = /^(https?:\/\/|mailto:)/i;
function Du(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    $u.has(i) && o && e.push(`${i}: ${o}`);
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
  if (!Iu.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Ou.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Du(o || "");
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
function is(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Pu(n) {
  const e = is(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(hr(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function ed(n) {
  const e = is(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function td(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Lu(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function wi(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const Bu = { text: "#52525b" }, Fu = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? Bu, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, d = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ m(
    zs,
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
        const g = i.state.doc.resolve(p), y = g.nodeAfter;
        y && At.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new At(g))), (x = l.onTokenClick) == null || x.call(l, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: d ? /* @__PURE__ */ m("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, Hu = js.extend({
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
    return Ms(Fu);
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
    return ["span", Ns({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), _u = 240, Wu = 280, ju = ({ props: n, onApi: e }) => {
  const t = Dn(), r = S(e);
  r.current = e, ee(() => {
    r.current(t);
  }, [t]);
  const i = S(null);
  ee(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), ee(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = vr();
  return /* @__PURE__ */ m(tn.Provider, { value: t, children: /* @__PURE__ */ m(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Wu, maxHeight: _u },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ m("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ m(
        Ju,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Ju = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = Wi({
    label: () => n.label,
    activate: t
  }), s = ke(), l = { padding: `${A(8, 12, s)}px ${A(12, 16, s)}px`, fontSize: A(12, 14, s) };
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
}, vi = () => {
  let n = null;
  const e = (r) => {
    n && (n.props = r, n.holder.style.display = r.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ m(ju, { props: r, onApi: (i) => {
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
      const o = Js(i);
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
}, qu = Au.create({
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
}), wn = new qe("retainedSelectionHighlight"), Vu = Fe.create({
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
              decorations: s ? ln.empty : ln.create(n.doc, [$s.inline(i, o, { class: "rt-retained-selection" })])
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
}), nd = {
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
function ss(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function Ku(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = ss(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Yu = Se.forwardRef(({
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
  const g = S(a);
  g.current = a;
  const y = S(u);
  y.current = u;
  const x = S(null), k = S(null), w = S(e);
  w.current = e;
  const v = S(r);
  v.current = r;
  const D = S(o);
  D.current = o;
  const L = S(null), C = (W) => {
    var Y;
    const N = W.getAttributes("textStyle"), F = W.getAttributes("reportTextStyle"), { from: O, to: E, empty: J } = W.state.selection;
    let Z = !1, xe = !1, re = !1;
    if (!J) {
      const K = /* @__PURE__ */ new Set(), T = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Set();
      W.state.doc.nodesBetween(O, E, (q) => {
        if (!q.isText) return;
        const pe = q.marks.find((te) => te.type.name === "textStyle");
        K.add((pe == null ? void 0 : pe.attrs.fontFamily) || ""), T.add((pe == null ? void 0 : pe.attrs.fontSize) || "");
        const H = q.marks.find((te) => te.type.name === "reportTextStyle");
        G.add((H == null ? void 0 : H.attrs.styleId) || "");
      }), Z = K.size > 1, xe = T.size > 1, re = G.size > 1;
    }
    const ne = {
      bold: W.isActive("bold"),
      italic: W.isActive("italic"),
      underline: W.isActive("underline"),
      strike: W.isActive("strike"),
      link: W.isActive("link"),
      color: N.color || "",
      fontFamily: N.fontFamily || "",
      fontSize: N.fontSize || "",
      textStyle: F.styleId || "",
      hasSelection: !J,
      fontFamilyMixed: Z,
      fontSizeMixed: xe,
      textStyleMixed: re
    }, $ = L.current;
    $ && $.bold === ne.bold && $.italic === ne.italic && $.underline === ne.underline && $.strike === ne.strike && $.link === ne.link && $.color === ne.color && $.fontFamily === ne.fontFamily && $.fontSize === ne.fontSize && $.textStyle === ne.textStyle && $.hasSelection === ne.hasSelection && $.fontFamilyMixed === ne.fontFamilyMixed && $.fontSizeMixed === ne.fontSizeMixed && $.textStyleMixed === ne.textStyleMixed || (L.current = ne, (Y = D.current) == null || Y.call(D, ne));
  }, B = (W) => {
    var J;
    const N = W.state.selection;
    let F = null;
    N instanceof At && N.node.type.name === "token" ? (F = { key: N.node.attrs.field ?? "", pos: N.from }, x.current = N.from) : x.current != null && (x.current = W.state.tr.mapping.map(x.current));
    const O = k.current, E = O && F && O.key === F.key && O.pos === F.pos;
    !O && !F || E || (k.current = F, (J = y.current) == null || J.call(y, F));
  }, z = (W) => {
    const N = Pu(Lu(W));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(N) ? "" : N;
  }, Q = Se.useMemo(() => {
    const W = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: O }) => {
        var E;
        return ((E = h.current) == null ? void 0 : E.call(h, O)) ?? [];
      },
      command: ({ editor: O, range: E, props: J }) => {
        O.chain().focus().insertContentAt(E, { type: "token", attrs: { field: J.field } }).run();
      },
      render: vi
    }, N = Hu.configure({
      resolve: f.current ?? null,
      suggestion: W,
      onTokenClick: (O, E, J) => {
        var Z;
        x.current = J, (Z = g.current) == null || Z.call(g, O, E, J);
      }
    }), F = Fe.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Ws({
            pluginKey: new qe("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: O, range: E }) => ss(O, E.from) != null,
            items: ({ editor: O, query: E }) => {
              var Z;
              const J = Ku(O);
              return J ? ((Z = p.current) == null ? void 0 : Z.call(p, J.chipKey, E)) ?? [] : [];
            },
            command: ({ editor: O, range: E, props: J }) => {
              O.chain().focus().insertContentAt(E, { type: "token", attrs: { field: J.field } }).run();
            },
            render: vi
          })
        ];
      }
    });
    return [N, F];
  }, []), I = As({
    immediatelyRender: !1,
    extensions: [
      Os,
      Ds.configure({ placeholder: t }),
      Ps,
      Ls,
      Bs,
      qu,
      Vu,
      Fs,
      _s,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Hs.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...Q
    ],
    content: wi(n || ""),
    editable: !r,
    onUpdate: ({ editor: W }) => {
      w.current(z(W.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: W }) => {
      C(W), B(W);
    }
  });
  return ee(() => {
    if (!I || I.isFocused) return;
    z(I.getHTML()) !== n && (L.current = null, I.commands.setContent(wi(n || ""), { emitUpdate: !1 }), C(I));
  }, [n, I]), ee(() => {
    I && I.setEditable(!r);
  }, [r, I]), ee(() => {
    I && (L.current = null, C(I), B(I));
  }, [I]), fs(d, () => ({
    exec: (W, N, F) => {
      if (!I || v.current) return;
      const O = I.chain(), E = (F == null ? void 0 : F.focus) === !1 ? O : O.focus();
      switch (W) {
        case "bold":
          E.toggleBold().run();
          break;
        case "italic":
          E.toggleItalic().run();
          break;
        case "underline":
          E.toggleUnderline().run();
          break;
        case "strikeThrough":
          E.toggleStrike().run();
          break;
        case "foreColor":
          N && E.setColor(N).run();
          break;
        case "unsetColor":
          E.unsetColor().run();
          break;
        case "fontFamily":
          N && E.setFontFamily(N).run();
          break;
        case "unsetFontFamily":
          E.unsetFontFamily().run();
          break;
        case "fontSize":
          N && E.setFontSize(N).run();
          break;
        case "unsetFontSize":
          E.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          N && E.setMark("reportTextStyle", { styleId: N }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          E.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          E.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          N && E.extendMarkRange("link").setLink({ href: N }).run();
          break;
        case "unlink":
          E.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: (W) => I == null ? void 0 : I.commands.focus(W),
    insertToken: (W) => {
      !I || v.current || I.chain().focus().insertContent({ type: "token", attrs: { field: W } }).run();
    },
    replaceToken: (W) => {
      if (!I || v.current) return;
      const N = x.current;
      N != null && I.commands.command(({ tr: F }) => {
        const O = F.doc.nodeAt(N);
        if (!O || O.type.name !== "token") return !1;
        F.setNodeMarkup(N, void 0, { field: W });
        const E = F.doc.resolve(N);
        return E.nodeAfter && E.nodeAfter.type.name === "token" && F.setSelection(new At(E)), !0;
      });
    },
    holdSelectionHighlight: (W) => {
      !I || I.isDestroyed || I.view.dispatch(I.state.tr.setMeta(wn, { held: W }));
    }
  }), [I]), /* @__PURE__ */ m(Rs, { editor: I, className: `richtext-editor ${i || ""}` });
});
Yu.displayName = "RichTextEditor";
const Uu = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Xu = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], ki = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ m("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ m("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Gu = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = X(!1);
  return /* @__PURE__ */ m(
    Pn,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ R("button", { type: "button", disabled: e, className: `${Dl} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ m("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ m("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ m($n, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Uu.map((s) => /* @__PURE__ */ m(rl, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ m(Ei, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ m("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, Qu = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = X(!1), o = Ln(), [s, l] = X(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ m(
    Pn,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ m(
        Xe,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ m(vs, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ R("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ m(
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
            className: $l + " w-full"
          }
        ),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ m(Xe, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ m(
            Xe,
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
}, rd = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l, dividers: c = !0 }) => {
  const [a, u] = X(!1), d = (y, x) => {
    var k;
    return (k = n.current) == null ? void 0 : k.exec(y, x);
  }, f = Ln(), h = (y) => !!(r != null && r[y]), p = "flex items-center gap-1 shrink-0", g = c ? /* @__PURE__ */ m("div", { className: Yi }) : null;
  return /* @__PURE__ */ R("div", { className: `flex flex-wrap items-center ${c ? "gap-x-1" : "gap-x-2"} gap-y-1.5`, children: [
    /* @__PURE__ */ R("div", { className: p, children: [
      /* @__PURE__ */ m(St, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ m(Xe, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || h("bold"), disabled: e || h("bold"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("bold"), style: { ...f.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
      /* @__PURE__ */ m(St, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ m(Xe, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || h("italic"), disabled: e || h("italic"), onMouseDown: (y) => y.preventDefault(), onClick: () => d("italic"), style: { ...f.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
      /* @__PURE__ */ m(St, { content: "Underline", children: /* @__PURE__ */ m(Xe, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("underline"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(xs, { className: "w-3 h-3" }) }) }),
      /* @__PURE__ */ m(St, { content: "Strikethrough", children: /* @__PURE__ */ m(Xe, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (y) => y.preventDefault(), onClick: () => d("strikeThrough"), style: { ...f.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ m(bs, { className: "w-3 h-3" }) }) })
    ] }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(Qu, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }) }),
    g,
    /* @__PURE__ */ m("div", { className: p, children: /* @__PURE__ */ m(
      Pn,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ R(Xe, { theme: "dark", disabled: e, style: f.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ m("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ m(ki, {}),
          /* @__PURE__ */ m($n, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ m(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ m(ki, { className: "w-3.5 h-3.5" })
            }
          ),
          Xu.map((y) => /* @__PURE__ */ m(
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
    (o || s || l) && /* @__PURE__ */ R(Ke, { children: [
      g,
      /* @__PURE__ */ R("div", { className: p, children: [
        o && /* @__PURE__ */ m(Gu, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
        s,
        l && /* @__PURE__ */ m(St, { content: "Clear formatting", children: /* @__PURE__ */ m(
          Xe,
          {
            theme: "dark",
            "aria-label": "Clear formatting",
            disabled: e,
            onMouseDown: (y) => y.preventDefault(),
            onClick: () => d("clearFormatting"),
            style: { ...f.toggle, padding: 0 },
            className: "justify-center",
            children: /* @__PURE__ */ m(ws, { className: "w-3 h-3" })
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
function Pr(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Zu(n, e, t, r, i) {
  return Pr(n + e * i, t, r);
}
const ef = 2;
function tf(n, e, t, r, i) {
  return Pr(n + Math.trunc(e / ef) * i, t, r);
}
const nf = 3;
function id({
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
  const [h, p] = X(null), [g, y] = X(!1), x = S(!1), k = S(null), w = S(null), v = S(null), D = ke(), L = Vi(), C = a === void 0;
  ee(() => () => {
    var E;
    return (E = k.current) == null ? void 0 : E.call(k);
  }, []), We(() => {
    const E = v.current, J = w.current;
    !C && E && J && (J.style.color = getComputedStyle(E).color);
  }, [C, a]), ee(() => {
    x.current || p(null);
  }, [n]);
  const B = n ?? r, z = h !== null ? h : n != null ? String(n) : d ? "" : String(r), Q = (E) => Pr(E, e, t), I = (E) => {
    const J = Zu(B, E, e, t, o);
    J !== B && (x.current && p(String(J)), i(J));
  }, W = (E) => {
    if (l || s || E.pointerType !== "mouse" || E.button !== 0) return;
    const J = E.currentTarget, Z = E.clientY, xe = B;
    let re = xe, ne = !1;
    const $ = (K) => {
      const T = Z - K.clientY;
      if (!ne) {
        if (Math.abs(T) < nf) return;
        ne = !0, J.blur(), J.style.userSelect = "none";
      }
      const G = tf(xe, T, e, t, o);
      G !== re && (re = G, i(G));
    }, Y = () => {
      k.current = null, window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", Y), window.removeEventListener("pointercancel", Y), J.style.userSelect = "", ne && J.blur();
    };
    k.current = Y, window.addEventListener("pointermove", $), window.addEventListener("pointerup", Y), window.addEventListener("pointercancel", Y);
  }, N = (E) => ({
    type: "button",
    tabIndex: -1,
    "aria-label": E === 1 ? "Increase" : "Decrease",
    disabled: !!l || !!s || (E === 1 ? B >= t : B <= e),
    onPointerDown: (J) => J.preventDefault(),
    onClick: () => I(E)
  }), F = C ? A(22, 30, D) : A(16, 22, D), O = C ? A(14, 18, D) : A(11, 15, D);
  return /* @__PURE__ */ R(
    "span",
    {
      ref: w,
      className: `ui-number ${C ? "ui-number-box" : ""}`,
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ m(
          "input",
          {
            ref: v,
            type: "number",
            "aria-label": c,
            title: u,
            placeholder: d,
            value: z,
            readOnly: s,
            disabled: l,
            className: a ?? "ui-input w-20",
            style: {
              ...C ? { ...L, minHeight: A(30, 38, D) } : {},
              paddingRight: F + 2,
              cursor: l || s ? void 0 : g ? "text" : "ns-resize"
            },
            onFocus: () => {
              x.current = !0, y(!0);
            },
            onChange: (E) => {
              const J = E.target.value;
              p(J);
              const Z = parseInt(J, 10);
              J !== "" && !Number.isNaN(Z) && i(Q(Z));
            },
            onBlur: () => {
              if (x.current = !1, y(!1), h === null) return;
              const E = parseInt(h, 10);
              Number.isNaN(E) || i(Q(E)), p(null);
            },
            onKeyDown: (E) => {
              E.key === "Enter" && E.target.blur(), E.key === "Escape" && (p(null), E.target.blur()), !s && !l && (E.key === "ArrowUp" || E.key === "ArrowDown") && (E.preventDefault(), I(E.key === "ArrowUp" ? 1 : -1));
            },
            onPointerDown: W
          }
        ),
        /* @__PURE__ */ R("span", { className: "ui-number-steppers", style: { width: F }, children: [
          /* @__PURE__ */ m("button", { ...N(1), className: "ui-number-step", children: /* @__PURE__ */ m(ks, { style: { width: O, height: O } }) }),
          /* @__PURE__ */ m("button", { ...N(-1), className: "ui-number-step", children: /* @__PURE__ */ m($n, { style: { width: O, height: O } }) })
        ] })
      ]
    }
  );
}
function od({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const d = ke(), f = lt({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = A(14, 16, d), p = { width: h, height: h }, g = A(10, 12, d);
  return /* @__PURE__ */ R("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: f, children: [
      /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ m(Sn, { className: "text-zinc-400 shrink-0", style: p }) : /* @__PURE__ */ m($n, { className: "text-zinc-400 shrink-0", style: p }),
            e,
            /* @__PURE__ */ m("span", { className: "font-semibold text-zinc-200 truncate", children: n }),
            t && /* @__PURE__ */ m("span", { className: "text-zinc-500 shrink-0", style: { fontSize: g }, children: t })
          ]
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "shrink-0", children: s })
    ] }),
    !i && u && /* @__PURE__ */ m("div", { className: l || "ui-card-band border-t p-1.5 space-y-1", children: u })
  ] });
}
export {
  Xe as Button,
  od as CardSection,
  qi as CheckMark,
  ul as Checkbox,
  _f as Checklist,
  Qf as ChromeHeader,
  Gf as ContentRow,
  Nf as ContextMenu,
  zf as ContextMenuDivider,
  Mf as ContextMenuItem,
  Af as ContextMenuSub,
  Pi as DROPDOWN_MAX_HEIGHT,
  Hf as DatePicker,
  Of as DialogProvider,
  rl as DropdownItem,
  Pn as DropdownMenu,
  il as DropdownSubmenu,
  wr as DropdownThemeContext,
  Uu as FONTS,
  jf as FloatingChrome,
  Ff as FloatingToggle,
  Gu as FontMenu,
  rd as FormatToolbar,
  Ee as IS_COARSE,
  Vs as IS_TOUCH_CAPABLE,
  Cf as ItemManagerDropdown,
  Pf as LongPressMenuProvider,
  gr as MORPH_EASE,
  Rt as MORPH_MS,
  yr as MORPH_OPACITY_MS,
  tn as MenuHighlightContext,
  _i as MenuSearchContext,
  sl as Modal,
  Rf as ModalFooter,
  an as ModalFooterButton,
  id as NumberInput,
  qs as PopoutWindowContext,
  nd as RICH_TEXT_STATE_IDLE,
  Wf as RadioList,
  Yu as RichTextEditor,
  ef as SCRUB_PX_PER_STEP,
  Xf as SectionHeader,
  Uf as Seg,
  Zf as StructureControls,
  kr as SubmenuContext,
  Bf as TAB_PILL,
  Rl as TB_BTN,
  un as TB_BTN_ICON,
  Il as TB_DANGER,
  Yi as TB_DIVIDER,
  $l as TB_INPUT,
  Yf as TB_NUM,
  Dl as TB_PICKER,
  Jf as TB_ROW_LABEL,
  Ol as TB_SEG,
  qf as TB_TOGGLE,
  Kf as TB_TOGGLE_OFF,
  Vf as TB_TOGGLE_ON,
  wl as TabFace,
  Hu as Token,
  Fu as TokenChipView,
  fn as ToolButton,
  St as Tooltip,
  xr as ZOOM_FROM,
  Pr as clampNumber,
  Xs as cloneOverlayClose,
  A as coarsePx,
  td as escapeHtml,
  Ri as getCoarseScale,
  vr as getDropdownClasses,
  Ef as getHardwareKeyboard,
  Sf as getLastPointerType,
  If as inputCls,
  gl as isInteractiveElement,
  rr as isTouchLike,
  Oi as nearestOverlayOrigin,
  is as normalizeSpaces,
  Jn as overlayMorphEnabled,
  Us as playOverlayClose,
  Ys as playOverlayOpen,
  wi as preprocessTokenHtml,
  Pu as sanitizeRichText,
  tf as scrubbedValue,
  vf as setCoarseScale,
  Zu as steppedValue,
  ed as stripRichText,
  Lu as stripTokenWrappers,
  kf as useCoarse,
  ke as useCoarseScale,
  lt as useCoarseSize,
  Ai as useCurrentDocument,
  Zt as useCurrentWindow,
  $f as useDialog,
  Qs as useDropdownPosition,
  Bi as useDropdownTheme,
  Tf as useHardwareKeyboard,
  Vi as useInputSize,
  Fi as useItemSize,
  Ks as useLastPointerType,
  Df as useLongPressOptOut,
  Sr as useMenuHighlight,
  tl as useMenuSearch,
  br as useOverlayMorph,
  mr as usePopoutWindow,
  Qt as usePortalTarget,
  Al as useSlidingPill,
  Lf as useTouchMode
};
