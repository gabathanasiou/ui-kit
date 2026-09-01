"use client";
import { jsxs as N, jsx as i, Fragment as Re } from "react/jsx-runtime";
import Me, { createContext as je, useContext as Ue, useState as Y, useEffect as q, useRef as y, useCallback as V, useLayoutEffect as we, useMemo as ct, useImperativeHandle as On } from "react";
import * as J from "@radix-ui/react-dropdown-menu";
import { Check as mn, X as kt, Pencil as _n, Copy as pn, Trash2 as zt, RotateCcw as gn, Plus as Hn, ChevronRight as lt, ChevronLeft as Bn, ArrowUp as Fn, ArrowDown as Yn, ChevronDown as St, Underline as Wn, Strikethrough as Kn, Link as qn } from "lucide-react";
import * as Ce from "@radix-ui/react-dialog";
import { createPortal as Ct } from "react-dom";
import { useFloating as jn, autoUpdate as Un, offset as Xn, flip as Vn, shift as Gn } from "@floating-ui/react-dom";
import { mergeAttributes as Zn, ReactNodeViewRenderer as Jn, NodeViewWrapper as Qn, useEditor as er, EditorContent as tr } from "@tiptap/react";
import { NodeSelection as at } from "@tiptap/pm/state";
import nr from "@tiptap/starter-kit";
import rr from "@tiptap/extension-placeholder";
import { TextStyle as ir } from "@tiptap/extension-text-style";
import or from "@tiptap/extension-color";
import sr from "@tiptap/extension-link";
import cr from "@tiptap/extension-underline";
import { Mention as lr } from "@tiptap/extension-mention";
import { createRoot as ar } from "react-dom/client";
const ur = je(null);
function Rt() {
  return Ue(ur);
}
function Xe() {
  const e = Rt();
  return e ? e.document.body : null;
}
function bn() {
  const e = Rt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function He() {
  return Rt() ?? (typeof window < "u" ? window : null);
}
const Ve = typeof window < "u", ue = Ve && window.matchMedia("(pointer: coarse)").matches, dr = Ve && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
let dt = 0.5;
const Ke = /* @__PURE__ */ new Set();
function ki(e) {
  dt = Math.max(0, Math.min(1, e)), Ke.forEach((t) => t());
}
function yn() {
  return dt;
}
function zi() {
  const [, e] = Y(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return Ke.add(t), () => {
      Ke.delete(t);
    };
  }, []), ue && dt > 0;
}
function de() {
  const [, e] = Y(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return Ke.add(t), () => {
      Ke.delete(t);
    };
  }, []), dt;
}
function k(e, t, n) {
  return ue ? Math.round(e + (t - e) * n) : e;
}
function Ae(e, t) {
  const n = de();
  return ue && n > 0 ? {
    padding: `${k(e.py, t.py, n)}px ${k(e.px, t.px, n)}px`,
    fontSize: `${k(e.fs, t.fs, n)}px`
  } : { padding: `${e.py}px ${e.px}px`, fontSize: `${e.fs}px` };
}
function Nt(e) {
  return e === "touch" || e === "pen";
}
let Oe = null;
const $t = /* @__PURE__ */ new Set();
Ve && window.addEventListener("pointerdown", (e) => {
  Oe = e.pointerType, $t.forEach((t) => t());
}, !0);
function Ni() {
  return Oe;
}
function fr() {
  const [, e] = Y(0), t = y(Oe);
  return q(() => {
    const n = () => {
      t.current !== Oe && (t.current = Oe, e((r) => r + 1));
    };
    return $t.add(n), () => {
      $t.delete(n);
    };
  }, []), Oe;
}
const xn = ["(any-hover: hover)", "(any-pointer: fine)"];
function vn() {
  return Ve ? xn.some((e) => window.matchMedia(e).matches) : !1;
}
let ut = vn();
const Et = /* @__PURE__ */ new Set();
function sn(e) {
  ut !== e && (ut = e, Et.forEach((t) => t()));
}
var hn;
if (Ve) {
  const e = () => sn(vn());
  for (const s of xn) {
    const f = window.matchMedia(s);
    (hn = f.addEventListener) == null || hn.call(f, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (s) => {
    s.isComposing || s.keyCode !== 229 && (s.key === "Enter" || s.key === "Backspace" || s.key === "Process" || s.key === "Unidentified" || sn(!0));
  });
  let n = null, r = null;
  const l = "__penClick", c = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (s) => {
    s.pointerType !== "pen" || s.button !== 0 || (n = { x: s.clientX, y: s.clientY });
  }, !0), window.addEventListener("pointerup", (s) => {
    if (s.pointerType !== "pen") return;
    const f = n;
    if (n = null, !f || Math.hypot(s.clientX - f.x, s.clientY - f.y) > 8) return;
    const a = s.target;
    if (!a || !a.isConnected) return;
    if (a instanceof HTMLInputElement && c.has(a.type)) {
      try {
        a.showPicker();
      } catch {
      }
      return;
    }
    const u = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    u[l] = !0, r = { x: s.clientX, y: s.clientY, time: Date.now() }, a.dispatchEvent(u);
  }, !0), window.addEventListener("click", (s) => {
    s[l] || r && Date.now() - r.time < 1e3 && Math.hypot(s.clientX - r.x, s.clientY - r.y) < 12 && (s.preventDefault(), s.stopPropagation());
  }, !0);
}
function $i() {
  return ut;
}
function Ei() {
  const [, e] = Y(0);
  return q(() => {
    const t = () => e((n) => n + 1);
    return Et.add(t), () => {
      Et.delete(t);
    };
  }, []), ut;
}
const _e = 220, Lt = "cubic-bezier(0.32, 0.72, 0, 1)", Dt = 170, At = 0.94;
function bt(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function wn(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function kn(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return wn({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function hr(e, t, n, r) {
  const l = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${At})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === l && requestAnimationFrame(() => {
      if (e.current !== l) return;
      const s = kn(t, n);
      t.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, t.style.transition = `transform ${_e}ms ${Lt}, opacity ${Dt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === l && (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, r == null || r());
      }, _e + 60);
    });
  });
}
function mr(e, t, n, r) {
  const l = ++e.current, c = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, s = kn(t, n);
  t.style.transition = `transform ${_e}ms ${Lt}, opacity ${Dt}ms ease`, t.style.transformOrigin = `${s.x * 100}% ${s.y * 100}%`, t.style.transform = `scale(${At})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === l && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== l || t.isConnected || (t.style.transition = c.transition, t.style.transform = c.transform, t.style.transformOrigin = c.transformOrigin, t.style.opacity = c.opacity, t.style.pointerEvents = c.pointerEvents, t.style.visibility = c.visibility);
    }));
  }, _e + 60);
}
function pr(e, t, n) {
  const r = e.cloneNode(!0), l = e.getBoundingClientRect(), c = l.width > 0 || l.height > 0 ? l : n ?? l;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${c.left}px`, r.style.top = `${c.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const s = (t == null ? void 0 : t()) ?? null, f = s ? wn({ left: c.left, top: c.top, width: c.width, height: c.height }, s) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${f.x * 100}% ${f.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${_e}ms ${Lt}, opacity ${Dt}ms ease`, r.style.transform = `scale(${At})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, _e + 60));
    });
  });
}
function Mt(e) {
  const t = y(null), [n, r] = Y(!1), l = y(null), c = y(0), s = V((p) => {
    if (e.ref && (e.ref.current = p), p) {
      c.current = 0, t.current = p;
      const T = p.getBoundingClientRect();
      (T.width > 0 || T.height > 0) && (l.current = { left: T.left, top: T.top, width: T.width, height: T.height }), r(!0);
      return;
    }
    const g = t.current, $ = ++c.current;
    queueMicrotask(() => {
      $ === c.current && t.current === g && (t.current = null, r(!1), !(!g || !e.cloneOnUnmount || !a.current) && g.style.visibility !== "hidden" && bt(d.current) && pr(g, o.current, l.current));
    });
  }, []), f = V(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (l.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), a = y(e.visible);
  a.current = e.visible;
  const u = y(e.visible), o = y(e.anchor ?? null);
  o.current = e.anchor ?? null;
  const h = y(e.onClosed);
  h.current = e.onClosed;
  const d = y(e.morph !== !1);
  d.current = e.morph !== !1;
  const x = y(0);
  return we(() => {
    if (!n || !a.current || !bt(d.current)) return;
    const p = t.current;
    p && hr(x, p, o.current);
  }, [n, e.visible]), q(() => {
    if (!n || !a.current) return;
    let p = 0;
    const g = () => {
      p = 0, f(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, f]), we(() => {
    var $;
    const p = u.current;
    if (u.current = e.visible, e.visible || !p) return;
    const g = t.current;
    if (!g || !bt(d.current)) {
      ($ = h.current) == null || $.call(h);
      return;
    }
    mr(x, g, o.current, () => {
      var T;
      return (T = h.current) == null ? void 0 : T.call(h);
    });
  }, [e.visible]), q(() => {
    if (!n || !a.current) return;
    const p = (g) => {
      const $ = t.current;
      $ && $.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), q(() => {
    if (!n || !a.current) return;
    const p = (g) => {
      const $ = t.current;
      $ && $.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), s;
}
function zn(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Ti(e, t) {
  const n = He(), r = y(n);
  r.current = n;
  const l = () => {
    if (!t || !e.current) return;
    const c = e.current.querySelector(".absolute");
    if (!c) return;
    c.style.left = "", c.style.right = "", c.style.top = "", c.style.bottom = "", c.style.maxHeight = "";
    const s = r.current;
    if (!s) return;
    const f = e.current.getBoundingClientRect(), a = c.getBoundingClientRect(), u = s.innerWidth, o = zn(s), h = a.right - u;
    if (h > 0) {
      const d = Math.min(h + 8, a.left);
      c.style.left = `${a.left - f.left - d}px`;
    }
    a.left < 0 && (c.style.left = `${-f.left + 4}px`), a.bottom > o.bottom + 4 && (c.style.top = "auto", c.style.bottom = "100%", c.getBoundingClientRect().top < o.top && (c.style.bottom = "auto", c.style.top = `${-f.top + o.top + 4}px`, c.style.maxHeight = `${o.height - 8}px`));
  };
  we(() => {
    if (l(), !t) return;
    const c = r.current, s = (c == null ? void 0 : c.visualViewport) ?? null;
    return s == null || s.addEventListener("resize", l), s == null || s.addEventListener("scroll", l), c == null || c.addEventListener("resize", l), () => {
      s == null || s.removeEventListener("resize", l), s == null || s.removeEventListener("scroll", l), c == null || c.removeEventListener("resize", l);
    };
  }, [t, e]);
}
function gr(e, t, n, r) {
  const l = He(), c = y(l);
  c.current = l, we(() => {
    if (!t || !e.current) return;
    const s = e.current;
    let f = 0;
    const a = () => {
      f = 0;
      const x = s.getBoundingClientRect(), p = c.current;
      if (!p) return;
      const g = p.innerWidth, $ = zn(p), T = (r == null ? void 0 : r.panelWidth) ?? Math.max(x.width, 200), v = 4, w = 120;
      let A = Math.max(0, x.left);
      A + T > g && (A = Math.max(0, g - T - 8));
      const X = $.bottom - x.bottom - v - 16, _ = x.top - $.top - v - 16;
      if (X >= w || X >= _) {
        const S = Math.min(x.bottom + v, $.bottom), H = Math.max(w, $.bottom - S - 16);
        n({ top: S, left: A, width: x.width, maxH: H });
      } else {
        const S = Math.max(w, Math.min(_, 360)), H = $.bottom - (x.top - v);
        n({ top: 0, left: A, width: x.width, maxH: S, bottom: Math.max(0, H) });
      }
    }, u = () => {
      f || (f = requestAnimationFrame(a));
    }, o = c.current ?? null, h = (o == null ? void 0 : o.document) ?? null;
    u(), h == null || h.addEventListener("scroll", u, { capture: !0, passive: !0 }), o == null || o.addEventListener("resize", u);
    const d = (o == null ? void 0 : o.visualViewport) ?? null;
    return d == null || d.addEventListener("resize", u), d == null || d.addEventListener("scroll", u), () => {
      f && cancelAnimationFrame(f), h == null || h.removeEventListener("scroll", u, { capture: !0 }), o == null || o.removeEventListener("resize", u), d == null || d.removeEventListener("resize", u), d == null || d.removeEventListener("scroll", u);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let Ie = null;
function Nn(e) {
  return Ie == null || Ie(), Ie = e, () => {
    Ie === e && (Ie = null);
  };
}
const Pt = je("dark"), $n = () => Ue(Pt), br = (e) => e ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", cn = (e) => e ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", yr = (e) => e ? "text-xs" : "text-[10px]";
function It(e) {
  const t = ue && yn() > 0;
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
    headerPad: cn(t),
    headerText: `${cn(t)} font-semibold uppercase tracking-wider ${yr(t)} ui-label`,
    // Item padding
    itemPad: br(t),
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
function En(e) {
  const t = [];
  return Me.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (Me.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const Ot = je({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Ge = je(null), _t = () => Ue(Ge);
function ft() {
  const e = y([]), [t, n] = Y(-1), [r, l] = Y(!1), [c, s] = Y(0), f = V((h) => (e.current = [...e.current, h], s((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== h), s((d) => d + 1);
  }), []), a = V((h, d) => {
    n(h), l(d === "pointer");
  }, []), u = V(() => {
    l((h) => h && (n(-1), !1));
  }, []);
  return ct(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: f,
    setHighlighted: a,
    pointerLeave: u
  }), [t, r, c, f, a, u]);
}
function Tn(e) {
  const t = _t(), n = y(t);
  n.current = t;
  const r = y(null);
  q(() => {
    var a;
    const f = { label: e.label(), activate: e.activate };
    return r.current = f, (a = n.current) == null ? void 0 : a.register(f);
  }, []);
  const l = t && r.current ? t.items.indexOf(r.current) : -1, c = !!t && !e.disabled && l >= 0 && l === t.highlightedIndex;
  return { api: t, myIndex: l, highlighted: c, setPointer: (f) => {
    !e.disabled && t && f >= 0 && t.setHighlighted(f, "pointer");
  } };
}
function Ht(e, t, n, r) {
  const l = y(-1);
  l.current = t.highlightedIndex;
  const c = y(t);
  c.current = t;
  const s = y(e);
  s.current = e;
  const f = y(r);
  f.current = r;
  const a = y({ text: "", time: 0 }), u = y(!1);
  u.current || (u.current = !0, n.current = (o) => {
    var d, x;
    if (!s.current) return;
    const h = c.current.items;
    if (h.length !== 0) {
      if (o.key === "ArrowDown" || o.key === "ArrowUp") {
        o.preventDefault(), o.stopImmediatePropagation();
        const p = o.key === "ArrowDown" ? 1 : -1, g = (l.current + p + h.length) % h.length;
        c.current.setHighlighted(g, "keyboard");
      } else if (o.key === "ArrowRight") {
        o.preventDefault(), o.stopImmediatePropagation();
        const p = l.current;
        p >= 0 && p < h.length && h[p].submenu && h[p].activate();
      } else if (o.key === "ArrowLeft")
        o.preventDefault(), o.stopImmediatePropagation(), (x = (d = f.current) == null ? void 0 : d.onCloseSub) == null || x.call(d);
      else if (o.key === "Enter" || o.key === " ") {
        o.preventDefault(), o.stopImmediatePropagation();
        const p = l.current;
        p >= 0 && p < h.length && h[p].activate();
      } else if (o.key.length === 1 && !o.ctrlKey && !o.metaKey && !o.altKey) {
        o.preventDefault(), o.stopImmediatePropagation();
        const p = Date.now(), g = (p - a.current.time > 500 ? "" : a.current.text) + o.key.toLowerCase();
        if (a.current = { text: g, time: p }, !g) return;
        const $ = l.current + 1;
        for (let T = 0; T < h.length; T++) {
          const v = ($ + T) % h.length;
          if (h[v].label.toLowerCase().startsWith(g)) {
            c.current.setHighlighted(v, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Bt(e, t, n, r, l, c) {
  const s = y(t);
  s.current = t;
  const f = y(e);
  f.current = e;
  const a = y(l);
  a.current = l;
  const u = y(!1);
  u.current || (u.current = !0, c.current = (o) => {
    if (!f.current || a.current) return;
    const h = r.current;
    h && h.contains(o.target) || s.current.items.length === 0 || !(o.key === "ArrowDown" || o.key === "ArrowUp" || o.key === "ArrowLeft" || o.key === "ArrowRight" || o.key === "Enter" || o.key === " " || o.key.length === 1 && !o.ctrlKey && !o.metaKey && !o.altKey) || (o.preventDefault(), o.stopImmediatePropagation(), n.current(o));
  });
}
function Ft(e, t) {
  const n = y(e);
  n.current = e;
  const r = y(!1);
  r.current || (r.current = !0, t.current = (l) => {
    if (!n.current) return;
    const c = l.currentTarget;
    c.scrollHeight > c.clientHeight && (l.preventDefault(), c.scrollTop += l.deltaY);
  });
}
function ht({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: l = "left",
  width: c,
  theme: s = "dark",
  children: f,
  morph: a = !0,
  contentClassName: u,
  initialHighlightIndex: o
}) {
  const [h, d] = Y([]), [x, p] = Y(null), g = Xe(), $ = bn(), T = y(null), v = y(null), w = y(e);
  w.current = e;
  const [A, X] = Y(e), _ = ft();
  q(() => {
    if (e)
      return X(!0), _.setHighlighted(o ?? -1, "keyboard"), Nn(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, o, n, t]), q(() => {
    if (!e || !$) return;
    const L = (j) => {
      if (j.pointerType !== "touch") return;
      const se = j.target;
      se && (v.current && v.current.contains(se) || T.current && T.current.contains(se) || se instanceof Element && se.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return $.addEventListener("pointerdown", L, { capture: !0 }), () => $.removeEventListener("pointerdown", L, { capture: !0 });
  }, [e, $, n, t]);
  const S = V(() => {
    const L = T.current;
    if (!L) return null;
    const j = L.getBoundingClientRect();
    return { left: j.left, top: j.top, width: j.width, height: j.height };
  }, []), H = Mt({
    visible: e,
    morph: a,
    anchor: S,
    onClosed: () => X(!1)
  }), b = y(() => {
  }), z = y(() => {
  }), M = y(() => {
  });
  Ht(e && h.length === 0, _, b), Ft(e, z), Bt(e, _, b, v, h.length > 0, M);
  const R = y(null), W = V((L) => {
    var j;
    if (L) {
      L.addEventListener("keydown", b.current, { capture: !0 }), L.addEventListener("wheel", z.current, { passive: !1 });
      const se = L.ownerDocument;
      R.current = se, se.addEventListener("keydown", M.current, { capture: !0 }), B(L.offsetWidth), ge(!0);
    } else
      (j = R.current) == null || j.removeEventListener("keydown", M.current, { capture: !0 }), R.current = null, ge(!1);
    v.current = L, H(L);
  }, [H]), [K, ee] = Y({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [re, he] = Y(0), [me, ge] = Y(!1), [E, B] = Y(0);
  q(() => {
    e && T.current && he(T.current.getBoundingClientRect().width);
  }, [e]);
  const ne = ct(() => ({ panelWidth: E || re || void 0 }), [E, re]);
  gr(T, e && me, (L) => ee({ ...L, maxH: Math.min(L.maxH, 384), ready: !0 }), ne), q(() => {
    if (K.ready && e) {
      const L = v.current;
      L && L.ownerDocument.activeElement !== L && !L.contains(L.ownerDocument.activeElement) && L.focus();
    }
  }, [K.ready, e]), we(() => {
    var j;
    if (!e || _.highlightedIndex < 0) return;
    const L = (j = v.current) == null ? void 0 : j.querySelector(`[data-ei="${_.highlightedIndex}"]`);
    L == null || L.scrollIntoView({ block: "nearest" });
  }, [e, _.highlightedIndex]);
  const F = V((L) => {
    !L && !w.current || (!L && P.current && (te.current = !0), n ? n(L) : L || t == null || t());
  }, [n, t]), O = y(A);
  O.current = A;
  const P = y(!1), te = y(!1), oe = V(() => {
    if (!w.current && O.current) {
      if (te.current) {
        te.current = !1, P.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), ie = Me.isValidElement(r) ? r : null, C = ie ? Me.cloneElement(ie, {
    ref: (L) => {
      T.current = L;
    },
    onPointerDown: () => {
      P.current = !0, te.current = !1;
    },
    onClick: (L) => {
      var j, se;
      (se = (j = ie.props).onClick) == null || se.call(j, L), oe();
    }
  }) : r;
  return /* @__PURE__ */ N(J.Root, { open: e || A, onOpenChange: F, modal: !1, children: [
    /* @__PURE__ */ i(J.Trigger, { asChild: !0, children: C }),
    /* @__PURE__ */ i(J.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i(Pt.Provider, { value: s, children: /* @__PURE__ */ i(Ot.Provider, { value: { chain: h, setChain: d, morph: a, keyboardOpened: x, setKeyboardOpened: p }, children: /* @__PURE__ */ i(Ge.Provider, { value: _, children: /* @__PURE__ */ i(
      J.Content,
      {
        ref: W,
        "data-theme": s,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${c || ""} ${u || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: K.left,
          top: K.bottom != null ? void 0 : K.top,
          bottom: K.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: c ? void 0 : re || void 0,
          maxHeight: K.maxH,
          visibility: K.ready ? "visible" : "hidden"
        },
        onPointerLeave: _.pointerLeave,
        children: f
      }
    ) }) }) }) })
  ] });
}
function Si({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: l,
  onRename: c,
  onDuplicate: s,
  onDelete: f,
  onCreate: a,
  onImport: u,
  onExport: o,
  onReset: h,
  onTrash: d,
  closeOnSelect: x,
  readOnly: p = !1,
  theme: g,
  align: $,
  label: T,
  header: v,
  itemLabel: w,
  trigger: A,
  minItems: X = 1,
  itemRender: _,
  morph: S = !0,
  contentClassName: H
}) {
  const b = It(), [z, M] = Y(null), [R, W] = Y(""), K = y(null), ee = y(null);
  q(() => {
    e && requestAnimationFrame(() => {
      var E, B;
      (B = (E = ee.current) == null ? void 0 : E.querySelector('[data-active="1"]')) == null || B.scrollIntoView({ block: "nearest" });
    });
  }, [e]), q(() => {
    var ne;
    if (!e) return;
    const E = (F) => {
      var C, U, L, j, se;
      if ((U = (C = F.target) == null ? void 0 : C.closest) != null && U.call(C, "input, textarea, [contenteditable]")) return;
      const O = (L = ee.current) == null ? void 0 : L.closest(".ui-menu");
      if (!O || !O.contains(F.target)) return;
      const P = O.ownerDocument, te = [...O.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], oe = [...O.querySelectorAll('div:last-child > [role="menuitem"]')], ie = [...te, ...oe];
      if (F.key === "ArrowDown" || F.key === "ArrowUp") {
        F.preventDefault(), F.stopImmediatePropagation();
        const pe = P.activeElement;
        let ye = pe ? ie.indexOf(pe) : -1;
        if (ye < 0 && pe) {
          const ze = pe.closest("[data-active]"), xe = ze == null ? void 0 : ze.querySelector('[role="menuitem"]:first-child');
          xe && (ye = te.indexOf(xe));
        }
        const ke = F.key === "ArrowDown" ? 1 : -1, Te = ye < 0 ? ke === 1 ? 0 : ie.length - 1 : (ye + ke + ie.length) % ie.length;
        (j = ie[Te]) == null || j.focus({ preventScroll: !0 });
        return;
      }
      if (F.key === "ArrowLeft" || F.key === "ArrowRight") {
        const pe = P.activeElement, ye = pe == null ? void 0 : pe.closest("[data-active]");
        if (!ye) return;
        F.preventDefault(), F.stopImmediatePropagation();
        const ke = [...ye.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ke.length === 0) return;
        const Te = pe && ye.contains(pe) ? ke.indexOf(pe) : -1, ze = F.key === "ArrowRight" ? 1 : -1, xe = Te < 0 ? 0 : (Te + ze + ke.length) % ke.length;
        (se = ke[xe]) == null || se.focus({ preventScroll: !0 });
        return;
      }
    }, B = ((ne = ee.current) == null ? void 0 : ne.ownerDocument) ?? null;
    return B == null || B.addEventListener("keydown", E, { capture: !0 }), () => B == null ? void 0 : B.removeEventListener("keydown", E, { capture: !0 });
  }, [e]), q(() => {
    if (z) {
      requestAnimationFrame(() => {
        var B, ne;
        (B = K.current) == null || B.focus(), (ne = K.current) == null || ne.select();
      });
      const E = n.find((B) => B.id === z);
      E && !R && W(E.name);
    }
  }, [z]), q(() => {
    if (z) {
      const E = n.find((B) => B.id === z);
      E && !R && W(E.name);
    }
  }, [z, n]);
  const re = (E, B) => {
    M(E), W(B);
  }, he = () => {
    z && R.trim() && c(z, R.trim()), M(null);
  }, me = () => {
    M(null);
  }, ge = w || v.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ N(ht, { open: e, onOpenChange: (E) => {
    E ? (M(null), W("")) : (z && R.trim() && c(z, R.trim()), M(null), W("")), (!E || !p) && t(E);
  }, width: "w-80", theme: g, align: $, trigger: A, morph: S, contentClassName: H, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${b.headerText}`, children: v }),
    /* @__PURE__ */ i("div", { ref: ee, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((E) => {
      const B = E.id === r, ne = z === E.id;
      return /* @__PURE__ */ i("div", { "data-active": B ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${B || ne ? b.rowActiveBg : b.rowHoverBg} ${z && !ne ? "opacity-40 pointer-events-none" : ""}`, children: ne ? /* @__PURE__ */ N(Re, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: K,
            value: R,
            onChange: (F) => W(F.target.value),
            onKeyDown: (F) => {
              F.key === "Enter" && (F.preventDefault(), F.stopPropagation(), he()), F.key === "Escape" && (F.preventDefault(), F.stopPropagation(), me());
            },
            className: `w-full border rounded ${b.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${b.editConfirm}`,
            onSelect: (F) => {
              F.preventDefault(), he();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(mn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${b.editCancel}`,
            onSelect: (F) => {
              F.preventDefault(), me();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(kt, { className: b.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ N(Re, { children: [
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none cursor-pointer flex items-center ${b.rowText} ${B ? "" : b.rowTextHover}`,
            onSelect: x ? () => {
              l(E.id);
            } : (F) => {
              F.preventDefault(), l(E.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${B ? b.rowActiveText : ""}`, children: _ ? _(E) : E.name })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${B ? b.btnActive : b.btnBase}`,
            onSelect: (F) => {
              F.preventDefault(), re(E.id, E.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(_n, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${B ? b.btnActive : b.btnBase}`,
            onSelect: (F) => {
              F.preventDefault();
              const O = s(E.id);
              O && re(O, `${E.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(pn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          J.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= X ? b.btnDisabled : B ? b.btnDangerActive : b.btnDanger}`,
            onSelect: (F) => {
              F.preventDefault(), f(E.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= X,
            children: /* @__PURE__ */ i(zt, { className: b.btnIcon })
          }
        )
      ] }) }, E.id);
    }) }),
    /* @__PURE__ */ N("div", { className: `shrink-0 ${z ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ N(Re, { children: [
        /* @__PURE__ */ i(J.Separator, { className: b.separator }),
        /* @__PURE__ */ N(
          J.Item,
          {
            className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
            onSelect: (E) => {
              E.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ i(gn, { className: `${b.btnIcon} ${b.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (a || u || o || d) && /* @__PURE__ */ i(J.Separator, { className: b.separator }),
      a && /* @__PURE__ */ N(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault();
            const B = a();
            B && re(B, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(Hn, { className: `${b.btnIcon} ${b.icon}` }),
            "New ",
            ge
          ]
        }
      ),
      u && /* @__PURE__ */ N(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ N("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      o && /* @__PURE__ */ N(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), o();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ N("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ i("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ i("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ i("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      d && /* @__PURE__ */ N(
        J.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(zt, { className: `${b.btnIcon} ${b.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
function xr({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: l = "",
  children: c,
  keepOpen: s = !1,
  selected: f = !1,
  rightAction: a,
  trailing: u
}) {
  $n();
  const o = It(), h = de(), d = { padding: `${k(8, 12, h)}px ${k(12, 16, h)}px`, fontSize: k(12, 14, h) }, x = y(!1), p = y(null), { myIndex: g, highlighted: $, setPointer: T } = Tn({
    label: () => En(c),
    activate: () => {
      n || e();
    },
    disabled: n
  }), v = r === "danger" ? o.itemDanger : o.itemDefault;
  return /* @__PURE__ */ N(
    J.Item,
    {
      ref: p,
      "data-ei": g >= 0 ? g : void 0,
      style: d,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${v} ${f ? "ui-item-selected" : ""} ${$ ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${l}`,
      onSelect: (w) => {
        if (x.current) {
          x.current = !1;
          return;
        }
        s && w.preventDefault(), e();
      },
      onPointerEnter: () => {
        T(g);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${o.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: c }),
        u && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: u }),
        a && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${o.rightAction}`,
            title: a.title,
            onPointerDown: (w) => {
              w.stopPropagation(), w.preventDefault(), x.current = !0, a.onClick();
            },
            onClick: (w) => {
              w.stopPropagation(), w.preventDefault();
            },
            children: a.icon
          }
        )
      ]
    }
  );
}
function vr({ id: e, label: t, icon: n, width: r, side: l = "right", children: c, contentClassName: s }) {
  const { chain: f, setChain: a, morph: u, keyboardOpened: o, setKeyboardOpened: h } = Ue(Ot), d = f.includes(e), x = f[f.length - 1] === e, p = $n(), g = Xe(), $ = y(null), T = y(null), [v, w] = Y(d), A = !d && v;
  q(() => {
    d && w(!0);
  }, [d]);
  const X = () => a((O) => {
    const P = O.indexOf(e);
    return P >= 0 ? O.slice(0, P) : O;
  }), _ = ft(), S = _t(), H = y(S);
  H.current = S;
  const b = y(null);
  q(() => {
    var P;
    const O = {
      label: t,
      activate: () => {
        h(e), a((te) => te.includes(e) ? te : [...te, e]);
      },
      submenu: !0
    };
    return b.current = O, (P = H.current) == null ? void 0 : P.register(O);
  }, []);
  const z = S && b.current ? S.items.indexOf(b.current) : -1, M = z >= 0 && z === S.highlightedIndex, R = V(() => {
    const O = $.current;
    if (!O) return null;
    const P = O.getBoundingClientRect();
    return { left: P.left, top: P.top, width: P.width, height: P.height };
  }, []), W = Mt({
    visible: d,
    morph: u,
    anchor: R,
    onClosed: () => w(!1)
  }), K = y(() => {
  }), ee = y(() => {
  }), re = y(() => {
  });
  Ht(d && x, _, K, {
    onCloseSub: () => {
      X(), S && z >= 0 && S.setHighlighted(z, "keyboard");
    }
  });
  const he = y(o);
  he.current = o, q(() => {
    d && (he.current === e ? (_.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var O;
      return (O = T.current) == null ? void 0 : O.focus();
    }), h(null)) : _.setHighlighted(-1, "keyboard"));
  }, [d]), Ft(d, ee), Bt(d, _, K, T, !x, re), Me.useLayoutEffect(() => {
    var P;
    if (!d || _.highlightedIndex < 0) return;
    const O = (P = T.current) == null ? void 0 : P.querySelector(`[data-ei="${_.highlightedIndex}"]`);
    O == null || O.scrollIntoView({ block: "nearest" });
  }, [d, _.highlightedIndex]);
  const me = y(null), ge = V((O) => {
    var P;
    if (O) {
      O.addEventListener("keydown", K.current, { capture: !0 }), O.addEventListener("wheel", ee.current, { passive: !1 });
      const te = O.ownerDocument;
      me.current = te, te.addEventListener("keydown", re.current, { capture: !0 });
    } else
      (P = me.current) == null || P.removeEventListener("keydown", re.current, { capture: !0 }), me.current = null;
    T.current = O, W(O);
  }, [W]), E = de(), B = { padding: `${k(8, 12, E)}px ${k(12, 16, E)}px`, fontSize: k(12, 14, E) }, ne = `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${M ? " ui-item-highlighted" : ""}${A ? " ui-sub-closing" : ""}`, F = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${s || ""}`;
  return /* @__PURE__ */ N(J.Sub, { open: d || v, onOpenChange: (O) => a((P) => {
    if (!O) {
      const te = P.indexOf(e);
      return te >= 0 ? P.slice(0, te) : P;
    }
    return P.includes(e) ? P : [...P, e];
  }), children: [
    /* @__PURE__ */ N(
      J.SubTrigger,
      {
        ref: $,
        "data-ei": z >= 0 ? z : void 0,
        style: B,
        className: ne,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          S && z >= 0 && S.setHighlighted(z, "pointer");
        },
        onPointerDown: (O) => {
          O.pointerType === "pen" && (O.preventDefault(), a((P) => d ? P.slice(0, P.indexOf(e)) : [...P, e]));
        },
        children: [
          l === "left" && /* @__PURE__ */ i(lt, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ N("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          l === "right" && /* @__PURE__ */ i(lt, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(J.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i(
      J.SubContent,
      {
        ref: ge,
        "data-theme": p,
        className: F,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: _.pointerLeave,
        children: /* @__PURE__ */ i(Ge.Provider, { value: _, children: c })
      }
    ) })
  ] });
}
const Fe = 8, Ci = ({ open: e, x: t, y: n, onClose: r, children: l, containerRef: c, morph: s = !0 }) => {
  const f = de(), a = k(12, 14, f), u = y(null), o = He(), [h, d] = Y(!1), [x, p] = Y([]), [g, $] = Y(null), T = ft();
  q(() => {
    if (e)
      return T.setHighlighted(-1, "keyboard"), Nn(r);
  }, [e, r]);
  const v = y({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const w = V(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), A = Mt({
    visible: !0,
    morph: s,
    anchor: w,
    cloneOnUnmount: !0
  }), X = y(() => {
  }), _ = y(() => {
  }), S = y(() => {
  });
  Ht(e, T, X), Ft(e, _), Bt(e, T, X, u, x.length > 0, S);
  const H = y(null), b = V((R) => {
    var W;
    if (R) {
      R.addEventListener("keydown", X.current, { capture: !0 }), R.addEventListener("wheel", _.current, { passive: !1 });
      const K = R.ownerDocument;
      H.current = K, K.addEventListener("keydown", S.current, { capture: !0 });
    } else
      (W = H.current) == null || W.removeEventListener("keydown", S.current, { capture: !0 }), H.current = null;
    u.current = R, d(!!R), A(R);
  }, [A]), [z, M] = Y(null);
  return we(() => {
    var ne;
    if (!e || !h || !u.current) return;
    const R = u.current, W = R.offsetWidth, K = R.offsetHeight, ee = (ne = c == null ? void 0 : c.current) == null ? void 0 : ne.getBoundingClientRect(), re = ee ? ee.right : (o == null ? void 0 : o.innerWidth) ?? 0, he = ee ? ee.bottom : (o == null ? void 0 : o.innerHeight) ?? 0, me = ee ? ee.left : 0, ge = ee ? ee.top : 0;
    let E = Math.max(ge + Fe, v.current.top), B = Math.max(me + Fe, v.current.left);
    B + W > re && (B = re - W - Fe), E + K > he && (E = Math.max(ge + Fe, he - K - Fe)), M({ left: B, top: E });
  }, [e, h, t, n, c]), e ? /* @__PURE__ */ N(J.Root, { open: e, onOpenChange: (R) => {
    R || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(J.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(J.Portal, { children: /* @__PURE__ */ i(Pt.Provider, { value: "light", children: /* @__PURE__ */ i(Ot.Provider, { value: { chain: x, setChain: p, morph: s, keyboardOpened: g, setKeyboardOpened: $ }, children: /* @__PURE__ */ i(Ge.Provider, { value: T, children: /* @__PURE__ */ i(
      J.Content,
      {
        ref: b,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: "fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom",
        style: { fontSize: a, left: (z == null ? void 0 : z.left) ?? v.current.left, top: (z == null ? void 0 : z.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: T.pointerLeave,
        children: l
      }
    ) }) }) }) })
  ] }) : null;
}, Ri = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: l = !1, trailing: c, children: s }) => {
  const f = de(), a = { padding: `${k(8, 12, f)}px ${k(12, 16, f)}px`, fontSize: k(12, 14, f) }, u = _t(), o = y(u);
  o.current = u;
  const h = y(null);
  q(() => {
    var g;
    const p = { label: En(s), activate: () => {
      r || e();
    } };
    return h.current = p, (g = o.current) == null ? void 0 : g.register(p);
  }, []);
  const d = u && h.current ? u.items.indexOf(h.current) : -1, x = !r && d >= 0 && d === u.highlightedIndex;
  return /* @__PURE__ */ N(
    J.Item,
    {
      "data-ei": d >= 0 ? d : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && u && d >= 0 && u.setHighlighted(d, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      style: a,
      className: `w-full text-left flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${l ? "ui-item-selected" : ""} ${x ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: s }),
        c && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: c })
      ]
    }
  );
}, Li = () => /* @__PURE__ */ i(J.Separator, { className: "ui-sep my-1" }), Di = (e) => /* @__PURE__ */ i(vr, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), Q = 8, Sn = "[data-modal-stack]", Ee = 220, qe = "cubic-bezier(0.32, 0.72, 0, 1)", ot = 0.94;
function Ye() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function De(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Cn(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function ln(e, t, n, r) {
  const l = ++e.current, c = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = Cn(c, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === l && (t.style.transition = `transform ${Ee}ms ${qe}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === l && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, Ee + 80));
    });
  });
}
function wr(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${ot})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${Ee}ms ${qe}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, Ee + 60));
    });
  });
}
function an(e, t, n) {
  const r = ++e.current, l = t.getBoundingClientRect(), c = 1 - ot, s = { left: l.left + l.width * c / 2, top: l.top + l.height * c / 2, width: l.width * ot, height: l.height * ot };
  t.style.transition = `transform ${Ee}ms ${qe}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = Cn(l, s), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, Ee + 60);
}
function yt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Sn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function xt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Sn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function kr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: l,
  footer: c,
  children: s,
  onReset: f,
  morph: a = !0,
  flat: u = !1,
  closable: o = !0,
  dismissOnBackdrop: h = !0
}) {
  const d = y(null), x = y(null), p = y(null), g = de(), $ = k(20, 24, g), T = k(10, 12, g), v = k(12, 14, g), w = k(14, 16, g), A = k(20, 24, g), X = k(20, 24, g), _ = k(20, 24, g), S = k(14, 16, g), H = k(16, 20, g), b = k(10, 12, g), z = k(12, 14, g), M = k(8, 10, g), R = k(4, 6, g), W = { padding: `${T}px ${$}px` }, K = { fontSize: v }, ee = { padding: `${X}px ${A}px 16px ${A}px` }, re = { fontSize: w }, he = { padding: `0 ${A}px 16px` }, me = { padding: `${_}px ${A}px` }, ge = { fontSize: b, padding: `${R}px ${M}px` }, [E, B] = Y(!1), ne = V((m) => {
    d.current = m, B(m !== null);
  }, []), F = Xe(), O = He(), P = y(O);
  P.current = O;
  const [te, oe] = Y(null), ie = y(null), C = y(!1), U = y(!1), L = y(0), j = y({ w: 0, h: 0 }), se = y(!1), [pe, ye] = Y(!1), [ke, Te] = Y(!1), ze = y(0), xe = y(!1), [Dn, Yt] = Y(!1), Wt = y(a);
  Wt.current = a;
  const Kt = y(!1), mt = y(!1), Je = () => {
    mt.current = !0, ye(!0);
  }, Be = () => {
    mt.current = !1, ye(!1);
  };
  q(() => {
    e || (oe(null), se.current = !1, C.current = !1, Te(!1));
  }, [e]), we(() => {
    if (!e || se.current || !E || !d.current) return;
    se.current = !0;
    const m = d.current.getBoundingClientRect(), D = P.current ?? null, I = (D == null ? void 0 : D.innerWidth) ?? 0, G = De(D);
    oe({
      left: Math.max(Q, Math.min((I - m.width) / 2, I - m.width - Q)),
      top: Math.max(G.top + Q, Math.min(G.top + (G.height - m.height) / 2, G.bottom - m.height - Q))
    });
  }, [e, E]), we(() => {
    if (!e || !E || !a || Ye() || !d.current) return;
    const m = d.current, D = yt(m), I = D[D.length - 1];
    Je(), I ? ln(ze, m, I.getBoundingClientRect(), Be) : wr(ze, m, Be);
  }, [e, E]);
  const qt = V(() => {
    if (!o || xe.current) return;
    const m = d.current, D = !!m && yt(m).length > 0;
    if (!m || !a || Ye() || D) {
      t();
      return;
    }
    xe.current = !0, Yt(!0), Kt.current = !0, Je(), an(ze, m, () => {
      xe.current = !1, Yt(!1), Be(), t();
    });
  }, [a, t, o]), Qe = V(() => {
    const m = d.current;
    if (!m || Kt.current || !Wt.current || Ye() || yt(m).length > 0) return;
    const D = m.ownerDocument, I = m.cloneNode(!0);
    I.removeAttribute("data-modal-stack"), I.removeAttribute("data-state"), I.removeAttribute("role"), I.removeAttribute("data-aria-hidden"), I.removeAttribute("tabindex"), I.setAttribute("aria-hidden", "true"), I.style.pointerEvents = "none", D.body.appendChild(I), an({ current: 0 }, I, () => {
      I.isConnected && I.remove();
    });
  }, []);
  we(() => () => Qe(), [Qe]);
  const jt = y(e);
  we(() => {
    const m = jt.current;
    jt.current = e, m && !e && Qe();
  }, [e, E, Qe]), q(() => {
    if (!e || !E || !a || !d.current) return;
    const m = d.current, D = m.parentNode;
    if (!D) return;
    let I = 0, G = null, Z = !1;
    const le = () => {
      I = 0;
      const ae = xt(m);
      if (ae.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", G = ae[ae.length - 1].getBoundingClientRect(), Z = !0, I = requestAnimationFrame(le);
      else if (Z) {
        Z = !1, G && !Ye() && (Je(), ln(ze, m, G, Be)), G = null;
        const fe = P.current ?? null;
        fe == null || fe.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, ce = new MutationObserver(() => {
      !I && xt(m).length > 0 && (I = requestAnimationFrame(le));
    });
    return ce.observe(D, { childList: !0 }), () => {
      ce.disconnect(), I && cancelAnimationFrame(I);
    };
  }, [e, E]), q(() => {
    if (!E || !a || Ye() || !d.current) return;
    const m = d.current;
    let D = Math.round(m.getBoundingClientRect().height), I = !1;
    const G = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const Z = Math.round(m.getBoundingClientRect().height);
      if (!I) {
        I = !0, D = Z;
        return;
      }
      if (Math.abs(Z - D) < 1) return;
      if (ie.current || xe.current || xt(m).length > 0) {
        D = Z;
        return;
      }
      if (mt.current) return;
      const le = D;
      D = Z, Je();
      const ce = m.getBoundingClientRect(), ae = De(P.current ?? null), fe = !C.current && !U.current, Pe = fe ? ae.top + (ae.height - le) / 2 : ce.top, ve = fe ? ae.top + (ae.height - Z) / 2 : ce.top;
      m.style.transition = "none", m.style.height = `${le}px`, fe && (m.style.top = `${Pe}px`), x.current && (x.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${le}px` && (m.style.transition = `height ${Ee}ms ${qe}${fe ? `, top ${Ee}ms ${qe}` : ""}`, m.style.height = `${Z}px`, fe && (m.style.top = `${ve}px`), window.setTimeout(() => {
            m.style.height === `${Z}px` && (m.style.transition = "", m.style.height = "", x.current && (x.current.style.overflow = ""), fe && oe({ left: ce.left, top: ve }), Be());
          }, Ee + 60));
        });
      });
    });
    return G.observe(m), () => G.disconnect();
  }, [E]);
  const et = V(() => {
    const m = d.current;
    if (!m) return null;
    const D = m.getBoundingClientRect();
    return { left: D.left, top: D.top, width: D.width, height: D.height };
  }, []), Se = V((m, D) => {
    const I = P.current ?? null, G = (I == null ? void 0 : I.innerWidth) ?? 0, Z = De(I), le = et(), ce = le ? le.width : Math.min(G - Q * 2, 576), ae = le ? le.height : Math.min(Z.height - Q * 2, 400);
    return {
      left: Math.max(Q, Math.min(m, G - ce - Q)),
      top: Math.max(Z.top + Q, Math.min(D, Z.bottom - ae - Q))
    };
  }, [et]);
  q(() => {
    if (!e) return;
    const m = P.current ?? null, D = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !D) return;
    const I = 120;
    U.current = !1, j.current = { w: m.innerWidth, h: m.innerHeight };
    let G = 0;
    const Z = () => {
      if (xe.current || ie.current) return;
      const ce = (m == null ? void 0 : m.innerHeight) ?? 0, ae = (m == null ? void 0 : m.innerWidth) ?? 0, Pe = De(m).height < ce - I, ve = ce < j.current.h - I && ae === j.current.w;
      Pe || ve ? (U.current = !0, L.current && (clearTimeout(L.current), L.current = 0)) : L.current || (L.current = (m == null ? void 0 : m.setTimeout(() => {
        U.current = !1, L.current = 0, Te(!1);
      }, 600)) ?? 0), Te(U.current), !G && (G = requestAnimationFrame(() => {
        var on;
        G = 0;
        const tn = d.current;
        if (!tn) return;
        const Le = De(P.current ?? null), Ne = tn.getBoundingClientRect(), nn = ((on = P.current) == null ? void 0 : on.innerWidth) ?? 0, gt = (m == null ? void 0 : m.innerHeight) ?? 0, In = Le.height < gt - I || gt < j.current.h - I && (m == null ? void 0 : m.innerWidth) === j.current.w;
        j.current = { w: (m == null ? void 0 : m.innerWidth) ?? 0, h: gt };
        const tt = Ne.top >= Le.top + Q && Ne.bottom <= Le.bottom - Q, rn = () => {
          oe({
            left: Math.max(Q, Math.min((nn - Ne.width) / 2, nn - Ne.width - Q)),
            top: Math.max(Le.top + Q, Math.min(Le.top + (Le.height - Ne.height) / 2, Le.bottom - Ne.height - Q))
          });
        };
        if (In && !ue) {
          if (C.current) {
            tt || oe(Se(Ne.left, Ne.top));
            return;
          }
          if (tt) return;
          rn();
          return;
        }
        if (!U.current) {
          if (C.current) {
            tt || oe(Se(Ne.left, Ne.top));
            return;
          }
          tt || rn();
        }
      }));
    };
    D.addEventListener("resize", Z), D.addEventListener("scroll", Z);
    const le = () => {
      xe.current || ie.current || G || (G = requestAnimationFrame(() => {
        G = 0;
        const ce = d.current;
        if (!ce) return;
        const ae = P.current ?? null, fe = De(ae), Pe = (ae == null ? void 0 : ae.innerWidth) ?? 0, ve = ce.getBoundingClientRect();
        if (C.current) {
          oe(Se(ve.left, ve.top));
          return;
        }
        oe({
          left: Math.max(Q, Math.min((Pe - ve.width) / 2, Pe - ve.width - Q)),
          top: Math.max(fe.top + Q, Math.min(fe.top + (fe.height - ve.height) / 2, fe.bottom - ve.height - Q))
        });
      }));
    };
    return m.addEventListener("orientationchange", le), () => {
      D.removeEventListener("resize", Z), D.removeEventListener("scroll", Z), m.removeEventListener("orientationchange", le), G && cancelAnimationFrame(G), L.current && clearTimeout(L.current);
    };
  }, [e, Se]);
  const Ut = V((m) => {
    if (m.target.closest("button")) return;
    C.current = !0;
    const D = et();
    D && (oe(Se(D.left, D.top)), ie.current = { startX: m.clientX, startY: m.clientY, posX: D.left, posY: D.top }, m.target.setPointerCapture(m.pointerId));
  }, [et, Se]), Xt = V((m) => {
    const D = ie.current;
    D && (m.preventDefault(), oe(Se(D.posX + m.clientX - D.startX, D.posY + m.clientY - D.startY)));
  }, [Se]), Vt = V(() => {
    ie.current = null;
  }, []), Gt = ie.current !== null, Zt = V(() => {
    C.current = !1;
    const m = P.current ?? null, D = De(m), I = (m == null ? void 0 : m.innerWidth) ?? 0, G = d.current, Z = G ? G.getBoundingClientRect() : { width: 0, height: 0 };
    oe({
      left: Math.max(Q, Math.min((I - Z.width) / 2, I - Z.width - Q)),
      top: Math.max(D.top + Q, Math.min(D.top + (D.height - Z.height) / 2, D.bottom - Z.height - Q))
    });
  }, []), pt = y(0), Jt = V(() => {
    const m = Date.now();
    m - pt.current < 300 ? (pt.current = 0, Zt()) : pt.current = m;
  }, [Zt]), Qt = te !== null, An = Qt ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", Mn = `${l ? `${l} w-full` : "max-w-xl w-full"}`, en = {
    ...Qt ? { left: te.left, top: te.top } : {},
    width: `min(100%, calc(100dvw - ${Q * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...ke ? {} : { maxHeight: `calc(100dvh - ${Q * 2}px)` }
  }, Pn = V((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey) return;
    const D = m.target, I = p.current;
    if (!(!!D.closest("[data-modal-close]") || !!I && I.contains(D) && !!D.closest('button, a, [role="button"]')) && D.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !I) return;
    const Z = Array.from(I.querySelectorAll("button[data-modal-confirm]")), le = Z.length > 0 ? Z : Array.from(I.querySelectorAll("button")), ce = le[le.length - 1];
    !ce || ce.disabled || (m.preventDefault(), ce.click());
  }, []);
  return /* @__PURE__ */ i(Ce.Root, { open: e, onOpenChange: (m) => {
    m || qt();
  }, children: /* @__PURE__ */ N(Ce.Portal, { container: F ?? void 0, children: [
    /* @__PURE__ */ i(
      Ce.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${Dn ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), h && qt());
        }
      }
    ),
    /* @__PURE__ */ N(
      Ce.Content,
      {
        ref: ne,
        onKeyDown: Pn,
        onInteractOutside: (m) => {
          h || m.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${An} ${Mn}`,
        style: { touchAction: "manipulation", ...Object.keys(en).length > 0 ? en : {} },
        children: [
          u ? /* @__PURE__ */ N(
            "div",
            {
              style: ee,
              className: `flex items-center justify-between ${Gt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                pe || Ut(m);
              },
              onPointerMove: Xt,
              onPointerUp: Vt,
              onClick: Jt,
              children: [
                /* @__PURE__ */ i(Ce.Title, { style: re, className: "font-bold text-white truncate", children: n }),
                o && /* @__PURE__ */ i(Ce.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: H, height: H } }) })
              ]
            }
          ) : /* @__PURE__ */ N(
            "div",
            {
              style: W,
              className: `flex items-center justify-between border-b border-zinc-800 shrink-0 bg-zinc-950 ${Gt ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                pe || Ut(m);
              },
              onPointerMove: Xt,
              onPointerUp: Vt,
              onClick: Jt,
              children: [
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(Ce.Title, { style: K, className: "font-bold text-white truncate", children: n })
                ] }),
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
                  f && /* @__PURE__ */ N("button", { onClick: f, style: ge, className: "flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded shrink-0", children: [
                    /* @__PURE__ */ i(gn, { style: { width: z, height: z } }),
                    "Reset"
                  ] }),
                  o && /* @__PURE__ */ i(Ce.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(kt, { style: { width: S, height: S } }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: x, style: u ? he : void 0, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: s }),
          c && /* @__PURE__ */ i("div", { ref: p, style: u ? me : void 0, className: u ? "" : "shrink-0", children: u ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: c }) : c })
        ]
      }
    )
  ] }) });
}
function Ai({ children: e }) {
  const t = de(), n = k(20, 24, t), r = k(8, 12, t);
  return /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-3 border-t border-zinc-800 bg-zinc-950", style: { padding: `${r}px ${n}px` }, children: e });
}
const zr = "inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap", Nr = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function nt({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  const l = Ae({ px: 24, py: 8, fs: 12 }, { px: 28, py: 10, fs: 14 });
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      style: l,
      className: `${zr} ${Nr[e]} ${t}`,
      ...r
    }
  );
}
function $r({ checked: e, onChange: t, disabled: n = !1, label: r, id: l, className: c = "", labelClassName: s = "", theme: f, variant: a = "pill", tone: u = "accent", block: o = !1 }) {
  const h = a !== "plain", d = de(), x = k(16, 20, d), p = k(12, 14, d), g = k(12, 14, d), $ = k(12, 16, d), T = k(10, 12, d), v = k(8, 10, d);
  return /* @__PURE__ */ N(
    "label",
    {
      className: `ui-checkbox ${h ? "ui-checkbox-pill rounded-lg" : ""} ${u === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${c}`,
      style: { display: o ? "flex" : "inline-flex", alignItems: "center", gap: v, padding: h ? `${T}px ${$}px` : void 0 },
      onClick: (A) => A.stopPropagation(),
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ i(
          "input",
          {
            type: "checkbox",
            id: l,
            checked: e,
            disabled: n,
            onChange: (A) => t(A.target.checked),
            className: "sr-only"
          }
        ),
        h ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ N("svg", { viewBox: "0 0 16 16", style: { width: x, height: x }, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", style: { width: x, height: x }, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: "ui-checkbox-box", style: { width: x, height: x }, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", style: { width: p, height: p }, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${s}`, style: { fontSize: g }, children: r })
      ]
    }
  );
}
function Mi(e = "md") {
  const t = ue && yn() > 0;
  return e === "sm" ? `${t ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${t ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"} ui-input`;
}
function Er(e = "md") {
  return e === "sm" ? Ae({ px: 8, py: 6, fs: 12 }, { px: 12, py: 8, fs: 14 }) : Ae({ px: 10, py: 5, fs: 12 }, { px: 14, py: 9, fs: 14 });
}
const Rn = je(null);
function Pi() {
  const e = Ue(Rn);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Ii({ children: e }) {
  const [t, n] = Y(null), [r, l] = Y(!1), c = y(null), s = de(), f = k(16, 20, s), a = k(12, 14, s), u = Er(), o = y(t);
  o.current = t;
  const h = V(() => {
    const v = o.current;
    v && (v.kind === "confirm" ? v.resolve(!1) : v.kind === "prompt" ? v.resolve(null) : v.resolve());
  }, []), d = V((v) => {
    if (v.suppressKey) {
      const w = localStorage.getItem(v.suppressKey);
      if (w && Date.now() < parseInt(w, 10))
        return Promise.resolve(!0);
    }
    return new Promise((w) => {
      h(), l(!1), n({ kind: "confirm", options: v, resolve: w });
    });
  }, [h]), x = V((v) => new Promise((w) => {
    h(), n({ kind: "prompt", options: v, resolve: w });
  }), [h]), p = V((v) => new Promise((w) => {
    h(), n({ kind: "alert", options: v, resolve: w });
  }), [h]);
  q(() => {
    if (t) {
      const v = setTimeout(() => {
        var w;
        return (w = c.current) == null ? void 0 : w.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [t]);
  const g = V(() => {
    var v, w;
    if (t) {
      if (t.kind === "confirm") {
        const A = t.options;
        A.suppressKey && r && localStorage.setItem(A.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((w = (v = c.current) == null ? void 0 : v.value) == null ? void 0 : w.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), $ = t !== null;
  q(() => {
    if (!$) return;
    const v = (w) => {
      w.key !== "Enter" || w.shiftKey || w.metaKey || w.ctrlKey || w.altKey || w.isComposing || (w.preventDefault(), w.stopImmediatePropagation(), g());
    };
    return document.addEventListener("keydown", v, !0), () => document.removeEventListener("keydown", v, !0);
  }, [$, g]);
  const T = V(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ N(Rn.Provider, { value: { confirm: d, prompt: x, alert: p }, children: [
    e,
    $ && /* @__PURE__ */ i(
      kr,
      {
        open: !0,
        onClose: T,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ N(Re, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(nt, { variant: "ghost", onClick: T, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(nt, { onClick: g, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            nt,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: g,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(nt, { "data-modal-confirm": !0, onClick: g, children: "Save" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: "flex flex-col", style: { gap: f }, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { style: { fontSize: a }, className: "text-zinc-400 leading-relaxed", children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            $r,
            {
              block: !0,
              checked: r,
              onChange: l,
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
              style: u,
              className: "w-full ui-input"
            }
          )
        ] })
      }
    )
  ] });
}
const Tr = 500, Sr = 250, Cr = 5, be = 88, un = 4;
function Rr(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const l = performance.now(), c = (s) => {
    const f = s - l, a = Math.min(f / t, 1);
    n.style.strokeDashoffset = String(r * (1 - a)), a < 1 && requestAnimationFrame(c);
  };
  requestAnimationFrame(c);
}
function Lr({ x: e, y: t, ms: n }) {
  const r = y(null), l = Xe();
  return q(() => {
    r.current && Rr(r.current, n);
  }, [n]), Ct(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "fixed",
          left: e - be / 2,
          top: t - be / 2,
          width: be,
          height: be,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ N("svg", { ref: r, width: be, height: be, viewBox: `0 0 ${be} ${be}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: be / 2,
              cy: be / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: un + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: be / 2,
              cy: be / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: un,
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
function Oi() {
  return { "data-no-longpress": "true" };
}
function Dr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function _i({
  children: e,
  showRing: t = !0,
  longPressMs: n = Tr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: l,
  onLongPress: c
}) {
  const [s, f] = Y(null), a = bn(), u = y(null), o = y(null), h = y({ x: 0, y: 0, target: null }), d = y(!1), x = Math.min(Sr, n * 0.5), p = y(l);
  p.current = l;
  const g = y(c);
  return g.current = c, q(() => {
    if (!ue || !a) return;
    const $ = (A) => {
      if (!Nt(A.pointerType) || A.button !== 0) return;
      const X = A.target;
      if (!X.closest(r) || (p.current ? !p.current(X) : Dr(X))) return;
      const _ = A.clientX, S = A.clientY;
      h.current = { x: _, y: S, target: A.target }, d.current = !0, t && (o.current = setTimeout(() => f({ x: _, y: S }), x)), u.current = setTimeout(() => {
        if (!d.current) return;
        o.current && (clearTimeout(o.current), o.current = null), f(null);
        const H = h.current.target;
        if (!H) return;
        const b = g.current;
        if (b) {
          b(H, _, S);
          return;
        }
        const z = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: _,
          clientY: S,
          button: 2,
          view: window
        });
        H.dispatchEvent(z);
      }, n);
    }, T = (A) => {
      if (!d.current || u.current === null) return;
      const X = A.clientX - h.current.x, _ = A.clientY - h.current.y;
      Math.sqrt(X * X + _ * _) > Cr && (clearTimeout(u.current), u.current = null, o.current && (clearTimeout(o.current), o.current = null), d.current = !1, f(null));
    }, v = () => {
      u.current !== null && (clearTimeout(u.current), u.current = null), o.current !== null && (clearTimeout(o.current), o.current = null), d.current = !1, f(null);
    }, w = (A) => {
      Nt(A.pointerType) && (u.current !== null && (clearTimeout(u.current), u.current = null), o.current !== null && (clearTimeout(o.current), o.current = null), d.current = !1, f(null));
    };
    return a == null || a.addEventListener("pointerdown", $), a.addEventListener("pointermove", T), a.addEventListener("pointerup", v), a.addEventListener("pointercancel", v), a.addEventListener("pointerleave", w), () => {
      a.removeEventListener("pointerdown", $), a.removeEventListener("pointermove", T), a.removeEventListener("pointerup", v), a == null || a.removeEventListener("pointercancel", v), a == null || a.removeEventListener("pointerleave", w), u.current !== null && clearTimeout(u.current), o.current !== null && clearTimeout(o.current);
    };
  }, [t, n, x, r]), /* @__PURE__ */ N(Re, { children: [
    e,
    t && s && /* @__PURE__ */ i(Lr, { x: s.x, y: s.y, ms: n - x })
  ] });
}
function Hi() {
  const e = fr();
  return dr ? e === null || Nt(e) : !1;
}
function $e({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  active: r = !1,
  className: l = "",
  type: c = "button",
  ...s
}) {
  const f = Ae({ px: 10, py: 4, fs: 12 }, { px: 14, py: 8, fs: 14 }), a = Ae({ px: 12, py: 4, fs: 12 }, { px: 16, py: 8, fs: 14 }), u = Ae({ px: 12, py: 6, fs: 12 }, { px: 16, py: 10, fs: 14 }), o = "", h = "", d = "inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", x = {
    light: {
      active: "bg-zinc-950 text-white",
      inactive: "text-zinc-500 hover:text-zinc-900",
      cloudActive: "bg-blue-950 text-blue-50",
      cloudInactive: "text-blue-950 hover:bg-blue-950/10 hover:text-blue-950"
    },
    dark: {
      active: "bg-zinc-950 text-white",
      inactive: "text-zinc-500 hover:text-zinc-300",
      cloudActive: "bg-blue-950 text-blue-50",
      cloudInactive: "text-zinc-500 hover:text-zinc-300"
    }
  }, p = {
    active: "bg-white text-zinc-900",
    inactive: "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800",
    open: "bg-zinc-800! text-white",
    cloudActive: "bg-white text-blue-950",
    cloudInactive: "text-white/70 hover:text-white hover:bg-blue-900/60",
    cloudOpen: "bg-blue-900/60! text-white"
  }, g = {
    light: {
      subtle: { base: `${o} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
      primary: { base: `${h} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
      "danger-ghost": { base: `${o} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
    },
    dark: {
      subtle: { base: `${o} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
      primary: { base: `${h} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
      "danger-ghost": { base: `${o} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
    }
  }, $ = `${h} bg-blue-950 hover:bg-blue-900 text-white`, T = "bg-blue-900!", v = s["data-state"] === "open", w = g[t][e], A = e === "primary" ? a : e.startsWith("tab") ? u : f, X = k(6, 8, de()), _ = t === "dark" ? "bg-blue-900/50! text-white!" : "bg-blue-50! text-blue-700!";
  let S;
  if (e === "tab") {
    const H = x[t];
    S = r ? n ? H.cloudActive : H.active : n ? H.cloudInactive : H.inactive;
  } else e === "tab-header" ? S = `${r ? n ? p.cloudActive : p.active : n ? p.cloudInactive : p.inactive} ${v ? n ? p.cloudOpen : p.open : ""}` : (S = `${w.base} ${v ? w.open : ""}`, r && (S = `${S} ${_}`), e === "primary" && t === "light" && n && (S = v ? `${$} ${T}` : $));
  return /* @__PURE__ */ i("button", { type: c, className: `${d} ${S} ${l}`, style: { ...A, gap: X }, ...s });
}
const Ar = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Mr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], vt = 1900, wt = 2100;
function Pr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Ir(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Bi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: l = "", initialView: c }) {
  const s = /* @__PURE__ */ new Date(), f = (() => {
    if (!c) return s;
    const C = /* @__PURE__ */ new Date(c + "T00:00:00");
    return isNaN(C.getTime()) ? s : C;
  })(), [a, u] = Y(f.getFullYear()), [o, h] = Y(f.getMonth()), [d, x] = Y("days"), [p, g] = Y(null), $ = ct(() => new Set(e), [e]), T = (C) => {
    $.has(C) ? t(e.filter((U) => U !== C)) : t([...e, C]);
  }, v = ct(() => {
    const C = Pr(a, o), U = new Date(a, o, 1).getDay(), L = [];
    for (let j = 0; j < U; j++) L.push({ key: `pad-${j}`, day: 0, empty: !0 });
    for (let j = 1; j <= C; j++) L.push({ key: Ir(a, o, j), day: j, empty: !1 });
    return L;
  }, [a, o]), w = (C) => u((U) => Math.max(vt, Math.min(wt, U + C))), A = (C) => {
    o + C < 0 ? (u((U) => Math.max(vt, U - 1)), h(11)) : o + C > 11 ? (u((U) => Math.min(wt, U + 1)), h(0)) : h((U) => U + C);
  }, X = () => {
    if (p === null) return;
    const C = parseInt(p, 10);
    !isNaN(C) && C >= vt && C <= wt && u(C), g(null);
  }, _ = (C) => e.some((U) => U.startsWith(`${a}-${String(C + 1).padStart(2, "0")}`)), S = n === "dark", H = de(), b = k(4, 8, H), z = k(16, 20, H), M = k(10, 11, H), R = k(6, 8, H), W = k(12, 14, H), K = k(6, 10, H), ee = k(12, 14, H), re = k(8, 12, H), he = k(10, 12, H), me = k(6, 10, H), ge = k(2, 6, H), E = k(64, 80, H), B = { padding: b }, ne = { width: z, height: z }, F = { fontSize: M, paddingTop: R, paddingBottom: R }, O = { fontSize: W, paddingTop: K, paddingBottom: K }, P = { fontSize: ee, paddingTop: re, paddingBottom: re }, te = { fontSize: he, padding: `${ge}px ${me}px` }, oe = S ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ie = S ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ N("div", { className: `border rounded-lg overflow-hidden w-full ${S ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${l}`, children: [
    /* @__PURE__ */ N("div", { className: `flex items-center justify-between px-3 py-2 border-b ${S ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? w(-1) : A(-1),
          style: B,
          className: `rounded transition-colors ${S ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(Bn, { style: ne })
        }
      ),
      d === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => x("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${S ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(a, o).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(a),
          onChange: (C) => g(C.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (C) => C.target.select(),
          onBlur: X,
          onKeyDown: (C) => {
            C.key === "Enter" && (C.preventDefault(), X()), C.key === "Escape" && g(null);
          },
          style: { width: E },
          className: `text-sm text-center font-semibold rounded outline-none py-0.5 ${S ? " bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : " bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? w(1) : A(1),
          style: B,
          className: `rounded transition-colors ${S ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(lt, { style: ne })
        }
      )
    ] }),
    d === "months" ? /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Mr.map((C, U) => /* @__PURE__ */ N(
        "button",
        {
          type: "button",
          onClick: () => {
            h(U), x("days");
          },
          style: P,
          className: `relative font-medium transition-colors border-b ${U === o ? oe : ie} ${S ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            C,
            _(U) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${U === o ? "bg-white" : S ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        C
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${S ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            u(s.getFullYear()), h(s.getMonth()), x("days");
          },
          style: { paddingTop: K, paddingBottom: K, fontSize: W },
          className: `px-3 font-semibold rounded transition-colors ${S ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ N("div", { className: "grid grid-cols-7 text-center", children: [
      Ar.map((C) => /* @__PURE__ */ i("div", { style: F, className: `font-semibold uppercase tracking-wider border-b ${S ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: C }, C)),
      v.map((C) => C.empty ? /* @__PURE__ */ i("div", {}, C.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => T(C.key),
          style: O,
          className: `font-medium transition-colors border-b ${S ? "border-zinc-800/60" : "border-zinc-50"} ${$.has(C.key) ? oe : S ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: C.day
        },
        C.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ N("div", { className: `px-3 py-2 border-t ${S ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ N("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((C) => {
        const U = /* @__PURE__ */ new Date(C + "T00:00:00"), L = U.getFullYear() === s.getFullYear() ? U.toLocaleString("default", { month: "short", day: "numeric" }) : U.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            onClick: () => T(C),
            "aria-label": `Remove ${L}`,
            style: te,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${S ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"}`,
            children: [
              L,
              /* @__PURE__ */ i("span", { className: `leading-none ${S ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
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
  onToggleAll: l,
  allSelected: c = !1,
  toggleAllLabel: s,
  emptyHint: f = "Nothing here",
  maxHeight: a,
  disabled: u = !1,
  theme: o,
  className: h = ""
}) {
  const d = (w) => t instanceof Set ? t.has(w) : t.includes(w), x = de(), p = k(12, 16, x), g = k(8, 12, x), $ = k(12, 14, x), T = k(16, 20, x), v = r != null || l != null;
  return /* @__PURE__ */ N("div", { className: h, ...o ? { "data-theme": o } : {}, children: [
    v && /* @__PURE__ */ N("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      l != null && /* @__PURE__ */ i("button", { type: "button", disabled: u, onClick: l, className: "ui-checklist-toggleall", children: s ?? (c ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const A = d(w.id);
            return /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(w.id),
                className: `ui-checklist-item ${A ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${g}px ${p}px`, fontSize: $ },
                children: [
                  /* @__PURE__ */ i("span", { className: "ui-checklist-box", style: { width: T, height: T }, "aria-hidden": !0, children: A && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  w.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: w.secondary })
                ]
              },
              w.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: f })
        ]
      }
    )
  ] });
}
function Yi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: l = "Nothing here",
  maxHeight: c,
  compact: s = !1,
  disabled: f = !1,
  theme: a,
  className: u = ""
}) {
  const o = de(), h = s ? 10 : k(12, 16, o), d = s ? 6 : k(8, 12, o), x = s ? 12 : k(12, 14, o), p = s ? 14 : k(16, 20, o);
  return /* @__PURE__ */ N("div", { className: u, ...a ? { "data-theme": a } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((g) => {
            const $ = t === g.id;
            return /* @__PURE__ */ N(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(g.id),
                className: `ui-checklist-item ${$ ? "ui-checklist-item-checked" : ""}`,
                style: { padding: `${d}px ${h}px`, fontSize: x },
                children: [
                  /* @__PURE__ */ i("span", { className: "ui-radio-circle", style: { width: p, height: p }, "aria-hidden": !0, children: $ && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: l })
        ]
      }
    )
  ] });
}
const Wi = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: l = "visible",
  offset: c = 8
}) => {
  const s = He(), { refs: f, floatingStyles: a } = jn({
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
        fn: (u) => {
          var v;
          if (l !== "visible") return {};
          const o = (v = u.elements.floating.ownerDocument) == null ? void 0 : v.defaultView;
          if (!o) return {};
          const h = u.rects.reference, d = Math.max(h.x, 0), x = Math.max(h.y, 0), p = Math.min(h.x + h.width, o.innerWidth), g = Math.min(h.y + h.height, o.innerHeight);
          if (p <= d || g <= x) return {};
          const $ = r === "left" ? p - (h.x + h.width) : r === "right" ? d - h.x : 0, T = r === "top" ? x - h.y : r === "bottom" ? g - (h.y + h.height) : 0;
          return { x: u.x + $, y: u.y + T };
        }
      },
      Xn(c),
      Vn({ padding: 8 }),
      Gn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (u) => {
          var g;
          const o = (g = u.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!o) return {};
          const h = u.rects.floating.width, d = u.rects.floating.height, x = Math.max(8, Math.min(u.x, o.innerWidth - h - 8)), p = Math.max(8, Math.min(u.y, o.innerHeight - d - 8));
          return { x, y: p };
        }
      }
    ],
    whileElementsMounted: Un
  });
  return we(() => {
    n && f.setReference(n);
  }, [n, f]), /* @__PURE__ */ N(Re, { children: [
    !n && /* @__PURE__ */ i("div", { ref: f.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    s && Ct(
      /* @__PURE__ */ i(
        "div",
        {
          ref: f.setFloating,
          className: `ui-chrome ${e}`,
          style: a,
          onMouseDown: (u) => u.stopPropagation(),
          onClick: (u) => u.stopPropagation(),
          onDragStart: (u) => u.preventDefault(),
          children: t
        }
      ),
      s.document.body
    )
  ] });
}, We = ({ content: e, children: t }) => {
  const n = de(), r = k(10, 12, n), l = k(6, 6, n), c = k(10, 12, n), s = { padding: `${l}px ${r}px`, fontSize: c }, f = Xe(), a = He(), [u, o] = Y(!1), [h, d] = Y({ x: 0, y: 0 }), x = y(null), p = () => {
    if (!x.current) return;
    const g = x.current.getBoundingClientRect();
    d({ x: g.left + g.width / 2, y: g.top });
  };
  return q(() => (u && a && (p(), a.addEventListener("scroll", p, !0)), () => a == null ? void 0 : a.removeEventListener("scroll", p, !0)), [u]), /* @__PURE__ */ N(
    "div",
    {
      ref: x,
      className: "inline-flex",
      onMouseEnter: () => {
        p(), o(!0);
      },
      onMouseLeave: () => o(!1),
      children: [
        t,
        u && Ct(
          /* @__PURE__ */ N(
            "div",
            {
              className: "fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 bg-zinc-900 text-white",
              style: { ...s, left: h.x, top: h.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((g, $) => /* @__PURE__ */ i("div", { className: $ > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: g }, $)),
                /* @__PURE__ */ i("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          f ?? document.body
        )
      ]
    }
  );
};
function Ze() {
  const e = de(), t = ue, n = t ? k(28, 40, e) : 28, r = t ? k(28, 40, e) : 28, l = t ? k(10, 14, e) : 10, c = t ? k(10, 14, e) : 10, s = t ? k(8, 10, e) : 8;
  return {
    toggle: { width: n, height: n },
    control: { height: r, padding: `0 ${l}px`, fontSize: c },
    input: { height: r, padding: `0 ${s}px`, fontSize: c }
  };
}
const Ki = ue ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Or = ue ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", rt = ue ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", _r = "hover:bg-red-950/50", qi = ue ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", ji = "bg-blue-900/50 border-blue-700 text-blue-300", Ui = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Hr = ue ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Xi = ue ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", st = ue ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Br = "inline-flex rounded overflow-hidden border border-zinc-700", Vi = ue ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", it = ({ onClick: e, disabled: t, title: n, className: r = Or, children: l }) => {
  const c = Ze();
  return /* @__PURE__ */ i(We, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, style: c.control, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: l }) });
}, Gi = ({ value: e, options: t, onChange: n, disabled: r, active: l }) => {
  const c = Ze();
  return /* @__PURE__ */ i("div", { className: Br, children: t.map((s) => {
    const f = l ? l(s.v) : e === s.v;
    return /* @__PURE__ */ i(
      "button",
      {
        disabled: r,
        onClick: () => n(s.v),
        style: c.control,
        className: `font-medium transition-colors disabled:opacity-30 ${f ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${s.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
        children: s.l
      },
      s.v
    );
  }) });
}, Zi = ({ children: e }) => /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: ue ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Fr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Yr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Ji = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ N("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? Fr : Yr, children: e }),
  t
] }), Qi = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ N("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), eo = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: l }) => /* @__PURE__ */ N(Re, { children: [
  /* @__PURE__ */ i(it, { onClick: () => r(-1), disabled: e, title: "Move up", className: rt, children: /* @__PURE__ */ i(Fn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(it, { onClick: () => r(1), disabled: e, title: "Move down", className: rt, children: /* @__PURE__ */ i(Yn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(it, { onClick: t, disabled: e, title: "Duplicate", className: rt, children: /* @__PURE__ */ i(pn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: st }),
  /* @__PURE__ */ i(it, { onClick: n, disabled: e, title: "Delete", className: `${rt} ${_r}`, children: /* @__PURE__ */ i(zt, { className: "w-2.5 h-2.5" }) })
] }), Wr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Kr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), qr = /^(https?:\/\/|mailto:)/i;
function jr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const l = n.slice(0, r).trim().toLowerCase(), c = n.slice(r + 1).trim();
    Kr.has(l) && c && t.push(`${l}: ${c}`);
  }
  return t.join("; ");
}
function Tt(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const f = document.createDocumentFragment();
    for (const a of Array.from(t.childNodes)) f.appendChild(Tt(a));
    return f;
  };
  if (!Wr.has(n)) return r();
  if (n === "a") {
    const f = t.getAttribute("href") || "";
    if (!qr.test(f)) return r();
  }
  const l = document.createElement(n), c = t.getAttribute("style"), s = jr(c || "");
  if (s && l.setAttribute("style", s), n === "a") {
    l.setAttribute("href", t.getAttribute("href"));
    const f = t.getAttribute("target"), a = t.getAttribute("rel");
    f && l.setAttribute("target", f), a && l.setAttribute("rel", a);
  }
  for (const f of Array.from(t.childNodes)) l.appendChild(Tt(f));
  return l;
}
function Ln(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Ur(e) {
  const t = Ln(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const s of Array.from(n.content.childNodes)) r.appendChild(Tt(s));
  const l = document.createElement("div");
  return l.appendChild(r), l.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function to(e) {
  const t = Ln(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function no(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Xr = { text: "#52525b" }, Vr = ({ node: e, selected: t, extension: n, editor: r, view: l, getPos: c }) => {
  var h;
  const s = e.attrs.field ?? "", f = n.options, a = ((h = f.resolve) == null ? void 0 : h.call(f, s)) ?? null, u = (a == null ? void 0 : a.color) ?? Xr, o = (a == null ? void 0 : a.label) ?? `{{${s}}}`;
  return /* @__PURE__ */ i(
    Qn,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: u.text,
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
        var $;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const x = typeof c == "function" ? c() : null;
        if (x == null) return;
        const p = l.state.doc.resolve(x), g = p.nodeAfter;
        g && at.isSelectable(g) && l.dispatch(l.state.tr.setSelection(new at(p))), ($ = f.onTokenClick) == null || $.call(f, s, d.currentTarget.getBoundingClientRect(), x);
      },
      children: o
    }
  );
};
function Gr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function dn(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Zr = lr.extend({
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
    return Jn(Vr);
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
    return ["span", Zn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Jr = 240, Qr = 280, ei = ({ props: e, onApi: t }) => {
  const n = ft(), r = y(t);
  r.current = t, q(() => {
    r.current(n);
  }, [n]);
  const l = y(null);
  q(() => {
    var s, f;
    (f = (s = l.current) == null ? void 0 : s.querySelector(".ui-item-highlighted")) == null || f.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex]), q(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const c = It();
  return /* @__PURE__ */ i(Ge.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Qr, maxHeight: Jr },
      onMouseDown: (s) => s.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: l, children: e.items.map((s) => /* @__PURE__ */ i(
        ti,
        {
          item: s,
          d: c,
          command: () => e.command({ field: s.key })
        },
        s.key
      )) })
    }
  ) });
}, ti = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: l, setPointer: c } = Tn({
    label: () => e.label,
    activate: n
  }), s = de(), f = { padding: `${k(8, 12, s)}px ${k(12, 16, s)}px`, fontSize: k(12, 14, s) };
  return /* @__PURE__ */ N(
    "div",
    {
      role: "option",
      style: f,
      className: `w-full text-left rounded flex items-center gap-2 outline-none cursor-pointer select-none ${t.itemDefault} ${l ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => c(r),
      onClick: n,
      children: [
        /* @__PURE__ */ i("span", { className: `${t.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ i("span", { className: "block w-2 h-2 rounded-full", style: { background: e.color.text } }) }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: e.label }),
        e.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: e.color.text }, children: e.group })
      ]
    }
  );
}, ni = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(ei, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const l = ar(r);
      e = { holder: r, root: l, unmount: null, props: n, api: null };
      const c = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: s, y: f, placement: a, strategy: u }) => {
          var d, x;
          if (!e) return;
          const o = (x = (d = e.props) == null ? void 0 : d.clientRect) == null ? void 0 : x.call(d), h = o && !a.endsWith("-end") ? o.width : 0;
          r.style.position = u, r.style.left = `${s + h}px`, r.style.top = `${f}px`;
        }
      });
      e.unmount = c, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      if (!(e != null && e.props) || !e.api) return !1;
      const { items: r, command: l } = e.props;
      if (r.length === 0) return !1;
      const c = e.api, s = n.key;
      if (s === "ArrowDown" || s === "ArrowUp") {
        n.preventDefault();
        const f = c.highlightedIndex, a = s === "ArrowDown" ? 1 : -1;
        return c.setHighlighted((f + a + r.length) % r.length, "keyboard"), !0;
      }
      if (s === "Enter" || s === "Tab") {
        n.preventDefault();
        const f = c.highlightedIndex, a = f >= 0 ? f : 0, u = c.items[a];
        return u ? u.activate() : r[a] && l({ field: r[a].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, ro = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, ri = Me.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: l,
  onStateChange: c,
  resolveToken: s,
  suggestionItems: f,
  onTokenClick: a,
  onSelectionChange: u
}, o) => {
  const h = y(s);
  h.current = s;
  const d = y(f);
  d.current = f;
  const x = y(a);
  x.current = a;
  const p = y(u);
  p.current = u;
  const g = y(null), $ = y(null), T = y(t);
  T.current = t;
  const v = y(r);
  v.current = r;
  const w = y(c);
  w.current = c;
  const A = y(null), X = (z) => {
    var W;
    const M = {
      bold: z.isActive("bold"),
      italic: z.isActive("italic"),
      underline: z.isActive("underline"),
      strike: z.isActive("strike"),
      link: z.isActive("link"),
      color: z.getAttributes("textStyle").color || ""
    }, R = A.current;
    R && R.bold === M.bold && R.italic === M.italic && R.underline === M.underline && R.strike === M.strike && R.link === M.link && R.color === M.color || (A.current = M, (W = w.current) == null || W.call(w, M));
  }, _ = (z) => {
    var ee;
    const M = z.state.selection;
    let R = null;
    M instanceof at && M.node.type.name === "token" ? (R = { key: M.node.attrs.field ?? "", pos: M.from }, g.current = M.from) : g.current != null && (g.current = z.state.tr.mapping.map(g.current));
    const W = $.current, K = W && R && W.key === R.key && W.pos === R.pos;
    !W && !R || K || ($.current = R, (ee = p.current) == null || ee.call(p, R));
  }, S = (z) => {
    const M = Ur(Gr(z));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(M) ? "" : M;
  }, H = Me.useMemo(() => {
    const z = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: M }) => {
        var R;
        return ((R = d.current) == null ? void 0 : R.call(d, M)) ?? [];
      },
      command: ({ editor: M, range: R, props: W }) => {
        M.chain().focus().insertContentAt(R, { type: "token", attrs: { field: W.field } }).run();
      },
      render: ni
    };
    return Zr.configure({
      resolve: h.current ?? null,
      suggestion: z,
      onTokenClick: (M, R, W) => {
        var K;
        g.current = W, (K = x.current) == null || K.call(x, M, R, W);
      }
    });
  }, []), b = er({
    immediatelyRender: !1,
    extensions: [
      nr,
      rr.configure({ placeholder: n }),
      ir,
      or,
      cr,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      sr.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      H
    ],
    content: dn(e || ""),
    editable: !r,
    onUpdate: ({ editor: z }) => {
      T.current(S(z.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: z }) => {
      X(z), _(z);
    }
  });
  return q(() => {
    if (!b || b.isFocused) return;
    S(b.getHTML()) !== e && (A.current = null, b.commands.setContent(dn(e || ""), { emitUpdate: !1 }), X(b));
  }, [e, b]), q(() => {
    b && b.setEditable(!r);
  }, [r, b]), q(() => {
    b && (A.current = null, X(b), _(b));
  }, [b]), On(o, () => ({
    exec: (z, M) => {
      if (!(!b || v.current))
        switch (z) {
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
            M && b.chain().focus().setColor(M).run();
            break;
          case "unsetColor":
            b.chain().focus().unsetColor().run();
            break;
          case "link":
            M && b.chain().focus().extendMarkRange("link").setLink({ href: M }).run();
            break;
          case "unlink":
            b.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => b == null ? void 0 : b.commands.focus(),
    insertToken: (z) => {
      !b || v.current || b.chain().focus().insertContent({ type: "token", attrs: { field: z } }).run();
    },
    replaceToken: (z) => {
      if (!b || v.current) return;
      const M = g.current;
      M != null && b.commands.command(({ tr: R }) => {
        const W = R.doc.nodeAt(M);
        if (!W || W.type.name !== "token") return !1;
        R.setNodeMarkup(M, void 0, { field: z });
        const K = R.doc.resolve(M);
        return K.nodeAfter && K.nodeAfter.type.name === "token" && R.setSelection(new at(K)), !0;
      });
    }
  }), [b]), /* @__PURE__ */ i(tr, { editor: b, className: `richtext-editor ${l || ""}` });
});
ri.displayName = "RichTextEditor";
const ii = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], oi = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], fn = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), io = ({ value: e, disabled: t, onChange: n }) => {
  const [r, l] = Y(!1), c = Ze();
  return /* @__PURE__ */ i(
    ht,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ N($e, { theme: "dark", disabled: t, style: c.control, className: "justify-between min-w-0", children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(St, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: ii.map((s) => /* @__PURE__ */ i(xr, { onClick: () => {
        n(s), l(!1);
      }, icon: s === e ? /* @__PURE__ */ i(mn, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: s }, children: s }) }, s))
    }
  );
}, si = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, l] = Y(!1), c = Ze(), [s, f] = Y(""), a = () => {
    var o;
    const u = s.trim();
    u && ((o = e.current) == null || o.exec("link", u), l(!1));
  };
  return /* @__PURE__ */ i(
    ht,
    {
      open: r,
      onOpenChange: l,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ i(
        $e,
        {
          theme: "dark",
          active: n,
          disabled: t,
          onMouseDown: (u) => u.preventDefault(),
          style: { ...c.toggle, padding: 0 },
          className: "justify-center",
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(qn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ N("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: s,
            onChange: (u) => f(u.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (u) => {
              u.key === "Enter" && (u.preventDefault(), a());
            },
            style: c.input,
            className: Hr + " w-full"
          }
        ),
        /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i($e, { theme: "dark", onClick: a, style: c.control, disabled: !s.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            $e,
            {
              theme: "dark",
              onClick: () => {
                var u;
                (u = e.current) == null || u.exec("unlink"), l(!1);
              },
              style: c.control,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, oo = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: l }) => {
  const [c, s] = Y(!1), f = (o, h) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(o, h);
  }, a = Ze(), u = (o) => !!(r != null && r[o]);
  return /* @__PURE__ */ N("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(We, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i($e, { theme: "dark", "aria-label": "Bold", active: ((n == null ? void 0 : n.bold) ?? !1) || u("bold"), disabled: t || u("bold"), onMouseDown: (o) => o.preventDefault(), onClick: () => f("bold"), style: { ...a.toggle, padding: 0 }, className: "justify-center font-bold", children: "B" }) }),
    /* @__PURE__ */ i(We, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i($e, { theme: "dark", "aria-label": "Italic", active: ((n == null ? void 0 : n.italic) ?? !1) || u("italic"), disabled: t || u("italic"), onMouseDown: (o) => o.preventDefault(), onClick: () => f("italic"), style: { ...a.toggle, padding: 0 }, className: "justify-center italic", children: "I" }) }),
    /* @__PURE__ */ i(We, { content: "Underline", children: /* @__PURE__ */ i($e, { theme: "dark", "aria-label": "Underline", active: (n == null ? void 0 : n.underline) ?? !1, disabled: t, onMouseDown: (o) => o.preventDefault(), onClick: () => f("underline"), style: { ...a.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Wn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(We, { content: "Strikethrough", children: /* @__PURE__ */ i($e, { theme: "dark", "aria-label": "Strikethrough", active: (n == null ? void 0 : n.strike) ?? !1, disabled: t, onMouseDown: (o) => o.preventDefault(), onClick: () => f("strikeThrough"), style: { ...a.toggle, padding: 0 }, className: "justify-center", children: /* @__PURE__ */ i(Kn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: st }),
    /* @__PURE__ */ i(si, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: st }),
    /* @__PURE__ */ i(
      ht,
      {
        open: c,
        onOpenChange: s,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ N($e, { theme: "dark", disabled: t, style: a.control, className: "justify-between min-w-0", title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(fn, {}),
          /* @__PURE__ */ i(St, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                f("unsetColor"), s(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(fn, { className: "w-3.5 h-3.5" })
            }
          ),
          oi.map((o) => /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                f("foreColor", o), s(!1);
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
    l && /* @__PURE__ */ N(Re, { children: [
      /* @__PURE__ */ i("div", { className: st }),
      l
    ] })
  ] });
};
function so({ title: e, icon: t, count: n, tone: r = "default", collapsed: l, onToggle: c, trailing: s, bodyClass: f, className: a = "", dataProps: u, children: o }) {
  const h = de(), d = Ae({ px: 12, py: 8, fs: 12 }, { px: 14, py: 12, fs: 14 }), x = k(14, 16, h), p = { width: x, height: x }, g = k(10, 12, h);
  return /* @__PURE__ */ N("div", { ...u, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${a}`, children: [
    /* @__PURE__ */ N("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 hover:bg-white/5 transition-colors", style: d, children: [
      /* @__PURE__ */ N(
        "button",
        {
          type: "button",
          onClick: c,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            l ? /* @__PURE__ */ i(lt, { className: "text-zinc-400 shrink-0", style: p }) : /* @__PURE__ */ i(St, { className: "text-zinc-400 shrink-0", style: p }),
            t,
            /* @__PURE__ */ i("span", { className: "font-semibold text-zinc-200 truncate", children: e }),
            n && /* @__PURE__ */ i("span", { className: "text-zinc-500 shrink-0", style: { fontSize: g }, children: n })
          ]
        }
      ),
      s && /* @__PURE__ */ i("div", { className: "shrink-0", children: s })
    ] }),
    !l && o && /* @__PURE__ */ i("div", { className: f || "ui-card-band border-t p-1.5 space-y-1", children: o })
  ] });
}
export {
  $e as Button,
  so as CardSection,
  $r as Checkbox,
  Fi as Checklist,
  Qi as ChromeHeader,
  Ji as ContentRow,
  Ci as ContextMenu,
  Li as ContextMenuDivider,
  Ri as ContextMenuItem,
  Di as ContextMenuSub,
  Bi as DatePicker,
  Ii as DialogProvider,
  xr as DropdownItem,
  ht as DropdownMenu,
  vr as DropdownSubmenu,
  Pt as DropdownThemeContext,
  ii as FONTS,
  Wi as FloatingChrome,
  io as FontMenu,
  oo as FormatToolbar,
  ue as IS_COARSE,
  dr as IS_TOUCH_CAPABLE,
  Si as ItemManagerDropdown,
  _i as LongPressMenuProvider,
  Lt as MORPH_EASE,
  _e as MORPH_MS,
  Dt as MORPH_OPACITY_MS,
  Ge as MenuHighlightContext,
  kr as Modal,
  Ai as ModalFooter,
  nt as ModalFooterButton,
  ur as PopoutWindowContext,
  ro as RICH_TEXT_STATE_IDLE,
  Yi as RadioList,
  ri as RichTextEditor,
  Zi as SectionHeader,
  Gi as Seg,
  eo as StructureControls,
  Ot as SubmenuContext,
  Or as TB_BTN,
  rt as TB_BTN_ICON,
  _r as TB_DANGER,
  st as TB_DIVIDER,
  Hr as TB_INPUT,
  Xi as TB_NUM,
  Vi as TB_PICKER,
  Ki as TB_ROW_LABEL,
  Br as TB_SEG,
  qi as TB_TOGGLE,
  Ui as TB_TOGGLE_OFF,
  ji as TB_TOGGLE_ON,
  Zr as Token,
  Vr as TokenChipView,
  it as ToolButton,
  We as Tooltip,
  At as ZOOM_FROM,
  pr as cloneOverlayClose,
  k as coarsePx,
  no as escapeHtml,
  yn as getCoarseScale,
  It as getDropdownClasses,
  $i as getHardwareKeyboard,
  Ni as getLastPointerType,
  Mi as inputCls,
  Dr as isInteractiveElement,
  Nt as isTouchLike,
  wn as nearestOverlayOrigin,
  Ln as normalizeSpaces,
  bt as overlayMorphEnabled,
  mr as playOverlayClose,
  hr as playOverlayOpen,
  dn as preprocessTokenHtml,
  Ur as sanitizeRichText,
  ki as setCoarseScale,
  to as stripRichText,
  Gr as stripTokenWrappers,
  zi as useCoarse,
  de as useCoarseScale,
  Ae as useCoarseSize,
  bn as useCurrentDocument,
  He as useCurrentWindow,
  Pi as useDialog,
  $n as useDropdownTheme,
  gr as useFixedPosition,
  Ei as useHardwareKeyboard,
  Er as useInputSize,
  fr as useLastPointerType,
  Oi as useLongPressOptOut,
  _t as useMenuHighlight,
  Mt as useOverlayMorph,
  Rt as usePopoutWindow,
  Xe as usePortalTarget,
  Ti as useSmartPosition,
  Hi as useTouchMode
};
