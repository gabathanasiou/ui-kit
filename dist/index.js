"use client";
import { jsxs as N, jsx as o, Fragment as me } from "react/jsx-runtime";
import pe, { createContext as ze, useContext as Ce, useState as K, useEffect as U, useRef as x, useCallback as Z, useLayoutEffect as le, useMemo as Ie, useImperativeHandle as jt } from "react";
import * as X from "@radix-ui/react-dropdown-menu";
import { Check as $t, X as je, Pencil as Vt, Copy as Et, Trash2 as Ve, RotateCcw as zt, Plus as Xt, ChevronRight as Xe, ChevronLeft as Gt, ArrowUp as Zt, ArrowDown as Jt, ChevronDown as Ct, Underline as Qt, Strikethrough as en, Link as tn } from "lucide-react";
import * as he from "@radix-ui/react-dialog";
import { createPortal as tt } from "react-dom";
import { useFloating as nn, autoUpdate as rn, offset as on, flip as sn, shift as cn } from "@floating-ui/react-dom";
import { mergeAttributes as ln, ReactNodeViewRenderer as an, NodeViewWrapper as un, useEditor as dn, EditorContent as fn } from "@tiptap/react";
import { NodeSelection as Oe } from "@tiptap/pm/state";
import hn from "@tiptap/starter-kit";
import mn from "@tiptap/extension-placeholder";
import { TextStyle as pn } from "@tiptap/extension-text-style";
import gn from "@tiptap/extension-color";
import bn from "@tiptap/extension-link";
import xn from "@tiptap/extension-underline";
import { Mention as yn } from "@tiptap/extension-mention";
import { createRoot as vn } from "react-dom/client";
const wn = ze(null);
function nt() {
  return Ce(wn);
}
function Te() {
  const e = nt();
  return e ? e.document.body : null;
}
function Tt() {
  const e = nt();
  return e ? e.document : typeof document < "u" ? document : null;
}
function we() {
  return nt() ?? (typeof window < "u" ? window : null);
}
const Re = typeof window < "u", T = Re && window.matchMedia("(pointer: coarse)").matches, kn = Re && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ge(e) {
  return e === "touch" || e === "pen";
}
let ye = null;
const Ze = /* @__PURE__ */ new Set();
Re && window.addEventListener("pointerdown", (e) => {
  ye = e.pointerType, Ze.forEach((t) => t());
}, !0);
function Qr() {
  return ye;
}
function Nn() {
  const [, e] = K(0), t = x(ye);
  return U(() => {
    const n = () => {
      t.current !== ye && (t.current = ye, e((r) => r + 1));
    };
    return Ze.add(n), () => {
      Ze.delete(n);
    };
  }, []), ye;
}
const Rt = ["(any-hover: hover)", "(any-pointer: fine)"];
function Lt() {
  return Re ? Rt.some((e) => window.matchMedia(e).matches) : !1;
}
let _e = Lt();
const Je = /* @__PURE__ */ new Set();
function pt(e) {
  _e !== e && (_e = e, Je.forEach((t) => t()));
}
var Nt;
if (Re) {
  const e = () => pt(Lt());
  for (const a of Rt) {
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
function eo() {
  return _e;
}
function to() {
  const [, e] = K(0);
  return U(() => {
    const t = () => e((n) => n + 1);
    return Je.add(t), () => {
      Je.delete(t);
    };
  }, []), _e;
}
const ve = 220, rt = "cubic-bezier(0.32, 0.72, 0, 1)", ot = 170, it = 0.94;
function Fe(e) {
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
function $n(e, t, n, r) {
  const c = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity };
  t.style.transition = "none", t.style.transformOrigin = "50% 50%", t.style.transform = `scale(${it})`, t.style.opacity = "0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    e.current === c && requestAnimationFrame(() => {
      if (e.current !== c) return;
      const a = Dt(t, n);
      t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transition = `transform ${ve}ms ${rt}, opacity ${ot}ms ease`, t.style.transform = "none", t.style.opacity = "", window.setTimeout(() => {
        e.current === c && (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, r == null || r());
      }, ve + 60);
    });
  });
}
function En(e, t, n, r) {
  const c = ++e.current, i = { transition: t.style.transition, transform: t.style.transform, transformOrigin: t.style.transformOrigin, opacity: t.style.opacity, pointerEvents: t.style.pointerEvents, visibility: t.style.visibility }, a = Dt(t, n);
  t.style.transition = `transform ${ve}ms ${rt}, opacity ${ot}ms ease`, t.style.transformOrigin = `${a.x * 100}% ${a.y * 100}%`, t.style.transform = `scale(${it})`, t.style.opacity = "0", t.style.pointerEvents = "none", window.setTimeout(() => {
    e.current === c && (t.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      e.current !== c || t.isConnected || (t.style.transition = i.transition, t.style.transform = i.transform, t.style.transformOrigin = i.transformOrigin, t.style.opacity = i.opacity, t.style.pointerEvents = i.pointerEvents, t.style.visibility = i.visibility);
    }));
  }, ve + 60);
}
function zn(e, t, n) {
  const r = e.cloneNode(!0), c = e.getBoundingClientRect(), i = c.width > 0 || c.height > 0 ? c : n ?? c;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${i.left}px`, r.style.top = `${i.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const a = (t == null ? void 0 : t()) ?? null, f = a ? St({ left: i.left, top: i.top, width: i.width, height: i.height }, a) : { x: 0.5, y: 0.5 };
  r.style.transformOrigin = `${f.x * 100}% ${f.y * 100}%`, e.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${ve}ms ${rt}, opacity ${ot}ms ease`, r.style.transform = `scale(${it})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, ve + 60));
    });
  });
}
function st(e) {
  const t = x(null), [n, r] = K(!1), c = x(null), i = x(0), a = Z((g) => {
    if (e.ref && (e.ref.current = g), g) {
      i.current = 0, t.current = g;
      const S = g.getBoundingClientRect();
      (S.width > 0 || S.height > 0) && (c.current = { left: S.left, top: S.top, width: S.width, height: S.height }), r(!0);
      return;
    }
    const y = t.current, v = ++i.current;
    queueMicrotask(() => {
      v === i.current && t.current === y && (t.current = null, r(!1), !(!y || !e.cloneOnUnmount || !l.current) && y.style.visibility !== "hidden" && Fe(u.current) && zn(y, s.current, c.current));
    });
  }, []), f = Z(() => {
    const g = t.current;
    if (!g || getComputedStyle(g).transform !== "none") return;
    const y = g.getBoundingClientRect();
    (y.width > 0 || y.height > 0) && (c.current = { left: y.left, top: y.top, width: y.width, height: y.height });
  }, []), l = x(e.visible);
  l.current = e.visible;
  const h = x(e.visible), s = x(e.anchor ?? null);
  s.current = e.anchor ?? null;
  const d = x(e.onClosed);
  d.current = e.onClosed;
  const u = x(e.morph !== !1);
  u.current = e.morph !== !1;
  const b = x(0);
  return le(() => {
    if (!n || !l.current || !Fe(u.current)) return;
    const g = t.current;
    g && $n(b, g, s.current);
  }, [n, e.visible]), U(() => {
    if (!n || !l.current) return;
    let g = 0;
    const y = () => {
      g = 0, f(), g = requestAnimationFrame(y);
    };
    return g = requestAnimationFrame(y), () => {
      g && cancelAnimationFrame(g);
    };
  }, [n, f]), le(() => {
    var v;
    const g = h.current;
    if (h.current = e.visible, e.visible || !g) return;
    const y = t.current;
    if (!y || !Fe(u.current)) {
      (v = d.current) == null || v.call(d);
      return;
    }
    En(b, y, s.current, () => {
      var S;
      return (S = d.current) == null ? void 0 : S.call(d);
    });
  }, [e.visible]), U(() => {
    if (!n || !l.current) return;
    const g = (y) => {
      const v = t.current;
      v && v.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", g, { capture: !0 }), () => document.removeEventListener("wheel", g, { capture: !0 });
  }, [n]), U(() => {
    if (!n || !l.current) return;
    const g = (y) => {
      const v = t.current;
      v && v.contains(y.target) && y.stopImmediatePropagation();
    };
    return document.addEventListener("touchmove", g, { capture: !0 }), () => document.removeEventListener("touchmove", g, { capture: !0 });
  }, [n]), a;
}
function Mt(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function no(e, t) {
  const n = we(), r = x(n);
  r.current = n;
  const c = () => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const a = r.current;
    if (!a) return;
    const f = e.current.getBoundingClientRect(), l = i.getBoundingClientRect(), h = a.innerWidth, s = Mt(a), d = l.right - h;
    if (d > 0) {
      const u = Math.min(d + 8, l.left);
      i.style.left = `${l.left - f.left - u}px`;
    }
    l.left < 0 && (i.style.left = `${-f.left + 4}px`), l.bottom > s.bottom + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < s.top && (i.style.bottom = "auto", i.style.top = `${-f.top + s.top + 4}px`, i.style.maxHeight = `${s.height - 8}px`));
  };
  le(() => {
    if (c(), !t) return;
    const i = r.current, a = (i == null ? void 0 : i.visualViewport) ?? null;
    return a == null || a.addEventListener("resize", c), a == null || a.addEventListener("scroll", c), i == null || i.addEventListener("resize", c), () => {
      a == null || a.removeEventListener("resize", c), a == null || a.removeEventListener("scroll", c), i == null || i.removeEventListener("resize", c);
    };
  }, [t, e]);
}
function Cn(e, t, n, r) {
  const c = we(), i = x(c);
  i.current = c, le(() => {
    if (!t || !e.current) return;
    const a = e.current;
    let f = 0;
    const l = () => {
      f = 0;
      const b = a.getBoundingClientRect(), g = i.current;
      if (!g) return;
      const y = g.innerWidth, v = Mt(g), S = (r == null ? void 0 : r.panelWidth) ?? Math.max(b.width, 200), I = 4, A = 120;
      let O = Math.max(0, b.left);
      O + S > y && (O = Math.max(0, y - S - 8));
      const W = v.bottom - b.bottom - I - 16, M = b.top - v.top - I - 16;
      if (W >= A || W >= M) {
        const D = Math.min(b.bottom + I, v.bottom), j = Math.max(A, v.bottom - D - 16);
        n({ top: D, left: O, width: b.width, maxH: j });
      } else {
        const D = Math.max(A, Math.min(M, 360)), j = v.bottom - (b.top - I);
        n({ top: 0, left: O, width: b.width, maxH: D, bottom: Math.max(0, j) });
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
let xe = null;
function At(e) {
  return xe == null || xe(), xe = e, () => {
    xe === e && (xe = null);
  };
}
const ct = ze("dark"), Pt = () => Ce(ct), Tn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", gt = T ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Rn = T ? "text-xs" : "text-[10px]";
function It(e) {
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
    headerText: `${gt} font-semibold uppercase tracking-wider ${Rn} ui-label`,
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
function Ot(e) {
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
const lt = ze({ chain: [], setChain: () => {
}, morph: !0, keyboardOpened: null, setKeyboardOpened: () => {
} }), He = ze(null), at = () => Ce(He);
function ut() {
  const e = x([]), [t, n] = K(-1), [r, c] = K(!1), [i, a] = K(0), f = Z((d) => (e.current = [...e.current, d], a((u) => u + 1), () => {
    e.current = e.current.filter((u) => u !== d), a((u) => u + 1);
  }), []), l = Z((d, u) => {
    n(d), c(u === "pointer");
  }, []), h = Z(() => {
    c((d) => d && (n(-1), !1));
  }, []);
  return Ie(() => ({
    items: e.current,
    highlightedIndex: t,
    pointerDriven: r,
    register: f,
    setHighlighted: l,
    pointerLeave: h
  }), [t, r, i, f, l, h]);
}
function dt(e, t, n, r) {
  const c = x(-1);
  c.current = t.highlightedIndex;
  const i = x(t);
  i.current = t;
  const a = x(e);
  a.current = e;
  const f = x(r);
  f.current = r;
  const l = x({ text: "", time: 0 }), h = x(!1);
  h.current || (h.current = !0, n.current = (s) => {
    var u, b;
    if (!a.current) return;
    const d = i.current.items;
    if (d.length !== 0) {
      if (s.key === "ArrowDown" || s.key === "ArrowUp") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = s.key === "ArrowDown" ? 1 : -1, y = (c.current + g + d.length) % d.length;
        i.current.setHighlighted(y, "keyboard");
      } else if (s.key === "ArrowRight") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = c.current;
        g >= 0 && g < d.length && d[g].submenu && d[g].activate();
      } else if (s.key === "ArrowLeft")
        s.preventDefault(), s.stopImmediatePropagation(), (b = (u = f.current) == null ? void 0 : u.onCloseSub) == null || b.call(u);
      else if (s.key === "Enter" || s.key === " ") {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = c.current;
        g >= 0 && g < d.length && d[g].activate();
      } else if (s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) {
        s.preventDefault(), s.stopImmediatePropagation();
        const g = Date.now(), y = (g - l.current.time > 500 ? "" : l.current.text) + s.key.toLowerCase();
        if (l.current = { text: y, time: g }, !y) return;
        const v = c.current + 1;
        for (let S = 0; S < d.length; S++) {
          const I = (v + S) % d.length;
          if (d[I].label.toLowerCase().startsWith(y)) {
            i.current.setHighlighted(I, "keyboard");
            return;
          }
        }
      }
    }
  });
}
function ft(e, t, n, r, c, i) {
  const a = x(t);
  a.current = t;
  const f = x(e);
  f.current = e;
  const l = x(c);
  l.current = c;
  const h = x(!1);
  h.current || (h.current = !0, i.current = (s) => {
    if (!f.current || l.current) return;
    const d = r.current;
    d && d.contains(s.target) || a.current.items.length === 0 || !(s.key === "ArrowDown" || s.key === "ArrowUp" || s.key === "ArrowLeft" || s.key === "ArrowRight" || s.key === "Enter" || s.key === " " || s.key.length === 1 && !s.ctrlKey && !s.metaKey && !s.altKey) || (s.preventDefault(), s.stopImmediatePropagation(), n.current(s));
  });
}
function ht(e, t) {
  const n = x(e);
  n.current = e;
  const r = x(!1);
  r.current || (r.current = !0, t.current = (c) => {
    if (!n.current) return;
    const i = c.currentTarget;
    i.scrollHeight > i.clientHeight && (c.preventDefault(), i.scrollTop += c.deltaY);
  });
}
function Be({
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
  const [d, u] = K([]), [b, g] = K(null), y = Te(), v = Tt(), S = x(null), I = x(null), A = x(e);
  A.current = e;
  const [O, W] = K(e), M = ut();
  U(() => {
    if (e)
      return W(!0), M.setHighlighted(s ?? -1, "keyboard"), At(() => {
        n == null || n(!1), t == null || t();
      });
    u([]);
  }, [e, s, n, t]), U(() => {
    if (!e || !v) return;
    const _ = (m) => {
      if (m.pointerType !== "touch") return;
      const E = m.target;
      E && (I.current && I.current.contains(E) || S.current && S.current.contains(E) || E instanceof Element && E.closest("[data-radix-menu-content]") || (n == null || n(!1), t == null || t()));
    };
    return v.addEventListener("pointerdown", _, { capture: !0 }), () => v.removeEventListener("pointerdown", _, { capture: !0 });
  }, [e, v, n, t]);
  const D = Z(() => {
    const _ = S.current;
    if (!_) return null;
    const m = _.getBoundingClientRect();
    return { left: m.left, top: m.top, width: m.width, height: m.height };
  }, []), j = st({
    visible: e,
    morph: l,
    anchor: D,
    onClosed: () => W(!1)
  }), p = x(() => {
  }), w = x(() => {
  }), C = x(() => {
  });
  dt(e && d.length === 0, M, p), ht(e, w), ft(e, M, p, I, d.length > 0, C);
  const R = x(null), H = Z((_) => {
    var m;
    if (_) {
      _.addEventListener("keydown", p.current, { capture: !0 }), _.addEventListener("wheel", w.current, { passive: !1 });
      const E = _.ownerDocument;
      R.current = E, E.addEventListener("keydown", C.current, { capture: !0 }), F(_.offsetWidth), Q(!0);
    } else
      (m = R.current) == null || m.removeEventListener("keydown", C.current, { capture: !0 }), R.current = null, Q(!1);
    I.current = _, j(_);
  }, [j]), [q, ee] = K({ top: 0, left: 0, width: 0, maxH: 320, ready: !1 }), [ne, $] = K(0), [B, Q] = K(!1), [z, F] = K(0);
  U(() => {
    e && S.current && $(S.current.getBoundingClientRect().width);
  }, [e]);
  const P = Ie(() => ({ panelWidth: z || ne || void 0 }), [z, ne]);
  Cn(S, e && B, (_) => ee({ ..._, maxH: Math.min(_.maxH, 384), ready: !0 }), P), U(() => {
    if (q.ready && e) {
      const _ = I.current;
      _ && _.ownerDocument.activeElement !== _ && !_.contains(_.ownerDocument.activeElement) && _.focus();
    }
  }, [q.ready, e]), le(() => {
    var m;
    if (!e || M.highlightedIndex < 0) return;
    const _ = (m = I.current) == null ? void 0 : m.querySelector(`[data-ei="${M.highlightedIndex}"]`);
    _ == null || _.scrollIntoView({ block: "nearest" });
  }, [e, M.highlightedIndex]);
  const k = Z((_) => {
    !_ && !A.current || (!_ && ae.current && (ce.current = !0), n ? n(_) : _ || t == null || t());
  }, [n, t]), J = x(O);
  J.current = O;
  const ae = x(!1), ce = x(!1), ge = Z(() => {
    if (!A.current && J.current) {
      if (ce.current) {
        ce.current = !1, ae.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), se = pe.isValidElement(r) ? r : null, de = se ? pe.cloneElement(se, {
    ref: (_) => {
      S.current = _;
    },
    onPointerDown: () => {
      ae.current = !0, ce.current = !1;
    },
    onClick: (_) => {
      var m, E;
      (E = (m = se.props).onClick) == null || E.call(m, _), ge();
    }
  }) : r;
  return /* @__PURE__ */ N(X.Root, { open: e || O, onOpenChange: k, modal: !1, children: [
    /* @__PURE__ */ o(X.Trigger, { asChild: !0, children: de }),
    /* @__PURE__ */ o(X.Portal, { container: y ?? void 0, children: /* @__PURE__ */ o(ct.Provider, { value: a, children: /* @__PURE__ */ o(lt.Provider, { value: { chain: d, setChain: u, morph: l, keyboardOpened: b, setKeyboardOpened: g }, children: /* @__PURE__ */ o(He.Provider, { value: M, children: /* @__PURE__ */ o(
      X.Content,
      {
        ref: H,
        "data-theme": a,
        "data-ui-fixed": !0,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${i || ""} ${h || ""}`,
        style: {
          touchAction: "manipulation",
          position: "fixed",
          left: q.left,
          top: q.bottom != null ? void 0 : q.top,
          bottom: q.bottom,
          /* No width class: the menu sizes to its CONTENT (text must
             never clip) but never narrower than the trigger — the
             min-width floor keeps the trigger-matched look. */
          minWidth: i ? void 0 : ne || void 0,
          maxHeight: q.maxH,
          visibility: q.ready ? "visible" : "hidden"
        },
        onPointerLeave: M.pointerLeave,
        children: f
      }
    ) }) }) }) })
  ] });
}
function ro({
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
  closeOnSelect: b,
  readOnly: g = !1,
  theme: y,
  align: v,
  label: S,
  header: I,
  itemLabel: A,
  trigger: O,
  minItems: W = 1,
  itemRender: M,
  morph: D = !0,
  contentClassName: j
}) {
  const p = It(), [w, C] = K(null), [R, H] = K(""), q = x(null), ee = x(null);
  U(() => {
    e && requestAnimationFrame(() => {
      var z, F;
      (F = (z = ee.current) == null ? void 0 : z.querySelector('[data-active="1"]')) == null || F.scrollIntoView({ block: "nearest" });
    });
  }, [e]), U(() => {
    var P;
    if (!e) return;
    const z = (k) => {
      var de, be, _, m, E;
      if ((be = (de = k.target) == null ? void 0 : de.closest) != null && be.call(de, "input, textarea, [contenteditable]")) return;
      const J = (_ = ee.current) == null ? void 0 : _.closest(".ui-menu");
      if (!J || !J.contains(k.target)) return;
      const ae = J.ownerDocument, ce = [...J.querySelectorAll('[data-active] > [role="menuitem"]:first-child')], ge = [...J.querySelectorAll('div:last-child > [role="menuitem"]')], se = [...ce, ...ge];
      if (k.key === "ArrowDown" || k.key === "ArrowUp") {
        k.preventDefault(), k.stopImmediatePropagation();
        const L = ae.activeElement;
        let V = L ? se.indexOf(L) : -1;
        if (V < 0 && L) {
          const re = L.closest("[data-active]"), te = re == null ? void 0 : re.querySelector('[role="menuitem"]:first-child');
          te && (V = ce.indexOf(te));
        }
        const Y = k.key === "ArrowDown" ? 1 : -1, G = V < 0 ? Y === 1 ? 0 : se.length - 1 : (V + Y + se.length) % se.length;
        (m = se[G]) == null || m.focus({ preventScroll: !0 });
        return;
      }
      if (k.key === "ArrowLeft" || k.key === "ArrowRight") {
        const L = ae.activeElement, V = L == null ? void 0 : L.closest("[data-active]");
        if (!V) return;
        k.preventDefault(), k.stopImmediatePropagation();
        const Y = [...V.querySelectorAll('[role="menuitem"]')].slice(1);
        if (Y.length === 0) return;
        const G = L && V.contains(L) ? Y.indexOf(L) : -1, re = k.key === "ArrowRight" ? 1 : -1, te = G < 0 ? 0 : (G + re + Y.length) % Y.length;
        (E = Y[te]) == null || E.focus({ preventScroll: !0 });
        return;
      }
    }, F = ((P = ee.current) == null ? void 0 : P.ownerDocument) ?? null;
    return F == null || F.addEventListener("keydown", z, { capture: !0 }), () => F == null ? void 0 : F.removeEventListener("keydown", z, { capture: !0 });
  }, [e]), U(() => {
    if (w) {
      requestAnimationFrame(() => {
        var F, P;
        (F = q.current) == null || F.focus(), (P = q.current) == null || P.select();
      });
      const z = n.find((F) => F.id === w);
      z && !R && H(z.name);
    }
  }, [w]), U(() => {
    if (w) {
      const z = n.find((F) => F.id === w);
      z && !R && H(z.name);
    }
  }, [w, n]);
  const ne = (z, F) => {
    C(z), H(F);
  }, $ = () => {
    w && R.trim() && i(w, R.trim()), C(null);
  }, B = () => {
    C(null);
  }, Q = A || I.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ N(Be, { open: e, onOpenChange: (z) => {
    z ? (C(null), H("")) : (w && R.trim() && i(w, R.trim()), C(null), H("")), (!z || !g) && t(z);
  }, width: "w-80", theme: y, align: v, trigger: O, morph: D, contentClassName: j, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${p.headerText}`, children: I }),
    /* @__PURE__ */ o("div", { ref: ee, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((z) => {
      const F = z.id === r, P = w === z.id;
      return /* @__PURE__ */ o("div", { "data-active": F ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${F || P ? p.rowActiveBg : p.rowHoverBg} ${w && !P ? "opacity-40 pointer-events-none" : ""}`, children: P ? /* @__PURE__ */ N(me, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: q,
            value: R,
            onChange: (k) => H(k.target.value),
            onKeyDown: (k) => {
              k.key === "Enter" && (k.preventDefault(), k.stopPropagation(), $()), k.key === "Escape" && (k.preventDefault(), k.stopPropagation(), B());
            },
            className: `w-full border rounded ${p.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${p.editConfirm}`,
            onSelect: (k) => {
              k.preventDefault(), $();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o($t, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${p.editCancel}`,
            onSelect: (k) => {
              k.preventDefault(), B();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(je, { className: p.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ N(me, { children: [
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `flex-1 min-w-0 ${p.itemPad} rounded outline-none cursor-pointer flex items-center ${p.rowText} ${F ? "" : p.rowTextHover}`,
            onSelect: b ? () => {
              c(z.id);
            } : (k) => {
              k.preventDefault(), c(z.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${F ? p.rowActiveText : ""}`, children: M ? M(z) : z.name })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${F ? p.btnActive : p.btnBase}`,
            onSelect: (k) => {
              k.preventDefault(), ne(z.id, z.name);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ o(Vt, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${F ? p.btnActive : p.btnBase}`,
            onSelect: (k) => {
              k.preventDefault();
              const J = a(z.id);
              J && ne(J, `${z.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ o(Et, { className: p.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${p.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= W ? p.btnDisabled : F ? p.btnDangerActive : p.btnDanger}`,
            onSelect: (k) => {
              k.preventDefault(), f(z.id);
            },
            onTouchStart: () => {
            },
            disabled: g || n.length <= W,
            children: /* @__PURE__ */ o(Ve, { className: p.btnIcon })
          }
        )
      ] }) }, z.id);
    }) }),
    /* @__PURE__ */ N("div", { className: `shrink-0 ${w ? "opacity-40 pointer-events-none" : ""}`, children: [
      d && /* @__PURE__ */ N(me, { children: [
        /* @__PURE__ */ o(X.Separator, { className: p.separator }),
        /* @__PURE__ */ N(
          X.Item,
          {
            className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
            onSelect: (z) => {
              z.preventDefault(), d();
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: [
              /* @__PURE__ */ o(zt, { className: `${p.btnIcon} ${p.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (l || h || s || u) && /* @__PURE__ */ o(X.Separator, { className: p.separator }),
      l && /* @__PURE__ */ N(
        X.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (z) => {
            z.preventDefault();
            const F = l();
            F && ne(F, "");
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ o(Xt, { className: `${p.btnIcon} ${p.icon}` }),
            "New ",
            Q
          ]
        }
      ),
      h && /* @__PURE__ */ N(
        X.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (z) => {
            z.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ N("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      s && /* @__PURE__ */ N(
        X.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (z) => {
            z.preventDefault(), s();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ N("svg", { className: `${p.btnIcon} ${p.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      u && /* @__PURE__ */ N(
        X.Item,
        {
          className: `w-full text-left ${p.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${p.itemDefault} ui-row`,
          onSelect: (z) => {
            z.preventDefault(), u();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ o(Ve, { className: `${p.btnIcon} ${p.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const Ln = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Sn({
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
  Pt();
  const s = It(), d = x(!1), u = x(null), b = at(), g = x(b);
  g.current = b;
  const y = x(null);
  U(() => {
    var O;
    const A = {
      label: Ot(i),
      activate: () => {
        n || e();
      }
    };
    return y.current = A, (O = g.current) == null ? void 0 : O.register(A);
  }, []);
  const v = b && y.current ? b.items.indexOf(y.current) : -1, S = !n && v >= 0 && v === b.highlightedIndex, I = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ N(
    X.Item,
    {
      ref: u,
      "data-ei": v >= 0 ? v : void 0,
      className: `w-full text-left ${Ln} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${I} ${f ? "ui-item-selected" : ""} ${S ? "ui-item-highlighted" : ""} ${n ? "opacity-30 pointer-events-none" : ""} ${c}`,
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
        t && /* @__PURE__ */ o("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: i }),
        h && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: h }),
        l && /* @__PURE__ */ o(
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
function Mn({ id: e, label: t, icon: n, width: r, side: c = "right", children: i, contentClassName: a }) {
  const { chain: f, setChain: l, morph: h, keyboardOpened: s, setKeyboardOpened: d } = Ce(lt), u = f.includes(e), b = f[f.length - 1] === e, g = Pt(), y = Te(), v = x(null), S = x(null), [I, A] = K(u), O = !u && I;
  U(() => {
    u && A(!0);
  }, [u]);
  const W = () => l((P) => {
    const k = P.indexOf(e);
    return k >= 0 ? P.slice(0, k) : P;
  }), M = ut(), D = at(), j = x(D);
  j.current = D;
  const p = x(null);
  U(() => {
    var k;
    const P = {
      label: t,
      activate: () => {
        d(e), l((J) => J.includes(e) ? J : [...J, e]);
      },
      submenu: !0
    };
    return p.current = P, (k = j.current) == null ? void 0 : k.register(P);
  }, []);
  const w = D && p.current ? D.items.indexOf(p.current) : -1, C = w >= 0 && w === D.highlightedIndex, R = Z(() => {
    const P = v.current;
    if (!P) return null;
    const k = P.getBoundingClientRect();
    return { left: k.left, top: k.top, width: k.width, height: k.height };
  }, []), H = st({
    visible: u,
    morph: h,
    anchor: R,
    onClosed: () => A(!1)
  }), q = x(() => {
  }), ee = x(() => {
  }), ne = x(() => {
  });
  dt(u && b, M, q, {
    onCloseSub: () => {
      W(), D && w >= 0 && D.setHighlighted(w, "keyboard");
    }
  });
  const $ = x(s);
  $.current = s, U(() => {
    u && ($.current === e ? (M.setHighlighted(0, "keyboard"), requestAnimationFrame(() => {
      var P;
      return (P = S.current) == null ? void 0 : P.focus();
    }), d(null)) : M.setHighlighted(-1, "keyboard"));
  }, [u]), ht(u, ee), ft(u, M, q, S, !b, ne), pe.useLayoutEffect(() => {
    var k;
    if (!u || M.highlightedIndex < 0) return;
    const P = (k = S.current) == null ? void 0 : k.querySelector(`[data-ei="${M.highlightedIndex}"]`);
    P == null || P.scrollIntoView({ block: "nearest" });
  }, [u, M.highlightedIndex]);
  const B = x(null), Q = Z((P) => {
    var k;
    if (P) {
      P.addEventListener("keydown", q.current, { capture: !0 }), P.addEventListener("wheel", ee.current, { passive: !1 });
      const J = P.ownerDocument;
      B.current = J, J.addEventListener("keydown", ne.current, { capture: !0 });
    } else
      (k = B.current) == null || k.removeEventListener("keydown", ne.current, { capture: !0 }), B.current = null;
    S.current = P, H(P);
  }, [H]), z = `w-full text-left ${Dn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${C ? " ui-item-highlighted" : ""}${O ? " ui-sub-closing" : ""}`, F = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(60vh,24rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"} ${a || ""}`;
  return /* @__PURE__ */ N(X.Sub, { open: u || I, onOpenChange: (P) => l((k) => {
    if (!P) {
      const J = k.indexOf(e);
      return J >= 0 ? k.slice(0, J) : k;
    }
    return k.includes(e) ? k : [...k, e];
  }), children: [
    /* @__PURE__ */ N(
      X.SubTrigger,
      {
        ref: v,
        "data-ei": w >= 0 ? w : void 0,
        className: z,
        onTouchStart: () => {
        },
        onPointerEnter: () => {
          D && w >= 0 && D.setHighlighted(w, "pointer");
        },
        onPointerDown: (P) => {
          P.pointerType === "pen" && (P.preventDefault(), l((k) => u ? k.slice(0, k.indexOf(e)) : [...k, e]));
        },
        children: [
          c === "left" && /* @__PURE__ */ o(Xe, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ N("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          c === "right" && /* @__PURE__ */ o(Xe, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(X.Portal, { container: y ?? void 0, children: /* @__PURE__ */ o(
      X.SubContent,
      {
        ref: Q,
        "data-theme": g,
        className: F,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        onPointerLeave: M.pointerLeave,
        children: /* @__PURE__ */ o(He.Provider, { value: M, children: i })
      }
    ) })
  ] });
}
const ke = 8, An = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Pn = T ? "text-sm" : "text-xs", oo = ({ open: e, x: t, y: n, onClose: r, children: c, containerRef: i, morph: a = !0 }) => {
  const f = x(null), l = we(), [h, s] = K(!1), [d, u] = K([]), [b, g] = K(null), y = ut();
  U(() => {
    if (e)
      return y.setHighlighted(-1, "keyboard"), At(r);
  }, [e, r]);
  const v = x({ left: t, top: n });
  e && (v.current = { left: t, top: n });
  const S = Z(() => ({ left: v.current.left, top: v.current.top, width: 0, height: 0 }), []), I = st({
    visible: !0,
    morph: a,
    anchor: S,
    cloneOnUnmount: !0
  }), A = x(() => {
  }), O = x(() => {
  }), W = x(() => {
  });
  dt(e, y, A), ht(e, O), ft(e, y, A, f, d.length > 0, W);
  const M = x(null), D = Z((w) => {
    var C;
    if (w) {
      w.addEventListener("keydown", A.current, { capture: !0 }), w.addEventListener("wheel", O.current, { passive: !1 });
      const R = w.ownerDocument;
      M.current = R, R.addEventListener("keydown", W.current, { capture: !0 });
    } else
      (C = M.current) == null || C.removeEventListener("keydown", W.current, { capture: !0 }), M.current = null;
    f.current = w, s(!!w), I(w);
  }, [I]), [j, p] = K(null);
  return le(() => {
    var z;
    if (!e || !h || !f.current) return;
    const w = f.current, C = w.offsetWidth, R = w.offsetHeight, H = (z = i == null ? void 0 : i.current) == null ? void 0 : z.getBoundingClientRect(), q = H ? H.right : (l == null ? void 0 : l.innerWidth) ?? 0, ee = H ? H.bottom : (l == null ? void 0 : l.innerHeight) ?? 0, ne = H ? H.left : 0, $ = H ? H.top : 0;
    let B = Math.max($ + ke, v.current.top), Q = Math.max(ne + ke, v.current.left);
    Q + C > q && (Q = q - C - ke), B + R > ee && (B = Math.max($ + ke, ee - R - ke)), p({ left: Q, top: B });
  }, [e, h, t, n, i]), e ? /* @__PURE__ */ N(X.Root, { open: e, onOpenChange: (w) => {
    w || r();
  }, modal: !1, children: [
    /* @__PURE__ */ o(X.Trigger, { asChild: !0, children: /* @__PURE__ */ o("span", { style: { position: "fixed", inset: 0 }, "aria-hidden": "true" }) }),
    /* @__PURE__ */ o(X.Portal, { children: /* @__PURE__ */ o(ct.Provider, { value: "light", children: /* @__PURE__ */ o(lt.Provider, { value: { chain: d, setChain: u, morph: a, keyboardOpened: b, setKeyboardOpened: g }, children: /* @__PURE__ */ o(He.Provider, { value: y, children: /* @__PURE__ */ o(
      X.Content,
      {
        ref: D,
        "data-theme": "light",
        "data-ui-fixed": !0,
        className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${Pn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
        style: { left: (j == null ? void 0 : j.left) ?? v.current.left, top: (j == null ? void 0 : j.top) ?? v.current.top, touchAction: "manipulation" },
        onPointerLeave: y.pointerLeave,
        children: c
      }
    ) }) }) }) })
  ] }) : null;
}, io = ({ onClick: e, variant: t = "default", icon: n, disabled: r = !1, selected: c = !1, trailing: i, children: a }) => {
  const f = at(), l = x(f);
  l.current = f;
  const h = x(null);
  U(() => {
    var b;
    const u = { label: Ot(a), activate: () => {
      r || e();
    } };
    return h.current = u, (b = l.current) == null ? void 0 : b.register(u);
  }, []);
  const s = f && h.current ? f.items.indexOf(h.current) : -1, d = !r && s >= 0 && s === f.highlightedIndex;
  return /* @__PURE__ */ N(
    X.Item,
    {
      "data-ei": s >= 0 ? s : void 0,
      onClick: r ? void 0 : e,
      onPointerEnter: () => {
        !r && f && s >= 0 && f.setHighlighted(s, "pointer");
      },
      onTouchStart: () => {
      },
      disabled: r,
      className: `w-full text-left ${An} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"} ${c ? "ui-item-selected" : ""} ${d ? "ui-item-highlighted" : ""}`,
      children: [
        n,
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        i && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: i })
      ]
    }
  );
}, so = () => /* @__PURE__ */ o(X.Separator, { className: "ui-sep my-1" }), co = (e) => /* @__PURE__ */ o(Mn, { ...e, width: e.width || "min-w-[180px]!", contentClassName: "z-[10000]" }), oe = 32, _t = "[data-modal-stack]", ue = 220, Ee = "cubic-bezier(0.32, 0.72, 0, 1)", Ae = 0.94;
function Ne() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Le(e) {
  if (!e) return { top: 0, height: 0, bottom: 0 };
  const t = e.visualViewport, n = t ? t.offsetTop : 0, r = t ? t.height : e.innerHeight;
  return { top: n, height: r, bottom: n + r };
}
function Ht(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function bt(e, t, n, r) {
  const c = ++e.current, i = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = Ht(i, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === c && (t.style.transition = `transform ${ue}ms ${Ee}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === c && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", r());
      }, ue + 80));
    });
  });
}
function In(e, t, n) {
  const r = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${Ae})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === r && (t.style.transition = `transform ${ue}ms ${Ee}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === r && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ue + 60));
    });
  });
}
function xt(e, t, n) {
  const r = ++e.current, c = t.getBoundingClientRect(), i = 1 - Ae, a = { left: c.left + c.width * i / 2, top: c.top + c.height * i / 2, width: c.width * Ae, height: c.height * Ae };
  t.style.transition = `transform ${ue}ms ${Ee}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = Ht(c, a), t.style.opacity = "0", window.setTimeout(() => {
    e.current === r && (t.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      e.current !== r || t.isConnected || (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", t.style.visibility = "");
    }));
  }, ue + 60);
}
function Ke(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(_t) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function We(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(_t) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const On = T ? "px-6" : "px-5", _n = T ? "py-3" : "py-2.5", Hn = T ? "text-sm" : "text-xs", Bn = T ? "w-4 h-4" : "w-3.5 h-3.5", Fn = T ? "text-base" : "text-sm", Kn = T ? "w-5 h-5" : "w-4 h-4", qe = T ? "px-6" : "px-5", Wn = T ? "pt-6" : "pt-5", qn = T ? "pb-6" : "pb-5", Yn = T ? "text-xs" : "text-[10px]", Un = T ? "w-3.5 h-3.5" : "w-3 h-3", jn = T ? "px-2.5 py-1.5" : "px-2 py-1", Vn = T ? "px-6" : "px-5", Xn = T ? "py-3" : "py-2";
function Gn({
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
  const d = x(null), u = x(null), b = x(null), [g, y] = K(!1), v = Z((m) => {
    d.current = m, y(m !== null);
  }, []), S = Te(), I = we(), A = x(I);
  A.current = I;
  const [O, W] = K(null), M = x(null), D = x(!1), j = x(!1), [p, w] = K(!1), C = x(0), R = x(!1), [H, q] = K(!1), ee = x(l);
  ee.current = l;
  const ne = x(!1), $ = x(!1), B = () => {
    $.current = !0, w(!0);
  }, Q = () => {
    $.current = !1, w(!1);
  };
  U(() => {
    e || (W(null), j.current = !1, D.current = !1);
  }, [e]), le(() => {
    if (!e || j.current || !g || !d.current) return;
    j.current = !0;
    const m = d.current.getBoundingClientRect(), E = A.current ?? null, L = (E == null ? void 0 : E.innerWidth) ?? 0, V = Le(E);
    W({
      left: Math.max(oe, Math.min((L - m.width) / 2, L - m.width - oe)),
      top: Math.max(V.top + oe, Math.min(V.top + (V.height - m.height) / 2, V.bottom - m.height - oe))
    });
  }, [e, g]), le(() => {
    if (!e || !g || !l || Ne() || !d.current) return;
    const m = d.current, E = Ke(m), L = E[E.length - 1];
    B(), L ? bt(C, m, L.getBoundingClientRect(), Q) : In(C, m, Q);
  }, [e, g]);
  const z = Z(() => {
    if (!s || R.current) return;
    const m = d.current, E = !!m && Ke(m).length > 0;
    if (!m || !l || Ne() || E) {
      t();
      return;
    }
    R.current = !0, q(!0), ne.current = !0, B(), xt(C, m, () => {
      R.current = !1, q(!1), Q(), t();
    });
  }, [l, t, s]);
  le(() => () => {
    const m = d.current;
    if (!m || ne.current || !ee.current || Ne() || Ke(m).length > 0) return;
    const E = m.ownerDocument, L = m.cloneNode(!0);
    L.removeAttribute("data-modal-stack"), L.removeAttribute("data-state"), L.removeAttribute("role"), L.removeAttribute("data-aria-hidden"), L.removeAttribute("tabindex"), L.setAttribute("aria-hidden", "true"), L.style.pointerEvents = "none", E.body.appendChild(L), xt({ current: 0 }, L, () => {
      L.isConnected && L.remove();
    });
  }, []), U(() => {
    if (!e || !g || !l || !d.current) return;
    const m = d.current, E = m.parentNode;
    if (!E) return;
    let L = 0, V = null, Y = !1;
    const G = () => {
      L = 0;
      const te = We(m);
      if (te.length > 0)
        m.style.opacity = "", m.style.pointerEvents = "", V = te[te.length - 1].getBoundingClientRect(), Y = !0, L = requestAnimationFrame(G);
      else if (Y) {
        Y = !1, V && !Ne() && (B(), bt(C, m, V, Q)), V = null;
        const fe = A.current ?? null;
        fe == null || fe.setTimeout(() => {
          !m || !m.isConnected || getComputedStyle(m).opacity !== "1" && (m.style.opacity = "1", m.style.pointerEvents = "");
        }, 240);
      }
    }, re = new MutationObserver(() => {
      !L && We(m).length > 0 && (L = requestAnimationFrame(G));
    });
    return re.observe(E, { childList: !0 }), () => {
      re.disconnect(), L && cancelAnimationFrame(L);
    };
  }, [e, g]), U(() => {
    if (!g || !l || Ne() || !d.current) return;
    const m = d.current;
    let E = Math.round(m.getBoundingClientRect().height), L = !1;
    const V = new ResizeObserver(() => {
      if (!m.isConnected) return;
      const Y = Math.round(m.getBoundingClientRect().height);
      if (!L) {
        L = !0, E = Y;
        return;
      }
      if (Math.abs(Y - E) < 1) return;
      if (M.current || R.current || We(m).length > 0) {
        E = Y;
        return;
      }
      if ($.current) return;
      const G = E;
      E = Y, B();
      const re = m.getBoundingClientRect(), te = !D.current, fe = Le(A.current ?? null), Ut = te ? fe.top + (fe.height - G) / 2 : re.top, mt = te ? fe.top + (fe.height - Y) / 2 : re.top;
      m.style.transition = "none", m.style.height = `${G}px`, te && (m.style.top = `${Ut}px`), u.current && (u.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${G}px` && (m.style.transition = `height ${ue}ms ${Ee}${te ? `, top ${ue}ms ${Ee}` : ""}`, m.style.height = `${Y}px`, te && (m.style.top = `${mt}px`), window.setTimeout(() => {
            m.style.height === `${Y}px` && (m.style.transition = "", m.style.height = "", u.current && (u.current.style.overflow = ""), te && W({ left: re.left, top: mt }), Q());
          }, ue + 60));
        });
      });
    });
    return V.observe(m), () => V.disconnect();
  }, [g]);
  const F = Z(() => {
    const m = d.current;
    if (!m) return null;
    const E = m.getBoundingClientRect();
    return { left: E.left, top: E.top, width: E.width, height: E.height };
  }, []), P = Z((m, E) => {
    const L = A.current ?? null, V = (L == null ? void 0 : L.innerWidth) ?? 0, Y = Le(L), G = F(), re = G ? G.width : Math.min(V - oe * 2, 576), te = G ? G.height : Math.min(Y.height - oe * 2, 400);
    return {
      left: Math.max(oe, Math.min(m, V - re - oe)),
      top: Math.max(Y.top + oe, Math.min(E, Y.bottom - te - oe))
    };
  }, [F]);
  U(() => {
    if (!e) return;
    const m = A.current ?? null, E = (m == null ? void 0 : m.visualViewport) ?? null;
    if (!m || !E) return;
    const L = () => {
      var te;
      if (R.current || M.current) return;
      const V = d.current;
      if (!V) return;
      const Y = Le(A.current ?? null), G = V.getBoundingClientRect();
      if (D.current) {
        W(P(G.left, G.top));
        return;
      }
      const re = ((te = A.current) == null ? void 0 : te.innerWidth) ?? 0;
      W({
        left: Math.max(oe, Math.min((re - G.width) / 2, re - G.width - oe)),
        top: Math.max(Y.top + oe, Math.min(Y.top + (Y.height - G.height) / 2, Y.bottom - G.height - oe))
      });
    };
    return E.addEventListener("resize", L), E.addEventListener("scroll", L), m.addEventListener("orientationchange", L), () => {
      E.removeEventListener("resize", L), E.removeEventListener("scroll", L), m.removeEventListener("orientationchange", L);
    };
  }, [e, P]);
  const k = Z((m) => {
    if (m.target.closest("button")) return;
    D.current = !0;
    const E = F();
    E && (W(P(E.left, E.top)), M.current = { startX: m.clientX, startY: m.clientY, posX: E.left, posY: E.top }, m.target.setPointerCapture(m.pointerId));
  }, [F, P]), J = Z((m) => {
    const E = M.current;
    E && (m.preventDefault(), W(P(E.posX + m.clientX - E.startX, E.posY + m.clientY - E.startY)));
  }, [P]), ae = Z(() => {
    M.current = null;
  }, []), ce = M.current !== null, ge = O !== null, se = ge ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", de = `${c ? `${c} w-full` : "max-w-xl w-full"}`, be = {
    ...ge ? { left: O.left, top: O.top } : {},
    width: `min(100%, calc(100vw - ${oe * 2}px))`,
    maxHeight: `calc(100vh - ${oe * 2}px)`
  }, _ = Z((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const L = b.current;
    if (!L) return;
    const V = Array.from(L.querySelectorAll("button[data-modal-confirm]")), Y = V.length > 0 ? V : Array.from(L.querySelectorAll("button")), G = Y[Y.length - 1];
    !G || G.disabled || (m.preventDefault(), G.click());
  }, []);
  return /* @__PURE__ */ o(he.Root, { open: e, onOpenChange: (m) => {
    m || z();
  }, children: /* @__PURE__ */ N(he.Portal, { container: S ?? void 0, children: [
    /* @__PURE__ */ o(
      he.Overlay,
      {
        className: `ui-modal-overlay fixed inset-0 z-[9999]${H ? " ui-modal-overlay-closing" : ""}`,
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), z());
        }
      }
    ),
    /* @__PURE__ */ N(
      he.Content,
      {
        ref: v,
        onKeyDown: _,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${se} ${de}`,
        style: { touchAction: "manipulation", ...Object.keys(be).length > 0 ? be : {} },
        children: [
          h ? /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${qe} ${Wn} pb-4 ${ce ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                p || k(m);
              },
              onPointerMove: J,
              onPointerUp: ae,
              children: [
                /* @__PURE__ */ o(he.Title, { className: `${Fn} font-bold text-white truncate`, children: n }),
                s && /* @__PURE__ */ o(he.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(je, { className: Kn }) })
              ]
            }
          ) : /* @__PURE__ */ N(
            "div",
            {
              className: `flex items-center justify-between ${On} ${_n} border-b border-zinc-800 shrink-0 bg-zinc-950 ${ce ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                p || k(m);
              },
              onPointerMove: J,
              onPointerUp: ae,
              children: [
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(he.Title, { className: `${Hn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
                  f && /* @__PURE__ */ N("button", { onClick: f, className: `flex items-center gap-1 ${Yn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${jn} shrink-0`, children: [
                    /* @__PURE__ */ o(zt, { className: Un }),
                    "Reset"
                  ] }),
                  s && /* @__PURE__ */ o(he.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(je, { className: Bn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: u, className: `overflow-y-auto flex-1 bg-zinc-900 text-zinc-100${h ? ` ${qe} pb-4` : ""}`, children: a }),
          i && /* @__PURE__ */ o("div", { ref: b, className: h ? `${qe} ${qn}` : "shrink-0", children: h ? /* @__PURE__ */ o("div", { className: "flex items-center justify-end gap-2", children: i }) : i })
        ]
      }
    )
  ] }) });
}
function lo({ children: e }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${Vn} ${Xn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const Zn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${T ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Jn = {
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
  return /* @__PURE__ */ o(
    "button",
    {
      type: n,
      className: `${Zn} ${Jn[e]} ${t}`,
      ...r
    }
  );
}
function Qn({ checked: e, onChange: t, disabled: n = !1, label: r, id: c, className: i = "", labelClassName: a = "", theme: f, variant: l = "pill", tone: h = "accent", block: s = !1 }) {
  const d = l !== "plain", u = T ? "w-5 h-5" : "w-4 h-4", b = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", g = T ? "w-3.5 h-3.5" : "w-3 h-3", y = T ? "text-sm" : "text-xs";
  return /* @__PURE__ */ N(
    "label",
    {
      className: `ui-checkbox ${d ? `ui-checkbox-pill ${T ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${h === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${i}`,
      style: { display: s ? "flex" : "inline-flex", alignItems: "center", gap: T ? 10 : 8 },
      onClick: (S) => S.stopPropagation(),
      ...f ? { "data-theme": f } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: c,
            checked: e,
            disabled: n,
            onChange: (S) => t(S.target.checked),
            className: "sr-only"
          }
        ),
        d ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ N("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: u, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${b}`, "aria-hidden": !0, children: e && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: g, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${y} ${a}`, children: r })
      ]
    }
  );
}
const er = T ? "space-y-5" : "space-y-4", tr = T ? "text-sm" : "text-xs", nr = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Bt = ze(null);
function ao() {
  const e = Ce(Bt);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function uo({ children: e }) {
  const [t, n] = K(null), [r, c] = K(!1), i = x(null), a = Z((u) => {
    if (u.suppressKey) {
      const b = localStorage.getItem(u.suppressKey);
      if (b && Date.now() < parseInt(b, 10))
        return Promise.resolve(!0);
    }
    return new Promise((b) => {
      c(!1), n({ kind: "confirm", options: u, resolve: b });
    });
  }, []), f = Z((u) => new Promise((b) => {
    n({ kind: "prompt", options: u, resolve: b });
  }), []), l = Z((u) => new Promise((b) => {
    n({ kind: "alert", options: u, resolve: b });
  }), []);
  U(() => {
    if (t) {
      const u = setTimeout(() => {
        var b;
        return (b = i.current) == null ? void 0 : b.focus();
      }, 50);
      return () => clearTimeout(u);
    }
  }, [t]);
  const h = Z(() => {
    var u, b;
    if (t) {
      if (t.kind === "confirm") {
        const g = t.options;
        g.suppressKey && r && localStorage.setItem(g.suppressKey, String(Date.now() + 864e5)), t.resolve(!0);
      } else t.kind === "prompt" ? t.resolve(((b = (u = i.current) == null ? void 0 : u.value) == null ? void 0 : b.trim()) || null) : t.resolve();
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
  const d = Z(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]);
  return /* @__PURE__ */ N(Bt.Provider, { value: { confirm: a, prompt: f, alert: l }, children: [
    e,
    /* @__PURE__ */ o(
      Gn,
      {
        open: s,
        onClose: d,
        title: (t == null ? void 0 : t.options.title) ?? "",
        width: "max-w-sm",
        flat: !0,
        footer: t && /* @__PURE__ */ N(me, { children: [
          t.kind !== "alert" && /* @__PURE__ */ o(Se, { variant: "ghost", onClick: d, children: "Cancel" }),
          t.kind === "alert" ? /* @__PURE__ */ o(Se, { onClick: h, children: "OK" }) : t.kind === "confirm" ? /* @__PURE__ */ o(
            Se,
            {
              "data-modal-confirm": !0,
              variant: "danger-solid",
              onClick: h,
              children: "Confirm"
            }
          ) : /* @__PURE__ */ o(Se, { "data-modal-confirm": !0, onClick: h, children: "Save" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: er, children: [
          (t == null ? void 0 : t.options.message) && /* @__PURE__ */ o("p", { className: `${tr} text-zinc-400 leading-relaxed`, children: t.options.message }),
          (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ o(
            Qn,
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
              className: `w-full ${nr} ui-input`
            }
          )
        ] })
      }
    )
  ] });
}
const rr = 500, or = 250, ir = 5, ie = 88, yt = 4;
function sr(e, t) {
  const n = e.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const c = performance.now(), i = (a) => {
    const f = a - c, l = Math.min(f / t, 1);
    n.style.strokeDashoffset = String(r * (1 - l)), l < 1 && requestAnimationFrame(i);
  };
  requestAnimationFrame(i);
}
function cr({ x: e, y: t, ms: n }) {
  const r = x(null), c = Te();
  return U(() => {
    r.current && sr(r.current, n);
  }, [n]), tt(
    /* @__PURE__ */ o(
      "div",
      {
        style: {
          position: "fixed",
          left: e - ie / 2,
          top: t - ie / 2,
          width: ie,
          height: ie,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ N("svg", { ref: r, width: ie, height: ie, viewBox: `0 0 ${ie} ${ie}`, children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: ie / 2,
              cy: ie / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: yt + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: ie / 2,
              cy: ie / 2,
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
    c ?? document.body
  );
}
function fo() {
  return { "data-no-longpress": "true" };
}
function lr(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function ho({
  children: e,
  showRing: t = !0,
  longPressMs: n = rr,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: c,
  onLongPress: i
}) {
  const [a, f] = K(null), l = Tt(), h = x(null), s = x(null), d = x({ x: 0, y: 0, target: null }), u = x(!1), b = Math.min(or, n * 0.5), g = x(c);
  g.current = c;
  const y = x(i);
  return y.current = i, U(() => {
    if (!T || !l) return;
    const v = (O) => {
      if (!Ge(O.pointerType) || O.button !== 0) return;
      const W = O.target;
      if (!W.closest(r) || (g.current ? !g.current(W) : lr(W))) return;
      const M = O.clientX, D = O.clientY;
      d.current = { x: M, y: D, target: O.target }, u.current = !0, t && (s.current = setTimeout(() => f({ x: M, y: D }), b)), h.current = setTimeout(() => {
        if (!u.current) return;
        s.current && (clearTimeout(s.current), s.current = null), f(null);
        const j = d.current.target;
        if (!j) return;
        const p = y.current;
        if (p) {
          p(j, M, D);
          return;
        }
        const w = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: M,
          clientY: D,
          button: 2,
          view: window
        });
        j.dispatchEvent(w);
      }, n);
    }, S = (O) => {
      if (!u.current || h.current === null) return;
      const W = O.clientX - d.current.x, M = O.clientY - d.current.y;
      Math.sqrt(W * W + M * M) > ir && (clearTimeout(h.current), h.current = null, s.current && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    }, I = () => {
      h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null);
    }, A = (O) => {
      Ge(O.pointerType) && (h.current !== null && (clearTimeout(h.current), h.current = null), s.current !== null && (clearTimeout(s.current), s.current = null), u.current = !1, f(null));
    };
    return l == null || l.addEventListener("pointerdown", v), l.addEventListener("pointermove", S), l.addEventListener("pointerup", I), l.addEventListener("pointercancel", I), l.addEventListener("pointerleave", A), () => {
      l.removeEventListener("pointerdown", v), l.removeEventListener("pointermove", S), l.removeEventListener("pointerup", I), l == null || l.removeEventListener("pointercancel", I), l == null || l.removeEventListener("pointerleave", A), h.current !== null && clearTimeout(h.current), s.current !== null && clearTimeout(s.current);
    };
  }, [t, n, b, r]), /* @__PURE__ */ N(me, { children: [
    e,
    t && a && /* @__PURE__ */ o(cr, { x: a.x, y: a.y, ms: n - b })
  ] });
}
function mo() {
  const e = Nn();
  return kn ? e === null || Ge(e) : !1;
}
const ar = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", ur = {
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
}, vt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", dr = "bg-blue-900!";
function po({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: r = "",
  type: c = "button",
  ...i
}) {
  const a = i["data-state"] === "open", f = ur[t][e];
  let l = `${f.base} ${a ? f.open : ""}`;
  return e === "primary" && t === "light" && n && (l = a ? `${vt} ${dr}` : vt), /* @__PURE__ */ o("button", { type: c, className: `${ar} ${l} ${r}`, ...i });
}
const fr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], hr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], Ye = 1900, Ue = 2100;
function mr(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function pr(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function go({ selected: e, onChange: t, theme: n = "light", showChips: r = !0, className: c = "", initialView: i }) {
  const a = /* @__PURE__ */ new Date(), f = (() => {
    if (!i) return a;
    const $ = /* @__PURE__ */ new Date(i + "T00:00:00");
    return isNaN($.getTime()) ? a : $;
  })(), [l, h] = K(f.getFullYear()), [s, d] = K(f.getMonth()), [u, b] = K("days"), [g, y] = K(null), v = Ie(() => new Set(e), [e]), S = ($) => {
    v.has($) ? t(e.filter((B) => B !== $)) : t([...e, $]);
  }, I = Ie(() => {
    const $ = mr(l, s), B = new Date(l, s, 1).getDay(), Q = [];
    for (let z = 0; z < B; z++) Q.push({ key: `pad-${z}`, day: 0, empty: !0 });
    for (let z = 1; z <= $; z++) Q.push({ key: pr(l, s, z), day: z, empty: !1 });
    return Q;
  }, [l, s]), A = ($) => h((B) => Math.max(Ye, Math.min(Ue, B + $))), O = ($) => {
    s + $ < 0 ? (h((B) => Math.max(Ye, B - 1)), d(11)) : s + $ > 11 ? (h((B) => Math.min(Ue, B + 1)), d(0)) : d((B) => B + $);
  }, W = () => {
    if (g === null) return;
    const $ = parseInt(g, 10);
    !isNaN($) && $ >= Ye && $ <= Ue && h($), y(null);
  }, M = ($) => e.some((B) => B.startsWith(`${l}-${String($ + 1).padStart(2, "0")}`)), D = n === "dark", j = T ? "p-2" : "p-1", p = T ? "w-5 h-5" : "w-4 h-4", w = T ? "text-[11px] py-2" : "text-[10px] py-1.5", C = T ? "py-2.5 text-sm" : "py-1.5 text-xs", R = T ? "py-3 text-sm" : "py-2 text-xs", H = T ? "text-xs px-2.5 py-1.5" : "text-[10px] px-1.5 py-0.5", q = T ? `w-20 text-sm text-center font-semibold rounded outline-none py-0.5 ${D ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}` : `w-16 text-sm text-center font-semibold rounded outline-none py-0.5 ${D ? "bg-zinc-700 text-zinc-100 focus:bg-zinc-600" : "bg-zinc-200 text-zinc-800 focus:bg-zinc-300"}`, ee = D ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800", ne = D ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100";
  return /* @__PURE__ */ N("div", { className: `border rounded-lg overflow-hidden w-full ${D ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${c}`, children: [
    /* @__PURE__ */ N("div", { className: `flex items-center justify-between px-3 py-2 border-b ${D ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? A(-1) : O(-1),
          className: `${j} rounded transition-colors ${D ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Previous year" : "Previous month",
          children: /* @__PURE__ */ o(Gt, { className: p })
        }
      ),
      u === "days" ? /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => b("months"),
          "aria-label": "Select year and month",
          className: `text-sm font-semibold rounded px-2 py-0.5 transition-colors ${D ? "text-zinc-100 hover:bg-zinc-800" : "text-zinc-800 hover:bg-zinc-200"}`,
          children: new Date(l, s).toLocaleString("default", { month: "long", year: "numeric" })
        }
      ) : /* @__PURE__ */ o(
        "input",
        {
          type: "text",
          inputMode: "numeric",
          "aria-label": "Year",
          value: g ?? String(l),
          onChange: ($) => y($.target.value.replace(/\D/g, "").slice(0, 4)),
          onFocus: ($) => $.target.select(),
          onBlur: W,
          onKeyDown: ($) => {
            $.key === "Enter" && ($.preventDefault(), W()), $.key === "Escape" && y(null);
          },
          className: q
        }
      ),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => u === "months" ? A(1) : O(1),
          className: `${j} rounded transition-colors ${D ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": u === "months" ? "Next year" : "Next month",
          children: /* @__PURE__ */ o(Xe, { className: p })
        }
      )
    ] }),
    u === "months" ? /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ o("div", { className: "grid grid-cols-3 text-center", children: hr.map(($, B) => /* @__PURE__ */ N(
        "button",
        {
          type: "button",
          onClick: () => {
            d(B), b("days");
          },
          className: `${R} relative font-medium transition-colors border-b ${B === s ? ee : ne} ${D ? "border-zinc-800/60" : "border-zinc-50"}`,
          children: [
            $,
            M(B) && /* @__PURE__ */ o("span", { className: `absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${B === s ? "bg-white" : D ? "bg-blue-500" : "bg-zinc-900"}` })
          ]
        },
        $
      )) }),
      /* @__PURE__ */ o("div", { className: `text-center border-t ${D ? "border-zinc-800" : "border-zinc-100"}`, children: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            h(a.getFullYear()), d(a.getMonth()), b("days");
          },
          className: `px-3 ${T ? "py-2.5 text-sm" : "py-1.5 text-xs"} font-semibold rounded transition-colors ${D ? "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800" : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"}`,
          children: "Today"
        }
      ) })
    ] }) : /* @__PURE__ */ N("div", { className: "grid grid-cols-7 text-center", children: [
      fr.map(($) => /* @__PURE__ */ o("div", { className: `${w} font-semibold uppercase tracking-wider border-b ${D ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: $ }, $)),
      I.map(($) => $.empty ? /* @__PURE__ */ o("div", {}, $.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => S($.key),
          className: `${C} font-medium transition-colors border-b ${D ? "border-zinc-800/60" : "border-zinc-50"} ${v.has($.key) ? ee : D ? "text-zinc-300 hover:bg-zinc-800" : "text-zinc-700 hover:bg-zinc-100"}`,
          children: $.day
        },
        $.key
      ))
    ] }),
    r && e.length > 0 && /* @__PURE__ */ N("div", { className: `px-3 py-2 border-t ${D ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ N("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: e.map(($) => {
        const B = /* @__PURE__ */ new Date($ + "T00:00:00"), Q = B.getFullYear() === a.getFullYear() ? B.toLocaleString("default", { month: "short", day: "numeric" }) : B.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        return /* @__PURE__ */ N(
          "button",
          {
            type: "button",
            onClick: () => S($),
            "aria-label": `Remove ${Q}`,
            className: `inline-flex items-center gap-1 rounded font-medium cursor-pointer transition-colors ${D ? "bg-zinc-700 text-zinc-200 hover:bg-zinc-600" : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300"} ${H}`,
            children: [
              Q,
              /* @__PURE__ */ o("span", { className: `leading-none ${D ? "text-zinc-400" : "text-zinc-500"}`, "aria-hidden": "true", children: "×" })
            ]
          },
          $
        );
      }) })
    ] })
  ] });
}
function bo({
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
  const u = (v) => t instanceof Set ? t.has(v) : t.includes(v), b = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", g = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", y = r != null || c != null;
  return /* @__PURE__ */ N("div", { className: d, ...s ? { "data-theme": s } : {}, children: [
    y && /* @__PURE__ */ N("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      c != null && /* @__PURE__ */ o("button", { type: "button", disabled: h, onClick: c, className: "ui-checklist-toggleall", children: a ?? (i ? "Deselect all" : "Select all") })
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
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${g}`, "aria-hidden": !0, children: S && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  v.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: v.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: v.label }),
                  v.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: v.secondary })
                ]
              },
              v.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: f })
        ]
      }
    )
  ] });
}
function xo({
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
  const s = a ? "px-2.5 py-1.5 text-xs" : T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", d = a ? "w-3.5 h-3.5" : T ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ N("div", { className: h, ...l ? { "data-theme": l } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ N(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${f ? "ui-checklist-disabled" : ""}`,
        style: i ? { maxHeight: i, overflowY: "auto" } : void 0,
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
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${d}`, "aria-hidden": !0, children: b && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
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
const yo = ({
  className: e,
  children: t,
  reference: n,
  placement: r = "top",
  anchorMode: c = "visible",
  offset: i = 8
}) => {
  const a = we(), { refs: f, floatingStyles: l } = nn({
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
          var I;
          if (c !== "visible") return {};
          const s = (I = h.elements.floating.ownerDocument) == null ? void 0 : I.defaultView;
          if (!s) return {};
          const d = h.rects.reference, u = Math.max(d.x, 0), b = Math.max(d.y, 0), g = Math.min(d.x + d.width, s.innerWidth), y = Math.min(d.y + d.height, s.innerHeight);
          if (g <= u || y <= b) return {};
          const v = r === "left" ? g - (d.x + d.width) : r === "right" ? u - d.x : 0, S = r === "top" ? b - d.y : r === "bottom" ? y - (d.y + d.height) : 0;
          return { x: h.x + v, y: h.y + S };
        }
      },
      on(i),
      sn({ padding: 8 }),
      cn({ padding: 8 }),
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
          const d = h.rects.floating.width, u = h.rects.floating.height, b = Math.max(8, Math.min(h.x, s.innerWidth - d - 8)), g = Math.max(8, Math.min(h.y, s.innerHeight - u - 8));
          return { x: b, y: g };
        }
      }
    ],
    whileElementsMounted: rn
  });
  return le(() => {
    n && f.setReference(n);
  }, [n, f]), /* @__PURE__ */ N(me, { children: [
    !n && /* @__PURE__ */ o("div", { ref: f.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    a && tt(
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
}, $e = ({ content: e, children: t }) => {
  const n = Te(), r = we(), [c, i] = K(!1), [a, f] = K({ x: 0, y: 0 }), l = x(null), h = () => {
    if (!l.current) return;
    const s = l.current.getBoundingClientRect();
    f({ x: s.left + s.width / 2, y: s.top });
  };
  return U(() => (c && r && (h(), r.addEventListener("scroll", h, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", h, !0)), [c]), /* @__PURE__ */ N(
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
        c && tt(
          /* @__PURE__ */ N(
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
}, vo = T ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Qe = T ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", De = T ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", gr = "hover:bg-red-950/50", Ft = T ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Kt = "bg-blue-900/50 border-blue-700 text-blue-300", Wt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", br = T ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", wo = T ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Pe = T ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", xr = "inline-flex rounded overflow-hidden border border-zinc-700", qt = T ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Me = ({ onClick: e, disabled: t, title: n, className: r = Qe, children: c }) => /* @__PURE__ */ o($e, { content: n, children: /* @__PURE__ */ o("button", { onClick: e, disabled: t, "aria-label": n, className: `${r} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: c }) }), ko = ({ value: e, options: t, onChange: n, disabled: r, active: c }) => /* @__PURE__ */ o("div", { className: xr, children: t.map((i) => {
  const a = c ? c(i.v) : e === i.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(i.v),
      className: `${T ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${a ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${i.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: i.l
    },
    i.v
  );
}) }), No = ({ children: e }) => /* @__PURE__ */ N("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: T ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), yr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", vr = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", $o = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ N("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ o("span", { className: n ? yr : vr, children: e }),
  t
] }), Eo = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ N("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), zo = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: r, compact: c }) => /* @__PURE__ */ N(me, { children: [
  /* @__PURE__ */ o(Me, { onClick: () => r(-1), disabled: e, title: "Move up", className: De, children: /* @__PURE__ */ o(Zt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: () => r(1), disabled: e, title: "Move down", className: De, children: /* @__PURE__ */ o(Jt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Me, { onClick: t, disabled: e, title: "Duplicate", className: De, children: /* @__PURE__ */ o(Et, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o("div", { className: Pe }),
  /* @__PURE__ */ o(Me, { onClick: n, disabled: e, title: "Delete", className: `${De} ${gr}`, children: /* @__PURE__ */ o(Ve, { className: "w-2.5 h-2.5" }) })
] }), wr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), kr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Nr = /^(https?:\/\/|mailto:)/i;
function $r(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const c = n.slice(0, r).trim().toLowerCase(), i = n.slice(r + 1).trim();
    kr.has(c) && i && t.push(`${c}: ${i}`);
  }
  return t.join("; ");
}
function et(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), r = () => {
    const f = document.createDocumentFragment();
    for (const l of Array.from(t.childNodes)) f.appendChild(et(l));
    return f;
  };
  if (!wr.has(n)) return r();
  if (n === "a") {
    const f = t.getAttribute("href") || "";
    if (!Nr.test(f)) return r();
  }
  const c = document.createElement(n), i = t.getAttribute("style"), a = $r(i || "");
  if (a && c.setAttribute("style", a), n === "a") {
    c.setAttribute("href", t.getAttribute("href"));
    const f = t.getAttribute("target"), l = t.getAttribute("rel");
    f && c.setAttribute("target", f), l && c.setAttribute("rel", l);
  }
  for (const f of Array.from(t.childNodes)) c.appendChild(et(f));
  return c;
}
function Yt(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Er(e) {
  const t = Yt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const r = document.createDocumentFragment();
  for (const a of Array.from(n.content.childNodes)) r.appendChild(et(a));
  const c = document.createElement("div");
  return c.appendChild(r), c.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Co(e) {
  const t = Yt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function To(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const zr = { text: "#52525b" }, Cr = ({ node: e, selected: t, extension: n, editor: r, view: c, getPos: i }) => {
  var d;
  const a = e.attrs.field ?? "", f = n.options, l = ((d = f.resolve) == null ? void 0 : d.call(f, a)) ?? null, h = (l == null ? void 0 : l.color) ?? zr, s = (l == null ? void 0 : l.label) ?? `{{${a}}}`;
  return /* @__PURE__ */ o(
    un,
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
        const b = typeof i == "function" ? i() : null;
        if (b == null) return;
        const g = c.state.doc.resolve(b), y = g.nodeAfter;
        y && Oe.isSelectable(y) && c.dispatch(c.state.tr.setSelection(new Oe(g))), (v = f.onTokenClick) == null || v.call(f, a, u.currentTarget.getBoundingClientRect(), b);
      },
      children: s
    }
  );
};
function Tr(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function wt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Rr = yn.extend({
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
    return an(Cr);
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
    return ["span", ln({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Lr = 240, Sr = 280, Dr = ({ props: e, highlight: t, onHighlight: n }) => {
  const r = x(null);
  return U(() => {
    var i;
    const c = (i = r.current) == null ? void 0 : i.querySelector('[data-ac-active="1"]');
    c == null || c.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Sr, maxHeight: Lr, zIndex: 9999 }, onMouseDown: (c) => c.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: e.items.map((c, i) => /* @__PURE__ */ N(
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
}, Mr = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const r = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ o(Dr, { props: n, highlight: r, onHighlight: (c) => {
      e.highlight = c, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const c = vn(r);
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
}, Ro = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Ar = pe.forwardRef(({
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
  const d = x(a);
  d.current = a;
  const u = x(f);
  u.current = f;
  const b = x(l);
  b.current = l;
  const g = x(h);
  g.current = h;
  const y = x(null), v = x(null), S = x(t);
  S.current = t;
  const I = x(r);
  I.current = r;
  const A = x(i);
  A.current = i;
  const O = x(null), W = (w) => {
    var H;
    const C = {
      bold: w.isActive("bold"),
      italic: w.isActive("italic"),
      underline: w.isActive("underline"),
      strike: w.isActive("strike"),
      link: w.isActive("link"),
      color: w.getAttributes("textStyle").color || ""
    }, R = O.current;
    R && R.bold === C.bold && R.italic === C.italic && R.underline === C.underline && R.strike === C.strike && R.link === C.link && R.color === C.color || (O.current = C, (H = A.current) == null || H.call(A, C));
  }, M = (w) => {
    var ee;
    const C = w.state.selection;
    let R = null;
    C instanceof Oe && C.node.type.name === "token" ? (R = { key: C.node.attrs.field ?? "", pos: C.from }, y.current = C.from) : y.current != null && (y.current = w.state.tr.mapping.map(y.current));
    const H = v.current, q = H && R && H.key === R.key && H.pos === R.pos;
    !H && !R || q || (v.current = R, (ee = g.current) == null || ee.call(g, R));
  }, D = (w) => {
    const C = Er(Tr(w));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(C) ? "" : C;
  }, j = pe.useMemo(() => {
    const w = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: C }) => {
        var R;
        return ((R = u.current) == null ? void 0 : R.call(u, C)) ?? [];
      },
      command: ({ editor: C, range: R, props: H }) => {
        C.chain().focus().insertContentAt(R, { type: "token", attrs: { field: H.field } }).run();
      },
      render: Mr
    };
    return Rr.configure({
      resolve: d.current ?? null,
      suggestion: w,
      onTokenClick: (C, R, H) => {
        var q;
        y.current = H, (q = b.current) == null || q.call(b, C, R, H);
      }
    });
  }, []), p = dn({
    immediatelyRender: !1,
    extensions: [
      hn,
      mn.configure({ placeholder: n }),
      pn,
      gn,
      xn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      bn.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      j
    ],
    content: wt(e || ""),
    editable: !r,
    onUpdate: ({ editor: w }) => {
      S.current(D(w.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: w }) => {
      W(w), M(w);
    }
  });
  return U(() => {
    if (!p || p.isFocused) return;
    D(p.getHTML()) !== e && (O.current = null, p.commands.setContent(wt(e || ""), { emitUpdate: !1 }), W(p));
  }, [e, p]), U(() => {
    p && p.setEditable(!r);
  }, [r, p]), U(() => {
    p && (O.current = null, W(p), M(p));
  }, [p]), jt(s, () => ({
    exec: (w, C) => {
      if (!(!p || I.current))
        switch (w) {
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
    insertToken: (w) => {
      !p || I.current || p.chain().focus().insertContent({ type: "token", attrs: { field: w } }).run();
    },
    replaceToken: (w) => {
      if (!p || I.current) return;
      const C = y.current;
      C != null && p.commands.command(({ tr: R }) => {
        const H = R.doc.nodeAt(C);
        if (!H || H.type.name !== "token") return !1;
        R.setNodeMarkup(C, void 0, { field: w });
        const q = R.doc.resolve(C);
        return q.nodeAfter && q.nodeAfter.type.name === "token" && R.setSelection(new Oe(q)), !0;
      });
    }
  }), [p]), /* @__PURE__ */ o(fn, { editor: p, className: `richtext-editor ${c || ""}` });
});
Ar.displayName = "RichTextEditor";
const Pr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Ir = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], kt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Lo = ({ value: e, disabled: t, onChange: n }) => {
  const [r, c] = K(!1);
  return /* @__PURE__ */ o(
    Be,
    {
      open: r,
      onOpenChange: c,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${qt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ o(Ct, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Pr.map((i) => /* @__PURE__ */ o(Sn, { onClick: () => {
        n(i), c(!1);
      }, icon: i === e ? /* @__PURE__ */ o($t, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: i }, children: i }) }, i))
    }
  );
}, Or = ({ editorRef: e, disabled: t, active: n }) => {
  const [r, c] = K(!1), [i, a] = K(""), f = () => {
    var h;
    const l = i.trim();
    l && ((h = e.current) == null || h.exec("link", l), c(!1));
  };
  return /* @__PURE__ */ o(
    Be,
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
          className: `${Ft} ${n ? Kt : Wt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(tn, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ N("div", { className: "p-2 flex flex-col gap-2", children: [
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
            className: br + " w-full"
          }
        ),
        /* @__PURE__ */ N("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: f, className: Qe, disabled: !i.trim(), children: "Apply" }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                var l;
                (l = e.current) == null || l.exec("unlink"), c(!1);
              },
              className: Qe,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, So = ({ editorRef: e, disabled: t, active: n, lockedFormatting: r, trailing: c }) => {
  const [i, a] = K(!1), f = (s, d) => {
    var u;
    return (u = e.current) == null ? void 0 : u.exec(s, d);
  }, l = (s) => `${Ft} ${s ? Kt : Wt}`, h = (s) => !!(r != null && r[s]);
  return /* @__PURE__ */ N("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: t || h("bold"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("bold"), className: `${l(((n == null ? void 0 : n.bold) ?? !1) || h("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o($e, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: t || h("italic"), onMouseDown: (s) => s.preventDefault(), onClick: () => f("italic"), className: `${l(((n == null ? void 0 : n.italic) ?? !1) || h("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o($e, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("underline"), className: l((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Qt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o($e, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (s) => s.preventDefault(), onClick: () => f("strikeThrough"), className: l((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(en, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(Or, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: Pe }),
    /* @__PURE__ */ o(
      Be,
      {
        open: i,
        onOpenChange: a,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ N("button", { type: "button", disabled: t, className: `${qt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(kt, {}),
          /* @__PURE__ */ o(Ct, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ N("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                f("unsetColor"), a(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(kt, { className: "w-3.5 h-3.5" })
            }
          ),
          Ir.map((s) => /* @__PURE__ */ o(
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
    c && /* @__PURE__ */ N(me, { children: [
      /* @__PURE__ */ o("div", { className: Pe }),
      c
    ] })
  ] });
};
export {
  po as Button,
  Qn as Checkbox,
  bo as Checklist,
  Eo as ChromeHeader,
  $o as ContentRow,
  oo as ContextMenu,
  so as ContextMenuDivider,
  io as ContextMenuItem,
  co as ContextMenuSub,
  go as DatePicker,
  uo as DialogProvider,
  Sn as DropdownItem,
  Be as DropdownMenu,
  Mn as DropdownSubmenu,
  ct as DropdownThemeContext,
  Pr as FONTS,
  yo as FloatingChrome,
  Lo as FontMenu,
  So as FormatToolbar,
  T as IS_COARSE,
  kn as IS_TOUCH_CAPABLE,
  ro as ItemManagerDropdown,
  ho as LongPressMenuProvider,
  rt as MORPH_EASE,
  ve as MORPH_MS,
  ot as MORPH_OPACITY_MS,
  He as MenuHighlightContext,
  Gn as Modal,
  lo as ModalFooter,
  Se as ModalFooterButton,
  wn as PopoutWindowContext,
  Ro as RICH_TEXT_STATE_IDLE,
  xo as RadioList,
  Ar as RichTextEditor,
  No as SectionHeader,
  ko as Seg,
  zo as StructureControls,
  lt as SubmenuContext,
  Qe as TB_BTN,
  De as TB_BTN_ICON,
  gr as TB_DANGER,
  Pe as TB_DIVIDER,
  br as TB_INPUT,
  wo as TB_NUM,
  qt as TB_PICKER,
  vo as TB_ROW_LABEL,
  xr as TB_SEG,
  Ft as TB_TOGGLE,
  Wt as TB_TOGGLE_OFF,
  Kt as TB_TOGGLE_ON,
  Rr as Token,
  Cr as TokenChipView,
  Me as ToolButton,
  $e as Tooltip,
  it as ZOOM_FROM,
  zn as cloneOverlayClose,
  To as escapeHtml,
  It as getDropdownClasses,
  eo as getHardwareKeyboard,
  Qr as getLastPointerType,
  lr as isInteractiveElement,
  Ge as isTouchLike,
  St as nearestOverlayOrigin,
  Yt as normalizeSpaces,
  Fe as overlayMorphEnabled,
  En as playOverlayClose,
  $n as playOverlayOpen,
  wt as preprocessTokenHtml,
  Er as sanitizeRichText,
  Co as stripRichText,
  Tr as stripTokenWrappers,
  Tt as useCurrentDocument,
  we as useCurrentWindow,
  ao as useDialog,
  Pt as useDropdownTheme,
  Cn as useFixedPosition,
  to as useHardwareKeyboard,
  Nn as useLastPointerType,
  fo as useLongPressOptOut,
  at as useMenuHighlight,
  st as useOverlayMorph,
  nt as usePopoutWindow,
  Te as usePortalTarget,
  no as useSmartPosition,
  mo as useTouchMode
};
