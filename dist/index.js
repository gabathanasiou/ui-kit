"use client";
import { jsxs as E, jsx as o, Fragment as pe } from "react/jsx-runtime";
import me, { createContext as Ce, useContext as Ee, useState as Y, useEffect as j, useRef as g, useCallback as X, useLayoutEffect as ue, useMemo as Le, useImperativeHandle as Ut } from "react";
import * as J from "@radix-ui/react-dropdown-menu";
import { Check as zt, X as Ze, Pencil as qt, Copy as Ct, Trash2 as Fe, RotateCcw as Et, Plus as Xt, ChevronRight as Ue, ChevronLeft as Gt, ArrowUp as jt, ArrowDown as Vt, ChevronDown as Rt, Underline as Zt, Strikethrough as Jt, Link as Qt } from "lucide-react";
import * as oe from "@radix-ui/react-dialog";
import { createPortal as Je } from "react-dom";
import { useFloating as en, autoUpdate as tn, offset as nn, flip as rn, shift as on } from "@floating-ui/react-dom";
import { mergeAttributes as sn, ReactNodeViewRenderer as cn, NodeViewWrapper as ln, useEditor as an, EditorContent as un } from "@tiptap/react";
import { NodeSelection as Ae } from "@tiptap/pm/state";
import dn from "@tiptap/starter-kit";
import fn from "@tiptap/extension-placeholder";
import { TextStyle as hn } from "@tiptap/extension-text-style";
import pn from "@tiptap/extension-color";
import mn from "@tiptap/extension-link";
import gn from "@tiptap/extension-underline";
import { Mention as bn } from "@tiptap/extension-mention";
import { createRoot as xn } from "react-dom/client";
const yn = Ce(null);
function Qe() {
  return Ee(yn);
}
function ve() {
  const e = Qe();
  return e ? e.document.body : null;
}
function wn() {
  const e = Qe();
  return e ? e.document : typeof document < "u" ? document : null;
}
function ge() {
  return Qe() ?? (typeof window < "u" ? window : null);
}
const Re = typeof window < "u", D = Re && window.matchMedia("(pointer: coarse)").matches, vn = Re && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function qe(e) {
  return e === "touch" || e === "pen";
}
let ye = null;
const Xe = /* @__PURE__ */ new Set();
Re && window.addEventListener("pointerdown", (e) => {
  ye = e.pointerType, Xe.forEach((t) => t());
}, !0);
function jr() {
  return ye;
}
function kn() {
  const [, e] = Y(0), t = g(ye);
  return j(() => {
    const n = () => {
      t.current !== ye && (t.current = ye, e((r) => r + 1));
    };
    return Xe.add(n), () => {
      Xe.delete(n);
    };
  }, []), ye;
}
const Tt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Dt() {
  return Re ? Tt.some((e) => window.matchMedia(e).matches) : !1;
}
let Ie = Dt();
const Ge = /* @__PURE__ */ new Set();
function ht(e) {
  Ie !== e && (Ie = e, Ge.forEach((t) => t()));
}
var $t;
if (Re) {
  const e = () => ht(Dt());
  for (const a of Tt) {
    const u = window.matchMedia(a);
    ($t = u.addEventListener) == null || $t.call(u, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (a) => {
    a.isComposing || a.keyCode !== 229 && (a.key === "Enter" || a.key === "Backspace" || a.key === "Process" || a.key === "Unidentified" || ht(!0));
  });
  let n = null, r = null;
  const i = "__penClick", l = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (a) => {
    a.pointerType !== "pen" || a.button !== 0 || (n = { x: a.clientX, y: a.clientY });
  }, !0), window.addEventListener("pointerup", (a) => {
    if (a.pointerType !== "pen") return;
    const u = n;
    if (n = null, !u || Math.hypot(a.clientX - u.x, a.clientY - u.y) > 8) return;
    const c = a.target;
    if (!c || !c.isConnected) return;
    if (c instanceof HTMLInputElement && l.has(c.type)) {
      try {
        c.showPicker();
      } catch {
      }
      return;
    }
    const d = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    d[i] = !0, r = { x: a.clientX, y: a.clientY, time: Date.now() }, c.dispatchEvent(d);
  }, !0), window.addEventListener("click", (a) => {
    a[i] || r && Date.now() - r.time < 1e3 && Math.hypot(a.clientX - r.x, a.clientY - r.y) < 12 && (a.preventDefault(), a.stopPropagation());
  }, !0);
}
function Vr() {
  return Ie;
}
function Zr() {
  const [, e] = Y(0);
  return j(() => {
    const t = () => e((n) => n + 1);
    return Ge.add(t), () => {
      Ge.delete(t);
    };
  }, []), Ie;
}
const we = 220, et = "cubic-bezier(0.32, 0.72, 0, 1)", tt = 170, nt = 0.94;
function _e(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Mt(e, t) {
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
  return Mt({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function Nn(e, t, n, r) {
  const i = ++e.current, l = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${nt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === i && requestAnimationFrame(() => {
      if (e.current !== i) return;
      const a = St(t, n);
      t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === i && (t.style.transition = l.transition, t.style.transform = l.transform, t.style.transformOrigin = l.transformOrigin, t.style.opacity = l.opacity, r == null || r());
      }, we + 60);
    });
  });
}
function $n(e, t, n, r) {
  const i = ++e.current, l = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, a = St(t, n);
  t.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transform = `scale(${nt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === i && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== i || t.isConnected || (t.style.transition = l.transition, t.style.transform = l.transform, t.style.transformOrigin = l.transformOrigin, t.style.opacity = l.opacity, t.style.pointerEvents = l.pointerEvents, t.style.visibility = l.visibility);
    }));
  }, we + 60);
}
function zn(e, t, n) {
  const r = e.cloneNode(!0), i = e.getBoundingClientRect(), l = i.width > 0 || i.height > 0 ? i : n ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${l.left}px`, r.style.top = `${l.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const a = (t == null ? void 0 : t()) ?? null, u = a ? Mt({ left: l.left, top: l.top, width: l.width, height: l.height }, a) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, r.style.transform = `scale(${nt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, we + 60));
    });
  });
}
function rt(e) {
  const t = g(null), [n, r] = Y(!1), i = g(null), l = g(0), a = X((b) => {
    if (e.ref && (e.ref.current = b), b) {
      l.current = 0, t.current = b;
      const R = b.getBoundingClientRect();
      (R.width > 0 || R.height > 0) && (i.current = { left: R.left, top: R.top, width: R.width, height: R.height }), r(!0);
      return;
    }
    const w = t.current, k = ++l.current;
    queueMicrotask(() => {
      k === l.current && t.current === w && (t.current = null, r(!1), !(!w || !e.cloneOnUnmount || !c.current) && w.style.visibility !== "hidden" && _e(h.current) && zn(w, s.current, i.current));
    });
  }, []), u = X(() => {
    const b = t.current;
    if (!b || getComputedStyle(b).transform !== "none") return;
    const w = b.getBoundingClientRect();
    (w.width > 0 || w.height > 0) && (i.current = { left: w.left, top: w.top, width: w.width, height: w.height });
  }, []), c = g(e.visible);
  c.current = e.visible;
  const d = g(e.visible), s = g(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const f = g(e.onClosed);
  f.current = e.onClosed;
  const h = g(e.morph !== !1);
  h.current = e.morph !== !1;
  const z = g(0);
  return ue(() => {
    if (!n || !c.current || !_e(h.current)) return;
    const b = t.current;
    b && Nn(z, b, s.current);
  }, [n, e.visible]), j(() => {
    if (!n || !c.current) return;
    let b = 0;
    const w = () => {
      b = 0, u(), b = requestAnimationFrame(w);
    };
    return b = requestAnimationFrame(w), () => {
      b && cancelAnimationFrame(b);
    };
  }, [n, u]), ue(() => {
    var k;
    const b = d.current;
    if (d.current = e.visible, e.visible || !b) return;
    const w = t.current;
    if (!w || !_e(h.current)) {
      (k = f.current) == null || k.call(f);
      return;
    }
    $n(z, w, s.current, () => {
      var R;
      return (R = f.current) == null ? void 0 : R.call(f);
    });
  }, [e.visible]), j(() => {
    if (!n || !c.current) return;
    const b = (w) => {
      const k = t.current;
      k && k.contains(w.target) && w.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", b, { capture: !0 }), () => document.removeEventListener("wheel", b, { capture: !0 });
  }, [n]), a;
}
function Jr(e, t) {
  const n = ge(), r = g(n);
  r.current = n, ue(() => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const l = r.current;
    if (!l) return;
    const a = e.current.getBoundingClientRect(), u = i.getBoundingClientRect(), c = l.innerWidth, d = l.innerHeight, s = u.right - c;
    if (s > 0) {
      const f = Math.min(s + 8, u.left);
      i.style.left = `${u.left - a.left - f}px`;
    }
    u.left < 0 && (i.style.left = `${-a.left + 4}px`), u.bottom > d + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-a.top + 4}px`, i.style.maxHeight = `${d - 8}px`));
  }, [t, e]);
}
function Cn(e, t, n, r) {
  const i = ge(), l = g(i);
  l.current = i, ue(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let u = 0;
    const c = () => {
      var U, F;
      u = 0;
      const h = a.getBoundingClientRect(), z = l.current;
      if (!z) return;
      const b = z.innerWidth, w = ((U = z.visualViewport) == null ? void 0 : U.height) ?? z.innerHeight, k = ((F = z.visualViewport) == null ? void 0 : F.offsetTop) ?? 0, R = (r == null ? void 0 : r.panelWidth) ?? Math.max(h.width, 200), H = 4, I = 120;
      let _ = Math.max(0, h.left);
      _ + R > b && (_ = Math.max(0, b - R - 8));
      const C = k + w - h.bottom - H - 16, W = h.top - k - H - 16;
      if (C >= I || C >= W) {
        const p = Math.min(h.bottom + H, k + w), x = Math.max(I, k + w - p - 16);
        n({ top: p, left: _, width: h.width, maxH: x });
      } else {
        const p = Math.max(I, Math.min(W, 360)), x = k + w - (h.top - H);
        n({ top: 0, left: _, width: h.width, maxH: p, bottom: Math.max(0, x) });
      }
    }, d = () => {
      u || (u = requestAnimationFrame(c));
    }, s = l.current ?? null, f = (s == null ? void 0 : s.document) ?? null;
    return d(), f == null || f.addEventListener("scroll", d, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", d), () => {
      u && cancelAnimationFrame(u), f == null || f.removeEventListener("scroll", d, { capture: !0 }), s == null || s.removeEventListener("resize", d);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let xe = null;
function Pt(e) {
  return xe == null || xe(), xe = e, () => {
    xe === e && (xe = null);
  };
}
const ot = Ce("dark"), Lt = () => Ee(ot), En = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", pt = D ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Rn = D ? "text-xs" : "text-[10px]";
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
    headerText: `${pt} font-semibold uppercase tracking-wider ${Rn} ui-label`,
    // Item padding
    itemPad: En,
    // Input
    input: D ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: D ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
function It(e) {
  const t = [];
  return me.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (me.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const it = Ce({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Oe = Ce(null), st = () => Ee(Oe);
function ct() {
  const e = g([]), [t, n] = Y(-1), [r, i] = Y(!1), [l, a] = Y(0), u = X((f) => (e.current = [...e.current, f], a((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== f), a((h) => h + 1);
  }), []), c = X((f, h) => {
    n(f), i(h === "pointer");
  }, []), d = X(() => {
    i((f) => f && (n(-1), !1));
  }, []);
  return Le(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: u,
    setHighlighted: c,
    pointerLeave: d
  }), [t, r, l, u, c, d]);
}
function lt(e, t, n, r) {
  const i = g(-1);
  i.current = t.highlightedIndex;
  const l = g(t);
  l.current = t;
  const a = g(e);
  a.current = e;
  const u = g(r);
  u.current = r;
  const c = g({ text: "", time: 0 }), d = g(!1);
  d.current || (d.current = !0, n.current = (s) => {
    var h, z;
    if (!a.current) return;
    const f = l.current.items;
    if (f.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const b = s.key === "ArrowDown" ? 1 : -1, w = (i.current + b + f.length) % f.length;
        l.current.setHighlighted(w, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const b = i.current;
        b >= 0 && b < f.length && f[b].submenu && f[b].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (z = (h = u.current) == null ? void 0 : h.onCloseSub) == null || z.call(h);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const b = i.current;
        b >= 0 && b < f.length && f[b].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const b = Date.now(), w = (b - c.current.time > 500 ? "" : c.current.text) + s.key.toLowerCase();
        if (c.current = { text: w, time: b }, !w) return;
        const k = i.current + 1;
        for (let R = 0; R < f.length; R++) {
          const H = (k + R) % f.length;
          if (f[H].label.toLowerCase().startsWith(w)) {
            l.current.setHighlighted(H, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function at(e, t, n, r, i, l) {
  const a = g(t);
  a.current = t;
  const u = g(e);
  u.current = e;
  const c = g(i);
  c.current = i;
  const d = g(!1);
  d.current || (d.current = !0, l.current = (s) => {
    if (!u.current || c.current) return;
    const f = r.current;
    f && f.contains(s.target) || a.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function ut(e, t) {
  const n = g(e);
  n.current = e;
  const r = g(!1);
  r.current || (r.current = !0, t.current = (i) => {
    if (!n.current) return;
    const l = i.currentTarget;
    l.scrollHeight > l.clientHeight && (i.preventDefault(), l.scrollTop += i.deltaY);
  });
}
function He({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: i = "left",
  width: l,
  theme: a = "dark",
  children: u,
  morph: c = !0,
  contentClassName: d,
  initialHighlightIndex: s
}) {
  const [f, h] = Y([]), [z, b] = Y(null), w = ve(), k = g(null), R = g(null), H = g(e);
  H.current = e;
  const [I, _] = Y(e), C = ct();
  j(() => {
    if (e)
      return _(!0), C.setHighlighted(s ?? -1, "keyboard"), Pt(() => {
        n == null || n(!1), t == null || t();
      });
    h([]);
  }, [e, s, n, t]);
  const W = X(() => {
    const m = k.current;
    if (!m) return null;
    const S = m.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), U = rt({
    visible: e,
    morph: c,
    anchor: W,
    onClosed: () => _(!1)
  }), F = g(() => {
  }), p = g(() => {
  }), x = g(() => {
  });
  lt(e && f.length === 0, C, F), ut(e, p), at(e, C, F, R, f.length > 0, x);
  const T = g(null), P = X((m) => {
    var S;
    if (m) {
      m.addEventListener("keydown", F.current, { capture: !0 }), m.addEventListener("wheel", p.current, { passive: !1 });
      const B = m.ownerDocument;
      T.current = B, B.addEventListener("keydown", x.current, { capture: !0 }), M(m.offsetWidth), y(!0);
    } else
      (S = T.current) == null || S.removeEventListener("keydown", x.current, { capture: !0 }), T.current = null, y(!1);
    R.current = m, U(m);
  }, [U]), [L, V] = Y({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [$, K] = Y(0), [v, y] = Y(!1), [Z, M] = Y(0);
  j(() => {
    e && k.current && K(k.current.getBoundingClientRect().width);
  }, [e]);
  const O = Le(() => ({ panelWidth: Z || $ || void 0 }), [Z, $]);
  Cn(k, e && v, (m) => V({ ...m, maxH: Math.min(m.maxH, 384), ready: !0 }), O), j(() => {
    if (L.ready && e) {
      const m = R.current;
      m && m.ownerDocument.activeElement !== m && !m.contains(m.ownerDocument.activeElement) && m.focus();
    }
  }, [L.ready, e]), ue(() => {
    var S;
    if (!e || C.highlightedIndex < 0) return;
    const m = (S = R.current) == null ? void 0 : S.querySelector(`[data-ei="${C.highlightedIndex}"]`);
    m == null || m.scrollIntoView({ block: "nearest" });
  }, [e, C.highlightedIndex]);
  const A = X((m) => {
    !m && !H.current || (!m && G.current && (re.current = !0), n ? n(m) : m || t == null || t());
  }, [n, t]), N = g(I);
  N.current = I;
  const G = g(!1), re = g(!1), de = X(() => {
    if (!H.current && N.current) {
      if (re.current) {
        re.current = !1, G.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), le = me.isValidElement(r) ? r : null, ae = le ? me.cloneElement(le, {
    ref: (m) => {
      k.current = m;
    },
    onPointerDown: () => {
      G.current = !0, re.current = !1;
    },
    onClick: (m) => {
      var S, B;
      (B = (S = le.props).onClick) == null || B.call(S, m), de();
    }
  }) : r;
  return /* @__PURE__ */ E(J.Root, { open: e || I, onOpenChange: A, modal: !1, children: [
    /* @__PURE__ */ o(J.Trigger, { asChild: !0, children: ae }),
    /* @__PURE__ */ o(J.Portal, { container: w ?? void 0, children: /* @__PURE__ */ o(ot.Provider, { value: a, children: /* @__PURE__ */ o(it.Provider, { value: { chain: f, setChain: h, morph: c, keyboardOpened: z, setKeyboardOpened: b }, children: /* @__PURE__ */ o(Oe.Provider, { value: C, children: /* @__PURE__ */ o(
      J.Content,
      {
        ref: P,
        "data-theme": a,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${l || ""} ${d || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: L.left,
          top: L.bottom != null ? void 0 : L.top,
          bottom: L.bottom,
          width: l ? void 0 : $ || void 0,
          maxHeight: L.maxH,
          visibility: L.ready ? "visible" : "hidden"
        },
        onPointerLeave: C.pointerLeave,
        children: u
      }
    ) }) }) }) })
  ] });
}
function Qr({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: i,
  onRename: l,
  onDuplicate: a,
  onDelete: u,
  onCreate: c,
  onImport: d,
  onExport: s,
  onReset: f,
  onTrash: h,
  closeOnSelect: z,
  readOnly: b = !1,
  theme: w,
  align: k,
  label: R,
  header: H,
  itemLabel: I,
  trigger: _,
  minItems: C = 1,
  itemRender: W,
  morph: U = !0,
  contentClassName: F
}) {
  const p = At(), [x, T] = Y(null), [P, L] = Y(""), V = g(null), $ = g(null);
  j(() => {
    e && requestAnimationFrame(() => {
      var M, O;
      (O = (M = $.current) == null ? void 0 : M.querySelector('[data-active="1"]')) == null || O.scrollIntoView({ block: "nearest" });
    });
  }, [e]), j(() => {
    var A;
    if (!e) return;
    const M = (N) => {
      var he, m, S, B, ee;
      if ((m = (he = N.target) == null ? void 0 : he.closest) != null && m.call(he, "input, textarea, [contenteditable]")) return;
      const G = (S = $.current) == null ? void 0 : S.closest(".ui-menu");
      if (!G || !G.contains(N.target)) return;
      const re = G.ownerDocument, de = [...G.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], le = [...G.querySelectorAll('div:last-child > [role="menuitem"]')], ae = [...de, ...le];
      if (N.key === "ArrowDown" || N.key === "ArrowUp") {
        N.preventDefault(), N.stopImmediatePropagation();
        const q = re.activeElement;
        let Q = q ? ae.indexOf(q) : -1;
        if (Q < 0 && q) {
          const ce = q.closest("[data-active]"), be = ce == null ? void 0 : ce.querySelector('[role="menuitem"]:first-child');
          be && (Q = de.indexOf(be));
        }
        const ne = N.key === "ArrowDown" ? 1 : -1, te = Q < 0 ? ne === 1 ? 0 : ae.length - 1 : (Q + ne + ae.length) % ae.length;
        (B = ae[te]) == null || B.focus({ preventScroll: !0 });
        return;
      }
      if (N.key === "ArrowLeft" || N.key === "ArrowRight") {
        const q = re.activeElement, Q = q == null ? void 0 : q.closest("[data-active]");
        if (!Q) return;
        N.preventDefault(), N.stopImmediatePropagation();
        const ne = [...Q.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ne.length === 0) return;
        const te = q && Q.contains(q) ? ne.indexOf(q) : -1, ce = N.key === "ArrowRight" ? 1 : -1, be = te < 0 ? 0 : (te + ce + ne.length) % ne.length;
        (ee = ne[be]) == null || ee.focus({ preventScroll: !0 });
        return;
      }
    }, O = ((A = $.current) == null ? void 0 : A.ownerDocument) ?? null;
    return O == null || O.addEventListener("keydown", M, { capture: !0 }), () => O == null ? void 0 : O.removeEventListener("keydown", M, { capture: !0 });
  }, [e]), j(() => {
    if (x) {
      requestAnimationFrame(() => {
        var O, A;
        (O = V.current) == null || O.focus(), (A = V.current) == null || A.select();
      });
      const M = n.find((O) => O.id === x);
      M && !P && L(M.name);
    }
  }, [x]), j(() => {
    if (x) {
      const M = n.find((O) => O.id === x);
      M && !P && L(M.name);
    }
  }, [x, n]);
  const K = (M, O) => {
    T(M), L(O);
  }, v = () => {
    x && P.trim() && l(x, P.trim()), T(null);
  }, y = () => {
    T(null);
  }, Z = I || H.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ E(He, { open: e, onOpenChange: (M) => {
    M ? (T(null), L("")) : (x && P.trim() && l(x, P.trim()), T(null), L("")), (!M || !b) && t(M);
  }, width: "w-80", theme: w, align: k, trigger: _, morph: U, contentClassName: F, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${p.headerText}`, children: H }),
    /* @__PURE__ */ o("div", { ref: $, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((M) => {
      const O = M.id === r, A = x === M.id;
      return /* @__PURE__ */ o("div", { "data-active": O ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${O || A ? p.rowActiveBg : p.rowHoverBg} ${x && !A ? "opacity-40 pointer-events-none" : ""}`, children: A ? /* @__PURE__ */ E(pe, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: V,
            value: P,
            onChange: (N) => L(N.target.value),
            onKeyDown: (N) => {
              N.key === "Enter" && (N.preventDefault(), N.stopPropagation(), v()), N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), y());
            },
            className: `w-full border rounded ${p.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          J.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${p.editConfirm} !text-white`,
            onSelect: (N) => {
              N.preventDefault(), v();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(zt, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          J.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${p.editCancel} !text-white`,
            onSelect: (N) => {
              N.preventDefault(), y();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Ze, { className: p.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ E(pe, { children: [
        /* @__PURE__ */ o(
          J.Item,
          {
            className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none cursor-pointer flex items-center ${p.rowText} ${O ? "" : p.rowTextHover}`,
            onSelect: z ? () => {
              i(M.id);
            } : (N) => {
              N.preventDefault(), i(M.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${O ? p.rowActiveText : ""}`, children: W ? W(M) : M.name })
          }
        ),
        /* @__PURE__ */ o(
          J.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${O ? p.btnActive : p.btnBase} ${O ? "!text-white" : ""}`,
            onSelect: (N) => {
              N.preventDefault(), K(M.id, M.name);
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: /* @__PURE__ */ o(qt, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          J.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${O ? p.btnActive : p.btnBase} ${O ? "!text-white" : ""}`,
            onSelect: (N) => {
              N.preventDefault();
              const G = a(M.id);
              G && K(G, `${M.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: /* @__PURE__ */ o(Ct, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          J.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= C ? p.btnDisabled : O ? p.btnDangerActive : p.btnDanger} ${O ? "!text-white hover:!text-red-400" : ""}`,
            onSelect: (N) => {
              N.preventDefault(), u(M.id);
            },
            onTouchStart: () => {
            },
            disabled: b || n.length <= C,
            children: /* @__PURE__ */ o(Fe, { className: p.btnIcon })
          }
        )
      ] }) }, M.id);
    }) }),
    /* @__PURE__ */ E("div", { className: `shrink-0 ${x ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ E(pe, { children: [
        /* @__PURE__ */ o(J.Separator, { className: p.separator }),
        /* @__PURE__ */ E(
          J.Item,
          {
            className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
            onSelect: (M) => {
              M.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: [
              /* @__PURE__ */ o(Et, { className: `${p.btnIcon} ${p.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || d || s || h) && /* @__PURE__ */ o(J.Separator, { className: p.separator }),
      c && /* @__PURE__ */ E(
        J.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault();
            const O = c();
            O && K(O, "");
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ o(Xt, { className: `${p.btnIcon} ${p.icon}` }),
            "New ",
            Z
          ]
        }
      ),
      d && /* @__PURE__ */ E(
        J.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ E("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ E(
        J.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ E("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      h && /* @__PURE__ */ E(
        J.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (M) => {
            M.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ o(Fe, { className: `${p.btnIcon} ${p.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Tn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Dn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: i = "",
  children: l,
  keepOpen: a = !1,
  selected: u = !1,
  rightAction: c,
  trailing: d
}) {
  Lt();
  const s = At(), f = g(!1), h = g(null), z = st(), b = g(z);
  b.current = z;
  const w = g(null);
  j(() => {
    var _;
    const I = {
      label: It(l),
      activate: () => {
        n || e();
      }
    };
    return w.current = I, (_ = b.current) == null ? void 0 : _.register(I);
  }, []);
  const k = z && w.current ? z.items.indexOf(w.current) : -1, R = !n && k >= 0 && k === z.highlightedIndex, H = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ E(
    J.Item,
    {
      ref: h,
      "data-ei": k >= 0 ? k : void 0,
      className: `w-full text-left ${Tn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${H} ${u ? "ui-item-selected" : ""} ${R ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (I) => {
        if (f.current) {
          f.current = !1;
          return;
        }
        a && I.preventDefault(), e();
      },
      onPointerEnter: () => {
        !n && z && k >= 0 && z.setHighlighted(k, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ o("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: l }),
        d && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: d }),
        c && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: c.title,
            onPointerDown: (I) => {
              I.stopPropagation(), I.preventDefault(), f.current = !0, c.onClick();
            },
            onClick: (I) => {
              I.stopPropagation(), I.preventDefault();
            },
            children: c.icon
          }
        )
      ]
    }
  );
}
const Mn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Sn({ id: e, label: t, icon: n, width: r, side: i = "right", children: l, contentClassName: a }) {
  const { chain: u, setChain: c, morph: d, keyboardOpened: s, setKeyboardOpened: f } = Ee(it), h = u.includes(e), z = u[u.length - 1] === e, b = Lt(), w = ve(), k = g(null), R = g(null), [H, I] = Y(h), _ = !h && H;
  j(() => {
    h && I(!0);
  }, [h]);
  const C = () => c((A) => {
    const N = A.indexOf(e);
    return N >= 0 ? A.slice(0, N) : A;
  }), W = ct(), U = st(), F = g(U);
  F.current = U;
  const p = g(null);
  j(() => {
    var N;
    const A = {
      label: t,
      activate: () => {
        f(e), c((G) => G.includes(e) ? G : [...G, e]);
      },
      submenu: !0
    };
    return p.current = A, (N = F.current) == null ? void 0 : N.register(A);
  }, []);
  const x = U && p.current ? U.items.indexOf(p.current) : -1, T = x >= 0 && x === U.highlightedIndex, P = X(() => {
    const A = k.current;
    if (!A) return null;
    const N = A.getBoundingClientRect();
    return { left: N.left, top: N.top, width: N.width, height: N.height };
  }, []), L = rt({
    visible: h,
    morph: d,
    anchor: P,
    onClosed: () => I(!1)
  }), V = g(() => {
  }), $ = g(() => {
  }), K = g(() => {
  });
  lt(h && z, W, V, {
    onCloseSub: () => {
      C(), U && x >= 0 && U.setHighlighted(x, "keyboard");
    }
  });
  const v = g(s);
  v.current = s, j(() => {
    h && (v.current === e ? (W.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var A;
      return (A = R.current) == null ? void 0 : A.focus();
    }), f(null)) : W.setHighlighted(-1, "keyboard"));
  }, [h]), ut(h, $), at(h, W, V, R, !z, K), me.useLayoutEffect(() => {
    var N;
    if (!h || W.highlightedIndex < 0) return;
    const A = (N = R.current) == null ? void 0 : N.querySelector(`[data-ei="${W.highlightedIndex}"]`);
    A == null || A.scrollIntoView({ block: "nearest" });
  }, [h, W.highlightedIndex]);
  const y = g(null), Z = X((A) => {
    var N;
    if (A) {
      A.addEventListener("keydown", V.current, { capture: !0 }), A.addEventListener("wheel", $.current, { passive: !1 });
      const G = A.ownerDocument;
      y.current = G, G.addEventListener("keydown", K.current, { capture: !0 });
    } else
      (N = y.current) == null || N.removeEventListener("keydown", K.current, { capture: !0 }), y.current = null;
    R.current = A, L(A);
  }, [L]), M = `w-full text-left ${Mn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${T ? " ui-item-highlighted" : ""}${_ ? " ui-sub-closing" : ""}`, O = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ E(J.Sub, { open: h || H, onOpenChange: (A) => c((N) => {
    if (!A) {
      const G = N.indexOf(e);
      return G >= 0 ? N.slice(0, G) : N;
    }
    return N.includes(e) ? N : [...N, e];
  }), children: [
    /* @__PURE__ */ E(
      J.SubTrigger,
      {
        ref: k,
        "data-ei": x >= 0 ? x : void 0,
        className: M,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          U && x >= 0 && U.setHighlighted(x, "pointer");
        },
        onPointerDown: (A) => {
          A.pointerType === "pen" && (A.preventDefault(), c((N) => h ? N.slice(0, N.indexOf(e)) : [...N, e]));
        },
        children: [
          i === "left" && /* @__PURE__ */ o(Ue, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ E("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          i === "right" && /* @__PURE__ */ o(Ue, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(J.Portal, { container: w ?? void 0, children: /* @__PURE__ */ o(
      J.SubContent,
      {
        ref: Z,
        "data-theme": b,
        className: O,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: W.pointerLeave,
        children: /* @__PURE__ */ o(Oe.Provider, { value: W, children: l })
      }
    ) })
  ] });
}
const ke = 8, Pn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ln = D ? "text-sm" : "text-xs", eo = ({ open: e, x: t, y: n, onClose: r, children: i, containerRef: l, morph: a = !0 }) => {
  const u = g(null), c = ge(), [d, s] = Y(!1), [f, h] = Y([]), [z, b] = Y(null), w = ct();
  j(() => {
    if (e)
      return w.setHighlighted(-1, "keyboard"), Pt(r);
  }, [e, r]);
  const k = g({ left: t, top: n });
  e && (k.current = { left: t, top: n });
  const R = X(() => ({ left: k.current.left, top: k.current.top, width: 0, height: 0 }), []), H = rt({
    visible: !0,
    morph: a,
    anchor: R,
    cloneOnUnmount: !0
  }), I = g(() => {
  }), _ = g(() => {
  }), C = g(() => {
  });
  lt(e, w, I), ut(e, _), at(e, w, I, u, f.length > 0, C);
  const W = g(null), U = X((x) => {
    var T;
    if (x) {
      x.addEventListener("keydown", I.current, { capture: !0 }), x.addEventListener("wheel", _.current, { passive: !1 });
      const P = x.ownerDocument;
      W.current = P, P.addEventListener("keydown", C.current, { capture: !0 });
    } else
      (T = W.current) == null || T.removeEventListener("keydown", C.current, { capture: !0 }), W.current = null;
    u.current = x, s(!!x), H(x);
  }, [H]), [F, p] = Y(null);
  return ue(() => {
    var M;
    if (!e || !d || !u.current) return;
    const x = u.current, T = x.offsetWidth, P = x.offsetHeight, L = (M = l == null ? void 0 : l.current) == null ? void 0 : M.getBoundingClientRect(), V = L ? L.right : (c == null ? void 0 : c.innerWidth) ?? 0, $ = L ? L.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, K = L ? L.left : 0, v = L ? L.top : 0;
    let y = Math.max(v + ke, k.current.top), Z = Math.max(K + ke, k.current.left);
    Z + T > V && (Z = V - T - ke), y + P > $ && (y = Math.max(v + ke, $ - P - ke)), p({ left: Z, top: y });
  }, [e, d, t, n, l]), e ? /* @__PURE__ */ E(J.Root, { open: e, onOpenChange: (x) => {
    x || r();
  }, modal: !1, children: [
    /* @__PURE__ */ o(J.Trigger, { asChild: !0, children: /* @__PURE__ */ o("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ o(J.Portal, { children: /* @__PURE__ */ o(ot.Provider, { value: "light", children: /* @__PURE__ */ o(it.Provider, { value: { chain: f, setChain: h, morph: a, keyboardOpened: z, setKeyboardOpened: b }, children: /* @__PURE__ */ o(Oe.Provider, { value: w, children: /* @__PURE__ */ o(
      J.Content,
      {
        ref: U,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Ln} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (F == null ? void 0 : F.left) ?? k.current.left, top: (F == null ? void 0 : F.top) ?? k.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, to = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: i = !1, trailing: l, children: a }) => {
  const u = st(), c = g(u);
  c.current = u;
  const d = g(null);
  j(() => {
    var z;
    const h = { label: It(a), activate: () => {
      r || e();
    } };
    return d.current = h, (z = c.current) == null ? void 0 : z.register(h);
  }, []);
  const s = u && d.current ? u.items.indexOf(d.current) : -1, f = !r && s >= 0 && s === u.highlightedIndex;
  return /* @__PURE__ */ E(
    J.Item,
    {
      "data-ei": s >= 0 ? s : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && s >= 0 && u.setHighlighted(s, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${Pn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${f ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        l && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: l })
      ]
    }
  );
}, no = () => /* @__PURE__ */ o(J.Separator, { className: "ui-sep my-1" }), ro = (e) => /* @__PURE__ */ o(Sn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" });
function An({ checked: e, onChange: t, disabled: n = !1, label: r, id: i, className: l = "", labelClassName: a = "", theme: u, variant: c = "pill", tone: d = "accent", block: s = !1 }) {
  const f = c !== "plain", h = D ? "w-5 h-5" : "w-4 h-4", z = D ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", b = D ? "w-3.5 h-3.5" : "w-3 h-3", w = D ? "text-sm" : "text-xs";
  return /* @__PURE__ */ E(
    "label",
    {
      className: `ui-checkbox ${f ? `ui-checkbox-pill ${D ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${d === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${l}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: D ? 10 : 8 },
      onClick: (R) => R.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: e,
            disabled: n,
            onChange: (R) => t(R.target.checked),
            className: "sr-only"
          }
        ),
        f ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ E("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${z}`, "aria-hidden": !0, children: e && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: b, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${w} ${a}`, children: r })
      ]
    }
  );
}
const In = D ? "p-6" : "p-5", On = D ? "text-base" : "text-sm", Hn = D ? "w-5 h-5" : "w-4 h-4", _n = D ? "text-sm" : "text-xs", Bn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", mt = D ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", gt = D ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", bt = D ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", Te = D ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", Ot = Ce(null);
function oo() {
  const e = Ee(Ot);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function io({ children: e }) {
  const [t, n] = Y(null), [r, i] = Y(!1), l = ve(), a = ge(), u = g(a);
  u.current = a;
  const c = g(null), d = g(null), [s, f] = Y(null), h = g(null), [z, b] = Y(null), w = g(null), k = h.current !== null;
  w.current, j(() => {
    t || (f(null), b(null));
  }, [t]);
  const R = X(() => {
    const v = d.current;
    if (!v) return null;
    const y = v.getBoundingClientRect();
    return { left: y.left, top: y.top, width: y.width, height: y.height };
  }, []), H = X((v) => {
    if (v.target.closest("button")) return;
    const y = R();
    y && (f(y), b({ w: y.width, h: y.height }), h.current = { startX: v.clientX, startY: v.clientY, posX: y.left, posY: y.top }, v.target.setPointerCapture(v.pointerId));
  }, [R]), I = X((v) => {
    const y = h.current;
    y && (v.preventDefault(), f({ left: y.posX + v.clientX - y.startX, top: y.posY + v.clientY - y.startY }));
  }, []), _ = X(() => {
    h.current = null;
  }, []), C = X((v) => (y) => {
    y.stopPropagation();
    const Z = R();
    Z && (f(Z), b({ w: Z.width, h: Z.height }), w.current = { dir: v, startX: y.clientX, startY: y.clientY, startL: Z.left, startT: Z.top, startW: Z.width, startH: Z.height }, y.target.setPointerCapture(y.pointerId));
  }, [R]), W = 200, U = 100, F = 32, p = X((v) => {
    const y = w.current;
    if (!y) return;
    v.preventDefault();
    const Z = v.clientX - y.startX, M = v.clientY - y.startY;
    let O = y.startW, A = y.startH, N = y.startL, G = y.startT;
    y.dir.includes("e") && (O = y.startW + Z), y.dir.includes("w") && (O = y.startW - Z, N = y.startL + Z), y.dir.includes("s") && (A = y.startH + M), y.dir.includes("n") && (A = y.startH - M, G = y.startT + M);
    const re = u.current;
    if (!re) return;
    const de = re.innerWidth, le = re.innerHeight;
    O = Math.max(W, Math.min(O, de - F * 2)), A = Math.max(U, Math.min(A, le - F * 2)), y.dir.includes("w") && (N = Math.max(F, Math.min(N, de - O - F))), y.dir.includes("n") && (G = Math.max(F, Math.min(G, le - A - F))), b({ w: O, h: A }), f({ left: N, top: G });
  }, []), x = X(() => {
    w.current = null;
  }, []), T = X(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]), P = X((v) => {
    if (v.suppressKey) {
      const y = localStorage.getItem(v.suppressKey);
      if (y && Date.now() < parseInt(y, 10))
        return Promise.resolve(!0);
    }
    return new Promise((y) => {
      i(!1), n({ kind: "confirm", options: v, resolve: y });
    });
  }, []), L = X((v) => new Promise((y) => {
    n({ kind: "prompt", options: v, resolve: y });
  }), []), V = X((v) => new Promise((y) => {
    n({ kind: "alert", options: v, resolve: y });
  }), []);
  j(() => {
    if (t) {
      const v = setTimeout(() => {
        var y;
        return (y = c.current) == null ? void 0 : y.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [t]);
  const $ = () => {
    var v, y;
    !t || t.kind !== "prompt" || (t.resolve(((y = (v = c.current) == null ? void 0 : v.value) == null ? void 0 : y.trim()) || null), n(null));
  }, K = t !== null;
  return /* @__PURE__ */ E(Ot.Provider, { value: { confirm: P, prompt: L, alert: V }, children: [
    e,
    /* @__PURE__ */ o(oe.Root, { open: K, onOpenChange: (v) => {
      v || T();
    }, modal: !0, children: /* @__PURE__ */ E(oe.Portal, { container: l ?? void 0, children: [
      /* @__PURE__ */ o(oe.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ E(
        oe.Content,
        {
          ref: d,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${In} space-y-4 focus:outline-none ${s || z ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${z ? "" : "w-full max-w-sm"}`,
          style: { ...s ? { left: s.left, top: s.top } : {}, ...z ? { width: z.w, height: z.h } : {} },
          onEscapeKeyDown: (v) => {
            T(), v.preventDefault();
          },
          onPointerDownOutside: (v) => {
            T(), v.preventDefault();
          },
          onKeyDown: (v) => {
            if (v.key === "Enter") {
              if ((t == null ? void 0 : t.kind) === "prompt" && v.target instanceof HTMLInputElement || (v.preventDefault(), !t)) return;
              t.kind === "confirm" ? (t.resolve(!0), n(null)) : t.kind === "prompt" ? $() : (t.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ E(
              "div",
              {
                className: `flex items-center justify-between ${k ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: H,
                onPointerMove: I,
                onPointerUp: _,
                children: [
                  /* @__PURE__ */ o(oe.Title, { className: `${On} ui-dialog-title`, children: t == null ? void 0 : t.options.title }),
                  /* @__PURE__ */ o(oe.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ o(Ze, { className: Hn }) })
                ]
              }
            ),
            (t == null ? void 0 : t.options.message) && /* @__PURE__ */ o(oe.Description, { className: `${_n} ui-dialog-text`, children: t.options.message }),
            (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ o(
              An,
              {
                block: !0,
                checked: r,
                onChange: i,
                tone: "danger",
                label: "Don't ask again (24 hours)"
              }
            ),
            (t == null ? void 0 : t.kind) === "prompt" && /* @__PURE__ */ o(
              "input",
              {
                ref: c,
                type: "text",
                defaultValue: t.options.defaultValue || "",
                placeholder: t.options.placeholder,
                onKeyDown: (v) => {
                  v.key === "Enter" && $();
                },
                className: `w-full ${Bn} ui-input`
              }
            ),
            /* @__PURE__ */ E("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
              (t == null ? void 0 : t.kind) !== "alert" && /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    const v = t;
                    v && (v.kind === "confirm" ? (v.resolve(!1), n(null)) : v.kind === "prompt" && (v.resolve(null), n(null)));
                  },
                  className: `${mt} ui-btn ui-btn-ghost`,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    if (t)
                      if (t.kind === "confirm") {
                        const v = t.options;
                        v.suppressKey && r && localStorage.setItem(v.suppressKey, String(Date.now() + 864e5)), t.resolve(!0), n(null);
                      } else t.kind === "prompt" ? $() : (t.resolve(), n(null));
                  },
                  className: `${mt} ui-btn ${(t == null ? void 0 : t.kind) === "confirm" && t.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (t == null ? void 0 : t.kind) === "alert" ? "OK" : (t == null ? void 0 : t.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ E("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ o("div", { className: `absolute ${gt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: C("n"), onPointerMove: p, onPointerUp: x }),
              /* @__PURE__ */ o("div", { className: `absolute ${gt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: C("s"), onPointerMove: p, onPointerUp: x }),
              /* @__PURE__ */ o("div", { className: `absolute ${bt} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: C("w"), onPointerMove: p, onPointerUp: x }),
              /* @__PURE__ */ o("div", { className: `absolute ${bt} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: C("e"), onPointerMove: p, onPointerUp: x }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 left-0 ${Te} cursor-nw-resize pointer-events-auto`, onPointerDown: C("nw"), onPointerMove: p, onPointerUp: x }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 right-0 ${Te} cursor-ne-resize pointer-events-auto`, onPointerDown: C("ne"), onPointerMove: p, onPointerUp: x }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 left-0 ${Te} cursor-sw-resize pointer-events-auto`, onPointerDown: C("sw"), onPointerMove: p, onPointerUp: x }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 right-0 ${Te} cursor-se-resize pointer-events-auto`, onPointerDown: C("se"), onPointerMove: p, onPointerUp: x })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const ie = 32, Ht = "[data-modal-stack]", fe = 220, ze = "cubic-bezier(0.32, 0.72, 0, 1)", Se = 0.94;
function Ne() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function _t(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function xt(e, t, n, r) {
  const i = ++e.current, l = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = _t(l, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === i && (t.style.transition = `transform ${fe}ms ${ze}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === i && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, fe + 80));
    });
  });
}
function Wn(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${Se})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${fe}ms ${ze}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, fe + 60));
    });
  });
}
function yt(e, t, n) {
  const r = ++e.current, i = t.getBoundingClientRect(), l = 1 - Se, a = { left: i.left + i.width * l / 2, top: i.top + i.height * l / 2, width: i.width * Se, height: i.height * Se };
  t.style.transition = `transform ${fe}ms ${ze}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = _t(i, a), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, fe + 60);
}
function Be(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Ht) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function We(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Ht) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Kn = D ? "px-6" : "px-5", Yn = D ? "py-3" : "py-2.5", Fn = D ? "text-sm" : "text-xs", Un = D ? "w-4 h-4" : "w-3.5 h-3.5", qn = D ? "text-xs" : "text-[10px]", Xn = D ? "w-3.5 h-3.5" : "w-3 h-3", Gn = D ? "px-2.5 py-1.5" : "px-2 py-1", jn = D ? "px-6" : "px-5", Vn = D ? "py-3" : "py-2";
function so({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: i,
  footer: l,
  children: a,
  onReset: u,
  morph: c = !0
}) {
  const d = g(null), s = g(null), f = g(null), [h, z] = Y(!1), b = X((m) => {
    d.current = m, z(m !== null);
  }, []), w = ve(), k = ge(), R = g(k);
  R.current = k;
  const [H, I] = Y(null), _ = g(null), C = g(!1), W = g(!1), [U, F] = Y(!1), p = g(0), x = g(!1), [T, P] = Y(!1), L = g(c);
  L.current = c;
  const V = g(!1), $ = g(!1), K = () => {
    $.current = !0, F(!0);
  }, v = () => {
    $.current = !1, F(!1);
  };
  j(() => {
    e || (I(null), W.current = !1, C.current = !1);
  }, [e]), ue(() => {
    var ee, q;
    if (!e || W.current || !h || !d.current) return;
    W.current = !0;
    const m = d.current.getBoundingClientRect(), S = ((ee = R.current) == null ? void 0 : ee.innerWidth) ?? 0, B = ((q = R.current) == null ? void 0 : q.innerHeight) ?? 0;
    I({
      left: Math.max(ie, Math.min((S - m.width) / 2, S - m.width - ie)),
      top: Math.max(ie, Math.min((B - m.height) / 2, B - m.height - ie))
    });
  }, [e, h]), ue(() => {
    if (!e || !h || !c || Ne() || !d.current) return;
    const m = d.current, S = Be(m), B = S[S.length - 1];
    K(), B ? xt(p, m, B.getBoundingClientRect(), v) : Wn(p, m, v);
  }, [e, h]);
  const y = X(() => {
    if (x.current) return;
    const m = d.current, S = !!m && Be(m).length > 0;
    if (!m || !c || Ne() || S) {
      t();
      return;
    }
    x.current = !0, P(!0), V.current = !0, K(), yt(p, m, () => {
      x.current = !1, P(!1), v(), t();
    });
  }, [c, t]);
  ue(() => () => {
    const m = d.current;
    if (!m || V.current || !L.current || Ne() || Be(m).length > 0) return;
    const S = m.ownerDocument, B = m.cloneNode(!0);
    B.removeAttribute("data-modal-stack"), B.removeAttribute("data-state"), B.removeAttribute("role"), B.removeAttribute("data-aria-hidden"), B.removeAttribute("tabindex"), B.setAttribute("aria-hidden", "true"), B.style.pointerEvents = "none", S.body.appendChild(B), yt({ current: 0 }, B, () => {
      B.isConnected && B.remove();
    });
  }, []), j(() => {
    if (!e || !h || !c || !d.current) return;
    const m = d.current, S = m.parentNode;
    if (!S) return;
    let B = 0, ee = null, q = !1;
    const Q = () => {
      B = 0;
      const te = We(m);
      te.length > 0 ? (ee = te[te.length - 1].getBoundingClientRect(), q = !0, B = requestAnimationFrame(Q)) : q && (q = !1, ee && !Ne() && (K(), xt(p, m, ee, v)), ee = null);
    }, ne = new MutationObserver(() => {
      !B && We(m).length > 0 && (B = requestAnimationFrame(Q));
    });
    return ne.observe(S, { childList: !0 }), () => {
      ne.disconnect(), B && cancelAnimationFrame(B);
    };
  }, [e, h]), j(() => {
    if (!h || !c || Ne() || !d.current) return;
    const m = d.current;
    let S = Math.round(m.getBoundingClientRect().height), B = !1;
    const ee = new ResizeObserver(() => {
      var ft;
      if (!m.isConnected) return;
      const q = Math.round(m.getBoundingClientRect().height);
      if (!B) {
        B = !0, S = q;
        return;
      }
      if (Math.abs(q - S) < 1) return;
      if (_.current || x.current || We(m).length > 0) {
        S = q;
        return;
      }
      if ($.current) return;
      const Q = S;
      S = q, K();
      const ne = m.getBoundingClientRect(), te = !C.current, ce = ((ft = R.current) == null ? void 0 : ft.innerHeight) ?? 0, be = te ? (ce - Q) / 2 : ne.top, dt = te ? (ce - q) / 2 : ne.top;
      m.style.transition = "none", m.style.height = `${Q}px`, te && (m.style.top = `${be}px`), s.current && (s.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${Q}px` && (m.style.transition = `height ${fe}ms ${ze}${te ? `, top ${fe}ms ${ze}` : ""}`, m.style.height = `${q}px`, te && (m.style.top = `${dt}px`), window.setTimeout(() => {
            m.style.height === `${q}px` && (m.style.transition = "", m.style.height = "", s.current && (s.current.style.overflow = ""), te && I({ left: ne.left, top: dt }), v());
          }, fe + 60));
        });
      });
    });
    return ee.observe(m), () => ee.disconnect();
  }, [h]);
  const Z = X(() => {
    const m = d.current;
    if (!m) return null;
    const S = m.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), M = X((m, S) => {
    var te, ce;
    const B = ((te = R.current) == null ? void 0 : te.innerWidth) ?? 0, ee = ((ce = R.current) == null ? void 0 : ce.innerHeight) ?? 0, q = Z(), Q = q ? q.width : Math.min(B - ie * 2, 576), ne = q ? q.height : Math.min(ee - ie * 2, 400);
    return {
      left: Math.max(ie, Math.min(m, B - Q - ie)),
      top: Math.max(ie, Math.min(S, ee - ne - ie))
    };
  }, [Z]), O = X((m) => {
    if (m.target.closest("button")) return;
    C.current = !0;
    const S = Z();
    S && (I(M(S.left, S.top)), _.current = { startX: m.clientX, startY: m.clientY, posX: S.left, posY: S.top }, m.target.setPointerCapture(m.pointerId));
  }, [Z, M]), A = X((m) => {
    const S = _.current;
    S && (m.preventDefault(), I(M(S.posX + m.clientX - S.startX, S.posY + m.clientY - S.startY)));
  }, [M]), N = X(() => {
    _.current = null;
  }, []), G = _.current !== null, re = H !== null, de = re ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", le = `${i ? `${i} w-full` : "max-w-xl w-full"}`, ae = {
    ...re ? { left: H.left, top: H.top } : {},
    width: `min(100%, calc(100vw - ${ie * 2}px))`,
    maxHeight: `calc(100vh - ${ie * 2}px)`
  }, he = X((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const B = f.current;
    if (!B) return;
    const ee = Array.from(B.querySelectorAll("button[data-modal-confirm]")), q = ee.length > 0 ? ee : Array.from(B.querySelectorAll("button")), Q = q[q.length - 1];
    !Q || Q.disabled || (m.preventDefault(), Q.click());
  }, []);
  return /* @__PURE__ */ o(oe.Root, { open: e, onOpenChange: (m) => {
    m || y();
  }, children: /* @__PURE__ */ E(oe.Portal, { container: w ?? void 0, children: [
    /* @__PURE__ */ o(
      oe.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${T ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), y());
        }
      }
    ),
    /* @__PURE__ */ E(
      oe.Content,
      {
        ref: b,
        onKeyDown: he,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${de} ${le}`,
        style: { touchAction: "manipulation", ...Object.keys(ae).length > 0 ? ae : {} },
        children: [
          /* @__PURE__ */ E(
            "div",
            {
              className: `flex items-center justify-between ${Kn} ${Yn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${G ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                U || O(m);
              },
              onPointerMove: A,
              onPointerUp: N,
              children: [
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(oe.Title, { className: `${Fn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ E("button", { onClick: u, className: `flex items-center gap-1 ${qn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Gn} shrink-0`, children: [
                    /* @__PURE__ */ o(Et, { className: Xn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ o(oe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(Ze, { className: Un }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: s, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: a }),
          l && /* @__PURE__ */ o("div", { ref: f, className: "shrink-0", children: l })
        ]
      }
    )
  ] }) });
}
function co({ children: e }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${jn} ${Vn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const Zn = 500, Jn = 250, Qn = 5, se = 88, wt = 4;
function er(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const i = performance.now(), l = (a) => {
    const u = a - i, c = Math.min(u / t, 1);
    n.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(l);
  };
  requestAnimationFrame(l);
}
function tr({ x: e, y: t, ms: n }) {
  const r = g(null), i = ve();
  return j(() => {
    r.current && er(r.current, n);
  }, [n]), Je(
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
        children: /* @__PURE__ */ E("svg", { ref: r, width: se, height: se, viewBox: `0 0 ${se} ${se}`, children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: se / 2,
              cy: se / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: wt + 2,
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
              strokeWidth: wt,
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
function lo() {
  return { "data-no-longpress": "true" };
}
function nr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function ao({
  children: e,
  showRing: t = !0,
  longPressMs: n = Zn,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: l
}) {
  const [a, u] = Y(null), c = wn(), d = g(null), s = g(null), f = g({ x: 0, y: 0, target: null }), h = g(!1), z = Math.min(Jn, n * 0.5), b = g(i);
  b.current = i;
  const w = g(l);
  return w.current = l, j(() => {
    if (!D || !c) return;
    const k = (_) => {
      if (!qe(_.pointerType) || _.button !== 0) return;
      const C = _.target;
      if (!C.closest(r) || (b.current ? !b.current(C) : nr(C))) return;
      const W = _.clientX, U = _.clientY;
      f.current = { x: W, y: U, target: _.target }, h.current = !0, t && (s.current = setTimeout(() => u({ x: W, y: U }), z)), d.current = setTimeout(() => {
        if (!h.current) return;
        s.current && (clearTimeout(s.current), s.current = null), u(null);
        const F = f.current.target;
        if (!F) return;
        const p = w.current;
        if (p) {
          p(F, W, U);
          return;
        }
        const x = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: W,
          clientY: U,
          button: 2,
          view: window
        });
        F.dispatchEvent(x);
      }, n);
    }, R = (_) => {
      if (!h.current || d.current === null) return;
      const C = _.clientX - f.current.x, W = _.clientY - f.current.y;
      Math.sqrt(C * C + W * W) > Qn && (clearTimeout(d.current), d.current = null, s.current && (clearTimeout(s.current), s.current = null), h.current = !1, u(null));
    }, H = () => {
      d.current !== null && (clearTimeout(d.current), d.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), h.current = !1, u(null);
    }, I = (_) => {
      qe(_.pointerType) && (d.current !== null && (clearTimeout(d.current), d.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), h.current = !1, u(null));
    };
    return c == null || c.addEventListener("pointerdown", k), c.addEventListener("pointermove", R), c.addEventListener("pointerup", H), c.addEventListener("pointercancel", H), c.addEventListener("pointerleave", I), () => {
      c.removeEventListener("pointerdown", k), c.removeEventListener("pointermove", R), c.removeEventListener("pointerup", H), c == null || c.removeEventListener("pointercancel", H), c == null || c.removeEventListener("pointerleave", I), d.current !== null && clearTimeout(d.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, z, r]), /* @__PURE__ */ E(pe, { children: [
    e,
    t && a && /* @__PURE__ */ o(tr, { x: a.x, y: a.y, ms: n - z })
  ] });
}
function uo() {
  const e = kn();
  return vn ? e === null || qe(e) : !1;
}
const rr = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", or = {
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
}, vt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", ir = "bg-blue-900!";
function fo({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: i = "button",
  ...l
}) {
  const a = l["data-state"] === "open", u = or[t][e];
  let c = `${u.base} ${a ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (c = a ? `${vt} ${ir}` : vt), /* @__PURE__ */ o("button", { type: i, className: `${rr} ${c} ${r}`, ...l });
}
const sr = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${D ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, cr = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function ho({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: n,
      className: `${sr} ${cr[e]} ${t}`,
      ...r
    }
  );
}
const lr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], ar = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ke = 1900, Ye = 2100;
function ur(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function dr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function po({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: i = "" }) {
  const l = /* @__PURE__ */ new Date(), [a, u] = Y(l.getFullYear()), [c, d] = Y(l.getMonth()), [s, f] = Y("days"), [h, z] = Y(null), b = Le(() => new Set(e), [e]), w = ($) => {
    b.has($) ? t(e.filter((K) => K !== $)) : t([...e, $]);
  }, k = Le(() => {
    const $ = ur(a, c), K = new Date(a, c, 1).getDay(), v = [];
    for (let y = 0; y < K; y++) v.push({ key: `pad-${y}`, day: 0, empty: !0 });
    for (let y = 1; y <= $; y++) v.push({ key: dr(a, c, y), day: y, empty: !1 });
    return v;
  }, [a, c]), R = ($) => u((K) => Math.max(Ke, Math.min(Ye, K + $))), H = ($) => {
    c + $ < 0 ? (u((K) => Math.max(Ke, K - 1)), d(11)) : c + $ > 11 ? (u((K) => Math.min(Ye, K + 1)), d(0)) : d((K) => K + $);
  }, I = () => {
    if (h === null) return;
    const $ = parseInt(h, 10);
    !isNaN($) && $ >= Ke && $ <= Ye && u($), z(null);
  }, _ = ($) => e.some((K) => K.startsWith(`${a}-${String($ + 1).padStart(2, "0")}`)), C = n === "dark", W = D ? "p-2" : "p-1", U = D ? "w-5 h-5" : "w-4 h-4", F = D ? "text-[11px] py-2" : "text-[10px] py-1.5", p = D ? "py-2.5 text-sm" : "py-1.5 text-xs", x = D ? "py-3 text-sm" : "py-2 text-xs", T = D ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", P = D ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, L = C ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", V = C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ E("div", { className: `border rounded-lg overflow-hidden w-full ${C ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ E("div", { className: `flex items-center justify-between px-3 py-2 border-b ${C ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => s === "months" ? R(-1) : H(-1),
          className: `${W} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": s === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ o(Gt, { className: U })
        }
      ),
      s === "days" ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => f("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${C ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(a, c).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ o(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: h ?? String(a),
          onChange: ($) => z($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: I,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), I()), $.key === "Escape" && z(null);
          },
          className: P
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => s === "months" ? R(1) : H(1),
          className: `${W} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": s === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ o(Ue, { className: U })
        }
      )
    ] }),
    s === "months" ? /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 text-center", children: ar.map(($, K) => /* @__PURE__ */ E(
        "button",
        {
          type: "button",
          onClick: () => {
            d(K), f("days");
          },
          className: `${x} relative font-medium transition-colors border-b ${K === c ? L : V} ${C ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            $,
            _(K) && /* @__PURE__ */ o("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${K === c ? "bg-white" : C ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ o("div", { className: `text-center border-t ${C ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            u(l.getFullYear()), d(l.getMonth()), f("days");
          },
          className: `px-3 ${D ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${C ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ E("div", { className: "grid grid-cols-7 text-center", children: [
      lr.map(($) => /* @__PURE__ */ o("div", { className: `${F} font-semibold uppercase tracking-wider border-b ${C ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: $ }, $)),
      k.map(($) => $.empty ? /* @__PURE__ */ o("div", {}, $.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => w($.key),
          className: `${p} font-medium transition-colors border-b ${C ? "border-zinc-800/60" : "border-zinc-50"} ${b.has($.key) ? L : C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ E("div", { className: `px-3 py-2 border-t ${C ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ E("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: e.map(($) => {
        const K = /* @__PURE__ */ new Date($ + "T00:00:00"), v = K.getFullYear() === l.getFullYear() ? K.toLocaleString("default", { month: "short", day: "numeric" }) : K.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ E(
          "button",
          {
            type: "button",
            onClick: () => w($),
            "aria-label": `Remove ${v}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${C ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${T}`,
            children: [
              v,
              /* @__PURE__ */ o("span", { className: `leading-none ${C ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function mo({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: i,
  allSelected: l = !1,
  toggleAllLabel: a,
  emptyHint: u = "Nothing here",
  maxHeight: c,
  disabled: d = !1,
  theme: s,
  className: f = ""
}) {
  const h = (k) => t instanceof Set ? t.has(k) : t.includes(k), z = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", b = D ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", w = r != null || i != null;
  return /* @__PURE__ */ E("div", { className: f, ...s ? { "data-theme": s } : {}, children: [
    w && /* @__PURE__ */ E("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ o("button", { type: "button", disabled: d, onClick: i, className: "ui-checklist-toggleall", children: a ?? (l ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((k) => {
            const R = h(k.id);
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(k.id),
                className: `ui-checklist-item ${z} ${R ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${b}`, "aria-hidden": !0, children: R && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  k.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: k.secondary })
                ]
              },
              k.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: u })
        ]
      }
    )
  ] });
}
function go({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: l,
  compact: a = !1,
  disabled: u = !1,
  theme: c,
  className: d = ""
}) {
  const s = a ? "px-2.5 py-1.5 text-xs" : D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", f = a ? "w-3.5 h-3.5" : D ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ E("div", { className: d, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((h) => {
            const z = t === h.id;
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(h.id),
                className: `ui-checklist-item ${s} ${z ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${f}`, "aria-hidden": !0, children: z && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  h.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: h.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: h.label }),
                  h.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: h.secondary })
                ]
              },
              h.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const bo = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: l = 8
}) => {
  const a = ge(), { refs: u, floatingStyles: c } = en({
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
          var H;
          if (i !== "visible") return {};
          const s = (H = d.elements.floating.ownerDocument) == null ? void 0 : H.defaultView;
          if (!s) return {};
          const f = d.rects.reference, h = Math.max(f.x, 0), z = Math.max(f.y, 0), b = Math.min(f.x + f.width, s.innerWidth), w = Math.min(f.y + f.height, s.innerHeight);
          if (b <= h || w <= z) return {};
          const k = r === "left" ? b - (f.x + f.width) : r === "right" ? h - f.x : 0, R = r === "top" ? z - f.y : r === "bottom" ? w - (f.y + f.height) : 0;
          return { x: d.x + k, y: d.y + R };
        }
      },
      nn(l),
      rn({ padding: 8 }),
      on({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (d) => {
          var w;
          const s = (w = d.elements.floating.ownerDocument) == null ? void 0 : w.defaultView;
          if (!s) return {};
          const f = d.rects.floating.width, h = d.rects.floating.height, z = Math.max(8, Math.min(d.x, s.innerWidth - f - 8)), b = Math.max(8, Math.min(d.y, s.innerHeight - h - 8));
          return { x: z, y: b };
        }
      }
    ],
    whileElementsMounted: tn
  });
  return ue(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ E(pe, { children: [
    !n && /* @__PURE__ */ o("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    a && Je(
      /* @__PURE__ */ o(
        "div",
        {
          ref: u.setFloating,
          className: `ui-chrome ${e}`,
          style: c,
          onMouseDown: (d) => d.stopPropagation(),
          onClick: (d) => d.stopPropagation(),
          onDragStart: (d) => d.preventDefault(),
          children: t
        }
      ),
      a.document.body
    )
  ] });
}, $e = ({ content: e, children: t }) => {
  const n = ve(), r = ge(), [i, l] = Y(!1), [a, u] = Y({ x: 0, y: 0 }), c = g(null), d = () => {
    if (!c.current) return;
    const s = c.current.getBoundingClientRect();
    u({ x: s.left + s.width / 2, y: s.top });
  };
  return j(() => (i && r && (d(), r.addEventListener("scroll", d, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", d, !0)), [i]), /* @__PURE__ */ E(
    "div",
    {
      ref: c,
      className: "inline-flex",
      onMouseEnter: () => {
        d(), l(!0);
      },
      onMouseLeave: () => l(!1),
      children: [
        t,
        i && Je(
          /* @__PURE__ */ E(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: a.x, top: a.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((s, f) => /* @__PURE__ */ o("div", { className: f > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: s }, f)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, xo = D ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", je = D ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", De = D ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", fr = "hover:bg-red-950/50", Bt = D ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Wt = "bg-blue-900/50 border-blue-700 text-blue-300", Kt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", hr = D ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", yo = D ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Pe = D ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", pr = "inline-flex rounded overflow-hidden border border-zinc-700", Yt = D ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Me = ({ onClick: e, disabled: t, title: n, className: r = je, children: i }) => /* @__PURE__ */ o($e, { content: n, children: /* @__PURE__ */ o("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), wo = ({ value: e, options: t, onChange: n, disabled: r, active: i }) => /* @__PURE__ */ o("div", { className: pr, children: t.map((l) => {
  const a = i ? i(l.v) : e === l.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(l.v),
      className: `${D ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${a ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${l.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: l.l
    },
    l.v
  );
}) }), vo = ({ children: e }) => /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: D ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), mr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", gr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", ko = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ E("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ o("span", { className: n ? mr : gr, children: e }),
  t
] }), No = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ E("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), $o = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: i }) => /* @__PURE__ */ E(pe, { children: [
  /* @__PURE__ */ o(Me, { onClick: () => r(-1), disabled: e, title: "Move up", className: De, children: /* @__PURE__ */ o(jt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: () => r(1), disabled: e, title: "Move down", className: De, children: /* @__PURE__ */ o(Vt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: t, disabled: e, title: "Duplicate", className: De, children: /* @__PURE__ */ o(Ct, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o("div", { className: Pe }),
  /* @__PURE__ */ o(Me, { onClick: n, disabled: e, title: "Delete", className: `${De} ${fr}`, children: /* @__PURE__ */ o(Fe, { className: "w-2.5 h-2.5" }) })
] }), br = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), xr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), yr = /^(https?:\/\/|mailto:)/i;
function wr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const i = n.slice(0, r).trim().toLowerCase(), l = n.slice(r + 1).trim();
    xr.has(i) && l && t.push(`${i}: ${l}`);
  }
  return t.join("; ");
}
function Ve(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const u = document.createDocumentFragment();
    for (const c of Array.from(t.childNodes)) u.appendChild(Ve(c));
    return u;
  };
  if (!br.has(n)) return r();
  if (n === "a") {
    const u = t.getAttribute("href") || "";
    if (!yr.test(u)) return r();
  }
  const i = document.createElement(n), l = t.getAttribute("style"), a = wr(l || "");
  if (a && i.setAttribute("style", a), n === "a") {
    i.setAttribute("href", t.getAttribute("href"));
    const u = t.getAttribute("target"), c = t.getAttribute("rel");
    u && i.setAttribute("target", u), c && i.setAttribute("rel", c);
  }
  for (const u of Array.from(t.childNodes)) i.appendChild(Ve(u));
  return i;
}
function Ft(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function vr(e) {
  const t = Ft(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const a of Array.from(n.content.childNodes)) r.appendChild(Ve(a));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function zo(e) {
  const t = Ft(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Co(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const kr = { text: "#52525b" }, Nr = ({ node: e, selected: t, extension: n, editor: r, view: i, getPos: l }) => {
  var f;
  const a = e.attrs.field ?? "", u = n.options, c = ((f = u.resolve) == null ? void 0 : f.call(u, a)) ?? null, d = (c == null ? void 0 : c.color) ?? kr, s = (c == null ? void 0 : c.label) ?? `{{${a}}}`;
  return /* @__PURE__ */ o(
    ln,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: d.text,
        color: "#fff",
        borderRadius: 2,
        padding: 4,
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      onMouseDown: (h) => {
        var k;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const z = typeof l == "function" ? l() : null;
        if (z == null) return;
        const b = i.state.doc.resolve(z), w = b.nodeAfter;
        w && Ae.isSelectable(w) && i.dispatch(i.state.tr.setSelection(new Ae(b))), (k = u.onTokenClick) == null || k.call(u, a, h.currentTarget.getBoundingClientRect(), z);
      },
      children: s
    }
  );
};
function $r(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function kt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const zr = bn.extend({
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
    return cn(Nr);
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
    return ["span", sn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Cr = 240, Er = 280, Rr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = g(null);
  return j(() => {
    var l;
    const i = (l = r.current) == null ? void 0 : l.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Er, maxHeight: Cr, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: e.items.map((i, l) => /* @__PURE__ */ E(
    "button",
    {
      type: "button",
      "data-ac-active": l === t ? "1" : void 0,
      onMouseEnter: () => n(l),
      onClick: () => e.command({ field: i.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${l === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ o("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: i.color.text } }),
        /* @__PURE__ */ o("span", { className: "truncate flex-1", children: i.label }),
        i.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] text-zinc-600", children: i.group })
      ]
    },
    i.key
  )) }) });
}, Tr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ o(Rr, { props: n, highlight: r, onHighlight: (i) => {
      e.highlight = i, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const i = xn(r);
      e = { holder: r, root: i, unmount: null, props: n, highlight: 0 };
      const l = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: a, y: u, placement: c }) => {
          var f, h;
          if (!e) return;
          const d = (h = (f = e.props) == null ? void 0 : f.clientRect) == null ? void 0 : h.call(f), s = d && !c.endsWith("-end") ? d.width : 0;
          r.style.left = `${a + s}px`, r.style.top = `${u}px`;
        }
      });
      e.unmount = l, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var a;
      if (!(e != null && e.props)) return !1;
      const { items: r, command: i } = e.props;
      if (r.length === 0) return !1;
      const l = n.key;
      return l === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, r.length - 1), t(e.props), !0) : l === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : l === "Enter" || l === "Tab" ? (n.preventDefault(), i({ field: ((a = r[e.highlight]) == null ? void 0 : a.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Eo = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Dr = me.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: i,
  onStateChange: l,
  resolveToken: a,
  suggestionItems: u,
  onTokenClick: c,
  onSelectionChange: d
}, s) => {
  const f = g(a);
  f.current = a;
  const h = g(u);
  h.current = u;
  const z = g(c);
  z.current = c;
  const b = g(d);
  b.current = d;
  const w = g(null), k = g(null), R = g(t);
  R.current = t;
  const H = g(r);
  H.current = r;
  const I = g(l);
  I.current = l;
  const _ = g(null), C = (x) => {
    var L;
    const T = {
      bold: x.isActive("bold"),
      italic: x.isActive("italic"),
      underline: x.isActive("underline"),
      strike: x.isActive("strike"),
      link: x.isActive("link"),
      color: x.getAttributes("textStyle").color || ""
    }, P = _.current;
    P && P.bold === T.bold && P.italic === T.italic && P.underline === T.underline && P.strike === T.strike && P.link === T.link && P.color === T.color || (_.current = T, (L = I.current) == null || L.call(I, T));
  }, W = (x) => {
    var $;
    const T = x.state.selection;
    let P = null;
    T instanceof Ae && T.node.type.name === "token" ? (P = { key: T.node.attrs.field ?? "", pos: T.from }, w.current = T.from) : w.current != null && (w.current = x.state.tr.mapping.map(w.current));
    const L = k.current, V = L && P && L.key === P.key && L.pos === P.pos;
    !L && !P || V || (k.current = P, ($ = b.current) == null || $.call(b, P));
  }, U = (x) => {
    const T = vr($r(x));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(T) ? "" : T;
  }, F = me.useMemo(() => {
    const x = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: T }) => {
        var P;
        return ((P = h.current) == null ? void 0 : P.call(h, T)) ?? [];
      },
      command: ({ editor: T, range: P, props: L }) => {
        T.chain().focus().insertContentAt(P, { type: "token", attrs: { field: L.field } }).run();
      },
      render: Tr
    };
    return zr.configure({
      resolve: f.current ?? null,
      suggestion: x,
      onTokenClick: (T, P, L) => {
        var V;
        w.current = L, (V = z.current) == null || V.call(z, T, P, L);
      }
    });
  }, []), p = an({
    immediatelyRender: !1,
    extensions: [
      dn,
      fn.configure({ placeholder: n }),
      hn,
      pn,
      gn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      mn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      F
    ],
    content: kt(e || ""),
    editable: !r,
    onUpdate: ({ editor: x }) => {
      R.current(U(x.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: x }) => {
      C(x), W(x);
    }
  });
  return j(() => {
    if (!p || p.isFocused) return;
    U(p.getHTML()) !== e && (_.current = null, p.commands.setContent(kt(e || ""), { emitUpdate: !1 }), C(p));
  }, [e, p]), j(() => {
    p && p.setEditable(!r);
  }, [r, p]), j(() => {
    p && (_.current = null, C(p), W(p));
  }, [p]), Ut(s, () => ({
    exec: (x, T) => {
      if (!(!p || H.current))
        switch (x) {
          case "bold":
            p.chain().focus().toggleBold().run();
            break;
          case "italic":
            p.chain().focus().toggleItalic().run();
            break;
          case "underline":
            p.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            p.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            T && p.chain().focus().setColor(T).run();
            break;
          case "unsetColor":
            p.chain().focus().unsetColor().run();
            break;
          case "link":
            T && p.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
            break;
          case "unlink":
            p.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => p == null ? void 0 : p.commands.focus(),
    insertToken: (x) => {
      !p || H.current || p.chain().focus().insertContent({ type: "token", attrs: { field: x } }).run();
    },
    replaceToken: (x) => {
      if (!p || H.current) return;
      const T = w.current;
      T != null && p.commands.command(({ tr: P }) => {
        const L = P.doc.nodeAt(T);
        if (!L || L.type.name !== "token") return !1;
        P.setNodeMarkup(T, void 0, { field: x });
        const V = P.doc.resolve(T);
        return V.nodeAfter && V.nodeAfter.type.name === "token" && P.setSelection(new Ae(V)), !0;
      });
    }
  }), [p]), /* @__PURE__ */ o(un, { editor: p, className: `richtext-editor ${i || ""}` });
});
Dr.displayName = "RichTextEditor";
const Mr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Sr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Nt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Ro = ({ value: e, disabled: t, onChange: n }) => {
  const [r, i] = Y(!1);
  return /* @__PURE__ */ o(
    He,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ E("button", { type: "button", disabled: t, className: `${Yt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ o(Rt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Mr.map((l) => /* @__PURE__ */ o(Dn, { onClick: () => {
        n(l), i(!1);
      }, icon: l === e ? /* @__PURE__ */ o(zt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: l }, children: l }) }, l))
    }
  );
}, Pr = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, i] = Y(!1), [l, a] = Y(""), u = () => {
    var d;
    const c = l.trim();
    c && ((d = e.current) == null || d.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ o(
    He,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (c) => c.preventDefault(),
          className: `${Bt} ${n ? Wt : Kt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(Qt, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ E("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ o(
          "input",
          {
            value: l,
            onChange: (c) => a(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), u());
            },
            className: hr + " w-full"
          }
        ),
        /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: u, className: je, disabled: !l.trim(), children: "Apply" }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                var c;
                (c = e.current) == null || c.exec("unlink"), i(!1);
              },
              className: je,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, To = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: i }) => {
  const [l, a] = Y(!1), u = (s, f) => {
    var h;
    return (h = e.current) == null ? void 0 : h.exec(s, f);
  }, c = (s) => `${Bt} ${s ? Wt : Kt}`, d = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ E("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: t || d("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("bold"), className: `${c(((n == null ? void 0 : n.bold) ?? !1) || d("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: t || d("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("italic"), className: `${c(((n == null ? void 0 : n.italic) ?? !1) || d("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o($e, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("underline"), className: c((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Zt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o($e, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("strikeThrough"), className: c((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(Jt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(Pr, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(
      He,
      {
        open: l,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ E("button", { type: "button", disabled: t, className: `${Yt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(Nt, {}),
          /* @__PURE__ */ o(Rt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ E("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                u("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(Nt, { className: "w-3.5 h-3.5" })
            }
          ),
          Sr.map((s) => /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                u("foreColor", s), a(!1);
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
    i && /* @__PURE__ */ E(pe, { children: [
      /* @__PURE__ */ o("div", { className: Pe }),
      i
    ] })
  ] });
};
export {
  fo as Button,
  An as Checkbox,
  mo as Checklist,
  No as ChromeHeader,
  ko as ContentRow,
  eo as ContextMenu,
  no as ContextMenuDivider,
  to as ContextMenuItem,
  ro as ContextMenuSub,
  po as DatePicker,
  io as DialogProvider,
  Dn as DropdownItem,
  He as DropdownMenu,
  Sn as DropdownSubmenu,
  ot as DropdownThemeContext,
  Mr as FONTS,
  bo as FloatingChrome,
  Ro as FontMenu,
  To as FormatToolbar,
  D as IS_COARSE,
  vn as IS_TOUCH_CAPABLE,
  Qr as ItemManagerDropdown,
  ao as LongPressMenuProvider,
  et as MORPH_EASE,
  we as MORPH_MS,
  tt as MORPH_OPACITY_MS,
  Oe as MenuHighlightContext,
  so as Modal,
  co as ModalFooter,
  ho as ModalFooterButton,
  yn as PopoutWindowContext,
  Eo as RICH_TEXT_STATE_IDLE,
  go as RadioList,
  Dr as RichTextEditor,
  vo as SectionHeader,
  wo as Seg,
  $o as StructureControls,
  it as SubmenuContext,
  je as TB_BTN,
  De as TB_BTN_ICON,
  fr as TB_DANGER,
  Pe as TB_DIVIDER,
  hr as TB_INPUT,
  yo as TB_NUM,
  Yt as TB_PICKER,
  xo as TB_ROW_LABEL,
  pr as TB_SEG,
  Bt as TB_TOGGLE,
  Kt as TB_TOGGLE_OFF,
  Wt as TB_TOGGLE_ON,
  zr as Token,
  Nr as TokenChipView,
  Me as ToolButton,
  $e as Tooltip,
  nt as ZOOM_FROM,
  zn as cloneOverlayClose,
  Co as escapeHtml,
  At as getDropdownClasses,
  Vr as getHardwareKeyboard,
  jr as getLastPointerType,
  nr as isInteractiveElement,
  qe as isTouchLike,
  Mt as nearestOverlayOrigin,
  Ft as normalizeSpaces,
  _e as overlayMorphEnabled,
  $n as playOverlayClose,
  Nn as playOverlayOpen,
  kt as preprocessTokenHtml,
  vr as sanitizeRichText,
  zo as stripRichText,
  $r as stripTokenWrappers,
  wn as useCurrentDocument,
  ge as useCurrentWindow,
  oo as useDialog,
  Lt as useDropdownTheme,
  Cn as useFixedPosition,
  Zr as useHardwareKeyboard,
  kn as useLastPointerType,
  lo as useLongPressOptOut,
  st as useMenuHighlight,
  rt as useOverlayMorph,
  Qe as usePopoutWindow,
  ve as usePortalTarget,
  Jr as useSmartPosition,
  uo as useTouchMode
};
