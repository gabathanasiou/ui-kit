"use client";
import * as ie from "react";
import X, { useRef as Y, useState as ye, useEffect as oe, useMemo as je, useLayoutEffect as Me } from "react";
import { s as Le } from "./index-IV4ENfRH.js";
const ke = /* @__PURE__ */ Le("div")({
  name: "NumberOverlayEditorStyle",
  class: "gdg-n15fjm3e",
  propsAsIs: !1
});
function be(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var a = 0, n = Object.getOwnPropertySymbols(e); a < n.length; a++)
      t.indexOf(n[a]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[a]) && (r[n[a]] = e[n[a]]);
  return r;
}
var ee;
(function(e) {
  e.event = "event", e.props = "prop";
})(ee || (ee = {}));
function Z() {
}
function Pe(e) {
  var t, r = void 0;
  return function() {
    for (var n = [], a = arguments.length; a--; ) n[a] = arguments[a];
    return t && n.length === t.length && n.every(function(i, l) {
      return i === t[l];
    }) || (t = n, r = e.apply(void 0, n)), r;
  };
}
function ae(e) {
  return !!(e || "").match(/\d/);
}
function q(e) {
  return e == null;
}
function Ke(e) {
  return typeof e == "number" && isNaN(e);
}
function Ve(e) {
  return q(e) || Ke(e) || typeof e == "number" && !isFinite(e);
}
function Ne(e) {
  return e.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
}
function We(e) {
  switch (e) {
    case "lakh":
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case "wan":
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case "thousand":
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}
function Ue(e, t, r) {
  var n = We(r), a = e.search(/[1-9]/);
  return a = a === -1 ? e.length : a, e.substring(0, a) + e.substring(a, e.length).replace(n, "$1" + t);
}
function me(e) {
  var t = Y(e);
  t.current = e;
  var r = Y(function() {
    for (var n = [], a = arguments.length; a--; ) n[a] = arguments[a];
    return t.current.apply(t, n);
  });
  return r.current;
}
function de(e, t) {
  t === void 0 && (t = !0);
  var r = e[0] === "-", n = r && t;
  e = e.replace("-", "");
  var a = e.split("."), i = a[0], l = a[1] || "";
  return {
    beforeDecimal: i,
    afterDecimal: l,
    hasNegation: r,
    addNegation: n
  };
}
function $e(e) {
  if (!e)
    return e;
  var t = e[0] === "-";
  t && (e = e.substring(1, e.length));
  var r = e.split("."), n = r[0].replace(/^0+/, "") || "0", a = r[1] || "";
  return (t ? "-" : "") + n + (a ? "." + a : "");
}
function we(e, t, r) {
  for (var n = "", a = r ? "0" : "", i = 0; i <= t - 1; i++)
    n += e[i] || a;
  return n;
}
function he(e, t) {
  return Array(t + 1).join(e);
}
function De(e) {
  var t = e + "", r = t[0] === "-" ? "-" : "";
  r && (t = t.substring(1));
  var n = t.split(/[eE]/g), a = n[0], i = n[1];
  if (i = Number(i), !i)
    return r + a;
  a = a.replace(".", "");
  var l = 1 + i, p = a.length;
  return l < 0 ? a = "0." + he("0", Math.abs(l)) + a : l >= p ? a = a + he("0", l - p) : a = (a.substring(0, l) || "0") + "." + a.substring(l), r + a;
}
function Se(e, t, r) {
  if (["", "-"].indexOf(e) !== -1)
    return e;
  var n = (e.indexOf(".") !== -1 || r) && t, a = de(e), i = a.beforeDecimal, l = a.afterDecimal, p = a.hasNegation, m = parseFloat("0." + (l || "0")), x = l.length <= t ? "0." + l : m.toFixed(t), h = x.split("."), s = i;
  i && Number(h[0]) && (s = i.split("").reverse().reduce(function(I, C, g) {
    return I.length > g ? (Number(I[0]) + Number(C)).toString() + I.substring(1, I.length) : C + I;
  }, h[0]));
  var S = we(h[1] || "", t, r), y = p ? "-" : "", f = n ? "." : "";
  return "" + y + s + f + S;
}
function H(e, t) {
  if (e.value = e.value, e !== null) {
    if (e.createTextRange) {
      var r = e.createTextRange();
      return r.move("character", t), r.select(), !0;
    }
    return e.selectionStart || e.selectionStart === 0 ? (e.focus(), e.setSelectionRange(t, t), !0) : (e.focus(), !1);
  }
}
var Ie = Pe(function(e, t) {
  for (var r = 0, n = 0, a = e.length, i = t.length; e[r] === t[r] && r < a; )
    r++;
  for (; e[a - 1 - n] === t[i - 1 - n] && i - n > r && a - n > r; )
    n++;
  return {
    from: { start: r, end: a - n },
    to: { start: r, end: i - n }
  };
}), Ge = function(e, t) {
  var r = Math.min(e.selectionStart, t);
  return {
    from: { start: r, end: e.selectionEnd },
    to: { start: r, end: t }
  };
};
function Ze(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
function ve(e) {
  return Math.max(e.selectionStart, e.selectionEnd);
}
function qe() {
  return typeof navigator < "u" && !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}
function ze(e) {
  return {
    from: {
      start: 0,
      end: 0
    },
    to: {
      start: 0,
      end: e.length
    },
    lastValue: ""
  };
}
function He(e) {
  var t = e.currentValue, r = e.formattedValue, n = e.currentValueIndex, a = e.formattedValueIndex;
  return t[n] === r[a];
}
function Je(e, t, r, n, a, i, l) {
  l === void 0 && (l = He);
  var p = a.findIndex(function(L) {
    return L;
  }), m = e.slice(0, p);
  !t && !r.startsWith(m) && (t = m, r = m + r, n = n + m.length);
  for (var x = r.length, h = e.length, s = {}, S = new Array(x), y = 0; y < x; y++) {
    S[y] = -1;
    for (var f = 0, I = h; f < I; f++) {
      var C = l({
        currentValue: r,
        lastValue: t,
        formattedValue: e,
        currentValueIndex: y,
        formattedValueIndex: f
      });
      if (C && s[f] !== !0) {
        S[y] = f, s[f] = !0;
        break;
      }
    }
  }
  for (var g = n; g < x && (S[g] === -1 || !i(r[g])); )
    g++;
  var T = g === x || S[g] === -1 ? h : S[g];
  for (g = n - 1; g > 0 && S[g] === -1; )
    g--;
  var B = g === -1 || S[g] === -1 ? 0 : S[g] + 1;
  return B > T ? T : n - B < T - n ? B : T;
}
function pe(e, t, r, n) {
  var a = e.length;
  if (t = Ze(t, 0, a), n === "left") {
    for (; t >= 0 && !r[t]; )
      t--;
    t === -1 && (t = r.indexOf(!0));
  } else {
    for (; t <= a && !r[t]; )
      t++;
    t > a && (t = r.lastIndexOf(!0));
  }
  return t === -1 && (t = a), t;
}
function Qe(e) {
  for (var t = Array.from({ length: e.length + 1 }).map(function() {
    return !0;
  }), r = 0, n = t.length; r < n; r++)
    t[r] = !!(ae(e[r]) || ae(e[r - 1]));
  return t;
}
function Ce(e, t, r, n, a, i) {
  i === void 0 && (i = Z);
  var l = me(function(f, I) {
    var C, g;
    return Ve(f) ? (g = "", C = "") : typeof f == "number" || I ? (g = typeof f == "number" ? De(f) : f, C = n(g)) : (g = a(f, void 0), C = n(g)), { formattedValue: C, numAsString: g };
  }), p = ye(function() {
    return l(q(e) ? t : e, r);
  }), m = p[0], x = p[1], h = me(function(f, I) {
    f.formattedValue !== m.formattedValue && x({
      formattedValue: f.formattedValue,
      numAsString: f.value
    }), i(f, I);
  }), s = e, S = r;
  q(e) && (s = m.numAsString, S = !0);
  var y = l(s, S);
  return je(function() {
    x(y);
  }, [y.formattedValue]), oe(function() {
    if (!q(t) && q(e) && m.formattedValue !== "") {
      var f = parseFloat(m.numAsString);
      h({
        formattedValue: m.formattedValue,
        value: m.numAsString,
        floatValue: isNaN(f) ? void 0 : f
      }, { event: void 0, source: ee.props });
    }
  }, []), [m, h];
}
function Xe(e) {
  return e.replace(/[^0-9]/g, "");
}
function Ye(e) {
  return e;
}
function et(e) {
  var t = e.type;
  t === void 0 && (t = "text");
  var r = e.displayType;
  r === void 0 && (r = "input");
  var n = e.customInput, a = e.renderText, i = e.getInputRef, l = e.format;
  l === void 0 && (l = Ye);
  var p = e.removeFormatting;
  p === void 0 && (p = Xe);
  var m = e.defaultValue, x = e.valueIsNumericString, h = e.onValueChange, s = e.isAllowed, S = e.onChange;
  S === void 0 && (S = Z);
  var y = e.onKeyDown;
  y === void 0 && (y = Z);
  var f = e.onMouseUp;
  f === void 0 && (f = Z);
  var I = e.onFocus;
  I === void 0 && (I = Z);
  var C = e.onBlur;
  C === void 0 && (C = Z);
  var g = e.value, T = e.getCaretBoundary;
  T === void 0 && (T = Qe);
  var B = e.isValidInputCharacter;
  B === void 0 && (B = ae);
  var L = e.isCharacterSame, _ = be(e, ["type", "displayType", "customInput", "renderText", "getInputRef", "format", "removeFormatting", "defaultValue", "valueIsNumericString", "onValueChange", "isAllowed", "onChange", "onKeyDown", "onMouseUp", "onFocus", "onBlur", "value", "getCaretBoundary", "isValidInputCharacter", "isCharacterSame"]), z = Ce(g, m, !!x, l, p, h), k = z[0], V = k.formattedValue, j = k.numAsString, K = z[1], M = Y(), W = Y({ formattedValue: V, numAsString: j }), U = function(o, u) {
    W.current = { formattedValue: o.formattedValue, numAsString: o.value }, K(o, u);
  }, J = ye(!1), te = J[0], d = J[1], c = Y(null), N = Y({
    setCaretTimeout: null,
    focusTimeout: null
  });
  oe(function() {
    return d(!0), function() {
      clearTimeout(N.current.setCaretTimeout), clearTimeout(N.current.focusTimeout);
    };
  }, []);
  var A = l, O = function(o, u) {
    var v = parseFloat(u);
    return {
      formattedValue: o,
      value: u,
      floatValue: isNaN(v) ? void 0 : v
    };
  }, E = function(o, u, v) {
    o.selectionStart === 0 && o.selectionEnd === o.value.length || (H(o, u), N.current.setCaretTimeout = setTimeout(function() {
      o.value === v && o.selectionStart !== u && H(o, u);
    }, 0));
  }, R = function(o, u, v) {
    return pe(o, u, T(o), v);
  }, Q = function(o, u, v) {
    var w = T(u), F = Je(u, V, o, v, w, B, L);
    return F = pe(u, F, w), F;
  }, le = function(o) {
    var u = o.formattedValue;
    u === void 0 && (u = "");
    var v = o.input, w = o.source, F = o.event, D = o.numAsString, b;
    if (v) {
      var P = o.inputValue || v.value, $ = ve(v);
      v.value = u, b = Q(P, u, $), b !== void 0 && E(v, b, u);
    }
    u !== V && U(O(u, D), { event: F, source: w });
  };
  oe(function() {
    var o = W.current, u = o.formattedValue, v = o.numAsString;
    (V !== u || j !== v) && U(O(V, j), {
      event: void 0,
      source: ee.props
    });
  }, [V, j]);
  var re = c.current ? ve(c.current) : void 0, ne = typeof window < "u" ? Me : oe;
  ne(function() {
    var o = c.current;
    if (V !== W.current.formattedValue && o) {
      var u = Q(W.current.formattedValue, V, re);
      o.value = V, E(o, u, V);
    }
  }, [V]);
  var fe = function(o, u, v) {
    var w = u.target, F = M.current ? Ge(M.current, w.selectionEnd) : Ie(V, o), D = Object.assign(Object.assign({}, F), { lastValue: V }), b = p(o, D), P = A(b);
    if (b = p(P, void 0), s && !s(O(P, b))) {
      var $ = u.target, G = ve($), se = Q(o, V, G);
      return $.value = V, E($, se, V), !1;
    }
    return le({
      formattedValue: P,
      numAsString: b,
      inputValue: o,
      event: u,
      source: v,
      input: u.target
    }), !0;
  }, ce = function(o, u) {
    u === void 0 && (u = 0);
    var v = o.selectionStart, w = o.selectionEnd;
    M.current = { selectionStart: v, selectionEnd: w + u };
  }, Ae = function(o) {
    var u = o.target, v = u.value, w = fe(v, o, ee.event);
    w && S(o), M.current = void 0;
  }, Oe = function(o) {
    var u = o.target, v = o.key, w = u.selectionStart, F = u.selectionEnd, D = u.value;
    D === void 0 && (D = "");
    var b;
    v === "ArrowLeft" || v === "Backspace" ? b = Math.max(w - 1, 0) : v === "ArrowRight" ? b = Math.min(w + 1, D.length) : v === "Delete" && (b = w);
    var P = 0;
    v === "Delete" && w === F && (P = 1);
    var $ = v === "ArrowLeft" || v === "ArrowRight";
    if (b === void 0 || w !== F && !$) {
      y(o), ce(u, P);
      return;
    }
    var G = b;
    if ($) {
      var se = v === "ArrowLeft" ? "left" : "right";
      G = R(D, b, se), G !== b && o.preventDefault();
    } else v === "Delete" && !B(D[b]) ? G = R(D, b, "right") : v === "Backspace" && !B(D[b]) && (G = R(D, b, "left"));
    G !== b && E(u, G, D), y(o), ce(u, P);
  }, Re = function(o) {
    var u = o.target, v = function() {
      var w = u.selectionStart, F = u.selectionEnd, D = u.value;
      if (D === void 0 && (D = ""), w === F) {
        var b = R(D, w);
        b !== w && E(u, b, D);
      }
    };
    v(), requestAnimationFrame(function() {
      v();
    }), f(o), ce(u);
  }, Te = function(o) {
    o.persist && o.persist();
    var u = o.target, v = o.currentTarget;
    c.current = u, N.current.focusTimeout = setTimeout(function() {
      var w = u.selectionStart, F = u.selectionEnd, D = u.value;
      D === void 0 && (D = "");
      var b = R(D, w);
      b !== w && !(w === 0 && F === D.length) && E(u, b, D), I(Object.assign(Object.assign({}, o), { currentTarget: v }));
    }, 0);
  }, Be = function(o) {
    c.current = null, clearTimeout(N.current.focusTimeout), clearTimeout(N.current.setCaretTimeout), C(o);
  }, Fe = te && qe() ? "numeric" : void 0, ge = Object.assign({ inputMode: Fe }, _, {
    type: t,
    value: V,
    onChange: Ae,
    onKeyDown: Oe,
    onMouseUp: Re,
    onFocus: Te,
    onBlur: Be
  });
  if (r === "text")
    return a ? X.createElement(X.Fragment, null, a(V, _) || null) : X.createElement("span", Object.assign({}, _, { ref: i }), V);
  if (n) {
    var _e = n;
    return X.createElement(_e, Object.assign({}, ge, { ref: i }));
  }
  return X.createElement("input", Object.assign({}, ge, { ref: i }));
}
function xe(e, t) {
  var r = t.decimalScale, n = t.fixedDecimalScale, a = t.prefix;
  a === void 0 && (a = "");
  var i = t.suffix;
  i === void 0 && (i = "");
  var l = t.allowNegative, p = t.thousandsGroupStyle;
  if (p === void 0 && (p = "thousand"), e === "" || e === "-")
    return e;
  var m = ue(t), x = m.thousandSeparator, h = m.decimalSeparator, s = r !== 0 && e.indexOf(".") !== -1 || r && n, S = de(e, l), y = S.beforeDecimal, f = S.afterDecimal, I = S.addNegation;
  return r !== void 0 && (f = we(f, r, !!n)), x && (y = Ue(y, x, p)), a && (y = a + y), i && (f = f + i), I && (y = "-" + y), e = y + (s && h || "") + f, e;
}
function ue(e) {
  var t = e.decimalSeparator;
  t === void 0 && (t = ".");
  var r = e.thousandSeparator, n = e.allowedDecimalSeparators;
  return r === !0 && (r = ","), n || (n = [t, "."]), {
    decimalSeparator: t,
    thousandSeparator: r,
    allowedDecimalSeparators: n
  };
}
function tt(e, t) {
  e === void 0 && (e = "");
  var r = new RegExp("(-)"), n = new RegExp("(-)(.)*(-)"), a = r.test(e), i = n.test(e);
  return e = e.replace(/-/g, ""), a && !i && t && (e = "-" + e), e;
}
function rt(e, t) {
  return new RegExp("(^-)|[0-9]|" + Ne(e), "g");
}
function at(e, t, r) {
  return e === "" ? !0 : !(t != null && t.match(/\d/)) && !(r != null && r.match(/\d/)) && typeof e == "string" && !isNaN(Number(e));
}
function nt(e, t, r) {
  var n;
  t === void 0 && (t = ze(e));
  var a = r.allowNegative, i = r.prefix;
  i === void 0 && (i = "");
  var l = r.suffix;
  l === void 0 && (l = "");
  var p = r.decimalScale, m = t.from, x = t.to, h = x.start, s = x.end, S = ue(r), y = S.allowedDecimalSeparators, f = S.decimalSeparator, I = e[s] === f;
  if (ae(e) && (e === i || e === l) && t.lastValue === "")
    return e;
  if (s - h === 1 && y.indexOf(e[h]) !== -1) {
    var C = p === 0 ? "" : f;
    e = e.substring(0, h) + C + e.substring(h + 1, e.length);
  }
  var g = function(c, N, A) {
    var O = !1, E = !1;
    i.startsWith("-") ? O = !1 : c.startsWith("--") ? (O = !1, E = !0) : l.startsWith("-") && c.length === l.length ? O = !1 : c[0] === "-" && (O = !0);
    var R = O ? 1 : 0;
    return E && (R = 2), R && (c = c.substring(R), N -= R, A -= R), { value: c, start: N, end: A, hasNegation: O };
  }, T = g(e, h, s), B = T.hasNegation;
  n = T, e = n.value, h = n.start, s = n.end;
  var L = g(t.lastValue, m.start, m.end), _ = L.start, z = L.end, k = L.value, V = e.substring(h, s);
  e.length && k.length && (_ > k.length - l.length || z < i.length) && !(V && l.startsWith(V)) && (e = k);
  var j = 0;
  e.startsWith(i) ? j += i.length : h < i.length && (j = h), e = e.substring(j), s -= j;
  var K = e.length, M = e.length - l.length;
  e.endsWith(l) ? K = M : (s > M || s > e.length - l.length) && (K = s), e = e.substring(0, K), e = tt(B ? "-" + e : e, a), e = (e.match(rt(f)) || []).join("");
  var W = e.indexOf(f);
  e = e.replace(new RegExp(Ne(f), "g"), function(c, N) {
    return N === W ? "." : "";
  });
  var U = de(e, a), J = U.beforeDecimal, te = U.afterDecimal, d = U.addNegation;
  return x.end - x.start < m.end - m.start && J === "" && I && !parseFloat(te) && (e = d ? "-" : ""), e;
}
function it(e, t) {
  var r = t.prefix;
  r === void 0 && (r = "");
  var n = t.suffix;
  n === void 0 && (n = "");
  var a = Array.from({ length: e.length + 1 }).map(function() {
    return !0;
  }), i = e[0] === "-";
  a.fill(!1, 0, Math.min(r.length + (i ? 1 : 0), e.length));
  var l = e.length;
  return a.fill(!1, l - n.length + 1, l + 1), a;
}
function ot(e) {
  var t = ue(e), r = t.thousandSeparator, n = t.decimalSeparator, a = e.prefix;
  a === void 0 && (a = "");
  var i = e.allowNegative;
  if (i === void 0 && (i = !0), r === n)
    throw new Error(`
        Decimal separator can't be same as thousand separator.
        thousandSeparator: ` + r + ` (thousandSeparator = {true} is same as thousandSeparator = ",")
        decimalSeparator: ` + n + ` (default value for decimalSeparator is .)
     `);
  return a.startsWith("-") && i && (console.error(`
      Prefix can't start with '-' when allowNegative is true.
      prefix: ` + a + `
      allowNegative: ` + i + `
    `), i = !1), Object.assign(Object.assign({}, e), { allowNegative: i });
}
function ut(e) {
  e = ot(e), e.decimalSeparator, e.allowedDecimalSeparators, e.thousandsGroupStyle;
  var t = e.suffix, r = e.allowNegative, n = e.allowLeadingZeros, a = e.onKeyDown;
  a === void 0 && (a = Z);
  var i = e.onBlur;
  i === void 0 && (i = Z);
  var l = e.thousandSeparator, p = e.decimalScale, m = e.fixedDecimalScale, x = e.prefix;
  x === void 0 && (x = "");
  var h = e.defaultValue, s = e.value, S = e.valueIsNumericString, y = e.onValueChange, f = be(e, ["decimalSeparator", "allowedDecimalSeparators", "thousandsGroupStyle", "suffix", "allowNegative", "allowLeadingZeros", "onKeyDown", "onBlur", "thousandSeparator", "decimalScale", "fixedDecimalScale", "prefix", "defaultValue", "value", "valueIsNumericString", "onValueChange"]), I = ue(e), C = I.decimalSeparator, g = I.allowedDecimalSeparators, T = function(d) {
    return xe(d, e);
  }, B = function(d, c) {
    return nt(d, c, e);
  }, L = q(s) ? h : s, _ = S ?? at(L, x, t);
  q(s) ? q(h) || (_ = _ || typeof h == "number") : _ = _ || typeof s == "number";
  var z = function(d) {
    return Ve(d) ? d : (typeof d == "number" && (d = De(d)), _ && typeof p == "number" ? Se(d, p, !!m) : d);
  }, k = Ce(z(s), z(h), !!_, T, B, y), V = k[0], j = V.numAsString, K = V.formattedValue, M = k[1], W = function(d) {
    var c = d.target, N = d.key, A = c.selectionStart, O = c.selectionEnd, E = c.value;
    if (E === void 0 && (E = ""), (N === "Backspace" || N === "Delete") && O < x.length && E !== "-") {
      d.preventDefault();
      return;
    }
    if (A !== O) {
      a(d);
      return;
    }
    N === "Backspace" && E[0] === "-" && A === x.length + 1 && r && H(c, 1), p && m && (N === "Backspace" && E[A - 1] === C ? (H(c, A - 1), d.preventDefault()) : N === "Delete" && E[A] === C && d.preventDefault()), g != null && g.includes(N) && E[A] === C && H(c, A + 1);
    var R = l === !0 ? "," : l;
    N === "Backspace" && E[A - 1] === R && H(c, A - 1), N === "Delete" && E[A] === R && H(c, A + 1), a(d);
  }, U = function(d) {
    var c = j;
    if (c.match(/\d/g) || (c = ""), n || (c = $e(c)), m && p && (c = Se(c, p, m)), c !== j) {
      var N = xe(c, e);
      M({
        formattedValue: N,
        value: c,
        floatValue: parseFloat(c)
      }, {
        event: d,
        source: ee.event
      });
    }
    i(d);
  }, J = function(d) {
    return d === C ? !0 : ae(d);
  }, te = function(d) {
    var c = d.currentValue, N = d.lastValue, A = d.formattedValue, O = d.currentValueIndex, E = d.formattedValueIndex, R = c[O], Q = A[E], le = Ie(N, c), re = le.to, ne = function(fe) {
      return B(fe).indexOf(".") + x.length;
    };
    return s === 0 && m && p && c[re.start] === C && ne(c) < O && ne(A) > E ? !1 : O >= re.start && O < re.end && g && g.includes(R) && Q === C ? !0 : R === Q;
  };
  return Object.assign(Object.assign({}, f), {
    value: K,
    valueIsNumericString: !1,
    isValidInputCharacter: J,
    isCharacterSame: te,
    onValueChange: M,
    format: T,
    removeFormatting: B,
    getCaretBoundary: function(d) {
      return it(d, e);
    },
    onKeyDown: W,
    onBlur: U
  });
}
function lt(e) {
  var t = ut(e);
  return X.createElement(et, Object.assign({}, t));
}
function Ee() {
  var r, n, a;
  return ((a = (n = (r = Intl.NumberFormat()) == null ? void 0 : r.formatToParts(1.1)) == null ? void 0 : n.find((i) => i.type === "decimal")) == null ? void 0 : a.value) ?? ".";
}
function ft() {
  return Ee() === "." ? "," : ".";
}
const vt = (e) => {
  const { value: t, onChange: r, disabled: n, highlight: a, validatedSelection: i, fixedDecimals: l, allowNegative: p, thousandSeparator: m, decimalSeparator: x } = e, h = ie.useRef();
  return ie.useLayoutEffect(() => {
    var s;
    if (i !== void 0) {
      const S = typeof i == "number" ? [i, null] : i;
      (s = h.current) == null || s.setSelectionRange(S[0], S[1]);
    }
  }, [i]), ie.createElement(
    ke,
    null,
    ie.createElement(lt, {
      autoFocus: !0,
      getInputRef: h,
      className: "gdg-input",
      onFocus: (s) => s.target.setSelectionRange(a ? 0 : s.target.value.length, s.target.value.length),
      disabled: n === !0,
      decimalScale: l,
      allowNegative: p,
      thousandSeparator: m ?? ft(),
      decimalSeparator: x ?? Ee(),
      value: Object.is(t, -0) ? "-" : t ?? "",
      // decimalScale={3}
      // prefix={"$"}
      onValueChange: r
    })
  );
};
export {
  vt as default
};
