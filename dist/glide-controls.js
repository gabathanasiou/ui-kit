import { GridCellKind as k, drawTextCell as N } from "@glideapps/glide-data-grid";
function P(t) {
  const e = t.bgCell.replace("#", "");
  if (e.length !== 6) return t.textDark === "#ffffff";
  const n = parseInt(e, 16);
  return (0.2126 * (n >> 16 & 255) + 0.7152 * (n >> 8 & 255) + 0.0722 * (n & 255)) / 255 < 0.5;
}
function A(t, e, n, i, o, a) {
  t.save(), t.strokeStyle = a, t.lineWidth = Math.max(1.25, o / 10), t.lineCap = "round", t.lineJoin = "round";
  const r = o / 2, h = n + r, u = i + r;
  if (t.beginPath(), e === "plus")
    t.moveTo(n + o * 0.15, u), t.lineTo(n + o * 0.85, u), t.moveTo(h, i + o * 0.15), t.lineTo(h, i + o * 0.85);
  else if (e === "trash") {
    const l = i + o * 0.28;
    t.moveTo(n + o * 0.16, l), t.lineTo(n + o * 0.84, l), t.moveTo(n + o * 0.3, l), t.lineTo(n + o * 0.34, i + o * 0.14), t.lineTo(n + o * 0.66, i + o * 0.14), t.lineTo(n + o * 0.7, l), t.moveTo(n + o * 0.26, l), t.lineTo(n + o * 0.32, i + o * 0.86), t.lineTo(n + o * 0.68, i + o * 0.86), t.lineTo(n + o * 0.74, l);
  } else if (e === "chevron")
    t.moveTo(n + o * 0.35, i + o * 0.24), t.lineTo(n + o * 0.62, u), t.lineTo(n + o * 0.35, i + o * 0.76);
  else if (e === "search") {
    const l = o * 0.28;
    t.arc(h - o * 0.06, u - o * 0.06, l, 0, Math.PI * 2), t.moveTo(h + l * 0.45, u + l * 0.45), t.lineTo(n + o * 0.86, i + o * 0.86);
  } else
    t.moveTo(n + o * 0.18, u), t.lineTo(n + o * 0.42, i + o * 0.74), t.lineTo(n + o * 0.84, i + o * 0.28);
  t.stroke(), t.restore();
}
const S = 24, K = 28, E = 90;
function w(t, e, n) {
  if (n === "full") return t >= 0 && t <= e;
  if (!Number.isFinite(t) || e <= 0) return !1;
  const i = e - Math.max(0, n);
  return t >= i && t <= e;
}
function U(t) {
  const { align: e, ...n } = t;
  return {
    kind: k.Custom,
    allowOverlay: !0,
    readonly: !1,
    copyData: n.label ?? n.value,
    contentAlign: e,
    data: { kind: "kit-picker", ...n }
  };
}
function V(t) {
  return {
    kind: k.Custom,
    allowOverlay: !1,
    readonly: !0,
    copyData: t.label,
    data: { kind: "kit-glyph", lane: K, ...t }
  };
}
function Z(t) {
  return {
    kind: k.Custom,
    allowOverlay: !1,
    readonly: !0,
    copyData: t.buttons.map((e) => e.label).join(" / "),
    data: { kind: "kit-glyph-group", lane: K, ...t }
  };
}
function y(t) {
  var n;
  const e = (n = t == null ? void 0 : t.data) == null ? void 0 : n.kind;
  return e === "kit-picker" || e === "kit-glyph" || e === "kit-glyph-group" ? e : void 0;
}
function $(t) {
  return y(t) === "kit-picker";
}
function B(t) {
  return y(t) === "kit-glyph";
}
function _(t) {
  return y(t) === "kit-glyph-group";
}
function X(t) {
  return y(t) !== void 0;
}
const v = /* @__PURE__ */ new Map();
function C(t, e) {
  return `${e ?? ""}#${t}`;
}
function x(t, e) {
  v.set(C(t[1], e), performance.now());
}
function G(t, e, n, i) {
  const o = C(t, e), a = v.get(o);
  if (a === void 0) return 0;
  const r = n - a;
  return r >= E || r < -1e3 ? (v.delete(o), 0) : (i(), 1 - Math.max(0, r) / E);
}
function R(t, e) {
  const n = e === "full" ? t.width : Math.min(t.width, Math.max(0, e));
  return { x: t.x + t.width - n, y: t.y, width: n, height: t.height };
}
function q(t, e) {
  return /^#[0-9a-f]{6}$/i.test(t) ? `${t}${Math.round(Math.max(0, Math.min(1, e)) * 255).toString(16).padStart(2, "0")}` : t;
}
function D(t, e, n) {
  return t === "danger" ? n ? "rgba(248,113,113,0.24)" : "rgba(220,38,38,0.14)" : t === "accent" ? q(e.accentColor, 0.14) : n ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.055)";
}
const T = 1;
function g(t, e, n, i = 1) {
  const o = e.width - T * 2, a = e.height - T * 2;
  o <= 0 || a <= 0 || (t.save(), t.globalAlpha = i, t.fillStyle = n, t.fillRect(e.x + T, e.y + T, o, a), t.restore());
}
function H(t, e, n, i) {
  i <= 0 || g(t, e, n ? "#ffffff" : "#000000", (n ? 0.16 : 0.1) * i);
}
function O(t, e, n, i) {
  return t === "danger" ? n ? i ? "#fca5a5" : "#f87171" : i ? "#b91c1c" : "#dc2626" : t === "accent" ? e.accentColor : i ? e.textDark : e.textMedium;
}
function I(t, e, n, i) {
  if (i === void 0 || n <= 0 || e <= 0 || i < t || i > t + e) return -1;
  const o = e / n;
  return o <= 0 ? -1 : Math.min(n - 1, Math.max(0, Math.floor((i - t) / o)));
}
function F(t, e) {
  return e === "full" ? 0 : t - Math.min(t, Math.max(0, e));
}
function j(t, e, n) {
  const i = t.width / e;
  return { x: t.x + i * n, y: t.y, width: i, height: t.height };
}
const J = {
  kind: k.Custom,
  isMatch: $,
  needsHover: !0,
  needsHoverPosition: !0,
  draw: (t, e) => {
    var p;
    const { ctx: n, rect: i, theme: o, hoverX: a } = t, r = e.data, h = P(o), u = R(i, S), l = Math.max(0, i.width - u.width), d = a !== void 0 && w(a, i.width, S), c = G(t.row, r.label, t.frameTime, t.requestAnimationFrame);
    if (l > 0) {
      n.save(), n.beginPath(), n.rect(i.x, i.y, l, i.height), n.clip();
      const b = r.value || r.placeholder || "";
      N(
        {
          ...t,
          rect: { ...i, width: l },
          // A placeholder is the grid's faint text, not the value colour.
          theme: r.value ? o : { ...o, textDark: o.textLight }
        },
        b,
        e.contentAlign
      ), n.restore();
    }
    d && g(n, u, r.hoverBg ?? D("neutral", o, h)), H(n, u, h, c);
    const s = Math.max(10, Math.min(14, i.height - 14)), f = u.x + u.width / 2, m = i.y + i.height / 2;
    n.save(), n.translate(f, m), n.rotate(Math.PI / 2), A(n, "chevron", -s / 2, -s / 2, s, d ? o.textDark : o.textMedium), n.restore(), a !== void 0 && ((p = t.overrideCursor) == null || p.call(t, d ? "pointer" : "default"));
  },
  onClick: ({ cell: t, posX: e, bounds: n, preventDefault: i, location: o }) => {
    var a, r;
    w(e, n.width, S) && (v.set(C(o[1], t.data.label), performance.now()), (r = (a = t.data).onOpen) == null || r.call(a), i());
  }
}, W = {
  kind: k.Custom,
  isMatch: B,
  needsHover: !0,
  needsHoverPosition: !0,
  draw: (t, e) => {
    var m;
    const { ctx: n, rect: i, theme: o, hoverX: a } = t, r = e.data, h = P(o), u = r.lane ?? "full", l = R(i, u), d = a !== void 0 && w(a, i.width, u), c = d || t.highlighted, s = G(t.row, r.label, t.frameTime, t.requestAnimationFrame);
    c && g(n, l, r.hoverBg ?? D(r.tone, o, h)), H(n, l, h, s);
    const f = Math.max(12, Math.min(16, i.height - 12));
    A(
      n,
      r.icon,
      l.x + (l.width - f) / 2,
      i.y + (i.height - f) / 2,
      f,
      O(r.tone, o, h, c)
    ), a !== void 0 && ((m = t.overrideCursor) == null || m.call(t, d ? "pointer" : "default"));
  },
  onClick: ({ cell: t, posX: e, bounds: n, preventDefault: i, location: o }) => {
    var r, h;
    const a = t.data.lane ?? "full";
    w(e, n.width, a) && (v.set(C(o[1], t.data.label), performance.now()), (h = (r = t.data).onActivate) == null || h.call(r), i());
  }
}, Y = {
  kind: k.Custom,
  isMatch: _,
  needsHover: !0,
  needsHoverPosition: !0,
  draw: (t, e) => {
    var s;
    const { ctx: n, rect: i, theme: o, hoverX: a } = t, r = e.data, h = P(o), u = r.lane ?? "full", l = R(i, u), d = Math.max(1, r.buttons.length), c = I(F(i.width, u), l.width, d, a);
    r.buttons.forEach((f, m) => {
      const p = j(l, d, m), b = G(t.row, f.label, t.frameTime, t.requestAnimationFrame), L = m === c || t.highlighted && m === 0;
      L && g(n, p, f.hoverBg ?? D(f.tone, o, h)), H(n, p, h, b);
      const M = Math.max(10, Math.min(16, Math.min(p.width - 8, i.height - 12)));
      M <= 0 || A(
        n,
        f.icon,
        p.x + (p.width - M) / 2,
        i.y + (i.height - M) / 2,
        M,
        O(f.tone, o, h, L)
      );
    }), a !== void 0 && ((s = t.overrideCursor) == null || s.call(t, c >= 0 ? "pointer" : "default"));
  },
  onClick: ({ cell: t, posX: e, bounds: n, preventDefault: i, location: o }) => {
    var c;
    const a = t.data, r = a.lane ?? "full";
    if (!w(e, n.width, r)) return;
    const h = F(n.width, r), u = n.width - h, l = I(h, u, Math.max(1, a.buttons.length), e);
    if (l < 0) return;
    const d = a.buttons[l];
    v.set(C(o[1], d.label), performance.now()), (c = d.onActivate) == null || c.call(d), i();
  }
}, z = [
  J,
  W,
  Y
];
export {
  S as CONTROL_LANE,
  K as GLYPH_LANE,
  E as PRESS_MS,
  z as controlCellRenderers,
  X as isControlCell,
  w as isControlHit,
  B as isKitGlyphCell,
  _ as isKitGlyphGroupCell,
  $ as isKitPickerCell,
  V as kitGlyphCell,
  Z as kitGlyphGroupCell,
  U as kitPickerCell,
  x as pressControlCell
};
