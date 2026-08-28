"use client";
import { jsxs as w, jsx as r, Fragment as ce } from "react/jsx-runtime";
import ye, { createContext as Se, useContext as Re, useState as U, useEffect as Y, useRef as C, useCallback as W, useLayoutEffect as ne, useMemo as Je, useImperativeHandle as Mt } from "react";
import * as X from "@radix-ui/react-dropdown-menu";
import { Check as dt, X as Ye, Pencil as St, Copy as ft, Trash2 as _e, RotateCcw as pt, Plus as Rt, ChevronRight as Ie, ChevronLeft as Pt, ArrowUp as At, ArrowDown as Lt, ChevronDown as ht, Underline as Ot, Strikethrough as _t, Link as It } from "lucide-react";
import * as Q from "@radix-ui/react-dialog";
import { createPortal as Fe } from "react-dom";
import { useFloating as Bt, autoUpdate as Ht, offset as Wt, flip as Ut, shift as Xt } from "@floating-ui/react-dom";
import { mergeAttributes as Yt, ReactNodeViewRenderer as Ft, NodeViewWrapper as Kt, useEditor as Gt, EditorContent as jt } from "@tiptap/react";
import { NodeSelection as Ee } from "@tiptap/pm/state";
import qt from "@tiptap/starter-kit";
import Vt from "@tiptap/extension-placeholder";
import { TextStyle as Zt } from "@tiptap/extension-text-style";
import Qt from "@tiptap/extension-color";
import Jt from "@tiptap/extension-link";
import en from "@tiptap/extension-underline";
import { Mention as tn } from "@tiptap/extension-mention";
import { createRoot as nn } from "react-dom/client";
const rn = Se(null);
function Ke() {
  return Re(rn);
}
function fe() {
  const t = Ke();
  return t ? t.document.body : null;
}
function on() {
  const t = Ke();
  return t ? t.document : typeof document < "u" ? document : null;
}
function le() {
  return Ke() ?? (typeof window < "u" ? window : null);
}
const ve = typeof window < "u", T = ve && window.matchMedia("(pointer: coarse)").matches, sn = ve && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Be(t) {
  return t === "touch" || t === "pen";
}
let ue = null;
const He = /* @__PURE__ */ new Set();
ve && window.addEventListener("pointerdown", (t) => {
  ue = t.pointerType, He.forEach((e) => e());
}, !0);
function Sr() {
  return ue;
}
function cn() {
  const [, t] = U(0), e = C(ue);
  return Y(() => {
    const n = () => {
      e.current !== ue && (e.current = ue, t((o) => o + 1));
    };
    return He.add(n), () => {
      He.delete(n);
    };
  }, []), ue;
}
const mt = ["(any-hover: hover)", "(any-pointer: fine)"];
function gt() {
  return ve ? mt.some((t) => window.matchMedia(t).matches) : !1;
}
let De = gt();
const We = /* @__PURE__ */ new Set();
function et(t) {
  De !== t && (De = t, We.forEach((e) => e()));
}
var ut;
if (ve) {
  const t = () => et(gt());
  for (const c of mt) {
    const u = window.matchMedia(c);
    (ut = u.addEventListener) == null || ut.call(u, "change", t);
  }
  window.addEventListener("focus", t), document.addEventListener("visibilitychange", t);
  const e = window.setInterval(() => {
    document.visibilityState === "visible" && t();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(e)), window.addEventListener("keydown", (c) => {
    c.isComposing || c.keyCode !== 229 && (c.key === "Enter" || c.key === "Backspace" || c.key === "Process" || c.key === "Unidentified" || et(!0));
  });
  let n = null, o = null;
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
    a[i] = !0, o = { x: c.clientX, y: c.clientY, time: Date.now() }, s.dispatchEvent(a);
  }, !0), window.addEventListener("click", (c) => {
    c[i] || o && Date.now() - o.time < 1e3 && Math.hypot(c.clientX - o.x, c.clientY - o.y) < 12 && (c.preventDefault(), c.stopPropagation());
  }, !0);
}
function Rr() {
  return De;
}
function Pr() {
  const [, t] = U(0);
  return Y(() => {
    const e = () => t((n) => n + 1);
    return We.add(e), () => {
      We.delete(e);
    };
  }, []), De;
}
const de = 220, Ge = "cubic-bezier(0.32, 0.72, 0, 1)", je = 170, qe = 0.94;
function Ae(t) {
  return t === !1 || typeof window > "u" ? !1 : !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ln(t, e) {
  const n = e.left + e.width / 2, o = e.top + e.height / 2;
  return {
    x: n < t.left ? 0 : n > t.left + t.width ? 1 : 0.5,
    y: o < t.top ? 0 : o > t.top + t.height ? 1 : 0.5
  };
}
function Me(t, e) {
  const n = (e == null ? void 0 : e()) ?? null;
  if (!n) return { x: 0.5, y: 0.5 };
  const o = t.getBoundingClientRect();
  return ln({ left: o.left, top: o.top, width: o.width, height: o.height }, n);
}
function an(t, e, n, o) {
  const i = ++t.current, l = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity };
  e.style.transition = "none", e.style.transformOrigin = "50% 50%", e.style.transform = `scale(${qe})`, e.style.opacity = "0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    if (t.current !== i) return;
    const c = Me(e, n);
    e.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, e.getBoundingClientRect(), requestAnimationFrame(() => {
      if (t.current !== i) return;
      const u = Me(e, n);
      e.style.transformOrigin = `${u.x * 100}% ${u.y * 100}%`, e.style.transition = `transform ${de}ms ${Ge}, opacity ${je}ms ease`, e.style.transform = "none", e.style.opacity = "", window.setTimeout(() => {
        t.current === i && (e.style.transition = l.transition, e.style.transform = l.transform, e.style.transformOrigin = l.transformOrigin, e.style.opacity = l.opacity, o == null || o());
      }, de + 60);
    });
  });
}
function un(t, e, n, o) {
  const i = ++t.current, l = { transition: e.style.transition, transform: e.style.transform, transformOrigin: e.style.transformOrigin, opacity: e.style.opacity, pointerEvents: e.style.pointerEvents }, c = Me(e, n);
  e.style.transition = `transform ${de}ms ${Ge}, opacity ${je}ms ease`, e.style.transformOrigin = `${c.x * 100}% ${c.y * 100}%`, e.style.transform = `scale(${qe})`, e.style.opacity = "0", e.style.pointerEvents = "none", window.setTimeout(() => {
    t.current === i && (e.style.transition = l.transition, e.style.transform = l.transform, e.style.transformOrigin = l.transformOrigin, e.style.opacity = l.opacity, e.style.pointerEvents = l.pointerEvents, o == null || o());
  }, de + 60);
}
function dn(t, e) {
  const n = t.cloneNode(!0), o = t.getBoundingClientRect();
  n.setAttribute("aria-hidden", "true"), n.style.pointerEvents = "none", n.style.position = "fixed", n.style.left = `${o.left}px`, n.style.top = `${o.top}px`, n.style.margin = "0", n.style.visibility = "visible", n.style.transition = "none";
  const i = Me(t, e);
  n.style.transformOrigin = `${i.x * 100}% ${i.y * 100}%`, t.ownerDocument.body.appendChild(n), n.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      n.isConnected && (n.style.transition = `transform ${de}ms ${Ge}, opacity ${je}ms ease`, n.style.transform = `scale(${qe})`, n.style.opacity = "0", window.setTimeout(() => {
        n.isConnected && n.remove();
      }, de + 60));
    });
  });
}
function Ve(t) {
  const e = C(null), [n, o] = U(!1), i = W((f) => {
    t.ref && (t.ref.current = f), e.current = f, o(f !== null);
  }, []), l = C(t.visible);
  l.current = t.visible;
  const c = C(t.visible), u = C(t.anchor ?? null);
  u.current = t.anchor ?? null;
  const s = C(t.onClosed);
  s.current = t.onClosed;
  const a = C(t.morph !== !1);
  a.current = t.morph !== !1;
  const d = C(0);
  return ne(() => {
    if (!n || !l.current || !Ae(a.current)) return;
    const f = e.current;
    f && an(d, f, u.current);
  }, [n, t.visible]), ne(() => {
    var v;
    const f = c.current;
    if (c.current = t.visible, t.visible || !f) return;
    const p = e.current;
    if (!p || !Ae(a.current)) {
      (v = s.current) == null || v.call(s);
      return;
    }
    un(d, p, u.current, () => {
      var x;
      return (x = s.current) == null ? void 0 : x.call(s);
    });
  }, [t.visible]), ne(() => {
    if (t.cloneOnUnmount)
      return () => {
        const f = e.current;
        !f || !l.current || f.style.visibility !== "hidden" && Ae(a.current) && dn(f, u.current);
      };
  }, []), i;
}
const bt = Se("dark"), xt = () => Re(bt), fn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", tt = T ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", pn = T ? "text-xs" : "text-[10px]";
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
const wt = Se({ activeSub: null, setActiveSub: () => {
}, morph: !0 });
function Pe({
  open: t,
  onClose: e,
  onOpenChange: n,
  trigger: o,
  align: i = "left",
  width: l,
  theme: c = "dark",
  children: u,
  morph: s = !0
}) {
  const [a, d] = U(null), f = fe(), p = C(null), v = C(t);
  v.current = t;
  const [x, N] = U(t);
  Y(() => {
    t ? N(!0) : d(null);
  }, [t]);
  const h = W(() => {
    const R = p.current;
    if (!R) return null;
    const B = R.getBoundingClientRect();
    return { left: B.left, top: B.top, width: B.width, height: B.height };
  }, []), M = Ve({
    visible: t,
    morph: s,
    anchor: h,
    onClosed: () => N(!1)
  }), A = W((R) => {
    !R && !v.current || (n ? n(R) : R || e == null || e());
  }, [n, e]), D = ye.isValidElement(o) ? ye.cloneElement(o, {
    ref: (R) => {
      p.current = R;
    }
  }) : o;
  return /* @__PURE__ */ w(X.Root, { open: t || x, onOpenChange: A, modal: !1, children: [
    /* @__PURE__ */ r(X.Trigger, { asChild: !0, children: D }),
    /* @__PURE__ */ r(X.Portal, { container: f ?? void 0, children: /* @__PURE__ */ r(bt.Provider, { value: c, children: /* @__PURE__ */ r(wt.Provider, { value: { activeSub: a, setActiveSub: d, morph: s }, children: /* @__PURE__ */ r(
      X.Content,
      {
        ref: M,
        "data-theme": c,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${l || ""}`,
        align: i === "left" ? "start" : "end",
        sideOffset: 8,
        collisionPadding: 8,
        style: { touchAction: "manipulation" },
        children: u
      }
    ) }) }) })
  ] });
}
function Ar({
  open: t,
  onClose: e,
  items: n,
  activeId: o,
  onSelect: i,
  onRename: l,
  onDuplicate: c,
  onDelete: u,
  onCreate: s,
  onImport: a,
  onExport: d,
  onReset: f,
  onTrash: p,
  closeOnSelect: v,
  readOnly: x = !1,
  theme: N,
  align: h,
  label: M,
  header: A,
  itemLabel: D,
  trigger: S,
  minItems: R = 1,
  itemRender: B,
  morph: q = !0
}) {
  const g = yt(), [y, E] = U(null), [z, P] = U(""), H = C(null), K = C(null);
  Y(() => {
    t && requestAnimationFrame(() => {
      var $, I;
      (I = ($ = K.current) == null ? void 0 : $.querySelector('[data-active="1"]')) == null || I.scrollIntoView({ block: "nearest" });
    });
  }, [t]), Y(() => {
    if (y) {
      requestAnimationFrame(() => {
        var I, j;
        (I = H.current) == null || I.focus(), (j = H.current) == null || j.select();
      });
      const $ = n.find((I) => I.id === y);
      $ && !z && P($.name);
    }
  }, [y]), Y(() => {
    if (y) {
      const $ = n.find((I) => I.id === y);
      $ && !z && P($.name);
    }
  }, [y, n]);
  const G = ($, I) => {
    E($), P(I);
  }, se = () => {
    y && z.trim() && l(y, z.trim()), E(null);
  }, k = () => {
    E(null);
  }, b = D || A.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ w(Pe, { open: t, onOpenChange: ($) => {
    $ ? (E(null), P("")) : (y && z.trim() && l(y, z.trim()), E(null), P("")), (!$ || !x) && e($);
  }, width: "w-80", theme: N, align: h, trigger: S, morph: q, children: [
    /* @__PURE__ */ r("div", { className: `shrink-0 ${g.headerText}`, children: A }),
    /* @__PURE__ */ r("div", { ref: K, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map(($) => {
      const I = $.id === o, j = y === $.id;
      return /* @__PURE__ */ r("div", { "data-active": I ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${I ? g.rowActiveBg : g.rowHoverBg} ${y && !j ? "opacity-40 pointer-events-none" : ""}`, children: j ? /* @__PURE__ */ w(ce, { children: [
        /* @__PURE__ */ r("div", { className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ r(
          "input",
          {
            ref: H,
            value: z,
            onChange: (_) => P(_.target.value),
            onKeyDown: (_) => {
              _.key === "Enter" && (_.preventDefault(), _.stopPropagation(), se()), _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), k());
            },
            className: `w-full border rounded ${g.input}`
          }
        ) }),
        /* @__PURE__ */ r(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${g.editConfirm}`,
            onSelect: (_) => {
              _.preventDefault(), se();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(dt, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${g.editCancel}`,
            onSelect: (_) => {
              _.preventDefault(), k();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(Ye, { className: g.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ w(ce, { children: [
        /* @__PURE__ */ r(
          X.Item,
          {
            className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none cursor-pointer flex items-center ${g.rowText} ${I ? "" : g.rowTextHover}`,
            onSelect: v ? () => {
              i($.id);
            } : (_) => {
              _.preventDefault(), i($.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r("span", { className: `truncate ${I ? g.rowActiveText : ""}`, children: B ? B($) : $.name })
          }
        ),
        /* @__PURE__ */ r(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${I ? g.btnActive : g.btnBase}`,
            onSelect: (_) => {
              _.preventDefault(), G($.id, $.name);
            },
            onTouchStart: () => {
            },
            disabled: x,
            children: /* @__PURE__ */ r(St, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${I ? g.btnActive : g.btnBase}`,
            onSelect: (_) => {
              _.preventDefault();
              const te = c($.id);
              te && G(te, `${$.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: x,
            children: /* @__PURE__ */ r(ft, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= R ? g.btnDisabled : I ? g.btnDangerActive : g.btnDanger}`,
            onSelect: (_) => {
              _.preventDefault(), u($.id);
            },
            onTouchStart: () => {
            },
            disabled: x || n.length <= R,
            children: /* @__PURE__ */ r(_e, { className: g.btnIcon })
          }
        )
      ] }) }, $.id);
    }) }),
    /* @__PURE__ */ w("div", { className: `shrink-0 ${y ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ w(ce, { children: [
        /* @__PURE__ */ r(X.Separator, { className: g.separator }),
        /* @__PURE__ */ w(
          X.Item,
          {
            className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
            onSelect: ($) => {
              $.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: x,
            children: [
              /* @__PURE__ */ r(pt, { className: `${g.btnIcon} ${g.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || a || d || p) && /* @__PURE__ */ r(X.Separator, { className: g.separator }),
      s && /* @__PURE__ */ w(
        X.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: ($) => {
            $.preventDefault();
            const I = s();
            I && G(I, "");
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ r(Rt, { className: `${g.btnIcon} ${g.icon}` }),
            "New ",
            b
          ]
        }
      ),
      a && /* @__PURE__ */ w(
        X.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: ($) => {
            $.preventDefault(), a();
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ w("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ r("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ r("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ r("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      d && /* @__PURE__ */ w(
        X.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: ($) => {
            $.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ w("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ r("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ r("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ r("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      p && /* @__PURE__ */ w(
        X.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: ($) => {
            $.preventDefault(), p();
          },
          onTouchStart: () => {
          },
          disabled: x,
          children: [
            /* @__PURE__ */ r(_e, { className: `${g.btnIcon} ${g.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const hn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function mn({
  onClick: t,
  icon: e,
  disabled: n = !1,
  variant: o = "default",
  className: i = "",
  children: l,
  keepOpen: c = !1,
  rightAction: u
}) {
  xt();
  const s = yt(), a = C(!1), d = o === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ w(
    X.Item,
    {
      className: `w-full text-left ${hn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (f) => {
        if (a.current) {
          a.current = !1;
          return;
        }
        c && f.preventDefault(), t();
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        e && /* @__PURE__ */ r("span", { className: `${s.icon} shrink-0`, children: e }),
        /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: l }),
        u && /* @__PURE__ */ r(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: u.title,
            onPointerDown: (f) => {
              f.stopPropagation(), f.preventDefault(), a.current = !0, u.onClick();
            },
            onClick: (f) => {
              f.stopPropagation(), f.preventDefault();
            },
            children: u.icon
          }
        )
      ]
    }
  );
}
const gn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Lr({ id: t, label: e, icon: n, width: o, side: i = "right", children: l }) {
  const { activeSub: c, setActiveSub: u, morph: s } = Re(wt), a = c === t, d = xt(), f = fe(), p = C(null), [v, x] = U(a);
  Y(() => {
    a && x(!0);
  }, [a]);
  const N = W(() => {
    const D = p.current;
    if (!D) return null;
    const S = D.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), h = Ve({
    visible: a,
    morph: s,
    anchor: N,
    onClosed: () => x(!1)
  }), M = `w-full text-left ${gn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item`, A = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${o || "w-48"}`;
  return /* @__PURE__ */ w(X.Sub, { open: a || v, onOpenChange: (D) => u(D ? t : null), children: [
    /* @__PURE__ */ w(
      X.SubTrigger,
      {
        ref: p,
        className: M,
        onTouchStart: () => {
        },
        onPointerDown: (D) => {
          D.pointerType === "pen" && (D.preventDefault(), u(a ? null : t));
        },
        children: [
          i === "left" && /* @__PURE__ */ r(Ie, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ w("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ r("span", { className: "ui-icon shrink-0", children: n }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ r(Ie, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ r(X.Portal, { container: f ?? void 0, children: /* @__PURE__ */ r(
      X.SubContent,
      {
        ref: h,
        "data-theme": d,
        className: A,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        children: l
      }
    ) })
  ] });
}
const ge = 8, bn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", xn = T ? "text-sm" : "text-xs", Or = ({ open: t, x: e, y: n, onClose: o, children: i, containerRef: l, morph: c = !0 }) => {
  const u = ye.useRef(null), s = le(), [a, d] = U(t);
  Y(() => {
    t && d(!0);
  }, [t]);
  const f = W(() => ({ left: e, top: n, width: 0, height: 0 }), [e, n]), p = Ve({
    visible: t,
    morph: c,
    anchor: f,
    onClosed: () => d(!1)
  }), v = W((x) => {
    u.current = x, p(x);
  }, [p]);
  return Y(() => {
    if (!t || !s) return;
    const x = (h) => {
      u.current && !u.current.contains(h.target) && o();
    }, N = (h) => {
      h.key === "Escape" && o();
    };
    return s.addEventListener("pointerdown", x, !0), s.addEventListener("keydown", N, !0), () => {
      s.removeEventListener("pointerdown", x, !0), s.removeEventListener("keydown", N, !0);
    };
  }, [t, o, s]), ne(() => {
    var B;
    if (!t || !u.current) return;
    const x = u.current.getBoundingClientRect(), N = (B = l == null ? void 0 : l.current) == null ? void 0 : B.getBoundingClientRect(), h = N ? N.right : (s == null ? void 0 : s.innerWidth) ?? 0, M = N ? N.bottom : (s == null ? void 0 : s.innerHeight) ?? 0, A = N ? N.left : 0, D = N ? N.top : 0;
    let S = Math.max(D + ge, n), R = Math.max(A + ge, e);
    R + x.width > h && (R = h - x.width - ge), S + x.height > M && (S = Math.max(D + ge, M - x.height - ge)), u.current.style.top = `${S}px`, u.current.style.left = `${R}px`;
  }, [t, e, n, l]), !t && !a ? null : /* @__PURE__ */ r(
    "div",
    {
      ref: v,
      "data-theme": "light",
      className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${xn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
      style: { top: n, left: e, touchAction: "manipulation" },
      children: i
    }
  );
}, _r = ({ onClick: t, variant: e = "default", icon: n, disabled: o = !1, children: i }) => /* @__PURE__ */ w(
  "button",
  {
    onClick: o ? void 0 : t,
    onTouchStart: () => {
    },
    className: `w-full text-left ${bn} flex items-center gap-2 rounded cursor-pointer ${o ? "opacity-40 cursor-default" : e === "danger" ? "ui-item ui-item-danger" : "ui-item"}`,
    children: [
      n,
      i
    ]
  }
), Ir = () => /* @__PURE__ */ r("div", { className: "ui-sep my-1" });
function yn({ checked: t, onChange: e, disabled: n = !1, label: o, id: i, className: l = "", labelClassName: c = "", theme: u, variant: s = "pill", tone: a = "accent", block: d = !1 }) {
  const f = s !== "plain", p = T ? "w-5 h-5" : "w-4 h-4", v = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", x = T ? "w-3.5 h-3.5" : "w-3 h-3", N = T ? "text-sm" : "text-xs";
  return /* @__PURE__ */ w(
    "label",
    {
      className: `ui-checkbox ${f ? `ui-checkbox-pill ${T ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${a === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${l}`,
      style: { display: d ? "flex" : "inline-flex", alignItems: "center", gap: T ? 10 : 8 },
      onClick: (M) => M.stopPropagation(),
      ...u ? { "data-theme": u } : {},
      children: [
        /* @__PURE__ */ r(
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
        f ? /* @__PURE__ */ r("span", { className: "ui-check-indicator", "aria-hidden": !0, children: t ? /* @__PURE__ */ w("svg", { viewBox: "0 0 16 16", className: p, "aria-hidden": !0, children: [
          /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ r("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ r("svg", { viewBox: "0 0 16 16", className: p, "aria-hidden": !0, children: /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ r("span", { className: `ui-checkbox-box ${v}`, "aria-hidden": !0, children: t && /* @__PURE__ */ r("svg", { viewBox: "0 0 12 12", fill: "none", className: x, "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        o != null && /* @__PURE__ */ r("span", { className: `ui-checkbox-label ${N} ${c}`, children: o })
      ]
    }
  );
}
const wn = T ? "p-6" : "p-5", vn = T ? "text-base" : "text-sm", kn = T ? "w-5 h-5" : "w-4 h-4", Nn = T ? "text-sm" : "text-xs", $n = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", nt = T ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", rt = T ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", ot = T ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", Ne = T ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", vt = Se(null);
function Br() {
  const t = Re(vt);
  if (!t) throw new Error("useDialog must be used within DialogProvider");
  return t;
}
function Hr({ children: t }) {
  const [e, n] = U(null), [o, i] = U(!1), l = fe(), c = le(), u = C(c);
  u.current = c;
  const s = C(null), a = C(null), [d, f] = U(null), p = C(null), [v, x] = U(null), N = C(null), h = p.current !== null;
  N.current, Y(() => {
    e || (f(null), x(null));
  }, [e]);
  const M = W(() => {
    const k = a.current;
    if (!k) return null;
    const b = k.getBoundingClientRect();
    return { left: b.left, top: b.top, width: b.width, height: b.height };
  }, []), A = W((k) => {
    if (k.target.closest("button")) return;
    const b = M();
    b && (f(b), x({ w: b.width, h: b.height }), p.current = { startX: k.clientX, startY: k.clientY, posX: b.left, posY: b.top }, k.target.setPointerCapture(k.pointerId));
  }, [M]), D = W((k) => {
    const b = p.current;
    b && (k.preventDefault(), f({ left: b.posX + k.clientX - b.startX, top: b.posY + k.clientY - b.startY }));
  }, []), S = W(() => {
    p.current = null;
  }, []), R = W((k) => (b) => {
    b.stopPropagation();
    const $ = M();
    $ && (f($), x({ w: $.width, h: $.height }), N.current = { dir: k, startX: b.clientX, startY: b.clientY, startL: $.left, startT: $.top, startW: $.width, startH: $.height }, b.target.setPointerCapture(b.pointerId));
  }, [M]), B = 200, q = 100, g = 32, y = W((k) => {
    const b = N.current;
    if (!b) return;
    k.preventDefault();
    const $ = k.clientX - b.startX, I = k.clientY - b.startY;
    let j = b.startW, _ = b.startH, te = b.startL, ae = b.startT;
    b.dir.includes("e") && (j = b.startW + $), b.dir.includes("w") && (j = b.startW - $, te = b.startL + $), b.dir.includes("s") && (_ = b.startH + I), b.dir.includes("n") && (_ = b.startH - I, ae = b.startT + I);
    const pe = u.current;
    if (!pe) return;
    const he = pe.innerWidth, ke = pe.innerHeight;
    j = Math.max(B, Math.min(j, he - g * 2)), _ = Math.max(q, Math.min(_, ke - g * 2)), b.dir.includes("w") && (te = Math.max(g, Math.min(te, he - j - g))), b.dir.includes("n") && (ae = Math.max(g, Math.min(ae, ke - _ - g))), x({ w: j, h: _ }), f({ left: te, top: ae });
  }, []), E = W(() => {
    N.current = null;
  }, []), z = W(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), n(null));
  }, [e]), P = W((k) => {
    if (k.suppressKey) {
      const b = localStorage.getItem(k.suppressKey);
      if (b && Date.now() < parseInt(b, 10))
        return Promise.resolve(!0);
    }
    return new Promise((b) => {
      i(!1), n({ kind: "confirm", options: k, resolve: b });
    });
  }, []), H = W((k) => new Promise((b) => {
    n({ kind: "prompt", options: k, resolve: b });
  }), []), K = W((k) => new Promise((b) => {
    n({ kind: "alert", options: k, resolve: b });
  }), []);
  Y(() => {
    if (e) {
      const k = setTimeout(() => {
        var b;
        return (b = s.current) == null ? void 0 : b.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [e]);
  const G = () => {
    var k, b;
    !e || e.kind !== "prompt" || (e.resolve(((b = (k = s.current) == null ? void 0 : k.value) == null ? void 0 : b.trim()) || null), n(null));
  }, se = e !== null;
  return /* @__PURE__ */ w(vt.Provider, { value: { confirm: P, prompt: H, alert: K }, children: [
    t,
    /* @__PURE__ */ r(Q.Root, { open: se, onOpenChange: (k) => {
      k || z();
    }, modal: !0, children: /* @__PURE__ */ w(Q.Portal, { container: l ?? void 0, children: [
      /* @__PURE__ */ r(Q.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ w(
        Q.Content,
        {
          ref: a,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${wn} space-y-4 focus:outline-none ${d || v ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${v ? "" : "w-full max-w-sm"}`,
          style: { ...d ? { left: d.left, top: d.top } : {}, ...v ? { width: v.w, height: v.h } : {} },
          onEscapeKeyDown: (k) => {
            z(), k.preventDefault();
          },
          onPointerDownOutside: (k) => {
            z(), k.preventDefault();
          },
          onKeyDown: (k) => {
            if (k.key === "Enter") {
              if ((e == null ? void 0 : e.kind) === "prompt" && k.target instanceof HTMLInputElement || (k.preventDefault(), !e)) return;
              e.kind === "confirm" ? (e.resolve(!0), n(null)) : e.kind === "prompt" ? G() : (e.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ w(
              "div",
              {
                className: `flex items-center justify-between ${h ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: A,
                onPointerMove: D,
                onPointerUp: S,
                children: [
                  /* @__PURE__ */ r(Q.Title, { className: `${vn} ui-dialog-title`, children: e == null ? void 0 : e.options.title }),
                  /* @__PURE__ */ r(Q.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ r(Ye, { className: kn }) })
                ]
              }
            ),
            (e == null ? void 0 : e.options.message) && /* @__PURE__ */ r(Q.Description, { className: `${Nn} ui-dialog-text`, children: e.options.message }),
            (e == null ? void 0 : e.kind) === "confirm" && e.options.suppressKey && /* @__PURE__ */ r(
              yn,
              {
                block: !0,
                checked: o,
                onChange: i,
                tone: "danger",
                label: "Don't ask again (24 hours)"
              }
            ),
            (e == null ? void 0 : e.kind) === "prompt" && /* @__PURE__ */ r(
              "input",
              {
                ref: s,
                type: "text",
                defaultValue: e.options.defaultValue || "",
                placeholder: e.options.placeholder,
                onKeyDown: (k) => {
                  k.key === "Enter" && G();
                },
                className: `w-full ${$n} ui-input`
              }
            ),
            /* @__PURE__ */ w("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
              (e == null ? void 0 : e.kind) !== "alert" && /* @__PURE__ */ r(
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
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    if (e)
                      if (e.kind === "confirm") {
                        const k = e.options;
                        k.suppressKey && o && localStorage.setItem(k.suppressKey, String(Date.now() + 864e5)), e.resolve(!0), n(null);
                      } else e.kind === "prompt" ? G() : (e.resolve(), n(null));
                  },
                  className: `${nt} ui-btn ${(e == null ? void 0 : e.kind) === "confirm" && e.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (e == null ? void 0 : e.kind) === "alert" ? "OK" : (e == null ? void 0 : e.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ w("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ r("div", { className: `absolute ${rt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: R("n"), onPointerMove: y, onPointerUp: E }),
              /* @__PURE__ */ r("div", { className: `absolute ${rt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: R("s"), onPointerMove: y, onPointerUp: E }),
              /* @__PURE__ */ r("div", { className: `absolute ${ot} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: R("w"), onPointerMove: y, onPointerUp: E }),
              /* @__PURE__ */ r("div", { className: `absolute ${ot} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: R("e"), onPointerMove: y, onPointerUp: E }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 left-0 ${Ne} cursor-nw-resize pointer-events-auto`, onPointerDown: R("nw"), onPointerMove: y, onPointerUp: E }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 right-0 ${Ne} cursor-ne-resize pointer-events-auto`, onPointerDown: R("ne"), onPointerMove: y, onPointerUp: E }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 left-0 ${Ne} cursor-sw-resize pointer-events-auto`, onPointerDown: R("sw"), onPointerMove: y, onPointerUp: E }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 right-0 ${Ne} cursor-se-resize pointer-events-auto`, onPointerDown: R("se"), onPointerMove: y, onPointerUp: E })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const ie = 32, kt = "[data-modal-stack]", re = 220, we = "cubic-bezier(0.32, 0.72, 0, 1)", Te = 0.94;
function be() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Nt(t, e) {
  return `translate(${e.left - t.left}px, ${e.top - t.top}px) scale(${e.width / t.width}, ${e.height / t.height})`;
}
function it(t, e, n, o) {
  const i = ++t.current, l = e.getBoundingClientRect();
  e.style.transition = "none", e.style.transform = Nt(l, n), e.style.transformOrigin = "0 0", e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === i && (e.style.transition = `transform ${re}ms ${we}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        t.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", o());
      }, re + 80));
    });
  });
}
function Cn(t, e, n) {
  const o = ++t.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Te})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === o && (e.style.transition = `transform ${re}ms ${we}`, e.style.transform = "none", window.setTimeout(() => {
        t.current === o && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", n());
      }, re + 60));
    });
  });
}
function st(t, e, n) {
  const o = ++t.current, i = e.getBoundingClientRect(), l = 1 - Te, c = { left: i.left + i.width * l / 2, top: i.top + i.height * l / 2, width: i.width * Te, height: i.height * Te };
  e.style.transition = `transform ${re}ms ${we}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Nt(i, c), e.style.opacity = "0", window.setTimeout(() => {
    t.current === o && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", n());
  }, re + 60);
}
function Le(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(kt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Oe(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(kt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Tn = T ? "px-6" : "px-5", zn = T ? "py-3" : "py-2.5", En = T ? "text-sm" : "text-xs", Dn = T ? "w-4 h-4" : "w-3.5 h-3.5", Mn = T ? "text-xs" : "text-[10px]", Sn = T ? "w-3.5 h-3.5" : "w-3 h-3", Rn = T ? "px-2.5 py-1.5" : "px-2 py-1", Pn = T ? "px-6" : "px-5", An = T ? "py-3" : "py-2";
function Wr({
  open: t,
  onClose: e,
  title: n,
  icon: o,
  width: i,
  footer: l,
  children: c,
  onReset: u,
  morph: s = !0
}) {
  const a = C(null), d = C(null), f = C(null), [p, v] = U(!1), x = W((m) => {
    a.current = m, v(m !== null);
  }, []), N = fe(), h = le(), M = C(h);
  M.current = h;
  const [A, D] = U(null), S = C(null), R = C(!1), B = C(!1), [q, g] = U(!1), y = C(0), E = C(!1), z = C(s);
  z.current = s;
  const P = C(!1), H = C(!1), K = () => {
    H.current = !0, g(!0);
  }, G = () => {
    H.current = !1, g(!1);
  };
  Y(() => {
    t || (D(null), B.current = !1, R.current = !1);
  }, [t]), ne(() => {
    if (!t || B.current || !p || !a.current) return;
    B.current = !0;
    const m = a.current.getBoundingClientRect();
    D({ left: m.left, top: m.top });
  }, [t, p]), ne(() => {
    if (!t || !p || !s || be() || !a.current) return;
    const m = a.current, L = Le(m), O = L[L.length - 1];
    K(), O ? it(y, m, O.getBoundingClientRect(), G) : Cn(y, m, G);
  }, [t, p]);
  const se = W(() => {
    if (E.current) return;
    const m = a.current, L = !!m && Le(m).length > 0;
    if (!m || !s || be() || L) {
      e();
      return;
    }
    E.current = !0, P.current = !0, K(), st(y, m, () => {
      E.current = !1, G(), e();
    });
  }, [s, e]);
  ne(() => () => {
    const m = a.current;
    if (!m || P.current || !z.current || be() || Le(m).length > 0) return;
    const L = m.ownerDocument, O = m.cloneNode(!0);
    O.removeAttribute("data-modal-stack"), O.removeAttribute("data-state"), O.removeAttribute("role"), O.removeAttribute("data-aria-hidden"), O.removeAttribute("tabindex"), O.setAttribute("aria-hidden", "true"), O.style.pointerEvents = "none", L.body.appendChild(O), st({ current: 0 }, O, () => {
      O.isConnected && O.remove();
    });
  }, []), Y(() => {
    if (!t || !p || !s || !a.current) return;
    const m = a.current, L = m.parentNode;
    if (!L) return;
    let O = 0, V = null, F = !1;
    const J = () => {
      O = 0;
      const Z = Oe(m);
      Z.length > 0 ? (V = Z[Z.length - 1].getBoundingClientRect(), F = !0, O = requestAnimationFrame(J)) : F && (F = !1, V && !be() && (K(), it(y, m, V, G)), V = null);
    }, oe = new MutationObserver(() => {
      !O && Oe(m).length > 0 && (O = requestAnimationFrame(J));
    });
    return oe.observe(L, { childList: !0 }), () => {
      oe.disconnect(), O && cancelAnimationFrame(O);
    };
  }, [t, p]), Y(() => {
    if (!p || !s || be() || !a.current) return;
    const m = a.current;
    let L = Math.round(m.getBoundingClientRect().height), O = !1;
    const V = new ResizeObserver(() => {
      var Qe;
      if (!m.isConnected) return;
      const F = Math.round(m.getBoundingClientRect().height);
      if (!O) {
        O = !0, L = F;
        return;
      }
      if (Math.abs(F - L) < 1) return;
      if (S.current || E.current || Oe(m).length > 0) {
        L = F;
        return;
      }
      if (H.current) return;
      const J = L;
      L = F, K();
      const oe = m.getBoundingClientRect(), Z = !R.current, me = ((Qe = M.current) == null ? void 0 : Qe.innerHeight) ?? 0, Dt = Z ? (me - J) / 2 : oe.top, Ze = Z ? (me - F) / 2 : oe.top;
      m.style.transition = "none", m.style.height = `${J}px`, Z && (m.style.top = `${Dt}px`), d.current && (d.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${J}px` && (m.style.transition = `height ${re}ms ${we}${Z ? `, top ${re}ms ${we}` : ""}`, m.style.height = `${F}px`, Z && (m.style.top = `${Ze}px`), window.setTimeout(() => {
            m.style.height === `${F}px` && (m.style.transition = "", m.style.height = "", d.current && (d.current.style.overflow = ""), Z && D({ left: oe.left, top: Ze }), G());
          }, re + 60));
        });
      });
    });
    return V.observe(m), () => V.disconnect();
  }, [p]);
  const k = W(() => {
    const m = a.current;
    if (!m) return null;
    const L = m.getBoundingClientRect();
    return { left: L.left, top: L.top, width: L.width, height: L.height };
  }, []), b = W((m, L) => {
    var Z, me;
    const O = ((Z = M.current) == null ? void 0 : Z.innerWidth) ?? 0, V = ((me = M.current) == null ? void 0 : me.innerHeight) ?? 0, F = k(), J = F ? F.width : Math.min(O - ie * 2, 576), oe = F ? F.height : Math.min(V - ie * 2, 400);
    return {
      left: Math.max(ie, Math.min(m, O - J - ie)),
      top: Math.max(ie, Math.min(L, V - oe - ie))
    };
  }, [k]), $ = W((m) => {
    if (m.target.closest("button")) return;
    R.current = !0;
    const L = k();
    L && (D(b(L.left, L.top)), S.current = { startX: m.clientX, startY: m.clientY, posX: L.left, posY: L.top }, m.target.setPointerCapture(m.pointerId));
  }, [k, b]), I = W((m) => {
    const L = S.current;
    L && (m.preventDefault(), D(b(L.posX + m.clientX - L.startX, L.posY + m.clientY - L.startY)));
  }, [b]), j = W(() => {
    S.current = null;
  }, []), _ = S.current !== null, te = A !== null, ae = te ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, he = {
    ...te ? { left: A.left, top: A.top } : {},
    width: `min(100%, calc(100vw - ${ie * 2}px))`,
    maxHeight: `calc(100vh - ${ie * 2}px)`
  }, ke = W((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const O = f.current;
    if (!O) return;
    const V = Array.from(O.querySelectorAll("button[data-modal-confirm]")), F = V.length > 0 ? V : Array.from(O.querySelectorAll("button")), J = F[F.length - 1];
    !J || J.disabled || (m.preventDefault(), J.click());
  }, []);
  return /* @__PURE__ */ r(Q.Root, { open: t, onOpenChange: (m) => {
    m || se();
  }, children: /* @__PURE__ */ w(Q.Portal, { container: N ?? void 0, children: [
    /* @__PURE__ */ r(
      Q.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), se());
        }
      }
    ),
    /* @__PURE__ */ w(
      Q.Content,
      {
        ref: x,
        onKeyDown: ke,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ae} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(he).length > 0 ? he : {} },
        children: [
          /* @__PURE__ */ w(
            "div",
            {
              className: `flex items-center justify-between ${Tn} ${zn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${_ ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                q || $(m);
              },
              onPointerMove: I,
              onPointerUp: j,
              children: [
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-0", children: [
                  o && /* @__PURE__ */ r("span", { className: "text-zinc-400 shrink-0", children: o }),
                  /* @__PURE__ */ r(Q.Title, { className: `${En} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ w("button", { onClick: u, className: `flex items-center gap-1 ${Mn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Rn} shrink-0`, children: [
                    /* @__PURE__ */ r(pt, { className: Sn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ r(Q.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ r(Ye, { className: Dn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ r("div", { ref: d, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          l && /* @__PURE__ */ r("div", { ref: f, className: "shrink-0", children: l })
        ]
      }
    )
  ] }) });
}
function Ur({ children: t }) {
  return /* @__PURE__ */ r("div", { className: `flex items-center justify-end gap-3 ${Pn} ${An} border-t border-zinc-800 bg-zinc-950`, children: t });
}
const Ln = 500, On = 250, _n = 5, ee = 88, ct = 4;
function In(t, e) {
  const n = t.querySelectorAll("circle")[1], o = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(o), n.style.strokeDashoffset = String(o);
  const i = performance.now(), l = (c) => {
    const u = c - i, s = Math.min(u / e, 1);
    n.style.strokeDashoffset = String(o * (1 - s)), s < 1 && requestAnimationFrame(l);
  };
  requestAnimationFrame(l);
}
function Bn({ x: t, y: e, ms: n }) {
  const o = C(null), i = fe();
  return Y(() => {
    o.current && In(o.current, n);
  }, [n]), Fe(
    /* @__PURE__ */ r(
      "div",
      {
        style: {
          position: "fixed",
          left: t - ee / 2,
          top: e - ee / 2,
          width: ee,
          height: ee,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ w("svg", { ref: o, width: ee, height: ee, viewBox: `0 0 ${ee} ${ee}`, children: [
          /* @__PURE__ */ r(
            "circle",
            {
              cx: ee / 2,
              cy: ee / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: ct + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ r(
            "circle",
            {
              cx: ee / 2,
              cy: ee / 2,
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
function Yr({
  children: t,
  showRing: e = !0,
  longPressMs: n = Ln,
  targetSelector: o = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: l
}) {
  const [c, u] = U(null), s = on(), a = C(null), d = C(null), f = C({ x: 0, y: 0, target: null }), p = C(!1), v = Math.min(On, n * 0.5), x = C(i);
  x.current = i;
  const N = C(l);
  return N.current = l, Y(() => {
    if (!T || !s) return;
    const h = (S) => {
      if (!Be(S.pointerType) || S.button !== 0) return;
      const R = S.target;
      if (!R.closest(o) || (x.current ? !x.current(R) : Hn(R))) return;
      const B = S.clientX, q = S.clientY;
      f.current = { x: B, y: q, target: S.target }, p.current = !0, e && (d.current = setTimeout(() => u({ x: B, y: q }), v)), a.current = setTimeout(() => {
        if (!p.current) return;
        d.current && (clearTimeout(d.current), d.current = null), u(null);
        const g = f.current.target;
        if (!g) return;
        const y = N.current;
        if (y) {
          y(g, B, q);
          return;
        }
        const E = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: B,
          clientY: q,
          button: 2,
          view: window
        });
        g.dispatchEvent(E);
      }, n);
    }, M = (S) => {
      if (!p.current || a.current === null) return;
      const R = S.clientX - f.current.x, B = S.clientY - f.current.y;
      Math.sqrt(R * R + B * B) > _n && (clearTimeout(a.current), a.current = null, d.current && (clearTimeout(d.current), d.current = null), p.current = !1, u(null));
    }, A = () => {
      a.current !== null && (clearTimeout(a.current), a.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), p.current = !1, u(null);
    }, D = (S) => {
      Be(S.pointerType) && (a.current !== null && (clearTimeout(a.current), a.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), p.current = !1, u(null));
    };
    return s == null || s.addEventListener("pointerdown", h), s.addEventListener("pointermove", M), s.addEventListener("pointerup", A), s.addEventListener("pointercancel", A), s.addEventListener("pointerleave", D), () => {
      s.removeEventListener("pointerdown", h), s.removeEventListener("pointermove", M), s.removeEventListener("pointerup", A), s == null || s.removeEventListener("pointercancel", A), s == null || s.removeEventListener("pointerleave", D), a.current !== null && clearTimeout(a.current), d.current !== null && clearTimeout(d.current);
    };
  }, [e, n, v, o]), /* @__PURE__ */ w(ce, { children: [
    t,
    e && c && /* @__PURE__ */ r(Bn, { x: c.x, y: c.y, ms: n - v })
  ] });
}
function Fr(t, e) {
  const n = le(), o = C(n);
  o.current = n, ne(() => {
    if (!e || !t.current) return;
    const i = t.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const l = o.current;
    if (!l) return;
    const c = t.current.getBoundingClientRect(), u = i.getBoundingClientRect(), s = l.innerWidth, a = l.innerHeight, d = u.right - s;
    if (d > 0) {
      const f = Math.min(d + 8, u.left);
      i.style.left = `${u.left - c.left - f}px`;
    }
    u.left < 0 && (i.style.left = `${-c.left + 4}px`), u.bottom > a + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${a - 8}px`));
  }, [e, t]);
}
function Kr(t, e, n) {
  const o = le(), i = C(o);
  i.current = o, ne(() => {
    if (!e || !t.current) return;
    const l = t.current;
    requestAnimationFrame(() => {
      var M, A;
      const c = l.getBoundingClientRect(), u = i.current;
      if (!u) return;
      const s = u.innerWidth, a = ((M = u.visualViewport) == null ? void 0 : M.height) ?? u.innerHeight, d = ((A = u.visualViewport) == null ? void 0 : A.offsetTop) ?? 0, f = 200, p = 4, v = 120;
      let x = Math.max(0, c.left);
      x + f > s && (x = Math.max(0, s - f - 8));
      const N = d + a - c.bottom - p - 16, h = c.top - d - p - 16;
      if (N >= v || N >= h) {
        const D = Math.min(c.bottom + p, d + a), S = Math.max(v, d + a - D - 16);
        n({ top: D, left: x, width: c.width, maxH: S });
      } else {
        const D = Math.max(v, Math.min(h, 360)), S = d + a - (c.top - p);
        n({ top: 0, left: x, width: c.width, maxH: D, bottom: Math.max(0, S) });
      }
    });
  }, [e, t]);
}
function Gr() {
  const t = cn();
  return sn ? t === null || Be(t) : !1;
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
function jr({
  variant: t = "subtle",
  theme: e = "light",
  cloud: n = !1,
  className: o = "",
  type: i = "button",
  ...l
}) {
  let c = Un[e][t];
  return t === "primary" && e === "light" && n && (c = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white"), /* @__PURE__ */ r("button", { type: i, className: `${Wn} ${c} ${o}`, ...l });
}
const Xn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${T ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Yn = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function qr({
  variant: t = "hero",
  className: e = "",
  type: n = "button",
  ...o
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: n,
      className: `${Xn} ${Yn[t]} ${e}`,
      ...o
    }
  );
}
const Fn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Kn(t, e) {
  return new Date(t, e + 1, 0).getDate();
}
function Gn(t, e, n) {
  return `${t}-${String(e + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Vr({ selected: t, onChange: e, theme: n = "light", showChips: o = !0, className: i = "" }) {
  const l = /* @__PURE__ */ new Date(), [c, u] = U(l.getFullYear()), [s, a] = U(l.getMonth()), d = Je(() => new Set(t), [t]), f = (h) => {
    d.has(h) ? e(t.filter((M) => M !== h)) : e([...t, h]);
  }, p = Je(() => {
    const h = Kn(c, s), M = new Date(c, s, 1).getDay(), A = [];
    for (let D = 0; D < M; D++) A.push({ key: `pad-${D}`, day: 0, empty: !0 });
    for (let D = 1; D <= h; D++) A.push({ key: Gn(c, s, D), day: D, empty: !1 });
    return A;
  }, [c, s]), v = n === "dark", x = T ? "py-2" : "py-1.5", N = T ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ w("div", { className: `border rounded-lg overflow-hidden w-full ${v ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ w("div", { className: `flex items-center justify-between px-3 py-2 border-b ${v ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (u((h) => h - 1), a(11)) : a((h) => h - 1);
          },
          className: `p-1 rounded transition-colors ${v ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ r(Pt, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ r("span", { className: `text-sm font-semibold ${v ? "text-zinc-100" : "text-zinc-800"}`, children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" }) }),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 11 ? (u((h) => h + 1), a(0)) : a((h) => h + 1);
          },
          className: `p-1 rounded transition-colors ${v ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ r(Ie, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "grid grid-cols-7 text-center", children: [
      Fn.map((h) => /* @__PURE__ */ r("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${v ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: h }, h)),
      p.map((h) => h.empty ? /* @__PURE__ */ r("div", {}, h.key) : /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => f(h.key),
          className: `${x} text-xs font-medium transition-colors border-b ${v ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${d.has(h.key) ? v ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: h.day
        },
        h.key
      ))
    ] }),
    o && t.length > 0 && /* @__PURE__ */ w("div", { className: `px-3 py-2 border-t ${v ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ w("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-1", children: t.map((h) => {
        const A = (/* @__PURE__ */ new Date(h + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ w("span", { className: `inline-flex items-center gap-1 rounded font-medium ${v ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${N}`, children: [
          A,
          /* @__PURE__ */ r("button", { type: "button", onClick: () => f(h), className: `hover:opacity-70 leading-none ${v ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${A}`, children: "×" })
        ] }, h);
      }) })
    ] })
  ] });
}
function Zr({
  items: t,
  selected: e,
  onToggle: n,
  title: o,
  onToggleAll: i,
  allSelected: l = !1,
  toggleAllLabel: c,
  emptyHint: u = "Nothing here",
  maxHeight: s,
  disabled: a = !1,
  theme: d,
  className: f = ""
}) {
  const p = (h) => e instanceof Set ? e.has(h) : e.includes(h), v = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", x = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", N = o != null || i != null;
  return /* @__PURE__ */ w("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    N && /* @__PURE__ */ w("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      o != null && /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }),
      i != null && /* @__PURE__ */ r("button", { type: "button", disabled: a, onClick: i, className: "ui-checklist-toggleall", children: c ?? (l ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          t.map((h) => {
            const M = p(h.id);
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => n(h.id),
                className: `ui-checklist-item ${v} ${M ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-checklist-box ${x}`, "aria-hidden": !0, children: M && /* @__PURE__ */ r("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  h.leading != null && /* @__PURE__ */ r("span", { className: "ui-checklist-leading", children: h.leading }),
                  /* @__PURE__ */ r("span", { className: "ui-checklist-label", children: h.label }),
                  h.secondary != null && /* @__PURE__ */ r("span", { className: "ui-checklist-secondary", children: h.secondary })
                ]
              },
              h.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ r("div", { className: "ui-checklist-empty", children: u })
        ]
      }
    )
  ] });
}
function Qr({
  items: t,
  value: e,
  onChange: n,
  title: o,
  emptyHint: i = "Nothing here",
  maxHeight: l,
  compact: c = !1,
  disabled: u = !1,
  theme: s,
  className: a = ""
}) {
  const d = c ? "px-2.5 py-1.5 text-xs" : T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", f = c ? "w-3.5 h-3.5" : T ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ w("div", { className: a, ...s ? { "data-theme": s } : {}, children: [
    o != null && /* @__PURE__ */ r("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }) }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: l ? { maxHeight: l, overflowY: "auto" } : void 0,
        children: [
          t.map((p) => {
            const v = e === p.id;
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(p.id),
                className: `ui-checklist-item ${d} ${v ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-radio-circle ${f}`, "aria-hidden": !0, children: v && /* @__PURE__ */ r("span", { className: "ui-radio-dot" }) }),
                  p.leading != null && /* @__PURE__ */ r("span", { className: "ui-checklist-leading", children: p.leading }),
                  /* @__PURE__ */ r("span", { className: "ui-checklist-label", children: p.label }),
                  p.secondary != null && /* @__PURE__ */ r("span", { className: "ui-checklist-secondary", children: p.secondary })
                ]
              },
              p.id
            );
          }),
          t.length === 0 && /* @__PURE__ */ r("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const Jr = ({
  className: t,
  children: e,
  reference: n,
  placement: o = "top",
  anchorMode: i = "visible",
  offset: l = 8
}) => {
  const c = le(), { refs: u, floatingStyles: s } = Bt({
    placement: o,
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
          const f = a.rects.reference, p = Math.max(f.x, 0), v = Math.max(f.y, 0), x = Math.min(f.x + f.width, d.innerWidth), N = Math.min(f.y + f.height, d.innerHeight);
          if (x <= p || N <= v) return {};
          const h = o === "left" ? x - (f.x + f.width) : o === "right" ? p - f.x : 0, M = o === "top" ? v - f.y : o === "bottom" ? N - (f.y + f.height) : 0;
          return { x: a.x + h, y: a.y + M };
        }
      },
      Wt(l),
      Ut({ padding: 8 }),
      Xt({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (a) => {
          var N;
          const d = (N = a.elements.floating.ownerDocument) == null ? void 0 : N.defaultView;
          if (!d) return {};
          const f = a.rects.floating.width, p = a.rects.floating.height, v = Math.max(8, Math.min(a.x, d.innerWidth - f - 8)), x = Math.max(8, Math.min(a.y, d.innerHeight - p - 8));
          return { x: v, y: x };
        }
      }
    ],
    whileElementsMounted: Ht
  });
  return ne(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ w(ce, { children: [
    !n && /* @__PURE__ */ r("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    c && Fe(
      /* @__PURE__ */ r(
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
  const n = fe(), o = le(), [i, l] = U(!1), [c, u] = U({ x: 0, y: 0 }), s = C(null), a = () => {
    if (!s.current) return;
    const d = s.current.getBoundingClientRect();
    u({ x: d.left + d.width / 2, y: d.top });
  };
  return Y(() => (i && o && (a(), o.addEventListener("scroll", a, !0)), () => o == null ? void 0 : o.removeEventListener("scroll", a, !0)), [i]), /* @__PURE__ */ w(
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
        i && Fe(
          /* @__PURE__ */ w(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: c.x, top: c.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                t.split(`
• `).map((d, f) => /* @__PURE__ */ r("div", { className: f > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: d }, f)),
                /* @__PURE__ */ r("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, eo = T ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Ue = T ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", $e = T ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", jn = "hover:bg-red-950/50", $t = T ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ct = "bg-blue-900/50 border-blue-700 text-blue-300", Tt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", qn = T ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", to = T ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", ze = T ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Vn = "inline-flex rounded overflow-hidden border border-zinc-700", zt = T ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ce = ({ onClick: t, disabled: e, title: n, className: o = Ue, children: i }) => /* @__PURE__ */ r(xe, { content: n, children: /* @__PURE__ */ r("button", { onClick: t, disabled: e, "aria-label": n, className: `${o} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), no = ({ value: t, options: e, onChange: n, disabled: o, active: i }) => /* @__PURE__ */ r("div", { className: Vn, children: e.map((l) => {
  const c = i ? i(l.v) : t === l.v;
  return /* @__PURE__ */ r(
    "button",
    {
      disabled: o,
      onClick: () => n(l.v),
      className: `${T ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${c ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${l.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: l.l
    },
    l.v
  );
}) }), ro = ({ children: t }) => /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ r("span", { className: T ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ r("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Zn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Qn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", oo = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ w("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ r("span", { className: n ? Zn : Qn, children: t }),
  e
] }), io = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ w("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  t,
  e && /* @__PURE__ */ r("div", { className: "ml-auto flex items-center gap-1", children: e })
] }), so = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: o, compact: i }) => /* @__PURE__ */ w(ce, { children: [
  /* @__PURE__ */ r(Ce, { onClick: () => o(-1), disabled: t, title: "Move up", className: $e, children: /* @__PURE__ */ r(At, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r(Ce, { onClick: () => o(1), disabled: t, title: "Move down", className: $e, children: /* @__PURE__ */ r(Lt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r(Ce, { onClick: e, disabled: t, title: "Duplicate", className: $e, children: /* @__PURE__ */ r(ft, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r("div", { className: ze }),
  /* @__PURE__ */ r(Ce, { onClick: n, disabled: t, title: "Delete", className: `${$e} ${jn}`, children: /* @__PURE__ */ r(_e, { className: "w-2.5 h-2.5" }) })
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
    const o = n.indexOf(":");
    if (o < 0) continue;
    const i = n.slice(0, o).trim().toLowerCase(), l = n.slice(o + 1).trim();
    er.has(i) && l && e.push(`${i}: ${l}`);
  }
  return e.join("; ");
}
function Xe(t) {
  if (t.nodeType === Node.TEXT_NODE) return t;
  if (t.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const e = t, n = e.tagName.toLowerCase(), o = () => {
    const u = document.createDocumentFragment();
    for (const s of Array.from(e.childNodes)) u.appendChild(Xe(s));
    return u;
  };
  if (!Jn.has(n)) return o();
  if (n === "a") {
    const u = e.getAttribute("href") || "";
    if (!tr.test(u)) return o();
  }
  const i = document.createElement(n), l = e.getAttribute("style"), c = nr(l || "");
  if (c && i.setAttribute("style", c), n === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const u = e.getAttribute("target"), s = e.getAttribute("rel");
    u && i.setAttribute("target", u), s && i.setAttribute("rel", s);
  }
  for (const u of Array.from(e.childNodes)) i.appendChild(Xe(u));
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
  const o = document.createDocumentFragment();
  for (const c of Array.from(n.content.childNodes)) o.appendChild(Xe(c));
  const i = document.createElement("div");
  return i.appendChild(o), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
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
const or = { text: "#52525b" }, ir = ({ node: t, selected: e, extension: n, editor: o, view: i, getPos: l }) => {
  var f;
  const c = t.attrs.field ?? "", u = n.options, s = ((f = u.resolve) == null ? void 0 : f.call(u, c)) ?? null, a = (s == null ? void 0 : s.color) ?? or, d = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
  return /* @__PURE__ */ r(
    Kt,
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
      onMouseDown: (p) => {
        var h;
        if (p.button !== 0 || !o.isEditable) return;
        p.preventDefault(), o.isFocused || o.commands.focus();
        const v = typeof l == "function" ? l() : null;
        if (v == null) return;
        const x = i.state.doc.resolve(v), N = x.nodeAfter;
        N && Ee.isSelectable(N) && i.dispatch(i.state.tr.setSelection(new Ee(x))), (h = u.onTokenClick) == null || h.call(u, c, p.currentTarget.getBoundingClientRect(), v);
      },
      children: d
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
    return Ft(ir);
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
    return ["span", Yt({ "data-type": "token" }, e), `{{${t.attrs.field ?? ""}}}`];
  },
  renderText({ node: t }) {
    return `{{${t.attrs.field ?? ""}}}`;
  }
}), lr = 240, ar = 280, ur = ({ props: t, highlight: e, onHighlight: n }) => {
  const o = C(null);
  return Y(() => {
    var l;
    const i = (l = o.current) == null ? void 0 : l.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [e]), /* @__PURE__ */ r("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: ar, maxHeight: lr, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ r("div", { ref: o, children: t.items.map((i, l) => /* @__PURE__ */ w(
    "button",
    {
      type: "button",
      "data-ac-active": l === e ? "1" : void 0,
      onMouseEnter: () => n(l),
      onClick: () => t.command({ field: i.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${l === e ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ r("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: i.color.text } }),
        /* @__PURE__ */ r("span", { className: "truncate flex-1", children: i.label }),
        i.group && /* @__PURE__ */ r("span", { className: "shrink-0 text-[9px] text-zinc-600", children: i.group })
      ]
    },
    i.key
  )) }) });
}, dr = () => {
  let t = null;
  const e = (n) => {
    if (!t) return;
    t.props = n;
    const o = t.highlight;
    t.holder.style.display = n.items.length > 0 ? "" : "none", t.root.render(/* @__PURE__ */ r(ur, { props: n, highlight: o, onHighlight: (i) => {
      t.highlight = i, e(t.props);
    } }));
  };
  return {
    onStart(n) {
      const o = document.createElement("div");
      o.style.position = "fixed", o.style.zIndex = "9999";
      const i = nn(o);
      t = { holder: o, root: i, unmount: null, props: n, highlight: 0 };
      const l = n.mount(o, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: c, y: u, placement: s }) => {
          var f, p;
          if (!t) return;
          const a = (p = (f = t.props) == null ? void 0 : f.clientRect) == null ? void 0 : p.call(f), d = a && !s.endsWith("-end") ? a.width : 0;
          o.style.left = `${c + d}px`, o.style.top = `${u}px`;
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
      const { items: o, command: i } = t.props;
      if (o.length === 0) return !1;
      const l = n.key;
      return l === "ArrowDown" ? (n.preventDefault(), t.highlight = Math.min(t.highlight + 1, o.length - 1), e(t.props), !0) : l === "ArrowUp" ? (n.preventDefault(), t.highlight = Math.max(t.highlight - 1, 0), e(t.props), !0) : l === "Enter" || l === "Tab" ? (n.preventDefault(), i({ field: ((c = o[t.highlight]) == null ? void 0 : c.key) ?? o[0].key }), !0) : !1;
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
  disabled: o,
  className: i,
  onStateChange: l,
  resolveToken: c,
  suggestionItems: u,
  onTokenClick: s,
  onSelectionChange: a
}, d) => {
  const f = C(c);
  f.current = c;
  const p = C(u);
  p.current = u;
  const v = C(s);
  v.current = s;
  const x = C(a);
  x.current = a;
  const N = C(null), h = C(null), M = C(e);
  M.current = e;
  const A = C(o);
  A.current = o;
  const D = C(l);
  D.current = l;
  const S = C(null), R = (E) => {
    var H;
    const z = {
      bold: E.isActive("bold"),
      italic: E.isActive("italic"),
      underline: E.isActive("underline"),
      strike: E.isActive("strike"),
      link: E.isActive("link"),
      color: E.getAttributes("textStyle").color || ""
    }, P = S.current;
    P && P.bold === z.bold && P.italic === z.italic && P.underline === z.underline && P.strike === z.strike && P.link === z.link && P.color === z.color || (S.current = z, (H = D.current) == null || H.call(D, z));
  }, B = (E) => {
    var G;
    const z = E.state.selection;
    let P = null;
    z instanceof Ee && z.node.type.name === "token" ? (P = { key: z.node.attrs.field ?? "", pos: z.from }, N.current = z.from) : N.current != null && (N.current = E.state.tr.mapping.map(N.current));
    const H = h.current, K = H && P && H.key === P.key && H.pos === P.pos;
    !H && !P || K || (h.current = P, (G = x.current) == null || G.call(x, P));
  }, q = (E) => {
    const z = rr(sr(E));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, g = ye.useMemo(() => {
    const E = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var P;
        return ((P = p.current) == null ? void 0 : P.call(p, z)) ?? [];
      },
      command: ({ editor: z, range: P, props: H }) => {
        z.chain().focus().insertContentAt(P, { type: "token", attrs: { field: H.field } }).run();
      },
      render: dr
    };
    return cr.configure({
      resolve: f.current ?? null,
      suggestion: E,
      onTokenClick: (z, P, H) => {
        var K;
        N.current = H, (K = v.current) == null || K.call(v, z, P, H);
      }
    });
  }, []), y = Gt({
    immediatelyRender: !1,
    extensions: [
      qt,
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
      g
    ],
    content: lt(t || ""),
    editable: !o,
    onUpdate: ({ editor: E }) => {
      M.current(q(E.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: E }) => {
      R(E), B(E);
    }
  });
  return Y(() => {
    if (!y || y.isFocused) return;
    q(y.getHTML()) !== t && (S.current = null, y.commands.setContent(lt(t || ""), { emitUpdate: !1 }), R(y));
  }, [t, y]), Y(() => {
    y && y.setEditable(!o);
  }, [o, y]), Y(() => {
    y && (S.current = null, R(y), B(y));
  }, [y]), Mt(d, () => ({
    exec: (E, z) => {
      if (!(!y || A.current))
        switch (E) {
          case "bold":
            y.chain().focus().toggleBold().run();
            break;
          case "italic":
            y.chain().focus().toggleItalic().run();
            break;
          case "underline":
            y.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            y.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            z && y.chain().focus().setColor(z).run();
            break;
          case "unsetColor":
            y.chain().focus().unsetColor().run();
            break;
          case "link":
            z && y.chain().focus().extendMarkRange("link").setLink({ href: z }).run();
            break;
          case "unlink":
            y.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => y == null ? void 0 : y.commands.focus(),
    insertToken: (E) => {
      !y || A.current || y.chain().focus().insertContent({ type: "token", attrs: { field: E } }).run();
    },
    replaceToken: (E) => {
      if (!y || A.current) return;
      const z = N.current;
      z != null && y.commands.command(({ tr: P }) => {
        const H = P.doc.nodeAt(z);
        if (!H || H.type.name !== "token") return !1;
        P.setNodeMarkup(z, void 0, { field: E });
        const K = P.doc.resolve(z);
        return K.nodeAfter && K.nodeAfter.type.name === "token" && P.setSelection(new Ee(K)), !0;
      });
    }
  }), [y]), /* @__PURE__ */ r(jt, { editor: y, className: `richtext-editor ${i || ""}` });
});
fr.displayName = "RichTextEditor";
const pr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], hr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], at = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ r("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ r("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), uo = ({ value: t, disabled: e, onChange: n }) => {
  const [o, i] = U(!1);
  return /* @__PURE__ */ r(
    Pe,
    {
      open: o,
      onOpenChange: i,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ w("button", { type: "button", disabled: e, className: `${zt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ r("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ r(ht, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: pr.map((l) => /* @__PURE__ */ r(mn, { onClick: () => {
        n(l), i(!1);
      }, icon: l === t ? /* @__PURE__ */ r(dt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ r("span", { style: { fontFamily: l }, children: l }) }, l))
    }
  );
}, mr = ({ editorRef: t, disabled: e, active: n }) => {
  const [o, i] = U(!1), [l, c] = U(""), u = () => {
    var a;
    const s = l.trim();
    s && ((a = t.current) == null || a.exec("link", s), i(!1));
  };
  return /* @__PURE__ */ r(
    Pe,
    {
      open: o,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          disabled: e,
          onMouseDown: (s) => s.preventDefault(),
          className: `${$t} ${n ? Ct : Tt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ r(It, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ w("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ r(
          "input",
          {
            value: l,
            onChange: (s) => c(s.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (s) => {
              s.key === "Enter" && (s.preventDefault(), u());
            },
            className: qn + " w-full"
          }
        ),
        /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r("button", { onClick: u, className: Ue, disabled: !l.trim(), children: "Apply" }),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                var s;
                (s = t.current) == null || s.exec("unlink"), i(!1);
              },
              className: Ue,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, fo = ({ editorRef: t, disabled: e, active: n, lockedFormatting: o, trailing: i }) => {
  const [l, c] = U(!1), u = (d, f) => {
    var p;
    return (p = t.current) == null ? void 0 : p.exec(d, f);
  }, s = (d) => `${$t} ${d ? Ct : Tt}`, a = (d) => !!(o != null && o[d]);
  return /* @__PURE__ */ w("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ r(xe, { content: (o == null ? void 0 : o.bold) || "Bold", children: /* @__PURE__ */ r("button", { "aria-label": "Bold", disabled: e || a("bold"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || a("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ r(xe, { content: (o == null ? void 0 : o.italic) || "Italic", children: /* @__PURE__ */ r("button", { "aria-label": "Italic", disabled: e || a("italic"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || a("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ r(xe, { content: "Underline", children: /* @__PURE__ */ r("button", { "aria-label": "Underline", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ r(Ot, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r(xe, { content: "Strikethrough", children: /* @__PURE__ */ r("button", { "aria-label": "Strikethrough", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ r(_t, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r("div", { className: ze }),
    /* @__PURE__ */ r(mr, { editorRef: t, disabled: e, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ r("div", { className: ze }),
    /* @__PURE__ */ r(
      Pe,
      {
        open: l,
        onOpenChange: c,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ w("button", { type: "button", disabled: e, className: `${zt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ r("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ r(at, {}),
          /* @__PURE__ */ r(ht, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ w("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                u("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ r(at, { className: "w-3.5 h-3.5" })
            }
          ),
          hr.map((d) => /* @__PURE__ */ r(
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
    i && /* @__PURE__ */ w(ce, { children: [
      /* @__PURE__ */ r("div", { className: ze }),
      i
    ] })
  ] });
};
export {
  jr as Button,
  yn as Checkbox,
  Zr as Checklist,
  io as ChromeHeader,
  oo as ContentRow,
  Or as ContextMenu,
  Ir as ContextMenuDivider,
  _r as ContextMenuItem,
  Vr as DatePicker,
  Hr as DialogProvider,
  mn as DropdownItem,
  Pe as DropdownMenu,
  Lr as DropdownSubmenu,
  bt as DropdownThemeContext,
  pr as FONTS,
  Jr as FloatingChrome,
  uo as FontMenu,
  fo as FormatToolbar,
  T as IS_COARSE,
  sn as IS_TOUCH_CAPABLE,
  Ar as ItemManagerDropdown,
  Yr as LongPressMenuProvider,
  Ge as MORPH_EASE,
  de as MORPH_MS,
  je as MORPH_OPACITY_MS,
  Wr as Modal,
  Ur as ModalFooter,
  qr as ModalFooterButton,
  rn as PopoutWindowContext,
  ao as RICH_TEXT_STATE_IDLE,
  Qr as RadioList,
  fr as RichTextEditor,
  ro as SectionHeader,
  no as Seg,
  so as StructureControls,
  wt as SubmenuContext,
  Ue as TB_BTN,
  $e as TB_BTN_ICON,
  jn as TB_DANGER,
  ze as TB_DIVIDER,
  qn as TB_INPUT,
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
  Rr as getHardwareKeyboard,
  Sr as getLastPointerType,
  Hn as isInteractiveElement,
  Be as isTouchLike,
  ln as nearestOverlayOrigin,
  Et as normalizeSpaces,
  Ae as overlayMorphEnabled,
  un as playOverlayClose,
  an as playOverlayOpen,
  lt as preprocessTokenHtml,
  rr as sanitizeRichText,
  co as stripRichText,
  sr as stripTokenWrappers,
  on as useCurrentDocument,
  le as useCurrentWindow,
  Br as useDialog,
  xt as useDropdownTheme,
  Kr as useFixedPosition,
  Pr as useHardwareKeyboard,
  cn as useLastPointerType,
  Xr as useLongPressOptOut,
  Ve as useOverlayMorph,
  Ke as usePopoutWindow,
  fe as usePortalTarget,
  Fr as useSmartPosition,
  Gr as useTouchMode
};
