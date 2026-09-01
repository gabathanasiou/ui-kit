"use client";
import { jsxs as N, jsx as i, Fragment as he } from "react/jsx-runtime";
import ge, { createContext as ze, useContext as Te, useState as W, useEffect as U, useRef as g, useCallback as V, useLayoutEffect as le, useMemo as Pe, useImperativeHandle as Yt } from "react";
import * as j from "@radix-ui/react-dropdown-menu";
import { Check as $t, X as Ue, Pencil as Ut, Copy as Ct, Trash2 as je, RotateCcw as zt, Plus as jt, ChevronRight as Xe, ChevronLeft as Xt, ArrowUp as Vt, ArrowDown as Gt, ChevronDown as Tt, Underline as Zt, Strikethrough as Jt, Link as Qt } from "lucide-react";
import * as fe from "@radix-ui/react-dialog";
import { createPortal as et } from "react-dom";
import { useFloating as en, autoUpdate as tn, offset as nn, flip as rn, shift as on } from "@floating-ui/react-dom";
import { mergeAttributes as sn, ReactNodeViewRenderer as cn, NodeViewWrapper as ln, useEditor as an, EditorContent as un } from "@tiptap/react";
import { NodeSelection as Oe } from "@tiptap/pm/state";
import dn from "@tiptap/starter-kit";
import fn from "@tiptap/extension-placeholder";
import { TextStyle as hn } from "@tiptap/extension-text-style";
import mn from "@tiptap/extension-color";
import pn from "@tiptap/extension-link";
import gn from "@tiptap/extension-underline";
import { Mention as bn } from "@tiptap/extension-mention";
import { createRoot as xn } from "react-dom/client";
const yn = ze(null);
function tt() {
  return Te(yn);
}
function Ee() {
  const e = tt();
  return e ? e.document.body : null;
}
function wn() {
  const e = tt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function we() {
  return tt() ?? (typeof window < "u" ? window : null);
}
const Re = typeof window < "u", T = Re && window.matchMedia("(pointer: coarse)").matches, vn = Re && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ve(e) {
  return e === "touch" || e === "pen";
}
let xe = null;
const Ge = /* @__PURE__ */ new Set();
Re && window.addEventListener("pointerdown", (e) => {
  xe = e.pointerType, Ge.forEach((t) => t());
}, !0);
function Jr() {
  return xe;
}
function kn() {
  const [, e] = W(0), t = g(xe);
  return U(() => {
    const n = () => {
      t.current !== xe && (t.current = xe, e((r) => r + 1));
    };
    return Ge.add(n), () => {
      Ge.delete(n);
    };
  }, []), xe;
}
const Et = ["(any-hover: hover)", "(any-pointer: fine)"];
function Rt() {
  return Re ? Et.some((e) => window.matchMedia(e).matches) : !1;
}
let Ie = Rt();
const Ze = /* @__PURE__ */ new Set();
function pt(e) {
  Ie !== e && (Ie = e, Ze.forEach((t) => t()));
}
var Nt;
if (Re) {
  const e = () => pt(Rt());
  for (const a of Et) {
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
  const o = "__penClick", c = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (a) => {
    a.pointerType !== "pen" || a.button !== 0 || (n = { x: a.clientX, y: a.clientY });
  }, !0), window.addEventListener("pointerup", (a) => {
    if (a.pointerType !== "pen") return;
    const f = n;
    if (n = null, !f || Math.hypot(a.clientX - f.x, a.clientY - f.y) > 8) return;
    const l = a.target;
    if (!l || !l.isConnected) return;
    if (l instanceof HTMLInputElement && c.has(l.type)) {
      try {
        l.showPicker();
      } catch {
      }
      return;
    }
    const h = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    h[o] = !0, r = { x: a.clientX, y: a.clientY, time: Date.now() }, l.dispatchEvent(h);
  }, !0), window.addEventListener("click", (a) => {
    a[o] || r && Date.now() - r.time < 1e3 && Math.hypot(a.clientX - r.x, a.clientY - r.y) < 12 && (a.preventDefault(), a.stopPropagation());
  }, !0);
}
function Qr() {
  return Ie;
}
function ei() {
  const [, e] = W(0);
  return U(() => {
    const t = () => e((n) => n + 1);
    return Ze.add(t), () => {
      Ze.delete(t);
    };
  }, []), Ie;
}
const ye = 220, nt = "cubic-bezier(0.32, 0.72, 0, 1)", rt = 170, it = 0.94;
function Be(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function St(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function Dt(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return St({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function Nn(e, t, n, r) {
  const o = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${it})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === o && requestAnimationFrame(() => {
      if (e.current !== o) return;
      const a = Dt(t, n);
      t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transition = `transform ${ye}ms ${nt}, opacity ${rt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === o && (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, r == null || r());
      }, ye + 60);
    });
  });
}
function $n(e, t, n, r) {
  const o = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, a = Dt(t, n);
  t.style.transition = `transform ${ye}ms ${nt}, opacity ${rt}ms ease`, t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transform = `scale(${it})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === o && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== o || t.isConnected || (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, t.style.pointerEvents = c.pointerEvents, t.style.visibility = c.visibility);
    }));
  }, ye + 60);
}
function Cn(e, t, n) {
  const r = e.cloneNode(!0), o = e.getBoundingClientRect(), c = o.width > 0 || o.height > 0 ? o : n ?? o;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${c.left}px`, r.style.top = `${c.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const a = (t == null ? void 0 : t()) ?? null, f = a ? St({ left: c.left, top: c.top, width: c.width, height: c.height }, a) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${f.x * 100}% ${f.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${ye}ms ${nt}, opacity ${rt}ms ease`, r.style.transform = `scale(${it})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, ye + 60));
    });
  });
}
function ot(e) {
  const t = g(null), [n, r] = W(!1), o = g(null), c = g(0), a = V((p) => {
    if (e.ref && (e.ref.current = p), p) {
      c.current = 0, t.current = p;
      const S = p.getBoundingClientRect();
      (S.width > 0 || S.height > 0) && (o.current = { left: S.left, top: S.top, width: S.width, height: S.height }), r(!0);
      return;
    }
    const y = t.current, v = ++c.current;
    queueMicrotask(() => {
      v === c.current && t.current === y && (t.current = null, r(!1), !(!y || !e.cloneOnUnmount || !l.current) && y.style.visibility !== "hidden" && Be(u.current) && Cn(y, s.current, o.current));
    });
  }, []), f = V(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const y = p.getBoundingClientRect();
    (y.width > 0 || y.height > 0) && (o.current = { left: y.left, top: y.top, width: y.width, height: y.height });
  }, []), l = g(e.visible);
  l.current = e.visible;
  const h = g(e.visible), s = g(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const d = g(e.onClosed);
  d.current = e.onClosed;
  const u = g(e.morph !== !1);
  u.current = e.morph !== !1;
  const b = g(0);
  return le(() => {
    if (!n || !l.current || !Be(u.current)) return;
    const p = t.current;
    p && Nn(b, p, s.current);
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
    if (!y || !Be(u.current)) {
      (v = d.current) == null || v.call(d);
      return;
    }
    $n(b, y, s.current, () => {
      var S;
      return (S = d.current) == null ? void 0 : S.call(d);
    });
  }, [e.visible]), U(() => {
    if (!n || !l.current) return;
    const p = (y) => {
      const v = t.current;
      v && v.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), a;
}
function ti(e, t) {
  const n = we(), r = g(n);
  r.current = n, le(() => {
    if (!t || !e.current) return;
    const o = e.current.querySelector(".absolute");
    if (!o) return;
    o.style.left = "", o.style.right = "", o.style.top = "", o.style.bottom = "", o.style.maxHeight = "";
    const c = r.current;
    if (!c) return;
    const a = e.current.getBoundingClientRect(), f = o.getBoundingClientRect(), l = c.innerWidth, h = c.innerHeight, s = f.right - l;
    if (s > 0) {
      const d = Math.min(s + 8, f.left);
      o.style.left = `${f.left - a.left - d}px`;
    }
    f.left < 0 && (o.style.left = `${-a.left + 4}px`), f.bottom > h + 4 && (o.style.top = "auto", o.style.bottom = "100%", o.getBoundingClientRect().top < 0 && (o.style.bottom = "auto", o.style.top = `${-a.top + 4}px`, o.style.maxHeight = `${h - 8}px`));
  }, [t, e]);
}
function zn(e, t, n, r) {
  const o = we(), c = g(o);
  c.current = o, le(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let f = 0;
    const l = () => {
      var E, q;
      f = 0;
      const u = a.getBoundingClientRect(), b = c.current;
      if (!b) return;
      const p = b.innerWidth, y = ((E = b.visualViewport) == null ? void 0 : E.height) ?? b.innerHeight, v = ((q = b.visualViewport) == null ? void 0 : q.offsetTop) ?? 0, S = (r == null ? void 0 : r.panelWidth) ?? Math.max(u.width, 200), _ = 4, A = 120;
      let P = Math.max(0, u.left);
      P + S > p && (P = Math.max(0, p - S - 8));
      const H = v + y - u.bottom - _ - 16, B = u.top - v - _ - 16;
      if (H >= A || H >= B) {
        const m = Math.min(u.bottom + _, v + y), w = Math.max(A, v + y - m - 16);
        n({ top: m, left: P, width: u.width, maxH: w });
      } else {
        const m = Math.max(A, Math.min(B, 360)), w = v + y - (u.top - _);
        n({ top: 0, left: P, width: u.width, maxH: m, bottom: Math.max(0, w) });
      }
    }, h = () => {
      f || (f = requestAnimationFrame(l));
    }, s = c.current ?? null, d = (s == null ? void 0 : s.document) ?? null;
    return h(), d == null || d.addEventListener("scroll", h, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", h), () => {
      f && cancelAnimationFrame(f), d == null || d.removeEventListener("scroll", h, { capture: !0 }), s == null || s.removeEventListener("resize", h);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let be = null;
function Mt(e) {
  return be == null || be(), be = e, () => {
    be === e && (be = null);
  };
}
const st = ze("dark"), At = () => Te(st), Tn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", gt = T ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", En = T ? "text-xs" : "text-[10px]";
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
    headerPad: gt,
    headerText: `${gt} font-semibold uppercase tracking-wider ${En} ui-label`,
    // Item padding
    itemPad: Tn,
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
function Pt(e) {
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
const ct = ze({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), _e = ze(null), lt = () => Te(_e);
function at() {
  const e = g([]), [t, n] = W(-1), [r, o] = W(!1), [c, a] = W(0), f = V((d) => (e.current = [...e.current, d], a((u) => u + 1), () => {
    e.current = e.current.filter((u) => u !== d), a((u) => u + 1);
  }), []), l = V((d, u) => {
    n(d), o(u === "pointer");
  }, []), h = V(() => {
    o((d) => d && (n(-1), !1));
  }, []);
  return Pe(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: f,
    setHighlighted: l,
    pointerLeave: h
  }), [t, r, c, f, l, h]);
}
function ut(e, t, n, r) {
  const o = g(-1);
  o.current = t.highlightedIndex;
  const c = g(t);
  c.current = t;
  const a = g(e);
  a.current = e;
  const f = g(r);
  f.current = r;
  const l = g({ text: "", time: 0 }), h = g(!1);
  h.current || (h.current = !0, n.current = (s) => {
    var u, b;
    if (!a.current) return;
    const d = c.current.items;
    if (d.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = s.key === "ArrowDown" ? 1 : -1, y = (o.current + p + d.length) % d.length;
        c.current.setHighlighted(y, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = o.current;
        p >= 0 && p < d.length && d[p].submenu && d[p].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (b = (u = f.current) == null ? void 0 : u.onCloseSub) == null || b.call(u);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = o.current;
        p >= 0 && p < d.length && d[p].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = Date.now(), y = (p - l.current.time > 500 ? "" : l.current.text) + s.key.toLowerCase();
        if (l.current = { text: y, time: p }, !y) return;
        const v = o.current + 1;
        for (let S = 0; S < d.length; S++) {
          const _ = (v + S) % d.length;
          if (d[_].label.toLowerCase().startsWith(y)) {
            c.current.setHighlighted(_, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function dt(e, t, n, r, o, c) {
  const a = g(t);
  a.current = t;
  const f = g(e);
  f.current = e;
  const l = g(o);
  l.current = o;
  const h = g(!1);
  h.current || (h.current = !0, c.current = (s) => {
    if (!f.current || l.current) return;
    const d = r.current;
    d && d.contains(s.target) || a.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function ft(e, t) {
  const n = g(e);
  n.current = e;
  const r = g(!1);
  r.current || (r.current = !0, t.current = (o) => {
    if (!n.current) return;
    const c = o.currentTarget;
    c.scrollHeight > c.clientHeight && (o.preventDefault(), c.scrollTop += o.deltaY);
  });
}
function He({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: o = "left",
  width: c,
  theme: a = "dark",
  children: f,
  morph: l = !0,
  contentClassName: h,
  initialHighlightIndex: s
}) {
  const [d, u] = W([]), [b, p] = W(null), y = Ee(), v = g(null), S = g(null), _ = g(e);
  _.current = e;
  const [A, P] = W(e), H = at();
  U(() => {
    if (e)
      return P(!0), H.setHighlighted(s ?? -1, "keyboard"), Mt(() => {
        n == null || n(!1), t == null || t();
      });
    u([]);
  }, [e, s, n, t]);
  const B = V(() => {
    const F = v.current;
    if (!F) return null;
    const ee = F.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), E = ot({
    visible: e,
    morph: l,
    anchor: B,
    onClosed: () => P(!1)
  }), q = g(() => {
  }), m = g(() => {
  }), w = g(() => {
  });
  ut(e && d.length === 0, H, q), ft(e, m), dt(e, H, q, S, d.length > 0, w);
  const z = g(null), R = V((F) => {
    var ee;
    if (F) {
      F.addEventListener("keydown", q.current, { capture: !0 }), F.addEventListener("wheel", m.current, { passive: !1 });
      const x = F.ownerDocument;
      z.current = x, x.addEventListener("keydown", w.current, { capture: !0 }), C(F.offsetWidth), O(!0);
    } else
      (ee = z.current) == null || ee.removeEventListener("keydown", w.current, { capture: !0 }), z.current = null, O(!1);
    S.current = F, E(F);
  }, [E]), [D, X] = W({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [J, re] = W(0), [$, O] = W(!1), [Q, C] = W(0);
  U(() => {
    e && v.current && re(v.current.getBoundingClientRect().width);
  }, [e]);
  const K = Pe(() => ({ panelWidth: Q || J || void 0 }), [Q, J]);
  zn(v, e && $, (F) => X({ ...F, maxH: Math.min(F.maxH, 384), ready: !0 }), K), U(() => {
    if (D.ready && e) {
      const F = S.current;
      F && F.ownerDocument.activeElement !== F && !F.contains(F.ownerDocument.activeElement) && F.focus();
    }
  }, [D.ready, e]), le(() => {
    var ee;
    if (!e || H.highlightedIndex < 0) return;
    const F = (ee = S.current) == null ? void 0 : ee.querySelector(`[data-ei="${H.highlightedIndex}"]`);
    F == null || F.scrollIntoView({ block: "nearest" });
  }, [e, H.highlightedIndex]);
  const L = V((F) => {
    !F && !_.current || (!F && G.current && (ce.current = !0), n ? n(F) : F || t == null || t());
  }, [n, t]), k = g(A);
  k.current = A;
  const G = g(!1), ce = g(!1), me = V(() => {
    if (!_.current && k.current) {
      if (ce.current) {
        ce.current = !1, G.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), de = ge.isValidElement(r) ? r : null, ae = de ? ge.cloneElement(de, {
    ref: (F) => {
      v.current = F;
    },
    onPointerDown: () => {
      G.current = !0, ce.current = !1;
    },
    onClick: (F) => {
      var ee, x;
      (x = (ee = de.props).onClick) == null || x.call(ee, F), me();
    }
  }) : r;
  return /* @__PURE__ */ N(j.Root, { open: e || A, onOpenChange: L, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: ae }),
    /* @__PURE__ */ i(j.Portal, { container: y ?? void 0, children: /* @__PURE__ */ i(st.Provider, { value: a, children: /* @__PURE__ */ i(ct.Provider, { value: { chain: d, setChain: u, morph: l, keyboardOpened: b, setKeyboardOpened: p }, children: /* @__PURE__ */ i(_e.Provider, { value: H, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: R,
        "data-theme": a,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${c || ""} ${h || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: D.left,
          top: D.bottom != null ? void 0 : D.top,
          bottom: D.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: c ? void 0 : J || void 0,
          maxHeight: D.maxH,
          visibility: D.ready ? "visible" : "hidden"
        },
        onPointerLeave: H.pointerLeave,
        children: f
      }
    ) }) }) }) })
  ] });
}
function ni({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: o,
  onRename: c,
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
  label: S,
  header: _,
  itemLabel: A,
  trigger: P,
  minItems: H = 1,
  itemRender: B,
  morph: E = !0,
  contentClassName: q
}) {
  const m = Lt(), [w, z] = W(null), [R, D] = W(""), X = g(null), J = g(null);
  U(() => {
    e && requestAnimationFrame(() => {
      var C, K;
      (K = (C = J.current) == null ? void 0 : C.querySelector('[data-active="1"]')) == null || K.scrollIntoView({ block: "nearest" });
    });
  }, [e]), U(() => {
    var L;
    if (!e) return;
    const C = (k) => {
      var pe, F, ee, x, I;
      if ((F = (pe = k.target) == null ? void 0 : pe.closest) != null && F.call(pe, "input, textarea, [contenteditable]")) return;
      const G = (ee = J.current) == null ? void 0 : ee.closest(".ui-menu");
      if (!G || !G.contains(k.target)) return;
      const ce = G.ownerDocument, me = [...G.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], de = [...G.querySelectorAll('div:last-child > [role="menuitem"]')], ae = [...me, ...de];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const M = ce.activeElement;
        let Z = M ? ae.indexOf(M) : -1;
        if (Z < 0 && M) {
          const ie = M.closest("[data-active]"), te = ie == null ? void 0 : ie.querySelector('[role="menuitem"]:first-child');
          te && (Z = me.indexOf(te));
        }
        const Y = k.key === "ArrowDown" ? 1 : -1, ne = Z < 0 ? Y === 1 ? 0 : ae.length - 1 : (Z + Y + ae.length) % ae.length;
        (x = ae[ne]) == null || x.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const M = ce.activeElement, Z = M == null ? void 0 : M.closest("[data-active]");
        if (!Z) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const Y = [...Z.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Y.length === 0) return;
        const ne = M && Z.contains(M) ? Y.indexOf(M) : -1, ie = k.key === "ArrowRight" ? 1 : -1, te = ne < 0 ? 0 : (ne + ie + Y.length) % Y.length;
        (I = Y[te]) == null || I.focus({ preventScroll: !0 });
        return;
      }
    }, K = ((L = J.current) == null ? void 0 : L.ownerDocument) ?? null;
    return K == null || K.addEventListener("keydown", C, { capture: !0 }), () => K == null ? void 0 : K.removeEventListener("keydown", C, { capture: !0 });
  }, [e]), U(() => {
    if (w) {
      requestAnimationFrame(() => {
        var K, L;
        (K = X.current) == null || K.focus(), (L = X.current) == null || L.select();
      });
      const C = n.find((K) => K.id === w);
      C && !R && D(C.name);
    }
  }, [w]), U(() => {
    if (w) {
      const C = n.find((K) => K.id === w);
      C && !R && D(C.name);
    }
  }, [w, n]);
  const re = (C, K) => {
    z(C), D(K);
  }, $ = () => {
    w && R.trim() && c(w, R.trim()), z(null);
  }, O = () => {
    z(null);
  }, Q = A || _.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ N(He, { open: e, onOpenChange: (C) => {
    C ? (z(null), D("")) : (w && R.trim() && c(w, R.trim()), z(null), D("")), (!C || !p) && t(C);
  }, width: "w-80", theme: y, align: v, trigger: P, morph: E, contentClassName: q, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${m.headerText}`, children: _ }),
    /* @__PURE__ */ i("div", { ref: J, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((C) => {
      const K = C.id === r, L = w === C.id;
      return /* @__PURE__ */ i("div", { "data-active": K ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${K || L ? m.rowActiveBg : m.rowHoverBg} ${w && !L ? "opacity-40 pointer-events-none" : ""}`, children: L ? /* @__PURE__ */ N(he, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: X,
            value: R,
            onChange: (k) => D(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), $()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), O());
            },
            className: `w-full border rounded ${m.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${m.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), $();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i($t, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${m.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), O();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(Ue, { className: m.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ N(he, { children: [
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none cursor-pointer flex items-center ${m.rowText} ${K ? "" : m.rowTextHover}`,
            onSelect: b ? () => {
              o(C.id);
            } : (k) => {
              k.preventDefault(), o(C.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${K ? m.rowActiveText : ""}`, children: B ? B(C) : C.name })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${K ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), re(C.id, C.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(Ut, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${K ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const G = a(C.id);
              G && re(G, `${C.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(Ct, { className: m.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= H ? m.btnDisabled : K ? m.btnDangerActive : m.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), f(C.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= H,
            children: /* @__PURE__ */ i(je, { className: m.btnIcon })
          }
        )
      ] }) }, C.id);
    }) }),
    /* @__PURE__ */ N("div", { className: `shrink-0 ${w ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ N(he, { children: [
        /* @__PURE__ */ i(j.Separator, { className: m.separator }),
        /* @__PURE__ */ N(
          j.Item,
          {
            className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
            onSelect: (C) => {
              C.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ i(zt, { className: `${m.btnIcon} ${m.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || h || s || u) && /* @__PURE__ */ i(j.Separator, { className: m.separator }),
      l && /* @__PURE__ */ N(
        j.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault();
            const K = l();
            K && re(K, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(jt, { className: `${m.btnIcon} ${m.icon}` }),
            "New ",
            Q
          ]
        }
      ),
      h && /* @__PURE__ */ N(
        j.Item,
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
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ N(
        j.Item,
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
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      u && /* @__PURE__ */ N(
        j.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(je, { className: `${m.btnIcon} ${m.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Rn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Sn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: o = "",
  children: c,
  keepOpen: a = !1,
  selected: f = !1,
  rightAction: l,
  trailing: h
}) {
  At();
  const s = Lt(), d = g(!1), u = g(null), b = lt(), p = g(b);
  p.current = b;
  const y = g(null);
  U(() => {
    var P;
    const A = {
      label: Pt(c),
      activate: () => {
        n || e();
      }
    };
    return y.current = A, (P = p.current) == null ? void 0 : P.register(A);
  }, []);
  const v = b && y.current ? b.items.indexOf(y.current) : -1, S = !n && v >= 0 && v === b.highlightedIndex, _ = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ N(
    j.Item,
    {
      ref: u,
      "data-ei": v >= 0 ? v : void 0,
      className: `w-full text-left ${Rn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${_} ${f ? "ui-item-selected" : ""} ${S ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${o}`,
      onSelect: (A) => {
        if (d.current) {
          d.current = !1;
          return;
        }
        a && A.preventDefault(), e();
      },
      onPointerEnter: () => {
        !n && b && v >= 0 && b.setHighlighted(v, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: c }),
        h && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: h }),
        l && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: l.title,
            onPointerDown: (A) => {
              A.stopPropagation(), A.preventDefault(), d.current = !0, l.onClick();
            },
            onClick: (A) => {
              A.stopPropagation(), A.preventDefault();
            },
            children: l.icon
          }
        )
      ]
    }
  );
}
const Dn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Mn({ id: e, label: t, icon: n, width: r, side: o = "right", children: c, contentClassName: a }) {
  const { chain: f, setChain: l, morph: h, keyboardOpened: s, setKeyboardOpened: d } = Te(ct), u = f.includes(e), b = f[f.length - 1] === e, p = At(), y = Ee(), v = g(null), S = g(null), [_, A] = W(u), P = !u && _;
  U(() => {
    u && A(!0);
  }, [u]);
  const H = () => l((L) => {
    const k = L.indexOf(e);
    return k >= 0 ? L.slice(0, k) : L;
  }), B = at(), E = lt(), q = g(E);
  q.current = E;
  const m = g(null);
  U(() => {
    var k;
    const L = {
      label: t,
      activate: () => {
        d(e), l((G) => G.includes(e) ? G : [...G, e]);
      },
      submenu: !0
    };
    return m.current = L, (k = q.current) == null ? void 0 : k.register(L);
  }, []);
  const w = E && m.current ? E.items.indexOf(m.current) : -1, z = w >= 0 && w === E.highlightedIndex, R = V(() => {
    const L = v.current;
    if (!L) return null;
    const k = L.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), D = ot({
    visible: u,
    morph: h,
    anchor: R,
    onClosed: () => A(!1)
  }), X = g(() => {
  }), J = g(() => {
  }), re = g(() => {
  });
  ut(u && b, B, X, {
    onCloseSub: () => {
      H(), E && w >= 0 && E.setHighlighted(w, "keyboard");
    }
  });
  const $ = g(s);
  $.current = s, U(() => {
    u && ($.current === e ? (B.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var L;
      return (L = S.current) == null ? void 0 : L.focus();
    }), d(null)) : B.setHighlighted(-1, "keyboard"));
  }, [u]), ft(u, J), dt(u, B, X, S, !b, re), ge.useLayoutEffect(() => {
    var k;
    if (!u || B.highlightedIndex < 0) return;
    const L = (k = S.current) == null ? void 0 : k.querySelector(`[data-ei="${B.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [u, B.highlightedIndex]);
  const O = g(null), Q = V((L) => {
    var k;
    if (L) {
      L.addEventListener("keydown", X.current, { capture: !0 }), L.addEventListener("wheel", J.current, { passive: !1 });
      const G = L.ownerDocument;
      O.current = G, G.addEventListener("keydown", re.current, { capture: !0 });
    } else
      (k = O.current) == null || k.removeEventListener("keydown", re.current, { capture: !0 }), O.current = null;
    S.current = L, D(L);
  }, [D]), C = `w-full text-left ${Dn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${z ? " ui-item-highlighted" : ""}${P ? " ui-sub-closing" : ""}`, K = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ N(j.Sub, { open: u || _, onOpenChange: (L) => l((k) => {
    if (!L) {
      const G = k.indexOf(e);
      return G >= 0 ? k.slice(0, G) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ N(
      j.SubTrigger,
      {
        ref: v,
        "data-ei": w >= 0 ? w : void 0,
        className: C,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          E && w >= 0 && E.setHighlighted(w, "pointer");
        },
        onPointerDown: (L) => {
          L.pointerType === "pen" && (L.preventDefault(), l((k) => u ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          o === "left" && /* @__PURE__ */ i(Xe, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ N("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          o === "right" && /* @__PURE__ */ i(Xe, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(j.Portal, { container: y ?? void 0, children: /* @__PURE__ */ i(
      j.SubContent,
      {
        ref: Q,
        "data-theme": p,
        className: K,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: B.pointerLeave,
        children: /* @__PURE__ */ i(_e.Provider, { value: B, children: c })
      }
    ) })
  ] });
}
const ke = 8, An = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ln = T ? "text-sm" : "text-xs", ri = ({ open: e, x: t, y: n, onClose: r, children: o, containerRef: c, morph: a = !0 }) => {
  const f = g(null), l = we(), [h, s] = W(!1), [d, u] = W([]), [b, p] = W(null), y = at();
  U(() => {
    if (e)
      return y.setHighlighted(-1, "keyboard"), Mt(r);
  }, [e, r]);
  const v = g({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const S = V(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), _ = ot({
    visible: !0,
    morph: a,
    anchor: S,
    cloneOnUnmount: !0
  }), A = g(() => {
  }), P = g(() => {
  }), H = g(() => {
  });
  ut(e, y, A), ft(e, P), dt(e, y, A, f, d.length > 0, H);
  const B = g(null), E = V((w) => {
    var z;
    if (w) {
      w.addEventListener("keydown", A.current, { capture: !0 }), w.addEventListener("wheel", P.current, { passive: !1 });
      const R = w.ownerDocument;
      B.current = R, R.addEventListener("keydown", H.current, { capture: !0 });
    } else
      (z = B.current) == null || z.removeEventListener("keydown", H.current, { capture: !0 }), B.current = null;
    f.current = w, s(!!w), _(w);
  }, [_]), [q, m] = W(null);
  return le(() => {
    var C;
    if (!e || !h || !f.current) return;
    const w = f.current, z = w.offsetWidth, R = w.offsetHeight, D = (C = c == null ? void 0 : c.current) == null ? void 0 : C.getBoundingClientRect(), X = D ? D.right : (l == null ? void 0 : l.innerWidth) ?? 0, J = D ? D.bottom : (l == null ? void 0 : l.innerHeight) ?? 0, re = D ? D.left : 0, $ = D ? D.top : 0;
    let O = Math.max($ + ke, v.current.top), Q = Math.max(re + ke, v.current.left);
    Q + z > X && (Q = X - z - ke), O + R > J && (O = Math.max($ + ke, J - R - ke)), m({ left: Q, top: O });
  }, [e, h, t, n, c]), e ? /* @__PURE__ */ N(j.Root, { open: e, onOpenChange: (w) => {
    w || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(j.Portal, { children: /* @__PURE__ */ i(st.Provider, { value: "light", children: /* @__PURE__ */ i(ct.Provider, { value: { chain: d, setChain: u, morph: a, keyboardOpened: b, setKeyboardOpened: p }, children: /* @__PURE__ */ i(_e.Provider, { value: y, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: E,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Ln} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (q == null ? void 0 : q.left) ?? v.current.left, top: (q == null ? void 0 : q.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: y.pointerLeave,
        children: o
      }
    ) }) }) }) })
  ] }) : null;
}, ii = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: o = !1, trailing: c, children: a }) => {
  const f = lt(), l = g(f);
  l.current = f;
  const h = g(null);
  U(() => {
    var b;
    const u = { label: Pt(a), activate: () => {
      r || e();
    } };
    return h.current = u, (b = l.current) == null ? void 0 : b.register(u);
  }, []);
  const s = f && h.current ? f.items.indexOf(h.current) : -1, d = !r && s >= 0 && s === f.highlightedIndex;
  return /* @__PURE__ */ N(
    j.Item,
    {
      "data-ei": s >= 0 ? s : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && f && s >= 0 && f.setHighlighted(s, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${An} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${o ? "ui-item-selected" : ""} ${d ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: a }),
        c && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: c })
      ]
    }
  );
}, oi = () => /* @__PURE__ */ i(j.Separator, { className: "ui-sep my-1" }), si = (e) => /* @__PURE__ */ i(Mn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), oe = 32, Ot = "[data-modal-stack]", ue = 220, Ce = "cubic-bezier(0.32, 0.72, 0, 1)", Ae = 0.94;
function Ne() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function It(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function bt(e, t, n, r) {
  const o = ++e.current, c = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = It(c, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === o && (t.style.transition = `transform ${ue}ms ${Ce}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === o && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ue + 80));
    });
  });
}
function Pn(e, t, n) {
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
  const r = ++e.current, o = t.getBoundingClientRect(), c = 1 - Ae, a = { left: o.left + o.width * c / 2, top: o.top + o.height * c / 2, width: o.width * Ae, height: o.height * Ae };
  t.style.transition = `transform ${ue}ms ${Ce}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = It(o, a), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ue + 60);
}
function Fe(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Ot) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Ke(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Ot) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const On = T ? "px-6" : "px-5", In = T ? "py-3" : "py-2.5", _n = T ? "text-sm" : "text-xs", Hn = T ? "w-4 h-4" : "w-3.5 h-3.5", Bn = T ? "text-base" : "text-sm", Fn = T ? "w-5 h-5" : "w-4 h-4", We = T ? "px-6" : "px-5", Kn = T ? "pt-6" : "pt-5", Wn = T ? "pb-6" : "pb-5", qn = T ? "text-xs" : "text-[10px]", Yn = T ? "w-3.5 h-3.5" : "w-3 h-3", Un = T ? "px-2.5 py-1.5" : "px-2 py-1", jn = T ? "px-6" : "px-5", Xn = T ? "py-3" : "py-2";
function Vn({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: o,
  footer: c,
  children: a,
  onReset: f,
  morph: l = !0,
  flat: h = !1,
  closable: s = !0
}) {
  const d = g(null), u = g(null), b = g(null), [p, y] = W(!1), v = V((x) => {
    d.current = x, y(x !== null);
  }, []), S = Ee(), _ = we(), A = g(_);
  A.current = _;
  const [P, H] = W(null), B = g(null), E = g(!1), q = g(!1), [m, w] = W(!1), z = g(0), R = g(!1), [D, X] = W(!1), J = g(l);
  J.current = l;
  const re = g(!1), $ = g(!1), O = () => {
    $.current = !0, w(!0);
  }, Q = () => {
    $.current = !1, w(!1);
  };
  U(() => {
    e || (H(null), q.current = !1, E.current = !1);
  }, [e]), le(() => {
    var Z, Y;
    if (!e || q.current || !p || !d.current) return;
    q.current = !0;
    const x = d.current.getBoundingClientRect(), I = ((Z = A.current) == null ? void 0 : Z.innerWidth) ?? 0, M = ((Y = A.current) == null ? void 0 : Y.innerHeight) ?? 0;
    H({
      left: Math.max(oe, Math.min((I - x.width) / 2, I - x.width - oe)),
      top: Math.max(oe, Math.min((M - x.height) / 2, M - x.height - oe))
    });
  }, [e, p]), le(() => {
    if (!e || !p || !l || Ne() || !d.current) return;
    const x = d.current, I = Fe(x), M = I[I.length - 1];
    O(), M ? bt(z, x, M.getBoundingClientRect(), Q) : Pn(z, x, Q);
  }, [e, p]);
  const C = V(() => {
    if (!s || R.current) return;
    const x = d.current, I = !!x && Fe(x).length > 0;
    if (!x || !l || Ne() || I) {
      t();
      return;
    }
    R.current = !0, X(!0), re.current = !0, O(), xt(z, x, () => {
      R.current = !1, X(!1), Q(), t();
    });
  }, [l, t, s]);
  le(() => () => {
    const x = d.current;
    if (!x || re.current || !J.current || Ne() || Fe(x).length > 0) return;
    const I = x.ownerDocument, M = x.cloneNode(!0);
    M.removeAttribute("data-modal-stack"), M.removeAttribute("data-state"), M.removeAttribute("role"), M.removeAttribute("data-aria-hidden"), M.removeAttribute("tabindex"), M.setAttribute("aria-hidden", "true"), M.style.pointerEvents = "none", I.body.appendChild(M), xt({ current: 0 }, M, () => {
      M.isConnected && M.remove();
    });
  }, []), U(() => {
    if (!e || !p || !l || !d.current) return;
    const x = d.current, I = x.parentNode;
    if (!I) return;
    let M = 0, Z = null, Y = !1;
    const ne = () => {
      M = 0;
      const te = Ke(x);
      te.length > 0 ? (Z = te[te.length - 1].getBoundingClientRect(), Y = !0, M = requestAnimationFrame(ne)) : Y && (Y = !1, Z && !Ne() && (O(), bt(z, x, Z, Q)), Z = null);
    }, ie = new MutationObserver(() => {
      !M && Ke(x).length > 0 && (M = requestAnimationFrame(ne));
    });
    return ie.observe(I, { childList: !0 }), () => {
      ie.disconnect(), M && cancelAnimationFrame(M);
    };
  }, [e, p]), U(() => {
    if (!p || !l || Ne() || !d.current) return;
    const x = d.current;
    let I = Math.round(x.getBoundingClientRect().height), M = !1;
    const Z = new ResizeObserver(() => {
      var mt;
      if (!x.isConnected) return;
      const Y = Math.round(x.getBoundingClientRect().height);
      if (!M) {
        M = !0, I = Y;
        return;
      }
      if (Math.abs(Y - I) < 1) return;
      if (B.current || R.current || Ke(x).length > 0) {
        I = Y;
        return;
      }
      if ($.current) return;
      const ne = I;
      I = Y, O();
      const ie = x.getBoundingClientRect(), te = !E.current, ve = ((mt = A.current) == null ? void 0 : mt.innerHeight) ?? 0, qt = te ? (ve - ne) / 2 : ie.top, ht = te ? (ve - Y) / 2 : ie.top;
      x.style.transition = "none", x.style.height = `${ne}px`, te && (x.style.top = `${qt}px`), u.current && (u.current.style.overflow = "hidden"), x.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          x.style.height === `${ne}px` && (x.style.transition = `height ${ue}ms ${Ce}${te ? `, top ${ue}ms ${Ce}` : ""}`, x.style.height = `${Y}px`, te && (x.style.top = `${ht}px`), window.setTimeout(() => {
            x.style.height === `${Y}px` && (x.style.transition = "", x.style.height = "", u.current && (u.current.style.overflow = ""), te && H({ left: ie.left, top: ht }), Q());
          }, ue + 60));
        });
      });
    });
    return Z.observe(x), () => Z.disconnect();
  }, [p]);
  const K = V(() => {
    const x = d.current;
    if (!x) return null;
    const I = x.getBoundingClientRect();
    return { left: I.left, top: I.top, width: I.width, height: I.height };
  }, []), L = V((x, I) => {
    var te, ve;
    const M = ((te = A.current) == null ? void 0 : te.innerWidth) ?? 0, Z = ((ve = A.current) == null ? void 0 : ve.innerHeight) ?? 0, Y = K(), ne = Y ? Y.width : Math.min(M - oe * 2, 576), ie = Y ? Y.height : Math.min(Z - oe * 2, 400);
    return {
      left: Math.max(oe, Math.min(x, M - ne - oe)),
      top: Math.max(oe, Math.min(I, Z - ie - oe))
    };
  }, [K]), k = V((x) => {
    if (x.target.closest("button")) return;
    E.current = !0;
    const I = K();
    I && (H(L(I.left, I.top)), B.current = { startX: x.clientX, startY: x.clientY, posX: I.left, posY: I.top }, x.target.setPointerCapture(x.pointerId));
  }, [K, L]), G = V((x) => {
    const I = B.current;
    I && (x.preventDefault(), H(L(I.posX + x.clientX - I.startX, I.posY + x.clientY - I.startY)));
  }, [L]), ce = V(() => {
    B.current = null;
  }, []), me = B.current !== null, de = P !== null, ae = de ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${o ? `${o} w-full` : "max-w-xl w-full"}`, F = {
    ...de ? { left: P.left, top: P.top } : {},
    width: `min(100%, calc(100vw - ${oe * 2}px))`,
    maxHeight: `calc(100vh - ${oe * 2}px)`
  }, ee = V((x) => {
    if (x.key !== "Enter" || x.shiftKey || x.metaKey || x.ctrlKey || x.altKey || x.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const M = b.current;
    if (!M) return;
    const Z = Array.from(M.querySelectorAll("button[data-modal-confirm]")), Y = Z.length > 0 ? Z : Array.from(M.querySelectorAll("button")), ne = Y[Y.length - 1];
    !ne || ne.disabled || (x.preventDefault(), ne.click());
  }, []);
  return /* @__PURE__ */ i(fe.Root, { open: e, onOpenChange: (x) => {
    x || C();
  }, children: /* @__PURE__ */ N(fe.Portal, { container: S ?? void 0, children: [
    /* @__PURE__ */ i(
      fe.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${D ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (x) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (x.preventDefault(), C());
        }
      }
    ),
    /* @__PURE__ */ N(
      fe.Content,
      {
        ref: v,
        onKeyDown: ee,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ae} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(F).length > 0 ? F : {} },
        children: [
          h ? /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${We} ${Kn} pb-4 ${me ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (x) => {
                m || k(x);
              },
              onPointerMove: G,
              onPointerUp: ce,
              children: [
                /* @__PURE__ */ i(fe.Title, { className: `${Bn} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ i(fe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(Ue, { className: Fn }) })
              ]
            }
          ) : /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${On} ${In} border-b border-zinc-800 shrink-0 bg-zinc-950 ${me ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (x) => {
                m || k(x);
              },
              onPointerMove: G,
              onPointerUp: ce,
              children: [
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(fe.Title, { className: `${_n} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
                  f && /* @__PURE__ */ N("button", { onClick: f, className: `flex items-center gap-1 ${qn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Un} shrink-0`, children: [
                    /* @__PURE__ */ i(zt, { className: Yn }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(fe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(Ue, { className: Hn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: u, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${h ? ` ${We} pb-4` : ""}`, children: a }),
          c && /* @__PURE__ */ i("div", { ref: b, className: h ? `${We} ${Wn}` : "shrink-0", children: h ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: c }) : c })
        ]
      }
    )
  ] }) });
}
function ci({ children: e }) {
  return /* @__PURE__ */ i("div", { className: `flex items-center justify-end gap-3 ${jn} ${Xn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const Gn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${T ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Zn = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Se({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      className: `${Gn} ${Zn[e]} ${t}`,
      ...r
    }
  );
}
function Jn({ checked: e, onChange: t, disabled: n = !1, label: r, id: o, className: c = "", labelClassName: a = "", theme: f, variant: l = "pill", tone: h = "accent", block: s = !1 }) {
  const d = l !== "plain", u = T ? "w-5 h-5" : "w-4 h-4", b = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", p = T ? "w-3.5 h-3.5" : "w-3 h-3", y = T ? "text-sm" : "text-xs";
  return /* @__PURE__ */ N(
    "label",
    {
      className: `ui-checkbox ${d ? `ui-checkbox-pill ${T ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${h === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${c}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: T ? 10 : 8 },
      onClick: (S) => S.stopPropagation(),
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: o,
            checked: e,
            disabled: n,
            onChange: (S) => t(S.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ N("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: `ui-checkbox-box ${b}`, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", className: p, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${y} ${a}`, children: r })
      ]
    }
  );
}
const Qn = T ? "space-y-5" : "space-y-4", er = T ? "text-sm" : "text-xs", tr = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", _t = ze(null);
function li() {
  const e = Te(_t);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function ai({ children: e }) {
  const [t, n] = W(null), [r, o] = W(!1), c = g(null), a = V((u) => {
    if (u.suppressKey) {
      const b = localStorage.getItem(u.suppressKey);
      if (b && Date.now() < parseInt(b, 10))
        return Promise.resolve(!0);
    }
    return new Promise((b) => {
      o(!1), n({ kind: "confirm", options: u, resolve: b });
    });
  }, []), f = V((u) => new Promise((b) => {
    n({ kind: "prompt", options: u, resolve: b });
  }), []), l = V((u) => new Promise((b) => {
    n({ kind: "alert", options: u, resolve: b });
  }), []);
  U(() => {
    if (t) {
      const u = setTimeout(() => {
        var b;
        return (b = c.current) == null ? void 0 : b.focus();
      }, 50);
      return () => clearTimeout(u);
    }
  }, [t]);
  const h = V(() => {
    var u, b;
    if (t) {
      if (t.kind === "confirm") {
        const p = t.options;
        p.suppressKey && r && localStorage.setItem(p.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((b = (u = c.current) == null ? void 0 : u.value) == null ? void 0 : b.trim()) || null) : t.resolve();
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
  const d = V(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ N(_t.Provider, { value: { confirm: a, prompt: f, alert: l }, children: [
    e,
    /* @__PURE__ */ i(
      Vn,
      {
        open: s,
        onClose: d,
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ N(he, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(Se, { variant: "ghost", onClick: d, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(Se, { onClick: h, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            Se,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: h,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(Se, { "data-modal-confirm": !0, onClick: h, children: "Save" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: Qn, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { className: `${er} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            Jn,
            {
              block: !0,
              checked: r,
              onChange: o,
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
              className: `w-full ${tr} ui-input`
            }
          )
        ] })
      }
    )
  ] });
}
const nr = 500, rr = 250, ir = 5, se = 88, yt = 4;
function or(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const o = performance.now(), c = (a) => {
    const f = a - o, l = Math.min(f / t, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(c);
  };
  requestAnimationFrame(c);
}
function sr({ x: e, y: t, ms: n }) {
  const r = g(null), o = Ee();
  return U(() => {
    r.current && or(r.current, n);
  }, [n]), et(
    /* @__PURE__ */ i(
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
          /* @__PURE__ */ i(
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
          /* @__PURE__ */ i(
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
    o ?? document.body
  );
}
function ui() {
  return { "data-no-longpress": "true" };
}
function cr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function di({
  children: e,
  showRing: t = !0,
  longPressMs: n = nr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: o,
  onLongPress: c
}) {
  const [a, f] = W(null), l = wn(), h = g(null), s = g(null), d = g({ x: 0, y: 0, target: null }), u = g(!1), b = Math.min(rr, n * 0.5), p = g(o);
  p.current = o;
  const y = g(c);
  return y.current = c, U(() => {
    if (!T || !l) return;
    const v = (P) => {
      if (!Ve(P.pointerType) || P.button !== 0) return;
      const H = P.target;
      if (!H.closest(r) || (p.current ? !p.current(H) : cr(H))) return;
      const B = P.clientX, E = P.clientY;
      d.current = { x: B, y: E, target: P.target }, u.current = !0, t && (s.current = setTimeout(() => f({ x: B, y: E }), b)), h.current = setTimeout(() => {
        if (!u.current) return;
        s.current && (clearTimeout(s.current), s.current = null), f(null);
        const q = d.current.target;
        if (!q) return;
        const m = y.current;
        if (m) {
          m(q, B, E);
          return;
        }
        const w = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: B,
          clientY: E,
          button: 2,
          view: window
        });
        q.dispatchEvent(w);
      }, n);
    }, S = (P) => {
      if (!u.current || h.current === null) return;
      const H = P.clientX - d.current.x, B = P.clientY - d.current.y;
      Math.sqrt(H * H + B * B) > ir && (clearTimeout(h.current), h.current = null, s.current && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    }, _ = () => {
      h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null);
    }, A = (P) => {
      Ve(P.pointerType) && (h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    };
    return l == null || l.addEventListener("pointerdown", v), l.addEventListener("pointermove", S), l.addEventListener("pointerup", _), l.addEventListener("pointercancel", _), l.addEventListener("pointerleave", A), () => {
      l.removeEventListener("pointerdown", v), l.removeEventListener("pointermove", S), l.removeEventListener("pointerup", _), l == null || l.removeEventListener("pointercancel", _), l == null || l.removeEventListener("pointerleave", A), h.current !== null && clearTimeout(h.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, b, r]), /* @__PURE__ */ N(he, { children: [
    e,
    t && a && /* @__PURE__ */ i(sr, { x: a.x, y: a.y, ms: n - b })
  ] });
}
function fi() {
  const e = kn();
  return vn ? e === null || Ve(e) : !1;
}
const lr = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", ar = {
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
}, wt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", ur = "bg-blue-900!";
function hi({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: o = "button",
  ...c
}) {
  const a = c["data-state"] === "open", f = ar[t][e];
  let l = `${f.base} ${a ? f.open : ""}`;
  return e === "primary" && t === "light" && n && (l = a ? `${wt} ${ur}` : wt), /* @__PURE__ */ i("button", { type: o, className: `${lr} ${l} ${r}`, ...c });
}
const dr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], fr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], qe = 1900, Ye = 2100;
function hr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function mr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function mi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: o = "", initialView: c }) {
  const a = /* @__PURE__ */ new Date(), f = (() => {
    if (!c) return a;
    const $ = /* @__PURE__ */ new Date(c + "T00:00:00");
    return isNaN($.getTime()) ? a : $;
  })(), [l, h] = W(f.getFullYear()), [s, d] = W(f.getMonth()), [u, b] = W("days"), [p, y] = W(null), v = Pe(() => new Set(e), [e]), S = ($) => {
    v.has($) ? t(e.filter((O) => O !== $)) : t([...e, $]);
  }, _ = Pe(() => {
    const $ = hr(l, s), O = new Date(l, s, 1).getDay(), Q = [];
    for (let C = 0; C < O; C++) Q.push({ key: `pad-${C}`, day: 0, empty: !0 });
    for (let C = 1; C <= $; C++) Q.push({ key: mr(l, s, C), day: C, empty: !1 });
    return Q;
  }, [l, s]), A = ($) => h((O) => Math.max(qe, Math.min(Ye, O + $))), P = ($) => {
    s + $ < 0 ? (h((O) => Math.max(qe, O - 1)), d(11)) : s + $ > 11 ? (h((O) => Math.min(Ye, O + 1)), d(0)) : d((O) => O + $);
  }, H = () => {
    if (p === null) return;
    const $ = parseInt(p, 10);
    !isNaN($) && $ >= qe && $ <= Ye && h($), y(null);
  }, B = ($) => e.some((O) => O.startsWith(`${l}-${String($ + 1).padStart(2, "0")}`)), E = n === "dark", q = T ? "p-2" : "p-1", m = T ? "w-5 h-5" : "w-4 h-4", w = T ? "text-[11px] py-2" : "text-[10px] py-1.5", z = T ? "py-2.5 text-sm" : "py-1.5 text-xs", R = T ? "py-3 text-sm" : "py-2 text-xs", D = T ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", X = T ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${E ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${E ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, J = E ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", re = E ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ N("div", { className: `border rounded-lg overflow-hidden w-full ${E ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${o}`, children: [
    /* @__PURE__ */ N("div", { className: `flex items-center justify-between px-3 py-2 border-b ${E ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? A(-1) : P(-1),
          className: `${q} rounded transition-colors ${E ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(Xt, { className: m })
        }
      ),
      u === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => b("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${E ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(l, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(l),
          onChange: ($) => y($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: H,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), H()), $.key === "Escape" && y(null);
          },
          className: X
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? A(1) : P(1),
          className: `${q} rounded transition-colors ${E ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(Xe, { className: m })
        }
      )
    ] }),
    u === "months" ? /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: fr.map(($, O) => /* @__PURE__ */ N(
        "button",
        {
          type: "button",
          onClick: () => {
            d(O), b("days");
          },
          className: `${R} relative font-medium transition-colors border-b ${O === s ? J : re} ${E ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            $,
            B(O) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${O === s ? "bg-white" : E ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${E ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            h(a.getFullYear()), d(a.getMonth()), b("days");
          },
          className: `px-3 ${T ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${E ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ N("div", { className: "grid grid-cols-7 text-center", children: [
      dr.map(($) => /* @__PURE__ */ i("div", { className: `${w} font-semibold uppercase tracking-wider border-b ${E ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: $ }, $)),
      _.map(($) => $.empty ? /* @__PURE__ */ i("div", {}, $.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => S($.key),
          className: `${z} font-medium transition-colors border-b ${E ? "border-zinc-800/60" : "border-zinc-50"} ${v.has($.key) ? J : E ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ N("div", { className: `px-3 py-2 border-t ${E ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ N("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map(($) => {
        const O = /* @__PURE__ */ new Date($ + "T00:00:00"), Q = O.getFullYear() === a.getFullYear() ? O.toLocaleString("default", { month: "short", day: "numeric" }) : O.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            onClick: () => S($),
            "aria-label": `Remove ${Q}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${E ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${D}`,
            children: [
              Q,
              /* @__PURE__ */ i("span", { className: `leading-none ${E ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function pi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: o,
  allSelected: c = !1,
  toggleAllLabel: a,
  emptyHint: f = "Nothing here",
  maxHeight: l,
  disabled: h = !1,
  theme: s,
  className: d = ""
}) {
  const u = (v) => t instanceof Set ? t.has(v) : t.includes(v), b = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", y = r != null || o != null;
  return /* @__PURE__ */ N("div", { className: d, ...s ? { "data-theme": s } : {}, children: [
    y && /* @__PURE__ */ N("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      o != null && /* @__PURE__ */ i("button", { type: "button", disabled: h, onClick: o, className: "ui-checklist-toggleall", children: a ?? (c ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${h ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((v) => {
            const S = u(v.id);
            return /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                disabled: h,
                onClick: () => n(v.id),
                className: `ui-checklist-item ${b} ${S ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-checklist-box ${p}`, "aria-hidden": !0, children: S && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  v.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: v.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: v.label }),
                  v.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: v.secondary })
                ]
              },
              v.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: f })
        ]
      }
    )
  ] });
}
function gi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: o = "Nothing here",
  maxHeight: c,
  compact: a = !1,
  disabled: f = !1,
  theme: l,
  className: h = ""
}) {
  const s = a ? "px-2.5 py-1.5 text-xs" : T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", d = a ? "w-3.5 h-3.5" : T ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ N("div", { className: h, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
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
                  /* @__PURE__ */ i("span", { className: `ui-radio-circle ${d}`, "aria-hidden": !0, children: b && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  u.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: u.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: u.label }),
                  u.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: u.secondary })
                ]
              },
              u.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: o })
        ]
      }
    )
  ] });
}
const bi = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: o = "visible",
  offset: c = 8
}) => {
  const a = we(), { refs: f, floatingStyles: l } = en({
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
          if (o !== "visible") return {};
          const s = (_ = h.elements.floating.ownerDocument) == null ? void 0 : _.defaultView;
          if (!s) return {};
          const d = h.rects.reference, u = Math.max(d.x, 0), b = Math.max(d.y, 0), p = Math.min(d.x + d.width, s.innerWidth), y = Math.min(d.y + d.height, s.innerHeight);
          if (p <= u || y <= b) return {};
          const v = r === "left" ? p - (d.x + d.width) : r === "right" ? u - d.x : 0, S = r === "top" ? b - d.y : r === "bottom" ? y - (d.y + d.height) : 0;
          return { x: h.x + v, y: h.y + S };
        }
      },
      nn(c),
      rn({ padding: 8 }),
      on({ padding: 8 }),
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
    whileElementsMounted: tn
  });
  return le(() => {
    n && f.setReference(n);
  }, [n, f]), /* @__PURE__ */ N(he, { children: [
    !n && /* @__PURE__ */ i("div", { ref: f.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    a && et(
      /* @__PURE__ */ i(
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
  const n = Ee(), r = we(), [o, c] = W(!1), [a, f] = W({ x: 0, y: 0 }), l = g(null), h = () => {
    if (!l.current) return;
    const s = l.current.getBoundingClientRect();
    f({ x: s.left + s.width / 2, y: s.top });
  };
  return U(() => (o && r && (h(), r.addEventListener("scroll", h, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", h, !0)), [o]), /* @__PURE__ */ N(
    "div",
    {
      ref: l,
      className: "inline-flex",
      onMouseEnter: () => {
        h(), c(!0);
      },
      onMouseLeave: () => c(!1),
      children: [
        t,
        o && et(
          /* @__PURE__ */ N(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: a.x, top: a.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((s, d) => /* @__PURE__ */ i("div", { className: d > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: s }, d)),
                /* @__PURE__ */ i("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, xi = T ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Je = T ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", De = T ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", pr = "hover:bg-red-950/50", Ht = T ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Bt = "bg-blue-900/50 border-blue-700 text-blue-300", Ft = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", gr = T ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", yi = T ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Le = T ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", br = "inline-flex rounded overflow-hidden border border-zinc-700", Kt = T ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Me = ({ onClick: e, disabled: t, title: n, className: r = Je, children: o }) => /* @__PURE__ */ i($e, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: o }) }), wi = ({ value: e, options: t, onChange: n, disabled: r, active: o }) => /* @__PURE__ */ i("div", { className: br, children: t.map((c) => {
  const a = o ? o(c.v) : e === c.v;
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
}) }), vi = ({ children: e }) => /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: T ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), xr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", yr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", ki = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ N("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? xr : yr, children: e }),
  t
] }), Ni = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ N("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), $i = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: o }) => /* @__PURE__ */ N(he, { children: [
  /* @__PURE__ */ i(Me, { onClick: () => r(-1), disabled: e, title: "Move up", className: De, children: /* @__PURE__ */ i(Vt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(Me, { onClick: () => r(1), disabled: e, title: "Move down", className: De, children: /* @__PURE__ */ i(Gt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(Me, { onClick: t, disabled: e, title: "Duplicate", className: De, children: /* @__PURE__ */ i(Ct, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: Le }),
  /* @__PURE__ */ i(Me, { onClick: n, disabled: e, title: "Delete", className: `${De} ${pr}`, children: /* @__PURE__ */ i(je, { className: "w-2.5 h-2.5" }) })
] }), wr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), vr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), kr = /^(https?:\/\/|mailto:)/i;
function Nr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const o = n.slice(0, r).trim().toLowerCase(), c = n.slice(r + 1).trim();
    vr.has(o) && c && t.push(`${o}: ${c}`);
  }
  return t.join("; ");
}
function Qe(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const f = document.createDocumentFragment();
    for (const l of Array.from(t.childNodes)) f.appendChild(Qe(l));
    return f;
  };
  if (!wr.has(n)) return r();
  if (n === "a") {
    const f = t.getAttribute("href") || "";
    if (!kr.test(f)) return r();
  }
  const o = document.createElement(n), c = t.getAttribute("style"), a = Nr(c || "");
  if (a && o.setAttribute("style", a), n === "a") {
    o.setAttribute("href", t.getAttribute("href"));
    const f = t.getAttribute("target"), l = t.getAttribute("rel");
    f && o.setAttribute("target", f), l && o.setAttribute("rel", l);
  }
  for (const f of Array.from(t.childNodes)) o.appendChild(Qe(f));
  return o;
}
function Wt(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function $r(e) {
  const t = Wt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const a of Array.from(n.content.childNodes)) r.appendChild(Qe(a));
  const o = document.createElement("div");
  return o.appendChild(r), o.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Ci(e) {
  const t = Wt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function zi(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Cr = { text: "#52525b" }, zr = ({ node: e, selected: t, extension: n, editor: r, view: o, getPos: c }) => {
  var d;
  const a = e.attrs.field ?? "", f = n.options, l = ((d = f.resolve) == null ? void 0 : d.call(f, a)) ?? null, h = (l == null ? void 0 : l.color) ?? Cr, s = (l == null ? void 0 : l.label) ?? `{{${a}}}`;
  return /* @__PURE__ */ i(
    ln,
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
        const b = typeof c == "function" ? c() : null;
        if (b == null) return;
        const p = o.state.doc.resolve(b), y = p.nodeAfter;
        y && Oe.isSelectable(y) && o.dispatch(o.state.tr.setSelection(new Oe(p))), (v = f.onTokenClick) == null || v.call(f, a, u.currentTarget.getBoundingClientRect(), b);
      },
      children: s
    }
  );
};
function Tr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function vt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Er = bn.extend({
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
    return cn(zr);
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
}), Rr = 240, Sr = 280, Dr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = g(null);
  return U(() => {
    var c;
    const o = (c = r.current) == null ? void 0 : c.querySelector('[data-ac-active="1"]');
    o == null || o.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ i("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Sr, maxHeight: Rr, zIndex: 9999 }, onMouseDown: (o) => o.preventDefault(), children: /* @__PURE__ */ i("div", { ref: r, children: e.items.map((o, c) => /* @__PURE__ */ N(
    "button",
    {
      type: "button",
      "data-ac-active": c === t ? "1" : void 0,
      onMouseEnter: () => n(c),
      onClick: () => e.command({ field: o.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${c === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ i("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: o.color.text } }),
        /* @__PURE__ */ i("span", { className: "truncate flex-1", children: o.label }),
        o.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] text-zinc-600", children: o.group })
      ]
    },
    o.key
  )) }) });
}, Mr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ i(Dr, { props: n, highlight: r, onHighlight: (o) => {
      e.highlight = o, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const o = xn(r);
      e = { holder: r, root: o, unmount: null, props: n, highlight: 0 };
      const c = n.mount(r, {
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
      e.unmount = c, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var a;
      if (!(e != null && e.props)) return !1;
      const { items: r, command: o } = e.props;
      if (r.length === 0) return !1;
      const c = n.key;
      return c === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, r.length - 1), t(e.props), !0) : c === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : c === "Enter" || c === "Tab" ? (n.preventDefault(), o({ field: ((a = r[e.highlight]) == null ? void 0 : a.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Ti = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Ar = ge.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: o,
  onStateChange: c,
  resolveToken: a,
  suggestionItems: f,
  onTokenClick: l,
  onSelectionChange: h
}, s) => {
  const d = g(a);
  d.current = a;
  const u = g(f);
  u.current = f;
  const b = g(l);
  b.current = l;
  const p = g(h);
  p.current = h;
  const y = g(null), v = g(null), S = g(t);
  S.current = t;
  const _ = g(r);
  _.current = r;
  const A = g(c);
  A.current = c;
  const P = g(null), H = (w) => {
    var D;
    const z = {
      bold: w.isActive("bold"),
      italic: w.isActive("italic"),
      underline: w.isActive("underline"),
      strike: w.isActive("strike"),
      link: w.isActive("link"),
      color: w.getAttributes("textStyle").color || ""
    }, R = P.current;
    R && R.bold === z.bold && R.italic === z.italic && R.underline === z.underline && R.strike === z.strike && R.link === z.link && R.color === z.color || (P.current = z, (D = A.current) == null || D.call(A, z));
  }, B = (w) => {
    var J;
    const z = w.state.selection;
    let R = null;
    z instanceof Oe && z.node.type.name === "token" ? (R = { key: z.node.attrs.field ?? "", pos: z.from }, y.current = z.from) : y.current != null && (y.current = w.state.tr.mapping.map(y.current));
    const D = v.current, X = D && R && D.key === R.key && D.pos === R.pos;
    !D && !R || X || (v.current = R, (J = p.current) == null || J.call(p, R));
  }, E = (w) => {
    const z = $r(Tr(w));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, q = ge.useMemo(() => {
    const w = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var R;
        return ((R = u.current) == null ? void 0 : R.call(u, z)) ?? [];
      },
      command: ({ editor: z, range: R, props: D }) => {
        z.chain().focus().insertContentAt(R, { type: "token", attrs: { field: D.field } }).run();
      },
      render: Mr
    };
    return Er.configure({
      resolve: d.current ?? null,
      suggestion: w,
      onTokenClick: (z, R, D) => {
        var X;
        y.current = D, (X = b.current) == null || X.call(b, z, R, D);
      }
    });
  }, []), m = an({
    immediatelyRender: !1,
    extensions: [
      dn,
      fn.configure({ placeholder: n }),
      hn,
      mn,
      gn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      pn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      q
    ],
    content: vt(e || ""),
    editable: !r,
    onUpdate: ({ editor: w }) => {
      S.current(E(w.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: w }) => {
      H(w), B(w);
    }
  });
  return U(() => {
    if (!m || m.isFocused) return;
    E(m.getHTML()) !== e && (P.current = null, m.commands.setContent(vt(e || ""), { emitUpdate: !1 }), H(m));
  }, [e, m]), U(() => {
    m && m.setEditable(!r);
  }, [r, m]), U(() => {
    m && (P.current = null, H(m), B(m));
  }, [m]), Yt(s, () => ({
    exec: (w, z) => {
      if (!(!m || _.current))
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
      !m || _.current || m.chain().focus().insertContent({ type: "token", attrs: { field: w } }).run();
    },
    replaceToken: (w) => {
      if (!m || _.current) return;
      const z = y.current;
      z != null && m.commands.command(({ tr: R }) => {
        const D = R.doc.nodeAt(z);
        if (!D || D.type.name !== "token") return !1;
        R.setNodeMarkup(z, void 0, { field: w });
        const X = R.doc.resolve(z);
        return X.nodeAfter && X.nodeAfter.type.name === "token" && R.setSelection(new Oe(X)), !0;
      });
    }
  }), [m]), /* @__PURE__ */ i(un, { editor: m, className: `richtext-editor ${o || ""}` });
});
Ar.displayName = "RichTextEditor";
const Lr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Pr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], kt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Ei = ({ value: e, disabled: t, onChange: n }) => {
  const [r, o] = W(!1);
  return /* @__PURE__ */ i(
    He,
    {
      open: r,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(Tt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Lr.map((c) => /* @__PURE__ */ i(Sn, { onClick: () => {
        n(c), o(!1);
      }, icon: c === e ? /* @__PURE__ */ i($t, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: c }, children: c }) }, c))
    }
  );
}, Or = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, o] = W(!1), [c, a] = W(""), f = () => {
    var h;
    const l = c.trim();
    l && ((h = e.current) == null || h.exec("link", l), o(!1));
  };
  return /* @__PURE__ */ i(
    He,
    {
      open: r,
      onOpenChange: o,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (l) => l.preventDefault(),
          className: `${Ht} ${n ? Bt : Ft}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(Qt, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ N("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: c,
            onChange: (l) => a(l.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (l) => {
              l.key === "Enter" && (l.preventDefault(), f());
            },
            className: gr + " w-full"
          }
        ),
        /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i("button", { onClick: f, className: Je, disabled: !c.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                var l;
                (l = e.current) == null || l.exec("unlink"), o(!1);
              },
              className: Je,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Ri = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: o }) => {
  const [c, a] = W(!1), f = (s, d) => {
    var u;
    return (u = e.current) == null ? void 0 : u.exec(s, d);
  }, l = (s) => `${Ht} ${s ? Bt : Ft}`, h = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ N("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i($e, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i("button", { "aria-label": "Bold", disabled: t || h("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("bold"), className: `${l(((n == null ? void 0 : n.bold) ?? !1) || h("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ i($e, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i("button", { "aria-label": "Italic", disabled: t || h("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("italic"), className: `${l(((n == null ? void 0 : n.italic) ?? !1) || h("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ i($e, { content: "Underline", children: /* @__PURE__ */ i("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("underline"), className: l((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ i(Zt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i($e, { content: "Strikethrough", children: /* @__PURE__ */ i("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("strikeThrough"), className: l((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ i(Jt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: Le }),
    /* @__PURE__ */ i(Or, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: Le }),
    /* @__PURE__ */ i(
      He,
      {
        open: c,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(kt, {}),
          /* @__PURE__ */ i(Tt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                f("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(kt, { className: "w-3.5 h-3.5" })
            }
          ),
          Pr.map((s) => /* @__PURE__ */ i(
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
    o && /* @__PURE__ */ N(he, { children: [
      /* @__PURE__ */ i("div", { className: Le }),
      o
    ] })
  ] });
};
export {
  hi as Button,
  Jn as Checkbox,
  pi as Checklist,
  Ni as ChromeHeader,
  ki as ContentRow,
  ri as ContextMenu,
  oi as ContextMenuDivider,
  ii as ContextMenuItem,
  si as ContextMenuSub,
  mi as DatePicker,
  ai as DialogProvider,
  Sn as DropdownItem,
  He as DropdownMenu,
  Mn as DropdownSubmenu,
  st as DropdownThemeContext,
  Lr as FONTS,
  bi as FloatingChrome,
  Ei as FontMenu,
  Ri as FormatToolbar,
  T as IS_COARSE,
  vn as IS_TOUCH_CAPABLE,
  ni as ItemManagerDropdown,
  di as LongPressMenuProvider,
  nt as MORPH_EASE,
  ye as MORPH_MS,
  rt as MORPH_OPACITY_MS,
  _e as MenuHighlightContext,
  Vn as Modal,
  ci as ModalFooter,
  Se as ModalFooterButton,
  yn as PopoutWindowContext,
  Ti as RICH_TEXT_STATE_IDLE,
  gi as RadioList,
  Ar as RichTextEditor,
  vi as SectionHeader,
  wi as Seg,
  $i as StructureControls,
  ct as SubmenuContext,
  Je as TB_BTN,
  De as TB_BTN_ICON,
  pr as TB_DANGER,
  Le as TB_DIVIDER,
  gr as TB_INPUT,
  yi as TB_NUM,
  Kt as TB_PICKER,
  xi as TB_ROW_LABEL,
  br as TB_SEG,
  Ht as TB_TOGGLE,
  Ft as TB_TOGGLE_OFF,
  Bt as TB_TOGGLE_ON,
  Er as Token,
  zr as TokenChipView,
  Me as ToolButton,
  $e as Tooltip,
  it as ZOOM_FROM,
  Cn as cloneOverlayClose,
  zi as escapeHtml,
  Lt as getDropdownClasses,
  Qr as getHardwareKeyboard,
  Jr as getLastPointerType,
  cr as isInteractiveElement,
  Ve as isTouchLike,
  St as nearestOverlayOrigin,
  Wt as normalizeSpaces,
  Be as overlayMorphEnabled,
  $n as playOverlayClose,
  Nn as playOverlayOpen,
  vt as preprocessTokenHtml,
  $r as sanitizeRichText,
  Ci as stripRichText,
  Tr as stripTokenWrappers,
  wn as useCurrentDocument,
  we as useCurrentWindow,
  li as useDialog,
  At as useDropdownTheme,
  zn as useFixedPosition,
  ei as useHardwareKeyboard,
  kn as useLastPointerType,
  ui as useLongPressOptOut,
  lt as useMenuHighlight,
  ot as useOverlayMorph,
  tt as usePopoutWindow,
  Ee as usePortalTarget,
  ti as useSmartPosition,
  fi as useTouchMode
};
