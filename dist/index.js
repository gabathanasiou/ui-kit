"use client";
import { jsxs as $, jsx as o, Fragment as ve } from "react/jsx-runtime";
import $e, { createContext as Oe, useContext as _e, useState as B, useEffect as U, useRef as b, useCallback as X, useLayoutEffect as fe, useMemo as je, useImperativeHandle as an } from "react";
import * as j from "@radix-ui/react-dropdown-menu";
import { Check as Ht, X as st, Pencil as un, Copy as Bt, Trash2 as ct, RotateCcw as Ft, Plus as dn, ChevronRight as lt, ChevronLeft as fn, ArrowUp as hn, ArrowDown as mn, ChevronDown as Kt, Underline as pn, Strikethrough as gn, Link as bn } from "lucide-react";
import * as xe from "@radix-ui/react-dialog";
import { createPortal as mt } from "react-dom";
import { useFloating as yn, autoUpdate as xn, offset as vn, flip as wn, shift as kn } from "@floating-ui/react-dom";
import { mergeAttributes as Nn, ReactNodeViewRenderer as $n, NodeViewWrapper as En, useEditor as zn, EditorContent as Cn } from "@tiptap/react";
import { NodeSelection as Ve } from "@tiptap/pm/state";
import Tn from "@tiptap/starter-kit";
import Rn from "@tiptap/extension-placeholder";
import { TextStyle as Ln } from "@tiptap/extension-text-style";
import Sn from "@tiptap/extension-color";
import Dn from "@tiptap/extension-link";
import Mn from "@tiptap/extension-underline";
import { Mention as An } from "@tiptap/extension-mention";
import { createRoot as Pn } from "react-dom/client";
const In = Oe(null);
function pt() {
  return _e(In);
}
function He() {
  const e = pt();
  return e ? e.document.body : null;
}
function Wt() {
  const e = pt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function Le() {
  return pt() ?? (typeof window < "u" ? window : null);
}
const Be = typeof window < "u", z = Be && window.matchMedia("(pointer: coarse)").matches, On = Be && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function at(e) {
  return e === "touch" || e === "pen";
}
let Te = null;
const ut = /* @__PURE__ */ new Set();
Be && window.addEventListener("pointerdown", (e) => {
  Te = e.pointerType, ut.forEach((t) => t());
}, !0);
function po() {
  return Te;
}
function _n() {
  const [, e] = B(0), t = b(Te);
  return U(() => {
    const n = () => {
      t.current !== Te && (t.current = Te, e((r) => r + 1));
    };
    return ut.add(n), () => {
      ut.delete(n);
    };
  }, []), Te;
}
const qt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Yt() {
  return Be ? qt.some((e) => window.matchMedia(e).matches) : !1;
}
let Xe = Yt();
const dt = /* @__PURE__ */ new Set();
function Lt(e) {
  Xe !== e && (Xe = e, dt.forEach((t) => t()));
}
var _t;
if (Be) {
  const e = () => Lt(Yt());
  for (const a of qt) {
    const f = window.matchMedia(a);
    (_t = f.addEventListener) == null || _t.call(f, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (a) => {
    a.isComposing || a.keyCode !== 229 && (a.key === "Enter" || a.key === "Backspace" || a.key === "Process" || a.key === "Unidentified" || Lt(!0));
  });
  let n = null, r = null;
  const c = "__penClick", i = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (a) => {
    a.pointerType !== "pen" || a.button !== 0 || (n = { x: a.clientX, y: a.clientY });
  }, !0), window.addEventListener("pointerup", (a) => {
    if (a.pointerType !== "pen") return;
    const f = n;
    if (n = null, !f || Math.hypot(a.clientX - f.x, a.clientY - f.y) > 8) return;
    const l = a.target;
    if (!l || !l.isConnected) return;
    if (l instanceof HTMLInputElement && i.has(l.type)) {
      try {
        l.showPicker();
      } catch {
      }
      return;
    }
    const h = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    h[c] = !0, r = { x: a.clientX, y: a.clientY, time: Date.now() }, l.dispatchEvent(h);
  }, !0), window.addEventListener("click", (a) => {
    a[c] || r && Date.now() - r.time < 1e3 && Math.hypot(a.clientX - r.x, a.clientY - r.y) < 12 && (a.preventDefault(), a.stopPropagation());
  }, !0);
}
function go() {
  return Xe;
}
function bo() {
  const [, e] = B(0);
  return U(() => {
    const t = () => e((n) => n + 1);
    return dt.add(t), () => {
      dt.delete(t);
    };
  }, []), Xe;
}
const Re = 220, gt = "cubic-bezier(0.32, 0.72, 0, 1)", bt = 170, yt = 0.94;
function et(e) {
  return e === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ut(e, t) {
  const n = t.left + t.width / 2, r = t.top + t.height / 2;
  return {
    x: n < e.left ? 0 : n > e.left + e.width ? 1 : 0.5,
    y: r < e.top ? 0 : r > e.top + e.height ? 1 : 0.5
  };
}
function jt(e, t) {
  const n = (t == null ? void 0 : t()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = e.getBoundingClientRect();
  return Ut({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function Hn(e, t, n, r) {
  const c = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${yt})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === c && requestAnimationFrame(() => {
      if (e.current !== c) return;
      const a = jt(t, n);
      t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transition = `transform ${Re}ms ${gt}, opacity ${bt}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === c && (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, r == null || r());
      }, Re + 60);
    });
  });
}
function Bn(e, t, n, r) {
  const c = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, a = jt(t, n);
  t.style.transition = `transform ${Re}ms ${gt}, opacity ${bt}ms ease`, t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transform = `scale(${yt})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === c && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== c || t.isConnected || (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, t.style.pointerEvents = i.pointerEvents, t.style.visibility = i.visibility);
    }));
  }, Re + 60);
}
function Fn(e, t, n) {
  const r = e.cloneNode(!0), c = e.getBoundingClientRect(), i = c.width > 0 || c.height > 0 ? c : n ?? c;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${i.left}px`, r.style.top = `${i.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const a = (t == null ? void 0 : t()) ?? null, f = a ? Ut({ left: i.left, top: i.top, width: i.width, height: i.height }, a) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${f.x * 100}% ${f.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${Re}ms ${gt}, opacity ${bt}ms ease`, r.style.transform = `scale(${yt})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, Re + 60));
    });
  });
}
function xt(e) {
  const t = b(null), [n, r] = B(!1), c = b(null), i = b(0), a = X((g) => {
    if (e.ref && (e.ref.current = g), g) {
      i.current = 0, t.current = g;
      const R = g.getBoundingClientRect();
      (R.width > 0 || R.height > 0) && (c.current = { left: R.left, top: R.top, width: R.width, height: R.height }), r(!0);
      return;
    }
    const x = t.current, w = ++i.current;
    queueMicrotask(() => {
      w === i.current && t.current === x && (t.current = null, r(!1), !(!x || !e.cloneOnUnmount || !l.current) && x.style.visibility !== "hidden" && et(u.current) && Fn(x, s.current, c.current));
    });
  }, []), f = X(() => {
    const g = t.current;
    if (!g || getComputedStyle(g).transform !== "none") return;
    const x = g.getBoundingClientRect();
    (x.width > 0 || x.height > 0) && (c.current = { left: x.left, top: x.top, width: x.width, height: x.height });
  }, []), l = b(e.visible);
  l.current = e.visible;
  const h = b(e.visible), s = b(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const d = b(e.onClosed);
  d.current = e.onClosed;
  const u = b(e.morph !== !1);
  u.current = e.morph !== !1;
  const y = b(0);
  return fe(() => {
    if (!n || !l.current || !et(u.current)) return;
    const g = t.current;
    g && Hn(y, g, s.current);
  }, [n, e.visible]), U(() => {
    if (!n || !l.current) return;
    let g = 0;
    const x = () => {
      g = 0, f(), g = requestAnimationFrame(x);
    };
    return g = requestAnimationFrame(x), () => {
      g && cancelAnimationFrame(g);
    };
  }, [n, f]), fe(() => {
    var w;
    const g = h.current;
    if (h.current = e.visible, e.visible || !g) return;
    const x = t.current;
    if (!x || !et(u.current)) {
      (w = d.current) == null || w.call(d);
      return;
    }
    Bn(y, x, s.current, () => {
      var R;
      return (R = d.current) == null ? void 0 : R.call(d);
    });
  }, [e.visible]), U(() => {
    if (!n || !l.current) return;
    const g = (x) => {
      const w = t.current;
      w && w.contains(x.target) && x.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", g, { capture: !0 }), () => document.removeEventListener("wheel", g, { capture: !0 });
  }, [n]), U(() => {
    if (!n || !l.current) return;
    const g = (x) => {
      const w = t.current;
      w && w.contains(x.target) && x.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", g, { capture: !0 }), () => document.removeEventListener("touchmove", g, { capture: !0 });
  }, [n]), a;
}
function Vt(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function yo(e, t) {
  const n = Le(), r = b(n);
  r.current = n;
  const c = () => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const a = r.current;
    if (!a) return;
    const f = e.current.getBoundingClientRect(), l = i.getBoundingClientRect(), h = a.innerWidth, s = Vt(a), d = l.right - h;
    if (d > 0) {
      const u = Math.min(d + 8, l.left);
      i.style.left = `${l.left - f.left - u}px`;
    }
    l.left < 0 && (i.style.left = `${-f.left + 4}px`), l.bottom > s.bottom + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < s.top && (i.style.bottom = "auto", i.style.top = `${-f.top + s.top + 4}px`, i.style.maxHeight = `${s.height - 8}px`));
  };
  fe(() => {
    if (c(), !t) return;
    const i = r.current, a = (i == null ? void 0 : i.visualViewport) ?? null;
    return a == null || a.addEventListener("resize", c), a == null || a.addEventListener("scroll", c), i == null || i.addEventListener("resize", c), () => {
      a == null || a.removeEventListener("resize", c), a == null || a.removeEventListener("scroll", c), i == null || i.removeEventListener("resize", c);
    };
  }, [t, e]);
}
function Kn(e, t, n, r) {
  const c = Le(), i = b(c);
  i.current = c, fe(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let f = 0;
    const l = () => {
      f = 0;
      const y = a.getBoundingClientRect(), g = i.current;
      if (!g) return;
      const x = g.innerWidth, w = Vt(g), R = (r == null ? void 0 : r.panelWidth) ?? Math.max(y.width, 200), P = 4, D = 120;
      let I = Math.max(0, y.left);
      I + R > x && (I = Math.max(0, x - R - 8));
      const F = w.bottom - y.bottom - P - 16, S = y.top - w.top - P - 16;
      if (F >= D || F >= S) {
        const T = Math.min(y.bottom + P, w.bottom), q = Math.max(D, w.bottom - T - 16);
        n({ top: T, left: I, width: y.width, maxH: q });
      } else {
        const T = Math.max(D, Math.min(S, 360)), q = w.bottom - (y.top - P);
        n({ top: 0, left: I, width: y.width, maxH: T, bottom: Math.max(0, q) });
      }
    }, h = () => {
      f || (f = requestAnimationFrame(l));
    }, s = i.current ?? null, d = (s == null ? void 0 : s.document) ?? null;
    h(), d == null || d.addEventListener("scroll", h, { capture: !0, passive: !0 }), s == null || s.addEventListener("resize", h);
    const u = (s == null ? void 0 : s.visualViewport) ?? null;
    return u == null || u.addEventListener("resize", h), u == null || u.addEventListener("scroll", h), () => {
      f && cancelAnimationFrame(f), d == null || d.removeEventListener("scroll", h, { capture: !0 }), s == null || s.removeEventListener("resize", h), u == null || u.removeEventListener("resize", h), u == null || u.removeEventListener("scroll", h);
    };
  }, [t, e, r == null ? void 0 : r.panelWidth]);
}
let Ce = null;
function Xt(e) {
  return Ce == null || Ce(), Ce = e, () => {
    Ce === e && (Ce = null);
  };
}
const vt = Oe("dark"), Gt = () => _e(vt), Wn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", St = z ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", qn = z ? "text-xs" : "text-[10px]";
function Zt(e) {
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
    headerPad: St,
    headerText: `${St} font-semibold uppercase tracking-wider ${qn} ui-label`,
    // Item padding
    itemPad: Wn,
    // Input
    input: z ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: z ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
function Jt(e) {
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
const wt = Oe({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), Ge = Oe(null), kt = () => _e(Ge);
function Nt() {
  const e = b([]), [t, n] = B(-1), [r, c] = B(!1), [i, a] = B(0), f = X((d) => (e.current = [...e.current, d], a((u) => u + 1), () => {
    e.current = e.current.filter((u) => u !== d), a((u) => u + 1);
  }), []), l = X((d, u) => {
    n(d), c(u === "pointer");
  }, []), h = X(() => {
    c((d) => d && (n(-1), !1));
  }, []);
  return je(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: f,
    setHighlighted: l,
    pointerLeave: h
  }), [t, r, i, f, l, h]);
}
function $t(e, t, n, r) {
  const c = b(-1);
  c.current = t.highlightedIndex;
  const i = b(t);
  i.current = t;
  const a = b(e);
  a.current = e;
  const f = b(r);
  f.current = r;
  const l = b({ text: "", time: 0 }), h = b(!1);
  h.current || (h.current = !0, n.current = (s) => {
    var u, y;
    if (!a.current) return;
    const d = i.current.items;
    if (d.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = s.key === "ArrowDown" ? 1 : -1, x = (c.current + g + d.length) % d.length;
        i.current.setHighlighted(x, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = c.current;
        g >= 0 && g < d.length && d[g].submenu && d[g].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (y = (u = f.current) == null ? void 0 : u.onCloseSub) == null || y.call(u);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = c.current;
        g >= 0 && g < d.length && d[g].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = Date.now(), x = (g - l.current.time > 500 ? "" : l.current.text) + s.key.toLowerCase();
        if (l.current = { text: x, time: g }, !x) return;
        const w = c.current + 1;
        for (let R = 0; R < d.length; R++) {
          const P = (w + R) % d.length;
          if (d[P].label.toLowerCase().startsWith(x)) {
            i.current.setHighlighted(P, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function Et(e, t, n, r, c, i) {
  const a = b(t);
  a.current = t;
  const f = b(e);
  f.current = e;
  const l = b(c);
  l.current = c;
  const h = b(!1);
  h.current || (h.current = !0, i.current = (s) => {
    if (!f.current || l.current) return;
    const d = r.current;
    d && d.contains(s.target) || a.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function zt(e, t) {
  const n = b(e);
  n.current = e;
  const r = b(!1);
  r.current || (r.current = !0, t.current = (c) => {
    if (!n.current) return;
    const i = c.currentTarget;
    i.scrollHeight > i.clientHeight && (c.preventDefault(), i.scrollTop += c.deltaY);
  });
}
function Ze({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: r,
  align: c = "left",
  width: i,
  theme: a = "dark",
  children: f,
  morph: l = !0,
  contentClassName: h,
  initialHighlightIndex: s
}) {
  const [d, u] = B([]), [y, g] = B(null), x = He(), w = Wt(), R = b(null), P = b(null), D = b(e);
  D.current = e;
  const [I, F] = B(e), S = Nt();
  U(() => {
    if (e)
      return F(!0), S.setHighlighted(s ?? -1, "keyboard"), Xt(() => {
        n == null || n(!1), t == null || t();
      });
    u([]);
  }, [e, s, n, t]), U(() => {
    if (!e || !w) return;
    const O = (Q) => {
      if (Q.pointerType !== "touch") return;
      const oe = Q.target;
      oe && (P.current && P.current.contains(oe) || R.current && R.current.contains(oe) || oe instanceof Element && oe.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return w.addEventListener("pointerdown", O, { capture: !0 }), () => w.removeEventListener("pointerdown", O, { capture: !0 });
  }, [e, w, n, t]);
  const T = X(() => {
    const O = R.current;
    if (!O) return null;
    const Q = O.getBoundingClientRect();
    return { left: Q.left, top: Q.top, width: Q.width, height: Q.height };
  }, []), q = xt({
    visible: e,
    morph: l,
    anchor: T,
    onClosed: () => F(!1)
  }), p = b(() => {
  }), v = b(() => {
  }), C = b(() => {
  });
  $t(e && d.length === 0, S, p), zt(e, v), Et(e, S, p, P, d.length > 0, C);
  const L = b(null), _ = X((O) => {
    var Q;
    if (O) {
      O.addEventListener("keydown", p.current, { capture: !0 }), O.addEventListener("wheel", v.current, { passive: !1 });
      const oe = O.ownerDocument;
      L.current = oe, oe.addEventListener("keydown", C.current, { capture: !0 }), W(O.offsetWidth), te(!0);
    } else
      (Q = L.current) == null || Q.removeEventListener("keydown", C.current, { capture: !0 }), L.current = null, te(!1);
    P.current = O, q(O);
  }, [q]), [Y, J] = B({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [ee, N] = B(0), [K, te] = B(!1), [E, W] = B(0);
  U(() => {
    e && R.current && N(R.current.getBoundingClientRect().width);
  }, [e]);
  const A = je(() => ({ panelWidth: E || ee || void 0 }), [E, ee]);
  Kn(R, e && K, (O) => J({ ...O, maxH: Math.min(O.maxH, 384), ready: !0 }), A), U(() => {
    if (Y.ready && e) {
      const O = P.current;
      O && O.ownerDocument.activeElement !== O && !O.contains(O.ownerDocument.activeElement) && O.focus();
    }
  }, [Y.ready, e]), fe(() => {
    var Q;
    if (!e || S.highlightedIndex < 0) return;
    const O = (Q = P.current) == null ? void 0 : Q.querySelector(`[data-ei="${S.highlightedIndex}"]`);
    O == null || O.scrollIntoView({ block: "nearest" });
  }, [e, S.highlightedIndex]);
  const k = X((O) => {
    !O && !D.current || (!O && be.current && (le.current = !0), n ? n(O) : O || t == null || t());
  }, [n, t]), V = b(I);
  V.current = I;
  const be = b(!1), le = b(!1), Ee = X(() => {
    if (!D.current && V.current) {
      if (le.current) {
        le.current = !1, be.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), ie = $e.isValidElement(r) ? r : null, se = ie ? $e.cloneElement(ie, {
    ref: (O) => {
      R.current = O;
    },
    onPointerDown: () => {
      be.current = !0, le.current = !1;
    },
    onClick: (O) => {
      var Q, oe;
      (oe = (Q = ie.props).onClick) == null || oe.call(Q, O), Ee();
    }
  }) : r;
  return /* @__PURE__ */ $(j.Root, { open: e || I, onOpenChange: k, modal: !1, children: [
    /* @__PURE__ */ o(j.Trigger, { asChild: !0, children: se }),
    /* @__PURE__ */ o(j.Portal, { container: x ?? void 0, children: /* @__PURE__ */ o(vt.Provider, { value: a, children: /* @__PURE__ */ o(wt.Provider, { value: { chain: d, setChain: u, morph: l, keyboardOpened: y, setKeyboardOpened: g }, children: /* @__PURE__ */ o(Ge.Provider, { value: S, children: /* @__PURE__ */ o(
      j.Content,
      {
        ref: _,
        "data-theme": a,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${i || ""} ${h || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: Y.left,
          top: Y.bottom != null ? void 0 : Y.top,
          bottom: Y.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: i ? void 0 : ee || void 0,
          maxHeight: Y.maxH,
          visibility: Y.ready ? "visible" : "hidden"
        },
        onPointerLeave: S.pointerLeave,
        children: f
      }
    ) }) }) }) })
  ] });
}
function xo({
  open: e,
  onClose: t,
  items: n,
  activeId: r,
  onSelect: c,
  onRename: i,
  onDuplicate: a,
  onDelete: f,
  onCreate: l,
  onImport: h,
  onExport: s,
  onReset: d,
  onTrash: u,
  closeOnSelect: y,
  readOnly: g = !1,
  theme: x,
  align: w,
  label: R,
  header: P,
  itemLabel: D,
  trigger: I,
  minItems: F = 1,
  itemRender: S,
  morph: T = !0,
  contentClassName: q
}) {
  const p = Zt(), [v, C] = B(null), [L, _] = B(""), Y = b(null), J = b(null);
  U(() => {
    e && requestAnimationFrame(() => {
      var E, W;
      (W = (E = J.current) == null ? void 0 : E.querySelector('[data-active="1"]')) == null || W.scrollIntoView({ block: "nearest" });
    });
  }, [e]), U(() => {
    var A;
    if (!e) return;
    const E = (k) => {
      var se, ze, O, Q, oe;
      if ((ze = (se = k.target) == null ? void 0 : se.closest) != null && ze.call(se, "input, textarea, [contenteditable]")) return;
      const V = (O = J.current) == null ? void 0 : O.closest(".ui-menu");
      if (!V || !V.contains(k.target)) return;
      const be = V.ownerDocument, le = [...V.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], Ee = [...V.querySelectorAll('div:last-child > [role="menuitem"]')], ie = [...le, ...Ee];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const ce = be.activeElement;
        let he = ce ? ie.indexOf(ce) : -1;
        if (he < 0 && ce) {
          const ke = ce.closest("[data-active]"), m = ke == null ? void 0 : ke.querySelector('[role="menuitem"]:first-child');
          m && (he = le.indexOf(m));
        }
        const me = k.key === "ArrowDown" ? 1 : -1, we = he < 0 ? me === 1 ? 0 : ie.length - 1 : (he + me + ie.length) % ie.length;
        (Q = ie[we]) == null || Q.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const ce = be.activeElement, he = ce == null ? void 0 : ce.closest("[data-active]");
        if (!he) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const me = [...he.querySelectorAll('[role="menuitem"]')].slice(1);
        if (me.length === 0) return;
        const we = ce && he.contains(ce) ? me.indexOf(ce) : -1, ke = k.key === "ArrowRight" ? 1 : -1, m = we < 0 ? 0 : (we + ke + me.length) % me.length;
        (oe = me[m]) == null || oe.focus({ preventScroll: !0 });
        return;
      }
    }, W = ((A = J.current) == null ? void 0 : A.ownerDocument) ?? null;
    return W == null || W.addEventListener("keydown", E, { capture: !0 }), () => W == null ? void 0 : W.removeEventListener("keydown", E, { capture: !0 });
  }, [e]), U(() => {
    if (v) {
      requestAnimationFrame(() => {
        var W, A;
        (W = Y.current) == null || W.focus(), (A = Y.current) == null || A.select();
      });
      const E = n.find((W) => W.id === v);
      E && !L && _(E.name);
    }
  }, [v]), U(() => {
    if (v) {
      const E = n.find((W) => W.id === v);
      E && !L && _(E.name);
    }
  }, [v, n]);
  const ee = (E, W) => {
    C(E), _(W);
  }, N = () => {
    v && L.trim() && i(v, L.trim()), C(null);
  }, K = () => {
    C(null);
  }, te = D || P.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ $(Ze, { open: e, onOpenChange: (E) => {
    E ? (C(null), _("")) : (v && L.trim() && i(v, L.trim()), C(null), _("")), (!E || !g) && t(E);
  }, width: "w-80", theme: x, align: w, trigger: I, morph: T, contentClassName: q, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${p.headerText}`, children: P }),
    /* @__PURE__ */ o("div", { ref: J, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((E) => {
      const W = E.id === r, A = v === E.id;
      return /* @__PURE__ */ o("div", { "data-active": W ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${W || A ? p.rowActiveBg : p.rowHoverBg} ${v && !A ? "opacity-40 pointer-events-none" : ""}`, children: A ? /* @__PURE__ */ $(ve, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: Y,
            value: L,
            onChange: (k) => _(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), N()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), K());
            },
            className: `w-full border rounded ${p.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${p.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), N();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Ht, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${p.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), K();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(st, { className: p.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ $(ve, { children: [
        /* @__PURE__ */ o(
          j.Item,
          {
            className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none cursor-pointer flex items-center ${p.rowText} ${W ? "" : p.rowTextHover}`,
            onSelect: y ? () => {
              c(E.id);
            } : (k) => {
              k.preventDefault(), c(E.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${W ? p.rowActiveText : ""}`, children: S ? S(E) : E.name })
          }
        ),
        /* @__PURE__ */ o(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${W ? p.btnActive : p.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), ee(E.id, E.name);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ o(un, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${W ? p.btnActive : p.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const V = a(E.id);
              V && ee(V, `${E.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ o(Bt, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          j.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= F ? p.btnDisabled : W ? p.btnDangerActive : p.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), f(E.id);
            },
            onTouchStart: () => {
            },
            disabled: g || n.length <= F,
            children: /* @__PURE__ */ o(ct, { className: p.btnIcon })
          }
        )
      ] }) }, E.id);
    }) }),
    /* @__PURE__ */ $("div", { className: `shrink-0 ${v ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ $(ve, { children: [
        /* @__PURE__ */ o(j.Separator, { className: p.separator }),
        /* @__PURE__ */ $(
          j.Item,
          {
            className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
            onSelect: (E) => {
              E.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: [
              /* @__PURE__ */ o(Ft, { className: `${p.btnIcon} ${p.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || h || s || u) && /* @__PURE__ */ o(j.Separator, { className: p.separator }),
      l && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault();
            const W = l();
            W && ee(W, "");
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ o(dn, { className: `${p.btnIcon} ${p.icon}` }),
            "New ",
            te
          ]
        }
      ),
      h && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ $("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ $("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      u && /* @__PURE__ */ $(
        j.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (E) => {
            E.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ o(ct, { className: `${p.btnIcon} ${p.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Yn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Un({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: r = "default",
  className: c = "",
  children: i,
  keepOpen: a = !1,
  selected: f = !1,
  rightAction: l,
  trailing: h
}) {
  Gt();
  const s = Zt(), d = b(!1), u = b(null), y = kt(), g = b(y);
  g.current = y;
  const x = b(null);
  U(() => {
    var I;
    const D = {
      label: Jt(i),
      activate: () => {
        n || e();
      }
    };
    return x.current = D, (I = g.current) == null ? void 0 : I.register(D);
  }, []);
  const w = y && x.current ? y.items.indexOf(x.current) : -1, R = !n && w >= 0 && w === y.highlightedIndex, P = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ $(
    j.Item,
    {
      ref: u,
      "data-ei": w >= 0 ? w : void 0,
      className: `w-full text-left ${Yn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${P} ${f ? "ui-item-selected" : ""} ${R ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${c}`,
      onSelect: (D) => {
        if (d.current) {
          d.current = !1;
          return;
        }
        a && D.preventDefault(), e();
      },
      onPointerEnter: () => {
        !n && y && w >= 0 && y.setHighlighted(w, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ o("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: i }),
        h && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: h }),
        l && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: l.title,
            onPointerDown: (D) => {
              D.stopPropagation(), D.preventDefault(), d.current = !0, l.onClick();
            },
            onClick: (D) => {
              D.stopPropagation(), D.preventDefault();
            },
            children: l.icon
          }
        )
      ]
    }
  );
}
const jn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Vn({ id: e, label: t, icon: n, width: r, side: c = "right", children: i, contentClassName: a }) {
  const { chain: f, setChain: l, morph: h, keyboardOpened: s, setKeyboardOpened: d } = _e(wt), u = f.includes(e), y = f[f.length - 1] === e, g = Gt(), x = He(), w = b(null), R = b(null), [P, D] = B(u), I = !u && P;
  U(() => {
    u && D(!0);
  }, [u]);
  const F = () => l((A) => {
    const k = A.indexOf(e);
    return k >= 0 ? A.slice(0, k) : A;
  }), S = Nt(), T = kt(), q = b(T);
  q.current = T;
  const p = b(null);
  U(() => {
    var k;
    const A = {
      label: t,
      activate: () => {
        d(e), l((V) => V.includes(e) ? V : [...V, e]);
      },
      submenu: !0
    };
    return p.current = A, (k = q.current) == null ? void 0 : k.register(A);
  }, []);
  const v = T && p.current ? T.items.indexOf(p.current) : -1, C = v >= 0 && v === T.highlightedIndex, L = X(() => {
    const A = w.current;
    if (!A) return null;
    const k = A.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), _ = xt({
    visible: u,
    morph: h,
    anchor: L,
    onClosed: () => D(!1)
  }), Y = b(() => {
  }), J = b(() => {
  }), ee = b(() => {
  });
  $t(u && y, S, Y, {
    onCloseSub: () => {
      F(), T && v >= 0 && T.setHighlighted(v, "keyboard");
    }
  });
  const N = b(s);
  N.current = s, U(() => {
    u && (N.current === e ? (S.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var A;
      return (A = R.current) == null ? void 0 : A.focus();
    }), d(null)) : S.setHighlighted(-1, "keyboard"));
  }, [u]), zt(u, J), Et(u, S, Y, R, !y, ee), $e.useLayoutEffect(() => {
    var k;
    if (!u || S.highlightedIndex < 0) return;
    const A = (k = R.current) == null ? void 0 : k.querySelector(`[data-ei="${S.highlightedIndex}"]`);
    A == null || A.scrollIntoView({ block: "nearest" });
  }, [u, S.highlightedIndex]);
  const K = b(null), te = X((A) => {
    var k;
    if (A) {
      A.addEventListener("keydown", Y.current, { capture: !0 }), A.addEventListener("wheel", J.current, { passive: !1 });
      const V = A.ownerDocument;
      K.current = V, V.addEventListener("keydown", ee.current, { capture: !0 });
    } else
      (k = K.current) == null || k.removeEventListener("keydown", ee.current, { capture: !0 }), K.current = null;
    R.current = A, _(A);
  }, [_]), E = `w-full text-left ${jn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${C ? " ui-item-highlighted" : ""}${I ? " ui-sub-closing" : ""}`, W = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ $(j.Sub, { open: u || P, onOpenChange: (A) => l((k) => {
    if (!A) {
      const V = k.indexOf(e);
      return V >= 0 ? k.slice(0, V) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ $(
      j.SubTrigger,
      {
        ref: w,
        "data-ei": v >= 0 ? v : void 0,
        className: E,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          T && v >= 0 && T.setHighlighted(v, "pointer");
        },
        onPointerDown: (A) => {
          A.pointerType === "pen" && (A.preventDefault(), l((k) => u ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          c === "left" && /* @__PURE__ */ o(lt, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ $("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          c === "right" && /* @__PURE__ */ o(lt, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(j.Portal, { container: x ?? void 0, children: /* @__PURE__ */ o(
      j.SubContent,
      {
        ref: te,
        "data-theme": g,
        className: W,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: S.pointerLeave,
        children: /* @__PURE__ */ o(Ge.Provider, { value: S, children: i })
      }
    ) })
  ] });
}
const De = 8, Xn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Gn = z ? "text-sm" : "text-xs", vo = ({ open: e, x: t, y: n, onClose: r, children: c, containerRef: i, morph: a = !0 }) => {
  const f = b(null), l = Le(), [h, s] = B(!1), [d, u] = B([]), [y, g] = B(null), x = Nt();
  U(() => {
    if (e)
      return x.setHighlighted(-1, "keyboard"), Xt(r);
  }, [e, r]);
  const w = b({ left: t, top: n });
  e && (w.current = { left: t, top: n });
  const R = X(() => ({ left: w.current.left, top: w.current.top, width: 0, height: 0 }), []), P = xt({
    visible: !0,
    morph: a,
    anchor: R,
    cloneOnUnmount: !0
  }), D = b(() => {
  }), I = b(() => {
  }), F = b(() => {
  });
  $t(e, x, D), zt(e, I), Et(e, x, D, f, d.length > 0, F);
  const S = b(null), T = X((v) => {
    var C;
    if (v) {
      v.addEventListener("keydown", D.current, { capture: !0 }), v.addEventListener("wheel", I.current, { passive: !1 });
      const L = v.ownerDocument;
      S.current = L, L.addEventListener("keydown", F.current, { capture: !0 });
    } else
      (C = S.current) == null || C.removeEventListener("keydown", F.current, { capture: !0 }), S.current = null;
    f.current = v, s(!!v), P(v);
  }, [P]), [q, p] = B(null);
  return fe(() => {
    var E;
    if (!e || !h || !f.current) return;
    const v = f.current, C = v.offsetWidth, L = v.offsetHeight, _ = (E = i == null ? void 0 : i.current) == null ? void 0 : E.getBoundingClientRect(), Y = _ ? _.right : (l == null ? void 0 : l.innerWidth) ?? 0, J = _ ? _.bottom : (l == null ? void 0 : l.innerHeight) ?? 0, ee = _ ? _.left : 0, N = _ ? _.top : 0;
    let K = Math.max(N + De, w.current.top), te = Math.max(ee + De, w.current.left);
    te + C > Y && (te = Y - C - De), K + L > J && (K = Math.max(N + De, J - L - De)), p({ left: te, top: K });
  }, [e, h, t, n, i]), e ? /* @__PURE__ */ $(j.Root, { open: e, onOpenChange: (v) => {
    v || r();
  }, modal: !1, children: [
    /* @__PURE__ */ o(j.Trigger, { asChild: !0, children: /* @__PURE__ */ o("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ o(j.Portal, { children: /* @__PURE__ */ o(vt.Provider, { value: "light", children: /* @__PURE__ */ o(wt.Provider, { value: { chain: d, setChain: u, morph: a, keyboardOpened: y, setKeyboardOpened: g }, children: /* @__PURE__ */ o(Ge.Provider, { value: x, children: /* @__PURE__ */ o(
      j.Content,
      {
        ref: T,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Gn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (q == null ? void 0 : q.left) ?? w.current.left, top: (q == null ? void 0 : q.top) ?? w.current.top, touchAction: "manipulation" },
        onPointerLeave: x.pointerLeave,
        children: c
      }
    ) }) }) }) })
  ] }) : null;
}, wo = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: c = !1, trailing: i, children: a }) => {
  const f = kt(), l = b(f);
  l.current = f;
  const h = b(null);
  U(() => {
    var y;
    const u = { label: Jt(a), activate: () => {
      r || e();
    } };
    return h.current = u, (y = l.current) == null ? void 0 : y.register(u);
  }, []);
  const s = f && h.current ? f.items.indexOf(h.current) : -1, d = !r && s >= 0 && s === f.highlightedIndex;
  return /* @__PURE__ */ $(
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
      className: `w-full text-left ${Xn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${c ? "ui-item-selected" : ""} ${d ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        i && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: i })
      ]
    }
  );
}, ko = () => /* @__PURE__ */ o(j.Separator, { className: "ui-sep my-1" }), No = (e) => /* @__PURE__ */ o(Vn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), re = 16, Qt = "[data-modal-stack]", ye = 220, Ie = "cubic-bezier(0.32, 0.72, 0, 1)", Ye = 0.94;
function Me() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Ae(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function en(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function Dt(e, t, n, r) {
  const c = ++e.current, i = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = en(i, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === c && (t.style.transition = `transform ${ye}ms ${Ie}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === c && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ye + 80));
    });
  });
}
function Zn(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${Ye})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${ye}ms ${Ie}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ye + 60));
    });
  });
}
function Mt(e, t, n) {
  const r = ++e.current, c = t.getBoundingClientRect(), i = 1 - Ye, a = { left: c.left + c.width * i / 2, top: c.top + c.height * i / 2, width: c.width * Ye, height: c.height * Ye };
  t.style.transition = `transform ${ye}ms ${Ie}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = en(c, a), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ye + 60);
}
function tt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Qt) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function nt(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(Qt) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Jn = z ? "px-6" : "px-5", Qn = z ? "py-3" : "py-2.5", er = z ? "text-sm" : "text-xs", tr = z ? "w-4 h-4" : "w-3.5 h-3.5", nr = z ? "text-base" : "text-sm", rr = z ? "w-5 h-5" : "w-4 h-4", rt = z ? "px-6" : "px-5", or = z ? "pt-6" : "pt-5", ir = z ? "pb-6" : "pb-5", sr = z ? "text-xs" : "text-[10px]", cr = z ? "w-3.5 h-3.5" : "w-3 h-3", lr = z ? "px-2.5 py-1.5" : "px-2 py-1", ar = z ? "px-6" : "px-5", ur = z ? "py-3" : "py-2";
function dr({
  open: e,
  onClose: t,
  title: n,
  icon: r,
  width: c,
  footer: i,
  children: a,
  onReset: f,
  morph: l = !0,
  flat: h = !1,
  closable: s = !0
}) {
  const d = b(null), u = b(null), y = b(null), [g, x] = B(!1), w = X((m) => {
    d.current = m, x(m !== null);
  }, []), R = He(), P = Le(), D = b(P);
  D.current = P;
  const [I, F] = B(null), S = b(null), T = b(!1), q = b(!1), p = b(0), v = b({ w: 0, h: 0 }), C = b(!1), [L, _] = B(!1), [Y, J] = B(!1), ee = b(0), N = b(!1), [K, te] = B(!1), E = b(l);
  E.current = l;
  const W = b(!1), A = b(!1), k = () => {
    A.current = !0, _(!0);
  }, V = () => {
    A.current = !1, _(!1);
  };
  U(() => {
    e || (F(null), C.current = !1, T.current = !1, J(!1));
  }, [e]), fe(() => {
    if (!e || C.current || !g || !d.current || z) return;
    C.current = !0;
    const m = d.current.getBoundingClientRect(), M = D.current ?? null, H = (M == null ? void 0 : M.innerWidth) ?? 0, Z = Ae(M);
    F({
      left: Math.max(re, Math.min((H - m.width) / 2, H - m.width - re)),
      top: Math.max(Z.top + re, Math.min(Z.top + (Z.height - m.height) / 2, Z.bottom - m.height - re))
    });
  }, [e, g]), fe(() => {
    if (!e || !g || !l || Me() || !d.current) return;
    const m = d.current, M = tt(m), H = M[M.length - 1];
    k(), H ? Dt(ee, m, H.getBoundingClientRect(), V) : Zn(ee, m, V);
  }, [e, g]);
  const be = X(() => {
    if (!s || N.current) return;
    const m = d.current, M = !!m && tt(m).length > 0;
    if (!m || !l || Me() || M) {
      t();
      return;
    }
    N.current = !0, te(!0), W.current = !0, k(), Mt(ee, m, () => {
      N.current = !1, te(!1), V(), t();
    });
  }, [l, t, s]), le = X(() => {
    const m = d.current;
    if (!m || W.current || !E.current || Me() || tt(m).length > 0) return;
    const M = m.ownerDocument, H = m.cloneNode(!0);
    H.removeAttribute("data-modal-stack"), H.removeAttribute("data-state"), H.removeAttribute("role"), H.removeAttribute("data-aria-hidden"), H.removeAttribute("tabindex"), H.setAttribute("aria-hidden", "true"), H.style.pointerEvents = "none", M.body.appendChild(H), Mt({ current: 0 }, H, () => {
      H.isConnected && H.remove();
    });
  }, []);
  fe(() => () => le(), [le]);
  const Ee = b(e);
  fe(() => {
    const m = Ee.current;
    Ee.current = e, m && !e && le();
  }, [e, g, le]), U(() => {
    if (!e || !g || !l || !d.current) return;
    const m = d.current, M = m.parentNode;
    if (!M) return;
    let H = 0, Z = null, G = !1;
    const ne = () => {
      H = 0;
      const de = nt(m);
      if (de.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", Z = de[de.length - 1].getBoundingClientRect(), G = !0, H = requestAnimationFrame(ne);
      else if (G) {
        G = !1, Z && !Me() && (k(), Dt(ee, m, Z, V)), Z = null;
        const ae = D.current ?? null;
        ae == null || ae.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, pe = new MutationObserver(() => {
      !H && nt(m).length > 0 && (H = requestAnimationFrame(ne));
    });
    return pe.observe(M, { childList: !0 }), () => {
      pe.disconnect(), H && cancelAnimationFrame(H);
    };
  }, [e, g]), U(() => {
    if (z || !g || !l || Me() || !d.current) return;
    const m = d.current;
    let M = Math.round(m.getBoundingClientRect().height), H = !1;
    const Z = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const G = Math.round(m.getBoundingClientRect().height);
      if (!H) {
        H = !0, M = G;
        return;
      }
      if (Math.abs(G - M) < 1) return;
      if (S.current || N.current || nt(m).length > 0) {
        M = G;
        return;
      }
      if (A.current) return;
      const ne = M;
      M = G, k();
      const pe = m.getBoundingClientRect(), de = Ae(D.current ?? null), ae = !T.current && !q.current, Je = ae ? de.top + (de.height - ne) / 2 : pe.top, Se = ae ? de.top + (de.height - G) / 2 : pe.top;
      m.style.transition = "none", m.style.height = `${ne}px`, ae && (m.style.top = `${Je}px`), u.current && (u.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${ne}px` && (m.style.transition = `height ${ye}ms ${Ie}${ae ? `, top ${ye}ms ${Ie}` : ""}`, m.style.height = `${G}px`, ae && (m.style.top = `${Se}px`), window.setTimeout(() => {
            m.style.height === `${G}px` && (m.style.transition = "", m.style.height = "", u.current && (u.current.style.overflow = ""), ae && F({ left: pe.left, top: Se }), V());
          }, ye + 60));
        });
      });
    });
    return Z.observe(m), () => Z.disconnect();
  }, [g]);
  const ie = X(() => {
    const m = d.current;
    if (!m) return null;
    const M = m.getBoundingClientRect();
    return { left: M.left, top: M.top, width: M.width, height: M.height };
  }, []), se = X((m, M) => {
    const H = D.current ?? null, Z = (H == null ? void 0 : H.innerWidth) ?? 0, G = Ae(H), ne = ie(), pe = ne ? ne.width : Math.min(Z - re * 2, 576), de = ne ? ne.height : Math.min(G.height - re * 2, 400);
    return {
      left: Math.max(re, Math.min(m, Z - pe - re)),
      top: Math.max(G.top + re, Math.min(M, G.bottom - de - re))
    };
  }, [ie]);
  U(() => {
    if (z || !e) return;
    const m = D.current ?? null, M = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !M) return;
    const H = 120;
    q.current = !1, v.current = { w: m.innerWidth, h: m.innerHeight };
    let Z = 0;
    const G = () => {
      if (N.current || S.current) return;
      const ne = (m == null ? void 0 : m.innerHeight) ?? 0, pe = (m == null ? void 0 : m.innerWidth) ?? 0, ae = Ae(m).height < ne - H, Je = ne < v.current.h - H && pe === v.current.w;
      ae || Je ? (q.current = !0, p.current && (clearTimeout(p.current), p.current = 0)) : p.current || (p.current = (m == null ? void 0 : m.setTimeout(() => {
        q.current = !1, p.current = 0, J(!1);
      }, 600)) ?? 0), J(q.current), !Z && (Z = requestAnimationFrame(() => {
        var Rt;
        Z = 0;
        const Se = d.current;
        if (!Se) return;
        const Ne = Ae(D.current ?? null), ge = Se.getBoundingClientRect(), Ct = ((Rt = D.current) == null ? void 0 : Rt.innerWidth) ?? 0, Qe = (m == null ? void 0 : m.innerHeight) ?? 0, ln = Ne.height < Qe - H || Qe < v.current.h - H && (m == null ? void 0 : m.innerWidth) === v.current.w;
        v.current = { w: (m == null ? void 0 : m.innerWidth) ?? 0, h: Qe };
        const Fe = ge.top >= Ne.top + re && ge.bottom <= Ne.bottom - re, Tt = () => {
          F({
            left: Math.max(re, Math.min((Ct - ge.width) / 2, Ct - ge.width - re)),
            top: Math.max(Ne.top + re, Math.min(Ne.top + (Ne.height - ge.height) / 2, Ne.bottom - ge.height - re))
          });
        };
        if (ln) {
          if (T.current) {
            Fe || F(se(ge.left, ge.top));
            return;
          }
          if (Fe) return;
          Tt();
          return;
        }
        if (!q.current) {
          if (T.current) {
            Fe || F(se(ge.left, ge.top));
            return;
          }
          Fe || Tt();
        }
      }));
    };
    return M.addEventListener("resize", G), M.addEventListener("scroll", G), m.addEventListener("orientationchange", G), () => {
      M.removeEventListener("resize", G), M.removeEventListener("scroll", G), m.removeEventListener("orientationchange", G), Z && cancelAnimationFrame(Z), p.current && clearTimeout(p.current);
    };
  }, [e, se]);
  const ze = X((m) => {
    if (m.target.closest("button")) return;
    T.current = !0;
    const M = ie();
    M && (F(se(M.left, M.top)), S.current = { startX: m.clientX, startY: m.clientY, posX: M.left, posY: M.top }, m.target.setPointerCapture(m.pointerId));
  }, [ie, se]), O = X((m) => {
    const M = S.current;
    M && (m.preventDefault(), F(se(M.posX + m.clientX - M.startX, M.posY + m.clientY - M.startY)));
  }, [se]), Q = X(() => {
    S.current = null;
  }, []), oe = S.current !== null, ce = I !== null, he = ce ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", me = `${c ? `${c} w-full` : "max-w-xl w-full"}`, we = {
    ...ce ? { left: I.left, top: I.top } : {},
    width: `min(100%, calc(100vw - ${re * 2}px))`,
    /* Keyboard up: drop the max-height clamp entirely so the modal can exit
       the visible viewport at its natural size instead of being compressed. */
    ...Y ? {} : { maxHeight: `calc(100vh - ${re * 2}px)` }
  }, ke = X((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const H = y.current;
    if (!H) return;
    const Z = Array.from(H.querySelectorAll("button[data-modal-confirm]")), G = Z.length > 0 ? Z : Array.from(H.querySelectorAll("button")), ne = G[G.length - 1];
    !ne || ne.disabled || (m.preventDefault(), ne.click());
  }, []);
  return /* @__PURE__ */ o(xe.Root, { open: e, onOpenChange: (m) => {
    m || be();
  }, children: /* @__PURE__ */ $(xe.Portal, { container: R ?? void 0, children: [
    /* @__PURE__ */ o(
      xe.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${K ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), be());
        }
      }
    ),
    /* @__PURE__ */ $(
      xe.Content,
      {
        ref: w,
        onKeyDown: ke,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${he} ${me}`,
        style: { touchAction: "manipulation", ...Object.keys(we).length > 0 ? we : {} },
        children: [
          h ? /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${rt} ${or} pb-4 ${oe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                L || ze(m);
              },
              onPointerMove: O,
              onPointerUp: Q,
              children: [
                /* @__PURE__ */ o(xe.Title, { className: `${nr} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ o(xe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(st, { className: rr }) })
              ]
            }
          ) : /* @__PURE__ */ $(
            "div",
            {
              className: `flex items-center justify-between ${Jn} ${Qn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${oe ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                L || ze(m);
              },
              onPointerMove: O,
              onPointerUp: Q,
              children: [
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(xe.Title, { className: `${er} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
                  f && /* @__PURE__ */ $("button", { onClick: f, className: `flex items-center gap-1 ${sr} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${lr} shrink-0`, children: [
                    /* @__PURE__ */ o(Ft, { className: cr }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ o(xe.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(st, { className: tr }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: u, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${h ? ` ${rt} pb-4` : ""}`, children: a }),
          i && /* @__PURE__ */ o("div", { ref: y, className: h ? `${rt} ${ir}` : "shrink-0", children: h ? /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-2", children: i }) : i })
        ]
      }
    )
  ] }) });
}
function $o({ children: e }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${ar} ${ur} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const fr = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${z ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, hr = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Ke({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: n,
      className: `${fr} ${hr[e]} ${t}`,
      ...r
    }
  );
}
function mr({ checked: e, onChange: t, disabled: n = !1, label: r, id: c, className: i = "", labelClassName: a = "", theme: f, variant: l = "pill", tone: h = "accent", block: s = !1 }) {
  const d = l !== "plain", u = z ? "w-5 h-5" : "w-4 h-4", y = z ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", g = z ? "w-3.5 h-3.5" : "w-3 h-3", x = z ? "text-sm" : "text-xs";
  return /* @__PURE__ */ $(
    "label",
    {
      className: `ui-checkbox ${d ? `ui-checkbox-pill ${z ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${h === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${i}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: z ? 10 : 8 },
      onClick: (R) => R.stopPropagation(),
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: c,
            checked: e,
            disabled: n,
            onChange: (R) => t(R.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ $("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${y}`, "aria-hidden": !0, children: e && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: g, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${x} ${a}`, children: r })
      ]
    }
  );
}
const pr = z ? "space-y-5" : "space-y-4", gr = z ? "text-sm" : "text-xs", br = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", tn = Oe(null);
function Eo() {
  const e = _e(tn);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function zo({ children: e }) {
  const [t, n] = B(null), [r, c] = B(!1), i = b(null), a = X((u) => {
    if (u.suppressKey) {
      const y = localStorage.getItem(u.suppressKey);
      if (y && Date.now() < parseInt(y, 10))
        return Promise.resolve(!0);
    }
    return new Promise((y) => {
      c(!1), n({ kind: "confirm", options: u, resolve: y });
    });
  }, []), f = X((u) => new Promise((y) => {
    n({ kind: "prompt", options: u, resolve: y });
  }), []), l = X((u) => new Promise((y) => {
    n({ kind: "alert", options: u, resolve: y });
  }), []);
  U(() => {
    if (t) {
      const u = setTimeout(() => {
        var y;
        return (y = i.current) == null ? void 0 : y.focus();
      }, 50);
      return () => clearTimeout(u);
    }
  }, [t]);
  const h = X(() => {
    var u, y;
    if (t) {
      if (t.kind === "confirm") {
        const g = t.options;
        g.suppressKey && r && localStorage.setItem(g.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((y = (u = i.current) == null ? void 0 : u.value) == null ? void 0 : y.trim()) || null) : t.resolve();
      n(null);
    }
  }, [t, r]), s = t !== null;
  U(() => {
    if (!s) return;
    const u = (y) => {
      y.key !== "Enter" || y.shiftKey || y.metaKey || y.ctrlKey || y.altKey || y.isComposing || (y.preventDefault(), y.stopImmediatePropagation(), h());
    };
    return document.addEventListener("keydown", u, !0), () => document.removeEventListener("keydown", u, !0);
  }, [s, h]);
  const d = X(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ $(tn.Provider, { value: { confirm: a, prompt: f, alert: l }, children: [
    e,
    /* @__PURE__ */ o(
      dr,
      {
        open: s,
        onClose: d,
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ $(ve, { children: [
          t.kind !== "alert" && /* @__PURE__ */ o(Ke, { variant: "ghost", onClick: d, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ o(Ke, { onClick: h, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ o(
            Ke,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: h,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ o(Ke, { "data-modal-confirm": !0, onClick: h, children: "Save" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: pr, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ o("p", { className: `${gr} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ o(
            mr,
            {
              block: !0,
              checked: r,
              onChange: c,
              tone: "danger",
              label: "Don't ask again (24 hours)"
            }
          ),
          (t == null ? void 0 : t.kind) === "prompt" && /* @__PURE__ */ o(
            "input",
            {
              ref: i,
              type: "text",
              defaultValue: t.options.defaultValue || "",
              placeholder: t.options.placeholder,
              className: `w-full ${br} ui-input`
            }
          )
        ] })
      }
    )
  ] });
}
const yr = 500, xr = 250, vr = 5, ue = 88, At = 4;
function wr(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const c = performance.now(), i = (a) => {
    const f = a - c, l = Math.min(f / t, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(i);
  };
  requestAnimationFrame(i);
}
function kr({ x: e, y: t, ms: n }) {
  const r = b(null), c = He();
  return U(() => {
    r.current && wr(r.current, n);
  }, [n]), mt(
    /* @__PURE__ */ o(
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
        children: /* @__PURE__ */ $("svg", { ref: r, width: ue, height: ue, viewBox: `0 0 ${ue} ${ue}`, children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: ue / 2,
              cy: ue / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: At + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: ue / 2,
              cy: ue / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: At,
              strokeLinecap: "round",
              style: { transform: "rotate(-90deg)", transformOrigin: "center" }
            }
          )
        ] })
      }
    ),
    c ?? document.body
  );
}
function Co() {
  return { "data-no-longpress": "true" };
}
function Nr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function To({
  children: e,
  showRing: t = !0,
  longPressMs: n = yr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: c,
  onLongPress: i
}) {
  const [a, f] = B(null), l = Wt(), h = b(null), s = b(null), d = b({ x: 0, y: 0, target: null }), u = b(!1), y = Math.min(xr, n * 0.5), g = b(c);
  g.current = c;
  const x = b(i);
  return x.current = i, U(() => {
    if (!z || !l) return;
    const w = (I) => {
      if (!at(I.pointerType) || I.button !== 0) return;
      const F = I.target;
      if (!F.closest(r) || (g.current ? !g.current(F) : Nr(F))) return;
      const S = I.clientX, T = I.clientY;
      d.current = { x: S, y: T, target: I.target }, u.current = !0, t && (s.current = setTimeout(() => f({ x: S, y: T }), y)), h.current = setTimeout(() => {
        if (!u.current) return;
        s.current && (clearTimeout(s.current), s.current = null), f(null);
        const q = d.current.target;
        if (!q) return;
        const p = x.current;
        if (p) {
          p(q, S, T);
          return;
        }
        const v = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: S,
          clientY: T,
          button: 2,
          view: window
        });
        q.dispatchEvent(v);
      }, n);
    }, R = (I) => {
      if (!u.current || h.current === null) return;
      const F = I.clientX - d.current.x, S = I.clientY - d.current.y;
      Math.sqrt(F * F + S * S) > vr && (clearTimeout(h.current), h.current = null, s.current && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    }, P = () => {
      h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null);
    }, D = (I) => {
      at(I.pointerType) && (h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    };
    return l == null || l.addEventListener("pointerdown", w), l.addEventListener("pointermove", R), l.addEventListener("pointerup", P), l.addEventListener("pointercancel", P), l.addEventListener("pointerleave", D), () => {
      l.removeEventListener("pointerdown", w), l.removeEventListener("pointermove", R), l.removeEventListener("pointerup", P), l == null || l.removeEventListener("pointercancel", P), l == null || l.removeEventListener("pointerleave", D), h.current !== null && clearTimeout(h.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, y, r]), /* @__PURE__ */ $(ve, { children: [
    e,
    t && a && /* @__PURE__ */ o(kr, { x: a.x, y: a.y, ms: n - y })
  ] });
}
function Ro() {
  const e = _n();
  return On ? e === null || at(e) : !1;
}
const $r = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", Er = {
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
}, Pt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", zr = "bg-blue-900!";
function Lo({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: c = "button",
  ...i
}) {
  const a = i["data-state"] === "open", f = Er[t][e];
  let l = `${f.base} ${a ? f.open : ""}`;
  return e === "primary" && t === "light" && n && (l = a ? `${Pt} ${zr}` : Pt), /* @__PURE__ */ o("button", { type: c, className: `${$r} ${l} ${r}`, ...i });
}
const Cr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Tr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], ot = 1900, it = 2100;
function Rr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Lr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function So({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: c = "", initialView: i }) {
  const a = /* @__PURE__ */ new Date(), f = (() => {
    if (!i) return a;
    const N = /* @__PURE__ */ new Date(i + "T00:00:00");
    return isNaN(N.getTime()) ? a : N;
  })(), [l, h] = B(f.getFullYear()), [s, d] = B(f.getMonth()), [u, y] = B("days"), [g, x] = B(null), w = je(() => new Set(e), [e]), R = (N) => {
    w.has(N) ? t(e.filter((K) => K !== N)) : t([...e, N]);
  }, P = je(() => {
    const N = Rr(l, s), K = new Date(l, s, 1).getDay(), te = [];
    for (let E = 0; E < K; E++) te.push({ key: `pad-${E}`, day: 0, empty: !0 });
    for (let E = 1; E <= N; E++) te.push({ key: Lr(l, s, E), day: E, empty: !1 });
    return te;
  }, [l, s]), D = (N) => h((K) => Math.max(ot, Math.min(it, K + N))), I = (N) => {
    s + N < 0 ? (h((K) => Math.max(ot, K - 1)), d(11)) : s + N > 11 ? (h((K) => Math.min(it, K + 1)), d(0)) : d((K) => K + N);
  }, F = () => {
    if (g === null) return;
    const N = parseInt(g, 10);
    !isNaN(N) && N >= ot && N <= it && h(N), x(null);
  }, S = (N) => e.some((K) => K.startsWith(`${l}-${String(N + 1).padStart(2, "0")}`)), T = n === "dark", q = z ? "p-2" : "p-1", p = z ? "w-5 h-5" : "w-4 h-4", v = z ? "text-[11px] py-2" : "text-[10px] py-1.5", C = z ? "py-2.5 text-sm" : "py-1.5 text-xs", L = z ? "py-3 text-sm" : "py-2 text-xs", _ = z ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", Y = z ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${T ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${T ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, J = T ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ee = T ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ $("div", { className: `border rounded-lg overflow-hidden w-full ${T ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${c}`, children: [
    /* @__PURE__ */ $("div", { className: `flex items-center justify-between px-3 py-2 border-b ${T ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? D(-1) : I(-1),
          className: `${q} rounded transition-colors ${T ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ o(fn, { className: p })
        }
      ),
      u === "days" ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => y("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${T ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(l, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ o(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: g ?? String(l),
          onChange: (N) => x(N.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: (N) => N.target.select(),
          onBlur: F,
          onKeyDown: (N) => {
            N.key === "Enter" && (N.preventDefault(), F()), N.key === "Escape" && x(null);
          },
          className: Y
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? D(1) : I(1),
          className: `${q} rounded transition-colors ${T ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ o(lt, { className: p })
        }
      )
    ] }),
    u === "months" ? /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 text-center", children: Tr.map((N, K) => /* @__PURE__ */ $(
        "button",
        {
          type: "button",
          onClick: () => {
            d(K), y("days");
          },
          className: `${L} relative font-medium transition-colors border-b ${K === s ? J : ee} ${T ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            N,
            S(K) && /* @__PURE__ */ o("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${K === s ? "bg-white" : T ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        N
      )) }),
      /* @__PURE__ */ o("div", { className: `text-center border-t ${T ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            h(a.getFullYear()), d(a.getMonth()), y("days");
          },
          className: `px-3 ${z ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${T ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ $("div", { className: "grid grid-cols-7 text-center", children: [
      Cr.map((N) => /* @__PURE__ */ o("div", { className: `${v} font-semibold uppercase tracking-wider border-b ${T ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: N }, N)),
      P.map((N) => N.empty ? /* @__PURE__ */ o("div", {}, N.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => R(N.key),
          className: `${C} font-medium transition-colors border-b ${T ? "border-zinc-800/60" : "border-zinc-50"} ${w.has(N.key) ? J : T ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: N.day
        },
        N.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ $("div", { className: `px-3 py-2 border-t ${T ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ $("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: e.map((N) => {
        const K = /* @__PURE__ */ new Date(N + "T00:00:00"), te = K.getFullYear() === a.getFullYear() ? K.toLocaleString("default", { month: "short", day: "numeric" }) : K.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ $(
          "button",
          {
            type: "button",
            onClick: () => R(N),
            "aria-label": `Remove ${te}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${T ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${_}`,
            children: [
              te,
              /* @__PURE__ */ o("span", { className: `leading-none ${T ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          N
        );
      }) })
    ] })
  ] });
}
function Do({
  items: e,
  selected: t,
  onToggle: n,
  title: r,
  onToggleAll: c,
  allSelected: i = !1,
  toggleAllLabel: a,
  emptyHint: f = "Nothing here",
  maxHeight: l,
  disabled: h = !1,
  theme: s,
  className: d = ""
}) {
  const u = (w) => t instanceof Set ? t.has(w) : t.includes(w), y = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", g = z ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", x = r != null || c != null;
  return /* @__PURE__ */ $("div", { className: d, ...s ? { "data-theme": s } : {}, children: [
    x && /* @__PURE__ */ $("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      c != null && /* @__PURE__ */ o("button", { type: "button", disabled: h, onClick: c, className: "ui-checklist-toggleall", children: a ?? (i ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${h ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          e.map((w) => {
            const R = u(w.id);
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: h,
                onClick: () => n(w.id),
                className: `ui-checklist-item ${y} ${R ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${g}`, "aria-hidden": !0, children: R && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  w.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: w.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: w.label }),
                  w.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: w.secondary })
                ]
              },
              w.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: f })
        ]
      }
    )
  ] });
}
function Mo({
  items: e,
  value: t,
  onChange: n,
  title: r,
  emptyHint: c = "Nothing here",
  maxHeight: i,
  compact: a = !1,
  disabled: f = !1,
  theme: l,
  className: h = ""
}) {
  const s = a ? "px-2.5 py-1.5 text-xs" : z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", d = a ? "w-3.5 h-3.5" : z ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ $("div", { className: h, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ $(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: i ? { maxHeight: i, overflowY: "auto" } : void 0,
        children: [
          e.map((u) => {
            const y = t === u.id;
            return /* @__PURE__ */ $(
              "button",
              {
                type: "button",
                disabled: f,
                onClick: () => n(u.id),
                className: `ui-checklist-item ${s} ${y ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${d}`, "aria-hidden": !0, children: y && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  u.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: u.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: u.label }),
                  u.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: u.secondary })
                ]
              },
              u.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: c })
        ]
      }
    )
  ] });
}
const Ao = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: c = "visible",
  offset: i = 8
}) => {
  const a = Le(), { refs: f, floatingStyles: l } = yn({
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
          if (c !== "visible") return {};
          const s = (P = h.elements.floating.ownerDocument) == null ? void 0 : P.defaultView;
          if (!s) return {};
          const d = h.rects.reference, u = Math.max(d.x, 0), y = Math.max(d.y, 0), g = Math.min(d.x + d.width, s.innerWidth), x = Math.min(d.y + d.height, s.innerHeight);
          if (g <= u || x <= y) return {};
          const w = r === "left" ? g - (d.x + d.width) : r === "right" ? u - d.x : 0, R = r === "top" ? y - d.y : r === "bottom" ? x - (d.y + d.height) : 0;
          return { x: h.x + w, y: h.y + R };
        }
      },
      vn(i),
      wn({ padding: 8 }),
      kn({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (h) => {
          var x;
          const s = (x = h.elements.floating.ownerDocument) == null ? void 0 : x.defaultView;
          if (!s) return {};
          const d = h.rects.floating.width, u = h.rects.floating.height, y = Math.max(8, Math.min(h.x, s.innerWidth - d - 8)), g = Math.max(8, Math.min(h.y, s.innerHeight - u - 8));
          return { x: y, y: g };
        }
      }
    ],
    whileElementsMounted: xn
  });
  return fe(() => {
    n && f.setReference(n);
  }, [n, f]), /* @__PURE__ */ $(ve, { children: [
    !n && /* @__PURE__ */ o("div", { ref: f.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    a && mt(
      /* @__PURE__ */ o(
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
}, Pe = ({ content: e, children: t }) => {
  const n = He(), r = Le(), [c, i] = B(!1), [a, f] = B({ x: 0, y: 0 }), l = b(null), h = () => {
    if (!l.current) return;
    const s = l.current.getBoundingClientRect();
    f({ x: s.left + s.width / 2, y: s.top });
  };
  return U(() => (c && r && (h(), r.addEventListener("scroll", h, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", h, !0)), [c]), /* @__PURE__ */ $(
    "div",
    {
      ref: l,
      className: "inline-flex",
      onMouseEnter: () => {
        h(), i(!0);
      },
      onMouseLeave: () => i(!1),
      children: [
        t,
        c && mt(
          /* @__PURE__ */ $(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: a.x, top: a.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((s, d) => /* @__PURE__ */ o("div", { className: d > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: s }, d)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, Po = z ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", ft = z ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", We = z ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Sr = "hover:bg-red-950/50", nn = z ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", rn = "bg-blue-900/50 border-blue-700 text-blue-300", on = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Dr = z ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Io = z ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Ue = z ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Mr = "inline-flex rounded overflow-hidden border border-zinc-700", sn = z ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", qe = ({ onClick: e, disabled: t, title: n, className: r = ft, children: c }) => /* @__PURE__ */ o(Pe, { content: n, children: /* @__PURE__ */ o("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: c }) }), Oo = ({ value: e, options: t, onChange: n, disabled: r, active: c }) => /* @__PURE__ */ o("div", { className: Mr, children: t.map((i) => {
  const a = c ? c(i.v) : e === i.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(i.v),
      className: `${z ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${a ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${i.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: i.l
    },
    i.v
  );
}) }), _o = ({ children: e }) => /* @__PURE__ */ $("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: z ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Ar = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Pr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Ho = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ $("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ o("span", { className: n ? Ar : Pr, children: e }),
  t
] }), Bo = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ $("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Fo = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: c }) => /* @__PURE__ */ $(ve, { children: [
  /* @__PURE__ */ o(qe, { onClick: () => r(-1), disabled: e, title: "Move up", className: We, children: /* @__PURE__ */ o(hn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(qe, { onClick: () => r(1), disabled: e, title: "Move down", className: We, children: /* @__PURE__ */ o(mn, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(qe, { onClick: t, disabled: e, title: "Duplicate", className: We, children: /* @__PURE__ */ o(Bt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o("div", { className: Ue }),
  /* @__PURE__ */ o(qe, { onClick: n, disabled: e, title: "Delete", className: `${We} ${Sr}`, children: /* @__PURE__ */ o(ct, { className: "w-2.5 h-2.5" }) })
] }), Ir = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Or = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), _r = /^(https?:\/\/|mailto:)/i;
function Hr(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const c = n.slice(0, r).trim().toLowerCase(), i = n.slice(r + 1).trim();
    Or.has(c) && i && t.push(`${c}: ${i}`);
  }
  return t.join("; ");
}
function ht(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const f = document.createDocumentFragment();
    for (const l of Array.from(t.childNodes)) f.appendChild(ht(l));
    return f;
  };
  if (!Ir.has(n)) return r();
  if (n === "a") {
    const f = t.getAttribute("href") || "";
    if (!_r.test(f)) return r();
  }
  const c = document.createElement(n), i = t.getAttribute("style"), a = Hr(i || "");
  if (a && c.setAttribute("style", a), n === "a") {
    c.setAttribute("href", t.getAttribute("href"));
    const f = t.getAttribute("target"), l = t.getAttribute("rel");
    f && c.setAttribute("target", f), l && c.setAttribute("rel", l);
  }
  for (const f of Array.from(t.childNodes)) c.appendChild(ht(f));
  return c;
}
function cn(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Br(e) {
  const t = cn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const a of Array.from(n.content.childNodes)) r.appendChild(ht(a));
  const c = document.createElement("div");
  return c.appendChild(r), c.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Ko(e) {
  const t = cn(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Wo(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Fr = { text: "#52525b" }, Kr = ({ node: e, selected: t, extension: n, editor: r, view: c, getPos: i }) => {
  var d;
  const a = e.attrs.field ?? "", f = n.options, l = ((d = f.resolve) == null ? void 0 : d.call(f, a)) ?? null, h = (l == null ? void 0 : l.color) ?? Fr, s = (l == null ? void 0 : l.label) ?? `{{${a}}}`;
  return /* @__PURE__ */ o(
    En,
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
        var w;
        if (u.button !== 0 || !r.isEditable) return;
        u.preventDefault(), r.isFocused || r.commands.focus();
        const y = typeof i == "function" ? i() : null;
        if (y == null) return;
        const g = c.state.doc.resolve(y), x = g.nodeAfter;
        x && Ve.isSelectable(x) && c.dispatch(c.state.tr.setSelection(new Ve(g))), (w = f.onTokenClick) == null || w.call(f, a, u.currentTarget.getBoundingClientRect(), y);
      },
      children: s
    }
  );
};
function Wr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function It(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const qr = An.extend({
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
    return $n(Kr);
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
    return ["span", Nn({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Yr = 240, Ur = 280, jr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = b(null);
  return U(() => {
    var i;
    const c = (i = r.current) == null ? void 0 : i.querySelector('[data-ac-active="1"]');
    c == null || c.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Ur, maxHeight: Yr, zIndex: 9999 }, onMouseDown: (c) => c.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: e.items.map((c, i) => /* @__PURE__ */ $(
    "button",
    {
      type: "button",
      "data-ac-active": i === t ? "1" : void 0,
      onMouseEnter: () => n(i),
      onClick: () => e.command({ field: c.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${i === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ o("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: c.color.text } }),
        /* @__PURE__ */ o("span", { className: "truncate flex-1", children: c.label }),
        c.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] text-zinc-600", children: c.group })
      ]
    },
    c.key
  )) }) });
}, Vr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ o(jr, { props: n, highlight: r, onHighlight: (c) => {
      e.highlight = c, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const c = Pn(r);
      e = { holder: r, root: c, unmount: null, props: n, highlight: 0 };
      const i = n.mount(r, {
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
      e.unmount = i, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var a;
      if (!(e != null && e.props)) return !1;
      const { items: r, command: c } = e.props;
      if (r.length === 0) return !1;
      const i = n.key;
      return i === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, r.length - 1), t(e.props), !0) : i === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : i === "Enter" || i === "Tab" ? (n.preventDefault(), c({ field: ((a = r[e.highlight]) == null ? void 0 : a.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, qo = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Xr = $e.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: r,
  className: c,
  onStateChange: i,
  resolveToken: a,
  suggestionItems: f,
  onTokenClick: l,
  onSelectionChange: h
}, s) => {
  const d = b(a);
  d.current = a;
  const u = b(f);
  u.current = f;
  const y = b(l);
  y.current = l;
  const g = b(h);
  g.current = h;
  const x = b(null), w = b(null), R = b(t);
  R.current = t;
  const P = b(r);
  P.current = r;
  const D = b(i);
  D.current = i;
  const I = b(null), F = (v) => {
    var _;
    const C = {
      bold: v.isActive("bold"),
      italic: v.isActive("italic"),
      underline: v.isActive("underline"),
      strike: v.isActive("strike"),
      link: v.isActive("link"),
      color: v.getAttributes("textStyle").color || ""
    }, L = I.current;
    L && L.bold === C.bold && L.italic === C.italic && L.underline === C.underline && L.strike === C.strike && L.link === C.link && L.color === C.color || (I.current = C, (_ = D.current) == null || _.call(D, C));
  }, S = (v) => {
    var J;
    const C = v.state.selection;
    let L = null;
    C instanceof Ve && C.node.type.name === "token" ? (L = { key: C.node.attrs.field ?? "", pos: C.from }, x.current = C.from) : x.current != null && (x.current = v.state.tr.mapping.map(x.current));
    const _ = w.current, Y = _ && L && _.key === L.key && _.pos === L.pos;
    !_ && !L || Y || (w.current = L, (J = g.current) == null || J.call(g, L));
  }, T = (v) => {
    const C = Br(Wr(v));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(C) ? "" : C;
  }, q = $e.useMemo(() => {
    const v = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: C }) => {
        var L;
        return ((L = u.current) == null ? void 0 : L.call(u, C)) ?? [];
      },
      command: ({ editor: C, range: L, props: _ }) => {
        C.chain().focus().insertContentAt(L, { type: "token", attrs: { field: _.field } }).run();
      },
      render: Vr
    };
    return qr.configure({
      resolve: d.current ?? null,
      suggestion: v,
      onTokenClick: (C, L, _) => {
        var Y;
        x.current = _, (Y = y.current) == null || Y.call(y, C, L, _);
      }
    });
  }, []), p = zn({
    immediatelyRender: !1,
    extensions: [
      Tn,
      Rn.configure({ placeholder: n }),
      Ln,
      Sn,
      Mn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Dn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      q
    ],
    content: It(e || ""),
    editable: !r,
    onUpdate: ({ editor: v }) => {
      R.current(T(v.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: v }) => {
      F(v), S(v);
    }
  });
  return U(() => {
    if (!p || p.isFocused) return;
    T(p.getHTML()) !== e && (I.current = null, p.commands.setContent(It(e || ""), { emitUpdate: !1 }), F(p));
  }, [e, p]), U(() => {
    p && p.setEditable(!r);
  }, [r, p]), U(() => {
    p && (I.current = null, F(p), S(p));
  }, [p]), an(s, () => ({
    exec: (v, C) => {
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
            C && p.chain().focus().setColor(C).run();
            break;
          case "unsetColor":
            p.chain().focus().unsetColor().run();
            break;
          case "link":
            C && p.chain().focus().extendMarkRange("link").setLink({ href: C }).run();
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
      const C = x.current;
      C != null && p.commands.command(({ tr: L }) => {
        const _ = L.doc.nodeAt(C);
        if (!_ || _.type.name !== "token") return !1;
        L.setNodeMarkup(C, void 0, { field: v });
        const Y = L.doc.resolve(C);
        return Y.nodeAfter && Y.nodeAfter.type.name === "token" && L.setSelection(new Ve(Y)), !0;
      });
    }
  }), [p]), /* @__PURE__ */ o(Cn, { editor: p, className: `richtext-editor ${c || ""}` });
});
Xr.displayName = "RichTextEditor";
const Gr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Zr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], Ot = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Yo = ({ value: e, disabled: t, onChange: n }) => {
  const [r, c] = B(!1);
  return /* @__PURE__ */ o(
    Ze,
    {
      open: r,
      onOpenChange: c,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${sn} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ o(Kt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Gr.map((i) => /* @__PURE__ */ o(Un, { onClick: () => {
        n(i), c(!1);
      }, icon: i === e ? /* @__PURE__ */ o(Ht, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: i }, children: i }) }, i))
    }
  );
}, Jr = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, c] = B(!1), [i, a] = B(""), f = () => {
    var h;
    const l = i.trim();
    l && ((h = e.current) == null || h.exec("link", l), c(!1));
  };
  return /* @__PURE__ */ o(
    Ze,
    {
      open: r,
      onOpenChange: c,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (l) => l.preventDefault(),
          className: `${nn} ${n ? rn : on}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(bn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ $("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ o(
          "input",
          {
            value: i,
            onChange: (l) => a(l.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (l) => {
              l.key === "Enter" && (l.preventDefault(), f());
            },
            className: Dr + " w-full"
          }
        ),
        /* @__PURE__ */ $("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: f, className: ft, disabled: !i.trim(), children: "Apply" }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                var l;
                (l = e.current) == null || l.exec("unlink"), c(!1);
              },
              className: ft,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, Uo = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: c }) => {
  const [i, a] = B(!1), f = (s, d) => {
    var u;
    return (u = e.current) == null ? void 0 : u.exec(s, d);
  }, l = (s) => `${nn} ${s ? rn : on}`, h = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ $("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o(Pe, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: t || h("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("bold"), className: `${l(((n == null ? void 0 : n.bold) ?? !1) || h("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o(Pe, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: t || h("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("italic"), className: `${l(((n == null ? void 0 : n.italic) ?? !1) || h("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o(Pe, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("underline"), className: l((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(pn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o(Pe, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("strikeThrough"), className: l((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(gn, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: Ue }),
    /* @__PURE__ */ o(Jr, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: Ue }),
    /* @__PURE__ */ o(
      Ze,
      {
        open: i,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ $("button", { type: "button", disabled: t, className: `${sn} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(Ot, {}),
          /* @__PURE__ */ o(Kt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ $("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                f("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(Ot, { className: "w-3.5 h-3.5" })
            }
          ),
          Zr.map((s) => /* @__PURE__ */ o(
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
    c && /* @__PURE__ */ $(ve, { children: [
      /* @__PURE__ */ o("div", { className: Ue }),
      c
    ] })
  ] });
};
export {
  Lo as Button,
  mr as Checkbox,
  Do as Checklist,
  Bo as ChromeHeader,
  Ho as ContentRow,
  vo as ContextMenu,
  ko as ContextMenuDivider,
  wo as ContextMenuItem,
  No as ContextMenuSub,
  So as DatePicker,
  zo as DialogProvider,
  Un as DropdownItem,
  Ze as DropdownMenu,
  Vn as DropdownSubmenu,
  vt as DropdownThemeContext,
  Gr as FONTS,
  Ao as FloatingChrome,
  Yo as FontMenu,
  Uo as FormatToolbar,
  z as IS_COARSE,
  On as IS_TOUCH_CAPABLE,
  xo as ItemManagerDropdown,
  To as LongPressMenuProvider,
  gt as MORPH_EASE,
  Re as MORPH_MS,
  bt as MORPH_OPACITY_MS,
  Ge as MenuHighlightContext,
  dr as Modal,
  $o as ModalFooter,
  Ke as ModalFooterButton,
  In as PopoutWindowContext,
  qo as RICH_TEXT_STATE_IDLE,
  Mo as RadioList,
  Xr as RichTextEditor,
  _o as SectionHeader,
  Oo as Seg,
  Fo as StructureControls,
  wt as SubmenuContext,
  ft as TB_BTN,
  We as TB_BTN_ICON,
  Sr as TB_DANGER,
  Ue as TB_DIVIDER,
  Dr as TB_INPUT,
  Io as TB_NUM,
  sn as TB_PICKER,
  Po as TB_ROW_LABEL,
  Mr as TB_SEG,
  nn as TB_TOGGLE,
  on as TB_TOGGLE_OFF,
  rn as TB_TOGGLE_ON,
  qr as Token,
  Kr as TokenChipView,
  qe as ToolButton,
  Pe as Tooltip,
  yt as ZOOM_FROM,
  Fn as cloneOverlayClose,
  Wo as escapeHtml,
  Zt as getDropdownClasses,
  go as getHardwareKeyboard,
  po as getLastPointerType,
  Nr as isInteractiveElement,
  at as isTouchLike,
  Ut as nearestOverlayOrigin,
  cn as normalizeSpaces,
  et as overlayMorphEnabled,
  Bn as playOverlayClose,
  Hn as playOverlayOpen,
  It as preprocessTokenHtml,
  Br as sanitizeRichText,
  Ko as stripRichText,
  Wr as stripTokenWrappers,
  Wt as useCurrentDocument,
  Le as useCurrentWindow,
  Eo as useDialog,
  Gt as useDropdownTheme,
  Kn as useFixedPosition,
  bo as useHardwareKeyboard,
  _n as useLastPointerType,
  Co as useLongPressOptOut,
  kt as useMenuHighlight,
  xt as useOverlayMorph,
  pt as usePopoutWindow,
  He as usePortalTarget,
  yo as useSmartPosition,
  Ro as useTouchMode
};
