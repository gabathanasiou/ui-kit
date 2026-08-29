"use client";
import { jsxs as $, jsx as i, Fragment as he } from "react/jsx-runtime";
import ge, { createContext as ze, useContext as Te, useState as K, useEffect as U, useRef as g, useCallback as G, useLayoutEffect as le, useMemo as Pe, useImperativeHandle as Yt } from "react";
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
  const [, e] = K(0), t = g(xe);
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
    const u = window.matchMedia(a);
    (Nt = u.addEventListener) == null || Nt.call(u, "change", e);
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
  const [, e] = K(0);
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
  const a = (t == null ? void 0 : t()) ?? null, u = a ? St({ left: c.left, top: c.top, width: c.width, height: c.height }, a) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${ye}ms ${nt}, opacity ${rt}ms ease`, r.style.transform = `scale(${it})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, ye + 60));
    });
  });
}
function ot(e) {
  const t = g(null), [n, r] = K(!1), o = g(null), c = g(0), a = G((p) => {
    if (e.ref && (e.ref.current = p), p) {
      c.current = 0, t.current = p;
      const R = p.getBoundingClientRect();
      (R.width > 0 || R.height > 0) && (o.current = { left: R.left, top: R.top, width: R.width, height: R.height }), r(!0);
      return;
    }
    const w = t.current, v = ++c.current;
    queueMicrotask(() => {
      v === c.current && t.current === w && (t.current = null, r(!1), !(!w || !e.cloneOnUnmount || !l.current) && w.style.visibility !== "hidden" && Be(d.current) && Cn(w, s.current, o.current));
    });
  }, []), u = G(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const w = p.getBoundingClientRect();
    (w.width > 0 || w.height > 0) && (o.current = { left: w.left, top: w.top, width: w.width, height: w.height });
  }, []), l = g(e.visible);
  l.current = e.visible;
  const h = g(e.visible), s = g(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const f = g(e.onClosed);
  f.current = e.onClosed;
  const d = g(e.morph !== !1);
  d.current = e.morph !== !1;
  const b = g(0);
  return le(() => {
    if (!n || !l.current || !Be(d.current)) return;
    const p = t.current;
    p && Nn(b, p, s.current);
  }, [n, e.visible]), U(() => {
    if (!n || !l.current) return;
    let p = 0;
    const w = () => {
      p = 0, u(), p = requestAnimationFrame(w);
    };
    return p = requestAnimationFrame(w), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, u]), le(() => {
    var v;
    const p = h.current;
    if (h.current = e.visible, e.visible || !p) return;
    const w = t.current;
    if (!w || !Be(d.current)) {
      (v = f.current) == null || v.call(f);
      return;
    }
    $n(b, w, s.current, () => {
      var R;
      return (R = f.current) == null ? void 0 : R.call(f);
    });
  }, [e.visible]), U(() => {
    if (!n || !l.current) return;
    const p = (w) => {
      const v = t.current;
      v && v.contains(w.target) && w.stopImmediatePropagation();
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
    const a = e.current.getBoundingClientRect(), u = o.getBoundingClientRect(), l = c.innerWidth, h = c.innerHeight, s = u.right - l;
    if (s > 0) {
      const f = Math.min(s + 8, u.left);
      o.style.left = `${u.left - a.left - f}px`;
    }
    u.left < 0 && (o.style.left = `${-a.left + 4}px`), u.bottom > h + 4 && (o.style.top = "auto", o.style.bottom = "100%", o.getBoundingClientRect().top < 0 && (o.style.bottom = "auto", o.style.top = `${-a.top + 4}px`, o.style.maxHeight = `${h - 8}px`));
  }, [t, e]);
}
function zn(e, t, n, r) {
  const o = we(), c = g(o);
  c.current = o, le(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let u = 0;
    const l = () => {
      var W, Y;
      u = 0;
      const d = a.getBoundingClientRect(), b = c.current;
      if (!b) return;
      const p = b.innerWidth, w = ((W = b.visualViewport) == null ? void 0 : W.height) ?? b.innerHeight, v = ((Y = b.visualViewport) == null ? void 0 : Y.offsetTop) ?? 0, R = (r == null ? void 0 : r.panelWidth) ?? Math.max(d.width, 200), P = 4, A = 120;
      let _ = Math.max(0, d.left);
      _ + R > p && (_ = Math.max(0, p - R - 8));
      const C = v + w - d.bottom - P - 16, O = d.top - v - P - 16;
      if (C >= A || C >= O) {
        const m = Math.min(d.bottom + P, v + w), y = Math.max(A, v + w - m - 16);
        n({ top: m, left: _, width: d.width, maxH: y });
      } else {
        const m = Math.max(A, Math.min(O, 360)), y = v + w - (d.top - P);
        n({ top: 0, left: _, width: d.width, maxH: m, bottom: Math.max(0, y) });
      }
    }, h = () => {
      u || (u = requestAnimationFrame(l));
    }, s = c.current ?? null, f = (s == null ? void 0 : s.document) ?? null;
    return h(), f == null || f.addEventListener("scroll", h, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", h), () => {
      u && cancelAnimationFrame(u), f == null || f.removeEventListener("scroll", h, { capture: !0 }), s == null || s.removeEventListener("resize", h);
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
  const e = g([]), [t, n] = K(-1), [r, o] = K(!1), [c, a] = K(0), u = G((f) => (e.current = [...e.current, f], a((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== f), a((d) => d + 1);
  }), []), l = G((f, d) => {
    n(f), o(d === "pointer");
  }, []), h = G(() => {
    o((f) => f && (n(-1), !1));
  }, []);
  return Pe(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: u,
    setHighlighted: l,
    pointerLeave: h
  }), [t, r, c, u, l, h]);
}
function ut(e, t, n, r) {
  const o = g(-1);
  o.current = t.highlightedIndex;
  const c = g(t);
  c.current = t;
  const a = g(e);
  a.current = e;
  const u = g(r);
  u.current = r;
  const l = g({ text: "", time: 0 }), h = g(!1);
  h.current || (h.current = !0, n.current = (s) => {
    var d, b;
    if (!a.current) return;
    const f = c.current.items;
    if (f.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = s.key === "ArrowDown" ? 1 : -1, w = (o.current + p + f.length) % f.length;
        c.current.setHighlighted(w, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = o.current;
        p >= 0 && p < f.length && f[p].submenu && f[p].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (b = (d = u.current) == null ? void 0 : d.onCloseSub) == null || b.call(d);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = o.current;
        p >= 0 && p < f.length && f[p].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = Date.now(), w = (p - l.current.time > 500 ? "" : l.current.text) + s.key.toLowerCase();
        if (l.current = { text: w, time: p }, !w) return;
        const v = o.current + 1;
        for (let R = 0; R < f.length; R++) {
          const P = (v + R) % f.length;
          if (f[P].label.toLowerCase().startsWith(w)) {
            c.current.setHighlighted(P, "keyboard");
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
  const u = g(e);
  u.current = e;
  const l = g(o);
  l.current = o;
  const h = g(!1);
  h.current || (h.current = !0, c.current = (s) => {
    if (!u.current || l.current) return;
    const f = r.current;
    f && f.contains(s.target) || a.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
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
  children: u,
  morph: l = !0,
  contentClassName: h,
  initialHighlightIndex: s
}) {
  const [f, d] = K([]), [b, p] = K(null), w = Ee(), v = g(null), R = g(null), P = g(e);
  P.current = e;
  const [A, _] = K(e), C = at();
  U(() => {
    if (e)
      return _(!0), C.setHighlighted(s ?? -1, "keyboard"), Mt(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, s, n, t]);
  const O = G(() => {
    const H = v.current;
    if (!H) return null;
    const ee = H.getBoundingClientRect();
    return { left: ee.left, top: ee.top, width: ee.width, height: ee.height };
  }, []), W = ot({
    visible: e,
    morph: l,
    anchor: O,
    onClosed: () => _(!1)
  }), Y = g(() => {
  }), m = g(() => {
  }), y = g(() => {
  });
  ut(e && f.length === 0, C, Y), ft(e, m), dt(e, C, Y, R, f.length > 0, y);
  const z = g(null), E = G((H) => {
    var ee;
    if (H) {
      H.addEventListener("keydown", Y.current, { capture: !0 }), H.addEventListener("wheel", m.current, { passive: !1 });
      const x = H.ownerDocument;
      z.current = x, x.addEventListener("keydown", y.current, { capture: !0 }), S(H.offsetWidth), X(!0);
    } else
      (ee = z.current) == null || ee.removeEventListener("keydown", y.current, { capture: !0 }), z.current = null, X(!1);
    R.current = H, W(H);
  }, [W]), [D, V] = K({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [N, F] = K(0), [Q, X] = K(!1), [re, S] = K(0);
  U(() => {
    e && v.current && F(v.current.getBoundingClientRect().width);
  }, [e]);
  const B = Pe(() => ({ panelWidth: re || N || void 0 }), [re, N]);
  zn(v, e && Q, (H) => V({ ...H, maxH: Math.min(H.maxH, 384), ready: !0 }), B), U(() => {
    if (D.ready && e) {
      const H = R.current;
      H && H.ownerDocument.activeElement !== H && !H.contains(H.ownerDocument.activeElement) && H.focus();
    }
  }, [D.ready, e]), le(() => {
    var ee;
    if (!e || C.highlightedIndex < 0) return;
    const H = (ee = R.current) == null ? void 0 : ee.querySelector(`[data-ei="${C.highlightedIndex}"]`);
    H == null || H.scrollIntoView({ block: "nearest" });
  }, [e, C.highlightedIndex]);
  const L = G((H) => {
    !H && !P.current || (!H && Z.current && (ce.current = !0), n ? n(H) : H || t == null || t());
  }, [n, t]), k = g(A);
  k.current = A;
  const Z = g(!1), ce = g(!1), me = G(() => {
    if (!P.current && k.current) {
      if (ce.current) {
        ce.current = !1, Z.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), de = ge.isValidElement(r) ? r : null, ae = de ? ge.cloneElement(de, {
    ref: (H) => {
      v.current = H;
    },
    onPointerDown: () => {
      Z.current = !0, ce.current = !1;
    },
    onClick: (H) => {
      var ee, x;
      (x = (ee = de.props).onClick) == null || x.call(ee, H), me();
    }
  }) : r;
  return /* @__PURE__ */ $(j.Root, { open: e || A, onOpenChange: L, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: ae }),
    /* @__PURE__ */ i(j.Portal, { container: w ?? void 0, children: /* @__PURE__ */ i(st.Provider, { value: a, children: /* @__PURE__ */ i(ct.Provider, { value: { chain: f, setChain: d, morph: l, keyboardOpened: b, setKeyboardOpened: p }, children: /* @__PURE__ */ i(_e.Provider, { value: C, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: E,
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
function ni({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: o,
  onRename: c,
  onDuplicate: a,
  onDelete: u,
  onCreate: l,
  onImport: h,
  onExport: s,
  onReset: f,
  onTrash: d,
  closeOnSelect: b,
  readOnly: p = !1,
  theme: w,
  align: v,
  label: R,
  header: P,
  itemLabel: A,
  trigger: _,
  minItems: C = 1,
  itemRender: O,
  morph: W = !0,
  contentClassName: Y
}) {
  const m = Lt(), [y, z] = K(null), [E, D] = K(""), V = g(null), N = g(null);
  U(() => {
    e && requestAnimationFrame(() => {
      var S, B;
      (B = (S = N.current) == null ? void 0 : S.querySelector('[data-active="1"]')) == null || B.scrollIntoView({ block: "nearest" });
    });
  }, [e]), U(() => {
    var L;
    if (!e) return;
    const S = (k) => {
      var pe, H, ee, x, I;
      if ((H = (pe = k.target) == null ? void 0 : pe.closest) != null && H.call(pe, "input, textarea, [contenteditable]")) return;
      const Z = (ee = N.current) == null ? void 0 : ee.closest(".ui-menu");
      if (!Z || !Z.contains(k.target)) return;
      const ce = Z.ownerDocument, me = [...Z.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], de = [...Z.querySelectorAll('div:last-child > [role="menuitem"]')], ae = [...me, ...de];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const M = ce.activeElement;
        let J = M ? ae.indexOf(M) : -1;
        if (J < 0 && M) {
          const ie = M.closest("[data-active]"), te = ie == null ? void 0 : ie.querySelector('[role="menuitem"]:first-child');
          te && (J = me.indexOf(te));
        }
        const q = k.key === "ArrowDown" ? 1 : -1, ne = J < 0 ? q === 1 ? 0 : ae.length - 1 : (J + q + ae.length) % ae.length;
        (x = ae[ne]) == null || x.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const M = ce.activeElement, J = M == null ? void 0 : M.closest("[data-active]");
        if (!J) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const q = [...J.querySelectorAll('[role="menuitem"]')].slice(1);
        if (q.length === 0) return;
        const ne = M && J.contains(M) ? q.indexOf(M) : -1, ie = k.key === "ArrowRight" ? 1 : -1, te = ne < 0 ? 0 : (ne + ie + q.length) % q.length;
        (I = q[te]) == null || I.focus({ preventScroll: !0 });
        return;
      }
    }, B = ((L = N.current) == null ? void 0 : L.ownerDocument) ?? null;
    return B == null || B.addEventListener("keydown", S, { capture: !0 }), () => B == null ? void 0 : B.removeEventListener("keydown", S, { capture: !0 });
  }, [e]), U(() => {
    if (y) {
      requestAnimationFrame(() => {
        var B, L;
        (B = V.current) == null || B.focus(), (L = V.current) == null || L.select();
      });
      const S = n.find((B) => B.id === y);
      S && !E && D(S.name);
    }
  }, [y]), U(() => {
    if (y) {
      const S = n.find((B) => B.id === y);
      S && !E && D(S.name);
    }
  }, [y, n]);
  const F = (S, B) => {
    z(S), D(B);
  }, Q = () => {
    y && E.trim() && c(y, E.trim()), z(null);
  }, X = () => {
    z(null);
  }, re = A || P.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ $(He, { open: e, onOpenChange: (S) => {
    S ? (z(null), D("")) : (y && E.trim() && c(y, E.trim()), z(null), D("")), (!S || !p) && t(S);
  }, width: "w-80", theme: w, align: v, trigger: _, morph: W, contentClassName: Y, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${m.headerText}`, children: P }),
    /* @__PURE__ */ i("div", { ref: N, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((S) => {
      const B = S.id === r, L = y === S.id;
      return /* @__PURE__ */ i("div", { "data-active": B ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${B || L ? m.rowActiveBg : m.rowHoverBg} ${y && !L ? "opacity-40 pointer-events-none" : ""}`, children: L ? /* @__PURE__ */ $(he, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: V,
            value: E,
            onChange: (k) => D(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), Q()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), X());
            },
            className: `w-full border rounded ${m.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${m.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), Q();
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
              k.preventDefault(), X();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(Ue, { className: m.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ $(he, { children: [
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `flex-1 min-w-0 ${m.itemPad} rounded outline-none cursor-pointer flex items-center ${m.rowText} ${B ? "" : m.rowTextHover}`,
            onSelect: b ? () => {
              o(S.id);
            } : (k) => {
              k.preventDefault(), o(S.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${B ? m.rowActiveText : ""}`, children: O ? O(S) : S.name })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${B ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), F(S.id, S.name);
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
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${B ? m.btnActive : m.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const Z = a(S.id);
              Z && F(Z, `${S.name} Copy`);
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
            className: `shrink-0 ${m.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= C ? m.btnDisabled : B ? m.btnDangerActive : m.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), u(S.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= C,
            children: /* @__PURE__ */ i(je, { className: m.btnIcon })
          }
        )
      ] }) }, S.id);
    }) }),
    /* @__PURE__ */ $("div", { className: `shrink-0 ${y ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ $(he, { children: [
        /* @__PURE__ */ i(j.Separator, { className: m.separator }),
        /* @__PURE__ */ $(
          j.Item,
          {
            className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
            onSelect: (S) => {
              S.preventDefault(), f();
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
      (l || h || s || d) && /* @__PURE__ */ i(j.Separator, { className: m.separator }),
      l && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (S) => {
            S.preventDefault();
            const B = l();
            B && F(B, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(jt, { className: `${m.btnIcon} ${m.icon}` }),
            "New ",
            re
          ]
        }
      ),
      h && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (S) => {
            S.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: p,
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
      s && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (S) => {
            S.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: p,
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
        j.Item,
        {
          className: `w-full text-left ${m.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${m.itemDefault} ui-row`,
          onSelect: (S) => {
            S.preventDefault(), d();
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
  selected: u = !1,
  rightAction: l,
  trailing: h
}) {
  At();
  const s = Lt(), f = g(!1), d = g(null), b = lt(), p = g(b);
  p.current = b;
  const w = g(null);
  U(() => {
    var _;
    const A = {
      label: Pt(c),
      activate: () => {
        n || e();
      }
    };
    return w.current = A, (_ = p.current) == null ? void 0 : _.register(A);
  }, []);
  const v = b && w.current ? b.items.indexOf(w.current) : -1, R = !n && v >= 0 && v === b.highlightedIndex, P = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ $(
    j.Item,
    {
      ref: d,
      "data-ei": v >= 0 ? v : void 0,
      className: `w-full text-left ${Rn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${P} ${u ? "ui-item-selected" : ""} ${R ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${o}`,
      onSelect: (A) => {
        if (f.current) {
          f.current = !1;
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
              A.stopPropagation(), A.preventDefault(), f.current = !0, l.onClick();
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
  const { chain: u, setChain: l, morph: h, keyboardOpened: s, setKeyboardOpened: f } = Te(ct), d = u.includes(e), b = u[u.length - 1] === e, p = At(), w = Ee(), v = g(null), R = g(null), [P, A] = K(d), _ = !d && P;
  U(() => {
    d && A(!0);
  }, [d]);
  const C = () => l((L) => {
    const k = L.indexOf(e);
    return k >= 0 ? L.slice(0, k) : L;
  }), O = at(), W = lt(), Y = g(W);
  Y.current = W;
  const m = g(null);
  U(() => {
    var k;
    const L = {
      label: t,
      activate: () => {
        f(e), l((Z) => Z.includes(e) ? Z : [...Z, e]);
      },
      submenu: !0
    };
    return m.current = L, (k = Y.current) == null ? void 0 : k.register(L);
  }, []);
  const y = W && m.current ? W.items.indexOf(m.current) : -1, z = y >= 0 && y === W.highlightedIndex, E = G(() => {
    const L = v.current;
    if (!L) return null;
    const k = L.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), D = ot({
    visible: d,
    morph: h,
    anchor: E,
    onClosed: () => A(!1)
  }), V = g(() => {
  }), N = g(() => {
  }), F = g(() => {
  });
  ut(d && b, O, V, {
    onCloseSub: () => {
      C(), W && y >= 0 && W.setHighlighted(y, "keyboard");
    }
  });
  const Q = g(s);
  Q.current = s, U(() => {
    d && (Q.current === e ? (O.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var L;
      return (L = R.current) == null ? void 0 : L.focus();
    }), f(null)) : O.setHighlighted(-1, "keyboard"));
  }, [d]), ft(d, N), dt(d, O, V, R, !b, F), ge.useLayoutEffect(() => {
    var k;
    if (!d || O.highlightedIndex < 0) return;
    const L = (k = R.current) == null ? void 0 : k.querySelector(`[data-ei="${O.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [d, O.highlightedIndex]);
  const X = g(null), re = G((L) => {
    var k;
    if (L) {
      L.addEventListener("keydown", V.current, { capture: !0 }), L.addEventListener("wheel", N.current, { passive: !1 });
      const Z = L.ownerDocument;
      X.current = Z, Z.addEventListener("keydown", F.current, { capture: !0 });
    } else
      (k = X.current) == null || k.removeEventListener("keydown", F.current, { capture: !0 }), X.current = null;
    R.current = L, D(L);
  }, [D]), S = `w-full text-left ${Dn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${z ? " ui-item-highlighted" : ""}${_ ? " ui-sub-closing" : ""}`, B = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ $(j.Sub, { open: d || P, onOpenChange: (L) => l((k) => {
    if (!L) {
      const Z = k.indexOf(e);
      return Z >= 0 ? k.slice(0, Z) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ $(
      j.SubTrigger,
      {
        ref: v,
        "data-ei": y >= 0 ? y : void 0,
        className: S,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          W && y >= 0 && W.setHighlighted(y, "pointer");
        },
        onPointerDown: (L) => {
          L.pointerType === "pen" && (L.preventDefault(), l((k) => d ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          o === "left" && /* @__PURE__ */ i(Xe, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ $("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          o === "right" && /* @__PURE__ */ i(Xe, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(j.Portal, { container: w ?? void 0, children: /* @__PURE__ */ i(
      j.SubContent,
      {
        ref: re,
        "data-theme": p,
        className: B,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: O.pointerLeave,
        children: /* @__PURE__ */ i(_e.Provider, { value: O, children: c })
      }
    ) })
  ] });
}
const ke = 8, An = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Ln = T ? "text-sm" : "text-xs", ri = ({ open: e, x: t, y: n, onClose: r, children: o, containerRef: c, morph: a = !0 }) => {
  const u = g(null), l = we(), [h, s] = K(!1), [f, d] = K([]), [b, p] = K(null), w = at();
  U(() => {
    if (e)
      return w.setHighlighted(-1, "keyboard"), Mt(r);
  }, [e, r]);
  const v = g({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const R = G(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), P = ot({
    visible: !0,
    morph: a,
    anchor: R,
    cloneOnUnmount: !0
  }), A = g(() => {
  }), _ = g(() => {
  }), C = g(() => {
  });
  ut(e, w, A), ft(e, _), dt(e, w, A, u, f.length > 0, C);
  const O = g(null), W = G((y) => {
    var z;
    if (y) {
      y.addEventListener("keydown", A.current, { capture: !0 }), y.addEventListener("wheel", _.current, { passive: !1 });
      const E = y.ownerDocument;
      O.current = E, E.addEventListener("keydown", C.current, { capture: !0 });
    } else
      (z = O.current) == null || z.removeEventListener("keydown", C.current, { capture: !0 }), O.current = null;
    u.current = y, s(!!y), P(y);
  }, [P]), [Y, m] = K(null);
  return le(() => {
    var S;
    if (!e || !h || !u.current) return;
    const y = u.current, z = y.offsetWidth, E = y.offsetHeight, D = (S = c == null ? void 0 : c.current) == null ? void 0 : S.getBoundingClientRect(), V = D ? D.right : (l == null ? void 0 : l.innerWidth) ?? 0, N = D ? D.bottom : (l == null ? void 0 : l.innerHeight) ?? 0, F = D ? D.left : 0, Q = D ? D.top : 0;
    let X = Math.max(Q + ke, v.current.top), re = Math.max(F + ke, v.current.left);
    re + z > V && (re = V - z - ke), X + E > N && (X = Math.max(Q + ke, N - E - ke)), m({ left: re, top: X });
  }, [e, h, t, n, c]), e ? /* @__PURE__ */ $(j.Root, { open: e, onOpenChange: (y) => {
    y || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(j.Portal, { children: /* @__PURE__ */ i(st.Provider, { value: "light", children: /* @__PURE__ */ i(ct.Provider, { value: { chain: f, setChain: d, morph: a, keyboardOpened: b, setKeyboardOpened: p }, children: /* @__PURE__ */ i(_e.Provider, { value: w, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: W,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Ln} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (Y == null ? void 0 : Y.left) ?? v.current.left, top: (Y == null ? void 0 : Y.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: w.pointerLeave,
        children: o
      }
    ) }) }) }) })
  ] }) : null;
}, ii = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: o = !1, trailing: c, children: a }) => {
  const u = lt(), l = g(u);
  l.current = u;
  const h = g(null);
  U(() => {
    var b;
    const d = { label: Pt(a), activate: () => {
      r || e();
    } };
    return h.current = d, (b = l.current) == null ? void 0 : b.register(d);
  }, []);
  const s = u && h.current ? u.items.indexOf(h.current) : -1, f = !r && s >= 0 && s === u.highlightedIndex;
  return /* @__PURE__ */ $(
    j.Item,
    {
      "data-ei": s >= 0 ? s : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && s >= 0 && u.setHighlighted(s, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${An} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${o ? "ui-item-selected" : ""} ${f ? "ui-item-highlighted" : ""}`,
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
  onReset: u,
  morph: l = !0,
  flat: h = !1,
  closable: s = !0
}) {
  const f = g(null), d = g(null), b = g(null), [p, w] = K(!1), v = G((x) => {
    f.current = x, w(x !== null);
  }, []), R = Ee(), P = we(), A = g(P);
  A.current = P;
  const [_, C] = K(null), O = g(null), W = g(!1), Y = g(!1), [m, y] = K(!1), z = g(0), E = g(!1), [D, V] = K(!1), N = g(l);
  N.current = l;
  const F = g(!1), Q = g(!1), X = () => {
    Q.current = !0, y(!0);
  }, re = () => {
    Q.current = !1, y(!1);
  };
  U(() => {
    e || (C(null), Y.current = !1, W.current = !1);
  }, [e]), le(() => {
    var J, q;
    if (!e || Y.current || !p || !f.current) return;
    Y.current = !0;
    const x = f.current.getBoundingClientRect(), I = ((J = A.current) == null ? void 0 : J.innerWidth) ?? 0, M = ((q = A.current) == null ? void 0 : q.innerHeight) ?? 0;
    C({
      left: Math.max(oe, Math.min((I - x.width) / 2, I - x.width - oe)),
      top: Math.max(oe, Math.min((M - x.height) / 2, M - x.height - oe))
    });
  }, [e, p]), le(() => {
    if (!e || !p || !l || Ne() || !f.current) return;
    const x = f.current, I = Fe(x), M = I[I.length - 1];
    X(), M ? bt(z, x, M.getBoundingClientRect(), re) : Pn(z, x, re);
  }, [e, p]);
  const S = G(() => {
    if (!s || E.current) return;
    const x = f.current, I = !!x && Fe(x).length > 0;
    if (!x || !l || Ne() || I) {
      t();
      return;
    }
    E.current = !0, V(!0), F.current = !0, X(), xt(z, x, () => {
      E.current = !1, V(!1), re(), t();
    });
  }, [l, t, s]);
  le(() => () => {
    const x = f.current;
    if (!x || F.current || !N.current || Ne() || Fe(x).length > 0) return;
    const I = x.ownerDocument, M = x.cloneNode(!0);
    M.removeAttribute("data-modal-stack"), M.removeAttribute("data-state"), M.removeAttribute("role"), M.removeAttribute("data-aria-hidden"), M.removeAttribute("tabindex"), M.setAttribute("aria-hidden", "true"), M.style.pointerEvents = "none", I.body.appendChild(M), xt({ current: 0 }, M, () => {
      M.isConnected && M.remove();
    });
  }, []), U(() => {
    if (!e || !p || !l || !f.current) return;
    const x = f.current, I = x.parentNode;
    if (!I) return;
    let M = 0, J = null, q = !1;
    const ne = () => {
      M = 0;
      const te = Ke(x);
      te.length > 0 ? (J = te[te.length - 1].getBoundingClientRect(), q = !0, M = requestAnimationFrame(ne)) : q && (q = !1, J && !Ne() && (X(), bt(z, x, J, re)), J = null);
    }, ie = new MutationObserver(() => {
      !M && Ke(x).length > 0 && (M = requestAnimationFrame(ne));
    });
    return ie.observe(I, { childList: !0 }), () => {
      ie.disconnect(), M && cancelAnimationFrame(M);
    };
  }, [e, p]), U(() => {
    if (!p || !l || Ne() || !f.current) return;
    const x = f.current;
    let I = Math.round(x.getBoundingClientRect().height), M = !1;
    const J = new ResizeObserver(() => {
      var mt;
      if (!x.isConnected) return;
      const q = Math.round(x.getBoundingClientRect().height);
      if (!M) {
        M = !0, I = q;
        return;
      }
      if (Math.abs(q - I) < 1) return;
      if (O.current || E.current || Ke(x).length > 0) {
        I = q;
        return;
      }
      if (Q.current) return;
      const ne = I;
      I = q, X();
      const ie = x.getBoundingClientRect(), te = !W.current, ve = ((mt = A.current) == null ? void 0 : mt.innerHeight) ?? 0, qt = te ? (ve - ne) / 2 : ie.top, ht = te ? (ve - q) / 2 : ie.top;
      x.style.transition = "none", x.style.height = `${ne}px`, te && (x.style.top = `${qt}px`), d.current && (d.current.style.overflow = "hidden"), x.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          x.style.height === `${ne}px` && (x.style.transition = `height ${ue}ms ${Ce}${te ? `, top ${ue}ms ${Ce}` : ""}`, x.style.height = `${q}px`, te && (x.style.top = `${ht}px`), window.setTimeout(() => {
            x.style.height === `${q}px` && (x.style.transition = "", x.style.height = "", d.current && (d.current.style.overflow = ""), te && C({ left: ie.left, top: ht }), re());
          }, ue + 60));
        });
      });
    });
    return J.observe(x), () => J.disconnect();
  }, [p]);
  const B = G(() => {
    const x = f.current;
    if (!x) return null;
    const I = x.getBoundingClientRect();
    return { left: I.left, top: I.top, width: I.width, height: I.height };
  }, []), L = G((x, I) => {
    var te, ve;
    const M = ((te = A.current) == null ? void 0 : te.innerWidth) ?? 0, J = ((ve = A.current) == null ? void 0 : ve.innerHeight) ?? 0, q = B(), ne = q ? q.width : Math.min(M - oe * 2, 576), ie = q ? q.height : Math.min(J - oe * 2, 400);
    return {
      left: Math.max(oe, Math.min(x, M - ne - oe)),
      top: Math.max(oe, Math.min(I, J - ie - oe))
    };
  }, [B]), k = G((x) => {
    if (x.target.closest("button")) return;
    W.current = !0;
    const I = B();
    I && (C(L(I.left, I.top)), O.current = { startX: x.clientX, startY: x.clientY, posX: I.left, posY: I.top }, x.target.setPointerCapture(x.pointerId));
  }, [B, L]), Z = G((x) => {
    const I = O.current;
    I && (x.preventDefault(), C(L(I.posX + x.clientX - I.startX, I.posY + x.clientY - I.startY)));
  }, [L]), ce = G(() => {
    O.current = null;
  }, []), me = O.current !== null, de = _ !== null, ae = de ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${o ? `${o} w-full` : "max-w-xl w-full"}`, H = {
    ...de ? { left: _.left, top: _.top } : {},
    width: `min(100%, calc(100vw - ${oe * 2}px))`,
    maxHeight: `calc(100vh - ${oe * 2}px)`
  }, ee = G((x) => {
    if (x.key !== "Enter" || x.shiftKey || x.metaKey || x.ctrlKey || x.altKey || x.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const M = b.current;
    if (!M) return;
    const J = Array.from(M.querySelectorAll("button[data-modal-confirm]")), q = J.length > 0 ? J : Array.from(M.querySelectorAll("button")), ne = q[q.length - 1];
    !ne || ne.disabled || (x.preventDefault(), ne.click());
  }, []);
  return /* @__PURE__ */ i(fe.Root, { open: e, onOpenChange: (x) => {
    x || S();
  }, children: /* @__PURE__ */ $(fe.Portal, { container: R ?? void 0, children: [
    /* @__PURE__ */ i(
      fe.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${D ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (x) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (x.preventDefault(), S());
        }
      }
    ),
    /* @__PURE__ */ $(
      fe.Content,
      {
        ref: v,
        onKeyDown: ee,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ae} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(H).length > 0 ? H : {} },
        children: [
          h ? /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${We} ${Kn} pb-4 ${me ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (x) => {
                m || k(x);
              },
              onPointerMove: Z,
              onPointerUp: ce,
              children: [
                /* @__PURE__ */ i(fe.Title, { className: `${Bn} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ i(fe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(Ue, { className: Fn }) })
              ]
            }
          ) : /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${On} ${In} border-b border-zinc-800 shrink-0 bg-zinc-950 ${me ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (x) => {
                m || k(x);
              },
              onPointerMove: Z,
              onPointerUp: ce,
              children: [
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(fe.Title, { className: `${_n} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ $("button", { onClick: u, className: `flex items-center gap-1 ${qn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Un} shrink-0`, children: [
                    /* @__PURE__ */ i(zt, { className: Yn }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(fe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(Ue, { className: Hn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: d, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${h ? ` ${We} pb-4` : ""}`, children: a }),
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
function Jn({ checked: e, onChange: t, disabled: n = !1, label: r, id: o, className: c = "", labelClassName: a = "", theme: u, variant: l = "pill", tone: h = "accent", block: s = !1 }) {
  const f = l !== "plain", d = T ? "w-5 h-5" : "w-4 h-4", b = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", p = T ? "w-3.5 h-3.5" : "w-3 h-3", w = T ? "text-sm" : "text-xs";
  return /* @__PURE__ */ $(
    "label",
    {
      className: `ui-checkbox ${f ? `ui-checkbox-pill ${T ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${h === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${c}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: T ? 10 : 8 },
      onClick: (R) => R.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: o,
            checked: e,
            disabled: n,
            onChange: (R) => t(R.target.checked),
            className: "sr-only"
          }
        ),
        f ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ $("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: `ui-checkbox-box ${b}`, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", className: p, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${w} ${a}`, children: r })
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
  const [t, n] = K(null), [r, o] = K(!1), c = g(null), a = G((d) => {
    if (d.suppressKey) {
      const b = localStorage.getItem(d.suppressKey);
      if (b && Date.now() < parseInt(b, 10))
        return Promise.resolve(!0);
    }
    return new Promise((b) => {
      o(!1), n({ kind: "confirm", options: d, resolve: b });
    });
  }, []), u = G((d) => new Promise((b) => {
    n({ kind: "prompt", options: d, resolve: b });
  }), []), l = G((d) => new Promise((b) => {
    n({ kind: "alert", options: d, resolve: b });
  }), []);
  U(() => {
    if (t) {
      const d = setTimeout(() => {
        var b;
        return (b = c.current) == null ? void 0 : b.focus();
      }, 50);
      return () => clearTimeout(d);
    }
  }, [t]);
  const h = G(() => {
    var d, b;
    if (t) {
      if (t.kind === "confirm") {
        const p = t.options;
        p.suppressKey && r && localStorage.setItem(p.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((b = (d = c.current) == null ? void 0 : d.value) == null ? void 0 : b.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), s = t !== null;
  U(() => {
    if (!s) return;
    const d = (b) => {
      b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey || b.isComposing || (b.preventDefault(), b.stopImmediatePropagation(), h());
    };
    return document.addEventListener("keydown", d, !0), () => document.removeEventListener("keydown", d, !0);
  }, [s, h]);
  const f = G(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ $(_t.Provider, { value: { confirm: a, prompt: u, alert: l }, children: [
    e,
    /* @__PURE__ */ i(
      Vn,
      {
        open: s,
        onClose: f,
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ $(he, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(Se, { variant: "ghost", onClick: f, children: "Cancel" }),
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
        children: /* @__PURE__ */ $("div", { className: Qn, children: [
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
    const u = a - o, l = Math.min(u / t, 1);
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
        children: /* @__PURE__ */ $("svg", { ref: r, width: se, height: se, viewBox: `0 0 ${se} ${se}`, children: [
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
  const [a, u] = K(null), l = wn(), h = g(null), s = g(null), f = g({ x: 0, y: 0, target: null }), d = g(!1), b = Math.min(rr, n * 0.5), p = g(o);
  p.current = o;
  const w = g(c);
  return w.current = c, U(() => {
    if (!T || !l) return;
    const v = (_) => {
      if (!Ve(_.pointerType) || _.button !== 0) return;
      const C = _.target;
      if (!C.closest(r) || (p.current ? !p.current(C) : cr(C))) return;
      const O = _.clientX, W = _.clientY;
      f.current = { x: O, y: W, target: _.target }, d.current = !0, t && (s.current = setTimeout(() => u({ x: O, y: W }), b)), h.current = setTimeout(() => {
        if (!d.current) return;
        s.current && (clearTimeout(s.current), s.current = null), u(null);
        const Y = f.current.target;
        if (!Y) return;
        const m = w.current;
        if (m) {
          m(Y, O, W);
          return;
        }
        const y = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: O,
          clientY: W,
          button: 2,
          view: window
        });
        Y.dispatchEvent(y);
      }, n);
    }, R = (_) => {
      if (!d.current || h.current === null) return;
      const C = _.clientX - f.current.x, O = _.clientY - f.current.y;
      Math.sqrt(C * C + O * O) > ir && (clearTimeout(h.current), h.current = null, s.current && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    }, P = () => {
      h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null);
    }, A = (_) => {
      Ve(_.pointerType) && (h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    };
    return l == null || l.addEventListener("pointerdown", v), l.addEventListener("pointermove", R), l.addEventListener("pointerup", P), l.addEventListener("pointercancel", P), l.addEventListener("pointerleave", A), () => {
      l.removeEventListener("pointerdown", v), l.removeEventListener("pointermove", R), l.removeEventListener("pointerup", P), l == null || l.removeEventListener("pointercancel", P), l == null || l.removeEventListener("pointerleave", A), h.current !== null && clearTimeout(h.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, b, r]), /* @__PURE__ */ $(he, { children: [
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
  const a = c["data-state"] === "open", u = ar[t][e];
  let l = `${u.base} ${a ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (l = a ? `${wt} ${ur}` : wt), /* @__PURE__ */ i("button", { type: o, className: `${lr} ${l} ${r}`, ...c });
}
const dr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], fr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], qe = 1900, Ye = 2100;
function hr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function mr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function mi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: o = "" }) {
  const c = /* @__PURE__ */ new Date(), [a, u] = K(c.getFullYear()), [l, h] = K(c.getMonth()), [s, f] = K("days"), [d, b] = K(null), p = Pe(() => new Set(e), [e]), w = (N) => {
    p.has(N) ? t(e.filter((F) => F !== N)) : t([...e, N]);
  }, v = Pe(() => {
    const N = hr(a, l), F = new Date(a, l, 1).getDay(), Q = [];
    for (let X = 0; X < F; X++) Q.push({ key: `pad-${X}`, day: 0, empty: !0 });
    for (let X = 1; X <= N; X++) Q.push({ key: mr(a, l, X), day: X, empty: !1 });
    return Q;
  }, [a, l]), R = (N) => u((F) => Math.max(qe, Math.min(Ye, F + N))), P = (N) => {
    l + N < 0 ? (u((F) => Math.max(qe, F - 1)), h(11)) : l + N > 11 ? (u((F) => Math.min(Ye, F + 1)), h(0)) : h((F) => F + N);
  }, A = () => {
    if (d === null) return;
    const N = parseInt(d, 10);
    !isNaN(N) && N >= qe && N <= Ye && u(N), b(null);
  }, _ = (N) => e.some((F) => F.startsWith(`${a}-${String(N + 1).padStart(2, "0")}`)), C = n === "dark", O = T ? "p-2" : "p-1", W = T ? "w-5 h-5" : "w-4 h-4", Y = T ? "text-[11px] py-2" : "text-[10px] py-1.5", m = T ? "py-2.5 text-sm" : "py-1.5 text-xs", y = T ? "py-3 text-sm" : "py-2 text-xs", z = T ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", E = T ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${C ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, D = C ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", V = C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ $("div", { className: `border rounded-lg overflow-hidden w-full ${C ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${o}`, children: [
    /* @__PURE__ */ $("div", { className: `flex items-center justify-between px-3 py-2 border-b ${C ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => s === "months" ? R(-1) : P(-1),
          className: `${O} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": s === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(Xt, { className: W })
        }
      ),
      s === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => f("months"),
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
          onChange: (N) => b(N.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (N) => N.target.select(),
          onBlur: A,
          onKeyDown: (N) => {
            N.key === "Enter" && (N.preventDefault(), A()), N.key === "Escape" && b(null);
          },
          className: E
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => s === "months" ? R(1) : P(1),
          className: `${O} rounded transition-colors ${C ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": s === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(Xe, { className: W })
        }
      )
    ] }),
    s === "months" ? /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: fr.map((N, F) => /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: () => {
            h(F), f("days");
          },
          className: `${y} relative font-medium transition-colors border-b ${F === l ? D : V} ${C ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            N,
            _(F) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${F === l ? "bg-white" : C ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        N
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${C ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            u(c.getFullYear()), h(c.getMonth()), f("days");
          },
          className: `px-3 ${T ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${C ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ $("div", { className: "grid grid-cols-7 text-center", children: [
      dr.map((N) => /* @__PURE__ */ i("div", { className: `${Y} font-semibold uppercase tracking-wider border-b ${C ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: N }, N)),
      v.map((N) => N.empty ? /* @__PURE__ */ i("div", {}, N.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => w(N.key),
          className: `${m} font-medium transition-colors border-b ${C ? "border-zinc-800/60" : "border-zinc-50"} ${p.has(N.key) ? D : C ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
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
        const F = /* @__PURE__ */ new Date(N + "T00:00:00"), Q = F.getFullYear() === c.getFullYear() ? F.toLocaleString("default", { month: "short", day: "numeric" }) : F.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
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
function pi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: o,
  allSelected: c = !1,
  toggleAllLabel: a,
  emptyHint: u = "Nothing here",
  maxHeight: l,
  disabled: h = !1,
  theme: s,
  className: f = ""
}) {
  const d = (v) => t instanceof Set ? t.has(v) : t.includes(v), b = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", w = r != null || o != null;
  return /* @__PURE__ */ $("div", { className: f, ...s ? { "data-theme": s } : {}, children: [
    w && /* @__PURE__ */ $("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      o != null && /* @__PURE__ */ i("button", { type: "button", disabled: h, onClick: o, className: "ui-checklist-toggleall", children: a ?? (c ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${h ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((v) => {
            const R = d(v.id);
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: h,
                onClick: () => n(v.id),
                className: `ui-checklist-item ${b} ${R ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-checklist-box ${p}`, "aria-hidden": !0, children: R && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
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
function gi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: o = "Nothing here",
  maxHeight: c,
  compact: a = !1,
  disabled: u = !1,
  theme: l,
  className: h = ""
}) {
  const s = a ? "px-2.5 py-1.5 text-xs" : T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", f = a ? "w-3.5 h-3.5" : T ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ $("div", { className: h, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((d) => {
            const b = t === d.id;
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(d.id),
                className: `ui-checklist-item ${s} ${b ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-radio-circle ${f}`, "aria-hidden": !0, children: b && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  d.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: d.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: d.label }),
                  d.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: d.secondary })
                ]
              },
              d.id
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
  const a = we(), { refs: u, floatingStyles: l } = en({
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
          var P;
          if (o !== "visible") return {};
          const s = (P = h.elements.floating.ownerDocument) == null ? void 0 : P.defaultView;
          if (!s) return {};
          const f = h.rects.reference, d = Math.max(f.x, 0), b = Math.max(f.y, 0), p = Math.min(f.x + f.width, s.innerWidth), w = Math.min(f.y + f.height, s.innerHeight);
          if (p <= d || w <= b) return {};
          const v = r === "left" ? p - (f.x + f.width) : r === "right" ? d - f.x : 0, R = r === "top" ? b - f.y : r === "bottom" ? w - (f.y + f.height) : 0;
          return { x: h.x + v, y: h.y + R };
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
          var w;
          const s = (w = h.elements.floating.ownerDocument) == null ? void 0 : w.defaultView;
          if (!s) return {};
          const f = h.rects.floating.width, d = h.rects.floating.height, b = Math.max(8, Math.min(h.x, s.innerWidth - f - 8)), p = Math.max(8, Math.min(h.y, s.innerHeight - d - 8));
          return { x: b, y: p };
        }
      }
    ],
    whileElementsMounted: tn
  });
  return le(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ $(he, { children: [
    !n && /* @__PURE__ */ i("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    a && et(
      /* @__PURE__ */ i(
        "div",
        {
          ref: u.setFloating,
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
  const n = Ee(), r = we(), [o, c] = K(!1), [a, u] = K({ x: 0, y: 0 }), l = g(null), h = () => {
    if (!l.current) return;
    const s = l.current.getBoundingClientRect();
    u({ x: s.left + s.width / 2, y: s.top });
  };
  return U(() => (o && r && (h(), r.addEventListener("scroll", h, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", h, !0)), [o]), /* @__PURE__ */ $(
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
          /* @__PURE__ */ $(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: a.x, top: a.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((s, f) => /* @__PURE__ */ i("div", { className: f > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: s }, f)),
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
}) }), vi = ({ children: e }) => /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: T ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), xr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", yr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", ki = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ $("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? xr : yr, children: e }),
  t
] }), Ni = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ $("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), $i = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: o }) => /* @__PURE__ */ $(he, { children: [
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
    const u = document.createDocumentFragment();
    for (const l of Array.from(t.childNodes)) u.appendChild(Qe(l));
    return u;
  };
  if (!wr.has(n)) return r();
  if (n === "a") {
    const u = t.getAttribute("href") || "";
    if (!kr.test(u)) return r();
  }
  const o = document.createElement(n), c = t.getAttribute("style"), a = Nr(c || "");
  if (a && o.setAttribute("style", a), n === "a") {
    o.setAttribute("href", t.getAttribute("href"));
    const u = t.getAttribute("target"), l = t.getAttribute("rel");
    u && o.setAttribute("target", u), l && o.setAttribute("rel", l);
  }
  for (const u of Array.from(t.childNodes)) o.appendChild(Qe(u));
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
  var f;
  const a = e.attrs.field ?? "", u = n.options, l = ((f = u.resolve) == null ? void 0 : f.call(u, a)) ?? null, h = (l == null ? void 0 : l.color) ?? Cr, s = (l == null ? void 0 : l.label) ?? `{{${a}}}`;
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
      onMouseDown: (d) => {
        var v;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const b = typeof c == "function" ? c() : null;
        if (b == null) return;
        const p = o.state.doc.resolve(b), w = p.nodeAfter;
        w && Oe.isSelectable(w) && o.dispatch(o.state.tr.setSelection(new Oe(p))), (v = u.onTokenClick) == null || v.call(u, a, d.currentTarget.getBoundingClientRect(), b);
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
  }, [t]), /* @__PURE__ */ i("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Sr, maxHeight: Rr, zIndex: 9999 }, onMouseDown: (o) => o.preventDefault(), children: /* @__PURE__ */ i("div", { ref: r, children: e.items.map((o, c) => /* @__PURE__ */ $(
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
        onPosition: ({ x: a, y: u, placement: l }) => {
          var f, d;
          if (!e) return;
          const h = (d = (f = e.props) == null ? void 0 : f.clientRect) == null ? void 0 : d.call(f), s = h && !l.endsWith("-end") ? h.width : 0;
          r.style.left = `${a + s}px`, r.style.top = `${u}px`;
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
  suggestionItems: u,
  onTokenClick: l,
  onSelectionChange: h
}, s) => {
  const f = g(a);
  f.current = a;
  const d = g(u);
  d.current = u;
  const b = g(l);
  b.current = l;
  const p = g(h);
  p.current = h;
  const w = g(null), v = g(null), R = g(t);
  R.current = t;
  const P = g(r);
  P.current = r;
  const A = g(c);
  A.current = c;
  const _ = g(null), C = (y) => {
    var D;
    const z = {
      bold: y.isActive("bold"),
      italic: y.isActive("italic"),
      underline: y.isActive("underline"),
      strike: y.isActive("strike"),
      link: y.isActive("link"),
      color: y.getAttributes("textStyle").color || ""
    }, E = _.current;
    E && E.bold === z.bold && E.italic === z.italic && E.underline === z.underline && E.strike === z.strike && E.link === z.link && E.color === z.color || (_.current = z, (D = A.current) == null || D.call(A, z));
  }, O = (y) => {
    var N;
    const z = y.state.selection;
    let E = null;
    z instanceof Oe && z.node.type.name === "token" ? (E = { key: z.node.attrs.field ?? "", pos: z.from }, w.current = z.from) : w.current != null && (w.current = y.state.tr.mapping.map(w.current));
    const D = v.current, V = D && E && D.key === E.key && D.pos === E.pos;
    !D && !E || V || (v.current = E, (N = p.current) == null || N.call(p, E));
  }, W = (y) => {
    const z = $r(Tr(y));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, Y = ge.useMemo(() => {
    const y = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var E;
        return ((E = d.current) == null ? void 0 : E.call(d, z)) ?? [];
      },
      command: ({ editor: z, range: E, props: D }) => {
        z.chain().focus().insertContentAt(E, { type: "token", attrs: { field: D.field } }).run();
      },
      render: Mr
    };
    return Er.configure({
      resolve: f.current ?? null,
      suggestion: y,
      onTokenClick: (z, E, D) => {
        var V;
        w.current = D, (V = b.current) == null || V.call(b, z, E, D);
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
      Y
    ],
    content: vt(e || ""),
    editable: !r,
    onUpdate: ({ editor: y }) => {
      R.current(W(y.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: y }) => {
      C(y), O(y);
    }
  });
  return U(() => {
    if (!m || m.isFocused) return;
    W(m.getHTML()) !== e && (_.current = null, m.commands.setContent(vt(e || ""), { emitUpdate: !1 }), C(m));
  }, [e, m]), U(() => {
    m && m.setEditable(!r);
  }, [r, m]), U(() => {
    m && (_.current = null, C(m), O(m));
  }, [m]), Yt(s, () => ({
    exec: (y, z) => {
      if (!(!m || P.current))
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
      !m || P.current || m.chain().focus().insertContent({ type: "token", attrs: { field: y } }).run();
    },
    replaceToken: (y) => {
      if (!m || P.current) return;
      const z = w.current;
      z != null && m.commands.command(({ tr: E }) => {
        const D = E.doc.nodeAt(z);
        if (!D || D.type.name !== "token") return !1;
        E.setNodeMarkup(z, void 0, { field: y });
        const V = E.doc.resolve(z);
        return V.nodeAfter && V.nodeAfter.type.name === "token" && E.setSelection(new Oe(V)), !0;
      });
    }
  }), [m]), /* @__PURE__ */ i(un, { editor: m, className: `richtext-editor ${o || ""}` });
});
Ar.displayName = "RichTextEditor";
const Lr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Pr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], kt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Ei = ({ value: e, disabled: t, onChange: n }) => {
  const [r, o] = K(!1);
  return /* @__PURE__ */ i(
    He,
    {
      open: r,
      onOpenChange: o,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(Tt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Lr.map((c) => /* @__PURE__ */ i(Sn, { onClick: () => {
        n(c), o(!1);
      }, icon: c === e ? /* @__PURE__ */ i($t, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: c }, children: c }) }, c))
    }
  );
}, Or = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, o] = K(!1), [c, a] = K(""), u = () => {
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
            className: gr + " w-full"
          }
        ),
        /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i("button", { onClick: u, className: Je, disabled: !c.trim(), children: "Apply" }),
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
  const [c, a] = K(!1), u = (s, f) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(s, f);
  }, l = (s) => `${Ht} ${s ? Bt : Ft}`, h = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ $("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i($e, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i("button", { "aria-label": "Bold", disabled: t || h("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("bold"), className: `${l(((n == null ? void 0 : n.bold) ?? !1) || h("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ i($e, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i("button", { "aria-label": "Italic", disabled: t || h("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("italic"), className: `${l(((n == null ? void 0 : n.italic) ?? !1) || h("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ i($e, { content: "Underline", children: /* @__PURE__ */ i("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("underline"), className: l((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ i(Zt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i($e, { content: "Strikethrough", children: /* @__PURE__ */ i("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("strikeThrough"), className: l((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ i(Jt, { className: "w-3 h-3" }) }) }),
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
        trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${Kt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(kt, {}),
          /* @__PURE__ */ i(Tt, { className: "w-3 h-3 text-zinc-500" })
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
              children: /* @__PURE__ */ i(kt, { className: "w-3.5 h-3.5" })
            }
          ),
          Pr.map((s) => /* @__PURE__ */ i(
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
    o && /* @__PURE__ */ $(he, { children: [
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
