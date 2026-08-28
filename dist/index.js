"use client";
import { jsxs as x, jsx as r, Fragment as se } from "react/jsx-runtime";
import Le, { createContext as De, useContext as Ee, useState as W, useEffect as G, useRef as T, useLayoutEffect as ce, useCallback as K, useMemo as Ge, useImperativeHandle as Nt } from "react";
import * as H from "@radix-ui/react-dropdown-menu";
import { Check as ot, X as We, Pencil as $t, Copy as it, Trash2 as Ae, RotateCcw as st, Plus as zt, ChevronRight as Re, ChevronLeft as Tt, ArrowUp as Ct, ArrowDown as Dt, ChevronDown as ct, Underline as Et, Strikethrough as St, Link as Mt } from "lucide-react";
import * as V from "@radix-ui/react-dialog";
import { createPortal as Xe } from "react-dom";
import { useFloating as Pt, autoUpdate as Lt, offset as At, flip as Rt, shift as It } from "@floating-ui/react-dom";
import { mergeAttributes as _t, ReactNodeViewRenderer as Ot, NodeViewWrapper as Bt, useEditor as Ht, EditorContent as Wt } from "@tiptap/react";
import { NodeSelection as Te } from "@tiptap/pm/state";
import Xt from "@tiptap/starter-kit";
import Ut from "@tiptap/extension-placeholder";
import { TextStyle as Yt } from "@tiptap/extension-text-style";
import Kt from "@tiptap/extension-color";
import Gt from "@tiptap/extension-link";
import jt from "@tiptap/extension-underline";
import { Mention as Ft } from "@tiptap/extension-mention";
import { createRoot as qt } from "react-dom/client";
const Vt = De(null);
function Ue() {
  return Ee(Vt);
}
function de() {
  const e = Ue();
  return e ? e.document.body : null;
}
function Zt() {
  const e = Ue();
  return e ? e.document : typeof document < "u" ? document : null;
}
function le() {
  return Ue() ?? (typeof window < "u" ? window : null);
}
const we = typeof window < "u", k = we && window.matchMedia("(pointer: coarse)").matches, Qt = we && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ie(e) {
  return e === "touch" || e === "pen";
}
let ue = null;
const _e = /* @__PURE__ */ new Set();
we && window.addEventListener("pointerdown", (e) => {
  ue = e.pointerType, _e.forEach((t) => t());
}, !0);
function yr() {
  return ue;
}
function Jt() {
  const [, e] = W(0), t = T(ue);
  return G(() => {
    const n = () => {
      t.current !== ue && (t.current = ue, e((o) => o + 1));
    };
    return _e.add(n), () => {
      _e.delete(n);
    };
  }, []), ue;
}
const lt = ["(any-hover: hover)", "(any-pointer: fine)"];
function at() {
  return we ? lt.some((e) => window.matchMedia(e).matches) : !1;
}
let Ce = at();
const Oe = /* @__PURE__ */ new Set();
function je(e) {
  Ce !== e && (Ce = e, Oe.forEach((t) => t()));
}
var rt;
if (we) {
  const e = () => je(at());
  for (const c of lt) {
    const a = window.matchMedia(c);
    (rt = a.addEventListener) == null || rt.call(a, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (c) => {
    c.isComposing || c.keyCode !== 229 && (c.key === "Enter" || c.key === "Backspace" || c.key === "Process" || c.key === "Unidentified" || je(!0));
  });
  let n = null, o = null;
  const i = "__penClick", d = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (c) => {
    c.pointerType !== "pen" || c.button !== 0 || (n = { x: c.clientX, y: c.clientY });
  }, !0), window.addEventListener("pointerup", (c) => {
    if (c.pointerType !== "pen") return;
    const a = n;
    if (n = null, !a || Math.hypot(c.clientX - a.x, c.clientY - a.y) > 8) return;
    const s = c.target;
    if (!s || !s.isConnected) return;
    if (s instanceof HTMLInputElement && d.has(s.type)) {
      try {
        s.showPicker();
      } catch {
      }
      return;
    }
    const l = new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window });
    l[i] = !0, o = { x: c.clientX, y: c.clientY, time: Date.now() }, s.dispatchEvent(l);
  }, !0), window.addEventListener("click", (c) => {
    c[i] || o && Date.now() - o.time < 1e3 && Math.hypot(c.clientX - o.x, c.clientY - o.y) < 12 && (c.preventDefault(), c.stopPropagation());
  }, !0);
}
function vr() {
  return Ce;
}
function kr() {
  const [, e] = W(0);
  return G(() => {
    const t = () => e((n) => n + 1);
    return Oe.add(t), () => {
      Oe.delete(t);
    };
  }, []), Ce;
}
const ut = De("dark"), dt = () => Ee(ut), en = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Fe = k ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", tn = k ? "text-xs" : "text-[10px]";
function pt(e) {
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
    headerPad: Fe,
    headerText: `${Fe} font-semibold uppercase tracking-wider ${tn} ui-label`,
    // Item padding
    itemPad: en,
    // Input
    input: k ? "px-3 py-2 text-sm ui-input" : "px-1.5 py-0.5 text-xs ui-input",
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
    btnSize: k ? "w-8 h-8" : "w-6 h-6",
    btnIcon: "w-3.5 h-3.5"
  };
}
const ft = De({ activeSub: null, setActiveSub: () => {
} });
function Se({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: o,
  align: i = "left",
  width: d,
  theme: c = "dark",
  children: a
}) {
  const [s, l] = W(null), p = de();
  return /* @__PURE__ */ x(H.Root, { open: e, onOpenChange: (h) => {
    n ? n(h) : h || t == null || t();
  }, modal: !1, children: [
    /* @__PURE__ */ r(H.Trigger, { asChild: !0, children: o }),
    /* @__PURE__ */ r(H.Portal, { container: p ?? void 0, children: /* @__PURE__ */ r(ut.Provider, { value: c, children: /* @__PURE__ */ r(ft.Provider, { value: { activeSub: s, setActiveSub: l }, children: /* @__PURE__ */ r(
      H.Content,
      {
        "data-theme": c,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 transition-all duration-150 ease-out ${d || ""}`,
        align: i === "left" ? "start" : "end",
        sideOffset: 8,
        collisionPadding: 8,
        style: { touchAction: "manipulation" },
        children: a
      }
    ) }) }) })
  ] });
}
function Nr({
  open: e,
  onClose: t,
  items: n,
  activeId: o,
  onSelect: i,
  onRename: d,
  onDuplicate: c,
  onDelete: a,
  onCreate: s,
  onImport: l,
  onExport: p,
  onReset: f,
  onTrash: h,
  closeOnSelect: w,
  readOnly: $ = !1,
  theme: C,
  align: b,
  label: M,
  header: P,
  itemLabel: L,
  trigger: R,
  minItems: O = 1,
  itemRender: X
}) {
  const g = pt(), [I, v] = W(null), [N, z] = W(""), E = T(null), B = T(null);
  G(() => {
    e && requestAnimationFrame(() => {
      var u, D;
      (D = (u = B.current) == null ? void 0 : u.querySelector('[data-active="1"]')) == null || D.scrollIntoView({ block: "nearest" });
    });
  }, [e]), G(() => {
    if (I) {
      requestAnimationFrame(() => {
        var D, J;
        (D = E.current) == null || D.focus(), (J = E.current) == null || J.select();
      });
      const u = n.find((D) => D.id === I);
      u && !N && z(u.name);
    }
  }, [I]), G(() => {
    if (I) {
      const u = n.find((D) => D.id === I);
      u && !N && z(u.name);
    }
  }, [I, n]);
  const U = (u, D) => {
    v(u), z(D);
  }, j = () => {
    I && N.trim() && d(I, N.trim()), v(null);
  }, oe = () => {
    v(null);
  }, y = L || P.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ x(Se, { open: e, onOpenChange: (u) => {
    u ? (v(null), z("")) : (I && N.trim() && d(I, N.trim()), v(null), z("")), (!u || !$) && t(u);
  }, width: "w-80", theme: C, align: b, trigger: R, children: [
    /* @__PURE__ */ r("div", { className: `shrink-0 ${g.headerText}`, children: P }),
    /* @__PURE__ */ r("div", { ref: B, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((u) => {
      const D = u.id === o, J = I === u.id;
      return /* @__PURE__ */ r("div", { "data-active": D ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${D ? g.rowActiveBg : g.rowHoverBg} ${I && !J ? "opacity-40 pointer-events-none" : ""}`, children: J ? /* @__PURE__ */ x(se, { children: [
        /* @__PURE__ */ r("div", { className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ r(
          "input",
          {
            ref: E,
            value: N,
            onChange: (_) => z(_.target.value),
            onKeyDown: (_) => {
              _.key === "Enter" && (_.preventDefault(), _.stopPropagation(), j()), _.key === "Escape" && (_.preventDefault(), _.stopPropagation(), oe());
            },
            className: `w-full border rounded ${g.input}`
          }
        ) }),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${g.editConfirm}`,
            onSelect: (_) => {
              _.preventDefault(), j();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(ot, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${g.editCancel}`,
            onSelect: (_) => {
              _.preventDefault(), oe();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(We, { className: g.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ x(se, { children: [
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none cursor-pointer flex items-center ${g.rowText} ${D ? "" : g.rowTextHover}`,
            onSelect: w ? () => {
              i(u.id);
            } : (_) => {
              _.preventDefault(), i(u.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r("span", { className: `truncate ${D ? g.rowActiveText : ""}`, children: X ? X(u) : u.name })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${D ? g.btnActive : g.btnBase}`,
            onSelect: (_) => {
              _.preventDefault(), U(u.id, u.name);
            },
            onTouchStart: () => {
            },
            disabled: $,
            children: /* @__PURE__ */ r($t, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${D ? g.btnActive : g.btnBase}`,
            onSelect: (_) => {
              _.preventDefault();
              const ee = c(u.id);
              ee && U(ee, `${u.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: $,
            children: /* @__PURE__ */ r(it, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= O ? g.btnDisabled : D ? g.btnDangerActive : g.btnDanger}`,
            onSelect: (_) => {
              _.preventDefault(), a(u.id);
            },
            onTouchStart: () => {
            },
            disabled: $ || n.length <= O,
            children: /* @__PURE__ */ r(Ae, { className: g.btnIcon })
          }
        )
      ] }) }, u.id);
    }) }),
    /* @__PURE__ */ x("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ x(se, { children: [
        /* @__PURE__ */ r(H.Separator, { className: g.separator }),
        /* @__PURE__ */ x(
          H.Item,
          {
            className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
            onSelect: (u) => {
              u.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: $,
            children: [
              /* @__PURE__ */ r(st, { className: `${g.btnIcon} ${g.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || l || p || h) && /* @__PURE__ */ r(H.Separator, { className: g.separator }),
      s && /* @__PURE__ */ x(
        H.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (u) => {
            u.preventDefault();
            const D = s();
            D && U(D, "");
          },
          onTouchStart: () => {
          },
          disabled: $,
          children: [
            /* @__PURE__ */ r(zt, { className: `${g.btnIcon} ${g.icon}` }),
            "New ",
            y
          ]
        }
      ),
      l && /* @__PURE__ */ x(
        H.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (u) => {
            u.preventDefault(), l();
          },
          onTouchStart: () => {
          },
          disabled: $,
          children: [
            /* @__PURE__ */ x("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ r("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ r("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ r("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      p && /* @__PURE__ */ x(
        H.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (u) => {
            u.preventDefault(), p();
          },
          onTouchStart: () => {
          },
          disabled: $,
          children: [
            /* @__PURE__ */ x("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ r("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ r("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ r("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      h && /* @__PURE__ */ x(
        H.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (u) => {
            u.preventDefault(), h();
          },
          onTouchStart: () => {
          },
          disabled: $,
          children: [
            /* @__PURE__ */ r(Ae, { className: `${g.btnIcon} ${g.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const nn = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function rn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: o = "default",
  className: i = "",
  children: d,
  keepOpen: c = !1,
  rightAction: a
}) {
  dt();
  const s = pt(), l = T(!1), p = o === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ x(
    H.Item,
    {
      className: `w-full text-left ${nn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${p} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (f) => {
        if (l.current) {
          l.current = !1;
          return;
        }
        c && f.preventDefault(), e();
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ r("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: d }),
        a && /* @__PURE__ */ r(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: a.title,
            onPointerDown: (f) => {
              f.stopPropagation(), f.preventDefault(), l.current = !0, a.onClick();
            },
            onClick: (f) => {
              f.stopPropagation(), f.preventDefault();
            },
            children: a.icon
          }
        )
      ]
    }
  );
}
const on = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function $r({ id: e, label: t, icon: n, width: o, side: i = "right", children: d }) {
  const { activeSub: c, setActiveSub: a } = Ee(ft), s = c === e, l = dt(), p = de(), f = `w-full text-left ${on} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item`, h = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${o || "w-48"}`;
  return /* @__PURE__ */ x(H.Sub, { open: s, onOpenChange: (w) => a(w ? e : null), children: [
    /* @__PURE__ */ x(
      H.SubTrigger,
      {
        className: f,
        onTouchStart: () => {
        },
        onPointerDown: (w) => {
          w.pointerType === "pen" && (w.preventDefault(), a(s ? null : e));
        },
        children: [
          i === "left" && /* @__PURE__ */ r(Re, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ x("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ r("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          i === "right" && /* @__PURE__ */ r(Re, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ r(H.Portal, { container: p ?? void 0, children: /* @__PURE__ */ r(
      H.SubContent,
      {
        "data-theme": l,
        className: h,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        children: d
      }
    ) })
  ] });
}
const me = 8, sn = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", cn = k ? "text-sm" : "text-xs", zr = ({ open: e, x: t, y: n, onClose: o, children: i, containerRef: d }) => {
  const c = Le.useRef(null), a = le();
  return G(() => {
    if (!e || !a) return;
    const s = (l) => {
      c.current && !c.current.contains(l.target) && o();
    };
    return a.addEventListener("pointerdown", s, !0), () => a.removeEventListener("pointerdown", s, !0);
  }, [e, o, a]), ce(() => {
    var b;
    if (!e || !c.current) return;
    const s = c.current.getBoundingClientRect(), l = (b = d == null ? void 0 : d.current) == null ? void 0 : b.getBoundingClientRect(), p = l ? l.right : (a == null ? void 0 : a.innerWidth) ?? 0, f = l ? l.bottom : (a == null ? void 0 : a.innerHeight) ?? 0, h = l ? l.left : 0, w = l ? l.top : 0;
    let $ = Math.max(w + me, n), C = Math.max(h + me, t);
    C + s.width > p && (C = p - s.width - me), $ + s.height > f && ($ = Math.max(w + me, f - s.height - me)), c.current.style.top = `${$}px`, c.current.style.left = `${C}px`;
  }, [e, t, n, d]), e ? /* @__PURE__ */ r(
    "div",
    {
      ref: c,
      "data-theme": "light",
      className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${cn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
      style: { top: n, left: t, touchAction: "manipulation" },
      children: i
    }
  ) : null;
}, Tr = ({ onClick: e, variant: t = "default", icon: n, disabled: o = !1, children: i }) => /* @__PURE__ */ x(
  "button",
  {
    onClick: o ? void 0 : e,
    onTouchStart: () => {
    },
    className: `w-full text-left ${sn} flex items-center gap-2 rounded cursor-pointer ${o ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"}`,
    children: [
      n,
      i
    ]
  }
), Cr = () => /* @__PURE__ */ r("div", { className: "ui-sep my-1" });
function ln({ checked: e, onChange: t, disabled: n = !1, label: o, id: i, className: d = "", labelClassName: c = "", theme: a, variant: s = "pill", tone: l = "accent", block: p = !1 }) {
  const f = s !== "plain", h = k ? "w-5 h-5" : "w-4 h-4", w = k ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", $ = k ? "w-3.5 h-3.5" : "w-3 h-3", C = k ? "text-sm" : "text-xs";
  return /* @__PURE__ */ x(
    "label",
    {
      className: `ui-checkbox ${f ? `ui-checkbox-pill ${k ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${l === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${d}`,
      style: { display: p ? "flex" : "inline-flex", alignItems: "center", gap: k ? 10 : 8 },
      onClick: (M) => M.stopPropagation(),
      ...a ? { "data-theme": a } : {},
      children: [
        /* @__PURE__ */ r(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: e,
            disabled: n,
            onChange: (M) => t(M.target.checked),
            className: "sr-only"
          }
        ),
        f ? /* @__PURE__ */ r("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ x("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: [
          /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ r("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ r("svg", { viewBox: "0 0 16 16", className: h, "aria-hidden": !0, children: /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ r("span", { className: `ui-checkbox-box ${w}`, "aria-hidden": !0, children: e && /* @__PURE__ */ r("svg", { viewBox: "0 0 12 12", fill: "none", className: $, "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        o != null && /* @__PURE__ */ r("span", { className: `ui-checkbox-label ${C} ${c}`, children: o })
      ]
    }
  );
}
const an = k ? "p-6" : "p-5", un = k ? "text-base" : "text-sm", dn = k ? "w-5 h-5" : "w-4 h-4", pn = k ? "text-sm" : "text-xs", fn = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", qe = k ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", Ve = k ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", Ze = k ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", ve = k ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", ht = De(null);
function Dr() {
  const e = Ee(ht);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Er({ children: e }) {
  const [t, n] = W(null), [o, i] = W(!1), d = de(), c = le(), a = T(c);
  a.current = c;
  const s = T(null), l = T(null), [p, f] = W(null), h = T(null), [w, $] = W(null), C = T(null), b = h.current !== null;
  C.current, G(() => {
    t || (f(null), $(null));
  }, [t]);
  const M = K(() => {
    const y = l.current;
    if (!y) return null;
    const u = y.getBoundingClientRect();
    return { left: u.left, top: u.top, width: u.width, height: u.height };
  }, []), P = K((y) => {
    if (y.target.closest("button")) return;
    const u = M();
    u && (f(u), $({ w: u.width, h: u.height }), h.current = { startX: y.clientX, startY: y.clientY, posX: u.left, posY: u.top }, y.target.setPointerCapture(y.pointerId));
  }, [M]), L = K((y) => {
    const u = h.current;
    u && (y.preventDefault(), f({ left: u.posX + y.clientX - u.startX, top: u.posY + y.clientY - u.startY }));
  }, []), R = K(() => {
    h.current = null;
  }, []), O = K((y) => (u) => {
    u.stopPropagation();
    const D = M();
    D && (f(D), $({ w: D.width, h: D.height }), C.current = { dir: y, startX: u.clientX, startY: u.clientY, startL: D.left, startT: D.top, startW: D.width, startH: D.height }, u.target.setPointerCapture(u.pointerId));
  }, [M]), X = 200, g = 100, I = 32, v = K((y) => {
    const u = C.current;
    if (!u) return;
    y.preventDefault();
    const D = y.clientX - u.startX, J = y.clientY - u.startY;
    let _ = u.startW, ee = u.startH, ie = u.startL, ae = u.startT;
    u.dir.includes("e") && (_ = u.startW + D), u.dir.includes("w") && (_ = u.startW - D, ie = u.startL + D), u.dir.includes("s") && (ee = u.startH + J), u.dir.includes("n") && (ee = u.startH - J, ae = u.startT + J);
    const pe = a.current;
    if (!pe) return;
    const fe = pe.innerWidth, ye = pe.innerHeight;
    _ = Math.max(X, Math.min(_, fe - I * 2)), ee = Math.max(g, Math.min(ee, ye - I * 2)), u.dir.includes("w") && (ie = Math.max(I, Math.min(ie, fe - _ - I))), u.dir.includes("n") && (ae = Math.max(I, Math.min(ae, ye - ee - I))), $({ w: _, h: ee }), f({ left: ie, top: ae });
  }, []), N = K(() => {
    C.current = null;
  }, []), z = K(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]), E = K((y) => {
    if (y.suppressKey) {
      const u = localStorage.getItem(y.suppressKey);
      if (u && Date.now() < parseInt(u, 10))
        return Promise.resolve(!0);
    }
    return new Promise((u) => {
      i(!1), n({ kind: "confirm", options: y, resolve: u });
    });
  }, []), B = K((y) => new Promise((u) => {
    n({ kind: "prompt", options: y, resolve: u });
  }), []), U = K((y) => new Promise((u) => {
    n({ kind: "alert", options: y, resolve: u });
  }), []);
  G(() => {
    if (t) {
      const y = setTimeout(() => {
        var u;
        return (u = s.current) == null ? void 0 : u.focus();
      }, 50);
      return () => clearTimeout(y);
    }
  }, [t]);
  const j = () => {
    var y, u;
    !t || t.kind !== "prompt" || (t.resolve(((u = (y = s.current) == null ? void 0 : y.value) == null ? void 0 : u.trim()) || null), n(null));
  }, oe = t !== null;
  return /* @__PURE__ */ x(ht.Provider, { value: { confirm: E, prompt: B, alert: U }, children: [
    e,
    /* @__PURE__ */ r(V.Root, { open: oe, onOpenChange: (y) => {
      y || z();
    }, modal: !0, children: /* @__PURE__ */ x(V.Portal, { container: d ?? void 0, children: [
      /* @__PURE__ */ r(V.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ x(
        V.Content,
        {
          ref: l,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${an} space-y-4 focus:outline-none ${p || w ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${w ? "" : "w-full max-w-sm"}`,
          style: { ...p ? { left: p.left, top: p.top } : {}, ...w ? { width: w.w, height: w.h } : {} },
          onEscapeKeyDown: (y) => {
            z(), y.preventDefault();
          },
          onPointerDownOutside: (y) => {
            z(), y.preventDefault();
          },
          onKeyDown: (y) => {
            if (y.key === "Enter") {
              if ((t == null ? void 0 : t.kind) === "prompt" && y.target instanceof HTMLInputElement || (y.preventDefault(), !t)) return;
              t.kind === "confirm" ? (t.resolve(!0), n(null)) : t.kind === "prompt" ? j() : (t.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ x(
              "div",
              {
                className: `flex items-center justify-between ${b ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: P,
                onPointerMove: L,
                onPointerUp: R,
                children: [
                  /* @__PURE__ */ r(V.Title, { className: `${un} ui-dialog-title`, children: t == null ? void 0 : t.options.title }),
                  /* @__PURE__ */ r(V.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ r(We, { className: dn }) })
                ]
              }
            ),
            (t == null ? void 0 : t.options.message) && /* @__PURE__ */ r(V.Description, { className: `${pn} ui-dialog-text`, children: t.options.message }),
            (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ r(
              ln,
              {
                block: !0,
                checked: o,
                onChange: i,
                tone: "danger",
                label: "Don't ask again (24 hours)"
              }
            ),
            (t == null ? void 0 : t.kind) === "prompt" && /* @__PURE__ */ r(
              "input",
              {
                ref: s,
                type: "text",
                defaultValue: t.options.defaultValue || "",
                placeholder: t.options.placeholder,
                onKeyDown: (y) => {
                  y.key === "Enter" && j();
                },
                className: `w-full ${fn} ui-input`
              }
            ),
            /* @__PURE__ */ x("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
              (t == null ? void 0 : t.kind) !== "alert" && /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    const y = t;
                    y && (y.kind === "confirm" ? (y.resolve(!1), n(null)) : y.kind === "prompt" && (y.resolve(null), n(null)));
                  },
                  className: `${qe} ui-btn ui-btn-ghost`,
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    if (t)
                      if (t.kind === "confirm") {
                        const y = t.options;
                        y.suppressKey && o && localStorage.setItem(y.suppressKey, String(Date.now() + 864e5)), t.resolve(!0), n(null);
                      } else t.kind === "prompt" ? j() : (t.resolve(), n(null));
                  },
                  className: `${qe} ui-btn ${(t == null ? void 0 : t.kind) === "confirm" && t.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (t == null ? void 0 : t.kind) === "alert" ? "OK" : (t == null ? void 0 : t.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ x("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ r("div", { className: `absolute ${Ve} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: O("n"), onPointerMove: v, onPointerUp: N }),
              /* @__PURE__ */ r("div", { className: `absolute ${Ve} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: O("s"), onPointerMove: v, onPointerUp: N }),
              /* @__PURE__ */ r("div", { className: `absolute ${Ze} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: O("w"), onPointerMove: v, onPointerUp: N }),
              /* @__PURE__ */ r("div", { className: `absolute ${Ze} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: O("e"), onPointerMove: v, onPointerUp: N }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 left-0 ${ve} cursor-nw-resize pointer-events-auto`, onPointerDown: O("nw"), onPointerMove: v, onPointerUp: N }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 right-0 ${ve} cursor-ne-resize pointer-events-auto`, onPointerDown: O("ne"), onPointerMove: v, onPointerUp: N }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 left-0 ${ve} cursor-sw-resize pointer-events-auto`, onPointerDown: O("sw"), onPointerMove: v, onPointerUp: N }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 right-0 ${ve} cursor-se-resize pointer-events-auto`, onPointerDown: O("se"), onPointerMove: v, onPointerUp: N })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const re = 32, mt = "[data-modal-stack]", te = 220, xe = "cubic-bezier(0.32, 0.72, 0, 1)", $e = 0.94;
function be() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function bt(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function Qe(e, t, n, o) {
  const i = ++e.current, d = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = bt(d, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === i && (t.style.transition = `transform ${te}ms ${xe}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === i && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", o());
      }, te + 80));
    });
  });
}
function hn(e, t, n) {
  const o = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${$e})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === o && (t.style.transition = `transform ${te}ms ${xe}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === o && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, te + 60));
    });
  });
}
function Je(e, t, n) {
  const o = ++e.current, i = t.getBoundingClientRect(), d = 1 - $e, c = { left: i.left + i.width * d / 2, top: i.top + i.height * d / 2, width: i.width * $e, height: i.height * $e };
  t.style.transition = `transform ${te}ms ${xe}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = bt(i, c), t.style.opacity = "0", window.setTimeout(() => {
    e.current === o && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", n());
  }, te + 60);
}
function Me(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(mt) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Pe(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(mt) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const mn = k ? "px-6" : "px-5", bn = k ? "py-3" : "py-2.5", gn = k ? "text-sm" : "text-xs", xn = k ? "w-4 h-4" : "w-3.5 h-3.5", wn = k ? "text-xs" : "text-[10px]", yn = k ? "w-3.5 h-3.5" : "w-3 h-3", vn = k ? "px-2.5 py-1.5" : "px-2 py-1", kn = k ? "px-6" : "px-5", Nn = k ? "py-3" : "py-2";
function Sr({
  open: e,
  onClose: t,
  title: n,
  icon: o,
  width: i,
  footer: d,
  children: c,
  onReset: a,
  morph: s = !0
}) {
  const l = T(null), p = T(null), f = T(null), [h, w] = W(!1), $ = K((m) => {
    l.current = m, w(m !== null);
  }, []), C = de(), b = le(), M = T(b);
  M.current = b;
  const [P, L] = W(null), R = T(null), O = T(!1), X = T(!1), [g, I] = W(!1), v = T(0), N = T(!1), z = T(s);
  z.current = s;
  const E = T(!1), B = T(!1), U = () => {
    B.current = !0, I(!0);
  }, j = () => {
    B.current = !1, I(!1);
  };
  G(() => {
    e || (L(null), X.current = !1, O.current = !1);
  }, [e]), ce(() => {
    if (!e || X.current || !h || !l.current) return;
    X.current = !0;
    const m = l.current.getBoundingClientRect();
    L({ left: m.left, top: m.top });
  }, [e, h]), ce(() => {
    if (!e || !h || !s || be() || !l.current) return;
    const m = l.current, S = Me(m), A = S[S.length - 1];
    U(), A ? Qe(v, m, A.getBoundingClientRect(), j) : hn(v, m, j);
  }, [e, h]);
  const oe = K(() => {
    if (N.current) return;
    const m = l.current, S = !!m && Me(m).length > 0;
    if (!m || !s || be() || S) {
      t();
      return;
    }
    N.current = !0, E.current = !0, U(), Je(v, m, () => {
      N.current = !1, j(), t();
    });
  }, [s, t]);
  ce(() => () => {
    const m = l.current;
    if (!m || E.current || !z.current || be() || Me(m).length > 0) return;
    const S = m.ownerDocument, A = m.cloneNode(!0);
    A.removeAttribute("data-modal-stack"), A.removeAttribute("data-state"), A.removeAttribute("role"), A.removeAttribute("data-aria-hidden"), A.removeAttribute("tabindex"), A.setAttribute("aria-hidden", "true"), A.style.pointerEvents = "none", S.body.appendChild(A), Je({ current: 0 }, A, () => {
      A.isConnected && A.remove();
    });
  }, []), G(() => {
    if (!e || !h || !s || !l.current) return;
    const m = l.current, S = m.parentNode;
    if (!S) return;
    let A = 0, F = null, Y = !1;
    const Z = () => {
      A = 0;
      const q = Pe(m);
      q.length > 0 ? (F = q[q.length - 1].getBoundingClientRect(), Y = !0, A = requestAnimationFrame(Z)) : Y && (Y = !1, F && !be() && (U(), Qe(v, m, F, j)), F = null);
    }, ne = new MutationObserver(() => {
      !A && Pe(m).length > 0 && (A = requestAnimationFrame(Z));
    });
    return ne.observe(S, { childList: !0 }), () => {
      ne.disconnect(), A && cancelAnimationFrame(A);
    };
  }, [e, h]), G(() => {
    if (!h || !s || be() || !l.current) return;
    const m = l.current;
    let S = Math.round(m.getBoundingClientRect().height), A = !1;
    const F = new ResizeObserver(() => {
      var Ke;
      if (!m.isConnected) return;
      const Y = Math.round(m.getBoundingClientRect().height);
      if (!A) {
        A = !0, S = Y;
        return;
      }
      if (Math.abs(Y - S) < 1) return;
      if (R.current || N.current || Pe(m).length > 0) {
        S = Y;
        return;
      }
      if (B.current) return;
      const Z = S;
      S = Y, U();
      const ne = m.getBoundingClientRect(), q = !O.current, he = ((Ke = M.current) == null ? void 0 : Ke.innerHeight) ?? 0, kt = q ? (he - Z) / 2 : ne.top, Ye = q ? (he - Y) / 2 : ne.top;
      m.style.transition = "none", m.style.height = `${Z}px`, q && (m.style.top = `${kt}px`), p.current && (p.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${Z}px` && (m.style.transition = `height ${te}ms ${xe}${q ? `, top ${te}ms ${xe}` : ""}`, m.style.height = `${Y}px`, q && (m.style.top = `${Ye}px`), window.setTimeout(() => {
            m.style.height === `${Y}px` && (m.style.transition = "", m.style.height = "", p.current && (p.current.style.overflow = ""), q && L({ left: ne.left, top: Ye }), j());
          }, te + 60));
        });
      });
    });
    return F.observe(m), () => F.disconnect();
  }, [h]);
  const y = K(() => {
    const m = l.current;
    if (!m) return null;
    const S = m.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), u = K((m, S) => {
    var q, he;
    const A = ((q = M.current) == null ? void 0 : q.innerWidth) ?? 0, F = ((he = M.current) == null ? void 0 : he.innerHeight) ?? 0, Y = y(), Z = Y ? Y.width : Math.min(A - re * 2, 576), ne = Y ? Y.height : Math.min(F - re * 2, 400);
    return {
      left: Math.max(re, Math.min(m, A - Z - re)),
      top: Math.max(re, Math.min(S, F - ne - re))
    };
  }, [y]), D = K((m) => {
    if (m.target.closest("button")) return;
    O.current = !0;
    const S = y();
    S && (L(u(S.left, S.top)), R.current = { startX: m.clientX, startY: m.clientY, posX: S.left, posY: S.top }, m.target.setPointerCapture(m.pointerId));
  }, [y, u]), J = K((m) => {
    const S = R.current;
    S && (m.preventDefault(), L(u(S.posX + m.clientX - S.startX, S.posY + m.clientY - S.startY)));
  }, [u]), _ = K(() => {
    R.current = null;
  }, []), ee = R.current !== null, ie = P !== null, ae = ie ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, fe = {
    ...ie ? { left: P.left, top: P.top } : {},
    width: `min(100%, calc(100vw - ${re * 2}px))`,
    maxHeight: `calc(100vh - ${re * 2}px)`
  }, ye = K((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const A = f.current;
    if (!A) return;
    const F = Array.from(A.querySelectorAll("button[data-modal-confirm]")), Y = F.length > 0 ? F : Array.from(A.querySelectorAll("button")), Z = Y[Y.length - 1];
    !Z || Z.disabled || (m.preventDefault(), Z.click());
  }, []);
  return /* @__PURE__ */ r(V.Root, { open: e, onOpenChange: (m) => {
    m || oe();
  }, children: /* @__PURE__ */ x(V.Portal, { container: C ?? void 0, children: [
    /* @__PURE__ */ r(
      V.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), oe());
        }
      }
    ),
    /* @__PURE__ */ x(
      V.Content,
      {
        ref: $,
        onKeyDown: ye,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ae} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(fe).length > 0 ? fe : {} },
        children: [
          /* @__PURE__ */ x(
            "div",
            {
              className: `flex items-center justify-between ${mn} ${bn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${ee ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                g || D(m);
              },
              onPointerMove: J,
              onPointerUp: _,
              children: [
                /* @__PURE__ */ x("div", { className: "flex items-center gap-2 min-w-0", children: [
                  o && /* @__PURE__ */ r("span", { className: "text-zinc-400 shrink-0", children: o }),
                  /* @__PURE__ */ r(V.Title, { className: `${gn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
                  a && /* @__PURE__ */ x("button", { onClick: a, className: `flex items-center gap-1 ${wn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${vn} shrink-0`, children: [
                    /* @__PURE__ */ r(st, { className: yn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ r(V.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ r(We, { className: xn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ r("div", { ref: p, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          d && /* @__PURE__ */ r("div", { ref: f, className: "shrink-0", children: d })
        ]
      }
    )
  ] }) });
}
function Mr({ children: e }) {
  return /* @__PURE__ */ r("div", { className: `flex items-center justify-end gap-3 ${kn} ${Nn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const $n = 500, zn = 250, Tn = 5, Q = 88, et = 4;
function Cn(e, t) {
  const n = e.querySelectorAll("circle")[1], o = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(o), n.style.strokeDashoffset = String(o);
  const i = performance.now(), d = (c) => {
    const a = c - i, s = Math.min(a / t, 1);
    n.style.strokeDashoffset = String(o * (1 - s)), s < 1 && requestAnimationFrame(d);
  };
  requestAnimationFrame(d);
}
function Dn({ x: e, y: t, ms: n }) {
  const o = T(null), i = de();
  return G(() => {
    o.current && Cn(o.current, n);
  }, [n]), Xe(
    /* @__PURE__ */ r(
      "div",
      {
        style: {
          position: "fixed",
          left: e - Q / 2,
          top: t - Q / 2,
          width: Q,
          height: Q,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ x("svg", { ref: o, width: Q, height: Q, viewBox: `0 0 ${Q} ${Q}`, children: [
          /* @__PURE__ */ r(
            "circle",
            {
              cx: Q / 2,
              cy: Q / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: et + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ r(
            "circle",
            {
              cx: Q / 2,
              cy: Q / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: et,
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
function Pr() {
  return { "data-no-longpress": "true" };
}
function En(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Lr({
  children: e,
  showRing: t = !0,
  longPressMs: n = $n,
  targetSelector: o = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: d
}) {
  const [c, a] = W(null), s = Zt(), l = T(null), p = T(null), f = T({ x: 0, y: 0, target: null }), h = T(!1), w = Math.min(zn, n * 0.5), $ = T(i);
  $.current = i;
  const C = T(d);
  return C.current = d, G(() => {
    if (!k || !s) return;
    const b = (R) => {
      if (!Ie(R.pointerType) || R.button !== 0) return;
      const O = R.target;
      if (!O.closest(o) || ($.current ? !$.current(O) : En(O))) return;
      const X = R.clientX, g = R.clientY;
      f.current = { x: X, y: g, target: R.target }, h.current = !0, t && (p.current = setTimeout(() => a({ x: X, y: g }), w)), l.current = setTimeout(() => {
        if (!h.current) return;
        p.current && (clearTimeout(p.current), p.current = null), a(null);
        const I = f.current.target;
        if (!I) return;
        const v = C.current;
        if (v) {
          v(I, X, g);
          return;
        }
        const N = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: X,
          clientY: g,
          button: 2,
          view: window
        });
        I.dispatchEvent(N);
      }, n);
    }, M = (R) => {
      if (!h.current || l.current === null) return;
      const O = R.clientX - f.current.x, X = R.clientY - f.current.y;
      Math.sqrt(O * O + X * X) > Tn && (clearTimeout(l.current), l.current = null, p.current && (clearTimeout(p.current), p.current = null), h.current = !1, a(null));
    }, P = () => {
      l.current !== null && (clearTimeout(l.current), l.current = null), p.current !== null && (clearTimeout(p.current), p.current = null), h.current = !1, a(null);
    }, L = (R) => {
      Ie(R.pointerType) && (l.current !== null && (clearTimeout(l.current), l.current = null), p.current !== null && (clearTimeout(p.current), p.current = null), h.current = !1, a(null));
    };
    return s == null || s.addEventListener("pointerdown", b), s.addEventListener("pointermove", M), s.addEventListener("pointerup", P), s.addEventListener("pointercancel", P), s.addEventListener("pointerleave", L), () => {
      s.removeEventListener("pointerdown", b), s.removeEventListener("pointermove", M), s.removeEventListener("pointerup", P), s == null || s.removeEventListener("pointercancel", P), s == null || s.removeEventListener("pointerleave", L), l.current !== null && clearTimeout(l.current), p.current !== null && clearTimeout(p.current);
    };
  }, [t, n, w, o]), /* @__PURE__ */ x(se, { children: [
    e,
    t && c && /* @__PURE__ */ r(Dn, { x: c.x, y: c.y, ms: n - w })
  ] });
}
function Ar(e, t) {
  const n = le(), o = T(n);
  o.current = n, ce(() => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const d = o.current;
    if (!d) return;
    const c = e.current.getBoundingClientRect(), a = i.getBoundingClientRect(), s = d.innerWidth, l = d.innerHeight, p = a.right - s;
    if (p > 0) {
      const f = Math.min(p + 8, a.left);
      i.style.left = `${a.left - c.left - f}px`;
    }
    a.left < 0 && (i.style.left = `${-c.left + 4}px`), a.bottom > l + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${l - 8}px`));
  }, [t, e]);
}
function Rr(e, t, n) {
  const o = le(), i = T(o);
  i.current = o, ce(() => {
    if (!t || !e.current) return;
    const d = e.current;
    requestAnimationFrame(() => {
      var M, P;
      const c = d.getBoundingClientRect(), a = i.current;
      if (!a) return;
      const s = a.innerWidth, l = ((M = a.visualViewport) == null ? void 0 : M.height) ?? a.innerHeight, p = ((P = a.visualViewport) == null ? void 0 : P.offsetTop) ?? 0, f = 200, h = 4, w = 120;
      let $ = Math.max(0, c.left);
      $ + f > s && ($ = Math.max(0, s - f - 8));
      const C = p + l - c.bottom - h - 16, b = c.top - p - h - 16;
      if (C >= w || C >= b) {
        const L = Math.min(c.bottom + h, p + l), R = Math.max(w, p + l - L - 16);
        n({ top: L, left: $, width: c.width, maxH: R });
      } else {
        const L = Math.max(w, Math.min(b, 360)), R = p + l - (c.top - h);
        n({ top: 0, left: $, width: c.width, maxH: L, bottom: Math.max(0, R) });
      }
    });
  }, [t, e]);
}
function Ir() {
  const e = Jt();
  return Qt ? e === null || Ie(e) : !1;
}
const Sn = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", Mn = {
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
function _r({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: o = "",
  type: i = "button",
  ...d
}) {
  let c = Mn[t][e];
  return e === "primary" && t === "light" && n && (c = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white"), /* @__PURE__ */ r("button", { type: i, className: `${Sn} ${c} ${o}`, ...d });
}
const Pn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${k ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Ln = {
  hero: "bg-zinc-800 text-white font-semibold border border-zinc-700 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed",
  ghost: "text-zinc-400 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50",
  danger: "text-red-400 font-medium hover:bg-red-900/30 hover:text-red-300 disabled:opacity-50",
  "danger-solid": "bg-red-600 text-white font-semibold hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed"
};
function Or({
  variant: e = "hero",
  className: t = "",
  type: n = "button",
  ...o
}) {
  return /* @__PURE__ */ r(
    "button",
    {
      type: n,
      className: `${Pn} ${Ln[e]} ${t}`,
      ...o
    }
  );
}
const An = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Rn(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function In(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Br({ selected: e, onChange: t, theme: n = "light", showChips: o = !0, className: i = "" }) {
  const d = /* @__PURE__ */ new Date(), [c, a] = W(d.getFullYear()), [s, l] = W(d.getMonth()), p = Ge(() => new Set(e), [e]), f = (b) => {
    p.has(b) ? t(e.filter((M) => M !== b)) : t([...e, b]);
  }, h = Ge(() => {
    const b = Rn(c, s), M = new Date(c, s, 1).getDay(), P = [];
    for (let L = 0; L < M; L++) P.push({ key: `pad-${L}`, day: 0, empty: !0 });
    for (let L = 1; L <= b; L++) P.push({ key: In(c, s, L), day: L, empty: !1 });
    return P;
  }, [c, s]), w = n === "dark", $ = k ? "py-2" : "py-1.5", C = k ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ x("div", { className: `border rounded-lg overflow-hidden w-full ${w ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ x("div", { className: `flex items-center justify-between px-3 py-2 border-b ${w ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (a((b) => b - 1), l(11)) : l((b) => b - 1);
          },
          className: `p-1 rounded transition-colors ${w ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ r(Tt, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ r("span", { className: `text-sm font-semibold ${w ? "text-zinc-100" : "text-zinc-800"}`, children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" }) }),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 11 ? (a((b) => b + 1), l(0)) : l((b) => b + 1);
          },
          className: `p-1 rounded transition-colors ${w ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ r(Re, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "grid grid-cols-7 text-center", children: [
      An.map((b) => /* @__PURE__ */ r("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${w ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: b }, b)),
      h.map((b) => b.empty ? /* @__PURE__ */ r("div", {}, b.key) : /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => f(b.key),
          className: `${$} text-xs font-medium transition-colors border-b ${w ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${p.has(b.key) ? w ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: b.day
        },
        b.key
      ))
    ] }),
    o && e.length > 0 && /* @__PURE__ */ x("div", { className: `px-3 py-2 border-t ${w ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ x("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-1", children: e.map((b) => {
        const P = (/* @__PURE__ */ new Date(b + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ x("span", { className: `inline-flex items-center gap-1 rounded font-medium ${w ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${C}`, children: [
          P,
          /* @__PURE__ */ r("button", { type: "button", onClick: () => f(b), className: `hover:opacity-70 leading-none ${w ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${P}`, children: "×" })
        ] }, b);
      }) })
    ] })
  ] });
}
function Hr({
  items: e,
  selected: t,
  onToggle: n,
  title: o,
  onToggleAll: i,
  allSelected: d = !1,
  toggleAllLabel: c,
  emptyHint: a = "Nothing here",
  maxHeight: s,
  disabled: l = !1,
  theme: p,
  className: f = ""
}) {
  const h = (b) => t instanceof Set ? t.has(b) : t.includes(b), w = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", $ = k ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", C = o != null || i != null;
  return /* @__PURE__ */ x("div", { className: f, ...p ? { "data-theme": p } : {}, children: [
    C && /* @__PURE__ */ x("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      o != null && /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }),
      i != null && /* @__PURE__ */ r("button", { type: "button", disabled: l, onClick: i, className: "ui-checklist-toggleall", children: c ?? (d ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ x(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          e.map((b) => {
            const M = h(b.id);
            return /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => n(b.id),
                className: `ui-checklist-item ${w} ${M ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-checklist-box ${$}`, "aria-hidden": !0, children: M && /* @__PURE__ */ r("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  b.leading != null && /* @__PURE__ */ r("span", { className: "ui-checklist-leading", children: b.leading }),
                  /* @__PURE__ */ r("span", { className: "ui-checklist-label", children: b.label }),
                  b.secondary != null && /* @__PURE__ */ r("span", { className: "ui-checklist-secondary", children: b.secondary })
                ]
              },
              b.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ r("div", { className: "ui-checklist-empty", children: a })
        ]
      }
    )
  ] });
}
function Wr({
  items: e,
  value: t,
  onChange: n,
  title: o,
  emptyHint: i = "Nothing here",
  maxHeight: d,
  compact: c = !1,
  disabled: a = !1,
  theme: s,
  className: l = ""
}) {
  const p = c ? "px-2.5 py-1.5 text-xs" : k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", f = c ? "w-3.5 h-3.5" : k ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ x("div", { className: l, ...s ? { "data-theme": s } : {}, children: [
    o != null && /* @__PURE__ */ r("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }) }),
    /* @__PURE__ */ x(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: d ? { maxHeight: d, overflowY: "auto" } : void 0,
        children: [
          e.map((h) => {
            const w = t === h.id;
            return /* @__PURE__ */ x(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => n(h.id),
                className: `ui-checklist-item ${p} ${w ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-radio-circle ${f}`, "aria-hidden": !0, children: w && /* @__PURE__ */ r("span", { className: "ui-radio-dot" }) }),
                  h.leading != null && /* @__PURE__ */ r("span", { className: "ui-checklist-leading", children: h.leading }),
                  /* @__PURE__ */ r("span", { className: "ui-checklist-label", children: h.label }),
                  h.secondary != null && /* @__PURE__ */ r("span", { className: "ui-checklist-secondary", children: h.secondary })
                ]
              },
              h.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ r("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const Xr = ({
  className: e,
  children: t,
  reference: n,
  placement: o = "top",
  anchorMode: i = "visible",
  offset: d = 8
}) => {
  const c = le(), { refs: a, floatingStyles: s } = Pt({
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
        fn: (l) => {
          var P;
          if (i !== "visible") return {};
          const p = (P = l.elements.floating.ownerDocument) == null ? void 0 : P.defaultView;
          if (!p) return {};
          const f = l.rects.reference, h = Math.max(f.x, 0), w = Math.max(f.y, 0), $ = Math.min(f.x + f.width, p.innerWidth), C = Math.min(f.y + f.height, p.innerHeight);
          if ($ <= h || C <= w) return {};
          const b = o === "left" ? $ - (f.x + f.width) : o === "right" ? h - f.x : 0, M = o === "top" ? w - f.y : o === "bottom" ? C - (f.y + f.height) : 0;
          return { x: l.x + b, y: l.y + M };
        }
      },
      At(d),
      Rt({ padding: 8 }),
      It({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (l) => {
          var C;
          const p = (C = l.elements.floating.ownerDocument) == null ? void 0 : C.defaultView;
          if (!p) return {};
          const f = l.rects.floating.width, h = l.rects.floating.height, w = Math.max(8, Math.min(l.x, p.innerWidth - f - 8)), $ = Math.max(8, Math.min(l.y, p.innerHeight - h - 8));
          return { x: w, y: $ };
        }
      }
    ],
    whileElementsMounted: Lt
  });
  return ce(() => {
    n && a.setReference(n);
  }, [n, a]), /* @__PURE__ */ x(se, { children: [
    !n && /* @__PURE__ */ r("div", { ref: a.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    c && Xe(
      /* @__PURE__ */ r(
        "div",
        {
          ref: a.setFloating,
          className: `ui-chrome ${e}`,
          style: s,
          onMouseDown: (l) => l.stopPropagation(),
          onClick: (l) => l.stopPropagation(),
          onDragStart: (l) => l.preventDefault(),
          children: t
        }
      ),
      c.document.body
    )
  ] });
}, ge = ({ content: e, children: t }) => {
  const n = de(), o = le(), [i, d] = W(!1), [c, a] = W({ x: 0, y: 0 }), s = T(null), l = () => {
    if (!s.current) return;
    const p = s.current.getBoundingClientRect();
    a({ x: p.left + p.width / 2, y: p.top });
  };
  return G(() => (i && o && (l(), o.addEventListener("scroll", l, !0)), () => o == null ? void 0 : o.removeEventListener("scroll", l, !0)), [i]), /* @__PURE__ */ x(
    "div",
    {
      ref: s,
      className: "inline-flex",
      onMouseEnter: () => {
        l(), d(!0);
      },
      onMouseLeave: () => d(!1),
      children: [
        t,
        i && Xe(
          /* @__PURE__ */ x(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: c.x, top: c.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((p, f) => /* @__PURE__ */ r("div", { className: f > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: p }, f)),
                /* @__PURE__ */ r("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, Ur = k ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Be = k ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ke = k ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", _n = "hover:bg-red-950/50", gt = k ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", xt = "bg-blue-900/50 border-blue-700 text-blue-300", wt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", On = k ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Yr = k ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", ze = k ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Bn = "inline-flex rounded overflow-hidden border border-zinc-700", yt = k ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ne = ({ onClick: e, disabled: t, title: n, className: o = Be, children: i }) => /* @__PURE__ */ r(ge, { content: n, children: /* @__PURE__ */ r("button", { onClick: e, disabled: t, "aria-label": n, className: `${o} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), Kr = ({ value: e, options: t, onChange: n, disabled: o, active: i }) => /* @__PURE__ */ r("div", { className: Bn, children: t.map((d) => {
  const c = i ? i(d.v) : e === d.v;
  return /* @__PURE__ */ r(
    "button",
    {
      disabled: o,
      onClick: () => n(d.v),
      className: `${k ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${c ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${d.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: d.l
    },
    d.v
  );
}) }), Gr = ({ children: e }) => /* @__PURE__ */ x("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ r("span", { className: k ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ r("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Hn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Wn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", jr = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ x("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ r("span", { className: n ? Hn : Wn, children: e }),
  t
] }), Fr = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ x("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ r("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), qr = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: o, compact: i }) => /* @__PURE__ */ x(se, { children: [
  /* @__PURE__ */ r(Ne, { onClick: () => o(-1), disabled: e, title: "Move up", className: ke, children: /* @__PURE__ */ r(Ct, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r(Ne, { onClick: () => o(1), disabled: e, title: "Move down", className: ke, children: /* @__PURE__ */ r(Dt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r(Ne, { onClick: t, disabled: e, title: "Duplicate", className: ke, children: /* @__PURE__ */ r(it, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r("div", { className: ze }),
  /* @__PURE__ */ r(Ne, { onClick: n, disabled: e, title: "Delete", className: `${ke} ${_n}`, children: /* @__PURE__ */ r(Ae, { className: "w-2.5 h-2.5" }) })
] }), Xn = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Un = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Yn = /^(https?:\/\/|mailto:)/i;
function Kn(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const o = n.indexOf(":");
    if (o < 0) continue;
    const i = n.slice(0, o).trim().toLowerCase(), d = n.slice(o + 1).trim();
    Un.has(i) && d && t.push(`${i}: ${d}`);
  }
  return t.join("; ");
}
function He(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), o = () => {
    const a = document.createDocumentFragment();
    for (const s of Array.from(t.childNodes)) a.appendChild(He(s));
    return a;
  };
  if (!Xn.has(n)) return o();
  if (n === "a") {
    const a = t.getAttribute("href") || "";
    if (!Yn.test(a)) return o();
  }
  const i = document.createElement(n), d = t.getAttribute("style"), c = Kn(d || "");
  if (c && i.setAttribute("style", c), n === "a") {
    i.setAttribute("href", t.getAttribute("href"));
    const a = t.getAttribute("target"), s = t.getAttribute("rel");
    a && i.setAttribute("target", a), s && i.setAttribute("rel", s);
  }
  for (const a of Array.from(t.childNodes)) i.appendChild(He(a));
  return i;
}
function vt(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Gn(e) {
  const t = vt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const o = document.createDocumentFragment();
  for (const c of Array.from(n.content.childNodes)) o.appendChild(He(c));
  const i = document.createElement("div");
  return i.appendChild(o), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Vr(e) {
  const t = vt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function Zr(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const jn = { text: "#52525b" }, Fn = ({ node: e, selected: t, extension: n, editor: o, view: i, getPos: d }) => {
  var f;
  const c = e.attrs.field ?? "", a = n.options, s = ((f = a.resolve) == null ? void 0 : f.call(a, c)) ?? null, l = (s == null ? void 0 : s.color) ?? jn, p = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
  return /* @__PURE__ */ r(
    Bt,
    {
      as: "span",
      "data-type": "token",
      className: `rt-token inline-block ${t ? "rt-token-selected" : ""}`,
      style: {
        background: l.text,
        color: "#fff",
        borderRadius: 2,
        padding: 4,
        margin: "0 2px",
        fontWeight: 600,
        whiteSpace: "nowrap"
      },
      onMouseDown: (h) => {
        var b;
        if (h.button !== 0 || !o.isEditable) return;
        h.preventDefault(), o.isFocused || o.commands.focus();
        const w = typeof d == "function" ? d() : null;
        if (w == null) return;
        const $ = i.state.doc.resolve(w), C = $.nodeAfter;
        C && Te.isSelectable(C) && i.dispatch(i.state.tr.setSelection(new Te($))), (b = a.onTokenClick) == null || b.call(a, c, h.currentTarget.getBoundingClientRect(), w);
      },
      children: p
    }
  );
};
function qn(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function tt(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const Vn = Ft.extend({
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
    return Ot(Fn);
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
    return ["span", _t({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Zn = 240, Qn = 280, Jn = ({ props: e, highlight: t, onHighlight: n }) => {
  const o = T(null);
  return G(() => {
    var d;
    const i = (d = o.current) == null ? void 0 : d.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ r("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Qn, maxHeight: Zn, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ r("div", { ref: o, children: e.items.map((i, d) => /* @__PURE__ */ x(
    "button",
    {
      type: "button",
      "data-ac-active": d === t ? "1" : void 0,
      onMouseEnter: () => n(d),
      onClick: () => e.command({ field: i.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${d === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
      children: [
        /* @__PURE__ */ r("span", { className: "w-2 h-2 rounded-full shrink-0", style: { background: i.color.text } }),
        /* @__PURE__ */ r("span", { className: "truncate flex-1", children: i.label }),
        i.group && /* @__PURE__ */ r("span", { className: "shrink-0 text-[9px] text-zinc-600", children: i.group })
      ]
    },
    i.key
  )) }) });
}, er = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const o = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ r(Jn, { props: n, highlight: o, onHighlight: (i) => {
      e.highlight = i, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const o = document.createElement("div");
      o.style.position = "fixed", o.style.zIndex = "9999";
      const i = qt(o);
      e = { holder: o, root: i, unmount: null, props: n, highlight: 0 };
      const d = n.mount(o, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: c, y: a, placement: s }) => {
          var f, h;
          if (!e) return;
          const l = (h = (f = e.props) == null ? void 0 : f.clientRect) == null ? void 0 : h.call(f), p = l && !s.endsWith("-end") ? l.width : 0;
          o.style.left = `${c + p}px`, o.style.top = `${a}px`;
        }
      });
      e.unmount = d, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var c;
      if (!(e != null && e.props)) return !1;
      const { items: o, command: i } = e.props;
      if (o.length === 0) return !1;
      const d = n.key;
      return d === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, o.length - 1), t(e.props), !0) : d === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : d === "Enter" || d === "Tab" ? (n.preventDefault(), i({ field: ((c = o[e.highlight]) == null ? void 0 : c.key) ?? o[0].key }), !0) : !1;
    },
    onExit() {
      var n;
      e && ((n = e.unmount) == null || n.call(e), e.root.unmount(), e.holder.remove(), e = null);
    }
  };
}, Qr = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, tr = Le.forwardRef(({
  value: e,
  onChange: t,
  placeholder: n,
  disabled: o,
  className: i,
  onStateChange: d,
  resolveToken: c,
  suggestionItems: a,
  onTokenClick: s,
  onSelectionChange: l
}, p) => {
  const f = T(c);
  f.current = c;
  const h = T(a);
  h.current = a;
  const w = T(s);
  w.current = s;
  const $ = T(l);
  $.current = l;
  const C = T(null), b = T(null), M = T(t);
  M.current = t;
  const P = T(o);
  P.current = o;
  const L = T(d);
  L.current = d;
  const R = T(null), O = (N) => {
    var B;
    const z = {
      bold: N.isActive("bold"),
      italic: N.isActive("italic"),
      underline: N.isActive("underline"),
      strike: N.isActive("strike"),
      link: N.isActive("link"),
      color: N.getAttributes("textStyle").color || ""
    }, E = R.current;
    E && E.bold === z.bold && E.italic === z.italic && E.underline === z.underline && E.strike === z.strike && E.link === z.link && E.color === z.color || (R.current = z, (B = L.current) == null || B.call(L, z));
  }, X = (N) => {
    var j;
    const z = N.state.selection;
    let E = null;
    z instanceof Te && z.node.type.name === "token" ? (E = { key: z.node.attrs.field ?? "", pos: z.from }, C.current = z.from) : C.current != null && (C.current = N.state.tr.mapping.map(C.current));
    const B = b.current, U = B && E && B.key === E.key && B.pos === E.pos;
    !B && !E || U || (b.current = E, (j = $.current) == null || j.call($, E));
  }, g = (N) => {
    const z = Gn(qn(N));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, I = Le.useMemo(() => {
    const N = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var E;
        return ((E = h.current) == null ? void 0 : E.call(h, z)) ?? [];
      },
      command: ({ editor: z, range: E, props: B }) => {
        z.chain().focus().insertContentAt(E, { type: "token", attrs: { field: B.field } }).run();
      },
      render: er
    };
    return Vn.configure({
      resolve: f.current ?? null,
      suggestion: N,
      onTokenClick: (z, E, B) => {
        var U;
        C.current = B, (U = w.current) == null || U.call(w, z, E, B);
      }
    });
  }, []), v = Ht({
    immediatelyRender: !1,
    extensions: [
      Xt,
      Ut.configure({ placeholder: n }),
      Yt,
      Kt,
      jt,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Gt.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      I
    ],
    content: tt(e || ""),
    editable: !o,
    onUpdate: ({ editor: N }) => {
      M.current(g(N.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: N }) => {
      O(N), X(N);
    }
  });
  return G(() => {
    if (!v || v.isFocused) return;
    g(v.getHTML()) !== e && (R.current = null, v.commands.setContent(tt(e || ""), { emitUpdate: !1 }), O(v));
  }, [e, v]), G(() => {
    v && v.setEditable(!o);
  }, [o, v]), G(() => {
    v && (R.current = null, O(v), X(v));
  }, [v]), Nt(p, () => ({
    exec: (N, z) => {
      if (!(!v || P.current))
        switch (N) {
          case "bold":
            v.chain().focus().toggleBold().run();
            break;
          case "italic":
            v.chain().focus().toggleItalic().run();
            break;
          case "underline":
            v.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            v.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            z && v.chain().focus().setColor(z).run();
            break;
          case "unsetColor":
            v.chain().focus().unsetColor().run();
            break;
          case "link":
            z && v.chain().focus().extendMarkRange("link").setLink({ href: z }).run();
            break;
          case "unlink":
            v.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => v == null ? void 0 : v.commands.focus(),
    insertToken: (N) => {
      !v || P.current || v.chain().focus().insertContent({ type: "token", attrs: { field: N } }).run();
    },
    replaceToken: (N) => {
      if (!v || P.current) return;
      const z = C.current;
      z != null && v.commands.command(({ tr: E }) => {
        const B = E.doc.nodeAt(z);
        if (!B || B.type.name !== "token") return !1;
        E.setNodeMarkup(z, void 0, { field: N });
        const U = E.doc.resolve(z);
        return U.nodeAfter && U.nodeAfter.type.name === "token" && E.setSelection(new Te(U)), !0;
      });
    }
  }), [v]), /* @__PURE__ */ r(Wt, { editor: v, className: `richtext-editor ${i || ""}` });
});
tr.displayName = "RichTextEditor";
const nr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], rr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], nt = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ r("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ r("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Jr = ({ value: e, disabled: t, onChange: n }) => {
  const [o, i] = W(!1);
  return /* @__PURE__ */ r(
    Se,
    {
      open: o,
      onOpenChange: i,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ x("button", { type: "button", disabled: t, className: `${yt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ r("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ r(ct, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: nr.map((d) => /* @__PURE__ */ r(rn, { onClick: () => {
        n(d), i(!1);
      }, icon: d === e ? /* @__PURE__ */ r(ot, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ r("span", { style: { fontFamily: d }, children: d }) }, d))
    }
  );
}, or = ({ editorRef: e, disabled: t, active: n }) => {
  const [o, i] = W(!1), [d, c] = W(""), a = () => {
    var l;
    const s = d.trim();
    s && ((l = e.current) == null || l.exec("link", s), i(!1));
  };
  return /* @__PURE__ */ r(
    Se,
    {
      open: o,
      onOpenChange: i,
      theme: "dark",
      width: "w-64",
      trigger: /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          disabled: t,
          onMouseDown: (s) => s.preventDefault(),
          className: `${gt} ${n ? xt : wt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ r(Mt, { className: "w-3 h-3" })
        }
      ),
      children: /* @__PURE__ */ x("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ r(
          "input",
          {
            value: d,
            onChange: (s) => c(s.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (s) => {
              s.key === "Enter" && (s.preventDefault(), a());
            },
            className: On + " w-full"
          }
        ),
        /* @__PURE__ */ x("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r("button", { onClick: a, className: Be, disabled: !d.trim(), children: "Apply" }),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                var s;
                (s = e.current) == null || s.exec("unlink"), i(!1);
              },
              className: Be,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, eo = ({ editorRef: e, disabled: t, active: n, lockedFormatting: o, trailing: i }) => {
  const [d, c] = W(!1), a = (p, f) => {
    var h;
    return (h = e.current) == null ? void 0 : h.exec(p, f);
  }, s = (p) => `${gt} ${p ? xt : wt}`, l = (p) => !!(o != null && o[p]);
  return /* @__PURE__ */ x("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ r(ge, { content: (o == null ? void 0 : o.bold) || "Bold", children: /* @__PURE__ */ r("button", { "aria-label": "Bold", disabled: t || l("bold"), onMouseDown: (p) => p.preventDefault(), onClick: () => a("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || l("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ r(ge, { content: (o == null ? void 0 : o.italic) || "Italic", children: /* @__PURE__ */ r("button", { "aria-label": "Italic", disabled: t || l("italic"), onMouseDown: (p) => p.preventDefault(), onClick: () => a("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || l("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ r(ge, { content: "Underline", children: /* @__PURE__ */ r("button", { "aria-label": "Underline", disabled: t, onMouseDown: (p) => p.preventDefault(), onClick: () => a("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ r(Et, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r(ge, { content: "Strikethrough", children: /* @__PURE__ */ r("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (p) => p.preventDefault(), onClick: () => a("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ r(St, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r("div", { className: ze }),
    /* @__PURE__ */ r(or, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ r("div", { className: ze }),
    /* @__PURE__ */ r(
      Se,
      {
        open: d,
        onOpenChange: c,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ x("button", { type: "button", disabled: t, className: `${yt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ r("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ r(nt, {}),
          /* @__PURE__ */ r(ct, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ x("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                a("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ r(nt, { className: "w-3.5 h-3.5" })
            }
          ),
          rr.map((p) => /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                a("foreColor", p), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors ${p === (n == null ? void 0 : n.color) ? "ring-2 ring-zinc-300" : ""}`,
              style: { background: p },
              title: p
            },
            p
          ))
        ] })
      }
    ),
    i && /* @__PURE__ */ x(se, { children: [
      /* @__PURE__ */ r("div", { className: ze }),
      i
    ] })
  ] });
};
export {
  _r as Button,
  ln as Checkbox,
  Hr as Checklist,
  Fr as ChromeHeader,
  jr as ContentRow,
  zr as ContextMenu,
  Cr as ContextMenuDivider,
  Tr as ContextMenuItem,
  Br as DatePicker,
  Er as DialogProvider,
  rn as DropdownItem,
  Se as DropdownMenu,
  $r as DropdownSubmenu,
  ut as DropdownThemeContext,
  nr as FONTS,
  Xr as FloatingChrome,
  Jr as FontMenu,
  eo as FormatToolbar,
  k as IS_COARSE,
  Qt as IS_TOUCH_CAPABLE,
  Nr as ItemManagerDropdown,
  Lr as LongPressMenuProvider,
  Sr as Modal,
  Mr as ModalFooter,
  Or as ModalFooterButton,
  Vt as PopoutWindowContext,
  Qr as RICH_TEXT_STATE_IDLE,
  Wr as RadioList,
  tr as RichTextEditor,
  Gr as SectionHeader,
  Kr as Seg,
  qr as StructureControls,
  ft as SubmenuContext,
  Be as TB_BTN,
  ke as TB_BTN_ICON,
  _n as TB_DANGER,
  ze as TB_DIVIDER,
  On as TB_INPUT,
  Yr as TB_NUM,
  yt as TB_PICKER,
  Ur as TB_ROW_LABEL,
  Bn as TB_SEG,
  gt as TB_TOGGLE,
  wt as TB_TOGGLE_OFF,
  xt as TB_TOGGLE_ON,
  Vn as Token,
  Fn as TokenChipView,
  Ne as ToolButton,
  ge as Tooltip,
  Zr as escapeHtml,
  pt as getDropdownClasses,
  vr as getHardwareKeyboard,
  yr as getLastPointerType,
  En as isInteractiveElement,
  Ie as isTouchLike,
  vt as normalizeSpaces,
  tt as preprocessTokenHtml,
  Gn as sanitizeRichText,
  Vr as stripRichText,
  qn as stripTokenWrappers,
  Zt as useCurrentDocument,
  le as useCurrentWindow,
  Dr as useDialog,
  dt as useDropdownTheme,
  Rr as useFixedPosition,
  kr as useHardwareKeyboard,
  Jt as useLastPointerType,
  Pr as useLongPressOptOut,
  Ue as usePopoutWindow,
  de as usePortalTarget,
  Ar as useSmartPosition,
  Ir as useTouchMode
};
