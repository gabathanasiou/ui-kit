"use client";
import * as n from "react";
import { createPortal as J } from "react-dom";
import { s as Q, i as w, a as U, b as Z, T as ee, C as te, m as ne } from "./index-y-4vg-Jo.js";
const re = () => (t) => t.targetX, ie = () => (t) => t.targetY, se = () => (t) => t.targetWidth, ae = () => (t) => t.targetHeight, oe = () => (t) => t.targetY + 10, de = () => (t) => Math.max(0, (t.targetHeight - 28) / 2), le = /* @__PURE__ */ Q("div")({
  name: "DataGridOverlayEditorStyle",
  class: "gdg-d19meir1",
  propsAsIs: !1,
  vars: {
    "d19meir1-0": [ie(), "px"],
    "d19meir1-1": [re(), "px"],
    "d19meir1-2": [se(), "px"],
    "d19meir1-3": [ae(), "px"],
    "d19meir1-4": [oe(), "px"],
    "d19meir1-5": [de(), "px"]
  }
});
function ue() {
  const [t, s] = n.useState();
  return [t ?? void 0, s];
}
function ce() {
  const [t, s] = ue(), [i, x] = n.useState(0), [y, S] = n.useState(!0);
  n.useLayoutEffect(() => {
    if (t === void 0 || !("IntersectionObserver" in window))
      return;
    const a = new IntersectionObserver((d) => {
      d.length !== 0 && S(d[0].isIntersecting);
    }, { threshold: 1 });
    return a.observe(t), () => a.disconnect();
  }, [t]), n.useEffect(() => {
    if (y || t === void 0)
      return;
    let a;
    const d = () => {
      const { right: R } = t.getBoundingClientRect();
      x((o) => Math.min(o + window.innerWidth - R - 10, 0)), a = requestAnimationFrame(d);
    };
    return a = requestAnimationFrame(d), () => {
      a !== void 0 && cancelAnimationFrame(a);
    };
  }, [t, y]);
  const k = n.useMemo(() => ({ transform: `translateX(${i}px)` }), [i]);
  return {
    ref: s,
    style: k
  };
}
const me = (t) => {
  const { target: s, content: i, onFinishEditing: x, forceEditMode: y, initialValue: S, imageEditorOverride: k, markdownDivCreateNode: a, highlight: d, className: R, theme: o, id: W, cell: E, bloom: f, portalElementRef: v, validateCell: l, getCellRenderer: T, provideEditor: C, isOutsideClick: A, customEventTarget: K, activation: D } = t, [u, X] = n.useState(y ? i : void 0), I = n.useRef(u ?? i);
  I.current = u ?? i;
  const [O, P] = n.useState(() => l === void 0 ? !0 : !(w(i) && (l == null ? void 0 : l(E, i, I.current)) === !1)), g = n.useCallback((e, r) => {
    x(O ? e : void 0, r);
  }, [O, x]), j = n.useCallback((e) => {
    if (l !== void 0 && e !== void 0 && w(e)) {
      const r = l(E, e, I.current);
      r === !1 ? P(!1) : (typeof r == "object" && (e = r), P(!0));
    }
    X(e);
  }, [E, l]), b = n.useRef(!1), m = n.useRef(void 0), L = n.useCallback(() => {
    g(u, [0, 0]), b.current = !0;
  }, [u, g]), Y = n.useCallback((e, r) => {
    g(e, r ?? m.current ?? [0, 0]), b.current = !0;
  }, [g]), $ = n.useCallback(async (e) => {
    let r = !1;
    e.key === "Escape" ? (e.stopPropagation(), e.preventDefault(), m.current = [0, 0]) : e.key === "Enter" && // The shift key is reserved for multi-line editing
    // to allow inserting new lines without closing the editor.
    !e.shiftKey ? (e.stopPropagation(), e.preventDefault(), m.current = [0, 1], r = !0) : e.key === "Tab" && (e.stopPropagation(), e.preventDefault(), m.current = [e.shiftKey ? -1 : 1, 0], r = !0), window.setTimeout(() => {
      !b.current && m.current !== void 0 && (g(r ? u : void 0, m.current), b.current = !0);
    }, 0);
  }, [g, u]), _ = u ?? i, [c, q] = n.useMemo(() => {
    var h, G;
    if (U(i))
      return [];
    const e = { ...i, location: E, activation: D }, r = C == null ? void 0 : C(e);
    return r !== void 0 ? [r, !1] : [(G = (h = T(i)) == null ? void 0 : h.provideEditor) == null ? void 0 : G.call(h, e), !1];
  }, [E, i, T, C, D]), { ref: B, style: z } = ce();
  let M = !0, H, N = !0, p;
  if (c !== void 0) {
    M = c.disablePadding !== !0, N = c.disableStyling !== !0;
    const e = Z(c);
    e && (p = c.styleOverride);
    const r = e ? c.editor : c;
    H = n.createElement(r, { portalElementRef: v, isHighlighted: d, activation: D, onChange: j, value: _, initialValue: S, onFinishedEditing: Y, validatedSelection: w(_) ? _.selectionRange : void 0, forceEditMode: y, target: s, imageEditorOverride: k, markdownDivCreateNode: a, isValid: O, theme: o });
  }
  p = { ...p, ...z };
  {
    const r = (parseFloat(o.editorFontSize) || 12) * (typeof o.lineHeight == "number" ? o.lineHeight : 1.4), h = Math.max(0, (s.height - r) / 2);
    p = { ...p, "--fork-editor-top": `${h}px`, height: `${s.height}px` };
  }
  const V = (v == null ? void 0 : v.current) ?? document.getElementById("portal");
  if (V === null)
    return console.error('Cannot open Data Grid overlay editor, because portal not found. Please, either provide a portalElementRef or add `<div id="portal" />` as the last child of your `<body>`.'), null;
  let F = N ? "gdg-style" : "gdg-unstyle";
  return O || (F += " gdg-invalid"), M && (F += " gdg-pad"), f == null || f[0], f == null || f[1], J(n.createElement(
    ee.Provider,
    { value: o },
    n.createElement(
      te,
      { style: ne(o), className: R, onClickOutside: L, isOutsideClick: A, customEventTarget: K },
      n.createElement(
        le,
        {
          ref: B,
          id: W,
          className: F,
          style: p,
          as: q === !0 ? "label" : void 0,
          /* fork: exactly the cell rect — no bloom offset */
          targetX: s.x,
          targetY: s.y,
          targetWidth: s.width,
          targetHeight: s.height
        },
        n.createElement("div", { className: "gdg-clip-region", onKeyDown: $ }, H)
      )
    )
  ), V);
};
export {
  me as default
};
