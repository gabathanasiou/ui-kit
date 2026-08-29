"use client";
import { jsxs as E, jsx as o, Fragment as he } from "react/jsx-runtime";
import pe, { createContext as Ce, useContext as Ee, useState as F, useEffect as J, useRef as m, useCallback as G, useLayoutEffect as de, useMemo as Le, useImperativeHandle as Ft } from "react";
import * as Z from "@radix-ui/react-dropdown-menu";
import { Check as Ct, X as Ze, Pencil as Ut, Copy as Et, Trash2 as Fe, RotateCcw as Rt, Plus as Xt, ChevronRight as Ue, ChevronLeft as qt, ArrowUp as Gt, ArrowDown as jt, ChevronDown as Tt, Underline as Vt, Strikethrough as Zt, Link as Jt } from "lucide-react";
import * as se from "@radix-ui/react-dialog";
import { createPortal as Je } from "react-dom";
import { useFloating as Qt, autoUpdate as en, offset as tn, flip as nn, shift as rn } from "@floating-ui/react-dom";
import { mergeAttributes as on, ReactNodeViewRenderer as sn, NodeViewWrapper as cn, useEditor as ln, EditorContent as an } from "@tiptap/react";
import { NodeSelection as Ae } from "@tiptap/pm/state";
import un from "@tiptap/starter-kit";
import dn from "@tiptap/extension-placeholder";
import { TextStyle as fn } from "@tiptap/extension-text-style";
import hn from "@tiptap/extension-color";
import pn from "@tiptap/extension-link";
import mn from "@tiptap/extension-underline";
import { Mention as gn } from "@tiptap/extension-mention";
import { createRoot as bn } from "react-dom/client";
const xn = Ce(null);
function Qe() {
  return Ee(xn);
}
function ve() {
  const e = Qe();
  return e ? e.document.body : null;
}
function yn() {
  const e = Qe();
  return e ? e.document : typeof document < "u" ? document : null;
}
function me() {
  return Qe() ?? (typeof window < "u" ? window : null);
}
const Re = typeof window < "u", D = Re && window.matchMedia("(pointer: coarse)").matches, wn = Re && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Xe(e) {
  return e === "touch" || e === "pen";
}
let ye = null;
const qe = /* @__PURE__ */ new Set();
Re && window.addEventListener("pointerdown", (e) => {
  ye = e.pointerType, qe.forEach((t) => t());
}, !0);
function jr() {
  return ye;
}
function vn() {
  const [, e] = F(0), t = m(ye);
  return J(() => {
    const n = () => {
      t.current !== ye && (t.current = ye, e((r) => r + 1));
    };
    return qe.add(n), () => {
      qe.delete(n);
    };
  }, []), ye;
}
const Dt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Mt() {
  return Re ? Dt.some((e) => window.matchMedia(e).matches) : !1;
}
let Ie = Mt();
const Ge = /* @__PURE__ */ new Set();
function pt(e) {
  Ie !== e && (Ie = e, Ge.forEach((t) => t()));
}
var zt;
if (Re) {
  const e = () => pt(Mt());
  for (const a of Dt) {
    const u = window.matchMedia(a);
    (zt = u.addEventListener) == null || zt.call(u, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (a) => {
    a.isComposing || a.keyCode !== 229 && (a.key === "Enter" || a.key === "Backspace" || a.key === "Process" || a.key === "Unidentified" || pt(!0));
  });
  let n = null, r = null;
  const s = "__penClick", l = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
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
    d[s] = !0, r = { x: a.clientX, y: a.clientY, time: Date.now() }, c.dispatchEvent(d);
  }, !0), window.addEventListener("click", (a) => {
    a[s] || r && Date.now() - r.time < 1e3 && Math.hypot(a.clientX - r.x, a.clientY - r.y) < 12 && (a.preventDefault(), a.stopPropagation());
  }, !0);
}
function Vr() {
  return Ie;
}
function Zr() {
  const [, e] = F(0);
  return J(() => {
    const t = () => e((n) => n + 1);
    return Ge.add(t), () => {
      Ge.delete(t);
    };
  }, []), Ie;
}
const we = 220, et = "cubic-bezier(0.32, 0.72, 0, 1)", tt = 170, nt = 0.94;
function He(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function kn(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function rt(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return kn({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function Nn(e, t, n, r) {
  const s = ++e.current, l = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${nt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === s && requestAnimationFrame(() => {
      if (e.current !== s) return;
      const a = rt(t, n);
      t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === s && (t.style.transition = l.transition, t.style.transform = l.transform, t.style.transformOrigin = l.transformOrigin, t.style.opacity = l.opacity, r == null || r());
      }, we + 60);
    });
  });
}
function $n(e, t, n, r) {
  const s = ++e.current, l = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, a = rt(t, n);
  t.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transform = `scale(${nt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === s && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== s || t.isConnected || (t.style.transition = l.transition, t.style.transform = l.transform, t.style.transformOrigin = l.transformOrigin, t.style.opacity = l.opacity, t.style.pointerEvents = l.pointerEvents, t.style.visibility = l.visibility);
    }));
  }, we + 60);
}
function zn(e, t, n) {
  const r = e.cloneNode(!0), s = e.getBoundingClientRect(), l = s.width > 0 || s.height > 0 ? s : n ?? s;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${l.left}px`, r.style.top = `${l.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const a = rt(e, t);
  r.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, r.style.transform = `scale(${nt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, we + 60));
    });
  });
}
function ot(e) {
  const t = m(null), [n, r] = F(!1), s = m(null), l = m(0), a = G((x) => {
    if (e.ref && (e.ref.current = x), x) {
      l.current = 0, t.current = x;
      const k = x.getBoundingClientRect();
      (k.width > 0 || k.height > 0) && (s.current = { left: k.left, top: k.top, width: k.width, height: k.height }), r(!0);
      return;
    }
    const y = t.current, z = ++l.current;
    queueMicrotask(() => {
      z === l.current && t.current === y && (t.current = null, r(!1), !(!y || !e.cloneOnUnmount || !u.current) && y.style.visibility !== "hidden" && He(p.current) && zn(y, d.current, s.current));
    });
  }, []), u = m(e.visible);
  u.current = e.visible;
  const c = m(e.visible), d = m(e.anchor ?? null);
  d.current = e.anchor ?? null;
  const i = m(e.onClosed);
  i.current = e.onClosed;
  const p = m(e.morph !== !1);
  p.current = e.morph !== !1;
  const h = m(0);
  return de(() => {
    if (!n || !u.current || !He(p.current)) return;
    const x = t.current;
    x && Nn(h, x, d.current);
  }, [n, e.visible]), de(() => {
    var z;
    const x = c.current;
    if (c.current = e.visible, e.visible || !x) return;
    const y = t.current;
    if (!y || !He(p.current)) {
      (z = i.current) == null || z.call(i);
      return;
    }
    $n(h, y, d.current, () => {
      var k;
      return (k = i.current) == null ? void 0 : k.call(i);
    });
  }, [e.visible]), J(() => {
    if (!n || !u.current) return;
    const x = (y) => {
      const z = t.current;
      z && z.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", x, { capture: !0 }), () => document.removeEventListener("wheel", x, { capture: !0 });
  }, [n]), a;
}
function Jr(e, t) {
  const n = me(), r = m(n);
  r.current = n, de(() => {
    if (!t || !e.current) return;
    const s = e.current.querySelector(".absolute");
    if (!s) return;
    s.style.left = "", s.style.right = "", s.style.top = "", s.style.bottom = "", s.style.maxHeight = "";
    const l = r.current;
    if (!l) return;
    const a = e.current.getBoundingClientRect(), u = s.getBoundingClientRect(), c = l.innerWidth, d = l.innerHeight, i = u.right - c;
    if (i > 0) {
      const p = Math.min(i + 8, u.left);
      s.style.left = `${u.left - a.left - p}px`;
    }
    u.left < 0 && (s.style.left = `${-a.left + 4}px`), u.bottom > d + 4 && (s.style.top = "auto", s.style.bottom = "100%", s.getBoundingClientRect().top < 0 && (s.style.bottom = "auto", s.style.top = `${-a.top + 4}px`, s.style.maxHeight = `${d - 8}px`));
  }, [t, e]);
}
function Cn(e, t, n, r) {
  const s = me(), l = m(s);
  l.current = s, de(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let u = 0;
    const c = () => {
      var X, U;
      u = 0;
      const h = a.getBoundingClientRect(), x = l.current;
      if (!x) return;
      const y = x.innerWidth, z = ((X = x.visualViewport) == null ? void 0 : X.height) ?? x.innerHeight, k = ((U = x.visualViewport) == null ? void 0 : U.offsetTop) ?? 0, S = (r == null ? void 0 : r.panelWidth) ?? Math.max(h.width, 200), O = 4, I = 120;
      let _ = Math.max(0, h.left);
      _ + S > y && (_ = Math.max(0, y - S - 8));
      const C = k + z - h.bottom - O - 16, H = h.top - k - O - 16;
      if (C >= I || C >= H) {
        const f = Math.min(h.bottom + O, k + z), g = Math.max(I, k + z - f - 16);
        n({ top: f, left: _, width: h.width, maxH: g });
      } else {
        const f = Math.max(I, Math.min(H, 360)), g = k + z - (h.top - O);
        n({ top: 0, left: _, width: h.width, maxH: f, bottom: Math.max(0, g) });
      }
    }, d = () => {
      u || (u = requestAnimationFrame(c));
    }, i = l.current ?? null, p = (i == null ? void 0 : i.document) ?? null;
    return d(), p == null || p.addEventListener("scroll", d, { capture: !0, passive: !0 }), i == null || i.addEventListener("resize", d), () => {
      u && cancelAnimationFrame(u), p == null || p.removeEventListener("scroll", d, { capture: !0 }), i == null || i.removeEventListener("resize", d);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let xe = null;
function St(e) {
  return xe == null || xe(), xe = e, () => {
    xe === e && (xe = null);
  };
}
const it = Ce("dark"), Pt = () => Ee(it), En = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", mt = D ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Rn = D ? "text-xs" : "text-[10px]";
function Lt(e) {
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
    headerPad: mt,
    headerText: `${mt} font-semibold uppercase tracking-wider ${Rn} ui-label`,
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
function At(e) {
  const t = [];
  return pe.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (pe.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const st = Ce({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Oe = Ce(null), ct = () => Ee(Oe);
function lt() {
  const e = m([]), [t, n] = F(-1), [r, s] = F(!1), [l, a] = F(0), u = G((p) => (e.current = [...e.current, p], a((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== p), a((h) => h + 1);
  }), []), c = G((p, h) => {
    n(p), s(h === "pointer");
  }, []), d = G(() => {
    s((p) => p && (n(-1), !1));
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
function at(e, t, n, r) {
  const s = m(-1);
  s.current = t.highlightedIndex;
  const l = m(t);
  l.current = t;
  const a = m(e);
  a.current = e;
  const u = m(r);
  u.current = r;
  const c = m({ text: "", time: 0 }), d = m(!1);
  d.current || (d.current = !0, n.current = (i) => {
    var h, x;
    if (!a.current) return;
    const p = l.current.items;
    if (p.length !== 0) {
      if (i.key === "ArrowDown" || i.key === "ArrowUp") {
        i.preventDefault(), i.stopImmediatePropagation();
        const y = i.key === "ArrowDown" ? 1 : -1, z = (s.current + y + p.length) % p.length;
        l.current.setHighlighted(z, "keyboard");
      } else if (i.key === "ArrowRight") {
        i.preventDefault(), i.stopImmediatePropagation();
        const y = s.current;
        y >= 0 && y < p.length && p[y].submenu && p[y].activate();
      } else if (i.key === "ArrowLeft")
        i.preventDefault(), i.stopImmediatePropagation(), (x = (h = u.current) == null ? void 0 : h.onCloseSub) == null || x.call(h);
      else if (i.key === "Enter" || i.key === " ") {
        i.preventDefault(), i.stopImmediatePropagation();
        const y = s.current;
        y >= 0 && y < p.length && p[y].activate();
      } else if (i.key.length === 1 && !i.ctrlKey && !i.metaKey && !i.altKey) {
        i.preventDefault(), i.stopImmediatePropagation();
        const y = Date.now(), z = (y - c.current.time > 500 ? "" : c.current.text) + i.key.toLowerCase();
        if (c.current = { text: z, time: y }, !z) return;
        const k = s.current + 1;
        for (let S = 0; S < p.length; S++) {
          const O = (k + S) % p.length;
          if (p[O].label.toLowerCase().startsWith(z)) {
            l.current.setHighlighted(O, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ut(e, t, n, r, s, l) {
  const a = m(t);
  a.current = t;
  const u = m(e);
  u.current = e;
  const c = m(s);
  c.current = s;
  const d = m(!1);
  d.current || (d.current = !0, l.current = (i) => {
    if (!u.current || c.current) return;
    const p = r.current;
    p && p.contains(i.target) || a.current.items.length === 0 || !(i.key === "ArrowDown" || i.key === "ArrowUp" || i.key === "ArrowLeft" || i.key === "ArrowRight" || i.key === "Enter" || i.key === " " || i.key.length === 1 && !i.ctrlKey && !i.metaKey && !i.altKey) || (i.preventDefault(), i.stopImmediatePropagation(), n.current(i));
  });
}
function dt(e, t) {
  const n = m(e);
  n.current = e;
  const r = m(!1);
  r.current || (r.current = !0, t.current = (s) => {
    if (!n.current) return;
    const l = s.currentTarget;
    l.scrollHeight > l.clientHeight && (s.preventDefault(), l.scrollTop += s.deltaY);
  });
}
function _e({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: s = "left",
  width: l,
  theme: a = "dark",
  children: u,
  morph: c = !0,
  contentClassName: d,
  initialHighlightIndex: i
}) {
  const [p, h] = F([]), [x, y] = F(null), z = ve(), k = m(null), S = m(null), O = m(e);
  O.current = e;
  const [I, _] = F(e), C = lt();
  J(() => {
    if (e)
      return _(!0), C.setHighlighted(i ?? -1, "keyboard"), St(() => {
        n == null || n(!1), t == null || t();
      });
    h([]);
  }, [e, i, n, t]);
  const H = G(() => {
    const K = k.current;
    if (!K) return null;
    const te = K.getBoundingClientRect();
    return { left: te.left, top: te.top, width: te.width, height: te.height };
  }, []), X = ot({
    visible: e,
    morph: c,
    anchor: H,
    onClosed: () => _(!1)
  }), U = m(() => {
  }), f = m(() => {
  }), g = m(() => {
  });
  at(e && p.length === 0, C, U), dt(e, f), ut(e, C, U, S, p.length > 0, g);
  const R = m(null), M = G((K) => {
    var te;
    if (K) {
      K.addEventListener("keydown", U.current, { capture: !0 }), K.addEventListener("wheel", f.current, { passive: !1 });
      const ie = K.ownerDocument;
      R.current = ie, ie.addEventListener("keydown", g.current, { capture: !0 });
    } else
      (te = R.current) == null || te.removeEventListener("keydown", g.current, { capture: !0 }), R.current = null;
    S.current = K, X(K);
  }, [X]), [P, j] = F({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [$, B] = F(0);
  J(() => {
    e && k.current && B(k.current.getBoundingClientRect().width);
  }, [e]);
  const w = Le(() => ({ panelWidth: $ || void 0 }), [$]);
  Cn(k, e, (K) => j({ ...K, maxH: Math.min(K.maxH, 384), ready: !0 }), w), J(() => {
    if (P.ready && e) {
      const K = S.current;
      K && K.ownerDocument.activeElement !== K && !K.contains(K.ownerDocument.activeElement) && K.focus();
    }
  }, [P.ready, e]), de(() => {
    var te;
    if (!e || C.highlightedIndex < 0) return;
    const K = (te = S.current) == null ? void 0 : te.querySelector(`[data-ei="${C.highlightedIndex}"]`);
    K == null || K.scrollIntoView({ block: "nearest" });
  }, [e, C.highlightedIndex]);
  const b = G((K) => {
    !K && !O.current || (!K && T.current && (A.current = !0), n ? n(K) : K || t == null || t());
  }, [n, t]), V = m(I);
  V.current = I;
  const T = m(!1), A = m(!1), L = G(() => {
    if (!O.current && V.current) {
      if (A.current) {
        A.current = !1, T.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), N = pe.isValidElement(r) ? r : null, Q = N ? pe.cloneElement(N, {
    ref: (K) => {
      k.current = K;
    },
    onPointerDown: () => {
      T.current = !0, A.current = !1;
    },
    onClick: (K) => {
      var te, ie;
      (ie = (te = N.props).onClick) == null || ie.call(te, K), L();
    }
  }) : r;
  return /* @__PURE__ */ E(Z.Root, { open: e || I, onOpenChange: b, modal: !1, children: [
    /* @__PURE__ */ o(Z.Trigger, { asChild: !0, children: Q }),
    /* @__PURE__ */ o(Z.Portal, { container: z ?? void 0, children: /* @__PURE__ */ o(it.Provider, { value: a, children: /* @__PURE__ */ o(st.Provider, { value: { chain: p, setChain: h, morph: c, keyboardOpened: x, setKeyboardOpened: y }, children: /* @__PURE__ */ o(Oe.Provider, { value: C, children: /* @__PURE__ */ o(
      Z.Content,
      {
        ref: M,
        "data-theme": a,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${l || ""} ${d || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: P.left,
          top: P.bottom != null ? void 0 : P.top,
          bottom: P.bottom,
          width: l ? void 0 : $ || void 0,
          maxHeight: P.maxH,
          visibility: P.ready ? "visible" : "hidden"
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
  onSelect: s,
  onRename: l,
  onDuplicate: a,
  onDelete: u,
  onCreate: c,
  onImport: d,
  onExport: i,
  onReset: p,
  onTrash: h,
  closeOnSelect: x,
  readOnly: y = !1,
  theme: z,
  align: k,
  label: S,
  header: O,
  itemLabel: I,
  trigger: _,
  minItems: C = 1,
  itemRender: H,
  morph: X = !0,
  contentClassName: U
}) {
  const f = Lt(), [g, R] = F(null), [M, P] = F(""), j = m(null), $ = m(null);
  J(() => {
    e && requestAnimationFrame(() => {
      var T, A;
      (A = (T = $.current) == null ? void 0 : T.querySelector('[data-active="1"]')) == null || A.scrollIntoView({ block: "nearest" });
    });
  }, [e]), J(() => {
    var L;
    if (!e) return;
    const T = (N) => {
      var ge, v, W, Y, ne;
      if ((v = (ge = N.target) == null ? void 0 : ge.closest) != null && v.call(ge, "input, textarea, [contenteditable]")) return;
      const Q = (W = $.current) == null ? void 0 : W.closest(".ui-menu");
      if (!Q || !Q.contains(N.target)) return;
      const ue = Q.ownerDocument, K = [...Q.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], te = [...Q.querySelectorAll('div:last-child > [role="menuitem"]')], ie = [...K, ...te];
      if (N.key === "ArrowDown" || N.key === "ArrowUp") {
        N.preventDefault(), N.stopImmediatePropagation();
        const q = ue.activeElement;
        let ee = q ? ie.indexOf(q) : -1;
        if (ee < 0 && q) {
          const ae = q.closest("[data-active]"), be = ae == null ? void 0 : ae.querySelector('[role="menuitem"]:first-child');
          be && (ee = K.indexOf(be));
        }
        const oe = N.key === "ArrowDown" ? 1 : -1, re = ee < 0 ? oe === 1 ? 0 : ie.length - 1 : (ee + oe + ie.length) % ie.length;
        (Y = ie[re]) == null || Y.focus({ preventScroll: !0 });
        return;
      }
      if (N.key === "ArrowLeft" || N.key === "ArrowRight") {
        const q = ue.activeElement, ee = q == null ? void 0 : q.closest("[data-active]");
        if (!ee) return;
        N.preventDefault(), N.stopImmediatePropagation();
        const oe = [...ee.querySelectorAll('[role="menuitem"]')].slice(1);
        if (oe.length === 0) return;
        const re = q && ee.contains(q) ? oe.indexOf(q) : -1, ae = N.key === "ArrowRight" ? 1 : -1, be = re < 0 ? 0 : (re + ae + oe.length) % oe.length;
        (ne = oe[be]) == null || ne.focus({ preventScroll: !0 });
        return;
      }
    }, A = ((L = $.current) == null ? void 0 : L.ownerDocument) ?? null;
    return A == null || A.addEventListener("keydown", T, { capture: !0 }), () => A == null ? void 0 : A.removeEventListener("keydown", T, { capture: !0 });
  }, [e]), J(() => {
    if (g) {
      requestAnimationFrame(() => {
        var A, L;
        (A = j.current) == null || A.focus(), (L = j.current) == null || L.select();
      });
      const T = n.find((A) => A.id === g);
      T && !M && P(T.name);
    }
  }, [g]), J(() => {
    if (g) {
      const T = n.find((A) => A.id === g);
      T && !M && P(T.name);
    }
  }, [g, n]);
  const B = (T, A) => {
    R(T), P(A);
  }, w = () => {
    g && M.trim() && l(g, M.trim()), R(null);
  }, b = () => {
    R(null);
  }, V = I || O.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ E(_e, { open: e, onOpenChange: (T) => {
    T ? (R(null), P("")) : (g && M.trim() && l(g, M.trim()), R(null), P("")), (!T || !y) && t(T);
  }, width: "w-80", theme: z, align: k, trigger: _, morph: X, contentClassName: U, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${f.headerText}`, children: O }),
    /* @__PURE__ */ o("div", { ref: $, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((T) => {
      const A = T.id === r, L = g === T.id;
      return /* @__PURE__ */ o("div", { "data-active": A ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${A || L ? f.rowActiveBg : f.rowHoverBg} ${g && !L ? "opacity-40 pointer-events-none" : ""}`, children: L ? /* @__PURE__ */ E(he, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: j,
            value: M,
            onChange: (N) => P(N.target.value),
            onKeyDown: (N) => {
              N.key === "Enter" && (N.preventDefault(), N.stopPropagation(), w()), N.key === "Escape" && (N.preventDefault(), N.stopPropagation(), b());
            },
            className: `w-full border rounded ${f.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${f.editConfirm} !text-white`,
            onSelect: (N) => {
              N.preventDefault(), w();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Ct, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${f.editCancel} !text-white`,
            onSelect: (N) => {
              N.preventDefault(), b();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Ze, { className: f.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ E(he, { children: [
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none cursor-pointer flex items-center ${f.rowText} ${A ? "" : f.rowTextHover}`,
            onSelect: x ? () => {
              s(T.id);
            } : (N) => {
              N.preventDefault(), s(T.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${A ? f.rowActiveText : ""}`, children: H ? H(T) : T.name })
          }
        ),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${A ? f.btnActive : f.btnBase} ${A ? "!text-white" : ""}`,
            onSelect: (N) => {
              N.preventDefault(), B(T.id, T.name);
            },
            onTouchStart: () => {
            },
            disabled: y,
            children: /* @__PURE__ */ o(Ut, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${A ? f.btnActive : f.btnBase} ${A ? "!text-white" : ""}`,
            onSelect: (N) => {
              N.preventDefault();
              const Q = a(T.id);
              Q && B(Q, `${T.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: y,
            children: /* @__PURE__ */ o(Et, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= C ? f.btnDisabled : A ? f.btnDangerActive : f.btnDanger} ${A ? "!text-white hover:!text-red-400" : ""}`,
            onSelect: (N) => {
              N.preventDefault(), u(T.id);
            },
            onTouchStart: () => {
            },
            disabled: y || n.length <= C,
            children: /* @__PURE__ */ o(Fe, { className: f.btnIcon })
          }
        )
      ] }) }, T.id);
    }) }),
    /* @__PURE__ */ E("div", { className: `shrink-0 ${g ? "opacity-40 pointer-events-none" : ""}`, children: [
      p && /* @__PURE__ */ E(he, { children: [
        /* @__PURE__ */ o(Z.Separator, { className: f.separator }),
        /* @__PURE__ */ E(
          Z.Item,
          {
            className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
            onSelect: (T) => {
              T.preventDefault(), p();
            },
            onTouchStart: () => {
            },
            disabled: y,
            children: [
              /* @__PURE__ */ o(Rt, { className: `${f.btnIcon} ${f.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || d || i || h) && /* @__PURE__ */ o(Z.Separator, { className: f.separator }),
      c && /* @__PURE__ */ E(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault();
            const A = c();
            A && B(A, "");
          },
          onTouchStart: () => {
          },
          disabled: y,
          children: [
            /* @__PURE__ */ o(Xt, { className: `${f.btnIcon} ${f.icon}` }),
            "New ",
            V
          ]
        }
      ),
      d && /* @__PURE__ */ E(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: y,
          children: [
            /* @__PURE__ */ E("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      i && /* @__PURE__ */ E(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), i();
          },
          onTouchStart: () => {
          },
          disabled: y,
          children: [
            /* @__PURE__ */ E("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      h && /* @__PURE__ */ E(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: y,
          children: [
            /* @__PURE__ */ o(Fe, { className: `${f.btnIcon} ${f.icon}` }),
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
  className: s = "",
  children: l,
  keepOpen: a = !1,
  selected: u = !1,
  rightAction: c,
  trailing: d
}) {
  Pt();
  const i = Lt(), p = m(!1), h = m(null), x = ct(), y = m(x);
  y.current = x;
  const z = m(null);
  J(() => {
    var _;
    const I = {
      label: At(l),
      activate: () => {
        n || e();
      }
    };
    return z.current = I, (_ = y.current) == null ? void 0 : _.register(I);
  }, []);
  const k = x && z.current ? x.items.indexOf(z.current) : -1, S = !n && k >= 0 && k === x.highlightedIndex, O = r === "danger" ? i.itemDanger : i.itemDefault;
  return /* @__PURE__ */ E(
    Z.Item,
    {
      ref: h,
      "data-ei": k >= 0 ? k : void 0,
      className: `w-full text-left ${Tn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${O} ${u ? "ui-item-selected" : ""} ${S ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${s}`,
      onSelect: (I) => {
        if (p.current) {
          p.current = !1;
          return;
        }
        a && I.preventDefault(), e();
      },
      onPointerEnter: () => {
        !n && x && k >= 0 && x.setHighlighted(k, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ o("span", { className: `${i.icon} shrink-0`, children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: l }),
        d && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: d }),
        c && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${i.rightAction}`,
            title: c.title,
            onPointerDown: (I) => {
              I.stopPropagation(), I.preventDefault(), p.current = !0, c.onClick();
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
function Sn({ id: e, label: t, icon: n, width: r, side: s = "right", children: l, contentClassName: a }) {
  const { chain: u, setChain: c, morph: d, keyboardOpened: i, setKeyboardOpened: p } = Ee(st), h = u.includes(e), x = u[u.length - 1] === e, y = Pt(), z = ve(), k = m(null), S = m(null), [O, I] = F(h), _ = !h && O;
  J(() => {
    h && I(!0);
  }, [h]);
  const C = () => c((L) => {
    const N = L.indexOf(e);
    return N >= 0 ? L.slice(0, N) : L;
  }), H = lt(), X = ct(), U = m(X);
  U.current = X;
  const f = m(null);
  J(() => {
    var N;
    const L = {
      label: t,
      activate: () => {
        p(e), c((Q) => Q.includes(e) ? Q : [...Q, e]);
      },
      submenu: !0
    };
    return f.current = L, (N = U.current) == null ? void 0 : N.register(L);
  }, []);
  const g = X && f.current ? X.items.indexOf(f.current) : -1, R = g >= 0 && g === X.highlightedIndex, M = G(() => {
    const L = k.current;
    if (!L) return null;
    const N = L.getBoundingClientRect();
    return { left: N.left, top: N.top, width: N.width, height: N.height };
  }, []), P = ot({
    visible: h,
    morph: d,
    anchor: M,
    onClosed: () => I(!1)
  }), j = m(() => {
  }), $ = m(() => {
  }), B = m(() => {
  });
  at(h && x, H, j, {
    onCloseSub: () => {
      C(), X && g >= 0 && X.setHighlighted(g, "keyboard");
    }
  });
  const w = m(i);
  w.current = i, J(() => {
    h && (w.current === e ? (H.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var L;
      return (L = S.current) == null ? void 0 : L.focus();
    }), p(null)) : H.setHighlighted(-1, "keyboard"));
  }, [h]), dt(h, $), ut(h, H, j, S, !x, B), pe.useLayoutEffect(() => {
    var N;
    if (!h || H.highlightedIndex < 0) return;
    const L = (N = S.current) == null ? void 0 : N.querySelector(`[data-ei="${H.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [h, H.highlightedIndex]);
  const b = m(null), V = G((L) => {
    var N;
    if (L) {
      L.addEventListener("keydown", j.current, { capture: !0 }), L.addEventListener("wheel", $.current, { passive: !1 });
      const Q = L.ownerDocument;
      b.current = Q, Q.addEventListener("keydown", B.current, { capture: !0 });
    } else
      (N = b.current) == null || N.removeEventListener("keydown", B.current, { capture: !0 }), b.current = null;
    S.current = L, P(L);
  }, [P]), T = `w-full text-left ${Mn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${R ? " ui-item-highlighted" : ""}${_ ? " ui-sub-closing" : ""}`, A = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ E(Z.Sub, { open: h || O, onOpenChange: (L) => c((N) => {
    if (!L) {
      const Q = N.indexOf(e);
      return Q >= 0 ? N.slice(0, Q) : N;
    }
    return N.includes(e) ? N : [...N, e];
  }), children: [
    /* @__PURE__ */ E(
      Z.SubTrigger,
      {
        ref: k,
        "data-ei": g >= 0 ? g : void 0,
        className: T,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          X && g >= 0 && X.setHighlighted(g, "pointer");
        },
        onPointerDown: (L) => {
          L.pointerType === "pen" && (L.preventDefault(), c((N) => h ? N.slice(0, N.indexOf(e)) : [...N, e]));
        },
        children: [
          s === "left" && /* @__PURE__ */ o(Ue, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ E("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          s === "right" && /* @__PURE__ */ o(Ue, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(Z.Portal, { container: z ?? void 0, children: /* @__PURE__ */ o(
      Z.SubContent,
      {
        ref: V,
        "data-theme": y,
        className: A,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: H.pointerLeave,
        children: /* @__PURE__ */ o(Oe.Provider, { value: H, children: l })
      }
    ) })
  ] });
}
const ke = 8, Pn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ln = D ? "text-sm" : "text-xs", eo = ({ open: e, x: t, y: n, onClose: r, children: s, containerRef: l, morph: a = !0 }) => {
  const u = m(null), c = me(), [d, i] = F(!1), [p, h] = F([]), [x, y] = F(null), z = lt();
  J(() => {
    if (e)
      return St(r);
  }, [e, r]);
  const k = m({ left: t, top: n });
  e && (k.current = { left: t, top: n });
  const S = G(() => ({ left: k.current.left, top: k.current.top, width: 0, height: 0 }), []), O = ot({
    visible: !0,
    morph: a,
    anchor: S,
    cloneOnUnmount: !0
  }), I = m(() => {
  }), _ = m(() => {
  }), C = m(() => {
  });
  at(e, z, I), dt(e, _), ut(e, z, I, u, p.length > 0, C);
  const H = m(null), X = G((g) => {
    var R;
    if (g) {
      g.addEventListener("keydown", I.current, { capture: !0 }), g.addEventListener("wheel", _.current, { passive: !1 });
      const M = g.ownerDocument;
      H.current = M, M.addEventListener("keydown", C.current, { capture: !0 });
    } else
      (R = H.current) == null || R.removeEventListener("keydown", C.current, { capture: !0 }), H.current = null;
    u.current = g, i(!!g), O(g);
  }, [O]), [U, f] = F(null);
  return de(() => {
    var T;
    if (!e || !d || !u.current) return;
    const g = u.current, R = g.offsetWidth, M = g.offsetHeight, P = (T = l == null ? void 0 : l.current) == null ? void 0 : T.getBoundingClientRect(), j = P ? P.right : (c == null ? void 0 : c.innerWidth) ?? 0, $ = P ? P.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, B = P ? P.left : 0, w = P ? P.top : 0;
    let b = Math.max(w + ke, k.current.top), V = Math.max(B + ke, k.current.left);
    V + R > j && (V = j - R - ke), b + M > $ && (b = Math.max(w + ke, $ - M - ke)), f({ left: V, top: b });
  }, [e, d, t, n, l]), e ? /* @__PURE__ */ E(Z.Root, { open: e, onOpenChange: (g) => {
    g || r();
  }, modal: !1, children: [
    /* @__PURE__ */ o(Z.Trigger, { asChild: !0, children: /* @__PURE__ */ o("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ o(Z.Portal, { children: /* @__PURE__ */ o(it.Provider, { value: "light", children: /* @__PURE__ */ o(st.Provider, { value: { chain: p, setChain: h, morph: a, keyboardOpened: x, setKeyboardOpened: y }, children: /* @__PURE__ */ o(Oe.Provider, { value: z, children: /* @__PURE__ */ o(
      Z.Content,
      {
        ref: X,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Ln} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (U == null ? void 0 : U.left) ?? k.current.left, top: (U == null ? void 0 : U.top) ?? k.current.top, touchAction: "manipulation" },
        onPointerLeave: z.pointerLeave,
        children: s
      }
    ) }) }) }) })
  ] }) : null;
}, to = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: s = !1, trailing: l, children: a }) => {
  const u = ct(), c = m(u);
  c.current = u;
  const d = m(null);
  J(() => {
    var x;
    const h = { label: At(a), activate: () => {
      r || e();
    } };
    return d.current = h, (x = c.current) == null ? void 0 : x.register(h);
  }, []);
  const i = u && d.current ? u.items.indexOf(d.current) : -1, p = !r && i >= 0 && i === u.highlightedIndex;
  return /* @__PURE__ */ E(
    Z.Item,
    {
      "data-ei": i >= 0 ? i : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && i >= 0 && u.setHighlighted(i, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${Pn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${s ? "ui-item-selected" : ""} ${p ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        l && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: l })
      ]
    }
  );
}, no = () => /* @__PURE__ */ o(Z.Separator, { className: "ui-sep my-1" }), ro = (e) => /* @__PURE__ */ o(Sn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" });
function An({ checked: e, onChange: t, disabled: n = !1, label: r, id: s, className: l = "", labelClassName: a = "", theme: u, variant: c = "pill", tone: d = "accent", block: i = !1 }) {
  const p = c !== "plain", h = D ? "w-5 h-5" : "w-4 h-4", x = D ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", y = D ? "w-3.5 h-3.5" : "w-3 h-3", z = D ? "text-sm" : "text-xs";
  return /* @__PURE__ */ E(
    "label",
    {
      className: `ui-checkbox ${p ? `ui-checkbox-pill ${D ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${d === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${l}`,
      style: { display: i ? "flex" : "inline-flex", alignItems: "center", gap: D ? 10 : 8 },
      onClick: (S) => S.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: s,
            checked: e,
            disabled: n,
            onChange: (S) => t(S.target.checked),
            className: "sr-only"
          }
        ),
        p ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ E("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${x}`, "aria-hidden": !0, children: e && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: y, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${z} ${a}`, children: r })
      ]
    }
  );
}
const In = D ? "p-6" : "p-5", On = D ? "text-base" : "text-sm", _n = D ? "w-5 h-5" : "w-4 h-4", Hn = D ? "text-sm" : "text-xs", Bn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", gt = D ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", bt = D ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", xt = D ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", Te = D ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", It = Ce(null);
function oo() {
  const e = Ee(It);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function io({ children: e }) {
  const [t, n] = F(null), [r, s] = F(!1), l = ve(), a = me(), u = m(a);
  u.current = a;
  const c = m(null), d = m(null), [i, p] = F(null), h = m(null), [x, y] = F(null), z = m(null), k = h.current !== null;
  z.current, J(() => {
    t || (p(null), y(null));
  }, [t]);
  const S = G(() => {
    const w = d.current;
    if (!w) return null;
    const b = w.getBoundingClientRect();
    return { left: b.left, top: b.top, width: b.width, height: b.height };
  }, []), O = G((w) => {
    if (w.target.closest("button")) return;
    const b = S();
    b && (p(b), y({ w: b.width, h: b.height }), h.current = { startX: w.clientX, startY: w.clientY, posX: b.left, posY: b.top }, w.target.setPointerCapture(w.pointerId));
  }, [S]), I = G((w) => {
    const b = h.current;
    b && (w.preventDefault(), p({ left: b.posX + w.clientX - b.startX, top: b.posY + w.clientY - b.startY }));
  }, []), _ = G(() => {
    h.current = null;
  }, []), C = G((w) => (b) => {
    b.stopPropagation();
    const V = S();
    V && (p(V), y({ w: V.width, h: V.height }), z.current = { dir: w, startX: b.clientX, startY: b.clientY, startL: V.left, startT: V.top, startW: V.width, startH: V.height }, b.target.setPointerCapture(b.pointerId));
  }, [S]), H = 200, X = 100, U = 32, f = G((w) => {
    const b = z.current;
    if (!b) return;
    w.preventDefault();
    const V = w.clientX - b.startX, T = w.clientY - b.startY;
    let A = b.startW, L = b.startH, N = b.startL, Q = b.startT;
    b.dir.includes("e") && (A = b.startW + V), b.dir.includes("w") && (A = b.startW - V, N = b.startL + V), b.dir.includes("s") && (L = b.startH + T), b.dir.includes("n") && (L = b.startH - T, Q = b.startT + T);
    const ue = u.current;
    if (!ue) return;
    const K = ue.innerWidth, te = ue.innerHeight;
    A = Math.max(H, Math.min(A, K - U * 2)), L = Math.max(X, Math.min(L, te - U * 2)), b.dir.includes("w") && (N = Math.max(U, Math.min(N, K - A - U))), b.dir.includes("n") && (Q = Math.max(U, Math.min(Q, te - L - U))), y({ w: A, h: L }), p({ left: N, top: Q });
  }, []), g = G(() => {
    z.current = null;
  }, []), R = G(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]), M = G((w) => {
    if (w.suppressKey) {
      const b = localStorage.getItem(w.suppressKey);
      if (b && Date.now() < parseInt(b, 10))
        return Promise.resolve(!0);
    }
    return new Promise((b) => {
      s(!1), n({ kind: "confirm", options: w, resolve: b });
    });
  }, []), P = G((w) => new Promise((b) => {
    n({ kind: "prompt", options: w, resolve: b });
  }), []), j = G((w) => new Promise((b) => {
    n({ kind: "alert", options: w, resolve: b });
  }), []);
  J(() => {
    if (t) {
      const w = setTimeout(() => {
        var b;
        return (b = c.current) == null ? void 0 : b.focus();
      }, 50);
      return () => clearTimeout(w);
    }
  }, [t]);
  const $ = () => {
    var w, b;
    !t || t.kind !== "prompt" || (t.resolve(((b = (w = c.current) == null ? void 0 : w.value) == null ? void 0 : b.trim()) || null), n(null));
  }, B = t !== null;
  return /* @__PURE__ */ E(It.Provider, { value: { confirm: M, prompt: P, alert: j }, children: [
    e,
    /* @__PURE__ */ o(se.Root, { open: B, onOpenChange: (w) => {
      w || R();
    }, modal: !0, children: /* @__PURE__ */ E(se.Portal, { container: l ?? void 0, children: [
      /* @__PURE__ */ o(se.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ E(
        se.Content,
        {
          ref: d,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${In} space-y-4 focus:outline-none ${i || x ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${x ? "" : "w-full max-w-sm"}`,
          style: { ...i ? { left: i.left, top: i.top } : {}, ...x ? { width: x.w, height: x.h } : {} },
          onEscapeKeyDown: (w) => {
            R(), w.preventDefault();
          },
          onPointerDownOutside: (w) => {
            R(), w.preventDefault();
          },
          onKeyDown: (w) => {
            if (w.key === "Enter") {
              if ((t == null ? void 0 : t.kind) === "prompt" && w.target instanceof HTMLInputElement || (w.preventDefault(), !t)) return;
              t.kind === "confirm" ? (t.resolve(!0), n(null)) : t.kind === "prompt" ? $() : (t.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ E(
              "div",
              {
                className: `flex items-center justify-between ${k ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: O,
                onPointerMove: I,
                onPointerUp: _,
                children: [
                  /* @__PURE__ */ o(se.Title, { className: `${On} ui-dialog-title`, children: t == null ? void 0 : t.options.title }),
                  /* @__PURE__ */ o(se.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ o(Ze, { className: _n }) })
                ]
              }
            ),
            (t == null ? void 0 : t.options.message) && /* @__PURE__ */ o(se.Description, { className: `${Hn} ui-dialog-text`, children: t.options.message }),
            (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ o(
              An,
              {
                block: !0,
                checked: r,
                onChange: s,
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
                onKeyDown: (w) => {
                  w.key === "Enter" && $();
                },
                className: `w-full ${Bn} ui-input`
              }
            ),
            /* @__PURE__ */ E("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
              (t == null ? void 0 : t.kind) !== "alert" && /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    const w = t;
                    w && (w.kind === "confirm" ? (w.resolve(!1), n(null)) : w.kind === "prompt" && (w.resolve(null), n(null)));
                  },
                  className: `${gt} ui-btn ui-btn-ghost`,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    if (t)
                      if (t.kind === "confirm") {
                        const w = t.options;
                        w.suppressKey && r && localStorage.setItem(w.suppressKey, String(Date.now() + 864e5)), t.resolve(!0), n(null);
                      } else t.kind === "prompt" ? $() : (t.resolve(), n(null));
                  },
                  className: `${gt} ui-btn ${(t == null ? void 0 : t.kind) === "confirm" && t.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (t == null ? void 0 : t.kind) === "alert" ? "OK" : (t == null ? void 0 : t.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ E("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ o("div", { className: `absolute ${bt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: C("n"), onPointerMove: f, onPointerUp: g }),
              /* @__PURE__ */ o("div", { className: `absolute ${bt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: C("s"), onPointerMove: f, onPointerUp: g }),
              /* @__PURE__ */ o("div", { className: `absolute ${xt} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: C("w"), onPointerMove: f, onPointerUp: g }),
              /* @__PURE__ */ o("div", { className: `absolute ${xt} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: C("e"), onPointerMove: f, onPointerUp: g }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 left-0 ${Te} cursor-nw-resize pointer-events-auto`, onPointerDown: C("nw"), onPointerMove: f, onPointerUp: g }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 right-0 ${Te} cursor-ne-resize pointer-events-auto`, onPointerDown: C("ne"), onPointerMove: f, onPointerUp: g }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 left-0 ${Te} cursor-sw-resize pointer-events-auto`, onPointerDown: C("sw"), onPointerMove: f, onPointerUp: g }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 right-0 ${Te} cursor-se-resize pointer-events-auto`, onPointerDown: C("se"), onPointerMove: f, onPointerUp: g })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const ce = 32, Ot = "[data-modal-stack]", fe = 220, ze = "cubic-bezier(0.32, 0.72, 0, 1)", Se = 0.94;
function Ne() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function _t(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function yt(e, t, n, r) {
  const s = ++e.current, l = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = _t(l, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === s && (t.style.transition = `transform ${fe}ms ${ze}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === s && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
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
function wt(e, t, n) {
  const r = ++e.current, s = t.getBoundingClientRect(), l = 1 - Se, a = { left: s.left + s.width * l / 2, top: s.top + s.height * l / 2, width: s.width * Se, height: s.height * Se };
  t.style.transition = `transform ${fe}ms ${ze}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = _t(s, a), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, fe + 60);
}
function Be(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Ot) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function We(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Ot) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Kn = D ? "px-6" : "px-5", Yn = D ? "py-3" : "py-2.5", Fn = D ? "text-sm" : "text-xs", Un = D ? "w-4 h-4" : "w-3.5 h-3.5", Xn = D ? "text-xs" : "text-[10px]", qn = D ? "w-3.5 h-3.5" : "w-3 h-3", Gn = D ? "px-2.5 py-1.5" : "px-2 py-1", jn = D ? "px-6" : "px-5", Vn = D ? "py-3" : "py-2";
function so({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: s,
  footer: l,
  children: a,
  onReset: u,
  morph: c = !0
}) {
  const d = m(null), i = m(null), p = m(null), [h, x] = F(!1), y = G((v) => {
    d.current = v, x(v !== null);
  }, []), z = ve(), k = me(), S = m(k);
  S.current = k;
  const [O, I] = F(null), _ = m(null), C = m(!1), H = m(!1), [X, U] = F(!1), f = m(0), g = m(!1), [R, M] = F(!1), P = m(c);
  P.current = c;
  const j = m(!1), $ = m(!1), B = () => {
    $.current = !0, U(!0);
  }, w = () => {
    $.current = !1, U(!1);
  };
  J(() => {
    e || (I(null), H.current = !1, C.current = !1);
  }, [e]), de(() => {
    var ne, q;
    if (!e || H.current || !h || !d.current) return;
    H.current = !0;
    const v = d.current.getBoundingClientRect(), W = ((ne = S.current) == null ? void 0 : ne.innerWidth) ?? 0, Y = ((q = S.current) == null ? void 0 : q.innerHeight) ?? 0;
    I({
      left: Math.max(ce, Math.min((W - v.width) / 2, W - v.width - ce)),
      top: Math.max(ce, Math.min((Y - v.height) / 2, Y - v.height - ce))
    });
  }, [e, h]), de(() => {
    if (!e || !h || !c || Ne() || !d.current) return;
    const v = d.current, W = Be(v), Y = W[W.length - 1];
    B(), Y ? yt(f, v, Y.getBoundingClientRect(), w) : Wn(f, v, w);
  }, [e, h]);
  const b = G(() => {
    if (g.current) return;
    const v = d.current, W = !!v && Be(v).length > 0;
    if (!v || !c || Ne() || W) {
      t();
      return;
    }
    g.current = !0, M(!0), j.current = !0, B(), wt(f, v, () => {
      g.current = !1, M(!1), w(), t();
    });
  }, [c, t]);
  de(() => () => {
    const v = d.current;
    if (!v || j.current || !P.current || Ne() || Be(v).length > 0) return;
    const W = v.ownerDocument, Y = v.cloneNode(!0);
    Y.removeAttribute("data-modal-stack"), Y.removeAttribute("data-state"), Y.removeAttribute("role"), Y.removeAttribute("data-aria-hidden"), Y.removeAttribute("tabindex"), Y.setAttribute("aria-hidden", "true"), Y.style.pointerEvents = "none", W.body.appendChild(Y), wt({ current: 0 }, Y, () => {
      Y.isConnected && Y.remove();
    });
  }, []), J(() => {
    if (!e || !h || !c || !d.current) return;
    const v = d.current, W = v.parentNode;
    if (!W) return;
    let Y = 0, ne = null, q = !1;
    const ee = () => {
      Y = 0;
      const re = We(v);
      re.length > 0 ? (ne = re[re.length - 1].getBoundingClientRect(), q = !0, Y = requestAnimationFrame(ee)) : q && (q = !1, ne && !Ne() && (B(), yt(f, v, ne, w)), ne = null);
    }, oe = new MutationObserver(() => {
      !Y && We(v).length > 0 && (Y = requestAnimationFrame(ee));
    });
    return oe.observe(W, { childList: !0 }), () => {
      oe.disconnect(), Y && cancelAnimationFrame(Y);
    };
  }, [e, h]), J(() => {
    if (!h || !c || Ne() || !d.current) return;
    const v = d.current;
    let W = Math.round(v.getBoundingClientRect().height), Y = !1;
    const ne = new ResizeObserver(() => {
      var ht;
      if (!v.isConnected) return;
      const q = Math.round(v.getBoundingClientRect().height);
      if (!Y) {
        Y = !0, W = q;
        return;
      }
      if (Math.abs(q - W) < 1) return;
      if (_.current || g.current || We(v).length > 0) {
        W = q;
        return;
      }
      if ($.current) return;
      const ee = W;
      W = q, B();
      const oe = v.getBoundingClientRect(), re = !C.current, ae = ((ht = S.current) == null ? void 0 : ht.innerHeight) ?? 0, be = re ? (ae - ee) / 2 : oe.top, ft = re ? (ae - q) / 2 : oe.top;
      v.style.transition = "none", v.style.height = `${ee}px`, re && (v.style.top = `${be}px`), i.current && (i.current.style.overflow = "hidden"), v.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          v.style.height === `${ee}px` && (v.style.transition = `height ${fe}ms ${ze}${re ? `, top ${fe}ms ${ze}` : ""}`, v.style.height = `${q}px`, re && (v.style.top = `${ft}px`), window.setTimeout(() => {
            v.style.height === `${q}px` && (v.style.transition = "", v.style.height = "", i.current && (i.current.style.overflow = ""), re && I({ left: oe.left, top: ft }), w());
          }, fe + 60));
        });
      });
    });
    return ne.observe(v), () => ne.disconnect();
  }, [h]);
  const V = G(() => {
    const v = d.current;
    if (!v) return null;
    const W = v.getBoundingClientRect();
    return { left: W.left, top: W.top, width: W.width, height: W.height };
  }, []), T = G((v, W) => {
    var re, ae;
    const Y = ((re = S.current) == null ? void 0 : re.innerWidth) ?? 0, ne = ((ae = S.current) == null ? void 0 : ae.innerHeight) ?? 0, q = V(), ee = q ? q.width : Math.min(Y - ce * 2, 576), oe = q ? q.height : Math.min(ne - ce * 2, 400);
    return {
      left: Math.max(ce, Math.min(v, Y - ee - ce)),
      top: Math.max(ce, Math.min(W, ne - oe - ce))
    };
  }, [V]), A = G((v) => {
    if (v.target.closest("button")) return;
    C.current = !0;
    const W = V();
    W && (I(T(W.left, W.top)), _.current = { startX: v.clientX, startY: v.clientY, posX: W.left, posY: W.top }, v.target.setPointerCapture(v.pointerId));
  }, [V, T]), L = G((v) => {
    const W = _.current;
    W && (v.preventDefault(), I(T(W.posX + v.clientX - W.startX, W.posY + v.clientY - W.startY)));
  }, [T]), N = G(() => {
    _.current = null;
  }, []), Q = _.current !== null, ue = O !== null, K = ue ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", te = `${s ? `${s} w-full` : "max-w-xl w-full"}`, ie = {
    ...ue ? { left: O.left, top: O.top } : {},
    width: `min(100%, calc(100vw - ${ce * 2}px))`,
    maxHeight: `calc(100vh - ${ce * 2}px)`
  }, ge = G((v) => {
    if (v.key !== "Enter" || v.shiftKey || v.metaKey || v.ctrlKey || v.altKey || v.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const Y = p.current;
    if (!Y) return;
    const ne = Array.from(Y.querySelectorAll("button[data-modal-confirm]")), q = ne.length > 0 ? ne : Array.from(Y.querySelectorAll("button")), ee = q[q.length - 1];
    !ee || ee.disabled || (v.preventDefault(), ee.click());
  }, []);
  return /* @__PURE__ */ o(se.Root, { open: e, onOpenChange: (v) => {
    v || b();
  }, children: /* @__PURE__ */ E(se.Portal, { container: z ?? void 0, children: [
    /* @__PURE__ */ o(
      se.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${R ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (v) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (v.preventDefault(), b());
        }
      }
    ),
    /* @__PURE__ */ E(
      se.Content,
      {
        ref: y,
        onKeyDown: ge,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${K} ${te}`,
        style: { touchAction: "manipulation", ...Object.keys(ie).length > 0 ? ie : {} },
        children: [
          /* @__PURE__ */ E(
            "div",
            {
              className: `flex items-center justify-between ${Kn} ${Yn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${Q ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (v) => {
                X || A(v);
              },
              onPointerMove: L,
              onPointerUp: N,
              children: [
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(se.Title, { className: `${Fn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ E("button", { onClick: u, className: `flex items-center gap-1 ${Xn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Gn} shrink-0`, children: [
                    /* @__PURE__ */ o(Rt, { className: qn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ o(se.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(Ze, { className: Un }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: i, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: a }),
          l && /* @__PURE__ */ o("div", { ref: p, className: "shrink-0", children: l })
        ]
      }
    )
  ] }) });
}
function co({ children: e }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${jn} ${Vn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const Zn = 500, Jn = 250, Qn = 5, le = 88, vt = 4;
function er(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const s = performance.now(), l = (a) => {
    const u = a - s, c = Math.min(u / t, 1);
    n.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(l);
  };
  requestAnimationFrame(l);
}
function tr({ x: e, y: t, ms: n }) {
  const r = m(null), s = ve();
  return J(() => {
    r.current && er(r.current, n);
  }, [n]), Je(
    /* @__PURE__ */ o(
      "div",
      {
        style: {
          position: "fixed",
          left: e - le / 2,
          top: t - le / 2,
          width: le,
          height: le,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ E("svg", { ref: r, width: le, height: le, viewBox: `0 0 ${le} ${le}`, children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: le / 2,
              cy: le / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: vt + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: le / 2,
              cy: le / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: vt,
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
  shouldStartLongPress: s,
  onLongPress: l
}) {
  const [a, u] = F(null), c = yn(), d = m(null), i = m(null), p = m({ x: 0, y: 0, target: null }), h = m(!1), x = Math.min(Jn, n * 0.5), y = m(s);
  y.current = s;
  const z = m(l);
  return z.current = l, J(() => {
    if (!D || !c) return;
    const k = (_) => {
      if (!Xe(_.pointerType) || _.button !== 0) return;
      const C = _.target;
      if (!C.closest(r) || (y.current ? !y.current(C) : nr(C))) return;
      const H = _.clientX, X = _.clientY;
      p.current = { x: H, y: X, target: _.target }, h.current = !0, t && (i.current = setTimeout(() => u({ x: H, y: X }), x)), d.current = setTimeout(() => {
        if (!h.current) return;
        i.current && (clearTimeout(i.current), i.current = null), u(null);
        const U = p.current.target;
        if (!U) return;
        const f = z.current;
        if (f) {
          f(U, H, X);
          return;
        }
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: H,
          clientY: X,
          button: 2,
          view: window
        });
        U.dispatchEvent(g);
      }, n);
    }, S = (_) => {
      if (!h.current || d.current === null) return;
      const C = _.clientX - p.current.x, H = _.clientY - p.current.y;
      Math.sqrt(C * C + H * H) > Qn && (clearTimeout(d.current), d.current = null, i.current && (clearTimeout(i.current), i.current = null), h.current = !1, u(null));
    }, O = () => {
      d.current !== null && (clearTimeout(d.current), d.current = null), i.current !== null && (clearTimeout(i.current), i.current = null), h.current = !1, u(null);
    }, I = (_) => {
      Xe(_.pointerType) && (d.current !== null && (clearTimeout(d.current), d.current = null), i.current !== null && (clearTimeout(i.current), i.current = null), h.current = !1, u(null));
    };
    return c == null || c.addEventListener("pointerdown", k), c.addEventListener("pointermove", S), c.addEventListener("pointerup", O), c.addEventListener("pointercancel", O), c.addEventListener("pointerleave", I), () => {
      c.removeEventListener("pointerdown", k), c.removeEventListener("pointermove", S), c.removeEventListener("pointerup", O), c == null || c.removeEventListener("pointercancel", O), c == null || c.removeEventListener("pointerleave", I), d.current !== null && clearTimeout(d.current), i.current !== null && clearTimeout(i.current);
    };
  }, [t, n, x, r]), /* @__PURE__ */ E(he, { children: [
    e,
    t && a && /* @__PURE__ */ o(tr, { x: a.x, y: a.y, ms: n - x })
  ] });
}
function uo() {
  const e = vn();
  return wn ? e === null || Xe(e) : !1;
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
}, kt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", ir = "bg-blue-900!";
function fo({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: s = "button",
  ...l
}) {
  const a = l["data-state"] === "open", u = or[t][e];
  let c = `${u.base} ${a ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (c = a ? `${kt} ${ir}` : kt), /* @__PURE__ */ o("button", { type: s, className: `${rr} ${c} ${r}`, ...l });
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
function po({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: s = "" }) {
  const l = /* @__PURE__ */ new Date(), [a, u] = F(l.getFullYear()), [c, d] = F(l.getMonth()), [i, p] = F("days"), [h, x] = F(null), y = Le(() => new Set(e), [e]), z = ($) => {
    y.has($) ? t(e.filter((B) => B !== $)) : t([...e, $]);
  }, k = Le(() => {
    const $ = ur(a, c), B = new Date(a, c, 1).getDay(), w = [];
    for (let b = 0; b < B; b++) w.push({ key: `pad-${b}`, day: 0, empty: !0 });
    for (let b = 1; b <= $; b++) w.push({ key: dr(a, c, b), day: b, empty: !1 });
    return w;
  }, [a, c]), S = ($) => u((B) => Math.max(Ke, Math.min(Ye, B + $))), O = ($) => {
    c + $ < 0 ? (u((B) => Math.max(Ke, B - 1)), d(11)) : c + $ > 11 ? (u((B) => Math.min(Ye, B + 1)), d(0)) : d((B) => B + $);
  }, I = () => {
    if (h === null) return;
    const $ = parseInt(h, 10);
    !isNaN($) && $ >= Ke && $ <= Ye && u($), x(null);
  }, _ = ($) => e.some((B) => B.startsWith(`${a}-${String($ + 1).padStart(2, "0")}`)), C = n === "dark", H = D ? "p-2" : "p-1", X = D ? "w-5 h-5" : "w-4 h-4", U = D ? "text-[11px] py-2" : "text-[10px] py-1.5", f = D ? "py-2.5 text-sm" : "py-1.5 text-xs", g = D ? "py-3 text-sm" : "py-2 text-xs", R = D ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", M = D ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, P = C ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", j = C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ E("div", { className: `border rounded-lg overflow-hidden w-full ${C ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${s}`, children: [
    /* @__PURE__ */ E("div", { className: `flex items-center justify-between px-3 py-2 border-b ${C ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => i === "months" ? S(-1) : O(-1),
          className: `${H} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": i === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ o(qt, { className: X })
        }
      ),
      i === "days" ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => p("months"),
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
          onChange: ($) => x($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: I,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), I()), $.key === "Escape" && x(null);
          },
          className: M
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => i === "months" ? S(1) : O(1),
          className: `${H} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": i === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ o(Ue, { className: X })
        }
      )
    ] }),
    i === "months" ? /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 text-center", children: ar.map(($, B) => /* @__PURE__ */ E(
        "button",
        {
          type: "button",
          onClick: () => {
            d(B), p("days");
          },
          className: `${g} relative font-medium transition-colors border-b ${B === c ? P : j} ${C ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            $,
            _(B) && /* @__PURE__ */ o("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${B === c ? "bg-white" : C ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ o("div", { className: `text-center border-t ${C ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            u(l.getFullYear()), d(l.getMonth()), p("days");
          },
          className: `px-3 ${D ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${C ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ E("div", { className: "grid grid-cols-7 text-center", children: [
      lr.map(($) => /* @__PURE__ */ o("div", { className: `${U} font-semibold uppercase tracking-wider border-b ${C ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: $ }, $)),
      k.map(($) => $.empty ? /* @__PURE__ */ o("div", {}, $.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => z($.key),
          className: `${f} font-medium transition-colors border-b ${C ? "border-zinc-800/60" : "border-zinc-50"} ${y.has($.key) ? P : C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
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
        const B = /* @__PURE__ */ new Date($ + "T00:00:00"), w = B.getFullYear() === l.getFullYear() ? B.toLocaleString("default", { month: "short", day: "numeric" }) : B.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ E(
          "button",
          {
            type: "button",
            onClick: () => z($),
            "aria-label": `Remove ${w}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${C ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${R}`,
            children: [
              w,
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
  onToggleAll: s,
  allSelected: l = !1,
  toggleAllLabel: a,
  emptyHint: u = "Nothing here",
  maxHeight: c,
  disabled: d = !1,
  theme: i,
  className: p = ""
}) {
  const h = (k) => t instanceof Set ? t.has(k) : t.includes(k), x = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", y = D ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", z = r != null || s != null;
  return /* @__PURE__ */ E("div", { className: p, ...i ? { "data-theme": i } : {}, children: [
    z && /* @__PURE__ */ E("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      s != null && /* @__PURE__ */ o("button", { type: "button", disabled: d, onClick: s, className: "ui-checklist-toggleall", children: a ?? (l ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((k) => {
            const S = h(k.id);
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(k.id),
                className: `ui-checklist-item ${x} ${S ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${y}`, "aria-hidden": !0, children: S && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
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
  emptyHint: s = "Nothing here",
  maxHeight: l,
  compact: a = !1,
  disabled: u = !1,
  theme: c,
  className: d = ""
}) {
  const i = a ? "px-2.5 py-1.5 text-xs" : D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = a ? "w-3.5 h-3.5" : D ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ E("div", { className: d, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((h) => {
            const x = t === h.id;
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(h.id),
                className: `ui-checklist-item ${i} ${x ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${p}`, "aria-hidden": !0, children: x && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  h.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: h.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: h.label }),
                  h.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: h.secondary })
                ]
              },
              h.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: s })
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
  anchorMode: s = "visible",
  offset: l = 8
}) => {
  const a = me(), { refs: u, floatingStyles: c } = Qt({
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
          var O;
          if (s !== "visible") return {};
          const i = (O = d.elements.floating.ownerDocument) == null ? void 0 : O.defaultView;
          if (!i) return {};
          const p = d.rects.reference, h = Math.max(p.x, 0), x = Math.max(p.y, 0), y = Math.min(p.x + p.width, i.innerWidth), z = Math.min(p.y + p.height, i.innerHeight);
          if (y <= h || z <= x) return {};
          const k = r === "left" ? y - (p.x + p.width) : r === "right" ? h - p.x : 0, S = r === "top" ? x - p.y : r === "bottom" ? z - (p.y + p.height) : 0;
          return { x: d.x + k, y: d.y + S };
        }
      },
      tn(l),
      nn({ padding: 8 }),
      rn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (d) => {
          var z;
          const i = (z = d.elements.floating.ownerDocument) == null ? void 0 : z.defaultView;
          if (!i) return {};
          const p = d.rects.floating.width, h = d.rects.floating.height, x = Math.max(8, Math.min(d.x, i.innerWidth - p - 8)), y = Math.max(8, Math.min(d.y, i.innerHeight - h - 8));
          return { x, y };
        }
      }
    ],
    whileElementsMounted: en
  });
  return de(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ E(he, { children: [
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
  const n = ve(), r = me(), [s, l] = F(!1), [a, u] = F({ x: 0, y: 0 }), c = m(null), d = () => {
    if (!c.current) return;
    const i = c.current.getBoundingClientRect();
    u({ x: i.left + i.width / 2, y: i.top });
  };
  return J(() => (s && r && (d(), r.addEventListener("scroll", d, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", d, !0)), [s]), /* @__PURE__ */ E(
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
        s && Je(
          /* @__PURE__ */ E(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: a.x, top: a.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((i, p) => /* @__PURE__ */ o("div", { className: p > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: i }, p)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, xo = D ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", je = D ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", De = D ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", fr = "hover:bg-red-950/50", Ht = D ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Bt = "bg-blue-900/50 border-blue-700 text-blue-300", Wt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", hr = D ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", yo = D ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Pe = D ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", pr = "inline-flex rounded overflow-hidden border border-zinc-700", Kt = D ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Me = ({ onClick: e, disabled: t, title: n, className: r = je, children: s }) => /* @__PURE__ */ o($e, { content: n, children: /* @__PURE__ */ o("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: s }) }), wo = ({ value: e, options: t, onChange: n, disabled: r, active: s }) => /* @__PURE__ */ o("div", { className: pr, children: t.map((l) => {
  const a = s ? s(l.v) : e === l.v;
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
] }), $o = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: s }) => /* @__PURE__ */ E(he, { children: [
  /* @__PURE__ */ o(Me, { onClick: () => r(-1), disabled: e, title: "Move up", className: De, children: /* @__PURE__ */ o(Gt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: () => r(1), disabled: e, title: "Move down", className: De, children: /* @__PURE__ */ o(jt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: t, disabled: e, title: "Duplicate", className: De, children: /* @__PURE__ */ o(Et, { className: "w-2.5 h-2.5" }) }),
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
    const s = n.slice(0, r).trim().toLowerCase(), l = n.slice(r + 1).trim();
    xr.has(s) && l && t.push(`${s}: ${l}`);
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
  const s = document.createElement(n), l = t.getAttribute("style"), a = wr(l || "");
  if (a && s.setAttribute("style", a), n === "a") {
    s.setAttribute("href", t.getAttribute("href"));
    const u = t.getAttribute("target"), c = t.getAttribute("rel");
    u && s.setAttribute("target", u), c && s.setAttribute("rel", c);
  }
  for (const u of Array.from(t.childNodes)) s.appendChild(Ve(u));
  return s;
}
function Yt(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function vr(e) {
  const t = Yt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const a of Array.from(n.content.childNodes)) r.appendChild(Ve(a));
  const s = document.createElement("div");
  return s.appendChild(r), s.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function zo(e) {
  const t = Yt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Co(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const kr = { text: "#52525b" }, Nr = ({ node: e, selected: t, extension: n, editor: r, view: s, getPos: l }) => {
  var p;
  const a = e.attrs.field ?? "", u = n.options, c = ((p = u.resolve) == null ? void 0 : p.call(u, a)) ?? null, d = (c == null ? void 0 : c.color) ?? kr, i = (c == null ? void 0 : c.label) ?? `{{${a}}}`;
  return /* @__PURE__ */ o(
    cn,
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
        const x = typeof l == "function" ? l() : null;
        if (x == null) return;
        const y = s.state.doc.resolve(x), z = y.nodeAfter;
        z && Ae.isSelectable(z) && s.dispatch(s.state.tr.setSelection(new Ae(y))), (k = u.onTokenClick) == null || k.call(u, a, h.currentTarget.getBoundingClientRect(), x);
      },
      children: i
    }
  );
};
function $r(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Nt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const zr = gn.extend({
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
    return sn(Nr);
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
}), Cr = 240, Er = 280, Rr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = m(null);
  return J(() => {
    var l;
    const s = (l = r.current) == null ? void 0 : l.querySelector('[data-ac-active="1"]');
    s == null || s.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Er, maxHeight: Cr, zIndex: 9999 }, onMouseDown: (s) => s.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: e.items.map((s, l) => /* @__PURE__ */ E(
    "button",
    {
      type: "button",
      "data-ac-active": l === t ? "1" : void 0,
      onMouseEnter: () => n(l),
      onClick: () => e.command({ field: s.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${l === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ o("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: s.color.text } }),
        /* @__PURE__ */ o("span", { className: "truncate flex-1", children: s.label }),
        s.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] text-zinc-600", children: s.group })
      ]
    },
    s.key
  )) }) });
}, Tr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ o(Rr, { props: n, highlight: r, onHighlight: (s) => {
      e.highlight = s, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const s = bn(r);
      e = { holder: r, root: s, unmount: null, props: n, highlight: 0 };
      const l = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: a, y: u, placement: c }) => {
          var p, h;
          if (!e) return;
          const d = (h = (p = e.props) == null ? void 0 : p.clientRect) == null ? void 0 : h.call(p), i = d && !c.endsWith("-end") ? d.width : 0;
          r.style.left = `${a + i}px`, r.style.top = `${u}px`;
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
      const { items: r, command: s } = e.props;
      if (r.length === 0) return !1;
      const l = n.key;
      return l === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, r.length - 1), t(e.props), !0) : l === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : l === "Enter" || l === "Tab" ? (n.preventDefault(), s({ field: ((a = r[e.highlight]) == null ? void 0 : a.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Eo = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Dr = pe.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: s,
  onStateChange: l,
  resolveToken: a,
  suggestionItems: u,
  onTokenClick: c,
  onSelectionChange: d
}, i) => {
  const p = m(a);
  p.current = a;
  const h = m(u);
  h.current = u;
  const x = m(c);
  x.current = c;
  const y = m(d);
  y.current = d;
  const z = m(null), k = m(null), S = m(t);
  S.current = t;
  const O = m(r);
  O.current = r;
  const I = m(l);
  I.current = l;
  const _ = m(null), C = (g) => {
    var P;
    const R = {
      bold: g.isActive("bold"),
      italic: g.isActive("italic"),
      underline: g.isActive("underline"),
      strike: g.isActive("strike"),
      link: g.isActive("link"),
      color: g.getAttributes("textStyle").color || ""
    }, M = _.current;
    M && M.bold === R.bold && M.italic === R.italic && M.underline === R.underline && M.strike === R.strike && M.link === R.link && M.color === R.color || (_.current = R, (P = I.current) == null || P.call(I, R));
  }, H = (g) => {
    var $;
    const R = g.state.selection;
    let M = null;
    R instanceof Ae && R.node.type.name === "token" ? (M = { key: R.node.attrs.field ?? "", pos: R.from }, z.current = R.from) : z.current != null && (z.current = g.state.tr.mapping.map(z.current));
    const P = k.current, j = P && M && P.key === M.key && P.pos === M.pos;
    !P && !M || j || (k.current = M, ($ = y.current) == null || $.call(y, M));
  }, X = (g) => {
    const R = vr($r(g));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(R) ? "" : R;
  }, U = pe.useMemo(() => {
    const g = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: R }) => {
        var M;
        return ((M = h.current) == null ? void 0 : M.call(h, R)) ?? [];
      },
      command: ({ editor: R, range: M, props: P }) => {
        R.chain().focus().insertContentAt(M, { type: "token", attrs: { field: P.field } }).run();
      },
      render: Tr
    };
    return zr.configure({
      resolve: p.current ?? null,
      suggestion: g,
      onTokenClick: (R, M, P) => {
        var j;
        z.current = P, (j = x.current) == null || j.call(x, R, M, P);
      }
    });
  }, []), f = ln({
    immediatelyRender: !1,
    extensions: [
      un,
      dn.configure({ placeholder: n }),
      fn,
      hn,
      mn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      pn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      U
    ],
    content: Nt(e || ""),
    editable: !r,
    onUpdate: ({ editor: g }) => {
      S.current(X(g.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: g }) => {
      C(g), H(g);
    }
  });
  return J(() => {
    if (!f || f.isFocused) return;
    X(f.getHTML()) !== e && (_.current = null, f.commands.setContent(Nt(e || ""), { emitUpdate: !1 }), C(f));
  }, [e, f]), J(() => {
    f && f.setEditable(!r);
  }, [r, f]), J(() => {
    f && (_.current = null, C(f), H(f));
  }, [f]), Ft(i, () => ({
    exec: (g, R) => {
      if (!(!f || O.current))
        switch (g) {
          case "bold":
            f.chain().focus().toggleBold().run();
            break;
          case "italic":
            f.chain().focus().toggleItalic().run();
            break;
          case "underline":
            f.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            f.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            R && f.chain().focus().setColor(R).run();
            break;
          case "unsetColor":
            f.chain().focus().unsetColor().run();
            break;
          case "link":
            R && f.chain().focus().extendMarkRange("link").setLink({ href: R }).run();
            break;
          case "unlink":
            f.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => f == null ? void 0 : f.commands.focus(),
    insertToken: (g) => {
      !f || O.current || f.chain().focus().insertContent({ type: "token", attrs: { field: g } }).run();
    },
    replaceToken: (g) => {
      if (!f || O.current) return;
      const R = z.current;
      R != null && f.commands.command(({ tr: M }) => {
        const P = M.doc.nodeAt(R);
        if (!P || P.type.name !== "token") return !1;
        M.setNodeMarkup(R, void 0, { field: g });
        const j = M.doc.resolve(R);
        return j.nodeAfter && j.nodeAfter.type.name === "token" && M.setSelection(new Ae(j)), !0;
      });
    }
  }), [f]), /* @__PURE__ */ o(an, { editor: f, className: `richtext-editor ${s || ""}` });
});
Dr.displayName = "RichTextEditor";
const Mr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Sr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], $t = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Ro = ({ value: e, disabled: t, onChange: n }) => {
  const [r, s] = F(!1);
  return /* @__PURE__ */ o(
    _e,
    {
      open: r,
      onOpenChange: s,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ E("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ o(Tt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Mr.map((l) => /* @__PURE__ */ o(Dn, { onClick: () => {
        n(l), s(!1);
      }, icon: l === e ? /* @__PURE__ */ o(Ct, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: l }, children: l }) }, l))
    }
  );
}, Pr = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, s] = F(!1), [l, a] = F(""), u = () => {
    var d;
    const c = l.trim();
    c && ((d = e.current) == null || d.exec("link", c), s(!1));
  };
  return /* @__PURE__ */ o(
    _e,
    {
      open: r,
      onOpenChange: s,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (c) => c.preventDefault(),
          className: `${Ht} ${n ? Bt : Wt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(Jt, { className: "w-3 h-3" })
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
                (c = e.current) == null || c.exec("unlink"), s(!1);
              },
              className: je,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, To = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: s }) => {
  const [l, a] = F(!1), u = (i, p) => {
    var h;
    return (h = e.current) == null ? void 0 : h.exec(i, p);
  }, c = (i) => `${Ht} ${i ? Bt : Wt}`, d = (i) => !!(r != null && r[i]);
  return /* @__PURE__ */ E("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: t || d("bold"), onMouseDown: (i) => i.preventDefault(), onClick: () => u("bold"), className: `${c(((n == null ? void 0 : n.bold) ?? !1) || d("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: t || d("italic"), onMouseDown: (i) => i.preventDefault(), onClick: () => u("italic"), className: `${c(((n == null ? void 0 : n.italic) ?? !1) || d("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o($e, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: t, onMouseDown: (i) => i.preventDefault(), onClick: () => u("underline"), className: c((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Vt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o($e, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (i) => i.preventDefault(), onClick: () => u("strikeThrough"), className: c((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(Zt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(Pr, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(
      _e,
      {
        open: l,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ E("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o($t, {}),
          /* @__PURE__ */ o(Tt, { className: "w-3 h-3 text-zinc-500" })
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
              children: /* @__PURE__ */ o($t, { className: "w-3.5 h-3.5" })
            }
          ),
          Sr.map((i) => /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                u("foreColor", i), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${i === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: i },
              title: i
            },
            i
          ))
        ] })
      }
    ),
    s && /* @__PURE__ */ E(he, { children: [
      /* @__PURE__ */ o("div", { className: Pe }),
      s
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
  _e as DropdownMenu,
  Sn as DropdownSubmenu,
  it as DropdownThemeContext,
  Mr as FONTS,
  bo as FloatingChrome,
  Ro as FontMenu,
  To as FormatToolbar,
  D as IS_COARSE,
  wn as IS_TOUCH_CAPABLE,
  Qr as ItemManagerDropdown,
  ao as LongPressMenuProvider,
  et as MORPH_EASE,
  we as MORPH_MS,
  tt as MORPH_OPACITY_MS,
  Oe as MenuHighlightContext,
  so as Modal,
  co as ModalFooter,
  ho as ModalFooterButton,
  xn as PopoutWindowContext,
  Eo as RICH_TEXT_STATE_IDLE,
  go as RadioList,
  Dr as RichTextEditor,
  vo as SectionHeader,
  wo as Seg,
  $o as StructureControls,
  st as SubmenuContext,
  je as TB_BTN,
  De as TB_BTN_ICON,
  fr as TB_DANGER,
  Pe as TB_DIVIDER,
  hr as TB_INPUT,
  yo as TB_NUM,
  Kt as TB_PICKER,
  xo as TB_ROW_LABEL,
  pr as TB_SEG,
  Ht as TB_TOGGLE,
  Wt as TB_TOGGLE_OFF,
  Bt as TB_TOGGLE_ON,
  zr as Token,
  Nr as TokenChipView,
  Me as ToolButton,
  $e as Tooltip,
  nt as ZOOM_FROM,
  zn as cloneOverlayClose,
  Co as escapeHtml,
  Lt as getDropdownClasses,
  Vr as getHardwareKeyboard,
  jr as getLastPointerType,
  nr as isInteractiveElement,
  Xe as isTouchLike,
  kn as nearestOverlayOrigin,
  Yt as normalizeSpaces,
  He as overlayMorphEnabled,
  $n as playOverlayClose,
  Nn as playOverlayOpen,
  Nt as preprocessTokenHtml,
  vr as sanitizeRichText,
  zo as stripRichText,
  $r as stripTokenWrappers,
  yn as useCurrentDocument,
  me as useCurrentWindow,
  oo as useDialog,
  Pt as useDropdownTheme,
  Cn as useFixedPosition,
  Zr as useHardwareKeyboard,
  vn as useLastPointerType,
  lo as useLongPressOptOut,
  ct as useMenuHighlight,
  ot as useOverlayMorph,
  Qe as usePopoutWindow,
  ve as usePortalTarget,
  Jr as useSmartPosition,
  uo as useTouchMode
};
