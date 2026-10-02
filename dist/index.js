"use client";
import { jsxs as R, jsx as g, Fragment as Ue } from "react/jsx-runtime";
import mt, { createContext as Dt, useContext as Pt, useState as Y, useEffect as Q, useRef as k, useCallback as re, useLayoutEffect as qe, useMemo as vn, useImperativeHandle as ls } from "react";
import * as ce from "@radix-ui/react-dropdown-menu";
import { Search as cs, X as kn, Check as vi, Pencil as as, Copy as ki, Trash2 as er, RotateCcw as Si, Plus as us, ChevronRight as Sn, ChevronLeft as fs, ArrowUp as ds, ArrowDown as hs, ChevronDown as fr, Underline as ps, Strikethrough as ms, RemoveFormatting as gs, Link as ys } from "lucide-react";
import { computePosition as xs, offset as Ci, flip as Ei, shift as Ti, size as ws, useFloating as bs, autoUpdate as vs } from "@floating-ui/react-dom";
import * as tt from "@radix-ui/react-dialog";
import { createPortal as dr } from "react-dom";
import { mergeAttributes as ks, ReactNodeViewRenderer as Ss, NodeViewWrapper as Cs, useEditor as Es, EditorContent as Ts } from "@tiptap/react";
import { PluginKey as Ke, Plugin as ot, Selection as Tt, TextSelection as Le, AllSelection as Ms, NodeSelection as zt } from "@tiptap/pm/state";
import Ns from "@tiptap/starter-kit";
import As from "@tiptap/extension-placeholder";
import { TextStyle as zs, FontFamily as Rs, FontSize as Is } from "@tiptap/extension-text-style";
import $s from "@tiptap/extension-color";
import Os from "@tiptap/extension-link";
import Ds from "@tiptap/extension-underline";
import Ps from "@tiptap/suggestion";
import { Mention as Ls } from "@tiptap/extension-mention";
import { createRoot as Bs } from "react-dom/client";
const Fs = Dt(null);
function hr() {
  return Pt(Fs);
}
function en() {
  const n = hr();
  return n ? n.document.body : null;
}
function Mi() {
  const n = hr();
  return n ? n.document : typeof document < "u" ? document : null;
}
function tn() {
  return hr() ?? (typeof window < "u" ? window : null);
}
const nn = typeof window < "u", Ee = nn && window.matchMedia("(pointer: coarse)").matches, _s = nn && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let $n = 0.5;
const Vt = /* @__PURE__ */ new Set();
function mf(n) {
  $n = Math.max(0, Math.min(1, n)), Vt.forEach((e) => e());
}
function Ni() {
  return $n;
}
function gf() {
  const [, n] = Y(0);
  return Q(() => {
    const e = () => n((t) => t + 1);
    return Vt.add(e), () => {
      Vt.delete(e);
    };
  }, []), Ee && $n > 0;
}
function ke() {
  const [, n] = Y(0);
  return Q(() => {
    const e = () => n((t) => t + 1);
    return Vt.add(e), () => {
      Vt.delete(e);
    };
  }, []), $n;
}
function A(n, e, t) {
  return Ee ? Math.round(n + (e - n) * t) : n;
}
function dt(n, e) {
  const t = ke();
  return Ee && t > 0 ? {
    padding: `${A(n.py, e.py, t)}px ${A(n.px, e.px, t)}px`,
    fontSize: `${A(n.fs, e.fs, t)}px`
  } : { padding: `${n.py}px ${n.px}px`, fontSize: `${n.fs}px` };
}
function tr(n) {
  return n === "touch" || n === "pen";
}
let Et = null;
const nr = /* @__PURE__ */ new Set();
nn && window.addEventListener("pointerdown", (n) => {
  Et = n.pointerType, nr.forEach((e) => e());
}, !0);
function yf() {
  return Et;
}
function Hs() {
  const [, n] = Y(0), e = k(Et);
  return Q(() => {
    const t = () => {
      e.current !== Et && (e.current = Et, n((r) => r + 1));
    };
    return nr.add(t), () => {
      nr.delete(t);
    };
  }, []), Et;
}
const Ai = ["(any-hover: hover)", "(any-pointer: fine)"];
function zi() {
  return nn ? Ai.some((n) => window.matchMedia(n).matches) : !1;
}
let Cn = zi();
const rr = /* @__PURE__ */ new Set();
function qr(n) {
  Cn !== n && (Cn = n, rr.forEach((e) => e()));
}
var bi;
if (nn) {
  const n = () => qr(zi());
  for (const s of Ai) {
    const l = window.matchMedia(s);
    (bi = l.addEventListener) == null || bi.call(l, "change", n);
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
function xf() {
  return Cn;
}
function wf() {
  const [, n] = Y(0);
  return Q(() => {
    const e = () => n((t) => t + 1);
    return rr.add(e), () => {
      rr.delete(e);
    };
  }, []), Cn;
}
const Rt = 220, pr = "cubic-bezier(0.32, 0.72, 0, 1)", mr = 170, gr = 0.94;
function Wn(n) {
  return n === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ri(n, e) {
  const t = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: t < n.left ? 0 : t > n.left + n.width ? 1 : 0.5,
    y: r < n.top ? 0 : r > n.top + n.height ? 1 : 0.5
  };
}
function Ii(n, e) {
  const t = (e == null ? void 0 : e()) ?? null;
  if (!t) return { x: 0.5, y: 0.5 };
  const r = n.getBoundingClientRect();
  return Ri({ left: r.left, top: r.top, width: r.width, height: r.height }, t);
}
function Ws(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${gr})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    n.current === i && requestAnimationFrame(() => {
      if (n.current !== i) return;
      const s = Ii(e, t);
      e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transition = `transform ${Rt}ms ${pr}, opacity ${mr}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        n.current === i && (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, r == null || r());
      }, Rt + 60);
    });
  });
}
function js(n, e, t, r) {
  const i = ++n.current, o = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, s = Ii(e, t);
  e.style.transition = `transform ${Rt}ms ${pr}, opacity ${mr}ms ease`, e.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, e.style.transform = `scale(${gr})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    n.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      n.current !== i || e.isConnected || (e.style.transition = o.transition, e.style.transform = o.transform, e.style.transformOrigin = o.transformOrigin, e.style.opacity = o.opacity, e.style.pointerEvents = o.pointerEvents, e.style.visibility = o.visibility);
    }));
  }, Rt + 60);
}
function Js(n, e, t) {
  const r = n.cloneNode(!0), i = n.getBoundingClientRect(), o = i.width > 0 || i.height > 0 ? i : t ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (e == null ? void 0 : e()) ?? null, l = s ? Ri({ left: o.left, top: o.top, width: o.width, height: o.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, n.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Rt}ms ${pr}, opacity ${mr}ms ease`, r.style.transform = `scale(${gr})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Rt + 60));
    });
  });
}
function yr(n) {
  const e = k(null), [t, r] = Y(!1), i = k(null), o = k(0), s = re((p) => {
    if (n.ref && (n.ref.current = p), p) {
      o.current = 0, e.current = p;
      const x = p.getBoundingClientRect();
      (x.width > 0 || x.height > 0) && (i.current = { left: x.left, top: x.top, width: x.width, height: x.height }), r(!0);
      return;
    }
    const m = e.current, y = ++o.current;
    queueMicrotask(() => {
      y === o.current && e.current === m && (e.current = null, r(!1), !(!m || !n.cloneOnUnmount || !c.current) && m.style.visibility !== "hidden" && Wn(f.current) && Js(m, u.current, i.current));
    });
  }, []), l = re(() => {
    const p = e.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const m = p.getBoundingClientRect();
    (m.width > 0 || m.height > 0) && (i.current = { left: m.left, top: m.top, width: m.width, height: m.height });
  }, []), c = k(n.visible);
  c.current = n.visible;
  const a = k(n.visible), u = k(n.anchor ?? null);
  u.current = n.anchor ?? null;
  const h = k(n.onClosed);
  h.current = n.onClosed;
  const f = k(n.morph !== !1);
  f.current = n.morph !== !1;
  const d = k(0);
  return qe(() => {
    if (!t || !c.current || !Wn(f.current)) return;
    const p = e.current;
    p && Ws(d, p, u.current);
  }, [t, n.visible]), Q(() => {
    if (!t || !c.current) return;
    let p = 0;
    const m = () => {
      p = 0, l(), p = requestAnimationFrame(m);
    };
    return p = requestAnimationFrame(m), () => {
      p && cancelAnimationFrame(p);
    };
  }, [t, l]), qe(() => {
    var y;
    const p = a.current;
    if (a.current = n.visible, n.visible || !p) return;
    const m = e.current;
    if (!m || !Wn(f.current)) {
      (y = h.current) == null || y.call(h);
      return;
    }
    js(d, m, u.current, () => {
      var x;
      return (x = h.current) == null ? void 0 : x.call(h);
    });
  }, [n.visible]), Q(() => {
    if (!t || !c.current) return;
    const p = (m) => {
      const y = e.current;
      y && y.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [t]), Q(() => {
    if (!t || !c.current) return;
    const p = (m) => {
      const y = e.current;
      y && y.contains(m.target) && m.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [t]), s;
}
const $i = 384;
function qs(n) {
  const e = n.visualViewport;
  return e ? { x: e.offsetLeft, y: e.offsetTop, width: e.width, height: e.height } : { x: 0, y: 0, width: n.innerWidth, height: n.innerHeight };
}
function Ks({
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
  const a = tn(), u = k(a);
  u.current = a;
  const h = k(c);
  h.current = c, qe(() => {
    if (!t) return;
    let f = 0, d = !1;
    const p = () => {
      f || (f = requestAnimationFrame(m));
    }, m = () => {
      if (f = 0, d) return;
      const B = u.current, I = n.current, E = e.current;
      if (!B || !I || !E || !E.isConnected) return;
      const D = (r == null ? void 0 : r.current) ?? E, T = qs(B), U = s ?? $i, N = Math.min(l, U), W = Math.max(0, E.offsetHeight - D.offsetHeight), z = Math.max(N, Math.ceil(D.scrollHeight + W)), O = Math.min(z, U);
      E.style.maxHeight = `${O}px`;
      let P = O;
      xs(I, E, {
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [
          Ci(i),
          Ei({ boundary: T, padding: o, fallbackStrategy: "bestFit" }),
          Ti({ boundary: T, padding: o, mainAxis: !1 }),
          ws({
            boundary: T,
            padding: o,
            apply({ availableHeight: j }) {
              P = Math.max(N, Math.floor(Math.min(U, j))), E.style.maxHeight = `${P}px`;
            }
          })
        ]
      }).then(({ x: j, y: te, placement: se }) => {
        d || h.current({
          top: Math.round(te),
          left: Math.round(j),
          maxH: P,
          side: se.startsWith("top") ? "top" : "bottom",
          ready: !0
        });
      });
    };
    m();
    const y = u.current, x = (y == null ? void 0 : y.document) ?? null, v = (y == null ? void 0 : y.visualViewport) ?? null, b = () => p();
    v == null || v.addEventListener("resize", b), v == null || v.addEventListener("scroll", b), y == null || y.addEventListener("resize", b), x == null || x.addEventListener("scroll", b, { capture: !0, passive: !0 });
    let C = null;
    return typeof ResizeObserver < "u" && (C = new ResizeObserver(b), e.current && C.observe(e.current), r != null && r.current && C.observe(r.current)), () => {
      d = !0, f && cancelAnimationFrame(f), v == null || v.removeEventListener("resize", b), v == null || v.removeEventListener("scroll", b), y == null || y.removeEventListener("resize", b), x == null || x.removeEventListener("scroll", b, { capture: !0 }), C == null || C.disconnect();
    };
  }, [t, n, e, r, i, o, s, l]);
}
let vt = null;
function Oi(n) {
  return vt == null || vt(), vt = n, () => {
    vt === n && (vt = null);
  };
}
const xr = Dt("dark"), Di = () => Pt(xr);
function Pi() {
  const n = ke();
  return {
    padding: `${A(8, 12, n)}px ${A(12, 16, n)}px`,
    fontSize: `${A(12, 14, n)}px`,
    lineHeight: `${A(18, 22, n)}px`
  };
}
const Vs = (n) => n ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Kr = (n) => n ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Ys = (n) => n ? "text-xs" : "text-[10px]";
function wr(n) {
  const e = Ee && Ni() > 0;
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
    headerPad: Kr(e),
    headerText: `${Kr(e)} font-semibold uppercase tracking-wider ${Ys(e)} ui-label`,
    // Item padding
    itemPad: Vs(e),
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
function Li(n) {
  const e = [];
  return mt.Children.forEach(n, (t) => {
    if (typeof t == "string" || typeof t == "number")
      e.push(String(t));
    else if (mt.isValidElement(t)) {
      const r = t.props.children;
      (typeof r == "string" || typeof r == "number") && e.push(String(r));
    }
  }), e.join(" ").trim();
}
const br = Dt({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), rn = Dt(null), vr = () => Pt(rn), Bi = Dt({ query: "", setQuery: () => {
} }), Us = () => Pt(Bi), Xs = () => !0;
function On(n) {
  const e = k([]), [t, r] = Y(-1), [i, o] = Y(!1), [s, l] = Y(0), c = re((f) => (e.current = [...e.current, f], l((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== f), l((d) => d + 1);
  }), []), a = re((f, d) => {
    r(f), o(d === "pointer");
  }, []), u = re(() => {
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
function Fi(n) {
  const e = vr(), t = k(e);
  t.current = e;
  const r = k(null);
  Q(() => {
    var c;
    const l = { label: n.label(), activate: n.activate };
    return r.current = l, (c = t.current) == null ? void 0 : c.register(l);
  }, []);
  const i = e && r.current ? e.items.indexOf(r.current) : -1, o = !!e && !n.disabled && i >= 0 && i === e.highlightedIndex;
  return { api: e, myIndex: i, highlighted: o, setPointer: (l) => {
    !n.disabled && e && l >= 0 && e.setHighlighted(l, "pointer");
  } };
}
function kr(n, e, t, r) {
  const i = k(-1);
  i.current = e.highlightedIndex;
  const o = k(e);
  o.current = e;
  const s = k(n);
  s.current = n;
  const l = k(r);
  l.current = r;
  const c = k({ text: "", time: 0 }), a = k(!1);
  a.current || (a.current = !0, t.current = (u) => {
    var p, m, y, x, v;
    if (!s.current) return;
    const h = u.target;
    if (!!h && !!h.closest("input, textarea, [contenteditable]") && (u.key.length === 1 || u.key === "Enter" || u.key === "Escape")) {
      const b = (m = (p = l.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : m.call(p, u);
      (!!((y = l.current) != null && y.onFieldKey) || o.current.items.length > 0) && (u.stopImmediatePropagation(), b && u.preventDefault());
      return;
    }
    const d = o.current.items;
    if (d.length !== 0) {
      if (u.key === "ArrowDown" || u.key === "ArrowUp") {
        u.preventDefault(), u.stopImmediatePropagation();
        const b = u.key === "ArrowDown" ? 1 : -1, C = (i.current + b + d.length) % d.length;
        o.current.setHighlighted(C, "keyboard");
      } else if (u.key === "ArrowRight") {
        u.preventDefault(), u.stopImmediatePropagation();
        const b = i.current;
        b >= 0 && b < d.length && d[b].submenu && d[b].activate();
      } else if (u.key === "ArrowLeft")
        u.preventDefault(), u.stopImmediatePropagation(), (v = (x = l.current) == null ? void 0 : x.onCloseSub) == null || v.call(x);
      else if (u.key === "Enter" || u.key === " ") {
        u.preventDefault(), u.stopImmediatePropagation();
        const b = i.current;
        b >= 0 && b < d.length && d[b].activate();
      } else if (u.key.length === 1 && !u.ctrlKey && !u.metaKey && !u.altKey) {
        u.preventDefault(), u.stopImmediatePropagation();
        const b = Date.now(), C = (b - c.current.time > 500 ? "" : c.current.text) + u.key.toLowerCase();
        if (c.current = { text: C, time: b }, !C) return;
        const B = i.current + 1;
        for (let I = 0; I < d.length; I++) {
          const E = (B + I) % d.length;
          if (d[E].label.toLowerCase().startsWith(C)) {
            o.current.setHighlighted(E, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Sr(n, e, t, r, i, o, s) {
  const l = k(e);
  l.current = e;
  const c = k(n);
  c.current = n;
  const a = k(i);
  a.current = i;
  const u = k(s == null ? void 0 : s.ignoreFields);
  u.current = s == null ? void 0 : s.ignoreFields;
  const h = k(!1);
  h.current || (h.current = !0, o.current = (f) => {
    if (!c.current || a.current) return;
    const d = r.current;
    if (d && d.contains(f.target)) return;
    if (u.current) {
      const m = f.target;
      if (m && m.closest("input, textarea, [contenteditable]")) return;
    }
    l.current.items.length === 0 || !(f.key === "ArrowDown" || f.key === "ArrowUp" || f.key === "ArrowLeft" || f.key === "ArrowRight" || f.key === "Enter" || f.key === " " || f.key.length === 1 && !f.ctrlKey && !f.metaKey && !f.altKey) || (f.preventDefault(), f.stopImmediatePropagation(), t.current(f));
  });
}
function Cr(n, e) {
  const t = k(n);
  t.current = n;
  const r = k(!1);
  r.current || (r.current = !0, e.current = (i) => {
    if (!t.current) return;
    const o = i.currentTarget, s = o.querySelector("[data-menu-items]") ?? o;
    s.scrollHeight > s.clientHeight && (i.preventDefault(), s.scrollTop += i.deltaY);
  });
}
function Dn({
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
  initialHighlightIndex: h,
  searchable: f = !1,
  searchPlaceholder: d,
  searchFilter: p,
  searchValue: m,
  onSearchValueChange: y
}) {
  const [x, v] = Y([]), [b, C] = Y(null), B = en(), I = Mi(), E = k(null), D = k(null), T = k(n);
  T.current = n;
  const [U, N] = Y(n), [W, z] = Y(""), O = f && m !== void 0, P = O ? m : W, j = O ? y ?? (() => {
  }) : z, [te, se] = Y(!1), le = O && !te ? "" : P, X = k(null), be = ke(), H = {
    padding: `${A(8, 12, be)}px ${A(12, 16, be)}px`,
    fontSize: `${A(12, 14, be)}px`
  }, [G, q] = Y(0), S = f && !O;
  Q(() => {
    var De;
    if (!S || !n) return;
    const $ = (De = D.current) == null ? void 0 : De.querySelector("[data-menu-items]");
    if (!$) return;
    const V = () => q($.offsetWidth - $.clientWidth);
    V();
    const fe = new ResizeObserver(V);
    return fe.observe($), () => fe.disconnect();
  }, [n, S, P]);
  const Z = vn(() => {
    if (!f) return;
    const $ = le.trim().toLowerCase();
    return $ ? (V) => p ? p($, V.label) : V.label.toLowerCase().includes($) : Xs;
  }, [le, f, p]), K = On(Z);
  Q(() => {
    if (n)
      return N(!0), O || z(""), se(!1), K.setHighlighted(h ?? -1, "keyboard"), Oi(() => {
        t == null || t(!1), e == null || e();
      });
    v([]), se(!1);
  }, [n, h, t, e]), Q(() => {
    if (!n || !I) return;
    const $ = (V) => {
      if (V.pointerType !== "touch") return;
      const fe = V.target;
      fe && (D.current && D.current.contains(fe) || E.current && E.current.contains(fe) || fe instanceof Element && fe.closest("[data-radix-menu-content]") || (t == null || t(!1), e == null || e()));
    };
    return I.addEventListener("pointerdown", $, { capture: !0 }), () => I.removeEventListener("pointerdown", $, { capture: !0 });
  }, [n, I, t, e]);
  const ze = re(() => {
    const $ = E.current;
    if (!$) return null;
    const V = $.getBoundingClientRect();
    return { left: V.left, top: V.top, width: V.width, height: V.height };
  }, []), F = yr({
    visible: n,
    morph: c,
    anchor: ze,
    onClosed: () => N(!1)
  }), ee = k(() => {
  }), ue = k(() => {
  }), pe = k(() => {
  }), Qe = re(($) => {
    if ($.key === "Enter") {
      const V = K.highlightedIndex, fe = K.items[V >= 0 ? V : 0];
      return fe == null || fe.activate(), !0;
    }
    return $.key === "Escape" ? (t == null || t(!1), e == null || e(), !0) : !1;
  }, [K, t, e]);
  kr(n && x.length === 0, K, ee, { onFieldKey: Qe }), Cr(n, ue), Sr(n, K, ee, D, x.length > 0, pe, { ignoreFields: O });
  const Ve = k(null), Te = re(($) => {
    var V;
    if ($) {
      $.addEventListener("keydown", ee.current, { capture: !0 }), $.addEventListener("wheel", ue.current, { passive: !1 });
      const fe = $.ownerDocument;
      Ve.current = fe, fe.addEventListener("keydown", pe.current, { capture: !0 }), Ft(!0);
    } else
      (V = Ve.current) == null || V.removeEventListener("keydown", pe.current, { capture: !0 }), Ve.current = null, Ft(!1);
    D.current = $, F($);
  }, [F]), [Se, Ie] = Y({ top: 0, left: 0, maxH: $i, side: "bottom", ready: !1 }), [Be, Re] = Y(0), [Ze, Ft] = Y(!1);
  Q(() => {
    n && E.current && Re(E.current.getBoundingClientRect().width);
  }, [n]), Ks({
    anchorRef: E,
    panelRef: D,
    open: n && Ze,
    maxHeight: u,
    onPosition: Ie
  }), Q(() => {
    var $;
    if (Se.ready && n) {
      if (f) {
        ($ = X.current) == null || $.focus();
        return;
      }
      const V = D.current;
      V && V.ownerDocument.activeElement !== V && !V.contains(V.ownerDocument.activeElement) && V.focus();
    }
  }, [Se.ready, n, f]), Q(() => {
    if (!n || !f) return;
    if (K.items.length === 0) {
      K.highlightedIndex !== -1 && K.setHighlighted(-1, "keyboard");
      return;
    }
    const $ = K.highlightedIndex;
    ($ < 0 || $ >= K.items.length) && K.setHighlighted(0, "keyboard");
  }, [n, P, f, K.items.length]), qe(() => {
    var V;
    if (!n || K.highlightedIndex < 0 || K.pointerDriven) return;
    const $ = (V = D.current) == null ? void 0 : V.querySelector(`[data-ei="${K.highlightedIndex}"]`);
    $ == null || $.scrollIntoView({ block: "nearest" });
  }, [n, K.highlightedIndex, K.pointerDriven]);
  const on = re(($) => {
    !$ && !T.current || (!$ && lt.current && (Ye.current = !0), t ? t($) : $ || e == null || e());
  }, [t, e]), _t = k(U);
  _t.current = U;
  const lt = k(!1), Ye = k(!1), ct = re(() => {
    if (!T.current && _t.current) {
      if (Ye.current) {
        Ye.current = !1, lt.current = !1;
        return;
      }
      t == null || t(!0);
    }
  }, [t]), at = mt.isValidElement(r) ? r : null, wt = at ? mt.cloneElement(at, {
    ref: ($) => {
      E.current = $;
    },
    onPointerDown: () => {
      lt.current = !0, Ye.current = !1;
    },
    onClick: ($) => {
      var V, fe;
      (fe = (V = at.props).onClick) == null || fe.call(V, $), ct();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: ($) => {
      var V, fe;
      if ((fe = (V = at.props).onKeyDown) == null || fe.call(V, $), !(!O || !T.current)) {
        if ($.key.length === 1 && !$.ctrlKey && !$.metaKey && !$.altKey)
          se(!0);
        else if ($.key === "ArrowDown" || $.key === "ArrowUp") {
          $.preventDefault();
          const De = K.items;
          if (De.length === 0) return;
          const et = $.key === "ArrowDown" ? 1 : -1, ln = (K.highlightedIndex + et + De.length) % De.length;
          K.setHighlighted(ln, "keyboard");
        } else if ($.key === "Enter") {
          $.preventDefault();
          const De = K.highlightedIndex, et = K.items[De >= 0 ? De : 0];
          et == null || et.activate();
        }
      }
    }
  }) : r, sn = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${S ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ R(ce.Root, { open: n || U, onOpenChange: on, modal: !1, children: [
    /* @__PURE__ */ g(ce.Trigger, { asChild: !0, children: wt }),
    /* @__PURE__ */ g(ce.Portal, { container: B ?? void 0, children: /* @__PURE__ */ g(xr.Provider, { value: s, children: /* @__PURE__ */ g(br.Provider, { value: { chain: x, setChain: v, morph: c, keyboardOpened: b, setKeyboardOpened: C }, children: /* @__PURE__ */ g(rn.Provider, { value: K, children: /* @__PURE__ */ g(Bi.Provider, { value: { query: P, setQuery: j }, children: /* @__PURE__ */ R(
      ce.Content,
      {
        ref: Te,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: `${sn} ${o || ""} ${a || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Se.left,
          top: Se.top,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : Be || void 0,
          maxHeight: Se.maxH,
          visibility: Se.ready ? "visible" : "hidden"
        },
        onPointerLeave: K.pointerLeave,
        children: [
          S && /* @__PURE__ */ g("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: G }, children: /* @__PURE__ */ R("div", { className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: H, children: [
            /* @__PURE__ */ g(cs, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ g(
              "input",
              {
                ref: X,
                value: P,
                onChange: ($) => j($.target.value),
                placeholder: d ?? "Search…",
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
                onPointerDown: ($) => $.stopPropagation(),
                onClick: () => {
                  var $;
                  j(""), ($ = X.current) == null || $.focus();
                },
                children: /* @__PURE__ */ g(kn, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ g("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          S ? /* @__PURE__ */ g("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: l }) : l
        ]
      }
    ) }) }) }) }) })
  ] });
}
function bf({
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
  onReset: h,
  onTrash: f,
  closeOnSelect: d,
  readOnly: p = !1,
  theme: m,
  align: y,
  label: x,
  header: v,
  itemLabel: b,
  trigger: C,
  minItems: B = 1,
  itemRender: I,
  morph: E = !0,
  contentClassName: D
}) {
  const T = wr(), U = Pi(), [N, W] = Y(null), [z, O] = Y(""), P = k(z);
  P.current = z;
  const j = k(null), te = k(null);
  Q(() => {
    n && requestAnimationFrame(() => {
      var H, G;
      (G = (H = te.current) == null ? void 0 : H.querySelector('[data-active="1"]')) == null || G.scrollIntoView({ block: "nearest" });
    });
  }, [n]), Q(() => {
    var q;
    if (!n) return;
    const H = (S) => {
      var pe, Qe, Ve;
      const Z = S.target;
      if (Z && Z.closest("input, textarea, [contenteditable]")) {
        N && Z === j.current && (S.key === "Enter" ? (S.preventDefault(), S.stopImmediatePropagation(), le()) : S.key === "Escape" && (S.preventDefault(), S.stopImmediatePropagation(), X()));
        return;
      }
      const K = (pe = te.current) == null ? void 0 : pe.closest(".ui-menu");
      if (!K || !K.contains(S.target)) return;
      const ze = K.ownerDocument, F = [...K.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], ee = [...K.querySelectorAll('div:last-child > [role="menuitem"]')], ue = [...F, ...ee];
      if (S.key === "ArrowDown" || S.key === "ArrowUp") {
        S.preventDefault(), S.stopImmediatePropagation();
        const Te = ze.activeElement;
        let Se = Te ? ue.indexOf(Te) : -1;
        if (Se < 0 && Te) {
          const Re = Te.closest("[data-active]"), Ze = Re == null ? void 0 : Re.querySelector('[role="menuitem"]:first-child');
          Ze && (Se = F.indexOf(Ze));
        }
        const Ie = S.key === "ArrowDown" ? 1 : -1, Be = Se < 0 ? Ie === 1 ? 0 : ue.length - 1 : (Se + Ie + ue.length) % ue.length;
        (Qe = ue[Be]) == null || Qe.focus({ preventScroll: !0 });
        return;
      }
      if (S.key === "ArrowLeft" || S.key === "ArrowRight") {
        const Te = ze.activeElement, Se = Te == null ? void 0 : Te.closest("[data-active]");
        if (!Se) return;
        S.preventDefault(), S.stopImmediatePropagation();
        const Ie = [...Se.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Ie.length === 0) return;
        const Be = Te && Se.contains(Te) ? Ie.indexOf(Te) : -1, Re = S.key === "ArrowRight" ? 1 : -1, Ze = Be < 0 ? 0 : (Be + Re + Ie.length) % Ie.length;
        (Ve = Ie[Ze]) == null || Ve.focus({ preventScroll: !0 });
        return;
      }
    }, G = ((q = te.current) == null ? void 0 : q.ownerDocument) ?? null;
    return G == null || G.addEventListener("keydown", H, { capture: !0 }), () => G == null ? void 0 : G.removeEventListener("keydown", H, { capture: !0 });
  }, [n, N]), Q(() => {
    if (!N) return;
    const H = t.find((Z) => Z.id === N);
    H && !z && O(H.name);
    const G = requestAnimationFrame(() => {
      const Z = j.current;
      Z && (Z.focus(), Z.select());
    });
    let q = 0;
    const S = window.setInterval(() => {
      const Z = j.current;
      if (q++, !Z || q > 12) {
        clearInterval(S);
        return;
      }
      Z.ownerDocument.activeElement !== Z && (Z.focus(), Z.select());
    }, 50);
    return () => {
      cancelAnimationFrame(G), clearInterval(S);
    };
  }, [N]), Q(() => {
    if (N) {
      const H = t.find((G) => G.id === N);
      H && !z && O(H.name);
    }
  }, [N, t]);
  const se = (H, G) => {
    W(H), O(G);
  }, le = () => {
    N && P.current.trim() && o(N, P.current.trim()), W(null);
  }, X = () => {
    W(null);
  }, be = b || v.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ R(Dn, { open: n, onOpenChange: (H) => {
    H ? (W(null), O("")) : (N && z.trim() && o(N, z.trim()), W(null), O("")), (!H || !p) && e(H);
  }, width: "w-80", theme: m, align: y, trigger: C, morph: E, contentClassName: D, children: [
    /* @__PURE__ */ g("div", { className: `shrink-0 ${T.headerText}`, children: v }),
    /* @__PURE__ */ g("div", { ref: te, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: t.map((H) => {
      const G = H.id === r, q = N === H.id;
      return /* @__PURE__ */ g("div", { "data-active": G ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${G || q ? T.rowActiveBg : T.rowHoverBg} ${N && !q ? "opacity-40 pointer-events-none" : ""}`, children: q ? /* @__PURE__ */ R(Ue, { children: [
        /* @__PURE__ */ g("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ g(
          "input",
          {
            ref: j,
            autoFocus: !0,
            value: z,
            onChange: (S) => O(S.target.value),
            onKeyDown: (S) => {
              S.key === "Enter" && (S.preventDefault(), S.stopPropagation(), le()), S.key === "Escape" && (S.preventDefault(), S.stopPropagation(), X());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: U
          }
        ) }),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${T.editConfirm}`,
            onSelect: (S) => {
              S.preventDefault(), le();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g(vi, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${T.editCancel}`,
            onSelect: (S) => {
              S.preventDefault(), X();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g(kn, { className: T.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ R(Ue, { children: [
        /* @__PURE__ */ g(
          ce.Item,
          {
            style: U,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${T.rowText} ${G ? "" : T.rowTextHover}`,
            onSelect: d ? () => {
              i(H.id);
            } : (S) => {
              S.preventDefault(), i(H.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ g("span", { className: `truncate ${G ? T.rowActiveText : ""}`, children: I ? I(H) : H.name })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${G ? T.btnActive : T.btnBase}`,
            onSelect: (S) => {
              S.preventDefault(), se(H.id, H.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ g(as, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${G ? T.btnActive : T.btnBase}`,
            onSelect: (S) => {
              S.preventDefault();
              const Z = s(H.id);
              Z && se(Z, `${H.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ g(ki, { className: T.btnIcon })
          }
        ),
        /* @__PURE__ */ g(
          ce.Item,
          {
            className: `shrink-0 ${T.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${t.length <= B ? T.btnDisabled : G ? T.btnDangerActive : T.btnDanger}`,
            onSelect: (S) => {
              S.preventDefault(), l(H.id);
            },
            onTouchStart: () => {
            },
            disabled: p || t.length <= B,
            children: /* @__PURE__ */ g(er, { className: T.btnIcon })
          }
        )
      ] }) }, H.id);
    }) }),
    /* @__PURE__ */ R("div", { className: `shrink-0 ${N ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ R(Ue, { children: [
        /* @__PURE__ */ g(ce.Separator, { className: T.separator }),
        /* @__PURE__ */ R(
          ce.Item,
          {
            className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
            onSelect: (H) => {
              H.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ g(Si, { className: `${T.btnIcon} ${T.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || a || u || f) && /* @__PURE__ */ g(ce.Separator, { className: T.separator }),
      c && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault();
            const G = c();
            G && se(G, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ g(us, { className: `${T.btnIcon} ${T.icon}` }),
            "New ",
            be
          ]
        }
      ),
      a && /* @__PURE__ */ R(
        ce.Item,
        {
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ R("svg", { className: `${T.btnIcon} ${T.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${T.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${T.itemDefault} ui-row`,
          onSelect: (H) => {
            H.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ g(er, { className: `${T.btnIcon} ${T.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function Gs({
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
  Di();
  const u = wr(), h = Pi(), f = k(!1), d = k(null), { myIndex: p, highlighted: m, setPointer: y } = Fi({
    label: () => Li(o),
    activate: () => {
      t || n();
    },
    disabled: t
  }), { query: x } = Us(), v = x.trim() !== "" && p < 0, b = r === "danger" ? u.itemDanger : u.itemDefault;
  return /* @__PURE__ */ R(
    ce.Item,
    {
      ref: d,
      "data-ei": p >= 0 ? p : void 0,
      style: { ...h, display: v ? "none" : void 0 },
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${b} ${l ? "ui-item-selected" : ""} ${m ? "ui-item-highlighted" : ""} ${t ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (C) => {
        if (f.current) {
          f.current = !1;
          return;
        }
        s && C.preventDefault(), n();
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
            onPointerDown: (C) => {
              C.stopPropagation(), C.preventDefault(), f.current = !0, c.onClick();
            },
            onClick: (C) => {
              C.stopPropagation(), C.preventDefault();
            },
            children: c.icon
          }
        )
      ]
    }
  );
}
function Qs({ id: n, label: e, icon: t, width: r, side: i = "right", children: o, contentClassName: s }) {
  const { chain: l, setChain: c, morph: a, keyboardOpened: u, setKeyboardOpened: h } = Pt(br), f = l.includes(n), d = l[l.length - 1] === n, p = Di(), m = en(), y = k(null), x = k(null), [v, b] = Y(f), C = !f && v;
  Q(() => {
    f && b(!0);
  }, [f]);
  const B = () => c((q) => {
    const S = q.indexOf(n);
    return S >= 0 ? q.slice(0, S) : q;
  }), I = On(), E = vr(), D = k(E);
  D.current = E;
  const T = k(null);
  Q(() => {
    var S;
    const q = {
      label: e,
      activate: () => {
        h(n), c((Z) => Z.includes(n) ? Z : [...Z, n]);
      },
      submenu: !0
    };
    return T.current = q, (S = D.current) == null ? void 0 : S.register(q);
  }, []);
  const U = E && T.current ? E.items.indexOf(T.current) : -1, N = U >= 0 && U === E.highlightedIndex, W = re(() => {
    const q = y.current;
    if (!q) return null;
    const S = q.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), z = yr({
    visible: f,
    morph: a,
    anchor: W,
    onClosed: () => b(!1)
  }), O = k(() => {
  }), P = k(() => {
  }), j = k(() => {
  });
  kr(f && d, I, O, {
    onCloseSub: () => {
      B(), E && U >= 0 && E.setHighlighted(U, "keyboard");
    }
  });
  const te = k(u);
  te.current = u, Q(() => {
    f && (te.current === n ? (I.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var q;
      return (q = x.current) == null ? void 0 : q.focus();
    }), h(null)) : I.setHighlighted(-1, "keyboard"));
  }, [f]), Cr(f, P), Sr(f, I, O, x, !d, j), mt.useLayoutEffect(() => {
    var S;
    if (!f || I.highlightedIndex < 0 || I.pointerDriven) return;
    const q = (S = x.current) == null ? void 0 : S.querySelector(`[data-ei="${I.highlightedIndex}"]`);
    q == null || q.scrollIntoView({ block: "nearest" });
  }, [f, I.highlightedIndex, I.pointerDriven]);
  const se = k(null), le = re((q) => {
    var S;
    if (q) {
      q.addEventListener("keydown", O.current, { capture: !0 }), q.addEventListener("wheel", P.current, { passive: !1 });
      const Z = q.ownerDocument;
      se.current = Z, Z.addEventListener("keydown", j.current, { capture: !0 });
    } else
      (S = se.current) == null || S.removeEventListener("keydown", j.current, { capture: !0 }), se.current = null;
    x.current = q, z(q);
  }, [z]), X = ke(), be = { padding: `${A(8, 12, X)}px ${A(12, 16, X)}px`, fontSize: A(12, 14, X) }, H = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${N ? " ui-item-highlighted" : ""}${C ? " ui-sub-closing" : ""}`, G = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ R(ce.Sub, { open: f || v, onOpenChange: (q) => c((S) => {
    if (!q) {
      const Z = S.indexOf(n);
      return Z >= 0 ? S.slice(0, Z) : S;
    }
    return S.includes(n) ? S : [...S, n];
  }), children: [
    /* @__PURE__ */ R(
      ce.SubTrigger,
      {
        ref: y,
        "data-ei": U >= 0 ? U : void 0,
        style: be,
        className: H,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          E && U >= 0 && E.setHighlighted(U, "pointer");
        },
        onPointerDown: (q) => {
          q.pointerType === "pen" && (q.preventDefault(), c((S) => f ? S.slice(0, S.indexOf(n)) : [...S, n]));
        },
        children: [
          i === "left" && /* @__PURE__ */ g(Sn, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ R("span", { className: "flex items-center gap-2", children: [
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
        ref: le,
        "data-theme": p,
        className: G,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: I.pointerLeave,
        children: /* @__PURE__ */ g(rn.Provider, { value: I, children: o })
      }
    ) })
  ] });
}
const Ht = 8, vf = ({ open: n, x: e, y: t, onClose: r, children: i, containerRef: o, theme: s = "light", morph: l = !0 }) => {
  const c = ke(), a = A(12, 14, c), u = k(null), h = tn(), [f, d] = Y(!1), [p, m] = Y([]), [y, x] = Y(null), v = On();
  Q(() => {
    if (n)
      return v.setHighlighted(-1, "keyboard"), Oi(r);
  }, [n, r]);
  const b = k({ left: e, top: t });
  n && (b.current = { left: e, top: t });
  const C = re(() => ({ left: b.current.left, top: b.current.top, width: 0, height: 0 }), []), B = yr({
    visible: !0,
    morph: l,
    anchor: C,
    cloneOnUnmount: !0
  }), I = k(() => {
  }), E = k(() => {
  }), D = k(() => {
  });
  kr(n, v, I), Cr(n, E), Sr(n, v, I, u, p.length > 0, D);
  const T = k(null), U = re((z) => {
    var O;
    if (z) {
      z.addEventListener("keydown", I.current, { capture: !0 }), z.addEventListener("wheel", E.current, { passive: !1 });
      const P = z.ownerDocument;
      T.current = P, P.addEventListener("keydown", D.current, { capture: !0 });
    } else
      (O = T.current) == null || O.removeEventListener("keydown", D.current, { capture: !0 }), T.current = null;
    u.current = z, d(!!z), B(z);
  }, [B]), [N, W] = Y(null);
  return qe(() => {
    var G;
    if (!n || !f || !u.current) return;
    const z = u.current, O = z.offsetWidth, P = z.offsetHeight, j = (G = o == null ? void 0 : o.current) == null ? void 0 : G.getBoundingClientRect(), te = j ? j.right : (h == null ? void 0 : h.innerWidth) ?? 0, se = j ? j.bottom : (h == null ? void 0 : h.innerHeight) ?? 0, le = j ? j.left : 0, X = j ? j.top : 0;
    let be = Math.max(X + Ht, b.current.top), H = Math.max(le + Ht, b.current.left);
    H + O > te && (H = te - O - Ht), be + P > se && (be = Math.max(X + Ht, se - P - Ht)), W({ left: H, top: be });
  }, [n, f, e, t, o]), n ? /* @__PURE__ */ R(ce.Root, { open: n, onOpenChange: (z) => {
    z || r();
  }, modal: !1, children: [
    /* @__PURE__ */ g(ce.Trigger, { asChild: !0, children: /* @__PURE__ */ g("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ g(ce.Portal, { children: /* @__PURE__ */ g(xr.Provider, { value: s, children: /* @__PURE__ */ g(br.Provider, { value: { chain: p, setChain: m, morph: l, keyboardOpened: y, setKeyboardOpened: x }, children: /* @__PURE__ */ g(rn.Provider, { value: v, children: /* @__PURE__ */ g(
      ce.Content,
      {
        ref: U,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: a, left: (N == null ? void 0 : N.left) ?? b.current.left, top: (N == null ? void 0 : N.top) ?? b.current.top, touchAction: "manipulation" },
        onPointerLeave: v.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, kf = ({ onClick: n, variant: e = "default", icon: t, disabled: r = !1, selected: i = !1, trailing: o, children: s }) => {
  const l = ke(), c = { padding: `${A(8, 12, l)}px ${A(12, 16, l)}px`, fontSize: A(12, 14, l) }, a = vr(), u = k(a);
  u.current = a;
  const h = k(null);
  Q(() => {
    var m;
    const p = { label: Li(s), activate: () => {
      r || n();
    } };
    return h.current = p, (m = u.current) == null ? void 0 : m.register(p);
  }, []);
  const f = a && h.current ? a.items.indexOf(h.current) : -1, d = !r && f >= 0 && f === a.highlightedIndex;
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
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${d ? "ui-item-highlighted" : ""}`,
      children: [
        t,
        /* @__PURE__ */ g("span", { className: "flex-1 truncate", children: s }),
        o && /* @__PURE__ */ g("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Sf = () => /* @__PURE__ */ g(ce.Separator, { className: "ui-sep my-1" }), Cf = (n) => /* @__PURE__ */ g(Qs, { ...n, width: n.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), oe = 8, _i = "[data-modal-stack]", Xe = 220, Yt = "cubic-bezier(0.32, 0.72, 0, 1)", xn = 0.94;
function kt() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function nt(n) {
  if (!n) return { top: 0, height: 0, bottom: 0 };
  const e = n.visualViewport, t = e ? e.offsetTop : 0, r = e ? e.height : n.innerHeight;
  return { top: t, height: r, bottom: t + r };
}
function Hi(n, e) {
  return `translate(${e.left - n.left}px, ${e.top - n.top}px) scale(${e.width / n.width}, ${e.height / n.height})`;
}
function Vr(n, e, t, r) {
  const i = ++n.current, o = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = Hi(o, t), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === i && (e.style.transition = `transform ${Xe}ms ${Yt}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        n.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, Xe + 80));
    });
  });
}
function Zs(n, e, t) {
  const r = ++n.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${xn})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.current === r && (e.style.transition = `transform ${Xe}ms ${Yt}`, e.style.transform = "none", window.setTimeout(() => {
        n.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", t());
      }, Xe + 60));
    });
  });
}
function Yr(n, e, t) {
  const r = ++n.current, i = e.getBoundingClientRect(), o = 1 - xn, s = { left: i.left + i.width * o / 2, top: i.top + i.height * o / 2, width: i.width * xn, height: i.height * xn };
  e.style.transition = `transform ${Xe}ms ${Yt}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Hi(i, s), e.style.opacity = "0", window.setTimeout(() => {
    n.current === r && (e.style.visibility = "hidden", t(), requestAnimationFrame(() => {
      n.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, Xe + 60);
}
function jn(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(_i) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function an(n) {
  const e = n.parentNode;
  return e ? Array.from(e.children).filter((t) => t instanceof HTMLElement && t !== n && t.matches(_i) && (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((t) => t.getAttribute("data-state") === "open") : [];
}
function el({
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
  dismissOnBackdrop: h = !0
}) {
  const f = k(null), d = k(null), p = k(null), m = ke(), y = A(20, 24, m), x = A(10, 12, m), v = A(12, 14, m), b = A(14, 16, m), C = A(20, 24, m), B = A(20, 24, m), I = A(20, 24, m), E = A(14, 16, m), D = A(16, 20, m), T = A(10, 12, m), U = A(12, 14, m), N = A(8, 10, m), W = A(4, 6, m), z = { padding: `${x}px ${y}px` }, O = { fontSize: v }, P = { padding: `${B}px ${C}px 16px ${C}px` }, j = { fontSize: b }, te = { padding: `0 ${C}px 16px` }, se = { padding: `${I}px ${C}px` }, le = { fontSize: T, padding: `${W}px ${N}px` }, [X, be] = Y(!1), H = re((w) => {
    f.current = w, be(w !== null);
  }, []), G = en(), q = tn(), S = k(q);
  S.current = q;
  const [Z, K] = Y(null), ze = k(null), F = k(!1), ee = k(!1), ue = k(0), pe = k({ w: 0, h: 0 }), Qe = k(!1), [Ve, Te] = Y(!1), [Se, Ie] = Y(!1), Be = k(0), Re = k(!1), [Ze, Ft] = Y(!1), on = k(c);
  on.current = c;
  const _t = k(!1), lt = k(!1), Ye = () => {
    lt.current = !0, Te(!0);
  }, ct = () => {
    lt.current = !1, Te(!1);
  };
  Q(() => {
    n || (K(null), Qe.current = !1, F.current = !1, Ie(!1));
  }, [n]), qe(() => {
    if (!n || Qe.current || !X || !f.current) return;
    Qe.current = !0;
    const w = f.current.getBoundingClientRect(), _ = S.current ?? null, J = (_ == null ? void 0 : _.innerWidth) ?? 0, ne = nt(_);
    K({
      left: Math.max(oe, Math.min((J - w.width) / 2, J - w.width - oe)),
      top: Math.max(ne.top + oe, Math.min(ne.top + (ne.height - w.height) / 2, ne.bottom - w.height - oe))
    });
  }, [n, X]), qe(() => {
    if (!n || !X || !c || kt() || !f.current) return;
    const w = f.current, _ = jn(w), J = _[_.length - 1];
    Ye(), J ? Vr(Be, w, J.getBoundingClientRect(), ct) : Zs(Be, w, ct);
  }, [n, X]);
  const at = re(() => {
    if (!u || Re.current) return;
    const w = f.current, _ = !!w && jn(w).length > 0;
    if (!w || !c || kt() || _) {
      e();
      return;
    }
    Re.current = !0, Ft(!0), _t.current = !0, Ye(), Yr(Be, w, () => {
      Re.current = !1, Ft(!1), ct(), e();
    });
  }, [c, e, u]), wt = re(() => {
    const w = f.current;
    if (!w || _t.current || !on.current || kt() || jn(w).length > 0) return;
    const _ = w.ownerDocument, J = w.cloneNode(!0);
    J.removeAttribute("data-modal-stack"), J.removeAttribute("data-state"), J.removeAttribute("role"), J.removeAttribute("data-aria-hidden"), J.removeAttribute("tabindex"), J.setAttribute("aria-hidden", "true"), J.style.pointerEvents = "none", _.body.appendChild(J), Yr({ current: 0 }, J, () => {
      J.isConnected && J.remove();
    });
  }, []);
  qe(() => () => wt(), [wt]);
  const sn = k(n);
  qe(() => {
    const w = sn.current;
    sn.current = n, w && !n && wt();
  }, [n, X, wt]), Q(() => {
    if (!n || !X || !c || !f.current) return;
    const w = f.current, _ = w.parentNode;
    if (!_) return;
    let J = 0, ne = null, ie = !1;
    const de = () => {
      J = 0;
      const ye = an(w);
      if (ye.length > 0)
        w.style.opacity = "", w.style.pointerEvents = "", ne = ye[ye.length - 1].getBoundingClientRect(), ie = !0, J = requestAnimationFrame(de);
      else if (ie) {
        ie = !1, ne && !kt() && (Ye(), Vr(Be, w, ne, ct)), ne = null;
        const Me = S.current ?? null;
        Me == null || Me.setTimeout(() => {
          !w || !w.isConnected || getComputedStyle(w).opacity !== "1" && (w.style.opacity = "1", w.style.pointerEvents = "");
        }, 240);
      }
    }, ge = new MutationObserver(() => {
      !J && an(w).length > 0 && (J = requestAnimationFrame(de));
    });
    return ge.observe(_, { childList: !0 }), () => {
      ge.disconnect(), J && cancelAnimationFrame(J);
    };
  }, [n, X]), Q(() => {
    if (!X || !c || kt() || !f.current) return;
    const w = f.current;
    let _ = Math.round(w.getBoundingClientRect().height), J = !1;
    const ne = new ResizeObserver(() => {
      if (!w.isConnected) return;
      const ie = Math.round(w.getBoundingClientRect().height);
      if (!J) {
        J = !0, _ = ie;
        return;
      }
      if (Math.abs(ie - _) < 1) return;
      if (ze.current || Re.current || an(w).length > 0) {
        _ = ie;
        return;
      }
      if (lt.current) return;
      const de = _;
      _ = ie, Ye();
      const ge = w.getBoundingClientRect(), ye = nt(S.current ?? null), Me = !F.current && !ee.current, bt = Me ? ye.top + (ye.height - de) / 2 : ge.top, Fe = Me ? ye.top + (ye.height - ie) / 2 : ge.top;
      w.style.transition = "none", w.style.height = `${de}px`, Me && (w.style.top = `${bt}px`), d.current && (d.current.style.overflow = "hidden"), w.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          w.style.height === `${de}px` && (w.style.transition = `height ${Xe}ms ${Yt}${Me ? `, top ${Xe}ms ${Yt}` : ""}`, w.style.height = `${ie}px`, Me && (w.style.top = `${Fe}px`), window.setTimeout(() => {
            w.style.height === `${ie}px` && (w.style.transition = "", w.style.height = "", d.current && (d.current.style.overflow = ""), Me && K({ left: ge.left, top: Fe }), ct());
          }, Xe + 60));
        });
      });
    });
    return ne.observe(w), () => ne.disconnect();
  }, [X]), Q(() => {
    if (!X || !f.current || c && !kt()) return;
    const w = f.current, _ = new ResizeObserver(() => {
      if (!w.isConnected || ze.current || Re.current || ee.current || an(w).length > 0) return;
      const J = S.current ?? null, ne = nt(J), ie = (J == null ? void 0 : J.innerWidth) ?? 0, de = w.getBoundingClientRect(), ge = Math.max(ne.top + oe, Math.min(de.top, ne.bottom - de.height - oe)), ye = Math.max(oe, Math.min(de.left, ie - de.width - oe));
      (Math.abs(ge - de.top) > 0.5 || Math.abs(ye - de.left) > 0.5) && K({ left: ye, top: ge });
    });
    return _.observe(w), () => _.disconnect();
  }, [X, c]);
  const $ = re(() => {
    const w = f.current;
    if (!w) return null;
    const _ = w.getBoundingClientRect();
    return { left: _.left, top: _.top, width: _.width, height: _.height };
  }, []), V = re((w, _) => {
    const J = S.current ?? null, ne = (J == null ? void 0 : J.innerWidth) ?? 0, ie = nt(J), de = $(), ge = de ? de.width : Math.min(ne - oe * 2, 576), ye = de ? de.height : Math.min(ie.height - oe * 2, 400);
    return {
      left: Math.max(oe, Math.min(w, ne - ge - oe)),
      top: Math.max(ie.top + oe, Math.min(_, ie.bottom - ye - oe))
    };
  }, [$]);
  Q(() => {
    if (!n) return;
    const w = S.current ?? null, _ = (w == null ? void 0 : w.visualViewport) ?? null;
    if (!w || !_) return;
    const J = 120;
    ee.current = !1, pe.current = { w: w.innerWidth, h: w.innerHeight };
    let ne = 0;
    const ie = () => {
      if (Re.current || ze.current) return;
      const ge = (w == null ? void 0 : w.innerHeight) ?? 0, ye = (w == null ? void 0 : w.innerWidth) ?? 0, bt = nt(w).height < ge - J, Fe = ge < pe.current.h - J && ye === pe.current.w;
      bt || Fe ? (ee.current = !0, ue.current && (clearTimeout(ue.current), ue.current = 0)) : ue.current || (ue.current = (w == null ? void 0 : w.setTimeout(() => {
        ee.current = !1, ue.current = 0, Ie(!1);
      }, 600)) ?? 0), Ie(ee.current), !ne && (ne = requestAnimationFrame(() => {
        var Jr;
        ne = 0;
        const Hr = f.current;
        if (!Hr) return;
        const ut = nt(S.current ?? null), je = Hr.getBoundingClientRect(), Wr = ((Jr = S.current) == null ? void 0 : Jr.innerWidth) ?? 0, Hn = (w == null ? void 0 : w.innerHeight) ?? 0, ss = ut.height < Hn - J || Hn < pe.current.h - J && (w == null ? void 0 : w.innerWidth) === pe.current.w;
        pe.current = { w: (w == null ? void 0 : w.innerWidth) ?? 0, h: Hn };
        const cn = je.top >= ut.top + oe && je.bottom <= ut.bottom - oe, jr = () => {
          K({
            left: Math.max(oe, Math.min((Wr - je.width) / 2, Wr - je.width - oe)),
            top: Math.max(ut.top + oe, Math.min(ut.top + (ut.height - je.height) / 2, ut.bottom - je.height - oe))
          });
        };
        if (ss && !Ee) {
          if (F.current) {
            cn || K(V(je.left, je.top));
            return;
          }
          if (cn) return;
          jr();
          return;
        }
        if (!ee.current) {
          if (F.current) {
            cn || K(V(je.left, je.top));
            return;
          }
          cn || jr();
        }
      }));
    };
    _.addEventListener("resize", ie), _.addEventListener("scroll", ie);
    const de = () => {
      Re.current || ze.current || ne || (ne = requestAnimationFrame(() => {
        ne = 0;
        const ge = f.current;
        if (!ge) return;
        const ye = S.current ?? null, Me = nt(ye), bt = (ye == null ? void 0 : ye.innerWidth) ?? 0, Fe = ge.getBoundingClientRect();
        if (F.current) {
          K(V(Fe.left, Fe.top));
          return;
        }
        K({
          left: Math.max(oe, Math.min((bt - Fe.width) / 2, bt - Fe.width - oe)),
          top: Math.max(Me.top + oe, Math.min(Me.top + (Me.height - Fe.height) / 2, Me.bottom - Fe.height - oe))
        });
      }));
    };
    return w.addEventListener("orientationchange", de), () => {
      _.removeEventListener("resize", ie), _.removeEventListener("scroll", ie), w.removeEventListener("orientationchange", de), ne && cancelAnimationFrame(ne), ue.current && clearTimeout(ue.current);
    };
  }, [n, V]);
  const fe = re((w) => {
    if (w.target.closest("button")) return;
    F.current = !0;
    const _ = $();
    _ && (K(V(_.left, _.top)), ze.current = { startX: w.clientX, startY: w.clientY, posX: _.left, posY: _.top }, w.target.setPointerCapture(w.pointerId));
  }, [$, V]), De = re((w) => {
    const _ = ze.current;
    _ && (w.preventDefault(), K(V(_.posX + w.clientX - _.startX, _.posY + w.clientY - _.startY)));
  }, [V]), et = re(() => {
    ze.current = null;
  }, []), ln = ze.current !== null, Lr = re(() => {
    F.current = !1;
    const w = S.current ?? null, _ = nt(w), J = (w == null ? void 0 : w.innerWidth) ?? 0, ne = f.current, ie = ne ? ne.getBoundingClientRect() : { width: 0, height: 0 };
    K({
      left: Math.max(oe, Math.min((J - ie.width) / 2, J - ie.width - oe)),
      top: Math.max(_.top + oe, Math.min(_.top + (_.height - ie.height) / 2, _.bottom - ie.height - oe))
    });
  }, []), _n = k(0), Br = re(() => {
    const w = Date.now();
    w - _n.current < 300 ? (_n.current = 0, Lr()) : _n.current = w;
  }, [Lr]), Fr = Z !== null, ns = Fr ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", rs = `${i ? `${i} w-full` : "max-w-xl w-full"}`, _r = {
    ...Fr ? { left: Z.left, top: Z.top } : {},
    width: `min(100%, calc(100dvw - ${oe * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Se ? {} : { maxHeight: `calc(100dvh - ${oe * 2}px)` }
  }, is = re((w) => {
    if (w.key !== "Enter" || w.shiftKey || w.metaKey || w.ctrlKey || w.altKey) return;
    const _ = w.target, J = p.current;
    if (!(!!_.closest("[data-modal-close]") || !!J && J.contains(_) && !!_.closest('button, a, [role="button"]')) && _.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !J) return;
    const ie = Array.from(J.querySelectorAll("button[data-modal-confirm]")), de = ie.length > 0 ? ie : Array.from(J.querySelectorAll("button")), ge = de[de.length - 1];
    !ge || ge.disabled || (w.preventDefault(), ge.click());
  }, []);
  return /* @__PURE__ */ g(tt.Root, { open: n, onOpenChange: (w) => {
    w || at();
  }, children: /* @__PURE__ */ R(tt.Portal, { container: G ?? void 0, children: [
    /* @__PURE__ */ g(
      tt.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Ze ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (w) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (w.preventDefault(), h && at());
        }
      }
    ),
    /* @__PURE__ */ R(
      tt.Content,
      {
        ref: H,
        onKeyDown: is,
        onInteractOutside: (w) => {
          h || w.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ns} ${rs}`,
        style: { touchAction: "manipulation", ...Object.keys(_r).length > 0 ? _r : {} },
        children: [
          a ? /* @__PURE__ */ R(
            "div",
            {
              style: P,
              className: `flex items-center justify-between ${ln ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (w) => {
                Ve || fe(w);
              },
              onPointerMove: De,
              onPointerUp: et,
              onClick: Br,
              children: [
                /* @__PURE__ */ g(tt.Title, { style: j, className: "font-bold text-white truncate", children: t }),
                u && /* @__PURE__ */ g(tt.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ g(kn, { style: { width: D, height: D } }) })
              ]
            }
          ) : /* @__PURE__ */ R(
            "div",
            {
              style: z,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${ln ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (w) => {
                Ve || fe(w);
              },
              onPointerMove: De,
              onPointerUp: et,
              onClick: Br,
              children: [
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ g("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ g(tt.Title, { style: O, className: "font-bold text-white truncate", children: t })
                ] }),
                /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
                  l && /* @__PURE__ */ R("button", { onClick: l, style: le, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ g(Si, { style: { width: U, height: U } }),
                    "Reset"
                  ] }),
                  u && /* @__PURE__ */ g(tt.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ g(kn, { style: { width: E, height: E } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ g("div", { ref: d, style: a ? te : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: s }),
          o && /* @__PURE__ */ g("div", { ref: p, style: a ? se : void 0, className: a ? "" : "shrink-0", children: a ? /* @__PURE__ */ g("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) });
}
function Ef({ children: n }) {
  const e = ke(), t = A(20, 24, e), r = A(8, 12, e);
  return /* @__PURE__ */ g("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${t}px` }, children: n });
}
const tl = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", nl = {
  zinc: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-blue-600 text-white font-semibold border border-blue-500 hover:bg-blue-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-red-600 text-white font-semibold border border-red-500 hover:bg-red-500 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
}, rl = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "border border-transparent text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "border border-transparent bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function un({
  variant: n = "hero",
  tone: e = "zinc",
  className: t = "",
  type: r = "button",
  ...i
}) {
  const o = dt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ g(
    "button",
    {
      type: r,
      style: o,
      className: `${tl} ${n === "hero" ? nl[e] : rl[n]} ${t}`,
      ...i
    }
  );
}
function Wi({ checked: n, size: e, tone: t = "accent" }) {
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
function il({ checked: n, onChange: e, disabled: t = !1, label: r, id: i, className: o = "", labelClassName: s = "", theme: l, variant: c = "pill", tone: a = "accent", block: u = !1 }) {
  const h = c !== "plain", f = ke(), d = A(16, 20, f), p = A(12, 14, f), m = A(12, 14, f), y = A(12, 16, f), x = A(10, 12, f), v = A(8, 10, f);
  return /* @__PURE__ */ R(
    "label",
    {
      className: `ui-checkbox ${h ? "ui-checkbox-pill rounded-lg" : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${t ? "ui-disabled" : ""} ${o}`,
      style: { display: u ? "flex" : "inline-flex", alignItems: "center", gap: v, padding: h ? `${x}px ${y}px` : void 0 },
      onClick: (C) => C.stopPropagation(),
      ...l ? { "data-theme": l } : {},
      children: [
        /* @__PURE__ */ g(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: n,
            disabled: t,
            onChange: (C) => e(C.target.checked),
            className: "sr-only"
          }
        ),
        h ? /* @__PURE__ */ g(Wi, { checked: n, size: d, tone: a }) : /* @__PURE__ */ g("span", { className: "ui-checkbox-box", style: { width: d, height: d }, "aria-hidden": !0, children: n && /* @__PURE__ */ g("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ g("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ g("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: m }, children: r })
      ]
    }
  );
}
function Tf(n = "md") {
  const e = Ee && Ni() > 0;
  return n === "sm" ? `${e ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function ol(n = "md") {
  return n === "sm" ? dt({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : dt({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const ji = Dt(null);
function Mf() {
  const n = Pt(ji);
  if (!n) throw new Error("useDialog must be used within DialogProvider");
  return n;
}
function Nf({ children: n }) {
  const [e, t] = Y(null), [r, i] = Y(!1), o = k(null), s = ke(), l = A(16, 20, s), c = A(12, 14, s), a = ol(), u = k(e);
  u.current = e;
  const h = re(() => {
    const v = u.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), f = re((v) => {
    if (v.suppressKey) {
      const b = localStorage.getItem(v.suppressKey);
      if (b && Date.now() < parseInt(b, 10))
        return Promise.resolve(!0);
    }
    return new Promise((b) => {
      h(), i(!1), t({ kind: "confirm", options: v, resolve: b });
    });
  }, [h]), d = re((v) => new Promise((b) => {
    h(), t({ kind: "prompt", options: v, resolve: b });
  }), [h]), p = re((v) => new Promise((b) => {
    h(), t({ kind: "alert", options: v, resolve: b });
  }), [h]);
  Q(() => {
    if (e) {
      const v = setTimeout(() => {
        var b;
        return (b = o.current) == null ? void 0 : b.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [e]);
  const m = re(() => {
    var v, b;
    if (e) {
      if (e.kind === "confirm") {
        const C = e.options;
        C.suppressKey && r && localStorage.setItem(C.suppressKey, String(Date.now() + 864e5)), e.resolve(!0);
      } else e.kind === "prompt" ? e.resolve(((b = (v = o.current) == null ? void 0 : v.value) == null ? void 0 : b.trim()) || null) : e.resolve();
      t(null);
    }
  }, [e, r]), y = e !== null;
  Q(() => {
    if (!y) return;
    const v = (b) => {
      b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey || b.isComposing || (b.preventDefault(), b.stopImmediatePropagation(), m());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [y, m]);
  const x = re(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), t(null));
  }, [e]);
  return /* @__PURE__ */ R(ji.Provider, { value: { confirm: f, prompt: d, alert: p }, children: [
    n,
    y && /* @__PURE__ */ g(
      el,
      {
        open: !0,
        onClose: x,
        closable: (e == null ? void 0 : e.kind) !== "alert",
        dismissOnBackdrop: (e == null ? void 0 : e.kind) !== "alert",
        title: (e == null ? void 0 : e.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: e && /* @__PURE__ */ R(Ue, { children: [
          e.kind !== "alert" && /* @__PURE__ */ g(un, { variant: "ghost", onClick: x, children: "Cancel" }),
          e.kind === "alert" ? /* @__PURE__ */ g(un, { onClick: m, children: "OK" }) : e.kind === "confirm" ? /* @__PURE__ */ g(
            un,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: m,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ g(un, { "data-modal-confirm": !0, onClick: m, children: "Save" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "flex flex-col", style: { gap: l }, children: [
          (e == null ? void 0 : e.options.message) && /* @__PURE__ */ g("p", { style: { fontSize: c }, className: "text-zinc-400 leading-relaxed", children: e.options.message }),
          (e == null ? void 0 : e.kind) === "confirm" && e.options.suppressKey && /* @__PURE__ */ g(
            il,
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
const sl = 500, ll = 250, cl = 5, Pe = 88, Ur = 4;
function al(n, e) {
  const t = n.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  t.style.strokeDasharray = String(r), t.style.strokeDashoffset = String(r);
  const i = performance.now(), o = (s) => {
    const l = s - i, c = Math.min(l / e, 1);
    t.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function ul({ x: n, y: e, ms: t }) {
  const r = k(null), i = en();
  return Q(() => {
    r.current && al(r.current, t);
  }, [t]), dr(
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
        children: /* @__PURE__ */ R("svg", { ref: r, width: Pe, height: Pe, viewBox: `0 0 ${Pe} ${Pe}`, children: [
          /* @__PURE__ */ g(
            "circle",
            {
              cx: Pe / 2,
              cy: Pe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Ur + 2,
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
function Af() {
  return { "data-no-longpress": "true" };
}
function fl(n) {
  const e = n.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || n.isContentEditable || n.closest("[data-no-longpress]") || n.closest("button, input, select, textarea"));
}
function zf({
  children: n,
  showRing: e = !0,
  longPressMs: t = sl,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: o
}) {
  const [s, l] = Y(null), c = Mi(), a = k(null), u = k(null), h = k({ x: 0, y: 0, target: null }), f = k(!1), d = Math.min(ll, t * 0.5), p = k(i);
  p.current = i;
  const m = k(o);
  return m.current = o, Q(() => {
    if (!Ee || !c) return;
    const y = (C) => {
      if (!tr(C.pointerType) || C.button !== 0) return;
      const B = C.target;
      if (!B.closest(r) || (p.current ? !p.current(B) : fl(B))) return;
      const I = C.clientX, E = C.clientY;
      h.current = { x: I, y: E, target: C.target }, f.current = !0, e && (u.current = setTimeout(() => l({ x: I, y: E }), d)), a.current = setTimeout(() => {
        if (!f.current) return;
        u.current && (clearTimeout(u.current), u.current = null), l(null);
        const D = h.current.target;
        if (!D) return;
        const T = m.current;
        if (T) {
          T(D, I, E);
          return;
        }
        const U = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: I,
          clientY: E,
          button: 2,
          view: window
        });
        D.dispatchEvent(U);
      }, t);
    }, x = (C) => {
      if (!f.current || a.current === null) return;
      const B = C.clientX - h.current.x, I = C.clientY - h.current.y;
      Math.sqrt(B * B + I * I) > cl && (clearTimeout(a.current), a.current = null, u.current && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    }, v = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null);
    }, b = (C) => {
      tr(C.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), u.current !== null && (clearTimeout(u.current), u.current = null), f.current = !1, l(null));
    };
    return c == null || c.addEventListener("pointerdown", y), c.addEventListener("pointermove", x), c.addEventListener("pointerup", v), c.addEventListener("pointercancel", v), c.addEventListener("pointerleave", b), () => {
      c.removeEventListener("pointerdown", y), c.removeEventListener("pointermove", x), c.removeEventListener("pointerup", v), c == null || c.removeEventListener("pointercancel", v), c == null || c.removeEventListener("pointerleave", b), a.current !== null && clearTimeout(a.current), u.current !== null && clearTimeout(u.current);
    };
  }, [e, t, d, r]), /* @__PURE__ */ R(Ue, { children: [
    n,
    e && s && /* @__PURE__ */ g(ul, { x: s.x, y: s.y, ms: t - d })
  ] });
}
function Rf() {
  const n = Hs();
  return _s ? n === null || tr(n) : !1;
}
function Je({
  variant: n = "subtle",
  theme: e = "light",
  cloud: t = !1,
  active: r = !1,
  className: i = "",
  type: o = "button",
  ...s
}) {
  const l = dt({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), c = dt({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), a = dt({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), u = "", h = "", f = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", d = {
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
      primary: { base: `${h} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${u} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${u} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${h} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${u} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, y = `${h} bg-blue-950 hover:bg-blue-900 text-white`, x = "bg-blue-900!", v = s["data-state"] === "open", b = m[e][n], C = n === "primary" ? c : n.startsWith("tab") ? a : l, B = A(6, 8, ke()), I = e === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let E;
  if (n === "tab") {
    const D = d[e];
    E = r ? t ? D.cloudActive : D.active : t ? D.cloudInactive : D.inactive;
  } else n === "tab-header" ? E = `${r ? t ? p.cloudActive : p.active : t ? p.cloudInactive : p.inactive} ${v ? t ? p.cloudOpen : p.open : ""}` : (E = `${b.base} ${v ? b.open : ""}`, r && (E = `${E} ${I}`), n === "primary" && e === "light" && t && (E = v ? `${y} ${x}` : y));
  return /* @__PURE__ */ g("button", { type: o, className: `${f} ${E} ${i}`, style: { ...C, gap: B }, ...s });
}
const dl = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], hl = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Jn = 1900, qn = 2100;
function pl(n, e) {
  return new Date(n, e + 1, 0).getDate();
}
function ml(n, e, t) {
  return `${n}-${String(e + 1).padStart(2, "0")}-${String(t).padStart(2, "0")}`;
}
function If({ selected: n, onChange: e, theme: t = "light", showChips: r = !0, className: i = "", initialView: o }) {
  const s = /* @__PURE__ */ new Date(), l = (() => {
    if (!o) return s;
    const F = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(F.getTime()) ? s : F;
  })(), [c, a] = Y(l.getFullYear()), [u, h] = Y(l.getMonth()), [f, d] = Y("days"), [p, m] = Y(null), y = vn(() => new Set(n), [n]), x = (F) => {
    y.has(F) ? e(n.filter((ee) => ee !== F)) : e([...n, F]);
  }, v = vn(() => {
    const F = pl(c, u), ee = new Date(c, u, 1).getDay(), ue = [];
    for (let pe = 0; pe < ee; pe++) ue.push({ key: `pad-${pe}`, day: 0, empty: !0 });
    for (let pe = 1; pe <= F; pe++) ue.push({ key: ml(c, u, pe), day: pe, empty: !1 });
    return ue;
  }, [c, u]), b = (F) => a((ee) => Math.max(Jn, Math.min(qn, ee + F))), C = (F) => {
    u + F < 0 ? (a((ee) => Math.max(Jn, ee - 1)), h(11)) : u + F > 11 ? (a((ee) => Math.min(qn, ee + 1)), h(0)) : h((ee) => ee + F);
  }, B = () => {
    if (p === null) return;
    const F = parseInt(p, 10);
    !isNaN(F) && F >= Jn && F <= qn && a(F), m(null);
  }, I = (F) => n.some((ee) => ee.startsWith(`${c}-${String(F + 1).padStart(2, "0")}`)), E = t === "dark", D = ke(), T = A(4, 8, D), U = A(16, 20, D), N = A(10, 11, D), W = A(6, 8, D), z = A(12, 14, D), O = A(6, 10, D), P = A(12, 14, D), j = A(8, 12, D), te = A(10, 12, D), se = A(6, 10, D), le = A(2, 6, D), X = A(64, 80, D), be = { padding: T }, H = { width: U, height: U }, G = { fontSize: N, paddingTop: W, paddingBottom: W }, q = { fontSize: z, paddingTop: O, paddingBottom: O }, S = { fontSize: P, paddingTop: j, paddingBottom: j }, Z = { fontSize: te, padding: `${le}px ${se}px` }, K = E ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ze = E ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ R("div", { className: `border rounded-lg overflow-hidden w-full ${E ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ R("div", { className: `flex items-center justify-between px-3 py-2 border-b ${E ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? b(-1) : C(-1),
          style: be,
          className: `rounded transition-colors ${E ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ g(fs, { style: H })
        }
      ),
      f === "days" ? /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => d("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${E ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(c, u).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ g(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(c),
          onChange: (F) => m(F.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (F) => F.target.select(),
          onBlur: B,
          onKeyDown: (F) => {
            F.key === "Enter" && (F.preventDefault(), B()), F.key === "Escape" && m(null);
          },
          style: { width: X },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${E ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? b(1) : C(1),
          style: be,
          className: `rounded transition-colors ${E ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ g(Sn, { style: H })
        }
      )
    ] }),
    f === "months" ? /* @__PURE__ */ R("div", { children: [
      /* @__PURE__ */ g("div", { className: "grid grid-cols-3 text-center", children: hl.map((F, ee) => /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: () => {
            h(ee), d("days");
          },
          style: S,
          className: `relative font-medium transition-colors border-b ${ee === u ? K : ze} ${E ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            F,
            I(ee) && /* @__PURE__ */ g("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${ee === u ? "bg-white" : E ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        F
      )) }),
      /* @__PURE__ */ g("div", { className: `text-center border-t ${E ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => {
            a(s.getFullYear()), h(s.getMonth()), d("days");
          },
          style: { paddingTop: O, paddingBottom: O, fontSize: z },
          className: `px-3 font-semibold rounded transition-colors ${E ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ R("div", { className: "grid grid-cols-7 text-center", children: [
      dl.map((F) => /* @__PURE__ */ g("div", { style: G, className: `font-semibold uppercase tracking-wider border-b ${E ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: F }, F)),
      v.map((F) => F.empty ? /* @__PURE__ */ g("div", {}, F.key) : /* @__PURE__ */ g(
        "button",
        {
          type: "button",
          onClick: () => x(F.key),
          style: q,
          className: `font-medium transition-colors border-b ${E ? "border-zinc-800/60" : "border-zinc-50"} ${y.has(F.key) ? K : E ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: F.day
        },
        F.key
      ))
    ] }),
    r && n.length > 0 && /* @__PURE__ */ R("div", { className: `px-3 py-2 border-t ${E ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ R("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        n.length,
        " date",
        n.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ g("div", { className: "flex flex-wrap gap-1", children: n.map((F) => {
        const ee = /* @__PURE__ */ new Date(F + "T00:00:00"), ue = ee.getFullYear() === s.getFullYear() ? ee.toLocaleString("default", { month: "short", day: "numeric" }) : ee.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ R(
          "button",
          {
            type: "button",
            onClick: () => x(F),
            "aria-label": `Remove ${ue}`,
            style: Z,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${E ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              ue,
              /* @__PURE__ */ g("span", { className: `leading-none ${E ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          F
        );
      }) })
    ] })
  ] });
}
function $f({
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
  theme: u,
  className: h = ""
}) {
  const f = (b) => e instanceof Set ? e.has(b) : e.includes(b), d = ke(), p = A(12, 16, d), m = A(8, 12, d), y = A(12, 14, d), x = A(16, 20, d), v = r != null || i != null;
  return /* @__PURE__ */ R("div", { className: h, ...u ? { "data-theme": u } : {}, children: [
    v && /* @__PURE__ */ R("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ g("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ g("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: s ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ R(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          n.map((b) => {
            const C = f(b.id);
            return /* @__PURE__ */ R(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => t(b.id),
                className: `ui-checklist-item ${C ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${m}px ${p}px`, fontSize: y },
                children: [
                  /* @__PURE__ */ g(Wi, { checked: C, size: x }),
                  b.leading != null && /* @__PURE__ */ g("span", { className: "ui-checklist-leading", children: b.leading }),
                  /* @__PURE__ */ g("span", { className: "ui-checklist-label", children: b.label }),
                  b.secondary != null && /* @__PURE__ */ g("span", { className: "ui-checklist-secondary", children: b.secondary })
                ]
              },
              b.id
            );
          }),
          n.length === 0 && /* @__PURE__ */ g("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
function Of({
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
  const u = ke(), h = s ? 10 : A(12, 16, u), f = s ? 6 : A(8, 12, u), d = s ? 12 : A(12, 14, u), p = s ? 14 : A(16, 20, u);
  return /* @__PURE__ */ R("div", { className: a, ...c ? { "data-theme": c } : {}, children: [
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
                style: { padding: `${f}px ${h}px`, fontSize: d },
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
const Df = ({
  className: n,
  children: e,
  reference: t,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: o = 8
}) => {
  const s = tn(), { refs: l, floatingStyles: c } = bs({
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
          var v;
          if (i !== "visible") return {};
          const u = (v = a.elements.floating.ownerDocument) == null ? void 0 : v.defaultView;
          if (!u) return {};
          const h = a.rects.reference, f = Math.max(h.x, 0), d = Math.max(h.y, 0), p = Math.min(h.x + h.width, u.innerWidth), m = Math.min(h.y + h.height, u.innerHeight);
          if (p <= f || m <= d) return {};
          const y = r === "left" ? p - (h.x + h.width) : r === "right" ? f - h.x : 0, x = r === "top" ? d - h.y : r === "bottom" ? m - (h.y + h.height) : 0;
          return { x: a.x + y, y: a.y + x };
        }
      },
      Ci(o),
      Ei({ padding: 8 }),
      Ti({ padding: 8 }),
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
          const h = a.rects.floating.width, f = a.rects.floating.height, d = Math.max(8, Math.min(a.x, u.innerWidth - h - 8)), p = Math.max(8, Math.min(a.y, u.innerHeight - f - 8));
          return { x: d, y: p };
        }
      }
    ],
    whileElementsMounted: vs
  });
  return qe(() => {
    t && l.setReference(t);
  }, [t, l]), /* @__PURE__ */ R(Ue, { children: [
    !t && /* @__PURE__ */ g("div", { ref: l.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && dr(
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
  const t = ke(), r = A(10, 12, t), i = A(6, 6, t), o = A(10, 12, t), s = { padding: `${i}px ${r}px`, fontSize: o }, l = en(), c = tn(), [a, u] = Y(!1), [h, f] = Y({ x: 0, y: 0 }), d = k(null), p = k(null), m = () => {
    if (!d.current) return;
    const y = d.current.getBoundingClientRect();
    f({ x: y.left + y.width / 2, y: y.top });
  };
  return Q(() => () => {
    p.current && clearTimeout(p.current);
  }, []), Q(() => (a && c && (m(), c.addEventListener("scroll", m, !0)), () => c == null ? void 0 : c.removeEventListener("scroll", m, !0)), [a]), /* @__PURE__ */ R(
    "div",
    {
      ref: d,
      className: "inline-flex",
      onMouseEnter: () => {
        p.current && clearTimeout(p.current), m(), u(!0);
      },
      onMouseLeave: () => {
        p.current = setTimeout(() => u(!1), 60);
      },
      children: [
        e,
        a && dr(
          /* @__PURE__ */ R(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white pointer-events-none",
              style: { ...s, left: h.x, top: h.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
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
function Lt() {
  const n = ke(), e = Ee, t = e ? A(28, 40, n) : 28, r = e ? A(28, 40, n) : 28, i = e ? A(10, 14, n) : 10, o = e ? A(10, 14, n) : 10, s = e ? A(8, 10, n) : 8;
  return {
    toggle: { width: t, height: t },
    control: { height: r, padding: `0 ${i}px`, fontSize: o },
    input: { height: r, padding: `0 ${s}px`, fontSize: o }
  };
}
const Pf = Ee ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", gl = Ee ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", fn = Ee ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", yl = "hover:bg-red-950/50", Lf = Ee ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Bf = "bg-blue-900/50 border-blue-700 text-blue-300", Ff = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ji = Ee ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", _f = Ee ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Wt = Ee ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", xl = "inline-flex rounded overflow-hidden border border-zinc-700", Hf = Ee ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", dn = ({ onClick: n, disabled: e, title: t, className: r = gl, children: i }) => {
  const o = Lt();
  return /* @__PURE__ */ g(St, { content: t, children: /* @__PURE__ */ g("button", { onClick: n, disabled: e, "aria-label": t, style: o.control, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) });
}, Wf = ({ value: n, options: e, onChange: t, disabled: r, active: i, stretch: o }) => {
  const s = Lt();
  return /* @__PURE__ */ g("div", { className: `${xl}${o ? " w-full" : ""}`, children: e.map((l) => {
    const c = i ? i(l.v) : n === l.v;
    return /* @__PURE__ */ g(
      "button",
      {
        disabled: r,
        onClick: () => t(l.v),
        style: s.control,
        className: `font-medium transition-colors disabled:opacity-30 ${o ? "flex-1" : ""} ${c ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${l.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
        children: l.l
      },
      l.v
    );
  }) });
}, jf = ({ children: n }) => /* @__PURE__ */ R("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ g("span", { className: Ee ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: n }),
  /* @__PURE__ */ g("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), wl = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", bl = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Jf = ({ label: n, children: e, tall: t }) => /* @__PURE__ */ R("div", { className: t ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  n && /* @__PURE__ */ g("span", { className: t ? wl : bl, children: n }),
  e
] }), qf = ({ leading: n, trailing: e, className: t = "" }) => /* @__PURE__ */ R("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${t}`, children: [
  n,
  e && /* @__PURE__ */ g("div", { className: "ml-auto flex items-center gap-1", children: e })
] }), Kf = ({ readOnly: n, onDuplicate: e, onRemove: t, onMove: r, compact: i }) => /* @__PURE__ */ R(Ue, { children: [
  /* @__PURE__ */ g(dn, { onClick: () => r(-1), disabled: n, title: "Move up", className: fn, children: /* @__PURE__ */ g(ds, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ g(dn, { onClick: () => r(1), disabled: n, title: "Move down", className: fn, children: /* @__PURE__ */ g(hs, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ g(dn, { onClick: e, disabled: n, title: "Duplicate", className: fn, children: /* @__PURE__ */ g(ki, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ g("div", { className: Wt }),
  /* @__PURE__ */ g(dn, { onClick: t, disabled: n, title: "Delete", className: `${fn} ${yl}`, children: /* @__PURE__ */ g(er, { className: "w-2.5 h-2.5" }) })
] });
function Ce(n) {
  this.content = n;
}
Ce.prototype = {
  constructor: Ce,
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
    return i == -1 ? o.push(t || n, e) : (o[i + 1] = e, t && (o[i] = t)), new Ce(o);
  },
  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(n) {
    var e = this.find(n);
    if (e == -1) return this;
    var t = this.content.slice();
    return t.splice(e, 2), new Ce(t);
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(n, e) {
    return new Ce([n, e].concat(this.remove(n).content));
  },
  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(n, e) {
    var t = this.remove(n).content.slice();
    return t.push(n, e), new Ce(t);
  },
  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(n, e, t) {
    var r = this.remove(e), i = r.content.slice(), o = r.find(n);
    return i.splice(o == -1 ? i.length : o, 0, e, t), new Ce(i);
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
    return n = Ce.from(n), n.size ? new Ce(n.content.concat(this.subtract(n).content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(n) {
    return n = Ce.from(n), n.size ? new Ce(this.subtract(n).content.concat(n.content)) : this;
  },
  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(n) {
    var e = this;
    n = Ce.from(n);
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
Ce.from = function(n) {
  if (n instanceof Ce) return n;
  var e = [];
  if (n) for (var t in n) e.push(t, n[t]);
  return new Ce(e);
};
function qi(n, e, t) {
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
      return c && c < s.length && c < l.length && Yi(s.charCodeAt(c - 1)) && Vi(s.charCodeAt(c)) && t--, t;
    }
    if (i.content.size || o.content.size) {
      let s = qi(i.content, o.content, t + 1);
      if (s != null)
        return s;
    }
    t += i.nodeSize;
  }
}
function Ki(n, e, t, r) {
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
      let a = s.text, u = l.text, h = a.length, f = u.length;
      for (; h > 0 && f > 0 && a[h - 1] == u[f - 1]; )
        h--, f--, t--, r--;
      return h && f && h < a.length && Yi(a.charCodeAt(h - 1)) && Vi(a.charCodeAt(h)) && (t++, r++), { a: t, b: r };
    }
    if (s.content.size || l.content.size) {
      let a = Ki(s.content, l.content, t - 1, r - 1);
      if (a)
        return a;
    }
    t -= c, r -= c;
  }
}
function Vi(n) {
  return n >= 56320 && n < 57344;
}
function Yi(n) {
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
    return qi(this, e, t);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(e, t = this.size, r = e.size) {
    return Ki(this, e, t, r);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(e) {
    if (e == 0)
      return hn(0, e);
    if (e == this.size)
      return hn(this.content.length, e);
    if (e > this.size || e < 0)
      throw new RangeError(`Position ${e} outside of fragment (${this})`);
    for (let t = 0, r = 0; ; t++) {
      let i = this.child(t), o = r + i.nodeSize;
      if (o >= e)
        return o == e ? hn(t + 1, o) : hn(t, r);
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
const Kn = { index: 0, offset: 0 };
function hn(n, e) {
  return Kn.index = n, Kn.offset = e, Kn;
}
function En(n, e) {
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
      if (!En(n[r], e[r]))
        return !1;
  } else {
    for (let r in n)
      if (!(r in e) || !En(n[r], e[r]))
        return !1;
    for (let r in e)
      if (!(r in n))
        return !1;
  }
  return !0;
}
class ae {
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
    return this == e || this.type == e.type && En(this.attrs, e.attrs);
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
      return ae.none;
    if (e instanceof ae)
      return [e];
    let t = e.slice();
    return t.sort((r, i) => r.type.rank - i.type.rank), t;
  }
}
ae.none = [];
class Ut extends Error {
}
class L {
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
    let r = Xi(this.content, e + this.openStart, t, this.openStart + 1, this.openEnd + 1);
    return r && new L(r, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(e, t) {
    return new L(Ui(this.content, e + this.openStart, t + this.openStart), this.openStart, this.openEnd);
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
      return L.empty;
    let r = t.openStart || 0, i = t.openEnd || 0;
    if (typeof r != "number" || typeof i != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new L(M.fromJSON(e, t.content), r, i);
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
    return new L(e, r, i);
  }
}
L.empty = new L(M.empty, 0, 0);
function Ui(n, e, t) {
  let { index: r, offset: i } = n.findIndex(e), o = n.maybeChild(r), { index: s, offset: l } = n.findIndex(t);
  if (i == e || o.isText) {
    if (l != t && !n.child(s).isText)
      throw new RangeError("Removing non-flat range");
    return n.cut(0, e).append(n.cut(t));
  }
  if (r != s)
    throw new RangeError("Removing non-flat range");
  return n.replaceChild(r, o.copy(Ui(o.content, e - i - 1, t - i - 1)));
}
function Xi(n, e, t, r, i, o) {
  let { index: s, offset: l } = n.findIndex(e), c = n.maybeChild(s);
  if (l == e || c.isText)
    return o && r <= 0 && i <= 0 && !o.canReplace(s, s, t) ? null : n.cut(0, e).append(t).append(n.cut(e));
  let a = Xi(c.content, e - l - 1, t, s == 0 ? r - 1 : 0, s == n.childCount - 1 ? i - 1 : 0, c);
  return a && n.replaceChild(s, c.copy(a));
}
function vl(n, e, t) {
  if (t.openStart > n.depth)
    throw new Ut("Inserted content deeper than insertion position");
  if (n.depth - t.openStart != e.depth - t.openEnd)
    throw new Ut("Inconsistent open depths");
  return Gi(n, e, t, 0);
}
function Gi(n, e, t, r) {
  let i = n.index(r), o = n.node(r);
  if (i == e.index(r) && r < n.depth - t.openStart) {
    let s = Gi(n, e, t, r + 1);
    return o.copy(o.content.replaceChild(i, s));
  } else if (t.content.size)
    if (!t.openStart && !t.openEnd && n.depth == r && e.depth == r) {
      let s = n.parent, l = s.content;
      return pt(s, l.cut(0, n.parentOffset).append(t.content).append(l.cut(e.parentOffset)));
    } else {
      let { start: s, end: l } = kl(t, n);
      return pt(o, Zi(n, s, l, e, r));
    }
  else return pt(o, Tn(n, e, r));
}
function Qi(n, e) {
  if (!e.type.compatibleContent(n.type))
    throw new Ut("Cannot join " + e.type.name + " onto " + n.type.name);
}
function ir(n, e, t) {
  let r = n.node(t);
  return Qi(r, e.node(t)), r;
}
function ht(n, e) {
  let t = e.length - 1;
  t >= 0 && n.isText && n.sameMarkup(e[t]) ? e[t] = n.withText(e[t].text + n.text) : e.push(n);
}
function qt(n, e, t, r) {
  let i = (e || n).node(t), o = 0, s = e ? e.index(t) : i.childCount;
  n && (o = n.index(t), n.depth > t ? o++ : n.textOffset && (ht(n.nodeAfter, r), o++));
  for (let l = o; l < s; l++)
    ht(i.child(l), r);
  e && e.depth == t && e.textOffset && ht(e.nodeBefore, r);
}
function pt(n, e) {
  if (!n.type.validContent(e))
    throw new Ut("Invalid content for node " + n.type.name);
  return n.copy(e);
}
function Zi(n, e, t, r, i) {
  let o = n.depth > i && ir(n, e, i + 1), s = r.depth > i && ir(t, r, i + 1), l = [];
  return qt(null, n, i, l), o && s && e.index(i) == t.index(i) ? (Qi(o, s), ht(pt(o, Zi(n, e, t, r, i + 1)), l)) : (o && ht(pt(o, Tn(n, e, i + 1)), l), qt(e, t, i, l), s && ht(pt(s, Tn(t, r, i + 1)), l)), qt(r, null, i, l), new M(l);
}
function Tn(n, e, t) {
  let r = [];
  if (qt(null, n, t, r), n.depth > t) {
    let i = ir(n, e, t + 1);
    ht(pt(i, Tn(n, e, t + 1)), r);
  }
  return qt(e, null, t, r), new M(r);
}
function kl(n, e) {
  let t = e.depth - n.openStart, i = e.node(t).copy(n.content);
  for (let o = t - 1; o >= 0; o--)
    i = e.node(o).copy(M.from(i));
  return {
    start: i.resolveNoCache(n.openStart + t),
    end: i.resolveNoCache(i.content.size - n.openEnd - t)
  };
}
class Xt {
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
      return ae.none;
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
    return new Xt(t, r, o);
  }
  /**
  @internal
  */
  static resolveCached(e, t) {
    let r = Xr.get(e);
    if (r)
      for (let o = 0; o < r.elts.length; o++) {
        let s = r.elts[o];
        if (s.pos == t)
          return s;
      }
    else
      Xr.set(e, r = new Sl());
    let i = r.elts[r.i] = Xt.resolve(e, t);
    return r.i = (r.i + 1) % Cl, i;
  }
}
class Sl {
  constructor() {
    this.elts = [], this.i = 0;
  }
}
const Cl = 12, Xr = /* @__PURE__ */ new WeakMap();
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
const El = /* @__PURE__ */ Object.create(null);
let Mt = class or {
  /**
  @internal
  */
  constructor(e, t, r, i = ae.none) {
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
    return this.type == e && En(this.attrs, t || e.defaultAttrs || El) && ae.sameSet(this.marks, r || ae.none);
  }
  /**
  Create a new node with the same markup as this node, containing
  the given content (or empty, if no content is given).
  */
  copy(e = null) {
    return e == this.content ? this : new or(this.type, this.attrs, e, this.marks);
  }
  /**
  Create a copy of this node, with the given set of marks instead
  of the node's own marks.
  */
  mark(e) {
    return e == this.marks ? this : new or(this.type, this.attrs, this.content, e);
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
      return L.empty;
    let i = this.resolve(e), o = this.resolve(t), s = r ? 0 : i.sharedDepth(t), l = i.start(s), a = i.node(s).content.cut(i.pos - l, o.pos - l);
    return new L(a, i.depth - s, o.depth - s);
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
    return vl(this.resolve(e), this.resolve(t), r);
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
    return Xt.resolveCached(this, e);
  }
  /**
  @internal
  */
  resolveNoCache(e) {
    return Xt.resolve(this, e);
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
    return this.content.size && (e += "(" + this.content.toStringInner() + ")"), eo(this.marks, e);
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
    this.type.checkContent(this.content), this.type.checkAttrs(this.attrs);
    let e = ae.none;
    for (let t = 0; t < this.marks.length; t++) {
      let r = this.marks[t];
      r.type.checkAttrs(r.attrs), e = r.addToSet(e);
    }
    if (!ae.sameSet(e, this.marks))
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
    let i = M.fromJSON(e, t.content), o = e.nodeType(t.type).create(t.attrs, i, r);
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
    return this.type.spec.toDebugString ? this.type.spec.toDebugString(this) : eo(this.marks, JSON.stringify(this.text));
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
function eo(n, e) {
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
    let r = new Tl(e, t);
    if (r.next == null)
      return gt.empty;
    let i = to(r);
    r.next && r.err("Unexpected trailing text");
    let o = $l(Il(i));
    return Ol(o, r), o;
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
        let { type: u, next: h } = s.next[a];
        if (!(u.isText || u.hasRequiredAttrs()) && i.indexOf(h) == -1) {
          i.push(h);
          let f = o(h, l.concat(u));
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
class Tl {
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
function to(n) {
  let e = [];
  do
    e.push(Ml(n));
  while (n.eat("|"));
  return e.length == 1 ? e[0] : { type: "choice", exprs: e };
}
function Ml(n) {
  let e = [];
  do
    e.push(Nl(n));
  while (n.next && n.next != ")" && n.next != "|");
  return e.length == 1 ? e[0] : { type: "seq", exprs: e };
}
function Nl(n) {
  let e = Rl(n);
  for (; ; )
    if (n.eat("+"))
      e = { type: "plus", expr: e };
    else if (n.eat("*"))
      e = { type: "star", expr: e };
    else if (n.eat("?"))
      e = { type: "opt", expr: e };
    else if (n.eat("{"))
      e = Al(n, e);
    else
      break;
  return e;
}
function Gr(n) {
  /\D/.test(n.next) && n.err("Expected number, got '" + n.next + "'");
  let e = Number(n.next);
  return n.pos++, e;
}
function Al(n, e) {
  let t = Gr(n), r = t;
  return n.eat(",") && (n.next != "}" ? r = Gr(n) : r = -1), n.eat("}") || n.err("Unclosed braced range"), { type: "range", min: t, max: r, expr: e };
}
function zl(n, e) {
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
function Rl(n) {
  if (n.eat("(")) {
    let e = to(n);
    return n.eat(")") || n.err("Missing closing paren"), e;
  } else if (/\W/.test(n.next))
    n.err("Unexpected token '" + n.next + "'");
  else {
    let e = zl(n, n.next).map((t) => (n.inline == null ? n.inline = t.isInline : n.inline != t.isInline && n.err("Mixing inline and block content"), { type: "name", value: t }));
    return n.pos++, e.length == 1 ? e[0] : { type: "choice", exprs: e };
  }
}
function Il(n) {
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
function no(n, e) {
  return e - n;
}
function Qr(n, e) {
  let t = [];
  return r(e), t.sort(no);
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
function $l(n) {
  let e = /* @__PURE__ */ Object.create(null);
  return t(Qr(n, 0));
  function t(r) {
    let i = [];
    r.forEach((s) => {
      n[s].forEach(({ term: l, to: c }) => {
        if (!l)
          return;
        let a;
        for (let u = 0; u < i.length; u++)
          i[u][0] == l && (a = i[u][1]);
        Qr(n, c).forEach((u) => {
          a || i.push([l, a = []]), a.indexOf(u) == -1 && a.push(u);
        });
      });
    });
    let o = e[r.join(",")] = new gt(r.indexOf(n.length - 1) > -1);
    for (let s = 0; s < i.length; s++) {
      let l = i[s][1].sort(no);
      o.next.push({ type: i[s][0], next: e[l.join(",")] || t(l) });
    }
    return o;
  }
}
function Ol(n, e) {
  for (let t = 0, r = [n]; t < r.length; t++) {
    let i = r[t], o = !i.validEnd, s = [];
    for (let l = 0; l < i.next.length; l++) {
      let { type: c, next: a } = i.next[l];
      s.push(c.name), o && !(c.isText || c.hasRequiredAttrs()) && (o = !1), r.indexOf(a) == -1 && r.push(a);
    }
    o && e.err("Only non-generatable nodes (" + s.join(", ") + ") in a required position (see https://prosemirror.net/docs/guide/#generatable)");
  }
}
function ro(n) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in n) {
    let r = n[t];
    if (!r.hasDefault)
      return null;
    e[t] = r.default;
  }
  return e;
}
function io(n, e) {
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
function oo(n, e, t, r) {
  for (let i in e)
    if (!(i in n))
      throw new RangeError(`Unsupported attribute ${i} for ${t} of type ${r}`);
  for (let i in n)
    n[i].validate && n[i].validate(e[i]);
}
function so(n, e) {
  let t = /* @__PURE__ */ Object.create(null);
  if (e)
    for (let r in e)
      t[r] = new Pl(n, r, e[r]);
  return t;
}
class An {
  /**
  @internal
  */
  constructor(e, t, r) {
    this.name = e, this.schema = t, this.spec = r, this.markSet = null, this.groups = r.group ? r.group.split(" ") : [], this.attrs = so(e, r.attrs), this.defaultAttrs = ro(this.attrs), this.contentMatch = null, this.inlineContent = null, this.isBlock = !(r.inline || e == "text"), this.isText = e == "text";
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
    return !e && this.defaultAttrs ? this.defaultAttrs : io(this.attrs, e);
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
    return new Mt(this, this.computeAttrs(e), M.from(t), ae.setFrom(r));
  }
  /**
  Like [`create`](https://prosemirror.net/docs/ref/#model.NodeType.create), but check the given content
  against the node type's content restrictions, and throw an error
  if it doesn't match.
  */
  createChecked(e = null, t, r) {
    return t = M.from(t), this.checkContent(t), new Mt(this, this.computeAttrs(e), t, ae.setFrom(r));
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
    return o ? new Mt(this, e, t.append(o), ae.setFrom(r)) : null;
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
    oo(this.attrs, e, "node", this.name);
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
    return t ? t.length ? t : ae.none : e;
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
function Dl(n, e, t) {
  let r = t.split("|");
  return (i) => {
    let o = i === null ? "null" : typeof i;
    if (r.indexOf(o) < 0)
      throw new RangeError(`Expected value of type ${r} for attribute ${e} on type ${n}, got ${o}`);
  };
}
class Pl {
  constructor(e, t, r) {
    this.hasDefault = Object.prototype.hasOwnProperty.call(r, "default"), this.default = r.default, this.validate = typeof r.validate == "string" ? Dl(e, t, r.validate) : r.validate;
  }
  get isRequired() {
    return !this.hasDefault;
  }
}
class Pn {
  /**
  @internal
  */
  constructor(e, t, r, i) {
    this.name = e, this.rank = t, this.schema = r, this.spec = i, this.attrs = so(e, i.attrs), this.excluded = null;
    let o = ro(this.attrs);
    this.instance = o ? new ae(this, o) : null;
  }
  /**
  Create a mark of this type. `attrs` may be `null` or an object
  containing only some of the mark's attributes. The others, if
  they have defaults, will be added.
  */
  create(e = null) {
    return !e && this.instance ? this.instance : new ae(this, io(this.attrs, e));
  }
  /**
  @internal
  */
  static compile(e, t) {
    let r = /* @__PURE__ */ Object.create(null), i = 0;
    return e.forEach((o, s) => r[o] = new Pn(o, i++, t, s)), r;
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
    oo(this.attrs, e, "mark", this.name);
  }
  /**
  Queries whether a given mark type is
  [excluded](https://prosemirror.net/docs/ref/#model.MarkSpec.excludes) by this one.
  */
  excludes(e) {
    return this.excluded.indexOf(e) > -1;
  }
}
class Ll {
  /**
  Construct a schema from a schema [specification](https://prosemirror.net/docs/ref/#model.SchemaSpec).
  */
  constructor(e) {
    this.linebreakReplacement = null, this.cached = /* @__PURE__ */ Object.create(null);
    let t = this.spec = {};
    for (let i in e)
      t[i] = e[i];
    t.nodes = Ce.from(e.nodes), t.marks = Ce.from(e.marks || {}), this.nodes = An.compile(this.spec.nodes, this), this.marks = Pn.compile(this.spec.marks, this);
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
      o.markSet = l == "_" ? null : l ? Zr(this, l.split(" ")) : l == "" || !o.inlineContent ? [] : null;
    }
    for (let i in this.marks) {
      let o = this.marks[i], s = o.spec.excludes;
      o.excluded = s == null ? [o] : s == "" ? [] : Zr(this, s.split(" "));
    }
    this.nodeFromJSON = (i) => Mt.fromJSON(this, i), this.markFromJSON = (i) => ae.fromJSON(this, i), this.topNodeType = this.nodes[this.spec.topNode || "doc"], this.cached.wrappings = /* @__PURE__ */ Object.create(null);
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
    return new Nn(r, r.defaultAttrs, e, ae.setFrom(t));
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
function Zr(n, e) {
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
function Bl(n) {
  return n.tag != null;
}
function Fl(n) {
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
      if (Bl(i))
        this.tags.push(i);
      else if (Fl(i)) {
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
    let r = new ti(this, t, !1);
    return r.addAll(e, ae.none, t.from, t.to), r.finish();
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
    let r = new ti(this, t, !0);
    return r.addAll(e, ae.none, t.from, t.to), L.maxOpen(r.finish());
  }
  /**
  @internal
  */
  matchTag(e, t, r) {
    for (let i = r ? this.tags.indexOf(r) + 1 : 0; i < this.tags.length; i++) {
      let o = this.tags[i];
      if (Wl(e, o.tag) && (o.namespace === void 0 || e.namespaceURI == o.namespace) && (!o.context || t.matchesContext(o.context))) {
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
        r(s = ni(s)), s.mark || s.ignore || s.clearMark || (s.mark = i);
      });
    }
    for (let i in e.nodes) {
      let o = e.nodes[i].spec.parseDOM;
      o && o.forEach((s) => {
        r(s = ni(s)), s.node || s.ignore || s.mark || (s.node = i);
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
const lo = {
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
}, _l = {
  head: !0,
  noscript: !0,
  object: !0,
  script: !0,
  style: !0,
  title: !0
}, co = { ol: !0, ul: !0 }, Gt = 1, sr = 2, Kt = 4;
function ei(n, e, t) {
  return e != null ? (e ? Gt : 0) | (e === "full" ? sr : 0) : n && n.whitespace == "pre" ? Gt | sr : t & ~Kt;
}
class pn {
  constructor(e, t, r, i, o, s) {
    this.type = e, this.attrs = t, this.marks = r, this.solid = i, this.options = s, this.content = [], this.activeMarks = ae.none, this.match = o || (s & Kt ? null : e.contentMatch);
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
    if (!(this.options & Gt)) {
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
    return this.type ? this.type.inlineContent : this.content.length ? this.content[0].isInline : e.parentNode && !lo.hasOwnProperty(e.parentNode.nodeName.toLowerCase());
  }
}
class ti {
  constructor(e, t, r) {
    this.parser = e, this.options = t, this.isOpen = r, this.open = 0, this.localPreserveWS = !1;
    let i = t.topNode, o, s = ei(null, t.preserveWhitespace, 0) | (r ? Kt : 0);
    i ? o = new pn(i.type, i.attrs, ae.none, !0, t.topMatch || i.type.contentMatch, s) : r ? o = new pn(null, null, ae.none, !0, null, s) : o = new pn(e.schema.topNodeType, null, ae.none, !0, null, s), this.nodes = [o], this.find = t.findPositions, this.needsBlock = !1;
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
    let r = e.nodeValue, i = this.top, o = i.options & sr ? "full" : this.localPreserveWS || (i.options & Gt) > 0, { schema: s } = this.parser;
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
    co.hasOwnProperty(s) && this.parser.normalizeLists && Hl(e);
    let c = this.options.ruleFromNode && this.options.ruleFromNode(e) || (l = this.parser.matchTag(e, this, r));
    e: if (c ? c.ignore : _l.hasOwnProperty(s))
      this.findInside(e), this.ignoreFallback(e, t);
    else if (!c || c.skip || c.closeParent) {
      c && c.closeParent ? this.open = Math.max(0, this.open - 1) : c && c.skip.nodeType && (e = c.skip);
      let a, u = this.needsBlock;
      if (lo.hasOwnProperty(s))
        o.content.length && o.content[0].isInline && this.open && (this.open--, o = this.top), a = !0, o.type || (this.needsBlock = !0);
      else if (!e.firstChild) {
        this.leafFallback(e, t);
        break e;
      }
      let h = c && c.skip ? t : this.readStyles(e, t);
      h && this.addAll(e, h), a && this.sync(o), this.needsBlock = u;
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
      let s = ae.none;
      for (let l of i.concat(e.marks))
        (o.type ? o.type.allowsMarkType(l.type) : ri(l.type, e.type)) && (s = l.addToSet(s));
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
    let l = ei(e, o, s.options);
    s.options & Kt && s.content.length == 0 && (l |= Kt);
    let c = ae.none;
    return r = r.filter((a) => (s.type ? s.type.allowsMarkType(a.type) : ri(a.type, e)) ? (c = a.addToSet(c), !1) : !0), this.nodes.push(new pn(e, t, c, i, null, l)), this.open++, r;
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
      this.localPreserveWS && (this.nodes[t].options |= Gt);
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
function Hl(n) {
  for (let e = n.firstChild, t = null; e; e = e.nextSibling) {
    let r = e.nodeType == 1 ? e.nodeName.toLowerCase() : null;
    r && co.hasOwnProperty(r) && t ? (t.appendChild(e), e = t) : r == "li" ? t = e : r && (t = null);
  }
}
function Wl(n, e) {
  return (n.matches || n.msMatchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector).call(n, e);
}
function ni(n) {
  let e = {};
  for (let t in n)
    e[t] = n[t];
  return e;
}
function ri(n, e) {
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
const ao = 65535, uo = Math.pow(2, 16);
function jl(n, e) {
  return n + e * uo;
}
function ii(n) {
  return n & ao;
}
function Jl(n) {
  return (n - (n & ao)) / uo;
}
const fo = 1, ho = 2, wn = 4, po = 8;
class lr {
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
    return (this.delInfo & po) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (fo | wn)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (ho | wn)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & wn) > 0;
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
    let t = 0, r = ii(e);
    if (!this.inverted)
      for (let i = 0; i < r; i++)
        t += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[r * 3] + t + Jl(e);
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
      let a = this.ranges[l + o], u = this.ranges[l + s], h = c + a;
      if (e <= h) {
        let f = a ? e == c ? -1 : e == h ? 1 : t : t, d = c + i + (f < 0 ? 0 : u);
        if (r)
          return d;
        let p = e == (t < 0 ? c : h) ? null : jl(l / 3, e - c), m = e == c ? ho : e == h ? fo : wn;
        return (t < 0 ? e != c : e != h) && (m |= po), new lr(d, m, p);
      }
      i += u - a;
    }
    return r ? e + i : new lr(e + i, 0, null);
  }
  /**
  @internal
  */
  touches(e, t) {
    let r = 0, i = ii(t), o = this.inverted ? 2 : 1, s = this.inverted ? 1 : 2;
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
    return r ? e : new lr(e, i, null);
  }
}
const Vn = /* @__PURE__ */ Object.create(null);
class Ae {
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
    let r = Vn[t.stepType];
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
    if (e in Vn)
      throw new RangeError("Duplicate use of step JSON ID " + e);
    return Vn[e] = t, t.prototype.jsonID = e, t;
  }
}
class we {
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
    return new we(e, null);
  }
  /**
  Create a failed step result.
  */
  static fail(e) {
    return new we(null, e);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(e, t, r, i) {
    try {
      return we.ok(e.replace(t, r, i));
    } catch (o) {
      if (o instanceof Ut)
        return we.fail(o.message);
      throw o;
    }
  }
}
function Er(n, e, t) {
  let r = [];
  for (let i = 0; i < n.childCount; i++) {
    let o = n.child(i);
    o.content.size && (o = o.copy(Er(o.content, e, o))), o.isInline && (o = e(o, t, i)), r.push(o);
  }
  return M.fromArray(r);
}
class rt extends Ae {
  /**
  Create a mark step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = e.resolve(this.from), i = r.node(r.sharedDepth(this.to)), o = new L(Er(t.content, (s, l) => !s.isAtom || !l.type.allowsMarkType(this.mark.type) ? s : s.mark(this.mark.addToSet(s.marks)), i), t.openStart, t.openEnd);
    return we.fromReplace(e, this.from, this.to, o);
  }
  invert() {
    return new _e(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new rt(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof rt && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new rt(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new rt(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ae.jsonID("addMark", rt);
class _e extends Ae {
  /**
  Create a mark-removing step.
  */
  constructor(e, t, r) {
    super(), this.from = e, this.to = t, this.mark = r;
  }
  apply(e) {
    let t = e.slice(this.from, this.to), r = new L(Er(t.content, (i) => i.mark(this.mark.removeFromSet(i.marks)), e), t.openStart, t.openEnd);
    return we.fromReplace(e, this.from, this.to, r);
  }
  invert() {
    return new rt(this.from, this.to, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1);
    return t.deleted && r.deleted || t.pos >= r.pos ? null : new _e(t.pos, r.pos, this.mark);
  }
  merge(e) {
    return e instanceof _e && e.mark.eq(this.mark) && this.from <= e.to && this.to >= e.from ? new _e(Math.min(this.from, e.from), Math.max(this.to, e.to), this.mark) : null;
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
    return new _e(t.from, t.to, e.markFromJSON(t.mark));
  }
}
Ae.jsonID("removeMark", _e);
class it extends Ae {
  /**
  Create a node mark step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return we.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.addToSet(t.marks));
    return we.fromReplace(e, this.pos, this.pos + 1, new L(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    if (t) {
      let r = this.mark.addToSet(t.marks);
      if (r.length == t.marks.length) {
        for (let i = 0; i < t.marks.length; i++)
          if (!t.marks[i].isInSet(r))
            return new it(this.pos, t.marks[i]);
        return new it(this.pos, this.mark);
      }
    }
    return new yt(this.pos, this.mark);
  }
  map(e) {
    let t = e.mapResult(this.pos, 1);
    return t.deletedAfter ? null : new it(t.pos, this.mark);
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
    return new it(t.pos, e.markFromJSON(t.mark));
  }
}
Ae.jsonID("addNodeMark", it);
class yt extends Ae {
  /**
  Create a mark-removing step.
  */
  constructor(e, t) {
    super(), this.pos = e, this.mark = t;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return we.fail("No node at mark step's position");
    let r = t.type.create(t.attrs, null, this.mark.removeFromSet(t.marks));
    return we.fromReplace(e, this.pos, this.pos + 1, new L(M.from(r), 0, t.isLeaf ? 0 : 1));
  }
  invert(e) {
    let t = e.nodeAt(this.pos);
    return !t || !this.mark.isInSet(t.marks) ? this : new it(this.pos, this.mark);
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
Ae.jsonID("removeNodeMark", yt);
class xe extends Ae {
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
    return this.structure && cr(e, this.from, this.to) ? we.fail("Structure replace would overwrite content") : we.fromReplace(e, this.from, this.to, this.slice);
  }
  getMap() {
    return new Oe([this.from, this.to - this.from, this.slice.size]);
  }
  invert(e) {
    return new xe(this.from, this.from + this.slice.size, e.slice(this.from, this.to));
  }
  map(e) {
    let t = e.mapResult(this.to, -1), r = this.from == this.to && xe.MAP_BIAS < 0 ? t : e.mapResult(this.from, 1);
    return r.deletedAcross && t.deletedAcross ? null : new xe(r.pos, Math.max(r.pos, t.pos), this.slice, this.structure);
  }
  merge(e) {
    if (!(e instanceof xe) || e.structure || this.structure)
      return null;
    if (this.from + this.slice.size == e.from && !this.slice.openEnd && !e.slice.openStart) {
      let t = this.slice.size + e.slice.size == 0 ? L.empty : new L(this.slice.content.append(e.slice.content), this.slice.openStart, e.slice.openEnd);
      return new xe(this.from, this.to + (e.to - e.from), t, this.structure);
    } else if (e.to == this.from && !this.slice.openStart && !e.slice.openEnd) {
      let t = this.slice.size + e.slice.size == 0 ? L.empty : new L(e.slice.content.append(this.slice.content), e.slice.openStart, this.slice.openEnd);
      return new xe(e.from, this.to, t, this.structure);
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
    return new xe(t.from, t.to, L.fromJSON(e, t.slice), !!t.structure);
  }
}
xe.MAP_BIAS = 1;
Ae.jsonID("replace", xe);
class ve extends Ae {
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
    if (this.structure && (cr(e, this.from, this.gapFrom) || cr(e, this.gapTo, this.to)))
      return we.fail("Structure gap-replace would overwrite content");
    let t = e.slice(this.gapFrom, this.gapTo);
    if (t.openStart || t.openEnd)
      return we.fail("Gap is not a flat range");
    let r = this.slice.insertAt(this.insert, t.content);
    return r ? we.fromReplace(e, this.from, this.to, r) : we.fail("Content does not fit in gap");
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
    return new ve(this.from, this.from + this.slice.size + t, this.from + this.insert, this.from + this.insert + t, e.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(e) {
    let t = e.mapResult(this.from, 1), r = e.mapResult(this.to, -1), i = this.from == this.gapFrom ? t.pos : e.map(this.gapFrom, -1), o = this.to == this.gapTo ? r.pos : e.map(this.gapTo, 1);
    return t.deletedAcross && r.deletedAcross || i < t.pos || o > r.pos ? null : new ve(t.pos, r.pos, i, o, this.slice, this.insert, this.structure);
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
    return new ve(t.from, t.to, t.gapFrom, t.gapTo, L.fromJSON(e, t.slice), t.insert, !!t.structure);
  }
}
Ae.jsonID("replaceAround", ve);
function cr(n, e, t) {
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
function ql(n, e, t, r) {
  let i = [], o = [], s, l;
  n.doc.nodesBetween(e, t, (c, a, u) => {
    if (!c.isInline)
      return;
    let h = c.marks;
    if (!r.isInSet(h) && u.type.allowsMarkType(r.type)) {
      let f = Math.max(a, e), d = Math.min(a + c.nodeSize, t), p = r.addToSet(h);
      for (let m = 0; m < h.length; m++)
        h[m].isInSet(p) || (s && s.to == f && s.mark.eq(h[m]) ? s.to = d : i.push(s = new _e(f, d, h[m])));
      l && l.to == f ? l.to = d : o.push(l = new rt(f, d, r));
    }
  }), i.forEach((c) => n.step(c)), o.forEach((c) => n.step(c));
}
function Kl(n, e, t, r) {
  let i = [], o = 0;
  n.doc.nodesBetween(e, t, (s, l) => {
    if (!s.isInline)
      return;
    o++;
    let c = null;
    if (r instanceof Pn) {
      let a = s.marks, u;
      for (; u = r.isInSet(a); )
        (c || (c = [])).push(u), a = u.removeFromSet(a);
    } else r ? r.isInSet(s.marks) && (c = [r]) : c = s.marks;
    if (c && c.length) {
      let a = Math.min(l + s.nodeSize, t);
      for (let u = 0; u < c.length; u++) {
        let h = c[u], f;
        for (let d = 0; d < i.length; d++) {
          let p = i[d];
          p.step == o - 1 && h.eq(i[d].style) && (f = p);
        }
        f ? (f.to = a, f.step = o) : i.push({ style: h, from: Math.max(l, e), to: a, step: o });
      }
    }
  }), i.forEach((s) => n.step(new _e(s.from, s.to, s.style)));
}
function Tr(n, e, t, r = t.contentMatch, i = !0) {
  let o = n.doc.nodeAt(e), s = [], l = e + 1;
  for (let c = 0; c < o.childCount; c++) {
    let a = o.child(c), u = l + a.nodeSize, h = r.matchType(a.type);
    if (!h)
      s.push(new xe(l, u, L.empty));
    else {
      r = h;
      for (let f = 0; f < a.marks.length; f++)
        t.allowsMarkType(a.marks[f].type) || n.step(new _e(l, u, a.marks[f]));
      if (i && a.isText && t.whitespace != "pre") {
        let f, d = /\r?\n|\r/g, p;
        for (; f = d.exec(a.text); )
          p || (p = new L(M.from(t.schema.text(" ", t.allowedMarks(a.marks))), 0, 0)), s.push(new xe(l + f.index, l + f.index + f[0].length, p));
      }
    }
    l = u;
  }
  if (!r.validEnd) {
    let c = r.fillBefore(M.empty, !0);
    n.replace(l, l, new L(c, 0, 0));
  }
  for (let c = s.length - 1; c >= 0; c--)
    n.step(s[c]);
}
function Vl(n, e, t) {
  return (e == 0 || n.canReplace(e, n.childCount)) && (t == n.childCount || n.canReplace(0, t));
}
function Bt(n) {
  let t = n.parent.content.cutByIndex(n.startIndex, n.endIndex);
  for (let r = n.depth, i = 0, o = 0; ; --r) {
    let s = n.$from.node(r), l = n.$from.index(r) + i, c = n.$to.indexAfter(r) - o;
    if (r < n.depth && s.canReplace(l, c, t))
      return r;
    if (r == 0 || s.type.spec.isolating || !Vl(s, l, c))
      break;
    l && (i = 1), c < s.childCount && (o = 1);
  }
  return null;
}
function Yl(n, e, t) {
  let { $from: r, $to: i, depth: o } = e, s = r.before(o + 1), l = i.after(o + 1), c = s, a = l, u = M.empty, h = 0;
  for (let p = o, m = !1; p > t; p--)
    m || r.index(p) > 0 ? (m = !0, u = M.from(r.node(p).copy(u)), h++) : c--;
  let f = M.empty, d = 0;
  for (let p = o, m = !1; p > t; p--)
    m || i.after(p + 1) < i.end(p) ? (m = !0, f = M.from(i.node(p).copy(f)), d++) : a++;
  n.step(new ve(c, a, s, l, new L(u.append(f), h, d), u.size - h, !0));
}
function mo(n, e, t = null, r = n) {
  let i = Ul(n, e), o = i && Xl(r, e);
  return o ? i.map(oi).concat({ type: e, attrs: t }).concat(o.map(oi)) : null;
}
function oi(n) {
  return { type: n, attrs: null };
}
function Ul(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.contentMatchAt(r).findWrapping(e);
  if (!o)
    return null;
  let s = o.length ? o[0] : e;
  return t.canReplaceWith(r, i, s) ? o : null;
}
function Xl(n, e) {
  let { parent: t, startIndex: r, endIndex: i } = n, o = t.child(r), s = e.contentMatch.findWrapping(o.type);
  if (!s)
    return null;
  let c = (s.length ? s[s.length - 1] : e).contentMatch;
  for (let a = r; c && a < i; a++)
    c = c.matchType(t.child(a).type);
  return !c || !c.validEnd ? null : s;
}
function Gl(n, e, t) {
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
  n.step(new ve(i, o, i, o, new L(r, 0, 0), t.length, !0));
}
function Ql(n, e, t, r, i) {
  if (!r.isTextblock)
    throw new RangeError("Type given to setBlockType should be a textblock");
  let o = n.steps.length;
  n.doc.nodesBetween(e, t, (s, l) => {
    let c = typeof i == "function" ? i(s) : i;
    if (s.isTextblock && !s.hasMarkup(r, c) && Zl(n.doc, n.mapping.slice(o).map(l), r)) {
      let a = null;
      if (r.schema.linebreakReplacement) {
        let d = r.whitespace == "pre", p = !!r.contentMatch.matchType(r.schema.linebreakReplacement);
        d && !p ? a = !1 : !d && p && (a = !0);
      }
      a === !1 && yo(n, s, l, o), Tr(n, n.mapping.slice(o).map(l, 1), r, void 0, a === null);
      let u = n.mapping.slice(o), h = u.map(l, 1), f = u.map(l + s.nodeSize, 1);
      return n.step(new ve(h, f, h + 1, f - 1, new L(M.from(r.create(c, null, s.marks)), 0, 0), 1, !0)), a === !0 && go(n, s, l, o), !1;
    }
  });
}
function go(n, e, t, r) {
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
function yo(n, e, t, r) {
  e.forEach((i, o) => {
    if (i.type == i.type.schema.linebreakReplacement) {
      let s = n.mapping.slice(r).map(t + 1 + o);
      n.replaceWith(s, s + 1, e.type.schema.text(`
`));
    }
  });
}
function Zl(n, e, t) {
  let r = n.resolve(e), i = r.index();
  return r.parent.canReplaceWith(i, i + 1, t);
}
function ec(n, e, t, r, i) {
  let o = n.doc.nodeAt(e);
  if (!o)
    throw new RangeError("No node at given position");
  t || (t = o.type);
  let s = t.create(r, null, i || o.marks);
  if (o.isLeaf)
    return n.replaceWith(e, e + o.nodeSize, s);
  if (!t.validContent(o.content))
    throw new RangeError("Invalid content for node type " + t.name);
  n.step(new ve(e, e + o.nodeSize, e + 1, e + o.nodeSize - 1, new L(M.from(s), 0, 0), 1, !0));
}
function Ge(n, e, t = 1, r) {
  let i = n.resolve(e), o = i.depth - t, s = r && r[r.length - 1] || i.parent;
  if (o < 0 || i.parent.type.spec.isolating || !i.parent.canReplace(i.index(), i.parent.childCount) || !s.type.validContent(i.parent.content.cutByIndex(i.index(), i.parent.childCount)))
    return !1;
  for (let a = i.depth - 1, u = t - 2; a > o; a--, u--) {
    let h = i.node(a), f = i.index(a);
    if (h.type.spec.isolating)
      return !1;
    let d = h.content.cutByIndex(f, h.childCount), p = r && r[u + 1];
    p && (d = d.replaceChild(0, p.type.create(p.attrs)));
    let m = r && r[u] || h;
    if (!h.canReplace(f + 1, h.childCount) || !m.type.validContent(d))
      return !1;
  }
  let l = i.indexAfter(o), c = r && r[0];
  return i.node(o).canReplaceWith(l, l, c ? c.type : i.node(o + 1).type);
}
function tc(n, e, t = 1, r) {
  let i = n.doc.resolve(e), o = M.empty, s = M.empty;
  for (let l = i.depth, c = i.depth - t, a = t - 1; l > c; l--, a--) {
    o = M.from(i.node(l).copy(o));
    let u = r && r[a];
    s = M.from(u ? u.type.create(u.attrs, s) : i.node(l).copy(s));
  }
  n.step(new xe(e, e, new L(o.append(s), t, t), !0));
}
function xt(n, e) {
  let t = n.resolve(e), r = t.index();
  return xo(t.nodeBefore, t.nodeAfter) && t.parent.canReplace(r, r + 1);
}
function nc(n, e) {
  e.content.size || n.type.compatibleContent(e.type);
  let t = n.contentMatchAt(n.childCount), { linebreakReplacement: r } = n.type.schema;
  for (let i = 0; i < e.childCount; i++) {
    let o = e.child(i), s = o.type == r ? n.type.schema.nodes.text : o.type;
    if (t = t.matchType(s), !t || !n.type.allowsMarks(o.marks))
      return !1;
  }
  return t.validEnd;
}
function xo(n, e) {
  return !!(n && e && !n.isLeaf && nc(n, e));
}
function Ln(n, e, t = -1) {
  let r = n.resolve(e);
  for (let i = r.depth; ; i--) {
    let o, s, l = r.index(i);
    if (i == r.depth ? (o = r.nodeBefore, s = r.nodeAfter) : t > 0 ? (o = r.node(i + 1), l++, s = r.node(i).maybeChild(l)) : (o = r.node(i).maybeChild(l - 1), s = r.node(i + 1)), o && !o.isTextblock && xo(o, s) && r.node(i).canReplace(l, l + 1))
      return e;
    if (i == 0)
      break;
    e = t < 0 ? r.before(i) : r.after(i);
  }
}
function rc(n, e, t) {
  let r = null, { linebreakReplacement: i } = n.doc.type.schema, o = n.doc.resolve(e - t), s = o.node().type;
  if (i && s.inlineContent) {
    let u = s.whitespace == "pre", h = !!s.contentMatch.matchType(i);
    u && !h ? r = !1 : !u && h && (r = !0);
  }
  let l = n.steps.length;
  if (r === !1) {
    let u = n.doc.resolve(e + t);
    yo(n, u.node(), u.before(), l);
  }
  s.inlineContent && Tr(n, e + t - 1, s, o.node().contentMatchAt(o.index()), r == null);
  let c = n.mapping.slice(l), a = c.map(e - t);
  if (n.step(new xe(a, c.map(e + t, -1), L.empty, !0)), r === !0) {
    let u = n.doc.resolve(a);
    go(n, u.node(), u.before(), n.steps.length);
  }
  return n;
}
function ic(n, e, t) {
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
function Bn(n, e, t = e, r = L.empty) {
  if (e == t && !r.size)
    return null;
  let i = n.resolve(e), o = n.resolve(t);
  return wo(i, o, r) ? new xe(e, t, r) : new oc(i, o, r).fit();
}
function wo(n, e, t) {
  return !t.openStart && !t.openEnd && n.start() == e.start() && n.parent.canReplace(n.index(), e.index(), t.content);
}
class oc {
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
    let c = new L(o, s, l);
    return e > -1 ? new ve(r.pos, e, this.$to.pos, this.$to.end(), c, t) : c.size || r.pos != this.$to.pos ? new xe(r.pos, i.pos, c) : null;
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
        r ? (o = Yn(this.unplaced.content, r - 1).firstChild, i = o.content) : i = this.unplaced.content;
        let s = i.firstChild;
        for (let l = this.depth; l >= 0; l--) {
          let { type: c, match: a } = this.frontier[l], u, h = null;
          if (t == 1 && (s ? a.matchType(s.type) || (h = a.fillBefore(M.from(s), !1)) : o && c.compatibleContent(o.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, inject: h };
          if (t == 2 && s && (u = a.findWrapping(s.type)))
            return { sliceDepth: r, frontierDepth: l, parent: o, wrap: u };
          if (o && a.matchType(o.type))
            break;
        }
      }
  }
  openMore() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Yn(e, t);
    return !i.childCount || i.firstChild.isLeaf ? !1 : (this.unplaced = new L(e, t + 1, Math.max(r, i.size + t >= e.size - r ? t + 1 : 0)), !0);
  }
  dropNode() {
    let { content: e, openStart: t, openEnd: r } = this.unplaced, i = Yn(e, t);
    if (i.childCount <= 1 && t > 0) {
      let o = e.size - t <= t + i.size;
      this.unplaced = new L(jt(e, t - 1, 1), t - 1, o ? t - 1 : r);
    } else
      this.unplaced = new L(jt(e, t, 1), t, r);
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
    let s = this.unplaced, l = r ? r.content : s.content, c = s.openStart - e, a = 0, u = [], { match: h, type: f } = this.frontier[t];
    if (i) {
      for (let m = 0; m < i.childCount; m++)
        u.push(i.child(m));
      h = h.matchFragment(i);
    }
    let d = l.size + e - (s.content.size - s.openEnd);
    for (; a < l.childCount; ) {
      let m = l.child(a), y = h.matchType(m.type);
      if (!y)
        break;
      a++, (a > 1 || c == 0 || m.content.size) && (h = y, u.push(bo(m.mark(f.allowedMarks(m.marks)), a == 1 ? c : 0, a == l.childCount ? d : -1)));
    }
    let p = a == l.childCount;
    p || (d = -1), this.placed = Jt(this.placed, t, M.from(u)), this.frontier[t].match = h, p && d < 0 && r && r.type == this.frontier[this.depth].type && this.frontier.length > 1 && this.closeFrontierNode();
    for (let m = 0, y = l; m < d; m++) {
      let x = y.lastChild;
      this.frontier.push({ type: x.type, match: x.contentMatchAt(x.childCount) }), y = x.content;
    }
    this.unplaced = p ? e == 0 ? L.empty : new L(jt(s.content, e - 1, 1), e - 1, d < 0 ? s.openEnd : e - 1) : new L(jt(s.content, e, a), s.openStart, s.openEnd);
  }
  mustMoveInline() {
    if (!this.$to.parent.isTextblock)
      return -1;
    let e = this.frontier[this.depth], t;
    if (!e.type.isTextblock || !Un(this.$to, this.$to.depth, e.type, e.match, !1) || this.$to.depth == this.depth && (t = this.findCloseLevel(this.$to)) && t.depth == this.depth)
      return -1;
    let { depth: r } = this.$to, i = this.$to.after(r);
    for (; r > 1 && i == this.$to.end(--r); )
      ++i;
    return i;
  }
  findCloseLevel(e) {
    e: for (let t = Math.min(this.depth, e.depth); t >= 0; t--) {
      let { match: r, type: i } = this.frontier[t], o = t < e.depth && e.end(t + 1) == e.pos + (e.depth - (t + 1)), s = Un(e, t, i, r, o);
      if (s) {
        for (let l = t - 1; l >= 0; l--) {
          let { match: c, type: a } = this.frontier[l], u = Un(e, l, a, c, !0);
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
    t.fit.childCount && (this.placed = Jt(this.placed, t.depth, t.fit)), e = t.move;
    for (let r = t.depth + 1; r <= e.depth; r++) {
      let i = e.node(r), o = i.type.contentMatch.fillBefore(i.content, !0, e.index(r));
      this.openFrontierNode(i.type, i.attrs, o);
    }
    return e;
  }
  openFrontierNode(e, t = null, r) {
    let i = this.frontier[this.depth];
    i.match = i.match.matchType(e), this.placed = Jt(this.placed, this.depth, M.from(e.create(t, r))), this.frontier.push({ type: e, match: e.contentMatch });
  }
  closeFrontierNode() {
    let t = this.frontier.pop().match.fillBefore(M.empty, !0);
    t.childCount && (this.placed = Jt(this.placed, this.frontier.length, t));
  }
}
function jt(n, e, t) {
  return e == 0 ? n.cutByIndex(t, n.childCount) : n.replaceChild(0, n.firstChild.copy(jt(n.firstChild.content, e - 1, t)));
}
function Jt(n, e, t) {
  return e == 0 ? n.append(t) : n.replaceChild(n.childCount - 1, n.lastChild.copy(Jt(n.lastChild.content, e - 1, t)));
}
function Yn(n, e) {
  for (let t = 0; t < e; t++)
    n = n.firstChild.content;
  return n;
}
function bo(n, e, t) {
  if (e <= 0)
    return n;
  let r = n.content;
  return e > 1 && (r = r.replaceChild(0, bo(r.firstChild, e - 1, r.childCount == 1 ? t - 1 : 0))), e > 0 && (r = n.type.contentMatch.fillBefore(r).append(r), t <= 0 && (r = r.append(n.type.contentMatch.matchFragment(r).fillBefore(M.empty, !0)))), n.copy(r);
}
function Un(n, e, t, r, i) {
  let o = n.node(e), s = i ? n.indexAfter(e) : n.index(e);
  if (s == o.childCount && !t.compatibleContent(o.type))
    return null;
  let l = r.fillBefore(o.content, !0, s);
  return l && !sc(t, o.content, s) ? l : null;
}
function sc(n, e, t) {
  for (let r = t; r < e.childCount; r++)
    if (!n.allowsMarks(e.child(r).marks))
      return !0;
  return !1;
}
function lc(n) {
  return n.spec.defining || n.spec.definingForContent;
}
function cc(n, e, t, r) {
  if (!r.size)
    return n.deleteRange(e, t);
  let i = n.doc.resolve(e), o = n.doc.resolve(t);
  if (wo(i, o, r))
    return n.step(new xe(e, t, r));
  let s = ko(i, o);
  s[s.length - 1] == 0 && s.pop();
  let l = -(i.depth + 1);
  s.unshift(l);
  for (let f = i.depth, d = i.pos - 1; f > 0; f--, d--) {
    let p = i.node(f).type.spec;
    if (p.defining || p.definingAsContext || p.isolating)
      break;
    s.indexOf(f) > -1 ? l = f : i.before(f) == d && s.splice(1, 0, -f);
  }
  let c = s.indexOf(l), a = [], u = r.openStart;
  for (let f = r.content, d = 0; ; d++) {
    let p = f.firstChild;
    if (a.push(p), d == r.openStart)
      break;
    f = p.content;
  }
  for (let f = u - 1; f >= 0; f--) {
    let d = a[f], p = lc(d.type);
    if (p && !d.sameMarkup(i.node(Math.abs(l) - 1)))
      u = f;
    else if (p || !d.type.isTextblock)
      break;
  }
  for (let f = r.openStart; f >= 0; f--) {
    let d = (f + u + 1) % (r.openStart + 1), p = a[d];
    if (p)
      for (let m = 0; m < s.length; m++) {
        let y = s[(m + c) % s.length], x = !0;
        y < 0 && (x = !1, y = -y);
        let v = i.node(y - 1), b = i.index(y - 1);
        if (v.canReplaceWith(b, b, p.type, p.marks))
          return n.replace(i.before(y), x ? o.after(y) : t, new L(vo(r.content, 0, r.openStart, d), d, r.openEnd));
      }
  }
  let h = n.steps.length;
  for (let f = s.length - 1; f >= 0 && (n.replace(e, t, r), !(n.steps.length > h)); f--) {
    let d = s[f];
    d < 0 || (e = i.before(d), t = o.after(d));
  }
}
function vo(n, e, t, r, i) {
  if (e < t) {
    let o = n.firstChild;
    n = n.replaceChild(0, o.copy(vo(o.content, e + 1, t, r, o)));
  }
  if (e > r) {
    let o = i.contentMatchAt(0), s = o.fillBefore(n).append(n);
    n = s.append(o.matchFragment(s).fillBefore(M.empty, !0));
  }
  return n;
}
function ac(n, e, t, r) {
  if (!r.isInline && e == t && n.doc.resolve(e).parent.content.size) {
    let i = ic(n.doc, e, r.type);
    i != null && (e = t = i);
  }
  n.replaceRange(e, t, new L(M.from(r), 0, 0));
}
function uc(n, e, t) {
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
  let o = ko(r, i);
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
function ko(n, e) {
  let t = [], r = Math.min(n.depth, e.depth);
  for (let i = r; i >= 0; i--) {
    let o = n.start(i);
    if (o < n.pos - (n.depth - i) || e.end(i) > e.pos + (e.depth - i) || n.node(i).type.spec.isolating || e.node(i).type.spec.isolating)
      break;
    (o == e.start(i) || i == n.depth && i == e.depth && n.parent.inlineContent && e.parent.inlineContent && i && e.start(i - 1) == o - 1) && t.push(i);
  }
  return t;
}
class At extends Ae {
  /**
  Construct an attribute step.
  */
  constructor(e, t, r) {
    super(), this.pos = e, this.attr = t, this.value = r;
  }
  apply(e) {
    let t = e.nodeAt(this.pos);
    if (!t)
      return we.fail("No node at attribute step's position");
    let r = /* @__PURE__ */ Object.create(null);
    for (let o in t.attrs)
      r[o] = t.attrs[o];
    r[this.attr] = this.value;
    let i = t.type.create(r, null, t.marks);
    return we.fromReplace(e, this.pos, this.pos + 1, new L(M.from(i), 0, t.isLeaf ? 0 : 1));
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
Ae.jsonID("attr", At);
class Qt extends Ae {
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
    return we.ok(r);
  }
  getMap() {
    return Oe.empty;
  }
  invert(e) {
    return new Qt(this.attr, e.attrs[this.attr]);
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
    return new Qt(t.attr, t.value);
  }
}
Ae.jsonID("docAttr", Qt);
let It = class extends Error {
};
It = function n(e) {
  let t = Error.call(this, e);
  return t.__proto__ = n.prototype, t;
};
It.prototype = Object.create(Error.prototype);
It.prototype.constructor = It;
It.prototype.name = "TransformError";
class fc {
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
  replace(e, t = e, r = L.empty) {
    let i = Bn(this.doc, e, t, r);
    return i && this.step(i), this;
  }
  /**
  Replace the given range with the given content, which may be a
  fragment, node, or array of nodes.
  */
  replaceWith(e, t, r) {
    return this.replace(e, t, new L(M.from(r), 0, 0));
  }
  /**
  Delete the content between the given positions.
  */
  delete(e, t) {
    return this.replace(e, t, L.empty);
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
    return cc(this, e, t, r), this;
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
    return ac(this, e, t, r), this;
  }
  /**
  Delete the given range, expanding it to cover fully covered
  parent nodes until a valid replace is found.
  */
  deleteRange(e, t) {
    return uc(this, e, t), this;
  }
  /**
  Split the content in the given range off from its parent, if there
  is sibling content before or after it, and move it up the tree to
  the depth specified by `target`. You'll probably want to use
  [`liftTarget`](https://prosemirror.net/docs/ref/#transform.liftTarget) to compute `target`, to make
  sure the lift is valid.
  */
  lift(e, t) {
    return Yl(this, e, t), this;
  }
  /**
  Join the blocks around the given position. If depth is 2, their
  last and first siblings are also joined, and so on.
  */
  join(e, t = 1) {
    return rc(this, e, t), this;
  }
  /**
  Wrap the given [range](https://prosemirror.net/docs/ref/#model.NodeRange) in the given set of wrappers.
  The wrappers are assumed to be valid in this position, and should
  probably be computed with [`findWrapping`](https://prosemirror.net/docs/ref/#transform.findWrapping).
  */
  wrap(e, t) {
    return Gl(this, e, t), this;
  }
  /**
  Set the type of all textblocks (partly) between `from` and `to` to
  the given node type with the given attributes.
  */
  setBlockType(e, t = e, r, i = null) {
    return Ql(this, e, t, r, i), this;
  }
  /**
  Change the type, attributes, and/or marks of the node at `pos`.
  When `type` isn't given, the existing node type is preserved,
  */
  setNodeMarkup(e, t, r = null, i) {
    return ec(this, e, t, r, i), this;
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
    return this.step(new Qt(e, t)), this;
  }
  /**
  Add a mark to the node at position `pos`.
  */
  addNodeMark(e, t) {
    return this.step(new it(e, t)), this;
  }
  /**
  Remove a mark (or all marks of the given type) from the node at
  position `pos`.
  */
  removeNodeMark(e, t) {
    let r = this.doc.nodeAt(e);
    if (!r)
      throw new RangeError("No node at position " + e);
    if (t instanceof ae)
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
    return tc(this, e, t, r), this;
  }
  /**
  Add the given mark to the inline content between `from` and `to`.
  */
  addMark(e, t, r) {
    return ql(this, e, t, r), this;
  }
  /**
  Remove marks from inline nodes between `from` and `to`. When
  `mark` is a single mark, remove precisely that mark. When it is
  a mark type, remove all marks of that type. When it is null,
  remove all marks of any type.
  */
  removeMark(e, t, r) {
    return Kl(this, e, t, r), this;
  }
  /**
  Removes all marks and nodes from the content of the node at
  `pos` that don't match the given new parent node type. Accepts
  an optional starting [content match](https://prosemirror.net/docs/ref/#model.ContentMatch) as
  third argument.
  */
  clearIncompatible(e, t, r) {
    return Tr(this, e, t, r), this;
  }
}
const Xn = /* @__PURE__ */ Object.create(null);
class me {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor(e, t, r) {
    this.$anchor = e, this.$head = t, this.ranges = r || [new dc(e.min(t), e.max(t))];
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
  replace(e, t = L.empty) {
    let r = t.content.lastChild, i = null;
    for (let l = 0; l < t.openEnd; l++)
      i = r, r = r.lastChild;
    let o = e.steps.length, s = this.ranges;
    for (let l = 0; l < s.length; l++) {
      let { $from: c, $to: a } = s[l], u = e.mapping.slice(o);
      e.replaceRange(u.map(c.pos), u.map(a.pos), l ? L.empty : t), l == 0 && ci(e, o, (r ? r.isInline : i && i.isTextblock) ? -1 : 1);
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
      o ? e.deleteRange(a, u) : (e.replaceRangeWith(a, u, t), ci(e, r, t.isInline ? -1 : 1));
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
    let i = e.parent.inlineContent ? new $e(e) : Ct(e.node(0), e.parent, e.pos, e.index(), t, r);
    if (i)
      return i;
    for (let o = e.depth - 1; o >= 0; o--) {
      let s = t < 0 ? Ct(e.node(0), e.node(o), e.before(o + 1), e.index(o), t, r) : Ct(e.node(0), e.node(o), e.after(o + 1), e.index(o) + 1, t, r);
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
    return this.findFrom(e, t) || this.findFrom(e, -t) || new He(e.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(e) {
    return Ct(e, e, 0, 0, 1) || new He(e);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(e) {
    return Ct(e, e, e.content.size, e.childCount, -1) || new He(e);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(e, t) {
    if (!t || !t.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let r = Xn[t.type];
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
    if (e in Xn)
      throw new RangeError("Duplicate use of selection JSON ID " + e);
    return Xn[e] = t, t.prototype.jsonID = e, t;
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
me.prototype.visible = !0;
class dc {
  /**
  Create a range.
  */
  constructor(e, t) {
    this.$from = e, this.$to = t;
  }
}
let si = !1;
function li(n) {
  !si && !n.parent.inlineContent && (si = !0, console.warn("TextSelection endpoint not pointing into a node with inline content (" + n.parent.type.name + ")"));
}
class $e extends me {
  /**
  Construct a text selection between the given points.
  */
  constructor(e, t = e) {
    li(e), li(t), super(e, t);
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
      return me.near(r);
    let i = e.resolve(t.map(this.anchor));
    return new $e(i.parent.inlineContent ? i : r, r);
  }
  replace(e, t = L.empty) {
    if (super.replace(e, t), t == L.empty) {
      let r = this.$from.marksAcross(this.$to);
      r && e.ensureMarks(r);
    }
  }
  eq(e) {
    return e instanceof $e && e.anchor == this.anchor && e.head == this.head;
  }
  getBookmark() {
    return new Fn(this.anchor, this.head);
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
      let o = me.findFrom(t, r, !0) || me.findFrom(t, -r, !0);
      if (o)
        t = o.$head;
      else
        return me.near(t, r);
    }
    return e.parent.inlineContent || (i == 0 ? e = t : (e = (me.findFrom(e, -r, !0) || me.findFrom(e, r, !0)).$anchor, e.pos < t.pos != i < 0 && (e = t))), new $e(e, t);
  }
}
me.jsonID("text", $e);
class Fn {
  constructor(e, t) {
    this.anchor = e, this.head = t;
  }
  map(e) {
    return new Fn(e.map(this.anchor), e.map(this.head));
  }
  resolve(e) {
    return $e.between(e.resolve(this.anchor), e.resolve(this.head));
  }
}
class he extends me {
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
    return r ? me.near(o) : new he(o);
  }
  content() {
    return new L(M.from(this.node), 0, 0);
  }
  eq(e) {
    return e instanceof he && e.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new Mr(this.anchor);
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
me.jsonID("node", he);
class Mr {
  constructor(e) {
    this.anchor = e;
  }
  map(e) {
    let { deleted: t, pos: r } = e.mapResult(this.anchor);
    return t ? new Fn(r, r) : new Mr(r);
  }
  resolve(e) {
    let t = e.resolve(this.anchor), r = t.nodeAfter;
    return r && he.isSelectable(r) ? new he(t) : me.near(t);
  }
}
class He extends me {
  /**
  Create an all-selection over the given document.
  */
  constructor(e) {
    super(e.resolve(0), e.resolve(e.content.size));
  }
  replace(e, t = L.empty) {
    if (t == L.empty) {
      e.delete(0, e.doc.content.size);
      let r = me.atStart(e.doc);
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
    return new He(e);
  }
  map(e) {
    return new He(e);
  }
  eq(e) {
    return e instanceof He;
  }
  getBookmark() {
    return hc;
  }
}
me.jsonID("all", He);
const hc = {
  map() {
    return this;
  },
  resolve(n) {
    return new He(n);
  }
};
function Ct(n, e, t, r, i, o = !1) {
  if (e.inlineContent)
    return $e.create(n, t);
  for (let s = r - (i > 0 ? 0 : 1); i > 0 ? s < e.childCount : s >= 0; s += i) {
    let l = e.child(s);
    if (l.isAtom) {
      if (!o && he.isSelectable(l))
        return he.create(n, t - (i < 0 ? l.nodeSize : 0));
    } else {
      let c = Ct(n, l, t + i, i < 0 ? l.childCount : 0, i, o);
      if (c)
        return c;
    }
    t += l.nodeSize * i;
  }
  return null;
}
function ci(n, e, t) {
  let r = n.steps.length - 1;
  if (r < e)
    return;
  let i = n.steps[r];
  if (!(i instanceof xe || i instanceof ve))
    return;
  let o = n.mapping.maps[r], s;
  o.forEach((l, c, a, u) => {
    s == null && (s = u);
  }), n.setSelection(me.near(n.doc.resolve(s), t));
}
function ai(n, e) {
  return !e || !n ? n : n.bind(e);
}
class mn {
  constructor(e, t, r) {
    this.name = e, this.init = ai(t.init, r), this.apply = ai(t.apply, r);
  }
}
new mn("doc", {
  init(n) {
    return n.doc || n.schema.topNodeType.createAndFill();
  },
  apply(n) {
    return n.doc;
  }
}), new mn("selection", {
  init(n, e) {
    return n.selection || me.atStart(e.doc);
  },
  apply(n) {
    return n.selection;
  }
}), new mn("storedMarks", {
  init(n) {
    return n.storedMarks || null;
  },
  apply(n, e, t, r) {
    return r.selection.$cursor ? n.storedMarks : null;
  }
}), new mn("scrollToSelection", {
  init() {
    return 0;
  },
  apply(n, e) {
    return n.scrolledIntoView ? e + 1 : e;
  }
});
const So = (n, e) => n.selection.empty ? !1 : (e && e(n.tr.deleteSelection().scrollIntoView()), !0);
function Co(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("backward", n) : t.parentOffset > 0) ? null : t;
}
const Eo = (n, e, t) => {
  let r = Co(n, t);
  if (!r)
    return !1;
  let i = Nr(r);
  if (!i) {
    let s = r.blockRange(), l = s && Bt(s);
    return l == null ? !1 : (e && e(n.tr.lift(s, l).scrollIntoView()), !0);
  }
  let o = i.nodeBefore;
  if (Oo(n, i, e, -1))
    return !0;
  if (r.parent.content.size == 0 && ($t(o, "end") || he.isSelectable(o)))
    for (let s = r.depth; ; s--) {
      let l = Bn(n.doc, r.before(s), r.after(s), L.empty);
      if (l && l.slice.size < l.to - l.from) {
        if (e) {
          let c = n.tr.step(l);
          c.setSelection($t(o, "end") ? me.findFrom(c.doc.resolve(c.mapping.map(i.pos, -1)), -1) : he.create(c.doc, i.pos - o.nodeSize)), e(c.scrollIntoView());
        }
        return !0;
      }
      if (s == 1 || r.node(s - 1).childCount > 1)
        break;
    }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos - o.nodeSize, i.pos).scrollIntoView()), !0) : !1;
}, pc = (n, e, t) => {
  let r = Co(n, t);
  if (!r)
    return !1;
  let i = Nr(r);
  return i ? To(n, i, e) : !1;
}, mc = (n, e, t) => {
  let r = No(n, t);
  if (!r)
    return !1;
  let i = Ar(r);
  return i ? To(n, i, e) : !1;
};
function To(n, e, t) {
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
  let a = Bn(n.doc, o, c, L.empty);
  if (!a || a.from != o || a instanceof xe && a.slice.size >= c - o)
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
const Mo = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("backward", n) : r.parentOffset > 0)
      return !1;
    o = Nr(r);
  }
  let s = o && o.nodeBefore;
  return !s || !he.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(he.create(n.doc, o.pos - s.nodeSize)).scrollIntoView()), !0);
};
function Nr(n) {
  if (!n.parent.type.spec.isolating)
    for (let e = n.depth - 1; e >= 0; e--) {
      if (n.index(e) > 0)
        return n.doc.resolve(n.before(e + 1));
      if (n.node(e).type.spec.isolating)
        break;
    }
  return null;
}
function No(n, e) {
  let { $cursor: t } = n.selection;
  return !t || (e ? !e.endOfTextblock("forward", n) : t.parentOffset < t.parent.content.size) ? null : t;
}
const Ao = (n, e, t) => {
  let r = No(n, t);
  if (!r)
    return !1;
  let i = Ar(r);
  if (!i)
    return !1;
  let o = i.nodeAfter;
  if (Oo(n, i, e, 1))
    return !0;
  if (r.parent.content.size == 0 && ($t(o, "start") || he.isSelectable(o))) {
    let s = Bn(n.doc, r.before(), r.after(), L.empty);
    if (s && s.slice.size < s.to - s.from) {
      if (e) {
        let l = n.tr.step(s);
        l.setSelection($t(o, "start") ? me.findFrom(l.doc.resolve(l.mapping.map(i.pos)), 1) : he.create(l.doc, l.mapping.map(i.pos))), e(l.scrollIntoView());
      }
      return !0;
    }
  }
  return o.isAtom && i.depth == r.depth - 1 ? (e && e(n.tr.delete(i.pos, i.pos + o.nodeSize).scrollIntoView()), !0) : !1;
}, zo = (n, e, t) => {
  let { $head: r, empty: i } = n.selection, o = r;
  if (!i)
    return !1;
  if (r.parent.isTextblock) {
    if (t ? !t.endOfTextblock("forward", n) : r.parentOffset < r.parent.content.size)
      return !1;
    o = Ar(r);
  }
  let s = o && o.nodeAfter;
  return !s || !he.isSelectable(s) ? !1 : (e && e(n.tr.setSelection(he.create(n.doc, o.pos)).scrollIntoView()), !0);
};
function Ar(n) {
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
const gc = (n, e) => {
  let t = n.selection, r = t instanceof he, i;
  if (r) {
    if (t.node.isTextblock || !xt(n.doc, t.from))
      return !1;
    i = t.from;
  } else if (i = Ln(n.doc, t.from, -1), i == null)
    return !1;
  if (e) {
    let o = n.tr.join(i);
    r && o.setSelection(he.create(o.doc, i - n.doc.resolve(i).nodeBefore.nodeSize)), e(o.scrollIntoView());
  }
  return !0;
}, yc = (n, e) => {
  let t = n.selection, r;
  if (t instanceof he) {
    if (t.node.isTextblock || !xt(n.doc, t.to))
      return !1;
    r = t.to;
  } else if (r = Ln(n.doc, t.to, 1), r == null)
    return !1;
  return e && e(n.tr.join(r).scrollIntoView()), !0;
}, xc = (n, e) => {
  let { $from: t, $to: r } = n.selection, i = t.blockRange(r), o = i && Bt(i);
  return o == null ? !1 : (e && e(n.tr.lift(i, o).scrollIntoView()), !0);
}, Ro = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  return !t.parent.type.spec.code || !t.sameParent(r) ? !1 : (e && e(n.tr.insertText(`
`).scrollIntoView()), !0);
};
function zr(n) {
  for (let e = 0; e < n.edgeCount; e++) {
    let { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
const wc = (n, e) => {
  let { $head: t, $anchor: r } = n.selection;
  if (!t.parent.type.spec.code || !t.sameParent(r))
    return !1;
  let i = t.node(-1), o = t.indexAfter(-1), s = zr(i.contentMatchAt(o));
  if (!s || !i.canReplaceWith(o, o, s))
    return !1;
  if (e) {
    let l = t.after(), c = n.tr.replaceWith(l, l, s.createAndFill());
    c.setSelection(me.near(c.doc.resolve(l), 1)), e(c.scrollIntoView());
  }
  return !0;
}, Io = (n, e) => {
  let t = n.selection, { $from: r, $to: i } = t;
  if (t instanceof He || r.parent.inlineContent || i.parent.inlineContent)
    return !1;
  let o = zr(i.parent.contentMatchAt(i.indexAfter()));
  if (!o || !o.isTextblock)
    return !1;
  if (e) {
    let s = (!r.parentOffset && i.index() < i.parent.childCount ? r : i).pos, l = n.tr.insert(s, o.createAndFill());
    l.setSelection($e.create(l.doc, s + 1)), e(l.scrollIntoView());
  }
  return !0;
}, $o = (n, e) => {
  let { $cursor: t } = n.selection;
  if (!t || t.parent.content.size)
    return !1;
  if (t.depth > 1 && t.after() != t.end(-1)) {
    let o = t.before();
    if (Ge(n.doc, o))
      return e && e(n.tr.split(o).scrollIntoView()), !0;
  }
  let r = t.blockRange(), i = r && Bt(r);
  return i == null ? !1 : (e && e(n.tr.lift(r, i).scrollIntoView()), !0);
};
function bc(n) {
  return (e, t) => {
    if (e.selection instanceof he && e.selection.node.isBlock) {
      let { $from: d } = e.selection;
      return !d.parentOffset || !Ge(e.doc, d.pos) ? !1 : (t && t(e.tr.split(d.pos).scrollIntoView()), !0);
    }
    if (!e.selection.$from.depth)
      return !1;
    let r = e.tr;
    !e.selection.empty && (e.selection instanceof $e || e.selection instanceof He) && r.deleteSelection();
    let { $from: i } = r.selection, o = r.steps.length, s = [], l, c, a = !1, u = !1;
    for (let d = i.depth; ; d--)
      if (i.node(d).isBlock) {
        a = i.end(d) == i.pos + (i.depth - d), u = i.start(d) == i.pos - (i.depth - d), c = zr(i.node(d - 1).contentMatchAt(i.indexAfter(d - 1))), s.unshift(a && c ? { type: c } : null), l = d;
        break;
      } else {
        if (d == 1)
          return !1;
        s.unshift(null);
      }
    let h = i.pos, f = Ge(r.doc, h, s.length, s);
    if (f || (s[0] = c ? { type: c } : null, f = Ge(r.doc, h, s.length, s)), !f)
      return !1;
    if (r.split(h, s.length, s), !a && u && i.node(l).type != c) {
      let d = r.mapping.slice(o), p = d.map(i.before(l)), m = r.doc.resolve(p);
      c && i.node(l - 1).canReplaceWith(m.index(), m.index() + 1, c) && r.setNodeMarkup(d.map(i.before(l)), c);
    }
    return t && t(r.scrollIntoView()), !0;
  };
}
const vc = bc(), kc = (n, e) => {
  let { $from: t, to: r } = n.selection, i, o = t.sharedDepth(r);
  return o == 0 ? !1 : (i = t.before(o), e && e(n.tr.setSelection(he.create(n.doc, i))), !0);
};
function Sc(n, e, t) {
  let r = e.nodeBefore, i = e.nodeAfter, o = e.index();
  return !r || !i || !r.type.compatibleContent(i.type) ? !1 : !r.content.size && e.parent.canReplace(o - 1, o) ? (t && t(n.tr.delete(e.pos - r.nodeSize, e.pos).scrollIntoView()), !0) : !e.parent.canReplace(o, o + 1) || !(i.isTextblock || xt(n.doc, e.pos)) ? !1 : (t && t(n.tr.join(e.pos).scrollIntoView()), !0);
}
function Oo(n, e, t, r) {
  let i = e.nodeBefore, o = e.nodeAfter, s, l, c = i.type.spec.isolating || o.type.spec.isolating;
  if (!c && Sc(n, e, t))
    return !0;
  let a = !c && e.parent.canReplace(e.index(), e.index() + 1);
  if (a && (s = (l = i.contentMatchAt(i.childCount)).findWrapping(o.type)) && l.matchType(s[0] || o.type).validEnd) {
    if (t) {
      let d = e.pos + o.nodeSize, p = M.empty;
      for (let x = s.length - 1; x >= 0; x--)
        p = M.from(s[x].create(null, p));
      p = M.from(i.copy(p));
      let m = n.tr.step(new ve(e.pos - 1, d, e.pos, d, new L(p, 1, 0), s.length, !0)), y = m.doc.resolve(d + 2 * s.length);
      y.nodeAfter && y.nodeAfter.type == i.type && xt(m.doc, y.pos) && m.join(y.pos), t(m.scrollIntoView());
    }
    return !0;
  }
  let u = o.type.spec.isolating || r > 0 && c ? null : me.findFrom(e, 1), h = u && u.$from.blockRange(u.$to), f = h && Bt(h);
  if (f != null && f >= e.depth)
    return t && t(n.tr.lift(h, f).scrollIntoView()), !0;
  if (a && $t(o, "start", !0) && $t(i, "end")) {
    let d = i, p = [];
    for (; p.push(d), !d.isTextblock; )
      d = d.lastChild;
    let m = o, y = 1;
    for (; !m.isTextblock; m = m.firstChild)
      y++;
    if (d.canReplace(d.childCount, d.childCount, m.content)) {
      if (t) {
        let x = M.empty;
        for (let b = p.length - 1; b >= 0; b--)
          x = M.from(p[b].copy(x));
        let v = n.tr.step(new ve(e.pos - p.length, e.pos + o.nodeSize, e.pos + y, e.pos + o.nodeSize - y, new L(x, p.length, 0), 0, !0));
        t(v.scrollIntoView());
      }
      return !0;
    }
  }
  return !1;
}
function Do(n) {
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
const Cc = Do(-1), Ec = Do(1);
function Tc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o), l = s && mo(s, n, e);
    return l ? (r && r(t.tr.wrap(s, l).scrollIntoView()), !0) : !1;
  };
}
function ui(n, e = null) {
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
            let u = t.doc.resolve(a), h = u.index();
            i = u.parent.canReplaceWith(h, h + 1, n);
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
function Rr(...n) {
  return function(e, t, r) {
    for (let i = 0; i < n.length; i++)
      if (n[i](e, t, r))
        return !0;
    return !1;
  };
}
Rr(So, Eo, Mo);
Rr(So, Ao, zo);
Rr(Ro, Io, $o, vc);
typeof navigator < "u" ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : typeof os < "u" && os.platform && os.platform() == "darwin";
function Mc(n, e = null) {
  return function(t, r) {
    let { $from: i, $to: o } = t.selection, s = i.blockRange(o);
    if (!s)
      return !1;
    let l = r ? t.tr : null;
    return Nc(l, s, n, e) ? (r && r(l.scrollIntoView()), !0) : !1;
  };
}
function Nc(n, e, t, r = null) {
  let i = !1, o = e, s = e.$from.doc;
  if (e.depth >= 2 && e.$from.node(e.depth - 1).type.compatibleContent(t) && e.startIndex == 0) {
    if (e.$from.index(e.depth - 1) == 0)
      return !1;
    let c = s.resolve(e.start - 2);
    o = new Mn(c, c, e.depth), e.endIndex < e.parent.childCount && (e = new Mn(e.$from, s.resolve(e.$to.end(e.depth)), e.depth)), i = !0;
  }
  let l = mo(o, t, r, e);
  return l ? (n && Ac(n, e, l, i, t), !0) : !1;
}
function Ac(n, e, t, r, i) {
  let o = M.empty;
  for (let u = t.length - 1; u >= 0; u--)
    o = M.from(t[u].type.create(t[u].attrs, o));
  n.step(new ve(e.start - (r ? 2 : 0), e.end, e.start, e.end, new L(o, 0, 0), t.length, !0));
  let s = 0;
  for (let u = 0; u < t.length; u++)
    t[u].type == i && (s = u + 1);
  let l = t.length - s, c = e.start + t.length - (r ? 2 : 0), a = e.parent;
  for (let u = e.startIndex, h = e.endIndex, f = !0; u < h; u++, f = !1)
    !f && Ge(n.doc, c, l) && (n.split(c, l), c += 2 * l), c += a.child(u).nodeSize;
  return n;
}
function zc(n) {
  return function(e, t) {
    let { $from: r, $to: i } = e.selection, o = r.blockRange(i, (s) => s.childCount > 0 && s.firstChild.type == n);
    return o ? t ? r.node(o.depth - 1).type == n ? Rc(e, t, n, o) : Ic(e, t, o) : !0 : !1;
  };
}
function Rc(n, e, t, r) {
  let i = n.tr, o = r.end, s = r.$to.end(r.depth);
  o < s && (i.step(new ve(o - 1, s, o, s, new L(M.from(t.create(null, r.parent.copy())), 1, 0), 1, !0)), r = new Mn(i.doc.resolve(r.$from.pos), i.doc.resolve(s), r.depth));
  const l = Bt(r);
  if (l == null)
    return !1;
  i.lift(r, l);
  let c = i.doc.resolve(i.mapping.map(o, -1) - 1);
  return xt(i.doc, c.pos) && c.nodeBefore.type == c.nodeAfter.type && i.join(c.pos), e(i.scrollIntoView()), !0;
}
function Ic(n, e, t) {
  let r = n.tr, i = t.parent;
  for (let d = t.end, p = t.endIndex - 1, m = t.startIndex; p > m; p--)
    d -= i.child(p).nodeSize, r.delete(d - 1, d + 1);
  let o = r.doc.resolve(t.start), s = o.nodeAfter;
  if (r.mapping.map(t.end) != t.start + o.nodeAfter.nodeSize)
    return !1;
  let l = t.startIndex == 0, c = t.endIndex == i.childCount, a = o.node(-1), u = o.index(-1);
  if (!a.canReplace(u + (l ? 0 : 1), u + 1, s.content.append(c ? M.empty : M.from(i))))
    return !1;
  let h = o.pos, f = h + s.nodeSize;
  return r.step(new ve(h - (l ? 1 : 0), f + (c ? 1 : 0), h + 1, f - 1, new L((l ? M.empty : M.from(i.copy(M.empty))).append(c ? M.empty : M.from(i.copy(M.empty))), l ? 0 : 1, c ? 0 : 1), l ? 0 : 1)), e(r.scrollIntoView()), !0;
}
function $c(n) {
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
      let a = c.lastChild && c.lastChild.type == l.type, u = M.from(a ? n.create() : null), h = new L(M.from(n.create(null, M.from(l.type.create(null, u)))), a ? 3 : 1, 0), f = o.start, d = o.end;
      t(e.tr.step(new ve(f - (a ? 3 : 1), d, f, d, h, 1, !0)).scrollIntoView());
    }
    return !0;
  };
}
var Oc = Object.defineProperty, Ir = (n, e) => {
  for (var t in e)
    Oc(n, t, { get: e[t], enumerable: !0 });
};
function Po(n) {
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
var Dc = class {
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
    const { rawCommands: t, editor: r, state: i } = this, { view: o } = r, s = [], l = !!n, c = n || i.tr, a = () => (!l && e && !c.getMeta("preventDispatch") && !this.hasCustomState && o.dispatch(c), s.every((h) => h === !0)), u = {
      ...Object.fromEntries(
        Object.entries(t).map(([h, f]) => [h, (...p) => {
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
      state: Po({
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
}, Lo = {};
Ir(Lo, {
  blur: () => Pc,
  clearContent: () => Lc,
  clearNodes: () => Bc,
  command: () => Fc,
  createParagraphNear: () => _c,
  cut: () => Hc,
  deleteCurrentNode: () => Wc,
  deleteNode: () => jc,
  deleteRange: () => Jc,
  deleteSelection: () => Vc,
  enter: () => Yc,
  exitCode: () => Uc,
  extendMarkRange: () => Gc,
  first: () => Qc,
  focus: () => ta,
  forEach: () => na,
  insertContent: () => ra,
  insertContentAt: () => ia,
  insertDefaultBlock: () => oa,
  joinBackward: () => ca,
  joinDown: () => la,
  joinForward: () => aa,
  joinItemBackward: () => ua,
  joinItemForward: () => fa,
  joinTextblockBackward: () => da,
  joinTextblockForward: () => ha,
  joinUp: () => sa,
  keyboardShortcut: () => ma,
  lift: () => ga,
  liftEmptyBlock: () => ya,
  liftListItem: () => xa,
  newlineInCode: () => wa,
  resetAttributes: () => ba,
  scrollIntoView: () => va,
  selectAll: () => ka,
  selectNodeBackward: () => Sa,
  selectNodeForward: () => Ca,
  selectParentNode: () => Ea,
  selectTextblockEnd: () => Ta,
  selectTextblockStart: () => Ma,
  setContent: () => Aa,
  setMark: () => Ha,
  setMeta: () => Wa,
  setNode: () => ja,
  setNodeSelection: () => Ja,
  setTextDirection: () => qa,
  setTextSelection: () => Ka,
  sinkListItem: () => Va,
  splitBlock: () => Ya,
  splitListItem: () => Ua,
  toggleList: () => Ga,
  toggleMark: () => Qa,
  toggleNode: () => Za,
  toggleWrap: () => eu,
  undoInputRule: () => tu,
  unsetAllMarks: () => nu,
  unsetMark: () => ru,
  unsetTextDirection: () => iu,
  updateAttributes: () => ou,
  updateDecorations: () => cu,
  wrapIn: () => au,
  wrapInList: () => uu
});
var Pc = () => ({ editor: n, view: e }) => (requestAnimationFrame(() => {
  var t;
  n.isDestroyed || (e.dom.blur(), (t = window == null ? void 0 : window.getSelection()) == null || t.removeAllRanges());
}), !0), Lc = (n = !0) => ({ commands: e }) => e.setContent("", { emitUpdate: n }), Bc = () => ({ state: n, tr: e, dispatch: t }) => {
  const { selection: r } = e, { ranges: i } = r;
  return t && i.forEach(({ $from: o, $to: s }) => {
    n.doc.nodesBetween(o.pos, s.pos, (l, c) => {
      if (l.type.isText)
        return;
      const { doc: a, mapping: u } = e, h = a.resolve(u.map(c)), f = a.resolve(u.map(c + l.nodeSize)), d = h.blockRange(f);
      if (!d)
        return;
      const p = Bt(d);
      if (l.type.isTextblock) {
        const { defaultType: m } = h.parent.contentMatchAt(h.index());
        e.setNodeMarkup(d.start, m);
      }
      (p || p === 0) && e.lift(d, p);
    });
  }), !0;
}, Fc = (n) => (e) => n(e), _c = () => ({ state: n, dispatch: e }) => Io(n, e), Hc = (n, e) => ({ editor: t, tr: r }) => {
  const { state: i } = t, o = i.doc.slice(n.from, n.to);
  r.deleteRange(n.from, n.to);
  const s = r.mapping.map(e);
  return r.insert(s, o.content), r.setSelection(new Le(r.doc.resolve(Math.max(s - 1, 0)))), !0;
}, Wc = () => ({ tr: n, dispatch: e }) => {
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
function Ne(n, e) {
  if (typeof n == "string") {
    if (!e.nodes[n])
      throw Error(
        `There is no node type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.nodes[n];
  }
  return n;
}
var jc = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const i = Ne(n, t.schema), o = e.selection.$anchor;
  for (let s = o.depth; s > 0; s -= 1)
    if (o.node(s).type === i) {
      if (r) {
        const c = o.before(s), a = o.after(s);
        e.delete(c, a).scrollIntoView();
      }
      return !0;
    }
  return !1;
}, Jc = (n) => ({ tr: e, dispatch: t }) => {
  const { from: r, to: i } = n;
  return t && e.delete(r, i), !0;
}, qc = (n) => n.content ? /^text(\*|\+)/.test(n.content) : !1, fi = (n, e, t) => {
  if (!n.parent.isInline || t === "left" && n.pos > n.start() || t === "right" && n.pos < n.end())
    return n.pos;
  const r = e.nodes[n.parent.type.name].spec;
  return qc(r) ? t === "left" ? n.start() - 1 : n.end() + 1 : n.pos;
}, Kc = (n, e, t) => {
  const r = fi(n, t, "left"), i = fi(e, t, "right");
  return { from: r, to: i };
}, Vc = () => ({ state: n, dispatch: e }) => {
  if (n.selection.empty)
    return !1;
  if (e) {
    const t = n.tr, { ranges: r } = n.selection, i = t.steps.length;
    r.forEach((o) => {
      const s = t.mapping.slice(i), l = t.doc.resolve(s.map(o.$from.pos)), c = t.doc.resolve(s.map(o.$to.pos)), { from: a, to: u } = Kc(l, c, n.schema);
      t.deleteRange(a, u);
    }), t.selection.empty || t.setSelection(Le.near(t.doc.resolve(t.selection.from))), t.scrollIntoView(), e(t);
  }
  return !0;
}, Yc = () => ({ commands: n }) => n.keyboardShortcut("Enter"), Uc = () => ({ state: n, dispatch: e }) => wc(n, e);
function Xc(n) {
  return Object.prototype.toString.call(n) === "[object RegExp]";
}
function Rn(n, e, t = { strict: !0 }) {
  const r = Object.keys(e);
  return r.length ? r.every((i) => t.strict ? e[i] === n[i] : Xc(e[i]) ? e[i].test(n[i]) : e[i] === n[i]) : !0;
}
function Bo(n, e, t = {}) {
  return n.find((r) => r.type === e && Rn(
    // Only check equality for the attributes that are provided
    Object.fromEntries(Object.keys(t).map((i) => [i, r.attrs[i]])),
    t
  ));
}
function di(n, e, t = {}) {
  return !!Bo(n, e, t);
}
function Fo(n, e, t) {
  if (!n || !e)
    return;
  let r = n.parent.childAfter(n.parentOffset);
  if ((!r.node || !r.node.marks.some((a) => a.type === e)) && (r = n.parent.childBefore(n.parentOffset)), !r.node || !r.node.marks.some((a) => a.type === e))
    return;
  if (!t) {
    const a = r.node.marks.find((u) => u.type === e);
    a && (t = a.attrs);
  }
  if (!Bo([...r.node.marks], e, t))
    return;
  let o = r.index, s = n.start() + r.offset, l = o + 1, c = s + r.node.nodeSize;
  for (; o > 0 && di([...n.parent.child(o - 1).marks], e, t); )
    o -= 1, s -= n.parent.child(o).nodeSize;
  for (; l < n.parent.childCount && di([...n.parent.child(l).marks], e, t); )
    c += n.parent.child(l).nodeSize, l += 1;
  return {
    from: s,
    to: c
  };
}
function st(n, e) {
  if (typeof n == "string") {
    if (!e.marks[n])
      throw Error(
        `There is no mark type named '${n}'. Maybe you forgot to add the extension?`
      );
    return e.marks[n];
  }
  return n;
}
var Gc = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const o = st(n, r.schema), { doc: s, selection: l } = t, { $from: c, from: a, to: u } = l;
  if (i) {
    const h = Fo(c, o, e);
    if (h && h.from <= a && h.to >= u) {
      const f = Le.create(s, h.from, h.to);
      t.setSelection(f);
    }
  }
  return !0;
}, Qc = (n) => (e) => {
  const t = typeof n == "function" ? n(e) : n;
  for (let r = 0; r < t.length; r += 1)
    if (t[r](e))
      return !0;
  return !1;
};
function _o(n) {
  return n instanceof Le;
}
function ft(n = 0, e = 0, t = 0) {
  return Math.min(Math.max(n, e), t);
}
function Zc(n, e = null) {
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
    ft(0, i, o),
    ft(n.content.size, i, o)
  ) : Le.create(
    n,
    ft(e, i, o),
    ft(e, i, o)
  );
}
function hi() {
  return ["Android"].includes(navigator.platform) || /android/i.test(navigator.userAgent);
}
function In() {
  return ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(
    navigator.platform
  ) || // iPad on iOS 13 detection
  navigator.userAgent.includes("Mac") && "ontouchend" in document;
}
function ea() {
  return typeof navigator < "u" ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
}
var ta = (n = null, e = {}) => ({ editor: t, view: r, tr: i, dispatch: o }) => {
  e = {
    scrollIntoView: !0,
    ...e
  };
  const s = () => {
    (In() || hi()) && r.dom.focus(), ea() && !In() && !hi() && r.dom.focus({ preventScroll: !0 }), requestAnimationFrame(() => {
      t.isDestroyed || (r.focus(), e != null && e.scrollIntoView && t.commands.scrollIntoView());
    });
  };
  try {
    if (r.hasFocus() && n === null || n === !1)
      return !0;
  } catch {
    return !1;
  }
  if (o && n === null && !_o(t.state.selection))
    return s(), !0;
  const l = Zc(i.doc, n) || t.state.selection, c = t.state.selection.eq(l);
  return o && (c || i.setSelection(l), c && i.storedMarks && i.setStoredMarks(i.storedMarks), s()), !0;
}, na = (n, e) => (t) => n.every((r, i) => e(r, { ...t, index: i })), ra = (n, e) => ({ tr: t, commands: r }) => r.insertContentAt(
  { from: t.selection.from, to: t.selection.to },
  n,
  e
), Ho = (n) => {
  const e = n.childNodes;
  for (let t = e.length - 1; t >= 0; t -= 1) {
    const r = e[t];
    r.nodeType === 3 && r.nodeValue && /^(\n\s\s|\n)$/.test(r.nodeValue) ? n.removeChild(r) : r.nodeType === 1 && Ho(r);
  }
  return n;
};
function gn(n) {
  if (typeof window > "u")
    throw new Error(
      "[tiptap error]: there is no window object available, so this function cannot be used"
    );
  const e = `<body>${n}</body>`, t = new window.DOMParser().parseFromString(e, "text/html").body;
  return Ho(t);
}
function Wo(n) {
  return typeof (n == null ? void 0 : n.nodesBetween) == "function";
}
function Ot(n, e, t) {
  if (Wo(n))
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
        return M.fromArray(n.map((l) => e.nodeFromJSON(l)));
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
      const c = new Ll({
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
        gn(n),
        t.parseOptions
      ) : Nt.fromSchema(c).parse(
        gn(n),
        t.parseOptions
      ), t.errorOnInvalidContent && s)
        throw new Error("[tiptap error]: Invalid HTML content", {
          cause: new Error(`Invalid element found: ${l}`)
        });
    }
    const o = Nt.fromSchema(e);
    return t.slice ? o.parseSlice(gn(n), t.parseOptions).content : o.parse(gn(n), t.parseOptions);
  }
  return Ot("", e, t);
}
function jo(n) {
  return !("type" in n);
}
function Jo(n, e, t) {
  const r = n.steps.length - 1;
  if (r < e)
    return;
  const i = n.steps[r];
  if (!(i instanceof xe || i instanceof ve))
    return;
  const o = n.mapping.maps[r];
  let s = 0;
  o.forEach((l, c, a, u) => {
    s === 0 && (s = u);
  }), n.setSelection(Tt.near(n.doc.resolve(s), t));
}
var ia = (n, e, t) => ({ tr: r, dispatch: i, editor: o }) => {
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
    let { from: u, to: h } = typeof n == "number" ? { from: n, to: n } : { from: n.from, to: n.to }, f = !0, d = !0;
    const p = jo(l) ? l.content : [l];
    if (p.forEach((y) => {
      y.check(), f = f ? y.isText && y.marks.length === 0 : !1, d = d ? y.isBlock : !1;
    }), u === h && d) {
      const { parent: y } = r.doc.resolve(u);
      y.isTextblock && !y.type.spec.code && !y.childCount && (u -= 1, h += 1);
    }
    let m;
    if (f)
      Array.isArray(e) ? m = e.map((y) => y.text || "").join("") : Wo(e) ? m = p.map((y) => {
        var x;
        return (x = y.text) != null ? x : "";
      }).join("") : typeof e == "object" && e && e.text ? m = e.text : m = e, r.insertText(m, u, h);
    else {
      m = M.from(p);
      const y = r.doc.resolve(u), x = y.node(), v = y.parentOffset === 0, b = x.isText || x.isTextblock, C = x.content.size > 0;
      v && b && C && d && (u = Math.max(0, u - 1)), r.replaceWith(u, h, p);
    }
    t.updateSelection && Jo(r, r.steps.length - 1, -1), t.applyInputRules && r.setMeta("applyInputRules", { from: u, text: m }), t.applyPasteRules && r.setMeta("applyPasteRules", { from: u, text: m });
  }
  return !0;
};
function qo(n) {
  for (let e = 0; e < n.edgeCount; e += 1) {
    const { type: t } = n.edge(e);
    if (t.isTextblock && !t.hasRequiredAttrs())
      return t;
  }
  return null;
}
var oa = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { pos: i, attrs: o, content: s, updateSelection: l = !0 } = n;
  let c;
  typeof i == "number" ? c = e.doc.resolve(i) : i ? c = i : c = e.selection.$from;
  const a = qo(c.parent.contentMatchAt(c.index()));
  if (!a)
    return !1;
  const u = Object.keys(a.spec.attrs || {}), h = o ? Object.fromEntries(Object.entries(o).filter(([d]) => u.includes(d))) : {};
  let f;
  if (s) {
    const d = Ot(s, r.schema);
    f = a.createAndFill(h, d);
  } else
    f = a.createAndFill(h);
  return f ? (t && (e.insert(c.pos, f), l && Jo(e, e.steps.length - 1, -1)), !0) : !1;
}, sa = () => ({ state: n, dispatch: e }) => gc(n, e), la = () => ({ state: n, dispatch: e }) => yc(n, e), ca = () => ({ state: n, dispatch: e }) => Eo(n, e), aa = () => ({ state: n, dispatch: e }) => Ao(n, e), ua = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Ln(n.doc, n.selection.$from.pos, -1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, fa = () => ({ state: n, dispatch: e, tr: t }) => {
  try {
    const r = Ln(n.doc, n.selection.$from.pos, 1);
    return r == null ? !1 : (t.join(r, 2), e && e(t), !0);
  } catch {
    return !1;
  }
}, da = () => ({ state: n, dispatch: e }) => pc(n, e), ha = () => ({ state: n, dispatch: e }) => mc(n, e);
function Ko() {
  return typeof navigator < "u" ? /Mac/.test(navigator.platform) : !1;
}
function pa(n) {
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
      In() || Ko() ? s = !0 : i = !0;
    else
      throw new Error(`Unrecognized modifier name: ${c}`);
  }
  return r && (t = `Alt-${t}`), i && (t = `Ctrl-${t}`), s && (t = `Meta-${t}`), o && (t = `Shift-${t}`), t;
}
var ma = (n) => ({ editor: e, view: t, tr: r, dispatch: i }) => {
  const o = pa(n).split(/-(?!$)/), s = o.find((a) => !["Alt", "Ctrl", "Meta", "Shift"].includes(a)), l = new KeyboardEvent("keydown", {
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
function $r(n, e, t = {}) {
  const { from: r, to: i, empty: o } = n.selection, s = e ? Ne(e, n.schema) : null, l = [];
  n.doc.nodesBetween(r, i, (h, f) => {
    if (h.isText)
      return;
    const d = Math.max(r, f), p = Math.min(i, f + h.nodeSize);
    l.push({
      node: h,
      from: d,
      to: p
    });
  });
  const c = i - r, a = l.filter((h) => s ? s.name === h.node.type.name : !0).filter((h) => Rn(h.node.attrs, t, { strict: !1 }));
  return o ? !!a.length : a.reduce((h, f) => h + f.to - f.from, 0) >= c;
}
var ga = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ne(n, t.schema);
  return $r(t, i, e) ? xc(t, r) : !1;
}, ya = () => ({ state: n, dispatch: e }) => $o(n, e), xa = (n) => ({ state: e, dispatch: t }) => {
  const r = Ne(n, e.schema);
  return zc(r)(e, t);
}, wa = () => ({ state: n, dispatch: e }) => Ro(n, e);
function Vo(n, e) {
  return e.nodes[n] ? "node" : e.marks[n] ? "mark" : null;
}
function pi(n, e) {
  const t = typeof e == "string" ? [e] : e;
  return Object.keys(n).reduce((r, i) => (t.includes(i) || (r[i] = n[i]), r), {});
}
var ba = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Vo(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (o = Ne(n, r.schema)), l === "mark" && (s = st(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    r.doc.nodesBetween(a.$from.pos, a.$to.pos, (u, h) => {
      o && o === u.type && (c = !0, i && t.setNodeMarkup(h, void 0, pi(u.attrs, e))), s && u.marks.length && u.marks.forEach((f) => {
        s === f.type && (c = !0, i && t.addMark(
          h,
          h + u.nodeSize,
          s.create(pi(f.attrs, e))
        ));
      });
    });
  }), c;
}, va = () => ({ tr: n, dispatch: e }) => (e && n.scrollIntoView(), !0), ka = () => ({ tr: n, dispatch: e }) => {
  if (e) {
    const t = new Ms(n.doc);
    n.setSelection(t);
  }
  return !0;
}, Sa = () => ({ state: n, dispatch: e }) => Mo(n, e), Ca = () => ({ state: n, dispatch: e }) => zo(n, e), Ea = () => ({ state: n, dispatch: e }) => kc(n, e), Ta = () => ({ state: n, dispatch: e }) => Ec(n, e), Ma = () => ({ state: n, dispatch: e }) => Cc(n, e);
function Na(n, e, t = {}, r = {}) {
  return Ot(n, e, {
    slice: !1,
    parseOptions: t,
    errorOnInvalidContent: r.errorOnInvalidContent
  });
}
var Aa = (n, { errorOnInvalidContent: e, emitUpdate: t = !0, parseOptions: r = {} } = {}) => ({ editor: i, tr: o, dispatch: s, commands: l }) => {
  const { doc: c } = o;
  if (r.preserveWhitespace !== "full") {
    const a = Na(n, i.schema, r, {
      errorOnInvalidContent: e ?? i.options.enableContentCheck
    });
    if (s) {
      const u = jo(a) ? a.content : [a];
      o.replaceWith(0, c.content.size, u).setMeta("preventUpdate", !t);
    }
    return !0;
  }
  return s && o.setMeta("preventUpdate", !t), l.insertContentAt({ from: 0, to: c.content.size }, n, {
    parseOptions: r,
    errorOnInvalidContent: e ?? i.options.enableContentCheck
  });
};
function za(n, e) {
  const t = st(e, n.schema), { from: r, to: i, empty: o } = n.selection, s = [];
  o ? (n.storedMarks && s.push(...n.storedMarks), s.push(...n.selection.$head.marks())) : n.doc.nodesBetween(r, i, (c) => {
    s.push(...c.marks);
  });
  const l = s.find((c) => c.type.name === t.name);
  return l ? { ...l.attrs } : {};
}
function Ra(n, e) {
  const t = new fc(n);
  return e.forEach((r) => {
    r.steps.forEach((i) => {
      t.step(i);
    });
  }), t;
}
function Ia(n, e) {
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
function Or(n) {
  return (e) => Ia(e.$from, n);
}
function Zt(n, e, t) {
  return n.config[e] === void 0 && n.parent ? Zt(n.parent, e, t) : typeof n.config[e] == "function" ? n.config[e].bind({
    ...t,
    parent: n.parent ? Zt(n.parent, e, t) : null
  }) : n.config[e];
}
function $a(n) {
  return typeof n == "function";
}
function ar(n, e = void 0, ...t) {
  return $a(n) ? e ? n.bind(e)(...t) : n(...t) : n;
}
function Yo(n) {
  const e = n.filter(
    (i) => i.type === "extension"
  ), t = n.filter((i) => i.type === "node"), r = n.filter((i) => i.type === "mark");
  return {
    baseExtensions: e,
    nodeExtensions: t,
    markExtensions: r
  };
}
function Oa(n, e, t) {
  const { from: r, to: i } = e, { blockSeparator: o = `

`, textSerializers: s = {} } = t || {};
  let l = "";
  return n.nodesBetween(r, i, (c, a, u, h) => {
    var f;
    c.isBlock && a > r && (l += o);
    const d = s == null ? void 0 : s[c.type.name];
    if (d)
      return u && (l += d({
        node: c,
        pos: a,
        parent: u,
        index: h,
        range: e
      })), !1;
    c.isText && (l += (f = c == null ? void 0 : c.text) == null ? void 0 : f.slice(Math.max(r, a) - a, i - a));
  }), l;
}
function Da(n) {
  return Object.fromEntries(
    Object.entries(n.nodes).filter(([, e]) => e.spec.toText).map(([e, t]) => [e, t.spec.toText])
  );
}
function Pa(n, e = JSON.stringify) {
  const t = {};
  return n.filter((r) => {
    const i = e(r);
    return Object.prototype.hasOwnProperty.call(t, i) ? !1 : t[i] = !0;
  });
}
function La(n) {
  const e = Pa(n);
  return e.length === 1 ? e : e.filter((t, r) => !e.filter((o, s) => s !== r).some((o) => t.oldRange.from >= o.oldRange.from && t.oldRange.to <= o.oldRange.to && t.newRange.from >= o.newRange.from && t.newRange.to <= o.newRange.to));
}
function Ba(n) {
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
      const a = e.slice(o).map(l, -1), u = e.slice(o).map(c), h = e.invert().map(a, -1), f = e.invert().map(u);
      r.push({
        oldRange: {
          from: h,
          to: f
        },
        newRange: {
          from: a,
          to: u
        }
      });
    });
  }), La(r);
}
function bn(n, e, t) {
  return Object.fromEntries(
    Object.entries(t).filter(([r]) => {
      const i = n.find((o) => o.type === e && o.name === r);
      return i ? i.attribute.keepOnSplit : !1;
    })
  );
}
function Fa(n, e, t = {}) {
  const { empty: r, ranges: i } = n.selection, o = e ? st(e, n.schema) : null;
  if (r)
    return !!(n.storedMarks || n.selection.$from.marks()).filter((h) => o ? o.name === h.type.name : !0).find((h) => Rn(h.attrs, t, { strict: !1 }));
  let s = 0;
  const l = [];
  if (i.forEach(({ $from: h, $to: f }) => {
    const d = h.pos, p = f.pos;
    n.doc.nodesBetween(d, p, (m, y) => {
      if (o && m.inlineContent && !m.type.allowsMarkType(o))
        return !1;
      if (!m.isText && !m.marks.length)
        return;
      const x = Math.max(d, y), v = Math.min(p, y + m.nodeSize), b = v - x;
      s += b, l.push(
        ...m.marks.map((C) => ({
          mark: C,
          from: x,
          to: v
        }))
      );
    });
  }), s === 0)
    return !1;
  const c = l.filter((h) => o ? o.name === h.mark.type.name : !0).filter((h) => Rn(h.mark.attrs, t, { strict: !1 })).reduce((h, f) => h + f.to - f.from, 0), a = l.filter((h) => o ? h.mark.type !== o && h.mark.type.excludes(o) : !0).reduce((h, f) => h + f.to - f.from, 0);
  return (c > 0 ? c + a : c) >= s;
}
function Gn(n, e) {
  const { nodeExtensions: t } = Yo(e), r = t.find((s) => s.name === n);
  if (!r)
    return !1;
  const i = {
    name: r.name,
    options: r.options,
    storage: r.storage
  }, o = ar(Zt(r, "group", i));
  return typeof o != "string" ? !1 : o.split(" ").includes("list");
}
function Uo(n, {
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
      i !== !1 && (Uo(o, { ignoreWhitespace: t, checkChildren: e }) || (i = !1));
    }), i;
  }
  return !1;
}
function _a(n, e, t) {
  var r;
  const { selection: i } = e;
  let o = null;
  if (_o(i) && (o = i.$cursor), o) {
    const l = (r = n.storedMarks) != null ? r : o.marks();
    return o.parent.type.allowsMarkType(t) && (!!t.isInSet(l) || !l.some((a) => a.type.excludes(t)));
  }
  const { ranges: s } = i;
  return s.some(({ $from: l, $to: c }) => {
    let a = l.depth === 0 ? n.doc.inlineContent && n.doc.type.allowsMarkType(t) : !1;
    return n.doc.nodesBetween(l.pos, c.pos, (u, h, f) => {
      if (a)
        return !1;
      if (u.isInline) {
        const d = !f || f.type.allowsMarkType(t), p = !!t.isInSet(u.marks) || !u.marks.some((m) => m.type.excludes(t));
        a = d && p;
      }
      return !a;
    }), a;
  });
}
var Ha = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = t, { empty: s, ranges: l } = o, c = st(n, r.schema);
  if (i)
    if (s) {
      const a = za(r, c);
      t.addStoredMark(
        c.create({
          ...a,
          ...e
        })
      );
    } else
      l.forEach((a) => {
        const u = a.$from.pos, h = a.$to.pos;
        r.doc.nodesBetween(u, h, (f, d) => {
          const p = Math.max(d, u), m = Math.min(d + f.nodeSize, h);
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
  return _a(r, t, c);
}, Wa = (n, e) => ({ tr: t }) => (t.setMeta(n, e), !0), ja = (n, e = {}) => ({ state: t, dispatch: r, chain: i }) => {
  const o = Ne(n, t.schema);
  let s;
  return t.selection.$anchor.sameParent(t.selection.$head) && (s = t.selection.$anchor.parent.attrs), o.isTextblock ? i().command(({ commands: l }) => ui(o, { ...s, ...e })(t) ? !0 : l.clearNodes()).command(({ state: l }) => ui(o, { ...s, ...e })(l, r)).run() : (console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'), !1);
}, Ja = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, i = ft(n, 0, r.content.size), o = zt.create(r, i);
    e.setSelection(o);
  }
  return !0;
}, qa = (n, e) => ({ tr: t, state: r, dispatch: i }) => {
  const { selection: o } = r;
  let s, l;
  return typeof e == "number" ? (s = e, l = e) : e && "from" in e && "to" in e ? (s = e.from, l = e.to) : (s = o.from, l = o.to), i && t.doc.nodesBetween(s, l, (c, a) => {
    c.isText || t.setNodeMarkup(a, void 0, {
      ...c.attrs,
      dir: n
    });
  }), !0;
}, Ka = (n) => ({ tr: e, dispatch: t }) => {
  if (t) {
    const { doc: r } = e, { from: i, to: o } = typeof n == "number" ? { from: n, to: n } : n, s = Le.atStart(r).from, l = Le.atEnd(r).to, c = ft(i, s, l), a = ft(o, s, l), u = Le.create(r, c, a);
    e.setSelection(u);
  }
  return !0;
}, Va = (n) => ({ state: e, dispatch: t }) => {
  const r = Ne(n, e.schema);
  return $c(r)(e, t);
};
function mi(n, e) {
  const t = n.storedMarks || n.selection.$to.parentOffset && n.selection.$from.marks();
  if (t) {
    const r = t.filter((i) => e == null ? void 0 : e.includes(i.type.name));
    n.tr.ensureMarks(r);
  }
}
var Ya = ({ keepMarks: n = !0 } = {}) => ({ tr: e, state: t, dispatch: r, editor: i }) => {
  const { selection: o, doc: s } = e, { $from: l, $to: c } = o, a = i.extensionManager.attributes, u = bn(
    a,
    l.node().type.name,
    l.node().attrs
  );
  if (o instanceof zt && o.node.isBlock)
    return !l.parentOffset || !Ge(s, l.pos) ? !1 : (r && (n && mi(t, i.extensionManager.splittableMarks), e.split(l.pos).scrollIntoView()), !0);
  if (!l.parent.isBlock)
    return !1;
  const h = c.parentOffset === c.parent.content.size, f = l.depth === 0 ? void 0 : qo(l.node(-1).contentMatchAt(l.indexAfter(-1)));
  let d = h && f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0, p = Ge(e.doc, e.mapping.map(l.pos), 1, d);
  if (!d && !p && Ge(e.doc, e.mapping.map(l.pos), 1, f ? [{ type: f }] : void 0) && (p = !0, d = f ? [
    {
      type: f,
      attrs: u
    }
  ] : void 0), r) {
    if (p && (o instanceof Le && e.deleteSelection(), e.split(e.mapping.map(l.pos), 1, d), f && !h && !l.parentOffset && l.parent.type !== f)) {
      const m = e.mapping.map(l.before()), y = e.doc.resolve(m);
      l.node(-1).canReplaceWith(y.index(), y.index() + 1, f) && e.setNodeMarkup(e.mapping.map(l.before()), f);
    }
    n && mi(t, i.extensionManager.splittableMarks), e.scrollIntoView();
  }
  return p;
}, Ua = (n, e = {}) => ({ tr: t, state: r, dispatch: i, editor: o }) => {
  var s;
  const l = Ne(n, r.schema), { $from: c, $to: a } = r.selection, u = r.selection.node;
  if (u && u.isBlock || c.depth < 2 || !c.sameParent(a))
    return !1;
  const h = c.node(-1);
  if (h.type !== l)
    return !1;
  const f = o.extensionManager.attributes;
  if (c.parent.content.size === 0 && c.node(-1).childCount === c.indexAfter(-1)) {
    if (c.depth === 2 || c.node(-3).type !== l || c.index(-2) !== c.node(-2).childCount - 1)
      return !1;
    if (i) {
      let x = M.empty;
      const v = c.index(-1) ? 1 : c.index(-2) ? 2 : 3;
      for (let D = c.depth - v; D >= c.depth - 3; D -= 1)
        x = M.from(c.node(D).copy(x));
      const b = (
        // oxlint-disable-next-line no-nested-ternary
        c.indexAfter(-1) < c.node(-2).childCount ? 1 : c.indexAfter(-2) < c.node(-3).childCount ? 2 : 3
      ), C = {
        ...bn(f, c.node().type.name, c.node().attrs),
        ...e
      }, B = ((s = l.contentMatch.defaultType) == null ? void 0 : s.createAndFill(C)) || void 0;
      x = x.append(M.from(l.createAndFill(null, B) || void 0));
      const I = c.before(c.depth - (v - 1));
      t.replace(I, c.after(-b), new L(x, 4 - v, 0));
      let E = -1;
      t.doc.nodesBetween(I, t.doc.content.size, (D, T) => {
        if (E > -1)
          return !1;
        D.isTextblock && D.content.size === 0 && (E = T + 1);
      }), E > -1 && t.setSelection(Le.near(t.doc.resolve(E))), t.scrollIntoView();
    }
    return !0;
  }
  const d = a.pos === c.end() ? h.contentMatchAt(0).defaultType : null, p = {
    ...bn(f, h.type.name, h.attrs),
    ...e
  }, m = {
    ...bn(f, c.node().type.name, c.node().attrs),
    ...e
  };
  t.delete(c.pos, a.pos);
  const y = d ? [
    { type: l, attrs: p },
    { type: d, attrs: m }
  ] : [{ type: l, attrs: p }];
  if (!Ge(t.doc, c.pos, 2))
    return !1;
  if (i) {
    const { selection: x, storedMarks: v } = r, { splittableMarks: b } = o.extensionManager, C = v || x.$to.parentOffset && x.$from.marks();
    if (t.split(c.pos, 2, y).scrollIntoView(), !C || !i)
      return !0;
    const B = C.filter((I) => b.includes(I.type.name));
    t.ensureMarks(B);
  }
  return !0;
};
function gi(n) {
  return !n || n === "1" ? null : n;
}
function Xo(n, e) {
  return gi(n) === gi(e);
}
var Qn = (n, e) => {
  const t = Or((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(Math.max(0, t.pos - 1)).before(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && xt(n.doc, t.pos)) || !Xo(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(t.pos), !0;
}, Zn = (n, e) => {
  const t = Or((s) => s.type === e)(n.selection);
  if (!t)
    return !0;
  const r = n.doc.resolve(t.start).after(t.depth);
  if (r === void 0)
    return !0;
  const i = n.doc.nodeAt(r);
  return !(t.node.type === (i == null ? void 0 : i.type) && xt(n.doc, r)) || !Xo(t.node.attrs.type, i == null ? void 0 : i.attrs.type) || n.join(r), !0;
};
function Xa(n) {
  const e = n.doc, t = e.firstChild;
  if (!t)
    return null;
  const r = e.resolve(1), i = e.resolve(t.nodeSize - 1);
  return Le.between(r, i);
}
var Ga = (n, e, t, r = {}) => ({ editor: i, tr: o, state: s, dispatch: l, chain: c, commands: a, can: u }) => {
  const { extensions: h, splittableMarks: f } = i.extensionManager, d = Ne(n, s.schema), p = Ne(e, s.schema), { selection: m, storedMarks: y } = s, { $from: x, $to: v } = m, b = x.blockRange(v), C = y || m.$to.parentOffset && m.$from.marks();
  if (!b)
    return !1;
  const B = Or((z) => Gn(z.type.name, h))(m), I = m.from === 0 && m.to === s.doc.content.size, E = s.doc.content.content, D = E.length === 1 ? E[0] : null, T = I && D && Gn(D.type.name, h) ? {
    node: D,
    pos: 0
  } : null, U = B ?? T, N = !!B && b.depth >= 1 && b.depth - B.depth <= 1, W = !!T;
  if ((N || W) && U) {
    if (U.node.type === d)
      return I && W ? c().command(({ tr: z, dispatch: O }) => {
        const P = Xa(z);
        return P ? (z.setSelection(P), O && O(z), !0) : !1;
      }).liftListItem(p).run() : a.liftListItem(p);
    if (Gn(U.node.type.name, h) && d.validContent(U.node.content))
      return c().command(() => (o.setNodeMarkup(U.pos, d), !0)).command(() => Qn(o, d)).command(() => Zn(o, d)).run();
  }
  return !t || !C || !l ? c().command(() => u().wrapInList(d, r) ? !0 : a.clearNodes()).wrapInList(d, r).command(() => Qn(o, d)).command(() => Zn(o, d)).run() : c().command(() => {
    const z = u().wrapInList(d, r), O = C.filter((P) => f.includes(P.type.name));
    return o.ensureMarks(O), z ? !0 : a.clearNodes();
  }).wrapInList(d, r).command(() => Qn(o, d)).command(() => Zn(o, d)).run();
}, Qa = (n, e = {}, t = {}) => ({ state: r, commands: i }) => {
  const { extendEmptyMarkRange: o = !1 } = t, s = st(n, r.schema);
  return Fa(r, s, e) ? i.unsetMark(s, { extendEmptyMarkRange: o }) : i.setMark(s, e);
}, Za = (n, e, t = {}) => ({ state: r, commands: i }) => {
  const o = Ne(n, r.schema), s = Ne(e, r.schema), l = $r(r, o, t);
  let c;
  return r.selection.$anchor.sameParent(r.selection.$head) && (c = r.selection.$anchor.parent.attrs), l ? i.setNode(s, c) : i.setNode(o, { ...c, ...t });
}, eu = (n, e = {}) => ({ state: t, commands: r }) => {
  const i = Ne(n, t.schema);
  return $r(t, i, e) ? r.lift(i) : r.wrapIn(i, e);
}, tu = () => ({ state: n, dispatch: e }) => {
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
}, nu = (n = {}) => ({ tr: e, dispatch: t, editor: r }) => {
  const { ignoreClearable: i = !1 } = n, { selection: o } = e, { empty: s, ranges: l } = o;
  if (s)
    return !0;
  const { nonClearableMarks: c } = r.extensionManager;
  if (t) {
    const a = Object.values(r.schema.marks).filter(
      (u) => i || !c.includes(u.name)
    );
    l.forEach((u) => {
      for (const h of a)
        e.removeMark(u.$from.pos, u.$to.pos, h);
    });
  }
  return !0;
}, ru = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  var o;
  const { extendEmptyMarkRange: s = !1 } = e, { selection: l } = t, c = st(n, r.schema), { $from: a, empty: u, ranges: h } = l;
  if (!i)
    return !0;
  if (u && s) {
    let { from: f, to: d } = l;
    const p = (o = a.marks().find((y) => y.type === c)) == null ? void 0 : o.attrs, m = Fo(a, c, p);
    m && (f = m.from, d = m.to), t.removeMark(f, d, c);
  } else
    h.forEach((f) => {
      t.removeMark(f.$from.pos, f.$to.pos, c);
    });
  return t.removeStoredMark(c), !0;
}, iu = (n) => ({ tr: e, state: t, dispatch: r }) => {
  const { selection: i } = t;
  let o, s;
  return typeof n == "number" ? (o = n, s = n) : n && "from" in n && "to" in n ? (o = n.from, s = n.to) : (o = i.from, s = i.to), r && e.doc.nodesBetween(o, s, (l, c) => {
    if (l.isText)
      return;
    const a = { ...l.attrs };
    delete a.dir, e.setNodeMarkup(c, void 0, a);
  }), !0;
}, ou = (n, e = {}) => ({ tr: t, state: r, dispatch: i }) => {
  let o = null, s = null;
  const l = Vo(
    typeof n == "string" ? n : n.name,
    r.schema
  );
  if (!l)
    return !1;
  l === "node" && (o = Ne(n, r.schema)), l === "mark" && (s = st(n, r.schema));
  let c = !1;
  return t.selection.ranges.forEach((a) => {
    const u = a.$from.pos, h = a.$to.pos;
    let f, d, p, m;
    t.selection.empty ? r.doc.nodesBetween(u, h, (y, x) => {
      o && o === y.type && (c = !0, p = Math.max(x, u), m = Math.min(x + y.nodeSize, h), f = x, d = y);
    }) : r.doc.nodesBetween(u, h, (y, x) => {
      x < u && o && o === y.type && (c = !0, p = Math.max(x, u), m = Math.min(x + y.nodeSize, h), f = x, d = y), x >= u && x <= h && (o && o === y.type && (c = !0, i && t.setNodeMarkup(x, void 0, {
        ...y.attrs,
        ...e
      })), s && y.marks.length && y.marks.forEach((v) => {
        if (s === v.type && (c = !0, i)) {
          const b = Math.max(x, u), C = Math.min(x + y.nodeSize, h);
          t.addMark(
            b,
            C,
            s.create({
              ...v.attrs,
              ...e
            })
          );
        }
      }));
    }), d && (f !== void 0 && i && t.setNodeMarkup(f, void 0, {
      ...d.attrs,
      ...e
    }), s && d.marks.length && d.marks.forEach((y) => {
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
}, su = "__tiptap_decorations__", lu = new Ke(
  su
), cu = (n) => ({ tr: e, dispatch: t }) => (t && e.setMeta(lu, { type: "force", name: n }), !0), au = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ne(n, t.schema);
  return Tc(i, e)(t, r);
}, uu = (n, e = {}) => ({ state: t, dispatch: r }) => {
  const i = Ne(n, t.schema);
  return Mc(i, e)(t, r);
};
typeof process < "u" && process.env.NODE_ENV;
function fu(n) {
  return Object.prototype.toString.call(n).slice(8, -1);
}
function yn(n) {
  return fu(n) !== "Object" ? !1 : n.constructor === Object && Object.getPrototypeOf(n) === Object.prototype;
}
var du = {};
Ir(du, {
  createAtomBlockMarkdownSpec: () => hu,
  createBlockMarkdownSpec: () => pu,
  createInlineMarkdownSpec: () => yu,
  parseAttributes: () => Dr,
  parseIndentedBlocks: () => xu,
  renderNestedMarkdownContent: () => wu,
  serializeAttributes: () => Pr
});
function Dr(n) {
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
    var h;
    const f = parseInt(((h = u.match(/__QUOTED_(\d+)__/)) == null ? void 0 : h[1]) || "0", 10), d = t[f];
    d && (e[a] = d.slice(1, -1));
  });
  const c = r.replace(/(?:^|\s)\.([\w-]+)/g, "").replace(/(?:^|\s)#([\w-]+)/g, "").replace(/([a-zA-Z][\w-]*)\s*=\s*__QUOTED_\d+__/g, "").trim();
  return c && c.split(/\s+/).filter(Boolean).forEach((u) => {
    u.match(/^[a-zA-Z][\w-]*$/) && (e[u] = !0);
  }), e;
}
function Pr(n) {
  if (!n || Object.keys(n).length === 0)
    return "";
  const e = [];
  return n.class && String(n.class).split(/\s+/).filter(Boolean).forEach((r) => e.push(`.${r}`)), n.id && e.push(`#${n.id}`), Object.entries(n).forEach(([t, r]) => {
    t === "class" || t === "id" || (r === !0 ? e.push(t) : r !== !1 && r != null && e.push(`${t}="${String(r)}"`));
  }), e.join(" ");
}
function hu(n) {
  const {
    nodeName: e,
    name: t,
    parseAttributes: r = Dr,
    serializeAttributes: i = Pr,
    defaultAttributes: o = {},
    requiredAttributes: s = [],
    allowedAttributes: l
  } = n, c = t || e, a = (u) => {
    if (!l)
      return u;
    const h = {};
    return l.forEach((f) => {
      f in u && (h[f] = u[f]);
    }), h;
  };
  return {
    parseMarkdown: (u, h) => {
      const f = { ...o, ...u.attributes };
      return h.createNode(e, f, []);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(u) {
        var h;
        const f = new RegExp(`^:::${c}(?:\\s|$)`, "m"), d = (h = u.match(f)) == null ? void 0 : h.index;
        return d !== void 0 ? d : -1;
      },
      tokenize(u, h, f) {
        const d = new RegExp(`^:::${c}(?:\\s+\\{([^}]*)\\})?\\s*:::(?:\\n|$)`), p = u.match(d);
        if (!p)
          return;
        const m = p[1] || "", y = r(m);
        if (!s.find((v) => !(v in y)))
          return {
            type: e,
            raw: p[0],
            attributes: y
          };
      }
    },
    renderMarkdown: (u) => {
      const h = a(u.attrs || {}), f = i(h), d = f ? ` {${f}}` : "";
      return `:::${c}${d} :::`;
    }
  };
}
function pu(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: i = Dr,
    serializeAttributes: o = Pr,
    defaultAttributes: s = {},
    content: l = "block",
    allowedAttributes: c
  } = n, a = t || e, u = (h) => {
    if (!c)
      return h;
    const f = {};
    return c.forEach((d) => {
      d in h && (f[d] = h[d]);
    }), f;
  };
  return {
    parseMarkdown: (h, f) => {
      let d;
      if (r) {
        const m = r(h);
        d = typeof m == "string" ? [{ type: "text", text: m }] : m;
      } else l === "block" ? d = f.parseChildren(h.tokens || []) : d = f.parseInline(h.tokens || []);
      const p = { ...s, ...h.attributes };
      return f.createNode(e, p, d);
    },
    markdownTokenizer: {
      name: e,
      level: "block",
      start(h) {
        var f;
        const d = new RegExp(`^:::${a}`, "m"), p = (f = h.match(d)) == null ? void 0 : f.index;
        return p !== void 0 ? p : -1;
      },
      tokenize(h, f, d) {
        var p;
        const m = new RegExp(`^:::${a}(?:\\s+\\{([^}]*)\\})?\\s*\\n`), y = h.match(m);
        if (!y)
          return;
        const [x, v = ""] = y, b = i(v);
        let C = 1;
        const B = x.length;
        let I = "";
        const E = /^:::([\w-]*)(\s.*)?/gm, D = h.slice(B);
        for (E.lastIndex = 0; ; ) {
          const T = E.exec(D);
          if (T === null)
            break;
          const U = T.index, N = T[1];
          if (!((p = T[2]) != null && p.endsWith(":::"))) {
            if (N)
              C += 1;
            else if (C -= 1, C === 0) {
              const W = D.slice(0, U);
              I = W.trim();
              const z = h.slice(0, B + U + T[0].length);
              let O = [];
              if (I)
                if (l === "block")
                  for (O = d.blockTokens(W), O.forEach((P) => {
                    P.text && (!P.tokens || P.tokens.length === 0) && (P.tokens = d.inlineTokens(P.text));
                  }); O.length > 0; ) {
                    const P = O[O.length - 1];
                    if (P.type === "paragraph" && (!P.text || P.text.trim() === ""))
                      O.pop();
                    else
                      break;
                  }
                else
                  O = d.inlineTokens(I);
              return {
                type: e,
                raw: z,
                attributes: b,
                content: I,
                tokens: O
              };
            }
          }
        }
      }
    },
    renderMarkdown: (h, f) => {
      const d = u(h.attrs || {}), p = o(d), m = p ? ` {${p}}` : "", y = f.renderChildren(h.content || [], `

`);
      return `:::${a}${m}

${y}

:::`;
    }
  };
}
function mu(n) {
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
function gu(n) {
  return Object.entries(n).filter(([, e]) => e != null).map(([e, t]) => `${e}="${t}"`).join(" ");
}
function yu(n) {
  const {
    nodeName: e,
    name: t,
    getContent: r,
    parseAttributes: i = mu,
    serializeAttributes: o = gu,
    defaultAttributes: s = {},
    selfClosing: l = !1,
    allowedAttributes: c
  } = n, a = t || e, u = (f) => {
    if (!c)
      return f;
    const d = {};
    return c.forEach((p) => {
      const m = typeof p == "string" ? p : p.name, y = typeof p == "string" ? void 0 : p.skipIfDefault;
      if (m in f) {
        const x = f[m];
        if (y !== void 0 && x === y)
          return;
        d[m] = x;
      }
    }), d;
  }, h = a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return {
    parseMarkdown: (f, d) => {
      const p = { ...s, ...f.attributes };
      if (l)
        return d.createNode(e, p);
      const m = r ? r(f) : f.content || "";
      return m ? d.createNode(e, p, [d.createTextNode(m)]) : d.createNode(e, p, []);
    },
    markdownTokenizer: {
      name: e,
      level: "inline",
      start(f) {
        const d = l ? new RegExp(`\\[${h}\\s*[^\\]]*\\]`) : new RegExp(`\\[${h}\\s*[^\\]]*\\][\\s\\S]*?\\[\\/${h}\\]`), p = f.match(d), m = p == null ? void 0 : p.index;
        return m !== void 0 ? m : -1;
      },
      tokenize(f, d, p) {
        const m = l ? new RegExp(`^\\[${h}\\s*([^\\]]*)\\]`) : new RegExp(
          `^\\[${h}\\s*([^\\]]*)\\]([\\s\\S]*?)\\[\\/${h}\\]`
        ), y = f.match(m);
        if (!y)
          return;
        let x = "", v = "";
        if (l) {
          const [, C] = y;
          v = C;
        } else {
          const [, C, B] = y;
          v = C, x = B || "";
        }
        const b = i(v.trim());
        return {
          type: e,
          raw: y[0],
          content: x.trim(),
          attributes: b
        };
      }
    },
    renderMarkdown: (f) => {
      let d = "";
      r ? d = r(f) : f.content && f.content.length > 0 && (d = f.content.filter((x) => x.type === "text").map((x) => x.text).join(""));
      const p = u(f.attrs || {}), m = o(p), y = m ? ` ${m}` : "";
      return l ? `[${a}${y}]` : `[${a}${y}]${d}[/${a}]`;
    }
  };
}
function xu(n, e, t) {
  var r, i, o, s;
  const l = n.split(`
`), c = [];
  let a = "", u = 0;
  const h = e.baseIndentSize || 2;
  for (; u < l.length; ) {
    const f = l[u], d = f.match(e.itemPattern);
    if (!d) {
      if (c.length > 0)
        break;
      if (f.trim() === "") {
        u += 1, a = `${a}${f}
`;
        continue;
      } else
        return;
    }
    const p = e.extractItemData(d), { indentLevel: m, mainContent: y } = p;
    a = `${a}${f}
`;
    const x = [y];
    for (u += 1; u < l.length; ) {
      const B = l[u];
      if (B.trim() === "") {
        const E = l.slice(u + 1).findIndex((U) => U.trim() !== "");
        if (E === -1)
          break;
        if ((((i = (r = l[u + 1 + E].match(/^(\s*)/)) == null ? void 0 : r[1]) == null ? void 0 : i.length) || 0) > m) {
          x.push(B), a = `${a}${B}
`, u += 1;
          continue;
        } else
          break;
      }
      if ((((s = (o = B.match(/^(\s*)/)) == null ? void 0 : o[1]) == null ? void 0 : s.length) || 0) > m)
        x.push(B), a = `${a}${B}
`, u += 1;
      else
        break;
    }
    let v;
    const b = x.slice(1);
    if (b.length > 0) {
      const B = b.map((I) => I.slice(m + h)).join(`
`);
      B.trim() && (e.customNestedParser ? v = e.customNestedParser(B) : v = t.blockTokens(B));
    }
    const C = e.createToken(p, v);
    c.push(C);
  }
  if (c.length !== 0)
    return {
      items: c,
      raw: a
    };
}
function wu(n, e, t, r) {
  if (!n || !Array.isArray(n.content))
    return "";
  const i = typeof t == "function" ? t(r) : t, [o, ...s] = n.content, l = e.renderChildren([o]);
  let c = `${i}${l}`;
  return s && s.length > 0 && s.forEach((a, u) => {
    var h, f;
    const d = (f = (h = e.renderChild) == null ? void 0 : h.call(e, a, u + 1)) != null ? f : e.renderChildren([a]);
    if (d != null) {
      const p = d.split(`
`).map((m) => m ? e.indent(m) : e.indent("")).join(`
`);
      c += a.type === "paragraph" ? `

${p}` : `
${p}`;
    }
  }), c;
}
function Go(n, e) {
  const t = { ...n };
  return yn(n) && yn(e) && Object.keys(e).forEach((r) => {
    yn(e[r]) && yn(n[r]) ? t[r] = Go(n[r], e[r]) : t[r] = e[r];
  }), t;
}
var bu = class {
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
      ...ar(
        Zt(this, "addOptions", {
          name: this.name
        })
      )
    };
  }
  get storage() {
    return {
      ...ar(
        Zt(this, "addStorage", {
          name: this.name,
          options: this.options
        })
      )
    };
  }
  configure(n = {}) {
    const e = this.extend({
      ...this.config,
      addOptions: () => Go(this.options, n)
    });
    return e.name = this.name, e.parent = this.parent, this.child = null, e;
  }
  extend(n = {}) {
    const e = new this.constructor({ ...this.config, ...n });
    return e.parent = this, this.child = e, e.name = "name" in n ? n.name : e.parent.name, e;
  }
}, vu = {};
Ir(vu, {
  ClipboardTextSerializer: () => ku,
  Commands: () => Su,
  Delete: () => Cu,
  Drop: () => Eu,
  Editable: () => Tu,
  FocusEvents: () => Mu,
  Keymap: () => Nu,
  Paste: () => Au,
  Tabindex: () => zu,
  TextDirection: () => Ru,
  focusEventsPluginKey: () => Zo
});
var We = class Qo extends bu {
  constructor() {
    super(...arguments), this.type = "extension";
  }
  /**
   * Create a new Extension instance
   * @param config - Extension configuration object or a function that returns a configuration object
   */
  static create(e = {}) {
    const t = typeof e == "function" ? e() : e;
    return new Qo(t);
  }
  configure(e) {
    return super.configure(e);
  }
  extend(e) {
    const t = typeof e == "function" ? e() : e;
    return super.extend(t);
  }
}, ku = We.create({
  name: "clipboardTextSerializer",
  addOptions() {
    return {
      blockSeparator: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new ot({
        key: new Ke("clipboardTextSerializer"),
        props: {
          clipboardTextSerializer: () => {
            const { editor: n } = this, { state: e, schema: t } = n, { doc: r, selection: i } = e, o = Da(t), { blockSeparator: s } = this.options, l = {
              ...s !== void 0 ? { blockSeparator: s } : {},
              textSerializers: o
            };
            return [...i.ranges].sort((a, u) => a.$from.pos - u.$from.pos).map(
              ({ $from: a, $to: u }) => Oa(r, { from: a.pos, to: u.pos }, l)
            ).join(s ?? `

`);
          }
        }
      })
    ];
  }
}), Su = We.create({
  name: "commands",
  addCommands() {
    return {
      ...Lo
    };
  }
}), Cu = We.create({
  name: "delete",
  onUpdate({ transaction: n, appendedTransactions: e }) {
    var t, r, i;
    const o = () => {
      var s, l, c, a;
      if ((a = (c = (l = (s = this.editor.options.coreExtensionOptions) == null ? void 0 : s.delete) == null ? void 0 : l.filterTransaction) == null ? void 0 : c.call(l, n)) != null ? a : n.getMeta("y-sync$"))
        return;
      const u = Ra(n.before, [
        n,
        ...e
      ]);
      Ba(u).forEach((d) => {
        u.mapping.mapResult(d.oldRange.from).deletedAfter && u.mapping.mapResult(d.oldRange.to).deletedBefore && u.before.nodesBetween(
          d.oldRange.from,
          d.oldRange.to,
          (p, m) => {
            const y = m + p.nodeSize - 2, x = d.oldRange.from <= m && y <= d.oldRange.to;
            this.editor.emit("delete", {
              type: "node",
              node: p,
              from: m,
              to: y,
              newFrom: u.mapping.map(m),
              newTo: u.mapping.map(y),
              deletedRange: d.oldRange,
              newRange: d.newRange,
              partial: !x,
              editor: this.editor,
              transaction: n,
              combinedTransform: u
            });
          }
        );
      });
      const f = u.mapping;
      u.steps.forEach((d, p) => {
        var m, y;
        if (d instanceof _e) {
          const x = f.slice(p).map(d.from, -1), v = f.slice(p).map(d.to), b = f.invert().map(x, -1), C = f.invert().map(v), B = x > 0 ? (m = u.doc.nodeAt(x - 1)) == null ? void 0 : m.marks.some((E) => E.eq(d.mark)) : !1, I = (y = u.doc.nodeAt(v)) == null ? void 0 : y.marks.some((E) => E.eq(d.mark));
          this.editor.emit("delete", {
            type: "mark",
            mark: d.mark,
            from: d.from,
            to: d.to,
            deletedRange: {
              from: b,
              to: C
            },
            newRange: {
              from: x,
              to: v
            },
            partial: !!(I || B),
            editor: this.editor,
            transaction: n,
            combinedTransform: u
          });
        }
      });
    };
    (i = (r = (t = this.editor.options.coreExtensionOptions) == null ? void 0 : t.delete) == null ? void 0 : r.async) == null || i ? setTimeout(o, 0) : o();
  }
}), Eu = We.create({
  name: "drop",
  addProseMirrorPlugins() {
    return [
      new ot({
        key: new Ke("tiptapDrop"),
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
}), Tu = We.create({
  name: "editable",
  addProseMirrorPlugins() {
    return [
      new ot({
        key: new Ke("editable"),
        props: {
          editable: () => this.editor.options.editable
        }
      })
    ];
  }
}), Zo = new Ke("focusEvents"), Mu = We.create({
  name: "focusEvents",
  addProseMirrorPlugins() {
    const { editor: n } = this;
    return [
      new ot({
        key: Zo,
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
}), Nu = We.create({
  name: "keymap",
  addKeyboardShortcuts() {
    const n = () => this.editor.commands.first(({ commands: s }) => [
      () => s.undoInputRule(),
      // maybe convert first text block node to default node
      () => s.command(({ tr: l }) => {
        const { selection: c, doc: a } = l, { empty: u, $anchor: h } = c, { pos: f, parent: d } = h, p = h.parent.isTextblock && f > 0 ? l.doc.resolve(f - 1) : h, m = p.parent.type.spec.isolating, y = h.pos - h.parentOffset, x = m && p.parent.childCount === 1 ? y === h.pos : Tt.atStart(a).from === f;
        return !u || !d.type.isTextblock || d.textContent.length || !x || x && h.parent.type.name === "paragraph" ? !1 : s.clearNodes();
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
    return In() || Ko() ? o : i;
  },
  addProseMirrorPlugins() {
    return [
      // With this plugin we check if the whole document was selected and deleted.
      // In this case we will additionally call `clearNodes()` to convert e.g. a heading
      // to a paragraph if necessary.
      // This is an alternative to ProseMirror's `AllSelection`, which doesn’t work well
      // with many other commands.
      new ot({
        key: new Ke("clearDocument"),
        appendTransaction: (n, e, t) => {
          if (n.some((m) => m.getMeta("composition")))
            return;
          const r = n.some((m) => m.docChanged) && !e.doc.eq(t.doc), i = n.some(
            (m) => m.getMeta("preventClearDocument")
          );
          if (!r || i)
            return;
          const { empty: o, from: s, to: l } = e.selection, c = Tt.atStart(e.doc).from, a = Tt.atEnd(e.doc).to;
          if (o || !(s === c && l === a) || !Uo(t.doc))
            return;
          const f = t.tr, d = Po({
            state: t,
            transaction: f
          }), { commands: p } = new Dc({
            editor: this.editor,
            state: d
          });
          if (p.clearNodes(), !!f.steps.length)
            return f;
        }
      })
    ];
  }
}), Au = We.create({
  name: "paste",
  addProseMirrorPlugins() {
    return [
      new ot({
        key: new Ke("tiptapPaste"),
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
}), zu = We.create({
  name: "tabindex",
  addOptions() {
    return {
      value: void 0
    };
  },
  addProseMirrorPlugins() {
    return [
      new ot({
        key: new Ke("tabindex"),
        props: {
          attributes: () => {
            var n;
            return !this.editor.isEditable && this.options.value === void 0 ? {} : { tabindex: (n = this.options.value) != null ? n : "0" };
          }
        }
      })
    ];
  }
}), Ru = We.create({
  name: "textDirection",
  addOptions() {
    return {
      direction: void 0
    };
  },
  addGlobalAttributes() {
    if (!this.options.direction)
      return [];
    const { nodeExtensions: n } = Yo(this.extensions);
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
      new ot({
        key: new Ke("textDirection"),
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
function ur(n) {
  if (n.nodeType === Node.TEXT_NODE) return n;
  if (n.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = n, t = e.tagName.toLowerCase(), r = () => {
    const l = document.createDocumentFragment();
    for (const c of Array.from(e.childNodes)) l.appendChild(ur(c));
    return l;
  };
  if (!Iu.has(t)) return r();
  if (t === "a") {
    const l = e.getAttribute("href") || "";
    if (!Ou.test(l)) return r();
  }
  const i = document.createElement(t), o = e.getAttribute("style"), s = Du(o || "");
  if (s && i.setAttribute("style", s), t === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const l = e.getAttribute("target"), c = e.getAttribute("rel");
    l && i.setAttribute("target", l), c && i.setAttribute("rel", c);
  }
  for (const l of Array.from(e.childNodes)) i.appendChild(ur(l));
  return i;
}
function es(n) {
  return n.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Pu(n) {
  const e = es(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  t.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const s of Array.from(t.content.childNodes)) r.appendChild(ur(s));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Vf(n) {
  const e = es(n);
  if (!e || !e.includes("<")) return e;
  const t = document.createElement("template");
  return t.innerHTML = e, (t.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Yf(n) {
  return n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Lu = { text: "#52525b" }, Bu = ({ node: n, selected: e, extension: t, editor: r, view: i, getPos: o }) => {
  var f;
  const s = n.attrs.field ?? "", l = t.options, c = ((f = l.resolve) == null ? void 0 : f.call(l, s)) ?? null, a = (c == null ? void 0 : c.color) ?? Lu, u = (c == null ? void 0 : c.label) ?? `{{${s}}}`, h = c == null ? void 0 : c.nested;
  return /* @__PURE__ */ g(
    Cs,
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
      onMouseDown: (d) => {
        var x;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof o == "function" ? o() : null;
        if (p == null) return;
        const m = i.state.doc.resolve(p), y = m.nodeAfter;
        y && zt.isSelectable(y) && i.dispatch(i.state.tr.setSelection(new zt(m))), (x = l.onTokenClick) == null || x.call(l, s, d.currentTarget.getBoundingClientRect(), p);
      },
      children: h ? /* @__PURE__ */ g("span", { className: "rt-token-nested", children: u }) : u
    }
  );
};
function Fu(n) {
  return n.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function yi(n) {
  return n.replace(/\{\{([^{}]+)\}\}/g, (e, t) => `<span data-type="token" data-field="${t}">{{${t}}}</span>`);
}
const _u = Ls.extend({
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
    return Ss(Bu);
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
    return ["span", ks({ "data-type": "token" }, e), `{{${n.attrs.field ?? ""}}}`];
  },
  renderText({ node: n }) {
    return `{{${n.attrs.field ?? ""}}}`;
  }
}), Hu = 240, Wu = 280, ju = ({ props: n, onApi: e }) => {
  const t = On(), r = k(e);
  r.current = e, Q(() => {
    r.current(t);
  }, [t]);
  const i = k(null);
  Q(() => {
    var s, l;
    t.pointerDriven || (l = (s = i.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || l.scrollIntoView({ block: "nearest" });
  }, [t.highlightedIndex, t.pointerDriven]), Q(() => {
    n.items.length > 0 && t.highlightedIndex === -1 && t.setHighlighted(0, "keyboard");
  }, [n.items.length, t.highlightedIndex, t]);
  const o = wr();
  return /* @__PURE__ */ g(rn.Provider, { value: t, children: /* @__PURE__ */ g(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Wu, maxHeight: Hu },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ g("div", { ref: i, children: n.items.map((s) => /* @__PURE__ */ g(
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
  const { myIndex: r, highlighted: i, setPointer: o } = Fi({
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
        /* @__PURE__ */ g("span", { className: `${e.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ g("span", { className: "block w-2 h-2 rounded-full", style: { background: n.color.text } }) }),
        /* @__PURE__ */ g("span", { className: "flex-1 truncate", children: n.label }),
        n.group && /* @__PURE__ */ g("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: n.color.text }, children: n.group })
      ]
    }
  );
}, xi = () => {
  let n = null;
  const e = (t) => {
    n && (n.props = t, n.holder.style.display = t.items.length > 0 ? "" : "none", n.root.render(
      /* @__PURE__ */ g(ju, { props: t, onApi: (r) => {
        n.api = r;
      } })
    ));
  };
  return {
    onStart(t) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const i = Bs(r);
      n = { holder: r, root: i, unmount: null, props: t, api: null };
      const o = t.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: s, y: l, placement: c, strategy: a }) => {
          var f, d;
          if (!n) return;
          const u = (d = (f = n.props) == null ? void 0 : f.clientRect) == null ? void 0 : d.call(f), h = u && !c.endsWith("-end") ? u.width : 0;
          r.style.position = a, r.style.left = `${s + h}px`, r.style.top = `${l}px`;
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
        const l = o.highlightedIndex, c = s === "ArrowDown" ? 1 : -1;
        return o.setHighlighted((l + c + r.length) % r.length, "keyboard"), !0;
      }
      if (s === "Enter" || s === "Tab") {
        t.preventDefault();
        const l = o.highlightedIndex, c = l >= 0 ? l : 0, a = o.items[c];
        return a ? a.activate() : r[c] && i({ field: r[c].key }), !0;
      }
      return !1;
    },
    onExit() {
      var t;
      n && ((t = n.unmount) == null || t.call(n), n.root.unmount(), n.holder.remove(), n = null);
    }
  };
}, Uf = {
  bold: !1,
  italic: !1,
  underline: !1,
  strike: !1,
  link: !1,
  color: "",
  fontFamily: "",
  fontSize: "",
  hasSelection: !1,
  fontFamilyMixed: !1,
  fontSizeMixed: !1
};
function ts(n, e) {
  const t = n.state.doc.resolve(e).nodeBefore;
  return t && t.type.name === "token" ? t.attrs.field ?? "" : null;
}
function qu(n) {
  const e = n.state.selection.$from, t = e.nodeBefore;
  if (!(t != null && t.isText)) return null;
  const r = t.text || "", i = r.lastIndexOf(".");
  if (i < 0) return null;
  const o = e.pos - r.length + i, s = ts(n, o);
  return s == null ? null : { chipKey: s, dotPos: o };
}
const Ku = mt.forwardRef(({
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
}, h) => {
  const f = k(s);
  f.current = s;
  const d = k(l);
  d.current = l;
  const p = k(c);
  p.current = c;
  const m = k(a);
  m.current = a;
  const y = k(u);
  y.current = u;
  const x = k(null), v = k(null), b = k(e);
  b.current = e;
  const C = k(r);
  C.current = r;
  const B = k(o);
  B.current = o;
  const I = k(null), E = (W) => {
    var be;
    const z = W.getAttributes("textStyle"), { from: O, to: P, empty: j } = W.state.selection;
    let te = !1, se = !1;
    if (!j) {
      const H = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Set();
      W.state.doc.nodesBetween(O, P, (q) => {
        if (!q.isText) return;
        const S = q.marks.find((Z) => Z.type.name === "textStyle");
        H.add((S == null ? void 0 : S.attrs.fontFamily) || ""), G.add((S == null ? void 0 : S.attrs.fontSize) || "");
      }), te = H.size > 1, se = G.size > 1;
    }
    const le = {
      bold: W.isActive("bold"),
      italic: W.isActive("italic"),
      underline: W.isActive("underline"),
      strike: W.isActive("strike"),
      link: W.isActive("link"),
      color: z.color || "",
      fontFamily: z.fontFamily || "",
      fontSize: z.fontSize || "",
      hasSelection: !j,
      fontFamilyMixed: te,
      fontSizeMixed: se
    }, X = I.current;
    X && X.bold === le.bold && X.italic === le.italic && X.underline === le.underline && X.strike === le.strike && X.link === le.link && X.color === le.color && X.fontFamily === le.fontFamily && X.fontSize === le.fontSize && X.hasSelection === le.hasSelection && X.fontFamilyMixed === le.fontFamilyMixed && X.fontSizeMixed === le.fontSizeMixed || (I.current = le, (be = B.current) == null || be.call(B, le));
  }, D = (W) => {
    var te;
    const z = W.state.selection;
    let O = null;
    z instanceof zt && z.node.type.name === "token" ? (O = { key: z.node.attrs.field ?? "", pos: z.from }, x.current = z.from) : x.current != null && (x.current = W.state.tr.mapping.map(x.current));
    const P = v.current, j = P && O && P.key === O.key && P.pos === O.pos;
    !P && !O || j || (v.current = O, (te = y.current) == null || te.call(y, O));
  }, T = (W) => {
    const z = Pu(Fu(W));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, U = mt.useMemo(() => {
    const W = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: P }) => {
        var j;
        return ((j = d.current) == null ? void 0 : j.call(d, P)) ?? [];
      },
      command: ({ editor: P, range: j, props: te }) => {
        P.chain().focus().insertContentAt(j, { type: "token", attrs: { field: te.field } }).run();
      },
      render: xi
    }, z = _u.configure({
      resolve: f.current ?? null,
      suggestion: W,
      onTokenClick: (P, j, te) => {
        var se;
        x.current = te, (se = m.current) == null || se.call(m, P, j, te);
      }
    }), O = We.create({
      name: "tokenAttributeSuggestion",
      addProseMirrorPlugins() {
        return [
          Ps({
            pluginKey: new Ke("tokenAttributeSuggestion"),
            editor: this.editor,
            char: ".",
            // The gate is `shouldShow` (a chip must sit immediately before the
            // dot), not the prefix rule — the prefix here is an atom, not text.
            allowedPrefixes: null,
            decorationClass: "suggestion-attr",
            shouldShow: ({ editor: P, range: j }) => ts(P, j.from) != null,
            items: ({ editor: P, query: j }) => {
              var se;
              const te = qu(P);
              return te ? ((se = p.current) == null ? void 0 : se.call(p, te.chipKey, j)) ?? [] : [];
            },
            command: ({ editor: P, range: j, props: te }) => {
              P.chain().focus().insertContentAt(j, { type: "token", attrs: { field: te.field } }).run();
            },
            render: xi
          })
        ];
      }
    });
    return [z, O];
  }, []), N = Es({
    immediatelyRender: !1,
    extensions: [
      Ns,
      As.configure({ placeholder: t }),
      zs,
      Rs,
      Is,
      $s,
      Ds,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Os.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      ...U
    ],
    content: yi(n || ""),
    editable: !r,
    onUpdate: ({ editor: W }) => {
      b.current(T(W.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: W }) => {
      E(W), D(W);
    }
  });
  return Q(() => {
    if (!N || N.isFocused) return;
    T(N.getHTML()) !== n && (I.current = null, N.commands.setContent(yi(n || ""), { emitUpdate: !1 }), E(N));
  }, [n, N]), Q(() => {
    N && N.setEditable(!r);
  }, [r, N]), Q(() => {
    N && (I.current = null, E(N), D(N));
  }, [N]), ls(h, () => ({
    exec: (W, z) => {
      if (!(!N || C.current))
        switch (W) {
          case "bold":
            N.chain().focus().toggleBold().run();
            break;
          case "italic":
            N.chain().focus().toggleItalic().run();
            break;
          case "underline":
            N.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            N.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            z && N.chain().focus().setColor(z).run();
            break;
          case "unsetColor":
            N.chain().focus().unsetColor().run();
            break;
          case "fontFamily":
            z && N.chain().focus().setFontFamily(z).run();
            break;
          case "unsetFontFamily":
            N.chain().focus().unsetFontFamily().run();
            break;
          case "fontSize":
            z && N.chain().focus().setFontSize(z).run();
            break;
          case "unsetFontSize":
            N.chain().focus().unsetFontSize().run();
            break;
          // Clear every inline mark (bold/italic/underline/strike/color/font/
          // link) and normalize the block — the cell-chrome Reset path.
          case "clearFormatting":
            N.chain().focus().unsetAllMarks().clearNodes().run();
            break;
          case "link":
            z && N.chain().focus().extendMarkRange("link").setLink({ href: z }).run();
            break;
          case "unlink":
            N.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => N == null ? void 0 : N.commands.focus(),
    insertToken: (W) => {
      !N || C.current || N.chain().focus().insertContent({ type: "token", attrs: { field: W } }).run();
    },
    replaceToken: (W) => {
      if (!N || C.current) return;
      const z = x.current;
      z != null && N.commands.command(({ tr: O }) => {
        const P = O.doc.nodeAt(z);
        if (!P || P.type.name !== "token") return !1;
        O.setNodeMarkup(z, void 0, { field: W });
        const j = O.doc.resolve(z);
        return j.nodeAfter && j.nodeAfter.type.name === "token" && O.setSelection(new zt(j)), !0;
      });
    }
  }), [N]), /* @__PURE__ */ g(Ts, { editor: N, className: `richtext-editor ${i || ""}` });
});
Ku.displayName = "RichTextEditor";
const Vu = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Yu = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], wi = ({ className: n = "w-3 h-3" }) => /* @__PURE__ */ g("span", { className: `${n} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ g("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Uu = ({ value: n, disabled: e, onChange: t, mixed: r }) => {
  const [i, o] = Y(!1), s = Lt();
  return /* @__PURE__ */ g(
    Dn,
    {
      open: i,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ R(Je, { theme: "dark", disabled: e, style: s.control, className: "justify-between min-w-0", children: [
        r ? /* @__PURE__ */ g("span", { className: "truncate italic text-zinc-400", children: "Mixed" }) : /* @__PURE__ */ g("span", { className: "truncate", style: { fontFamily: n || "Helvetica" }, children: n || "Helvetica" }),
        /* @__PURE__ */ g(fr, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Vu.map((l) => /* @__PURE__ */ g(Gs, { onClick: () => {
        t(l), o(!1);
      }, icon: !r && l === n ? /* @__PURE__ */ g(vi, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ g("span", { style: { fontFamily: l }, children: l }) }, l))
    }
  );
}, Xu = ({ value: n, disabled: e, mixed: t, onChange: r }) => {
  const i = Lt(), [o, s] = Y(n), [l, c] = Y(!1), a = () => {
    const u = o.trim();
    u !== n && r(u);
  };
  return /* @__PURE__ */ g(
    "input",
    {
      type: "text",
      inputMode: "decimal",
      title: "Font size (e.g. 12pt)",
      "aria-label": "Font size",
      disabled: e,
      value: l ? o : t ? "" : n,
      placeholder: t ? "Mixed" : "",
      onFocus: () => {
        s(n), c(!0);
      },
      onBlur: () => {
        c(!1), a();
      },
      onChange: (u) => s(u.target.value),
      onKeyDown: (u) => {
        u.key === "Enter" && (u.preventDefault(), u.target.blur()), u.key === "Escape" && (s(n), u.target.blur());
      },
      style: i.input,
      className: Ji + " w-12 text-center"
    }
  );
}, Gu = ({ editorRef: n, disabled: e, active: t }) => {
  const [r, i] = Y(!1), o = Lt(), [s, l] = Y(""), c = () => {
    var u;
    const a = s.trim();
    a && ((u = n.current) == null || u.exec("link", a), i(!1));
  };
  return /* @__PURE__ */ g(
    Dn,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ g(
        Je,
        {
          theme: "dark",
          active: t,
          disabled: e,
          onMouseDown: (a) => a.preventDefault(),
          style: { ...o.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ g(ys, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ R("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: Ji + " w-full"
          }
        ),
        /* @__PURE__ */ R("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ g(Je, { theme: "dark", onClick: c, style: o.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ g(
            Je,
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
}, Xf = ({ editorRef: n, disabled: e, active: t, lockedFormatting: r, trailing: i, font: o, fontSize: s, showClearFormatting: l }) => {
  const [c, a] = Y(!1), u = (d, p) => {
    var m;
    return (m = n.current) == null ? void 0 : m.exec(d, p);
  }, h = Lt(), f = (d) => !!(r != null && r[d]);
  return /* @__PURE__ */ R("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ g(St, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ g(Je, { theme: "dark", "aria-label": "Bold", active: ((t == null ? void 0 : t.bold) ?? !1) || f("bold"), disabled: e || f("bold"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("bold"), style: { ...h.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
    /* @__PURE__ */ g(St, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ g(Je, { theme: "dark", "aria-label": "Italic", active: ((t == null ? void 0 : t.italic) ?? !1) || f("italic"), disabled: e || f("italic"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("italic"), style: { ...h.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
    /* @__PURE__ */ g(St, { content: "Underline", children: /* @__PURE__ */ g(Je, { theme: "dark", "aria-label": "Underline", active: (t == null ? void 0 : t.underline) ?? !1, disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("underline"), style: { ...h.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ g(ps, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ g(St, { content: "Strikethrough", children: /* @__PURE__ */ g(Je, { theme: "dark", "aria-label": "Strikethrough", active: (t == null ? void 0 : t.strike) ?? !1, disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("strikeThrough"), style: { ...h.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ g(ms, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ g("div", { className: Wt }),
    /* @__PURE__ */ g(Gu, { editorRef: n, disabled: e, active: (t == null ? void 0 : t.link) ?? !1 }),
    /* @__PURE__ */ g("div", { className: Wt }),
    /* @__PURE__ */ g(
      Dn,
      {
        open: c,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ R(Je, { theme: "dark", disabled: e, style: h.control, className: "justify-between min-w-0", title: "Text color", children: [
          t != null && t.color ? /* @__PURE__ */ g("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: t.color } }) : /* @__PURE__ */ g(wi, {}),
          /* @__PURE__ */ g(fr, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ R("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ g(
            "button",
            {
              onClick: () => {
                u("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${t != null && t.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ g(wi, { className: "w-3.5 h-3.5" })
            }
          ),
          Yu.map((d) => /* @__PURE__ */ g(
            "button",
            {
              onClick: () => {
                u("foreColor", d), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${d === (t == null ? void 0 : t.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: d },
              title: d
            },
            d
          ))
        ] })
      }
    ),
    (o || s || l) && /* @__PURE__ */ R(Ue, { children: [
      /* @__PURE__ */ g("div", { className: Wt }),
      o && /* @__PURE__ */ g(Uu, { value: o.value || "Helvetica", mixed: o.mixed, disabled: e, onChange: o.onChange }),
      s && /* @__PURE__ */ g(Xu, { value: s.value, mixed: s.mixed, disabled: e, onChange: s.onChange }),
      l && /* @__PURE__ */ g(St, { content: "Clear formatting", children: /* @__PURE__ */ g(
        Je,
        {
          theme: "dark",
          "aria-label": "Clear formatting",
          disabled: e,
          onMouseDown: (d) => d.preventDefault(),
          onClick: () => u("clearFormatting"),
          style: { ...h.toggle, padding: 0 },
          className: "justify-center",
          children: /* @__PURE__ */ g(gs, { className: "w-3 h-3" })
        }
      ) })
    ] }),
    i && /* @__PURE__ */ R(Ue, { children: [
      /* @__PURE__ */ g("div", { className: Wt }),
      i
    ] })
  ] });
};
function Gf({ title: n, icon: e, count: t, tone: r = "default", collapsed: i, onToggle: o, trailing: s, bodyClass: l, className: c = "", dataProps: a, children: u }) {
  const h = ke(), f = dt({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), d = A(14, 16, h), p = { width: d, height: d }, m = A(10, 12, h);
  return /* @__PURE__ */ R("div", { ...a, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ R("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: f, children: [
      /* @__PURE__ */ R(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            i ? /* @__PURE__ */ g(Sn, { className: "text-zinc-400 shrink-0", style: p }) : /* @__PURE__ */ g(fr, { className: "text-zinc-400 shrink-0", style: p }),
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
  Je as Button,
  Gf as CardSection,
  Wi as CheckMark,
  il as Checkbox,
  $f as Checklist,
  qf as ChromeHeader,
  Jf as ContentRow,
  vf as ContextMenu,
  Sf as ContextMenuDivider,
  kf as ContextMenuItem,
  Cf as ContextMenuSub,
  $i as DROPDOWN_MAX_HEIGHT,
  If as DatePicker,
  Nf as DialogProvider,
  Gs as DropdownItem,
  Dn as DropdownMenu,
  Qs as DropdownSubmenu,
  xr as DropdownThemeContext,
  Vu as FONTS,
  Df as FloatingChrome,
  Uu as FontMenu,
  Xf as FormatToolbar,
  Ee as IS_COARSE,
  _s as IS_TOUCH_CAPABLE,
  bf as ItemManagerDropdown,
  zf as LongPressMenuProvider,
  pr as MORPH_EASE,
  Rt as MORPH_MS,
  mr as MORPH_OPACITY_MS,
  rn as MenuHighlightContext,
  Bi as MenuSearchContext,
  el as Modal,
  Ef as ModalFooter,
  un as ModalFooterButton,
  Fs as PopoutWindowContext,
  Uf as RICH_TEXT_STATE_IDLE,
  Of as RadioList,
  Ku as RichTextEditor,
  jf as SectionHeader,
  Wf as Seg,
  Kf as StructureControls,
  br as SubmenuContext,
  gl as TB_BTN,
  fn as TB_BTN_ICON,
  yl as TB_DANGER,
  Wt as TB_DIVIDER,
  Ji as TB_INPUT,
  _f as TB_NUM,
  Hf as TB_PICKER,
  Pf as TB_ROW_LABEL,
  xl as TB_SEG,
  Lf as TB_TOGGLE,
  Ff as TB_TOGGLE_OFF,
  Bf as TB_TOGGLE_ON,
  _u as Token,
  Bu as TokenChipView,
  dn as ToolButton,
  St as Tooltip,
  gr as ZOOM_FROM,
  Js as cloneOverlayClose,
  A as coarsePx,
  Yf as escapeHtml,
  Ni as getCoarseScale,
  wr as getDropdownClasses,
  xf as getHardwareKeyboard,
  yf as getLastPointerType,
  Tf as inputCls,
  fl as isInteractiveElement,
  tr as isTouchLike,
  Ri as nearestOverlayOrigin,
  es as normalizeSpaces,
  Wn as overlayMorphEnabled,
  js as playOverlayClose,
  Ws as playOverlayOpen,
  yi as preprocessTokenHtml,
  Pu as sanitizeRichText,
  mf as setCoarseScale,
  Vf as stripRichText,
  Fu as stripTokenWrappers,
  gf as useCoarse,
  ke as useCoarseScale,
  dt as useCoarseSize,
  Mi as useCurrentDocument,
  tn as useCurrentWindow,
  Mf as useDialog,
  Ks as useDropdownPosition,
  Di as useDropdownTheme,
  wf as useHardwareKeyboard,
  ol as useInputSize,
  Pi as useItemSize,
  Hs as useLastPointerType,
  Af as useLongPressOptOut,
  vr as useMenuHighlight,
  Us as useMenuSearch,
  yr as useOverlayMorph,
  hr as usePopoutWindow,
  en as usePortalTarget,
  Rf as useTouchMode
};
