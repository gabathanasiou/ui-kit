"use client";
import { jsxs as C, jsx as o, Fragment as he } from "react/jsx-runtime";
import pe, { createContext as Ce, useContext as Ee, useState as F, useEffect as J, useRef as m, useCallback as G, useLayoutEffect as de, useMemo as Le, useImperativeHandle as Ft } from "react";
import * as Z from "@radix-ui/react-dropdown-menu";
import { Check as Ct, X as Ze, Pencil as Ut, Copy as Et, Trash2 as Fe, RotateCcw as Tt, Plus as Xt, ChevronRight as Ue, ChevronLeft as qt, ArrowUp as Gt, ArrowDown as jt, ChevronDown as Rt, Underline as Vt, Strikethrough as Zt, Link as Jt } from "lucide-react";
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
const Te = typeof window < "u", D = Te && window.matchMedia("(pointer: coarse)").matches, wn = Te && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Xe(e) {
  return e === "touch" || e === "pen";
}
let ye = null;
const qe = /* @__PURE__ */ new Set();
Te && window.addEventListener("pointerdown", (e) => {
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
  return Te ? Dt.some((e) => window.matchMedia(e).matches) : !1;
}
let Ie = Mt();
const Ge = /* @__PURE__ */ new Set();
function pt(e) {
  Ie !== e && (Ie = e, Ge.forEach((t) => t()));
}
var zt;
if (Te) {
  const e = () => pt(Mt());
  for (const u of Dt) {
    const d = window.matchMedia(u);
    (zt = d.addEventListener) == null || zt.call(d, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (u) => {
    u.isComposing || u.keyCode !== 229 && (u.key === "Enter" || u.key === "Backspace" || u.key === "Process" || u.key === "Unidentified" || pt(!0));
  });
  let n = null, r = null;
  const i = "__penClick", a = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (u) => {
    u.pointerType !== "pen" || u.button !== 0 || (n = { x: u.clientX, y: u.clientY });
  }, !0), window.addEventListener("pointerup", (u) => {
    if (u.pointerType !== "pen") return;
    const d = n;
    if (n = null, !d || Math.hypot(u.clientX - d.x, u.clientY - d.y) > 8) return;
    const c = u.target;
    if (!c || !c.isConnected) return;
    if (c instanceof HTMLInputElement && a.has(c.type)) {
      try {
        c.showPicker();
      } catch {
      }
      return;
    }
    const s = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    s[i] = !0, r = { x: u.clientX, y: u.clientY, time: Date.now() }, c.dispatchEvent(s);
  }, !0), window.addEventListener("click", (u) => {
    u[i] || r && Date.now() - r.time < 1e3 && Math.hypot(u.clientX - r.x, u.clientY - r.y) < 12 && (u.preventDefault(), u.stopPropagation());
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
  const i = ++e.current, a = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${nt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === i && requestAnimationFrame(() => {
      if (e.current !== i) return;
      const u = rt(t, n);
      t.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, t.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === i && (t.style.transition = a.transition, t.style.transform = a.transform, t.style.transformOrigin = a.transformOrigin, t.style.opacity = a.opacity, r == null || r());
      }, we + 60);
    });
  });
}
function $n(e, t, n, r) {
  const i = ++e.current, a = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, u = rt(t, n);
  t.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, t.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, t.style.transform = `scale(${nt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === i && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== i || t.isConnected || (t.style.transition = a.transition, t.style.transform = a.transform, t.style.transformOrigin = a.transformOrigin, t.style.opacity = a.opacity, t.style.pointerEvents = a.pointerEvents, t.style.visibility = a.visibility);
    }));
  }, we + 60);
}
function zn(e, t, n) {
  const r = e.cloneNode(!0), i = e.getBoundingClientRect(), a = i.width > 0 || i.height > 0 ? i : n ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${a.left}px`, r.style.top = `${a.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const u = rt(e, t);
  r.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${we}ms ${et}, opacity ${tt}ms ease`, r.style.transform = `scale(${nt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, we + 60));
    });
  });
}
function ot(e) {
  const t = m(null), [n, r] = F(!1), i = m(null), a = m(0), u = G((g) => {
    if (e.ref && (e.ref.current = g), g) {
      a.current = 0, t.current = g;
      const y = g.getBoundingClientRect();
      (y.width > 0 || y.height > 0) && (i.current = { left: y.left, top: y.top, width: y.width, height: y.height }), r(!0);
      return;
    }
    const N = t.current, E = ++a.current;
    queueMicrotask(() => {
      E === a.current && t.current === N && (t.current = null, r(!1), !(!N || !e.cloneOnUnmount || !d.current) && N.style.visibility !== "hidden" && He(p.current) && zn(N, s.current, i.current));
    });
  }, []), d = m(e.visible);
  d.current = e.visible;
  const c = m(e.visible), s = m(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const l = m(e.onClosed);
  l.current = e.onClosed;
  const p = m(e.morph !== !1);
  p.current = e.morph !== !1;
  const h = m(0);
  return de(() => {
    if (!n || !d.current || !He(p.current)) return;
    const g = t.current;
    g && Nn(h, g, s.current);
  }, [n, e.visible]), de(() => {
    var E;
    const g = c.current;
    if (c.current = e.visible, e.visible || !g) return;
    const N = t.current;
    if (!N || !He(p.current)) {
      (E = l.current) == null || E.call(l);
      return;
    }
    $n(h, N, s.current, () => {
      var y;
      return (y = l.current) == null ? void 0 : y.call(l);
    });
  }, [e.visible]), J(() => {
    if (!n || !d.current) return;
    const g = (N) => {
      const E = t.current;
      E && E.contains(N.target) && N.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", g, { capture: !0 }), () => document.removeEventListener("wheel", g, { capture: !0 });
  }, [n]), u;
}
function Jr(e, t) {
  const n = me(), r = m(n);
  r.current = n, de(() => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const a = r.current;
    if (!a) return;
    const u = e.current.getBoundingClientRect(), d = i.getBoundingClientRect(), c = a.innerWidth, s = a.innerHeight, l = d.right - c;
    if (l > 0) {
      const p = Math.min(l + 8, d.left);
      i.style.left = `${d.left - u.left - p}px`;
    }
    d.left < 0 && (i.style.left = `${-u.left + 4}px`), d.bottom > s + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-u.top + 4}px`, i.style.maxHeight = `${s - 8}px`));
  }, [t, e]);
}
function Cn(e, t, n, r) {
  const i = me(), a = m(i);
  a.current = i, de(() => {
    if (!t || !e.current) return;
    const u = e.current;
    let d = 0;
    const c = () => {
      var X, U;
      d = 0;
      const h = u.getBoundingClientRect(), g = a.current;
      if (!g) return;
      const N = g.innerWidth, E = ((X = g.visualViewport) == null ? void 0 : X.height) ?? g.innerHeight, y = ((U = g.visualViewport) == null ? void 0 : U.offsetTop) ?? 0, P = (r == null ? void 0 : r.panelWidth) ?? Math.max(h.width, 200), _ = 4, I = 120;
      let O = Math.max(0, h.left);
      O + P > N && (O = Math.max(0, N - P - 8));
      const z = y + E - h.bottom - _ - 16, H = h.top - y - _ - 16;
      if (z >= I || z >= H) {
        const f = Math.min(h.bottom + _, y + E), b = Math.max(I, y + E - f - 16);
        n({ top: f, left: O, width: h.width, maxH: b });
      } else {
        const f = Math.max(I, Math.min(H, 360)), b = y + E - (h.top - _);
        n({ top: 0, left: O, width: h.width, maxH: f, bottom: Math.max(0, b) });
      }
    }, s = () => {
      d || (d = requestAnimationFrame(c));
    }, l = a.current ?? null, p = (l == null ? void 0 : l.document) ?? null;
    return s(), p == null || p.addEventListener("scroll", s, { capture: !0, passive: !0 }), l == null || l.addEventListener("resize", s), () => {
      d && cancelAnimationFrame(d), p == null || p.removeEventListener("scroll", s, { capture: !0 }), l == null || l.removeEventListener("resize", s);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let xe = null;
function St(e) {
  return xe == null || xe(), xe = e, () => {
    xe === e && (xe = null);
  };
}
const it = Ce("dark"), Pt = () => Ee(it), En = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", mt = D ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Tn = D ? "text-xs" : "text-[10px]";
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
    headerText: `${mt} font-semibold uppercase tracking-wider ${Tn} ui-label`,
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
  const e = m([]), [t, n] = F(-1), [r, i] = F(!1), [a, u] = F(0), d = G((p) => (e.current = [...e.current, p], u((h) => h + 1), () => {
    e.current = e.current.filter((h) => h !== p), u((h) => h + 1);
  }), []), c = G((p, h) => {
    n(p), i(h === "pointer");
  }, []), s = G(() => {
    i((p) => p && (n(-1), !1));
  }, []);
  return Le(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: d,
    setHighlighted: c,
    pointerLeave: s
  }), [t, r, a, d, c, s]);
}
function at(e, t, n, r) {
  const i = m(-1);
  i.current = t.highlightedIndex;
  const a = m(t);
  a.current = t;
  const u = m(e);
  u.current = e;
  const d = m(r);
  d.current = r;
  const c = m({ text: "", time: 0 });
  n.current || (n.current = (s) => {
    var p, h;
    if (!u.current) return;
    const l = a.current.items;
    if (l.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = s.key === "ArrowDown" ? 1 : -1, N = (i.current + g + l.length) % l.length;
        a.current.setHighlighted(N, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = i.current;
        g >= 0 && g < l.length && l[g].submenu && l[g].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (h = (p = d.current) == null ? void 0 : p.onCloseSub) == null || h.call(p);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = i.current;
        g >= 0 && g < l.length && l[g].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = Date.now(), N = (g - c.current.time > 500 ? "" : c.current.text) + s.key.toLowerCase();
        if (c.current = { text: N, time: g }, !N) return;
        const E = i.current + 1;
        for (let y = 0; y < l.length; y++) {
          const P = (E + y) % l.length;
          if (l[P].label.toLowerCase().startsWith(N)) {
            a.current.setHighlighted(P, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ut(e, t, n, r, i, a) {
  const u = m(t);
  u.current = t;
  const d = m(e);
  d.current = e;
  const c = m(i);
  c.current = i, a.current || (a.current = (s) => {
    if (!d.current || c.current) return;
    const l = r.current;
    l && l.contains(s.target) || u.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function dt(e, t) {
  const n = m(e);
  n.current = e, t.current || (t.current = (r) => {
    if (!n.current) return;
    const i = r.currentTarget;
    i.scrollHeight > i.clientHeight && (r.preventDefault(), i.scrollTop += r.deltaY);
  });
}
function _e({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: i = "left",
  width: a,
  theme: u = "dark",
  children: d,
  morph: c = !0,
  contentClassName: s,
  initialHighlightIndex: l
}) {
  const [p, h] = F([]), [g, N] = F(null), E = ve(), y = m(null), P = m(null), _ = m(e);
  _.current = e;
  const [I, O] = F(e), z = lt();
  J(() => {
    if (e)
      return O(!0), z.setHighlighted(l ?? -1, "keyboard"), St(() => {
        n == null || n(!1), t == null || t();
      });
    h([]);
  }, [e, l, n, t]);
  const H = G(() => {
    const K = y.current;
    if (!K) return null;
    const te = K.getBoundingClientRect();
    return { left: te.left, top: te.top, width: te.width, height: te.height };
  }, []), X = ot({
    visible: e,
    morph: c,
    anchor: H,
    onClosed: () => O(!1)
  }), U = m(() => {
  }), f = m(() => {
  }), b = m(() => {
  });
  at(e && p.length === 0, z, U), dt(e, f), ut(e, z, U, P, p.length > 0, b);
  const T = m(null), M = G((K) => {
    var te;
    if (K) {
      K.addEventListener("keydown", U.current, { capture: !0 }), K.addEventListener("wheel", f.current, { passive: !1 });
      const ie = K.ownerDocument;
      T.current = ie, ie.addEventListener("keydown", b.current, { capture: !0 });
    } else
      (te = T.current) == null || te.removeEventListener("keydown", b.current, { capture: !0 }), T.current = null;
    P.current = K, X(K);
  }, [X]), [S, j] = F({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [$, B] = F(0);
  J(() => {
    e && y.current && B(y.current.getBoundingClientRect().width);
  }, [e]);
  const w = Le(() => ({ panelWidth: $ || void 0 }), [$]);
  Cn(y, e, (K) => j({ ...K, maxH: Math.min(K.maxH, 384), ready: !0 }), w), J(() => {
    if (S.ready && e) {
      const K = P.current;
      K && K.ownerDocument.activeElement !== K && !K.contains(K.ownerDocument.activeElement) && K.focus();
    }
  }, [S.ready, e]), de(() => {
    var te;
    if (!e || z.highlightedIndex < 0) return;
    const K = (te = P.current) == null ? void 0 : te.querySelector(`[data-ei="${z.highlightedIndex}"]`);
    K == null || K.scrollIntoView({ block: "nearest" });
  }, [e, z.highlightedIndex]);
  const x = G((K) => {
    !K && !_.current || (!K && R.current && (A.current = !0), n ? n(K) : K || t == null || t());
  }, [n, t]), V = m(I);
  V.current = I;
  const R = m(!1), A = m(!1), L = G(() => {
    if (!_.current && V.current) {
      if (A.current) {
        A.current = !1, R.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), k = pe.isValidElement(r) ? r : null, Q = k ? pe.cloneElement(k, {
    ref: (K) => {
      y.current = K;
    },
    onPointerDown: () => {
      R.current = !0, A.current = !1;
    },
    onClick: (K) => {
      var te, ie;
      (ie = (te = k.props).onClick) == null || ie.call(te, K), L();
    }
  }) : r;
  return /* @__PURE__ */ C(Z.Root, { open: e || I, onOpenChange: x, modal: !1, children: [
    /* @__PURE__ */ o(Z.Trigger, { asChild: !0, children: Q }),
    /* @__PURE__ */ o(Z.Portal, { container: E ?? void 0, children: /* @__PURE__ */ o(it.Provider, { value: u, children: /* @__PURE__ */ o(st.Provider, { value: { chain: p, setChain: h, morph: c, keyboardOpened: g, setKeyboardOpened: N }, children: /* @__PURE__ */ o(Oe.Provider, { value: z, children: /* @__PURE__ */ o(
      Z.Content,
      {
        ref: M,
        "data-theme": u,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${a || ""} ${s || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: S.left,
          top: S.bottom != null ? void 0 : S.top,
          bottom: S.bottom,
          width: a ? void 0 : $ || void 0,
          maxHeight: S.maxH,
          visibility: S.ready ? "visible" : "hidden"
        },
        onPointerLeave: z.pointerLeave,
        children: d
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
  onRename: a,
  onDuplicate: u,
  onDelete: d,
  onCreate: c,
  onImport: s,
  onExport: l,
  onReset: p,
  onTrash: h,
  closeOnSelect: g,
  readOnly: N = !1,
  theme: E,
  align: y,
  label: P,
  header: _,
  itemLabel: I,
  trigger: O,
  minItems: z = 1,
  itemRender: H,
  morph: X = !0,
  contentClassName: U
}) {
  const f = Lt(), [b, T] = F(null), [M, S] = F(""), j = m(null), $ = m(null);
  J(() => {
    e && requestAnimationFrame(() => {
      var R, A;
      (A = (R = $.current) == null ? void 0 : R.querySelector('[data-active="1"]')) == null || A.scrollIntoView({ block: "nearest" });
    });
  }, [e]), J(() => {
    var L;
    if (!e) return;
    const R = (k) => {
      var ge, v, W, Y, ne;
      if ((v = (ge = k.target) == null ? void 0 : ge.closest) != null && v.call(ge, "input, textarea, [contenteditable]")) return;
      const Q = (W = $.current) == null ? void 0 : W.closest(".ui-menu");
      if (!Q || !Q.contains(k.target)) return;
      const ue = Q.ownerDocument, K = [...Q.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], te = [...Q.querySelectorAll('div:last-child > [role="menuitem"]')], ie = [...K, ...te];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const q = ue.activeElement;
        let ee = q ? ie.indexOf(q) : -1;
        if (ee < 0 && q) {
          const ae = q.closest("[data-active]"), be = ae == null ? void 0 : ae.querySelector('[role="menuitem"]:first-child');
          be && (ee = K.indexOf(be));
        }
        const oe = k.key === "ArrowDown" ? 1 : -1, re = ee < 0 ? oe === 1 ? 0 : ie.length - 1 : (ee + oe + ie.length) % ie.length;
        (Y = ie[re]) == null || Y.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const q = ue.activeElement, ee = q == null ? void 0 : q.closest("[data-active]");
        if (!ee) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const oe = [...ee.querySelectorAll('[role="menuitem"]')].slice(1);
        if (oe.length === 0) return;
        const re = q && ee.contains(q) ? oe.indexOf(q) : -1, ae = k.key === "ArrowRight" ? 1 : -1, be = re < 0 ? 0 : (re + ae + oe.length) % oe.length;
        (ne = oe[be]) == null || ne.focus({ preventScroll: !0 });
        return;
      }
    }, A = ((L = $.current) == null ? void 0 : L.ownerDocument) ?? null;
    return A == null || A.addEventListener("keydown", R, { capture: !0 }), () => A == null ? void 0 : A.removeEventListener("keydown", R, { capture: !0 });
  }, [e]), J(() => {
    if (b) {
      requestAnimationFrame(() => {
        var A, L;
        (A = j.current) == null || A.focus(), (L = j.current) == null || L.select();
      });
      const R = n.find((A) => A.id === b);
      R && !M && S(R.name);
    }
  }, [b]), J(() => {
    if (b) {
      const R = n.find((A) => A.id === b);
      R && !M && S(R.name);
    }
  }, [b, n]);
  const B = (R, A) => {
    T(R), S(A);
  }, w = () => {
    b && M.trim() && a(b, M.trim()), T(null);
  }, x = () => {
    T(null);
  }, V = I || _.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ C(_e, { open: e, onOpenChange: (R) => {
    R ? (T(null), S("")) : (b && M.trim() && a(b, M.trim()), T(null), S("")), (!R || !N) && t(R);
  }, width: "w-80", theme: E, align: y, trigger: O, morph: X, contentClassName: U, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${f.headerText}`, children: _ }),
    /* @__PURE__ */ o("div", { ref: $, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((R) => {
      const A = R.id === r, L = b === R.id;
      return /* @__PURE__ */ o("div", { "data-active": A ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${A || L ? f.rowActiveBg : f.rowHoverBg} ${b && !L ? "opacity-40 pointer-events-none" : ""}`, children: L ? /* @__PURE__ */ C(he, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: j,
            value: M,
            onChange: (k) => S(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), w()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), x());
            },
            className: `w-full border rounded ${f.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${f.editConfirm} !text-white`,
            onSelect: (k) => {
              k.preventDefault(), w();
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
            onSelect: (k) => {
              k.preventDefault(), x();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Ze, { className: f.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ C(he, { children: [
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none cursor-pointer flex items-center ${f.rowText} ${A ? "" : f.rowTextHover}`,
            onSelect: g ? () => {
              i(R.id);
            } : (k) => {
              k.preventDefault(), i(R.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${A ? f.rowActiveText : ""}`, children: H ? H(R) : R.name })
          }
        ),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${A ? f.btnActive : f.btnBase} ${A ? "!text-white" : ""}`,
            onSelect: (k) => {
              k.preventDefault(), B(R.id, R.name);
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: /* @__PURE__ */ o(Ut, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${A ? f.btnActive : f.btnBase} ${A ? "!text-white" : ""}`,
            onSelect: (k) => {
              k.preventDefault();
              const Q = u(R.id);
              Q && B(Q, `${R.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: /* @__PURE__ */ o(Et, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          Z.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= z ? f.btnDisabled : A ? f.btnDangerActive : f.btnDanger} ${A ? "!text-white hover:!text-red-400" : ""}`,
            onSelect: (k) => {
              k.preventDefault(), d(R.id);
            },
            onTouchStart: () => {
            },
            disabled: N || n.length <= z,
            children: /* @__PURE__ */ o(Fe, { className: f.btnIcon })
          }
        )
      ] }) }, R.id);
    }) }),
    /* @__PURE__ */ C("div", { className: `shrink-0 ${b ? "opacity-40 pointer-events-none" : ""}`, children: [
      p && /* @__PURE__ */ C(he, { children: [
        /* @__PURE__ */ o(Z.Separator, { className: f.separator }),
        /* @__PURE__ */ C(
          Z.Item,
          {
            className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
            onSelect: (R) => {
              R.preventDefault(), p();
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: [
              /* @__PURE__ */ o(Tt, { className: `${f.btnIcon} ${f.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || s || l || h) && /* @__PURE__ */ o(Z.Separator, { className: f.separator }),
      c && /* @__PURE__ */ C(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault();
            const A = c();
            A && B(A, "");
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ o(Xt, { className: `${f.btnIcon} ${f.icon}` }),
            "New ",
            V
          ]
        }
      ),
      s && /* @__PURE__ */ C(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ C("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      l && /* @__PURE__ */ C(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), l();
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ C("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      h && /* @__PURE__ */ C(
        Z.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault} ui-row`,
          onSelect: (R) => {
            R.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ o(Fe, { className: `${f.btnIcon} ${f.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Rn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Dn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: i = "",
  children: a,
  keepOpen: u = !1,
  selected: d = !1,
  rightAction: c,
  trailing: s
}) {
  Pt();
  const l = Lt(), p = m(!1), h = m(null), g = ct(), N = m(g);
  N.current = g;
  const E = m(null);
  J(() => {
    var O;
    const I = {
      label: At(a),
      activate: () => {
        n || e();
      }
    };
    return E.current = I, (O = N.current) == null ? void 0 : O.register(I);
  }, []);
  const y = g && E.current ? g.items.indexOf(E.current) : -1, P = !n && y >= 0 && y === g.highlightedIndex, _ = r === "danger" ? l.itemDanger : l.itemDefault;
  return /* @__PURE__ */ C(
    Z.Item,
    {
      ref: h,
      "data-ei": y >= 0 ? y : void 0,
      className: `w-full text-left ${Rn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${_} ${d ? "ui-item-selected" : ""} ${P ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (I) => {
        if (p.current) {
          p.current = !1;
          return;
        }
        u && I.preventDefault(), e();
      },
      onPointerEnter: () => {
        !n && g && y >= 0 && g.setHighlighted(y, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ o("span", { className: `${l.icon} shrink-0`, children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        s && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: s }),
        c && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${l.rightAction}`,
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
function Sn({ id: e, label: t, icon: n, width: r, side: i = "right", children: a, contentClassName: u }) {
  const { chain: d, setChain: c, morph: s, keyboardOpened: l, setKeyboardOpened: p } = Ee(st), h = d.includes(e), g = d[d.length - 1] === e, N = Pt(), E = ve(), y = m(null), P = m(null), [_, I] = F(h), O = !h && _;
  J(() => {
    h && I(!0);
  }, [h]);
  const z = () => c((L) => {
    const k = L.indexOf(e);
    return k >= 0 ? L.slice(0, k) : L;
  }), H = lt(), X = ct(), U = m(X);
  U.current = X;
  const f = m(null);
  J(() => {
    var k;
    const L = {
      label: t,
      activate: () => {
        p(e), c((Q) => Q.includes(e) ? Q : [...Q, e]);
      },
      submenu: !0
    };
    return f.current = L, (k = U.current) == null ? void 0 : k.register(L);
  }, []);
  const b = X && f.current ? X.items.indexOf(f.current) : -1, T = b >= 0 && b === X.highlightedIndex, M = G(() => {
    const L = y.current;
    if (!L) return null;
    const k = L.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), S = ot({
    visible: h,
    morph: s,
    anchor: M,
    onClosed: () => I(!1)
  }), j = m(() => {
  }), $ = m(() => {
  }), B = m(() => {
  });
  at(h && g, H, j, {
    onCloseSub: () => {
      z(), X && b >= 0 && X.setHighlighted(b, "keyboard");
    }
  });
  const w = m(l);
  w.current = l, J(() => {
    h && (w.current === e ? (H.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var L;
      return (L = P.current) == null ? void 0 : L.focus();
    }), p(null)) : H.setHighlighted(-1, "keyboard"));
  }, [h]), dt(h, $), ut(h, H, j, P, !g, B), pe.useLayoutEffect(() => {
    var k;
    if (!h || H.highlightedIndex < 0) return;
    const L = (k = P.current) == null ? void 0 : k.querySelector(`[data-ei="${H.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [h, H.highlightedIndex]);
  const x = m(null), V = G((L) => {
    var k;
    if (L) {
      L.addEventListener("keydown", j.current, { capture: !0 }), L.addEventListener("wheel", $.current, { passive: !1 });
      const Q = L.ownerDocument;
      x.current = Q, Q.addEventListener("keydown", B.current, { capture: !0 });
    } else
      (k = x.current) == null || k.removeEventListener("keydown", B.current, { capture: !0 }), x.current = null;
    P.current = L, S(L);
  }, [S]), R = `w-full text-left ${Mn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${T ? " ui-item-highlighted" : ""}${O ? " ui-sub-closing" : ""}`, A = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${u || ""}`;
  return /* @__PURE__ */ C(Z.Sub, { open: h || _, onOpenChange: (L) => c((k) => {
    if (!L) {
      const Q = k.indexOf(e);
      return Q >= 0 ? k.slice(0, Q) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ C(
      Z.SubTrigger,
      {
        ref: y,
        "data-ei": b >= 0 ? b : void 0,
        className: R,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          X && b >= 0 && X.setHighlighted(b, "pointer");
        },
        onPointerDown: (L) => {
          L.pointerType === "pen" && (L.preventDefault(), c((k) => h ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          i === "left" && /* @__PURE__ */ o(Ue, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ C("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          i === "right" && /* @__PURE__ */ o(Ue, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(Z.Portal, { container: E ?? void 0, children: /* @__PURE__ */ o(
      Z.SubContent,
      {
        ref: V,
        "data-theme": N,
        className: A,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: H.pointerLeave,
        children: /* @__PURE__ */ o(Oe.Provider, { value: H, children: a })
      }
    ) })
  ] });
}
const ke = 8, Pn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ln = D ? "text-sm" : "text-xs", eo = ({ open: e, x: t, y: n, onClose: r, children: i, containerRef: a, morph: u = !0 }) => {
  const d = m(null), c = me(), [s, l] = F(!1), [p, h] = F([]), [g, N] = F(null), E = lt();
  J(() => {
    if (e)
      return St(r);
  }, [e, r]);
  const y = m({ left: t, top: n });
  e && (y.current = { left: t, top: n });
  const P = G(() => ({ left: y.current.left, top: y.current.top, width: 0, height: 0 }), []), _ = ot({
    visible: !0,
    morph: u,
    anchor: P,
    cloneOnUnmount: !0
  }), I = m(() => {
  }), O = m(() => {
  }), z = m(() => {
  });
  at(e, E, I), dt(e, O), ut(e, E, I, d, p.length > 0, z);
  const H = m(null), X = G((b) => {
    var T;
    if (b) {
      b.addEventListener("keydown", I.current, { capture: !0 }), b.addEventListener("wheel", O.current, { passive: !1 });
      const M = b.ownerDocument;
      H.current = M, M.addEventListener("keydown", z.current, { capture: !0 });
    } else
      (T = H.current) == null || T.removeEventListener("keydown", z.current, { capture: !0 }), H.current = null;
    d.current = b, l(!!b), _(b);
  }, [_]), [U, f] = F(null);
  return de(() => {
    var R;
    if (!e || !s || !d.current) return;
    const b = d.current, T = b.offsetWidth, M = b.offsetHeight, S = (R = a == null ? void 0 : a.current) == null ? void 0 : R.getBoundingClientRect(), j = S ? S.right : (c == null ? void 0 : c.innerWidth) ?? 0, $ = S ? S.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, B = S ? S.left : 0, w = S ? S.top : 0;
    let x = Math.max(w + ke, y.current.top), V = Math.max(B + ke, y.current.left);
    V + T > j && (V = j - T - ke), x + M > $ && (x = Math.max(w + ke, $ - M - ke)), f({ left: V, top: x });
  }, [e, s, t, n, a]), e ? /* @__PURE__ */ C(Z.Root, { open: e, onOpenChange: (b) => {
    b || r();
  }, modal: !1, children: [
    /* @__PURE__ */ o(Z.Trigger, { asChild: !0, children: /* @__PURE__ */ o("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ o(Z.Portal, { children: /* @__PURE__ */ o(it.Provider, { value: "light", children: /* @__PURE__ */ o(st.Provider, { value: { chain: p, setChain: h, morph: u, keyboardOpened: g, setKeyboardOpened: N }, children: /* @__PURE__ */ o(Oe.Provider, { value: E, children: /* @__PURE__ */ o(
      Z.Content,
      {
        ref: X,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Ln} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (U == null ? void 0 : U.left) ?? y.current.left, top: (U == null ? void 0 : U.top) ?? y.current.top, touchAction: "manipulation" },
        onPointerLeave: E.pointerLeave,
        children: i
      }
    ) }) }) }) })
  ] }) : null;
}, to = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: i = !1, trailing: a, children: u }) => {
  const d = ct(), c = m(d);
  c.current = d;
  const s = m(null);
  J(() => {
    var g;
    const h = { label: At(u), activate: () => {
      r || e();
    } };
    return s.current = h, (g = c.current) == null ? void 0 : g.register(h);
  }, []);
  const l = d && s.current ? d.items.indexOf(s.current) : -1, p = !r && l >= 0 && l === d.highlightedIndex;
  return /* @__PURE__ */ C(
    Z.Item,
    {
      "data-ei": l >= 0 ? l : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && d && l >= 0 && d.setHighlighted(l, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${Pn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${i ? "ui-item-selected" : ""} ${p ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: u }),
        a && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: a })
      ]
    }
  );
}, no = () => /* @__PURE__ */ o(Z.Separator, { className: "ui-sep my-1" }), ro = (e) => /* @__PURE__ */ o(Sn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" });
function An({ checked: e, onChange: t, disabled: n = !1, label: r, id: i, className: a = "", labelClassName: u = "", theme: d, variant: c = "pill", tone: s = "accent", block: l = !1 }) {
  const p = c !== "plain", h = D ? "w-5 h-5" : "w-4 h-4", g = D ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", N = D ? "w-3.5 h-3.5" : "w-3 h-3", E = D ? "text-sm" : "text-xs";
  return /* @__PURE__ */ C(
    "label",
    {
      className: `ui-checkbox ${p ? `ui-checkbox-pill ${D ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${s === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${a}`,
      style: { display: l ? "flex" : "inline-flex", alignItems: "center", gap: D ? 10 : 8 },
      onClick: (P) => P.stopPropagation(),
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: e,
            disabled: n,
            onChange: (P) => t(P.target.checked),
            className: "sr-only"
          }
        ),
        p ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ C("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${g}`, "aria-hidden": !0, children: e && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: N, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${E} ${u}`, children: r })
      ]
    }
  );
}
const In = D ? "p-6" : "p-5", On = D ? "text-base" : "text-sm", _n = D ? "w-5 h-5" : "w-4 h-4", Hn = D ? "text-sm" : "text-xs", Bn = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", gt = D ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", bt = D ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", xt = D ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", Re = D ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", It = Ce(null);
function oo() {
  const e = Ee(It);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function io({ children: e }) {
  const [t, n] = F(null), [r, i] = F(!1), a = ve(), u = me(), d = m(u);
  d.current = u;
  const c = m(null), s = m(null), [l, p] = F(null), h = m(null), [g, N] = F(null), E = m(null), y = h.current !== null;
  E.current, J(() => {
    t || (p(null), N(null));
  }, [t]);
  const P = G(() => {
    const w = s.current;
    if (!w) return null;
    const x = w.getBoundingClientRect();
    return { left: x.left, top: x.top, width: x.width, height: x.height };
  }, []), _ = G((w) => {
    if (w.target.closest("button")) return;
    const x = P();
    x && (p(x), N({ w: x.width, h: x.height }), h.current = { startX: w.clientX, startY: w.clientY, posX: x.left, posY: x.top }, w.target.setPointerCapture(w.pointerId));
  }, [P]), I = G((w) => {
    const x = h.current;
    x && (w.preventDefault(), p({ left: x.posX + w.clientX - x.startX, top: x.posY + w.clientY - x.startY }));
  }, []), O = G(() => {
    h.current = null;
  }, []), z = G((w) => (x) => {
    x.stopPropagation();
    const V = P();
    V && (p(V), N({ w: V.width, h: V.height }), E.current = { dir: w, startX: x.clientX, startY: x.clientY, startL: V.left, startT: V.top, startW: V.width, startH: V.height }, x.target.setPointerCapture(x.pointerId));
  }, [P]), H = 200, X = 100, U = 32, f = G((w) => {
    const x = E.current;
    if (!x) return;
    w.preventDefault();
    const V = w.clientX - x.startX, R = w.clientY - x.startY;
    let A = x.startW, L = x.startH, k = x.startL, Q = x.startT;
    x.dir.includes("e") && (A = x.startW + V), x.dir.includes("w") && (A = x.startW - V, k = x.startL + V), x.dir.includes("s") && (L = x.startH + R), x.dir.includes("n") && (L = x.startH - R, Q = x.startT + R);
    const ue = d.current;
    if (!ue) return;
    const K = ue.innerWidth, te = ue.innerHeight;
    A = Math.max(H, Math.min(A, K - U * 2)), L = Math.max(X, Math.min(L, te - U * 2)), x.dir.includes("w") && (k = Math.max(U, Math.min(k, K - A - U))), x.dir.includes("n") && (Q = Math.max(U, Math.min(Q, te - L - U))), N({ w: A, h: L }), p({ left: k, top: Q });
  }, []), b = G(() => {
    E.current = null;
  }, []), T = G(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]), M = G((w) => {
    if (w.suppressKey) {
      const x = localStorage.getItem(w.suppressKey);
      if (x && Date.now() < parseInt(x, 10))
        return Promise.resolve(!0);
    }
    return new Promise((x) => {
      i(!1), n({ kind: "confirm", options: w, resolve: x });
    });
  }, []), S = G((w) => new Promise((x) => {
    n({ kind: "prompt", options: w, resolve: x });
  }), []), j = G((w) => new Promise((x) => {
    n({ kind: "alert", options: w, resolve: x });
  }), []);
  J(() => {
    if (t) {
      const w = setTimeout(() => {
        var x;
        return (x = c.current) == null ? void 0 : x.focus();
      }, 50);
      return () => clearTimeout(w);
    }
  }, [t]);
  const $ = () => {
    var w, x;
    !t || t.kind !== "prompt" || (t.resolve(((x = (w = c.current) == null ? void 0 : w.value) == null ? void 0 : x.trim()) || null), n(null));
  }, B = t !== null;
  return /* @__PURE__ */ C(It.Provider, { value: { confirm: M, prompt: S, alert: j }, children: [
    e,
    /* @__PURE__ */ o(se.Root, { open: B, onOpenChange: (w) => {
      w || T();
    }, modal: !0, children: /* @__PURE__ */ C(se.Portal, { container: a ?? void 0, children: [
      /* @__PURE__ */ o(se.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ C(
        se.Content,
        {
          ref: s,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${In} space-y-4 focus:outline-none ${l || g ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${g ? "" : "w-full max-w-sm"}`,
          style: { ...l ? { left: l.left, top: l.top } : {}, ...g ? { width: g.w, height: g.h } : {} },
          onEscapeKeyDown: (w) => {
            T(), w.preventDefault();
          },
          onPointerDownOutside: (w) => {
            T(), w.preventDefault();
          },
          onKeyDown: (w) => {
            if (w.key === "Enter") {
              if ((t == null ? void 0 : t.kind) === "prompt" && w.target instanceof HTMLInputElement || (w.preventDefault(), !t)) return;
              t.kind === "confirm" ? (t.resolve(!0), n(null)) : t.kind === "prompt" ? $() : (t.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ C(
              "div",
              {
                className: `flex items-center justify-between ${y ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: _,
                onPointerMove: I,
                onPointerUp: O,
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
                onKeyDown: (w) => {
                  w.key === "Enter" && $();
                },
                className: `w-full ${Bn} ui-input`
              }
            ),
            /* @__PURE__ */ C("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
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
            /* @__PURE__ */ C("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ o("div", { className: `absolute ${bt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: z("n"), onPointerMove: f, onPointerUp: b }),
              /* @__PURE__ */ o("div", { className: `absolute ${bt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: z("s"), onPointerMove: f, onPointerUp: b }),
              /* @__PURE__ */ o("div", { className: `absolute ${xt} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: z("w"), onPointerMove: f, onPointerUp: b }),
              /* @__PURE__ */ o("div", { className: `absolute ${xt} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: z("e"), onPointerMove: f, onPointerUp: b }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 left-0 ${Re} cursor-nw-resize pointer-events-auto`, onPointerDown: z("nw"), onPointerMove: f, onPointerUp: b }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 right-0 ${Re} cursor-ne-resize pointer-events-auto`, onPointerDown: z("ne"), onPointerMove: f, onPointerUp: b }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 left-0 ${Re} cursor-sw-resize pointer-events-auto`, onPointerDown: z("sw"), onPointerMove: f, onPointerUp: b }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 right-0 ${Re} cursor-se-resize pointer-events-auto`, onPointerDown: z("se"), onPointerMove: f, onPointerUp: b })
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
  const i = ++e.current, a = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = _t(a, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
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
function wt(e, t, n) {
  const r = ++e.current, i = t.getBoundingClientRect(), a = 1 - Se, u = { left: i.left + i.width * a / 2, top: i.top + i.height * a / 2, width: i.width * Se, height: i.height * Se };
  t.style.transition = `transform ${fe}ms ${ze}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = _t(i, u), t.style.opacity = "0", window.setTimeout(() => {
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
  width: i,
  footer: a,
  children: u,
  onReset: d,
  morph: c = !0
}) {
  const s = m(null), l = m(null), p = m(null), [h, g] = F(!1), N = G((v) => {
    s.current = v, g(v !== null);
  }, []), E = ve(), y = me(), P = m(y);
  P.current = y;
  const [_, I] = F(null), O = m(null), z = m(!1), H = m(!1), [X, U] = F(!1), f = m(0), b = m(!1), [T, M] = F(!1), S = m(c);
  S.current = c;
  const j = m(!1), $ = m(!1), B = () => {
    $.current = !0, U(!0);
  }, w = () => {
    $.current = !1, U(!1);
  };
  J(() => {
    e || (I(null), H.current = !1, z.current = !1);
  }, [e]), de(() => {
    var ne, q;
    if (!e || H.current || !h || !s.current) return;
    H.current = !0;
    const v = s.current.getBoundingClientRect(), W = ((ne = P.current) == null ? void 0 : ne.innerWidth) ?? 0, Y = ((q = P.current) == null ? void 0 : q.innerHeight) ?? 0;
    I({
      left: Math.max(ce, Math.min((W - v.width) / 2, W - v.width - ce)),
      top: Math.max(ce, Math.min((Y - v.height) / 2, Y - v.height - ce))
    });
  }, [e, h]), de(() => {
    if (!e || !h || !c || Ne() || !s.current) return;
    const v = s.current, W = Be(v), Y = W[W.length - 1];
    B(), Y ? yt(f, v, Y.getBoundingClientRect(), w) : Wn(f, v, w);
  }, [e, h]);
  const x = G(() => {
    if (b.current) return;
    const v = s.current, W = !!v && Be(v).length > 0;
    if (!v || !c || Ne() || W) {
      t();
      return;
    }
    b.current = !0, M(!0), j.current = !0, B(), wt(f, v, () => {
      b.current = !1, M(!1), w(), t();
    });
  }, [c, t]);
  de(() => () => {
    const v = s.current;
    if (!v || j.current || !S.current || Ne() || Be(v).length > 0) return;
    const W = v.ownerDocument, Y = v.cloneNode(!0);
    Y.removeAttribute("data-modal-stack"), Y.removeAttribute("data-state"), Y.removeAttribute("role"), Y.removeAttribute("data-aria-hidden"), Y.removeAttribute("tabindex"), Y.setAttribute("aria-hidden", "true"), Y.style.pointerEvents = "none", W.body.appendChild(Y), wt({ current: 0 }, Y, () => {
      Y.isConnected && Y.remove();
    });
  }, []), J(() => {
    if (!e || !h || !c || !s.current) return;
    const v = s.current, W = v.parentNode;
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
    if (!h || !c || Ne() || !s.current) return;
    const v = s.current;
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
      if (O.current || b.current || We(v).length > 0) {
        W = q;
        return;
      }
      if ($.current) return;
      const ee = W;
      W = q, B();
      const oe = v.getBoundingClientRect(), re = !z.current, ae = ((ht = P.current) == null ? void 0 : ht.innerHeight) ?? 0, be = re ? (ae - ee) / 2 : oe.top, ft = re ? (ae - q) / 2 : oe.top;
      v.style.transition = "none", v.style.height = `${ee}px`, re && (v.style.top = `${be}px`), l.current && (l.current.style.overflow = "hidden"), v.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          v.style.height === `${ee}px` && (v.style.transition = `height ${fe}ms ${ze}${re ? `, top ${fe}ms ${ze}` : ""}`, v.style.height = `${q}px`, re && (v.style.top = `${ft}px`), window.setTimeout(() => {
            v.style.height === `${q}px` && (v.style.transition = "", v.style.height = "", l.current && (l.current.style.overflow = ""), re && I({ left: oe.left, top: ft }), w());
          }, fe + 60));
        });
      });
    });
    return ne.observe(v), () => ne.disconnect();
  }, [h]);
  const V = G(() => {
    const v = s.current;
    if (!v) return null;
    const W = v.getBoundingClientRect();
    return { left: W.left, top: W.top, width: W.width, height: W.height };
  }, []), R = G((v, W) => {
    var re, ae;
    const Y = ((re = P.current) == null ? void 0 : re.innerWidth) ?? 0, ne = ((ae = P.current) == null ? void 0 : ae.innerHeight) ?? 0, q = V(), ee = q ? q.width : Math.min(Y - ce * 2, 576), oe = q ? q.height : Math.min(ne - ce * 2, 400);
    return {
      left: Math.max(ce, Math.min(v, Y - ee - ce)),
      top: Math.max(ce, Math.min(W, ne - oe - ce))
    };
  }, [V]), A = G((v) => {
    if (v.target.closest("button")) return;
    z.current = !0;
    const W = V();
    W && (I(R(W.left, W.top)), O.current = { startX: v.clientX, startY: v.clientY, posX: W.left, posY: W.top }, v.target.setPointerCapture(v.pointerId));
  }, [V, R]), L = G((v) => {
    const W = O.current;
    W && (v.preventDefault(), I(R(W.posX + v.clientX - W.startX, W.posY + v.clientY - W.startY)));
  }, [R]), k = G(() => {
    O.current = null;
  }, []), Q = O.current !== null, ue = _ !== null, K = ue ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", te = `${i ? `${i} w-full` : "max-w-xl w-full"}`, ie = {
    ...ue ? { left: _.left, top: _.top } : {},
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
    v || x();
  }, children: /* @__PURE__ */ C(se.Portal, { container: E ?? void 0, children: [
    /* @__PURE__ */ o(
      se.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${T ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (v) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (v.preventDefault(), x());
        }
      }
    ),
    /* @__PURE__ */ C(
      se.Content,
      {
        ref: N,
        onKeyDown: ge,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${K} ${te}`,
        style: { touchAction: "manipulation", ...Object.keys(ie).length > 0 ? ie : {} },
        children: [
          /* @__PURE__ */ C(
            "div",
            {
              className: `flex items-center justify-between ${Kn} ${Yn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${Q ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (v) => {
                X || A(v);
              },
              onPointerMove: L,
              onPointerUp: k,
              children: [
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(se.Title, { className: `${Fn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
                  d && /* @__PURE__ */ C("button", { onClick: d, className: `flex items-center gap-1 ${Xn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Gn} shrink-0`, children: [
                    /* @__PURE__ */ o(Tt, { className: qn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ o(se.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(Ze, { className: Un }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: l, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: u }),
          a && /* @__PURE__ */ o("div", { ref: p, className: "shrink-0", children: a })
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
  const i = performance.now(), a = (u) => {
    const d = u - i, c = Math.min(d / t, 1);
    n.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(a);
  };
  requestAnimationFrame(a);
}
function tr({ x: e, y: t, ms: n }) {
  const r = m(null), i = ve();
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
        children: /* @__PURE__ */ C("svg", { ref: r, width: le, height: le, viewBox: `0 0 ${le} ${le}`, children: [
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
  onLongPress: a
}) {
  const [u, d] = F(null), c = yn(), s = m(null), l = m(null), p = m({ x: 0, y: 0, target: null }), h = m(!1), g = Math.min(Jn, n * 0.5), N = m(i);
  N.current = i;
  const E = m(a);
  return E.current = a, J(() => {
    if (!D || !c) return;
    const y = (O) => {
      if (!Xe(O.pointerType) || O.button !== 0) return;
      const z = O.target;
      if (!z.closest(r) || (N.current ? !N.current(z) : nr(z))) return;
      const H = O.clientX, X = O.clientY;
      p.current = { x: H, y: X, target: O.target }, h.current = !0, t && (l.current = setTimeout(() => d({ x: H, y: X }), g)), s.current = setTimeout(() => {
        if (!h.current) return;
        l.current && (clearTimeout(l.current), l.current = null), d(null);
        const U = p.current.target;
        if (!U) return;
        const f = E.current;
        if (f) {
          f(U, H, X);
          return;
        }
        const b = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: H,
          clientY: X,
          button: 2,
          view: window
        });
        U.dispatchEvent(b);
      }, n);
    }, P = (O) => {
      if (!h.current || s.current === null) return;
      const z = O.clientX - p.current.x, H = O.clientY - p.current.y;
      Math.sqrt(z * z + H * H) > Qn && (clearTimeout(s.current), s.current = null, l.current && (clearTimeout(l.current), l.current = null), h.current = !1, d(null));
    }, _ = () => {
      s.current !== null && (clearTimeout(s.current), s.current = null), l.current !== null && (clearTimeout(l.current), l.current = null), h.current = !1, d(null);
    }, I = (O) => {
      Xe(O.pointerType) && (s.current !== null && (clearTimeout(s.current), s.current = null), l.current !== null && (clearTimeout(l.current), l.current = null), h.current = !1, d(null));
    };
    return c == null || c.addEventListener("pointerdown", y), c.addEventListener("pointermove", P), c.addEventListener("pointerup", _), c.addEventListener("pointercancel", _), c.addEventListener("pointerleave", I), () => {
      c.removeEventListener("pointerdown", y), c.removeEventListener("pointermove", P), c.removeEventListener("pointerup", _), c == null || c.removeEventListener("pointercancel", _), c == null || c.removeEventListener("pointerleave", I), s.current !== null && clearTimeout(s.current), l.current !== null && clearTimeout(l.current);
    };
  }, [t, n, g, r]), /* @__PURE__ */ C(he, { children: [
    e,
    t && u && /* @__PURE__ */ o(tr, { x: u.x, y: u.y, ms: n - g })
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
  type: i = "button",
  ...a
}) {
  const u = a["data-state"] === "open", d = or[t][e];
  let c = `${d.base} ${u ? d.open : ""}`;
  return e === "primary" && t === "light" && n && (c = u ? `${kt} ${ir}` : kt), /* @__PURE__ */ o("button", { type: i, className: `${rr} ${c} ${r}`, ...a });
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
  const a = /* @__PURE__ */ new Date(), [u, d] = F(a.getFullYear()), [c, s] = F(a.getMonth()), [l, p] = F("days"), [h, g] = F(null), N = Le(() => new Set(e), [e]), E = ($) => {
    N.has($) ? t(e.filter((B) => B !== $)) : t([...e, $]);
  }, y = Le(() => {
    const $ = ur(u, c), B = new Date(u, c, 1).getDay(), w = [];
    for (let x = 0; x < B; x++) w.push({ key: `pad-${x}`, day: 0, empty: !0 });
    for (let x = 1; x <= $; x++) w.push({ key: dr(u, c, x), day: x, empty: !1 });
    return w;
  }, [u, c]), P = ($) => d((B) => Math.max(Ke, Math.min(Ye, B + $))), _ = ($) => {
    c + $ < 0 ? (d((B) => Math.max(Ke, B - 1)), s(11)) : c + $ > 11 ? (d((B) => Math.min(Ye, B + 1)), s(0)) : s((B) => B + $);
  }, I = () => {
    if (h === null) return;
    const $ = parseInt(h, 10);
    !isNaN($) && $ >= Ke && $ <= Ye && d($), g(null);
  }, O = ($) => e.some((B) => B.startsWith(`${u}-${String($ + 1).padStart(2, "0")}`)), z = n === "dark", H = D ? "p-2" : "p-1", X = D ? "w-5 h-5" : "w-4 h-4", U = D ? "text-[11px] py-2" : "text-[10px] py-1.5", f = D ? "py-2.5 text-sm" : "py-1.5 text-xs", b = D ? "py-3 text-sm" : "py-2 text-xs", T = D ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", M = D ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${z ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${z ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, S = z ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", j = z ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ C("div", { className: `border rounded-lg overflow-hidden w-full ${z ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ C("div", { className: `flex items-center justify-between px-3 py-2 border-b ${z ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => l === "months" ? P(-1) : _(-1),
          className: `${H} rounded transition-colors ${z ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": l === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ o(qt, { className: X })
        }
      ),
      l === "days" ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => p("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${z ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(u, c).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ o(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: h ?? String(u),
          onChange: ($) => g($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: I,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), I()), $.key === "Escape" && g(null);
          },
          className: M
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => l === "months" ? P(1) : _(1),
          className: `${H} rounded transition-colors ${z ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": l === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ o(Ue, { className: X })
        }
      )
    ] }),
    l === "months" ? /* @__PURE__ */ C("div", { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 text-center", children: ar.map(($, B) => /* @__PURE__ */ C(
        "button",
        {
          type: "button",
          onClick: () => {
            s(B), p("days");
          },
          className: `${b} relative font-medium transition-colors border-b ${B === c ? S : j} ${z ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            $,
            O(B) && /* @__PURE__ */ o("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${B === c ? "bg-white" : z ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ o("div", { className: `text-center border-t ${z ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            d(a.getFullYear()), s(a.getMonth()), p("days");
          },
          className: `px-3 ${D ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${z ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ C("div", { className: "grid grid-cols-7 text-center", children: [
      lr.map(($) => /* @__PURE__ */ o("div", { className: `${U} font-semibold uppercase tracking-wider border-b ${z ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: $ }, $)),
      y.map(($) => $.empty ? /* @__PURE__ */ o("div", {}, $.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => E($.key),
          className: `${f} font-medium transition-colors border-b ${z ? "border-zinc-800/60" : "border-zinc-50"} ${N.has($.key) ? S : z ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ C("div", { className: `px-3 py-2 border-t ${z ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ C("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: e.map(($) => {
        const B = /* @__PURE__ */ new Date($ + "T00:00:00"), w = B.getFullYear() === a.getFullYear() ? B.toLocaleString("default", { month: "short", day: "numeric" }) : B.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ C(
          "button",
          {
            type: "button",
            onClick: () => E($),
            "aria-label": `Remove ${w}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${z ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${T}`,
            children: [
              w,
              /* @__PURE__ */ o("span", { className: `leading-none ${z ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
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
  allSelected: a = !1,
  toggleAllLabel: u,
  emptyHint: d = "Nothing here",
  maxHeight: c,
  disabled: s = !1,
  theme: l,
  className: p = ""
}) {
  const h = (y) => t instanceof Set ? t.has(y) : t.includes(y), g = D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", N = D ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", E = r != null || i != null;
  return /* @__PURE__ */ C("div", { className: p, ...l ? { "data-theme": l } : {}, children: [
    E && /* @__PURE__ */ C("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ o("button", { type: "button", disabled: s, onClick: i, className: "ui-checklist-toggleall", children: u ?? (a ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${s ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((y) => {
            const P = h(y.id);
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: s,
                onClick: () => n(y.id),
                className: `ui-checklist-item ${g} ${P ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${N}`, "aria-hidden": !0, children: P && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  y.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: y.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: y.label }),
                  y.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: y.secondary })
                ]
              },
              y.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: d })
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
  maxHeight: a,
  compact: u = !1,
  disabled: d = !1,
  theme: c,
  className: s = ""
}) {
  const l = u ? "px-2.5 py-1.5 text-xs" : D ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = u ? "w-3.5 h-3.5" : D ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ C("div", { className: s, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ C(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          e.map((h) => {
            const g = t === h.id;
            return /* @__PURE__ */ C(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(h.id),
                className: `ui-checklist-item ${l} ${g ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${p}`, "aria-hidden": !0, children: g && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
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
  offset: a = 8
}) => {
  const u = me(), { refs: d, floatingStyles: c } = Qt({
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
        fn: (s) => {
          var _;
          if (i !== "visible") return {};
          const l = (_ = s.elements.floating.ownerDocument) == null ? void 0 : _.defaultView;
          if (!l) return {};
          const p = s.rects.reference, h = Math.max(p.x, 0), g = Math.max(p.y, 0), N = Math.min(p.x + p.width, l.innerWidth), E = Math.min(p.y + p.height, l.innerHeight);
          if (N <= h || E <= g) return {};
          const y = r === "left" ? N - (p.x + p.width) : r === "right" ? h - p.x : 0, P = r === "top" ? g - p.y : r === "bottom" ? E - (p.y + p.height) : 0;
          return { x: s.x + y, y: s.y + P };
        }
      },
      tn(a),
      nn({ padding: 8 }),
      rn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (s) => {
          var E;
          const l = (E = s.elements.floating.ownerDocument) == null ? void 0 : E.defaultView;
          if (!l) return {};
          const p = s.rects.floating.width, h = s.rects.floating.height, g = Math.max(8, Math.min(s.x, l.innerWidth - p - 8)), N = Math.max(8, Math.min(s.y, l.innerHeight - h - 8));
          return { x: g, y: N };
        }
      }
    ],
    whileElementsMounted: en
  });
  return de(() => {
    n && d.setReference(n);
  }, [n, d]), /* @__PURE__ */ C(he, { children: [
    !n && /* @__PURE__ */ o("div", { ref: d.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    u && Je(
      /* @__PURE__ */ o(
        "div",
        {
          ref: d.setFloating,
          className: `ui-chrome ${e}`,
          style: c,
          onMouseDown: (s) => s.stopPropagation(),
          onClick: (s) => s.stopPropagation(),
          onDragStart: (s) => s.preventDefault(),
          children: t
        }
      ),
      u.document.body
    )
  ] });
}, $e = ({ content: e, children: t }) => {
  const n = ve(), r = me(), [i, a] = F(!1), [u, d] = F({ x: 0, y: 0 }), c = m(null), s = () => {
    if (!c.current) return;
    const l = c.current.getBoundingClientRect();
    d({ x: l.left + l.width / 2, y: l.top });
  };
  return J(() => (i && r && (s(), r.addEventListener("scroll", s, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", s, !0)), [i]), /* @__PURE__ */ C(
    "div",
    {
      ref: c,
      className: "inline-flex",
      onMouseEnter: () => {
        s(), a(!0);
      },
      onMouseLeave: () => a(!1),
      children: [
        t,
        i && Je(
          /* @__PURE__ */ C(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: u.x, top: u.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((l, p) => /* @__PURE__ */ o("div", { className: p > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: l }, p)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, xo = D ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", je = D ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", De = D ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", fr = "hover:bg-red-950/50", Ht = D ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Bt = "bg-blue-900/50 border-blue-700 text-blue-300", Wt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", hr = D ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", yo = D ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Pe = D ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", pr = "inline-flex rounded overflow-hidden border border-zinc-700", Kt = D ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Me = ({ onClick: e, disabled: t, title: n, className: r = je, children: i }) => /* @__PURE__ */ o($e, { content: n, children: /* @__PURE__ */ o("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), wo = ({ value: e, options: t, onChange: n, disabled: r, active: i }) => /* @__PURE__ */ o("div", { className: pr, children: t.map((a) => {
  const u = i ? i(a.v) : e === a.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(a.v),
      className: `${D ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${u ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${a.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: a.l
    },
    a.v
  );
}) }), vo = ({ children: e }) => /* @__PURE__ */ C("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: D ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), mr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", gr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", ko = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ C("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ o("span", { className: n ? mr : gr, children: e }),
  t
] }), No = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ C("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), $o = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: i }) => /* @__PURE__ */ C(he, { children: [
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
    const i = n.slice(0, r).trim().toLowerCase(), a = n.slice(r + 1).trim();
    xr.has(i) && a && t.push(`${i}: ${a}`);
  }
  return t.join("; ");
}
function Ve(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const d = document.createDocumentFragment();
    for (const c of Array.from(t.childNodes)) d.appendChild(Ve(c));
    return d;
  };
  if (!br.has(n)) return r();
  if (n === "a") {
    const d = t.getAttribute("href") || "";
    if (!yr.test(d)) return r();
  }
  const i = document.createElement(n), a = t.getAttribute("style"), u = wr(a || "");
  if (u && i.setAttribute("style", u), n === "a") {
    i.setAttribute("href", t.getAttribute("href"));
    const d = t.getAttribute("target"), c = t.getAttribute("rel");
    d && i.setAttribute("target", d), c && i.setAttribute("rel", c);
  }
  for (const d of Array.from(t.childNodes)) i.appendChild(Ve(d));
  return i;
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
  for (const u of Array.from(n.content.childNodes)) r.appendChild(Ve(u));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
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
const kr = { text: "#52525b" }, Nr = ({ node: e, selected: t, extension: n, editor: r, view: i, getPos: a }) => {
  var p;
  const u = e.attrs.field ?? "", d = n.options, c = ((p = d.resolve) == null ? void 0 : p.call(d, u)) ?? null, s = (c == null ? void 0 : c.color) ?? kr, l = (c == null ? void 0 : c.label) ?? `{{${u}}}`;
  return /* @__PURE__ */ o(
    cn,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: s.text,
        color: "#fff",
        borderRadius: 2,
        padding: 4,
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      onMouseDown: (h) => {
        var y;
        if (h.button !== 0 || !r.isEditable) return;
        h.preventDefault(), r.isFocused || r.commands.focus();
        const g = typeof a == "function" ? a() : null;
        if (g == null) return;
        const N = i.state.doc.resolve(g), E = N.nodeAfter;
        E && Ae.isSelectable(E) && i.dispatch(i.state.tr.setSelection(new Ae(N))), (y = d.onTokenClick) == null || y.call(d, u, h.currentTarget.getBoundingClientRect(), g);
      },
      children: l
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
}), Cr = 240, Er = 280, Tr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = m(null);
  return J(() => {
    var a;
    const i = (a = r.current) == null ? void 0 : a.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Er, maxHeight: Cr, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: e.items.map((i, a) => /* @__PURE__ */ C(
    "button",
    {
      type: "button",
      "data-ac-active": a === t ? "1" : void 0,
      onMouseEnter: () => n(a),
      onClick: () => e.command({ field: i.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${a === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ o("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: i.color.text } }),
        /* @__PURE__ */ o("span", { className: "truncate flex-1", children: i.label }),
        i.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] text-zinc-600", children: i.group })
      ]
    },
    i.key
  )) }) });
}, Rr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ o(Tr, { props: n, highlight: r, onHighlight: (i) => {
      e.highlight = i, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const i = bn(r);
      e = { holder: r, root: i, unmount: null, props: n, highlight: 0 };
      const a = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: u, y: d, placement: c }) => {
          var p, h;
          if (!e) return;
          const s = (h = (p = e.props) == null ? void 0 : p.clientRect) == null ? void 0 : h.call(p), l = s && !c.endsWith("-end") ? s.width : 0;
          r.style.left = `${u + l}px`, r.style.top = `${d}px`;
        }
      });
      e.unmount = a, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var u;
      if (!(e != null && e.props)) return !1;
      const { items: r, command: i } = e.props;
      if (r.length === 0) return !1;
      const a = n.key;
      return a === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, r.length - 1), t(e.props), !0) : a === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : a === "Enter" || a === "Tab" ? (n.preventDefault(), i({ field: ((u = r[e.highlight]) == null ? void 0 : u.key) ?? r[0].key }), !0) : !1;
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
  className: i,
  onStateChange: a,
  resolveToken: u,
  suggestionItems: d,
  onTokenClick: c,
  onSelectionChange: s
}, l) => {
  const p = m(u);
  p.current = u;
  const h = m(d);
  h.current = d;
  const g = m(c);
  g.current = c;
  const N = m(s);
  N.current = s;
  const E = m(null), y = m(null), P = m(t);
  P.current = t;
  const _ = m(r);
  _.current = r;
  const I = m(a);
  I.current = a;
  const O = m(null), z = (b) => {
    var S;
    const T = {
      bold: b.isActive("bold"),
      italic: b.isActive("italic"),
      underline: b.isActive("underline"),
      strike: b.isActive("strike"),
      link: b.isActive("link"),
      color: b.getAttributes("textStyle").color || ""
    }, M = O.current;
    M && M.bold === T.bold && M.italic === T.italic && M.underline === T.underline && M.strike === T.strike && M.link === T.link && M.color === T.color || (O.current = T, (S = I.current) == null || S.call(I, T));
  }, H = (b) => {
    var $;
    const T = b.state.selection;
    let M = null;
    T instanceof Ae && T.node.type.name === "token" ? (M = { key: T.node.attrs.field ?? "", pos: T.from }, E.current = T.from) : E.current != null && (E.current = b.state.tr.mapping.map(E.current));
    const S = y.current, j = S && M && S.key === M.key && S.pos === M.pos;
    !S && !M || j || (y.current = M, ($ = N.current) == null || $.call(N, M));
  }, X = (b) => {
    const T = vr($r(b));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(T) ? "" : T;
  }, U = pe.useMemo(() => {
    const b = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: T }) => {
        var M;
        return ((M = h.current) == null ? void 0 : M.call(h, T)) ?? [];
      },
      command: ({ editor: T, range: M, props: S }) => {
        T.chain().focus().insertContentAt(M, { type: "token", attrs: { field: S.field } }).run();
      },
      render: Rr
    };
    return zr.configure({
      resolve: p.current ?? null,
      suggestion: b,
      onTokenClick: (T, M, S) => {
        var j;
        E.current = S, (j = g.current) == null || j.call(g, T, M, S);
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
    onUpdate: ({ editor: b }) => {
      P.current(X(b.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: b }) => {
      z(b), H(b);
    }
  });
  return J(() => {
    if (!f || f.isFocused) return;
    X(f.getHTML()) !== e && (O.current = null, f.commands.setContent(Nt(e || ""), { emitUpdate: !1 }), z(f));
  }, [e, f]), J(() => {
    f && f.setEditable(!r);
  }, [r, f]), J(() => {
    f && (O.current = null, z(f), H(f));
  }, [f]), Ft(l, () => ({
    exec: (b, T) => {
      if (!(!f || _.current))
        switch (b) {
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
            T && f.chain().focus().setColor(T).run();
            break;
          case "unsetColor":
            f.chain().focus().unsetColor().run();
            break;
          case "link":
            T && f.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
            break;
          case "unlink":
            f.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => f == null ? void 0 : f.commands.focus(),
    insertToken: (b) => {
      !f || _.current || f.chain().focus().insertContent({ type: "token", attrs: { field: b } }).run();
    },
    replaceToken: (b) => {
      if (!f || _.current) return;
      const T = E.current;
      T != null && f.commands.command(({ tr: M }) => {
        const S = M.doc.nodeAt(T);
        if (!S || S.type.name !== "token") return !1;
        M.setNodeMarkup(T, void 0, { field: b });
        const j = M.doc.resolve(T);
        return j.nodeAfter && j.nodeAfter.type.name === "token" && M.setSelection(new Ae(j)), !0;
      });
    }
  }), [f]), /* @__PURE__ */ o(an, { editor: f, className: `richtext-editor ${i || ""}` });
});
Dr.displayName = "RichTextEditor";
const Mr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Sr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], $t = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), To = ({ value: e, disabled: t, onChange: n }) => {
  const [r, i] = F(!1);
  return /* @__PURE__ */ o(
    _e,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ C("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ o(Rt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Mr.map((a) => /* @__PURE__ */ o(Dn, { onClick: () => {
        n(a), i(!1);
      }, icon: a === e ? /* @__PURE__ */ o(Ct, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: a }, children: a }) }, a))
    }
  );
}, Pr = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, i] = F(!1), [a, u] = F(""), d = () => {
    var s;
    const c = a.trim();
    c && ((s = e.current) == null || s.exec("link", c), i(!1));
  };
  return /* @__PURE__ */ o(
    _e,
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
          className: `${Ht} ${n ? Bt : Wt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(Jt, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ C("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ o(
          "input",
          {
            value: a,
            onChange: (c) => u(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), d());
            },
            className: hr + " w-full"
          }
        ),
        /* @__PURE__ */ C("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: d, className: je, disabled: !a.trim(), children: "Apply" }),
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
}, Ro = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: i }) => {
  const [a, u] = F(!1), d = (l, p) => {
    var h;
    return (h = e.current) == null ? void 0 : h.exec(l, p);
  }, c = (l) => `${Ht} ${l ? Bt : Wt}`, s = (l) => !!(r != null && r[l]);
  return /* @__PURE__ */ C("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: t || s("bold"), onMouseDown: (l) => l.preventDefault(), onClick: () => d("bold"), className: `${c(((n == null ? void 0 : n.bold) ?? !1) || s("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: t || s("italic"), onMouseDown: (l) => l.preventDefault(), onClick: () => d("italic"), className: `${c(((n == null ? void 0 : n.italic) ?? !1) || s("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o($e, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: t, onMouseDown: (l) => l.preventDefault(), onClick: () => d("underline"), className: c((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Vt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o($e, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (l) => l.preventDefault(), onClick: () => d("strikeThrough"), className: c((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(Zt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(Pr, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(
      _e,
      {
        open: a,
        onOpenChange: u,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ C("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o($t, {}),
          /* @__PURE__ */ o(Rt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ C("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                d("unsetColor"), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o($t, { className: "w-3.5 h-3.5" })
            }
          ),
          Sr.map((l) => /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                d("foreColor", l), u(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${l === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: l },
              title: l
            },
            l
          ))
        ] })
      }
    ),
    i && /* @__PURE__ */ C(he, { children: [
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
  _e as DropdownMenu,
  Sn as DropdownSubmenu,
  it as DropdownThemeContext,
  Mr as FONTS,
  bo as FloatingChrome,
  To as FontMenu,
  Ro as FormatToolbar,
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
