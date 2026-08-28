"use client";
import { jsxs as w, jsx as r, Fragment as ie } from "react/jsx-runtime";
import Me, { createContext as ze, useContext as Ce, useState as W, useEffect as G, useRef as C, useLayoutEffect as se, useCallback as Y, useMemo as Ye, useImperativeHandle as vt } from "react";
import * as H from "@radix-ui/react-dropdown-menu";
import { Check as nt, X as Be, Pencil as kt, Copy as rt, Trash2 as Pe, RotateCcw as ot, Plus as Nt, ChevronRight as Le, ChevronLeft as $t, ArrowUp as Tt, ArrowDown as zt, ChevronDown as it, Underline as Ct, Strikethrough as Dt, Link as Et } from "lucide-react";
import * as K from "@radix-ui/react-dialog";
import { createPortal as He } from "react-dom";
import { useFloating as St, autoUpdate as Mt, offset as Pt, flip as Lt, shift as Rt } from "@floating-ui/react-dom";
import { mergeAttributes as At, ReactNodeViewRenderer as It, NodeViewWrapper as _t, useEditor as Ot, EditorContent as Bt } from "@tiptap/react";
import { NodeSelection as $e } from "@tiptap/pm/state";
import Ht from "@tiptap/starter-kit";
import Wt from "@tiptap/extension-placeholder";
import { TextStyle as Xt } from "@tiptap/extension-text-style";
import Ut from "@tiptap/extension-color";
import Yt from "@tiptap/extension-link";
import Gt from "@tiptap/extension-underline";
import { Mention as jt } from "@tiptap/extension-mention";
import { createRoot as Ft } from "react-dom/client";
const Kt = ze(null);
function We() {
  return Ce(Kt);
}
function pe() {
  const e = We();
  return e ? e.document.body : null;
}
function qt() {
  const e = We();
  return e ? e.document : typeof document < "u" ? document : null;
}
function ce() {
  return We() ?? (typeof window < "u" ? window : null);
}
const xe = typeof window < "u", k = xe && window.matchMedia("(pointer: coarse)").matches, Vt = xe && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Re(e) {
  return e === "touch" || e === "pen";
}
let de = null;
const Ae = /* @__PURE__ */ new Set();
xe && window.addEventListener("pointerdown", (e) => {
  de = e.pointerType, Ae.forEach((t) => t());
}, !0);
function gr() {
  return de;
}
function Zt() {
  const [, e] = W(0), t = C(de);
  return G(() => {
    const n = () => {
      t.current !== de && (t.current = de, e((o) => o + 1));
    };
    return Ae.add(n), () => {
      Ae.delete(n);
    };
  }, []), de;
}
const st = ["(any-hover: hover)", "(any-pointer: fine)"];
function ct() {
  return xe ? st.some((e) => window.matchMedia(e).matches) : !1;
}
let Te = ct();
const Ie = /* @__PURE__ */ new Set();
function Ge(e) {
  Te !== e && (Te = e, Ie.forEach((t) => t()));
}
var tt;
if (xe) {
  const e = () => Ge(ct());
  for (const c of st) {
    const a = window.matchMedia(c);
    (tt = a.addEventListener) == null || tt.call(a, "change", e);
  }
  window.addEventListener("focus", e), document.addEventListener("visibilitychange", e);
  const t = window.setInterval(() => {
    document.visibilityState === "visible" && e();
  }, 2e3);
  window.addEventListener("pagehide", () => window.clearInterval(t)), window.addEventListener("keydown", (c) => {
    c.isComposing || c.keyCode !== 229 && (c.key === "Enter" || c.key === "Backspace" || c.key === "Process" || c.key === "Unidentified" || Ge(!0));
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
function br() {
  return Te;
}
function xr() {
  const [, e] = W(0);
  return G(() => {
    const t = () => e((n) => n + 1);
    return Ie.add(t), () => {
      Ie.delete(t);
    };
  }, []), Te;
}
const lt = ze("dark"), at = () => Ce(lt), Qt = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", je = k ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", Jt = k ? "text-xs" : "text-[10px]";
function ut(e) {
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
    headerPad: je,
    headerText: `${je} font-semibold uppercase tracking-wider ${Jt} ui-label`,
    // Item padding
    itemPad: Qt,
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
const dt = ze({ activeSub: null, setActiveSub: () => {
} });
function De({
  open: e,
  onClose: t,
  onOpenChange: n,
  trigger: o,
  align: i = "right",
  width: u,
  theme: c = "dark",
  children: a
}) {
  const [s, l] = W(null), d = pe();
  return /* @__PURE__ */ w(H.Root, { open: e, onOpenChange: (g) => {
    n ? n(g) : g || t == null || t();
  }, modal: !1, children: [
    /* @__PURE__ */ r(H.Trigger, { asChild: !0, children: o }),
    /* @__PURE__ */ r(H.Portal, { container: d ?? void 0, children: /* @__PURE__ */ r(lt.Provider, { value: c, children: /* @__PURE__ */ r(dt.Provider, { value: { activeSub: s, setActiveSub: l }, children: /* @__PURE__ */ r(
      H.Content,
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
function wr({
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
  onReset: f,
  onTrash: g,
  closeOnSelect: y,
  readOnly: N = !1,
  theme: z,
  label: b,
  header: S,
  itemLabel: M,
  trigger: P,
  minItems: L = 1,
  itemRender: A
}) {
  const x = ut(), [I, B] = W(null), [v, $] = W(""), T = C(null), E = C(null);
  G(() => {
    e && requestAnimationFrame(() => {
      var p, h;
      (h = (p = E.current) == null ? void 0 : p.querySelector('[data-active="1"]')) == null || h.scrollIntoView({ block: "nearest" });
    });
  }, [e]), G(() => {
    if (I) {
      requestAnimationFrame(() => {
        var h, X;
        (h = T.current) == null || h.focus(), (X = T.current) == null || X.select();
      });
      const p = n.find((h) => h.id === I);
      p && !v && $(p.name);
    }
  }, [I]), G(() => {
    if (I) {
      const p = n.find((h) => h.id === I);
      p && !v && $(p.name);
    }
  }, [I, n]);
  const _ = (p, h) => {
    B(p), $(h);
  }, U = () => {
    I && v.trim() && u(I, v.trim()), B(null);
  }, q = () => {
    B(null);
  }, te = M || S.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ w(De, { open: e, onOpenChange: (p) => {
    p ? (B(null), $("")) : (I && v.trim() && u(I, v.trim()), B(null), $("")), (!p || !N) && t(p);
  }, width: "w-80", theme: z, trigger: P, children: [
    /* @__PURE__ */ r("div", { className: `shrink-0 ${x.headerText}`, children: S }),
    /* @__PURE__ */ r("div", { ref: E, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((p) => {
      const h = p.id === o, X = I === p.id;
      return /* @__PURE__ */ r("div", { "data-active": h ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${h ? x.rowActiveBg : x.rowHoverBg} ${I && !X ? "opacity-40 pointer-events-none" : ""}`, children: X ? /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ r("div", { className: `flex-1 min-w-0 ${x.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ r(
          "input",
          {
            ref: T,
            value: v,
            onChange: (O) => $(O.target.value),
            onKeyDown: (O) => {
              O.key === "Enter" && (O.preventDefault(), O.stopPropagation(), U()), O.key === "Escape" && (O.preventDefault(), O.stopPropagation(), q());
            },
            className: `w-full border rounded ${x.input}`
          }
        ) }),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${x.editConfirm}`,
            onSelect: (O) => {
              O.preventDefault(), U();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(nt, { className: x.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${x.editCancel}`,
            onSelect: (O) => {
              O.preventDefault(), q();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r(Be, { className: x.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `flex-1 min-w-0 ${x.itemPad} rounded outline-none cursor-pointer flex items-center ${x.rowText} ${h ? "" : x.rowTextHover}`,
            onSelect: y ? () => {
              i(p.id);
            } : (O) => {
              O.preventDefault(), i(p.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ r("span", { className: `truncate ${h ? x.rowActiveText : ""}`, children: A ? A(p) : p.name })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${h ? x.btnActive : x.btnBase}`,
            onSelect: (O) => {
              O.preventDefault(), _(p.id, p.name);
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: /* @__PURE__ */ r(kt, { className: x.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${h ? x.btnActive : x.btnBase}`,
            onSelect: (O) => {
              O.preventDefault();
              const Z = c(p.id);
              Z && _(Z, `${p.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: /* @__PURE__ */ r(rt, { className: x.btnIcon })
          }
        ),
        /* @__PURE__ */ r(
          H.Item,
          {
            className: `shrink-0 ${x.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= L ? x.btnDisabled : h ? x.btnDangerActive : x.btnDanger}`,
            onSelect: (O) => {
              O.preventDefault(), a(p.id);
            },
            onTouchStart: () => {
            },
            disabled: N || n.length <= L,
            children: /* @__PURE__ */ r(Pe, { className: x.btnIcon })
          }
        )
      ] }) }, p.id);
    }) }),
    /* @__PURE__ */ w("div", { className: `shrink-0 ${I ? "opacity-40 pointer-events-none" : ""}`, children: [
      f && /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ r(H.Separator, { className: x.separator }),
        /* @__PURE__ */ w(
          H.Item,
          {
            className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault}`,
            onSelect: (p) => {
              p.preventDefault(), f();
            },
            onTouchStart: () => {
            },
            disabled: N,
            children: [
              /* @__PURE__ */ r(ot, { className: `${x.btnIcon} ${x.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || l || d || g) && /* @__PURE__ */ r(H.Separator, { className: x.separator }),
      s && /* @__PURE__ */ w(
        H.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault();
            const h = s();
            h && _(h, "");
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ r(Nt, { className: `${x.btnIcon} ${x.icon}` }),
            "New ",
            te
          ]
        }
      ),
      l && /* @__PURE__ */ w(
        H.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault(), l();
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ w("svg", { className: `${x.btnIcon} ${x.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ r("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ r("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ r("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      d && /* @__PURE__ */ w(
        H.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ w("svg", { className: `${x.btnIcon} ${x.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ r("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ r("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ r("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      g && /* @__PURE__ */ w(
        H.Item,
        {
          className: `w-full text-left ${x.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${x.itemDefault}`,
          onSelect: (p) => {
            p.preventDefault(), g();
          },
          onTouchStart: () => {
          },
          disabled: N,
          children: [
            /* @__PURE__ */ r(Pe, { className: `${x.btnIcon} ${x.icon}` }),
            "Trash"
          ]
        }
      )
    ] })
  ] });
}
const en = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function tn({
  onClick: e,
  icon: t,
  disabled: n = !1,
  variant: o = "default",
  className: i = "",
  children: u,
  keepOpen: c = !1,
  rightAction: a
}) {
  at();
  const s = ut(), l = C(!1), d = o === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ w(
    H.Item,
    {
      className: `w-full text-left ${en} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
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
        /* @__PURE__ */ r("span", { className: "flex-1 truncate", children: u }),
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
const nn = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function yr({ id: e, label: t, icon: n, width: o, side: i = "right", children: u }) {
  const { activeSub: c, setActiveSub: a } = Ce(dt), s = c === e, l = at(), d = pe(), f = `w-full text-left ${nn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item`, g = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${o || "w-48"}`;
  return /* @__PURE__ */ w(H.Sub, { open: s, onOpenChange: (y) => a(y ? e : null), children: [
    /* @__PURE__ */ w(
      H.SubTrigger,
      {
        className: f,
        onTouchStart: () => {
        },
        onPointerDown: (y) => {
          y.pointerType === "pen" && (y.preventDefault(), a(s ? null : e));
        },
        children: [
          i === "left" && /* @__PURE__ */ r(Le, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ w("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ r("span", { className: "ui-icon shrink-0", children: n }),
            t
          ] }),
          i === "right" && /* @__PURE__ */ r(Le, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ r(H.Portal, { container: d ?? void 0, children: /* @__PURE__ */ r(
      H.SubContent,
      {
        "data-theme": l,
        className: g,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        children: u
      }
    ) })
  ] });
}
const he = 8, rn = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", on = k ? "text-sm" : "text-xs", vr = ({ open: e, x: t, y: n, onClose: o, children: i, containerRef: u }) => {
  const c = Me.useRef(null), a = ce();
  return G(() => {
    if (!e || !a) return;
    const s = (l) => {
      c.current && !c.current.contains(l.target) && o();
    };
    return a.addEventListener("pointerdown", s, !0), () => a.removeEventListener("pointerdown", s, !0);
  }, [e, o, a]), se(() => {
    var b;
    if (!e || !c.current) return;
    const s = c.current.getBoundingClientRect(), l = (b = u == null ? void 0 : u.current) == null ? void 0 : b.getBoundingClientRect(), d = l ? l.right : (a == null ? void 0 : a.innerWidth) ?? 0, f = l ? l.bottom : (a == null ? void 0 : a.innerHeight) ?? 0, g = l ? l.left : 0, y = l ? l.top : 0;
    let N = Math.max(y + he, n), z = Math.max(g + he, t);
    z + s.width > d && (z = d - s.width - he), N + s.height > f && (N = Math.max(y + he, f - s.height - he)), c.current.style.top = `${N}px`, c.current.style.left = `${z}px`;
  }, [e, t, n, u]), e ? /* @__PURE__ */ r(
    "div",
    {
      ref: c,
      "data-theme": "light",
      className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${on} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
      style: { top: n, left: t, touchAction: "manipulation" },
      children: i
    }
  ) : null;
}, kr = ({ onClick: e, variant: t = "default", icon: n, disabled: o = !1, children: i }) => /* @__PURE__ */ w(
  "button",
  {
    onClick: o ? void 0 : e,
    onTouchStart: () => {
    },
    className: `w-full text-left ${rn} flex items-center gap-2 rounded cursor-pointer ${o ? "opacity-40 cursor-default" : t === "danger" ? "ui-item ui-item-danger" : "ui-item"}`,
    children: [
      n,
      i
    ]
  }
), Nr = () => /* @__PURE__ */ r("div", { className: "ui-sep my-1" });
function sn({ checked: e, onChange: t, disabled: n = !1, label: o, id: i, className: u = "", labelClassName: c = "", theme: a, variant: s = "pill", tone: l = "accent", block: d = !1 }) {
  const f = s !== "plain", g = k ? "w-5 h-5" : "w-4 h-4", y = k ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", N = k ? "w-3.5 h-3.5" : "w-3 h-3", z = k ? "text-sm" : "text-xs";
  return /* @__PURE__ */ w(
    "label",
    {
      className: `ui-checkbox ${f ? `ui-checkbox-pill ${k ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${l === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${u}`,
      style: { display: d ? "flex" : "inline-flex", alignItems: "center", gap: k ? 10 : 8 },
      onClick: (S) => S.stopPropagation(),
      ...a ? { "data-theme": a } : {},
      children: [
        /* @__PURE__ */ r(
          "input",
          {
            type: "checkbox",
            id: i,
            checked: e,
            disabled: n,
            onChange: (S) => t(S.target.checked),
            className: "sr-only"
          }
        ),
        f ? /* @__PURE__ */ r("span", { className: "ui-check-indicator", "aria-hidden": !0, children: e ? /* @__PURE__ */ w("svg", { viewBox: "0 0 16 16", className: g, "aria-hidden": !0, children: [
          /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ r("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ r("svg", { viewBox: "0 0 16 16", className: g, "aria-hidden": !0, children: /* @__PURE__ */ r("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ r("span", { className: `ui-checkbox-box ${y}`, "aria-hidden": !0, children: e && /* @__PURE__ */ r("svg", { viewBox: "0 0 12 12", fill: "none", className: N, "aria-hidden": !0, children: /* @__PURE__ */ r("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        o != null && /* @__PURE__ */ r("span", { className: `ui-checkbox-label ${z} ${c}`, children: o })
      ]
    }
  );
}
const cn = k ? "p-6" : "p-5", ln = k ? "text-base" : "text-sm", an = k ? "w-5 h-5" : "w-4 h-4", un = k ? "text-sm" : "text-xs", dn = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", Fe = k ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", Ke = k ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", qe = k ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", we = k ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", pt = ze(null);
function $r() {
  const e = Ce(pt);
  if (!e) throw new Error("useDialog must be used within DialogProvider");
  return e;
}
function Tr({ children: e }) {
  const [t, n] = W(null), [o, i] = W(!1), u = pe(), c = ce(), a = C(c);
  a.current = c;
  const s = C(null), l = C(null), [d, f] = W(null), g = C(null), [y, N] = W(null), z = C(null), b = g.current !== null;
  z.current, G(() => {
    t || (f(null), N(null));
  }, [t]);
  const S = Y(() => {
    const p = l.current;
    if (!p) return null;
    const h = p.getBoundingClientRect();
    return { left: h.left, top: h.top, width: h.width, height: h.height };
  }, []), M = Y((p) => {
    if (p.target.closest("button")) return;
    const h = S();
    h && (f(h), N({ w: h.width, h: h.height }), g.current = { startX: p.clientX, startY: p.clientY, posX: h.left, posY: h.top }, p.target.setPointerCapture(p.pointerId));
  }, [S]), P = Y((p) => {
    const h = g.current;
    h && (p.preventDefault(), f({ left: h.posX + p.clientX - h.startX, top: h.posY + p.clientY - h.startY }));
  }, []), L = Y(() => {
    g.current = null;
  }, []), A = Y((p) => (h) => {
    h.stopPropagation();
    const X = S();
    X && (f(X), N({ w: X.width, h: X.height }), z.current = { dir: p, startX: h.clientX, startY: h.clientY, startL: X.left, startT: X.top, startW: X.width, startH: X.height }, h.target.setPointerCapture(h.pointerId));
  }, [S]), x = 200, I = 100, B = 32, v = Y((p) => {
    const h = z.current;
    if (!h) return;
    p.preventDefault();
    const X = p.clientX - h.startX, O = p.clientY - h.startY;
    let Z = h.startW, J = h.startH, le = h.startL, ae = h.startT;
    h.dir.includes("e") && (Z = h.startW + X), h.dir.includes("w") && (Z = h.startW - X, le = h.startL + X), h.dir.includes("s") && (J = h.startH + O), h.dir.includes("n") && (J = h.startH - O, ae = h.startT + O);
    const ue = a.current;
    if (!ue) return;
    const m = ue.innerWidth, D = ue.innerHeight;
    Z = Math.max(x, Math.min(Z, m - B * 2)), J = Math.max(I, Math.min(J, D - B * 2)), h.dir.includes("w") && (le = Math.max(B, Math.min(le, m - Z - B))), h.dir.includes("n") && (ae = Math.max(B, Math.min(ae, D - J - B))), N({ w: Z, h: J }), f({ left: le, top: ae });
  }, []), $ = Y(() => {
    z.current = null;
  }, []), T = Y(() => {
    t && (t.kind === "confirm" ? t.resolve(!1) : t.kind === "prompt" ? t.resolve(null) : t.resolve(), n(null));
  }, [t]), E = Y((p) => {
    if (p.suppressKey) {
      const h = localStorage.getItem(p.suppressKey);
      if (h && Date.now() < parseInt(h, 10))
        return Promise.resolve(!0);
    }
    return new Promise((h) => {
      i(!1), n({ kind: "confirm", options: p, resolve: h });
    });
  }, []), _ = Y((p) => new Promise((h) => {
    n({ kind: "prompt", options: p, resolve: h });
  }), []), U = Y((p) => new Promise((h) => {
    n({ kind: "alert", options: p, resolve: h });
  }), []);
  G(() => {
    if (t) {
      const p = setTimeout(() => {
        var h;
        return (h = s.current) == null ? void 0 : h.focus();
      }, 50);
      return () => clearTimeout(p);
    }
  }, [t]);
  const q = () => {
    var p, h;
    !t || t.kind !== "prompt" || (t.resolve(((h = (p = s.current) == null ? void 0 : p.value) == null ? void 0 : h.trim()) || null), n(null));
  }, te = t !== null;
  return /* @__PURE__ */ w(pt.Provider, { value: { confirm: E, prompt: _, alert: U }, children: [
    e,
    /* @__PURE__ */ r(K.Root, { open: te, onOpenChange: (p) => {
      p || T();
    }, modal: !0, children: /* @__PURE__ */ w(K.Portal, { container: u ?? void 0, children: [
      /* @__PURE__ */ r(K.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ w(
        K.Content,
        {
          ref: l,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${cn} space-y-4 focus:outline-none ${d || y ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${y ? "" : "w-full max-w-sm"}`,
          style: { ...d ? { left: d.left, top: d.top } : {}, ...y ? { width: y.w, height: y.h } : {} },
          onEscapeKeyDown: (p) => {
            T(), p.preventDefault();
          },
          onPointerDownOutside: (p) => {
            T(), p.preventDefault();
          },
          onKeyDown: (p) => {
            if (p.key === "Enter") {
              if ((t == null ? void 0 : t.kind) === "prompt" && p.target instanceof HTMLInputElement || (p.preventDefault(), !t)) return;
              t.kind === "confirm" ? (t.resolve(!0), n(null)) : t.kind === "prompt" ? q() : (t.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ w(
              "div",
              {
                className: `flex items-center justify-between ${b ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: M,
                onPointerMove: P,
                onPointerUp: L,
                children: [
                  /* @__PURE__ */ r(K.Title, { className: `${ln} ui-dialog-title`, children: t == null ? void 0 : t.options.title }),
                  /* @__PURE__ */ r(K.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ r(Be, { className: an }) })
                ]
              }
            ),
            (t == null ? void 0 : t.options.message) && /* @__PURE__ */ r(K.Description, { className: `${un} ui-dialog-text`, children: t.options.message }),
            (t == null ? void 0 : t.kind) === "confirm" && t.options.suppressKey && /* @__PURE__ */ r(
              sn,
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
                  p.key === "Enter" && q();
                },
                className: `w-full ${dn} ui-input`
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
                  className: `${Fe} ui-btn ui-btn-ghost`,
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
                      } else t.kind === "prompt" ? q() : (t.resolve(), n(null));
                  },
                  className: `${Fe} ui-btn ${(t == null ? void 0 : t.kind) === "confirm" && t.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (t == null ? void 0 : t.kind) === "alert" ? "OK" : (t == null ? void 0 : t.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ w("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ r("div", { className: `absolute ${Ke} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: A("n"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute ${Ke} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: A("s"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute ${qe} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: A("w"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute ${qe} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: A("e"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 left-0 ${we} cursor-nw-resize pointer-events-auto`, onPointerDown: A("nw"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute top-0 right-0 ${we} cursor-ne-resize pointer-events-auto`, onPointerDown: A("ne"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 left-0 ${we} cursor-sw-resize pointer-events-auto`, onPointerDown: A("sw"), onPointerMove: v, onPointerUp: $ }),
              /* @__PURE__ */ r("div", { className: `absolute bottom-0 right-0 ${we} cursor-se-resize pointer-events-auto`, onPointerDown: A("se"), onPointerMove: v, onPointerUp: $ })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const oe = 32, ft = "[data-modal-stack]", ee = 220, be = "cubic-bezier(0.32, 0.72, 0, 1)", ke = 0.94;
function me() {
  return typeof window < "u" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function ht(e, t) {
  return `translate(${t.left - e.left}px, ${t.top - e.top}px) scale(${t.width / e.width}, ${t.height / e.height})`;
}
function Ve(e, t, n, o) {
  const i = ++e.current, u = t.getBoundingClientRect();
  t.style.transition = "none", t.style.transform = ht(u, n), t.style.transformOrigin = "0 0", t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === i && (t.style.transition = `transform ${ee}ms ${be}, opacity 180ms ease`, t.style.transform = "none", window.setTimeout(() => {
        e.current === i && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", o());
      }, ee + 80));
    });
  });
}
function pn(e, t, n) {
  const o = ++e.current;
  t.style.transition = "none", t.style.transformOrigin = "center", t.style.transform = `scale(${ke})`, t.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      e.current === o && (t.style.transition = `transform ${ee}ms ${be}`, t.style.transform = "none", window.setTimeout(() => {
        e.current === o && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", n());
      }, ee + 60));
    });
  });
}
function Ze(e, t, n) {
  const o = ++e.current, i = t.getBoundingClientRect(), u = 1 - ke, c = { left: i.left + i.width * u / 2, top: i.top + i.height * u / 2, width: i.width * ke, height: i.height * ke };
  t.style.transition = `transform ${ee}ms ${be}, opacity 170ms ease`, t.style.transformOrigin = "0 0", t.style.transform = ht(i, c), t.style.opacity = "0", window.setTimeout(() => {
    e.current === o && (t.style.transition = "", t.style.transform = "", t.style.transformOrigin = "", t.style.opacity = "", n());
  }, ee + 60);
}
function Ee(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(ft) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Se(e) {
  const t = e.parentNode;
  return t ? Array.from(t.children).filter((n) => n instanceof HTMLElement && n !== e && n.matches(ft) && (n.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const fn = k ? "px-6" : "px-5", hn = k ? "py-3" : "py-2.5", mn = k ? "text-sm" : "text-xs", gn = k ? "w-4 h-4" : "w-3.5 h-3.5", bn = k ? "text-xs" : "text-[10px]", xn = k ? "w-3.5 h-3.5" : "w-3 h-3", wn = k ? "px-2.5 py-1.5" : "px-2 py-1", yn = k ? "px-6" : "px-5", vn = k ? "py-3" : "py-2";
function zr({
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
  const l = C(null), d = C(null), [f, g] = W(!1), y = Y((m) => {
    l.current = m, g(m !== null);
  }, []), N = pe(), z = ce(), b = C(z);
  b.current = z;
  const [S, M] = W(null), P = C(null), L = C(!1), A = C(!1), [x, I] = W(!1), B = C(0), v = C(!1), $ = C(s);
  $.current = s;
  const T = C(!1), E = C(!1), _ = () => {
    E.current = !0, I(!0);
  }, U = () => {
    E.current = !1, I(!1);
  };
  G(() => {
    e || (M(null), A.current = !1, L.current = !1);
  }, [e]), se(() => {
    if (!e || A.current || !f || !l.current) return;
    A.current = !0;
    const m = l.current.getBoundingClientRect();
    M({ left: m.left, top: m.top });
  }, [e, f]), se(() => {
    if (!e || !f || !s || me() || !l.current) return;
    const m = l.current, D = Ee(m), R = D[D.length - 1];
    _(), R ? Ve(B, m, R.getBoundingClientRect(), U) : pn(B, m, U);
  }, [e, f]);
  const q = Y(() => {
    if (v.current) return;
    const m = l.current, D = !!m && Ee(m).length > 0;
    if (!m || !s || me() || D) {
      t();
      return;
    }
    v.current = !0, T.current = !0, _(), Ze(B, m, () => {
      v.current = !1, U(), t();
    });
  }, [s, t]);
  se(() => () => {
    const m = l.current;
    if (!m || T.current || !$.current || me() || Ee(m).length > 0) return;
    const D = m.ownerDocument, R = m.cloneNode(!0);
    R.removeAttribute("data-modal-stack"), R.removeAttribute("data-state"), R.removeAttribute("role"), R.removeAttribute("data-aria-hidden"), R.removeAttribute("tabindex"), R.setAttribute("aria-hidden", "true"), R.style.pointerEvents = "none", D.body.appendChild(R), Ze({ current: 0 }, R, () => {
      R.isConnected && R.remove();
    });
  }, []), G(() => {
    if (!e || !f || !s || !l.current) return;
    const m = l.current, D = m.parentNode;
    if (!D) return;
    let R = 0, Q = null, j = !1;
    const ne = () => {
      R = 0;
      const F = Se(m);
      F.length > 0 ? (Q = F[F.length - 1].getBoundingClientRect(), j = !0, R = requestAnimationFrame(ne)) : j && (j = !1, Q && !me() && (_(), Ve(B, m, Q, U)), Q = null);
    }, re = new MutationObserver(() => {
      !R && Se(m).length > 0 && (R = requestAnimationFrame(ne));
    });
    return re.observe(D, { childList: !0 }), () => {
      re.disconnect(), R && cancelAnimationFrame(R);
    };
  }, [e, f]), G(() => {
    if (!f || !s || me() || !l.current) return;
    const m = l.current;
    let D = Math.round(m.getBoundingClientRect().height), R = !1;
    const Q = new ResizeObserver(() => {
      var Ue;
      if (!m.isConnected) return;
      const j = Math.round(m.getBoundingClientRect().height);
      if (!R) {
        R = !0, D = j;
        return;
      }
      if (Math.abs(j - D) < 1) return;
      if (P.current || v.current || Se(m).length > 0) {
        D = j;
        return;
      }
      if (E.current) return;
      const ne = D;
      D = j, _();
      const re = m.getBoundingClientRect(), F = !L.current, fe = ((Ue = b.current) == null ? void 0 : Ue.innerHeight) ?? 0, yt = F ? (fe - ne) / 2 : re.top, Xe = F ? (fe - j) / 2 : re.top;
      m.style.transition = "none", m.style.height = `${ne}px`, F && (m.style.top = `${yt}px`), d.current && (d.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${ne}px` && (m.style.transition = `height ${ee}ms ${be}${F ? `, top ${ee}ms ${be}` : ""}`, m.style.height = `${j}px`, F && (m.style.top = `${Xe}px`), window.setTimeout(() => {
            m.style.height === `${j}px` && (m.style.transition = "", m.style.height = "", d.current && (d.current.style.overflow = ""), F && M({ left: re.left, top: Xe }), U());
          }, ee + 60));
        });
      });
    });
    return Q.observe(m), () => Q.disconnect();
  }, [f]);
  const te = Y(() => {
    const m = l.current;
    if (!m) return null;
    const D = m.getBoundingClientRect();
    return { left: D.left, top: D.top, width: D.width, height: D.height };
  }, []), p = Y((m, D) => {
    var F, fe;
    const R = ((F = b.current) == null ? void 0 : F.innerWidth) ?? 0, Q = ((fe = b.current) == null ? void 0 : fe.innerHeight) ?? 0, j = te(), ne = j ? j.width : Math.min(R - oe * 2, 576), re = j ? j.height : Math.min(Q - oe * 2, 400);
    return {
      left: Math.max(oe, Math.min(m, R - ne - oe)),
      top: Math.max(oe, Math.min(D, Q - re - oe))
    };
  }, [te]), h = Y((m) => {
    if (m.target.closest("button")) return;
    L.current = !0;
    const D = te();
    D && (M(p(D.left, D.top)), P.current = { startX: m.clientX, startY: m.clientY, posX: D.left, posY: D.top }, m.target.setPointerCapture(m.pointerId));
  }, [te, p]), X = Y((m) => {
    const D = P.current;
    D && (m.preventDefault(), M(p(D.posX + m.clientX - D.startX, D.posY + m.clientY - D.startY)));
  }, [p]), O = Y(() => {
    P.current = null;
  }, []), Z = P.current !== null, J = S !== null, le = J ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", ae = `${i ? `${i} w-full` : "max-w-xl w-full"}`, ue = {
    ...J ? { left: S.left, top: S.top } : {},
    width: `min(100%, calc(100vw - ${oe * 2}px))`,
    maxHeight: `calc(100vh - ${oe * 2}px)`
  };
  return /* @__PURE__ */ r(K.Root, { open: e, onOpenChange: (m) => {
    m || q();
  }, children: /* @__PURE__ */ w(K.Portal, { container: N ?? void 0, children: [
    /* @__PURE__ */ r(
      K.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), q());
        }
      }
    ),
    /* @__PURE__ */ w(
      K.Content,
      {
        ref: y,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${le} ${ae}`,
        style: { touchAction: "manipulation", ...Object.keys(ue).length > 0 ? ue : {} },
        children: [
          /* @__PURE__ */ w(
            "div",
            {
              className: `flex items-center justify-between ${fn} ${hn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${Z ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                x || h(m);
              },
              onPointerMove: X,
              onPointerUp: O,
              children: [
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-0", children: [
                  o && /* @__PURE__ */ r("span", { className: "text-zinc-400 shrink-0", children: o }),
                  /* @__PURE__ */ r(K.Title, { className: `${mn} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
                  a && /* @__PURE__ */ w("button", { onClick: a, className: `flex items-center gap-1 ${bn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${wn} shrink-0`, children: [
                    /* @__PURE__ */ r(ot, { className: xn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ r(K.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ r(Be, { className: gn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ r("div", { ref: d, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          u && /* @__PURE__ */ r("div", { className: "shrink-0", children: u })
        ]
      }
    )
  ] }) });
}
function Cr({ children: e }) {
  return /* @__PURE__ */ r("div", { className: `flex items-center justify-end gap-3 ${yn} ${vn} border-t border-zinc-800 bg-zinc-950`, children: e });
}
const kn = 500, Nn = 250, $n = 5, V = 88, Qe = 4;
function Tn(e, t) {
  const n = e.querySelectorAll("circle")[1], o = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(o), n.style.strokeDashoffset = String(o);
  const i = performance.now(), u = (c) => {
    const a = c - i, s = Math.min(a / t, 1);
    n.style.strokeDashoffset = String(o * (1 - s)), s < 1 && requestAnimationFrame(u);
  };
  requestAnimationFrame(u);
}
function zn({ x: e, y: t, ms: n }) {
  const o = C(null), i = pe();
  return G(() => {
    o.current && Tn(o.current, n);
  }, [n]), He(
    /* @__PURE__ */ r(
      "div",
      {
        style: {
          position: "fixed",
          left: e - V / 2,
          top: t - V / 2,
          width: V,
          height: V,
          zIndex: 99999,
          pointerEvents: "none"
        },
        children: /* @__PURE__ */ w("svg", { ref: o, width: V, height: V, viewBox: `0 0 ${V} ${V}`, children: [
          /* @__PURE__ */ r(
            "circle",
            {
              cx: V / 2,
              cy: V / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(0,0,0,0.45)",
              strokeWidth: Qe + 2,
              strokeLinecap: "round"
            }
          ),
          /* @__PURE__ */ r(
            "circle",
            {
              cx: V / 2,
              cy: V / 2,
              r: 40,
              fill: "none",
              stroke: "rgba(255,255,255,0.85)",
              strokeWidth: Qe,
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
function Dr() {
  return { "data-no-longpress": "true" };
}
function Cn(e) {
  const t = e.tagName;
  return !!(t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || t === "BUTTON" || e.isContentEditable || e.closest("[data-no-longpress]") || e.closest("button, input, select, textarea"));
}
function Er({
  children: e,
  showRing: t = !0,
  longPressMs: n = kn,
  targetSelector: o = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: u
}) {
  const [c, a] = W(null), s = qt(), l = C(null), d = C(null), f = C({ x: 0, y: 0, target: null }), g = C(!1), y = Math.min(Nn, n * 0.5), N = C(i);
  N.current = i;
  const z = C(u);
  return z.current = u, G(() => {
    if (!k || !s) return;
    const b = (L) => {
      if (!Re(L.pointerType) || L.button !== 0) return;
      const A = L.target;
      if (!A.closest(o) || (N.current ? !N.current(A) : Cn(A))) return;
      const x = L.clientX, I = L.clientY;
      f.current = { x, y: I, target: L.target }, g.current = !0, t && (d.current = setTimeout(() => a({ x, y: I }), y)), l.current = setTimeout(() => {
        if (!g.current) return;
        d.current && (clearTimeout(d.current), d.current = null), a(null);
        const B = f.current.target;
        if (!B) return;
        const v = z.current;
        if (v) {
          v(B, x, I);
          return;
        }
        const $ = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: x,
          clientY: I,
          button: 2,
          view: window
        });
        B.dispatchEvent($);
      }, n);
    }, S = (L) => {
      if (!g.current || l.current === null) return;
      const A = L.clientX - f.current.x, x = L.clientY - f.current.y;
      Math.sqrt(A * A + x * x) > $n && (clearTimeout(l.current), l.current = null, d.current && (clearTimeout(d.current), d.current = null), g.current = !1, a(null));
    }, M = () => {
      l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), g.current = !1, a(null);
    }, P = (L) => {
      Re(L.pointerType) && (l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), g.current = !1, a(null));
    };
    return s == null || s.addEventListener("pointerdown", b), s.addEventListener("pointermove", S), s.addEventListener("pointerup", M), s.addEventListener("pointercancel", M), s.addEventListener("pointerleave", P), () => {
      s.removeEventListener("pointerdown", b), s.removeEventListener("pointermove", S), s.removeEventListener("pointerup", M), s == null || s.removeEventListener("pointercancel", M), s == null || s.removeEventListener("pointerleave", P), l.current !== null && clearTimeout(l.current), d.current !== null && clearTimeout(d.current);
    };
  }, [t, n, y, o]), /* @__PURE__ */ w(ie, { children: [
    e,
    t && c && /* @__PURE__ */ r(zn, { x: c.x, y: c.y, ms: n - y })
  ] });
}
function Sr(e, t) {
  const n = ce(), o = C(n);
  o.current = n, se(() => {
    if (!t || !e.current) return;
    const i = e.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const u = o.current;
    if (!u) return;
    const c = e.current.getBoundingClientRect(), a = i.getBoundingClientRect(), s = u.innerWidth, l = u.innerHeight, d = a.right - s;
    if (d > 0) {
      const f = Math.min(d + 8, a.left);
      i.style.left = `${a.left - c.left - f}px`;
    }
    a.left < 0 && (i.style.left = `${-c.left + 4}px`), a.bottom > l + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${l - 8}px`));
  }, [t, e]);
}
function Mr(e, t, n) {
  const o = ce(), i = C(o);
  i.current = o, se(() => {
    if (!t || !e.current) return;
    const u = e.current;
    requestAnimationFrame(() => {
      var S, M;
      const c = u.getBoundingClientRect(), a = i.current;
      if (!a) return;
      const s = a.innerWidth, l = ((S = a.visualViewport) == null ? void 0 : S.height) ?? a.innerHeight, d = ((M = a.visualViewport) == null ? void 0 : M.offsetTop) ?? 0, f = 200, g = 4, y = 120;
      let N = Math.max(0, c.left);
      N + f > s && (N = Math.max(0, s - f - 8));
      const z = d + l - c.bottom - g - 16, b = c.top - d - g - 16;
      if (z >= y || z >= b) {
        const P = Math.min(c.bottom + g, d + l), L = Math.max(y, d + l - P - 16);
        n({ top: P, left: N, width: c.width, maxH: L });
      } else {
        const P = Math.max(y, Math.min(b, 360)), L = d + l - (c.top - g);
        n({ top: 0, left: N, width: c.width, maxH: P, bottom: Math.max(0, L) });
      }
    });
  }, [t, e]);
}
function Pr() {
  const e = Zt();
  return Vt ? e === null || Re(e) : !1;
}
const Dn = "inline-flex items-center gap-1.5 rounded text-xs font-semibold transition-colors cursor-pointer select-none whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed", En = {
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
function Lr({
  variant: e = "subtle",
  theme: t = "light",
  cloud: n = !1,
  className: o = "",
  type: i = "button",
  ...u
}) {
  let c = En[t][e];
  return e === "primary" && t === "light" && n && (c = "px-3 py-1 bg-blue-950 hover:bg-blue-900 text-white"), /* @__PURE__ */ r("button", { type: i, className: `${Dn} ${c} ${o}`, ...u });
}
const Sn = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Mn(e, t) {
  return new Date(e, t + 1, 0).getDate();
}
function Pn(e, t, n) {
  return `${e}-${String(t + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
}
function Rr({ selected: e, onChange: t, theme: n = "light", showChips: o = !0, className: i = "" }) {
  const u = /* @__PURE__ */ new Date(), [c, a] = W(u.getFullYear()), [s, l] = W(u.getMonth()), d = Ye(() => new Set(e), [e]), f = (b) => {
    d.has(b) ? t(e.filter((S) => S !== b)) : t([...e, b]);
  }, g = Ye(() => {
    const b = Mn(c, s), S = new Date(c, s, 1).getDay(), M = [];
    for (let P = 0; P < S; P++) M.push({ key: `pad-${P}`, day: 0, empty: !0 });
    for (let P = 1; P <= b; P++) M.push({ key: Pn(c, s, P), day: P, empty: !1 });
    return M;
  }, [c, s]), y = n === "dark", N = k ? "py-2" : "py-1.5", z = k ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ w("div", { className: `border rounded-lg overflow-hidden w-full ${y ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ w("div", { className: `flex items-center justify-between px-3 py-2 border-b ${y ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (a((b) => b - 1), l(11)) : l((b) => b - 1);
          },
          className: `p-1 rounded transition-colors ${y ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ r($t, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ r("span", { className: `text-sm font-semibold ${y ? "text-zinc-100" : "text-zinc-800"}`, children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" }) }),
      /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 11 ? (a((b) => b + 1), l(0)) : l((b) => b + 1);
          },
          className: `p-1 rounded transition-colors ${y ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ r(Le, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "grid grid-cols-7 text-center", children: [
      Sn.map((b) => /* @__PURE__ */ r("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${y ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: b }, b)),
      g.map((b) => b.empty ? /* @__PURE__ */ r("div", {}, b.key) : /* @__PURE__ */ r(
        "button",
        {
          type: "button",
          onClick: () => f(b.key),
          className: `${N} text-xs font-medium transition-colors border-b ${y ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${d.has(b.key) ? y ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: b.day
        },
        b.key
      ))
    ] }),
    o && e.length > 0 && /* @__PURE__ */ w("div", { className: `px-3 py-2 border-t ${y ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ w("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        e.length,
        " date",
        e.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-1", children: e.map((b) => {
        const M = (/* @__PURE__ */ new Date(b + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ w("span", { className: `inline-flex items-center gap-1 rounded font-medium ${y ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${z}`, children: [
          M,
          /* @__PURE__ */ r("button", { type: "button", onClick: () => f(b), className: `hover:opacity-70 leading-none ${y ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${M}`, children: "×" })
        ] }, b);
      }) })
    ] })
  ] });
}
function Ar({
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
  className: f = ""
}) {
  const g = (b) => t instanceof Set ? t.has(b) : t.includes(b), y = k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", N = k ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", z = o != null || i != null;
  return /* @__PURE__ */ w("div", { className: f, ...d ? { "data-theme": d } : {}, children: [
    z && /* @__PURE__ */ w("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      o != null && /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }),
      i != null && /* @__PURE__ */ r("button", { type: "button", disabled: l, onClick: i, className: "ui-checklist-toggleall", children: c ?? (u ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          e.map((b) => {
            const S = g(b.id);
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => n(b.id),
                className: `ui-checklist-item ${y} ${S ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-checklist-box ${N}`, "aria-hidden": !0, children: S && /* @__PURE__ */ r("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ r("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
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
function Ir({
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
  const d = c ? "px-2.5 py-1.5 text-xs" : k ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", f = c ? "w-3.5 h-3.5" : k ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ w("div", { className: l, ...s ? { "data-theme": s } : {}, children: [
    o != null && /* @__PURE__ */ r("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ r("span", { className: "ui-checklist-title", children: o }) }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${a ? "ui-checklist-disabled" : ""}`,
        style: u ? { maxHeight: u, overflowY: "auto" } : void 0,
        children: [
          e.map((g) => {
            const y = t === g.id;
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: a,
                onClick: () => n(g.id),
                className: `ui-checklist-item ${d} ${y ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ r("span", { className: `ui-radio-circle ${f}`, "aria-hidden": !0, children: y && /* @__PURE__ */ r("span", { className: "ui-radio-dot" }) }),
                  g.leading != null && /* @__PURE__ */ r("span", { className: "ui-checklist-leading", children: g.leading }),
                  /* @__PURE__ */ r("span", { className: "ui-checklist-label", children: g.label }),
                  g.secondary != null && /* @__PURE__ */ r("span", { className: "ui-checklist-secondary", children: g.secondary })
                ]
              },
              g.id
            );
          }),
          e.length === 0 && /* @__PURE__ */ r("div", { className: "ui-checklist-empty", children: i })
        ]
      }
    )
  ] });
}
const _r = ({
  className: e,
  children: t,
  reference: n,
  placement: o = "top",
  anchorMode: i = "visible",
  offset: u = 8
}) => {
  const c = ce(), { refs: a, floatingStyles: s } = St({
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
          var M;
          if (i !== "visible") return {};
          const d = (M = l.elements.floating.ownerDocument) == null ? void 0 : M.defaultView;
          if (!d) return {};
          const f = l.rects.reference, g = Math.max(f.x, 0), y = Math.max(f.y, 0), N = Math.min(f.x + f.width, d.innerWidth), z = Math.min(f.y + f.height, d.innerHeight);
          if (N <= g || z <= y) return {};
          const b = o === "left" ? N - (f.x + f.width) : o === "right" ? g - f.x : 0, S = o === "top" ? y - f.y : o === "bottom" ? z - (f.y + f.height) : 0;
          return { x: l.x + b, y: l.y + S };
        }
      },
      Pt(u),
      Lt({ padding: 8 }),
      Rt({ padding: 8 }),
      // Final hard clamp into the viewport. Floating UI's shift measures the
      // panel's *current* DOM rect (one update behind), so a large scroll jump
      // can leave it off-screen next to a scrolled-out reference — this clamp
      // uses the freshly computed coords + measured size and always wins.
      {
        name: "viewportClamp",
        fn: (l) => {
          var z;
          const d = (z = l.elements.floating.ownerDocument) == null ? void 0 : z.defaultView;
          if (!d) return {};
          const f = l.rects.floating.width, g = l.rects.floating.height, y = Math.max(8, Math.min(l.x, d.innerWidth - f - 8)), N = Math.max(8, Math.min(l.y, d.innerHeight - g - 8));
          return { x: y, y: N };
        }
      }
    ],
    whileElementsMounted: Mt
  });
  return se(() => {
    n && a.setReference(n);
  }, [n, a]), /* @__PURE__ */ w(ie, { children: [
    !n && /* @__PURE__ */ r("div", { ref: a.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    c && He(
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
  const n = pe(), o = ce(), [i, u] = W(!1), [c, a] = W({ x: 0, y: 0 }), s = C(null), l = () => {
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
        i && He(
          /* @__PURE__ */ w(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: c.x, top: c.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                e.split(`
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
}, Or = k ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", _e = k ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", ye = k ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", Ln = "hover:bg-red-950/50", mt = k ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", gt = "bg-blue-900/50 border-blue-700 text-blue-300", bt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", Rn = k ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", Br = k ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", Ne = k ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", An = "inline-flex rounded overflow-hidden border border-zinc-700", xt = k ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", ve = ({ onClick: e, disabled: t, title: n, className: o = _e, children: i }) => /* @__PURE__ */ r(ge, { content: n, children: /* @__PURE__ */ r("button", { onClick: e, disabled: t, "aria-label": n, className: `${o} ${t ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), Hr = ({ value: e, options: t, onChange: n, disabled: o, active: i }) => /* @__PURE__ */ r("div", { className: An, children: t.map((u) => {
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
}) }), Wr = ({ children: e }) => /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ r("span", { className: k ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: e }),
  /* @__PURE__ */ r("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), In = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", _n = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", Xr = ({ label: e, children: t, tall: n }) => /* @__PURE__ */ w("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  e && /* @__PURE__ */ r("span", { className: n ? In : _n, children: e }),
  t
] }), Ur = ({ leading: e, trailing: t, className: n = "" }) => /* @__PURE__ */ w("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  e,
  t && /* @__PURE__ */ r("div", { className: "ml-auto flex items-center gap-1", children: t })
] }), Yr = ({ readOnly: e, onDuplicate: t, onRemove: n, onMove: o, compact: i }) => /* @__PURE__ */ w(ie, { children: [
  /* @__PURE__ */ r(ve, { onClick: () => o(-1), disabled: e, title: "Move up", className: ye, children: /* @__PURE__ */ r(Tt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r(ve, { onClick: () => o(1), disabled: e, title: "Move down", className: ye, children: /* @__PURE__ */ r(zt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r(ve, { onClick: t, disabled: e, title: "Duplicate", className: ye, children: /* @__PURE__ */ r(rt, { className: "w-2.5 h-2.5" }) }),
  /* @__PURE__ */ r("div", { className: Ne }),
  /* @__PURE__ */ r(ve, { onClick: n, disabled: e, title: "Delete", className: `${ye} ${Ln}`, children: /* @__PURE__ */ r(Pe, { className: "w-2.5 h-2.5" }) })
] }), On = /* @__PURE__ */ new Set(["b", "strong", "i", "em", "u", "s", "strike", "br", "div", "p", "span", "a"]), Bn = /* @__PURE__ */ new Set([
  "font-family",
  "font-size",
  "font-weight",
  "font-style",
  "text-decoration",
  "text-align",
  "color"
]), Hn = /^(https?:\/\/|mailto:)/i;
function Wn(e) {
  if (!e) return "";
  const t = [];
  for (const n of e.split(";")) {
    const o = n.indexOf(":");
    if (o < 0) continue;
    const i = n.slice(0, o).trim().toLowerCase(), u = n.slice(o + 1).trim();
    Bn.has(i) && u && t.push(`${i}: ${u}`);
  }
  return t.join("; ");
}
function Oe(e) {
  if (e.nodeType === Node.TEXT_NODE) return e;
  if (e.nodeType !== Node.ELEMENT_NODE) return document.createTextNode("");
  const t = e, n = t.tagName.toLowerCase(), o = () => {
    const a = document.createDocumentFragment();
    for (const s of Array.from(t.childNodes)) a.appendChild(Oe(s));
    return a;
  };
  if (!On.has(n)) return o();
  if (n === "a") {
    const a = t.getAttribute("href") || "";
    if (!Hn.test(a)) return o();
  }
  const i = document.createElement(n), u = t.getAttribute("style"), c = Wn(u || "");
  if (c && i.setAttribute("style", c), n === "a") {
    i.setAttribute("href", t.getAttribute("href"));
    const a = t.getAttribute("target"), s = t.getAttribute("rel");
    a && i.setAttribute("target", a), s && i.setAttribute("rel", s);
  }
  for (const a of Array.from(t.childNodes)) i.appendChild(Oe(a));
  return i;
}
function wt(e) {
  return e.replace(/&nbsp;/g, " ").replace(/\u00A0/g, " ");
}
function Xn(e) {
  const t = wt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  n.innerHTML = t;
  const o = document.createDocumentFragment();
  for (const c of Array.from(n.content.childNodes)) o.appendChild(Oe(c));
  const i = document.createElement("div");
  return i.appendChild(o), i.innerHTML.replace(/<strong(\s|>)/gi, "<b$1").replace(/<\/strong>/gi, "</b>").replace(/<em(\s|>)/gi, "<i$1").replace(/<\/em>/gi, "</i>").replace(/<p([^>]*)><\/p>/gi, "<p$1><br></p>");
}
function Gr(e) {
  const t = wt(e);
  if (!t || !t.includes("<")) return t;
  const n = document.createElement("template");
  return n.innerHTML = t, (n.content.textContent || "").replace(/\u00A0/g, " ").replace(/[ \t]+\n/g, `
`).replace(/\n{3,}/g, `

`).trim();
}
function jr(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const Un = { text: "#52525b" }, Yn = ({ node: e, selected: t, extension: n, editor: o, view: i, getPos: u }) => {
  var f;
  const c = e.attrs.field ?? "", a = n.options, s = ((f = a.resolve) == null ? void 0 : f.call(a, c)) ?? null, l = (s == null ? void 0 : s.color) ?? Un, d = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
  return /* @__PURE__ */ r(
    _t,
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
      onMouseDown: (g) => {
        var b;
        if (g.button !== 0 || !o.isEditable) return;
        g.preventDefault(), o.isFocused || o.commands.focus();
        const y = typeof u == "function" ? u() : null;
        if (y == null) return;
        const N = i.state.doc.resolve(y), z = N.nodeAfter;
        z && $e.isSelectable(z) && i.dispatch(i.state.tr.setSelection(new $e(N))), (b = a.onTokenClick) == null || b.call(a, c, g.currentTarget.getBoundingClientRect(), y);
      },
      children: d
    }
  );
};
function Gn(e) {
  return e.replace(/<span data-type="token"[^>]*>\{\{([^{}]+)\}\}<\/span>/g, "{{$1}}");
}
function Je(e) {
  return e.replace(/\{\{([^{}]+)\}\}/g, (t, n) => `<span data-type="token" data-field="${n}">{{${n}}}</span>`);
}
const jn = jt.extend({
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
    return It(Yn);
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
    return ["span", At({ "data-type": "token" }, t), `{{${e.attrs.field ?? ""}}}`];
  },
  renderText({ node: e }) {
    return `{{${e.attrs.field ?? ""}}}`;
  }
}), Fn = 240, Kn = 280, qn = ({ props: e, highlight: t, onHighlight: n }) => {
  const o = C(null);
  return G(() => {
    var u;
    const i = (u = o.current) == null ? void 0 : u.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [t]), /* @__PURE__ */ r("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: Kn, maxHeight: Fn, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ r("div", { ref: o, children: e.items.map((i, u) => /* @__PURE__ */ w(
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
}, Vn = () => {
  let e = null;
  const t = (n) => {
    if (!e) return;
    e.props = n;
    const o = e.highlight;
    e.holder.style.display = n.items.length > 0 ? "" : "none", e.root.render(/* @__PURE__ */ r(qn, { props: n, highlight: o, onHighlight: (i) => {
      e.highlight = i, t(e.props);
    } }));
  };
  return {
    onStart(n) {
      const o = document.createElement("div");
      o.style.position = "fixed", o.style.zIndex = "9999";
      const i = Ft(o);
      e = { holder: o, root: i, unmount: null, props: n, highlight: 0 };
      const u = n.mount(o, {
        // The plugin anchors to the `@`-decoration's start; the caret sits at
        // its END, so shift the popup right by the anchor width — matches the
        // pre-TipTap popup, which anchored exactly at the caret.
        onPosition: ({ x: c, y: a, placement: s }) => {
          var f, g;
          if (!e) return;
          const l = (g = (f = e.props) == null ? void 0 : f.clientRect) == null ? void 0 : g.call(f), d = l && !s.endsWith("-end") ? l.width : 0;
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
}, Fr = { bold: !1, italic: !1, underline: !1, strike: !1, link: !1, color: "" }, Zn = Me.forwardRef(({
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
  const f = C(c);
  f.current = c;
  const g = C(a);
  g.current = a;
  const y = C(s);
  y.current = s;
  const N = C(l);
  N.current = l;
  const z = C(null), b = C(null), S = C(t);
  S.current = t;
  const M = C(o);
  M.current = o;
  const P = C(u);
  P.current = u;
  const L = C(null), A = ($) => {
    var _;
    const T = {
      bold: $.isActive("bold"),
      italic: $.isActive("italic"),
      underline: $.isActive("underline"),
      strike: $.isActive("strike"),
      link: $.isActive("link"),
      color: $.getAttributes("textStyle").color || ""
    }, E = L.current;
    E && E.bold === T.bold && E.italic === T.italic && E.underline === T.underline && E.strike === T.strike && E.link === T.link && E.color === T.color || (L.current = T, (_ = P.current) == null || _.call(P, T));
  }, x = ($) => {
    var q;
    const T = $.state.selection;
    let E = null;
    T instanceof $e && T.node.type.name === "token" ? (E = { key: T.node.attrs.field ?? "", pos: T.from }, z.current = T.from) : z.current != null && (z.current = $.state.tr.mapping.map(z.current));
    const _ = b.current, U = _ && E && _.key === E.key && _.pos === E.pos;
    !_ && !E || U || (b.current = E, (q = N.current) == null || q.call(N, E));
  }, I = ($) => {
    const T = Xn(Gn($));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(T) ? "" : T;
  }, B = Me.useMemo(() => {
    const $ = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: T }) => {
        var E;
        return ((E = g.current) == null ? void 0 : E.call(g, T)) ?? [];
      },
      command: ({ editor: T, range: E, props: _ }) => {
        T.chain().focus().insertContentAt(E, { type: "token", attrs: { field: _.field } }).run();
      },
      render: Vn
    };
    return jn.configure({
      resolve: f.current ?? null,
      suggestion: $,
      onTokenClick: (T, E, _) => {
        var U;
        z.current = _, (U = y.current) == null || U.call(y, T, E, _);
      }
    });
  }, []), v = Ot({
    immediatelyRender: !1,
    extensions: [
      Ht,
      Wt.configure({ placeholder: n }),
      Xt,
      Ut,
      Gt,
      // Links: typed/pasted URLs auto-link; anchors open in a new tab and are
      // inert while editing (openOnClick false). Stored HTML keeps the <a>
      // (sanitizer whitelists it) so print/PDF anchors stay clickable.
      Yt.configure({
        openOnClick: !1,
        autolink: !0,
        linkOnPaste: !0,
        HTMLAttributes: { target: "_blank", rel: "noreferrer" }
      }),
      B
    ],
    content: Je(e || ""),
    editable: !o,
    onUpdate: ({ editor: $ }) => {
      S.current(I($.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: $ }) => {
      A($), x($);
    }
  });
  return G(() => {
    if (!v || v.isFocused) return;
    I(v.getHTML()) !== e && (L.current = null, v.commands.setContent(Je(e || ""), { emitUpdate: !1 }), A(v));
  }, [e, v]), G(() => {
    v && v.setEditable(!o);
  }, [o, v]), G(() => {
    v && (L.current = null, A(v), x(v));
  }, [v]), vt(d, () => ({
    exec: ($, T) => {
      if (!(!v || M.current))
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
            T && v.chain().focus().setColor(T).run();
            break;
          case "unsetColor":
            v.chain().focus().unsetColor().run();
            break;
          case "link":
            T && v.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
            break;
          case "unlink":
            v.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => v == null ? void 0 : v.commands.focus(),
    insertToken: ($) => {
      !v || M.current || v.chain().focus().insertContent({ type: "token", attrs: { field: $ } }).run();
    },
    replaceToken: ($) => {
      if (!v || M.current) return;
      const T = z.current;
      T != null && v.commands.command(({ tr: E }) => {
        const _ = E.doc.nodeAt(T);
        if (!_ || _.type.name !== "token") return !1;
        E.setNodeMarkup(T, void 0, { field: $ });
        const U = E.doc.resolve(T);
        return U.nodeAfter && U.nodeAfter.type.name === "token" && E.setSelection(new $e(U)), !0;
      });
    }
  }), [v]), /* @__PURE__ */ r(Bt, { editor: v, className: `richtext-editor ${i || ""}` });
});
Zn.displayName = "RichTextEditor";
const Qn = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], Jn = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], et = ({ className: e = "w-3 h-3" }) => /* @__PURE__ */ r("span", { className: `${e} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ r("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), Kr = ({ value: e, disabled: t, onChange: n }) => {
  const [o, i] = W(!1);
  return /* @__PURE__ */ r(
    De,
    {
      open: o,
      onOpenChange: i,
      theme: "dark",
      width: "w-44",
      trigger: /* @__PURE__ */ w("button", { type: "button", disabled: t, className: `${xt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ r("span", { className: "truncate", style: { fontFamily: e || "Helvetica" }, children: e || "Helvetica" }),
        /* @__PURE__ */ r(it, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: Qn.map((u) => /* @__PURE__ */ r(tn, { onClick: () => {
        n(u), i(!1);
      }, icon: u === e ? /* @__PURE__ */ r(nt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ r("span", { style: { fontFamily: u }, children: u }) }, u))
    }
  );
}, er = ({ editorRef: e, disabled: t, active: n }) => {
  const [o, i] = W(!1), [u, c] = W(""), a = () => {
    var l;
    const s = u.trim();
    s && ((l = e.current) == null || l.exec("link", s), i(!1));
  };
  return /* @__PURE__ */ r(
    De,
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
          className: `${mt} ${n ? gt : bt}`,
          title: "Link",
          "aria-label": "Link",
          children: /* @__PURE__ */ r(Et, { className: "w-3 h-3" })
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
            className: Rn + " w-full"
          }
        ),
        /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ r("button", { onClick: a, className: _e, disabled: !u.trim(), children: "Apply" }),
          /* @__PURE__ */ r(
            "button",
            {
              onClick: () => {
                var s;
                (s = e.current) == null || s.exec("unlink"), i(!1);
              },
              className: _e,
              children: "Remove"
            }
          )
        ] })
      ] })
    }
  );
}, qr = ({ editorRef: e, disabled: t, active: n, lockedFormatting: o, trailing: i }) => {
  const [u, c] = W(!1), a = (d, f) => {
    var g;
    return (g = e.current) == null ? void 0 : g.exec(d, f);
  }, s = (d) => `${mt} ${d ? gt : bt}`, l = (d) => !!(o != null && o[d]);
  return /* @__PURE__ */ w("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ r(ge, { content: (o == null ? void 0 : o.bold) || "Bold", children: /* @__PURE__ */ r("button", { "aria-label": "Bold", disabled: t || l("bold"), onMouseDown: (d) => d.preventDefault(), onClick: () => a("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || l("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ r(ge, { content: (o == null ? void 0 : o.italic) || "Italic", children: /* @__PURE__ */ r("button", { "aria-label": "Italic", disabled: t || l("italic"), onMouseDown: (d) => d.preventDefault(), onClick: () => a("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || l("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ r(ge, { content: "Underline", children: /* @__PURE__ */ r("button", { "aria-label": "Underline", disabled: t, onMouseDown: (d) => d.preventDefault(), onClick: () => a("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ r(Ct, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r(ge, { content: "Strikethrough", children: /* @__PURE__ */ r("button", { "aria-label": "Strikethrough", disabled: t, onMouseDown: (d) => d.preventDefault(), onClick: () => a("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ r(Dt, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ r("div", { className: Ne }),
    /* @__PURE__ */ r(er, { editorRef: e, disabled: t, active: (n == null ? void 0 : n.link) ?? !1 }),
    /* @__PURE__ */ r("div", { className: Ne }),
    /* @__PURE__ */ r(
      De,
      {
        open: u,
        onOpenChange: c,
        theme: "dark",
        width: "w-36",
        trigger: /* @__PURE__ */ w("button", { type: "button", disabled: t, className: `${xt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ r("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ r(et, {}),
          /* @__PURE__ */ r(it, { className: "w-3 h-3 text-zinc-500" })
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
              children: /* @__PURE__ */ r(et, { className: "w-3.5 h-3.5" })
            }
          ),
          Jn.map((d) => /* @__PURE__ */ r(
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
      /* @__PURE__ */ r("div", { className: Ne }),
      i
    ] })
  ] });
};
export {
  Lr as Button,
  sn as Checkbox,
  Ar as Checklist,
  Ur as ChromeHeader,
  Xr as ContentRow,
  vr as ContextMenu,
  Nr as ContextMenuDivider,
  kr as ContextMenuItem,
  Rr as DatePicker,
  Tr as DialogProvider,
  tn as DropdownItem,
  De as DropdownMenu,
  yr as DropdownSubmenu,
  lt as DropdownThemeContext,
  Qn as FONTS,
  _r as FloatingChrome,
  Kr as FontMenu,
  qr as FormatToolbar,
  k as IS_COARSE,
  Vt as IS_TOUCH_CAPABLE,
  wr as ItemManagerDropdown,
  Er as LongPressMenuProvider,
  zr as Modal,
  Cr as ModalFooter,
  Kt as PopoutWindowContext,
  Fr as RICH_TEXT_STATE_IDLE,
  Ir as RadioList,
  Zn as RichTextEditor,
  Wr as SectionHeader,
  Hr as Seg,
  Yr as StructureControls,
  dt as SubmenuContext,
  _e as TB_BTN,
  ye as TB_BTN_ICON,
  Ln as TB_DANGER,
  Ne as TB_DIVIDER,
  Rn as TB_INPUT,
  Br as TB_NUM,
  xt as TB_PICKER,
  Or as TB_ROW_LABEL,
  An as TB_SEG,
  mt as TB_TOGGLE,
  bt as TB_TOGGLE_OFF,
  gt as TB_TOGGLE_ON,
  jn as Token,
  Yn as TokenChipView,
  ve as ToolButton,
  ge as Tooltip,
  jr as escapeHtml,
  ut as getDropdownClasses,
  br as getHardwareKeyboard,
  gr as getLastPointerType,
  Cn as isInteractiveElement,
  Re as isTouchLike,
  wt as normalizeSpaces,
  Je as preprocessTokenHtml,
  Xn as sanitizeRichText,
  Gr as stripRichText,
  Gn as stripTokenWrappers,
  qt as useCurrentDocument,
  ce as useCurrentWindow,
  $r as useDialog,
  at as useDropdownTheme,
  Mr as useFixedPosition,
  xr as useHardwareKeyboard,
  Zt as useLastPointerType,
  Dr as useLongPressOptOut,
  We as usePopoutWindow,
  pe as usePortalTarget,
  Sr as useSmartPosition,
  Pr as useTouchMode
};
