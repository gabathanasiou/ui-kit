"use client";
import { jsxs as $, jsx as i, Fragment as $e } from "react/jsx-runtime";
import Te, { createContext as _e, useContext as Be, useState as B, useEffect as K, useRef as x, useCallback as j, useLayoutEffect as be, useMemo as Ze, useImperativeHandle as bn } from "react";
import * as G from "@radix-ui/react-dropdown-menu";
import { Check as Ut, X as ut, Pencil as xn, Copy as jt, Trash2 as dt, RotateCcw as Vt, Plus as yn, ChevronRight as Je, ChevronLeft as vn, ArrowUp as wn, ArrowDown as kn, ChevronDown as xt, Underline as Nn, Strikethrough as $n, Link as Cn } from "lucide-react";
import * as Ne from "@radix-ui/react-dialog";
import { createPortal as yt } from "react-dom";
import { useFloating as En, autoUpdate as zn, offset as Tn, flip as Rn, shift as Sn } from "@floating-ui/react-dom";
import { mergeAttributes as Dn, ReactNodeViewRenderer as Ln, NodeViewWrapper as Mn, useEditor as An, EditorContent as Pn } from "@tiptap/react";
import { NodeSelection as Qe } from "@tiptap/pm/state";
import In from "@tiptap/starter-kit";
import On from "@tiptap/extension-placeholder";
import { TextStyle as Hn } from "@tiptap/extension-text-style";
import _n from "@tiptap/extension-color";
import Bn from "@tiptap/extension-link";
import Fn from "@tiptap/extension-underline";
import { Mention as Wn } from "@tiptap/extension-mention";
import { createRoot as Kn } from "react-dom/client";
const qn = _e(null);
function vt() {
  return Be(qn);
}
function Fe() {
  const e = vt();
  return e ? e.document.body : null;
}
function Xt() {
  const e = vt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function Ae() {
  return vt() ?? (typeof window < "u" ? window : null);
}
const We = typeof window < "u", N = We && window.matchMedia("(pointer: coarse)").matches, Yn = We && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function ft(e) {
  return e === "touch" || e === "pen";
}
let Le = null;
const ht = /* @__PURE__ */ new Set();
We && window.addEventListener("pointerdown", (e) => {
  Le = e.pointerType, ht.forEach((t) => t());
}, !0);
function $i() {
  return Le;
}
function Un() {
  const [, e] = B(0), t = x(Le);
  return K(() => {
    const n = () => {
      t.current !== Le && (t.current = Le, e((r) => r + 1));
    };
    return ht.add(n), () => {
      ht.delete(n);
    };
  }, []), Le;
}
const Gt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Zt() {
  return We ? Gt.some((e) => window.matchMedia(e).matches) : !1;
}
let et = Zt();
const mt = /* @__PURE__ */ new Set();
function Ot(e) {
  et !== e && (et = e, mt.forEach((t) => t()));
}
var Yt;
if (We) {
  const e = () => Ot(Zt());
  for (const l of Gt) {
    const u = window.matchMedia(l);
    (Yt = u.addEventListener) == null || Yt.call(u, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (l) => {
    l.isComposing || l.keyCode !== 229 && (l.key === "Enter" || l.key === "Backspace" || l.key === "Process" || l.key === "Unidentified" || Ot(!0));
  });
  let n = null, r = null;
  const a = "__penClick", o = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (l) => {
    l.pointerType !== "pen" || l.button !== 0 || (n = { x: l.clientX, y: l.clientY });
  }, !0), window.addEventListener("pointerup", (l) => {
    if (l.pointerType !== "pen") return;
    const u = n;
    if (n = null, !u || Math.hypot(l.clientX - u.x, l.clientY - u.y) > 8) return;
    const c = l.target;
    if (!c || !c.isConnected) return;
    if (c instanceof HTMLInputElement && o.has(c.type)) {
      try {
        c.showPicker();
      } catch {
      }
      return;
    }
    const h = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    h[a] = !0, r = { x: l.clientX, y: l.clientY, time: Date.now() }, c.dispatchEvent(h);
  }, !0), window.addEventListener("click", (l) => {
    l[a] || r && Date.now() - r.time < 1e3 && Math.hypot(l.clientX - r.x, l.clientY - r.y) < 12 && (l.preventDefault(), l.stopPropagation());
  }, !0);
}
function Ci() {
  return et;
}
function Ei() {
  const [, e] = B(0);
  return K(() => {
    const t = () => e((n) => n + 1);
    return mt.add(t), () => {
      mt.delete(t);
    };
  }, []), et;
}
const Me = 220, wt = "cubic-bezier(0.32, 0.72, 0, 1)", kt = 170, Nt = 0.94;
function it(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Jt(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function Qt(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return Jt({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function jn(e, t, n, r) {
  const a = ++e.current, o = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${Nt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === a && requestAnimationFrame(() => {
      if (e.current !== a) return;
      const l = Qt(t, n);
      t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transition = `transform ${Me}ms ${wt}, opacity ${kt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === a && (t.style.transition = o.transition, t.style.transform = o.transform, t.style.transformOrigin = o.transformOrigin, t.style.opacity = o.opacity, r == null || r());
      }, Me + 60);
    });
  });
}
function Vn(e, t, n, r) {
  const a = ++e.current, o = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, l = Qt(t, n);
  t.style.transition = `transform ${Me}ms ${wt}, opacity ${kt}ms ease`, t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transform = `scale(${Nt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === a && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== a || t.isConnected || (t.style.transition = o.transition, t.style.transform = o.transform, t.style.transformOrigin = o.transformOrigin, t.style.opacity = o.opacity, t.style.pointerEvents = o.pointerEvents, t.style.visibility = o.visibility);
    }));
  }, Me + 60);
}
function Xn(e, t, n) {
  const r = e.cloneNode(!0), a = e.getBoundingClientRect(), o = a.width > 0 || a.height > 0 ? a : n ?? a;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const l = (t == null ? void 0 : t()) ?? null, u = l ? Jt({ left: o.left, top: o.top, width: o.width, height: o.height }, l) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Me}ms ${wt}, opacity ${kt}ms ease`, r.style.transform = `scale(${Nt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Me + 60));
    });
  });
}
function $t(e) {
  const t = x(null), [n, r] = B(!1), a = x(null), o = x(0), l = j((p) => {
    if (e.ref && (e.ref.current = p), p) {
      o.current = 0, t.current = p;
      const E = p.getBoundingClientRect();
      (E.width > 0 || E.height > 0) && (a.current = { left: E.left, top: E.top, width: E.width, height: E.height }), r(!0);
      return;
    }
    const g = t.current, w = ++o.current;
    queueMicrotask(() => {
      w === o.current && t.current === g && (t.current = null, r(!1), !(!g || !e.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && it(d.current) && Xn(g, s.current, a.current));
    });
  }, []), u = j(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (a.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), c = x(e.visible);
  c.current = e.visible;
  const h = x(e.visible), s = x(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const m = x(e.onClosed);
  m.current = e.onClosed;
  const d = x(e.morph !== !1);
  d.current = e.morph !== !1;
  const v = x(0);
  return be(() => {
    if (!n || !c.current || !it(d.current)) return;
    const p = t.current;
    p && jn(v, p, s.current);
  }, [n, e.visible]), K(() => {
    if (!n || !c.current) return;
    let p = 0;
    const g = () => {
      p = 0, u(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, u]), be(() => {
    var w;
    const p = h.current;
    if (h.current = e.visible, e.visible || !p) return;
    const g = t.current;
    if (!g || !it(d.current)) {
      (w = m.current) == null || w.call(m);
      return;
    }
    Vn(v, g, s.current, () => {
      var E;
      return (E = m.current) == null ? void 0 : E.call(m);
    });
  }, [e.visible]), K(() => {
    if (!n || !c.current) return;
    const p = (g) => {
      const w = t.current;
      w && w.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), K(() => {
    if (!n || !c.current) return;
    const p = (g) => {
      const w = t.current;
      w && w.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), l;
}
function en(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function zi(e, t) {
  const n = Ae(), r = x(n);
  r.current = n;
  const a = () => {
    if (!t || !e.current) return;
    const o = e.current.querySelector(".absolute");
    if (!o) return;
    o.style.left = "", o.style.right = "", o.style.top = "", o.style.bottom = "", o.style.maxHeight = "";
    const l = r.current;
    if (!l) return;
    const u = e.current.getBoundingClientRect(), c = o.getBoundingClientRect(), h = l.innerWidth, s = en(l), m = c.right - h;
    if (m > 0) {
      const d = Math.min(m + 8, c.left);
      o.style.left = `${c.left - u.left - d}px`;
    }
    c.left < 0 && (o.style.left = `${-u.left + 4}px`), c.bottom > s.bottom + 4 && (o.style.top = "auto", o.style.bottom = "100%", o.getBoundingClientRect().top < s.top && (o.style.bottom = "auto", o.style.top = `${-u.top + s.top + 4}px`, o.style.maxHeight = `${s.height - 8}px`));
  };
  be(() => {
    if (a(), !t) return;
    const o = r.current, l = (o == null ? void 0 : o.visualViewport) ?? null;
    return l == null || l.addEventListener("resize", a), l == null || l.addEventListener("scroll", a), o == null || o.addEventListener("resize", a), () => {
      l == null || l.removeEventListener("resize", a), l == null || l.removeEventListener("scroll", a), o == null || o.removeEventListener("resize", a);
    };
  }, [t, e]);
}
function Gn(e, t, n, r) {
  const a = Ae(), o = x(a);
  o.current = a, be(() => {
    if (!t || !e.current) return;
    const l = e.current;
    let u = 0;
    const c = () => {
      u = 0;
      const v = l.getBoundingClientRect(), p = o.current;
      if (!p) return;
      const g = p.innerWidth, w = en(p), E = (r == null ? void 0 : r.panelWidth) ?? Math.max(v.width, 200), _ = 4, U = 120;
      let M = Math.max(0, v.left);
      M + E > g && (M = Math.max(0, g - E - 8));
      const Y = w.bottom - v.bottom - _ - 16, D = v.top - w.top - _ - 16;
      if (Y >= U || Y >= D) {
        const R = Math.min(v.bottom + _, w.bottom), W = Math.max(U, w.bottom - R - 16);
        n({ top: R, left: M, width: v.width, maxH: W });
      } else {
        const R = Math.max(U, Math.min(D, 360)), W = w.bottom - (v.top - _);
        n({ top: 0, left: M, width: v.width, maxH: R, bottom: Math.max(0, W) });
      }
    }, h = () => {
      u || (u = requestAnimationFrame(c));
    }, s = o.current ?? null, m = (s == null ? void 0 : s.document) ?? null;
    h(), m == null || m.addEventListener("scroll", h, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", h);
    const d = (s == null ? void 0 : s.visualViewport) ?? null;
    return d == null || d.addEventListener("resize", h), d == null || d.addEventListener("scroll", h), () => {
      u && cancelAnimationFrame(u), m == null || m.removeEventListener("scroll", h, { capture: !0 }), s == null || s.removeEventListener("resize", h), d == null || d.removeEventListener("resize", h), d == null || d.removeEventListener("scroll", h);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let De = null;
function tn(e) {
  return De == null || De(), De = e, () => {
    De === e && (De = null);
  };
}
const Ct = _e("dark"), nn = () => Be(Ct), Zn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ht = N ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Jn = N ? "text-xs" : "text-[10px]";
function Et(e) {
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
    headerPad: Ht,
    headerText: `${Ht} font-semibold uppercase tracking-wider ${Jn} ui-label`,
    // Item padding
    itemPad: Zn,
    // Input
    input: N ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: N ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
function rn(e) {
  const t = [];
  return Te.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (Te.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const zt = _e({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Ke = _e(null), Tt = () => Be(Ke);
function tt() {
  const e = x([]), [t, n] = B(-1), [r, a] = B(!1), [o, l] = B(0), u = j((m) => (e.current = [...e.current, m], l((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== m), l((d) => d + 1);
  }), []), c = j((m, d) => {
    n(m), a(d === "pointer");
  }, []), h = j(() => {
    a((m) => m && (n(-1), !1));
  }, []);
  return Ze(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: u,
    setHighlighted: c,
    pointerLeave: h
  }), [t, r, o, u, c, h]);
}
function on(e) {
  const t = Tt(), n = x(t);
  n.current = t;
  const r = x(null);
  K(() => {
    var c;
    const u = { label: e.label(), activate: e.activate };
    return r.current = u, (c = n.current) == null ? void 0 : c.register(u);
  }, []);
  const a = t && r.current ? t.items.indexOf(r.current) : -1, o = !!t && !e.disabled && a >= 0 && a === t.highlightedIndex;
  return { api: t, myIndex: a, highlighted: o, setPointer: (u) => {
    !e.disabled && t && u >= 0 && t.setHighlighted(u, "pointer");
  } };
}
function Rt(e, t, n, r) {
  const a = x(-1);
  a.current = t.highlightedIndex;
  const o = x(t);
  o.current = t;
  const l = x(e);
  l.current = e;
  const u = x(r);
  u.current = r;
  const c = x({ text: "", time: 0 }), h = x(!1);
  h.current || (h.current = !0, n.current = (s) => {
    var d, v;
    if (!l.current) return;
    const m = o.current.items;
    if (m.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = s.key === "ArrowDown" ? 1 : -1, g = (a.current + p + m.length) % m.length;
        o.current.setHighlighted(g, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = a.current;
        p >= 0 && p < m.length && m[p].submenu && m[p].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (v = (d = u.current) == null ? void 0 : d.onCloseSub) == null || v.call(d);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = a.current;
        p >= 0 && p < m.length && m[p].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = Date.now(), g = (p - c.current.time > 500 ? "" : c.current.text) + s.key.toLowerCase();
        if (c.current = { text: g, time: p }, !g) return;
        const w = a.current + 1;
        for (let E = 0; E < m.length; E++) {
          const _ = (w + E) % m.length;
          if (m[_].label.toLowerCase().startsWith(g)) {
            o.current.setHighlighted(_, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function St(e, t, n, r, a, o) {
  const l = x(t);
  l.current = t;
  const u = x(e);
  u.current = e;
  const c = x(a);
  c.current = a;
  const h = x(!1);
  h.current || (h.current = !0, o.current = (s) => {
    if (!u.current || c.current) return;
    const m = r.current;
    m && m.contains(s.target) || l.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function Dt(e, t) {
  const n = x(e);
  n.current = e;
  const r = x(!1);
  r.current || (r.current = !0, t.current = (a) => {
    if (!n.current) return;
    const o = a.currentTarget;
    o.scrollHeight > o.clientHeight && (a.preventDefault(), o.scrollTop += a.deltaY);
  });
}
function nt({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: a = "left",
  width: o,
  theme: l = "dark",
  children: u,
  morph: c = !0,
  contentClassName: h,
  initialHighlightIndex: s
}) {
  const [m, d] = B([]), [v, p] = B(null), g = Fe(), w = Xt(), E = x(null), _ = x(null), U = x(e);
  U.current = e;
  const [M, Y] = B(e), D = tt();
  K(() => {
    if (e)
      return Y(!0), D.setHighlighted(s ?? -1, "keyboard"), tn(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, s, n, t]), K(() => {
    if (!e || !w) return;
    const O = (Q) => {
      if (Q.pointerType !== "touch") return;
      const ie = Q.target;
      ie && (_.current && _.current.contains(ie) || E.current && E.current.contains(ie) || ie instanceof Element && ie.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return w.addEventListener("pointerdown", O, { capture: !0 }), () => w.removeEventListener("pointerdown", O, { capture: !0 });
  }, [e, w, n, t]);
  const R = j(() => {
    const O = E.current;
    if (!O) return null;
    const Q = O.getBoundingClientRect();
    return { left: Q.left, top: Q.top, width: Q.width, height: Q.height };
  }, []), W = $t({
    visible: e,
    morph: c,
    anchor: R,
    onClosed: () => Y(!1)
  }), b = x(() => {
  }), y = x(() => {
  }), z = x(() => {
  });
  Rt(e && m.length === 0, D, b), Dt(e, y), St(e, D, b, _, m.length > 0, z);
  const L = x(null), H = j((O) => {
    var Q;
    if (O) {
      O.addEventListener("keydown", b.current, { capture: !0 }), O.addEventListener("wheel", y.current, { passive: !1 });
      const ie = O.ownerDocument;
      L.current = ie, ie.addEventListener("keydown", z.current, { capture: !0 }), F(O.offsetWidth), ne(!0);
    } else
      (Q = L.current) == null || Q.removeEventListener("keydown", z.current, { capture: !0 }), L.current = null, ne(!1);
    _.current = O, W(O);
  }, [W]), [q, ee] = B({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [te, C] = B(0), [I, ne] = B(!1), [T, F] = B(0);
  K(() => {
    e && E.current && C(E.current.getBoundingClientRect().width);
  }, [e]);
  const P = Ze(() => ({ panelWidth: T || te || void 0 }), [T, te]);
  Gn(E, e && I, (O) => ee({ ...O, maxH: Math.min(O.maxH, 384), ready: !0 }), P), K(() => {
    if (q.ready && e) {
      const O = _.current;
      O && O.ownerDocument.activeElement !== O && !O.contains(O.ownerDocument.activeElement) && O.focus();
    }
  }, [q.ready, e]), be(() => {
    var Q;
    if (!e || D.highlightedIndex < 0) return;
    const O = (Q = _.current) == null ? void 0 : Q.querySelector(`[data-ei="${D.highlightedIndex}"]`);
    O == null || O.scrollIntoView({ block: "nearest" });
  }, [e, D.highlightedIndex]);
  const k = j((O) => {
    !O && !U.current || (!O && ae.current && (xe.current = !0), n ? n(O) : O || t == null || t());
  }, [n, t]), Z = x(M);
  Z.current = M;
  const ae = x(!1), xe = x(!1), we = j(() => {
    if (!U.current && Z.current) {
      if (xe.current) {
        xe.current = !1, ae.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), ue = Te.isValidElement(r) ? r : null, me = ue ? Te.cloneElement(ue, {
    ref: (O) => {
      E.current = O;
    },
    onPointerDown: () => {
      ae.current = !0, xe.current = !1;
    },
    onClick: (O) => {
      var Q, ie;
      (ie = (Q = ue.props).onClick) == null || ie.call(Q, O), we();
    }
  }) : r;
  return /* @__PURE__ */ $(G.Root, { open: e || M, onOpenChange: k, modal: !1, children: [
    /* @__PURE__ */ i(G.Trigger, { asChild: !0, children: me }),
    /* @__PURE__ */ i(G.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i(Ct.Provider, { value: l, children: /* @__PURE__ */ i(zt.Provider, { value: { chain: m, setChain: d, morph: c, keyboardOpened: v, setKeyboardOpened: p }, children: /* @__PURE__ */ i(Ke.Provider, { value: D, children: /* @__PURE__ */ i(
      G.Content,
      {
        ref: H,
        "data-theme": l,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${o || ""} ${h || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: q.left,
          top: q.bottom != null ? void 0 : q.top,
          bottom: q.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : te || void 0,
          maxHeight: q.maxH,
          visibility: q.ready ? "visible" : "hidden"
        },
        onPointerLeave: D.pointerLeave,
        children: u
      }
    ) }) }) }) })
  ] });
}
function Ti({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: a,
  onRename: o,
  onDuplicate: l,
  onDelete: u,
  onCreate: c,
  onImport: h,
  onExport: s,
  onReset: m,
  onTrash: d,
  closeOnSelect: v,
  readOnly: p = !1,
  theme: g,
  align: w,
  label: E,
  header: _,
  itemLabel: U,
  trigger: M,
  minItems: Y = 1,
  itemRender: D,
  morph: R = !0,
  contentClassName: W
}) {
  const b = Et(), [y, z] = B(null), [L, H] = B(""), q = x(null), ee = x(null);
  K(() => {
    e && requestAnimationFrame(() => {
      var T, F;
      (F = (T = ee.current) == null ? void 0 : T.querySelector('[data-active="1"]')) == null || F.scrollIntoView({ block: "nearest" });
    });
  }, [e]), K(() => {
    var P;
    if (!e) return;
    const T = (k) => {
      var me, de, O, Q, ie;
      if ((de = (me = k.target) == null ? void 0 : me.closest) != null && de.call(me, "input, textarea, [contenteditable]")) return;
      const Z = (O = ee.current) == null ? void 0 : O.closest(".ui-menu");
      if (!Z || !Z.contains(k.target)) return;
      const ae = Z.ownerDocument, xe = [...Z.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], we = [...Z.querySelectorAll('div:last-child > [role="menuitem"]')], ue = [...xe, ...we];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const le = ae.activeElement;
        let pe = le ? ue.indexOf(le) : -1;
        if (pe < 0 && le) {
          const ke = le.closest("[data-active]"), Re = ke == null ? void 0 : ke.querySelector('[role="menuitem"]:first-child');
          Re && (pe = xe.indexOf(Re));
        }
        const fe = k.key === "ArrowDown" ? 1 : -1, Ce = pe < 0 ? fe === 1 ? 0 : ue.length - 1 : (pe + fe + ue.length) % ue.length;
        (Q = ue[Ce]) == null || Q.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const le = ae.activeElement, pe = le == null ? void 0 : le.closest("[data-active]");
        if (!pe) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const fe = [...pe.querySelectorAll('[role="menuitem"]')].slice(1);
        if (fe.length === 0) return;
        const Ce = le && pe.contains(le) ? fe.indexOf(le) : -1, ke = k.key === "ArrowRight" ? 1 : -1, Re = Ce < 0 ? 0 : (Ce + ke + fe.length) % fe.length;
        (ie = fe[Re]) == null || ie.focus({ preventScroll: !0 });
        return;
      }
    }, F = ((P = ee.current) == null ? void 0 : P.ownerDocument) ?? null;
    return F == null || F.addEventListener("keydown", T, { capture: !0 }), () => F == null ? void 0 : F.removeEventListener("keydown", T, { capture: !0 });
  }, [e]), K(() => {
    if (y) {
      requestAnimationFrame(() => {
        var F, P;
        (F = q.current) == null || F.focus(), (P = q.current) == null || P.select();
      });
      const T = n.find((F) => F.id === y);
      T && !L && H(T.name);
    }
  }, [y]), K(() => {
    if (y) {
      const T = n.find((F) => F.id === y);
      T && !L && H(T.name);
    }
  }, [y, n]);
  const te = (T, F) => {
    z(T), H(F);
  }, C = () => {
    y && L.trim() && o(y, L.trim()), z(null);
  }, I = () => {
    z(null);
  }, ne = U || _.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ $(nt, { open: e, onOpenChange: (T) => {
    T ? (z(null), H("")) : (y && L.trim() && o(y, L.trim()), z(null), H("")), (!T || !p) && t(T);
  }, width: "w-80", theme: g, align: w, trigger: M, morph: R, contentClassName: W, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${b.headerText}`, children: _ }),
    /* @__PURE__ */ i("div", { ref: ee, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((T) => {
      const F = T.id === r, P = y === T.id;
      return /* @__PURE__ */ i("div", { "data-active": F ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${F || P ? b.rowActiveBg : b.rowHoverBg} ${y && !P ? "opacity-40 pointer-events-none" : ""}`, children: P ? /* @__PURE__ */ $($e, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: q,
            value: L,
            onChange: (k) => H(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), C()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), I());
            },
            className: `w-full border rounded ${b.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          G.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${b.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), C();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(Ut, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          G.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${b.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), I();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(ut, { className: b.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ $($e, { children: [
        /* @__PURE__ */ i(
          G.Item,
          {
            className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none cursor-pointer flex items-center ${b.rowText} ${F ? "" : b.rowTextHover}`,
            onSelect: v ? () => {
              a(T.id);
            } : (k) => {
              k.preventDefault(), a(T.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${F ? b.rowActiveText : ""}`, children: D ? D(T) : T.name })
          }
        ),
        /* @__PURE__ */ i(
          G.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${F ? b.btnActive : b.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), te(T.id, T.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(xn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          G.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${F ? b.btnActive : b.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const Z = l(T.id);
              Z && te(Z, `${T.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(jt, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          G.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= Y ? b.btnDisabled : F ? b.btnDangerActive : b.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), u(T.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= Y,
            children: /* @__PURE__ */ i(dt, { className: b.btnIcon })
          }
        )
      ] }) }, T.id);
    }) }),
    /* @__PURE__ */ $("div", { className: `shrink-0 ${y ? "opacity-40 pointer-events-none" : ""}`, children: [
      m && /* @__PURE__ */ $($e, { children: [
        /* @__PURE__ */ i(G.Separator, { className: b.separator }),
        /* @__PURE__ */ $(
          G.Item,
          {
            className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
            onSelect: (T) => {
              T.preventDefault(), m();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ i(Vt, { className: `${b.btnIcon} ${b.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || h || s || d) && /* @__PURE__ */ i(G.Separator, { className: b.separator }),
      c && /* @__PURE__ */ $(
        G.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault();
            const F = c();
            F && te(F, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(yn, { className: `${b.btnIcon} ${b.icon}` }),
            "New ",
            ne
          ]
        }
      ),
      h && /* @__PURE__ */ $(
        G.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: p,
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
        G.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: p,
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
        G.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(dt, { className: `${b.btnIcon} ${b.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Qn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function er({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: a = "",
  children: o,
  keepOpen: l = !1,
  selected: u = !1,
  rightAction: c,
  trailing: h
}) {
  nn();
  const s = Et(), m = x(!1), d = x(null), { myIndex: v, highlighted: p, setPointer: g } = on({
    label: () => rn(o),
    activate: () => {
      n || e();
    },
    disabled: n
  }), w = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ $(
    G.Item,
    {
      ref: d,
      "data-ei": v >= 0 ? v : void 0,
      className: `w-full text-left ${Qn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${w} ${u ? "ui-item-selected" : ""} ${p ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${a}`,
      onSelect: (E) => {
        if (m.current) {
          m.current = !1;
          return;
        }
        l && E.preventDefault(), e();
      },
      onPointerEnter: () => {
        g(v);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: o }),
        h && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: h }),
        c && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: c.title,
            onPointerDown: (E) => {
              E.stopPropagation(), E.preventDefault(), m.current = !0, c.onClick();
            },
            onClick: (E) => {
              E.stopPropagation(), E.preventDefault();
            },
            children: c.icon
          }
        )
      ]
    }
  );
}
const tr = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function nr({ id: e, label: t, icon: n, width: r, side: a = "right", children: o, contentClassName: l }) {
  const { chain: u, setChain: c, morph: h, keyboardOpened: s, setKeyboardOpened: m } = Be(zt), d = u.includes(e), v = u[u.length - 1] === e, p = nn(), g = Fe(), w = x(null), E = x(null), [_, U] = B(d), M = !d && _;
  K(() => {
    d && U(!0);
  }, [d]);
  const Y = () => c((P) => {
    const k = P.indexOf(e);
    return k >= 0 ? P.slice(0, k) : P;
  }), D = tt(), R = Tt(), W = x(R);
  W.current = R;
  const b = x(null);
  K(() => {
    var k;
    const P = {
      label: t,
      activate: () => {
        m(e), c((Z) => Z.includes(e) ? Z : [...Z, e]);
      },
      submenu: !0
    };
    return b.current = P, (k = W.current) == null ? void 0 : k.register(P);
  }, []);
  const y = R && b.current ? R.items.indexOf(b.current) : -1, z = y >= 0 && y === R.highlightedIndex, L = j(() => {
    const P = w.current;
    if (!P) return null;
    const k = P.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), H = $t({
    visible: d,
    morph: h,
    anchor: L,
    onClosed: () => U(!1)
  }), q = x(() => {
  }), ee = x(() => {
  }), te = x(() => {
  });
  Rt(d && v, D, q, {
    onCloseSub: () => {
      Y(), R && y >= 0 && R.setHighlighted(y, "keyboard");
    }
  });
  const C = x(s);
  C.current = s, K(() => {
    d && (C.current === e ? (D.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var P;
      return (P = E.current) == null ? void 0 : P.focus();
    }), m(null)) : D.setHighlighted(-1, "keyboard"));
  }, [d]), Dt(d, ee), St(d, D, q, E, !v, te), Te.useLayoutEffect(() => {
    var k;
    if (!d || D.highlightedIndex < 0) return;
    const P = (k = E.current) == null ? void 0 : k.querySelector(`[data-ei="${D.highlightedIndex}"]`);
    P == null || P.scrollIntoView({ block: "nearest" });
  }, [d, D.highlightedIndex]);
  const I = x(null), ne = j((P) => {
    var k;
    if (P) {
      P.addEventListener("keydown", q.current, { capture: !0 }), P.addEventListener("wheel", ee.current, { passive: !1 });
      const Z = P.ownerDocument;
      I.current = Z, Z.addEventListener("keydown", te.current, { capture: !0 });
    } else
      (k = I.current) == null || k.removeEventListener("keydown", te.current, { capture: !0 }), I.current = null;
    E.current = P, H(P);
  }, [H]), T = `w-full text-left ${tr} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${z ? " ui-item-highlighted" : ""}${M ? " ui-sub-closing" : ""}`, F = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${l || ""}`;
  return /* @__PURE__ */ $(G.Sub, { open: d || _, onOpenChange: (P) => c((k) => {
    if (!P) {
      const Z = k.indexOf(e);
      return Z >= 0 ? k.slice(0, Z) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ $(
      G.SubTrigger,
      {
        ref: w,
        "data-ei": y >= 0 ? y : void 0,
        className: T,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          R && y >= 0 && R.setHighlighted(y, "pointer");
        },
        onPointerDown: (P) => {
          P.pointerType === "pen" && (P.preventDefault(), c((k) => d ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          a === "left" && /* @__PURE__ */ i(Je, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ $("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          a === "right" && /* @__PURE__ */ i(Je, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(G.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i(
      G.SubContent,
      {
        ref: ne,
        "data-theme": p,
        className: F,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: D.pointerLeave,
        children: /* @__PURE__ */ i(Ke.Provider, { value: D, children: o })
      }
    ) })
  ] });
}
const Pe = 8, rr = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", ir = N ? "text-sm" : "text-xs", Ri = ({ open: e, x: t, y: n, onClose: r, children: a, containerRef: o, morph: l = !0 }) => {
  const u = x(null), c = Ae(), [h, s] = B(!1), [m, d] = B([]), [v, p] = B(null), g = tt();
  K(() => {
    if (e)
      return g.setHighlighted(-1, "keyboard"), tn(r);
  }, [e, r]);
  const w = x({ left: t, top: n });
  e && (w.current = { left: t, top: n });
  const E = j(() => ({ left: w.current.left, top: w.current.top, width: 0, height: 0 }), []), _ = $t({
    visible: !0,
    morph: l,
    anchor: E,
    cloneOnUnmount: !0
  }), U = x(() => {
  }), M = x(() => {
  }), Y = x(() => {
  });
  Rt(e, g, U), Dt(e, M), St(e, g, U, u, m.length > 0, Y);
  const D = x(null), R = j((y) => {
    var z;
    if (y) {
      y.addEventListener("keydown", U.current, { capture: !0 }), y.addEventListener("wheel", M.current, { passive: !1 });
      const L = y.ownerDocument;
      D.current = L, L.addEventListener("keydown", Y.current, { capture: !0 });
    } else
      (z = D.current) == null || z.removeEventListener("keydown", Y.current, { capture: !0 }), D.current = null;
    u.current = y, s(!!y), _(y);
  }, [_]), [W, b] = B(null);
  return be(() => {
    var T;
    if (!e || !h || !u.current) return;
    const y = u.current, z = y.offsetWidth, L = y.offsetHeight, H = (T = o == null ? void 0 : o.current) == null ? void 0 : T.getBoundingClientRect(), q = H ? H.right : (c == null ? void 0 : c.innerWidth) ?? 0, ee = H ? H.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, te = H ? H.left : 0, C = H ? H.top : 0;
    let I = Math.max(C + Pe, w.current.top), ne = Math.max(te + Pe, w.current.left);
    ne + z > q && (ne = q - z - Pe), I + L > ee && (I = Math.max(C + Pe, ee - L - Pe)), b({ left: ne, top: I });
  }, [e, h, t, n, o]), e ? /* @__PURE__ */ $(G.Root, { open: e, onOpenChange: (y) => {
    y || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(G.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(G.Portal, { children: /* @__PURE__ */ i(Ct.Provider, { value: "light", children: /* @__PURE__ */ i(zt.Provider, { value: { chain: m, setChain: d, morph: l, keyboardOpened: v, setKeyboardOpened: p }, children: /* @__PURE__ */ i(Ke.Provider, { value: g, children: /* @__PURE__ */ i(
      G.Content,
      {
        ref: R,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${ir} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (W == null ? void 0 : W.left) ?? w.current.left, top: (W == null ? void 0 : W.top) ?? w.current.top, touchAction: "manipulation" },
        onPointerLeave: g.pointerLeave,
        children: a
      }
    ) }) }) }) })
  ] }) : null;
}, Si = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: a = !1, trailing: o, children: l }) => {
  const u = Tt(), c = x(u);
  c.current = u;
  const h = x(null);
  K(() => {
    var v;
    const d = { label: rn(l), activate: () => {
      r || e();
    } };
    return h.current = d, (v = c.current) == null ? void 0 : v.register(d);
  }, []);
  const s = u && h.current ? u.items.indexOf(h.current) : -1, m = !r && s >= 0 && s === u.highlightedIndex;
  return /* @__PURE__ */ $(
    G.Item,
    {
      "data-ei": s >= 0 ? s : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && s >= 0 && u.setHighlighted(s, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${rr} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${a ? "ui-item-selected" : ""} ${m ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: l }),
        o && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, Di = () => /* @__PURE__ */ i(G.Separator, { className: "ui-sep my-1" }), Li = (e) => /* @__PURE__ */ i(nr, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), J = 16, sn = "[data-modal-stack]", ve = 220, He = "cubic-bezier(0.32, 0.72, 0, 1)", Xe = 0.94;
function Ie() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ze(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function cn(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function _t(e, t, n, r) {
  const a = ++e.current, o = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = cn(o, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === a && (t.style.transition = `transform ${ve}ms ${He}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === a && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ve + 80));
    });
  });
}
function or(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${Xe})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${ve}ms ${He}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ve + 60));
    });
  });
}
function Bt(e, t, n) {
  const r = ++e.current, a = t.getBoundingClientRect(), o = 1 - Xe, l = { left: a.left + a.width * o / 2, top: a.top + a.height * o / 2, width: a.width * Xe, height: a.height * Xe };
  t.style.transition = `transform ${ve}ms ${He}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = cn(a, l), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ve + 60);
}
function ot(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(sn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function st(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(sn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const sr = N ? "px-6" : "px-5", cr = N ? "py-3" : "py-2.5", lr = N ? "text-sm" : "text-xs", ar = N ? "w-4 h-4" : "w-3.5 h-3.5", ur = N ? "text-base" : "text-sm", dr = N ? "w-5 h-5" : "w-4 h-4", ct = N ? "px-6" : "px-5", fr = N ? "pt-6" : "pt-5", hr = N ? "pb-6" : "pb-5", mr = N ? "text-xs" : "text-[10px]", pr = N ? "w-3.5 h-3.5" : "w-3 h-3", gr = N ? "px-2.5 py-1.5" : "px-2 py-1", br = N ? "px-6" : "px-5", xr = N ? "py-3" : "py-2";
function yr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: a,
  footer: o,
  children: l,
  onReset: u,
  morph: c = !0,
  flat: h = !1,
  closable: s = !0,
  dismissOnBackdrop: m = !0
}) {
  const d = x(null), v = x(null), p = x(null), [g, w] = B(!1), E = j((f) => {
    d.current = f, w(f !== null);
  }, []), _ = Fe(), U = Ae(), M = x(U);
  M.current = U;
  const [Y, D] = B(null), R = x(null), W = x(!1), b = x(!1), y = x(0), z = x({ w: 0, h: 0 }), L = x(!1), [H, q] = B(!1), [ee, te] = B(!1), C = x(0), I = x(!1), [ne, T] = B(!1), F = x(c);
  F.current = c;
  const P = x(!1), k = x(!1), Z = () => {
    k.current = !0, q(!0);
  }, ae = () => {
    k.current = !1, q(!1);
  };
  K(() => {
    e || (D(null), L.current = !1, W.current = !1, te(!1));
  }, [e]), be(() => {
    if (!e || L.current || !g || !d.current) return;
    L.current = !0;
    const f = d.current.getBoundingClientRect(), S = M.current ?? null, A = (S == null ? void 0 : S.innerWidth) ?? 0, V = ze(S);
    D({
      left: Math.max(J, Math.min((A - f.width) / 2, A - f.width - J)),
      top: Math.max(V.top + J, Math.min(V.top + (V.height - f.height) / 2, V.bottom - f.height - J))
    });
  }, [e, g]), be(() => {
    if (!e || !g || !c || Ie() || !d.current) return;
    const f = d.current, S = ot(f), A = S[S.length - 1];
    Z(), A ? _t(C, f, A.getBoundingClientRect(), ae) : or(C, f, ae);
  }, [e, g]);
  const xe = j(() => {
    if (!s || I.current) return;
    const f = d.current, S = !!f && ot(f).length > 0;
    if (!f || !c || Ie() || S) {
      t();
      return;
    }
    I.current = !0, T(!0), P.current = !0, Z(), Bt(C, f, () => {
      I.current = !1, T(!1), ae(), t();
    });
  }, [c, t, s]), we = j(() => {
    const f = d.current;
    if (!f || P.current || !F.current || Ie() || ot(f).length > 0) return;
    const S = f.ownerDocument, A = f.cloneNode(!0);
    A.removeAttribute("data-modal-stack"), A.removeAttribute("data-state"), A.removeAttribute("role"), A.removeAttribute("data-aria-hidden"), A.removeAttribute("tabindex"), A.setAttribute("aria-hidden", "true"), A.style.pointerEvents = "none", S.body.appendChild(A), Bt({ current: 0 }, A, () => {
      A.isConnected && A.remove();
    });
  }, []);
  be(() => () => we(), [we]);
  const ue = x(e);
  be(() => {
    const f = ue.current;
    ue.current = e, f && !e && we();
  }, [e, g, we]), K(() => {
    if (!e || !g || !c || !d.current) return;
    const f = d.current, S = f.parentNode;
    if (!S) return;
    let A = 0, V = null, X = !1;
    const oe = () => {
      A = 0;
      const se = st(f);
      if (se.length > 0)
        f.style.opacity = "", f.style.pointerEvents = "", V = se[se.length - 1].getBoundingClientRect(), X = !0, A = requestAnimationFrame(oe);
      else if (X) {
        X = !1, V && !Ie() && (Z(), _t(C, f, V, ae)), V = null;
        const ce = M.current ?? null;
        ce == null || ce.setTimeout(() => {
          !f || !f.isConnected || getComputedStyle(f).opacity !== "1" && (f.style.opacity = "1", f.style.pointerEvents = "");
        }, 240);
      }
    }, re = new MutationObserver(() => {
      !A && st(f).length > 0 && (A = requestAnimationFrame(oe));
    });
    return re.observe(S, { childList: !0 }), () => {
      re.disconnect(), A && cancelAnimationFrame(A);
    };
  }, [e, g]), K(() => {
    if (!g || !c || Ie() || !d.current) return;
    const f = d.current;
    let S = Math.round(f.getBoundingClientRect().height), A = !1;
    const V = new ResizeObserver(() => {
      if (!f.isConnected) return;
      const X = Math.round(f.getBoundingClientRect().height);
      if (!A) {
        A = !0, S = X;
        return;
      }
      if (Math.abs(X - S) < 1) return;
      if (R.current || I.current || st(f).length > 0) {
        S = X;
        return;
      }
      if (k.current) return;
      const oe = S;
      S = X, Z();
      const re = f.getBoundingClientRect(), se = ze(M.current ?? null), ce = !W.current && !b.current, Se = ce ? se.top + (se.height - oe) / 2 : re.top, ge = ce ? se.top + (se.height - X) / 2 : re.top;
      f.style.transition = "none", f.style.height = `${oe}px`, ce && (f.style.top = `${Se}px`), v.current && (v.current.style.overflow = "hidden"), f.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          f.style.height === `${oe}px` && (f.style.transition = `height ${ve}ms ${He}${ce ? `, top ${ve}ms ${He}` : ""}`, f.style.height = `${X}px`, ce && (f.style.top = `${ge}px`), window.setTimeout(() => {
            f.style.height === `${X}px` && (f.style.transition = "", f.style.height = "", v.current && (v.current.style.overflow = ""), ce && D({ left: re.left, top: ge }), ae());
          }, ve + 60));
        });
      });
    });
    return V.observe(f), () => V.disconnect();
  }, [g]);
  const me = j(() => {
    const f = d.current;
    if (!f) return null;
    const S = f.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), de = j((f, S) => {
    const A = M.current ?? null, V = (A == null ? void 0 : A.innerWidth) ?? 0, X = ze(A), oe = me(), re = oe ? oe.width : Math.min(V - J * 2, 576), se = oe ? oe.height : Math.min(X.height - J * 2, 400);
    return {
      left: Math.max(J, Math.min(f, V - re - J)),
      top: Math.max(X.top + J, Math.min(S, X.bottom - se - J))
    };
  }, [me]);
  K(() => {
    if (!e) return;
    const f = M.current ?? null, S = (f == null ? void 0 : f.visualViewport) ?? null;
    if (!f || !S) return;
    const A = 120;
    b.current = !1, z.current = { w: f.innerWidth, h: f.innerHeight };
    let V = 0;
    const X = () => {
      if (I.current || R.current) return;
      const re = (f == null ? void 0 : f.innerHeight) ?? 0, se = (f == null ? void 0 : f.innerWidth) ?? 0, Se = ze(f).height < re - A, ge = re < z.current.h - A && se === z.current.w;
      Se || ge ? (b.current = !0, y.current && (clearTimeout(y.current), y.current = 0)) : y.current || (y.current = (f == null ? void 0 : f.setTimeout(() => {
        b.current = !1, y.current = 0, te(!1);
      }, 600)) ?? 0), te(b.current), !V && (V = requestAnimationFrame(() => {
        var It;
        V = 0;
        const Mt = d.current;
        if (!Mt) return;
        const Ee = ze(M.current ?? null), ye = Mt.getBoundingClientRect(), At = ((It = M.current) == null ? void 0 : It.innerWidth) ?? 0, rt = (f == null ? void 0 : f.innerHeight) ?? 0, gn = Ee.height < rt - A || rt < z.current.h - A && (f == null ? void 0 : f.innerWidth) === z.current.w;
        z.current = { w: (f == null ? void 0 : f.innerWidth) ?? 0, h: rt };
        const qe = ye.top >= Ee.top + J && ye.bottom <= Ee.bottom - J, Pt = () => {
          D({
            left: Math.max(J, Math.min((At - ye.width) / 2, At - ye.width - J)),
            top: Math.max(Ee.top + J, Math.min(Ee.top + (Ee.height - ye.height) / 2, Ee.bottom - ye.height - J))
          });
        };
        if (gn && !N) {
          if (W.current) {
            qe || D(de(ye.left, ye.top));
            return;
          }
          if (qe) return;
          Pt();
          return;
        }
        if (!b.current) {
          if (W.current) {
            qe || D(de(ye.left, ye.top));
            return;
          }
          qe || Pt();
        }
      }));
    };
    S.addEventListener("resize", X), S.addEventListener("scroll", X);
    const oe = () => {
      I.current || R.current || V || (V = requestAnimationFrame(() => {
        V = 0;
        const re = d.current;
        if (!re) return;
        const se = M.current ?? null, ce = ze(se), Se = (se == null ? void 0 : se.innerWidth) ?? 0, ge = re.getBoundingClientRect();
        if (W.current) {
          D(de(ge.left, ge.top));
          return;
        }
        D({
          left: Math.max(J, Math.min((Se - ge.width) / 2, Se - ge.width - J)),
          top: Math.max(ce.top + J, Math.min(ce.top + (ce.height - ge.height) / 2, ce.bottom - ge.height - J))
        });
      }));
    };
    return f.addEventListener("orientationchange", oe), () => {
      S.removeEventListener("resize", X), S.removeEventListener("scroll", X), f.removeEventListener("orientationchange", oe), V && cancelAnimationFrame(V), y.current && clearTimeout(y.current);
    };
  }, [e, de]);
  const O = j((f) => {
    if (f.target.closest("button")) return;
    W.current = !0;
    const S = me();
    S && (D(de(S.left, S.top)), R.current = { startX: f.clientX, startY: f.clientY, posX: S.left, posY: S.top }, f.target.setPointerCapture(f.pointerId));
  }, [me, de]), Q = j((f) => {
    const S = R.current;
    S && (f.preventDefault(), D(de(S.posX + f.clientX - S.startX, S.posY + f.clientY - S.startY)));
  }, [de]), ie = j(() => {
    R.current = null;
  }, []), le = R.current !== null, pe = j(() => {
    W.current = !1;
    const f = M.current ?? null, S = ze(f), A = (f == null ? void 0 : f.innerWidth) ?? 0, V = d.current, X = V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    D({
      left: Math.max(J, Math.min((A - X.width) / 2, A - X.width - J)),
      top: Math.max(S.top + J, Math.min(S.top + (S.height - X.height) / 2, S.bottom - X.height - J))
    });
  }, []), fe = x(0), Ce = j(() => {
    const f = Date.now();
    f - fe.current < 300 ? (fe.current = 0, pe()) : fe.current = f;
  }, [pe]), ke = Y !== null, Re = ke ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", mn = `${a ? `${a} w-full` : "max-w-xl w-full"}`, Lt = {
    ...ke ? { left: Y.left, top: Y.top } : {},
    width: `min(100%, calc(100vw - ${J * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...ee ? {} : { maxHeight: `calc(100vh - ${J * 2}px)` }
  }, pn = j((f) => {
    if (f.key !== "Enter" || f.shiftKey || f.metaKey || f.ctrlKey || f.altKey) return;
    const S = f.target, A = p.current;
    if (!(!!S.closest("[data-modal-close]") || !!A && A.contains(S) && !!S.closest('button, a, [role="button"]')) && S.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !A) return;
    const X = Array.from(A.querySelectorAll("button[data-modal-confirm]")), oe = X.length > 0 ? X : Array.from(A.querySelectorAll("button")), re = oe[oe.length - 1];
    !re || re.disabled || (f.preventDefault(), re.click());
  }, []);
  return /* @__PURE__ */ i(Ne.Root, { open: e, onOpenChange: (f) => {
    f || xe();
  }, children: /* @__PURE__ */ $(Ne.Portal, { container: _ ?? void 0, children: [
    /* @__PURE__ */ i(
      Ne.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${ne ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (f) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (f.preventDefault(), m && xe());
        }
      }
    ),
    /* @__PURE__ */ $(
      Ne.Content,
      {
        ref: E,
        onKeyDown: pn,
        onInteractOutside: (f) => {
          m || f.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Re} ${mn}`,
        style: { touchAction: "manipulation", ...Object.keys(Lt).length > 0 ? Lt : {} },
        children: [
          h ? /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${ct} ${fr} pb-4 ${le ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (f) => {
                H || O(f);
              },
              onPointerMove: Q,
              onPointerUp: ie,
              onClick: Ce,
              children: [
                /* @__PURE__ */ i(Ne.Title, { className: `${ur} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ i(Ne.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(ut, { className: dr }) })
              ]
            }
          ) : /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${sr} ${cr} border-b border-zinc-800 shrink-0 bg-zinc-950 ${le ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (f) => {
                H || O(f);
              },
              onPointerMove: Q,
              onPointerUp: ie,
              onClick: Ce,
              children: [
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(Ne.Title, { className: `${lr} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ $("button", { onClick: u, className: `flex items-center gap-1 ${mr} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${gr} shrink-0`, children: [
                    /* @__PURE__ */ i(Vt, { className: pr }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(Ne.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(ut, { className: ar }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: v, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${h ? ` ${ct} pb-4` : ""}`, children: l }),
          o && /* @__PURE__ */ i("div", { ref: p, className: h ? `${ct} ${hr}` : "shrink-0", children: h ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) });
}
function Mi({ children: e }) {
  return /* @__PURE__ */ i("div", { className: `flex items-center justify-end gap-3 ${br} ${xr} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const vr = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${N ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, wr = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Ye({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      className: `${vr} ${wr[e]} ${t}`,
      ...r
    }
  );
}
function kr({ checked: e, onChange: t, disabled: n = !1, label: r, id: a, className: o = "", labelClassName: l = "", theme: u, variant: c = "pill", tone: h = "accent", block: s = !1 }) {
  const m = c !== "plain", d = N ? "w-5 h-5" : "w-4 h-4", v = N ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", p = N ? "w-3.5 h-3.5" : "w-3 h-3", g = N ? "text-sm" : "text-xs";
  return /* @__PURE__ */ $(
    "label",
    {
      className: `ui-checkbox ${m ? `ui-checkbox-pill ${N ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${h === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${o}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: N ? 10 : 8 },
      onClick: (E) => E.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: a,
            checked: e,
            disabled: n,
            onChange: (E) => t(E.target.checked),
            className: "sr-only"
          }
        ),
        m ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ $("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: `ui-checkbox-box ${v}`, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", className: p, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${g} ${l}`, children: r })
      ]
    }
  );
}
function Nr(e = "md") {
  return e === "sm" ? `${N ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${N ? "px-3.5 py-2.5 text-sm" : "px-2.5 py-1.5 text-xs"} ui-input`;
}
const $r = N ? "space-y-5" : "space-y-4", Cr = N ? "text-sm" : "text-xs", Er = Nr(), ln = _e(null);
function Ai() {
  const e = Be(ln);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Pi({ children: e }) {
  const [t, n] = B(null), [r, a] = B(!1), o = x(null), l = x(t);
  l.current = t;
  const u = j(() => {
    const p = l.current;
    p && (p.kind === "confirm" ? p.resolve(!1) : p.kind === "prompt" ? p.resolve(null) : p.resolve());
  }, []), c = j((p) => {
    if (p.suppressKey) {
      const g = localStorage.getItem(p.suppressKey);
      if (g && Date.now() < parseInt(g, 10))
        return Promise.resolve(!0);
    }
    return new Promise((g) => {
      u(), a(!1), n({ kind: "confirm", options: p, resolve: g });
    });
  }, [u]), h = j((p) => new Promise((g) => {
    u(), n({ kind: "prompt", options: p, resolve: g });
  }), [u]), s = j((p) => new Promise((g) => {
    u(), n({ kind: "alert", options: p, resolve: g });
  }), [u]);
  K(() => {
    if (t) {
      const p = setTimeout(() => {
        var g;
        return (g = o.current) == null ? void 0 : g.focus();
      }, 50);
      return () => clearTimeout(p);
    }
  }, [t]);
  const m = j(() => {
    var p, g;
    if (t) {
      if (t.kind === "confirm") {
        const w = t.options;
        w.suppressKey && r && localStorage.setItem(w.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((g = (p = o.current) == null ? void 0 : p.value) == null ? void 0 : g.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), d = t !== null;
  K(() => {
    if (!d) return;
    const p = (g) => {
      g.key !== "Enter" || g.shiftKey || g.metaKey || g.ctrlKey || g.altKey || g.isComposing || (g.preventDefault(), g.stopImmediatePropagation(), m());
    };
    return document.addEventListener("keydown", p, !0), () => document.removeEventListener("keydown", p, !0);
  }, [d, m]);
  const v = j(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ $(ln.Provider, { value: { confirm: c, prompt: h, alert: s }, children: [
    e,
    d && /* @__PURE__ */ i(
      yr,
      {
        open: !0,
        onClose: v,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ $($e, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(Ye, { variant: "ghost", onClick: v, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(Ye, { onClick: m, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            Ye,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: m,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(Ye, { "data-modal-confirm": !0, onClick: m, children: "Save" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: $r, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { className: `${Cr} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            kr,
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
              ref: o,
              type: "text",
              defaultValue: t.options.defaultValue || "",
              placeholder: t.options.placeholder,
              className: `w-full ${Er}`
            }
          )
        ] })
      }
    )
  ] });
}
const zr = 500, Tr = 250, Rr = 5, he = 88, Ft = 4;
function Sr(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const a = performance.now(), o = (l) => {
    const u = l - a, c = Math.min(u / t, 1);
    n.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Dr({ x: e, y: t, ms: n }) {
  const r = x(null), a = Fe();
  return K(() => {
    r.current && Sr(r.current, n);
  }, [n]), yt(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "fixed",
          left: e - he / 2,
          top: t - he / 2,
          width: he,
          height: he,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ $("svg", { ref: r, width: he, height: he, viewBox: `0 0 ${he} ${he}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: he / 2,
              cy: he / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Ft + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: he / 2,
              cy: he / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: Ft,
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
function Ii() {
  return { "data-no-longpress": "true" };
}
function Lr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Oi({
  children: e,
  showRing: t = !0,
  longPressMs: n = zr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: a,
  onLongPress: o
}) {
  const [l, u] = B(null), c = Xt(), h = x(null), s = x(null), m = x({ x: 0, y: 0, target: null }), d = x(!1), v = Math.min(Tr, n * 0.5), p = x(a);
  p.current = a;
  const g = x(o);
  return g.current = o, K(() => {
    if (!N || !c) return;
    const w = (M) => {
      if (!ft(M.pointerType) || M.button !== 0) return;
      const Y = M.target;
      if (!Y.closest(r) || (p.current ? !p.current(Y) : Lr(Y))) return;
      const D = M.clientX, R = M.clientY;
      m.current = { x: D, y: R, target: M.target }, d.current = !0, t && (s.current = setTimeout(() => u({ x: D, y: R }), v)), h.current = setTimeout(() => {
        if (!d.current) return;
        s.current && (clearTimeout(s.current), s.current = null), u(null);
        const W = m.current.target;
        if (!W) return;
        const b = g.current;
        if (b) {
          b(W, D, R);
          return;
        }
        const y = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: D,
          clientY: R,
          button: 2,
          view: window
        });
        W.dispatchEvent(y);
      }, n);
    }, E = (M) => {
      if (!d.current || h.current === null) return;
      const Y = M.clientX - m.current.x, D = M.clientY - m.current.y;
      Math.sqrt(Y * Y + D * D) > Rr && (clearTimeout(h.current), h.current = null, s.current && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    }, _ = () => {
      h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null);
    }, U = (M) => {
      ft(M.pointerType) && (h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    };
    return c == null || c.addEventListener("pointerdown", w), c.addEventListener("pointermove", E), c.addEventListener("pointerup", _), c.addEventListener("pointercancel", _), c.addEventListener("pointerleave", U), () => {
      c.removeEventListener("pointerdown", w), c.removeEventListener("pointermove", E), c.removeEventListener("pointerup", _), c == null || c.removeEventListener("pointercancel", _), c == null || c.removeEventListener("pointerleave", U), h.current !== null && clearTimeout(h.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, v, r]), /* @__PURE__ */ $($e, { children: [
    e,
    t && l && /* @__PURE__ */ i(Dr, { x: l.x, y: l.y, ms: n - v })
  ] });
}
function Hi() {
  const e = Un();
  return Yn ? e === null || ft(e) : !1;
}
const Ue = N ? "px-3.5 py-2 text-sm" : "px-2.5 py-1 text-xs", pt = N ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs", Mr = `inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${N ? "gap-2" : "gap-1.5"}`, Ar = {
  light: {
    subtle: { base: `${Ue} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
    primary: { base: `${pt} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
    "danger-ghost": { base: `${Ue} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
  },
  dark: {
    subtle: { base: `${Ue} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
    primary: { base: `${pt} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
    "danger-ghost": { base: `${Ue} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
  }
}, Wt = `${pt} bg-blue-950 hover:bg-blue-900 text-white`, Pr = "bg-blue-900!";
function _i({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: a = "button",
  ...o
}) {
  const l = o["data-state"] === "open", u = Ar[t][e];
  let c = `${u.base} ${l ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (c = l ? `${Wt} ${Pr}` : Wt), /* @__PURE__ */ i("button", { type: a, className: `${Mr} ${c} ${r}`, ...o });
}
const Ir = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Or = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], lt = 1900, at = 2100;
function Hr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function _r(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Bi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: a = "", initialView: o }) {
  const l = /* @__PURE__ */ new Date(), u = (() => {
    if (!o) return l;
    const C = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(C.getTime()) ? l : C;
  })(), [c, h] = B(u.getFullYear()), [s, m] = B(u.getMonth()), [d, v] = B("days"), [p, g] = B(null), w = Ze(() => new Set(e), [e]), E = (C) => {
    w.has(C) ? t(e.filter((I) => I !== C)) : t([...e, C]);
  }, _ = Ze(() => {
    const C = Hr(c, s), I = new Date(c, s, 1).getDay(), ne = [];
    for (let T = 0; T < I; T++) ne.push({ key: `pad-${T}`, day: 0, empty: !0 });
    for (let T = 1; T <= C; T++) ne.push({ key: _r(c, s, T), day: T, empty: !1 });
    return ne;
  }, [c, s]), U = (C) => h((I) => Math.max(lt, Math.min(at, I + C))), M = (C) => {
    s + C < 0 ? (h((I) => Math.max(lt, I - 1)), m(11)) : s + C > 11 ? (h((I) => Math.min(at, I + 1)), m(0)) : m((I) => I + C);
  }, Y = () => {
    if (p === null) return;
    const C = parseInt(p, 10);
    !isNaN(C) && C >= lt && C <= at && h(C), g(null);
  }, D = (C) => e.some((I) => I.startsWith(`${c}-${String(C + 1).padStart(2, "0")}`)), R = n === "dark", W = N ? "p-2" : "p-1", b = N ? "w-5 h-5" : "w-4 h-4", y = N ? "text-[11px] py-2" : "text-[10px] py-1.5", z = N ? "py-2.5 text-sm" : "py-1.5 text-xs", L = N ? "py-3 text-sm" : "py-2 text-xs", H = N ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", q = N ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, ee = R ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", te = R ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ $("div", { className: `border rounded-lg overflow-hidden w-full ${R ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${a}`, children: [
    /* @__PURE__ */ $("div", { className: `flex items-center justify-between px-3 py-2 border-b ${R ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? U(-1) : M(-1),
          className: `${W} rounded transition-colors ${R ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(vn, { className: b })
        }
      ),
      d === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => v("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${R ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(c),
          onChange: (C) => g(C.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (C) => C.target.select(),
          onBlur: Y,
          onKeyDown: (C) => {
            C.key === "Enter" && (C.preventDefault(), Y()), C.key === "Escape" && g(null);
          },
          className: q
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? U(1) : M(1),
          className: `${W} rounded transition-colors ${R ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(Je, { className: b })
        }
      )
    ] }),
    d === "months" ? /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Or.map((C, I) => /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: () => {
            m(I), v("days");
          },
          className: `${L} relative font-medium transition-colors border-b ${I === s ? ee : te} ${R ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            C,
            D(I) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${I === s ? "bg-white" : R ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        C
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${R ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            h(l.getFullYear()), m(l.getMonth()), v("days");
          },
          className: `px-3 ${N ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${R ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ $("div", { className: "grid grid-cols-7 text-center", children: [
      Ir.map((C) => /* @__PURE__ */ i("div", { className: `${y} font-semibold uppercase tracking-wider border-b ${R ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: C }, C)),
      _.map((C) => C.empty ? /* @__PURE__ */ i("div", {}, C.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => E(C.key),
          className: `${z} font-medium transition-colors border-b ${R ? "border-zinc-800/60" : "border-zinc-50"} ${w.has(C.key) ? ee : R ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: C.day
        },
        C.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ $("div", { className: `px-3 py-2 border-t ${R ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ $("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((C) => {
        const I = /* @__PURE__ */ new Date(C + "T00:00:00"), ne = I.getFullYear() === l.getFullYear() ? I.toLocaleString("default", { month: "short", day: "numeric" }) : I.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ $(
          "button",
          {
            type: "button",
            onClick: () => E(C),
            "aria-label": `Remove ${ne}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${R ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${H}`,
            children: [
              ne,
              /* @__PURE__ */ i("span", { className: `leading-none ${R ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          C
        );
      }) })
    ] })
  ] });
}
function Fi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: a,
  allSelected: o = !1,
  toggleAllLabel: l,
  emptyHint: u = "Nothing here",
  maxHeight: c,
  disabled: h = !1,
  theme: s,
  className: m = ""
}) {
  const d = (w) => t instanceof Set ? t.has(w) : t.includes(w), v = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = N ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", g = r != null || a != null;
  return /* @__PURE__ */ $("div", { className: m, ...s ? { "data-theme": s } : {}, children: [
    g && /* @__PURE__ */ $("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      a != null && /* @__PURE__ */ i("button", { type: "button", disabled: h, onClick: a, className: "ui-checklist-toggleall", children: l ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${h ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const E = d(w.id);
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: h,
                onClick: () => n(w.id),
                className: `ui-checklist-item ${v} ${E ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-checklist-box ${p}`, "aria-hidden": !0, children: E && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  w.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: w.secondary })
                ]
              },
              w.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: u })
        ]
      }
    )
  ] });
}
function Wi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: a = "Nothing here",
  maxHeight: o,
  compact: l = !1,
  disabled: u = !1,
  theme: c,
  className: h = ""
}) {
  const s = l ? "px-2.5 py-1.5 text-xs" : N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", m = l ? "w-3.5 h-3.5" : N ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ $("div", { className: h, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          e.map((d) => {
            const v = t === d.id;
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(d.id),
                className: `ui-checklist-item ${s} ${v ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-radio-circle ${m}`, "aria-hidden": !0, children: v && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  d.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: d.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: d.label }),
                  d.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: d.secondary })
                ]
              },
              d.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: a })
        ]
      }
    )
  ] });
}
const Ki = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: a = "visible",
  offset: o = 8
}) => {
  const l = Ae(), { refs: u, floatingStyles: c } = En({
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
        fn: (h) => {
          var _;
          if (a !== "visible") return {};
          const s = (_ = h.elements.floating.ownerDocument) == null ? void 0 : _.defaultView;
          if (!s) return {};
          const m = h.rects.reference, d = Math.max(m.x, 0), v = Math.max(m.y, 0), p = Math.min(m.x + m.width, s.innerWidth), g = Math.min(m.y + m.height, s.innerHeight);
          if (p <= d || g <= v) return {};
          const w = r === "left" ? p - (m.x + m.width) : r === "right" ? d - m.x : 0, E = r === "top" ? v - m.y : r === "bottom" ? g - (m.y + m.height) : 0;
          return { x: h.x + w, y: h.y + E };
        }
      },
      Tn(o),
      Rn({ padding: 8 }),
      Sn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (h) => {
          var g;
          const s = (g = h.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!s) return {};
          const m = h.rects.floating.width, d = h.rects.floating.height, v = Math.max(8, Math.min(h.x, s.innerWidth - m - 8)), p = Math.max(8, Math.min(h.y, s.innerHeight - d - 8));
          return { x: v, y: p };
        }
      }
    ],
    whileElementsMounted: zn
  });
  return be(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ $($e, { children: [
    !n && /* @__PURE__ */ i("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    l && yt(
      /* @__PURE__ */ i(
        "div",
        {
          ref: u.setFloating,
          className: `ui-chrome ${e}`,
          style: c,
          onMouseDown: (h) => h.stopPropagation(),
          onClick: (h) => h.stopPropagation(),
          onDragStart: (h) => h.preventDefault(),
          children: t
        }
      ),
      l.document.body
    )
  ] });
}, Oe = ({ content: e, children: t }) => {
  const n = Fe(), r = Ae(), [a, o] = B(!1), [l, u] = B({ x: 0, y: 0 }), c = x(null), h = () => {
    if (!c.current) return;
    const s = c.current.getBoundingClientRect();
    u({ x: s.left + s.width / 2, y: s.top });
  };
  return K(() => (a && r && (h(), r.addEventListener("scroll", h, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", h, !0)), [a]), /* @__PURE__ */ $(
    "div",
    {
      ref: c,
      className: "inline-flex",
      onMouseEnter: () => {
        h(), o(!0);
      },
      onMouseLeave: () => o(!1),
      children: [
        t,
        a && yt(
          /* @__PURE__ */ $(
            "div",
            {
              className: `fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 ${N ? "px-3 py-1.5 bg-zinc-900 text-white text-xs" : "px-2.5 py-1.5 bg-zinc-900 text-white text-[10px]"}`,
              style: { left: l.x, top: l.y - (N ? 24 : 20), transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((s, m) => /* @__PURE__ */ i("div", { className: m > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: s }, m)),
                /* @__PURE__ */ i("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, qi = N ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", gt = N ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", je = N ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Br = "hover:bg-red-950/50", an = N ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", un = "bg-blue-900/50 border-blue-700 text-blue-300", dn = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Fr = N ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Yi = N ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Ge = N ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Wr = "inline-flex rounded overflow-hidden border border-zinc-700", fn = N ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ve = ({ onClick: e, disabled: t, title: n, className: r = gt, children: a }) => /* @__PURE__ */ i(Oe, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: a }) }), Ui = ({ value: e, options: t, onChange: n, disabled: r, active: a }) => /* @__PURE__ */ i("div", { className: Wr, children: t.map((o) => {
  const l = a ? a(o.v) : e === o.v;
  return /* @__PURE__ */ i(
    "button",
    {
      disabled: r,
      onClick: () => n(o.v),
      className: `${N ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${l ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${o.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: o.l
    },
    o.v
  );
}) }), ji = ({ children: e }) => /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: N ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Kr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", qr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Vi = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ $("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? Kr : qr, children: e }),
  t
] }), Xi = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ $("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Gi = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: a }) => /* @__PURE__ */ $($e, { children: [
  /* @__PURE__ */ i(Ve, { onClick: () => r(-1), disabled: e, title: "Move up", className: je, children: /* @__PURE__ */ i(wn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(Ve, { onClick: () => r(1), disabled: e, title: "Move down", className: je, children: /* @__PURE__ */ i(kn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(Ve, { onClick: t, disabled: e, title: "Duplicate", className: je, children: /* @__PURE__ */ i(jt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: Ge }),
  /* @__PURE__ */ i(Ve, { onClick: n, disabled: e, title: "Delete", className: `${je} ${Br}`, children: /* @__PURE__ */ i(dt, { className: "w-2.5 h-2.5" }) })
] }), Yr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Ur = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), jr = /^(https?:\/\/|mailto:)/i;
function Vr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const a = n.slice(0, r).trim().toLowerCase(), o = n.slice(r + 1).trim();
    Ur.has(a) && o && t.push(`${a}: ${o}`);
  }
  return t.join("; ");
}
function bt(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const u = document.createDocumentFragment();
    for (const c of Array.from(t.childNodes)) u.appendChild(bt(c));
    return u;
  };
  if (!Yr.has(n)) return r();
  if (n === "a") {
    const u = t.getAttribute("href") || "";
    if (!jr.test(u)) return r();
  }
  const a = document.createElement(n), o = t.getAttribute("style"), l = Vr(o || "");
  if (l && a.setAttribute("style", l), n === "a") {
    a.setAttribute("href", t.getAttribute("href"));
    const u = t.getAttribute("target"), c = t.getAttribute("rel");
    u && a.setAttribute("target", u), c && a.setAttribute("rel", c);
  }
  for (const u of Array.from(t.childNodes)) a.appendChild(bt(u));
  return a;
}
function hn(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Xr(e) {
  const t = hn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const l of Array.from(n.content.childNodes)) r.appendChild(bt(l));
  const a = document.createElement("div");
  return a.appendChild(r), a.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Zi(e) {
  const t = hn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Ji(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Gr = { text: "#52525b" }, Zr = ({ node: e, selected: t, extension: n, editor: r, view: a, getPos: o }) => {
  var m;
  const l = e.attrs.field ?? "", u = n.options, c = ((m = u.resolve) == null ? void 0 : m.call(u, l)) ?? null, h = (c == null ? void 0 : c.color) ?? Gr, s = (c == null ? void 0 : c.label) ?? `{{${l}}}`;
  return /* @__PURE__ */ i(
    Mn,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: h.text,
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
        var w;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const v = typeof o == "function" ? o() : null;
        if (v == null) return;
        const p = a.state.doc.resolve(v), g = p.nodeAfter;
        g && Qe.isSelectable(g) && a.dispatch(a.state.tr.setSelection(new Qe(p))), (w = u.onTokenClick) == null || w.call(u, l, d.currentTarget.getBoundingClientRect(), v);
      },
      children: s
    }
  );
};
function Jr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Kt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Qr = Wn.extend({
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
    return Ln(Zr);
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
    return ["span", Dn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), ei = 240, ti = 280, ni = ({ props: e, onApi: t }) => {
  const n = tt(), r = x(t);
  r.current = t, K(() => {
    r.current(n);
  }, [n]);
  const a = x(null);
  K(() => {
    var l, u;
    (u = (l = a.current) == null ? void 0 : l.querySelector(".ui-item-highlighted")) == null || u.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex]), K(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const o = Et();
  return /* @__PURE__ */ i(Ke.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: ti, maxHeight: ei },
      onMouseDown: (l) => l.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: a, children: e.items.map((l) => /* @__PURE__ */ i(
        ri,
        {
          item: l,
          d: o,
          command: () => e.command({ field: l.key })
        },
        l.key
      )) })
    }
  ) });
}, ri = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: a, setPointer: o } = on({
    label: () => e.label,
    activate: n
  });
  return /* @__PURE__ */ $(
    "div",
    {
      role: "option",
      className: `w-full text-left ${t.itemPad} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${t.itemDefault} ${a ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: n,
      children: [
        /* @__PURE__ */ i("span", { className: `${t.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ i("span", { className: "block w-2 h-2 rounded-full", style: { background: e.color.text } }) }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: e.label }),
        e.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: e.color.text }, children: e.group })
      ]
    }
  );
}, ii = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(ni, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const a = Kn(r);
      e = { holder: r, root: a, unmount: null, props: n, api: null };
      const o = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: l, y: u, placement: c, strategy: h }) => {
          var d, v;
          if (!e) return;
          const s = (v = (d = e.props) == null ? void 0 : d.clientRect) == null ? void 0 : v.call(d), m = s && !c.endsWith("-end") ? s.width : 0;
          r.style.position = h, r.style.left = `${l + m}px`, r.style.top = `${u}px`;
        }
      });
      e.unmount = o, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      if (!(e != null && e.props) || !e.api) return !1;
      const { items: r, command: a } = e.props;
      if (r.length === 0) return !1;
      const o = e.api, l = n.key;
      if (l === "ArrowDown" || l === "ArrowUp") {
        n.preventDefault();
        const u = o.highlightedIndex, c = l === "ArrowDown" ? 1 : -1;
        return o.setHighlighted((u + c + r.length) % r.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        n.preventDefault();
        const u = o.highlightedIndex, c = u >= 0 ? u : 0, h = o.items[c];
        return h ? h.activate() : r[c] && a({ field: r[c].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Qi = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, oi = Te.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: a,
  onStateChange: o,
  resolveToken: l,
  suggestionItems: u,
  onTokenClick: c,
  onSelectionChange: h
}, s) => {
  const m = x(l);
  m.current = l;
  const d = x(u);
  d.current = u;
  const v = x(c);
  v.current = c;
  const p = x(h);
  p.current = h;
  const g = x(null), w = x(null), E = x(t);
  E.current = t;
  const _ = x(r);
  _.current = r;
  const U = x(o);
  U.current = o;
  const M = x(null), Y = (y) => {
    var H;
    const z = {
      bold: y.isActive("bold"),
      italic: y.isActive("italic"),
      underline: y.isActive("underline"),
      strike: y.isActive("strike"),
      link: y.isActive("link"),
      color: y.getAttributes("textStyle").color || ""
    }, L = M.current;
    L && L.bold === z.bold && L.italic === z.italic && L.underline === z.underline && L.strike === z.strike && L.link === z.link && L.color === z.color || (M.current = z, (H = U.current) == null || H.call(U, z));
  }, D = (y) => {
    var ee;
    const z = y.state.selection;
    let L = null;
    z instanceof Qe && z.node.type.name === "token" ? (L = { key: z.node.attrs.field ?? "", pos: z.from }, g.current = z.from) : g.current != null && (g.current = y.state.tr.mapping.map(g.current));
    const H = w.current, q = H && L && H.key === L.key && H.pos === L.pos;
    !H && !L || q || (w.current = L, (ee = p.current) == null || ee.call(p, L));
  }, R = (y) => {
    const z = Xr(Jr(y));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, W = Te.useMemo(() => {
    const y = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: z }) => {
        var L;
        return ((L = d.current) == null ? void 0 : L.call(d, z)) ?? [];
      },
      command: ({ editor: z, range: L, props: H }) => {
        z.chain().focus().insertContentAt(L, { type: "token", attrs: { field: H.field } }).run();
      },
      render: ii
    };
    return Qr.configure({
      resolve: m.current ?? null,
      suggestion: y,
      onTokenClick: (z, L, H) => {
        var q;
        g.current = H, (q = v.current) == null || q.call(v, z, L, H);
      }
    });
  }, []), b = An({
    immediatelyRender: !1,
    extensions: [
      In,
      On.configure({ placeholder: n }),
      Hn,
      _n,
      Fn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Bn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      W
    ],
    content: Kt(e || ""),
    editable: !r,
    onUpdate: ({ editor: y }) => {
      E.current(R(y.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: y }) => {
      Y(y), D(y);
    }
  });
  return K(() => {
    if (!b || b.isFocused) return;
    R(b.getHTML()) !== e && (M.current = null, b.commands.setContent(Kt(e || ""), { emitUpdate: !1 }), Y(b));
  }, [e, b]), K(() => {
    b && b.setEditable(!r);
  }, [r, b]), K(() => {
    b && (M.current = null, Y(b), D(b));
  }, [b]), bn(s, () => ({
    exec: (y, z) => {
      if (!(!b || _.current))
        switch (y) {
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
            z && b.chain().focus().setColor(z).run();
            break;
          case "unsetColor":
            b.chain().focus().unsetColor().run();
            break;
          case "link":
            z && b.chain().focus().extendMarkRange("link").setLink({ href: z }).run();
            break;
          case "unlink":
            b.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => b == null ? void 0 : b.commands.focus(),
    insertToken: (y) => {
      !b || _.current || b.chain().focus().insertContent({ type: "token", attrs: { field: y } }).run();
    },
    replaceToken: (y) => {
      if (!b || _.current) return;
      const z = g.current;
      z != null && b.commands.command(({ tr: L }) => {
        const H = L.doc.nodeAt(z);
        if (!H || H.type.name !== "token") return !1;
        L.setNodeMarkup(z, void 0, { field: y });
        const q = L.doc.resolve(z);
        return q.nodeAfter && q.nodeAfter.type.name === "token" && L.setSelection(new Qe(q)), !0;
      });
    }
  }), [b]), /* @__PURE__ */ i(Pn, { editor: b, className: `richtext-editor ${a || ""}` });
});
oi.displayName = "RichTextEditor";
const si = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], ci = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], qt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), eo = ({ value: e, disabled: t, onChange: n }) => {
  const [r, a] = B(!1);
  return /* @__PURE__ */ i(
    nt,
    {
      open: r,
      onOpenChange: a,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${fn} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(xt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: si.map((o) => /* @__PURE__ */ i(er, { onClick: () => {
        n(o), a(!1);
      }, icon: o === e ? /* @__PURE__ */ i(Ut, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: o }, children: o }) }, o))
    }
  );
}, li = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, a] = B(!1), [o, l] = B(""), u = () => {
    var h;
    const c = o.trim();
    c && ((h = e.current) == null || h.exec("link", c), a(!1));
  };
  return /* @__PURE__ */ i(
    nt,
    {
      open: r,
      onOpenChange: a,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (c) => c.preventDefault(),
          className: `${an} ${n ? un : dn}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(Cn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ $("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: o,
            onChange: (c) => l(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), u());
            },
            className: Fr + " w-full"
          }
        ),
        /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i("button", { onClick: u, className: gt, disabled: !o.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                var c;
                (c = e.current) == null || c.exec("unlink"), a(!1);
              },
              className: gt,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, to = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: a }) => {
  const [o, l] = B(!1), u = (s, m) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(s, m);
  }, c = (s) => `${an} ${s ? un : dn}`, h = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ $("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(Oe, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i("button", { "aria-label": "Bold", disabled: t || h("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("bold"), className: `${c(((n == null ? void 0 : n.bold) ?? !1) || h("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ i(Oe, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i("button", { "aria-label": "Italic", disabled: t || h("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("italic"), className: `${c(((n == null ? void 0 : n.italic) ?? !1) || h("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ i(Oe, { content: "Underline", children: /* @__PURE__ */ i("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("underline"), className: c((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ i(Nn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(Oe, { content: "Strikethrough", children: /* @__PURE__ */ i("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("strikeThrough"), className: c((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ i($n, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: Ge }),
    /* @__PURE__ */ i(li, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: Ge }),
    /* @__PURE__ */ i(
      nt,
      {
        open: o,
        onOpenChange: l,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${fn} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(qt, {}),
          /* @__PURE__ */ i(xt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("unsetColor"), l(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(qt, { className: "w-3.5 h-3.5" })
            }
          ),
          ci.map((s) => /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("foreColor", s), l(!1);
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
    a && /* @__PURE__ */ $($e, { children: [
      /* @__PURE__ */ i("div", { className: Ge }),
      a
    ] })
  ] });
};
function no({ title: e, icon: t, count: n, tone: r = "default", collapsed: a, onToggle: o, trailing: l, bodyClass: u, className: c = "", dataProps: h, children: s }) {
  const m = N ? "px-3.5 py-3" : "px-3 py-2", d = N ? "text-sm" : "text-xs", v = N ? "w-4 h-4" : "w-3.5 h-3.5", p = N ? "text-xs" : "text-[10px]";
  return /* @__PURE__ */ $("div", { ...h, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ $("div", { className: `flex flex-wrap items-center gap-x-2 gap-y-1 ${m} hover:bg-white/5 transition-colors`, children: [
      /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            a ? /* @__PURE__ */ i(Je, { className: `${v} text-zinc-400 shrink-0` }) : /* @__PURE__ */ i(xt, { className: `${v} text-zinc-400 shrink-0` }),
            t,
            /* @__PURE__ */ i("span", { className: `font-semibold text-zinc-200 truncate ${d}`, children: e }),
            n && /* @__PURE__ */ i("span", { className: `text-zinc-500 shrink-0 ${p}`, children: n })
          ]
        }
      ),
      l && /* @__PURE__ */ i("div", { className: "shrink-0", children: l })
    ] }),
    !a && s && /* @__PURE__ */ i("div", { className: u || "ui-card-band border-t p-1.5 space-y-1", children: s })
  ] });
}
export {
  _i as Button,
  no as CardSection,
  kr as Checkbox,
  Fi as Checklist,
  Xi as ChromeHeader,
  Vi as ContentRow,
  Ri as ContextMenu,
  Di as ContextMenuDivider,
  Si as ContextMenuItem,
  Li as ContextMenuSub,
  Bi as DatePicker,
  Pi as DialogProvider,
  er as DropdownItem,
  nt as DropdownMenu,
  nr as DropdownSubmenu,
  Ct as DropdownThemeContext,
  si as FONTS,
  Ki as FloatingChrome,
  eo as FontMenu,
  to as FormatToolbar,
  N as IS_COARSE,
  Yn as IS_TOUCH_CAPABLE,
  Ti as ItemManagerDropdown,
  Oi as LongPressMenuProvider,
  wt as MORPH_EASE,
  Me as MORPH_MS,
  kt as MORPH_OPACITY_MS,
  Ke as MenuHighlightContext,
  yr as Modal,
  Mi as ModalFooter,
  Ye as ModalFooterButton,
  qn as PopoutWindowContext,
  Qi as RICH_TEXT_STATE_IDLE,
  Wi as RadioList,
  oi as RichTextEditor,
  ji as SectionHeader,
  Ui as Seg,
  Gi as StructureControls,
  zt as SubmenuContext,
  gt as TB_BTN,
  je as TB_BTN_ICON,
  Br as TB_DANGER,
  Ge as TB_DIVIDER,
  Fr as TB_INPUT,
  Yi as TB_NUM,
  fn as TB_PICKER,
  qi as TB_ROW_LABEL,
  Wr as TB_SEG,
  an as TB_TOGGLE,
  dn as TB_TOGGLE_OFF,
  un as TB_TOGGLE_ON,
  Qr as Token,
  Zr as TokenChipView,
  Ve as ToolButton,
  Oe as Tooltip,
  Nt as ZOOM_FROM,
  Xn as cloneOverlayClose,
  Ji as escapeHtml,
  Et as getDropdownClasses,
  Ci as getHardwareKeyboard,
  $i as getLastPointerType,
  Nr as inputCls,
  Lr as isInteractiveElement,
  ft as isTouchLike,
  Jt as nearestOverlayOrigin,
  hn as normalizeSpaces,
  it as overlayMorphEnabled,
  Vn as playOverlayClose,
  jn as playOverlayOpen,
  Kt as preprocessTokenHtml,
  Xr as sanitizeRichText,
  Zi as stripRichText,
  Jr as stripTokenWrappers,
  Xt as useCurrentDocument,
  Ae as useCurrentWindow,
  Ai as useDialog,
  nn as useDropdownTheme,
  Gn as useFixedPosition,
  Ei as useHardwareKeyboard,
  Un as useLastPointerType,
  Ii as useLongPressOptOut,
  Tt as useMenuHighlight,
  $t as useOverlayMorph,
  vt as usePopoutWindow,
  Fe as usePortalTarget,
  zi as useSmartPosition,
  Hi as useTouchMode
};
