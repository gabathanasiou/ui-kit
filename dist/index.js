"use client";
import { jsxs as $, jsx as i, Fragment as Re } from "react/jsx-runtime";
import Me, { createContext as je, useContext as Ue, useState as F, useEffect as q, useRef as y, useCallback as V, useLayoutEffect as we, useMemo as ct, useImperativeHandle as On } from "react";
import * as J from "@radix-ui/react-dropdown-menu";
import { Check as mn, X as kt, Pencil as _n, Copy as pn, Trash2 as Nt, RotateCcw as gn, Plus as Hn, ChevronRight as lt, ChevronLeft as Bn, ArrowUp as Fn, ArrowDown as Yn, ChevronDown as St, Underline as Wn, Strikethrough as Kn, Link as qn } from "lucide-react";
import * as Ce from "@radix-ui/react-dialog";
import { createPortal as Ct } from "react-dom";
import { useFloating as jn, autoUpdate as Un, offset as Xn, flip as Vn, shift as Gn } from "@floating-ui/react-dom";
import { mergeAttributes as Zn, ReactNodeViewRenderer as Jn, NodeViewWrapper as Qn, useEditor as er, EditorContent as tr } from "@tiptap/react";
import { NodeSelection as at } from "@tiptap/pm/state";
import nr from "@tiptap/starter-kit";
import rr from "@tiptap/extension-placeholder";
import { TextStyle as ir } from "@tiptap/extension-text-style";
import or from "@tiptap/extension-color";
import sr from "@tiptap/extension-link";
import cr from "@tiptap/extension-underline";
import { Mention as lr } from "@tiptap/extension-mention";
import { createRoot as ar } from "react-dom/client";
const ur = je(null);
function Rt() {
  return Ue(ur);
}
function Xe() {
  const e = Rt();
  return e ? e.document.body : null;
}
function bn() {
  const e = Rt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function _e() {
  return Rt() ?? (typeof window < "u" ? window : null);
}
const Ve = typeof window < "u", fe = Ve && window.matchMedia("(pointer: coarse)").matches, dr = Ve && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let dt = 0.5;
const We = /* @__PURE__ */ new Set();
function wi(e) {
  dt = Math.max(0, Math.min(1, e)), We.forEach((t) => t());
}
function yn() {
  return dt;
}
function ki() {
  const [, e] = F(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return We.add(t), () => {
      We.delete(t);
    };
  }, []), fe && dt > 0;
}
function ue() {
  const [, e] = F(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return We.add(t), () => {
      We.delete(t);
    };
  }, []), dt;
}
function k(e, t, n) {
  return Math.round(e + (t - e) * n);
}
function Ke(e, t) {
  const n = ue();
  return fe && n > 0 ? {
    padding: `${k(e.py, t.py, n)}px ${k(e.px, t.px, n)}px`,
    fontSize: `${k(e.fs, t.fs, n)}px`
  } : { padding: `${e.py}px ${e.px}px`, fontSize: `${e.fs}px` };
}
function $t(e) {
  return e === "touch" || e === "pen";
}
let Ie = null;
const zt = /* @__PURE__ */ new Set();
Ve && window.addEventListener("pointerdown", (e) => {
  Ie = e.pointerType, zt.forEach((t) => t());
}, !0);
function Ni() {
  return Ie;
}
function fr() {
  const [, e] = F(0), t = y(Ie);
  return q(() => {
    const n = () => {
      t.current !== Ie && (t.current = Ie, e((r) => r + 1));
    };
    return zt.add(n), () => {
      zt.delete(n);
    };
  }, []), Ie;
}
const xn = ["(any-hover: hover)", "(any-pointer: fine)"];
function vn() {
  return Ve ? xn.some((e) => window.matchMedia(e).matches) : !1;
}
let ut = vn();
const Et = /* @__PURE__ */ new Set();
function sn(e) {
  ut !== e && (ut = e, Et.forEach((t) => t()));
}
var hn;
if (Ve) {
  const e = () => sn(vn());
  for (const o of xn) {
    const f = window.matchMedia(o);
    (hn = f.addEventListener) == null || hn.call(f, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (o) => {
    o.isComposing || o.keyCode !== 229 && (o.key === "Enter" || o.key === "Backspace" || o.key === "Process" || o.key === "Unidentified" || sn(!0));
  });
  let n = null, r = null;
  const l = "__penClick", c = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (o) => {
    o.pointerType !== "pen" || o.button !== 0 || (n = { x: o.clientX, y: o.clientY });
  }, !0), window.addEventListener("pointerup", (o) => {
    if (o.pointerType !== "pen") return;
    const f = n;
    if (n = null, !f || Math.hypot(o.clientX - f.x, o.clientY - f.y) > 8) return;
    const a = o.target;
    if (!a || !a.isConnected) return;
    if (a instanceof HTMLInputElement && c.has(a.type)) {
      try {
        a.showPicker();
      } catch {
      }
      return;
    }
    const u = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    u[l] = !0, r = { x: o.clientX, y: o.clientY, time: Date.now() }, a.dispatchEvent(u);
  }, !0), window.addEventListener("click", (o) => {
    o[l] || r && Date.now() - r.time < 1e3 && Math.hypot(o.clientX - r.x, o.clientY - r.y) < 12 && (o.preventDefault(), o.stopPropagation());
  }, !0);
}
function $i() {
  return ut;
}
function zi() {
  const [, e] = F(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return Et.add(t), () => {
      Et.delete(t);
    };
  }, []), ut;
}
const Oe = 220, Lt = "cubic-bezier(0.32, 0.72, 0, 1)", Dt = 170, Mt = 0.94;
function bt(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wn(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function kn(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return wn({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function hr(e, t, n, r) {
  const l = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${Mt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === l && requestAnimationFrame(() => {
      if (e.current !== l) return;
      const o = kn(t, n);
      t.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, t.style.transition = `transform ${Oe}ms ${Lt}, opacity ${Dt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === l && (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, r == null || r());
      }, Oe + 60);
    });
  });
}
function mr(e, t, n, r) {
  const l = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, o = kn(t, n);
  t.style.transition = `transform ${Oe}ms ${Lt}, opacity ${Dt}ms ease`, t.style.transformOrigin = `${o.x * 100}% ${o.y * 100}%`, t.style.transform = `scale(${Mt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === l && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== l || t.isConnected || (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, t.style.pointerEvents = c.pointerEvents, t.style.visibility = c.visibility);
    }));
  }, Oe + 60);
}
function pr(e, t, n) {
  const r = e.cloneNode(!0), l = e.getBoundingClientRect(), c = l.width > 0 || l.height > 0 ? l : n ?? l;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${c.left}px`, r.style.top = `${c.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const o = (t == null ? void 0 : t()) ?? null, f = o ? wn({ left: c.left, top: c.top, width: c.width, height: c.height }, o) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${f.x * 100}% ${f.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Oe}ms ${Lt}, opacity ${Dt}ms ease`, r.style.transform = `scale(${Mt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Oe + 60));
    });
  });
}
function At(e) {
  const t = y(null), [n, r] = F(!1), l = y(null), c = y(0), o = V((g) => {
    if (e.ref && (e.ref.current = g), g) {
      c.current = 0, t.current = g;
      const T = g.getBoundingClientRect();
      (T.width > 0 || T.height > 0) && (l.current = { left: T.left, top: T.top, width: T.width, height: T.height }), r(!0);
      return;
    }
    const p = t.current, z = ++c.current;
    queueMicrotask(() => {
      z === c.current && t.current === p && (t.current = null, r(!1), !(!p || !e.cloneOnUnmount || !a.current) && p.style.visibility !== "hidden" && bt(d.current) && pr(p, s.current, l.current));
    });
  }, []), f = V(() => {
    const g = t.current;
    if (!g || getComputedStyle(g).transform !== "none") return;
    const p = g.getBoundingClientRect();
    (p.width > 0 || p.height > 0) && (l.current = { left: p.left, top: p.top, width: p.width, height: p.height });
  }, []), a = y(e.visible);
  a.current = e.visible;
  const u = y(e.visible), s = y(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const h = y(e.onClosed);
  h.current = e.onClosed;
  const d = y(e.morph !== !1);
  d.current = e.morph !== !1;
  const x = y(0);
  return we(() => {
    if (!n || !a.current || !bt(d.current)) return;
    const g = t.current;
    g && hr(x, g, s.current);
  }, [n, e.visible]), q(() => {
    if (!n || !a.current) return;
    let g = 0;
    const p = () => {
      g = 0, f(), g = requestAnimationFrame(p);
    };
    return g = requestAnimationFrame(p), () => {
      g && cancelAnimationFrame(g);
    };
  }, [n, f]), we(() => {
    var z;
    const g = u.current;
    if (u.current = e.visible, e.visible || !g) return;
    const p = t.current;
    if (!p || !bt(d.current)) {
      (z = h.current) == null || z.call(h);
      return;
    }
    mr(x, p, s.current, () => {
      var T;
      return (T = h.current) == null ? void 0 : T.call(h);
    });
  }, [e.visible]), q(() => {
    if (!n || !a.current) return;
    const g = (p) => {
      const z = t.current;
      z && z.contains(p.target) && p.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", g, { capture: !0 }), () => document.removeEventListener("wheel", g, { capture: !0 });
  }, [n]), q(() => {
    if (!n || !a.current) return;
    const g = (p) => {
      const z = t.current;
      z && z.contains(p.target) && p.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", g, { capture: !0 }), () => document.removeEventListener("touchmove", g, { capture: !0 });
  }, [n]), o;
}
function Nn(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Ei(e, t) {
  const n = _e(), r = y(n);
  r.current = n;
  const l = () => {
    if (!t || !e.current) return;
    const c = e.current.querySelector(".absolute");
    if (!c) return;
    c.style.left = "", c.style.right = "", c.style.top = "", c.style.bottom = "", c.style.maxHeight = "";
    const o = r.current;
    if (!o) return;
    const f = e.current.getBoundingClientRect(), a = c.getBoundingClientRect(), u = o.innerWidth, s = Nn(o), h = a.right - u;
    if (h > 0) {
      const d = Math.min(h + 8, a.left);
      c.style.left = `${a.left - f.left - d}px`;
    }
    a.left < 0 && (c.style.left = `${-f.left + 4}px`), a.bottom > s.bottom + 4 && (c.style.top = "auto", c.style.bottom = "100%", c.getBoundingClientRect().top < s.top && (c.style.bottom = "auto", c.style.top = `${-f.top + s.top + 4}px`, c.style.maxHeight = `${s.height - 8}px`));
  };
  we(() => {
    if (l(), !t) return;
    const c = r.current, o = (c == null ? void 0 : c.visualViewport) ?? null;
    return o == null || o.addEventListener("resize", l), o == null || o.addEventListener("scroll", l), c == null || c.addEventListener("resize", l), () => {
      o == null || o.removeEventListener("resize", l), o == null || o.removeEventListener("scroll", l), c == null || c.removeEventListener("resize", l);
    };
  }, [t, e]);
}
function gr(e, t, n, r) {
  const l = _e(), c = y(l);
  c.current = l, we(() => {
    if (!t || !e.current) return;
    const o = e.current;
    let f = 0;
    const a = () => {
      f = 0;
      const x = o.getBoundingClientRect(), g = c.current;
      if (!g) return;
      const p = g.innerWidth, z = Nn(g), T = (r == null ? void 0 : r.panelWidth) ?? Math.max(x.width, 200), v = 4, w = 120;
      let R = Math.max(0, x.left);
      R + T > p && (R = Math.max(0, p - T - 8));
      const X = z.bottom - x.bottom - v - 16, _ = x.top - z.top - v - 16;
      if (X >= w || X >= _) {
        const M = Math.min(x.bottom + v, z.bottom), K = Math.max(w, z.bottom - M - 16);
        n({ top: M, left: R, width: x.width, maxH: K });
      } else {
        const M = Math.max(w, Math.min(_, 360)), K = z.bottom - (x.top - v);
        n({ top: 0, left: R, width: x.width, maxH: M, bottom: Math.max(0, K) });
      }
    }, u = () => {
      f || (f = requestAnimationFrame(a));
    }, s = c.current ?? null, h = (s == null ? void 0 : s.document) ?? null;
    u(), h == null || h.addEventListener("scroll", u, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", u);
    const d = (s == null ? void 0 : s.visualViewport) ?? null;
    return d == null || d.addEventListener("resize", u), d == null || d.addEventListener("scroll", u), () => {
      f && cancelAnimationFrame(f), h == null || h.removeEventListener("scroll", u, { capture: !0 }), s == null || s.removeEventListener("resize", u), d == null || d.removeEventListener("resize", u), d == null || d.removeEventListener("scroll", u);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let Pe = null;
function $n(e) {
  return Pe == null || Pe(), Pe = e, () => {
    Pe === e && (Pe = null);
  };
}
const Pt = je("dark"), zn = () => Ue(Pt), br = (e) => e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", cn = (e) => e ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", yr = (e) => e ? "text-xs" : "text-[10px]";
function It(e) {
  const t = fe && yn() > 0;
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
    headerPad: cn(t),
    headerText: `${cn(t)} font-semibold uppercase tracking-wider ${yr(t)} ui-label`,
    // Item padding
    itemPad: br(t),
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
function En(e) {
  const t = [];
  return Me.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (Me.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const Ot = je({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Ge = je(null), _t = () => Ue(Ge);
function ft() {
  const e = y([]), [t, n] = F(-1), [r, l] = F(!1), [c, o] = F(0), f = V((h) => (e.current = [...e.current, h], o((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== h), o((d) => d + 1);
  }), []), a = V((h, d) => {
    n(h), l(d === "pointer");
  }, []), u = V(() => {
    l((h) => h && (n(-1), !1));
  }, []);
  return ct(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: f,
    setHighlighted: a,
    pointerLeave: u
  }), [t, r, c, f, a, u]);
}
function Tn(e) {
  const t = _t(), n = y(t);
  n.current = t;
  const r = y(null);
  q(() => {
    var a;
    const f = { label: e.label(), activate: e.activate };
    return r.current = f, (a = n.current) == null ? void 0 : a.register(f);
  }, []);
  const l = t && r.current ? t.items.indexOf(r.current) : -1, c = !!t && !e.disabled && l >= 0 && l === t.highlightedIndex;
  return { api: t, myIndex: l, highlighted: c, setPointer: (f) => {
    !e.disabled && t && f >= 0 && t.setHighlighted(f, "pointer");
  } };
}
function Ht(e, t, n, r) {
  const l = y(-1);
  l.current = t.highlightedIndex;
  const c = y(t);
  c.current = t;
  const o = y(e);
  o.current = e;
  const f = y(r);
  f.current = r;
  const a = y({ text: "", time: 0 }), u = y(!1);
  u.current || (u.current = !0, n.current = (s) => {
    var d, x;
    if (!o.current) return;
    const h = c.current.items;
    if (h.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = s.key === "ArrowDown" ? 1 : -1, p = (l.current + g + h.length) % h.length;
        c.current.setHighlighted(p, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = l.current;
        g >= 0 && g < h.length && h[g].submenu && h[g].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (x = (d = f.current) == null ? void 0 : d.onCloseSub) == null || x.call(d);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = l.current;
        g >= 0 && g < h.length && h[g].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = Date.now(), p = (g - a.current.time > 500 ? "" : a.current.text) + s.key.toLowerCase();
        if (a.current = { text: p, time: g }, !p) return;
        const z = l.current + 1;
        for (let T = 0; T < h.length; T++) {
          const v = (z + T) % h.length;
          if (h[v].label.toLowerCase().startsWith(p)) {
            c.current.setHighlighted(v, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Bt(e, t, n, r, l, c) {
  const o = y(t);
  o.current = t;
  const f = y(e);
  f.current = e;
  const a = y(l);
  a.current = l;
  const u = y(!1);
  u.current || (u.current = !0, c.current = (s) => {
    if (!f.current || a.current) return;
    const h = r.current;
    h && h.contains(s.target) || o.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function Ft(e, t) {
  const n = y(e);
  n.current = e;
  const r = y(!1);
  r.current || (r.current = !0, t.current = (l) => {
    if (!n.current) return;
    const c = l.currentTarget;
    c.scrollHeight > c.clientHeight && (l.preventDefault(), c.scrollTop += l.deltaY);
  });
}
function ht({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: l = "left",
  width: c,
  theme: o = "dark",
  children: f,
  morph: a = !0,
  contentClassName: u,
  initialHighlightIndex: s
}) {
  const [h, d] = F([]), [x, g] = F(null), p = Xe(), z = bn(), T = y(null), v = y(null), w = y(e);
  w.current = e;
  const [R, X] = F(e), _ = ft();
  q(() => {
    if (e)
      return X(!0), _.setHighlighted(s ?? -1, "keyboard"), $n(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, s, n, t]), q(() => {
    if (!e || !z) return;
    const L = (j) => {
      if (j.pointerType !== "touch") return;
      const se = j.target;
      se && (v.current && v.current.contains(se) || T.current && T.current.contains(se) || se instanceof Element && se.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return z.addEventListener("pointerdown", L, { capture: !0 }), () => z.removeEventListener("pointerdown", L, { capture: !0 });
  }, [e, z, n, t]);
  const M = V(() => {
    const L = T.current;
    if (!L) return null;
    const j = L.getBoundingClientRect();
    return { left: j.left, top: j.top, width: j.width, height: j.height };
  }, []), K = At({
    visible: e,
    morph: a,
    anchor: M,
    onClosed: () => X(!1)
  }), b = y(() => {
  }), N = y(() => {
  }), A = y(() => {
  });
  Ht(e && h.length === 0, _, b), Ft(e, N), Bt(e, _, b, v, h.length > 0, A);
  const C = y(null), Y = V((L) => {
    var j;
    if (L) {
      L.addEventListener("keydown", b.current, { capture: !0 }), L.addEventListener("wheel", N.current, { passive: !1 });
      const se = L.ownerDocument;
      C.current = se, se.addEventListener("keydown", A.current, { capture: !0 }), H(L.offsetWidth), ge(!0);
    } else
      (j = C.current) == null || j.removeEventListener("keydown", A.current, { capture: !0 }), C.current = null, ge(!1);
    v.current = L, K(L);
  }, [K]), [W, ee] = F({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [re, he] = F(0), [me, ge] = F(!1), [E, H] = F(0);
  q(() => {
    e && T.current && he(T.current.getBoundingClientRect().width);
  }, [e]);
  const ne = ct(() => ({ panelWidth: E || re || void 0 }), [E, re]);
  gr(T, e && me, (L) => ee({ ...L, maxH: Math.min(L.maxH, 384), ready: !0 }), ne), q(() => {
    if (W.ready && e) {
      const L = v.current;
      L && L.ownerDocument.activeElement !== L && !L.contains(L.ownerDocument.activeElement) && L.focus();
    }
  }, [W.ready, e]), we(() => {
    var j;
    if (!e || _.highlightedIndex < 0) return;
    const L = (j = v.current) == null ? void 0 : j.querySelector(`[data-ei="${_.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [e, _.highlightedIndex]);
  const B = V((L) => {
    !L && !w.current || (!L && P.current && (te.current = !0), n ? n(L) : L || t == null || t());
  }, [n, t]), O = y(R);
  O.current = R;
  const P = y(!1), te = y(!1), oe = V(() => {
    if (!w.current && O.current) {
      if (te.current) {
        te.current = !1, P.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), ie = Me.isValidElement(r) ? r : null, S = ie ? Me.cloneElement(ie, {
    ref: (L) => {
      T.current = L;
    },
    onPointerDown: () => {
      P.current = !0, te.current = !1;
    },
    onClick: (L) => {
      var j, se;
      (se = (j = ie.props).onClick) == null || se.call(j, L), oe();
    }
  }) : r;
  return /* @__PURE__ */ $(J.Root, { open: e || R, onOpenChange: B, modal: !1, children: [
    /* @__PURE__ */ i(J.Trigger, { asChild: !0, children: S }),
    /* @__PURE__ */ i(J.Portal, { container: p ?? void 0, children: /* @__PURE__ */ i(Pt.Provider, { value: o, children: /* @__PURE__ */ i(Ot.Provider, { value: { chain: h, setChain: d, morph: a, keyboardOpened: x, setKeyboardOpened: g }, children: /* @__PURE__ */ i(Ge.Provider, { value: _, children: /* @__PURE__ */ i(
      J.Content,
      {
        ref: Y,
        "data-theme": o,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${c || ""} ${u || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: W.left,
          top: W.bottom != null ? void 0 : W.top,
          bottom: W.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: c ? void 0 : re || void 0,
          maxHeight: W.maxH,
          visibility: W.ready ? "visible" : "hidden"
        },
        onPointerLeave: _.pointerLeave,
        children: f
      }
    ) }) }) }) })
  ] });
}
function Ti({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: l,
  onRename: c,
  onDuplicate: o,
  onDelete: f,
  onCreate: a,
  onImport: u,
  onExport: s,
  onReset: h,
  onTrash: d,
  closeOnSelect: x,
  readOnly: g = !1,
  theme: p,
  align: z,
  label: T,
  header: v,
  itemLabel: w,
  trigger: R,
  minItems: X = 1,
  itemRender: _,
  morph: M = !0,
  contentClassName: K
}) {
  const b = It(), [N, A] = F(null), [C, Y] = F(""), W = y(null), ee = y(null);
  q(() => {
    e && requestAnimationFrame(() => {
      var E, H;
      (H = (E = ee.current) == null ? void 0 : E.querySelector('[data-active="1"]')) == null || H.scrollIntoView({ block: "nearest" });
    });
  }, [e]), q(() => {
    var ne;
    if (!e) return;
    const E = (B) => {
      var S, U, L, j, se;
      if ((U = (S = B.target) == null ? void 0 : S.closest) != null && U.call(S, "input, textarea, [contenteditable]")) return;
      const O = (L = ee.current) == null ? void 0 : L.closest(".ui-menu");
      if (!O || !O.contains(B.target)) return;
      const P = O.ownerDocument, te = [...O.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], oe = [...O.querySelectorAll('div:last-child > [role="menuitem"]')], ie = [...te, ...oe];
      if (B.key === "ArrowDown" || B.key === "ArrowUp") {
        B.preventDefault(), B.stopImmediatePropagation();
        const pe = P.activeElement;
        let ye = pe ? ie.indexOf(pe) : -1;
        if (ye < 0 && pe) {
          const Ne = pe.closest("[data-active]"), xe = Ne == null ? void 0 : Ne.querySelector('[role="menuitem"]:first-child');
          xe && (ye = te.indexOf(xe));
        }
        const ke = B.key === "ArrowDown" ? 1 : -1, Te = ye < 0 ? ke === 1 ? 0 : ie.length - 1 : (ye + ke + ie.length) % ie.length;
        (j = ie[Te]) == null || j.focus({ preventScroll: !0 });
        return;
      }
      if (B.key === "ArrowLeft" || B.key === "ArrowRight") {
        const pe = P.activeElement, ye = pe == null ? void 0 : pe.closest("[data-active]");
        if (!ye) return;
        B.preventDefault(), B.stopImmediatePropagation();
        const ke = [...ye.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ke.length === 0) return;
        const Te = pe && ye.contains(pe) ? ke.indexOf(pe) : -1, Ne = B.key === "ArrowRight" ? 1 : -1, xe = Te < 0 ? 0 : (Te + Ne + ke.length) % ke.length;
        (se = ke[xe]) == null || se.focus({ preventScroll: !0 });
        return;
      }
    }, H = ((ne = ee.current) == null ? void 0 : ne.ownerDocument) ?? null;
    return H == null || H.addEventListener("keydown", E, { capture: !0 }), () => H == null ? void 0 : H.removeEventListener("keydown", E, { capture: !0 });
  }, [e]), q(() => {
    if (N) {
      requestAnimationFrame(() => {
        var H, ne;
        (H = W.current) == null || H.focus(), (ne = W.current) == null || ne.select();
      });
      const E = n.find((H) => H.id === N);
      E && !C && Y(E.name);
    }
  }, [N]), q(() => {
    if (N) {
      const E = n.find((H) => H.id === N);
      E && !C && Y(E.name);
    }
  }, [N, n]);
  const re = (E, H) => {
    A(E), Y(H);
  }, he = () => {
    N && C.trim() && c(N, C.trim()), A(null);
  }, me = () => {
    A(null);
  }, ge = w || v.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ $(ht, { open: e, onOpenChange: (E) => {
    E ? (A(null), Y("")) : (N && C.trim() && c(N, C.trim()), A(null), Y("")), (!E || !g) && t(E);
  }, width: "w-80", theme: p, align: z, trigger: R, morph: M, contentClassName: K, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${b.headerText}`, children: v }),
    /* @__PURE__ */ i("div", { ref: ee, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((E) => {
      const H = E.id === r, ne = N === E.id;
      return /* @__PURE__ */ i("div", { "data-active": H ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${H || ne ? b.rowActiveBg : b.rowHoverBg} ${N && !ne ? "opacity-40 pointer-events-none" : ""}`, children: ne ? /* @__PURE__ */ $(Re, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: W,
            value: C,
            onChange: (B) => Y(B.target.value),
            onKeyDown: (B) => {
              B.key === "Enter" && (B.preventDefault(), B.stopPropagation(), he()), B.key === "Escape" && (B.preventDefault(), B.stopPropagation(), me());
            },
            className: `w-full border rounded ${b.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${b.editConfirm}`,
            onSelect: (B) => {
              B.preventDefault(), he();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(mn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${b.editCancel}`,
            onSelect: (B) => {
              B.preventDefault(), me();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(kt, { className: b.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ $(Re, { children: [
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none cursor-pointer flex items-center ${b.rowText} ${H ? "" : b.rowTextHover}`,
            onSelect: x ? () => {
              l(E.id);
            } : (B) => {
              B.preventDefault(), l(E.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${H ? b.rowActiveText : ""}`, children: _ ? _(E) : E.name })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${H ? b.btnActive : b.btnBase}`,
            onSelect: (B) => {
              B.preventDefault(), re(E.id, E.name);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ i(_n, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${H ? b.btnActive : b.btnBase}`,
            onSelect: (B) => {
              B.preventDefault();
              const O = o(E.id);
              O && re(O, `${E.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ i(pn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= X ? b.btnDisabled : H ? b.btnDangerActive : b.btnDanger}`,
            onSelect: (B) => {
              B.preventDefault(), f(E.id);
            },
            onTouchStart: () => {
            },
            disabled: g || n.length <= X,
            children: /* @__PURE__ */ i(Nt, { className: b.btnIcon })
          }
        )
      ] }) }, E.id);
    }) }),
    /* @__PURE__ */ $("div", { className: `shrink-0 ${N ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ $(Re, { children: [
        /* @__PURE__ */ i(J.Separator, { className: b.separator }),
        /* @__PURE__ */ $(
          J.Item,
          {
            className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
            onSelect: (E) => {
              E.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: [
              /* @__PURE__ */ i(gn, { className: `${b.btnIcon} ${b.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || u || s || d) && /* @__PURE__ */ i(J.Separator, { className: b.separator }),
      a && /* @__PURE__ */ $(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault();
            const H = a();
            H && re(H, "");
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ i(Hn, { className: `${b.btnIcon} ${b.icon}` }),
            "New ",
            ge
          ]
        }
      ),
      u && /* @__PURE__ */ $(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ $("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ $(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ $("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ $(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ i(Nt, { className: `${b.btnIcon} ${b.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function xr({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: l = "",
  children: c,
  keepOpen: o = !1,
  selected: f = !1,
  rightAction: a,
  trailing: u
}) {
  zn();
  const s = It(), h = ue(), d = { padding: `${k(12, 16, h)}px ${k(8, 12, h)}px`, fontSize: k(12, 14, h) }, x = y(!1), g = y(null), { myIndex: p, highlighted: z, setPointer: T } = Tn({
    label: () => En(c),
    activate: () => {
      n || e();
    },
    disabled: n
  }), v = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ $(
    J.Item,
    {
      ref: g,
      "data-ei": p >= 0 ? p : void 0,
      style: d,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${v} ${f ? "ui-item-selected" : ""} ${z ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${l}`,
      onSelect: (w) => {
        if (x.current) {
          x.current = !1;
          return;
        }
        o && w.preventDefault(), e();
      },
      onPointerEnter: () => {
        T(p);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: c }),
        u && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: u }),
        a && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: a.title,
            onPointerDown: (w) => {
              w.stopPropagation(), w.preventDefault(), x.current = !0, a.onClick();
            },
            onClick: (w) => {
              w.stopPropagation(), w.preventDefault();
            },
            children: a.icon
          }
        )
      ]
    }
  );
}
function vr({ id: e, label: t, icon: n, width: r, side: l = "right", children: c, contentClassName: o }) {
  const { chain: f, setChain: a, morph: u, keyboardOpened: s, setKeyboardOpened: h } = Ue(Ot), d = f.includes(e), x = f[f.length - 1] === e, g = zn(), p = Xe(), z = y(null), T = y(null), [v, w] = F(d), R = !d && v;
  q(() => {
    d && w(!0);
  }, [d]);
  const X = () => a((O) => {
    const P = O.indexOf(e);
    return P >= 0 ? O.slice(0, P) : O;
  }), _ = ft(), M = _t(), K = y(M);
  K.current = M;
  const b = y(null);
  q(() => {
    var P;
    const O = {
      label: t,
      activate: () => {
        h(e), a((te) => te.includes(e) ? te : [...te, e]);
      },
      submenu: !0
    };
    return b.current = O, (P = K.current) == null ? void 0 : P.register(O);
  }, []);
  const N = M && b.current ? M.items.indexOf(b.current) : -1, A = N >= 0 && N === M.highlightedIndex, C = V(() => {
    const O = z.current;
    if (!O) return null;
    const P = O.getBoundingClientRect();
    return { left: P.left, top: P.top, width: P.width, height: P.height };
  }, []), Y = At({
    visible: d,
    morph: u,
    anchor: C,
    onClosed: () => w(!1)
  }), W = y(() => {
  }), ee = y(() => {
  }), re = y(() => {
  });
  Ht(d && x, _, W, {
    onCloseSub: () => {
      X(), M && N >= 0 && M.setHighlighted(N, "keyboard");
    }
  });
  const he = y(s);
  he.current = s, q(() => {
    d && (he.current === e ? (_.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var O;
      return (O = T.current) == null ? void 0 : O.focus();
    }), h(null)) : _.setHighlighted(-1, "keyboard"));
  }, [d]), Ft(d, ee), Bt(d, _, W, T, !x, re), Me.useLayoutEffect(() => {
    var P;
    if (!d || _.highlightedIndex < 0) return;
    const O = (P = T.current) == null ? void 0 : P.querySelector(`[data-ei="${_.highlightedIndex}"]`);
    O == null || O.scrollIntoView({ block: "nearest" });
  }, [d, _.highlightedIndex]);
  const me = y(null), ge = V((O) => {
    var P;
    if (O) {
      O.addEventListener("keydown", W.current, { capture: !0 }), O.addEventListener("wheel", ee.current, { passive: !1 });
      const te = O.ownerDocument;
      me.current = te, te.addEventListener("keydown", re.current, { capture: !0 });
    } else
      (P = me.current) == null || P.removeEventListener("keydown", re.current, { capture: !0 }), me.current = null;
    T.current = O, Y(O);
  }, [Y]), E = ue(), H = { padding: `${k(12, 16, E)}px ${k(8, 12, E)}px`, fontSize: k(12, 14, E) }, ne = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${A ? " ui-item-highlighted" : ""}${R ? " ui-sub-closing" : ""}`, B = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${o || ""}`;
  return /* @__PURE__ */ $(J.Sub, { open: d || v, onOpenChange: (O) => a((P) => {
    if (!O) {
      const te = P.indexOf(e);
      return te >= 0 ? P.slice(0, te) : P;
    }
    return P.includes(e) ? P : [...P, e];
  }), children: [
    /* @__PURE__ */ $(
      J.SubTrigger,
      {
        ref: z,
        "data-ei": N >= 0 ? N : void 0,
        style: H,
        className: ne,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          M && N >= 0 && M.setHighlighted(N, "pointer");
        },
        onPointerDown: (O) => {
          O.pointerType === "pen" && (O.preventDefault(), a((P) => d ? P.slice(0, P.indexOf(e)) : [...P, e]));
        },
        children: [
          l === "left" && /* @__PURE__ */ i(lt, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ $("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          l === "right" && /* @__PURE__ */ i(lt, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(J.Portal, { container: p ?? void 0, children: /* @__PURE__ */ i(
      J.SubContent,
      {
        ref: ge,
        "data-theme": g,
        className: B,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: _.pointerLeave,
        children: /* @__PURE__ */ i(Ge.Provider, { value: _, children: c })
      }
    ) })
  ] });
}
const Be = 8, Si = ({ open: e, x: t, y: n, onClose: r, children: l, containerRef: c, morph: o = !0 }) => {
  const f = ue(), a = k(12, 14, f), u = y(null), s = _e(), [h, d] = F(!1), [x, g] = F([]), [p, z] = F(null), T = ft();
  q(() => {
    if (e)
      return T.setHighlighted(-1, "keyboard"), $n(r);
  }, [e, r]);
  const v = y({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const w = V(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), R = At({
    visible: !0,
    morph: o,
    anchor: w,
    cloneOnUnmount: !0
  }), X = y(() => {
  }), _ = y(() => {
  }), M = y(() => {
  });
  Ht(e, T, X), Ft(e, _), Bt(e, T, X, u, x.length > 0, M);
  const K = y(null), b = V((C) => {
    var Y;
    if (C) {
      C.addEventListener("keydown", X.current, { capture: !0 }), C.addEventListener("wheel", _.current, { passive: !1 });
      const W = C.ownerDocument;
      K.current = W, W.addEventListener("keydown", M.current, { capture: !0 });
    } else
      (Y = K.current) == null || Y.removeEventListener("keydown", M.current, { capture: !0 }), K.current = null;
    u.current = C, d(!!C), R(C);
  }, [R]), [N, A] = F(null);
  return we(() => {
    var ne;
    if (!e || !h || !u.current) return;
    const C = u.current, Y = C.offsetWidth, W = C.offsetHeight, ee = (ne = c == null ? void 0 : c.current) == null ? void 0 : ne.getBoundingClientRect(), re = ee ? ee.right : (s == null ? void 0 : s.innerWidth) ?? 0, he = ee ? ee.bottom : (s == null ? void 0 : s.innerHeight) ?? 0, me = ee ? ee.left : 0, ge = ee ? ee.top : 0;
    let E = Math.max(ge + Be, v.current.top), H = Math.max(me + Be, v.current.left);
    H + Y > re && (H = re - Y - Be), E + W > he && (E = Math.max(ge + Be, he - W - Be)), A({ left: H, top: E });
  }, [e, h, t, n, c]), e ? /* @__PURE__ */ $(J.Root, { open: e, onOpenChange: (C) => {
    C || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(J.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(J.Portal, { children: /* @__PURE__ */ i(Pt.Provider, { value: "light", children: /* @__PURE__ */ i(Ot.Provider, { value: { chain: x, setChain: g, morph: o, keyboardOpened: p, setKeyboardOpened: z }, children: /* @__PURE__ */ i(Ge.Provider, { value: T, children: /* @__PURE__ */ i(
      J.Content,
      {
        ref: b,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: a, left: (N == null ? void 0 : N.left) ?? v.current.left, top: (N == null ? void 0 : N.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: T.pointerLeave,
        children: l
      }
    ) }) }) }) })
  ] }) : null;
}, Ci = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: l = !1, trailing: c, children: o }) => {
  const f = ue(), a = { padding: `${k(12, 16, f)}px ${k(8, 12, f)}px`, fontSize: k(12, 14, f) }, u = _t(), s = y(u);
  s.current = u;
  const h = y(null);
  q(() => {
    var p;
    const g = { label: En(o), activate: () => {
      r || e();
    } };
    return h.current = g, (p = s.current) == null ? void 0 : p.register(g);
  }, []);
  const d = u && h.current ? u.items.indexOf(h.current) : -1, x = !r && d >= 0 && d === u.highlightedIndex;
  return /* @__PURE__ */ $(
    J.Item,
    {
      "data-ei": d >= 0 ? d : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && d >= 0 && u.setHighlighted(d, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: a,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${l ? "ui-item-selected" : ""} ${x ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: o }),
        c && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: c })
      ]
    }
  );
}, Ri = () => /* @__PURE__ */ i(J.Separator, { className: "ui-sep my-1" }), Li = (e) => /* @__PURE__ */ i(vr, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Q = 8, Sn = "[data-modal-stack]", Ee = 220, qe = "cubic-bezier(0.32, 0.72, 0, 1)", ot = 0.94;
function Fe() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function De(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Cn(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function ln(e, t, n, r) {
  const l = ++e.current, c = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = Cn(c, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === l && (t.style.transition = `transform ${Ee}ms ${qe}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === l && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, Ee + 80));
    });
  });
}
function wr(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${ot})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${Ee}ms ${qe}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, Ee + 60));
    });
  });
}
function an(e, t, n) {
  const r = ++e.current, l = t.getBoundingClientRect(), c = 1 - ot, o = { left: l.left + l.width * c / 2, top: l.top + l.height * c / 2, width: l.width * ot, height: l.height * ot };
  t.style.transition = `transform ${Ee}ms ${qe}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = Cn(l, o), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, Ee + 60);
}
function yt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Sn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function xt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Sn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function kr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: l,
  footer: c,
  children: o,
  onReset: f,
  morph: a = !0,
  flat: u = !1,
  closable: s = !0,
  dismissOnBackdrop: h = !0
}) {
  const d = y(null), x = y(null), g = y(null), p = ue(), z = k(20, 24, p), T = k(10, 12, p), v = k(12, 14, p), w = k(14, 16, p), R = k(20, 24, p), X = k(20, 24, p), _ = k(20, 24, p), M = k(14, 16, p), K = k(16, 20, p), b = k(10, 12, p), N = k(12, 14, p), A = k(8, 10, p), C = k(4, 6, p), Y = { padding: `${T}px ${z}px` }, W = { fontSize: v }, ee = { padding: `${X}px ${R}px 16px ${R}px` }, re = { fontSize: w }, he = { padding: `0 ${R}px 16px` }, me = { padding: `${_}px ${R}px` }, ge = { fontSize: b, padding: `${C}px ${A}px` }, [E, H] = F(!1), ne = V((m) => {
    d.current = m, H(m !== null);
  }, []), B = Xe(), O = _e(), P = y(O);
  P.current = O;
  const [te, oe] = F(null), ie = y(null), S = y(!1), U = y(!1), L = y(0), j = y({ w: 0, h: 0 }), se = y(!1), [pe, ye] = F(!1), [ke, Te] = F(!1), Ne = y(0), xe = y(!1), [Dn, Yt] = F(!1), Wt = y(a);
  Wt.current = a;
  const Kt = y(!1), mt = y(!1), Je = () => {
    mt.current = !0, ye(!0);
  }, He = () => {
    mt.current = !1, ye(!1);
  };
  q(() => {
    e || (oe(null), se.current = !1, S.current = !1, Te(!1));
  }, [e]), we(() => {
    if (!e || se.current || !E || !d.current) return;
    se.current = !0;
    const m = d.current.getBoundingClientRect(), D = P.current ?? null, I = (D == null ? void 0 : D.innerWidth) ?? 0, G = De(D);
    oe({
      left: Math.max(Q, Math.min((I - m.width) / 2, I - m.width - Q)),
      top: Math.max(G.top + Q, Math.min(G.top + (G.height - m.height) / 2, G.bottom - m.height - Q))
    });
  }, [e, E]), we(() => {
    if (!e || !E || !a || Fe() || !d.current) return;
    const m = d.current, D = yt(m), I = D[D.length - 1];
    Je(), I ? ln(Ne, m, I.getBoundingClientRect(), He) : wr(Ne, m, He);
  }, [e, E]);
  const qt = V(() => {
    if (!s || xe.current) return;
    const m = d.current, D = !!m && yt(m).length > 0;
    if (!m || !a || Fe() || D) {
      t();
      return;
    }
    xe.current = !0, Yt(!0), Kt.current = !0, Je(), an(Ne, m, () => {
      xe.current = !1, Yt(!1), He(), t();
    });
  }, [a, t, s]), Qe = V(() => {
    const m = d.current;
    if (!m || Kt.current || !Wt.current || Fe() || yt(m).length > 0) return;
    const D = m.ownerDocument, I = m.cloneNode(!0);
    I.removeAttribute("data-modal-stack"), I.removeAttribute("data-state"), I.removeAttribute("role"), I.removeAttribute("data-aria-hidden"), I.removeAttribute("tabindex"), I.setAttribute("aria-hidden", "true"), I.style.pointerEvents = "none", D.body.appendChild(I), an({ current: 0 }, I, () => {
      I.isConnected && I.remove();
    });
  }, []);
  we(() => () => Qe(), [Qe]);
  const jt = y(e);
  we(() => {
    const m = jt.current;
    jt.current = e, m && !e && Qe();
  }, [e, E, Qe]), q(() => {
    if (!e || !E || !a || !d.current) return;
    const m = d.current, D = m.parentNode;
    if (!D) return;
    let I = 0, G = null, Z = !1;
    const le = () => {
      I = 0;
      const ae = xt(m);
      if (ae.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", G = ae[ae.length - 1].getBoundingClientRect(), Z = !0, I = requestAnimationFrame(le);
      else if (Z) {
        Z = !1, G && !Fe() && (Je(), ln(Ne, m, G, He)), G = null;
        const de = P.current ?? null;
        de == null || de.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, ce = new MutationObserver(() => {
      !I && xt(m).length > 0 && (I = requestAnimationFrame(le));
    });
    return ce.observe(D, { childList: !0 }), () => {
      ce.disconnect(), I && cancelAnimationFrame(I);
    };
  }, [e, E]), q(() => {
    if (!E || !a || Fe() || !d.current) return;
    const m = d.current;
    let D = Math.round(m.getBoundingClientRect().height), I = !1;
    const G = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const Z = Math.round(m.getBoundingClientRect().height);
      if (!I) {
        I = !0, D = Z;
        return;
      }
      if (Math.abs(Z - D) < 1) return;
      if (ie.current || xe.current || xt(m).length > 0) {
        D = Z;
        return;
      }
      if (mt.current) return;
      const le = D;
      D = Z, Je();
      const ce = m.getBoundingClientRect(), ae = De(P.current ?? null), de = !S.current && !U.current, Ae = de ? ae.top + (ae.height - le) / 2 : ce.top, ve = de ? ae.top + (ae.height - Z) / 2 : ce.top;
      m.style.transition = "none", m.style.height = `${le}px`, de && (m.style.top = `${Ae}px`), x.current && (x.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${le}px` && (m.style.transition = `height ${Ee}ms ${qe}${de ? `, top ${Ee}ms ${qe}` : ""}`, m.style.height = `${Z}px`, de && (m.style.top = `${ve}px`), window.setTimeout(() => {
            m.style.height === `${Z}px` && (m.style.transition = "", m.style.height = "", x.current && (x.current.style.overflow = ""), de && oe({ left: ce.left, top: ve }), He());
          }, Ee + 60));
        });
      });
    });
    return G.observe(m), () => G.disconnect();
  }, [E]);
  const et = V(() => {
    const m = d.current;
    if (!m) return null;
    const D = m.getBoundingClientRect();
    return { left: D.left, top: D.top, width: D.width, height: D.height };
  }, []), Se = V((m, D) => {
    const I = P.current ?? null, G = (I == null ? void 0 : I.innerWidth) ?? 0, Z = De(I), le = et(), ce = le ? le.width : Math.min(G - Q * 2, 576), ae = le ? le.height : Math.min(Z.height - Q * 2, 400);
    return {
      left: Math.max(Q, Math.min(m, G - ce - Q)),
      top: Math.max(Z.top + Q, Math.min(D, Z.bottom - ae - Q))
    };
  }, [et]);
  q(() => {
    if (!e) return;
    const m = P.current ?? null, D = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !D) return;
    const I = 120;
    U.current = !1, j.current = { w: m.innerWidth, h: m.innerHeight };
    let G = 0;
    const Z = () => {
      if (xe.current || ie.current) return;
      const ce = (m == null ? void 0 : m.innerHeight) ?? 0, ae = (m == null ? void 0 : m.innerWidth) ?? 0, Ae = De(m).height < ce - I, ve = ce < j.current.h - I && ae === j.current.w;
      Ae || ve ? (U.current = !0, L.current && (clearTimeout(L.current), L.current = 0)) : L.current || (L.current = (m == null ? void 0 : m.setTimeout(() => {
        U.current = !1, L.current = 0, Te(!1);
      }, 600)) ?? 0), Te(U.current), !G && (G = requestAnimationFrame(() => {
        var on;
        G = 0;
        const tn = d.current;
        if (!tn) return;
        const Le = De(P.current ?? null), $e = tn.getBoundingClientRect(), nn = ((on = P.current) == null ? void 0 : on.innerWidth) ?? 0, gt = (m == null ? void 0 : m.innerHeight) ?? 0, In = Le.height < gt - I || gt < j.current.h - I && (m == null ? void 0 : m.innerWidth) === j.current.w;
        j.current = { w: (m == null ? void 0 : m.innerWidth) ?? 0, h: gt };
        const tt = $e.top >= Le.top + Q && $e.bottom <= Le.bottom - Q, rn = () => {
          oe({
            left: Math.max(Q, Math.min((nn - $e.width) / 2, nn - $e.width - Q)),
            top: Math.max(Le.top + Q, Math.min(Le.top + (Le.height - $e.height) / 2, Le.bottom - $e.height - Q))
          });
        };
        if (In && !fe) {
          if (S.current) {
            tt || oe(Se($e.left, $e.top));
            return;
          }
          if (tt) return;
          rn();
          return;
        }
        if (!U.current) {
          if (S.current) {
            tt || oe(Se($e.left, $e.top));
            return;
          }
          tt || rn();
        }
      }));
    };
    D.addEventListener("resize", Z), D.addEventListener("scroll", Z);
    const le = () => {
      xe.current || ie.current || G || (G = requestAnimationFrame(() => {
        G = 0;
        const ce = d.current;
        if (!ce) return;
        const ae = P.current ?? null, de = De(ae), Ae = (ae == null ? void 0 : ae.innerWidth) ?? 0, ve = ce.getBoundingClientRect();
        if (S.current) {
          oe(Se(ve.left, ve.top));
          return;
        }
        oe({
          left: Math.max(Q, Math.min((Ae - ve.width) / 2, Ae - ve.width - Q)),
          top: Math.max(de.top + Q, Math.min(de.top + (de.height - ve.height) / 2, de.bottom - ve.height - Q))
        });
      }));
    };
    return m.addEventListener("orientationchange", le), () => {
      D.removeEventListener("resize", Z), D.removeEventListener("scroll", Z), m.removeEventListener("orientationchange", le), G && cancelAnimationFrame(G), L.current && clearTimeout(L.current);
    };
  }, [e, Se]);
  const Ut = V((m) => {
    if (m.target.closest("button")) return;
    S.current = !0;
    const D = et();
    D && (oe(Se(D.left, D.top)), ie.current = { startX: m.clientX, startY: m.clientY, posX: D.left, posY: D.top }, m.target.setPointerCapture(m.pointerId));
  }, [et, Se]), Xt = V((m) => {
    const D = ie.current;
    D && (m.preventDefault(), oe(Se(D.posX + m.clientX - D.startX, D.posY + m.clientY - D.startY)));
  }, [Se]), Vt = V(() => {
    ie.current = null;
  }, []), Gt = ie.current !== null, Zt = V(() => {
    S.current = !1;
    const m = P.current ?? null, D = De(m), I = (m == null ? void 0 : m.innerWidth) ?? 0, G = d.current, Z = G ? G.getBoundingClientRect() : { width: 0, height: 0 };
    oe({
      left: Math.max(Q, Math.min((I - Z.width) / 2, I - Z.width - Q)),
      top: Math.max(D.top + Q, Math.min(D.top + (D.height - Z.height) / 2, D.bottom - Z.height - Q))
    });
  }, []), pt = y(0), Jt = V(() => {
    const m = Date.now();
    m - pt.current < 300 ? (pt.current = 0, Zt()) : pt.current = m;
  }, [Zt]), Qt = te !== null, Mn = Qt ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", An = `${l ? `${l} w-full` : "max-w-xl w-full"}`, en = {
    ...Qt ? { left: te.left, top: te.top } : {},
    width: `min(100%, calc(100vw - ${Q * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...ke ? {} : { maxHeight: `calc(100vh - ${Q * 2}px)` }
  }, Pn = V((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey) return;
    const D = m.target, I = g.current;
    if (!(!!D.closest("[data-modal-close]") || !!I && I.contains(D) && !!D.closest('button, a, [role="button"]')) && D.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !I) return;
    const Z = Array.from(I.querySelectorAll("button[data-modal-confirm]")), le = Z.length > 0 ? Z : Array.from(I.querySelectorAll("button")), ce = le[le.length - 1];
    !ce || ce.disabled || (m.preventDefault(), ce.click());
  }, []);
  return /* @__PURE__ */ i(Ce.Root, { open: e, onOpenChange: (m) => {
    m || qt();
  }, children: /* @__PURE__ */ $(Ce.Portal, { container: B ?? void 0, children: [
    /* @__PURE__ */ i(
      Ce.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Dn ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), h && qt());
        }
      }
    ),
    /* @__PURE__ */ $(
      Ce.Content,
      {
        ref: ne,
        onKeyDown: Pn,
        onInteractOutside: (m) => {
          h || m.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Mn} ${An}`,
        style: { touchAction: "manipulation", ...Object.keys(en).length > 0 ? en : {} },
        children: [
          u ? /* @__PURE__ */ $(
            "div",
            {
              style: ee,
              className: `flex items-center justify-between ${Gt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                pe || Ut(m);
              },
              onPointerMove: Xt,
              onPointerUp: Vt,
              onClick: Jt,
              children: [
                /* @__PURE__ */ i(Ce.Title, { style: re, className: "font-bold text-white truncate", children: n }),
                s && /* @__PURE__ */ i(Ce.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: K, height: K } }) })
              ]
            }
          ) : /* @__PURE__ */ $(
            "div",
            {
              style: Y,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${Gt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                pe || Ut(m);
              },
              onPointerMove: Xt,
              onPointerUp: Vt,
              onClick: Jt,
              children: [
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(Ce.Title, { style: W, className: "font-bold text-white truncate", children: n })
                ] }),
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
                  f && /* @__PURE__ */ $("button", { onClick: f, style: ge, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ i(gn, { style: { width: N, height: N } }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(Ce.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: M, height: M } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: x, style: u ? he : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: o }),
          c && /* @__PURE__ */ i("div", { ref: g, style: u ? me : void 0, className: u ? "" : "shrink-0", children: u ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: c }) : c })
        ]
      }
    )
  ] }) });
}
function Di({ children: e }) {
  const t = ue(), n = k(20, 24, t), r = k(8, 12, t);
  return /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${n}px` }, children: e });
}
const Nr = "inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap", $r = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function nt({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  const l = Ke({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      style: l,
      className: `${Nr} ${$r[e]} ${t}`,
      ...r
    }
  );
}
function zr({ checked: e, onChange: t, disabled: n = !1, label: r, id: l, className: c = "", labelClassName: o = "", theme: f, variant: a = "pill", tone: u = "accent", block: s = !1 }) {
  const h = a !== "plain", d = ue(), x = k(16, 20, d), g = k(12, 14, d), p = k(12, 14, d), z = k(12, 16, d), T = k(10, 12, d), v = k(8, 10, d);
  return /* @__PURE__ */ $(
    "label",
    {
      className: `ui-checkbox ${h ? "ui-checkbox-pill rounded-lg" : ""} ${u === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${c}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: v, padding: h ? `${T}px ${z}px` : void 0 },
      onClick: (R) => R.stopPropagation(),
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: l,
            checked: e,
            disabled: n,
            onChange: (R) => t(R.target.checked),
            className: "sr-only"
          }
        ),
        h ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ $("svg", { viewBox: "0 0 16 16", style: { width: x, height: x }, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", style: { width: x, height: x }, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: "ui-checkbox-box", style: { width: x, height: x }, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: g, height: g }, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${o}`, style: { fontSize: p }, children: r })
      ]
    }
  );
}
const Rn = je(null);
function Mi() {
  const e = Ue(Rn);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Ai({ children: e }) {
  const [t, n] = F(null), [r, l] = F(!1), c = y(null), o = ue(), f = k(16, 20, o), a = k(12, 14, o), u = Ke({ px: 12, py: 8, fs: 12 }, { px: 16, py: 12, fs: 14 }), s = y(t);
  s.current = t;
  const h = V(() => {
    const v = s.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), d = V((v) => {
    if (v.suppressKey) {
      const w = localStorage.getItem(v.suppressKey);
      if (w && Date.now() < parseInt(w, 10))
        return Promise.resolve(!0);
    }
    return new Promise((w) => {
      h(), l(!1), n({ kind: "confirm", options: v, resolve: w });
    });
  }, [h]), x = V((v) => new Promise((w) => {
    h(), n({ kind: "prompt", options: v, resolve: w });
  }), [h]), g = V((v) => new Promise((w) => {
    h(), n({ kind: "alert", options: v, resolve: w });
  }), [h]);
  q(() => {
    if (t) {
      const v = setTimeout(() => {
        var w;
        return (w = c.current) == null ? void 0 : w.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [t]);
  const p = V(() => {
    var v, w;
    if (t) {
      if (t.kind === "confirm") {
        const R = t.options;
        R.suppressKey && r && localStorage.setItem(R.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((w = (v = c.current) == null ? void 0 : v.value) == null ? void 0 : w.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), z = t !== null;
  q(() => {
    if (!z) return;
    const v = (w) => {
      w.key !== "Enter" || w.shiftKey || w.metaKey || w.ctrlKey || w.altKey || w.isComposing || (w.preventDefault(), w.stopImmediatePropagation(), p());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [z, p]);
  const T = V(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ $(Rn.Provider, { value: { confirm: d, prompt: x, alert: g }, children: [
    e,
    z && /* @__PURE__ */ i(
      kr,
      {
        open: !0,
        onClose: T,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ $(Re, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(nt, { variant: "ghost", onClick: T, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(nt, { onClick: p, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            nt,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: p,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(nt, { "data-modal-confirm": !0, onClick: p, children: "Save" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: "flex flex-col", style: { gap: f }, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { style: { fontSize: a }, className: "text-zinc-400 leading-relaxed", children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            zr,
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
              style: u,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const Er = 500, Tr = 250, Sr = 5, be = 88, un = 4;
function Cr(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const l = performance.now(), c = (o) => {
    const f = o - l, a = Math.min(f / t, 1);
    n.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(c);
  };
  requestAnimationFrame(c);
}
function Rr({ x: e, y: t, ms: n }) {
  const r = y(null), l = Xe();
  return q(() => {
    r.current && Cr(r.current, n);
  }, [n]), Ct(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "fixed",
          left: e - be / 2,
          top: t - be / 2,
          width: be,
          height: be,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ $("svg", { ref: r, width: be, height: be, viewBox: `0 0 ${be} ${be}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: be / 2,
              cy: be / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: un + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: be / 2,
              cy: be / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: un,
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
function Pi() {
  return { "data-no-longpress": "true" };
}
function Lr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Ii({
  children: e,
  showRing: t = !0,
  longPressMs: n = Er,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: l,
  onLongPress: c
}) {
  const [o, f] = F(null), a = bn(), u = y(null), s = y(null), h = y({ x: 0, y: 0, target: null }), d = y(!1), x = Math.min(Tr, n * 0.5), g = y(l);
  g.current = l;
  const p = y(c);
  return p.current = c, q(() => {
    if (!fe || !a) return;
    const z = (R) => {
      if (!$t(R.pointerType) || R.button !== 0) return;
      const X = R.target;
      if (!X.closest(r) || (g.current ? !g.current(X) : Lr(X))) return;
      const _ = R.clientX, M = R.clientY;
      h.current = { x: _, y: M, target: R.target }, d.current = !0, t && (s.current = setTimeout(() => f({ x: _, y: M }), x)), u.current = setTimeout(() => {
        if (!d.current) return;
        s.current && (clearTimeout(s.current), s.current = null), f(null);
        const K = h.current.target;
        if (!K) return;
        const b = p.current;
        if (b) {
          b(K, _, M);
          return;
        }
        const N = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: _,
          clientY: M,
          button: 2,
          view: window
        });
        K.dispatchEvent(N);
      }, n);
    }, T = (R) => {
      if (!d.current || u.current === null) return;
      const X = R.clientX - h.current.x, _ = R.clientY - h.current.y;
      Math.sqrt(X * X + _ * _) > Sr && (clearTimeout(u.current), u.current = null, s.current && (clearTimeout(s.current), s.current = null), d.current = !1, f(null));
    }, v = () => {
      u.current !== null && (clearTimeout(u.current), u.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, f(null);
    }, w = (R) => {
      $t(R.pointerType) && (u.current !== null && (clearTimeout(u.current), u.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, f(null));
    };
    return a == null || a.addEventListener("pointerdown", z), a.addEventListener("pointermove", T), a.addEventListener("pointerup", v), a.addEventListener("pointercancel", v), a.addEventListener("pointerleave", w), () => {
      a.removeEventListener("pointerdown", z), a.removeEventListener("pointermove", T), a.removeEventListener("pointerup", v), a == null || a.removeEventListener("pointercancel", v), a == null || a.removeEventListener("pointerleave", w), u.current !== null && clearTimeout(u.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, x, r]), /* @__PURE__ */ $(Re, { children: [
    e,
    t && o && /* @__PURE__ */ i(Rr, { x: o.x, y: o.y, ms: n - x })
  ] });
}
function Oi() {
  const e = fr();
  return dr ? e === null || $t(e) : !1;
}
function ze({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  active: r = !1,
  className: l = "",
  type: c = "button",
  ...o
}) {
  const f = Ke({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), a = Ke({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), u = "", s = "", h = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", d = {
    light: {
      subtle: { base: `${u} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${s} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${u} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${u} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${s} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${u} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, x = `${s} bg-blue-950 hover:bg-blue-900 text-white`, g = "bg-blue-900!", p = o["data-state"] === "open", z = d[t][e], T = e === "primary" ? a : f, v = k(6, 8, ue()), w = t === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let R = `${z.base} ${p ? z.open : ""}`;
  return r && (R = `${R} ${w}`), e === "primary" && t === "light" && n && (R = p ? `${x} ${g}` : x), /* @__PURE__ */ i("button", { type: c, className: `${h} ${R} ${l}`, style: { ...T, gap: v }, ...o });
}
const Dr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Mr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], vt = 1900, wt = 2100;
function Ar(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Pr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function _i({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: l = "", initialView: c }) {
  const o = /* @__PURE__ */ new Date(), f = (() => {
    if (!c) return o;
    const S = /* @__PURE__ */ new Date(c + "T00:00:00");
    return isNaN(S.getTime()) ? o : S;
  })(), [a, u] = F(f.getFullYear()), [s, h] = F(f.getMonth()), [d, x] = F("days"), [g, p] = F(null), z = ct(() => new Set(e), [e]), T = (S) => {
    z.has(S) ? t(e.filter((U) => U !== S)) : t([...e, S]);
  }, v = ct(() => {
    const S = Ar(a, s), U = new Date(a, s, 1).getDay(), L = [];
    for (let j = 0; j < U; j++) L.push({ key: `pad-${j}`, day: 0, empty: !0 });
    for (let j = 1; j <= S; j++) L.push({ key: Pr(a, s, j), day: j, empty: !1 });
    return L;
  }, [a, s]), w = (S) => u((U) => Math.max(vt, Math.min(wt, U + S))), R = (S) => {
    s + S < 0 ? (u((U) => Math.max(vt, U - 1)), h(11)) : s + S > 11 ? (u((U) => Math.min(wt, U + 1)), h(0)) : h((U) => U + S);
  }, X = () => {
    if (g === null) return;
    const S = parseInt(g, 10);
    !isNaN(S) && S >= vt && S <= wt && u(S), p(null);
  }, _ = (S) => e.some((U) => U.startsWith(`${a}-${String(S + 1).padStart(2, "0")}`)), M = n === "dark", K = ue(), b = k(4, 8, K), N = k(16, 20, K), A = k(10, 11, K), C = k(6, 8, K), Y = k(12, 14, K), W = k(6, 10, K), ee = k(12, 14, K), re = k(8, 12, K), he = k(10, 12, K), me = k(6, 10, K), ge = k(2, 6, K), E = k(64, 80, K), H = { padding: b }, ne = { width: N, height: N }, B = { fontSize: A, paddingTop: C, paddingBottom: C }, O = { fontSize: Y, paddingTop: W, paddingBottom: W }, P = { fontSize: ee, paddingTop: re, paddingBottom: re }, te = { fontSize: he, padding: `${ge}px ${me}px` }, oe = M ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ie = M ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ $("div", { className: `border rounded-lg overflow-hidden w-full ${M ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${l}`, children: [
    /* @__PURE__ */ $("div", { className: `flex items-center justify-between px-3 py-2 border-b ${M ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? w(-1) : R(-1),
          style: H,
          className: `rounded transition-colors ${M ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(Bn, { style: ne })
        }
      ),
      d === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => x("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${M ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(a, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: g ?? String(a),
          onChange: (S) => p(S.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (S) => S.target.select(),
          onBlur: X,
          onKeyDown: (S) => {
            S.key === "Enter" && (S.preventDefault(), X()), S.key === "Escape" && p(null);
          },
          style: { width: E },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${M ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? w(1) : R(1),
          style: H,
          className: `rounded transition-colors ${M ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(lt, { style: ne })
        }
      )
    ] }),
    d === "months" ? /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Mr.map((S, U) => /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: () => {
            h(U), x("days");
          },
          style: P,
          className: `relative font-medium transition-colors border-b ${U === s ? oe : ie} ${M ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            S,
            _(U) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${U === s ? "bg-white" : M ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        S
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${M ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            u(o.getFullYear()), h(o.getMonth()), x("days");
          },
          style: { paddingTop: W, paddingBottom: W, fontSize: Y },
          className: `px-3 font-semibold rounded transition-colors ${M ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ $("div", { className: "grid grid-cols-7 text-center", children: [
      Dr.map((S) => /* @__PURE__ */ i("div", { style: B, className: `font-semibold uppercase tracking-wider border-b ${M ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: S }, S)),
      v.map((S) => S.empty ? /* @__PURE__ */ i("div", {}, S.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => T(S.key),
          style: O,
          className: `font-medium transition-colors border-b ${M ? "border-zinc-800/60" : "border-zinc-50"} ${z.has(S.key) ? oe : M ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: S.day
        },
        S.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ $("div", { className: `px-3 py-2 border-t ${M ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ $("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((S) => {
        const U = /* @__PURE__ */ new Date(S + "T00:00:00"), L = U.getFullYear() === o.getFullYear() ? U.toLocaleString("default", { month: "short", day: "numeric" }) : U.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ $(
          "button",
          {
            type: "button",
            onClick: () => T(S),
            "aria-label": `Remove ${L}`,
            style: te,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${M ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              L,
              /* @__PURE__ */ i("span", { className: `leading-none ${M ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          S
        );
      }) })
    ] })
  ] });
}
function Hi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: l,
  allSelected: c = !1,
  toggleAllLabel: o,
  emptyHint: f = "Nothing here",
  maxHeight: a,
  disabled: u = !1,
  theme: s,
  className: h = ""
}) {
  const d = (w) => t instanceof Set ? t.has(w) : t.includes(w), x = ue(), g = k(12, 16, x), p = k(8, 12, x), z = k(12, 14, x), T = k(16, 20, x), v = r != null || l != null;
  return /* @__PURE__ */ $("div", { className: h, ...s ? { "data-theme": s } : {}, children: [
    v && /* @__PURE__ */ $("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      l != null && /* @__PURE__ */ i("button", { type: "button", disabled: u, onClick: l, className: "ui-checklist-toggleall", children: o ?? (c ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const R = d(w.id);
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(w.id),
                className: `ui-checklist-item ${R ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${p}px ${g}px`, fontSize: z },
                children: [
                  /* @__PURE__ */ i("span", { className: "ui-checklist-box", style: { width: T, height: T }, "aria-hidden": !0, children: R && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
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
function Bi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: l = "Nothing here",
  maxHeight: c,
  compact: o = !1,
  disabled: f = !1,
  theme: a,
  className: u = ""
}) {
  const s = ue(), h = o ? 10 : k(12, 16, s), d = o ? 6 : k(8, 12, s), x = o ? 12 : k(12, 14, s), g = o ? 14 : k(16, 20, s);
  return /* @__PURE__ */ $("div", { className: u, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((p) => {
            const z = t === p.id;
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(p.id),
                className: `ui-checklist-item ${z ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${d}px ${h}px`, fontSize: x },
                children: [
                  /* @__PURE__ */ i("span", { className: "ui-radio-circle", style: { width: g, height: g }, "aria-hidden": !0, children: z && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  p.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: p.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: p.label }),
                  p.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: p.secondary })
                ]
              },
              p.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
const Fi = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: l = "visible",
  offset: c = 8
}) => {
  const o = _e(), { refs: f, floatingStyles: a } = jn({
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
        fn: (u) => {
          var v;
          if (l !== "visible") return {};
          const s = (v = u.elements.floating.ownerDocument) == null ? void 0 : v.defaultView;
          if (!s) return {};
          const h = u.rects.reference, d = Math.max(h.x, 0), x = Math.max(h.y, 0), g = Math.min(h.x + h.width, s.innerWidth), p = Math.min(h.y + h.height, s.innerHeight);
          if (g <= d || p <= x) return {};
          const z = r === "left" ? g - (h.x + h.width) : r === "right" ? d - h.x : 0, T = r === "top" ? x - h.y : r === "bottom" ? p - (h.y + h.height) : 0;
          return { x: u.x + z, y: u.y + T };
        }
      },
      Xn(c),
      Vn({ padding: 8 }),
      Gn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (u) => {
          var p;
          const s = (p = u.elements.floating.ownerDocument) == null ? void 0 : p.defaultView;
          if (!s) return {};
          const h = u.rects.floating.width, d = u.rects.floating.height, x = Math.max(8, Math.min(u.x, s.innerWidth - h - 8)), g = Math.max(8, Math.min(u.y, s.innerHeight - d - 8));
          return { x, y: g };
        }
      }
    ],
    whileElementsMounted: Un
  });
  return we(() => {
    n && f.setReference(n);
  }, [n, f]), /* @__PURE__ */ $(Re, { children: [
    !n && /* @__PURE__ */ i("div", { ref: f.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    o && Ct(
      /* @__PURE__ */ i(
        "div",
        {
          ref: f.setFloating,
          className: `ui-chrome ${e}`,
          style: a,
          onMouseDown: (u) => u.stopPropagation(),
          onClick: (u) => u.stopPropagation(),
          onDragStart: (u) => u.preventDefault(),
          children: t
        }
      ),
      o.document.body
    )
  ] });
}, Ye = ({ content: e, children: t }) => {
  const n = ue(), r = k(10, 12, n), l = k(6, 6, n), c = k(10, 12, n), o = { padding: `${l}px ${r}px`, fontSize: c }, f = Xe(), a = _e(), [u, s] = F(!1), [h, d] = F({ x: 0, y: 0 }), x = y(null), g = () => {
    if (!x.current) return;
    const p = x.current.getBoundingClientRect();
    d({ x: p.left + p.width / 2, y: p.top });
  };
  return q(() => (u && a && (g(), a.addEventListener("scroll", g, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", g, !0)), [u]), /* @__PURE__ */ $(
    "div",
    {
      ref: x,
      className: "inline-flex",
      onMouseEnter: () => {
        g(), s(!0);
      },
      onMouseLeave: () => s(!1),
      children: [
        t,
        u && Ct(
          /* @__PURE__ */ $(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white",
              style: { ...o, left: h.x, top: h.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((p, z) => /* @__PURE__ */ i("div", { className: z > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: p }, z)),
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
function Ze() {
  const e = ue(), t = fe, n = t ? k(28, 40, e) : 28, r = t ? k(28, 40, e) : 28, l = t ? k(10, 14, e) : 10, c = t ? k(10, 14, e) : 10, o = t ? k(8, 10, e) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${l}px`, fontSize: c },
    input: { height: r, padding: `0 ${o}px`, fontSize: c }
  };
}
const Yi = fe ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Ir = fe ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", rt = fe ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Or = "hover:bg-red-950/50", Wi = fe ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ki = "bg-blue-900/50 border-blue-700 text-blue-300", qi = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", _r = fe ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", ji = fe ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", st = fe ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Hr = "inline-flex rounded overflow-hidden border border-zinc-700", Ui = fe ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", it = ({ onClick: e, disabled: t, title: n, className: r = Ir, children: l }) => {
  const c = Ze();
  return /* @__PURE__ */ i(Ye, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, style: c.control, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: l }) });
}, Xi = ({ value: e, options: t, onChange: n, disabled: r, active: l }) => {
  const c = Ze();
  return /* @__PURE__ */ i("div", { className: Hr, children: t.map((o) => {
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
}, Vi = ({ children: e }) => /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: fe ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Br = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Fr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Gi = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ $("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? Br : Fr, children: e }),
  t
] }), Zi = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ $("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Ji = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: l }) => /* @__PURE__ */ $(Re, { children: [
  /* @__PURE__ */ i(it, { onClick: () => r(-1), disabled: e, title: "Move up", className: rt, children: /* @__PURE__ */ i(Fn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(it, { onClick: () => r(1), disabled: e, title: "Move down", className: rt, children: /* @__PURE__ */ i(Yn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(it, { onClick: t, disabled: e, title: "Duplicate", className: rt, children: /* @__PURE__ */ i(pn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: st }),
  /* @__PURE__ */ i(it, { onClick: n, disabled: e, title: "Delete", className: `${rt} ${Or}`, children: /* @__PURE__ */ i(Nt, { className: "w-2.5 h-2.5" }) })
] }), Yr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Wr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Kr = /^(https?:\/\/|mailto:)/i;
function qr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const l = n.slice(0, r).trim().toLowerCase(), c = n.slice(r + 1).trim();
    Wr.has(l) && c && t.push(`${l}: ${c}`);
  }
  return t.join("; ");
}
function Tt(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const f = document.createDocumentFragment();
    for (const a of Array.from(t.childNodes)) f.appendChild(Tt(a));
    return f;
  };
  if (!Yr.has(n)) return r();
  if (n === "a") {
    const f = t.getAttribute("href") || "";
    if (!Kr.test(f)) return r();
  }
  const l = document.createElement(n), c = t.getAttribute("style"), o = qr(c || "");
  if (o && l.setAttribute("style", o), n === "a") {
    l.setAttribute("href", t.getAttribute("href"));
    const f = t.getAttribute("target"), a = t.getAttribute("rel");
    f && l.setAttribute("target", f), a && l.setAttribute("rel", a);
  }
  for (const f of Array.from(t.childNodes)) l.appendChild(Tt(f));
  return l;
}
function Ln(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function jr(e) {
  const t = Ln(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const o of Array.from(n.content.childNodes)) r.appendChild(Tt(o));
  const l = document.createElement("div");
  return l.appendChild(r), l.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Qi(e) {
  const t = Ln(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function eo(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Ur = { text: "#52525b" }, Xr = ({ node: e, selected: t, extension: n, editor: r, view: l, getPos: c }) => {
  var h;
  const o = e.attrs.field ?? "", f = n.options, a = ((h = f.resolve) == null ? void 0 : h.call(f, o)) ?? null, u = (a == null ? void 0 : a.color) ?? Ur, s = (a == null ? void 0 : a.label) ?? `{{${o}}}`;
  return /* @__PURE__ */ i(
    Qn,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: u.text,
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
        var z;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const x = typeof c == "function" ? c() : null;
        if (x == null) return;
        const g = l.state.doc.resolve(x), p = g.nodeAfter;
        p && at.isSelectable(p) && l.dispatch(l.state.tr.setSelection(new at(g))), (z = f.onTokenClick) == null || z.call(f, o, d.currentTarget.getBoundingClientRect(), x);
      },
      children: s
    }
  );
};
function Vr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function dn(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Gr = lr.extend({
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
    return Jn(Xr);
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
    return ["span", Zn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Zr = 240, Jr = 280, Qr = ({ props: e, onApi: t }) => {
  const n = ft(), r = y(t);
  r.current = t, q(() => {
    r.current(n);
  }, [n]);
  const l = y(null);
  q(() => {
    var o, f;
    (f = (o = l.current) == null ? void 0 : o.querySelector(".ui-item-highlighted")) == null || f.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex]), q(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const c = It();
  return /* @__PURE__ */ i(Ge.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Jr, maxHeight: Zr },
      onMouseDown: (o) => o.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: l, children: e.items.map((o) => /* @__PURE__ */ i(
        ei,
        {
          item: o,
          d: c,
          command: () => e.command({ field: o.key })
        },
        o.key
      )) })
    }
  ) });
}, ei = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: l, setPointer: c } = Tn({
    label: () => e.label,
    activate: n
  }), o = ue(), f = { padding: `${k(8, 12, o)}px ${k(12, 16, o)}px`, fontSize: k(12, 14, o) };
  return /* @__PURE__ */ $(
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
}, ti = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(Qr, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const l = ar(r);
      e = { holder: r, root: l, unmount: null, props: n, api: null };
      const c = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: o, y: f, placement: a, strategy: u }) => {
          var d, x;
          if (!e) return;
          const s = (x = (d = e.props) == null ? void 0 : d.clientRect) == null ? void 0 : x.call(d), h = s && !a.endsWith("-end") ? s.width : 0;
          r.style.position = u, r.style.left = `${o + h}px`, r.style.top = `${f}px`;
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
        const f = c.highlightedIndex, a = o === "ArrowDown" ? 1 : -1;
        return c.setHighlighted((f + a + r.length) % r.length, "keyboard"), !0;
      }
      if (o === "Enter" || o === "Tab") {
        n.preventDefault();
        const f = c.highlightedIndex, a = f >= 0 ? f : 0, u = c.items[a];
        return u ? u.activate() : r[a] && l({ field: r[a].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, to = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, ni = Me.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: l,
  onStateChange: c,
  resolveToken: o,
  suggestionItems: f,
  onTokenClick: a,
  onSelectionChange: u
}, s) => {
  const h = y(o);
  h.current = o;
  const d = y(f);
  d.current = f;
  const x = y(a);
  x.current = a;
  const g = y(u);
  g.current = u;
  const p = y(null), z = y(null), T = y(t);
  T.current = t;
  const v = y(r);
  v.current = r;
  const w = y(c);
  w.current = c;
  const R = y(null), X = (N) => {
    var Y;
    const A = {
      bold: N.isActive("bold"),
      italic: N.isActive("italic"),
      underline: N.isActive("underline"),
      strike: N.isActive("strike"),
      link: N.isActive("link"),
      color: N.getAttributes("textStyle").color || ""
    }, C = R.current;
    C && C.bold === A.bold && C.italic === A.italic && C.underline === A.underline && C.strike === A.strike && C.link === A.link && C.color === A.color || (R.current = A, (Y = w.current) == null || Y.call(w, A));
  }, _ = (N) => {
    var ee;
    const A = N.state.selection;
    let C = null;
    A instanceof at && A.node.type.name === "token" ? (C = { key: A.node.attrs.field ?? "", pos: A.from }, p.current = A.from) : p.current != null && (p.current = N.state.tr.mapping.map(p.current));
    const Y = z.current, W = Y && C && Y.key === C.key && Y.pos === C.pos;
    !Y && !C || W || (z.current = C, (ee = g.current) == null || ee.call(g, C));
  }, M = (N) => {
    const A = jr(Vr(N));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(A) ? "" : A;
  }, K = Me.useMemo(() => {
    const N = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: A }) => {
        var C;
        return ((C = d.current) == null ? void 0 : C.call(d, A)) ?? [];
      },
      command: ({ editor: A, range: C, props: Y }) => {
        A.chain().focus().insertContentAt(C, { type: "token", attrs: { field: Y.field } }).run();
      },
      render: ti
    };
    return Gr.configure({
      resolve: h.current ?? null,
      suggestion: N,
      onTokenClick: (A, C, Y) => {
        var W;
        p.current = Y, (W = x.current) == null || W.call(x, A, C, Y);
      }
    });
  }, []), b = er({
    immediatelyRender: !1,
    extensions: [
      nr,
      rr.configure({ placeholder: n }),
      ir,
      or,
      cr,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      sr.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      K
    ],
    content: dn(e || ""),
    editable: !r,
    onUpdate: ({ editor: N }) => {
      T.current(M(N.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: N }) => {
      X(N), _(N);
    }
  });
  return q(() => {
    if (!b || b.isFocused) return;
    M(b.getHTML()) !== e && (R.current = null, b.commands.setContent(dn(e || ""), { emitUpdate: !1 }), X(b));
  }, [e, b]), q(() => {
    b && b.setEditable(!r);
  }, [r, b]), q(() => {
    b && (R.current = null, X(b), _(b));
  }, [b]), On(s, () => ({
    exec: (N, A) => {
      if (!(!b || v.current))
        switch (N) {
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
            A && b.chain().focus().setColor(A).run();
            break;
          case "unsetColor":
            b.chain().focus().unsetColor().run();
            break;
          case "link":
            A && b.chain().focus().extendMarkRange("link").setLink({ href: A }).run();
            break;
          case "unlink":
            b.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => b == null ? void 0 : b.commands.focus(),
    insertToken: (N) => {
      !b || v.current || b.chain().focus().insertContent({ type: "token", attrs: { field: N } }).run();
    },
    replaceToken: (N) => {
      if (!b || v.current) return;
      const A = p.current;
      A != null && b.commands.command(({ tr: C }) => {
        const Y = C.doc.nodeAt(A);
        if (!Y || Y.type.name !== "token") return !1;
        C.setNodeMarkup(A, void 0, { field: N });
        const W = C.doc.resolve(A);
        return W.nodeAfter && W.nodeAfter.type.name === "token" && C.setSelection(new at(W)), !0;
      });
    }
  }), [b]), /* @__PURE__ */ i(tr, { editor: b, className: `richtext-editor ${l || ""}` });
});
ni.displayName = "RichTextEditor";
const ri = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], ii = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], fn = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), no = ({ value: e, disabled: t, onChange: n }) => {
  const [r, l] = F(!1), c = Ze();
  return /* @__PURE__ */ i(
    ht,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ $(ze, { theme: "dark", disabled: t, style: c.control, className: "justify-between min-w-0", children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(St, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: ri.map((o) => /* @__PURE__ */ i(xr, { onClick: () => {
        n(o), l(!1);
      }, icon: o === e ? /* @__PURE__ */ i(mn, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: o }, children: o }) }, o))
    }
  );
}, oi = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, l] = F(!1), c = Ze(), [o, f] = F(""), a = () => {
    var s;
    const u = o.trim();
    u && ((s = e.current) == null || s.exec("link", u), l(!1));
  };
  return /* @__PURE__ */ i(
    ht,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ i(
        ze,
        {
          theme: "dark",
          active: n,
          disabled: t,
          onMouseDown: (u) => u.preventDefault(),
          style: { ...c.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(qn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ $("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: o,
            onChange: (u) => f(u.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (u) => {
              u.key === "Enter" && (u.preventDefault(), a());
            },
            style: c.input,
            className: _r + " w-full"
          }
        ),
        /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i(ze, { theme: "dark", onClick: a, style: c.control, disabled: !o.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            ze,
            {
              theme: "dark",
              onClick: () => {
                var u;
                (u = e.current) == null || u.exec("unlink"), l(!1);
              },
              style: c.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, ro = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: l }) => {
  const [c, o] = F(!1), f = (s, h) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(s, h);
  }, a = Ze(), u = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ $("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(Ye, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i(ze, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || u("bold"), disabled: t || u("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("bold"), style: { ...a.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
    /* @__PURE__ */ i(Ye, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i(ze, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || u("italic"), disabled: t || u("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("italic"), style: { ...a.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
    /* @__PURE__ */ i(Ye, { content: "Underline", children: /* @__PURE__ */ i(ze, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("underline"), style: { ...a.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Wn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(Ye, { content: "Strikethrough", children: /* @__PURE__ */ i(ze, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("strikeThrough"), style: { ...a.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Kn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: st }),
    /* @__PURE__ */ i(oi, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: st }),
    /* @__PURE__ */ i(
      ht,
      {
        open: c,
        onOpenChange: o,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ $(ze, { theme: "dark", disabled: t, style: a.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(fn, {}),
          /* @__PURE__ */ i(St, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                f("unsetColor"), o(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(fn, { className: "w-3.5 h-3.5" })
            }
          ),
          ii.map((s) => /* @__PURE__ */ i(
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
    l && /* @__PURE__ */ $(Re, { children: [
      /* @__PURE__ */ i("div", { className: st }),
      l
    ] })
  ] });
};
function io(e = "md") {
  const t = fe && yn() > 0;
  return e === "sm" ? `${t ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function oo({ title: e, icon: t, count: n, tone: r = "default", collapsed: l, onToggle: c, trailing: o, bodyClass: f, className: a = "", dataProps: u, children: s }) {
  const h = ue(), d = Ke({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), x = k(14, 16, h), g = { width: x, height: x }, p = k(10, 12, h);
  return /* @__PURE__ */ $("div", { ...u, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ $("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: d, children: [
      /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: c,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            l ? /* @__PURE__ */ i(lt, { className: "text-zinc-400 shrink-0", style: g }) : /* @__PURE__ */ i(St, { className: "text-zinc-400 shrink-0", style: g }),
            t,
            /* @__PURE__ */ i("span", { className: "font-semibold text-zinc-200 truncate", children: e }),
            n && /* @__PURE__ */ i("span", { className: "text-zinc-500 shrink-0", style: { fontSize: p }, children: n })
          ]
        }
      ),
      o && /* @__PURE__ */ i("div", { className: "shrink-0", children: o })
    ] }),
    !l && s && /* @__PURE__ */ i("div", { className: f || "ui-card-band border-t p-1.5 space-y-1", children: s })
  ] });
}
export {
  ze as Button,
  oo as CardSection,
  zr as Checkbox,
  Hi as Checklist,
  Zi as ChromeHeader,
  Gi as ContentRow,
  Si as ContextMenu,
  Ri as ContextMenuDivider,
  Ci as ContextMenuItem,
  Li as ContextMenuSub,
  _i as DatePicker,
  Ai as DialogProvider,
  xr as DropdownItem,
  ht as DropdownMenu,
  vr as DropdownSubmenu,
  Pt as DropdownThemeContext,
  ri as FONTS,
  Fi as FloatingChrome,
  no as FontMenu,
  ro as FormatToolbar,
  fe as IS_COARSE,
  dr as IS_TOUCH_CAPABLE,
  Ti as ItemManagerDropdown,
  Ii as LongPressMenuProvider,
  Lt as MORPH_EASE,
  Oe as MORPH_MS,
  Dt as MORPH_OPACITY_MS,
  Ge as MenuHighlightContext,
  kr as Modal,
  Di as ModalFooter,
  nt as ModalFooterButton,
  ur as PopoutWindowContext,
  to as RICH_TEXT_STATE_IDLE,
  Bi as RadioList,
  ni as RichTextEditor,
  Vi as SectionHeader,
  Xi as Seg,
  Ji as StructureControls,
  Ot as SubmenuContext,
  Ir as TB_BTN,
  rt as TB_BTN_ICON,
  Or as TB_DANGER,
  st as TB_DIVIDER,
  _r as TB_INPUT,
  ji as TB_NUM,
  Ui as TB_PICKER,
  Yi as TB_ROW_LABEL,
  Hr as TB_SEG,
  Wi as TB_TOGGLE,
  qi as TB_TOGGLE_OFF,
  Ki as TB_TOGGLE_ON,
  Gr as Token,
  Xr as TokenChipView,
  it as ToolButton,
  Ye as Tooltip,
  Mt as ZOOM_FROM,
  pr as cloneOverlayClose,
  k as coarsePx,
  eo as escapeHtml,
  yn as getCoarseScale,
  It as getDropdownClasses,
  $i as getHardwareKeyboard,
  Ni as getLastPointerType,
  io as inputCls,
  Lr as isInteractiveElement,
  $t as isTouchLike,
  wn as nearestOverlayOrigin,
  Ln as normalizeSpaces,
  bt as overlayMorphEnabled,
  mr as playOverlayClose,
  hr as playOverlayOpen,
  dn as preprocessTokenHtml,
  jr as sanitizeRichText,
  wi as setCoarseScale,
  Qi as stripRichText,
  Vr as stripTokenWrappers,
  ki as useCoarse,
  ue as useCoarseScale,
  Ke as useCoarseSize,
  bn as useCurrentDocument,
  _e as useCurrentWindow,
  Mi as useDialog,
  zn as useDropdownTheme,
  gr as useFixedPosition,
  zi as useHardwareKeyboard,
  fr as useLastPointerType,
  Pi as useLongPressOptOut,
  _t as useMenuHighlight,
  At as useOverlayMorph,
  Rt as usePopoutWindow,
  Xe as usePortalTarget,
  Ei as useSmartPosition,
  Oi as useTouchMode
};
