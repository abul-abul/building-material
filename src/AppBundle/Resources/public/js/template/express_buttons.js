function() {
    var e = function(e) {
            var t = {
                exports: {}
            };
            return e.call(t.exports, t, t.exports), t.exports
        },
        Zt = function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        },
        Qt = function(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        },
        en = function(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        },
        tn = function() {
            function r(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(e, t, n) {
                return t && r(e.prototype, t), n && r(e, n), e
            }
        }(),
        l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
        k = function(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        },
        nn = function gt(e, t, n) {
            null === e && (e = Function.prototype);
            var r = Object.getOwnPropertyDescriptor(e, t);
            if (r === undefined) {
                var i = Object.getPrototypeOf(e);
                return null === i ? undefined : gt(i, t, n)
            }
            if ("value" in r) return r.value;
            var a = r.get;
            return a === undefined ? undefined : a.call(n)
        },
        h = function(e, t) {
            var n = {};
            for (var r in e) 0 <= t.indexOf(r) || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
            return n
        },
        rn = function() {
            function n(e, t) {
                var n = [],
                    r = !0,
                    i = !1,
                    a = undefined;
                try {
                    for (var o, c = e[Symbol.iterator](); !(r = (o = c.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                } catch (s) {
                    i = !0, a = s
                } finally {
                    try {
                        !r && c["return"] && c["return"]()
                    } finally {
                        if (i) throw a
                    }
                }
                return n
            }
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return n(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        an = function(e) {
            return Array.isArray(e) ? e : Array.from(e)
        },
        on = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
    (function() {
        this.ScriptLoader = function() {
            function e() {}
            return e.lazyLoad = function(e, t, n) {
                var r;
                if (null != (r = document.querySelector("." + t))) return "function" == typeof n ? n() : void 0;
                (r = document.createElement("script")).async = !0, r.defer = !0, r.onload = n, r.src = e, r.className = t, document.getElementsByTagName("head")[0].appendChild(r)
            }, e
        }()
    }).call(this),
        function() {
            var e, c;
            this.AmazonPayments = {
                metadataTag: function() {
                    return document.getElementById("amazon-payments-metadata")
                },
                metadata: function(e) {
                    return AmazonPayments.metadataTag().getAttribute("data-amazon-payments-" + e)
                },
                withinFlow: function() {
                    return null != AmazonPayments.metadataTag()
                },
                sellerId: function() {
                    return AmazonPayments.metadata("seller-id")
                },
                language: function() {
                    return AmazonPayments.metadata("language")
                },
                authorize: function() {
                    var e, t;
                    return e = AmazonPayments.metadata("callback-url"), t = {
                        popup: !1,
                        scope: "payments:widget payments:shipping_address"
                    }, amazon.Login.authorize(t, e)
                }
            }, e = function() {
                function e() {
                    window.addEventListener("pageshow", this.cleanup)
                }
                return e.prototype.assign = function(e) {
                    return this.flow = this[e]
                }, e.prototype.execute = function(e) {
                    return this.flow.call(this, e)
                }, e.prototype.checkout = function() {
                    return AmazonPayments.authorize()
                }, e.prototype.cart = function(e) {
                    var t;
                    return (t = document.createElement("input")).type = "hidden", t.name = "goto_amazon_payments", t.value = "amazon_payments", e.parentElement.appendChild(t), t.form.submit()
                }, e.prototype.cleanup = function() {
                    var e;
                    if (0 < (e = document.getElementsByName("goto_amazon_payments")).length) return e.parentNode.removeChild(e)
                }, e
            }(), this.amazonPaymentsButtonHandler = new e, this.AmazonPaymentsPayButton = function() {
                var e, t;
                if (AmazonPayments.withinFlow()) return t = AmazonPayments.metadata("widget-library-url"), e = "amazon-payments-widget-library", ScriptLoader.lazyLoad(t, e, onAmazonPaymentsReady)
            }, c = function() {
                var e, t;
                for (t = 10, e = ""; e.length < t;) e += Math.random().toString(36).substr(2);
                return e.substr(0, t)
            }, this.AmazonPaymentsPayButtonReady = function(e) {
                var t, n, r, i, a, o;
                for (null == e && (e = document), o = [], i = 0, a = (r = e.getElementsByClassName("amazon-payments-pay-button")).length; i < a; i++)(n = r[i]).id = n.id || "amazon-payments-pay-button-" + c(), "true" !== n.getAttribute("data-amazon-payments-pay-button") && (OffAmazonPayments.Button(n.id, AmazonPayments.sellerId(), {
                    type: "PwA",
                    size: "small",
                    language: AmazonPayments.language(),
                    authorization: function() {
                        return amazonPaymentsButtonHandler.execute(n)
                    },
                    onError: function(e) {
                        return "undefined" != typeof console && null !== console ? console.error(e.getErrorCode() + ": " + e.getErrorMessage()) : void 0
                    }
                }), n.setAttribute("data-amazon-payments-pay-button", "true"), (t = n.querySelector("img:not(.alt-payment-list__item__logo):not(.additional-checkout-button__logo)")).className += " alt-payment-list-amazon-button-image", o.push(t.setAttribute("aria-hidden", "true")));
                return o
            }
        }.call(this);
    e(function() {
        "use strict";
        window.amazonPaymentsButtonHandler.assign("cart"), window.onAmazonLoginReady = function() {
            amazon.Login.setSandboxMode(JSON.parse(AmazonPayments.metadata("sandbox-mode"))), amazon.Login.setClientId(AmazonPayments.metadata("client-id")), amazon.Login.setRegion(AmazonPayments.metadata("region")), amazon.Login.setUseCookie(!0)
        }, window.onAmazonPaymentsReady = function() {
            AmazonPaymentsPayButtonReady()
        }
    }), e(function(e, t) {
        "use strict";

        function i(e) {
            var t = document.createElement("input");
            t.setAttribute("type", "hidden"), t.setAttribute("name", "clear_cart"), t.setAttribute("value", "true"), e.appendChild(t);
            var n = e.elements.quantity,
                r = e.elements.id,
                i = document.createElement("input");
            i.setAttribute("type", "hidden"), i.setAttribute("name", "updates[" + r.value + "]"), i.setAttribute("value", n ? n.value : 1), e.appendChild(i), e.setAttribute("action", "/checkout"), window.ShopifyAnalytics.lib.track("Buy Now Button"), e.submit()
        }

        function n() {
            var e = document.getElementById("buy-now-button--checkout");
            if (e) {
                for (var t = void 0, n = document.forms, r = 0; r < n.length; r++)
                    if (document.forms[r].action && -1 !== n[r].action.indexOf("cart/add")) {
                        t = n[r];
                        break
                    }
                t && t.elements.id && (e.style.display = "inline-block", e.onclick = function(e) {
                    e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.preventDefault(), i(t)
                })
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t["default"] = n, window.Shopify = window.Shopify || {}, Shopify.StorefrontExpressButtons = Shopify.StorefrontExpressButtons || {}, Shopify.StorefrontExpressButtons.ExpressCheckout = {
            initialize: n
        }
    });
    var U = e(function(e) {
            var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = t)
        }),
        q = e(function(e) {
            var n = {}.hasOwnProperty;
            e.exports = function(e, t) {
                return n.call(e, t)
            }
        }),
        G = e(function(e) {
            e.exports = function(e) {
                try {
                    return !!e()
                } catch (t) {
                    return !0
                }
            }
        }),
        $ = e(function(e) {
            e.exports = !G(function() {
                return 7 != Object.defineProperty({}, "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }),
        A = e(function(e) {
            var t = e.exports = {
                version: "2.5.1"
            };
            "number" == typeof __e && (__e = t)
        }),
        z = e(function(e) {
            e.exports = function(e) {
                return "object" == typeof e ? null !== e : "function" == typeof e
            }
        }),
        K = e(function(e) {
            e.exports = function(e) {
                if (!z(e)) throw TypeError(e + " is not an object!");
                return e
            }
        }),
        y = e(function(e) {
            var t = U.document,
                n = z(t) && z(t.createElement);
            e.exports = function(e) {
                return n ? t.createElement(e) : {}
            }
        }),
        o = e(function(e) {
            e.exports = !$ && !G(function() {
                return 7 != Object.defineProperty(y("div"), "a", {
                    get: function() {
                        return 7
                    }
                }).a
            })
        }),
        W = e(function(e) {
            e.exports = function(e, t) {
                if (!z(e)) return e;
                var n, r;
                if (t && "function" == typeof(n = e.toString) && !z(r = n.call(e))) return r;
                if ("function" == typeof(n = e.valueOf) && !z(r = n.call(e))) return r;
                if (!t && "function" == typeof(n = e.toString) && !z(r = n.call(e))) return r;
                throw TypeError("Can't convert object to primitive value")
            }
        }),
        Y = e(function(e, t) {
            var i = Object.defineProperty;
            t.f = $ ? Object.defineProperty : function a(e, t, n) {
                if (K(e), t = W(t, !0), K(n), o) try {
                    return i(e, t, n)
                } catch (r) {}
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
                return "value" in n && (e[t] = n.value), e
            }
        }),
        J = e(function(e) {
            e.exports = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                }
            }
        }),
        X = e(function(e) {
            e.exports = $ ? function(e, t, n) {
                return Y.f(e, t, J(1, n))
            } : function(e, t, n) {
                return e[t] = n, e
            }
        }),
        Z = e(function(e) {
            var t = 0,
                n = Math.random();
            e.exports = function(e) {
                return "Symbol(".concat(e === undefined ? "" : e, ")_", (++t + n).toString(36))
            }
        }),
        Q = e(function(e) {
            var a = Z("src"),
                t = "toString",
                n = Function[t],
                o = ("" + n).split(t);
            A.inspectSource = function(e) {
                return n.call(e)
            }, (e.exports = function(e, t, n, r) {
                var i = "function" == typeof n;
                i && (q(n, "name") || X(n, "name", t)), e[t] !== n && (i && (q(n, a) || X(n, a, e[t] ? "" + e[t] : o.join(String(t)))), e === U ? e[t] = n : r ? e[t] ? e[t] = n : X(e, t, n) : (delete e[t], X(e, t, n)))
            })(Function.prototype, t, function r() {
                return "function" == typeof this && this[a] || n.call(this)
            })
        }),
        F = e(function(e) {
            e.exports = function(e) {
                if ("function" != typeof e) throw TypeError(e + " is not a function!");
                return e
            }
        }),
        D = e(function(e) {
            e.exports = function(r, i, e) {
                if (F(r), i === undefined) return r;
                switch (e) {
                    case 1:
                        return function(e) {
                            return r.call(i, e)
                        };
                    case 2:
                        return function(e, t) {
                            return r.call(i, e, t)
                        };
                    case 3:
                        return function(e, t, n) {
                            return r.call(i, e, t, n)
                        }
                }
                return function() {
                    return r.apply(i, arguments)
                }
            }
        }),
        ee = e(function(e) {
            var m = "prototype",
                y = function(e, t, n) {
                    var r, i, a, o, c = e & y.F,
                        s = e & y.G,
                        u = e & y.S,
                        h = e & y.P,
                        l = e & y.B,
                        d = s ? U : u ? U[t] || (U[t] = {}) : (U[t] || {})[m],
                        f = s ? A : A[t] || (A[t] = {}),
                        p = f[m] || (f[m] = {});
                    for (r in s && (n = t), n) a = ((i = !c && d && d[r] !== undefined) ? d : n)[r], o = l && i ? D(a, U) : h && "function" == typeof a ? D(Function.call, a) : a, d && Q(d, r, a, e & y.U), f[r] != a && X(f, r, o), h && p[r] != a && (p[r] = a)
                };
            U.core = A, y.F = 1, y.G = 2, y.S = 4, y.P = 8, y.B = 16, y.W = 32, y.U = 64, y.R = 128, e.exports = y
        }),
        te = e(function(e) {
            var n = Z("meta"),
                t = Y.f,
                r = 0,
                i = Object.isExtensible || function() {
                    return !0
                },
                a = !G(function() {
                    return i(Object.preventExtensions({}))
                }),
                o = function(e) {
                    t(e, n, {
                        value: {
                            i: "O" + ++r,
                            w: {}
                        }
                    })
                },
                c = function(e, t) {
                    if (!z(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
                    if (!q(e, n)) {
                        if (!i(e)) return "F";
                        if (!t) return "E";
                        o(e)
                    }
                    return e[n].i
                },
                s = function(e, t) {
                    if (!q(e, n)) {
                        if (!i(e)) return !0;
                        if (!t) return !1;
                        o(e)
                    }
                    return e[n].w
                },
                u = function(e) {
                    return a && h.NEED && i(e) && !q(e, n) && o(e), e
                },
                h = e.exports = {
                    KEY: n,
                    NEED: !1,
                    fastKey: c,
                    getWeak: s,
                    onFreeze: u
                }
        }),
        ne = e(function(e) {
            var t = "__core-js_shared__",
                n = U[t] || (U[t] = {});
            e.exports = function(e) {
                return n[e] || (n[e] = {})
            }
        }),
        re = e(function(e) {
            var t = ne("wks"),
                n = U.Symbol,
                r = "function" == typeof n;
            (e.exports = function(e) {
                return t[e] || (t[e] = r && n[e] || (r ? n : Z)("Symbol." + e))
            }).store = t
        }),
        ie = e(function(e) {
            var r = Y.f,
                i = re("toStringTag");
            e.exports = function(e, t, n) {
                e && !q(e = n ? e : e.prototype, i) && r(e, i, {
                    configurable: !0,
                    value: t
                })
            }
        }),
        ae = e(function(e, t) {
            t.f = re
        }),
        oe = e(function(e) {
            e.exports = !1
        }),
        ce = e(function(e) {
            var n = Y.f;
            e.exports = function(e) {
                var t = A.Symbol || (A.Symbol = oe ? {} : U.Symbol || {});
                "_" == e.charAt(0) || e in t || n(t, e, {
                    value: ae.f(e)
                })
            }
        }),
        v = e(function(e) {
            var t = {}.toString;
            e.exports = function(e) {
                return t.call(e).slice(8, -1)
            }
        }),
        t = e(function(e) {
            e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
                return "String" == v(e) ? e.split("") : Object(e)
            }
        }),
        s = e(function(e) {
            e.exports = function(e) {
                if (e == undefined) throw TypeError("Can't call method on  " + e);
                return e
            }
        }),
        se = e(function(e) {
            e.exports = function(e) {
                return t(s(e))
            }
        }),
        u = e(function(e) {
            var t = Math.ceil,
                n = Math.floor;
            e.exports = function(e) {
                return isNaN(e = +e) ? 0 : (0 < e ? n : t)(e)
            }
        }),
        p = e(function(e) {
            var t = Math.min;
            e.exports = function(e) {
                return 0 < e ? t(u(e), 9007199254740991) : 0
            }
        }),
        d = e(function(e) {
            var n = Math.max,
                r = Math.min;
            e.exports = function(e, t) {
                return (e = u(e)) < 0 ? n(e + t, 0) : r(e, t)
            }
        }),
        n = e(function(e) {
            e.exports = function(c) {
                return function(e, t, n) {
                    var r, i = se(e),
                        a = p(i.length),
                        o = d(n, a);
                    if (c && t != t) {
                        for (; o < a;)
                            if ((r = i[o++]) != r) return !0
                    } else
                        for (; o < a; o++)
                            if ((c || o in i) && i[o] === t) return c || o || 0; return !c && -1
                }
            }
        }),
        f = e(function(e) {
            var t = ne("keys");
            e.exports = function(e) {
                return t[e] || (t[e] = Z(e))
            }
        }),
        i = e(function(e) {
            var o = n(!1),
                c = f("IE_PROTO");
            e.exports = function(e, t) {
                var n, r = se(e),
                    i = 0,
                    a = [];
                for (n in r) n != c && q(r, n) && a.push(n);
                for (; t.length > i;) q(r, n = t[i++]) && (~o(a, n) || a.push(n));
                return a
            }
        }),
        m = e(function(e) {
            e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
        }),
        ue = e(function(e) {
            e.exports = Object.keys || function t(e) {
                return i(e, m)
            }
        }),
        he = e(function(e, t) {
            t.f = Object.getOwnPropertySymbols
        }),
        le = e(function(e, t) {
            t.f = {}.propertyIsEnumerable
        }),
        de = e(function(e) {
            e.exports = function(e) {
                var t = ue(e),
                    n = he.f;
                if (n)
                    for (var r, i = n(e), a = le.f, o = 0; i.length > o;) a.call(e, r = i[o++]) && t.push(r);
                return t
            }
        }),
        fe = e(function(e) {
            e.exports = Array.isArray || function t(e) {
                return "Array" == v(e)
            }
        }),
        g = e(function(e) {
            e.exports = $ ? Object.defineProperties : function o(e, t) {
                K(e);
                for (var n, r = ue(t), i = r.length, a = 0; a < i;) Y.f(e, n = r[a++], t[n]);
                return e
            }
        }),
        b = e(function(e) {
            var t = U.document;
            e.exports = t && t.documentElement
        }),
        pe = e(function(e) {
            var r = f("IE_PROTO"),
                i = function() {},
                a = "prototype",
                o = function() {
                    var e, t = y("iframe"),
                        n = m.length,
                        r = "<",
                        i = ">";
                    for (t.style.display = "none", b.appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write(r + "script" + i + "document.F=Object" + r + "/script" + i), e.close(), o = e.F; n--;) delete o[a][m[n]];
                    return o()
                };
            e.exports = Object.create || function c(e, t) {
                var n;
                return null !== e ? (i[a] = K(e), n = new i, i[a] = null, n[r] = e) : n = o(), t === undefined ? n : g(n, t)
            }
        }),
        me = e(function(e, t) {
            var n = m.concat("length", "prototype");
            t.f = Object.getOwnPropertyNames || function r(e) {
                return i(e, n)
            }
        }),
        ye = e(function(e) {
            var n = me.f,
                t = {}.toString,
                r = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
                i = function(e) {
                    try {
                        return n(e)
                    } catch (t) {
                        return r.slice()
                    }
                };
            e.exports.f = function a(e) {
                return r && "[object Window]" == t.call(e) ? i(e) : n(se(e))
            }
        }),
        ve = e(function(e, t) {
            var r = Object.getOwnPropertyDescriptor;
            t.f = $ ? r : function i(e, t) {
                if (e = se(e), t = W(t, !0), o) try {
                    return r(e, t)
                } catch (n) {}
                if (q(e, t)) return J(!le.f.call(e, t), e[t])
            }
        }),
        R = (e(function() {
            "use strict";
            var a = te.KEY,
                i = ve.f,
                o = Y.f,
                c = ye.f,
                r = U.Symbol,
                s = U.JSON,
                u = s && s.stringify,
                n = "prototype",
                h = re("_hidden"),
                e = re("toPrimitive"),
                l = {}.propertyIsEnumerable,
                d = ne("symbol-registry"),
                f = ne("symbols"),
                p = ne("op-symbols"),
                m = Object[n],
                t = "function" == typeof r,
                y = U.QObject,
                v = !y || !y[n] || !y[n].findChild,
                g = $ && G(function() {
                    return 7 != pe(o({}, "a", {
                        get: function() {
                            return o(this, "a", {
                                value: 7
                            }).a
                        }
                    })).a
                }) ? function(e, t, n) {
                    var r = i(m, t);
                    r && delete m[t], o(e, t, n), r && e !== m && o(m, t, r)
                } : o,
                b = function(e) {
                    var t = f[e] = pe(r[n]);
                    return t._k = e, t
                },
                w = t && "symbol" == typeof r.iterator ? function(e) {
                    return "symbol" == typeof e
                } : function(e) {
                    return e instanceof r
                },
                k = function R(e, t, n) {
                    return e === m && k(p, t, n), K(e), t = W(t, !0), K(n), q(f, t) ? (n.enumerable ? (q(e, h) && e[h][t] && (e[h][t] = !1), n = pe(n, {
                        enumerable: J(0, !1)
                    })) : (q(e, h) || o(e, h, J(1, {})), e[h][t] = !0), g(e, t, n)) : o(e, t, n)
                },
                _ = function V(e, t) {
                    K(e);
                    for (var n, r = de(t = se(t)), i = 0, a = r.length; i < a;) k(e, n = r[i++], t[n]);
                    return e
                },
                x = function O(e, t) {
                    return t === undefined ? pe(e) : _(pe(e), t)
                },
                P = function T(e) {
                    var t = l.call(this, e = W(e, !0));
                    return !(this === m && q(f, e) && !q(p, e)) && (!(t || !q(this, e) || !q(f, e) || q(this, h) && this[h][e]) || t)
                },
                E = function j(e, t) {
                    if (e = se(e), t = W(t, !0), e !== m || !q(f, t) || q(p, t)) {
                        var n = i(e, t);
                        return !n || !q(f, t) || q(e, h) && e[h][t] || (n.enumerable = !0), n
                    }
                },
                C = function M(e) {
                    for (var t, n = c(se(e)), r = [], i = 0; n.length > i;) q(f, t = n[i++]) || t == h || t == a || r.push(t);
                    return r
                },
                S = function I(e) {
                    for (var t, n = e === m, r = c(n ? p : se(e)), i = [], a = 0; r.length > a;) !q(f, t = r[a++]) || n && !q(m, t) || i.push(f[t]);
                    return i
                };
            t || (Q((r = function L(e) {
                if (this instanceof r) throw TypeError("Symbol is not a constructor!");
                var t = Z(0 < arguments.length ? e : undefined),
                    n = function(e) {
                        this === m && n.call(p, e), q(this, h) && q(this[h], t) && (this[h][t] = !1), g(this, t, J(1, e))
                    };
                return $ && v && g(m, t, {
                    configurable: !0,
                    set: n
                }), b(t)
            })[n], "toString", function B() {
                return this._k
            }), ve.f = E, Y.f = k, me.f = ye.f = C, le.f = P, he.f = S, $ && !oe && Q(m, "propertyIsEnumerable", P, !0), ae.f = function(e) {
                return b(re(e))
            }), ee(ee.G + ee.W + ee.F * !t, {
                Symbol: r
            });
            for (var A = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), z = 0; A.length > z;) re(A[z++]);
            for (var F = ue(re.store), D = 0; F.length > D;) ce(F[D++]);
            ee(ee.S + ee.F * !t, "Symbol", {
                "for": function(e) {
                    return q(d, e += "") ? d[e] : d[e] = r(e)
                },
                keyFor: function N(e) {
                    if (!w(e)) throw TypeError(e + " is not a symbol!");
                    for (var t in d)
                        if (d[t] === e) return t
                },
                useSetter: function() {
                    v = !0
                },
                useSimple: function() {
                    v = !1
                }
            }), ee(ee.S + ee.F * !t, "Object", {
                create: x,
                defineProperty: k,
                defineProperties: _,
                getOwnPropertyDescriptor: E,
                getOwnPropertyNames: C,
                getOwnPropertySymbols: S
            }), s && ee(ee.S + ee.F * (!t || G(function() {
                var e = r();
                return "[null]" != u([e]) || "{}" != u({
                    a: e
                }) || "{}" != u(Object(e))
            })), "JSON", {
                stringify: function H(e) {
                    if (e !== undefined && !w(e)) {
                        for (var t, n, r = [e], i = 1; arguments.length > i;) r.push(arguments[i++]);
                        return "function" == typeof(t = r[1]) && (n = t), !n && fe(t) || (t = function(e, t) {
                            if (n && (t = n.call(this, e, t)), !w(t)) return t
                        }), r[1] = t, u.apply(s, r)
                    }
                }
            }), r[n][e] || X(r[n], e, r[n].valueOf), ie(r, "Symbol"), ie(Math, "Math", !0), ie(U.JSON, "JSON", !0)
        }), e(function(e) {
            var i = re("toStringTag"),
                a = "Arguments" == v(function() {
                    return arguments
                }()),
                o = function(e, t) {
                    try {
                        return e[t]
                    } catch (n) {}
                };
            e.exports = function(e) {
                var t, n, r;
                return e === undefined ? "Undefined" : null === e ? "Null" : "string" == typeof(n = o(t = Object(e), i)) ? n : a ? v(t) : "Object" == (r = v(t)) && "function" == typeof t.callee ? "Arguments" : r
            }
        })),
        a = (e(function() {
            "use strict";
            var e = {};
            e[re("toStringTag")] = "z", e + "" != "[object z]" && Q(Object.prototype, "toString", function t() {
                return "[object " + R(this) + "]"
            }, !0)
        }), e(function(e) {
            e.exports = A.Symbol
        }), e(function(e, t) {
            "use strict";

            function n(e) {
                "loading" !== document.readyState ? e() : document.addEventListener ? document.addEventListener("DOMContentLoaded", e) : document.attachEvent("onreadystatechange", function() {
                    "loading" !== document.readyState && e()
                })
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = n
        })),
        c = e(function(e) {
            e.exports = function(c) {
                return function(e, t) {
                    var n, r, i = String(s(e)),
                        a = u(t),
                        o = i.length;
                    return a < 0 || o <= a ? c ? "" : undefined : (n = i.charCodeAt(a)) < 55296 || 56319 < n || a + 1 === o || (r = i.charCodeAt(a + 1)) < 56320 || 57343 < r ? c ? i.charAt(a) : n : c ? i.slice(a, a + 2) : r - 56320 + (n - 55296 << 10) + 65536
                }
            }
        }),
        C = e(function(e) {
            e.exports = {}
        }),
        S = e(function(e) {
            "use strict";
            var r = {};
            X(r, re("iterator"), function() {
                return this
            }), e.exports = function(e, t, n) {
                e.prototype = pe(r, {
                    next: J(1, n)
                }), ie(e, t + " Iterator")
            }
        }),
        r = e(function(e) {
            e.exports = function(e) {
                return Object(s(e))
            }
        }),
        V = e(function(e) {
            var t = f("IE_PROTO"),
                n = Object.prototype;
            e.exports = Object.getPrototypeOf || function(e) {
                return e = r(e), q(e, t) ? e[t] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? n : null
            }
        }),
        w = e(function(e) {
            "use strict";
            var w = re("iterator"),
                k = !([].keys && "next" in [].keys()),
                _ = "@@iterator",
                x = "keys",
                P = "values",
                E = function() {
                    return this
                };
            e.exports = function(e, t, i, n, r, a, o) {
                S(i, t, n);
                var c, s, u, h = function(e) {
                        if (!k && e in p) return p[e];
                        switch (e) {
                            case x:
                                return function t() {
                                    return new i(this, e)
                                };
                            case P:
                                return function n() {
                                    return new i(this, e)
                                }
                        }
                        return function r() {
                            return new i(this, e)
                        }
                    },
                    l = t + " Iterator",
                    d = r == P,
                    f = !1,
                    p = e.prototype,
                    m = p[w] || p[_] || r && p[r],
                    y = m || h(r),
                    v = r ? d ? h("entries") : y : undefined,
                    g = "Array" == t && p.entries || m;
                if (g && (u = V(g.call(new e))) !== Object.prototype && u.next && (ie(u, l, !0), oe || q(u, w) || X(u, w, E)), d && m && m.name !== P && (f = !0, y = function b() {
                        return m.call(this)
                    }), oe && !o || !k && !f && p[w] || X(p, w, y), C[t] = y, C[l] = E, r)
                    if (c = {
                            values: d ? y : h(P),
                            keys: a ? y : h(x),
                            entries: v
                        }, o)
                        for (s in c) s in p || Q(p, s, c[s]);
                    else ee(ee.P + ee.F * (k || f), t, c);
                return c
            }
        }),
        _ = (e(function() {
            "use strict";
            var r = c(!0);
            w(String, "String", function(e) {
                this._t = String(e), this._i = 0
            }, function() {
                var e, t = this._t,
                    n = this._i;
                return n >= t.length ? {
                    value: undefined,
                    done: !0
                } : (e = r(t, n), this._i += e.length, {
                    value: e,
                    done: !1
                })
            })
        }), e(function(e) {
            var t = re("unscopables"),
                n = Array.prototype;
            n[t] == undefined && X(n, t, {}), e.exports = function(e) {
                n[t][e] = !0
            }
        })),
        x = e(function(e) {
            e.exports = function(e, t) {
                return {
                    value: t,
                    done: !!e
                }
            }
        }),
        P = e(function(e) {
            "use strict";
            e.exports = w(Array, "Array", function(e, t) {
                this._t = se(e), this._i = 0, this._k = t
            }, function() {
                var e = this._t,
                    t = this._k,
                    n = this._i++;
                return !e || n >= e.length ? (this._t = undefined, x(1)) : x(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]])
            }, "values"), C.Arguments = C.Array, _("keys"), _("values"), _("entries")
        }),
        O = (e(function() {
            for (var e = re("iterator"), t = re("toStringTag"), n = C.Array, r = {
                CSSRuleList: !0,
                CSSStyleDeclaration: !1,
                CSSValueList: !1,
                ClientRectList: !1,
                DOMRectList: !1,
                DOMStringList: !1,
                DOMTokenList: !0,
                DataTransferItemList: !1,
                FileList: !1,
                HTMLAllCollection: !1,
                HTMLCollection: !1,
                HTMLFormElement: !1,
                HTMLSelectElement: !1,
                MediaList: !0,
                MimeTypeArray: !1,
                NamedNodeMap: !1,
                NodeList: !0,
                PaintRequestList: !1,
                Plugin: !1,
                PluginArray: !1,
                SVGLengthList: !1,
                SVGNumberList: !1,
                SVGPathSegList: !1,
                SVGPointList: !1,
                SVGStringList: !1,
                SVGTransformList: !1,
                SourceBufferList: !1,
                StyleSheetList: !0,
                TextTrackCueList: !1,
                TextTrackList: !1,
                TouchList: !1
            }, i = ue(r), a = 0; a < i.length; a++) {
                var o, c = i[a],
                    s = r[c],
                    u = U[c],
                    h = u && u.prototype;
                if (h && (h[e] || X(h, e, n), h[t] || X(h, t, c), C[c] = n, s))
                    for (o in P) h[o] || Q(h, o, P[o], !0)
            }
        }), e(function(e) {
            e.exports = function(e, t, n, r) {
                if (!(e instanceof t) || r !== undefined && r in e) throw TypeError(n + ": incorrect invocation!");
                return e
            }
        })),
        E = e(function(e) {
            e.exports = function(e, t, n, r) {
                try {
                    return r ? t(K(n)[0], n[1]) : t(n)
                } catch (a) {
                    var i = e["return"];
                    throw i !== undefined && K(i.call(e)), a
                }
            }
        }),
        T = e(function(e) {
            var t = re("iterator"),
                n = Array.prototype;
            e.exports = function(e) {
                return e !== undefined && (C.Array === e || n[t] === e)
            }
        }),
        j = e(function(e) {
            var t = re("iterator");
            e.exports = A.getIteratorMethod = function(e) {
                if (e != undefined) return e[t] || e["@@iterator"] || C[R(e)]
            }
        }),
        M = e(function(e, t) {
            var d = {},
                f = {};
            (t = e.exports = function(e, t, n, r, i) {
                var a, o, c, s, u = i ? function() {
                        return e
                    } : j(e),
                    h = D(n, r, t ? 2 : 1),
                    l = 0;
                if ("function" != typeof u) throw TypeError(e + " is not iterable!");
                if (T(u)) {
                    for (a = p(e.length); l < a; l++)
                        if ((s = t ? h(K(o = e[l])[0], o[1]) : h(e[l])) === d || s === f) return s
                } else
                    for (c = u.call(e); !(o = c.next()).done;)
                        if ((s = E(c, h, o.value, t)) === d || s === f) return s
            }).BREAK = d, t.RETURN = f
        }),
        I = e(function(e) {
            var i = re("species");
            e.exports = function(e, t) {
                var n, r = K(e).constructor;
                return r === undefined || (n = K(r)[i]) == undefined ? t : F(n)
            }
        }),
        L = e(function(e) {
            e.exports = function(e, t, n) {
                var r = n === undefined;
                switch (t.length) {
                    case 0:
                        return r ? e() : e.call(n);
                    case 1:
                        return r ? e(t[0]) : e.call(n, t[0]);
                    case 2:
                        return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
                    case 3:
                        return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
                    case 4:
                        return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
                }
                return e.apply(n, t)
            }
        }),
        B = e(function(e) {
            var r, t, n, i = U.process,
                a = U.setImmediate,
                o = U.clearImmediate,
                c = U.MessageChannel,
                s = U.Dispatch,
                u = 0,
                h = {},
                l = "onreadystatechange",
                d = function() {
                    var e = +this;
                    if (h.hasOwnProperty(e)) {
                        var t = h[e];
                        delete h[e], t()
                    }
                },
                f = function(e) {
                    d.call(e.data)
                };
            a && o || (a = function p(e) {
                for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
                return h[++u] = function() {
                    L("function" == typeof e ? e : Function(e), t)
                }, r(u), u
            }, o = function m(e) {
                delete h[e]
            }, "process" == v(i) ? r = function(e) {
                i.nextTick(D(d, e, 1))
            } : s && s.now ? r = function(e) {
                s.now(D(d, e, 1))
            } : c ? (n = (t = new c).port2, t.port1.onmessage = f, r = D(n.postMessage, n, 1)) : U.addEventListener && "function" == typeof postMessage && !U.importScripts ? (r = function(e) {
                U.postMessage(e + "", "*")
            }, U.addEventListener("message", f, !1)) : r = l in y("script") ? function(e) {
                b.appendChild(y("script"))[l] = function() {
                    b.removeChild(this), d.call(e)
                }
            } : function(e) {
                setTimeout(D(d, e, 1), 0)
            }), e.exports = {
                set: a,
                clear: o
            }
        }),
        N = e(function(e) {
            var c = B.set,
                s = U.MutationObserver || U.WebKitMutationObserver,
                u = U.process,
                h = U.Promise,
                l = "process" == v(u);
            e.exports = function() {
                var r, i, a, e = function() {
                    var e, t;
                    for (l && (e = u.domain) && e.exit(); r;) {
                        t = r.fn, r = r.next;
                        try {
                            t()
                        } catch (n) {
                            throw r ? a() : i = undefined, n
                        }
                    }
                    i = undefined, e && e.enter()
                };
                if (l) a = function() {
                    u.nextTick(e)
                };
                else if (s) {
                    var t = !0,
                        n = document.createTextNode("");
                    new s(e).observe(n, {
                        characterData: !0
                    }), a = function() {
                        n.data = t = !t
                    }
                } else if (h && h.resolve) {
                    var o = h.resolve();
                    a = function() {
                        o.then(e)
                    }
                } else a = function() {
                    c.call(U, e)
                };
                return function(e) {
                    var t = {
                        fn: e,
                        next: undefined
                    };
                    i && (i.next = t), r || (r = t, a()), i = t
                }
            }
        }),
        H = e(function(e) {
            "use strict";

            function t(e) {
                var n, r;
                this.promise = new e(function(e, t) {
                    if (n !== undefined || r !== undefined) throw TypeError("Bad Promise constructor");
                    n = e, r = t
                }), this.resolve = F(n), this.reject = F(r)
            }
            e.exports.f = function(e) {
                return new t(e)
            }
        }),
        ge = e(function(e) {
            e.exports = function(e) {
                try {
                    return {
                        e: !1,
                        v: e()
                    }
                } catch (t) {
                    return {
                        e: !0,
                        v: t
                    }
                }
            }
        }),
        be = e(function(e) {
            e.exports = function(e, t) {
                if (K(e), z(t) && t.constructor === e) return t;
                var n = H.f(e);
                return (0, n.resolve)(t), n.promise
            }
        }),
        we = e(function(e) {
            e.exports = function(e, t, n) {
                for (var r in t) Q(e, r, t[r], n);
                return e
            }
        }),
        ke = e(function(e) {
            "use strict";
            var n = re("species");
            e.exports = function(e) {
                var t = U[e];
                $ && t && !t[n] && Y.f(t, n, {
                    configurable: !0,
                    get: function() {
                        return this
                    }
                })
            }
        }),
        _e = e(function(e) {
            var a = re("iterator"),
                o = !1;
            try {
                var t = [7][a]();
                t["return"] = function() {
                    o = !0
                }, Array.from(t, function() {
                    throw 2
                })
            } catch (c) {}
            e.exports = function(e, t) {
                if (!t && !o) return !1;
                var n = !1;
                try {
                    var r = [7],
                        i = r[a]();
                    i.next = function() {
                        return {
                            done: n = !0
                        }
                    }, r[a] = function() {
                        return i
                    }, e(r)
                } catch (c) {}
                return n
            }
        }),
        xe = (e(function() {
            "use strict";
            var n, t, r, i, e = B.set,
                a = N(),
                o = "Promise",
                l = U.TypeError,
                c = U.process,
                s = U[o],
                u = "process" == R(c),
                h = function() {},
                d = t = H.f,
                f = !! function() {
                    try {
                        var e = s.resolve(1),
                            t = (e.constructor = {})[re("species")] = function(e) {
                                e(h, h)
                            };
                        return (u || "function" == typeof PromiseRejectionEvent) && e.then(h) instanceof t
                    } catch (n) {}
                }(),
                p = function(e) {
                    var t;
                    return !(!z(e) || "function" != typeof(t = e.then)) && t
                },
                m = function(h, n) {
                    if (!h._n) {
                        h._n = !0;
                        var r = h._c;
                        a(function() {
                            for (var s = h._v, u = 1 == h._s, e = 0, t = function(e) {
                                var t, n, r = u ? e.ok : e.fail,
                                    i = e.resolve,
                                    a = e.reject,
                                    o = e.domain;
                                try {
                                    r ? (u || (2 == h._h && g(h), h._h = 1), !0 === r ? t = s : (o && o.enter(), t = r(s), o && o.exit()), t === e.promise ? a(l("Promise-chain cycle")) : (n = p(t)) ? n.call(t, i, a) : i(t)) : a(s)
                                } catch (c) {
                                    a(c)
                                }
                            }; r.length > e;) t(r[e++]);
                            h._c = [], h._n = !1, n && !h._h && y(h)
                        })
                    }
                },
                y = function(a) {
                    e.call(U, function() {
                        var e, t, n, r = a._v,
                            i = v(a);
                        if (i && (e = ge(function() {
                                u ? c.emit("unhandledRejection", r, a) : (t = U.onunhandledrejection) ? t({
                                    promise: a,
                                    reason: r
                                }) : (n = U.console) && n.error && n.error("Unhandled promise rejection", r)
                            }), a._h = u || v(a) ? 2 : 1), a._a = undefined, i && e.e) throw e.v
                    })
                },
                v = function(e) {
                    if (1 == e._h) return !1;
                    for (var t, n = e._a || e._c, r = 0; n.length > r;)
                        if ((t = n[r++]).fail || !v(t.promise)) return !1;
                    return !0
                },
                g = function(t) {
                    e.call(U, function() {
                        var e;
                        u ? c.emit("rejectionHandled", t) : (e = U.onrejectionhandled) && e({
                            promise: t,
                            reason: t._v
                        })
                    })
                },
                b = function(e) {
                    var t = this;
                    t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), m(t, !0))
                },
                w = function(n) {
                    var r, i = this;
                    if (!i._d) {
                        i._d = !0, i = i._w || i;
                        try {
                            if (i === n) throw l("Promise can't be resolved itself");
                            (r = p(n)) ? a(function() {
                                var e = {
                                    _w: i,
                                    _d: !1
                                };
                                try {
                                    r.call(n, D(w, e, 1), D(b, e, 1))
                                } catch (t) {
                                    b.call(e, t)
                                }
                            }): (i._v = n, i._s = 1, m(i, !1))
                        } catch (e) {
                            b.call({
                                _w: i,
                                _d: !1
                            }, e)
                        }
                    }
                };
            f || (s = function k(e) {
                O(this, s, o, "_h"), F(e), n.call(this);
                try {
                    e(D(w, this, 1), D(b, this, 1))
                } catch (t) {
                    b.call(this, t)
                }
            }, (n = function _() {
                this._c = [], this._a = undefined, this._s = 0, this._d = !1, this._v = undefined, this._h = 0, this._n = !1
            }).prototype = we(s.prototype, {
                then: function x(e, t) {
                    var n = d(I(this, s));
                    return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = u ? c.domain : undefined, this._c.push(n), this._a && this._a.push(n), this._s && m(this, !1), n.promise
                },
                "catch": function(e) {
                    return this.then(undefined, e)
                }
            }), r = function() {
                var e = new n;
                this.promise = e, this.resolve = D(w, e, 1), this.reject = D(b, e, 1)
            }, H.f = d = function(e) {
                return e === s || e === i ? new r(e) : t(e)
            }), ee(ee.G + ee.W + ee.F * !f, {
                Promise: s
            }), ie(s, o), ke(o), i = A[o], ee(ee.S + ee.F * !f, o, {
                reject: function P(e) {
                    var t = d(this);
                    return (0, t.reject)(e), t.promise
                }
            }), ee(ee.S + ee.F * (oe || !f), o, {
                resolve: function E(e) {
                    return be(oe && this === i ? s : this, e)
                }
            }), ee(ee.S + ee.F * !(f && _e(function(e) {
                s.all(e)["catch"](h)
            })), o, {
                all: function C(e) {
                    var o = this,
                        t = d(o),
                        c = t.resolve,
                        s = t.reject,
                        n = ge(function() {
                            var r = [],
                                i = 0,
                                a = 1;
                            M(e, !1, function(e) {
                                var t = i++,
                                    n = !1;
                                r.push(undefined), a++, o.resolve(e).then(function(e) {
                                    n || (n = !0, r[t] = e, --a || c(r))
                                }, s)
                            }), --a || c(r)
                        });
                    return n.e && s(n.v), t.promise
                },
                race: function S(e) {
                    var t = this,
                        n = d(t),
                        r = n.reject,
                        i = ge(function() {
                            M(e, !1, function(e) {
                                t.resolve(e).then(n.resolve, r)
                            })
                        });
                    return i.e && r(i.v), n.promise
                }
            })
        }), e(function(e) {
            e.exports = A.Promise
        }), e(function(e, t) {
            "use strict";

            function n(e) {
                var t = document.querySelector('meta[name="' + r + "-" + e + '"]');
                return t ? t.getAttribute("content") : null
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = "shopify-checkout",
                i = {
                    getApiToken: function a() {
                        return n("api-token")
                    },
                    getAuthorizationToken: function o() {
                        return n("authorization-token")
                    }
                };
            t["default"] = i
        })),
        Pe = (e(function() {
            "use strict";
            ! function() {
                function c(e) {
                    this.message = e
                }
                var e = window,
                    s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                c.prototype = new Error, c.prototype.name = "InvalidCharacterError", e.btoa || (e.btoa = function(e) {
                    for (var t, n, r = String(e), i = 0, a = s, o = ""; r.charAt(0 | i) || (a = "=", i % 1); o += a.charAt(63 & t >> 8 - i % 1 * 8)) {
                        if (255 < (n = r.charCodeAt(i += .75))) throw new c("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                        t = t << 8 | n
                    }
                    return o
                }), e.atob || (e.atob = function(e) {
                    var t = String(e).replace(/[=]+$/, "");
                    if (t.length % 4 == 1) throw new c("'atob' failed: The string to be decoded is not correctly encoded.");
                    for (var n, r, i = 0, a = 0, o = ""; r = t.charAt(a++); ~r && (n = i % 4 ? 64 * n + r : r, i++ % 4) ? o += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0) r = s.indexOf(r);
                    return o
                })
            }()
        }), e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function(e) {
                function n(e) {
                    en(this, n);
                    var t = Qt(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this));
                    return t.response = e, t.stack = (new Error).stack, t.name = t.constructor.name, t
                }
                return Zt(n, e), n
            }(Error);
            t["default"] = n
        })),
        Ee = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            t.TimeoutPromiseError = function(e) {
                function c(e) {
                    var t, n = 0 < arguments.length && e !== undefined ? arguments[0] : "";
                    en(this, c);
                    for (var r = arguments.length, i = Array(1 < r ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];
                    var o = Qt(this, (t = c.__proto__ || Object.getPrototypeOf(c)).call.apply(t, [this, n].concat(i)));
                    return o.stack = (new Error).stack, o.name = "TimeoutPromiseError", o
                }
                return Zt(c, e), c
            }(Error)
        }),
        Ce = e(function(e, t) {
            "use strict";

            function n(e, t) {
                d.matches = d.matches || d.webkitMatchesSelector || d.msMatchesSelector || d.mozMatchesSelector;
                for (var n = e; n && n !== document.body;)
                    if ((n = n.parentElement).matches(t)) return n;
                return null
            }

            function r(e) {
                for (var t = e; !(t.parentNode instanceof Document || t.parentNode instanceof DocumentFragment);) t = t.parentNode;
                return t
            }

            function i() {
                for (var e = [], t = h(), n = t.length - 1; 0 <= n; n--) e.push(l(t[n]));
                return e.join("")
            }

            function a(e) {
                return e ? e.dataset ? e.dataset : [].slice.call(e.attributes).reduce(function(e, t) {
                    return /^data-/.test(t.name) && (e[t.name.substr(5)] = t.value), e
                }, {}) : null
            }

            function o(e, n) {
                var t = new Promise(function(e, t) {
                    return setTimeout(t, n, new Ee.TimeoutPromiseError("Promise exceeded " + n + "ms timeout"))
                });
                return Promise.race([e, t])
            }

            function c(e) {
                window.location.assign(e)
            }

            function s(i, a) {
                var o = void 0;
                return function() {
                    for (var e = this, t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    clearTimeout(o), o = setTimeout(function() {
                        o = null, i.apply(e, n)
                    }, a)
                }
            }

            function u(e) {
                var t = document.getElementById(e);
                if (!t) return Promise.reject(new Error("Missing capabilities"));
                var n = JSON.parse(t.textContent);
                return Promise.resolve(n)
            }

            function h() {
                var e = window.crypto || window.msCrypto;
                if (e && e.getRandomValues) {
                    var t = new Uint8Array(16);
                    return e.getRandomValues(t), t
                }
                for (var n, r = new Array(16), i = 0; i < 16; i++) 0 == (3 & i) && (n = 4294967296 * Math.random()), r[i] = n >>> ((3 & i) << 3) & 255;
                return r
            }

            function l(e) {
                return (e + 256).toString(16).substr(1)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getClosest = n, t.getDocumentContext = r, t.generateRandomId = i, t.dataset = a, t.timeoutPromise = o, t.redirect = c, t.debounce = s, t.getCapabilities = u;
            var d = Element.prototype
        });
    ! function(e) {
        "use strict";

        function r(e) {
            if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
            return e.toLowerCase()
        }

        function i(e) {
            return "string" != typeof e && (e = String(e)), e
        }

        function a(t) {
            var e = {
                next: function() {
                    var e = t.shift();
                    return {
                        done: e === undefined,
                        value: e
                    }
                }
            };
            return v.iterable && (e[Symbol.iterator] = function() {
                return e
            }), e
        }

        function o(t) {
            this.map = {}, t instanceof o ? t.forEach(function(e, t) {
                this.append(t, e)
            }, this) : Array.isArray(t) ? t.forEach(function(e) {
                this.append(e[0], e[1])
            }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                this.append(e, t[e])
            }, this)
        }

        function t(e) {
            if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
            e.bodyUsed = !0
        }

        function c(n) {
            return new Promise(function(e, t) {
                n.onload = function() {
                    e(n.result)
                }, n.onerror = function() {
                    t(n.error)
                }
            })
        }

        function n(e) {
            var t = new FileReader,
                n = c(t);
            return t.readAsArrayBuffer(e), n
        }

        function s(e) {
            var t = new FileReader,
                n = c(t);
            return t.readAsText(e), n
        }

        function u(e) {
            for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
            return n.join("")
        }

        function h(e) {
            if (e.slice) return e.slice(0);
            var t = new Uint8Array(e.byteLength);
            return t.set(new Uint8Array(e)), t.buffer
        }

        function l() {
            return this.bodyUsed = !1, this._initBody = function(e) {
                if (this._bodyInit = e)
                    if ("string" == typeof e) this._bodyText = e;
                    else if (v.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
                    else if (v.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
                    else if (v.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
                    else if (v.arrayBuffer && v.blob && b(e)) this._bodyArrayBuffer = h(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                    else {
                        if (!v.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !w(e)) throw new Error("unsupported BodyInit type");
                        this._bodyArrayBuffer = h(e)
                    } else this._bodyText = "";
                this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : v.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
            }, v.blob && (this.blob = function() {
                var e = t(this);
                if (e) return e;
                if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                return Promise.resolve(new Blob([this._bodyText]))
            }, this.arrayBuffer = function() {
                return this._bodyArrayBuffer ? t(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(n)
            }), this.text = function() {
                var e = t(this);
                if (e) return e;
                if (this._bodyBlob) return s(this._bodyBlob);
                if (this._bodyArrayBuffer) return Promise.resolve(u(this._bodyArrayBuffer));
                if (this._bodyFormData) throw new Error("could not read FormData body as text");
                return Promise.resolve(this._bodyText)
            }, v.formData && (this.formData = function() {
                return this.text().then(p)
            }), this.json = function() {
                return this.text().then(JSON.parse)
            }, this
        }

        function d(e) {
            var t = e.toUpperCase();
            return -1 < k.indexOf(t) ? t : e
        }

        function f(e, t) {
            var n = (t = t || {}).body;
            if (e instanceof f) {
                if (e.bodyUsed) throw new TypeError("Already read");
                this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new o(e.headers)), this.method = e.method, this.mode = e.mode, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0)
            } else this.url = String(e);
            if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new o(t.headers)), this.method = d(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
            this._initBody(n)
        }

        function p(e) {
            var i = new FormData;
            return e.trim().split("&").forEach(function(e) {
                if (e) {
                    var t = e.split("="),
                        n = t.shift().replace(/\+/g, " "),
                        r = t.join("=").replace(/\+/g, " ");
                    i.append(decodeURIComponent(n), decodeURIComponent(r))
                }
            }), i
        }

        function m(e) {
            var i = new o;
            return e.split(/\r?\n/).forEach(function(e) {
                var t = e.split(":"),
                    n = t.shift().trim();
                if (n) {
                    var r = t.join(":").trim();
                    i.append(n, r)
                }
            }), i
        }

        function y(e, t) {
            t || (t = {}), this.type = "default", this.status = "status" in t ? t.status : 200, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new o(t.headers), this.url = t.url || "", this._initBody(e)
        }
        if (!e.fetch) {
            var v = {
                searchParams: "URLSearchParams" in e,
                iterable: "Symbol" in e && "iterator" in Symbol,
                blob: "FileReader" in e && "Blob" in e && function() {
                    try {
                        return new Blob, !0
                    } catch (e) {
                        return !1
                    }
                }(),
                formData: "FormData" in e,
                arrayBuffer: "ArrayBuffer" in e
            };
            if (v.arrayBuffer) var g = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                b = function(e) {
                    return e && DataView.prototype.isPrototypeOf(e)
                },
                w = ArrayBuffer.isView || function(e) {
                    return e && -1 < g.indexOf(Object.prototype.toString.call(e))
                };
            o.prototype.append = function(e, t) {
                e = r(e), t = i(t);
                var n = this.map[e];
                this.map[e] = n ? n + "," + t : t
            }, o.prototype["delete"] = function(e) {
                delete this.map[r(e)]
            }, o.prototype.get = function(e) {
                return e = r(e), this.has(e) ? this.map[e] : null
            }, o.prototype.has = function(e) {
                return this.map.hasOwnProperty(r(e))
            }, o.prototype.set = function(e, t) {
                this.map[r(e)] = i(t)
            }, o.prototype.forEach = function(e, t) {
                for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
            }, o.prototype.keys = function() {
                var n = [];
                return this.forEach(function(e, t) {
                    n.push(t)
                }), a(n)
            }, o.prototype.values = function() {
                var t = [];
                return this.forEach(function(e) {
                    t.push(e)
                }), a(t)
            }, o.prototype.entries = function() {
                var n = [];
                return this.forEach(function(e, t) {
                    n.push([t, e])
                }), a(n)
            }, v.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
            var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            f.prototype.clone = function() {
                return new f(this, {
                    body: this._bodyInit
                })
            }, l.call(f.prototype), l.call(y.prototype), y.prototype.clone = function() {
                return new y(this._bodyInit, {
                    status: this.status,
                    statusText: this.statusText,
                    headers: new o(this.headers),
                    url: this.url
                })
            }, y.error = function() {
                var e = new y(null, {
                    status: 0,
                    statusText: ""
                });
                return e.type = "error", e
            };
            var _ = [301, 302, 303, 307, 308];
            y.redirect = function(e, t) {
                if (-1 === _.indexOf(t)) throw new RangeError("Invalid status code");
                return new y(null, {
                    status: t,
                    headers: {
                        location: e
                    }
                })
            }, e.Headers = o, e.Request = f, e.Response = y, e.fetch = function(i, a) {
                return new Promise(function(n, e) {
                    var t = new f(i, a),
                        r = new XMLHttpRequest;
                    r.onload = function() {
                        var e = {
                            status: r.status,
                            statusText: r.statusText,
                            headers: m(r.getAllResponseHeaders() || "")
                        };
                        e.url = "responseURL" in r ? r.responseURL : e.headers.get("X-Request-URL");
                        var t = "response" in r ? r.response : r.responseText;
                        n(new y(t, e))
                    }, r.onerror = function() {
                        e(new TypeError("Network request failed"))
                    }, r.ontimeout = function() {
                        e(new TypeError("Network request failed"))
                    }, r.open(t.method, t.url, !0), "include" === t.credentials && (r.withCredentials = !0), "responseType" in r && v.blob && (r.responseType = "blob"), t.headers.forEach(function(e, t) {
                        r.setRequestHeader(t, e)
                    }), r.send("undefined" == typeof t._bodyInit ? null : t._bodyInit)
                })
            }, e.fetch.polyfill = !0
        }
    }("undefined" != typeof self ? self : this);
    var Se = e(function(e, t) {
            "use strict";

            function u(e) {
                return 200 <= e.status && e.status < 300 ? e : Promise.reject(new n["default"](e))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = k(Pe),
                r = function() {
                    function r(e, t) {
                        var n = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                        en(this, r), this.host = e, this.headers = l({
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }, n)
                    }
                    return tn(r, [{
                        key: "get",
                        value: function n(e, t) {
                            return this.request("GET", e, null, t)
                        }
                    }, {
                        key: "post",
                        value: function i(e, t, n) {
                            return this.request("POST", e, t, n)
                        }
                    }, {
                        key: "patch",
                        value: function a(e, t, n) {
                            return this.request("PATCH", e, t, n)
                        }
                    }, {
                        key: "put",
                        value: function o(e, t, n) {
                            return this.request("PUT", e, t, n)
                        }
                    }, {
                        key: "stopPolling",
                        value: function e() {
                            this.cancelPolling = !0
                        }
                    }, {
                        key: "request",
                        value: function c(e, t, n, r) {
                            var i = this,
                                a = 3 < arguments.length && r !== undefined ? arguments[3] : {},
                                o = l({
                                    credentials: "same-origin"
                                }, a.requestOptions, {
                                    method: e,
                                    headers: this.headers,
                                    body: n ? JSON.stringify(n) : null
                                });
                            return "GET" === e && delete o.body, "/" === t[0] && this.host && (t = "https://" + this.host + t), fetch(t, o).then(function(e) {
                                return i.poll(a.pollingOptions, e)
                            }).then(u)
                        }
                    }, {
                        key: "poll",
                        value: function s(e, t) {
                            var n = this,
                                r = l({
                                    poll: !0,
                                    timeout: 2e4
                                }, e),
                                i = r.poll,
                                a = r.timeout;
                            if (this.cancelPolling = !1, !i || 202 !== t.status) return t;
                            var c = {
                                    method: "GET",
                                    headers: this.headers
                                },
                                o = new Promise(function(i, a) {
                                    (function o(e) {
                                        var t = this;
                                        if (this.cancelPolling) a(new Error("cancelled polling"));
                                        else if (202 === e.status) {
                                            var n = e.headers.get("Location"),
                                                r = 1e3 * (Number(e.headers.get("Retry-After")) || 1);
                                            setTimeout(function() {
                                                fetch(n, c).then(o.bind(t))["catch"](a)
                                            }, r)
                                        } else i(e)
                                    }).call(n, t)
                                });
                            return (0, Ce.timeoutPromise)(o, a)
                        }
                    }]), r
                }();
            t["default"] = r
        }),
        Ae = e(function(e, t) {
            "use strict";

            function h(e) {
                var t = e.headers.get(p);
                return e.ok && this.storeAuthorizationToken(t), e
            }

            function l(e) {
                return 204 === e.status || 202 === e.status ? e : e.json()
            }

            function d(e) {
                return btoa(e + ":")
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var f = k(xe),
                n = k(Se),
                p = "X-Shopify-Checkout-Authorization-Token",
                r = function(e) {
                    function o(e) {
                        var t = 0 < arguments.length && e !== undefined ? arguments[0] : {},
                            n = t.host,
                            r = t.accessToken;
                        en(this, o), r || (r = f["default"].getApiToken());
                        var i = {
                                Authorization: "Basic " + d(r),
                                "X-Shopify-Checkout-Version": "2016-09-06"
                            },
                            a = Qt(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, n, i));
                        return a.storeAuthorizationToken(f["default"].getAuthorizationToken()), a
                    }
                    return Zt(o, e), tn(o, [{
                        key: "request",
                        value: function i(e, t, n, r) {
                            return nn(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "request", this).call(this, e, t, n, r).then(h.bind(this)).then(l)
                        }
                    }, {
                        key: "storeAuthorizationToken",
                        value: function t(e) {
                            e && (this.secretKey = e, this.headers[p] = e)
                        }
                    }, {
                        key: "getCheckout",
                        value: function n(e) {
                            return this.get("/wallets/checkouts/" + e + ".json")
                        }
                    }, {
                        key: "createCheckout",
                        value: function r(e) {
                            return e.checkout && null == e.checkout.secret && (e.checkout.secret = !0), this.post("/wallets/checkouts.json", e)
                        }
                    }, {
                        key: "updateCheckout",
                        value: function a(e, t) {
                            return this.patch("/wallets/checkouts/" + e + ".json", t)
                        }
                    }, {
                        key: "getShippingRates",
                        value: function c(e) {
                            return this.get("/wallets/checkouts/" + e + "/shipping_rates.json")
                        }
                    }, {
                        key: "createPayment",
                        value: function s(e, t, n) {
                            return this.post("/wallets/checkouts/" + e + "/payments.json", {
                                payment: t
                            }, n)
                        }
                    }, {
                        key: "createPaymentSession",
                        value: function u(e, t) {
                            return fetch(e, {
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(t),
                                mode: "cors",
                                method: "POST"
                            }).then(function(e) {
                                return e.json()
                            })
                        }
                    }]), o
                }(n["default"]);
            t["default"] = r
        }),
        ze = e(function(e, t) {
            "use strict";

            function n(e) {
                var t = {
                    first_name: "",
                    last_name: "",
                    address1: "",
                    city: e.locality || "",
                    province_code: e.administrativeArea || "",
                    country_code: "",
                    zip: e.postalCode || "",
                    phone: ""
                };
                e.countryCode ? (t.country_code = e.countryCode.toLowerCase(), "hk" === t.country_code && (delete t.zip, t.province_code = e.postalCode)) : e.country && (t.country = e.country.toLowerCase(), "usa" === t.country && (t.country = "united states")), e.givenName && (t.first_name = e.givenName), e.familyName && (t.last_name = e.familyName), e.phoneNumber && (t.phone = e.phoneNumber);
                var n = e.addressLines;
                return n && n.length && (t.address1 = n[0], n[1] && (t.address2 = n[1])), r(t)
            }

            function r(e) {
                var t = e.country_code,
                    n = e.country,
                    r = e.zip,
                    i = r;
                return r ? (a.test(r) && ("ca" !== t && "canada" !== n || (i = r.trim() + " 0Z0"), "gb" === t && (i = r.trim() + " 0ZZ")), Object.assign({}, e, {
                    zip: i
                })) : e
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.parse = n;
            var a = /^[a-z0-9]{2,4}\s?$/i
        }),
        Fe = e(function(e, t) {
            "use strict";

            function n(e, t) {
                return {
                    type: "final",
                    label: t,
                    amount: e.total_price
                }
            }

            function r(e) {
                var t = [{
                    type: "final",
                    label: "Subtotal",
                    amount: e.total_line_items_price
                }];
                return e.shipping_line && (t = t.concat([{
                    type: "final",
                    label: "Shipping",
                    amount: e.shipping_line.price
                }])), e.total_tax && (t = t.concat([{
                    type: "final",
                    label: "Estimated Tax",
                    amount: e.total_tax
                }])), e.applied_discount && (t = t.concat([{
                    type: "final",
                    label: "Discount",
                    amount: -e.applied_discount.amount
                }])), t
            }

            function i(e) {
                return a(e).map(c)
            }

            function a(e) {
                return [].concat(e).sort(o)
            }

            function o(e, t) {
                var n = parseFloat(e.price),
                    r = parseFloat(t.price);
                return n < r ? -1 : r < n ? 1 : 0
            }

            function c(e) {
                return {
                    identifier: e.id,
                    label: e.title,
                    detail: "",
                    amount: e.price
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.addressFromEvent = undefined, t.totalFromCheckout = n, t.lineItemsFromCheckout = r, t.transformedShippingRates = i, t.sortShippingRates = a, t.addressFromEvent = ze.parse
        }),
        De = e(function(e, t) {
            "use strict";

            function i(e, t) {
                for (var n = 0; n < o.length; n++)
                    if (o[n][0].test(e)) {
                        var r = o[n][1];
                        return "function" == typeof r && t ? r(t.field) : r
                    }
                return c
            }

            function n(e) {
                var r = [];
                return Object.keys(e).forEach(function(n) {
                    Object.keys(e[n]).forEach(function(t) {
                        e[n][t].forEach(function(e) {
                            e && e.code && r.push(i(n + "_" + t + "_" + e.code, {
                                field: t,
                                category: n
                            }))
                        })
                    })
                }), r
            }

            function r(e) {
                var t = (e = Array.isArray(e) ? e : [e]).map(function(e) {
                    return a(e)
                });
                return 1 === t.length && t[0].startsWith("Enter ") && (t = ["Please e" + t[0].substr(1) + " and try again"]), t
            }

            function a(e) {
                switch (e) {
                    case "Some products became unavailable and your cart has been updated. We're sorry for the inconvenience.":
                        return i("not_enough_in_stock");
                    case "Checkout is already completed.":
                        return i("already_completed");
                    default:
                        return e
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.errorFromCode = i, t.errorMessagesFromJson = n, t.normalizeErrors = r;
            var o = [
                    [/failed_session/, "There was a problem with the payment service. Please select a different payment method or try again later."],
                    [/first_name_blank$/, "Enter a first name for your shipping address"],
                    [/last_name_blank$/, "Enter a last name for your shipping address"],
                    [/address1_blank$/, "Enter your shipping address"],
                    [/address2_blank$/, "Enter the apartment, suite, etc. for your shipping address"],
                    [/city_blank$/, "Enter the city of your shipping address"],
                    [/country(_code)?_blank$/, "Select a country for your shipping address"],
                    [/country(_code)?_not_supported$/, "Enter a valid country for your shipping address"],
                    [/province(_code)?_blank$/, "Enter a state / province for your shipping address"],
                    [/province(_code)?_invalid_state_in_country$/, "Enter a valid state for your shipping address country"],
                    [/province(_code)?_invalid_province_in_country$/, "Enter a valid province for your shipping address country"],
                    [/province(_code)?_invalid_region_in_country$/, "Enter a valid region for your shipping address country"],
                    [/company_blank$/, "Enter a company name for your shipping address"],
                    [/phone_blank$/, "Enter a valid phone number for your shipping address"],
                    [/zip(_code)?_blank$/, "Enter a ZIP code / postal code for your shipping address"],
                    [/zip(_code)?_invalid_for_country$/, "Enter a valid ZIP code / postal code for your shipping address"],
                    [/zip(_code)?_invalid_for_country_and_province$/, "Enter a valid ZIP code / postal code for your shipping address"],
                    [/email_invalid$/, "Enter a valid email address"],
                    [/generic_error$/, "An error occurred while processing your payment. Please try again."],
                    [/credit_card_processing$/, "Your card can't be processed due to technical difficulties. Please try again in a few minutes."],
                    [/not_enough_in_stock$/, "Some items became unavailable. Refresh your cart and try again."],
                    [/already_completed/, "Your items have already been purchased."],
                    [/empty_cart/, "Your cart is currently empty. Please add items to your cart and try again."],
                    [/full_name_required$/, "Enter both your first and last name"],
                    [/total_price_too_big$/, "Your order total exceeds the limit. Please edit your cart and try again."],
                    [/total_price_zero$/, "To check out with Apple Pay, your order total must be greater than 0. Please choose a new payment method and try again."],
                    [/no_shipping_option$/, "Sorry, we currently don't ship to this country. Please choose a new shipping address and try again."],
                    [/payment_in_progress$/, "Your order is being processed and can't be cancelled at this time. You will receive an email confirmation once the transaction is successful."],
                    [/payment_timeout$/, "The network connection was lost, but your payment is still processing. You'll receive an order confirmation shortly if the transaction is successful."],
                    [/expired_card/, "Your credit card is expired. Please update your card."],
                    [/card_declined/, "Your credit card was declined. In order to resolve this issue, you will need to contact your bank."],
                    [/(invalid|blank)$/, function(e) {
                        return "Enter a valid " + e
                    }]
                ],
                c = "An error occurred while processing your checkout. Please try again."
        }),
        Re = e(function(e, t) {
            "use strict";

            function P(e) {
                var t = e.toLowerCase();
                return {
                    amex: "american_express",
                    masterCard: "master"
                }[t] || t
            }

            function E(e) {
                return e && e.response && 422 === e.response.status
            }

            function C(e) {
                var t = 0 < arguments.length && e !== undefined ? arguments[0] : {},
                    n = t.checkout || t;
                return n.billing_address ? ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS : n.shipping_address ? ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS : ApplePaySession.STATUS_FAILURE
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function h(e) {
                    var t = e.apiClient,
                        n = e.sessionToken,
                        r = e.merchantName,
                        i = e.session,
                        a = e.strategy,
                        o = e.shopId,
                        c = e.showErrors,
                        s = e.closeCallback,
                        u = e.currency;
                    if (en(this, h), this.apiClient = t, this.strategy = a, this.currency = u, this._sessionToken = n || (0, Ce.generateRandomId)(), this._merchantName = r, this._session = i, this._shopId = o, this._showErrors = c, this._firstShippingContactSelected = !0, this._paymentInProgress = !1, this._sheetCancelled = !1, this._closeCallback = s, !a) throw new Error("`strategy` must be supplied to ShopifyApplePaySession");
                    this._session.oncancel = this._trackCallback("cancelled", this._onCancel).bind(this), this._session.onvalidatemerchant = this._trackCallback("merchant validated", this._onValidateMerchant.bind(this)), this._session.onshippingcontactselected = this._trackCallback("shipping contact selected", this._onShippingContactSelected).bind(this), this._session.onshippingmethodselected = this._trackCallback("shipping method selected", this._onShippingMethodSelected).bind(this), this._session.onpaymentauthorized = this._trackCallback("payment authorized", this._onPaymentAuthorized).bind(this), this._session.onpaymentmethodselected = this._trackCallback("payment method selected", this._onPaymentMethodSelected).bind(this)
                }
                return tn(h, [{
                    key: "begin",
                    value: function e() {
                        var t = this;
                        return this._sheetCancelled = !1, this.strategy.build(this.currency).then(function(e) {
                            return t.checkout = e
                        }).then(function() {
                            return t._session.begin()
                        })["catch"](function(e) {
                            return t._handleStrategyError(e)
                        })["catch"](function() {
                            return t._handleErrors((0, De.errorFromCode)("failed_session"))
                        })
                    }
                }, {
                    key: "_onCancel",
                    value: function t() {
                        return this._sheetCancelled = !0, this.apiClient.stopPolling(), this._paymentInProgress && this._showErrors([(0, De.errorFromCode)("payment_in_progress")], "Payment in progress"), this._closeCallback(), Promise.resolve()
                    }
                }, {
                    key: "_onValidateMerchant",
                    value: function i(e) {
                        var n = this,
                            t = e.validationURL,
                            r = {
                                domain: window.location.hostname,
                                id: this._sessionToken,
                                validation_url: t
                            };
                        return this.apiClient.post("/" + this._shopId + "/apple_pay/sessions", r).then(function(e) {
                            var t = e.body;
                            return n._session.completeMerchantValidation(t)
                        })["catch"](function() {
                            return n._handleErrors((0, De.errorFromCode)("failed_session"))
                        })
                    }
                }, {
                    key: "_onShippingContactSelected",
                    value: function r(e) {
                        var t = this,
                            n = {
                                partial_addresses: !0,
                                shipping_address: (0, Fe.addressFromEvent)(e.shippingContact)
                            };
                        return this._updateCheckout(n).then(this._fetchShippingRates.bind(this)).then(this._setDefaultShippingRate.bind(this)).then(function(e) {
                            return t._session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS, (0, Fe.transformedShippingRates)(t.availableShippingRates), (0, Fe.totalFromCheckout)(e, t._merchantName), (0, Fe.lineItemsFromCheckout)(e))
                        }).then(function() {
                            return t._firstShippingContactSelected = !1
                        })["catch"](function(e) {
                            return t._displayInitialAddressError(e)
                        })["catch"](function(e) {
                            return t._handleResponseError(e)
                        })["catch"](function(e) {
                            return t._catchPaymentRequestValidatorError(e)
                        })
                    }
                }, {
                    key: "_onShippingMethodSelected",
                    value: function a(e) {
                        var t = this,
                            n = {
                                shipping_line: {
                                    handle: e.shippingMethod.identifier
                                }
                            };
                        return this._updateCheckout(n).then(function(e) {
                            return t._session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, (0, Fe.totalFromCheckout)(e, t._merchantName), (0, Fe.lineItemsFromCheckout)(e))
                        })["catch"](function() {
                            return t._session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE)
                        })
                    }
                }, {
                    key: "_onPaymentAuthorized",
                    value: function c(e) {
                        var t = this,
                            n = e.payment,
                            r = n.token.paymentData,
                            i = {
                                email: n.billingContact.emailAddress || n.shippingContact.emailAddress,
                                billing_address: (0, Fe.addressFromEvent)(n.billingContact),
                                shipping_address: (0, Fe.addressFromEvent)(n.shippingContact),
                                credit_card: {
                                    brand: P(n.token.paymentMethod.network)
                                }
                            };
                        if (!1 !== this.checkout.requires_shipping && !this.checkout.shipping_line) return this._handleErrors([(0, De.errorFromCode)("no_shipping_option")]);
                        var a = {
                                unique_token: (0, Ce.generateRandomId)(),
                                amount: this.checkout.total_price,
                                payment_token: {
                                    type: "apple_pay",
                                    payment_data: JSON.stringify(r)
                                }
                            },
                            o = this._updateCheckout(i).then(this._submitPayment.bind(this, a)).then(this._completePayment.bind(this));
                        return (0, Ce.timeoutPromise)(o, 2e4)["catch"](function(e) {
                            return t._handlePaymentError(e)
                        })
                    }
                }, {
                    key: "_onPaymentMethodSelected",
                    value: function n() {
                        return this._session.completePaymentMethodSelection((0, Fe.totalFromCheckout)(this.checkout, this._merchantName), (0, Fe.lineItemsFromCheckout)(this.checkout)), Promise.resolve()
                    }
                }, {
                    key: "_fetchShippingRates",
                    value: function o() {
                        var n = this;
                        return !1 === this.checkout.requires_shipping ? (this.availableShippingRates = [], this.checkout) : this.apiClient.getShippingRates(this.checkout.token).then(function(e) {
                            var t = e.shipping_rates;
                            return n.availableShippingRates = (0, Fe.sortShippingRates)(t), n.checkout
                        })
                    }
                }, {
                    key: "_setDefaultShippingRate",
                    value: function s() {
                        if (!this.checkout.requires_shipping) return this.checkout;
                        var e = this.availableShippingRates || [],
                            t = e[0];
                        return t ? this._currentShippingRateAvailable(this.checkout, e) ? this.checkout : this._updateCheckout({
                            shipping_line: {
                                handle: t.id
                            }
                        }) : this.checkout
                    }
                }, {
                    key: "_currentShippingRateAvailable",
                    value: function u(e, t) {
                        return !!this.checkout.shipping_line && !!t.map(function(e) {
                            return e.id
                        }).includes(this.checkout.shipping_line.handle)
                    }
                }, {
                    key: "_getCheckout",
                    value: function l() {
                        var t = this;
                        return this.apiClient.getCheckout(this.checkout.token).then(function(e) {
                            return t.checkout = e.checkout
                        })
                    }
                }, {
                    key: "_updateCheckout",
                    value: function d(e) {
                        var t = this;
                        return this.apiClient.updateCheckout(this.checkout.token, {
                            checkout: e
                        }).then(function(e) {
                            return t.checkout = e.checkout
                        })
                    }
                }, {
                    key: "_submitPayment",
                    value: function f(e) {
                        return this._paymentInProgress = !0, this.apiClient.createPayment(this.checkout.token, e)
                    }
                }, {
                    key: "_completePayment",
                    value: function p(e) {
                        this._paymentInProgress = !1;
                        var t = e.payment,
                            n = t && t.transaction,
                            r = void 0;
                        if (t && t.payment_processing_error_message ? r = t.payment_processing_error_message : n && "success" !== n.status && "pending" !== n.status && (r = n.message || "Payment Transaction " + n.status), r) return this._handleErrors([r]), e;
                        this._session.completePayment(ApplePaySession.STATUS_SUCCESS), this._track("payment completed"), this._redirect(t.checkout.web_url)
                    }
                }, {
                    key: "_handlePaymentError",
                    value: function m(e) {
                        var t = this;
                        E(e) ? e.response.json().then(function(e) {
                            return C(e.errors)
                        }).then(function(e) {
                            return t._session.completePayment(e)
                        })["catch"](function() {
                            return t._session.completePayment(ApplePaySession.STATUS_FAILURE)
                        }) : "TimeoutPromiseError" === e.name && this._paymentInProgress ? (this.apiClient.stopPolling(), this._session.abort(), this._showErrors([(0, De.errorFromCode)("payment_timeout")], "Payment in progress")) : this._session.completePayment(ApplePaySession.STATUS_FAILURE)
                    }
                }, {
                    key: "_displayInitialAddressError",
                    value: function y(e) {
                        if (E(e) && this._firstShippingContactSelected) return this._session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS, [], (0, Fe.totalFromCheckout)(this.checkout, this._merchantName), (0, Fe.lineItemsFromCheckout)(this.checkout)), this._firstShippingContactSelected = !1, this.checkout;
                        throw e
                    }
                }, {
                    key: "_handleStrategyError",
                    value: function v(e) {
                        var n = this;
                        if (E(e)) return e.response.json().then(function(e) {
                            var t = e.errors;
                            return t.base ? n._showErrors((0, De.normalizeErrors)(t.base.map(function(e) {
                                return e.message
                            }))) : t
                        });
                        if (e && e.errorCode) return this._showErrors((0, De.normalizeErrors)((0, De.errorFromCode)(e.errorCode)));
                        throw e
                    }
                }, {
                    key: "_catchPaymentRequestValidatorError",
                    value: function g(e) {
                        switch (e.message) {
                            case "Total amount must be greater than zero":
                                return this._handleErrors([(0, De.errorFromCode)("total_price_zero")]);
                            case "Total amount is too big":
                                return this._handleErrors([(0, De.errorFromCode)("total_price_too_big")]);
                            default:
                                return this._session.abort()
                        }
                    }
                }, {
                    key: "_trackCallback",
                    value: function b(t, n) {
                        var r = this;
                        return function(e) {
                            return n.call(r, e).then(r._track(t))
                        }
                    }
                }, {
                    key: "_handleErrors",
                    value: function w(e) {
                        var t = this;
                        this._sheetCancelled && !this._paymentInProgress || (this._showErrors && setTimeout(function() {
                            t._showErrors((0, De.normalizeErrors)(e))
                        }, 200), this._closeCallback(), this._session.abort())
                    }
                }, {
                    key: "_handleResponseError",
                    value: function k(e) {
                        var n = this;
                        if (!E(e)) throw e;
                        e.response.json().then(function(e) {
                            var t = e.errors;
                            return n._handleErrors((0, De.errorMessagesFromJson)(t))
                        })["catch"](function(e) {
                            throw e
                        })
                    }
                }, {
                    key: "_track",
                    value: function _(e) {
                        window.ShopifyAnalytics && ShopifyAnalytics.lib && ShopifyAnalytics.lib.track && ShopifyAnalytics.lib.track("Apple Pay slate - " + e, {
                            strategy: this.strategy.identifier,
                            checkoutToken: this.checkout && this.checkout.token
                        })
                    }
                }, {
                    key: "_redirect",
                    value: function x(e) {
                        window.location = e
                    }
                }]), h
            }();
            t["default"] = n
        }),
        Ve = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function a(e) {
                    var t = 0 < arguments.length && e !== undefined ? arguments[0] : {},
                        n = t.apiClient,
                        r = t.type,
                        i = t.button;
                    en(this, a), this.gatewayParams = {
                        type: r
                    }, this.button = i, this.setApiClient(n), this.identifier = "NA"
                }
                return tn(a, [{
                    key: "setApiClient",
                    value: function t(e) {
                        this.apiClient = e
                    }
                }, {
                    key: "getCheckout",
                    value: function n(e) {
                        return this.apiClient.patch("/wallets/checkouts/" + e, this.params()).then(function(e) {
                            return e.checkout
                        })
                    }
                }, {
                    key: "createCheckout",
                    value: function r(e) {
                        return this.apiClient.post("/wallets/checkouts", this.params(e)).then(function(e) {
                            return e.checkout
                        })
                    }
                }, {
                    key: "params",
                    value: function i(e) {
                        return {
                            checkout: l({}, e, {
                                gateway_params: this.gatewayParams
                            })
                        }
                    }
                }]), a
            }();
            t["default"] = n
        }),
        Oe = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = k(Ve),
                s = 'form[action^="/cart"]',
                u = /^(https?:\/\/[^/]+)?\/checkout\/poll/,
                r = function(e) {
                    function o(e) {
                        var t = 0 < arguments.length && e !== undefined ? arguments[0] : {},
                            n = t.apiClient,
                            r = t.type,
                            i = t.button;
                        en(this, o);
                        var a = Qt(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this, {
                            apiClient: n,
                            type: r,
                            button: i
                        }));
                        return a.identifier = "cart", a.type = r, a
                    }
                    return Zt(o, e), tn(o, [{
                        key: "build",
                        value: function r(t) {
                            var n = this;
                            return this.updateCart().then(function(e) {
                                var t = e.token;
                                return t || Promise.reject({
                                    errorCode: "empty_cart"
                                })
                            }).then(function(e) {
                                return n.createCheckout({
                                    presentment_currency: t,
                                    cart_token: e
                                })
                            })
                        }
                    }, {
                        key: "createCheckout",
                        value: function t(e) {
                            return e.secret = !0, e.wallet_name = this.type, this.apiClient.post("/wallets/checkouts", this.params(e), {
                                pollingOptions: {
                                    poll: !1
                                }
                            }).then(this.handleThrottling.bind(this)).then(function(e) {
                                return e.checkout
                            })
                        }
                    }, {
                        key: "handleThrottling",
                        value: function n(e) {
                            if (202 === e.status && e.headers) {
                                var t = e.headers.get("Location");
                                return u.test(t) ? (this.redirectToQueue(), Promise.reject()) : this.apiClient.get(t)
                            }
                            return e
                        }
                    }, {
                        key: "updateCart",
                        value: function i() {
                            return fetch("/cart", {
                                method: "POST",
                                body: this.formData(),
                                headers: {
                                    Accept: "application/json"
                                },
                                credentials: "same-origin"
                            }).then(function(e) {
                                return e.json()
                            })
                        }
                    }, {
                        key: "redirectToQueue",
                        value: function a() {
                            var e = document.createElement("input");
                            e.type = "hidden", e.name = "checkout", e.value = "1", this.form.appendChild(e), this.form.submit()
                        }
                    }, {
                        key: "formData",
                        value: function e() {
                            var e = new FormData(this.form);
                            return e.append("__this_is_not_empty_form", "1"), e
                        }
                    }, {
                        key: "form",
                        get: function c() {
                            return this._form || (this._form = (0, Ce.getClosest)(this.button, s) || document.querySelector(s)), this._form
                        }
                    }]), o
                }(n["default"]);
            t["default"] = r
        }),
        Te = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function(e) {
                function c(e) {
                    var t = 0 < arguments.length && e !== undefined ? arguments[0] : {},
                        n = t.apiClient,
                        r = t.token,
                        i = t.type,
                        a = t.button;
                    en(this, c);
                    var o = Qt(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, {
                        apiClient: n,
                        type: i,
                        button: a
                    }));
                    return o.token = r, o.identifier = "checkout", o
                }
                return Zt(c, e), tn(c, [{
                    key: "build",
                    value: function t() {
                        return this.getCheckout(this.token)
                    }
                }]), c
            }(k(Ve)["default"]);
            t["default"] = n
        }),
        je = e(function(e, t) {
            "use strict";

            function n(e, t, n) {
                window.ShopifyAnalytics && ShopifyAnalytics.lib && ShopifyAnalytics.lib.track && ShopifyAnalytics.lib.track(e + " button - " + t, {
                    strategy: n
                })
            }

            function r(e, t) {
                var n = 1 < arguments.length && t !== undefined ? arguments[1] : "Transaction unsuccessful";
                return DigitalWalletsDialog.showMessage({
                    title: n,
                    errors: e,
                    button: "Return to checkout"
                })
            }

            function i(e, t) {
                return o(e, "cart", t)
            }

            function a(e, t) {
                return o(e, "product", t)
            }

            function o(e, t, n) {
                var r = 2 < arguments.length && n !== undefined ? arguments[2] : "Transaction unsuccessful";
                return Shopify.StorefrontExpressButtons.DigitalWalletsDialog.showMessage({
                    title: r,
                    errors: e,
                    button: "Return to " + t
                })
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.track = n, t.checkoutShowErrors = r, t.cartShowErrors = i, t.productShowErrors = a
        }),
        Me = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = k(Oe),
                a = k(Te),
                o = k(Ae),
                n = function() {
                    function r(e, t) {
                        if (en(this, r), this.strategyName = e.getAttribute("data-strategy"), !this.strategyName) throw new Error("Unspecified strategy");
                        this.button = e, this.type = t, this.apiClient = new o["default"];
                        var n = {
                            apiClient: this.apiClient,
                            token: Shopify.Checkout.token,
                            type: t,
                            button: e
                        };
                        switch (this.strategyName) {
                            case "cart":
                                this.strategy = new i["default"](n), this.showErrors = je.cartShowErrors;
                                break;
                            case "checkout":
                                this.strategy = new a["default"](n), this.showErrors = je.checkoutShowErrors, this.apiClient.host = Shopify.Checkout.apiHost
                        }
                    }
                    return tn(r, [{
                        key: "init",
                        value: function e() {
                            throw new Error("You must overwrite the init method.")
                        }
                    }]), r
                }();
            t["default"] = n
        }),
        Ie = e(function(e, t) {
            "use strict";

            function a(e, t) {
                e.style.display = e.getAttribute("data-display-value") || "inline-block", (0, je.track)(s, "shown", t)
            }

            function o(e) {
                e.preventDefault(), (0, je.track)(s, "clicked", this.strategy.identifier), this.disableButton();
                var t = new ApplePaySession(c, n(this.merchantCapabilities));
                new r["default"]({
                    merchantName: this.merchantCapabilities.merchantName,
                    currency: this.merchantCapabilities.currencyCode,
                    apiClient: this.apiClient,
                    strategy: this.strategy,
                    shopId: this.shopId,
                    showErrors: this.showErrors,
                    closeCallback: this.enableButton,
                    session: t
                }).begin()
            }

            function n(e) {
                var t = e.merchantName,
                    n = h(e, ["merchantName"]);
                return n.total = {
                    type: "pending",
                    label: t,
                    amount: "1.00"
                }, n
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = k(Re),
                i = k(Me),
                c = 1,
                s = "Apple Pay",
                u = function(e) {
                    function n(e) {
                        en(this, n);
                        var t = Qt(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, "apple_pay_web"));
                        return t.disableButton = function() {
                            t.button.disabled = !0
                        }, t.enableButton = function() {
                            t.button.disabled = !1
                        }, t
                    }
                    return Zt(n, e), tn(n, [{
                        key: "init",
                        value: function t() {
                            var i = this;
                            return (0, Ce.getCapabilities)("apple-pay-shop-capabilities").then(function(e) {
                                var t = e.shopId,
                                    n = e.merchantId,
                                    r = h(e, ["shopId", "merchantId"]);
                                return i.shopId = t, i.merchantId = n, i.merchantCapabilities = r, i.canMakePayments().then(function(e) {
                                    return e ? (a(i.button, i.strategy.identifier), i.button.addEventListener("click", o.bind(i)), Promise.resolve(i)) : Promise.reject(new Error("Apple Pay canMakePayments is false"))
                                })
                            })
                        }
                    }, {
                        key: "canMakePayments",
                        value: function r() {
                            return window.ApplePaySession ? Promise.resolve(ApplePaySession.canMakePayments()) : Promise.resolve(!1)
                        }
                    }]), n
                }(i["default"]);
            t["default"] = u
        }),
        Le = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function a(e) {
                    var t = e.target,
                        n = e.targetOrigin,
                        r = e.onMessageFn,
                        i = e.verifyOriginFn;
                    en(this, a), window.addEventListener("message", this.receive.bind(this)), this.target = t, this.targetOrigin = n, this.onMessageFn = r, this.verifyOriginFn = i
                }
                return tn(a, [{
                    key: "send",
                    value: function n(e) {
                        var t = JSON.stringify(e);
                        this.target.postMessage(t, this.targetOrigin)
                    }
                }, {
                    key: "receive",
                    value: function r(e) {
                        if (this.verifyOriginFn(e.origin)) try {
                            var t = JSON.parse(e.data);
                            this.onMessageFn(t)
                        } catch (n) {
                            console.log("Error parsing the event", e)
                        }
                    }
                }]), a
            }();
            t["default"] = n
        }),
        Be = e(function(e, t) {
            "use strict";

            function m() {
                if (!(1 < b.querySelectorAll("ul.alt-payment-list > li").length)) {
                    var e = b.querySelector("[data-alternative-payment-separator]");
                    e && (e.className += " hidden")
                }
            }

            function y(e) {
                return new URL(e).origin
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = k(Me),
                v = k(Le),
                g = "Google Pay",
                b = void 0,
                r = function(e) {
                    function n(e) {
                        en(this, n);
                        var t = Qt(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, e, "google_pay_web"));
                        return t.handleErrors = function() {
                            t.showErrors.apply(t, arguments)
                        }, b = (0, Ce.getDocumentContext)(e), t.iframe = b.querySelector("iframe.gpay-iframe"), t
                    }
                    return Zt(n, e), tn(n, [{
                        key: "init",
                        value: function t() {
                            var e = this;
                            return this.iframe ? (this.isOnCart() && this.sendCartOnFormUpdate(), this.iframe.onload = function() {
                                e.sendResource(), e.iframeOrigin = y(e.iframe.src), e.iframeClient = new v["default"]({
                                    target: e.iframe.contentWindow,
                                    targetOrigin: e.iframeOrigin,
                                    onMessageFn: e.onMessageReceived.bind(e),
                                    verifyOriginFn: e.verifyOrigin.bind(e)
                                })
                            }, Promise.resolve()) : Promise.reject("iframe could not be found")
                        }
                    }, {
                        key: "verifyOrigin",
                        value: function r(e) {
                            return e === this.iframeOrigin
                        }
                    }, {
                        key: "onMessageReceived",
                        value: function i(e) {
                            if (e.google_pay) {
                                var t = e.google_pay;
                                "available" in t ? t.available ? ((0, je.track)(g, "shown", this.strategy.identifier), this.displayButton()) : m() : t.redirect ? ((0, je.track)(g, "redirected", this.strategy.identifier), this.redirect(t.redirect)) : t.instrumentError ? ((0, je.track)(g, "errored", this.strategy.identifier), this.handleErrors(t.instrumentError)) : t.clicked && (0, je.track)(g, "clicked", this.strategy.identifier), this.hook()
                            }
                        }
                    }, {
                        key: "displayButton",
                        value: function a() {
                            (this.button.setAttribute("style", "display:inline-block;"),
                                this.isOnCheckout()) && b.querySelector(".alt-payment-list__item--google-pay").classList.add("alt-payment-list__item--google-pay-visible")
                        }
                    }, {
                        key: "sendResource",
                        value: function o() {
                            this.isOnCart() ? this.sendCart() : this.isOnCheckout() && this.sendCheckout()
                        }
                    }, {
                        key: "sendCartOnFormUpdate",
                        value: function c() {
                            var e = this;
                            this.form = (0, Ce.getClosest)(this.button, "form");
                            try {
                                new MutationObserver((0, Ce.debounce)(function() {
                                    return e.sendCart.bind(e)
                                }, 200)).observe(this.form, {
                                    subtree: !0,
                                    attributes: !0
                                })
                            } catch (t) {
                                console.log("GooglePayButton", t)
                            }
                        }
                    }, {
                        key: "sendCart",
                        value: function s() {
                            var t = this;
                            this.strategy.updateCart().then(function(e) {
                                t.sendMessage({
                                    cart: {
                                        token: e.token,
                                        currency: e.currency,
                                        price: e.total_price / 100
                                    }
                                })
                            })
                        }
                    }, {
                        key: "sendCheckout",
                        value: function u() {
                            var n = this;
                            Shopify.Checkout.token && this.strategy.apiClient.getCheckout(Shopify.Checkout.token).then(function(e) {
                                var t = e.checkout;
                                n.sendMessage({
                                    checkout: {
                                        token: t.token,
                                        currency: t.presentment_currency,
                                        price: t.total_price
                                    }
                                })
                            })
                        }
                    }, {
                        key: "isOnCart",
                        value: function h() {
                            return "cart" === this.strategy.identifier
                        }
                    }, {
                        key: "isOnCheckout",
                        value: function l() {
                            return "checkout" === this.strategy.identifier
                        }
                    }, {
                        key: "sendMessage",
                        value: function d(e) {
                            this.iframeClient.send({
                                google_pay: e
                            })
                        }
                    }, {
                        key: "redirect",
                        value: function f(e) {
                            window.location.assign(e)
                        }
                    }, {
                        key: "hook",
                        value: function p() {}
                    }]), n
                }(n["default"]);
            t["default"] = r
        });
    ! function(e) {
        "use strict";

        function a(e, t, n, r) {
            var i = t && t.prototype instanceof c ? t : c,
                a = Object.create(i.prototype),
                o = new d(r || []);
            return a._invoke = s(e, n, o), a
        }

        function h(e, t, n) {
            try {
                return {
                    type: "normal",
                    arg: e.call(t, n)
                }
            } catch (r) {
                return {
                    type: "throw",
                    arg: r
                }
            }
        }

        function c() {}

        function n() {}

        function t() {}

        function r(e) {
            ["next", "throw", "return"].forEach(function(t) {
                e[t] = function(e) {
                    return this._invoke(t, e)
                }
            })
        }

        function o(c) {
            function s(e, t, n, r) {
                var i = h(c[e], c, t);
                if ("throw" !== i.type) {
                    var a = i.arg,
                        o = a.value;
                    return o && "object" == typeof o && v.call(o, "__await") ? Promise.resolve(o.__await).then(function(e) {
                        s("next", e, n, r)
                    }, function(e) {
                        s("throw", e, n, r)
                    }) : Promise.resolve(o).then(function(e) {
                        a.value = e, n(a)
                    }, function(e) {
                        return s("throw", e, n, r)
                    })
                }
                r(i.arg)
            }

            function e(n, r) {
                function e() {
                    return new Promise(function(e, t) {
                        s(n, r, e, t)
                    })
                }
                return t = t ? t.then(e, e) : e()
            }
            var t;
            this._invoke = e
        }

        function s(a, o, c) {
            var s = P;
            return function u(e, t) {
                if (s === C) throw new Error("Generator is already running");
                if (s === S) {
                    if ("throw" === e) throw t;
                    return p()
                }
                for (c.method = e, c.arg = t;;) {
                    var n = c.delegate;
                    if (n) {
                        var r = l(n, c);
                        if (r) {
                            if (r === A) continue;
                            return r
                        }
                    }
                    if ("next" === c.method) c.sent = c._sent = c.arg;
                    else if ("throw" === c.method) {
                        if (s === P) throw s = S, c.arg;
                        c.dispatchException(c.arg)
                    } else "return" === c.method && c.abrupt("return", c.arg);
                    s = C;
                    var i = h(a, o, c);
                    if ("normal" === i.type) {
                        if (s = c.done ? S : E, i.arg === A) continue;
                        return {
                            value: i.arg,
                            done: c.done
                        }
                    }
                    "throw" === i.type && (s = S, c.method = "throw", c.arg = i.arg)
                }
            }
        }

        function l(e, t) {
            var n = e.iterator[t.method];
            if (n === m) {
                if (t.delegate = null, "throw" === t.method) {
                    if (e.iterator["return"] && (t.method = "return", t.arg = m, l(e, t), "throw" === t.method)) return A;
                    t.method = "throw", t.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return A
            }
            var r = h(n, e.iterator, t.arg);
            if ("throw" === r.type) return t.method = "throw", t.arg = r.arg, t.delegate = null, A;
            var i = r.arg;
            return i ? i.done ? (t[e.resultName] = i.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = m), t.delegate = null, A) : i : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, A)
        }

        function i(e) {
            var t = {
                tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t)
        }

        function u(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t
        }

        function d(e) {
            this.tryEntries = [{
                tryLoc: "root"
            }], e.forEach(i, this), this.reset(!0)
        }

        function f(e) {
            if (e) {
                var t = e[b];
                if (t) return t.call(e);
                if ("function" == typeof e.next) return e;
                if (!isNaN(e.length)) {
                    var n = -1,
                        r = function r() {
                            for (; ++n < e.length;)
                                if (v.call(e, n)) return r.value = e[n], r.done = !1, r;
                            return r.value = m, r.done = !0, r
                        };
                    return r.next = r
                }
            }
            return {
                next: p
            }
        }

        function p() {
            return {
                value: m,
                done: !0
            }
        }
        var m, y = Object.prototype,
            v = y.hasOwnProperty,
            g = "function" == typeof Symbol ? Symbol : {},
            b = g.iterator || "@@iterator",
            w = g.asyncIterator || "@@asyncIterator",
            k = g.toStringTag || "@@toStringTag",
            _ = "object" == typeof module,
            x = e.regeneratorRuntime;
        if (x) _ && (module.exports = x);
        else {
            (x = e.regeneratorRuntime = _ ? module.exports : {}).wrap = a;
            var P = "suspendedStart",
                E = "suspendedYield",
                C = "executing",
                S = "completed",
                A = {},
                z = {};
            z[b] = function() {
                return this
            };
            var F = Object.getPrototypeOf,
                D = F && F(F(f([])));
            D && D !== y && v.call(D, b) && (z = D);
            var R = t.prototype = c.prototype = Object.create(z);
            n.prototype = R.constructor = t, t.constructor = n, t[k] = n.displayName = "GeneratorFunction", x.isGeneratorFunction = function(e) {
                var t = "function" == typeof e && e.constructor;
                return !!t && (t === n || "GeneratorFunction" === (t.displayName || t.name))
            }, x.mark = function(e) {
                return Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t, k in e || (e[k] = "GeneratorFunction")), e.prototype = Object.create(R), e
            }, x.awrap = function(e) {
                return {
                    __await: e
                }
            }, r(o.prototype), o.prototype[w] = function() {
                return this
            }, x.AsyncIterator = o, x.async = function(e, t, n, r) {
                var i = new o(a(e, t, n, r));
                return x.isGeneratorFunction(t) ? i : i.next().then(function(e) {
                    return e.done ? e.value : i.next()
                })
            }, r(R), R[k] = "Generator", R[b] = function() {
                return this
            }, R.toString = function() {
                return "[object Generator]"
            }, x.keys = function(t) {
                var n = [];
                for (var e in t) n.push(e);
                return n.reverse(),
                    function r() {
                        for (; n.length;) {
                            var e = n.pop();
                            if (e in t) return r.value = e, r.done = !1, r
                        }
                        return r.done = !0, r
                    }
            }, x.values = f, d.prototype = {
                constructor: d,
                reset: function(e) {
                    if (this.prev = 0, this.next = 0, this.sent = this._sent = m, this.done = !1, this.delegate = null, this.method = "next", this.arg = m, this.tryEntries.forEach(u), !e)
                        for (var t in this) "t" === t.charAt(0) && v.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = m)
                },
                stop: function() {
                    this.done = !0;
                    var e = this.tryEntries[0].completion;
                    if ("throw" === e.type) throw e.arg;
                    return this.rval
                },
                dispatchException: function(n) {
                    function e(e, t) {
                        return a.type = "throw", a.arg = n, r.next = e, t && (r.method = "next", r.arg = m), !!t
                    }
                    if (this.done) throw n;
                    for (var r = this, t = this.tryEntries.length - 1; 0 <= t; --t) {
                        var i = this.tryEntries[t],
                            a = i.completion;
                        if ("root" === i.tryLoc) return e("end");
                        if (i.tryLoc <= this.prev) {
                            var o = v.call(i, "catchLoc"),
                                c = v.call(i, "finallyLoc");
                            if (o && c) {
                                if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                                if (this.prev < i.finallyLoc) return e(i.finallyLoc)
                            } else if (o) {
                                if (this.prev < i.catchLoc) return e(i.catchLoc, !0)
                            } else {
                                if (!c) throw new Error("try statement without catch or finally");
                                if (this.prev < i.finallyLoc) return e(i.finallyLoc)
                            }
                        }
                    }
                },
                abrupt: function(e, t) {
                    for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                        var r = this.tryEntries[n];
                        if (r.tryLoc <= this.prev && v.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
                            var i = r;
                            break
                        }
                    }
                    i && ("break" === e || "continue" === e) && i.tryLoc <= t && t <= i.finallyLoc && (i = null);
                    var a = i ? i.completion : {};
                    return a.type = e, a.arg = t, i ? (this.method = "next", this.next = i.finallyLoc, A) : this.complete(a)
                },
                complete: function(e, t) {
                    if ("throw" === e.type) throw e.arg;
                    return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), A
                },
                finish: function(e) {
                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                        var n = this.tryEntries[t];
                        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), u(n), A
                    }
                },
                "catch": function(e) {
                    for (var t = this.tryEntries.length - 1; 0 <= t; --t) {
                        var n = this.tryEntries[t];
                        if (n.tryLoc === e) {
                            var r = n.completion;
                            if ("throw" === r.type) {
                                var i = r.arg;
                                u(n)
                            }
                            return i
                        }
                    }
                    throw new Error("illegal catch attempt")
                },
                delegateYield: function(e, t, n) {
                    return this.delegate = {
                        iterator: f(e),
                        resultName: t,
                        nextLoc: n
                    }, "next" === this.method && (this.arg = m), A
                }
            }
        }
    }(function() {
        return this || "object" == typeof self && self
    }() || Function("return this")());
    var Ne = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function n(e, t) {
                    en(this, n), this.strategy = e, this.currency = t
                }
                return tn(n, [{
                    key: "fetch",
                    value: function e() {
                        var t = this;
                        return this.strategy.updateCart().then(function(e) {
                            return {
                                cart_token: e.token,
                                secret: !0,
                                presentment_currency: t.currency
                            }
                        })
                    }
                }, {
                    key: "estimatePrice",
                    value: function t() {
                        return this.strategy.updateCart().then(function(e) {
                            var t = e.total_price;
                            return String(t / 100)
                        })
                    }
                }]), n
            }();
            t["default"] = n
        }),
        He = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            t.ResponseError = function(e) {
                function n(e) {
                    en(this, n);
                    var t = Qt(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, "Response error"));
                    return t.response = e, t
                }
                return Zt(n, e), n
            }(Error)
        }),
        Ue = e(function(e, t) {
            "use strict";

            function h(n) {
                return l(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function t(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (200 <= n.status && n.status < 300) return e.abrupt("return", n);
                                e.next = 2;
                                break;
                            case 2:
                                throw new He.ResponseError(n);
                            case 3:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ApiClient = undefined;
            var l = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                d = function(e) {
                    function t(e) {
                        return en(this, t), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "API request polling timed out. Exceeded maximum timeout of " + e + "ms"))
                    }
                    return Zt(t, e), t
                }(Error),
                f = function(e) {
                    function t() {
                        en(this, t);
                        var e = Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
                        return e.message = "Missing location header", e
                    }
                    return Zt(t, e), t
                }(Error),
                p = {
                    poll: !0,
                    timeout: 2e4
                };
            t.ApiClient = function() {
                function i(e, t) {
                    var n = 0 < arguments.length && e !== undefined ? arguments[0] : null,
                        r = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                    en(this, i), n && (this.host = n), this.headers = Object.assign({
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }, r)
                }
                return tn(i, [{
                    key: "get",
                    value: function r(e, t) {
                        var n = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                        return this.request("GET", e, null, n)
                    }
                }, {
                    key: "post",
                    value: function a(e, t, n) {
                        var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                        return this.request("POST", e, t, r)
                    }
                }, {
                    key: "patch",
                    value: function o(e, t, n) {
                        var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                        return this.request("PATCH", e, t, r)
                    }
                }, {
                    key: "put",
                    value: function c(e, t, n) {
                        var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                        return this.request("PUT", e, t, r)
                    }
                }, {
                    key: "stopPolling",
                    value: function e() {
                        this.pollExpiryTimeout && window.clearTimeout(this.pollExpiryTimeout), this.pollScheduleTimeout && window.clearTimeout(this.pollScheduleTimeout)
                    }
                }, {
                    key: "request",
                    value: function t(a, o, c, s) {
                        return l(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n, r;
                            return regeneratorRuntime.wrap(function i(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return t = {
                                            body: JSON.stringify(c)
                                        }, "GET" === a && delete t.body, "/" === o[0] && this.host && (o = "https://" + this.host + o), e.next = 5, fetch(o, Object.assign({
                                            method: a,
                                            headers: this.headers,
                                            credentials: "same-origin"
                                        }, t));
                                    case 5:
                                        return n = e.sent, e.next = 8, this.pollRequest(s, n);
                                    case 8:
                                        return r = e.sent, e.abrupt("return", h(r));
                                    case 10:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "poll",
                    value: function n(r, i) {
                        return l(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t;
                            return regeneratorRuntime.wrap(function n(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, this.pollRequest(r, i);
                                    case 2:
                                        return t = e.sent, e.abrupt("return", h(t));
                                    case 4:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "pollRequest",
                    value: function u(e, t) {
                        var n = this,
                            r = "undefined" != typeof e.poll ? e.poll : p.poll,
                            c = "undefined" != typeof e.timeout ? e.timeout : p.timeout;
                        if (!r || 202 !== t.status) return Promise.resolve(t);
                        var s = {
                            method: "GET",
                            headers: this.headers
                        };
                        return new Promise(function(r, i) {
                            var a = n;
                            a.pollExpiryTimeout = window.setTimeout(function() {
                                n.pollScheduleTimeout && clearTimeout(n.pollScheduleTimeout), i(new d(c))
                            }, c),
                                function o(e) {
                                    if (202 === e.status) {
                                        var t = e.headers.get("Location");
                                        if (!t) return void i(new f);
                                        var n = 1e3 * (Number(e.headers.get("Retry-After")) || 1);
                                        a.pollScheduleTimeout = window.setTimeout(function() {
                                            fetch(t, s).then(o.bind(a))["catch"](i)
                                        }, n)
                                    } else a.pollExpiryTimeout && window.clearTimeout(a.pollExpiryTimeout), r(e)
                                }.call(n, t)
                        })
                    }
                }]), i
            }()
        }),
        qe = e(function(e, t) {
            "use strict";

            function n(e) {
                for (var t, n = String(e), r = 0, i = 0, a = c, o = ""; n.charAt(0 | i) || (a = "=", i % 1); o += a.charAt(63 & r >> 8 - i % 1 * 8)) {
                    if (255 < (t = n.charCodeAt(i += .75))) throw new s("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    r = r << 8 | t
                }
                return o
            }

            function r(e) {
                var t = String(e).replace(/[=]+$/, "");
                if (t.length % 4 == 1) throw new s("'atob' failed: The string to be decoded is not correctly encoded.");
                for (var n, r = 0, i = 0, a = 0, o = ""; n = t.charAt(a++); ~n && (i = r % 4 ? 64 * i + n : n, r++ % 4) ? o += String.fromCharCode(255 & i >> (-2 * r & 6)) : 0) n = c.indexOf(n);
                return o
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.btoa = n, t.atob = r;
            var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                s = function(e) {
                    function t() {
                        return en(this, t), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return Zt(t, e), t
                }(Error)
        }),
        Ge = e(function(e, t) {
            "use strict";

            function n(e) {
                var t = document.querySelector('meta[name="' + r + "-" + e + '"]');
                return t && t.getAttribute("content") || ""
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = "shopify-checkout",
                i = t.CheckoutMetadata = {
                    getApiToken: function a() {
                        return n("api-token")
                    },
                    getAuthorizationToken: function o() {
                        return n("authorization-token")
                    }
                };
            t["default"] = i
        }),
        $e = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "ApiClient", {
                enumerable: !0,
                get: function n() {
                    return Ue.ApiClient
                }
            }), Object.defineProperty(t, "CheckoutApiClient", {
                enumerable: !0,
                get: function r() {
                    return Ke.CheckoutApiClient
                }
            }), Object.defineProperty(t, "ResponseError", {
                enumerable: !0,
                get: function i() {
                    return He.ResponseError
                }
            })
        }),
        Ke = e(function(e, t) {
            "use strict";

            function f(e) {
                var t = document.cookie.split("; "),
                    n = !0,
                    r = !1,
                    i = undefined;
                try {
                    for (var a, o = t[Symbol.iterator](); !(n = (a = o.next()).done); n = !0) {
                        var c = a.value.split("="),
                            s = rn(c, 2),
                            u = s[0],
                            h = s[1];
                        if (u === e) return h
                    }
                } catch (l) {
                    r = !0, i = l
                } finally {
                    try {
                        !n && o["return"] && o["return"]()
                    } finally {
                        if (r) throw i
                    }
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.CheckoutApiClient = undefined, t.getCookieValue = f;
            var p = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                m = "X-Shopify-Checkout-Authorization-Token";
            t.CheckoutApiClient = function(e) {
                function s(e) {
                    var t = 0 < arguments.length && e !== undefined ? arguments[0] : {};
                    en(this, s);
                    var n = t.accessToken,
                        r = t.secretKey;
                    n || (n = Ge.CheckoutMetadata.getApiToken());
                    var i = {
                            Authorization: "Basic " + (0, qe.btoa)(n),
                            "X-Shopify-Checkout-Version": "2018-03-05",
                            "X-Shopify-VisitToken": f("_shopify_s"),
                            "X-Shopify-UniqueToken": f("_shopify_y")
                        },
                        a = Qt(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, t.host, i));
                    return r ? (a.secretKey = r, a.storeAuthorizationToken(r)) : (a.secretKey = "", a.storeAuthorizationToken(Ge.CheckoutMetadata.getAuthorizationToken())), a
                }
                return Zt(s, e), tn(s, [{
                    key: "request",
                    value: function n(r, i, a, o) {
                        var t = this,
                            c = function c(e) {
                                return nn(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), e, t)
                            };
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t;
                            return regeneratorRuntime.wrap(function n(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, c("request").call(this, r, i, a, o);
                                    case 2:
                                        return t = e.sent, this.extractAuthorizationToken(t), e.abrupt("return", t);
                                    case 5:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "storeAuthorizationToken",
                    value: function t(e) {
                        e && (this.secretKey = e, this.headers[m] = e)
                    }
                }, {
                    key: "getCheckout",
                    value: function r(a) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n, r;
                            return regeneratorRuntime.wrap(function i(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, this.get("/wallets/checkouts/" + a + ".json");
                                    case 2:
                                        return t = e.sent, e.next = 5, t.json();
                                    case 5:
                                        return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                    case 8:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "createCheckout",
                    value: function i(a) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n, r;
                            return regeneratorRuntime.wrap(function i(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return a.checkout && null == a.checkout.secret && (a.checkout.secret = !0), e.next = 3, this.post("/wallets/checkouts.json", a, {
                                            poll: !1
                                        });
                                    case 3:
                                        return t = e.sent, e.next = 6, t.json();
                                    case 6:
                                        return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                    case 9:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "updateCheckout",
                    value: function c(a, o) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n, r;
                            return regeneratorRuntime.wrap(function i(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, this.patch("/wallets/checkouts/" + a + ".json", {
                                            checkout: o
                                        });
                                    case 2:
                                        return t = e.sent, e.next = 5, t.json();
                                    case 5:
                                        return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                    case 8:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "addReductionCode",
                    value: function u(a, o) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n, r;
                            return regeneratorRuntime.wrap(function i(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, this.patch("/wallets/checkouts/" + a + ".json", {
                                            checkout: {
                                                reduction_code: o
                                            }
                                        });
                                    case 2:
                                        return t = e.sent, e.next = 5, t.json();
                                    case 5:
                                        return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                    case 8:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "getShippingRates",
                    value: function o(a) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n, r;
                            return regeneratorRuntime.wrap(function i(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, this.get("/wallets/checkouts/" + a + "/shipping_rates.json");
                                    case 2:
                                        return t = e.sent, e.next = 5, t.json();
                                    case 5:
                                        return n = e.sent, r = n.shipping_rates, e.abrupt("return", r);
                                    case 8:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "createPayment",
                    value: function h(i, a, o) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n;
                            return regeneratorRuntime.wrap(function r(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, this.post("/wallets/checkouts/" + i + "/payments.json", {
                                            payment: a
                                        }, o);
                                    case 2:
                                        return t = e.sent, e.next = 5, t.json();
                                    case 5:
                                        return n = e.sent, e.abrupt("return", n.payment);
                                    case 7:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "createPaymentSession",
                    value: function l(i, a) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n;
                            return regeneratorRuntime.wrap(function r(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, fetch(i, {
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify(a),
                                            mode: "cors",
                                            method: "POST"
                                        });
                                    case 2:
                                        return t = e.sent, e.next = 5, t.json();
                                    case 5:
                                        return n = e.sent, e.abrupt("return", n);
                                    case 7:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "completeFreeCheckout",
                    value: function d(a) {
                        return p(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t, n, r;
                            return regeneratorRuntime.wrap(function i(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, this.post("/wallets/checkouts/" + a + "/complete.json", {
                                            checkout: {
                                                token: a,
                                                order: null
                                            }
                                        });
                                    case 2:
                                        return t = e.sent, e.next = 5, t.json();
                                    case 5:
                                        return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                    case 8:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }, {
                    key: "extractAuthorizationToken",
                    value: function a(e) {
                        var t = e.headers.get(m);
                        e.ok && this.storeAuthorizationToken(t)
                    }
                }]), s
            }($e.ApiClient)
        }),
        We = e(function(e, t) {
            "use strict";

            function d(e, t) {
                var n = parseFloat(e.price),
                    r = parseFloat(t.price);
                return n < r ? -1 : r < n ? 1 : 0
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var f = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                n = t.CheckoutApiWrapper = function() {
                    function n(e, t) {
                        en(this, n), this.attributes = e, this.apiClient = t, this.token = e.token, this.secretKey = t.secretKey, this.shippingRates = []
                    }
                    return tn(n, [{
                        key: "addReductionCode",
                        value: function t(e) {
                            return this.update({
                                reduction_code: e
                            })
                        }
                    }, {
                        key: "removeDiscount",
                        value: function e() {
                            return this.update({
                                discount_code: null
                            })
                        }
                    }, {
                        key: "removeGiftCard",
                        value: function r(e) {
                            return this.update({
                                applied_gift_cards: {
                                    0: {
                                        id: e,
                                        _delete: !0
                                    }
                                }
                            })
                        }
                    }, {
                        key: "refreshShippingRates",
                        value: function i() {
                            return f(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.attributes.requires_shipping) return e.next = 3, this.apiClient.getShippingRates(this.token);
                                            e.next = 11;
                                            break;
                                        case 3:
                                            if (t = e.sent, this.shippingRates = t.sort(d), this.shippingRates.length && !this.attributes.shipping_line) return n = this.shippingRates[0], e.next = 9, this.selectShippingRate(n.id);
                                            e.next = 9;
                                            break;
                                        case 9:
                                            e.next = 12;
                                            break;
                                        case 11:
                                            this.shippingRates = [];
                                        case 12:
                                            return e.abrupt("return", this.shippingRates);
                                        case 13:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "selectShippingRate",
                        value: function a(n) {
                            return f(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this.update({
                                                shipping_line: {
                                                    handle: n
                                                }
                                            }));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "createPayment",
                        value: function o(i) {
                            return f(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.createPayment(this.token, i);
                                        case 2:
                                            return t = e.sent, n = t.transaction, !t.payment_processing_error_message && n && "success" !== n.status && "pending" !== n.status && (t.payment_processing_error_message = n.message || "Payment Transaction " + n.status), t.isSuccess = !t.payment_processing_error_message, e.abrupt("return", t);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "createPaymentSession",
                        value: function c(r) {
                            return f(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = this.attributes.payment_url, e.abrupt("return", this.apiClient.createPaymentSession(t, r));
                                        case 2:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "completeFreeCheckout",
                        value: function s() {
                            return f(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.completeFreeCheckout(this.token);
                                        case 2:
                                            return this.attributes = e.sent, e.abrupt("return", this);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "reload",
                        value: function u() {
                            return f(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.getCheckout(this.token);
                                        case 2:
                                            return this.attributes = e.sent, e.abrupt("return", this);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "stopPolling",
                        value: function h() {
                            this.apiClient.stopPolling()
                        }
                    }, {
                        key: "update",
                        value: function l(n) {
                            return f(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.updateCheckout(this.token, n);
                                        case 2:
                                            return this.attributes = e.sent, e.abrupt("return", this);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), n
                }();
            t["default"] = n
        }),
        Ye = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = t.EventEmitter = function() {
                function e() {
                    en(this, e), this.subscribers = {}
                }
                return tn(e, [{
                    key: "subscribe",
                    value: function i(e, t) {
                        var n = this.subscribers[e] || (this.subscribers[e] = new Set);
                        return n.add(t), {
                            unsubscribe: function r() {
                                n["delete"](t)
                            }
                        }
                    }
                }, {
                    key: "broadcast",
                    value: function a(e, t) {
                        var n = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                        n.timestamp = Date.now();
                        var r = this.subscribers[e];
                        r && r.forEach(function(e) {
                            return e(n)
                        })
                    }
                }]), e
            }();
            t.eventEmitter = new n
        }),
        Je = e(function(e, t) {
            "use strict";

            function f(e, t) {
                return 202 === e.status && Boolean(e.headers.get("Retry-After")) && Boolean(e.headers.get("Location")) && "google_pay" !== t
            }

            function p(r) {
                return y(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    var t;
                    return regeneratorRuntime.wrap(function n(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (t = !1, r instanceof $e.ResponseError && r.response && 422 === r.response.status) return e.next = 4, r.response.json();
                                e.next = 6;
                                break;
                            case 4:
                                e.sent.errors.reduction_code && (t = !0);
                            case 6:
                                return e.abrupt("return", t);
                            case 7:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var m = k(We),
                y = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                v = function v(e) {
                    return e.line_items !== undefined
                },
                n = function() {
                    function i(e, t, n) {
                        var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                        en(this, i), this.dataSource = e, this.checkout = r.checkout || null, this.discountCode = r.discountCode || null, this.currency = r.currency, this.context = null, this.apiClient = new $e.CheckoutApiClient({
                            accessToken: t
                        }), this.eventEmitter = new Ye.EventEmitter
                    }
                    return tn(i, [{
                        key: "estimatePrice",
                        value: function t() {
                            return y(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.dataSource.estimatePrice) {
                                                e.next = 2;
                                                break
                                            }
                                            throw new TypeError("There is no estimatePrice method on this data source.");
                                        case 2:
                                            return e.next = 4, this.dataSource.estimatePrice();
                                        case 4:
                                            return e.abrupt("return", e.sent);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "hasCheckout",
                        value: function e() {
                            return null !== this.checkout
                        }
                    }, {
                        key: "checkoutAttributes",
                        value: function n() {
                            return null === this.checkout ? null : this.checkout.attributes
                        }
                    }, {
                        key: "updateCheckout",
                        value: function r(n) {
                            return y(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.checkout) {
                                                e.next = 2;
                                                break
                                            }
                                            throw new TypeError("No checkout created, could not update it.");
                                        case 2:
                                            return e.next = 4, this.checkout.update(n);
                                        case 4:
                                            return e.abrupt("return", e.sent);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "onError",
                        value: function a(e) {
                            this.eventEmitter.subscribe("checkout-api:error", e)
                        }
                    }, {
                        key: "onThrottled",
                        value: function o(e) {
                            this.eventEmitter.subscribe("checkout-api:throttled", e)
                        }
                    }, {
                        key: "build",
                        value: function c(a, o) {
                            return y(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.dataSource.fetch();
                                        case 2:
                                            if (t = e.sent, n = Object.assign({}, t, o, {
                                                    secret: !0,
                                                    wallet_name: a,
                                                    is_upstream_button: "buy_now" === this.context
                                                }), null === this.checkout) return this.currency && (n.presentment_currency = this.currency), e.next = 8, this.createCheckout(n);
                                            e.next = 11;
                                            break;
                                        case 8:
                                            this.checkout = e.sent, e.next = 16;
                                            break;
                                        case 11:
                                            if (v(n) && this.lineItemsChanged(n.line_items)) return e.next = 14, this.apiClient.updateCheckout(this.checkout.token, n);
                                            e.next = 16;
                                            break;
                                        case 14:
                                            r = e.sent, this.checkout = new m["default"](r, this.apiClient);
                                        case 16:
                                            return e.abrupt("return", this.checkout);
                                        case 17:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "forceReviewStep",
                        value: function s() {
                            return y(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.checkout) {
                                                e.next = 2;
                                                break
                                            }
                                            throw new TypeError("No checkout found.");
                                        case 2:
                                            return e.next = 4, this.checkout.refreshShippingRates();
                                        case 4:
                                            return e.next = 6, this.checkout.update({
                                                web_buyer_must_review_checkout: !0
                                            });
                                        case 6:
                                            return e.abrupt("return", this.checkout);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "setContext",
                        value: function u(e) {
                            this.context = e
                        }
                    }, {
                        key: "setDiscountCode",
                        value: function h(e) {
                            this.discountCode = e
                        }
                    }, {
                        key: "createCheckout",
                        value: function l(o) {
                            return y(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r, i;
                                return regeneratorRuntime.wrap(function a(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return n = t = void 0, e.prev = 2, e.next = 5, this.apiClient.post("/wallets/checkouts.json", {
                                                checkout: o
                                            }, {
                                                poll: !1
                                            });
                                        case 5:
                                            return n = e.sent, e.next = 8, n.json();
                                        case 8:
                                            r = e.sent, t = r.checkout, e.next = 16;
                                            break;
                                        case 12:
                                            throw e.prev = 12, e.t0 = e["catch"](2), this.eventEmitter.broadcast("checkout-api:error", e.t0), e.t0;
                                        case 16:
                                            if (f(n, o.wallet_name)) return e.prev = 17, this.eventEmitter.broadcast("checkout-api:throttled"), e.next = 21, this.apiClient.poll({
                                                timeout: 9e4
                                            }, n);
                                            e.next = 32;
                                            break;
                                        case 21:
                                            return n = e.sent, e.next = 24, n.json();
                                        case 24:
                                            i = e.sent, t = i.checkout, e.next = 32;
                                            break;
                                        case 28:
                                            throw e.prev = 28, e.t1 = e["catch"](17), this.eventEmitter.broadcast("checkout-api:error", e.t1), e.t1;
                                        case 32:
                                            if (this.discountCode) return e.prev = 33, e.next = 36, this.apiClient.addReductionCode(t.token, this.discountCode);
                                            e.next = 46;
                                            break;
                                        case 36:
                                            t = e.sent, e.next = 46;
                                            break;
                                        case 39:
                                            return e.prev = 39, e.t2 = e["catch"](33), e.next = 43, p(e.t2);
                                        case 43:
                                            if (e.sent) {
                                                e.next = 46;
                                                break
                                            }
                                            throw e.t2;
                                        case 46:
                                            return e.abrupt("return", new m["default"](t, this.apiClient));
                                        case 47:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this, [
                                    [2, 12],
                                    [17, 28],
                                    [33, 39]
                                ])
                            }))
                        }
                    }, {
                        key: "lineItemsChanged",
                        value: function d(e) {
                            if (null === this.checkout) return !1;
                            var n = this.checkout.attributes.line_items;
                            return e.length !== n.length || e.every(function(e, t) {
                                return e.quantity !== n[t].quantity || e.variant_id !== n[t].variant_id
                            })
                        }
                    }]), i
                }();
            t["default"] = n
        }),
        Xe = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "CheckoutManager", {
                enumerable: !0,
                get: function n() {
                    return k(Je)["default"]
                }
            })
        }),
        Ze = e(function(e, t) {
            "use strict";

            function o(e) {
                return window[e]
            }

            function c(r, e) {
                var i = e.constant,
                    a = e.event;
                return new Promise(function(e, t) {
                    function n() {
                        i ? e(window[i]) : e()
                    }
                    a ? s(window, a, n) : (r.addEventListener("load", n), r.addEventListener("error", t))
                })
            }

            function s(r, e, i) {
                var a = r[e];
                r[e] = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    a && a.call(r, t), i.call(r, t)
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = t.ScriptLoader = function() {
                function e() {
                    en(this, e)
                }
                return tn(e, null, [{
                    key: "inject",
                    value: function a(e, t) {
                        var n = t.constant,
                            r = t.event;
                        if (n && o(n)) return Promise.resolve(window[n]);
                        var i = this.find(e);
                        return i || (i = t.dataset ? this.insert(e, t.dataset) : this.insert(e)), c(i, {
                            constant: n,
                            event: r
                        })
                    }
                }, {
                    key: "insert",
                    value: function r(e, t) {
                        var n = document.createElement("script");
                        return n.src = e, t && Object.keys(t).forEach(function(e) {
                            n.dataset[e] = t[e]
                        }), (document.head || document.getElementsByTagName("head")[0]).appendChild(n)
                    }
                }, {
                    key: "find",
                    value: function t(e) {
                        return document.querySelector('script[src="' + e + '"]')
                    }
                }]), e
            }();
            t["default"] = n
        }),
        Qe = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getGoogleClient = t.GoogleClient = undefined;
            var s = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                h = function h(e) {
                    var t = e.name.split(" "),
                        n = an(t);
                    return {
                        first_name: n[0],
                        last_name: n.slice(1).join(" "),
                        address1: e.address1,
                        address2: e.address2,
                        city: e.locality,
                        province_code: e.administrativeArea,
                        country_code: e.countryCode,
                        zip: e.postalCode,
                        phone: e.phoneNumber
                    }
                },
                l = function l(e) {
                    switch (e) {
                        case "AMEX":
                            return "american_express";
                        case "MASTERCARD":
                            return "master";
                        default:
                            return e.toLowerCase()
                    }
                },
                d = function d(e) {
                    return e.address1 !== undefined && e.address2 !== undefined && e.locality !== undefined && e.administrativeArea !== undefined && e.phoneNumber
                },
                f = function f(e) {
                    var t = e.paymentMethodData,
                        n = e.email,
                        r = e.shippingAddress,
                        i = t.info,
                        a = t.tokenizationData,
                        o = i.billingAddress,
                        c = i.cardDetails,
                        s = i.cardNetwork;
                    if (!d(o) || !d(r)) throw new Error("Address returned with the Google Pay paymentData is not full.");
                    var u = h(o);
                    return {
                        checkout: {
                            billing_address: u,
                            shipping_address: h(r),
                            email: n,
                            phone: u.phone,
                            credit_card: {
                                last_digits: c,
                                brand: l(s),
                                first_name: u.first_name,
                                last_name: u.last_name
                            },
                            gateway_params: {
                                payment_token: {
                                    type: "google_pay",
                                    payment_data: a.token
                                }
                            }
                        }
                    }
                },
                i = {
                    "long": ".googlepay.long { background-size: auto; }",
                    da: ".googlepay.long:lang(da) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22106%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h1.568v4.76H1.8l4.06-4.76h1.946v.084L4.138%207.288l3.99%205.628V13H6.21L3.074%208.506l-1.358%201.568V13H.148V2.976zm14.682%203.57c.392.355.695.782.91%201.281.215.5.322%201.034.322%201.603a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497a3.89%203.89%200%200%201-1.484-.28l-.364.574-1.022-.574.378-.616a3.57%203.57%200%200%201-.917-1.274%204.025%204.025%200%200%201-.329-1.624c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.55%200%201.05.098%201.498.294l.378-.602%201.022.588-.392.63zM10.07%209.43c0%20.663.182%201.213.546%201.652L13.08%207.12a2.216%202.216%200%200%200-.756-.126c-.401%200-.775.098-1.12.294-.345.196-.62.478-.826.847-.205.369-.308.8-.308%201.295zm2.254%202.45a2.202%202.202%200%200%200%201.953-1.141c.21-.369.315-.805.315-1.309%200-.653-.182-1.2-.546-1.638l-2.464%203.962c.243.084.49.126.742.126zm9.04%201.344c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07V13h-1.47V2.976h1.54V5.79l-.07%201.008h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49zm-.224-1.414c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm8.644-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13h-1.54V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm15.956%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm6.24%204.634a3.235%203.235%200%200%201-1.75-.49%203.467%203.467%200%200%201-1.239-1.351c-.303-.574-.455-1.225-.455-1.953s.152-1.379.455-1.953a3.467%203.467%200%200%201%201.239-1.351%203.235%203.235%200%200%201%201.75-.49c.504%200%20.957.112%201.358.336.401.224.705.5.91.826h.07l-.07-1.008V2.976h1.54V13h-1.47v-.924h-.07c-.205.317-.509.588-.91.812a2.738%202.738%200%200%201-1.358.336zm.224-1.414a1.97%201.97%200%200%200%201.043-.294%202.15%202.15%200%200%200%20.777-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.162%202.162%200%200%200-.777-.833%202.006%202.006%200%200%200-2.093%200%202.144%202.144%200%200%200-.784.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.457.644.784.84.327.196.677.294%201.05.294zm29.498-9.428v4.097h2.554c.608%200%201.11-.202%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.414-.901-.622-1.51-.622h-2.553zm0%205.539v4.753h-1.525V.939h4.045c1.028%200%201.901.34%202.62%201.016.73.678%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.776%202.294c0%20.394.168.722.506.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067l-1.343-.837c.74-1.049%201.835-1.573%203.283-1.573m12.021.262l-5.09%2011.57H98.64l1.89-4.048-3.349-7.522h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M77.372%206.896c0-.474-.04-.932-.117-1.37h-6.433v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M70.822%2013.486c1.84%200%203.39-.598%204.521-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M66.992%208.033a4.01%204.01%200%200%201%200-2.58V3.714h-2.265A6.644%206.644%200%200%200%2064%206.743c0%201.089.262%202.117.727%203.028l2.265-1.738z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M70.822%202.67c1.005%200%201.906.34%202.617%201.01v.001l1.947-1.924C74.203.669%2072.662%200%2070.822%200a6.83%206.83%200%200%200-6.095%203.715l2.265%201.737c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 154px; }",
                    de: ".googlepay.long:lang(de) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22135%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h2.128l2.884%207.602h.084l2.884-7.602h2.128V13H8.702V7.386l.084-1.806h-.084L5.832%2013h-1.26l-2.87-7.42h-.084l.084%201.806V13H.148V2.976zm13.184%201.848a1%201%200%200%201-.735-.301%201%201%200%200%201-.301-.735%201%201%200%200%201%20.301-.735%201%201%200%200%201%20.735-.301%201%201%200%200%201%20.735.301%201%201%200%200%201%20.301.735%201%201%200%200%201-.301.735%201%201%200%200%201-.735.301zm-.77%201.036h1.54V13h-1.54V5.86zm6.464%207.252c-.317%200-.616-.051-.896-.154a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358h-1.736v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21zm60.678.112c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07V13h-1.47V2.976h1.54V5.79l-.07%201.008h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49zm-.224-1.414c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm8.48%201.414c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm2.684%203.122l3.948-4.494H92.59V5.86h5.726v1.302l-3.948%204.494h4.06V13h-5.95v-1.288zm9.628%201.512c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm5.302-8.974h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm8.34%200h1.54V13h-1.54V2.976zm6.688%2010.248c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm3.118-2.73h1.47v.938h.07c.205-.336.511-.614.917-.833.406-.22.838-.329%201.295-.329.868%200%201.528.254%201.981.763.453.509.679%201.202.679%202.079V13h-1.54V8.688c0-.56-.138-.97-.413-1.232-.275-.261-.656-.392-1.141-.392-.345%200-.653.096-.924.287a1.91%201.91%200%200%200-.63.763%202.37%202.37%200%200%200-.224%201.022V13h-1.54V5.86zM46.795%202.629v4.097h2.554c.608%200%201.11-.203%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.415-.901-.622-1.51-.622h-2.553zm0%205.539v4.753H45.27V1.186h4.045c1.028%200%201.901.34%202.62%201.016.73.677%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.775%202.294c0%20.394.17.722.507.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067L53.261%206.2c.74-1.049%201.835-1.573%203.283-1.573m12.021.263l-5.09%2011.57h-1.576l1.89-4.048L60.44%204.89h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M40.631%207.143c0-.474-.04-.932-.117-1.37H34.08v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M34.08%2013.733c1.842%200%203.392-.598%204.522-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M30.251%208.28a4.01%204.01%200%200%201%200-2.58V3.961h-2.265a6.644%206.644%200%200%200-.727%203.028c0%201.089.262%202.117.727%203.028L30.25%208.28z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M34.08%202.916c1.006%200%201.907.342%202.618%201.011v.001l1.947-1.924C37.462.916%2035.92.247%2034.08.247a6.83%206.83%200%200%200-6.095%203.715L30.25%205.7c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 183px; }",
                    en: ".googlepay.long:lang(en) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22104%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h3.766c.532%200%201.024.117%201.477.35.453.233.814.555%201.085.966.27.41.406.863.406%201.358%200%20.495-.124.924-.371%201.288s-.572.64-.973.826v.084c.504.177.912.471%201.225.882.313.41.469.891.469%201.442a2.6%202.6%200%200%201-.427%201.47c-.285.43-.667.763-1.148%201.001A3.5%203.5%200%200%201%204.082%2013H.148V2.976zm3.696%204.2c.448%200%20.81-.14%201.085-.42.275-.28.413-.602.413-.966s-.133-.684-.399-.959c-.266-.275-.614-.413-1.043-.413H1.716v2.758h2.128zm.238%204.368c.476%200%20.856-.15%201.141-.448.285-.299.427-.644.427-1.036%200-.401-.147-.749-.441-1.043-.294-.294-.688-.441-1.183-.441h-2.31v2.968h2.366zm7.36%201.68c-.868%200-1.528-.259-1.981-.777-.453-.518-.679-1.239-.679-2.163V5.86h1.54v4.214c0%20.579.138%201.013.413%201.302.275.29.637.434%201.085.434.364%200%20.686-.096.966-.287.28-.191.495-.446.644-.763a2.37%202.37%200%200%200%20.224-1.022V5.86h1.54V13h-1.456v-.924h-.084c-.196.336-.5.611-.91.826-.41.215-.845.322-1.302.322zm7.878-.616L16.352%205.86h1.722l2.016%204.858h.056l1.96-4.858H23.8l-4.41%2010.164h-1.624l1.554-3.416zm8.266-6.748h1.666l1.442%205.11h.056l1.61-5.11h1.582l1.596%205.11h.056l1.442-5.11h1.638L36.392%2013h-1.624L33.13%207.876h-.042L31.464%2013h-1.596l-2.282-7.14zM40.7%204.824a1%201%200%200%201-.735-.301%201%201%200%200%201-.301-.735%201%201%200%200%201%20.301-.735%201%201%200%200%201%20.735-.301%201%201%200%200%201%20.735.301%201%201%200%200%201%20.301.735%201%201%200%200%201-.301.735%201%201%200%200%201-.735.301zm-.77%201.036h1.54V13h-1.54V5.86zm6.464%207.252c-.317%200-.616-.051-.896-.154a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358H45.75v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21zm2.782-10.136h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm32.619-.347v4.097h2.554c.608%200%201.11-.203%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.415-.901-.622-1.51-.622h-2.553zm0%205.539v4.753H80.27V1.186h4.045c1.028%200%201.901.34%202.62%201.016.73.677%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.775%202.294c0%20.394.17.722.507.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067L88.261%206.2c.74-1.049%201.835-1.573%203.283-1.573m12.021.263l-5.09%2011.57h-1.576l1.89-4.048L95.44%204.89h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M75.631%207.143c0-.474-.04-.932-.117-1.37H69.08v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M69.08%2013.733c1.842%200%203.392-.598%204.522-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M65.251%208.28a4.01%204.01%200%200%201%200-2.58V3.961h-2.265a6.644%206.644%200%200%200-.727%203.028c0%201.089.262%202.117.727%203.028L65.25%208.28z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M69.08%202.916c1.006%200%201.907.342%202.618%201.011v.001l1.947-1.924C72.462.916%2070.92.247%2069.08.247a6.83%206.83%200%200%200-6.095%203.715L65.25%205.7c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 152px; }",
                    es: ".googlepay.long:lang(es) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22135%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm7.794%207.364c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm5.302-6.09h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm12.536%207.364c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07c.205-.336.511-.614.917-.833.406-.22.838-.329%201.295-.329.868%200%201.528.254%201.981.763.453.509.679%201.202.679%202.079V13h-1.54V8.688c0-.56-.138-.97-.413-1.232-.275-.261-.656-.392-1.141-.392-.345%200-.653.096-.924.287a1.91%201.91%200%200%200-.63.763%202.37%202.37%200%200%200-.224%201.022V13h-1.54V5.86zm32.666-3.231v4.097h2.556c.61%200%201.113-.203%201.511-.607.409-.404.614-.885.614-1.442%200-.546-.205-1.022-.614-1.427-.398-.415-.902-.622-1.51-.622h-2.557zm0%205.539v4.753h-1.527V1.186h4.05c1.03%200%201.903.34%202.623%201.016.73.677%201.095%201.503%201.095%202.475%200%20.994-.365%201.825-1.095%202.49-.709.668-1.583%201-2.623%201h-2.523v.001zm7.785%202.294c0%20.394.168.722.506.984a1.88%201.88%200%200%200%201.187.393c.642%200%201.214-.235%201.718-.704.503-.47.755-1.022.755-1.655-.477-.372-1.14-.557-1.992-.557-.62%200-1.138.148-1.552.443-.415.295-.622.66-.622%201.096m1.975-5.834c1.13%200%202.02.298%202.674.893.652.596.978%201.413.978%202.45v4.95h-1.46v-1.115h-.067c-.63.918-1.472%201.377-2.523%201.377-.896%200-1.647-.262-2.249-.787-.603-.524-.905-1.18-.905-1.966%200-.831.318-1.491.954-1.983.637-.492%201.486-.738%202.548-.738.907%200%201.654.164%202.24.492v-.345c0-.524-.21-.97-.63-1.335a2.179%202.179%200%200%200-1.477-.55c-.853%200-1.527.356-2.025%201.067L119.29%206.2c.742-1.049%201.837-1.573%203.287-1.573m12.036.263l-5.097%2011.57h-1.576l1.892-4.048-3.353-7.522h1.66l2.423%205.77h.034l2.357-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M106.647%207.143c0-.474-.04-.932-.118-1.37h-6.44v2.596h3.689a3.12%203.12%200%200%201-1.364%202.05v1.686h2.201c1.29-1.174%202.032-2.91%202.032-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M100.089%2013.733c1.843%200%203.395-.598%204.526-1.628l-2.201-1.687c-.613.408-1.402.646-2.325.646-1.782%200-3.294-1.186-3.834-2.784h-2.268v1.738a6.839%206.839%200%200%200%206.102%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M96.255%208.28a4.005%204.005%200%200%201%200-2.58V3.961h-2.268a6.638%206.638%200%200%200-.728%203.028%206.64%206.64%200%200%200%20.728%203.028l2.268-1.738z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M100.089%202.916c1.006%200%201.908.342%202.62%201.011v.001l1.949-1.924C103.474.916%20101.93.247%20100.088.247a6.839%206.839%200%200%200-6.101%203.715L96.255%205.7c.54-1.597%202.052-2.783%203.834-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 183px; }",
                    fr: ".googlepay.long:lang(fr) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22135%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M3.976%202.976h1.792L9.534%2013H7.798l-.896-2.562H2.856L1.946%2013H.21L3.976%202.976zM6.37%208.982L5.306%206l-.392-1.162H4.83L4.438%206%203.374%208.982H6.37zm7.514%204.242c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm4.7-10.248h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm11.602%2010.248c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zM32.02%208.59a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm5.834%204.522c-.317%200-.616-.051-.896-.154a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358H37.21v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21zm5.694.112c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zM48.5%205.86h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13H48.5V5.86zm11.472%207.364c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm4.364-6.09h1.722l1.974%205.152h.056L70.37%205.86h1.68L69.082%2013h-1.54l-2.94-7.14zm11.644%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zM78.08%208.59a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm6.492%204.634c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm28.954-10.589v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53h-1.553l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M107.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M100.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M97.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M100.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 183px; }",
                    it: ".googlepay.long:lang(it) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22129%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm7.794%207.364c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm12.032%201.274c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07c.205-.336.511-.614.917-.833.406-.22.838-.329%201.295-.329.868%200%201.528.254%201.981.763.453.509.679%201.202.679%202.079V13h-1.54V8.688c0-.56-.138-.97-.413-1.232-.275-.261-.656-.392-1.141-.392-.345%200-.653.096-.924.287a1.91%201.91%200%200%200-.63.763%202.37%202.37%200%200%200-.224%201.022V13h-1.54V5.86zm32.19-3.478v4.097h2.554c.608%200%201.11-.202%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.414-.901-.622-1.51-.622h-2.553zm0%205.539v4.753h-1.525V.939h4.045c1.028%200%201.901.34%202.62%201.016.73.678%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.776%202.294c0%20.394.168.722.506.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067l-1.343-.837c.74-1.049%201.835-1.573%203.283-1.573m12.021.262l-5.09%2011.57h-1.576l1.89-4.048-3.349-7.522h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M100.372%206.896c0-.474-.04-.932-.117-1.37h-6.433v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M93.822%2013.486c1.84%200%203.39-.598%204.521-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M89.992%208.033a4.01%204.01%200%200%201%200-2.58V3.714h-2.265A6.644%206.644%200%200%200%2087%206.743c0%201.089.262%202.117.727%203.028l2.265-1.738z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M93.822%202.67c1.005%200%201.906.34%202.617%201.01v.001l1.947-1.924C97.203.669%2095.662%200%2093.822%200a6.83%206.83%200%200%200-6.095%203.715l2.265%201.737c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 177px; }",
                    ja: ".googlepay.long:lang(ja) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M56.29%205.72c.336.49.854%201.344%201.148%201.932l-.868.392c-.336-.714-.7-1.358-1.12-1.96l.84-.364zm1.554-.602c.336.476.882%201.316%201.19%201.89l-.854.42a13.139%2013.139%200%200%200-1.176-1.932l.84-.378zM47.106%203.634a19.634%2019.634%200%200%200%201.288-.07c1.008-.098%203.486-.336%206.034-.546%201.47-.126%202.87-.21%203.808-.238l.014%201.414c-.77%200-1.974.014-2.702.196-1.834.56-3.052%202.52-3.052%204.158%200%202.534%202.352%203.36%204.634%203.472l-.504%201.484c-2.716-.14-5.558-1.596-5.558-4.648%200-2.1%201.218-3.78%202.338-4.494-1.204.126-4.606.462-6.16.798l-.14-1.526zm22.886%204.102h-5.474c.616%201.19%201.512%202.17%202.66%202.968%201.176-.77%202.142-1.736%202.814-2.968zm.966-1.344l.91.546c-.742%201.918-1.946%203.374-3.472%204.48%201.442.728%203.192%201.218%205.208%201.456-.294.308-.644.896-.826%201.26-2.24-.336-4.116-.966-5.67-1.904-1.68.91-3.626%201.498-5.684%201.862-.112-.336-.462-.938-.728-1.246%201.918-.28%203.696-.742%205.222-1.456a10.134%2010.134%200%200%201-2.646-3.318l.966-.336H61.9V6.448h4.536V4.53h-5.18V3.242h5.18V1.254h1.344v1.988h5.222V4.53H67.78v1.918h2.954l.224-.056zm9.502%202.002l-2.1.518v3.668c0%20.742-.154%201.092-.588%201.302-.448.182-1.134.224-2.198.224a5.392%205.392%200%200%200-.378-1.232c.7.028%201.4.028%201.61.014.21-.014.28-.07.28-.308V9.22l-2.016.49-.294-1.274c.644-.126%201.442-.294%202.31-.476V5.216h-2.1V4.012h2.1V1.24h1.274v2.772h1.918v1.204H78.36V7.68c.658-.154%201.33-.308%202.002-.462l.098%201.176zm7.406%205.208l-1.26.49c-.084-.364-.21-.784-.35-1.232-2.548.364-5.222.714-7.098.966l-.28-1.358c.42-.042.91-.098%201.428-.154.868-2.912%201.82-7.322%202.282-10.696l1.414.252c-.56%203.346-1.498%207.406-2.338%2010.304%201.288-.154%202.73-.322%204.158-.49A34.948%2034.948%200%200%200%2084.1%208.03l1.134-.406c1.106%201.904%202.24%204.368%202.632%205.978zm10.412-5.25c0-1.064-.84-1.848-2.212-1.848-1.568%200-2.926.476-3.696.7-.42.112-.882.294-1.246.434l-.434-1.596c.42-.028.952-.126%201.372-.21%201.008-.224%202.576-.658%204.172-.658%202.072%200%203.57%201.176%203.57%203.234%200%202.982-2.716%204.746-6.412%205.292l-.812-1.358c3.402-.42%205.698-1.652%205.698-3.99zm-5.656-6.426c1.568.336%204.648.616%206.048.63l-.224%201.358c-1.568-.112-4.452-.378-6.034-.658l.21-1.33zm-73.096.709v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M13.448%207.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M6.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774H.978v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M3.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964H.978A6.678%206.678%200%200%200%20.261%206.98c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M6.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918C10.324.928%208.804.262%206.989.262a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 148px; }",
                    "pt-br": ".googlepay.long:lang(pt-br) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22145%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm8.648%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49H47.65c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm9.848%204.634c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13h-1.54V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm19.466%207.364c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm29.476-9.175v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53h-1.553l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M117.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M110.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M107.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M110.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 193px; }",
                    "pt-pt": ".googlepay.long:lang(pt-pt) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22145%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm8.648%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49H47.65c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm9.848%204.634c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13h-1.54V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm19.466%207.364c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm29.476-9.175v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53h-1.553l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M117.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M110.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M107.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M110.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 193px; }"
                },
                a = "\n  .googlepay {\n    background-color: #000;\n    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2241%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M19.526%202.635v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M13.448%207.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M6.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774H.978v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M3.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964H.978A6.678%206.678%200%200%200%20.261%206.98c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M6.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918C10.324.928%208.804.262%206.989.262a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);\n    background-origin: content-box;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: 55px auto;\n    border: none;\n    cursor: pointer;\n    outline: 0;\n    padding: 10px 8px;\n    width: 100%;\n    height: 100%;\n    min-height: 100%;\n    border-radius: 5px;\n  }\n\n  @media (min-height: 54px) {\n    .googlepay { padding: 15px 8px; }\n  }\n\n  .googlepay:focus:enabled { background-color: #3c4043; }\n\n  .googlepay:hover:enabled { background-color: #3c4043; }\n\n  .googlepay:active:enabled { background-color: #5f6368; }\n\n  .googlepay:disabled { opacity: .5; }\n",
                u = function u(e, t) {
                    var n = a;
                    t && i[t] && (n = n + i["long"] + i[t]);
                    var r = document.createElement("style");
                    r.appendChild(document.createTextNode(n)), e.appendChild(r)
                },
                p = t.GoogleClient = function() {
                    function a(e, t, n, r, i) {
                        en(this, a), this.googlePayClient = e, this.isReadyToPayRequest = t, this.paymentDataRequest = n, this.currency = r, this.renderOptions = i
                    }
                    return tn(a, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function t() {
                            return s(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.googlePayClient.isReadyToPay(this.isReadyToPayRequest);
                                        case 2:
                                            if ((t = e.sent).result && t.paymentMethodPresent) return this.googlePayClient.prefetchPaymentData(this.paymentDataRequest), e.abrupt("return", !0);
                                            e.next = 8;
                                            break;
                                        case 8:
                                            return e.abrupt("return", !1);
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "render",
                        value: function n(a, o, c) {
                            return s(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var r, i, t = this;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return this.eventInfo = c, (r = document.createElement("button")).className = "googlepay", this.renderOptions && this.renderOptions["long"] && this.renderOptions.locale ? (r.classList.add("long"), r.setAttribute("lang", this.renderOptions.locale), u(a, this.renderOptions.locale)) : u(a), e.t0 = this.currency, e.next = 7, o.estimatePrice();
                                        case 7:
                                            e.t1 = e.sent, i = {
                                                totalPriceStatus: "ESTIMATED",
                                                currencyCode: e.t0,
                                                totalPrice: e.t1
                                            }, r.addEventListener("click", function(n) {
                                                return s(t, void 0, void 0, regeneratorRuntime.mark(function e() {
                                                    return regeneratorRuntime.wrap(function t(e) {
                                                        for (;;) switch (e.prev = e.next) {
                                                            case 0:
                                                                return n.preventDefault(), Ye.eventEmitter.broadcast("googlepay:begin-payment", {
                                                                    eventInfo: this.eventInfo
                                                                }), r.disabled = !0, e.prev = 3, e.next = 6, this.pay.call(this, o, i);
                                                            case 6:
                                                                e.next = 11;
                                                                break;
                                                            case 8:
                                                                e.prev = 8, e.t0 = e["catch"](3), r.disabled = !1;
                                                            case 11:
                                                            case "end":
                                                                return e.stop()
                                                        }
                                                    }, e, this, [
                                                        [3, 8]
                                                    ])
                                                }))
                                            }), a.appendChild(r);
                                        case 11:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "pay",
                        value: function r(a, o) {
                            return s(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return this.paymentDataRequest.transactionInfo = o, e.next = 3, this.googlePayClient.loadPaymentData(this.paymentDataRequest);
                                        case 3:
                                            if (t = e.sent, n = f(t), r = void 0, a.hasCheckout()) return e.next = 9, a.updateCheckout(n);
                                            e.next = 12;
                                            break;
                                        case 9:
                                            r = e.sent, e.next = 15;
                                            break;
                                        case 12:
                                            return e.next = 14, a.build("google_pay", n.checkout);
                                        case 14:
                                            r = e.sent;
                                        case 15:
                                            return e.next = 17, a.forceReviewStep();
                                        case 17:
                                            Ye.eventEmitter.broadcast("googlepay:redirect-url", {
                                                url: r.attributes.web_url,
                                                eventInfo: this.eventInfo
                                            }), window.location.assign(r.attributes.web_url);
                                        case 19:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), a
                }();
            t.getGoogleClient = function m(e) {
                if (!window.google) throw new Error("Google Pay SDK not loaded.");
                var t = e.currency,
                    n = e.capabilities,
                    r = e["long"],
                    i = e.locale,
                    a = n.environment,
                    o = n.merchantInfo,
                    c = n.emailRequired,
                    s = n.allowedPaymentMethods,
                    u = n.existingPaymentMethodRequired,
                    h = n.shippingAddressRequired,
                    l = n.shippingAddressParameters,
                    d = new window.google.payments.api.PaymentsClient({
                        environment: a
                    });
                return new p(d, {
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    merchantInfo: o,
                    allowedPaymentMethods: s,
                    existingPaymentMethodRequired: u
                }, {
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    merchantInfo: o,
                    emailRequired: c,
                    allowedPaymentMethods: s,
                    shippingAddressRequired: h,
                    shippingAddressParameters: l,
                    transactionInfo: {
                        totalPriceStatus: "NOT_CURRENTLY_KNOWN",
                        currencyCode: t
                    }
                }, t, {
                    "long": r,
                    locale: i
                })
            }
        }),
        et = e(function(e, t) {
            "use strict";

            function l(e) {
                r() && window.performance.mark(e + "-start")
            }

            function d(e) {
                return r() ? (window.performance.mark(e + "-end"), window.performance.measure(e, e + "-start", e + "-end"), window.performance.getEntriesByName(e)[0].duration) : 0
            }

            function f(e, t, n) {
                Ye.eventEmitter.broadcast("acceleration-check-benchmark", {
                    name: e,
                    duration: t,
                    tags: n
                })
            }

            function n(s, u, h) {
                return function(e, t, n) {
                    if (r()) {
                        var c = n.value;
                        n.value = function() {
                            var e = this[u],
                                t = s + ":" + e;
                            l(t);
                            for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                            var a = c.apply(this, r),
                                o = {};
                            return o[h] = e, a instanceof Promise ? a.then(function(e) {
                                return f(s, d(t), o), e
                            }) : (f(s, d(t), o), a)
                        }
                    }
                }
            }

            function r() {
                return window.performance && window.performance.mark && window.performance.measure
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.startBenchmark = l, t.endBenchmark = d, t.sendAccelerationBenchmarkEvent = f, t.benchmarkMetric = n
        }),
        tt = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Instrument = undefined;
            var n = undefined && undefined.__decorate || function(e, t, n, r) {
                    var i, a = arguments.length,
                        o = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : on(Reflect)) && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, n, r);
                    else
                        for (var c = e.length - 1; 0 <= c; c--)(i = e[c]) && (o = (a < 3 ? i(o) : 3 < a ? i(t, n, o) : i(t, n)) || o);
                    return 3 < a && o && Object.defineProperty(t, n, o), o
                },
                r = undefined && undefined.__metadata || function(e, t) {
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : on(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
                },
                o = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                i = t.Instrument = function() {
                    function t(e) {
                        en(this, t), this.id = "GooglePay", this.googleClient = e
                    }
                    return tn(t, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function n() {
                            return o(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.googleClient.canMakeAcceleratedPurchase();
                                        case 2:
                                            return e.abrupt("return", e.sent);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "render",
                        value: function a(n, r, i) {
                            return o(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.googleClient.render(n, r, i && i.eventInfo);
                                        case 2:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), t
                }();
            n([(0, et.benchmarkMetric)("acceleration.check.benchmark", "id", "instrument"), r("design:type", Function), r("design:paramtypes", []), r("design:returntype", Promise)], i.prototype, "canMakeAcceleratedPurchase", null)
        }),
        nt = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Factory = undefined;
            var r = k(Ze),
                i = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                a = function a(n) {
                    return i(undefined, void 0, void 0, regeneratorRuntime.mark(function e() {
                        return regeneratorRuntime.wrap(function t(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return window.gpayInitParams = {
                                        environment: n.capabilities.environment,
                                        merchantInfo: {
                                            merchantId: n.capabilities.merchantInfo.merchantId,
                                            merchantName: n.capabilities.merchantInfo.merchantName,
                                            authJwt: n.capabilities.merchantInfo.authJwt
                                        }
                                    }, e.next = 3, r["default"].inject("https://pay.google.com/gp/p/js/pay.js", {});
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    }))
                };
            (t.Factory = function() {
                function e() {
                    en(this, e)
                }
                return tn(e, null, [{
                    key: "load",
                    value: function t(r) {
                        return i(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                            var t;
                            return regeneratorRuntime.wrap(function n(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, a(r);
                                    case 2:
                                        return t = (0, Qe.getGoogleClient)(r), e.abrupt("return", new tt.Instrument(t));
                                    case 4:
                                    case "end":
                                        return e.stop()
                                }
                            }, e, this)
                        }))
                    }
                }]), e
            }()).isSupported = !0
        }),
        rt = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), Object.defineProperty(t, "GooglePay", {
                enumerable: !0,
                get: function n() {
                    return nt.Factory
                }
            })
        }),
        it = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = k(Me),
                s = k(Ne),
                r = function(e) {
                    function t(e) {
                        return en(this, t), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "google_pay_web"))
                    }
                    return Zt(t, e), tn(t, [{
                        key: "init",
                        value: function n() {
                            var t = this;
                            this.getConfig().then(function(e) {
                                return t.createButton(e.paymentInstruments)
                            })
                        }
                    }, {
                        key: "createButton",
                        value: function c(e) {
                            var t = this,
                                n = e.googlePayConfig,
                                r = e.accessToken,
                                i = new rt.GooglePayInstrument(n),
                                a = new s["default"](this.strategy),
                                o = new Xe.CheckoutManager(a, r, {
                                    currency: n.currency
                                });
                            i.render(this.button, o).then(function() {
                                return Promise.resolve(t)
                            })
                        }
                    }, {
                        key: "getConfig",
                        value: function r() {
                            var e = "/payments/config";
                            return window.Shopify.currency && "string" == typeof window.Shopify.currency.active && (e = e + "?currency=" + window.Shopify.currency.active), fetch("https://" + window.location.hostname + e).then(function(e) {
                                return e.json()
                            })
                        }
                    }]), t
                }(n["default"]);
            t["default"] = r
        }),
        at = e(function(e, t) {
            "use strict";

            function n() {
                if ("undefined" != typeof window.paypal) return Promise.resolve();
                var n = "//www.paypalobjects.com/api/checkout.min.js";
                return new Promise(function(e) {
                    var t = document.querySelector('script[src="' + n + '"]');
                    null === t ? ((t = document.createElement("script")).setAttribute("src", n), t.addEventListener("load", e), document.body.appendChild(t)) : t.addEventListener("load", e)
                })
            }

            function r() {
                var e = document.getElementById("noscript-paypal-replacement");
                e && e.parentNode.removeChild(e)
            }

            function i(e) {
                return !!e && !!(0, Ce.dataset)(e).buttonRendered
            }

            function a(e) {
                e && e.setAttribute("data-button-rendered", !0)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ensureScriptLoaded = n, t.removeNoscriptTag = r, t.isMarkedRendered = i, t.markAsRendered = a
        }),
        ot = e(function(e, t) {
            "use strict";

            function s(e) {
                var t = {
                    key: this.strategy.apiClient.secretKey
                };
                return "cart" === this.strategy.identifier && (t.from_cart = !0), this.strategy.apiClient.post("/" + this.metadata.shopId + "/checkouts/" + e.token + "/paypal/tokens", t)
            }

            function u(e) {
                return this.redirectUrl = e.redirect_url, e
            }

            function h(e) {
                var n = this;
                return e.response && e.response.json ? e.response.json().then(function(e) {
                    var t = e.message;
                    return n.showErrors([t], "Something went wrong")
                }) : this.showErrors(["There was a problem with the payment service. Please select a different payment method or try again later."], "Something went wrong")
            }

            function l(e, t) {
                return "checkout" === e ? i[e + "-" + t] : i[e]
            }

            function d(e) {
                var t = e.match(r);
                return null !== t ? t[1] : ""
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = k(Me),
                f = "PayPalV4",
                r = /alt-payment-list__item--paypal-btn--(\w*)/,
                i = {
                    "checkout-mobile": 54,
                    "checkout-desktop": 42,
                    cart: 44,
                    product: 40
                },
                a = function(e) {
                    function t(e) {
                        return en(this, t), e.id = e.id || (0, Ce.generateRandomId)(), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, "paypal"))
                    }
                    return Zt(t, e), tn(t, [{
                        key: "init",
                        value: function n() {
                            var e = this;
                            return (0, at.ensureScriptLoaded)().then(function() {
                                return e.createButton()
                            })
                        }
                    }, {
                        key: "createButton",
                        value: function r() {
                            if ((0, at.isMarkedRendered)(this.button)) return Promise.reject("PayPal Button was already rendered");
                            if (this.metadata = (0, Ce.dataset)(document.getElementById("in-context-paypal-metadata")), this.sizeClass = d(this.button.className), !this.metadata) return Promise.reject("PayPal metadata was not found");
                            if ("true" !== this.metadata.paypalV4) return Promise.reject("PayPal V4 not enabled");
                            try {
                                return (0, at.removeNoscriptTag)(), this.render(), Promise.resolve(this)
                            } catch (e) {
                                return h(e), Promise.reject(e)
                            }
                        }
                    }, {
                        key: "payment",
                        value: function i() {
                            return (0, je.track)(f, "clicked", this.strategy.identifier), this.strategy.build(this.metadata.currency).then(s.bind(this)).then(u.bind(this)).then(function(e) {
                                return e.token
                            })["catch"](h.bind(this))
                        }
                    }, {
                        key: "handleAuthorize",
                        value: function a(e) {
                            (0, je.track)(f, "redirecting", this.strategy.identifier), (0, Ce.redirect)(this.redirectUrl + "&PayerID=" + e.payerID)
                        }
                    }, {
                        key: "handleRememberedUser",
                        value: function o() {
                            (0, je.track)(f, "remembered_user", this.strategy.identifier)
                        }
                    }, {
                        key: "render",
                        value: function c() {
                            window.paypal.Button.render({
                                env: this.metadata.environment,
                                commit: !1,
                                style: {
                                    label: "paypal",
                                    layout: "horizontal",
                                    color: "gold",
                                    shape: "rect",
                                    size: "responsive",
                                    maxbuttons: 1,
                                    tagline: !1,
                                    height: l(this.strategyName, this.sizeClass)
                                },
                                payment: this.payment.bind(this),
                                onAuthorize: this.handleAuthorize.bind(this),
                                onRememberUser: this.handleRememberedUser.bind(this)
                            }, this.button.id), (0, at.markAsRendered)(this.button), (0, je.track)(f, "shown", this.strategy.identifier)
                        }
                    }]), t
                }(n["default"]);
            t["default"] = a
        }),
        ct = e(function(e, t) {
            "use strict";

            function u(e, t, n) {
                var r = {
                    expiresAt: Date.now() + 1e3 * n,
                    value: t
                };
                oe().setItem(e, i(r))
            }

            function h(e) {
                var t = oe().getItem(e);
                if (t) {
                    var n = r(t);
                    if (!(n.expiresAt < Date.now())) return n.value;
                    l(e)
                }
            }

            function l(e) {
                oe().removeItem(e)
            }

            function r(e) {
                return JSON.parse(e)
            }

            function i(e) {
                return JSON.stringify(e)
            }

            function d(e) {
                a() && window.performance.mark(e + "-start")
            }

            function f(e) {
                return a() ? (window.performance.mark(e + "-end"), window.performance.measure(e, e + "-start", e + "-end"), window.performance.getEntriesByName(e)[0].duration) : 0
            }

            function p(e, t, n) {
                se.broadcast("acceleration-check-benchmark", {
                    name: e,
                    duration: t,
                    tags: n
                })
            }

            function n(s, u, h) {
                return function(e, t, n) {
                    if (a()) {
                        var c = n.value;
                        n.value = function() {
                            var e = this[u],
                                t = s + ":" + e;
                            d(t);
                            for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                            var a = c.apply(this, r),
                                o = {};
                            return o[h] = e, a instanceof Promise ? a.then(function(e) {
                                return p(s, f(t), o), e
                            }) : (p(s, f(t), o), a)
                        }
                    }
                }
            }

            function a() {
                return window.performance && window.performance.mark && window.performance.measure
            }

            function k() {
                for (var e = [], t = o(), n = t.length - 1; 0 <= n; n--) e.push(c(t[n]));
                return e.join("")
            }

            function o() {
                var e = window.crypto || window.msCrypto;
                if (e && e.getRandomValues) {
                    var t = new Uint8Array(16);
                    return e.getRandomValues(t), t
                }
                for (var n = new Uint8Array(16), r = 0, i = 0; i < 16; i++) 0 == (3 & i) && (r = 4294967296 * Math.random()), n[i] = r >>> ((3 & i) << 3) & 255;
                return n
            }

            function c(e) {
                return (e + 256).toString(16).substr(1)
            }

            function _(e, t) {
                switch (!0) {
                    case /failed_session/.test(e):
                        return "There was a problem with the payment service. Please select a different payment method or try again later.";
                    case /first_name_blank$/.test(e):
                        return "Enter a first name for your shipping address";
                    case /last_name_blank$/.test(e):
                        return "Enter a last name for your shipping address";
                    case /address1_blank$/.test(e):
                        return "Enter your shipping address";
                    case /address2_blank$/.test(e):
                        return "Enter the apartment, suite, etc. for your shipping address";
                    case /city_blank$/.test(e):
                        return "Enter the city of your shipping address";
                    case /country(_code)?_blank$/.test(e):
                        return "Select a country for your shipping address";
                    case /country(_code)?_not_supported$/.test(e):
                        return "Enter a valid country for your shipping address";
                    case /province(_code)?_blank$/.test(e):
                        return "Enter a state / province for your shipping address";
                    case /province(_code)?_invalid_state_in_country$/.test(e):
                        return "Enter a valid state for your shipping address country";
                    case /province(_code)?_invalid_province_in_country$/.test(e):
                        return "Enter a valid province for your shipping address country";
                    case /province(_code)?_invalid_region_in_country$/.test(e):
                        return "Enter a valid region for your shipping address country";
                    case /company_blank$/.test(e):
                        return "Enter a company name for your shipping address";
                    case /phone_blank$/.test(e):
                        return "Enter a valid phone number for your shipping address";
                    case /zip(_code)?_blank$/.test(e):
                        return "Enter a ZIP code / postal code for your shipping address";
                    case /zip(_code)?_invalid_for_country$/.test(e):
                    case /zip(_code)?_invalid_for_country_and_province$/.test(e):
                        return "Enter a valid ZIP code / postal code for your shipping address";
                    case /email_invalid$/.test(e):
                        return "Enter a valid email address";
                    case /generic_error$/.test(e):
                        return "An error occurred while processing your payment. Please try again.";
                    case /credit_card_processing$/.test(e):
                        return "Your card can't be processed due to technical difficulties. Please try again in a few minutes.";
                    case /not_enough_in_stock$/.test(e):
                        return "Some items became unavailable. Refresh your cart and try again.";
                    case /already_completed/.test(e):
                        return "Your items have already been purchased.";
                    case /empty_cart/.test(e):
                        return "Your cart is currently empty. Please add items to your cart and try again.";
                    case /full_name_required$/.test(e):
                        return "Enter both your first and last name";
                    case /total_price_too_big$/.test(e):
                        return "Your order total exceeds the limit. Please edit your cart and try again.";
                    case /total_price_zero$/.test(e):
                        return "To check out with Apple Pay, your order total must be greater than 0. Please choose a new payment method and try again.";
                    case /no_shipping_option$/.test(e):
                        return "Sorry, we currently don't ship to this country. Please choose a new shipping address and try again.";
                    case /payment_in_progress$/.test(e):
                        return "Your order is being processed and can't be cancelled at this time. You will receive an email confirmation once the transaction is successful.";
                    case /payment_timeout$/.test(e):
                        return "A network error occurred. Your order is being processed. You will receive an email confirmation once the transaction is successful.";
                    case /expired_card/.test(e):
                        return "Your credit card is expired. Please update your card.";
                    case /card_declined/.test(e):
                        return "Your credit card was declined. In order to resolve this issue, you will need to contact your bank.";
                    case /(invalid|blank)$/.test(e):
                        if (t && t.field) return "Enter a valid " + t.field
                }
                return ue
            }

            function m(t) {
                var n, r, i, a, o, c, s, u, h, l, d, f, p, m, y, v, g, b, w, k, _, x;
                return regeneratorRuntime.wrap(function P(e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            r = !(n = !0), i = undefined, e.prev = 3, a = Object.entries(t)[Symbol.iterator]();
                        case 5:
                            if (n = (o = a.next()).done) {
                                e.next = 66;
                                break
                            }
                            if (c = rn(o.value, 2), s = c[0], u = c[1]) {
                                e.next = 9;
                                break
                            }
                            return e.abrupt("continue", 63);
                        case 9:
                            l = !(h = !0), d = undefined, e.prev = 12, f = Object.entries(u)[Symbol.iterator]();
                        case 14:
                            if (h = (p = f.next()).done) {
                                e.next = 49;
                                break
                            }
                            if (m = rn(p.value, 2), y = m[0], v = m[1]) {
                                e.next = 18;
                                break
                            }
                            return e.abrupt("continue", 46);
                        case 18:
                            b = !(g = !0), w = undefined, e.prev = 21, k = v[Symbol.iterator]();
                        case 23:
                            if (g = (_ = k.next()).done) {
                                e.next = 32;
                                break
                            }
                            if ((x = _.value) && x.code) {
                                e.next = 27;
                                break
                            }
                            return e.abrupt("continue", 29);
                        case 27:
                            return e.next = 29, new he(s, y, x);
                        case 29:
                            g = !0, e.next = 23;
                            break;
                        case 32:
                            e.next = 38;
                            break;
                        case 34:
                            e.prev = 34, e.t0 = e["catch"](21), b = !0, w = e.t0;
                        case 38:
                            e.prev = 38, e.prev = 39, !g && k["return"] && k["return"]();
                        case 41:
                            if (e.prev = 41, b) throw w;
                            e.next = 44;
                            break;
                        case 44:
                            return e.finish(41);
                        case 45:
                            return e.finish(38);
                        case 46:
                            h = !0, e.next = 14;
                            break;
                        case 49:
                            e.next = 55;
                            break;
                        case 51:
                            e.prev = 51, e.t1 = e["catch"](12), l = !0, d = e.t1;
                        case 55:
                            e.prev = 55, e.prev = 56, !h && f["return"] && f["return"]();
                        case 58:
                            if (e.prev = 58, l) throw d;
                            e.next = 61;
                            break;
                        case 61:
                            return e.finish(58);
                        case 62:
                            return e.finish(55);
                        case 63:
                            n = !0, e.next = 5;
                            break;
                        case 66:
                            e.next = 72;
                            break;
                        case 68:
                            e.prev = 68, e.t2 = e["catch"](3), r = !0, i = e.t2;
                        case 72:
                            e.prev = 72, e.prev = 73, !n && a["return"] && a["return"]();
                        case 75:
                            if (e.prev = 75, r) throw i;
                            e.next = 78;
                            break;
                        case 78:
                            return e.finish(75);
                        case 79:
                            return e.finish(72);
                        case 80:
                        case "end":
                            return e.stop()
                    }
                }, ne, this, [
                    [3, 68, 72, 80],
                    [12, 51, 55, 63],
                    [21, 34, 38, 46],
                    [39, , 41, 45],
                    [56, , 58, 62],
                    [73, , 75, 79]
                ])
            }

            function s(e) {
                var t = [],
                    n = !0,
                    r = !1,
                    i = undefined;
                try {
                    for (var a, o = m(e)[Symbol.iterator](); !(n = (a = o.next()).done); n = !0) {
                        var c = a.value,
                            s = _(c.errorCode(), {
                                field: c.attribute
                            });
                        t.push(s)
                    }
                } catch (u) {
                    r = !0, i = u
                } finally {
                    try {
                        !n && o["return"] && o["return"]()
                    } finally {
                        if (r) throw i
                    }
                }
                return t
            }

            function y(e) {
                var t = (e = Array.isArray(e) ? e : [e]).map(function(e) {
                    return v(e)
                });
                return 1 === t.length && t[0] && t[0].startsWith("Enter ") && (t = ["Please e" + t[0].substr(1) + " and try again"]), t
            }

            function v(e) {
                switch (e) {
                    case "Some products became unavailable and your cart has been updated. We're sorry for the inconvenience.":
                        return _("not_enough_in_stock");
                    case "Checkout is already completed.":
                        return _("already_completed");
                    default:
                        return e
                }
            }

            function x(e) {
                var t = {
                    first_name: "",
                    last_name: "",
                    address1: "",
                    city: e.locality || "",
                    province_code: e.administrativeArea || "",
                    country_code: "",
                    zip: e.postalCode || "",
                    phone: ""
                };
                e.countryCode ? (t.country_code = e.countryCode.toLowerCase(), "hk" === t.country_code && (delete t.zip, t.province_code = e.postalCode)) : e.country && (t.country = e.country.toLowerCase(), "usa" === t.country && (t.country = "united states")), e.givenName && (t.first_name = e.givenName), e.familyName && (t.last_name = e.familyName), e.phoneNumber && (t.phone = e.phoneNumber);
                var n = e.addressLines;
                return n && n.length && (t.address1 = n[0], n[1] && (t.address2 = n[1])), g(t)
            }

            function g(e) {
                var t = e.country_code,
                    n = e.country,
                    r = e.zip,
                    i = r;
                return r ? (le.test(r) && ("ca" !== t && "canada" !== n || (i = r.trim() + " 0Z0"), "gb" === t && (i = r.trim() + " 0ZZ")), Object.assign({}, e, {
                    zip: i
                })) : e
            }

            function b(n) {
                return fe(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    return regeneratorRuntime.wrap(function t(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (200 <= n.status && n.status < 300) return e.abrupt("return", n);
                                e.next = 2;
                                break;
                            case 2:
                                throw new de(n);
                            case 3:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }

            function w(e) {
                for (var t, n = String(e), r = 0, i = 0, a = ge, o = ""; n.charAt(0 | i) || (a = "=", i % 1); o += a.charAt(63 & r >> 8 - i % 1 * 8)) {
                    if (255 < (t = n.charCodeAt(i += .75))) throw new be("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                    r = r << 8 | t
                }
                return o
            }

            function P(e) {
                var t = document.querySelector('meta[name="' + we + "-" + e + '"]');
                return t && t.getAttribute("content") || ""
            }

            function E(e) {
                var t = document.cookie.split("; "),
                    n = !0,
                    r = !1,
                    i = undefined;
                try {
                    for (var a, o = t[Symbol.iterator](); !(n = (a = o.next()).done); n = !0) {
                        var c = a.value.split("="),
                            s = rn(c, 2),
                            u = s[0],
                            h = s[1];
                        if (u === e) return h
                    }
                } catch (l) {
                    r = !0, i = l
                } finally {
                    try {
                        !n && o["return"] && o["return"]()
                    } finally {
                        if (r) throw i
                    }
                }
            }

            function C(c) {
                return Ee(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    var t, n, r, i, a;
                    return regeneratorRuntime.wrap(function o(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return t = c.shopId, n = c.validationUrl, r = c.domain, e.next = 3, S(t, {
                                    id: k(),
                                    domain: r,
                                    validation_url: n
                                });
                            case 3:
                                return i = e.sent, a = i.body, e.abrupt("return", a);
                            case 6:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }

            function S(o, c) {
                return Ee(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    var t, n, r, i;
                    return regeneratorRuntime.wrap(function a(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return t = new ve, n = "/" + o + "/apple_pay/sessions", e.next = 4, t.post(n, c);
                            case 4:
                                return r = e.sent, e.next = 7, r.json();
                            case 7:
                                return i = e.sent, e.abrupt("return", i);
                            case 9:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }

            function A(e, t) {
                return {
                    type: "final",
                    label: t,
                    amount: e.attributes.payment_due
                }
            }

            function z(e) {
                var t = [D(e)];
                return e.attributes.shipping_line && (t = t.concat([{
                    type: "final",
                    label: "Shipping",
                    amount: e.attributes.shipping_line.price
                }])), e.attributes.total_tax && (t = t.concat([{
                    type: "final",
                    label: "Estimated Tax",
                    amount: e.attributes.total_tax
                }])), e.attributes.applied_discount && (t = t.concat([{
                    type: "final",
                    label: "Discount",
                    amount: String(-e.attributes.applied_discount.amount)
                }])), e.attributes.gift_cards && (t = t.concat(e.attributes.gift_cards.map(function(e) {
                    return {
                        type: "final",
                        label: "Gift card ending with " + e.last_characters,
                        amount: "-" + e.amount_used
                    }
                }))), t
            }

            function F(e) {
                return e.shippingRates.map(function(e) {
                    return {
                        identifier: e.id,
                        label: e.title,
                        detail: "",
                        amount: e.price
                    }
                })
            }

            function D(e) {
                return {
                    type: "final",
                    label: "Subtotal",
                    amount: e.attributes.total_line_items_price
                }
            }

            function R(e) {
                return e && e.response && 422 === e.response.status
            }

            function V(e) {
                var t = e.match(/ (\d+)$/);
                return t ? t[1] : ""
            }

            function O(e) {
                switch (e.toLowerCase()) {
                    case "amex":
                        return "american_express";
                    case "mastercard":
                        return "master"
                }
                return e
            }

            function T(e) {
                return window[e]
            }

            function j(r, e) {
                var i = e.constant,
                    a = e.event;
                return new Promise(function(e, t) {
                    function n() {
                        i ? e(window[i]) : e()
                    }
                    a ? M(window, a, n) : (r.addEventListener("load", n), r.addEventListener("error", t))
                })
            }

            function M(r, e, i) {
                var a = r[e];
                r[e] = function() {
                    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    a && a.call(r, t), i.call(r, t)
                }
            }

            function I(e, t, n, r) {
                return "https://" + e + "/" + t + "/checkouts/" + n + "/amazon_payments/forward?key=" + r
            }

            function L(e, t, n, r) {
                return "//" + e + "/" + t + "/checkouts/" + n + "?key=" + r
            }

            function B(e) {
                return qe.inject(vt, {
                    constant: gt,
                    event: bt,
                    dataset: {
                        merchantId: e,
                        partnerAttributionId: wt
                    }
                })
            }

            function N(e) {
                var o = 0 < arguments.length && e !== undefined && arguments[0];
                return kt(this, void 0, void 0, regeneratorRuntime.mark(function c() {
                    var t, n, r, i;
                    return regeneratorRuntime.wrap(function a(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (n = 86400, U(r = h(t = "shopifyPaypalAcceleration")) && H(o, r)) return e.abrupt("return", r);
                                e.next = 5;
                                break;
                            case 5:
                                return e.next = 7, q();
                            case 7:
                                return i = e.sent, u(t, i, n), e.abrupt("return", i);
                            case 10:
                            case "end":
                                return e.stop()
                        }
                    }, c, this)
                }))
            }

            function H(e, t) {
                return e ? t.venmo : t.paypal
            }

            function U(e) {
                return !(!e || "object" !== (void 0 === e ? "undefined" : on(e)) || "boolean" != typeof e.paypal || "boolean" != typeof e.venmo)
            }

            function q() {
                return kt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    var t, n;
                    return regeneratorRuntime.wrap(function r(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return d(t = "acceleration.check.benchmark:PayPalV4"), e.next = 4, G();
                            case 4:
                                return n = e.sent, p("acceleration.check.benchmark", f(t), {
                                    instrument: "PayPalV4"
                                }), n.paypal && $("User is remembered with: paypal"), n.venmo && $("User is remembered with: venmo"), e.abrupt("return", n);
                            case 11:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }

            function G() {
                return kt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    var t;
                    return regeneratorRuntime.wrap(function n(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (xt in window) return e.abrupt("return", window[xt]);
                                e.next = 2;
                                break;
                            case 2:
                                return t = new Promise(function(r, i) {
                                    function e(e) {
                                        if (U(e)) return r(e);
                                        var t = JSON.stringify(e),
                                            n = new TypeError("Expected value to be an AccelerationResult, got: " + t);
                                        i(n)
                                    }
                                    Object.defineProperty(window, _t, {
                                        value: e
                                    }), qe.insert(Pt)
                                }), Object.defineProperty(window, xt, {
                                    value: t
                                }), e.abrupt("return", t);
                            case 5:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }

            function $(e) {
                Ue.info("Paypal#acceleration - " + e)
            }

            function K(e) {
                var a = (0 < arguments.length && e !== undefined ? arguments[0] : {
                    merchantSupportsVenmo: !1
                }).merchantSupportsVenmo;
                return Et(this, void 0, void 0, regeneratorRuntime.mark(function o() {
                    var t, n, r;
                    return regeneratorRuntime.wrap(function i(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2, N();
                            case 2:
                                if (t = e.sent, n = t.paypal, r = t.venmo, a && r) return e.abrupt("return", !1);
                                e.next = 7;
                                break;
                            case 7:
                                return e.abrupt("return", n);
                            case 8:
                            case "end":
                                return e.stop()
                        }
                    }, o, this)
                }))
            }

            function W(e) {
                var i = (0 < arguments.length && e !== undefined ? arguments[0] : {
                    merchantSupportsVenmo: !1
                }).merchantSupportsVenmo;
                return Vt(this, void 0, void 0, regeneratorRuntime.mark(function a() {
                    var t, n;
                    return regeneratorRuntime.wrap(function r(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2, N(i);
                            case 2:
                                return t = e.sent, n = t.venmo, e.abrupt("return", n);
                            case 5:
                            case "end":
                                return e.stop()
                        }
                    }, a, this)
                }))
            }

            function Y() {
                var e = (new Date).getTime(),
                    t = new Date(e + 2592e6);
                document.cookie = "shopify_pay_redirect=true; expires=" + t.toUTCString() + "; path=/"
            }

            function J(e, t, n, r) {
                return "//" + e + "/" + t + "/checkouts/" + n + "?key=" + r
            }

            function X(e, t) {
                var n = parseFloat(e.price),
                    r = parseFloat(t.price);
                return n < r ? -1 : r < n ? 1 : 0
            }

            function Z(e, t) {
                return 202 === e.status && Boolean(e.headers.get("Retry-After")) && Boolean(e.headers.get("Location")) && "google_pay" !== t
            }

            function Q(r) {
                return qt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                    var t;
                    return regeneratorRuntime.wrap(function n(e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (t = !1, r instanceof de && r.response && 422 === r.response.status) return e.next = 4, r.response.json();
                                e.next = 6;
                                break;
                            case 4:
                                e.sent.errors.reduction_code && (t = !0);
                            case 6:
                                return e.abrupt("return", t);
                            case 7:
                            case "end":
                                return e.stop()
                        }
                    }, e, this)
                }))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var ee, te, ne = regeneratorRuntime.mark(m),
                re = Object.freeze({}),
                ie = Object.freeze({}),
                ae = {
                    setItem: function Kt() {},
                    getItem: function Wt() {},
                    removeItem: function Yt() {}
                },
                oe = function oe() {
                    var e = ae;
                    try {
                        return window.localStorage || e
                    } catch (t) {
                        return e
                    }
                },
                ce = function() {
                    function e() {
                        en(this, e), this.subscribers = {}
                    }
                    return tn(e, [{
                        key: "subscribe",
                        value: function i(e, t) {
                            var n = this.subscribers[e] || (this.subscribers[e] = new Set);
                            return n.add(t), {
                                unsubscribe: function r() {
                                    n["delete"](t)
                                }
                            }
                        }
                    }, {
                        key: "broadcast",
                        value: function a(e, t) {
                            var n = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                            n.timestamp = Date.now();
                            var r = this.subscribers[e];
                            r && r.forEach(function(e) {
                                return e(n)
                            })
                        }
                    }]), e
                }(),
                se = new ce,
                ue = "An error occurred while processing your checkout. Please try again.",
                he = function() {
                    function r(e, t, n) {
                        en(this, r), this.association = e, this.attribute = t, this.attributeError = n
                    }
                    return tn(r, [{
                        key: "errorCode",
                        value: function e() {
                            return this.association + "_" + this.attribute + "_" + this.attributeError.code
                        }
                    }]), r
                }();
            (te = ee || (ee = {}))[te.Cancelled = 0] = "Cancelled", te[te.Failure = 1] = "Failure", te[te.Success = 2] = "Success";
            var le = /^[a-z0-9]{2,4}\s?$/i;
            ! function(e) {
                function r(e) {
                    if ("string" != typeof e && (e = String(e)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e)) throw new TypeError("Invalid character in header field name");
                    return e.toLowerCase()
                }

                function i(e) {
                    return "string" != typeof e && (e = String(e)), e
                }

                function a(t) {
                    var e = {
                        next: function n() {
                            var e = t.shift();
                            return {
                                done: e === undefined,
                                value: e
                            }
                        }
                    };
                    return v.iterable && (e[Symbol.iterator] = function() {
                        return e
                    }), e
                }

                function o(t) {
                    this.map = {}, t instanceof o ? t.forEach(function(e, t) {
                        this.append(t, e)
                    }, this) : Array.isArray(t) ? t.forEach(function(e) {
                        this.append(e[0], e[1])
                    }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
                        this.append(e, t[e])
                    }, this)
                }

                function t(e) {
                    if (e.bodyUsed) return Promise.reject(new TypeError("Already read"));
                    e.bodyUsed = !0
                }

                function c(n) {
                    return new Promise(function(e, t) {
                        n.onload = function() {
                            e(n.result)
                        }, n.onerror = function() {
                            t(n.error)
                        }
                    })
                }

                function n(e) {
                    var t = new FileReader,
                        n = c(t);
                    return t.readAsArrayBuffer(e), n
                }

                function s(e) {
                    var t = new FileReader,
                        n = c(t);
                    return t.readAsText(e), n
                }

                function u(e) {
                    for (var t = new Uint8Array(e), n = new Array(t.length), r = 0; r < t.length; r++) n[r] = String.fromCharCode(t[r]);
                    return n.join("")
                }

                function h(e) {
                    if (e.slice) return e.slice(0);
                    var t = new Uint8Array(e.byteLength);
                    return t.set(new Uint8Array(e)), t.buffer
                }

                function l() {
                    return this.bodyUsed = !1, this._initBody = function(e) {
                        if (this._bodyInit = e)
                            if ("string" == typeof e) this._bodyText = e;
                            else if (v.blob && Blob.prototype.isPrototypeOf(e)) this._bodyBlob = e;
                            else if (v.formData && FormData.prototype.isPrototypeOf(e)) this._bodyFormData = e;
                            else if (v.searchParams && URLSearchParams.prototype.isPrototypeOf(e)) this._bodyText = e.toString();
                            else if (v.arrayBuffer && v.blob && b(e)) this._bodyArrayBuffer = h(e.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
                            else {
                                if (!v.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(e) && !w(e)) throw new Error("unsupported BodyInit type");
                                this._bodyArrayBuffer = h(e)
                            } else this._bodyText = "";
                        this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : v.searchParams && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                    }, v.blob && (this.blob = function() {
                        var e = t(this);
                        if (e) return e;
                        if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
                        if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                        if (this._bodyFormData) throw new Error("could not read FormData body as blob");
                        return Promise.resolve(new Blob([this._bodyText]))
                    }, this.arrayBuffer = function() {
                        return this._bodyArrayBuffer ? t(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(n)
                    }), this.text = function() {
                        var e = t(this);
                        if (e) return e;
                        if (this._bodyBlob) return s(this._bodyBlob);
                        if (this._bodyArrayBuffer) return Promise.resolve(u(this._bodyArrayBuffer));
                        if (this._bodyFormData) throw new Error("could not read FormData body as text");
                        return Promise.resolve(this._bodyText)
                    }, v.formData && (this.formData = function() {
                        return this.text().then(p)
                    }), this.json = function() {
                        return this.text().then(JSON.parse)
                    }, this
                }

                function d(e) {
                    var t = e.toUpperCase();
                    return -1 < k.indexOf(t) ? t : e
                }

                function f(e, t) {
                    var n = (t = t || {}).body;
                    if (e instanceof f) {
                        if (e.bodyUsed) throw new TypeError("Already read");
                        this.url = e.url, this.credentials = e.credentials, t.headers || (this.headers = new o(e.headers)), this.method = e.method, this.mode = e.mode, n || null == e._bodyInit || (n = e._bodyInit, e.bodyUsed = !0)
                    } else this.url = String(e);
                    if (this.credentials = t.credentials || this.credentials || "omit", !t.headers && this.headers || (this.headers = new o(t.headers)), this.method = d(t.method || this.method || "GET"), this.mode = t.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
                    this._initBody(n)
                }

                function p(e) {
                    var i = new FormData;
                    return e.trim().split("&").forEach(function(e) {
                        if (e) {
                            var t = e.split("="),
                                n = t.shift().replace(/\+/g, " "),
                                r = t.join("=").replace(/\+/g, " ");
                            i.append(decodeURIComponent(n), decodeURIComponent(r))
                        }
                    }), i
                }

                function m(e) {
                    var i = new o;
                    return e.split(/\r?\n/).forEach(function(e) {
                        var t = e.split(":"),
                            n = t.shift().trim();
                        if (n) {
                            var r = t.join(":").trim();
                            i.append(n, r)
                        }
                    }), i
                }

                function y(e, t) {
                    t || (t = {}), this.type = "default", this.status = "status" in t ? t.status : 200, this.ok = 200 <= this.status && this.status < 300, this.statusText = "statusText" in t ? t.statusText : "OK", this.headers = new o(t.headers), this.url = t.url || "", this._initBody(e)
                }
                if (!e.fetch) {
                    var v = {
                        searchParams: "URLSearchParams" in e,
                        iterable: "Symbol" in e && "iterator" in Symbol,
                        blob: "FileReader" in e && "Blob" in e && function() {
                            try {
                                return new Blob, !0
                            } catch (e) {
                                return !1
                            }
                        }(),
                        formData: "FormData" in e,
                        arrayBuffer: "ArrayBuffer" in e
                    };
                    if (v.arrayBuffer) var g = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
                        b = function b(e) {
                            return e && DataView.prototype.isPrototypeOf(e)
                        },
                        w = ArrayBuffer.isView || function(e) {
                            return e && -1 < g.indexOf(Object.prototype.toString.call(e))
                        };
                    o.prototype.append = function(e, t) {
                        e = r(e), t = i(t);
                        var n = this.map[e];
                        this.map[e] = n ? n + "," + t : t
                    }, o.prototype["delete"] = function(e) {
                        delete this.map[r(e)]
                    }, o.prototype.get = function(e) {
                        return e = r(e), this.has(e) ? this.map[e] : null
                    }, o.prototype.has = function(e) {
                        return this.map.hasOwnProperty(r(e))
                    }, o.prototype.set = function(e, t) {
                        this.map[r(e)] = i(t)
                    }, o.prototype.forEach = function(e, t) {
                        for (var n in this.map) this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
                    }, o.prototype.keys = function() {
                        var n = [];
                        return this.forEach(function(e, t) {
                            n.push(t)
                        }), a(n)
                    }, o.prototype.values = function() {
                        var t = [];
                        return this.forEach(function(e) {
                            t.push(e)
                        }), a(t)
                    }, o.prototype.entries = function() {
                        var n = [];
                        return this.forEach(function(e, t) {
                            n.push([t, e])
                        }), a(n)
                    }, v.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
                    var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                    f.prototype.clone = function() {
                        return new f(this, {
                            body: this._bodyInit
                        })
                    }, l.call(f.prototype), l.call(y.prototype), y.prototype.clone = function() {
                        return new y(this._bodyInit, {
                            status: this.status,
                            statusText: this.statusText,
                            headers: new o(this.headers),
                            url: this.url
                        })
                    }, y.error = function() {
                        var e = new y(null, {
                            status: 0,
                            statusText: ""
                        });
                        return e.type = "error", e
                    };
                    var _ = [301, 302, 303, 307, 308];
                    y.redirect = function(e, t) {
                        if (-1 === _.indexOf(t)) throw new RangeError("Invalid status code");
                        return new y(null, {
                            status: t,
                            headers: {
                                location: e
                            }
                        })
                    }, e.Headers = o, e.Request = f, e.Response = y, e.fetch = function(i, a) {
                        return new Promise(function(n, e) {
                            var t = new f(i, a),
                                r = new XMLHttpRequest;
                            r.onload = function() {
                                var e = {
                                    status: r.status,
                                    statusText: r.statusText,
                                    headers: m(r.getAllResponseHeaders() || "")
                                };
                                e.url = "responseURL" in r ? r.responseURL : e.headers.get("X-Request-URL");
                                var t = "response" in r ? r.response : r.responseText;
                                n(new y(t, e))
                            }, r.onerror = function() {
                                e(new TypeError("Network request failed"))
                            }, r.ontimeout = function() {
                                e(new TypeError("Network request failed"))
                            }, r.open(t.method, t.url, !0), "include" === t.credentials && (r.withCredentials = !0), "responseType" in r && v.blob && (r.responseType = "blob"), t.headers.forEach(function(e, t) {
                                r.setRequestHeader(t, e)
                            }), r.send("undefined" == typeof t._bodyInit ? null : t._bodyInit)
                        })
                    }, e.fetch.polyfill = !0
                }
            }("undefined" != typeof self ? self : undefined);
            var de = function(e) {
                    function n(e) {
                        en(this, n);
                        var t = Qt(this, (n.__proto__ || Object.getPrototypeOf(n)).call(this, "Response error"));
                        return t.response = e, t
                    }
                    return Zt(n, e), n
                }(Error),
                fe = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                pe = function(e) {
                    function t(e) {
                        return en(this, t), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "API request polling timed out. Exceeded maximum timeout of " + e + "ms"))
                    }
                    return Zt(t, e), t
                }(Error),
                me = function(e) {
                    function t() {
                        en(this, t);
                        var e = Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
                        return e.message = "Missing location header", e
                    }
                    return Zt(t, e), t
                }(Error),
                ye = {
                    poll: !0,
                    timeout: 2e4
                },
                ve = function() {
                    function i(e, t) {
                        var n = 0 < arguments.length && e !== undefined ? arguments[0] : null,
                            r = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                        en(this, i), n && (this.host = n), this.headers = Object.assign({
                            "Content-Type": "application/json",
                            Accept: "application/json"
                        }, r)
                    }
                    return tn(i, [{
                        key: "get",
                        value: function r(e, t) {
                            var n = 1 < arguments.length && t !== undefined ? arguments[1] : {};
                            return this.request("GET", e, null, n)
                        }
                    }, {
                        key: "post",
                        value: function a(e, t, n) {
                            var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                            return this.request("POST", e, t, r)
                        }
                    }, {
                        key: "patch",
                        value: function o(e, t, n) {
                            var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                            return this.request("PATCH", e, t, r)
                        }
                    }, {
                        key: "put",
                        value: function c(e, t, n) {
                            var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                            return this.request("PUT", e, t, r)
                        }
                    }, {
                        key: "stopPolling",
                        value: function e() {
                            this.pollExpiryTimeout && window.clearTimeout(this.pollExpiryTimeout), this.pollScheduleTimeout && window.clearTimeout(this.pollScheduleTimeout)
                        }
                    }, {
                        key: "request",
                        value: function t(a, o, c, s) {
                            return fe(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = {
                                                body: JSON.stringify(c)
                                            }, "GET" === a && delete t.body, "/" === o[0] && this.host && (o = "https://" + this.host + o), e.next = 5, fetch(o, Object.assign({
                                                method: a,
                                                headers: this.headers,
                                                credentials: "same-origin"
                                            }, t));
                                        case 5:
                                            return n = e.sent, e.next = 8, this.pollRequest(s, n);
                                        case 8:
                                            return r = e.sent, e.abrupt("return", b(r));
                                        case 10:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "poll",
                        value: function n(r, i) {
                            return fe(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.pollRequest(r, i);
                                        case 2:
                                            return t = e.sent, e.abrupt("return", b(t));
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "pollRequest",
                        value: function u(e, t) {
                            var n = this,
                                r = "undefined" != typeof e.poll ? e.poll : ye.poll,
                                c = "undefined" != typeof e.timeout ? e.timeout : ye.timeout;
                            if (!r || 202 !== t.status) return Promise.resolve(t);
                            var s = {
                                method: "GET",
                                headers: this.headers
                            };
                            return new Promise(function(r, i) {
                                var a = n;
                                a.pollExpiryTimeout = window.setTimeout(function() {
                                    n.pollScheduleTimeout && clearTimeout(n.pollScheduleTimeout), i(new pe(c))
                                }, c),
                                    function o(e) {
                                        if (202 === e.status) {
                                            var t = e.headers.get("Location");
                                            if (!t) return void i(new me);
                                            var n = 1e3 * (Number(e.headers.get("Retry-After")) || 1);
                                            a.pollScheduleTimeout = window.setTimeout(function() {
                                                fetch(t, s).then(o.bind(a))["catch"](i)
                                            }, n)
                                        } else a.pollExpiryTimeout && window.clearTimeout(a.pollExpiryTimeout), r(e)
                                    }.call(n, t)
                            })
                        }
                    }]), i
                }(),
                ge = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                be = function(e) {
                    function t() {
                        return en(this, t), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return Zt(t, e), t
                }(Error),
                we = "shopify-checkout",
                ke = {
                    getApiToken: function Jt() {
                        return P("api-token")
                    },
                    getAuthorizationToken: function Xt() {
                        return P("authorization-token")
                    }
                },
                _e = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                xe = "X-Shopify-Checkout-Authorization-Token",
                Pe = function() {
                    function s(e) {
                        var t = 0 < arguments.length && e !== undefined ? arguments[0] : {};
                        en(this, s);
                        var n = t.accessToken,
                            r = t.secretKey;
                        n || (n = ke.getApiToken());
                        var i = {
                                Authorization: "Basic " + w(n),
                                "X-Shopify-Checkout-Version": "2018-03-05",
                                "X-Shopify-VisitToken": E("_shopify_s"),
                                "X-Shopify-UniqueToken": E("_shopify_y")
                            },
                            a = Qt(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, t.host, i));
                        return r ? (a.secretKey = r, a.storeAuthorizationToken(r)) : (a.secretKey = "", a.storeAuthorizationToken(ke.getAuthorizationToken())), a
                    }
                    return Zt(s, ve), tn(s, [{
                        key: "request",
                        value: function n(r, i, a, o) {
                            var t = this,
                                c = function c(e) {
                                    return nn(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), e, t)
                                };
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, c("request").call(this, r, i, a, o);
                                        case 2:
                                            return t = e.sent, this.extractAuthorizationToken(t), e.abrupt("return", t);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "storeAuthorizationToken",
                        value: function t(e) {
                            e && (this.secretKey = e, this.headers[xe] = e)
                        }
                    }, {
                        key: "getCheckout",
                        value: function r(a) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.get("/wallets/checkouts/" + a + ".json");
                                        case 2:
                                            return t = e.sent, e.next = 5, t.json();
                                        case 5:
                                            return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "createCheckout",
                        value: function i(a) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return a.checkout && null == a.checkout.secret && (a.checkout.secret = !0), e.next = 3, this.post("/wallets/checkouts.json", a, {
                                                poll: !1
                                            });
                                        case 3:
                                            return t = e.sent, e.next = 6, t.json();
                                        case 6:
                                            return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "updateCheckout",
                        value: function c(a, o) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.patch("/wallets/checkouts/" + a + ".json", {
                                                checkout: o
                                            });
                                        case 2:
                                            return t = e.sent, e.next = 5, t.json();
                                        case 5:
                                            return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "addReductionCode",
                        value: function u(a, o) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.patch("/wallets/checkouts/" + a + ".json", {
                                                checkout: {
                                                    reduction_code: o
                                                }
                                            });
                                        case 2:
                                            return t = e.sent, e.next = 5, t.json();
                                        case 5:
                                            return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "getShippingRates",
                        value: function o(a) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.get("/wallets/checkouts/" + a + "/shipping_rates.json");
                                        case 2:
                                            return t = e.sent, e.next = 5, t.json();
                                        case 5:
                                            return n = e.sent, r = n.shipping_rates, e.abrupt("return", r);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "createPayment",
                        value: function h(i, a, o) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.post("/wallets/checkouts/" + i + "/payments.json", {
                                                payment: a
                                            }, o);
                                        case 2:
                                            return t = e.sent, e.next = 5, t.json();
                                        case 5:
                                            return n = e.sent, e.abrupt("return", n.payment);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "createPaymentSession",
                        value: function l(i, a) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, fetch(i, {
                                                headers: {
                                                    Accept: "application/json",
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify(a),
                                                mode: "cors",
                                                method: "POST"
                                            });
                                        case 2:
                                            return t = e.sent, e.next = 5, t.json();
                                        case 5:
                                            return n = e.sent, e.abrupt("return", n);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "completeFreeCheckout",
                        value: function d(a) {
                            return _e(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.post("/wallets/checkouts/" + a + "/complete.json", {
                                                checkout: {
                                                    token: a,
                                                    order: null
                                                }
                                            });
                                        case 2:
                                            return t = e.sent, e.next = 5, t.json();
                                        case 5:
                                            return n = e.sent, r = n.checkout, e.abrupt("return", r);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "extractAuthorizationToken",
                        value: function a(e) {
                            var t = e.headers.get(xe);
                            e.ok && this.storeAuthorizationToken(t)
                        }
                    }]), s
                }(),
                Ee = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Ce = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Se = ee,
                Ae = Se.Failure,
                ze = Se.Cancelled,
                Fe = Se.Success,
                De = function() {
                    function n(e) {
                        var t = this;
                        en(this, n), this.resolve = function() {}, this.fail = function(e) {
                            t.resolve({
                                state: Ae,
                                errors: y(e)
                            })
                        }, this.oncancel = function() {
                            return t.checkout.stopPolling(), t.paymentInProgress ? t.fail(["Your order is being processed and can't be cancelled at this time.You will receive an email confirmation once the transaction is succesful."]) : t.resolve({
                                state: ze,
                                errors: []
                            }), Promise.resolve()
                        }, this.onvalidatemerchant = function(i) {
                            return Ce(t, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = i.validationURL, e.prev = 1, e.next = 4, C({
                                                shopId: this.shopId,
                                                domain: location.hostname,
                                                validationUrl: t
                                            });
                                        case 4:
                                            n = e.sent, this.session.completeMerchantValidation(n), e.next = 12;
                                            break;
                                        case 8:
                                            e.prev = 8, e.t0 = e["catch"](1), console.warn(e.t0.message), this.handleErrors(_("failed_session"));
                                        case 12:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this, [
                                    [1, 8]
                                ])
                            }))
                        }, this.onshippingcontactselected = function(a) {
                            return Ce(t, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = {
                                                partial_addresses: !0,
                                                shipping_address: x(a.shippingContact)
                                            }, e.prev = 1, e.next = 4, this.checkout.update(t);
                                        case 4:
                                            return e.next = 6, this.checkout.refreshShippingRates();
                                        case 6:
                                            this.session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS, F(this.checkout), A(this.checkout, this.merchantName), z(this.checkout)), this.firstShippingContactSelected = !1, e.next = 44;
                                            break;
                                        case 10:
                                            if (e.prev = 10, e.t0 = e["catch"](1), console.warn(e.t0.message), e.prev = 13, !R(e.t0) || !this.firstShippingContactSelected) {
                                                e.next = 19;
                                                break
                                            }
                                            this.session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS, [], A(this.checkout, this.merchantName), z(this.checkout)), this.firstShippingContactSelected = !1, e.next = 20;
                                            break;
                                        case 19:
                                            throw e.t0;
                                        case 20:
                                            e.next = 44;
                                            break;
                                        case 22:
                                            if (e.prev = 22, e.t1 = e["catch"](13), console.warn(e.t1.message), e.prev = 25, R(e.t1)) {
                                                e.next = 28;
                                                break
                                            }
                                            throw e.t1;
                                        case 28:
                                            return e.next = 30, e.t0.response.json();
                                        case 30:
                                            n = e.sent, r = n.errors, this.handleErrors(s(r)), e.next = 44;
                                            break;
                                        case 35:
                                            e.prev = 35, e.t2 = e["catch"](25), console.warn(e.t2.message), e.t3 = e.t2.message, e.next = "Total amount must be greater than zero" === e.t3 ? 41 : "Total amount is too big" === e.t3 ? 42 : 43;
                                            break;
                                        case 41:
                                            return e.abrupt("return", this.handleErrors([_("total_price_zero")]));
                                        case 42:
                                            return e.abrupt("return", this.handleErrors([_("total_price_too_big")]));
                                        case 43:
                                            return e.abrupt("return", this.session.abort());
                                        case 44:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this, [
                                    [1, 10],
                                    [13, 22],
                                    [25, 35]
                                ])
                            }))
                        }, this.onshippingmethodselected = function(i) {
                            return Ce(t, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = i.shippingMethod, n = {
                                                shipping_line: {
                                                    handle: t.identifier
                                                }
                                            }, e.prev = 2, e.next = 5, this.checkout.update(n);
                                        case 5:
                                            this.session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, A(this.checkout, this.merchantName), z(this.checkout)), e.next = 12;
                                            break;
                                        case 8:
                                            e.prev = 8, e.t0 = e["catch"](2), console.warn(e.t0.message), this.session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE, null, null);
                                        case 12:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this, [
                                    [2, 8]
                                ])
                            }))
                        }, this.onpaymentauthorized = function(e) {
                            var b = e.payment;
                            return Ce(t, void 0, void 0, regeneratorRuntime.mark(function w() {
                                var t, n, r, i, a, o, c, s, u, h, l, d, f, p, m, y, v;
                                return regeneratorRuntime.wrap(function g(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (t = b.token, n = b.billingContact, r = b.shippingContact, i = t.paymentData, a = n && n.emailAddress || r && r.emailAddress, o = n && x(n), c = r && x(r), s = V(t.paymentMethod.displayName), u = O(t.paymentMethod.network), h = {
                                                    email: a,
                                                    billing_address: o,
                                                    shipping_address: c,
                                                    credit_card: {
                                                        last_digits: s,
                                                        brand: u
                                                    }
                                                }, this.checkout.attributes.requires_shipping && !this.checkout.attributes.shipping_line) return e.abrupt("return", this.handleErrors([_("no_shipping_option")]));
                                            e.next = 10;
                                            break;
                                        case 10:
                                            return l = {
                                                unique_token: k(),
                                                amount: this.checkout.attributes.total_price,
                                                payment_token: {
                                                    type: "apple_pay",
                                                    payment_data: JSON.stringify(i)
                                                }
                                            }, e.prev = 11, e.next = 14, this.checkout.update(h);
                                        case 14:
                                            if (this.paymentInProgress = !0, d = void 0, "0.00" === this.checkout.attributes.payment_due) return e.next = 19, this.checkout.completeFreeCheckout();
                                            e.next = 24;
                                            break;
                                        case 19:
                                            f = e.sent, this.paymentInProgress = !1, d = f.attributes.web_url, e.next = 32;
                                            break;
                                        case 24:
                                            return e.next = 26, this.checkout.createPayment(l);
                                        case 26:
                                            if (p = e.sent, this.paymentInProgress = !1, p.isSuccess) {
                                                e.next = 31;
                                                break
                                            }
                                            return this.handleErrors([p.payment_processing_error_message || ""]), e.abrupt("return");
                                        case 31:
                                            d = p.checkout.web_url;
                                        case 32:
                                            this.session.completePayment(ApplePaySession.STATUS_SUCCESS), location.assign(d), this.resolve({
                                                state: Fe
                                            }), e.next = 61;
                                            break;
                                        case 37:
                                            if (e.prev = 37, e.t0 = e["catch"](11), console.warn(e.t0.message), R(e.t0)) return e.prev = 41, e.next = 44, e.t0.response.json();
                                            e.next = 60;
                                            break;
                                        case 44:
                                            if (m = e.sent, y = m.errors, (v = y.checkout || y).billing_address) return e.abrupt("return", this.session.completePayment(ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS));
                                            e.next = 49;
                                            break;
                                        case 49:
                                            if (v.shipping_address) return e.abrupt("return", this.session.completePayment(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS));
                                            e.next = 51;
                                            break;
                                        case 51:
                                            return e.abrupt("return", this.session.completePayment(ApplePaySession.STATUS_FAILURE));
                                        case 54:
                                            e.prev = 54, e.t1 = e["catch"](41), console.warn(e.t1.message), this.session.completePayment(ApplePaySession.STATUS_FAILURE);
                                        case 58:
                                            e.next = 61;
                                            break;
                                        case 60:
                                            this.session.completePayment(ApplePaySession.STATUS_FAILURE);
                                        case 61:
                                        case "end":
                                            return e.stop()
                                    }
                                }, w, this, [
                                    [11, 37],
                                    [41, 54]
                                ])
                            }))
                        }, this.onpaymentmethodselected = function() {
                            return t.session.completePaymentMethodSelection(A(t.checkout, t.merchantName), z(t.checkout)), Promise.resolve()
                        }, this.promise = new Promise(function(e) {
                            t.resolve = e
                        }), this.checkout = e.checkout, this.firstShippingContactSelected = !0, this.merchantName = e.merchantName, this.paymentInProgress = !1, this.shopId = e.shopId, this.session = e.session, this.session.oncancel = this.oncancel, this.session.onpaymentauthorized = this.onpaymentauthorized, this.session.onpaymentmethodselected = this.onpaymentmethodselected, this.session.onshippingcontactselected = this.onshippingcontactselected, this.session.onshippingmethodselected = this.onshippingmethodselected, this.session.onvalidatemerchant = this.onvalidatemerchant
                    }
                    return tn(n, [{
                        key: "begin",
                        value: function t() {
                            return Ce(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return this.session.begin(), e.abrupt("return", this.promise);
                                        case 2:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "handleErrors",
                        value: function r(e) {
                            this.fail(e), this.session.abort()
                        }
                    }]), n
                }(),
                Re = undefined && undefined.__decorate || function(e, t, n, r) {
                    var i, a = arguments.length,
                        o = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : on(Reflect)) && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, n, r);
                    else
                        for (var c = e.length - 1; 0 <= c; c--)(i = e[c]) && (o = (a < 3 ? i(o) : 3 < a ? i(t, n, o) : i(t, n)) || o);
                    return 3 < a && o && Object.defineProperty(t, n, o), o
                },
                Ve = undefined && undefined.__metadata || function(e, t) {
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : on(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
                },
                Oe = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Te = undefined && undefined.__rest || function(e, t) {
                    var n = {};
                    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var i = 0;
                        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && (n[r[i]] = e[r[i]])
                    }
                    return n
                },
                je = "shopifyApplePayAcceleration",
                Me = function() {
                    function a(e, t) {
                        en(this, a), this.id = "ApplePay", this.apiVersion = 1;
                        var n = e.shopId,
                            r = e.merchantName,
                            i = Te(e, ["shopId", "merchantName"]);
                        this.shopId = n.toString(), this.merchantId = t, this.merchantName = r, this.applePayPaymentRequest = i
                    }
                    return tn(a, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function t() {
                            return Oe(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if ("boolean" == typeof(t = h(je))) return e.abrupt("return", t);
                                            e.next = 3;
                                            break;
                                        case 3:
                                            return e.next = 5, this.requestAppleAcceleration();
                                        case 5:
                                            return n = e.sent, u(je, n, 1800), e.abrupt("return", n);
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "begin",
                        value: function n(a) {
                            return Oe(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = new ApplePaySession(this.apiVersion, this.applePayPaymentRequest), e.next = 3, a;
                                        case 3:
                                            return n = e.sent, r = new De({
                                                session: t,
                                                checkout: n,
                                                shopId: this.shopId,
                                                merchantName: this.merchantName
                                            }), e.abrupt("return", r.begin());
                                        case 6:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "requestAppleAcceleration",
                        value: function r() {
                            return Oe(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, ApplePaySession.canMakePaymentsWithActiveCard(this.merchantId);
                                        case 2:
                                            return e.abrupt("return", e.sent);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), a
                }();
            Re([n("acceleration.check.benchmark", "id", "instrument"), Ve("design:type", Function), Ve("design:paramtypes", []), Ve("design:returntype", Promise)], Me.prototype, "requestAppleAcceleration", null);
            var Ie, Le, Be = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Ne = undefined && undefined.__rest || function(e, t) {
                    var n = {};
                    for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
                    if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
                        var i = 0;
                        for (r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && (n[r[i]] = e[r[i]])
                    }
                    return n
                },
                He = function() {
                    function e() {
                        en(this, e)
                    }
                    return tn(e, null, [{
                        key: "load",
                        value: function t(e) {
                            var n = e.merchantId,
                                r = Ne(e, ["merchantId"]);
                            return Be(this, void 0, void 0, regeneratorRuntime.mark(function i() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (ApplePaySession.canMakePayments()) return e.abrupt("return", new Me(r, n));
                                            e.next = 2;
                                            break;
                                        case 2:
                                            return e.abrupt("return", null);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }, i, this)
                            }))
                        }
                    }, {
                        key: "isSupported",
                        get: function n() {
                            return "undefined" != typeof ApplePaySession && ApplePaySession.canMakePayments()
                        }
                    }]), e
                }();
            (Le = Ie || (Ie = {}))[Le.error = 1] = "error", Le[Le.warn = 2] = "warn", Le[Le.log = 3] = "log", Le[Le.info = 4] = "info", Le[Le.debug = 5] = "debug";
            Object.keys(Ie).map(function(e) {
                return Ie[e]
            }).filter(function(e) {
                return "string" == typeof e
            });
            var Ue = console,
                qe = function() {
                    function e() {
                        en(this, e)
                    }
                    return tn(e, null, [{
                        key: "inject",
                        value: function a(e, t) {
                            var n = t.constant,
                                r = t.event;
                            if (n && T(n)) return Promise.resolve(window[n]);
                            var i = this.find(e);
                            return i || (i = t.dataset ? this.insert(e, t.dataset) : this.insert(e)), j(i, {
                                constant: n,
                                event: r
                            })
                        }
                    }, {
                        key: "insert",
                        value: function r(e, t) {
                            var n = document.createElement("script");
                            return n.src = e, t && Object.keys(t).forEach(function(e) {
                                n.dataset[e] = t[e]
                            }), (document.head || document.getElementsByTagName("head")[0]).appendChild(n)
                        }
                    }, {
                        key: "find",
                        value: function t(e) {
                            return document.querySelector('script[src="' + e + '"]')
                        }
                    }]), e
                }(),
                Ge = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                $e = "https://coin-assets.amazonpay.com/affinity.js",
                Ke = "AmazonPay",
                We = "amazon",
                Ye = void 0,
                Je = "acceleration.check.benchmark:AmazonPay",
                Xe = function() {
                    function r(e) {
                        en(this, r), this.id = "AmazonPay", this.shopId = e.shopId, this.domain = e.domain, this.region = e.region, this.merchantId = e.merchantId, this.uuid = e.uuid, this.timestamp = e.timestamp, this.signature = e.signature, this.keyPairName = e.keyPairName, this.solutionProviderId = e.solutionProviderId, this.sandbox = e.sandbox, this.clientId = e.clientId
                    }
                    return tn(r, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function t() {
                            return Ge(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r = this;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (null === this.signature) return e.abrupt("return", !1);
                                            e.next = 2;
                                            break;
                                        case 2:
                                            if ("boolean" == typeof(t = h(We))) return e.abrupt("return", t);
                                            e.next = 5;
                                            break;
                                        case 5:
                                            return e.next = 7, qe.inject($e, {
                                                constant: Ke
                                            });
                                        case 7:
                                            return d(Je), n = new Promise(function(e) {
                                                Ye = e, window.AmazonPay.affinity({
                                                    merchantId: r.merchantId,
                                                    solutionProviderId: r.solutionProviderId,
                                                    region: r.region,
                                                    requestId: r.uuid,
                                                    timestamp: r.timestamp,
                                                    domain: r.domain,
                                                    keyPairName: r.keyPairName,
                                                    signature: r.signature,
                                                    onResponse: function t(e) {
                                                        return r.onAmazonResponse(e)
                                                    },
                                                    onError: function n(e) {
                                                        return r.onAmazonError(e)
                                                    }
                                                })
                                            }), e.abrupt("return", n);
                                        case 10:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "onAmazonResponse",
                        value: function n(e) {
                            p("acceleration.check.benchmark", f(Je), {
                                instrument: "AmazonPay"
                            });
                            var t = "yes" === e.affinityStatus;
                            u(We, t, 1800), Ye(t)
                        }
                    }, {
                        key: "onAmazonError",
                        value: function i(e) {
                            p("acceleration.check.benchmark", f(Je), {
                                instrument: "AmazonPay"
                            }), Ue.info(e), Ye(!1)
                        }
                    }, {
                        key: "begin",
                        value: function a(o) {
                            return Ge(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r, i;
                                return regeneratorRuntime.wrap(function a(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, o;
                                        case 2:
                                            return t = e.sent, n = t.attributes.token, r = t.secretKey, i = I(this.domain, this.shopId, n, r), se.broadcast("amazonpay:redirect-url", {
                                                url: i
                                            }), window.location.assign(i), e.abrupt("return", {
                                                state: ee.Success
                                            });
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }], [{
                        key: "load",
                        value: function o(n) {
                            return Ge(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", new r(n));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), r
                }();
            Xe.isSupported = !0;
            var Ze = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Qe = function() {
                    function a(e) {
                        var t = e.shopId,
                            n = e.domain;
                        en(this, a), this.id = "Checkout", this.cta = "Buy Now", this.shopId = t, this.domain = n
                    }
                    return tn(a, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function t() {
                            return Ze(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", !1);
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "begin",
                        value: function n(o) {
                            return Ze(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r, i;
                                return regeneratorRuntime.wrap(function a(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, o;
                                        case 2:
                                            return t = e.sent, n = t.attributes.token, r = t.secretKey, i = L(this.domain, this.shopId, n, r), window.location.assign(i), se.broadcast("checkout:redirect-url", {
                                                url: i
                                            }), e.abrupt("return", {
                                                state: ee.Success
                                            });
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }], [{
                        key: "load",
                        value: function o(e) {
                            var n = e.shopId,
                                r = e.domain;
                            return Ze(this, void 0, void 0, regeneratorRuntime.mark(function i() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", new a({
                                                shopId: n,
                                                domain: r
                                            }));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }, i, this)
                            }))
                        }
                    }]), a
                }();
            Qe.isSupported = !0;
            var et = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                tt = function tt(e) {
                    var t = e.name.split(" "),
                        n = an(t);
                    return {
                        first_name: n[0],
                        last_name: n.slice(1).join(" "),
                        address1: e.address1,
                        address2: e.address2,
                        city: e.locality,
                        province_code: e.administrativeArea,
                        country_code: e.countryCode,
                        zip: e.postalCode,
                        phone: e.phoneNumber
                    }
                },
                nt = function nt(e) {
                    switch (e) {
                        case "AMEX":
                            return "american_express";
                        case "MASTERCARD":
                            return "master";
                        default:
                            return e.toLowerCase()
                    }
                },
                rt = function rt(e) {
                    return e.address1 !== undefined && e.address2 !== undefined && e.locality !== undefined && e.administrativeArea !== undefined && e.phoneNumber
                },
                it = function it(e) {
                    var t = e.paymentMethodData,
                        n = e.email,
                        r = e.shippingAddress,
                        i = t.info,
                        a = t.tokenizationData,
                        o = i.billingAddress,
                        c = i.cardDetails,
                        s = i.cardNetwork;
                    if (!rt(o) || !rt(r)) throw new Error("Address returned with the Google Pay paymentData is not full.");
                    var u = tt(o);
                    return {
                        checkout: {
                            billing_address: u,
                            shipping_address: tt(r),
                            email: n,
                            phone: u.phone,
                            credit_card: {
                                last_digits: c,
                                brand: nt(s),
                                first_name: u.first_name,
                                last_name: u.last_name
                            },
                            gateway_params: {
                                payment_token: {
                                    type: "google_pay",
                                    payment_data: a.token
                                }
                            }
                        }
                    }
                },
                at = {
                    "long": ".googlepay.long { background-size: auto; }",
                    da: ".googlepay.long:lang(da) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22106%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h1.568v4.76H1.8l4.06-4.76h1.946v.084L4.138%207.288l3.99%205.628V13H6.21L3.074%208.506l-1.358%201.568V13H.148V2.976zm14.682%203.57c.392.355.695.782.91%201.281.215.5.322%201.034.322%201.603a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497a3.89%203.89%200%200%201-1.484-.28l-.364.574-1.022-.574.378-.616a3.57%203.57%200%200%201-.917-1.274%204.025%204.025%200%200%201-.329-1.624c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.55%200%201.05.098%201.498.294l.378-.602%201.022.588-.392.63zM10.07%209.43c0%20.663.182%201.213.546%201.652L13.08%207.12a2.216%202.216%200%200%200-.756-.126c-.401%200-.775.098-1.12.294-.345.196-.62.478-.826.847-.205.369-.308.8-.308%201.295zm2.254%202.45a2.202%202.202%200%200%200%201.953-1.141c.21-.369.315-.805.315-1.309%200-.653-.182-1.2-.546-1.638l-2.464%203.962c.243.084.49.126.742.126zm9.04%201.344c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07V13h-1.47V2.976h1.54V5.79l-.07%201.008h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49zm-.224-1.414c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm8.644-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13h-1.54V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm15.956%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm6.24%204.634a3.235%203.235%200%200%201-1.75-.49%203.467%203.467%200%200%201-1.239-1.351c-.303-.574-.455-1.225-.455-1.953s.152-1.379.455-1.953a3.467%203.467%200%200%201%201.239-1.351%203.235%203.235%200%200%201%201.75-.49c.504%200%20.957.112%201.358.336.401.224.705.5.91.826h.07l-.07-1.008V2.976h1.54V13h-1.47v-.924h-.07c-.205.317-.509.588-.91.812a2.738%202.738%200%200%201-1.358.336zm.224-1.414a1.97%201.97%200%200%200%201.043-.294%202.15%202.15%200%200%200%20.777-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.162%202.162%200%200%200-.777-.833%202.006%202.006%200%200%200-2.093%200%202.144%202.144%200%200%200-.784.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.457.644.784.84.327.196.677.294%201.05.294zm29.498-9.428v4.097h2.554c.608%200%201.11-.202%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.414-.901-.622-1.51-.622h-2.553zm0%205.539v4.753h-1.525V.939h4.045c1.028%200%201.901.34%202.62%201.016.73.678%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.776%202.294c0%20.394.168.722.506.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067l-1.343-.837c.74-1.049%201.835-1.573%203.283-1.573m12.021.262l-5.09%2011.57H98.64l1.89-4.048-3.349-7.522h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M77.372%206.896c0-.474-.04-.932-.117-1.37h-6.433v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M70.822%2013.486c1.84%200%203.39-.598%204.521-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M66.992%208.033a4.01%204.01%200%200%201%200-2.58V3.714h-2.265A6.644%206.644%200%200%200%2064%206.743c0%201.089.262%202.117.727%203.028l2.265-1.738z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M70.822%202.67c1.005%200%201.906.34%202.617%201.01v.001l1.947-1.924C74.203.669%2072.662%200%2070.822%200a6.83%206.83%200%200%200-6.095%203.715l2.265%201.737c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 154px; }",
                    de: ".googlepay.long:lang(de) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22135%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h2.128l2.884%207.602h.084l2.884-7.602h2.128V13H8.702V7.386l.084-1.806h-.084L5.832%2013h-1.26l-2.87-7.42h-.084l.084%201.806V13H.148V2.976zm13.184%201.848a1%201%200%200%201-.735-.301%201%201%200%200%201-.301-.735%201%201%200%200%201%20.301-.735%201%201%200%200%201%20.735-.301%201%201%200%200%201%20.735.301%201%201%200%200%201%20.301.735%201%201%200%200%201-.301.735%201%201%200%200%201-.735.301zm-.77%201.036h1.54V13h-1.54V5.86zm6.464%207.252c-.317%200-.616-.051-.896-.154a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358h-1.736v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21zm60.678.112c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07V13h-1.47V2.976h1.54V5.79l-.07%201.008h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49zm-.224-1.414c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm8.48%201.414c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm2.684%203.122l3.948-4.494H92.59V5.86h5.726v1.302l-3.948%204.494h4.06V13h-5.95v-1.288zm9.628%201.512c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm5.302-8.974h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm8.34%200h1.54V13h-1.54V2.976zm6.688%2010.248c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm3.118-2.73h1.47v.938h.07c.205-.336.511-.614.917-.833.406-.22.838-.329%201.295-.329.868%200%201.528.254%201.981.763.453.509.679%201.202.679%202.079V13h-1.54V8.688c0-.56-.138-.97-.413-1.232-.275-.261-.656-.392-1.141-.392-.345%200-.653.096-.924.287a1.91%201.91%200%200%200-.63.763%202.37%202.37%200%200%200-.224%201.022V13h-1.54V5.86zM46.795%202.629v4.097h2.554c.608%200%201.11-.203%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.415-.901-.622-1.51-.622h-2.553zm0%205.539v4.753H45.27V1.186h4.045c1.028%200%201.901.34%202.62%201.016.73.677%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.775%202.294c0%20.394.17.722.507.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067L53.261%206.2c.74-1.049%201.835-1.573%203.283-1.573m12.021.263l-5.09%2011.57h-1.576l1.89-4.048L60.44%204.89h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M40.631%207.143c0-.474-.04-.932-.117-1.37H34.08v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M34.08%2013.733c1.842%200%203.392-.598%204.522-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M30.251%208.28a4.01%204.01%200%200%201%200-2.58V3.961h-2.265a6.644%206.644%200%200%200-.727%203.028c0%201.089.262%202.117.727%203.028L30.25%208.28z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M34.08%202.916c1.006%200%201.907.342%202.618%201.011v.001l1.947-1.924C37.462.916%2035.92.247%2034.08.247a6.83%206.83%200%200%200-6.095%203.715L30.25%205.7c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 183px; }",
                    en: ".googlepay.long:lang(en) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22104%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M.148%202.976h3.766c.532%200%201.024.117%201.477.35.453.233.814.555%201.085.966.27.41.406.863.406%201.358%200%20.495-.124.924-.371%201.288s-.572.64-.973.826v.084c.504.177.912.471%201.225.882.313.41.469.891.469%201.442a2.6%202.6%200%200%201-.427%201.47c-.285.43-.667.763-1.148%201.001A3.5%203.5%200%200%201%204.082%2013H.148V2.976zm3.696%204.2c.448%200%20.81-.14%201.085-.42.275-.28.413-.602.413-.966s-.133-.684-.399-.959c-.266-.275-.614-.413-1.043-.413H1.716v2.758h2.128zm.238%204.368c.476%200%20.856-.15%201.141-.448.285-.299.427-.644.427-1.036%200-.401-.147-.749-.441-1.043-.294-.294-.688-.441-1.183-.441h-2.31v2.968h2.366zm7.36%201.68c-.868%200-1.528-.259-1.981-.777-.453-.518-.679-1.239-.679-2.163V5.86h1.54v4.214c0%20.579.138%201.013.413%201.302.275.29.637.434%201.085.434.364%200%20.686-.096.966-.287.28-.191.495-.446.644-.763a2.37%202.37%200%200%200%20.224-1.022V5.86h1.54V13h-1.456v-.924h-.084c-.196.336-.5.611-.91.826-.41.215-.845.322-1.302.322zm7.878-.616L16.352%205.86h1.722l2.016%204.858h.056l1.96-4.858H23.8l-4.41%2010.164h-1.624l1.554-3.416zm8.266-6.748h1.666l1.442%205.11h.056l1.61-5.11h1.582l1.596%205.11h.056l1.442-5.11h1.638L36.392%2013h-1.624L33.13%207.876h-.042L31.464%2013h-1.596l-2.282-7.14zM40.7%204.824a1%201%200%200%201-.735-.301%201%201%200%200%201-.301-.735%201%201%200%200%201%20.301-.735%201%201%200%200%201%20.735-.301%201%201%200%200%201%20.735.301%201%201%200%200%201%20.301.735%201%201%200%200%201-.301.735%201%201%200%200%201-.735.301zm-.77%201.036h1.54V13h-1.54V5.86zm6.464%207.252c-.317%200-.616-.051-.896-.154a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358H45.75v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21zm2.782-10.136h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm32.619-.347v4.097h2.554c.608%200%201.11-.203%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.415-.901-.622-1.51-.622h-2.553zm0%205.539v4.753H80.27V1.186h4.045c1.028%200%201.901.34%202.62%201.016.73.677%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.775%202.294c0%20.394.17.722.507.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067L88.261%206.2c.74-1.049%201.835-1.573%203.283-1.573m12.021.263l-5.09%2011.57h-1.576l1.89-4.048L95.44%204.89h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M75.631%207.143c0-.474-.04-.932-.117-1.37H69.08v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M69.08%2013.733c1.842%200%203.392-.598%204.522-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M65.251%208.28a4.01%204.01%200%200%201%200-2.58V3.961h-2.265a6.644%206.644%200%200%200-.727%203.028c0%201.089.262%202.117.727%203.028L65.25%208.28z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M69.08%202.916c1.006%200%201.907.342%202.618%201.011v.001l1.947-1.924C72.462.916%2070.92.247%2069.08.247a6.83%206.83%200%200%200-6.095%203.715L65.25%205.7c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 152px; }",
                    es: ".googlepay.long:lang(es) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22135%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm7.794%207.364c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm5.302-6.09h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm12.536%207.364c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07c.205-.336.511-.614.917-.833.406-.22.838-.329%201.295-.329.868%200%201.528.254%201.981.763.453.509.679%201.202.679%202.079V13h-1.54V8.688c0-.56-.138-.97-.413-1.232-.275-.261-.656-.392-1.141-.392-.345%200-.653.096-.924.287a1.91%201.91%200%200%200-.63.763%202.37%202.37%200%200%200-.224%201.022V13h-1.54V5.86zm32.666-3.231v4.097h2.556c.61%200%201.113-.203%201.511-.607.409-.404.614-.885.614-1.442%200-.546-.205-1.022-.614-1.427-.398-.415-.902-.622-1.51-.622h-2.557zm0%205.539v4.753h-1.527V1.186h4.05c1.03%200%201.903.34%202.623%201.016.73.677%201.095%201.503%201.095%202.475%200%20.994-.365%201.825-1.095%202.49-.709.668-1.583%201-2.623%201h-2.523v.001zm7.785%202.294c0%20.394.168.722.506.984a1.88%201.88%200%200%200%201.187.393c.642%200%201.214-.235%201.718-.704.503-.47.755-1.022.755-1.655-.477-.372-1.14-.557-1.992-.557-.62%200-1.138.148-1.552.443-.415.295-.622.66-.622%201.096m1.975-5.834c1.13%200%202.02.298%202.674.893.652.596.978%201.413.978%202.45v4.95h-1.46v-1.115h-.067c-.63.918-1.472%201.377-2.523%201.377-.896%200-1.647-.262-2.249-.787-.603-.524-.905-1.18-.905-1.966%200-.831.318-1.491.954-1.983.637-.492%201.486-.738%202.548-.738.907%200%201.654.164%202.24.492v-.345c0-.524-.21-.97-.63-1.335a2.179%202.179%200%200%200-1.477-.55c-.853%200-1.527.356-2.025%201.067L119.29%206.2c.742-1.049%201.837-1.573%203.287-1.573m12.036.263l-5.097%2011.57h-1.576l1.892-4.048-3.353-7.522h1.66l2.423%205.77h.034l2.357-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M106.647%207.143c0-.474-.04-.932-.118-1.37h-6.44v2.596h3.689a3.12%203.12%200%200%201-1.364%202.05v1.686h2.201c1.29-1.174%202.032-2.91%202.032-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M100.089%2013.733c1.843%200%203.395-.598%204.526-1.628l-2.201-1.687c-.613.408-1.402.646-2.325.646-1.782%200-3.294-1.186-3.834-2.784h-2.268v1.738a6.839%206.839%200%200%200%206.102%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M96.255%208.28a4.005%204.005%200%200%201%200-2.58V3.961h-2.268a6.638%206.638%200%200%200-.728%203.028%206.64%206.64%200%200%200%20.728%203.028l2.268-1.738z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M100.089%202.916c1.006%200%201.908.342%202.62%201.011v.001l1.949-1.924C103.474.916%20101.93.247%20100.088.247a6.839%206.839%200%200%200-6.101%203.715L96.255%205.7c.54-1.597%202.052-2.783%203.834-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 183px; }",
                    fr: ".googlepay.long:lang(fr) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22135%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M3.976%202.976h1.792L9.534%2013H7.798l-.896-2.562H2.856L1.946%2013H.21L3.976%202.976zM6.37%208.982L5.306%206l-.392-1.162H4.83L4.438%206%203.374%208.982H6.37zm7.514%204.242c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm4.7-10.248h1.54v2.73l-.07%201.092h.07c.205-.336.511-.614.917-.833.406-.22.842-.329%201.309-.329.868%200%201.53.254%201.988.763.457.509.686%201.202.686%202.079V13h-1.54V8.688c0-.541-.142-.947-.427-1.218-.285-.27-.656-.406-1.113-.406-.345%200-.656.098-.931.294a2.042%202.042%200%200%200-.651.777%202.297%202.297%200%200%200-.238%201.029V13h-1.54V2.976zm11.602%2010.248c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zM32.02%208.59a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm5.834%204.522c-.317%200-.616-.051-.896-.154a1.967%201.967%200%200%201-.686-.406c-.401-.401-.602-.947-.602-1.638V7.218h-1.246V5.86h1.246V3.844h1.54V5.86h1.736v1.358H37.21v3.36c0%20.383.075.653.224.812.14.187.383.28.728.28.159%200%20.299-.021.42-.063.121-.042.252-.11.392-.203v1.498c-.308.14-.681.21-1.12.21zm5.694.112c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zM48.5%205.86h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13H48.5V5.86zm11.472%207.364c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm4.364-6.09h1.722l1.974%205.152h.056L70.37%205.86h1.68L69.082%2013h-1.54l-2.94-7.14zm11.644%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49h-5.474c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zM78.08%208.59a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm6.492%204.634c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm28.954-10.589v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53h-1.553l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M107.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M100.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M97.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M100.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 183px; }",
                    it: ".googlepay.long:lang(it) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22129%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm7.794%207.364c-.513%200-.97-.1-1.372-.301a2.247%202.247%200%200%201-.938-.854%202.365%202.365%200%200%201-.336-1.253c0-.737.278-1.32.833-1.75.555-.43%201.258-.644%202.107-.644.42%200%20.798.04%201.134.119.336.08.602.166.798.259v-.364c0-.439-.163-.796-.49-1.071-.327-.275-.747-.413-1.26-.413-.364%200-.707.08-1.029.238a2.018%202.018%200%200%200-.777.658l-1.078-.826c.317-.439.728-.78%201.232-1.022a3.822%203.822%200%200%201%201.68-.364c1.036%200%201.834.254%202.394.763s.84%201.225.84%202.149V13h-1.512v-.854h-.07a2.416%202.416%200%200%201-.868.77%202.629%202.629%200%200%201-1.288.308zm.266-1.274c.373%200%20.71-.089%201.008-.266a1.938%201.938%200%200%200%20.952-1.68%203.134%203.134%200%200%200-.749-.294%203.49%203.49%200%200%200-.889-.112c-.579%200-1.003.114-1.274.343a1.11%201.11%200%200%200-.406.889c0%20.327.126.595.378.805.252.21.579.315.98.315zm12.032%201.274c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07c.205-.336.511-.614.917-.833.406-.22.838-.329%201.295-.329.868%200%201.528.254%201.981.763.453.509.679%201.202.679%202.079V13h-1.54V8.688c0-.56-.138-.97-.413-1.232-.275-.261-.656-.392-1.141-.392-.345%200-.653.096-.924.287a1.91%201.91%200%200%200-.63.763%202.37%202.37%200%200%200-.224%201.022V13h-1.54V5.86zm32.19-3.478v4.097h2.554c.608%200%201.11-.202%201.509-.607a1.96%201.96%200%200%200%20.613-1.442c0-.546-.205-1.022-.613-1.427-.398-.414-.901-.622-1.51-.622h-2.553zm0%205.539v4.753h-1.525V.939h4.045c1.028%200%201.901.34%202.62%201.016.73.678%201.094%201.503%201.094%202.475%200%20.994-.364%201.825-1.094%202.49-.708.668-1.581%201-2.62%201h-2.52v.001zm7.776%202.294c0%20.394.168.722.506.984.337.262.732.393%201.185.393.641%200%201.213-.235%201.716-.704.503-.47.754-1.022.754-1.655-.476-.372-1.139-.557-1.99-.557-.62%200-1.135.148-1.55.443-.414.295-.621.66-.621%201.096m1.973-5.834c1.128%200%202.018.298%202.67.893.652.596.978%201.413.978%202.45v4.95h-1.459v-1.115h-.066c-.63.918-1.47%201.377-2.52%201.377-.896%200-1.645-.262-2.247-.787-.602-.524-.904-1.18-.904-1.966%200-.831.318-1.491.953-1.983.636-.492%201.484-.738%202.545-.738.906%200%201.653.164%202.238.492v-.345c0-.524-.21-.97-.63-1.335a2.175%202.175%200%200%200-1.475-.55c-.852%200-1.525.356-2.023%201.067l-1.343-.837c.74-1.049%201.835-1.573%203.283-1.573m12.021.262l-5.09%2011.57h-1.576l1.89-4.048-3.349-7.522h1.658l2.421%205.77h.033l2.355-5.77z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M100.372%206.896c0-.474-.04-.932-.117-1.37h-6.433v2.596h3.684a3.12%203.12%200%200%201-1.362%202.05v1.686h2.199c1.288-1.174%202.03-2.91%202.03-4.962%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M93.822%2013.486c1.84%200%203.39-.598%204.521-1.628l-2.2-1.687c-.611.408-1.4.646-2.321.646-1.78%200-3.29-1.186-3.83-2.784h-2.265v1.738a6.83%206.83%200%200%200%206.095%203.715%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M89.992%208.033a4.01%204.01%200%200%201%200-2.58V3.714h-2.265A6.644%206.644%200%200%200%2087%206.743c0%201.089.262%202.117.727%203.028l2.265-1.738z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M93.822%202.67c1.005%200%201.906.34%202.617%201.01v.001l1.947-1.924C97.203.669%2095.662%200%2093.822%200a6.83%206.83%200%200%200-6.095%203.715l2.265%201.737c.54-1.597%202.05-2.783%203.83-2.783%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 177px; }",
                    ja: ".googlepay.long:lang(ja) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M56.29%205.72c.336.49.854%201.344%201.148%201.932l-.868.392c-.336-.714-.7-1.358-1.12-1.96l.84-.364zm1.554-.602c.336.476.882%201.316%201.19%201.89l-.854.42a13.139%2013.139%200%200%200-1.176-1.932l.84-.378zM47.106%203.634a19.634%2019.634%200%200%200%201.288-.07c1.008-.098%203.486-.336%206.034-.546%201.47-.126%202.87-.21%203.808-.238l.014%201.414c-.77%200-1.974.014-2.702.196-1.834.56-3.052%202.52-3.052%204.158%200%202.534%202.352%203.36%204.634%203.472l-.504%201.484c-2.716-.14-5.558-1.596-5.558-4.648%200-2.1%201.218-3.78%202.338-4.494-1.204.126-4.606.462-6.16.798l-.14-1.526zm22.886%204.102h-5.474c.616%201.19%201.512%202.17%202.66%202.968%201.176-.77%202.142-1.736%202.814-2.968zm.966-1.344l.91.546c-.742%201.918-1.946%203.374-3.472%204.48%201.442.728%203.192%201.218%205.208%201.456-.294.308-.644.896-.826%201.26-2.24-.336-4.116-.966-5.67-1.904-1.68.91-3.626%201.498-5.684%201.862-.112-.336-.462-.938-.728-1.246%201.918-.28%203.696-.742%205.222-1.456a10.134%2010.134%200%200%201-2.646-3.318l.966-.336H61.9V6.448h4.536V4.53h-5.18V3.242h5.18V1.254h1.344v1.988h5.222V4.53H67.78v1.918h2.954l.224-.056zm9.502%202.002l-2.1.518v3.668c0%20.742-.154%201.092-.588%201.302-.448.182-1.134.224-2.198.224a5.392%205.392%200%200%200-.378-1.232c.7.028%201.4.028%201.61.014.21-.014.28-.07.28-.308V9.22l-2.016.49-.294-1.274c.644-.126%201.442-.294%202.31-.476V5.216h-2.1V4.012h2.1V1.24h1.274v2.772h1.918v1.204H78.36V7.68c.658-.154%201.33-.308%202.002-.462l.098%201.176zm7.406%205.208l-1.26.49c-.084-.364-.21-.784-.35-1.232-2.548.364-5.222.714-7.098.966l-.28-1.358c.42-.042.91-.098%201.428-.154.868-2.912%201.82-7.322%202.282-10.696l1.414.252c-.56%203.346-1.498%207.406-2.338%2010.304%201.288-.154%202.73-.322%204.158-.49A34.948%2034.948%200%200%200%2084.1%208.03l1.134-.406c1.106%201.904%202.24%204.368%202.632%205.978zm10.412-5.25c0-1.064-.84-1.848-2.212-1.848-1.568%200-2.926.476-3.696.7-.42.112-.882.294-1.246.434l-.434-1.596c.42-.028.952-.126%201.372-.21%201.008-.224%202.576-.658%204.172-.658%202.072%200%203.57%201.176%203.57%203.234%200%202.982-2.716%204.746-6.412%205.292l-.812-1.358c3.402-.42%205.698-1.652%205.698-3.99zm-5.656-6.426c1.568.336%204.648.616%206.048.63l-.224%201.358c-1.568-.112-4.452-.378-6.034-.658l.21-1.33zm-73.096.709v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M13.448%207.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M6.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774H.978v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M3.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964H.978A6.678%206.678%200%200%200%20.261%206.98c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M6.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918C10.324.928%208.804.262%206.989.262a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 148px; }",
                    "pt-br": ".googlepay.long:lang(pt-br) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22145%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm8.648%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49H47.65c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm9.848%204.634c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13h-1.54V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm19.466%207.364c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm29.476-9.175v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53h-1.553l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M117.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M110.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M107.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M110.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 193px; }",
                    "pt-pt": ".googlepay.long:lang(pt-pt) { background-image: url(data:image/svg+xml,%3Csvg%20width%3D%22145%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M5.88%2013.224c-.97%200-1.857-.229-2.66-.686a4.968%204.968%200%200%201-1.89-1.89%205.279%205.279%200%200%201-.686-2.66c0-.97.229-1.857.686-2.66a4.968%204.968%200%200%201%201.89-1.89%205.279%205.279%200%200%201%202.66-.686c.756%200%201.444.14%202.065.42.62.28%201.169.686%201.645%201.218L8.47%205.468a3.45%203.45%200%200%200-1.148-.917c-.42-.2-.9-.301-1.442-.301a3.73%203.73%200%200%200-1.841.462%203.428%203.428%200%200%200-1.323%201.309c-.327.565-.49%201.22-.49%201.967%200%20.747.163%201.402.49%201.967a3.428%203.428%200%200%200%201.323%201.309%203.732%203.732%200%200%200%201.841.462c1.12%200%202.072-.467%202.856-1.4l1.134%201.092a5.105%205.105%200%200%201-1.75%201.33%205.24%205.24%200%200%201-2.24.476zm8.704%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13H29V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm12.638%200h1.47v.938h.07c.205-.327.509-.602.91-.826a2.738%202.738%200%200%201%201.358-.336c.644%200%201.227.163%201.75.49.523.327.936.777%201.239%201.351.303.574.455%201.225.455%201.953s-.152%201.379-.455%201.953a3.467%203.467%200%200%201-1.239%201.351%203.235%203.235%200%200%201-1.75.49c-.504%200-.957-.112-1.358-.336-.401-.224-.705-.495-.91-.812h-.07l.07.994v2.954h-1.54V5.86zm3.584%205.95c.373%200%20.723-.098%201.05-.294a2.13%202.13%200%200%200%20.784-.84c.196-.364.294-.78.294-1.246%200-.467-.098-.88-.294-1.239a2.144%202.144%200%200%200-.784-.833%202.006%202.006%200%200%200-2.093%200%202.162%202.162%200%200%200-.777.833c-.196.36-.294.772-.294%201.239%200%20.467.098.882.294%201.246.196.364.455.644.777.84.322.196.67.294%201.043.294zm5.148-5.95h1.47v1.05h.07c.159-.364.434-.665.826-.903a2.362%202.362%200%200%201%201.246-.357c.345%200%20.635.047.868.14v1.596c-.41-.15-.78-.224-1.106-.224-.355%200-.67.093-.945.28a1.955%201.955%200%200%200-.651.749%202.24%202.24%200%200%200-.238%201.029V13h-1.54V5.86zm8.648%207.364c-.7%200-1.328-.163-1.883-.49a3.453%203.453%200%200%201-1.302-1.351c-.313-.574-.469-1.22-.469-1.939%200-.681.152-1.314.455-1.897a3.578%203.578%200%200%201%201.267-1.393c.541-.345%201.157-.518%201.848-.518.719%200%201.342.159%201.869.476.527.317.929.751%201.204%201.302.275.55.413%201.171.413%201.862%200%20.13-.014.294-.042.49H47.65c.056.663.292%201.174.707%201.533.415.36.898.539%201.449.539.439%200%20.819-.1%201.141-.301.322-.2.581-.474.777-.819l1.302.616a3.836%203.836%200%200%201-1.316%201.386c-.541.336-1.19.504-1.946.504zm1.834-4.634a1.78%201.78%200%200%200-.238-.749%201.703%201.703%200%200%200-.637-.623c-.285-.168-.632-.252-1.043-.252-.495%200-.912.147-1.253.441-.34.294-.576.688-.707%201.183h3.878zm9.848%204.634c-.71%200-1.346-.163-1.911-.49a3.424%203.424%200%200%201-1.316-1.351c-.313-.574-.469-1.225-.469-1.953s.156-1.379.469-1.953a3.424%203.424%200%200%201%201.316-1.351c.565-.327%201.202-.49%201.911-.49.784%200%201.451.177%202.002.532.55.355.943.835%201.176%201.442l-1.414.588c-.317-.756-.92-1.134-1.806-1.134-.383%200-.735.098-1.057.294a2.112%202.112%200%200%200-.77.833c-.191.36-.287.772-.287%201.239%200%20.467.096.882.287%201.246a2.1%202.1%200%200%200%20.77.84c.322.196.674.294%201.057.294.448%200%20.833-.1%201.155-.301.322-.2.567-.488.735-.861l1.386.602a3.255%203.255%200%200%201-1.232%201.442c-.55.355-1.218.532-2.002.532zm7.976%200c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm5.162-5.95h1.47v.938h.07a2.41%202.41%200%200%201%20.91-.84%202.583%202.583%200%200%201%201.26-.322c.513%200%20.961.119%201.344.357.383.238.658.553.826.945.243-.392.567-.707.973-.945s.884-.357%201.435-.357c.821%200%201.444.25%201.869.749.425.5.637%201.178.637%202.037V13h-1.54V8.688c0-1.083-.462-1.624-1.386-1.624-.495%200-.9.2-1.218.602-.317.401-.476.896-.476%201.484V13h-1.54V8.688c0-1.083-.476-1.624-1.428-1.624-.485%200-.884.2-1.197.602-.313.401-.469.896-.469%201.484V13h-1.54V5.86zm19.466%207.364c-.719%200-1.363-.166-1.932-.497a3.495%203.495%200%200%201-1.33-1.365%203.95%203.95%200%200%201-.476-1.932c0-.71.159-1.353.476-1.932a3.495%203.495%200%200%201%201.33-1.365c.57-.331%201.213-.497%201.932-.497.719%200%201.363.168%201.932.504.57.336%201.013.793%201.33%201.372.317.579.476%201.218.476%201.918a3.95%203.95%200%200%201-.476%201.932%203.495%203.495%200%200%201-1.33%201.365c-.57.331-1.213.497-1.932.497zm0-1.414a2.17%202.17%200%200%200%201.092-.287%202.11%202.11%200%200%200%20.805-.826c.2-.36.301-.782.301-1.267%200-.485-.1-.905-.301-1.26a2.122%202.122%200%200%200-.805-.819%202.17%202.17%200%200%200-1.092-.287%202.17%202.17%200%200%200-1.092.287%202.122%202.122%200%200%200-.805.819c-.2.355-.301.775-.301%201.26s.1.908.301%201.267c.2.36.469.635.805.826.336.191.7.287%201.092.287zm29.476-9.175v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53h-1.553l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M117.448%207.134c0-.473-.04-.93-.116-1.366h-6.344v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M110.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774h-2.234v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M107.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964h-2.234a6.678%206.678%200%200%200-.717%203.017c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M110.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918c-1.165-1.084-2.685-1.75-4.5-1.75a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E); min-width: 193px; }"
                },
                ot = "\n  .googlepay {\n    background-color: #000;\n    background-image: url(data:image/svg+xml,%3Csvg%20width%3D%2241%22%20height%3D%2217%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M19.526%202.635v4.083h2.518c.6%200%201.096-.202%201.488-.605.403-.402.605-.882.605-1.437%200-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0%205.52v4.736h-1.504V1.198h3.99c1.013%200%201.873.337%202.582%201.012.72.675%201.08%201.497%201.08%202.466%200%20.991-.36%201.819-1.08%202.482-.697.665-1.559.996-2.583.996h-2.485v.001zm7.668%202.287c0%20.392.166.718.499.98.332.26.722.391%201.168.391.633%200%201.196-.234%201.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61%200-1.12.148-1.528.442-.409.294-.613.657-.613%201.093m1.946-5.815c1.112%200%201.989.297%202.633.89.642.594.964%201.408.964%202.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45%201.372-2.486%201.372-.882%200-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96%200-.828.313-1.486.94-1.976s1.463-.735%202.51-.735c.892%200%201.629.163%202.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132%202.132%200%200%200-1.455-.547c-.84%200-1.504.353-1.995%201.062l-1.324-.834c.73-1.045%201.81-1.568%203.238-1.568m11.853.262l-5.02%2011.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387%205.749h.032l2.322-5.75z%22%20fill%3D%22%23FFF%22%2F%3E%3Cpath%20d%3D%22M13.448%207.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11%203.11%200%200%201-1.344%202.042v1.68h2.169c1.27-1.17%202.001-2.9%202.001-4.944%22%20fill%3D%22%234285F4%22%2F%3E%3Cpath%20d%3D%22M6.988%2013.7c1.816%200%203.344-.595%204.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754%200-3.244-1.182-3.776-2.774H.978v1.731a6.728%206.728%200%200%200%206.01%203.703%22%20fill%3D%22%2334A853%22%2F%3E%3Cpath%20d%3D%22M3.212%208.267a4.034%204.034%200%200%201%200-2.572V3.964H.978A6.678%206.678%200%200%200%20.261%206.98c0%201.085.26%202.11.717%203.017l2.234-1.731z%22%20fill%3D%22%23FABB05%22%2F%3E%3Cpath%20d%3D%22M6.988%202.921c.992%200%201.88.34%202.58%201.008v.001l1.92-1.918C10.324.928%208.804.262%206.989.262a6.728%206.728%200%200%200-6.01%203.702l2.234%201.731c.532-1.592%202.022-2.774%203.776-2.774%22%20fill%3D%22%23E94235%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E);\n    background-origin: content-box;\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: 55px auto;\n    border: none;\n    cursor: pointer;\n    outline: 0;\n    padding: 10px 8px;\n    width: 100%;\n    height: 100%;\n    min-height: 100%;\n    border-radius: 5px;\n  }\n\n  @media (min-height: 54px) {\n    .googlepay { padding: 15px 8px; }\n  }\n\n  .googlepay:focus:enabled { background-color: #3c4043; }\n\n  .googlepay:hover:enabled { background-color: #3c4043; }\n\n  .googlepay:active:enabled { background-color: #5f6368; }\n\n  .googlepay:disabled { opacity: .5; }\n",
                ct = function ct(e, t) {
                    var n = ot;
                    t && at[t] && (n = n + at["long"] + at[t]);
                    var r = document.createElement("style");
                    r.appendChild(document.createTextNode(n)), e.appendChild(r)
                },
                st = function() {
                    function a(e, t, n, r, i) {
                        en(this, a), this.googlePayClient = e, this.isReadyToPayRequest = t, this.paymentDataRequest = n, this.currency = r, this.renderOptions = i
                    }
                    return tn(a, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function t() {
                            return et(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.googlePayClient.isReadyToPay(this.isReadyToPayRequest);
                                        case 2:
                                            if ((t = e.sent).result && t.paymentMethodPresent) return this.googlePayClient.prefetchPaymentData(this.paymentDataRequest), e.abrupt("return", !0);
                                            e.next = 8;
                                            break;
                                        case 8:
                                            return e.abrupt("return", !1);
                                        case 9:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "render",
                        value: function n(a, o, c) {
                            return et(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var r, i, t = this;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return this.eventInfo = c, (r = document.createElement("button")).className = "googlepay", this.renderOptions && this.renderOptions["long"] && this.renderOptions.locale ? (r.classList.add("long"), r.setAttribute("lang", this.renderOptions.locale), ct(a, this.renderOptions.locale)) : ct(a), e.t0 = this.currency, e.next = 7, o.estimatePrice();
                                        case 7:
                                            e.t1 = e.sent, i = {
                                                totalPriceStatus: "ESTIMATED",
                                                currencyCode: e.t0,
                                                totalPrice: e.t1
                                            }, r.addEventListener("click", function(n) {
                                                return et(t, void 0, void 0, regeneratorRuntime.mark(function e() {
                                                    return regeneratorRuntime.wrap(function t(e) {
                                                        for (;;) switch (e.prev = e.next) {
                                                            case 0:
                                                                return n.preventDefault(), se.broadcast("googlepay:begin-payment", {
                                                                    eventInfo: this.eventInfo
                                                                }), r.disabled = !0, e.prev = 3, e.next = 6, this.pay.call(this, o, i);
                                                            case 6:
                                                                e.next = 11;
                                                                break;
                                                            case 8:
                                                                e.prev = 8, e.t0 = e["catch"](3), r.disabled = !1;
                                                            case 11:
                                                            case "end":
                                                                return e.stop()
                                                        }
                                                    }, e, this, [
                                                        [3, 8]
                                                    ])
                                                }))
                                            }), a.appendChild(r);
                                        case 11:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "pay",
                        value: function r(a, o) {
                            return et(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return this.paymentDataRequest.transactionInfo = o, e.next = 3, this.googlePayClient.loadPaymentData(this.paymentDataRequest);
                                        case 3:
                                            if (t = e.sent, n = it(t), r = void 0, a.hasCheckout()) return e.next = 9, a.updateCheckout(n);
                                            e.next = 12;
                                            break;
                                        case 9:
                                            r = e.sent, e.next = 15;
                                            break;
                                        case 12:
                                            return e.next = 14, a.build("google_pay", n.checkout);
                                        case 14:
                                            r = e.sent;
                                        case 15:
                                            return e.next = 17, a.forceReviewStep();
                                        case 17:
                                            se.broadcast("googlepay:redirect-url", {
                                                url: r.attributes.web_url,
                                                eventInfo: this.eventInfo
                                            }), window.location.assign(r.attributes.web_url);
                                        case 19:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), a
                }(),
                ut = function ut(e) {
                    if (!window.google) throw new Error("Google Pay SDK not loaded.");
                    var t = e.currency,
                        n = e.capabilities,
                        r = e["long"],
                        i = e.locale,
                        a = n.environment,
                        o = n.merchantInfo,
                        c = n.emailRequired,
                        s = n.allowedPaymentMethods,
                        u = n.existingPaymentMethodRequired,
                        h = n.shippingAddressRequired,
                        l = n.shippingAddressParameters,
                        d = new window.google.payments.api.PaymentsClient({
                            environment: a
                        });
                    return new st(d, {
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        merchantInfo: o,
                        allowedPaymentMethods: s,
                        existingPaymentMethodRequired: u
                    }, {
                        apiVersion: 2,
                        apiVersionMinor: 0,
                        merchantInfo: o,
                        emailRequired: c,
                        allowedPaymentMethods: s,
                        shippingAddressRequired: h,
                        shippingAddressParameters: l,
                        transactionInfo: {
                            totalPriceStatus: "NOT_CURRENTLY_KNOWN",
                            currencyCode: t
                        }
                    }, t, {
                        "long": r,
                        locale: i
                    })
                },
                ht = undefined && undefined.__decorate || function(e, t, n, r) {
                    var i, a = arguments.length,
                        o = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : on(Reflect)) && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, n, r);
                    else
                        for (var c = e.length - 1; 0 <= c; c--)(i = e[c]) && (o = (a < 3 ? i(o) : 3 < a ? i(t, n, o) : i(t, n)) || o);
                    return 3 < a && o && Object.defineProperty(t, n, o), o
                },
                lt = undefined && undefined.__metadata || function(e, t) {
                    if ("object" === ("undefined" == typeof Reflect ? "undefined" : on(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t)
                },
                dt = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                ft = function() {
                    function t(e) {
                        en(this, t), this.id = "GooglePay", this.googleClient = e
                    }
                    return tn(t, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function n() {
                            return dt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.googleClient.canMakeAcceleratedPurchase();
                                        case 2:
                                            return e.abrupt("return", e.sent);
                                        case 3:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "render",
                        value: function a(n, r, i) {
                            return dt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.googleClient.render(n, r, i && i.eventInfo);
                                        case 2:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), t
                }();
            ht([n("acceleration.check.benchmark", "id", "instrument"), lt("design:type", Function), lt("design:paramtypes", []), lt("design:returntype", Promise)], ft.prototype, "canMakeAcceleratedPurchase", null);
            var pt = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                mt = function mt(n) {
                    return pt(undefined, void 0, void 0, regeneratorRuntime.mark(function e() {
                        return regeneratorRuntime.wrap(function t(e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return window.gpayInitParams = {
                                        environment: n.capabilities.environment,
                                        merchantInfo: {
                                            merchantId: n.capabilities.merchantInfo.merchantId,
                                            merchantName: n.capabilities.merchantInfo.merchantName,
                                            authJwt: n.capabilities.merchantInfo.authJwt
                                        }
                                    }, e.next = 3, qe.inject("https://pay.google.com/gp/p/js/pay.js", {});
                                case 3:
                                case "end":
                                    return e.stop()
                            }
                        }, e, this)
                    }))
                },
                yt = function() {
                    function e() {
                        en(this, e)
                    }
                    return tn(e, null, [{
                        key: "load",
                        value: function t(r) {
                            return pt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, mt(r);
                                        case 2:
                                            return t = ut(r), e.abrupt("return", new ft(t));
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), e
                }();
            yt.isSupported = !0;
            var vt = "//www.paypalobjects.com/api/checkout.min.js",
                gt = "paypal",
                bt = "paypalCheckoutReady",
                wt = "JadedPixel_ShoppingCart_EC_CA",
                kt = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                _t = "shopifypaypalisrememberedcallback",
                xt = "Shopify.PayPalV4.isRemembered.memo",
                Pt = "https://www.paypal.com/checkoutnow/remembered?callback=" + _t,
                Et = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Ct = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                St = function() {
                    function o(e) {
                        var t = e.shopId,
                            n = e.domain,
                            r = e.environment,
                            i = e.merchantId,
                            a = e.venmoSupported;
                        en(this, o), this.id = "PayPalInContext", this.name = "PayPal", this.shopId = t, this.domain = n, this.environment = r, this.merchantId = i, this.venmoSupported = a
                    }
                    return tn(o, [{
                        key: "begin",
                        value: function t(a) {
                            return Ct(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, B(this.merchantId);
                                        case 2:
                                            if (this.paypal = e.sent, this.paypalCheckout) {
                                                e.next = 5;
                                                break
                                            }
                                            return e.abrupt("return", {
                                                state: ee.Failure,
                                                errors: ["PayPal Failed to load"]
                                            });
                                        case 5:
                                            return this.paypalCheckout.setup(this.merchantId, {
                                                environment: this.environment
                                            }), e.next = 8, a;
                                        case 8:
                                            return t = e.sent, n = t.attributes.token, r = t.secretKey, this.paypalCheckout.initXO(), this.paypalCheckout.startFlow(this.redirectUrl(n, r)), e.abrupt("return", {
                                                state: ee.Success
                                            });
                                        case 14:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "canMakeAcceleratedPurchase",
                        value: function e() {
                            return K({
                                merchantSupportsVenmo: this.venmoSupported
                            })
                        }
                    }, {
                        key: "redirectUrl",
                        value: function r(e, t) {
                            var n = "key=" + t + "&cancel_return_url=" + (window.location.protocol + "//" + window.location.host + window.location.pathname) + "&use_express_address=true";
                            return "https://" + this.domain + "/" + this.shopId + "/checkouts/" + e + "/express/redirect?" + n
                        }
                    }, {
                        key: "paypalCheckout",
                        get: function n() {
                            return this.paypal ? this.paypal.checkout : null
                        }
                    }, {
                        key: "paypalSDK",
                        get: function i() {
                            return this.paypal
                        }
                    }]), o
                }(),
                At = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                zt = 50,
                Ft = function() {
                    function n(e, t) {
                        en(this, n), this.id = "PayPalV4", this.eventsPrefix = "paypalv4", this.labelName = "paypal", this.buttonColor = "gold", this.paypal = e, this.config = t, this.config.height = this.config.height || zt
                    }
                    return tn(n, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function t() {
                            return At(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, K({
                                                merchantSupportsVenmo: this.config.venmoSupported
                                            });
                                        case 2:
                                            return (t = e.sent) && se.broadcast(this.eventsPrefix + ":remembered"), e.abrupt("return", t);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "paymentWrapper",
                        value: function e(c) {
                            var t = this;
                            return function() {
                                return At(t, void 0, void 0, regeneratorRuntime.mark(function e() {
                                    var t, n, r, i, a;
                                    return regeneratorRuntime.wrap(function o(e) {
                                        for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                return t = this.eventInfo, e.prev = 1, e.next = 4, c.build(this.id);
                                            case 4:
                                                return n = e.sent, se.broadcast(this.eventsPrefix + ":begin-payment", {
                                                    checkout: n,
                                                    eventInfo: t
                                                }), r = new Pe({
                                                    secretKey: n.secretKey
                                                }), e.next = 9, r.post("/" + this.config.shopId + "/checkouts/" + n.token + "/paypal/tokens", {
                                                    key: n.secretKey
                                                });
                                            case 9:
                                                return i = e.sent, e.next = 12, i.json();
                                            case 12:
                                                a = e.sent, this.redirectUrl = a.redirect_url, this.paypalToken = a.token, e.next = 20;
                                                break;
                                            case 17:
                                                e.prev = 17, e.t0 = e["catch"](1), Ue.info("an error has occured while tried to create a checkout.", e.t0);
                                            case 20:
                                                return e.abrupt("return", this.paypalToken || "");
                                            case 21:
                                            case "end":
                                                return e.stop()
                                        }
                                    }, e, this, [
                                        [1, 17]
                                    ])
                                }))
                            }
                        }
                    }, {
                        key: "authorized",
                        value: function r(e) {
                            var t = e.payerID,
                                n = this.eventInfo;
                            se.broadcast(this.eventsPrefix + ":redirect-url", {
                                url: this.redirectUrl,
                                eventInfo: n
                            }), window.top.location.assign(this.redirectUrl + "&PayerID=" + t)
                        }
                    }, {
                        key: "render",
                        value: function o(r, i, a) {
                            return At(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            this.eventInfo = a && a.eventInfo, t = {
                                                shape: "rect",
                                                maxbuttons: 1,
                                                tagline: !1,
                                                size: "responsive",
                                                label: this.labelName,
                                                color: this.buttonColor,
                                                height: a && a.height || this.config.height
                                            }, this.paypal.Button.render({
                                                locale: this.config.locale,
                                                env: this.config.environment,
                                                style: t,
                                                commit: !1,
                                                payment: this.paymentWrapper(i),
                                                onAuthorize: this.authorized.bind(this)
                                            }, r), se.broadcast(this.eventsPrefix + ":show", this.eventInfo);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), n
                }(),
                Dt = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Rt = function() {
                    function e() {
                        en(this, e)
                    }
                    return tn(e, null, [{
                        key: "load",
                        value: function t(r) {
                            return Dt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            e.t0 = r.buttonVersion,
                                                e.next = "v4" === e.t0 ? 3 : "v3" === e.t0 ? 7 : 8;
                                            break;
                                        case 3:
                                            return e.next = 5, B(r.merchantId);
                                        case 5:
                                            return t = e.sent, e.abrupt("return", new Ft(t, r));
                                        case 7:
                                            return e.abrupt("return", new St(r));
                                        case 8:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), e
                }();
            Rt.isSupported = !0;
            var Vt = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Ot = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Tt = function() {
                    function t() {
                        en(this, t);
                        var e = Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
                        return e.id = "Venmo", e.labelName = "venmo", e.eventsPrefix = "venmo", e.buttonColor = "blue", e
                    }
                    return Zt(t, Ft), tn(t, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function n() {
                            return Ot(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, W();
                                        case 2:
                                            return (t = e.sent) && se.broadcast(this.eventsPrefix + ":remembered"), e.abrupt("return", t);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), t
                }(),
                jt = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Mt = function() {
                    function e() {
                        en(this, e)
                    }
                    return tn(e, null, [{
                        key: "load",
                        value: function t(i) {
                            return jt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = void 0, e.next = 3, W({
                                                merchantSupportsVenmo: i.venmoSupported
                                            });
                                        case 3:
                                            if (e.sent) return e.next = 7, B(i.merchantId);
                                            e.next = 9;
                                            break;
                                        case 7:
                                            n = e.sent, t = new Tt(n, i);
                                        case 9:
                                            return e.abrupt("return", t);
                                        case 10:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), e
                }();
            Mt.isSupported = !0;
            var It = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Lt = "shopifyPayAcceleration",
                Bt = "acceleration.check.benchmark:ShopifyPay",
                Nt = function() {
                    function c(e) {
                        var t = e.shopId,
                            n = e.domain,
                            r = e.accelerated;
                        en(this, c), this.id = "ShopifyPay", this.shopId = t, this.domain = n, this.accelerated = r
                    }
                    return tn(c, [{
                        key: "canMakeAcceleratedPurchase",
                        value: function t() {
                            return It(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.accelerated) return e.abrupt("return", !0);
                                            e.next = 2;
                                            break;
                                        case 2:
                                            if ("boolean" == typeof(t = h(Lt))) return e.abrupt("return", t);
                                            e.next = 5;
                                            break;
                                        case 5:
                                            return d(Bt), e.next = 8, this.hasShopifyPayCookie();
                                        case 8:
                                            return n = e.sent, p("acceleration.check.benchmark", f(Bt), {
                                                instrument: "ShopifyPay"
                                            }), u(Lt, n, 1800), e.abrupt("return", n);
                                        case 12:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "begin",
                        value: function n(o) {
                            return It(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r, i;
                                return regeneratorRuntime.wrap(function a(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, o;
                                        case 2:
                                            return t = e.sent, n = t.attributes.token, r = t.secretKey, Y(), l(Lt), i = J(this.domain, this.shopId, n, r), window.location.assign(i), se.broadcast("shopifypay:redirect-url", {
                                                url: i
                                            }), e.abrupt("return", {
                                                state: ee.Success
                                            });
                                        case 11:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "hasShopifyPayCookie",
                        value: function r() {
                            return It(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (window.ShopifyPay === undefined) return e.abrupt("return", !1);
                                            e.next = 2;
                                            break;
                                        case 2:
                                            return e.prev = 2, e.next = 5, fetch("https://" + window.ShopifyPay.apiHost + "/session?v=1", {
                                                credentials: "include"
                                            });
                                        case 5:
                                            return t = e.sent, e.next = 8, t.json();
                                        case 8:
                                            return n = e.sent, r = n.eligible, e.abrupt("return", r);
                                        case 13:
                                            e.prev = 13, e.t0 = e["catch"](2);
                                        case 15:
                                            return e.abrupt("return", !1);
                                        case 16:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this, [
                                    [2, 13]
                                ])
                            }))
                        }
                    }], [{
                        key: "load",
                        value: function s(e) {
                            var r = e.shopId,
                                i = e.domain,
                                a = e.accelerated;
                            return It(this, void 0, void 0, regeneratorRuntime.mark(function o() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = new c({
                                                shopId: r,
                                                domain: i,
                                                accelerated: a
                                            }), e.next = 3, t.canMakeAcceleratedPurchase();
                                        case 3:
                                            if (e.sent) return e.abrupt("return", t);
                                            e.next = 5;
                                            break;
                                        case 5:
                                            return e.abrupt("return", null);
                                        case 6:
                                        case "end":
                                            return e.stop()
                                    }
                                }, o, this)
                            }))
                        }
                    }]), c
                }();
            Nt.isSupported = !0;
            var Ht = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Ut = function() {
                    function n(e, t) {
                        en(this, n), this.attributes = e, this.apiClient = t, this.token = e.token, this.secretKey = t.secretKey, this.shippingRates = []
                    }
                    return tn(n, [{
                        key: "addReductionCode",
                        value: function t(e) {
                            return this.update({
                                reduction_code: e
                            })
                        }
                    }, {
                        key: "removeDiscount",
                        value: function e() {
                            return this.update({
                                discount_code: null
                            })
                        }
                    }, {
                        key: "removeGiftCard",
                        value: function r(e) {
                            return this.update({
                                applied_gift_cards: {
                                    0: {
                                        id: e,
                                        _delete: !0
                                    }
                                }
                            })
                        }
                    }, {
                        key: "refreshShippingRates",
                        value: function i() {
                            return Ht(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.attributes.requires_shipping) return e.next = 3, this.apiClient.getShippingRates(this.token);
                                            e.next = 11;
                                            break;
                                        case 3:
                                            if (t = e.sent, this.shippingRates = t.sort(X), this.shippingRates.length && !this.attributes.shipping_line) return n = this.shippingRates[0], e.next = 9, this.selectShippingRate(n.id);
                                            e.next = 9;
                                            break;
                                        case 9:
                                            e.next = 12;
                                            break;
                                        case 11:
                                            this.shippingRates = [];
                                        case 12:
                                            return e.abrupt("return", this.shippingRates);
                                        case 13:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "selectShippingRate",
                        value: function a(n) {
                            return Ht(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.abrupt("return", this.update({
                                                shipping_line: {
                                                    handle: n
                                                }
                                            }));
                                        case 1:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "createPayment",
                        value: function o(i) {
                            return Ht(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n;
                                return regeneratorRuntime.wrap(function r(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.createPayment(this.token, i);
                                        case 2:
                                            return t = e.sent, n = t.transaction, !t.payment_processing_error_message && n && "success" !== n.status && "pending" !== n.status && (t.payment_processing_error_message = n.message || "Payment Transaction " + n.status), t.isSuccess = !t.payment_processing_error_message, e.abrupt("return", t);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "createPaymentSession",
                        value: function c(r) {
                            return Ht(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t;
                                return regeneratorRuntime.wrap(function n(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return t = this.attributes.payment_url, e.abrupt("return", this.apiClient.createPaymentSession(t, r));
                                        case 2:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "completeFreeCheckout",
                        value: function s() {
                            return Ht(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.completeFreeCheckout(this.token);
                                        case 2:
                                            return this.attributes = e.sent, e.abrupt("return", this);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "reload",
                        value: function u() {
                            return Ht(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.getCheckout(this.token);
                                        case 2:
                                            return this.attributes = e.sent, e.abrupt("return", this);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "stopPolling",
                        value: function h() {
                            this.apiClient.stopPolling()
                        }
                    }, {
                        key: "update",
                        value: function l(n) {
                            return Ht(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.apiClient.updateCheckout(this.token, n);
                                        case 2:
                                            return this.attributes = e.sent, e.abrupt("return", this);
                                        case 4:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }]), n
                }(),
                qt = undefined && undefined.__awaiter || function(t, o, c, s) {
                    return new(c || (c = Promise))(function(e, n) {
                        function r(e) {
                            try {
                                a(s.next(e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function i(e) {
                            try {
                                a(s["throw"](e))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function a(t) {
                            t.done ? e(t.value) : new c(function(e) {
                                e(t.value)
                            }).then(r, i)
                        }
                        a((s = s.apply(t, o || [])).next())
                    })
                },
                Gt = function Gt(e) {
                    return e.line_items !== undefined
                },
                $t = function() {
                    function i(e, t, n) {
                        var r = 2 < arguments.length && n !== undefined ? arguments[2] : {};
                        en(this, i), this.dataSource = e, this.checkout = r.checkout || null, this.discountCode = r.discountCode || null, this.currency = r.currency, this.context = null, this.apiClient = new Pe({
                            accessToken: t
                        }), this.eventEmitter = new ce
                    }
                    return tn(i, [{
                        key: "estimatePrice",
                        value: function t() {
                            return qt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.dataSource.estimatePrice) {
                                                e.next = 2;
                                                break
                                            }
                                            throw new TypeError("There is no estimatePrice method on this data source.");
                                        case 2:
                                            return e.next = 4, this.dataSource.estimatePrice();
                                        case 4:
                                            return e.abrupt("return", e.sent);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "hasCheckout",
                        value: function e() {
                            return null !== this.checkout
                        }
                    }, {
                        key: "checkoutAttributes",
                        value: function n() {
                            return null === this.checkout ? null : this.checkout.attributes
                        }
                    }, {
                        key: "updateCheckout",
                        value: function r(n) {
                            return qt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.checkout) {
                                                e.next = 2;
                                                break
                                            }
                                            throw new TypeError("No checkout created, could not update it.");
                                        case 2:
                                            return e.next = 4, this.checkout.update(n);
                                        case 4:
                                            return e.abrupt("return", e.sent);
                                        case 5:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "onError",
                        value: function a(e) {
                            this.eventEmitter.subscribe("checkout-api:error", e)
                        }
                    }, {
                        key: "onThrottled",
                        value: function o(e) {
                            this.eventEmitter.subscribe("checkout-api:throttled", e)
                        }
                    }, {
                        key: "build",
                        value: function c(a, o) {
                            return qt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r;
                                return regeneratorRuntime.wrap(function i(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return e.next = 2, this.dataSource.fetch();
                                        case 2:
                                            if (t = e.sent, n = Object.assign({}, t, o, {
                                                    secret: !0,
                                                    wallet_name: a,
                                                    is_upstream_button: "buy_now" === this.context
                                                }), null === this.checkout) return this.currency && (n.presentment_currency = this.currency), e.next = 8, this.createCheckout(n);
                                            e.next = 11;
                                            break;
                                        case 8:
                                            this.checkout = e.sent, e.next = 16;
                                            break;
                                        case 11:
                                            if (Gt(n) && this.lineItemsChanged(n.line_items)) return e.next = 14, this.apiClient.updateCheckout(this.checkout.token, n);
                                            e.next = 16;
                                            break;
                                        case 14:
                                            r = e.sent, this.checkout = new Ut(r, this.apiClient);
                                        case 16:
                                            return e.abrupt("return", this.checkout);
                                        case 17:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "forceReviewStep",
                        value: function s() {
                            return qt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                return regeneratorRuntime.wrap(function t(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            if (this.checkout) {
                                                e.next = 2;
                                                break
                                            }
                                            throw new TypeError("No checkout found.");
                                        case 2:
                                            return e.next = 4, this.checkout.refreshShippingRates();
                                        case 4:
                                            return e.next = 6, this.checkout.update({
                                                web_buyer_must_review_checkout: !0
                                            });
                                        case 6:
                                            return e.abrupt("return", this.checkout);
                                        case 7:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this)
                            }))
                        }
                    }, {
                        key: "setContext",
                        value: function u(e) {
                            this.context = e
                        }
                    }, {
                        key: "setDiscountCode",
                        value: function h(e) {
                            this.discountCode = e
                        }
                    }, {
                        key: "createCheckout",
                        value: function l(o) {
                            return qt(this, void 0, void 0, regeneratorRuntime.mark(function e() {
                                var t, n, r, i;
                                return regeneratorRuntime.wrap(function a(e) {
                                    for (;;) switch (e.prev = e.next) {
                                        case 0:
                                            return n = t = void 0, e.prev = 2, e.next = 5, this.apiClient.post("/wallets/checkouts.json", {
                                                checkout: o
                                            }, {
                                                poll: !1
                                            });
                                        case 5:
                                            return n = e.sent, e.next = 8, n.json();
                                        case 8:
                                            r = e.sent, t = r.checkout, e.next = 16;
                                            break;
                                        case 12:
                                            throw e.prev = 12, e.t0 = e["catch"](2), this.eventEmitter.broadcast("checkout-api:error", e.t0), e.t0;
                                        case 16:
                                            if (Z(n, o.wallet_name)) return e.prev = 17, this.eventEmitter.broadcast("checkout-api:throttled"), e.next = 21, this.apiClient.poll({
                                                timeout: 9e4
                                            }, n);
                                            e.next = 32;
                                            break;
                                        case 21:
                                            return n = e.sent, e.next = 24, n.json();
                                        case 24:
                                            i = e.sent, t = i.checkout, e.next = 32;
                                            break;
                                        case 28:
                                            throw e.prev = 28, e.t1 = e["catch"](17), this.eventEmitter.broadcast("checkout-api:error", e.t1), e.t1;
                                        case 32:
                                            if (this.discountCode) return e.prev = 33, e.next = 36, this.apiClient.addReductionCode(t.token, this.discountCode);
                                            e.next = 46;
                                            break;
                                        case 36:
                                            t = e.sent, e.next = 46;
                                            break;
                                        case 39:
                                            return e.prev = 39, e.t2 = e["catch"](33), e.next = 43, Q(e.t2);
                                        case 43:
                                            if (e.sent) {
                                                e.next = 46;
                                                break
                                            }
                                            throw e.t2;
                                        case 46:
                                            return e.abrupt("return", new Ut(t, this.apiClient));
                                        case 47:
                                        case "end":
                                            return e.stop()
                                    }
                                }, e, this, [
                                    [2, 12],
                                    [17, 28],
                                    [33, 39]
                                ])
                            }))
                        }
                    }, {
                        key: "lineItemsChanged",
                        value: function d(e) {
                            if (null === this.checkout) return !1;
                            var n = this.checkout.attributes.line_items;
                            return e.length !== n.length || e.every(function(e, t) {
                                return e.quantity !== n[t].quantity || e.variant_id !== n[t].variant_id
                            })
                        }
                    }]), i
                }();
            t.ApiClient = ve, t.CheckoutApiClient = Pe, t.CheckoutApiWrapper = Ut, t.ScriptLoader = qe, t.checkout = re, t.paypal = ie, t.ApplePay = He, t.ShopifyApplePaySession = De, t.AmazonPay = Xe, t.Checkout = Qe, t.EventEmitter = ce, t.eventEmitter = se, t.GooglePay = yt, t.PayPal = Rt, t.PayPalV3 = St, t.PayPalV4 = Ft, t.Venmo = Mt, t.canAccelerate = W, t.ShopifyPay = Nt, t.CheckoutManager = $t
        }),
        st = e(function(e, t) {
            "use strict";

            function n(e, t) {
                var n = 1 < arguments.length && t !== undefined ? arguments[1] : "cart",
                    r = void 0;
                r = "venmo" === e ? "Venmo" : "PayPalV4", ct.eventEmitter.subscribe(e + ":show", function() {
                    (0, je.track)(r, "show", n)
                }), ct.eventEmitter.subscribe(e + ":redirect-url", function() {
                    (0, je.track)(r, "redirecting", n)
                }), ct.eventEmitter.subscribe(e + ":remembered", function() {
                    (0, je.track)(r, "remembered_user", n)
                }), ct.eventEmitter.subscribe(e + ":begin-payment", function() {
                    (0, je.track)(r, "clicked", n)
                })
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = n
        }),
        ut = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = function() {
                function n(e, t) {
                    en(this, n), this.strategy = e, this.currency = t
                }
                return tn(n, [{
                    key: "fetch",
                    value: function e() {
                        var t = this;
                        return this.strategy.updateCart().then(function(e) {
                            return {
                                cart_token: e.token,
                                secret: !0,
                                presentment_currency: t.currency
                            }
                        })
                    }
                }]), n
            }();
            t["default"] = n
        }),
        ht = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = k(Me),
                s = k(st),
                u = k(ut),
                h = {
                    MIN: 35,
                    MAX: 55,
                    DEFAULT: 44
                },
                r = function(e) {
                    function t(e) {
                        return en(this, t), e.id = e.id || (0, Ce.generateRandomId)(), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
                    }
                    return Zt(t, e), tn(t, [{
                        key: "init",
                        value: function n() {
                            var e = this;
                            return (0, at.ensureScriptLoaded)().then(function() {
                                return e.createButton()
                            })
                        }
                    }, {
                        key: "createButton",
                        value: function r() {
                            if ((0, at.isMarkedRendered)(this.button)) return Promise.reject("PayPal Button was already rendered");
                            if (this.metadata = (0, Ce.dataset)(document.getElementById("in-context-paypal-metadata")), !this.metadata) return Promise.reject("PayPal metadata was not found");
                            if ("true" !== this.metadata.paypalV4) return Promise.reject("PayPal V4 not enabled");
                            (0, s["default"])("paypalv4", this.strategy.identifier);
                            try {
                                return (0, at.removeNoscriptTag)(), this.render(), Promise.resolve(this)
                            } catch (e) {
                                return Promise.reject(e)
                            }
                        }
                    }, {
                        key: "render",
                        value: function i() {
                            var e = this.buildCheckoutManager();
                            new ct.PayPalV4(window.paypal, l({}, this.metadata, {
                                height: this.buttonHeight()
                            })).render(this.button.id, e), (0, at.markAsRendered)(this.button)
                        }
                    }, {
                        key: "fetchAccessToken",
                        value: function a() {
                            var e = document.getElementById("shopify-features");
                            if (e) return JSON.parse(e.innerHTML).accessToken
                        }
                    }, {
                        key: "buildCheckoutManager",
                        value: function o() {
                            var e = this.fetchAccessToken(),
                                t = new u["default"](this.strategy);
                            return new ct.CheckoutManager(t, e)
                        }
                    }, {
                        key: "buttonHeight",
                        value: function c() {
                            var e = this.button.offsetHeight;
                            return (e < h.MIN || e > h.MAX) && (e = h.DEFAULT), e
                        }
                    }]), t
                }(n["default"]);
            t["default"] = r
        }),
        lt = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var i = k(st),
                n = function(e) {
                    function t() {
                        return en(this, t), Qt(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return Zt(t, e), tn(t, [{
                        key: "init",
                        value: function n() {
                            return this.button.style.display = "none", (0, at.isMarkedRendered)(this.button) ? Promise.reject("Venmo Button was already rendered") : (this.metadata = (0, Ce.dataset)(document.getElementById("in-context-paypal-metadata")), "true" !== this.metadata.paypalV4 ? Promise.reject("PayPal V4 not enabled") : (this.metadata = l({}, this.metadata, {
                                height: this.buttonHeight()
                            }), (0, i["default"])("venmo", this.strategy.identifier), this.render()))
                        }
                    }, {
                        key: "render",
                        value: function r() {
                            var t = this;
                            return (0, at.markAsRendered)(this.button), ct.Venmo.load(l({}, this.metadata)).then(function(e) {
                                return e ? (t.button.style.display = "", e.render(t.button, t.buildCheckoutManager())) : (t.button.parentElement.removeChild(t.button), Promise.resolve())
                            })
                        }
                    }]), t
                }(k(ht)["default"]);
            t["default"] = n
        }),
        dt = e(function(e, t) {
            "use strict";

            function n(r, e) {
                var i = 1 < arguments.length && e !== undefined ? arguments[1] : document;
                return m = [], r ? a(i).then(function(e) {
                    for (var t = e.betas, n = p.length - 1; 0 <= n; n--) o(p[n], r[p[n]], i, t);
                    return Promise.all(m).then(function(e) {
                        return e.filter(function(e) {
                            return e
                        })
                    })
                }) : Promise.reject(new Error("No checkout buttons provided"))
            }

            function a(e) {
                return 0 < e.querySelectorAll("[data-strategy=cart]").length ? (new r["default"]).get("/wallets/betas").then(function(e) {
                    return e
                })["catch"](function() {
                    return {
                        betas: []
                    }
                }) : Promise.resolve({
                    betas: []
                })
            }

            function o(e, t, n, r) {
                var i = n.querySelectorAll(t);
                if (i.length)
                    for (var a = i.length - 1; 0 <= a; a--) m.push(c(e, i[a], r)["catch"](function() {
                        return !1
                    }))
            }

            function c(e, t, n) {
                try {
                    if (y[e]) return y[e](t, n);
                    throw new Error("Invalid checkout method " + e)
                } catch (r) {
                    return i(r), Promise.reject(r)
                }
            }

            function i(e) {
                console.error("Error" === e.constructor.name ? e.message : e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = n;
            var r = k(Ae),
                s = k(Ie),
                u = k(Be),
                h = k(it),
                l = k(ot),
                d = k(lt),
                f = k(ht),
                p = ["applePay", "googlePay", "paypal", "venmo"],
                m = void 0,
                y = {
                    applePay: function v(e) {
                        return new s["default"](e).init()
                    },
                    googlePay: function g(e, t) {
                        return (-1 !== t.indexOf("costanza_google_pay_cart") ? new h["default"](e) : new u["default"](e)).init()
                    },
                    paypal: function b(e, t) {
                        return (-1 !== t.indexOf("costanza_paypal_cart") ? new f["default"](e) : new l["default"](e)).init()
                    },
                    venmo: function w(e) {
                        return new d["default"](e).init()
                    }
                }
        }),
        ft = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var o = Symbol("targetSymbol"),
                c = Symbol("actionQueueSymbol"),
                s = Symbol("finishedLoadingSymbol"),
                n = function() {
                    function a(e, t) {
                        var n = this,
                            r = 1 < arguments.length && t !== undefined && arguments[1];
                        if (en(this, a), this[c] = [], this[s] = !1, r) {
                            var i = e.onload;
                            e.onload = function() {
                                i && i(), n[o] = e, n[s] = !0, n[c].forEach(function(e) {
                                    return e()
                                })
                            }
                        } else this[o] = e, this[s] = !0
                    }
                    return tn(a, [{
                        key: "postMessage",
                        value: function r(e) {
                            var t = this,
                                n = function n() {
                                    e.digitalWalletsDialog = !0, t[o].postMessage(e, t[o].location)
                                };
                            this[s] ? n() : this[c].push(function() {
                                n()
                            })
                        }
                    }]), a
                }();
            t["default"] = n
        }),
        pt = e(function(e, t) {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = t.EVENTS_PREFIX = "DigitalWalletsDialog";
            t.DIALOG_CHANGE = n + ":change", t.DIALOG_CHANGED = n + ":changed", t.DIALOG_DISMISSED = n + ":dismissed", t.IFRAME_SHOWN = n + ":iframe_shown", t.IFRAME_HIDDEN = n + ":iframe_hidden", t.HTML_ESCAPED_CHARACTERS = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
                "/": "&#x2F;",
                "`": "&#x60;",
                "=": "&#x3D;"
            }
        }),
        mt = e(function(e, t) {
            "use strict";

            function r(e) {
                e[h] = new s["default"](e[u].contentWindow, !0)
            }

            function i(e, t) {
                e[u] = document.createElement("iframe"), e[u].src = t, e[u].style.position = "fixed", e[u].style.top = 0, e[u].style.left = 0, e[u].style.zIndex = 99999, e[u].style.height = 0, e[u].style.width = 0, e[u].style.border = 0, e[u].scrolling = "no", e[u].tabIndex = "-1", e[u].setAttribute("aria-hidden", !0), document.body.appendChild(e[u])
            }

            function a(e, t) {
                switch (t.data.type) {
                    case pt.DIALOG_CHANGED:
                        f = window.pageYOffset, n(e[u], !0), o(!0), c(e, pt.IFRAME_SHOWN), e[h].postMessage({
                            type: pt.IFRAME_SHOWN
                        });
                        break;
                    case pt.DIALOG_DISMISSED:
                        n(e[u], !1), o(!1, f), c(e, pt.IFRAME_HIDDEN);
                        break;
                    default:
                        return
                }
            }

            function n(e, t) {
                var n = t ? "100%" : "0";
                e.style.height = n, e.style.width = n, t ? (e.removeAttribute("tabindex"), e.removeAttribute("aria-hidden")) : (e.tabIndex = "-1", e.setAttribute("aria-hidden", !0))
            }

            function o(e, t) {
                var n = 1 < arguments.length && t !== undefined ? arguments[1] : 0;
                document.documentElement.style.overflow = e ? "hidden" : "visible", document.documentElement.style.height = e ? "100%" : "auto", document.body.style.overflow = e ? "hidden" : "visible", document.body.style.height = e ? "100%" : "auto", window.scrollTo(0, n)
            }

            function c(e, t) {
                if (-1 !== l.indexOf(t)) {
                    var n = new Event(t);
                    e[u].dispatchEvent(n)
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var s = k(ft),
                u = Symbol("iframeSymbol"),
                h = Symbol("messengerSymbol"),
                l = [pt.IFRAME_SHOWN, pt.IFRAME_HIDDEN],
                d = void 0,
                f = void 0,
                p = function() {
                    function n(e) {
                        var t = this;
                        return en(this, n), d || (i(d = this, e), r(this), this._messageHandler = function(e) {
                            e.data && e.data.type && e.data.digitalWalletsDialog && a(t, e)
                        }, window.addEventListener("message", this._messageHandler)), d
                    }
                    return tn(n, [{
                        key: "showMessage",
                        value: function t(e) {
                            return this[h].postMessage({
                                payload: e,
                                type: pt.DIALOG_CHANGE
                            })
                        }
                    }, {
                        key: "destroy",
                        value: function e() {
                            null !== this[u] && this[u].remove(), d = null, this[u] = null, this[h] = null, window.removeEventListener("message", this._messageHandler), o(!1)
                        }
                    }]), n
                }();
            t["default"] = p
        }),
        yt = e(function(e, t) {
            "use strict";

            function n() {
                if (!Shopify.StorefrontExpressButtons.DigitalWalletsDialog) {
                    var e = document.getElementById("shopify-digital-wallet");
                    e && (Shopify.StorefrontExpressButtons.DigitalWalletsDialog = new r["default"](e.getAttribute("content")))
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = n;
            var r = k(mt)
        }),
        vt = e(function(e, t) {
            "use strict";

            function n(e) {
                var t = 0 < arguments.length && e !== undefined ? arguments[0] : "//www.paypalobjects.com/api/checkout.min.js";
                if (!(0 < document.querySelectorAll('script[src*="' + t + '"]').length)) {
                    var n = document.createElement("script");
                    n.src = t, window.paypalCheckoutReady = r, document.body.appendChild(n)
                }
            }

            function r() {
                a() && (o("Paypal V4", {
                    event_type: "available"
                }), i(function(e) {
                    return e ? o("Paypal V4", {
                        event_type: "remembered-user"
                    }) : null
                }))
            }

            function i(e) {
                a() && paypal.isFundingRemembered(paypal.FUNDING.PAYPAL).then(e)
            }

            function a() {
                return "object" === ("undefined" == typeof paypal ? "undefined" : on(paypal)) && "function" == typeof paypal.isFundingRemembered && "object" === on(paypal.FUNDING) && "string" == typeof paypal.FUNDING.PAYPAL
            }

            function o() {
                var e;
                "object" === ("undefined" == typeof ShopifyAnalytics ? "undefined" : on(ShopifyAnalytics)) && "object" === on(ShopifyAnalytics.lib) && "function" == typeof ShopifyAnalytics.lib.track && (e = ShopifyAnalytics.lib).track.apply(e, arguments)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.loadPaypalV4WithVisibilityTracking = n, t.trackPaypalV4Visibility = r, t.paypalV4Visibility = i
        });
    e(function() {
        "use strict";
        var e = k(a),
            t = k(dt),
            n = k(yt),
            r = document.querySelectorAll("#paypal-express-button");
        "undefined" != typeof ShopifyPaypalV4VisibilityTracking && 0 < r.length && (0, vt.loadPaypalV4WithVisibilityTracking)(), Shopify.StorefrontExpressButtons.initialize = function() {
            (0, t["default"])({
                applePay: ".additional-checkout-button--apple-pay",
                paypal: ".additional-checkout-button--paypal",
                venmo: ".additional-checkout-button--venmo",
                googlePay: ".additional-checkout-button--google-pay"
            }), AmazonPaymentsPayButton(), Shopify.StorefrontExpressButtons.ExpressCheckout.initialize(), (0, n["default"])()
        }, (0, e["default"])(Shopify.StorefrontExpressButtons.initialize)
    })
}("undefined" != typeof global ? global : "undefined" != typeof window && window);