"use client";
import { jsxs as v, jsx as o, Fragment as ce } from "react/jsx-runtime";
import ye, { createContext as Me, useContext as Re, useState as U, useEffect as F, useRef as $, useCallback as W, useLayoutEffect as ne, useMemo as Je, useImperativeHandle as Mt } from "react";
import * as X from "@radix-ui/react-dropdown-menu";
import { Check as dt, X as Xe, Pencil as Rt, Copy as ft, Trash2 as Oe, RotateCcw as pt, Plus as St, ChevronRight as _e, ChevronLeft as Pt, ArrowUp as At, ArrowDown as Lt, ChevronDown as ht, Underline as Ot, Strikethrough as _t, Link as It } from "lucide-react";
import * as Q from "@radix-ui/react-dialog";
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
function le() {
  return Ye() ?? (typeof window < "u" ? window : null);
}
const ve = typeof window < "u", T = ve && window.matchMedia("(pointer: coarse)").matches, sn = ve && (window.matchMedia("(any-pointer: coarse)").matches || navigator.maxTouchPoints > 0);
function Ie(t) {
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
  const [, t] = U(0), e = $(ue);
  return F(() => {
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
  let n = null, r = null;
  const i = "__penClick", a = /* @__PURE__ */ new Set(["color", "file", "date", "datetime-local", "month", "time", "week"]);
  window.addEventListener("pointerdown", (c) => {
    c.pointerType !== "pen" || c.button !== 0 || (n = { x: c.clientX, y: c.clientY });
  }, !0), window.addEventListener("pointerup", (c) => {
    if (c.pointerType !== "pen") return;
    const u = n;
    if (n = null, !u || Math.hypot(c.clientX - u.x, c.clientY - u.y) > 8) return;
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
  const [, t] = U(0);
  return F(() => {
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
  const e = $(null), [n, r] = U(!1), i = $(null), a = W((f) => {
    if (t.ref && (t.ref.current = f), f) {
      e.current = f;
      const b = f.getBoundingClientRect();
      (b.width > 0 || b.height > 0) && (i.current = { left: b.left, top: b.top, width: b.width, height: b.height }), r(!0);
      return;
    }
    const x = e.current;
    e.current = null, r(!1), !(!x || !t.cloneOnUnmount || !c.current) && x.style.visibility !== "hidden" && Pe(d.current) && dn(x, s.current, i.current);
  }, []), c = $(t.visible);
  c.current = t.visible;
  const u = $(t.visible), s = $(t.anchor ?? null);
  s.current = t.anchor ?? null;
  const l = $(t.onClosed);
  l.current = t.onClosed;
  const d = $(t.morph !== !1);
  d.current = t.morph !== !1;
  const p = $(0);
  return ne(() => {
    if (!n || !c.current || !Pe(d.current)) return;
    const f = e.current;
    f && an(p, f, s.current);
  }, [n, t.visible]), ne(() => {
    var b;
    const f = u.current;
    if (u.current = t.visible, t.visible || !f) return;
    const x = e.current;
    if (!x || !Pe(d.current)) {
      (b = l.current) == null || b.call(l);
      return;
    }
    un(p, x, s.current, () => {
      var N;
      return (N = l.current) == null ? void 0 : N.call(l);
    });
  }, [t.visible]), a;
}
const gt = Me("dark"), xt = () => Re(gt), fn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", tt = T ? "px-3 pt-3 pb-2" : "px-3 pt-2 pb-1", pn = T ? "text-xs" : "text-[10px]";
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
  children: u,
  morph: s = !0
}) {
  const [l, d] = U(null), p = fe(), f = $(null), x = $(t);
  x.current = t;
  const [b, N] = U(t);
  F(() => {
    t ? N(!0) : d(null);
  }, [t]);
  const h = W(() => {
    const S = f.current;
    if (!S) return null;
    const B = S.getBoundingClientRect();
    return { left: B.left, top: B.top, width: B.width, height: B.height };
  }, []), M = Ve({
    visible: t,
    morph: s,
    anchor: h,
    onClosed: () => N(!1)
  }), A = W((S) => {
    !S && !x.current || (n ? n(S) : S || e == null || e());
  }, [n, e]), D = ye.isValidElement(r) ? ye.cloneElement(r, {
    ref: (S) => {
      f.current = S;
    }
  }) : r;
  return /* @__PURE__ */ v(X.Root, { open: t || b, onOpenChange: A, modal: !1, children: [
    /* @__PURE__ */ o(X.Trigger, { asChild: !0, children: D }),
    /* @__PURE__ */ o(X.Portal, { container: p ?? void 0, children: /* @__PURE__ */ o(gt.Provider, { value: c, children: /* @__PURE__ */ o(wt.Provider, { value: { activeSub: l, setActiveSub: d, morph: s }, children: /* @__PURE__ */ o(
      X.Content,
      {
        ref: M,
        "data-theme": c,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${a || ""}`,
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
  activeId: r,
  onSelect: i,
  onRename: a,
  onDuplicate: c,
  onDelete: u,
  onCreate: s,
  onImport: l,
  onExport: d,
  onReset: p,
  onTrash: f,
  closeOnSelect: x,
  readOnly: b = !1,
  theme: N,
  align: h,
  label: M,
  header: A,
  itemLabel: D,
  trigger: R,
  minItems: S = 1,
  itemRender: B,
  morph: j = !0
}) {
  const g = yt(), [w, E] = U(null), [z, P] = U(""), H = $(null), K = $(null);
  F(() => {
    t && requestAnimationFrame(() => {
      var C, I;
      (I = (C = K.current) == null ? void 0 : C.querySelector('[data-active="1"]')) == null || I.scrollIntoView({ block: "nearest" });
    });
  }, [t]), F(() => {
    if (w) {
      requestAnimationFrame(() => {
        var I, q;
        (I = H.current) == null || I.focus(), (q = H.current) == null || q.select();
      });
      const C = n.find((I) => I.id === w);
      C && !z && P(C.name);
    }
  }, [w]), F(() => {
    if (w) {
      const C = n.find((I) => I.id === w);
      C && !z && P(C.name);
    }
  }, [w, n]);
  const G = (C, I) => {
    E(C), P(I);
  }, se = () => {
    w && z.trim() && a(w, z.trim()), E(null);
  }, k = () => {
    E(null);
  }, y = D || A.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ v(Se, { open: t, onOpenChange: (C) => {
    C ? (E(null), P("")) : (w && z.trim() && a(w, z.trim()), E(null), P("")), (!C || !b) && e(C);
  }, width: "w-80", theme: N, align: h, trigger: R, morph: j, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${g.headerText}`, children: A }),
    /* @__PURE__ */ o("div", { ref: K, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((C) => {
      const I = C.id === r, q = w === C.id;
      return /* @__PURE__ */ o("div", { "data-active": I ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${I ? g.rowActiveBg : g.rowHoverBg} ${w && !q ? "opacity-40 pointer-events-none" : ""}`, children: q ? /* @__PURE__ */ v(ce, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
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
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${g.editConfirm}`,
            onSelect: (_) => {
              _.preventDefault(), se();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(dt, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${g.editCancel}`,
            onSelect: (_) => {
              _.preventDefault(), k();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Xe, { className: g.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ v(ce, { children: [
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `flex-1 min-w-0 ${g.itemPad} rounded outline-none cursor-pointer flex items-center ${g.rowText} ${I ? "" : g.rowTextHover}`,
            onSelect: x ? () => {
              i(C.id);
            } : (_) => {
              _.preventDefault(), i(C.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${I ? g.rowActiveText : ""}`, children: B ? B(C) : C.name })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${I ? g.btnActive : g.btnBase}`,
            onSelect: (_) => {
              _.preventDefault(), G(C.id, C.name);
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: /* @__PURE__ */ o(Rt, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${I ? g.btnActive : g.btnBase}`,
            onSelect: (_) => {
              _.preventDefault();
              const te = c(C.id);
              te && G(te, `${C.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: /* @__PURE__ */ o(ft, { className: g.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          X.Item,
          {
            className: `shrink-0 ${g.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= S ? g.btnDisabled : I ? g.btnDangerActive : g.btnDanger}`,
            onSelect: (_) => {
              _.preventDefault(), u(C.id);
            },
            onTouchStart: () => {
            },
            disabled: b || n.length <= S,
            children: /* @__PURE__ */ o(Oe, { className: g.btnIcon })
          }
        )
      ] }) }, C.id);
    }) }),
    /* @__PURE__ */ v("div", { className: `shrink-0 ${w ? "opacity-40 pointer-events-none" : ""}`, children: [
      p && /* @__PURE__ */ v(ce, { children: [
        /* @__PURE__ */ o(X.Separator, { className: g.separator }),
        /* @__PURE__ */ v(
          X.Item,
          {
            className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
            onSelect: (C) => {
              C.preventDefault(), p();
            },
            onTouchStart: () => {
            },
            disabled: b,
            children: [
              /* @__PURE__ */ o(pt, { className: `${g.btnIcon} ${g.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || l || d || f) && /* @__PURE__ */ o(X.Separator, { className: g.separator }),
      s && /* @__PURE__ */ v(
        X.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (C) => {
            C.preventDefault();
            const I = s();
            I && G(I, "");
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ o(St, { className: `${g.btnIcon} ${g.icon}` }),
            "New ",
            y
          ]
        }
      ),
      l && /* @__PURE__ */ v(
        X.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (C) => {
            C.preventDefault(), l();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ v("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
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
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (C) => {
            C.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ v("svg", { className: `${g.btnIcon} ${g.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      f && /* @__PURE__ */ v(
        X.Item,
        {
          className: `w-full text-left ${g.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${g.itemDefault}`,
          onSelect: (C) => {
            C.preventDefault(), f();
          },
          onTouchStart: () => {
          },
          disabled: b,
          children: [
            /* @__PURE__ */ o(Oe, { className: `${g.btnIcon} ${g.icon}` }),
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
  variant: r = "default",
  className: i = "",
  children: a,
  keepOpen: c = !1,
  rightAction: u
}) {
  xt();
  const s = yt(), l = $(!1), d = r === "danger" ? s.itemDanger : s.itemDefault;
  return /* @__PURE__ */ v(
    X.Item,
    {
      className: `w-full text-left ${hn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${d} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (p) => {
        if (l.current) {
          l.current = !1;
          return;
        }
        c && p.preventDefault(), t();
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        e && /* @__PURE__ */ o("span", { className: `${s.icon} shrink-0`, children: e }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        u && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${s.rightAction}`,
            title: u.title,
            onPointerDown: (p) => {
              p.stopPropagation(), p.preventDefault(), l.current = !0, u.onClick();
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
const bn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Lr({ id: t, label: e, icon: n, width: r, side: i = "right", children: a }) {
  const { activeSub: c, setActiveSub: u, morph: s } = Re(wt), l = c === t, d = xt(), p = fe(), f = $(null), [x, b] = U(l);
  F(() => {
    l && b(!0);
  }, [l]);
  const N = W(() => {
    const D = f.current;
    if (!D) return null;
    const R = D.getBoundingClientRect();
    return { left: R.left, top: R.top, width: R.width, height: R.height };
  }, []), h = Ve({
    visible: l,
    morph: s,
    anchor: N,
    onClosed: () => b(!1)
  }), M = `w-full text-left ${bn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item`, A = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"}`;
  return /* @__PURE__ */ v(X.Sub, { open: l || x, onOpenChange: (D) => u(D ? t : null), children: [
    /* @__PURE__ */ v(
      X.SubTrigger,
      {
        ref: f,
        className: M,
        onTouchStart: () => {
        },
        onPointerDown: (D) => {
          D.pointerType === "pen" && (D.preventDefault(), u(l ? null : t));
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
    /* @__PURE__ */ o(X.Portal, { container: p ?? void 0, children: /* @__PURE__ */ o(
      X.SubContent,
      {
        ref: h,
        "data-theme": d,
        className: A,
        sideOffset: 8,
        alignOffset: -4,
        collisionPadding: 8,
        children: a
      }
    ) })
  ] });
}
const be = 8, gn = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", xn = T ? "text-sm" : "text-xs", Or = ({ open: t, x: e, y: n, onClose: r, children: i, containerRef: a, morph: c = !0 }) => {
  const u = ye.useRef(null), s = le(), [l, d] = U(t);
  F(() => {
    t && d(!0);
  }, [t]);
  const p = W(() => ({ left: e, top: n, width: 0, height: 0 }), [e, n]), f = Ve({
    visible: t,
    morph: c,
    anchor: p,
    onClosed: () => d(!1)
  }), x = W((b) => {
    u.current = b, f(b);
  }, [f]);
  return F(() => {
    if (!t || !s) return;
    const b = (h) => {
      u.current && !u.current.contains(h.target) && r();
    }, N = (h) => {
      h.key === "Escape" && r();
    };
    return s.addEventListener("pointerdown", b, !0), s.addEventListener("keydown", N, !0), () => {
      s.removeEventListener("pointerdown", b, !0), s.removeEventListener("keydown", N, !0);
    };
  }, [t, r, s]), ne(() => {
    var B;
    if (!t || !u.current) return;
    const b = u.current.getBoundingClientRect(), N = (B = a == null ? void 0 : a.current) == null ? void 0 : B.getBoundingClientRect(), h = N ? N.right : (s == null ? void 0 : s.innerWidth) ?? 0, M = N ? N.bottom : (s == null ? void 0 : s.innerHeight) ?? 0, A = N ? N.left : 0, D = N ? N.top : 0;
    let R = Math.max(D + be, n), S = Math.max(A + be, e);
    S + b.width > h && (S = h - b.width - be), R + b.height > M && (R = Math.max(D + be, M - b.height - be)), u.current.style.top = `${R}px`, u.current.style.left = `${S}px`;
  }, [t, e, n, a]), !t && !l ? null : /* @__PURE__ */ o(
    "div",
    {
      ref: x,
      "data-theme": "light",
      className: `fixed ui-menu rounded-lg shadow-xl p-1 z-[9999] ${xn} min-w-[180px] max-h-[85vh] overflow-y-auto scrollbar-custom`,
      style: { top: n, left: e, touchAction: "manipulation" },
      children: i
    }
  );
}, _r = ({ onClick: t, variant: e = "default", icon: n, disabled: r = !1, children: i }) => /* @__PURE__ */ v(
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
), Ir = () => /* @__PURE__ */ o("div", { className: "ui-sep my-1" });
function yn({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: a = "", labelClassName: c = "", theme: u, variant: s = "pill", tone: l = "accent", block: d = !1 }) {
  const p = s !== "plain", f = T ? "w-5 h-5" : "w-4 h-4", x = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", b = T ? "w-3.5 h-3.5" : "w-3 h-3", N = T ? "text-sm" : "text-xs";
  return /* @__PURE__ */ v(
    "label",
    {
      className: `ui-checkbox ${p ? `ui-checkbox-pill ${T ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${l === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${a}`,
      style: { display: d ? "flex" : "inline-flex", alignItems: "center", gap: T ? 10 : 8 },
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
        p ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: t ? /* @__PURE__ */ v("svg", { viewBox: "0 0 16 16", className: f, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: f, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${x}`, "aria-hidden": !0, children: t && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: b, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${N} ${c}`, children: r })
      ]
    }
  );
}
const wn = T ? "p-6" : "p-5", vn = T ? "text-base" : "text-sm", kn = T ? "w-5 h-5" : "w-4 h-4", Nn = T ? "text-sm" : "text-xs", $n = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", nt = T ? "px-4 py-2.5 text-sm" : "px-3 py-1.5 text-xs", rt = T ? "left-3 right-3 h-[10px]" : "left-2 right-2 h-[6px]", ot = T ? "top-3 bottom-3 w-[10px]" : "top-2 bottom-2 w-[6px]", Ne = T ? "w-[14px] h-[14px]" : "w-[10px] h-[10px]", vt = Me(null);
function Br() {
  const t = Re(vt);
  if (!t) throw new Error("useDialog must be used within DialogProvider");
  return t;
}
function Hr({ children: t }) {
  const [e, n] = U(null), [r, i] = U(!1), a = fe(), c = le(), u = $(c);
  u.current = c;
  const s = $(null), l = $(null), [d, p] = U(null), f = $(null), [x, b] = U(null), N = $(null), h = f.current !== null;
  N.current, F(() => {
    e || (p(null), b(null));
  }, [e]);
  const M = W(() => {
    const k = l.current;
    if (!k) return null;
    const y = k.getBoundingClientRect();
    return { left: y.left, top: y.top, width: y.width, height: y.height };
  }, []), A = W((k) => {
    if (k.target.closest("button")) return;
    const y = M();
    y && (p(y), b({ w: y.width, h: y.height }), f.current = { startX: k.clientX, startY: k.clientY, posX: y.left, posY: y.top }, k.target.setPointerCapture(k.pointerId));
  }, [M]), D = W((k) => {
    const y = f.current;
    y && (k.preventDefault(), p({ left: y.posX + k.clientX - y.startX, top: y.posY + k.clientY - y.startY }));
  }, []), R = W(() => {
    f.current = null;
  }, []), S = W((k) => (y) => {
    y.stopPropagation();
    const C = M();
    C && (p(C), b({ w: C.width, h: C.height }), N.current = { dir: k, startX: y.clientX, startY: y.clientY, startL: C.left, startT: C.top, startW: C.width, startH: C.height }, y.target.setPointerCapture(y.pointerId));
  }, [M]), B = 200, j = 100, g = 32, w = W((k) => {
    const y = N.current;
    if (!y) return;
    k.preventDefault();
    const C = k.clientX - y.startX, I = k.clientY - y.startY;
    let q = y.startW, _ = y.startH, te = y.startL, ae = y.startT;
    y.dir.includes("e") && (q = y.startW + C), y.dir.includes("w") && (q = y.startW - C, te = y.startL + C), y.dir.includes("s") && (_ = y.startH + I), y.dir.includes("n") && (_ = y.startH - I, ae = y.startT + I);
    const pe = u.current;
    if (!pe) return;
    const he = pe.innerWidth, ke = pe.innerHeight;
    q = Math.max(B, Math.min(q, he - g * 2)), _ = Math.max(j, Math.min(_, ke - g * 2)), y.dir.includes("w") && (te = Math.max(g, Math.min(te, he - q - g))), y.dir.includes("n") && (ae = Math.max(g, Math.min(ae, ke - _ - g))), b({ w: q, h: _ }), p({ left: te, top: ae });
  }, []), E = W(() => {
    N.current = null;
  }, []), z = W(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), n(null));
  }, [e]), P = W((k) => {
    if (k.suppressKey) {
      const y = localStorage.getItem(k.suppressKey);
      if (y && Date.now() < parseInt(y, 10))
        return Promise.resolve(!0);
    }
    return new Promise((y) => {
      i(!1), n({ kind: "confirm", options: k, resolve: y });
    });
  }, []), H = W((k) => new Promise((y) => {
    n({ kind: "prompt", options: k, resolve: y });
  }), []), K = W((k) => new Promise((y) => {
    n({ kind: "alert", options: k, resolve: y });
  }), []);
  F(() => {
    if (e) {
      const k = setTimeout(() => {
        var y;
        return (y = s.current) == null ? void 0 : y.focus();
      }, 50);
      return () => clearTimeout(k);
    }
  }, [e]);
  const G = () => {
    var k, y;
    !e || e.kind !== "prompt" || (e.resolve(((y = (k = s.current) == null ? void 0 : k.value) == null ? void 0 : y.trim()) || null), n(null));
  }, se = e !== null;
  return /* @__PURE__ */ v(vt.Provider, { value: { confirm: P, prompt: H, alert: K }, children: [
    t,
    /* @__PURE__ */ o(Q.Root, { open: se, onOpenChange: (k) => {
      k || z();
    }, modal: !0, children: /* @__PURE__ */ v(Q.Portal, { container: a ?? void 0, children: [
      /* @__PURE__ */ o(Q.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ v(
        Q.Content,
        {
          ref: l,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${wn} space-y-4 focus:outline-none ${d || x ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${x ? "" : "w-full max-w-sm"}`,
          style: { ...d ? { left: d.left, top: d.top } : {}, ...x ? { width: x.w, height: x.h } : {} },
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
            /* @__PURE__ */ v(
              "div",
              {
                className: `flex items-center justify-between ${h ? "cursor-grabbing" : "cursor-grab"}`,
                onPointerDown: A,
                onPointerMove: D,
                onPointerUp: R,
                children: [
                  /* @__PURE__ */ o(Q.Title, { className: `${vn} ui-dialog-title`, children: e == null ? void 0 : e.options.title }),
                  /* @__PURE__ */ o(Q.Close, { className: "ui-icon-btn p-0.5 rounded", children: /* @__PURE__ */ o(Xe, { className: kn }) })
                ]
              }
            ),
            (e == null ? void 0 : e.options.message) && /* @__PURE__ */ o(Q.Description, { className: `${Nn} ui-dialog-text`, children: e.options.message }),
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
                  k.key === "Enter" && G();
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
                      } else e.kind === "prompt" ? G() : (e.resolve(), n(null));
                  },
                  className: `${nt} ui-btn ${(e == null ? void 0 : e.kind) === "confirm" && e.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (e == null ? void 0 : e.kind) === "alert" ? "OK" : (e == null ? void 0 : e.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ v("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ o("div", { className: `absolute ${rt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: S("n"), onPointerMove: w, onPointerUp: E }),
              /* @__PURE__ */ o("div", { className: `absolute ${rt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: S("s"), onPointerMove: w, onPointerUp: E }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: S("w"), onPointerMove: w, onPointerUp: E }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: S("e"), onPointerMove: w, onPointerUp: E }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 left-0 ${Ne} cursor-nw-resize pointer-events-auto`, onPointerDown: S("nw"), onPointerMove: w, onPointerUp: E }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 right-0 ${Ne} cursor-ne-resize pointer-events-auto`, onPointerDown: S("ne"), onPointerMove: w, onPointerUp: E }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 left-0 ${Ne} cursor-sw-resize pointer-events-auto`, onPointerDown: S("sw"), onPointerMove: w, onPointerUp: E }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 right-0 ${Ne} cursor-se-resize pointer-events-auto`, onPointerDown: S("se"), onPointerMove: w, onPointerUp: E })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
const ie = 32, kt = "[data-modal-stack]", re = 220, we = "cubic-bezier(0.32, 0.72, 0, 1)", Te = 0.94;
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
      t.current === i && (e.style.transition = `transform ${re}ms ${we}, opacity 180ms ease`, e.style.transform = "none", window.setTimeout(() => {
        t.current === i && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", r());
      }, re + 80));
    });
  });
}
function Cn(t, e, n) {
  const r = ++t.current;
  e.style.transition = "none", e.style.transformOrigin = "center", e.style.transform = `scale(${Te})`, e.getBoundingClientRect(), requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.current === r && (e.style.transition = `transform ${re}ms ${we}`, e.style.transform = "none", window.setTimeout(() => {
        t.current === r && (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", n());
      }, re + 60));
    });
  });
}
function st(t, e, n) {
  const r = ++t.current, i = e.getBoundingClientRect(), a = 1 - Te, c = { left: i.left + i.width * a / 2, top: i.top + i.height * a / 2, width: i.width * Te, height: i.height * Te };
  e.style.transition = `transform ${re}ms ${we}, opacity 170ms ease`, e.style.transformOrigin = "0 0", e.style.transform = Nt(i, c), e.style.opacity = "0", window.setTimeout(() => {
    t.current === r && (e.style.visibility = "hidden", n(), requestAnimationFrame(() => {
      t.current !== r || e.isConnected || (e.style.transition = "", e.style.transform = "", e.style.transformOrigin = "", e.style.opacity = "", e.style.visibility = "");
    }));
  }, re + 60);
}
function Ae(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(kt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
function Le(t) {
  const e = t.parentNode;
  return e ? Array.from(e.children).filter((n) => n instanceof HTMLElement && n !== t && n.matches(kt) && (n.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_PRECEDING) !== 0).filter((n) => n.getAttribute("data-state") === "open") : [];
}
const Tn = T ? "px-6" : "px-5", zn = T ? "py-3" : "py-2.5", En = T ? "text-sm" : "text-xs", Dn = T ? "w-4 h-4" : "w-3.5 h-3.5", Mn = T ? "text-xs" : "text-[10px]", Rn = T ? "w-3.5 h-3.5" : "w-3 h-3", Sn = T ? "px-2.5 py-1.5" : "px-2 py-1", Pn = T ? "px-6" : "px-5", An = T ? "py-3" : "py-2";
function Wr({
  open: t,
  onClose: e,
  title: n,
  icon: r,
  width: i,
  footer: a,
  children: c,
  onReset: u,
  morph: s = !0
}) {
  const l = $(null), d = $(null), p = $(null), [f, x] = U(!1), b = W((m) => {
    l.current = m, x(m !== null);
  }, []), N = fe(), h = le(), M = $(h);
  M.current = h;
  const [A, D] = U(null), R = $(null), S = $(!1), B = $(!1), [j, g] = U(!1), w = $(0), E = $(!1), z = $(s);
  z.current = s;
  const P = $(!1), H = $(!1), K = () => {
    H.current = !0, g(!0);
  }, G = () => {
    H.current = !1, g(!1);
  };
  F(() => {
    t || (D(null), B.current = !1, S.current = !1);
  }, [t]), ne(() => {
    if (!t || B.current || !f || !l.current) return;
    B.current = !0;
    const m = l.current.getBoundingClientRect();
    D({ left: m.left, top: m.top });
  }, [t, f]), ne(() => {
    if (!t || !f || !s || ge() || !l.current) return;
    const m = l.current, L = Ae(m), O = L[L.length - 1];
    K(), O ? it(w, m, O.getBoundingClientRect(), G) : Cn(w, m, G);
  }, [t, f]);
  const se = W(() => {
    if (E.current) return;
    const m = l.current, L = !!m && Ae(m).length > 0;
    if (!m || !s || ge() || L) {
      e();
      return;
    }
    E.current = !0, P.current = !0, K(), st(w, m, () => {
      E.current = !1, G(), e();
    });
  }, [s, e]);
  ne(() => () => {
    const m = l.current;
    if (!m || P.current || !z.current || ge() || Ae(m).length > 0) return;
    const L = m.ownerDocument, O = m.cloneNode(!0);
    O.removeAttribute("data-modal-stack"), O.removeAttribute("data-state"), O.removeAttribute("role"), O.removeAttribute("data-aria-hidden"), O.removeAttribute("tabindex"), O.setAttribute("aria-hidden", "true"), O.style.pointerEvents = "none", L.body.appendChild(O), st({ current: 0 }, O, () => {
      O.isConnected && O.remove();
    });
  }, []), F(() => {
    if (!t || !f || !s || !l.current) return;
    const m = l.current, L = m.parentNode;
    if (!L) return;
    let O = 0, V = null, Y = !1;
    const J = () => {
      O = 0;
      const Z = Le(m);
      Z.length > 0 ? (V = Z[Z.length - 1].getBoundingClientRect(), Y = !0, O = requestAnimationFrame(J)) : Y && (Y = !1, V && !ge() && (K(), it(w, m, V, G)), V = null);
    }, oe = new MutationObserver(() => {
      !O && Le(m).length > 0 && (O = requestAnimationFrame(J));
    });
    return oe.observe(L, { childList: !0 }), () => {
      oe.disconnect(), O && cancelAnimationFrame(O);
    };
  }, [t, f]), F(() => {
    if (!f || !s || ge() || !l.current) return;
    const m = l.current;
    let L = Math.round(m.getBoundingClientRect().height), O = !1;
    const V = new ResizeObserver(() => {
      var Qe;
      if (!m.isConnected) return;
      const Y = Math.round(m.getBoundingClientRect().height);
      if (!O) {
        O = !0, L = Y;
        return;
      }
      if (Math.abs(Y - L) < 1) return;
      if (R.current || E.current || Le(m).length > 0) {
        L = Y;
        return;
      }
      if (H.current) return;
      const J = L;
      L = Y, K();
      const oe = m.getBoundingClientRect(), Z = !S.current, me = ((Qe = M.current) == null ? void 0 : Qe.innerHeight) ?? 0, Dt = Z ? (me - J) / 2 : oe.top, Ze = Z ? (me - Y) / 2 : oe.top;
      m.style.transition = "none", m.style.height = `${J}px`, Z && (m.style.top = `${Dt}px`), d.current && (d.current.style.overflow = "hidden"), m.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          m.style.height === `${J}px` && (m.style.transition = `height ${re}ms ${we}${Z ? `, top ${re}ms ${we}` : ""}`, m.style.height = `${Y}px`, Z && (m.style.top = `${Ze}px`), window.setTimeout(() => {
            m.style.height === `${Y}px` && (m.style.transition = "", m.style.height = "", d.current && (d.current.style.overflow = ""), Z && D({ left: oe.left, top: Ze }), G());
          }, re + 60));
        });
      });
    });
    return V.observe(m), () => V.disconnect();
  }, [f]);
  const k = W(() => {
    const m = l.current;
    if (!m) return null;
    const L = m.getBoundingClientRect();
    return { left: L.left, top: L.top, width: L.width, height: L.height };
  }, []), y = W((m, L) => {
    var Z, me;
    const O = ((Z = M.current) == null ? void 0 : Z.innerWidth) ?? 0, V = ((me = M.current) == null ? void 0 : me.innerHeight) ?? 0, Y = k(), J = Y ? Y.width : Math.min(O - ie * 2, 576), oe = Y ? Y.height : Math.min(V - ie * 2, 400);
    return {
      left: Math.max(ie, Math.min(m, O - J - ie)),
      top: Math.max(ie, Math.min(L, V - oe - ie))
    };
  }, [k]), C = W((m) => {
    if (m.target.closest("button")) return;
    S.current = !0;
    const L = k();
    L && (D(y(L.left, L.top)), R.current = { startX: m.clientX, startY: m.clientY, posX: L.left, posY: L.top }, m.target.setPointerCapture(m.pointerId));
  }, [k, y]), I = W((m) => {
    const L = R.current;
    L && (m.preventDefault(), D(y(L.posX + m.clientX - L.startX, L.posY + m.clientY - L.startY)));
  }, [y]), q = W(() => {
    R.current = null;
  }, []), _ = R.current !== null, te = A !== null, ae = te ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, he = {
    ...te ? { left: A.left, top: A.top } : {},
    width: `min(100%, calc(100vw - ${ie * 2}px))`,
    maxHeight: `calc(100vh - ${ie * 2}px)`
  }, ke = W((m) => {
    if (m.key !== "Enter" || m.shiftKey || m.metaKey || m.ctrlKey || m.altKey || m.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const O = p.current;
    if (!O) return;
    const V = Array.from(O.querySelectorAll("button[data-modal-confirm]")), Y = V.length > 0 ? V : Array.from(O.querySelectorAll("button")), J = Y[Y.length - 1];
    !J || J.disabled || (m.preventDefault(), J.click());
  }, []);
  return /* @__PURE__ */ o(Q.Root, { open: t, onOpenChange: (m) => {
    m || se();
  }, children: /* @__PURE__ */ v(Q.Portal, { container: N ?? void 0, children: [
    /* @__PURE__ */ o(
      Q.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (m) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (m.preventDefault(), se());
        }
      }
    ),
    /* @__PURE__ */ v(
      Q.Content,
      {
        ref: b,
        onKeyDown: ke,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ae} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(he).length > 0 ? he : {} },
        children: [
          /* @__PURE__ */ v(
            "div",
            {
              className: `flex items-center justify-between ${Tn} ${zn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${_ ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (m) => {
                j || C(m);
              },
              onPointerMove: I,
              onPointerUp: q,
              children: [
                /* @__PURE__ */ v("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(Q.Title, { className: `${En} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ v("button", { onClick: u, className: `flex items-center gap-1 ${Mn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Sn} shrink-0`, children: [
                    /* @__PURE__ */ o(pt, { className: Rn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ o(Q.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(Xe, { className: Dn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: d, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          a && /* @__PURE__ */ o("div", { ref: p, className: "shrink-0", children: a })
        ]
      }
    )
  ] }) });
}
function Ur({ children: t }) {
  return /* @__PURE__ */ o("div", { className: `flex items-center justify-end gap-3 ${Pn} ${An} border-t border-zinc-800 bg-zinc-950`, children: t });
}
const Ln = 500, On = 250, _n = 5, ee = 88, ct = 4;
function In(t, e) {
  const n = t.querySelectorAll("circle")[1], r = 2 * Math.PI * 40;
  n.style.strokeDasharray = String(r), n.style.strokeDashoffset = String(r);
  const i = performance.now(), a = (c) => {
    const u = c - i, s = Math.min(u / e, 1);
    n.style.strokeDashoffset = String(r * (1 - s)), s < 1 && requestAnimationFrame(a);
  };
  requestAnimationFrame(a);
}
function Bn({ x: t, y: e, ms: n }) {
  const r = $(null), i = fe();
  return F(() => {
    r.current && In(r.current, n);
  }, [n]), Fe(
    /* @__PURE__ */ o(
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
        children: /* @__PURE__ */ v("svg", { ref: r, width: ee, height: ee, viewBox: `0 0 ${ee} ${ee}`, children: [
          /* @__PURE__ */ o(
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
          /* @__PURE__ */ o(
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
function Fr({
  children: t,
  showRing: e = !0,
  longPressMs: n = Ln,
  targetSelector: r = "[data-context-menu]",
  shouldStartLongPress: i,
  onLongPress: a
}) {
  const [c, u] = U(null), s = on(), l = $(null), d = $(null), p = $({ x: 0, y: 0, target: null }), f = $(!1), x = Math.min(On, n * 0.5), b = $(i);
  b.current = i;
  const N = $(a);
  return N.current = a, F(() => {
    if (!T || !s) return;
    const h = (R) => {
      if (!Ie(R.pointerType) || R.button !== 0) return;
      const S = R.target;
      if (!S.closest(r) || (b.current ? !b.current(S) : Hn(S))) return;
      const B = R.clientX, j = R.clientY;
      p.current = { x: B, y: j, target: R.target }, f.current = !0, e && (d.current = setTimeout(() => u({ x: B, y: j }), x)), l.current = setTimeout(() => {
        if (!f.current) return;
        d.current && (clearTimeout(d.current), d.current = null), u(null);
        const g = p.current.target;
        if (!g) return;
        const w = N.current;
        if (w) {
          w(g, B, j);
          return;
        }
        const E = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: B,
          clientY: j,
          button: 2,
          view: window
        });
        g.dispatchEvent(E);
      }, n);
    }, M = (R) => {
      if (!f.current || l.current === null) return;
      const S = R.clientX - p.current.x, B = R.clientY - p.current.y;
      Math.sqrt(S * S + B * B) > _n && (clearTimeout(l.current), l.current = null, d.current && (clearTimeout(d.current), d.current = null), f.current = !1, u(null));
    }, A = () => {
      l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), f.current = !1, u(null);
    }, D = (R) => {
      Ie(R.pointerType) && (l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), f.current = !1, u(null));
    };
    return s == null || s.addEventListener("pointerdown", h), s.addEventListener("pointermove", M), s.addEventListener("pointerup", A), s.addEventListener("pointercancel", A), s.addEventListener("pointerleave", D), () => {
      s.removeEventListener("pointerdown", h), s.removeEventListener("pointermove", M), s.removeEventListener("pointerup", A), s == null || s.removeEventListener("pointercancel", A), s == null || s.removeEventListener("pointerleave", D), l.current !== null && clearTimeout(l.current), d.current !== null && clearTimeout(d.current);
    };
  }, [e, n, x, r]), /* @__PURE__ */ v(ce, { children: [
    t,
    e && c && /* @__PURE__ */ o(Bn, { x: c.x, y: c.y, ms: n - x })
  ] });
}
function Yr(t, e) {
  const n = le(), r = $(n);
  r.current = n, ne(() => {
    if (!e || !t.current) return;
    const i = t.current.querySelector(".absolute");
    if (!i) return;
    i.style.left = "", i.style.right = "", i.style.top = "", i.style.bottom = "", i.style.maxHeight = "";
    const a = r.current;
    if (!a) return;
    const c = t.current.getBoundingClientRect(), u = i.getBoundingClientRect(), s = a.innerWidth, l = a.innerHeight, d = u.right - s;
    if (d > 0) {
      const p = Math.min(d + 8, u.left);
      i.style.left = `${u.left - c.left - p}px`;
    }
    u.left < 0 && (i.style.left = `${-c.left + 4}px`), u.bottom > l + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${l - 8}px`));
  }, [e, t]);
}
function Kr(t, e, n) {
  const r = le(), i = $(r);
  i.current = r, ne(() => {
    if (!e || !t.current) return;
    const a = t.current;
    requestAnimationFrame(() => {
      var M, A;
      const c = a.getBoundingClientRect(), u = i.current;
      if (!u) return;
      const s = u.innerWidth, l = ((M = u.visualViewport) == null ? void 0 : M.height) ?? u.innerHeight, d = ((A = u.visualViewport) == null ? void 0 : A.offsetTop) ?? 0, p = 200, f = 4, x = 120;
      let b = Math.max(0, c.left);
      b + p > s && (b = Math.max(0, s - p - 8));
      const N = d + l - c.bottom - f - 16, h = c.top - d - f - 16;
      if (N >= x || N >= h) {
        const D = Math.min(c.bottom + f, d + l), R = Math.max(x, d + l - D - 16);
        n({ top: D, left: b, width: c.width, maxH: R });
      } else {
        const D = Math.max(x, Math.min(h, 360)), R = d + l - (c.top - f);
        n({ top: 0, left: b, width: c.width, maxH: D, bottom: Math.max(0, R) });
      }
    });
  }, [e, t]);
}
function Gr() {
  const t = cn();
  return sn ? t === null || Ie(t) : !1;
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
const Xn = `inline-flex items-center gap-2 rounded-lg text-xs transition-colors cursor-pointer select-none whitespace-nowrap ${T ? "px-7 py-2.5 text-sm" : "px-6 py-2"}`, Fn = {
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
  const a = /* @__PURE__ */ new Date(), [c, u] = U(a.getFullYear()), [s, l] = U(a.getMonth()), d = Je(() => new Set(t), [t]), p = (h) => {
    d.has(h) ? e(t.filter((M) => M !== h)) : e([...t, h]);
  }, f = Je(() => {
    const h = Kn(c, s), M = new Date(c, s, 1).getDay(), A = [];
    for (let D = 0; D < M; D++) A.push({ key: `pad-${D}`, day: 0, empty: !0 });
    for (let D = 1; D <= h; D++) A.push({ key: Gn(c, s, D), day: D, empty: !1 });
    return A;
  }, [c, s]), x = n === "dark", b = T ? "py-2" : "py-1.5", N = T ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ v("div", { className: `border rounded-lg overflow-hidden w-full ${x ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ v("div", { className: `flex items-center justify-between px-3 py-2 border-b ${x ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (u((h) => h - 1), l(11)) : l((h) => h - 1);
          },
          className: `p-1 rounded transition-colors ${x ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Previous month",
          children: /* @__PURE__ */ o(Pt, { className: "w-4 h-4" })
        }
      ),
      /* @__PURE__ */ o("span", { className: `text-sm font-semibold ${x ? "text-zinc-100" : "text-zinc-800"}`, children: new Date(c, s).toLocaleString("default", { month: "long", year: "numeric" }) }),
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 11 ? (u((h) => h + 1), l(0)) : l((h) => h + 1);
          },
          className: `p-1 rounded transition-colors ${x ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ o(_e, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "grid grid-cols-7 text-center", children: [
      Yn.map((h) => /* @__PURE__ */ o("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${x ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: h }, h)),
      f.map((h) => h.empty ? /* @__PURE__ */ o("div", {}, h.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => p(h.key),
          className: `${b} text-xs font-medium transition-colors border-b ${x ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${d.has(h.key) ? x ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: h.day
        },
        h.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ v("div", { className: `px-3 py-2 border-t ${x ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ v("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: t.map((h) => {
        const A = (/* @__PURE__ */ new Date(h + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ v("span", { className: `inline-flex items-center gap-1 rounded font-medium ${x ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${N}`, children: [
          A,
          /* @__PURE__ */ o("button", { type: "button", onClick: () => p(h), className: `hover:opacity-70 leading-none ${x ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${A}`, children: "×" })
        ] }, h);
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
  emptyHint: u = "Nothing here",
  maxHeight: s,
  disabled: l = !1,
  theme: d,
  className: p = ""
}) {
  const f = (h) => e instanceof Set ? e.has(h) : e.includes(h), x = T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", b = T ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", N = r != null || i != null;
  return /* @__PURE__ */ v("div", { className: p, ...d ? { "data-theme": d } : {}, children: [
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
          t.map((h) => {
            const M = f(h.id);
            return /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => n(h.id),
                className: `ui-checklist-item ${x} ${M ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${b}`, "aria-hidden": !0, children: M && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
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
function Qr({
  items: t,
  value: e,
  onChange: n,
  title: r,
  emptyHint: i = "Nothing here",
  maxHeight: a,
  compact: c = !1,
  disabled: u = !1,
  theme: s,
  className: l = ""
}) {
  const d = c ? "px-2.5 py-1.5 text-xs" : T ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", p = c ? "w-3.5 h-3.5" : T ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ v("div", { className: l, ...s ? { "data-theme": s } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ v(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          t.map((f) => {
            const x = e === f.id;
            return /* @__PURE__ */ v(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(f.id),
                className: `ui-checklist-item ${d} ${x ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${p}`, "aria-hidden": !0, children: x && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
                  f.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: f.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: f.label }),
                  f.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: f.secondary })
                ]
              },
              f.id
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
  const c = le(), { refs: u, floatingStyles: s } = Bt({
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
          var A;
          if (i !== "visible") return {};
          const d = (A = l.elements.floating.ownerDocument) == null ? void 0 : A.defaultView;
          if (!d) return {};
          const p = l.rects.reference, f = Math.max(p.x, 0), x = Math.max(p.y, 0), b = Math.min(p.x + p.width, d.innerWidth), N = Math.min(p.y + p.height, d.innerHeight);
          if (b <= f || N <= x) return {};
          const h = r === "left" ? b - (p.x + p.width) : r === "right" ? f - p.x : 0, M = r === "top" ? x - p.y : r === "bottom" ? N - (p.y + p.height) : 0;
          return { x: l.x + h, y: l.y + M };
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
          const d = (N = l.elements.floating.ownerDocument) == null ? void 0 : N.defaultView;
          if (!d) return {};
          const p = l.rects.floating.width, f = l.rects.floating.height, x = Math.max(8, Math.min(l.x, d.innerWidth - p - 8)), b = Math.max(8, Math.min(l.y, d.innerHeight - f - 8));
          return { x, y: b };
        }
      }
    ],
    whileElementsMounted: Ht
  });
  return ne(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ v(ce, { children: [
    !n && /* @__PURE__ */ o("div", { ref: u.setReference, className: "ui-chrome-anchor", "aria-hidden": !0 }),
    c && Fe(
      /* @__PURE__ */ o(
        "div",
        {
          ref: u.setFloating,
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
  const n = fe(), r = le(), [i, a] = U(!1), [c, u] = U({ x: 0, y: 0 }), s = $(null), l = () => {
    if (!s.current) return;
    const d = s.current.getBoundingClientRect();
    u({ x: d.left + d.width / 2, y: d.top });
  };
  return F(() => (i && r && (l(), r.addEventListener("scroll", l, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", l, !0)), [i]), /* @__PURE__ */ v(
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
• `).map((d, p) => /* @__PURE__ */ o("div", { className: p > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: d }, p)),
                /* @__PURE__ */ o("div", { className: "absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-zinc-900" })
              ]
            }
          ),
          n ?? document.body
        )
      ]
    }
  );
}, eo = T ? "text-xs font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-24" : "text-[9px] font-semibold text-zinc-600 uppercase tracking-wider shrink-0 w-16", We = T ? "h-10 px-3.5 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-2 transition-colors" : "h-7 px-2.5 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700 disabled:opacity-30 flex items-center gap-1.5 transition-colors", $e = T ? "h-10 px-3 text-sm font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-1 transition-colors" : "h-7 px-2 text-[10px] font-medium rounded bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 disabled:opacity-25 flex items-center gap-0.5 transition-colors", qn = "hover:bg-red-950/50", $t = T ? "h-10 w-10 rounded border flex items-center justify-center disabled:opacity-25 transition-colors" : "h-7 w-7 rounded border flex items-center justify-center disabled:opacity-25 transition-colors", Ct = "bg-blue-900/50 border-blue-700 text-blue-300", Tt = "bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700", jn = T ? "h-10 px-2.5 text-sm bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30" : "h-7 px-2 text-[10px] bg-zinc-800 border border-zinc-700 rounded text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-500 disabled:opacity-30", to = T ? "w-14 h-9 bg-zinc-800 border border-zinc-700 rounded text-sm text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50" : "w-10 h-6 bg-zinc-800 border border-zinc-700 rounded text-[11px] text-center text-zinc-300 outline-none focus:border-blue-500 shrink-0 read-only:opacity-50", ze = T ? "w-px h-7 bg-zinc-700 mx-1" : "w-px h-5 bg-zinc-700 mx-0.5", Vn = "inline-flex rounded overflow-hidden border border-zinc-700", zt = T ? "h-10 px-3 text-sm rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1" : "h-7 px-2.5 text-[10px] rounded bg-zinc-800 border border-zinc-700 text-zinc-200 hover:border-zinc-500 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-between gap-1", Ce = ({ onClick: t, disabled: e, title: n, className: r = We, children: i }) => /* @__PURE__ */ o(xe, { content: n, children: /* @__PURE__ */ o("button", { onClick: t, disabled: e, "aria-label": n, className: `${r} ${e ? "disabled:opacity-30 disabled:pointer-events-none" : ""}`, children: i }) }), no = ({ value: t, options: e, onChange: n, disabled: r, active: i }) => /* @__PURE__ */ o("div", { className: Vn, children: e.map((a) => {
  const c = i ? i(a.v) : t === a.v;
  return /* @__PURE__ */ o(
    "button",
    {
      disabled: r,
      onClick: () => n(a.v),
      className: `${T ? "h-10 px-3.5 text-sm" : "h-7 px-2 text-[10px]"} font-medium transition-colors disabled:opacity-30 ${c ? "bg-blue-900/50 text-blue-300" : "bg-zinc-800 text-zinc-500 hover:bg-zinc-700"} ${a.v !== e[e.length - 1].v ? "border-r border-zinc-700" : ""}`,
      children: a.l
    },
    a.v
  );
}) }), ro = ({ children: t }) => /* @__PURE__ */ v("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: T ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Zn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Qn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", oo = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ v("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ o("span", { className: n ? Zn : Qn, children: t }),
  e
] }), io = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ v("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  t,
  e && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: e })
] }), so = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => /* @__PURE__ */ v(ce, { children: [
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
    const u = document.createDocumentFragment();
    for (const s of Array.from(e.childNodes)) u.appendChild(Ue(s));
    return u;
  };
  if (!Jn.has(n)) return r();
  if (n === "a") {
    const u = e.getAttribute("href") || "";
    if (!tr.test(u)) return r();
  }
  const i = document.createElement(n), a = e.getAttribute("style"), c = nr(a || "");
  if (c && i.setAttribute("style", c), n === "a") {
    i.setAttribute("href", e.getAttribute("href"));
    const u = e.getAttribute("target"), s = e.getAttribute("rel");
    u && i.setAttribute("target", u), s && i.setAttribute("rel", s);
  }
  for (const u of Array.from(e.childNodes)) i.appendChild(Ue(u));
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
  var p;
  const c = t.attrs.field ?? "", u = n.options, s = ((p = u.resolve) == null ? void 0 : p.call(u, c)) ?? null, l = (s == null ? void 0 : s.color) ?? or, d = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
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
      onMouseDown: (f) => {
        var h;
        if (f.button !== 0 || !r.isEditable) return;
        f.preventDefault(), r.isFocused || r.commands.focus();
        const x = typeof a == "function" ? a() : null;
        if (x == null) return;
        const b = i.state.doc.resolve(x), N = b.nodeAfter;
        N && Ee.isSelectable(N) && i.dispatch(i.state.tr.setSelection(new Ee(b))), (h = u.onTokenClick) == null || h.call(u, c, f.currentTarget.getBoundingClientRect(), x);
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
  return F(() => {
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
        onPosition: ({ x: c, y: u, placement: s }) => {
          var p, f;
          if (!t) return;
          const l = (f = (p = t.props) == null ? void 0 : p.clientRect) == null ? void 0 : f.call(p), d = l && !s.endsWith("-end") ? l.width : 0;
          r.style.left = `${c + d}px`, r.style.top = `${u}px`;
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
  suggestionItems: u,
  onTokenClick: s,
  onSelectionChange: l
}, d) => {
  const p = $(c);
  p.current = c;
  const f = $(u);
  f.current = u;
  const x = $(s);
  x.current = s;
  const b = $(l);
  b.current = l;
  const N = $(null), h = $(null), M = $(e);
  M.current = e;
  const A = $(r);
  A.current = r;
  const D = $(a);
  D.current = a;
  const R = $(null), S = (E) => {
    var H;
    const z = {
      bold: E.isActive("bold"),
      italic: E.isActive("italic"),
      underline: E.isActive("underline"),
      strike: E.isActive("strike"),
      link: E.isActive("link"),
      color: E.getAttributes("textStyle").color || ""
    }, P = R.current;
    P && P.bold === z.bold && P.italic === z.italic && P.underline === z.underline && P.strike === z.strike && P.link === z.link && P.color === z.color || (R.current = z, (H = D.current) == null || H.call(D, z));
  }, B = (E) => {
    var G;
    const z = E.state.selection;
    let P = null;
    z instanceof Ee && z.node.type.name === "token" ? (P = { key: z.node.attrs.field ?? "", pos: z.from }, N.current = z.from) : N.current != null && (N.current = E.state.tr.mapping.map(N.current));
    const H = h.current, K = H && P && H.key === P.key && H.pos === P.pos;
    !H && !P || K || (h.current = P, (G = b.current) == null || G.call(b, P));
  }, j = (E) => {
    const z = rr(sr(E));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(z) ? "" : z;
  }, g = ye.useMemo(() => {
    const E = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: z }) => {
        var P;
        return ((P = f.current) == null ? void 0 : P.call(f, z)) ?? [];
      },
      command: ({ editor: z, range: P, props: H }) => {
        z.chain().focus().insertContentAt(P, { type: "token", attrs: { field: H.field } }).run();
      },
      render: dr
    };
    return cr.configure({
      resolve: p.current ?? null,
      suggestion: E,
      onTokenClick: (z, P, H) => {
        var K;
        N.current = H, (K = x.current) == null || K.call(x, z, P, H);
      }
    });
  }, []), w = Gt({
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
      g
    ],
    content: lt(t || ""),
    editable: !r,
    onUpdate: ({ editor: E }) => {
      M.current(j(E.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: E }) => {
      S(E), B(E);
    }
  });
  return F(() => {
    if (!w || w.isFocused) return;
    j(w.getHTML()) !== t && (R.current = null, w.commands.setContent(lt(t || ""), { emitUpdate: !1 }), S(w));
  }, [t, w]), F(() => {
    w && w.setEditable(!r);
  }, [r, w]), F(() => {
    w && (R.current = null, S(w), B(w));
  }, [w]), Mt(d, () => ({
    exec: (E, z) => {
      if (!(!w || A.current))
        switch (E) {
          case "bold":
            w.chain().focus().toggleBold().run();
            break;
          case "italic":
            w.chain().focus().toggleItalic().run();
            break;
          case "underline":
            w.chain().focus().toggleUnderline().run();
            break;
          case "strikeThrough":
            w.chain().focus().toggleStrike().run();
            break;
          case "foreColor":
            z && w.chain().focus().setColor(z).run();
            break;
          case "unsetColor":
            w.chain().focus().unsetColor().run();
            break;
          case "link":
            z && w.chain().focus().extendMarkRange("link").setLink({ href: z }).run();
            break;
          case "unlink":
            w.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => w == null ? void 0 : w.commands.focus(),
    insertToken: (E) => {
      !w || A.current || w.chain().focus().insertContent({ type: "token", attrs: { field: E } }).run();
    },
    replaceToken: (E) => {
      if (!w || A.current) return;
      const z = N.current;
      z != null && w.commands.command(({ tr: P }) => {
        const H = P.doc.nodeAt(z);
        if (!H || H.type.name !== "token") return !1;
        P.setNodeMarkup(z, void 0, { field: E });
        const K = P.doc.resolve(z);
        return K.nodeAfter && K.nodeAfter.type.name === "token" && P.setSelection(new Ee(K)), !0;
      });
    }
  }), [w]), /* @__PURE__ */ o(qt, { editor: w, className: `richtext-editor ${i || ""}` });
});
fr.displayName = "RichTextEditor";
const pr = ["Helvetica", "Arial", "Times New Roman", "Georgia", "Courier New"], hr = ["#b91c1c", "#b45309", "#15803d", "#1d4ed8", "#7c3aed", "#6b7280"], at = ({ className: t = "w-3 h-3" }) => /* @__PURE__ */ o("span", { className: `${t} rounded-full border border-zinc-600 relative inline-flex items-center justify-center shrink-0`, children: /* @__PURE__ */ o("span", { className: "absolute left-0 right-0 top-1/2 h-px bg-zinc-400 -rotate-45" }) }), uo = ({ value: t, disabled: e, onChange: n }) => {
  const [r, i] = U(!1);
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
  const [r, i] = U(!1), [a, c] = U(""), u = () => {
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
          children: /* @__PURE__ */ o(It, { className: "w-3 h-3" })
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
              s.key === "Enter" && (s.preventDefault(), u());
            },
            className: jn + " w-full"
          }
        ),
        /* @__PURE__ */ v("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ o("button", { onClick: u, className: We, disabled: !a.trim(), children: "Apply" }),
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
  const [a, c] = U(!1), u = (d, p) => {
    var f;
    return (f = t.current) == null ? void 0 : f.exec(d, p);
  }, s = (d) => `${$t} ${d ? Ct : Tt}`, l = (d) => !!(r != null && r[d]);
  return /* @__PURE__ */ v("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: e || l("bold"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || l("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: e || l("italic"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || l("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o(xe, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Ot, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o(xe, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(_t, { className: "w-3 h-3" }) }) }),
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
                u("unsetColor"), c(!1);
              },
              className: `w-7 h-7 rounded border border-zinc-700 hover:border-zinc-500 transition-colors flex items-center justify-center ${n != null && n.color ? "" : "ring-2 ring-zinc-300"}`,
              title: "Default (black ink)",
              children: /* @__PURE__ */ o(at, { className: "w-3.5 h-3.5" })
            }
          ),
          hr.map((d) => /* @__PURE__ */ o(
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
    i && /* @__PURE__ */ v(ce, { children: [
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
  Ir as ContextMenuDivider,
  _r as ContextMenuItem,
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
  T as IS_COARSE,
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
  Ie as isTouchLike,
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
  le as useCurrentWindow,
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
