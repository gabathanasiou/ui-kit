"use client";
import { jsxs as $, jsx as i, Fragment as Ne } from "react/jsx-runtime";
import Ee, { createContext as _e, useContext as He, useState as B, useEffect as K, useRef as x, useCallback as V, useLayoutEffect as me, useMemo as Ge, useImperativeHandle as hn } from "react";
import * as j from "@radix-ui/react-dropdown-menu";
import { Check as Wt, X as at, Pencil as mn, Copy as Yt, Trash2 as ut, RotateCcw as qt, Plus as pn, ChevronRight as dt, ChevronLeft as gn, ArrowUp as bn, ArrowDown as xn, ChevronDown as Ut, Underline as yn, Strikethrough as vn, Link as wn } from "lucide-react";
import * as ke from "@radix-ui/react-dialog";
import { createPortal as xt } from "react-dom";
import { useFloating as kn, autoUpdate as Nn, offset as $n, flip as En, shift as zn } from "@floating-ui/react-dom";
import { mergeAttributes as Cn, ReactNodeViewRenderer as Tn, NodeViewWrapper as Rn, useEditor as Sn, EditorContent as Ln } from "@tiptap/react";
import { NodeSelection as Ze } from "@tiptap/pm/state";
import Dn from "@tiptap/starter-kit";
import An from "@tiptap/extension-placeholder";
import { TextStyle as Mn } from "@tiptap/extension-text-style";
import Pn from "@tiptap/extension-color";
import In from "@tiptap/extension-link";
import On from "@tiptap/extension-underline";
import { Mention as _n } from "@tiptap/extension-mention";
import { createRoot as Hn } from "react-dom/client";
const Bn = _e(null);
function yt() {
  return He(Bn);
}
function Be() {
  const e = yt();
  return e ? e.document.body : null;
}
function jt() {
  const e = yt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function Le() {
  return yt() ?? (typeof window < "u" ? window : null);
}
const Fe = typeof window < "u", N = Fe && window.matchMedia("(pointer: coarse)").matches, Fn = Fe && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function ft(e) {
  return e === "touch" || e === "pen";
}
let Re = null;
const ht = /* @__PURE__ */ new Set();
Fe && window.addEventListener("pointerdown", (e) => {
  Re = e.pointerType, ht.forEach((t) => t());
}, !0);
function yi() {
  return Re;
}
function Kn() {
  const [, e] = B(0), t = x(Re);
  return K(() => {
    const n = () => {
      t.current !== Re && (t.current = Re, e((r) => r + 1));
    };
    return ht.add(n), () => {
      ht.delete(n);
    };
  }, []), Re;
}
const Vt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Xt() {
  return Fe ? Vt.some((e) => window.matchMedia(e).matches) : !1;
}
let Je = Xt();
const mt = /* @__PURE__ */ new Set();
function Mt(e) {
  Je !== e && (Je = e, mt.forEach((t) => t()));
}
var Kt;
if (Fe) {
  const e = () => Mt(Xt());
  for (const l of Vt) {
    const u = window.matchMedia(l);
    (Kt = u.addEventListener) == null || Kt.call(u, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (l) => {
    l.isComposing || l.keyCode !== 229 && (l.key === "Enter" || l.key === "Backspace" || l.key === "Process" || l.key === "Unidentified" || Mt(!0));
  });
  let n = null, r = null;
  const a = "__penClick", o = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (l) => {
    l.pointerType !== "pen" || l.button !== 0 || (n = { x: l.clientX, y: l.clientY });
  }, !0), window.addEventListener("pointerup", (l) => {
    if (l.pointerType !== "pen") return;
    const u = n;
    if (n = null, !u || Math.hypot(l.clientX - u.x, l.clientY - u.y) > 8) return;
    const c = l.target;
    if (!c || !c.isConnected) return;
    if (c instanceof HTMLInputElement && o.has(c.type)) {
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
function vi() {
  return Je;
}
function wi() {
  const [, e] = B(0);
  return K(() => {
    const t = () => e((n) => n + 1);
    return mt.add(t), () => {
      mt.delete(t);
    };
  }, []), Je;
}
const Se = 220, vt = "cubic-bezier(0.32, 0.72, 0, 1)", wt = 170, kt = 0.94;
function rt(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Gt(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function Zt(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return Gt({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function Wn(e, t, n, r) {
  const a = ++e.current, o = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${kt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === a && requestAnimationFrame(() => {
      if (e.current !== a) return;
      const l = Zt(t, n);
      t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transition = `transform ${Se}ms ${vt}, opacity ${wt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === a && (t.style.transition = o.transition, t.style.transform = o.transform, t.style.transformOrigin = o.transformOrigin, t.style.opacity = o.opacity, r == null || r());
      }, Se + 60);
    });
  });
}
function Yn(e, t, n, r) {
  const a = ++e.current, o = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, l = Zt(t, n);
  t.style.transition = `transform ${Se}ms ${vt}, opacity ${wt}ms ease`, t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transform = `scale(${kt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === a && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== a || t.isConnected || (t.style.transition = o.transition, t.style.transform = o.transform, t.style.transformOrigin = o.transformOrigin, t.style.opacity = o.opacity, t.style.pointerEvents = o.pointerEvents, t.style.visibility = o.visibility);
    }));
  }, Se + 60);
}
function qn(e, t, n) {
  const r = e.cloneNode(!0), a = e.getBoundingClientRect(), o = a.width > 0 || a.height > 0 ? a : n ?? a;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${o.left}px`, r.style.top = `${o.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const l = (t == null ? void 0 : t()) ?? null, u = l ? Gt({ left: o.left, top: o.top, width: o.width, height: o.height }, l) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Se}ms ${vt}, opacity ${wt}ms ease`, r.style.transform = `scale(${kt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Se + 60));
    });
  });
}
function Nt(e) {
  const t = x(null), [n, r] = B(!1), a = x(null), o = x(0), l = V((p) => {
    if (e.ref && (e.ref.current = p), p) {
      o.current = 0, t.current = p;
      const z = p.getBoundingClientRect();
      (z.width > 0 || z.height > 0) && (a.current = { left: z.left, top: z.top, width: z.width, height: z.height }), r(!0);
      return;
    }
    const g = t.current, w = ++o.current;
    queueMicrotask(() => {
      w === o.current && t.current === g && (t.current = null, r(!1), !(!g || !e.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && rt(d.current) && qn(g, s.current, a.current));
    });
  }, []), u = V(() => {
    const p = t.current;
    if (!p || getComputedStyle(p).transform !== "none") return;
    const g = p.getBoundingClientRect();
    (g.width > 0 || g.height > 0) && (a.current = { left: g.left, top: g.top, width: g.width, height: g.height });
  }, []), c = x(e.visible);
  c.current = e.visible;
  const f = x(e.visible), s = x(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const h = x(e.onClosed);
  h.current = e.onClosed;
  const d = x(e.morph !== !1);
  d.current = e.morph !== !1;
  const v = x(0);
  return me(() => {
    if (!n || !c.current || !rt(d.current)) return;
    const p = t.current;
    p && Wn(v, p, s.current);
  }, [n, e.visible]), K(() => {
    if (!n || !c.current) return;
    let p = 0;
    const g = () => {
      p = 0, u(), p = requestAnimationFrame(g);
    };
    return p = requestAnimationFrame(g), () => {
      p && cancelAnimationFrame(p);
    };
  }, [n, u]), me(() => {
    var w;
    const p = f.current;
    if (f.current = e.visible, e.visible || !p) return;
    const g = t.current;
    if (!g || !rt(d.current)) {
      (w = h.current) == null || w.call(h);
      return;
    }
    Yn(v, g, s.current, () => {
      var z;
      return (z = h.current) == null ? void 0 : z.call(h);
    });
  }, [e.visible]), K(() => {
    if (!n || !c.current) return;
    const p = (g) => {
      const w = t.current;
      w && w.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), K(() => {
    if (!n || !c.current) return;
    const p = (g) => {
      const w = t.current;
      w && w.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", p, { capture: !0 }), () => document.removeEventListener("touchmove", p, { capture: !0 });
  }, [n]), l;
}
function Jt(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function ki(e, t) {
  const n = Le(), r = x(n);
  r.current = n;
  const a = () => {
    if (!t || !e.current) return;
    const o = e.current.querySelector(".absolute");
    if (!o) return;
    o.style.left = "", o.style.right = "", o.style.top = "", o.style.bottom = "", o.style.maxHeight = "";
    const l = r.current;
    if (!l) return;
    const u = e.current.getBoundingClientRect(), c = o.getBoundingClientRect(), f = l.innerWidth, s = Jt(l), h = c.right - f;
    if (h > 0) {
      const d = Math.min(h + 8, c.left);
      o.style.left = `${c.left - u.left - d}px`;
    }
    c.left < 0 && (o.style.left = `${-u.left + 4}px`), c.bottom > s.bottom + 4 && (o.style.top = "auto", o.style.bottom = "100%", o.getBoundingClientRect().top < s.top && (o.style.bottom = "auto", o.style.top = `${-u.top + s.top + 4}px`, o.style.maxHeight = `${s.height - 8}px`));
  };
  me(() => {
    if (a(), !t) return;
    const o = r.current, l = (o == null ? void 0 : o.visualViewport) ?? null;
    return l == null || l.addEventListener("resize", a), l == null || l.addEventListener("scroll", a), o == null || o.addEventListener("resize", a), () => {
      l == null || l.removeEventListener("resize", a), l == null || l.removeEventListener("scroll", a), o == null || o.removeEventListener("resize", a);
    };
  }, [t, e]);
}
function Un(e, t, n, r) {
  const a = Le(), o = x(a);
  o.current = a, me(() => {
    if (!t || !e.current) return;
    const l = e.current;
    let u = 0;
    const c = () => {
      u = 0;
      const v = l.getBoundingClientRect(), p = o.current;
      if (!p) return;
      const g = p.innerWidth, w = Jt(p), z = (r == null ? void 0 : r.panelWidth) ?? Math.max(v.width, 200), H = 4, U = 120;
      let A = Math.max(0, v.left);
      A + z > g && (A = Math.max(0, g - z - 8));
      const q = w.bottom - v.bottom - H - 16, L = v.top - w.top - H - 16;
      if (q >= U || q >= L) {
        const R = Math.min(v.bottom + H, w.bottom), W = Math.max(U, w.bottom - R - 16);
        n({ top: R, left: A, width: v.width, maxH: W });
      } else {
        const R = Math.max(U, Math.min(L, 360)), W = w.bottom - (v.top - H);
        n({ top: 0, left: A, width: v.width, maxH: R, bottom: Math.max(0, W) });
      }
    }, f = () => {
      u || (u = requestAnimationFrame(c));
    }, s = o.current ?? null, h = (s == null ? void 0 : s.document) ?? null;
    f(), h == null || h.addEventListener("scroll", f, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", f);
    const d = (s == null ? void 0 : s.visualViewport) ?? null;
    return d == null || d.addEventListener("resize", f), d == null || d.addEventListener("scroll", f), () => {
      u && cancelAnimationFrame(u), h == null || h.removeEventListener("scroll", f, { capture: !0 }), s == null || s.removeEventListener("resize", f), d == null || d.removeEventListener("resize", f), d == null || d.removeEventListener("scroll", f);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let Te = null;
function Qt(e) {
  return Te == null || Te(), Te = e, () => {
    Te === e && (Te = null);
  };
}
const $t = _e("dark"), en = () => He($t), jn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Pt = N ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Vn = N ? "text-xs" : "text-[10px]";
function Et(e) {
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
    headerPad: Pt,
    headerText: `${Pt} font-semibold uppercase tracking-wider ${Vn} ui-label`,
    // Item padding
    itemPad: jn,
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
function tn(e) {
  const t = [];
  return Ee.Children.forEach(e, (n) => {
    if (typeof n == "string" || typeof n == "number")
      t.push(String(n));
    else if (Ee.isValidElement(n)) {
      const r = n.props.children;
      (typeof r == "string" || typeof r == "number") && t.push(String(r));
    }
  }), t.join(" ").trim();
}
const zt = _e({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Ke = _e(null), Ct = () => He(Ke);
function Qe() {
  const e = x([]), [t, n] = B(-1), [r, a] = B(!1), [o, l] = B(0), u = V((h) => (e.current = [...e.current, h], l((d) => d + 1), () => {
    e.current = e.current.filter((d) => d !== h), l((d) => d + 1);
  }), []), c = V((h, d) => {
    n(h), a(d === "pointer");
  }, []), f = V(() => {
    a((h) => h && (n(-1), !1));
  }, []);
  return Ge(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: u,
    setHighlighted: c,
    pointerLeave: f
  }), [t, r, o, u, c, f]);
}
function nn(e) {
  const t = Ct(), n = x(t);
  n.current = t;
  const r = x(null);
  K(() => {
    var c;
    const u = { label: e.label(), activate: e.activate };
    return r.current = u, (c = n.current) == null ? void 0 : c.register(u);
  }, []);
  const a = t && r.current ? t.items.indexOf(r.current) : -1, o = !!t && !e.disabled && a >= 0 && a === t.highlightedIndex;
  return { api: t, myIndex: a, highlighted: o, setPointer: (u) => {
    !e.disabled && t && u >= 0 && t.setHighlighted(u, "pointer");
  } };
}
function Tt(e, t, n, r) {
  const a = x(-1);
  a.current = t.highlightedIndex;
  const o = x(t);
  o.current = t;
  const l = x(e);
  l.current = e;
  const u = x(r);
  u.current = r;
  const c = x({ text: "", time: 0 }), f = x(!1);
  f.current || (f.current = !0, n.current = (s) => {
    var d, v;
    if (!l.current) return;
    const h = o.current.items;
    if (h.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = s.key === "ArrowDown" ? 1 : -1, g = (a.current + p + h.length) % h.length;
        o.current.setHighlighted(g, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = a.current;
        p >= 0 && p < h.length && h[p].submenu && h[p].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (v = (d = u.current) == null ? void 0 : d.onCloseSub) == null || v.call(d);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = a.current;
        p >= 0 && p < h.length && h[p].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const p = Date.now(), g = (p - c.current.time > 500 ? "" : c.current.text) + s.key.toLowerCase();
        if (c.current = { text: g, time: p }, !g) return;
        const w = a.current + 1;
        for (let z = 0; z < h.length; z++) {
          const H = (w + z) % h.length;
          if (h[H].label.toLowerCase().startsWith(g)) {
            o.current.setHighlighted(H, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Rt(e, t, n, r, a, o) {
  const l = x(t);
  l.current = t;
  const u = x(e);
  u.current = e;
  const c = x(a);
  c.current = a;
  const f = x(!1);
  f.current || (f.current = !0, o.current = (s) => {
    if (!u.current || c.current) return;
    const h = r.current;
    h && h.contains(s.target) || l.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function St(e, t) {
  const n = x(e);
  n.current = e;
  const r = x(!1);
  r.current || (r.current = !0, t.current = (a) => {
    if (!n.current) return;
    const o = a.currentTarget;
    o.scrollHeight > o.clientHeight && (a.preventDefault(), o.scrollTop += a.deltaY);
  });
}
function et({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: a = "left",
  width: o,
  theme: l = "dark",
  children: u,
  morph: c = !0,
  contentClassName: f,
  initialHighlightIndex: s
}) {
  const [h, d] = B([]), [v, p] = B(null), g = Be(), w = jt(), z = x(null), H = x(null), U = x(e);
  U.current = e;
  const [A, q] = B(e), L = Qe();
  K(() => {
    if (e)
      return q(!0), L.setHighlighted(s ?? -1, "keyboard"), Qt(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, s, n, t]), K(() => {
    if (!e || !w) return;
    const P = (J) => {
      if (J.pointerType !== "touch") return;
      const ie = J.target;
      ie && (H.current && H.current.contains(ie) || z.current && z.current.contains(ie) || ie instanceof Element && ie.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return w.addEventListener("pointerdown", P, { capture: !0 }), () => w.removeEventListener("pointerdown", P, { capture: !0 });
  }, [e, w, n, t]);
  const R = V(() => {
    const P = z.current;
    if (!P) return null;
    const J = P.getBoundingClientRect();
    return { left: J.left, top: J.top, width: J.width, height: J.height };
  }, []), W = Nt({
    visible: e,
    morph: c,
    anchor: R,
    onClosed: () => q(!1)
  }), b = x(() => {
  }), y = x(() => {
  }), C = x(() => {
  });
  Tt(e && h.length === 0, L, b), St(e, y), Rt(e, L, b, H, h.length > 0, C);
  const S = x(null), I = V((P) => {
    var J;
    if (P) {
      P.addEventListener("keydown", b.current, { capture: !0 }), P.addEventListener("wheel", y.current, { passive: !1 });
      const ie = P.ownerDocument;
      S.current = ie, ie.addEventListener("keydown", C.current, { capture: !0 }), F(P.offsetWidth), te(!0);
    } else
      (J = S.current) == null || J.removeEventListener("keydown", C.current, { capture: !0 }), S.current = null, te(!1);
    H.current = P, W(P);
  }, [W]), [Y, Q] = B({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [ee, E] = B(0), [O, te] = B(!1), [T, F] = B(0);
  K(() => {
    e && z.current && E(z.current.getBoundingClientRect().width);
  }, [e]);
  const M = Ge(() => ({ panelWidth: T || ee || void 0 }), [T, ee]);
  Un(z, e && O, (P) => Q({ ...P, maxH: Math.min(P.maxH, 384), ready: !0 }), M), K(() => {
    if (Y.ready && e) {
      const P = H.current;
      P && P.ownerDocument.activeElement !== P && !P.contains(P.ownerDocument.activeElement) && P.focus();
    }
  }, [Y.ready, e]), me(() => {
    var J;
    if (!e || L.highlightedIndex < 0) return;
    const P = (J = H.current) == null ? void 0 : J.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    P == null || P.scrollIntoView({ block: "nearest" });
  }, [e, L.highlightedIndex]);
  const k = V((P) => {
    !P && !U.current || (!P && se.current && (pe.current = !0), n ? n(P) : P || t == null || t());
  }, [n, t]), X = x(A);
  X.current = A;
  const se = x(!1), pe = x(!1), ve = V(() => {
    if (!U.current && X.current) {
      if (pe.current) {
        pe.current = !1, se.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), ce = Ee.isValidElement(r) ? r : null, ue = ce ? Ee.cloneElement(ce, {
    ref: (P) => {
      z.current = P;
    },
    onPointerDown: () => {
      se.current = !0, pe.current = !1;
    },
    onClick: (P) => {
      var J, ie;
      (ie = (J = ce.props).onClick) == null || ie.call(J, P), ve();
    }
  }) : r;
  return /* @__PURE__ */ $(j.Root, { open: e || A, onOpenChange: k, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: ue }),
    /* @__PURE__ */ i(j.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i($t.Provider, { value: l, children: /* @__PURE__ */ i(zt.Provider, { value: { chain: h, setChain: d, morph: c, keyboardOpened: v, setKeyboardOpened: p }, children: /* @__PURE__ */ i(Ke.Provider, { value: L, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: I,
        "data-theme": l,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${o || ""} ${f || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Y.left,
          top: Y.bottom != null ? void 0 : Y.top,
          bottom: Y.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: o ? void 0 : ee || void 0,
          maxHeight: Y.maxH,
          visibility: Y.ready ? "visible" : "hidden"
        },
        onPointerLeave: L.pointerLeave,
        children: u
      }
    ) }) }) }) })
  ] });
}
function Ni({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: a,
  onRename: o,
  onDuplicate: l,
  onDelete: u,
  onCreate: c,
  onImport: f,
  onExport: s,
  onReset: h,
  onTrash: d,
  closeOnSelect: v,
  readOnly: p = !1,
  theme: g,
  align: w,
  label: z,
  header: H,
  itemLabel: U,
  trigger: A,
  minItems: q = 1,
  itemRender: L,
  morph: R = !0,
  contentClassName: W
}) {
  const b = Et(), [y, C] = B(null), [S, I] = B(""), Y = x(null), Q = x(null);
  K(() => {
    e && requestAnimationFrame(() => {
      var T, F;
      (F = (T = Q.current) == null ? void 0 : T.querySelector('[data-active="1"]')) == null || F.scrollIntoView({ block: "nearest" });
    });
  }, [e]), K(() => {
    var M;
    if (!e) return;
    const T = (k) => {
      var ue, de, P, J, ie;
      if ((de = (ue = k.target) == null ? void 0 : ue.closest) != null && de.call(ue, "input, textarea, [contenteditable]")) return;
      const X = (P = Q.current) == null ? void 0 : P.closest(".ui-menu");
      if (!X || !X.contains(k.target)) return;
      const se = X.ownerDocument, pe = [...X.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], ve = [...X.querySelectorAll('div:last-child > [role="menuitem"]')], ce = [...pe, ...ve];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const oe = se.activeElement;
        let fe = oe ? ce.indexOf(oe) : -1;
        if (fe < 0 && oe) {
          const we = oe.closest("[data-active]"), Ce = we == null ? void 0 : we.querySelector('[role="menuitem"]:first-child');
          Ce && (fe = pe.indexOf(Ce));
        }
        const ge = k.key === "ArrowDown" ? 1 : -1, ze = fe < 0 ? ge === 1 ? 0 : ce.length - 1 : (fe + ge + ce.length) % ce.length;
        (J = ce[ze]) == null || J.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const oe = se.activeElement, fe = oe == null ? void 0 : oe.closest("[data-active]");
        if (!fe) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const ge = [...fe.querySelectorAll('[role="menuitem"]')].slice(1);
        if (ge.length === 0) return;
        const ze = oe && fe.contains(oe) ? ge.indexOf(oe) : -1, we = k.key === "ArrowRight" ? 1 : -1, Ce = ze < 0 ? 0 : (ze + we + ge.length) % ge.length;
        (ie = ge[Ce]) == null || ie.focus({ preventScroll: !0 });
        return;
      }
    }, F = ((M = Q.current) == null ? void 0 : M.ownerDocument) ?? null;
    return F == null || F.addEventListener("keydown", T, { capture: !0 }), () => F == null ? void 0 : F.removeEventListener("keydown", T, { capture: !0 });
  }, [e]), K(() => {
    if (y) {
      requestAnimationFrame(() => {
        var F, M;
        (F = Y.current) == null || F.focus(), (M = Y.current) == null || M.select();
      });
      const T = n.find((F) => F.id === y);
      T && !S && I(T.name);
    }
  }, [y]), K(() => {
    if (y) {
      const T = n.find((F) => F.id === y);
      T && !S && I(T.name);
    }
  }, [y, n]);
  const ee = (T, F) => {
    C(T), I(F);
  }, E = () => {
    y && S.trim() && o(y, S.trim()), C(null);
  }, O = () => {
    C(null);
  }, te = U || H.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ $(et, { open: e, onOpenChange: (T) => {
    T ? (C(null), I("")) : (y && S.trim() && o(y, S.trim()), C(null), I("")), (!T || !p) && t(T);
  }, width: "w-80", theme: g, align: w, trigger: A, morph: R, contentClassName: W, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${b.headerText}`, children: H }),
    /* @__PURE__ */ i("div", { ref: Q, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((T) => {
      const F = T.id === r, M = y === T.id;
      return /* @__PURE__ */ i("div", { "data-active": F ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${F || M ? b.rowActiveBg : b.rowHoverBg} ${y && !M ? "opacity-40 pointer-events-none" : ""}`, children: M ? /* @__PURE__ */ $(Ne, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: Y,
            value: S,
            onChange: (k) => I(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), E()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), O());
            },
            className: `w-full border rounded ${b.input}`
          }
        ) }),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${b.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), E();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(Wt, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${b.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), O();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(at, { className: b.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ $(Ne, { children: [
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none cursor-pointer flex items-center ${b.rowText} ${F ? "" : b.rowTextHover}`,
            onSelect: v ? () => {
              a(T.id);
            } : (k) => {
              k.preventDefault(), a(T.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i("span", { className: `truncate ${F ? b.rowActiveText : ""}`, children: L ? L(T) : T.name })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${F ? b.btnActive : b.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), ee(T.id, T.name);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(mn, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${F ? b.btnActive : b.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const X = l(T.id);
              X && ee(X, `${T.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: /* @__PURE__ */ i(Yt, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= q ? b.btnDisabled : F ? b.btnDangerActive : b.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), u(T.id);
            },
            onTouchStart: () => {
            },
            disabled: p || n.length <= q,
            children: /* @__PURE__ */ i(ut, { className: b.btnIcon })
          }
        )
      ] }) }, T.id);
    }) }),
    /* @__PURE__ */ $("div", { className: `shrink-0 ${y ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ $(Ne, { children: [
        /* @__PURE__ */ i(j.Separator, { className: b.separator }),
        /* @__PURE__ */ $(
          j.Item,
          {
            className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
            onSelect: (T) => {
              T.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: p,
            children: [
              /* @__PURE__ */ i(qt, { className: `${b.btnIcon} ${b.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || f || s || d) && /* @__PURE__ */ i(j.Separator, { className: b.separator }),
      c && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault();
            const F = c();
            F && ee(F, "");
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(pn, { className: `${b.btnIcon} ${b.icon}` }),
            "New ",
            te
          ]
        }
      ),
      f && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ $("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ $("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: p,
          children: [
            /* @__PURE__ */ i(ut, { className: `${b.btnIcon} ${b.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Xn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Gn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: a = "",
  children: o,
  keepOpen: l = !1,
  selected: u = !1,
  rightAction: c,
  trailing: f
}) {
  en();
  const s = Et(), h = x(!1), d = x(null), { myIndex: v, highlighted: p, setPointer: g } = nn({
    label: () => tn(o),
    activate: () => {
      n || e();
    },
    disabled: n
  }), w = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ $(
    j.Item,
    {
      ref: d,
      "data-ei": v >= 0 ? v : void 0,
      className: `w-full text-left ${Xn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${w} ${u ? "ui-item-selected" : ""} ${p ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${a}`,
      onSelect: (z) => {
        if (h.current) {
          h.current = !1;
          return;
        }
        l && z.preventDefault(), e();
      },
      onPointerEnter: () => {
        g(v);
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ i("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: o }),
        f && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: f }),
        c && /* @__PURE__ */ i(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
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
const Zn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Jn({ id: e, label: t, icon: n, width: r, side: a = "right", children: o, contentClassName: l }) {
  const { chain: u, setChain: c, morph: f, keyboardOpened: s, setKeyboardOpened: h } = He(zt), d = u.includes(e), v = u[u.length - 1] === e, p = en(), g = Be(), w = x(null), z = x(null), [H, U] = B(d), A = !d && H;
  K(() => {
    d && U(!0);
  }, [d]);
  const q = () => c((M) => {
    const k = M.indexOf(e);
    return k >= 0 ? M.slice(0, k) : M;
  }), L = Qe(), R = Ct(), W = x(R);
  W.current = R;
  const b = x(null);
  K(() => {
    var k;
    const M = {
      label: t,
      activate: () => {
        h(e), c((X) => X.includes(e) ? X : [...X, e]);
      },
      submenu: !0
    };
    return b.current = M, (k = W.current) == null ? void 0 : k.register(M);
  }, []);
  const y = R && b.current ? R.items.indexOf(b.current) : -1, C = y >= 0 && y === R.highlightedIndex, S = V(() => {
    const M = w.current;
    if (!M) return null;
    const k = M.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), I = Nt({
    visible: d,
    morph: f,
    anchor: S,
    onClosed: () => U(!1)
  }), Y = x(() => {
  }), Q = x(() => {
  }), ee = x(() => {
  });
  Tt(d && v, L, Y, {
    onCloseSub: () => {
      q(), R && y >= 0 && R.setHighlighted(y, "keyboard");
    }
  });
  const E = x(s);
  E.current = s, K(() => {
    d && (E.current === e ? (L.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var M;
      return (M = z.current) == null ? void 0 : M.focus();
    }), h(null)) : L.setHighlighted(-1, "keyboard"));
  }, [d]), St(d, Q), Rt(d, L, Y, z, !v, ee), Ee.useLayoutEffect(() => {
    var k;
    if (!d || L.highlightedIndex < 0) return;
    const M = (k = z.current) == null ? void 0 : k.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    M == null || M.scrollIntoView({ block: "nearest" });
  }, [d, L.highlightedIndex]);
  const O = x(null), te = V((M) => {
    var k;
    if (M) {
      M.addEventListener("keydown", Y.current, { capture: !0 }), M.addEventListener("wheel", Q.current, { passive: !1 });
      const X = M.ownerDocument;
      O.current = X, X.addEventListener("keydown", ee.current, { capture: !0 });
    } else
      (k = O.current) == null || k.removeEventListener("keydown", ee.current, { capture: !0 }), O.current = null;
    z.current = M, I(M);
  }, [I]), T = `w-full text-left ${Zn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${C ? " ui-item-highlighted" : ""}${A ? " ui-sub-closing" : ""}`, F = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${l || ""}`;
  return /* @__PURE__ */ $(j.Sub, { open: d || H, onOpenChange: (M) => c((k) => {
    if (!M) {
      const X = k.indexOf(e);
      return X >= 0 ? k.slice(0, X) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ $(
      j.SubTrigger,
      {
        ref: w,
        "data-ei": y >= 0 ? y : void 0,
        className: T,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          R && y >= 0 && R.setHighlighted(y, "pointer");
        },
        onPointerDown: (M) => {
          M.pointerType === "pen" && (M.preventDefault(), c((k) => d ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          a === "left" && /* @__PURE__ */ i(dt, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ $("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          a === "right" && /* @__PURE__ */ i(dt, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ i(j.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i(
      j.SubContent,
      {
        ref: te,
        "data-theme": p,
        className: F,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: L.pointerLeave,
        children: /* @__PURE__ */ i(Ke.Provider, { value: L, children: o })
      }
    ) })
  ] });
}
const Ae = 8, Qn = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", er = N ? "text-sm" : "text-xs", $i = ({ open: e, x: t, y: n, onClose: r, children: a, containerRef: o, morph: l = !0 }) => {
  const u = x(null), c = Le(), [f, s] = B(!1), [h, d] = B([]), [v, p] = B(null), g = Qe();
  K(() => {
    if (e)
      return g.setHighlighted(-1, "keyboard"), Qt(r);
  }, [e, r]);
  const w = x({ left: t, top: n });
  e && (w.current = { left: t, top: n });
  const z = V(() => ({ left: w.current.left, top: w.current.top, width: 0, height: 0 }), []), H = Nt({
    visible: !0,
    morph: l,
    anchor: z,
    cloneOnUnmount: !0
  }), U = x(() => {
  }), A = x(() => {
  }), q = x(() => {
  });
  Tt(e, g, U), St(e, A), Rt(e, g, U, u, h.length > 0, q);
  const L = x(null), R = V((y) => {
    var C;
    if (y) {
      y.addEventListener("keydown", U.current, { capture: !0 }), y.addEventListener("wheel", A.current, { passive: !1 });
      const S = y.ownerDocument;
      L.current = S, S.addEventListener("keydown", q.current, { capture: !0 });
    } else
      (C = L.current) == null || C.removeEventListener("keydown", q.current, { capture: !0 }), L.current = null;
    u.current = y, s(!!y), H(y);
  }, [H]), [W, b] = B(null);
  return me(() => {
    var T;
    if (!e || !f || !u.current) return;
    const y = u.current, C = y.offsetWidth, S = y.offsetHeight, I = (T = o == null ? void 0 : o.current) == null ? void 0 : T.getBoundingClientRect(), Y = I ? I.right : (c == null ? void 0 : c.innerWidth) ?? 0, Q = I ? I.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, ee = I ? I.left : 0, E = I ? I.top : 0;
    let O = Math.max(E + Ae, w.current.top), te = Math.max(ee + Ae, w.current.left);
    te + C > Y && (te = Y - C - Ae), O + S > Q && (O = Math.max(E + Ae, Q - S - Ae)), b({ left: te, top: O });
  }, [e, f, t, n, o]), e ? /* @__PURE__ */ $(j.Root, { open: e, onOpenChange: (y) => {
    y || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(j.Portal, { children: /* @__PURE__ */ i($t.Provider, { value: "light", children: /* @__PURE__ */ i(zt.Provider, { value: { chain: h, setChain: d, morph: l, keyboardOpened: v, setKeyboardOpened: p }, children: /* @__PURE__ */ i(Ke.Provider, { value: g, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: R,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${er} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (W == null ? void 0 : W.left) ?? w.current.left, top: (W == null ? void 0 : W.top) ?? w.current.top, touchAction: "manipulation" },
        onPointerLeave: g.pointerLeave,
        children: a
      }
    ) }) }) }) })
  ] }) : null;
}, Ei = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: a = !1, trailing: o, children: l }) => {
  const u = Ct(), c = x(u);
  c.current = u;
  const f = x(null);
  K(() => {
    var v;
    const d = { label: tn(l), activate: () => {
      r || e();
    } };
    return f.current = d, (v = c.current) == null ? void 0 : v.register(d);
  }, []);
  const s = u && f.current ? u.items.indexOf(f.current) : -1, h = !r && s >= 0 && s === u.highlightedIndex;
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
      className: `w-full text-left ${Qn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${a ? "ui-item-selected" : ""} ${h ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: l }),
        o && /* @__PURE__ */ i("span", { className: "shrink-0 ml-1 flex items-center", children: o })
      ]
    }
  );
}, zi = () => /* @__PURE__ */ i(j.Separator, { className: "ui-sep my-1" }), Ci = (e) => /* @__PURE__ */ i(Jn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), re = 16, rn = "[data-modal-stack]", ye = 220, Oe = "cubic-bezier(0.32, 0.72, 0, 1)", Ve = 0.94;
function Me() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Pe(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function on(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function It(e, t, n, r) {
  const a = ++e.current, o = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = on(o, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === a && (t.style.transition = `transform ${ye}ms ${Oe}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === a && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ye + 80));
    });
  });
}
function tr(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${Ve})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${ye}ms ${Oe}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ye + 60));
    });
  });
}
function Ot(e, t, n) {
  const r = ++e.current, a = t.getBoundingClientRect(), o = 1 - Ve, l = { left: a.left + a.width * o / 2, top: a.top + a.height * o / 2, width: a.width * Ve, height: a.height * Ve };
  t.style.transition = `transform ${ye}ms ${Oe}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = on(a, l), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ye + 60);
}
function it(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(rn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function ot(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(rn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const nr = N ? "px-6" : "px-5", rr = N ? "py-3" : "py-2.5", ir = N ? "text-sm" : "text-xs", or = N ? "w-4 h-4" : "w-3.5 h-3.5", sr = N ? "text-base" : "text-sm", cr = N ? "w-5 h-5" : "w-4 h-4", st = N ? "px-6" : "px-5", lr = N ? "pt-6" : "pt-5", ar = N ? "pb-6" : "pb-5", ur = N ? "text-xs" : "text-[10px]", dr = N ? "w-3.5 h-3.5" : "w-3 h-3", fr = N ? "px-2.5 py-1.5" : "px-2 py-1", hr = N ? "px-6" : "px-5", mr = N ? "py-3" : "py-2";
function pr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: a,
  footer: o,
  children: l,
  onReset: u,
  morph: c = !0,
  flat: f = !1,
  closable: s = !0,
  dismissOnBackdrop: h = !0
}) {
  const d = x(null), v = x(null), p = x(null), [g, w] = B(!1), z = V((m) => {
    d.current = m, w(m !== null);
  }, []), H = Be(), U = Le(), A = x(U);
  A.current = U;
  const [q, L] = B(null), R = x(null), W = x(!1), b = x(!1), y = x(0), C = x({ w: 0, h: 0 }), S = x(!1), [I, Y] = B(!1), [Q, ee] = B(!1), E = x(0), O = x(!1), [te, T] = B(!1), F = x(c);
  F.current = c;
  const M = x(!1), k = x(!1), X = () => {
    k.current = !0, Y(!0);
  }, se = () => {
    k.current = !1, Y(!1);
  };
  K(() => {
    e || (L(null), S.current = !1, W.current = !1, ee(!1));
  }, [e]), me(() => {
    if (!e || S.current || !g || !d.current || N) return;
    S.current = !0;
    const m = d.current.getBoundingClientRect(), D = A.current ?? null, _ = (D == null ? void 0 : D.innerWidth) ?? 0, Z = Pe(D);
    L({
      left: Math.max(re, Math.min((_ - m.width) / 2, _ - m.width - re)),
      top: Math.max(Z.top + re, Math.min(Z.top + (Z.height - m.height) / 2, Z.bottom - m.height - re))
    });
  }, [e, g]), me(() => {
    if (!e || !g || !c || Me() || !d.current) return;
    const m = d.current, D = it(m), _ = D[D.length - 1];
    X(), _ ? It(E, m, _.getBoundingClientRect(), se) : tr(E, m, se);
  }, [e, g]);
  const pe = V(() => {
    if (!s || O.current) return;
    const m = d.current, D = !!m && it(m).length > 0;
    if (!m || !c || Me() || D) {
      t();
      return;
    }
    O.current = !0, T(!0), M.current = !0, X(), Ot(E, m, () => {
      O.current = !1, T(!1), se(), t();
    });
  }, [c, t, s]), ve = V(() => {
    const m = d.current;
    if (!m || M.current || !F.current || Me() || it(m).length > 0) return;
    const D = m.ownerDocument, _ = m.cloneNode(!0);
    _.removeAttribute("data-modal-stack"), _.removeAttribute("data-state"), _.removeAttribute("role"), _.removeAttribute("data-aria-hidden"), _.removeAttribute("tabindex"), _.setAttribute("aria-hidden", "true"), _.style.pointerEvents = "none", D.body.appendChild(_), Ot({ current: 0 }, _, () => {
      _.isConnected && _.remove();
    });
  }, []);
  me(() => () => ve(), [ve]);
  const ce = x(e);
  me(() => {
    const m = ce.current;
    ce.current = e, m && !e && ve();
  }, [e, g, ve]), K(() => {
    if (!e || !g || !c || !d.current) return;
    const m = d.current, D = m.parentNode;
    if (!D) return;
    let _ = 0, Z = null, G = !1;
    const ne = () => {
      _ = 0;
      const he = ot(m);
      if (he.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", Z = he[he.length - 1].getBoundingClientRect(), G = !0, _ = requestAnimationFrame(ne);
      else if (G) {
        G = !1, Z && !Me() && (X(), It(E, m, Z, se)), Z = null;
        const le = A.current ?? null;
        le == null || le.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, be = new MutationObserver(() => {
      !_ && ot(m).length > 0 && (_ = requestAnimationFrame(ne));
    });
    return be.observe(D, { childList: !0 }), () => {
      be.disconnect(), _ && cancelAnimationFrame(_);
    };
  }, [e, g]), K(() => {
    if (N || !g || !c || Me() || !d.current) return;
    const m = d.current;
    let D = Math.round(m.getBoundingClientRect().height), _ = !1;
    const Z = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const G = Math.round(m.getBoundingClientRect().height);
      if (!_) {
        _ = !0, D = G;
        return;
      }
      if (Math.abs(G - D) < 1) return;
      if (R.current || O.current || ot(m).length > 0) {
        D = G;
        return;
      }
      if (k.current) return;
      const ne = D;
      D = G, X();
      const be = m.getBoundingClientRect(), he = Pe(A.current ?? null), le = !W.current && !b.current, tt = le ? he.top + (he.height - ne) / 2 : be.top, De = le ? he.top + (he.height - G) / 2 : be.top;
      m.style.transition = "none", m.style.height = `${ne}px`, le && (m.style.top = `${tt}px`), v.current && (v.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${ne}px` && (m.style.transition = `height ${ye}ms ${Oe}${le ? `, top ${ye}ms ${Oe}` : ""}`, m.style.height = `${G}px`, le && (m.style.top = `${De}px`), window.setTimeout(() => {
            m.style.height === `${G}px` && (m.style.transition = "", m.style.height = "", v.current && (v.current.style.overflow = ""), le && L({ left: be.left, top: De }), se());
          }, ye + 60));
        });
      });
    });
    return Z.observe(m), () => Z.disconnect();
  }, [g]);
  const ue = V(() => {
    const m = d.current;
    if (!m) return null;
    const D = m.getBoundingClientRect();
    return { left: D.left, top: D.top, width: D.width, height: D.height };
  }, []), de = V((m, D) => {
    const _ = A.current ?? null, Z = (_ == null ? void 0 : _.innerWidth) ?? 0, G = Pe(_), ne = ue(), be = ne ? ne.width : Math.min(Z - re * 2, 576), he = ne ? ne.height : Math.min(G.height - re * 2, 400);
    return {
      left: Math.max(re, Math.min(m, Z - be - re)),
      top: Math.max(G.top + re, Math.min(D, G.bottom - he - re))
    };
  }, [ue]);
  K(() => {
    if (N || !e) return;
    const m = A.current ?? null, D = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !D) return;
    const _ = 120;
    b.current = !1, C.current = { w: m.innerWidth, h: m.innerHeight };
    let Z = 0;
    const G = () => {
      if (O.current || R.current) return;
      const ne = (m == null ? void 0 : m.innerHeight) ?? 0, be = (m == null ? void 0 : m.innerWidth) ?? 0, le = Pe(m).height < ne - _, tt = ne < C.current.h - _ && be === C.current.w;
      le || tt ? (b.current = !0, y.current && (clearTimeout(y.current), y.current = 0)) : y.current || (y.current = (m == null ? void 0 : m.setTimeout(() => {
        b.current = !1, y.current = 0, ee(!1);
      }, 600)) ?? 0), ee(b.current), !Z && (Z = requestAnimationFrame(() => {
        var At;
        Z = 0;
        const De = d.current;
        if (!De) return;
        const $e = Pe(A.current ?? null), xe = De.getBoundingClientRect(), Lt = ((At = A.current) == null ? void 0 : At.innerWidth) ?? 0, nt = (m == null ? void 0 : m.innerHeight) ?? 0, fn = $e.height < nt - _ || nt < C.current.h - _ && (m == null ? void 0 : m.innerWidth) === C.current.w;
        C.current = { w: (m == null ? void 0 : m.innerWidth) ?? 0, h: nt };
        const We = xe.top >= $e.top + re && xe.bottom <= $e.bottom - re, Dt = () => {
          L({
            left: Math.max(re, Math.min((Lt - xe.width) / 2, Lt - xe.width - re)),
            top: Math.max($e.top + re, Math.min($e.top + ($e.height - xe.height) / 2, $e.bottom - xe.height - re))
          });
        };
        if (fn) {
          if (W.current) {
            We || L(de(xe.left, xe.top));
            return;
          }
          if (We) return;
          Dt();
          return;
        }
        if (!b.current) {
          if (W.current) {
            We || L(de(xe.left, xe.top));
            return;
          }
          We || Dt();
        }
      }));
    };
    return D.addEventListener("resize", G), D.addEventListener("scroll", G), m.addEventListener("orientationchange", G), () => {
      D.removeEventListener("resize", G), D.removeEventListener("scroll", G), m.removeEventListener("orientationchange", G), Z && cancelAnimationFrame(Z), y.current && clearTimeout(y.current);
    };
  }, [e, de]);
  const P = V((m) => {
    if (m.target.closest("button")) return;
    W.current = !0;
    const D = ue();
    D && (L(de(D.left, D.top)), R.current = { startX: m.clientX, startY: m.clientY, posX: D.left, posY: D.top }, m.target.setPointerCapture(m.pointerId));
  }, [ue, de]), J = V((m) => {
    const D = R.current;
    D && (m.preventDefault(), L(de(D.posX + m.clientX - D.startX, D.posY + m.clientY - D.startY)));
  }, [de]), ie = V(() => {
    R.current = null;
  }, []), oe = R.current !== null, fe = q !== null, ge = fe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ze = `${a ? `${a} w-full` : "max-w-xl w-full"}`, we = {
    ...fe ? { left: q.left, top: q.top } : {},
    width: `min(100%, calc(100vw - ${re * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Q ? {} : { maxHeight: `calc(100vh - ${re * 2}px)` }
  }, Ce = V((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const _ = p.current;
    if (!_) return;
    const Z = Array.from(_.querySelectorAll("button[data-modal-confirm]")), G = Z.length > 0 ? Z : Array.from(_.querySelectorAll("button")), ne = G[G.length - 1];
    !ne || ne.disabled || (m.preventDefault(), ne.click());
  }, []);
  return /* @__PURE__ */ i(ke.Root, { open: e, onOpenChange: (m) => {
    m || pe();
  }, children: /* @__PURE__ */ $(ke.Portal, { container: H ?? void 0, children: [
    /* @__PURE__ */ i(
      ke.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${te ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), h && pe());
        }
      }
    ),
    /* @__PURE__ */ $(
      ke.Content,
      {
        ref: z,
        onKeyDown: Ce,
        onInteractOutside: (m) => {
          h || m.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ge} ${ze}`,
        style: { touchAction: "manipulation", ...Object.keys(we).length > 0 ? we : {} },
        children: [
          f ? /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${st} ${lr} pb-4 ${oe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                I || P(m);
              },
              onPointerMove: J,
              onPointerUp: ie,
              children: [
                /* @__PURE__ */ i(ke.Title, { className: `${sr} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ i(ke.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(at, { className: cr }) })
              ]
            }
          ) : /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${nr} ${rr} border-b border-zinc-800 shrink-0 bg-zinc-950 ${oe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                I || P(m);
              },
              onPointerMove: J,
              onPointerUp: ie,
              children: [
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(ke.Title, { className: `${ir} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ $("button", { onClick: u, className: `flex items-center gap-1 ${ur} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${fr} shrink-0`, children: [
                    /* @__PURE__ */ i(qt, { className: dr }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(ke.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(at, { className: or }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: v, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${f ? ` ${st} pb-4` : ""}`, children: l }),
          o && /* @__PURE__ */ i("div", { ref: p, className: f ? `${st} ${ar}` : "shrink-0", children: f ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) });
}
function Ti({ children: e }) {
  return /* @__PURE__ */ i("div", { className: `flex items-center justify-end gap-3 ${hr} ${mr} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const gr = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${N ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, br = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Ye({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ i(
    "button",
    {
      type: n,
      className: `${gr} ${br[e]} ${t}`,
      ...r
    }
  );
}
function xr({ checked: e, onChange: t, disabled: n = !1, label: r, id: a, className: o = "", labelClassName: l = "", theme: u, variant: c = "pill", tone: f = "accent", block: s = !1 }) {
  const h = c !== "plain", d = N ? "w-5 h-5" : "w-4 h-4", v = N ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", p = N ? "w-3.5 h-3.5" : "w-3 h-3", g = N ? "text-sm" : "text-xs";
  return /* @__PURE__ */ $(
    "label",
    {
      className: `ui-checkbox ${h ? `ui-checkbox-pill ${N ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${f === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${o}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: N ? 10 : 8 },
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
        h ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ $("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: `ui-checkbox-box ${v}`, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", className: p, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${g} ${l}`, children: r })
      ]
    }
  );
}
const yr = N ? "space-y-5" : "space-y-4", vr = N ? "text-sm" : "text-xs", wr = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", sn = _e(null);
function Ri() {
  const e = He(sn);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Si({ children: e }) {
  const [t, n] = B(null), [r, a] = B(!1), o = x(null), l = x(t);
  l.current = t;
  const u = V(() => {
    const p = l.current;
    p && (p.kind === "confirm" ? p.resolve(!1) : p.kind === "prompt" ? p.resolve(null) : p.resolve());
  }, []), c = V((p) => {
    if (p.suppressKey) {
      const g = localStorage.getItem(p.suppressKey);
      if (g && Date.now() < parseInt(g, 10))
        return Promise.resolve(!0);
    }
    return new Promise((g) => {
      u(), a(!1), n({ kind: "confirm", options: p, resolve: g });
    });
  }, [u]), f = V((p) => new Promise((g) => {
    u(), n({ kind: "prompt", options: p, resolve: g });
  }), [u]), s = V((p) => new Promise((g) => {
    u(), n({ kind: "alert", options: p, resolve: g });
  }), [u]);
  K(() => {
    if (t) {
      const p = setTimeout(() => {
        var g;
        return (g = o.current) == null ? void 0 : g.focus();
      }, 50);
      return () => clearTimeout(p);
    }
  }, [t]);
  const h = V(() => {
    var p, g;
    if (t) {
      if (t.kind === "confirm") {
        const w = t.options;
        w.suppressKey && r && localStorage.setItem(w.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((g = (p = o.current) == null ? void 0 : p.value) == null ? void 0 : g.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), d = t !== null;
  K(() => {
    if (!d) return;
    const p = (g) => {
      g.key !== "Enter" || g.shiftKey || g.metaKey || g.ctrlKey || g.altKey || g.isComposing || (g.preventDefault(), g.stopImmediatePropagation(), h());
    };
    return document.addEventListener("keydown", p, !0), () => document.removeEventListener("keydown", p, !0);
  }, [d, h]);
  const v = V(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ $(sn.Provider, { value: { confirm: c, prompt: f, alert: s }, children: [
    e,
    d && /* @__PURE__ */ i(
      pr,
      {
        open: !0,
        onClose: v,
        closable: (t == null ? void 0 : t.kind) !== "alert",
        dismissOnBackdrop: (t == null ? void 0 : t.kind) !== "alert",
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ $(Ne, { children: [
          t.kind !== "alert" && /* @__PURE__ */ i(Ye, { variant: "ghost", onClick: v, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ i(Ye, { onClick: h, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ i(
            Ye,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: h,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ i(Ye, { "data-modal-confirm": !0, onClick: h, children: "Save" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: yr, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { className: `${vr} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ i(
            xr,
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
              ref: o,
              type: "text",
              defaultValue: t.options.defaultValue || "",
              placeholder: t.options.placeholder,
              className: `w-full ${wr} ui-input`
            }
          )
        ] })
      }
    )
  ] });
}
const kr = 500, Nr = 250, $r = 5, ae = 88, _t = 4;
function Er(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const a = performance.now(), o = (l) => {
    const u = l - a, c = Math.min(u / t, 1);
    n.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function zr({ x: e, y: t, ms: n }) {
  const r = x(null), a = Be();
  return K(() => {
    r.current && Er(r.current, n);
  }, [n]), xt(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "fixed",
          left: e - ae / 2,
          top: t - ae / 2,
          width: ae,
          height: ae,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ $("svg", { ref: r, width: ae, height: ae, viewBox: `0 0 ${ae} ${ae}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: ae / 2,
              cy: ae / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: _t + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ i(
            "circle",
            {
              cx: ae / 2,
              cy: ae / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: _t,
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
function Li() {
  return { "data-no-longpress": "true" };
}
function Cr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Di({
  children: e,
  showRing: t = !0,
  longPressMs: n = kr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: a,
  onLongPress: o
}) {
  const [l, u] = B(null), c = jt(), f = x(null), s = x(null), h = x({ x: 0, y: 0, target: null }), d = x(!1), v = Math.min(Nr, n * 0.5), p = x(a);
  p.current = a;
  const g = x(o);
  return g.current = o, K(() => {
    if (!N || !c) return;
    const w = (A) => {
      if (!ft(A.pointerType) || A.button !== 0) return;
      const q = A.target;
      if (!q.closest(r) || (p.current ? !p.current(q) : Cr(q))) return;
      const L = A.clientX, R = A.clientY;
      h.current = { x: L, y: R, target: A.target }, d.current = !0, t && (s.current = setTimeout(() => u({ x: L, y: R }), v)), f.current = setTimeout(() => {
        if (!d.current) return;
        s.current && (clearTimeout(s.current), s.current = null), u(null);
        const W = h.current.target;
        if (!W) return;
        const b = g.current;
        if (b) {
          b(W, L, R);
          return;
        }
        const y = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: L,
          clientY: R,
          button: 2,
          view: window
        });
        W.dispatchEvent(y);
      }, n);
    }, z = (A) => {
      if (!d.current || f.current === null) return;
      const q = A.clientX - h.current.x, L = A.clientY - h.current.y;
      Math.sqrt(q * q + L * L) > $r && (clearTimeout(f.current), f.current = null, s.current && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    }, H = () => {
      f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null);
    }, U = (A) => {
      ft(A.pointerType) && (f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    };
    return c == null || c.addEventListener("pointerdown", w), c.addEventListener("pointermove", z), c.addEventListener("pointerup", H), c.addEventListener("pointercancel", H), c.addEventListener("pointerleave", U), () => {
      c.removeEventListener("pointerdown", w), c.removeEventListener("pointermove", z), c.removeEventListener("pointerup", H), c == null || c.removeEventListener("pointercancel", H), c == null || c.removeEventListener("pointerleave", U), f.current !== null && clearTimeout(f.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, v, r]), /* @__PURE__ */ $(Ne, { children: [
    e,
    t && l && /* @__PURE__ */ i(zr, { x: l.x, y: l.y, ms: n - v })
  ] });
}
function Ai() {
  const e = Kn();
  return Fn ? e === null || ft(e) : !1;
}
const qe = N ? "px-3.5 py-2 text-sm" : "px-2.5 py-1 text-xs", pt = N ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs", Tr = `inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${N ? "gap-2" : "gap-1.5"}`, Rr = {
  light: {
    subtle: { base: `${qe} text-zinc-600 hover:bg-zinc-200`, open: "bg-zinc-200! text-zinc-900" },
    primary: { base: `${pt} bg-zinc-900 hover:bg-zinc-800 text-white`, open: "bg-zinc-800!" },
    "danger-ghost": { base: `${qe} text-rose-600 hover:bg-rose-50`, open: "bg-rose-50!" }
  },
  dark: {
    subtle: { base: `${qe} text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800`, open: "bg-zinc-800! text-zinc-300" },
    primary: { base: `${pt} bg-zinc-800 hover:bg-zinc-700 text-white`, open: "bg-zinc-700!" },
    "danger-ghost": { base: `${qe} text-red-400 hover:bg-rose-950/40`, open: "bg-rose-950/40!" }
  }
}, Ht = `${pt} bg-blue-950 hover:bg-blue-900 text-white`, Sr = "bg-blue-900!";
function Mi({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: a = "button",
  ...o
}) {
  const l = o["data-state"] === "open", u = Rr[t][e];
  let c = `${u.base} ${l ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (c = l ? `${Ht} ${Sr}` : Ht), /* @__PURE__ */ i("button", { type: a, className: `${Tr} ${c} ${r}`, ...o });
}
const Lr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Dr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ct = 1900, lt = 2100;
function Ar(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Mr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Pi({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: a = "", initialView: o }) {
  const l = /* @__PURE__ */ new Date(), u = (() => {
    if (!o) return l;
    const E = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(E.getTime()) ? l : E;
  })(), [c, f] = B(u.getFullYear()), [s, h] = B(u.getMonth()), [d, v] = B("days"), [p, g] = B(null), w = Ge(() => new Set(e), [e]), z = (E) => {
    w.has(E) ? t(e.filter((O) => O !== E)) : t([...e, E]);
  }, H = Ge(() => {
    const E = Ar(c, s), O = new Date(c, s, 1).getDay(), te = [];
    for (let T = 0; T < O; T++) te.push({ key: `pad-${T}`, day: 0, empty: !0 });
    for (let T = 1; T <= E; T++) te.push({ key: Mr(c, s, T), day: T, empty: !1 });
    return te;
  }, [c, s]), U = (E) => f((O) => Math.max(ct, Math.min(lt, O + E))), A = (E) => {
    s + E < 0 ? (f((O) => Math.max(ct, O - 1)), h(11)) : s + E > 11 ? (f((O) => Math.min(lt, O + 1)), h(0)) : h((O) => O + E);
  }, q = () => {
    if (p === null) return;
    const E = parseInt(p, 10);
    !isNaN(E) && E >= ct && E <= lt && f(E), g(null);
  }, L = (E) => e.some((O) => O.startsWith(`${c}-${String(E + 1).padStart(2, "0")}`)), R = n === "dark", W = N ? "p-2" : "p-1", b = N ? "w-5 h-5" : "w-4 h-4", y = N ? "text-[11px] py-2" : "text-[10px] py-1.5", C = N ? "py-2.5 text-sm" : "py-1.5 text-xs", S = N ? "py-3 text-sm" : "py-2 text-xs", I = N ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", Y = N ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, Q = R ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ee = R ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ $("div", { className: `border rounded-lg overflow-hidden w-full ${R ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${a}`, children: [
    /* @__PURE__ */ $("div", { className: `flex items-center justify-between px-3 py-2 border-b ${R ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? U(-1) : A(-1),
          className: `${W} rounded transition-colors ${R ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ i(gn, { className: b })
        }
      ),
      d === "days" ? /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => v("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${R ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ i(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: p ?? String(c),
          onChange: (E) => g(E.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (E) => E.target.select(),
          onBlur: q,
          onKeyDown: (E) => {
            E.key === "Enter" && (E.preventDefault(), q()), E.key === "Escape" && g(null);
          },
          className: Y
        }
      ),
      /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => d === "months" ? U(1) : A(1),
          className: `${W} rounded transition-colors ${R ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": d === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ i(dt, { className: b })
        }
      )
    ] }),
    d === "months" ? /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Dr.map((E, O) => /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: () => {
            h(O), v("days");
          },
          className: `${S} relative font-medium transition-colors border-b ${O === s ? Q : ee} ${R ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            E,
            L(O) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${O === s ? "bg-white" : R ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        E
      )) }),
      /* @__PURE__ */ i("div", { className: `text-center border-t ${R ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => {
            f(l.getFullYear()), h(l.getMonth()), v("days");
          },
          className: `px-3 ${N ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${R ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ $("div", { className: "grid grid-cols-7 text-center", children: [
      Lr.map((E) => /* @__PURE__ */ i("div", { className: `${y} font-semibold uppercase tracking-wider border-b ${R ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: E }, E)),
      H.map((E) => E.empty ? /* @__PURE__ */ i("div", {}, E.key) : /* @__PURE__ */ i(
        "button",
        {
          type: "button",
          onClick: () => z(E.key),
          className: `${C} font-medium transition-colors border-b ${R ? "border-zinc-800/60" : "border-zinc-50"} ${w.has(E.key) ? Q : R ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: E.day
        },
        E.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ $("div", { className: `px-3 py-2 border-t ${R ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ $("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((E) => {
        const O = /* @__PURE__ */ new Date(E + "T00:00:00"), te = O.getFullYear() === l.getFullYear() ? O.toLocaleString("default", { month: "short", day: "numeric" }) : O.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ $(
          "button",
          {
            type: "button",
            onClick: () => z(E),
            "aria-label": `Remove ${te}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${R ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${I}`,
            children: [
              te,
              /* @__PURE__ */ i("span", { className: `leading-none ${R ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          E
        );
      }) })
    ] })
  ] });
}
function Ii({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: a,
  allSelected: o = !1,
  toggleAllLabel: l,
  emptyHint: u = "Nothing here",
  maxHeight: c,
  disabled: f = !1,
  theme: s,
  className: h = ""
}) {
  const d = (w) => t instanceof Set ? t.has(w) : t.includes(w), v = N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = N ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", g = r != null || a != null;
  return /* @__PURE__ */ $("div", { className: h, ...s ? { "data-theme": s } : {}, children: [
    g && /* @__PURE__ */ $("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      a != null && /* @__PURE__ */ i("button", { type: "button", disabled: f, onClick: a, className: "ui-checklist-toggleall", children: l ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const z = d(w.id);
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(w.id),
                className: `ui-checklist-item ${v} ${z ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-checklist-box ${p}`, "aria-hidden": !0, children: z && /* @__PURE__ */ i("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ i("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  w.leading != null && /* @__PURE__ */ i("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ i("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ i("span", { className: "ui-checklist-secondary", children: w.secondary })
                ]
              },
              w.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ i("div", { className: "ui-checklist-empty", children: u })
        ]
      }
    )
  ] });
}
function Oi({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: a = "Nothing here",
  maxHeight: o,
  compact: l = !1,
  disabled: u = !1,
  theme: c,
  className: f = ""
}) {
  const s = l ? "px-2.5 py-1.5 text-xs" : N ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", h = l ? "w-3.5 h-3.5" : N ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ $("div", { className: f, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          e.map((d) => {
            const v = t === d.id;
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(d.id),
                className: `ui-checklist-item ${s} ${v ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ i("span", { className: `ui-radio-circle ${h}`, "aria-hidden": !0, children: v && /* @__PURE__ */ i("span", { className: "ui-radio-dot" }) }),
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
const _i = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: a = "visible",
  offset: o = 8
}) => {
  const l = Le(), { refs: u, floatingStyles: c } = kn({
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
          var H;
          if (a !== "visible") return {};
          const s = (H = f.elements.floating.ownerDocument) == null ? void 0 : H.defaultView;
          if (!s) return {};
          const h = f.rects.reference, d = Math.max(h.x, 0), v = Math.max(h.y, 0), p = Math.min(h.x + h.width, s.innerWidth), g = Math.min(h.y + h.height, s.innerHeight);
          if (p <= d || g <= v) return {};
          const w = r === "left" ? p - (h.x + h.width) : r === "right" ? d - h.x : 0, z = r === "top" ? v - h.y : r === "bottom" ? g - (h.y + h.height) : 0;
          return { x: f.x + w, y: f.y + z };
        }
      },
      $n(o),
      En({ padding: 8 }),
      zn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (f) => {
          var g;
          const s = (g = f.elements.floating.ownerDocument) == null ? void 0 : g.defaultView;
          if (!s) return {};
          const h = f.rects.floating.width, d = f.rects.floating.height, v = Math.max(8, Math.min(f.x, s.innerWidth - h - 8)), p = Math.max(8, Math.min(f.y, s.innerHeight - d - 8));
          return { x: v, y: p };
        }
      }
    ],
    whileElementsMounted: Nn
  });
  return me(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ $(Ne, { children: [
    !n && /* @__PURE__ */ i("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    l && xt(
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
}, Ie = ({ content: e, children: t }) => {
  const n = Be(), r = Le(), [a, o] = B(!1), [l, u] = B({ x: 0, y: 0 }), c = x(null), f = () => {
    if (!c.current) return;
    const s = c.current.getBoundingClientRect();
    u({ x: s.left + s.width / 2, y: s.top });
  };
  return K(() => (a && r && (f(), r.addEventListener("scroll", f, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", f, !0)), [a]), /* @__PURE__ */ $(
    "div",
    {
      ref: c,
      className: "inline-flex",
      onMouseEnter: () => {
        f(), o(!0);
      },
      onMouseLeave: () => o(!1),
      children: [
        t,
        a && xt(
          /* @__PURE__ */ $(
            "div",
            {
              className: `fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 ${N ? "px-3 py-1.5 bg-zinc-900 text-white text-xs" : "px-2.5 py-1.5 bg-zinc-900 text-white text-[10px]"}`,
              style: { left: l.x, top: l.y - (N ? 24 : 20), transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((s, h) => /* @__PURE__ */ i("div", { className: h > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: s }, h)),
                /* @__PURE__ */ i("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, Hi = N ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", gt = N ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Ue = N ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Pr = "hover:bg-red-950/50", cn = N ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", ln = "bg-blue-900/50 border-blue-700 text-blue-300", an = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Ir = N ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Bi = N ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Xe = N ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Or = "inline-flex rounded overflow-hidden border border-zinc-700", un = N ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", je = ({ onClick: e, disabled: t, title: n, className: r = gt, children: a }) => /* @__PURE__ */ i(Ie, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: a }) }), Fi = ({ value: e, options: t, onChange: n, disabled: r, active: a }) => /* @__PURE__ */ i("div", { className: Or, children: t.map((o) => {
  const l = a ? a(o.v) : e === o.v;
  return /* @__PURE__ */ i(
    "button",
    {
      disabled: r,
      onClick: () => n(o.v),
      className: `${N ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${l ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${o.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: o.l
    },
    o.v
  );
}) }), Ki = ({ children: e }) => /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: N ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), _r = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Hr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Wi = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ $("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? _r : Hr, children: e }),
  t
] }), Yi = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ $("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), qi = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: a }) => /* @__PURE__ */ $(Ne, { children: [
  /* @__PURE__ */ i(je, { onClick: () => r(-1), disabled: e, title: "Move up", className: Ue, children: /* @__PURE__ */ i(bn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(je, { onClick: () => r(1), disabled: e, title: "Move down", className: Ue, children: /* @__PURE__ */ i(xn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(je, { onClick: t, disabled: e, title: "Duplicate", className: Ue, children: /* @__PURE__ */ i(Yt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: Xe }),
  /* @__PURE__ */ i(je, { onClick: n, disabled: e, title: "Delete", className: `${Ue} ${Pr}`, children: /* @__PURE__ */ i(ut, { className: "w-2.5 h-2.5" }) })
] }), Br = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Fr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Kr = /^(https?:\/\/|mailto:)/i;
function Wr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const a = n.slice(0, r).trim().toLowerCase(), o = n.slice(r + 1).trim();
    Fr.has(a) && o && t.push(`${a}: ${o}`);
  }
  return t.join("; ");
}
function bt(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const u = document.createDocumentFragment();
    for (const c of Array.from(t.childNodes)) u.appendChild(bt(c));
    return u;
  };
  if (!Br.has(n)) return r();
  if (n === "a") {
    const u = t.getAttribute("href") || "";
    if (!Kr.test(u)) return r();
  }
  const a = document.createElement(n), o = t.getAttribute("style"), l = Wr(o || "");
  if (l && a.setAttribute("style", l), n === "a") {
    a.setAttribute("href", t.getAttribute("href"));
    const u = t.getAttribute("target"), c = t.getAttribute("rel");
    u && a.setAttribute("target", u), c && a.setAttribute("rel", c);
  }
  for (const u of Array.from(t.childNodes)) a.appendChild(bt(u));
  return a;
}
function dn(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Yr(e) {
  const t = dn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const l of Array.from(n.content.childNodes)) r.appendChild(bt(l));
  const a = document.createElement("div");
  return a.appendChild(r), a.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Ui(e) {
  const t = dn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function ji(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const qr = { text: "#52525b" }, Ur = ({ node: e, selected: t, extension: n, editor: r, view: a, getPos: o }) => {
  var h;
  const l = e.attrs.field ?? "", u = n.options, c = ((h = u.resolve) == null ? void 0 : h.call(u, l)) ?? null, f = (c == null ? void 0 : c.color) ?? qr, s = (c == null ? void 0 : c.label) ?? `{{${l}}}`;
  return /* @__PURE__ */ i(
    Rn,
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
        var w;
        if (d.button !== 0 || !r.isEditable) return;
        d.preventDefault(), r.isFocused || r.commands.focus();
        const v = typeof o == "function" ? o() : null;
        if (v == null) return;
        const p = a.state.doc.resolve(v), g = p.nodeAfter;
        g && Ze.isSelectable(g) && a.dispatch(a.state.tr.setSelection(new Ze(p))), (w = u.onTokenClick) == null || w.call(u, l, d.currentTarget.getBoundingClientRect(), v);
      },
      children: s
    }
  );
};
function jr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Bt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Vr = _n.extend({
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
    return Tn(Ur);
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
    return ["span", Cn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Xr = 240, Gr = 280, Zr = ({ props: e, onApi: t }) => {
  const n = Qe(), r = x(t);
  r.current = t, K(() => {
    r.current(n);
  }, [n]);
  const a = x(null);
  K(() => {
    var l, u;
    (u = (l = a.current) == null ? void 0 : l.querySelector(".ui-item-highlighted")) == null || u.scrollIntoView({ block: "nearest" });
  }, [n.highlightedIndex]), K(() => {
    e.items.length > 0 && n.highlightedIndex === -1 && n.setHighlighted(0, "keyboard");
  }, [e.items.length, n.highlightedIndex, n]);
  const o = Et();
  return /* @__PURE__ */ i(Ke.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Gr, maxHeight: Xr },
      onMouseDown: (l) => l.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: a, children: e.items.map((l) => /* @__PURE__ */ i(
        Jr,
        {
          item: l,
          d: o,
          command: () => e.command({ field: l.key })
        },
        l.key
      )) })
    }
  ) });
}, Jr = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: a, setPointer: o } = nn({
    label: () => e.label,
    activate: n
  });
  return /* @__PURE__ */ $(
    "div",
    {
      role: "option",
      className: `w-full text-left ${t.itemPad} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${t.itemDefault} ${a ? "ui-item-highlighted" : ""}`,
      onPointerEnter: () => o(r),
      onClick: n,
      children: [
        /* @__PURE__ */ i("span", { className: `${t.icon} shrink-0 flex items-center`, children: /* @__PURE__ */ i("span", { className: "block w-2 h-2 rounded-full", style: { background: e.color.text } }) }),
        /* @__PURE__ */ i("span", { className: "flex-1 truncate", children: e.label }),
        e.group && /* @__PURE__ */ i("span", { className: "shrink-0 text-[9px] uppercase tracking-wider", style: { color: e.color.text }, children: e.group })
      ]
    }
  );
}, Qr = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(Zr, { props: n, onApi: (r) => {
        e.api = r;
      } })
    ));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.zIndex = "10002";
      const a = Hn(r);
      e = { holder: r, root: a, unmount: null, props: n, api: null };
      const o = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: l, y: u, placement: c, strategy: f }) => {
          var d, v;
          if (!e) return;
          const s = (v = (d = e.props) == null ? void 0 : d.clientRect) == null ? void 0 : v.call(d), h = s && !c.endsWith("-end") ? s.width : 0;
          r.style.position = f, r.style.left = `${l + h}px`, r.style.top = `${u}px`;
        }
      });
      e.unmount = o, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      if (!(e != null && e.props) || !e.api) return !1;
      const { items: r, command: a } = e.props;
      if (r.length === 0) return !1;
      const o = e.api, l = n.key;
      if (l === "ArrowDown" || l === "ArrowUp") {
        n.preventDefault();
        const u = o.highlightedIndex, c = l === "ArrowDown" ? 1 : -1;
        return o.setHighlighted((u + c + r.length) % r.length, "keyboard"), !0;
      }
      if (l === "Enter" || l === "Tab") {
        n.preventDefault();
        const u = o.highlightedIndex, c = u >= 0 ? u : 0, f = o.items[c];
        return f ? f.activate() : r[c] && a({ field: r[c].key }), !0;
      }
      return !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Vi = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, ei = Ee.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: a,
  onStateChange: o,
  resolveToken: l,
  suggestionItems: u,
  onTokenClick: c,
  onSelectionChange: f
}, s) => {
  const h = x(l);
  h.current = l;
  const d = x(u);
  d.current = u;
  const v = x(c);
  v.current = c;
  const p = x(f);
  p.current = f;
  const g = x(null), w = x(null), z = x(t);
  z.current = t;
  const H = x(r);
  H.current = r;
  const U = x(o);
  U.current = o;
  const A = x(null), q = (y) => {
    var I;
    const C = {
      bold: y.isActive("bold"),
      italic: y.isActive("italic"),
      underline: y.isActive("underline"),
      strike: y.isActive("strike"),
      link: y.isActive("link"),
      color: y.getAttributes("textStyle").color || ""
    }, S = A.current;
    S && S.bold === C.bold && S.italic === C.italic && S.underline === C.underline && S.strike === C.strike && S.link === C.link && S.color === C.color || (A.current = C, (I = U.current) == null || I.call(U, C));
  }, L = (y) => {
    var Q;
    const C = y.state.selection;
    let S = null;
    C instanceof Ze && C.node.type.name === "token" ? (S = { key: C.node.attrs.field ?? "", pos: C.from }, g.current = C.from) : g.current != null && (g.current = y.state.tr.mapping.map(g.current));
    const I = w.current, Y = I && S && I.key === S.key && I.pos === S.pos;
    !I && !S || Y || (w.current = S, (Q = p.current) == null || Q.call(p, S));
  }, R = (y) => {
    const C = Yr(jr(y));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(C) ? "" : C;
  }, W = Ee.useMemo(() => {
    const y = {
      char: "@",
      // Any prefix — `@` fires mid-word too (emails aren't a concern in the
      // film-schedule text blocks); a space-only prefix made the popup feel
      // dead when typing after a letter.
      allowedPrefixes: null,
      items: ({ query: C }) => {
        var S;
        return ((S = d.current) == null ? void 0 : S.call(d, C)) ?? [];
      },
      command: ({ editor: C, range: S, props: I }) => {
        C.chain().focus().insertContentAt(S, { type: "token", attrs: { field: I.field } }).run();
      },
      render: Qr
    };
    return Vr.configure({
      resolve: h.current ?? null,
      suggestion: y,
      onTokenClick: (C, S, I) => {
        var Y;
        g.current = I, (Y = v.current) == null || Y.call(v, C, S, I);
      }
    });
  }, []), b = Sn({
    immediatelyRender: !1,
    extensions: [
      Dn,
      An.configure({ placeholder: n }),
      Mn,
      Pn,
      On,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      In.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      W
    ],
    content: Bt(e || ""),
    editable: !r,
    onUpdate: ({ editor: y }) => {
      z.current(R(y.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: y }) => {
      q(y), L(y);
    }
  });
  return K(() => {
    if (!b || b.isFocused) return;
    R(b.getHTML()) !== e && (A.current = null, b.commands.setContent(Bt(e || ""), { emitUpdate: !1 }), q(b));
  }, [e, b]), K(() => {
    b && b.setEditable(!r);
  }, [r, b]), K(() => {
    b && (A.current = null, q(b), L(b));
  }, [b]), hn(s, () => ({
    exec: (y, C) => {
      if (!(!b || H.current))
        switch (y) {
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
            C && b.chain().focus().setColor(C).run();
            break;
          case "unsetColor":
            b.chain().focus().unsetColor().run();
            break;
          case "link":
            C && b.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
            break;
          case "unlink":
            b.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => b == null ? void 0 : b.commands.focus(),
    insertToken: (y) => {
      !b || H.current || b.chain().focus().insertContent({ type: "token", attrs: { field: y } }).run();
    },
    replaceToken: (y) => {
      if (!b || H.current) return;
      const C = g.current;
      C != null && b.commands.command(({ tr: S }) => {
        const I = S.doc.nodeAt(C);
        if (!I || I.type.name !== "token") return !1;
        S.setNodeMarkup(C, void 0, { field: y });
        const Y = S.doc.resolve(C);
        return Y.nodeAfter && Y.nodeAfter.type.name === "token" && S.setSelection(new Ze(Y)), !0;
      });
    }
  }), [b]), /* @__PURE__ */ i(Ln, { editor: b, className: `richtext-editor ${a || ""}` });
});
ei.displayName = "RichTextEditor";
const ti = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], ni = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Ft = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Xi = ({ value: e, disabled: t, onChange: n }) => {
  const [r, a] = B(!1);
  return /* @__PURE__ */ i(
    et,
    {
      open: r,
      onOpenChange: a,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${un} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(Ut, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: ti.map((o) => /* @__PURE__ */ i(Gn, { onClick: () => {
        n(o), a(!1);
      }, icon: o === e ? /* @__PURE__ */ i(Wt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: o }, children: o }) }, o))
    }
  );
}, ri = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, a] = B(!1), [o, l] = B(""), u = () => {
    var f;
    const c = o.trim();
    c && ((f = e.current) == null || f.exec("link", c), a(!1));
  };
  return /* @__PURE__ */ i(
    et,
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
          className: `${cn} ${n ? ln : an}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ i(wn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ $("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ i(
          "input",
          {
            value: o,
            onChange: (c) => l(c.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (c) => {
              c.key === "Enter" && (c.preventDefault(), u());
            },
            className: Ir + " w-full"
          }
        ),
        /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ i("button", { onClick: u, className: gt, disabled: !o.trim(), children: "Apply" }),
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                var c;
                (c = e.current) == null || c.exec("unlink"), a(!1);
              },
              className: gt,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Gi = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: a }) => {
  const [o, l] = B(!1), u = (s, h) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(s, h);
  }, c = (s) => `${cn} ${s ? ln : an}`, f = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ $("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(Ie, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i("button", { "aria-label": "Bold", disabled: t || f("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("bold"), className: `${c(((n == null ? void 0 : n.bold) ?? !1) || f("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ i(Ie, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i("button", { "aria-label": "Italic", disabled: t || f("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("italic"), className: `${c(((n == null ? void 0 : n.italic) ?? !1) || f("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ i(Ie, { content: "Underline", children: /* @__PURE__ */ i("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("underline"), className: c((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ i(yn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(Ie, { content: "Strikethrough", children: /* @__PURE__ */ i("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("strikeThrough"), className: c((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ i(vn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: Xe }),
    /* @__PURE__ */ i(ri, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: Xe }),
    /* @__PURE__ */ i(
      et,
      {
        open: o,
        onOpenChange: l,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${un} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(Ft, {}),
          /* @__PURE__ */ i(Ut, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("unsetColor"), l(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(Ft, { className: "w-3.5 h-3.5" })
            }
          ),
          ni.map((s) => /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("foreColor", s), l(!1);
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
    a && /* @__PURE__ */ $(Ne, { children: [
      /* @__PURE__ */ i("div", { className: Xe }),
      a
    ] })
  ] });
};
export {
  Mi as Button,
  xr as Checkbox,
  Ii as Checklist,
  Yi as ChromeHeader,
  Wi as ContentRow,
  $i as ContextMenu,
  zi as ContextMenuDivider,
  Ei as ContextMenuItem,
  Ci as ContextMenuSub,
  Pi as DatePicker,
  Si as DialogProvider,
  Gn as DropdownItem,
  et as DropdownMenu,
  Jn as DropdownSubmenu,
  $t as DropdownThemeContext,
  ti as FONTS,
  _i as FloatingChrome,
  Xi as FontMenu,
  Gi as FormatToolbar,
  N as IS_COARSE,
  Fn as IS_TOUCH_CAPABLE,
  Ni as ItemManagerDropdown,
  Di as LongPressMenuProvider,
  vt as MORPH_EASE,
  Se as MORPH_MS,
  wt as MORPH_OPACITY_MS,
  Ke as MenuHighlightContext,
  pr as Modal,
  Ti as ModalFooter,
  Ye as ModalFooterButton,
  Bn as PopoutWindowContext,
  Vi as RICH_TEXT_STATE_IDLE,
  Oi as RadioList,
  ei as RichTextEditor,
  Ki as SectionHeader,
  Fi as Seg,
  qi as StructureControls,
  zt as SubmenuContext,
  gt as TB_BTN,
  Ue as TB_BTN_ICON,
  Pr as TB_DANGER,
  Xe as TB_DIVIDER,
  Ir as TB_INPUT,
  Bi as TB_NUM,
  un as TB_PICKER,
  Hi as TB_ROW_LABEL,
  Or as TB_SEG,
  cn as TB_TOGGLE,
  an as TB_TOGGLE_OFF,
  ln as TB_TOGGLE_ON,
  Vr as Token,
  Ur as TokenChipView,
  je as ToolButton,
  Ie as Tooltip,
  kt as ZOOM_FROM,
  qn as cloneOverlayClose,
  ji as escapeHtml,
  Et as getDropdownClasses,
  vi as getHardwareKeyboard,
  yi as getLastPointerType,
  Cr as isInteractiveElement,
  ft as isTouchLike,
  Gt as nearestOverlayOrigin,
  dn as normalizeSpaces,
  rt as overlayMorphEnabled,
  Yn as playOverlayClose,
  Wn as playOverlayOpen,
  Bt as preprocessTokenHtml,
  Yr as sanitizeRichText,
  Ui as stripRichText,
  jr as stripTokenWrappers,
  jt as useCurrentDocument,
  Le as useCurrentWindow,
  Ri as useDialog,
  en as useDropdownTheme,
  Un as useFixedPosition,
  wi as useHardwareKeyboard,
  Kn as useLastPointerType,
  Li as useLongPressOptOut,
  Ct as useMenuHighlight,
  Nt as useOverlayMorph,
  yt as usePopoutWindow,
  Be as usePortalTarget,
  ki as useSmartPosition,
  Ai as useTouchMode
};
