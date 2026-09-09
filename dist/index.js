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
const ut = typeof window < "u", he = ut && window.matchMedia("(pointer: coarse)").matches, pr = ut && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
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
  }, []), he && Et > 0;
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
  return he ? Math.round(e + (t - e) * n) : e;
}
function Ye(e, t) {
  const n = fe();
  return he && n > 0 ? {
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
    const f = window.matchMedia(o);
    (mn = f.addEventListener) == null || mn.call(f, "change", e);
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
    const f = n;
    if (n = null, !f || Math.hypot(o.clientX - f.x, o.clientY - f.y) > 8) return;
    const u = o.target;
    if (!u || !u.isConnected) return;
    if (u instanceof HTMLInputElement && c.has(u.type)) {
      try {
        u.showPicker();
      } catch {
      }
      return;
    }
    const d = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    d[l] = !0, r = { x: o.clientX, y: o.clientY, time: Date.now() }, u.dispatchEvent(d);
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
  const o = (t == null ? void 0 : t()) ?? null, f = o ? kn({ left: c.left, top: c.top, width: c.width, height: c.height }, o) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${f.x * 100}% ${f.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
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
      const C = p.getBoundingClientRect();
      (C.width > 0 || C.height > 0) && (l.current = { left: C.left, top: C.top, width: C.width, height: C.height }), r(!0);
      return;
    }
    const g = t.current, $ = ++c.current;
    queueMicrotask(() => {
      $ === c.current && t.current === g && (t.current = null, r(!1), !(!g || !e.cloneOnUnmount || !u.current) && g.style.visibility !== "hidden" && Ct(a.current) && xr(g, s.current, l.current));
    });
  }, []), f = G(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (l.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), u = y(e.visible);
  u.current = e.visible;
  const d = y(e.visible), s = y(e.anchor ?? null);
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
      p = 0, f(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, f]), Ee(() => {
    var $;
    const p = d.current;
    if (d.current = e.visible, e.visible || !p) return;
    const g = t.current;
    if (!g || !Ct(a.current)) {
      ($ = m.current) == null || $.call(m);
      return;
    }
    yr(b, g, s.current, () => {
      var C;
      return (C = m.current) == null ? void 0 : C.call(m);
    });
  }, [e.visible]), Y(() => {
    if (!n || !u.current) return;
    const p = (g) => {
      const $ = t.current;
      $ && $.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), Y(() => {
    if (!n || !u.current) return;
    const p = (g) => {
      const $ = t.current;
      $ && $.contains(g.target) && g.stopImmediatePropagation();
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
    const f = e.current.getBoundingClientRect(), u = c.getBoundingClientRect(), d = o.innerWidth, s = Nn(o), m = u.right - d;
    if (m > 0) {
      const a = Math.min(m + 8, u.left);
      c.style.left = `${u.left - f.left - a}px`;
    }
    u.left < 0 && (c.style.left = `${-f.left + 4}px`), u.bottom > s.bottom + 4 && (c.style.top = "auto", c.style.bottom = "100%", c.getBoundingClientRect().top < s.top && (c.style.bottom = "auto", c.style.top = `${-f.top + s.top + 4}px`, c.style.maxHeight = `${s.height - 8}px`));
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
    let f = 0;
    const u = () => {
      f = 0;
      const b = o.getBoundingClientRect(), p = c.current;
      if (!p) return;
      const g = p.innerWidth, $ = Nn(p), C = (r == null ? void 0 : r.panelWidth) ?? Math.max(b.width, 200), z = 4, w = 120;
      let T = Math.max(0, b.left);
      T + C > g && (T = Math.max(0, g - C - 8));
      const j = $.bottom - b.bottom - z - 16, H = b.top - $.top - z - 16;
      if (j >= w || j >= H) {
        const N = Math.min(b.bottom + z, Math.max($.top, $.bottom - 40)), B = Math.max(32, $.bottom - N - 16);
        n({ top: N, left: T, width: b.width, maxH: B });
      } else {
        const N = Math.max(32, Math.min(H, 360)), B = $.bottom - (b.top - z);
        n({ top: 0, left: T, width: b.width, maxH: N, bottom: Math.max(0, B) });
      }
    }, d = () => {
      f || (f = requestAnimationFrame(u));
    }, s = c.current ?? null, m = (s == null ? void 0 : s.document) ?? null;
    d(), m == null || m.addEventListener("scroll", d, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", d);
    const a = (s == null ? void 0 : s.visualViewport) ?? null;
    return a == null || a.addEventListener("resize", d), a == null || a.addEventListener("scroll", d), () => {
      f && cancelAnimationFrame(f), m == null || m.removeEventListener("scroll", d, { capture: !0 }), s == null || s.removeEventListener("resize", d), a == null || a.removeEventListener("resize", d), a == null || a.removeEventListener("scroll", d);
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
  const t = he && xn() > 0;
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
  const t = y([]), [n, r] = K(-1), [l, c] = K(!1), [o, f] = K(0), u = G((a) => (t.current = [...t.current, a], f((b) => b + 1), () => {
    t.current = t.current.filter((b) => b !== a), f((b) => b + 1);
  }), []), d = G((a, b) => {
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
    setHighlighted: d,
    pointerLeave: s
  }), [n, l, o, u, d, s, e]);
}
function Cn(e) {
  const t = Xt(), n = y(t);
  n.current = t;
  const r = y(null);
  Y(() => {
    var u;
    const f = { label: e.label(), activate: e.activate };
    return r.current = f, (u = n.current) == null ? void 0 : u.register(f);
  }, []);
  const l = t && r.current ? t.items.indexOf(r.current) : -1, c = !!t && !e.disabled && l >= 0 && l === t.highlightedIndex;
  return { api: t, myIndex: l, highlighted: c, setPointer: (f) => {
    !e.disabled && t && f >= 0 && t.setHighlighted(f, "pointer");
  } };
}
function Gt(e, t, n, r) {
  const l = y(-1);
  l.current = t.highlightedIndex;
  const c = y(t);
  c.current = t;
  const o = y(e);
  o.current = e;
  const f = y(r);
  f.current = r;
  const u = y({ text: "", time: 0 }), d = y(!1);
  d.current || (d.current = !0, n.current = (s) => {
    var p, g, $, C, z;
    if (!o.current) return;
    const m = s.target;
    if (!!m && !!m.closest("input, textarea, [contenteditable]") && (s.key.length === 1 || s.key === "Enter" || s.key === "Escape")) {
      const w = (g = (p = f.current) == null ? void 0 : p.onFieldKey) == null ? void 0 : g.call(p, s);
      (!!(($ = f.current) != null && $.onFieldKey) || c.current.items.length > 0) && (s.stopImmediatePropagation(), w && s.preventDefault());
      return;
    }
    const b = c.current.items;
    if (b.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const w = s.key === "ArrowDown" ? 1 : -1, T = (l.current + w + b.length) % b.length;
        c.current.setHighlighted(T, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const w = l.current;
        w >= 0 && w < b.length && b[w].submenu && b[w].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (z = (C = f.current) == null ? void 0 : C.onCloseSub) == null || z.call(C);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const w = l.current;
        w >= 0 && w < b.length && b[w].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const w = Date.now(), T = (w - u.current.time > 500 ? "" : u.current.text) + s.key.toLowerCase();
        if (u.current = { text: T, time: w }, !T) return;
        const j = l.current + 1;
        for (let H = 0; H < b.length; H++) {
          const N = (j + H) % b.length;
          if (b[N].label.toLowerCase().startsWith(T)) {
            c.current.setHighlighted(N, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Qt(e, t, n, r, l, c, o) {
  const f = y(t);
  f.current = t;
  const u = y(e);
  u.current = e;
  const d = y(l);
  d.current = l;
  const s = y(o == null ? void 0 : o.ignoreFields);
  s.current = o == null ? void 0 : o.ignoreFields;
  const m = y(!1);
  m.current || (m.current = !0, c.current = (a) => {
    if (!u.current || d.current) return;
    const b = r.current;
    if (b && b.contains(a.target)) return;
    if (s.current) {
      const g = a.target;
      if (g && g.closest("input, textarea, [contenteditable]")) return;
    }
    f.current.items.length === 0 || !(a.key === "ArrowDown" || a.key === "ArrowUp" || a.key === "ArrowLeft" || a.key === "ArrowRight" || a.key === "Enter" || a.key === " " || a.key.length === 1 && !a.ctrlKey && !a.metaKey && !a.altKey) || (a.preventDefault(), a.stopImmediatePropagation(), n.current(a));
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
  children: f,
  morph: u = !0,
  contentClassName: d,
  initialHighlightIndex: s,
  searchable: m = !1,
  searchPlaceholder: a,
  searchFilter: b,
  searchValue: p,
  onSearchValueChange: g
}) {
  const [$, C] = K([]), [z, w] = K(null), T = at(), j = yn(), H = y(null), N = y(null), B = y(e);
  B.current = e;
  const [x, P] = K(e), [D, M] = K(""), F = m && p !== void 0, W = F ? p : D, te = F ? g ?? (() => {
  }) : M, [ue, de] = K(!1), me = F && !ue ? "" : W, pe = y(null), J = fe(), ve = {
    padding: `${k(8, 12, J)}px ${k(12, 16, J)}px`,
    fontSize: `${k(12, 14, J)}px`
  }, [I, V] = K(0), _ = m && !F;
  Y(() => {
    var ke;
    if (!_ || !e) return;
    const E = (ke = N.current) == null ? void 0 : ke.querySelector("[data-menu-items]");
    if (!E) return;
    const q = () => V(E.offsetWidth - E.clientWidth);
    q();
    const re = new ResizeObserver(q);
    return re.observe(E), () => re.disconnect();
  }, [e, _, W]);
  const v = st(() => {
    if (!m) return;
    const E = me.trim().toLowerCase();
    return E ? (q) => b ? b(E, q.label) : q.label.toLowerCase().includes(E) : Nr;
  }, [me, m, b]), L = St(v);
  Y(() => {
    if (e)
      return P(!0), F || M(""), de(!1), L.setHighlighted(s ?? -1, "keyboard"), $n(() => {
        n == null || n(!1), t == null || t();
      });
    C([]), de(!1);
  }, [e, s, n, t]), Y(() => {
    if (!e || !j) return;
    const E = (q) => {
      if (q.pointerType !== "touch") return;
      const re = q.target;
      re && (N.current && N.current.contains(re) || H.current && H.current.contains(re) || re instanceof Element && re.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return j.addEventListener("pointerdown", E, { capture: !0 }), () => j.removeEventListener("pointerdown", E, { capture: !0 });
  }, [e, j, n, t]);
  const oe = G(() => {
    const E = H.current;
    if (!E) return null;
    const q = E.getBoundingClientRect();
    return { left: q.left, top: q.top, width: q.width, height: q.height };
  }, []), ge = qt({
    visible: e,
    morph: u,
    anchor: oe,
    onClosed: () => P(!1)
  }), R = y(() => {
  }), U = y(() => {
  }), ne = y(() => {
  }), le = G((E) => {
    if (E.key === "Enter") {
      const q = L.highlightedIndex, re = L.items[q >= 0 ? q : 0];
      return re == null || re.activate(), !0;
    }
    return E.key === "Escape" ? (n == null || n(!1), t == null || t(), !0) : !1;
  }, [L, n, t]);
  Gt(e && $.length === 0, L, R, { onFieldKey: le }), Zt(e, U), Qt(e, L, R, N, $.length > 0, ne, { ignoreFields: F });
  const Se = y(null), _e = G((E) => {
    var q;
    if (E) {
      E.addEventListener("keydown", R.current, { capture: !0 }), E.addEventListener("wheel", U.current, { passive: !1 });
      const re = E.ownerDocument;
      Se.current = re, re.addEventListener("keydown", ne.current, { capture: !0 }), ht(E.offsetWidth), Ce(!0);
    } else
      (q = Se.current) == null || q.removeEventListener("keydown", ne.current, { capture: !0 }), Se.current = null, Ce(!1);
    N.current = E, ge(E);
  }, [ge]), [se, we] = K({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [be, Ne] = K(0), [xe, Ce] = K(!1), [tt, ht] = K(0);
  Y(() => {
    e && H.current && Ne(H.current.getBoundingClientRect().width);
  }, [e]);
  const mt = st(() => ({ panelWidth: tt || be || void 0 }), [tt, be]);
  vr(H, e && xe, (E) => we({ ...E, maxH: Math.min(E.maxH, 384), ready: !0 }), mt), Y(() => {
    var E;
    if (se.ready && e) {
      if (m) {
        (E = pe.current) == null || E.focus();
        return;
      }
      const q = N.current;
      q && q.ownerDocument.activeElement !== q && !q.contains(q.ownerDocument.activeElement) && q.focus();
    }
  }, [se.ready, e, m]), Y(() => {
    if (!e || !m) return;
    if (L.items.length === 0) {
      L.highlightedIndex !== -1 && L.setHighlighted(-1, "keyboard");
      return;
    }
    const E = L.highlightedIndex;
    (E < 0 || E >= L.items.length) && L.setHighlighted(0, "keyboard");
  }, [e, W, m, L.items.length]), Ee(() => {
    var q;
    if (!e || L.highlightedIndex < 0) return;
    const E = (q = N.current) == null ? void 0 : q.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    E == null || E.scrollIntoView({ block: "nearest" });
  }, [e, L.highlightedIndex]);
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
      if ((re = (q = Fe.props).onKeyDown) == null || re.call(q, E), !(!F || !B.current)) {
        if (E.key.length === 1 && !E.ctrlKey && !E.metaKey && !E.altKey)
          de(!0);
        else if (E.key === "ArrowDown" || E.key === "ArrowUp") {
          E.preventDefault();
          const ke = L.items;
          if (ke.length === 0) return;
          const Me = E.key === "ArrowDown" ? 1 : -1, rt = (L.highlightedIndex + Me + ke.length) % ke.length;
          L.setHighlighted(rt, "keyboard");
        } else if (E.key === "Enter") {
          E.preventDefault();
          const ke = L.highlightedIndex, Me = L.items[ke >= 0 ? ke : 0];
          Me == null || Me.activate();
        }
      }
    }
  }) : r, Te = `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] min-w-0 ${_ ? "overflow-hidden" : "overflow-y-auto scrollbar-custom"}`;
  return /* @__PURE__ */ S(ee.Root, { open: e || x, onOpenChange: nt, modal: !1, children: [
    /* @__PURE__ */ i(ee.Trigger, { asChild: !0, children: je }),
    /* @__PURE__ */ i(ee.Portal, { container: T ?? void 0, children: /* @__PURE__ */ i(jt.Provider, { value: o, children: /* @__PURE__ */ i(Vt.Provider, { value: { chain: $, setChain: C, morph: u, keyboardOpened: z, setKeyboardOpened: w }, children: /* @__PURE__ */ i(dt.Provider, { value: L, children: /* @__PURE__ */ i(Rn.Provider, { value: { query: W, setQuery: te }, children: /* @__PURE__ */ S(
      ee.Content,
      {
        ref: _e,
        "data-theme": o,
        "data-ui-fixed": !0,
        className: `${Te} ${c || ""} ${d || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: se.left,
          top: se.bottom != null ? void 0 : se.top,
          bottom: se.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: c ? void 0 : be || void 0,
          maxHeight: se.maxH,
          visibility: se.ready ? "visible" : "hidden"
        },
        onPointerLeave: L.pointerLeave,
        children: [
          _ && /* @__PURE__ */ i("div", { className: "shrink-0 px-0 pt-1 pb-1", style: { paddingRight: I }, children: /* @__PURE__ */ S("div", { className: "ui-item ui-item-highlighted flex items-center gap-2 rounded", style: ve, children: [
            /* @__PURE__ */ i(Fn, { className: "w-3.5 h-3.5 shrink-0 ui-icon" }),
            /* @__PURE__ */ i(
              "input",
              {
                ref: pe,
                value: W,
                onChange: (E) => te(E.target.value),
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
                  te(""), (E = pe.current) == null || E.focus();
                },
                children: /* @__PURE__ */ i(kt, { className: "w-3.5 h-3.5" })
              }
            ) : /* @__PURE__ */ i("span", { className: "w-3.5 h-3.5 shrink-0" })
          ] }) }),
          _ ? /* @__PURE__ */ i("div", { "data-menu-items": !0, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: f }) : f
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
  onDelete: f,
  onCreate: u,
  onImport: d,
  onExport: s,
  onReset: m,
  onTrash: a,
  closeOnSelect: b,
  readOnly: p = !1,
  theme: g,
  align: $,
  label: C,
  header: z,
  itemLabel: w,
  trigger: T,
  minItems: j = 1,
  itemRender: H,
  morph: N = !0,
  contentClassName: B
}) {
  const x = Ut(), P = Sn(), [D, M] = K(null), [F, W] = K(""), te = y(F);
  te.current = F;
  const ue = y(null), de = y(null);
  Y(() => {
    e && requestAnimationFrame(() => {
      var I, V;
      (V = (I = de.current) == null ? void 0 : I.querySelector('[data-active="1"]')) == null || V.scrollIntoView({ block: "nearest" });
    });
  }, [e]), Y(() => {
    var _;
    if (!e) return;
    const I = (v) => {
      var le, Se, _e;
      const L = v.target;
      if (L && L.closest("input, textarea, [contenteditable]")) {
        D && L === ue.current && (v.key === "Enter" ? (v.preventDefault(), v.stopImmediatePropagation(), pe()) : v.key === "Escape" && (v.preventDefault(), v.stopImmediatePropagation(), J()));
        return;
      }
      const oe = (le = de.current) == null ? void 0 : le.closest(".ui-menu");
      if (!oe || !oe.contains(v.target)) return;
      const ge = oe.ownerDocument, R = [...oe.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], U = [...oe.querySelectorAll('div:last-child > [role="menuitem"]')], ne = [...R, ...U];
      if (v.key === "ArrowDown" || v.key === "ArrowUp") {
        v.preventDefault(), v.stopImmediatePropagation();
        const se = ge.activeElement;
        let we = se ? ne.indexOf(se) : -1;
        if (we < 0 && se) {
          const xe = se.closest("[data-active]"), Ce = xe == null ? void 0 : xe.querySelector('[role="menuitem"]:first-child');
          Ce && (we = R.indexOf(Ce));
        }
        const be = v.key === "ArrowDown" ? 1 : -1, Ne = we < 0 ? be === 1 ? 0 : ne.length - 1 : (we + be + ne.length) % ne.length;
        (Se = ne[Ne]) == null || Se.focus({ preventScroll: !0 });
        return;
      }
      if (v.key === "ArrowLeft" || v.key === "ArrowRight") {
        const se = ge.activeElement, we = se == null ? void 0 : se.closest("[data-active]");
        if (!we) return;
        v.preventDefault(), v.stopImmediatePropagation();
        const be = [...we.querySelectorAll('[role="menuitem"]')].slice(1);
        if (be.length === 0) return;
        const Ne = se && we.contains(se) ? be.indexOf(se) : -1, xe = v.key === "ArrowRight" ? 1 : -1, Ce = Ne < 0 ? 0 : (Ne + xe + be.length) % be.length;
        (_e = be[Ce]) == null || _e.focus({ preventScroll: !0 });
        return;
      }
    }, V = ((_ = de.current) == null ? void 0 : _.ownerDocument) ?? null;
    return V == null || V.addEventListener("keydown", I, { capture: !0 }), () => V == null ? void 0 : V.removeEventListener("keydown", I, { capture: !0 });
  }, [e, D]), Y(() => {
    if (!D) return;
    const I = n.find((L) => L.id === D);
    I && !F && W(I.name);
    const V = requestAnimationFrame(() => {
      const L = ue.current;
      L && (L.focus(), L.select());
    });
    let _ = 0;
    const v = window.setInterval(() => {
      const L = ue.current;
      if (_++, !L || _ > 12) {
        clearInterval(v);
        return;
      }
      L.ownerDocument.activeElement !== L && (L.focus(), L.select());
    }, 50);
    return () => {
      cancelAnimationFrame(V), clearInterval(v);
    };
  }, [D]), Y(() => {
    if (D) {
      const I = n.find((V) => V.id === D);
      I && !F && W(I.name);
    }
  }, [D, n]);
  const me = (I, V) => {
    M(I), W(V);
  }, pe = () => {
    D && te.current.trim() && c(D, te.current.trim()), M(null);
  }, J = () => {
    M(null);
  }, ve = w || z.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ S(Tt, { open: e, onOpenChange: (I) => {
    I ? (M(null), W("")) : (D && F.trim() && c(D, F.trim()), M(null), W("")), (!I || !p) && t(I);
  }, width: "w-80", theme: g, align: $, trigger: T, morph: N, contentClassName: B, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${x.headerText}`, children: z }),
    /* @__PURE__ */ i("div", { ref: de, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((I) => {
      const V = I.id === r, _ = D === I.id;
      return /* @__PURE__ */ i("div", { "data-active": V ? "1" : void 0, className: `flex items-center gap-1 rounded ${V || _ ? x.rowActiveBg : x.rowHoverBg} ${D && !_ ? "opacity-40 pointer-events-none" : ""}`, children: _ ? /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i("div", { className: "flex-1 min-w-0 flex items-center", children: /* @__PURE__ */ i(
          "input",
          {
            ref: ue,
            autoFocus: !0,
            value: F,
            onChange: (v) => W(v.target.value),
            onKeyDown: (v) => {
              v.key === "Enter" && (v.preventDefault(), v.stopPropagation(), pe()), v.key === "Escape" && (v.preventDefault(), v.stopPropagation(), J());
            },
            className: "w-full outline-none bg-transparent placeholder:text-current placeholder:opacity-50",
            style: P
          }
        ) }),
        /* @__PURE__ */ i(
          ee.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${x.editConfirm}`,
            onSelect: (v) => {
              v.preventDefault(), pe();
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
            onSelect: (v) => {
              v.preventDefault(), J();
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
            style: P,
            className: `flex-1 min-w-0 rounded outline-none cursor-pointer flex items-center ${x.rowText} ${V ? "" : x.rowTextHover}`,
            onSelect: b ? () => {
              l(I.id);
            } : (v) => {
              v.preventDefault(), l(I.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${V ? x.rowActiveText : ""}`, children: H ? H(I) : I.name })
          }
        ),
        /* @__PURE__ */ i(
          ee.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${V ? x.btnActive : x.btnBase}`,
            onSelect: (v) => {
              v.preventDefault(), me(I.id, I.name);
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
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${V ? x.btnActive : x.btnBase}`,
            onSelect: (v) => {
              v.preventDefault();
              const L = o(I.id);
              L && me(L, `${I.name} Copy`);
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
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= j ? x.btnDisabled : V ? x.btnDangerActive : x.btnDanger}`,
            onSelect: (v) => {
              v.preventDefault(), f(I.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= j,
            children: /* @__PURE__ */ i(Mt, { className: x.btnIcon })
          }
        )
      ] }) }, I.id);
    }) }),
    /* @__PURE__ */ S("div", { className: `shrink-0 ${D ? "opacity-40 pointer-events-none" : ""}`, children: [
      m && /* @__PURE__ */ S(Oe, { children: [
        /* @__PURE__ */ i(ee.Separator, { className: x.separator }),
        /* @__PURE__ */ S(
          ee.Item,
          {
            className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
            onSelect: (I) => {
              I.preventDefault(), m();
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
      (u || d || s || a) && /* @__PURE__ */ i(ee.Separator, { className: x.separator }),
      u && /* @__PURE__ */ S(
        ee.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
          onSelect: (I) => {
            I.preventDefault();
            const V = u();
            V && me(V, "");
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
      d && /* @__PURE__ */ S(
        ee.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault} ui-row`,
          onSelect: (I) => {
            I.preventDefault(), d();
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
          onSelect: (I) => {
            I.preventDefault(), s();
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
          onSelect: (I) => {
            I.preventDefault(), a();
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
  selected: f = !1,
  rightAction: u,
  trailing: d
}) {
  En();
  const s = Ut(), m = Sn(), a = y(!1), b = y(null), { myIndex: p, highlighted: g, setPointer: $ } = Cn({
    label: () => Tn(c),
    activate: () => {
      n || e();
    },
    disabled: n
  }), { query: C } = zr(), z = C.trim() !== "" && p < 0, w = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ S(
    ee.Item,
    {
      ref: b,
      "data-ei": p >= 0 ? p : void 0,
      style: { ...m, display: z ? "none" : void 0 },
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${w} ${f ? "ui-item-selected" : ""} ${g ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${l}`,
      onSelect: (T) => {
        if (a.current) {
          a.current = !1;
          return;
        }
        o && T.preventDefault(), e();
      },
      onPointerEnter: () => {
        $(p);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: c }),
        d && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: d }),
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
  const { chain: f, setChain: u, morph: d, keyboardOpened: s, setKeyboardOpened: m } = Je(Vt), a = f.includes(e), b = f[f.length - 1] === e, p = En(), g = at(), $ = y(null), C = y(null), [z, w] = K(a), T = !a && z;
  Y(() => {
    a && w(!0);
  }, [a]);
  const j = () => u((_) => {
    const v = _.indexOf(e);
    return v >= 0 ? _.slice(0, v) : _;
  }), H = St(), N = Xt(), B = y(N);
  B.current = N;
  const x = y(null);
  Y(() => {
    var v;
    const _ = {
      label: t,
      activate: () => {
        m(e), u((L) => L.includes(e) ? L : [...L, e]);
      },
      submenu: !0
    };
    return x.current = _, (v = B.current) == null ? void 0 : v.register(_);
  }, []);
  const P = N && x.current ? N.items.indexOf(x.current) : -1, D = P >= 0 && P === N.highlightedIndex, M = G(() => {
    const _ = $.current;
    if (!_) return null;
    const v = _.getBoundingClientRect();
    return { left: v.left, top: v.top, width: v.width, height: v.height };
  }, []), F = qt({
    visible: a,
    morph: d,
    anchor: M,
    onClosed: () => w(!1)
  }), W = y(() => {
  }), te = y(() => {
  }), ue = y(() => {
  });
  Gt(a && b, H, W, {
    onCloseSub: () => {
      j(), N && P >= 0 && N.setHighlighted(P, "keyboard");
    }
  });
  const de = y(s);
  de.current = s, Y(() => {
    a && (de.current === e ? (H.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var _;
      return (_ = C.current) == null ? void 0 : _.focus();
    }), m(null)) : H.setHighlighted(-1, "keyboard"));
  }, [a]), Zt(a, te), Qt(a, H, W, C, !b, ue), We.useLayoutEffect(() => {
    var v;
    if (!a || H.highlightedIndex < 0) return;
    const _ = (v = C.current) == null ? void 0 : v.querySelector(`[data-ei="${H.highlightedIndex}"]`);
    _ == null || _.scrollIntoView({ block: "nearest" });
  }, [a, H.highlightedIndex]);
  const me = y(null), pe = G((_) => {
    var v;
    if (_) {
      _.addEventListener("keydown", W.current, { capture: !0 }), _.addEventListener("wheel", te.current, { passive: !1 });
      const L = _.ownerDocument;
      me.current = L, L.addEventListener("keydown", ue.current, { capture: !0 });
    } else
      (v = me.current) == null || v.removeEventListener("keydown", ue.current, { capture: !0 }), me.current = null;
    C.current = _, F(_);
  }, [F]), J = fe(), ve = { padding: `${k(8, 12, J)}px ${k(12, 16, J)}px`, fontSize: k(12, 14, J) }, I = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${D ? " ui-item-highlighted" : ""}${T ? " ui-sub-closing" : ""}`, V = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${o || ""}`;
  return /* @__PURE__ */ S(ee.Sub, { open: a || z, onOpenChange: (_) => u((v) => {
    if (!_) {
      const L = v.indexOf(e);
      return L >= 0 ? v.slice(0, L) : v;
    }
    return v.includes(e) ? v : [...v, e];
  }), children: [
    /* @__PURE__ */ S(
      ee.SubTrigger,
      {
        ref: $,
        "data-ei": P >= 0 ? P : void 0,
        style: ve,
        className: I,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          N && P >= 0 && N.setHighlighted(P, "pointer");
        },
        onPointerDown: (_) => {
          _.pointerType === "pen" && (_.preventDefault(), u((v) => a ? v.slice(0, v.indexOf(e)) : [...v, e]));
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
        ref: pe,
        "data-theme": p,
        className: V,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: H.pointerLeave,
        children: /* @__PURE__ */ i(dt.Provider, { value: H, children: c })
      }
    ) })
  ] });
}
const it = 8, Ii = ({ open: e, x: t, y: n, onClose: r, children: l, containerRef: c, morph: o = !0 }) => {
  const f = fe(), u = k(12, 14, f), d = y(null), s = et(), [m, a] = K(!1), [b, p] = K([]), [g, $] = K(null), C = St();
  Y(() => {
    if (e)
      return C.setHighlighted(-1, "keyboard"), $n(r);
  }, [e, r]);
  const z = y({ left: t, top: n });
  e && (z.current = { left: t, top: n });
  const w = G(() => ({ left: z.current.left, top: z.current.top, width: 0, height: 0 }), []), T = qt({
    visible: !0,
    morph: o,
    anchor: w,
    cloneOnUnmount: !0
  }), j = y(() => {
  }), H = y(() => {
  }), N = y(() => {
  });
  Gt(e, C, j), Zt(e, H), Qt(e, C, j, d, b.length > 0, N);
  const B = y(null), x = G((M) => {
    var F;
    if (M) {
      M.addEventListener("keydown", j.current, { capture: !0 }), M.addEventListener("wheel", H.current, { passive: !1 });
      const W = M.ownerDocument;
      B.current = W, W.addEventListener("keydown", N.current, { capture: !0 });
    } else
      (F = B.current) == null || F.removeEventListener("keydown", N.current, { capture: !0 }), B.current = null;
    d.current = M, a(!!M), T(M);
  }, [T]), [P, D] = K(null);
  return Ee(() => {
    var I;
    if (!e || !m || !d.current) return;
    const M = d.current, F = M.offsetWidth, W = M.offsetHeight, te = (I = c == null ? void 0 : c.current) == null ? void 0 : I.getBoundingClientRect(), ue = te ? te.right : (s == null ? void 0 : s.innerWidth) ?? 0, de = te ? te.bottom : (s == null ? void 0 : s.innerHeight) ?? 0, me = te ? te.left : 0, pe = te ? te.top : 0;
    let J = Math.max(pe + it, z.current.top), ve = Math.max(me + it, z.current.left);
    ve + F > ue && (ve = ue - F - it), J + W > de && (J = Math.max(pe + it, de - W - it)), D({ left: ve, top: J });
  }, [e, m, t, n, c]), e ? /* @__PURE__ */ S(ee.Root, { open: e, onOpenChange: (M) => {
    M || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(ee.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(ee.Portal, { children: /* @__PURE__ */ i(jt.Provider, { value: "light", children: /* @__PURE__ */ i(Vt.Provider, { value: { chain: b, setChain: p, morph: o, keyboardOpened: g, setKeyboardOpened: $ }, children: /* @__PURE__ */ i(dt.Provider, { value: C, children: /* @__PURE__ */ i(
      ee.Content,
      {
        ref: x,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: u, left: (P == null ? void 0 : P.left) ?? z.current.left, top: (P == null ? void 0 : P.top) ?? z.current.top, touchAction: "manipulation" },
        onPointerLeave: C.pointerLeave,
        children: l
      }
    ) }) }) }) })
  ] }) : null;
}, Oi = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: l = !1, trailing: c, children: o }) => {
  const f = fe(), u = { padding: `${k(8, 12, f)}px ${k(12, 16, f)}px`, fontSize: k(12, 14, f) }, d = Xt(), s = y(d);
  s.current = d;
  const m = y(null);
  Y(() => {
    var g;
    const p = { label: Tn(o), activate: () => {
      r || e();
    } };
    return m.current = p, (g = s.current) == null ? void 0 : g.register(p);
  }, []);
  const a = d && m.current ? d.items.indexOf(m.current) : -1, b = !r && a >= 0 && a === d.highlightedIndex;
  return /* @__PURE__ */ S(
    ee.Item,
    {
      "data-ei": a >= 0 ? a : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && d && a >= 0 && d.setHighlighted(a, "pointer");
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
  onReset: f,
  morph: u = !0,
  flat: d = !1,
  closable: s = !0,
  dismissOnBackdrop: m = !0
}) {
  const a = y(null), b = y(null), p = y(null), g = fe(), $ = k(20, 24, g), C = k(10, 12, g), z = k(12, 14, g), w = k(14, 16, g), T = k(20, 24, g), j = k(20, 24, g), H = k(20, 24, g), N = k(14, 16, g), B = k(16, 20, g), x = k(10, 12, g), P = k(12, 14, g), D = k(8, 10, g), M = k(4, 6, g), F = { padding: `${C}px ${$}px` }, W = { fontSize: z }, te = { padding: `${j}px ${T}px 16px ${T}px` }, ue = { fontSize: w }, de = { padding: `0 ${T}px 16px` }, me = { padding: `${H}px ${T}px` }, pe = { fontSize: x, padding: `${M}px ${D}px` }, [J, ve] = K(!1), I = G((h) => {
    a.current = h, ve(h !== null);
  }, []), V = at(), _ = et(), v = y(_);
  v.current = _;
  const [L, oe] = K(null), ge = y(null), R = y(!1), U = y(!1), ne = y(0), le = y({ w: 0, h: 0 }), Se = y(!1), [_e, se] = K(!1), [we, be] = K(!1), Ne = y(0), xe = y(!1), [Ce, tt] = K(!1), ht = y(u);
  ht.current = u;
  const mt = y(!1), nt = y(!1), He = () => {
    nt.current = !0, se(!0);
  }, De = () => {
    nt.current = !1, se(!1);
  };
  Y(() => {
    e || (oe(null), Se.current = !1, R.current = !1, be(!1));
  }, [e]), Ee(() => {
    if (!e || Se.current || !J || !a.current) return;
    Se.current = !0;
    const h = a.current.getBoundingClientRect(), A = v.current ?? null, O = (A == null ? void 0 : A.innerWidth) ?? 0, X = Ie(A);
    oe({
      left: Math.max(Z, Math.min((O - h.width) / 2, O - h.width - Z)),
      top: Math.max(X.top + Z, Math.min(X.top + (X.height - h.height) / 2, X.bottom - h.height - Z))
    });
  }, [e, J]), Ee(() => {
    if (!e || !J || !u || Xe() || !a.current) return;
    const h = a.current, A = Dt(h), O = A[A.length - 1];
    He(), O ? an(Ne, h, O.getBoundingClientRect(), De) : Sr(Ne, h, De);
  }, [e, J]);
  const Be = G(() => {
    if (!s || xe.current) return;
    const h = a.current, A = !!h && Dt(h).length > 0;
    if (!h || !u || Xe() || A) {
      t();
      return;
    }
    xe.current = !0, tt(!0), mt.current = !0, He(), un(Ne, h, () => {
      xe.current = !1, tt(!1), De(), t();
    });
  }, [u, t, s]), qe = G(() => {
    const h = a.current;
    if (!h || mt.current || !ht.current || Xe() || Dt(h).length > 0) return;
    const A = h.ownerDocument, O = h.cloneNode(!0);
    O.removeAttribute("data-modal-stack"), O.removeAttribute("data-state"), O.removeAttribute("role"), O.removeAttribute("data-aria-hidden"), O.removeAttribute("tabindex"), O.setAttribute("aria-hidden", "true"), O.style.pointerEvents = "none", A.body.appendChild(O), un({ current: 0 }, O, () => {
      O.isConnected && O.remove();
    });
  }, []);
  Ee(() => () => qe(), [qe]);
  const Fe = y(e);
  Ee(() => {
    const h = Fe.current;
    Fe.current = e, h && !e && qe();
  }, [e, J, qe]), Y(() => {
    if (!e || !J || !u || !a.current) return;
    const h = a.current, A = h.parentNode;
    if (!A) return;
    let O = 0, X = null, Q = !1;
    const ie = () => {
      O = 0;
      const ae = gt(h);
      if (ae.length > 0)
        h.style.opacity = "", h.style.pointerEvents = "", X = ae[ae.length - 1].getBoundingClientRect(), Q = !0, O = requestAnimationFrame(ie);
      else if (Q) {
        Q = !1, X && !Xe() && (He(), an(Ne, h, X, De)), X = null;
        const ye = v.current ?? null;
        ye == null || ye.setTimeout(() => {
          !h || !h.isConnected || getComputedStyle(h).opacity !== "1" && (h.style.opacity = "1", h.style.pointerEvents = "");
        }, 240);
      }
    }, ce = new MutationObserver(() => {
      !O && gt(h).length > 0 && (O = requestAnimationFrame(ie));
    });
    return ce.observe(A, { childList: !0 }), () => {
      ce.disconnect(), O && cancelAnimationFrame(O);
    };
  }, [e, J]), Y(() => {
    if (!J || !u || Xe() || !a.current) return;
    const h = a.current;
    let A = Math.round(h.getBoundingClientRect().height), O = !1;
    const X = new ResizeObserver(() => {
      if (!h.isConnected) return;
      const Q = Math.round(h.getBoundingClientRect().height);
      if (!O) {
        O = !0, A = Q;
        return;
      }
      if (Math.abs(Q - A) < 1) return;
      if (ge.current || xe.current || gt(h).length > 0) {
        A = Q;
        return;
      }
      if (nt.current) return;
      const ie = A;
      A = Q, He();
      const ce = h.getBoundingClientRect(), ae = Ie(v.current ?? null), ye = !R.current && !U.current, Ue = ye ? ae.top + (ae.height - ie) / 2 : ce.top, $e = ye ? ae.top + (ae.height - Q) / 2 : ce.top;
      h.style.transition = "none", h.style.height = `${ie}px`, ye && (h.style.top = `${Ue}px`), b.current && (b.current.style.overflow = "hidden"), h.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          h.style.height === `${ie}px` && (h.style.transition = `height ${Ae}ms ${lt}${ye ? `, top ${Ae}ms ${lt}` : ""}`, h.style.height = `${Q}px`, ye && (h.style.top = `${$e}px`), window.setTimeout(() => {
            h.style.height === `${Q}px` && (h.style.transition = "", h.style.height = "", b.current && (b.current.style.overflow = ""), ye && oe({ left: ce.left, top: $e }), De());
          }, Ae + 60));
        });
      });
    });
    return X.observe(h), () => X.disconnect();
  }, [J]), Y(() => {
    if (!J || !a.current || u && !Xe()) return;
    const h = a.current, A = new ResizeObserver(() => {
      if (!h.isConnected || ge.current || xe.current || U.current || gt(h).length > 0) return;
      const O = v.current ?? null, X = Ie(O), Q = (O == null ? void 0 : O.innerWidth) ?? 0, ie = h.getBoundingClientRect(), ce = Math.max(X.top + Z, Math.min(ie.top, X.bottom - ie.height - Z)), ae = Math.max(Z, Math.min(ie.left, Q - ie.width - Z));
      (Math.abs(ce - ie.top) > 0.5 || Math.abs(ae - ie.left) > 0.5) && oe({ left: ae, top: ce });
    });
    return A.observe(h), () => A.disconnect();
  }, [J, u]);
  const je = G(() => {
    const h = a.current;
    if (!h) return null;
    const A = h.getBoundingClientRect();
    return { left: A.left, top: A.top, width: A.width, height: A.height };
  }, []), Te = G((h, A) => {
    const O = v.current ?? null, X = (O == null ? void 0 : O.innerWidth) ?? 0, Q = Ie(O), ie = je(), ce = ie ? ie.width : Math.min(X - Z * 2, 576), ae = ie ? ie.height : Math.min(Q.height - Z * 2, 400);
    return {
      left: Math.max(Z, Math.min(h, X - ce - Z)),
      top: Math.max(Q.top + Z, Math.min(A, Q.bottom - ae - Z))
    };
  }, [je]);
  Y(() => {
    if (!e) return;
    const h = v.current ?? null, A = (h == null ? void 0 : h.visualViewport) ?? null;
    if (!h || !A) return;
    const O = 120;
    U.current = !1, le.current = { w: h.innerWidth, h: h.innerHeight };
    let X = 0;
    const Q = () => {
      if (xe.current || ge.current) return;
      const ce = (h == null ? void 0 : h.innerHeight) ?? 0, ae = (h == null ? void 0 : h.innerWidth) ?? 0, Ue = Ie(h).height < ce - O, $e = ce < le.current.h - O && ae === le.current.w;
      Ue || $e ? (U.current = !0, ne.current && (clearTimeout(ne.current), ne.current = 0)) : ne.current || (ne.current = (h == null ? void 0 : h.setTimeout(() => {
        U.current = !1, ne.current = 0, be(!1);
      }, 600)) ?? 0), be(U.current), !X && (X = requestAnimationFrame(() => {
        var sn;
        X = 0;
        const nn = a.current;
        if (!nn) return;
        const Ke = Ie(v.current ?? null), Re = nn.getBoundingClientRect(), rn = ((sn = v.current) == null ? void 0 : sn.innerWidth) ?? 0, Rt = (h == null ? void 0 : h.innerHeight) ?? 0, Hn = Ke.height < Rt - O || Rt < le.current.h - O && (h == null ? void 0 : h.innerWidth) === le.current.w;
        le.current = { w: (h == null ? void 0 : h.innerWidth) ?? 0, h: Rt };
        const pt = Re.top >= Ke.top + Z && Re.bottom <= Ke.bottom - Z, on = () => {
          oe({
            left: Math.max(Z, Math.min((rn - Re.width) / 2, rn - Re.width - Z)),
            top: Math.max(Ke.top + Z, Math.min(Ke.top + (Ke.height - Re.height) / 2, Ke.bottom - Re.height - Z))
          });
        };
        if (Hn && !he) {
          if (R.current) {
            pt || oe(Te(Re.left, Re.top));
            return;
          }
          if (pt) return;
          on();
          return;
        }
        if (!U.current) {
          if (R.current) {
            pt || oe(Te(Re.left, Re.top));
            return;
          }
          pt || on();
        }
      }));
    };
    A.addEventListener("resize", Q), A.addEventListener("scroll", Q);
    const ie = () => {
      xe.current || ge.current || X || (X = requestAnimationFrame(() => {
        X = 0;
        const ce = a.current;
        if (!ce) return;
        const ae = v.current ?? null, ye = Ie(ae), Ue = (ae == null ? void 0 : ae.innerWidth) ?? 0, $e = ce.getBoundingClientRect();
        if (R.current) {
          oe(Te($e.left, $e.top));
          return;
        }
        oe({
          left: Math.max(Z, Math.min((Ue - $e.width) / 2, Ue - $e.width - Z)),
          top: Math.max(ye.top + Z, Math.min(ye.top + (ye.height - $e.height) / 2, ye.bottom - $e.height - Z))
        });
      }));
    };
    return h.addEventListener("orientationchange", ie), () => {
      A.removeEventListener("resize", Q), A.removeEventListener("scroll", Q), h.removeEventListener("orientationchange", ie), X && cancelAnimationFrame(X), ne.current && clearTimeout(ne.current);
    };
  }, [e, Te]);
  const E = G((h) => {
    if (h.target.closest("button")) return;
    R.current = !0;
    const A = je();
    A && (oe(Te(A.left, A.top)), ge.current = { startX: h.clientX, startY: h.clientY, posX: A.left, posY: A.top }, h.target.setPointerCapture(h.pointerId));
  }, [je, Te]), q = G((h) => {
    const A = ge.current;
    A && (h.preventDefault(), oe(Te(A.posX + h.clientX - A.startX, A.posY + h.clientY - A.startY)));
  }, [Te]), re = G(() => {
    ge.current = null;
  }, []), ke = ge.current !== null, Me = G(() => {
    R.current = !1;
    const h = v.current ?? null, A = Ie(h), O = (h == null ? void 0 : h.innerWidth) ?? 0, X = a.current, Q = X ? X.getBoundingClientRect() : { width: 0, height: 0 };
    oe({
      left: Math.max(Z, Math.min((O - Q.width) / 2, O - Q.width - Z)),
      top: Math.max(A.top + Z, Math.min(A.top + (A.height - Q.height) / 2, A.bottom - Q.height - Z))
    });
  }, []), rt = y(0), Jt = G(() => {
    const h = Date.now();
    h - rt.current < 300 ? (rt.current = 0, Me()) : rt.current = h;
  }, [Me]), en = L !== null, In = en ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", On = `${l ? `${l} w-full` : "max-w-xl w-full"}`, tn = {
    ...en ? { left: L.left, top: L.top } : {},
    width: `min(100%, calc(100dvw - ${Z * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...we ? {} : { maxHeight: `calc(100dvh - ${Z * 2}px)` }
  }, _n = G((h) => {
    if (h.key !== "Enter" || h.shiftKey || h.metaKey || h.ctrlKey || h.altKey) return;
    const A = h.target, O = p.current;
    if (!(!!A.closest("[data-modal-close]") || !!O && O.contains(A) && !!A.closest('button, a, [role="button"]')) && A.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !O) return;
    const Q = Array.from(O.querySelectorAll("button[data-modal-confirm]")), ie = Q.length > 0 ? Q : Array.from(O.querySelectorAll("button")), ce = ie[ie.length - 1];
    !ce || ce.disabled || (h.preventDefault(), ce.click());
  }, []);
  return /* @__PURE__ */ i(Pe.Root, { open: e, onOpenChange: (h) => {
    h || Be();
  }, children: /* @__PURE__ */ S(Pe.Portal, { container: V ?? void 0, children: [
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
        ref: I,
        onKeyDown: _n,
        onInteractOutside: (h) => {
          m || h.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${In} ${On}`,
        style: { touchAction: "manipulation", ...Object.keys(tn).length > 0 ? tn : {} },
        children: [
          d ? /* @__PURE__ */ S(
            "div",
            {
              style: te,
              className: `flex items-center justify-between ${ke ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (h) => {
                _e || E(h);
              },
              onPointerMove: q,
              onPointerUp: re,
              onClick: Jt,
              children: [
                /* @__PURE__ */ i(Pe.Title, { style: ue, className: "font-bold text-white truncate", children: n }),
                s && /* @__PURE__ */ i(Pe.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: B, height: B } }) })
              ]
            }
          ) : /* @__PURE__ */ S(
            "div",
            {
              style: F,
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
                  f && /* @__PURE__ */ S("button", { onClick: f, style: pe, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ i(bn, { style: { width: P, height: P } }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(Pe.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: N, height: N } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: b, style: d ? de : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: o }),
          c && /* @__PURE__ */ i("div", { ref: p, style: d ? me : void 0, className: d ? "" : "shrink-0", children: d ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: c }) : c })
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
function Lr({ checked: e, onChange: t, disabled: n = !1, label: r, id: l, className: c = "", labelClassName: o = "", theme: f, variant: u = "pill", tone: d = "accent", block: s = !1 }) {
  const m = u !== "plain", a = fe(), b = k(16, 20, a), p = k(12, 14, a), g = k(12, 14, a), $ = k(12, 16, a), C = k(10, 12, a), z = k(8, 10, a);
  return /* @__PURE__ */ S(
    "label",
    {
      className: `ui-checkbox ${m ? "ui-checkbox-pill rounded-lg" : ""} ${d === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${c}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: z, padding: m ? `${C}px ${$}px` : void 0 },
      onClick: (T) => T.stopPropagation(),
      ...f ? { "data-theme": f } : {},
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
        m ? /* @__PURE__ */ i(An, { checked: e, size: b, tone: d }) : /* @__PURE__ */ i("span", { className: "ui-checkbox-box", style: { width: b, height: b }, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${o}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function Fi(e = "md") {
  const t = he && xn() > 0;
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
  const [t, n] = K(null), [r, l] = K(!1), c = y(null), o = fe(), f = k(16, 20, o), u = k(12, 14, o), d = Ar(), s = y(t);
  s.current = t;
  const m = G(() => {
    const z = s.current;
    z && (z.kind === "confirm" ? z.resolve(!1) : z.kind === "prompt" ? z.resolve(null) : z.resolve());
  }, []), a = G((z) => {
    if (z.suppressKey) {
      const w = localStorage.getItem(z.suppressKey);
      if (w && Date.now() < parseInt(w, 10))
        return Promise.resolve(!0);
    }
    return new Promise((w) => {
      m(), l(!1), n({ kind: "confirm", options: z, resolve: w });
    });
  }, [m]), b = G((z) => new Promise((w) => {
    m(), n({ kind: "prompt", options: z, resolve: w });
  }), [m]), p = G((z) => new Promise((w) => {
    m(), n({ kind: "alert", options: z, resolve: w });
  }), [m]);
  Y(() => {
    if (t) {
      const z = setTimeout(() => {
        var w;
        return (w = c.current) == null ? void 0 : w.focus();
      }, 50);
      return () => clearTimeout(z);
    }
  }, [t]);
  const g = G(() => {
    var z, w;
    if (t) {
      if (t.kind === "confirm") {
        const T = t.options;
        T.suppressKey && r && localStorage.setItem(T.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((w = (z = c.current) == null ? void 0 : z.value) == null ? void 0 : w.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), $ = t !== null;
  Y(() => {
    if (!$) return;
    const z = (w) => {
      w.key !== "Enter" || w.shiftKey || w.metaKey || w.ctrlKey || w.altKey || w.isComposing || (w.preventDefault(), w.stopImmediatePropagation(), g());
    };
    return document.addEventListener("keydown", z, !0), () => document.removeEventListener("keydown", z, !0);
  }, [$, g]);
  const C = G(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ S(Mn.Provider, { value: { confirm: a, prompt: b, alert: p }, children: [
    e,
    $ && /* @__PURE__ */ i(
      Tr,
      {
        open: !0,
        onClose: C,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ S(Oe, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(bt, { variant: "ghost", onClick: C, children: "Cancel" }),
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
        children: /* @__PURE__ */ S("div", { className: "flex flex-col", style: { gap: f }, children: [
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
              style: d,
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
    const f = o - l, u = Math.min(f / t, 1);
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
  const [o, f] = K(null), u = yn(), d = y(null), s = y(null), m = y({ x: 0, y: 0, target: null }), a = y(!1), b = Math.min(Pr, n * 0.5), p = y(l);
  p.current = l;
  const g = y(c);
  return g.current = c, Y(() => {
    if (!he || !u) return;
    const $ = (T) => {
      if (!Pt(T.pointerType) || T.button !== 0) return;
      const j = T.target;
      if (!j.closest(r) || (p.current ? !p.current(j) : Hr(j))) return;
      const H = T.clientX, N = T.clientY;
      m.current = { x: H, y: N, target: T.target }, a.current = !0, t && (s.current = setTimeout(() => f({ x: H, y: N }), b)), d.current = setTimeout(() => {
        if (!a.current) return;
        s.current && (clearTimeout(s.current), s.current = null), f(null);
        const B = m.current.target;
        if (!B) return;
        const x = g.current;
        if (x) {
          x(B, H, N);
          return;
        }
        const P = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: H,
          clientY: N,
          button: 2,
          view: window
        });
        B.dispatchEvent(P);
      }, n);
    }, C = (T) => {
      if (!a.current || d.current === null) return;
      const j = T.clientX - m.current.x, H = T.clientY - m.current.y;
      Math.sqrt(j * j + H * H) > Ir && (clearTimeout(d.current), d.current = null, s.current && (clearTimeout(s.current), s.current = null), a.current = !1, f(null));
    }, z = () => {
      d.current !== null && (clearTimeout(d.current), d.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), a.current = !1, f(null);
    }, w = (T) => {
      Pt(T.pointerType) && (d.current !== null && (clearTimeout(d.current), d.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), a.current = !1, f(null));
    };
    return u == null || u.addEventListener("pointerdown", $), u.addEventListener("pointermove", C), u.addEventListener("pointerup", z), u.addEventListener("pointercancel", z), u.addEventListener("pointerleave", w), () => {
      u.removeEventListener("pointerdown", $), u.removeEventListener("pointermove", C), u.removeEventListener("pointerup", z), u == null || u.removeEventListener("pointercancel", z), u == null || u.removeEventListener("pointerleave", w), d.current !== null && clearTimeout(d.current), s.current !== null && clearTimeout(s.current);
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
  const f = Ye({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), u = Ye({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), d = Ye({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), s = "", m = "", a = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", b = {
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
  }, $ = `${m} bg-blue-950 hover:bg-blue-900 text-white`, C = "bg-blue-900!", z = o["data-state"] === "open", w = g[t][e], T = e === "primary" ? u : e.startsWith("tab") ? d : f, j = k(6, 8, fe()), H = t === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let N;
  if (e === "tab") {
    const B = b[t];
    N = r ? n ? B.cloudActive : B.active : n ? B.cloudInactive : B.inactive;
  } else e === "tab-header" ? N = `${r ? n ? p.cloudActive : p.active : n ? p.cloudInactive : p.inactive} ${z ? n ? p.cloudOpen : p.open : ""}` : (N = `${w.base} ${z ? w.open : ""}`, r && (N = `${N} ${H}`), e === "primary" && t === "light" && n && (N = z ? `${$} ${C}` : $));
  return /* @__PURE__ */ i("button", { type: c, className: `${a} ${N} ${l}`, style: { ...T, gap: j }, ...o });
}
const Br = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Fr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Lt = 1900, At = 2100;
function Kr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Yr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Ui({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: l = "", initialView: c }) {
  const o = /* @__PURE__ */ new Date(), f = (() => {
    if (!c) return o;
    const R = /* @__PURE__ */ new Date(c + "T00:00:00");
    return isNaN(R.getTime()) ? o : R;
  })(), [u, d] = K(f.getFullYear()), [s, m] = K(f.getMonth()), [a, b] = K("days"), [p, g] = K(null), $ = st(() => new Set(e), [e]), C = (R) => {
    $.has(R) ? t(e.filter((U) => U !== R)) : t([...e, R]);
  }, z = st(() => {
    const R = Kr(u, s), U = new Date(u, s, 1).getDay(), ne = [];
    for (let le = 0; le < U; le++) ne.push({ key: `pad-${le}`, day: 0, empty: !0 });
    for (let le = 1; le <= R; le++) ne.push({ key: Yr(u, s, le), day: le, empty: !1 });
    return ne;
  }, [u, s]), w = (R) => d((U) => Math.max(Lt, Math.min(At, U + R))), T = (R) => {
    s + R < 0 ? (d((U) => Math.max(Lt, U - 1)), m(11)) : s + R > 11 ? (d((U) => Math.min(At, U + 1)), m(0)) : m((U) => U + R);
  }, j = () => {
    if (p === null) return;
    const R = parseInt(p, 10);
    !isNaN(R) && R >= Lt && R <= At && d(R), g(null);
  }, H = (R) => e.some((U) => U.startsWith(`${u}-${String(R + 1).padStart(2, "0")}`)), N = n === "dark", B = fe(), x = k(4, 8, B), P = k(16, 20, B), D = k(10, 11, B), M = k(6, 8, B), F = k(12, 14, B), W = k(6, 10, B), te = k(12, 14, B), ue = k(8, 12, B), de = k(10, 12, B), me = k(6, 10, B), pe = k(2, 6, B), J = k(64, 80, B), ve = { padding: x }, I = { width: P, height: P }, V = { fontSize: D, paddingTop: M, paddingBottom: M }, _ = { fontSize: F, paddingTop: W, paddingBottom: W }, v = { fontSize: te, paddingTop: ue, paddingBottom: ue }, L = { fontSize: de, padding: `${pe}px ${me}px` }, oe = N ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ge = N ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ S("div", { className: `border rounded-lg overflow-hidden w-full ${N ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${l}`, children: [
    /* @__PURE__ */ S("div", { className: `flex items-center justify-between px-3 py-2 border-b ${N ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => a === "months" ? w(-1) : T(-1),
          style: ve,
          className: `rounded transition-colors ${N ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": a === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(Wn, { style: I })
        }
      ),
      a === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => b("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${N ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(u, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(u),
          onChange: (R) => g(R.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (R) => R.target.select(),
          onBlur: j,
          onKeyDown: (R) => {
            R.key === "Enter" && (R.preventDefault(), j()), R.key === "Escape" && g(null);
          },
          style: { width: J },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${N ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => a === "months" ? w(1) : T(1),
          style: ve,
          className: `rounded transition-colors ${N ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": a === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(zt, { style: I })
        }
      )
    ] }),
    a === "months" ? /* @__PURE__ */ S("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Fr.map((R, U) => /* @__PURE__ */ S(
        "button",
        {
          type: "button",
          onClick: () => {
            m(U), b("days");
          },
          style: v,
          className: `relative font-medium transition-colors border-b ${U === s ? oe : ge} ${N ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            R,
            H(U) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${U === s ? "bg-white" : N ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        R
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${N ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            d(o.getFullYear()), m(o.getMonth()), b("days");
          },
          style: { paddingTop: W, paddingBottom: W, fontSize: F },
          className: `px-3 font-semibold rounded transition-colors ${N ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ S("div", { className: "grid grid-cols-7 text-center", children: [
      Br.map((R) => /* @__PURE__ */ i("div", { style: V, className: `font-semibold uppercase tracking-wider border-b ${N ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: R }, R)),
      z.map((R) => R.empty ? /* @__PURE__ */ i("div", {}, R.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => C(R.key),
          style: _,
          className: `font-medium transition-colors border-b ${N ? "border-zinc-800/60" : "border-zinc-50"} ${$.has(R.key) ? oe : N ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: R.day
        },
        R.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ S("div", { className: `px-3 py-2 border-t ${N ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ S("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((R) => {
        const U = /* @__PURE__ */ new Date(R + "T00:00:00"), ne = U.getFullYear() === o.getFullYear() ? U.toLocaleString("default", { month: "short", day: "numeric" }) : U.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ S(
          "button",
          {
            type: "button",
            onClick: () => C(R),
            "aria-label": `Remove ${ne}`,
            style: L,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${N ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              ne,
              /* @__PURE__ */ i("span", { className: `leading-none ${N ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          R
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
  emptyHint: f = "Nothing here",
  maxHeight: u,
  disabled: d = !1,
  theme: s,
  className: m = ""
}) {
  const a = (w) => t instanceof Set ? t.has(w) : t.includes(w), b = fe(), p = k(12, 16, b), g = k(8, 12, b), $ = k(12, 14, b), C = k(16, 20, b), z = r != null || l != null;
  return /* @__PURE__ */ S("div", { className: m, ...s ? { "data-theme": s } : {}, children: [
    z && /* @__PURE__ */ S("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      l != null && /* @__PURE__ */ i("button", { type: "button", disabled: d, onClick: l, className: "ui-checklist-toggleall", children: o ?? (c ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ S(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: u ? { maxHeight: u, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const T = a(w.id);
            return /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(w.id),
                className: `ui-checklist-item ${T ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${g}px ${p}px`, fontSize: $ },
                children: [
                  /* @__PURE__ */ i(An, { checked: T, size: C }),
                  w.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: w.secondary })
                ]
              },
              w.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: f })
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
  disabled: f = !1,
  theme: u,
  className: d = ""
}) {
  const s = fe(), m = o ? 10 : k(12, 16, s), a = o ? 6 : k(8, 12, s), b = o ? 12 : k(12, 14, s), p = o ? 14 : k(16, 20, s);
  return /* @__PURE__ */ S("div", { className: d, ...u ? { "data-theme": u } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ S(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((g) => {
            const $ = t === g.id;
            return /* @__PURE__ */ S(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(g.id),
                className: `ui-checklist-item ${$ ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${a}px ${m}px`, fontSize: b },
                children: [
                  /* @__PURE__ */ i("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: $ && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
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
  const o = et(), { refs: f, floatingStyles: u } = Gn({
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
        fn: (d) => {
          var z;
          if (l !== "visible") return {};
          const s = (z = d.elements.floating.ownerDocument) == null ? void 0 : z.defaultView;
          if (!s) return {};
          const m = d.rects.reference, a = Math.max(m.x, 0), b = Math.max(m.y, 0), p = Math.min(m.x + m.width, s.innerWidth), g = Math.min(m.y + m.height, s.innerHeight);
          if (p <= a || g <= b) return {};
          const $ = r === "left" ? p - (m.x + m.width) : r === "right" ? a - m.x : 0, C = r === "top" ? b - m.y : r === "bottom" ? g - (m.y + m.height) : 0;
          return { x: d.x + $, y: d.y + C };
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
        fn: (d) => {
          var g;
          const s = (g = d.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!s) return {};
          const m = d.rects.floating.width, a = d.rects.floating.height, b = Math.max(8, Math.min(d.x, s.innerWidth - m - 8)), p = Math.max(8, Math.min(d.y, s.innerHeight - a - 8));
          return { x: b, y: p };
        }
      }
    ],
    whileElementsMounted: Qn
  });
  return Ee(() => {
    n && f.setReference(n);
  }, [n, f]), /* @__PURE__ */ S(Oe, { children: [
    !n && /* @__PURE__ */ i("div", { ref: f.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    o && Bt(
      /* @__PURE__ */ i(
        "div",
        {
          ref: f.setFloating,
          className: `ui-chrome ${e}`,
          style: u,
          onMouseDown: (d) => d.stopPropagation(),
          onClick: (d) => d.stopPropagation(),
          onDragStart: (d) => d.preventDefault(),
          children: t
        }
      ),
      o.document.body
    )
  ] });
}, ot = ({ content: e, children: t }) => {
  const n = fe(), r = k(10, 12, n), l = k(6, 6, n), c = k(10, 12, n), o = { padding: `${l}px ${r}px`, fontSize: c }, f = at(), u = et(), [d, s] = K(!1), [m, a] = K({ x: 0, y: 0 }), b = y(null), p = y(null), g = () => {
    if (!b.current) return;
    const $ = b.current.getBoundingClientRect();
    a({ x: $.left + $.width / 2, y: $.top });
  };
  return Y(() => () => {
    p.current && clearTimeout(p.current);
  }, []), Y(() => (d && u && (g(), u.addEventListener("scroll", g, !0)), () => u == null ? void 0 : u.removeEventListener("scroll", g, !0)), [d]), /* @__PURE__ */ S(
    "div",
    {
      ref: b,
      className: "inline-flex",
      onMouseEnter: () => {
        p.current && clearTimeout(p.current), g(), s(!0);
      },
      onMouseLeave: () => {
        p.current = setTimeout(() => s(!1), 150);
      },
      children: [
        t,
        d && Bt(
          /* @__PURE__ */ S(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white pointer-events-none",
              style: { ...o, left: m.x, top: m.y - 4, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map(($, C) => /* @__PURE__ */ i("div", { className: C > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: $ }, C)),
                /* @__PURE__ */ i("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          f ?? document.body
        )
      ]
    }
  );
};
function ft() {
  const e = fe(), t = he, n = t ? k(28, 40, e) : 28, r = t ? k(28, 40, e) : 28, l = t ? k(10, 14, e) : 10, c = t ? k(10, 14, e) : 10, o = t ? k(8, 10, e) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${l}px`, fontSize: c },
    input: { height: r, padding: `0 ${o}px`, fontSize: c }
  };
}
const Qi = he ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Wr = he ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", yt = he ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", qr = "hover:bg-red-950/50", Zi = he ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ji = "bg-blue-900/50 border-blue-700 text-blue-300", eo = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", jr = he ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", to = he ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", wt = he ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ur = "inline-flex rounded overflow-hidden border border-zinc-700", no = he ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", xt = ({ onClick: e, disabled: t, title: n, className: r = Wr, children: l }) => {
  const c = ft();
  return /* @__PURE__ */ i(ot, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, style: c.control, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: l }) });
}, ro = ({ value: e, options: t, onChange: n, disabled: r, active: l }) => {
  const c = ft();
  return /* @__PURE__ */ i("div", { className: Ur, children: t.map((o) => {
    const f = l ? l(o.v) : e === o.v;
    return /* @__PURE__ */ i(
      "button",
      {
        disabled: r,
        onClick: () => n(o.v),
        style: c.control,
        className: `font-medium transition-colors disabled:opacity-30 ${f ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${o.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
        children: o.l
      },
      o.v
    );
  }) });
}, io = ({ children: e }) => /* @__PURE__ */ S("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: he ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
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
    const f = document.createDocumentFragment();
    for (const u of Array.from(t.childNodes)) f.appendChild(_t(u));
    return f;
  };
  if (!Gr.has(n)) return r();
  if (n === "a") {
    const f = t.getAttribute("href") || "";
    if (!Zr.test(f)) return r();
  }
  const l = document.createElement(n), c = t.getAttribute("style"), o = Jr(c || "");
  if (o && l.setAttribute("style", o), n === "a") {
    l.setAttribute("href", t.getAttribute("href"));
    const f = t.getAttribute("target"), u = t.getAttribute("rel");
    f && l.setAttribute("target", f), u && l.setAttribute("rel", u);
  }
  for (const f of Array.from(t.childNodes)) l.appendChild(_t(f));
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
  const o = e.attrs.field ?? "", f = n.options, u = ((m = f.resolve) == null ? void 0 : m.call(f, o)) ?? null, d = (u == null ? void 0 : u.color) ?? ti, s = (u == null ? void 0 : u.label) ?? `{{${o}}}`;
  return /* @__PURE__ */ i(
    rr,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: d.text,
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
        var $;
        if (a.button !== 0 || !r.isEditable) return;
        a.preventDefault(), r.isFocused || r.commands.focus();
        const b = typeof c == "function" ? c() : null;
        if (b == null) return;
        const p = l.state.doc.resolve(b), g = p.nodeAfter;
        g && Nt.isSelectable(g) && l.dispatch(l.state.tr.setSelection(new Nt(p))), ($ = f.onTokenClick) == null || $.call(f, o, a.currentTarget.getBoundingClientRect(), b);
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
    var o, f;
    (f = (o = l.current) == null ? void 0 : o.querySelector(".ui-item-highlighted")) == null || f.scrollIntoView({ block: "nearest" });
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
  }), o = fe(), f = { padding: `${k(8, 12, o)}px ${k(12, 16, o)}px`, fontSize: k(12, 14, o) };
  return /* @__PURE__ */ S(
    "div",
    {
      role: "option",
      style: f,
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
        onPosition: ({ x: o, y: f, placement: u, strategy: d }) => {
          var a, b;
          if (!e) return;
          const s = (b = (a = e.props) == null ? void 0 : a.clientRect) == null ? void 0 : b.call(a), m = s && !u.endsWith("-end") ? s.width : 0;
          r.style.position = d, r.style.left = `${o + m}px`, r.style.top = `${f}px`;
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
        const f = c.highlightedIndex, u = o === "ArrowDown" ? 1 : -1;
        return c.setHighlighted((f + u + r.length) % r.length, "keyboard"), !0;
      }
      if (o === "Enter" || o === "Tab") {
        n.preventDefault();
        const f = c.highlightedIndex, u = f >= 0 ? f : 0, d = c.items[u];
        return d ? d.activate() : r[u] && l({ field: r[u].key }), !0;
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
  suggestionItems: f,
  onTokenClick: u,
  onSelectionChange: d
}, s) => {
  const m = y(o);
  m.current = o;
  const a = y(f);
  a.current = f;
  const b = y(u);
  b.current = u;
  const p = y(d);
  p.current = d;
  const g = y(null), $ = y(null), C = y(t);
  C.current = t;
  const z = y(r);
  z.current = r;
  const w = y(c);
  w.current = c;
  const T = y(null), j = (P) => {
    var F;
    const D = {
      bold: P.isActive("bold"),
      italic: P.isActive("italic"),
      underline: P.isActive("underline"),
      strike: P.isActive("strike"),
      link: P.isActive("link"),
      color: P.getAttributes("textStyle").color || ""
    }, M = T.current;
    M && M.bold === D.bold && M.italic === D.italic && M.underline === D.underline && M.strike === D.strike && M.link === D.link && M.color === D.color || (T.current = D, (F = w.current) == null || F.call(w, D));
  }, H = (P) => {
    var te;
    const D = P.state.selection;
    let M = null;
    D instanceof Nt && D.node.type.name === "token" ? (M = { key: D.node.attrs.field ?? "", pos: D.from }, g.current = D.from) : g.current != null && (g.current = P.state.tr.mapping.map(g.current));
    const F = $.current, W = F && M && F.key === M.key && F.pos === M.pos;
    !F && !M || W || ($.current = M, (te = p.current) == null || te.call(p, M));
  }, N = (P) => {
    const D = ei(ri(P));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(D) ? "" : D;
  }, B = We.useMemo(() => {
    const P = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: D }) => {
        var M;
        return ((M = a.current) == null ? void 0 : M.call(a, D)) ?? [];
      },
      command: ({ editor: D, range: M, props: F }) => {
        D.chain().focus().insertContentAt(M, { type: "token", attrs: { field: F.field } }).run();
      },
      render: ai
    };
    return ii.configure({
      resolve: m.current ?? null,
      suggestion: P,
      onTokenClick: (D, M, F) => {
        var W;
        g.current = F, (W = b.current) == null || W.call(b, D, M, F);
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
    onUpdate: ({ editor: P }) => {
      C.current(N(P.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: P }) => {
      j(P), H(P);
    }
  });
  return Y(() => {
    if (!x || x.isFocused) return;
    N(x.getHTML()) !== e && (T.current = null, x.commands.setContent(fn(e || ""), { emitUpdate: !1 }), j(x));
  }, [e, x]), Y(() => {
    x && x.setEditable(!r);
  }, [r, x]), Y(() => {
    x && (T.current = null, j(x), H(x));
  }, [x]), Bn(s, () => ({
    exec: (P, D) => {
      if (!(!x || z.current))
        switch (P) {
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
            D && x.chain().focus().setColor(D).run();
            break;
          case "unsetColor":
            x.chain().focus().unsetColor().run();
            break;
          case "link":
            D && x.chain().focus().extendMarkRange("link").setLink({ href: D }).run();
            break;
          case "unlink":
            x.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => x == null ? void 0 : x.commands.focus(),
    insertToken: (P) => {
      !x || z.current || x.chain().focus().insertContent({ type: "token", attrs: { field: P } }).run();
    },
    replaceToken: (P) => {
      if (!x || z.current) return;
      const D = g.current;
      D != null && x.commands.command(({ tr: M }) => {
        const F = M.doc.nodeAt(D);
        if (!F || F.type.name !== "token") return !1;
        M.setNodeMarkup(D, void 0, { field: P });
        const W = M.doc.resolve(D);
        return W.nodeAfter && W.nodeAfter.type.name === "token" && M.setSelection(new Nt(W)), !0;
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
  const [r, l] = K(!1), c = ft(), [o, f] = K(""), u = () => {
    var s;
    const d = o.trim();
    d && ((s = e.current) == null || s.exec("link", d), l(!1));
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
          onMouseDown: (d) => d.preventDefault(),
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
            onChange: (d) => f(d.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (d) => {
              d.key === "Enter" && (d.preventDefault(), u());
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
                var d;
                (d = e.current) == null || d.exec("unlink"), l(!1);
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
  const [c, o] = K(!1), f = (s, m) => {
    var a;
    return (a = e.current) == null ? void 0 : a.exec(s, m);
  }, u = ft(), d = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ S("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(ot, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || d("bold"), disabled: t || d("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("bold"), style: { ...u.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
    /* @__PURE__ */ i(ot, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || d("italic"), disabled: t || d("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("italic"), style: { ...u.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
    /* @__PURE__ */ i(ot, { content: "Underline", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("underline"), style: { ...u.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Un, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(ot, { content: "Strikethrough", children: /* @__PURE__ */ i(Le, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("strikeThrough"), style: { ...u.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Vn, { className: "w-3 h-3" }) }) }),
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
                f("unsetColor"), o(!1);
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
                f("foreColor", s), o(!1);
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
function mo({ title: e, icon: t, count: n, tone: r = "default", collapsed: l, onToggle: c, trailing: o, bodyClass: f, className: u = "", dataProps: d, children: s }) {
  const m = fe(), a = Ye({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), b = k(14, 16, m), p = { width: b, height: b }, g = k(10, 12, m);
  return /* @__PURE__ */ S("div", { ...d, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${u}`, children: [
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
    !l && s && /* @__PURE__ */ i("div", { className: f || "ui-card-band border-t p-1.5 space-y-1", children: s })
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
  he as IS_COARSE,
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
