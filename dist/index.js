"use client";
import { jsxs as $, jsx as i, Fragment as he } from "react/jsx-runtime";
import ge, { createContext as Ce, useContext as ze, useState as K, useEffect as U, useRef as b, useCallback as Z, useLayoutEffect as le, useMemo as Le, useImperativeHandle as qt } from "react";
import * as V from "@radix-ui/react-dropdown-menu";
import { Check as Nt, X as Ye, Pencil as Yt, Copy as $t, Trash2 as Ue, RotateCcw as Ct, Plus as Ut, ChevronRight as je, ChevronLeft as jt, ArrowUp as Xt, ArrowDown as Vt, ChevronDown as zt, Underline as Gt, Strikethrough as Zt, Link as Jt } from "lucide-react";
import * as fe from "@radix-ui/react-dialog";
import { createPortal as Qe } from "react-dom";
import { useFloating as Qt, autoUpdate as en, offset as tn, flip as nn, shift as rn } from "@floating-ui/react-dom";
import { mergeAttributes as on, ReactNodeViewRenderer as sn, NodeViewWrapper as cn, useEditor as ln, EditorContent as an } from "@tiptap/react";
import { NodeSelection as Pe } from "@tiptap/pm/state";
import un from "@tiptap/starter-kit";
import dn from "@tiptap/extension-placeholder";
import { TextStyle as fn } from "@tiptap/extension-text-style";
import hn from "@tiptap/extension-color";
import mn from "@tiptap/extension-link";
import pn from "@tiptap/extension-underline";
import { Mention as gn } from "@tiptap/extension-mention";
import { createRoot as bn } from "react-dom/client";
const xn = Ce(null);
function et() {
  return ze(xn);
}
function Te() {
  const e = et();
  return e ? e.document.body : null;
}
function yn() {
  const e = et();
  return e ? e.document : typeof document < "u" ? document : null;
}
function we() {
  return et() ?? (typeof window < "u" ? window : null);
}
const Ee = typeof window < "u", T = Ee && window.matchMedia("(pointer: coarse)").matches, wn = Ee && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Xe(e) {
  return e === "touch" || e === "pen";
}
let xe = null;
const Ve = /* @__PURE__ */ new Set();
Ee && window.addEventListener("pointerdown", (e) => {
  xe = e.pointerType, Ve.forEach((t) => t());
}, !0);
function Zr() {
  return xe;
}
function vn() {
  const [, e] = K(0), t = b(xe);
  return U(() => {
    const n = () => {
      t.current !== xe && (t.current = xe, e((r) => r + 1));
    };
    return Ve.add(n), () => {
      Ve.delete(n);
    };
  }, []), xe;
}
const Tt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Et() {
  return Ee ? Tt.some((e) => window.matchMedia(e).matches) : !1;
}
let Oe = Et();
const Ge = /* @__PURE__ */ new Set();
function mt(e) {
  Oe !== e && (Oe = e, Ge.forEach((t) => t()));
}
var kt;
if (Ee) {
  const e = () => mt(Et());
  for (const a of Tt) {
    const u = window.matchMedia(a);
    (kt = u.addEventListener) == null || kt.call(u, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (a) => {
    a.isComposing || a.keyCode !== 229 && (a.key === "Enter" || a.key === "Backspace" || a.key === "Process" || a.key === "Unidentified" || mt(!0));
  });
  let n = null, r = null;
  const s = "__penClick", c = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (a) => {
    a.pointerType !== "pen" || a.button !== 0 || (n = { x: a.clientX, y: a.clientY });
  }, !0), window.addEventListener("pointerup", (a) => {
    if (a.pointerType !== "pen") return;
    const u = n;
    if (n = null, !u || Math.hypot(a.clientX - u.x, a.clientY - u.y) > 8) return;
    const l = a.target;
    if (!l || !l.isConnected) return;
    if (l instanceof HTMLInputElement && c.has(l.type)) {
      try {
        l.showPicker();
      } catch {
      }
      return;
    }
    const f = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    f[s] = !0, r = { x: a.clientX, y: a.clientY, time: Date.now() }, l.dispatchEvent(f);
  }, !0), window.addEventListener("click", (a) => {
    a[s] || r && Date.now() - r.time < 1e3 && Math.hypot(a.clientX - r.x, a.clientY - r.y) < 12 && (a.preventDefault(), a.stopPropagation());
  }, !0);
}
function Jr() {
  return Oe;
}
function Qr() {
  const [, e] = K(0);
  return U(() => {
    const t = () => e((n) => n + 1);
    return Ge.add(t), () => {
      Ge.delete(t);
    };
  }, []), Oe;
}
const ye = 220, tt = "cubic-bezier(0.32, 0.72, 0, 1)", nt = 170, rt = 0.94;
function He(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Rt(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function St(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return Rt({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function kn(e, t, n, r) {
  const s = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${rt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === s && requestAnimationFrame(() => {
      if (e.current !== s) return;
      const a = St(t, n);
      t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transition = `transform ${ye}ms ${tt}, opacity ${nt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === s && (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, r == null || r());
      }, ye + 60);
    });
  });
}
function Nn(e, t, n, r) {
  const s = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, a = St(t, n);
  t.style.transition = `transform ${ye}ms ${tt}, opacity ${nt}ms ease`, t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transform = `scale(${rt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === s && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== s || t.isConnected || (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, t.style.pointerEvents = c.pointerEvents, t.style.visibility = c.visibility);
    }));
  }, ye + 60);
}
function $n(e, t, n) {
  const r = e.cloneNode(!0), s = e.getBoundingClientRect(), c = s.width > 0 || s.height > 0 ? s : n ?? s;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${c.left}px`, r.style.top = `${c.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const a = (t == null ? void 0 : t()) ?? null, u = a ? Rt({ left: c.left, top: c.top, width: c.width, height: c.height }, a) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${ye}ms ${tt}, opacity ${nt}ms ease`, r.style.transform = `scale(${rt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, ye + 60));
    });
  });
}
function it(e) {
  const t = b(null), [n, r] = K(!1), s = b(null), c = b(0), a = Z((x) => {
    if (e.ref && (e.ref.current = x), x) {
      c.current = 0, t.current = x;
      const E = x.getBoundingClientRect();
      (E.width > 0 || E.height > 0) && (s.current = { left: E.left, top: E.top, width: E.width, height: E.height }), r(!0);
      return;
    }
    const w = t.current, v = ++c.current;
    queueMicrotask(() => {
      v === c.current && t.current === w && (t.current = null, r(!1), !(!w || !e.cloneOnUnmount || !l.current) && w.style.visibility !== "hidden" && He(d.current) && $n(w, o.current, s.current));
    });
  }, []), u = Z(() => {
    const x = t.current;
    if (!x || getComputedStyle(x).transform !== "none") return;
    const w = x.getBoundingClientRect();
    (w.width > 0 || w.height > 0) && (s.current = { left: w.left, top: w.top, width: w.width, height: w.height });
  }, []), l = b(e.visible);
  l.current = e.visible;
  const f = b(e.visible), o = b(e.anchor ?? null);
  o.current = e.anchor ?? null;
  const h = b(e.onClosed);
  h.current = e.onClosed;
  const d = b(e.morph !== !1);
  d.current = e.morph !== !1;
  const p = b(0);
  return le(() => {
    if (!n || !l.current || !He(d.current)) return;
    const x = t.current;
    x && kn(p, x, o.current);
  }, [n, e.visible]), U(() => {
    if (!n || !l.current) return;
    let x = 0;
    const w = () => {
      x = 0, u(), x = requestAnimationFrame(w);
    };
    return x = requestAnimationFrame(w), () => {
      x && cancelAnimationFrame(x);
    };
  }, [n, u]), le(() => {
    var v;
    const x = f.current;
    if (f.current = e.visible, e.visible || !x) return;
    const w = t.current;
    if (!w || !He(d.current)) {
      (v = h.current) == null || v.call(h);
      return;
    }
    Nn(p, w, o.current, () => {
      var E;
      return (E = h.current) == null ? void 0 : E.call(h);
    });
  }, [e.visible]), U(() => {
    if (!n || !l.current) return;
    const x = (w) => {
      const v = t.current;
      v && v.contains(w.target) && w.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", x, { capture: !0 }), () => document.removeEventListener("wheel", x, { capture: !0 });
  }, [n]), a;
}
function ei(e, t) {
  const n = we(), r = b(n);
  r.current = n, le(() => {
    if (!t || !e.current) return;
    const s = e.current.querySelector(".absolute");
    if (!s) return;
    s.style.left = "", s.style.right = "", s.style.top = "", s.style.bottom = "", s.style.maxHeight = "";
    const c = r.current;
    if (!c) return;
    const a = e.current.getBoundingClientRect(), u = s.getBoundingClientRect(), l = c.innerWidth, f = c.innerHeight, o = u.right - l;
    if (o > 0) {
      const h = Math.min(o + 8, u.left);
      s.style.left = `${u.left - a.left - h}px`;
    }
    u.left < 0 && (s.style.left = `${-a.left + 4}px`), u.bottom > f + 4 && (s.style.top = "auto", s.style.bottom = "100%", s.getBoundingClientRect().top < 0 && (s.style.bottom = "auto", s.style.top = `${-a.top + 4}px`, s.style.maxHeight = `${f - 8}px`));
  }, [t, e]);
}
function Cn(e, t, n, r) {
  const s = we(), c = b(s);
  c.current = s, le(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let u = 0;
    const l = () => {
      var W, Y;
      u = 0;
      const d = a.getBoundingClientRect(), p = c.current;
      if (!p) return;
      const x = p.innerWidth, w = ((W = p.visualViewport) == null ? void 0 : W.height) ?? p.innerHeight, v = ((Y = p.visualViewport) == null ? void 0 : Y.offsetTop) ?? 0, E = (r == null ? void 0 : r.panelWidth) ?? Math.max(d.width, 200), A = 4, P = 120;
      let O = Math.max(0, d.left);
      O + E > x && (O = Math.max(0, x - E - 8));
      const C = v + w - d.bottom - A - 16, I = d.top - v - A - 16;
      if (C >= P || C >= I) {
        const m = Math.min(d.bottom + A, v + w), y = Math.max(P, v + w - m - 16);
        n({ top: m, left: O, width: d.width, maxH: y });
      } else {
        const m = Math.max(P, Math.min(I, 360)), y = v + w - (d.top - A);
        n({ top: 0, left: O, width: d.width, maxH: m, bottom: Math.max(0, y) });
      }
    }, f = () => {
      u || (u = requestAnimationFrame(l));
    }, o = c.current ?? null, h = (o == null ? void 0 : o.document) ?? null;
    return f(), h == null || h.addEventListener("scroll", f, { capture: !0, passive: !0 }), o == null || o.addEventListener("resize", f), () => {
      u && cancelAnimationFrame(u), h == null || h.removeEventListener("scroll", f, { capture: !0 }), o == null || o.removeEventListener("resize", f);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let be = null;
function Dt(e) {
  return be == null || be(), be = e, () => {
    be === e && (be = null);
  };
}
const ot = Ce("dark"), Mt = () => ze(ot), zn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", pt = T ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Tn = T ? "text-xs" : "text-[10px]";
function At(e) {
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
    headerPad: pt,
    headerText: `${pt} font-semibold uppercase tracking-wider ${Tn} ui-label`,
    // Item padding
    itemPad: zn,
    // Input
    input: T ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: T ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
function Lt(e) {
  const t = [];
  return ge.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (ge.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const st = Ce({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Ie = Ce(null), ct = () => ze(Ie);
function lt() {
  const e = b([]), [t, n] = K(-1), [r, s] = K(!1), [c, a] = K(0), u = Z((h) => (e.current = [...e.current, h], a((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== h), a((d) => d + 1);
  }), []), l = Z((h, d) => {
    n(h), s(d === "pointer");
  }, []), f = Z(() => {
    s((h) => h && (n(-1), !1));
  }, []);
  return Le(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: u,
    setHighlighted: l,
    pointerLeave: f
  }), [t, r, c, u, l, f]);
}
function at(e, t, n, r) {
  const s = b(-1);
  s.current = t.highlightedIndex;
  const c = b(t);
  c.current = t;
  const a = b(e);
  a.current = e;
  const u = b(r);
  u.current = r;
  const l = b({ text: "", time: 0 }), f = b(!1);
  f.current || (f.current = !0, n.current = (o) => {
    var d, p;
    if (!a.current) return;
    const h = c.current.items;
    if (h.length !== 0) {
      if (o.key === "ArrowDown" || o.key === "ArrowUp") {
        o.preventDefault(), o.stopImmediatePropagation();
        const x = o.key === "ArrowDown" ? 1 : -1, w = (s.current + x + h.length) % h.length;
        c.current.setHighlighted(w, "keyboard");
      } else if (o.key === "ArrowRight") {
        o.preventDefault(), o.stopImmediatePropagation();
        const x = s.current;
        x >= 0 && x < h.length && h[x].submenu && h[x].activate();
      } else if (o.key === "ArrowLeft")
        o.preventDefault(), o.stopImmediatePropagation(), (p = (d = u.current) == null ? void 0 : d.onCloseSub) == null || p.call(d);
      else if (o.key === "Enter" || o.key === " ") {
        o.preventDefault(), o.stopImmediatePropagation();
        const x = s.current;
        x >= 0 && x < h.length && h[x].activate();
      } else if (o.key.length === 1 && !o.ctrlKey && !o.metaKey && !o.altKey) {
        o.preventDefault(), o.stopImmediatePropagation();
        const x = Date.now(), w = (x - l.current.time > 500 ? "" : l.current.text) + o.key.toLowerCase();
        if (l.current = { text: w, time: x }, !w) return;
        const v = s.current + 1;
        for (let E = 0; E < h.length; E++) {
          const A = (v + E) % h.length;
          if (h[A].label.toLowerCase().startsWith(w)) {
            c.current.setHighlighted(A, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ut(e, t, n, r, s, c) {
  const a = b(t);
  a.current = t;
  const u = b(e);
  u.current = e;
  const l = b(s);
  l.current = s;
  const f = b(!1);
  f.current || (f.current = !0, c.current = (o) => {
    if (!u.current || l.current) return;
    const h = r.current;
    h && h.contains(o.target) || a.current.items.length === 0 || !(o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === "ArrowLeft" || o.key === "ArrowRight" || o.key === "Enter" || o.key === " " || o.key.length === 1 && !o.ctrlKey && !o.metaKey && !o.altKey) || (o.preventDefault(), o.stopImmediatePropagation(), n.current(o));
  });
}
function dt(e, t) {
  const n = b(e);
  n.current = e;
  const r = b(!1);
  r.current || (r.current = !0, t.current = (s) => {
    if (!n.current) return;
    const c = s.currentTarget;
    c.scrollHeight > c.clientHeight && (s.preventDefault(), c.scrollTop += s.deltaY);
  });
}
function _e({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: s = "left",
  width: c,
  theme: a = "dark",
  children: u,
  morph: l = !0,
  contentClassName: f,
  initialHighlightIndex: o
}) {
  const [h, d] = K([]), [p, x] = K(null), w = Te(), v = b(null), E = b(null), A = b(e);
  A.current = e;
  const [P, O] = K(e), C = lt();
  U(() => {
    if (e)
      return O(!0), C.setHighlighted(o ?? -1, "keyboard"), Dt(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, o, n, t]);
  const I = Z(() => {
    const B = v.current;
    if (!B) return null;
    const g = B.getBoundingClientRect();
    return { left: g.left, top: g.top, width: g.width, height: g.height };
  }, []), W = it({
    visible: e,
    morph: l,
    anchor: I,
    onClosed: () => O(!1)
  }), Y = b(() => {
  }), m = b(() => {
  }), y = b(() => {
  });
  at(e && h.length === 0, C, Y), dt(e, m), ut(e, C, Y, E, h.length > 0, y);
  const z = b(null), S = Z((B) => {
    var g;
    if (B) {
      B.addEventListener("keydown", Y.current, { capture: !0 }), B.addEventListener("wheel", m.current, { passive: !1 });
      const M = B.ownerDocument;
      z.current = M, M.addEventListener("keydown", y.current, { capture: !0 }), R(B.offsetWidth), j(!0);
    } else
      (g = z.current) == null || g.removeEventListener("keydown", y.current, { capture: !0 }), z.current = null, j(!1);
    E.current = B, W(B);
  }, [W]), [D, G] = K({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [N, _] = K(0), [Q, j] = K(!1), [ne, R] = K(0);
  U(() => {
    e && v.current && _(v.current.getBoundingClientRect().width);
  }, [e]);
  const H = Le(() => ({ panelWidth: ne || N || void 0 }), [ne, N]);
  Cn(v, e && Q, (B) => G({ ...B, maxH: Math.min(B.maxH, 384), ready: !0 }), H), U(() => {
    if (D.ready && e) {
      const B = E.current;
      B && B.ownerDocument.activeElement !== B && !B.contains(B.ownerDocument.activeElement) && B.focus();
    }
  }, [D.ready, e]), le(() => {
    var g;
    if (!e || C.highlightedIndex < 0) return;
    const B = (g = E.current) == null ? void 0 : g.querySelector(`[data-ei="${C.highlightedIndex}"]`);
    B == null || B.scrollIntoView({ block: "nearest" });
  }, [e, C.highlightedIndex]);
  const L = Z((B) => {
    !B && !A.current || (!B && J.current && (se.current = !0), n ? n(B) : B || t == null || t());
  }, [n, t]), k = b(P);
  k.current = P;
  const J = b(!1), se = b(!1), me = Z(() => {
    if (!A.current && k.current) {
      if (se.current) {
        se.current = !1, J.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), pe = ge.isValidElement(r) ? r : null, ae = pe ? ge.cloneElement(pe, {
    ref: (B) => {
      v.current = B;
    },
    onPointerDown: () => {
      J.current = !0, se.current = !1;
    },
    onClick: (B) => {
      var g, M;
      (M = (g = pe.props).onClick) == null || M.call(g, B), me();
    }
  }) : r;
  return /* @__PURE__ */ $(V.Root, { open: e || P, onOpenChange: L, modal: !1, children: [
    /* @__PURE__ */ i(V.Trigger, { asChild: !0, children: ae }),
    /* @__PURE__ */ i(V.Portal, { container: w ?? void 0, children: /* @__PURE__ */ i(ot.Provider, { value: a, children: /* @__PURE__ */ i(st.Provider, { value: { chain: h, setChain: d, morph: l, keyboardOpened: p, setKeyboardOpened: x }, children: /* @__PURE__ */ i(Ie.Provider, { value: C, children: /* @__PURE__ */ i(
      V.Content,
      {
        ref: S,
        "data-theme": a,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${c || ""} ${f || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: D.left,
          top: D.bottom != null ? void 0 : D.top,
          bottom: D.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: c ? void 0 : N || void 0,
          maxHeight: D.maxH,
          visibility: D.ready ? "visible" : "hidden"
        },
        onPointerLeave: C.pointerLeave,
        children: u
      }
    ) }) }) }) })
  ] });
}
function ti({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: s,
  onRename: c,
  onDuplicate: a,
  onDelete: u,
  onCreate: l,
  onImport: f,
  onExport: o,
  onReset: h,
  onTrash: d,
  closeOnSelect: p,
  readOnly: x = !1,
  theme: w,
  align: v,
  label: E,
  header: A,
  itemLabel: P,
  trigger: O,
  minItems: C = 1,
  itemRender: I,
  morph: W = !0,
  contentClassName: Y
}) {
  const m = At(), [y, z] = K(null), [S, D] = K(""), G = b(null), N = b(null);
  U(() => {
    e && requestAnimationFrame(() => {
      var R, H;
      (H = (R = N.current) == null ? void 0 : R.querySelector('[data-active="1"]')) == null || H.scrollIntoView({ block: "nearest" });
    });
  }, [e]), U(() => {
    var L;
    if (!e) return;
    const R = (k) => {
      var de, B, g, M, F;
      if ((B = (de = k.target) == null ? void 0 : de.closest) != null && B.call(de, "input, textarea, [contenteditable]")) return;
      const J = (g = N.current) == null ? void 0 : g.closest(".ui-menu");
      if (!J || !J.contains(k.target)) return;
      const se = J.ownerDocument, me = [...J.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], pe = [...J.querySelectorAll('div:last-child > [role="menuitem"]')], ae = [...me, ...pe];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const X = se.activeElement;
        let q = X ? ae.indexOf(X) : -1;
        if (q < 0 && X) {
          const te = X.closest("[data-active]"), ce = te == null ? void 0 : te.querySelector('[role="menuitem"]:first-child');
          ce && (q = me.indexOf(ce));
        }
        const ee = k.key === "ArrowDown" ? 1 : -1, re = q < 0 ? ee === 1 ? 0 : ae.length - 1 : (q + ee + ae.length) % ae.length;
        (M = ae[re]) == null || M.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const X = se.activeElement, q = X == null ? void 0 : X.closest("[data-active]");
        if (!q) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const ee = [...q.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ee.length === 0) return;
        const re = X && q.contains(X) ? ee.indexOf(X) : -1, te = k.key === "ArrowRight" ? 1 : -1, ce = re < 0 ? 0 : (re + te + ee.length) % ee.length;
        (F = ee[ce]) == null || F.focus({ preventScroll: !0 });
        return;
      }
    }, H = ((L = N.current) == null ? void 0 : L.ownerDocument) ?? null;
    return H == null || H.addEventListener("keydown", R, { capture: !0 }), () => H == null ? void 0 : H.removeEventListener("keydown", R, { capture: !0 });
  }, [e]), U(() => {
    if (y) {
      requestAnimationFrame(() => {
        var H, L;
        (H = G.current) == null || H.focus(), (L = G.current) == null || L.select();
      });
      const R = n.find((H) => H.id === y);
      R && !S && D(R.name);
    }
  }, [y]), U(() => {
    if (y) {
      const R = n.find((H) => H.id === y);
      R && !S && D(R.name);
    }
  }, [y, n]);
  const _ = (R, H) => {
    z(R), D(H);
  }, Q = () => {
    y && S.trim() && c(y, S.trim()), z(null);
  }, j = () => {
    z(null);
  }, ne = P || A.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ $(_e, { open: e, onOpenChange: (R) => {
    R ? (z(null), D("")) : (y && S.trim() && c(y, S.trim()), z(null), D("")), (!R || !x) && t(R);
  }, width: "w-80", theme: w, align: v, trigger: O, morph: W, contentClassName: Y, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${m.headerText}`, children: A }),
    /* @__PURE__ */ i("div", { ref: N, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((R) => {
      const H = R.id === r, L = y === R.id;
      return /* @__PURE__ */ i("div", { "data-active": H ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${H || L ? m.rowActiveBg : m.rowHoverBg} ${y && !L ? "opacity-40 pointer-events-none" : ""}`, children: L ? /* @__PURE__ */ $(he, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: G,
            value: S,
            onChange: (k) => D(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), Q()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), j());
            },
            className: `w-full border rounded ${m.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${m.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), Q();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(Nt, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${m.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), j();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(Ye, { className: m.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ $(he, { children: [
        /* @__PURE__ */ i(
          V.Item,
          {
            className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none cursor-pointer flex items-center ${m.rowText} ${H ? "" : m.rowTextHover}`,
            onSelect: p ? () => {
              s(R.id);
            } : (k) => {
              k.preventDefault(), s(R.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${H ? m.rowActiveText : ""}`, children: I ? I(R) : R.name })
          }
        ),
        /* @__PURE__ */ i(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${H ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), _(R.id, R.name);
            },
            onTouchStart: () => {
            },
            disabled: x,
            children: /* @__PURE__ */ i(Yt, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${H ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const J = a(R.id);
              J && _(J, `${R.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: x,
            children: /* @__PURE__ */ i($t, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          V.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= C ? m.btnDisabled : H ? m.btnDangerActive : m.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), u(R.id);
            },
            onTouchStart: () => {
            },
            disabled: x || n.length <= C,
            children: /* @__PURE__ */ i(Ue, { className: m.btnIcon })
          }
        )
      ] }) }, R.id);
    }) }),
    /* @__PURE__ */ $("div", { className: `shrink-0 ${y ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ $(he, { children: [
        /* @__PURE__ */ i(V.Separator, { className: m.separator }),
        /* @__PURE__ */ $(
          V.Item,
          {
            className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
            onSelect: (R) => {
              R.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: x,
            children: [
              /* @__PURE__ */ i(Ct, { className: `${m.btnIcon} ${m.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || f || o || d) && /* @__PURE__ */ i(V.Separator, { className: m.separator }),
      l && /* @__PURE__ */ $(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault();
            const H = l();
            H && _(H, "");
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ i(Ut, { className: `${m.btnIcon} ${m.icon}` }),
            "New ",
            ne
          ]
        }
      ),
      f && /* @__PURE__ */ $(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ $("svg", { className: `${m.btnIcon} ${m.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      o && /* @__PURE__ */ $(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), o();
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ $("svg", { className: `${m.btnIcon} ${m.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ $(
        V.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ i(Ue, { className: `${m.btnIcon} ${m.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const En = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Rn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: s = "",
  children: c,
  keepOpen: a = !1,
  selected: u = !1,
  rightAction: l,
  trailing: f
}) {
  Mt();
  const o = At(), h = b(!1), d = b(null), p = ct(), x = b(p);
  x.current = p;
  const w = b(null);
  U(() => {
    var O;
    const P = {
      label: Lt(c),
      activate: () => {
        n || e();
      }
    };
    return w.current = P, (O = x.current) == null ? void 0 : O.register(P);
  }, []);
  const v = p && w.current ? p.items.indexOf(w.current) : -1, E = !n && v >= 0 && v === p.highlightedIndex, A = r === "danger" ? o.itemDanger : o.itemDefault;
  return /* @__PURE__ */ $(
    V.Item,
    {
      ref: d,
      "data-ei": v >= 0 ? v : void 0,
      className: `w-full text-left ${En} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${A} ${u ? "ui-item-selected" : ""} ${E ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${s}`,
      onSelect: (P) => {
        if (h.current) {
          h.current = !1;
          return;
        }
        a && P.preventDefault(), e();
      },
      onPointerEnter: () => {
        !n && p && v >= 0 && p.setHighlighted(v, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${o.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: c }),
        f && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: f }),
        l && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${o.rightAction}`,
            title: l.title,
            onPointerDown: (P) => {
              P.stopPropagation(), P.preventDefault(), h.current = !0, l.onClick();
            },
            onClick: (P) => {
              P.stopPropagation(), P.preventDefault();
            },
            children: l.icon
          }
        )
      ]
    }
  );
}
const Sn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Dn({ id: e, label: t, icon: n, width: r, side: s = "right", children: c, contentClassName: a }) {
  const { chain: u, setChain: l, morph: f, keyboardOpened: o, setKeyboardOpened: h } = ze(st), d = u.includes(e), p = u[u.length - 1] === e, x = Mt(), w = Te(), v = b(null), E = b(null), [A, P] = K(d), O = !d && A;
  U(() => {
    d && P(!0);
  }, [d]);
  const C = () => l((L) => {
    const k = L.indexOf(e);
    return k >= 0 ? L.slice(0, k) : L;
  }), I = lt(), W = ct(), Y = b(W);
  Y.current = W;
  const m = b(null);
  U(() => {
    var k;
    const L = {
      label: t,
      activate: () => {
        h(e), l((J) => J.includes(e) ? J : [...J, e]);
      },
      submenu: !0
    };
    return m.current = L, (k = Y.current) == null ? void 0 : k.register(L);
  }, []);
  const y = W && m.current ? W.items.indexOf(m.current) : -1, z = y >= 0 && y === W.highlightedIndex, S = Z(() => {
    const L = v.current;
    if (!L) return null;
    const k = L.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), D = it({
    visible: d,
    morph: f,
    anchor: S,
    onClosed: () => P(!1)
  }), G = b(() => {
  }), N = b(() => {
  }), _ = b(() => {
  });
  at(d && p, I, G, {
    onCloseSub: () => {
      C(), W && y >= 0 && W.setHighlighted(y, "keyboard");
    }
  });
  const Q = b(o);
  Q.current = o, U(() => {
    d && (Q.current === e ? (I.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var L;
      return (L = E.current) == null ? void 0 : L.focus();
    }), h(null)) : I.setHighlighted(-1, "keyboard"));
  }, [d]), dt(d, N), ut(d, I, G, E, !p, _), ge.useLayoutEffect(() => {
    var k;
    if (!d || I.highlightedIndex < 0) return;
    const L = (k = E.current) == null ? void 0 : k.querySelector(`[data-ei="${I.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [d, I.highlightedIndex]);
  const j = b(null), ne = Z((L) => {
    var k;
    if (L) {
      L.addEventListener("keydown", G.current, { capture: !0 }), L.addEventListener("wheel", N.current, { passive: !1 });
      const J = L.ownerDocument;
      j.current = J, J.addEventListener("keydown", _.current, { capture: !0 });
    } else
      (k = j.current) == null || k.removeEventListener("keydown", _.current, { capture: !0 }), j.current = null;
    E.current = L, D(L);
  }, [D]), R = `w-full text-left ${Sn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${z ? " ui-item-highlighted" : ""}${O ? " ui-sub-closing" : ""}`, H = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ $(V.Sub, { open: d || A, onOpenChange: (L) => l((k) => {
    if (!L) {
      const J = k.indexOf(e);
      return J >= 0 ? k.slice(0, J) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ $(
      V.SubTrigger,
      {
        ref: v,
        "data-ei": y >= 0 ? y : void 0,
        className: R,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          W && y >= 0 && W.setHighlighted(y, "pointer");
        },
        onPointerDown: (L) => {
          L.pointerType === "pen" && (L.preventDefault(), l((k) => d ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          s === "left" && /* @__PURE__ */ i(je, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ $("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          s === "right" && /* @__PURE__ */ i(je, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(V.Portal, { container: w ?? void 0, children: /* @__PURE__ */ i(
      V.SubContent,
      {
        ref: ne,
        "data-theme": x,
        className: H,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: I.pointerLeave,
        children: /* @__PURE__ */ i(Ie.Provider, { value: I, children: c })
      }
    ) })
  ] });
}
const ve = 8, Mn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", An = T ? "text-sm" : "text-xs", ni = ({ open: e, x: t, y: n, onClose: r, children: s, containerRef: c, morph: a = !0 }) => {
  const u = b(null), l = we(), [f, o] = K(!1), [h, d] = K([]), [p, x] = K(null), w = lt();
  U(() => {
    if (e)
      return w.setHighlighted(-1, "keyboard"), Dt(r);
  }, [e, r]);
  const v = b({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const E = Z(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), A = it({
    visible: !0,
    morph: a,
    anchor: E,
    cloneOnUnmount: !0
  }), P = b(() => {
  }), O = b(() => {
  }), C = b(() => {
  });
  at(e, w, P), dt(e, O), ut(e, w, P, u, h.length > 0, C);
  const I = b(null), W = Z((y) => {
    var z;
    if (y) {
      y.addEventListener("keydown", P.current, { capture: !0 }), y.addEventListener("wheel", O.current, { passive: !1 });
      const S = y.ownerDocument;
      I.current = S, S.addEventListener("keydown", C.current, { capture: !0 });
    } else
      (z = I.current) == null || z.removeEventListener("keydown", C.current, { capture: !0 }), I.current = null;
    u.current = y, o(!!y), A(y);
  }, [A]), [Y, m] = K(null);
  return le(() => {
    var R;
    if (!e || !f || !u.current) return;
    const y = u.current, z = y.offsetWidth, S = y.offsetHeight, D = (R = c == null ? void 0 : c.current) == null ? void 0 : R.getBoundingClientRect(), G = D ? D.right : (l == null ? void 0 : l.innerWidth) ?? 0, N = D ? D.bottom : (l == null ? void 0 : l.innerHeight) ?? 0, _ = D ? D.left : 0, Q = D ? D.top : 0;
    let j = Math.max(Q + ve, v.current.top), ne = Math.max(_ + ve, v.current.left);
    ne + z > G && (ne = G - z - ve), j + S > N && (j = Math.max(Q + ve, N - S - ve)), m({ left: ne, top: j });
  }, [e, f, t, n, c]), e ? /* @__PURE__ */ $(V.Root, { open: e, onOpenChange: (y) => {
    y || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(V.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(V.Portal, { children: /* @__PURE__ */ i(ot.Provider, { value: "light", children: /* @__PURE__ */ i(st.Provider, { value: { chain: h, setChain: d, morph: a, keyboardOpened: p, setKeyboardOpened: x }, children: /* @__PURE__ */ i(Ie.Provider, { value: w, children: /* @__PURE__ */ i(
      V.Content,
      {
        ref: W,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${An} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (Y == null ? void 0 : Y.left) ?? v.current.left, top: (Y == null ? void 0 : Y.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: s
      }
    ) }) }) }) })
  ] }) : null;
}, ri = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: s = !1, trailing: c, children: a }) => {
  const u = ct(), l = b(u);
  l.current = u;
  const f = b(null);
  U(() => {
    var p;
    const d = { label: Lt(a), activate: () => {
      r || e();
    } };
    return f.current = d, (p = l.current) == null ? void 0 : p.register(d);
  }, []);
  const o = u && f.current ? u.items.indexOf(f.current) : -1, h = !r && o >= 0 && o === u.highlightedIndex;
  return /* @__PURE__ */ $(
    V.Item,
    {
      "data-ei": o >= 0 ? o : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && o >= 0 && u.setHighlighted(o, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${Mn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${s ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: a }),
        c && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: c })
      ]
    }
  );
}, ii = () => /* @__PURE__ */ i(V.Separator, { className: "ui-sep my-1" }), oi = (e) => /* @__PURE__ */ i(Dn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), ie = 32, Pt = "[data-modal-stack]", ue = 220, $e = "cubic-bezier(0.32, 0.72, 0, 1)", Me = 0.94;
function ke() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ot(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function gt(e, t, n, r) {
  const s = ++e.current, c = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = Ot(c, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === s && (t.style.transition = `transform ${ue}ms ${$e}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === s && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ue + 80));
    });
  });
}
function Ln(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${Me})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${ue}ms ${$e}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ue + 60));
    });
  });
}
function bt(e, t, n) {
  const r = ++e.current, s = t.getBoundingClientRect(), c = 1 - Me, a = { left: s.left + s.width * c / 2, top: s.top + s.height * c / 2, width: s.width * Me, height: s.height * Me };
  t.style.transition = `transform ${ue}ms ${$e}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = Ot(s, a), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ue + 60);
}
function Be(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Pt) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Fe(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Pt) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Pn = T ? "px-6" : "px-5", On = T ? "py-3" : "py-2.5", In = T ? "text-sm" : "text-xs", _n = T ? "w-4 h-4" : "w-3.5 h-3.5", Hn = T ? "text-base" : "text-sm", Bn = T ? "w-5 h-5" : "w-4 h-4", Ke = T ? "px-6" : "px-5", Fn = T ? "pt-6" : "pt-5", Kn = T ? "pb-6" : "pb-5", Wn = T ? "text-xs" : "text-[10px]", qn = T ? "w-3.5 h-3.5" : "w-3 h-3", Yn = T ? "px-2.5 py-1.5" : "px-2 py-1", Un = T ? "px-6" : "px-5", jn = T ? "py-3" : "py-2";
function Xn({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: s,
  footer: c,
  children: a,
  onReset: u,
  morph: l = !0,
  flat: f = !1
}) {
  const o = b(null), h = b(null), d = b(null), [p, x] = K(!1), w = Z((g) => {
    o.current = g, x(g !== null);
  }, []), v = Te(), E = we(), A = b(E);
  A.current = E;
  const [P, O] = K(null), C = b(null), I = b(!1), W = b(!1), [Y, m] = K(!1), y = b(0), z = b(!1), [S, D] = K(!1), G = b(l);
  G.current = l;
  const N = b(!1), _ = b(!1), Q = () => {
    _.current = !0, m(!0);
  }, j = () => {
    _.current = !1, m(!1);
  };
  U(() => {
    e || (O(null), W.current = !1, I.current = !1);
  }, [e]), le(() => {
    var X, q;
    if (!e || W.current || !p || !o.current) return;
    W.current = !0;
    const g = o.current.getBoundingClientRect(), M = ((X = A.current) == null ? void 0 : X.innerWidth) ?? 0, F = ((q = A.current) == null ? void 0 : q.innerHeight) ?? 0;
    O({
      left: Math.max(ie, Math.min((M - g.width) / 2, M - g.width - ie)),
      top: Math.max(ie, Math.min((F - g.height) / 2, F - g.height - ie))
    });
  }, [e, p]), le(() => {
    if (!e || !p || !l || ke() || !o.current) return;
    const g = o.current, M = Be(g), F = M[M.length - 1];
    Q(), F ? gt(y, g, F.getBoundingClientRect(), j) : Ln(y, g, j);
  }, [e, p]);
  const ne = Z(() => {
    if (z.current) return;
    const g = o.current, M = !!g && Be(g).length > 0;
    if (!g || !l || ke() || M) {
      t();
      return;
    }
    z.current = !0, D(!0), N.current = !0, Q(), bt(y, g, () => {
      z.current = !1, D(!1), j(), t();
    });
  }, [l, t]);
  le(() => () => {
    const g = o.current;
    if (!g || N.current || !G.current || ke() || Be(g).length > 0) return;
    const M = g.ownerDocument, F = g.cloneNode(!0);
    F.removeAttribute("data-modal-stack"), F.removeAttribute("data-state"), F.removeAttribute("role"), F.removeAttribute("data-aria-hidden"), F.removeAttribute("tabindex"), F.setAttribute("aria-hidden", "true"), F.style.pointerEvents = "none", M.body.appendChild(F), bt({ current: 0 }, F, () => {
      F.isConnected && F.remove();
    });
  }, []), U(() => {
    if (!e || !p || !l || !o.current) return;
    const g = o.current, M = g.parentNode;
    if (!M) return;
    let F = 0, X = null, q = !1;
    const ee = () => {
      F = 0;
      const te = Fe(g);
      te.length > 0 ? (X = te[te.length - 1].getBoundingClientRect(), q = !0, F = requestAnimationFrame(ee)) : q && (q = !1, X && !ke() && (Q(), gt(y, g, X, j)), X = null);
    }, re = new MutationObserver(() => {
      !F && Fe(g).length > 0 && (F = requestAnimationFrame(ee));
    });
    return re.observe(M, { childList: !0 }), () => {
      re.disconnect(), F && cancelAnimationFrame(F);
    };
  }, [e, p]), U(() => {
    if (!p || !l || ke() || !o.current) return;
    const g = o.current;
    let M = Math.round(g.getBoundingClientRect().height), F = !1;
    const X = new ResizeObserver(() => {
      var ht;
      if (!g.isConnected) return;
      const q = Math.round(g.getBoundingClientRect().height);
      if (!F) {
        F = !0, M = q;
        return;
      }
      if (Math.abs(q - M) < 1) return;
      if (C.current || z.current || Fe(g).length > 0) {
        M = q;
        return;
      }
      if (_.current) return;
      const ee = M;
      M = q, Q();
      const re = g.getBoundingClientRect(), te = !I.current, ce = ((ht = A.current) == null ? void 0 : ht.innerHeight) ?? 0, Wt = te ? (ce - ee) / 2 : re.top, ft = te ? (ce - q) / 2 : re.top;
      g.style.transition = "none", g.style.height = `${ee}px`, te && (g.style.top = `${Wt}px`), h.current && (h.current.style.overflow = "hidden"), g.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          g.style.height === `${ee}px` && (g.style.transition = `height ${ue}ms ${$e}${te ? `, top ${ue}ms ${$e}` : ""}`, g.style.height = `${q}px`, te && (g.style.top = `${ft}px`), window.setTimeout(() => {
            g.style.height === `${q}px` && (g.style.transition = "", g.style.height = "", h.current && (h.current.style.overflow = ""), te && O({ left: re.left, top: ft }), j());
          }, ue + 60));
        });
      });
    });
    return X.observe(g), () => X.disconnect();
  }, [p]);
  const R = Z(() => {
    const g = o.current;
    if (!g) return null;
    const M = g.getBoundingClientRect();
    return { left: M.left, top: M.top, width: M.width, height: M.height };
  }, []), H = Z((g, M) => {
    var te, ce;
    const F = ((te = A.current) == null ? void 0 : te.innerWidth) ?? 0, X = ((ce = A.current) == null ? void 0 : ce.innerHeight) ?? 0, q = R(), ee = q ? q.width : Math.min(F - ie * 2, 576), re = q ? q.height : Math.min(X - ie * 2, 400);
    return {
      left: Math.max(ie, Math.min(g, F - ee - ie)),
      top: Math.max(ie, Math.min(M, X - re - ie))
    };
  }, [R]), L = Z((g) => {
    if (g.target.closest("button")) return;
    I.current = !0;
    const M = R();
    M && (O(H(M.left, M.top)), C.current = { startX: g.clientX, startY: g.clientY, posX: M.left, posY: M.top }, g.target.setPointerCapture(g.pointerId));
  }, [R, H]), k = Z((g) => {
    const M = C.current;
    M && (g.preventDefault(), O(H(M.posX + g.clientX - M.startX, M.posY + g.clientY - M.startY)));
  }, [H]), J = Z(() => {
    C.current = null;
  }, []), se = C.current !== null, me = P !== null, pe = me ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ae = `${s ? `${s} w-full` : "max-w-xl w-full"}`, de = {
    ...me ? { left: P.left, top: P.top } : {},
    width: `min(100%, calc(100vw - ${ie * 2}px))`,
    maxHeight: `calc(100vh - ${ie * 2}px)`
  }, B = Z((g) => {
    if (g.key !== "Enter" || g.shiftKey || g.metaKey || g.ctrlKey || g.altKey || g.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const F = d.current;
    if (!F) return;
    const X = Array.from(F.querySelectorAll("button[data-modal-confirm]")), q = X.length > 0 ? X : Array.from(F.querySelectorAll("button")), ee = q[q.length - 1];
    !ee || ee.disabled || (g.preventDefault(), ee.click());
  }, []);
  return /* @__PURE__ */ i(fe.Root, { open: e, onOpenChange: (g) => {
    g || ne();
  }, children: /* @__PURE__ */ $(fe.Portal, { container: v ?? void 0, children: [
    /* @__PURE__ */ i(
      fe.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${S ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (g) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (g.preventDefault(), ne());
        }
      }
    ),
    /* @__PURE__ */ $(
      fe.Content,
      {
        ref: w,
        onKeyDown: B,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${pe} ${ae}`,
        style: { touchAction: "manipulation", ...Object.keys(de).length > 0 ? de : {} },
        children: [
          f ? /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${Ke} ${Fn} pb-4 ${se ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (g) => {
                Y || L(g);
              },
              onPointerMove: k,
              onPointerUp: J,
              children: [
                /* @__PURE__ */ i(fe.Title, { className: `${Hn} font-bold text-white truncate`, children: n }),
                /* @__PURE__ */ i(fe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(Ye, { className: Bn }) })
              ]
            }
          ) : /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${Pn} ${On} border-b border-zinc-800 shrink-0 bg-zinc-950 ${se ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (g) => {
                Y || L(g);
              },
              onPointerMove: k,
              onPointerUp: J,
              children: [
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(fe.Title, { className: `${In} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ $("button", { onClick: u, className: `flex items-center gap-1 ${Wn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Yn} shrink-0`, children: [
                    /* @__PURE__ */ i(Ct, { className: qn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ i(fe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(Ye, { className: _n }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: h, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${f ? ` ${Ke} pb-4` : ""}`, children: a }),
          c && /* @__PURE__ */ i("div", { ref: d, className: f ? `${Ke} ${Kn}` : "shrink-0", children: f ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: c }) : c })
        ]
      }
    )
  ] }) });
}
function si({ children: e }) {
  return /* @__PURE__ */ i("div", { className: `flex items-center justify-end gap-3 ${Un} ${jn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const Vn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${T ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Gn = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Re({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      className: `${Vn} ${Gn[e]} ${t}`,
      ...r
    }
  );
}
function Zn({ checked: e, onChange: t, disabled: n = !1, label: r, id: s, className: c = "", labelClassName: a = "", theme: u, variant: l = "pill", tone: f = "accent", block: o = !1 }) {
  const h = l !== "plain", d = T ? "w-5 h-5" : "w-4 h-4", p = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", x = T ? "w-3.5 h-3.5" : "w-3 h-3", w = T ? "text-sm" : "text-xs";
  return /* @__PURE__ */ $(
    "label",
    {
      className: `ui-checkbox ${h ? `ui-checkbox-pill ${T ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${f === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${c}`,
      style: { display: o ? "flex" : "inline-flex", alignItems: "center", gap: T ? 10 : 8 },
      onClick: (E) => E.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: s,
            checked: e,
            disabled: n,
            onChange: (E) => t(E.target.checked),
            className: "sr-only"
          }
        ),
        h ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ $("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: `ui-checkbox-box ${p}`, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", className: x, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${w} ${a}`, children: r })
      ]
    }
  );
}
const Jn = T ? "space-y-5" : "space-y-4", Qn = T ? "text-sm" : "text-xs", er = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", It = Ce(null);
function ci() {
  const e = ze(It);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function li({ children: e }) {
  const [t, n] = K(null), [r, s] = K(!1), c = b(null), a = Z((d) => {
    if (d.suppressKey) {
      const p = localStorage.getItem(d.suppressKey);
      if (p && Date.now() < parseInt(p, 10))
        return Promise.resolve(!0);
    }
    return new Promise((p) => {
      s(!1), n({ kind: "confirm", options: d, resolve: p });
    });
  }, []), u = Z((d) => new Promise((p) => {
    n({ kind: "prompt", options: d, resolve: p });
  }), []), l = Z((d) => new Promise((p) => {
    n({ kind: "alert", options: d, resolve: p });
  }), []);
  U(() => {
    if (t) {
      const d = setTimeout(() => {
        var p;
        return (p = c.current) == null ? void 0 : p.focus();
      }, 50);
      return () => clearTimeout(d);
    }
  }, [t]);
  const f = Z(() => {
    var d, p;
    if (t) {
      if (t.kind === "confirm") {
        const x = t.options;
        x.suppressKey && r && localStorage.setItem(x.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((p = (d = c.current) == null ? void 0 : d.value) == null ? void 0 : p.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), o = t !== null;
  U(() => {
    if (!o) return;
    const d = (p) => {
      p.key !== "Enter" || p.shiftKey || p.metaKey || p.ctrlKey || p.altKey || p.isComposing || (p.preventDefault(), p.stopImmediatePropagation(), f());
    };
    return document.addEventListener("keydown", d, !0), () => document.removeEventListener("keydown", d, !0);
  }, [o, f]);
  const h = Z(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ $(It.Provider, { value: { confirm: a, prompt: u, alert: l }, children: [
    e,
    /* @__PURE__ */ i(
      Xn,
      {
        open: o,
        onClose: h,
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ $(he, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(Re, { variant: "ghost", onClick: h, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(Re, { onClick: f, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            Re,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: f,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(Re, { "data-modal-confirm": !0, onClick: f, children: "Save" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: Jn, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { className: `${Qn} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            Zn,
            {
              block: !0,
              checked: r,
              onChange: s,
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
              className: `w-full ${er} ui-input`
            }
          )
        ] })
      }
    )
  ] });
}
const tr = 500, nr = 250, rr = 5, oe = 88, xt = 4;
function ir(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const s = performance.now(), c = (a) => {
    const u = a - s, l = Math.min(u / t, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(c);
  };
  requestAnimationFrame(c);
}
function or({ x: e, y: t, ms: n }) {
  const r = b(null), s = Te();
  return U(() => {
    r.current && ir(r.current, n);
  }, [n]), Qe(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "fixed",
          left: e - oe / 2,
          top: t - oe / 2,
          width: oe,
          height: oe,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ $("svg", { ref: r, width: oe, height: oe, viewBox: `0 0 ${oe} ${oe}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: oe / 2,
              cy: oe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: xt + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: oe / 2,
              cy: oe / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: xt,
              strokeLinecap: "round",
              style: { transform: "rotate(-90deg)", transformOrigin: "center" }
            }
          )
        ] })
      }
    ),
    s ?? document.body
  );
}
function ai() {
  return { "data-no-longpress": "true" };
}
function sr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function ui({
  children: e,
  showRing: t = !0,
  longPressMs: n = tr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: s,
  onLongPress: c
}) {
  const [a, u] = K(null), l = yn(), f = b(null), o = b(null), h = b({ x: 0, y: 0, target: null }), d = b(!1), p = Math.min(nr, n * 0.5), x = b(s);
  x.current = s;
  const w = b(c);
  return w.current = c, U(() => {
    if (!T || !l) return;
    const v = (O) => {
      if (!Xe(O.pointerType) || O.button !== 0) return;
      const C = O.target;
      if (!C.closest(r) || (x.current ? !x.current(C) : sr(C))) return;
      const I = O.clientX, W = O.clientY;
      h.current = { x: I, y: W, target: O.target }, d.current = !0, t && (o.current = setTimeout(() => u({ x: I, y: W }), p)), f.current = setTimeout(() => {
        if (!d.current) return;
        o.current && (clearTimeout(o.current), o.current = null), u(null);
        const Y = h.current.target;
        if (!Y) return;
        const m = w.current;
        if (m) {
          m(Y, I, W);
          return;
        }
        const y = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: I,
          clientY: W,
          button: 2,
          view: window
        });
        Y.dispatchEvent(y);
      }, n);
    }, E = (O) => {
      if (!d.current || f.current === null) return;
      const C = O.clientX - h.current.x, I = O.clientY - h.current.y;
      Math.sqrt(C * C + I * I) > rr && (clearTimeout(f.current), f.current = null, o.current && (clearTimeout(o.current), o.current = null), d.current = !1, u(null));
    }, A = () => {
      f.current !== null && (clearTimeout(f.current), f.current = null), o.current !== null && (clearTimeout(o.current), o.current = null), d.current = !1, u(null);
    }, P = (O) => {
      Xe(O.pointerType) && (f.current !== null && (clearTimeout(f.current), f.current = null), o.current !== null && (clearTimeout(o.current), o.current = null), d.current = !1, u(null));
    };
    return l == null || l.addEventListener("pointerdown", v), l.addEventListener("pointermove", E), l.addEventListener("pointerup", A), l.addEventListener("pointercancel", A), l.addEventListener("pointerleave", P), () => {
      l.removeEventListener("pointerdown", v), l.removeEventListener("pointermove", E), l.removeEventListener("pointerup", A), l == null || l.removeEventListener("pointercancel", A), l == null || l.removeEventListener("pointerleave", P), f.current !== null && clearTimeout(f.current), o.current !== null && clearTimeout(o.current);
    };
  }, [t, n, p, r]), /* @__PURE__ */ $(he, { children: [
    e,
    t && a && /* @__PURE__ */ i(or, { x: a.x, y: a.y, ms: n - p })
  ] });
}
function di() {
  const e = vn();
  return wn ? e === null || Xe(e) : !1;
}
const cr = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", lr = {
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
}, yt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", ar = "bg-blue-900!";
function fi({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: s = "button",
  ...c
}) {
  const a = c["data-state"] === "open", u = lr[t][e];
  let l = `${u.base} ${a ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (l = a ? `${yt} ${ar}` : yt), /* @__PURE__ */ i("button", { type: s, className: `${cr} ${l} ${r}`, ...c });
}
const ur = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], dr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], We = 1900, qe = 2100;
function fr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function hr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function hi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: s = "" }) {
  const c = /* @__PURE__ */ new Date(), [a, u] = K(c.getFullYear()), [l, f] = K(c.getMonth()), [o, h] = K("days"), [d, p] = K(null), x = Le(() => new Set(e), [e]), w = (N) => {
    x.has(N) ? t(e.filter((_) => _ !== N)) : t([...e, N]);
  }, v = Le(() => {
    const N = fr(a, l), _ = new Date(a, l, 1).getDay(), Q = [];
    for (let j = 0; j < _; j++) Q.push({ key: `pad-${j}`, day: 0, empty: !0 });
    for (let j = 1; j <= N; j++) Q.push({ key: hr(a, l, j), day: j, empty: !1 });
    return Q;
  }, [a, l]), E = (N) => u((_) => Math.max(We, Math.min(qe, _ + N))), A = (N) => {
    l + N < 0 ? (u((_) => Math.max(We, _ - 1)), f(11)) : l + N > 11 ? (u((_) => Math.min(qe, _ + 1)), f(0)) : f((_) => _ + N);
  }, P = () => {
    if (d === null) return;
    const N = parseInt(d, 10);
    !isNaN(N) && N >= We && N <= qe && u(N), p(null);
  }, O = (N) => e.some((_) => _.startsWith(`${a}-${String(N + 1).padStart(2, "0")}`)), C = n === "dark", I = T ? "p-2" : "p-1", W = T ? "w-5 h-5" : "w-4 h-4", Y = T ? "text-[11px] py-2" : "text-[10px] py-1.5", m = T ? "py-2.5 text-sm" : "py-1.5 text-xs", y = T ? "py-3 text-sm" : "py-2 text-xs", z = T ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", S = T ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, D = C ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", G = C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ $("div", { className: `border rounded-lg overflow-hidden w-full ${C ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${s}`, children: [
    /* @__PURE__ */ $("div", { className: `flex items-center justify-between px-3 py-2 border-b ${C ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => o === "months" ? E(-1) : A(-1),
          className: `${I} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": o === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(jt, { className: W })
        }
      ),
      o === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => h("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${C ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(a, l).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: d ?? String(a),
          onChange: (N) => p(N.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (N) => N.target.select(),
          onBlur: P,
          onKeyDown: (N) => {
            N.key === "Enter" && (N.preventDefault(), P()), N.key === "Escape" && p(null);
          },
          className: S
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => o === "months" ? E(1) : A(1),
          className: `${I} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": o === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(je, { className: W })
        }
      )
    ] }),
    o === "months" ? /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: dr.map((N, _) => /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: () => {
            f(_), h("days");
          },
          className: `${y} relative font-medium transition-colors border-b ${_ === l ? D : G} ${C ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            N,
            O(_) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${_ === l ? "bg-white" : C ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        N
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${C ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            u(c.getFullYear()), f(c.getMonth()), h("days");
          },
          className: `px-3 ${T ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${C ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ $("div", { className: "grid grid-cols-7 text-center", children: [
      ur.map((N) => /* @__PURE__ */ i("div", { className: `${Y} font-semibold uppercase tracking-wider border-b ${C ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: N }, N)),
      v.map((N) => N.empty ? /* @__PURE__ */ i("div", {}, N.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => w(N.key),
          className: `${m} font-medium transition-colors border-b ${C ? "border-zinc-800/60" : "border-zinc-50"} ${x.has(N.key) ? D : C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: N.day
        },
        N.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ $("div", { className: `px-3 py-2 border-t ${C ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ $("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((N) => {
        const _ = /* @__PURE__ */ new Date(N + "T00:00:00"), Q = _.getFullYear() === c.getFullYear() ? _.toLocaleString("default", { month: "short", day: "numeric" }) : _.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ $(
          "button",
          {
            type: "button",
            onClick: () => w(N),
            "aria-label": `Remove ${Q}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${C ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${z}`,
            children: [
              Q,
              /* @__PURE__ */ i("span", { className: `leading-none ${C ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          N
        );
      }) })
    ] })
  ] });
}
function mi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: s,
  allSelected: c = !1,
  toggleAllLabel: a,
  emptyHint: u = "Nothing here",
  maxHeight: l,
  disabled: f = !1,
  theme: o,
  className: h = ""
}) {
  const d = (v) => t instanceof Set ? t.has(v) : t.includes(v), p = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", x = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", w = r != null || s != null;
  return /* @__PURE__ */ $("div", { className: h, ...o ? { "data-theme": o } : {}, children: [
    w && /* @__PURE__ */ $("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      s != null && /* @__PURE__ */ i("button", { type: "button", disabled: f, onClick: s, className: "ui-checklist-toggleall", children: a ?? (c ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((v) => {
            const E = d(v.id);
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(v.id),
                className: `ui-checklist-item ${p} ${E ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-checklist-box ${x}`, "aria-hidden": !0, children: E && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  v.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: v.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: v.label }),
                  v.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: v.secondary })
                ]
              },
              v.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: u })
        ]
      }
    )
  ] });
}
function pi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: s = "Nothing here",
  maxHeight: c,
  compact: a = !1,
  disabled: u = !1,
  theme: l,
  className: f = ""
}) {
  const o = a ? "px-2.5 py-1.5 text-xs" : T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", h = a ? "w-3.5 h-3.5" : T ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ $("div", { className: f, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((d) => {
            const p = t === d.id;
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(d.id),
                className: `ui-checklist-item ${o} ${p ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-radio-circle ${h}`, "aria-hidden": !0, children: p && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  d.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: d.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: d.label }),
                  d.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: d.secondary })
                ]
              },
              d.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: s })
        ]
      }
    )
  ] });
}
const gi = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: s = "visible",
  offset: c = 8
}) => {
  const a = we(), { refs: u, floatingStyles: l } = Qt({
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
          var A;
          if (s !== "visible") return {};
          const o = (A = f.elements.floating.ownerDocument) == null ? void 0 : A.defaultView;
          if (!o) return {};
          const h = f.rects.reference, d = Math.max(h.x, 0), p = Math.max(h.y, 0), x = Math.min(h.x + h.width, o.innerWidth), w = Math.min(h.y + h.height, o.innerHeight);
          if (x <= d || w <= p) return {};
          const v = r === "left" ? x - (h.x + h.width) : r === "right" ? d - h.x : 0, E = r === "top" ? p - h.y : r === "bottom" ? w - (h.y + h.height) : 0;
          return { x: f.x + v, y: f.y + E };
        }
      },
      tn(c),
      nn({ padding: 8 }),
      rn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (f) => {
          var w;
          const o = (w = f.elements.floating.ownerDocument) == null ? void 0 : w.defaultView;
          if (!o) return {};
          const h = f.rects.floating.width, d = f.rects.floating.height, p = Math.max(8, Math.min(f.x, o.innerWidth - h - 8)), x = Math.max(8, Math.min(f.y, o.innerHeight - d - 8));
          return { x: p, y: x };
        }
      }
    ],
    whileElementsMounted: en
  });
  return le(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ $(he, { children: [
    !n && /* @__PURE__ */ i("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    a && Qe(
      /* @__PURE__ */ i(
        "div",
        {
          ref: u.setFloating,
          className: `ui-chrome ${e}`,
          style: l,
          onMouseDown: (f) => f.stopPropagation(),
          onClick: (f) => f.stopPropagation(),
          onDragStart: (f) => f.preventDefault(),
          children: t
        }
      ),
      a.document.body
    )
  ] });
}, Ne = ({ content: e, children: t }) => {
  const n = Te(), r = we(), [s, c] = K(!1), [a, u] = K({ x: 0, y: 0 }), l = b(null), f = () => {
    if (!l.current) return;
    const o = l.current.getBoundingClientRect();
    u({ x: o.left + o.width / 2, y: o.top });
  };
  return U(() => (s && r && (f(), r.addEventListener("scroll", f, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", f, !0)), [s]), /* @__PURE__ */ $(
    "div",
    {
      ref: l,
      className: "inline-flex",
      onMouseEnter: () => {
        f(), c(!0);
      },
      onMouseLeave: () => c(!1),
      children: [
        t,
        s && Qe(
          /* @__PURE__ */ $(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: a.x, top: a.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((o, h) => /* @__PURE__ */ i("div", { className: h > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: o }, h)),
                /* @__PURE__ */ i("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, bi = T ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Ze = T ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Se = T ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", mr = "hover:bg-red-950/50", _t = T ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ht = "bg-blue-900/50 border-blue-700 text-blue-300", Bt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", pr = T ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", xi = T ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Ae = T ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", gr = "inline-flex rounded overflow-hidden border border-zinc-700", Ft = T ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", De = ({ onClick: e, disabled: t, title: n, className: r = Ze, children: s }) => /* @__PURE__ */ i(Ne, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: s }) }), yi = ({ value: e, options: t, onChange: n, disabled: r, active: s }) => /* @__PURE__ */ i("div", { className: gr, children: t.map((c) => {
  const a = s ? s(c.v) : e === c.v;
  return /* @__PURE__ */ i(
    "button",
    {
      disabled: r,
      onClick: () => n(c.v),
      className: `${T ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${a ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${c.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: c.l
    },
    c.v
  );
}) }), wi = ({ children: e }) => /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: T ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), br = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", xr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", vi = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ $("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? br : xr, children: e }),
  t
] }), ki = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ $("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Ni = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: s }) => /* @__PURE__ */ $(he, { children: [
  /* @__PURE__ */ i(De, { onClick: () => r(-1), disabled: e, title: "Move up", className: Se, children: /* @__PURE__ */ i(Xt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(De, { onClick: () => r(1), disabled: e, title: "Move down", className: Se, children: /* @__PURE__ */ i(Vt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(De, { onClick: t, disabled: e, title: "Duplicate", className: Se, children: /* @__PURE__ */ i($t, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: Ae }),
  /* @__PURE__ */ i(De, { onClick: n, disabled: e, title: "Delete", className: `${Se} ${mr}`, children: /* @__PURE__ */ i(Ue, { className: "w-2.5 h-2.5" }) })
] }), yr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), wr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), vr = /^(https?:\/\/|mailto:)/i;
function kr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const s = n.slice(0, r).trim().toLowerCase(), c = n.slice(r + 1).trim();
    wr.has(s) && c && t.push(`${s}: ${c}`);
  }
  return t.join("; ");
}
function Je(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const u = document.createDocumentFragment();
    for (const l of Array.from(t.childNodes)) u.appendChild(Je(l));
    return u;
  };
  if (!yr.has(n)) return r();
  if (n === "a") {
    const u = t.getAttribute("href") || "";
    if (!vr.test(u)) return r();
  }
  const s = document.createElement(n), c = t.getAttribute("style"), a = kr(c || "");
  if (a && s.setAttribute("style", a), n === "a") {
    s.setAttribute("href", t.getAttribute("href"));
    const u = t.getAttribute("target"), l = t.getAttribute("rel");
    u && s.setAttribute("target", u), l && s.setAttribute("rel", l);
  }
  for (const u of Array.from(t.childNodes)) s.appendChild(Je(u));
  return s;
}
function Kt(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Nr(e) {
  const t = Kt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const a of Array.from(n.content.childNodes)) r.appendChild(Je(a));
  const s = document.createElement("div");
  return s.appendChild(r), s.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function $i(e) {
  const t = Kt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Ci(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const $r = { text: "#52525b" }, Cr = ({ node: e, selected: t, extension: n, editor: r, view: s, getPos: c }) => {
  var h;
  const a = e.attrs.field ?? "", u = n.options, l = ((h = u.resolve) == null ? void 0 : h.call(u, a)) ?? null, f = (l == null ? void 0 : l.color) ?? $r, o = (l == null ? void 0 : l.label) ?? `{{${a}}}`;
  return /* @__PURE__ */ i(
    cn,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: f.text,
        color: "#fff",
        borderRadius: 2,
        padding: 4,
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      onMouseDown: (d) => {
        var v;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof c == "function" ? c() : null;
        if (p == null) return;
        const x = s.state.doc.resolve(p), w = x.nodeAfter;
        w && Pe.isSelectable(w) && s.dispatch(s.state.tr.setSelection(new Pe(x))), (v = u.onTokenClick) == null || v.call(u, a, d.currentTarget.getBoundingClientRect(), p);
      },
      children: o
    }
  );
};
function zr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function wt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Tr = gn.extend({
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
    return sn(Cr);
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
    return ["span", on({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Er = 240, Rr = 280, Sr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = b(null);
  return U(() => {
    var c;
    const s = (c = r.current) == null ? void 0 : c.querySelector('[data-ac-active="1"]');
    s == null || s.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ i("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Rr, maxHeight: Er, zIndex: 9999 }, onMouseDown: (s) => s.preventDefault(), children: /* @__PURE__ */ i("div", { ref: r, children: e.items.map((s, c) => /* @__PURE__ */ $(
    "button",
    {
      type: "button",
      "data-ac-active": c === t ? "1" : void 0,
      onMouseEnter: () => n(c),
      onClick: () => e.command({ field: s.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${c === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ i("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: s.color.text } }),
        /* @__PURE__ */ i("span", { className: "truncate flex-1", children: s.label }),
        s.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] text-zinc-600", children: s.group })
      ]
    },
    s.key
  )) }) });
}, Dr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ i(Sr, { props: n, highlight: r, onHighlight: (s) => {
      e.highlight = s, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const s = bn(r);
      e = { holder: r, root: s, unmount: null, props: n, highlight: 0 };
      const c = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: a, y: u, placement: l }) => {
          var h, d;
          if (!e) return;
          const f = (d = (h = e.props) == null ? void 0 : h.clientRect) == null ? void 0 : d.call(h), o = f && !l.endsWith("-end") ? f.width : 0;
          r.style.left = `${a + o}px`, r.style.top = `${u}px`;
        }
      });
      e.unmount = c, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var a;
      if (!(e != null && e.props)) return !1;
      const { items: r, command: s } = e.props;
      if (r.length === 0) return !1;
      const c = n.key;
      return c === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, r.length - 1), t(e.props), !0) : c === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : c === "Enter" || c === "Tab" ? (n.preventDefault(), s({ field: ((a = r[e.highlight]) == null ? void 0 : a.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, zi = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Mr = ge.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: s,
  onStateChange: c,
  resolveToken: a,
  suggestionItems: u,
  onTokenClick: l,
  onSelectionChange: f
}, o) => {
  const h = b(a);
  h.current = a;
  const d = b(u);
  d.current = u;
  const p = b(l);
  p.current = l;
  const x = b(f);
  x.current = f;
  const w = b(null), v = b(null), E = b(t);
  E.current = t;
  const A = b(r);
  A.current = r;
  const P = b(c);
  P.current = c;
  const O = b(null), C = (y) => {
    var D;
    const z = {
      bold: y.isActive("bold"),
      italic: y.isActive("italic"),
      underline: y.isActive("underline"),
      strike: y.isActive("strike"),
      link: y.isActive("link"),
      color: y.getAttributes("textStyle").color || ""
    }, S = O.current;
    S && S.bold === z.bold && S.italic === z.italic && S.underline === z.underline && S.strike === z.strike && S.link === z.link && S.color === z.color || (O.current = z, (D = P.current) == null || D.call(P, z));
  }, I = (y) => {
    var N;
    const z = y.state.selection;
    let S = null;
    z instanceof Pe && z.node.type.name === "token" ? (S = { key: z.node.attrs.field ?? "", pos: z.from }, w.current = z.from) : w.current != null && (w.current = y.state.tr.mapping.map(w.current));
    const D = v.current, G = D && S && D.key === S.key && D.pos === S.pos;
    !D && !S || G || (v.current = S, (N = x.current) == null || N.call(x, S));
  }, W = (y) => {
    const z = Nr(zr(y));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, Y = ge.useMemo(() => {
    const y = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var S;
        return ((S = d.current) == null ? void 0 : S.call(d, z)) ?? [];
      },
      command: ({ editor: z, range: S, props: D }) => {
        z.chain().focus().insertContentAt(S, { type: "token", attrs: { field: D.field } }).run();
      },
      render: Dr
    };
    return Tr.configure({
      resolve: h.current ?? null,
      suggestion: y,
      onTokenClick: (z, S, D) => {
        var G;
        w.current = D, (G = p.current) == null || G.call(p, z, S, D);
      }
    });
  }, []), m = ln({
    immediatelyRender: !1,
    extensions: [
      un,
      dn.configure({ placeholder: n }),
      fn,
      hn,
      pn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      mn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      Y
    ],
    content: wt(e || ""),
    editable: !r,
    onUpdate: ({ editor: y }) => {
      E.current(W(y.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: y }) => {
      C(y), I(y);
    }
  });
  return U(() => {
    if (!m || m.isFocused) return;
    W(m.getHTML()) !== e && (O.current = null, m.commands.setContent(wt(e || ""), { emitUpdate: !1 }), C(m));
  }, [e, m]), U(() => {
    m && m.setEditable(!r);
  }, [r, m]), U(() => {
    m && (O.current = null, C(m), I(m));
  }, [m]), qt(o, () => ({
    exec: (y, z) => {
      if (!(!m || A.current))
        switch (y) {
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
    insertToken: (y) => {
      !m || A.current || m.chain().focus().insertContent({ type: "token", attrs: { field: y } }).run();
    },
    replaceToken: (y) => {
      if (!m || A.current) return;
      const z = w.current;
      z != null && m.commands.command(({ tr: S }) => {
        const D = S.doc.nodeAt(z);
        if (!D || D.type.name !== "token") return !1;
        S.setNodeMarkup(z, void 0, { field: y });
        const G = S.doc.resolve(z);
        return G.nodeAfter && G.nodeAfter.type.name === "token" && S.setSelection(new Pe(G)), !0;
      });
    }
  }), [m]), /* @__PURE__ */ i(an, { editor: m, className: `richtext-editor ${s || ""}` });
});
Mr.displayName = "RichTextEditor";
const Ar = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Lr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], vt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Ti = ({ value: e, disabled: t, onChange: n }) => {
  const [r, s] = K(!1);
  return /* @__PURE__ */ i(
    _e,
    {
      open: r,
      onOpenChange: s,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${Ft} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(zt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Ar.map((c) => /* @__PURE__ */ i(Rn, { onClick: () => {
        n(c), s(!1);
      }, icon: c === e ? /* @__PURE__ */ i(Nt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: c }, children: c }) }, c))
    }
  );
}, Pr = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, s] = K(!1), [c, a] = K(""), u = () => {
    var f;
    const l = c.trim();
    l && ((f = e.current) == null || f.exec("link", l), s(!1));
  };
  return /* @__PURE__ */ i(
    _e,
    {
      open: r,
      onOpenChange: s,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (l) => l.preventDefault(),
          className: `${_t} ${n ? Ht : Bt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(Jt, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ $("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: c,
            onChange: (l) => a(l.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (l) => {
              l.key === "Enter" && (l.preventDefault(), u());
            },
            className: pr + " w-full"
          }
        ),
        /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i("button", { onClick: u, className: Ze, disabled: !c.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                var l;
                (l = e.current) == null || l.exec("unlink"), s(!1);
              },
              className: Ze,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Ei = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: s }) => {
  const [c, a] = K(!1), u = (o, h) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(o, h);
  }, l = (o) => `${_t} ${o ? Ht : Bt}`, f = (o) => !!(r != null && r[o]);
  return /* @__PURE__ */ $("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(Ne, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i("button", { "aria-label": "Bold", disabled: t || f("bold"), onMouseDown: (o) => o.preventDefault(), onClick: () => u("bold"), className: `${l(((n == null ? void 0 : n.bold) ?? !1) || f("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ i(Ne, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i("button", { "aria-label": "Italic", disabled: t || f("italic"), onMouseDown: (o) => o.preventDefault(), onClick: () => u("italic"), className: `${l(((n == null ? void 0 : n.italic) ?? !1) || f("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ i(Ne, { content: "Underline", children: /* @__PURE__ */ i("button", { "aria-label": "Underline", disabled: t, onMouseDown: (o) => o.preventDefault(), onClick: () => u("underline"), className: l((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ i(Gt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(Ne, { content: "Strikethrough", children: /* @__PURE__ */ i("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (o) => o.preventDefault(), onClick: () => u("strikeThrough"), className: l((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ i(Zt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: Ae }),
    /* @__PURE__ */ i(Pr, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: Ae }),
    /* @__PURE__ */ i(
      _e,
      {
        open: c,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${Ft} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(vt, {}),
          /* @__PURE__ */ i(zt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(vt, { className: "w-3.5 h-3.5" })
            }
          ),
          Lr.map((o) => /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("foreColor", o), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${o === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: o },
              title: o
            },
            o
          ))
        ] })
      }
    ),
    s && /* @__PURE__ */ $(he, { children: [
      /* @__PURE__ */ i("div", { className: Ae }),
      s
    ] })
  ] });
};
export {
  fi as Button,
  Zn as Checkbox,
  mi as Checklist,
  ki as ChromeHeader,
  vi as ContentRow,
  ni as ContextMenu,
  ii as ContextMenuDivider,
  ri as ContextMenuItem,
  oi as ContextMenuSub,
  hi as DatePicker,
  li as DialogProvider,
  Rn as DropdownItem,
  _e as DropdownMenu,
  Dn as DropdownSubmenu,
  ot as DropdownThemeContext,
  Ar as FONTS,
  gi as FloatingChrome,
  Ti as FontMenu,
  Ei as FormatToolbar,
  T as IS_COARSE,
  wn as IS_TOUCH_CAPABLE,
  ti as ItemManagerDropdown,
  ui as LongPressMenuProvider,
  tt as MORPH_EASE,
  ye as MORPH_MS,
  nt as MORPH_OPACITY_MS,
  Ie as MenuHighlightContext,
  Xn as Modal,
  si as ModalFooter,
  Re as ModalFooterButton,
  xn as PopoutWindowContext,
  zi as RICH_TEXT_STATE_IDLE,
  pi as RadioList,
  Mr as RichTextEditor,
  wi as SectionHeader,
  yi as Seg,
  Ni as StructureControls,
  st as SubmenuContext,
  Ze as TB_BTN,
  Se as TB_BTN_ICON,
  mr as TB_DANGER,
  Ae as TB_DIVIDER,
  pr as TB_INPUT,
  xi as TB_NUM,
  Ft as TB_PICKER,
  bi as TB_ROW_LABEL,
  gr as TB_SEG,
  _t as TB_TOGGLE,
  Bt as TB_TOGGLE_OFF,
  Ht as TB_TOGGLE_ON,
  Tr as Token,
  Cr as TokenChipView,
  De as ToolButton,
  Ne as Tooltip,
  rt as ZOOM_FROM,
  $n as cloneOverlayClose,
  Ci as escapeHtml,
  At as getDropdownClasses,
  Jr as getHardwareKeyboard,
  Zr as getLastPointerType,
  sr as isInteractiveElement,
  Xe as isTouchLike,
  Rt as nearestOverlayOrigin,
  Kt as normalizeSpaces,
  He as overlayMorphEnabled,
  Nn as playOverlayClose,
  kn as playOverlayOpen,
  wt as preprocessTokenHtml,
  Nr as sanitizeRichText,
  $i as stripRichText,
  zr as stripTokenWrappers,
  yn as useCurrentDocument,
  we as useCurrentWindow,
  ci as useDialog,
  Mt as useDropdownTheme,
  Cn as useFixedPosition,
  Qr as useHardwareKeyboard,
  vn as useLastPointerType,
  ai as useLongPressOptOut,
  ct as useMenuHighlight,
  it as useOverlayMorph,
  et as usePopoutWindow,
  Te as usePortalTarget,
  ei as useSmartPosition,
  di as useTouchMode
};
