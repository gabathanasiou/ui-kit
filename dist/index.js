"use client";
import { jsxs as R, jsx as g, Fragment as rt } from "react/jsx-runtime";
import Rt, { createContext as en, useContext as tn, useState as X, useEffect as Z, useRef as v, useCallback as oe, useLayoutEffect as Xe, useMemo as Un, useImperativeHandle as Gl } from "react";
import * as ce from "@radix-ui/react-dropdown-menu";
import { Search as Ql, X as Xn, Check as Lo, Pencil as Zl, Copy as Bo, Trash2 as Lr, RotateCcw as Fo, Plus as ea, ChevronRight as Gn, ChevronLeft as ta, ArrowUp as na, ArrowDown as ra, ChevronDown as ni, Underline as ia, Strikethrough as oa, RemoveFormatting as sa, Link as la } from "lucide-react";
import { computePosition as aa, offset as _o, flip as Ho, shift as Wo, size as ca, useFloating as ua, autoUpdate as fa } from "@floating-ui/react-dom";
import * as ut from "@radix-ui/react-dialog";
import { createPortal as ri } from "react-dom";
import { mergeAttributes as da, ReactNodeViewRenderer as ha, NodeViewWrapper as pa, useEditor as ma, EditorContent as ga } from "@tiptap/react";
import { PluginKey as Je, Plugin as st, Selection as Kt, TextSelection as He, AllSelection as ya, NodeSelection as Ut } from "@tiptap/pm/state";
import xa from "@tiptap/starter-kit";
import ba from "@tiptap/extension-placeholder";
import { TextStyle as ka, FontFamily as wa, FontSize as va } from "@tiptap/extension-text-style";
import Sa from "@tiptap/extension-color";
import Ca from "@tiptap/extension-link";
import Ta from "@tiptap/extension-underline";
import Ea from "@tiptap/suggestion";
import { Mention as Na } from "@tiptap/extension-mention";
import { createRoot as Ma } from "react-dom/client";
const Aa = en(null);
function ii() {
  return tn(Aa);
}
function vn() {
  const n = ii();
  return n ? n.document.body : null;
}
function jo() {
  const n = ii();
  return n ? n.document : typeof document < "u" ? document : null;
}
function Sn() {
  return ii() ?? (typeof window < "u" ? window : null);
}
const Cn = typeof window < "u", Me = Cn && window.matchMedia("(pointer: coarse)").matches, za = Cn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let fr = 0.5;
const hn = /* @__PURE__ */ new Set();
function Qh(n) {
  fr = Math.max(0, Math.min(1, n)), hn.forEach((e) => e());
}
function qo() {
  return fr;
}
function Zh() {
  const [, n] = X(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return hn.add(e), () => {
      hn.delete(e);
    };
  }, []), Me && fr > 0;
}
function Ce() {
  const [, n] = X(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return hn.add(e), () => {
      hn.delete(e);
    };
  }, []), fr;
}
function A(n, e, t) {
  return Me ? Math.round(n + (e - n) * t) : n;
}
function Tt(n, e) {
  const t = Ce();
  return Me && t > 0 ? {
    padding: `${A(n.py, e.py, t)}px ${A(n.px, e.px, t)}px`,
    fontSize: `${A(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function Br(n) {
  return n === "touch" || n === "pen";
}
let Vt = null;
const Fr = /* @__PURE__ */ new Set();
Cn && window.addEventListener("pointerdown", (n) => {
  Vt = n.pointerType, Fr.forEach((e) => e());
}, !0);
function ep() {
  return Vt;
}
function Ra() {
  const [, n] = X(0), e = v(Vt);
  return Z(() => {
    const t = () => {
      e.current !== Vt && (e.current = Vt, n((r) => r + 1));
    };
    return Fr.add(t), () => {
      Fr.delete(t);
    };
  }, []), Vt;
}
const Vo = ["(any-hover: hover)", "(any-pointer: fine)"];
function Ko() {
  return Cn ? Vo.some((n) => window.matchMedia(n).matches) : !1;
}
let Qn = Ko();
const _r = /* @__PURE__ */ new Set();
function qi(n) {
  Qn !== n && (Qn = n, _r.forEach((e) => e()));
}
var Po;
if (Cn) {
  const n = () => qi(Ko());
  for (const s of Vo) {
    const l = window.matchMedia(s);
    (Po = l.addEventListener) == null || Po.call(l, "change", n);
  }
  window.addEventListener("focus", n), document.addEventListener("visibilitychange", n);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && n();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || qi(!0));
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
function tp() {
  return Qn;
}
function np() {
  const [, n] = X(0);
  return Z(() => {
    const e = () => n((t) => t + 1);
    return _r.add(e), () => {
      _r.delete(e);
    };
  }, []), Qn;
}
const Xt = 220, oi = "cubic-bezier(0.32, 0.72, 0, 1)", si = 170, li = 0.94;
function Sr(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Jo(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Yo(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Jo({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Ia(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${li})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Yo(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Xt}ms ${oi}, opacity ${si}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Xt + 60);
    });
  });
}
function Oa(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Yo(e, t);
  e.style.transition = `transform ${Xt}ms ${oi}, opacity ${si}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${li})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Xt + 60);
}
function Da(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Jo({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Xt}ms ${oi}, opacity ${si}ms ease`, r.style.transform = `scale(${li})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Xt + 60));
    });
  });
}
function ai(n) {
  const e = v(null), [t, r] = X(!1), i = v(null), o = v(0), s = oe((p) => {
    if (n.ref && (n.ref.current = p), p) {
      o.current = 0, e.current = p;
      const x = p.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const m = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === m && (e.current = null, r(!1), !(!m || !n.cloneOnUnmount || !a.current) && m.style.visibility !== "hidden" && Sr(f.current) && Da(m, u.current, i.current));
    });
  }, []), l = oe(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const m = p.getBoundingClientRect();
    (m.width > 0 || m.height > 0) && (i.current = { left: m.left, top: m.top, width: m.width, height: m.height });
  }, []), a = v(n.visible);
  a.current = n.visible;
  const c = v(n.visible), u = v(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const d = v(n.onClosed);
  d.current = n.onClosed;
  const f = v(n.morph !== !1);
  f.current = n.morph !== !1;
  const h = v(0);
  return Xe(() => {
    if (!t || !a.current || !Sr(f.current)) return;
    const p = e.current;
    p && Ia(h, p, u.current);
  }, [t, n.visible]), Z(() => {
    if (!t || !a.current) return;
    let p = 0;
    const m = () => {
      p = 0, l(), p = requestAnimationFrame(m);
    };
    return p = requestAnimationFrame(m), () => {
      p && cancelAnimationFrame(p);
    };
  }, [t, l]), Xe(() => {
    var y;
    const p = c.current;
    if (c.current = n.visible, n.visible || !p) return;
    const m = e.current;
    if (!m || !Sr(f.current)) {
      (y = d.current) == null || y.call(d);
      return;
    }
    Oa(h, m, u.current, () => {
      var x;
      return (x = d.current) == null ? void 0 : x.call(d);
    });
  }, [n.visible]), Z(() => {
    if (!t || !a.current) return;
    const p = (m) => {
      const y = e.current;
      y && y.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [t]), Z(() => {
    if (!t || !a.current) return;
    const p = (m) => {
      const y = e.current;
      y && y.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [t]), s;
}
const Uo = 384;
function $a(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Pa({
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
  const c = Sn(), u = v(c);
  u.current = c;
  const d = v(a);
  d.current = a, Xe(() => {
    if (!t) return;
    let f = 0, h = !1;
    const p = () => {
      f || (f = requestAnimationFrame(m));
    }, m = () => {
      if (f = 0, h) return;
      const H = u.current, D = n.current, E = e.current;
      if (!H || !D || !E || !E.isConnected) return;
      const F = (r == null ? void 0 : r.current) ?? E, N = $a(H), U = s ?? Uo, $ = Math.min(l, U), j = Math.max(0, E.offsetHeight - F.offsetHeight), M = Math.max($, Math.ceil(F.scrollHeight + j)), z = Math.min(M, U);
      E.style.maxHeight = `${z}px`;
      let P = z;
      aa(D, E, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          _o(i),
          Ho({ boundary: N, padding: o, fallbackStrategy: "bestFit" }),
          Wo({ boundary: N, padding: o, mainAxis: !1 }),
          ca({
            boundary: N,
            padding: o,
            apply({ availableHeight: L }) {
              P = Math.max($, Math.floor(Math.min(U, L))), E.style.maxHeight = `${P}px`;
            }
          })
        ]
      }).then(({ x: L, y: te, placement: ae }) => {
        h || d.current({
          top: Math.round(te),
          left: Math.round(L),
          maxH: P,
          side: ae.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    m();
    const y = u.current, x = (y == null ? void 0 : y.document) ?? null, w = (y == null ? void 0 : y.visualViewport) ?? null, k = () => p();
    w == null || w.addEventListener("resize", k), w == null || w.addEventListener("scroll", k), y == null || y.addEventListener("resize", k), x == null || x.addEventListener("scroll", k, { capture: !0, passive: !0 });
    let T = null;
    return typeof ResizeObserver < "u" && (T = new ResizeObserver(k), e.current && T.observe(e.current), r != null && r.current && T.observe(r.current)), () => {
      h = !0, f && cancelAnimationFrame(f), w == null || w.removeEventListener("resize", k), w == null || w.removeEventListener("scroll", k), y == null || y.removeEventListener("resize", k), x == null || x.removeEventListener("scroll", k, { capture: !0 }), T == null || T.disconnect();
    };
  }, [t, n, e, r, i, o, s, l]);
}
let Ft = null;
function Xo(n) {
  return Ft == null || Ft(), Ft = n, () => {
    Ft === n && (Ft = null);
  };
}
const ci = en("dark"), Go = () => tn(ci);
function Qo() {
  const n = Ce();
  return {
    padding: `${A(8, 12, n)}px ${A(12, 16, n)}px`,
    fontSize: `${A(12, 14, n)}px`,
    lineHeight: `${A(18, 22, n)}px`
  };
}
const La = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Vi = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Ba = (n) => n ? "text-xs" : "text-[10px]";
function ui(n) {
  const e = Me && qo() > 0;
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
    headerPad: Vi(e),
    headerText: `${Vi(e)} font-semibold uppercase tracking-wider ${Ba(e)} ui-label`,
    // Item padding
    itemPad: La(e),
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
function Zo(n) {
  const e = [];
  return Rt.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (Rt.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const fi = en({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Tn = en(null), di = () => tn(Tn), es = en({ query: "", setQuery: () => {
} }), Fa = () => tn(es), _a = () => !0;
function dr(n) {
  const e = v([]), [t, r] = X(-1), [i, o] = X(!1), [s, l] = X(0), a = oe((f) => (e.current = [...e.current, f], l((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), l((h) => h + 1);
  }), []), c = oe((f, h) => {
    r(f), o(h === "pointer");
  }, []), u = oe(() => {
    o((f) => f && (r(-1), !1));
  }, []);
  return Un(() => ({
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
function ts(n) {
  const e = di(), t = v(e);
  t.current = e;
  const r = v(null);
  Z(() => {
    var a;
    const l = { label: n.label(), activate: n.activate };
    return r.current = l, (a = t.current) == null ? void 0 : a.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function hi(n, e, t, r) {
  const i = v(-1);
  i.current = e.highlightedIndex;
  const o = v(e);
  o.current = e;
  const s = v(n);
  s.current = n;
  const l = v(r);
  l.current = r;
  const a = v({ text: "", time: 0 }), c = v(!1);
  c.current || (c.current = !0, t.current = (u) => {
    var p, m, y, x, w;
    if (!s.current) return;
    const d = u.target;
    if (!!d && !!d.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const k = (m = (p = l.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : m.call(p, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), k && u.preventDefault());
      return;
    }
    const h = o.current.items;
    if (h.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = u.key === "ArrowDown" ? 1 : -1, T = (i.current + k + h.length) % h.length;
        o.current.setHighlighted(T, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = i.current;
        k >= 0 && k < h.length && h[k].submenu && h[k].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (w = (x = l.current) == null ? void 0 : x.onCloseSub) == null || w.call(x);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = i.current;
        k >= 0 && k < h.length && h[k].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const k = Date.now(), T = (k - a.current.time > 500 ? "" : a.current.text) + u.key.toLowerCase();
        if (a.current = { text: T, time: k }, !T) return;
        const H = i.current + 1;
        for (let D = 0; D < h.length; D++) {
          const E = (H + D) % h.length;
          if (h[E].label.toLowerCase().startsWith(T)) {
            o.current.setHighlighted(E, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function pi(n, e, t, r, i, o, s) {
  const l = v(e);
  l.current = e;
  const a = v(n);
  a.current = n;
  const c = v(i);
  c.current = i;
  const u = v(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const d = v(!1);
  d.current || (d.current = !0, o.current = (f) => {
    if (!a.current || c.current) return;
    const h = r.current;
    if (h && h.contains(f.target)) return;
    if (u.current) {
      const m = f.target;
      if (m && m.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(f.key === "ArrowDown" || f.key === "ArrowUp" || f.key === "ArrowLeft" || f.key === "ArrowRight" || f.key === "Enter" || f.key === " " || f.key.length === 1 && !f.ctrlKey && !f.metaKey && !f.altKey) || (f.preventDefault(), f.stopImmediatePropagation(), t.current(f));
  });
}
function mi(n, e) {
  const t = v(n);
  t.current = n;
  const r = v(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function hr({
  open: n,
  onClose: e,
  onOpenChange: t,
  trigger: r,
  align: i = "left",
  width: o,
  theme: s = "dark",
  children: l,
  morph: a = !0,
  contentClassName: c,
  maxMenuHeight: u,
  initialHighlightIndex: d,
  searchable: f = !1,
  searchPlaceholder: h,
  searchFilter: p,
  searchValue: m,
  onSearchValueChange: y
}) {
  const [x, w] = X([]), [k, T] = X(null), H = vn(), D = jo(), E = v(null), F = v(null), N = v(n);
  N.current = n;
  const [U, $] = X(n), [j, M] = X(""), z = f && m !== void 0, P = z ? m : j, L = z ? y ?? (() => {
  }) : M, [te, ae] = X(!1), Te = z && !te ? "" : P, re = v(null), ne = Ce(), I = {
    padding: `${A(8, 12, ne)}px ${A(12, 16, ne)}px`,
    fontSize: `${A(12, 14, ne)}px`
  }, [G, K] = X(0), S = f && !z;
  Z(() => {
    var Be;
    if (!S || !n) return;
    const B = (Be = F.current) == null ? void 0 : Be.querySelector("[data-menu-items]");
    if (!B) return;
    const Y = () => K(B.offsetWidth - B.clientWidth);
    Y();
    const he = new ResizeObserver(Y);
    return he.observe(B), () => he.disconnect();
  }, [n, S, P]);
  const ee = Un(() => {
    if (!f) return;
    const B = Te.trim().toLowerCase();
    return B ? (Y) => p ? p(B, Y.label) : Y.label.toLowerCase().includes(B) : _a;
  }, [Te, f, p]), q = dr(ee);
  Z(() => {
    if (n)
      return $(!0), z || M(""), ae(!1), q.setHighlighted(d ?? -1, "keyboard"), Xo(() => {
        t == null || t(!1), e == null || e();
      });
    w([]), ae(!1);
  }, [n, d, t, e]), Z(() => {
    if (!n || !D) return;
    const B = (Y) => {
      if (Y.pointerType !== "touch") return;
      const he = Y.target;
      he && (F.current && F.current.contains(he) || E.current && E.current.contains(he) || he instanceof Element && he.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return D.addEventListener("pointerdown", B, { capture: !0 }), () => D.removeEventListener("pointerdown", B, { capture: !0 });
  }, [n, D, t, e]);
  const ge = oe(() => {
    const B = E.current;
    if (!B) return null;
    const Y = B.getBoundingClientRect();
    return { left: Y.left, top: Y.top, width: Y.width, height: Y.height };
  }, []), _ = ai({
    visible: n,
    morph: a,
    anchor: ge,
    onClosed: () => $(!1)
  }), Q = v(() => {
  }), de = v(() => {
  }), ye = v(() => {
  }), lt = oe((B) => {
    if (B.key === "Enter") {
      const Y = q.highlightedIndex, he = q.items[Y >= 0 ? Y : 0];
      return he == null || he.activate(), !0;
    }
    return B.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [q, t, e]);
  hi(n && x.length === 0, q, Q, { onFieldKey: lt }), mi(n, de), pi(n, q, Q, F, x.length > 0, ye, { ignoreFields: z });
  const Ze = v(null), Ae = oe((B) => {
    var Y;
    if (B) {
      B.addEventListener("keydown", Q.current, { capture: !0 }), B.addEventListener("wheel", de.current, { passive: !1 });
      const he = B.ownerDocument;
      Ze.current = he, he.addEventListener("keydown", ye.current, { capture: !0 }), rn(!0);
    } else
      (Y = Ze.current) == null || Y.removeEventListener("keydown", ye.current, { capture: !0 }), Ze.current = null, rn(!1);
    F.current = B, _(B);
  }, [_]), [Ee, $e] = X({ top: 0, left: 0, maxH: Uo, side: "bottom", ready: !1 }), [qe, Oe] = X(0), [at, rn] = X(!1);
  Z(() => {
    n && E.current && Oe(E.current.getBoundingClientRect().width);
  }, [n]), Pa({
    anchorRef: E,
    panelRef: F,
    open: n && at,
    maxHeight: u,
    onPosition: $e
  }), Z(() => {
    var B;
    if (Ee.ready && n) {
      if (f) {
        (B = re.current) == null || B.focus();
        return;
      }
      const Y = F.current;
      Y && Y.ownerDocument.activeElement !== Y && !Y.contains(Y.ownerDocument.activeElement) && Y.focus();
    }
  }, [Ee.ready, n, f]), Z(() => {
    if (!n || !f) return;
    if (q.items.length === 0) {
      q.highlightedIndex !== -1 && q.setHighlighted(-1, "keyboard");
      return;
    }
    const B = q.highlightedIndex;
    (B < 0 || B >= q.items.length) && q.setHighlighted(0, "keyboard");
  }, [n, P, f, q.items.length]), Xe(() => {
    var Y;
    if (!n || q.highlightedIndex < 0 || q.pointerDriven) return;
    const B = (Y = F.current) == null ? void 0 : Y.querySelector(`[data-ei="${q.highlightedIndex}"]`);
    B == null || B.scrollIntoView({ block: "nearest" });
  }, [n, q.highlightedIndex, q.pointerDriven]);
  const zn = oe((B) => {
    !B && !N.current || (!B && bt.current && (et.current = !0), t ? t(B) : B || e == null || e());
  }, [t, e]), on = v(U);
  on.current = U;
  const bt = v(!1), et = v(!1), kt = oe(() => {
    if (!N.current && on.current) {
      if (et.current) {
        et.current = !1, bt.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), wt = Rt.isValidElement(r) ? r : null, Lt = wt ? Rt.cloneElement(wt, {
    ref: (B) => {
      E.current = B;
    },
    onPointerDown: () => {
      bt.current = !0, et.current = !1;
    },
    onClick: (B) => {
      var Y, he;
      (he = (Y = wt.props).onClick) == null || he.call(Y, B), kt();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (B) => {
      var Y, he;
      if ((he = (Y = wt.props).onKeyDown) == null || he.call(Y, B), !(!z || !N.current)) {
        if (B.key.length === 1 && !B.ctrlKey && !B.metaKey && !B.altKey)
          ae(!0);
        else if (B.key === "ArrowDown" || B.key === "ArrowUp") {
          B.preventDefault();
          const Be = q.items;
          if (Be.length === 0) return;
          const ct = B.key === "ArrowDown" ? 1 : -1, In = (q.highlightedIndex + ct + Be.length) % Be.length;
          q.setHighlighted(In, "keyboard");
        } else if (B.key === "Enter") {
          B.preventDefault();
          const Be = q.highlightedIndex, ct = q.items[Be >= 0 ? Be : 0];
          ct == null || ct.activate();
        }
      }
    }
  }) : r, Rn = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${S ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ R(ce.Root, { open: n || U, onOpenChange: zn, modal: !1, children: [
    /* @__PURE__ */ g(ce.Trigger, { asChild: !0, children: Lt }),
    /* @__PURE__ */ g(ce.Portal, { container: H ?? void 0, children: /* @__PURE__ */ g(ci.Provider, { value: s, children: /* @__PURE__ */ g(fi.Provider, { value: { chain: x, setChain: w, morph: a, keyboardOpened: k, setKeyboardOpened: T }, children: /* @__PURE__ */ g(Tn.Provider, { value: q, children: /* @__PURE__ */ g(es.Provider, { value: { query: P, setQuery: L }, children: /* @__PURE__ */ R(
      ce.Content,
      {
        ref: Ae,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: `${Rn} ${o || ""} ${c || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Ee.left,
          top: Ee.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : qe || void 0,
          maxHeight: Ee.maxH,
          visibility: Ee.ready ? "visible" : "hidden"
        },
        onPointerLeave: q.pointerLeave,
        children: [
          S && /* @__PURE__ */ g("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: G }, children: /* @__PURE__ */ R("div", { "data-menu-search": !0, className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: I, children: [
            /* @__PURE__ */ g(Ql, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ g(
              "input",
              {
                ref: re,
                value: P,
                onChange: (B) => L(B.target.value),
                placeholder: h ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            P ? /* @__PURE__ */ g(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (B) => B.stopPropagation(),
                onClick: () => {
                  var B;
                  L(""), (B = re.current) == null || B.focus();
                },
                children: /* @__PURE__ */ g(Xn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ g("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          S ? /* @__PURE__ */ g("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: l }) : l
        ]
      }
    ) }) }) }) }) })
  ] });
}
function rp({
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
  onReset: d,
  onTrash: f,
  closeOnSelect: h,
  readOnly: p = !1,
  theme: m,
  align: y,
  label: x,
  header: w,
  itemLabel: k,
  trigger: T,
  minItems: H = 1,
  itemRender: D,
  morph: E = !0,
  contentClassName: F
}) {
  const N = ui(), U = Qo(), [$, j] = X(null), [M, z] = X(""), P = v(M);
  P.current = M;
  const L = v(null), te = v(null);
  Z(() => {
    n && requestAnimationFrame(() => {
      var I, G;
      (G = (I = te.current) == null ? void 0 : I.querySelector('[data-active="1"]')) == null || G.scrollIntoView({ block: "nearest" });
    });
  }, [n]), Z(() => {
    var K;
    if (!n) return;
    const I = (S) => {
      var ye, lt, Ze;
      const ee = S.target;
      if (ee && ee.closest("input, textarea, [contenteditable]")) {
        $ && ee === L.current && (S.key === "Enter" ? (S.preventDefault(), S.stopImmediatePropagation(), Te()) : S.key === "Escape" && (S.preventDefault(), S.stopImmediatePropagation(), re()));
        return;
      }
      const q = (ye = te.current) == null ? void 0 : ye.closest(".ui-menu");
      if (!q || !q.contains(S.target)) return;
      const ge = q.ownerDocument, _ = [...q.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], Q = [...q.querySelectorAll('div:last-child > [role="menuitem"]')], de = [..._, ...Q];
      if (S.key === "ArrowDown" || S.key === "ArrowUp") {
        S.preventDefault(), S.stopImmediatePropagation();
        const Ae = ge.activeElement;
        let Ee = Ae ? de.indexOf(Ae) : -1;
        if (Ee < 0 && Ae) {
          const Oe = Ae.closest("[data-active]"), at = Oe == null ? void 0 : Oe.querySelector('[role="menuitem"]:first-child');
          at && (Ee = _.indexOf(at));
        }
        const $e = S.key === "ArrowDown" ? 1 : -1, qe = Ee < 0 ? $e === 1 ? 0 : de.length - 1 : (Ee + $e + de.length) % de.length;
        (lt = de[qe]) == null || lt.focus({ preventScroll: !0 });
        return;
      }
      if (S.key === "ArrowLeft" || S.key === "ArrowRight") {
        const Ae = ge.activeElement, Ee = Ae == null ? void 0 : Ae.closest("[data-active]");
        if (!Ee) return;
        S.preventDefault(), S.stopImmediatePropagation();
        const $e = [...Ee.querySelectorAll('[role="menuitem"]')].slice(1);
        if ($e.length === 0) return;
        const qe = Ae && Ee.contains(Ae) ? $e.indexOf(Ae) : -1, Oe = S.key === "ArrowRight" ? 1 : -1, at = qe < 0 ? 0 : (qe + Oe + $e.length) % $e.length;
        (Ze = $e[at]) == null || Ze.focus({ preventScroll: !0 });
        return;
      }
    }, G = ((K = te.current) == null ? void 0 : K.ownerDocument) ?? null;
    return G == null || G.addEventListener("keydown", I, { capture: !0 }), () => G == null ? void 0 : G.removeEventListener("keydown", I, { capture: !0 });
  }, [n, $]), Z(() => {
    if (!$) return;
    const I = t.find((ee) => ee.id === $);
    I && !M && z(I.name);
    const G = requestAnimationFrame(() => {
      const ee = L.current;
      ee && (ee.focus(), ee.select());
    });
    let K = 0;
    const S = window.setInterval(() => {
      const ee = L.current;
      if (K++, !ee || K > 12) {
        clearInterval(S);
        return;
      }
      ee.ownerDocument.activeElement !== ee && (ee.focus(), ee.select());
    }, 50);
    return () => {
      cancelAnimationFrame(G), clearInterval(S);
    };
  }, [$]), Z(() => {
    if ($) {
      const I = t.find((G) => G.id === $);
      I && !M && z(I.name);
    }
  }, [$, t]);
  const ae = (I, G) => {
    j(I), z(G);
  }, Te = () => {
    $ && P.current.trim() && o($, P.current.trim()), j(null);
  }, re = () => {
    j(null);
  }, ne = k || w.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ R(hr, { open: n, onOpenChange: (I) => {
    I ? (j(null), z("")) : ($ && M.trim() && o($, M.trim()), j(null), z("")), (!I || !p) && e(I);
  }, width: "w-80", theme: m, align: y, trigger: T, morph: E, contentClassName: F, children: [
    /* @__PURE__ */ g("div", { className: `shrink-0 ${N.headerText}`, children: w }),
    /* @__PURE__ */ g("div", { ref: te, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((I) => {
      const G = I.id === r, K = $ === I.id;
      return /* @__PURE__ */ g("div", { "data-active": G ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${G || K ? N.rowActiveBg : N.rowHoverBg} ${$ && !K ? "opacity-40 pointer-events-none" : ""}`, children: K ? /* @__PURE__ */ R(rt, { children: [
        /* @__PURE__ */ g("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ g(
          "input",
          {
            ref: L,
            autoFocus: !0,
            value: M,
            onChange: (S) => z(S.target.value),
            onKeyDown: (S) => {
              S.key === "Enter" && (S.preventDefault(), S.stopPropagation(), Te()), S.key === "Escape" && (S.preventDefault(), S.stopPropagation(), re());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: U
          }
        ) }),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${N.editConfirm}`,
            onSelect: (S) => {
              S.preventDefault(), Te();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g(Lo, { className: N.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${N.editCancel}`,
            onSelect: (S) => {
              S.preventDefault(), re();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g(Xn, { className: N.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ R(rt, { children: [
        /* @__PURE__ */ g(
          ce.Item,
          {
            style: U,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${N.rowText} ${G ? "" : N.rowTextHover}`,
            onSelect: h ? () => {
              i(I.id);
            } : (S) => {
              S.preventDefault(), i(I.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g("span", { className: `truncate ${G ? N.rowActiveText : ""}`, children: D ? D(I) : I.name })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${G ? N.btnActive : N.btnBase}`,
            onSelect: (S) => {
              S.preventDefault(), ae(I.id, I.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ g(Zl, { className: N.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${G ? N.btnActive : N.btnBase}`,
            onSelect: (S) => {
              S.preventDefault();
              const ee = s(I.id);
              ee && ae(ee, `${I.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ g(Bo, { className: N.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${N.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= H ? N.btnDisabled : G ? N.btnDangerActive : N.btnDanger}`,
            onSelect: (S) => {
              S.preventDefault(), l(I.id);
            },
            onTouchStart: () => {
            },
            disabled: p || t.length <= H,
            children: /* @__PURE__ */ g(Lr, { className: N.btnIcon })
          }
        )
      ] }) }, I.id);
    }) }),
    /* @__PURE__ */ R("div", { className: `shrink-0 ${$ ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ R(rt, { children: [
        /* @__PURE__ */ g(ce.Separator, { className: N.separator }),
        /* @__PURE__ */ R(
          ce.Item,
          {
            className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
            onSelect: (I) => {
              I.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ g(Fo, { className: `${N.btnIcon} ${N.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || c || u || f) && /* @__PURE__ */ g(ce.Separator, { className: N.separator }),
      a && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (I) => {
            I.preventDefault();
            const G = a();
            G && ae(G, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ g(ea, { className: `${N.btnIcon} ${N.icon}` }),
            "New ",
            ne
          ]
        }
      ),
      c && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (I) => {
            I.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${N.btnIcon} ${N.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ g("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ g("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ g("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      u && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (I) => {
            I.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${N.btnIcon} ${N.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ g("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ g("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ g("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${N.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${N.itemDefault} ui-row`,
          onSelect: (I) => {
            I.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ g(Lr, { className: `${N.btnIcon} ${N.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Ha({
  onClick: n,
  icon: e,
  disabled: t = !1,
  variant: r = "default",
  className: i = "",
  children: o,
  keepOpen: s = !1,
  selected: l = !1,
  rightAction: a,
  trailing: c
}) {
  Go();
  const u = ui(), d = Qo(), f = v(!1), h = v(null), { myIndex: p, highlighted: m, setPointer: y } = ts({
    label: () => Zo(o),
    activate: () => {
      t || n();
    },
    disabled: t
  }), { query: x } = Fa(), w = x.trim() !== "" && p < 0, k = r === "danger" ? u.itemDanger : u.itemDefault;
  return /* @__PURE__ */ R(
    ce.Item,
    {
      ref: h,
      "data-ei": p >= 0 ? p : void 0,
      style: { ...d, display: w ? "none" : void 0 },
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${k} ${l ? "ui-item-selected" : ""} ${m ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (T) => {
        if (f.current) {
          f.current = !1;
          return;
        }
        s && T.preventDefault(), n();
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
        c && /* @__PURE__ */ g("span", { className: "shrink-0 ml-1 flex items-center", children: c }),
        a && /* @__PURE__ */ g(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${u.rightAction}`,
            title: a.title,
            onPointerDown: (T) => {
              T.stopPropagation(), T.preventDefault(), f.current = !0, a.onClick();
            },
            onClick: (T) => {
              T.stopPropagation(), T.preventDefault();
            },
            children: a.icon
          }
        )
      ]
    }
  );
}
function Wa({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: a, morph: c, keyboardOpened: u, setKeyboardOpened: d } = tn(fi), f = l.includes(n), h = l[l.length - 1] === n, p = Go(), m = vn(), y = v(null), x = v(null), [w, k] = X(f), T = !f && w;
  Z(() => {
    f && k(!0);
  }, [f]);
  const H = () => a((K) => {
    const S = K.indexOf(n);
    return S >= 0 ? K.slice(0, S) : K;
  }), D = dr(), E = di(), F = v(E);
  F.current = E;
  const N = v(null);
  Z(() => {
    var S;
    const K = {
      label: e,
      activate: () => {
        d(n), a((ee) => ee.includes(n) ? ee : [...ee, n]);
      },
      submenu: !0
    };
    return N.current = K, (S = F.current) == null ? void 0 : S.register(K);
  }, []);
  const U = E && N.current ? E.items.indexOf(N.current) : -1, $ = U >= 0 && U === E.highlightedIndex, j = oe(() => {
    const K = y.current;
    if (!K) return null;
    const S = K.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), M = ai({
    visible: f,
    morph: c,
    anchor: j,
    onClosed: () => k(!1)
  }), z = v(() => {
  }), P = v(() => {
  }), L = v(() => {
  });
  hi(f && h, D, z, {
    onCloseSub: () => {
      H(), E && U >= 0 && E.setHighlighted(U, "keyboard");
    }
  });
  const te = v(u);
  te.current = u, Z(() => {
    f && (te.current === n ? (D.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var K;
      return (K = x.current) == null ? void 0 : K.focus();
    }), d(null)) : D.setHighlighted(-1, "keyboard"));
  }, [f]), mi(f, P), pi(f, D, z, x, !h, L), Rt.useLayoutEffect(() => {
    var S;
    if (!f || D.highlightedIndex < 0 || D.pointerDriven) return;
    const K = (S = x.current) == null ? void 0 : S.querySelector(`[data-ei="${D.highlightedIndex}"]`);
    K == null || K.scrollIntoView({ block: "nearest" });
  }, [f, D.highlightedIndex, D.pointerDriven]);
  const ae = v(null), Te = oe((K) => {
    var S;
    if (K) {
      K.addEventListener("keydown", z.current, { capture: !0 }), K.addEventListener("wheel", P.current, { passive: !1 });
      const ee = K.ownerDocument;
      ae.current = ee, ee.addEventListener("keydown", L.current, { capture: !0 });
    } else
      (S = ae.current) == null || S.removeEventListener("keydown", L.current, { capture: !0 }), ae.current = null;
    x.current = K, M(K);
  }, [M]), re = Ce(), ne = { padding: `${A(8, 12, re)}px ${A(12, 16, re)}px`, fontSize: A(12, 14, re) }, I = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${$ ? " ui-item-highlighted" : ""}${T ? " ui-sub-closing" : ""}`, G = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ R(ce.Sub, { open: f || w, onOpenChange: (K) => a((S) => {
    if (!K) {
      const ee = S.indexOf(n);
      return ee >= 0 ? S.slice(0, ee) : S;
    }
    return S.includes(n) ? S : [...S, n];
  }), children: [
    /* @__PURE__ */ R(
      ce.SubTrigger,
      {
        ref: y,
        "data-ei": U >= 0 ? U : void 0,
        style: ne,
        className: I,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          E && U >= 0 && E.setHighlighted(U, "pointer");
        },
        onPointerDown: (K) => {
          K.pointerType === "pen" && (K.preventDefault(), a((S) => f ? S.slice(0, S.indexOf(n)) : [...S, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ g(Gn, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
            t && /* @__PURE__ */ g("span", { className: "ui-icon shrink-0", children: t }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ g(Gn, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ g(ce.Portal, { container: m ?? void 0, children: /* @__PURE__ */ g(
      ce.SubContent,
      {
        ref: Te,
        "data-theme": p,
        className: G,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: D.pointerLeave,
        children: /* @__PURE__ */ g(Tn.Provider, { value: D, children: o })
      }
    ) })
  ] });
}
const sn = 8, ip = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s = "light", morph: l = !0 }) => {
  const a = Ce(), c = A(12, 14, a), u = v(null), d = Sn(), [f, h] = X(!1), [p, m] = X([]), [y, x] = X(null), w = dr();
  Z(() => {
    if (n)
      return w.setHighlighted(-1, "keyboard"), Xo(r);
  }, [n, r]);
  const k = v({ left: e, top: t });
  n && (k.current = { left: e, top: t });
  const T = oe(() => ({ left: k.current.left, top: k.current.top, width: 0, height: 0 }), []), H = ai({
    visible: !0,
    morph: l,
    anchor: T,
    cloneOnUnmount: !0
  }), D = v(() => {
  }), E = v(() => {
  }), F = v(() => {
  });
  hi(n, w, D), mi(n, E), pi(n, w, D, u, p.length > 0, F);
  const N = v(null), U = oe((M) => {
    var z;
    if (M) {
      M.addEventListener("keydown", D.current, { capture: !0 }), M.addEventListener("wheel", E.current, { passive: !1 });
      const P = M.ownerDocument;
      N.current = P, P.addEventListener("keydown", F.current, { capture: !0 });
    } else
      (z = N.current) == null || z.removeEventListener("keydown", F.current, { capture: !0 }), N.current = null;
    u.current = M, h(!!M), H(M);
  }, [H]), [$, j] = X(null);
  return Xe(() => {
    var G;
    if (!n || !f || !u.current) return;
    const M = u.current, z = M.offsetWidth, P = M.offsetHeight, L = (G = o == null ? void 0 : o.current) == null ? void 0 : G.getBoundingClientRect(), te = L ? L.right : (d == null ? void 0 : d.innerWidth) ?? 0, ae = L ? L.bottom : (d == null ? void 0 : d.innerHeight) ?? 0, Te = L ? L.left : 0, re = L ? L.top : 0;
    let ne = Math.max(re + sn, k.current.top), I = Math.max(Te + sn, k.current.left);
    I + z > te && (I = te - z - sn), ne + P > ae && (ne = Math.max(re + sn, ae - P - sn)), j({ left: I, top: ne });
  }, [n, f, e, t, o]), n ? /* @__PURE__ */ R(ce.Root, { open: n, onOpenChange: (M) => {
    M || r();
  }, modal: !1, children: [
    /* @__PURE__ */ g(ce.Trigger, { asChild: !0, children: /* @__PURE__ */ g("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ g(ce.Portal, { children: /* @__PURE__ */ g(ci.Provider, { value: s, children: /* @__PURE__ */ g(fi.Provider, { value: { chain: p, setChain: m, morph: l, keyboardOpened: y, setKeyboardOpened: x }, children: /* @__PURE__ */ g(Tn.Provider, { value: w, children: /* @__PURE__ */ g(
      ce.Content,
      {
        ref: U,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: c, left: ($ == null ? void 0 : $.left) ?? k.current.left, top: ($ == null ? void 0 : $.top) ?? k.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, op = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = Ce(), a = { padding: `${A(8, 12, l)}px ${A(12, 16, l)}px`, fontSize: A(12, 14, l) }, c = di(), u = v(c);
  u.current = c;
  const d = v(null);
  Z(() => {
    var m;
    const p = { label: Zo(s), activate: () => {
      r || n();
    } };
    return d.current = p, (m = u.current) == null ? void 0 : m.register(p);
  }, []);
  const f = c && d.current ? c.items.indexOf(d.current) : -1, h = !r && f >= 0 && f === c.highlightedIndex;
  return /* @__PURE__ */ R(
    ce.Item,
    {
      "data-ei": f >= 0 ? f : void 0,
      onClick: r ? void 0 : n,
      onPointerEnter: () => {
        !r && c && f >= 0 && c.setHighlighted(f, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: a,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ g("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ g("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, sp = () => /* @__PURE__ */ g(ce.Separator, { className: "ui-sep my-1" }), lp = (n) => /* @__PURE__ */ g(Wa, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), le = 8, ns = "[data-modal-stack]", it = 220, pn = "cubic-bezier(0.32, 0.72, 0, 1)", qn = 0.94;
function _t() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ft(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function rs(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Ki(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = rs(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${it}ms ${pn}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, it + 80));
    });
  });
}
function ja(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${qn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${it}ms ${pn}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, it + 60));
    });
  });
}
function Ji(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - qn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * qn, height: i.height * qn };
  e.style.transition = `transform ${it}ms ${pn}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = rs(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, it + 60);
}
function Cr(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ns) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function Dn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(ns) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function qa({
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
  dismissOnBackdrop: d = !0
}) {
  const f = v(null), h = v(null), p = v(null), m = Ce(), y = A(20, 24, m), x = A(10, 12, m), w = A(12, 14, m), k = A(14, 16, m), T = A(20, 24, m), H = A(20, 24, m), D = A(20, 24, m), E = A(14, 16, m), F = A(16, 20, m), N = A(10, 12, m), U = A(12, 14, m), $ = A(8, 10, m), j = A(4, 6, m), M = { padding: `${x}px ${y}px` }, z = { fontSize: w }, P = { padding: `${H}px ${T}px 16px ${T}px` }, L = { fontSize: k }, te = { padding: `0 ${T}px 16px` }, ae = { padding: `${D}px ${T}px` }, Te = { fontSize: N, padding: `${j}px ${$}px` }, [re, ne] = X(!1), I = oe((b) => {
    f.current = b, ne(b !== null);
  }, []), G = vn(), K = Sn(), S = v(K);
  S.current = K;
  const [ee, q] = X(null), ge = v(null), _ = v(!1), Q = v(!1), de = v(0), ye = v({ w: 0, h: 0 }), lt = v(!1), [Ze, Ae] = X(!1), [Ee, $e] = X(!1), qe = v(0), Oe = v(!1), [at, rn] = X(!1), zn = v(a);
  zn.current = a;
  const on = v(!1), bt = v(!1), et = () => {
    bt.current = !0, Ae(!0);
  }, kt = () => {
    bt.current = !1, Ae(!1);
  };
  Z(() => {
    n || (q(null), lt.current = !1, _.current = !1, $e(!1));
  }, [n]), Xe(() => {
    if (!n || lt.current || !re || !f.current) return;
    lt.current = !0;
    const b = f.current.getBoundingClientRect(), W = S.current ?? null, V = (W == null ? void 0 : W.innerWidth) ?? 0, ie = ft(W);
    q({
      left: Math.max(le, Math.min((V - b.width) / 2, V - b.width - le)),
      top: Math.max(ie.top + le, Math.min(ie.top + (ie.height - b.height) / 2, ie.bottom - b.height - le))
    });
  }, [n, re]), Xe(() => {
    if (!n || !re || !a || _t() || !f.current) return;
    const b = f.current, W = Cr(b), V = W[W.length - 1];
    et(), V ? Ki(qe, b, V.getBoundingClientRect(), kt) : ja(qe, b, kt);
  }, [n, re]);
  const wt = oe(() => {
    if (!u || Oe.current) return;
    const b = f.current, W = !!b && Cr(b).length > 0;
    if (!b || !a || _t() || W) {
      e();
      return;
    }
    Oe.current = !0, rn(!0), on.current = !0, et(), Ji(qe, b, () => {
      Oe.current = !1, rn(!1), kt(), e();
    });
  }, [a, e, u]), Lt = oe(() => {
    const b = f.current;
    if (!b || on.current || !zn.current || _t() || Cr(b).length > 0) return;
    const W = b.ownerDocument, V = b.cloneNode(!0);
    V.removeAttribute("data-modal-stack"), V.removeAttribute("data-state"), V.removeAttribute("role"), V.removeAttribute("data-aria-hidden"), V.removeAttribute("tabindex"), V.setAttribute("aria-hidden", "true"), V.style.pointerEvents = "none", W.body.appendChild(V), Ji({ current: 0 }, V, () => {
      V.isConnected && V.remove();
    });
  }, []);
  Xe(() => () => Lt(), [Lt]);
  const Rn = v(n);
  Xe(() => {
    const b = Rn.current;
    Rn.current = n, b && !n && Lt();
  }, [n, re, Lt]), Z(() => {
    if (!n || !re || !a || !f.current) return;
    const b = f.current, W = b.parentNode;
    if (!W) return;
    let V = 0, ie = null, se = !1;
    const pe = () => {
      V = 0;
      const ke = Dn(b);
      if (ke.length > 0)
        b.style.opacity = "", b.style.pointerEvents = "", ie = ke[ke.length - 1].getBoundingClientRect(), se = !0, V = requestAnimationFrame(pe);
      else if (se) {
        se = !1, ie && !_t() && (et(), Ki(qe, b, ie, kt)), ie = null;
        const ze = S.current ?? null;
        ze == null || ze.setTimeout(() => {
          !b || !b.isConnected || getComputedStyle(b).opacity !== "1" && (b.style.opacity = "1", b.style.pointerEvents = "");
        }, 240);
      }
    }, xe = new MutationObserver(() => {
      !V && Dn(b).length > 0 && (V = requestAnimationFrame(pe));
    });
    return xe.observe(W, { childList: !0 }), () => {
      xe.disconnect(), V && cancelAnimationFrame(V);
    };
  }, [n, re]), Z(() => {
    if (!re || !a || _t() || !f.current) return;
    const b = f.current;
    let W = Math.round(b.getBoundingClientRect().height), V = !1;
    const ie = new ResizeObserver(() => {
      if (!b.isConnected) return;
      const se = Math.round(b.getBoundingClientRect().height);
      if (!V) {
        V = !0, W = se;
        return;
      }
      if (Math.abs(se - W) < 1) return;
      if (ge.current || Oe.current || Dn(b).length > 0) {
        W = se;
        return;
      }
      if (bt.current) return;
      const pe = W;
      W = se, et();
      const xe = b.getBoundingClientRect(), ke = ft(S.current ?? null), ze = !_.current && !Q.current, Bt = ze ? ke.top + (ke.height - pe) / 2 : xe.top, Ve = ze ? ke.top + (ke.height - se) / 2 : xe.top;
      b.style.transition = "none", b.style.height = `${pe}px`, ze && (b.style.top = `${Bt}px`), h.current && (h.current.style.overflow = "hidden"), b.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.style.height === `${pe}px` && (b.style.transition = `height ${it}ms ${pn}${ze ? `, top ${it}ms ${pn}` : ""}`, b.style.height = `${se}px`, ze && (b.style.top = `${Ve}px`), window.setTimeout(() => {
            b.style.height === `${se}px` && (b.style.transition = "", b.style.height = "", h.current && (h.current.style.overflow = ""), ze && q({ left: xe.left, top: Ve }), kt());
          }, it + 60));
        });
      });
    });
    return ie.observe(b), () => ie.disconnect();
  }, [re]), Z(() => {
    if (!re || !f.current || a && !_t()) return;
    const b = f.current, W = new ResizeObserver(() => {
      if (!b.isConnected || ge.current || Oe.current || Q.current || Dn(b).length > 0) return;
      const V = S.current ?? null, ie = ft(V), se = (V == null ? void 0 : V.innerWidth) ?? 0, pe = b.getBoundingClientRect(), xe = Math.max(ie.top + le, Math.min(pe.top, ie.bottom - pe.height - le)), ke = Math.max(le, Math.min(pe.left, se - pe.width - le));
      (Math.abs(xe - pe.top) > 0.5 || Math.abs(ke - pe.left) > 0.5) && q({ left: ke, top: xe });
    });
    return W.observe(b), () => W.disconnect();
  }, [re, a]);
  const B = oe(() => {
    const b = f.current;
    if (!b) return null;
    const W = b.getBoundingClientRect();
    return { left: W.left, top: W.top, width: W.width, height: W.height };
  }, []), Y = oe((b, W) => {
    const V = S.current ?? null, ie = (V == null ? void 0 : V.innerWidth) ?? 0, se = ft(V), pe = B(), xe = pe ? pe.width : Math.min(ie - le * 2, 576), ke = pe ? pe.height : Math.min(se.height - le * 2, 400);
    return {
      left: Math.max(le, Math.min(b, ie - xe - le)),
      top: Math.max(se.top + le, Math.min(W, se.bottom - ke - le))
    };
  }, [B]);
  Z(() => {
    if (!n) return;
    const b = S.current ?? null, W = (b == null ? void 0 : b.visualViewport) ?? null;
    if (!b || !W) return;
    const V = 120;
    Q.current = !1, ye.current = { w: b.innerWidth, h: b.innerHeight };
    let ie = 0;
    const se = () => {
      if (Oe.current || ge.current) return;
      const xe = (b == null ? void 0 : b.innerHeight) ?? 0, ke = (b == null ? void 0 : b.innerWidth) ?? 0, Bt = ft(b).height < xe - V, Ve = xe < ye.current.h - V && ke === ye.current.w;
      Bt || Ve ? (Q.current = !0, de.current && (clearTimeout(de.current), de.current = 0)) : de.current || (de.current = (b == null ? void 0 : b.setTimeout(() => {
        Q.current = !1, de.current = 0, $e(!1);
      }, 600)) ?? 0), $e(Q.current), !ie && (ie = requestAnimationFrame(() => {
        var ji;
        ie = 0;
        const _i = f.current;
        if (!_i) return;
        const vt = ft(S.current ?? null), Ue = _i.getBoundingClientRect(), Hi = ((ji = S.current) == null ? void 0 : ji.innerWidth) ?? 0, vr = (b == null ? void 0 : b.innerHeight) ?? 0, Xl = vt.height < vr - V || vr < ye.current.h - V && (b == null ? void 0 : b.innerWidth) === ye.current.w;
        ye.current = { w: (b == null ? void 0 : b.innerWidth) ?? 0, h: vr };
        const On = Ue.top >= vt.top + le && Ue.bottom <= vt.bottom - le, Wi = () => {
          q({
            left: Math.max(le, Math.min((Hi - Ue.width) / 2, Hi - Ue.width - le)),
            top: Math.max(vt.top + le, Math.min(vt.top + (vt.height - Ue.height) / 2, vt.bottom - Ue.height - le))
          });
        };
        if (Xl && !Me) {
          if (_.current) {
            On || q(Y(Ue.left, Ue.top));
            return;
          }
          if (On) return;
          Wi();
          return;
        }
        if (!Q.current) {
          if (_.current) {
            On || q(Y(Ue.left, Ue.top));
            return;
          }
          On || Wi();
        }
      }));
    };
    W.addEventListener("resize", se), W.addEventListener("scroll", se);
    const pe = () => {
      Oe.current || ge.current || ie || (ie = requestAnimationFrame(() => {
        ie = 0;
        const xe = f.current;
        if (!xe) return;
        const ke = S.current ?? null, ze = ft(ke), Bt = (ke == null ? void 0 : ke.innerWidth) ?? 0, Ve = xe.getBoundingClientRect();
        if (_.current) {
          q(Y(Ve.left, Ve.top));
          return;
        }
        q({
          left: Math.max(le, Math.min((Bt - Ve.width) / 2, Bt - Ve.width - le)),
          top: Math.max(ze.top + le, Math.min(ze.top + (ze.height - Ve.height) / 2, ze.bottom - Ve.height - le))
        });
      }));
    };
    return b.addEventListener("orientationchange", pe), () => {
      W.removeEventListener("resize", se), W.removeEventListener("scroll", se), b.removeEventListener("orientationchange", pe), ie && cancelAnimationFrame(ie), de.current && clearTimeout(de.current);
    };
  }, [n, Y]);
  const he = oe((b) => {
    if (b.target.closest("button")) return;
    _.current = !0;
    const W = B();
    W && (q(Y(W.left, W.top)), ge.current = { startX: b.clientX, startY: b.clientY, posX: W.left, posY: W.top }, b.target.setPointerCapture(b.pointerId));
  }, [B, Y]), Be = oe((b) => {
    const W = ge.current;
    W && (b.preventDefault(), q(Y(W.posX + b.clientX - W.startX, W.posY + b.clientY - W.startY)));
  }, [Y]), ct = oe(() => {
    ge.current = null;
  }, []), In = ge.current !== null, Pi = oe(() => {
    _.current = !1;
    const b = S.current ?? null, W = ft(b), V = (b == null ? void 0 : b.innerWidth) ?? 0, ie = f.current, se = ie ? ie.getBoundingClientRect() : { width: 0, height: 0 };
    q({
      left: Math.max(le, Math.min((V - se.width) / 2, V - se.width - le)),
      top: Math.max(W.top + le, Math.min(W.top + (W.height - se.height) / 2, W.bottom - se.height - le))
    });
  }, []), wr = v(0), Li = oe(() => {
    const b = Date.now();
    b - wr.current < 300 ? (wr.current = 0, Pi()) : wr.current = b;
  }, [Pi]), Bi = ee !== null, Jl = Bi ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Yl = `${i ? `${i} w-full` : "max-w-xl w-full"}`, Fi = {
    ...Bi ? { left: ee.left, top: ee.top } : {},
    width: `min(100%, calc(100dvw - ${le * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Ee ? {} : { maxHeight: `calc(100dvh - ${le * 2}px)` }
  }, Ul = oe((b) => {
    if (b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey) return;
    const W = b.target, V = p.current;
    if (!(!!W.closest("[data-modal-close]") || !!V && V.contains(W) && !!W.closest('button, a, [role="button"]')) && W.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !V) return;
    const se = Array.from(V.querySelectorAll("button[data-modal-confirm]")), pe = se.length > 0 ? se : Array.from(V.querySelectorAll("button")), xe = pe[pe.length - 1];
    !xe || xe.disabled || (b.preventDefault(), xe.click());
  }, []);
  return /* @__PURE__ */ g(ut.Root, { open: n, onOpenChange: (b) => {
    b || wt();
  }, children: /* @__PURE__ */ R(ut.Portal, { container: G ?? void 0, children: [
    /* @__PURE__ */ g(
      ut.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${at ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (b) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (b.preventDefault(), d && wt());
        }
      }
    ),
    /* @__PURE__ */ R(
      ut.Content,
      {
        ref: I,
        onKeyDown: Ul,
        onInteractOutside: (b) => {
          d || b.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Jl} ${Yl}`,
        style: { touchAction: "manipulation", ...Object.keys(Fi).length > 0 ? Fi : {} },
        children: [
          c ? /* @__PURE__ */ R(
            "div",
            {
              style: P,
              className: `flex items-center justify-between ${In ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (b) => {
                Ze || he(b);
              },
              onPointerMove: Be,
              onPointerUp: ct,
              onClick: Li,
              children: [
                /* @__PURE__ */ g(ut.Title, { style: L, className: "font-bold text-white truncate", children: t }),
                u && /* @__PURE__ */ g(ut.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ g(Xn, { style: { width: F, height: F } }) })
              ]
            }
          ) : /* @__PURE__ */ R(
            "div",
            {
              style: M,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${In ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (b) => {
                Ze || he(b);
              },
              onPointerMove: Be,
              onPointerUp: ct,
              onClick: Li,
              children: [
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ g("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ g(ut.Title, { style: z, className: "font-bold text-white truncate", children: t })
                ] }),
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ R("button", { onClick: l, style: Te, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ g(Fo, { style: { width: U, height: U } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ g(ut.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ g(Xn, { style: { width: E, height: E } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ g("div", { ref: h, style: c ? te : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: s }),
          o && /* @__PURE__ */ g("div", { ref: p, style: c ? ae : void 0, className: c ? "" : "shrink-0", children: c ? /* @__PURE__ */ g("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) });
}
function ap({ children: n }) {
  const e = Ce(), t = A(20, 24, e), r = A(8, 12, e);
  return /* @__PURE__ */ g("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${t}px` }, children: n });
}
const Va = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Ka = {
  zinc: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-blue-600 text-white font-semibold border border-blue-500 hover:bg-blue-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-red-600 text-white font-semibold border border-red-500 hover:bg-red-500 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
}, Ja = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "border border-transparent text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "border border-transparent bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function $n({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = Tt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ g(
    "button",
    {
      type: r,
      style: o,
      className: `${Va} ${n === "hero" ? Ka[e] : Ja[n]} ${t}`,
      ...i
    }
  );
}
function is({ checked: n, size: e, tone: t = "accent" }) {
  return /* @__PURE__ */ g(
    "span",
    {
      className: `ui-check-indicator ${n ? "ui-check-indicator-checked" : ""} ${t === "danger" ? "ui-check-tone-danger" : ""}`,
      "aria-hidden": !0,
      children: n ? /* @__PURE__ */ R("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: [
        /* @__PURE__ */ g("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
        /* @__PURE__ */ g("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" })
      ] }) : /* @__PURE__ */ g("svg", { viewBox: "0 0 16 16", style: { width: e, height: e }, "aria-hidden": !0, children: /* @__PURE__ */ g("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) })
    }
  );
}
function Ya({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: a = "pill", tone: c = "accent", block: u = !1 }) {
  const d = a !== "plain", f = Ce(), h = A(16, 20, f), p = A(12, 14, f), m = A(12, 14, f), y = A(12, 16, f), x = A(10, 12, f), w = A(8, 10, f);
  return /* @__PURE__ */ R(
    "label",
    {
      className: `ui-checkbox ${d ? "ui-checkbox-pill rounded-lg" : ""} ${c === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: w, padding: d ? `${x}px ${y}px` : void 0 },
      onClick: (T) => T.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (T) => e(T.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ g(is, { checked: n, size: h, tone: c }) : /* @__PURE__ */ g("span", { className: "ui-checkbox-box", style: { width: h, height: h }, "aria-hidden": !0, children: n && /* @__PURE__ */ g("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ g("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ g("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: m }, children: r })
      ]
    }
  );
}
function cp(n = "md") {
  const e = Me && qo() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function Ua(n = "md") {
  return n === "sm" ? Tt({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : Tt({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const ss = en(null);
function up() {
  const n = tn(ss);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function fp({ children: n }) {
  const [e, t] = X(null), [r, i] = X(!1), o = v(null), s = Ce(), l = A(16, 20, s), a = A(12, 14, s), c = Ua(), u = v(e);
  u.current = e;
  const d = oe(() => {
    const w = u.current;
    w && (w.kind === "confirm" ? w.resolve(!1) : w.kind === "prompt" ? w.resolve(null) : w.resolve());
  }, []), f = oe((w) => {
    if (w.suppressKey) {
      const k = localStorage.getItem(w.suppressKey);
      if (k && Date.now() < parseInt(k, 10))
        return Promise.resolve(!0);
    }
    return new Promise((k) => {
      d(), i(!1), t({ kind: "confirm", options: w, resolve: k });
    });
  }, [d]), h = oe((w) => new Promise((k) => {
    d(), t({ kind: "prompt", options: w, resolve: k });
  }), [d]), p = oe((w) => new Promise((k) => {
    d(), t({ kind: "alert", options: w, resolve: k });
  }), [d]);
  Z(() => {
    if (e) {
      const w = setTimeout(() => {
        var k;
        return (k = o.current) == null ? void 0 : k.focus();
      }, 50);
      return () => clearTimeout(w);
    }
  }, [e]);
  const m = oe(() => {
    var w, k;
    if (e) {
      if (e.kind === "confirm") {
        const T = e.options;
        T.suppressKey && r && localStorage.setItem(T.suppressKey, String(Date.now() + 864e5)), e.resolve(!0);
      } else e.kind === "prompt" ? e.resolve(((k = (w = o.current) == null ? void 0 : w.value) == null ? void 0 : k.trim()) || null) : e.resolve();
      t(null);
    }
  }, [e, r]), y = e !== null;
  Z(() => {
    if (!y) return;
    const w = (k) => {
      k.key !== "Enter" || k.shiftKey || k.metaKey || k.ctrlKey || k.altKey || k.isComposing || (k.preventDefault(), k.stopImmediatePropagation(), m());
    };
    return document.addEventListener("keydown", w, !0), () => document.removeEventListener("keydown", w, !0);
  }, [y, m]);
  const x = oe(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), t(null));
  }, [e]);
  return /* @__PURE__ */ R(ss.Provider, { value: { confirm: f, prompt: h, alert: p }, children: [
    n,
    y && /* @__PURE__ */ g(
      qa,
      {
        open: !0,
        onClose: x,
        closable: (e == null ? void 0 : e.kind) !== "alert",
        dismissOnBackdrop: (e == null ? void 0 : e.kind) !== "alert",
        title: (e == null ? void 0 : e.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: e && /* @__PURE__ */ R(rt, { children: [
          e.kind !== "alert" && /* @__PURE__ */ g($n, { variant: "ghost", onClick: x, children: "Cancel" }),
          e.kind === "alert" ? /* @__PURE__ */ g($n, { onClick: m, children: "OK" }) : e.kind === "confirm" ? /* @__PURE__ */ g(
            $n,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: m,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ g($n, { "data-modal-confirm": !0, onClick: m, children: "Save" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "flex flex-col", style: { gap: l }, children: [
          (e == null ? void 0 : e.options.message) && /* @__PURE__ */ g("p", { style: { fontSize: a }, className: "text-zinc-400 leading-relaxed", children: e.options.message }),
          (e == null ? void 0 : e.kind) === "confirm" && e.options.suppressKey && /* @__PURE__ */ g(
            Ya,
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
              style: c,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const Xa = 500, Ga = 250, Qa = 5, Fe = 88, Yi = 4;
function Za(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, a = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function ec({ x: n, y: e, ms: t }) {
  const r = v(null), i = vn();
  return Z(() => {
    r.current && Za(r.current, t);
  }, [t]), ri(
    /* @__PURE__ */ g(
      "div",
      {
        style: {
          position: "fixed",
          left: n - Fe / 2,
          top: e - Fe / 2,
          width: Fe,
          height: Fe,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ R("svg", { ref: r, width: Fe, height: Fe, viewBox: `0 0 ${Fe} ${Fe}`, children: [
          /* @__PURE__ */ g(
            "circle",
            {
              cx: Fe / 2,
              cy: Fe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Yi + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ g(
            "circle",
            {
              cx: Fe / 2,
              cy: Fe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: Yi,
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
function dp() {
  return { "data-no-longpress": "true" };
}
function tc(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function hp({
  children: n,
  showRing: e = !0,
  longPressMs: t = Xa,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = X(null), a = jo(), c = v(null), u = v(null), d = v({ x: 0, y: 0, target: null }), f = v(!1), h = Math.min(Ga, t * 0.5), p = v(i);
  p.current = i;
  const m = v(o);
  return m.current = o, Z(() => {
    if (!Me || !a) return;
    const y = (T) => {
      if (!Br(T.pointerType) || T.button !== 0) return;
      const H = T.target;
      if (!H.closest(r) || (p.current ? !p.current(H) : tc(H))) return;
      const D = T.clientX, E = T.clientY;
      d.current = { x: D, y: E, target: T.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: D, y: E }), h)), c.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const F = d.current.target;
        if (!F) return;
        const N = m.current;
        if (N) {
          N(F, D, E);
          return;
        }
        const U = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: D,
          clientY: E,
          button: 2,
          view: window
        });
        F.dispatchEvent(U);
      }, t);
    }, x = (T) => {
      if (!f.current || c.current === null) return;
      const H = T.clientX - d.current.x, D = T.clientY - d.current.y;
      Math.sqrt(H * H + D * D) > Qa && (clearTimeout(c.current), c.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, w = () => {
      c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, k = (T) => {
      Br(T.pointerType) && (c.current !== null && (clearTimeout(c.current), c.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return a == null || a.addEventListener("pointerdown", y), a.addEventListener("pointermove", x), a.addEventListener("pointerup", w), a.addEventListener("pointercancel", w), a.addEventListener("pointerleave", k), () => {
      a.removeEventListener("pointerdown", y), a.removeEventListener("pointermove", x), a.removeEventListener("pointerup", w), a == null || a.removeEventListener("pointercancel", w), a == null || a.removeEventListener("pointerleave", k), c.current !== null && clearTimeout(c.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, h, r]), /* @__PURE__ */ R(rt, { children: [
    n,
    e && s && /* @__PURE__ */ g(ec, { x: s.x, y: s.y, ms: t - h })
  ] });
}
function pp() {
  const n = Ra();
  return za ? n === null || Br(n) : !1;
}
function tt({
  variant: n = "subtle",
  theme: e = "light",
  cloud: t = !1,
  active: r = !1,
  className: i = "",
  type: o = "button",
  ...s
}) {
  const l = Tt({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), a = Tt({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), c = Tt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), u = "", d = "", f = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", h = {
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
      subtle: { base: `${u} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${d} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${u} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${u} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${d} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${u} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, y = `${d} bg-blue-950 hover:bg-blue-900 text-white`, x = "bg-blue-900!", w = s["data-state"] === "open", k = m[e][n], T = n === "primary" ? a : n.startsWith("tab") ? c : l, H = A(6, 8, Ce()), D = e === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let E;
  if (n === "tab") {
    const F = h[e];
    E = r ? t ? F.cloudActive : F.active : t ? F.cloudInactive : F.inactive;
  } else n === "tab-header" ? E = `${r ? t ? p.cloudActive : p.active : t ? p.cloudInactive : p.inactive} ${w ? t ? p.cloudOpen : p.open : ""}` : (E = `${k.base} ${w ? k.open : ""}`, r && (E = `${E} ${D}`), n === "primary" && e === "light" && t && (E = w ? `${y} ${x}` : y));
  return /* @__PURE__ */ g("button", { type: o, className: `${f} ${E} ${i}`, style: { ...T, gap: H }, ...s });
}
const nc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], rc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Tr = 1900, Er = 2100;
function ic(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function oc(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function mp({ selected: n, onChange: e, theme: t = "light", showChips: r = !0, className: i = "", initialView: o }) {
  const s = /* @__PURE__ */ new Date(), l = (() => {
    if (!o) return s;
    const _ = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(_.getTime()) ? s : _;
  })(), [a, c] = X(l.getFullYear()), [u, d] = X(l.getMonth()), [f, h] = X("days"), [p, m] = X(null), y = Un(() => new Set(n), [n]), x = (_) => {
    y.has(_) ? e(n.filter((Q) => Q !== _)) : e([...n, _]);
  }, w = Un(() => {
    const _ = ic(a, u), Q = new Date(a, u, 1).getDay(), de = [];
    for (let ye = 0; ye < Q; ye++) de.push({ key: `pad-${ye}`, day: 0, empty: !0 });
    for (let ye = 1; ye <= _; ye++) de.push({ key: oc(a, u, ye), day: ye, empty: !1 });
    return de;
  }, [a, u]), k = (_) => c((Q) => Math.max(Tr, Math.min(Er, Q + _))), T = (_) => {
    u + _ < 0 ? (c((Q) => Math.max(Tr, Q - 1)), d(11)) : u + _ > 11 ? (c((Q) => Math.min(Er, Q + 1)), d(0)) : d((Q) => Q + _);
  }, H = () => {
    if (p === null) return;
    const _ = parseInt(p, 10);
    !isNaN(_) && _ >= Tr && _ <= Er && c(_), m(null);
  }, D = (_) => n.some((Q) => Q.startsWith(`${a}-${String(_ + 1).padStart(2, "0")}`)), E = t === "dark", F = Ce(), N = A(4, 8, F), U = A(16, 20, F), $ = A(10, 11, F), j = A(6, 8, F), M = A(12, 14, F), z = A(6, 10, F), P = A(12, 14, F), L = A(8, 12, F), te = A(10, 12, F), ae = A(6, 10, F), Te = A(2, 6, F), re = A(64, 80, F), ne = { padding: N }, I = { width: U, height: U }, G = { fontSize: $, paddingTop: j, paddingBottom: j }, K = { fontSize: M, paddingTop: z, paddingBottom: z }, S = { fontSize: P, paddingTop: L, paddingBottom: L }, ee = { fontSize: te, padding: `${Te}px ${ae}px` }, q = E ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ge = E ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ R("div", { className: `border rounded-lg overflow-hidden w-full ${E ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ R("div", { className: `flex items-center justify-between px-3 py-2 border-b ${E ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? k(-1) : T(-1),
          style: ne,
          className: `rounded transition-colors ${E ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ g(ta, { style: I })
        }
      ),
      f === "days" ? /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => h("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${E ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(a, u).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ g(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(a),
          onChange: (_) => m(_.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (_) => _.target.select(),
          onBlur: H,
          onKeyDown: (_) => {
            _.key === "Enter" && (_.preventDefault(), H()), _.key === "Escape" && m(null);
          },
          style: { width: re },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${E ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? k(1) : T(1),
          style: ne,
          className: `rounded transition-colors ${E ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ g(Gn, { style: I })
        }
      )
    ] }),
    f === "months" ? /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ g("div", { className: "grid grid-cols-3 text-center", children: rc.map((_, Q) => /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: () => {
            d(Q), h("days");
          },
          style: S,
          className: `relative font-medium transition-colors border-b ${Q === u ? q : ge} ${E ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            _,
            D(Q) && /* @__PURE__ */ g("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${Q === u ? "bg-white" : E ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        _
      )) }),
      /* @__PURE__ */ g("div", { className: `text-center border-t ${E ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => {
            c(s.getFullYear()), d(s.getMonth()), h("days");
          },
          style: { paddingTop: z, paddingBottom: z, fontSize: M },
          className: `px-3 font-semibold rounded transition-colors ${E ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ R("div", { className: "grid grid-cols-7 text-center", children: [
      nc.map((_) => /* @__PURE__ */ g("div", { style: G, className: `font-semibold uppercase tracking-wider border-b ${E ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: _ }, _)),
      w.map((_) => _.empty ? /* @__PURE__ */ g("div", {}, _.key) : /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => x(_.key),
          style: K,
          className: `font-medium transition-colors border-b ${E ? "border-zinc-800/60" : "border-zinc-50"} ${y.has(_.key) ? q : E ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: _.day
        },
        _.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ R("div", { className: `px-3 py-2 border-t ${E ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ R("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ g("div", { className: "flex flex-wrap gap-1", children: n.map((_) => {
        const Q = /* @__PURE__ */ new Date(_ + "T00:00:00"), de = Q.getFullYear() === s.getFullYear() ? Q.toLocaleString("default", { month: "short", day: "numeric" }) : Q.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ R(
          "button",
          {
            type: "button",
            onClick: () => x(_),
            "aria-label": `Remove ${de}`,
            style: ee,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${E ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              de,
              /* @__PURE__ */ g("span", { className: `leading-none ${E ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          _
        );
      }) })
    ] })
  ] });
}
function gp({
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
  theme: u,
  className: d = ""
}) {
  const f = (k) => e instanceof Set ? e.has(k) : e.includes(k), h = Ce(), p = A(12, 16, h), m = A(8, 12, h), y = A(12, 14, h), x = A(16, 20, h), w = r != null || i != null;
  return /* @__PURE__ */ R("div", { className: d, ...u ? { "data-theme": u } : {}, children: [
    w && /* @__PURE__ */ R("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ g("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ g("button", { type: "button", disabled: c, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${c ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          n.map((k) => {
            const T = f(k.id);
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: c,
                onClick: () => t(k.id),
                className: `ui-checklist-item ${T ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${m}px ${p}px`, fontSize: y },
                children: [
                  /* @__PURE__ */ g(is, { checked: T, size: x }),
                  k.leading != null && /* @__PURE__ */ g("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ g("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ g("span", { className: "ui-checklist-secondary", children: k.secondary })
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
function yp({
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
  const u = Ce(), d = s ? 10 : A(12, 16, u), f = s ? 6 : A(8, 12, u), h = s ? 12 : A(12, 14, u), p = s ? 14 : A(16, 20, u);
  return /* @__PURE__ */ R("div", { className: c, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ g("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ g("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          n.map((m) => {
            const y = e === m.id;
            return /* @__PURE__ */ R(
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
const xp = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = Sn(), { refs: l, floatingStyles: a } = ua({
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
          var w;
          if (i !== "visible") return {};
          const u = (w = c.elements.floating.ownerDocument) == null ? void 0 : w.defaultView;
          if (!u) return {};
          const d = c.rects.reference, f = Math.max(d.x, 0), h = Math.max(d.y, 0), p = Math.min(d.x + d.width, u.innerWidth), m = Math.min(d.y + d.height, u.innerHeight);
          if (p <= f || m <= h) return {};
          const y = r === "left" ? p - (d.x + d.width) : r === "right" ? f - d.x : 0, x = r === "top" ? h - d.y : r === "bottom" ? m - (d.y + d.height) : 0;
          return { x: c.x + y, y: c.y + x };
        }
      },
      _o(o),
      Ho({ padding: 8 }),
      Wo({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (c) => {
          var m;
          const u = (m = c.elements.floating.ownerDocument) == null ? void 0 : m.defaultView;
          if (!u) return {};
          const d = c.rects.floating.width, f = c.rects.floating.height, h = Math.max(8, Math.min(c.x, u.innerWidth - d - 8)), p = Math.max(8, Math.min(c.y, u.innerHeight - f - 8));
          return { x: h, y: p };
        }
      }
    ],
    whileElementsMounted: fa
  });
  return Xe(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ R(rt, { children: [
    !t && /* @__PURE__ */ g("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && ri(
      /* @__PURE__ */ g(
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
}, Wt = ({ content: n, children: e }) => {
  const t = Ce(), r = A(10, 12, t), i = A(6, 6, t), o = A(10, 12, t), s = { padding: `${i}px ${r}px`, fontSize: o }, l = vn(), a = Sn(), [c, u] = X(!1), [d, f] = X({ x: 0, y: 0 }), h = v(null), p = v(null), m = () => {
    if (!h.current) return;
    const y = h.current.getBoundingClientRect();
    f({ x: y.left + y.width / 2, y: y.top });
  };
  return Z(() => () => {
    p.current && clearTimeout(p.current);
  }, []), Z(() => (c && a && (m(), a.addEventListener("scroll", m, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", m, !0)), [c]), /* @__PURE__ */ R(
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
        c && ri(
          /* @__PURE__ */ R(
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
function pr() {
  const n = Ce(), e = Me, t = e ? A(28, 40, n) : 28, r = e ? A(28, 40, n) : 28, i = e ? A(10, 14, n) : 10, o = e ? A(10, 14, n) : 10, s = e ? A(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const bp = Me ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", sc = Me ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Pn = Me ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", lc = "hover:bg-red-950/50", kp = Me ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", wp = "bg-blue-900/50 border-blue-700 text-blue-300", vp = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", ac = Me ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Sp = Me ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", ln = Me ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", cc = "inline-flex rounded overflow-hidden border border-zinc-700", uc = Me ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ln = ({ onClick: n, disabled: e, title: t, className: r = sc, children: i }) => {
  const o = pr();
  return /* @__PURE__ */ g(Wt, { content: t, children: /* @__PURE__ */ g("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Cp = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o }) => {
  const s = pr();
  return /* @__PURE__ */ g("div", { className: `${cc}${o ? " w-full" : ""}`, children: e.map((l) => {
    const a = i ? i(l.v) : n === l.v;
    return /* @__PURE__ */ g(
      "button",
      {
        disabled: r,
        onClick: () => t(l.v),
        style: s.control,
        className: `font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${a ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${l.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
        children: l.l
      },
      l.v
    );
  }) });
}, Tp = ({ children: n }) => /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ g("span", { className: Me ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ g("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), fc = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", dc = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Ep = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ R("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ g("span", { className: t ? fc : dc, children: n }),
  e
] }), Np = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ R("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${t}`, children: [
  n,
  e && /* @__PURE__ */ g("div", { className: "ml-auto flex items-center gap-1", children: e })
] }), Mp = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => /* @__PURE__ */ R(rt, { children: [
  /* @__PURE__ */ g(Ln, { onClick: () => r(-1), disabled: n, title: "Move up", className: Pn, children: /* @__PURE__ */ g(na, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ g(Ln, { onClick: () => r(1), disabled: n, title: "Move down", className: Pn, children: /* @__PURE__ */ g(ra, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ g(Ln, { onClick: e, disabled: n, title: "Duplicate", className: Pn, children: /* @__PURE__ */ g(Bo, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ g("div", { className: ln }),
  /* @__PURE__ */ g(Ln, { onClick: t, disabled: n, title: "Delete", className: `${Pn} ${lc}`, children: /* @__PURE__ */ g(Lr, { className: "w-2.5 h-2.5" }) })
] });
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
function ls(n, e, t) {
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
      return a && a < s.length && a < l.length && us(s.charCodeAt(a - 1)) && cs(s.charCodeAt(a)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = ls(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function as(n, e, t, r) {
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
      let c = s.text, u = l.text, d = c.length, f = u.length;
      for (; d > 0 && f > 0 && c[d - 1] == u[f - 1]; )
        d--, f--, t--, r--;
      return d && f && d < c.length && us(c.charCodeAt(d - 1)) && cs(c.charCodeAt(d)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let c = as(s.content, l.content, t - 1, r - 1);
      if (c)
        return c;
    }
    t -= a, r -= a;
  }
}
function cs(n) {
  return n >= 56320 && n < 57344;
}
function us(n) {
  return n >= 55296 && n < 56320;
}
class C {
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
    return new C(i, this.size + e.size);
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
    return new C(r, i);
  }
  /**
  @internal
  */
  cutByIndex(e, t) {
    return e == t ? C.empty : e == 0 && t == this.content.length ? this : new C(this.content.slice(e, t));
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
    return i[e] = t, new C(i, o);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(e) {
    return new C([e].concat(this.content), this.size + e.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(e) {
    return new C(this.content.concat(e), this.size + e.nodeSize);
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
    return ls(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return as(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return Bn(0, e);
    if (e == this.size)
      return Bn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? Bn(t + 1, o) : Bn(t, r);
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
      return C.empty;
    if (!Array.isArray(t))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return C.fromArray(t.map(e.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(e) {
    if (!e.length)
      return C.empty;
    let t, r = 0;
    for (let i = 0; i < e.length; i++) {
      let o = e[i];
      r += o.nodeSize, i && o.isText && e[i - 1].sameMarkup(o) ? (t || (t = e.slice(0, i)), t[t.length - 1] = o.withText(t[t.length - 1].text + o.text)) : t && t.push(o);
    }
    return new C(t || e, r);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(e) {
    if (!e)
      return C.empty;
    if (e instanceof C)
      return e;
    if (Array.isArray(e))
      return this.fromArray(e);
    if (e.attrs)
      return new C([e], e.nodeSize);
    throw new RangeError("Can not convert " + e + " to a Fragment" + (e.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
}
C.empty = new C([], 0);
const Nr = { index: 0, offset: 0 };
function Bn(n, e) {
  return Nr.index = n, Nr.offset = e, Nr;
}
function Zn(n, e) {
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
      if (!Zn(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !Zn(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
let me = class Hr {
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
    return this == e || this.type == e.type && Zn(this.attrs, e.attrs);
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
      return Hr.none;
    if (e instanceof Hr)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
};
me.none = [];
class mn extends Error {
}
class O {
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
    let r = ds(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new O(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new O(fs(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return O.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new O(C.fromJSON(e, t.content), r, i);
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
    return new O(e, r, i);
  }
}
O.empty = new O(C.empty, 0, 0);
function fs(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(fs(o.content, e - i - 1, t - i - 1)));
}
function ds(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), a = n.maybeChild(s);
  if (l == e || a.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let c = ds(a.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, a);
  return c && n.replaceChild(s, a.copy(c));
}
function hc(n, e, t) {
  if (t.openStart > n.depth)
    throw new mn("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new mn("Inconsistent open depths");
  return hs(n, e, t, 0);
}
function hs(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = hs(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return Nt(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = pc(t, n);
      return Nt(o, ms(n, s, l, e, r));
    }
  else return Nt(o, er(n, e, r));
}
function ps(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new mn("Cannot join " + e.type.name + " onto " + n.type.name);
}
function Wr(n, e, t) {
  let r = n.node(t);
  return ps(r, e.node(t)), r;
}
function Et(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function un(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (Et(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    Et(i.child(l), r);
  e && e.depth == t && e.textOffset && Et(e.nodeBefore, r);
}
function Nt(n, e) {
  if (!n.type.validContent(e))
    throw new mn("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function ms(n, e, t, r, i) {
  let o = n.depth > i && Wr(n, e, i + 1), s = r.depth > i && Wr(t, r, i + 1), l = [];
  return un(null, n, i, l), o && s && e.index(i) == t.index(i) ? (ps(o, s), Et(Nt(o, ms(n, e, t, r, i + 1)), l)) : (o && Et(Nt(o, er(n, e, i + 1)), l), un(e, t, i, l), s && Et(Nt(s, er(t, r, i + 1)), l)), un(r, null, i, l), new C(l);
}
function er(n, e, t) {
  let r = [];
  if (un(null, n, t, r), n.depth > t) {
    let i = Wr(n, e, t + 1);
    Et(Nt(i, er(n, e, t + 1)), r);
  }
  return un(e, null, t, r), new C(r);
}
function pc(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(C.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class gn {
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
      return me.none;
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
        return new tr(this, e, r);
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
    return new gn(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = Ui.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      Ui.set(e, r = new mc());
    let i = r.elts[r.i] = gn.resolve(e, t);
    return r.i = (r.i + 1) % gc, i;
  }
}
class mc {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const gc = 12, Ui = /* @__PURE__ */ new WeakMap();
class tr {
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
const yc = /* @__PURE__ */ Object.create(null);
let Jt = class jr {
  /**
  @internal
  */
  constructor(e, t, r, i = me.none) {
    this.type = e, this.attrs = t, this.marks = i, this.content = r || C.empty;
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
    return this.type == e && Zn(this.attrs, t || e.defaultAttrs || yc) && me.sameSet(this.marks, r || me.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new jr(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new jr(this.type, this.attrs, this.content, e);
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
      return O.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), c = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new O(c, i.depth - s, o.depth - s);
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
    return hc(this.resolve(e), this.resolve(t), r);
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
    return gn.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return gn.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), gs(this.marks, e);
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
  canReplace(e, t, r = C.empty, i = 0, o = r.childCount) {
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
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = me.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!me.sameSet(e, this.marks))
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
    let i = C.fromJSON(e, t.content), o = e.nodeType(t.type).create(t.attrs, i, r);
    return o.type.checkAttrs(o.attrs), o;
  }
};
Jt.prototype.text = void 0;
class nr extends Jt {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    if (super(e, t, null, i), !r)
      throw new RangeError("Empty text nodes are not allowed");
    this.text = r;
  }
  toString() {
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : gs(this.marks, JSON.stringify(this.text));
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
    return e == this.marks ? this : new nr(this.type, this.attrs, this.text, e);
  }
  withText(e) {
    return e == this.text ? this : new nr(this.type, this.attrs, e, this.marks);
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
function gs(n, e) {
  for (let t = n.length - 1; t >= 0; t--)
    e = n[t].type.name + "(" + e + ")";
  return e;
}
class It {
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
    let r = new xc(e, t);
    if (r.next == null)
      return It.empty;
    let i = ys(r);
    r.next && r.err("Unexpected trailing text");
    let o = Tc(Cc(i));
    return Ec(o, r), o;
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
        return C.from(l.map((c) => c.createAndFill()));
      for (let c = 0; c < s.next.length; c++) {
        let { type: u, next: d } = s.next[c];
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
It.empty = new It(!0);
class xc {
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
function ys(n) {
  let e = [];
  do
    e.push(bc(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function bc(n) {
  let e = [];
  do
    e.push(kc(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function kc(n) {
  let e = Sc(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = wc(n, e);
    else
      break;
  return e;
}
function Xi(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function wc(n, e) {
  let t = Xi(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Xi(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function vc(n, e) {
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
function Sc(n) {
  if (n.eat("(")) {
    let e = ys(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = vc(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Cc(n) {
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
function xs(n, e) {
  return e - n;
}
function Gi(n, e) {
  let t = [];
  return r(e), t.sort(xs);
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
function Tc(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Gi(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: a }) => {
        if (!l)
          return;
        let c;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (c = i[u][1]);
        Gi(n, a).forEach((u) => {
          c || i.push([l, c = []]), c.indexOf(u) == -1 && c.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new It(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(xs);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Ec(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: a, next: c } = i.next[l];
      s.push(a.name), o && !(a.isText || a.hasRequiredAttrs()) && (o = !1), r.indexOf(c) == -1 && r.push(c);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function bs(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function ks(n, e) {
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
function ws(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
function vs(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Mc(n, r, e[r]);
  return t;
}
let Qi = class Ss {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = vs(e, r.attrs), this.defaultAttrs = bs(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return this.contentMatch == It.empty;
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
    return !e && this.defaultAttrs ? this.defaultAttrs : ks(this.attrs, e);
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
    return new Jt(this, this.computeAttrs(e), C.from(t), me.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = C.from(t), this.checkContent(t), new Jt(this, this.computeAttrs(e), t, me.setFrom(r));
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
    if (e = this.computeAttrs(e), t = C.from(t), t.size) {
      let s = this.contentMatch.fillBefore(t);
      if (!s)
        return null;
      t = s.append(t);
    }
    let i = this.contentMatch.matchFragment(t), o = i && i.fillBefore(C.empty, !0);
    return o ? new Jt(this, e, t.append(o), me.setFrom(r)) : null;
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
    ws(this.attrs, e, "node", this.name);
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
    return t ? t.length ? t : me.none : e;
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null);
    e.forEach((o, s) => r[o] = new Ss(o, t, s));
    let i = t.spec.topNode || "doc";
    if (!r[i])
      throw new RangeError("Schema is missing its top node type ('" + i + "')");
    if (!r.text)
      throw new RangeError("Every schema needs a 'text' type");
    for (let o in r.text.attrs)
      throw new RangeError("The text node type should not have attributes");
    return r;
  }
};
function Nc(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Mc {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Nc(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class mr {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = vs(e, i.attrs), this.excluded = null;
    let o = bs(this.attrs);
    this.instance = o ? new me(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new me(this, ks(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new mr(o, i++, t, s)), r;
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
    ws(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Ac {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Ne.from(e.nodes), t.marks = Ne.from(e.marks || {}), this.nodes = Qi.compile(this.spec.nodes, this), this.marks = mr.compile(this.spec.marks, this);
    let r = /* @__PURE__ */ Object.create(null);
    for (let i in this.nodes) {
      if (i in this.marks)
        throw new RangeError(i + " can not be both a node and a mark");
      let o = this.nodes[i], s = o.spec.content || "", l = o.spec.marks;
      if (o.contentMatch = r[s] || (r[s] = It.parse(s, this.nodes)), o.inlineContent = o.contentMatch.inlineContent, o.spec.linebreakReplacement) {
        if (this.linebreakReplacement)
          throw new RangeError("Multiple linebreak nodes defined");
        if (!o.isInline || !o.isLeaf)
          throw new RangeError("Linebreak replacement nodes must be inline leaf nodes");
        this.linebreakReplacement = o;
      }
      o.markSet = l == "_" ? null : l ? Zi(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : Zi(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Jt.fromJSON(this, i), this.markFromJSON = (i) => me.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    else if (e instanceof Qi) {
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
    return new nr(r, r.defaultAttrs, e, me.setFrom(t));
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
function Zi(n, e) {
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
function zc(n) {
  return n.tag != null;
}
function Rc(n) {
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
      if (zc(i))
        this.tags.push(i);
      else if (Rc(i)) {
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
    let r = new to(this, t, !1);
    return r.addAll(e, me.none, t.from, t.to), r.finish();
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
    let r = new to(this, t, !0);
    return r.addAll(e, me.none, t.from, t.to), O.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Dc(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = no(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = no(s)), s.node || s.ignore || s.mark || (s.node = i);
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
const Cs = {
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
}, Ic = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, Ts = { ol: !0, ul: !0 }, yn = 1, qr = 2, fn = 4;
function eo(n, e, t) {
  return e != null ? (e ? yn : 0) | (e === "full" ? qr : 0) : n && n.whitespace == "pre" ? yn | qr : t & ~fn;
}
class Fn {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = me.none, this.match = o || (s & fn ? null : e.contentMatch);
  }
  findWrapping(e) {
    if (!this.match) {
      if (!this.type)
        return [];
      let t = this.type.contentMatch.fillBefore(C.from(e));
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
    if (!(this.options & yn)) {
      let r = this.content[this.content.length - 1], i;
      if (r && r.isText && (i = /[ \t\r\n\u000c]+$/.exec(r.text))) {
        let o = r;
        r.text.length == i[0].length ? this.content.pop() : this.content[this.content.length - 1] = o.withText(o.text.slice(0, o.text.length - i[0].length));
      }
    }
    let t = C.from(this.content);
    return !e && this.match && (t = t.append(this.match.fillBefore(C.empty, !0))), this.type ? this.type.create(this.attrs, t, this.marks) : t;
  }
  inlineContext(e) {
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !Cs.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class to {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = eo(null, t.preserveWhitespace, 0) | (r ? fn : 0);
    i ? o = new Fn(i.type, i.attrs, me.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new Fn(null, null, me.none, !0, null, s) : o = new Fn(e.schema.topNodeType, null, me.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & qr ? "full" : this.localPreserveWS || (i.options & yn) > 0, { schema: s } = this.parser;
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
    Ts.hasOwnProperty(s) && this.parser.normalizeLists && Oc(e);
    let a = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (a ? a.ignore : Ic.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!a || a.skip || a.closeParent) {
      a && a.closeParent ? this.open = Math.max(0, this.open - 1) : a && a.skip.nodeType && (e = a.skip);
      let c, u = this.needsBlock;
      if (Cs.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), c = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let d = a && a.skip ? t : this.readStyles(e, t);
      d && this.addAll(e, d), c && this.sync(o), this.needsBlock = u;
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
      let s = me.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : ro(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = eo(e, o, s.options);
    s.options & fn && s.content.length == 0 && (l |= fn);
    let a = me.none;
    return r = r.filter((c) => (s.type ? s.type.allowsMarkType(c.type) : ro(c.type, e)) ? (a = c.addToSet(a), !1) : !0), this.nodes.push(new Fn(e, t, a, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= yn);
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
function Oc(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && Ts.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Dc(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function no(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function ro(n, e) {
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
class gr {
  /**
  Create a serializer. `nodes` should map node names to functions
  that take a node and return a description of the corresponding
  DOM. `marks` does the same for mark names, but also gets an
  argument that tells it whether the mark's content is block or
  inline content (for typical use, it'll always be inline). A mark
  serializer may be `null` to indicate that marks of that type
  should not be serialized.
  */
  constructor(e, t) {
    this.nodes = e, this.marks = t;
  }
  /**
  Serialize the content of this fragment to a DOM fragment. When
  not in the browser, the `document` option, containing a DOM
  document, should be passed so that the serializer can create
  nodes.
  */
  serializeFragment(e, t = {}, r) {
    r || (r = _n(t).createDocumentFragment());
    let i = r, o = [];
    return e.forEach((s) => {
      if (o.length || s.marks.length) {
        let l = 0, a = 0;
        for (; l < o.length && a < s.marks.length; ) {
          let c = s.marks[a];
          if (!this.marks[c.type.name]) {
            a++;
            continue;
          }
          if (!c.eq(o[l][0]) || c.type.spec.spanning === !1)
            break;
          l++, a++;
        }
        for (; l < o.length; )
          i = o.pop()[1];
        for (; a < s.marks.length; ) {
          let c = s.marks[a++], u = this.serializeMark(c, s.isInline, t);
          u && (o.push([c, i]), i.appendChild(u.dom), i = u.contentDOM || u.dom);
        }
      }
      i.appendChild(this.serializeNodeInner(s, t));
    }), r;
  }
  /**
  @internal
  */
  serializeNodeInner(e, t) {
    if (e.isText)
      return _n(t).createTextNode(e.text);
    let { dom: r, contentDOM: i } = Vn(_n(t), this.nodes[e.type.name](e), null, e.attrs);
    if (i) {
      if (e.isLeaf)
        throw new RangeError("Content hole not allowed in a leaf node spec");
      this.serializeFragment(e.content, t, i);
    }
    return r;
  }
  /**
  Serialize this node to a DOM node. This can be useful when you
  need to serialize a part of a document, as opposed to the whole
  document. To serialize a whole document, use
  [`serializeFragment`](https://prosemirror.net/docs/ref/#model.DOMSerializer.serializeFragment) on
  its [content](https://prosemirror.net/docs/ref/#model.Node.content).
  */
  serializeNode(e, t = {}) {
    let r = this.serializeNodeInner(e, t);
    for (let i = e.marks.length - 1; i >= 0; i--) {
      let o = this.serializeMark(e.marks[i], e.isInline, t);
      o && ((o.contentDOM || o.dom).appendChild(r), r = o.dom);
    }
    return r;
  }
  /**
  @internal
  */
  serializeMark(e, t, r = {}) {
    let i = this.marks[e.type.name];
    return i && Vn(_n(r), i(e, t), null, e.attrs);
  }
  static renderSpec(e, t, r = null, i) {
    return typeof t == "string" ? { dom: e.createTextNode(t) } : Vn(e, t, r, i);
  }
  /**
  Build a serializer using the [`toDOM`](https://prosemirror.net/docs/ref/#model.NodeSpec.toDOM)
  properties in a schema's node and mark specs.
  */
  static fromSchema(e) {
    return e.cached.domSerializer || (e.cached.domSerializer = new gr(this.nodesFromSchema(e), this.marksFromSchema(e)));
  }
  /**
  Gather the serializers in a schema's node specs into an object.
  This can be useful as a base to build a custom serializer from.
  */
  static nodesFromSchema(e) {
    let t = io(e.nodes);
    return t.text || (t.text = (r) => r.text), t;
  }
  /**
  Gather the serializers in a schema's mark specs into an object.
  */
  static marksFromSchema(e) {
    return io(e.marks);
  }
}
function io(n) {
  let e = {};
  for (let t in n) {
    let r = n[t].spec.toDOM;
    r && (e[t] = r);
  }
  return e;
}
function _n(n) {
  return n.document || window.document;
}
const oo = /* @__PURE__ */ new WeakMap();
function $c(n) {
  let e = oo.get(n);
  return e === void 0 && oo.set(n, e = Pc(n)), e;
}
function Pc(n) {
  let e = null;
  function t(r) {
    if (r && typeof r == "object")
      if (Array.isArray(r))
        if (typeof r[0] == "string")
          e || (e = []), e.push(r);
        else
          for (let i = 0; i < r.length; i++)
            t(r[i]);
      else
        for (let i in r)
          t(r[i]);
  }
  return t(n), e;
}
function Vn(n, e, t, r) {
  if (e.nodeType == 1)
    return { dom: e };
  if (e.dom && e.dom.nodeType == 1)
    return e;
  let i = e[0], o;
  if (typeof i != "string")
    throw new RangeError("Invalid array passed to renderSpec");
  if (r && (o = $c(r)) && o.indexOf(e) > -1)
    throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.");
  let s = i.indexOf(" ");
  s > 0 && (t = i.slice(0, s), i = i.slice(s + 1));
  let l, a = t ? n.createElementNS(t, i) : n.createElement(i), c = e[1], u = 1;
  if (c && typeof c == "object" && c.nodeType == null && !Array.isArray(c)) {
    u = 2;
    for (let d in c)
      if (c[d] != null) {
        let f = d.indexOf(" ");
        f > 0 ? a.setAttributeNS(d.slice(0, f), d.slice(f + 1), c[d]) : d == "style" && a.style ? a.style.cssText = c[d] : a.setAttribute(d, c[d]);
      }
  }
  for (let d = u; d < e.length; d++) {
    let f = e[d];
    if (f === 0) {
      if (d < e.length - 1 || d > u)
        throw new RangeError("Content hole must be the only child of its parent node");
      return { dom: a, contentDOM: a };
    } else if (typeof f == "string")
      a.appendChild(n.createTextNode(f));
    else {
      let { dom: h, contentDOM: p } = Vn(n, f, t, r);
      if (a.appendChild(h), p) {
        if (l)
          throw new RangeError("Multiple content holes");
        l = p;
      }
    }
  }
  return { dom: a, contentDOM: l };
}
const Es = 65535, Ns = Math.pow(2, 16);
function Lc(n, e) {
  return n + e * Ns;
}
function so(n) {
  return n & Es;
}
function Bc(n) {
  return (n - (n & Es)) / Ns;
}
const Ms = 1, As = 2, Kn = 4, zs = 8;
class Vr {
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
    return (this.delInfo & zs) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (Ms | Kn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (As | Kn)) > 0;
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
class Pe {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(e, t = !1) {
    if (this.ranges = e, this.inverted = t, !e.length && Pe.empty)
      return Pe.empty;
  }
  /**
  @internal
  */
  recover(e) {
    let t = 0, r = so(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Bc(e);
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
      let c = this.ranges[l + o], u = this.ranges[l + s], d = a + c;
      if (e <= d) {
        let f = c ? e == a ? -1 : e == d ? 1 : t : t, h = a + i + (f < 0 ? 0 : u);
        if (r)
          return h;
        let p = e == (t < 0 ? a : d) ? null : Lc(l / 3, e - a), m = e == a ? As : e == d ? Ms : Kn;
        return (t < 0 ? e != a : e != d) && (m |= zs), new Vr(h, m, p);
      }
      i += u - c;
    }
    return r ? e + i : new Vr(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = so(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return new Pe(this.ranges, !this.inverted);
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
    return e == 0 ? Pe.empty : new Pe(e < 0 ? [0, -e, 0] : [0, 0, e]);
  }
}
Pe.empty = new Pe([]);
class rr {
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
    return new rr(this._maps, this.mirror, e, t);
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
    let e = new rr();
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
    return r ? e : new Vr(e, i, null);
  }
}
const Mr = /* @__PURE__ */ Object.create(null);
class Ie {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return Pe.empty;
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
    let r = Mr[t.stepType];
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
    if (e in Mr)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Mr[e] = t, t.prototype.jsonID = e, t;
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
      if (o instanceof mn)
        return ve.fail(o.message);
      throw o;
    }
  }
}
function gi(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(gi(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return C.fromArray(r);
}
class ht extends Ie {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new O(gi(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return ve.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new Ke(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new ht(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof ht && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new ht(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new ht(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ie.jsonID("addMark", ht);
class Ke extends Ie {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new O(gi(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return ve.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new ht(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new Ke(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof Ke && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new Ke(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new Ke(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ie.jsonID("removeMark", Ke);
class pt extends Ie {
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
    return ve.fromReplace(e, this.pos, this.pos + 1, new O(C.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new pt(this.pos, t.marks[i]);
        return new pt(this.pos, this.mark);
      }
    }
    return new Ot(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new pt(t.pos, this.mark);
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
    return new pt(t.pos, e.markFromJSON(t.mark));
  }
}
Ie.jsonID("addNodeMark", pt);
class Ot extends Ie {
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
    return ve.fromReplace(e, this.pos, this.pos + 1, new O(C.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new pt(this.pos, this.mark);
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
Ie.jsonID("removeNodeMark", Ot);
class we extends Ie {
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
    return this.structure && Kr(e, this.from, this.to) ? ve.fail("Structure replace would overwrite content") : ve.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Pe([this.from, this.to - this.from, this.slice.size]);
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
      let t = this.slice.size + e.slice.size == 0 ? O.empty : new O(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new we(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? O.empty : new O(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
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
    return new we(t.from, t.to, O.fromJSON(e, t.slice), !!t.structure);
  }
}
we.MAP_BIAS = 1;
Ie.jsonID("replace", we);
class Se extends Ie {
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
    if (this.structure && (Kr(e, this.from, this.gapFrom) || Kr(e, this.gapTo, this.to)))
      return ve.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return ve.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? ve.fromReplace(e, this.from, this.to, r) : ve.fail("Content does not fit in gap");
  }
  getMap() {
    return new Pe([
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
    return new Se(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new Se(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new Se(t.from, t.to, t.gapFrom, t.gapTo, O.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ie.jsonID("replaceAround", Se);
function Kr(n, e, t) {
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
function Fc(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (a, c, u) => {
    if (!a.isInline)
      return;
    let d = a.marks;
    if (!r.isInSet(d) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(c, e), h = Math.min(c + a.nodeSize, t), p = r.addToSet(d);
      for (let m = 0; m < d.length; m++)
        d[m].isInSet(p) || (s && s.to == f && s.mark.eq(d[m]) ? s.to = h : i.push(s = new Ke(f, h, d[m])));
      l && l.to == f ? l.to = h : o.push(l = new ht(f, h, r));
    }
  }), i.forEach((a) => n.step(a)), o.forEach((a) => n.step(a));
}
function _c(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let a = null;
    if (r instanceof mr) {
      let c = s.marks, u;
      for (; u = r.isInSet(c); )
        (a || (a = [])).push(u), c = u.removeFromSet(c);
    } else r ? r.isInSet(s.marks) && (a = [r]) : a = s.marks;
    if (a && a.length) {
      let c = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < a.length; u++) {
        let d = a[u], f;
        for (let h = 0; h < i.length; h++) {
          let p = i[h];
          p.step == o - 1 && d.eq(i[h].style) && (f = p);
        }
        f ? (f.to = c, f.step = o) : i.push({ style: d, from: Math.max(l, e), to: c, step: o });
      }
    }
  }), i.forEach((s) => n.step(new Ke(s.from, s.to, s.style)));
}
function yi(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let a = 0; a < o.childCount; a++) {
    let c = o.child(a), u = l + c.nodeSize, d = r.matchType(c.type);
    if (!d)
      s.push(new we(l, u, O.empty));
    else {
      r = d;
      for (let f = 0; f < c.marks.length; f++)
        t.allowsMarkType(c.marks[f].type) || n.step(new Ke(l, u, c.marks[f]));
      if (i && c.isText && t.whitespace != "pre") {
        let f, h = /\r?\n|\r/g, p;
        for (; f = h.exec(c.text); )
          p || (p = new O(C.from(t.schema.text(" ", t.allowedMarks(c.marks))), 0, 0)), s.push(new we(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let a = r.fillBefore(C.empty, !0);
    n.replace(l, l, new O(a, 0, 0));
  }
  for (let a = s.length - 1; a >= 0; a--)
    n.step(s[a]);
}
function Hc(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function nn(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, a = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, a, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Hc(s, l, a))
      break;
    l && (i = 1), a < s.childCount && (o = 1);
  }
  return null;
}
function Wc(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), a = s, c = l, u = C.empty, d = 0;
  for (let p = o, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = C.from(r.node(p).copy(u)), d++) : a--;
  let f = C.empty, h = 0;
  for (let p = o, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = C.from(i.node(p).copy(f)), h++) : c++;
  n.step(new Se(a, c, s, l, new O(u.append(f), d, h), u.size - d, !0));
}
function Rs(n, e, t = null, r = n) {
  let i = jc(n, e), o = i && qc(r, e);
  return o ? i.map(lo).concat({ type: e, attrs: t }).concat(o.map(lo)) : null;
}
function lo(n) {
  return { type: n, attrs: null };
}
function jc(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function qc(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let a = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let c = r; a && c < i; c++)
    a = a.matchType(t.child(c).type);
  return !a || !a.validEnd ? null : s;
}
function Vc(n, e, t) {
  let r = C.empty;
  for (let s = t.length - 1; s >= 0; s--) {
    if (r.size) {
      let l = t[s].type.contentMatch.matchFragment(r);
      if (!l || !l.validEnd)
        throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper");
    }
    r = C.from(t[s].type.create(t[s].attrs, r));
  }
  let i = e.start, o = e.end;
  n.step(new Se(i, o, i, o, new O(r, 0, 0), t.length, !0));
}
function Kc(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let a = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, a) && Jc(n.doc, n.mapping.slice(o).map(l), r)) {
      let c = null;
      if (r.schema.linebreakReplacement) {
        let h = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        h && !p ? c = !1 : !h && p && (c = !0);
      }
      c === !1 && Os(n, s, l, o), yi(n, n.mapping.slice(o).map(l, 1), r, void 0, c === null);
      let u = n.mapping.slice(o), d = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new Se(d, f, d + 1, f - 1, new O(C.from(r.create(a, null, s.marks)), 0, 0), 1, !0)), c === !0 && Is(n, s, l, o), !1;
    }
  });
}
function Is(n, e, t, r) {
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
function Os(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Jc(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function Yc(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new Se(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new O(C.from(s), 0, 0), 1, !0));
}
function ot(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let c = i.depth - 1, u = t - 2; c > o; c--, u--) {
    let d = i.node(c), f = i.index(c);
    if (d.type.spec.isolating)
      return !1;
    let h = d.content.cutByIndex(f, d.childCount), p = r && r[u + 1];
    p && (h = h.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || d;
    if (!d.canReplace(f + 1, d.childCount) || !m.type.validContent(h))
      return !1;
  }
  let l = i.indexAfter(o), a = r && r[0];
  return i.node(o).canReplaceWith(l, l, a ? a.type : i.node(o + 1).type);
}
function Uc(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = C.empty, s = C.empty;
  for (let l = i.depth, a = i.depth - t, c = t - 1; l > a; l--, c--) {
    o = C.from(i.node(l).copy(o));
    let u = r && r[c];
    s = C.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new we(e, e, new O(o.append(s), t, t), !0));
}
function Dt(n, e) {
  let t = n.resolve(e), r = t.index();
  return Ds(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function Xc(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function Ds(n, e) {
  return !!(n && e && !n.isLeaf && Xc(n, e));
}
function yr(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && Ds(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function Gc(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", d = !!s.contentMatch.matchType(i);
    u && !d ? r = !1 : !u && d && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    Os(n, u.node(), u.before(), l);
  }
  s.inlineContent && yi(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let a = n.mapping.slice(l), c = a.map(e - t);
  if (n.step(new we(c, a.map(e + t, -1), O.empty, !0)), r === !0) {
    let u = n.doc.resolve(c);
    Is(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function Qc(n, e, t) {
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
function Zc(n, e, t) {
  let r = n.resolve(e);
  if (!t.content.size)
    return e;
  let i = t.content;
  for (let o = 0; o < t.openStart; o++)
    i = i.firstChild.content;
  for (let o = 1; o <= (t.openStart == 0 && t.size ? 2 : 1); o++)
    for (let s = r.depth; s >= 0; s--) {
      let l = s == r.depth ? 0 : r.pos <= (r.start(s + 1) + r.end(s + 1)) / 2 ? -1 : 1, a = r.index(s) + (l > 0 ? 1 : 0), c = r.node(s), u = !1;
      if (o == 1)
        u = c.canReplace(a, a, i);
      else {
        let d = c.contentMatchAt(a).findWrapping(i.firstChild.type);
        u = d && c.canReplaceWith(a, a, d[0]);
      }
      if (u)
        return l == 0 ? r.pos : l < 0 ? r.before(s + 1) : r.after(s + 1);
    }
  return null;
}
function xr(n, e, t = e, r = O.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return $s(i, o, r) ? new we(e, t, r) : new eu(i, o, r).fit();
}
function $s(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class eu {
  constructor(e, t, r) {
    this.$from = e, this.$to = t, this.unplaced = r, this.frontier = [], this.placed = C.empty;
    for (let i = 0; i <= e.depth; i++) {
      let o = e.node(i);
      this.frontier.push({
        type: o.type,
        match: o.contentMatchAt(e.indexAfter(i))
      });
    }
    for (let i = e.depth; i > 0; i--)
      this.placed = C.from(e.node(i).copy(this.placed));
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
    let a = new O(o, s, l);
    return e > -1 ? new Se(r.pos, e, this.$to.pos, this.$to.end(), a, t) : a.size || r.pos != this.$to.pos ? new we(r.pos, i.pos, a) : null;
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
        r ? (o = Ar(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: a, match: c } = this.frontier[l], u, d = null;
          if (t == 1 && (s ? c.matchType(s.type) || (d = c.fillBefore(C.from(s), !1)) : o && a.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: d };
          if (t == 2 && s && (u = c.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && c.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ar(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new O(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Ar(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new O(an(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new O(an(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, a = s.openStart - e, c = 0, u = [], { match: d, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      d = d.matchFragment(i);
    }
    let h = l.size + e - (s.content.size - s.openEnd);
    for (; c < l.childCount; ) {
      let m = l.child(c), y = d.matchType(m.type);
      if (!y)
        break;
      c++, (c > 1 || a == 0 || m.content.size) && (d = y, u.push(Ps(m.mark(f.allowedMarks(m.marks)), c == 1 ? a : 0, c == l.childCount ? h : -1)));
    }
    let p = c == l.childCount;
    p || (h = -1), this.placed = cn(this.placed, t, C.from(u)), this.frontier[t].match = d, p && h < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, y = l; m < h; m++) {
      let x = y.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), y = x.content;
    }
    this.unplaced = p ? e == 0 ? O.empty : new O(an(s.content, e - 1, 1), e - 1, h < 0 ? s.openEnd : e - 1) : new O(an(s.content, e, c), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !zr(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = zr(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: a, type: c } = this.frontier[l], u = zr(e, l, c, a, !0);
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
    t.fit.childCount && (this.placed = cn(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = cn(this.placed, this.depth, C.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(C.empty, !0);
    t.childCount && (this.placed = cn(this.placed, this.frontier.length, t));
  }
}
function an(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(an(n.firstChild.content, e - 1, t)));
}
function cn(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(cn(n.lastChild.content, e - 1, t)));
}
function Ar(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function Ps(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, Ps(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(C.empty, !0)))), n.copy(r);
}
function zr(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !tu(t, o.content, s) ? l : null;
}
function tu(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function nu(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function ru(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if ($s(i, o, r))
    return n.step(new we(e, t, r));
  let s = Bs(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, h = i.pos - 1; f > 0; f--, h--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == h && s.splice(1, 0, -f);
  }
  let a = s.indexOf(l), c = [], u = r.openStart;
  for (let f = r.content, h = 0; ; h++) {
    let p = f.firstChild;
    if (c.push(p), h == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let h = c[f], p = nu(h.type);
    if (p && !h.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !h.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let h = (f + u + 1) % (r.openStart + 1), p = c[h];
    if (p)
      for (let m = 0; m < s.length; m++) {
        let y = s[(m + a) % s.length], x = !0;
        y < 0 && (x = !1, y = -y);
        let w = i.node(y - 1), k = i.index(y - 1);
        if (w.canReplaceWith(k, k, p.type, p.marks))
          return n.replace(i.before(y), x ? o.after(y) : t, new O(Ls(r.content, 0, r.openStart, h), h, r.openEnd));
      }
  }
  let d = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > d)); f--) {
    let h = s[f];
    h < 0 || (e = i.before(h), t = o.after(h));
  }
}
function Ls(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(Ls(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(C.empty, !0));
  }
  return n;
}
function iu(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = Qc(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new O(C.from(r), 0, 0));
}
function ou(n, e, t) {
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
  let o = Bs(r, i);
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
function Bs(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class Yt extends Ie {
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
    return ve.fromReplace(e, this.pos, this.pos + 1, new O(C.from(i), 0, t.isLeaf ? 0 : 1));
  }
  getMap() {
    return Pe.empty;
  }
  invert(e) {
    return new Yt(this.pos, this.attr, e.nodeAt(this.pos).attrs[this.attr]);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new Yt(t.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(e, t) {
    if (typeof t.pos != "number" || typeof t.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new Yt(t.pos, t.attr, t.value);
  }
}
Ie.jsonID("attr", Yt);
class xn extends Ie {
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
    return Pe.empty;
  }
  invert(e) {
    return new xn(this.attr, e.attrs[this.attr]);
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
    return new xn(t.attr, t.value);
  }
}
Ie.jsonID("docAttr", xn);
let Gt = class extends Error {
};
Gt = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
Gt.prototype = Object.create(Error.prototype);
Gt.prototype.constructor = Gt;
Gt.prototype.name = "TransformError";
class su {
  /**
  Create a transform that starts with the given document.
  */
  constructor(e) {
    this.doc = e, this.steps = [], this.docs = [], this.mapping = new rr();
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
  replace(e, t = e, r = O.empty) {
    let i = xr(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new O(C.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, O.empty);
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
    return ru(this, e, t, r), this;
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
    return iu(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return ou(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Wc(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return Gc(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Vc(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Kc(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return Yc(this, e, t, r, i), this;
  }
  /**
  Set a single attribute on a given node to a new value.
  The `pos` addresses the document content. Use `setDocAttribute`
  to set attributes on the document itself.
  */
  setNodeAttribute(e, t, r) {
    return this.step(new Yt(e, t, r)), this;
  }
  /**
  Set a single attribute on the document to a new value.
  */
  setDocAttribute(e, t) {
    return this.step(new xn(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new pt(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof me)
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
    return Uc(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return Fc(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return _c(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return yi(this, e, t, r), this;
  }
}
const Rr = /* @__PURE__ */ Object.create(null);
class fe {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new lu(e.min(t), e.max(t))];
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
  replace(e, t = O.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: a, $to: c } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(a.pos), u.map(c.pos), l ? O.empty : t), l == 0 && uo(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(c, u) : (e.replaceRangeWith(c, u, t), uo(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new ue(e) : jt(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? jt(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : jt(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new We(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return jt(e, e, 0, 0, 1) || new We(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return jt(e, e, e.content.size, e.childCount, -1) || new We(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Rr[t.type];
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
    if (e in Rr)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Rr[e] = t, t.prototype.jsonID = e, t;
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
    return ue.between(this.$anchor, this.$head).getBookmark();
  }
}
fe.prototype.visible = !0;
class lu {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let ao = !1;
function co(n) {
  !ao && !n.parent.inlineContent && (ao = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class ue extends fe {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    co(e), co(t), super(e, t);
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
      return fe.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new ue(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = O.empty) {
    if (super.replace(e, t), t == O.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof ue && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new br(this.anchor, this.head);
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
    return new ue(e.resolve(t.anchor), e.resolve(t.head));
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
      let o = fe.findFrom(t, r, !0) || fe.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return fe.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (fe.findFrom(e, -r, !0) || fe.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new ue(e, t);
  }
}
fe.jsonID("text", ue);
class br {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new br(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return ue.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class J extends fe {
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
    return r ? fe.near(o) : new J(o);
  }
  content() {
    return new O(C.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof J && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new xi(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(e, t) {
    if (typeof t.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new J(e.resolve(t.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(e, t) {
    return new J(e.resolve(t));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(e) {
    return !e.isText && e.type.spec.selectable !== !1;
  }
}
J.prototype.visible = !1;
fe.jsonID("node", J);
class xi {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new br(r, r) : new xi(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && J.isSelectable(r) ? new J(t) : fe.near(t);
  }
}
class We extends fe {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = O.empty) {
    if (t == O.empty) {
      e.delete(0, e.doc.content.size);
      let r = fe.atStart(e.doc);
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
    return new We(e);
  }
  map(e) {
    return new We(e);
  }
  eq(e) {
    return e instanceof We;
  }
  getBookmark() {
    return au;
  }
}
fe.jsonID("all", We);
const au = {
  map() {
    return this;
  },
  resolve(n) {
    return new We(n);
  }
};
function jt(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return ue.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && J.isSelectable(l))
        return J.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let a = jt(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (a)
        return a;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function uo(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof we || i instanceof Se))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, a, c, u) => {
    s == null && (s = u);
  }), n.setSelection(fe.near(n.doc.resolve(s), t));
}
function fo(n, e) {
  return !e || !n ? n : n.bind(e);
}
class Hn {
  constructor(e, t, r) {
    this.name = e, this.init = fo(t.init, r), this.apply = fo(t.apply, r);
  }
}
new Hn("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new Hn("selection", {
  init(n, e) {
    return n.selection || fe.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new Hn("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new Hn("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const Fs = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function _s(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Hs = (n, e, t) => {
  let r = _s(n, t);
  if (!r)
    return !1;
  let i = bi(r);
  if (!i) {
    let s = r.blockRange(), l = s && nn(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Xs(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && (Qt(o, "end") || J.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = xr(n.doc, r.before(s), r.after(s), O.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let a = n.tr.step(l);
          a.setSelection(Qt(o, "end") ? fe.findFrom(a.doc.resolve(a.mapping.map(i.pos, -1)), -1) : J.create(a.doc, i.pos - o.nodeSize)), e(a.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, cu = (n, e, t) => {
  let r = _s(n, t);
  if (!r)
    return !1;
  let i = bi(r);
  return i ? Ws(n, i, e) : !1;
}, uu = (n, e, t) => {
  let r = qs(n, t);
  if (!r)
    return !1;
  let i = ki(r);
  return i ? Ws(n, i, e) : !1;
};
function Ws(n, e, t) {
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
  let c = xr(n.doc, o, a, O.empty);
  if (!c || c.from != o || c instanceof we && c.slice.size >= a - o)
    return !1;
  if (t) {
    let u = n.tr.step(c);
    u.setSelection(ue.create(u.doc, o)), t(u.scrollIntoView());
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
const js = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = bi(r);
  }
  let s = o && o.nodeBefore;
  return !s || !J.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(J.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function bi(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function qs(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Vs = (n, e, t) => {
  let r = qs(n, t);
  if (!r)
    return !1;
  let i = ki(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Xs(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && (Qt(o, "start") || J.isSelectable(o))) {
    let s = xr(n.doc, r.before(), r.after(), O.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection(Qt(o, "start") ? fe.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : J.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, Ks = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = ki(r);
  }
  let s = o && o.nodeAfter;
  return !s || !J.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(J.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function ki(n) {
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
const fu = (n, e) => {
  let t = n.selection, r = t instanceof J, i;
  if (r) {
    if (t.node.isTextblock || !Dt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = yr(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(J.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, du = (n, e) => {
  let t = n.selection, r;
  if (t instanceof J) {
    if (t.node.isTextblock || !Dt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = yr(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, hu = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && nn(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Js = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function wi(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const pu = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = wi(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), a = n.tr.replaceWith(l, l, s.createAndFill());
    a.setSelection(fe.near(a.doc.resolve(l), 1)), e(a.scrollIntoView());
  }
  return !0;
}, Ys = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof We || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = wi(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection(ue.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, Us = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (ot(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && nn(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function mu(n) {
  return (e, t) => {
    if (e.selection instanceof J && e.selection.node.isBlock) {
      let { $from: h } = e.selection;
      return !h.parentOffset || !ot(e.doc, h.pos) ? !1 : (t && t(e.tr.split(h.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof ue || e.selection instanceof We) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, a, c = !1, u = !1;
    for (let h = i.depth; ; h--)
      if (i.node(h).isBlock) {
        c = i.end(h) == i.pos + (i.depth - h), u = i.start(h) == i.pos - (i.depth - h), a = wi(i.node(h - 1).contentMatchAt(i.indexAfter(h - 1))), s.unshift(c && a ? { type: a } : null), l = h;
        break;
      } else {
        if (h == 1)
          return !1;
        s.unshift(null);
      }
    let d = i.pos, f = ot(r.doc, d, s.length, s);
    if (f || (s[0] = a ? { type: a } : null, f = ot(r.doc, d, s.length, s)), !f)
      return !1;
    if (r.split(d, s.length, s), !c && u && i.node(l).type != a) {
      let h = r.mapping.slice(o), p = h.map(i.before(l)), m = r.doc.resolve(p);
      a && i.node(l - 1).canReplaceWith(m.index(), m.index() + 1, a) && r.setNodeMarkup(h.map(i.before(l)), a);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const gu = mu(), yu = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(J.create(n.doc, i))), !0);
};
function xu(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || Dt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Xs(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, a = i.type.spec.isolating || o.type.spec.isolating;
  if (!a && xu(n, e, t))
    return !0;
  let c = !a && e.parent.canReplace(e.index(), e.index() + 1);
  if (c && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let h = e.pos + o.nodeSize, p = C.empty;
      for (let x = s.length - 1; x >= 0; x--)
        p = C.from(s[x].create(null, p));
      p = C.from(i.copy(p));
      let m = n.tr.step(new Se(e.pos - 1, h, e.pos, h, new O(p, 1, 0), s.length, !0)), y = m.doc.resolve(h + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && Dt(m.doc, y.pos) && m.join(y.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && a ? null : fe.findFrom(e, 1), d = u && u.$from.blockRange(u.$to), f = d && nn(d);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(d, f).scrollIntoView()), !0;
  if (c && Qt(o, "start", !0) && Qt(i, "end")) {
    let h = i, p = [];
    for (; p.push(h), !h.isTextblock; )
      h = h.lastChild;
    let m = o, y = 1;
    for (; !m.isTextblock; m = m.firstChild)
      y++;
    if (h.canReplace(h.childCount, h.childCount, m.content)) {
      if (t) {
        let x = C.empty;
        for (let k = p.length - 1; k >= 0; k--)
          x = C.from(p[k].copy(x));
        let w = n.tr.step(new Se(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new O(x, p.length, 0), 0, !0));
        t(w.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Gs(n) {
  return function(e, t) {
    let r = e.selection, i = n < 0 ? r.$from : r.$to, o = i.depth;
    for (; i.node(o).isInline; ) {
      if (!o)
        return !1;
      o--;
    }
    return i.node(o).isTextblock ? (t && t(e.tr.setSelection(ue.create(e.doc, n < 0 ? i.start(o) : i.end(o)))), !0) : !1;
  };
}
const bu = Gs(-1), ku = Gs(1);
function wu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && Rs(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function ho(n, e = null) {
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
            let u = t.doc.resolve(c), d = u.index();
            i = u.parent.canReplaceWith(d, d + 1, n);
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
function vi(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
vi(Fs, Hs, js);
vi(Fs, Vs, Ks);
vi(Js, Ys, Us, gu);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function vu(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Su(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Su(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let a = s.resolve(e.start - 2);
    o = new tr(a, a, e.depth), e.endIndex < e.parent.childCount && (e = new tr(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = Rs(o, t, r, e);
  return l ? (n && Cu(n, e, l, i, t), !0) : !1;
}
function Cu(n, e, t, r, i) {
  let o = C.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = C.from(t[u].type.create(t[u].attrs, o));
  n.step(new Se(e.start - (r ? 2 : 0), e.end, e.start, e.end, new O(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, a = e.start + t.length - (r ? 2 : 0), c = e.parent;
  for (let u = e.startIndex, d = e.endIndex, f = !0; u < d; u++, f = !1)
    !f && ot(n.doc, a, l) && (n.split(a, l), a += 2 * l), a += c.child(u).nodeSize;
  return n;
}
function Tu(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Eu(e, t, n, o) : Nu(e, t, o) : !0 : !1;
  };
}
function Eu(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new Se(o - 1, s, o, s, new O(C.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new tr(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = nn(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let a = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return Dt(i.doc, a.pos) && a.nodeBefore.type == a.nodeAfter.type && i.join(a.pos), e(i.scrollIntoView()), !0;
}
function Nu(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let h = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    h -= i.child(p).nodeSize, r.delete(h - 1, h + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, a = t.endIndex == i.childCount, c = o.node(-1), u = o.index(-1);
  if (!c.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(a ? C.empty : C.from(i))))
    return !1;
  let d = o.pos, f = d + s.nodeSize;
  return r.step(new Se(d - (l ? 1 : 0), f + (a ? 1 : 0), d + 1, f - 1, new O((l ? C.empty : C.from(i.copy(C.empty))).append(a ? C.empty : C.from(i.copy(C.empty))), l ? 0 : 1, a ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function Mu(n) {
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
      let c = a.lastChild && a.lastChild.type == l.type, u = C.from(c ? n.create() : null), d = new O(C.from(n.create(null, C.from(l.type.create(null, u)))), c ? 3 : 1, 0), f = o.start, h = o.end;
      t(e.tr.step(new Se(f - (c ? 3 : 1), h, f, h, d, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
const $t = function(n) {
  for (var e = 0; ; e++)
    if (n = n.previousSibling, !n)
      return e;
}, Qs = function(n, e, t, r) {
  return t && (po(n, e, t, r, -1) || po(n, e, t, r, 1));
}, Au = /^(img|br|input|textarea|hr)$/i;
function po(n, e, t, r, i) {
  for (var o; ; ) {
    if (n == t && e == r)
      return !0;
    if (e == (i < 0 ? 0 : ir(n))) {
      let s = n.parentNode;
      if (!s || s.nodeType != 1 || Si(n) || Au.test(n.nodeName) || n.contentEditable == "false")
        return !1;
      e = $t(n) + (i < 0 ? 0 : 1), n = s;
    } else if (n.nodeType == 1) {
      let s = n.childNodes[e + (i < 0 ? -1 : 0)];
      if (s.nodeType == 1 && s.contentEditable == "false")
        if (!((o = s.pmViewDesc) === null || o === void 0) && o.ignoreForSelection)
          e += i;
        else
          return !1;
      else
        n = s, e = i < 0 ? ir(n) : 0;
    } else
      return !1;
  }
}
function ir(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function zu(n, e, t) {
  for (let r = e == 0, i = e == ir(n); r || i; ) {
    if (n == t)
      return !0;
    let o = $t(n);
    if (n = n.parentNode, !n)
      return !1;
    r = r && o == 0, i = i && o == ir(n);
  }
}
function Si(n) {
  let e;
  for (let t = n; t && !(e = t.pmViewDesc); t = t.parentNode)
    ;
  return e && e.node && e.node.isBlock && (e.dom == n || e.contentDOM == n);
}
const Zs = function(n) {
  return n.focusNode && Qs(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset);
};
function el(n, e) {
  let t = document.createEvent("Event");
  return t.initEvent("keydown", !0, !0), t.keyCode = n, t.key = t.code = e, t;
}
const Qe = typeof navigator < "u" ? navigator : null, mo = typeof document < "u" ? document : null, gt = Qe && Qe.userAgent || "", Jr = /Edge\/(\d+)/.exec(gt), tl = /MSIE \d/.exec(gt), Yr = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(gt), En = !!(tl || Yr || Jr), nl = tl ? document.documentMode : Yr ? +Yr[1] : Jr ? +Jr[1] : 0, kr = !En && /gecko\/(\d+)/i.test(gt);
kr && +(/Firefox\/(\d+)/.exec(gt) || [0, 0])[1];
const Ur = !En && /Chrome\/(\d+)/.exec(gt), yt = !!Ur, rl = Ur ? +Ur[1] : 0, Pt = !En && !!Qe && /Apple Computer/.test(Qe.vendor), Ci = Pt && (/Mobile\/\w+/.test(gt) || !!Qe && Qe.maxTouchPoints > 2), _e = Ci || (Qe ? /Mac/.test(Qe.platform) : !1), il = Qe ? /Win/.test(Qe.platform) : !1, Nn = /Android \d/.test(gt), Ti = !!mo && "webkitFontSmoothing" in mo.documentElement.style, Ru = Ti ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1] : 0;
function Iu(n, e = null) {
  let t = n.domSelectionRange(), r = n.state.doc;
  if (!t.focusNode)
    return null;
  let i = n.docView.nearestDesc(t.focusNode), o = i && i.size == 0, s = n.docView.posFromDOM(t.focusNode, t.focusOffset, 1);
  if (s < 0)
    return null;
  let l = r.resolve(s), a, c;
  if (Zs(t)) {
    for (a = s; i && !i.node; )
      i = i.parent;
    let d = i.node;
    if (i && d.isAtom && J.isSelectable(d) && i.parent && !(d.isInline && zu(t.focusNode, t.focusOffset, i.dom))) {
      let f = i.posBefore;
      c = new J(s == f ? l : r.resolve(f));
    }
  } else {
    if (t instanceof n.dom.ownerDocument.defaultView.Selection && t.rangeCount > 1) {
      let d = s, f = s;
      for (let h = 0; h < t.rangeCount; h++) {
        let p = t.getRangeAt(h);
        d = Math.min(d, n.docView.posFromDOM(p.startContainer, p.startOffset, 1)), f = Math.max(f, n.docView.posFromDOM(p.endContainer, p.endOffset, -1));
      }
      if (d < 0)
        return null;
      [a, s] = f == n.state.selection.anchor ? [f, d] : [d, f], l = r.resolve(s);
    } else
      a = n.docView.posFromDOM(t.anchorNode, t.anchorOffset, 1);
    if (a < 0)
      return null;
  }
  let u = r.resolve(a);
  if (!c) {
    let d = e == "pointer" || n.state.selection.head < l.pos && !o ? 1 : -1;
    c = sl(n, u, l, d);
  }
  return c;
}
function ol(n) {
  return n.editable ? n.hasFocus() : Pu(n) && document.activeElement && document.activeElement.contains(n.dom);
}
function Ei(n, e = !1) {
  let t = n.state.selection;
  if ($u(n, t), !ol(n))
    return;
  let r = n.input.mouseDown;
  if (!e && yt && r) {
    let i = n.domSelectionRange(), o = n.domObserver.currentSelection;
    if (i.anchorNode && o.anchorNode && Qs(i.anchorNode, i.anchorOffset, o.anchorNode, o.anchorOffset) && r.delaySelUpdate()) {
      n.domObserver.setCurSelection();
      return;
    }
  }
  if (n.domObserver.disconnectSelection(), n.cursorWrapper)
    Du(n);
  else {
    let { anchor: i, head: o } = t, s, l;
    go && !(t instanceof ue) && (t.$from.parent.inlineContent || (s = yo(n, t.from)), !t.empty && !t.$from.parent.inlineContent && (l = yo(n, t.to))), n.docView.setSelection(i, o, n, e), go && (s && xo(s), l && xo(l)), t.visible ? n.dom.classList.remove("ProseMirror-hideselection") : (n.dom.classList.add("ProseMirror-hideselection"), "onselectionchange" in document && Ou(n));
  }
  n.domObserver.setCurSelection(), n.domObserver.connectSelection();
}
const go = Pt || yt && rl < 63;
function yo(n, e) {
  let { node: t, offset: r } = n.docView.domFromPos(e, 0), i = r < t.childNodes.length ? t.childNodes[r] : null, o = r ? t.childNodes[r - 1] : null;
  if (Pt && i && i.contentEditable == "false")
    return Ir(i);
  if ((!i || i.contentEditable == "false") && (!o || o.contentEditable == "false")) {
    if (i)
      return Ir(i);
    if (o)
      return Ir(o);
  }
}
function Ir(n) {
  return n.contentEditable = "true", Pt && n.draggable && (n.draggable = !1, n.wasDraggable = !0), n;
}
function xo(n) {
  n.contentEditable = "false", n.wasDraggable && (n.draggable = !0, n.wasDraggable = null);
}
function Ou(n) {
  let e = n.dom.ownerDocument;
  e.removeEventListener("selectionchange", n.input.hideSelectionGuard);
  let t = n.domSelectionRange(), r = t.anchorNode, i = t.anchorOffset;
  e.addEventListener("selectionchange", n.input.hideSelectionGuard = () => {
    (t.anchorNode != r || t.anchorOffset != i) && (e.removeEventListener("selectionchange", n.input.hideSelectionGuard), setTimeout(() => {
      (!ol(n) || n.state.selection.visible) && n.dom.classList.remove("ProseMirror-hideselection");
    }, 20));
  });
}
function Du(n) {
  let e = n.domSelection();
  if (!e)
    return;
  let t = n.cursorWrapper.dom, r = t.nodeName == "IMG";
  r ? e.collapse(t.parentNode, $t(t) + 1) : e.collapse(t, 0), !r && !n.state.selection.visible && En && nl <= 11 && (t.disabled = !0, t.disabled = !1);
}
function $u(n, e) {
  if (e instanceof J) {
    let t = n.docView.descAt(e.from);
    t != n.lastSelectedViewDesc && (bo(n), t && t.selectNode(), n.lastSelectedViewDesc = t);
  } else
    bo(n);
}
function bo(n) {
  n.lastSelectedViewDesc && (n.lastSelectedViewDesc.parent && n.lastSelectedViewDesc.deselectNode(), n.lastSelectedViewDesc = void 0);
}
function sl(n, e, t, r) {
  return n.someProp("createSelectionBetween", (i) => i(n, e, t)) || ue.between(e, t, r);
}
function Pu(n) {
  let e = n.domSelectionRange();
  if (!e.anchorNode)
    return !1;
  try {
    return n.dom.contains(e.anchorNode.nodeType == 3 ? e.anchorNode.parentNode : e.anchorNode) && (n.editable || n.dom.contains(e.focusNode.nodeType == 3 ? e.focusNode.parentNode : e.focusNode));
  } catch {
    return !1;
  }
}
function Xr(n, e) {
  let { $anchor: t, $head: r } = n.selection, i = e > 0 ? t.max(r) : t.min(r), o = i.parent.inlineContent ? i.depth ? n.doc.resolve(e > 0 ? i.after() : i.before()) : null : i;
  return o && fe.findFrom(o, e);
}
function dt(n, e) {
  return n.dispatch(n.state.tr.setSelection(e).scrollIntoView()), !0;
}
function ko(n, e, t) {
  let r = n.state.selection;
  if (r instanceof ue)
    if (t.indexOf("s") > -1) {
      let { $head: i } = r, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter;
      if (!o || o.isText || !o.isLeaf)
        return !1;
      let s = n.state.doc.resolve(i.pos + o.nodeSize * (e < 0 ? -1 : 1));
      return dt(n, new ue(r.$anchor, s));
    } else if (r.empty) {
      if (n.endOfTextblock(e > 0 ? "forward" : "backward")) {
        let i = Xr(n.state, e);
        return i && i instanceof J ? dt(n, i) : !1;
      } else if (!(_e && t.indexOf("m") > -1)) {
        let i = r.$head, o = i.textOffset ? null : e < 0 ? i.nodeBefore : i.nodeAfter, s;
        if (!o || o.isText)
          return !1;
        let l = e < 0 ? i.pos - o.nodeSize : i.pos;
        return o.isAtom || (s = n.docView.descAt(l)) && !s.contentDOM ? J.isSelectable(o) ? dt(n, new J(e < 0 ? n.state.doc.resolve(i.pos - o.nodeSize) : i)) : Ti ? dt(n, new ue(n.state.doc.resolve(e < 0 ? l : l + o.nodeSize))) : !1 : !1;
      }
    } else return !1;
  else {
    if (r instanceof J && r.node.isInline)
      return dt(n, new ue(e > 0 ? r.$to : r.$from));
    {
      let i = Xr(n.state, e);
      return i ? dt(n, i) : !1;
    }
  }
}
function or(n) {
  return n.nodeType == 3 ? n.nodeValue.length : n.childNodes.length;
}
function dn(n, e) {
  let t = n.pmViewDesc;
  return t && t.size == 0 && (e < 0 || n.nextSibling || n.nodeName != "BR");
}
function Ht(n, e) {
  return e < 0 ? Lu(n) : Bu(n);
}
function Lu(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i, o, s = !1;
  for (kr && t.nodeType == 1 && r < or(t) && dn(t.childNodes[r], -1) && (s = !0); ; )
    if (r > 0) {
      if (t.nodeType != 1)
        break;
      {
        let l = t.childNodes[r - 1];
        if (dn(l, -1))
          i = t, o = --r;
        else if (l.nodeType == 3)
          t = l, r = t.nodeValue.length;
        else
          break;
      }
    } else {
      if (ll(t))
        break;
      {
        let l = t.previousSibling;
        for (; l && dn(l, -1); )
          i = t.parentNode, o = $t(l), l = l.previousSibling;
        if (l)
          t = l, r = or(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = 0;
        }
      }
    }
  s ? Gr(n, t, r) : i && Gr(n, i, o);
}
function Bu(n) {
  let e = n.domSelectionRange(), t = e.focusNode, r = e.focusOffset;
  if (!t)
    return;
  let i = or(t), o, s;
  for (; ; )
    if (r < i) {
      if (t.nodeType != 1)
        break;
      let l = t.childNodes[r];
      if (dn(l, 1))
        o = t, s = ++r;
      else
        break;
    } else {
      if (ll(t))
        break;
      {
        let l = t.nextSibling;
        for (; l && dn(l, 1); )
          o = l.parentNode, s = $t(l) + 1, l = l.nextSibling;
        if (l)
          t = l, r = 0, i = or(t);
        else {
          if (t = t.parentNode, t == n.dom)
            break;
          r = i = 0;
        }
      }
    }
  o && Gr(n, o, s);
}
function ll(n) {
  let e = n.pmViewDesc;
  return e && e.node && e.node.isBlock;
}
function Fu(n, e) {
  for (; n && e == n.childNodes.length && !Si(n); )
    e = $t(n) + 1, n = n.parentNode;
  for (; n && e < n.childNodes.length; ) {
    let t = n.childNodes[e];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = 0;
  }
}
function _u(n, e) {
  for (; n && !e && !Si(n); )
    e = $t(n), n = n.parentNode;
  for (; n && e; ) {
    let t = n.childNodes[e - 1];
    if (t.nodeType == 3)
      return t;
    if (t.nodeType == 1 && t.contentEditable == "false")
      break;
    n = t, e = n.childNodes.length;
  }
}
function Gr(n, e, t) {
  if (e.nodeType != 3) {
    let o, s;
    (s = Fu(e, t)) ? (e = s, t = 0) : (o = _u(e, t)) && (e = o, t = o.nodeValue.length);
  }
  let r = n.domSelection();
  if (!r)
    return;
  if (Zs(r)) {
    let o = document.createRange();
    o.setEnd(e, t), o.setStart(e, t), r.removeAllRanges(), r.addRange(o);
  } else r.extend && r.extend(e, t);
  n.domObserver.setCurSelection();
  let { state: i } = n;
  setTimeout(() => {
    n.state == i && Ei(n);
  }, 50);
}
function wo(n, e) {
  let t = n.state.doc.resolve(e);
  if (!(yt || il) && t.parent.inlineContent) {
    let i = n.coordsAtPos(e);
    if (e > t.start()) {
      let o = n.coordsAtPos(e - 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left < i.left ? "ltr" : "rtl";
    }
    if (e < t.end()) {
      let o = n.coordsAtPos(e + 1), s = (o.top + o.bottom) / 2;
      if (s > i.top && s < i.bottom && Math.abs(o.left - i.left) > 1)
        return o.left > i.left ? "ltr" : "rtl";
    }
  }
  return getComputedStyle(n.dom).direction == "rtl" ? "rtl" : "ltr";
}
function vo(n, e, t) {
  let r = n.state.selection;
  if (r instanceof ue && !r.empty || t.indexOf("s") > -1 || _e && t.indexOf("m") > -1)
    return !1;
  let { $from: i, $to: o } = r;
  if (!i.parent.inlineContent || n.endOfTextblock(e < 0 ? "up" : "down")) {
    let s = Xr(n.state, e);
    if (s && s instanceof J)
      return dt(n, s);
  }
  if (!i.parent.inlineContent) {
    let s = e < 0 ? i : o, l = r instanceof We ? fe.near(s, e) : fe.findFrom(s, e);
    return l ? dt(n, l) : !1;
  }
  return !1;
}
function So(n, e) {
  if (!(n.state.selection instanceof ue))
    return !0;
  let { $head: t, $anchor: r, empty: i } = n.state.selection;
  if (!t.sameParent(r))
    return !0;
  if (!i)
    return !1;
  if (n.endOfTextblock(e > 0 ? "forward" : "backward"))
    return !0;
  let o = !t.textOffset && (e < 0 ? t.nodeBefore : t.nodeAfter);
  if (o && !o.isText) {
    let s = n.state.tr;
    return e < 0 ? s.delete(t.pos - o.nodeSize, t.pos) : s.delete(t.pos, t.pos + o.nodeSize), n.dispatch(s), !0;
  }
  return !1;
}
function Co(n, e, t) {
  n.domObserver.stop(), e.contentEditable = t, n.domObserver.start();
}
function Hu(n) {
  if (!Pt || n.state.selection.$head.parentOffset > 0)
    return !1;
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (e && e.nodeType == 1 && t == 0 && e.firstChild && e.firstChild.contentEditable == "false") {
    let r = e.firstChild;
    Co(n, r, "true"), setTimeout(() => Co(n, r, "false"), 20);
  }
  return !1;
}
function Wu(n) {
  let e = "";
  return n.ctrlKey && (e += "c"), n.metaKey && (e += "m"), n.altKey && (e += "a"), n.shiftKey && (e += "s"), e;
}
function ju(n, e) {
  let t = e.keyCode, r = Wu(e);
  if (t == 8 || _e && t == 72 && r == "c")
    return So(n, -1) || Ht(n, -1);
  if (t == 46 && !e.shiftKey || _e && t == 68 && r == "c")
    return So(n, 1) || Ht(n, 1);
  if (t == 13 || t == 27)
    return !0;
  if (t == 37 || _e && t == 66 && r == "c") {
    let i = t == 37 ? wo(n, n.state.selection.from) == "ltr" ? -1 : 1 : -1;
    return ko(n, i, r) || Ht(n, i);
  } else if (t == 39 || _e && t == 70 && r == "c") {
    let i = t == 39 ? wo(n, n.state.selection.from) == "ltr" ? 1 : -1 : 1;
    return ko(n, i, r) || Ht(n, i);
  } else {
    if (t == 38 || _e && t == 80 && r == "c")
      return vo(n, -1, r) || Ht(n, -1);
    if (t == 40 || _e && t == 78 && r == "c")
      return Hu(n) || vo(n, 1, r) || Ht(n, 1);
    if (r == (_e ? "m" : "c") && (t == 66 || t == 73 || t == 89 || t == 90))
      return !0;
  }
  return !1;
}
function al(n, e) {
  n.someProp("transformCopied", (h) => {
    e = h(e, n);
  });
  let t = [], { content: r, openStart: i, openEnd: o } = e;
  for (; i > 1 && o > 1 && r.childCount == 1 && r.firstChild.childCount == 1; ) {
    i--, o--;
    let h = r.firstChild;
    t.push(h.type.name, h.attrs != h.type.defaultAttrs ? h.attrs : null), r = h.content;
  }
  let s = n.someProp("clipboardSerializer") || gr.fromSchema(n.state.schema), l = pl(), a = l.createElement("div");
  a.appendChild(s.serializeFragment(r, { document: l }));
  let c = a.firstChild, u, d = 0;
  for (; c && c.nodeType == 1 && (u = hl[c.nodeName.toLowerCase()]); ) {
    for (let h = u.length - 1; h >= 0; h--) {
      let p = l.createElement(u[h]);
      for (; a.firstChild; )
        p.appendChild(a.firstChild);
      a.appendChild(p), d++;
    }
    c = a.firstChild;
  }
  c && c.nodeType == 1 && c.setAttribute("data-pm-slice", `${i} ${o}${d ? ` -${d}` : ""} ${JSON.stringify(t)}`);
  let f = n.someProp("clipboardTextSerializer", (h) => h(e, n)) || e.content.textBetween(0, e.content.size, `

`);
  return { dom: a, text: f, slice: e };
}
function cl(n, e, t, r, i) {
  let o = i.parent.type.spec.code, s, l;
  if (!t && !e)
    return null;
  let a = !!e && (r || o || !t);
  if (a) {
    if (n.someProp("transformPastedText", (f) => {
      e = f(e, o || r, n);
    }), o)
      return l = new O(C.from(n.state.schema.text(e.replace(/\r\n?/g, `
`))), 0, 0), n.someProp("transformPasted", (f) => {
        l = f(l, n, !0);
      }), l;
    let d = n.someProp("clipboardTextParser", (f) => f(e, i, r, n));
    if (d)
      l = d;
    else {
      let f = i.marks(), { schema: h } = n.state, p = gr.fromSchema(h);
      s = document.createElement("div"), e.split(/(?:\r\n?|\n)+/).forEach((m) => {
        let y = s.appendChild(document.createElement("p"));
        m && y.appendChild(p.serializeNode(h.text(m, f)));
      });
    }
  } else
    n.someProp("transformPastedHTML", (d) => {
      t = d(t, n);
    }), s = Ju(t), Ti && Yu(s);
  let c = s && s.querySelector("[data-pm-slice]"), u = c && /^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(c.getAttribute("data-pm-slice") || "");
  if (u && u[3])
    for (let d = +u[3]; d > 0; d--) {
      let f = s.firstChild;
      for (; f && f.nodeType != 1; )
        f = f.nextSibling;
      if (!f)
        break;
      s = f;
    }
  if (l || (l = (n.someProp("clipboardParser") || n.someProp("domParser") || Mt.fromSchema(n.state.schema)).parseSlice(s, {
    preserveWhitespace: !!(a || u),
    context: i,
    ruleFromNode(f) {
      return f.nodeName == "BR" && !f.nextSibling && f.parentNode && !qu.test(f.parentNode.nodeName) ? { ignore: !0 } : null;
    }
  })), u)
    l = Uu(To(l, +u[1], +u[2]), u[4]);
  else if (l = O.maxOpen(Vu(l.content, i), !0), l.openStart || l.openEnd) {
    let d = 0, f = 0;
    for (let h = l.content.firstChild; d < l.openStart && !h.type.spec.isolating; d++, h = h.firstChild)
      ;
    for (let h = l.content.lastChild; f < l.openEnd && !h.type.spec.isolating; f++, h = h.lastChild)
      ;
    l = To(l, d, f);
  }
  return n.someProp("transformPasted", (d) => {
    l = d(l, n, a);
  }), l;
}
const qu = /^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i;
function Vu(n, e) {
  if (n.childCount < 2)
    return n;
  for (let t = e.depth; t >= 0; t--) {
    let i = e.node(t).contentMatchAt(e.index(t)), o, s = [];
    if (n.forEach((l) => {
      if (!s)
        return;
      let a = i.findWrapping(l.type), c;
      if (!a)
        return s = null;
      if (c = s.length && o.length && fl(a, o, l, s[s.length - 1], 0))
        s[s.length - 1] = c;
      else {
        s.length && (s[s.length - 1] = dl(s[s.length - 1], o.length));
        let u = ul(l, a);
        s.push(u), i = i.matchType(u.type), o = a;
      }
    }), s)
      return C.from(s);
  }
  return n;
}
function ul(n, e, t = 0) {
  for (let r = e.length - 1; r >= t; r--)
    n = e[r].create(null, C.from(n));
  return n;
}
function fl(n, e, t, r, i) {
  if (i < n.length && i < e.length && n[i] == e[i]) {
    let o = fl(n, e, t, r.lastChild, i + 1);
    if (o)
      return r.copy(r.content.replaceChild(r.childCount - 1, o));
    if (r.contentMatchAt(r.childCount).matchType(i == n.length - 1 ? t.type : n[i + 1]))
      return r.copy(r.content.append(C.from(ul(t, n, i + 1))));
  }
}
function dl(n, e) {
  if (e == 0)
    return n;
  let t = n.content.replaceChild(n.childCount - 1, dl(n.lastChild, e - 1)), r = n.contentMatchAt(n.childCount).fillBefore(C.empty, !0);
  return n.copy(t.append(r));
}
function Qr(n, e, t, r, i, o) {
  let s = e < 0 ? n.firstChild : n.lastChild, l = s.content;
  return n.childCount > 1 && (o = 0), i < r - 1 && (l = Qr(l, e, t, r, i + 1, o)), i >= t && (l = e < 0 ? s.contentMatchAt(0).fillBefore(l, o <= i).append(l) : l.append(s.contentMatchAt(s.childCount).fillBefore(C.empty, !0))), n.replaceChild(e < 0 ? 0 : n.childCount - 1, s.copy(l));
}
function To(n, e, t) {
  return e < n.openStart && (n = new O(Qr(n.content, -1, e, n.openStart, 0, n.openEnd), e, n.openEnd)), t < n.openEnd && (n = new O(Qr(n.content, 1, t, n.openEnd, 0, 0), n.openStart, t)), n;
}
const hl = {
  thead: ["table"],
  tbody: ["table"],
  tfoot: ["table"],
  caption: ["table"],
  colgroup: ["table"],
  col: ["table", "colgroup"],
  tr: ["table", "tbody"],
  td: ["table", "tbody", "tr"],
  th: ["table", "tbody", "tr"]
};
function pl() {
  return document.implementation.createHTMLDocument("title");
}
let Or = null;
function Ku(n) {
  let e = window.trustedTypes;
  return e ? (Or || (Or = e.defaultPolicy || e.createPolicy("ProseMirrorClipboard", { createHTML: (t) => t })), Or.createHTML(n)) : n;
}
function Ju(n) {
  let e = /^(\s*<meta [^>]*>)*/.exec(n);
  e && (n = n.slice(e[0].length));
  let t = pl(), r = t.body, i = /<([a-z][^>\s]+)/i.exec(n), o;
  if ((o = i && hl[i[1].toLowerCase()]) && (n = o.map((s) => "<" + s + ">").join("") + n + o.map((s) => "</" + s + ">").reverse().join("")), r.innerHTML = Ku(n), o)
    for (let s = 0; s < o.length; s++)
      r = r.querySelector(o[s]) || r;
  for (let s = 0; s < t.styleSheets.length; s++) {
    let l = t.styleSheets[s];
    for (let a = 0; a < l.rules.length; a++) {
      let c = l.rules[a];
      if (c instanceof CSSStyleRule) {
        let u = r.querySelectorAll(c.selectorText);
        for (let d = 0; d < u.length; d++)
          u[d].style.cssText += c.style.cssText;
      }
    }
  }
  return r;
}
function Yu(n) {
  let e = n.querySelectorAll(yt ? "span:not([class]):not([style])" : "span.Apple-converted-space");
  for (let t = 0; t < e.length; t++) {
    let r = e[t];
    r.childNodes.length == 1 && r.textContent == " " && r.parentNode && r.parentNode.replaceChild(n.ownerDocument.createTextNode(" "), r);
  }
}
function Uu(n, e) {
  if (!n.size)
    return n;
  let t = n.content.firstChild.type.schema, r;
  try {
    r = JSON.parse(e);
  } catch {
    return n;
  }
  let { content: i, openStart: o, openEnd: s } = n;
  for (let l = r.length - 2; l >= 0; l -= 2) {
    let a = t.nodes[r[l]];
    if (!a || a.hasRequiredAttrs())
      break;
    i = C.from(a.create(r[l + 1], i)), o++, s++;
  }
  return new O(i, o, s);
}
const Ye = {}, Le = {};
function nt(n, e) {
  n.input.lastSelectionOrigin = e, n.input.lastSelectionTime = Date.now();
}
Le.keydown = (n, e) => {
  let t = e;
  if (n.input.shiftKey = t.keyCode == 16 || t.shiftKey, !xl(n) && (n.input.lastKeyCode = t.keyCode, n.input.lastKeyCodeTime = Date.now(), !(Nn && yt && t.keyCode == 13)))
    if (t.keyCode != 229 && n.domObserver.forceFlush(), Ci && t.keyCode == 13 && !t.ctrlKey && !t.altKey && !t.metaKey) {
      let r = Date.now();
      n.input.lastIOSEnter = r, n.input.lastIOSEnterFallbackTimeout = setTimeout(() => {
        n.input.lastIOSEnter == r && (n.someProp("handleKeyDown", (i) => i(n, el(13, "Enter"))), n.input.lastIOSEnter = 0);
      }, 200);
    } else n.someProp("handleKeyDown", (r) => r(n, t)) || ju(n, t) ? t.preventDefault() : nt(n, "key");
};
Le.keyup = (n, e) => {
  e.keyCode == 16 && (n.input.shiftKey = !1);
};
Le.keypress = (n, e) => {
  let t = e;
  if (xl(n) || !t.charCode || t.ctrlKey && !t.altKey || _e && t.metaKey)
    return;
  if (n.someProp("handleKeyPress", (i) => i(n, t))) {
    t.preventDefault();
    return;
  }
  let r = n.state.selection;
  if (!(r instanceof ue) || !r.$from.sameParent(r.$to)) {
    let i = String.fromCharCode(t.charCode), o = () => n.state.tr.insertText(i).scrollIntoView();
    !/[\r\n]/.test(i) && !n.someProp("handleTextInput", (s) => s(n, r.$from.pos, r.$to.pos, i, o)) && n.dispatch(o()), t.preventDefault();
  }
};
function Mn(n) {
  return { left: n.clientX, top: n.clientY };
}
function Xu(n, e) {
  let t = e.x - n.clientX, r = e.y - n.clientY;
  return t * t + r * r < 100;
}
function Ni(n, e, t, r, i) {
  if (r == -1)
    return !1;
  let o = n.state.doc.resolve(r);
  for (let s = o.depth + 1; s > 0; s--)
    if (n.someProp(e, (l) => s > o.depth ? l(n, t, o.nodeAfter, o.before(s), i, !0) : l(n, t, o.node(s), o.before(s), i, !1)))
      return !0;
  return !1;
}
function An(n, e, t) {
  if (n.focused || n.focus(), n.state.selection.eq(e))
    return;
  let r = n.state.tr.setSelection(e);
  r.setMeta("pointer", !0), n.dispatch(r);
}
function Gu(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.doc.resolve(e), r = t.nodeAfter;
  return r && r.isAtom && J.isSelectable(r) ? (An(n, new J(t)), !0) : !1;
}
function Qu(n, e) {
  if (e == -1)
    return !1;
  let t = n.state.selection, r, i;
  t instanceof J && (r = t.node);
  let o = n.state.doc.resolve(e);
  for (let s = o.depth + 1; s > 0; s--) {
    let l = s > o.depth ? o.nodeAfter : o.node(s);
    if (J.isSelectable(l)) {
      r && t.$from.depth > 0 && s >= t.$from.depth && o.before(t.$from.depth + 1) == t.$from.pos ? i = o.before(t.$from.depth) : i = o.before(s);
      break;
    }
  }
  return i != null ? (An(n, J.create(n.state.doc, i)), !0) : !1;
}
function Zu(n, e, t, r, i) {
  return Ni(n, "handleClickOn", e, t, r) || n.someProp("handleClick", (o) => o(n, e, r)) || (i ? Qu(n, t) : Gu(n, t));
}
function ef(n, e, t, r) {
  return Ni(n, "handleDoubleClickOn", e, t, r) || n.someProp("handleDoubleClick", (i) => i(n, e, r));
}
function tf(n, e, t, r) {
  return Ni(n, "handleTripleClickOn", e, t, r) || n.someProp("handleTripleClick", (i) => i(n, e, r)) || nf(n, t, r);
}
function nf(n, e, t) {
  if (t.button != 0)
    return !1;
  let r = ml(n, e, !0), i = n.state.doc;
  return r ? (An(n, r), r instanceof ue && i.eq(n.state.doc) && (n.input.mouseDown = new of(n, r)), !0) : !1;
}
function ml(n, e, t) {
  let r = n.state.doc;
  if (e == -1)
    return r.inlineContent ? ue.create(r, 0, r.content.size) : null;
  let i = r.resolve(e);
  for (let o = i.depth + 1; o > 0; o--) {
    let s = o > i.depth ? i.nodeAfter : i.node(o), l = i.before(o);
    if (s.inlineContent)
      return ue.create(r, l + 1, l + 1 + s.content.size);
    if (t && J.isSelectable(s))
      return J.create(r, l);
  }
  return null;
}
function Mi(n) {
  return sr(n);
}
const gl = _e ? "metaKey" : "ctrlKey";
Ye.mousedown = (n, e) => {
  let t = e;
  n.input.shiftKey = t.shiftKey;
  let r = Mi(n), i = Date.now(), o = "singleClick";
  i - n.input.lastClick.time < 500 && Xu(t, n.input.lastClick) && !t[gl] && n.input.lastClick.button == t.button && (n.input.lastClick.type == "singleClick" ? o = "doubleClick" : n.input.lastClick.type == "doubleClick" && (o = "tripleClick")), n.input.lastClick = { time: i, x: t.clientX, y: t.clientY, type: o, button: t.button }, n.input.mouseDown && n.input.mouseDown.done();
  let s = n.posAtCoords(Mn(t));
  s && (o == "singleClick" ? n.input.mouseDown = new rf(n, s, t, !!r) : (o == "doubleClick" ? ef : tf)(n, s.pos, s.inside, t) ? t.preventDefault() : nt(n, "pointer"));
};
class yl {
  constructor(e) {
    this.view = e, this.mightDrag = null, e.root.addEventListener("mouseup", this.up = this.up.bind(this)), e.root.addEventListener("mousemove", this.move = this.move.bind(this));
  }
  up(e) {
    this.done();
  }
  move(e) {
    e.buttons == 0 && this.done();
  }
  done() {
    this.view.root.removeEventListener("mouseup", this.up), this.view.root.removeEventListener("mousemove", this.move), this.view.input.mouseDown == this && (this.view.input.mouseDown = null);
  }
  delaySelUpdate() {
    return !1;
  }
}
class rf extends yl {
  constructor(e, t, r, i) {
    super(e), this.pos = t, this.event = r, this.flushed = i, this.delayedSelectionSync = !1, this.startDoc = e.state.doc, this.selectNode = !!r[gl], this.allowDefault = r.shiftKey;
    let o, s;
    if (t.inside > -1)
      o = e.state.doc.nodeAt(t.inside), s = t.inside;
    else {
      let u = e.state.doc.resolve(t.pos);
      o = u.parent, s = u.depth ? u.before() : 0;
    }
    const l = i ? null : r.target, a = l ? e.docView.nearestDesc(l, !0) : null;
    this.target = a && a.nodeDOM.nodeType == 1 ? a.nodeDOM : null;
    let { selection: c } = e.state;
    r.button == 0 && (o.type.spec.draggable && o.type.spec.selectable !== !1 || c instanceof J && c.from <= s && c.to > s) && (this.mightDrag = {
      node: o,
      pos: s,
      addAttr: !!(this.target && !this.target.draggable),
      setUneditable: !!(this.target && kr && !this.target.hasAttribute("contentEditable"))
    }), this.target && this.mightDrag && (this.mightDrag.addAttr || this.mightDrag.setUneditable) && (this.view.domObserver.stop(), this.mightDrag.addAttr && (this.target.draggable = !0), this.mightDrag.setUneditable && setTimeout(() => {
      this.view.input.mouseDown == this && this.target.setAttribute("contentEditable", "false");
    }, 20), this.view.domObserver.start()), nt(e, "pointer");
  }
  done() {
    super.done(), this.mightDrag && this.target && (this.view.domObserver.stop(), this.mightDrag.addAttr && this.target.removeAttribute("draggable"), this.mightDrag.setUneditable && this.target.removeAttribute("contentEditable"), this.view.domObserver.start()), this.delayedSelectionSync && setTimeout(() => {
      this.view.isDestroyed || Ei(this.view);
    });
  }
  up(e) {
    if (this.done(), !this.view.dom.contains(e.target))
      return;
    let t = this.pos;
    this.view.state.doc != this.startDoc && (t = this.view.posAtCoords(Mn(e))), this.updateAllowDefault(e), this.allowDefault || !t ? nt(this.view, "pointer") : Zu(this.view, t.pos, t.inside, e, this.selectNode) ? e.preventDefault() : e.button == 0 && (this.flushed || // Safari ignores clicks on draggable elements
    Pt && this.mightDrag && !this.mightDrag.node.isAtom || // Chrome will sometimes treat a node selection as a
    // cursor, but still report that the node is selected
    // when asked through getSelection. You'll then get a
    // situation where clicking at the point where that
    // (hidden) cursor is doesn't change the selection, and
    // thus doesn't get a reaction from ProseMirror. This
    // works around that.
    yt && !this.view.state.selection.visible && Math.min(Math.abs(t.pos - this.view.state.selection.from), Math.abs(t.pos - this.view.state.selection.to)) <= 2) ? (An(this.view, fe.near(this.view.state.doc.resolve(t.pos))), e.preventDefault()) : nt(this.view, "pointer");
  }
  move(e) {
    this.updateAllowDefault(e), nt(this.view, "pointer"), super.move(e);
  }
  updateAllowDefault(e) {
    !this.allowDefault && (Math.abs(this.event.x - e.clientX) > 4 || Math.abs(this.event.y - e.clientY) > 4) && (this.allowDefault = !0);
  }
  delaySelUpdate() {
    return this.allowDefault ? (this.delayedSelectionSync = !0, !0) : !1;
  }
}
class of extends yl {
  constructor(e, t) {
    super(e), this.startSelection = t, this.startDoc = e.state.doc;
  }
  move(e) {
    if (e.buttons == 0 || this.view.isDestroyed || !this.view.state.doc.eq(this.startDoc)) {
      this.done();
      return;
    }
    e.preventDefault(), nt(this.view, "pointer");
    let t = this.view.posAtCoords(Mn(e)), r = t && ml(this.view, t.inside, !1);
    if (!r)
      return;
    let { doc: i } = this.view.state, o = this.startSelection, [s, l] = r.from < o.from ? [o.to, r.from] : [o.from, r.to];
    An(this.view, ue.create(i, s, l));
  }
}
Ye.touchstart = (n) => {
  n.input.lastTouch = Date.now(), Mi(n), nt(n, "pointer");
};
Ye.touchmove = (n) => {
  n.input.lastTouch = Date.now(), nt(n, "pointer");
};
Ye.contextmenu = (n) => Mi(n);
function xl(n, e) {
  return n.composing ? !0 : Pt && Math.abs(Date.now() - n.input.compositionEndedAt) < 500 ? (n.input.compositionEndedAt = -2e8, !0) : !1;
}
const sf = Nn ? 5e3 : -1;
Le.compositionstart = Le.compositionupdate = (n) => {
  if (!n.composing) {
    n.domObserver.flush();
    let { state: e } = n, t = e.selection.$to;
    if (e.selection instanceof ue && (e.storedMarks || !t.textOffset && t.parentOffset && t.nodeBefore.marks.some((r) => r.type.spec.inclusive === !1) || yt && il && lf(n)))
      n.markCursor = n.state.storedMarks || t.marks(), sr(n, !0), n.markCursor = null;
    else if (sr(n, !e.selection.empty), kr && e.selection.empty && t.parentOffset && !t.textOffset && t.nodeBefore.marks.length) {
      let r = n.domSelectionRange();
      for (let i = r.focusNode, o = r.focusOffset; i && i.nodeType == 1 && o != 0; ) {
        let s = o < 0 ? i.lastChild : i.childNodes[o - 1];
        if (!s)
          break;
        if (s.nodeType == 3) {
          let l = n.domSelection();
          l && l.collapse(s, s.nodeValue.length);
          break;
        } else
          i = s, o = -1;
      }
    }
    n.input.composing = !0;
  }
  bl(n, sf);
};
function lf(n) {
  let { focusNode: e, focusOffset: t } = n.domSelectionRange();
  if (!e || e.nodeType != 1 || t >= e.childNodes.length)
    return !1;
  let r = e.childNodes[t];
  return r.nodeType == 1 && r.contentEditable == "false";
}
Le.compositionend = (n, e) => {
  n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Date.now(), n.input.compositionPendingChanges = n.domObserver.pendingRecords().length ? n.input.compositionID : 0, n.input.compositionNode = null, n.input.badSafariComposition ? n.domObserver.forceFlush() : n.input.compositionPendingChanges && Promise.resolve().then(() => n.domObserver.flush()), n.input.compositionID++, bl(n, 20));
};
function bl(n, e) {
  clearTimeout(n.input.composingTimeout), e > -1 && (n.input.composingTimeout = setTimeout(() => sr(n), e));
}
function af(n) {
  for (n.composing && (n.input.composing = !1, n.input.compositionEndedAt = Date.now()); n.input.compositionNodes.length > 0; )
    n.input.compositionNodes.pop().markParentsDirty();
}
function sr(n, e = !1) {
  if (!(Nn && n.domObserver.flushingSoon >= 0)) {
    if (n.domObserver.forceFlush(), af(n), e || n.docView && n.docView.dirty) {
      let t = Iu(n), r = n.state.selection;
      return t && !t.eq(r) ? n.dispatch(n.state.tr.setSelection(t)) : (n.markCursor || e) && !r.$from.node(r.$from.sharedDepth(r.to)).inlineContent ? n.dispatch(n.state.tr.deleteSelection()) : n.updateState(n.state), !0;
    }
    return !1;
  }
}
function cf(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.dom.parentNode.appendChild(document.createElement("div"));
  t.appendChild(e), t.style.cssText = "position: fixed; left: -10000px; top: 10px";
  let r = getSelection(), i = document.createRange();
  i.selectNodeContents(e), n.dom.blur(), r.removeAllRanges(), r.addRange(i), setTimeout(() => {
    t.parentNode && t.parentNode.removeChild(t), n.focus();
  }, 50);
}
const bn = En && nl < 15 || Ci && Ru < 604;
Ye.copy = Le.cut = (n, e) => {
  let t = e, r = n.state.selection, i = t.type == "cut";
  if (r.empty)
    return;
  let o = bn ? null : t.clipboardData, s = r.content(), { dom: l, text: a } = al(n, s);
  o ? (t.preventDefault(), o.clearData(), o.setData("text/html", l.innerHTML), o.setData("text/plain", a)) : cf(n, l), i && n.dispatch(n.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent", "cut"));
};
function uf(n) {
  return n.openStart == 0 && n.openEnd == 0 && n.content.childCount == 1 ? n.content.firstChild : null;
}
function ff(n, e) {
  if (!n.dom.parentNode)
    return;
  let t = n.input.shiftKey || n.state.selection.$from.parent.type.spec.code, r = n.dom.parentNode.appendChild(document.createElement(t ? "textarea" : "div"));
  t || (r.contentEditable = "true"), r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.focus();
  let i = n.input.shiftKey && n.input.lastKeyCode != 45;
  setTimeout(() => {
    n.focus(), r.parentNode && r.parentNode.removeChild(r), t ? Zr(n, r.value, null, i, e) : Zr(n, r.textContent, r.innerHTML, i, e);
  }, 50);
}
function Zr(n, e, t, r, i) {
  let o = cl(n, e, t, r, n.state.selection.$from);
  if (n.someProp("handlePaste", (a) => a(n, i, o || O.empty)))
    return !0;
  if (!o)
    return !1;
  let s = uf(o), l = s ? n.state.tr.replaceSelectionWith(s, r) : n.state.tr.replaceSelection(o);
  return n.dispatch(l.scrollIntoView().setMeta("paste", !0).setMeta("uiEvent", "paste")), !0;
}
function kl(n) {
  let e = n.getData("text/plain") || n.getData("Text");
  if (e)
    return e;
  let t = n.getData("text/uri-list");
  return t ? t.replace(/\r?\n/g, " ") : "";
}
Le.paste = (n, e) => {
  let t = e;
  if (n.composing && !Nn)
    return;
  let r = bn ? null : t.clipboardData, i = n.input.shiftKey && n.input.lastKeyCode != 45;
  r && Zr(n, kl(r), r.getData("text/html"), i, t) ? t.preventDefault() : ff(n, t);
};
class df {
  constructor(e, t, r) {
    this.slice = e, this.move = t, this.node = r;
  }
}
const hf = _e ? "altKey" : "ctrlKey";
function wl(n, e) {
  let t;
  return n.someProp("dragCopies", (r) => {
    t = t || r(e);
  }), t != null ? !t : !e[hf];
}
Ye.dragstart = (n, e) => {
  let t = e, r = n.input.mouseDown;
  if (r && r.done(), !t.dataTransfer)
    return;
  let i = n.state.selection, o = i.empty ? null : n.posAtCoords(Mn(t)), s;
  if (!(o && o.pos >= i.from && o.pos <= (i instanceof J ? i.to - 1 : i.to))) {
    if (r && r.mightDrag)
      s = J.create(n.state.doc, r.mightDrag.pos);
    else if (t.target && t.target.nodeType == 1) {
      let d = n.docView.nearestDesc(t.target, !0);
      d && d.node.type.spec.draggable && d != n.docView && (s = J.create(n.state.doc, d.posBefore));
    }
  }
  let l = (s || n.state.selection).content(), { dom: a, text: c, slice: u } = al(n, l);
  (!t.dataTransfer.files.length || !yt || rl > 120) && t.dataTransfer.clearData(), t.dataTransfer.setData(bn ? "Text" : "text/html", a.innerHTML), t.dataTransfer.effectAllowed = "copyMove", bn || t.dataTransfer.setData("text/plain", c), n.dragging = new df(u, wl(n, t), s);
};
Ye.dragend = (n) => {
  let e = n.dragging;
  window.setTimeout(() => {
    n.dragging == e && (n.dragging = null);
  }, 50);
};
Le.dragover = Le.dragenter = (n, e) => e.preventDefault();
Le.drop = (n, e) => {
  try {
    pf(n, e, n.dragging);
  } finally {
    n.dragging = null;
  }
};
function pf(n, e, t) {
  if (!e.dataTransfer)
    return;
  let r = n.posAtCoords(Mn(e));
  if (!r)
    return;
  let i = n.state.doc.resolve(r.pos), o = t && t.slice;
  o ? n.someProp("transformPasted", (h) => {
    o = h(o, n, !1);
  }) : o = cl(n, kl(e.dataTransfer), bn ? null : e.dataTransfer.getData("text/html"), !1, i);
  let s = !!(t && wl(n, e));
  if (n.someProp("handleDrop", (h) => h(n, e, o || O.empty, s))) {
    e.preventDefault();
    return;
  }
  if (!o)
    return;
  e.preventDefault();
  let l = o ? Zc(n.state.doc, i.pos, o) : i.pos;
  l == null && (l = i.pos);
  let a = n.state.tr;
  if (s) {
    let { node: h } = t;
    h ? h.replace(a) : a.deleteSelection();
  }
  let c = a.mapping.map(l), u = o.openStart == 0 && o.openEnd == 0 && o.content.childCount == 1, d = a.doc;
  if (u ? a.replaceRangeWith(c, c, o.content.firstChild) : a.replaceRange(c, c, o), a.doc.eq(d))
    return;
  let f = a.doc.resolve(c);
  if (u && J.isSelectable(o.content.firstChild) && f.nodeAfter && f.nodeAfter.sameMarkup(o.content.firstChild))
    a.setSelection(new J(f));
  else {
    let h = a.mapping.map(l);
    a.mapping.maps[a.mapping.maps.length - 1].forEach((p, m, y, x) => h = x), a.setSelection(sl(n, f, a.doc.resolve(h)));
  }
  n.focus(), n.dispatch(a.setMeta("uiEvent", "drop"));
}
Ye.focus = (n) => {
  n.input.lastFocus = Date.now(), n.focused || (n.domObserver.stop(), n.dom.classList.add("ProseMirror-focused"), n.domObserver.start(), n.focused = !0, setTimeout(() => {
    n.docView && n.hasFocus() && !n.domObserver.currentSelection.eq(n.domSelectionRange()) && Ei(n);
  }, 20));
};
Ye.blur = (n, e) => {
  let t = e;
  n.focused && (n.domObserver.stop(), n.dom.classList.remove("ProseMirror-focused"), n.domObserver.start(), t.relatedTarget && n.dom.contains(t.relatedTarget) && n.domObserver.currentSelection.clear(), n.focused = !1);
};
Ye.beforeinput = (n, e) => {
  if (Nn && e.inputType == "deleteContentBackward") {
    n.domObserver.flushSoon();
    let { domChangeCount: r } = n.input;
    setTimeout(() => {
      if (n.input.domChangeCount != r || (n.dom.blur(), n.focus(), n.someProp("handleKeyDown", (o) => o(n, el(8, "Backspace")))))
        return;
      let { $cursor: i } = n.state.selection;
      i && i.pos > 0 && n.dispatch(n.state.tr.delete(i.pos - 1, i.pos).scrollIntoView());
    }, 50);
  }
};
for (let n in Le)
  Ye[n] = Le[n];
function kn(n, e) {
  if (n == e)
    return !0;
  for (let t in n)
    if (n[t] !== e[t])
      return !1;
  for (let t in e)
    if (!(t in n))
      return !1;
  return !0;
}
class lr {
  constructor(e, t) {
    this.toDOM = e, this.spec = t || At, this.side = this.spec.side || 0;
  }
  map(e, t, r, i) {
    let { pos: o, deleted: s } = e.mapResult(t.from + i, this.side < 0 ? -1 : 1);
    return s ? null : new Ge(o - r, o - r, this);
  }
  valid() {
    return !0;
  }
  eq(e) {
    return this == e || e instanceof lr && (this.spec.key && this.spec.key == e.spec.key || this.toDOM == e.toDOM && kn(this.spec, e.spec));
  }
  destroy(e) {
    this.spec.destroy && this.spec.destroy(e);
  }
}
class mt {
  constructor(e, t) {
    this.attrs = e, this.spec = t || At;
  }
  map(e, t, r, i) {
    let o = e.map(t.from + i, this.spec.inclusiveStart ? -1 : 1) - r, s = e.map(t.to + i, this.spec.inclusiveEnd ? 1 : -1) - r;
    return o >= s ? null : new Ge(o, s, this);
  }
  valid(e, t) {
    return t.from < t.to;
  }
  eq(e) {
    return this == e || e instanceof mt && kn(this.attrs, e.attrs) && kn(this.spec, e.spec);
  }
  static is(e) {
    return e.type instanceof mt;
  }
  destroy() {
  }
}
class Ai {
  constructor(e, t) {
    this.attrs = e, this.spec = t || At;
  }
  map(e, t, r, i) {
    let o = e.mapResult(t.from + i, 1);
    if (o.deleted)
      return null;
    let s = e.mapResult(t.to + i, -1);
    return s.deleted || s.pos <= o.pos ? null : new Ge(o.pos - r, s.pos - r, this);
  }
  valid(e, t) {
    let { index: r, offset: i } = e.content.findIndex(t.from), o;
    return i == t.from && !(o = e.child(r)).isText && i + o.nodeSize == t.to;
  }
  eq(e) {
    return this == e || e instanceof Ai && kn(this.attrs, e.attrs) && kn(this.spec, e.spec);
  }
  destroy() {
  }
}
class Ge {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.from = e, this.to = t, this.type = r;
  }
  /**
  @internal
  */
  copy(e, t) {
    return new Ge(e, t, this.type);
  }
  /**
  @internal
  */
  eq(e, t = 0) {
    return this.type.eq(e.type) && this.from + t == e.from && this.to + t == e.to;
  }
  /**
  @internal
  */
  map(e, t, r) {
    return this.type.map(e, this, t, r);
  }
  /**
  Creates a widget decoration, which is a DOM node that's shown in
  the document at the given position. It is recommended that you
  delay rendering the widget by passing a function that will be
  called when the widget is actually drawn in a view, but you can
  also directly pass a DOM node. `getPos` can be used to find the
  widget's current document position.
  */
  static widget(e, t, r) {
    return new Ge(e, e, new lr(t, r));
  }
  /**
  Creates an inline decoration, which adds the given attributes to
  each inline node between `from` and `to`.
  */
  static inline(e, t, r, i) {
    return new Ge(e, t, new mt(r, i));
  }
  /**
  Creates a node decoration. `from` and `to` should point precisely
  before and after a node in the document. That node, and only that
  node, will receive the given attributes.
  */
  static node(e, t, r, i) {
    return new Ge(e, t, new Ai(r, i));
  }
  /**
  The spec provided when creating this decoration. Can be useful
  if you've stored extra information in that object.
  */
  get spec() {
    return this.type.spec;
  }
  /**
  @internal
  */
  get inline() {
    return this.type instanceof mt;
  }
  /**
  @internal
  */
  get widget() {
    return this.type instanceof lr;
  }
}
const qt = [], At = {};
class be {
  /**
  @internal
  */
  constructor(e, t) {
    this.local = e.length ? e : qt, this.children = t.length ? t : qt;
  }
  /**
  Create a set of decorations, using the structure of the given
  document. This will consume (modify) the `decorations` array, so
  you must make a copy if you want need to preserve that.
  */
  static create(e, t) {
    return t.length ? ar(t, e, 0, At) : De;
  }
  /**
  Find all decorations in this set which touch the given range
  (including decorations that start or end directly at the
  boundaries) and match the given predicate on their spec. When
  `start` and `end` are omitted, all decorations in the set are
  considered. When `predicate` isn't given, all decorations are
  assumed to match.
  */
  find(e, t, r) {
    let i = [];
    return this.findInner(e ?? 0, t ?? 1e9, i, 0, r), i;
  }
  findInner(e, t, r, i, o) {
    for (let s = 0; s < this.local.length; s++) {
      let l = this.local[s];
      l.from <= t && l.to >= e && (!o || o(l.spec)) && r.push(l.copy(l.from + i, l.to + i));
    }
    for (let s = 0; s < this.children.length; s += 3)
      if (this.children[s] < t && this.children[s + 1] > e) {
        let l = this.children[s] + 1;
        this.children[s + 2].findInner(e - l, t - l, r, i + l, o);
      }
  }
  /**
  Map the set of decorations in response to a change in the
  document.
  */
  map(e, t, r) {
    return this == De || e.maps.length == 0 ? this : this.mapInner(e, t, 0, 0, r || At);
  }
  /**
  @internal
  */
  mapInner(e, t, r, i, o) {
    let s;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l].map(e, r, i);
      a && a.type.valid(t, a) ? (s || (s = [])).push(a) : o.onRemove && o.onRemove(this.local[l].spec);
    }
    return this.children.length ? mf(this.children, s || [], e, t, r, i, o) : s ? new be(s.sort(zt), qt) : De;
  }
  /**
  Add the given array of decorations to the ones in the set,
  producing a new set. Consumes the `decorations` array. Needs
  access to the current document to create the appropriate tree
  structure.
  */
  add(e, t) {
    return t.length ? this == De ? be.create(e, t) : this.addInner(e, t, 0) : this;
  }
  addInner(e, t, r) {
    let i, o = 0;
    e.forEach((l, a) => {
      let c = a + r, u;
      if (u = Sl(t, l, c)) {
        for (i || (i = this.children.slice()); o < i.length && i[o] < a; )
          o += 3;
        i[o] == a ? i[o + 2] = i[o + 2].addInner(l, u, c + 1) : i.splice(o, 0, a, a + l.nodeSize, ar(u, l, c + 1, At)), o += 3;
      }
    });
    let s = vl(o ? Cl(t) : t, -r);
    for (let l = 0; l < s.length; l++)
      s[l].type.valid(e, s[l]) || s.splice(l--, 1);
    return new be(s.length ? this.local.concat(s).sort(zt) : this.local, i || this.children);
  }
  /**
  Create a new set that contains the decorations in this set, minus
  the ones in the given array.
  */
  remove(e) {
    return e.length == 0 || this == De ? this : this.removeInner(e, 0);
  }
  removeInner(e, t) {
    let r = this.children, i = this.local;
    for (let o = 0; o < r.length; o += 3) {
      let s, l = r[o] + t, a = r[o + 1] + t;
      for (let u = 0, d; u < e.length; u++)
        (d = e[u]) && d.from > l && d.to < a && (e[u] = null, (s || (s = [])).push(d));
      if (!s)
        continue;
      r == this.children && (r = this.children.slice());
      let c = r[o + 2].removeInner(s, l + 1);
      c != De ? r[o + 2] = c : (r.splice(o, 3), o -= 3);
    }
    if (i.length) {
      for (let o = 0, s; o < e.length; o++)
        if (s = e[o])
          for (let l = 0; l < i.length; l++)
            i[l].eq(s, t) && (i == this.local && (i = this.local.slice()), i.splice(l--, 1));
    }
    return r == this.children && i == this.local ? this : i.length || r.length ? new be(i, r) : De;
  }
  forChild(e, t) {
    if (this == De)
      return this;
    if (t.isLeaf)
      return be.empty;
    let r, i;
    for (let l = 0; l < this.children.length; l += 3)
      if (this.children[l] >= e) {
        this.children[l] == e && (r = this.children[l + 2]);
        break;
      }
    let o = e + 1, s = o + t.content.size;
    for (let l = 0; l < this.local.length; l++) {
      let a = this.local[l];
      if (a.from < s && a.to > o && a.type instanceof mt) {
        let c = Math.max(o, a.from) - o, u = Math.min(s, a.to) - o;
        c < u && (i || (i = [])).push(a.copy(c, u));
      }
    }
    if (i) {
      let l = new be(i.sort(zt), qt);
      return r ? new St([l, r]) : l;
    }
    return r || De;
  }
  /**
  @internal
  */
  eq(e) {
    if (this == e)
      return !0;
    if (!(e instanceof be) || this.local.length != e.local.length || this.children.length != e.children.length)
      return !1;
    for (let t = 0; t < this.local.length; t++)
      if (!this.local[t].eq(e.local[t]))
        return !1;
    for (let t = 0; t < this.children.length; t += 3)
      if (this.children[t] != e.children[t] || this.children[t + 1] != e.children[t + 1] || !this.children[t + 2].eq(e.children[t + 2]))
        return !1;
    return !0;
  }
  /**
  @internal
  */
  locals(e) {
    return zi(this.localsInner(e));
  }
  /**
  @internal
  */
  localsInner(e) {
    if (this == De)
      return qt;
    if (e.inlineContent || !this.local.some(mt.is))
      return this.local;
    let t = [];
    for (let r = 0; r < this.local.length; r++)
      this.local[r].type instanceof mt || t.push(this.local[r]);
    return t;
  }
  forEachSet(e) {
    e(this);
  }
}
be.empty = new be([], []);
be.removeOverlap = zi;
const De = be.empty;
class St {
  constructor(e) {
    this.members = e;
  }
  map(e, t) {
    const r = this.members.map((i) => i.map(e, t, At));
    return St.from(r);
  }
  forChild(e, t) {
    if (t.isLeaf)
      return be.empty;
    let r = [];
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].forChild(e, t);
      o != De && (o instanceof St ? r = r.concat(o.members) : r.push(o));
    }
    return St.from(r);
  }
  eq(e) {
    if (!(e instanceof St) || e.members.length != this.members.length)
      return !1;
    for (let t = 0; t < this.members.length; t++)
      if (!this.members[t].eq(e.members[t]))
        return !1;
    return !0;
  }
  locals(e) {
    let t, r = !0;
    for (let i = 0; i < this.members.length; i++) {
      let o = this.members[i].localsInner(e);
      if (o.length)
        if (!t)
          t = o;
        else {
          r && (t = t.slice(), r = !1);
          for (let s = 0; s < o.length; s++)
            t.push(o[s]);
        }
    }
    return t ? zi(r ? t : t.sort(zt)) : qt;
  }
  // Create a group for the given array of decoration sets, or return
  // a single set when possible.
  static from(e) {
    switch (e.length) {
      case 0:
        return De;
      case 1:
        return e[0];
      default:
        return new St(e.every((t) => t instanceof be) ? e : e.reduce((t, r) => t.concat(r instanceof be ? r : r.members), []));
    }
  }
  forEachSet(e) {
    for (let t = 0; t < this.members.length; t++)
      this.members[t].forEachSet(e);
  }
}
function mf(n, e, t, r, i, o, s) {
  let l = n.slice();
  for (let c = 0, u = o; c < t.maps.length; c++) {
    let d = 0;
    t.maps[c].forEach((f, h, p, m) => {
      let y = m - p - (h - f);
      for (let x = 0; x < l.length; x += 3) {
        let w = l[x + 1];
        if (w < 0 || f > w + u - d)
          continue;
        let k = l[x] + u - d;
        h >= k ? l[x + 1] = f <= k ? -2 : -1 : f >= u && y && (l[x] += y, l[x + 1] += y);
      }
      d += y;
    }), u = t.maps[c].map(u, -1);
  }
  let a = !1;
  for (let c = 0; c < l.length; c += 3)
    if (l[c + 1] < 0) {
      if (l[c + 1] == -2) {
        a = !0, l[c + 1] = -1;
        continue;
      }
      let u = t.map(n[c] + o), d = u - i;
      if (d < 0 || d >= r.content.size) {
        a = !0;
        continue;
      }
      let f = t.map(n[c + 1] + o, -1), h = f - i, { index: p, offset: m } = r.content.findIndex(d), y = r.maybeChild(p);
      if (y && m == d && m + y.nodeSize == h) {
        let x = l[c + 2].mapInner(t, y, u + 1, n[c] + o + 1, s);
        x != De ? (l[c] = d, l[c + 1] = h, l[c + 2] = x) : (l[c + 1] = -2, a = !0);
      } else
        a = !0;
    }
  if (a) {
    let c = gf(l, n, e, t, i, o, s), u = ar(c, r, 0, s);
    e = u.local;
    for (let d = 0; d < l.length; d += 3)
      l[d + 1] < 0 && (l.splice(d, 3), d -= 3);
    for (let d = 0, f = 0; d < u.children.length; d += 3) {
      let h = u.children[d];
      for (; f < l.length && l[f] < h; )
        f += 3;
      l.splice(f, 0, u.children[d], u.children[d + 1], u.children[d + 2]);
    }
  }
  return new be(e.sort(zt), l);
}
function vl(n, e) {
  if (!e || !n.length)
    return n;
  let t = [];
  for (let r = 0; r < n.length; r++) {
    let i = n[r];
    t.push(new Ge(i.from + e, i.to + e, i.type));
  }
  return t;
}
function gf(n, e, t, r, i, o, s) {
  function l(a, c) {
    for (let u = 0; u < a.local.length; u++) {
      let d = a.local[u].map(r, i, c);
      d ? t.push(d) : s.onRemove && s.onRemove(a.local[u].spec);
    }
    for (let u = 0; u < a.children.length; u += 3)
      l(a.children[u + 2], a.children[u] + c + 1);
  }
  for (let a = 0; a < n.length; a += 3)
    n[a + 1] == -1 && l(n[a + 2], e[a] + o + 1);
  return t;
}
function Sl(n, e, t) {
  if (e.isLeaf)
    return null;
  let r = t + e.nodeSize, i = null;
  for (let o = 0, s; o < n.length; o++)
    (s = n[o]) && s.from > t && s.to < r && ((i || (i = [])).push(s), n[o] = null);
  return i;
}
function Cl(n) {
  let e = [];
  for (let t = 0; t < n.length; t++)
    n[t] != null && e.push(n[t]);
  return e;
}
function ar(n, e, t, r) {
  let i = [], o = !1;
  e.forEach((l, a) => {
    let c = Sl(n, l, a + t);
    if (c) {
      o = !0;
      let u = ar(c, l, t + a + 1, r);
      u != De && i.push(a, a + l.nodeSize, u);
    }
  });
  let s = vl(o ? Cl(n) : n, -t).sort(zt);
  for (let l = 0; l < s.length; l++)
    s[l].type.valid(e, s[l]) || (r.onRemove && r.onRemove(s[l].spec), s.splice(l--, 1));
  return s.length || i.length ? new be(s, i) : De;
}
function zt(n, e) {
  return n.from - e.from || n.to - e.to;
}
function zi(n) {
  let e = n;
  for (let t = 0; t < e.length - 1; t++) {
    let r = e[t];
    if (r.from != r.to)
      for (let i = t + 1; i < e.length; i++) {
        let o = e[i];
        if (o.from == r.from) {
          o.to != r.to && (e == n && (e = n.slice()), e[i] = o.copy(o.from, r.to), Eo(e, i + 1, o.copy(r.to, o.to)));
          continue;
        } else {
          o.from < r.to && (e == n && (e = n.slice()), e[t] = r.copy(r.from, o.from), Eo(e, i, r.copy(o.from, r.to)));
          break;
        }
      }
  }
  return e;
}
function Eo(n, e, t) {
  for (; e < n.length && zt(t, n[e]) > 0; )
    e++;
  n.splice(e, 0, t);
}
var yf = Object.defineProperty, Ri = (n, e) => {
  for (var t in e)
    yf(n, t, { get: e[t], enumerable: !0 });
};
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
var xf = class {
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
      Object.entries(n).map(([s, l]) => [s, (...c) => {
        const u = l(...c)(o);
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
    const { rawCommands: t, editor: r, state: i } = this, { view: o } = r, s = [], l = !!n, a = n || i.tr, c = () => (!l && e && !a.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(a), s.every((d) => d === !0)), u = {
      ...Object.fromEntries(
        Object.entries(t).map(([d, f]) => [d, (...p) => {
          const m = this.buildProps(a, e), y = f(...p)(m);
          return s.push(y), u;
        }])
      ),
      run: c
    };
    return u;
  }
  createCan(n) {
    const { rawCommands: e, state: t } = this, r = !1, i = n || t.tr, o = this.buildProps(i, r);
    return {
      ...Object.fromEntries(
        Object.entries(e).map(([l, a]) => [l, (...c) => a(...c)({ ...o, dispatch: void 0 })])
      ),
      chain: () => this.createChain(i, r)
    };
  }
  buildProps(n, e = !0) {
    const { rawCommands: t, editor: r, state: i } = this, { view: o } = r, s = {
      tr: n,
      editor: r,
      view: o,
      state: Tl({
        state: i,
        transaction: n
      }),
      dispatch: e ? () => {
      } : void 0,
      chain: () => this.createChain(n, e),
      can: () => this.createCan(n),
      get commands() {
        return Object.fromEntries(
          Object.entries(t).map(([l, a]) => [l, (...c) => a(...c)(s)])
        );
      }
    };
    return s;
  }
}, El = {};
Ri(El, {
  blur: () => bf,
  clearContent: () => kf,
  clearNodes: () => wf,
  command: () => vf,
  createParagraphNear: () => Sf,
  cut: () => Cf,
  deleteCurrentNode: () => Tf,
  deleteNode: () => Ef,
  deleteRange: () => Nf,
  deleteSelection: () => zf,
  enter: () => Rf,
  exitCode: () => If,
  extendMarkRange: () => Df,
  first: () => $f,
  focus: () => Bf,
  forEach: () => Ff,
  insertContent: () => _f,
  insertContentAt: () => Hf,
  insertDefaultBlock: () => Wf,
  joinBackward: () => Vf,
  joinDown: () => qf,
  joinForward: () => Kf,
  joinItemBackward: () => Jf,
  joinItemForward: () => Yf,
  joinTextblockBackward: () => Uf,
  joinTextblockForward: () => Xf,
  joinUp: () => jf,
  keyboardShortcut: () => Qf,
  lift: () => Zf,
  liftEmptyBlock: () => ed,
  liftListItem: () => td,
  newlineInCode: () => nd,
  resetAttributes: () => rd,
  scrollIntoView: () => id,
  selectAll: () => od,
  selectNodeBackward: () => sd,
  selectNodeForward: () => ld,
  selectParentNode: () => ad,
  selectTextblockEnd: () => cd,
  selectTextblockStart: () => ud,
  setContent: () => dd,
  setMark: () => Cd,
  setMeta: () => Td,
  setNode: () => Ed,
  setNodeSelection: () => Nd,
  setTextDirection: () => Md,
  setTextSelection: () => Ad,
  sinkListItem: () => zd,
  splitBlock: () => Rd,
  splitListItem: () => Id,
  toggleList: () => Dd,
  toggleMark: () => $d,
  toggleNode: () => Pd,
  toggleWrap: () => Ld,
  undoInputRule: () => Bd,
  unsetAllMarks: () => Fd,
  unsetMark: () => _d,
  unsetTextDirection: () => Hd,
  updateAttributes: () => Wd,
  updateDecorations: () => Vd,
  wrapIn: () => Kd,
  wrapInList: () => Jd
});
var bf = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) == null || t.removeAllRanges());
}), !0), kf = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), wf = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, a) => {
      if (l.type.isText)
        return;
      const { doc: c, mapping: u } = e, d = c.resolve(u.map(a)), f = c.resolve(u.map(a + l.nodeSize)), h = d.blockRange(f);
      if (!h)
        return;
      const p = nn(h);
      if (l.type.isTextblock) {
        const { defaultType: m } = d.parent.contentMatchAt(d.index());
        e.setNodeMarkup(h.start, m);
      }
      (p || p === 0) && e.lift(h, p);
    });
  }), !0;
}, vf = (n) => (e) => n(e), Sf = () => ({ state: n, dispatch: e }) => Ys(n, e), Cf = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new He(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Tf = () => ({ tr: n, dispatch: e }) => {
  const { selection: t } = n, r = t.$anchor.node();
  if (r.content.size > 0)
    return !1;
  const i = n.selection.$anchor;
  for (let o = i.depth; o > 0; o -= 1)
    if (i.node(o).type === r.type) {
      if (e) {
        const l = i.before(o), a = i.after(o);
        n.delete(l, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
};
function Re(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(
        `There is no node type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.nodes[n];
  }
  return n;
}
var Ef = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Re(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === i) {
      if (r) {
        const a = o.before(s), c = o.after(s);
        e.delete(a, c).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Nf = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, Mf = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, No = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end())
    return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return Mf(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Af = (n, e, t) => {
  const r = No(n, t, "left"), i = No(e, t, "right");
  return { from: r, to: i };
}, zf = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty)
    return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), a = t.doc.resolve(s.map(o.$to.pos)), { from: c, to: u } = Af(l, a, n.schema);
      t.deleteRange(c, u);
    }), t.selection.empty || t.setSelection(He.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Rf = () => ({ commands: n }) => n.keyboardShortcut("Enter"), If = () => ({ state: n, dispatch: e }) => pu(n, e);
function Of(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function cr(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Of(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Nl(n, e, t = {}) {
  return n.find((r) => r.type === e && cr(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])),
    t
  ));
}
function Mo(n, e, t = {}) {
  return !!Nl(n, e, t);
}
function Ml(n, e, t) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((c) => c.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((c) => c.type === e))
    return;
  if (!t) {
    const c = r.node.marks.find((u) => u.type === e);
    c && (t = c.attrs);
  }
  if (!Nl([...r.node.marks], e, t))
    return;
  let o = r.index, s = n.start() + r.offset, l = o + 1, a = s + r.node.nodeSize;
  for (; o > 0 && Mo([...n.parent.child(o - 1).marks], e, t); )
    o -= 1, s -= n.parent.child(o).nodeSize;
  for (; l < n.parent.childCount && Mo([...n.parent.child(l).marks], e, t); )
    a += n.parent.child(l).nodeSize, l += 1;
  return {
    from: s,
    to: a
  };
}
function xt(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(
        `There is no mark type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.marks[n];
  }
  return n;
}
var Df = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = xt(n, r.schema), { doc: s, selection: l } = t, { $from: a, from: c, to: u } = l;
  if (i) {
    const d = Ml(a, o, e);
    if (d && d.from <= c && d.to >= u) {
      const f = He.create(s, d.from, d.to);
      t.setSelection(f);
    }
  }
  return !0;
}, $f = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function Al(n) {
  return n instanceof He;
}
function Ct(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Pf(n, e = null) {
  if (!e)
    return null;
  const t = Kt.atStart(n), r = Kt.atEnd(n);
  if (e === "start" || e === !0)
    return t;
  if (e === "end")
    return r;
  const i = t.from, o = r.to;
  return e === "all" ? He.create(
    n,
    Ct(0, i, o),
    Ct(n.content.size, i, o)
  ) : He.create(
    n,
    Ct(e, i, o),
    Ct(e, i, o)
  );
}
function Ao() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function ur() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
    navigator.platform
  ) || // iPad on iOS 13 detection
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function Lf() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
var Bf = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (ur() || Ao()) && r.dom.focus(), Lf() && !ur() && !Ao() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1)
      return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !Al(t.state.selection))
    return s(), !0;
  const l = Pf(i.doc, n) || t.state.selection, a = t.state.selection.eq(l);
  return o && (a || i.setSelection(l), a && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, Ff = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), _f = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt(
  { from: t.selection.from, to: t.selection.to },
  n,
  e
), zl = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && zl(r);
  }
  return n;
};
function Wn(n) {
  if (typeof window > "u")
    throw new Error(
      "[tiptap error]: there is no window object available, so this function cannot be used"
    );
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return zl(t);
}
function Rl(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Zt(n, e, t) {
  if (Rl(n))
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
        return C.fromArray(n.map((l) => e.nodeFromJSON(l)));
      const s = e.nodeFromJSON(n);
      return t.errorOnInvalidContent && s.check(), s;
    } catch (o) {
      if (t.errorOnInvalidContent)
        throw new Error("[tiptap error]: Invalid JSON content", { cause: o });
      return console.warn("[tiptap warn]: Invalid content.", "Passed value:", n, "Error:", o), Zt("", e, t);
    }
  if (i) {
    if (t.errorOnInvalidContent) {
      let s = !1, l = "";
      const a = new Ac({
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
                getAttrs: (c) => (s = !0, l = typeof c == "string" ? c : c.outerHTML, null)
              }
            ]
          }
        })
      });
      if (t.slice ? Mt.fromSchema(a).parseSlice(
        Wn(n),
        t.parseOptions
      ) : Mt.fromSchema(a).parse(
        Wn(n),
        t.parseOptions
      ), t.errorOnInvalidContent && s)
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error(`Invalid element found: ${l}`)
        });
    }
    const o = Mt.fromSchema(e);
    return t.slice ? o.parseSlice(Wn(n), t.parseOptions).content : o.parse(Wn(n), t.parseOptions);
  }
  return Zt("", e, t);
}
function Il(n) {
  return !("type" in n);
}
function Ol(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof we || i instanceof Se))
    return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, a, c, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Kt.near(n.doc.resolve(s), t));
}
var Hf = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
    if (!t.errorOnInvalidContent && !o.options.enableContentCheck && o.options.emitContentError)
      try {
        Zt(e, o.schema, {
          parseOptions: c,
          errorOnInvalidContent: !0
        });
      } catch (y) {
        a(y);
      }
    try {
      l = Zt(e, o.schema, {
        parseOptions: c,
        errorOnInvalidContent: (s = t.errorOnInvalidContent) != null ? s : o.options.enableContentCheck
      });
    } catch (y) {
      return a(y), !1;
    }
    let { from: u, to: d } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, f = !0, h = !0;
    const p = Il(l) ? l.content : [l];
    if (p.forEach((y) => {
      y.check(), f = f ? y.isText && y.marks.length === 0 : !1, h = h ? y.isBlock : !1;
    }), u === d && h) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, d += 1);
    }
    let m;
    if (f)
      Array.isArray(e) ? m = e.map((y) => y.text || "").join("") : Rl(e) ? m = p.map((y) => {
        var x;
        return (x = y.text) != null ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? m = e.text : m = e, r.insertText(m, u, d);
    else {
      m = C.from(p);
      const y = r.doc.resolve(u), x = y.node(), w = y.parentOffset === 0, k = x.isText || x.isTextblock, T = x.content.size > 0;
      w && k && T && h && (u = Math.max(0, u - 1)), r.replaceWith(u, d, p);
    }
    t.updateSelection && Ol(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: u, text: m }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: u, text: m });
  }
  return !0;
};
function Dl(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
var Wf = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let a;
  typeof i == "number" ? a = e.doc.resolve(i) : i ? a = i : a = e.selection.$from;
  const c = Dl(a.parent.contentMatchAt(a.index()));
  if (!c)
    return !1;
  const u = Object.keys(c.spec.attrs || {}), d = o ? Object.fromEntries(Object.entries(o).filter(([h]) => u.includes(h))) : {};
  let f;
  if (s) {
    const h = Zt(s, r.schema);
    f = c.createAndFill(d, h);
  } else
    f = c.createAndFill(d);
  return f ? (t && (e.insert(a.pos, f), l && Ol(e, e.steps.length - 1, -1)), !0) : !1;
}, jf = () => ({ state: n, dispatch: e }) => fu(n, e), qf = () => ({ state: n, dispatch: e }) => du(n, e), Vf = () => ({ state: n, dispatch: e }) => Hs(n, e), Kf = () => ({ state: n, dispatch: e }) => Vs(n, e), Jf = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = yr(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Yf = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = yr(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, Uf = () => ({ state: n, dispatch: e }) => cu(n, e), Xf = () => ({ state: n, dispatch: e }) => uu(n, e);
function $l() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function Gf(n) {
  const e = n.split(/-(?!$)/);
  let t = e[e.length - 1];
  t === "Space" && (t = " ");
  let r, i, o, s;
  for (let l = 0; l < e.length - 1; l += 1) {
    const a = e[l];
    if (/^(cmd|meta|m)$/i.test(a))
      s = !0;
    else if (/^a(lt)?$/i.test(a))
      r = !0;
    else if (/^(c|ctrl|control)$/i.test(a))
      i = !0;
    else if (/^s(hift)?$/i.test(a))
      o = !0;
    else if (/^mod$/i.test(a))
      ur() || $l() ? s = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${a}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
var Qf = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = Gf(n).split(/-(?!$)/), s = o.find((c) => !["Alt", "Ctrl", "Meta", "Shift"].includes(c)), l = new KeyboardEvent("keydown", {
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
function Ii(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Re(e, n.schema) : null, l = [];
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
  const a = i - r, c = l.filter((d) => s ? s.name === d.node.type.name : !0).filter((d) => cr(d.node.attrs, t, { strict: !1 }));
  return o ? !!c.length : c.reduce((d, f) => d + f.to - f.from, 0) >= a;
}
var Zf = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Re(n, t.schema);
  return Ii(t, i, e) ? hu(t, r) : !1;
}, ed = () => ({ state: n, dispatch: e }) => Us(n, e), td = (n) => ({ state: e, dispatch: t }) => {
  const r = Re(n, e.schema);
  return Tu(r)(e, t);
}, nd = () => ({ state: n, dispatch: e }) => Js(n, e);
function Pl(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function zo(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
var rd = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Pl(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (o = Re(n, r.schema)), l === "mark" && (s = xt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    r.doc.nodesBetween(c.$from.pos, c.$to.pos, (u, d) => {
      o && o === u.type && (a = !0, i && t.setNodeMarkup(d, void 0, zo(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (a = !0, i && t.addMark(
          d,
          d + u.nodeSize,
          s.create(zo(f.attrs, e))
        ));
      });
    });
  }), a;
}, id = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), od = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new ya(n.doc);
    n.setSelection(t);
  }
  return !0;
}, sd = () => ({ state: n, dispatch: e }) => js(n, e), ld = () => ({ state: n, dispatch: e }) => Ks(n, e), ad = () => ({ state: n, dispatch: e }) => yu(n, e), cd = () => ({ state: n, dispatch: e }) => ku(n, e), ud = () => ({ state: n, dispatch: e }) => bu(n, e);
function fd(n, e, t = {}, r = {}) {
  return Zt(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
var dd = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: a } = o;
  if (r.preserveWhitespace !== "full") {
    const c = fd(n, i.schema, r, {
      errorOnInvalidContent: e ?? i.options.enableContentCheck
    });
    if (s) {
      const u = Il(c) ? c.content : [c];
      o.replaceWith(0, a.content.size, u).setMeta("preventUpdate", !t);
    }
    return !0;
  }
  return s && o.setMeta("preventUpdate", !t), l.insertContentAt({ from: 0, to: a.content.size }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function hd(n, e) {
  const t = xt(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (a) => {
    s.push(...a.marks);
  });
  const l = s.find((a) => a.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function pd(n, e) {
  const t = new su(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function md(n, e) {
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
function Oi(n) {
  return (e) => md(e.$from, n);
}
function wn(n, e, t) {
  return n.config[e] === void 0 && n.parent ? wn(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? wn(n.parent, e, t) : null
  }) : n.config[e];
}
function gd(n) {
  return typeof n == "function";
}
function ei(n, e = void 0, ...t) {
  return gd(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Ll(n) {
  const e = n.filter(
    (i) => i.type === "extension"
  ), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function yd(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (a, c, u, d) => {
    var f;
    a.isBlock && c > r && (l += o);
    const h = s == null ? void 0 : s[a.type.name];
    if (h)
      return u && (l += h({
        node: a,
        pos: c,
        parent: u,
        index: d,
        range: e
      })), !1;
    a.isText && (l += (f = a == null ? void 0 : a.text) == null ? void 0 : f.slice(Math.max(r, c) - c, i - c));
  }), l;
}
function xd(n) {
  return Object.fromEntries(
    Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText])
  );
}
function bd(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function kd(n) {
  const e = bd(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((o, s) => s !== r).some((o) => t.oldRange.from >= o.oldRange.from && t.oldRange.to <= o.oldRange.to && t.newRange.from >= o.newRange.from && t.newRange.to <= o.newRange.to));
}
function wd(n) {
  const { mapping: e, steps: t } = n, r = [];
  return e.maps.forEach((i, o) => {
    const s = [];
    if (i.ranges.length)
      i.forEach((l, a) => {
        s.push({ from: l, to: a });
      });
    else {
      const { from: l, to: a } = t[o];
      if (l === void 0 || a === void 0)
        return;
      s.push({ from: l, to: a });
    }
    s.forEach(({ from: l, to: a }) => {
      const c = e.slice(o).map(l, -1), u = e.slice(o).map(a), d = e.invert().map(c, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: d,
          to: f
        },
        newRange: {
          from: c,
          to: u
        }
      });
    });
  }), kd(r);
}
function Jn(n, e, t) {
  return Object.fromEntries(
    Object.entries(t).filter(([r]) => {
      const i = n.find((o) => o.type === e && o.name === r);
      return i ? i.attribute.keepOnSplit : !1;
    })
  );
}
function vd(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? xt(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((d) => o ? o.name === d.type.name : !0).find((d) => cr(d.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: d, $to: f }) => {
    const h = d.pos, p = f.pos;
    n.doc.nodesBetween(h, p, (m, y) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o))
        return !1;
      if (!m.isText && !m.marks.length)
        return;
      const x = Math.max(h, y), w = Math.min(p, y + m.nodeSize), k = w - x;
      s += k, l.push(
        ...m.marks.map((T) => ({
          mark: T,
          from: x,
          to: w
        }))
      );
    });
  }), s === 0)
    return !1;
  const a = l.filter((d) => o ? o.name === d.mark.type.name : !0).filter((d) => cr(d.mark.attrs, t, { strict: !1 })).reduce((d, f) => d + f.to - f.from, 0), c = l.filter((d) => o ? d.mark.type !== o && d.mark.type.excludes(o) : !0).reduce((d, f) => d + f.to - f.from, 0);
  return (a > 0 ? a + c : a) >= s;
}
function Dr(n, e) {
  const { nodeExtensions: t } = Ll(e), r = t.find((s) => s.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = ei(wn(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function Bl(n, {
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
      i !== !1 && (Bl(o, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function Sd(n, e, t) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (Al(i) && (o = i.$cursor), o) {
    const l = (r = n.storedMarks) != null ? r : o.marks();
    return o.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((c) => c.type.excludes(t)));
  }
  const { ranges: s } = i;
  return s.some(({ $from: l, $to: a }) => {
    let c = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, a.pos, (u, d, f) => {
      if (c)
        return !1;
      if (u.isInline) {
        const h = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        c = h && p;
      }
      return !c;
    }), c;
  });
}
var Cd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, a = xt(n, r.schema);
  if (i)
    if (s) {
      const c = hd(r, a);
      t.addStoredMark(
        a.create({
          ...c,
          ...e
        })
      );
    } else
      l.forEach((c) => {
        const u = c.$from.pos, d = c.$to.pos;
        r.doc.nodesBetween(u, d, (f, h) => {
          const p = Math.max(h, u), m = Math.min(h + f.nodeSize, d);
          f.marks.find((x) => x.type === a) ? f.marks.forEach((x) => {
            a === x.type && t.addMark(
              p,
              m,
              a.create({
                ...x.attrs,
                ...e
              })
            );
          }) : t.addMark(p, m, a.create(e));
        });
      });
  return Sd(r, t, a);
}, Td = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), Ed = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Re(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => ho(o, { ...s, ...e })(t) ? !0 : l.clearNodes()).command(({ state: l }) => ho(o, { ...s, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Nd = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = Ct(n, 0, r.content.size), o = Ut.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, Md = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (a, c) => {
    a.isText || t.setNodeMarkup(c, void 0, {
      ...a.attrs,
      dir: n
    });
  }), !0;
}, Ad = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? { from: n, to: n } : n, s = He.atStart(r).from, l = He.atEnd(r).to, a = Ct(i, s, l), c = Ct(o, s, l), u = He.create(r, a, c);
    e.setSelection(u);
  }
  return !0;
}, zd = (n) => ({ state: e, dispatch: t }) => {
  const r = Re(n, e.schema);
  return Mu(r)(e, t);
};
function Ro(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
var Rd = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: a } = o, c = i.extensionManager.attributes, u = Jn(
    c,
    l.node().type.name,
    l.node().attrs
  );
  if (o instanceof Ut && o.node.isBlock)
    return !l.parentOffset || !ot(s, l.pos) ? !1 : (r && (n && Ro(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const d = a.parentOffset === a.parent.content.size, f = l.depth === 0 ? void 0 : Dl(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let h = d && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = ot(e.doc, e.mapping.map(l.pos), 1, h);
  if (!h && !p && ot(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, h = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (o instanceof He && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, h), f && !d && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), y = e.doc.resolve(m);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && Ro(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, Id = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  var s;
  const l = Re(n, r.schema), { $from: a, $to: c } = r.selection, u = r.selection.node;
  if (u && u.isBlock || a.depth < 2 || !a.sameParent(c))
    return !1;
  const d = a.node(-1);
  if (d.type !== l)
    return !1;
  const f = o.extensionManager.attributes;
  if (a.parent.content.size === 0 && a.node(-1).childCount === a.indexAfter(-1)) {
    if (a.depth === 2 || a.node(-3).type !== l || a.index(-2) !== a.node(-2).childCount - 1)
      return !1;
    if (i) {
      let x = C.empty;
      const w = a.index(-1) ? 1 : a.index(-2) ? 2 : 3;
      for (let F = a.depth - w; F >= a.depth - 3; F -= 1)
        x = C.from(a.node(F).copy(x));
      const k = (
        // oxlint-disable-next-line no-nested-ternary
        a.indexAfter(-1) < a.node(-2).childCount ? 1 : a.indexAfter(-2) < a.node(-3).childCount ? 2 : 3
      ), T = {
        ...Jn(f, a.node().type.name, a.node().attrs),
        ...e
      }, H = ((s = l.contentMatch.defaultType) == null ? void 0 : s.createAndFill(T)) || void 0;
      x = x.append(C.from(l.createAndFill(null, H) || void 0));
      const D = a.before(a.depth - (w - 1));
      t.replace(D, a.after(-k), new O(x, 4 - w, 0));
      let E = -1;
      t.doc.nodesBetween(D, t.doc.content.size, (F, N) => {
        if (E > -1)
          return !1;
        F.isTextblock && F.content.size === 0 && (E = N + 1);
      }), E > -1 && t.setSelection(He.near(t.doc.resolve(E))), t.scrollIntoView();
    }
    return !0;
  }
  const h = c.pos === a.end() ? d.contentMatchAt(0).defaultType : null, p = {
    ...Jn(f, d.type.name, d.attrs),
    ...e
  }, m = {
    ...Jn(f, a.node().type.name, a.node().attrs),
    ...e
  };
  t.delete(a.pos, c.pos);
  const y = h ? [
    { type: l, attrs: p },
    { type: h, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!ot(t.doc, a.pos, 2))
    return !1;
  if (i) {
    const { selection: x, storedMarks: w } = r, { splittableMarks: k } = o.extensionManager, T = w || x.$to.parentOffset && x.$from.marks();
    if (t.split(a.pos, 2, y).scrollIntoView(), !T || !i)
      return !0;
    const H = T.filter((D) => k.includes(D.type.name));
    t.ensureMarks(H);
  }
  return !0;
};
function Io(n) {
  return !n || n === "1" ? null : n;
}
function Fl(n, e) {
  return Io(n) === Io(e);
}
var $r = (n, e) => {
  const t = Oi((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Dt(n.doc, t.pos)) || !Fl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, Pr = (n, e) => {
  const t = Oi((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && Dt(n.doc, r)) || !Fl(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Od(n) {
  const e = n.doc, t = e.firstChild;
  if (!t)
    return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return He.between(r, i);
}
var Dd = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: a, commands: c, can: u }) => {
  const { extensions: d, splittableMarks: f } = i.extensionManager, h = Re(n, s.schema), p = Re(e, s.schema), { selection: m, storedMarks: y } = s, { $from: x, $to: w } = m, k = x.blockRange(w), T = y || m.$to.parentOffset && m.$from.marks();
  if (!k)
    return !1;
  const H = Oi((M) => Dr(M.type.name, d))(m), D = m.from === 0 && m.to === s.doc.content.size, E = s.doc.content.content, F = E.length === 1 ? E[0] : null, N = D && F && Dr(F.type.name, d) ? {
    node: F,
    pos: 0
  } : null, U = H ?? N, $ = !!H && k.depth >= 1 && k.depth - H.depth <= 1, j = !!N;
  if (($ || j) && U) {
    if (U.node.type === h)
      return D && j ? a().command(({ tr: M, dispatch: z }) => {
        const P = Od(M);
        return P ? (M.setSelection(P), z && z(M), !0) : !1;
      }).liftListItem(p).run() : c.liftListItem(p);
    if (Dr(U.node.type.name, d) && h.validContent(U.node.content))
      return a().command(() => (o.setNodeMarkup(U.pos, h), !0)).command(() => $r(o, h)).command(() => Pr(o, h)).run();
  }
  return !t || !T || !l ? a().command(() => u().wrapInList(h, r) ? !0 : c.clearNodes()).wrapInList(h, r).command(() => $r(o, h)).command(() => Pr(o, h)).run() : a().command(() => {
    const M = u().wrapInList(h, r), z = T.filter((P) => f.includes(P.type.name));
    return o.ensureMarks(z), M ? !0 : c.clearNodes();
  }).wrapInList(h, r).command(() => $r(o, h)).command(() => Pr(o, h)).run();
}, $d = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = xt(n, r.schema);
  return vd(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Pd = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Re(n, r.schema), s = Re(e, r.schema), l = Ii(r, o, t);
  let a;
  return r.selection.$anchor.sameParent(r.selection.$head) && (a = r.selection.$anchor.parent.attrs), l ? i.setNode(s, a) : i.setNode(o, { ...a, ...t });
}, Ld = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Re(n, t.schema);
  return Ii(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, Bd = () => ({ state: n, dispatch: e }) => {
  const t = n.plugins;
  for (let r = 0; r < t.length; r += 1) {
    const i = t[r];
    let o;
    if (i.spec.isInputRules && (o = i.getState(n))) {
      if (e) {
        const s = n.tr, l = o.transform;
        for (let a = l.steps.length - 1; a >= 0; a -= 1)
          s.step(l.steps[a].invert(l.docs[a]));
        if (o.text) {
          const a = s.doc.resolve(o.from).marks();
          s.replaceWith(o.from, o.to, n.schema.text(o.text, a));
        } else
          s.delete(o.from, o.to);
      }
      return !0;
    }
  }
  return !1;
}, Fd = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s)
    return !0;
  const { nonClearableMarks: a } = r.extensionManager;
  if (t) {
    const c = Object.values(r.schema.marks).filter(
      (u) => i || !a.includes(u.name)
    );
    l.forEach((u) => {
      for (const d of c)
        e.removeMark(u.$from.pos, u.$to.pos, d);
    });
  }
  return !0;
}, _d = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: s = !1 } = e, { selection: l } = t, a = xt(n, r.schema), { $from: c, empty: u, ranges: d } = l;
  if (!i)
    return !0;
  if (u && s) {
    let { from: f, to: h } = l;
    const p = (o = c.marks().find((y) => y.type === a)) == null ? void 0 : o.attrs, m = Ml(c, a, p);
    m && (f = m.from, h = m.to), t.removeMark(f, h, a);
  } else
    d.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, a);
    });
  return t.removeStoredMark(a), !0;
}, Hd = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, a) => {
    if (l.isText)
      return;
    const c = { ...l.attrs };
    delete c.dir, e.setNodeMarkup(a, void 0, c);
  }), !0;
}, Wd = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Pl(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (o = Re(n, r.schema)), l === "mark" && (s = xt(n, r.schema));
  let a = !1;
  return t.selection.ranges.forEach((c) => {
    const u = c.$from.pos, d = c.$to.pos;
    let f, h, p, m;
    t.selection.empty ? r.doc.nodesBetween(u, d, (y, x) => {
      o && o === y.type && (a = !0, p = Math.max(x, u), m = Math.min(x + y.nodeSize, d), f = x, h = y);
    }) : r.doc.nodesBetween(u, d, (y, x) => {
      x < u && o && o === y.type && (a = !0, p = Math.max(x, u), m = Math.min(x + y.nodeSize, d), f = x, h = y), x >= u && x <= d && (o && o === y.type && (a = !0, i && t.setNodeMarkup(x, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((w) => {
        if (s === w.type && (a = !0, i)) {
          const k = Math.max(x, u), T = Math.min(x + y.nodeSize, d);
          t.addMark(
            k,
            T,
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
  }), a;
}, jd = "__tiptap_decorations__", qd = new Je(
  jd
), Vd = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(qd, { type: "force", name: n }), !0), Kd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Re(n, t.schema);
  return wu(i, e)(t, r);
}, Jd = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Re(n, t.schema);
  return vu(i, e)(t, r);
};
typeof process < "u" && process.env.NODE_ENV;
function Yd(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function jn(n) {
  return Yd(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
var Ud = {};
Ri(Ud, {
  createAtomBlockMarkdownSpec: () => Xd,
  createBlockMarkdownSpec: () => Gd,
  createInlineMarkdownSpec: () => eh,
  parseAttributes: () => Di,
  parseIndentedBlocks: () => th,
  renderNestedMarkdownContent: () => nh,
  serializeAttributes: () => $i
});
function Di(n) {
  if (!(n != null && n.trim()))
    return {};
  const e = {}, t = [], r = n.replace(/["']([^"']*)["']/g, (c) => (t.push(c), `__QUOTED_${t.length - 1}__`)), i = r.match(/(?:^|\s)\.([\w-]+)/g);
  if (i) {
    const c = i.map((u) => u.trim().slice(1));
    e.class = c.join(" ");
  }
  const o = r.match(/(?:^|\s)#([\w-]+)/);
  o && (e.id = o[1]);
  const s = /([a-zA-Z][\w-]*)\s*=\s*(__QUOTED_\d+__)/g;
  Array.from(r.matchAll(s)).forEach(([, c, u]) => {
    var d;
    const f = parseInt(((d = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : d[1]) || "0", 10), h = t[f];
    h && (e[c] = h.slice(1, -1));
  });
  const a = r.replace(/(?:^|\s)\.([\w-]+)/g, "").replace(/(?:^|\s)#([\w-]+)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return a && a.split(/\s+/).filter(Boolean).forEach((u) => {
    u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
  }), e;
}
function $i(n) {
  if (!n || Object.keys(n).length === 0)
    return "";
  const e = [];
  return n.class && String(n.class).split(/\s+/).filter(Boolean).forEach((r) => e.push(`.${r}`)), n.id && e.push(`#${n.id}`), Object.entries(n).forEach(([t, r]) => {
    t === "class" || t === "id" || (r === !0 ? e.push(t) : r !== !1 && r != null && e.push(`${t}="${String(r)}"`));
  }), e.join(" ");
}
function Xd(n) {
  const {
    nodeName: e,
    name: t,
    parseAttributes: r = Di,
    serializeAttributes: i = $i,
    defaultAttributes: o = {},
    requiredAttributes: s = [],
    allowedAttributes: l
  } = n, a = t || e, c = (u) => {
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
        const f = new RegExp(`^:::${a}(?:\\s|$)`, "m"), h = (d = u.match(f)) == null ? void 0 : d.index;
        return h !== void 0 ? h : -1;
      },
      tokenize(u, d, f) {
        const h = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), p = u.match(h);
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
      const d = c(u.attrs || {}), f = i(d), h = f ? ` {${f}}` : "";
      return `:::${a}${h} :::`;
    }
  };
}
function Gd(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: i = Di,
    serializeAttributes: o = $i,
    defaultAttributes: s = {},
    content: l = "block",
    allowedAttributes: a
  } = n, c = t || e, u = (d) => {
    if (!a)
      return d;
    const f = {};
    return a.forEach((h) => {
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
        const h = new RegExp(`^:::${c}`, "m"), p = (f = d.match(h)) == null ? void 0 : f.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(d, f, h) {
        var p;
        const m = new RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), y = d.match(m);
        if (!y)
          return;
        const [x, w = ""] = y, k = i(w);
        let T = 1;
        const H = x.length;
        let D = "";
        const E = /^:::([\w-]*)(\s.*)?/gm, F = d.slice(H);
        for (E.lastIndex = 0; ; ) {
          const N = E.exec(F);
          if (N === null)
            break;
          const U = N.index, $ = N[1];
          if (!((p = N[2]) != null && p.endsWith(":::"))) {
            if ($)
              T += 1;
            else if (T -= 1, T === 0) {
              const j = F.slice(0, U);
              D = j.trim();
              const M = d.slice(0, H + U + N[0].length);
              let z = [];
              if (D)
                if (l === "block")
                  for (z = h.blockTokens(j), z.forEach((P) => {
                    P.text && (!P.tokens || P.tokens.length === 0) && (P.tokens = h.inlineTokens(P.text));
                  }); z.length > 0; ) {
                    const P = z[z.length - 1];
                    if (P.type === "paragraph" && (!P.text || P.text.trim() === ""))
                      z.pop();
                    else
                      break;
                  }
                else
                  z = h.inlineTokens(D);
              return {
                type: e,
                raw: M,
                attributes: k,
                content: D,
                tokens: z
              };
            }
          }
        }
      }
    },
    renderMarkdown: (d, f) => {
      const h = u(d.attrs || {}), p = o(h), m = p ? ` {${p}}` : "", y = f.renderChildren(d.content || [], `

`);
      return `:::${c}${m}

${y}

:::`;
    }
  };
}
function Qd(n) {
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
function Zd(n) {
  return Object.entries(n).filter(([, e]) => e != null).map(([e, t]) => `${e}="${t}"`).join(" ");
}
function eh(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: i = Qd,
    serializeAttributes: o = Zd,
    defaultAttributes: s = {},
    selfClosing: l = !1,
    allowedAttributes: a
  } = n, c = t || e, u = (f) => {
    if (!a)
      return f;
    const h = {};
    return a.forEach((p) => {
      const m = typeof p == "string" ? p : p.name, y = typeof p == "string" ? void 0 : p.skipIfDefault;
      if (m in f) {
        const x = f[m];
        if (y !== void 0 && x === y)
          return;
        h[m] = x;
      }
    }), h;
  }, d = c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
          const [, T] = y;
          w = T;
        } else {
          const [, T, H] = y;
          w = T, x = H || "";
        }
        const k = i(w.trim());
        return {
          type: e,
          raw: y[0],
          content: x.trim(),
          attributes: k
        };
      }
    },
    renderMarkdown: (f) => {
      let h = "";
      r ? h = r(f) : f.content && f.content.length > 0 && (h = f.content.filter((x) => x.type === "text").map((x) => x.text).join(""));
      const p = u(f.attrs || {}), m = o(p), y = m ? ` ${m}` : "";
      return l ? `[${c}${y}]` : `[${c}${y}]${h}[/${c}]`;
    }
  };
}
function th(n, e, t) {
  var r, i, o, s;
  const l = n.split(`
`), a = [];
  let c = "", u = 0;
  const d = e.baseIndentSize || 2;
  for (; u < l.length; ) {
    const f = l[u], h = f.match(e.itemPattern);
    if (!h) {
      if (a.length > 0)
        break;
      if (f.trim() === "") {
        u += 1, c = `${c}${f}
`;
        continue;
      } else
        return;
    }
    const p = e.extractItemData(h), { indentLevel: m, mainContent: y } = p;
    c = `${c}${f}
`;
    const x = [y];
    for (u += 1; u < l.length; ) {
      const H = l[u];
      if (H.trim() === "") {
        const E = l.slice(u + 1).findIndex((U) => U.trim() !== "");
        if (E === -1)
          break;
        if ((((i = (r = l[u + 1 + E].match(/^(\s*)/)) == null ? void 0 : r[1]) == null ? void 0 : i.length) || 0) > m) {
          x.push(H), c = `${c}${H}
`, u += 1;
          continue;
        } else
          break;
      }
      if ((((s = (o = H.match(/^(\s*)/)) == null ? void 0 : o[1]) == null ? void 0 : s.length) || 0) > m)
        x.push(H), c = `${c}${H}
`, u += 1;
      else
        break;
    }
    let w;
    const k = x.slice(1);
    if (k.length > 0) {
      const H = k.map((D) => D.slice(m + d)).join(`
`);
      H.trim() && (e.customNestedParser ? w = e.customNestedParser(H) : w = t.blockTokens(H));
    }
    const T = e.createToken(p, w);
    a.push(T);
  }
  if (a.length !== 0)
    return {
      items: a,
      raw: c
    };
}
function nh(n, e, t, r) {
  if (!n || !Array.isArray(n.content))
    return "";
  const i = typeof t == "function" ? t(r) : t, [o, ...s] = n.content, l = e.renderChildren([o]);
  let a = `${i}${l}`;
  return s && s.length > 0 && s.forEach((c, u) => {
    var d, f;
    const h = (f = (d = e.renderChild) == null ? void 0 : d.call(e, c, u + 1)) != null ? f : e.renderChildren([c]);
    if (h != null) {
      const p = h.split(`
`).map((m) => m ? e.indent(m) : e.indent("")).join(`
`);
      a += c.type === "paragraph" ? `

${p}` : `
${p}`;
    }
  }), a;
}
function _l(n, e) {
  const t = { ...n };
  return jn(n) && jn(e) && Object.keys(e).forEach((r) => {
    jn(e[r]) && jn(n[r]) ? t[r] = _l(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var Hl = class {
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
      ...ei(
        wn(this, "addOptions", {
          name: this.name
        })
      )
    };
  }
  get storage() {
    return {
      ...ei(
        wn(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      )
    };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => _l(this.options, n)
    });
    return e.name = this.name, e.parent = this.parent, this.child = null, e;
  }
  extend(n = {}) {
    const e = new this.constructor({ ...this.config, ...n });
    return e.parent = this, this.child = e, e.name = "name" in n ? n.name : e.parent.name, e;
  }
}, rh = class Wl extends Hl {
  constructor() {
    super(...arguments), this.type = "mark";
  }
  /**
   * Create a new Mark instance
   * @param config - Mark configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Wl(t);
  }
  static handleExit({ editor: e, mark: t }) {
    const { tr: r } = e.state, i = e.state.selection.$from;
    if (i.pos === i.end()) {
      const s = i.marks();
      if (!!!s.find((c) => (c == null ? void 0 : c.type.name) === t.name))
        return !1;
      const a = s.find((c) => (c == null ? void 0 : c.type.name) === t.name);
      return a && r.removeStoredMark(a), r.insertText(" ", i.pos), e.view.dispatch(r), !0;
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
}, ih = {};
Ri(ih, {
  ClipboardTextSerializer: () => oh,
  Commands: () => sh,
  Delete: () => lh,
  Drop: () => ah,
  Editable: () => ch,
  FocusEvents: () => uh,
  Keymap: () => fh,
  Paste: () => dh,
  Tabindex: () => hh,
  TextDirection: () => ph,
  focusEventsPluginKey: () => ql
});
var je = class jl extends Hl {
  constructor() {
    super(...arguments), this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new jl(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, oh = je.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new st({
        key: new Je("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = xd(t), { blockSeparator: s } = this.options, l = {
              ...s !== void 0 ? { blockSeparator: s } : {},
              textSerializers: o
            };
            return [...i.ranges].sort((c, u) => c.$from.pos - u.$from.pos).map(
              ({ $from: c, $to: u }) => yd(r, { from: c.pos, to: u.pos }, l)
            ).join(s ?? `

`);
          }
        }
      })
    ];
  }
}), sh = je.create({
  name: "commands",
  addCommands() {
    return {
      ...El
    };
  }
}), lh = je.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r, i;
    const o = () => {
      var s, l, a, c;
      if ((c = (a = (l = (s = this.editor.options.coreExtensionOptions) == null ? void 0 : s.delete) == null ? void 0 : l.filterTransaction) == null ? void 0 : a.call(l, n)) != null ? c : n.getMeta("y-sync$"))
        return;
      const u = pd(n.before, [
        n,
        ...e
      ]);
      wd(u).forEach((h) => {
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
        if (h instanceof Ke) {
          const x = f.slice(p).map(h.from, -1), w = f.slice(p).map(h.to), k = f.invert().map(x, -1), T = f.invert().map(w), H = x > 0 ? (m = u.doc.nodeAt(x - 1)) == null ? void 0 : m.marks.some((E) => E.eq(h.mark)) : !1, D = (y = u.doc.nodeAt(w)) == null ? void 0 : y.marks.some((E) => E.eq(h.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: h.mark,
            from: h.from,
            to: h.to,
            deletedRange: {
              from: k,
              to: T
            },
            newRange: {
              from: x,
              to: w
            },
            partial: !!(D || H),
            editor: this.editor,
            transaction: n,
            combinedTransform: u
          });
        }
      });
    };
    (i = (r = (t = this.editor.options.coreExtensionOptions) == null ? void 0 : t.delete) == null ? void 0 : r.async) == null || i ? setTimeout(o, 0) : o();
  }
}), ah = je.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new st({
        key: new Je("tiptapDrop"),
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
}), ch = je.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new st({
        key: new Je("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), ql = new Je("focusEvents"), uh = je.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new st({
        key: ql,
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
}), fh = je.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      // maybe convert first text block node to default node
      () => s.command(({ tr: l }) => {
        const { selection: a, doc: c } = l, { empty: u, $anchor: d } = a, { pos: f, parent: h } = d, p = d.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : d, m = p.parent.type.spec.isolating, y = d.pos - d.parentOffset, x = m && p.parent.childCount === 1 ? y === d.pos : Kt.atStart(c).from === f;
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
    return ur() || $l() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new st({
        key: new Je("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (n.some((m) => m.getMeta("composition")))
            return;
          const r = n.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = n.some(
            (m) => m.getMeta("preventClearDocument")
          );
          if (!r || i)
            return;
          const { empty: o, from: s, to: l } = e.selection, a = Kt.atStart(e.doc).from, c = Kt.atEnd(e.doc).to;
          if (o || !(s === a && l === c) || !Bl(t.doc))
            return;
          const f = t.tr, h = Tl({
            state: t,
            transaction: f
          }), { commands: p } = new xf({
            editor: this.editor,
            state: h
          });
          if (p.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), dh = je.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new st({
        key: new Je("tiptapPaste"),
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
}), hh = je.create({
  name: "tabindex",
  addOptions() {
    return {
      value: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new st({
        key: new Je("tabindex"),
        props: {
          attributes: () => {
            var n;
            return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) != null ? n : "0" };
          }
        }
      })
    ];
  }
}), ph = je.create({
  name: "textDirection",
  addOptions() {
    return {
      direction: void 0
    };
  },
  addGlobalAttributes() {
    if (!this.options.direction)
      return [];
    const { nodeExtensions: n } = Ll(this.extensions);
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
      new st({
        key: new Je("textDirection"),
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
const mh = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), gh = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), yh = /^(https?:\/\/|mailto:)/i;
function xh(n) {
  if (!n) return "";
  const e = [];
  for (const t of n.split(";")) {
    const r = t.indexOf(":");
    if (r < 0) continue;
    const i = t.slice(0, r).trim().toLowerCase(), o = t.slice(r + 1).trim();
    gh.has(i) && o && e.push(`${i}: ${o}`);
  }
  return e.join("; ");
}
function ti(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const a of Array.from(e.childNodes)) l.appendChild(ti(a));
    return l;
  };
  if (!mh.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!yh.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = xh(o || "");
  if (s && i.setAttribute("style", s), t === "span") {
    const l = e.getAttribute("data-text-style");
    l && i.setAttribute("data-text-style", l);
  }
  if (t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), a = e.getAttribute("rel");
    l && i.setAttribute("target", l), a && i.setAttribute("rel", a);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(ti(l));
  return i;
}
function Vl(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function bh(n) {
  const e = Vl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(ti(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Ap(n) {
  const e = Vl(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function zp(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function kh(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Oo(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const wh = { text: "#52525b" }, vh = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, a = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, c = (a == null ? void 0 : a.color) ?? wh, u = (a == null ? void 0 : a.label) ?? `{{${s}}}`, d = a == null ? void 0 : a.nested;
  return /* @__PURE__ */ g(
    pa,
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
        const m = i.state.doc.resolve(p), y = m.nodeAfter;
        y && Ut.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new Ut(m))), (x = l.onTokenClick) == null || x.call(l, s, h.currentTarget.getBoundingClientRect(), p);
      },
      children: d ? /* @__PURE__ */ g("span", { className: "rt-token-nested", children: u }) : u
    }
  );
}, Sh = Na.extend({
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
    return ha(vh);
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
}), Ch = 240, Th = 280, Eh = ({ props: n, onApi: e }) => {
  const t = dr(), r = v(e);
  r.current = e, Z(() => {
    r.current(t);
  }, [t]);
  const i = v(null);
  Z(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), Z(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = ui();
  return /* @__PURE__ */ g(Tn.Provider, { value: t, children: /* @__PURE__ */ g(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Th, maxHeight: Ch },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ g("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ g(
        Nh,
        {
          item: s,
          d: o,
          command: () => n.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Nh = ({ item: n, d: e, command: t }) => {
  const { myIndex: r, highlighted: i, setPointer: o } = ts({
    label: () => n.label,
    activate: t
  }), s = Ce(), l = { padding: `${A(8, 12, s)}px ${A(12, 16, s)}px`, fontSize: A(12, 14, s) };
  return /* @__PURE__ */ R(
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
}, Do = () => {
  let n = null;
  const e = (t) => {
    n && (n.props = t, n.holder.style.display = t.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ g(Eh, { props: t, onApi: (r) => {
        n.api = r;
      } })
    ));
  };
  return {
    onStart(t) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const i = Ma(r);
      n = { holder: r, root: i, unmount: null, props: t, api: null };
      const o = t.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: s, y: l, placement: a, strategy: c }) => {
          var f, h;
          if (!n) return;
          const u = (h = (f = n.props) == null ? void 0 : f.clientRect) == null ? void 0 : h.call(f), d = u && !a.endsWith("-end") ? u.width : 0;
          r.style.position = c, r.style.left = `${s + d}px`, r.style.top = `${l}px`;
        }
      });
      n.unmount = o, e(t);
    },
    onUpdate(t) {
      n && e(t);
    },
    onKeyDown({ event: t }) {
      if (!(n != null && n.props) || !n.api) return !1;
      const { items: r, command: i } = n.props;
      if (r.length === 0) return !1;
      const o = n.api, s = t.key;
      if (s === "ArrowDown" || s === "ArrowUp") {
        t.preventDefault();
        const l = o.highlightedIndex, a = s === "ArrowDown" ? 1 : -1;
        return o.setHighlighted((l + a + r.length) % r.length, "keyboard"), !0;
      }
      if (s === "Enter" || s === "Tab") {
        t.preventDefault();
        const l = o.highlightedIndex, a = l >= 0 ? l : 0, c = o.items[a];
        return c ? c.activate() : r[a] && i({ field: r[a].key }), !0;
      }
      return !1;
    },
    onExit() {
      var t;
      n && ((t = n.unmount) == null || t.call(n), n.root.unmount(), n.holder.remove(), n = null);
    }
  };
}, Mh = rh.create({
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
}), Yn = new Je("retainedSelectionHighlight"), Ah = je.create({
  name: "retainedSelectionHighlight",
  addProseMirrorPlugins() {
    return [
      new st({
        key: Yn,
        state: {
          init: () => ({ held: !1, decorations: be.empty }),
          apply(n, e) {
            const t = n.getMeta(Yn), r = t ? t.held : e.held;
            if (!r) return { held: !1, decorations: be.empty };
            const { from: i, to: o, empty: s } = n.selection;
            return {
              held: r,
              decorations: s ? be.empty : be.create(n.doc, [Ge.inline(i, o, { class: "rt-retained-selection" })])
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
}), Rp = {
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
function zh(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = Kl(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Rh = Rt.forwardRef(({
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
}, d) => {
  const f = v(s);
  f.current = s;
  const h = v(l);
  h.current = l;
  const p = v(a);
  p.current = a;
  const m = v(c);
  m.current = c;
  const y = v(u);
  y.current = u;
  const x = v(null), w = v(null), k = v(e);
  k.current = e;
  const T = v(r);
  T.current = r;
  const H = v(o);
  H.current = o;
  const D = v(null), E = (j) => {
    var G;
    const M = j.getAttributes("textStyle"), z = j.getAttributes("reportTextStyle"), { from: P, to: L, empty: te } = j.state.selection;
    let ae = !1, Te = !1, re = !1;
    if (!te) {
      const K = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Set(), ee = /* @__PURE__ */ new Set();
      j.state.doc.nodesBetween(P, L, (q) => {
        if (!q.isText) return;
        const ge = q.marks.find((Q) => Q.type.name === "textStyle");
        K.add((ge == null ? void 0 : ge.attrs.fontFamily) || ""), S.add((ge == null ? void 0 : ge.attrs.fontSize) || "");
        const _ = q.marks.find((Q) => Q.type.name === "reportTextStyle");
        ee.add((_ == null ? void 0 : _.attrs.styleId) || "");
      }), ae = K.size > 1, Te = S.size > 1, re = ee.size > 1;
    }
    const ne = {
      bold: j.isActive("bold"),
      italic: j.isActive("italic"),
      underline: j.isActive("underline"),
      strike: j.isActive("strike"),
      link: j.isActive("link"),
      color: M.color || "",
      fontFamily: M.fontFamily || "",
      fontSize: M.fontSize || "",
      textStyle: z.styleId || "",
      hasSelection: !te,
      fontFamilyMixed: ae,
      fontSizeMixed: Te,
      textStyleMixed: re
    }, I = D.current;
    I && I.bold === ne.bold && I.italic === ne.italic && I.underline === ne.underline && I.strike === ne.strike && I.link === ne.link && I.color === ne.color && I.fontFamily === ne.fontFamily && I.fontSize === ne.fontSize && I.textStyle === ne.textStyle && I.hasSelection === ne.hasSelection && I.fontFamilyMixed === ne.fontFamilyMixed && I.fontSizeMixed === ne.fontSizeMixed && I.textStyleMixed === ne.textStyleMixed || (D.current = ne, (G = H.current) == null || G.call(H, ne));
  }, F = (j) => {
    var te;
    const M = j.state.selection;
    let z = null;
    M instanceof Ut && M.node.type.name === "token" ? (z = { key: M.node.attrs.field ?? "", pos: M.from }, x.current = M.from) : x.current != null && (x.current = j.state.tr.mapping.map(x.current));
    const P = w.current, L = P && z && P.key === z.key && P.pos === z.pos;
    !P && !z || L || (w.current = z, (te = y.current) == null || te.call(y, z));
  }, N = (j) => {
    const M = bh(kh(j));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(M) ? "" : M;
  }, U = Rt.useMemo(() => {
    const j = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: P }) => {
        var L;
        return ((L = h.current) == null ? void 0 : L.call(h, P)) ?? [];
      },
      command: ({ editor: P, range: L, props: te }) => {
        P.chain().focus().insertContentAt(L, { type: "token", attrs: { field: te.field } }).run();
      },
      render: Do
    }, M = Sh.configure({
      resolve: f.current ?? null,
      suggestion: j,
      onTokenClick: (P, L, te) => {
        var ae;
        x.current = te, (ae = m.current) == null || ae.call(m, P, L, te);
      }
    }), z = je.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Ea({
            pluginKey: new Je("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: P, range: L }) => Kl(P, L.from) != null,
            items: ({ editor: P, query: L }) => {
              var ae;
              const te = zh(P);
              return te ? ((ae = p.current) == null ? void 0 : ae.call(p, te.chipKey, L)) ?? [] : [];
            },
            command: ({ editor: P, range: L, props: te }) => {
              P.chain().focus().insertContentAt(L, { type: "token", attrs: { field: te.field } }).run();
            },
            render: Do
          })
        ];
      }
    });
    return [M, z];
  }, []), $ = ma({
    immediatelyRender: !1,
    extensions: [
      xa,
      ba.configure({ placeholder: t }),
      ka,
      wa,
      va,
      Mh,
      Ah,
      Sa,
      Ta,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Ca.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...U
    ],
    content: Oo(n || ""),
    editable: !r,
    onUpdate: ({ editor: j }) => {
      k.current(N(j.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: j }) => {
      E(j), F(j);
    }
  });
  return Z(() => {
    if (!$ || $.isFocused) return;
    N($.getHTML()) !== n && (D.current = null, $.commands.setContent(Oo(n || ""), { emitUpdate: !1 }), E($));
  }, [n, $]), Z(() => {
    $ && $.setEditable(!r);
  }, [r, $]), Z(() => {
    $ && (D.current = null, E($), F($));
  }, [$]), Gl(d, () => ({
    exec: (j, M, z) => {
      if (!$ || T.current) return;
      const P = $.chain(), L = (z == null ? void 0 : z.focus) === !1 ? P : P.focus();
      switch (j) {
        case "bold":
          L.toggleBold().run();
          break;
        case "italic":
          L.toggleItalic().run();
          break;
        case "underline":
          L.toggleUnderline().run();
          break;
        case "strikeThrough":
          L.toggleStrike().run();
          break;
        case "foreColor":
          M && L.setColor(M).run();
          break;
        case "unsetColor":
          L.unsetColor().run();
          break;
        case "fontFamily":
          M && L.setFontFamily(M).run();
          break;
        case "unsetFontFamily":
          L.unsetFontFamily().run();
          break;
        case "fontSize":
          M && L.setFontSize(M).run();
          break;
        case "unsetFontSize":
          L.unsetFontSize().run();
          break;
        // Linked named style: mark the run with the consumer's style id. Direct
        // font family/size on the range is cleared so the linked style's
        // typography takes effect (the object-level precedent); bold/italic
        // marks stay — direct character formatting still wins (Word).
        case "textStyle":
          M && L.setMark("reportTextStyle", { styleId: M }).unsetFontFamily().unsetFontSize().run();
          break;
        case "unsetTextStyle":
          L.unsetMark("reportTextStyle").run();
          break;
        // Clear every inline mark (bold/italic/underline/strike/color/font/
        // link) and normalize the block — the cell-chrome Reset path.
        case "clearFormatting":
          L.unsetAllMarks().clearNodes().run();
          break;
        case "link":
          M && L.extendMarkRange("link").setLink({ href: M }).run();
          break;
        case "unlink":
          L.extendMarkRange("link").unsetLink().run();
          break;
      }
    },
    focus: () => $ == null ? void 0 : $.commands.focus(),
    insertToken: (j) => {
      !$ || T.current || $.chain().focus().insertContent({ type: "token", attrs: { field: j } }).run();
    },
    replaceToken: (j) => {
      if (!$ || T.current) return;
      const M = x.current;
      M != null && $.commands.command(({ tr: z }) => {
        const P = z.doc.nodeAt(M);
        if (!P || P.type.name !== "token") return !1;
        z.setNodeMarkup(M, void 0, { field: j });
        const L = z.doc.resolve(M);
        return L.nodeAfter && L.nodeAfter.type.name === "token" && z.setSelection(new Ut(L)), !0;
      });
    },
    holdSelectionHighlight: (j) => {
      !$ || $.isDestroyed || $.view.dispatch($.state.tr.setMeta(Yn, { held: j }));
    }
  }), [$]), /* @__PURE__ */ g(ga, { editor: $, className: `richtext-editor ${i || ""}` });
});
Rh.displayName = "RichTextEditor";
const Ih = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Oh = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], $o = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ g("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ g("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Dh = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = X(!1);
  return /* @__PURE__ */ g(
    hr,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ R("button", { type: "button", disabled: e, className: `${uc} w-28 justify-between`, children: [
        r ? /* @__PURE__ */ g("span", { className: "truncate italic text-zinc-500", children: "Mixed" }) : /* @__PURE__ */ g("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ g(ni, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Ih.map((s) => /* @__PURE__ */ g(Ha, { onClick: () => {
        t(s), o(!1);
      }, icon: !r && s === n ? /* @__PURE__ */ g(Lo, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ g("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, $h = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = X(!1), o = pr(), [s, l] = X(""), a = () => {
    var u;
    const c = s.trim();
    c && ((u = n.current) == null || u.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ g(
    hr,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ g(
        tt,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (c) => c.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ g(la, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ R("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ g(
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
            className: ac + " w-full"
          }
        ),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ g(tt, { theme: "dark", onClick: a, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ g(
            tt,
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
}, Ip = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSizeSlot: s, showClearFormatting: l }) => {
  const [a, c] = X(!1), u = (h, p) => {
    var m;
    return (m = n.current) == null ? void 0 : m.exec(h, p);
  }, d = pr(), f = (h) => !!(r != null && r[h]);
  return /* @__PURE__ */ R("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ g(Wt, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ g(tt, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || f("bold"), disabled: e || f("bold"), onMouseDown: (h) => h.preventDefault(), onClick: () => u("bold"), style: { ...d.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
    /* @__PURE__ */ g(Wt, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ g(tt, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || f("italic"), disabled: e || f("italic"), onMouseDown: (h) => h.preventDefault(), onClick: () => u("italic"), style: { ...d.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
    /* @__PURE__ */ g(Wt, { content: "Underline", children: /* @__PURE__ */ g(tt, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (h) => h.preventDefault(), onClick: () => u("underline"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ g(ia, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ g(Wt, { content: "Strikethrough", children: /* @__PURE__ */ g(tt, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (h) => h.preventDefault(), onClick: () => u("strikeThrough"), style: { ...d.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ g(oa, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ g("div", { className: ln }),
    /* @__PURE__ */ g($h, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }),
    /* @__PURE__ */ g("div", { className: ln }),
    /* @__PURE__ */ g(
      hr,
      {
        open: a,
        onOpenChange: c,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ R(tt, { theme: "dark", disabled: e, style: d.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ g("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ g($o, {}),
          /* @__PURE__ */ g(ni, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ g(
            "button",
            {
              onClick: () => {
                u("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ g($o, { className: "w-3.5 h-3.5" })
            }
          ),
          Oh.map((h) => /* @__PURE__ */ g(
            "button",
            {
              onClick: () => {
                u("foreColor", h), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${h === (t == null ? void 0 : t.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: h },
              title: h
            },
            h
          ))
        ] })
      }
    ),
    (o || s || l) && /* @__PURE__ */ R(rt, { children: [
      /* @__PURE__ */ g("div", { className: ln }),
      o && /* @__PURE__ */ g(Dh, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
      s,
      l && /* @__PURE__ */ g(Wt, { content: "Clear formatting", children: /* @__PURE__ */ g(
        tt,
        {
          theme: "dark",
          "aria-label": "Clear formatting",
          disabled: e,
          onMouseDown: (h) => h.preventDefault(),
          onClick: () => u("clearFormatting"),
          style: { ...d.toggle, padding: 0 },
          className: "justify-center",
          children: /* @__PURE__ */ g(sa, { className: "w-3 h-3" })
        }
      ) })
    ] }),
    i && /* @__PURE__ */ R(rt, { children: [
      /* @__PURE__ */ g("div", { className: ln }),
      i
    ] })
  ] });
};
function Op({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: a = "", dataProps: c, children: u }) {
  const d = Ce(), f = Tt({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), h = A(14, 16, d), p = { width: h, height: h }, m = A(10, 12, d);
  return /* @__PURE__ */ R("div", { ...c, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: f, children: [
      /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ g(Gn, { className: "text-zinc-400 shrink-0", style: p }) : /* @__PURE__ */ g(ni, { className: "text-zinc-400 shrink-0", style: p }),
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
  tt as Button,
  Op as CardSection,
  is as CheckMark,
  Ya as Checkbox,
  gp as Checklist,
  Np as ChromeHeader,
  Ep as ContentRow,
  ip as ContextMenu,
  sp as ContextMenuDivider,
  op as ContextMenuItem,
  lp as ContextMenuSub,
  Uo as DROPDOWN_MAX_HEIGHT,
  mp as DatePicker,
  fp as DialogProvider,
  Ha as DropdownItem,
  hr as DropdownMenu,
  Wa as DropdownSubmenu,
  ci as DropdownThemeContext,
  Ih as FONTS,
  xp as FloatingChrome,
  Dh as FontMenu,
  Ip as FormatToolbar,
  Me as IS_COARSE,
  za as IS_TOUCH_CAPABLE,
  rp as ItemManagerDropdown,
  hp as LongPressMenuProvider,
  oi as MORPH_EASE,
  Xt as MORPH_MS,
  si as MORPH_OPACITY_MS,
  Tn as MenuHighlightContext,
  es as MenuSearchContext,
  qa as Modal,
  ap as ModalFooter,
  $n as ModalFooterButton,
  Aa as PopoutWindowContext,
  Rp as RICH_TEXT_STATE_IDLE,
  yp as RadioList,
  Rh as RichTextEditor,
  Tp as SectionHeader,
  Cp as Seg,
  Mp as StructureControls,
  fi as SubmenuContext,
  sc as TB_BTN,
  Pn as TB_BTN_ICON,
  lc as TB_DANGER,
  ln as TB_DIVIDER,
  ac as TB_INPUT,
  Sp as TB_NUM,
  uc as TB_PICKER,
  bp as TB_ROW_LABEL,
  cc as TB_SEG,
  kp as TB_TOGGLE,
  vp as TB_TOGGLE_OFF,
  wp as TB_TOGGLE_ON,
  Sh as Token,
  vh as TokenChipView,
  Ln as ToolButton,
  Wt as Tooltip,
  li as ZOOM_FROM,
  Da as cloneOverlayClose,
  A as coarsePx,
  zp as escapeHtml,
  qo as getCoarseScale,
  ui as getDropdownClasses,
  tp as getHardwareKeyboard,
  ep as getLastPointerType,
  cp as inputCls,
  tc as isInteractiveElement,
  Br as isTouchLike,
  Jo as nearestOverlayOrigin,
  Vl as normalizeSpaces,
  Sr as overlayMorphEnabled,
  Oa as playOverlayClose,
  Ia as playOverlayOpen,
  Oo as preprocessTokenHtml,
  bh as sanitizeRichText,
  Qh as setCoarseScale,
  Ap as stripRichText,
  kh as stripTokenWrappers,
  Zh as useCoarse,
  Ce as useCoarseScale,
  Tt as useCoarseSize,
  jo as useCurrentDocument,
  Sn as useCurrentWindow,
  up as useDialog,
  Pa as useDropdownPosition,
  Go as useDropdownTheme,
  np as useHardwareKeyboard,
  Ua as useInputSize,
  Qo as useItemSize,
  Ra as useLastPointerType,
  dp as useLongPressOptOut,
  di as useMenuHighlight,
  Fa as useMenuSearch,
  ai as useOverlayMorph,
  ii as usePopoutWindow,
  vn as usePortalTarget,
  pp as useTouchMode
};
