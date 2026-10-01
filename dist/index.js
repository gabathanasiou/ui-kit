"use client";
import { jsxs as S, jsx as i, Fragment as Oe } from "react/jsx-runtime";
import Ye, { createContext as Ge, useContext as Qe, useState as W, useEffect as q, useRef as y, useCallback as Q, useLayoutEffect as Se, useMemo as xt, useImperativeHandle as Yn } from "react";
import * as re from "@radix-ui/react-dropdown-menu";
import { Search as Wn, X as vt, Check as pn, Pencil as qn, Copy as gn, Trash2 as At, RotateCcw as bn, Plus as jn, ChevronRight as wt, ChevronLeft as Un, ArrowUp as Xn, ArrowDown as Vn, ChevronDown as _t, Underline as Gn, Strikethrough as Qn, Link as Zn } from "lucide-react";
import { computePosition as Jn, offset as yn, flip as xn, shift as vn, size as er, useFloating as tr, autoUpdate as nr } from "@floating-ui/react-dom";
import * as Pe from "@radix-ui/react-dialog";
import { createPortal as Ht } from "react-dom";
import { mergeAttributes as rr, ReactNodeViewRenderer as ir, NodeViewWrapper as or, useEditor as sr, EditorContent as cr } from "@tiptap/react";
import { NodeSelection as kt } from "@tiptap/pm/state";
import lr from "@tiptap/starter-kit";
import ar from "@tiptap/extension-placeholder";
import { TextStyle as ur } from "@tiptap/extension-text-style";
import dr from "@tiptap/extension-color";
import fr from "@tiptap/extension-link";
import hr from "@tiptap/extension-underline";
import { Mention as mr } from "@tiptap/extension-mention";
import { createRoot as pr } from "react-dom/client";
const gr = Ge(null);
function Bt() {
  return Qe(gr);
}
function it() {
  const e = Bt();
  return e ? e.document.body : null;
}
function wn() {
  const e = Bt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function ot() {
  return Bt() ?? (typeof window < "u" ? window : null);
}
const st = typeof window < "u", me = st && window.matchMedia("(pointer: coarse)").matches, br = st && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Nt = 0.5;
const nt = /* @__PURE__ */ new Set();
function Li(e) {
  Nt = Math.max(0, Math.min(1, e)), nt.forEach((t) => t());
}
function kn() {
  return Nt;
}
function Ai() {
  const [, e] = W(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return nt.add(t), () => {
      nt.delete(t);
    };
  }, []), me && Nt > 0;
}
function fe() {
  const [, e] = W(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return nt.add(t), () => {
      nt.delete(t);
    };
  }, []), Nt;
}
function z(e, t, n) {
  return me ? Math.round(e + (t - e) * n) : e;
}
function Ke(e, t) {
  const n = fe();
  return me && n > 0 ? {
    padding: `${z(e.py, t.py, n)}px ${z(e.px, t.px, n)}px`,
    fontSize: `${z(e.fs, t.fs, n)}px`
  } : { padding: `${e.py}px ${e.px}px`, fontSize: `${e.fs}px` };
}
function Mt(e) {
  return e === "touch" || e === "pen";
}
let Xe = null;
const Pt = /* @__PURE__ */ new Set();
st && window.addEventListener("pointerdown", (e) => {
  Xe = e.pointerType, Pt.forEach((t) => t());
}, !0);
function Mi() {
  return Xe;
}
function yr() {
  const [, e] = W(0), t = y(Xe);
  return q(() => {
    const n = () => {
      t.current !== Xe && (t.current = Xe, e((r) => r + 1));
    };
    return Pt.add(n), () => {
      Pt.delete(n);
    };
  }, []), Xe;
}
const zn = ["(any-hover: hover)", "(any-pointer: fine)"];
function Nn() {
  return st ? zn.some((e) => window.matchMedia(e).matches) : !1;
}
let zt = Nn();
const It = /* @__PURE__ */ new Set();
function cn(e) {
  zt !== e && (zt = e, It.forEach((t) => t()));
}
var mn;
if (st) {
  const e = () => cn(Nn());
  for (const o of zn) {
    const d = window.matchMedia(o);
    (mn = d.addEventListener) == null || mn.call(d, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (o) => {
    o.isComposing || o.keyCode !== 229 && (o.key === "Enter" || o.key === "Backspace" || o.key === "Process" || o.key === "Unidentified" || cn(!0));
  });
  let n = null, r = null;
  const a = "__penClick", u = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (o) => {
    o.pointerType !== "pen" || o.button !== 0 || (n = { x: o.clientX, y: o.clientY });
  }, !0), window.addEventListener("pointerup", (o) => {
    if (o.pointerType !== "pen") return;
    const d = n;
    if (n = null, !d || Math.hypot(o.clientX - d.x, o.clientY - d.y) > 8) return;
    const l = o.target;
    if (!l || !l.isConnected) return;
    if (l instanceof HTMLInputElement && u.has(l.type)) {
      try {
        l.showPicker();
      } catch {
      }
      return;
    }
    const f = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    f[a] = !0, r = { x: o.clientX, y: o.clientY, time: Date.now() }, l.dispatchEvent(f);
  }, !0), window.addEventListener("click", (o) => {
    o[a] || r && Date.now() - r.time < 1e3 && Math.hypot(o.clientX - r.x, o.clientY - r.y) < 12 && (o.preventDefault(), o.stopPropagation());
  }, !0);
}
function Pi() {
  return zt;
}
function Ii() {
  const [, e] = W(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return It.add(t), () => {
      It.delete(t);
    };
  }, []), zt;
}
const Ve = 220, Ft = "cubic-bezier(0.32, 0.72, 0, 1)", Kt = 170, Yt = 0.94;
function Ct(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function $n(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function En(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return $n({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function xr(e, t, n, r) {
  const a = ++e.current, u = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${Yt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === a && requestAnimationFrame(() => {
      if (e.current !== a) return;
      const o = En(t, n);
      t.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, t.style.transition = `transform ${Ve}ms ${Ft}, opacity ${Kt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === a && (t.style.transition = u.transition, t.style.transform = u.transform, t.style.transformOrigin = u.transformOrigin, t.style.opacity = u.opacity, r == null || r());
      }, Ve + 60);
    });
  });
}
function vr(e, t, n, r) {
  const a = ++e.current, u = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, o = En(t, n);
  t.style.transition = `transform ${Ve}ms ${Ft}, opacity ${Kt}ms ease`, t.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, t.style.transform = `scale(${Yt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === a && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== a || t.isConnected || (t.style.transition = u.transition, t.style.transform = u.transform, t.style.transformOrigin = u.transformOrigin, t.style.opacity = u.opacity, t.style.pointerEvents = u.pointerEvents, t.style.visibility = u.visibility);
    }));
  }, Ve + 60);
}
function wr(e, t, n) {
  const r = e.cloneNode(!0), a = e.getBoundingClientRect(), u = a.width > 0 || a.height > 0 ? a : n ?? a;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${u.left}px`, r.style.top = `${u.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const o = (t == null ? void 0 : t()) ?? null, d = o ? $n({ left: u.left, top: u.top, width: u.width, height: u.height }, o) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${d.x * 100}% ${d.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Ve}ms ${Ft}, opacity ${Kt}ms ease`, r.style.transform = `scale(${Yt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Ve + 60));
    });
  });
}
function Wt(e) {
  const t = y(null), [n, r] = W(!1), a = y(null), u = y(0), o = Q((p) => {
    if (e.ref && (e.ref.current = p), p) {
      u.current = 0, t.current = p;
      const R = p.getBoundingClientRect();
      (R.width > 0 || R.height > 0) && (a.current = { left: R.left, top: R.top, width: R.width, height: R.height }), r(!0);
      return;
    }
    const m = t.current, N = ++u.current;
    queueMicrotask(() => {
      N === u.current && t.current === m && (t.current = null, r(!1), !(!m || !e.cloneOnUnmount || !l.current) && m.style.visibility !== "hidden" && Ct(c.current) && wr(m, s.current, a.current));
    });
  }, []), d = Q(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const m = p.getBoundingClientRect();
    (m.width > 0 || m.height > 0) && (a.current = { left: m.left, top: m.top, width: m.width, height: m.height });
  }, []), l = y(e.visible);
  l.current = e.visible;
  const f = y(e.visible), s = y(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const g = y(e.onClosed);
  g.current = e.onClosed;
  const c = y(e.morph !== !1);
  c.current = e.morph !== !1;
  const x = y(0);
  return Se(() => {
    if (!n || !l.current || !Ct(c.current)) return;
    const p = t.current;
    p && xr(x, p, s.current);
  }, [n, e.visible]), q(() => {
    if (!n || !l.current) return;
    let p = 0;
    const m = () => {
      p = 0, d(), p = requestAnimationFrame(m);
    };
    return p = requestAnimationFrame(m), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, d]), Se(() => {
    var N;
    const p = f.current;
    if (f.current = e.visible, e.visible || !p) return;
    const m = t.current;
    if (!m || !Ct(c.current)) {
      (N = g.current) == null || N.call(g);
      return;
    }
    vr(x, m, s.current, () => {
      var R;
      return (R = g.current) == null ? void 0 : R.call(g);
    });
  }, [e.visible]), q(() => {
    if (!n || !l.current) return;
    const p = (m) => {
      const N = t.current;
      N && N.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), q(() => {
    if (!n || !l.current) return;
    const p = (m) => {
      const N = t.current;
      N && N.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), o;
}
const Sn = 384;
function kr(e) {
  const t = e.visualViewport;
  return t ? { x: t.offsetLeft, y: t.offsetTop, width: t.width, height: t.height } : { x: 0, y: 0, width: e.innerWidth, height: e.innerHeight };
}
function zr({
  anchorRef: e,
  panelRef: t,
  open: n,
  contentRef: r,
  gap: a = 4,
  padding: u = 8,
  maxHeight: o,
  minHeight: d = 32,
  onPosition: l
}) {
  const f = ot(), s = y(f);
  s.current = f;
  const g = y(l);
  g.current = l, Se(() => {
    if (!n) return;
    let c = 0, x = !1;
    const p = () => {
      c || (c = requestAnimationFrame(m));
    }, m = () => {
      if (c = 0, x) return;
      const V = s.current, _ = e.current, $ = t.current;
      if (!V || !_ || !$ || !$.isConnected) return;
      const O = (r == null ? void 0 : r.current) ?? $, b = kr(V), A = o ?? Sn, E = Math.min(d, A), B = Math.max(0, $.offsetHeight - O.offsetHeight), I = Math.max(E, Math.ceil(O.scrollHeight + B)), Y = Math.min(I, A);
      $.style.maxHeight = `${Y}px`;
      let Z = Y;
      Jn(_, $, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          yn(a),
          xn({ boundary: b, padding: u, fallbackStrategy: "bestFit" }),
          vn({ boundary: b, padding: u, mainAxis: !1 }),
          er({
            boundary: b,
            padding: u,
            apply({ availableHeight: J }) {
              Z = Math.max(E, Math.floor(Math.min(A, J))), $.style.maxHeight = `${Z}px`;
            }
          })
        ]
      }).then(({ x: J, y: de, placement: ae }) => {
        x || g.current({
          top: Math.round(de),
          left: Math.round(J),
          maxH: Z,
          side: ae.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    m();
    const N = s.current, R = (N == null ? void 0 : N.document) ?? null, k = (N == null ? void 0 : N.visualViewport) ?? null, v = () => p();
    k == null || k.addEventListener("resize", v), k == null || k.addEventListener("scroll", v), N == null || N.addEventListener("resize", v), R == null || R.addEventListener("scroll", v, { capture: !0, passive: !0 });
    let C = null;
    return typeof ResizeObserver < "u" && (C = new ResizeObserver(v), t.current && C.observe(t.current), r != null && r.current && C.observe(r.current)), () => {
      x = !0, c && cancelAnimationFrame(c), k == null || k.removeEventListener("resize", v), k == null || k.removeEventListener("scroll", v), N == null || N.removeEventListener("resize", v), R == null || R.removeEventListener("scroll", v, { capture: !0 }), C == null || C.disconnect();
    };
  }, [n, e, t, r, a, u, o, d]);
}
let je = null;
function Tn(e) {
  return je == null || je(), je = e, () => {
    je === e && (je = null);
  };
}
const qt = Ge("dark"), Cn = () => Qe(qt);
function Rn() {
  const e = fe();
  return {
    padding: `${z(8, 12, e)}px ${z(12, 16, e)}px`,
    fontSize: `${z(12, 14, e)}px`,
    lineHeight: `${z(18, 22, e)}px`
  };
}
const Nr = (e) => e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", ln = (e) => e ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", $r = (e) => e ? "text-xs" : "text-[10px]";
function jt(e) {
  const t = me && kn() > 0;
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
    headerPad: ln(t),
    headerText: `${ln(t)} font-semibold uppercase tracking-wider ${$r(t)} ui-label`,
    // Item padding
    itemPad: Nr(t),
    // Input
    input: t ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: t ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
function Dn(e) {
  const t = [];
  return Ye.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (Ye.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const Ut = Ge({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), ct = Ge(null), Xt = () => Qe(ct), Ln = Ge({ query: "", setQuery: () => {
} }), Er = () => Qe(Ln), Sr = () => !0;
function $t(e) {
  const t = y([]), [n, r] = W(-1), [a, u] = W(!1), [o, d] = W(0), l = Q((c) => (t.current = [...t.current, c], d((x) => x + 1), () => {
    t.current = t.current.filter((x) => x !== c), d((x) => x + 1);
  }), []), f = Q((c, x) => {
    r(c), u(x === "pointer");
  }, []), s = Q(() => {
    u((c) => c && (r(-1), !1));
  }, []);
  return xt(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: e ? t.current.filter(e) : t.current,
    highlightedIndex: n,
    pointerDriven: a,
    register: l,
    setHighlighted: f,
    pointerLeave: s
  }), [n, a, o, l, f, s, e]);
}
function An(e) {
  const t = Xt(), n = y(t);
  n.current = t;
  const r = y(null);
  q(() => {
    var l;
    const d = { label: e.label(), activate: e.activate };
    return r.current = d, (l = n.current) == null ? void 0 : l.register(d);
  }, []);
  const a = t && r.current ? t.items.indexOf(r.current) : -1, u = !!t && !e.disabled && a >= 0 && a === t.highlightedIndex;
  return { api: t, myIndex: a, highlighted: u, setPointer: (d) => {
    !e.disabled && t && d >= 0 && t.setHighlighted(d, "pointer");
  } };
}
function Vt(e, t, n, r) {
  const a = y(-1);
  a.current = t.highlightedIndex;
  const u = y(t);
  u.current = t;
  const o = y(e);
  o.current = e;
  const d = y(r);
  d.current = r;
  const l = y({ text: "", time: 0 }), f = y(!1);
  f.current || (f.current = !0, n.current = (s) => {
    var p, m, N, R, k;
    if (!o.current) return;
    const g = s.target;
    if (!!g && !!g.closest("input, textarea, [contenteditable]") && (s.key.length === 1 || s.key === "Enter" || s.key === "Escape")) {
      const v = (m = (p = d.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : m.call(p, s);
      (!!((N = d.current) != null && N.onFieldKey) || u.current.items.length > 0) && (s.stopImmediatePropagation(), v && s.preventDefault());
      return;
    }
    const x = u.current.items;
    if (x.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = s.key === "ArrowDown" ? 1 : -1, C = (a.current + v + x.length) % x.length;
        u.current.setHighlighted(C, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = a.current;
        v >= 0 && v < x.length && x[v].submenu && x[v].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (k = (R = d.current) == null ? void 0 : R.onCloseSub) == null || k.call(R);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = a.current;
        v >= 0 && v < x.length && x[v].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = Date.now(), C = (v - l.current.time > 500 ? "" : l.current.text) + s.key.toLowerCase();
        if (l.current = { text: C, time: v }, !C) return;
        const V = a.current + 1;
        for (let _ = 0; _ < x.length; _++) {
          const $ = (V + _) % x.length;
          if (x[$].label.toLowerCase().startsWith(C)) {
            u.current.setHighlighted($, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Gt(e, t, n, r, a, u, o) {
  const d = y(t);
  d.current = t;
  const l = y(e);
  l.current = e;
  const f = y(a);
  f.current = a;
  const s = y(o == null ? void 0 : o.ignoreFields);
  s.current = o == null ? void 0 : o.ignoreFields;
  const g = y(!1);
  g.current || (g.current = !0, u.current = (c) => {
    if (!l.current || f.current) return;
    const x = r.current;
    if (x && x.contains(c.target)) return;
    if (s.current) {
      const m = c.target;
      if (m && m.closest("input, textarea, [contenteditable]")) return;
    }
    d.current.items.length === 0 || !(c.key === "ArrowDown" || c.key === "ArrowUp" || c.key === "ArrowLeft" || c.key === "ArrowRight" || c.key === "Enter" || c.key === " " || c.key.length === 1 && !c.ctrlKey && !c.metaKey && !c.altKey) || (c.preventDefault(), c.stopImmediatePropagation(), n.current(c));
  });
}
function Qt(e, t) {
  const n = y(e);
  n.current = e;
  const r = y(!1);
  r.current || (r.current = !0, t.current = (a) => {
    if (!n.current) return;
    const u = a.currentTarget, o = u.querySelector("[data-menu-items]") ?? u;
    o.scrollHeight > o.clientHeight && (a.preventDefault(), o.scrollTop += a.deltaY);
  });
}
function Et({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: a = "left",
  width: u,
  theme: o = "dark",
  children: d,
  morph: l = !0,
  contentClassName: f,
  maxMenuHeight: s,
  initialHighlightIndex: g,
  searchable: c = !1,
  searchPlaceholder: x,
  searchFilter: p,
  searchValue: m,
  onSearchValueChange: N
}) {
  const [R, k] = W([]), [v, C] = W(null), V = it(), _ = wn(), $ = y(null), O = y(null), b = y(e);
  b.current = e;
  const [A, E] = W(e), [B, I] = W(""), Y = c && m !== void 0, Z = Y ? m : B, J = Y ? N ?? (() => {
  }) : I, [de, ae] = W(!1), ve = Y && !de ? "" : Z, ne = y(null), pe = fe(), M = {
    padding: `${z(8, 12, pe)}px ${z(12, 16, pe)}px`,
    fontSize: `${z(12, 14, pe)}px`
  }, [j, F] = W(0), w = c && !Y;
  q(() => {
    var ke;
    if (!w || !e) return;
    const T = (ke = O.current) == null ? void 0 : ke.querySelector("[data-menu-items]");
    if (!T) return;
    const K = () => F(T.offsetWidth - T.clientWidth);
    K();
    const oe = new ResizeObserver(K);
    return oe.observe(T), () => oe.disconnect();
  }, [e, w, Z]);
  const U = xt(() => {
    if (!c) return;
    const T = ve.trim().toLowerCase();
    return T ? (K) => p ? p(T, K.label) : K.label.toLowerCase().includes(T) : Sr;
  }, [ve, c, p]), H = $t(U);
  q(() => {
    if (e)
      return E(!0), Y || I(""), ae(!1), H.setHighlighted(g ?? -1, "keyboard"), Tn(() => {
        n == null || n(!1), t == null || t();
      });
    k([]), ae(!1);
  }, [e, g, n, t]), q(() => {
    if (!e || !_) return;
    const T = (K) => {
      if (K.pointerType !== "touch") return;
      const oe = K.target;
      oe && (O.current && O.current.contains(oe) || $.current && $.current.contains(oe) || oe instanceof Element && oe.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return _.addEventListener("pointerdown", T, { capture: !0 }), () => _.removeEventListener("pointerdown", T, { capture: !0 });
  }, [e, _, n, t]);
  const ye = Q(() => {
    const T = $.current;
    if (!T) return null;
    const K = T.getBoundingClientRect();
    return { left: K.left, top: K.top, width: K.width, height: K.height };
  }, []), D = Wt({
    visible: e,
    morph: l,
    anchor: ye,
    onClosed: () => E(!1)
  }), X = y(() => {
  }), ie = y(() => {
  }), ce = y(() => {
  }), Le = Q((T) => {
    if (T.key === "Enter") {
      const K = H.highlightedIndex, oe = H.items[K >= 0 ? K : 0];
      return oe == null || oe.activate(), !0;
    }
    return T.key === "Escape" ? (n == null || n(!1), t == null || t(), !0) : !1;
  }, [H, n, t]);
  Vt(e && R.length === 0, H, X, { onFieldKey: Le }), Qt(e, ie), Gt(e, H, X, O, R.length > 0, ce, { ignoreFields: Y });
  const Te = y(null), ge = Q((T) => {
    var K;
    if (T) {
      T.addEventListener("keydown", X.current, { capture: !0 }), T.addEventListener("wheel", ie.current, { passive: !1 });
      const oe = T.ownerDocument;
      Te.current = oe, oe.addEventListener("keydown", ce.current, { capture: !0 }), Ze(!0);
    } else
      (K = Te.current) == null || K.removeEventListener("keydown", ce.current, { capture: !0 }), Te.current = null, Ze(!1);
    O.current = T, D(T);
  }, [D]), [he, we] = W({ top: 0, left: 0, maxH: Sn, side: "bottom", ready: !1 }), [Ne, xe] = W(0), [Ae, Ze] = W(!1);
  q(() => {
    e && $.current && xe($.current.getBoundingClientRect().width);
  }, [e]), zr({
    anchorRef: $,
    panelRef: O,
    open: e && Ae,
    maxHeight: s,
    onPosition: we
  }), q(() => {
    var T;
    if (he.ready && e) {
      if (c) {
        (T = ne.current) == null || T.focus();
        return;
      }
      const K = O.current;
      K && K.ownerDocument.activeElement !== K && !K.contains(K.ownerDocument.activeElement) && K.focus();
    }
  }, [he.ready, e, c]), q(() => {
    if (!e || !c) return;
    if (H.items.length === 0) {
      H.highlightedIndex !== -1 && H.setHighlighted(-1, "keyboard");
      return;
    }
    const T = H.highlightedIndex;
    (T < 0 || T >= H.items.length) && H.setHighlighted(0, "keyboard");
  }, [e, Z, c, H.items.length]), Se(() => {
    var K;
    if (!e || H.highlightedIndex < 0 || H.pointerDriven) return;
    const T = (K = O.current) == null ? void 0 : K.querySelector(`[data-ei="${H.highlightedIndex}"]`);
    T == null || T.scrollIntoView({ block: "nearest" });
  }, [e, H.highlightedIndex, H.pointerDriven]);
  const at = Q((T) => {
    !T && !b.current || (!T && _e.current && (Ce.current = !0), n ? n(T) : T || t == null || t());
  }, [n, t]), Je = y(A);
  Je.current = A;
  const _e = y(!1), Ce = y(!1), He = Q(() => {
    if (!b.current && Je.current) {
      if (Ce.current) {
        Ce.current = !1, _e.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), Be = Ye.isValidElement(r) ? r : null, We = Be ? Ye.cloneElement(Be, {
    ref: (T) => {
      $.current = T;
    },
    onPointerDown: () => {
      _e.current = !0, Ce.current = !1;
    },
    onClick: (T) => {
      var K, oe;
      (oe = (K = Be.props).onClick) == null || oe.call(K, T), He();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (T) => {
      var K, oe;
      if ((oe = (K = Be.props).onKeyDown) == null || oe.call(K, T), !(!Y || !b.current)) {
        if (T.key.length === 1 && !T.ctrlKey && !T.metaKey && !T.altKey)
          ae(!0);
        else if (T.key === "ArrowDown" || T.key === "ArrowUp") {
          T.preventDefault();
          const ke = H.items;
          if (ke.length === 0) return;
          const Me = T.key === "ArrowDown" ? 1 : -1, dt = (H.highlightedIndex + Me + ke.length) % ke.length;
          H.setHighlighted(dt, "keyboard");
        } else if (T.key === "Enter") {
          T.preventDefault();
          const ke = H.highlightedIndex, Me = H.items[ke >= 0 ? ke : 0];
          Me == null || Me.activate();
        }
      }
    }
  }) : r, ut = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${w ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ S(re.Root, { open: e || A, onOpenChange: at, modal: !1, children: [
    /* @__PURE__ */ i(re.Trigger, { asChild: !0, children: We }),
    /* @__PURE__ */ i(re.Portal, { container: V ?? void 0, children: /* @__PURE__ */ i(qt.Provider, { value: o, children: /* @__PURE__ */ i(Ut.Provider, { value: { chain: R, setChain: k, morph: l, keyboardOpened: v, setKeyboardOpened: C }, children: /* @__PURE__ */ i(ct.Provider, { value: H, children: /* @__PURE__ */ i(Ln.Provider, { value: { query: Z, setQuery: J }, children: /* @__PURE__ */ S(
      re.Content,
      {
        ref: ge,
        "data-theme": o,
        "data-ui-fixed": !0,
        className: `${ut} ${u || ""} ${f || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: he.left,
          top: he.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: u ? void 0 : Ne || void 0,
          maxHeight: he.maxH,
          visibility: he.ready ? "visible" : "hidden"
        },
        onPointerLeave: H.pointerLeave,
        children: [
          w && /* @__PURE__ */ i("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: j }, children: /* @__PURE__ */ S("div", { className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: M, children: [
            /* @__PURE__ */ i(Wn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ i(
              "input",
              {
                ref: ne,
                value: Z,
                onChange: (T) => J(T.target.value),
                placeholder: x ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            Z ? /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (T) => T.stopPropagation(),
                onClick: () => {
                  var T;
                  J(""), (T = ne.current) == null || T.focus();
                },
                children: /* @__PURE__ */ i(vt, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ i("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          w ? /* @__PURE__ */ i("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: d }) : d
        ]
      }
    ) }) }) }) }) })
  ] });
}
function Oi({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: a,
  onRename: u,
  onDuplicate: o,
  onDelete: d,
  onCreate: l,
  onImport: f,
  onExport: s,
  onReset: g,
  onTrash: c,
  closeOnSelect: x,
  readOnly: p = !1,
  theme: m,
  align: N,
  label: R,
  header: k,
  itemLabel: v,
  trigger: C,
  minItems: V = 1,
  itemRender: _,
  morph: $ = !0,
  contentClassName: O
}) {
  const b = jt(), A = Rn(), [E, B] = W(null), [I, Y] = W(""), Z = y(I);
  Z.current = I;
  const J = y(null), de = y(null);
  q(() => {
    e && requestAnimationFrame(() => {
      var M, j;
      (j = (M = de.current) == null ? void 0 : M.querySelector('[data-active="1"]')) == null || j.scrollIntoView({ block: "nearest" });
    });
  }, [e]), q(() => {
    var F;
    if (!e) return;
    const M = (w) => {
      var ce, Le, Te;
      const U = w.target;
      if (U && U.closest("input, textarea, [contenteditable]")) {
        E && U === J.current && (w.key === "Enter" ? (w.preventDefault(), w.stopImmediatePropagation(), ve()) : w.key === "Escape" && (w.preventDefault(), w.stopImmediatePropagation(), ne()));
        return;
      }
      const H = (ce = de.current) == null ? void 0 : ce.closest(".ui-menu");
      if (!H || !H.contains(w.target)) return;
      const ye = H.ownerDocument, D = [...H.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], X = [...H.querySelectorAll('div:last-child > [role="menuitem"]')], ie = [...D, ...X];
      if (w.key === "ArrowDown" || w.key === "ArrowUp") {
        w.preventDefault(), w.stopImmediatePropagation();
        const ge = ye.activeElement;
        let he = ge ? ie.indexOf(ge) : -1;
        if (he < 0 && ge) {
          const xe = ge.closest("[data-active]"), Ae = xe == null ? void 0 : xe.querySelector('[role="menuitem"]:first-child');
          Ae && (he = D.indexOf(Ae));
        }
        const we = w.key === "ArrowDown" ? 1 : -1, Ne = he < 0 ? we === 1 ? 0 : ie.length - 1 : (he + we + ie.length) % ie.length;
        (Le = ie[Ne]) == null || Le.focus({ preventScroll: !0 });
        return;
      }
      if (w.key === "ArrowLeft" || w.key === "ArrowRight") {
        const ge = ye.activeElement, he = ge == null ? void 0 : ge.closest("[data-active]");
        if (!he) return;
        w.preventDefault(), w.stopImmediatePropagation();
        const we = [...he.querySelectorAll('[role="menuitem"]')].slice(1);
        if (we.length === 0) return;
        const Ne = ge && he.contains(ge) ? we.indexOf(ge) : -1, xe = w.key === "ArrowRight" ? 1 : -1, Ae = Ne < 0 ? 0 : (Ne + xe + we.length) % we.length;
        (Te = we[Ae]) == null || Te.focus({ preventScroll: !0 });
        return;
      }
    }, j = ((F = de.current) == null ? void 0 : F.ownerDocument) ?? null;
    return j == null || j.addEventListener("keydown", M, { capture: !0 }), () => j == null ? void 0 : j.removeEventListener("keydown", M, { capture: !0 });
  }, [e, E]), q(() => {
    if (!E) return;
    const M = n.find((U) => U.id === E);
    M && !I && Y(M.name);
    const j = requestAnimationFrame(() => {
      const U = J.current;
      U && (U.focus(), U.select());
    });
    let F = 0;
    const w = window.setInterval(() => {
      const U = J.current;
      if (F++, !U || F > 12) {
        clearInterval(w);
        return;
      }
      U.ownerDocument.activeElement !== U && (U.focus(), U.select());
    }, 50);
    return () => {
      cancelAnimationFrame(j), clearInterval(w);
    };
  }, [E]), q(() => {
    if (E) {
      const M = n.find((j) => j.id === E);
      M && !I && Y(M.name);
    }
  }, [E, n]);
  const ae = (M, j) => {
    B(M), Y(j);
  }, ve = () => {
    E && Z.current.trim() && u(E, Z.current.trim()), B(null);
  }, ne = () => {
    B(null);
  }, pe = v || k.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ S(Et, { open: e, onOpenChange: (M) => {
    M ? (B(null), Y("")) : (E && I.trim() && u(E, I.trim()), B(null), Y("")), (!M || !p) && t(M);
  }, width: "w-80", theme: m, align: N, trigger: C, morph: $, contentClassName: O, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${b.headerText}`, children: k }),
    /* @__PURE__ */ i("div", { ref: de, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((M) => {
      const j = M.id === r, F = E === M.id;
      return /* @__PURE__ */ i("div", { "data-active": j ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${j || F ? b.rowActiveBg : b.rowHoverBg} ${E && !F ? "opacity-40 pointer-events-none" : ""}`, children: F ? /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ i(
          "input",
          {
            ref: J,
            autoFocus: !0,
            value: I,
            onChange: (w) => Y(w.target.value),
            onKeyDown: (w) => {
              w.key === "Enter" && (w.preventDefault(), w.stopPropagation(), ve()), w.key === "Escape" && (w.preventDefault(), w.stopPropagation(), ne());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: A
          }
        ) }),
        /* @__PURE__ */ i(
          re.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${b.editConfirm}`,
            onSelect: (w) => {
              w.preventDefault(), ve();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(pn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          re.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${b.editCancel}`,
            onSelect: (w) => {
              w.preventDefault(), ne();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(vt, { className: b.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i(
          re.Item,
          {
            style: A,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${b.rowText} ${j ? "" : b.rowTextHover}`,
            onSelect: x ? () => {
              a(M.id);
            } : (w) => {
              w.preventDefault(), a(M.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${j ? b.rowActiveText : ""}`, children: _ ? _(M) : M.name })
          }
        ),
        /* @__PURE__ */ i(
          re.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${j ? b.btnActive : b.btnBase}`,
            onSelect: (w) => {
              w.preventDefault(), ae(M.id, M.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(qn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          re.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${j ? b.btnActive : b.btnBase}`,
            onSelect: (w) => {
              w.preventDefault();
              const U = o(M.id);
              U && ae(U, `${M.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(gn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          re.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= V ? b.btnDisabled : j ? b.btnDangerActive : b.btnDanger}`,
            onSelect: (w) => {
              w.preventDefault(), d(M.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= V,
            children: /* @__PURE__ */ i(At, { className: b.btnIcon })
          }
        )
      ] }) }, M.id);
    }) }),
    /* @__PURE__ */ S("div", { className: `shrink-0 ${E ? "opacity-40 pointer-events-none" : ""}`, children: [
      g && /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i(re.Separator, { className: b.separator }),
        /* @__PURE__ */ S(
          re.Item,
          {
            className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
            onSelect: (M) => {
              M.preventDefault(), g();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ i(bn, { className: `${b.btnIcon} ${b.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || f || s || c) && /* @__PURE__ */ i(re.Separator, { className: b.separator }),
      l && /* @__PURE__ */ S(
        re.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault();
            const j = l();
            j && ae(j, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(jn, { className: `${b.btnIcon} ${b.icon}` }),
            "New ",
            pe
          ]
        }
      ),
      f && /* @__PURE__ */ S(
        re.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ S("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ S(
        re.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ S("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      c && /* @__PURE__ */ S(
        re.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(At, { className: `${b.btnIcon} ${b.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Tr({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: a = "",
  children: u,
  keepOpen: o = !1,
  selected: d = !1,
  rightAction: l,
  trailing: f
}) {
  Cn();
  const s = jt(), g = Rn(), c = y(!1), x = y(null), { myIndex: p, highlighted: m, setPointer: N } = An({
    label: () => Dn(u),
    activate: () => {
      n || e();
    },
    disabled: n
  }), { query: R } = Er(), k = R.trim() !== "" && p < 0, v = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ S(
    re.Item,
    {
      ref: x,
      "data-ei": p >= 0 ? p : void 0,
      style: { ...g, display: k ? "none" : void 0 },
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${v} ${d ? "ui-item-selected" : ""} ${m ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${a}`,
      onSelect: (C) => {
        if (c.current) {
          c.current = !1;
          return;
        }
        o && C.preventDefault(), e();
      },
      onPointerEnter: () => {
        N(p);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: u }),
        f && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: f }),
        l && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: l.title,
            onPointerDown: (C) => {
              C.stopPropagation(), C.preventDefault(), c.current = !0, l.onClick();
            },
            onClick: (C) => {
              C.stopPropagation(), C.preventDefault();
            },
            children: l.icon
          }
        )
      ]
    }
  );
}
function Cr({ id: e, label: t, icon: n, width: r, side: a = "right", children: u, contentClassName: o }) {
  const { chain: d, setChain: l, morph: f, keyboardOpened: s, setKeyboardOpened: g } = Qe(Ut), c = d.includes(e), x = d[d.length - 1] === e, p = Cn(), m = it(), N = y(null), R = y(null), [k, v] = W(c), C = !c && k;
  q(() => {
    c && v(!0);
  }, [c]);
  const V = () => l((F) => {
    const w = F.indexOf(e);
    return w >= 0 ? F.slice(0, w) : F;
  }), _ = $t(), $ = Xt(), O = y($);
  O.current = $;
  const b = y(null);
  q(() => {
    var w;
    const F = {
      label: t,
      activate: () => {
        g(e), l((U) => U.includes(e) ? U : [...U, e]);
      },
      submenu: !0
    };
    return b.current = F, (w = O.current) == null ? void 0 : w.register(F);
  }, []);
  const A = $ && b.current ? $.items.indexOf(b.current) : -1, E = A >= 0 && A === $.highlightedIndex, B = Q(() => {
    const F = N.current;
    if (!F) return null;
    const w = F.getBoundingClientRect();
    return { left: w.left, top: w.top, width: w.width, height: w.height };
  }, []), I = Wt({
    visible: c,
    morph: f,
    anchor: B,
    onClosed: () => v(!1)
  }), Y = y(() => {
  }), Z = y(() => {
  }), J = y(() => {
  });
  Vt(c && x, _, Y, {
    onCloseSub: () => {
      V(), $ && A >= 0 && $.setHighlighted(A, "keyboard");
    }
  });
  const de = y(s);
  de.current = s, q(() => {
    c && (de.current === e ? (_.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var F;
      return (F = R.current) == null ? void 0 : F.focus();
    }), g(null)) : _.setHighlighted(-1, "keyboard"));
  }, [c]), Qt(c, Z), Gt(c, _, Y, R, !x, J), Ye.useLayoutEffect(() => {
    var w;
    if (!c || _.highlightedIndex < 0 || _.pointerDriven) return;
    const F = (w = R.current) == null ? void 0 : w.querySelector(`[data-ei="${_.highlightedIndex}"]`);
    F == null || F.scrollIntoView({ block: "nearest" });
  }, [c, _.highlightedIndex, _.pointerDriven]);
  const ae = y(null), ve = Q((F) => {
    var w;
    if (F) {
      F.addEventListener("keydown", Y.current, { capture: !0 }), F.addEventListener("wheel", Z.current, { passive: !1 });
      const U = F.ownerDocument;
      ae.current = U, U.addEventListener("keydown", J.current, { capture: !0 });
    } else
      (w = ae.current) == null || w.removeEventListener("keydown", J.current, { capture: !0 }), ae.current = null;
    R.current = F, I(F);
  }, [I]), ne = fe(), pe = { padding: `${z(8, 12, ne)}px ${z(12, 16, ne)}px`, fontSize: z(12, 14, ne) }, M = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${E ? " ui-item-highlighted" : ""}${C ? " ui-sub-closing" : ""}`, j = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${o || ""}`;
  return /* @__PURE__ */ S(re.Sub, { open: c || k, onOpenChange: (F) => l((w) => {
    if (!F) {
      const U = w.indexOf(e);
      return U >= 0 ? w.slice(0, U) : w;
    }
    return w.includes(e) ? w : [...w, e];
  }), children: [
    /* @__PURE__ */ S(
      re.SubTrigger,
      {
        ref: N,
        "data-ei": A >= 0 ? A : void 0,
        style: pe,
        className: M,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          $ && A >= 0 && $.setHighlighted(A, "pointer");
        },
        onPointerDown: (F) => {
          F.pointerType === "pen" && (F.preventDefault(), l((w) => c ? w.slice(0, w.indexOf(e)) : [...w, e]));
        },
        children: [
          a === "left" && /* @__PURE__ */ i(wt, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ S("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          a === "right" && /* @__PURE__ */ i(wt, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(re.Portal, { container: m ?? void 0, children: /* @__PURE__ */ i(
      re.SubContent,
      {
        ref: ve,
        "data-theme": p,
        className: j,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: _.pointerLeave,
        children: /* @__PURE__ */ i(ct.Provider, { value: _, children: u })
      }
    ) })
  ] });
}
const et = 8, _i = ({ open: e, x: t, y: n, onClose: r, children: a, containerRef: u, theme: o = "light", morph: d = !0 }) => {
  const l = fe(), f = z(12, 14, l), s = y(null), g = ot(), [c, x] = W(!1), [p, m] = W([]), [N, R] = W(null), k = $t();
  q(() => {
    if (e)
      return k.setHighlighted(-1, "keyboard"), Tn(r);
  }, [e, r]);
  const v = y({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const C = Q(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), V = Wt({
    visible: !0,
    morph: d,
    anchor: C,
    cloneOnUnmount: !0
  }), _ = y(() => {
  }), $ = y(() => {
  }), O = y(() => {
  });
  Vt(e, k, _), Qt(e, $), Gt(e, k, _, s, p.length > 0, O);
  const b = y(null), A = Q((I) => {
    var Y;
    if (I) {
      I.addEventListener("keydown", _.current, { capture: !0 }), I.addEventListener("wheel", $.current, { passive: !1 });
      const Z = I.ownerDocument;
      b.current = Z, Z.addEventListener("keydown", O.current, { capture: !0 });
    } else
      (Y = b.current) == null || Y.removeEventListener("keydown", O.current, { capture: !0 }), b.current = null;
    s.current = I, x(!!I), V(I);
  }, [V]), [E, B] = W(null);
  return Se(() => {
    var j;
    if (!e || !c || !s.current) return;
    const I = s.current, Y = I.offsetWidth, Z = I.offsetHeight, J = (j = u == null ? void 0 : u.current) == null ? void 0 : j.getBoundingClientRect(), de = J ? J.right : (g == null ? void 0 : g.innerWidth) ?? 0, ae = J ? J.bottom : (g == null ? void 0 : g.innerHeight) ?? 0, ve = J ? J.left : 0, ne = J ? J.top : 0;
    let pe = Math.max(ne + et, v.current.top), M = Math.max(ve + et, v.current.left);
    M + Y > de && (M = de - Y - et), pe + Z > ae && (pe = Math.max(ne + et, ae - Z - et)), B({ left: M, top: pe });
  }, [e, c, t, n, u]), e ? /* @__PURE__ */ S(re.Root, { open: e, onOpenChange: (I) => {
    I || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(re.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(re.Portal, { children: /* @__PURE__ */ i(qt.Provider, { value: o, children: /* @__PURE__ */ i(Ut.Provider, { value: { chain: p, setChain: m, morph: d, keyboardOpened: N, setKeyboardOpened: R }, children: /* @__PURE__ */ i(ct.Provider, { value: k, children: /* @__PURE__ */ i(
      re.Content,
      {
        ref: A,
        "data-theme": o,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (E == null ? void 0 : E.left) ?? v.current.left, top: (E == null ? void 0 : E.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: k.pointerLeave,
        children: a
      }
    ) }) }) }) })
  ] }) : null;
}, Hi = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: a = !1, trailing: u, children: o }) => {
  const d = fe(), l = { padding: `${z(8, 12, d)}px ${z(12, 16, d)}px`, fontSize: z(12, 14, d) }, f = Xt(), s = y(f);
  s.current = f;
  const g = y(null);
  q(() => {
    var m;
    const p = { label: Dn(o), activate: () => {
      r || e();
    } };
    return g.current = p, (m = s.current) == null ? void 0 : m.register(p);
  }, []);
  const c = f && g.current ? f.items.indexOf(g.current) : -1, x = !r && c >= 0 && c === f.highlightedIndex;
  return /* @__PURE__ */ S(
    re.Item,
    {
      "data-ei": c >= 0 ? c : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && f && c >= 0 && f.setHighlighted(c, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: l,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${a ? "ui-item-selected" : ""} ${x ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: o }),
        u && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: u })
      ]
    }
  );
}, Bi = () => /* @__PURE__ */ i(re.Separator, { className: "ui-sep my-1" }), Fi = (e) => /* @__PURE__ */ i(Cr, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), te = 8, Mn = "[data-modal-stack]", De = 220, rt = "cubic-bezier(0.32, 0.72, 0, 1)", bt = 0.94;
function Ue() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ie(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Pn(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function an(e, t, n, r) {
  const a = ++e.current, u = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = Pn(u, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === a && (t.style.transition = `transform ${De}ms ${rt}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === a && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, De + 80));
    });
  });
}
function Rr(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${bt})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${De}ms ${rt}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, De + 60));
    });
  });
}
function un(e, t, n) {
  const r = ++e.current, a = t.getBoundingClientRect(), u = 1 - bt, o = { left: a.left + a.width * u / 2, top: a.top + a.height * u / 2, width: a.width * bt, height: a.height * bt };
  t.style.transition = `transform ${De}ms ${rt}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = Pn(a, o), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, De + 60);
}
function Rt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Mn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function ht(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Mn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Dr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: a,
  footer: u,
  children: o,
  onReset: d,
  morph: l = !0,
  flat: f = !1,
  closable: s = !0,
  dismissOnBackdrop: g = !0
}) {
  const c = y(null), x = y(null), p = y(null), m = fe(), N = z(20, 24, m), R = z(10, 12, m), k = z(12, 14, m), v = z(14, 16, m), C = z(20, 24, m), V = z(20, 24, m), _ = z(20, 24, m), $ = z(14, 16, m), O = z(16, 20, m), b = z(10, 12, m), A = z(12, 14, m), E = z(8, 10, m), B = z(4, 6, m), I = { padding: `${R}px ${N}px` }, Y = { fontSize: k }, Z = { padding: `${V}px ${C}px 16px ${C}px` }, J = { fontSize: v }, de = { padding: `0 ${C}px 16px` }, ae = { padding: `${_}px ${C}px` }, ve = { fontSize: b, padding: `${B}px ${E}px` }, [ne, pe] = W(!1), M = Q((h) => {
    c.current = h, pe(h !== null);
  }, []), j = it(), F = ot(), w = y(F);
  w.current = F;
  const [U, H] = W(null), ye = y(null), D = y(!1), X = y(!1), ie = y(0), ce = y({ w: 0, h: 0 }), Le = y(!1), [Te, ge] = W(!1), [he, we] = W(!1), Ne = y(0), xe = y(!1), [Ae, Ze] = W(!1), at = y(l);
  at.current = l;
  const Je = y(!1), _e = y(!1), Ce = () => {
    _e.current = !0, ge(!0);
  }, He = () => {
    _e.current = !1, ge(!1);
  };
  q(() => {
    e || (H(null), Le.current = !1, D.current = !1, we(!1));
  }, [e]), Se(() => {
    if (!e || Le.current || !ne || !c.current) return;
    Le.current = !0;
    const h = c.current.getBoundingClientRect(), L = w.current ?? null, P = (L == null ? void 0 : L.innerWidth) ?? 0, G = Ie(L);
    H({
      left: Math.max(te, Math.min((P - h.width) / 2, P - h.width - te)),
      top: Math.max(G.top + te, Math.min(G.top + (G.height - h.height) / 2, G.bottom - h.height - te))
    });
  }, [e, ne]), Se(() => {
    if (!e || !ne || !l || Ue() || !c.current) return;
    const h = c.current, L = Rt(h), P = L[L.length - 1];
    Ce(), P ? an(Ne, h, P.getBoundingClientRect(), He) : Rr(Ne, h, He);
  }, [e, ne]);
  const Be = Q(() => {
    if (!s || xe.current) return;
    const h = c.current, L = !!h && Rt(h).length > 0;
    if (!h || !l || Ue() || L) {
      t();
      return;
    }
    xe.current = !0, Ze(!0), Je.current = !0, Ce(), un(Ne, h, () => {
      xe.current = !1, Ze(!1), He(), t();
    });
  }, [l, t, s]), We = Q(() => {
    const h = c.current;
    if (!h || Je.current || !at.current || Ue() || Rt(h).length > 0) return;
    const L = h.ownerDocument, P = h.cloneNode(!0);
    P.removeAttribute("data-modal-stack"), P.removeAttribute("data-state"), P.removeAttribute("role"), P.removeAttribute("data-aria-hidden"), P.removeAttribute("tabindex"), P.setAttribute("aria-hidden", "true"), P.style.pointerEvents = "none", L.body.appendChild(P), un({ current: 0 }, P, () => {
      P.isConnected && P.remove();
    });
  }, []);
  Se(() => () => We(), [We]);
  const ut = y(e);
  Se(() => {
    const h = ut.current;
    ut.current = e, h && !e && We();
  }, [e, ne, We]), q(() => {
    if (!e || !ne || !l || !c.current) return;
    const h = c.current, L = h.parentNode;
    if (!L) return;
    let P = 0, G = null, ee = !1;
    const se = () => {
      P = 0;
      const ue = ht(h);
      if (ue.length > 0)
        h.style.opacity = "", h.style.pointerEvents = "", G = ue[ue.length - 1].getBoundingClientRect(), ee = !0, P = requestAnimationFrame(se);
      else if (ee) {
        ee = !1, G && !Ue() && (Ce(), an(Ne, h, G, He)), G = null;
        const be = w.current ?? null;
        be == null || be.setTimeout(() => {
          !h || !h.isConnected || getComputedStyle(h).opacity !== "1" && (h.style.opacity = "1", h.style.pointerEvents = "");
        }, 240);
      }
    }, le = new MutationObserver(() => {
      !P && ht(h).length > 0 && (P = requestAnimationFrame(se));
    });
    return le.observe(L, { childList: !0 }), () => {
      le.disconnect(), P && cancelAnimationFrame(P);
    };
  }, [e, ne]), q(() => {
    if (!ne || !l || Ue() || !c.current) return;
    const h = c.current;
    let L = Math.round(h.getBoundingClientRect().height), P = !1;
    const G = new ResizeObserver(() => {
      if (!h.isConnected) return;
      const ee = Math.round(h.getBoundingClientRect().height);
      if (!P) {
        P = !0, L = ee;
        return;
      }
      if (Math.abs(ee - L) < 1) return;
      if (ye.current || xe.current || ht(h).length > 0) {
        L = ee;
        return;
      }
      if (_e.current) return;
      const se = L;
      L = ee, Ce();
      const le = h.getBoundingClientRect(), ue = Ie(w.current ?? null), be = !D.current && !X.current, qe = be ? ue.top + (ue.height - se) / 2 : le.top, $e = be ? ue.top + (ue.height - ee) / 2 : le.top;
      h.style.transition = "none", h.style.height = `${se}px`, be && (h.style.top = `${qe}px`), x.current && (x.current.style.overflow = "hidden"), h.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          h.style.height === `${se}px` && (h.style.transition = `height ${De}ms ${rt}${be ? `, top ${De}ms ${rt}` : ""}`, h.style.height = `${ee}px`, be && (h.style.top = `${$e}px`), window.setTimeout(() => {
            h.style.height === `${ee}px` && (h.style.transition = "", h.style.height = "", x.current && (x.current.style.overflow = ""), be && H({ left: le.left, top: $e }), He());
          }, De + 60));
        });
      });
    });
    return G.observe(h), () => G.disconnect();
  }, [ne]), q(() => {
    if (!ne || !c.current || l && !Ue()) return;
    const h = c.current, L = new ResizeObserver(() => {
      if (!h.isConnected || ye.current || xe.current || X.current || ht(h).length > 0) return;
      const P = w.current ?? null, G = Ie(P), ee = (P == null ? void 0 : P.innerWidth) ?? 0, se = h.getBoundingClientRect(), le = Math.max(G.top + te, Math.min(se.top, G.bottom - se.height - te)), ue = Math.max(te, Math.min(se.left, ee - se.width - te));
      (Math.abs(le - se.top) > 0.5 || Math.abs(ue - se.left) > 0.5) && H({ left: ue, top: le });
    });
    return L.observe(h), () => L.disconnect();
  }, [ne, l]);
  const T = Q(() => {
    const h = c.current;
    if (!h) return null;
    const L = h.getBoundingClientRect();
    return { left: L.left, top: L.top, width: L.width, height: L.height };
  }, []), K = Q((h, L) => {
    const P = w.current ?? null, G = (P == null ? void 0 : P.innerWidth) ?? 0, ee = Ie(P), se = T(), le = se ? se.width : Math.min(G - te * 2, 576), ue = se ? se.height : Math.min(ee.height - te * 2, 400);
    return {
      left: Math.max(te, Math.min(h, G - le - te)),
      top: Math.max(ee.top + te, Math.min(L, ee.bottom - ue - te))
    };
  }, [T]);
  q(() => {
    if (!e) return;
    const h = w.current ?? null, L = (h == null ? void 0 : h.visualViewport) ?? null;
    if (!h || !L) return;
    const P = 120;
    X.current = !1, ce.current = { w: h.innerWidth, h: h.innerHeight };
    let G = 0;
    const ee = () => {
      if (xe.current || ye.current) return;
      const le = (h == null ? void 0 : h.innerHeight) ?? 0, ue = (h == null ? void 0 : h.innerWidth) ?? 0, qe = Ie(h).height < le - P, $e = le < ce.current.h - P && ue === ce.current.w;
      qe || $e ? (X.current = !0, ie.current && (clearTimeout(ie.current), ie.current = 0)) : ie.current || (ie.current = (h == null ? void 0 : h.setTimeout(() => {
        X.current = !1, ie.current = 0, we(!1);
      }, 600)) ?? 0), we(X.current), !G && (G = requestAnimationFrame(() => {
        var sn;
        G = 0;
        const nn = c.current;
        if (!nn) return;
        const Fe = Ie(w.current ?? null), Ee = nn.getBoundingClientRect(), rn = ((sn = w.current) == null ? void 0 : sn.innerWidth) ?? 0, Tt = (h == null ? void 0 : h.innerHeight) ?? 0, Kn = Fe.height < Tt - P || Tt < ce.current.h - P && (h == null ? void 0 : h.innerWidth) === ce.current.w;
        ce.current = { w: (h == null ? void 0 : h.innerWidth) ?? 0, h: Tt };
        const ft = Ee.top >= Fe.top + te && Ee.bottom <= Fe.bottom - te, on = () => {
          H({
            left: Math.max(te, Math.min((rn - Ee.width) / 2, rn - Ee.width - te)),
            top: Math.max(Fe.top + te, Math.min(Fe.top + (Fe.height - Ee.height) / 2, Fe.bottom - Ee.height - te))
          });
        };
        if (Kn && !me) {
          if (D.current) {
            ft || H(K(Ee.left, Ee.top));
            return;
          }
          if (ft) return;
          on();
          return;
        }
        if (!X.current) {
          if (D.current) {
            ft || H(K(Ee.left, Ee.top));
            return;
          }
          ft || on();
        }
      }));
    };
    L.addEventListener("resize", ee), L.addEventListener("scroll", ee);
    const se = () => {
      xe.current || ye.current || G || (G = requestAnimationFrame(() => {
        G = 0;
        const le = c.current;
        if (!le) return;
        const ue = w.current ?? null, be = Ie(ue), qe = (ue == null ? void 0 : ue.innerWidth) ?? 0, $e = le.getBoundingClientRect();
        if (D.current) {
          H(K($e.left, $e.top));
          return;
        }
        H({
          left: Math.max(te, Math.min((qe - $e.width) / 2, qe - $e.width - te)),
          top: Math.max(be.top + te, Math.min(be.top + (be.height - $e.height) / 2, be.bottom - $e.height - te))
        });
      }));
    };
    return h.addEventListener("orientationchange", se), () => {
      L.removeEventListener("resize", ee), L.removeEventListener("scroll", ee), h.removeEventListener("orientationchange", se), G && cancelAnimationFrame(G), ie.current && clearTimeout(ie.current);
    };
  }, [e, K]);
  const oe = Q((h) => {
    if (h.target.closest("button")) return;
    D.current = !0;
    const L = T();
    L && (H(K(L.left, L.top)), ye.current = { startX: h.clientX, startY: h.clientY, posX: L.left, posY: L.top }, h.target.setPointerCapture(h.pointerId));
  }, [T, K]), ke = Q((h) => {
    const L = ye.current;
    L && (h.preventDefault(), H(K(L.posX + h.clientX - L.startX, L.posY + h.clientY - L.startY)));
  }, [K]), Me = Q(() => {
    ye.current = null;
  }, []), dt = ye.current !== null, Zt = Q(() => {
    D.current = !1;
    const h = w.current ?? null, L = Ie(h), P = (h == null ? void 0 : h.innerWidth) ?? 0, G = c.current, ee = G ? G.getBoundingClientRect() : { width: 0, height: 0 };
    H({
      left: Math.max(te, Math.min((P - ee.width) / 2, P - ee.width - te)),
      top: Math.max(L.top + te, Math.min(L.top + (L.height - ee.height) / 2, L.bottom - ee.height - te))
    });
  }, []), St = y(0), Jt = Q(() => {
    const h = Date.now();
    h - St.current < 300 ? (St.current = 0, Zt()) : St.current = h;
  }, [Zt]), en = U !== null, Hn = en ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Bn = `${a ? `${a} w-full` : "max-w-xl w-full"}`, tn = {
    ...en ? { left: U.left, top: U.top } : {},
    width: `min(100%, calc(100dvw - ${te * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...he ? {} : { maxHeight: `calc(100dvh - ${te * 2}px)` }
  }, Fn = Q((h) => {
    if (h.key !== "Enter" || h.shiftKey || h.metaKey || h.ctrlKey || h.altKey) return;
    const L = h.target, P = p.current;
    if (!(!!L.closest("[data-modal-close]") || !!P && P.contains(L) && !!L.closest('button, a, [role="button"]')) && L.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !P) return;
    const ee = Array.from(P.querySelectorAll("button[data-modal-confirm]")), se = ee.length > 0 ? ee : Array.from(P.querySelectorAll("button")), le = se[se.length - 1];
    !le || le.disabled || (h.preventDefault(), le.click());
  }, []);
  return /* @__PURE__ */ i(Pe.Root, { open: e, onOpenChange: (h) => {
    h || Be();
  }, children: /* @__PURE__ */ S(Pe.Portal, { container: j ?? void 0, children: [
    /* @__PURE__ */ i(
      Pe.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Ae ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (h) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (h.preventDefault(), g && Be());
        }
      }
    ),
    /* @__PURE__ */ S(
      Pe.Content,
      {
        ref: M,
        onKeyDown: Fn,
        onInteractOutside: (h) => {
          g || h.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Hn} ${Bn}`,
        style: { touchAction: "manipulation", ...Object.keys(tn).length > 0 ? tn : {} },
        children: [
          f ? /* @__PURE__ */ S(
            "div",
            {
              style: Z,
              className: `flex items-center justify-between ${dt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (h) => {
                Te || oe(h);
              },
              onPointerMove: ke,
              onPointerUp: Me,
              onClick: Jt,
              children: [
                /* @__PURE__ */ i(Pe.Title, { style: J, className: "font-bold text-white truncate", children: n }),
                s && /* @__PURE__ */ i(Pe.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(vt, { style: { width: O, height: O } }) })
              ]
            }
          ) : /* @__PURE__ */ S(
            "div",
            {
              style: I,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${dt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (h) => {
                Te || oe(h);
              },
              onPointerMove: ke,
              onPointerUp: Me,
              onClick: Jt,
              children: [
                /* @__PURE__ */ S("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(Pe.Title, { style: Y, className: "font-bold text-white truncate", children: n })
                ] }),
                /* @__PURE__ */ S("div", { className: "flex items-center gap-2", children: [
                  d && /* @__PURE__ */ S("button", { onClick: d, style: ve, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ i(bn, { style: { width: A, height: A } }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(Pe.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(vt, { style: { width: $, height: $ } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: x, style: f ? de : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: o }),
          u && /* @__PURE__ */ i("div", { ref: p, style: f ? ae : void 0, className: f ? "" : "shrink-0", children: f ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: u }) : u })
        ]
      }
    )
  ] }) });
}
function Ki({ children: e }) {
  const t = fe(), n = z(20, 24, t), r = z(8, 12, t);
  return /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${n}px` }, children: e });
}
const Lr = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Ar = {
  zinc: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-blue-600 text-white font-semibold border border-blue-500 hover:bg-blue-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-red-600 text-white font-semibold border border-red-500 hover:bg-red-500 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
}, Mr = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "border border-transparent text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "border border-transparent bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function mt({
  variant: e = "hero",
  tone: t = "zinc",
  className: n = "",
  type: r = "button",
  ...a
}) {
  const u = Ke({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ i(
    "button",
    {
      type: r,
      style: u,
      className: `${Lr} ${e === "hero" ? Ar[t] : Mr[e]} ${n}`,
      ...a
    }
  );
}
function In({ checked: e, size: t, tone: n = "accent" }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: `ui-check-indicator ${e ? "ui-check-indicator-checked" : ""} ${n === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: e ? /* @__PURE__ */ S("svg", { viewBox: "0 0 16 16", style: { width: t, height: t }, "aria-hidden": !0, children: [
        /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
        /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", style: { width: t, height: t }, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Pr({ checked: e, onChange: t, disabled: n = !1, label: r, id: a, className: u = "", labelClassName: o = "", theme: d, variant: l = "pill", tone: f = "accent", block: s = !1 }) {
  const g = l !== "plain", c = fe(), x = z(16, 20, c), p = z(12, 14, c), m = z(12, 14, c), N = z(12, 16, c), R = z(10, 12, c), k = z(8, 10, c);
  return /* @__PURE__ */ S(
    "label",
    {
      className: `ui-checkbox ${g ? "ui-checkbox-pill rounded-lg" : ""} ${f === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${u}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: k, padding: g ? `${R}px ${N}px` : void 0 },
      onClick: (C) => C.stopPropagation(),
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: a,
            checked: e,
            disabled: n,
            onChange: (C) => t(C.target.checked),
            className: "sr-only"
          }
        ),
        g ? /* @__PURE__ */ i(In, { checked: e, size: x, tone: f }) : /* @__PURE__ */ i("span", { className: "ui-checkbox-box", style: { width: x, height: x }, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${o}`, style: { fontSize: m }, children: r })
      ]
    }
  );
}
function Yi(e = "md") {
  const t = me && kn() > 0;
  return e === "sm" ? `${t ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function Ir(e = "md") {
  return e === "sm" ? Ke({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : Ke({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const On = Ge(null);
function Wi() {
  const e = Qe(On);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function qi({ children: e }) {
  const [t, n] = W(null), [r, a] = W(!1), u = y(null), o = fe(), d = z(16, 20, o), l = z(12, 14, o), f = Ir(), s = y(t);
  s.current = t;
  const g = Q(() => {
    const k = s.current;
    k && (k.kind === "confirm" ? k.resolve(!1) : k.kind === "prompt" ? k.resolve(null) : k.resolve());
  }, []), c = Q((k) => {
    if (k.suppressKey) {
      const v = localStorage.getItem(k.suppressKey);
      if (v && Date.now() < parseInt(v, 10))
        return Promise.resolve(!0);
    }
    return new Promise((v) => {
      g(), a(!1), n({ kind: "confirm", options: k, resolve: v });
    });
  }, [g]), x = Q((k) => new Promise((v) => {
    g(), n({ kind: "prompt", options: k, resolve: v });
  }), [g]), p = Q((k) => new Promise((v) => {
    g(), n({ kind: "alert", options: k, resolve: v });
  }), [g]);
  q(() => {
    if (t) {
      const k = setTimeout(() => {
        var v;
        return (v = u.current) == null ? void 0 : v.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [t]);
  const m = Q(() => {
    var k, v;
    if (t) {
      if (t.kind === "confirm") {
        const C = t.options;
        C.suppressKey && r && localStorage.setItem(C.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((v = (k = u.current) == null ? void 0 : k.value) == null ? void 0 : v.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), N = t !== null;
  q(() => {
    if (!N) return;
    const k = (v) => {
      v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey || v.isComposing || (v.preventDefault(), v.stopImmediatePropagation(), m());
    };
    return document.addEventListener("keydown", k, !0), () => document.removeEventListener("keydown", k, !0);
  }, [N, m]);
  const R = Q(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ S(On.Provider, { value: { confirm: c, prompt: x, alert: p }, children: [
    e,
    N && /* @__PURE__ */ i(
      Dr,
      {
        open: !0,
        onClose: R,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ S(Oe, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(mt, { variant: "ghost", onClick: R, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(mt, { onClick: m, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            mt,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: m,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(mt, { "data-modal-confirm": !0, onClick: m, children: "Save" })
        ] }),
        children: /* @__PURE__ */ S("div", { className: "flex flex-col", style: { gap: d }, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { style: { fontSize: l }, className: "text-zinc-400 leading-relaxed", children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            Pr,
            {
              block: !0,
              checked: r,
              onChange: a,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (t == null ? void 0 : t.kind) === "prompt" && /* @__PURE__ */ i(
            "input",
            {
              ref: u,
              type: "text",
              defaultValue: t.options.defaultValue || "",
              placeholder: t.options.placeholder,
              style: f,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const Or = 500, _r = 250, Hr = 5, ze = 88, dn = 4;
function Br(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const a = performance.now(), u = (o) => {
    const d = o - a, l = Math.min(d / t, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(u);
  };
  requestAnimationFrame(u);
}
function Fr({ x: e, y: t, ms: n }) {
  const r = y(null), a = it();
  return q(() => {
    r.current && Br(r.current, n);
  }, [n]), Ht(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "fixed",
          left: e - ze / 2,
          top: t - ze / 2,
          width: ze,
          height: ze,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ S("svg", { ref: r, width: ze, height: ze, viewBox: `0 0 ${ze} ${ze}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: ze / 2,
              cy: ze / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: dn + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: ze / 2,
              cy: ze / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: dn,
              strokeLinecap: "round",
              style: { transform: "rotate(-90deg)", transformOrigin: "center" }
            }
          )
        ] })
      }
    ),
    a ?? document.body
  );
}
function ji() {
  return { "data-no-longpress": "true" };
}
function Kr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Ui({
  children: e,
  showRing: t = !0,
  longPressMs: n = Or,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: a,
  onLongPress: u
}) {
  const [o, d] = W(null), l = wn(), f = y(null), s = y(null), g = y({ x: 0, y: 0, target: null }), c = y(!1), x = Math.min(_r, n * 0.5), p = y(a);
  p.current = a;
  const m = y(u);
  return m.current = u, q(() => {
    if (!me || !l) return;
    const N = (C) => {
      if (!Mt(C.pointerType) || C.button !== 0) return;
      const V = C.target;
      if (!V.closest(r) || (p.current ? !p.current(V) : Kr(V))) return;
      const _ = C.clientX, $ = C.clientY;
      g.current = { x: _, y: $, target: C.target }, c.current = !0, t && (s.current = setTimeout(() => d({ x: _, y: $ }), x)), f.current = setTimeout(() => {
        if (!c.current) return;
        s.current && (clearTimeout(s.current), s.current = null), d(null);
        const O = g.current.target;
        if (!O) return;
        const b = m.current;
        if (b) {
          b(O, _, $);
          return;
        }
        const A = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: _,
          clientY: $,
          button: 2,
          view: window
        });
        O.dispatchEvent(A);
      }, n);
    }, R = (C) => {
      if (!c.current || f.current === null) return;
      const V = C.clientX - g.current.x, _ = C.clientY - g.current.y;
      Math.sqrt(V * V + _ * _) > Hr && (clearTimeout(f.current), f.current = null, s.current && (clearTimeout(s.current), s.current = null), c.current = !1, d(null));
    }, k = () => {
      f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), c.current = !1, d(null);
    }, v = (C) => {
      Mt(C.pointerType) && (f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), c.current = !1, d(null));
    };
    return l == null || l.addEventListener("pointerdown", N), l.addEventListener("pointermove", R), l.addEventListener("pointerup", k), l.addEventListener("pointercancel", k), l.addEventListener("pointerleave", v), () => {
      l.removeEventListener("pointerdown", N), l.removeEventListener("pointermove", R), l.removeEventListener("pointerup", k), l == null || l.removeEventListener("pointercancel", k), l == null || l.removeEventListener("pointerleave", v), f.current !== null && clearTimeout(f.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, x, r]), /* @__PURE__ */ S(Oe, { children: [
    e,
    t && o && /* @__PURE__ */ i(Fr, { x: o.x, y: o.y, ms: n - x })
  ] });
}
function Xi() {
  const e = yr();
  return br ? e === null || Mt(e) : !1;
}
function Re({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  active: r = !1,
  className: a = "",
  type: u = "button",
  ...o
}) {
  const d = Ke({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), l = Ke({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), f = Ke({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), s = "", g = "", c = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", x = {
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
  }, p = {
    active: "bg-white text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white",
    cloudActive: "bg-white text-blue-950",
    cloudInactive: "text-white/70 hover:text-white hover:bg-blue-900/60",
    cloudOpen: "bg-blue-900/60! text-white"
  }, m = {
    light: {
      subtle: { base: `${s} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${g} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${s} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${s} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${g} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${s} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, N = `${g} bg-blue-950 hover:bg-blue-900 text-white`, R = "bg-blue-900!", k = o["data-state"] === "open", v = m[t][e], C = e === "primary" ? l : e.startsWith("tab") ? f : d, V = z(6, 8, fe()), _ = t === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let $;
  if (e === "tab") {
    const O = x[t];
    $ = r ? n ? O.cloudActive : O.active : n ? O.cloudInactive : O.inactive;
  } else e === "tab-header" ? $ = `${r ? n ? p.cloudActive : p.active : n ? p.cloudInactive : p.inactive} ${k ? n ? p.cloudOpen : p.open : ""}` : ($ = `${v.base} ${k ? v.open : ""}`, r && ($ = `${$} ${_}`), e === "primary" && t === "light" && n && ($ = k ? `${N} ${R}` : N));
  return /* @__PURE__ */ i("button", { type: u, className: `${c} ${$} ${a}`, style: { ...C, gap: V }, ...o });
}
const Yr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Wr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Dt = 1900, Lt = 2100;
function qr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function jr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Vi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: a = "", initialView: u }) {
  const o = /* @__PURE__ */ new Date(), d = (() => {
    if (!u) return o;
    const D = /* @__PURE__ */ new Date(u + "T00:00:00");
    return isNaN(D.getTime()) ? o : D;
  })(), [l, f] = W(d.getFullYear()), [s, g] = W(d.getMonth()), [c, x] = W("days"), [p, m] = W(null), N = xt(() => new Set(e), [e]), R = (D) => {
    N.has(D) ? t(e.filter((X) => X !== D)) : t([...e, D]);
  }, k = xt(() => {
    const D = qr(l, s), X = new Date(l, s, 1).getDay(), ie = [];
    for (let ce = 0; ce < X; ce++) ie.push({ key: `pad-${ce}`, day: 0, empty: !0 });
    for (let ce = 1; ce <= D; ce++) ie.push({ key: jr(l, s, ce), day: ce, empty: !1 });
    return ie;
  }, [l, s]), v = (D) => f((X) => Math.max(Dt, Math.min(Lt, X + D))), C = (D) => {
    s + D < 0 ? (f((X) => Math.max(Dt, X - 1)), g(11)) : s + D > 11 ? (f((X) => Math.min(Lt, X + 1)), g(0)) : g((X) => X + D);
  }, V = () => {
    if (p === null) return;
    const D = parseInt(p, 10);
    !isNaN(D) && D >= Dt && D <= Lt && f(D), m(null);
  }, _ = (D) => e.some((X) => X.startsWith(`${l}-${String(D + 1).padStart(2, "0")}`)), $ = n === "dark", O = fe(), b = z(4, 8, O), A = z(16, 20, O), E = z(10, 11, O), B = z(6, 8, O), I = z(12, 14, O), Y = z(6, 10, O), Z = z(12, 14, O), J = z(8, 12, O), de = z(10, 12, O), ae = z(6, 10, O), ve = z(2, 6, O), ne = z(64, 80, O), pe = { padding: b }, M = { width: A, height: A }, j = { fontSize: E, paddingTop: B, paddingBottom: B }, F = { fontSize: I, paddingTop: Y, paddingBottom: Y }, w = { fontSize: Z, paddingTop: J, paddingBottom: J }, U = { fontSize: de, padding: `${ve}px ${ae}px` }, H = $ ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ye = $ ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ S("div", { className: `border rounded-lg overflow-hidden w-full ${$ ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${a}`, children: [
    /* @__PURE__ */ S("div", { className: `flex items-center justify-between px-3 py-2 border-b ${$ ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => c === "months" ? v(-1) : C(-1),
          style: pe,
          className: `rounded transition-colors ${$ ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": c === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(Un, { style: M })
        }
      ),
      c === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => x("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${$ ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(l, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(l),
          onChange: (D) => m(D.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (D) => D.target.select(),
          onBlur: V,
          onKeyDown: (D) => {
            D.key === "Enter" && (D.preventDefault(), V()), D.key === "Escape" && m(null);
          },
          style: { width: ne },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${$ ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => c === "months" ? v(1) : C(1),
          style: pe,
          className: `rounded transition-colors ${$ ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": c === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(wt, { style: M })
        }
      )
    ] }),
    c === "months" ? /* @__PURE__ */ S("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Wr.map((D, X) => /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          onClick: () => {
            g(X), x("days");
          },
          style: w,
          className: `relative font-medium transition-colors border-b ${X === s ? H : ye} ${$ ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            D,
            _(X) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${X === s ? "bg-white" : $ ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        D
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${$ ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            f(o.getFullYear()), g(o.getMonth()), x("days");
          },
          style: { paddingTop: Y, paddingBottom: Y, fontSize: I },
          className: `px-3 font-semibold rounded transition-colors ${$ ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ S("div", { className: "grid grid-cols-7 text-center", children: [
      Yr.map((D) => /* @__PURE__ */ i("div", { style: j, className: `font-semibold uppercase tracking-wider border-b ${$ ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: D }, D)),
      k.map((D) => D.empty ? /* @__PURE__ */ i("div", {}, D.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => R(D.key),
          style: F,
          className: `font-medium transition-colors border-b ${$ ? "border-zinc-800/60" : "border-zinc-50"} ${N.has(D.key) ? H : $ ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: D.day
        },
        D.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ S("div", { className: `px-3 py-2 border-t ${$ ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ S("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((D) => {
        const X = /* @__PURE__ */ new Date(D + "T00:00:00"), ie = X.getFullYear() === o.getFullYear() ? X.toLocaleString("default", { month: "short", day: "numeric" }) : X.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ S(
          "button",
          {
            type: "button",
            onClick: () => R(D),
            "aria-label": `Remove ${ie}`,
            style: U,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${$ ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              ie,
              /* @__PURE__ */ i("span", { className: `leading-none ${$ ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          D
        );
      }) })
    ] })
  ] });
}
function Gi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: a,
  allSelected: u = !1,
  toggleAllLabel: o,
  emptyHint: d = "Nothing here",
  maxHeight: l,
  disabled: f = !1,
  theme: s,
  className: g = ""
}) {
  const c = (v) => t instanceof Set ? t.has(v) : t.includes(v), x = fe(), p = z(12, 16, x), m = z(8, 12, x), N = z(12, 14, x), R = z(16, 20, x), k = r != null || a != null;
  return /* @__PURE__ */ S("div", { className: g, ...s ? { "data-theme": s } : {}, children: [
    k && /* @__PURE__ */ S("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      a != null && /* @__PURE__ */ i("button", { type: "button", disabled: f, onClick: a, className: "ui-checklist-toggleall", children: o ?? (u ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ S(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((v) => {
            const C = c(v.id);
            return /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(v.id),
                className: `ui-checklist-item ${C ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${m}px ${p}px`, fontSize: N },
                children: [
                  /* @__PURE__ */ i(In, { checked: C, size: R }),
                  v.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: v.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: v.label }),
                  v.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: v.secondary })
                ]
              },
              v.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: d })
        ]
      }
    )
  ] });
}
function Qi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: a = "Nothing here",
  maxHeight: u,
  compact: o = !1,
  disabled: d = !1,
  theme: l,
  className: f = ""
}) {
  const s = fe(), g = o ? 10 : z(12, 16, s), c = o ? 6 : z(8, 12, s), x = o ? 12 : z(12, 14, s), p = o ? 14 : z(16, 20, s);
  return /* @__PURE__ */ S("div", { className: f, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ S(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: u ? { maxHeight: u, overflowY: "auto" } : void 0,
        children: [
          e.map((m) => {
            const N = t === m.id;
            return /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(m.id),
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${c}px ${g}px`, fontSize: x },
                children: [
                  /* @__PURE__ */ i("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: N && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  m.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: m.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: m.label }),
                  m.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: m.secondary })
                ]
              },
              m.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: a })
        ]
      }
    )
  ] });
}
const Zi = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: a = "visible",
  offset: u = 8
}) => {
  const o = ot(), { refs: d, floatingStyles: l } = tr({
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
        fn: (f) => {
          var k;
          if (a !== "visible") return {};
          const s = (k = f.elements.floating.ownerDocument) == null ? void 0 : k.defaultView;
          if (!s) return {};
          const g = f.rects.reference, c = Math.max(g.x, 0), x = Math.max(g.y, 0), p = Math.min(g.x + g.width, s.innerWidth), m = Math.min(g.y + g.height, s.innerHeight);
          if (p <= c || m <= x) return {};
          const N = r === "left" ? p - (g.x + g.width) : r === "right" ? c - g.x : 0, R = r === "top" ? x - g.y : r === "bottom" ? m - (g.y + g.height) : 0;
          return { x: f.x + N, y: f.y + R };
        }
      },
      yn(u),
      xn({ padding: 8 }),
      vn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (f) => {
          var m;
          const s = (m = f.elements.floating.ownerDocument) == null ? void 0 : m.defaultView;
          if (!s) return {};
          const g = f.rects.floating.width, c = f.rects.floating.height, x = Math.max(8, Math.min(f.x, s.innerWidth - g - 8)), p = Math.max(8, Math.min(f.y, s.innerHeight - c - 8));
          return { x, y: p };
        }
      }
    ],
    whileElementsMounted: nr
  });
  return Se(() => {
    n && d.setReference(n);
  }, [n, d]), /* @__PURE__ */ S(Oe, { children: [
    !n && /* @__PURE__ */ i("div", { ref: d.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    o && Ht(
      /* @__PURE__ */ i(
        "div",
        {
          ref: d.setFloating,
          className: `ui-chrome ${e}`,
          style: l,
          onMouseDown: (f) => f.stopPropagation(),
          onClick: (f) => f.stopPropagation(),
          onDragStart: (f) => f.preventDefault(),
          children: t
        }
      ),
      o.document.body
    )
  ] });
}, tt = ({ content: e, children: t }) => {
  const n = fe(), r = z(10, 12, n), a = z(6, 6, n), u = z(10, 12, n), o = { padding: `${a}px ${r}px`, fontSize: u }, d = it(), l = ot(), [f, s] = W(!1), [g, c] = W({ x: 0, y: 0 }), x = y(null), p = y(null), m = () => {
    if (!x.current) return;
    const N = x.current.getBoundingClientRect();
    c({ x: N.left + N.width / 2, y: N.top });
  };
  return q(() => () => {
    p.current && clearTimeout(p.current);
  }, []), q(() => (f && l && (m(), l.addEventListener("scroll", m, !0)), () => l == null ? void 0 : l.removeEventListener("scroll", m, !0)), [f]), /* @__PURE__ */ S(
    "div",
    {
      ref: x,
      className: "inline-flex",
      onMouseEnter: () => {
        p.current && clearTimeout(p.current), m(), s(!0);
      },
      onMouseLeave: () => {
        p.current = setTimeout(() => s(!1), 60);
      },
      children: [
        t,
        f && Ht(
          /* @__PURE__ */ S(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white pointer-events-none",
              style: { ...o, left: g.x, top: g.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((N, R) => /* @__PURE__ */ i("div", { className: R > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: N }, R)),
                /* @__PURE__ */ i("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          d ?? document.body
        )
      ]
    }
  );
};
function lt() {
  const e = fe(), t = me, n = t ? z(28, 40, e) : 28, r = t ? z(28, 40, e) : 28, a = t ? z(10, 14, e) : 10, u = t ? z(10, 14, e) : 10, o = t ? z(8, 10, e) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${a}px`, fontSize: u },
    input: { height: r, padding: `0 ${o}px`, fontSize: u }
  };
}
const Ji = me ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Ur = me ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", pt = me ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Xr = "hover:bg-red-950/50", eo = me ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", to = "bg-blue-900/50 border-blue-700 text-blue-300", no = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Vr = me ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", ro = me ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", yt = me ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Gr = "inline-flex rounded overflow-hidden border border-zinc-700", io = me ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", gt = ({ onClick: e, disabled: t, title: n, className: r = Ur, children: a }) => {
  const u = lt();
  return /* @__PURE__ */ i(tt, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, style: u.control, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: a }) });
}, oo = ({ value: e, options: t, onChange: n, disabled: r, active: a, stretch: u }) => {
  const o = lt();
  return /* @__PURE__ */ i("div", { className: `${Gr}${u ? " w-full" : ""}`, children: t.map((d) => {
    const l = a ? a(d.v) : e === d.v;
    return /* @__PURE__ */ i(
      "button",
      {
        disabled: r,
        onClick: () => n(d.v),
        style: o.control,
        className: `font-medium transition-colors disabled:opacity-30 ${u ? "flex-1" : ""} ${l ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${d.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
        children: d.l
      },
      d.v
    );
  }) });
}, so = ({ children: e }) => /* @__PURE__ */ S("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: me ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Qr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Zr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", co = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ S("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? Qr : Zr, children: e }),
  t
] }), lo = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ S("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), ao = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: a }) => /* @__PURE__ */ S(Oe, { children: [
  /* @__PURE__ */ i(gt, { onClick: () => r(-1), disabled: e, title: "Move up", className: pt, children: /* @__PURE__ */ i(Xn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(gt, { onClick: () => r(1), disabled: e, title: "Move down", className: pt, children: /* @__PURE__ */ i(Vn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(gt, { onClick: t, disabled: e, title: "Duplicate", className: pt, children: /* @__PURE__ */ i(gn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: yt }),
  /* @__PURE__ */ i(gt, { onClick: n, disabled: e, title: "Delete", className: `${pt} ${Xr}`, children: /* @__PURE__ */ i(At, { className: "w-2.5 h-2.5" }) })
] }), Jr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), ei = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), ti = /^(https?:\/\/|mailto:)/i;
function ni(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const a = n.slice(0, r).trim().toLowerCase(), u = n.slice(r + 1).trim();
    ei.has(a) && u && t.push(`${a}: ${u}`);
  }
  return t.join("; ");
}
function Ot(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const d = document.createDocumentFragment();
    for (const l of Array.from(t.childNodes)) d.appendChild(Ot(l));
    return d;
  };
  if (!Jr.has(n)) return r();
  if (n === "a") {
    const d = t.getAttribute("href") || "";
    if (!ti.test(d)) return r();
  }
  const a = document.createElement(n), u = t.getAttribute("style"), o = ni(u || "");
  if (o && a.setAttribute("style", o), n === "a") {
    a.setAttribute("href", t.getAttribute("href"));
    const d = t.getAttribute("target"), l = t.getAttribute("rel");
    d && a.setAttribute("target", d), l && a.setAttribute("rel", l);
  }
  for (const d of Array.from(t.childNodes)) a.appendChild(Ot(d));
  return a;
}
function _n(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function ri(e) {
  const t = _n(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const o of Array.from(n.content.childNodes)) r.appendChild(Ot(o));
  const a = document.createElement("div");
  return a.appendChild(r), a.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function uo(e) {
  const t = _n(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function fo(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const ii = { text: "#52525b" }, oi = ({ node: e, selected: t, extension: n, editor: r, view: a, getPos: u }) => {
  var g;
  const o = e.attrs.field ?? "", d = n.options, l = ((g = d.resolve) == null ? void 0 : g.call(d, o)) ?? null, f = (l == null ? void 0 : l.color) ?? ii, s = (l == null ? void 0 : l.label) ?? `{{${o}}}`;
  return /* @__PURE__ */ i(
    or,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: f.text,
        color: "#fff",
        borderRadius: 10,
        padding: "0 6px",
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap",
        fontSize: "inherit",
        lineHeight: "inherit"
      },
      onMouseDown: (c) => {
        var N;
        if (c.button !== 0 || !r.isEditable) return;
        c.preventDefault(), r.isFocused || r.commands.focus();
        const x = typeof u == "function" ? u() : null;
        if (x == null) return;
        const p = a.state.doc.resolve(x), m = p.nodeAfter;
        m && kt.isSelectable(m) && a.dispatch(a.state.tr.setSelection(new kt(p))), (N = d.onTokenClick) == null || N.call(d, o, c.currentTarget.getBoundingClientRect(), x);
      },
      children: s
    }
  );
};
function si(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function fn(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const ci = mr.extend({
  name: "token",
  selectable: !0,
  addOptions() {
    var e;
    return {
      ...(e = this.parent) == null ? void 0 : e.call(this),
      resolve: null,
      onTokenClick: null
    };
  },
  addNodeView() {
    return ir(oi);
  },
  addAttributes() {
    return {
      field: {
        default: null,
        parseHTML: (e) => e.getAttribute("data-field"),
        renderHTML: (e) => e.field ? { "data-field": e.field } : {}
      },
      label: {
        default: null,
        parseHTML: (e) => e.getAttribute("data-label"),
        renderHTML: (e) => e.label ? { "data-label": e.label } : {}
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
  renderHTML({ node: e, HTMLAttributes: t }) {
    return ["span", rr({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), li = 240, ai = 280, ui = ({ props: e, onApi: t }) => {
  const n = $t(), r = y(t);
  r.current = t, q(() => {
    r.current(n);
  }, [n]);
  const a = y(null);
  q(() => {
    var o, d;
    n.pointerDriven || (d = (o = a.current) == null ? void 0 : o.querySelector(".ui-item-highlighted")) == null || d.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex, n.pointerDriven]), q(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const u = jt();
  return /* @__PURE__ */ i(ct.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: ai, maxHeight: li },
      onMouseDown: (o) => o.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: a, children: e.items.map((o) => /* @__PURE__ */ i(
        di,
        {
          item: o,
          d: u,
          command: () => e.command({ field: o.key })
        },
        o.key
      )) })
    }
  ) });
}, di = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: a, setPointer: u } = An({
    label: () => e.label,
    activate: n
  }), o = fe(), d = { padding: `${z(8, 12, o)}px ${z(12, 16, o)}px`, fontSize: z(12, 14, o) };
  return /* @__PURE__ */ S(
    "div",
    {
      role: "option",
      style: d,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${t.itemDefault} ${a ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => u(r),
      onClick: n,
      children: [
        /* @__PURE__ */ i("span", { className: `${t.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ i("span", { className: "block w-2 h-2 rounded-full", style: { background: e.color.text } }) }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: e.label }),
        e.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: e.color.text }, children: e.group })
      ]
    }
  );
}, fi = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(ui, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const a = pr(r);
      e = { holder: r, root: a, unmount: null, props: n, api: null };
      const u = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: o, y: d, placement: l, strategy: f }) => {
          var c, x;
          if (!e) return;
          const s = (x = (c = e.props) == null ? void 0 : c.clientRect) == null ? void 0 : x.call(c), g = s && !l.endsWith("-end") ? s.width : 0;
          r.style.position = f, r.style.left = `${o + g}px`, r.style.top = `${d}px`;
        }
      });
      e.unmount = u, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      if (!(e != null && e.props) || !e.api) return !1;
      const { items: r, command: a } = e.props;
      if (r.length === 0) return !1;
      const u = e.api, o = n.key;
      if (o === "ArrowDown" || o === "ArrowUp") {
        n.preventDefault();
        const d = u.highlightedIndex, l = o === "ArrowDown" ? 1 : -1;
        return u.setHighlighted((d + l + r.length) % r.length, "keyboard"), !0;
      }
      if (o === "Enter" || o === "Tab") {
        n.preventDefault();
        const d = u.highlightedIndex, l = d >= 0 ? d : 0, f = u.items[l];
        return f ? f.activate() : r[l] && a({ field: r[l].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, ho = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, hi = Ye.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: a,
  onStateChange: u,
  resolveToken: o,
  suggestionItems: d,
  onTokenClick: l,
  onSelectionChange: f
}, s) => {
  const g = y(o);
  g.current = o;
  const c = y(d);
  c.current = d;
  const x = y(l);
  x.current = l;
  const p = y(f);
  p.current = f;
  const m = y(null), N = y(null), R = y(t);
  R.current = t;
  const k = y(r);
  k.current = r;
  const v = y(u);
  v.current = u;
  const C = y(null), V = (A) => {
    var I;
    const E = {
      bold: A.isActive("bold"),
      italic: A.isActive("italic"),
      underline: A.isActive("underline"),
      strike: A.isActive("strike"),
      link: A.isActive("link"),
      color: A.getAttributes("textStyle").color || ""
    }, B = C.current;
    B && B.bold === E.bold && B.italic === E.italic && B.underline === E.underline && B.strike === E.strike && B.link === E.link && B.color === E.color || (C.current = E, (I = v.current) == null || I.call(v, E));
  }, _ = (A) => {
    var Z;
    const E = A.state.selection;
    let B = null;
    E instanceof kt && E.node.type.name === "token" ? (B = { key: E.node.attrs.field ?? "", pos: E.from }, m.current = E.from) : m.current != null && (m.current = A.state.tr.mapping.map(m.current));
    const I = N.current, Y = I && B && I.key === B.key && I.pos === B.pos;
    !I && !B || Y || (N.current = B, (Z = p.current) == null || Z.call(p, B));
  }, $ = (A) => {
    const E = ri(si(A));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(E) ? "" : E;
  }, O = Ye.useMemo(() => {
    const A = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: E }) => {
        var B;
        return ((B = c.current) == null ? void 0 : B.call(c, E)) ?? [];
      },
      command: ({ editor: E, range: B, props: I }) => {
        E.chain().focus().insertContentAt(B, { type: "token", attrs: { field: I.field } }).run();
      },
      render: fi
    };
    return ci.configure({
      resolve: g.current ?? null,
      suggestion: A,
      onTokenClick: (E, B, I) => {
        var Y;
        m.current = I, (Y = x.current) == null || Y.call(x, E, B, I);
      }
    });
  }, []), b = sr({
    immediatelyRender: !1,
    extensions: [
      lr,
      ar.configure({ placeholder: n }),
      ur,
      dr,
      hr,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      fr.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      O
    ],
    content: fn(e || ""),
    editable: !r,
    onUpdate: ({ editor: A }) => {
      R.current($(A.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: A }) => {
      V(A), _(A);
    }
  });
  return q(() => {
    if (!b || b.isFocused) return;
    $(b.getHTML()) !== e && (C.current = null, b.commands.setContent(fn(e || ""), { emitUpdate: !1 }), V(b));
  }, [e, b]), q(() => {
    b && b.setEditable(!r);
  }, [r, b]), q(() => {
    b && (C.current = null, V(b), _(b));
  }, [b]), Yn(s, () => ({
    exec: (A, E) => {
      if (!(!b || k.current))
        switch (A) {
          case "bold":
            b.chain().focus().toggleBold().run();
            break;
          case "italic":
            b.chain().focus().toggleItalic().run();
            break;
          case "underline":
            b.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            b.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            E && b.chain().focus().setColor(E).run();
            break;
          case "unsetColor":
            b.chain().focus().unsetColor().run();
            break;
          case "link":
            E && b.chain().focus().extendMarkRange("link").setLink({ href: E }).run();
            break;
          case "unlink":
            b.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => b == null ? void 0 : b.commands.focus(),
    insertToken: (A) => {
      !b || k.current || b.chain().focus().insertContent({ type: "token", attrs: { field: A } }).run();
    },
    replaceToken: (A) => {
      if (!b || k.current) return;
      const E = m.current;
      E != null && b.commands.command(({ tr: B }) => {
        const I = B.doc.nodeAt(E);
        if (!I || I.type.name !== "token") return !1;
        B.setNodeMarkup(E, void 0, { field: A });
        const Y = B.doc.resolve(E);
        return Y.nodeAfter && Y.nodeAfter.type.name === "token" && B.setSelection(new kt(Y)), !0;
      });
    }
  }), [b]), /* @__PURE__ */ i(cr, { editor: b, className: `richtext-editor ${a || ""}` });
});
hi.displayName = "RichTextEditor";
const mi = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], pi = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], hn = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), mo = ({ value: e, disabled: t, onChange: n }) => {
  const [r, a] = W(!1), u = lt();
  return /* @__PURE__ */ i(
    Et,
    {
      open: r,
      onOpenChange: a,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ S(Re, { theme: "dark", disabled: t, style: u.control, className: "justify-between min-w-0", children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(_t, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: mi.map((o) => /* @__PURE__ */ i(Tr, { onClick: () => {
        n(o), a(!1);
      }, icon: o === e ? /* @__PURE__ */ i(pn, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: o }, children: o }) }, o))
    }
  );
}, gi = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, a] = W(!1), u = lt(), [o, d] = W(""), l = () => {
    var s;
    const f = o.trim();
    f && ((s = e.current) == null || s.exec("link", f), a(!1));
  };
  return /* @__PURE__ */ i(
    Et,
    {
      open: r,
      onOpenChange: a,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ i(
        Re,
        {
          theme: "dark",
          active: n,
          disabled: t,
          onMouseDown: (f) => f.preventDefault(),
          style: { ...u.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(Zn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ S("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: o,
            onChange: (f) => d(f.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (f) => {
              f.key === "Enter" && (f.preventDefault(), l());
            },
            style: u.input,
            className: Vr + " w-full"
          }
        ),
        /* @__PURE__ */ S("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(Re, { theme: "dark", onClick: l, style: u.control, disabled: !o.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            Re,
            {
              theme: "dark",
              onClick: () => {
                var f;
                (f = e.current) == null || f.exec("unlink"), a(!1);
              },
              style: u.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, po = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: a }) => {
  const [u, o] = W(!1), d = (s, g) => {
    var c;
    return (c = e.current) == null ? void 0 : c.exec(s, g);
  }, l = lt(), f = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ S("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(tt, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i(Re, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || f("bold"), disabled: t || f("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => d("bold"), style: { ...l.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
    /* @__PURE__ */ i(tt, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i(Re, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || f("italic"), disabled: t || f("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => d("italic"), style: { ...l.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
    /* @__PURE__ */ i(tt, { content: "Underline", children: /* @__PURE__ */ i(Re, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => d("underline"), style: { ...l.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Gn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(tt, { content: "Strikethrough", children: /* @__PURE__ */ i(Re, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => d("strikeThrough"), style: { ...l.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Qn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: yt }),
    /* @__PURE__ */ i(gi, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: yt }),
    /* @__PURE__ */ i(
      Et,
      {
        open: u,
        onOpenChange: o,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ S(Re, { theme: "dark", disabled: t, style: l.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(hn, {}),
          /* @__PURE__ */ i(_t, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ S("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                d("unsetColor"), o(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(hn, { className: "w-3.5 h-3.5" })
            }
          ),
          pi.map((s) => /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                d("foreColor", s), o(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${s === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: s },
              title: s
            },
            s
          ))
        ] })
      }
    ),
    a && /* @__PURE__ */ S(Oe, { children: [
      /* @__PURE__ */ i("div", { className: yt }),
      a
    ] })
  ] });
};
function go({ title: e, icon: t, count: n, tone: r = "default", collapsed: a, onToggle: u, trailing: o, bodyClass: d, className: l = "", dataProps: f, children: s }) {
  const g = fe(), c = Ke({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), x = z(14, 16, g), p = { width: x, height: x }, m = z(10, 12, g);
  return /* @__PURE__ */ S("div", { ...f, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${l}`, children: [
    /* @__PURE__ */ S("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: c, children: [
      /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          onClick: u,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            a ? /* @__PURE__ */ i(wt, { className: "text-zinc-400 shrink-0", style: p }) : /* @__PURE__ */ i(_t, { className: "text-zinc-400 shrink-0", style: p }),
            t,
            /* @__PURE__ */ i("span", { className: "font-semibold text-zinc-200 truncate", children: e }),
            n && /* @__PURE__ */ i("span", { className: "text-zinc-500 shrink-0", style: { fontSize: m }, children: n })
          ]
        }
      ),
      o && /* @__PURE__ */ i("div", { className: "shrink-0", children: o })
    ] }),
    !a && s && /* @__PURE__ */ i("div", { className: d || "ui-card-band border-t p-1.5 space-y-1", children: s })
  ] });
}
export {
  Re as Button,
  go as CardSection,
  In as CheckMark,
  Pr as Checkbox,
  Gi as Checklist,
  lo as ChromeHeader,
  co as ContentRow,
  _i as ContextMenu,
  Bi as ContextMenuDivider,
  Hi as ContextMenuItem,
  Fi as ContextMenuSub,
  Sn as DROPDOWN_MAX_HEIGHT,
  Vi as DatePicker,
  qi as DialogProvider,
  Tr as DropdownItem,
  Et as DropdownMenu,
  Cr as DropdownSubmenu,
  qt as DropdownThemeContext,
  mi as FONTS,
  Zi as FloatingChrome,
  mo as FontMenu,
  po as FormatToolbar,
  me as IS_COARSE,
  br as IS_TOUCH_CAPABLE,
  Oi as ItemManagerDropdown,
  Ui as LongPressMenuProvider,
  Ft as MORPH_EASE,
  Ve as MORPH_MS,
  Kt as MORPH_OPACITY_MS,
  ct as MenuHighlightContext,
  Ln as MenuSearchContext,
  Dr as Modal,
  Ki as ModalFooter,
  mt as ModalFooterButton,
  gr as PopoutWindowContext,
  ho as RICH_TEXT_STATE_IDLE,
  Qi as RadioList,
  hi as RichTextEditor,
  so as SectionHeader,
  oo as Seg,
  ao as StructureControls,
  Ut as SubmenuContext,
  Ur as TB_BTN,
  pt as TB_BTN_ICON,
  Xr as TB_DANGER,
  yt as TB_DIVIDER,
  Vr as TB_INPUT,
  ro as TB_NUM,
  io as TB_PICKER,
  Ji as TB_ROW_LABEL,
  Gr as TB_SEG,
  eo as TB_TOGGLE,
  no as TB_TOGGLE_OFF,
  to as TB_TOGGLE_ON,
  ci as Token,
  oi as TokenChipView,
  gt as ToolButton,
  tt as Tooltip,
  Yt as ZOOM_FROM,
  wr as cloneOverlayClose,
  z as coarsePx,
  fo as escapeHtml,
  kn as getCoarseScale,
  jt as getDropdownClasses,
  Pi as getHardwareKeyboard,
  Mi as getLastPointerType,
  Yi as inputCls,
  Kr as isInteractiveElement,
  Mt as isTouchLike,
  $n as nearestOverlayOrigin,
  _n as normalizeSpaces,
  Ct as overlayMorphEnabled,
  vr as playOverlayClose,
  xr as playOverlayOpen,
  fn as preprocessTokenHtml,
  ri as sanitizeRichText,
  Li as setCoarseScale,
  uo as stripRichText,
  si as stripTokenWrappers,
  Ai as useCoarse,
  fe as useCoarseScale,
  Ke as useCoarseSize,
  wn as useCurrentDocument,
  ot as useCurrentWindow,
  Wi as useDialog,
  zr as useDropdownPosition,
  Cn as useDropdownTheme,
  Ii as useHardwareKeyboard,
  Ir as useInputSize,
  Rn as useItemSize,
  yr as useLastPointerType,
  ji as useLongPressOptOut,
  Xt as useMenuHighlight,
  Er as useMenuSearch,
  Wt as useOverlayMorph,
  Bt as usePopoutWindow,
  it as usePortalTarget,
  Xi as useTouchMode
};
