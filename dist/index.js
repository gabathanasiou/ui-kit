"use client";
import { jsxs as E, jsx as i, Fragment as ve } from "react/jsx-runtime";
import $e, { createContext as Oe, useContext as _e, useState as H, useEffect as q, useRef as b, useCallback as X, useLayoutEffect as fe, useMemo as Xe, useImperativeHandle as fn } from "react";
import * as j from "@radix-ui/react-dropdown-menu";
import { Check as Kt, X as lt, Pencil as hn, Copy as Wt, Trash2 as at, RotateCcw as Yt, Plus as mn, ChevronRight as ut, ChevronLeft as pn, ArrowUp as gn, ArrowDown as bn, ChevronDown as qt, Underline as xn, Strikethrough as yn, Link as vn } from "lucide-react";
import * as ye from "@radix-ui/react-dialog";
import { createPortal as bt } from "react-dom";
import { useFloating as wn, autoUpdate as kn, offset as Nn, flip as $n, shift as En } from "@floating-ui/react-dom";
import { mergeAttributes as zn, ReactNodeViewRenderer as Cn, NodeViewWrapper as Tn, useEditor as Rn, EditorContent as Sn } from "@tiptap/react";
import { NodeSelection as Ge } from "@tiptap/pm/state";
import Ln from "@tiptap/starter-kit";
import Dn from "@tiptap/extension-placeholder";
import { TextStyle as An } from "@tiptap/extension-text-style";
import Mn from "@tiptap/extension-color";
import Pn from "@tiptap/extension-link";
import In from "@tiptap/extension-underline";
import { Mention as On } from "@tiptap/extension-mention";
import { createRoot as _n } from "react-dom/client";
const Hn = Oe(null);
function xt() {
  return _e(Hn);
}
function He() {
  const e = xt();
  return e ? e.document.body : null;
}
function Ut() {
  const e = xt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function Se() {
  return xt() ?? (typeof window < "u" ? window : null);
}
const Be = typeof window < "u", N = Be && window.matchMedia("(pointer: coarse)").matches, Bn = Be && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function dt(e) {
  return e === "touch" || e === "pen";
}
let Te = null;
const ft = /* @__PURE__ */ new Set();
Be && window.addEventListener("pointerdown", (e) => {
  Te = e.pointerType, ft.forEach((t) => t());
}, !0);
function xi() {
  return Te;
}
function Fn() {
  const [, e] = H(0), t = b(Te);
  return q(() => {
    const n = () => {
      t.current !== Te && (t.current = Te, e((r) => r + 1));
    };
    return ft.add(n), () => {
      ft.delete(n);
    };
  }, []), Te;
}
const jt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Vt() {
  return Be ? jt.some((e) => window.matchMedia(e).matches) : !1;
}
let Ze = Vt();
const ht = /* @__PURE__ */ new Set();
function At(e) {
  Ze !== e && (Ze = e, ht.forEach((t) => t()));
}
var Ft;
if (Be) {
  const e = () => At(Vt());
  for (const l of jt) {
    const u = window.matchMedia(l);
    (Ft = u.addEventListener) == null || Ft.call(u, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (l) => {
    l.isComposing || l.keyCode !== 229 && (l.key === "Enter" || l.key === "Backspace" || l.key === "Process" || l.key === "Unidentified" || At(!0));
  });
  let n = null, r = null;
  const a = "__penClick", s = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (l) => {
    l.pointerType !== "pen" || l.button !== 0 || (n = { x: l.clientX, y: l.clientY });
  }, !0), window.addEventListener("pointerup", (l) => {
    if (l.pointerType !== "pen") return;
    const u = n;
    if (n = null, !u || Math.hypot(l.clientX - u.x, l.clientY - u.y) > 8) return;
    const c = l.target;
    if (!c || !c.isConnected) return;
    if (c instanceof HTMLInputElement && s.has(c.type)) {
      try {
        c.showPicker();
      } catch {
      }
      return;
    }
    const f = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    f[a] = !0, r = { x: l.clientX, y: l.clientY, time: Date.now() }, c.dispatchEvent(f);
  }, !0), window.addEventListener("click", (l) => {
    l[a] || r && Date.now() - r.time < 1e3 && Math.hypot(l.clientX - r.x, l.clientY - r.y) < 12 && (l.preventDefault(), l.stopPropagation());
  }, !0);
}
function yi() {
  return Ze;
}
function vi() {
  const [, e] = H(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return ht.add(t), () => {
      ht.delete(t);
    };
  }, []), Ze;
}
const Re = 220, yt = "cubic-bezier(0.32, 0.72, 0, 1)", vt = 170, wt = 0.94;
function nt(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Xt(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function Gt(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return Xt({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function Kn(e, t, n, r) {
  const a = ++e.current, s = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${wt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === a && requestAnimationFrame(() => {
      if (e.current !== a) return;
      const l = Gt(t, n);
      t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transition = `transform ${Re}ms ${yt}, opacity ${vt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === a && (t.style.transition = s.transition, t.style.transform = s.transform, t.style.transformOrigin = s.transformOrigin, t.style.opacity = s.opacity, r == null || r());
      }, Re + 60);
    });
  });
}
function Wn(e, t, n, r) {
  const a = ++e.current, s = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, l = Gt(t, n);
  t.style.transition = `transform ${Re}ms ${yt}, opacity ${vt}ms ease`, t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transform = `scale(${wt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === a && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== a || t.isConnected || (t.style.transition = s.transition, t.style.transform = s.transform, t.style.transformOrigin = s.transformOrigin, t.style.opacity = s.opacity, t.style.pointerEvents = s.pointerEvents, t.style.visibility = s.visibility);
    }));
  }, Re + 60);
}
function Yn(e, t, n) {
  const r = e.cloneNode(!0), a = e.getBoundingClientRect(), s = a.width > 0 || a.height > 0 ? a : n ?? a;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${s.left}px`, r.style.top = `${s.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const l = (t == null ? void 0 : t()) ?? null, u = l ? Xt({ left: s.left, top: s.top, width: s.width, height: s.height }, l) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Re}ms ${yt}, opacity ${vt}ms ease`, r.style.transform = `scale(${wt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Re + 60));
    });
  });
}
function kt(e) {
  const t = b(null), [n, r] = H(!1), a = b(null), s = b(0), l = X((g) => {
    if (e.ref && (e.ref.current = g), g) {
      s.current = 0, t.current = g;
      const z = g.getBoundingClientRect();
      (z.width > 0 || z.height > 0) && (a.current = { left: z.left, top: z.top, width: z.width, height: z.height }), r(!0);
      return;
    }
    const y = t.current, k = ++s.current;
    queueMicrotask(() => {
      k === s.current && t.current === y && (t.current = null, r(!1), !(!y || !e.cloneOnUnmount || !c.current) && y.style.visibility !== "hidden" && nt(d.current) && Yn(y, o.current, a.current));
    });
  }, []), u = X(() => {
    const g = t.current;
    if (!g || getComputedStyle(g).transform !== "none") return;
    const y = g.getBoundingClientRect();
    (y.width > 0 || y.height > 0) && (a.current = { left: y.left, top: y.top, width: y.width, height: y.height });
  }, []), c = b(e.visible);
  c.current = e.visible;
  const f = b(e.visible), o = b(e.anchor ?? null);
  o.current = e.anchor ?? null;
  const h = b(e.onClosed);
  h.current = e.onClosed;
  const d = b(e.morph !== !1);
  d.current = e.morph !== !1;
  const x = b(0);
  return fe(() => {
    if (!n || !c.current || !nt(d.current)) return;
    const g = t.current;
    g && Kn(x, g, o.current);
  }, [n, e.visible]), q(() => {
    if (!n || !c.current) return;
    let g = 0;
    const y = () => {
      g = 0, u(), g = requestAnimationFrame(y);
    };
    return g = requestAnimationFrame(y), () => {
      g && cancelAnimationFrame(g);
    };
  }, [n, u]), fe(() => {
    var k;
    const g = f.current;
    if (f.current = e.visible, e.visible || !g) return;
    const y = t.current;
    if (!y || !nt(d.current)) {
      (k = h.current) == null || k.call(h);
      return;
    }
    Wn(x, y, o.current, () => {
      var z;
      return (z = h.current) == null ? void 0 : z.call(h);
    });
  }, [e.visible]), q(() => {
    if (!n || !c.current) return;
    const g = (y) => {
      const k = t.current;
      k && k.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", g, { capture: !0 }), () => document.removeEventListener("wheel", g, { capture: !0 });
  }, [n]), q(() => {
    if (!n || !c.current) return;
    const g = (y) => {
      const k = t.current;
      k && k.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", g, { capture: !0 }), () => document.removeEventListener("touchmove", g, { capture: !0 });
  }, [n]), l;
}
function Zt(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function wi(e, t) {
  const n = Se(), r = b(n);
  r.current = n;
  const a = () => {
    if (!t || !e.current) return;
    const s = e.current.querySelector(".absolute");
    if (!s) return;
    s.style.left = "", s.style.right = "", s.style.top = "", s.style.bottom = "", s.style.maxHeight = "";
    const l = r.current;
    if (!l) return;
    const u = e.current.getBoundingClientRect(), c = s.getBoundingClientRect(), f = l.innerWidth, o = Zt(l), h = c.right - f;
    if (h > 0) {
      const d = Math.min(h + 8, c.left);
      s.style.left = `${c.left - u.left - d}px`;
    }
    c.left < 0 && (s.style.left = `${-u.left + 4}px`), c.bottom > o.bottom + 4 && (s.style.top = "auto", s.style.bottom = "100%", s.getBoundingClientRect().top < o.top && (s.style.bottom = "auto", s.style.top = `${-u.top + o.top + 4}px`, s.style.maxHeight = `${o.height - 8}px`));
  };
  fe(() => {
    if (a(), !t) return;
    const s = r.current, l = (s == null ? void 0 : s.visualViewport) ?? null;
    return l == null || l.addEventListener("resize", a), l == null || l.addEventListener("scroll", a), s == null || s.addEventListener("resize", a), () => {
      l == null || l.removeEventListener("resize", a), l == null || l.removeEventListener("scroll", a), s == null || s.removeEventListener("resize", a);
    };
  }, [t, e]);
}
function qn(e, t, n, r) {
  const a = Se(), s = b(a);
  s.current = a, fe(() => {
    if (!t || !e.current) return;
    const l = e.current;
    let u = 0;
    const c = () => {
      u = 0;
      const x = l.getBoundingClientRect(), g = s.current;
      if (!g) return;
      const y = g.innerWidth, k = Zt(g), z = (r == null ? void 0 : r.panelWidth) ?? Math.max(x.width, 200), P = 4, K = 120;
      let _ = Math.max(0, x.left);
      _ + z > y && (_ = Math.max(0, y - z - 8));
      const B = k.bottom - x.bottom - P - 16, L = x.top - k.top - P - 16;
      if (B >= K || B >= L) {
        const R = Math.min(x.bottom + P, k.bottom), Y = Math.max(K, k.bottom - R - 16);
        n({ top: R, left: _, width: x.width, maxH: Y });
      } else {
        const R = Math.max(K, Math.min(L, 360)), Y = k.bottom - (x.top - P);
        n({ top: 0, left: _, width: x.width, maxH: R, bottom: Math.max(0, Y) });
      }
    }, f = () => {
      u || (u = requestAnimationFrame(c));
    }, o = s.current ?? null, h = (o == null ? void 0 : o.document) ?? null;
    f(), h == null || h.addEventListener("scroll", f, { capture: !0, passive: !0 }), o == null || o.addEventListener("resize", f);
    const d = (o == null ? void 0 : o.visualViewport) ?? null;
    return d == null || d.addEventListener("resize", f), d == null || d.addEventListener("scroll", f), () => {
      u && cancelAnimationFrame(u), h == null || h.removeEventListener("scroll", f, { capture: !0 }), o == null || o.removeEventListener("resize", f), d == null || d.removeEventListener("resize", f), d == null || d.removeEventListener("scroll", f);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let Ce = null;
function Jt(e) {
  return Ce == null || Ce(), Ce = e, () => {
    Ce === e && (Ce = null);
  };
}
const Nt = Oe("dark"), Qt = () => _e(Nt), Un = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Mt = N ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", jn = N ? "text-xs" : "text-[10px]";
function $t(e) {
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
    headerPad: Mt,
    headerText: `${Mt} font-semibold uppercase tracking-wider ${jn} ui-label`,
    // Item padding
    itemPad: Un,
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
function en(e) {
  const t = [];
  return $e.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if ($e.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const Et = Oe({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Fe = Oe(null), zt = () => _e(Fe);
function Je() {
  const e = b([]), [t, n] = H(-1), [r, a] = H(!1), [s, l] = H(0), u = X((h) => (e.current = [...e.current, h], l((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== h), l((d) => d + 1);
  }), []), c = X((h, d) => {
    n(h), a(d === "pointer");
  }, []), f = X(() => {
    a((h) => h && (n(-1), !1));
  }, []);
  return Xe(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: u,
    setHighlighted: c,
    pointerLeave: f
  }), [t, r, s, u, c, f]);
}
function tn(e) {
  const t = zt(), n = b(t);
  n.current = t;
  const r = b(null);
  q(() => {
    var c;
    const u = { label: e.label(), activate: e.activate };
    return r.current = u, (c = n.current) == null ? void 0 : c.register(u);
  }, []);
  const a = t && r.current ? t.items.indexOf(r.current) : -1, s = !!t && !e.disabled && a >= 0 && a === t.highlightedIndex;
  return { api: t, myIndex: a, highlighted: s, setPointer: (u) => {
    !e.disabled && t && u >= 0 && t.setHighlighted(u, "pointer");
  } };
}
function Ct(e, t, n, r) {
  const a = b(-1);
  a.current = t.highlightedIndex;
  const s = b(t);
  s.current = t;
  const l = b(e);
  l.current = e;
  const u = b(r);
  u.current = r;
  const c = b({ text: "", time: 0 }), f = b(!1);
  f.current || (f.current = !0, n.current = (o) => {
    var d, x;
    if (!l.current) return;
    const h = s.current.items;
    if (h.length !== 0) {
      if (o.key === "ArrowDown" || o.key === "ArrowUp") {
        o.preventDefault(), o.stopImmediatePropagation();
        const g = o.key === "ArrowDown" ? 1 : -1, y = (a.current + g + h.length) % h.length;
        s.current.setHighlighted(y, "keyboard");
      } else if (o.key === "ArrowRight") {
        o.preventDefault(), o.stopImmediatePropagation();
        const g = a.current;
        g >= 0 && g < h.length && h[g].submenu && h[g].activate();
      } else if (o.key === "ArrowLeft")
        o.preventDefault(), o.stopImmediatePropagation(), (x = (d = u.current) == null ? void 0 : d.onCloseSub) == null || x.call(d);
      else if (o.key === "Enter" || o.key === " ") {
        o.preventDefault(), o.stopImmediatePropagation();
        const g = a.current;
        g >= 0 && g < h.length && h[g].activate();
      } else if (o.key.length === 1 && !o.ctrlKey && !o.metaKey && !o.altKey) {
        o.preventDefault(), o.stopImmediatePropagation();
        const g = Date.now(), y = (g - c.current.time > 500 ? "" : c.current.text) + o.key.toLowerCase();
        if (c.current = { text: y, time: g }, !y) return;
        const k = a.current + 1;
        for (let z = 0; z < h.length; z++) {
          const P = (k + z) % h.length;
          if (h[P].label.toLowerCase().startsWith(y)) {
            s.current.setHighlighted(P, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Tt(e, t, n, r, a, s) {
  const l = b(t);
  l.current = t;
  const u = b(e);
  u.current = e;
  const c = b(a);
  c.current = a;
  const f = b(!1);
  f.current || (f.current = !0, s.current = (o) => {
    if (!u.current || c.current) return;
    const h = r.current;
    h && h.contains(o.target) || l.current.items.length === 0 || !(o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === "ArrowLeft" || o.key === "ArrowRight" || o.key === "Enter" || o.key === " " || o.key.length === 1 && !o.ctrlKey && !o.metaKey && !o.altKey) || (o.preventDefault(), o.stopImmediatePropagation(), n.current(o));
  });
}
function Rt(e, t) {
  const n = b(e);
  n.current = e;
  const r = b(!1);
  r.current || (r.current = !0, t.current = (a) => {
    if (!n.current) return;
    const s = a.currentTarget;
    s.scrollHeight > s.clientHeight && (a.preventDefault(), s.scrollTop += a.deltaY);
  });
}
function Qe({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: a = "left",
  width: s,
  theme: l = "dark",
  children: u,
  morph: c = !0,
  contentClassName: f,
  initialHighlightIndex: o
}) {
  const [h, d] = H([]), [x, g] = H(null), y = He(), k = Ut(), z = b(null), P = b(null), K = b(e);
  K.current = e;
  const [_, B] = H(e), L = Je();
  q(() => {
    if (e)
      return B(!0), L.setHighlighted(o ?? -1, "keyboard"), Jt(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, o, n, t]), q(() => {
    if (!e || !k) return;
    const M = (Q) => {
      if (Q.pointerType !== "touch") return;
      const ie = Q.target;
      ie && (P.current && P.current.contains(ie) || z.current && z.current.contains(ie) || ie instanceof Element && ie.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return k.addEventListener("pointerdown", M, { capture: !0 }), () => k.removeEventListener("pointerdown", M, { capture: !0 });
  }, [e, k, n, t]);
  const R = X(() => {
    const M = z.current;
    if (!M) return null;
    const Q = M.getBoundingClientRect();
    return { left: Q.left, top: Q.top, width: Q.width, height: Q.height };
  }, []), Y = kt({
    visible: e,
    morph: c,
    anchor: R,
    onClosed: () => B(!1)
  }), p = b(() => {
  }), v = b(() => {
  }), T = b(() => {
  });
  Ct(e && h.length === 0, L, p), Rt(e, v), Tt(e, L, p, P, h.length > 0, T);
  const S = b(null), I = X((M) => {
    var Q;
    if (M) {
      M.addEventListener("keydown", p.current, { capture: !0 }), M.addEventListener("wheel", v.current, { passive: !1 });
      const ie = M.ownerDocument;
      S.current = ie, ie.addEventListener("keydown", T.current, { capture: !0 }), W(M.offsetWidth), te(!0);
    } else
      (Q = S.current) == null || Q.removeEventListener("keydown", T.current, { capture: !0 }), S.current = null, te(!1);
    P.current = M, Y(M);
  }, [Y]), [U, J] = H({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [ee, $] = H(0), [F, te] = H(!1), [C, W] = H(0);
  q(() => {
    e && z.current && $(z.current.getBoundingClientRect().width);
  }, [e]);
  const A = Xe(() => ({ panelWidth: C || ee || void 0 }), [C, ee]);
  qn(z, e && F, (M) => J({ ...M, maxH: Math.min(M.maxH, 384), ready: !0 }), A), q(() => {
    if (U.ready && e) {
      const M = P.current;
      M && M.ownerDocument.activeElement !== M && !M.contains(M.ownerDocument.activeElement) && M.focus();
    }
  }, [U.ready, e]), fe(() => {
    var Q;
    if (!e || L.highlightedIndex < 0) return;
    const M = (Q = P.current) == null ? void 0 : Q.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    M == null || M.scrollIntoView({ block: "nearest" });
  }, [e, L.highlightedIndex]);
  const w = X((M) => {
    !M && !K.current || (!M && be.current && (le.current = !0), n ? n(M) : M || t == null || t());
  }, [n, t]), V = b(_);
  V.current = _;
  const be = b(!1), le = b(!1), Ee = X(() => {
    if (!K.current && V.current) {
      if (le.current) {
        le.current = !1, be.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), oe = $e.isValidElement(r) ? r : null, se = oe ? $e.cloneElement(oe, {
    ref: (M) => {
      z.current = M;
    },
    onPointerDown: () => {
      be.current = !0, le.current = !1;
    },
    onClick: (M) => {
      var Q, ie;
      (ie = (Q = oe.props).onClick) == null || ie.call(Q, M), Ee();
    }
  }) : r;
  return /* @__PURE__ */ E(j.Root, { open: e || _, onOpenChange: w, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: se }),
    /* @__PURE__ */ i(j.Portal, { container: y ?? void 0, children: /* @__PURE__ */ i(Nt.Provider, { value: l, children: /* @__PURE__ */ i(Et.Provider, { value: { chain: h, setChain: d, morph: c, keyboardOpened: x, setKeyboardOpened: g }, children: /* @__PURE__ */ i(Fe.Provider, { value: L, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: I,
        "data-theme": l,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${s || ""} ${f || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: U.left,
          top: U.bottom != null ? void 0 : U.top,
          bottom: U.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: s ? void 0 : ee || void 0,
          maxHeight: U.maxH,
          visibility: U.ready ? "visible" : "hidden"
        },
        onPointerLeave: L.pointerLeave,
        children: u
      }
    ) }) }) }) })
  ] });
}
function ki({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: a,
  onRename: s,
  onDuplicate: l,
  onDelete: u,
  onCreate: c,
  onImport: f,
  onExport: o,
  onReset: h,
  onTrash: d,
  closeOnSelect: x,
  readOnly: g = !1,
  theme: y,
  align: k,
  label: z,
  header: P,
  itemLabel: K,
  trigger: _,
  minItems: B = 1,
  itemRender: L,
  morph: R = !0,
  contentClassName: Y
}) {
  const p = $t(), [v, T] = H(null), [S, I] = H(""), U = b(null), J = b(null);
  q(() => {
    e && requestAnimationFrame(() => {
      var C, W;
      (W = (C = J.current) == null ? void 0 : C.querySelector('[data-active="1"]')) == null || W.scrollIntoView({ block: "nearest" });
    });
  }, [e]), q(() => {
    var A;
    if (!e) return;
    const C = (w) => {
      var se, ze, M, Q, ie;
      if ((ze = (se = w.target) == null ? void 0 : se.closest) != null && ze.call(se, "input, textarea, [contenteditable]")) return;
      const V = (M = J.current) == null ? void 0 : M.closest(".ui-menu");
      if (!V || !V.contains(w.target)) return;
      const be = V.ownerDocument, le = [...V.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], Ee = [...V.querySelectorAll('div:last-child > [role="menuitem"]')], oe = [...le, ...Ee];
      if (w.key === "ArrowDown" || w.key === "ArrowUp") {
        w.preventDefault(), w.stopImmediatePropagation();
        const ce = be.activeElement;
        let he = ce ? oe.indexOf(ce) : -1;
        if (he < 0 && ce) {
          const ke = ce.closest("[data-active]"), m = ke == null ? void 0 : ke.querySelector('[role="menuitem"]:first-child');
          m && (he = le.indexOf(m));
        }
        const me = w.key === "ArrowDown" ? 1 : -1, we = he < 0 ? me === 1 ? 0 : oe.length - 1 : (he + me + oe.length) % oe.length;
        (Q = oe[we]) == null || Q.focus({ preventScroll: !0 });
        return;
      }
      if (w.key === "ArrowLeft" || w.key === "ArrowRight") {
        const ce = be.activeElement, he = ce == null ? void 0 : ce.closest("[data-active]");
        if (!he) return;
        w.preventDefault(), w.stopImmediatePropagation();
        const me = [...he.querySelectorAll('[role="menuitem"]')].slice(1);
        if (me.length === 0) return;
        const we = ce && he.contains(ce) ? me.indexOf(ce) : -1, ke = w.key === "ArrowRight" ? 1 : -1, m = we < 0 ? 0 : (we + ke + me.length) % me.length;
        (ie = me[m]) == null || ie.focus({ preventScroll: !0 });
        return;
      }
    }, W = ((A = J.current) == null ? void 0 : A.ownerDocument) ?? null;
    return W == null || W.addEventListener("keydown", C, { capture: !0 }), () => W == null ? void 0 : W.removeEventListener("keydown", C, { capture: !0 });
  }, [e]), q(() => {
    if (v) {
      requestAnimationFrame(() => {
        var W, A;
        (W = U.current) == null || W.focus(), (A = U.current) == null || A.select();
      });
      const C = n.find((W) => W.id === v);
      C && !S && I(C.name);
    }
  }, [v]), q(() => {
    if (v) {
      const C = n.find((W) => W.id === v);
      C && !S && I(C.name);
    }
  }, [v, n]);
  const ee = (C, W) => {
    T(C), I(W);
  }, $ = () => {
    v && S.trim() && s(v, S.trim()), T(null);
  }, F = () => {
    T(null);
  }, te = K || P.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ E(Qe, { open: e, onOpenChange: (C) => {
    C ? (T(null), I("")) : (v && S.trim() && s(v, S.trim()), T(null), I("")), (!C || !g) && t(C);
  }, width: "w-80", theme: y, align: k, trigger: _, morph: R, contentClassName: Y, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${p.headerText}`, children: P }),
    /* @__PURE__ */ i("div", { ref: J, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((C) => {
      const W = C.id === r, A = v === C.id;
      return /* @__PURE__ */ i("div", { "data-active": W ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${W || A ? p.rowActiveBg : p.rowHoverBg} ${v && !A ? "opacity-40 pointer-events-none" : ""}`, children: A ? /* @__PURE__ */ E(ve, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: U,
            value: S,
            onChange: (w) => I(w.target.value),
            onKeyDown: (w) => {
              w.key === "Enter" && (w.preventDefault(), w.stopPropagation(), $()), w.key === "Escape" && (w.preventDefault(), w.stopPropagation(), F());
            },
            className: `w-full border rounded ${p.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${p.editConfirm}`,
            onSelect: (w) => {
              w.preventDefault(), $();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(Kt, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${p.editCancel}`,
            onSelect: (w) => {
              w.preventDefault(), F();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(lt, { className: p.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ E(ve, { children: [
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none cursor-pointer flex items-center ${p.rowText} ${W ? "" : p.rowTextHover}`,
            onSelect: x ? () => {
              a(C.id);
            } : (w) => {
              w.preventDefault(), a(C.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${W ? p.rowActiveText : ""}`, children: L ? L(C) : C.name })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${W ? p.btnActive : p.btnBase}`,
            onSelect: (w) => {
              w.preventDefault(), ee(C.id, C.name);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ i(hn, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${W ? p.btnActive : p.btnBase}`,
            onSelect: (w) => {
              w.preventDefault();
              const V = l(C.id);
              V && ee(V, `${C.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ i(Wt, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= B ? p.btnDisabled : W ? p.btnDangerActive : p.btnDanger}`,
            onSelect: (w) => {
              w.preventDefault(), u(C.id);
            },
            onTouchStart: () => {
            },
            disabled: g || n.length <= B,
            children: /* @__PURE__ */ i(at, { className: p.btnIcon })
          }
        )
      ] }) }, C.id);
    }) }),
    /* @__PURE__ */ E("div", { className: `shrink-0 ${v ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ E(ve, { children: [
        /* @__PURE__ */ i(j.Separator, { className: p.separator }),
        /* @__PURE__ */ E(
          j.Item,
          {
            className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
            onSelect: (C) => {
              C.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: [
              /* @__PURE__ */ i(Yt, { className: `${p.btnIcon} ${p.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || f || o || d) && /* @__PURE__ */ i(j.Separator, { className: p.separator }),
      c && /* @__PURE__ */ E(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault();
            const W = c();
            W && ee(W, "");
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ i(mn, { className: `${p.btnIcon} ${p.icon}` }),
            "New ",
            te
          ]
        }
      ),
      f && /* @__PURE__ */ E(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ E("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      o && /* @__PURE__ */ E(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), o();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ E("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ E(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (C) => {
            C.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ i(at, { className: `${p.btnIcon} ${p.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Vn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Xn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: a = "",
  children: s,
  keepOpen: l = !1,
  selected: u = !1,
  rightAction: c,
  trailing: f
}) {
  Qt();
  const o = $t(), h = b(!1), d = b(null), { myIndex: x, highlighted: g, setPointer: y } = tn({
    label: () => en(s),
    activate: () => {
      n || e();
    },
    disabled: n
  }), k = r === "danger" ? o.itemDanger : o.itemDefault;
  return /* @__PURE__ */ E(
    j.Item,
    {
      ref: d,
      "data-ei": x >= 0 ? x : void 0,
      className: `w-full text-left ${Vn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${k} ${u ? "ui-item-selected" : ""} ${g ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${a}`,
      onSelect: (z) => {
        if (h.current) {
          h.current = !1;
          return;
        }
        l && z.preventDefault(), e();
      },
      onPointerEnter: () => {
        y(x);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${o.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: s }),
        f && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: f }),
        c && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${o.rightAction}`,
            title: c.title,
            onPointerDown: (z) => {
              z.stopPropagation(), z.preventDefault(), h.current = !0, c.onClick();
            },
            onClick: (z) => {
              z.stopPropagation(), z.preventDefault();
            },
            children: c.icon
          }
        )
      ]
    }
  );
}
const Gn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Zn({ id: e, label: t, icon: n, width: r, side: a = "right", children: s, contentClassName: l }) {
  const { chain: u, setChain: c, morph: f, keyboardOpened: o, setKeyboardOpened: h } = _e(Et), d = u.includes(e), x = u[u.length - 1] === e, g = Qt(), y = He(), k = b(null), z = b(null), [P, K] = H(d), _ = !d && P;
  q(() => {
    d && K(!0);
  }, [d]);
  const B = () => c((A) => {
    const w = A.indexOf(e);
    return w >= 0 ? A.slice(0, w) : A;
  }), L = Je(), R = zt(), Y = b(R);
  Y.current = R;
  const p = b(null);
  q(() => {
    var w;
    const A = {
      label: t,
      activate: () => {
        h(e), c((V) => V.includes(e) ? V : [...V, e]);
      },
      submenu: !0
    };
    return p.current = A, (w = Y.current) == null ? void 0 : w.register(A);
  }, []);
  const v = R && p.current ? R.items.indexOf(p.current) : -1, T = v >= 0 && v === R.highlightedIndex, S = X(() => {
    const A = k.current;
    if (!A) return null;
    const w = A.getBoundingClientRect();
    return { left: w.left, top: w.top, width: w.width, height: w.height };
  }, []), I = kt({
    visible: d,
    morph: f,
    anchor: S,
    onClosed: () => K(!1)
  }), U = b(() => {
  }), J = b(() => {
  }), ee = b(() => {
  });
  Ct(d && x, L, U, {
    onCloseSub: () => {
      B(), R && v >= 0 && R.setHighlighted(v, "keyboard");
    }
  });
  const $ = b(o);
  $.current = o, q(() => {
    d && ($.current === e ? (L.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var A;
      return (A = z.current) == null ? void 0 : A.focus();
    }), h(null)) : L.setHighlighted(-1, "keyboard"));
  }, [d]), Rt(d, J), Tt(d, L, U, z, !x, ee), $e.useLayoutEffect(() => {
    var w;
    if (!d || L.highlightedIndex < 0) return;
    const A = (w = z.current) == null ? void 0 : w.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    A == null || A.scrollIntoView({ block: "nearest" });
  }, [d, L.highlightedIndex]);
  const F = b(null), te = X((A) => {
    var w;
    if (A) {
      A.addEventListener("keydown", U.current, { capture: !0 }), A.addEventListener("wheel", J.current, { passive: !1 });
      const V = A.ownerDocument;
      F.current = V, V.addEventListener("keydown", ee.current, { capture: !0 });
    } else
      (w = F.current) == null || w.removeEventListener("keydown", ee.current, { capture: !0 }), F.current = null;
    z.current = A, I(A);
  }, [I]), C = `w-full text-left ${Gn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${T ? " ui-item-highlighted" : ""}${_ ? " ui-sub-closing" : ""}`, W = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${l || ""}`;
  return /* @__PURE__ */ E(j.Sub, { open: d || P, onOpenChange: (A) => c((w) => {
    if (!A) {
      const V = w.indexOf(e);
      return V >= 0 ? w.slice(0, V) : w;
    }
    return w.includes(e) ? w : [...w, e];
  }), children: [
    /* @__PURE__ */ E(
      j.SubTrigger,
      {
        ref: k,
        "data-ei": v >= 0 ? v : void 0,
        className: C,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          R && v >= 0 && R.setHighlighted(v, "pointer");
        },
        onPointerDown: (A) => {
          A.pointerType === "pen" && (A.preventDefault(), c((w) => d ? w.slice(0, w.indexOf(e)) : [...w, e]));
        },
        children: [
          a === "left" && /* @__PURE__ */ i(ut, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ E("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          a === "right" && /* @__PURE__ */ i(ut, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(j.Portal, { container: y ?? void 0, children: /* @__PURE__ */ i(
      j.SubContent,
      {
        ref: te,
        "data-theme": g,
        className: W,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: L.pointerLeave,
        children: /* @__PURE__ */ i(Fe.Provider, { value: L, children: s })
      }
    ) })
  ] });
}
const De = 8, Jn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Qn = N ? "text-sm" : "text-xs", Ni = ({ open: e, x: t, y: n, onClose: r, children: a, containerRef: s, morph: l = !0 }) => {
  const u = b(null), c = Se(), [f, o] = H(!1), [h, d] = H([]), [x, g] = H(null), y = Je();
  q(() => {
    if (e)
      return y.setHighlighted(-1, "keyboard"), Jt(r);
  }, [e, r]);
  const k = b({ left: t, top: n });
  e && (k.current = { left: t, top: n });
  const z = X(() => ({ left: k.current.left, top: k.current.top, width: 0, height: 0 }), []), P = kt({
    visible: !0,
    morph: l,
    anchor: z,
    cloneOnUnmount: !0
  }), K = b(() => {
  }), _ = b(() => {
  }), B = b(() => {
  });
  Ct(e, y, K), Rt(e, _), Tt(e, y, K, u, h.length > 0, B);
  const L = b(null), R = X((v) => {
    var T;
    if (v) {
      v.addEventListener("keydown", K.current, { capture: !0 }), v.addEventListener("wheel", _.current, { passive: !1 });
      const S = v.ownerDocument;
      L.current = S, S.addEventListener("keydown", B.current, { capture: !0 });
    } else
      (T = L.current) == null || T.removeEventListener("keydown", B.current, { capture: !0 }), L.current = null;
    u.current = v, o(!!v), P(v);
  }, [P]), [Y, p] = H(null);
  return fe(() => {
    var C;
    if (!e || !f || !u.current) return;
    const v = u.current, T = v.offsetWidth, S = v.offsetHeight, I = (C = s == null ? void 0 : s.current) == null ? void 0 : C.getBoundingClientRect(), U = I ? I.right : (c == null ? void 0 : c.innerWidth) ?? 0, J = I ? I.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, ee = I ? I.left : 0, $ = I ? I.top : 0;
    let F = Math.max($ + De, k.current.top), te = Math.max(ee + De, k.current.left);
    te + T > U && (te = U - T - De), F + S > J && (F = Math.max($ + De, J - S - De)), p({ left: te, top: F });
  }, [e, f, t, n, s]), e ? /* @__PURE__ */ E(j.Root, { open: e, onOpenChange: (v) => {
    v || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(j.Portal, { children: /* @__PURE__ */ i(Nt.Provider, { value: "light", children: /* @__PURE__ */ i(Et.Provider, { value: { chain: h, setChain: d, morph: l, keyboardOpened: x, setKeyboardOpened: g }, children: /* @__PURE__ */ i(Fe.Provider, { value: y, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: R,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Qn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (Y == null ? void 0 : Y.left) ?? k.current.left, top: (Y == null ? void 0 : Y.top) ?? k.current.top, touchAction: "manipulation" },
        onPointerLeave: y.pointerLeave,
        children: a
      }
    ) }) }) }) })
  ] }) : null;
}, $i = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: a = !1, trailing: s, children: l }) => {
  const u = zt(), c = b(u);
  c.current = u;
  const f = b(null);
  q(() => {
    var x;
    const d = { label: en(l), activate: () => {
      r || e();
    } };
    return f.current = d, (x = c.current) == null ? void 0 : x.register(d);
  }, []);
  const o = u && f.current ? u.items.indexOf(f.current) : -1, h = !r && o >= 0 && o === u.highlightedIndex;
  return /* @__PURE__ */ E(
    j.Item,
    {
      "data-ei": o >= 0 ? o : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && o >= 0 && u.setHighlighted(o, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${Jn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${a ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: l }),
        s && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: s })
      ]
    }
  );
}, Ei = () => /* @__PURE__ */ i(j.Separator, { className: "ui-sep my-1" }), zi = (e) => /* @__PURE__ */ i(Zn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), re = 16, nn = "[data-modal-stack]", xe = 220, Ie = "cubic-bezier(0.32, 0.72, 0, 1)", je = 0.94;
function Ae() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Me(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function rn(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function Pt(e, t, n, r) {
  const a = ++e.current, s = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = rn(s, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === a && (t.style.transition = `transform ${xe}ms ${Ie}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === a && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, xe + 80));
    });
  });
}
function er(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${je})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${xe}ms ${Ie}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, xe + 60));
    });
  });
}
function It(e, t, n) {
  const r = ++e.current, a = t.getBoundingClientRect(), s = 1 - je, l = { left: a.left + a.width * s / 2, top: a.top + a.height * s / 2, width: a.width * je, height: a.height * je };
  t.style.transition = `transform ${xe}ms ${Ie}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = rn(a, l), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, xe + 60);
}
function rt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(nn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function it(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(nn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const tr = N ? "px-6" : "px-5", nr = N ? "py-3" : "py-2.5", rr = N ? "text-sm" : "text-xs", ir = N ? "w-4 h-4" : "w-3.5 h-3.5", or = N ? "text-base" : "text-sm", sr = N ? "w-5 h-5" : "w-4 h-4", ot = N ? "px-6" : "px-5", cr = N ? "pt-6" : "pt-5", lr = N ? "pb-6" : "pb-5", ar = N ? "text-xs" : "text-[10px]", ur = N ? "w-3.5 h-3.5" : "w-3 h-3", dr = N ? "px-2.5 py-1.5" : "px-2 py-1", fr = N ? "px-6" : "px-5", hr = N ? "py-3" : "py-2";
function mr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: a,
  footer: s,
  children: l,
  onReset: u,
  morph: c = !0,
  flat: f = !1,
  closable: o = !0
}) {
  const h = b(null), d = b(null), x = b(null), [g, y] = H(!1), k = X((m) => {
    h.current = m, y(m !== null);
  }, []), z = He(), P = Se(), K = b(P);
  K.current = P;
  const [_, B] = H(null), L = b(null), R = b(!1), Y = b(!1), p = b(0), v = b({ w: 0, h: 0 }), T = b(!1), [S, I] = H(!1), [U, J] = H(!1), ee = b(0), $ = b(!1), [F, te] = H(!1), C = b(c);
  C.current = c;
  const W = b(!1), A = b(!1), w = () => {
    A.current = !0, I(!0);
  }, V = () => {
    A.current = !1, I(!1);
  };
  q(() => {
    e || (B(null), T.current = !1, R.current = !1, J(!1));
  }, [e]), fe(() => {
    if (!e || T.current || !g || !h.current || N) return;
    T.current = !0;
    const m = h.current.getBoundingClientRect(), D = K.current ?? null, O = (D == null ? void 0 : D.innerWidth) ?? 0, Z = Me(D);
    B({
      left: Math.max(re, Math.min((O - m.width) / 2, O - m.width - re)),
      top: Math.max(Z.top + re, Math.min(Z.top + (Z.height - m.height) / 2, Z.bottom - m.height - re))
    });
  }, [e, g]), fe(() => {
    if (!e || !g || !c || Ae() || !h.current) return;
    const m = h.current, D = rt(m), O = D[D.length - 1];
    w(), O ? Pt(ee, m, O.getBoundingClientRect(), V) : er(ee, m, V);
  }, [e, g]);
  const be = X(() => {
    if (!o || $.current) return;
    const m = h.current, D = !!m && rt(m).length > 0;
    if (!m || !c || Ae() || D) {
      t();
      return;
    }
    $.current = !0, te(!0), W.current = !0, w(), It(ee, m, () => {
      $.current = !1, te(!1), V(), t();
    });
  }, [c, t, o]), le = X(() => {
    const m = h.current;
    if (!m || W.current || !C.current || Ae() || rt(m).length > 0) return;
    const D = m.ownerDocument, O = m.cloneNode(!0);
    O.removeAttribute("data-modal-stack"), O.removeAttribute("data-state"), O.removeAttribute("role"), O.removeAttribute("data-aria-hidden"), O.removeAttribute("tabindex"), O.setAttribute("aria-hidden", "true"), O.style.pointerEvents = "none", D.body.appendChild(O), It({ current: 0 }, O, () => {
      O.isConnected && O.remove();
    });
  }, []);
  fe(() => () => le(), [le]);
  const Ee = b(e);
  fe(() => {
    const m = Ee.current;
    Ee.current = e, m && !e && le();
  }, [e, g, le]), q(() => {
    if (!e || !g || !c || !h.current) return;
    const m = h.current, D = m.parentNode;
    if (!D) return;
    let O = 0, Z = null, G = !1;
    const ne = () => {
      O = 0;
      const de = it(m);
      if (de.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", Z = de[de.length - 1].getBoundingClientRect(), G = !0, O = requestAnimationFrame(ne);
      else if (G) {
        G = !1, Z && !Ae() && (w(), Pt(ee, m, Z, V)), Z = null;
        const ae = K.current ?? null;
        ae == null || ae.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, pe = new MutationObserver(() => {
      !O && it(m).length > 0 && (O = requestAnimationFrame(ne));
    });
    return pe.observe(D, { childList: !0 }), () => {
      pe.disconnect(), O && cancelAnimationFrame(O);
    };
  }, [e, g]), q(() => {
    if (N || !g || !c || Ae() || !h.current) return;
    const m = h.current;
    let D = Math.round(m.getBoundingClientRect().height), O = !1;
    const Z = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const G = Math.round(m.getBoundingClientRect().height);
      if (!O) {
        O = !0, D = G;
        return;
      }
      if (Math.abs(G - D) < 1) return;
      if (L.current || $.current || it(m).length > 0) {
        D = G;
        return;
      }
      if (A.current) return;
      const ne = D;
      D = G, w();
      const pe = m.getBoundingClientRect(), de = Me(K.current ?? null), ae = !R.current && !Y.current, et = ae ? de.top + (de.height - ne) / 2 : pe.top, Le = ae ? de.top + (de.height - G) / 2 : pe.top;
      m.style.transition = "none", m.style.height = `${ne}px`, ae && (m.style.top = `${et}px`), d.current && (d.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${ne}px` && (m.style.transition = `height ${xe}ms ${Ie}${ae ? `, top ${xe}ms ${Ie}` : ""}`, m.style.height = `${G}px`, ae && (m.style.top = `${Le}px`), window.setTimeout(() => {
            m.style.height === `${G}px` && (m.style.transition = "", m.style.height = "", d.current && (d.current.style.overflow = ""), ae && B({ left: pe.left, top: Le }), V());
          }, xe + 60));
        });
      });
    });
    return Z.observe(m), () => Z.disconnect();
  }, [g]);
  const oe = X(() => {
    const m = h.current;
    if (!m) return null;
    const D = m.getBoundingClientRect();
    return { left: D.left, top: D.top, width: D.width, height: D.height };
  }, []), se = X((m, D) => {
    const O = K.current ?? null, Z = (O == null ? void 0 : O.innerWidth) ?? 0, G = Me(O), ne = oe(), pe = ne ? ne.width : Math.min(Z - re * 2, 576), de = ne ? ne.height : Math.min(G.height - re * 2, 400);
    return {
      left: Math.max(re, Math.min(m, Z - pe - re)),
      top: Math.max(G.top + re, Math.min(D, G.bottom - de - re))
    };
  }, [oe]);
  q(() => {
    if (N || !e) return;
    const m = K.current ?? null, D = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !D) return;
    const O = 120;
    Y.current = !1, v.current = { w: m.innerWidth, h: m.innerHeight };
    let Z = 0;
    const G = () => {
      if ($.current || L.current) return;
      const ne = (m == null ? void 0 : m.innerHeight) ?? 0, pe = (m == null ? void 0 : m.innerWidth) ?? 0, ae = Me(m).height < ne - O, et = ne < v.current.h - O && pe === v.current.w;
      ae || et ? (Y.current = !0, p.current && (clearTimeout(p.current), p.current = 0)) : p.current || (p.current = (m == null ? void 0 : m.setTimeout(() => {
        Y.current = !1, p.current = 0, J(!1);
      }, 600)) ?? 0), J(Y.current), !Z && (Z = requestAnimationFrame(() => {
        var Dt;
        Z = 0;
        const Le = h.current;
        if (!Le) return;
        const Ne = Me(K.current ?? null), ge = Le.getBoundingClientRect(), St = ((Dt = K.current) == null ? void 0 : Dt.innerWidth) ?? 0, tt = (m == null ? void 0 : m.innerHeight) ?? 0, dn = Ne.height < tt - O || tt < v.current.h - O && (m == null ? void 0 : m.innerWidth) === v.current.w;
        v.current = { w: (m == null ? void 0 : m.innerWidth) ?? 0, h: tt };
        const Ke = ge.top >= Ne.top + re && ge.bottom <= Ne.bottom - re, Lt = () => {
          B({
            left: Math.max(re, Math.min((St - ge.width) / 2, St - ge.width - re)),
            top: Math.max(Ne.top + re, Math.min(Ne.top + (Ne.height - ge.height) / 2, Ne.bottom - ge.height - re))
          });
        };
        if (dn) {
          if (R.current) {
            Ke || B(se(ge.left, ge.top));
            return;
          }
          if (Ke) return;
          Lt();
          return;
        }
        if (!Y.current) {
          if (R.current) {
            Ke || B(se(ge.left, ge.top));
            return;
          }
          Ke || Lt();
        }
      }));
    };
    return D.addEventListener("resize", G), D.addEventListener("scroll", G), m.addEventListener("orientationchange", G), () => {
      D.removeEventListener("resize", G), D.removeEventListener("scroll", G), m.removeEventListener("orientationchange", G), Z && cancelAnimationFrame(Z), p.current && clearTimeout(p.current);
    };
  }, [e, se]);
  const ze = X((m) => {
    if (m.target.closest("button")) return;
    R.current = !0;
    const D = oe();
    D && (B(se(D.left, D.top)), L.current = { startX: m.clientX, startY: m.clientY, posX: D.left, posY: D.top }, m.target.setPointerCapture(m.pointerId));
  }, [oe, se]), M = X((m) => {
    const D = L.current;
    D && (m.preventDefault(), B(se(D.posX + m.clientX - D.startX, D.posY + m.clientY - D.startY)));
  }, [se]), Q = X(() => {
    L.current = null;
  }, []), ie = L.current !== null, ce = _ !== null, he = ce ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", me = `${a ? `${a} w-full` : "max-w-xl w-full"}`, we = {
    ...ce ? { left: _.left, top: _.top } : {},
    width: `min(100%, calc(100vw - ${re * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...U ? {} : { maxHeight: `calc(100vh - ${re * 2}px)` }
  }, ke = X((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const O = x.current;
    if (!O) return;
    const Z = Array.from(O.querySelectorAll("button[data-modal-confirm]")), G = Z.length > 0 ? Z : Array.from(O.querySelectorAll("button")), ne = G[G.length - 1];
    !ne || ne.disabled || (m.preventDefault(), ne.click());
  }, []);
  return /* @__PURE__ */ i(ye.Root, { open: e, onOpenChange: (m) => {
    m || be();
  }, children: /* @__PURE__ */ E(ye.Portal, { container: z ?? void 0, children: [
    /* @__PURE__ */ i(
      ye.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${F ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), be());
        }
      }
    ),
    /* @__PURE__ */ E(
      ye.Content,
      {
        ref: k,
        onKeyDown: ke,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${he} ${me}`,
        style: { touchAction: "manipulation", ...Object.keys(we).length > 0 ? we : {} },
        children: [
          f ? /* @__PURE__ */ E(
            "div",
            {
              className: `flex items-center justify-between ${ot} ${cr} pb-4 ${ie ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                S || ze(m);
              },
              onPointerMove: M,
              onPointerUp: Q,
              children: [
                /* @__PURE__ */ i(ye.Title, { className: `${or} font-bold text-white truncate`, children: n }),
                o && /* @__PURE__ */ i(ye.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(lt, { className: sr }) })
              ]
            }
          ) : /* @__PURE__ */ E(
            "div",
            {
              className: `flex items-center justify-between ${tr} ${nr} border-b border-zinc-800 shrink-0 bg-zinc-950 ${ie ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                S || ze(m);
              },
              onPointerMove: M,
              onPointerUp: Q,
              children: [
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(ye.Title, { className: `${rr} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ E("button", { onClick: u, className: `flex items-center gap-1 ${ar} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${dr} shrink-0`, children: [
                    /* @__PURE__ */ i(Yt, { className: ur }),
                    "Reset"
                  ] }),
                  o && /* @__PURE__ */ i(ye.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(lt, { className: ir }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: d, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${f ? ` ${ot} pb-4` : ""}`, children: l }),
          s && /* @__PURE__ */ i("div", { ref: x, className: f ? `${ot} ${lr}` : "shrink-0", children: f ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: s }) : s })
        ]
      }
    )
  ] }) });
}
function Ci({ children: e }) {
  return /* @__PURE__ */ i("div", { className: `flex items-center justify-end gap-3 ${fr} ${hr} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const pr = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${N ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, gr = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function We({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      className: `${pr} ${gr[e]} ${t}`,
      ...r
    }
  );
}
function br({ checked: e, onChange: t, disabled: n = !1, label: r, id: a, className: s = "", labelClassName: l = "", theme: u, variant: c = "pill", tone: f = "accent", block: o = !1 }) {
  const h = c !== "plain", d = N ? "w-5 h-5" : "w-4 h-4", x = N ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", g = N ? "w-3.5 h-3.5" : "w-3 h-3", y = N ? "text-sm" : "text-xs";
  return /* @__PURE__ */ E(
    "label",
    {
      className: `ui-checkbox ${h ? `ui-checkbox-pill ${N ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${f === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${s}`,
      style: { display: o ? "flex" : "inline-flex", alignItems: "center", gap: N ? 10 : 8 },
      onClick: (z) => z.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: a,
            checked: e,
            disabled: n,
            onChange: (z) => t(z.target.checked),
            className: "sr-only"
          }
        ),
        h ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ E("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: `ui-checkbox-box ${x}`, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", className: g, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${y} ${l}`, children: r })
      ]
    }
  );
}
const xr = N ? "space-y-5" : "space-y-4", yr = N ? "text-sm" : "text-xs", vr = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", on = Oe(null);
function Ti() {
  const e = _e(on);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Ri({ children: e }) {
  const [t, n] = H(null), [r, a] = H(!1), s = b(null), l = X((d) => {
    if (d.suppressKey) {
      const x = localStorage.getItem(d.suppressKey);
      if (x && Date.now() < parseInt(x, 10))
        return Promise.resolve(!0);
    }
    return new Promise((x) => {
      a(!1), n({ kind: "confirm", options: d, resolve: x });
    });
  }, []), u = X((d) => new Promise((x) => {
    n({ kind: "prompt", options: d, resolve: x });
  }), []), c = X((d) => new Promise((x) => {
    n({ kind: "alert", options: d, resolve: x });
  }), []);
  q(() => {
    if (t) {
      const d = setTimeout(() => {
        var x;
        return (x = s.current) == null ? void 0 : x.focus();
      }, 50);
      return () => clearTimeout(d);
    }
  }, [t]);
  const f = X(() => {
    var d, x;
    if (t) {
      if (t.kind === "confirm") {
        const g = t.options;
        g.suppressKey && r && localStorage.setItem(g.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((x = (d = s.current) == null ? void 0 : d.value) == null ? void 0 : x.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), o = t !== null;
  q(() => {
    if (!o) return;
    const d = (x) => {
      x.key !== "Enter" || x.shiftKey || x.metaKey || x.ctrlKey || x.altKey || x.isComposing || (x.preventDefault(), x.stopImmediatePropagation(), f());
    };
    return document.addEventListener("keydown", d, !0), () => document.removeEventListener("keydown", d, !0);
  }, [o, f]);
  const h = X(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ E(on.Provider, { value: { confirm: l, prompt: u, alert: c }, children: [
    e,
    /* @__PURE__ */ i(
      mr,
      {
        open: o,
        onClose: h,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ E(ve, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(We, { variant: "ghost", onClick: h, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(We, { onClick: f, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            We,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: f,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(We, { "data-modal-confirm": !0, onClick: f, children: "Save" })
        ] }),
        children: /* @__PURE__ */ E("div", { className: xr, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { className: `${yr} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            br,
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
              ref: s,
              type: "text",
              defaultValue: t.options.defaultValue || "",
              placeholder: t.options.placeholder,
              className: `w-full ${vr} ui-input`
            }
          )
        ] })
      }
    )
  ] });
}
const wr = 500, kr = 250, Nr = 5, ue = 88, Ot = 4;
function $r(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const a = performance.now(), s = (l) => {
    const u = l - a, c = Math.min(u / t, 1);
    n.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(s);
  };
  requestAnimationFrame(s);
}
function Er({ x: e, y: t, ms: n }) {
  const r = b(null), a = He();
  return q(() => {
    r.current && $r(r.current, n);
  }, [n]), bt(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "fixed",
          left: e - ue / 2,
          top: t - ue / 2,
          width: ue,
          height: ue,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ E("svg", { ref: r, width: ue, height: ue, viewBox: `0 0 ${ue} ${ue}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: ue / 2,
              cy: ue / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Ot + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: ue / 2,
              cy: ue / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: Ot,
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
function Si() {
  return { "data-no-longpress": "true" };
}
function zr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Li({
  children: e,
  showRing: t = !0,
  longPressMs: n = wr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: a,
  onLongPress: s
}) {
  const [l, u] = H(null), c = Ut(), f = b(null), o = b(null), h = b({ x: 0, y: 0, target: null }), d = b(!1), x = Math.min(kr, n * 0.5), g = b(a);
  g.current = a;
  const y = b(s);
  return y.current = s, q(() => {
    if (!N || !c) return;
    const k = (_) => {
      if (!dt(_.pointerType) || _.button !== 0) return;
      const B = _.target;
      if (!B.closest(r) || (g.current ? !g.current(B) : zr(B))) return;
      const L = _.clientX, R = _.clientY;
      h.current = { x: L, y: R, target: _.target }, d.current = !0, t && (o.current = setTimeout(() => u({ x: L, y: R }), x)), f.current = setTimeout(() => {
        if (!d.current) return;
        o.current && (clearTimeout(o.current), o.current = null), u(null);
        const Y = h.current.target;
        if (!Y) return;
        const p = y.current;
        if (p) {
          p(Y, L, R);
          return;
        }
        const v = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: L,
          clientY: R,
          button: 2,
          view: window
        });
        Y.dispatchEvent(v);
      }, n);
    }, z = (_) => {
      if (!d.current || f.current === null) return;
      const B = _.clientX - h.current.x, L = _.clientY - h.current.y;
      Math.sqrt(B * B + L * L) > Nr && (clearTimeout(f.current), f.current = null, o.current && (clearTimeout(o.current), o.current = null), d.current = !1, u(null));
    }, P = () => {
      f.current !== null && (clearTimeout(f.current), f.current = null), o.current !== null && (clearTimeout(o.current), o.current = null), d.current = !1, u(null);
    }, K = (_) => {
      dt(_.pointerType) && (f.current !== null && (clearTimeout(f.current), f.current = null), o.current !== null && (clearTimeout(o.current), o.current = null), d.current = !1, u(null));
    };
    return c == null || c.addEventListener("pointerdown", k), c.addEventListener("pointermove", z), c.addEventListener("pointerup", P), c.addEventListener("pointercancel", P), c.addEventListener("pointerleave", K), () => {
      c.removeEventListener("pointerdown", k), c.removeEventListener("pointermove", z), c.removeEventListener("pointerup", P), c == null || c.removeEventListener("pointercancel", P), c == null || c.removeEventListener("pointerleave", K), f.current !== null && clearTimeout(f.current), o.current !== null && clearTimeout(o.current);
    };
  }, [t, n, x, r]), /* @__PURE__ */ E(ve, { children: [
    e,
    t && l && /* @__PURE__ */ i(Er, { x: l.x, y: l.y, ms: n - x })
  ] });
}
function Di() {
  const e = Fn();
  return Bn ? e === null || dt(e) : !1;
}
const Ye = N ? "px-3.5 py-2 text-sm" : "px-2.5 py-1 text-xs", mt = N ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs", Cr = `inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${N ? "gap-2" : "gap-1.5"}`, Tr = {
  light: {
    subtle: { base: `${Ye} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
    primary: { base: `${mt} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
    "danger-ghost": { base: `${Ye} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
  },
  dark: {
    subtle: { base: `${Ye} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
    primary: { base: `${mt} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
    "danger-ghost": { base: `${Ye} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
  }
}, _t = `${mt} bg-blue-950 hover:bg-blue-900 text-white`, Rr = "bg-blue-900!";
function Ai({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: a = "button",
  ...s
}) {
  const l = s["data-state"] === "open", u = Tr[t][e];
  let c = `${u.base} ${l ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (c = l ? `${_t} ${Rr}` : _t), /* @__PURE__ */ i("button", { type: a, className: `${Cr} ${c} ${r}`, ...s });
}
const Sr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Lr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], st = 1900, ct = 2100;
function Dr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Ar(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Mi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: a = "", initialView: s }) {
  const l = /* @__PURE__ */ new Date(), u = (() => {
    if (!s) return l;
    const $ = /* @__PURE__ */ new Date(s + "T00:00:00");
    return isNaN($.getTime()) ? l : $;
  })(), [c, f] = H(u.getFullYear()), [o, h] = H(u.getMonth()), [d, x] = H("days"), [g, y] = H(null), k = Xe(() => new Set(e), [e]), z = ($) => {
    k.has($) ? t(e.filter((F) => F !== $)) : t([...e, $]);
  }, P = Xe(() => {
    const $ = Dr(c, o), F = new Date(c, o, 1).getDay(), te = [];
    for (let C = 0; C < F; C++) te.push({ key: `pad-${C}`, day: 0, empty: !0 });
    for (let C = 1; C <= $; C++) te.push({ key: Ar(c, o, C), day: C, empty: !1 });
    return te;
  }, [c, o]), K = ($) => f((F) => Math.max(st, Math.min(ct, F + $))), _ = ($) => {
    o + $ < 0 ? (f((F) => Math.max(st, F - 1)), h(11)) : o + $ > 11 ? (f((F) => Math.min(ct, F + 1)), h(0)) : h((F) => F + $);
  }, B = () => {
    if (g === null) return;
    const $ = parseInt(g, 10);
    !isNaN($) && $ >= st && $ <= ct && f($), y(null);
  }, L = ($) => e.some((F) => F.startsWith(`${c}-${String($ + 1).padStart(2, "0")}`)), R = n === "dark", Y = N ? "p-2" : "p-1", p = N ? "w-5 h-5" : "w-4 h-4", v = N ? "text-[11px] py-2" : "text-[10px] py-1.5", T = N ? "py-2.5 text-sm" : "py-1.5 text-xs", S = N ? "py-3 text-sm" : "py-2 text-xs", I = N ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", U = N ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, J = R ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ee = R ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ E("div", { className: `border rounded-lg overflow-hidden w-full ${R ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${a}`, children: [
    /* @__PURE__ */ E("div", { className: `flex items-center justify-between px-3 py-2 border-b ${R ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? K(-1) : _(-1),
          className: `${Y} rounded transition-colors ${R ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(pn, { className: p })
        }
      ),
      d === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => x("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${R ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(c, o).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: g ?? String(c),
          onChange: ($) => y($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: B,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), B()), $.key === "Escape" && y(null);
          },
          className: U
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? K(1) : _(1),
          className: `${Y} rounded transition-colors ${R ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(ut, { className: p })
        }
      )
    ] }),
    d === "months" ? /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Lr.map(($, F) => /* @__PURE__ */ E(
        "button",
        {
          type: "button",
          onClick: () => {
            h(F), x("days");
          },
          className: `${S} relative font-medium transition-colors border-b ${F === o ? J : ee} ${R ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            $,
            L(F) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${F === o ? "bg-white" : R ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${R ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            f(l.getFullYear()), h(l.getMonth()), x("days");
          },
          className: `px-3 ${N ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${R ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ E("div", { className: "grid grid-cols-7 text-center", children: [
      Sr.map(($) => /* @__PURE__ */ i("div", { className: `${v} font-semibold uppercase tracking-wider border-b ${R ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: $ }, $)),
      P.map(($) => $.empty ? /* @__PURE__ */ i("div", {}, $.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => z($.key),
          className: `${T} font-medium transition-colors border-b ${R ? "border-zinc-800/60" : "border-zinc-50"} ${k.has($.key) ? J : R ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ E("div", { className: `px-3 py-2 border-t ${R ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ E("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map(($) => {
        const F = /* @__PURE__ */ new Date($ + "T00:00:00"), te = F.getFullYear() === l.getFullYear() ? F.toLocaleString("default", { month: "short", day: "numeric" }) : F.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ E(
          "button",
          {
            type: "button",
            onClick: () => z($),
            "aria-label": `Remove ${te}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${R ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${I}`,
            children: [
              te,
              /* @__PURE__ */ i("span", { className: `leading-none ${R ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function Pi({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: a,
  allSelected: s = !1,
  toggleAllLabel: l,
  emptyHint: u = "Nothing here",
  maxHeight: c,
  disabled: f = !1,
  theme: o,
  className: h = ""
}) {
  const d = (k) => t instanceof Set ? t.has(k) : t.includes(k), x = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", g = N ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", y = r != null || a != null;
  return /* @__PURE__ */ E("div", { className: h, ...o ? { "data-theme": o } : {}, children: [
    y && /* @__PURE__ */ E("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      a != null && /* @__PURE__ */ i("button", { type: "button", disabled: f, onClick: a, className: "ui-checklist-toggleall", children: l ?? (s ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((k) => {
            const z = d(k.id);
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(k.id),
                className: `ui-checklist-item ${x} ${z ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-checklist-box ${g}`, "aria-hidden": !0, children: z && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  k.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: k.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: k.label }),
                  k.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: k.secondary })
                ]
              },
              k.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: u })
        ]
      }
    )
  ] });
}
function Ii({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: a = "Nothing here",
  maxHeight: s,
  compact: l = !1,
  disabled: u = !1,
  theme: c,
  className: f = ""
}) {
  const o = l ? "px-2.5 py-1.5 text-xs" : N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", h = l ? "w-3.5 h-3.5" : N ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ E("div", { className: f, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ E(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          e.map((d) => {
            const x = t === d.id;
            return /* @__PURE__ */ E(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(d.id),
                className: `ui-checklist-item ${o} ${x ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-radio-circle ${h}`, "aria-hidden": !0, children: x && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
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
const Oi = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: a = "visible",
  offset: s = 8
}) => {
  const l = Se(), { refs: u, floatingStyles: c } = wn({
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
          var P;
          if (a !== "visible") return {};
          const o = (P = f.elements.floating.ownerDocument) == null ? void 0 : P.defaultView;
          if (!o) return {};
          const h = f.rects.reference, d = Math.max(h.x, 0), x = Math.max(h.y, 0), g = Math.min(h.x + h.width, o.innerWidth), y = Math.min(h.y + h.height, o.innerHeight);
          if (g <= d || y <= x) return {};
          const k = r === "left" ? g - (h.x + h.width) : r === "right" ? d - h.x : 0, z = r === "top" ? x - h.y : r === "bottom" ? y - (h.y + h.height) : 0;
          return { x: f.x + k, y: f.y + z };
        }
      },
      Nn(s),
      $n({ padding: 8 }),
      En({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (f) => {
          var y;
          const o = (y = f.elements.floating.ownerDocument) == null ? void 0 : y.defaultView;
          if (!o) return {};
          const h = f.rects.floating.width, d = f.rects.floating.height, x = Math.max(8, Math.min(f.x, o.innerWidth - h - 8)), g = Math.max(8, Math.min(f.y, o.innerHeight - d - 8));
          return { x, y: g };
        }
      }
    ],
    whileElementsMounted: kn
  });
  return fe(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ E(ve, { children: [
    !n && /* @__PURE__ */ i("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    l && bt(
      /* @__PURE__ */ i(
        "div",
        {
          ref: u.setFloating,
          className: `ui-chrome ${e}`,
          style: c,
          onMouseDown: (f) => f.stopPropagation(),
          onClick: (f) => f.stopPropagation(),
          onDragStart: (f) => f.preventDefault(),
          children: t
        }
      ),
      l.document.body
    )
  ] });
}, Pe = ({ content: e, children: t }) => {
  const n = He(), r = Se(), [a, s] = H(!1), [l, u] = H({ x: 0, y: 0 }), c = b(null), f = () => {
    if (!c.current) return;
    const o = c.current.getBoundingClientRect();
    u({ x: o.left + o.width / 2, y: o.top });
  };
  return q(() => (a && r && (f(), r.addEventListener("scroll", f, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", f, !0)), [a]), /* @__PURE__ */ E(
    "div",
    {
      ref: c,
      className: "inline-flex",
      onMouseEnter: () => {
        f(), s(!0);
      },
      onMouseLeave: () => s(!1),
      children: [
        t,
        a && bt(
          /* @__PURE__ */ E(
            "div",
            {
              className: `fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 ${N ? "px-3 py-1.5 bg-zinc-900 text-white text-xs" : "px-2.5 py-1.5 bg-zinc-900 text-white text-[10px]"}`,
              style: { left: l.x, top: l.y - (N ? 24 : 20), transform: "translate(-50%, -100%)", zIndex: 99999 },
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
}, _i = N ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", pt = N ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", qe = N ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Mr = "hover:bg-red-950/50", sn = N ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", cn = "bg-blue-900/50 border-blue-700 text-blue-300", ln = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Pr = N ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Hi = N ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Ve = N ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Ir = "inline-flex rounded overflow-hidden border border-zinc-700", an = N ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ue = ({ onClick: e, disabled: t, title: n, className: r = pt, children: a }) => /* @__PURE__ */ i(Pe, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: a }) }), Bi = ({ value: e, options: t, onChange: n, disabled: r, active: a }) => /* @__PURE__ */ i("div", { className: Ir, children: t.map((s) => {
  const l = a ? a(s.v) : e === s.v;
  return /* @__PURE__ */ i(
    "button",
    {
      disabled: r,
      onClick: () => n(s.v),
      className: `${N ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${l ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${s.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: s.l
    },
    s.v
  );
}) }), Fi = ({ children: e }) => /* @__PURE__ */ E("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: N ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Or = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", _r = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Ki = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ E("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? Or : _r, children: e }),
  t
] }), Wi = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ E("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Yi = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: a }) => /* @__PURE__ */ E(ve, { children: [
  /* @__PURE__ */ i(Ue, { onClick: () => r(-1), disabled: e, title: "Move up", className: qe, children: /* @__PURE__ */ i(gn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(Ue, { onClick: () => r(1), disabled: e, title: "Move down", className: qe, children: /* @__PURE__ */ i(bn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(Ue, { onClick: t, disabled: e, title: "Duplicate", className: qe, children: /* @__PURE__ */ i(Wt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: Ve }),
  /* @__PURE__ */ i(Ue, { onClick: n, disabled: e, title: "Delete", className: `${qe} ${Mr}`, children: /* @__PURE__ */ i(at, { className: "w-2.5 h-2.5" }) })
] }), Hr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Br = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Fr = /^(https?:\/\/|mailto:)/i;
function Kr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const a = n.slice(0, r).trim().toLowerCase(), s = n.slice(r + 1).trim();
    Br.has(a) && s && t.push(`${a}: ${s}`);
  }
  return t.join("; ");
}
function gt(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const u = document.createDocumentFragment();
    for (const c of Array.from(t.childNodes)) u.appendChild(gt(c));
    return u;
  };
  if (!Hr.has(n)) return r();
  if (n === "a") {
    const u = t.getAttribute("href") || "";
    if (!Fr.test(u)) return r();
  }
  const a = document.createElement(n), s = t.getAttribute("style"), l = Kr(s || "");
  if (l && a.setAttribute("style", l), n === "a") {
    a.setAttribute("href", t.getAttribute("href"));
    const u = t.getAttribute("target"), c = t.getAttribute("rel");
    u && a.setAttribute("target", u), c && a.setAttribute("rel", c);
  }
  for (const u of Array.from(t.childNodes)) a.appendChild(gt(u));
  return a;
}
function un(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Wr(e) {
  const t = un(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const l of Array.from(n.content.childNodes)) r.appendChild(gt(l));
  const a = document.createElement("div");
  return a.appendChild(r), a.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function qi(e) {
  const t = un(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Ui(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Yr = { text: "#52525b" }, qr = ({ node: e, selected: t, extension: n, editor: r, view: a, getPos: s }) => {
  var h;
  const l = e.attrs.field ?? "", u = n.options, c = ((h = u.resolve) == null ? void 0 : h.call(u, l)) ?? null, f = (c == null ? void 0 : c.color) ?? Yr, o = (c == null ? void 0 : c.label) ?? `{{${l}}}`;
  return /* @__PURE__ */ i(
    Tn,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: f.text,
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
        var k;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const x = typeof s == "function" ? s() : null;
        if (x == null) return;
        const g = a.state.doc.resolve(x), y = g.nodeAfter;
        y && Ge.isSelectable(y) && a.dispatch(a.state.tr.setSelection(new Ge(g))), (k = u.onTokenClick) == null || k.call(u, l, d.currentTarget.getBoundingClientRect(), x);
      },
      children: o
    }
  );
};
function Ur(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Ht(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const jr = On.extend({
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
    return Cn(qr);
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
    return ["span", zn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Vr = 240, Xr = 280, Gr = ({ props: e, onApi: t }) => {
  const n = Je(), r = b(t);
  r.current = t, q(() => {
    r.current(n);
  }, [n]);
  const a = b(null);
  q(() => {
    var l, u;
    (u = (l = a.current) == null ? void 0 : l.querySelector(".ui-item-highlighted")) == null || u.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex]), q(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const s = $t();
  return /* @__PURE__ */ i(Fe.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Xr, maxHeight: Vr },
      onMouseDown: (l) => l.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: a, children: e.items.map((l) => /* @__PURE__ */ i(
        Zr,
        {
          item: l,
          d: s,
          command: () => e.command({ field: l.key })
        },
        l.key
      )) })
    }
  ) });
}, Zr = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: a, setPointer: s } = tn({
    label: () => e.label,
    activate: n
  });
  return /* @__PURE__ */ E(
    "div",
    {
      role: "option",
      className: `w-full text-left ${t.itemPad} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${t.itemDefault} ${a ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => s(r),
      onClick: n,
      children: [
        /* @__PURE__ */ i("span", { className: `${t.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ i("span", { className: "block w-2 h-2 rounded-full", style: { background: e.color.text } }) }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: e.label }),
        e.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: e.color.text }, children: e.group })
      ]
    }
  );
}, Jr = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(Gr, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const a = _n(r);
      e = { holder: r, root: a, unmount: null, props: n, api: null };
      const s = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: l, y: u, placement: c, strategy: f }) => {
          var d, x;
          if (!e) return;
          const o = (x = (d = e.props) == null ? void 0 : d.clientRect) == null ? void 0 : x.call(d), h = o && !c.endsWith("-end") ? o.width : 0;
          r.style.position = f, r.style.left = `${l + h}px`, r.style.top = `${u}px`;
        }
      });
      e.unmount = s, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      if (!(e != null && e.props) || !e.api) return !1;
      const { items: r, command: a } = e.props;
      if (r.length === 0) return !1;
      const s = e.api, l = n.key;
      if (l === "ArrowDown" || l === "ArrowUp") {
        n.preventDefault();
        const u = s.highlightedIndex, c = l === "ArrowDown" ? 1 : -1;
        return s.setHighlighted((u + c + r.length) % r.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        n.preventDefault();
        const u = s.highlightedIndex, c = u >= 0 ? u : 0, f = s.items[c];
        return f ? f.activate() : r[c] && a({ field: r[c].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, ji = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Qr = $e.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: a,
  onStateChange: s,
  resolveToken: l,
  suggestionItems: u,
  onTokenClick: c,
  onSelectionChange: f
}, o) => {
  const h = b(l);
  h.current = l;
  const d = b(u);
  d.current = u;
  const x = b(c);
  x.current = c;
  const g = b(f);
  g.current = f;
  const y = b(null), k = b(null), z = b(t);
  z.current = t;
  const P = b(r);
  P.current = r;
  const K = b(s);
  K.current = s;
  const _ = b(null), B = (v) => {
    var I;
    const T = {
      bold: v.isActive("bold"),
      italic: v.isActive("italic"),
      underline: v.isActive("underline"),
      strike: v.isActive("strike"),
      link: v.isActive("link"),
      color: v.getAttributes("textStyle").color || ""
    }, S = _.current;
    S && S.bold === T.bold && S.italic === T.italic && S.underline === T.underline && S.strike === T.strike && S.link === T.link && S.color === T.color || (_.current = T, (I = K.current) == null || I.call(K, T));
  }, L = (v) => {
    var J;
    const T = v.state.selection;
    let S = null;
    T instanceof Ge && T.node.type.name === "token" ? (S = { key: T.node.attrs.field ?? "", pos: T.from }, y.current = T.from) : y.current != null && (y.current = v.state.tr.mapping.map(y.current));
    const I = k.current, U = I && S && I.key === S.key && I.pos === S.pos;
    !I && !S || U || (k.current = S, (J = g.current) == null || J.call(g, S));
  }, R = (v) => {
    const T = Wr(Ur(v));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(T) ? "" : T;
  }, Y = $e.useMemo(() => {
    const v = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: T }) => {
        var S;
        return ((S = d.current) == null ? void 0 : S.call(d, T)) ?? [];
      },
      command: ({ editor: T, range: S, props: I }) => {
        T.chain().focus().insertContentAt(S, { type: "token", attrs: { field: I.field } }).run();
      },
      render: Jr
    };
    return jr.configure({
      resolve: h.current ?? null,
      suggestion: v,
      onTokenClick: (T, S, I) => {
        var U;
        y.current = I, (U = x.current) == null || U.call(x, T, S, I);
      }
    });
  }, []), p = Rn({
    immediatelyRender: !1,
    extensions: [
      Ln,
      Dn.configure({ placeholder: n }),
      An,
      Mn,
      In,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Pn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      Y
    ],
    content: Ht(e || ""),
    editable: !r,
    onUpdate: ({ editor: v }) => {
      z.current(R(v.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: v }) => {
      B(v), L(v);
    }
  });
  return q(() => {
    if (!p || p.isFocused) return;
    R(p.getHTML()) !== e && (_.current = null, p.commands.setContent(Ht(e || ""), { emitUpdate: !1 }), B(p));
  }, [e, p]), q(() => {
    p && p.setEditable(!r);
  }, [r, p]), q(() => {
    p && (_.current = null, B(p), L(p));
  }, [p]), fn(o, () => ({
    exec: (v, T) => {
      if (!(!p || P.current))
        switch (v) {
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
    insertToken: (v) => {
      !p || P.current || p.chain().focus().insertContent({ type: "token", attrs: { field: v } }).run();
    },
    replaceToken: (v) => {
      if (!p || P.current) return;
      const T = y.current;
      T != null && p.commands.command(({ tr: S }) => {
        const I = S.doc.nodeAt(T);
        if (!I || I.type.name !== "token") return !1;
        S.setNodeMarkup(T, void 0, { field: v });
        const U = S.doc.resolve(T);
        return U.nodeAfter && U.nodeAfter.type.name === "token" && S.setSelection(new Ge(U)), !0;
      });
    }
  }), [p]), /* @__PURE__ */ i(Sn, { editor: p, className: `richtext-editor ${a || ""}` });
});
Qr.displayName = "RichTextEditor";
const ei = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], ti = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Bt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Vi = ({ value: e, disabled: t, onChange: n }) => {
  const [r, a] = H(!1);
  return /* @__PURE__ */ i(
    Qe,
    {
      open: r,
      onOpenChange: a,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ E("button", { type: "button", disabled: t, className: `${an} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(qt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: ei.map((s) => /* @__PURE__ */ i(Xn, { onClick: () => {
        n(s), a(!1);
      }, icon: s === e ? /* @__PURE__ */ i(Kt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, ni = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, a] = H(!1), [s, l] = H(""), u = () => {
    var f;
    const c = s.trim();
    c && ((f = e.current) == null || f.exec("link", c), a(!1));
  };
  return /* @__PURE__ */ i(
    Qe,
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
          className: `${sn} ${n ? cn : ln}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(vn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ E("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: s,
            onChange: (c) => l(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), u());
            },
            className: Pr + " w-full"
          }
        ),
        /* @__PURE__ */ E("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i("button", { onClick: u, className: pt, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                var c;
                (c = e.current) == null || c.exec("unlink"), a(!1);
              },
              className: pt,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Xi = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: a }) => {
  const [s, l] = H(!1), u = (o, h) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(o, h);
  }, c = (o) => `${sn} ${o ? cn : ln}`, f = (o) => !!(r != null && r[o]);
  return /* @__PURE__ */ E("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(Pe, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i("button", { "aria-label": "Bold", disabled: t || f("bold"), onMouseDown: (o) => o.preventDefault(), onClick: () => u("bold"), className: `${c(((n == null ? void 0 : n.bold) ?? !1) || f("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ i(Pe, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i("button", { "aria-label": "Italic", disabled: t || f("italic"), onMouseDown: (o) => o.preventDefault(), onClick: () => u("italic"), className: `${c(((n == null ? void 0 : n.italic) ?? !1) || f("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ i(Pe, { content: "Underline", children: /* @__PURE__ */ i("button", { "aria-label": "Underline", disabled: t, onMouseDown: (o) => o.preventDefault(), onClick: () => u("underline"), className: c((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ i(xn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(Pe, { content: "Strikethrough", children: /* @__PURE__ */ i("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (o) => o.preventDefault(), onClick: () => u("strikeThrough"), className: c((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ i(yn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: Ve }),
    /* @__PURE__ */ i(ni, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: Ve }),
    /* @__PURE__ */ i(
      Qe,
      {
        open: s,
        onOpenChange: l,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ E("button", { type: "button", disabled: t, className: `${an} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(Bt, {}),
          /* @__PURE__ */ i(qt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ E("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("unsetColor"), l(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(Bt, { className: "w-3.5 h-3.5" })
            }
          ),
          ti.map((o) => /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("foreColor", o), l(!1);
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
    a && /* @__PURE__ */ E(ve, { children: [
      /* @__PURE__ */ i("div", { className: Ve }),
      a
    ] })
  ] });
};
export {
  Ai as Button,
  br as Checkbox,
  Pi as Checklist,
  Wi as ChromeHeader,
  Ki as ContentRow,
  Ni as ContextMenu,
  Ei as ContextMenuDivider,
  $i as ContextMenuItem,
  zi as ContextMenuSub,
  Mi as DatePicker,
  Ri as DialogProvider,
  Xn as DropdownItem,
  Qe as DropdownMenu,
  Zn as DropdownSubmenu,
  Nt as DropdownThemeContext,
  ei as FONTS,
  Oi as FloatingChrome,
  Vi as FontMenu,
  Xi as FormatToolbar,
  N as IS_COARSE,
  Bn as IS_TOUCH_CAPABLE,
  ki as ItemManagerDropdown,
  Li as LongPressMenuProvider,
  yt as MORPH_EASE,
  Re as MORPH_MS,
  vt as MORPH_OPACITY_MS,
  Fe as MenuHighlightContext,
  mr as Modal,
  Ci as ModalFooter,
  We as ModalFooterButton,
  Hn as PopoutWindowContext,
  ji as RICH_TEXT_STATE_IDLE,
  Ii as RadioList,
  Qr as RichTextEditor,
  Fi as SectionHeader,
  Bi as Seg,
  Yi as StructureControls,
  Et as SubmenuContext,
  pt as TB_BTN,
  qe as TB_BTN_ICON,
  Mr as TB_DANGER,
  Ve as TB_DIVIDER,
  Pr as TB_INPUT,
  Hi as TB_NUM,
  an as TB_PICKER,
  _i as TB_ROW_LABEL,
  Ir as TB_SEG,
  sn as TB_TOGGLE,
  ln as TB_TOGGLE_OFF,
  cn as TB_TOGGLE_ON,
  jr as Token,
  qr as TokenChipView,
  Ue as ToolButton,
  Pe as Tooltip,
  wt as ZOOM_FROM,
  Yn as cloneOverlayClose,
  Ui as escapeHtml,
  $t as getDropdownClasses,
  yi as getHardwareKeyboard,
  xi as getLastPointerType,
  zr as isInteractiveElement,
  dt as isTouchLike,
  Xt as nearestOverlayOrigin,
  un as normalizeSpaces,
  nt as overlayMorphEnabled,
  Wn as playOverlayClose,
  Kn as playOverlayOpen,
  Ht as preprocessTokenHtml,
  Wr as sanitizeRichText,
  qi as stripRichText,
  Ur as stripTokenWrappers,
  Ut as useCurrentDocument,
  Se as useCurrentWindow,
  Ti as useDialog,
  Qt as useDropdownTheme,
  qn as useFixedPosition,
  vi as useHardwareKeyboard,
  Fn as useLastPointerType,
  Si as useLongPressOptOut,
  zt as useMenuHighlight,
  kt as useOverlayMorph,
  xt as usePopoutWindow,
  He as usePortalTarget,
  wi as useSmartPosition,
  Di as useTouchMode
};
