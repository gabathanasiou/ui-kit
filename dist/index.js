"use client";
import { jsxs as w, jsx as r, Fragment as ie } from "react/jsx-runtime";
import Le, { createContext as De, useContext as Ee, useState as W, useEffect as G, useRef as T, useLayoutEffect as se, useCallback as Y, useMemo as Ge, useImperativeHandle as Nt } from "react";
import * as B from "@radix-ui/react-dropdown-menu";
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
function ce() {
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
  const i = "__penClick", u = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (c) => {
    c.pointerType !== "pen" || c.button !== 0 || (n = { x: c.clientX, y: c.clientY });
  }, !0), window.addEventListener("pointerup", (c) => {
    if (c.pointerType !== "pen") return;
    const a = n;
    if (n = null, !a || Math.hypot(c.clientX - a.x, c.clientY - a.y) > 8) return;
    const s = c.target;
    if (!s || !s.isConnected) return;
    if (s instanceof HTMLInputElement && u.has(s.type)) {
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
  align: i = "right",
  width: u,
  theme: c = "dark",
  children: a
}) {
  const [s, l] = W(null), d = de();
  return /* @__PURE__ */ w(B.Root, { open: e, onOpenChange: (m) => {
    n ? n(m) : m || t == null || t();
  }, modal: !1, children: [
    /* @__PURE__ */ r(B.Trigger, { asChild: !0, children: o }),
    /* @__PURE__ */ r(B.Portal, { container: d ?? void 0, children: /* @__PURE__ */ r(ut.Provider, { value: c, children: /* @__PURE__ */ r(ft.Provider, { value: { activeSub: s, setActiveSub: l }, children: /* @__PURE__ */ r(
      B.Content,
      {
        "data-theme": c,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom opacity-0 scale-95 data-[state=open]:opacity-100 data-[state=open]:scale-100 transition-all duration-150 ease-out ${u || ""}`,
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
  onRename: u,
  onDuplicate: c,
  onDelete: a,
  onCreate: s,
  onImport: l,
  onExport: d,
  onReset: h,
  onTrash: m,
  closeOnSelect: y,
  readOnly: N = !1,
  theme: C,
  label: x,
  header: D,
  itemLabel: A,
  trigger: M,
  minItems: P = 1,
  itemRender: R
}) {
  const g = pt(), [_, H] = W(null), [v, $] = W(""), z = T(null), E = T(null);
  G(() => {
    e && requestAnimationFrame(() => {
      var p, f;
      (f = (p = E.current) == null ? void 0 : p.querySelector('[data-active="1"]')) == null || f.scrollIntoView({ block: "nearest" });
    });
  }, [e]), G(() => {
    if (_) {
      requestAnimationFrame(() => {
        var f, X;
        (f = z.current) == null || f.focus(), (X = z.current) == null || X.select();
      });
      const p = n.find((f) => f.id === _);
      p && !v && $(p.name);
    }
  }, [_]), G(() => {
    if (_) {
      const p = n.find((f) => f.id === _);
      p && !v && $(p.name);
    }
  }, [_, n]);
  const O = (p, f) => {
    H(p), $(f);
  }, K = () => {
    _ && v.trim() && u(_, v.trim()), H(null);
  }, j = () => {
    H(null);
  }, le = A || D.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ w(Se, { open: e, onOpenChange: (p) => {
    p ? (H(null), $("")) : (_ && v.trim() && u(_, v.trim()), H(null), $("")), (!p || !N) && t(p);
  }, width: "w-80", theme: C, trigger: M, children: [
    /* @__PURE__ */ r("div", { className: `shrink-0 ${g.headerText}`, children: D }),
    /* @__PURE__ */ r("div", { ref: E, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((p) => {
      const f = p.id === o, X = _ === p.id;
      return /* @__PURE__ */ r("div", { "data-active": f ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${f ? g.rowActiveBg : g.rowHoverBg} ${_ && !X ? "opacity-40 pointer-events-none" : ""}`, children: X ? /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ r("div", { className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ r(
          "input",
          {
            ref: z,
            value: v,
            onChange: (I) => $(I.target.value),
            onKeyDown: (I) => {
              I.key === "Enter" && (I.preventDefault(), I.stopPropagation(), K()), I.key === "Escape" && (I.preventDefault(), I.stopPropagation(), j());
            },
            className: `w-full border rounded ${g.input}`
          }
        ) }),
        /* @__PURE__ */ r(
          B.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${g.editConfirm}`,
            onSelect: (I) => {
              I.preventDefault(), K();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(ot, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          B.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${g.editCancel}`,
            onSelect: (I) => {
              I.preventDefault(), j();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(We, { className: g.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ r(
          B.Item,
          {
            className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none cursor-pointer flex items-center ${g.rowText} ${f ? "" : g.rowTextHover}`,
            onSelect: y ? () => {
              i(p.id);
            } : (I) => {
              I.preventDefault(), i(p.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r("span", { className: `truncate ${f ? g.rowActiveText : ""}`, children: R ? R(p) : p.name })
          }
        ),
        /* @__PURE__ */ r(
          B.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${f ? g.btnActive : g.btnBase}`,
            onSelect: (I) => {
              I.preventDefault(), O(p.id, p.name);
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: /* @__PURE__ */ r($t, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          B.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${f ? g.btnActive : g.btnBase}`,
            onSelect: (I) => {
              I.preventDefault();
              const J = c(p.id);
              J && O(J, `${p.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: /* @__PURE__ */ r(it, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          B.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= P ? g.btnDisabled : f ? g.btnDangerActive : g.btnDanger}`,
            onSelect: (I) => {
              I.preventDefault(), a(p.id);
            },
            onTouchStart: () => {
            },
            disabled: N || n.length <= P,
            children: /* @__PURE__ */ r(Ae, { className: g.btnIcon })
          }
        )
      ] }) }, p.id);
    }) }),
    /* @__PURE__ */ w("div", { className: `shrink-0 ${_ ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ r(B.Separator, { className: g.separator }),
        /* @__PURE__ */ w(
          B.Item,
          {
            className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
            onSelect: (p) => {
              p.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: [
              /* @__PURE__ */ r(st, { className: `${g.btnIcon} ${g.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || l || d || m) && /* @__PURE__ */ r(B.Separator, { className: g.separator }),
      s && /* @__PURE__ */ w(
        B.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault();
            const f = s();
            f && O(f, "");
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ r(zt, { className: `${g.btnIcon} ${g.icon}` }),
            "New ",
            le
          ]
        }
      ),
      l && /* @__PURE__ */ w(
        B.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault(), l();
          },
          onTouchStart: () => {
          },
          disabled: N,
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
        B.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: N,
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
      m && /* @__PURE__ */ w(
        B.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault(), m();
          },
          onTouchStart: () => {
          },
          disabled: N,
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
  children: u,
  keepOpen: c = !1,
  rightAction: a
}) {
  dt();
  const s = pt(), l = T(!1), d = o === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ w(
    B.Item,
    {
      className: `w-full text-left ${nn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (h) => {
        if (l.current) {
          l.current = !1;
          return;
        }
        c && h.preventDefault(), e();
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        t && /* @__PURE__ */ r("span", { className: `${s.icon} shrink-0`, children: t }),
        /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: u }),
        a && /* @__PURE__ */ r(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: a.title,
            onPointerDown: (h) => {
              h.stopPropagation(), h.preventDefault(), l.current = !0, a.onClick();
            },
            onClick: (h) => {
              h.stopPropagation(), h.preventDefault();
            },
            children: a.icon
          }
        )
      ]
    }
  );
}
const on = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function $r({ id: e, label: t, icon: n, width: o, side: i = "right", children: u }) {
  const { activeSub: c, setActiveSub: a } = Ee(ft), s = c === e, l = dt(), d = de(), h = `w-full text-left ${on} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item`, m = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${o || "w-48"}`;
  return /* @__PURE__ */ w(B.Sub, { open: s, onOpenChange: (y) => a(y ? e : null), children: [
    /* @__PURE__ */ w(
      B.SubTrigger,
      {
        className: h,
        onTouchStart: () => {
        },
        onPointerDown: (y) => {
          y.pointerType === "pen" && (y.preventDefault(), a(s ? null : e));
        },
        children: [
          i === "left" && /* @__PURE__ */ r(Re, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ w("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ r("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          i === "right" && /* @__PURE__ */ r(Re, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ r(B.Portal, { container: d ?? void 0, children: /* @__PURE__ */ r(
      B.SubContent,
      {
        "data-theme": l,
        className: m,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        children: u
      }
    ) })
  ] });
}
const me = 8, sn = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", cn = k ? "text-sm" : "text-xs", zr = ({ open: e, x: t, y: n, onClose: o, children: i, containerRef: u }) => {
  const c = Le.useRef(null), a = ce();
  return G(() => {
    if (!e || !a) return;
    const s = (l) => {
      c.current && !c.current.contains(l.target) && o();
    };
    return a.addEventListener("pointerdown", s, !0), () => a.removeEventListener("pointerdown", s, !0);
  }, [e, o, a]), se(() => {
    var x;
    if (!e || !c.current) return;
    const s = c.current.getBoundingClientRect(), l = (x = u == null ? void 0 : u.current) == null ? void 0 : x.getBoundingClientRect(), d = l ? l.right : (a == null ? void 0 : a.innerWidth) ?? 0, h = l ? l.bottom : (a == null ? void 0 : a.innerHeight) ?? 0, m = l ? l.left : 0, y = l ? l.top : 0;
    let N = Math.max(y + me, n), C = Math.max(m + me, t);
    C + s.width > d && (C = d - s.width - me), N + s.height > h && (N = Math.max(y + me, h - s.height - me)), c.current.style.top = `${N}px`, c.current.style.left = `${C}px`;
  }, [e, t, n, u]), e ? /* @__PURE__ */ r(
    "div",
    {
      ref: c,
      "data-theme": "light",
      className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${cn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
      style: { top: n, left: t, touchAction: "manipulation" },
      children: i
    }
  ) : null;
}, Tr = ({ onClick: e, variant: t = "default", icon: n, disabled: o = !1, children: i }) => /* @__PURE__ */ w(
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
function ln({ checked: e, onChange: t, disabled: n = !1, label: o, id: i, className: u = "", labelClassName: c = "", theme: a, variant: s = "pill", tone: l = "accent", block: d = !1 }) {
  const h = s !== "plain", m = k ? "w-5 h-5" : "w-4 h-4", y = k ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", N = k ? "w-3.5 h-3.5" : "w-3 h-3", C = k ? "text-sm" : "text-xs";
  return /* @__PURE__ */ w(
    "label",
    {
      className: `ui-checkbox ${h ? `ui-checkbox-pill ${k ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${l === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${u}`,
      style: { display: d ? "flex" : "inline-flex", alignItems: "center", gap: k ? 10 : 8 },
      onClick: (D) => D.stopPropagation(),
      ...a ? { "data-theme": a } : {},
      children: [
        /* @__PURE__ */ r(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: e,
            disabled: n,
            onChange: (D) => t(D.target.checked),
            className: "sr-only"
          }
        ),
        h ? /* @__PURE__ */ r("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ w("svg", { viewBox: "0 0 16 16", className: m, "aria-hidden": !0, children: [
          /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ r("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ r("svg", { viewBox: "0 0 16 16", className: m, "aria-hidden": !0, children: /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ r("span", { className: `ui-checkbox-box ${y}`, "aria-hidden": !0, children: e && /* @__PURE__ */ r("svg", { viewBox: "0 0 12 12", fill: "none", className: N, "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
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
  const [t, n] = W(null), [o, i] = W(!1), u = de(), c = ce(), a = T(c);
  a.current = c;
  const s = T(null), l = T(null), [d, h] = W(null), m = T(null), [y, N] = W(null), C = T(null), x = m.current !== null;
  C.current, G(() => {
    t || (h(null), N(null));
  }, [t]);
  const D = Y(() => {
    const p = l.current;
    if (!p) return null;
    const f = p.getBoundingClientRect();
    return { left: f.left, top: f.top, width: f.width, height: f.height };
  }, []), A = Y((p) => {
    if (p.target.closest("button")) return;
    const f = D();
    f && (h(f), N({ w: f.width, h: f.height }), m.current = { startX: p.clientX, startY: p.clientY, posX: f.left, posY: f.top }, p.target.setPointerCapture(p.pointerId));
  }, [D]), M = Y((p) => {
    const f = m.current;
    f && (p.preventDefault(), h({ left: f.posX + p.clientX - f.startX, top: f.posY + p.clientY - f.startY }));
  }, []), P = Y(() => {
    m.current = null;
  }, []), R = Y((p) => (f) => {
    f.stopPropagation();
    const X = D();
    X && (h(X), N({ w: X.width, h: X.height }), C.current = { dir: p, startX: f.clientX, startY: f.clientY, startL: X.left, startT: X.top, startW: X.width, startH: X.height }, f.target.setPointerCapture(f.pointerId));
  }, [D]), g = 200, _ = 100, H = 32, v = Y((p) => {
    const f = C.current;
    if (!f) return;
    p.preventDefault();
    const X = p.clientX - f.startX, I = p.clientY - f.startY;
    let J = f.startW, te = f.startH, oe = f.startL, ae = f.startT;
    f.dir.includes("e") && (J = f.startW + X), f.dir.includes("w") && (J = f.startW - X, oe = f.startL + X), f.dir.includes("s") && (te = f.startH + I), f.dir.includes("n") && (te = f.startH - I, ae = f.startT + I);
    const pe = a.current;
    if (!pe) return;
    const fe = pe.innerWidth, ye = pe.innerHeight;
    J = Math.max(g, Math.min(J, fe - H * 2)), te = Math.max(_, Math.min(te, ye - H * 2)), f.dir.includes("w") && (oe = Math.max(H, Math.min(oe, fe - J - H))), f.dir.includes("n") && (ae = Math.max(H, Math.min(ae, ye - te - H))), N({ w: J, h: te }), h({ left: oe, top: ae });
  }, []), $ = Y(() => {
    C.current = null;
  }, []), z = Y(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]), E = Y((p) => {
    if (p.suppressKey) {
      const f = localStorage.getItem(p.suppressKey);
      if (f && Date.now() < parseInt(f, 10))
        return Promise.resolve(!0);
    }
    return new Promise((f) => {
      i(!1), n({ kind: "confirm", options: p, resolve: f });
    });
  }, []), O = Y((p) => new Promise((f) => {
    n({ kind: "prompt", options: p, resolve: f });
  }), []), K = Y((p) => new Promise((f) => {
    n({ kind: "alert", options: p, resolve: f });
  }), []);
  G(() => {
    if (t) {
      const p = setTimeout(() => {
        var f;
        return (f = s.current) == null ? void 0 : f.focus();
      }, 50);
      return () => clearTimeout(p);
    }
  }, [t]);
  const j = () => {
    var p, f;
    !t || t.kind !== "prompt" || (t.resolve(((f = (p = s.current) == null ? void 0 : p.value) == null ? void 0 : f.trim()) || null), n(null));
  }, le = t !== null;
  return /* @__PURE__ */ w(ht.Provider, { value: { confirm: E, prompt: O, alert: K }, children: [
    e,
    /* @__PURE__ */ r(V.Root, { open: le, onOpenChange: (p) => {
      p || z();
    }, modal: !0, children: /* @__PURE__ */ w(V.Portal, { container: u ?? void 0, children: [
      /* @__PURE__ */ r(V.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ w(
        V.Content,
        {
          ref: l,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${an} space-y-4 focus:outline-none ${d || y ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${y ? "" : "w-full max-w-sm"}`,
          style: { ...d ? { left: d.left, top: d.top } : {}, ...y ? { width: y.w, height: y.h } : {} },
          onEscapeKeyDown: (p) => {
            z(), p.preventDefault();
          },
          onPointerDownOutside: (p) => {
            z(), p.preventDefault();
          },
          onKeyDown: (p) => {
            if (p.key === "Enter") {
              if ((t == null ? void 0 : t.kind) === "prompt" && p.target instanceof HTMLInputElement || (p.preventDefault(), !t)) return;
              t.kind === "confirm" ? (t.resolve(!0), n(null)) : t.kind === "prompt" ? j() : (t.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ w(
              "div",
              {
                className: `flex items-center justify-between ${x ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: A,
                onPointerMove: M,
                onPointerUp: P,
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
                onKeyDown: (p) => {
                  p.key === "Enter" && j();
                },
                className: `w-full ${fn} ui-input`
              }
            ),
            /* @__PURE__ */ w("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
              (t == null ? void 0 : t.kind) !== "alert" && /* @__PURE__ */ r(
                "button",
                {
                  onClick: () => {
                    const p = t;
                    p && (p.kind === "confirm" ? (p.resolve(!1), n(null)) : p.kind === "prompt" && (p.resolve(null), n(null)));
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
                        const p = t.options;
                        p.suppressKey && o && localStorage.setItem(p.suppressKey, String(Date.now() + 864e5)), t.resolve(!0), n(null);
                      } else t.kind === "prompt" ? j() : (t.resolve(), n(null));
                  },
                  className: `${qe} ui-btn ${(t == null ? void 0 : t.kind) === "confirm" && t.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (t == null ? void 0 : t.kind) === "alert" ? "OK" : (t == null ? void 0 : t.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ w("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ r("div", { className: `absolute ${Ve} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: R("n"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute ${Ve} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: R("s"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute ${Ze} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: R("w"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute ${Ze} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: R("e"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 left-0 ${ve} cursor-nw-resize pointer-events-auto`, onPointerDown: R("nw"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 right-0 ${ve} cursor-ne-resize pointer-events-auto`, onPointerDown: R("ne"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 left-0 ${ve} cursor-sw-resize pointer-events-auto`, onPointerDown: R("sw"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 right-0 ${ve} cursor-se-resize pointer-events-auto`, onPointerDown: R("se"), onPointerMove: v, onPointerUp: $ })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const re = 32, mt = "[data-modal-stack]", ee = 220, xe = "cubic-bezier(0.32, 0.72, 0, 1)", $e = 0.94;
function be() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function bt(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function Qe(e, t, n, o) {
  const i = ++e.current, u = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = bt(u, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === i && (t.style.transition = `transform ${ee}ms ${xe}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === i && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", o());
      }, ee + 80));
    });
  });
}
function hn(e, t, n) {
  const o = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${$e})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === o && (t.style.transition = `transform ${ee}ms ${xe}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === o && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ee + 60));
    });
  });
}
function Je(e, t, n) {
  const o = ++e.current, i = t.getBoundingClientRect(), u = 1 - $e, c = { left: i.left + i.width * u / 2, top: i.top + i.height * u / 2, width: i.width * $e, height: i.height * $e };
  t.style.transition = `transform ${ee}ms ${xe}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = bt(i, c), t.style.opacity = "0", window.setTimeout(() => {
    e.current === o && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", n());
  }, ee + 60);
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
  footer: u,
  children: c,
  onReset: a,
  morph: s = !0
}) {
  const l = T(null), d = T(null), h = T(null), [m, y] = W(!1), N = Y((b) => {
    l.current = b, y(b !== null);
  }, []), C = de(), x = ce(), D = T(x);
  D.current = x;
  const [A, M] = W(null), P = T(null), R = T(!1), g = T(!1), [_, H] = W(!1), v = T(0), $ = T(!1), z = T(s);
  z.current = s;
  const E = T(!1), O = T(!1), K = () => {
    O.current = !0, H(!0);
  }, j = () => {
    O.current = !1, H(!1);
  };
  G(() => {
    e || (M(null), g.current = !1, R.current = !1);
  }, [e]), se(() => {
    if (!e || g.current || !m || !l.current) return;
    g.current = !0;
    const b = l.current.getBoundingClientRect();
    M({ left: b.left, top: b.top });
  }, [e, m]), se(() => {
    if (!e || !m || !s || be() || !l.current) return;
    const b = l.current, S = Me(b), L = S[S.length - 1];
    K(), L ? Qe(v, b, L.getBoundingClientRect(), j) : hn(v, b, j);
  }, [e, m]);
  const le = Y(() => {
    if ($.current) return;
    const b = l.current, S = !!b && Me(b).length > 0;
    if (!b || !s || be() || S) {
      t();
      return;
    }
    $.current = !0, E.current = !0, K(), Je(v, b, () => {
      $.current = !1, j(), t();
    });
  }, [s, t]);
  se(() => () => {
    const b = l.current;
    if (!b || E.current || !z.current || be() || Me(b).length > 0) return;
    const S = b.ownerDocument, L = b.cloneNode(!0);
    L.removeAttribute("data-modal-stack"), L.removeAttribute("data-state"), L.removeAttribute("role"), L.removeAttribute("data-aria-hidden"), L.removeAttribute("tabindex"), L.setAttribute("aria-hidden", "true"), L.style.pointerEvents = "none", S.body.appendChild(L), Je({ current: 0 }, L, () => {
      L.isConnected && L.remove();
    });
  }, []), G(() => {
    if (!e || !m || !s || !l.current) return;
    const b = l.current, S = b.parentNode;
    if (!S) return;
    let L = 0, F = null, U = !1;
    const Z = () => {
      L = 0;
      const q = Pe(b);
      q.length > 0 ? (F = q[q.length - 1].getBoundingClientRect(), U = !0, L = requestAnimationFrame(Z)) : U && (U = !1, F && !be() && (K(), Qe(v, b, F, j)), F = null);
    }, ne = new MutationObserver(() => {
      !L && Pe(b).length > 0 && (L = requestAnimationFrame(Z));
    });
    return ne.observe(S, { childList: !0 }), () => {
      ne.disconnect(), L && cancelAnimationFrame(L);
    };
  }, [e, m]), G(() => {
    if (!m || !s || be() || !l.current) return;
    const b = l.current;
    let S = Math.round(b.getBoundingClientRect().height), L = !1;
    const F = new ResizeObserver(() => {
      var Ke;
      if (!b.isConnected) return;
      const U = Math.round(b.getBoundingClientRect().height);
      if (!L) {
        L = !0, S = U;
        return;
      }
      if (Math.abs(U - S) < 1) return;
      if (P.current || $.current || Pe(b).length > 0) {
        S = U;
        return;
      }
      if (O.current) return;
      const Z = S;
      S = U, K();
      const ne = b.getBoundingClientRect(), q = !R.current, he = ((Ke = D.current) == null ? void 0 : Ke.innerHeight) ?? 0, kt = q ? (he - Z) / 2 : ne.top, Ye = q ? (he - U) / 2 : ne.top;
      b.style.transition = "none", b.style.height = `${Z}px`, q && (b.style.top = `${kt}px`), d.current && (d.current.style.overflow = "hidden"), b.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.style.height === `${Z}px` && (b.style.transition = `height ${ee}ms ${xe}${q ? `, top ${ee}ms ${xe}` : ""}`, b.style.height = `${U}px`, q && (b.style.top = `${Ye}px`), window.setTimeout(() => {
            b.style.height === `${U}px` && (b.style.transition = "", b.style.height = "", d.current && (d.current.style.overflow = ""), q && M({ left: ne.left, top: Ye }), j());
          }, ee + 60));
        });
      });
    });
    return F.observe(b), () => F.disconnect();
  }, [m]);
  const p = Y(() => {
    const b = l.current;
    if (!b) return null;
    const S = b.getBoundingClientRect();
    return { left: S.left, top: S.top, width: S.width, height: S.height };
  }, []), f = Y((b, S) => {
    var q, he;
    const L = ((q = D.current) == null ? void 0 : q.innerWidth) ?? 0, F = ((he = D.current) == null ? void 0 : he.innerHeight) ?? 0, U = p(), Z = U ? U.width : Math.min(L - re * 2, 576), ne = U ? U.height : Math.min(F - re * 2, 400);
    return {
      left: Math.max(re, Math.min(b, L - Z - re)),
      top: Math.max(re, Math.min(S, F - ne - re))
    };
  }, [p]), X = Y((b) => {
    if (b.target.closest("button")) return;
    R.current = !0;
    const S = p();
    S && (M(f(S.left, S.top)), P.current = { startX: b.clientX, startY: b.clientY, posX: S.left, posY: S.top }, b.target.setPointerCapture(b.pointerId));
  }, [p, f]), I = Y((b) => {
    const S = P.current;
    S && (b.preventDefault(), M(f(S.posX + b.clientX - S.startX, S.posY + b.clientY - S.startY)));
  }, [f]), J = Y(() => {
    P.current = null;
  }, []), te = P.current !== null, oe = A !== null, ae = oe ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, fe = {
    ...oe ? { left: A.left, top: A.top } : {},
    width: `min(100%, calc(100vw - ${re * 2}px))`,
    maxHeight: `calc(100vh - ${re * 2}px)`
  }, ye = Y((b) => {
    if (b.key !== "Enter" || b.shiftKey || b.metaKey || b.ctrlKey || b.altKey || b.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const L = h.current;
    if (!L) return;
    const F = Array.from(L.querySelectorAll("button[data-modal-confirm]")), U = F.length > 0 ? F : Array.from(L.querySelectorAll("button")), Z = U[U.length - 1];
    !Z || Z.disabled || (b.preventDefault(), Z.click());
  }, []);
  return /* @__PURE__ */ r(V.Root, { open: e, onOpenChange: (b) => {
    b || le();
  }, children: /* @__PURE__ */ w(V.Portal, { container: C ?? void 0, children: [
    /* @__PURE__ */ r(
      V.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (b) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (b.preventDefault(), le());
        }
      }
    ),
    /* @__PURE__ */ w(
      V.Content,
      {
        ref: N,
        onKeyDown: ye,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ae} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(fe).length > 0 ? fe : {} },
        children: [
          /* @__PURE__ */ w(
            "div",
            {
              className: `flex items-center justify-between ${mn} ${bn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${te ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (b) => {
                _ || X(b);
              },
              onPointerMove: I,
              onPointerUp: J,
              children: [
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-0", children: [
                  o && /* @__PURE__ */ r("span", { className: "text-zinc-400 shrink-0", children: o }),
                  /* @__PURE__ */ r(V.Title, { className: `${gn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
                  a && /* @__PURE__ */ w("button", { onClick: a, className: `flex items-center gap-1 ${wn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${vn} shrink-0`, children: [
                    /* @__PURE__ */ r(st, { className: yn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ r(V.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ r(We, { className: xn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ r("div", { ref: d, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          u && /* @__PURE__ */ r("div", { ref: h, className: "shrink-0", children: u })
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
  const i = performance.now(), u = (c) => {
    const a = c - i, s = Math.min(a / t, 1);
    n.style.strokeDashoffset = String(o * (1 - s)), s < 1 && requestAnimationFrame(u);
  };
  requestAnimationFrame(u);
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
        children: /* @__PURE__ */ w("svg", { ref: o, width: Q, height: Q, viewBox: `0 0 ${Q} ${Q}`, children: [
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
  onLongPress: u
}) {
  const [c, a] = W(null), s = Zt(), l = T(null), d = T(null), h = T({ x: 0, y: 0, target: null }), m = T(!1), y = Math.min(zn, n * 0.5), N = T(i);
  N.current = i;
  const C = T(u);
  return C.current = u, G(() => {
    if (!k || !s) return;
    const x = (P) => {
      if (!Ie(P.pointerType) || P.button !== 0) return;
      const R = P.target;
      if (!R.closest(o) || (N.current ? !N.current(R) : En(R))) return;
      const g = P.clientX, _ = P.clientY;
      h.current = { x: g, y: _, target: P.target }, m.current = !0, t && (d.current = setTimeout(() => a({ x: g, y: _ }), y)), l.current = setTimeout(() => {
        if (!m.current) return;
        d.current && (clearTimeout(d.current), d.current = null), a(null);
        const H = h.current.target;
        if (!H) return;
        const v = C.current;
        if (v) {
          v(H, g, _);
          return;
        }
        const $ = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: g,
          clientY: _,
          button: 2,
          view: window
        });
        H.dispatchEvent($);
      }, n);
    }, D = (P) => {
      if (!m.current || l.current === null) return;
      const R = P.clientX - h.current.x, g = P.clientY - h.current.y;
      Math.sqrt(R * R + g * g) > Tn && (clearTimeout(l.current), l.current = null, d.current && (clearTimeout(d.current), d.current = null), m.current = !1, a(null));
    }, A = () => {
      l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), m.current = !1, a(null);
    }, M = (P) => {
      Ie(P.pointerType) && (l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), m.current = !1, a(null));
    };
    return s == null || s.addEventListener("pointerdown", x), s.addEventListener("pointermove", D), s.addEventListener("pointerup", A), s.addEventListener("pointercancel", A), s.addEventListener("pointerleave", M), () => {
      s.removeEventListener("pointerdown", x), s.removeEventListener("pointermove", D), s.removeEventListener("pointerup", A), s == null || s.removeEventListener("pointercancel", A), s == null || s.removeEventListener("pointerleave", M), l.current !== null && clearTimeout(l.current), d.current !== null && clearTimeout(d.current);
    };
  }, [t, n, y, o]), /* @__PURE__ */ w(ie, { children: [
    e,
    t && c && /* @__PURE__ */ r(Dn, { x: c.x, y: c.y, ms: n - y })
  ] });
}
function Ar(e, t) {
  const n = ce(), o = T(n);
  o.current = n, se(() => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const u = o.current;
    if (!u) return;
    const c = e.current.getBoundingClientRect(), a = i.getBoundingClientRect(), s = u.innerWidth, l = u.innerHeight, d = a.right - s;
    if (d > 0) {
      const h = Math.min(d + 8, a.left);
      i.style.left = `${a.left - c.left - h}px`;
    }
    a.left < 0 && (i.style.left = `${-c.left + 4}px`), a.bottom > l + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${l - 8}px`));
  }, [t, e]);
}
function Rr(e, t, n) {
  const o = ce(), i = T(o);
  i.current = o, se(() => {
    if (!t || !e.current) return;
    const u = e.current;
    requestAnimationFrame(() => {
      var D, A;
      const c = u.getBoundingClientRect(), a = i.current;
      if (!a) return;
      const s = a.innerWidth, l = ((D = a.visualViewport) == null ? void 0 : D.height) ?? a.innerHeight, d = ((A = a.visualViewport) == null ? void 0 : A.offsetTop) ?? 0, h = 200, m = 4, y = 120;
      let N = Math.max(0, c.left);
      N + h > s && (N = Math.max(0, s - h - 8));
      const C = d + l - c.bottom - m - 16, x = c.top - d - m - 16;
      if (C >= y || C >= x) {
        const M = Math.min(c.bottom + m, d + l), P = Math.max(y, d + l - M - 16);
        n({ top: M, left: N, width: c.width, maxH: P });
      } else {
        const M = Math.max(y, Math.min(x, 360)), P = d + l - (c.top - m);
        n({ top: 0, left: N, width: c.width, maxH: M, bottom: Math.max(0, P) });
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
  ...u
}) {
  let c = Mn[t][e];
  return e === "primary" && t === "light" && n && (c = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white"), /* @__PURE__ */ r("button", { type: i, className: `${Sn} ${c} ${o}`, ...u });
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
  const u = /* @__PURE__ */ new Date(), [c, a] = W(u.getFullYear()), [s, l] = W(u.getMonth()), d = Ge(() => new Set(e), [e]), h = (x) => {
    d.has(x) ? t(e.filter((D) => D !== x)) : t([...e, x]);
  }, m = Ge(() => {
    const x = Rn(c, s), D = new Date(c, s, 1).getDay(), A = [];
    for (let M = 0; M < D; M++) A.push({ key: `pad-${M}`, day: 0, empty: !0 });
    for (let M = 1; M <= x; M++) A.push({ key: In(c, s, M), day: M, empty: !1 });
    return A;
  }, [c, s]), y = n === "dark", N = k ? "py-2" : "py-1.5", C = k ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ w("div", { className: `border rounded-lg overflow-hidden w-full ${y ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ w("div", { className: `flex items-center justify-between px-3 py-2 border-b ${y ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (a((x) => x - 1), l(11)) : l((x) => x - 1);
          },
          className: `p-1 rounded transition-colors ${y ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ r(Tt, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ r("span", { className: `text-sm font-semibold ${y ? "text-zinc-100" : "text-zinc-800"}`, children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" }) }),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 11 ? (a((x) => x + 1), l(0)) : l((x) => x + 1);
          },
          className: `p-1 rounded transition-colors ${y ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ r(Re, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "grid grid-cols-7 text-center", children: [
      An.map((x) => /* @__PURE__ */ r("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${y ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: x }, x)),
      m.map((x) => x.empty ? /* @__PURE__ */ r("div", {}, x.key) : /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => h(x.key),
          className: `${N} text-xs font-medium transition-colors border-b ${y ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${d.has(x.key) ? y ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: x.day
        },
        x.key
      ))
    ] }),
    o && e.length > 0 && /* @__PURE__ */ w("div", { className: `px-3 py-2 border-t ${y ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ w("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-1", children: e.map((x) => {
        const A = (/* @__PURE__ */ new Date(x + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ w("span", { className: `inline-flex items-center gap-1 rounded font-medium ${y ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${C}`, children: [
          A,
          /* @__PURE__ */ r("button", { type: "button", onClick: () => h(x), className: `hover:opacity-70 leading-none ${y ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${A}`, children: "×" })
        ] }, x);
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
  allSelected: u = !1,
  toggleAllLabel: c,
  emptyHint: a = "Nothing here",
  maxHeight: s,
  disabled: l = !1,
  theme: d,
  className: h = ""
}) {
  const m = (x) => t instanceof Set ? t.has(x) : t.includes(x), y = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", N = k ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", C = o != null || i != null;
  return /* @__PURE__ */ w("div", { className: h, ...d ? { "data-theme": d } : {}, children: [
    C && /* @__PURE__ */ w("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      o != null && /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }),
      i != null && /* @__PURE__ */ r("button", { type: "button", disabled: l, onClick: i, className: "ui-checklist-toggleall", children: c ?? (u ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          e.map((x) => {
            const D = m(x.id);
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => n(x.id),
                className: `ui-checklist-item ${y} ${D ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-checklist-box ${N}`, "aria-hidden": !0, children: D && /* @__PURE__ */ r("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  x.leading != null && /* @__PURE__ */ r("span", { className: "ui-checklist-leading", children: x.leading }),
                  /* @__PURE__ */ r("span", { className: "ui-checklist-label", children: x.label }),
                  x.secondary != null && /* @__PURE__ */ r("span", { className: "ui-checklist-secondary", children: x.secondary })
                ]
              },
              x.id
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
  maxHeight: u,
  compact: c = !1,
  disabled: a = !1,
  theme: s,
  className: l = ""
}) {
  const d = c ? "px-2.5 py-1.5 text-xs" : k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", h = c ? "w-3.5 h-3.5" : k ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ w("div", { className: l, ...s ? { "data-theme": s } : {}, children: [
    o != null && /* @__PURE__ */ r("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }) }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: u ? { maxHeight: u, overflowY: "auto" } : void 0,
        children: [
          e.map((m) => {
            const y = t === m.id;
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => n(m.id),
                className: `ui-checklist-item ${d} ${y ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-radio-circle ${h}`, "aria-hidden": !0, children: y && /* @__PURE__ */ r("span", { className: "ui-radio-dot" }) }),
                  m.leading != null && /* @__PURE__ */ r("span", { className: "ui-checklist-leading", children: m.leading }),
                  /* @__PURE__ */ r("span", { className: "ui-checklist-label", children: m.label }),
                  m.secondary != null && /* @__PURE__ */ r("span", { className: "ui-checklist-secondary", children: m.secondary })
                ]
              },
              m.id
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
  offset: u = 8
}) => {
  const c = ce(), { refs: a, floatingStyles: s } = Pt({
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
          var A;
          if (i !== "visible") return {};
          const d = (A = l.elements.floating.ownerDocument) == null ? void 0 : A.defaultView;
          if (!d) return {};
          const h = l.rects.reference, m = Math.max(h.x, 0), y = Math.max(h.y, 0), N = Math.min(h.x + h.width, d.innerWidth), C = Math.min(h.y + h.height, d.innerHeight);
          if (N <= m || C <= y) return {};
          const x = o === "left" ? N - (h.x + h.width) : o === "right" ? m - h.x : 0, D = o === "top" ? y - h.y : o === "bottom" ? C - (h.y + h.height) : 0;
          return { x: l.x + x, y: l.y + D };
        }
      },
      At(u),
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
          const d = (C = l.elements.floating.ownerDocument) == null ? void 0 : C.defaultView;
          if (!d) return {};
          const h = l.rects.floating.width, m = l.rects.floating.height, y = Math.max(8, Math.min(l.x, d.innerWidth - h - 8)), N = Math.max(8, Math.min(l.y, d.innerHeight - m - 8));
          return { x: y, y: N };
        }
      }
    ],
    whileElementsMounted: Lt
  });
  return se(() => {
    n && a.setReference(n);
  }, [n, a]), /* @__PURE__ */ w(ie, { children: [
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
  const n = de(), o = ce(), [i, u] = W(!1), [c, a] = W({ x: 0, y: 0 }), s = T(null), l = () => {
    if (!s.current) return;
    const d = s.current.getBoundingClientRect();
    a({ x: d.left + d.width / 2, y: d.top });
  };
  return G(() => (i && o && (l(), o.addEventListener("scroll", l, !0)), () => o == null ? void 0 : o.removeEventListener("scroll", l, !0)), [i]), /* @__PURE__ */ w(
    "div",
    {
      ref: s,
      className: "inline-flex",
      onMouseEnter: () => {
        l(), u(!0);
      },
      onMouseLeave: () => u(!1),
      children: [
        t,
        i && Xe(
          /* @__PURE__ */ w(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: c.x, top: c.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
• `).map((d, h) => /* @__PURE__ */ r("div", { className: h > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: d }, h)),
                /* @__PURE__ */ r("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, Ur = k ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", Be = k ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ke = k ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", _n = "hover:bg-red-950/50", gt = k ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", xt = "bg-blue-900/50 border-blue-700 text-blue-300", wt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", On = k ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Yr = k ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", ze = k ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Bn = "inline-flex rounded overflow-hidden border border-zinc-700", yt = k ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ne = ({ onClick: e, disabled: t, title: n, className: o = Be, children: i }) => /* @__PURE__ */ r(ge, { content: n, children: /* @__PURE__ */ r("button", { onClick: e, disabled: t, "aria-label": n, className: `${o} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), Kr = ({ value: e, options: t, onChange: n, disabled: o, active: i }) => /* @__PURE__ */ r("div", { className: Bn, children: t.map((u) => {
  const c = i ? i(u.v) : e === u.v;
  return /* @__PURE__ */ r(
    "button",
    {
      disabled: o,
      onClick: () => n(u.v),
      className: `${k ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${c ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${u.v !== t[t.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: u.l
    },
    u.v
  );
}) }), Gr = ({ children: e }) => /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ r("span", { className: k ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ r("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Hn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Wn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", jr = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ w("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ r("span", { className: n ? Hn : Wn, children: e }),
  t
] }), Fr = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ w("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ r("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), qr = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: o, compact: i }) => /* @__PURE__ */ w(ie, { children: [
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
    const i = n.slice(0, o).trim().toLowerCase(), u = n.slice(o + 1).trim();
    Un.has(i) && u && t.push(`${i}: ${u}`);
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
  const i = document.createElement(n), u = t.getAttribute("style"), c = Kn(u || "");
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
const jn = { text: "#52525b" }, Fn = ({ node: e, selected: t, extension: n, editor: o, view: i, getPos: u }) => {
  var h;
  const c = e.attrs.field ?? "", a = n.options, s = ((h = a.resolve) == null ? void 0 : h.call(a, c)) ?? null, l = (s == null ? void 0 : s.color) ?? jn, d = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
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
      onMouseDown: (m) => {
        var x;
        if (m.button !== 0 || !o.isEditable) return;
        m.preventDefault(), o.isFocused || o.commands.focus();
        const y = typeof u == "function" ? u() : null;
        if (y == null) return;
        const N = i.state.doc.resolve(y), C = N.nodeAfter;
        C && Te.isSelectable(C) && i.dispatch(i.state.tr.setSelection(new Te(N))), (x = a.onTokenClick) == null || x.call(a, c, m.currentTarget.getBoundingClientRect(), y);
      },
      children: d
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
    var u;
    const i = (u = o.current) == null ? void 0 : u.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ r("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Qn, maxHeight: Zn, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ r("div", { ref: o, children: e.items.map((i, u) => /* @__PURE__ */ w(
    "button",
    {
      type: "button",
      "data-ac-active": u === t ? "1" : void 0,
      onMouseEnter: () => n(u),
      onClick: () => e.command({ field: i.key }),
      className: `w-full flex items-center gap-2 px-2.5 py-1.5 text-left text-xs rounded transition-colors ${u === t ? "bg-zinc-800 text-zinc-100" : "text-zinc-300"}`,
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
      const u = n.mount(o, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: c, y: a, placement: s }) => {
          var h, m;
          if (!e) return;
          const l = (m = (h = e.props) == null ? void 0 : h.clientRect) == null ? void 0 : m.call(h), d = l && !s.endsWith("-end") ? l.width : 0;
          o.style.left = `${c + d}px`, o.style.top = `${a}px`;
        }
      });
      e.unmount = u, t(n);
    },
    onUpdate(n) {
      e && t(n);
    },
    onKeyDown({ event: n }) {
      var c;
      if (!(e != null && e.props)) return !1;
      const { items: o, command: i } = e.props;
      if (o.length === 0) return !1;
      const u = n.key;
      return u === "ArrowDown" ? (n.preventDefault(), e.highlight = Math.min(e.highlight + 1, o.length - 1), t(e.props), !0) : u === "ArrowUp" ? (n.preventDefault(), e.highlight = Math.max(e.highlight - 1, 0), t(e.props), !0) : u === "Enter" || u === "Tab" ? (n.preventDefault(), i({ field: ((c = o[e.highlight]) == null ? void 0 : c.key) ?? o[0].key }), !0) : !1;
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
  onStateChange: u,
  resolveToken: c,
  suggestionItems: a,
  onTokenClick: s,
  onSelectionChange: l
}, d) => {
  const h = T(c);
  h.current = c;
  const m = T(a);
  m.current = a;
  const y = T(s);
  y.current = s;
  const N = T(l);
  N.current = l;
  const C = T(null), x = T(null), D = T(t);
  D.current = t;
  const A = T(o);
  A.current = o;
  const M = T(u);
  M.current = u;
  const P = T(null), R = ($) => {
    var O;
    const z = {
      bold: $.isActive("bold"),
      italic: $.isActive("italic"),
      underline: $.isActive("underline"),
      strike: $.isActive("strike"),
      link: $.isActive("link"),
      color: $.getAttributes("textStyle").color || ""
    }, E = P.current;
    E && E.bold === z.bold && E.italic === z.italic && E.underline === z.underline && E.strike === z.strike && E.link === z.link && E.color === z.color || (P.current = z, (O = M.current) == null || O.call(M, z));
  }, g = ($) => {
    var j;
    const z = $.state.selection;
    let E = null;
    z instanceof Te && z.node.type.name === "token" ? (E = { key: z.node.attrs.field ?? "", pos: z.from }, C.current = z.from) : C.current != null && (C.current = $.state.tr.mapping.map(C.current));
    const O = x.current, K = O && E && O.key === E.key && O.pos === E.pos;
    !O && !E || K || (x.current = E, (j = N.current) == null || j.call(N, E));
  }, _ = ($) => {
    const z = Gn(qn($));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, H = Le.useMemo(() => {
    const $ = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var E;
        return ((E = m.current) == null ? void 0 : E.call(m, z)) ?? [];
      },
      command: ({ editor: z, range: E, props: O }) => {
        z.chain().focus().insertContentAt(E, { type: "token", attrs: { field: O.field } }).run();
      },
      render: er
    };
    return Vn.configure({
      resolve: h.current ?? null,
      suggestion: $,
      onTokenClick: (z, E, O) => {
        var K;
        C.current = O, (K = y.current) == null || K.call(y, z, E, O);
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
      H
    ],
    content: tt(e || ""),
    editable: !o,
    onUpdate: ({ editor: $ }) => {
      D.current(_($.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: $ }) => {
      R($), g($);
    }
  });
  return G(() => {
    if (!v || v.isFocused) return;
    _(v.getHTML()) !== e && (P.current = null, v.commands.setContent(tt(e || ""), { emitUpdate: !1 }), R(v));
  }, [e, v]), G(() => {
    v && v.setEditable(!o);
  }, [o, v]), G(() => {
    v && (P.current = null, R(v), g(v));
  }, [v]), Nt(d, () => ({
    exec: ($, z) => {
      if (!(!v || A.current))
        switch ($) {
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
    insertToken: ($) => {
      !v || A.current || v.chain().focus().insertContent({ type: "token", attrs: { field: $ } }).run();
    },
    replaceToken: ($) => {
      if (!v || A.current) return;
      const z = C.current;
      z != null && v.commands.command(({ tr: E }) => {
        const O = E.doc.nodeAt(z);
        if (!O || O.type.name !== "token") return !1;
        E.setNodeMarkup(z, void 0, { field: $ });
        const K = E.doc.resolve(z);
        return K.nodeAfter && K.nodeAfter.type.name === "token" && E.setSelection(new Te(K)), !0;
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
      trigger: /* @__PURE__ */ w("button", { type: "button", disabled: t, className: `${yt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ r("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ r(ct, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: nr.map((u) => /* @__PURE__ */ r(rn, { onClick: () => {
        n(u), i(!1);
      }, icon: u === e ? /* @__PURE__ */ r(ot, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ r("span", { style: { fontFamily: u }, children: u }) }, u))
    }
  );
}, or = ({ editorRef: e, disabled: t, active: n }) => {
  const [o, i] = W(!1), [u, c] = W(""), a = () => {
    var l;
    const s = u.trim();
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
      children: /* @__PURE__ */ w("div", { className: "p-2 flex flex-col gap-2", children: [
        /* @__PURE__ */ r(
          "input",
          {
            value: u,
            onChange: (s) => c(s.target.value),
            placeholder: "https://…",
            autoFocus: !0,
            onKeyDown: (s) => {
              s.key === "Enter" && (s.preventDefault(), a());
            },
            className: On + " w-full"
          }
        ),
        /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r("button", { onClick: a, className: Be, disabled: !u.trim(), children: "Apply" }),
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
  const [u, c] = W(!1), a = (d, h) => {
    var m;
    return (m = e.current) == null ? void 0 : m.exec(d, h);
  }, s = (d) => `${gt} ${d ? xt : wt}`, l = (d) => !!(o != null && o[d]);
  return /* @__PURE__ */ w("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ r(ge, { content: (o == null ? void 0 : o.bold) || "Bold", children: /* @__PURE__ */ r("button", { "aria-label": "Bold", disabled: t || l("bold"), onMouseDown: (d) => d.preventDefault(), onClick: () => a("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || l("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ r(ge, { content: (o == null ? void 0 : o.italic) || "Italic", children: /* @__PURE__ */ r("button", { "aria-label": "Italic", disabled: t || l("italic"), onMouseDown: (d) => d.preventDefault(), onClick: () => a("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || l("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ r(ge, { content: "Underline", children: /* @__PURE__ */ r("button", { "aria-label": "Underline", disabled: t, onMouseDown: (d) => d.preventDefault(), onClick: () => a("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ r(Et, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r(ge, { content: "Strikethrough", children: /* @__PURE__ */ r("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (d) => d.preventDefault(), onClick: () => a("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ r(St, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r("div", { className: ze }),
    /* @__PURE__ */ r(or, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ r("div", { className: ze }),
    /* @__PURE__ */ r(
      Se,
      {
        open: u,
        onOpenChange: c,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ w("button", { type: "button", disabled: t, className: `${yt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ r("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ r(nt, {}),
          /* @__PURE__ */ r(ct, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ w("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
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
          rr.map((d) => /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                a("foreColor", d), c(!1);
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
    i && /* @__PURE__ */ w(ie, { children: [
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
  ce as useCurrentWindow,
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
