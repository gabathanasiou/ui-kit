"use client";
import { jsxs as w, jsx as o, Fragment as le } from "react/jsx-runtime";
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
      const m = p.getBoundingClientRect();
      (m.width > 0 || m.height > 0) && (i.current = { left: m.left, top: m.top, width: m.width, height: m.height }), r(!0);
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
  const h = $(0);
  return re(() => {
    if (!n || !c.current || !Pe(d.current)) return;
    const p = e.current;
    p && an(h, p, s.current);
  }, [n, t.visible]), re(() => {
    var m;
    const p = u.current;
    if (u.current = t.visible, t.visible || !p) return;
    const x = e.current;
    if (!x || !Pe(d.current)) {
      (m = l.current) == null || m.call(l);
      return;
    }
    un(h, x, s.current, () => {
      var k;
      return (k = l.current) == null ? void 0 : k.call(l);
    });
  }, [t.visible]), X(() => {
    if (!n || !c.current) return;
    const p = (x) => {
      const m = e.current;
      m && m.contains(x.target) && x.stopImmediatePropagation();
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
  children: u,
  morph: s = !0,
  contentClassName: l
}) {
  const [d, h] = W(null), p = fe(), x = $(null), m = $(t);
  m.current = t;
  const [k, b] = W(t);
  X(() => {
    t ? b(!0) : h(null);
  }, [t]);
  const D = H(() => {
    const L = x.current;
    if (!L) return null;
    const K = L.getBoundingClientRect();
    return { left: K.left, top: K.top, width: K.width, height: K.height };
  }, []), S = Ve({
    visible: t,
    morph: s,
    anchor: D,
    onClosed: () => b(!1)
  }), R = H((L) => {
    !L && !m.current || (n ? n(L) : L || e == null || e());
  }, [n, e]), z = ye.isValidElement(r) ? ye.cloneElement(r, {
    ref: (L) => {
      x.current = L;
    }
  }) : r;
  return /* @__PURE__ */ w(U.Root, { open: t || k, onOpenChange: R, modal: !1, children: [
    /* @__PURE__ */ o(U.Trigger, { asChild: !0, children: z }),
    /* @__PURE__ */ o(U.Portal, { container: p ?? void 0, children: /* @__PURE__ */ o(gt.Provider, { value: c, children: /* @__PURE__ */ o(wt.Provider, { value: { activeSub: d, setActiveSub: h, morph: s }, children: /* @__PURE__ */ o(
      U.Content,
      {
        ref: S,
        "data-theme": c,
        className: `ui-menu rounded-lg shadow-xl z-[200] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${a || ""} ${l || ""}`,
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
  onReset: h,
  onTrash: p,
  closeOnSelect: x,
  readOnly: m = !1,
  theme: k,
  align: b,
  label: D,
  header: S,
  itemLabel: R,
  trigger: z,
  minItems: P = 1,
  itemRender: L,
  morph: K = !0,
  contentClassName: G
}) {
  const f = yt(), [N, T] = W(null), [M, _] = W(""), F = $(null), j = $(null);
  X(() => {
    t && requestAnimationFrame(() => {
      var E, O;
      (O = (E = j.current) == null ? void 0 : E.querySelector('[data-active="1"]')) == null || O.scrollIntoView({ block: "nearest" });
    });
  }, [t]), X(() => {
    if (N) {
      requestAnimationFrame(() => {
        var O, V;
        (O = F.current) == null || O.focus(), (V = F.current) == null || V.select();
      });
      const E = n.find((O) => O.id === N);
      E && !M && _(E.name);
    }
  }, [N]), X(() => {
    if (N) {
      const E = n.find((O) => O.id === N);
      E && !M && _(E.name);
    }
  }, [N, n]);
  const ie = (E, O) => {
    T(E), _(O);
  }, v = () => {
    N && M.trim() && a(N, M.trim()), T(null);
  }, y = () => {
    T(null);
  }, q = R || S.replace(/S$/, "").replace(/s$/, "");
  return /* @__PURE__ */ w(Se, { open: t, onOpenChange: (E) => {
    E ? (T(null), _("")) : (N && M.trim() && a(N, M.trim()), T(null), _("")), (!E || !m) && e(E);
  }, width: "w-80", theme: k, align: b, trigger: z, morph: K, contentClassName: G, children: [
    /* @__PURE__ */ o("div", { className: `shrink-0 ${f.headerText}`, children: S }),
    /* @__PURE__ */ o("div", { ref: j, className: "flex-1 min-h-0 overflow-y-auto scrollbar-custom flex flex-col", children: n.map((E) => {
      const O = E.id === r, V = N === E.id;
      return /* @__PURE__ */ o("div", { "data-active": O ? "1" : void 0, className: `flex items-center gap-1 rounded my-0.5 ${O ? f.rowActiveBg : f.rowHoverBg} ${N && !V ? "opacity-40 pointer-events-none" : ""}`, children: V ? /* @__PURE__ */ w(le, { children: [
        /* @__PURE__ */ o("div", { className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none flex items-center gap-2`, children: /* @__PURE__ */ o(
          "input",
          {
            ref: F,
            value: M,
            onChange: (B) => _(B.target.value),
            onKeyDown: (B) => {
              B.key === "Enter" && (B.preventDefault(), B.stopPropagation(), v()), B.key === "Escape" && (B.preventDefault(), B.stopPropagation(), y());
            },
            className: `w-full border rounded ${f.input}`
          }
        ) }),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${f.editConfirm}`,
            onSelect: (B) => {
              B.preventDefault(), v();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(dt, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${f.editCancel}`,
            onSelect: (B) => {
              B.preventDefault(), y();
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o(Xe, { className: f.btnIcon })
          }
        )
      ] }) : /* @__PURE__ */ w(le, { children: [
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `flex-1 min-w-0 ${f.itemPad} rounded outline-none cursor-pointer flex items-center ${f.rowText} ${O ? "" : f.rowTextHover}`,
            onSelect: x ? () => {
              i(E.id);
            } : (B) => {
              B.preventDefault(), i(E.id);
            },
            onTouchStart: () => {
            },
            children: /* @__PURE__ */ o("span", { className: `truncate ${O ? f.rowActiveText : ""}`, children: L ? L(E) : E.name })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${O ? f.btnActive : f.btnBase}`,
            onSelect: (B) => {
              B.preventDefault(), ie(E.id, E.name);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ o(Rt, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer ${O ? f.btnActive : f.btnBase}`,
            onSelect: (B) => {
              B.preventDefault();
              const ne = c(E.id);
              ne && ie(ne, `${E.name} Copy`);
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: /* @__PURE__ */ o(ft, { className: f.btnIcon })
          }
        ),
        /* @__PURE__ */ o(
          U.Item,
          {
            className: `shrink-0 ${f.btnSize} rounded flex items-center justify-center outline-none cursor-pointer mr-1 ${n.length <= P ? f.btnDisabled : O ? f.btnDangerActive : f.btnDanger}`,
            onSelect: (B) => {
              B.preventDefault(), u(E.id);
            },
            onTouchStart: () => {
            },
            disabled: m || n.length <= P,
            children: /* @__PURE__ */ o(Oe, { className: f.btnIcon })
          }
        )
      ] }) }, E.id);
    }) }),
    /* @__PURE__ */ w("div", { className: `shrink-0 ${N ? "opacity-40 pointer-events-none" : ""}`, children: [
      h && /* @__PURE__ */ w(le, { children: [
        /* @__PURE__ */ o(U.Separator, { className: f.separator }),
        /* @__PURE__ */ w(
          U.Item,
          {
            className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
            onSelect: (E) => {
              E.preventDefault(), h();
            },
            onTouchStart: () => {
            },
            disabled: m,
            children: [
              /* @__PURE__ */ o(pt, { className: `${f.btnIcon} ${f.icon}` }),
              "Reset to Default"
            ]
          }
        )
      ] }),
      (s || l || d || p) && /* @__PURE__ */ o(U.Separator, { className: f.separator }),
      s && /* @__PURE__ */ w(
        U.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault();
            const O = s();
            O && ie(O, "");
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ o(St, { className: `${f.btnIcon} ${f.icon}` }),
            "New ",
            q
          ]
        }
      ),
      l && /* @__PURE__ */ w(
        U.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault(), l();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ w("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "7 10 12 15 17 10" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "15", x2: "12", y2: "3" })
            ] }),
            "Import"
          ]
        }
      ),
      d && /* @__PURE__ */ w(
        U.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault(), d();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ w("svg", { className: `${f.btnIcon} ${f.icon}`, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ o("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
              /* @__PURE__ */ o("polyline", { points: "17 8 12 3 7 8" }),
              /* @__PURE__ */ o("line", { x1: "12", y1: "3", x2: "12", y2: "15" })
            ] }),
            "Export"
          ]
        }
      ),
      p && /* @__PURE__ */ w(
        U.Item,
        {
          className: `w-full text-left ${f.itemPad} rounded flex items-center gap-2 transition-colors outline-none cursor-pointer select-none ${f.itemDefault}`,
          onSelect: (E) => {
            E.preventDefault(), p();
          },
          onTouchStart: () => {
          },
          disabled: m,
          children: [
            /* @__PURE__ */ o(Oe, { className: `${f.btnIcon} ${f.icon}` }),
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
  rightAction: u,
  trailing: s
}) {
  xt();
  const l = yt(), d = $(!1), h = r === "danger" ? l.itemDanger : l.itemDefault;
  return /* @__PURE__ */ w(
    U.Item,
    {
      className: `w-full text-left ${hn} rounded flex items-center gap-2 outline-none cursor-pointer select-none ${h} ${n ? "opacity-30 pointer-events-none" : ""} ${i}`,
      onSelect: (p) => {
        if (d.current) {
          d.current = !1;
          return;
        }
        c && p.preventDefault(), t();
      },
      onTouchStart: () => {
      },
      disabled: n,
      children: [
        e && /* @__PURE__ */ o("span", { className: `${l.icon} shrink-0`, children: e }),
        /* @__PURE__ */ o("span", { className: "flex-1 truncate", children: a }),
        s && /* @__PURE__ */ o("span", { className: "shrink-0 ml-1 flex items-center", children: s }),
        u && /* @__PURE__ */ o(
          "span",
          {
            className: `shrink-0 ml-1 p-0.5 rounded ${l.rightAction}`,
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
const bn = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs";
function Lr({ id: t, label: e, icon: n, width: r, side: i = "right", children: a }) {
  const { activeSub: c, setActiveSub: u, morph: s } = Re(wt), l = c === t, d = xt(), h = fe(), p = $(null), [x, m] = W(l), k = !l && x;
  X(() => {
    l && m(!0);
  }, [l]);
  const b = H(() => {
    const z = p.current;
    if (!z) return null;
    const P = z.getBoundingClientRect();
    return { left: P.left, top: P.top, width: P.width, height: P.height };
  }, []), D = Ve({
    visible: l,
    morph: s,
    anchor: b,
    onClosed: () => m(!1)
  }), S = `w-full text-left ${bn} rounded flex items-center gap-2 outline-none cursor-pointer select-none justify-between ui-item${k ? " ui-sub-closing" : ""}`, R = `ui-menu rounded-lg shadow-xl z-[210] p-1 flex flex-col select-none max-h-[min(75vh,30rem)] overflow-y-auto min-w-0 scrollbar-custom ${r || "w-48"}`;
  return /* @__PURE__ */ w(U.Sub, { open: l || x, onOpenChange: (z) => u(z ? t : null), children: [
    /* @__PURE__ */ w(
      U.SubTrigger,
      {
        ref: p,
        className: S,
        onTouchStart: () => {
        },
        onPointerDown: (z) => {
          z.pointerType === "pen" && (z.preventDefault(), u(l ? null : t));
        },
        children: [
          i === "left" && /* @__PURE__ */ o(Ie, { className: "w-3 h-3 ui-icon rotate-180 order-first" }),
          /* @__PURE__ */ w("span", { className: "flex items-center gap-2", children: [
            n && /* @__PURE__ */ o("span", { className: "ui-icon shrink-0", children: n }),
            e
          ] }),
          i === "right" && /* @__PURE__ */ o(Ie, { className: "w-3 h-3 ui-icon" })
        ]
      }
    ),
    /* @__PURE__ */ o(U.Portal, { container: h ?? void 0, children: /* @__PURE__ */ o(
      U.SubContent,
      {
        ref: D,
        "data-theme": d,
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
  const u = ye.useRef(null), s = ae(), [l, d] = W(t);
  X(() => {
    t && d(!0);
  }, [t]);
  const h = H(() => ({ left: e, top: n, width: 0, height: 0 }), [e, n]), p = Ve({
    visible: t,
    morph: c,
    anchor: h,
    onClosed: () => d(!1)
  }), x = H((m) => {
    u.current = m, p(m);
  }, [p]);
  return X(() => {
    if (!t || !s) return;
    const m = (b) => {
      u.current && !u.current.contains(b.target) && r();
    }, k = (b) => {
      b.key === "Escape" && r();
    };
    return s.addEventListener("pointerdown", m, !0), s.addEventListener("keydown", k, !0), () => {
      s.removeEventListener("pointerdown", m, !0), s.removeEventListener("keydown", k, !0);
    };
  }, [t, r, s]), re(() => {
    var L;
    if (!t || !u.current) return;
    const m = u.current.getBoundingClientRect(), k = (L = a == null ? void 0 : a.current) == null ? void 0 : L.getBoundingClientRect(), b = k ? k.right : (s == null ? void 0 : s.innerWidth) ?? 0, D = k ? k.bottom : (s == null ? void 0 : s.innerHeight) ?? 0, S = k ? k.left : 0, R = k ? k.top : 0;
    let z = Math.max(R + be, n), P = Math.max(S + be, e);
    P + m.width > b && (P = b - m.width - be), z + m.height > D && (z = Math.max(R + be, D - m.height - be)), u.current.style.top = `${z}px`, u.current.style.left = `${P}px`;
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
}, Ir = ({ onClick: t, variant: e = "default", icon: n, disabled: r = !1, children: i }) => /* @__PURE__ */ w(
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
function yn({ checked: t, onChange: e, disabled: n = !1, label: r, id: i, className: a = "", labelClassName: c = "", theme: u, variant: s = "pill", tone: l = "accent", block: d = !1 }) {
  const h = s !== "plain", p = C ? "w-5 h-5" : "w-4 h-4", x = C ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", m = C ? "w-3.5 h-3.5" : "w-3 h-3", k = C ? "text-sm" : "text-xs";
  return /* @__PURE__ */ w(
    "label",
    {
      className: `ui-checkbox ${h ? `ui-checkbox-pill ${C ? "px-4 py-3" : "px-3 py-2.5"} rounded-lg` : ""} ${l === "danger" ? "ui-checkbox-tone-danger" : ""} ${n ? "ui-disabled" : ""} ${a}`,
      style: { display: d ? "flex" : "inline-flex", alignItems: "center", gap: C ? 10 : 8 },
      onClick: (D) => D.stopPropagation(),
      ...u ? { "data-theme": u } : {},
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
        h ? /* @__PURE__ */ o("span", { className: "ui-check-indicator", "aria-hidden": !0, children: t ? /* @__PURE__ */ w("svg", { viewBox: "0 0 16 16", className: p, "aria-hidden": !0, children: [
          /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "currentColor" }),
          /* @__PURE__ */ o("path", { d: "M4.5 8.2 L7 10.7 L11.5 5.8", stroke: "#ffffff", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" })
        ] }) : /* @__PURE__ */ o("svg", { viewBox: "0 0 16 16", className: p, "aria-hidden": !0, children: /* @__PURE__ */ o("rect", { x: "1", y: "1", width: "14", height: "14", rx: "3.5", fill: "none", stroke: "currentColor", strokeWidth: 1.5 }) }) }) : /* @__PURE__ */ o("span", { className: `ui-checkbox-box ${x}`, "aria-hidden": !0, children: t && /* @__PURE__ */ o("svg", { viewBox: "0 0 12 12", fill: "none", className: m, "aria-hidden": !0, children: /* @__PURE__ */ o("path", { d: "M2 6.5 L5 9.5 L10 3", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        r != null && /* @__PURE__ */ o("span", { className: `ui-checkbox-label ${k} ${c}`, children: r })
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
  const [e, n] = W(null), [r, i] = W(!1), a = fe(), c = ae(), u = $(c);
  u.current = c;
  const s = $(null), l = $(null), [d, h] = W(null), p = $(null), [x, m] = W(null), k = $(null), b = p.current !== null;
  k.current, X(() => {
    e || (h(null), m(null));
  }, [e]);
  const D = H(() => {
    const v = l.current;
    if (!v) return null;
    const y = v.getBoundingClientRect();
    return { left: y.left, top: y.top, width: y.width, height: y.height };
  }, []), S = H((v) => {
    if (v.target.closest("button")) return;
    const y = D();
    y && (h(y), m({ w: y.width, h: y.height }), p.current = { startX: v.clientX, startY: v.clientY, posX: y.left, posY: y.top }, v.target.setPointerCapture(v.pointerId));
  }, [D]), R = H((v) => {
    const y = p.current;
    y && (v.preventDefault(), h({ left: y.posX + v.clientX - y.startX, top: y.posY + v.clientY - y.startY }));
  }, []), z = H(() => {
    p.current = null;
  }, []), P = H((v) => (y) => {
    y.stopPropagation();
    const q = D();
    q && (h(q), m({ w: q.width, h: q.height }), k.current = { dir: v, startX: y.clientX, startY: y.clientY, startL: q.left, startT: q.top, startW: q.width, startH: q.height }, y.target.setPointerCapture(y.pointerId));
  }, [D]), L = 200, K = 100, G = 32, f = H((v) => {
    const y = k.current;
    if (!y) return;
    v.preventDefault();
    const q = v.clientX - y.startX, E = v.clientY - y.startY;
    let O = y.startW, V = y.startH, B = y.startL, ne = y.startT;
    y.dir.includes("e") && (O = y.startW + q), y.dir.includes("w") && (O = y.startW - q, B = y.startL + q), y.dir.includes("s") && (V = y.startH + E), y.dir.includes("n") && (V = y.startH - E, ne = y.startT + E);
    const pe = u.current;
    if (!pe) return;
    const he = pe.innerWidth, ke = pe.innerHeight;
    O = Math.max(L, Math.min(O, he - G * 2)), V = Math.max(K, Math.min(V, ke - G * 2)), y.dir.includes("w") && (B = Math.max(G, Math.min(B, he - O - G))), y.dir.includes("n") && (ne = Math.max(G, Math.min(ne, ke - V - G))), m({ w: O, h: V }), h({ left: B, top: ne });
  }, []), N = H(() => {
    k.current = null;
  }, []), T = H(() => {
    e && (e.kind === "confirm" ? e.resolve(!1) : e.kind === "prompt" ? e.resolve(null) : e.resolve(), n(null));
  }, [e]), M = H((v) => {
    if (v.suppressKey) {
      const y = localStorage.getItem(v.suppressKey);
      if (y && Date.now() < parseInt(y, 10))
        return Promise.resolve(!0);
    }
    return new Promise((y) => {
      i(!1), n({ kind: "confirm", options: v, resolve: y });
    });
  }, []), _ = H((v) => new Promise((y) => {
    n({ kind: "prompt", options: v, resolve: y });
  }), []), F = H((v) => new Promise((y) => {
    n({ kind: "alert", options: v, resolve: y });
  }), []);
  X(() => {
    if (e) {
      const v = setTimeout(() => {
        var y;
        return (y = s.current) == null ? void 0 : y.focus();
      }, 50);
      return () => clearTimeout(v);
    }
  }, [e]);
  const j = () => {
    var v, y;
    !e || e.kind !== "prompt" || (e.resolve(((y = (v = s.current) == null ? void 0 : v.value) == null ? void 0 : y.trim()) || null), n(null));
  }, ie = e !== null;
  return /* @__PURE__ */ w(vt.Provider, { value: { confirm: M, prompt: _, alert: F }, children: [
    t,
    /* @__PURE__ */ o(J.Root, { open: ie, onOpenChange: (v) => {
      v || T();
    }, modal: !0, children: /* @__PURE__ */ w(J.Portal, { container: a ?? void 0, children: [
      /* @__PURE__ */ o(J.Overlay, { className: "fixed inset-0 z-[10000] ui-overlay" }),
      /* @__PURE__ */ w(
        J.Content,
        {
          ref: l,
          "data-theme": "dark",
          className: `fixed z-[10000] ui-dialog rounded-lg shadow-xl ${wn} space-y-4 focus:outline-none ${d || x ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"} ${x ? "" : "w-full max-w-sm"}`,
          style: { ...d ? { left: d.left, top: d.top } : {}, ...x ? { width: x.w, height: x.h } : {} },
          onEscapeKeyDown: (v) => {
            T(), v.preventDefault();
          },
          onPointerDownOutside: (v) => {
            T(), v.preventDefault();
          },
          onKeyDown: (v) => {
            if (v.key === "Enter") {
              if ((e == null ? void 0 : e.kind) === "prompt" && v.target instanceof HTMLInputElement || (v.preventDefault(), !e)) return;
              e.kind === "confirm" ? (e.resolve(!0), n(null)) : e.kind === "prompt" ? j() : (e.resolve(), n(null));
            }
          },
          children: [
            /* @__PURE__ */ w(
              "div",
              {
                className: `flex items-center justify-between ${b ? "cursor-grabbing" : "cursor-grab"}`,
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
                onKeyDown: (v) => {
                  v.key === "Enter" && j();
                },
                className: `w-full ${$n} ui-input`
              }
            ),
            /* @__PURE__ */ w("div", { className: "flex items-center justify-end gap-2 pt-1", children: [
              (e == null ? void 0 : e.kind) !== "alert" && /* @__PURE__ */ o(
                "button",
                {
                  onClick: () => {
                    const v = e;
                    v && (v.kind === "confirm" ? (v.resolve(!1), n(null)) : v.kind === "prompt" && (v.resolve(null), n(null)));
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
                        const v = e.options;
                        v.suppressKey && r && localStorage.setItem(v.suppressKey, String(Date.now() + 864e5)), e.resolve(!0), n(null);
                      } else e.kind === "prompt" ? j() : (e.resolve(), n(null));
                  },
                  className: `${nt} ui-btn ${(e == null ? void 0 : e.kind) === "confirm" && e.options.danger ? "ui-btn-danger" : "ui-btn-primary"}`,
                  children: (e == null ? void 0 : e.kind) === "alert" ? "OK" : (e == null ? void 0 : e.kind) === "confirm" ? "Confirm" : "Save"
                }
              )
            ] }),
            /* @__PURE__ */ w("div", { className: "absolute inset-0 pointer-events-none", children: [
              /* @__PURE__ */ o("div", { className: `absolute ${rt} top-0 cursor-n-resize pointer-events-auto`, onPointerDown: P("n"), onPointerMove: f, onPointerUp: N }),
              /* @__PURE__ */ o("div", { className: `absolute ${rt} bottom-0 cursor-s-resize pointer-events-auto`, onPointerDown: P("s"), onPointerMove: f, onPointerUp: N }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} left-0 cursor-w-resize pointer-events-auto`, onPointerDown: P("w"), onPointerMove: f, onPointerUp: N }),
              /* @__PURE__ */ o("div", { className: `absolute ${ot} right-0 cursor-e-resize pointer-events-auto`, onPointerDown: P("e"), onPointerMove: f, onPointerUp: N }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 left-0 ${Ne} cursor-nw-resize pointer-events-auto`, onPointerDown: P("nw"), onPointerMove: f, onPointerUp: N }),
              /* @__PURE__ */ o("div", { className: `absolute top-0 right-0 ${Ne} cursor-ne-resize pointer-events-auto`, onPointerDown: P("ne"), onPointerMove: f, onPointerUp: N }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 left-0 ${Ne} cursor-sw-resize pointer-events-auto`, onPointerDown: P("sw"), onPointerMove: f, onPointerUp: N }),
              /* @__PURE__ */ o("div", { className: `absolute bottom-0 right-0 ${Ne} cursor-se-resize pointer-events-auto`, onPointerDown: P("se"), onPointerMove: f, onPointerUp: N })
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
  onReset: u,
  morph: s = !0
}) {
  const l = $(null), d = $(null), h = $(null), [p, x] = W(!1), m = H((g) => {
    l.current = g, x(g !== null);
  }, []), k = fe(), b = ae(), D = $(b);
  D.current = b;
  const [S, R] = W(null), z = $(null), P = $(!1), L = $(!1), [K, G] = W(!1), f = $(0), N = $(!1), T = $(s);
  T.current = s;
  const M = $(!1), _ = $(!1), F = () => {
    _.current = !0, G(!0);
  }, j = () => {
    _.current = !1, G(!1);
  };
  X(() => {
    t || (R(null), L.current = !1, P.current = !1);
  }, [t]), re(() => {
    if (!t || L.current || !p || !l.current) return;
    L.current = !0;
    const g = l.current.getBoundingClientRect();
    R({ left: g.left, top: g.top });
  }, [t, p]), re(() => {
    if (!t || !p || !s || ge() || !l.current) return;
    const g = l.current, A = Ae(g), I = A[A.length - 1];
    F(), I ? it(f, g, I.getBoundingClientRect(), j) : Cn(f, g, j);
  }, [t, p]);
  const ie = H(() => {
    if (N.current) return;
    const g = l.current, A = !!g && Ae(g).length > 0;
    if (!g || !s || ge() || A) {
      e();
      return;
    }
    N.current = !0, M.current = !0, F(), st(f, g, () => {
      N.current = !1, j(), e();
    });
  }, [s, e]);
  re(() => () => {
    const g = l.current;
    if (!g || M.current || !T.current || ge() || Ae(g).length > 0) return;
    const A = g.ownerDocument, I = g.cloneNode(!0);
    I.removeAttribute("data-modal-stack"), I.removeAttribute("data-state"), I.removeAttribute("role"), I.removeAttribute("data-aria-hidden"), I.removeAttribute("tabindex"), I.setAttribute("aria-hidden", "true"), I.style.pointerEvents = "none", A.body.appendChild(I), st({ current: 0 }, I, () => {
      I.isConnected && I.remove();
    });
  }, []), X(() => {
    if (!t || !p || !s || !l.current) return;
    const g = l.current, A = g.parentNode;
    if (!A) return;
    let I = 0, Z = null, Y = !1;
    const ee = () => {
      I = 0;
      const Q = Le(g);
      Q.length > 0 ? (Z = Q[Q.length - 1].getBoundingClientRect(), Y = !0, I = requestAnimationFrame(ee)) : Y && (Y = !1, Z && !ge() && (F(), it(f, g, Z, j)), Z = null);
    }, se = new MutationObserver(() => {
      !I && Le(g).length > 0 && (I = requestAnimationFrame(ee));
    });
    return se.observe(A, { childList: !0 }), () => {
      se.disconnect(), I && cancelAnimationFrame(I);
    };
  }, [t, p]), X(() => {
    if (!p || !s || ge() || !l.current) return;
    const g = l.current;
    let A = Math.round(g.getBoundingClientRect().height), I = !1;
    const Z = new ResizeObserver(() => {
      var Qe;
      if (!g.isConnected) return;
      const Y = Math.round(g.getBoundingClientRect().height);
      if (!I) {
        I = !0, A = Y;
        return;
      }
      if (Math.abs(Y - A) < 1) return;
      if (z.current || N.current || Le(g).length > 0) {
        A = Y;
        return;
      }
      if (_.current) return;
      const ee = A;
      A = Y, F();
      const se = g.getBoundingClientRect(), Q = !P.current, me = ((Qe = D.current) == null ? void 0 : Qe.innerHeight) ?? 0, Dt = Q ? (me - ee) / 2 : se.top, Ze = Q ? (me - Y) / 2 : se.top;
      g.style.transition = "none", g.style.height = `${ee}px`, Q && (g.style.top = `${Dt}px`), d.current && (d.current.style.overflow = "hidden"), g.getBoundingClientRect(), requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          g.style.height === `${ee}px` && (g.style.transition = `height ${oe}ms ${we}${Q ? `, top ${oe}ms ${we}` : ""}`, g.style.height = `${Y}px`, Q && (g.style.top = `${Ze}px`), window.setTimeout(() => {
            g.style.height === `${Y}px` && (g.style.transition = "", g.style.height = "", d.current && (d.current.style.overflow = ""), Q && R({ left: se.left, top: Ze }), j());
          }, oe + 60));
        });
      });
    });
    return Z.observe(g), () => Z.disconnect();
  }, [p]);
  const v = H(() => {
    const g = l.current;
    if (!g) return null;
    const A = g.getBoundingClientRect();
    return { left: A.left, top: A.top, width: A.width, height: A.height };
  }, []), y = H((g, A) => {
    var Q, me;
    const I = ((Q = D.current) == null ? void 0 : Q.innerWidth) ?? 0, Z = ((me = D.current) == null ? void 0 : me.innerHeight) ?? 0, Y = v(), ee = Y ? Y.width : Math.min(I - ce * 2, 576), se = Y ? Y.height : Math.min(Z - ce * 2, 400);
    return {
      left: Math.max(ce, Math.min(g, I - ee - ce)),
      top: Math.max(ce, Math.min(A, Z - se - ce))
    };
  }, [v]), q = H((g) => {
    if (g.target.closest("button")) return;
    P.current = !0;
    const A = v();
    A && (R(y(A.left, A.top)), z.current = { startX: g.clientX, startY: g.clientY, posX: A.left, posY: A.top }, g.target.setPointerCapture(g.pointerId));
  }, [v, y]), E = H((g) => {
    const A = z.current;
    A && (g.preventDefault(), R(y(A.posX + g.clientX - A.startX, A.posY + g.clientY - A.startY)));
  }, [y]), O = H(() => {
    z.current = null;
  }, []), V = z.current !== null, B = S !== null, ne = B ? "" : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", pe = `${i ? `${i} w-full` : "max-w-xl w-full"}`, he = {
    ...B ? { left: S.left, top: S.top } : {},
    width: `min(100%, calc(100vw - ${ce * 2}px))`,
    maxHeight: `calc(100vh - ${ce * 2}px)`
  }, ke = H((g) => {
    if (g.key !== "Enter" || g.shiftKey || g.metaKey || g.ctrlKey || g.altKey || g.target.closest('input, textarea, select, button, a, [contenteditable], [role="button"], [role="menuitem"], [role="option"], [role="radio"], [role="checkbox"]') || document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]')) return;
    const I = h.current;
    if (!I) return;
    const Z = Array.from(I.querySelectorAll("button[data-modal-confirm]")), Y = Z.length > 0 ? Z : Array.from(I.querySelectorAll("button")), ee = Y[Y.length - 1];
    !ee || ee.disabled || (g.preventDefault(), ee.click());
  }, []);
  return /* @__PURE__ */ o(J.Root, { open: t, onOpenChange: (g) => {
    g || ie();
  }, children: /* @__PURE__ */ w(J.Portal, { container: k ?? void 0, children: [
    /* @__PURE__ */ o(
      J.Overlay,
      {
        className: "fixed inset-0 z-[9999] bg-transparent",
        style: { touchAction: "manipulation" },
        onTouchEnd: (g) => {
          document.querySelector('[data-radix-menu-content][data-state="open"], [data-radix-popper-content-wrapper][data-state="open"]') || (g.preventDefault(), ie());
        }
      }
    ),
    /* @__PURE__ */ w(
      J.Content,
      {
        ref: m,
        onKeyDown: ke,
        "data-modal-stack": !0,
        className: `fixed z-[10000] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden flex flex-col focus:outline-none ${ne} ${pe}`,
        style: { touchAction: "manipulation", ...Object.keys(he).length > 0 ? he : {} },
        children: [
          /* @__PURE__ */ w(
            "div",
            {
              className: `flex items-center justify-between ${Tn} ${zn} border-b border-zinc-800 shrink-0 bg-zinc-950 ${V ? "cursor-grabbing" : "cursor-grab"}`,
              onPointerDown: (g) => {
                K || q(g);
              },
              onPointerMove: E,
              onPointerUp: O,
              children: [
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-0", children: [
                  r && /* @__PURE__ */ o("span", { className: "text-zinc-400 shrink-0", children: r }),
                  /* @__PURE__ */ o(J.Title, { className: `${En} font-bold text-white truncate`, children: n })
                ] }),
                /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
                  u && /* @__PURE__ */ w("button", { onClick: u, className: `flex items-center gap-1 ${Mn} text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-800 hover:bg-zinc-700 rounded ${Sn} shrink-0`, children: [
                    /* @__PURE__ */ o(pt, { className: Rn }),
                    "Reset"
                  ] }),
                  /* @__PURE__ */ o(J.Close, { className: "text-zinc-500 hover:text-white transition-colors shrink-0", children: /* @__PURE__ */ o(Xe, { className: Dn }) })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { ref: d, className: "overflow-y-auto flex-1 bg-zinc-900 text-zinc-100", children: c }),
          a && /* @__PURE__ */ o("div", { ref: h, className: "shrink-0", children: a })
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
    const u = c - i, s = Math.min(u / e, 1);
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
        children: /* @__PURE__ */ w("svg", { ref: r, width: te, height: te, viewBox: `0 0 ${te} ${te}`, children: [
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
  const [c, u] = W(null), s = on(), l = $(null), d = $(null), h = $({ x: 0, y: 0, target: null }), p = $(!1), x = Math.min(On, n * 0.5), m = $(i);
  m.current = i;
  const k = $(a);
  return k.current = a, X(() => {
    if (!C || !s) return;
    const b = (z) => {
      if (!_e(z.pointerType) || z.button !== 0) return;
      const P = z.target;
      if (!P.closest(r) || (m.current ? !m.current(P) : Hn(P))) return;
      const L = z.clientX, K = z.clientY;
      h.current = { x: L, y: K, target: z.target }, p.current = !0, e && (d.current = setTimeout(() => u({ x: L, y: K }), x)), l.current = setTimeout(() => {
        if (!p.current) return;
        d.current && (clearTimeout(d.current), d.current = null), u(null);
        const G = h.current.target;
        if (!G) return;
        const f = k.current;
        if (f) {
          f(G, L, K);
          return;
        }
        const N = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !0,
          clientX: L,
          clientY: K,
          button: 2,
          view: window
        });
        G.dispatchEvent(N);
      }, n);
    }, D = (z) => {
      if (!p.current || l.current === null) return;
      const P = z.clientX - h.current.x, L = z.clientY - h.current.y;
      Math.sqrt(P * P + L * L) > In && (clearTimeout(l.current), l.current = null, d.current && (clearTimeout(d.current), d.current = null), p.current = !1, u(null));
    }, S = () => {
      l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), p.current = !1, u(null);
    }, R = (z) => {
      _e(z.pointerType) && (l.current !== null && (clearTimeout(l.current), l.current = null), d.current !== null && (clearTimeout(d.current), d.current = null), p.current = !1, u(null));
    };
    return s == null || s.addEventListener("pointerdown", b), s.addEventListener("pointermove", D), s.addEventListener("pointerup", S), s.addEventListener("pointercancel", S), s.addEventListener("pointerleave", R), () => {
      s.removeEventListener("pointerdown", b), s.removeEventListener("pointermove", D), s.removeEventListener("pointerup", S), s == null || s.removeEventListener("pointercancel", S), s == null || s.removeEventListener("pointerleave", R), l.current !== null && clearTimeout(l.current), d.current !== null && clearTimeout(d.current);
    };
  }, [e, n, x, r]), /* @__PURE__ */ w(le, { children: [
    t,
    e && c && /* @__PURE__ */ o(Bn, { x: c.x, y: c.y, ms: n - x })
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
    const c = t.current.getBoundingClientRect(), u = i.getBoundingClientRect(), s = a.innerWidth, l = a.innerHeight, d = u.right - s;
    if (d > 0) {
      const h = Math.min(d + 8, u.left);
      i.style.left = `${u.left - c.left - h}px`;
    }
    u.left < 0 && (i.style.left = `${-c.left + 4}px`), u.bottom > l + 4 && (i.style.top = "auto", i.style.bottom = "100%", i.getBoundingClientRect().top < 0 && (i.style.bottom = "auto", i.style.top = `${-c.top + 4}px`, i.style.maxHeight = `${l - 8}px`));
  }, [e, t]);
}
function Kr(t, e, n) {
  const r = ae(), i = $(r);
  i.current = r, re(() => {
    if (!e || !t.current) return;
    const a = t.current;
    requestAnimationFrame(() => {
      var D, S;
      const c = a.getBoundingClientRect(), u = i.current;
      if (!u) return;
      const s = u.innerWidth, l = ((D = u.visualViewport) == null ? void 0 : D.height) ?? u.innerHeight, d = ((S = u.visualViewport) == null ? void 0 : S.offsetTop) ?? 0, h = 200, p = 4, x = 120;
      let m = Math.max(0, c.left);
      m + h > s && (m = Math.max(0, s - h - 8));
      const k = d + l - c.bottom - p - 16, b = c.top - d - p - 16;
      if (k >= x || k >= b) {
        const R = Math.min(c.bottom + p, d + l), z = Math.max(x, d + l - R - 16);
        n({ top: R, left: m, width: c.width, maxH: z });
      } else {
        const R = Math.max(x, Math.min(b, 360)), z = d + l - (c.top - p);
        n({ top: 0, left: m, width: c.width, maxH: R, bottom: Math.max(0, z) });
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
  const a = /* @__PURE__ */ new Date(), [c, u] = W(a.getFullYear()), [s, l] = W(a.getMonth()), d = Je(() => new Set(t), [t]), h = (b) => {
    d.has(b) ? e(t.filter((D) => D !== b)) : e([...t, b]);
  }, p = Je(() => {
    const b = Kn(c, s), D = new Date(c, s, 1).getDay(), S = [];
    for (let R = 0; R < D; R++) S.push({ key: `pad-${R}`, day: 0, empty: !0 });
    for (let R = 1; R <= b; R++) S.push({ key: Gn(c, s, R), day: R, empty: !1 });
    return S;
  }, [c, s]), x = n === "dark", m = C ? "py-2" : "py-1.5", k = C ? "text-xs px-2 py-1" : "text-[10px] px-1.5 py-0.5";
  return /* @__PURE__ */ w("div", { className: `border rounded-lg overflow-hidden w-full ${x ? "border-zinc-700 bg-zinc-900" : "border-zinc-200 bg-white"} ${i}`, children: [
    /* @__PURE__ */ w("div", { className: `flex items-center justify-between px-3 py-2 border-b ${x ? "bg-zinc-800/60 border-zinc-700" : "bg-zinc-50 border-zinc-200"}`, children: [
      /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => {
            s === 0 ? (u((b) => b - 1), l(11)) : l((b) => b - 1);
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
            s === 11 ? (u((b) => b + 1), l(0)) : l((b) => b + 1);
          },
          className: `p-1 rounded transition-colors ${x ? "text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100" : "text-zinc-600 hover:bg-zinc-200"}`,
          "aria-label": "Next month",
          children: /* @__PURE__ */ o(Ie, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "grid grid-cols-7 text-center", children: [
      Yn.map((b) => /* @__PURE__ */ o("div", { className: `text-[10px] font-semibold uppercase tracking-wider py-1.5 border-b ${x ? "text-zinc-500 border-zinc-800" : "text-zinc-400 border-zinc-100"}`, children: b }, b)),
      p.map((b) => b.empty ? /* @__PURE__ */ o("div", {}, b.key) : /* @__PURE__ */ o(
        "button",
        {
          type: "button",
          onClick: () => h(b.key),
          className: `${m} text-xs font-medium transition-colors border-b ${x ? "text-zinc-300 hover:bg-zinc-800 border-zinc-800/60" : "text-zinc-700 hover:bg-zinc-100 border-zinc-50"} ${d.has(b.key) ? x ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-zinc-900 text-white hover:bg-zinc-800" : ""}`,
          children: b.day
        },
        b.key
      ))
    ] }),
    r && t.length > 0 && /* @__PURE__ */ w("div", { className: `px-3 py-2 border-t ${x ? "border-zinc-700 bg-zinc-800/40" : "border-zinc-200 bg-zinc-50"}`, children: [
      /* @__PURE__ */ w("div", { className: "text-[10px] uppercase font-semibold tracking-wider mb-1.5 text-zinc-500", children: [
        t.length,
        " date",
        t.length !== 1 ? "s" : "",
        " selected"
      ] }),
      /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-1", children: t.map((b) => {
        const S = (/* @__PURE__ */ new Date(b + "T00:00:00")).toLocaleString("default", { month: "short", day: "numeric" });
        return /* @__PURE__ */ w("span", { className: `inline-flex items-center gap-1 rounded font-medium ${x ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-700"} ${k}`, children: [
          S,
          /* @__PURE__ */ o("button", { type: "button", onClick: () => h(b), className: `hover:opacity-70 leading-none ${x ? "text-zinc-400" : "text-zinc-500"}`, "aria-label": `Remove ${S}`, children: "×" })
        ] }, b);
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
  className: h = ""
}) {
  const p = (b) => e instanceof Set ? e.has(b) : e.includes(b), x = C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", m = C ? "w-5 h-5 rounded-md" : "w-4 h-4 rounded", k = r != null || i != null;
  return /* @__PURE__ */ w("div", { className: h, ...d ? { "data-theme": d } : {}, children: [
    k && /* @__PURE__ */ w("div", { className: "flex items-center justify-between ui-checklist-header", children: [
      r != null && /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }),
      i != null && /* @__PURE__ */ o("button", { type: "button", disabled: l, onClick: i, className: "ui-checklist-toggleall", children: c ?? (a ? "Deselect all" : "Select all") })
    ] }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${l ? "ui-checklist-disabled" : ""}`,
        style: s ? { maxHeight: s, overflowY: "auto" } : void 0,
        children: [
          t.map((b) => {
            const D = p(b.id);
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: l,
                onClick: () => n(b.id),
                className: `ui-checklist-item ${x} ${D ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-checklist-box ${m}`, "aria-hidden": !0, children: D && /* @__PURE__ */ o("svg", { className: "w-3 h-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": !0, children: /* @__PURE__ */ o("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) }),
                  b.leading != null && /* @__PURE__ */ o("span", { className: "ui-checklist-leading", children: b.leading }),
                  /* @__PURE__ */ o("span", { className: "ui-checklist-label", children: b.label }),
                  b.secondary != null && /* @__PURE__ */ o("span", { className: "ui-checklist-secondary", children: b.secondary })
                ]
              },
              b.id
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
  const d = c ? "px-2.5 py-1.5 text-xs" : C ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs", h = c ? "w-3.5 h-3.5" : C ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ w("div", { className: l, ...s ? { "data-theme": s } : {}, children: [
    r != null && /* @__PURE__ */ o("div", { className: "flex items-center justify-between ui-checklist-header", children: /* @__PURE__ */ o("span", { className: "ui-checklist-title", children: r }) }),
    /* @__PURE__ */ w(
      "div",
      {
        className: `ui-checklist scrollbar-custom ${u ? "ui-checklist-disabled" : ""}`,
        style: a ? { maxHeight: a, overflowY: "auto" } : void 0,
        children: [
          t.map((p) => {
            const x = e === p.id;
            return /* @__PURE__ */ w(
              "button",
              {
                type: "button",
                disabled: u,
                onClick: () => n(p.id),
                className: `ui-checklist-item ${d} ${x ? "ui-checklist-item-checked" : ""}`,
                children: [
                  /* @__PURE__ */ o("span", { className: `ui-radio-circle ${h}`, "aria-hidden": !0, children: x && /* @__PURE__ */ o("span", { className: "ui-radio-dot" }) }),
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
  const c = ae(), { refs: u, floatingStyles: s } = Bt({
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
          const d = (S = l.elements.floating.ownerDocument) == null ? void 0 : S.defaultView;
          if (!d) return {};
          const h = l.rects.reference, p = Math.max(h.x, 0), x = Math.max(h.y, 0), m = Math.min(h.x + h.width, d.innerWidth), k = Math.min(h.y + h.height, d.innerHeight);
          if (m <= p || k <= x) return {};
          const b = r === "left" ? m - (h.x + h.width) : r === "right" ? p - h.x : 0, D = r === "top" ? x - h.y : r === "bottom" ? k - (h.y + h.height) : 0;
          return { x: l.x + b, y: l.y + D };
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
          var k;
          const d = (k = l.elements.floating.ownerDocument) == null ? void 0 : k.defaultView;
          if (!d) return {};
          const h = l.rects.floating.width, p = l.rects.floating.height, x = Math.max(8, Math.min(l.x, d.innerWidth - h - 8)), m = Math.max(8, Math.min(l.y, d.innerHeight - p - 8));
          return { x, y: m };
        }
      }
    ],
    whileElementsMounted: Ht
  });
  return re(() => {
    n && u.setReference(n);
  }, [n, u]), /* @__PURE__ */ w(le, { children: [
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
  const n = fe(), r = ae(), [i, a] = W(!1), [c, u] = W({ x: 0, y: 0 }), s = $(null), l = () => {
    if (!s.current) return;
    const d = s.current.getBoundingClientRect();
    u({ x: d.left + d.width / 2, y: d.top });
  };
  return X(() => (i && r && (l(), r.addEventListener("scroll", l, !0)), () => r == null ? void 0 : r.removeEventListener("scroll", l, !0)), [i]), /* @__PURE__ */ w(
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
          /* @__PURE__ */ w(
            "div",
            {
              className: "fixed px-2.5 py-1.5 bg-zinc-900 text-white text-[10px] rounded shadow-xl whitespace-nowrap leading-relaxed max-w-xs border border-white/20",
              style: { left: c.x, top: c.y - 20, transform: "translate(-50%, -100%)", zIndex: 99999 },
              children: [
                t.split(`
• `).map((d, h) => /* @__PURE__ */ o("div", { className: h > 0 ? "mt-0.5 pt-0.5 border-t border-zinc-700" : "", children: d }, h)),
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
}) }), ro = ({ children: t }) => /* @__PURE__ */ w("div", { className: "flex items-center gap-2 min-w-max", children: [
  /* @__PURE__ */ o("span", { className: C ? "text-xs font-semibold text-zinc-500 uppercase tracking-wider" : "text-[9px] font-semibold text-zinc-500 uppercase tracking-wider", children: t }),
  /* @__PURE__ */ o("div", { className: "h-px bg-zinc-700/50", style: { minWidth: 24, flex: 1 } })
] }), Zn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-1", Qn = "text-[10px] font-medium text-zinc-500 uppercase tracking-wider w-28 shrink-0", oo = ({ label: t, children: e, tall: n }) => /* @__PURE__ */ w("div", { className: n ? "flex flex-col gap-1 py-0.5" : "flex items-center gap-2 py-0.5", children: [
  t && /* @__PURE__ */ o("span", { className: n ? Zn : Qn, children: t }),
  e
] }), io = ({ leading: t, trailing: e, className: n = "" }) => /* @__PURE__ */ w("div", { className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-zinc-700/40 border border-zinc-700/60 min-w-max ${n}`, children: [
  t,
  e && /* @__PURE__ */ o("div", { className: "ml-auto flex items-center gap-1", children: e })
] }), so = ({ readOnly: t, onDuplicate: e, onRemove: n, onMove: r, compact: i }) => /* @__PURE__ */ w(le, { children: [
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
  var h;
  const c = t.attrs.field ?? "", u = n.options, s = ((h = u.resolve) == null ? void 0 : h.call(u, c)) ?? null, l = (s == null ? void 0 : s.color) ?? or, d = (s == null ? void 0 : s.label) ?? `{{${c}}}`;
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
        var b;
        if (p.button !== 0 || !r.isEditable) return;
        p.preventDefault(), r.isFocused || r.commands.focus();
        const x = typeof a == "function" ? a() : null;
        if (x == null) return;
        const m = i.state.doc.resolve(x), k = m.nodeAfter;
        k && Ee.isSelectable(k) && i.dispatch(i.state.tr.setSelection(new Ee(m))), (b = u.onTokenClick) == null || b.call(u, c, p.currentTarget.getBoundingClientRect(), x);
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
  return X(() => {
    var a;
    const i = (a = r.current) == null ? void 0 : a.querySelector('[data-ac-active="1"]');
    i == null || i.scrollIntoView({ block: "nearest" });
  }, [e]), /* @__PURE__ */ o("div", { className: "ac-token-popover bg-zinc-950/95 backdrop-blur-md border border-zinc-800 rounded-lg shadow-2xl p-1 min-w-[220px] overflow-y-auto", style: { width: ar, maxHeight: lr, zIndex: 9999 }, onMouseDown: (i) => i.preventDefault(), children: /* @__PURE__ */ o("div", { ref: r, children: t.items.map((i, a) => /* @__PURE__ */ w(
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
          var h, p;
          if (!t) return;
          const l = (p = (h = t.props) == null ? void 0 : h.clientRect) == null ? void 0 : p.call(h), d = l && !s.endsWith("-end") ? l.width : 0;
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
  const h = $(c);
  h.current = c;
  const p = $(u);
  p.current = u;
  const x = $(s);
  x.current = s;
  const m = $(l);
  m.current = l;
  const k = $(null), b = $(null), D = $(e);
  D.current = e;
  const S = $(r);
  S.current = r;
  const R = $(a);
  R.current = a;
  const z = $(null), P = (N) => {
    var _;
    const T = {
      bold: N.isActive("bold"),
      italic: N.isActive("italic"),
      underline: N.isActive("underline"),
      strike: N.isActive("strike"),
      link: N.isActive("link"),
      color: N.getAttributes("textStyle").color || ""
    }, M = z.current;
    M && M.bold === T.bold && M.italic === T.italic && M.underline === T.underline && M.strike === T.strike && M.link === T.link && M.color === T.color || (z.current = T, (_ = R.current) == null || _.call(R, T));
  }, L = (N) => {
    var j;
    const T = N.state.selection;
    let M = null;
    T instanceof Ee && T.node.type.name === "token" ? (M = { key: T.node.attrs.field ?? "", pos: T.from }, k.current = T.from) : k.current != null && (k.current = N.state.tr.mapping.map(k.current));
    const _ = b.current, F = _ && M && _.key === M.key && _.pos === M.pos;
    !_ && !M || F || (b.current = M, (j = m.current) == null || j.call(m, M));
  }, K = (N) => {
    const T = rr(sr(N));
    return /^(<p[^>]*>(?:<br\s*\/?>)?<\/p>)+$/.test(T) ? "" : T;
  }, G = ye.useMemo(() => {
    const N = {
      char: "@",
      // default allowedPrefixes (space) — a mid-word `@` does not trigger
      items: ({ query: T }) => {
        var M;
        return ((M = p.current) == null ? void 0 : M.call(p, T)) ?? [];
      },
      command: ({ editor: T, range: M, props: _ }) => {
        T.chain().focus().insertContentAt(M, { type: "token", attrs: { field: _.field } }).run();
      },
      render: dr
    };
    return cr.configure({
      resolve: h.current ?? null,
      suggestion: N,
      onTokenClick: (T, M, _) => {
        var F;
        k.current = _, (F = x.current) == null || F.call(x, T, M, _);
      }
    });
  }, []), f = Gt({
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
      G
    ],
    content: lt(t || ""),
    editable: !r,
    onUpdate: ({ editor: N }) => {
      D.current(K(N.getHTML()));
    },
    // Every transaction — including storedMarks-only toggles with a collapsed
    // caret, which never reach `update` (doc unchanged) yet DO change what
    // the next keystroke applies. reportState skips unchanged values.
    onTransaction: ({ editor: N }) => {
      P(N), L(N);
    }
  });
  return X(() => {
    if (!f || f.isFocused) return;
    K(f.getHTML()) !== t && (z.current = null, f.commands.setContent(lt(t || ""), { emitUpdate: !1 }), P(f));
  }, [t, f]), X(() => {
    f && f.setEditable(!r);
  }, [r, f]), X(() => {
    f && (z.current = null, P(f), L(f));
  }, [f]), Mt(d, () => ({
    exec: (N, T) => {
      if (!(!f || S.current))
        switch (N) {
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
            T && f.chain().focus().setColor(T).run();
            break;
          case "unsetColor":
            f.chain().focus().unsetColor().run();
            break;
          case "link":
            T && f.chain().focus().extendMarkRange("link").setLink({ href: T }).run();
            break;
          case "unlink":
            f.chain().focus().extendMarkRange("link").unsetLink().run();
            break;
        }
    },
    focus: () => f == null ? void 0 : f.commands.focus(),
    insertToken: (N) => {
      !f || S.current || f.chain().focus().insertContent({ type: "token", attrs: { field: N } }).run();
    },
    replaceToken: (N) => {
      if (!f || S.current) return;
      const T = k.current;
      T != null && f.commands.command(({ tr: M }) => {
        const _ = M.doc.nodeAt(T);
        if (!_ || _.type.name !== "token") return !1;
        M.setNodeMarkup(T, void 0, { field: N });
        const F = M.doc.resolve(T);
        return F.nodeAfter && F.nodeAfter.type.name === "token" && M.setSelection(new Ee(F)), !0;
      });
    }
  }), [f]), /* @__PURE__ */ o(qt, { editor: f, className: `richtext-editor ${i || ""}` });
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
      trigger: /* @__PURE__ */ w("button", { type: "button", disabled: e, className: `${zt} disabled:pointer-events-none`, children: [
        /* @__PURE__ */ o("span", { className: "truncate", style: { fontFamily: t || "Helvetica" }, children: t || "Helvetica" }),
        /* @__PURE__ */ o(ht, { className: "w-3 h-3 text-zinc-500 shrink-0" })
      ] }),
      children: pr.map((a) => /* @__PURE__ */ o(mn, { onClick: () => {
        n(a), i(!1);
      }, icon: a === t ? /* @__PURE__ */ o(dt, { className: "w-3.5 h-3.5" }) : void 0, children: /* @__PURE__ */ o("span", { style: { fontFamily: a }, children: a }) }, a))
    }
  );
}, mr = ({ editorRef: t, disabled: e, active: n }) => {
  const [r, i] = W(!1), [a, c] = W(""), u = () => {
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
      children: /* @__PURE__ */ w("div", { className: "p-2 flex flex-col gap-2", children: [
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
        /* @__PURE__ */ w("div", { className: "flex items-center gap-2", children: [
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
  const [a, c] = W(!1), u = (d, h) => {
    var p;
    return (p = t.current) == null ? void 0 : p.exec(d, h);
  }, s = (d) => `${$t} ${d ? Ct : Tt}`, l = (d) => !!(r != null && r[d]);
  return /* @__PURE__ */ w("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.bold) || "Bold", children: /* @__PURE__ */ o("button", { "aria-label": "Bold", disabled: e || l("bold"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("bold"), className: `${s(((n == null ? void 0 : n.bold) ?? !1) || l("bold"))} font-bold`, children: "B" }) }),
    /* @__PURE__ */ o(xe, { content: (r == null ? void 0 : r.italic) || "Italic", children: /* @__PURE__ */ o("button", { "aria-label": "Italic", disabled: e || l("italic"), onMouseDown: (d) => d.preventDefault(), onClick: () => u("italic"), className: `${s(((n == null ? void 0 : n.italic) ?? !1) || l("italic"))} italic`, children: "I" }) }),
    /* @__PURE__ */ o(xe, { content: "Underline", children: /* @__PURE__ */ o("button", { "aria-label": "Underline", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("underline"), className: s((n == null ? void 0 : n.underline) ?? !1), children: /* @__PURE__ */ o(Ot, { className: "w-3 h-3" }) }) }),
    /* @__PURE__ */ o(xe, { content: "Strikethrough", children: /* @__PURE__ */ o("button", { "aria-label": "Strikethrough", disabled: e, onMouseDown: (d) => d.preventDefault(), onClick: () => u("strikeThrough"), className: s((n == null ? void 0 : n.strike) ?? !1), children: /* @__PURE__ */ o(It, { className: "w-3 h-3" }) }) }),
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
        trigger: /* @__PURE__ */ w("button", { type: "button", disabled: e, className: `${zt} disabled:pointer-events-none`, title: "Text color", children: [
          n != null && n.color ? /* @__PURE__ */ o("span", { className: "w-3 h-3 rounded-full border border-zinc-600 shrink-0", style: { background: n.color } }) : /* @__PURE__ */ o(at, {}),
          /* @__PURE__ */ o(ht, { className: "w-3 h-3 text-zinc-500" })
        ] }),
        children: /* @__PURE__ */ w("div", { className: "grid grid-cols-4 gap-1 p-2", children: [
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
    i && /* @__PURE__ */ w(le, { children: [
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
