"use client";
import { jsxs as v, jsx as o, Fragment as le } from "react/jsx-runtime";
import ye, { createContext as Me, useContext as Re, useState as W, useEffect as X, useRef as $, useCallback as H, useLayoutEffect as re, useMemo as Je, useImperativeHandle as Mt } from "react";
import * as U from "@radix-ui/react-dropdown-menu";
import { Check as dt, X as Xe, Pencil as Rt, Copy as ft, Trash2 as Oe, RotateCcw as pt, Plus as St, ChevronRight as Ie, ChevronLeft as Pt, ArrowUp as At, ArrowDown as Lt, ChevronDown as ht, Underline as Ot, Strikethrough as It, Link as _t } from "lucide-react";
import * as J from "@radix-ui/react-dialog";
import { createPortal as Fe } from "react-dom";
import { useFloating as Bt, autoUpdate as Ht, offset as Wt, flip as Ut, shift as Xt } from "@floating-ui/react-dom";
import { mergeAttributes as Ft, ReactNodeViewRenderer as Yt, NodeViewWrapper as Kt, useEditor as Gt, EditorContent as qt } from "@tiptap/react";
import { NodeSelection as Ee } from "@tiptap/pm/state";
import jt from "@tiptap/starter-kit";
import Vt from "@tiptap/extension-placeholder";
import { TextStyle as Zt } from "@tiptap/extension-text-style";
import Qt from "@tiptap/extension-color";
import Jt from "@tiptap/extension-link";
import en from "@tiptap/extension-underline";
import { Mention as tn } from "@tiptap/extension-mention";
import { createRoot as nn } from "react-dom/client";
const rn = Me(null);
function Ye() {
  return Re(rn);
}
function fe() {
  const t = Ye();
  return t ? t.document.body : null;
}
function on() {
  const t = Ye();
  return t ? t.document : typeof document < "u" ? document : null;
}
function ae() {
  return Ye() ?? (typeof window < "u" ? window : null);
}
const ve = typeof window < "u", C = ve && window.matchMedia("(pointer: coarse)").matches, sn = ve && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function _e(t) {
  return t === "touch" || t === "pen";
}
let ue = null;
const Be = /* @__PURE__ */ new Set();
ve && window.addEventListener("pointerdown", (t) => {
  ue = t.pointerType, Be.forEach((e) => e());
}, !0);
function Rr() {
  return ue;
}
function cn() {
  const [, t] = W(0), e = $(ue);
  return X(() => {
    const n = () => {
      e.current !== ue && (e.current = ue, t((r) => r + 1));
    };
    return Be.add(n), () => {
      Be.delete(n);
    };
  }, []), ue;
}
const mt = ["(any-hover: hover)", "(any-pointer: fine)"];
function bt() {
  return ve ? mt.some((t) => window.matchMedia(t).matches) : !1;
}
let De = bt();
const He = /* @__PURE__ */ new Set();
function et(t) {
  De !== t && (De = t, He.forEach((e) => e()));
}
var ut;
if (ve) {
  const t = () => et(bt());
  for (const c of mt) {
    const d = window.matchMedia(c);
    (ut = d.addEventListener) == null || ut.call(d, "change", t);
  }
  window.addEventListener("focus", t), document.addEventListener("visibilitychange", t);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && t();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (c) => {
    c.isComposing || c.keyCode !== 229 && (c.key === "Enter" || c.key === "Backspace" || c.key === "Process" || c.key === "Unidentified" || et(!0));
  });
  let n = null, r = null;
  const i = "__penClick", a = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (c) => {
    c.pointerType !== "pen" || c.button !== 0 || (n = { x: c.clientX, y: c.clientY });
  }, !0), window.addEventListener("pointerup", (c) => {
    if (c.pointerType !== "pen") return;
    const d = n;
    if (n = null, !d || Math.hypot(c.clientX - d.x, c.clientY - d.y) > 8) return;
    const s = c.target;
    if (!s || !s.isConnected) return;
    if (s instanceof HTMLInputElement && a.has(s.type)) {
      try {
        s.showPicker();
      } catch {
      }
      return;
    }
    const l = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    l[i] = !0, r = { x: c.clientX, y: c.clientY, time: Date.now() }, s.dispatchEvent(l);
  }, !0), window.addEventListener("click", (c) => {
    c[i] || r && Date.now() - r.time < 1e3 && Math.hypot(c.clientX - r.x, c.clientY - r.y) < 12 && (c.preventDefault(), c.stopPropagation());
  }, !0);
}
function Sr() {
  return De;
}
function Pr() {
  const [, t] = W(0);
  return X(() => {
    const e = () => t((n) => n + 1);
    return He.add(e), () => {
      He.delete(e);
    };
  }, []), De;
}
const de = 220, Ke = "cubic-bezier(0.32, 0.72, 0, 1)", Ge = 170, qe = 0.94;
function Pe(t) {
  return t === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(t, e) {
  const n = e.left + e.width / 2, r = e.top + e.height / 2;
  return {
    x: n < t.left ? 0 : n > t.left + t.width ? 1 : 0.5,
    y: r < t.top ? 0 : r > t.top + t.height ? 1 : 0.5
  };
}
function je(t, e) {
  const n = (e == null ? void 0 : e()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const r = t.getBoundingClientRect();
  return ln({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function an(t, e, n, r) {
  const i = ++t.current, a = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${qe})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    t.current === i && requestAnimationFrame(() => {
      if (t.current !== i) return;
      const c = je(e, n);
      e.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, e.style.transition = `transform ${de}ms ${Ke}, opacity ${Ge}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        t.current === i && (e.style.transition = a.transition, e.style.transform = a.transform, e.style.transformOrigin = a.transformOrigin, e.style.opacity = a.opacity, r == null || r());
      }, de + 60);
    });
  });
}
function un(t, e, n, r) {
  const i = ++t.current, a = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, c = je(e, n);
  e.style.transition = `transform ${de}ms ${Ke}, opacity ${Ge}ms ease`, e.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, e.style.transform = `scale(${qe})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    t.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      t.current !== i || e.isConnected || (e.style.transition = a.transition, e.style.transform = a.transform, e.style.transformOrigin = a.transformOrigin, e.style.opacity = a.opacity, e.style.pointerEvents = a.pointerEvents, e.style.visibility = a.visibility);
    }));
  }, de + 60);
}
function dn(t, e, n) {
  const r = t.cloneNode(!0), i = t.getBoundingClientRect(), a = i.width > 0 || i.height > 0 ? i : n ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${a.left}px`, r.style.top = `${a.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const c = je(t, e);
  r.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, t.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${de}ms ${Ke}, opacity ${Ge}ms ease`, r.style.transform = `scale(${qe})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, de + 60));
    });
  });
}
function Ve(t) {
  const e = $(null), [n, r] = W(!1), i = $(null), a = H((p) => {
    if (t.ref && (t.ref.current = p), p) {
      e.current = p;
      const b = p.getBoundingClientRect();
      (b.width > 0 || b.height > 0) && (i.current = { left: b.left, top: b.top, width: b.width, height: b.height }), r(!0);
      return;
    }
    const h = e.current;
    e.current = null, r(!1), !(!h || !t.cloneOnUnmount || !c.current) && h.style.visibility !== "hidden" && Pe(f.current) && dn(h, s.current, i.current);
  }, []), c = $(t.visible);
  c.current = t.visible;
  const d = $(t.visible), s = $(t.anchor ?? null);
  s.current = t.anchor ?? null;
  const l = $(t.onClosed);
  l.current = t.onClosed;
  const f = $(t.morph !== !1);
  f.current = t.morph !== !1;
  const m = $(0);
  return re(() => {
    if (!n || !c.current || !Pe(f.current)) return;
    const p = e.current;
    p && an(m, p, s.current);
  }, [n, t.visible]), re(() => {
    var b;
    const p = d.current;
    if (d.current = t.visible, t.visible || !p) return;
    const h = e.current;
    if (!h || !Pe(f.current)) {
      (b = l.current) == null || b.call(l);
      return;
    }
    un(m, h, s.current, () => {
      var N;
      return (N = l.current) == null ? void 0 : N.call(l);
    });
  }, [t.visible]), X(() => {
    if (!n || !c.current) return;
    const p = (h) => {
      const b = e.current;
      b && b.contains(h.target) && h.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), a;
}
const gt = Me("dark"), xt = () => Re(gt), fn = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", tt = C ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", pn = C ? "text-xs" : "text-[10px]";
function yt(t) {
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
    headerPad: tt,
    headerText: `${tt} font-semibold uppercase tracking-wider ${pn} ui-label`,
    // Item padding
    itemPad: fn,
    // Input
    input: C ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: C ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
const wt = Me({ activeSub: null, setActiveSub: () => {
}, morph: !0 });
function Se({
  open: t,
  onClose: e,
  onOpenChange: n,
  trigger: r,
  align: i = "left",
  width: a,
  theme: c = "dark",
  children: d,
  morph: s = !0,
  contentClassName: l
}) {
  const [f, m] = W(null), p = fe(), h = $(null), b = $(t);
  b.current = t;
  const [N, g] = W(t);
  X(() => {
    t ? g(!0) : m(null);
  }, [t]);
  const D = H(() => {
    const u = h.current;
    if (!u) return null;
    const w = u.getBoundingClientRect();
    return { left: w.left, top: w.top, width: w.width, height: w.height };
  }, []), S = Ve({
    visible: t,
    morph: s,
    anchor: D,
    onClosed: () => g(!1)
  }), R = H((u) => {
    !u && !b.current || (n ? n(u) : u || e == null || e());
  }, [n, e]), z = $(N);
  z.current = N;
  const P = H(() => {
    !b.current && z.current && (n == null || n(!0));
  }, [n]), B = ye.isValidElement(r) ? r : null, q = B ? ye.cloneElement(B, {
    ref: (u) => {
      h.current = u;
    },
    onClick: (u) => {
      var w, T;
      (T = (w = B.props).onClick) == null || T.call(w, u), P();
    }
  }) : r;
  return /* @__PURE__ */ v(U.Root, { open: t || N, onOpenChange: R, modal: !1, children: [
    /* @__PURE__ */ o(U.Trigger, { asChild: !0, children: q }),
    /* @__PURE__ */ o(U.Portal, { container: p ?? void 0, children: /* @__PURE__ */ o(gt.Provider, { value: c, children: /* @__PURE__ */ o(wt.Provider, { value: { activeSub: f, setActiveSub: m, morph: s }, children: /* @__PURE__ */ o(
      U.Content,
      {
        ref: S,
        "data-theme": c,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${a || ""} ${l || ""}`,
        align: i === "left" ? "start" : "end",
        sideOffset: 8,
        collisionPadding: 8,
        style: { touchAction: "manipulation" },
        children: d
      }
    ) }) }) })
  ] });
}
function Ar({
  open: t,
  onClose: e,
  items: n,
  activeId: r,
  onSelect: i,
  onRename: a,
  onDuplicate: c,
  onDelete: d,
  onCreate: s,
  onImport: l,
  onExport: f,
  onReset: m,
  onTrash: p,
  closeOnSelect: h,
  readOnly: b = !1,
  theme: N,
  align: g,
  label: D,
  header: S,
  itemLabel: R,
  trigger: z,
  minItems: P = 1,
  itemRender: B,
  morph: q = !0,
  contentClassName: K
}) {
  const u = yt(), [w, T] = W(null), [M, I] = W(""), F = $(null), j = $(null);
  X(() => {
    t && requestAnimationFrame(() => {
      var E, L;
      (L = (E = j.current) == null ? void 0 : E.querySelector('[data-active="1"]')) == null || L.scrollIntoView({ block: "nearest" });
    });
  }, [t]), X(() => {
    if (w) {
      requestAnimationFrame(() => {
        var L, V;
        (L = F.current) == null || L.focus(), (V = F.current) == null || V.select();
      });
      const E = n.find((L) => L.id === w);
      E && !M && I(E.name);
    }
  }, [w]), X(() => {
    if (w) {
      const E = n.find((L) => L.id === w);
      E && !M && I(E.name);
    }
  }, [w, n]);
  const ie = (E, L) => {
    T(E), I(L);
  }, k = () => {
    w && M.trim() && a(w, M.trim()), T(null);
  }, y = () => {
    T(null);
  }, G = R || S.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ v(Se, { open: t, onOpenChange: (E) => {
    E ? (T(null), I("")) : (w && M.trim() && a(w, M.trim()), T(null), I("")), (!E || !b) && e(E);
  }, width: "w-80", theme: N, align: g, trigger: z, morph: q, contentClassName: K, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${u.headerText}`, children: S }),
    /* @__PURE__ */ o("div", { ref: j, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((E) => {
      const L = E.id === r, V = w === E.id;
      return /* @__PURE__ */ o("div", { "data-active": L ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${L ? u.rowActiveBg : u.rowHoverBg} ${w && !V ? "opacity-40 pointer-events-none" : ""}`, children: V ? /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${u.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: F,
            value: M,
            onChange: (_) => I(_.target.value),
            onKeyDown: (_) => {
              _.key === "Enter" && (_.preventDefault(), _.stopPropagation(), k()), _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), y());
            },
            className: `w-full border rounded ${u.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${u.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${u.editConfirm}`,
            onSelect: (_) => {
              _.preventDefault(), k();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(dt, { className: u.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${u.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${u.editCancel}`,
            onSelect: (_) => {
              _.preventDefault(), y();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Xe, { className: u.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `flex-1 min-w-0 ${u.itemPad} rounded outline-none cursor-pointer flex items-center ${u.rowText} ${L ? "" : u.rowTextHover}`,
            onSelect: h ? () => {
              i(E.id);
            } : (_) => {
              _.preventDefault(), i(E.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${L ? u.rowActiveText : ""}`, children: B ? B(E) : E.name })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${u.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${L ? u.btnActive : u.btnBase}`,
            onSelect: (_) => {
              _.preventDefault(), ie(E.id, E.name);
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: /* @__PURE__ */ o(Rt, { className: u.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${u.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${L ? u.btnActive : u.btnBase}`,
            onSelect: (_) => {
              _.preventDefault();
              const ne = c(E.id);
              ne && ie(ne, `${E.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: /* @__PURE__ */ o(ft, { className: u.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${u.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= P ? u.btnDisabled : L ? u.btnDangerActive : u.btnDanger}`,
            onSelect: (_) => {
              _.preventDefault(), d(E.id);
            },
            onTouchStart: () => {
            },
            disabled: b || n.length <= P,
            children: /* @__PURE__ */ o(Oe, { className: u.btnIcon })
          }
        )
      ] }) }, E.id);
    }) }),
    /* @__PURE__ */ v("div", { className: `shrink-0 ${w ? "opacity-40 pointer-events-none" : ""}`, children: [
      m && /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ o(U.Separator, { className: u.separator }),
        /* @__PURE__ */ v(
          U.Item,
          {
            className: `w-full text-left ${u.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${u.itemDefault}`,
            onSelect: (E) => {
              E.preventDefault(), m();
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: [
              /* @__PURE__ */ o(pt, { className: `${u.btnIcon} ${u.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || l || f || p) && /* @__PURE__ */ o(U.Separator, { className: u.separator }),
      s && /* @__PURE__ */ v(
        U.Item,
        {
          className: `w-full text-left ${u.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${u.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault();
            const L = s();
            L && ie(L, "");
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ o(St, { className: `${u.btnIcon} ${u.icon}` }),
            "New ",
            G
          ]
        }
      ),
      l && /* @__PURE__ */ v(
        U.Item,
        {
          className: `w-full text-left ${u.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${u.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault(), l();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ v("svg", { className: `${u.btnIcon} ${u.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      f && /* @__PURE__ */ v(
        U.Item,
        {
          className: `w-full text-left ${u.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${u.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ v("svg", { className: `${u.btnIcon} ${u.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      p && /* @__PURE__ */ v(
        U.Item,
        {
          className: `w-full text-left ${u.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${u.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault(), p();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ o(Oe, { className: `${u.btnIcon} ${u.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const hn = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function mn({
  onClick: t,
  icon: e,
  disabled: n = !1,
  variant: r = "default",
  className: i = "",
  children: a,
  keepOpen: c = !1,
  rightAction: d,
  trailing: s
}) {
  xt();
  const l = yt(), f = $(!1), m = $(null), p = r === "danger" ? l.itemDanger : l.itemDefault;
  return /* @__PURE__ */ v(
    U.Item,
    {
      ref: m,
      className: `w-full text-left ${hn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${p} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (h) => {
        if (f.current) {
          f.current = !1;
          return;
        }
        c && h.preventDefault(), t();
      },
      onPointerEnter: () => {
        const h = m.current;
        h && !h.contains(document.activeElement) && h.focus({ preventScroll: !0 });
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        e && /* @__PURE__ */ o("span", { className: `${l.icon} shrink-0`, children: e }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        s && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: s }),
        d && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${l.rightAction}`,
            title: d.title,
            onPointerDown: (h) => {
              h.stopPropagation(), h.preventDefault(), f.current = !0, d.onClick();
            },
            onClick: (h) => {
              h.stopPropagation(), h.preventDefault();
            },
            children: d.icon
          }
        )
      ]
    }
  );
}
const bn = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Lr({ id: t, label: e, icon: n, width: r, side: i = "right", children: a }) {
  const { activeSub: c, setActiveSub: d, morph: s } = Re(wt), l = c === t, f = xt(), m = fe(), p = $(null), [h, b] = W(l), N = !l && h;
  X(() => {
    l && b(!0);
  }, [l]);
  const g = H(() => {
    const z = p.current;
    if (!z) return null;
    const P = z.getBoundingClientRect();
    return { left: P.left, top: P.top, width: P.width, height: P.height };
  }, []), D = Ve({
    visible: l,
    morph: s,
    anchor: g,
    onClosed: () => b(!1)
  }), S = `w-full text-left ${bn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${N ? " ui-sub-closing" : ""}`, R = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"}`;
  return /* @__PURE__ */ v(U.Sub, { open: l || h, onOpenChange: (z) => d(z ? t : null), children: [
    /* @__PURE__ */ v(
      U.SubTrigger,
      {
        ref: p,
        className: S,
        onTouchStart: () => {
        },
        onPointerDown: (z) => {
          z.pointerType === "pen" && (z.preventDefault(), d(l ? null : t));
        },
        children: [
          i === "left" && /* @__PURE__ */ o(Ie, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ v("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ o(Ie, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(U.Portal, { container: m ?? void 0, children: /* @__PURE__ */ o(
      U.SubContent,
      {
        ref: D,
        "data-theme": f,
        className: R,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        children: a
      }
    ) })
  ] });
}
const be = 8, gn = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", xn = C ? "text-sm" : "text-xs", Or = ({ open: t, x: e, y: n, onClose: r, children: i, containerRef: a, morph: c = !0 }) => {
  const d = ye.useRef(null), s = ae(), [l, f] = W(t);
  X(() => {
    t && f(!0);
  }, [t]);
  const m = H(() => ({ left: e, top: n, width: 0, height: 0 }), [e, n]), p = Ve({
    visible: t,
    morph: c,
    anchor: m,
    onClosed: () => f(!1)
  }), h = H((b) => {
    d.current = b, p(b);
  }, [p]);
  return X(() => {
    if (!t || !s) return;
    const b = (g) => {
      d.current && !d.current.contains(g.target) && r();
    }, N = (g) => {
      g.key === "Escape" && r();
    };
    return s.addEventListener("pointerdown", b, !0), s.addEventListener("keydown", N, !0), () => {
      s.removeEventListener("pointerdown", b, !0), s.removeEventListener("keydown", N, !0);
    };
  }, [t, r, s]), re(() => {
    var B;
    if (!t || !d.current) return;
    const b = d.current.getBoundingClientRect(), N = (B = a == null ? void 0 : a.current) == null ? void 0 : B.getBoundingClientRect(), g = N ? N.right : (s == null ? void 0 : s.innerWidth) ?? 0, D = N ? N.bottom : (s == null ? void 0 : s.innerHeight) ?? 0, S = N ? N.left : 0, R = N ? N.top : 0;
    let z = Math.max(R + be, n), P = Math.max(S + be, e);
    P + b.width > g && (P = g - b.width - be), z + b.height > D && (z = Math.max(R + be, D - b.height - be)), d.current.style.top = `${z}px`, d.current.style.left = `${P}px`;
  }, [t, e, n, a]), !t && !l ? null : /* @__PURE__ */ o(
    "div",
    {
      ref: h,
      "data-theme": "light",
      className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${xn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
      style: { top: n, left: e, touchAction: "manipulation" },
      children: i
    }
  );
}, Ir = ({ onClick: t, variant: e = "default", icon: n, disabled: r = !1, children: i }) => /* @__PURE__ */ v(
  "button",
  {
    onClick: r ? void 0 : t,
    onTouchStart: () => {
    },
    className: `w-full text-left ${gn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"}`,
    children: [
      n,
      i
    ]
  }
), _r = () => /* @__PURE__ */ o("div", { className: "ui-sep my-1" });
function yn({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: a = "", labelClassName: c = "", theme: d, variant: s = "pill", tone: l = "accent", block: f = !1 }) {
  const m = s !== "plain", p = C ? "w-5 h-5" : "w-4 h-4", h = C ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", b = C ? "w-3.5 h-3.5" : "w-3 h-3", N = C ? "text-sm" : "text-xs";
  return /* @__PURE__ */ v(
    "label",
    {
      className: `ui-checkbox ${m ? `ui-checkbox-pill ${C ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${l === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${a}`,
      style: { display: f ? "flex" : "inline-flex", alignItems: "center", gap: C ? 10 : 8 },
      onClick: (D) => D.stopPropagation(),
      ...d ? { "data-theme": d } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: t,
            disabled: n,
            onChange: (D) => e(D.target.checked),
            className: "sr-only"
          }
        ),
        m ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: t ? /* @__PURE__ */ v("svg", { viewBox: "0 0 16 16", className: p, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: p, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${h}`, "aria-hidden": !0, children: t && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: b, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${N} ${c}`, children: r })
      ]
    }
  );
}
const wn = C ? "p-6" : "p-5", vn = C ? "text-base" : "text-sm", kn = C ? "w-5 h-5" : "w-4 h-4", Nn = C ? "text-sm" : "text-xs", $n = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", nt = C ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", rt = C ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", ot = C ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", Ne = C ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", vt = Me(null);
function Br() {
  const t = Re(vt);
  if (!t) throw new Error("useDialog must be used within DialogProvider");
  return t;
}
function Hr({ children: t }) {
  const [e, n] = W(null), [r, i] = W(!1), a = fe(), c = ae(), d = $(c);
  d.current = c;
  const s = $(null), l = $(null), [f, m] = W(null), p = $(null), [h, b] = W(null), N = $(null), g = p.current !== null;
  N.current, X(() => {
    e || (m(null), b(null));
  }, [e]);
  const D = H(() => {
    const k = l.current;
    if (!k) return null;
    const y = k.getBoundingClientRect();
    return { left: y.left, top: y.top, width: y.width, height: y.height };
  }, []), S = H((k) => {
    if (k.target.closest("button")) return;
    const y = D();
    y && (m(y), b({ w: y.width, h: y.height }), p.current = { startX: k.clientX, startY: k.clientY, posX: y.left, posY: y.top }, k.target.setPointerCapture(k.pointerId));
  }, [D]), R = H((k) => {
    const y = p.current;
    y && (k.preventDefault(), m({ left: y.posX + k.clientX - y.startX, top: y.posY + k.clientY - y.startY }));
  }, []), z = H(() => {
    p.current = null;
  }, []), P = H((k) => (y) => {
    y.stopPropagation();
    const G = D();
    G && (m(G), b({ w: G.width, h: G.height }), N.current = { dir: k, startX: y.clientX, startY: y.clientY, startL: G.left, startT: G.top, startW: G.width, startH: G.height }, y.target.setPointerCapture(y.pointerId));
  }, [D]), B = 200, q = 100, K = 32, u = H((k) => {
    const y = N.current;
    if (!y) return;
    k.preventDefault();
    const G = k.clientX - y.startX, E = k.clientY - y.startY;
    let L = y.startW, V = y.startH, _ = y.startL, ne = y.startT;
    y.dir.includes("e") && (L = y.startW + G), y.dir.includes("w") && (L = y.startW - G, _ = y.startL + G), y.dir.includes("s") && (V = y.startH + E), y.dir.includes("n") && (V = y.startH - E, ne = y.startT + E);
    const pe = d.current;
    if (!pe) return;
    const he = pe.innerWidth, ke = pe.innerHeight;
    L = Math.max(B, Math.min(L, he - K * 2)), V = Math.max(q, Math.min(V, ke - K * 2)), y.dir.includes("w") && (_ = Math.max(K, Math.min(_, he - L - K))), y.dir.includes("n") && (ne = Math.max(K, Math.min(ne, ke - V - K))), b({ w: L, h: V }), m({ left: _, top: ne });
  }, []), w = H(() => {
    N.current = null;
  }, []), T = H(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), n(null));
  }, [e]), M = H((k) => {
    if (k.suppressKey) {
      const y = localStorage.getItem(k.suppressKey);
      if (y && Date.now() < parseInt(y, 10))
        return Promise.resolve(!0);
    }
    return new Promise((y) => {
      i(!1), n({ kind: "confirm", options: k, resolve: y });
    });
  }, []), I = H((k) => new Promise((y) => {
    n({ kind: "prompt", options: k, resolve: y });
  }), []), F = H((k) => new Promise((y) => {
    n({ kind: "alert", options: k, resolve: y });
  }), []);
  X(() => {
    if (e) {
      const k = setTimeout(() => {
        var y;
        return (y = s.current) == null ? void 0 : y.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [e]);
  const j = () => {
    var k, y;
    !e || e.kind !== "prompt" || (e.resolve(((y = (k = s.current) == null ? void 0 : k.value) == null ? void 0 : y.trim()) || null), n(null));
  }, ie = e !== null;
  return /* @__PURE__ */ v(vt.Provider, { value: { confirm: M, prompt: I, alert: F }, children: [
    t,
    /* @__PURE__ */ o(J.Root, { open: ie, onOpenChange: (k) => {
      k || T();
    }, modal: !0, children: /* @__PURE__ */ v(J.Portal, { container: a ?? void 0, children: [
      /* @__PURE__ */ o(J.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ v(
        J.Content,
        {
          ref: l,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${wn} space-y-4 focus:outline-none ${f || h ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${h ? "" : "w-full max-w-sm"}`,
          style: { ...f ? { left: f.left, top: f.top } : {}, ...h ? { width: h.w, height: h.h } : {} },
          onEscapeKeyDown: (k) => {
            T(), k.preventDefault();
          },
          onPointerDownOutside: (k) => {
            T(), k.preventDefault();
          },
          onKeyDown: (k) => {
            if (k.key === "Enter") {
              if ((e == null ? void 0 : e.kind) === "prompt" && k.target instanceof HTMLInputElement || (k.preventDefault(), !e)) return;
              e.kind === "confirm" ? (e.resolve(!0), n(null)) : e.kind === "prompt" ? j() : (e.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ v(
              "div",
              {
                className: `flex items-center justify-between ${g ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: S,
                onPointerMove: R,
                onPointerUp: z,
                children: [
                  /* @__PURE__ */ o(J.Title, { className: `${vn} ui-dialog-title`, children: e == null ? void 0 : e.options.title }),
                  /* @__PURE__ */ o(J.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ o(Xe, { className: kn }) })
                ]
              }
            ),
            (e == null ? void 0 : e.options.message) && /* @__PURE__ */ o(J.Description, { className: `${Nn} ui-dialog-text`, children: e.options.message }),
            (e == null ? void 0 : e.kind) === "confirm" && e.options.suppressKey && /* @__PURE__ */ o(
              yn,
              {
                block: !0,
                checked: r,
                onChange: i,
                tone: "danger",
                label: "Don't ask again (24 hours)"
              }
            ),
            (e == null ? void 0 : e.kind) === "prompt" && /* @__PURE__ */ o(
              "input",
              {
                ref: s,
                type: "text",
                defaultValue: e.options.defaultValue || "",
                placeholder: e.options.placeholder,
                onKeyDown: (k) => {
                  k.key === "Enter" && j();
                },
                className: `w-full ${$n} ui-input`
              }
            ),
            /* @__PURE__ */ v("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
              (e == null ? void 0 : e.kind) !== "alert" && /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    const k = e;
                    k && (k.kind === "confirm" ? (k.resolve(!1), n(null)) : k.kind === "prompt" && (k.resolve(null), n(null)));
                  },
                  className: `${nt} ui-btn ui-btn-ghost`,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    if (e)
                      if (e.kind === "confirm") {
                        const k = e.options;
                        k.suppressKey && r && localStorage.setItem(k.suppressKey, String(Date.now() + 864e5)), e.resolve(!0), n(null);
                      } else e.kind === "prompt" ? j() : (e.resolve(), n(null));
                  },
                  className: `${nt} ui-btn ${(e == null ? void 0 : e.kind) === "confirm" && e.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (e == null ? void 0 : e.kind) === "alert" ? "OK" : (e == null ? void 0 : e.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ v("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ o("div", { className: `absolute ${rt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: P("n"), onPointerMove: u, onPointerUp: w }),
              /* @__PURE__ */ o("div", { className: `absolute ${rt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: P("s"), onPointerMove: u, onPointerUp: w }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: P("w"), onPointerMove: u, onPointerUp: w }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: P("e"), onPointerMove: u, onPointerUp: w }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 left-0 ${Ne} cursor-nw-resize pointer-events-auto`, onPointerDown: P("nw"), onPointerMove: u, onPointerUp: w }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 right-0 ${Ne} cursor-ne-resize pointer-events-auto`, onPointerDown: P("ne"), onPointerMove: u, onPointerUp: w }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 left-0 ${Ne} cursor-sw-resize pointer-events-auto`, onPointerDown: P("sw"), onPointerMove: u, onPointerUp: w }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 right-0 ${Ne} cursor-se-resize pointer-events-auto`, onPointerDown: P("se"), onPointerMove: u, onPointerUp: w })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const ce = 32, kt = "[data-modal-stack]", oe = 220, we = "cubic-bezier(0.32, 0.72, 0, 1)", Te = 0.94;
function ge() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Nt(t, e) {
  return `translate(${e.left - t.left}px, ${e.top - t.top}px) scale(${e.width / t.width}, ${e.height / t.height})`;
}
function it(t, e, n, r) {
  const i = ++t.current, a = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = Nt(a, n), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === i && (e.style.transition = `transform ${oe}ms ${we}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        t.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, oe + 80));
    });
  });
}
function Cn(t, e, n) {
  const r = ++t.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Te})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === r && (e.style.transition = `transform ${oe}ms ${we}`, e.style.transform = "none", window.setTimeout(() => {
        t.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", n());
      }, oe + 60));
    });
  });
}
function st(t, e, n) {
  const r = ++t.current, i = e.getBoundingClientRect(), a = 1 - Te, c = { left: i.left + i.width * a / 2, top: i.top + i.height * a / 2, width: i.width * Te, height: i.height * Te };
  e.style.transition = `transform ${oe}ms ${we}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Nt(i, c), e.style.opacity = "0", window.setTimeout(() => {
    t.current === r && (e.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      t.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, oe + 60);
}
function Ae(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(kt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Le(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(kt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Tn = C ? "px-6" : "px-5", zn = C ? "py-3" : "py-2.5", En = C ? "text-sm" : "text-xs", Dn = C ? "w-4 h-4" : "w-3.5 h-3.5", Mn = C ? "text-xs" : "text-[10px]", Rn = C ? "w-3.5 h-3.5" : "w-3 h-3", Sn = C ? "px-2.5 py-1.5" : "px-2 py-1", Pn = C ? "px-6" : "px-5", An = C ? "py-3" : "py-2";
function Wr({
  open: t,
  onClose: e,
  title: n,
  icon: r,
  width: i,
  footer: a,
  children: c,
  onReset: d,
  morph: s = !0
}) {
  const l = $(null), f = $(null), m = $(null), [p, h] = W(!1), b = H((x) => {
    l.current = x, h(x !== null);
  }, []), N = fe(), g = ae(), D = $(g);
  D.current = g;
  const [S, R] = W(null), z = $(null), P = $(!1), B = $(!1), [q, K] = W(!1), u = $(0), w = $(!1), T = $(s);
  T.current = s;
  const M = $(!1), I = $(!1), F = () => {
    I.current = !0, K(!0);
  }, j = () => {
    I.current = !1, K(!1);
  };
  X(() => {
    t || (R(null), B.current = !1, P.current = !1);
  }, [t]), re(() => {
    if (!t || B.current || !p || !l.current) return;
    B.current = !0;
    const x = l.current.getBoundingClientRect();
    R({ left: x.left, top: x.top });
  }, [t, p]), re(() => {
    if (!t || !p || !s || ge() || !l.current) return;
    const x = l.current, A = Ae(x), O = A[A.length - 1];
    F(), O ? it(u, x, O.getBoundingClientRect(), j) : Cn(u, x, j);
  }, [t, p]);
  const ie = H(() => {
    if (w.current) return;
    const x = l.current, A = !!x && Ae(x).length > 0;
    if (!x || !s || ge() || A) {
      e();
      return;
    }
    w.current = !0, M.current = !0, F(), st(u, x, () => {
      w.current = !1, j(), e();
    });
  }, [s, e]);
  re(() => () => {
    const x = l.current;
    if (!x || M.current || !T.current || ge() || Ae(x).length > 0) return;
    const A = x.ownerDocument, O = x.cloneNode(!0);
    O.removeAttribute("data-modal-stack"), O.removeAttribute("data-state"), O.removeAttribute("role"), O.removeAttribute("data-aria-hidden"), O.removeAttribute("tabindex"), O.setAttribute("aria-hidden", "true"), O.style.pointerEvents = "none", A.body.appendChild(O), st({ current: 0 }, O, () => {
      O.isConnected && O.remove();
    });
  }, []), X(() => {
    if (!t || !p || !s || !l.current) return;
    const x = l.current, A = x.parentNode;
    if (!A) return;
    let O = 0, Z = null, Y = !1;
    const ee = () => {
      O = 0;
      const Q = Le(x);
      Q.length > 0 ? (Z = Q[Q.length - 1].getBoundingClientRect(), Y = !0, O = requestAnimationFrame(ee)) : Y && (Y = !1, Z && !ge() && (F(), it(u, x, Z, j)), Z = null);
    }, se = new MutationObserver(() => {
      !O && Le(x).length > 0 && (O = requestAnimationFrame(ee));
    });
    return se.observe(A, { childList: !0 }), () => {
      se.disconnect(), O && cancelAnimationFrame(O);
    };
  }, [t, p]), X(() => {
    if (!p || !s || ge() || !l.current) return;
    const x = l.current;
    let A = Math.round(x.getBoundingClientRect().height), O = !1;
    const Z = new ResizeObserver(() => {
      var Qe;
      if (!x.isConnected) return;
      const Y = Math.round(x.getBoundingClientRect().height);
      if (!O) {
        O = !0, A = Y;
        return;
      }
      if (Math.abs(Y - A) < 1) return;
      if (z.current || w.current || Le(x).length > 0) {
        A = Y;
        return;
      }
      if (I.current) return;
      const ee = A;
      A = Y, F();
      const se = x.getBoundingClientRect(), Q = !P.current, me = ((Qe = D.current) == null ? void 0 : Qe.innerHeight) ?? 0, Dt = Q ? (me - ee) / 2 : se.top, Ze = Q ? (me - Y) / 2 : se.top;
      x.style.transition = "none", x.style.height = `${ee}px`, Q && (x.style.top = `${Dt}px`), f.current && (f.current.style.overflow = "hidden"), x.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          x.style.height === `${ee}px` && (x.style.transition = `height ${oe}ms ${we}${Q ? `, top ${oe}ms ${we}` : ""}`, x.style.height = `${Y}px`, Q && (x.style.top = `${Ze}px`), window.setTimeout(() => {
            x.style.height === `${Y}px` && (x.style.transition = "", x.style.height = "", f.current && (f.current.style.overflow = ""), Q && R({ left: se.left, top: Ze }), j());
          }, oe + 60));
        });
      });
    });
    return Z.observe(x), () => Z.disconnect();
  }, [p]);
  const k = H(() => {
    const x = l.current;
    if (!x) return null;
    const A = x.getBoundingClientRect();
    return { left: A.left, top: A.top, width: A.width, height: A.height };
  }, []), y = H((x, A) => {
    var Q, me;
    const O = ((Q = D.current) == null ? void 0 : Q.innerWidth) ?? 0, Z = ((me = D.current) == null ? void 0 : me.innerHeight) ?? 0, Y = k(), ee = Y ? Y.width : Math.min(O - ce * 2, 576), se = Y ? Y.height : Math.min(Z - ce * 2, 400);
    return {
      left: Math.max(ce, Math.min(x, O - ee - ce)),
      top: Math.max(ce, Math.min(A, Z - se - ce))
    };
  }, [k]), G = H((x) => {
    if (x.target.closest("button")) return;
    P.current = !0;
    const A = k();
    A && (R(y(A.left, A.top)), z.current = { startX: x.clientX, startY: x.clientY, posX: A.left, posY: A.top }, x.target.setPointerCapture(x.pointerId));
  }, [k, y]), E = H((x) => {
    const A = z.current;
    A && (x.preventDefault(), R(y(A.posX + x.clientX - A.startX, A.posY + x.clientY - A.startY)));
  }, [y]), L = H(() => {
    z.current = null;
  }, []), V = z.current !== null, _ = S !== null, ne = _ ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, he = {
    ..._ ? { left: S.left, top: S.top } : {},
    width: `min(100%, calc(100vw - ${ce * 2}px))`,
    maxHeight: `calc(100vh - ${ce * 2}px)`
  }, ke = H((x) => {
    if (x.key !== "Enter" || x.shiftKey || x.metaKey || x.ctrlKey || x.altKey || x.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const O = m.current;
    if (!O) return;
    const Z = Array.from(O.querySelectorAll("button[data-modal-confirm]")), Y = Z.length > 0 ? Z : Array.from(O.querySelectorAll("button")), ee = Y[Y.length - 1];
    !ee || ee.disabled || (x.preventDefault(), ee.click());
  }, []);
  return /* @__PURE__ */ o(J.Root, { open: t, onOpenChange: (x) => {
    x || ie();
  }, children: /* @__PURE__ */ v(J.Portal, { container: N ?? void 0, children: [
    /* @__PURE__ */ o(
      J.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (x) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (x.preventDefault(), ie());
        }
      }
    ),
    /* @__PURE__ */ v(
      J.Content,
      {
        ref: b,
        onKeyDown: ke,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ne} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(he).length > 0 ? he : {} },
        children: [
          /* @__PURE__ */ v(
            "div",
            {
              className: `flex items-center justify-between ${Tn} ${zn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${V ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (x) => {
                q || G(x);
              },
              onPointerMove: E,
              onPointerUp: L,
              children: [
                /* @__PURE__ */ v("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(J.Title, { className: `${En} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
                  d && /* @__PURE__ */ v("button", { onClick: d, className: `flex items-center gap-1 ${Mn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Sn} shrink-0`, children: [
                    /* @__PURE__ */ o(pt, { className: Rn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ o(J.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(Xe, { className: Dn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: f, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          a && /* @__PURE__ */ o("div", { ref: m, className: "shrink-0", children: a })
        ]
      }
    )
  ] }) });
}
function Ur({ children: t }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${Pn} ${An} border-t border-zinc-800 bg-zinc-950`, children: t });
}
const Ln = 500, On = 250, In = 5, te = 88, ct = 4;
function _n(t, e) {
  const n = t.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const i = performance.now(), a = (c) => {
    const d = c - i, s = Math.min(d / e, 1);
    n.style.strokeDashoffset = String(r * (1 - s)), s < 1 && requestAnimationFrame(a);
  };
  requestAnimationFrame(a);
}
function Bn({ x: t, y: e, ms: n }) {
  const r = $(null), i = fe();
  return X(() => {
    r.current && _n(r.current, n);
  }, [n]), Fe(
    /* @__PURE__ */ o(
      "div",
      {
        style: {
          position: "fixed",
          left: t - te / 2,
          top: e - te / 2,
          width: te,
          height: te,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ v("svg", { ref: r, width: te, height: te, viewBox: `0 0 ${te} ${te}`, children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: te / 2,
              cy: te / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: ct + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ o(
            "circle",
            {
              cx: te / 2,
              cy: te / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: ct,
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
function Xr() {
  return { "data-no-longpress": "true" };
}
function Hn(t) {
  const e = t.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || t.isContentEditable || t.closest("[data-no-longpress]") || t.closest("button, input, select, textarea"));
}
function Fr({
  children: t,
  showRing: e = !0,
  longPressMs: n = Ln,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: a
}) {
  const [c, d] = W(null), s = on(), l = $(null), f = $(null), m = $({ x: 0, y: 0, target: null }), p = $(!1), h = Math.min(On, n * 0.5), b = $(i);
  b.current = i;
  const N = $(a);
  return N.current = a, X(() => {
    if (!C || !s) return;
    const g = (z) => {
      if (!_e(z.pointerType) || z.button !== 0) return;
      const P = z.target;
      if (!P.closest(r) || (b.current ? !b.current(P) : Hn(P))) return;
      const B = z.clientX, q = z.clientY;
      m.current = { x: B, y: q, target: z.target }, p.current = !0, e && (f.current = setTimeout(() => d({ x: B, y: q }), h)), l.current = setTimeout(() => {
        if (!p.current) return;
        f.current && (clearTimeout(f.current), f.current = null), d(null);
        const K = m.current.target;
        if (!K) return;
        const u = N.current;
        if (u) {
          u(K, B, q);
          return;
        }
        const w = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: B,
          clientY: q,
          button: 2,
          view: window
        });
        K.dispatchEvent(w);
      }, n);
    }, D = (z) => {
      if (!p.current || l.current === null) return;
      const P = z.clientX - m.current.x, B = z.clientY - m.current.y;
      Math.sqrt(P * P + B * B) > In && (clearTimeout(l.current), l.current = null, f.current && (clearTimeout(f.current), f.current = null), p.current = !1, d(null));
    }, S = () => {
      l.current !== null && (clearTimeout(l.current), l.current = null), f.current !== null && (clearTimeout(f.current), f.current = null), p.current = !1, d(null);
    }, R = (z) => {
      _e(z.pointerType) && (l.current !== null && (clearTimeout(l.current), l.current = null), f.current !== null && (clearTimeout(f.current), f.current = null), p.current = !1, d(null));
    };
    return s == null || s.addEventListener("pointerdown", g), s.addEventListener("pointermove", D), s.addEventListener("pointerup", S), s.addEventListener("pointercancel", S), s.addEventListener("pointerleave", R), () => {
      s.removeEventListener("pointerdown", g), s.removeEventListener("pointermove", D), s.removeEventListener("pointerup", S), s == null || s.removeEventListener("pointercancel", S), s == null || s.removeEventListener("pointerleave", R), l.current !== null && clearTimeout(l.current), f.current !== null && clearTimeout(f.current);
    };
  }, [e, n, h, r]), /* @__PURE__ */ v(le, { children: [
    t,
    e && c && /* @__PURE__ */ o(Bn, { x: c.x, y: c.y, ms: n - h })
  ] });
}
function Yr(t, e) {
  const n = ae(), r = $(n);
  r.current = n, re(() => {
    if (!e || !t.current) return;
    const i = t.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const a = r.current;
    if (!a) return;
    const c = t.current.getBoundingClientRect(), d = i.getBoundingClientRect(), s = a.innerWidth, l = a.innerHeight, f = d.right - s;
    if (f > 0) {
      const m = Math.min(f + 8, d.left);
      i.style.left = `${d.left - c.left - m}px`;
    }
    d.left < 0 && (i.style.left = `${-c.left + 4}px`), d.bottom > l + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${l - 8}px`));
  }, [e, t]);
}
function Kr(t, e, n) {
  const r = ae(), i = $(r);
  i.current = r, re(() => {
    if (!e || !t.current) return;
    const a = t.current;
    requestAnimationFrame(() => {
      var D, S;
      const c = a.getBoundingClientRect(), d = i.current;
      if (!d) return;
      const s = d.innerWidth, l = ((D = d.visualViewport) == null ? void 0 : D.height) ?? d.innerHeight, f = ((S = d.visualViewport) == null ? void 0 : S.offsetTop) ?? 0, m = 200, p = 4, h = 120;
      let b = Math.max(0, c.left);
      b + m > s && (b = Math.max(0, s - m - 8));
      const N = f + l - c.bottom - p - 16, g = c.top - f - p - 16;
      if (N >= h || N >= g) {
        const R = Math.min(c.bottom + p, f + l), z = Math.max(h, f + l - R - 16);
        n({ top: R, left: b, width: c.width, maxH: z });
      } else {
        const R = Math.max(h, Math.min(g, 360)), z = f + l - (c.top - p);
        n({ top: 0, left: b, width: c.width, maxH: R, bottom: Math.max(0, z) });
      }
    });
  }, [e, t]);
}
function Gr() {
  const t = cn();
  return sn ? t === null || _e(t) : !1;
}
const Wn = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", Un = {
  light: {
    subtle: "px-2.5 py-1 text-zinc-600 hover:bg-zinc-200",
    primary: "px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-white",
    "danger-ghost": "px-2.5 py-1 text-rose-600 hover:bg-rose-50"
  },
  dark: {
    subtle: "px-2.5 py-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800",
    primary: "px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white",
    "danger-ghost": "px-2.5 py-1 text-red-400 hover:bg-rose-950/40"
  }
};
function qr({
  variant: t = "subtle",
  theme: e = "light",
  cloud: n = !1,
  className: r = "",
  type: i = "button",
  ...a
}) {
  let c = Un[e][t];
  return t === "primary" && e === "light" && n && (c = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white"), /* @__PURE__ */ o("button", { type: i, className: `${Wn} ${c} ${r}`, ...a });
}
const Xn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${C ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Fn = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function jr({
  variant: t = "hero",
  className: e = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: n,
      className: `${Xn} ${Fn[t]} ${e}`,
      ...r
    }
  );
}
const Yn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Kn(t, e) {
  return new Date(t, e + 1, 0).getDate();
}
function Gn(t, e, n) {
  return `${t}-${String(e + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Vr({ selected: t, onChange: e, theme: n = "light", showChips: r = !0, className: i = "" }) {
  const a = /* @__PURE__ */ new Date(), [c, d] = W(a.getFullYear()), [s, l] = W(a.getMonth()), f = Je(() => new Set(t), [t]), m = (g) => {
    f.has(g) ? e(t.filter((D) => D !== g)) : e([...t, g]);
  }, p = Je(() => {
    const g = Kn(c, s), D = new Date(c, s, 1).getDay(), S = [];
    for (let R = 0; R < D; R++) S.push({ key: `pad-${R}`, day: 0, empty: !0 });
    for (let R = 1; R <= g; R++) S.push({ key: Gn(c, s, R), day: R, empty: !1 });
    return S;
  }, [c, s]), h = n === "dark", b = C ? "py-2" : "py-1.5", N = C ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ v("div", { className: `border rounded-lg overflow-hidden w-full ${h ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ v("div", { className: `flex items-center justify-between px-3 py-2 border-b ${h ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (d((g) => g - 1), l(11)) : l((g) => g - 1);
          },
          className: `p-1 rounded transition-colors ${h ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ o(Pt, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ o("span", { className: `text-sm font-semibold ${h ? "text-zinc-100" : "text-zinc-800"}`, children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" }) }),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 11 ? (d((g) => g + 1), l(0)) : l((g) => g + 1);
          },
          className: `p-1 rounded transition-colors ${h ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ o(Ie, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "grid grid-cols-7 text-center", children: [
      Yn.map((g) => /* @__PURE__ */ o("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${h ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: g }, g)),
      p.map((g) => g.empty ? /* @__PURE__ */ o("div", {}, g.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => m(g.key),
          className: `${b} text-xs font-medium transition-colors border-b ${h ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${f.has(g.key) ? h ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: g.day
        },
        g.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ v("div", { className: `px-3 py-2 border-t ${h ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ v("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: t.map((g) => {
        const S = (/* @__PURE__ */ new Date(g + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ v("span", { className: `inline-flex items-center gap-1 rounded font-medium ${h ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${N}`, children: [
          S,
          /* @__PURE__ */ o("button", { type: "button", onClick: () => m(g), className: `hover:opacity-70 leading-none ${h ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${S}`, children: "×" })
        ] }, g);
      }) })
    ] })
  ] });
}
function Zr({
  items: t,
  selected: e,
  onToggle: n,
  title: r,
  onToggleAll: i,
  allSelected: a = !1,
  toggleAllLabel: c,
  emptyHint: d = "Nothing here",
  maxHeight: s,
  disabled: l = !1,
  theme: f,
  className: m = ""
}) {
  const p = (g) => e instanceof Set ? e.has(g) : e.includes(g), h = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", b = C ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", N = r != null || i != null;
  return /* @__PURE__ */ v("div", { className: m, ...f ? { "data-theme": f } : {}, children: [
    N && /* @__PURE__ */ v("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ o("button", { type: "button", disabled: l, onClick: i, className: "ui-checklist-toggleall", children: c ?? (a ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ v(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          t.map((g) => {
            const D = p(g.id);
            return /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => n(g.id),
                className: `ui-checklist-item ${h} ${D ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${b}`, "aria-hidden": !0, children: D && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  g.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: d })
        ]
      }
    )
  ] });
}
function Qr({
  items: t,
  value: e,
  onChange: n,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: a,
  compact: c = !1,
  disabled: d = !1,
  theme: s,
  className: l = ""
}) {
  const f = c ? "px-2.5 py-1.5 text-xs" : C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", m = c ? "w-3.5 h-3.5" : C ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ v("div", { className: l, ...s ? { "data-theme": s } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ v(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${d ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          t.map((p) => {
            const h = e === p.id;
            return /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: d,
                onClick: () => n(p.id),
                className: `ui-checklist-item ${f} ${h ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${m}`, "aria-hidden": !0, children: h && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  p.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: p.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: p.label }),
                  p.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: p.secondary })
                ]
              },
              p.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const Jr = ({
  className: t,
  children: e,
  reference: n,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: a = 8
}) => {
  const c = ae(), { refs: d, floatingStyles: s } = Bt({
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
        fn: (l) => {
          var S;
          if (i !== "visible") return {};
          const f = (S = l.elements.floating.ownerDocument) == null ? void 0 : S.defaultView;
          if (!f) return {};
          const m = l.rects.reference, p = Math.max(m.x, 0), h = Math.max(m.y, 0), b = Math.min(m.x + m.width, f.innerWidth), N = Math.min(m.y + m.height, f.innerHeight);
          if (b <= p || N <= h) return {};
          const g = r === "left" ? b - (m.x + m.width) : r === "right" ? p - m.x : 0, D = r === "top" ? h - m.y : r === "bottom" ? N - (m.y + m.height) : 0;
          return { x: l.x + g, y: l.y + D };
        }
      },
      Wt(a),
      Ut({ padding: 8 }),
      Xt({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (l) => {
          var N;
          const f = (N = l.elements.floating.ownerDocument) == null ? void 0 : N.defaultView;
          if (!f) return {};
          const m = l.rects.floating.width, p = l.rects.floating.height, h = Math.max(8, Math.min(l.x, f.innerWidth - m - 8)), b = Math.max(8, Math.min(l.y, f.innerHeight - p - 8));
          return { x: h, y: b };
        }
      }
    ],
    whileElementsMounted: Ht
  });
  return re(() => {
    n && d.setReference(n);
  }, [n, d]), /* @__PURE__ */ v(le, { children: [
    !n && /* @__PURE__ */ o("div", { ref: d.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    c && Fe(
      /* @__PURE__ */ o(
        "div",
        {
          ref: d.setFloating,
          className: `ui-chrome ${t}`,
          style: s,
          onMouseDown: (l) => l.stopPropagation(),
          onClick: (l) => l.stopPropagation(),
          onDragStart: (l) => l.preventDefault(),
          children: e
        }
      ),
      c.document.body
    )
  ] });
}, xe = ({ content: t, children: e }) => {
  const n = fe(), r = ae(), [i, a] = W(!1), [c, d] = W({ x: 0, y: 0 }), s = $(null), l = () => {
    if (!s.current) return;
    const f = s.current.getBoundingClientRect();
    d({ x: f.left + f.width / 2, y: f.top });
  };
  return X(() => (i && r && (l(), r.addEventListener("scroll", l, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", l, !0)), [i]), /* @__PURE__ */ v(
    "div",
    {
      ref: s,
      className: "inline-flex",
      onMouseEnter: () => {
        l(), a(!0);
      },
      onMouseLeave: () => a(!1),
      children: [
        e,
        i && Fe(
          /* @__PURE__ */ v(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: c.x, top: c.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                t.split(`
• `).map((f, m) => /* @__PURE__ */ o("div", { className: m > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: f }, m)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, eo = C ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", We = C ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", $e = C ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", qn = "hover:bg-red-950/50", $t = C ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ct = "bg-blue-900/50 border-blue-700 text-blue-300", Tt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", jn = C ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", to = C ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", ze = C ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Vn = "inline-flex rounded overflow-hidden border border-zinc-700", zt = C ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ce = ({ onClick: t, disabled: e, title: n, className: r = We, children: i }) => /* @__PURE__ */ o(xe, { content: n, children: /* @__PURE__ */ o("button", { onClick: t, disabled: e, "aria-label": n, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), no = ({ value: t, options: e, onChange: n, disabled: r, active: i }) => /* @__PURE__ */ o("div", { className: Vn, children: e.map((a) => {
  const c = i ? i(a.v) : t === a.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(a.v),
      className: `${C ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${c ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${a.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: a.l
    },
    a.v
  );
}) }), ro = ({ children: t }) => /* @__PURE__ */ v("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: C ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Zn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Qn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", oo = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ v("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ o("span", { className: n ? Zn : Qn, children: t }),
  e
] }), io = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ v("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  t,
  e && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: e })
] }), so = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => /* @__PURE__ */ v(le, { children: [
  /* @__PURE__ */ o(Ce, { onClick: () => r(-1), disabled: t, title: "Move up", className: $e, children: /* @__PURE__ */ o(At, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Ce, { onClick: () => r(1), disabled: t, title: "Move down", className: $e, children: /* @__PURE__ */ o(Lt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Ce, { onClick: e, disabled: t, title: "Duplicate", className: $e, children: /* @__PURE__ */ o(ft, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o("div", { className: ze }),
  /* @__PURE__ */ o(Ce, { onClick: n, disabled: t, title: "Delete", className: `${$e} ${qn}`, children: /* @__PURE__ */ o(Oe, { className: "w-2.5 h-2.5" }) })
] }), Jn = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), er = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), tr = /^(https?:\/\/|mailto:)/i;
function nr(t) {
  if (!t) return "";
  const e = [];
  for (const n of t.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const i = n.slice(0, r).trim().toLowerCase(), a = n.slice(r + 1).trim();
    er.has(i) && a && e.push(`${i}: ${a}`);
  }
  return e.join("; ");
}
function Ue(t) {
  if (t.nodeType === Node.TEXT_NODE) return t;
  if (t.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = t, n = e.tagName.toLowerCase(), r = () => {
    const d = document.createDocumentFragment();
    for (const s of Array.from(e.childNodes)) d.appendChild(Ue(s));
    return d;
  };
  if (!Jn.has(n)) return r();
  if (n === "a") {
    const d = e.getAttribute("href") || "";
    if (!tr.test(d)) return r();
  }
  const i = document.createElement(n), a = e.getAttribute("style"), c = nr(a || "");
  if (c && i.setAttribute("style", c), n === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const d = e.getAttribute("target"), s = e.getAttribute("rel");
    d && i.setAttribute("target", d), s && i.setAttribute("rel", s);
  }
  for (const d of Array.from(e.childNodes)) i.appendChild(Ue(d));
  return i;
}
function Et(t) {
  return t.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function rr(t) {
  const e = Et(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  n.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const c of Array.from(n.content.childNodes)) r.appendChild(Ue(c));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function co(t) {
  const e = Et(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  return n.innerHTML = e, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function lo(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const or = { text: "#52525b" }, ir = ({ node: t, selected: e, extension: n, editor: r, view: i, getPos: a }) => {
  var m;
  const c = t.attrs.field ?? "", d = n.options, s = ((m = d.resolve) == null ? void 0 : m.call(d, c)) ?? null, l = (s == null ? void 0 : s.color) ?? or, f = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
  return /* @__PURE__ */ o(
    Kt,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${e ? "rt-token-selected" : ""}`,
      style: {
        background: l.text,
        color: "#fff",
        borderRadius: 2,
        padding: 4,
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      onMouseDown: (p) => {
        var g;
        if (p.button !== 0 || !r.isEditable) return;
        p.preventDefault(), r.isFocused || r.commands.focus();
        const h = typeof a == "function" ? a() : null;
        if (h == null) return;
        const b = i.state.doc.resolve(h), N = b.nodeAfter;
        N && Ee.isSelectable(N) && i.dispatch(i.state.tr.setSelection(new Ee(b))), (g = d.onTokenClick) == null || g.call(d, c, p.currentTarget.getBoundingClientRect(), h);
      },
      children: f
    }
  );
};
function sr(t) {
  return t.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function lt(t) {
  return t.replace(/\{\{([^{}]+)\}\}/g, (e, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const cr = tn.extend({
  name: "token",
  selectable: !0,
  addOptions() {
    var t;
    return {
      ...(t = this.parent) == null ? void 0 : t.call(this),
      resolve: null,
      onTokenClick: null
    };
  },
  addNodeView() {
    return Yt(ir);
  },
  addAttributes() {
    return {
      field: {
        default: null,
        parseHTML: (t) => t.getAttribute("data-field"),
        renderHTML: (t) => t.field ? { "data-field": t.field } : {}
      },
      label: {
        default: null,
        parseHTML: (t) => t.getAttribute("data-label"),
        renderHTML: (t) => t.label ? { "data-label": t.label } : {}
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
  renderHTML({ node: t, HTMLAttributes: e }) {
    return ["span", Ft({ "data-type": "token" }, e), `{{${t.attrs.field ?? ""}}}`];
  },
  renderText({ node: t }) {
    return `{{${t.attrs.field ?? ""}}}`;
  }
}), lr = 240, ar = 280, ur = ({ props: t, highlight: e, onHighlight: n }) => {
  const r = $(null);
  return X(() => {
    var a;
    const i = (a = r.current) == null ? void 0 : a.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [e]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: ar, maxHeight: lr, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: t.items.map((i, a) => /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      "data-ac-active": a === e ? "1" : void 0,
      onMouseEnter: () => n(a),
      onClick: () => t.command({ field: i.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${a === e ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ o("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: i.color.text } }),
        /* @__PURE__ */ o("span", { className: "truncate flex-1", children: i.label }),
        i.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] text-zinc-600", children: i.group })
      ]
    },
    i.key
  )) }) });
}, dr = () => {
  let t = null;
  const e = (n) => {
    if (!t) return;
    t.props = n;
    const r = t.highlight;
    t.holder.style.display = n.items.length > 0 ? "" : "none", t.root.render(/* @__PURE__ */ o(ur, { props: n, highlight: r, onHighlight: (i) => {
      t.highlight = i, e(t.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const i = nn(r);
      t = { holder: r, root: i, unmount: null, props: n, highlight: 0 };
      const a = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: c, y: d, placement: s }) => {
          var m, p;
          if (!t) return;
          const l = (p = (m = t.props) == null ? void 0 : m.clientRect) == null ? void 0 : p.call(m), f = l && !s.endsWith("-end") ? l.width : 0;
          r.style.left = `${c + f}px`, r.style.top = `${d}px`;
        }
      });
      t.unmount = a, e(n);
    },
    onUpdate(n) {
      t && e(n);
    },
    onKeyDown({ event: n }) {
      var c;
      if (!(t != null && t.props)) return !1;
      const { items: r, command: i } = t.props;
      if (r.length === 0) return !1;
      const a = n.key;
      return a === "ArrowDown" ? (n.preventDefault(), t.highlight = Math.min(t.highlight + 1, r.length - 1), e(t.props), !0) : a === "ArrowUp" ? (n.preventDefault(), t.highlight = Math.max(t.highlight - 1, 0), e(t.props), !0) : a === "Enter" || a === "Tab" ? (n.preventDefault(), i({ field: ((c = r[t.highlight]) == null ? void 0 : c.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      t && ((n = t.unmount) == null || n.call(t), t.root.unmount(), t.holder.remove(), t = null);
    }
  };
}, ao = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, fr = ye.forwardRef(({
  value: t,
  onChange: e,
  placeholder: n,
  disabled: r,
  className: i,
  onStateChange: a,
  resolveToken: c,
  suggestionItems: d,
  onTokenClick: s,
  onSelectionChange: l
}, f) => {
  const m = $(c);
  m.current = c;
  const p = $(d);
  p.current = d;
  const h = $(s);
  h.current = s;
  const b = $(l);
  b.current = l;
  const N = $(null), g = $(null), D = $(e);
  D.current = e;
  const S = $(r);
  S.current = r;
  const R = $(a);
  R.current = a;
  const z = $(null), P = (w) => {
    var I;
    const T = {
      bold: w.isActive("bold"),
      italic: w.isActive("italic"),
      underline: w.isActive("underline"),
      strike: w.isActive("strike"),
      link: w.isActive("link"),
      color: w.getAttributes("textStyle").color || ""
    }, M = z.current;
    M && M.bold === T.bold && M.italic === T.italic && M.underline === T.underline && M.strike === T.strike && M.link === T.link && M.color === T.color || (z.current = T, (I = R.current) == null || I.call(R, T));
  }, B = (w) => {
    var j;
    const T = w.state.selection;
    let M = null;
    T instanceof Ee && T.node.type.name === "token" ? (M = { key: T.node.attrs.field ?? "", pos: T.from }, N.current = T.from) : N.current != null && (N.current = w.state.tr.mapping.map(N.current));
    const I = g.current, F = I && M && I.key === M.key && I.pos === M.pos;
    !I && !M || F || (g.current = M, (j = b.current) == null || j.call(b, M));
  }, q = (w) => {
    const T = rr(sr(w));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(T) ? "" : T;
  }, K = ye.useMemo(() => {
    const w = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: T }) => {
        var M;
        return ((M = p.current) == null ? void 0 : M.call(p, T)) ?? [];
      },
      command: ({ editor: T, range: M, props: I }) => {
        T.chain().focus().insertContentAt(M, { type: "token", attrs: { field: I.field } }).run();
      },
      render: dr
    };
    return cr.configure({
      resolve: m.current ?? null,
      suggestion: w,
      onTokenClick: (T, M, I) => {
        var F;
        N.current = I, (F = h.current) == null || F.call(h, T, M, I);
      }
    });
  }, []), u = Gt({
    immediatelyRender: !1,
    extensions: [
      jt,
      Vt.configure({ placeholder: n }),
      Zt,
      Qt,
      en,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Jt.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      K
    ],
    content: lt(t || ""),
    editable: !r,
    onUpdate: ({ editor: w }) => {
      D.current(q(w.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: w }) => {
      P(w), B(w);
    }
  });
  return X(() => {
    if (!u || u.isFocused) return;
    q(u.getHTML()) !== t && (z.current = null, u.commands.setContent(lt(t || ""), { emitUpdate: !1 }), P(u));
  }, [t, u]), X(() => {
    u && u.setEditable(!r);
  }, [r, u]), X(() => {
    u && (z.current = null, P(u), B(u));
  }, [u]), Mt(f, () => ({
    exec: (w, T) => {
      if (!(!u || S.current))
        switch (w) {
          case "bold":
            u.chain().focus().toggleBold().run();
            break;
          case "italic":
            u.chain().focus().toggleItalic().run();
            break;
          case "underline":
            u.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            u.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            T && u.chain().focus().setColor(T).run();
            break;
          case "unsetColor":
            u.chain().focus().unsetColor().run();
            break;
          case "link":
            T && u.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
            break;
          case "unlink":
            u.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => u == null ? void 0 : u.commands.focus(),
    insertToken: (w) => {
      !u || S.current || u.chain().focus().insertContent({ type: "token", attrs: { field: w } }).run();
    },
    replaceToken: (w) => {
      if (!u || S.current) return;
      const T = N.current;
      T != null && u.commands.command(({ tr: M }) => {
        const I = M.doc.nodeAt(T);
        if (!I || I.type.name !== "token") return !1;
        M.setNodeMarkup(T, void 0, { field: w });
        const F = M.doc.resolve(T);
        return F.nodeAfter && F.nodeAfter.type.name === "token" && M.setSelection(new Ee(F)), !0;
      });
    }
  }), [u]), /* @__PURE__ */ o(qt, { editor: u, className: `richtext-editor ${i || ""}` });
});
fr.displayName = "RichTextEditor";
const pr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], hr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], at = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), uo = ({ value: t, disabled: e, onChange: n }) => {
  const [r, i] = W(!1);
  return /* @__PURE__ */ o(
    Se,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ v("button", { type: "button", disabled: e, className: `${zt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ o(ht, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: pr.map((a) => /* @__PURE__ */ o(mn, { onClick: () => {
        n(a), i(!1);
      }, icon: a === t ? /* @__PURE__ */ o(dt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: a }, children: a }) }, a))
    }
  );
}, mr = ({ editorRef: t, disabled: e, active: n }) => {
  const [r, i] = W(!1), [a, c] = W(""), d = () => {
    var l;
    const s = a.trim();
    s && ((l = t.current) == null || l.exec("link", s), i(!1));
  };
  return /* @__PURE__ */ o(
    Se,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          disabled: e,
          onMouseDown: (s) => s.preventDefault(),
          className: `${$t} ${n ? Ct : Tt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(_t, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ v("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ o(
          "input",
          {
            value: a,
            onChange: (s) => c(s.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (s) => {
              s.key === "Enter" && (s.preventDefault(), d());
            },
            className: jn + " w-full"
          }
        ),
        /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: d, className: We, disabled: !a.trim(), children: "Apply" }),
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                var s;
                (s = t.current) == null || s.exec("unlink"), i(!1);
              },
              className: We,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, fo = ({ editorRef: t, disabled: e, active: n, lockedFormatting: r, trailing: i }) => {
  const [a, c] = W(!1), d = (f, m) => {
    var p;
    return (p = t.current) == null ? void 0 : p.exec(f, m);
  }, s = (f) => `${$t} ${f ? Ct : Tt}`, l = (f) => !!(r != null && r[f]);
  return /* @__PURE__ */ v("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: e || l("bold"), onMouseDown: (f) => f.preventDefault(), onClick: () => d("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || l("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: e || l("italic"), onMouseDown: (f) => f.preventDefault(), onClick: () => d("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || l("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o(xe, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: e, onMouseDown: (f) => f.preventDefault(), onClick: () => d("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Ot, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o(xe, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: e, onMouseDown: (f) => f.preventDefault(), onClick: () => d("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(It, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: ze }),
    /* @__PURE__ */ o(mr, { editorRef: t, disabled: e, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: ze }),
    /* @__PURE__ */ o(
      Se,
      {
        open: a,
        onOpenChange: c,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ v("button", { type: "button", disabled: e, className: `${zt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(at, {}),
          /* @__PURE__ */ o(ht, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ v("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                d("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(at, { className: "w-3.5 h-3.5" })
            }
          ),
          hr.map((f) => /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                d("foreColor", f), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${f === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: f },
              title: f
            },
            f
          ))
        ] })
      }
    ),
    i && /* @__PURE__ */ v(le, { children: [
      /* @__PURE__ */ o("div", { className: ze }),
      i
    ] })
  ] });
};
export {
  qr as Button,
  yn as Checkbox,
  Zr as Checklist,
  io as ChromeHeader,
  oo as ContentRow,
  Or as ContextMenu,
  _r as ContextMenuDivider,
  Ir as ContextMenuItem,
  Vr as DatePicker,
  Hr as DialogProvider,
  mn as DropdownItem,
  Se as DropdownMenu,
  Lr as DropdownSubmenu,
  gt as DropdownThemeContext,
  pr as FONTS,
  Jr as FloatingChrome,
  uo as FontMenu,
  fo as FormatToolbar,
  C as IS_COARSE,
  sn as IS_TOUCH_CAPABLE,
  Ar as ItemManagerDropdown,
  Fr as LongPressMenuProvider,
  Ke as MORPH_EASE,
  de as MORPH_MS,
  Ge as MORPH_OPACITY_MS,
  Wr as Modal,
  Ur as ModalFooter,
  jr as ModalFooterButton,
  rn as PopoutWindowContext,
  ao as RICH_TEXT_STATE_IDLE,
  Qr as RadioList,
  fr as RichTextEditor,
  ro as SectionHeader,
  no as Seg,
  so as StructureControls,
  wt as SubmenuContext,
  We as TB_BTN,
  $e as TB_BTN_ICON,
  qn as TB_DANGER,
  ze as TB_DIVIDER,
  jn as TB_INPUT,
  to as TB_NUM,
  zt as TB_PICKER,
  eo as TB_ROW_LABEL,
  Vn as TB_SEG,
  $t as TB_TOGGLE,
  Tt as TB_TOGGLE_OFF,
  Ct as TB_TOGGLE_ON,
  cr as Token,
  ir as TokenChipView,
  Ce as ToolButton,
  xe as Tooltip,
  qe as ZOOM_FROM,
  dn as cloneOverlayClose,
  lo as escapeHtml,
  yt as getDropdownClasses,
  Sr as getHardwareKeyboard,
  Rr as getLastPointerType,
  Hn as isInteractiveElement,
  _e as isTouchLike,
  ln as nearestOverlayOrigin,
  Et as normalizeSpaces,
  Pe as overlayMorphEnabled,
  un as playOverlayClose,
  an as playOverlayOpen,
  lt as preprocessTokenHtml,
  rr as sanitizeRichText,
  co as stripRichText,
  sr as stripTokenWrappers,
  on as useCurrentDocument,
  ae as useCurrentWindow,
  Br as useDialog,
  xt as useDropdownTheme,
  Kr as useFixedPosition,
  Pr as useHardwareKeyboard,
  cn as useLastPointerType,
  Xr as useLongPressOptOut,
  Ve as useOverlayMorph,
  Ye as usePopoutWindow,
  fe as usePortalTarget,
  Yr as useSmartPosition,
  Gr as useTouchMode
};
