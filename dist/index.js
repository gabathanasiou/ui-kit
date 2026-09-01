"use client";
import { jsxs as $, jsx as o, Fragment as Ee } from "react/jsx-runtime";
import De, { createContext as Ke, useContext as qe, useState as B, useEffect as K, useRef as b, useCallback as j, useLayoutEffect as xe, useMemo as nt, useImperativeHandle as An } from "react";
import * as G from "@radix-ui/react-dropdown-menu";
import { Check as cn, X as gt, Pencil as Pn, Copy as ln, Trash2 as bt, RotateCcw as an, Plus as In, ChevronRight as rt, ChevronLeft as On, ArrowUp as _n, ArrowDown as Hn, ChevronDown as Nt, Underline as Bn, Strikethrough as Fn, Link as Wn } from "lucide-react";
import * as Ce from "@radix-ui/react-dialog";
import { createPortal as Ct } from "react-dom";
import { useFloating as Kn, autoUpdate as qn, offset as Yn, flip as Un, shift as jn } from "@floating-ui/react-dom";
import { mergeAttributes as Vn, ReactNodeViewRenderer as Xn, NodeViewWrapper as Gn, useEditor as Zn, EditorContent as Jn } from "@tiptap/react";
import { NodeSelection as ot } from "@tiptap/pm/state";
import Qn from "@tiptap/starter-kit";
import er from "@tiptap/extension-placeholder";
import { TextStyle as tr } from "@tiptap/extension-text-style";
import nr from "@tiptap/extension-color";
import rr from "@tiptap/extension-link";
import or from "@tiptap/extension-underline";
import { Mention as ir } from "@tiptap/extension-mention";
import { createRoot as sr } from "react-dom/client";
const cr = Ke(null);
function zt() {
  return qe(cr);
}
function Ye() {
  const e = zt();
  return e ? e.document.body : null;
}
function un() {
  const e = zt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function Oe() {
  return zt() ?? (typeof window < "u" ? window : null);
}
const Ue = typeof window < "u", le = Ue && window.matchMedia("(pointer: coarse)").matches, lr = Ue && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let st = 1;
const Fe = /* @__PURE__ */ new Set();
function yo(e) {
  st = Math.max(0, Math.min(1, e)), Fe.forEach((t) => t());
}
function dn() {
  return st;
}
function ue() {
  const [, e] = B(0);
  return K(() => {
    const t = () => e((n) => n + 1);
    return Fe.add(t), () => {
      Fe.delete(t);
    };
  }, []), le && st > 0;
}
function fn() {
  const [, e] = B(0);
  return K(() => {
    const t = () => e((n) => n + 1);
    return Fe.add(t), () => {
      Fe.delete(t);
    };
  }, []), st;
}
function ze(e, t, n) {
  return Math.round(e + (t - e) * n);
}
function xt(e, t) {
  const n = fn();
  return le && n > 0 ? {
    padding: `${ze(e.py, t.py, n)}px ${ze(e.px, t.px, n)}px`,
    fontSize: `${ze(e.fs, t.fs, n)}px`
  } : { padding: `${e.py}px ${e.px}px`, fontSize: `${e.fs}px` };
}
function yt(e) {
  return e === "touch" || e === "pen";
}
let Pe = null;
const vt = /* @__PURE__ */ new Set();
Ue && window.addEventListener("pointerdown", (e) => {
  Pe = e.pointerType, vt.forEach((t) => t());
}, !0);
function vo() {
  return Pe;
}
function ar() {
  const [, e] = B(0), t = b(Pe);
  return K(() => {
    const n = () => {
      t.current !== Pe && (t.current = Pe, e((r) => r + 1));
    };
    return vt.add(n), () => {
      vt.delete(n);
    };
  }, []), Pe;
}
const hn = ["(any-hover: hover)", "(any-pointer: fine)"];
function mn() {
  return Ue ? hn.some((e) => window.matchMedia(e).matches) : !1;
}
let it = mn();
const wt = /* @__PURE__ */ new Set();
function Jt(e) {
  it !== e && (it = e, wt.forEach((t) => t()));
}
var sn;
if (Ue) {
  const e = () => Jt(mn());
  for (const s of hn) {
    const h = window.matchMedia(s);
    (sn = h.addEventListener) == null || sn.call(h, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || Jt(!0));
  });
  let n = null, r = null;
  const l = "__penClick", i = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (s) => {
    s.pointerType !== "pen" || s.button !== 0 || (n = { x: s.clientX, y: s.clientY });
  }, !0), window.addEventListener("pointerup", (s) => {
    if (s.pointerType !== "pen") return;
    const h = n;
    if (n = null, !h || Math.hypot(s.clientX - h.x, s.clientY - h.y) > 8) return;
    const a = s.target;
    if (!a || !a.isConnected) return;
    if (a instanceof HTMLInputElement && i.has(a.type)) {
      try {
        a.showPicker();
      } catch {
      }
      return;
    }
    const d = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    d[l] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, a.dispatchEvent(d);
  }, !0), window.addEventListener("click", (s) => {
    s[l] || r && Date.now() - r.time < 1e3 && Math.hypot(s.clientX - r.x, s.clientY - r.y) < 12 && (s.preventDefault(), s.stopPropagation());
  }, !0);
}
function wo() {
  return it;
}
function ko() {
  const [, e] = B(0);
  return K(() => {
    const t = () => e((n) => n + 1);
    return wt.add(t), () => {
      wt.delete(t);
    };
  }, []), it;
}
const Ie = 220, Et = "cubic-bezier(0.32, 0.72, 0, 1)", Tt = 170, Rt = 0.94;
function dt(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function pn(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function gn(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return pn({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function ur(e, t, n, r) {
  const l = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${Rt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === l && requestAnimationFrame(() => {
      if (e.current !== l) return;
      const s = gn(t, n);
      t.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, t.style.transition = `transform ${Ie}ms ${Et}, opacity ${Tt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === l && (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, r == null || r());
      }, Ie + 60);
    });
  });
}
function dr(e, t, n, r) {
  const l = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, s = gn(t, n);
  t.style.transition = `transform ${Ie}ms ${Et}, opacity ${Tt}ms ease`, t.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, t.style.transform = `scale(${Rt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === l && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== l || t.isConnected || (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, t.style.pointerEvents = i.pointerEvents, t.style.visibility = i.visibility);
    }));
  }, Ie + 60);
}
function fr(e, t, n) {
  const r = e.cloneNode(!0), l = e.getBoundingClientRect(), i = l.width > 0 || l.height > 0 ? l : n ?? l;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${i.left}px`, r.style.top = `${i.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (t == null ? void 0 : t()) ?? null, h = s ? pn({ left: i.left, top: i.top, width: i.width, height: i.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${h.x * 100}% ${h.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Ie}ms ${Et}, opacity ${Tt}ms ease`, r.style.transform = `scale(${Rt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Ie + 60));
    });
  });
}
function St(e) {
  const t = b(null), [n, r] = B(!1), l = b(null), i = b(0), s = j((p) => {
    if (e.ref && (e.ref.current = p), p) {
      i.current = 0, t.current = p;
      const w = p.getBoundingClientRect();
      (w.width > 0 || w.height > 0) && (l.current = { left: w.left, top: w.top, width: w.width, height: w.height }), r(!0);
      return;
    }
    const y = t.current, E = ++i.current;
    queueMicrotask(() => {
      E === i.current && t.current === y && (t.current = null, r(!1), !(!y || !e.cloneOnUnmount || !a.current) && y.style.visibility !== "hidden" && dt(f.current) && fr(y, c.current, l.current));
    });
  }, []), h = j(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const y = p.getBoundingClientRect();
    (y.width > 0 || y.height > 0) && (l.current = { left: y.left, top: y.top, width: y.width, height: y.height });
  }, []), a = b(e.visible);
  a.current = e.visible;
  const d = b(e.visible), c = b(e.anchor ?? null);
  c.current = e.anchor ?? null;
  const u = b(e.onClosed);
  u.current = e.onClosed;
  const f = b(e.morph !== !1);
  f.current = e.morph !== !1;
  const x = b(0);
  return xe(() => {
    if (!n || !a.current || !dt(f.current)) return;
    const p = t.current;
    p && ur(x, p, c.current);
  }, [n, e.visible]), K(() => {
    if (!n || !a.current) return;
    let p = 0;
    const y = () => {
      p = 0, h(), p = requestAnimationFrame(y);
    };
    return p = requestAnimationFrame(y), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, h]), xe(() => {
    var E;
    const p = d.current;
    if (d.current = e.visible, e.visible || !p) return;
    const y = t.current;
    if (!y || !dt(f.current)) {
      (E = u.current) == null || E.call(u);
      return;
    }
    dr(x, y, c.current, () => {
      var w;
      return (w = u.current) == null ? void 0 : w.call(u);
    });
  }, [e.visible]), K(() => {
    if (!n || !a.current) return;
    const p = (y) => {
      const E = t.current;
      E && E.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), K(() => {
    if (!n || !a.current) return;
    const p = (y) => {
      const E = t.current;
      E && E.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), s;
}
function bn(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function $o(e, t) {
  const n = Oe(), r = b(n);
  r.current = n;
  const l = () => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const s = r.current;
    if (!s) return;
    const h = e.current.getBoundingClientRect(), a = i.getBoundingClientRect(), d = s.innerWidth, c = bn(s), u = a.right - d;
    if (u > 0) {
      const f = Math.min(u + 8, a.left);
      i.style.left = `${a.left - h.left - f}px`;
    }
    a.left < 0 && (i.style.left = `${-h.left + 4}px`), a.bottom > c.bottom + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < c.top && (i.style.bottom = "auto", i.style.top = `${-h.top + c.top + 4}px`, i.style.maxHeight = `${c.height - 8}px`));
  };
  xe(() => {
    if (l(), !t) return;
    const i = r.current, s = (i == null ? void 0 : i.visualViewport) ?? null;
    return s == null || s.addEventListener("resize", l), s == null || s.addEventListener("scroll", l), i == null || i.addEventListener("resize", l), () => {
      s == null || s.removeEventListener("resize", l), s == null || s.removeEventListener("scroll", l), i == null || i.removeEventListener("resize", l);
    };
  }, [t, e]);
}
function hr(e, t, n, r) {
  const l = Oe(), i = b(l);
  i.current = l, xe(() => {
    if (!t || !e.current) return;
    const s = e.current;
    let h = 0;
    const a = () => {
      h = 0;
      const x = s.getBoundingClientRect(), p = i.current;
      if (!p) return;
      const y = p.innerWidth, E = bn(p), w = (r == null ? void 0 : r.panelWidth) ?? Math.max(x.width, 200), v = 4, T = 120;
      let H = Math.max(0, x.left);
      H + w > y && (H = Math.max(0, y - w - 8));
      const U = E.bottom - x.bottom - v - 16, O = x.top - E.top - v - 16;
      if (U >= T || U >= O) {
        const S = Math.min(x.bottom + v, E.bottom), Y = Math.max(T, E.bottom - S - 16);
        n({ top: S, left: H, width: x.width, maxH: Y });
      } else {
        const S = Math.max(T, Math.min(O, 360)), Y = E.bottom - (x.top - v);
        n({ top: 0, left: H, width: x.width, maxH: S, bottom: Math.max(0, Y) });
      }
    }, d = () => {
      h || (h = requestAnimationFrame(a));
    }, c = i.current ?? null, u = (c == null ? void 0 : c.document) ?? null;
    d(), u == null || u.addEventListener("scroll", d, { capture: !0, passive: !0 }), c == null || c.addEventListener("resize", d);
    const f = (c == null ? void 0 : c.visualViewport) ?? null;
    return f == null || f.addEventListener("resize", d), f == null || f.addEventListener("scroll", d), () => {
      h && cancelAnimationFrame(h), u == null || u.removeEventListener("scroll", d, { capture: !0 }), c == null || c.removeEventListener("resize", d), f == null || f.removeEventListener("resize", d), f == null || f.removeEventListener("scroll", d);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let Ae = null;
function xn(e) {
  return Ae == null || Ae(), Ae = e, () => {
    Ae === e && (Ae = null);
  };
}
const Dt = Ke("dark"), yn = () => qe(Dt), mr = (e) => e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Qt = (e) => e ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", pr = (e) => e ? "text-xs" : "text-[10px]";
function Lt(e) {
  const t = le && dn() > 0;
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
    headerPad: Qt(t),
    headerText: `${Qt(t)} font-semibold uppercase tracking-wider ${pr(t)} ui-label`,
    // Item padding
    itemPad: mr(t),
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
function vn(e) {
  const t = [];
  return De.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (De.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const Mt = Ke({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), je = Ke(null), At = () => qe(je);
function ct() {
  const e = b([]), [t, n] = B(-1), [r, l] = B(!1), [i, s] = B(0), h = j((u) => (e.current = [...e.current, u], s((f) => f + 1), () => {
    e.current = e.current.filter((f) => f !== u), s((f) => f + 1);
  }), []), a = j((u, f) => {
    n(u), l(f === "pointer");
  }, []), d = j(() => {
    l((u) => u && (n(-1), !1));
  }, []);
  return nt(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: h,
    setHighlighted: a,
    pointerLeave: d
  }), [t, r, i, h, a, d]);
}
function wn(e) {
  const t = At(), n = b(t);
  n.current = t;
  const r = b(null);
  K(() => {
    var a;
    const h = { label: e.label(), activate: e.activate };
    return r.current = h, (a = n.current) == null ? void 0 : a.register(h);
  }, []);
  const l = t && r.current ? t.items.indexOf(r.current) : -1, i = !!t && !e.disabled && l >= 0 && l === t.highlightedIndex;
  return { api: t, myIndex: l, highlighted: i, setPointer: (h) => {
    !e.disabled && t && h >= 0 && t.setHighlighted(h, "pointer");
  } };
}
function Pt(e, t, n, r) {
  const l = b(-1);
  l.current = t.highlightedIndex;
  const i = b(t);
  i.current = t;
  const s = b(e);
  s.current = e;
  const h = b(r);
  h.current = r;
  const a = b({ text: "", time: 0 }), d = b(!1);
  d.current || (d.current = !0, n.current = (c) => {
    var f, x;
    if (!s.current) return;
    const u = i.current.items;
    if (u.length !== 0) {
      if (c.key === "ArrowDown" || c.key === "ArrowUp") {
        c.preventDefault(), c.stopImmediatePropagation();
        const p = c.key === "ArrowDown" ? 1 : -1, y = (l.current + p + u.length) % u.length;
        i.current.setHighlighted(y, "keyboard");
      } else if (c.key === "ArrowRight") {
        c.preventDefault(), c.stopImmediatePropagation();
        const p = l.current;
        p >= 0 && p < u.length && u[p].submenu && u[p].activate();
      } else if (c.key === "ArrowLeft")
        c.preventDefault(), c.stopImmediatePropagation(), (x = (f = h.current) == null ? void 0 : f.onCloseSub) == null || x.call(f);
      else if (c.key === "Enter" || c.key === " ") {
        c.preventDefault(), c.stopImmediatePropagation();
        const p = l.current;
        p >= 0 && p < u.length && u[p].activate();
      } else if (c.key.length === 1 && !c.ctrlKey && !c.metaKey && !c.altKey) {
        c.preventDefault(), c.stopImmediatePropagation();
        const p = Date.now(), y = (p - a.current.time > 500 ? "" : a.current.text) + c.key.toLowerCase();
        if (a.current = { text: y, time: p }, !y) return;
        const E = l.current + 1;
        for (let w = 0; w < u.length; w++) {
          const v = (E + w) % u.length;
          if (u[v].label.toLowerCase().startsWith(y)) {
            i.current.setHighlighted(v, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function It(e, t, n, r, l, i) {
  const s = b(t);
  s.current = t;
  const h = b(e);
  h.current = e;
  const a = b(l);
  a.current = l;
  const d = b(!1);
  d.current || (d.current = !0, i.current = (c) => {
    if (!h.current || a.current) return;
    const u = r.current;
    u && u.contains(c.target) || s.current.items.length === 0 || !(c.key === "ArrowDown" || c.key === "ArrowUp" || c.key === "ArrowLeft" || c.key === "ArrowRight" || c.key === "Enter" || c.key === " " || c.key.length === 1 && !c.ctrlKey && !c.metaKey && !c.altKey) || (c.preventDefault(), c.stopImmediatePropagation(), n.current(c));
  });
}
function Ot(e, t) {
  const n = b(e);
  n.current = e;
  const r = b(!1);
  r.current || (r.current = !0, t.current = (l) => {
    if (!n.current) return;
    const i = l.currentTarget;
    i.scrollHeight > i.clientHeight && (l.preventDefault(), i.scrollTop += l.deltaY);
  });
}
function lt({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: l = "left",
  width: i,
  theme: s = "dark",
  children: h,
  morph: a = !0,
  contentClassName: d,
  initialHighlightIndex: c
}) {
  const [u, f] = B([]), [x, p] = B(null), y = Ye(), E = un(), w = b(null), v = b(null), T = b(e);
  T.current = e;
  const [H, U] = B(e), O = ct();
  K(() => {
    if (e)
      return U(!0), O.setHighlighted(c ?? -1, "keyboard"), xn(() => {
        n == null || n(!1), t == null || t();
      });
    f([]);
  }, [e, c, n, t]), K(() => {
    if (!e || !E) return;
    const P = (te) => {
      if (te.pointerType !== "touch") return;
      const ie = te.target;
      ie && (v.current && v.current.contains(ie) || w.current && w.current.contains(ie) || ie instanceof Element && ie.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return E.addEventListener("pointerdown", P, { capture: !0 }), () => E.removeEventListener("pointerdown", P, { capture: !0 });
  }, [e, E, n, t]);
  const S = j(() => {
    const P = w.current;
    if (!P) return null;
    const te = P.getBoundingClientRect();
    return { left: te.left, top: te.top, width: te.width, height: te.height };
  }, []), Y = St({
    visible: e,
    morph: a,
    anchor: S,
    onClosed: () => U(!1)
  }), g = b(() => {
  }), N = b(() => {
  }), L = b(() => {
  });
  Pt(e && u.length === 0, O, g), Ot(e, N), It(e, O, g, v, u.length > 0, L);
  const k = b(null), W = j((P) => {
    var te;
    if (P) {
      P.addEventListener("keydown", g.current, { capture: !0 }), P.addEventListener("wheel", N.current, { passive: !1 });
      const ie = P.ownerDocument;
      k.current = ie, ie.addEventListener("keydown", L.current, { capture: !0 }), D(P.offsetWidth), _(!0);
    } else
      (te = k.current) == null || te.removeEventListener("keydown", L.current, { capture: !0 }), k.current = null, _(!1);
    v.current = P, Y(P);
  }, [Y]), [q, J] = B({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [ne, Q] = B(0), [z, _] = B(!1), [C, D] = B(0);
  K(() => {
    e && w.current && Q(w.current.getBoundingClientRect().width);
  }, [e]);
  const ee = nt(() => ({ panelWidth: C || ne || void 0 }), [C, ne]);
  hr(w, e && z, (P) => J({ ...P, maxH: Math.min(P.maxH, 384), ready: !0 }), ee), K(() => {
    if (q.ready && e) {
      const P = v.current;
      P && P.ownerDocument.activeElement !== P && !P.contains(P.ownerDocument.activeElement) && P.focus();
    }
  }, [q.ready, e]), xe(() => {
    var te;
    if (!e || O.highlightedIndex < 0) return;
    const P = (te = v.current) == null ? void 0 : te.querySelector(`[data-ei="${O.highlightedIndex}"]`);
    P == null || P.scrollIntoView({ block: "nearest" });
  }, [e, O.highlightedIndex]);
  const A = j((P) => {
    !P && !T.current || (!P && F.current && (re.current = !0), n ? n(P) : P || t == null || t());
  }, [n, t]), M = b(H);
  M.current = H;
  const F = b(!1), re = b(!1), Le = j(() => {
    if (!T.current && M.current) {
      if (re.current) {
        re.current = !1, F.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), me = De.isValidElement(r) ? r : null, ye = me ? De.cloneElement(me, {
    ref: (P) => {
      w.current = P;
    },
    onPointerDown: () => {
      F.current = !0, re.current = !1;
    },
    onClick: (P) => {
      var te, ie;
      (ie = (te = me.props).onClick) == null || ie.call(te, P), Le();
    }
  }) : r;
  return /* @__PURE__ */ $(G.Root, { open: e || H, onOpenChange: A, modal: !1, children: [
    /* @__PURE__ */ o(G.Trigger, { asChild: !0, children: ye }),
    /* @__PURE__ */ o(G.Portal, { container: y ?? void 0, children: /* @__PURE__ */ o(Dt.Provider, { value: s, children: /* @__PURE__ */ o(Mt.Provider, { value: { chain: u, setChain: f, morph: a, keyboardOpened: x, setKeyboardOpened: p }, children: /* @__PURE__ */ o(je.Provider, { value: O, children: /* @__PURE__ */ o(
      G.Content,
      {
        ref: W,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${i || ""} ${d || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: q.left,
          top: q.bottom != null ? void 0 : q.top,
          bottom: q.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: i ? void 0 : ne || void 0,
          maxHeight: q.maxH,
          visibility: q.ready ? "visible" : "hidden"
        },
        onPointerLeave: O.pointerLeave,
        children: h
      }
    ) }) }) }) })
  ] });
}
function No({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: l,
  onRename: i,
  onDuplicate: s,
  onDelete: h,
  onCreate: a,
  onImport: d,
  onExport: c,
  onReset: u,
  onTrash: f,
  closeOnSelect: x,
  readOnly: p = !1,
  theme: y,
  align: E,
  label: w,
  header: v,
  itemLabel: T,
  trigger: H,
  minItems: U = 1,
  itemRender: O,
  morph: S = !0,
  contentClassName: Y
}) {
  const g = Lt(), [N, L] = B(null), [k, W] = B(""), q = b(null), J = b(null);
  K(() => {
    e && requestAnimationFrame(() => {
      var C, D;
      (D = (C = J.current) == null ? void 0 : C.querySelector('[data-active="1"]')) == null || D.scrollIntoView({ block: "nearest" });
    });
  }, [e]), K(() => {
    var ee;
    if (!e) return;
    const C = (A) => {
      var ye, $e, P, te, ie;
      if (($e = (ye = A.target) == null ? void 0 : ye.closest) != null && $e.call(ye, "input, textarea, [contenteditable]")) return;
      const M = (P = J.current) == null ? void 0 : P.closest(".ui-menu");
      if (!M || !M.contains(A.target)) return;
      const F = M.ownerDocument, re = [...M.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], Le = [...M.querySelectorAll('div:last-child > [role="menuitem"]')], me = [...re, ...Le];
      if (A.key === "ArrowDown" || A.key === "ArrowUp") {
        A.preventDefault(), A.stopImmediatePropagation();
        const de = F.activeElement;
        let pe = de ? me.indexOf(de) : -1;
        if (pe < 0 && de) {
          const ge = de.closest("[data-active]"), Te = ge == null ? void 0 : ge.querySelector('[role="menuitem"]:first-child');
          Te && (pe = re.indexOf(Te));
        }
        const fe = A.key === "ArrowDown" ? 1 : -1, we = pe < 0 ? fe === 1 ? 0 : me.length - 1 : (pe + fe + me.length) % me.length;
        (te = me[we]) == null || te.focus({ preventScroll: !0 });
        return;
      }
      if (A.key === "ArrowLeft" || A.key === "ArrowRight") {
        const de = F.activeElement, pe = de == null ? void 0 : de.closest("[data-active]");
        if (!pe) return;
        A.preventDefault(), A.stopImmediatePropagation();
        const fe = [...pe.querySelectorAll('[role="menuitem"]')].slice(1);
        if (fe.length === 0) return;
        const we = de && pe.contains(de) ? fe.indexOf(de) : -1, ge = A.key === "ArrowRight" ? 1 : -1, Te = we < 0 ? 0 : (we + ge + fe.length) % fe.length;
        (ie = fe[Te]) == null || ie.focus({ preventScroll: !0 });
        return;
      }
    }, D = ((ee = J.current) == null ? void 0 : ee.ownerDocument) ?? null;
    return D == null || D.addEventListener("keydown", C, { capture: !0 }), () => D == null ? void 0 : D.removeEventListener("keydown", C, { capture: !0 });
  }, [e]), K(() => {
    if (N) {
      requestAnimationFrame(() => {
        var D, ee;
        (D = q.current) == null || D.focus(), (ee = q.current) == null || ee.select();
      });
      const C = n.find((D) => D.id === N);
      C && !k && W(C.name);
    }
  }, [N]), K(() => {
    if (N) {
      const C = n.find((D) => D.id === N);
      C && !k && W(C.name);
    }
  }, [N, n]);
  const ne = (C, D) => {
    L(C), W(D);
  }, Q = () => {
    N && k.trim() && i(N, k.trim()), L(null);
  }, z = () => {
    L(null);
  }, _ = T || v.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ $(lt, { open: e, onOpenChange: (C) => {
    C ? (L(null), W("")) : (N && k.trim() && i(N, k.trim()), L(null), W("")), (!C || !p) && t(C);
  }, width: "w-80", theme: y, align: E, trigger: H, morph: S, contentClassName: Y, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${g.headerText}`, children: v }),
    /* @__PURE__ */ o("div", { ref: J, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((C) => {
      const D = C.id === r, ee = N === C.id;
      return /* @__PURE__ */ o("div", { "data-active": D ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${D || ee ? g.rowActiveBg : g.rowHoverBg} ${N && !ee ? "opacity-40 pointer-events-none" : ""}`, children: ee ? /* @__PURE__ */ $(Ee, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: q,
            value: k,
            onChange: (A) => W(A.target.value),
            onKeyDown: (A) => {
              A.key === "Enter" && (A.preventDefault(), A.stopPropagation(), Q()), A.key === "Escape" && (A.preventDefault(), A.stopPropagation(), z());
            },
            className: `w-full border rounded ${g.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          G.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${g.editConfirm}`,
            onSelect: (A) => {
              A.preventDefault(), Q();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(cn, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          G.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${g.editCancel}`,
            onSelect: (A) => {
              A.preventDefault(), z();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(gt, { className: g.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ $(Ee, { children: [
        /* @__PURE__ */ o(
          G.Item,
          {
            className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none cursor-pointer flex items-center ${g.rowText} ${D ? "" : g.rowTextHover}`,
            onSelect: x ? () => {
              l(C.id);
            } : (A) => {
              A.preventDefault(), l(C.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${D ? g.rowActiveText : ""}`, children: O ? O(C) : C.name })
          }
        ),
        /* @__PURE__ */ o(
          G.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${D ? g.btnActive : g.btnBase}`,
            onSelect: (A) => {
              A.preventDefault(), ne(C.id, C.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ o(Pn, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          G.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${D ? g.btnActive : g.btnBase}`,
            onSelect: (A) => {
              A.preventDefault();
              const M = s(C.id);
              M && ne(M, `${C.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ o(ln, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          G.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= U ? g.btnDisabled : D ? g.btnDangerActive : g.btnDanger}`,
            onSelect: (A) => {
              A.preventDefault(), h(C.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= U,
            children: /* @__PURE__ */ o(bt, { className: g.btnIcon })
          }
        )
      ] }) }, C.id);
    }) }),
    /* @__PURE__ */ $("div", { className: `shrink-0 ${N ? "opacity-40 pointer-events-none" : ""}`, children: [
      u && /* @__PURE__ */ $(Ee, { children: [
        /* @__PURE__ */ o(G.Separator, { className: g.separator }),
        /* @__PURE__ */ $(
          G.Item,
          {
            className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault} ui-row`,
            onSelect: (C) => {
              C.preventDefault(), u();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ o(an, { className: `${g.btnIcon} ${g.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || d || c || f) && /* @__PURE__ */ o(G.Separator, { className: g.separator }),
      a && /* @__PURE__ */ $(
        G.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault();
            const D = a();
            D && ne(D, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ o(In, { className: `${g.btnIcon} ${g.icon}` }),
            "New ",
            _
          ]
        }
      ),
      d && /* @__PURE__ */ $(
        G.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ $("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      c && /* @__PURE__ */ $(
        G.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), c();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ $("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ $(
        G.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ o(bt, { className: `${g.btnIcon} ${g.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function gr({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: l = "",
  children: i,
  keepOpen: s = !1,
  selected: h = !1,
  rightAction: a,
  trailing: d
}) {
  yn();
  const c = Lt(), f = ue() ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", x = b(!1), p = b(null), { myIndex: y, highlighted: E, setPointer: w } = wn({
    label: () => vn(i),
    activate: () => {
      n || e();
    },
    disabled: n
  }), v = r === "danger" ? c.itemDanger : c.itemDefault;
  return /* @__PURE__ */ $(
    G.Item,
    {
      ref: p,
      "data-ei": y >= 0 ? y : void 0,
      className: `w-full text-left ${f} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${v} ${h ? "ui-item-selected" : ""} ${E ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${l}`,
      onSelect: (T) => {
        if (x.current) {
          x.current = !1;
          return;
        }
        s && T.preventDefault(), e();
      },
      onPointerEnter: () => {
        w(y);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ o("span", { className: `${c.icon} shrink-0`, children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: i }),
        d && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: d }),
        a && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${c.rightAction}`,
            title: a.title,
            onPointerDown: (T) => {
              T.stopPropagation(), T.preventDefault(), x.current = !0, a.onClick();
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
function br({ id: e, label: t, icon: n, width: r, side: l = "right", children: i, contentClassName: s }) {
  const { chain: h, setChain: a, morph: d, keyboardOpened: c, setKeyboardOpened: u } = qe(Mt), f = h.includes(e), x = h[h.length - 1] === e, p = yn(), y = Ye(), E = b(null), w = b(null), [v, T] = B(f), H = !f && v;
  K(() => {
    f && T(!0);
  }, [f]);
  const U = () => a((M) => {
    const F = M.indexOf(e);
    return F >= 0 ? M.slice(0, F) : M;
  }), O = ct(), S = At(), Y = b(S);
  Y.current = S;
  const g = b(null);
  K(() => {
    var F;
    const M = {
      label: t,
      activate: () => {
        u(e), a((re) => re.includes(e) ? re : [...re, e]);
      },
      submenu: !0
    };
    return g.current = M, (F = Y.current) == null ? void 0 : F.register(M);
  }, []);
  const N = S && g.current ? S.items.indexOf(g.current) : -1, L = N >= 0 && N === S.highlightedIndex, k = j(() => {
    const M = E.current;
    if (!M) return null;
    const F = M.getBoundingClientRect();
    return { left: F.left, top: F.top, width: F.width, height: F.height };
  }, []), W = St({
    visible: f,
    morph: d,
    anchor: k,
    onClosed: () => T(!1)
  }), q = b(() => {
  }), J = b(() => {
  }), ne = b(() => {
  });
  Pt(f && x, O, q, {
    onCloseSub: () => {
      U(), S && N >= 0 && S.setHighlighted(N, "keyboard");
    }
  });
  const Q = b(c);
  Q.current = c, K(() => {
    f && (Q.current === e ? (O.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var M;
      return (M = w.current) == null ? void 0 : M.focus();
    }), u(null)) : O.setHighlighted(-1, "keyboard"));
  }, [f]), Ot(f, J), It(f, O, q, w, !x, ne), De.useLayoutEffect(() => {
    var F;
    if (!f || O.highlightedIndex < 0) return;
    const M = (F = w.current) == null ? void 0 : F.querySelector(`[data-ei="${O.highlightedIndex}"]`);
    M == null || M.scrollIntoView({ block: "nearest" });
  }, [f, O.highlightedIndex]);
  const z = b(null), _ = j((M) => {
    var F;
    if (M) {
      M.addEventListener("keydown", q.current, { capture: !0 }), M.addEventListener("wheel", J.current, { passive: !1 });
      const re = M.ownerDocument;
      z.current = re, re.addEventListener("keydown", ne.current, { capture: !0 });
    } else
      (F = z.current) == null || F.removeEventListener("keydown", ne.current, { capture: !0 }), z.current = null;
    w.current = M, W(M);
  }, [W]), ee = `w-full text-left ${ue() ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${L ? " ui-item-highlighted" : ""}${H ? " ui-sub-closing" : ""}`, A = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ $(G.Sub, { open: f || v, onOpenChange: (M) => a((F) => {
    if (!M) {
      const re = F.indexOf(e);
      return re >= 0 ? F.slice(0, re) : F;
    }
    return F.includes(e) ? F : [...F, e];
  }), children: [
    /* @__PURE__ */ $(
      G.SubTrigger,
      {
        ref: E,
        "data-ei": N >= 0 ? N : void 0,
        className: ee,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          S && N >= 0 && S.setHighlighted(N, "pointer");
        },
        onPointerDown: (M) => {
          M.pointerType === "pen" && (M.preventDefault(), a((F) => f ? F.slice(0, F.indexOf(e)) : [...F, e]));
        },
        children: [
          l === "left" && /* @__PURE__ */ o(rt, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ $("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          l === "right" && /* @__PURE__ */ o(rt, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(G.Portal, { container: y ?? void 0, children: /* @__PURE__ */ o(
      G.SubContent,
      {
        ref: _,
        "data-theme": p,
        className: A,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: O.pointerLeave,
        children: /* @__PURE__ */ o(je.Provider, { value: O, children: i })
      }
    ) })
  ] });
}
const _e = 8, Co = ({ open: e, x: t, y: n, onClose: r, children: l, containerRef: i, morph: s = !0 }) => {
  const a = ue() ? "text-sm" : "text-xs", d = b(null), c = Oe(), [u, f] = B(!1), [x, p] = B([]), [y, E] = B(null), w = ct();
  K(() => {
    if (e)
      return w.setHighlighted(-1, "keyboard"), xn(r);
  }, [e, r]);
  const v = b({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const T = j(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), H = St({
    visible: !0,
    morph: s,
    anchor: T,
    cloneOnUnmount: !0
  }), U = b(() => {
  }), O = b(() => {
  }), S = b(() => {
  });
  Pt(e, w, U), Ot(e, O), It(e, w, U, d, x.length > 0, S);
  const Y = b(null), g = j((k) => {
    var W;
    if (k) {
      k.addEventListener("keydown", U.current, { capture: !0 }), k.addEventListener("wheel", O.current, { passive: !1 });
      const q = k.ownerDocument;
      Y.current = q, q.addEventListener("keydown", S.current, { capture: !0 });
    } else
      (W = Y.current) == null || W.removeEventListener("keydown", S.current, { capture: !0 }), Y.current = null;
    d.current = k, f(!!k), H(k);
  }, [H]), [N, L] = B(null);
  return xe(() => {
    var ee;
    if (!e || !u || !d.current) return;
    const k = d.current, W = k.offsetWidth, q = k.offsetHeight, J = (ee = i == null ? void 0 : i.current) == null ? void 0 : ee.getBoundingClientRect(), ne = J ? J.right : (c == null ? void 0 : c.innerWidth) ?? 0, Q = J ? J.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, z = J ? J.left : 0, _ = J ? J.top : 0;
    let C = Math.max(_ + _e, v.current.top), D = Math.max(z + _e, v.current.left);
    D + W > ne && (D = ne - W - _e), C + q > Q && (C = Math.max(_ + _e, Q - q - _e)), L({ left: D, top: C });
  }, [e, u, t, n, i]), e ? /* @__PURE__ */ $(G.Root, { open: e, onOpenChange: (k) => {
    k || r();
  }, modal: !1, children: [
    /* @__PURE__ */ o(G.Trigger, { asChild: !0, children: /* @__PURE__ */ o("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ o(G.Portal, { children: /* @__PURE__ */ o(Dt.Provider, { value: "light", children: /* @__PURE__ */ o(Mt.Provider, { value: { chain: x, setChain: p, morph: s, keyboardOpened: y, setKeyboardOpened: E }, children: /* @__PURE__ */ o(je.Provider, { value: w, children: /* @__PURE__ */ o(
      G.Content,
      {
        ref: g,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${a} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (N == null ? void 0 : N.left) ?? v.current.left, top: (N == null ? void 0 : N.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: l
      }
    ) }) }) }) })
  ] }) : null;
}, zo = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: l = !1, trailing: i, children: s }) => {
  const a = ue() ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", d = At(), c = b(d);
  c.current = d;
  const u = b(null);
  K(() => {
    var y;
    const p = { label: vn(s), activate: () => {
      r || e();
    } };
    return u.current = p, (y = c.current) == null ? void 0 : y.register(p);
  }, []);
  const f = d && u.current ? d.items.indexOf(u.current) : -1, x = !r && f >= 0 && f === d.highlightedIndex;
  return /* @__PURE__ */ $(
    G.Item,
    {
      "data-ei": f >= 0 ? f : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && d && f >= 0 && d.setHighlighted(f, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${a} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${l ? "ui-item-selected" : ""} ${x ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: s }),
        i && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: i })
      ]
    }
  );
}, Eo = () => /* @__PURE__ */ o(G.Separator, { className: "ui-sep my-1" }), To = (e) => /* @__PURE__ */ o(br, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Z = 8, kn = "[data-modal-stack]", ke = 220, We = "cubic-bezier(0.32, 0.72, 0, 1)", et = 0.94;
function He() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Se(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function $n(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function en(e, t, n, r) {
  const l = ++e.current, i = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = $n(i, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === l && (t.style.transition = `transform ${ke}ms ${We}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === l && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ke + 80));
    });
  });
}
function xr(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${et})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${ke}ms ${We}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ke + 60));
    });
  });
}
function tn(e, t, n) {
  const r = ++e.current, l = t.getBoundingClientRect(), i = 1 - et, s = { left: l.left + l.width * i / 2, top: l.top + l.height * i / 2, width: l.width * et, height: l.height * et };
  t.style.transition = `transform ${ke}ms ${We}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = $n(l, s), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ke + 60);
}
function ft(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(kn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function ht(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(kn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function yr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: l,
  footer: i,
  children: s,
  onReset: h,
  morph: a = !0,
  flat: d = !1,
  closable: c = !0,
  dismissOnBackdrop: u = !0
}) {
  const f = ue(), x = b(null), p = b(null), y = b(null), E = f ? "px-6" : "px-5", w = f ? "py-3" : "py-2.5", v = f ? "text-sm" : "text-xs", T = f ? "w-4 h-4" : "w-3.5 h-3.5", H = f ? "text-base" : "text-sm", U = f ? "w-5 h-5" : "w-4 h-4", O = f ? "px-6" : "px-5", S = f ? "pt-6" : "pt-5", Y = f ? "pb-6" : "pb-5", g = f ? "text-xs" : "text-[10px]", N = f ? "w-3.5 h-3.5" : "w-3 h-3", L = f ? "px-2.5 py-1.5" : "px-2 py-1", [k, W] = B(!1), q = j((m) => {
    x.current = m, W(m !== null);
  }, []), J = Ye(), ne = Oe(), Q = b(ne);
  Q.current = ne;
  const [z, _] = B(null), C = b(null), D = b(!1), ee = b(!1), A = b(0), M = b({ w: 0, h: 0 }), F = b(!1), [re, Le] = B(!1), [me, ye] = B(!1), $e = b(0), P = b(!1), [te, ie] = B(!1), de = b(a);
  de.current = a;
  const pe = b(!1), fe = b(!1), we = () => {
    fe.current = !0, Le(!0);
  }, ge = () => {
    fe.current = !1, Le(!1);
  };
  K(() => {
    e || (_(null), F.current = !1, D.current = !1, ye(!1));
  }, [e]), xe(() => {
    if (!e || F.current || !k || !x.current) return;
    F.current = !0;
    const m = x.current.getBoundingClientRect(), R = Q.current ?? null, I = (R == null ? void 0 : R.innerWidth) ?? 0, V = Se(R);
    _({
      left: Math.max(Z, Math.min((I - m.width) / 2, I - m.width - Z)),
      top: Math.max(V.top + Z, Math.min(V.top + (V.height - m.height) / 2, V.bottom - m.height - Z))
    });
  }, [e, k]), xe(() => {
    if (!e || !k || !a || He() || !x.current) return;
    const m = x.current, R = ft(m), I = R[R.length - 1];
    we(), I ? en($e, m, I.getBoundingClientRect(), ge) : xr($e, m, ge);
  }, [e, k]);
  const Te = j(() => {
    if (!c || P.current) return;
    const m = x.current, R = !!m && ft(m).length > 0;
    if (!m || !a || He() || R) {
      t();
      return;
    }
    P.current = !0, ie(!0), pe.current = !0, we(), tn($e, m, () => {
      P.current = !1, ie(!1), ge(), t();
    });
  }, [a, t, c]), Ve = j(() => {
    const m = x.current;
    if (!m || pe.current || !de.current || He() || ft(m).length > 0) return;
    const R = m.ownerDocument, I = m.cloneNode(!0);
    I.removeAttribute("data-modal-stack"), I.removeAttribute("data-state"), I.removeAttribute("role"), I.removeAttribute("data-aria-hidden"), I.removeAttribute("tabindex"), I.setAttribute("aria-hidden", "true"), I.style.pointerEvents = "none", R.body.appendChild(I), tn({ current: 0 }, I, () => {
      I.isConnected && I.remove();
    });
  }, []);
  xe(() => () => Ve(), [Ve]);
  const Ht = b(e);
  xe(() => {
    const m = Ht.current;
    Ht.current = e, m && !e && Ve();
  }, [e, k, Ve]), K(() => {
    if (!e || !k || !a || !x.current) return;
    const m = x.current, R = m.parentNode;
    if (!R) return;
    let I = 0, V = null, X = !1;
    const se = () => {
      I = 0;
      const ce = ht(m);
      if (ce.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", V = ce[ce.length - 1].getBoundingClientRect(), X = !0, I = requestAnimationFrame(se);
      else if (X) {
        X = !1, V && !He() && (we(), en($e, m, V, ge)), V = null;
        const ae = Q.current ?? null;
        ae == null || ae.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, oe = new MutationObserver(() => {
      !I && ht(m).length > 0 && (I = requestAnimationFrame(se));
    });
    return oe.observe(R, { childList: !0 }), () => {
      oe.disconnect(), I && cancelAnimationFrame(I);
    };
  }, [e, k]), K(() => {
    if (!k || !a || He() || !x.current) return;
    const m = x.current;
    let R = Math.round(m.getBoundingClientRect().height), I = !1;
    const V = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const X = Math.round(m.getBoundingClientRect().height);
      if (!I) {
        I = !0, R = X;
        return;
      }
      if (Math.abs(X - R) < 1) return;
      if (C.current || P.current || ht(m).length > 0) {
        R = X;
        return;
      }
      if (fe.current) return;
      const se = R;
      R = X, we();
      const oe = m.getBoundingClientRect(), ce = Se(Q.current ?? null), ae = !D.current && !ee.current, Me = ae ? ce.top + (ce.height - se) / 2 : oe.top, be = ae ? ce.top + (ce.height - X) / 2 : oe.top;
      m.style.transition = "none", m.style.height = `${se}px`, ae && (m.style.top = `${Me}px`), p.current && (p.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${se}px` && (m.style.transition = `height ${ke}ms ${We}${ae ? `, top ${ke}ms ${We}` : ""}`, m.style.height = `${X}px`, ae && (m.style.top = `${be}px`), window.setTimeout(() => {
            m.style.height === `${X}px` && (m.style.transition = "", m.style.height = "", p.current && (p.current.style.overflow = ""), ae && _({ left: oe.left, top: be }), ge());
          }, ke + 60));
        });
      });
    });
    return V.observe(m), () => V.disconnect();
  }, [k]);
  const Xe = j(() => {
    const m = x.current;
    if (!m) return null;
    const R = m.getBoundingClientRect();
    return { left: R.left, top: R.top, width: R.width, height: R.height };
  }, []), Ne = j((m, R) => {
    const I = Q.current ?? null, V = (I == null ? void 0 : I.innerWidth) ?? 0, X = Se(I), se = Xe(), oe = se ? se.width : Math.min(V - Z * 2, 576), ce = se ? se.height : Math.min(X.height - Z * 2, 400);
    return {
      left: Math.max(Z, Math.min(m, V - oe - Z)),
      top: Math.max(X.top + Z, Math.min(R, X.bottom - ce - Z))
    };
  }, [Xe]);
  K(() => {
    if (!e) return;
    const m = Q.current ?? null, R = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !R) return;
    const I = 120;
    ee.current = !1, M.current = { w: m.innerWidth, h: m.innerHeight };
    let V = 0;
    const X = () => {
      if (P.current || C.current) return;
      const oe = (m == null ? void 0 : m.innerHeight) ?? 0, ce = (m == null ? void 0 : m.innerWidth) ?? 0, Me = Se(m).height < oe - I, be = oe < M.current.h - I && ce === M.current.w;
      Me || be ? (ee.current = !0, A.current && (clearTimeout(A.current), A.current = 0)) : A.current || (A.current = (m == null ? void 0 : m.setTimeout(() => {
        ee.current = !1, A.current = 0, ye(!1);
      }, 600)) ?? 0), ye(ee.current), !V && (V = requestAnimationFrame(() => {
        var Zt;
        V = 0;
        const Vt = x.current;
        if (!Vt) return;
        const Re = Se(Q.current ?? null), ve = Vt.getBoundingClientRect(), Xt = ((Zt = Q.current) == null ? void 0 : Zt.innerWidth) ?? 0, ut = (m == null ? void 0 : m.innerHeight) ?? 0, Mn = Re.height < ut - I || ut < M.current.h - I && (m == null ? void 0 : m.innerWidth) === M.current.w;
        M.current = { w: (m == null ? void 0 : m.innerWidth) ?? 0, h: ut };
        const Ge = ve.top >= Re.top + Z && ve.bottom <= Re.bottom - Z, Gt = () => {
          _({
            left: Math.max(Z, Math.min((Xt - ve.width) / 2, Xt - ve.width - Z)),
            top: Math.max(Re.top + Z, Math.min(Re.top + (Re.height - ve.height) / 2, Re.bottom - ve.height - Z))
          });
        };
        if (Mn && !le) {
          if (D.current) {
            Ge || _(Ne(ve.left, ve.top));
            return;
          }
          if (Ge) return;
          Gt();
          return;
        }
        if (!ee.current) {
          if (D.current) {
            Ge || _(Ne(ve.left, ve.top));
            return;
          }
          Ge || Gt();
        }
      }));
    };
    R.addEventListener("resize", X), R.addEventListener("scroll", X);
    const se = () => {
      P.current || C.current || V || (V = requestAnimationFrame(() => {
        V = 0;
        const oe = x.current;
        if (!oe) return;
        const ce = Q.current ?? null, ae = Se(ce), Me = (ce == null ? void 0 : ce.innerWidth) ?? 0, be = oe.getBoundingClientRect();
        if (D.current) {
          _(Ne(be.left, be.top));
          return;
        }
        _({
          left: Math.max(Z, Math.min((Me - be.width) / 2, Me - be.width - Z)),
          top: Math.max(ae.top + Z, Math.min(ae.top + (ae.height - be.height) / 2, ae.bottom - be.height - Z))
        });
      }));
    };
    return m.addEventListener("orientationchange", se), () => {
      R.removeEventListener("resize", X), R.removeEventListener("scroll", X), m.removeEventListener("orientationchange", se), V && cancelAnimationFrame(V), A.current && clearTimeout(A.current);
    };
  }, [e, Ne]);
  const Bt = j((m) => {
    if (m.target.closest("button")) return;
    D.current = !0;
    const R = Xe();
    R && (_(Ne(R.left, R.top)), C.current = { startX: m.clientX, startY: m.clientY, posX: R.left, posY: R.top }, m.target.setPointerCapture(m.pointerId));
  }, [Xe, Ne]), Ft = j((m) => {
    const R = C.current;
    R && (m.preventDefault(), _(Ne(R.posX + m.clientX - R.startX, R.posY + m.clientY - R.startY)));
  }, [Ne]), Wt = j(() => {
    C.current = null;
  }, []), Kt = C.current !== null, qt = j(() => {
    D.current = !1;
    const m = Q.current ?? null, R = Se(m), I = (m == null ? void 0 : m.innerWidth) ?? 0, V = x.current, X = V ? V.getBoundingClientRect() : { width: 0, height: 0 };
    _({
      left: Math.max(Z, Math.min((I - X.width) / 2, I - X.width - Z)),
      top: Math.max(R.top + Z, Math.min(R.top + (R.height - X.height) / 2, R.bottom - X.height - Z))
    });
  }, []), at = b(0), Yt = j(() => {
    const m = Date.now();
    m - at.current < 300 ? (at.current = 0, qt()) : at.current = m;
  }, [qt]), Ut = z !== null, Sn = Ut ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Dn = `${l ? `${l} w-full` : "max-w-xl w-full"}`, jt = {
    ...Ut ? { left: z.left, top: z.top } : {},
    width: `min(100%, calc(100vw - ${Z * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...me ? {} : { maxHeight: `calc(100vh - ${Z * 2}px)` }
  }, Ln = j((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey) return;
    const R = m.target, I = y.current;
    if (!(!!R.closest("[data-modal-close]") || !!I && I.contains(R) && !!R.closest('button, a, [role="button"]')) && R.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !I) return;
    const X = Array.from(I.querySelectorAll("button[data-modal-confirm]")), se = X.length > 0 ? X : Array.from(I.querySelectorAll("button")), oe = se[se.length - 1];
    !oe || oe.disabled || (m.preventDefault(), oe.click());
  }, []);
  return /* @__PURE__ */ o(Ce.Root, { open: e, onOpenChange: (m) => {
    m || Te();
  }, children: /* @__PURE__ */ $(Ce.Portal, { container: J ?? void 0, children: [
    /* @__PURE__ */ o(
      Ce.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${te ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), u && Te());
        }
      }
    ),
    /* @__PURE__ */ $(
      Ce.Content,
      {
        ref: q,
        onKeyDown: Ln,
        onInteractOutside: (m) => {
          u || m.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${Sn} ${Dn}`,
        style: { touchAction: "manipulation", ...Object.keys(jt).length > 0 ? jt : {} },
        children: [
          d ? /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${O} ${S} pb-4 ${Kt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                re || Bt(m);
              },
              onPointerMove: Ft,
              onPointerUp: Wt,
              onClick: Yt,
              children: [
                /* @__PURE__ */ o(Ce.Title, { className: `${H} font-bold text-white truncate`, children: n }),
                c && /* @__PURE__ */ o(Ce.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(gt, { className: U }) })
              ]
            }
          ) : /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${E} ${w} border-b border-zinc-800 shrink-0 bg-zinc-950 ${Kt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                re || Bt(m);
              },
              onPointerMove: Ft,
              onPointerUp: Wt,
              onClick: Yt,
              children: [
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(Ce.Title, { className: `${v} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
                  h && /* @__PURE__ */ $("button", { onClick: h, className: `flex items-center gap-1 ${g} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${L} shrink-0`, children: [
                    /* @__PURE__ */ o(an, { className: N }),
                    "Reset"
                  ] }),
                  c && /* @__PURE__ */ o(Ce.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(gt, { className: T }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: p, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${d ? ` ${O} pb-4` : ""}`, children: s }),
          i && /* @__PURE__ */ o("div", { ref: y, className: d ? `${O} ${Y}` : "shrink-0", children: d ? /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-2", children: i }) : i })
        ]
      }
    )
  ] }) });
}
function Ro({ children: e }) {
  const t = ue();
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${t ? "px-6 py-3" : "px-5 py-2"} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const vr = "inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap", wr = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Ze({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  const l = ue(), i = xt({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ o(
    "button",
    {
      type: n,
      style: i,
      className: `${vr} ${l ? "" : "px-6 py-2"} ${wr[e]} ${t}`,
      ...r
    }
  );
}
function kr({ checked: e, onChange: t, disabled: n = !1, label: r, id: l, className: i = "", labelClassName: s = "", theme: h, variant: a = "pill", tone: d = "accent", block: c = !1 }) {
  const u = a !== "plain", f = ue(), x = f ? "w-5 h-5" : "w-4 h-4", p = f ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", y = f ? "w-3.5 h-3.5" : "w-3 h-3", E = f ? "text-sm" : "text-xs";
  return /* @__PURE__ */ $(
    "label",
    {
      className: `ui-checkbox ${u ? `ui-checkbox-pill ${f ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${d === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${i}`,
      style: { display: c ? "flex" : "inline-flex", alignItems: "center", gap: f ? 10 : 8 },
      onClick: (v) => v.stopPropagation(),
      ...h ? { "data-theme": h } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: l,
            checked: e,
            disabled: n,
            onChange: (v) => t(v.target.checked),
            className: "sr-only"
          }
        ),
        u ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ $("svg", { viewBox: "0 0 16 16", className: x, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: x, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${p}`, "aria-hidden": !0, children: e && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: y, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${E} ${s}`, children: r })
      ]
    }
  );
}
function $r(e = "md") {
  const t = le && dn() > 0;
  return e === "sm" ? `${t ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
const Nn = Ke(null);
function So() {
  const e = qe(Nn);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Do({ children: e }) {
  const [t, n] = B(null), [r, l] = B(!1), i = b(null), s = ue(), h = s ? "space-y-5" : "space-y-4", a = s ? "text-sm" : "text-xs", d = $r(), c = b(t);
  c.current = t;
  const u = j(() => {
    const v = c.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), f = j((v) => {
    if (v.suppressKey) {
      const T = localStorage.getItem(v.suppressKey);
      if (T && Date.now() < parseInt(T, 10))
        return Promise.resolve(!0);
    }
    return new Promise((T) => {
      u(), l(!1), n({ kind: "confirm", options: v, resolve: T });
    });
  }, [u]), x = j((v) => new Promise((T) => {
    u(), n({ kind: "prompt", options: v, resolve: T });
  }), [u]), p = j((v) => new Promise((T) => {
    u(), n({ kind: "alert", options: v, resolve: T });
  }), [u]);
  K(() => {
    if (t) {
      const v = setTimeout(() => {
        var T;
        return (T = i.current) == null ? void 0 : T.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [t]);
  const y = j(() => {
    var v, T;
    if (t) {
      if (t.kind === "confirm") {
        const H = t.options;
        H.suppressKey && r && localStorage.setItem(H.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((T = (v = i.current) == null ? void 0 : v.value) == null ? void 0 : T.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), E = t !== null;
  K(() => {
    if (!E) return;
    const v = (T) => {
      T.key !== "Enter" || T.shiftKey || T.metaKey || T.ctrlKey || T.altKey || T.isComposing || (T.preventDefault(), T.stopImmediatePropagation(), y());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [E, y]);
  const w = j(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ $(Nn.Provider, { value: { confirm: f, prompt: x, alert: p }, children: [
    e,
    E && /* @__PURE__ */ o(
      yr,
      {
        open: !0,
        onClose: w,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ $(Ee, { children: [
          t.kind !== "alert" && /* @__PURE__ */ o(Ze, { variant: "ghost", onClick: w, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ o(Ze, { onClick: y, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ o(
            Ze,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: y,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ o(Ze, { "data-modal-confirm": !0, onClick: y, children: "Save" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: h, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ o("p", { className: `${a} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ o(
            kr,
            {
              block: !0,
              checked: r,
              onChange: l,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (t == null ? void 0 : t.kind) === "prompt" && /* @__PURE__ */ o(
            "input",
            {
              ref: i,
              type: "text",
              defaultValue: t.options.defaultValue || "",
              placeholder: t.options.placeholder,
              className: `w-full ${d}`
            }
          )
        ] })
      }
    )
  ] });
}
const Nr = 500, Cr = 250, zr = 5, he = 88, nn = 4;
function Er(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const l = performance.now(), i = (s) => {
    const h = s - l, a = Math.min(h / t, 1);
    n.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(i);
  };
  requestAnimationFrame(i);
}
function Tr({ x: e, y: t, ms: n }) {
  const r = b(null), l = Ye();
  return K(() => {
    r.current && Er(r.current, n);
  }, [n]), Ct(
    /* @__PURE__ */ o(
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
          /* @__PURE__ */ o(
            "circle",
            {
              cx: he / 2,
              cy: he / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: nn + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: he / 2,
              cy: he / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: nn,
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
function Lo() {
  return { "data-no-longpress": "true" };
}
function Rr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Mo({
  children: e,
  showRing: t = !0,
  longPressMs: n = Nr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: l,
  onLongPress: i
}) {
  const [s, h] = B(null), a = un(), d = b(null), c = b(null), u = b({ x: 0, y: 0, target: null }), f = b(!1), x = Math.min(Cr, n * 0.5), p = b(l);
  p.current = l;
  const y = b(i);
  return y.current = i, K(() => {
    if (!le || !a) return;
    const E = (H) => {
      if (!yt(H.pointerType) || H.button !== 0) return;
      const U = H.target;
      if (!U.closest(r) || (p.current ? !p.current(U) : Rr(U))) return;
      const O = H.clientX, S = H.clientY;
      u.current = { x: O, y: S, target: H.target }, f.current = !0, t && (c.current = setTimeout(() => h({ x: O, y: S }), x)), d.current = setTimeout(() => {
        if (!f.current) return;
        c.current && (clearTimeout(c.current), c.current = null), h(null);
        const Y = u.current.target;
        if (!Y) return;
        const g = y.current;
        if (g) {
          g(Y, O, S);
          return;
        }
        const N = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: O,
          clientY: S,
          button: 2,
          view: window
        });
        Y.dispatchEvent(N);
      }, n);
    }, w = (H) => {
      if (!f.current || d.current === null) return;
      const U = H.clientX - u.current.x, O = H.clientY - u.current.y;
      Math.sqrt(U * U + O * O) > zr && (clearTimeout(d.current), d.current = null, c.current && (clearTimeout(c.current), c.current = null), f.current = !1, h(null));
    }, v = () => {
      d.current !== null && (clearTimeout(d.current), d.current = null), c.current !== null && (clearTimeout(c.current), c.current = null), f.current = !1, h(null);
    }, T = (H) => {
      yt(H.pointerType) && (d.current !== null && (clearTimeout(d.current), d.current = null), c.current !== null && (clearTimeout(c.current), c.current = null), f.current = !1, h(null));
    };
    return a == null || a.addEventListener("pointerdown", E), a.addEventListener("pointermove", w), a.addEventListener("pointerup", v), a.addEventListener("pointercancel", v), a.addEventListener("pointerleave", T), () => {
      a.removeEventListener("pointerdown", E), a.removeEventListener("pointermove", w), a.removeEventListener("pointerup", v), a == null || a.removeEventListener("pointercancel", v), a == null || a.removeEventListener("pointerleave", T), d.current !== null && clearTimeout(d.current), c.current !== null && clearTimeout(c.current);
    };
  }, [t, n, x, r]), /* @__PURE__ */ $(Ee, { children: [
    e,
    t && s && /* @__PURE__ */ o(Tr, { x: s.x, y: s.y, ms: n - x })
  ] });
}
function Ao() {
  const e = ar();
  return lr ? e === null || yt(e) : !1;
}
function Po({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: l = "button",
  ...i
}) {
  const s = ue(), h = xt({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), a = xt({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), d = s ? "" : "px-2.5 py-1 text-xs", c = s ? "" : "px-3 py-1 text-xs", u = `inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${s ? "gap-2" : "gap-1.5"}`, f = {
    light: {
      subtle: { base: `${d} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${c} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${d} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${d} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${c} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${d} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, x = `${c} bg-blue-950 hover:bg-blue-900 text-white`, p = "bg-blue-900!", y = i["data-state"] === "open", E = f[t][e], w = e === "primary" ? a : h;
  let v = `${E.base} ${y ? E.open : ""}`;
  return e === "primary" && t === "light" && n && (v = y ? `${x} ${p}` : x), /* @__PURE__ */ o("button", { type: l, className: `${u} ${v} ${r}`, style: w, ...i });
}
const Sr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Dr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], mt = 1900, pt = 2100;
function Lr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Mr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Io({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: l = "", initialView: i }) {
  const s = /* @__PURE__ */ new Date(), h = (() => {
    if (!i) return s;
    const z = /* @__PURE__ */ new Date(i + "T00:00:00");
    return isNaN(z.getTime()) ? s : z;
  })(), [a, d] = B(h.getFullYear()), [c, u] = B(h.getMonth()), [f, x] = B("days"), [p, y] = B(null), E = nt(() => new Set(e), [e]), w = (z) => {
    E.has(z) ? t(e.filter((_) => _ !== z)) : t([...e, z]);
  }, v = nt(() => {
    const z = Lr(a, c), _ = new Date(a, c, 1).getDay(), C = [];
    for (let D = 0; D < _; D++) C.push({ key: `pad-${D}`, day: 0, empty: !0 });
    for (let D = 1; D <= z; D++) C.push({ key: Mr(a, c, D), day: D, empty: !1 });
    return C;
  }, [a, c]), T = (z) => d((_) => Math.max(mt, Math.min(pt, _ + z))), H = (z) => {
    c + z < 0 ? (d((_) => Math.max(mt, _ - 1)), u(11)) : c + z > 11 ? (d((_) => Math.min(pt, _ + 1)), u(0)) : u((_) => _ + z);
  }, U = () => {
    if (p === null) return;
    const z = parseInt(p, 10);
    !isNaN(z) && z >= mt && z <= pt && d(z), y(null);
  }, O = (z) => e.some((_) => _.startsWith(`${a}-${String(z + 1).padStart(2, "0")}`)), S = n === "dark", Y = ue(), g = Y ? "p-2" : "p-1", N = Y ? "w-5 h-5" : "w-4 h-4", L = Y ? "text-[11px] py-2" : "text-[10px] py-1.5", k = Y ? "py-2.5 text-sm" : "py-1.5 text-xs", W = Y ? "py-3 text-sm" : "py-2 text-xs", q = Y ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", J = Y ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${S ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${S ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, ne = S ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", Q = S ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ $("div", { className: `border rounded-lg overflow-hidden w-full ${S ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${l}`, children: [
    /* @__PURE__ */ $("div", { className: `flex items-center justify-between px-3 py-2 border-b ${S ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? T(-1) : H(-1),
          className: `${g} rounded transition-colors ${S ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ o(On, { className: N })
        }
      ),
      f === "days" ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => x("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${S ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(a, c).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ o(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(a),
          onChange: (z) => y(z.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (z) => z.target.select(),
          onBlur: U,
          onKeyDown: (z) => {
            z.key === "Enter" && (z.preventDefault(), U()), z.key === "Escape" && y(null);
          },
          className: J
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => f === "months" ? T(1) : H(1),
          className: `${g} rounded transition-colors ${S ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": f === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ o(rt, { className: N })
        }
      )
    ] }),
    f === "months" ? /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 text-center", children: Dr.map((z, _) => /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: () => {
            u(_), x("days");
          },
          className: `${W} relative font-medium transition-colors border-b ${_ === c ? ne : Q} ${S ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            z,
            O(_) && /* @__PURE__ */ o("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${_ === c ? "bg-white" : S ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        z
      )) }),
      /* @__PURE__ */ o("div", { className: `text-center border-t ${S ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            d(s.getFullYear()), u(s.getMonth()), x("days");
          },
          className: `px-3 ${Y ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${S ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ $("div", { className: "grid grid-cols-7 text-center", children: [
      Sr.map((z) => /* @__PURE__ */ o("div", { className: `${L} font-semibold uppercase tracking-wider border-b ${S ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: z }, z)),
      v.map((z) => z.empty ? /* @__PURE__ */ o("div", {}, z.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => w(z.key),
          className: `${k} font-medium transition-colors border-b ${S ? "border-zinc-800/60" : "border-zinc-50"} ${E.has(z.key) ? ne : S ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: z.day
        },
        z.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ $("div", { className: `px-3 py-2 border-t ${S ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ $("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: e.map((z) => {
        const _ = /* @__PURE__ */ new Date(z + "T00:00:00"), C = _.getFullYear() === s.getFullYear() ? _.toLocaleString("default", { month: "short", day: "numeric" }) : _.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ $(
          "button",
          {
            type: "button",
            onClick: () => w(z),
            "aria-label": `Remove ${C}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${S ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${q}`,
            children: [
              C,
              /* @__PURE__ */ o("span", { className: `leading-none ${S ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          z
        );
      }) })
    ] })
  ] });
}
function Oo({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: l,
  allSelected: i = !1,
  toggleAllLabel: s,
  emptyHint: h = "Nothing here",
  maxHeight: a,
  disabled: d = !1,
  theme: c,
  className: u = ""
}) {
  const f = (w) => t instanceof Set ? t.has(w) : t.includes(w), x = ue(), p = x ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", y = x ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", E = r != null || l != null;
  return /* @__PURE__ */ $("div", { className: u, ...c ? { "data-theme": c } : {}, children: [
    E && /* @__PURE__ */ $("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      l != null && /* @__PURE__ */ o("button", { type: "button", disabled: d, onClick: l, className: "ui-checklist-toggleall", children: s ?? (i ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const v = f(w.id);
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(w.id),
                className: `ui-checklist-item ${p} ${v ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${y}`, "aria-hidden": !0, children: v && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  w.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: w.secondary })
                ]
              },
              w.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: h })
        ]
      }
    )
  ] });
}
function _o({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: l = "Nothing here",
  maxHeight: i,
  compact: s = !1,
  disabled: h = !1,
  theme: a,
  className: d = ""
}) {
  const c = ue(), u = s ? "px-2.5 py-1.5 text-xs" : c ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", f = s ? "w-3.5 h-3.5" : c ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ $("div", { className: d, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${h ? "ui-checklist-disabled" : ""}`,
        style: i ? { maxHeight: i, overflowY: "auto" } : void 0,
        children: [
          e.map((x) => {
            const p = t === x.id;
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: h,
                onClick: () => n(x.id),
                className: `ui-checklist-item ${u} ${p ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${f}`, "aria-hidden": !0, children: p && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  x.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: x.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: x.label }),
                  x.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: x.secondary })
                ]
              },
              x.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
const Ho = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: l = "visible",
  offset: i = 8
}) => {
  const s = Oe(), { refs: h, floatingStyles: a } = Kn({
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
          var v;
          if (l !== "visible") return {};
          const c = (v = d.elements.floating.ownerDocument) == null ? void 0 : v.defaultView;
          if (!c) return {};
          const u = d.rects.reference, f = Math.max(u.x, 0), x = Math.max(u.y, 0), p = Math.min(u.x + u.width, c.innerWidth), y = Math.min(u.y + u.height, c.innerHeight);
          if (p <= f || y <= x) return {};
          const E = r === "left" ? p - (u.x + u.width) : r === "right" ? f - u.x : 0, w = r === "top" ? x - u.y : r === "bottom" ? y - (u.y + u.height) : 0;
          return { x: d.x + E, y: d.y + w };
        }
      },
      Yn(i),
      Un({ padding: 8 }),
      jn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (d) => {
          var y;
          const c = (y = d.elements.floating.ownerDocument) == null ? void 0 : y.defaultView;
          if (!c) return {};
          const u = d.rects.floating.width, f = d.rects.floating.height, x = Math.max(8, Math.min(d.x, c.innerWidth - u - 8)), p = Math.max(8, Math.min(d.y, c.innerHeight - f - 8));
          return { x, y: p };
        }
      }
    ],
    whileElementsMounted: qn
  });
  return xe(() => {
    n && h.setReference(n);
  }, [n, h]), /* @__PURE__ */ $(Ee, { children: [
    !n && /* @__PURE__ */ o("div", { ref: h.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Ct(
      /* @__PURE__ */ o(
        "div",
        {
          ref: h.setFloating,
          className: `ui-chrome ${e}`,
          style: a,
          onMouseDown: (d) => d.stopPropagation(),
          onClick: (d) => d.stopPropagation(),
          onDragStart: (d) => d.preventDefault(),
          children: t
        }
      ),
      s.document.body
    )
  ] });
}, Be = ({ content: e, children: t }) => {
  const n = ue(), r = Ye(), l = Oe(), [i, s] = B(!1), [h, a] = B({ x: 0, y: 0 }), d = b(null), c = () => {
    if (!d.current) return;
    const u = d.current.getBoundingClientRect();
    a({ x: u.left + u.width / 2, y: u.top });
  };
  return K(() => (i && l && (c(), l.addEventListener("scroll", c, !0)), () => l == null ? void 0 : l.removeEventListener("scroll", c, !0)), [i]), /* @__PURE__ */ $(
    "div",
    {
      ref: d,
      className: "inline-flex",
      onMouseEnter: () => {
        c(), s(!0);
      },
      onMouseLeave: () => s(!1),
      children: [
        t,
        i && Ct(
          /* @__PURE__ */ $(
            "div",
            {
              className: `fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 ${n ? "px-3 py-1.5 bg-zinc-900 text-white text-xs" : "px-2.5 py-1.5 bg-zinc-900 text-white text-[10px]"}`,
              style: { left: h.x, top: h.y - (n ? 24 : 20), transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((u, f) => /* @__PURE__ */ o("div", { className: f > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: u }, f)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          r ?? document.body
        )
      ]
    }
  );
};
function _t() {
  const e = fn(), t = ze(28, 40, e), n = ze(28, 40, e), r = ze(10, 14, e), l = ze(10, 14, e), i = ze(8, 10, e);
  return le ? {
    toggle: { width: t, height: t },
    control: { height: n, padding: `0 ${r}px`, fontSize: l },
    input: { height: n, padding: `0 ${i}px`, fontSize: l }
  } : {};
}
const Bo = le ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", kt = le ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Je = le ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ar = "hover:bg-red-950/50", Cn = le ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", zn = "bg-blue-900/50 border-blue-700 text-blue-300", En = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Pr = le ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Fo = le ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", tt = le ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ir = "inline-flex rounded overflow-hidden border border-zinc-700", Tn = le ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Qe = ({ onClick: e, disabled: t, title: n, className: r = kt, children: l }) => /* @__PURE__ */ o(Be, { content: n, children: /* @__PURE__ */ o("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: l }) }), Wo = ({ value: e, options: t, onChange: n, disabled: r, active: l }) => /* @__PURE__ */ o("div", { className: Ir, children: t.map((i) => {
  const s = l ? l(i.v) : e === i.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(i.v),
      className: `${le ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${s ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${i.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: i.l
    },
    i.v
  );
}) }), Ko = ({ children: e }) => /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: le ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Or = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", _r = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", qo = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ $("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ o("span", { className: n ? Or : _r, children: e }),
  t
] }), Yo = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ $("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Uo = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: l }) => /* @__PURE__ */ $(Ee, { children: [
  /* @__PURE__ */ o(Qe, { onClick: () => r(-1), disabled: e, title: "Move up", className: Je, children: /* @__PURE__ */ o(_n, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Qe, { onClick: () => r(1), disabled: e, title: "Move down", className: Je, children: /* @__PURE__ */ o(Hn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Qe, { onClick: t, disabled: e, title: "Duplicate", className: Je, children: /* @__PURE__ */ o(ln, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o("div", { className: tt }),
  /* @__PURE__ */ o(Qe, { onClick: n, disabled: e, title: "Delete", className: `${Je} ${Ar}`, children: /* @__PURE__ */ o(bt, { className: "w-2.5 h-2.5" }) })
] }), Hr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Br = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Fr = /^(https?:\/\/|mailto:)/i;
function Wr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const l = n.slice(0, r).trim().toLowerCase(), i = n.slice(r + 1).trim();
    Br.has(l) && i && t.push(`${l}: ${i}`);
  }
  return t.join("; ");
}
function $t(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const h = document.createDocumentFragment();
    for (const a of Array.from(t.childNodes)) h.appendChild($t(a));
    return h;
  };
  if (!Hr.has(n)) return r();
  if (n === "a") {
    const h = t.getAttribute("href") || "";
    if (!Fr.test(h)) return r();
  }
  const l = document.createElement(n), i = t.getAttribute("style"), s = Wr(i || "");
  if (s && l.setAttribute("style", s), n === "a") {
    l.setAttribute("href", t.getAttribute("href"));
    const h = t.getAttribute("target"), a = t.getAttribute("rel");
    h && l.setAttribute("target", h), a && l.setAttribute("rel", a);
  }
  for (const h of Array.from(t.childNodes)) l.appendChild($t(h));
  return l;
}
function Rn(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Kr(e) {
  const t = Rn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const s of Array.from(n.content.childNodes)) r.appendChild($t(s));
  const l = document.createElement("div");
  return l.appendChild(r), l.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function jo(e) {
  const t = Rn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Vo(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const qr = { text: "#52525b" }, Yr = ({ node: e, selected: t, extension: n, editor: r, view: l, getPos: i }) => {
  var u;
  const s = e.attrs.field ?? "", h = n.options, a = ((u = h.resolve) == null ? void 0 : u.call(h, s)) ?? null, d = (a == null ? void 0 : a.color) ?? qr, c = (a == null ? void 0 : a.label) ?? `{{${s}}}`;
  return /* @__PURE__ */ o(
    Gn,
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
      onMouseDown: (f) => {
        var E;
        if (f.button !== 0 || !r.isEditable) return;
        f.preventDefault(), r.isFocused || r.commands.focus();
        const x = typeof i == "function" ? i() : null;
        if (x == null) return;
        const p = l.state.doc.resolve(x), y = p.nodeAfter;
        y && ot.isSelectable(y) && l.dispatch(l.state.tr.setSelection(new ot(p))), (E = h.onTokenClick) == null || E.call(h, s, f.currentTarget.getBoundingClientRect(), x);
      },
      children: c
    }
  );
};
function Ur(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function rn(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const jr = ir.extend({
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
    return Xn(Yr);
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
    return ["span", Vn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Vr = 240, Xr = 280, Gr = ({ props: e, onApi: t }) => {
  const n = ct(), r = b(t);
  r.current = t, K(() => {
    r.current(n);
  }, [n]);
  const l = b(null);
  K(() => {
    var s, h;
    (h = (s = l.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || h.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex]), K(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const i = Lt();
  return /* @__PURE__ */ o(je.Provider, { value: n, children: /* @__PURE__ */ o(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Xr, maxHeight: Vr },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ o("div", { ref: l, children: e.items.map((s) => /* @__PURE__ */ o(
        Zr,
        {
          item: s,
          d: i,
          command: () => e.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, Zr = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: l, setPointer: i } = wn({
    label: () => e.label,
    activate: n
  });
  return /* @__PURE__ */ $(
    "div",
    {
      role: "option",
      className: `w-full text-left ${t.itemPad} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${t.itemDefault} ${l ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => i(r),
      onClick: n,
      children: [
        /* @__PURE__ */ o("span", { className: `${t.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ o("span", { className: "block w-2 h-2 rounded-full", style: { background: e.color.text } }) }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: e.label }),
        e.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: e.color.text }, children: e.group })
      ]
    }
  );
}, Jr = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ o(Gr, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const l = sr(r);
      e = { holder: r, root: l, unmount: null, props: n, api: null };
      const i = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: s, y: h, placement: a, strategy: d }) => {
          var f, x;
          if (!e) return;
          const c = (x = (f = e.props) == null ? void 0 : f.clientRect) == null ? void 0 : x.call(f), u = c && !a.endsWith("-end") ? c.width : 0;
          r.style.position = d, r.style.left = `${s + u}px`, r.style.top = `${h}px`;
        }
      });
      e.unmount = i, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      if (!(e != null && e.props) || !e.api) return !1;
      const { items: r, command: l } = e.props;
      if (r.length === 0) return !1;
      const i = e.api, s = n.key;
      if (s === "ArrowDown" || s === "ArrowUp") {
        n.preventDefault();
        const h = i.highlightedIndex, a = s === "ArrowDown" ? 1 : -1;
        return i.setHighlighted((h + a + r.length) % r.length, "keyboard"), !0;
      }
      if (s === "Enter" || s === "Tab") {
        n.preventDefault();
        const h = i.highlightedIndex, a = h >= 0 ? h : 0, d = i.items[a];
        return d ? d.activate() : r[a] && l({ field: r[a].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Xo = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Qr = De.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: l,
  onStateChange: i,
  resolveToken: s,
  suggestionItems: h,
  onTokenClick: a,
  onSelectionChange: d
}, c) => {
  const u = b(s);
  u.current = s;
  const f = b(h);
  f.current = h;
  const x = b(a);
  x.current = a;
  const p = b(d);
  p.current = d;
  const y = b(null), E = b(null), w = b(t);
  w.current = t;
  const v = b(r);
  v.current = r;
  const T = b(i);
  T.current = i;
  const H = b(null), U = (N) => {
    var W;
    const L = {
      bold: N.isActive("bold"),
      italic: N.isActive("italic"),
      underline: N.isActive("underline"),
      strike: N.isActive("strike"),
      link: N.isActive("link"),
      color: N.getAttributes("textStyle").color || ""
    }, k = H.current;
    k && k.bold === L.bold && k.italic === L.italic && k.underline === L.underline && k.strike === L.strike && k.link === L.link && k.color === L.color || (H.current = L, (W = T.current) == null || W.call(T, L));
  }, O = (N) => {
    var J;
    const L = N.state.selection;
    let k = null;
    L instanceof ot && L.node.type.name === "token" ? (k = { key: L.node.attrs.field ?? "", pos: L.from }, y.current = L.from) : y.current != null && (y.current = N.state.tr.mapping.map(y.current));
    const W = E.current, q = W && k && W.key === k.key && W.pos === k.pos;
    !W && !k || q || (E.current = k, (J = p.current) == null || J.call(p, k));
  }, S = (N) => {
    const L = Kr(Ur(N));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(L) ? "" : L;
  }, Y = De.useMemo(() => {
    const N = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: L }) => {
        var k;
        return ((k = f.current) == null ? void 0 : k.call(f, L)) ?? [];
      },
      command: ({ editor: L, range: k, props: W }) => {
        L.chain().focus().insertContentAt(k, { type: "token", attrs: { field: W.field } }).run();
      },
      render: Jr
    };
    return jr.configure({
      resolve: u.current ?? null,
      suggestion: N,
      onTokenClick: (L, k, W) => {
        var q;
        y.current = W, (q = x.current) == null || q.call(x, L, k, W);
      }
    });
  }, []), g = Zn({
    immediatelyRender: !1,
    extensions: [
      Qn,
      er.configure({ placeholder: n }),
      tr,
      nr,
      or,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      rr.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      Y
    ],
    content: rn(e || ""),
    editable: !r,
    onUpdate: ({ editor: N }) => {
      w.current(S(N.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: N }) => {
      U(N), O(N);
    }
  });
  return K(() => {
    if (!g || g.isFocused) return;
    S(g.getHTML()) !== e && (H.current = null, g.commands.setContent(rn(e || ""), { emitUpdate: !1 }), U(g));
  }, [e, g]), K(() => {
    g && g.setEditable(!r);
  }, [r, g]), K(() => {
    g && (H.current = null, U(g), O(g));
  }, [g]), An(c, () => ({
    exec: (N, L) => {
      if (!(!g || v.current))
        switch (N) {
          case "bold":
            g.chain().focus().toggleBold().run();
            break;
          case "italic":
            g.chain().focus().toggleItalic().run();
            break;
          case "underline":
            g.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            g.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            L && g.chain().focus().setColor(L).run();
            break;
          case "unsetColor":
            g.chain().focus().unsetColor().run();
            break;
          case "link":
            L && g.chain().focus().extendMarkRange("link").setLink({ href: L }).run();
            break;
          case "unlink":
            g.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => g == null ? void 0 : g.commands.focus(),
    insertToken: (N) => {
      !g || v.current || g.chain().focus().insertContent({ type: "token", attrs: { field: N } }).run();
    },
    replaceToken: (N) => {
      if (!g || v.current) return;
      const L = y.current;
      L != null && g.commands.command(({ tr: k }) => {
        const W = k.doc.nodeAt(L);
        if (!W || W.type.name !== "token") return !1;
        k.setNodeMarkup(L, void 0, { field: N });
        const q = k.doc.resolve(L);
        return q.nodeAfter && q.nodeAfter.type.name === "token" && k.setSelection(new ot(q)), !0;
      });
    }
  }), [g]), /* @__PURE__ */ o(Jn, { editor: g, className: `richtext-editor ${l || ""}` });
});
Qr.displayName = "RichTextEditor";
const eo = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], to = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], on = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Go = ({ value: e, disabled: t, onChange: n }) => {
  const [r, l] = B(!1), i = _t();
  return /* @__PURE__ */ o(
    lt,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, style: i.control, className: `${Tn} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ o(Nt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: eo.map((s) => /* @__PURE__ */ o(gr, { onClick: () => {
        n(s), l(!1);
      }, icon: s === e ? /* @__PURE__ */ o(cn, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, no = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, l] = B(!1), i = _t(), [s, h] = B(""), a = () => {
    var c;
    const d = s.trim();
    d && ((c = e.current) == null || c.exec("link", d), l(!1));
  };
  return /* @__PURE__ */ o(
    lt,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (d) => d.preventDefault(),
          style: i.toggle,
          className: `${Cn} ${n ? zn : En}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(Wn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ $("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ o(
          "input",
          {
            value: s,
            onChange: (d) => h(d.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (d) => {
              d.key === "Enter" && (d.preventDefault(), a());
            },
            style: i.input,
            className: Pr + " w-full"
          }
        ),
        /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: a, style: i.control, className: kt, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                var d;
                (d = e.current) == null || d.exec("unlink"), l(!1);
              },
              style: i.control,
              className: kt,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Zo = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: l }) => {
  const [i, s] = B(!1), h = (u, f) => {
    var x;
    return (x = e.current) == null ? void 0 : x.exec(u, f);
  }, a = _t(), d = (u) => `${Cn} ${u ? zn : En}`, c = (u) => !!(r != null && r[u]);
  return /* @__PURE__ */ $("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o(Be, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: t || c("bold"), onMouseDown: (u) => u.preventDefault(), onClick: () => h("bold"), style: a.toggle, className: `${d(((n == null ? void 0 : n.bold) ?? !1) || c("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o(Be, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: t || c("italic"), onMouseDown: (u) => u.preventDefault(), onClick: () => h("italic"), style: a.toggle, className: `${d(((n == null ? void 0 : n.italic) ?? !1) || c("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o(Be, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: t, onMouseDown: (u) => u.preventDefault(), onClick: () => h("underline"), style: a.toggle, className: d((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Bn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o(Be, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (u) => u.preventDefault(), onClick: () => h("strikeThrough"), style: a.toggle, className: d((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(Fn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: tt }),
    /* @__PURE__ */ o(no, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: tt }),
    /* @__PURE__ */ o(
      lt,
      {
        open: i,
        onOpenChange: s,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, style: a.control, className: `${Tn} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(on, {}),
          /* @__PURE__ */ o(Nt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                h("unsetColor"), s(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(on, { className: "w-3.5 h-3.5" })
            }
          ),
          to.map((u) => /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                h("foreColor", u), s(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${u === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: u },
              title: u
            },
            u
          ))
        ] })
      }
    ),
    l && /* @__PURE__ */ $(Ee, { children: [
      /* @__PURE__ */ o("div", { className: tt }),
      l
    ] })
  ] });
};
function Jo({ title: e, icon: t, count: n, tone: r = "default", collapsed: l, onToggle: i, trailing: s, bodyClass: h, className: a = "", dataProps: d, children: c }) {
  const u = ue(), f = u ? "px-3.5 py-3" : "px-3 py-2", x = u ? "text-sm" : "text-xs", p = u ? "w-4 h-4" : "w-3.5 h-3.5", y = u ? "text-xs" : "text-[10px]";
  return /* @__PURE__ */ $("div", { ...d, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ $("div", { className: `flex flex-wrap items-center gap-x-2 gap-y-1 ${f} hover:bg-white/5 transition-colors`, children: [
      /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: i,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            l ? /* @__PURE__ */ o(rt, { className: `${p} text-zinc-400 shrink-0` }) : /* @__PURE__ */ o(Nt, { className: `${p} text-zinc-400 shrink-0` }),
            t,
            /* @__PURE__ */ o("span", { className: `font-semibold text-zinc-200 truncate ${x}`, children: e }),
            n && /* @__PURE__ */ o("span", { className: `text-zinc-500 shrink-0 ${y}`, children: n })
          ]
        }
      ),
      s && /* @__PURE__ */ o("div", { className: "shrink-0", children: s })
    ] }),
    !l && c && /* @__PURE__ */ o("div", { className: h || "ui-card-band border-t p-1.5 space-y-1", children: c })
  ] });
}
export {
  Po as Button,
  Jo as CardSection,
  kr as Checkbox,
  Oo as Checklist,
  Yo as ChromeHeader,
  qo as ContentRow,
  Co as ContextMenu,
  Eo as ContextMenuDivider,
  zo as ContextMenuItem,
  To as ContextMenuSub,
  Io as DatePicker,
  Do as DialogProvider,
  gr as DropdownItem,
  lt as DropdownMenu,
  br as DropdownSubmenu,
  Dt as DropdownThemeContext,
  eo as FONTS,
  Ho as FloatingChrome,
  Go as FontMenu,
  Zo as FormatToolbar,
  le as IS_COARSE,
  lr as IS_TOUCH_CAPABLE,
  No as ItemManagerDropdown,
  Mo as LongPressMenuProvider,
  Et as MORPH_EASE,
  Ie as MORPH_MS,
  Tt as MORPH_OPACITY_MS,
  je as MenuHighlightContext,
  yr as Modal,
  Ro as ModalFooter,
  Ze as ModalFooterButton,
  cr as PopoutWindowContext,
  Xo as RICH_TEXT_STATE_IDLE,
  _o as RadioList,
  Qr as RichTextEditor,
  Ko as SectionHeader,
  Wo as Seg,
  Uo as StructureControls,
  Mt as SubmenuContext,
  kt as TB_BTN,
  Je as TB_BTN_ICON,
  Ar as TB_DANGER,
  tt as TB_DIVIDER,
  Pr as TB_INPUT,
  Fo as TB_NUM,
  Tn as TB_PICKER,
  Bo as TB_ROW_LABEL,
  Ir as TB_SEG,
  Cn as TB_TOGGLE,
  En as TB_TOGGLE_OFF,
  zn as TB_TOGGLE_ON,
  jr as Token,
  Yr as TokenChipView,
  Qe as ToolButton,
  Be as Tooltip,
  Rt as ZOOM_FROM,
  fr as cloneOverlayClose,
  ze as coarsePx,
  Vo as escapeHtml,
  dn as getCoarseScale,
  Lt as getDropdownClasses,
  wo as getHardwareKeyboard,
  vo as getLastPointerType,
  $r as inputCls,
  Rr as isInteractiveElement,
  yt as isTouchLike,
  pn as nearestOverlayOrigin,
  Rn as normalizeSpaces,
  dt as overlayMorphEnabled,
  dr as playOverlayClose,
  ur as playOverlayOpen,
  rn as preprocessTokenHtml,
  Kr as sanitizeRichText,
  yo as setCoarseScale,
  jo as stripRichText,
  Ur as stripTokenWrappers,
  ue as useCoarse,
  fn as useCoarseScale,
  xt as useCoarseSize,
  un as useCurrentDocument,
  Oe as useCurrentWindow,
  So as useDialog,
  yn as useDropdownTheme,
  hr as useFixedPosition,
  ko as useHardwareKeyboard,
  ar as useLastPointerType,
  Lo as useLongPressOptOut,
  At as useMenuHighlight,
  St as useOverlayMorph,
  zt as usePopoutWindow,
  Ye as usePortalTarget,
  $o as useSmartPosition,
  Ao as useTouchMode
};
