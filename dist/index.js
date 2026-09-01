"use client";
import { jsxs as N, jsx as i, Fragment as Ne } from "react/jsx-runtime";
import Ee, { createContext as _e, useContext as He, useState as B, useEffect as K, useRef as x, useCallback as V, useLayoutEffect as pe, useMemo as Ge, useImperativeHandle as hn } from "react";
import * as j from "@radix-ui/react-dropdown-menu";
import { Check as Yt, X as ut, Pencil as mn, Copy as qt, Trash2 as dt, RotateCcw as Ut, Plus as pn, ChevronRight as Ze, ChevronLeft as gn, ArrowUp as bn, ArrowDown as xn, ChevronDown as xt, Underline as yn, Strikethrough as vn, Link as wn } from "lucide-react";
import * as ke from "@radix-ui/react-dialog";
import { createPortal as yt } from "react-dom";
import { useFloating as kn, autoUpdate as Nn, offset as $n, flip as En, shift as zn } from "@floating-ui/react-dom";
import { mergeAttributes as Cn, ReactNodeViewRenderer as Tn, NodeViewWrapper as Rn, useEditor as Sn, EditorContent as Ln } from "@tiptap/react";
import { NodeSelection as Je } from "@tiptap/pm/state";
import Dn from "@tiptap/starter-kit";
import An from "@tiptap/extension-placeholder";
import { TextStyle as Mn } from "@tiptap/extension-text-style";
import Pn from "@tiptap/extension-color";
import In from "@tiptap/extension-link";
import On from "@tiptap/extension-underline";
import { Mention as _n } from "@tiptap/extension-mention";
import { createRoot as Hn } from "react-dom/client";
const Bn = _e(null);
function vt() {
  return He(Bn);
}
function Be() {
  const e = vt();
  return e ? e.document.body : null;
}
function jt() {
  const e = vt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function Le() {
  return vt() ?? (typeof window < "u" ? window : null);
}
const Fe = typeof window < "u", $ = Fe && window.matchMedia("(pointer: coarse)").matches, Fn = Fe && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function ft(e) {
  return e === "touch" || e === "pen";
}
let Re = null;
const ht = /* @__PURE__ */ new Set();
Fe && window.addEventListener("pointerdown", (e) => {
  Re = e.pointerType, ht.forEach((t) => t());
}, !0);
function vi() {
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
let Qe = Xt();
const mt = /* @__PURE__ */ new Set();
function Pt(e) {
  Qe !== e && (Qe = e, mt.forEach((t) => t()));
}
var Wt;
if (Fe) {
  const e = () => Pt(Xt());
  for (const l of Vt) {
    const u = window.matchMedia(l);
    (Wt = u.addEventListener) == null || Wt.call(u, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (l) => {
    l.isComposing || l.keyCode !== 229 && (l.key === "Enter" || l.key === "Backspace" || l.key === "Process" || l.key === "Unidentified" || Pt(!0));
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
function wi() {
  return Qe;
}
function ki() {
  const [, e] = B(0);
  return K(() => {
    const t = () => e((n) => n + 1);
    return mt.add(t), () => {
      mt.delete(t);
    };
  }, []), Qe;
}
const Se = 220, wt = "cubic-bezier(0.32, 0.72, 0, 1)", kt = 170, Nt = 0.94;
function it(e) {
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
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${Nt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === a && requestAnimationFrame(() => {
      if (e.current !== a) return;
      const l = Zt(t, n);
      t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transition = `transform ${Se}ms ${wt}, opacity ${kt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === a && (t.style.transition = o.transition, t.style.transform = o.transform, t.style.transformOrigin = o.transformOrigin, t.style.opacity = o.opacity, r == null || r());
      }, Se + 60);
    });
  });
}
function Yn(e, t, n, r) {
  const a = ++e.current, o = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, l = Zt(t, n);
  t.style.transition = `transform ${Se}ms ${wt}, opacity ${kt}ms ease`, t.style.transformOrigin = `${l.x * 100}% ${l.y * 100}%`, t.style.transform = `scale(${Nt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
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
      r.isConnected && (r.style.transition = `transform ${Se}ms ${wt}, opacity ${kt}ms ease`, r.style.transform = `scale(${Nt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Se + 60));
    });
  });
}
function $t(e) {
  const t = x(null), [n, r] = B(!1), a = x(null), o = x(0), l = V((p) => {
    if (e.ref && (e.ref.current = p), p) {
      o.current = 0, t.current = p;
      const z = p.getBoundingClientRect();
      (z.width > 0 || z.height > 0) && (a.current = { left: z.left, top: z.top, width: z.width, height: z.height }), r(!0);
      return;
    }
    const g = t.current, w = ++o.current;
    queueMicrotask(() => {
      w === o.current && t.current === g && (t.current = null, r(!1), !(!g || !e.cloneOnUnmount || !c.current) && g.style.visibility !== "hidden" && it(d.current) && qn(g, s.current, a.current));
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
  return pe(() => {
    if (!n || !c.current || !it(d.current)) return;
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
  }, [n, u]), pe(() => {
    var w;
    const p = f.current;
    if (f.current = e.visible, e.visible || !p) return;
    const g = t.current;
    if (!g || !it(d.current)) {
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
function Ni(e, t) {
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
  pe(() => {
    if (a(), !t) return;
    const o = r.current, l = (o == null ? void 0 : o.visualViewport) ?? null;
    return l == null || l.addEventListener("resize", a), l == null || l.addEventListener("scroll", a), o == null || o.addEventListener("resize", a), () => {
      l == null || l.removeEventListener("resize", a), l == null || l.removeEventListener("scroll", a), o == null || o.removeEventListener("resize", a);
    };
  }, [t, e]);
}
function Un(e, t, n, r) {
  const a = Le(), o = x(a);
  o.current = a, pe(() => {
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
const Et = _e("dark"), en = () => He(Et), jn = $ ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", It = $ ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Vn = $ ? "text-xs" : "text-[10px]";
function zt(e) {
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
    headerPad: It,
    headerText: `${It} font-semibold uppercase tracking-wider ${Vn} ui-label`,
    // Item padding
    itemPad: jn,
    // Input
    input: $ ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: $ ? "w-8 h-8" : "w-6 h-6",
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
const Ct = _e({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Ke = _e(null), Tt = () => He(Ke);
function et() {
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
  const t = Tt(), n = x(t);
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
function Rt(e, t, n, r) {
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
function St(e, t, n, r, a, o) {
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
function Lt(e, t) {
  const n = x(e);
  n.current = e;
  const r = x(!1);
  r.current || (r.current = !0, t.current = (a) => {
    if (!n.current) return;
    const o = a.currentTarget;
    o.scrollHeight > o.clientHeight && (a.preventDefault(), o.scrollTop += a.deltaY);
  });
}
function tt({
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
  const [A, q] = B(e), L = et();
  K(() => {
    if (e)
      return q(!0), L.setHighlighted(s ?? -1, "keyboard"), Qt(() => {
        n == null || n(!1), t == null || t();
      });
    d([]);
  }, [e, s, n, t]), K(() => {
    if (!e || !w) return;
    const I = (Z) => {
      if (Z.pointerType !== "touch") return;
      const re = Z.target;
      re && (H.current && H.current.contains(re) || z.current && z.current.contains(re) || re instanceof Element && re.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return w.addEventListener("pointerdown", I, { capture: !0 }), () => w.removeEventListener("pointerdown", I, { capture: !0 });
  }, [e, w, n, t]);
  const R = V(() => {
    const I = z.current;
    if (!I) return null;
    const Z = I.getBoundingClientRect();
    return { left: Z.left, top: Z.top, width: Z.width, height: Z.height };
  }, []), W = $t({
    visible: e,
    morph: c,
    anchor: R,
    onClosed: () => q(!1)
  }), b = x(() => {
  }), y = x(() => {
  }), C = x(() => {
  });
  Rt(e && h.length === 0, L, b), Lt(e, y), St(e, L, b, H, h.length > 0, C);
  const S = x(null), O = V((I) => {
    var Z;
    if (I) {
      I.addEventListener("keydown", b.current, { capture: !0 }), I.addEventListener("wheel", y.current, { passive: !1 });
      const re = I.ownerDocument;
      S.current = re, re.addEventListener("keydown", C.current, { capture: !0 }), F(I.offsetWidth), te(!0);
    } else
      (Z = S.current) == null || Z.removeEventListener("keydown", C.current, { capture: !0 }), S.current = null, te(!1);
    H.current = I, W(I);
  }, [W]), [Y, Q] = B({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [ee, E] = B(0), [_, te] = B(!1), [T, F] = B(0);
  K(() => {
    e && z.current && E(z.current.getBoundingClientRect().width);
  }, [e]);
  const M = Ge(() => ({ panelWidth: T || ee || void 0 }), [T, ee]);
  Un(z, e && _, (I) => Q({ ...I, maxH: Math.min(I.maxH, 384), ready: !0 }), M), K(() => {
    if (Y.ready && e) {
      const I = H.current;
      I && I.ownerDocument.activeElement !== I && !I.contains(I.ownerDocument.activeElement) && I.focus();
    }
  }, [Y.ready, e]), pe(() => {
    var Z;
    if (!e || L.highlightedIndex < 0) return;
    const I = (Z = H.current) == null ? void 0 : Z.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    I == null || I.scrollIntoView({ block: "nearest" });
  }, [e, L.highlightedIndex]);
  const k = V((I) => {
    !I && !U.current || (!I && ce.current && (ge.current = !0), n ? n(I) : I || t == null || t());
  }, [n, t]), X = x(A);
  X.current = A;
  const ce = x(!1), ge = x(!1), ve = V(() => {
    if (!U.current && X.current) {
      if (ge.current) {
        ge.current = !1, ce.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), le = Ee.isValidElement(r) ? r : null, de = le ? Ee.cloneElement(le, {
    ref: (I) => {
      z.current = I;
    },
    onPointerDown: () => {
      ce.current = !0, ge.current = !1;
    },
    onClick: (I) => {
      var Z, re;
      (re = (Z = le.props).onClick) == null || re.call(Z, I), ve();
    }
  }) : r;
  return /* @__PURE__ */ N(j.Root, { open: e || A, onOpenChange: k, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: de }),
    /* @__PURE__ */ i(j.Portal, { container: g ?? void 0, children: /* @__PURE__ */ i(Et.Provider, { value: l, children: /* @__PURE__ */ i(Ct.Provider, { value: { chain: h, setChain: d, morph: c, keyboardOpened: v, setKeyboardOpened: p }, children: /* @__PURE__ */ i(Ke.Provider, { value: L, children: /* @__PURE__ */ i(
      j.Content,
      {
        ref: O,
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
function $i({
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
  const b = zt(), [y, C] = B(null), [S, O] = B(""), Y = x(null), Q = x(null);
  K(() => {
    e && requestAnimationFrame(() => {
      var T, F;
      (F = (T = Q.current) == null ? void 0 : T.querySelector('[data-active="1"]')) == null || F.scrollIntoView({ block: "nearest" });
    });
  }, [e]), K(() => {
    var M;
    if (!e) return;
    const T = (k) => {
      var de, fe, I, Z, re;
      if ((fe = (de = k.target) == null ? void 0 : de.closest) != null && fe.call(de, "input, textarea, [contenteditable]")) return;
      const X = (I = Q.current) == null ? void 0 : I.closest(".ui-menu");
      if (!X || !X.contains(k.target)) return;
      const ce = X.ownerDocument, ge = [...X.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], ve = [...X.querySelectorAll('div:last-child > [role="menuitem"]')], le = [...ge, ...ve];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const oe = ce.activeElement;
        let he = oe ? le.indexOf(oe) : -1;
        if (he < 0 && oe) {
          const we = oe.closest("[data-active]"), Ce = we == null ? void 0 : we.querySelector('[role="menuitem"]:first-child');
          Ce && (he = ge.indexOf(Ce));
        }
        const be = k.key === "ArrowDown" ? 1 : -1, ze = he < 0 ? be === 1 ? 0 : le.length - 1 : (he + be + le.length) % le.length;
        (Z = le[ze]) == null || Z.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const oe = ce.activeElement, he = oe == null ? void 0 : oe.closest("[data-active]");
        if (!he) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const be = [...he.querySelectorAll('[role="menuitem"]')].slice(1);
        if (be.length === 0) return;
        const ze = oe && he.contains(oe) ? be.indexOf(oe) : -1, we = k.key === "ArrowRight" ? 1 : -1, Ce = ze < 0 ? 0 : (ze + we + be.length) % be.length;
        (re = be[Ce]) == null || re.focus({ preventScroll: !0 });
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
      T && !S && O(T.name);
    }
  }, [y]), K(() => {
    if (y) {
      const T = n.find((F) => F.id === y);
      T && !S && O(T.name);
    }
  }, [y, n]);
  const ee = (T, F) => {
    C(T), O(F);
  }, E = () => {
    y && S.trim() && o(y, S.trim()), C(null);
  }, _ = () => {
    C(null);
  }, te = U || H.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ N(tt, { open: e, onOpenChange: (T) => {
    T ? (C(null), O("")) : (y && S.trim() && o(y, S.trim()), C(null), O("")), (!T || !p) && t(T);
  }, width: "w-80", theme: g, align: w, trigger: A, morph: R, contentClassName: W, children: [
    /* @__PURE__ */ i("div", { className: `shrink-0 ${b.headerText}`, children: H }),
    /* @__PURE__ */ i("div", { ref: Q, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((T) => {
      const F = T.id === r, M = y === T.id;
      return /* @__PURE__ */ i("div", { "data-active": F ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${F || M ? b.rowActiveBg : b.rowHoverBg} ${y && !M ? "opacity-40 pointer-events-none" : ""}`, children: M ? /* @__PURE__ */ N(Ne, { children: [
        /* @__PURE__ */ i("div", { className: `flex-1 min-w-0 ${b.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ i(
          "input",
          {
            ref: Y,
            value: S,
            onChange: (k) => O(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), E()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), _());
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
            children: /* @__PURE__ */ i(Yt, { className: b.btnIcon })
          }
        ),
        /* @__PURE__ */ i(
          j.Item,
          {
            className: `shrink-0 ${b.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${b.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), _();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ i(ut, { className: b.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ N(Ne, { children: [
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
            children: /* @__PURE__ */ i(qt, { className: b.btnIcon })
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
            children: /* @__PURE__ */ i(dt, { className: b.btnIcon })
          }
        )
      ] }) }, T.id);
    }) }),
    /* @__PURE__ */ N("div", { className: `shrink-0 ${y ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ N(Ne, { children: [
        /* @__PURE__ */ i(j.Separator, { className: b.separator }),
        /* @__PURE__ */ N(
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
              /* @__PURE__ */ i(Ut, { className: `${b.btnIcon} ${b.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (c || f || s || d) && /* @__PURE__ */ i(j.Separator, { className: b.separator }),
      c && /* @__PURE__ */ N(
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
      f && /* @__PURE__ */ N(
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
            /* @__PURE__ */ N("svg", { className: `${b.btnIcon} ${b.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${b.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${b.itemDefault} ui-row`,
          onSelect: (T) => {
            T.preventDefault(), s();
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
            /* @__PURE__ */ i(dt, { className: `${b.btnIcon} ${b.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Xn = $ ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
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
  const s = zt(), h = x(!1), d = x(null), { myIndex: v, highlighted: p, setPointer: g } = nn({
    label: () => tn(o),
    activate: () => {
      n || e();
    },
    disabled: n
  }), w = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ N(
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
const Zn = $ ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Jn({ id: e, label: t, icon: n, width: r, side: a = "right", children: o, contentClassName: l }) {
  const { chain: u, setChain: c, morph: f, keyboardOpened: s, setKeyboardOpened: h } = He(Ct), d = u.includes(e), v = u[u.length - 1] === e, p = en(), g = Be(), w = x(null), z = x(null), [H, U] = B(d), A = !d && H;
  K(() => {
    d && U(!0);
  }, [d]);
  const q = () => c((M) => {
    const k = M.indexOf(e);
    return k >= 0 ? M.slice(0, k) : M;
  }), L = et(), R = Tt(), W = x(R);
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
  }, []), O = $t({
    visible: d,
    morph: f,
    anchor: S,
    onClosed: () => U(!1)
  }), Y = x(() => {
  }), Q = x(() => {
  }), ee = x(() => {
  });
  Rt(d && v, L, Y, {
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
  }, [d]), Lt(d, Q), St(d, L, Y, z, !v, ee), Ee.useLayoutEffect(() => {
    var k;
    if (!d || L.highlightedIndex < 0) return;
    const M = (k = z.current) == null ? void 0 : k.querySelector(`[data-ei="${L.highlightedIndex}"]`);
    M == null || M.scrollIntoView({ block: "nearest" });
  }, [d, L.highlightedIndex]);
  const _ = x(null), te = V((M) => {
    var k;
    if (M) {
      M.addEventListener("keydown", Y.current, { capture: !0 }), M.addEventListener("wheel", Q.current, { passive: !1 });
      const X = M.ownerDocument;
      _.current = X, X.addEventListener("keydown", ee.current, { capture: !0 });
    } else
      (k = _.current) == null || k.removeEventListener("keydown", ee.current, { capture: !0 }), _.current = null;
    z.current = M, O(M);
  }, [O]), T = `w-full text-left ${Zn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${C ? " ui-item-highlighted" : ""}${A ? " ui-sub-closing" : ""}`, F = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${l || ""}`;
  return /* @__PURE__ */ N(j.Sub, { open: d || H, onOpenChange: (M) => c((k) => {
    if (!M) {
      const X = k.indexOf(e);
      return X >= 0 ? k.slice(0, X) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ N(
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
          a === "left" && /* @__PURE__ */ i(Ze, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ N("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ i("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          a === "right" && /* @__PURE__ */ i(Ze, { className: "w-3 h-3 ui-icon" })
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
const Ae = 8, Qn = $ ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", er = $ ? "text-sm" : "text-xs", Ei = ({ open: e, x: t, y: n, onClose: r, children: a, containerRef: o, morph: l = !0 }) => {
  const u = x(null), c = Le(), [f, s] = B(!1), [h, d] = B([]), [v, p] = B(null), g = et();
  K(() => {
    if (e)
      return g.setHighlighted(-1, "keyboard"), Qt(r);
  }, [e, r]);
  const w = x({ left: t, top: n });
  e && (w.current = { left: t, top: n });
  const z = V(() => ({ left: w.current.left, top: w.current.top, width: 0, height: 0 }), []), H = $t({
    visible: !0,
    morph: l,
    anchor: z,
    cloneOnUnmount: !0
  }), U = x(() => {
  }), A = x(() => {
  }), q = x(() => {
  });
  Rt(e, g, U), Lt(e, A), St(e, g, U, u, h.length > 0, q);
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
  return pe(() => {
    var T;
    if (!e || !f || !u.current) return;
    const y = u.current, C = y.offsetWidth, S = y.offsetHeight, O = (T = o == null ? void 0 : o.current) == null ? void 0 : T.getBoundingClientRect(), Y = O ? O.right : (c == null ? void 0 : c.innerWidth) ?? 0, Q = O ? O.bottom : (c == null ? void 0 : c.innerHeight) ?? 0, ee = O ? O.left : 0, E = O ? O.top : 0;
    let _ = Math.max(E + Ae, w.current.top), te = Math.max(ee + Ae, w.current.left);
    te + C > Y && (te = Y - C - Ae), _ + S > Q && (_ = Math.max(E + Ae, Q - S - Ae)), b({ left: te, top: _ });
  }, [e, f, t, n, o]), e ? /* @__PURE__ */ N(j.Root, { open: e, onOpenChange: (y) => {
    y || r();
  }, modal: !1, children: [
    /* @__PURE__ */ i(j.Trigger, { asChild: !0, children: /* @__PURE__ */ i("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ i(j.Portal, { children: /* @__PURE__ */ i(Et.Provider, { value: "light", children: /* @__PURE__ */ i(Ct.Provider, { value: { chain: h, setChain: d, morph: l, keyboardOpened: v, setKeyboardOpened: p }, children: /* @__PURE__ */ i(Ke.Provider, { value: g, children: /* @__PURE__ */ i(
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
}, zi = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: a = !1, trailing: o, children: l }) => {
  const u = Tt(), c = x(u);
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
  return /* @__PURE__ */ N(
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
}, Ci = () => /* @__PURE__ */ i(j.Separator, { className: "ui-sep my-1" }), Ti = (e) => /* @__PURE__ */ i(Jn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), ne = 16, rn = "[data-modal-stack]", ye = 220, Oe = "cubic-bezier(0.32, 0.72, 0, 1)", Ve = 0.94;
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
function Ot(e, t, n, r) {
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
function _t(e, t, n) {
  const r = ++e.current, a = t.getBoundingClientRect(), o = 1 - Ve, l = { left: a.left + a.width * o / 2, top: a.top + a.height * o / 2, width: a.width * Ve, height: a.height * Ve };
  t.style.transition = `transform ${ye}ms ${Oe}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = on(a, l), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ye + 60);
}
function ot(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(rn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function st(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(rn) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const nr = $ ? "px-6" : "px-5", rr = $ ? "py-3" : "py-2.5", ir = $ ? "text-sm" : "text-xs", or = $ ? "w-4 h-4" : "w-3.5 h-3.5", sr = $ ? "text-base" : "text-sm", cr = $ ? "w-5 h-5" : "w-4 h-4", ct = $ ? "px-6" : "px-5", lr = $ ? "pt-6" : "pt-5", ar = $ ? "pb-6" : "pb-5", ur = $ ? "text-xs" : "text-[10px]", dr = $ ? "w-3.5 h-3.5" : "w-3 h-3", fr = $ ? "px-2.5 py-1.5" : "px-2 py-1", hr = $ ? "px-6" : "px-5", mr = $ ? "py-3" : "py-2";
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
  const [q, L] = B(null), R = x(null), W = x(!1), b = x(!1), y = x(0), C = x({ w: 0, h: 0 }), S = x(!1), [O, Y] = B(!1), [Q, ee] = B(!1), E = x(0), _ = x(!1), [te, T] = B(!1), F = x(c);
  F.current = c;
  const M = x(!1), k = x(!1), X = () => {
    k.current = !0, Y(!0);
  }, ce = () => {
    k.current = !1, Y(!1);
  };
  K(() => {
    e || (L(null), S.current = !1, W.current = !1, ee(!1));
  }, [e]), pe(() => {
    if (!e || S.current || !g || !d.current || $) return;
    S.current = !0;
    const m = d.current.getBoundingClientRect(), D = A.current ?? null, P = (D == null ? void 0 : D.innerWidth) ?? 0, J = Pe(D);
    L({
      left: Math.max(ne, Math.min((P - m.width) / 2, P - m.width - ne)),
      top: Math.max(J.top + ne, Math.min(J.top + (J.height - m.height) / 2, J.bottom - m.height - ne))
    });
  }, [e, g]), pe(() => {
    if (!e || !g || !c || Me() || !d.current) return;
    const m = d.current, D = ot(m), P = D[D.length - 1];
    X(), P ? Ot(E, m, P.getBoundingClientRect(), ce) : tr(E, m, ce);
  }, [e, g]);
  const ge = V(() => {
    if (!s || _.current) return;
    const m = d.current, D = !!m && ot(m).length > 0;
    if (!m || !c || Me() || D) {
      t();
      return;
    }
    _.current = !0, T(!0), M.current = !0, X(), _t(E, m, () => {
      _.current = !1, T(!1), ce(), t();
    });
  }, [c, t, s]), ve = V(() => {
    const m = d.current;
    if (!m || M.current || !F.current || Me() || ot(m).length > 0) return;
    const D = m.ownerDocument, P = m.cloneNode(!0);
    P.removeAttribute("data-modal-stack"), P.removeAttribute("data-state"), P.removeAttribute("role"), P.removeAttribute("data-aria-hidden"), P.removeAttribute("tabindex"), P.setAttribute("aria-hidden", "true"), P.style.pointerEvents = "none", D.body.appendChild(P), _t({ current: 0 }, P, () => {
      P.isConnected && P.remove();
    });
  }, []);
  pe(() => () => ve(), [ve]);
  const le = x(e);
  pe(() => {
    const m = le.current;
    le.current = e, m && !e && ve();
  }, [e, g, ve]), K(() => {
    if (!e || !g || !c || !d.current) return;
    const m = d.current, D = m.parentNode;
    if (!D) return;
    let P = 0, J = null, G = !1;
    const ie = () => {
      P = 0;
      const me = st(m);
      if (me.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", J = me[me.length - 1].getBoundingClientRect(), G = !0, P = requestAnimationFrame(ie);
      else if (G) {
        G = !1, J && !Me() && (X(), Ot(E, m, J, ce)), J = null;
        const ae = A.current ?? null;
        ae == null || ae.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, se = new MutationObserver(() => {
      !P && st(m).length > 0 && (P = requestAnimationFrame(ie));
    });
    return se.observe(D, { childList: !0 }), () => {
      se.disconnect(), P && cancelAnimationFrame(P);
    };
  }, [e, g]), K(() => {
    if ($ || !g || !c || Me() || !d.current) return;
    const m = d.current;
    let D = Math.round(m.getBoundingClientRect().height), P = !1;
    const J = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const G = Math.round(m.getBoundingClientRect().height);
      if (!P) {
        P = !0, D = G;
        return;
      }
      if (Math.abs(G - D) < 1) return;
      if (R.current || _.current || st(m).length > 0) {
        D = G;
        return;
      }
      if (k.current) return;
      const ie = D;
      D = G, X();
      const se = m.getBoundingClientRect(), me = Pe(A.current ?? null), ae = !W.current && !b.current, nt = ae ? me.top + (me.height - ie) / 2 : se.top, De = ae ? me.top + (me.height - G) / 2 : se.top;
      m.style.transition = "none", m.style.height = `${ie}px`, ae && (m.style.top = `${nt}px`), v.current && (v.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${ie}px` && (m.style.transition = `height ${ye}ms ${Oe}${ae ? `, top ${ye}ms ${Oe}` : ""}`, m.style.height = `${G}px`, ae && (m.style.top = `${De}px`), window.setTimeout(() => {
            m.style.height === `${G}px` && (m.style.transition = "", m.style.height = "", v.current && (v.current.style.overflow = ""), ae && L({ left: se.left, top: De }), ce());
          }, ye + 60));
        });
      });
    });
    return J.observe(m), () => J.disconnect();
  }, [g]);
  const de = V(() => {
    const m = d.current;
    if (!m) return null;
    const D = m.getBoundingClientRect();
    return { left: D.left, top: D.top, width: D.width, height: D.height };
  }, []), fe = V((m, D) => {
    const P = A.current ?? null, J = (P == null ? void 0 : P.innerWidth) ?? 0, G = Pe(P), ie = de(), se = ie ? ie.width : Math.min(J - ne * 2, 576), me = ie ? ie.height : Math.min(G.height - ne * 2, 400);
    return {
      left: Math.max(ne, Math.min(m, J - se - ne)),
      top: Math.max(G.top + ne, Math.min(D, G.bottom - me - ne))
    };
  }, [de]);
  K(() => {
    if ($ || !e) return;
    const m = A.current ?? null, D = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !D) return;
    const P = 120;
    b.current = !1, C.current = { w: m.innerWidth, h: m.innerHeight };
    let J = 0;
    const G = () => {
      if (_.current || R.current) return;
      const ie = (m == null ? void 0 : m.innerHeight) ?? 0, se = (m == null ? void 0 : m.innerWidth) ?? 0, ae = Pe(m).height < ie - P, nt = ie < C.current.h - P && se === C.current.w;
      ae || nt ? (b.current = !0, y.current && (clearTimeout(y.current), y.current = 0)) : y.current || (y.current = (m == null ? void 0 : m.setTimeout(() => {
        b.current = !1, y.current = 0, ee(!1);
      }, 600)) ?? 0), ee(b.current), !J && (J = requestAnimationFrame(() => {
        var Mt;
        J = 0;
        const De = d.current;
        if (!De) return;
        const $e = Pe(A.current ?? null), xe = De.getBoundingClientRect(), Dt = ((Mt = A.current) == null ? void 0 : Mt.innerWidth) ?? 0, rt = (m == null ? void 0 : m.innerHeight) ?? 0, fn = $e.height < rt - P || rt < C.current.h - P && (m == null ? void 0 : m.innerWidth) === C.current.w;
        C.current = { w: (m == null ? void 0 : m.innerWidth) ?? 0, h: rt };
        const We = xe.top >= $e.top + ne && xe.bottom <= $e.bottom - ne, At = () => {
          L({
            left: Math.max(ne, Math.min((Dt - xe.width) / 2, Dt - xe.width - ne)),
            top: Math.max($e.top + ne, Math.min($e.top + ($e.height - xe.height) / 2, $e.bottom - xe.height - ne))
          });
        };
        if (fn) {
          if (W.current) {
            We || L(fe(xe.left, xe.top));
            return;
          }
          if (We) return;
          At();
          return;
        }
        if (!b.current) {
          if (W.current) {
            We || L(fe(xe.left, xe.top));
            return;
          }
          We || At();
        }
      }));
    };
    return D.addEventListener("resize", G), D.addEventListener("scroll", G), m.addEventListener("orientationchange", G), () => {
      D.removeEventListener("resize", G), D.removeEventListener("scroll", G), m.removeEventListener("orientationchange", G), J && cancelAnimationFrame(J), y.current && clearTimeout(y.current);
    };
  }, [e, fe]);
  const I = V((m) => {
    if (m.target.closest("button")) return;
    W.current = !0;
    const D = de();
    D && (L(fe(D.left, D.top)), R.current = { startX: m.clientX, startY: m.clientY, posX: D.left, posY: D.top }, m.target.setPointerCapture(m.pointerId));
  }, [de, fe]), Z = V((m) => {
    const D = R.current;
    D && (m.preventDefault(), L(fe(D.posX + m.clientX - D.startX, D.posY + m.clientY - D.startY)));
  }, [fe]), re = V(() => {
    R.current = null;
  }, []), oe = R.current !== null, he = q !== null, be = he ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ze = `${a ? `${a} w-full` : "max-w-xl w-full"}`, we = {
    ...he ? { left: q.left, top: q.top } : {},
    width: `min(100%, calc(100vw - ${ne * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Q ? {} : { maxHeight: `calc(100vh - ${ne * 2}px)` }
  }, Ce = V((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey) return;
    const D = m.target, P = p.current;
    if (!(!!D.closest("[data-modal-close]") || !!P && P.contains(D) && !!D.closest('button, a, [role="button"]')) && D.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || !P) return;
    const G = Array.from(P.querySelectorAll("button[data-modal-confirm]")), ie = G.length > 0 ? G : Array.from(P.querySelectorAll("button")), se = ie[ie.length - 1];
    !se || se.disabled || (m.preventDefault(), se.click());
  }, []);
  return /* @__PURE__ */ i(ke.Root, { open: e, onOpenChange: (m) => {
    m || ge();
  }, children: /* @__PURE__ */ N(ke.Portal, { container: H ?? void 0, children: [
    /* @__PURE__ */ i(
      ke.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${te ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), h && ge());
        }
      }
    ),
    /* @__PURE__ */ N(
      ke.Content,
      {
        ref: z,
        onKeyDown: Ce,
        onInteractOutside: (m) => {
          h || m.preventDefault();
        },
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${be} ${ze}`,
        style: { touchAction: "manipulation", ...Object.keys(we).length > 0 ? we : {} },
        children: [
          f ? /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${ct} ${lr} pb-4 ${oe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                O || I(m);
              },
              onPointerMove: Z,
              onPointerUp: re,
              children: [
                /* @__PURE__ */ i(ke.Title, { className: `${sr} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ i(ke.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(ut, { className: cr }) })
              ]
            }
          ) : /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${nr} ${rr} border-b border-zinc-800 shrink-0 bg-zinc-950 ${oe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                O || I(m);
              },
              onPointerMove: Z,
              onPointerUp: re,
              children: [
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ i("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ i(ke.Title, { className: `${ir} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ N("button", { onClick: u, className: `flex items-center gap-1 ${ur} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${fr} shrink-0`, children: [
                    /* @__PURE__ */ i(Ut, { className: dr }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ i(ke.Close, { "data-modal-close": !0, className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ i(ut, { className: or }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ i("div", { ref: v, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${f ? ` ${ct} pb-4` : ""}`, children: l }),
          o && /* @__PURE__ */ i("div", { ref: p, className: f ? `${ct} ${ar}` : "shrink-0", children: f ? /* @__PURE__ */ i("div", { className: "flex items-center justify-end gap-2", children: o }) : o })
        ]
      }
    )
  ] }) });
}
function Ri({ children: e }) {
  return /* @__PURE__ */ i("div", { className: `flex items-center justify-end gap-3 ${hr} ${mr} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const gr = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${$ ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, br = {
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
  const h = c !== "plain", d = $ ? "w-5 h-5" : "w-4 h-4", v = $ ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", p = $ ? "w-3.5 h-3.5" : "w-3 h-3", g = $ ? "text-sm" : "text-xs";
  return /* @__PURE__ */ N(
    "label",
    {
      className: `ui-checkbox ${h ? `ui-checkbox-pill ${$ ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${f === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${o}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: $ ? 10 : 8 },
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
        h ? /* @__PURE__ */ i("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ N("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: [
          /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ i("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ i("svg", { viewBox: "0 0 16 16", className: d, "aria-hidden": !0, children: /* @__PURE__ */ i("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ i("span", { className: `ui-checkbox-box ${v}`, "aria-hidden": !0, children: e && /* @__PURE__ */ i("svg", { viewBox: "0 0 12 12", fill: "none", className: p, "aria-hidden": !0, children: /* @__PURE__ */ i("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ i("span", { className: `ui-checkbox-label ${g} ${l}`, children: r })
      ]
    }
  );
}
function yr(e = "md") {
  return e === "sm" ? `${$ ? "px-3 py-2 text-sm" : "px-2 py-1.5 text-xs"} ui-input` : `${$ ? "px-3.5 py-2.5 text-sm" : "px-2.5 py-1.5 text-xs"} ui-input`;
}
const vr = $ ? "space-y-5" : "space-y-4", wr = $ ? "text-sm" : "text-xs", kr = yr(), sn = _e(null);
function Si() {
  const e = He(sn);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Li({ children: e }) {
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
  return /* @__PURE__ */ N(sn.Provider, { value: { confirm: c, prompt: f, alert: s }, children: [
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
        footer: t && /* @__PURE__ */ N(Ne, { children: [
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
        children: /* @__PURE__ */ N("div", { className: vr, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ i("p", { className: `${wr} text-zinc-400 leading-relaxed`, children: t.options.message }),
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
              className: `w-full ${kr}`
            }
          )
        ] })
      }
    )
  ] });
}
const Nr = 500, $r = 250, Er = 5, ue = 88, Ht = 4;
function zr(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const a = performance.now(), o = (l) => {
    const u = l - a, c = Math.min(u / t, 1);
    n.style.strokeDashoffset = String(r * (1 - c)), c < 1 && requestAnimationFrame(o);
  };
  requestAnimationFrame(o);
}
function Cr({ x: e, y: t, ms: n }) {
  const r = x(null), a = Be();
  return K(() => {
    r.current && zr(r.current, n);
  }, [n]), yt(
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
        children: /* @__PURE__ */ N("svg", { ref: r, width: ue, height: ue, viewBox: `0 0 ${ue} ${ue}`, children: [
          /* @__PURE__ */ i(
            "circle",
            {
              cx: ue / 2,
              cy: ue / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Ht + 2,
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
              strokeWidth: Ht,
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
function Di() {
  return { "data-no-longpress": "true" };
}
function Tr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Ai({
  children: e,
  showRing: t = !0,
  longPressMs: n = Nr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: a,
  onLongPress: o
}) {
  const [l, u] = B(null), c = jt(), f = x(null), s = x(null), h = x({ x: 0, y: 0, target: null }), d = x(!1), v = Math.min($r, n * 0.5), p = x(a);
  p.current = a;
  const g = x(o);
  return g.current = o, K(() => {
    if (!$ || !c) return;
    const w = (A) => {
      if (!ft(A.pointerType) || A.button !== 0) return;
      const q = A.target;
      if (!q.closest(r) || (p.current ? !p.current(q) : Tr(q))) return;
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
      Math.sqrt(q * q + L * L) > Er && (clearTimeout(f.current), f.current = null, s.current && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    }, H = () => {
      f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null);
    }, U = (A) => {
      ft(A.pointerType) && (f.current !== null && (clearTimeout(f.current), f.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), d.current = !1, u(null));
    };
    return c == null || c.addEventListener("pointerdown", w), c.addEventListener("pointermove", z), c.addEventListener("pointerup", H), c.addEventListener("pointercancel", H), c.addEventListener("pointerleave", U), () => {
      c.removeEventListener("pointerdown", w), c.removeEventListener("pointermove", z), c.removeEventListener("pointerup", H), c == null || c.removeEventListener("pointercancel", H), c == null || c.removeEventListener("pointerleave", U), f.current !== null && clearTimeout(f.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, v, r]), /* @__PURE__ */ N(Ne, { children: [
    e,
    t && l && /* @__PURE__ */ i(Cr, { x: l.x, y: l.y, ms: n - v })
  ] });
}
function Mi() {
  const e = Kn();
  return Fn ? e === null || ft(e) : !1;
}
const qe = $ ? "px-3.5 py-2 text-sm" : "px-2.5 py-1 text-xs", pt = $ ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs", Rr = `inline-flex items-center rounded font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed ${$ ? "gap-2" : "gap-1.5"}`, Sr = {
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
}, Bt = `${pt} bg-blue-950 hover:bg-blue-900 text-white`, Lr = "bg-blue-900!";
function Pi({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: a = "button",
  ...o
}) {
  const l = o["data-state"] === "open", u = Sr[t][e];
  let c = `${u.base} ${l ? u.open : ""}`;
  return e === "primary" && t === "light" && n && (c = l ? `${Bt} ${Lr}` : Bt), /* @__PURE__ */ i("button", { type: a, className: `${Rr} ${c} ${r}`, ...o });
}
const Dr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Ar = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], lt = 1900, at = 2100;
function Mr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Pr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Ii({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: a = "", initialView: o }) {
  const l = /* @__PURE__ */ new Date(), u = (() => {
    if (!o) return l;
    const E = /* @__PURE__ */ new Date(o + "T00:00:00");
    return isNaN(E.getTime()) ? l : E;
  })(), [c, f] = B(u.getFullYear()), [s, h] = B(u.getMonth()), [d, v] = B("days"), [p, g] = B(null), w = Ge(() => new Set(e), [e]), z = (E) => {
    w.has(E) ? t(e.filter((_) => _ !== E)) : t([...e, E]);
  }, H = Ge(() => {
    const E = Mr(c, s), _ = new Date(c, s, 1).getDay(), te = [];
    for (let T = 0; T < _; T++) te.push({ key: `pad-${T}`, day: 0, empty: !0 });
    for (let T = 1; T <= E; T++) te.push({ key: Pr(c, s, T), day: T, empty: !1 });
    return te;
  }, [c, s]), U = (E) => f((_) => Math.max(lt, Math.min(at, _ + E))), A = (E) => {
    s + E < 0 ? (f((_) => Math.max(lt, _ - 1)), h(11)) : s + E > 11 ? (f((_) => Math.min(at, _ + 1)), h(0)) : h((_) => _ + E);
  }, q = () => {
    if (p === null) return;
    const E = parseInt(p, 10);
    !isNaN(E) && E >= lt && E <= at && f(E), g(null);
  }, L = (E) => e.some((_) => _.startsWith(`${c}-${String(E + 1).padStart(2, "0")}`)), R = n === "dark", W = $ ? "p-2" : "p-1", b = $ ? "w-5 h-5" : "w-4 h-4", y = $ ? "text-[11px] py-2" : "text-[10px] py-1.5", C = $ ? "py-2.5 text-sm" : "py-1.5 text-xs", S = $ ? "py-3 text-sm" : "py-2 text-xs", O = $ ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", Y = $ ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${R ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, Q = R ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ee = R ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ N("div", { className: `border rounded-lg overflow-hidden w-full ${R ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${a}`, children: [
    /* @__PURE__ */ N("div", { className: `flex items-center justify-between px-3 py-2 border-b ${R ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
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
          children: /* @__PURE__ */ i(Ze, { className: b })
        }
      )
    ] }),
    d === "months" ? /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ i("div", { className: "grid grid-cols-3 text-center", children: Ar.map((E, _) => /* @__PURE__ */ N(
        "button",
        {
          type: "button",
          onClick: () => {
            h(_), v("days");
          },
          className: `${S} relative font-medium transition-colors border-b ${_ === s ? Q : ee} ${R ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            E,
            L(_) && /* @__PURE__ */ i("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${_ === s ? "bg-white" : R ? "bg-blue-500" : "bg-zinc-900"}` })
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
          className: `px-3 ${$ ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${R ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ N("div", { className: "grid grid-cols-7 text-center", children: [
      Dr.map((E) => /* @__PURE__ */ i("div", { className: `${y} font-semibold uppercase tracking-wider border-b ${R ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: E }, E)),
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
    r && e.length > 0 && /* @__PURE__ */ N("div", { className: `px-3 py-2 border-t ${R ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ N("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ i("div", { className: "flex flex-wrap gap-1", children: e.map((E) => {
        const _ = /* @__PURE__ */ new Date(E + "T00:00:00"), te = _.getFullYear() === l.getFullYear() ? _.toLocaleString("default", { month: "short", day: "numeric" }) : _.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            onClick: () => z(E),
            "aria-label": `Remove ${te}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${R ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${O}`,
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
function Oi({
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
  const d = (w) => t instanceof Set ? t.has(w) : t.includes(w), v = $ ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = $ ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", g = r != null || a != null;
  return /* @__PURE__ */ N("div", { className: h, ...s ? { "data-theme": s } : {}, children: [
    g && /* @__PURE__ */ N("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }),
      a != null && /* @__PURE__ */ i("button", { type: "button", disabled: f, onClick: a, className: "ui-checklist-toggleall", children: l ?? (o ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: c ? { maxHeight: c, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const z = d(w.id);
            return /* @__PURE__ */ N(
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
function _i({
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
  const s = l ? "px-2.5 py-1.5 text-xs" : $ ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", h = l ? "w-3.5 h-3.5" : $ ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ N("div", { className: f, ...c ? { "data-theme": c } : {}, children: [
    r != null && /* @__PURE__ */ i("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ i("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: o ? { maxHeight: o, overflowY: "auto" } : void 0,
        children: [
          e.map((d) => {
            const v = t === d.id;
            return /* @__PURE__ */ N(
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
const Hi = ({
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
  return pe(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ N(Ne, { children: [
    !n && /* @__PURE__ */ i("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    l && yt(
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
  return K(() => (a && r && (f(), r.addEventListener("scroll", f, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", f, !0)), [a]), /* @__PURE__ */ N(
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
        a && yt(
          /* @__PURE__ */ N(
            "div",
            {
              className: `fixed rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20 ${$ ? "px-3 py-1.5 bg-zinc-900 text-white text-xs" : "px-2.5 py-1.5 bg-zinc-900 text-white text-[10px]"}`,
              style: { left: l.x, top: l.y - ($ ? 24 : 20), transform: "translate(-50%, -100%)", zIndex: 99999 },
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
}, Bi = $ ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", gt = $ ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", Ue = $ ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ir = "hover:bg-red-950/50", cn = $ ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", ln = "bg-blue-900/50 border-blue-700 text-blue-300", an = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Or = $ ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Fi = $ ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Xe = $ ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", _r = "inline-flex rounded overflow-hidden border border-zinc-700", un = $ ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", je = ({ onClick: e, disabled: t, title: n, className: r = gt, children: a }) => /* @__PURE__ */ i(Ie, { content: n, children: /* @__PURE__ */ i("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: a }) }), Ki = ({ value: e, options: t, onChange: n, disabled: r, active: a }) => /* @__PURE__ */ i("div", { className: _r, children: t.map((o) => {
  const l = a ? a(o.v) : e === o.v;
  return /* @__PURE__ */ i(
    "button",
    {
      disabled: r,
      onClick: () => n(o.v),
      className: `${$ ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${l ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${o.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: o.l
    },
    o.v
  );
}) }), Wi = ({ children: e }) => /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ i("span", { className: $ ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ i("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Hr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Br = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Yi = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ N("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ i("span", { className: n ? Hr : Br, children: e }),
  t
] }), qi = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ N("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ i("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Ui = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: a }) => /* @__PURE__ */ N(Ne, { children: [
  /* @__PURE__ */ i(je, { onClick: () => r(-1), disabled: e, title: "Move up", className: Ue, children: /* @__PURE__ */ i(bn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(je, { onClick: () => r(1), disabled: e, title: "Move down", className: Ue, children: /* @__PURE__ */ i(xn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i(je, { onClick: t, disabled: e, title: "Duplicate", className: Ue, children: /* @__PURE__ */ i(qt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ i("div", { className: Xe }),
  /* @__PURE__ */ i(je, { onClick: n, disabled: e, title: "Delete", className: `${Ue} ${Ir}`, children: /* @__PURE__ */ i(dt, { className: "w-2.5 h-2.5" }) })
] }), Fr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Kr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Wr = /^(https?:\/\/|mailto:)/i;
function Yr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const a = n.slice(0, r).trim().toLowerCase(), o = n.slice(r + 1).trim();
    Kr.has(a) && o && t.push(`${a}: ${o}`);
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
  if (!Fr.has(n)) return r();
  if (n === "a") {
    const u = t.getAttribute("href") || "";
    if (!Wr.test(u)) return r();
  }
  const a = document.createElement(n), o = t.getAttribute("style"), l = Yr(o || "");
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
function qr(e) {
  const t = dn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const l of Array.from(n.content.childNodes)) r.appendChild(bt(l));
  const a = document.createElement("div");
  return a.appendChild(r), a.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function ji(e) {
  const t = dn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Vi(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Ur = { text: "#52525b" }, jr = ({ node: e, selected: t, extension: n, editor: r, view: a, getPos: o }) => {
  var h;
  const l = e.attrs.field ?? "", u = n.options, c = ((h = u.resolve) == null ? void 0 : h.call(u, l)) ?? null, f = (c == null ? void 0 : c.color) ?? Ur, s = (c == null ? void 0 : c.label) ?? `{{${l}}}`;
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
        g && Je.isSelectable(g) && a.dispatch(a.state.tr.setSelection(new Je(p))), (w = u.onTokenClick) == null || w.call(u, l, d.currentTarget.getBoundingClientRect(), v);
      },
      children: s
    }
  );
};
function Vr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Ft(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Xr = _n.extend({
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
    return Tn(jr);
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
}), Gr = 240, Zr = 280, Jr = ({ props: e, onApi: t }) => {
  const n = et(), r = x(t);
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
  const o = zt();
  return /* @__PURE__ */ i(Ke.Provider, { value: n, children: /* @__PURE__ */ i(
    "div",
    {
      className: "ui-menu rounded-lg shadow-xl p-1 flex flex-col min-w-[220px] overflow-y-auto",
      style: { width: Zr, maxHeight: Gr },
      onMouseDown: (l) => l.preventDefault(),
      children: /* @__PURE__ */ i("div", { ref: a, children: e.items.map((l) => /* @__PURE__ */ i(
        Qr,
        {
          item: l,
          d: o,
          command: () => e.command({ field: l.key })
        },
        l.key
      )) })
    }
  ) });
}, Qr = ({ item: e, d: t, command: n }) => {
  const { myIndex: r, highlighted: a, setPointer: o } = nn({
    label: () => e.label,
    activate: n
  });
  return /* @__PURE__ */ N(
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
}, ei = () => {
  let e = null;
  const t = (n) => {
    e && (e.props = n, e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(
      /* @__PURE__ */ i(Jr, { props: n, onApi: (r) => {
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
}, Xi = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, ti = Ee.forwardRef(({
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
    var O;
    const C = {
      bold: y.isActive("bold"),
      italic: y.isActive("italic"),
      underline: y.isActive("underline"),
      strike: y.isActive("strike"),
      link: y.isActive("link"),
      color: y.getAttributes("textStyle").color || ""
    }, S = A.current;
    S && S.bold === C.bold && S.italic === C.italic && S.underline === C.underline && S.strike === C.strike && S.link === C.link && S.color === C.color || (A.current = C, (O = U.current) == null || O.call(U, C));
  }, L = (y) => {
    var Q;
    const C = y.state.selection;
    let S = null;
    C instanceof Je && C.node.type.name === "token" ? (S = { key: C.node.attrs.field ?? "", pos: C.from }, g.current = C.from) : g.current != null && (g.current = y.state.tr.mapping.map(g.current));
    const O = w.current, Y = O && S && O.key === S.key && O.pos === S.pos;
    !O && !S || Y || (w.current = S, (Q = p.current) == null || Q.call(p, S));
  }, R = (y) => {
    const C = qr(Vr(y));
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
      command: ({ editor: C, range: S, props: O }) => {
        C.chain().focus().insertContentAt(S, { type: "token", attrs: { field: O.field } }).run();
      },
      render: ei
    };
    return Xr.configure({
      resolve: h.current ?? null,
      suggestion: y,
      onTokenClick: (C, S, O) => {
        var Y;
        g.current = O, (Y = v.current) == null || Y.call(v, C, S, O);
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
    content: Ft(e || ""),
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
    R(b.getHTML()) !== e && (A.current = null, b.commands.setContent(Ft(e || ""), { emitUpdate: !1 }), q(b));
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
        const O = S.doc.nodeAt(C);
        if (!O || O.type.name !== "token") return !1;
        S.setNodeMarkup(C, void 0, { field: y });
        const Y = S.doc.resolve(C);
        return Y.nodeAfter && Y.nodeAfter.type.name === "token" && S.setSelection(new Je(Y)), !0;
      });
    }
  }), [b]), /* @__PURE__ */ i(Ln, { editor: b, className: `richtext-editor ${a || ""}` });
});
ti.displayName = "RichTextEditor";
const ni = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], ri = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Kt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ i("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ i("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Gi = ({ value: e, disabled: t, onChange: n }) => {
  const [r, a] = B(!1);
  return /* @__PURE__ */ i(
    tt,
    {
      open: r,
      onOpenChange: a,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${un} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ i("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ i(xt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: ni.map((o) => /* @__PURE__ */ i(Gn, { onClick: () => {
        n(o), a(!1);
      }, icon: o === e ? /* @__PURE__ */ i(Yt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ i("span", { style: { fontFamily: o }, children: o }) }, o))
    }
  );
}, ii = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, a] = B(!1), [o, l] = B(""), u = () => {
    var f;
    const c = o.trim();
    c && ((f = e.current) == null || f.exec("link", c), a(!1));
  };
  return /* @__PURE__ */ i(
    tt,
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
      children: /* @__PURE__ */ N("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: Or + " w-full"
          }
        ),
        /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
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
}, Zi = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: a }) => {
  const [o, l] = B(!1), u = (s, h) => {
    var d;
    return (d = e.current) == null ? void 0 : d.exec(s, h);
  }, c = (s) => `${cn} ${s ? ln : an}`, f = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ N("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ i(Ie, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ i("button", { "aria-label": "Bold", disabled: t || f("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("bold"), className: `${c(((n == null ? void 0 : n.bold) ?? !1) || f("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ i(Ie, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ i("button", { "aria-label": "Italic", disabled: t || f("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => u("italic"), className: `${c(((n == null ? void 0 : n.italic) ?? !1) || f("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ i(Ie, { content: "Underline", children: /* @__PURE__ */ i("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("underline"), className: c((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ i(yn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i(Ie, { content: "Strikethrough", children: /* @__PURE__ */ i("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => u("strikeThrough"), className: c((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ i(vn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ i("div", { className: Xe }),
    /* @__PURE__ */ i(ii, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ i("div", { className: Xe }),
    /* @__PURE__ */ i(
      tt,
      {
        open: o,
        onOpenChange: l,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${un} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ i("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ i(Kt, {}),
          /* @__PURE__ */ i(xt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ i(
            "button",
            {
              onClick: () => {
                u("unsetColor"), l(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ i(Kt, { className: "w-3.5 h-3.5" })
            }
          ),
          ri.map((s) => /* @__PURE__ */ i(
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
    a && /* @__PURE__ */ N(Ne, { children: [
      /* @__PURE__ */ i("div", { className: Xe }),
      a
    ] })
  ] });
};
function Ji({ title: e, icon: t, count: n, tone: r = "default", collapsed: a, onToggle: o, trailing: l, bodyClass: u, className: c = "", dataProps: f, children: s }) {
  return /* @__PURE__ */ N("div", { ...f, className: `ui-card ${r === "danger" ? "ui-card-danger" : ""} ${c}`, children: [
    /* @__PURE__ */ N("div", { className: "flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-2 hover:bg-white/5 transition-colors", children: [
      /* @__PURE__ */ N(
        "button",
        {
          type: "button",
          onClick: o,
          className: "flex items-center gap-2 flex-1 min-w-0 text-left cursor-pointer",
          children: [
            a ? /* @__PURE__ */ i(Ze, { className: "w-3.5 h-3.5 text-zinc-400 shrink-0" }) : /* @__PURE__ */ i(xt, { className: "w-3.5 h-3.5 text-zinc-400 shrink-0" }),
            t,
            /* @__PURE__ */ i("span", { className: "text-xs font-semibold text-zinc-200 truncate", children: e }),
            n && /* @__PURE__ */ i("span", { className: "text-[10px] text-zinc-500 shrink-0", children: n })
          ]
        }
      ),
      l && /* @__PURE__ */ i("div", { className: "shrink-0", children: l })
    ] }),
    !a && s && /* @__PURE__ */ i("div", { className: u || "ui-card-band border-t p-1.5 space-y-1", children: s })
  ] });
}
export {
  Pi as Button,
  Ji as CardSection,
  xr as Checkbox,
  Oi as Checklist,
  qi as ChromeHeader,
  Yi as ContentRow,
  Ei as ContextMenu,
  Ci as ContextMenuDivider,
  zi as ContextMenuItem,
  Ti as ContextMenuSub,
  Ii as DatePicker,
  Li as DialogProvider,
  Gn as DropdownItem,
  tt as DropdownMenu,
  Jn as DropdownSubmenu,
  Et as DropdownThemeContext,
  ni as FONTS,
  Hi as FloatingChrome,
  Gi as FontMenu,
  Zi as FormatToolbar,
  $ as IS_COARSE,
  Fn as IS_TOUCH_CAPABLE,
  $i as ItemManagerDropdown,
  Ai as LongPressMenuProvider,
  wt as MORPH_EASE,
  Se as MORPH_MS,
  kt as MORPH_OPACITY_MS,
  Ke as MenuHighlightContext,
  pr as Modal,
  Ri as ModalFooter,
  Ye as ModalFooterButton,
  Bn as PopoutWindowContext,
  Xi as RICH_TEXT_STATE_IDLE,
  _i as RadioList,
  ti as RichTextEditor,
  Wi as SectionHeader,
  Ki as Seg,
  Ui as StructureControls,
  Ct as SubmenuContext,
  gt as TB_BTN,
  Ue as TB_BTN_ICON,
  Ir as TB_DANGER,
  Xe as TB_DIVIDER,
  Or as TB_INPUT,
  Fi as TB_NUM,
  un as TB_PICKER,
  Bi as TB_ROW_LABEL,
  _r as TB_SEG,
  cn as TB_TOGGLE,
  an as TB_TOGGLE_OFF,
  ln as TB_TOGGLE_ON,
  Xr as Token,
  jr as TokenChipView,
  je as ToolButton,
  Ie as Tooltip,
  Nt as ZOOM_FROM,
  qn as cloneOverlayClose,
  Vi as escapeHtml,
  zt as getDropdownClasses,
  wi as getHardwareKeyboard,
  vi as getLastPointerType,
  yr as inputCls,
  Tr as isInteractiveElement,
  ft as isTouchLike,
  Gt as nearestOverlayOrigin,
  dn as normalizeSpaces,
  it as overlayMorphEnabled,
  Yn as playOverlayClose,
  Wn as playOverlayOpen,
  Ft as preprocessTokenHtml,
  qr as sanitizeRichText,
  ji as stripRichText,
  Vr as stripTokenWrappers,
  jt as useCurrentDocument,
  Le as useCurrentWindow,
  Si as useDialog,
  en as useDropdownTheme,
  Un as useFixedPosition,
  ki as useHardwareKeyboard,
  Kn as useLastPointerType,
  Di as useLongPressOptOut,
  Tt as useMenuHighlight,
  $t as useOverlayMorph,
  vt as usePopoutWindow,
  Be as usePortalTarget,
  Ni as useSmartPosition,
  Mi as useTouchMode
};
