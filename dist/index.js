"use client";
import { jsxs as v, jsx as o, Fragment as le } from "react/jsx-runtime";
import ye, { createContext as Me, useContext as Re, useState as W, useEffect as Y, useRef as $, useCallback as H, useLayoutEffect as oe, useMemo as Je, useImperativeHandle as Rt } from "react";
import * as X from "@radix-ui/react-dropdown-menu";
import { Check as ft, X as Xe, Pencil as St, Copy as pt, Trash2 as Oe, RotateCcw as ht, Plus as Pt, ChevronRight as _e, ChevronLeft as At, ArrowUp as Lt, ArrowDown as Ot, ChevronDown as mt, Underline as _t, Strikethrough as It, Link as Bt } from "lucide-react";
import * as J from "@radix-ui/react-dialog";
import { createPortal as Ye } from "react-dom";
import { useFloating as Ht, autoUpdate as Wt, offset as Ut, flip as Xt, shift as Yt } from "@floating-ui/react-dom";
import { mergeAttributes as Ft, ReactNodeViewRenderer as Kt, NodeViewWrapper as qt, useEditor as Gt, EditorContent as jt } from "@tiptap/react";
import { NodeSelection as Ee } from "@tiptap/pm/state";
import Vt from "@tiptap/starter-kit";
import Zt from "@tiptap/extension-placeholder";
import { TextStyle as Qt } from "@tiptap/extension-text-style";
import Jt from "@tiptap/extension-color";
import en from "@tiptap/extension-link";
import tn from "@tiptap/extension-underline";
import { Mention as nn } from "@tiptap/extension-mention";
import { createRoot as rn } from "react-dom/client";
const on = Me(null);
function Fe() {
  return Re(on);
}
function fe() {
  const t = Fe();
  return t ? t.document.body : null;
}
function sn() {
  const t = Fe();
  return t ? t.document : typeof document < "u" ? document : null;
}
function ae() {
  return Fe() ?? (typeof window < "u" ? window : null);
}
const ve = typeof window < "u", z = ve && window.matchMedia("(pointer: coarse)").matches, cn = ve && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ie(t) {
  return t === "touch" || t === "pen";
}
let ue = null;
const Be = /* @__PURE__ */ new Set();
ve && window.addEventListener("pointerdown", (t) => {
  ue = t.pointerType, Be.forEach((e) => e());
}, !0);
function Pr() {
  return ue;
}
function ln() {
  const [, t] = W(0), e = $(ue);
  return Y(() => {
    const n = () => {
      e.current !== ue && (e.current = ue, t((r) => r + 1));
    };
    return Be.add(n), () => {
      Be.delete(n);
    };
  }, []), ue;
}
const bt = ["(any-hover: hover)", "(any-pointer: fine)"];
function gt() {
  return ve ? bt.some((t) => window.matchMedia(t).matches) : !1;
}
let De = gt();
const He = /* @__PURE__ */ new Set();
function et(t) {
  De !== t && (De = t, He.forEach((e) => e()));
}
var dt;
if (ve) {
  const t = () => et(gt());
  for (const c of bt) {
    const u = window.matchMedia(c);
    (dt = u.addEventListener) == null || dt.call(u, "change", t);
  }
  window.addEventListener("focus", t), document.addEventListener("visibilitychange", t);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && t();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (c) => {
    c.isComposing || c.keyCode !== 229 && (c.key === "Enter" || c.key === "Backspace" || c.key === "Process" || c.key === "Unidentified" || et(!0));
  });
  let n = null, r = null;
  const i = "__penClick", l = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (c) => {
    c.pointerType !== "pen" || c.button !== 0 || (n = { x: c.clientX, y: c.clientY });
  }, !0), window.addEventListener("pointerup", (c) => {
    if (c.pointerType !== "pen") return;
    const u = n;
    if (n = null, !u || Math.hypot(c.clientX - u.x, c.clientY - u.y) > 8) return;
    const s = c.target;
    if (!s || !s.isConnected) return;
    if (s instanceof HTMLInputElement && l.has(s.type)) {
      try {
        s.showPicker();
      } catch {
      }
      return;
    }
    const a = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    a[i] = !0, r = { x: c.clientX, y: c.clientY, time: Date.now() }, s.dispatchEvent(a);
  }, !0), window.addEventListener("click", (c) => {
    c[i] || r && Date.now() - r.time < 1e3 && Math.hypot(c.clientX - r.x, c.clientY - r.y) < 12 && (c.preventDefault(), c.stopPropagation());
  }, !0);
}
function Ar() {
  return De;
}
function Lr() {
  const [, t] = W(0);
  return Y(() => {
    const e = () => t((n) => n + 1);
    return He.add(e), () => {
      He.delete(e);
    };
  }, []), De;
}
const de = 220, Ke = "cubic-bezier(0.32, 0.72, 0, 1)", qe = 170, Ge = 0.94;
function Pe(t) {
  return t === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function an(t, e) {
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
  return an({ left: r.left, top: r.top, width: r.width, height: r.height }, n);
}
function un(t, e, n, r) {
  const i = ++t.current, l = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${Ge})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    t.current === i && requestAnimationFrame(() => {
      if (t.current !== i) return;
      const c = je(e, n);
      e.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, e.style.transition = `transform ${de}ms ${Ke}, opacity ${qe}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        t.current === i && (e.style.transition = l.transition, e.style.transform = l.transform, e.style.transformOrigin = l.transformOrigin, e.style.opacity = l.opacity, r == null || r());
      }, de + 60);
    });
  });
}
function dn(t, e, n, r) {
  const i = ++t.current, l = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents, visibility: e.style.visibility }, c = je(e, n);
  e.style.transition = `transform ${de}ms ${Ke}, opacity ${qe}ms ease`, e.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, e.style.transform = `scale(${Ge})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    t.current === i && (e.style.visibility = "hidden", r == null || r(), requestAnimationFrame(() => {
      t.current !== i || e.isConnected || (e.style.transition = l.transition, e.style.transform = l.transform, e.style.transformOrigin = l.transformOrigin, e.style.opacity = l.opacity, e.style.pointerEvents = l.pointerEvents, e.style.visibility = l.visibility);
    }));
  }, de + 60);
}
function fn(t, e, n) {
  const r = t.cloneNode(!0), i = t.getBoundingClientRect(), l = i.width > 0 || i.height > 0 ? i : n ?? i;
  r.setAttribute("data-morph-clone", ""), r.setAttribute("aria-hidden", "true"), r.style.pointerEvents = "none", r.style.position = "fixed", r.style.left = `${l.left}px`, r.style.top = `${l.top}px`, r.style.margin = "0", r.style.visibility = "visible", r.style.transition = "none";
  const c = je(t, e);
  r.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, t.ownerDocument.body.appendChild(r), r.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      r.isConnected && (r.style.transition = `transform ${de}ms ${Ke}, opacity ${qe}ms ease`, r.style.transform = `scale(${Ge})`, r.style.opacity = "0", window.setTimeout(() => {
        r.isConnected && r.remove();
      }, de + 60));
    });
  });
}
function Ve(t) {
  const e = $(null), [n, r] = W(!1), i = $(null), l = $(0), c = H((p) => {
    if (t.ref && (t.ref.current = p), p) {
      l.current = 0, e.current = p;
      const h = p.getBoundingClientRect();
      (h.width > 0 || h.height > 0) && (i.current = { left: h.left, top: h.top, width: h.width, height: h.height }), r(!0);
      return;
    }
    const g = e.current, w = ++l.current;
    queueMicrotask(() => {
      w === l.current && e.current === g && (e.current = null, r(!1), !(!g || !t.cloneOnUnmount || !u.current) && g.style.visibility !== "hidden" && Pe(m.current) && fn(g, a.current, i.current));
    });
  }, []), u = $(t.visible);
  u.current = t.visible;
  const s = $(t.visible), a = $(t.anchor ?? null);
  a.current = t.anchor ?? null;
  const d = $(t.onClosed);
  d.current = t.onClosed;
  const m = $(t.morph !== !1);
  m.current = t.morph !== !1;
  const b = $(0);
  return oe(() => {
    if (!n || !u.current || !Pe(m.current)) return;
    const p = e.current;
    p && un(b, p, a.current);
  }, [n, t.visible]), oe(() => {
    var w;
    const p = s.current;
    if (s.current = t.visible, t.visible || !p) return;
    const g = e.current;
    if (!g || !Pe(m.current)) {
      (w = d.current) == null || w.call(d);
      return;
    }
    dn(b, g, a.current, () => {
      var h;
      return (h = d.current) == null ? void 0 : h.call(d);
    });
  }, [t.visible]), Y(() => {
    if (!n || !u.current) return;
    const p = (g) => {
      const w = e.current;
      w && w.contains(g.target) && g.stopImmediatePropagation();
    };
    return document.addEventListener("wheel", p, { capture: !0 }), () => document.removeEventListener("wheel", p, { capture: !0 });
  }, [n]), c;
}
const xt = Me("dark"), yt = () => Re(xt), pn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", tt = z ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", hn = z ? "text-xs" : "text-[10px]";
function wt(t) {
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
    headerText: `${tt} font-semibold uppercase tracking-wider ${hn} ui-label`,
    // Item padding
    itemPad: pn,
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
const vt = Me({ activeSub: null, setActiveSub: () => {
}, morph: !0 });
function Se({
  open: t,
  onClose: e,
  onOpenChange: n,
  trigger: r,
  align: i = "left",
  width: l,
  theme: c = "dark",
  children: u,
  morph: s = !0,
  contentClassName: a
}) {
  const [d, m] = W(null), b = fe(), p = $(null), g = $(t);
  g.current = t;
  const [w, h] = W(t);
  Y(() => {
    t ? h(!0) : m(null);
  }, [t]);
  const M = H(() => {
    const N = p.current;
    if (!N) return null;
    const T = N.getBoundingClientRect();
    return { left: T.left, top: T.top, width: T.width, height: T.height };
  }, []), A = Ve({
    visible: t,
    morph: s,
    anchor: M,
    onClosed: () => h(!1)
  }), S = H((N) => {
    !N && !g.current || (!N && R.current && (B.current = !0), n ? n(N) : N || e == null || e());
  }, [n, e]), E = $(w);
  E.current = w;
  const R = $(!1), B = $(!1), j = H(() => {
    if (!g.current && E.current) {
      if (B.current) {
        B.current = !1, R.current = !1;
        return;
      }
      n == null || n(!0);
    }
  }, [n]), F = ye.isValidElement(r) ? r : null, f = F ? ye.cloneElement(F, {
    ref: (N) => {
      p.current = N;
    },
    onPointerDown: () => {
      R.current = !0, B.current = !1;
    },
    onClick: (N) => {
      var T, O;
      (O = (T = F.props).onClick) == null || O.call(T, N), j();
    }
  }) : r;
  return /* @__PURE__ */ v(X.Root, { open: t || w, onOpenChange: S, modal: !1, children: [
    /* @__PURE__ */ o(X.Trigger, { asChild: !0, children: f }),
    /* @__PURE__ */ o(X.Portal, { container: b ?? void 0, children: /* @__PURE__ */ o(xt.Provider, { value: c, children: /* @__PURE__ */ o(vt.Provider, { value: { activeSub: d, setActiveSub: m, morph: s }, children: /* @__PURE__ */ o(
      X.Content,
      {
        ref: A,
        "data-theme": c,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${l || ""} ${a || ""}`,
        align: i === "left" ? "start" : "end",
        sideOffset: 8,
        collisionPadding: 8,
        style: { touchAction: "manipulation" },
        children: u
      }
    ) }) }) })
  ] });
}
function Or({
  open: t,
  onClose: e,
  items: n,
  activeId: r,
  onSelect: i,
  onRename: l,
  onDuplicate: c,
  onDelete: u,
  onCreate: s,
  onImport: a,
  onExport: d,
  onReset: m,
  onTrash: b,
  closeOnSelect: p,
  readOnly: g = !1,
  theme: w,
  align: h,
  label: M,
  header: A,
  itemLabel: S,
  trigger: E,
  minItems: R = 1,
  itemRender: B,
  morph: j = !0,
  contentClassName: F
}) {
  const f = wt(), [C, N] = W(null), [T, O] = W(""), K = $(null), V = $(null);
  Y(() => {
    t && requestAnimationFrame(() => {
      var D, _;
      (_ = (D = V.current) == null ? void 0 : D.querySelector('[data-active="1"]')) == null || _.scrollIntoView({ block: "nearest" });
    });
  }, [t]), Y(() => {
    if (C) {
      requestAnimationFrame(() => {
        var _, Z;
        (_ = K.current) == null || _.focus(), (Z = K.current) == null || Z.select();
      });
      const D = n.find((_) => _.id === C);
      D && !T && O(D.name);
    }
  }, [C]), Y(() => {
    if (C) {
      const D = n.find((_) => _.id === C);
      D && !T && O(D.name);
    }
  }, [C, n]);
  const se = (D, _) => {
    N(D), O(_);
  }, k = () => {
    C && T.trim() && l(C, T.trim()), N(null);
  }, y = () => {
    N(null);
  }, q = S || A.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ v(Se, { open: t, onOpenChange: (D) => {
    D ? (N(null), O("")) : (C && T.trim() && l(C, T.trim()), N(null), O("")), (!D || !g) && e(D);
  }, width: "w-80", theme: w, align: h, trigger: E, morph: j, contentClassName: F, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${f.headerText}`, children: A }),
    /* @__PURE__ */ o("div", { ref: V, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((D) => {
      const _ = D.id === r, Z = C === D.id;
      return /* @__PURE__ */ o("div", { "data-active": _ ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${_ ? f.rowActiveBg : f.rowHoverBg} ${C && !Z ? "opacity-40 pointer-events-none" : ""}`, children: Z ? /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: K,
            value: T,
            onChange: (I) => O(I.target.value),
            onKeyDown: (I) => {
              I.key === "Enter" && (I.preventDefault(), I.stopPropagation(), k()), I.key === "Escape" && (I.preventDefault(), I.stopPropagation(), y());
            },
            className: `w-full border rounded ${f.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${f.editConfirm}`,
            onSelect: (I) => {
              I.preventDefault(), k();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(ft, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${f.editCancel}`,
            onSelect: (I) => {
              I.preventDefault(), y();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Xe, { className: f.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none cursor-pointer flex items-center ${f.rowText} ${_ ? "" : f.rowTextHover}`,
            onSelect: p ? () => {
              i(D.id);
            } : (I) => {
              I.preventDefault(), i(D.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${_ ? f.rowActiveText : ""}`, children: B ? B(D) : D.name })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${_ ? f.btnActive : f.btnBase}`,
            onSelect: (I) => {
              I.preventDefault(), se(D.id, D.name);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ o(St, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${_ ? f.btnActive : f.btnBase}`,
            onSelect: (I) => {
              I.preventDefault();
              const re = c(D.id);
              re && se(re, `${D.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: /* @__PURE__ */ o(pt, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= R ? f.btnDisabled : _ ? f.btnDangerActive : f.btnDanger}`,
            onSelect: (I) => {
              I.preventDefault(), u(D.id);
            },
            onTouchStart: () => {
            },
            disabled: g || n.length <= R,
            children: /* @__PURE__ */ o(Oe, { className: f.btnIcon })
          }
        )
      ] }) }, D.id);
    }) }),
    /* @__PURE__ */ v("div", { className: `shrink-0 ${C ? "opacity-40 pointer-events-none" : ""}`, children: [
      m && /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ o(X.Separator, { className: f.separator }),
        /* @__PURE__ */ v(
          X.Item,
          {
            className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
            onSelect: (D) => {
              D.preventDefault(), m();
            },
            onTouchStart: () => {
            },
            disabled: g,
            children: [
              /* @__PURE__ */ o(ht, { className: `${f.btnIcon} ${f.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || a || d || b) && /* @__PURE__ */ o(X.Separator, { className: f.separator }),
      s && /* @__PURE__ */ v(
        X.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (D) => {
            D.preventDefault();
            const _ = s();
            _ && se(_, "");
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ o(Pt, { className: `${f.btnIcon} ${f.icon}` }),
            "New ",
            q
          ]
        }
      ),
      a && /* @__PURE__ */ v(
        X.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (D) => {
            D.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ v("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      d && /* @__PURE__ */ v(
        X.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (D) => {
            D.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ v("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      b && /* @__PURE__ */ v(
        X.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (D) => {
            D.preventDefault(), b();
          },
          onTouchStart: () => {
          },
          disabled: g,
          children: [
            /* @__PURE__ */ o(Oe, { className: `${f.btnIcon} ${f.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const mn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function bn({
  onClick: t,
  icon: e,
  disabled: n = !1,
  variant: r = "default",
  className: i = "",
  children: l,
  keepOpen: c = !1,
  rightAction: u,
  trailing: s
}) {
  yt();
  const a = wt(), d = $(!1), m = $(null), b = r === "danger" ? a.itemDanger : a.itemDefault;
  return /* @__PURE__ */ v(
    X.Item,
    {
      ref: m,
      className: `w-full text-left ${mn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${b} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (p) => {
        if (d.current) {
          d.current = !1;
          return;
        }
        c && p.preventDefault(), t();
      },
      onPointerEnter: () => {
        const p = m.current;
        p && !p.contains(document.activeElement) && p.focus({ preventScroll: !0 });
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        e && /* @__PURE__ */ o("span", { className: `${a.icon} shrink-0`, children: e }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: l }),
        s && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: s }),
        u && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${a.rightAction}`,
            title: u.title,
            onPointerDown: (p) => {
              p.stopPropagation(), p.preventDefault(), d.current = !0, u.onClick();
            },
            onClick: (p) => {
              p.stopPropagation(), p.preventDefault();
            },
            children: u.icon
          }
        )
      ]
    }
  );
}
const gn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function _r({ id: t, label: e, icon: n, width: r, side: i = "right", children: l }) {
  const { activeSub: c, setActiveSub: u, morph: s } = Re(vt), a = c === t, d = yt(), m = fe(), b = $(null), [p, g] = W(a), w = !a && p;
  Y(() => {
    a && g(!0);
  }, [a]);
  const h = H(() => {
    const E = b.current;
    if (!E) return null;
    const R = E.getBoundingClientRect();
    return { left: R.left, top: R.top, width: R.width, height: R.height };
  }, []), M = Ve({
    visible: a,
    morph: s,
    anchor: h,
    onClosed: () => g(!1)
  }), A = `w-full text-left ${gn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${w ? " ui-sub-closing" : ""}`, S = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"}`;
  return /* @__PURE__ */ v(X.Sub, { open: a || p, onOpenChange: (E) => u(E ? t : null), children: [
    /* @__PURE__ */ v(
      X.SubTrigger,
      {
        ref: b,
        className: A,
        onTouchStart: () => {
        },
        onPointerDown: (E) => {
          E.pointerType === "pen" && (E.preventDefault(), u(a ? null : t));
        },
        children: [
          i === "left" && /* @__PURE__ */ o(_e, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ v("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ o(_e, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(X.Portal, { container: m ?? void 0, children: /* @__PURE__ */ o(
      X.SubContent,
      {
        ref: M,
        "data-theme": d,
        className: S,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        children: l
      }
    ) })
  ] });
}
const be = 8, xn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", yn = z ? "text-sm" : "text-xs", Ir = ({ open: t, x: e, y: n, onClose: r, children: i, containerRef: l, morph: c = !0 }) => {
  const u = ye.useRef(null), s = ae(), [a, d] = W(t);
  Y(() => {
    t && d(!0);
  }, [t]);
  const m = H(() => ({ left: e, top: n, width: 0, height: 0 }), [e, n]), b = Ve({
    visible: t,
    morph: c,
    anchor: m,
    onClosed: () => d(!1)
  }), p = H((g) => {
    u.current = g, b(g);
  }, [b]);
  return Y(() => {
    if (!t || !s) return;
    const g = (h) => {
      u.current && !u.current.contains(h.target) && r();
    }, w = (h) => {
      h.key === "Escape" && r();
    };
    return s.addEventListener("pointerdown", g, !0), s.addEventListener("keydown", w, !0), () => {
      s.removeEventListener("pointerdown", g, !0), s.removeEventListener("keydown", w, !0);
    };
  }, [t, r, s]), oe(() => {
    var B;
    if (!t || !u.current) return;
    const g = u.current.getBoundingClientRect(), w = (B = l == null ? void 0 : l.current) == null ? void 0 : B.getBoundingClientRect(), h = w ? w.right : (s == null ? void 0 : s.innerWidth) ?? 0, M = w ? w.bottom : (s == null ? void 0 : s.innerHeight) ?? 0, A = w ? w.left : 0, S = w ? w.top : 0;
    let E = Math.max(S + be, n), R = Math.max(A + be, e);
    R + g.width > h && (R = h - g.width - be), E + g.height > M && (E = Math.max(S + be, M - g.height - be)), u.current.style.top = `${E}px`, u.current.style.left = `${R}px`;
  }, [t, e, n, l]), !t && !a ? null : /* @__PURE__ */ o(
    "div",
    {
      ref: p,
      "data-theme": "light",
      className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${yn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
      style: { top: n, left: e, touchAction: "manipulation" },
      children: i
    }
  );
}, Br = ({ onClick: t, variant: e = "default", icon: n, disabled: r = !1, children: i }) => /* @__PURE__ */ v(
  "button",
  {
    onClick: r ? void 0 : t,
    onTouchStart: () => {
    },
    className: `w-full text-left ${xn} flex items-center gap-2 rounded cursor-pointer ${r ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"}`,
    children: [
      n,
      i
    ]
  }
), Hr = () => /* @__PURE__ */ o("div", { className: "ui-sep my-1" });
function wn({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: l = "", labelClassName: c = "", theme: u, variant: s = "pill", tone: a = "accent", block: d = !1 }) {
  const m = s !== "plain", b = z ? "w-5 h-5" : "w-4 h-4", p = z ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", g = z ? "w-3.5 h-3.5" : "w-3 h-3", w = z ? "text-sm" : "text-xs";
  return /* @__PURE__ */ v(
    "label",
    {
      className: `ui-checkbox ${m ? `ui-checkbox-pill ${z ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${l}`,
      style: { display: d ? "flex" : "inline-flex", alignItems: "center", gap: z ? 10 : 8 },
      onClick: (M) => M.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ o(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: t,
            disabled: n,
            onChange: (M) => e(M.target.checked),
            className: "sr-only"
          }
        ),
        m ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: t ? /* @__PURE__ */ v("svg", { viewBox: "0 0 16 16", className: b, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: b, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${p}`, "aria-hidden": !0, children: t && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: g, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${w} ${c}`, children: r })
      ]
    }
  );
}
const vn = z ? "p-6" : "p-5", kn = z ? "text-base" : "text-sm", Nn = z ? "w-5 h-5" : "w-4 h-4", $n = z ? "text-sm" : "text-xs", Cn = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", nt = z ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", rt = z ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", ot = z ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", Ne = z ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", kt = Me(null);
function Wr() {
  const t = Re(kt);
  if (!t) throw new Error("useDialog must be used within DialogProvider");
  return t;
}
function Ur({ children: t }) {
  const [e, n] = W(null), [r, i] = W(!1), l = fe(), c = ae(), u = $(c);
  u.current = c;
  const s = $(null), a = $(null), [d, m] = W(null), b = $(null), [p, g] = W(null), w = $(null), h = b.current !== null;
  w.current, Y(() => {
    e || (m(null), g(null));
  }, [e]);
  const M = H(() => {
    const k = a.current;
    if (!k) return null;
    const y = k.getBoundingClientRect();
    return { left: y.left, top: y.top, width: y.width, height: y.height };
  }, []), A = H((k) => {
    if (k.target.closest("button")) return;
    const y = M();
    y && (m(y), g({ w: y.width, h: y.height }), b.current = { startX: k.clientX, startY: k.clientY, posX: y.left, posY: y.top }, k.target.setPointerCapture(k.pointerId));
  }, [M]), S = H((k) => {
    const y = b.current;
    y && (k.preventDefault(), m({ left: y.posX + k.clientX - y.startX, top: y.posY + k.clientY - y.startY }));
  }, []), E = H(() => {
    b.current = null;
  }, []), R = H((k) => (y) => {
    y.stopPropagation();
    const q = M();
    q && (m(q), g({ w: q.width, h: q.height }), w.current = { dir: k, startX: y.clientX, startY: y.clientY, startL: q.left, startT: q.top, startW: q.width, startH: q.height }, y.target.setPointerCapture(y.pointerId));
  }, [M]), B = 200, j = 100, F = 32, f = H((k) => {
    const y = w.current;
    if (!y) return;
    k.preventDefault();
    const q = k.clientX - y.startX, D = k.clientY - y.startY;
    let _ = y.startW, Z = y.startH, I = y.startL, re = y.startT;
    y.dir.includes("e") && (_ = y.startW + q), y.dir.includes("w") && (_ = y.startW - q, I = y.startL + q), y.dir.includes("s") && (Z = y.startH + D), y.dir.includes("n") && (Z = y.startH - D, re = y.startT + D);
    const pe = u.current;
    if (!pe) return;
    const he = pe.innerWidth, ke = pe.innerHeight;
    _ = Math.max(B, Math.min(_, he - F * 2)), Z = Math.max(j, Math.min(Z, ke - F * 2)), y.dir.includes("w") && (I = Math.max(F, Math.min(I, he - _ - F))), y.dir.includes("n") && (re = Math.max(F, Math.min(re, ke - Z - F))), g({ w: _, h: Z }), m({ left: I, top: re });
  }, []), C = H(() => {
    w.current = null;
  }, []), N = H(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), n(null));
  }, [e]), T = H((k) => {
    if (k.suppressKey) {
      const y = localStorage.getItem(k.suppressKey);
      if (y && Date.now() < parseInt(y, 10))
        return Promise.resolve(!0);
    }
    return new Promise((y) => {
      i(!1), n({ kind: "confirm", options: k, resolve: y });
    });
  }, []), O = H((k) => new Promise((y) => {
    n({ kind: "prompt", options: k, resolve: y });
  }), []), K = H((k) => new Promise((y) => {
    n({ kind: "alert", options: k, resolve: y });
  }), []);
  Y(() => {
    if (e) {
      const k = setTimeout(() => {
        var y;
        return (y = s.current) == null ? void 0 : y.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [e]);
  const V = () => {
    var k, y;
    !e || e.kind !== "prompt" || (e.resolve(((y = (k = s.current) == null ? void 0 : k.value) == null ? void 0 : y.trim()) || null), n(null));
  }, se = e !== null;
  return /* @__PURE__ */ v(kt.Provider, { value: { confirm: T, prompt: O, alert: K }, children: [
    t,
    /* @__PURE__ */ o(J.Root, { open: se, onOpenChange: (k) => {
      k || N();
    }, modal: !0, children: /* @__PURE__ */ v(J.Portal, { container: l ?? void 0, children: [
      /* @__PURE__ */ o(J.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ v(
        J.Content,
        {
          ref: a,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${vn} space-y-4 focus:outline-none ${d || p ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${p ? "" : "w-full max-w-sm"}`,
          style: { ...d ? { left: d.left, top: d.top } : {}, ...p ? { width: p.w, height: p.h } : {} },
          onEscapeKeyDown: (k) => {
            N(), k.preventDefault();
          },
          onPointerDownOutside: (k) => {
            N(), k.preventDefault();
          },
          onKeyDown: (k) => {
            if (k.key === "Enter") {
              if ((e == null ? void 0 : e.kind) === "prompt" && k.target instanceof HTMLInputElement || (k.preventDefault(), !e)) return;
              e.kind === "confirm" ? (e.resolve(!0), n(null)) : e.kind === "prompt" ? V() : (e.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ v(
              "div",
              {
                className: `flex items-center justify-between ${h ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: A,
                onPointerMove: S,
                onPointerUp: E,
                children: [
                  /* @__PURE__ */ o(J.Title, { className: `${kn} ui-dialog-title`, children: e == null ? void 0 : e.options.title }),
                  /* @__PURE__ */ o(J.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ o(Xe, { className: Nn }) })
                ]
              }
            ),
            (e == null ? void 0 : e.options.message) && /* @__PURE__ */ o(J.Description, { className: `${$n} ui-dialog-text`, children: e.options.message }),
            (e == null ? void 0 : e.kind) === "confirm" && e.options.suppressKey && /* @__PURE__ */ o(
              wn,
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
                  k.key === "Enter" && V();
                },
                className: `w-full ${Cn} ui-input`
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
                      } else e.kind === "prompt" ? V() : (e.resolve(), n(null));
                  },
                  className: `${nt} ui-btn ${(e == null ? void 0 : e.kind) === "confirm" && e.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (e == null ? void 0 : e.kind) === "alert" ? "OK" : (e == null ? void 0 : e.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ v("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ o("div", { className: `absolute ${rt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: R("n"), onPointerMove: f, onPointerUp: C }),
              /* @__PURE__ */ o("div", { className: `absolute ${rt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: R("s"), onPointerMove: f, onPointerUp: C }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: R("w"), onPointerMove: f, onPointerUp: C }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: R("e"), onPointerMove: f, onPointerUp: C }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 left-0 ${Ne} cursor-nw-resize pointer-events-auto`, onPointerDown: R("nw"), onPointerMove: f, onPointerUp: C }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 right-0 ${Ne} cursor-ne-resize pointer-events-auto`, onPointerDown: R("ne"), onPointerMove: f, onPointerUp: C }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 left-0 ${Ne} cursor-sw-resize pointer-events-auto`, onPointerDown: R("sw"), onPointerMove: f, onPointerUp: C }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 right-0 ${Ne} cursor-se-resize pointer-events-auto`, onPointerDown: R("se"), onPointerMove: f, onPointerUp: C })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const te = 32, Nt = "[data-modal-stack]", ie = 220, we = "cubic-bezier(0.32, 0.72, 0, 1)", ze = 0.94;
function ge() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function $t(t, e) {
  return `translate(${e.left - t.left}px, ${e.top - t.top}px) scale(${e.width / t.width}, ${e.height / t.height})`;
}
function it(t, e, n, r) {
  const i = ++t.current, l = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = $t(l, n), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === i && (e.style.transition = `transform ${ie}ms ${we}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        t.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, ie + 80));
    });
  });
}
function zn(t, e, n) {
  const r = ++t.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${ze})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === r && (e.style.transition = `transform ${ie}ms ${we}`, e.style.transform = "none", window.setTimeout(() => {
        t.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", n());
      }, ie + 60));
    });
  });
}
function st(t, e, n) {
  const r = ++t.current, i = e.getBoundingClientRect(), l = 1 - ze, c = { left: i.left + i.width * l / 2, top: i.top + i.height * l / 2, width: i.width * ze, height: i.height * ze };
  e.style.transition = `transform ${ie}ms ${we}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = $t(i, c), e.style.opacity = "0", window.setTimeout(() => {
    t.current === r && (e.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      t.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, ie + 60);
}
function Ae(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(Nt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Le(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(Nt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Tn = z ? "px-6" : "px-5", En = z ? "py-3" : "py-2.5", Dn = z ? "text-sm" : "text-xs", Mn = z ? "w-4 h-4" : "w-3.5 h-3.5", Rn = z ? "text-xs" : "text-[10px]", Sn = z ? "w-3.5 h-3.5" : "w-3 h-3", Pn = z ? "px-2.5 py-1.5" : "px-2 py-1", An = z ? "px-6" : "px-5", Ln = z ? "py-3" : "py-2";
function Xr({
  open: t,
  onClose: e,
  title: n,
  icon: r,
  width: i,
  footer: l,
  children: c,
  onReset: u,
  morph: s = !0
}) {
  const a = $(null), d = $(null), m = $(null), [b, p] = W(!1), g = H((x) => {
    a.current = x, p(x !== null);
  }, []), w = fe(), h = ae(), M = $(h);
  M.current = h;
  const [A, S] = W(null), E = $(null), R = $(!1), B = $(!1), [j, F] = W(!1), f = $(0), C = $(!1), N = $(s);
  N.current = s;
  const T = $(!1), O = $(!1), K = () => {
    O.current = !0, F(!0);
  }, V = () => {
    O.current = !1, F(!1);
  };
  Y(() => {
    t || (S(null), B.current = !1, R.current = !1);
  }, [t]), oe(() => {
    var G, U;
    if (!t || B.current || !b || !a.current) return;
    B.current = !0;
    const x = a.current.getBoundingClientRect(), P = ((G = M.current) == null ? void 0 : G.innerWidth) ?? 0, L = ((U = M.current) == null ? void 0 : U.innerHeight) ?? 0;
    S({
      left: Math.max(te, Math.min((P - x.width) / 2, P - x.width - te)),
      top: Math.max(te, Math.min((L - x.height) / 2, L - x.height - te))
    });
  }, [t, b]), oe(() => {
    if (!t || !b || !s || ge() || !a.current) return;
    const x = a.current, P = Ae(x), L = P[P.length - 1];
    K(), L ? it(f, x, L.getBoundingClientRect(), V) : zn(f, x, V);
  }, [t, b]);
  const se = H(() => {
    if (C.current) return;
    const x = a.current, P = !!x && Ae(x).length > 0;
    if (!x || !s || ge() || P) {
      e();
      return;
    }
    C.current = !0, T.current = !0, K(), st(f, x, () => {
      C.current = !1, V(), e();
    });
  }, [s, e]);
  oe(() => () => {
    const x = a.current;
    if (!x || T.current || !N.current || ge() || Ae(x).length > 0) return;
    const P = x.ownerDocument, L = x.cloneNode(!0);
    L.removeAttribute("data-modal-stack"), L.removeAttribute("data-state"), L.removeAttribute("role"), L.removeAttribute("data-aria-hidden"), L.removeAttribute("tabindex"), L.setAttribute("aria-hidden", "true"), L.style.pointerEvents = "none", P.body.appendChild(L), st({ current: 0 }, L, () => {
      L.isConnected && L.remove();
    });
  }, []), Y(() => {
    if (!t || !b || !s || !a.current) return;
    const x = a.current, P = x.parentNode;
    if (!P) return;
    let L = 0, G = null, U = !1;
    const ee = () => {
      L = 0;
      const Q = Le(x);
      Q.length > 0 ? (G = Q[Q.length - 1].getBoundingClientRect(), U = !0, L = requestAnimationFrame(ee)) : U && (U = !1, G && !ge() && (K(), it(f, x, G, V)), G = null);
    }, ce = new MutationObserver(() => {
      !L && Le(x).length > 0 && (L = requestAnimationFrame(ee));
    });
    return ce.observe(P, { childList: !0 }), () => {
      ce.disconnect(), L && cancelAnimationFrame(L);
    };
  }, [t, b]), Y(() => {
    if (!b || !s || ge() || !a.current) return;
    const x = a.current;
    let P = Math.round(x.getBoundingClientRect().height), L = !1;
    const G = new ResizeObserver(() => {
      var Qe;
      if (!x.isConnected) return;
      const U = Math.round(x.getBoundingClientRect().height);
      if (!L) {
        L = !0, P = U;
        return;
      }
      if (Math.abs(U - P) < 1) return;
      if (E.current || C.current || Le(x).length > 0) {
        P = U;
        return;
      }
      if (O.current) return;
      const ee = P;
      P = U, K();
      const ce = x.getBoundingClientRect(), Q = !R.current, me = ((Qe = M.current) == null ? void 0 : Qe.innerHeight) ?? 0, Mt = Q ? (me - ee) / 2 : ce.top, Ze = Q ? (me - U) / 2 : ce.top;
      x.style.transition = "none", x.style.height = `${ee}px`, Q && (x.style.top = `${Mt}px`), d.current && (d.current.style.overflow = "hidden"), x.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          x.style.height === `${ee}px` && (x.style.transition = `height ${ie}ms ${we}${Q ? `, top ${ie}ms ${we}` : ""}`, x.style.height = `${U}px`, Q && (x.style.top = `${Ze}px`), window.setTimeout(() => {
            x.style.height === `${U}px` && (x.style.transition = "", x.style.height = "", d.current && (d.current.style.overflow = ""), Q && S({ left: ce.left, top: Ze }), V());
          }, ie + 60));
        });
      });
    });
    return G.observe(x), () => G.disconnect();
  }, [b]);
  const k = H(() => {
    const x = a.current;
    if (!x) return null;
    const P = x.getBoundingClientRect();
    return { left: P.left, top: P.top, width: P.width, height: P.height };
  }, []), y = H((x, P) => {
    var Q, me;
    const L = ((Q = M.current) == null ? void 0 : Q.innerWidth) ?? 0, G = ((me = M.current) == null ? void 0 : me.innerHeight) ?? 0, U = k(), ee = U ? U.width : Math.min(L - te * 2, 576), ce = U ? U.height : Math.min(G - te * 2, 400);
    return {
      left: Math.max(te, Math.min(x, L - ee - te)),
      top: Math.max(te, Math.min(P, G - ce - te))
    };
  }, [k]), q = H((x) => {
    if (x.target.closest("button")) return;
    R.current = !0;
    const P = k();
    P && (S(y(P.left, P.top)), E.current = { startX: x.clientX, startY: x.clientY, posX: P.left, posY: P.top }, x.target.setPointerCapture(x.pointerId));
  }, [k, y]), D = H((x) => {
    const P = E.current;
    P && (x.preventDefault(), S(y(P.posX + x.clientX - P.startX, P.posY + x.clientY - P.startY)));
  }, [y]), _ = H(() => {
    E.current = null;
  }, []), Z = E.current !== null, I = A !== null, re = I ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, he = {
    ...I ? { left: A.left, top: A.top } : {},
    width: `min(100%, calc(100vw - ${te * 2}px))`,
    maxHeight: `calc(100vh - ${te * 2}px)`
  }, ke = H((x) => {
    if (x.key !== "Enter" || x.shiftKey || x.metaKey || x.ctrlKey || x.altKey || x.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const L = m.current;
    if (!L) return;
    const G = Array.from(L.querySelectorAll("button[data-modal-confirm]")), U = G.length > 0 ? G : Array.from(L.querySelectorAll("button")), ee = U[U.length - 1];
    !ee || ee.disabled || (x.preventDefault(), ee.click());
  }, []);
  return /* @__PURE__ */ o(J.Root, { open: t, onOpenChange: (x) => {
    x || se();
  }, children: /* @__PURE__ */ v(J.Portal, { container: w ?? void 0, children: [
    /* @__PURE__ */ o(
      J.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (x) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (x.preventDefault(), se());
        }
      }
    ),
    /* @__PURE__ */ v(
      J.Content,
      {
        ref: g,
        onKeyDown: ke,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${re} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(he).length > 0 ? he : {} },
        children: [
          /* @__PURE__ */ v(
            "div",
            {
              className: `flex items-center justify-between ${Tn} ${En} border-b border-zinc-800 shrink-0 bg-zinc-950 ${Z ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (x) => {
                j || q(x);
              },
              onPointerMove: D,
              onPointerUp: _,
              children: [
                /* @__PURE__ */ v("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(J.Title, { className: `${Dn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ v("button", { onClick: u, className: `flex items-center gap-1 ${Rn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Pn} shrink-0`, children: [
                    /* @__PURE__ */ o(ht, { className: Sn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ o(J.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(Xe, { className: Mn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: d, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          l && /* @__PURE__ */ o("div", { ref: m, className: "shrink-0", children: l })
        ]
      }
    )
  ] }) });
}
function Yr({ children: t }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${An} ${Ln} border-t border-zinc-800 bg-zinc-950`, children: t });
}
const On = 500, _n = 250, In = 5, ne = 88, ct = 4;
function Bn(t, e) {
  const n = t.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const i = performance.now(), l = (c) => {
    const u = c - i, s = Math.min(u / e, 1);
    n.style.strokeDashoffset = String(r * (1 - s)), s < 1 && requestAnimationFrame(l);
  };
  requestAnimationFrame(l);
}
function Hn({ x: t, y: e, ms: n }) {
  const r = $(null), i = fe();
  return Y(() => {
    r.current && Bn(r.current, n);
  }, [n]), Ye(
    /* @__PURE__ */ o(
      "div",
      {
        style: {
          position: "fixed",
          left: t - ne / 2,
          top: e - ne / 2,
          width: ne,
          height: ne,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ v("svg", { ref: r, width: ne, height: ne, viewBox: `0 0 ${ne} ${ne}`, children: [
          /* @__PURE__ */ o(
            "circle",
            {
              cx: ne / 2,
              cy: ne / 2,
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
              cx: ne / 2,
              cy: ne / 2,
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
function Fr() {
  return { "data-no-longpress": "true" };
}
function Wn(t) {
  const e = t.tagName;
  return !!(e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || e === "BUTTON" || t.isContentEditable || t.closest("[data-no-longpress]") || t.closest("button, input, select, textarea"));
}
function Kr({
  children: t,
  showRing: e = !0,
  longPressMs: n = On,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: l
}) {
  const [c, u] = W(null), s = sn(), a = $(null), d = $(null), m = $({ x: 0, y: 0, target: null }), b = $(!1), p = Math.min(_n, n * 0.5), g = $(i);
  g.current = i;
  const w = $(l);
  return w.current = l, Y(() => {
    if (!z || !s) return;
    const h = (E) => {
      if (!Ie(E.pointerType) || E.button !== 0) return;
      const R = E.target;
      if (!R.closest(r) || (g.current ? !g.current(R) : Wn(R))) return;
      const B = E.clientX, j = E.clientY;
      m.current = { x: B, y: j, target: E.target }, b.current = !0, e && (d.current = setTimeout(() => u({ x: B, y: j }), p)), a.current = setTimeout(() => {
        if (!b.current) return;
        d.current && (clearTimeout(d.current), d.current = null), u(null);
        const F = m.current.target;
        if (!F) return;
        const f = w.current;
        if (f) {
          f(F, B, j);
          return;
        }
        const C = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: B,
          clientY: j,
          button: 2,
          view: window
        });
        F.dispatchEvent(C);
      }, n);
    }, M = (E) => {
      if (!b.current || a.current === null) return;
      const R = E.clientX - m.current.x, B = E.clientY - m.current.y;
      Math.sqrt(R * R + B * B) > In && (clearTimeout(a.current), a.current = null, d.current && (clearTimeout(d.current), d.current = null), b.current = !1, u(null));
    }, A = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), b.current = !1, u(null);
    }, S = (E) => {
      Ie(E.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), b.current = !1, u(null));
    };
    return s == null || s.addEventListener("pointerdown", h), s.addEventListener("pointermove", M), s.addEventListener("pointerup", A), s.addEventListener("pointercancel", A), s.addEventListener("pointerleave", S), () => {
      s.removeEventListener("pointerdown", h), s.removeEventListener("pointermove", M), s.removeEventListener("pointerup", A), s == null || s.removeEventListener("pointercancel", A), s == null || s.removeEventListener("pointerleave", S), a.current !== null && clearTimeout(a.current), d.current !== null && clearTimeout(d.current);
    };
  }, [e, n, p, r]), /* @__PURE__ */ v(le, { children: [
    t,
    e && c && /* @__PURE__ */ o(Hn, { x: c.x, y: c.y, ms: n - p })
  ] });
}
function qr(t, e) {
  const n = ae(), r = $(n);
  r.current = n, oe(() => {
    if (!e || !t.current) return;
    const i = t.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const l = r.current;
    if (!l) return;
    const c = t.current.getBoundingClientRect(), u = i.getBoundingClientRect(), s = l.innerWidth, a = l.innerHeight, d = u.right - s;
    if (d > 0) {
      const m = Math.min(d + 8, u.left);
      i.style.left = `${u.left - c.left - m}px`;
    }
    u.left < 0 && (i.style.left = `${-c.left + 4}px`), u.bottom > a + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${a - 8}px`));
  }, [e, t]);
}
function Gr(t, e, n) {
  const r = ae(), i = $(r);
  i.current = r, oe(() => {
    if (!e || !t.current) return;
    const l = t.current;
    requestAnimationFrame(() => {
      var M, A;
      const c = l.getBoundingClientRect(), u = i.current;
      if (!u) return;
      const s = u.innerWidth, a = ((M = u.visualViewport) == null ? void 0 : M.height) ?? u.innerHeight, d = ((A = u.visualViewport) == null ? void 0 : A.offsetTop) ?? 0, m = 200, b = 4, p = 120;
      let g = Math.max(0, c.left);
      g + m > s && (g = Math.max(0, s - m - 8));
      const w = d + a - c.bottom - b - 16, h = c.top - d - b - 16;
      if (w >= p || w >= h) {
        const S = Math.min(c.bottom + b, d + a), E = Math.max(p, d + a - S - 16);
        n({ top: S, left: g, width: c.width, maxH: E });
      } else {
        const S = Math.max(p, Math.min(h, 360)), E = d + a - (c.top - b);
        n({ top: 0, left: g, width: c.width, maxH: S, bottom: Math.max(0, E) });
      }
    });
  }, [e, t]);
}
function jr() {
  const t = ln();
  return cn ? t === null || Ie(t) : !1;
}
const Un = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", Xn = {
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
}, lt = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white", Yn = "bg-blue-900!";
function Vr({
  variant: t = "subtle",
  theme: e = "light",
  cloud: n = !1,
  className: r = "",
  type: i = "button",
  ...l
}) {
  const c = l["data-state"] === "open", u = Xn[e][t];
  let s = `${u.base} ${c ? u.open : ""}`;
  return t === "primary" && e === "light" && n && (s = c ? `${lt} ${Yn}` : lt), /* @__PURE__ */ o("button", { type: i, className: `${Un} ${s} ${r}`, ...l });
}
const Fn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${z ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Kn = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Zr({
  variant: t = "hero",
  className: e = "",
  type: n = "button",
  ...r
}) {
  return /* @__PURE__ */ o(
    "button",
    {
      type: n,
      className: `${Fn} ${Kn[t]} ${e}`,
      ...r
    }
  );
}
const qn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Gn(t, e) {
  return new Date(t, e + 1, 0).getDate();
}
function jn(t, e, n) {
  return `${t}-${String(e + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Qr({ selected: t, onChange: e, theme: n = "light", showChips: r = !0, className: i = "" }) {
  const l = /* @__PURE__ */ new Date(), [c, u] = W(l.getFullYear()), [s, a] = W(l.getMonth()), d = Je(() => new Set(t), [t]), m = (h) => {
    d.has(h) ? e(t.filter((M) => M !== h)) : e([...t, h]);
  }, b = Je(() => {
    const h = Gn(c, s), M = new Date(c, s, 1).getDay(), A = [];
    for (let S = 0; S < M; S++) A.push({ key: `pad-${S}`, day: 0, empty: !0 });
    for (let S = 1; S <= h; S++) A.push({ key: jn(c, s, S), day: S, empty: !1 });
    return A;
  }, [c, s]), p = n === "dark", g = z ? "py-2" : "py-1.5", w = z ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ v("div", { className: `border rounded-lg overflow-hidden w-full ${p ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ v("div", { className: `flex items-center justify-between px-3 py-2 border-b ${p ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (u((h) => h - 1), a(11)) : a((h) => h - 1);
          },
          className: `p-1 rounded transition-colors ${p ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ o(At, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ o("span", { className: `text-sm font-semibold ${p ? "text-zinc-100" : "text-zinc-800"}`, children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" }) }),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 11 ? (u((h) => h + 1), a(0)) : a((h) => h + 1);
          },
          className: `p-1 rounded transition-colors ${p ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ o(_e, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "grid grid-cols-7 text-center", children: [
      qn.map((h) => /* @__PURE__ */ o("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${p ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: h }, h)),
      b.map((h) => h.empty ? /* @__PURE__ */ o("div", {}, h.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => m(h.key),
          className: `${g} text-xs font-medium transition-colors border-b ${p ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${d.has(h.key) ? p ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: h.day
        },
        h.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ v("div", { className: `px-3 py-2 border-t ${p ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ v("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: t.map((h) => {
        const A = (/* @__PURE__ */ new Date(h + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ v("span", { className: `inline-flex items-center gap-1 rounded font-medium ${p ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${w}`, children: [
          A,
          /* @__PURE__ */ o("button", { type: "button", onClick: () => m(h), className: `hover:opacity-70 leading-none ${p ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${A}`, children: "×" })
        ] }, h);
      }) })
    ] })
  ] });
}
function Jr({
  items: t,
  selected: e,
  onToggle: n,
  title: r,
  onToggleAll: i,
  allSelected: l = !1,
  toggleAllLabel: c,
  emptyHint: u = "Nothing here",
  maxHeight: s,
  disabled: a = !1,
  theme: d,
  className: m = ""
}) {
  const b = (h) => e instanceof Set ? e.has(h) : e.includes(h), p = z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", g = z ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", w = r != null || i != null;
  return /* @__PURE__ */ v("div", { className: m, ...d ? { "data-theme": d } : {}, children: [
    w && /* @__PURE__ */ v("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ o("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: c ?? (l ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ v(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          t.map((h) => {
            const M = b(h.id);
            return /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => n(h.id),
                className: `ui-checklist-item ${p} ${M ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${g}`, "aria-hidden": !0, children: M && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  h.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: h.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: h.label }),
                  h.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: h.secondary })
                ]
              },
              h.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: u })
        ]
      }
    )
  ] });
}
function eo({
  items: t,
  value: e,
  onChange: n,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: l,
  compact: c = !1,
  disabled: u = !1,
  theme: s,
  className: a = ""
}) {
  const d = c ? "px-2.5 py-1.5 text-xs" : z ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", m = c ? "w-3.5 h-3.5" : z ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ v("div", { className: a, ...s ? { "data-theme": s } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ v(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          t.map((b) => {
            const p = e === b.id;
            return /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(b.id),
                className: `ui-checklist-item ${d} ${p ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${m}`, "aria-hidden": !0, children: p && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  b.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: b.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: b.label }),
                  b.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: b.secondary })
                ]
              },
              b.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ o("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const to = ({
  className: t,
  children: e,
  reference: n,
  placement: r = "top",
  anchorMode: i = "visible",
  offset: l = 8
}) => {
  const c = ae(), { refs: u, floatingStyles: s } = Ht({
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
        fn: (a) => {
          var A;
          if (i !== "visible") return {};
          const d = (A = a.elements.floating.ownerDocument) == null ? void 0 : A.defaultView;
          if (!d) return {};
          const m = a.rects.reference, b = Math.max(m.x, 0), p = Math.max(m.y, 0), g = Math.min(m.x + m.width, d.innerWidth), w = Math.min(m.y + m.height, d.innerHeight);
          if (g <= b || w <= p) return {};
          const h = r === "left" ? g - (m.x + m.width) : r === "right" ? b - m.x : 0, M = r === "top" ? p - m.y : r === "bottom" ? w - (m.y + m.height) : 0;
          return { x: a.x + h, y: a.y + M };
        }
      },
      Ut(l),
      Xt({ padding: 8 }),
      Yt({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (a) => {
          var w;
          const d = (w = a.elements.floating.ownerDocument) == null ? void 0 : w.defaultView;
          if (!d) return {};
          const m = a.rects.floating.width, b = a.rects.floating.height, p = Math.max(8, Math.min(a.x, d.innerWidth - m - 8)), g = Math.max(8, Math.min(a.y, d.innerHeight - b - 8));
          return { x: p, y: g };
        }
      }
    ],
    whileElementsMounted: Wt
  });
  return oe(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ v(le, { children: [
    !n && /* @__PURE__ */ o("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    c && Ye(
      /* @__PURE__ */ o(
        "div",
        {
          ref: u.setFloating,
          className: `ui-chrome ${t}`,
          style: s,
          onMouseDown: (a) => a.stopPropagation(),
          onClick: (a) => a.stopPropagation(),
          onDragStart: (a) => a.preventDefault(),
          children: e
        }
      ),
      c.document.body
    )
  ] });
}, xe = ({ content: t, children: e }) => {
  const n = fe(), r = ae(), [i, l] = W(!1), [c, u] = W({ x: 0, y: 0 }), s = $(null), a = () => {
    if (!s.current) return;
    const d = s.current.getBoundingClientRect();
    u({ x: d.left + d.width / 2, y: d.top });
  };
  return Y(() => (i && r && (a(), r.addEventListener("scroll", a, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", a, !0)), [i]), /* @__PURE__ */ v(
    "div",
    {
      ref: s,
      className: "inline-flex",
      onMouseEnter: () => {
        a(), l(!0);
      },
      onMouseLeave: () => l(!1),
      children: [
        e,
        i && Ye(
          /* @__PURE__ */ v(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: c.x, top: c.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                t.split(`
• `).map((d, m) => /* @__PURE__ */ o("div", { className: m > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: d }, m)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, no = z ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", We = z ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", $e = z ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Vn = "hover:bg-red-950/50", Ct = z ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", zt = "bg-blue-900/50 border-blue-700 text-blue-300", Tt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Zn = z ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", ro = z ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Te = z ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Qn = "inline-flex rounded overflow-hidden border border-zinc-700", Et = z ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ce = ({ onClick: t, disabled: e, title: n, className: r = We, children: i }) => /* @__PURE__ */ o(xe, { content: n, children: /* @__PURE__ */ o("button", { onClick: t, disabled: e, "aria-label": n, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), oo = ({ value: t, options: e, onChange: n, disabled: r, active: i }) => /* @__PURE__ */ o("div", { className: Qn, children: e.map((l) => {
  const c = i ? i(l.v) : t === l.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(l.v),
      className: `${z ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${c ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${l.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: l.l
    },
    l.v
  );
}) }), io = ({ children: t }) => /* @__PURE__ */ v("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: z ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Jn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", er = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", so = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ v("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ o("span", { className: n ? Jn : er, children: t }),
  e
] }), co = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ v("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  t,
  e && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: e })
] }), lo = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => /* @__PURE__ */ v(le, { children: [
  /* @__PURE__ */ o(Ce, { onClick: () => r(-1), disabled: t, title: "Move up", className: $e, children: /* @__PURE__ */ o(Lt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Ce, { onClick: () => r(1), disabled: t, title: "Move down", className: $e, children: /* @__PURE__ */ o(Ot, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o(Ce, { onClick: e, disabled: t, title: "Duplicate", className: $e, children: /* @__PURE__ */ o(pt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ o("div", { className: Te }),
  /* @__PURE__ */ o(Ce, { onClick: n, disabled: t, title: "Delete", className: `${$e} ${Vn}`, children: /* @__PURE__ */ o(Oe, { className: "w-2.5 h-2.5" }) })
] }), tr = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), nr = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), rr = /^(https?:\/\/|mailto:)/i;
function or(t) {
  if (!t) return "";
  const e = [];
  for (const n of t.split(";")) {
    const r = n.indexOf(":");
    if (r < 0) continue;
    const i = n.slice(0, r).trim().toLowerCase(), l = n.slice(r + 1).trim();
    nr.has(i) && l && e.push(`${i}: ${l}`);
  }
  return e.join("; ");
}
function Ue(t) {
  if (t.nodeType === Node.TEXT_NODE) return t;
  if (t.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = t, n = e.tagName.toLowerCase(), r = () => {
    const u = document.createDocumentFragment();
    for (const s of Array.from(e.childNodes)) u.appendChild(Ue(s));
    return u;
  };
  if (!tr.has(n)) return r();
  if (n === "a") {
    const u = e.getAttribute("href") || "";
    if (!rr.test(u)) return r();
  }
  const i = document.createElement(n), l = e.getAttribute("style"), c = or(l || "");
  if (c && i.setAttribute("style", c), n === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const u = e.getAttribute("target"), s = e.getAttribute("rel");
    u && i.setAttribute("target", u), s && i.setAttribute("rel", s);
  }
  for (const u of Array.from(e.childNodes)) i.appendChild(Ue(u));
  return i;
}
function Dt(t) {
  return t.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function ir(t) {
  const e = Dt(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  n.innerHTML = e;
  const r = document.createDocumentFragment();
  for (const c of Array.from(n.content.childNodes)) r.appendChild(Ue(c));
  const i = document.createElement("div");
  return i.appendChild(r), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function ao(t) {
  const e = Dt(t);
  if (!e || !e.includes("<")) return e;
  const n = document.createElement("template");
  return n.innerHTML = e, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function uo(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const sr = { text: "#52525b" }, cr = ({ node: t, selected: e, extension: n, editor: r, view: i, getPos: l }) => {
  var m;
  const c = t.attrs.field ?? "", u = n.options, s = ((m = u.resolve) == null ? void 0 : m.call(u, c)) ?? null, a = (s == null ? void 0 : s.color) ?? sr, d = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
  return /* @__PURE__ */ o(
    qt,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${e ? "rt-token-selected" : ""}`,
      style: {
        background: a.text,
        color: "#fff",
        borderRadius: 2,
        padding: 4,
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      onMouseDown: (b) => {
        var h;
        if (b.button !== 0 || !r.isEditable) return;
        b.preventDefault(), r.isFocused || r.commands.focus();
        const p = typeof l == "function" ? l() : null;
        if (p == null) return;
        const g = i.state.doc.resolve(p), w = g.nodeAfter;
        w && Ee.isSelectable(w) && i.dispatch(i.state.tr.setSelection(new Ee(g))), (h = u.onTokenClick) == null || h.call(u, c, b.currentTarget.getBoundingClientRect(), p);
      },
      children: d
    }
  );
};
function lr(t) {
  return t.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function at(t) {
  return t.replace(/\{\{([^{}]+)\}\}/g, (e, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const ar = nn.extend({
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
    return Kt(cr);
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
}), ur = 240, dr = 280, fr = ({ props: t, highlight: e, onHighlight: n }) => {
  const r = $(null);
  return Y(() => {
    var l;
    const i = (l = r.current) == null ? void 0 : l.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [e]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: dr, maxHeight: ur, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: t.items.map((i, l) => /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      "data-ac-active": l === e ? "1" : void 0,
      onMouseEnter: () => n(l),
      onClick: () => t.command({ field: i.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${l === e ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ o("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: i.color.text } }),
        /* @__PURE__ */ o("span", { className: "truncate flex-1", children: i.label }),
        i.group && /* @__PURE__ */ o("span", { className: "shrink-0 text-[9px] text-zinc-600", children: i.group })
      ]
    },
    i.key
  )) }) });
}, pr = () => {
  let t = null;
  const e = (n) => {
    if (!t) return;
    t.props = n;
    const r = t.highlight;
    t.holder.style.display = n.items.length > 0 ? "" : "none", t.root.render(/* @__PURE__ */ o(fr, { props: n, highlight: r, onHighlight: (i) => {
      t.highlight = i, e(t.props);
    } }));
  };
  return {
    onStart(n) {
      const r = document.createElement("div");
      r.style.position = "fixed", r.style.zIndex = "9999";
      const i = rn(r);
      t = { holder: r, root: i, unmount: null, props: n, highlight: 0 };
      const l = n.mount(r, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: c, y: u, placement: s }) => {
          var m, b;
          if (!t) return;
          const a = (b = (m = t.props) == null ? void 0 : m.clientRect) == null ? void 0 : b.call(m), d = a && !s.endsWith("-end") ? a.width : 0;
          r.style.left = `${c + d}px`, r.style.top = `${u}px`;
        }
      });
      t.unmount = l, e(n);
    },
    onUpdate(n) {
      t && e(n);
    },
    onKeyDown({ event: n }) {
      var c;
      if (!(t != null && t.props)) return !1;
      const { items: r, command: i } = t.props;
      if (r.length === 0) return !1;
      const l = n.key;
      return l === "ArrowDown" ? (n.preventDefault(), t.highlight = Math.min(t.highlight + 1, r.length - 1), e(t.props), !0) : l === "ArrowUp" ? (n.preventDefault(), t.highlight = Math.max(t.highlight - 1, 0), e(t.props), !0) : l === "Enter" || l === "Tab" ? (n.preventDefault(), i({ field: ((c = r[t.highlight]) == null ? void 0 : c.key) ?? r[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      t && ((n = t.unmount) == null || n.call(t), t.root.unmount(), t.holder.remove(), t = null);
    }
  };
}, fo = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, hr = ye.forwardRef(({
  value: t,
  onChange: e,
  placeholder: n,
  disabled: r,
  className: i,
  onStateChange: l,
  resolveToken: c,
  suggestionItems: u,
  onTokenClick: s,
  onSelectionChange: a
}, d) => {
  const m = $(c);
  m.current = c;
  const b = $(u);
  b.current = u;
  const p = $(s);
  p.current = s;
  const g = $(a);
  g.current = a;
  const w = $(null), h = $(null), M = $(e);
  M.current = e;
  const A = $(r);
  A.current = r;
  const S = $(l);
  S.current = l;
  const E = $(null), R = (C) => {
    var O;
    const N = {
      bold: C.isActive("bold"),
      italic: C.isActive("italic"),
      underline: C.isActive("underline"),
      strike: C.isActive("strike"),
      link: C.isActive("link"),
      color: C.getAttributes("textStyle").color || ""
    }, T = E.current;
    T && T.bold === N.bold && T.italic === N.italic && T.underline === N.underline && T.strike === N.strike && T.link === N.link && T.color === N.color || (E.current = N, (O = S.current) == null || O.call(S, N));
  }, B = (C) => {
    var V;
    const N = C.state.selection;
    let T = null;
    N instanceof Ee && N.node.type.name === "token" ? (T = { key: N.node.attrs.field ?? "", pos: N.from }, w.current = N.from) : w.current != null && (w.current = C.state.tr.mapping.map(w.current));
    const O = h.current, K = O && T && O.key === T.key && O.pos === T.pos;
    !O && !T || K || (h.current = T, (V = g.current) == null || V.call(g, T));
  }, j = (C) => {
    const N = ir(lr(C));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(N) ? "" : N;
  }, F = ye.useMemo(() => {
    const C = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: N }) => {
        var T;
        return ((T = b.current) == null ? void 0 : T.call(b, N)) ?? [];
      },
      command: ({ editor: N, range: T, props: O }) => {
        N.chain().focus().insertContentAt(T, { type: "token", attrs: { field: O.field } }).run();
      },
      render: pr
    };
    return ar.configure({
      resolve: m.current ?? null,
      suggestion: C,
      onTokenClick: (N, T, O) => {
        var K;
        w.current = O, (K = p.current) == null || K.call(p, N, T, O);
      }
    });
  }, []), f = Gt({
    immediatelyRender: !1,
    extensions: [
      Vt,
      Zt.configure({ placeholder: n }),
      Qt,
      Jt,
      tn,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      en.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      F
    ],
    content: at(t || ""),
    editable: !r,
    onUpdate: ({ editor: C }) => {
      M.current(j(C.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: C }) => {
      R(C), B(C);
    }
  });
  return Y(() => {
    if (!f || f.isFocused) return;
    j(f.getHTML()) !== t && (E.current = null, f.commands.setContent(at(t || ""), { emitUpdate: !1 }), R(f));
  }, [t, f]), Y(() => {
    f && f.setEditable(!r);
  }, [r, f]), Y(() => {
    f && (E.current = null, R(f), B(f));
  }, [f]), Rt(d, () => ({
    exec: (C, N) => {
      if (!(!f || A.current))
        switch (C) {
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
            N && f.chain().focus().setColor(N).run();
            break;
          case "unsetColor":
            f.chain().focus().unsetColor().run();
            break;
          case "link":
            N && f.chain().focus().extendMarkRange("link").setLink({ href: N }).run();
            break;
          case "unlink":
            f.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => f == null ? void 0 : f.commands.focus(),
    insertToken: (C) => {
      !f || A.current || f.chain().focus().insertContent({ type: "token", attrs: { field: C } }).run();
    },
    replaceToken: (C) => {
      if (!f || A.current) return;
      const N = w.current;
      N != null && f.commands.command(({ tr: T }) => {
        const O = T.doc.nodeAt(N);
        if (!O || O.type.name !== "token") return !1;
        T.setNodeMarkup(N, void 0, { field: C });
        const K = T.doc.resolve(N);
        return K.nodeAfter && K.nodeAfter.type.name === "token" && T.setSelection(new Ee(K)), !0;
      });
    }
  }), [f]), /* @__PURE__ */ o(jt, { editor: f, className: `richtext-editor ${i || ""}` });
});
hr.displayName = "RichTextEditor";
const mr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], br = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], ut = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), po = ({ value: t, disabled: e, onChange: n }) => {
  const [r, i] = W(!1);
  return /* @__PURE__ */ o(
    Se,
    {
      open: r,
      onOpenChange: i,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ v("button", { type: "button", disabled: e, className: `${Et} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ o(mt, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: mr.map((l) => /* @__PURE__ */ o(bn, { onClick: () => {
        n(l), i(!1);
      }, icon: l === t ? /* @__PURE__ */ o(ft, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: l }, children: l }) }, l))
    }
  );
}, gr = ({ editorRef: t, disabled: e, active: n }) => {
  const [r, i] = W(!1), [l, c] = W(""), u = () => {
    var a;
    const s = l.trim();
    s && ((a = t.current) == null || a.exec("link", s), i(!1));
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
          className: `${Ct} ${n ? zt : Tt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ o(Bt, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ v("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ o(
          "input",
          {
            value: l,
            onChange: (s) => c(s.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (s) => {
              s.key === "Enter" && (s.preventDefault(), u());
            },
            className: Zn + " w-full"
          }
        ),
        /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: u, className: We, disabled: !l.trim(), children: "Apply" }),
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
}, ho = ({ editorRef: t, disabled: e, active: n, lockedFormatting: r, trailing: i }) => {
  const [l, c] = W(!1), u = (d, m) => {
    var b;
    return (b = t.current) == null ? void 0 : b.exec(d, m);
  }, s = (d) => `${Ct} ${d ? zt : Tt}`, a = (d) => !!(r != null && r[d]);
  return /* @__PURE__ */ v("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: e || a("bold"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || a("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: e || a("italic"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || a("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o(xe, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(_t, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o(xe, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(It, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o("div", { className: Te }),
    /* @__PURE__ */ o(gr, { editorRef: t, disabled: e, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ o("div", { className: Te }),
    /* @__PURE__ */ o(
      Se,
      {
        open: l,
        onOpenChange: c,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ v("button", { type: "button", disabled: e, className: `${Et} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(ut, {}),
          /* @__PURE__ */ o(mt, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ v("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                u("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(ut, { className: "w-3.5 h-3.5" })
            }
          ),
          br.map((d) => /* @__PURE__ */ o(
            "button",
            {
              onClick: () => {
                u("foreColor", d), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${d === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: d },
              title: d
            },
            d
          ))
        ] })
      }
    ),
    i && /* @__PURE__ */ v(le, { children: [
      /* @__PURE__ */ o("div", { className: Te }),
      i
    ] })
  ] });
};
export {
  Vr as Button,
  wn as Checkbox,
  Jr as Checklist,
  co as ChromeHeader,
  so as ContentRow,
  Ir as ContextMenu,
  Hr as ContextMenuDivider,
  Br as ContextMenuItem,
  Qr as DatePicker,
  Ur as DialogProvider,
  bn as DropdownItem,
  Se as DropdownMenu,
  _r as DropdownSubmenu,
  xt as DropdownThemeContext,
  mr as FONTS,
  to as FloatingChrome,
  po as FontMenu,
  ho as FormatToolbar,
  z as IS_COARSE,
  cn as IS_TOUCH_CAPABLE,
  Or as ItemManagerDropdown,
  Kr as LongPressMenuProvider,
  Ke as MORPH_EASE,
  de as MORPH_MS,
  qe as MORPH_OPACITY_MS,
  Xr as Modal,
  Yr as ModalFooter,
  Zr as ModalFooterButton,
  on as PopoutWindowContext,
  fo as RICH_TEXT_STATE_IDLE,
  eo as RadioList,
  hr as RichTextEditor,
  io as SectionHeader,
  oo as Seg,
  lo as StructureControls,
  vt as SubmenuContext,
  We as TB_BTN,
  $e as TB_BTN_ICON,
  Vn as TB_DANGER,
  Te as TB_DIVIDER,
  Zn as TB_INPUT,
  ro as TB_NUM,
  Et as TB_PICKER,
  no as TB_ROW_LABEL,
  Qn as TB_SEG,
  Ct as TB_TOGGLE,
  Tt as TB_TOGGLE_OFF,
  zt as TB_TOGGLE_ON,
  ar as Token,
  cr as TokenChipView,
  Ce as ToolButton,
  xe as Tooltip,
  Ge as ZOOM_FROM,
  fn as cloneOverlayClose,
  uo as escapeHtml,
  wt as getDropdownClasses,
  Ar as getHardwareKeyboard,
  Pr as getLastPointerType,
  Wn as isInteractiveElement,
  Ie as isTouchLike,
  an as nearestOverlayOrigin,
  Dt as normalizeSpaces,
  Pe as overlayMorphEnabled,
  dn as playOverlayClose,
  un as playOverlayOpen,
  at as preprocessTokenHtml,
  ir as sanitizeRichText,
  ao as stripRichText,
  lr as stripTokenWrappers,
  sn as useCurrentDocument,
  ae as useCurrentWindow,
  Wr as useDialog,
  yt as useDropdownTheme,
  Gr as useFixedPosition,
  Lr as useHardwareKeyboard,
  ln as useLastPointerType,
  Fr as useLongPressOptOut,
  Ve as useOverlayMorph,
  Fe as usePopoutWindow,
  fe as usePortalTarget,
  qr as useSmartPosition,
  jr as useTouchMode
};
