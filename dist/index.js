"use client";
import { jsxs as S, jsx as i, Fragment as Oe } from "react/jsx-runtime";
import We, { createContext as Ze, useContext as Je, useState as K, useEffect as Y, useRef as y, useCallback as G, useLayoutEffect as Ee, useMemo as st, useImperativeHandle as Bn } from "react";
import * as ee from "@radix-ui/react-dropdown-menu";
import { Search as Fn, X as kt, Check as pn, Pencil as Kn, Copy as gn, Trash2 as Mt, RotateCcw as bn, Plus as Yn, ChevronRight as zt, ChevronLeft as Wn, ArrowUp as qn, ArrowDown as jn, ChevronDown as Ht, Underline as Un, Strikethrough as Vn, Link as Xn } from "lucide-react";
import * as Pe from "@radix-ui/react-dialog";
import { createPortal as Bt } from "react-dom";
import { useFloating as Gn, autoUpdate as Qn, offset as Zn, flip as Jn, shift as er } from "@floating-ui/react-dom";
import { mergeAttributes as tr, ReactNodeViewRenderer as nr, NodeViewWrapper as rr, useEditor as ir, EditorContent as or } from "@tiptap/react";
import { NodeSelection as Nt } from "@tiptap/pm/state";
import sr from "@tiptap/starter-kit";
import cr from "@tiptap/extension-placeholder";
import { TextStyle as lr } from "@tiptap/extension-text-style";
import ar from "@tiptap/extension-color";
import ur from "@tiptap/extension-link";
import dr from "@tiptap/extension-underline";
import { Mention as fr } from "@tiptap/extension-mention";
import { createRoot as hr } from "react-dom/client";
const mr = Ze(null);
function Ft() {
  return Je(mr);
}
function at() {
  const e = Ft();
  return e ? e.document.body : null;
}
function yn() {
  const e = Ft();
  return e ? e.document : typeof document < "u" ? document : null;
}
function et() {
  return Ft() ?? (typeof window < "u" ? window : null);
}
const ut = typeof window < "u", me = ut && window.matchMedia("(pointer: coarse)").matches, pr = ut && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let Et = 0.5;
const ct = /* @__PURE__ */ new Set();
function Ri(e) {
  Et = Math.max(0, Math.min(1, e)), ct.forEach((t) => t());
}
function xn() {
  return Et;
}
function Ci() {
  const [, e] = K(0);
  return Y(() => {
    const t = () => e((n) => n + 1);
    return ct.add(t), () => {
      ct.delete(t);
    };
  }, []), me && Et > 0;
}
function fe() {
  const [, e] = K(0);
  return Y(() => {
    const t = () => e((n) => n + 1);
    return ct.add(t), () => {
      ct.delete(t);
    };
  }, []), Et;
}
function k(e, t, n) {
  return me ? Math.round(e + (t - e) * n) : e;
}
function Ye(e, t) {
  const n = fe();
  return me && n > 0 ? {
    padding: `${k(e.py, t.py, n)}px ${k(e.px, t.px, n)}px`,
    fontSize: `${k(e.fs, t.fs, n)}px`
  } : { padding: `${e.py}px ${e.px}px`, fontSize: `${e.fs}px` };
}
function Pt(e) {
  return e === "touch" || e === "pen";
}
let Ge = null;
const It = /* @__PURE__ */ new Set();
ut && window.addEventListener("pointerdown", (e) => {
  Ge = e.pointerType, It.forEach((t) => t());
}, !0);
function Di() {
  return Ge;
}
function gr() {
  const [, e] = K(0), t = y(Ge);
  return Y(() => {
    const n = () => {
      t.current !== Ge && (t.current = Ge, e((r) => r + 1));
    };
    return It.add(n), () => {
      It.delete(n);
    };
  }, []), Ge;
}
const vn = ["(any-hover: hover)", "(any-pointer: fine)"];
function wn() {
  return ut ? vn.some((e) => window.matchMedia(e).matches) : !1;
}
let $t = wn();
const Ot = /* @__PURE__ */ new Set();
function cn(e) {
  $t !== e && ($t = e, Ot.forEach((t) => t()));
}
var mn;
if (ut) {
  const e = () => cn(wn());
  for (const o of vn) {
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
  const l = "__penClick", c = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (o) => {
    o.pointerType !== "pen" || o.button !== 0 || (n = { x: o.clientX, y: o.clientY });
  }, !0), window.addEventListener("pointerup", (o) => {
    if (o.pointerType !== "pen") return;
    const d = n;
    if (n = null, !d || Math.hypot(o.clientX - d.x, o.clientY - d.y) > 8) return;
    const u = o.target;
    if (!u || !u.isConnected) return;
    if (u instanceof HTMLInputElement && c.has(u.type)) {
      try {
        u.showPicker();
      } catch {
      }
      return;
    }
    const f = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    f[l] = !0, r = { x: o.clientX, y: o.clientY, time: Date.now() }, u.dispatchEvent(f);
  }, !0), window.addEventListener("click", (o) => {
    o[l] || r && Date.now() - r.time < 1e3 && Math.hypot(o.clientX - r.x, o.clientY - r.y) < 12 && (o.preventDefault(), o.stopPropagation());
  }, !0);
}
function Li() {
  return $t;
}
function Ai() {
  const [, e] = K(0);
  return Y(() => {
    const t = () => e((n) => n + 1);
    return Ot.add(t), () => {
      Ot.delete(t);
    };
  }, []), $t;
}
const Qe = 220, Kt = "cubic-bezier(0.32, 0.72, 0, 1)", Yt = 170, Wt = 0.94;
function Ct(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function kn(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function zn(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return kn({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function br(e, t, n, r) {
  const l = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${Wt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === l && requestAnimationFrame(() => {
      if (e.current !== l) return;
      const o = zn(t, n);
      t.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, t.style.transition = `transform ${Qe}ms ${Kt}, opacity ${Yt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === l && (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, r == null || r());
      }, Qe + 60);
    });
  });
}
function yr(e, t, n, r) {
  const l = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, o = zn(t, n);
  t.style.transition = `transform ${Qe}ms ${Kt}, opacity ${Yt}ms ease`, t.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, t.style.transform = `scale(${Wt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === l && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== l || t.isConnected || (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, t.style.pointerEvents = c.pointerEvents, t.style.visibility = c.visibility);
    }));
  }, Qe + 60);
}
function xr(e, t, n) {
  const r = e.cloneNode(!0), l = e.getBoundingClientRect(), c = l.width > 0 || l.height > 0 ? l : n ?? l;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${c.left}px`, r.style.top = `${c.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const o = (t == null ? void 0 : t()) ?? null, d = o ? kn({ left: c.left, top: c.top, width: c.width, height: c.height }, o) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${d.x * 100}% ${d.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Qe}ms ${Kt}, opacity ${Yt}ms ease`, r.style.transform = `scale(${Wt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Qe + 60));
    });
  });
}
function qt(e) {
  const t = y(null), [n, r] = K(!1), l = y(null), c = y(0), o = G((p) => {
    if (e.ref && (e.ref.current = p), p) {
      c.current = 0, t.current = p;
      const A = p.getBoundingClientRect();
      (A.width > 0 || A.height > 0) && (l.current = { left: A.left, top: A.top, width: A.width, height: A.height }), r(!0);
      return;
    }
    const g = t.current, N = ++c.current;
    queueMicrotask(() => {
      N === c.current && t.current === g && (t.current = null, r(!1), !(!g || !e.cloneOnUnmount || !u.current) && g.style.visibility !== "hidden" && Ct(a.current) && xr(g, s.current, l.current));
    });
  }, []), d = G(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (l.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), u = y(e.visible);
  u.current = e.visible;
  const f = y(e.visible), s = y(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const m = y(e.onClosed);
  m.current = e.onClosed;
  const a = y(e.morph !== !1);
  a.current = e.morph !== !1;
  const b = y(0);
  return Ee(() => {
    if (!n || !u.current || !Ct(a.current)) return;
    const p = t.current;
    p && br(b, p, s.current);
  }, [n, e.visible]), Y(() => {
    if (!n || !u.current) return;
    let p = 0;
    const g = () => {
      p = 0, d(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, d]), Ee(() => {
    var N;
    const p = f.current;
    if (f.current = e.visible, e.visible || !p) return;
    const g = t.current;
    if (!g || !Ct(a.current)) {
      (N = m.current) == null || N.call(m);
      return;
    }
    yr(b, g, s.current, () => {
      var A;
      return (A = m.current) == null ? void 0 : A.call(m);
    });
  }, [e.visible]), Y(() => {
    if (!n || !u.current) return;
    const p = (g) => {
      const N = t.current;
      N && N.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), Y(() => {
    if (!n || !u.current) return;
    const p = (g) => {
      const N = t.current;
      N && N.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), o;
}
function Nn(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Mi(e, t) {
  const n = et(), r = y(n);
  r.current = n;
  const l = () => {
    if (!t || !e.current) return;
    const c = e.current.querySelector(".absolute");
    if (!c) return;
    c.style.left = "", c.style.right = "", c.style.top = "", c.style.bottom = "", c.style.maxHeight = "";
    const o = r.current;
    if (!o) return;
    const d = e.current.getBoundingClientRect(), u = c.getBoundingClientRect(), f = o.innerWidth, s = Nn(o), m = u.right - f;
    if (m > 0) {
      const a = Math.min(m + 8, u.left);
      c.style.left = `${u.left - d.left - a}px`;
    }
    u.left < 0 && (c.style.left = `${-d.left + 4}px`), u.bottom > s.bottom + 4 && (c.style.top = "auto", c.style.bottom = "100%", c.getBoundingClientRect().top < s.top && (c.style.bottom = "auto", c.style.top = `${-d.top + s.top + 4}px`, c.style.maxHeight = `${s.height - 8}px`));
  };
  Ee(() => {
    if (l(), !t) return;
    const c = r.current, o = (c == null ? void 0 : c.visualViewport) ?? null;
    return o == null || o.addEventListener("resize", l), o == null || o.addEventListener("scroll", l), c == null || c.addEventListener("resize", l), () => {
      o == null || o.removeEventListener("resize", l), o == null || o.removeEventListener("scroll", l), c == null || c.removeEventListener("resize", l);
    };
  }, [t, e]);
}
function vr(e, t, n, r) {
  const l = et(), c = y(l);
  c.current = l, Ee(() => {
    if (!t || !e.current) return;
    const o = e.current;
    let d = 0;
    const u = () => {
      d = 0;
      const b = o.getBoundingClientRect(), p = c.current;
      if (!p) return;
      const g = p.innerWidth, N = Nn(p), A = (r == null ? void 0 : r.panelWidth) ?? Math.max(b.width, 200), z = 4, v = 120;
      let T = Math.max(0, b.left);
      T + A > g && (T = Math.max(0, g - A - 8));
      const U = N.bottom - b.bottom - z - 16, H = b.top - N.top - z - 16;
      if (U >= v || U >= H) {
        const $ = Math.min(b.bottom + z, Math.max(N.top, N.bottom - 40)), B = Math.max(32, N.bottom - $ - 16);
        n({ top: $, left: T, width: b.width, maxH: B });
      } else {
        const $ = Math.max(32, Math.min(H, 360)), B = N.bottom - (b.top - z);
        n({ top: 0, left: T, width: b.width, maxH: $, bottom: Math.max(0, B) });
      }
    }, f = () => {
      d || (d = requestAnimationFrame(u));
    }, s = c.current ?? null, m = (s == null ? void 0 : s.document) ?? null;
    f(), m == null || m.addEventListener("scroll", f, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", f);
    const a = (s == null ? void 0 : s.visualViewport) ?? null;
    return a == null || a.addEventListener("resize", f), a == null || a.addEventListener("scroll", f), () => {
      d && cancelAnimationFrame(d), m == null || m.removeEventListener("scroll", f, { capture: !0 }), s == null || s.removeEventListener("resize", f), a == null || a.removeEventListener("resize", f), a == null || a.removeEventListener("scroll", f);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let Ve = null;
function $n(e) {
  return Ve == null || Ve(), Ve = e, () => {
    Ve === e && (Ve = null);
  };
}
const jt = Ze("dark"), En = () => Je(jt);
function Sn() {
  const e = fe();
  return {
    padding: `${k(8, 12, e)}px ${k(12, 16, e)}px`,
    fontSize: `${k(12, 14, e)}px`,
    lineHeight: `${k(18, 22, e)}px`
  };
}
const wr = (e) => e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", ln = (e) => e ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", kr = (e) => e ? "text-xs" : "text-[10px]";
function Ut(e) {
  const t = me && xn() > 0;
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
    headerText: `${ln(t)} font-semibold uppercase tracking-wider ${kr(t)} ui-label`,
    // Item padding
    itemPad: wr(t),
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
function Tn(e) {
  const t = [];
  return We.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (We.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const Vt = Ze({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), dt = Ze(null), Xt = () => Je(dt), Rn = Ze({ query: "", setQuery: () => {
} }), zr = () => Je(Rn), Nr = () => !0;
function St(e) {
  const t = y([]), [n, r] = K(-1), [l, c] = K(!1), [o, d] = K(0), u = G((a) => (t.current = [...t.current, a], d((b) => b + 1), () => {
    t.current = t.current.filter((b) => b !== a), d((b) => b + 1);
  }), []), f = G((a, b) => {
    r(a), c(b === "pointer");
  }, []), s = G(() => {
    c((a) => a && (r(-1), !1));
  }, []);
  return st(() => ({
    /* A `filter` (the searchable query) narrows the exposed items — hidden
       rows drop out of indexing entirely, so the single highlight, the
       arrows and the typeahead all operate on the VISIBLE set only. */
    items: e ? t.current.filter(e) : t.current,
    highlightedIndex: n,
    pointerDriven: l,
    register: u,
    setHighlighted: f,
    pointerLeave: s
  }), [n, l, o, u, f, s, e]);
}
function Cn(e) {
  const t = Xt(), n = y(t);
  n.current = t;
  const r = y(null);
  Y(() => {
    var u;
    const d = { label: e.label(), activate: e.activate };
    return r.current = d, (u = n.current) == null ? void 0 : u.register(d);
  }, []);
  const l = t && r.current ? t.items.indexOf(r.current) : -1, c = !!t && !e.disabled && l >= 0 && l === t.highlightedIndex;
  return { api: t, myIndex: l, highlighted: c, setPointer: (d) => {
    !e.disabled && t && d >= 0 && t.setHighlighted(d, "pointer");
  } };
}
function Gt(e, t, n, r) {
  const l = y(-1);
  l.current = t.highlightedIndex;
  const c = y(t);
  c.current = t;
  const o = y(e);
  o.current = e;
  const d = y(r);
  d.current = r;
  const u = y({ text: "", time: 0 }), f = y(!1);
  f.current || (f.current = !0, n.current = (s) => {
    var p, g, N, A, z;
    if (!o.current) return;
    const m = s.target;
    if (!!m && !!m.closest("input, textarea, [contenteditable]") && (s.key.length === 1 || s.key === "Enter" || s.key === "Escape")) {
      const v = (g = (p = d.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : g.call(p, s);
      (!!((N = d.current) != null && N.onFieldKey) || c.current.items.length > 0) && (s.stopImmediatePropagation(), v && s.preventDefault());
      return;
    }
    const b = c.current.items;
    if (b.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = s.key === "ArrowDown" ? 1 : -1, T = (l.current + v + b.length) % b.length;
        c.current.setHighlighted(T, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = l.current;
        v >= 0 && v < b.length && b[v].submenu && b[v].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (z = (A = d.current) == null ? void 0 : A.onCloseSub) == null || z.call(A);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = l.current;
        v >= 0 && v < b.length && b[v].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const v = Date.now(), T = (v - u.current.time > 500 ? "" : u.current.text) + s.key.toLowerCase();
        if (u.current = { text: T, time: v }, !T) return;
        const U = l.current + 1;
        for (let H = 0; H < b.length; H++) {
          const $ = (U + H) % b.length;
          if (b[$].label.toLowerCase().startsWith(T)) {
            c.current.setHighlighted($, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Qt(e, t, n, r, l, c, o) {
  const d = y(t);
  d.current = t;
  const u = y(e);
  u.current = e;
  const f = y(l);
  f.current = l;
  const s = y(o == null ? void 0 : o.ignoreFields);
  s.current = o == null ? void 0 : o.ignoreFields;
  const m = y(!1);
  m.current || (m.current = !0, c.current = (a) => {
    if (!u.current || f.current) return;
    const b = r.current;
    if (b && b.contains(a.target)) return;
    if (s.current) {
      const g = a.target;
      if (g && g.closest("input, textarea, [contenteditable]")) return;
    }
    d.current.items.length === 0 || !(a.key === "ArrowDown" || a.key === "ArrowUp" || a.key === "ArrowLeft" || a.key === "ArrowRight" || a.key === "Enter" || a.key === " " || a.key.length === 1 && !a.ctrlKey && !a.metaKey && !a.altKey) || (a.preventDefault(), a.stopImmediatePropagation(), n.current(a));
  });
}
function Zt(e, t) {
  const n = y(e);
  n.current = e;
  const r = y(!1);
  r.current || (r.current = !0, t.current = (l) => {
    if (!n.current) return;
    const c = l.currentTarget, o = c.querySelector("[data-menu-items]") ?? c;
    o.scrollHeight > o.clientHeight && (l.preventDefault(), o.scrollTop += l.deltaY);
  });
}
function Tt({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: l = "left",
  width: c,
  theme: o = "dark",
  children: d,
  morph: u = !0,
  contentClassName: f,
  initialHighlightIndex: s,
  searchable: m = !1,
  searchPlaceholder: a,
  searchFilter: b,
  searchValue: p,
  onSearchValueChange: g
}) {
  const [N, A] = K([]), [z, v] = K(null), T = at(), U = yn(), H = y(null), $ = y(null), B = y(e);
  B.current = e;
  const [x, O] = K(e), [R, F] = K(""), P = m && p !== void 0, W = P ? p : R, oe = P ? g ?? (() => {
  }) : F, [ne, de] = K(!1), he = P && !ne ? "" : W, ye = y(null), J = fe(), ve = {
    padding: `${k(8, 12, J)}px ${k(12, 16, J)}px`,
    fontSize: `${k(12, 14, J)}px`
  }, [M, j] = K(0), _ = m && !P;
  Y(() => {
    var ke;
    if (!_ || !e) return;
    const E = (ke = $.current) == null ? void 0 : ke.querySelector("[data-menu-items]");
    if (!E) return;
    const q = () => j(E.offsetWidth - E.clientWidth);
    q();
    const re = new ResizeObserver(q);
    return re.observe(E), () => re.disconnect();
  }, [e, _, W]);
  const w = st(() => {
    if (!m) return;
    const E = he.trim().toLowerCase();
    return E ? (q) => b ? b(E, q.label) : q.label.toLowerCase().includes(E) : Nr;
  }, [he, m, b]), D = St(w);
  Y(() => {
    if (e)
      return O(!0), P || F(""), de(!1), D.setHighlighted(s ?? -1, "keyboard"), $n(() => {
        n == null || n(!1), t == null || t();
      });
    A([]), de(!1);
  }, [e, s, n, t]), Y(() => {
    if (!e || !U) return;
    const E = (q) => {
      if (q.pointerType !== "touch") return;
      const re = q.target;
      re && ($.current && $.current.contains(re) || H.current && H.current.contains(re) || re instanceof Element && re.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return U.addEventListener("pointerdown", E, { capture: !0 }), () => U.removeEventListener("pointerdown", E, { capture: !0 });
  }, [e, U, n, t]);
  const se = G(() => {
    const E = H.current;
    if (!E) return null;
    const q = E.getBoundingClientRect();
    return { left: q.left, top: q.top, width: q.width, height: q.height };
  }, []), pe = qt({
    visible: e,
    morph: u,
    anchor: se,
    onClosed: () => O(!1)
  }), C = y(() => {
  }), V = y(() => {
  }), te = y(() => {
  }), ae = G((E) => {
    if (E.key === "Enter") {
      const q = D.highlightedIndex, re = D.items[q >= 0 ? q : 0];
      return re == null || re.activate(), !0;
    }
    return E.key === "Escape" ? (n == null || n(!1), t == null || t(), !0) : !1;
  }, [D, n, t]);
  Gt(e && N.length === 0, D, C, { onFieldKey: ae }), Zt(e, V), Qt(e, D, C, $, N.length > 0, te, { ignoreFields: P });
  const Se = y(null), _e = G((E) => {
    var q;
    if (E) {
      E.addEventListener("keydown", C.current, { capture: !0 }), E.addEventListener("wheel", V.current, { passive: !1 });
      const re = E.ownerDocument;
      Se.current = re, re.addEventListener("keydown", te.current, { capture: !0 }), ht(E.offsetWidth), Ce(!0);
    } else
      (q = Se.current) == null || q.removeEventListener("keydown", te.current, { capture: !0 }), Se.current = null, Ce(!1);
    $.current = E, pe(E);
  }, [pe]), [ce, we] = K({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [ge, Ne] = K(0), [xe, Ce] = K(!1), [tt, ht] = K(0);
  Y(() => {
    e && H.current && Ne(H.current.getBoundingClientRect().width);
  }, [e]);
  const mt = st(() => ({ panelWidth: tt || ge || void 0 }), [tt, ge]);
  vr(H, e && xe, (E) => we({ ...E, maxH: Math.min(E.maxH, 384), ready: !0 }), mt), Y(() => {
    var E;
    if (ce.ready && e) {
      if (m) {
        (E = ye.current) == null || E.focus();
        return;
      }
      const q = $.current;
      q && q.ownerDocument.activeElement !== q && !q.contains(q.ownerDocument.activeElement) && q.focus();
    }
  }, [ce.ready, e, m]), Y(() => {
    if (!e || !m) return;
    if (D.items.length === 0) {
      D.highlightedIndex !== -1 && D.setHighlighted(-1, "keyboard");
      return;
    }
    const E = D.highlightedIndex;
    (E < 0 || E >= D.items.length) && D.setHighlighted(0, "keyboard");
  }, [e, W, m, D.items.length]), Ee(() => {
    var q;
    if (!e || D.highlightedIndex < 0) return;
    const E = (q = $.current) == null ? void 0 : q.querySelector(`[data-ei="${D.highlightedIndex}"]`);
    E == null || E.scrollIntoView({ block: "nearest" });
  }, [e, D.highlightedIndex]);
  const nt = G((E) => {
    !E && !B.current || (!E && De.current && (Be.current = !0), n ? n(E) : E || t == null || t());
  }, [n, t]), He = y(x);
  He.current = x;
  const De = y(!1), Be = y(!1), qe = G(() => {
    if (!B.current && He.current) {
      if (Be.current) {
        Be.current = !1, De.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), Fe = We.isValidElement(r) ? r : null, je = Fe ? We.cloneElement(Fe, {
    ref: (E) => {
      H.current = E;
    },
    onPointerDown: () => {
      De.current = !0, Be.current = !1;
    },
    onClick: (E) => {
      var q, re;
      (re = (q = Fe.props).onClick) == null || re.call(q, E), qe();
    },
    /* Combobox mode (externalSearch): the trigger field IS the search box,
       so it also drives the menu's keyboard — arrows move the single
       highlight, Enter activates the highlighted (or first visible) row,
       and a printable key flips the filter live (the committed value was
       just showing the full list until the first keystroke). */
    onKeyDown: (E) => {
      var q, re;
      if ((re = (q = Fe.props).onKeyDown) == null || re.call(q, E), !(!P || !B.current)) {
        if (E.key.length === 1 && !E.ctrlKey && !E.metaKey && !E.altKey)
          de(!0);
        else if (E.key === "ArrowDown" || E.key === "ArrowUp") {
          E.preventDefault();
          const ke = D.items;
          if (ke.length === 0) return;
          const Me = E.key === "ArrowDown" ? 1 : -1, rt = (D.highlightedIndex + Me + ke.length) % ke.length;
          D.setHighlighted(rt, "keyboard");
        } else if (E.key === "Enter") {
          E.preventDefault();
          const ke = D.highlightedIndex, Me = D.items[ke >= 0 ? ke : 0];
          Me == null || Me.activate();
        }
      }
    }
  }) : r, Te = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${_ ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ S(ee.Root, { open: e || x, onOpenChange: nt, modal: !1, children: [
    /* @__PURE__ */ i(ee.Trigger, { asChild: !0, children: je }),
    /* @__PURE__ */ i(ee.Portal, { container: T ?? void 0, children: /* @__PURE__ */ i(jt.Provider, { value: o, children: /* @__PURE__ */ i(Vt.Provider, { value: { chain: N, setChain: A, morph: u, keyboardOpened: z, setKeyboardOpened: v }, children: /* @__PURE__ */ i(dt.Provider, { value: D, children: /* @__PURE__ */ i(Rn.Provider, { value: { query: W, setQuery: oe }, children: /* @__PURE__ */ S(
      ee.Content,
      {
        ref: _e,
        "data-theme": o,
        "data-ui-fixed": !0,
        className: `${Te} ${c || ""} ${f || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: ce.left,
          top: ce.bottom != null ? void 0 : ce.top,
          bottom: ce.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: c ? void 0 : ge || void 0,
          maxHeight: ce.maxH,
          visibility: ce.ready ? "visible" : "hidden"
        },
        onPointerLeave: D.pointerLeave,
        children: [
          _ && /* @__PURE__ */ i("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: M }, children: /* @__PURE__ */ S("div", { className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: ve, children: [
            /* @__PURE__ */ i(Fn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ i(
              "input",
              {
                ref: ye,
                value: W,
                onChange: (E) => oe(E.target.value),
                placeholder: a ?? "Search…",
                className: "flex-1 min-w-0 bg-transparent outline-none text-current placeholder:text-current placeholder:opacity-50 cursor-text"
              }
            ),
            W ? /* @__PURE__ */ i(
              "button",
              {
                type: "button",
                tabIndex: -1,
                "aria-label": "Clear search",
                className: "shrink-0 ui-icon-btn rounded flex items-center justify-center p-1 -m-1",
                onPointerDown: (E) => E.stopPropagation(),
                onClick: () => {
                  var E;
                  oe(""), (E = ye.current) == null || E.focus();
                },
                children: /* @__PURE__ */ i(kt, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ i("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          _ ? /* @__PURE__ */ i("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: d }) : d
        ]
      }
    ) }) }) }) }) })
  ] });
}
function Pi({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: l,
  onRename: c,
  onDuplicate: o,
  onDelete: d,
  onCreate: u,
  onImport: f,
  onExport: s,
  onReset: m,
  onTrash: a,
  closeOnSelect: b,
  readOnly: p = !1,
  theme: g,
  align: N,
  label: A,
  header: z,
  itemLabel: v,
  trigger: T,
  minItems: U = 1,
  itemRender: H,
  morph: $ = !0,
  contentClassName: B
}) {
  const x = Ut(), O = Sn(), [R, F] = K(null), [P, W] = K(""), oe = y(P);
  oe.current = P;
  const ne = y(null), de = y(null);
  Y(() => {
    e && requestAnimationFrame(() => {
      var M, j;
      (j = (M = de.current) == null ? void 0 : M.querySelector('[data-active="1"]')) == null || j.scrollIntoView({ block: "nearest" });
    });
  }, [e]), Y(() => {
    var _;
    if (!e) return;
    const M = (w) => {
      var ae, Se, _e;
      const D = w.target;
      if (D && D.closest("input, textarea, [contenteditable]")) {
        R && D === ne.current && (w.key === "Enter" ? (w.preventDefault(), w.stopImmediatePropagation(), ye()) : w.key === "Escape" && (w.preventDefault(), w.stopImmediatePropagation(), J()));
        return;
      }
      const se = (ae = de.current) == null ? void 0 : ae.closest(".ui-menu");
      if (!se || !se.contains(w.target)) return;
      const pe = se.ownerDocument, C = [...se.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], V = [...se.querySelectorAll('div:last-child > [role="menuitem"]')], te = [...C, ...V];
      if (w.key === "ArrowDown" || w.key === "ArrowUp") {
        w.preventDefault(), w.stopImmediatePropagation();
        const ce = pe.activeElement;
        let we = ce ? te.indexOf(ce) : -1;
        if (we < 0 && ce) {
          const xe = ce.closest("[data-active]"), Ce = xe == null ? void 0 : xe.querySelector('[role="menuitem"]:first-child');
          Ce && (we = C.indexOf(Ce));
        }
        const ge = w.key === "ArrowDown" ? 1 : -1, Ne = we < 0 ? ge === 1 ? 0 : te.length - 1 : (we + ge + te.length) % te.length;
        (Se = te[Ne]) == null || Se.focus({ preventScroll: !0 });
        return;
      }
      if (w.key === "ArrowLeft" || w.key === "ArrowRight") {
        const ce = pe.activeElement, we = ce == null ? void 0 : ce.closest("[data-active]");
        if (!we) return;
        w.preventDefault(), w.stopImmediatePropagation();
        const ge = [...we.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ge.length === 0) return;
        const Ne = ce && we.contains(ce) ? ge.indexOf(ce) : -1, xe = w.key === "ArrowRight" ? 1 : -1, Ce = Ne < 0 ? 0 : (Ne + xe + ge.length) % ge.length;
        (_e = ge[Ce]) == null || _e.focus({ preventScroll: !0 });
        return;
      }
    }, j = ((_ = de.current) == null ? void 0 : _.ownerDocument) ?? null;
    return j == null || j.addEventListener("keydown", M, { capture: !0 }), () => j == null ? void 0 : j.removeEventListener("keydown", M, { capture: !0 });
  }, [e, R]), Y(() => {
    if (!R) return;
    const M = n.find((D) => D.id === R);
    M && !P && W(M.name);
    const j = requestAnimationFrame(() => {
      const D = ne.current;
      D && (D.focus(), D.select());
    });
    let _ = 0;
    const w = window.setInterval(() => {
      const D = ne.current;
      if (_++, !D || _ > 12) {
        clearInterval(w);
        return;
      }
      D.ownerDocument.activeElement !== D && (D.focus(), D.select());
    }, 50);
    return () => {
      cancelAnimationFrame(j), clearInterval(w);
    };
  }, [R]), Y(() => {
    if (R) {
      const M = n.find((j) => j.id === R);
      M && !P && W(M.name);
    }
  }, [R, n]);
  const he = (M, j) => {
    F(M), W(j);
  }, ye = () => {
    R && oe.current.trim() && c(R, oe.current.trim()), F(null);
  }, J = () => {
    F(null);
  }, ve = v || z.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ S(Tt, { open: e, onOpenChange: (M) => {
    M ? (F(null), W("")) : (R && P.trim() && c(R, P.trim()), F(null), W("")), (!M || !p) && t(M);
  }, width: "w-80", theme: g, align: N, trigger: T, morph: $, contentClassName: B, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${x.headerText}`, children: z }),
    /* @__PURE__ */ i("div", { ref: de, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((M) => {
      const j = M.id === r, _ = R === M.id;
      return /* @__PURE__ */ i("div", { "data-active": j ? "1" : void 0, className: `scroll-my-4 flex items-center gap-1 rounded ${j || _ ? x.rowActiveBg : x.rowHoverBg} ${R && !_ ? "opacity-40 pointer-events-none" : ""}`, children: _ ? /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ i(
          "input",
          {
            ref: ne,
            autoFocus: !0,
            value: P,
            onChange: (w) => W(w.target.value),
            onKeyDown: (w) => {
              w.key === "Enter" && (w.preventDefault(), w.stopPropagation(), ye()), w.key === "Escape" && (w.preventDefault(), w.stopPropagation(), J());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: O
          }
        ) }),
        /* @__PURE__ */ i(
          ee.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${x.editConfirm}`,
            onSelect: (w) => {
              w.preventDefault(), ye();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(pn, { className: x.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          ee.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${x.editCancel}`,
            onSelect: (w) => {
              w.preventDefault(), J();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(kt, { className: x.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i(
          ee.Item,
          {
            style: O,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${x.rowText} ${j ? "" : x.rowTextHover}`,
            onSelect: b ? () => {
              l(M.id);
            } : (w) => {
              w.preventDefault(), l(M.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${j ? x.rowActiveText : ""}`, children: H ? H(M) : M.name })
          }
        ),
        /* @__PURE__ */ i(
          ee.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${j ? x.btnActive : x.btnBase}`,
            onSelect: (w) => {
              w.preventDefault(), he(M.id, M.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(Kn, { className: x.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          ee.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${j ? x.btnActive : x.btnBase}`,
            onSelect: (w) => {
              w.preventDefault();
              const D = o(M.id);
              D && he(D, `${M.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(gn, { className: x.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          ee.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= U ? x.btnDisabled : j ? x.btnDangerActive : x.btnDanger}`,
            onSelect: (w) => {
              w.preventDefault(), d(M.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= U,
            children: /* @__PURE__ */ i(Mt, { className: x.btnIcon })
          }
        )
      ] }) }, M.id);
    }) }),
    /* @__PURE__ */ S("div", { className: `shrink-0 ${R ? "opacity-40 pointer-events-none" : ""}`, children: [
      m && /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i(ee.Separator, { className: x.separator }),
        /* @__PURE__ */ S(
          ee.Item,
          {
            className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
            onSelect: (M) => {
              M.preventDefault(), m();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ i(bn, { className: `${x.btnIcon} ${x.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (u || f || s || a) && /* @__PURE__ */ i(ee.Separator, { className: x.separator }),
      u && /* @__PURE__ */ S(
        ee.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault();
            const j = u();
            j && he(j, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(Yn, { className: `${x.btnIcon} ${x.icon}` }),
            "New ",
            ve
          ]
        }
      ),
      f && /* @__PURE__ */ S(
        ee.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ S("svg", { className: `${x.btnIcon} ${x.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ S(
        ee.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ S("svg", { className: `${x.btnIcon} ${x.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      a && /* @__PURE__ */ S(
        ee.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(Mt, { className: `${x.btnIcon} ${x.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function $r({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: l = "",
  children: c,
  keepOpen: o = !1,
  selected: d = !1,
  rightAction: u,
  trailing: f
}) {
  En();
  const s = Ut(), m = Sn(), a = y(!1), b = y(null), { myIndex: p, highlighted: g, setPointer: N } = Cn({
    label: () => Tn(c),
    activate: () => {
      n || e();
    },
    disabled: n
  }), { query: A } = zr(), z = A.trim() !== "" && p < 0, v = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ S(
    ee.Item,
    {
      ref: b,
      "data-ei": p >= 0 ? p : void 0,
      style: { ...m, display: z ? "none" : void 0 },
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${v} ${d ? "ui-item-selected" : ""} ${g ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${l}`,
      onSelect: (T) => {
        if (a.current) {
          a.current = !1;
          return;
        }
        o && T.preventDefault(), e();
      },
      onPointerEnter: () => {
        N(p);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: c }),
        f && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: f }),
        u && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: u.title,
            onPointerDown: (T) => {
              T.stopPropagation(), T.preventDefault(), a.current = !0, u.onClick();
            },
            onClick: (T) => {
              T.stopPropagation(), T.preventDefault();
            },
            children: u.icon
          }
        )
      ]
    }
  );
}
function Er({ id: e, label: t, icon: n, width: r, side: l = "right", children: c, contentClassName: o }) {
  const { chain: d, setChain: u, morph: f, keyboardOpened: s, setKeyboardOpened: m } = Je(Vt), a = d.includes(e), b = d[d.length - 1] === e, p = En(), g = at(), N = y(null), A = y(null), [z, v] = K(a), T = !a && z;
  Y(() => {
    a && v(!0);
  }, [a]);
  const U = () => u((_) => {
    const w = _.indexOf(e);
    return w >= 0 ? _.slice(0, w) : _;
  }), H = St(), $ = Xt(), B = y($);
  B.current = $;
  const x = y(null);
  Y(() => {
    var w;
    const _ = {
      label: t,
      activate: () => {
        m(e), u((D) => D.includes(e) ? D : [...D, e]);
      },
      submenu: !0
    };
    return x.current = _, (w = B.current) == null ? void 0 : w.register(_);
  }, []);
  const O = $ && x.current ? $.items.indexOf(x.current) : -1, R = O >= 0 && O === $.highlightedIndex, F = G(() => {
    const _ = N.current;
    if (!_) return null;
    const w = _.getBoundingClientRect();
    return { left: w.left, top: w.top, width: w.width, height: w.height };
  }, []), P = qt({
    visible: a,
    morph: f,
    anchor: F,
    onClosed: () => v(!1)
  }), W = y(() => {
  }), oe = y(() => {
  }), ne = y(() => {
  });
  Gt(a && b, H, W, {
    onCloseSub: () => {
      U(), $ && O >= 0 && $.setHighlighted(O, "keyboard");
    }
  });
  const de = y(s);
  de.current = s, Y(() => {
    a && (de.current === e ? (H.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var _;
      return (_ = A.current) == null ? void 0 : _.focus();
    }), m(null)) : H.setHighlighted(-1, "keyboard"));
  }, [a]), Zt(a, oe), Qt(a, H, W, A, !b, ne), We.useLayoutEffect(() => {
    var w;
    if (!a || H.highlightedIndex < 0) return;
    const _ = (w = A.current) == null ? void 0 : w.querySelector(`[data-ei="${H.highlightedIndex}"]`);
    _ == null || _.scrollIntoView({ block: "nearest" });
  }, [a, H.highlightedIndex]);
  const he = y(null), ye = G((_) => {
    var w;
    if (_) {
      _.addEventListener("keydown", W.current, { capture: !0 }), _.addEventListener("wheel", oe.current, { passive: !1 });
      const D = _.ownerDocument;
      he.current = D, D.addEventListener("keydown", ne.current, { capture: !0 });
    } else
      (w = he.current) == null || w.removeEventListener("keydown", ne.current, { capture: !0 }), he.current = null;
    A.current = _, P(_);
  }, [P]), J = fe(), ve = { padding: `${k(8, 12, J)}px ${k(12, 16, J)}px`, fontSize: k(12, 14, J) }, M = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${R ? " ui-item-highlighted" : ""}${T ? " ui-sub-closing" : ""}`, j = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${o || ""}`;
  return /* @__PURE__ */ S(ee.Sub, { open: a || z, onOpenChange: (_) => u((w) => {
    if (!_) {
      const D = w.indexOf(e);
      return D >= 0 ? w.slice(0, D) : w;
    }
    return w.includes(e) ? w : [...w, e];
  }), children: [
    /* @__PURE__ */ S(
      ee.SubTrigger,
      {
        ref: N,
        "data-ei": O >= 0 ? O : void 0,
        style: ve,
        className: M,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          $ && O >= 0 && $.setHighlighted(O, "pointer");
        },
        onPointerDown: (_) => {
          _.pointerType === "pen" && (_.preventDefault(), u((w) => a ? w.slice(0, w.indexOf(e)) : [...w, e]));
        },
        children: [
          l === "left" && /* @__PURE__ */ i(zt, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ S("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          l === "right" && /* @__PURE__ */ i(zt, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(ee.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i(
      ee.SubContent,
      {
        ref: ye,
        "data-theme": p,
        className: j,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: H.pointerLeave,
        children: /* @__PURE__ */ i(dt.Provider, { value: H, children: c })
      }
    ) })
  ] });
}
const it = 8, Ii = ({ open: e, x: t, y: n, onClose: r, children: l, containerRef: c, theme: o = "light", morph: d = !0 }) => {
  const u = fe(), f = k(12, 14, u), s = y(null), m = et(), [a, b] = K(!1), [p, g] = K([]), [N, A] = K(null), z = St();
  Y(() => {
    if (e)
      return z.setHighlighted(-1, "keyboard"), $n(r);
  }, [e, r]);
  const v = y({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const T = G(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), U = qt({
    visible: !0,
    morph: d,
    anchor: T,
    cloneOnUnmount: !0
  }), H = y(() => {
  }), $ = y(() => {
  }), B = y(() => {
  });
  Gt(e, z, H), Zt(e, $), Qt(e, z, H, s, p.length > 0, B);
  const x = y(null), O = G((P) => {
    var W;
    if (P) {
      P.addEventListener("keydown", H.current, { capture: !0 }), P.addEventListener("wheel", $.current, { passive: !1 });
      const oe = P.ownerDocument;
      x.current = oe, oe.addEventListener("keydown", B.current, { capture: !0 });
    } else
      (W = x.current) == null || W.removeEventListener("keydown", B.current, { capture: !0 }), x.current = null;
    s.current = P, b(!!P), U(P);
  }, [U]), [R, F] = K(null);
  return Ee(() => {
    var j;
    if (!e || !a || !s.current) return;
    const P = s.current, W = P.offsetWidth, oe = P.offsetHeight, ne = (j = c == null ? void 0 : c.current) == null ? void 0 : j.getBoundingClientRect(), de = ne ? ne.right : (m == null ? void 0 : m.innerWidth) ?? 0, he = ne ? ne.bottom : (m == null ? void 0 : m.innerHeight) ?? 0, ye = ne ? ne.left : 0, J = ne ? ne.top : 0;
    let ve = Math.max(J + it, v.current.top), M = Math.max(ye + it, v.current.left);
    M + W > de && (M = de - W - it), ve + oe > he && (ve = Math.max(J + it, he - oe - it)), F({ left: M, top: ve });
  }, [e, a, t, n, c]), e ? /* @__PURE__ */ S(ee.Root, { open: e, onOpenChange: (P) => {
    P || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(ee.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(ee.Portal, { children: /* @__PURE__ */ i(jt.Provider, { value: o, children: /* @__PURE__ */ i(Vt.Provider, { value: { chain: p, setChain: g, morph: d, keyboardOpened: N, setKeyboardOpened: A }, children: /* @__PURE__ */ i(dt.Provider, { value: z, children: /* @__PURE__ */ i(
      ee.Content,
      {
        ref: O,
        "data-theme": o,
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: f, left: (R == null ? void 0 : R.left) ?? v.current.left, top: (R == null ? void 0 : R.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: z.pointerLeave,
        children: l
      }
    ) }) }) }) })
  ] }) : null;
}, Oi = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: l = !1, trailing: c, children: o }) => {
  const d = fe(), u = { padding: `${k(8, 12, d)}px ${k(12, 16, d)}px`, fontSize: k(12, 14, d) }, f = Xt(), s = y(f);
  s.current = f;
  const m = y(null);
  Y(() => {
    var g;
    const p = { label: Tn(o), activate: () => {
      r || e();
    } };
    return m.current = p, (g = s.current) == null ? void 0 : g.register(p);
  }, []);
  const a = f && m.current ? f.items.indexOf(m.current) : -1, b = !r && a >= 0 && a === f.highlightedIndex;
  return /* @__PURE__ */ S(
    ee.Item,
    {
      "data-ei": a >= 0 ? a : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && f && a >= 0 && f.setHighlighted(a, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: u,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${l ? "ui-item-selected" : ""} ${b ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: o }),
        c && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: c })
      ]
    }
  );
}, _i = () => /* @__PURE__ */ i(ee.Separator, { className: "ui-sep my-1" }), Hi = (e) => /* @__PURE__ */ i(Er, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Z = 8, Dn = "[data-modal-stack]", Ae = 220, lt = "cubic-bezier(0.32, 0.72, 0, 1)", vt = 0.94;
function Xe() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ie(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Ln(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function an(e, t, n, r) {
  const l = ++e.current, c = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = Ln(c, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === l && (t.style.transition = `transform ${Ae}ms ${lt}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === l && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, Ae + 80));
    });
  });
}
function Sr(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${vt})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${Ae}ms ${lt}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, Ae + 60));
    });
  });
}
function un(e, t, n) {
  const r = ++e.current, l = t.getBoundingClientRect(), c = 1 - vt, o = { left: l.left + l.width * c / 2, top: l.top + l.height * c / 2, width: l.width * vt, height: l.height * vt };
  t.style.transition = `transform ${Ae}ms ${lt}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = Ln(l, o), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, Ae + 60);
}
function Dt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Dn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function gt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Dn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Tr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: l,
  footer: c,
  children: o,
  onReset: d,
  morph: u = !0,
  flat: f = !1,
  closable: s = !0,
  dismissOnBackdrop: m = !0
}) {
  const a = y(null), b = y(null), p = y(null), g = fe(), N = k(20, 24, g), A = k(10, 12, g), z = k(12, 14, g), v = k(14, 16, g), T = k(20, 24, g), U = k(20, 24, g), H = k(20, 24, g), $ = k(14, 16, g), B = k(16, 20, g), x = k(10, 12, g), O = k(12, 14, g), R = k(8, 10, g), F = k(4, 6, g), P = { padding: `${A}px ${N}px` }, W = { fontSize: z }, oe = { padding: `${U}px ${T}px 16px ${T}px` }, ne = { fontSize: v }, de = { padding: `0 ${T}px 16px` }, he = { padding: `${H}px ${T}px` }, ye = { fontSize: x, padding: `${F}px ${R}px` }, [J, ve] = K(!1), M = G((h) => {
    a.current = h, ve(h !== null);
  }, []), j = at(), _ = et(), w = y(_);
  w.current = _;
  const [D, se] = K(null), pe = y(null), C = y(!1), V = y(!1), te = y(0), ae = y({ w: 0, h: 0 }), Se = y(!1), [_e, ce] = K(!1), [we, ge] = K(!1), Ne = y(0), xe = y(!1), [Ce, tt] = K(!1), ht = y(u);
  ht.current = u;
  const mt = y(!1), nt = y(!1), He = () => {
    nt.current = !0, ce(!0);
  }, De = () => {
    nt.current = !1, ce(!1);
  };
  Y(() => {
    e || (se(null), Se.current = !1, C.current = !1, ge(!1));
  }, [e]), Ee(() => {
    if (!e || Se.current || !J || !a.current) return;
    Se.current = !0;
    const h = a.current.getBoundingClientRect(), L = w.current ?? null, I = (L == null ? void 0 : L.innerWidth) ?? 0, X = Ie(L);
    se({
      left: Math.max(Z, Math.min((I - h.width) / 2, I - h.width - Z)),
      top: Math.max(X.top + Z, Math.min(X.top + (X.height - h.height) / 2, X.bottom - h.height - Z))
    });
  }, [e, J]), Ee(() => {
    if (!e || !J || !u || Xe() || !a.current) return;
    const h = a.current, L = Dt(h), I = L[L.length - 1];
    He(), I ? an(Ne, h, I.getBoundingClientRect(), De) : Sr(Ne, h, De);
  }, [e, J]);
  const Be = G(() => {
    if (!s || xe.current) return;
    const h = a.current, L = !!h && Dt(h).length > 0;
    if (!h || !u || Xe() || L) {
      t();
      return;
    }
    xe.current = !0, tt(!0), mt.current = !0, He(), un(Ne, h, () => {
      xe.current = !1, tt(!1), De(), t();
    });
  }, [u, t, s]), qe = G(() => {
    const h = a.current;
    if (!h || mt.current || !ht.current || Xe() || Dt(h).length > 0) return;
    const L = h.ownerDocument, I = h.cloneNode(!0);
    I.removeAttribute("data-modal-stack"), I.removeAttribute("data-state"), I.removeAttribute("role"), I.removeAttribute("data-aria-hidden"), I.removeAttribute("tabindex"), I.setAttribute("aria-hidden", "true"), I.style.pointerEvents = "none", L.body.appendChild(I), un({ current: 0 }, I, () => {
      I.isConnected && I.remove();
    });
  }, []);
  Ee(() => () => qe(), [qe]);
  const Fe = y(e);
  Ee(() => {
    const h = Fe.current;
    Fe.current = e, h && !e && qe();
  }, [e, J, qe]), Y(() => {
    if (!e || !J || !u || !a.current) return;
    const h = a.current, L = h.parentNode;
    if (!L) return;
    let I = 0, X = null, Q = !1;
    const ie = () => {
      I = 0;
      const ue = gt(h);
      if (ue.length > 0)
        h.style.opacity = "", h.style.pointerEvents = "", X = ue[ue.length - 1].getBoundingClientRect(), Q = !0, I = requestAnimationFrame(ie);
      else if (Q) {
        Q = !1, X && !Xe() && (He(), an(Ne, h, X, De)), X = null;
        const be = w.current ?? null;
        be == null || be.setTimeout(() => {
          !h || !h.isConnected || getComputedStyle(h).opacity !== "1" && (h.style.opacity = "1", h.style.pointerEvents = "");
        }, 240);
      }
    }, le = new MutationObserver(() => {
      !I && gt(h).length > 0 && (I = requestAnimationFrame(ie));
    });
    return le.observe(L, { childList: !0 }), () => {
      le.disconnect(), I && cancelAnimationFrame(I);
    };
  }, [e, J]), Y(() => {
    if (!J || !u || Xe() || !a.current) return;
    const h = a.current;
    let L = Math.round(h.getBoundingClientRect().height), I = !1;
    const X = new ResizeObserver(() => {
      if (!h.isConnected) return;
      const Q = Math.round(h.getBoundingClientRect().height);
      if (!I) {
        I = !0, L = Q;
        return;
      }
      if (Math.abs(Q - L) < 1) return;
      if (pe.current || xe.current || gt(h).length > 0) {
        L = Q;
        return;
      }
      if (nt.current) return;
      const ie = L;
      L = Q, He();
      const le = h.getBoundingClientRect(), ue = Ie(w.current ?? null), be = !C.current && !V.current, Ue = be ? ue.top + (ue.height - ie) / 2 : le.top, $e = be ? ue.top + (ue.height - Q) / 2 : le.top;
      h.style.transition = "none", h.style.height = `${ie}px`, be && (h.style.top = `${Ue}px`), b.current && (b.current.style.overflow = "hidden"), h.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          h.style.height === `${ie}px` && (h.style.transition = `height ${Ae}ms ${lt}${be ? `, top ${Ae}ms ${lt}` : ""}`, h.style.height = `${Q}px`, be && (h.style.top = `${$e}px`), window.setTimeout(() => {
            h.style.height === `${Q}px` && (h.style.transition = "", h.style.height = "", b.current && (b.current.style.overflow = ""), be && se({ left: le.left, top: $e }), De());
          }, Ae + 60));
        });
      });
    });
    return X.observe(h), () => X.disconnect();
  }, [J]), Y(() => {
    if (!J || !a.current || u && !Xe()) return;
    const h = a.current, L = new ResizeObserver(() => {
      if (!h.isConnected || pe.current || xe.current || V.current || gt(h).length > 0) return;
      const I = w.current ?? null, X = Ie(I), Q = (I == null ? void 0 : I.innerWidth) ?? 0, ie = h.getBoundingClientRect(), le = Math.max(X.top + Z, Math.min(ie.top, X.bottom - ie.height - Z)), ue = Math.max(Z, Math.min(ie.left, Q - ie.width - Z));
      (Math.abs(le - ie.top) > 0.5 || Math.abs(ue - ie.left) > 0.5) && se({ left: ue, top: le });
    });
    return L.observe(h), () => L.disconnect();
  }, [J, u]);
  const je = G(() => {
    const h = a.current;
    if (!h) return null;
    const L = h.getBoundingClientRect();
    return { left: L.left, top: L.top, width: L.width, height: L.height };
  }, []), Te = G((h, L) => {
    const I = w.current ?? null, X = (I == null ? void 0 : I.innerWidth) ?? 0, Q = Ie(I), ie = je(), le = ie ? ie.width : Math.min(X - Z * 2, 576), ue = ie ? ie.height : Math.min(Q.height - Z * 2, 400);
    return {
      left: Math.max(Z, Math.min(h, X - le - Z)),
      top: Math.max(Q.top + Z, Math.min(L, Q.bottom - ue - Z))
    };
  }, [je]);
  Y(() => {
    if (!e) return;
    const h = w.current ?? null, L = (h == null ? void 0 : h.visualViewport) ?? null;
    if (!h || !L) return;
    const I = 120;
    V.current = !1, ae.current = { w: h.innerWidth, h: h.innerHeight };
    let X = 0;
    const Q = () => {
      if (xe.current || pe.current) return;
      const le = (h == null ? void 0 : h.innerHeight) ?? 0, ue = (h == null ? void 0 : h.innerWidth) ?? 0, Ue = Ie(h).height < le - I, $e = le < ae.current.h - I && ue === ae.current.w;
      Ue || $e ? (V.current = !0, te.current && (clearTimeout(te.current), te.current = 0)) : te.current || (te.current = (h == null ? void 0 : h.setTimeout(() => {
        V.current = !1, te.current = 0, ge(!1);
      }, 600)) ?? 0), ge(V.current), !X && (X = requestAnimationFrame(() => {
        var sn;
        X = 0;
        const nn = a.current;
        if (!nn) return;
        const Ke = Ie(w.current ?? null), Re = nn.getBoundingClientRect(), rn = ((sn = w.current) == null ? void 0 : sn.innerWidth) ?? 0, Rt = (h == null ? void 0 : h.innerHeight) ?? 0, Hn = Ke.height < Rt - I || Rt < ae.current.h - I && (h == null ? void 0 : h.innerWidth) === ae.current.w;
        ae.current = { w: (h == null ? void 0 : h.innerWidth) ?? 0, h: Rt };
        const pt = Re.top >= Ke.top + Z && Re.bottom <= Ke.bottom - Z, on = () => {
          se({
            left: Math.max(Z, Math.min((rn - Re.width) / 2, rn - Re.width - Z)),
            top: Math.max(Ke.top + Z, Math.min(Ke.top + (Ke.height - Re.height) / 2, Ke.bottom - Re.height - Z))
          });
        };
        if (Hn && !me) {
          if (C.current) {
            pt || se(Te(Re.left, Re.top));
            return;
          }
          if (pt) return;
          on();
          return;
        }
        if (!V.current) {
          if (C.current) {
            pt || se(Te(Re.left, Re.top));
            return;
          }
          pt || on();
        }
      }));
    };
    L.addEventListener("resize", Q), L.addEventListener("scroll", Q);
    const ie = () => {
      xe.current || pe.current || X || (X = requestAnimationFrame(() => {
        X = 0;
        const le = a.current;
        if (!le) return;
        const ue = w.current ?? null, be = Ie(ue), Ue = (ue == null ? void 0 : ue.innerWidth) ?? 0, $e = le.getBoundingClientRect();
        if (C.current) {
          se(Te($e.left, $e.top));
          return;
        }
        se({
          left: Math.max(Z, Math.min((Ue - $e.width) / 2, Ue - $e.width - Z)),
          top: Math.max(be.top + Z, Math.min(be.top + (be.height - $e.height) / 2, be.bottom - $e.height - Z))
        });
      }));
    };
    return h.addEventListener("orientationchange", ie), () => {
      L.removeEventListener("resize", Q), L.removeEventListener("scroll", Q), h.removeEventListener("orientationchange", ie), X && cancelAnimationFrame(X), te.current && clearTimeout(te.current);
    };
  }, [e, Te]);
  const E = G((h) => {
    if (h.target.closest("button")) return;
    C.current = !0;
    const L = je();
    L && (se(Te(L.left, L.top)), pe.current = { startX: h.clientX, startY: h.clientY, posX: L.left, posY: L.top }, h.target.setPointerCapture(h.pointerId));
  }, [je, Te]), q = G((h) => {
    const L = pe.current;
    L && (h.preventDefault(), se(Te(L.posX + h.clientX - L.startX, L.posY + h.clientY - L.startY)));
  }, [Te]), re = G(() => {
    pe.current = null;
  }, []), ke = pe.current !== null, Me = G(() => {
    C.current = !1;
    const h = w.current ?? null, L = Ie(h), I = (h == null ? void 0 : h.innerWidth) ?? 0, X = a.current, Q = X ? X.getBoundingClientRect() : { width: 0, height: 0 };
    se({
      left: Math.max(Z, Math.min((I - Q.width) / 2, I - Q.width - Z)),
      top: Math.max(L.top + Z, Math.min(L.top + (L.height - Q.height) / 2, L.bottom - Q.height - Z))
    });
  }, []), rt = y(0), Jt = G(() => {
    const h = Date.now();
    h - rt.current < 300 ? (rt.current = 0, Me()) : rt.current = h;
  }, [Me]), en = D !== null, In = en ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", On = `${l ? `${l} w-full` : "max-w-xl w-full"}`, tn = {
    ...en ? { left: D.left, top: D.top } : {},
    width: `min(100%, calc(100dvw - ${Z * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...we ? {} : { maxHeight: `calc(100dvh - ${Z * 2}px)` }
  }, _n = G((h) => {
    if (h.key !== "Enter" || h.shiftKey || h.metaKey || h.ctrlKey || h.altKey) return;
    const L = h.target, I = p.current;
    if (!(!!L.closest("[data-modal-close]") || !!I && I.contains(L) && !!L.closest('button, a, [role="button"]')) && L.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !I) return;
    const Q = Array.from(I.querySelectorAll("button[data-modal-confirm]")), ie = Q.length > 0 ? Q : Array.from(I.querySelectorAll("button")), le = ie[ie.length - 1];
    !le || le.disabled || (h.preventDefault(), le.click());
  }, []);
  return /* @__PURE__ */ i(Pe.Root, { open: e, onOpenChange: (h) => {
    h || Be();
  }, children: /* @__PURE__ */ S(Pe.Portal, { container: j ?? void 0, children: [
    /* @__PURE__ */ i(
      Pe.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Ce ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (h) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (h.preventDefault(), m && Be());
        }
      }
    ),
    /* @__PURE__ */ S(
      Pe.Content,
      {
        ref: M,
        onKeyDown: _n,
        onInteractOutside: (h) => {
          m || h.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${In} ${On}`,
        style: { touchAction: "manipulation", ...Object.keys(tn).length > 0 ? tn : {} },
        children: [
          f ? /* @__PURE__ */ S(
            "div",
            {
              style: oe,
              className: `flex items-center justify-between ${ke ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (h) => {
                _e || E(h);
              },
              onPointerMove: q,
              onPointerUp: re,
              onClick: Jt,
              children: [
                /* @__PURE__ */ i(Pe.Title, { style: ne, className: "font-bold text-white truncate", children: n }),
                s && /* @__PURE__ */ i(Pe.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: B, height: B } }) })
              ]
            }
          ) : /* @__PURE__ */ S(
            "div",
            {
              style: P,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${ke ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (h) => {
                _e || E(h);
              },
              onPointerMove: q,
              onPointerUp: re,
              onClick: Jt,
              children: [
                /* @__PURE__ */ S("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(Pe.Title, { style: W, className: "font-bold text-white truncate", children: n })
                ] }),
                /* @__PURE__ */ S("div", { className: "flex items-center gap-2", children: [
                  d && /* @__PURE__ */ S("button", { onClick: d, style: ye, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ i(bn, { style: { width: O, height: O } }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(Pe.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: $, height: $ } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: b, style: f ? de : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: o }),
          c && /* @__PURE__ */ i("div", { ref: p, style: f ? he : void 0, className: f ? "" : "shrink-0", children: f ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: c }) : c })
        ]
      }
    )
  ] }) });
}
function Bi({ children: e }) {
  const t = fe(), n = k(20, 24, t), r = k(8, 12, t);
  return /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${n}px` }, children: e });
}
const Rr = "inline-flex items-center gap-2 rounded-lg text-xs transition cursor-pointer select-none whitespace-nowrap active:shadow-[inset_0_0_0_2px_var(--ui-panel-bg)]", Cr = {
  zinc: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-500 disabled:opacity-40 disabled:cursor-not-allowed",
  accent: "bg-blue-600 text-white font-semibold border border-blue-500 hover:bg-blue-500 hover:border-blue-400 disabled:opacity-40 disabled:cursor-not-allowed",
  danger: "bg-red-600 text-white font-semibold border border-red-500 hover:bg-red-500 hover:border-red-400 disabled:opacity-40 disabled:cursor-not-allowed"
}, Dr = {
  /* Transparent border on every variant — auto-height buttons add the border
     to their height, so the bordered hero would otherwise be 2px taller. */
  ghost: "border border-transparent text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "border border-transparent text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "border border-transparent bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function bt({
  variant: e = "hero",
  tone: t = "zinc",
  className: n = "",
  type: r = "button",
  ...l
}) {
  const c = Ye({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ i(
    "button",
    {
      type: r,
      style: c,
      className: `${Rr} ${e === "hero" ? Cr[t] : Dr[e]} ${n}`,
      ...l
    }
  );
}
function An({ checked: e, size: t, tone: n = "accent" }) {
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
function Lr({ checked: e, onChange: t, disabled: n = !1, label: r, id: l, className: c = "", labelClassName: o = "", theme: d, variant: u = "pill", tone: f = "accent", block: s = !1 }) {
  const m = u !== "plain", a = fe(), b = k(16, 20, a), p = k(12, 14, a), g = k(12, 14, a), N = k(12, 16, a), A = k(10, 12, a), z = k(8, 10, a);
  return /* @__PURE__ */ S(
    "label",
    {
      className: `ui-checkbox ${m ? "ui-checkbox-pill rounded-lg" : ""} ${f === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${c}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: z, padding: m ? `${A}px ${N}px` : void 0 },
      onClick: (T) => T.stopPropagation(),
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: l,
            checked: e,
            disabled: n,
            onChange: (T) => t(T.target.checked),
            className: "sr-only"
          }
        ),
        m ? /* @__PURE__ */ i(An, { checked: e, size: b, tone: f }) : /* @__PURE__ */ i("span", { className: "ui-checkbox-box", style: { width: b, height: b }, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${o}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function Fi(e = "md") {
  const t = me && xn() > 0;
  return e === "sm" ? `${t ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function Ar(e = "md") {
  return e === "sm" ? Ye({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : Ye({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Mn = Ze(null);
function Ki() {
  const e = Je(Mn);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Yi({ children: e }) {
  const [t, n] = K(null), [r, l] = K(!1), c = y(null), o = fe(), d = k(16, 20, o), u = k(12, 14, o), f = Ar(), s = y(t);
  s.current = t;
  const m = G(() => {
    const z = s.current;
    z && (z.kind === "confirm" ? z.resolve(!1) : z.kind === "prompt" ? z.resolve(null) : z.resolve());
  }, []), a = G((z) => {
    if (z.suppressKey) {
      const v = localStorage.getItem(z.suppressKey);
      if (v && Date.now() < parseInt(v, 10))
        return Promise.resolve(!0);
    }
    return new Promise((v) => {
      m(), l(!1), n({ kind: "confirm", options: z, resolve: v });
    });
  }, [m]), b = G((z) => new Promise((v) => {
    m(), n({ kind: "prompt", options: z, resolve: v });
  }), [m]), p = G((z) => new Promise((v) => {
    m(), n({ kind: "alert", options: z, resolve: v });
  }), [m]);
  Y(() => {
    if (t) {
      const z = setTimeout(() => {
        var v;
        return (v = c.current) == null ? void 0 : v.focus();
      }, 50);
      return () => clearTimeout(z);
    }
  }, [t]);
  const g = G(() => {
    var z, v;
    if (t) {
      if (t.kind === "confirm") {
        const T = t.options;
        T.suppressKey && r && localStorage.setItem(T.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((v = (z = c.current) == null ? void 0 : z.value) == null ? void 0 : v.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), N = t !== null;
  Y(() => {
    if (!N) return;
    const z = (v) => {
      v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey || v.isComposing || (v.preventDefault(), v.stopImmediatePropagation(), g());
    };
    return document.addEventListener("keydown", z, !0), () => document.removeEventListener("keydown", z, !0);
  }, [N, g]);
  const A = G(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ S(Mn.Provider, { value: { confirm: a, prompt: b, alert: p }, children: [
    e,
    N && /* @__PURE__ */ i(
      Tr,
      {
        open: !0,
        onClose: A,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ S(Oe, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(bt, { variant: "ghost", onClick: A, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(bt, { onClick: g, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            bt,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: g,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(bt, { "data-modal-confirm": !0, onClick: g, children: "Save" })
        ] }),
        children: /* @__PURE__ */ S("div", { className: "flex flex-col", style: { gap: d }, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { style: { fontSize: u }, className: "text-zinc-400 leading-relaxed", children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            Lr,
            {
              block: !0,
              checked: r,
              onChange: l,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (t == null ? void 0 : t.kind) === "prompt" && /* @__PURE__ */ i(
            "input",
            {
              ref: c,
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
const Mr = 500, Pr = 250, Ir = 5, ze = 88, dn = 4;
function Or(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const l = performance.now(), c = (o) => {
    const d = o - l, u = Math.min(d / t, 1);
    n.style.strokeDashoffset = String(r * (1 - u)), u < 1 && requestAnimationFrame(c);
  };
  requestAnimationFrame(c);
}
function _r({ x: e, y: t, ms: n }) {
  const r = y(null), l = at();
  return Y(() => {
    r.current && Or(r.current, n);
  }, [n]), Bt(
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
    l ?? document.body
  );
}
function Wi() {
  return { "data-no-longpress": "true" };
}
function Hr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function qi({
  children: e,
  showRing: t = !0,
  longPressMs: n = Mr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: l,
  onLongPress: c
}) {
  const [o, d] = K(null), u = yn(), f = y(null), s = y(null), m = y({ x: 0, y: 0, target: null }), a = y(!1), b = Math.min(Pr, n * 0.5), p = y(l);
  p.current = l;
  const g = y(c);
  return g.current = c, Y(() => {
    if (!me || !u) return;
    const N = (T) => {
      if (!Pt(T.pointerType) || T.button !== 0) return;
      const U = T.target;
      if (!U.closest(r) || (p.current ? !p.current(U) : Hr(U))) return;
      const H = T.clientX, $ = T.clientY;
      m.current = { x: H, y: $, target: T.target }, a.current = !0, t && (s.current = setTimeout(() => d({ x: H, y: $ }), b)), f.current = setTimeout(() => {
        if (!a.current) return;
        s.current && (clearTimeout(s.current), s.current = null), d(null);
        const B = m.current.target;
        if (!B) return;
        const x = g.current;
        if (x) {
          x(B, H, $);
          return;
        }
        const O = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: H,
          clientY: $,
          button: 2,
          view: window
        });
        B.dispatchEvent(O);
      }, n);
    }, A = (T) => {
      if (!a.current || f.current === null) return;
      const U = T.clientX - m.current.x, H = T.clientY - m.current.y;
      Math.sqrt(U * U + H * H) > Ir && (clearTimeout(f.current), f.current = null, s.current && (clearTimeout(s.current), s.current = null), a.current = !1, d(null));
    }, z = () => {
      f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), a.current = !1, d(null);
    }, v = (T) => {
      Pt(T.pointerType) && (f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), a.current = !1, d(null));
    };
    return u == null || u.addEventListener("pointerdown", N), u.addEventListener("pointermove", A), u.addEventListener("pointerup", z), u.addEventListener("pointercancel", z), u.addEventListener("pointerleave", v), () => {
      u.removeEventListener("pointerdown", N), u.removeEventListener("pointermove", A), u.removeEventListener("pointerup", z), u == null || u.removeEventListener("pointercancel", z), u == null || u.removeEventListener("pointerleave", v), f.current !== null && clearTimeout(f.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, b, r]), /* @__PURE__ */ S(Oe, { children: [
    e,
    t && o && /* @__PURE__ */ i(_r, { x: o.x, y: o.y, ms: n - b })
  ] });
}
function ji() {
  const e = gr();
  return pr ? e === null || Pt(e) : !1;
}
function Le({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  active: r = !1,
  className: l = "",
  type: c = "button",
  ...o
}) {
  const d = Ye({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), u = Ye({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), f = Ye({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), s = "", m = "", a = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", b = {
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
  }, g = {
    light: {
      subtle: { base: `${s} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${m} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${s} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${s} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${m} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${s} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, N = `${m} bg-blue-950 hover:bg-blue-900 text-white`, A = "bg-blue-900!", z = o["data-state"] === "open", v = g[t][e], T = e === "primary" ? u : e.startsWith("tab") ? f : d, U = k(6, 8, fe()), H = t === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let $;
  if (e === "tab") {
    const B = b[t];
    $ = r ? n ? B.cloudActive : B.active : n ? B.cloudInactive : B.inactive;
  } else e === "tab-header" ? $ = `${r ? n ? p.cloudActive : p.active : n ? p.cloudInactive : p.inactive} ${z ? n ? p.cloudOpen : p.open : ""}` : ($ = `${v.base} ${z ? v.open : ""}`, r && ($ = `${$} ${H}`), e === "primary" && t === "light" && n && ($ = z ? `${N} ${A}` : N));
  return /* @__PURE__ */ i("button", { type: c, className: `${a} ${$} ${l}`, style: { ...T, gap: U }, ...o });
}
const Br = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Fr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Lt = 1900, At = 2100;
function Kr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Yr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Ui({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: l = "", initialView: c }) {
  const o = /* @__PURE__ */ new Date(), d = (() => {
    if (!c) return o;
    const C = /* @__PURE__ */ new Date(c + "T00:00:00");
    return isNaN(C.getTime()) ? o : C;
  })(), [u, f] = K(d.getFullYear()), [s, m] = K(d.getMonth()), [a, b] = K("days"), [p, g] = K(null), N = st(() => new Set(e), [e]), A = (C) => {
    N.has(C) ? t(e.filter((V) => V !== C)) : t([...e, C]);
  }, z = st(() => {
    const C = Kr(u, s), V = new Date(u, s, 1).getDay(), te = [];
    for (let ae = 0; ae < V; ae++) te.push({ key: `pad-${ae}`, day: 0, empty: !0 });
    for (let ae = 1; ae <= C; ae++) te.push({ key: Yr(u, s, ae), day: ae, empty: !1 });
    return te;
  }, [u, s]), v = (C) => f((V) => Math.max(Lt, Math.min(At, V + C))), T = (C) => {
    s + C < 0 ? (f((V) => Math.max(Lt, V - 1)), m(11)) : s + C > 11 ? (f((V) => Math.min(At, V + 1)), m(0)) : m((V) => V + C);
  }, U = () => {
    if (p === null) return;
    const C = parseInt(p, 10);
    !isNaN(C) && C >= Lt && C <= At && f(C), g(null);
  }, H = (C) => e.some((V) => V.startsWith(`${u}-${String(C + 1).padStart(2, "0")}`)), $ = n === "dark", B = fe(), x = k(4, 8, B), O = k(16, 20, B), R = k(10, 11, B), F = k(6, 8, B), P = k(12, 14, B), W = k(6, 10, B), oe = k(12, 14, B), ne = k(8, 12, B), de = k(10, 12, B), he = k(6, 10, B), ye = k(2, 6, B), J = k(64, 80, B), ve = { padding: x }, M = { width: O, height: O }, j = { fontSize: R, paddingTop: F, paddingBottom: F }, _ = { fontSize: P, paddingTop: W, paddingBottom: W }, w = { fontSize: oe, paddingTop: ne, paddingBottom: ne }, D = { fontSize: de, padding: `${ye}px ${he}px` }, se = $ ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", pe = $ ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ S("div", { className: `border rounded-lg overflow-hidden w-full ${$ ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${l}`, children: [
    /* @__PURE__ */ S("div", { className: `flex items-center justify-between px-3 py-2 border-b ${$ ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => a === "months" ? v(-1) : T(-1),
          style: ve,
          className: `rounded transition-colors ${$ ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": a === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(Wn, { style: M })
        }
      ),
      a === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => b("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${$ ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(u, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(u),
          onChange: (C) => g(C.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (C) => C.target.select(),
          onBlur: U,
          onKeyDown: (C) => {
            C.key === "Enter" && (C.preventDefault(), U()), C.key === "Escape" && g(null);
          },
          style: { width: J },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${$ ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => a === "months" ? v(1) : T(1),
          style: ve,
          className: `rounded transition-colors ${$ ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": a === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(zt, { style: M })
        }
      )
    ] }),
    a === "months" ? /* @__PURE__ */ S("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Fr.map((C, V) => /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          onClick: () => {
            m(V), b("days");
          },
          style: w,
          className: `relative font-medium transition-colors border-b ${V === s ? se : pe} ${$ ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            C,
            H(V) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${V === s ? "bg-white" : $ ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        C
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${$ ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            f(o.getFullYear()), m(o.getMonth()), b("days");
          },
          style: { paddingTop: W, paddingBottom: W, fontSize: P },
          className: `px-3 font-semibold rounded transition-colors ${$ ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ S("div", { className: "grid grid-cols-7 text-center", children: [
      Br.map((C) => /* @__PURE__ */ i("div", { style: j, className: `font-semibold uppercase tracking-wider border-b ${$ ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: C }, C)),
      z.map((C) => C.empty ? /* @__PURE__ */ i("div", {}, C.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => A(C.key),
          style: _,
          className: `font-medium transition-colors border-b ${$ ? "border-zinc-800/60" : "border-zinc-50"} ${N.has(C.key) ? se : $ ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: C.day
        },
        C.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ S("div", { className: `px-3 py-2 border-t ${$ ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ S("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((C) => {
        const V = /* @__PURE__ */ new Date(C + "T00:00:00"), te = V.getFullYear() === o.getFullYear() ? V.toLocaleString("default", { month: "short", day: "numeric" }) : V.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ S(
          "button",
          {
            type: "button",
            onClick: () => A(C),
            "aria-label": `Remove ${te}`,
            style: D,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${$ ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              te,
              /* @__PURE__ */ i("span", { className: `leading-none ${$ ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          C
        );
      }) })
    ] })
  ] });
}
function Vi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: l,
  allSelected: c = !1,
  toggleAllLabel: o,
  emptyHint: d = "Nothing here",
  maxHeight: u,
  disabled: f = !1,
  theme: s,
  className: m = ""
}) {
  const a = (v) => t instanceof Set ? t.has(v) : t.includes(v), b = fe(), p = k(12, 16, b), g = k(8, 12, b), N = k(12, 14, b), A = k(16, 20, b), z = r != null || l != null;
  return /* @__PURE__ */ S("div", { className: m, ...s ? { "data-theme": s } : {}, children: [
    z && /* @__PURE__ */ S("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      l != null && /* @__PURE__ */ i("button", { type: "button", disabled: f, onClick: l, className: "ui-checklist-toggleall", children: o ?? (c ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ S(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: u ? { maxHeight: u, overflowY: "auto" } : void 0,
        children: [
          e.map((v) => {
            const T = a(v.id);
            return /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(v.id),
                className: `ui-checklist-item ${T ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${g}px ${p}px`, fontSize: N },
                children: [
                  /* @__PURE__ */ i(An, { checked: T, size: A }),
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
function Xi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: l = "Nothing here",
  maxHeight: c,
  compact: o = !1,
  disabled: d = !1,
  theme: u,
  className: f = ""
}) {
  const s = fe(), m = o ? 10 : k(12, 16, s), a = o ? 6 : k(8, 12, s), b = o ? 12 : k(12, 14, s), p = o ? 14 : k(16, 20, s);
  return /* @__PURE__ */ S("div", { className: f, ...u ? { "data-theme": u } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ S(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((g) => {
            const N = t === g.id;
            return /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(g.id),
                className: `ui-checklist-item ${N ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${a}px ${m}px`, fontSize: b },
                children: [
                  /* @__PURE__ */ i("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: N && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
const Gi = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: l = "visible",
  offset: c = 8
}) => {
  const o = et(), { refs: d, floatingStyles: u } = Gn({
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
          var z;
          if (l !== "visible") return {};
          const s = (z = f.elements.floating.ownerDocument) == null ? void 0 : z.defaultView;
          if (!s) return {};
          const m = f.rects.reference, a = Math.max(m.x, 0), b = Math.max(m.y, 0), p = Math.min(m.x + m.width, s.innerWidth), g = Math.min(m.y + m.height, s.innerHeight);
          if (p <= a || g <= b) return {};
          const N = r === "left" ? p - (m.x + m.width) : r === "right" ? a - m.x : 0, A = r === "top" ? b - m.y : r === "bottom" ? g - (m.y + m.height) : 0;
          return { x: f.x + N, y: f.y + A };
        }
      },
      Zn(c),
      Jn({ padding: 8 }),
      er({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (f) => {
          var g;
          const s = (g = f.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!s) return {};
          const m = f.rects.floating.width, a = f.rects.floating.height, b = Math.max(8, Math.min(f.x, s.innerWidth - m - 8)), p = Math.max(8, Math.min(f.y, s.innerHeight - a - 8));
          return { x: b, y: p };
        }
      }
    ],
    whileElementsMounted: Qn
  });
  return Ee(() => {
    n && d.setReference(n);
  }, [n, d]), /* @__PURE__ */ S(Oe, { children: [
    !n && /* @__PURE__ */ i("div", { ref: d.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    o && Bt(
      /* @__PURE__ */ i(
        "div",
        {
          ref: d.setFloating,
          className: `ui-chrome ${e}`,
          style: u,
          onMouseDown: (f) => f.stopPropagation(),
          onClick: (f) => f.stopPropagation(),
          onDragStart: (f) => f.preventDefault(),
          children: t
        }
      ),
      o.document.body
    )
  ] });
}, ot = ({ content: e, children: t }) => {
  const n = fe(), r = k(10, 12, n), l = k(6, 6, n), c = k(10, 12, n), o = { padding: `${l}px ${r}px`, fontSize: c }, d = at(), u = et(), [f, s] = K(!1), [m, a] = K({ x: 0, y: 0 }), b = y(null), p = y(null), g = () => {
    if (!b.current) return;
    const N = b.current.getBoundingClientRect();
    a({ x: N.left + N.width / 2, y: N.top });
  };
  return Y(() => () => {
    p.current && clearTimeout(p.current);
  }, []), Y(() => (f && u && (g(), u.addEventListener("scroll", g, !0)), () => u == null ? void 0 : u.removeEventListener("scroll", g, !0)), [f]), /* @__PURE__ */ S(
    "div",
    {
      ref: b,
      className: "inline-flex",
      onMouseEnter: () => {
        p.current && clearTimeout(p.current), g(), s(!0);
      },
      onMouseLeave: () => {
        p.current = setTimeout(() => s(!1), 60);
      },
      children: [
        t,
        f && Bt(
          /* @__PURE__ */ S(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white pointer-events-none",
              style: { ...o, left: m.x, top: m.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((N, A) => /* @__PURE__ */ i("div", { className: A > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: N }, A)),
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
function ft() {
  const e = fe(), t = me, n = t ? k(28, 40, e) : 28, r = t ? k(28, 40, e) : 28, l = t ? k(10, 14, e) : 10, c = t ? k(10, 14, e) : 10, o = t ? k(8, 10, e) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${l}px`, fontSize: c },
    input: { height: r, padding: `0 ${o}px`, fontSize: c }
  };
}
const Qi = me ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Wr = me ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", yt = me ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", qr = "hover:bg-red-950/50", Zi = me ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ji = "bg-blue-900/50 border-blue-700 text-blue-300", eo = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", jr = me ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", to = me ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", wt = me ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ur = "inline-flex rounded overflow-hidden border border-zinc-700", no = me ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", xt = ({ onClick: e, disabled: t, title: n, className: r = Wr, children: l }) => {
  const c = ft();
  return /* @__PURE__ */ i(ot, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, style: c.control, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: l }) });
}, ro = ({ value: e, options: t, onChange: n, disabled: r, active: l }) => {
  const c = ft();
  return /* @__PURE__ */ i("div", { className: Ur, children: t.map((o) => {
    const d = l ? l(o.v) : e === o.v;
    return /* @__PURE__ */ i(
      "button",
      {
        disabled: r,
        onClick: () => n(o.v),
        style: c.control,
        className: `font-medium transition-colors disabled:opacity-30 ${d ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${o.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
        children: o.l
      },
      o.v
    );
  }) });
}, io = ({ children: e }) => /* @__PURE__ */ S("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: me ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Vr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Xr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", oo = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ S("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? Vr : Xr, children: e }),
  t
] }), so = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ S("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), co = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: l }) => /* @__PURE__ */ S(Oe, { children: [
  /* @__PURE__ */ i(xt, { onClick: () => r(-1), disabled: e, title: "Move up", className: yt, children: /* @__PURE__ */ i(qn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(xt, { onClick: () => r(1), disabled: e, title: "Move down", className: yt, children: /* @__PURE__ */ i(jn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(xt, { onClick: t, disabled: e, title: "Duplicate", className: yt, children: /* @__PURE__ */ i(gn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: wt }),
  /* @__PURE__ */ i(xt, { onClick: n, disabled: e, title: "Delete", className: `${yt} ${qr}`, children: /* @__PURE__ */ i(Mt, { className: "w-2.5 h-2.5" }) })
] }), Gr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Qr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Zr = /^(https?:\/\/|mailto:)/i;
function Jr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const l = n.slice(0, r).trim().toLowerCase(), c = n.slice(r + 1).trim();
    Qr.has(l) && c && t.push(`${l}: ${c}`);
  }
  return t.join("; ");
}
function _t(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const d = document.createDocumentFragment();
    for (const u of Array.from(t.childNodes)) d.appendChild(_t(u));
    return d;
  };
  if (!Gr.has(n)) return r();
  if (n === "a") {
    const d = t.getAttribute("href") || "";
    if (!Zr.test(d)) return r();
  }
  const l = document.createElement(n), c = t.getAttribute("style"), o = Jr(c || "");
  if (o && l.setAttribute("style", o), n === "a") {
    l.setAttribute("href", t.getAttribute("href"));
    const d = t.getAttribute("target"), u = t.getAttribute("rel");
    d && l.setAttribute("target", d), u && l.setAttribute("rel", u);
  }
  for (const d of Array.from(t.childNodes)) l.appendChild(_t(d));
  return l;
}
function Pn(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function ei(e) {
  const t = Pn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const o of Array.from(n.content.childNodes)) r.appendChild(_t(o));
  const l = document.createElement("div");
  return l.appendChild(r), l.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function lo(e) {
  const t = Pn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function ao(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const ti = { text: "#52525b" }, ni = ({ node: e, selected: t, extension: n, editor: r, view: l, getPos: c }) => {
  var m;
  const o = e.attrs.field ?? "", d = n.options, u = ((m = d.resolve) == null ? void 0 : m.call(d, o)) ?? null, f = (u == null ? void 0 : u.color) ?? ti, s = (u == null ? void 0 : u.label) ?? `{{${o}}}`;
  return /* @__PURE__ */ i(
    rr,
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
      onMouseDown: (a) => {
        var N;
        if (a.button !== 0 || !r.isEditable) return;
        a.preventDefault(), r.isFocused || r.commands.focus();
        const b = typeof c == "function" ? c() : null;
        if (b == null) return;
        const p = l.state.doc.resolve(b), g = p.nodeAfter;
        g && Nt.isSelectable(g) && l.dispatch(l.state.tr.setSelection(new Nt(p))), (N = d.onTokenClick) == null || N.call(d, o, a.currentTarget.getBoundingClientRect(), b);
      },
      children: s
    }
  );
};
function ri(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function fn(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const ii = fr.extend({
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
    return nr(ni);
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
    return ["span", tr({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), oi = 240, si = 280, ci = ({ props: e, onApi: t }) => {
  const n = St(), r = y(t);
  r.current = t, Y(() => {
    r.current(n);
  }, [n]);
  const l = y(null);
  Y(() => {
    var o, d;
    (d = (o = l.current) == null ? void 0 : o.querySelector(".ui-item-highlighted")) == null || d.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex]), Y(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const c = Ut();
  return /* @__PURE__ */ i(dt.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: si, maxHeight: oi },
      onMouseDown: (o) => o.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: l, children: e.items.map((o) => /* @__PURE__ */ i(
        li,
        {
          item: o,
          d: c,
          command: () => e.command({ field: o.key })
        },
        o.key
      )) })
    }
  ) });
}, li = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: l, setPointer: c } = Cn({
    label: () => e.label,
    activate: n
  }), o = fe(), d = { padding: `${k(8, 12, o)}px ${k(12, 16, o)}px`, fontSize: k(12, 14, o) };
  return /* @__PURE__ */ S(
    "div",
    {
      role: "option",
      style: d,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${t.itemDefault} ${l ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => c(r),
      onClick: n,
      children: [
        /* @__PURE__ */ i("span", { className: `${t.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ i("span", { className: "block w-2 h-2 rounded-full", style: { background: e.color.text } }) }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: e.label }),
        e.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: e.color.text }, children: e.group })
      ]
    }
  );
}, ai = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(ci, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const l = hr(r);
      e = { holder: r, root: l, unmount: null, props: n, api: null };
      const c = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: o, y: d, placement: u, strategy: f }) => {
          var a, b;
          if (!e) return;
          const s = (b = (a = e.props) == null ? void 0 : a.clientRect) == null ? void 0 : b.call(a), m = s && !u.endsWith("-end") ? s.width : 0;
          r.style.position = f, r.style.left = `${o + m}px`, r.style.top = `${d}px`;
        }
      });
      e.unmount = c, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      if (!(e != null && e.props) || !e.api) return !1;
      const { items: r, command: l } = e.props;
      if (r.length === 0) return !1;
      const c = e.api, o = n.key;
      if (o === "ArrowDown" || o === "ArrowUp") {
        n.preventDefault();
        const d = c.highlightedIndex, u = o === "ArrowDown" ? 1 : -1;
        return c.setHighlighted((d + u + r.length) % r.length, "keyboard"), !0;
      }
      if (o === "Enter" || o === "Tab") {
        n.preventDefault();
        const d = c.highlightedIndex, u = d >= 0 ? d : 0, f = c.items[u];
        return f ? f.activate() : r[u] && l({ field: r[u].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, uo = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, ui = We.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: l,
  onStateChange: c,
  resolveToken: o,
  suggestionItems: d,
  onTokenClick: u,
  onSelectionChange: f
}, s) => {
  const m = y(o);
  m.current = o;
  const a = y(d);
  a.current = d;
  const b = y(u);
  b.current = u;
  const p = y(f);
  p.current = f;
  const g = y(null), N = y(null), A = y(t);
  A.current = t;
  const z = y(r);
  z.current = r;
  const v = y(c);
  v.current = c;
  const T = y(null), U = (O) => {
    var P;
    const R = {
      bold: O.isActive("bold"),
      italic: O.isActive("italic"),
      underline: O.isActive("underline"),
      strike: O.isActive("strike"),
      link: O.isActive("link"),
      color: O.getAttributes("textStyle").color || ""
    }, F = T.current;
    F && F.bold === R.bold && F.italic === R.italic && F.underline === R.underline && F.strike === R.strike && F.link === R.link && F.color === R.color || (T.current = R, (P = v.current) == null || P.call(v, R));
  }, H = (O) => {
    var oe;
    const R = O.state.selection;
    let F = null;
    R instanceof Nt && R.node.type.name === "token" ? (F = { key: R.node.attrs.field ?? "", pos: R.from }, g.current = R.from) : g.current != null && (g.current = O.state.tr.mapping.map(g.current));
    const P = N.current, W = P && F && P.key === F.key && P.pos === F.pos;
    !P && !F || W || (N.current = F, (oe = p.current) == null || oe.call(p, F));
  }, $ = (O) => {
    const R = ei(ri(O));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(R) ? "" : R;
  }, B = We.useMemo(() => {
    const O = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: R }) => {
        var F;
        return ((F = a.current) == null ? void 0 : F.call(a, R)) ?? [];
      },
      command: ({ editor: R, range: F, props: P }) => {
        R.chain().focus().insertContentAt(F, { type: "token", attrs: { field: P.field } }).run();
      },
      render: ai
    };
    return ii.configure({
      resolve: m.current ?? null,
      suggestion: O,
      onTokenClick: (R, F, P) => {
        var W;
        g.current = P, (W = b.current) == null || W.call(b, R, F, P);
      }
    });
  }, []), x = ir({
    immediatelyRender: !1,
    extensions: [
      sr,
      cr.configure({ placeholder: n }),
      lr,
      ar,
      dr,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      ur.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      B
    ],
    content: fn(e || ""),
    editable: !r,
    onUpdate: ({ editor: O }) => {
      A.current($(O.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: O }) => {
      U(O), H(O);
    }
  });
  return Y(() => {
    if (!x || x.isFocused) return;
    $(x.getHTML()) !== e && (T.current = null, x.commands.setContent(fn(e || ""), { emitUpdate: !1 }), U(x));
  }, [e, x]), Y(() => {
    x && x.setEditable(!r);
  }, [r, x]), Y(() => {
    x && (T.current = null, U(x), H(x));
  }, [x]), Bn(s, () => ({
    exec: (O, R) => {
      if (!(!x || z.current))
        switch (O) {
          case "bold":
            x.chain().focus().toggleBold().run();
            break;
          case "italic":
            x.chain().focus().toggleItalic().run();
            break;
          case "underline":
            x.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            x.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            R && x.chain().focus().setColor(R).run();
            break;
          case "unsetColor":
            x.chain().focus().unsetColor().run();
            break;
          case "link":
            R && x.chain().focus().extendMarkRange("link").setLink({ href: R }).run();
            break;
          case "unlink":
            x.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => x == null ? void 0 : x.commands.focus(),
    insertToken: (O) => {
      !x || z.current || x.chain().focus().insertContent({ type: "token", attrs: { field: O } }).run();
    },
    replaceToken: (O) => {
      if (!x || z.current) return;
      const R = g.current;
      R != null && x.commands.command(({ tr: F }) => {
        const P = F.doc.nodeAt(R);
        if (!P || P.type.name !== "token") return !1;
        F.setNodeMarkup(R, void 0, { field: O });
        const W = F.doc.resolve(R);
        return W.nodeAfter && W.nodeAfter.type.name === "token" && F.setSelection(new Nt(W)), !0;
      });
    }
  }), [x]), /* @__PURE__ */ i(or, { editor: x, className: `richtext-editor ${l || ""}` });
});
ui.displayName = "RichTextEditor";
const di = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], fi = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], hn = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), fo = ({ value: e, disabled: t, onChange: n }) => {
  const [r, l] = K(!1), c = ft();
  return /* @__PURE__ */ i(
    Tt,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ S(Le, { theme: "dark", disabled: t, style: c.control, className: "justify-between min-w-0", children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(Ht, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: di.map((o) => /* @__PURE__ */ i($r, { onClick: () => {
        n(o), l(!1);
      }, icon: o === e ? /* @__PURE__ */ i(pn, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: o }, children: o }) }, o))
    }
  );
}, hi = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, l] = K(!1), c = ft(), [o, d] = K(""), u = () => {
    var s;
    const f = o.trim();
    f && ((s = e.current) == null || s.exec("link", f), l(!1));
  };
  return /* @__PURE__ */ i(
    Tt,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ i(
        Le,
        {
          theme: "dark",
          active: n,
          disabled: t,
          onMouseDown: (f) => f.preventDefault(),
          style: { ...c.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(Xn, { className: "w-3 h-3" })
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
              f.key === "Enter" && (f.preventDefault(), u());
            },
            style: c.input,
            className: jr + " w-full"
          }
        ),
        /* @__PURE__ */ S("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(Le, { theme: "dark", onClick: u, style: c.control, disabled: !o.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            Le,
            {
              theme: "dark",
              onClick: () => {
                var f;
                (f = e.current) == null || f.exec("unlink"), l(!1);
              },
              style: c.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, ho = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: l }) => {
  const [c, o] = K(!1), d = (s, m) => {
    var a;
    return (a = e.current) == null ? void 0 : a.exec(s, m);
  }, u = ft(), f = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ S("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(ot, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || f("bold"), disabled: t || f("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => d("bold"), style: { ...u.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
    /* @__PURE__ */ i(ot, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || f("italic"), disabled: t || f("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => d("italic"), style: { ...u.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
    /* @__PURE__ */ i(ot, { content: "Underline", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => d("underline"), style: { ...u.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Un, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(ot, { content: "Strikethrough", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => d("strikeThrough"), style: { ...u.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Vn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: wt }),
    /* @__PURE__ */ i(hi, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: wt }),
    /* @__PURE__ */ i(
      Tt,
      {
        open: c,
        onOpenChange: o,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ S(Le, { theme: "dark", disabled: t, style: u.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(hn, {}),
          /* @__PURE__ */ i(Ht, { className: "w-3 h-3 text-zinc-500" })
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
          fi.map((s) => /* @__PURE__ */ i(
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
    l && /* @__PURE__ */ S(Oe, { children: [
      /* @__PURE__ */ i("div", { className: wt }),
      l
    ] })
  ] });
};
function mo({ title: e, icon: t, count: n, tone: r = "default", collapsed: l, onToggle: c, trailing: o, bodyClass: d, className: u = "", dataProps: f, children: s }) {
  const m = fe(), a = Ye({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), b = k(14, 16, m), p = { width: b, height: b }, g = k(10, 12, m);
  return /* @__PURE__ */ S("div", { ...f, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${u}`, children: [
    /* @__PURE__ */ S("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: a, children: [
      /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          onClick: c,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            l ? /* @__PURE__ */ i(zt, { className: "text-zinc-400 shrink-0", style: p }) : /* @__PURE__ */ i(Ht, { className: "text-zinc-400 shrink-0", style: p }),
            t,
            /* @__PURE__ */ i("span", { className: "font-semibold text-zinc-200 truncate", children: e }),
            n && /* @__PURE__ */ i("span", { className: "text-zinc-500 shrink-0", style: { fontSize: g }, children: n })
          ]
        }
      ),
      o && /* @__PURE__ */ i("div", { className: "shrink-0", children: o })
    ] }),
    !l && s && /* @__PURE__ */ i("div", { className: d || "ui-card-band border-t p-1.5 space-y-1", children: s })
  ] });
}
export {
  Le as Button,
  mo as CardSection,
  An as CheckMark,
  Lr as Checkbox,
  Vi as Checklist,
  so as ChromeHeader,
  oo as ContentRow,
  Ii as ContextMenu,
  _i as ContextMenuDivider,
  Oi as ContextMenuItem,
  Hi as ContextMenuSub,
  Ui as DatePicker,
  Yi as DialogProvider,
  $r as DropdownItem,
  Tt as DropdownMenu,
  Er as DropdownSubmenu,
  jt as DropdownThemeContext,
  di as FONTS,
  Gi as FloatingChrome,
  fo as FontMenu,
  ho as FormatToolbar,
  me as IS_COARSE,
  pr as IS_TOUCH_CAPABLE,
  Pi as ItemManagerDropdown,
  qi as LongPressMenuProvider,
  Kt as MORPH_EASE,
  Qe as MORPH_MS,
  Yt as MORPH_OPACITY_MS,
  dt as MenuHighlightContext,
  Rn as MenuSearchContext,
  Tr as Modal,
  Bi as ModalFooter,
  bt as ModalFooterButton,
  mr as PopoutWindowContext,
  uo as RICH_TEXT_STATE_IDLE,
  Xi as RadioList,
  ui as RichTextEditor,
  io as SectionHeader,
  ro as Seg,
  co as StructureControls,
  Vt as SubmenuContext,
  Wr as TB_BTN,
  yt as TB_BTN_ICON,
  qr as TB_DANGER,
  wt as TB_DIVIDER,
  jr as TB_INPUT,
  to as TB_NUM,
  no as TB_PICKER,
  Qi as TB_ROW_LABEL,
  Ur as TB_SEG,
  Zi as TB_TOGGLE,
  eo as TB_TOGGLE_OFF,
  Ji as TB_TOGGLE_ON,
  ii as Token,
  ni as TokenChipView,
  xt as ToolButton,
  ot as Tooltip,
  Wt as ZOOM_FROM,
  xr as cloneOverlayClose,
  k as coarsePx,
  ao as escapeHtml,
  xn as getCoarseScale,
  Ut as getDropdownClasses,
  Li as getHardwareKeyboard,
  Di as getLastPointerType,
  Fi as inputCls,
  Hr as isInteractiveElement,
  Pt as isTouchLike,
  kn as nearestOverlayOrigin,
  Pn as normalizeSpaces,
  Ct as overlayMorphEnabled,
  yr as playOverlayClose,
  br as playOverlayOpen,
  fn as preprocessTokenHtml,
  ei as sanitizeRichText,
  Ri as setCoarseScale,
  lo as stripRichText,
  ri as stripTokenWrappers,
  Ci as useCoarse,
  fe as useCoarseScale,
  Ye as useCoarseSize,
  yn as useCurrentDocument,
  et as useCurrentWindow,
  Ki as useDialog,
  En as useDropdownTheme,
  vr as useFixedPosition,
  Ai as useHardwareKeyboard,
  Ar as useInputSize,
  Sn as useItemSize,
  gr as useLastPointerType,
  Wi as useLongPressOptOut,
  Xt as useMenuHighlight,
  zr as useMenuSearch,
  qt as useOverlayMorph,
  Ft as usePopoutWindow,
  at as usePortalTarget,
  Mi as useSmartPosition,
  ji as useTouchMode
};
