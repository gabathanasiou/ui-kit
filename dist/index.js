"use client";
import { jsxs as N, jsx as o, Fragment as me } from "react/jsx-runtime";
import be, { createContext as ze, useContext as Ee, useState as W, useEffect as U, useRef as x, useCallback as Z, useLayoutEffect as le, useMemo as Oe, useImperativeHandle as Ut } from "react";
import * as V from "@radix-ui/react-dropdown-menu";
import { Check as $t, X as je, Pencil as jt, Copy as Ct, Trash2 as Ve, RotateCcw as zt, Plus as Vt, ChevronRight as Xe, ChevronLeft as Xt, ArrowUp as Gt, ArrowDown as Zt, ChevronDown as Et, Underline as Jt, Strikethrough as Qt, Link as en } from "lucide-react";
import * as he from "@radix-ui/react-dialog";
import { createPortal as tt } from "react-dom";
import { useFloating as tn, autoUpdate as nn, offset as rn, flip as on, shift as sn } from "@floating-ui/react-dom";
import { mergeAttributes as cn, ReactNodeViewRenderer as ln, NodeViewWrapper as an, useEditor as un, EditorContent as dn } from "@tiptap/react";
import { NodeSelection as Ie } from "@tiptap/pm/state";
import fn from "@tiptap/starter-kit";
import hn from "@tiptap/extension-placeholder";
import { TextStyle as mn } from "@tiptap/extension-text-style";
import pn from "@tiptap/extension-color";
import gn from "@tiptap/extension-link";
import bn from "@tiptap/extension-underline";
import { Mention as xn } from "@tiptap/extension-mention";
import { createRoot as yn } from "react-dom/client";
const vn = ze(null);
function nt() {
  return Ee(vn);
}
function Te() {
  const e = nt();
  return e ? e.document.body : null;
}
function wn() {
  const e = nt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function we() {
  return nt() ?? (typeof window < "u" ? window : null);
}
const Re = typeof window < "u", E = Re && window.matchMedia("(pointer: coarse)").matches, kn = Re && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ge(e) {
  return e === "touch" || e === "pen";
}
let ye = null;
const Ze = /* @__PURE__ */ new Set();
Re && window.addEventListener("pointerdown", (e) => {
  ye = e.pointerType, Ze.forEach((t) => t());
}, !0);
function Qr() {
  return ye;
}
function Nn() {
  const [, e] = W(0), t = x(ye);
  return U(() => {
    const n = () => {
      t.current !== ye && (t.current = ye, e((r) => r + 1));
    };
    return Ze.add(n), () => {
      Ze.delete(n);
    };
  }, []), ye;
}
const Tt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Rt() {
  return Re ? Tt.some((e) => window.matchMedia(e).matches) : !1;
}
let _e = Rt();
const Je = /* @__PURE__ */ new Set();
function pt(e) {
  _e !== e && (_e = e, Je.forEach((t) => t()));
}
var Nt;
if (Re) {
  const e = () => pt(Rt());
  for (const a of Tt) {
    const f = window.matchMedia(a);
    (Nt = f.addEventListener) == null || Nt.call(f, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (a) => {
    a.isComposing || a.keyCode !== 229 && (a.key === "Enter" || a.key === "Backspace" || a.key === "Process" || a.key === "Unidentified" || pt(!0));
  });
  let n = null, r = null;
  const c = "__penClick", i = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (a) => {
    a.pointerType !== "pen" || a.button !== 0 || (n = { x: a.clientX, y: a.clientY });
  }, !0), window.addEventListener("pointerup", (a) => {
    if (a.pointerType !== "pen") return;
    const f = n;
    if (n = null, !f || Math.hypot(a.clientX - f.x, a.clientY - f.y) > 8) return;
    const l = a.target;
    if (!l || !l.isConnected) return;
    if (l instanceof HTMLInputElement && i.has(l.type)) {
      try {
        l.showPicker();
      } catch {
      }
      return;
    }
    const h = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    h[c] = !0, r = { x: a.clientX, y: a.clientY, time: Date.now() }, l.dispatchEvent(h);
  }, !0), window.addEventListener("click", (a) => {
    a[c] || r && Date.now() - r.time < 1e3 && Math.hypot(a.clientX - r.x, a.clientY - r.y) < 12 && (a.preventDefault(), a.stopPropagation());
  }, !0);
}
function eo() {
  return _e;
}
function to() {
  const [, e] = W(0);
  return U(() => {
    const t = () => e((n) => n + 1);
    return Je.add(t), () => {
      Je.delete(t);
    };
  }, []), _e;
}
const ve = 220, rt = "cubic-bezier(0.32, 0.72, 0, 1)", ot = 170, it = 0.94;
function Fe(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function St(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function Lt(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return St({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function $n(e, t, n, r) {
  const c = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${it})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === c && requestAnimationFrame(() => {
      if (e.current !== c) return;
      const a = Lt(t, n);
      t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transition = `transform ${ve}ms ${rt}, opacity ${ot}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === c && (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, r == null || r());
      }, ve + 60);
    });
  });
}
function Cn(e, t, n, r) {
  const c = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, a = Lt(t, n);
  t.style.transition = `transform ${ve}ms ${rt}, opacity ${ot}ms ease`, t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transform = `scale(${it})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === c && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== c || t.isConnected || (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, t.style.pointerEvents = i.pointerEvents, t.style.visibility = i.visibility);
    }));
  }, ve + 60);
}
function zn(e, t, n) {
  const r = e.cloneNode(!0), c = e.getBoundingClientRect(), i = c.width > 0 || c.height > 0 ? c : n ?? c;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${i.left}px`, r.style.top = `${i.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const a = (t == null ? void 0 : t()) ?? null, f = a ? St({ left: i.left, top: i.top, width: i.width, height: i.height }, a) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${f.x * 100}% ${f.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${ve}ms ${rt}, opacity ${ot}ms ease`, r.style.transform = `scale(${it})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, ve + 60));
    });
  });
}
function st(e) {
  const t = x(null), [n, r] = W(!1), c = x(null), i = x(0), a = Z((p) => {
    if (e.ref && (e.ref.current = p), p) {
      i.current = 0, t.current = p;
      const L = p.getBoundingClientRect();
      (L.width > 0 || L.height > 0) && (c.current = { left: L.left, top: L.top, width: L.width, height: L.height }), r(!0);
      return;
    }
    const y = t.current, v = ++i.current;
    queueMicrotask(() => {
      v === i.current && t.current === y && (t.current = null, r(!1), !(!y || !e.cloneOnUnmount || !l.current) && y.style.visibility !== "hidden" && Fe(u.current) && zn(y, s.current, c.current));
    });
  }, []), f = Z(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const y = p.getBoundingClientRect();
    (y.width > 0 || y.height > 0) && (c.current = { left: y.left, top: y.top, width: y.width, height: y.height });
  }, []), l = x(e.visible);
  l.current = e.visible;
  const h = x(e.visible), s = x(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const d = x(e.onClosed);
  d.current = e.onClosed;
  const u = x(e.morph !== !1);
  u.current = e.morph !== !1;
  const b = x(0);
  return le(() => {
    if (!n || !l.current || !Fe(u.current)) return;
    const p = t.current;
    p && $n(b, p, s.current);
  }, [n, e.visible]), U(() => {
    if (!n || !l.current) return;
    let p = 0;
    const y = () => {
      p = 0, f(), p = requestAnimationFrame(y);
    };
    return p = requestAnimationFrame(y), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, f]), le(() => {
    var v;
    const p = h.current;
    if (h.current = e.visible, e.visible || !p) return;
    const y = t.current;
    if (!y || !Fe(u.current)) {
      (v = d.current) == null || v.call(d);
      return;
    }
    Cn(b, y, s.current, () => {
      var L;
      return (L = d.current) == null ? void 0 : L.call(d);
    });
  }, [e.visible]), U(() => {
    if (!n || !l.current) return;
    const p = (y) => {
      const v = t.current;
      v && v.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), U(() => {
    if (!n || !l.current) return;
    const p = (y) => {
      const v = t.current;
      v && v.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), a;
}
function Dt(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function no(e, t) {
  const n = we(), r = x(n);
  r.current = n;
  const c = () => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const a = r.current;
    if (!a) return;
    const f = e.current.getBoundingClientRect(), l = i.getBoundingClientRect(), h = a.innerWidth, s = Dt(a), d = l.right - h;
    if (d > 0) {
      const u = Math.min(d + 8, l.left);
      i.style.left = `${l.left - f.left - u}px`;
    }
    l.left < 0 && (i.style.left = `${-f.left + 4}px`), l.bottom > s.bottom + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < s.top && (i.style.bottom = "auto", i.style.top = `${-f.top + s.top + 4}px`, i.style.maxHeight = `${s.height - 8}px`));
  };
  le(() => {
    if (c(), !t) return;
    const i = r.current, a = (i == null ? void 0 : i.visualViewport) ?? null;
    return a == null || a.addEventListener("resize", c), a == null || a.addEventListener("scroll", c), i == null || i.addEventListener("resize", c), () => {
      a == null || a.removeEventListener("resize", c), a == null || a.removeEventListener("scroll", c), i == null || i.removeEventListener("resize", c);
    };
  }, [t, e]);
}
function En(e, t, n, r) {
  const c = we(), i = x(c);
  i.current = c, le(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let f = 0;
    const l = () => {
      f = 0;
      const b = a.getBoundingClientRect(), p = i.current;
      if (!p) return;
      const y = p.innerWidth, v = Dt(p), L = (r == null ? void 0 : r.panelWidth) ?? Math.max(b.width, 200), B = 4, M = 120;
      let I = Math.max(0, b.left);
      I + L > y && (I = Math.max(0, y - L - 8));
      const O = v.bottom - b.bottom - B - 16, _ = b.top - v.top - B - 16;
      if (O >= M || O >= _) {
        const T = Math.min(b.bottom + B, v.bottom), q = Math.max(M, v.bottom - T - 16);
        n({ top: T, left: I, width: b.width, maxH: q });
      } else {
        const T = Math.max(M, Math.min(_, 360)), q = v.bottom - (b.top - B);
        n({ top: 0, left: I, width: b.width, maxH: T, bottom: Math.max(0, q) });
      }
    }, h = () => {
      f || (f = requestAnimationFrame(l));
    }, s = i.current ?? null, d = (s == null ? void 0 : s.document) ?? null;
    h(), d == null || d.addEventListener("scroll", h, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", h);
    const u = (s == null ? void 0 : s.visualViewport) ?? null;
    return u == null || u.addEventListener("resize", h), u == null || u.addEventListener("scroll", h), () => {
      f && cancelAnimationFrame(f), d == null || d.removeEventListener("scroll", h, { capture: !0 }), s == null || s.removeEventListener("resize", h), u == null || u.removeEventListener("resize", h), u == null || u.removeEventListener("scroll", h);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let xe = null;
function Mt(e) {
  return xe == null || xe(), xe = e, () => {
    xe === e && (xe = null);
  };
}
const ct = ze("dark"), At = () => Ee(ct), Tn = E ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", gt = E ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Rn = E ? "text-xs" : "text-[10px]";
function Pt(e) {
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
    headerPad: gt,
    headerText: `${gt} font-semibold uppercase tracking-wider ${Rn} ui-label`,
    // Item padding
    itemPad: Tn,
    // Input
    input: E ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: E ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
function Ot(e) {
  const t = [];
  return be.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (be.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const lt = ze({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), He = ze(null), at = () => Ee(He);
function ut() {
  const e = x([]), [t, n] = W(-1), [r, c] = W(!1), [i, a] = W(0), f = Z((d) => (e.current = [...e.current, d], a((u) => u + 1), () => {
    e.current = e.current.filter((u) => u !== d), a((u) => u + 1);
  }), []), l = Z((d, u) => {
    n(d), c(u === "pointer");
  }, []), h = Z(() => {
    c((d) => d && (n(-1), !1));
  }, []);
  return Oe(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: f,
    setHighlighted: l,
    pointerLeave: h
  }), [t, r, i, f, l, h]);
}
function dt(e, t, n, r) {
  const c = x(-1);
  c.current = t.highlightedIndex;
  const i = x(t);
  i.current = t;
  const a = x(e);
  a.current = e;
  const f = x(r);
  f.current = r;
  const l = x({ text: "", time: 0 }), h = x(!1);
  h.current || (h.current = !0, n.current = (s) => {
    var u, b;
    if (!a.current) return;
    const d = i.current.items;
    if (d.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = s.key === "ArrowDown" ? 1 : -1, y = (c.current + p + d.length) % d.length;
        i.current.setHighlighted(y, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = c.current;
        p >= 0 && p < d.length && d[p].submenu && d[p].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (b = (u = f.current) == null ? void 0 : u.onCloseSub) == null || b.call(u);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = c.current;
        p >= 0 && p < d.length && d[p].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = Date.now(), y = (p - l.current.time > 500 ? "" : l.current.text) + s.key.toLowerCase();
        if (l.current = { text: y, time: p }, !y) return;
        const v = c.current + 1;
        for (let L = 0; L < d.length; L++) {
          const B = (v + L) % d.length;
          if (d[B].label.toLowerCase().startsWith(y)) {
            i.current.setHighlighted(B, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ft(e, t, n, r, c, i) {
  const a = x(t);
  a.current = t;
  const f = x(e);
  f.current = e;
  const l = x(c);
  l.current = c;
  const h = x(!1);
  h.current || (h.current = !0, i.current = (s) => {
    if (!f.current || l.current) return;
    const d = r.current;
    d && d.contains(s.target) || a.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function ht(e, t) {
  const n = x(e);
  n.current = e;
  const r = x(!1);
  r.current || (r.current = !0, t.current = (c) => {
    if (!n.current) return;
    const i = c.currentTarget;
    i.scrollHeight > i.clientHeight && (c.preventDefault(), i.scrollTop += c.deltaY);
  });
}
function Be({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: c = "left",
  width: i,
  theme: a = "dark",
  children: f,
  morph: l = !0,
  contentClassName: h,
  initialHighlightIndex: s
}) {
  const [d, u] = W([]), [b, p] = W(null), y = Te(), v = x(null), L = x(null), B = x(e);
  B.current = e;
  const [M, I] = W(e), O = ut();
  U(() => {
    if (e)
      return I(!0), O.setHighlighted(s ?? -1, "keyboard"), Mt(() => {
        n == null || n(!1), t == null || t();
      });
    u([]);
  }, [e, s, n, t]);
  const _ = Z(() => {
    const F = v.current;
    if (!F) return null;
    const ne = F.getBoundingClientRect();
    return { left: ne.left, top: ne.top, width: ne.width, height: ne.height };
  }, []), T = st({
    visible: e,
    morph: l,
    anchor: _,
    onClosed: () => I(!1)
  }), q = x(() => {
  }), m = x(() => {
  }), w = x(() => {
  });
  dt(e && d.length === 0, O, q), ht(e, m), ft(e, O, q, L, d.length > 0, w);
  const z = x(null), S = Z((F) => {
    var ne;
    if (F) {
      F.addEventListener("keydown", q.current, { capture: !0 }), F.addEventListener("wheel", m.current, { passive: !1 });
      const g = F.ownerDocument;
      z.current = g, g.addEventListener("keydown", w.current, { capture: !0 }), C(F.offsetWidth), H(!0);
    } else
      (ne = z.current) == null || ne.removeEventListener("keydown", w.current, { capture: !0 }), z.current = null, H(!1);
    L.current = F, T(F);
  }, [T]), [A, G] = W({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [Q, oe] = W(0), [$, H] = W(!1), [ee, C] = W(0);
  U(() => {
    e && v.current && oe(v.current.getBoundingClientRect().width);
  }, [e]);
  const K = Oe(() => ({ panelWidth: ee || Q || void 0 }), [ee, Q]);
  En(v, e && $, (F) => G({ ...F, maxH: Math.min(F.maxH, 384), ready: !0 }), K), U(() => {
    if (A.ready && e) {
      const F = L.current;
      F && F.ownerDocument.activeElement !== F && !F.contains(F.ownerDocument.activeElement) && F.focus();
    }
  }, [A.ready, e]), le(() => {
    var ne;
    if (!e || O.highlightedIndex < 0) return;
    const F = (ne = L.current) == null ? void 0 : ne.querySelector(`[data-ei="${O.highlightedIndex}"]`);
    F == null || F.scrollIntoView({ block: "nearest" });
  }, [e, O.highlightedIndex]);
  const P = Z((F) => {
    !F && !B.current || (!F && J.current && (ce.current = !0), n ? n(F) : F || t == null || t());
  }, [n, t]), k = x(M);
  k.current = M;
  const J = x(!1), ce = x(!1), pe = Z(() => {
    if (!B.current && k.current) {
      if (ce.current) {
        ce.current = !1, J.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), de = be.isValidElement(r) ? r : null, ae = de ? be.cloneElement(de, {
    ref: (F) => {
      v.current = F;
    },
    onPointerDown: () => {
      J.current = !0, ce.current = !1;
    },
    onClick: (F) => {
      var ne, g;
      (g = (ne = de.props).onClick) == null || g.call(ne, F), pe();
    }
  }) : r;
  return /* @__PURE__ */ N(V.Root, { open: e || M, onOpenChange: P, modal: !1, children: [
    /* @__PURE__ */ o(V.Trigger, { asChild: !0, children: ae }),
    /* @__PURE__ */ o(V.Portal, { container: y ?? void 0, children: /* @__PURE__ */ o(ct.Provider, { value: a, children: /* @__PURE__ */ o(lt.Provider, { value: { chain: d, setChain: u, morph: l, keyboardOpened: b, setKeyboardOpened: p }, children: /* @__PURE__ */ o(He.Provider, { value: O, children: /* @__PURE__ */ o(
      V.Content,
      {
        ref: S,
        "data-theme": a,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${i || ""} ${h || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: A.left,
          top: A.bottom != null ? void 0 : A.top,
          bottom: A.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: i ? void 0 : Q || void 0,
          maxHeight: A.maxH,
          visibility: A.ready ? "visible" : "hidden"
        },
        onPointerLeave: O.pointerLeave,
        children: f
      }
    ) }) }) }) })
  ] });
}
function ro({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: c,
  onRename: i,
  onDuplicate: a,
  onDelete: f,
  onCreate: l,
  onImport: h,
  onExport: s,
  onReset: d,
  onTrash: u,
  closeOnSelect: b,
  readOnly: p = !1,
  theme: y,
  align: v,
  label: L,
  header: B,
  itemLabel: M,
  trigger: I,
  minItems: O = 1,
  itemRender: _,
  morph: T = !0,
  contentClassName: q
}) {
  const m = Pt(), [w, z] = W(null), [S, A] = W(""), G = x(null), Q = x(null);
  U(() => {
    e && requestAnimationFrame(() => {
      var C, K;
      (K = (C = Q.current) == null ? void 0 : C.querySelector('[data-active="1"]')) == null || K.scrollIntoView({ block: "nearest" });
    });
  }, [e]), U(() => {
    var P;
    if (!e) return;
    const C = (k) => {
      var ge, F, ne, g, D;
      if ((F = (ge = k.target) == null ? void 0 : ge.closest) != null && F.call(ge, "input, textarea, [contenteditable]")) return;
      const J = (ne = Q.current) == null ? void 0 : ne.closest(".ui-menu");
      if (!J || !J.contains(k.target)) return;
      const ce = J.ownerDocument, pe = [...J.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], de = [...J.querySelectorAll('div:last-child > [role="menuitem"]')], ae = [...pe, ...de];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const R = ce.activeElement;
        let j = R ? ae.indexOf(R) : -1;
        if (j < 0 && R) {
          const re = R.closest("[data-active]"), te = re == null ? void 0 : re.querySelector('[role="menuitem"]:first-child');
          te && (j = pe.indexOf(te));
        }
        const Y = k.key === "ArrowDown" ? 1 : -1, X = j < 0 ? Y === 1 ? 0 : ae.length - 1 : (j + Y + ae.length) % ae.length;
        (g = ae[X]) == null || g.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const R = ce.activeElement, j = R == null ? void 0 : R.closest("[data-active]");
        if (!j) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const Y = [...j.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Y.length === 0) return;
        const X = R && j.contains(R) ? Y.indexOf(R) : -1, re = k.key === "ArrowRight" ? 1 : -1, te = X < 0 ? 0 : (X + re + Y.length) % Y.length;
        (D = Y[te]) == null || D.focus({ preventScroll: !0 });
        return;
      }
    }, K = ((P = Q.current) == null ? void 0 : P.ownerDocument) ?? null;
    return K == null || K.addEventListener("keydown", C, { capture: !0 }), () => K == null ? void 0 : K.removeEventListener("keydown", C, { capture: !0 });
  }, [e]), U(() => {
    if (w) {
      requestAnimationFrame(() => {
        var K, P;
        (K = G.current) == null || K.focus(), (P = G.current) == null || P.select();
      });
      const C = n.find((K) => K.id === w);
      C && !S && A(C.name);
    }
  }, [w]), U(() => {
    if (w) {
      const C = n.find((K) => K.id === w);
      C && !S && A(C.name);
    }
  }, [w, n]);
  const oe = (C, K) => {
    z(C), A(K);
  }, $ = () => {
    w && S.trim() && i(w, S.trim()), z(null);
  }, H = () => {
    z(null);
  }, ee = M || B.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ N(Be, { open: e, onOpenChange: (C) => {
    C ? (z(null), A("")) : (w && S.trim() && i(w, S.trim()), z(null), A("")), (!C || !p) && t(C);
  }, width: "w-80", theme: y, align: v, trigger: I, morph: T, contentClassName: q, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${m.headerText}`, children: B }),
    /* @__PURE__ */ o("div", { ref: Q, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((C) => {
      const K = C.id === r, P = w === C.id;
      return /* @__PURE__ */ o("div", { "data-active": K ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${K || P ? m.rowActiveBg : m.rowHoverBg} ${w && !P ? "opacity-40 pointer-events-none" : ""}`, children: P ? /* @__PURE__ */ N(me, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: G,
            value: S,
            onChange: (k) => A(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), $()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), H());
            },
            className: `w-full border rounded ${m.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${m.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), $();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o($t, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${m.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), H();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(je, { className: m.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ N(me, { children: [
        /* @__PURE__ */ o(
          V.Item,
          {
            className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none cursor-pointer flex items-center ${m.rowText} ${K ? "" : m.rowTextHover}`,
            onSelect: b ? () => {
              c(C.id);
            } : (k) => {
              k.preventDefault(), c(C.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${K ? m.rowActiveText : ""}`, children: _ ? _(C) : C.name })
          }
        ),
        /* @__PURE__ */ o(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${K ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), oe(C.id, C.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ o(jt, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${K ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const J = a(C.id);
              J && oe(J, `${C.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ o(Ct, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= O ? m.btnDisabled : K ? m.btnDangerActive : m.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), f(C.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= O,
            children: /* @__PURE__ */ o(Ve, { className: m.btnIcon })
          }
        )
      ] }) }, C.id);
    }) }),
    /* @__PURE__ */ N("div", { className: `shrink-0 ${w ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ N(me, { children: [
        /* @__PURE__ */ o(V.Separator, { className: m.separator }),
        /* @__PURE__ */ N(
          V.Item,
          {
            className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
            onSelect: (C) => {
              C.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ o(zt, { className: `${m.btnIcon} ${m.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || h || s || u) && /* @__PURE__ */ o(V.Separator, { className: m.separator }),
      l && /* @__PURE__ */ N(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault();
            const K = l();
            K && oe(K, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ o(Vt, { className: `${m.btnIcon} ${m.icon}` }),
            "New ",
            ee
          ]
        }
      ),
      h && /* @__PURE__ */ N(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ N("svg", { className: `${m.btnIcon} ${m.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ N(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ N("svg", { className: `${m.btnIcon} ${m.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      u && /* @__PURE__ */ N(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ o(Ve, { className: `${m.btnIcon} ${m.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Sn = E ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Ln({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: c = "",
  children: i,
  keepOpen: a = !1,
  selected: f = !1,
  rightAction: l,
  trailing: h
}) {
  At();
  const s = Pt(), d = x(!1), u = x(null), b = at(), p = x(b);
  p.current = b;
  const y = x(null);
  U(() => {
    var I;
    const M = {
      label: Ot(i),
      activate: () => {
        n || e();
      }
    };
    return y.current = M, (I = p.current) == null ? void 0 : I.register(M);
  }, []);
  const v = b && y.current ? b.items.indexOf(y.current) : -1, L = !n && v >= 0 && v === b.highlightedIndex, B = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ N(
    V.Item,
    {
      ref: u,
      "data-ei": v >= 0 ? v : void 0,
      className: `w-full text-left ${Sn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${B} ${f ? "ui-item-selected" : ""} ${L ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${c}`,
      onSelect: (M) => {
        if (d.current) {
          d.current = !1;
          return;
        }
        a && M.preventDefault(), e();
      },
      onPointerEnter: () => {
        !n && b && v >= 0 && b.setHighlighted(v, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ o("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: i }),
        h && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: h }),
        l && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: l.title,
            onPointerDown: (M) => {
              M.stopPropagation(), M.preventDefault(), d.current = !0, l.onClick();
            },
            onClick: (M) => {
              M.stopPropagation(), M.preventDefault();
            },
            children: l.icon
          }
        )
      ]
    }
  );
}
const Dn = E ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Mn({ id: e, label: t, icon: n, width: r, side: c = "right", children: i, contentClassName: a }) {
  const { chain: f, setChain: l, morph: h, keyboardOpened: s, setKeyboardOpened: d } = Ee(lt), u = f.includes(e), b = f[f.length - 1] === e, p = At(), y = Te(), v = x(null), L = x(null), [B, M] = W(u), I = !u && B;
  U(() => {
    u && M(!0);
  }, [u]);
  const O = () => l((P) => {
    const k = P.indexOf(e);
    return k >= 0 ? P.slice(0, k) : P;
  }), _ = ut(), T = at(), q = x(T);
  q.current = T;
  const m = x(null);
  U(() => {
    var k;
    const P = {
      label: t,
      activate: () => {
        d(e), l((J) => J.includes(e) ? J : [...J, e]);
      },
      submenu: !0
    };
    return m.current = P, (k = q.current) == null ? void 0 : k.register(P);
  }, []);
  const w = T && m.current ? T.items.indexOf(m.current) : -1, z = w >= 0 && w === T.highlightedIndex, S = Z(() => {
    const P = v.current;
    if (!P) return null;
    const k = P.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), A = st({
    visible: u,
    morph: h,
    anchor: S,
    onClosed: () => M(!1)
  }), G = x(() => {
  }), Q = x(() => {
  }), oe = x(() => {
  });
  dt(u && b, _, G, {
    onCloseSub: () => {
      O(), T && w >= 0 && T.setHighlighted(w, "keyboard");
    }
  });
  const $ = x(s);
  $.current = s, U(() => {
    u && ($.current === e ? (_.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var P;
      return (P = L.current) == null ? void 0 : P.focus();
    }), d(null)) : _.setHighlighted(-1, "keyboard"));
  }, [u]), ht(u, Q), ft(u, _, G, L, !b, oe), be.useLayoutEffect(() => {
    var k;
    if (!u || _.highlightedIndex < 0) return;
    const P = (k = L.current) == null ? void 0 : k.querySelector(`[data-ei="${_.highlightedIndex}"]`);
    P == null || P.scrollIntoView({ block: "nearest" });
  }, [u, _.highlightedIndex]);
  const H = x(null), ee = Z((P) => {
    var k;
    if (P) {
      P.addEventListener("keydown", G.current, { capture: !0 }), P.addEventListener("wheel", Q.current, { passive: !1 });
      const J = P.ownerDocument;
      H.current = J, J.addEventListener("keydown", oe.current, { capture: !0 });
    } else
      (k = H.current) == null || k.removeEventListener("keydown", oe.current, { capture: !0 }), H.current = null;
    L.current = P, A(P);
  }, [A]), C = `w-full text-left ${Dn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${z ? " ui-item-highlighted" : ""}${I ? " ui-sub-closing" : ""}`, K = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ N(V.Sub, { open: u || B, onOpenChange: (P) => l((k) => {
    if (!P) {
      const J = k.indexOf(e);
      return J >= 0 ? k.slice(0, J) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ N(
      V.SubTrigger,
      {
        ref: v,
        "data-ei": w >= 0 ? w : void 0,
        className: C,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          T && w >= 0 && T.setHighlighted(w, "pointer");
        },
        onPointerDown: (P) => {
          P.pointerType === "pen" && (P.preventDefault(), l((k) => u ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          c === "left" && /* @__PURE__ */ o(Xe, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ N("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          c === "right" && /* @__PURE__ */ o(Xe, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(V.Portal, { container: y ?? void 0, children: /* @__PURE__ */ o(
      V.SubContent,
      {
        ref: ee,
        "data-theme": p,
        className: K,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: _.pointerLeave,
        children: /* @__PURE__ */ o(He.Provider, { value: _, children: i })
      }
    ) })
  ] });
}
const ke = 8, An = E ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Pn = E ? "text-sm" : "text-xs", oo = ({ open: e, x: t, y: n, onClose: r, children: c, containerRef: i, morph: a = !0 }) => {
  const f = x(null), l = we(), [h, s] = W(!1), [d, u] = W([]), [b, p] = W(null), y = ut();
  U(() => {
    if (e)
      return y.setHighlighted(-1, "keyboard"), Mt(r);
  }, [e, r]);
  const v = x({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const L = Z(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), B = st({
    visible: !0,
    morph: a,
    anchor: L,
    cloneOnUnmount: !0
  }), M = x(() => {
  }), I = x(() => {
  }), O = x(() => {
  });
  dt(e, y, M), ht(e, I), ft(e, y, M, f, d.length > 0, O);
  const _ = x(null), T = Z((w) => {
    var z;
    if (w) {
      w.addEventListener("keydown", M.current, { capture: !0 }), w.addEventListener("wheel", I.current, { passive: !1 });
      const S = w.ownerDocument;
      _.current = S, S.addEventListener("keydown", O.current, { capture: !0 });
    } else
      (z = _.current) == null || z.removeEventListener("keydown", O.current, { capture: !0 }), _.current = null;
    f.current = w, s(!!w), B(w);
  }, [B]), [q, m] = W(null);
  return le(() => {
    var C;
    if (!e || !h || !f.current) return;
    const w = f.current, z = w.offsetWidth, S = w.offsetHeight, A = (C = i == null ? void 0 : i.current) == null ? void 0 : C.getBoundingClientRect(), G = A ? A.right : (l == null ? void 0 : l.innerWidth) ?? 0, Q = A ? A.bottom : (l == null ? void 0 : l.innerHeight) ?? 0, oe = A ? A.left : 0, $ = A ? A.top : 0;
    let H = Math.max($ + ke, v.current.top), ee = Math.max(oe + ke, v.current.left);
    ee + z > G && (ee = G - z - ke), H + S > Q && (H = Math.max($ + ke, Q - S - ke)), m({ left: ee, top: H });
  }, [e, h, t, n, i]), e ? /* @__PURE__ */ N(V.Root, { open: e, onOpenChange: (w) => {
    w || r();
  }, modal: !1, children: [
    /* @__PURE__ */ o(V.Trigger, { asChild: !0, children: /* @__PURE__ */ o("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ o(V.Portal, { children: /* @__PURE__ */ o(ct.Provider, { value: "light", children: /* @__PURE__ */ o(lt.Provider, { value: { chain: d, setChain: u, morph: a, keyboardOpened: b, setKeyboardOpened: p }, children: /* @__PURE__ */ o(He.Provider, { value: y, children: /* @__PURE__ */ o(
      V.Content,
      {
        ref: T,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Pn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (q == null ? void 0 : q.left) ?? v.current.left, top: (q == null ? void 0 : q.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: y.pointerLeave,
        children: c
      }
    ) }) }) }) })
  ] }) : null;
}, io = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: c = !1, trailing: i, children: a }) => {
  const f = at(), l = x(f);
  l.current = f;
  const h = x(null);
  U(() => {
    var b;
    const u = { label: Ot(a), activate: () => {
      r || e();
    } };
    return h.current = u, (b = l.current) == null ? void 0 : b.register(u);
  }, []);
  const s = f && h.current ? f.items.indexOf(h.current) : -1, d = !r && s >= 0 && s === f.highlightedIndex;
  return /* @__PURE__ */ N(
    V.Item,
    {
      "data-ei": s >= 0 ? s : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && f && s >= 0 && f.setHighlighted(s, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${An} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${c ? "ui-item-selected" : ""} ${d ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        i && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: i })
      ]
    }
  );
}, so = () => /* @__PURE__ */ o(V.Separator, { className: "ui-sep my-1" }), co = (e) => /* @__PURE__ */ o(Mn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), ie = 32, It = "[data-modal-stack]", ue = 220, Ce = "cubic-bezier(0.32, 0.72, 0, 1)", Ae = 0.94;
function Ne() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Se(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function _t(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function bt(e, t, n, r) {
  const c = ++e.current, i = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = _t(i, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === c && (t.style.transition = `transform ${ue}ms ${Ce}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === c && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ue + 80));
    });
  });
}
function On(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${Ae})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${ue}ms ${Ce}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ue + 60));
    });
  });
}
function xt(e, t, n) {
  const r = ++e.current, c = t.getBoundingClientRect(), i = 1 - Ae, a = { left: c.left + c.width * i / 2, top: c.top + c.height * i / 2, width: c.width * Ae, height: c.height * Ae };
  t.style.transition = `transform ${ue}ms ${Ce}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = _t(c, a), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ue + 60);
}
function Ke(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(It) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function We(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(It) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const In = E ? "px-6" : "px-5", _n = E ? "py-3" : "py-2.5", Hn = E ? "text-sm" : "text-xs", Bn = E ? "w-4 h-4" : "w-3.5 h-3.5", Fn = E ? "text-base" : "text-sm", Kn = E ? "w-5 h-5" : "w-4 h-4", qe = E ? "px-6" : "px-5", Wn = E ? "pt-6" : "pt-5", qn = E ? "pb-6" : "pb-5", Yn = E ? "text-xs" : "text-[10px]", Un = E ? "w-3.5 h-3.5" : "w-3 h-3", jn = E ? "px-2.5 py-1.5" : "px-2 py-1", Vn = E ? "px-6" : "px-5", Xn = E ? "py-3" : "py-2";
function Gn({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: c,
  footer: i,
  children: a,
  onReset: f,
  morph: l = !0,
  flat: h = !1,
  closable: s = !0
}) {
  const d = x(null), u = x(null), b = x(null), [p, y] = W(!1), v = Z((g) => {
    d.current = g, y(g !== null);
  }, []), L = Te(), B = we(), M = x(B);
  M.current = B;
  const [I, O] = W(null), _ = x(null), T = x(!1), q = x(!1), [m, w] = W(!1), z = x(0), S = x(!1), [A, G] = W(!1), Q = x(l);
  Q.current = l;
  const oe = x(!1), $ = x(!1), H = () => {
    $.current = !0, w(!0);
  }, ee = () => {
    $.current = !1, w(!1);
  };
  U(() => {
    e || (O(null), q.current = !1, T.current = !1);
  }, [e]), le(() => {
    if (!e || q.current || !p || !d.current) return;
    q.current = !0;
    const g = d.current.getBoundingClientRect(), D = M.current ?? null, R = (D == null ? void 0 : D.innerWidth) ?? 0, j = Se(D);
    O({
      left: Math.max(ie, Math.min((R - g.width) / 2, R - g.width - ie)),
      top: Math.max(j.top + ie, Math.min(j.top + (j.height - g.height) / 2, j.bottom - g.height - ie))
    });
  }, [e, p]), le(() => {
    if (!e || !p || !l || Ne() || !d.current) return;
    const g = d.current, D = Ke(g), R = D[D.length - 1];
    H(), R ? bt(z, g, R.getBoundingClientRect(), ee) : On(z, g, ee);
  }, [e, p]);
  const C = Z(() => {
    if (!s || S.current) return;
    const g = d.current, D = !!g && Ke(g).length > 0;
    if (!g || !l || Ne() || D) {
      t();
      return;
    }
    S.current = !0, G(!0), oe.current = !0, H(), xt(z, g, () => {
      S.current = !1, G(!1), ee(), t();
    });
  }, [l, t, s]);
  le(() => () => {
    const g = d.current;
    if (!g || oe.current || !Q.current || Ne() || Ke(g).length > 0) return;
    const D = g.ownerDocument, R = g.cloneNode(!0);
    R.removeAttribute("data-modal-stack"), R.removeAttribute("data-state"), R.removeAttribute("role"), R.removeAttribute("data-aria-hidden"), R.removeAttribute("tabindex"), R.setAttribute("aria-hidden", "true"), R.style.pointerEvents = "none", D.body.appendChild(R), xt({ current: 0 }, R, () => {
      R.isConnected && R.remove();
    });
  }, []), U(() => {
    if (!e || !p || !l || !d.current) return;
    const g = d.current, D = g.parentNode;
    if (!D) return;
    let R = 0, j = null, Y = !1;
    const X = () => {
      R = 0;
      const te = We(g);
      if (te.length > 0)
        g.style.opacity = "", g.style.pointerEvents = "", j = te[te.length - 1].getBoundingClientRect(), Y = !0, R = requestAnimationFrame(X);
      else if (Y) {
        Y = !1, j && !Ne() && (H(), bt(z, g, j, ee)), j = null;
        const fe = M.current ?? null;
        fe == null || fe.setTimeout(() => {
          !g || !g.isConnected || getComputedStyle(g).opacity !== "1" && (g.style.opacity = "1", g.style.pointerEvents = "");
        }, 240);
      }
    }, re = new MutationObserver(() => {
      !R && We(g).length > 0 && (R = requestAnimationFrame(X));
    });
    return re.observe(D, { childList: !0 }), () => {
      re.disconnect(), R && cancelAnimationFrame(R);
    };
  }, [e, p]), U(() => {
    if (!p || !l || Ne() || !d.current) return;
    const g = d.current;
    let D = Math.round(g.getBoundingClientRect().height), R = !1;
    const j = new ResizeObserver(() => {
      if (!g.isConnected) return;
      const Y = Math.round(g.getBoundingClientRect().height);
      if (!R) {
        R = !0, D = Y;
        return;
      }
      if (Math.abs(Y - D) < 1) return;
      if (_.current || S.current || We(g).length > 0) {
        D = Y;
        return;
      }
      if ($.current) return;
      const X = D;
      D = Y, H();
      const re = g.getBoundingClientRect(), te = !T.current, fe = Se(M.current ?? null), Yt = te ? fe.top + (fe.height - X) / 2 : re.top, mt = te ? fe.top + (fe.height - Y) / 2 : re.top;
      g.style.transition = "none", g.style.height = `${X}px`, te && (g.style.top = `${Yt}px`), u.current && (u.current.style.overflow = "hidden"), g.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          g.style.height === `${X}px` && (g.style.transition = `height ${ue}ms ${Ce}${te ? `, top ${ue}ms ${Ce}` : ""}`, g.style.height = `${Y}px`, te && (g.style.top = `${mt}px`), window.setTimeout(() => {
            g.style.height === `${Y}px` && (g.style.transition = "", g.style.height = "", u.current && (u.current.style.overflow = ""), te && O({ left: re.left, top: mt }), ee());
          }, ue + 60));
        });
      });
    });
    return j.observe(g), () => j.disconnect();
  }, [p]);
  const K = Z(() => {
    const g = d.current;
    if (!g) return null;
    const D = g.getBoundingClientRect();
    return { left: D.left, top: D.top, width: D.width, height: D.height };
  }, []), P = Z((g, D) => {
    const R = M.current ?? null, j = (R == null ? void 0 : R.innerWidth) ?? 0, Y = Se(R), X = K(), re = X ? X.width : Math.min(j - ie * 2, 576), te = X ? X.height : Math.min(Y.height - ie * 2, 400);
    return {
      left: Math.max(ie, Math.min(g, j - re - ie)),
      top: Math.max(Y.top + ie, Math.min(D, Y.bottom - te - ie))
    };
  }, [K]);
  U(() => {
    if (!e) return;
    const g = M.current ?? null, D = (g == null ? void 0 : g.visualViewport) ?? null;
    if (!g || !D) return;
    const R = () => {
      var te;
      if (S.current || _.current) return;
      const j = d.current;
      if (!j) return;
      const Y = Se(M.current ?? null), X = j.getBoundingClientRect();
      if (T.current) {
        O(P(X.left, X.top));
        return;
      }
      const re = ((te = M.current) == null ? void 0 : te.innerWidth) ?? 0;
      O({
        left: Math.max(ie, Math.min((re - X.width) / 2, re - X.width - ie)),
        top: Math.max(Y.top + ie, Math.min(Y.top + (Y.height - X.height) / 2, Y.bottom - X.height - ie))
      });
    };
    return D.addEventListener("resize", R), D.addEventListener("scroll", R), g.addEventListener("orientationchange", R), () => {
      D.removeEventListener("resize", R), D.removeEventListener("scroll", R), g.removeEventListener("orientationchange", R);
    };
  }, [e, P]);
  const k = Z((g) => {
    if (g.target.closest("button")) return;
    T.current = !0;
    const D = K();
    D && (O(P(D.left, D.top)), _.current = { startX: g.clientX, startY: g.clientY, posX: D.left, posY: D.top }, g.target.setPointerCapture(g.pointerId));
  }, [K, P]), J = Z((g) => {
    const D = _.current;
    D && (g.preventDefault(), O(P(D.posX + g.clientX - D.startX, D.posY + g.clientY - D.startY)));
  }, [P]), ce = Z(() => {
    _.current = null;
  }, []), pe = _.current !== null, de = I !== null, ae = de ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ge = `${c ? `${c} w-full` : "max-w-xl w-full"}`, F = {
    ...de ? { left: I.left, top: I.top } : {},
    width: `min(100%, calc(100vw - ${ie * 2}px))`,
    maxHeight: `calc(100vh - ${ie * 2}px)`
  }, ne = Z((g) => {
    if (g.key !== "Enter" || g.shiftKey || g.metaKey || g.ctrlKey || g.altKey || g.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const R = b.current;
    if (!R) return;
    const j = Array.from(R.querySelectorAll("button[data-modal-confirm]")), Y = j.length > 0 ? j : Array.from(R.querySelectorAll("button")), X = Y[Y.length - 1];
    !X || X.disabled || (g.preventDefault(), X.click());
  }, []);
  return /* @__PURE__ */ o(he.Root, { open: e, onOpenChange: (g) => {
    g || C();
  }, children: /* @__PURE__ */ N(he.Portal, { container: L ?? void 0, children: [
    /* @__PURE__ */ o(
      he.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${A ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (g) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (g.preventDefault(), C());
        }
      }
    ),
    /* @__PURE__ */ N(
      he.Content,
      {
        ref: v,
        onKeyDown: ne,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ae} ${ge}`,
        style: { touchAction: "manipulation", ...Object.keys(F).length > 0 ? F : {} },
        children: [
          h ? /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${qe} ${Wn} pb-4 ${pe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (g) => {
                m || k(g);
              },
              onPointerMove: J,
              onPointerUp: ce,
              children: [
                /* @__PURE__ */ o(he.Title, { className: `${Fn} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ o(he.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(je, { className: Kn }) })
              ]
            }
          ) : /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${In} ${_n} border-b border-zinc-800 shrink-0 bg-zinc-950 ${pe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (g) => {
                m || k(g);
              },
              onPointerMove: J,
              onPointerUp: ce,
              children: [
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(he.Title, { className: `${Hn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
                  f && /* @__PURE__ */ N("button", { onClick: f, className: `flex items-center gap-1 ${Yn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${jn} shrink-0`, children: [
                    /* @__PURE__ */ o(zt, { className: Un }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ o(he.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(je, { className: Bn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: u, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${h ? ` ${qe} pb-4` : ""}`, children: a }),
          i && /* @__PURE__ */ o("div", { ref: b, className: h ? `${qe} ${qn}` : "shrink-0", children: h ? /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-2", children: i }) : i })
        ]
      }
    )
  ] }) });
}
function lo({ children: e }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${Vn} ${Xn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const Zn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${E ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Jn = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Le({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: n,
      className: `${Zn} ${Jn[e]} ${t}`,
      ...r
    }
  );
}
function Qn({ checked: e, onChange: t, disabled: n = !1, label: r, id: c, className: i = "", labelClassName: a = "", theme: f, variant: l = "pill", tone: h = "accent", block: s = !1 }) {
  const d = l !== "plain", u = E ? "w-5 h-5" : "w-4 h-4", b = E ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", p = E ? "w-3.5 h-3.5" : "w-3 h-3", y = E ? "text-sm" : "text-xs";
  return /* @__PURE__ */ N(
    "label",
    {
      className: `ui-checkbox ${d ? `ui-checkbox-pill ${E ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${h === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${i}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: E ? 10 : 8 },
      onClick: (L) => L.stopPropagation(),
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: c,
            checked: e,
            disabled: n,
            onChange: (L) => t(L.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ N("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${b}`, "aria-hidden": !0, children: e && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: p, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${y} ${a}`, children: r })
      ]
    }
  );
}
const er = E ? "space-y-5" : "space-y-4", tr = E ? "text-sm" : "text-xs", nr = E ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ht = ze(null);
function ao() {
  const e = Ee(Ht);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function uo({ children: e }) {
  const [t, n] = W(null), [r, c] = W(!1), i = x(null), a = Z((u) => {
    if (u.suppressKey) {
      const b = localStorage.getItem(u.suppressKey);
      if (b && Date.now() < parseInt(b, 10))
        return Promise.resolve(!0);
    }
    return new Promise((b) => {
      c(!1), n({ kind: "confirm", options: u, resolve: b });
    });
  }, []), f = Z((u) => new Promise((b) => {
    n({ kind: "prompt", options: u, resolve: b });
  }), []), l = Z((u) => new Promise((b) => {
    n({ kind: "alert", options: u, resolve: b });
  }), []);
  U(() => {
    if (t) {
      const u = setTimeout(() => {
        var b;
        return (b = i.current) == null ? void 0 : b.focus();
      }, 50);
      return () => clearTimeout(u);
    }
  }, [t]);
  const h = Z(() => {
    var u, b;
    if (t) {
      if (t.kind === "confirm") {
        const p = t.options;
        p.suppressKey && r && localStorage.setItem(p.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((b = (u = i.current) == null ? void 0 : u.value) == null ? void 0 : b.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), s = t !== null;
  U(() => {
    if (!s) return;
    const u = (b) => {
      b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey || b.isComposing || (b.preventDefault(), b.stopImmediatePropagation(), h());
    };
    return document.addEventListener("keydown", u, !0), () => document.removeEventListener("keydown", u, !0);
  }, [s, h]);
  const d = Z(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ N(Ht.Provider, { value: { confirm: a, prompt: f, alert: l }, children: [
    e,
    /* @__PURE__ */ o(
      Gn,
      {
        open: s,
        onClose: d,
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ N(me, { children: [
          t.kind !== "alert" && /* @__PURE__ */ o(Le, { variant: "ghost", onClick: d, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ o(Le, { onClick: h, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ o(
            Le,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: h,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ o(Le, { "data-modal-confirm": !0, onClick: h, children: "Save" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: er, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ o("p", { className: `${tr} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ o(
            Qn,
            {
              block: !0,
              checked: r,
              onChange: c,
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
              className: `w-full ${nr} ui-input`
            }
          )
        ] })
      }
    )
  ] });
}
const rr = 500, or = 250, ir = 5, se = 88, yt = 4;
function sr(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const c = performance.now(), i = (a) => {
    const f = a - c, l = Math.min(f / t, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(i);
  };
  requestAnimationFrame(i);
}
function cr({ x: e, y: t, ms: n }) {
  const r = x(null), c = Te();
  return U(() => {
    r.current && sr(r.current, n);
  }, [n]), tt(
    /* @__PURE__ */ o(
      "div",
      {
        style: {
          position: "fixed",
          left: e - se / 2,
          top: t - se / 2,
          width: se,
          height: se,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ N("svg", { ref: r, width: se, height: se, viewBox: `0 0 ${se} ${se}`, children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: se / 2,
              cy: se / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: yt + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: se / 2,
              cy: se / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: yt,
              strokeLinecap: "round",
              style: { transform: "rotate(-90deg)", transformOrigin: "center" }
            }
          )
        ] })
      }
    ),
    c ?? document.body
  );
}
function fo() {
  return { "data-no-longpress": "true" };
}
function lr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function ho({
  children: e,
  showRing: t = !0,
  longPressMs: n = rr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: c,
  onLongPress: i
}) {
  const [a, f] = W(null), l = wn(), h = x(null), s = x(null), d = x({ x: 0, y: 0, target: null }), u = x(!1), b = Math.min(or, n * 0.5), p = x(c);
  p.current = c;
  const y = x(i);
  return y.current = i, U(() => {
    if (!E || !l) return;
    const v = (I) => {
      if (!Ge(I.pointerType) || I.button !== 0) return;
      const O = I.target;
      if (!O.closest(r) || (p.current ? !p.current(O) : lr(O))) return;
      const _ = I.clientX, T = I.clientY;
      d.current = { x: _, y: T, target: I.target }, u.current = !0, t && (s.current = setTimeout(() => f({ x: _, y: T }), b)), h.current = setTimeout(() => {
        if (!u.current) return;
        s.current && (clearTimeout(s.current), s.current = null), f(null);
        const q = d.current.target;
        if (!q) return;
        const m = y.current;
        if (m) {
          m(q, _, T);
          return;
        }
        const w = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: _,
          clientY: T,
          button: 2,
          view: window
        });
        q.dispatchEvent(w);
      }, n);
    }, L = (I) => {
      if (!u.current || h.current === null) return;
      const O = I.clientX - d.current.x, _ = I.clientY - d.current.y;
      Math.sqrt(O * O + _ * _) > ir && (clearTimeout(h.current), h.current = null, s.current && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    }, B = () => {
      h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null);
    }, M = (I) => {
      Ge(I.pointerType) && (h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    };
    return l == null || l.addEventListener("pointerdown", v), l.addEventListener("pointermove", L), l.addEventListener("pointerup", B), l.addEventListener("pointercancel", B), l.addEventListener("pointerleave", M), () => {
      l.removeEventListener("pointerdown", v), l.removeEventListener("pointermove", L), l.removeEventListener("pointerup", B), l == null || l.removeEventListener("pointercancel", B), l == null || l.removeEventListener("pointerleave", M), h.current !== null && clearTimeout(h.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, b, r]), /* @__PURE__ */ N(me, { children: [
    e,
    t && a && /* @__PURE__ */ o(cr, { x: a.x, y: a.y, ms: n - b })
  ] });
}
function mo() {
  const e = Nn();
  return kn ? e === null || Ge(e) : !1;
}
const ar = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", ur = {
  light: {
    subtle: { base: "px-2.5 py-1 text-zinc-600 hover:bg-zinc-200", open: "bg-zinc-200! text-zinc-900" },
    primary: { base: "px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white", open: "bg-zinc-800!" },
    "danger-ghost": { base: "px-2.5 py-1 text-rose-600 hover:bg-rose-50", open: "bg-rose-50!" }
  },
  dark: {
    subtle: { base: "px-2.5 py-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800", open: "bg-zinc-800! text-zinc-300" },
    primary: { base: "px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white", open: "bg-zinc-700!" },
    "danger-ghost": { base: "px-2.5 py-1 text-red-400 hover:bg-rose-950/40", open: "bg-rose-950/40!" }
  }
}, vt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", dr = "bg-blue-900!";
function po({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: c = "button",
  ...i
}) {
  const a = i["data-state"] === "open", f = ur[t][e];
  let l = `${f.base} ${a ? f.open : ""}`;
  return e === "primary" && t === "light" && n && (l = a ? `${vt} ${dr}` : vt), /* @__PURE__ */ o("button", { type: c, className: `${ar} ${l} ${r}`, ...i });
}
const fr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], hr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ye = 1900, Ue = 2100;
function mr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function pr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function go({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: c = "", initialView: i }) {
  const a = /* @__PURE__ */ new Date(), f = (() => {
    if (!i) return a;
    const $ = /* @__PURE__ */ new Date(i + "T00:00:00");
    return isNaN($.getTime()) ? a : $;
  })(), [l, h] = W(f.getFullYear()), [s, d] = W(f.getMonth()), [u, b] = W("days"), [p, y] = W(null), v = Oe(() => new Set(e), [e]), L = ($) => {
    v.has($) ? t(e.filter((H) => H !== $)) : t([...e, $]);
  }, B = Oe(() => {
    const $ = mr(l, s), H = new Date(l, s, 1).getDay(), ee = [];
    for (let C = 0; C < H; C++) ee.push({ key: `pad-${C}`, day: 0, empty: !0 });
    for (let C = 1; C <= $; C++) ee.push({ key: pr(l, s, C), day: C, empty: !1 });
    return ee;
  }, [l, s]), M = ($) => h((H) => Math.max(Ye, Math.min(Ue, H + $))), I = ($) => {
    s + $ < 0 ? (h((H) => Math.max(Ye, H - 1)), d(11)) : s + $ > 11 ? (h((H) => Math.min(Ue, H + 1)), d(0)) : d((H) => H + $);
  }, O = () => {
    if (p === null) return;
    const $ = parseInt(p, 10);
    !isNaN($) && $ >= Ye && $ <= Ue && h($), y(null);
  }, _ = ($) => e.some((H) => H.startsWith(`${l}-${String($ + 1).padStart(2, "0")}`)), T = n === "dark", q = E ? "p-2" : "p-1", m = E ? "w-5 h-5" : "w-4 h-4", w = E ? "text-[11px] py-2" : "text-[10px] py-1.5", z = E ? "py-2.5 text-sm" : "py-1.5 text-xs", S = E ? "py-3 text-sm" : "py-2 text-xs", A = E ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", G = E ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${T ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${T ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, Q = T ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", oe = T ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ N("div", { className: `border rounded-lg overflow-hidden w-full ${T ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${c}`, children: [
    /* @__PURE__ */ N("div", { className: `flex items-center justify-between px-3 py-2 border-b ${T ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? M(-1) : I(-1),
          className: `${q} rounded transition-colors ${T ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ o(Xt, { className: m })
        }
      ),
      u === "days" ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => b("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${T ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(l, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ o(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(l),
          onChange: ($) => y($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: O,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), O()), $.key === "Escape" && y(null);
          },
          className: G
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? M(1) : I(1),
          className: `${q} rounded transition-colors ${T ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ o(Xe, { className: m })
        }
      )
    ] }),
    u === "months" ? /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 text-center", children: hr.map(($, H) => /* @__PURE__ */ N(
        "button",
        {
          type: "button",
          onClick: () => {
            d(H), b("days");
          },
          className: `${S} relative font-medium transition-colors border-b ${H === s ? Q : oe} ${T ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            $,
            _(H) && /* @__PURE__ */ o("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${H === s ? "bg-white" : T ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ o("div", { className: `text-center border-t ${T ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            h(a.getFullYear()), d(a.getMonth()), b("days");
          },
          className: `px-3 ${E ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${T ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ N("div", { className: "grid grid-cols-7 text-center", children: [
      fr.map(($) => /* @__PURE__ */ o("div", { className: `${w} font-semibold uppercase tracking-wider border-b ${T ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: $ }, $)),
      B.map(($) => $.empty ? /* @__PURE__ */ o("div", {}, $.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => L($.key),
          className: `${z} font-medium transition-colors border-b ${T ? "border-zinc-800/60" : "border-zinc-50"} ${v.has($.key) ? Q : T ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ N("div", { className: `px-3 py-2 border-t ${T ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ N("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: e.map(($) => {
        const H = /* @__PURE__ */ new Date($ + "T00:00:00"), ee = H.getFullYear() === a.getFullYear() ? H.toLocaleString("default", { month: "short", day: "numeric" }) : H.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            onClick: () => L($),
            "aria-label": `Remove ${ee}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${T ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${A}`,
            children: [
              ee,
              /* @__PURE__ */ o("span", { className: `leading-none ${T ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function bo({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: c,
  allSelected: i = !1,
  toggleAllLabel: a,
  emptyHint: f = "Nothing here",
  maxHeight: l,
  disabled: h = !1,
  theme: s,
  className: d = ""
}) {
  const u = (v) => t instanceof Set ? t.has(v) : t.includes(v), b = E ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = E ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", y = r != null || c != null;
  return /* @__PURE__ */ N("div", { className: d, ...s ? { "data-theme": s } : {}, children: [
    y && /* @__PURE__ */ N("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      c != null && /* @__PURE__ */ o("button", { type: "button", disabled: h, onClick: c, className: "ui-checklist-toggleall", children: a ?? (i ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${h ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((v) => {
            const L = u(v.id);
            return /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                disabled: h,
                onClick: () => n(v.id),
                className: `ui-checklist-item ${b} ${L ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${p}`, "aria-hidden": !0, children: L && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  v.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: v.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: v.label }),
                  v.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: v.secondary })
                ]
              },
              v.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: f })
        ]
      }
    )
  ] });
}
function xo({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: c = "Nothing here",
  maxHeight: i,
  compact: a = !1,
  disabled: f = !1,
  theme: l,
  className: h = ""
}) {
  const s = a ? "px-2.5 py-1.5 text-xs" : E ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", d = a ? "w-3.5 h-3.5" : E ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ N("div", { className: h, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: i ? { maxHeight: i, overflowY: "auto" } : void 0,
        children: [
          e.map((u) => {
            const b = t === u.id;
            return /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(u.id),
                className: `ui-checklist-item ${s} ${b ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${d}`, "aria-hidden": !0, children: b && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  u.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: u.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: u.label }),
                  u.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: u.secondary })
                ]
              },
              u.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: c })
        ]
      }
    )
  ] });
}
const yo = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: c = "visible",
  offset: i = 8
}) => {
  const a = we(), { refs: f, floatingStyles: l } = tn({
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
          var B;
          if (c !== "visible") return {};
          const s = (B = h.elements.floating.ownerDocument) == null ? void 0 : B.defaultView;
          if (!s) return {};
          const d = h.rects.reference, u = Math.max(d.x, 0), b = Math.max(d.y, 0), p = Math.min(d.x + d.width, s.innerWidth), y = Math.min(d.y + d.height, s.innerHeight);
          if (p <= u || y <= b) return {};
          const v = r === "left" ? p - (d.x + d.width) : r === "right" ? u - d.x : 0, L = r === "top" ? b - d.y : r === "bottom" ? y - (d.y + d.height) : 0;
          return { x: h.x + v, y: h.y + L };
        }
      },
      rn(i),
      on({ padding: 8 }),
      sn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (h) => {
          var y;
          const s = (y = h.elements.floating.ownerDocument) == null ? void 0 : y.defaultView;
          if (!s) return {};
          const d = h.rects.floating.width, u = h.rects.floating.height, b = Math.max(8, Math.min(h.x, s.innerWidth - d - 8)), p = Math.max(8, Math.min(h.y, s.innerHeight - u - 8));
          return { x: b, y: p };
        }
      }
    ],
    whileElementsMounted: nn
  });
  return le(() => {
    n && f.setReference(n);
  }, [n, f]), /* @__PURE__ */ N(me, { children: [
    !n && /* @__PURE__ */ o("div", { ref: f.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    a && tt(
      /* @__PURE__ */ o(
        "div",
        {
          ref: f.setFloating,
          className: `ui-chrome ${e}`,
          style: l,
          onMouseDown: (h) => h.stopPropagation(),
          onClick: (h) => h.stopPropagation(),
          onDragStart: (h) => h.preventDefault(),
          children: t
        }
      ),
      a.document.body
    )
  ] });
}, $e = ({ content: e, children: t }) => {
  const n = Te(), r = we(), [c, i] = W(!1), [a, f] = W({ x: 0, y: 0 }), l = x(null), h = () => {
    if (!l.current) return;
    const s = l.current.getBoundingClientRect();
    f({ x: s.left + s.width / 2, y: s.top });
  };
  return U(() => (c && r && (h(), r.addEventListener("scroll", h, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", h, !0)), [c]), /* @__PURE__ */ N(
    "div",
    {
      ref: l,
      className: "inline-flex",
      onMouseEnter: () => {
        h(), i(!0);
      },
      onMouseLeave: () => i(!1),
      children: [
        t,
        c && tt(
          /* @__PURE__ */ N(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: a.x, top: a.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((s, d) => /* @__PURE__ */ o("div", { className: d > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: s }, d)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, vo = E ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Qe = E ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", De = E ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", gr = "hover:bg-red-950/50", Bt = E ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ft = "bg-blue-900/50 border-blue-700 text-blue-300", Kt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", br = E ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", wo = E ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Pe = E ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", xr = "inline-flex rounded overflow-hidden border border-zinc-700", Wt = E ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Me = ({ onClick: e, disabled: t, title: n, className: r = Qe, children: c }) => /* @__PURE__ */ o($e, { content: n, children: /* @__PURE__ */ o("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: c }) }), ko = ({ value: e, options: t, onChange: n, disabled: r, active: c }) => /* @__PURE__ */ o("div", { className: xr, children: t.map((i) => {
  const a = c ? c(i.v) : e === i.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(i.v),
      className: `${E ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${a ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${i.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: i.l
    },
    i.v
  );
}) }), No = ({ children: e }) => /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: E ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), yr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", vr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", $o = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ N("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ o("span", { className: n ? yr : vr, children: e }),
  t
] }), Co = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ N("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), zo = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: c }) => /* @__PURE__ */ N(me, { children: [
  /* @__PURE__ */ o(Me, { onClick: () => r(-1), disabled: e, title: "Move up", className: De, children: /* @__PURE__ */ o(Gt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: () => r(1), disabled: e, title: "Move down", className: De, children: /* @__PURE__ */ o(Zt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: t, disabled: e, title: "Duplicate", className: De, children: /* @__PURE__ */ o(Ct, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o("div", { className: Pe }),
  /* @__PURE__ */ o(Me, { onClick: n, disabled: e, title: "Delete", className: `${De} ${gr}`, children: /* @__PURE__ */ o(Ve, { className: "w-2.5 h-2.5" }) })
] }), wr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), kr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Nr = /^(https?:\/\/|mailto:)/i;
function $r(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const c = n.slice(0, r).trim().toLowerCase(), i = n.slice(r + 1).trim();
    kr.has(c) && i && t.push(`${c}: ${i}`);
  }
  return t.join("; ");
}
function et(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const f = document.createDocumentFragment();
    for (const l of Array.from(t.childNodes)) f.appendChild(et(l));
    return f;
  };
  if (!wr.has(n)) return r();
  if (n === "a") {
    const f = t.getAttribute("href") || "";
    if (!Nr.test(f)) return r();
  }
  const c = document.createElement(n), i = t.getAttribute("style"), a = $r(i || "");
  if (a && c.setAttribute("style", a), n === "a") {
    c.setAttribute("href", t.getAttribute("href"));
    const f = t.getAttribute("target"), l = t.getAttribute("rel");
    f && c.setAttribute("target", f), l && c.setAttribute("rel", l);
  }
  for (const f of Array.from(t.childNodes)) c.appendChild(et(f));
  return c;
}
function qt(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Cr(e) {
  const t = qt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const a of Array.from(n.content.childNodes)) r.appendChild(et(a));
  const c = document.createElement("div");
  return c.appendChild(r), c.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Eo(e) {
  const t = qt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function To(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const zr = { text: "#52525b" }, Er = ({ node: e, selected: t, extension: n, editor: r, view: c, getPos: i }) => {
  var d;
  const a = e.attrs.field ?? "", f = n.options, l = ((d = f.resolve) == null ? void 0 : d.call(f, a)) ?? null, h = (l == null ? void 0 : l.color) ?? zr, s = (l == null ? void 0 : l.label) ?? `{{${a}}}`;
  return /* @__PURE__ */ o(
    an,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: h.text,
        color: "#fff",
        borderRadius: 2,
        padding: 4,
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      onMouseDown: (u) => {
        var v;
        if (u.button !== 0 || !r.isEditable) return;
        u.preventDefault(), r.isFocused || r.commands.focus();
        const b = typeof i == "function" ? i() : null;
        if (b == null) return;
        const p = c.state.doc.resolve(b), y = p.nodeAfter;
        y && Ie.isSelectable(y) && c.dispatch(c.state.tr.setSelection(new Ie(p))), (v = f.onTokenClick) == null || v.call(f, a, u.currentTarget.getBoundingClientRect(), b);
      },
      children: s
    }
  );
};
function Tr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function wt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Rr = xn.extend({
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
    return ln(Er);
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
    return ["span", cn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Sr = 240, Lr = 280, Dr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = x(null);
  return U(() => {
    var i;
    const c = (i = r.current) == null ? void 0 : i.querySelector('[data-ac-active="1"]');
    c == null || c.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Lr, maxHeight: Sr, zIndex: 9999 }, onMouseDown: (c) => c.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: e.items.map((c, i) => /* @__PURE__ */ N(
    "button",
    {
      type: "button",
      "data-ac-active": i === t ? "1" : void 0,
      onMouseEnter: () => n(i),
      onClick: () => e.command({ field: c.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${i === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ o("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: c.color.text } }),
        /* @__PURE__ */ o("span", { className: "truncate flex-1", children: c.label }),
        c.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] text-zinc-600", children: c.group })
      ]
    },
    c.key
  )) }) });
}, Mr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ o(Dr, { props: n, highlight: r, onHighlight: (c) => {
      e.highlight = c, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const c = yn(r);
      e = { holder: r, root: c, unmount: null, props: n, highlight: 0 };
      const i = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: a, y: f, placement: l }) => {
          var d, u;
          if (!e) return;
          const h = (u = (d = e.props) == null ? void 0 : d.clientRect) == null ? void 0 : u.call(d), s = h && !l.endsWith("-end") ? h.width : 0;
          r.style.left = `${a + s}px`, r.style.top = `${f}px`;
        }
      });
      e.unmount = i, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var a;
      if (!(e != null && e.props)) return !1;
      const { items: r, command: c } = e.props;
      if (r.length === 0) return !1;
      const i = n.key;
      return i === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, r.length - 1), t(e.props), !0) : i === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : i === "Enter" || i === "Tab" ? (n.preventDefault(), c({ field: ((a = r[e.highlight]) == null ? void 0 : a.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Ro = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Ar = be.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: c,
  onStateChange: i,
  resolveToken: a,
  suggestionItems: f,
  onTokenClick: l,
  onSelectionChange: h
}, s) => {
  const d = x(a);
  d.current = a;
  const u = x(f);
  u.current = f;
  const b = x(l);
  b.current = l;
  const p = x(h);
  p.current = h;
  const y = x(null), v = x(null), L = x(t);
  L.current = t;
  const B = x(r);
  B.current = r;
  const M = x(i);
  M.current = i;
  const I = x(null), O = (w) => {
    var A;
    const z = {
      bold: w.isActive("bold"),
      italic: w.isActive("italic"),
      underline: w.isActive("underline"),
      strike: w.isActive("strike"),
      link: w.isActive("link"),
      color: w.getAttributes("textStyle").color || ""
    }, S = I.current;
    S && S.bold === z.bold && S.italic === z.italic && S.underline === z.underline && S.strike === z.strike && S.link === z.link && S.color === z.color || (I.current = z, (A = M.current) == null || A.call(M, z));
  }, _ = (w) => {
    var Q;
    const z = w.state.selection;
    let S = null;
    z instanceof Ie && z.node.type.name === "token" ? (S = { key: z.node.attrs.field ?? "", pos: z.from }, y.current = z.from) : y.current != null && (y.current = w.state.tr.mapping.map(y.current));
    const A = v.current, G = A && S && A.key === S.key && A.pos === S.pos;
    !A && !S || G || (v.current = S, (Q = p.current) == null || Q.call(p, S));
  }, T = (w) => {
    const z = Cr(Tr(w));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, q = be.useMemo(() => {
    const w = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var S;
        return ((S = u.current) == null ? void 0 : S.call(u, z)) ?? [];
      },
      command: ({ editor: z, range: S, props: A }) => {
        z.chain().focus().insertContentAt(S, { type: "token", attrs: { field: A.field } }).run();
      },
      render: Mr
    };
    return Rr.configure({
      resolve: d.current ?? null,
      suggestion: w,
      onTokenClick: (z, S, A) => {
        var G;
        y.current = A, (G = b.current) == null || G.call(b, z, S, A);
      }
    });
  }, []), m = un({
    immediatelyRender: !1,
    extensions: [
      fn,
      hn.configure({ placeholder: n }),
      mn,
      pn,
      bn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      gn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      q
    ],
    content: wt(e || ""),
    editable: !r,
    onUpdate: ({ editor: w }) => {
      L.current(T(w.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: w }) => {
      O(w), _(w);
    }
  });
  return U(() => {
    if (!m || m.isFocused) return;
    T(m.getHTML()) !== e && (I.current = null, m.commands.setContent(wt(e || ""), { emitUpdate: !1 }), O(m));
  }, [e, m]), U(() => {
    m && m.setEditable(!r);
  }, [r, m]), U(() => {
    m && (I.current = null, O(m), _(m));
  }, [m]), Ut(s, () => ({
    exec: (w, z) => {
      if (!(!m || B.current))
        switch (w) {
          case "bold":
            m.chain().focus().toggleBold().run();
            break;
          case "italic":
            m.chain().focus().toggleItalic().run();
            break;
          case "underline":
            m.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            m.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            z && m.chain().focus().setColor(z).run();
            break;
          case "unsetColor":
            m.chain().focus().unsetColor().run();
            break;
          case "link":
            z && m.chain().focus().extendMarkRange("link").setLink({ href: z }).run();
            break;
          case "unlink":
            m.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => m == null ? void 0 : m.commands.focus(),
    insertToken: (w) => {
      !m || B.current || m.chain().focus().insertContent({ type: "token", attrs: { field: w } }).run();
    },
    replaceToken: (w) => {
      if (!m || B.current) return;
      const z = y.current;
      z != null && m.commands.command(({ tr: S }) => {
        const A = S.doc.nodeAt(z);
        if (!A || A.type.name !== "token") return !1;
        S.setNodeMarkup(z, void 0, { field: w });
        const G = S.doc.resolve(z);
        return G.nodeAfter && G.nodeAfter.type.name === "token" && S.setSelection(new Ie(G)), !0;
      });
    }
  }), [m]), /* @__PURE__ */ o(dn, { editor: m, className: `richtext-editor ${c || ""}` });
});
Ar.displayName = "RichTextEditor";
const Pr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Or = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], kt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), So = ({ value: e, disabled: t, onChange: n }) => {
  const [r, c] = W(!1);
  return /* @__PURE__ */ o(
    Be,
    {
      open: r,
      onOpenChange: c,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${Wt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ o(Et, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Pr.map((i) => /* @__PURE__ */ o(Ln, { onClick: () => {
        n(i), c(!1);
      }, icon: i === e ? /* @__PURE__ */ o($t, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: i }, children: i }) }, i))
    }
  );
}, Ir = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, c] = W(!1), [i, a] = W(""), f = () => {
    var h;
    const l = i.trim();
    l && ((h = e.current) == null || h.exec("link", l), c(!1));
  };
  return /* @__PURE__ */ o(
    Be,
    {
      open: r,
      onOpenChange: c,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (l) => l.preventDefault(),
          className: `${Bt} ${n ? Ft : Kt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(en, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ N("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ o(
          "input",
          {
            value: i,
            onChange: (l) => a(l.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (l) => {
              l.key === "Enter" && (l.preventDefault(), f());
            },
            className: br + " w-full"
          }
        ),
        /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: f, className: Qe, disabled: !i.trim(), children: "Apply" }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                var l;
                (l = e.current) == null || l.exec("unlink"), c(!1);
              },
              className: Qe,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Lo = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: c }) => {
  const [i, a] = W(!1), f = (s, d) => {
    var u;
    return (u = e.current) == null ? void 0 : u.exec(s, d);
  }, l = (s) => `${Bt} ${s ? Ft : Kt}`, h = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ N("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: t || h("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("bold"), className: `${l(((n == null ? void 0 : n.bold) ?? !1) || h("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: t || h("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("italic"), className: `${l(((n == null ? void 0 : n.italic) ?? !1) || h("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o($e, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("underline"), className: l((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Jt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o($e, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("strikeThrough"), className: l((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(Qt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(Ir, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(
      Be,
      {
        open: i,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${Wt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(kt, {}),
          /* @__PURE__ */ o(Et, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                f("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(kt, { className: "w-3.5 h-3.5" })
            }
          ),
          Or.map((s) => /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                f("foreColor", s), a(!1);
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
    c && /* @__PURE__ */ N(me, { children: [
      /* @__PURE__ */ o("div", { className: Pe }),
      c
    ] })
  ] });
};
export {
  po as Button,
  Qn as Checkbox,
  bo as Checklist,
  Co as ChromeHeader,
  $o as ContentRow,
  oo as ContextMenu,
  so as ContextMenuDivider,
  io as ContextMenuItem,
  co as ContextMenuSub,
  go as DatePicker,
  uo as DialogProvider,
  Ln as DropdownItem,
  Be as DropdownMenu,
  Mn as DropdownSubmenu,
  ct as DropdownThemeContext,
  Pr as FONTS,
  yo as FloatingChrome,
  So as FontMenu,
  Lo as FormatToolbar,
  E as IS_COARSE,
  kn as IS_TOUCH_CAPABLE,
  ro as ItemManagerDropdown,
  ho as LongPressMenuProvider,
  rt as MORPH_EASE,
  ve as MORPH_MS,
  ot as MORPH_OPACITY_MS,
  He as MenuHighlightContext,
  Gn as Modal,
  lo as ModalFooter,
  Le as ModalFooterButton,
  vn as PopoutWindowContext,
  Ro as RICH_TEXT_STATE_IDLE,
  xo as RadioList,
  Ar as RichTextEditor,
  No as SectionHeader,
  ko as Seg,
  zo as StructureControls,
  lt as SubmenuContext,
  Qe as TB_BTN,
  De as TB_BTN_ICON,
  gr as TB_DANGER,
  Pe as TB_DIVIDER,
  br as TB_INPUT,
  wo as TB_NUM,
  Wt as TB_PICKER,
  vo as TB_ROW_LABEL,
  xr as TB_SEG,
  Bt as TB_TOGGLE,
  Kt as TB_TOGGLE_OFF,
  Ft as TB_TOGGLE_ON,
  Rr as Token,
  Er as TokenChipView,
  Me as ToolButton,
  $e as Tooltip,
  it as ZOOM_FROM,
  zn as cloneOverlayClose,
  To as escapeHtml,
  Pt as getDropdownClasses,
  eo as getHardwareKeyboard,
  Qr as getLastPointerType,
  lr as isInteractiveElement,
  Ge as isTouchLike,
  St as nearestOverlayOrigin,
  qt as normalizeSpaces,
  Fe as overlayMorphEnabled,
  Cn as playOverlayClose,
  $n as playOverlayOpen,
  wt as preprocessTokenHtml,
  Cr as sanitizeRichText,
  Eo as stripRichText,
  Tr as stripTokenWrappers,
  wn as useCurrentDocument,
  we as useCurrentWindow,
  ao as useDialog,
  At as useDropdownTheme,
  En as useFixedPosition,
  to as useHardwareKeyboard,
  Nn as useLastPointerType,
  fo as useLongPressOptOut,
  at as useMenuHighlight,
  st as useOverlayMorph,
  nt as usePopoutWindow,
  Te as usePortalTarget,
  no as useSmartPosition,
  mo as useTouchMode
};
